import * as THREE from 'three';

/**
 * HDR post-processing chain.
 *
 *   geodesic scene (half-float RT, linear HDR)
 *     → bright-pass with soft knee (uBloomThreshold)
 *     → Kawase dual-filter downsample chain (quality-controlled mip count)
 *     → composite: HDR bloom add, ACES tone mapping, exposure, chromatic
 *       aberration, vignette, film grain, sRGB encode
 *
 * Debug views bypass the artistic chain (see uDebugView in the composite
 * shader) so diagnostics show raw scene values, not the graded image.
 */

const QUAD_VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const BRIGHT_PASS_SHADER = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTex;
uniform float uBloomThreshold;

void main() {
  vec3 c = texture2D(uTex, vUv).rgb;
  float br = max(c.r, max(c.g, c.b));
  // UE-style soft knee so the threshold doesn't hard-clip the disk glow.
  float knee = max(uBloomThreshold * 0.5, 1e-4);
  float soft = clamp(br - uBloomThreshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee);
  float contrib = max(soft, br - uBloomThreshold) / max(br, 1e-4);
  gl_FragColor = vec4(c * contrib, 1.0);
}
`;

const DOWNSAMPLE_SHADER = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTex;
uniform vec2 uTexel;

void main() {
  // Kawase dual-filter downsample: cheap, wide, stable bloom spread.
  vec4 c = texture2D(uTex, vUv) * 4.0;
  c += texture2D(uTex, vUv + uTexel * vec2( 1.0,  1.0));
  c += texture2D(uTex, vUv + uTexel * vec2(-1.0,  1.0));
  c += texture2D(uTex, vUv + uTexel * vec2( 1.0, -1.0));
  c += texture2D(uTex, vUv + uTexel * vec2(-1.0, -1.0));
  gl_FragColor = c / 8.0;
}
`;

const COMPOSITE_SHADER = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D uScene;
uniform sampler2D uBloom0;
uniform sampler2D uBloom1;
uniform sampler2D uBloom2;
uniform sampler2D uBloom3;
uniform sampler2D uBloom4;
uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uAberration;
uniform float uTime;
uniform vec2 uResolution;
uniform int uDebugView;
uniform int uBloomMips;

// ACES filmic tone mapping (Narkowicz approximation of the ACES curve).
vec3 acesTonemap(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

vec3 sRGBEncode(vec3 c) {
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(max(c, vec3(0.0031308)), vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), c));
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  // Diagnostics (1–6, 8, 9) and the pre-post HDR view (7) bypass the artistic
  // chain entirely so they report raw scene values.
  if (uDebugView != 0) {
    vec3 raw = texture2D(uScene, vUv).rgb;
    if (uDebugView == 7) raw *= uExposure;  // 后处理前 HDR：仅曝光
    gl_FragColor = vec4(sRGBEncode(clamp(raw, 0.0, 1.0)), 1.0);
    return;
  }

  vec2 centered = vUv - 0.5;
  float r2 = dot(centered, centered);

  // Chromatic aberration: radial channel separation, strongest at the frame
  // edge, kept subtle so the photon ring stays legible everywhere.
  float ca = uAberration * 0.0035 * smoothstep(0.05, 0.5, r2);
  vec3 scene;
  scene.r = texture2D(uScene, vUv + centered * ca).r;
  scene.g = texture2D(uScene, vUv).g;
  scene.b = texture2D(uScene, vUv - centered * ca).b;

  vec3 bloom = vec3(0.0);
  bloom += texture2D(uBloom0, vUv).rgb * 0.42 * step(0.5, float(uBloomMips));
  bloom += texture2D(uBloom1, vUv).rgb * 0.28 * step(1.5, float(uBloomMips));
  bloom += texture2D(uBloom2, vUv).rgb * 0.16 * step(2.5, float(uBloomMips));
  bloom += texture2D(uBloom3, vUv).rgb * 0.08 * step(3.5, float(uBloomMips));
  bloom += texture2D(uBloom4, vUv).rgb * 0.06 * step(4.5, float(uBloomMips));

  vec3 hdr = scene + bloom * uBloomStrength;
  vec3 mapped = acesTonemap(hdr * uExposure);

  // Vignette: gentle falloff that never reaches the central subject.
  float vig = 1.0 - uVignette * smoothstep(0.08, 0.62, r2);
  mapped *= vig;

  // Film grain: static when the simulation time is frozen (?capture).
  float g = grainHash(vUv * uResolution + vec2(uTime * 37.0, uTime * 17.0));
  mapped += (g - 0.5) * uGrain * 0.35;

  gl_FragColor = vec4(sRGBEncode(clamp(mapped, 0.0, 1.0)), 1.0);
}
`;

const MAX_BLOOM_MIPS = 5;

function createRenderTarget(width, height) {
  return new THREE.WebGLRenderTarget(width, height, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
  });
}

function createPassMaterial(fragmentShader, uniforms) {
  return new THREE.ShaderMaterial({
    vertexShader: QUAD_VERTEX_SHADER,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });
}

export class PostChain {
  constructor(renderer) {
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );
    this.quad = new THREE.Mesh(geometry, null);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);

    this.brightMaterial = createPassMaterial(BRIGHT_PASS_SHADER, {
      uTex: { value: null },
      uBloomThreshold: { value: 1.0 },
    });
    this.downsampleMaterial = createPassMaterial(DOWNSAMPLE_SHADER, {
      uTex: { value: null },
      uTexel: { value: new THREE.Vector2(1, 1) },
    });
    const bloomUniforms = {};
    for (let i = 0; i < MAX_BLOOM_MIPS; i++) {
      bloomUniforms[`uBloom${i}`] = { value: null };
    }
    this.compositeMaterial = createPassMaterial(COMPOSITE_SHADER, {
      uScene: { value: null },
      ...bloomUniforms,
      uBloomStrength: { value: 0.85 },
      uExposure: { value: 1.15 },
      uVignette: { value: 0.55 },
      uGrain: { value: 0.06 },
      uAberration: { value: 0.5 },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uDebugView: { value: 0 },
      uBloomMips: { value: 0 },
    });

    const black = createRenderTarget(1, 1);
    this.blackTexture = black.texture;
    this.sceneRT = null;
    this.bloomRTs = [];
  }

  /** (Re)build targets for a scene resolution and active bloom mip count. */
  setSize(sceneWidth, sceneHeight, bloomMips) {
    this.disposeTargets();
    const w = Math.max(2, sceneWidth | 0);
    const h = Math.max(2, sceneHeight | 0);
    this.sceneRT = createRenderTarget(w, h);
    const mw = Math.max(1, Math.min(bloomMips, MAX_BLOOM_MIPS));
    let bw = Math.max(2, w >> 1);
    let bh = Math.max(2, h >> 1);
    for (let i = 0; i < mw; i++) {
      this.bloomRTs.push(createRenderTarget(bw, bh));
      bw = Math.max(2, bw >> 1);
      bh = Math.max(2, bh >> 1);
    }
    const u = this.compositeMaterial.uniforms;
    u.uBloomMips.value = mw;
    for (let i = 0; i < MAX_BLOOM_MIPS; i++) {
      u[`uBloom${i}`].value = this.bloomRTs[i]?.texture ?? this.blackTexture;
    }
  }

  get bloomMips() {
    return this.bloomRTs.length;
  }

  renderPass(material, target) {
    this.quad.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Run the chain for one frame. `sceneUniforms` are the live geodesic
   * parameter sinks; `params` are the post-processing parameters.
   */
  render({ params, simTime, debugView, drawingSize }) {
    const u = this.compositeMaterial.uniforms;
    u.uBloomStrength.value = params.bloomStrength;
    u.uExposure.value = params.exposure;
    u.uVignette.value = params.vignette;
    u.uGrain.value = params.grain;
    u.uAberration.value = params.aberration;
    u.uTime.value = simTime;
    u.uResolution.value.set(drawingSize.width, drawingSize.height);
    u.uDebugView.value = debugView;

    this.brightMaterial.uniforms.uTex.value = this.sceneRT.texture;
    this.brightMaterial.uniforms.uBloomThreshold.value = params.bloomThreshold;
    if (this.bloomRTs.length > 0) {
      this.renderPass(this.brightMaterial, this.bloomRTs[0]);
      for (let i = 1; i < this.bloomRTs.length; i++) {
        this.downsampleMaterial.uniforms.uTex.value = this.bloomRTs[i - 1].texture;
        const t = this.bloomRTs[i];
        this.downsampleMaterial.uniforms.uTexel.value.set(1 / t.width, 1 / t.height);
        this.renderPass(this.downsampleMaterial, t);
      }
    }

    u.uScene.value = this.sceneRT.texture;
    this.renderPass(this.compositeMaterial, null);
  }

  disposeTargets() {
    this.sceneRT?.dispose();
    this.sceneRT = null;
    for (const rt of this.bloomRTs) rt.dispose();
    this.bloomRTs = [];
  }

  dispose() {
    this.disposeTargets();
    this.blackTexture.dispose();
    this.brightMaterial.dispose();
    this.downsampleMaterial.dispose();
    this.compositeMaterial.dispose();
    this.quad.geometry.dispose();
  }
}
