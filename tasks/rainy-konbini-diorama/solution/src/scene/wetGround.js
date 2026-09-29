import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { BASE } from './layout.js';

// Transparent overlay above the painted asphalt: blends a planar reflection in by
// wetness, perturbed by procedural rain ripples so reflected lights shimmer and streak.
const WetShader = {
  name: 'WetGroundShader',
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    tWet: { value: null },
    time: { value: 0 },
    size: { value: BASE },
  },
  vertexShader: /* glsl */ `
    uniform mat4 textureMatrix;
    varying vec4 vRefl;
    varying vec2 vWorld;
    varying vec3 vView;
    void main() {
      vRefl = textureMatrix * vec4(position, 1.0);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xz;
      vView = cameraPosition - wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform sampler2D tWet;
    uniform float time;
    uniform float size;
    varying vec4 vRefl;
    varying vec2 vWorld;
    varying vec3 vView;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

    // Expanding rings on a jittered grid; returns xy normal offset and ring brightness in z.
    vec3 ripples(vec2 p, float scale, float speed) {
      vec2 q = p * scale;
      vec2 cell = floor(q);
      vec3 acc = vec3(0.0);
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 c = cell + vec2(float(i), float(j));
          float h = hash(c);
          vec2 center = c + 0.5 + 0.35 * vec2(hash(c + 3.1) - 0.5, hash(c + 7.7) - 0.5);
          float ph = fract(time * speed + h);
          vec2 d = q - center;
          float dist = length(d);
          float r = ph * 0.9;
          float ring = exp(-pow((dist - r) * 16.0, 2.0)) * (1.0 - ph) * (1.0 - ph);
          acc.xy += (dist > 0.0001 ? d / dist : vec2(0.0)) * ring;
          acc.z += ring;
        }
      }
      return acc;
    }

    void main() {
      vec2 wuv = vWorld / size + 0.5;
      vec2 wet = texture2D(tWet, wuv).rg;
      float refl = wet.r + wet.g * 0.75;
      vec3 rp = ripples(vWorld, 2.2, 0.9) + 0.6 * ripples(vWorld + 11.0, 3.4, 1.25);
      vec3 V = normalize(vView);
      float fres = 0.35 + 0.65 * pow(1.0 - clamp(V.y, 0.0, 1.0), 3.0);

      vec4 uv = vRefl;
      float wobble = mix(0.004, 0.012, wet.g);
      uv.xy += rp.xy * wobble * uv.w;
      vec3 col = vec3(0.0);
      // Vertical smear: rough asphalt stretches bright reflections towards the viewer.
      float smear = mix(0.035, 0.012, wet.g) * uv.w;
      col += texture2DProj(tDiffuse, uv).rgb * 0.34;
      col += texture2DProj(tDiffuse, uv + vec4(0.0, smear * 0.5, 0.0, 0.0)).rgb * 0.24;
      col += texture2DProj(tDiffuse, uv - vec4(0.0, smear * 0.5, 0.0, 0.0)).rgb * 0.18;
      col += texture2DProj(tDiffuse, uv + vec4(0.0, smear, 0.0, 0.0)).rgb * 0.14;
      col += texture2DProj(tDiffuse, uv - vec4(0.0, smear, 0.0, 0.0)).rgb * 0.10;

      float a = clamp(refl * (0.3 + fres) * 1.15, 0.0, 0.95);
      col += vec3(0.55, 0.7, 1.0) * rp.z * (0.05 + 0.35 * wet.g);
      gl_FragColor = vec4(col, a);
    }`,
};

export function buildWetGround(ctx, wetTexture) {
  const pr = Math.min(window.devicePixelRatio, 1.5);
  const reflector = new Reflector(new THREE.PlaneGeometry(BASE, BASE), {
    shader: WetShader,
    textureWidth: Math.round(window.innerWidth * pr * 0.6),
    textureHeight: Math.round(window.innerHeight * pr * 0.6),
    clipBias: 0.002,
    multisample: 0,
  });
  reflector.rotation.x = -Math.PI / 2;
  reflector.position.y = 0.006;
  reflector.renderOrder = 1;
  const mat = reflector.material;
  mat.transparent = true;
  mat.depthWrite = false;
  mat.uniforms.tWet.value = wetTexture;
  ctx.root.add(reflector);
  ctx.noOutline.push(reflector);

  // The reflection pass must skip flat decals lying on the plane itself.
  const renderReflection = reflector.onBeforeRender;
  reflector.onBeforeRender = function (renderer, scene, camera) {
    const hidden = ctx.noReflect;
    const flags = hidden.map((o) => o.visible);
    for (const o of hidden) o.visible = false;
    renderReflection.call(this, renderer, scene, camera);
    hidden.forEach((o, i) => (o.visible = flags[i]));
  };

  ctx.updaters.push((t) => (mat.uniforms.time.value = t));
  ctx.resizers.push((w, h) => {
    const p = Math.min(window.devicePixelRatio, 1.5) * 0.6;
    reflector.getRenderTarget().setSize(Math.round(w * p), Math.round(h * p));
  });
  return reflector;
}
