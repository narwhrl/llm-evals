/**
 * The palette of a rainy Japanese street corner.
 *
 * The scene is built from cool wet blues outside and warm light inside, so the
 * two families are kept separate: everything outdoors is desaturated and blue,
 * everything indoors is warm and saturated.
 */

export const PALETTE = {
  // Street
  asphalt: [0.1, 0.11, 0.13],
  asphaltLight: [0.16, 0.17, 0.2],
  wetSheen: [0.2, 0.23, 0.29],
  sidewalk: [0.3, 0.31, 0.32],
  sidewalkEdge: [0.55, 0.56, 0.56],
  curb: [0.5, 0.51, 0.51],
  roadLineYellow: [0.68, 0.57, 0.2],
  roadLineWhite: [0.62, 0.63, 0.61],
  crosswalk: [0.6, 0.61, 0.58],
  drain: [0.16, 0.17, 0.19],
  drainGrate: [0.3, 0.31, 0.33],
  basePlinth: [0.13, 0.13, 0.16],
  baseEdge: [0.15, 0.15, 0.17],

  // Shop shell
  wallCream: [0.78, 0.77, 0.73],
  wallShade: [0.78, 0.78, 0.76],
  wallTrim: [0.82, 0.82, 0.79],
  roofGrey: [0.16, 0.17, 0.2],
  frame: [0.86, 0.87, 0.86],
  frameDark: [0.45, 0.47, 0.5],
  glass: [0.62, 0.78, 0.86],
  glassDark: [0.36, 0.52, 0.6],
  kickPlate: [0.24, 0.26, 0.3],
  awningBlue: [0.16, 0.36, 0.66],
  awningWhite: [0.94, 0.94, 0.9],
  signGreen: [0.13, 0.55, 0.36],
  signBlue: [0.12, 0.32, 0.62],
  signWhite: [0.97, 0.97, 0.95],
  neonWarm: [1.0, 0.86, 0.58],
  neonCool: [0.62, 0.86, 1.0],
  neonPink: [1.0, 0.5, 0.66],

  // Interior
  floorTile: [0.78, 0.77, 0.74],
  floorGuide: [0.2, 0.6, 0.85],
  shelfWhite: [0.84, 0.84, 0.82],
  shelfGrey: [0.72, 0.73, 0.74],
  counter: [0.78, 0.77, 0.73],
  steel: [0.68, 0.71, 0.74],
  steelDark: [0.46, 0.49, 0.53],
  doorGlass: [0.48, 0.63, 0.7],
  backWall: [0.72, 0.71, 0.68],
  locker: [0.7, 0.72, 0.73],

  // Props
  vendingWhite: [0.94, 0.94, 0.92],
  vendingBlue: [0.15, 0.36, 0.68],
  vendingRed: [0.78, 0.2, 0.22],
  bikeRed: [0.7, 0.2, 0.22],
  bikeTeal: [0.2, 0.5, 0.55],
  bikeYellow: [0.88, 0.76, 0.28],
  tire: [0.21, 0.21, 0.23],
  poleConcrete: [0.56, 0.57, 0.57],
  wire: [0.08, 0.08, 0.09],
  binGreen: [0.18, 0.32, 0.24],
  binGrey: [0.4, 0.41, 0.42],
  umbrellaRed: [0.72, 0.22, 0.26],
  umbrellaNavy: [0.16, 0.2, 0.36],
  umbrellaWhite: [0.85, 0.85, 0.82],
  signBluePlate: [0.16, 0.4, 0.66],
  signRedPlate: [0.76, 0.2, 0.2],
  signWhitePlate: [0.92, 0.92, 0.9],
  guardrail: [0.68, 0.7, 0.7],
  acUnit: [0.66, 0.67, 0.68],
  posterPink: [0.92, 0.5, 0.62],
  posterYellow: [0.95, 0.8, 0.35],
  posterBlue: [0.36, 0.6, 0.85],
  trafficRed: [1.0, 0.22, 0.2],
  trafficGreen: [0.3, 1.0, 0.45],
  trafficAmber: [1.0, 0.7, 0.15],
  lampWarm: [1.0, 0.85, 0.6],
} as const;

export function shade(color: readonly number[], amount: number): number[] {
  return [
    Math.max(0, Math.min(1, color[0] * amount)),
    Math.max(0, Math.min(1, color[1] * amount)),
    Math.max(0, Math.min(1, color[2] * amount)),
  ];
}

export function mix(
  a: readonly number[],
  b: readonly number[],
  t: number,
): number[] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}
