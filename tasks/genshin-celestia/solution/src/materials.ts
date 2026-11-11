import * as THREE from 'three';
import {
  createGroundDetailTexture,
  createStoneDetailTexture,
  createToonGradient,
} from './utils';

const gradient = createToonGradient();
const stoneDetail = createStoneDetailTexture(147);
stoneDetail.repeat.set(2.5, 3.5);
const groundDetail = createGroundDetailTexture(219);
groundDetail.repeat.set(4, 4);

const toon = (
  color: THREE.ColorRepresentation,
  options: Partial<THREE.MeshToonMaterialParameters> = {},
): THREE.MeshToonMaterial =>
  new THREE.MeshToonMaterial({
    color,
    gradientMap: gradient,
    ...options,
  });

const cliffMaterial = toon(0xffffff, { vertexColors: true, map: stoneDetail });
const grassMaterial = toon(0xd7e0c5, { vertexColors: true, map: groundDetail });
const earthMaterial = toon(0xffffff, { vertexColors: true });
const rockPlainMaterial = toon(0x807469);

export const materials = {
  ivory: toon(0xfaecd2),
  ivoryBright: toon(0xfff8e9),
  ivoryShade: toon(0xd8cbb9),
  warmStone: toon(0xe7d3b1),
  warmStoneShade: toon(0xbfa78b),
  roofBlue: toon(0x7aa5ad),
  roofBlueShade: toon(0x5f8792),
  rockPlain: rockPlainMaterial,
  cliff: cliffMaterial,
  grass: grassMaterial,
  earth: earthMaterial,
  gold: new THREE.MeshStandardMaterial({
    color: 0xf4c45f,
    metalness: 0.82,
    roughness: 0.24,
    emissive: 0x4d2c05,
    emissiveIntensity: 0.34,
  }),
  goldBright: new THREE.MeshStandardMaterial({
    color: 0xffdf86,
    metalness: 0.72,
    roughness: 0.18,
    emissive: 0x8e5a10,
    emissiveIntensity: 0.9,
  }),
  goldDark: new THREE.MeshStandardMaterial({
    color: 0x9d6b2d,
    metalness: 0.8,
    roughness: 0.34,
  }),
  window: new THREE.MeshStandardMaterial({
    color: 0x24475c,
    emissive: 0x173a4e,
    emissiveIntensity: 0.75,
    roughness: 0.28,
    metalness: 0.05,
  }),
  windowWarm: new THREE.MeshStandardMaterial({
    color: 0xffd488,
    emissive: 0xf5a73a,
    emissiveIntensity: 1.5,
    roughness: 0.35,
  }),
  dark: toon(0x383f43),
  trunk: toon(0x644b38),
  leaves: new THREE.MeshToonMaterial({
    color: 0xffffff,
    gradientMap: gradient,
    vertexColors: false,
  }),
  water: new THREE.MeshPhysicalMaterial({
    color: 0x89dbef,
    roughness: 0.16,
    metalness: 0.02,
    transparent: true,
    opacity: 0.72,
    transmission: 0.08,
    depthWrite: false,
    side: THREE.DoubleSide,
  }),
  cloud: new THREE.MeshStandardMaterial({
    color: 0xf6fbff,
    roughness: 1,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    flatShading: true,
  }),
} as const;

export const sunDirection = new THREE.Vector3(-0.56, 0.42, 0.72).normalize();
