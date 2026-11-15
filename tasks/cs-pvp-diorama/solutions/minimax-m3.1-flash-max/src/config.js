/**
 * Shared layout constants for the diorama.
 *
 * The sandbox is one square concrete slab, 32 x 32 world units, centred on the
 * origin. +X is east, -Z is north (T spawn), +Z is south (CT spawn).
 * "1 unit ~= 1 metre" keeps prop sizes readable; the miniature look comes from
 * the framing, not from shrinking the numbers.
 */

export const BASE = 32;
export const HALF = BASE / 2;
export const SLAB = 1.6; // slab thickness, top face sits at y = 0

// Region footprints -------------------------------------------------------
export const REGION = {
  tSpawn: { x0: -7.4, x1: 11.0, z0: -16.0, z1: -11.0, y: 1.2 },
  aSite: { x0: -13.4, x1: -7.4, z0: -13.2, z1: -6.6 },
  midLane: { x0: -3.4, x1: 3.4, z0: -8.2, z1: 9.6 },
  bSite: { x0: 4.4, x1: 15.6, z0: -11.0, z1: -5.4 },
  ctSpawn: { x0: -7.6, x1: 7.6, z0: 9.6, z1: 15.8 },
  westAlley: { x0: -15.9, x1: -13.4, z0: -16.0, z1: 9.4 },
  eastWalk: { x0: 11.2, x1: 14.2, z0: -6.4, z1: 7.4, y: 2.2 },
};

// Seam under the T spawn plateau.
export const T_PLATEAU_Y = 1.2;
export const RAMP = { x0: -4.2, x1: 2.2, z0: -11.0, z1: -8.2 };

// Sewer mouths punched through the slab (entry under the ramp, exit by CT).
export const SEWER = [
  { x0: -1.3, x1: 1.3, z0: -9.8, z1: -8.1 },
  { x0: -1.3, x1: 1.3, z0: 8.2, z1: 9.9 },
];

// Long grated drain running down the middle lane.
export const DRAIN = { x0: 0.55, x1: 1.65, z0: -6.6, z1: 5.6, depth: 0.22 };

// Mid-lane geometry.
export const MID = {
  wallX: 3.4, // inner face of the flanking concrete walls
  wallT: 0.42,
  wallH: 3.2,
  wallZ0: -7.4,
  wallZ1: 7.2,
  gateZ: -1.2,
  platformY: 2.2,
  lowWallZ: 6.4,
};

// Warehouse (A site).
export const WAREHOUSE = {
  x0: -13.4, x1: -7.4, z0: -13.2, z1: -6.6, h: 4.4, shutterY: 2.55,
  colX: -11.0, colZ: -10.0,
  mezz: { x0: -10.0, x1: -7.6, z0: -13.0, z1: -10.4, y: 2.6 },
};

// Sheet-metal guard house (B site).
export const SHACK = {
  x0: 9.4, x1: 14.4, z0: -10.8, z1: -6.8, h1: 2.85, h2: 2.7,
  balconyY: 2.95,
};

// Puddle field: shared by the wet floor texture and the reflection mask.
export const PUDDLES = [
  { x: -9.8, z: -7.4, r: 2.3 },
  { x: -5.2, z: -4.6, r: 1.9 },
  { x: -1.8, z: 1.2, r: 1.5 },
  { x: 2.4, z: -3.2, r: 1.7 },
  { x: 5.0, z: -8.4, r: 2.1 },
  { x: 11.8, z: -5.6, r: 2.3 },
  { x: 14.4, z: -2.6, r: 1.5 },
  { x: 7.2, z: -8.8, r: 1.8 },
  { x: -0.6, z: 6.4, r: 2.2 },
  { x: 3.4, z: 8.6, r: 1.7 },
  { x: -6.6, z: 7.4, r: 1.9 },
  { x: -14.6, z: -1.4, r: 2.2 },
  { x: -14.7, z: 5.6, r: 1.6 },
  { x: 6.2, z: 12.6, r: 2.4 },
  { x: -3.4, z: 13.4, r: 2.0 },
  { x: -10.4, z: -14.6, r: 2.0 },
  { x: 9.0, z: -3.8, r: 1.5 },
  { x: -2.2, z: -8.6, r: 1.6 },
  { x: 12.6, z: 2.4, r: 1.7 },
  { x: -11.0, z: 2.0, r: 1.4 },
  { x: 5.8, z: -6.0, r: 1.9 },
  { x: -4.6, z: 11.6, r: 1.8 },
  { x: 6.4, z: 10.2, r: 1.6 },
  { x: -8.4, z: -9.4, r: 1.5 },
];

export const PALETTE = {
  night: 0x0a1018,
  sky: 0x101c2c,
  concrete: 0x6a6f78,
  concreteDark: 0x4a5058,
  asphalt: 0x2b2f36,
  rust: 0x7a4a2c,
  steel: 0x3c4148,
  wood: 0x7b5c38,
  cardboard: 0x8a7048,
  drumBlue: 0x2f5f8f,
  drumGreen: 0x3c6b45,
  warmLight: 0xffb457,
  coldLight: 0xbcd4ff,
  redLight: 0xff3b30,
  blueLight: 0x3b7bff,
  outline: 0x070a0e,
};
