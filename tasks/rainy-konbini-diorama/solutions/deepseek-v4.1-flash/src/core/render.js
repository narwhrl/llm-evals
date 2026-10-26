import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    stencil: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.info.autoReset = false;
  return renderer;
}

/**
 * Cel outline pass.
 *
 * A screen-space Sobel over view-space depth and normals. This is what gives
 * the diorama its drawn look: silhouettes and creases get a crisp dark line
 * while flat lit faces stay clean. Per-object shell outlines cannot reproduce
 * that at interior corners or where props meet the ground.
 */
const OutlineShader = {
  uniforms: {
    tDiffuse: { value: null },
    tDepth: { value: null },
    tNormal: { value: null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uColor: { value: new THREE.Color(0x080b14) },
    uStrength: { value: 1.0 },
    uThickness: { value: 1.0 },
    uNear: { value: 0.4 },
    uFar: { value: 200 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    #include <packing>

    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform sampler2D tNormal;
    uniform vec2 uResolution;
    uniform vec3 uColor;
    uniform float uStrength;
    uniform float uThickness;
    uniform float uNear;
    uniform float uFar;
    varying vec2 vUv;

    // View-space depth from the packed depth texture.
    float readDepth(vec2 uv) {
      float fragCoordZ = texture2D(tDepth, uv).x;
      float viewZ = perspectiveDepthToViewZ(fragCoordZ, uNear, uFar);
      return -viewZ;
    }

    // Reconstruct a view-space normal from the encoded normal buffer.
    vec3 readNormal(vec2 uv) {
      return normalize(texture2D(tNormal, uv).xyz * 2.0 - 1.0);
    }

    void main() {
      vec2 texel = uThickness / uResolution;

      // Sobel kernel over depth.
      float d00 = readDepth(vUv + vec2(-texel.x, -texel.y));
      float d10 = readDepth(vUv + vec2(0.0, -texel.y));
      float d20 = readDepth(vUv + vec2(texel.x, -texel.y));
      float d01 = readDepth(vUv + vec2(-texel.x, 0.0));
      float d21 = readDepth(vUv + vec2(texel.x, 0.0));
      float d02 = readDepth(vUv + vec2(-texel.x, texel.y));
      float d12 = readDepth(vUv + vec2(0.0, texel.y));
      float d22 = readDepth(vUv + vec2(texel.x, texel.y));

      float gx = (d00 + 2.0 * d01 + d02) - (d20 + 2.0 * d21 + d22);
      float gy = (d00 + 2.0 * d10 + d20) - (d02 + 2.0 * d12 + d22);
      float depthEdge = sqrt(gx * gx + gy * gy);

      // Normalise by depth so distant geometry does not glow with edges.
      float centreDepth = max(readDepth(vUv), 0.001);
      depthEdge = depthEdge / centreDepth;

      // Sobel kernel over normals catches creases the depth pass misses.
      vec3 n00 = readNormal(vUv + vec2(-texel.x, -texel.y));
      vec3 n20 = readNormal(vUv + vec2(texel.x, -texel.y));
      vec3 n02 = readNormal(vUv + vec2(-texel.x, texel.y));
      vec3 n22 = readNormal(vUv + vec2(texel.x, texel.y));
      vec3 nx = (n00 + n20) - (n02 + n22);
      float normalEdge = length(nx);

      // Thresholds tuned so flat faces stay clean while real creases read.
      float depthLine = smoothstep(0.045, 0.16, depthEdge);
      float normalLine = smoothstep(0.7, 1.5, normalEdge);
      float line = clamp(depthLine + normalLine * 0.85, 0.0, 1.0) * uStrength;

      // Fade the outline with distance so the far plinth edge stays subtle.
      line *= (1.0 - smoothstep(18.0, 60.0, centreDepth)) * 0.75 + 0.25;

      vec3 color = texture2D(tDiffuse, vUv).rgb;
      color = mix(color, uColor, line * 0.82);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

/**
 * Final colour grade. Runs in linear space before OutputPass encodes to sRGB:
 * a cool lift in the shadows and a gentle vignette hold the night mood without
 * hiding the warm interior.
 */
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uVignette: { value: 0.42 },
    uShadowTint: { value: new THREE.Color(0x8fa8d8) },
    uLift: { value: 0.012 },
    uContrast: { value: 1.045 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uVignette;
    uniform vec3 uShadowTint;
    uniform float uLift;
    uniform float uContrast;
    varying vec2 vUv;

    void main() {
      vec3 color = texture2D(tDiffuse, vUv).rgb;
      color = clamp(color, 0.0, 8.0);
      float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
      // Cool the darkest tones towards blue so shadows read as rainy night.
      float shadowWeight = 1.0 - smoothstep(0.0, 0.32, luma);
      color = mix(color, color * uShadowTint, shadowWeight * 0.35);
      color += uLift * uShadowTint;
      color = (color - 0.5) * uContrast + 0.5;

      vec2 centered = vUv - 0.5;
      float vignette = 1.0 - dot(centered, centered) * uVignette * 2.0;
      color *= clamp(vignette, 0.0, 1.0);

      gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
    }
  `,
};

export function createComposer(renderer, scene, camera) {
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());

  // Normal + depth buffer for the outline pass.
  const normalTarget = new THREE.WebGLRenderTarget(size.x, size.y, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    type: THREE.HalfFloatType,
  });
  normalTarget.depthTexture = new THREE.DepthTexture(size.x, size.y);
  normalTarget.depthTexture.type = THREE.UnsignedIntType;
  const normalMaterial = new THREE.MeshNormalMaterial();

  const target = new THREE.WebGLRenderTarget(size.x, size.y, {
    type: THREE.HalfFloatType,
    samples: 4,
  });

  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));

  // Bloom is deliberately restrained: only the brightest signage and lamp
  // filaments should bloom, so the threshold sits high and the strength low.
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.3, 0.55, 0.95);
  composer.addPass(bloom);

  const outline = new ShaderPass(OutlineShader);
  outline.uniforms.tDepth.value = normalTarget.depthTexture;
  outline.uniforms.tNormal.value = normalTarget.texture;
  outline.uniforms.uNear.value = camera.near;
  outline.uniforms.uFar.value = camera.far;
  outline.uniforms.uResolution.value.set(size.x, size.y);
  composer.addPass(outline);

  const grade = new ShaderPass(GradeShader);
  composer.addPass(grade);
  composer.addPass(new OutputPass());

  return {
    composer,
    bloom,
    grade,
    outline,
    normalTarget,
    /**
     * Renders the normal/depth buffer the outline pass reads.
     *
     * Transparent geometry is skipped: raindrops, eave drips, splash sprites,
     * puddle rings, glass and additive light cards are decoration, not solid
     * surfaces. Leaving them in writes their silhouettes into the depth buffer,
     * and the Sobel kernel then draws a hard dark outline around every single
     * drop — which reads as a row of grey pipes hanging off the awning.
     */
    renderNormals() {
      const previousTarget = renderer.getRenderTarget();
      const previousOverride = scene.overrideMaterial;
      const previousShadow = renderer.shadowMap.autoUpdate;
      const hidden = [];
      scene.traverse((obj) => {
        if (obj.visible && obj.material && obj.material.transparent) {
          hidden.push(obj);
          obj.visible = false;
        }
      });
      renderer.shadowMap.autoUpdate = false;
      scene.overrideMaterial = normalMaterial;
      renderer.setRenderTarget(normalTarget);
      renderer.clear();
      renderer.render(scene, camera);
      scene.overrideMaterial = previousOverride;
      renderer.setRenderTarget(previousTarget);
      renderer.shadowMap.autoUpdate = previousShadow;
      for (const obj of hidden) obj.visible = true;
    },
    setSize(width, height) {
      composer.setSize(width, height);
      bloom.setSize(width, height);
      const buffer = renderer.getDrawingBufferSize(new THREE.Vector2());
      normalTarget.setSize(buffer.x, buffer.y);
      outline.uniforms.uResolution.value.set(buffer.x, buffer.y);
    },
  };
}
