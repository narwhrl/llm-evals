import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { NO_OUTLINE, WATER_TIME } from '../core/materials.js';
import { FLASH } from './environment.js';

// One mirror plane just above the asphalt. Puddle mask, ripples, and fresnel decide how much
// reflection shows; raised floors and sidewalks simply hide it.
const shader = {
  name: 'WetGround',
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    uTime: WATER_TIME,
    uFlash: FLASH,
    fogColor: { value: new THREE.Color() },
    fogDensity: { value: 0 },
  },
  vertexShader: /* glsl */ `
    uniform mat4 textureMatrix;
    varying vec4 vRefl;
    varying vec3 vWorld;
    varying float vDepth;
    void main() {
      vRefl = textureMatrix * vec4(position, 1.0);
      vec4 w = modelMatrix * vec4(position, 1.0);
      vWorld = w.xyz;
      vec4 mv = viewMatrix * w;
      vDepth = -mv.z;
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uFlash;
    uniform vec3 fogColor;
    uniform float fogDensity;
    varying vec4 vRefl;
    varying vec3 vWorld;
    varying float vDepth;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
    }
    // Raindrop rings on a jittered grid; returns slope in xy and a crest highlight in z.
    vec3 ripples(vec2 p, float t) {
      vec3 acc = vec3(0.0);
      for (int k = 0; k < 2; k++) {
        vec2 q = p * (k == 0 ? 1.6 : 2.3) + float(k) * 7.31;
        vec2 cell = floor(q);
        vec2 f = fract(q);
        for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
          vec2 o = vec2(float(i), float(j));
          vec2 id = cell + o;
          float h = hash(id);
          vec2 c = o + 0.2 + 0.6 * vec2(h, hash(id + 3.7)) - f;
          float ph = fract(t * (0.55 + 0.45 * h) + h * 9.0);
          float d = length(c);
          float r = ph * 0.5;
          float ring = exp(-pow((d - r) * 26.0, 2.0)) * (1.0 - ph) * (1.0 - ph);
          acc.xy += (d > 0.001 ? c / d : vec2(0.0)) * ring;
          acc.z += ring;
        }
      }
      return acc;
    }
    void main() {
      vec2 p = vWorld.xz;
      float n = noise(p * 0.18) * 0.6 + noise(p * 0.55) * 0.3 + noise(p * 1.9) * 0.1;
      // low spots along kerbs and in the lanes collect more water
      float lane = smoothstep(3.0, 0.4, abs(p.x)) * step(-8.0, p.y) * step(p.y, 16.0);
      float alley = smoothstep(2.2, 0.0, abs(p.x + 27.0));
      float street = smoothstep(1.8, 0.0, abs(p.y - 17.4)) * step(p.x, 16.0);
      float yard = smoothstep(4.0, 0.0, length((p - vec2(24.0, -13.0)) * vec2(0.3, 0.45)));
      float boost = max(max(lane, alley), max(street, yard)) * 0.28;
      float puddle = smoothstep(0.54, 0.6, n + boost);
      float damp = 0.26 + 0.2 * noise(p * 0.9);
      vec3 rp = ripples(p, uTime) * puddle;
      vec2 uv = vRefl.xy / vRefl.w + rp.xy * 0.012 + (noise(p * 3.0 + uTime) - 0.5) * 0.004 * (1.0 - puddle);
      vec3 refl = texture2D(tDiffuse, uv).rgb;
      vec3 V = normalize(cameraPosition - vWorld);
      float fres = 0.04 + 0.96 * pow(1.0 - clamp(V.y, 0.0, 1.0), 5.0);
      float strength = mix(damp * (0.25 + fres), 0.72 + 0.28 * fres, puddle);
      vec3 water = mix(vec3(0.004, 0.006, 0.01), refl, 0.9) + vec3(0.25, 0.32, 0.42) * rp.z * 0.5 * (0.6 + uFlash);
      float a = clamp(strength, 0.0, 0.95);
      float fogF = 1.0 - exp(-fogDensity * fogDensity * vDepth * vDepth);
      water = mix(water, fogColor, fogF);
      gl_FragColor = vec4(water, a);
    }`,
};

export function createWater(scene, halfSize) {
  const size = halfSize * 2 - 1.2;
  const water = new Reflector(new THREE.PlaneGeometry(size, size), {
    shader, textureWidth: 512, textureHeight: 512, clipBias: 0.003, multisample: 0,
  });
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.025;
  water.layers.set(NO_OUTLINE);
  water.camera.layers.enableAll();
  const m = water.material;
  m.transparent = true;
  m.depthWrite = false;
  m.uniforms.uTime = WATER_TIME;
  m.uniforms.uFlash = FLASH;
  m.uniforms.fogColor.value.copy(scene.fog.color);
  m.uniforms.fogDensity.value = scene.fog.density;
  water.renderOrder = 1;
  scene.add(water);
  return {
    mesh: water,
    resize(w, h) {
      water.getRenderTarget().setSize(Math.max(1, Math.round(w / 2)), Math.max(1, Math.round(h / 2)));
    },
  };
}
