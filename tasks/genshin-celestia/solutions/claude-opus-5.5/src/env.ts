import * as THREE from 'three';
import { GLSL_NOISE } from './noise';

/** Default shot: camera azimuth around the island (radians, from +Z towards +X). */
export const CAMERA_AZIMUTH = THREE.MathUtils.degToRad(35);

// Sun sits behind the island, ~60° left of the view axis, so the left faces catch warm light.
export const SUN_DIR = (() => {
  const f = new THREE.Vector3(-Math.sin(CAMERA_AZIMUTH), 0, -Math.cos(CAMERA_AZIMUTH));
  const left = new THREE.Vector3(f.z, 0, -f.x);
  const az = THREE.MathUtils.degToRad(58), el = THREE.MathUtils.degToRad(27);
  const h = f.multiplyScalar(Math.cos(az)).add(left.multiplyScalar(Math.sin(az))).normalize();
  return new THREE.Vector3(h.x * Math.cos(el), Math.sin(el), h.z * Math.cos(el)).normalize();
})();

const vec3 = (c: THREE.Color | THREE.Vector3) =>
  c instanceof THREE.Color
    ? `vec3(${c.r.toFixed(5)}, ${c.g.toFixed(5)}, ${c.b.toFixed(5)})`
    : `vec3(${c.x.toFixed(5)}, ${c.y.toFixed(5)}, ${c.z.toFixed(5)})`;
const col = (hex: string) => vec3(new THREE.Color(hex));

/** Sky gradient and height-dependent aerial perspective, shared by every shader in the scene. */
export const GLSL_ATMOSPHERE = /* glsl */ `
const vec3 SUN_DIR = ${vec3(SUN_DIR)};
const vec3 SKY_ZENITH = ${col('#1650bd')};
const vec3 SKY_UPPER = ${col('#3a82e4')};
const vec3 SKY_HORIZON = ${col('#b9daf6')};
const vec3 SKY_LOW = ${col('#b3d0ec')};
const vec3 SUN_GLOW = ${col('#ffe2ad')};
const float FOG_A = 2.3e-5;
const float FOG_B = 1.0 / 2600.0;

vec3 skyColor(vec3 dir, float disc) {
  float h = clamp(dir.y, 0.0, 1.0);
  vec3 c = mix(SKY_HORIZON, SKY_UPPER, smoothstep(0.0, 0.16, h));
  c = mix(c, SKY_ZENITH, smoothstep(0.15, 0.8, h));
  c = mix(c, SKY_LOW, smoothstep(0.0, -0.25, dir.y));
  float s = max(dot(dir, SUN_DIR), 0.0);
  c += SUN_GLOW * (0.22 * pow(s, 5.0) + 0.5 * pow(s, 32.0)) * (1.0 - 0.6 * h);
  c += SUN_GLOW * disc * (smoothstep(0.99955, 0.99975, s) * 40.0 + pow(s, 900.0) * 6.0);
  return c;
}

vec3 hazeColor(vec3 dir) {
  return skyColor(vec3(dir.x, max(dir.y, 0.0) * 0.4, dir.z), 0.0);
}

float aerialAmount(vec3 wp) {
  vec3 rd = wp - cameraPosition;
  float fog = FOG_A * exp(-FOG_B * cameraPosition.y) * length(rd);
  float k = FOG_B * rd.y;
  if (abs(k) > 1e-4) fog *= (1.0 - exp(-k)) / k;
  return 1.0 - exp(-fog);
}

vec3 applyAerial(vec3 c, vec3 wp) {
  return mix(c, hazeColor(normalize(wp - cameraPosition)), aerialAmount(wp));
}
`;

/** Routes three.js built-in fog through the aerial perspective model above. Call before compiling materials. */
export function patchFogChunks(): void {
  THREE.ShaderChunk.fog_pars_vertex = '#ifdef USE_FOG\nvarying vec3 vFogWorldPos;\n#endif';
  THREE.ShaderChunk.fog_vertex = /* glsl */ `
#ifdef USE_FOG
  vec4 fogWorld = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    fogWorld = instanceMatrix * fogWorld;
  #endif
  vFogWorldPos = (modelMatrix * fogWorld).xyz;
#endif`;
  THREE.ShaderChunk.fog_pars_fragment = `#ifdef USE_FOG\nvarying vec3 vFogWorldPos;\n${GLSL_ATMOSPHERE}\n#endif`;
  THREE.ShaderChunk.fog_fragment = '#ifdef USE_FOG\ngl_FragColor.rgb = applyAerial(gl_FragColor.rgb, vFogWorldPos);\n#endif';
}

export function createSky(time: { value: number }): THREE.Mesh {
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: { uTime: time },
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main() {
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vWorld;
      ${GLSL_ATMOSPHERE}
      ${GLSL_NOISE}
      void main() {
        vec3 dir = normalize(vWorld - cameraPosition);
        vec3 c = skyColor(dir, 1.0);
        // high cirrus streaks
        if (dir.y > 0.0) {
          vec2 uv = dir.xz / (dir.y + 0.12);
          float n = fbm2(vec2(uv.x * 1.2 + uv.y * 0.6, uv.y * 4.0 - uv.x) * 1.4 + uTime * 0.004);
          float streak = smoothstep(0.52, 0.85, n) * smoothstep(0.02, 0.18, dir.y) * (1.0 - smoothstep(0.55, 0.9, dir.y));
          float s = max(dot(dir, SUN_DIR), 0.0);
          c = mix(c, vec3(1.0, 0.98, 0.95) * (1.05 + 0.5 * pow(s, 6.0)), streak * 0.55);
        }
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(140000, 48, 24), material);
  sky.renderOrder = -10;
  sky.frustumCulled = false;
  return sky;
}

export function createLights(scene: THREE.Scene): THREE.DirectionalLight {
  const sun = new THREE.DirectionalLight('#ffe9c6', 4.0);
  sun.position.copy(SUN_DIR).multiplyScalar(6000);
  sun.target.position.set(0, 0, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  const cam = sun.shadow.camera;
  cam.left = -1900; cam.right = 1900; cam.top = 1900; cam.bottom = -1900;
  cam.near = 1000; cam.far = 13000;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 1.5;
  scene.add(sun, sun.target);
  // Blue sky from above, bright bounce from the cloud sea from below.
  scene.add(new THREE.HemisphereLight('#9fc4ff', '#cdd8ea', 1.35));
  return sun;
}
