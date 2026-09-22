import * as THREE from 'three';

// Full-screen toon outline: render scene to a color+depth target, then a
// depth-discontinuity Sobel darkens silhouettes and creases.
const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2 uTexel;
uniform float uNear;
uniform float uFar;
uniform vec3 uColor;
uniform float uStrength;
varying vec2 vUv;

float linearize(float d) {
  float z = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
}

float depthAt(vec2 uv) {
  return linearize(texture2D(tDepth, uv).x);
}

void main() {
  vec4 col = texture2D(tDiffuse, vUv);
  float c = depthAt(vUv);
  float l = depthAt(vUv - vec2(uTexel.x, 0.0));
  float r = depthAt(vUv + vec2(uTexel.x, 0.0));
  float u = depthAt(vUv + vec2(0.0, uTexel.y));
  float d = depthAt(vUv - vec2(0.0, uTexel.y));
  float dl = depthAt(vUv + uTexel);
  float dr = depthAt(vUv - uTexel);

  float edge = 0.0;
  edge = max(edge, abs(l - c));
  edge = max(edge, abs(r - c));
  edge = max(edge, abs(u - c));
  edge = max(edge, abs(d - c));
  edge = max(edge, abs(dl - c) * 0.7);
  edge = max(edge, abs(dr - c) * 0.7);

  // Scale threshold with distance so far surfaces do not self-outline.
  float rel = edge / max(c, 0.001);
  float outline = smoothstep(0.045, 0.11, rel);
  // Keep sky-to-silhouette edges crisp.
  float sky = smoothstep(60.0, 150.0, c);
  outline = max(outline, step(0.5, sky) * step(0.02, edge / max(min(c, 60.0), 1.0)));

  col.rgb = mix(col.rgb, uColor, clamp(outline, 0.0, 1.0) * uStrength);

  // linear → sRGB (scene RT stores linear light; canvas expects sRGB).
  vec3 lc = max(col.rgb, 0.0);
  vec3 srgb = mix(lc * 12.92, 1.055 * pow(lc, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, lc));
  gl_FragColor = vec4(srgb, 1.0);
}
`;

export class OutlinePipeline {
  constructor(renderer) {
    this.renderer = renderer;
    this.target = null;
    this.uniforms = {
      tDiffuse: { value: null },
      tDepth: { value: null },
      uTexel: { value: new THREE.Vector2(1 / 1024, 1 / 1024) },
      uNear: { value: 1 },
      uFar: { value: 400 },
      uColor: { value: new THREE.Color(0x070a10) },
      uStrength: { value: 0.9 },
    };
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
      -1, -1, 0, 3, -1, 0, -1, 3, 0,
    ]), 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
      0, 0, 2, 0, 0, 2,
    ]), 2));
    this.quad = new THREE.Mesh(geo, new THREE.RawShaderMaterial({
      vertexShader: `precision highp float;
attribute vec3 position; attribute vec2 uv; varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: FRAG,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
    }));
    this.quad.frustumCulled = false;
    this.fsScene = new THREE.Scene();
    this.fsScene.add(this.quad);
    this.fsCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this._w = 0;
    this._h = 0;
  }

  setSize(w, h) {
    w = Math.max(1, Math.floor(w));
    h = Math.max(1, Math.floor(h));
    if (w === this._w && h === this._h) return;
    this._w = w;
    this._h = h;
    if (this.target) this.target.dispose();
    const depthTexture = new THREE.DepthTexture(w, h);
    depthTexture.type = THREE.UnsignedIntType;
    this.target = new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthTexture,
      samples: 4,
    });
    this.uniforms.tDiffuse.value = this.target.texture;
    this.uniforms.tDepth.value = depthTexture;
    this.uniforms.uTexel.value.set(1 / w, 1 / h);
  }

  render(scene, camera) {
    const { renderer, target } = this;
    this.uniforms.uNear.value = camera.near;
    this.uniforms.uFar.value = camera.far;
    renderer.setRenderTarget(target);
    renderer.clear();
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.render(this.fsScene, this.fsCamera);
  }
}
