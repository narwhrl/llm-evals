/**
 * Map layout constants.
 *
 * One square base, five regions, three route families. North (-Z) is the T
 * spawn, south (+Z) the CT spawn; A sits west and B east of the mid lane,
 * which is how the attacking routes read in game.
 */

export const BASE = {
  slabSize: 46,        // full square plinth
  slabHeight: 2.3,
  plinthSize: 47.2,
  plinthHeight: 0.42,
  rimWidth: 1.9,       // concrete border left visible around the asphalt
  fieldHalf: 21.1,     // asphalt field half-extent
  groundY: 0.04,
  waterY: 0.095,
};

export const T_SPAWN = {
  // Enclosed behind barbed wire and stacked containers, raised off the yard.
  x0: -11.2,
  x1: 11.2,
  z0: -20.4,
  z1: -14.8,
  floorY: 1.05,
  rampZ0: -14.8,
  rampZ1: -11.4,
  rampX0: -4.6,
  rampX1: 4.6,
};

export const A_SITE = {
  // Warehouse shell plus the yard in front of its shutter.
  x0: -17.5,
  x1: -6.7,
  z0: -13.7,
  z1: -3.5,
  floorY: 0.38,
  wallHeight: 4.3,
  loftY: 3.55,
  shutterZ: -3.5,      // south face, rolled-up shutter
  sideDoorX: -6.7,     // east face, inward-opening side door
};

export const MID = {
  x0: -3.5,
  x1: 3.5,
  z0: -13.0,
  z1: 13.4,
  wallHeight: 2.25,
  portSill: 1.45,
  gateZ: -0.4,
  drainX0: -0.95,
  drainX1: 0.95,
  drainZ0: -10.6,
  drainZ1: 9.4,
  drainDepth: 0.62,
};

export const B_SITE = {
  x0: 6.3,
  x1: 20.7,
  z0: -14.0,
  z1: -0.4,
  floorY: 0.12,
  // Two-storey tin guard house.
  houseX0: 9.7,
  houseX1: 17.1,
  houseZ0: -13.3,
  houseZ1: -7.1,
  wallHeight: 5.5,
  balconyY: 3.1,
  markingZ: -5.4,      // bomb-site paint on the ground in front of the door
};

export const CT_SPAWN = {
  x0: -11.2,
  x1: 11.2,
  z0: 14.6,
  z1: 20.4,
  floorY: 0.3,
  platformX0: 5.3,
  platformX1: 11.2,
  platformZ0: 15.0,
  platformZ1: 20.4,
  platformY: 2.55,
};

export const ALLEY = {
  // West flank: a quiet back route from A down to the CT side.
  x0: -20.8,
  x1: -17.9,
  z0: -14.6,
  z1: 12.6,
};

export const FLANK = {
  // East flank: raised walkway from the B balcony down toward CT.
  x0: 17.5,
  x1: 20.8,
  z0: -7.0,
  z1: 12.8,
  deckY: 2.25,
};
