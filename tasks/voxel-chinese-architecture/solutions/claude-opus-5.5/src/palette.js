import { Color } from 'three';

// Surface classes; each becomes one mesh with its own material.
export const MATTE = 0;
export const GLAZED = 1;
export const GLOW = 2;

// name: [sRGB hex, surface, per-voxel brightness jitter]
const DEFS = {
  soil: [0x6b4f36, MATTE, 0.08],
  grass: [0x6f8f3e, MATTE, 0.1],
  grassDark: [0x5a7a34, MATTE, 0.1],
  grassDry: [0x93904a, MATTE, 0.1],
  moss: [0x4f6a36, MATTE, 0.08],
  rock: [0x7d7a72, MATTE, 0.08],
  rockDark: [0x5f5d58, MATTE, 0.08],
  gravel: [0xa19783, MATTE, 0.08],
  pave: [0x9c978d, MATTE, 0.05],
  paveDark: [0x86827a, MATTE, 0.05],
  slab: [0xb5b0a4, MATTE, 0.04],
  slabEdge: [0x807b71, MATTE, 0.04],
  marble: [0xe4e0d4, MATTE, 0.03],
  marbleShade: [0xc9c4b6, MATTE, 0.03],
  carve: [0xd4cdb8, MATTE, 0.03],
  brickGrey: [0x6e6f6f, MATTE, 0.06],
  wallRed: [0xa8352b, MATTE, 0.04],
  wallRedDark: [0x8c2a23, MATTE, 0.04],
  column: [0x9e2a20, MATTE, 0.03],
  wood: [0x8a5a34, MATTE, 0.05],
  woodDark: [0x5a3a24, MATTE, 0.05],
  door: [0x7d2219, MATTE, 0.03],
  lattice: [0xc98f3a, MATTE, 0.03],
  paper: [0xe9dcb6, MATTE, 0.02],
  studs: [0xd9ad3c, GLAZED, 0.02],
  teal: [0x2f7f78, MATTE, 0.03],
  blue: [0x2b4f86, MATTE, 0.03],
  green: [0x3e7a45, MATTE, 0.03],
  gold: [0xe0b240, GLAZED, 0.02],
  plaque: [0x1f3566, MATTE, 0.02],
  tileY: [0xdea424, GLAZED, 0.03],
  tileYDark: [0xba841a, GLAZED, 0.03],
  tileYEdge: [0x9c6a14, GLAZED, 0.03],
  ridgeY: [0xc98f1c, GLAZED, 0.02],
  tileG: [0x5b626b, GLAZED, 0.03],
  tileGDark: [0x4a5058, GLAZED, 0.03],
  tileGEdge: [0x3c4148, GLAZED, 0.03],
  ridgeG: [0x3d434a, GLAZED, 0.02],
  rafterA: [0x2f7f78, MATTE, 0.02],
  rafterB: [0xa8352b, MATTE, 0.02],
  gable: [0x9a3026, MATTE, 0.03],
  bronze: [0x5e4c30, GLAZED, 0.04],
  bronzeDark: [0x3e3222, GLAZED, 0.04],
  lionStone: [0x8e8a80, MATTE, 0.05],
  lionDark: [0x6d6960, MATTE, 0.05],
  drumSkin: [0xd9c69a, MATTE, 0.02],
  trunk: [0x5b4330, MATTE, 0.06],
  pine: [0x2f5a34, MATTE, 0.1],
  pineDark: [0x244a2b, MATTE, 0.1],
  cypress: [0x3a6340, MATTE, 0.1],
  ginkgo: [0xe3b23a, MATTE, 0.12],
  ginkgoDeep: [0xc98f22, MATTE, 0.12],
  maple: [0xc4482a, MATTE, 0.12],
  water: [0x3f6f7d, GLAZED, 0.03],
  lantern: [0xff5a2e, GLOW, 0],
  lanternGold: [0xffc45a, GLOW, 0],
  window: [0xffd489, GLOW, 0],
  incense: [0xff8a3a, GLOW, 0],
};

export const P = {};
export const COLORS = []; // linear RGB triplets, index 0 unused (empty voxel)
export const SURFACE = [];
export const JITTER = [];

COLORS.push([0, 0, 0]);
SURFACE.push(MATTE);
JITTER.push(0);
const c = new Color();
for (const [name, [hex, surface, jitter]] of Object.entries(DEFS)) {
  P[name] = COLORS.length;
  c.setHex(hex); // converts sRGB to the linear working space
  COLORS.push([c.r, c.g, c.b]);
  SURFACE.push(surface);
  JITTER.push(jitter);
}
