import * as THREE from 'three';

// Time-of-day keyframes: 0 = dawn, 0.5 = noon, 1 = dusk.
const KEYS = [
  {
    t: 0,
    sunColor: new THREE.Color(0xffb36b),
    sunIntensity: 2.0,
    elevation: 13,
    azimuth: 118,
    sky: new THREE.Color(0xf6c493),
    hemiSky: new THREE.Color(0xffe3c2),
    hemiGround: new THREE.Color(0x8a7360),
    hemiIntensity: 0.55,
    fogNear: 200,
    fogFar: 520,
  },
  {
    t: 0.5,
    sunColor: new THREE.Color(0xfff3e0),
    sunIntensity: 2.6,
    elevation: 64,
    azimuth: 38,
    sky: new THREE.Color(0x8ec8ee),
    hemiSky: new THREE.Color(0xcfe8ff),
    hemiGround: new THREE.Color(0x6f7f5a),
    hemiIntensity: 0.7,
    fogNear: 240,
    fogFar: 620,
  },
  {
    t: 1,
    sunColor: new THREE.Color(0xff8a5c),
    sunIntensity: 1.8,
    elevation: 9,
    azimuth: -52,
    sky: new THREE.Color(0xc98ba4),
    hemiSky: new THREE.Color(0xe0b4c8),
    hemiGround: new THREE.Color(0x5e5462),
    hemiIntensity: 0.5,
    fogNear: 190,
    fogFar: 500,
  },
];

const lerp = (a, b, k) => a + (b - a) * k;

export function applyTimeOfDay(t, { scene, sun, hemi, center }) {
  t = Math.min(1, Math.max(0, t));
  let a = KEYS[0];
  let b = KEYS[1];
  if (t > 0.5) {
    a = KEYS[1];
    b = KEYS[2];
  }
  const k = (t - a.t) / (b.t - a.t);

  sun.color.lerpColors(a.sunColor, b.sunColor, k);
  sun.intensity = lerp(a.sunIntensity, b.sunIntensity, k);
  const elev = THREE.MathUtils.degToRad(lerp(a.elevation, b.elevation, k));
  const azim = THREE.MathUtils.degToRad(lerp(a.azimuth, b.azimuth, k));
  const r = 190;
  sun.position.set(
    center.x + r * Math.cos(elev) * Math.cos(azim),
    r * Math.sin(elev),
    center.z + r * Math.cos(elev) * Math.sin(azim),
  );
  sun.target.position.copy(center);
  sun.target.updateMatrixWorld();

  hemi.color.lerpColors(a.hemiSky, b.hemiSky, k);
  hemi.groundColor.lerpColors(a.hemiGround, b.hemiGround, k);
  hemi.intensity = lerp(a.hemiIntensity, b.hemiIntensity, k);

  const sky = new THREE.Color().lerpColors(a.sky, b.sky, k);
  scene.background = sky;
  if (scene.fog) {
    scene.fog.color.copy(sky);
    scene.fog.near = lerp(a.fogNear, b.fogNear, k);
    scene.fog.far = lerp(a.fogFar, b.fogFar, k);
  }
}
