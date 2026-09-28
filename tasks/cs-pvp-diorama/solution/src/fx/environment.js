import * as THREE from 'three';

// Night sky dome, moon + sky fill, fog, and distant lightning that briefly lights everything.
export const FLASH = { value: 0, dir: new THREE.Vector3(0, 0.25, -1).normalize() };
const HEMI = 5.5;
const MOON = 7;

const skyShader = {
  vertexShader: /* glsl */ `
    varying vec3 vDir;
    void main() {
      vDir = normalize(position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform float uFlash;
    uniform vec3 uFlashDir;
    uniform float uTime;
    varying vec3 vDir;
    float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float n2(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y);
    }
    void main() {
      vec3 d = normalize(vDir);
      float up = d.y;
      vec3 zenith = vec3(0.012, 0.018, 0.036);
      vec3 horizon = vec3(0.05, 0.07, 0.105);
      vec3 col = mix(horizon, zenith, smoothstep(0.0, 0.6, up));
      col = mix(col, vec3(0.008, 0.01, 0.014), smoothstep(0.0, -0.3, up));
      // slow rain clouds
      vec2 cp = d.xz / max(0.15, up + 0.25) * 2.0 + vec2(uTime * 0.01, 0.0);
      float cl = n2(cp) * 0.6 + n2(cp * 2.3) * 0.3 + n2(cp * 5.1) * 0.1;
      col *= 0.75 + 0.5 * cl;
      // lightning: glow behind the clouds toward the strike, plus a faint forked bolt
      float toward = max(0.0, dot(d, uFlashDir));
      col += vec3(0.55, 0.62, 0.85) * uFlash * (pow(toward, 6.0) * 1.6 + 0.12) * (0.5 + cl);
      float az = atan(d.x, d.z) - atan(uFlashDir.x, uFlashDir.z);
      float jag = (n2(vec2(up * 18.0, 3.0)) - 0.5) * 0.05 + (n2(vec2(up * 60.0, 7.0)) - 0.5) * 0.015;
      float bolt = smoothstep(0.004, 0.0, abs(az - jag)) * smoothstep(0.02, 0.06, up) * smoothstep(0.42, 0.25, up);
      col += vec3(0.8, 0.85, 1.0) * bolt * smoothstep(0.35, 0.8, uFlash) * 4.0;
      gl_FragColor = vec4(col, 1.0);
    }`,
};

export function createEnvironment(scene) {
  scene.fog = new THREE.FogExp2(0x1c2a3e, 0.0042);
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(400, 32, 16),
    new THREE.ShaderMaterial({
      ...skyShader,
      uniforms: { uFlash: FLASH, uFlashDir: { value: FLASH.dir }, uTime: { value: 0 } },
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    }),
  );
  sky.layers.set(1);
  sky.renderOrder = -10;
  scene.add(sky);

  const hemi = new THREE.HemisphereLight(0x7a8ca8, 0x1e2026, HEMI);
  scene.add(hemi);
  const moon = new THREE.DirectionalLight(0xb4c4e0, MOON);
  moon.position.set(-30, 60, -20);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  Object.assign(moon.shadow.camera, { left: -48, right: 48, top: 48, bottom: -48, near: 10, far: 140 });
  moon.shadow.bias = -0.0006;
  moon.shadow.normalBias = 0.04;
  scene.add(moon);

  let next = 5;
  let strike = -100;
  let pulses = [];
  function update(t) {
    if (t > next) {
      strike = t;
      next = t + 9 + Math.random() * 14;
      pulses = [0, 0.09 + Math.random() * 0.08, 0.28 + Math.random() * 0.2].map((o, i) => [o, i === 0 ? 0.55 : 0.35 + Math.random() * 0.65]);
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
      FLASH.dir.set(Math.cos(a), 0.18 + Math.random() * 0.12, Math.sin(a)).normalize();
    }
    const dt = t - strike;
    let f = 0;
    for (const [o, amp] of pulses) if (dt >= o) f += amp * Math.exp(-(dt - o) * 16);
    FLASH.value = Math.min(1.2, f);
    sky.material.uniforms.uTime.value = t;
    hemi.intensity = HEMI + FLASH.value * 14;
    moon.intensity = MOON + FLASH.value * 10;
  }
  return { update };
}
