/**
 * The colour palette of the complex.
 *
 * A Chinese palace reads through three families: warm red walls, cool glazed
 * roofs, and pale stone platforms. Everything else is a tint of those.
 */

export const PALETTE = {
  wallRed: [0.6, 0.2, 0.16],
  wallRedDark: [0.48, 0.15, 0.13],
  plaster: [0.86, 0.83, 0.74],
  plasterDark: [0.74, 0.71, 0.63],

  tileGreen: [0.24, 0.42, 0.4],
  tileGreenLight: [0.31, 0.5, 0.47],
  tileGreenDark: [0.18, 0.33, 0.32],
  tileGrey: [0.3, 0.33, 0.37],
  tileGreyLight: [0.38, 0.41, 0.45],
  tileGreyDark: [0.22, 0.24, 0.28],

  wood: [0.42, 0.24, 0.14],
  woodLight: [0.53, 0.32, 0.19],
  woodDark: [0.3, 0.17, 0.1],

  stone: [0.6, 0.58, 0.53],
  stoneLight: [0.68, 0.66, 0.6],
  stoneDark: [0.47, 0.45, 0.41],

  gold: [0.79, 0.63, 0.28],
  goldDark: [0.6, 0.46, 0.19],

  door: [0.3, 0.13, 0.1],
  window: [0.16, 0.2, 0.22],

  leaf: [0.18, 0.36, 0.2],
  leafLight: [0.26, 0.46, 0.25],
  leafDark: [0.12, 0.26, 0.16],
  trunk: [0.3, 0.2, 0.13],

  lantern: [0.78, 0.24, 0.18],
  lanternGlow: [1.0, 0.72, 0.36],
} as const;

export function shade(color: readonly number[], amount: number): number[] {
  return [
    Math.max(0, Math.min(1, color[0] * amount)),
    Math.max(0, Math.min(1, color[1] * amount)),
    Math.max(0, Math.min(1, color[2] * amount)),
  ];
}

export function mixColor(
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
