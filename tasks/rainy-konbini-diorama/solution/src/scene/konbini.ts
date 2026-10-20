/**
 * The convenience store.
 *
 * The shop is a shell of cream panels with two broad glazed windows, an
 * automatic sliding door, a lit sign band, a striped canopy and a projecting
 * corner sign box. Behind the glass the interior is built as a real room:
 * floor, ceiling light boxes, a drink case, a chilled bento case, gondola
 * shelving, a rice-ball shelf, the oden pot, the register, a coffee machine,
 * a magazine rack, posters, lockers and a back door.
 *
 * The entrance sits between the two windows so the sliding leaves can retreat
 * behind the fixed glass, and so the aisle behind them stays clear.
 */

import { PALETTE, shade } from "./palette";
import { createBuilder, pushBox, type Builder } from "./voxel";

export const SHOP = {
  x0: -5.4,
  x1: 2.6,
  z0: -6.2,
  z1: -2.6,
  wallTop: 3.14,
  signBottom: 2.78,
  signTop: 3.12,
  glassBottom: 0.55,
  glassTop: 2.55,
  /** The automatic doorway, measured on the front facade. */
  doorX0: -2.6,
  doorX1: -1.4,
  /** The two window bays either side of the door. */
  windowAX0: -5.16,
  windowAX1: -2.72,
  windowBX0: -1.28,
  windowBX1: 2.36,
};

const PRODUCTS: ReadonlyArray<readonly number[]> = [
  [0.82, 0.24, 0.24],
  [0.9, 0.55, 0.2],
  [0.93, 0.82, 0.3],
  [0.32, 0.62, 0.34],
  [0.26, 0.45, 0.76],
  [0.86, 0.44, 0.62],
  [0.93, 0.93, 0.9],
  [0.6, 0.42, 0.28],
];

function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 47453.5453;
  return x - Math.floor(x);
}

/** A run of small product boxes along a shelf. */
function stock(
  b: Builder,
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  y: number,
  height: number,
  seed: number,
  density = 0.72,
) {
  const along = Math.max(0.1, x1 - x0);
  const depth = Math.max(0.08, z1 - z0);
  const count = Math.max(1, Math.floor(along / 0.17));
  const rows = Math.max(1, Math.floor(depth / 0.12));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < count; c++) {
      if (rand(seed * 31 + r * 7 + c) > density) continue;
      const color = PRODUCTS[Math.floor(rand(seed * 17 + c * 5 + r) * PRODUCTS.length) % PRODUCTS.length];
      const px = x0 + (c + 0.15) * (along / count);
      const pz = z0 + (r + 0.2) * (depth / rows);
      pushBox(
        b,
        [px, y, pz],
        [px + (along / count) * 0.72, y + height, pz + (depth / rows) * 0.62],
        color,
        0.006,
      );
    }
  }
}

export interface KonbiniResult {
  /** The opaque shell: walls, sign band, canopy, roof. */
  shell: Builder;
  /** The lit interior geometry, kept apart so it can carry a warm glow. */
  interior: Builder;
  /** The emissive geometry: sign band, vending fronts, lamp boxes. */
  neon: Builder;
  /** The fixed glass panes. */
  glass: Builder;
  /** The two sliding door leaves, which move behind the fixed glass. */
  doorLeft: Builder;
  doorRight: Builder;
}

export function buildKonbini(): KonbiniResult {
  const b = createBuilder();
  const interior: Builder = createBuilder();
  const neon: Builder = createBuilder();
  const glass: Builder = createBuilder();
  const doorLeft: Builder = createBuilder();
  const doorRight: Builder = createBuilder();
  const { x0, x1, z0, z1 } = SHOP;

  // ------------------------------------------------------------------ base
  pushBox(b, [x0 - 0.12, 0, z0 - 0.12], [x1 + 0.12, 0.2, z1 + 0.12], PALETTE.kickPlate, 0.012);

  // ------------------------------------------------------------------ walls
  pushBox(b, [x0, 0.2, z0], [x1, SHOP.wallTop, z0 + 0.2], PALETTE.wallCream, 0.016);
  pushBox(b, [x0, 0.2, z0], [x0 + 0.2, SHOP.wallTop, z1], PALETTE.wallCream, 0.016);

  // East wall with a window opening.
  const winZ0 = -4.5;
  const winZ1 = -3.4;
  pushBox(b, [x1 - 0.2, 0.2, z0 + 0.2], [x1, 0.7, winZ0], PALETTE.wallCream, 0.016);
  pushBox(b, [x1 - 0.2, 0.7, winZ1], [x1, SHOP.wallTop, z1], PALETTE.wallCream, 0.016);
  pushBox(b, [x1 - 0.2, 0.7, winZ0], [x1, 2.45, winZ1], PALETTE.wallCream, 0.016);
  pushBox(b, [x1 - 0.2, 2.45, winZ0], [x1, SHOP.wallTop, winZ1], PALETTE.wallCream, 0.016);
  pushBox(
    glass,
    [x1 - 0.16, 0.72, winZ0 + 0.06],
    [x1 - 0.04, 2.43, winZ1 - 0.06],
    PALETTE.glass,
    0,
  );
  pushBox(
    b,
    [x1 - 0.24, 0.64, winZ0 - 0.05],
    [x1 - 0.12, 0.72, winZ1 + 0.05],
    PALETTE.frameDark,
    0.01,
  );

  // ------------------------------------------------------------- front wall
  // Kick plate below the glazing.
  pushBox(b, [x0, 0.2, z1 - 0.2], [x1, SHOP.glassBottom, z1], PALETTE.kickPlate, 0.012);

  // Corner pillars and the mullions that divide the facade.
  pushBox(b, [x0, 0.2, z1 - 0.2], [x0 + 0.24, SHOP.signBottom, z1], PALETTE.wallTrim, 0.014);
  pushBox(b, [x1 - 0.24, 0.2, z1 - 0.2], [x1, SHOP.signBottom, z1], PALETTE.wallTrim, 0.014);
  pushBox(b, [SHOP.windowAX1, SHOP.glassBottom, z1 - 0.18], [SHOP.windowAX1 + 0.12, SHOP.signBottom, z1], PALETTE.frame, 0.01);
  pushBox(b, [SHOP.doorX0 - 0.12, SHOP.glassBottom, z1 - 0.2], [SHOP.doorX0, SHOP.signBottom, z1], PALETTE.frame, 0.012);
  pushBox(b, [SHOP.doorX1, SHOP.glassBottom, z1 - 0.2], [SHOP.doorX1 + 0.12, SHOP.signBottom, z1], PALETTE.frame, 0.012);
  pushBox(b, [SHOP.windowBX0 - 0.12, SHOP.glassBottom, z1 - 0.18], [SHOP.windowBX0, SHOP.signBottom, z1], PALETTE.frame, 0.01);
  pushBox(b, [-0.1, SHOP.glassBottom, z1 - 0.18], [0.02, SHOP.signBottom, z1], PALETTE.frame, 0.01);
  pushBox(b, [1.1, SHOP.glassBottom, z1 - 0.18], [1.22, SHOP.signBottom, z1], PALETTE.frame, 0.01);

  // The two window bays.
  pushBox(
    glass,
    [SHOP.windowAX0, SHOP.glassBottom, z1 - 0.12],
    [SHOP.windowAX1, SHOP.glassTop, z1 - 0.04],
    PALETTE.glass,
    0,
  );
  pushBox(
    glass,
    [SHOP.windowBX0, SHOP.glassBottom, z1 - 0.12],
    [SHOP.windowBX1, SHOP.glassTop, z1 - 0.04],
    PALETTE.glass,
    0,
  );
  // Door head and the threshold.
  pushBox(b, [SHOP.doorX0 - 0.12, SHOP.glassTop, z1 - 0.26], [SHOP.doorX1 + 0.12, SHOP.signBottom, z1 - 0.02], PALETTE.frame, 0.012);
  pushBox(b, [SHOP.doorX0 - 0.12, 0.2, z1 - 0.26], [SHOP.doorX1 + 0.12, SHOP.glassBottom, z1 - 0.02], PALETTE.steelDark, 0.01);

  // ------------------------------------------------------- sliding door leaves
  // The leaves sit in the reveal behind the fixed glass, so when they open
  // they slide out of sight behind the neighbouring window.
  const leafZ0 = z1 - 0.26;
  const leafZ1 = z1 - 0.2;
  const leafMid = (SHOP.doorX0 + SHOP.doorX1) / 2;
  for (const [leaf, lx0, lx1] of [
    [doorLeft, SHOP.doorX0, leafMid],
    [doorRight, leafMid, SHOP.doorX1],
  ] as Array<[Builder, number, number]>) {
    pushBox(leaf, [lx0 + 0.03, SHOP.glassBottom, leafZ0], [lx1 - 0.03, SHOP.glassTop, leafZ1], PALETTE.doorGlass, 0);
    // The yellow safety band, printed across the leaf.
    pushBox(leaf, [lx0 + 0.05, 1.02, leafZ1 - 0.01], [lx1 - 0.05, 1.18, leafZ1 + 0.03], [0.92, 0.78, 0.24], 0.006);
    pushBox(leaf, [lx0 + 0.05, 2.12, leafZ1 - 0.01], [lx1 - 0.05, 2.26, leafZ1 + 0.03], [0.92, 0.78, 0.24], 0.006);
  }

  // -------------------------------------------------------------- sign band
  const bands: Array<[number, number, readonly number[]]> = [
    [-5.4, -4.1, PALETTE.signGreen],
    [-4.1, -2.5, PALETTE.signWhite],
    [-2.5, -0.9, PALETTE.signGreen],
    [-0.9, 0.7, PALETTE.signWhite],
    [0.7, 2.6, PALETTE.signGreen],
  ];
  for (const [bx0, bx1, color] of bands) {
    pushBox(neon, [bx0, SHOP.signBottom, z1 - 0.22], [bx1, SHOP.signTop, z1 - 0.02], color, 0.014);
  }
  // The lit wordmark on the band.
  pushBox(
    neon,
    [-4.45, SHOP.signBottom + 0.13, z1 - 0.26],
    [-2.75, SHOP.signTop - 0.11, z1 - 0.2],
    PALETTE.signWhite,
    0.01,
  );
  pushBox(
    neon,
    [-4.15, SHOP.signBottom + 0.24, z1 - 0.3],
    [-3.85, SHOP.signTop - 0.23, z1 - 0.25],
    PALETTE.signBlue,
    0.008,
  );
  // Upper trim and the roof slab.
  pushBox(b, [x0 - 0.08, SHOP.signTop, z0 - 0.08], [x1 + 0.08, 3.26, z1 + 0.08], PALETTE.wallTrim, 0.016);
  pushBox(b, [x0 - 0.02, 3.26, z0 - 0.02], [x1 + 0.02, 3.44, z1 + 0.02], PALETTE.roofGrey, 0.016);

  // Rooftop plant, so the roof is not a blank slab.
  pushBox(b, [x0 - 0.02, 3.44, z0 - 0.02], [x1 + 0.02, 3.56, z0 + 0.16], [0.32, 0.34, 0.38], 0.012);
  pushBox(b, [x0 - 0.02, 3.44, z1 - 0.16], [x1 + 0.02, 3.56, z1 + 0.02], [0.32, 0.34, 0.38], 0.012);
  pushBox(b, [x0 - 0.02, 3.44, z0 - 0.02], [x0 + 0.16, 3.56, z1 + 0.02], [0.32, 0.34, 0.38], 0.012);
  pushBox(b, [x1 - 0.16, 3.44, z0 - 0.02], [x1 + 0.02, 3.56, z1 + 0.02], [0.32, 0.34, 0.38], 0.012);
  // The condenser unit and its frame.
  pushBox(b, [-0.9, 3.56, -5.5], [0.2, 4.12, -4.8], PALETTE.acUnit, 0.014);
  pushBox(b, [-0.82, 3.64, -5.42], [0.12, 4.04, -5.34], PALETTE.steelDark, 0.006);
  pushBox(b, [-0.82, 3.64, -4.96], [0.12, 4.04, -4.88], PALETTE.steelDark, 0.006);
  // Vent pipes.
  for (const [vx, vz] of [[-2.8, -5.6], [-2.3, -5.6], [1.3, -5.6]]) {
    pushBox(b, [vx - 0.09, 3.44, vz - 0.09], [vx + 0.09, 3.92, vz + 0.09], PALETTE.steel, 0.008);
    pushBox(b, [vx - 0.13, 3.92, vz - 0.13], [vx + 0.13, 4.04, vz + 0.13], PALETTE.steelDark, 0.008);
  }
  // A water tank on short legs.
  pushBox(b, [-4.2, 3.56, -5.6], [-3.0, 4.24, -4.5], [0.74, 0.76, 0.78], 0.014);
  pushBox(b, [-4.2, 3.56, -5.6], [-3.0, 3.72, -4.5], [0.6, 0.62, 0.64], 0.012);
  for (const lx of [-4.08, -3.12]) {
    for (const lz of [-5.48, -4.62]) {
      pushBox(b, [lx - 0.05, 3.44, lz - 0.05], [lx + 0.05, 3.56, lz + 0.05], PALETTE.steelDark, 0.006);
    }
  }

  // ------------------------------------------------------------ striped canopy
  const canopyY = SHOP.glassTop;
  const canopyDepth = 0.62;
  for (let i = 0; i < 11; i++) {
    const cx0 = x0 + (i * (x1 - x0)) / 11;
    const cx1 = x0 + ((i + 1) * (x1 - x0)) / 11;
    const color = i % 2 === 0 ? PALETTE.awningBlue : PALETTE.awningWhite;
    pushBox(b, [cx0, canopyY, z1], [cx1, canopyY + 0.12, z1 + canopyDepth], color, 0.01);
    // Scalloped valance.
    pushBox(b, [cx0, canopyY - 0.16, z1 + canopyDepth - 0.06], [cx1, canopyY, z1 + canopyDepth], color, 0.01);
  }
  pushBox(b, [x0, canopyY + 0.12, z1 + canopyDepth - 0.14], [x1, canopyY + 0.2, z1 + canopyDepth], PALETTE.frameDark, 0.008);

  // ------------------------------------------- projecting corner sign box
  pushBox(b, [1.85, 2.1, z1 + 0.06], [2.58, 3.4, z1 + 0.62], PALETTE.frameDark, 0.016);
  pushBox(
    neon,
    [1.88, 2.15, z1 + 0.6],
    [2.55, 3.35, z1 + 0.66],
    PALETTE.signGreen,
    0.012,
  );
  pushBox(
    neon,
    [2.02, 2.5, z1 + 0.65],
    [2.42, 3.0, z1 + 0.7],
    PALETTE.signWhite,
    0.008,
  );
  pushBox(neon, [2.02, 2.6, z1 + 0.69], [2.42, 2.9, z1 + 0.73], PALETTE.signBlue, 0.006);

  // ------------------------------------------------------------- back detail
  // Air conditioning unit and a drain pipe.
  pushBox(b, [x0 + 0.3, 2.05, z0 - 0.42], [x0 + 1.1, 2.6, z0], PALETTE.acUnit, 0.014);
  pushBox(b, [x0 + 0.42, 2.1, z0 - 0.44], [x0 + 0.98, 2.55, z0 - 0.4], PALETTE.steelDark, 0.008);
  pushBox(b, [x1 - 0.42, 0.2, z0 - 0.16], [x1 - 0.3, 3.0, z0], PALETTE.steelDark, 0.008);
  // A small sign on the side wall.
  pushBox(b, [x1 - 0.24, 1.2, -3.1], [x1 - 0.16, 1.8, -2.7], PALETTE.posterYellow, 0.008);

  // ============================================================== interior
  // Everything inside is positioned relative to the back wall, so the room
  // can be resized without the furniture drifting out of place.
  const inX0 = x0 + 0.2;
  const inX1 = x1 - 0.2;
  const inZ0 = z0 + 0.2;
  const inZ1 = z1 - 0.2;
  const z = (offset: number) => inZ0 + offset;

  // Floor with a guidance strip running down the aisle.
  pushBox(interior, [inX0, 0.2, inZ0], [inX1, 0.26, inZ1], PALETTE.floorTile, 0);
  pushBox(interior, [-2.15, 0.26, z(0.4)], [-1.75, 0.28, inZ1 - 0.1], PALETTE.floorGuide, 0);
  pushBox(interior, [-2.06, 0.26, inZ1 - 0.55], [-1.84, 0.28, inZ1 - 0.2], PALETTE.floorGuide, 0);

  // Ceiling and the light boxes.
  pushBox(interior, [inX0, 2.86, inZ0], [inX1, 2.96, inZ1], PALETTE.wallShade, 0);
  for (let i = 0; i < 4; i++) {
    const lx = inX0 + 0.45 + i * 1.7;
    pushBox(interior, [lx, 2.78, z(0.3)], [lx + 0.34, 2.88, inZ1 - 0.5], PALETTE.neonWarm, 0);
  }
  // Back wall of the shop.
  pushBox(interior, [inX0, 0.26, inZ0], [inX1, 2.86, inZ0 + 0.1], PALETTE.backWall, 0);

  // Drink case along the back wall.
  pushBox(interior, [-5.05, 0.26, z(0.1)], [-1.9, 2.1, z(0.6)], PALETTE.steel, 0.008);
  for (let s = 0; s < 4; s++) {
    const y = 0.42 + s * 0.4;
    pushBox(interior, [-5.01, y, z(0.14)], [-1.94, y + 0.3, z(0.56)], shade(PALETTE.steelDark, 1.1), 0);
    stock(interior, -4.95, z(0.16), -2.0, z(0.54), y + 0.02, 0.26, 10 + s, 0.9);
  }
  pushBox(interior, [-5.07, 2.1, z(0.08)], [-1.88, 2.2, z(0.62)], PALETTE.neonWarm, 0);

  // Chilled bento case on the left.
  pushBox(interior, [-5.05, 0.26, z(0.85)], [-2.9, 1.75, z(1.5)], PALETTE.steel, 0.008);
  pushBox(interior, [-5.0, 0.3, z(0.89)], [-2.95, 1.7, z(1.46)], [0.9, 0.82, 0.68], 0);
  for (let s = 0; s < 3; s++) {
    const y = 0.42 + s * 0.42;
    pushBox(interior, [-4.95, y, z(0.91)], [-2.95, y + 0.34, z(1.44)], [0.96, 0.9, 0.78], 0);
    stock(interior, -4.9, z(0.93), -3.0, z(1.42), y + 0.03, 0.28, 30 + s, 0.85);
  }
  pushBox(interior, [-5.06, 1.75, z(0.83)], [-2.89, 1.86, z(1.53)], PALETTE.neonWarm, 0);

  // Shelving against the left wall.
  for (let s = 0; s < 3; s++) {
    const y = 0.6 + s * 0.6;
    pushBox(interior, [-5.15, y, z(2.2)], [-4.75, y + 0.1, z(3.1)], PALETTE.shelfWhite, 0);
    stock(interior, -5.13, z(2.24), -4.77, z(3.06), y + 0.1, 0.38, 50 + s, 0.6);
  }
  pushBox(interior, [-5.18, 0.26, z(2.15)], [-5.1, 2.4, z(3.15)], PALETTE.shelfGrey, 0);

  // Gondola shelving down the middle of the shop, clear of the aisle.
  for (let u = 0; u < 2; u++) {
    const gz = z(1.0 + u * 0.8);
    pushBox(interior, [-1.2, 0.26, gz - 0.2], [1.0, 2.0, gz + 0.2], PALETTE.shelfGrey, 0);
    for (let s = 0; s < 4; s++) {
      const y = 0.42 + s * 0.4;
      pushBox(interior, [-1.14, y, gz - 0.22], [0.94, y + 0.08, gz + 0.22], PALETTE.shelfWhite, 0);
      stock(interior, -1.1, gz - 0.18, 0.9, gz + 0.18, y + 0.08, 0.28, 70 + u * 5 + s, 0.8);
    }
    pushBox(interior, [-1.2, 2.0, gz - 0.22], [1.0, 2.1, gz + 0.22], PALETTE.shelfWhite, 0);
  }

  // Rice ball and snack shelf facing the entrance.
  pushBox(interior, [-1.2, 0.26, z(2.5)], [0.1, 1.9, z(2.95)], PALETTE.shelfGrey, 0);
  for (let s = 0; s < 3; s++) {
    const y = 0.5 + s * 0.45;
    pushBox(interior, [-1.14, y, z(2.52)], [0.04, y + 0.08, z(2.93)], PALETTE.shelfWhite, 0);
    stock(interior, -1.1, z(2.56), 0.0, z(2.89), y + 0.08, 0.32, 90 + s, 0.7);
  }

  // Oden pot on a small counter.
  pushBox(interior, [0.25, 0.26, z(2.6)], [1.1, 0.95, z(3.1)], PALETTE.counter, 0.008);
  pushBox(interior, [0.33, 0.95, z(2.66)], [1.02, 1.14, z(3.04)], PALETTE.steel, 0.008);
  pushBox(interior, [0.37, 1.1, z(2.7)], [0.98, 1.16, z(3.0)], [0.9, 0.72, 0.5], 0);

  // Register counter with a register and a coffee machine.
  pushBox(interior, [1.25, 0.26, z(2.5)], [2.35, 1.02, z(3.1)], PALETTE.counter, 0.008);
  pushBox(interior, [1.33, 1.02, z(2.56)], [1.77, 1.14, z(2.98)], PALETTE.steelDark, 0.006);
  pushBox(interior, [1.81, 1.02, z(2.62)], [2.09, 1.3, z(2.94)], [0.2, 0.22, 0.26], 0.006);
  pushBox(interior, [1.83, 1.3, z(2.64)], [2.07, 1.62, z(2.92)], [0.16, 0.18, 0.22], 0.006);
  pushBox(interior, [1.85, 1.32, z(2.65)], [2.05, 1.58, z(2.67)], PALETTE.neonCool, 0);
  pushBox(interior, [1.29, 1.14, z(2.96)], [1.61, 1.72, z(3.12)], PALETTE.steel, 0.006);
  pushBox(interior, [1.33, 1.18, z(2.98)], [1.55, 1.42, z(3.02)], [0.3, 0.2, 0.14], 0);

  // Magazine rack beside the aisle.
  pushBox(interior, [-1.35, 0.26, z(2.6)], [-1.17, 1.5, z(3.1)], PALETTE.shelfGrey, 0);
  for (let i = 0; i < 6; i++) {
    const y = 0.6 + i * 0.14;
    const color = PRODUCTS[i % PRODUCTS.length];
    pushBox(interior, [-1.34, y, z(2.64)], [-1.19, y + 0.12, z(3.06)], color, 0);
  }

  // Posters and a light box on the back wall.
  pushBox(interior, [1.25, 1.2, inZ0 + 0.08], [1.85, 2.3, inZ0 + 0.12], PALETTE.posterPink, 0);
  pushBox(interior, [1.95, 1.2, inZ0 + 0.08], [2.4, 2.3, inZ0 + 0.12], PALETTE.posterBlue, 0);
  pushBox(interior, [-1.85, 1.1, inZ0 + 0.08], [-1.05, 2.2, inZ0 + 0.12], PALETTE.posterYellow, 0);

  // Lockers and the back door at the end of the aisle.
  pushBox(interior, [1.5, 0.26, inZ0 + 0.06], [2.4, 1.95, inZ0 + 0.5], PALETTE.locker, 0);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      pushBox(
        interior,
        [1.56 + j * 0.24, 0.34 + i * 0.55, inZ0 + 0.48],
        [1.76 + j * 0.24, 0.86 + i * 0.55, inZ0 + 0.52],
        shade(PALETTE.locker, 0.86),
        0,
      );
    }
  }
  pushBox(interior, [-2.2, 0.26, inZ0 + 0.06], [-1.6, 2.1, inZ0 + 0.16], PALETTE.steelDark, 0);
  pushBox(interior, [-2.16, 0.26, inZ0 + 0.15], [-1.64, 2.06, inZ0 + 0.19], [0.6, 0.62, 0.64], 0);

  // A strip of warm light above the entrance inside.
  pushBox(interior, [SHOP.doorX0, 2.6, inZ1 - 0.1], [SHOP.doorX1, 2.7, inZ1 - 0.04], PALETTE.neonWarm, 0);

  return { shell: b, interior, neon, glass, doorLeft, doorRight };
}
