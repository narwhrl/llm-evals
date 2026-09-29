import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FXAAPass } from 'three/addons/postprocessing/FXAAPass.js';

const OutlineShader = {
  uniforms: {
    tDiffuse: { value: null },
    tNormal: { value: null },
    tDepth: { value: null },
    texel: { value: new THREE.Vector2() },
    thickness: { value: 1 },
    cameraNear: { value: 0.1 },
    cameraFar: { value: 100 },
    ink: { value: new THREE.Color(0x0a0d1e) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform sampler2D tNormal;
    uniform sampler2D tDepth;
    uniform vec2 texel;
    uniform float thickness;
    uniform float cameraNear;
    uniform float cameraFar;
    uniform vec3 ink;
    varying vec2 vUv;

    // Reciprocal view distance is affine across planar surfaces, so its Laplacian only
    // responds to real depth discontinuities and never to grazing ground planes.
    float invDist(vec2 uv) {
      float d = texture2D(tDepth, uv).x;
      float z = (cameraNear * cameraFar) / (cameraFar - d * (cameraFar - cameraNear));
      return 1.0 / z;
    }

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      vec2 o = texel * thickness;
      vec2 u0 = vUv + vec2(o.x, 0.0);
      vec2 u1 = vUv - vec2(o.x, 0.0);
      vec2 u2 = vUv + vec2(0.0, o.y);
      vec2 u3 = vUv - vec2(0.0, o.y);

      float ic = invDist(vUv);
      vec4 nc4 = texture2D(tNormal, vUv);
      vec3 nc = nc4.xyz * 2.0 - 1.0;
      float lap = 4.0 * ic - invDist(u0) - invDist(u1) - invDist(u2) - invDist(u3);
      vec4 n0 = texture2D(tNormal, u0);
      vec4 n1 = texture2D(tNormal, u1);
      vec4 n2 = texture2D(tNormal, u2);
      vec4 n3 = texture2D(tNormal, u3);
      float d0 = dot(nc, n0.xyz * 2.0 - 1.0);
      float d1 = dot(nc, n1.xyz * 2.0 - 1.0);
      float d2 = dot(nc, n2.xyz * 2.0 - 1.0);
      float d3 = dot(nc, n3.xyz * 2.0 - 1.0);
      float nEdge = 1.0 - min(min(d0, d1), min(d2, d3));
      float sky = nc4.a - min(min(n0.a, n1.a), min(n2.a, n3.a));
      // Only the nearer side of a discontinuity gets the line: crisp single-weight ink.
      float dEdge = smoothstep(0.012, 0.03, lap / ic);
      nEdge = smoothstep(0.25, 0.5, nEdge) * nc4.a;
      float e = clamp(max(max(dEdge, nEdge), sky), 0.0, 1.0);
      vec3 lineCol = base.rgb * 0.16 + ink;
      gl_FragColor = vec4(mix(base.rgb, lineCol, e * 0.92), base.a);
    }`,
};

class ToonOutlinePass extends Pass {
  constructor(scene, camera, hidden) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.hidden = hidden;
    this.normalMaterial = new THREE.MeshNormalMaterial();
    this.target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
    this.target.depthTexture = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
    this.material = new THREE.ShaderMaterial({ ...OutlineShader, uniforms: THREE.UniformsUtils.clone(OutlineShader.uniforms) });
    this.material.uniforms.tNormal.value = this.target.texture;
    this.material.uniforms.tDepth.value = this.target.depthTexture;
    this.quad = new FullScreenQuad(this.material);
    this.clearColor = new THREE.Color(0.5, 0.5, 1.0);
    this._saved = new THREE.Color();
  }

  setSize(w, h) {
    this.target.setSize(w, h);
    this.material.uniforms.texel.value.set(1 / w, 1 / h);
  }

  render(renderer, writeBuffer, readBuffer) {
    const { scene, camera } = this;
    const flags = this.hidden.map((o) => o.visible);
    for (const o of this.hidden) o.visible = false;
    const bg = scene.background;
    const savedAlpha = renderer.getClearAlpha();
    renderer.getClearColor(this._saved);
    scene.background = null;
    scene.overrideMaterial = this.normalMaterial;
    renderer.setClearColor(this.clearColor, 0);
    renderer.setRenderTarget(this.target);
    renderer.clear();
    renderer.render(scene, camera);
    scene.overrideMaterial = null;
    scene.background = bg;
    renderer.setClearColor(this._saved, savedAlpha);
    this.hidden.forEach((o, i) => (o.visible = flags[i]));

    const u = this.material.uniforms;
    u.tDiffuse.value = readBuffer.texture;
    u.cameraNear.value = camera.near;
    u.cameraFar.value = camera.far;
    renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer);
    this.quad.render(renderer);
  }

  dispose() {
    this.target.dispose();
    this.material.dispose();
    this.normalMaterial.dispose();
    this.quad.dispose();
  }
}

/** Render → toon ink outlines → HDR bloom → tone mapping/sRGB → FXAA. */
export function createPipeline(renderer, scene, camera, hidden) {
  const size = renderer.getSize(new THREE.Vector2());
  const pr = renderer.getPixelRatio();
  const rt = new THREE.WebGLRenderTarget(size.x * pr, size.y * pr, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, rt);
  composer.setPixelRatio(pr);
  const outline = new ToonOutlinePass(scene, camera, hidden);
  outline.material.uniforms.thickness.value = Math.max(1, pr * 0.85);
  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.62, 0.55, 0.92);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(outline);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  composer.addPass(new FXAAPass());

  return {
    render: () => composer.render(),
    setSize(w, h) {
      composer.setSize(w, h);
    },
  };
}
