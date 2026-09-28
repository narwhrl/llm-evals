export const SIZE = 128;
export const WATER_LEVEL = 6;

export const Block = {
  AIR: 0,
  GRASS: 1,
  DIRT: 2,
  STONE: 3,
  SNOW: 4,
  SAND: 5,
  WOOD: 6,
  LEAVES: 7,
};

export const PALETTE = {
  [Block.GRASS]: [0.36, 0.58, 0.24],
  [Block.DIRT]: [0.47, 0.31, 0.19],
  [Block.STONE]: [0.5, 0.51, 0.54],
  [Block.SNOW]: [0.93, 0.95, 0.97],
  [Block.SAND]: [0.8, 0.72, 0.5],
  [Block.WOOD]: [0.39, 0.25, 0.14],
  [Block.LEAVES]: [0.22, 0.44, 0.18],
};

export const WATER_COLOR = [0.22, 0.52, 0.72];
export const WATERFALL_COLOR = [0.48, 0.8, 0.92];
export const CLOUD_COLOR = [0.96, 0.97, 0.99];

export function toWorld(x, y, z, size = SIZE) {
  return {
    wx: x - size / 2 + 0.5,
    wy: y + 0.5,
    wz: z - size / 2 + 0.5,
  };
}

export const DEFAULT_SETTINGS = {
  seed: 42,
  mountainScale: 1,
  vegetation: 0.72,
  cloudDensity: 0.58,
  cloudHeight: 34,
  fogDensity: 0.011,
  timeOfDay: 0.12,
  waterfallSpeed: 1,
  autoRotate: true,
  rotateSpeed: 0.32,
  shadows: true,
};
