import * as THREE from 'three';

const DAWN = {
  sunColor: '#ffb070',
  sunIntensity: 1.35,
  sunPos: [-48, 28, 62],
  ambient: '#6b5a86',
  ambientIntensity: 0.48,
  hemiSky: '#ffc9a3',
  hemiGround: '#3a4034',
  hemiIntensity: 0.55,
  fog: '#e8b896',
  skyTop: '#24345f',
  skyBottom: '#f3b184',
  exposure: 1.08,
};

const NOON = {
  sunColor: '#fff4dc',
  sunIntensity: 1.85,
  sunPos: [22, 86, 28],
  ambient: '#8aa2b8',
  ambientIntensity: 0.62,
  hemiSky: '#cfe6ff',
  hemiGround: '#5a6a4a',
  hemiIntensity: 0.7,
  fog: '#c8d8e8',
  skyTop: '#4d7ec8',
  skyBottom: '#dce9f6',
  exposure: 1.12,
};

const DUSK = {
  sunColor: '#ff7348',
  sunIntensity: 1.15,
  sunPos: [56, 18, -42],
  ambient: '#5a4068',
  ambientIntensity: 0.42,
  hemiSky: '#ff9a6a',
  hemiGround: '#2e2830',
  hemiIntensity: 0.48,
  fog: '#d4896c',
  skyTop: '#1b1d46',
  skyBottom: '#ee8a5a',
  exposure: 1.0,
};

const colorA = new THREE.Color();
const colorB = new THREE.Color();

function mixHex(a, b, t) {
  return colorA.set(a).lerp(colorB.set(b), t).getStyle();
}

function mixVec(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function mixLighting(from, to, t) {
  return {
    sunColor: mixHex(from.sunColor, to.sunColor, t),
    sunIntensity: from.sunIntensity + (to.sunIntensity - from.sunIntensity) * t,
    sunPos: mixVec(from.sunPos, to.sunPos, t),
    ambient: mixHex(from.ambient, to.ambient, t),
    ambientIntensity: from.ambientIntensity + (to.ambientIntensity - from.ambientIntensity) * t,
    hemiSky: mixHex(from.hemiSky, to.hemiSky, t),
    hemiGround: mixHex(from.hemiGround, to.hemiGround, t),
    hemiIntensity: from.hemiIntensity + (to.hemiIntensity - from.hemiIntensity) * t,
    fog: mixHex(from.fog, to.fog, t),
    skyTop: mixHex(from.skyTop, to.skyTop, t),
    skyBottom: mixHex(from.skyBottom, to.skyBottom, t),
    exposure: from.exposure + (to.exposure - from.exposure) * t,
  };
}

export function sampleLighting(timeOfDay) {
  const t = Math.min(1, Math.max(0, timeOfDay));
  if (t <= 0.5) return mixLighting(DAWN, NOON, t / 0.5);
  return mixLighting(NOON, DUSK, (t - 0.5) / 0.5);
}
