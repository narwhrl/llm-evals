import * as THREE from 'three';

// Time-of-day keyframes: t=0 dawn, t=0.5 noon, t=1 dusk.
const STOPS = [
  {
    t: 0.0, label: '清晨', el: 15, az: 118,
    sun: 0xffb073, zenith: 0x27406e, horizon: 0xf0975c, fog: 0xd9a97e,
    hemiSky: 0x8090bb, hemiGround: 0x4a4438, sunI: 2.1, hemiI: 0.5,
  },
  {
    t: 0.5, label: '正午', el: 64, az: 185,
    sun: 0xfff3df, zenith: 0x3c74cf, horizon: 0xcfe6f5, fog: 0xc4d8e4,
    hemiSky: 0x9db8dc, hemiGround: 0x53604a, sunI: 1.7, hemiI: 0.65,
  },
  {
    t: 1.0, label: '黄昏', el: 9, az: 242,
    sun: 0xff8a4a, zenith: 0x2c2c5e, horizon: 0xff9e63, fog: 0xd99a72,
    hemiSky: 0x70709c, hemiGround: 0x453f3a, sunI: 2.2, hemiI: 0.45,
  },
];

const FOG_NEAR = 150, FOG_FAR = 520;

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform vec3 uZenith;
  uniform vec3 uHorizon;
  uniform vec3 uSunColor;
  uniform vec3 uSunDir;
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    vec3 col = mix(uHorizon, uZenith, pow(clamp(d.y, 0.0, 1.0), 0.58));
    float s = max(dot(d, uSunDir), 0.0);
    col += uSunColor * (pow(s, 1200.0) * 1.3 + pow(s, 20.0) * 0.22);
    col = mix(uHorizon * 0.92, col, smoothstep(-0.12, 0.02, d.y));
    gl_FragColor = vec4(pow(max(col, 0.0), vec3(0.4545)), 1.0);
  }
`;

const lerp = (a, b, u) => a + (b - a) * u;

/**
 * Sky dome + sun + hemisphere light + scene fog, all driven by one
 * time-of-day parameter. Also writes lighting/fog uniforms into the
 * shared `waterUniforms` so the custom water shader stays in sync.
 */
export function createSky(scene, waterUniforms) {
  const uniforms = {
    uZenith: { value: new THREE.Color() },
    uHorizon: { value: new THREE.Color() },
    uSunColor: { value: new THREE.Color() },
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  };
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(700, 32, 16),
    new THREE.ShaderMaterial({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      uniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    }),
  );
  dome.renderOrder = -1;
  scene.add(dome);

  const sun = new THREE.DirectionalLight(0xffffff, 1.8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -130;
  sun.shadow.camera.right = 130;
  sun.shadow.camera.top = 130;
  sun.shadow.camera.bottom = -130;
  sun.shadow.camera.near = 20;
  sun.shadow.camera.far = 500;
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 1.5;
  scene.add(sun);
  scene.add(sun.target);

  const hemi = new THREE.HemisphereLight(0x9db8dc, 0x53604a, 0.6);
  scene.add(hemi);
  const ambient = new THREE.AmbientLight(0xffffff, 0.32);
  scene.add(ambient);

  scene.fog = new THREE.Fog(0xc4d8e4, FOG_NEAR, FOG_FAR);

  const cA = new THREE.Color(), cB = new THREE.Color();
  const mixHex = (target, ha, hb, u) => {
    cA.setHex(ha, THREE.SRGBColorSpace);
    cB.setHex(hb, THREE.SRGBColorSpace);
    target.lerpColors(cA, cB, u);
  };

  function setTimeOfDay(t) {
    t = Math.min(1, Math.max(0, t));
    let a = STOPS[0], b = STOPS[1];
    if (t > 0.5) { a = STOPS[1]; b = STOPS[2]; }
    const u = (t - a.t) / (b.t - a.t);

    const el = THREE.MathUtils.degToRad(lerp(a.el, b.el, u));
    const az = THREE.MathUtils.degToRad(lerp(a.az, b.az, u));
    const dir = new THREE.Vector3(
      Math.sin(az) * Math.cos(el),
      Math.sin(el),
      Math.cos(az) * Math.cos(el),
    ).normalize();

    sun.position.copy(dir).multiplyScalar(210);
    sun.intensity = lerp(a.sunI, b.sunI, u);
    mixHex(sun.color, a.sun, b.sun, u);
    mixHex(hemi.color, a.hemiSky, b.hemiSky, u);
    mixHex(hemi.groundColor, a.hemiGround, b.hemiGround, u);
    hemi.intensity = lerp(a.hemiI, b.hemiI, u);
    ambient.intensity = lerp(0.3, 0.34, u);

    mixHex(uniforms.uZenith.value, a.zenith, b.zenith, u);
    mixHex(uniforms.uHorizon.value, a.horizon, b.horizon, u);
    mixHex(uniforms.uSunColor.value, a.sun, b.sun, u);
    uniforms.uSunDir.value.copy(dir);

    mixHex(scene.fog.color, a.fog, b.fog, u);
    scene.fog.near = FOG_NEAR;
    scene.fog.far = FOG_FAR;

    // keep the water shader consistent with the atmosphere
    waterUniforms.uSunDir.value.copy(dir);
    waterUniforms.uSunColor.value.copy(uniforms.uSunColor.value);
    waterUniforms.uFogColor.value.copy(scene.fog.color);
    waterUniforms.uFogNear.value = FOG_NEAR;
    waterUniforms.uFogFar.value = FOG_FAR;
  }

  function dispose() {
    dome.geometry.dispose();
    dome.material.dispose();
  }

  return { setTimeOfDay, dispose };
}

export function timeLabel(t) {
  if (t < 0.2) return '清晨';
  if (t < 0.42) return '上午';
  if (t < 0.6) return '正午';
  if (t < 0.82) return '午后';
  return '黄昏';
}
