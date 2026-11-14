import * as THREE from 'three';

export const palette = {
  stone: 0xf6f0e2,
  stoneShade: 0xd7ccb4,
  stoneLight: 0xfffbf0,
  gold: 0xd9b465,
  goldBright: 0xffdc94,
  roof: 0x677da1,
  roofDeep: 0x44597c,
  window: 0x9cc9e6,
  grass: 0x86c26c,
  grassDark: 0x5b9a51,
  rockLight: 0x9b8f7c,
  rockDark: 0x40382f,
  trunk: 0x826247,
  leaf: 0x5da55f,
  leafLight: 0x8fca79,
  water: 0xc9edfb,
  cloud: 0xffffff,
  beam: 0xffe7b8,
  fog: 0xa8c9e4,
} as const;

export interface Materials {
  stone: THREE.MeshStandardMaterial;
  stoneShade: THREE.MeshStandardMaterial;
  stoneLight: THREE.MeshStandardMaterial;
  stoneDeck: THREE.MeshStandardMaterial;
  gold: THREE.MeshStandardMaterial;
  goldGlow: THREE.MeshStandardMaterial;
  roof: THREE.MeshStandardMaterial;
  roofDeep: THREE.MeshStandardMaterial;
  window: THREE.MeshStandardMaterial;
  grass: THREE.MeshStandardMaterial;
  grassDark: THREE.MeshStandardMaterial;
  rock: THREE.MeshStandardMaterial;
  debris: THREE.MeshStandardMaterial;
  trunk: THREE.MeshStandardMaterial;
  leaf: THREE.MeshStandardMaterial;
  leafLight: THREE.MeshStandardMaterial;
  water: THREE.MeshBasicMaterial;
  cloud: THREE.MeshBasicMaterial;
}

export function createMaterials(): Materials {
  const stone = new THREE.MeshStandardMaterial({
    color: palette.stone,
    roughness: 0.86,
    metalness: 0.02,
  });
  const stoneShade = new THREE.MeshStandardMaterial({
    color: palette.stoneShade,
    roughness: 0.92,
    metalness: 0.02,
  });
  const stoneLight = new THREE.MeshStandardMaterial({
    color: palette.stoneLight,
    roughness: 0.7,
    metalness: 0.03,
  });
  const stoneDeck = new THREE.MeshStandardMaterial({
    color: palette.stone,
    roughness: 0.84,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });
  const gold = new THREE.MeshStandardMaterial({
    color: palette.gold,
    roughness: 0.45,
    metalness: 0.3,
  });
  const goldGlow = new THREE.MeshStandardMaterial({
    color: palette.goldBright,
    emissive: 0xffb347,
    emissiveIntensity: 1.0,
    roughness: 0.32,
    metalness: 0.32,
  });
  const roof = new THREE.MeshStandardMaterial({
    color: palette.roof,
    roughness: 0.72,
    metalness: 0.12,
  });
  const roofDeep = new THREE.MeshStandardMaterial({
    color: palette.roofDeep,
    roughness: 0.8,
    metalness: 0.1,
  });
  const window = new THREE.MeshStandardMaterial({
    color: palette.window,
    emissive: 0x356b98,
    emissiveIntensity: 0.5,
    roughness: 0.32,
    metalness: 0.15,
  });
  const grass = new THREE.MeshStandardMaterial({
    color: palette.grass,
    roughness: 1,
    metalness: 0,
  });
  const grassDark = new THREE.MeshStandardMaterial({
    color: palette.grassDark,
    roughness: 1,
    metalness: 0,
    flatShading: true,
  });
  const rock = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: 1,
    metalness: 0,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const debris = new THREE.MeshStandardMaterial({
    color: 0x8b8171,
    roughness: 1,
    metalness: 0,
    flatShading: true,
  });
  const trunk = new THREE.MeshStandardMaterial({
    color: palette.trunk,
    roughness: 1,
    metalness: 0,
    flatShading: true,
  });
  const leaf = new THREE.MeshStandardMaterial({
    color: palette.leaf,
    roughness: 1,
    metalness: 0,
    flatShading: true,
  });
  const leafLight = new THREE.MeshStandardMaterial({
    color: palette.leafLight,
    roughness: 1,
    metalness: 0,
    flatShading: true,
  });
  const water = new THREE.MeshBasicMaterial({
    color: palette.water,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
    depthWrite: false,
    fog: true,
  });
  const cloud = new THREE.MeshBasicMaterial({
    color: palette.cloud,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: true,
  });

  return {
    stone,
    stoneShade,
    stoneLight,
    stoneDeck,
    gold,
    goldGlow,
    roof,
    roofDeep,
    window,
    grass,
    grassDark,
    rock,
    debris,
    trunk,
    leaf,
    leafLight,
    water,
    cloud,
  };
}
