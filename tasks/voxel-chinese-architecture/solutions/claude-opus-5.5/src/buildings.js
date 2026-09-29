import { P } from './palette.js';
import { GREY as GREY_TILES, YELLOW as YELLOW_TILES, roof } from './roofs.js';
import {
  balustrade, bracketBand, column, fillUp, frontGap, lantern, platform, plaque, ring, steps,
} from './parts.js';

const range = (a, b, step) => {
  const out = [];
  for (let x = a; x <= b; x += step) out.push(x);
  return out;
};

// Stacked terraces, each tier with its balustrade and a flight of steps on
// the front (and optionally the back). Returns the floor height.
function terraces(fr, hw, hd, tiers, stairHalf, imperial, back) {
  let y = 0;
  for (const [mw, md, h] of tiers) {
    platform(fr, hw + mw, hd + md, y, h);
    y += h;
  }
  y = 0;
  tiers.forEach(([mw, md, h], i) => {
    const top = y + h;
    const last = i === tiers.length - 1;
    if (!last || tiers.length > 1) {
      const gap = back
        ? (s, side) => (side === 0 || side === 2) && Math.abs(s) <= stairHalf + 1
        : frontGap(stairHalf + 1);
      balustrade(fr, hw + mw, hd + md, top, gap);
    }
    steps(fr, -stairHalf, stairHalf, hd + md, y, h, imperial);
    if (back) steps(fr.turn(2), -stairHalf, stairHalf, hd + md, y, h, false);
    y = top;
  });
  return y;
}

// Front facade infill for one bay [u0, u1] between columns, from y0 up to y1.
function bayFill(fr, u0, u1, v, y0, y1, isDoor) {
  for (let y = y0; y <= y1; y++) {
    for (let u = u0; u <= u1; u++) {
      const edge = u === u0 || u === u1;
      let c;
      if (y >= y1 - 1) c = (u + y) & 1 ? P.lattice : P.wood; // transom
      else if (isDoor) {
        if (edge) c = P.door;
        else if (y < y0 + 3) c = P.door;
        else c = (u + y) & 1 ? P.lattice : P.paper;
      } else if (y < y0 + 3) c = y === y0 ? P.brickGrey : P.wallRed;
      else if (edge || y === y0 + 3) c = P.door;
      else c = (u ^ y) & 1 ? P.lattice : P.paper;
      fr.set(u, y, v, c);
    }
  }
  if (isDoor) {
    // Gold door knockers on the two leaves.
    const m = (u0 + u1) >> 1;
    fr.set(m, y0 + 4, v + 1, P.gold);
    fr.set(m + 1, y0 + 4, v + 1, P.gold);
  }
}

// Enclosed red-walled body with a front porch and a lattice facade.
function hallBody(fr, hw, hd, porch, us, vs, base, colH, doorBays) {
  const top = base + colH - 1;
  const wall = (u, y, v) => fr.set(u, y, v, y === base ? P.brickGrey : P.wallRed);
  for (let y = base; y <= top; y++) {
    for (let u = -hw; u <= hw; u++) wall(u, y, -hd);
    for (let v = -hd; v <= hd - porch; v++) {
      wall(-hw, y, v);
      wall(hw, y, v);
    }
  }
  const fv = hd - porch;
  const centre = (us.length - 2) / 2; // index of the central bay
  for (let i = 0; i < us.length - 1; i++) {
    const isDoor = Math.abs(i - centre) <= doorBays;
    bayFill(fr, us[i] + 1, us[i + 1] - 1, fv, base, top, isDoor);
  }
  for (const u of us) {
    column(fr, u, hd, base, colH);
    column(fr, u, fv, base, colH);
    column(fr, u, -hd, base, colH);
  }
  for (const v of vs) {
    column(fr, -hw, v, base, colH);
    column(fr, hw, v, base, colH);
  }
}

// Upper storey of a double-eave roof: a short red wall with a clerestory of
// lattice windows between the corner columns.
function clerestory(fr, hw, hd, y0, h, bay) {
  for (let y = y0; y < y0 + h; y++) {
    ring(fr, hw, hd, 0, y, (s) => {
      if (s % bay === 0) return P.column;
      if (y === y0 || y === y0 + h - 1) return P.wood;
      return (s ^ y) & 1 ? P.lattice : P.paper;
    });
  }
}

// Double-eave or single-eave roof over a body whose column tops are at y.
function crown(fr, hw, hd, y, bay, r) {
  const ey = bracketBand(fr, hw, hd, y, bay);
  if (!r.double) {
    roof(fr, { W: hw + r.ov, D: hd + r.ov, y: ey, H: r.H, type: r.type, tiles: r.tiles, lift: r.lift, gable: r.gable });
    fillUp(fr, hw, hd, 0, ey, P.woodDark);
    return;
  }
  const d = r.double;
  const inner = r.ov + d.inset;
  const skirt = roof(fr, {
    W: hw + r.ov, D: hd + r.ov, y: ey, H: d.H, type: 'skirt', ring: inner, span: inner,
    tiles: r.tiles, lift: r.lift, liftR: r.ov + 2,
  });
  fillUp(fr, hw, hd, 0, ey, P.woodDark);
  const hw2 = hw - d.inset;
  const hd2 = hd - d.inset;
  clerestory(fr, hw2, hd2, skirt.innerY + 1, d.wallH, bay);
  if (d.plaque) plaque(fr, hd2 + 1, skirt.innerY + 2, d.plaque);
  const ey2 = bracketBand(fr, hw2, hd2, skirt.innerY + 1 + d.wallH, bay);
  roof(fr, {
    W: hw2 + d.ov, D: hd2 + d.ov, y: ey2, H: r.H, type: r.type, tiles: r.tiles,
    lift: r.lift + 1, gable: r.gable,
  });
  fillUp(fr, hw2, hd2, 0, ey2, P.woodDark);
}

// Main hall (大殿): triple marble terrace with imperial ramp, seven bays,
// double-eave hip roof (重檐庑殿) in yellow glaze.
export function mainHall(fr) {
  const hw = 21, hd = 12, bay = 6, colH = 12;
  const us = range(-hw, hw, bay);
  const vs = range(-hd, hd, 6);
  const base = terraces(fr, hw, hd, [[12, 12, 4], [8, 8, 4], [4, 4, 4]], 5, true, false);
  hallBody(fr, hw, hd, 4, us, vs, base, colH, 1);
  for (const u of [-18, -12, 12, 18]) lantern(fr, u, hd + 1, base + colH - 1);
  crown(fr, hw, hd, base + colH, bay, {
    type: 'wudian', tiles: YELLOW_TILES, ov: 6, H: 14, lift: 3,
    double: { inset: 4, H: 5, wallH: 6, ov: 6, plaque: 4 },
  });
}

// Side halls (配殿): five bays, single-eave hip-and-gable (歇山) roof in grey tile.
export function sideHall(fr) {
  const hw = 15, hd = 7, bay = 6, colH = 9;
  const us = range(-hw, hw, bay);
  const vs = [-7, 0, 7];
  const base = terraces(fr, hw, hd, [[3, 3, 3]], 3, false, false);
  hallBody(fr, hw, hd, 3, us, vs, base, colH, 0);
  balustrade(fr, hw + 3, hd + 3, base, frontGap(4));
  for (const u of [-12, 12]) lantern(fr, u, hd + 1, base + colH - 1);
  plaque(fr, hd + 1, base + colH - 3, 2);
  crown(fr, hw, hd, base + colH, bay, { type: 'xieshan', tiles: GREY_TILES, ov: 5, H: 10, lift: 3 });
}

// Mountain gate (山门): open colonnade with a central red wall pierced by three
// arched gateways, single-eave hip-and-gable roof in yellow glaze.
export function gate(fr) {
  const hw = 15, hd = 5, bay = 6, colH = 10;
  const us = range(-hw, hw, bay);
  const base = terraces(fr, hw, hd, [[3, 3, 3]], 4, false, true);
  const top = base + colH - 1;
  for (let y = base; y <= top; y++) {
    for (let u = -hw; u <= hw; u++) {
      fr.set(u, y, 0, y === base ? P.brickGrey : P.wallRed);
      fr.set(u, y, -1, y === base ? P.brickGrey : P.wallRed);
    }
    for (let v = -hd; v <= hd; v++) {
      fr.set(-hw, y, v, P.wallRed);
      fr.set(hw, y, v, P.wallRed);
    }
  }
  // Arched openings: centre open, flanks closed by studded red doors.
  const arch = (cu, half, h, door) => {
    for (let u = cu - half; u <= cu + half; u++) {
      const d = Math.abs(u - cu);
      const hh = h - (d === half ? 1 : 0);
      for (let y = base; y < base + hh; y++) {
        for (const v of [0, -1]) {
          if (!door) fr.set(u, y, v, 0);
          else fr.set(u, y, v, v === 0 && d < half && ((u + y) & 1) === 0 && y > base ? P.studs : P.door);
        }
      }
    }
    for (let u = cu - half - 1; u <= cu + half + 1; u++) fr.set(u, base + h, 1, P.marble);
  };
  arch(0, 3, 8, false);
  arch(-9, 2, 6, true);
  arch(9, 2, 6, true);
  for (const u of us) {
    column(fr, u, hd, base, colH);
    column(fr, u, -hd, base, colH);
  }
  plaque(fr, 1, base + colH - 1 - 2, 3);
  for (const u of [-6, 6]) lantern(fr, u, hd + 1, top);
  crown(fr, hw, hd, base + colH, bay, { type: 'xieshan', tiles: YELLOW_TILES, ov: 5, H: 10, lift: 3 });
}

// Bell or drum tower (钟楼/鼓楼): brick podium with a through-arch, an open
// pavilion with a balustrade, and a double-eave pyramidal roof (重檐攒尖).
// The frame's front (+v) faces the axis; stairSide (+1/-1) picks which flank
// carries the stair up to the pavilion.
export function tower(fr, kind, stairSide) {
  const hb = 8, hB = 9;
  fr.box(-hb, 0, -hb, hb, hB - 1, hb, P.brickGrey);
  ring(fr, hb, hb, 0, 0, () => P.slabEdge);
  ring(fr, hb, hb, 0, hB - 1, () => P.marble);
  fr.box(-hb + 1, hB - 1, -hb + 1, hb - 1, hB - 1, hb - 1, P.pave);
  for (let y = 2; y < hB - 1; y += 2) ring(fr, hb, hb, 0, y, (s) => ((s + (y >> 1)) & 1 ? P.rockDark : 0));
  // Through-arch along v.
  for (let u = -2; u <= 2; u++) {
    const h = Math.abs(u) === 2 ? 4 : 5;
    fr.box(u, 0, -hb, u, h, hb, 0);
  }
  fr.box(-3, 6, hb, 3, 6, hb, P.marble);
  fr.box(-3, 6, -hb, 3, 6, -hb, P.marble);
  // Flank stair rising towards the back, landing beside the pavilion.
  const su = stairSide * (hb + 1);
  const so = stairSide * (hb + 3);
  for (let k = 0; k < hB - 1; k++) {
    fr.box(su, 0, 5 - k, so, k, 5 - k, k & 1 ? P.slabEdge : P.slab);
  }
  fr.box(su, 0, -3, so, hB - 1, -4, P.slab);
  fr.box(so + stairSide, 0, 6, so + stairSide, hB - 1, -4, P.brickGrey);

  const hw = 5, base = hB, colH = 8;
  const railSide = stairSide > 0 ? 1 : 3;
  balustrade(fr, hb, hb, base, (s, side) => side === railSide && s >= -4 && s <= -3);
  for (const u of [-hw, 0, hw]) for (const v of [-hw, 0, hw]) if (u || v) column(fr, u, v, base, colH);
  if (kind === 'bell') {
    fr.box(0, base + colH - 1, 0, 0, base + colH - 1, 0, P.woodDark);
    fr.box(-1, base + colH - 2, -1, 1, base + colH - 2, 1, P.bronzeDark);
    fr.box(-2, base + 2, -2, 2, base + colH - 3, 2, P.bronze);
    ring(fr, 2, 2, 0, base + 4, () => P.bronzeDark);
    ring(fr, 2, 2, 1, base + 2, () => P.bronze);
    fr.box(-3, base + colH - 2, 0, 3, base + colH - 2, 0, P.woodDark);
  } else {
    fr.box(-1, base, -1, 1, base + 1, 1, P.woodDark);
    fr.box(-3, base + 2, -2, 3, base + 6, 2, P.wallRed);
    fr.box(-2, base + 2, -3, 2, base + 6, 3, P.wallRed);
    fr.box(-2, base + 3, -2, 2, base + 5, 2, P.wallRed);
    fr.box(-4, base + 3, -1, 4, base + 5, 1, P.drumSkin);
    fr.set(-4, base + 4, 0, P.gold);
    fr.set(4, base + 4, 0, P.gold);
    ring(fr, 3, 2, 0, base + 2, (s) => (s & 1 ? P.gold : 0));
  }
  for (const u of [-3, 3]) lantern(fr, u, hw + 1, base + colH - 1);
  crown(fr, hw, hw, base + colH, 5, {
    type: 'cuanjian', tiles: GREY_TILES, ov: 4, H: 8, lift: 3,
    double: { inset: 2, H: 3, wallH: 3, ov: 4 },
  });
}
