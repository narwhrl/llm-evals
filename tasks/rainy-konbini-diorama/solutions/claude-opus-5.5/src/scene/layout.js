// Shared plan of the diorama, in metres. +x is towards the side street, +z towards the viewer.
export const BASE = 18;
export const HALF = BASE / 2;
export const CURB = 0.14;

export const ROAD = { z0: 3.6, z1: 7.6 }; // main road across the front
export const SIDE_ROAD = { x0: 4.4, x1: 8.0, z1: 3.6 }; // side street turning off to the back
export const NEAR_WALK = { z0: 7.6, z1: HALF };
export const RIGHT_WALK = { x0: 8.0, x1: HALF, z1: 3.6 };
export const STORE_WALK = { x0: -1.5, xSide: 3.4, zFront: 2.6 }; // L-shaped sidewalk round the corner

export const STORE = { x0: -3.2, x1: 2.8, z0: -4.2, z1: 0.8, floor: 0.08, wall: 3.0, top: 3.62 };
export const AWNING = { z1: 2.02, yWall: 2.66, yEdge: 2.5 };
export const DOOR = { x0: -0.2, x1: 1.2, h: 2.2 };

export const MAIN_CROSS = { x0: 1.6, x1: 3.8 };
export const SIDE_CROSS = { z0: 1.2, z1: 3.0 };

export const N1 = { x0: -1.2, x1: 3.3, z0: -HALF, z1: -5.6, h: 6.2 };
export const N2 = { x0: -HALF, x1: -1.4, z0: -HALF, z1: -6.4, h: 5.6 };
export const BLOCK_WALL_Z = -4.6;

export const POLES = [
  [3.9, 2.95],
  [-3.7, 2.95],
  [-8.5, 2.95],
  [3.9, -8.4],
];

export const PAL = {
  asphalt: 0x2a3042,
  concrete: 0x7b8394,
  paving: 0x6c7488,
  curb: 0x9aa2b3,
  wood: 0x2b1d1a,
  woodLight: 0x6d4a36,
  storeWall: 0xe8e2d4,
  storeSkirt: 0x3d4452,
  frame: 0xc9ced8,
  darkFrame: 0x333a48,
  teal: 0x19a39a,
  orange: 0xf08a3c,
  blueBrand: 0x2c5fb8,
  pole: 0x8e949e,
  white: 0xf2f2ee,
  interiorWall: 0xf5efe2,
};
