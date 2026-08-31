// Toon material factory + shared palette. MeshToonMaterial with stepped
// gradient maps gives the hard three-pass (三渲二) shading; outlines are added
// globally by OutlineEffect in main.js.
import * as THREE from 'three';
import { noOutline } from './utils.js';
import * as T from './textures.js';

function gradientMap(levels) {
  const data = new Uint8Array(levels);
  const tex = new THREE.DataTexture(data, levels.length, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

// 4-step day/night ramp; slightly lifted floor so shadows stay readable.
export const RAMP = gradientMap([46, 108, 190, 255]);
export const RAMP_SOFT = gradientMap([56, 118, 186, 235]);

const cache = new Map();
export function toon(key, opts = {}) {
  if (cache.has(key)) return cache.get(key);
  const m = new THREE.MeshToonMaterial({ gradientMap: RAMP, ...opts });
  cache.set(key, m);
  return m;
}

// Self-lit emissive material (bulbs, screens, glow slivers).
export function glowMat(color, intensity = 1) {
  return noOutline(new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), toneMapped: true }));
}

export function glassMat() {
  return noOutline(new THREE.MeshToonMaterial({
    map: T.glassTexture(),
    transparent: true,
    opacity: 0.55,
    gradientMap: RAMP_SOFT,
    depthWrite: false,
  }));
}

// ---------------------------------------------------------------- shared ----
// Central palette keeps the whole diorama coherent and cold-industrial.
export const M = {
  concrete: toon('concrete', { color: 0x868c96, map: T.concreteTexture('#767b86', { seed: 31 }) }),
  concreteDark: toon('concreteDark', { color: 0x6d7178, map: T.concreteTexture('#5f636c', { seed: 33, rustStreaks: 10 }) }),
  concreteWall: toon('concreteWall', { color: 0x9aa0aa, map: T.concreteTexture('#8a8f9a', { seed: 35, rustStreaks: 8 }) }),
  asphalt: null, // built in ground.js
  steel: toon('steel', { color: 0x7d838e, map: T.rustIronTexture(91) }),
  steelDark: toon('steelDark', { color: 0x565b64, map: T.rustIronTexture(95) }),
  rustHeavy: toon('rustHeavy', { color: 0x7a5a3a, map: T.rustIronTexture(99) }),
  wood: toon('wood', { color: 0xb99a6f, map: T.woodTexture('#8a6b45', { seed: 51 }) }),
  woodDark: toon('woodDark', { color: 0x8a6b48, map: T.woodTexture('#6e5335', { seed: 53 }) }),
  crate: toon('crate', { color: 0xc4a878, map: T.crateTexture(61) }),
  cardboard: toon('cardboard', { color: 0xb5926a, map: T.cardboardTexture(71) }),
  sack: toon('sack', { color: 0xb3a074, map: T.sackTexture(101) }),
  barrel: toon('barrel', { color: 0x9db8d8, map: T.barrelTexture('#3d6fa8', 81) }),
  barrelRed: toon('barrelRed', { color: 0xd8927a, map: T.barrelTexture('#8a3a2c', 83) }),
  stripe: toon('stripe', { color: 0xd8dce2, map: T.stripeTexture() }),
  corrGreen: toon('corrGreen', { color: 0x9fae9d, map: T.corrugatedTexture('#5c6d5f', { rust: 0.6, seed: 41 }) }),
  corrBlue: toon('corrBlue', { color: 0x8ea4bd, map: T.corrugatedTexture('#4a647e', { rust: 0.7, seed: 43 }) }),
  corrRust: toon('corrRust', { color: 0xa87f5c, map: T.corrugatedTexture('#7a4e34', { rust: 1.0, seed: 45 }) }),
  corrGray: toon('corrGray', { color: 0x99a0a8, map: T.corrugatedTexture('#616a72', { rust: 0.8, seed: 47 }) }),
  slatDoor: toon('slatDoor', { color: 0xb0a79a, map: T.corrugatedTexture('#77726a', { rust: 0.9, seed: 49, slats: 14 }) }),
  tire: toon('tire', { color: 0x2a2c30 }),
  tireSide: toon('tireSide', { color: 0x3a3d42 }),
  policeWhite: toon('policeWhite', { color: 0xdfe3ea }),
  policeBlue: toon('policeBlue', { color: 0x2e4d8f }),
  olive: toon('olive', { color: 0x6d7350 }),
  paper: toon('paper', { color: 0xd8d5cb }),
  warmGlow: glowMat(0xffc873, 1.4),
  coldGlow: glowMat(0xd6e6ff, 1.3),
  redGlow: glowMat(0xff5040, 1.6),
  blueGlow: glowMat(0x4a7dff, 1.6),
  darkInside: toon('darkInside', { color: 0x14161c }),
  water: null, // built in ground.js
};
