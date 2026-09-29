import { P } from './palette.js';

// Visits the perimeter of the rectangle |u| = hw + o, |v| = hd + o at height y.
// fn(s, side) receives the coordinate along the side and returns a palette
// index (0 skips the cell).
export function ring(fr, hw, hd, o, y, fn) {
  const U = hw + o;
  const V = hd + o;
  for (let u = -U; u <= U; u++) {
    const a = fn(u, 0);
    if (a) fr.set(u, y, V, a);
    const b = fn(u, 2);
    if (b) fr.set(u, y, -V, b);
  }
  for (let v = -V + 1; v <= V - 1; v++) {
    const a = fn(v, 1);
    if (a) fr.set(U, y, v, a);
    const b = fn(v, 3);
    if (b) fr.set(-U, y, v, b);
  }
}

// Stone terrace (台基) occupying y in [y0, y0 + h - 1], with a carved top
// course and a lighter coping line.
export function platform(fr, hw, hd, y0, h) {
  fr.box(-hw, y0, -hd, hw, y0 + h - 1, hd, P.slab);
  ring(fr, hw, hd, 0, y0, () => P.slabEdge);
  ring(fr, hw, hd, 0, y0 + h - 1, () => P.marble);
  fr.box(-hw + 1, y0 + h - 1, -hd + 1, hw - 1, y0 + h - 1, hd - 1, P.pave);
  for (let v = -hd + 2; v <= hd - 2; v += 4) fr.box(-hw + 1, y0 + h - 1, v, hw - 1, y0 + h - 1, v, P.paveDark);
}

// Fills upward from y on the perimeter ring at offset o until a solid voxel is
// met, closing the gap between a bracket band and the roof above it.
export function fillUp(fr, hw, hd, o, y, c, max = 16) {
  const U = hw + o;
  const V = hd + o;
  const col = (u, v) => {
    for (let k = 0; k < max; k++) {
      if (fr.get(u, y + k, v)) return;
      fr.set(u, y + k, v, c);
    }
  };
  for (let u = -U; u <= U; u++) { col(u, V); col(u, -V); }
  for (let v = -V + 1; v <= V - 1; v++) { col(U, v); col(-U, v); }
}

// Marble balustrade on top of a terrace. open(s, side) leaves a cell out,
// with the same (s, side) convention as ring(); side 0 is the front.
export const frontGap = (half) => (s, side) => side === 0 && Math.abs(s) <= half;

export function balustrade(fr, hw, hd, y, open = () => false) {
  // Base rail, balusters with a top rail, then carved post heads.
  ring(fr, hw, hd, 0, y, (s, side) => (open(s, side) ? 0 : P.marbleShade));
  ring(fr, hw, hd, 0, y + 1, (s, side) => (open(s, side) ? 0 : s % 3 === 0 ? P.marble : P.carve));
  ring(fr, hw, hd, 0, y + 2, (s, side) => (open(s, side) ? 0 : s % 3 === 0 ? P.marble : 0));
}

// Flight of steps descending forward (+v) from a terrace of height h whose
// front face is at v = vFront. Side cheeks (垂带) flank the flight; with
// imperial = true a carved ramp (御路) runs down the middle.
export function steps(fr, u0, u1, vFront, y0, h, imperial = false) {
  for (let k = 0; k < h; k++) {
    const v = vFront + 1 + k;
    const top = y0 + h - 2 - k;
    if (top < y0) break;
    fr.box(u0, y0, v, u1, top, v, P.slab);
    fr.box(u0, top, v, u1, top, v, k & 1 ? P.marbleShade : P.marble);
    fr.box(u0 - 1, y0, v, u0 - 1, top + 1, v, P.marble);
    fr.box(u1 + 1, y0, v, u1 + 1, top + 1, v, P.marble);
    if (imperial) {
      const m = (u0 + u1) >> 1;
      fr.box(m - 1, y0, v, m + 1, top + 1, v, P.carve);
      fr.set(m, top + 1, v, k & 1 ? P.gold : P.carve);
    }
  }
}

// Red column with a stone base, from y0 to y0 + h - 1.
export function column(fr, u, v, y0, h) {
  fr.box(u, y0, v, u, y0 + h - 1, v, P.column);
  fr.set(u, y0, v, P.marble);
}

// Painted beams and bracket sets (斗拱) above the column top at y. Returns the
// height where the eave begins.
export function bracketBand(fr, hw, hd, y, bay = 6) {
  ring(fr, hw, hd, 0, y, (s) => (s % bay === 0 ? P.gold : P.blue));
  ring(fr, hw, hd, 0, y + 1, (s) => (s % 4 === 0 ? P.gold : s % 2 ? P.teal : P.green));
  ring(fr, hw, hd, 0, y + 2, () => P.wood);
  ring(fr, hw, hd, 1, y + 2, (s) => (s % 2 === 0 ? P.teal : 0));
  ring(fr, hw, hd, 0, y + 3, () => P.woodDark);
  ring(fr, hw, hd, 1, y + 3, () => P.wood);
  ring(fr, hw, hd, 2, y + 3, (s) => (s % 2 === 0 ? P.green : 0));
  ring(fr, hw, hd, 0, y + 4, () => P.woodDark);
  ring(fr, hw, hd, 1, y + 4, (s) => (s & 1 ? P.rafterA : P.rafterB));
  ring(fr, hw, hd, 2, y + 4, (s) => (s & 1 ? P.rafterB : P.rafterA));
  ring(fr, hw, hd, 3, y + 4, (s) => (s & 1 ? P.rafterA : P.rafterB));
  return y + 5;
}

// Horizontal plaque (匾额) centred on the front face at v, spanning y..y+2.
export function plaque(fr, v, y, half = 3) {
  fr.box(-half, y, v, half, y + 2, v, P.gold);
  fr.box(-half + 1, y + 1, v, half - 1, y + 1, v, P.plaque);
  for (let u = -half + 2; u <= half - 2; u += 2) fr.set(u, y + 1, v, P.gold);
}

// Hanging palace lantern, top at y.
export function lantern(fr, u, v, y) {
  fr.set(u, y, v, P.woodDark);
  fr.set(u, y - 1, v, P.gold);
  fr.set(u, y - 2, v, P.lantern);
  fr.set(u, y - 3, v, P.lantern);
  fr.set(u, y - 4, v, P.gold);
  fr.set(u, y - 5, v, P.lanternGold);
}

// Stone lion on a pedestal (y0 = ground). side = -1 or +1 turns the head
// towards the axis.
export function lion(fr, u, v, y0, side) {
  fr.box(u - 2, y0, v - 2, u + 2, y0 + 1, v + 2, P.marble);
  fr.box(u - 2, y0 + 2, v - 2, u + 2, y0 + 2, v + 2, P.marbleShade);
  const b = y0 + 3;
  // Haunches and body.
  fr.box(u - 1, b, v - 2, u + 1, b + 2, v - 1, P.lionStone);
  fr.box(u - 1, b, v, u + 1, b + 3, v + 1, P.lionStone);
  // Front legs.
  fr.set(u - 1, b, v + 2, P.lionDark);
  fr.set(u + 1, b, v + 2, P.lionDark);
  fr.box(u - 1, b + 1, v + 2, u + 1, b + 1, v + 2, P.lionStone);
  // Mane and head.
  fr.box(u - 1, b + 4, v - 1, u + 1, b + 6, v + 1, P.lionDark);
  fr.box(u - 1, b + 4, v + 2, u + 1, b + 5, v + 2, P.lionStone);
  fr.set(u, b + 5, v + 3, P.lionDark);
  fr.set(u - 1, b + 6, v + 2, P.lionDark);
  fr.set(u + 1, b + 6, v + 2, P.lionDark);
  // Paw on a ball (male) or cub (female) on the inner side.
  fr.set(u + side, b + 1, v + 3, side > 0 ? P.gold : P.lionStone);
  // Curled tail.
  fr.set(u, b + 3, v - 2, P.lionDark);
  fr.set(u, b + 4, v - 2, P.lionDark);
}

// Bronze incense burner (香炉) on a small plinth.
export function burner(fr, u, v, y0) {
  fr.box(u - 2, y0, v - 2, u + 2, y0, v + 2, P.marble);
  fr.set(u - 1, y0 + 1, v - 1, P.bronzeDark);
  fr.set(u + 1, y0 + 1, v - 1, P.bronzeDark);
  fr.set(u - 1, y0 + 1, v + 1, P.bronzeDark);
  fr.set(u + 1, y0 + 1, v + 1, P.bronzeDark);
  fr.box(u - 2, y0 + 2, v - 2, u + 2, y0 + 4, v + 2, P.bronze);
  fr.box(u - 1, y0 + 4, v - 1, u + 1, y0 + 4, v + 1, P.incense);
  fr.set(u - 2, y0 + 5, v, P.bronzeDark);
  fr.set(u + 2, y0 + 5, v, P.bronzeDark);
  fr.box(u - 1, y0 + 6, v - 1, u + 1, y0 + 6, v + 1, P.bronzeDark);
  fr.box(u, y0 + 7, v, u, y0 + 8, v, P.bronze);
}

// Stone lantern (石灯) with a glowing chamber.
export function stoneLantern(fr, u, v, y0) {
  fr.box(u - 1, y0, v - 1, u + 1, y0, v + 1, P.lionStone);
  fr.box(u, y0 + 1, v, u, y0 + 3, v, P.lionStone);
  fr.box(u - 1, y0 + 4, v - 1, u + 1, y0 + 4, v + 1, P.lionDark);
  fr.set(u, y0 + 5, v, P.window);
  fr.set(u - 1, y0 + 5, v - 1, P.lionStone);
  fr.set(u + 1, y0 + 5, v - 1, P.lionStone);
  fr.set(u - 1, y0 + 5, v + 1, P.lionStone);
  fr.set(u + 1, y0 + 5, v + 1, P.lionStone);
  fr.box(u - 2, y0 + 6, v - 2, u + 2, y0 + 6, v + 2, P.tileG);
  fr.box(u - 1, y0 + 7, v - 1, u + 1, y0 + 7, v + 1, P.tileGDark);
  fr.set(u, y0 + 8, v, P.lionStone);
}
