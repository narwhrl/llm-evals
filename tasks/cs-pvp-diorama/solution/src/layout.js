// Map layout constants. Units are arbitrary "miniature" units; the base is a
// square of BASE x BASE centered on the origin. North = -z (T side),
// South = +z (CT side), West = -x (A site), East = +x (B site).
export const BASE = 72;
export const HALF = BASE / 2;

export const MID = {
  halfWidth: 3.5, // corridor inner half-width
  wallThick: 0.8,
  wallTop: 3.8, // wall top y
  floor: -0.8, // sunken floor level
  zMin: -19.5,
  zMax: 19.5,
  gateZ: 0,
};

export const T = {
  xMin: -12, xMax: 12,
  zMin: -35, zMax: -25.5,
};

export const CT = {
  xMin: -14, xMax: 14,
  zMin: 25, zMax: 35,
};

export const A = {
  // warehouse footprint
  xMin: -28, xMax: -12,
  zMin: -25, zMax: -7,
  wallH: 7,
  yard: { xMin: -28, xMax: -11, zMin: -7, zMax: -0.5 },
};

export const B = {
  // two-story sheet-metal house footprint
  xMin: 16, xMax: 28,
  zMin: -22, zMax: -11,
  floorH: 3.4,
  yard: { xMin: 12, xMax: 30, zMin: -11, zMax: -3 },
};

export const ALLEY = { xMin: -35, xMax: -30, zMin: -25, zMax: 22 };
export const PASSAGE = { xMin: -30, xMax: -28, zMin: -25, zMax: -5 }; // warehouse west narrow passage
export const FLANK = { xMin: 30, xMax: 34, zMin: -22, zMax: 22, deck: 1.6 }; // east elevated walkway
export const SHORTCUT = { xMin: 10, xMax: 13.5, zMin: -1.5, zMax: 22 }; // B->CT corridor
