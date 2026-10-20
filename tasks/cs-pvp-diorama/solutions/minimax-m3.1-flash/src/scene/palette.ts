/**
 * The palette of a rain-soaked freight yard at night.
 *
 * Everything outdoors is cold and desaturated: wet asphalt, old concrete,
 * rusted steel, painted steel containers, weathered timber and soaked
 * cardboard. The few warm colours are light sources, so they read as light
 * rather than as paint.
 */

export const PALETTE = {
  // Ground
  asphalt: [0.15, 0.16, 0.18],
  asphaltLight: [0.22, 0.23, 0.25],
  concrete: [0.46, 0.46, 0.45],
  concreteDark: [0.27, 0.27, 0.27],
  concreteWall: [0.5, 0.5, 0.49],
  concreteWorn: [0.4, 0.4, 0.39],
  plinth: [0.19, 0.19, 0.2],
  plinthEdge: [0.27, 0.27, 0.28],
  grime: [0.19, 0.19, 0.18],
  drain: [0.13, 0.13, 0.14],
  grate: [0.31, 0.24, 0.18],

  // Metal
  steel: [0.42, 0.44, 0.46],
  steelDark: [0.24, 0.26, 0.28],
  steelLight: [0.58, 0.6, 0.62],
  brass: [0.52, 0.44, 0.24],
  rust: [0.45, 0.26, 0.15],
  rustDark: [0.3, 0.18, 0.11],
  iron: [0.19, 0.2, 0.21],
  corrugated: [0.36, 0.38, 0.39],
  corrugatedDark: [0.26, 0.28, 0.29],

  // Containers
  containerBlue: [0.16, 0.31, 0.45],
  containerRed: [0.44, 0.19, 0.16],
  containerGreen: [0.18, 0.35, 0.26],
  containerGrey: [0.33, 0.34, 0.35],
  containerYellow: [0.46, 0.38, 0.15],

  // Timber and board
  wood: [0.43, 0.33, 0.22],
  woodLight: [0.54, 0.43, 0.29],
  woodDark: [0.3, 0.23, 0.16],
  plank: [0.38, 0.3, 0.2],

  // Props
  cardboard: [0.46, 0.38, 0.27],
  cardboardDark: [0.32, 0.26, 0.18],
  barrel: [0.15, 0.33, 0.5],
  barrelRed: [0.48, 0.19, 0.17],
  barrelYellow: [0.55, 0.45, 0.15],
  tyre: [0.12, 0.12, 0.13],
  plastic: [0.6, 0.42, 0.12],
  tarp: [0.24, 0.3, 0.3],
  sack: [0.47, 0.43, 0.33],
  wire: [0.08, 0.08, 0.09],

  // Vehicles
  truckBody: [0.36, 0.38, 0.4],
  truckCab: [0.3, 0.33, 0.36],
  vanBody: [0.42, 0.44, 0.47],
  vanPanel: [0.13, 0.19, 0.3],
  glassDark: [0.1, 0.14, 0.19],

  // Graffiti and signage
  graffitiBlue: [0.16, 0.32, 0.52],
  graffitiRed: [0.52, 0.17, 0.16],
  graffitiYellow: [0.6, 0.52, 0.16],
  graffitiWhite: [0.72, 0.72, 0.7],
  sprayMark: [0.66, 0.2, 0.18],
  badge: [0.2, 0.3, 0.5],

  // Light sources
  lampWarm: [1.0, 0.78, 0.42],
  lampSodium: [1.0, 0.7, 0.32],
  fluorescent: [0.78, 0.88, 1.0],
  emergency: [0.86, 0.92, 1.0],
  policeRed: [1.0, 0.15, 0.13],
  policeBlue: [0.2, 0.35, 1.0],
  signGlow: [0.4, 0.95, 0.55],
  backRoomRed: [1.0, 0.2, 0.18],
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
