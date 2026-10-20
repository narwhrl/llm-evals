/**
 * The props of the freight yard.
 *
 * Every piece of cover in the map is one of these: crates, drums, tyres,
 * pallets, containers, barriers, fences, vehicles and the lamps that light
 * them. They all take a builder so a whole area can be assembled in one
 * pass.
 */

import { PALETTE, shade } from "./palette";
import { pushBox, type Builder, type Color } from "./voxel";

/** A box centred on a point, rotated in quarter turns about the vertical. */
export function oriented(
  b: Builder,
  cx: number,
  cz: number,
  w: number,
  d: number,
  y0: number,
  y1: number,
  color: Color,
  outline = 0.012,
  rot = 0,
) {
  const swap = ((rot % 4) + 4) % 4 % 2 === 1;
  const hw = (swap ? d : w) / 2;
  const hd = (swap ? w : d) / 2;
  pushBox(b, [cx - hw, y0, cz - hd], [cx + hw, y1, cz + hd], color, outline);
}

/** A stacked wooden crate with plank edges and a brace. */
export function crate(
  b: Builder,
  x: number,
  z: number,
  y: number,
  size = 0.7,
  color: Color = PALETTE.wood,
  rot = 0,
) {
  const h = size * 0.78;
  oriented(b, x, z, size, size, y, y + h, color, 0.014, rot);
  const t = size * 0.07;
  // Corner posts and a top rail, so the crate reads as timber.
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const px = x + sx * (size * 0.5 - t * 0.5);
      const pz = z + sz * (size * 0.5 - t * 0.5);
      pushBox(b, [px - t, y, pz - t], [px + t, y + h, pz + t], shade(color, 0.78), 0.01);
    }
  }
  pushBox(b, [x - size * 0.5, y + h - t, z - size * 0.5], [x + size * 0.5, y + h, z + size * 0.5], shade(color, 0.85), 0.01);
}

/** A stack of two or three crates. */
export function crateStack(
  b: Builder,
  x: number,
  z: number,
  y: number,
  count: number,
  size = 0.7,
  color: Color = PALETTE.wood,
) {
  let h = y;
  for (let i = 0; i < count; i++) {
    crate(b, x + (i % 2 === 0 ? 0 : 0.05), z, h, size, i % 2 === 0 ? color : shade(color, 0.88), i * 1);
    h += size * 0.78;
  }
}

/** A steel drum, drawn as a square drum with a rim. */
export function barrel(
  b: Builder,
  x: number,
  z: number,
  y: number,
  color: Color = PALETTE.barrel,
  height = 0.9,
) {
  const r = 0.28;
  pushBox(b, [x - r, y, z - r], [x + r, y + height, z + r], color, 0.012);
  pushBox(b, [x - r - 0.03, y + height * 0.22, z - r - 0.03], [x + r + 0.03, y + height * 0.3, z + r + 0.03], shade(color, 0.82), 0.01);
  pushBox(b, [x - r - 0.03, y + height * 0.68, z - r - 0.03], [x + r + 0.03, y + height * 0.76, z + r + 0.03], shade(color, 0.82), 0.01);
  pushBox(b, [x - r - 0.02, y + height, z - r - 0.02], [x + r + 0.02, y + height + 0.05, z + r + 0.02], shade(color, 0.7), 0.01);
}

/** A group of four drums, two on the bottom and two on top. */
export function barrelQuad(
  b: Builder,
  x: number,
  z: number,
  y: number,
  color: Color = PALETTE.barrel,
) {
  barrel(b, x - 0.3, z - 0.3, y, color);
  barrel(b, x + 0.3, z - 0.3, y, color);
  barrel(b, x - 0.3, z + 0.3, y, color);
  barrel(b, x + 0.3, z + 0.3, y, color);
}

/** A stack of discarded tyres. */
export function tyreStack(b: Builder, x: number, z: number, y: number, count = 3) {
  for (let i = 0; i < count; i++) {
    const t = y + i * 0.22;
    pushBox(b, [x - 0.42, t, z - 0.42], [x + 0.42, t + 0.2, z + 0.42], PALETTE.tyre, 0.01);
    pushBox(b, [x - 0.28, t + 0.02, z - 0.28], [x + 0.28, t + 0.18, z + 0.28], [0.05, 0.05, 0.06], 0.008);
  }
}

/** A soaked cardboard carton with a tape seam. */
export function carton(
  b: Builder,
  x: number,
  z: number,
  y: number,
  w = 0.6,
  h = 0.45,
  d = 0.5,
  color: Color = PALETTE.cardboard,
  rot = 0,
) {
  oriented(b, x, z, w, d, y, y + h, color, 0.012, rot);
  const swap = ((rot % 4) + 4) % 4 % 2 === 1;
  const hd = (swap ? w : d) / 2;
  pushBox(b, [x - 0.05, y + h, z - hd], [x + 0.05, y + h + 0.02, z + hd], shade(color, 0.8), 0.006);
}

/** A wooden pallet. */
export function pallet(b: Builder, x: number, z: number, y: number, rot = 0) {
  oriented(b, x, z, 1.1, 0.9, y, y + 0.1, PALETTE.woodDark, 0.01, rot);
  for (let i = 0; i < 3; i++) {
    const off = -0.3 + i * 0.3;
    const swap = ((rot % 4) + 4) % 4 % 2 === 1;
    pushBox(
      b,
      swap
        ? [x + off - 0.06, y, z - 0.45]
        : [x - 0.55, y, z + off - 0.06],
      swap
        ? [x + off + 0.06, y + 0.1, z + 0.45]
        : [x + 0.55, y + 0.1, z + off + 0.06],
      shade(PALETTE.woodDark, 0.8),
      0.008,
    );
  }
}

/** A stack of pallets. */
export function palletStack(b: Builder, x: number, z: number, y: number, count = 3) {
  for (let i = 0; i < count; i++) pallet(b, x, z, y + i * 0.22, i);
}

/** A concrete jersey barrier. */
export function jerseyBarrier(b: Builder, x: number, z: number, y: number, rot = 0) {
  oriented(b, x, z, 1.5, 0.5, y, y + 0.34, PALETTE.concreteWorn, 0.012, rot);
  oriented(b, x, z, 1.34, 0.38, y + 0.34, y + 0.72, PALETTE.concrete, 0.012, rot);
  oriented(b, x, z, 1.0, 0.26, y + 0.72, y + 0.84, PALETTE.concrete, 0.012, rot);
}

/** A plastic road barrier with feet. */
export function barricade(b: Builder, x: number, z: number, y: number, rot = 0) {
  oriented(b, x, z, 1.6, 0.1, y + 0.42, y + 0.86, PALETTE.plastic, 0.01, rot);
  oriented(b, x, z, 1.6, 0.1, y + 0.3, y + 0.42, PALETTE.plastic, 0.01, rot);
  for (const s of [-1, 1]) {
    const swap = ((rot % 4) + 4) % 4 % 2 === 1;
    pushBox(
      b,
      swap
        ? [x + s * 0.62 - 0.05, y, z - 0.34]
        : [x + s * 0.62 - 0.05, y, z - 0.34],
      swap
        ? [x + s * 0.62 + 0.05, y + 0.44, z + 0.34]
        : [x + s * 0.62 + 0.05, y + 0.44, z + 0.34],
      PALETTE.steelDark,
      0.008,
    );
  }
}

/** A run of chain link fence with posts. */
export function fence(
  b: Builder,
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  y: number,
  height = 2.2,
  barbed = false,
) {
  const length = Math.hypot(x1 - x0, z1 - z0);
  const posts = Math.max(2, Math.round(length / 1.6));
  for (let i = 0; i <= posts; i++) {
    const t = i / posts;
    const px = x0 + (x1 - x0) * t;
    const pz = z0 + (z1 - z0) * t;
    pushBox(b, [px - 0.05, y, pz - 0.05], [px + 0.05, y + height, pz + 0.05], PALETTE.steelDark, 0.008);
  }
  const along = Math.abs(x1 - x0) > Math.abs(z1 - z0);
  const t = 0.02;
  if (along) {
    pushBox(b, [x0, y, z0 - t], [x1, y + height, z0 + t], [0.3, 0.32, 0.33], 0.006);
    pushBox(b, [x0, y + height - 0.05, z0 - t], [x1, y + height, z0 + t], PALETTE.steelDark, 0.006);
  } else {
    pushBox(b, [x0 - t, y, z0], [x0 + t, y + height, z1], [0.3, 0.32, 0.33], 0.006);
    pushBox(b, [x0 - t, y + height - 0.05, z0], [x0 + t, y + height, z1], PALETTE.steelDark, 0.006);
  }
  if (barbed) {
    // Three coils of wire on top of the fence.
    for (let i = 0; i < 3; i++) {
      const yy = y + height + 0.06 + i * 0.12;
      if (along) {
        pushBox(b, [x0, yy, z0 - 0.1], [x1, yy + 0.05, z0 + 0.1], PALETTE.wire, 0.004);
      } else {
        pushBox(b, [x0 - 0.1, yy, z0], [x0 + 0.1, yy + 0.05, z1], PALETTE.wire, 0.004);
      }
    }
  }
}

/** A shipping container with corrugated ribs. */
export function container(
  b: Builder,
  x: number,
  z: number,
  y: number,
  w: number,
  h: number,
  d: number,
  color: Color,
  rot = 0,
) {
  oriented(b, x, z, w, d, y, y + h, color, 0.016, rot);
  const swap = ((rot % 4) + 4) % 4 % 2 === 1;
  const span = swap ? d : w;
  const ribs = Math.max(3, Math.round(span / 0.42));
  for (let i = 1; i < ribs; i++) {
    const t = -span / 2 + (i * span) / ribs;
    if (swap) {
      pushBox(b, [x - w / 2 - 0.03, y + 0.1, z + t - 0.05], [x + w / 2 + 0.03, y + h - 0.1, z + t + 0.05], shade(color, 0.86), 0.008);
    } else {
      pushBox(b, [x + t - 0.05, y + 0.1, z - d / 2 - 0.03], [x + t + 0.05, y + h - 0.1, z + d / 2 + 0.03], shade(color, 0.86), 0.008);
    }
  }
  // Corner castings and a door end.
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const px = x + (swap ? sx * (w / 2 - 0.12) : sx * (w / 2 - 0.12));
      const pz = z + (swap ? sz * (d / 2 - 0.12) : sz * (d / 2 - 0.12));
      pushBox(b, [px - 0.14, y, pz - 0.14], [px + 0.14, y + 0.18, pz + 0.14], shade(color, 0.6), 0.01);
      pushBox(b, [px - 0.14, y + h - 0.18, pz - 0.14], [px + 0.14, y + h, pz + 0.14], shade(color, 0.6), 0.01);
    }
  }
}

/** A wooden pallet stack with a tarp over it. */
export function coveredStack(b: Builder, x: number, z: number, y: number, w = 1.1, h = 1.0) {
  crateStack(b, x, z, y, 2, Math.min(w, 0.85));
  pushBox(b, [x - w / 2 - 0.04, y + 0.9, z - w / 2 - 0.04], [x + w / 2 + 0.04, y + 0.9 + h * 0.3, z + w / 2 + 0.04], PALETTE.tarp, 0.012);
}

/** A sack of grain or sand. */
export function sack(b: Builder, x: number, z: number, y: number, color: Color = PALETTE.sack) {
  pushBox(b, [x - 0.3, y, z - 0.22], [x + 0.3, y + 0.42, z + 0.22], color, 0.012);
  pushBox(b, [x - 0.2, y + 0.42, z - 0.16], [x + 0.2, y + 0.52, z + 0.16], shade(color, 0.9), 0.01);
}

/** A skip / dumpster with a lid. */
export function dumpster(b: Builder, x: number, z: number, y: number, rot = 0, color: Color = PALETTE.containerGreen) {
  oriented(b, x, z, 1.5, 0.9, y, y + 0.85, color, 0.014, rot);
  oriented(b, x, z, 1.56, 0.96, y + 0.85, y + 0.98, shade(color, 0.75), 0.012, rot);
  for (let i = 0; i < 4; i++) {
    const t = -0.6 + i * 0.4;
    const swap = ((rot % 4) + 4) % 4 % 2 === 1;
    pushBox(
      b,
      swap
        ? [x - 0.76, y + 0.1, z + t - 0.04]
        : [x + t - 0.04, y + 0.1, z - 0.46],
      swap
        ? [x - 0.7, y + 0.75, z + t + 0.04]
        : [x + t + 0.04, y + 0.75, z - 0.4],
      shade(color, 0.8),
      0.008,
    );
  }
}

/** A steel ladder, either vertical or leaning. */
export function ladder(b: Builder, x: number, z: number, y: number, height: number, rot = 0) {
  const swap = ((rot % 4) + 4) % 4 % 2 === 1;
  for (const s of [-1, 1]) {
    pushBox(
      b,
      swap
        ? [x + s * 0.22 - 0.04, y, z]
        : [x - 0.04, y, z + s * 0.22 - 0.04],
      swap
        ? [x + s * 0.22 + 0.04, y + height, z + 0.05]
        : [x + 0.05, y + height, z + s * 0.22 + 0.04],
      PALETTE.rust,
      0.008,
    );
  }
  const rungs = Math.max(3, Math.round(height / 0.34));
  for (let i = 1; i < rungs; i++) {
    const ry = y + (i * height) / rungs;
    pushBox(
      b,
      swap ? [x - 0.22, ry, z - 0.03] : [x - 0.03, ry, z - 0.22],
      swap ? [x + 0.22, ry + 0.05, z + 0.03] : [x + 0.03, ry + 0.05, z + 0.22],
      PALETTE.rust,
      0.006,
    );
  }
}

/** A sodium street lamp on a pole. */
export function streetLamp(b: Builder, x: number, z: number, y: number, height = 4.4) {
  pushBox(b, [x - 0.1, y, z - 0.1], [x + 0.1, y + height, z + 0.1], PALETTE.concreteDark, 0.01);
  pushBox(b, [x - 0.16, y, z - 0.16], [x + 0.16, y + 0.35, z + 0.16], PALETTE.concrete, 0.01);
  pushBox(b, [x - 0.07, y + height - 0.3, z - 0.07], [x + 0.07, y + height, z + 0.07], PALETTE.steelDark, 0.008);
  pushBox(b, [x - 0.55, y + height, z - 0.16], [x + 0.06, y + height + 0.16, z + 0.16], PALETTE.steelDark, 0.01);
  pushBox(b, [x - 0.52, y + height - 0.06, z - 0.13], [x - 0.3, y + height + 0.02, z + 0.13], PALETTE.lampSodium, 0.008);
}

/** A floodlight on a pole, aimed along the given axis. */
export function floodlight(
  b: Builder,
  x: number,
  z: number,
  y: number,
  height: number,
  aim: 1 | -1 = 1,
) {
  pushBox(b, [x - 0.09, y, z - 0.09], [x + 0.09, y + height, z + 0.09], PALETTE.steelDark, 0.01);
  pushBox(b, [x - 0.4, y + height, z - 0.24], [x + 0.4, y + height + 0.34, z + 0.24], PALETTE.steelDark, 0.012);
  pushBox(
    b,
    [x + (aim > 0 ? 0.3 : -0.4), y + height + 0.05, z - 0.2],
    [x + (aim > 0 ? 0.42 : -0.28), y + height + 0.29, z + 0.2],
    PALETTE.fluorescent,
    0.008,
  );
}

/** A run of pipe with rust stains, used along wall bases. */
export function drainPipe(b: Builder, x: number, z: number, y: number, height: number, axis: "x" | "z" = "z") {
  if (axis === "z") {
    pushBox(b, [x - 0.07, y, z], [x + 0.07, y + height, z + 0.07], PALETTE.rust, 0.008);
  } else {
    pushBox(b, [x, y, z - 0.07], [x + 0.07, y + height, z + 0.07], PALETTE.rust, 0.008);
  }
}

/** A wall sign or painted stencil. */
export function signPlate(
  b: Builder,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  color: Color,
  face: "z" | "x" = "z",
) {
  if (face === "z") {
    pushBox(b, [x - w / 2, y - h / 2, z - 0.03], [x + w / 2, y + h / 2, z + 0.03], color, 0.006);
  } else {
    pushBox(b, [x - 0.03, y - h / 2, z - w / 2], [x + 0.03, y + h / 2, z + w / 2], color, 0.006);
  }
}

/** Faded graffiti sprayed onto a wall. */
export function graffiti(
  b: Builder,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  color: Color,
  face: "z" | "x" = "z",
) {
  const bands = 3;
  for (let i = 0; i < bands; i++) {
    const t = (i + 0.5) / bands;
    const bw = w * (0.35 + 0.4 * ((i * 7) % 3) * 0.33);
    const bh = h * (0.4 + 0.2 * ((i * 5) % 3) * 0.3);
    const bx = x - w / 2 + bw / 2 + (w - bw) * t * 0.6;
    const by = y + (i % 2 === 0 ? h * 0.18 : -h * 0.2);
    signPlate(b, bx, by, z, bw, bh, color, face);
  }
}

/** A cluster of bullet holes: small dark pits on a wall. */
export function bulletHoles(
  b: Builder,
  x: number,
  y: number,
  z: number,
  count: number,
  spread: number,
  face: "z" | "x" = "z",
  seed = 1,
) {
  for (let i = 0; i < count; i++) {
    const a = Math.sin((seed + i) * 12.9898) * 43758.5453;
    const fx = a - Math.floor(a);
    const c = Math.sin((seed + i) * 78.233) * 43758.5453;
    const fy = c - Math.floor(c);
    const px = x + (fx - 0.5) * spread;
    const py = y + (fy - 0.5) * spread * 0.8;
    if (face === "z") {
      pushBox(b, [px - 0.035, py - 0.035, z - 0.02], [px + 0.035, py + 0.035, z + 0.02], [0.06, 0.06, 0.07]);
    } else {
      pushBox(b, [x - 0.02, py - 0.035, pz(px) - 0.035], [x + 0.02, py + 0.035, pz(px) + 0.035], [0.06, 0.06, 0.07]);
    }
  }
}

function pz(v: number): number {
  return v;
}

/** An air conditioning unit on a wall. */
export function acUnit(b: Builder, x: number, y: number, z: number, face: "z" | "x" = "z") {
  if (face === "z") {
    pushBox(b, [x - 0.42, y - 0.3, z - 0.04], [x + 0.42, y + 0.3, z + 0.32], PALETTE.steelLight, 0.01);
    pushBox(b, [x - 0.34, y - 0.22, z + 0.32], [x + 0.34, y + 0.22, z + 0.36], PALETTE.steelDark, 0.006);
  } else {
    pushBox(b, [x - 0.04, y - 0.3, z - 0.42], [x + 0.32, y + 0.3, z + 0.42], PALETTE.steelLight, 0.01);
    pushBox(b, [x + 0.32, y - 0.22, z - 0.34], [x + 0.36, y + 0.22, z + 0.34], PALETTE.steelDark, 0.006);
  }
}

/** A shipping truck: a cab and a box body. */
export function truck(b: Builder, x: number, z: number, y: number, rot: number) {
  const swap = ((rot % 4) + 4) % 4 % 2 === 1;
  const at = (lx: number, lz: number): [number, number] => [
    x + (swap ? lz : lx),
    z + (swap ? lx : lz),
  ];
  const box = (w: number, d: number, lx: number, lz: number, y0: number, y1: number, c: Color, o = 0.012) => {
    const [ax, az] = at(lx - w / 2, lz - d / 2);
    const [bx, bz] = at(lx + w / 2, lz + d / 2);
    pushBox(b, [Math.min(ax, bx), y0, Math.min(az, bz)], [Math.max(ax, bx), y1, Math.max(az, bz)], c, o);
  };
  // Chassis and wheels.
  box(1.9, 5.4, 0, 0, y + 0.32, y + 0.55, PALETTE.steelDark);
  for (const lz of [-1.7, 1.5]) {
    for (const lx of [-0.95, 0.95]) {
      const [wx, wz] = at(lx, lz);
      pushBox(b, [wx - 0.14, y, wz - 0.42], [wx + 0.14, y + 0.6, wz + 0.42], PALETTE.tyre, 0.008);
    }
  }
  // Cargo body.
  box(2.1, 3.6, 0, 0.85, y + 0.55, y + 2.5, PALETTE.truckBody);
  box(2.14, 3.3, 0, 0.85, y + 0.7, y + 2.2, shade(PALETTE.truckBody, 0.9), 0.01);
  // Cab.
  box(1.9, 1.8, 0, -2.1, y + 0.55, y + 2.1, PALETTE.truckCab);
  box(1.6, 0.1, 0, -3.0, y + 1.25, y + 1.85, PALETTE.glassDark, 0.008);
  box(1.7, 0.1, 0, -2.95, y + 0.6, y + 1.2, [0.5, 0.52, 0.5], 0.008);
}

/** A traffic cone. */
export function cone(b: Builder, x: number, z: number, y: number) {
  pushBox(b, [x - 0.16, y, z - 0.16], [x + 0.16, y + 0.05, z + 0.16], [0.3, 0.14, 0.1], 0.008);
  pushBox(b, [x - 0.11, y + 0.05, z - 0.11], [x + 0.11, y + 0.26, z + 0.11], [0.72, 0.3, 0.08], 0.008);
  pushBox(b, [x - 0.075, y + 0.26, z - 0.075], [x + 0.075, y + 0.44, z + 0.075], [0.82, 0.42, 0.12], 0.008);
  pushBox(b, [x - 0.09, y + 0.3, z - 0.09], [x + 0.09, y + 0.36, z + 0.09], [0.86, 0.86, 0.84], 0.006);
}

/** A patrol car with a light bar. */
export function policeCar(b: Builder, x: number, z: number, y: number, rot: number) {
  const swap = ((rot % 4) + 4) % 4 % 2 === 1;
  const at = (lx: number, lz: number): [number, number] => [
    x + (swap ? lz : lx),
    z + (swap ? lx : lz),
  ];
  const box = (w: number, d: number, lx: number, lz: number, y0: number, y1: number, c: Color, o = 0.012) => {
    const [ax, az] = at(lx - w / 2, lz - d / 2);
    const [bx, bz] = at(lx + w / 2, lz + d / 2);
    pushBox(b, [Math.min(ax, bx), y0, Math.min(az, bz)], [Math.max(ax, bx), y1, Math.max(az, bz)], c, o);
  };
  box(1.8, 4.0, 0, 0, y + 0.34, y + 0.95, PALETTE.vanPanel);
  box(1.66, 2.1, 0, 0.1, y + 0.95, y + 1.42, PALETTE.vanBody);
  box(1.5, 0.1, 0, -1.0, y + 1.0, y + 1.36, PALETTE.glassDark, 0.008);
  box(1.5, 0.1, 0, 1.16, y + 1.0, y + 1.36, PALETTE.glassDark, 0.008);
  for (const lz of [-1.3, 1.3]) {
    for (const lx of [-0.85, 0.85]) {
      const [wx, wz] = at(lx, lz);
      pushBox(b, [wx - 0.12, y, wz - 0.34], [wx + 0.12, y + 0.5, wz + 0.34], PALETTE.tyre, 0.008);
    }
  }
  box(1.2, 0.28, 0, 0.1, y + 1.42, y + 1.6, PALETTE.steelDark, 0.008);
  box(0.5, 0.22, -0.28, 0.1, y + 1.44, y + 1.57, PALETTE.policeRed, 0.006);
  box(0.5, 0.22, 0.28, 0.1, y + 1.44, y + 1.57, PALETTE.policeBlue, 0.006);
  // The white door panel of the patrol livery.
  box(0.06, 1.5, -0.92, 0.6, y + 0.5, y + 0.9, PALETTE.graffitiWhite, 0.008);
  box(0.06, 1.5, 0.92, 0.6, y + 0.5, y + 0.9, PALETTE.graffitiWhite, 0.008);
}

/** A police van with a light bar on the roof. */
export function policeVan(b: Builder, x: number, z: number, y: number, rot: number) {
  const swap = ((rot % 4) + 4) % 4 % 2 === 1;
  const at = (lx: number, lz: number): [number, number] => [
    x + (swap ? lz : lx),
    z + (swap ? lx : lz),
  ];
  const box = (w: number, d: number, lx: number, lz: number, y0: number, y1: number, c: Color, o = 0.012) => {
    const [ax, az] = at(lx - w / 2, lz - d / 2);
    const [bx, bz] = at(lx + w / 2, lz + d / 2);
    pushBox(b, [Math.min(ax, bx), y0, Math.min(az, bz)], [Math.max(ax, bx), y1, Math.max(az, bz)], c, o);
  };
  // The body, with the dark blue panel of the police livery.
  box(1.86, 4.1, 0, 0, y + 0.36, y + 1.4, PALETTE.vanBody);
  box(1.9, 4.14, 0, 0, y + 0.36, y + 0.84, PALETTE.vanPanel, 0.01);
  // The upper body and the roof, set in from the sides.
  box(1.72, 3.5, 0, 0.2, y + 1.4, y + 2.05, PALETTE.vanBody);
  // The windscreen, the rear window and the side glass.
  box(1.6, 0.12, 0, -1.5, y + 1.5, y + 1.96, PALETTE.glassDark, 0.008);
  box(1.56, 0.12, 0, 1.86, y + 1.54, y + 1.92, PALETTE.glassDark, 0.008);
  for (const s of [-1, 1]) {
    box(0.1, 1.5, s * 0.8, 0.3, y + 1.52, y + 1.92, PALETTE.glassDark, 0.008);
  }
  // The blue band of the livery along the sides.
  for (const s of [-1, 1]) {
    box(0.08, 3.9, s * 0.94, 0, y + 0.9, y + 1.24, PALETTE.vanPanel, 0.008);
  }
  // The bumpers.
  box(1.9, 0.22, 0, -2.16, y + 0.42, y + 0.74, PALETTE.steelDark, 0.01);
  box(1.9, 0.22, 0, 2.16, y + 0.42, y + 0.74, PALETTE.steelDark, 0.01);
  for (const lz of [-1.4, 1.4]) {
    for (const lx of [-0.9, 0.9]) {
      const [wx, wz] = at(lx, lz);
      pushBox(b, [wx - 0.13, y, wz - 0.38], [wx + 0.13, y + 0.55, wz + 0.38], PALETTE.tyre, 0.008);
    }
  }
  // The light bar.
  box(1.3, 0.3, 0, 0.2, y + 2.05, y + 2.28, PALETTE.steelDark, 0.008);
  box(0.55, 0.24, -0.32, 0.2, y + 2.08, y + 2.25, PALETTE.policeRed, 0.006);
  box(0.55, 0.24, 0.32, 0.2, y + 2.08, y + 2.25, PALETTE.policeBlue, 0.006);
  // A ladder strapped to the roof rack.
  for (let i = 0; i < 5; i++) {
    box(0.92, 0.08, 0, -0.7 + i * 0.38, y + 2.05, y + 2.13, PALETTE.steel, 0.006);
  }
  for (const s of [-1, 1]) {
    box(0.08, 2.0, s * 0.44, 0.05, y + 2.05, y + 2.15, PALETTE.steel, 0.006);
  }
  // A ladder on the rear door.
  for (let i = 0; i < 4; i++) {
    box(0.66, 0.07, 0, 2.09, y + 0.95 + i * 0.3, y + 2.05, PALETTE.steel, 0.006);
  }
  for (const s of [-1, 1]) {
    box(0.07, 0.08, s * 0.3, 2.09, y + 0.95, y + 2.05, PALETTE.steel, 0.006);
  }
}
