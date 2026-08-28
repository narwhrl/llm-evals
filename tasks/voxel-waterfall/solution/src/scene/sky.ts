/** 天空穹顶（渐变 + 太阳）、光照与雾；时间轴 晨→午→昏 联动。 */
import * as THREE from 'three';

export interface SkyState {
  sunElevation: number;
  fogColor: THREE.Color;
}

interface SkyKey {
  t: number;
  sun: number;
  sunI: number;
  zenith: number;
  horizon: number;
  fog: number;
  hemiSky: number;
  hemiGround: number;
  hemiI: number;
  ambient: number;
  ambientI: number;
  cloud: number;
}

// 关键帧：清晨 → 上午 → 正午 → 午后 → 黄昏
const KEYS: SkyKey[] = [
  { t: 0.0, sun: 0xffa06a, sunI: 2.3, zenith: 0x2c4a78, horizon: 0xff9e6b, fog: 0xd9a276, hemiSky: 0x8093b8, hemiGround: 0x57503f, hemiI: 0.55, ambient: 0x46506a, ambientI: 0.5, cloud: 0xffd9b8 },
  { t: 0.25, sun: 0xffd9a0, sunI: 2.9, zenith: 0x3b63a5, horizon: 0xbcd4ea, fog: 0xc3d4e2, hemiSky: 0x8fa8cc, hemiGround: 0x5d6a4f, hemiI: 0.62, ambient: 0x55617c, ambientI: 0.5, cloud: 0xfff4e6 },
  { t: 0.5, sun: 0xfff3dd, sunI: 3.1, zenith: 0x4a7fd0, horizon: 0xd7e7f4, fog: 0xcfe0ec, hemiSky: 0x9db8dc, hemiGround: 0x6a755a, hemiI: 0.66, ambient: 0x5f6c88, ambientI: 0.5, cloud: 0xffffff },
  { t: 0.75, sun: 0xffd9a0, sunI: 2.9, zenith: 0x3b63a5, horizon: 0xbcd4ea, fog: 0xc3d4e2, hemiSky: 0x8fa8cc, hemiGround: 0x5d6a4f, hemiI: 0.62, ambient: 0x55617c, ambientI: 0.5, cloud: 0xfff4e6 },
  { t: 1.0, sun: 0xff8f5e, sunI: 2.2, zenith: 0x33406e, horizon: 0xf7886a, fog: 0xd99a76, hemiSky: 0x7d88b0, hemiGround: 0x52483c, hemiI: 0.55, ambient: 0x46506a, ambientI: 0.5, cloud: 0xffc4a4 },
];

/** 打包十六进制颜色必须逐通道插值——直接对整数 lerp 会让 R 的小数位溢出到 G/B。 */
const lerpHex = (a: number, b: number, t: number) => {
  const r = Math.round(((a >> 16) & 255) + (((b >> 16) & 255) - ((a >> 16) & 255)) * t);
  const g = Math.round(((a >> 8) & 255) + (((b >> 8) & 255) - ((a >> 8) & 255)) * t);
  const bl = Math.round((a & 255) + ((b & 255) - (a & 255)) * t);
  return (r << 16) | (g << 8) | bl;
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function sampleKeys(tod: number): SkyKey {
  const t = Math.min(1, Math.max(0, tod));
  let i = 0;
  while (i < KEYS.length - 2 && t > KEYS[i + 1].t) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const f = (t - a.t) / (b.t - a.t);
  return {
    t,
    sun: lerpHex(a.sun, b.sun, f),
    sunI: lerp(a.sunI, b.sunI, f),
    zenith: lerpHex(a.zenith, b.zenith, f),
    horizon: lerpHex(a.horizon, b.horizon, f),
    fog: lerpHex(a.fog, b.fog, f),
    hemiSky: lerpHex(a.hemiSky, b.hemiSky, f),
    hemiGround: lerpHex(a.hemiGround, b.hemiGround, f),
    hemiI: lerp(a.hemiI, b.hemiI, f),
    ambient: lerpHex(a.ambient, b.ambient, f),
    ambientI: lerp(a.ambientI, b.ambientI, f),
    cloud: lerpHex(a.cloud, b.cloud, f),
  };
}

const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
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
  vec3 dir = normalize(vDir);
  float h = clamp(dir.y, -1.0, 1.0);
  vec3 sky = mix(uHorizon, uZenith, pow(clamp(h, 0.0, 1.0), 0.62));
  if (h < 0.0) sky = mix(uHorizon, uHorizon * 0.55, clamp(-h * 3.0, 0.0, 1.0));
  float s = clamp(dot(dir, normalize(uSunDir)), 0.0, 1.0);
  float disc = smoothstep(0.99935, 0.99975, s);
  float glow = pow(s, 220.0) * 0.55 + pow(s, 14.0) * 0.16;
  vec3 col = sky + uSunColor * (disc * 1.4 + glow);
  gl_FragColor = vec4(col, 1.0);
}
`;

export interface SkySystem {
  group: THREE.Group;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  ambient: THREE.AmbientLight;
  fog: THREE.FogExp2;
  domeUniforms: { uZenith: { value: THREE.Color }; uHorizon: { value: THREE.Color }; uSunColor: { value: THREE.Color }; uSunDir: { value: THREE.Vector3 } };
  apply: (tod: number, fogAmount: number, shadows: boolean, cloudMat: THREE.MeshLambertMaterial | null) => SkyState;
  dispose: () => void;
}

/** 构建天空系统：穹顶 + 太阳方向光 + 半球光 + 环境光 + 指数雾。 */
export function buildSky(): SkySystem {
  const group = new THREE.Group();
  const domeUniforms = {
    uZenith: { value: new THREE.Color(0x4a7fd0) },
    uHorizon: { value: new THREE.Color(0xd7e7f4) },
    uSunColor: { value: new THREE.Color(0xfff3dd) },
    uSunDir: { value: new THREE.Vector3(0.4, 0.6, 0.5) },
  };
  const domeGeo = new THREE.SphereGeometry(1400, 48, 24);
  const domeMat = new THREE.ShaderMaterial({
    uniforms: domeUniforms,
    vertexShader: SKY_VERT,
    fragmentShader: SKY_FRAG,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.renderOrder = -10;
  group.add(dome);

  const sun = new THREE.DirectionalLight(0xfff3dd, 3.0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -140;
  sun.shadow.camera.right = 140;
  sun.shadow.camera.top = 140;
  sun.shadow.camera.bottom = -140;
  sun.shadow.camera.near = 40;
  sun.shadow.camera.far = 900;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.9;
  group.add(sun);
  group.add(sun.target);

  const hemi = new THREE.HemisphereLight(0x9db8dc, 0x6a755a, 0.66);
  group.add(hemi);
  const ambient = new THREE.AmbientLight(0x5f6c88, 0.5);
  group.add(ambient);

  const fog = new THREE.FogExp2(0xcfe0ec, 0.0018);
  const sunState = new THREE.Vector3();
  const fogColor = new THREE.Color();

  const apply = (tod: number, fogAmount: number, shadows: boolean, cloudMat: THREE.MeshLambertMaterial | null): SkyState => {
    const k = sampleKeys(tod);
    // 太阳方位：东 → 西；高度：晨昏低、正午高
    const az = THREE.MathUtils.degToRad(100 + 160 * tod);
    const el = THREE.MathUtils.degToRad(Math.max(5, Math.sin(Math.PI * Math.min(Math.max(tod, 0.02), 0.98)) * 58));
    sunState.set(Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az));
    sun.position.copy(sunState).multiplyScalar(420);
    sun.target.position.set(0, 0, 0);
    sun.color.setHex(k.sun);
    sun.intensity = k.sunI;
    sun.castShadow = shadows;

    hemi.color.setHex(k.hemiSky);
    hemi.groundColor.setHex(k.hemiGround);
    hemi.intensity = k.hemiI;
    ambient.color.setHex(k.ambient);
    ambient.intensity = k.ambientI;

    domeUniforms.uZenith.value.setHex(k.zenith);
    domeUniforms.uHorizon.value.setHex(k.horizon);
    domeUniforms.uSunColor.value.setHex(k.sun);
    domeUniforms.uSunDir.value.copy(sunState);

    fogColor.setHex(k.fog);
    fog.color.copy(fogColor);
    fog.density = 0.0004 + 0.0038 * fogAmount;

    if (cloudMat) cloudMat.color.setHex(k.cloud);

    return { sunElevation: el, fogColor };
  };

  const dispose = () => {
    domeGeo.dispose();
    domeMat.dispose();
  };

  return { group, sun, hemi, ambient, fog, domeUniforms, apply, dispose };
}
