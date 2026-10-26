/**
 * Shared scene measurements.
 *
 * The diorama is authored inside a square plinth of BASE_SIZE. A north-south
 * avenue runs along the west edge and an east-west side street along the south
 * edge; they meet in the south-west corner, so the convenience store sits on the
 * inside corner with glass on both street-facing sides.
 *
 * Axis convention: +X east, +Y up, +Z south (towards the default camera).
 */

export const BASE_SIZE = 10.4;
export const BASE_HALF = BASE_SIZE / 2;
export const BASE_TOP = 0.36;
export const BASE_EDGE = 0.28; // inset from the plinth edge to the kerb

export const ROAD_Y = BASE_TOP + 0.01;
export const WALK_Y = BASE_TOP + 0.115;

/** North-south avenue on the west side of the plinth. */
export const AVENUE = {
  xMin: -BASE_HALF + BASE_EDGE,
  xMax: -2.7,
  zMin: -BASE_HALF + BASE_EDGE,
  zMax: BASE_HALF - BASE_EDGE,
};

/** East-west side street in front of the store. */
export const SIDE_STREET = {
  zMin: 2.7,
  zMax: BASE_HALF - BASE_EDGE,
  xMin: -BASE_HALF + BASE_EDGE,
  xMax: BASE_HALF - BASE_EDGE,
};

/** Raised sidewalk wrapping the store's south-west corner. */
export const SIDEWALK = {
  westMinX: -2.7,
  westMaxX: -1.85,
  southMinZ: 1.85,
  southMaxZ: 2.7,
};

export const STORE = {
  xMin: -1.85,
  xMax: 2.35,
  zMin: -4.0,
  zMax: 1.85,
  wallTop: 3.12,
  parapetTop: 3.46,
  fasciaBottom: 2.62,
  fasciaTop: 3.12,
  glassBottom: WALK_Y + 0.06,
  glassTop: 2.5,
  doorWidth: 1.9,
  doorCenterX: 0.62,
};

export const STORE_CENTER = {
  x: (STORE.xMin + STORE.xMax) / 2,
  z: (STORE.zMin + STORE.zMax) / 2,
};

/** Service alley east of the store, entered from the side street. */
export const ALLEY = {
  xMin: STORE.xMax,
  xMax: 3.45,
  zMin: -2.9,
  zMax: STORE.zMax,
  floorY: WALK_Y - 0.02,
};

/** Narrow neighbouring building on the east edge. */
export const NEIGHBOUR = {
  xMin: 3.45,
  xMax: BASE_HALF - BASE_EDGE,
  zMin: -4.35,
  zMax: STORE.zMax,
  wallTop: 4.2,
};

export const KERB = 0.14;

/** Crosswalk across the side street, just east of the avenue junction. */
export const CROSSWALK = {
  zMin: SIDE_STREET.zMin + 0.12,
  zMax: SIDE_STREET.zMax - 0.12,
  xMin: -2.45,
  xMax: -0.75,
  stripes: 7,
};
