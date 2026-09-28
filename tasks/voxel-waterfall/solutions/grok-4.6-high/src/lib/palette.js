export const BLOCK = {
  AIR: 0,
  GRASS: 1,
  DIRT: 2,
  STONE: 3,
  SNOW: 4,
  WATER: 5,
  SAND: 6,
  WOOD: 7,
  LEAF: 8,
  CLOUD: 9,
};

export const BLOCK_COLOR = {
  [BLOCK.GRASS]: [0.23, 0.66, 0.16],
  [BLOCK.DIRT]: [0.56, 0.35, 0.16],
  [BLOCK.STONE]: [0.38, 0.4, 0.44],
  [BLOCK.SNOW]: [0.93, 0.96, 0.99],
  [BLOCK.WATER]: [0.16, 0.55, 0.86],
  [BLOCK.SAND]: [0.84, 0.74, 0.42],
  [BLOCK.WOOD]: [0.4, 0.24, 0.12],
  [BLOCK.LEAF]: [0.16, 0.46, 0.16],
  [BLOCK.CLOUD]: [0.96, 0.97, 1.0],
};

export function varyColor(rgb, x, z, seed, amount = 0.08) {
  const j = (hashTint(x, z, seed) - 0.5) * amount;
  return [
    clamp01(rgb[0] + j),
    clamp01(rgb[1] + j * 0.7),
    clamp01(rgb[2] + j * 0.45),
  ];
}

function hashTint(x, z, seed) {
  let n = Math.imul(x | 0, 1597334677) ^ Math.imul(z | 0, 3812015801) ^ (seed | 0);
  n = Math.imul(n ^ (n >>> 16), 0x7feb352d);
  return ((n ^ (n >>> 15)) >>> 0) / 4294967296;
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
