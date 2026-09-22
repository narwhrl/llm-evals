import { C } from './voxels.js';

/**
 * Facade-local frame: local x runs along the facade (viewer's right),
 * local z points out of the facade (toward the viewer). +lz is "front".
 */
function frame(cx, cz, facing) {
  switch (facing) {
    case 'n':
      return (lx, lz) => [cx - lx, cz - lz];
    case 'e':
      return (lx, lz) => [cx + lz, cz + lx];
    case 'w':
      return (lx, lz) => [cx - lz, cz - lx];
    case 's':
    default:
      return (lx, lz) => [cx + lx, cz + lz];
  }
}

/* ------------------------------------------------------------------ */
/* Platforms & stairs                                                  */
/* ------------------------------------------------------------------ */

export function platform(w, { cx, cz, wd, dp, y = 0, tiers = 1, tierH = 2, stairFacing = 's', stairW = 8, color = C.stone, trim = C.stoneDark }) {
  for (let t = 0; t < tiers; t++) {
    const inset = t * 2;
    const tw = wd + 4 - inset * 2;
    const td = dp + 4 - inset * 2;
    const th = tierH;
    w.box(cx, y + t * tierH + th / 2, cz, tw, th, td, t === tiers - 1 ? color : trim);
  }
  const top = y + tiers * tierH;
  // Stairs descending outward from the top tier's front edge.
  const to = frame(cx, cz, stairFacing);
  const ew = stairFacing === 'e' || stairFacing === 'w';
  const edge = (ew ? wd : dp) / 2 + 2 - (tiers - 1) * 2;
  const steps = Math.round(top);
  for (let i = 1; i <= steps; i++) {
    const dist = edge + (steps - i) + 0.5;
    const [sx, sz] = to(0, dist);
    w.box(sx, i / 2, sz, ew ? 1 : stairW, i, ew ? stairW : 1, C.stoneLight);
    const [rx, rz] = to(stairW / 2 + 0.4, dist);
    w.box(rx, i / 2 + 0.4, rz, ew ? 1 : 0.8, i + 0.8, ew ? 0.8 : 1, trim);
    const [lx, lz] = to(-stairW / 2 - 0.4, dist);
    w.box(lx, i / 2 + 0.4, lz, ew ? 1 : 0.8, i + 0.8, ew ? 0.8 : 1, trim);
  }
  return top;
}

/* ------------------------------------------------------------------ */
/* Roofs                                                               */
/* ------------------------------------------------------------------ */

/**
 * Stepped hipped roof built from stacked shrinking slabs (voxel courses),
 * with upturned eave corners (flying eaves), fascia, ridge and chiwen.
 */
export function roofHip(w, {
  cx, cz, wd, dp, y,
  over = 3,
  lift = 0.62,
  tile = C.roofGrey,
  tileDark = C.roofGreyDark,
  ridge = true,
  ridgeColor = tileDark,
  stopW = 6,
  stopD = 6,
  wings = true,
  fascia = true,
  chiwen = true,
}) {
  let W = wd + over * 2;
  let D = dp + over * 2;
  // Fascia / ceiling just under the eave.
  if (fascia) {
    w.box(cx, y - 0.4, cz, W + 0.5, 0.8, D + 0.5, C.woodDark);
  }

  const axis = W >= D ? 'x' : 'z';
  let curW = W;
  let curD = D;
  const layers = [];
  const short = () => (axis === 'x' ? curD : curW);
  const longV = () => (axis === 'x' ? curW : curD);
  const stopShort = axis === 'x' ? stopD : stopW;
  const stopLong = axis === 'x' ? stopW : stopD;

  let guard = 0;
  while ((short() > stopShort || (ridge && longV() > stopLong)) && guard++ < 80) {
    layers.push([curW, curD]);
    if (ridge) {
      // Shrink both while depth/width phase lasts, then long axis only.
      if (short() > stopShort) {
        curW -= 2;
        curD -= 2;
      } else if (axis === 'x') {
        curW -= 2;
      } else {
        curD -= 2;
      }
    } else {
      if (short() <= stopShort && longV() <= stopLong) break;
      if (short() > stopShort) {
        curW -= 2;
        curD -= 2;
      } else break;
    }
  }
  if (!ridge) {
    // Skirt/slab style: shrink whichever side still exceeds its stop.
    layers.length = 0;
    curW = W;
    curD = D;
    guard = 0;
    while ((curW > stopW || curD > stopD) && guard++ < 40 && curW > 1 && curD > 1) {
      layers.push([curW, curD]);
      if (curW > stopW && curD > stopD) {
        curW -= 2;
        curD -= 2;
      } else if (curW > stopW) {
        curW -= 2;
      } else {
        curD -= 2;
      }
    }
  }

  for (let i = 0; i < layers.length; i++) {
    const [lw, ld] = layers[i];
    const col = i % 2 === 0 ? tile : tileDark;
    w.box(cx, y + (i + 0.5) * lift, cz, lw, lift, ld, col);
  }

  const n = layers.length;
  const yTop = y + n * lift;
  const last = layers[n - 1] ?? [W, D];

  // Upturned corner wings at the eave.
  if (wings) {
    const hw = W / 2;
    const hd = D / 2;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        for (let i = 1; i <= 2; i++) {
          const s = 2.0 - i * 0.5;
          w.box(
            cx + sx * (hw + i * 0.75),
            y + 0.4 + i * 0.55,
            cz + sz * (hd + i * 0.75),
            s, lift + 0.1, s,
            i === 1 ? tile : tileDark,
          );
        }
      }
    }
  }

  // Ridge + chiwen ornaments.
  if (ridge && n > 0) {
    const [rw, rd] = last;
    if (axis === 'x') {
      w.box(cx, yTop + 0.55, cz, Math.max(rw, 4) + 2.4, 1.1, 1.6, ridgeColor);
      if (chiwen) {
        for (const s of [-1, 1]) {
          const ex = cx + s * (Math.max(rw, 4) / 2 + 1.4);
          w.box(ex, yTop + 1.6, cz, 1.4, 1.4, 1.4, C.gold);
          w.box(ex, yTop + 2.7, cz, 1.0, 1.0, 1.0, C.gold);
        }
      }
    } else {
      w.box(cx, yTop + 0.55, cz, 1.6, 1.1, Math.max(rd, 4) + 2.4, ridgeColor);
      if (chiwen) {
        for (const s of [-1, 1]) {
          const ez = cz + s * (Math.max(rd, 4) / 2 + 1.4);
          w.box(cx, yTop + 1.6, ez, 1.4, 1.4, 1.4, C.gold);
          w.box(cx, yTop + 2.7, ez, 1.0, 1.0, 1.0, C.gold);
        }
      }
    }
  }
  return yTop;
}

/** Cuanjian (攒尖) pyramid roof that converges to a point + finial. */
export function roofCujian(w, { cx, cz, wd, dp, y, over = 2.5, lift = 0.7, tile = C.roofGrey, tileDark = C.roofGreyDark }) {
  const yTop = roofHip(w, {
    cx, cz, wd, dp, y, over, lift, tile, tileDark,
    ridge: false, stopW: 2, stopD: 2, chiwen: false,
  });
  // Finial stack.
  w.box(cx, yTop + 0.6, cz, 2.2, 1.2, 2.2, C.roofGoldDark);
  w.box(cx, yTop + 1.8, cz, 1.5, 1.2, 1.5, C.gold);
  w.box(cx, yTop + 3.0, cz, 0.9, 1.4, 0.9, C.gold);
  w.box(cx, yTop + 4.0, cz, 0.5, 0.8, 0.5, C.gold);
  return yTop + 4.4;
}

/* ------------------------------------------------------------------ */
/* Structure details                                                   */
/* ------------------------------------------------------------------ */

export function dougongRing(w, { cx, cz, wd, dp, y, step = 3 }) {
  // Bracket sets around the wall head: dark base, projecting arm, gold block.
  const place = (x, z, ox, oz) => {
    w.box(x, y + 0.4, z, 1.2, 0.8, 1.2, C.woodDark);
    w.box(x + ox * 0.5, y + 1.1, z + oz * 0.5, 1.6, 0.6, 1.6, C.wood);
    w.box(x + ox * 0.8, y + 1.7, z + oz * 0.8, 1.3, 0.6, 1.3, C.gold);
  };
  for (let x = -wd / 2 + 1; x <= wd / 2 - 1; x += step) {
    place(cx + x, cz + dp / 2, 0, 1);
    place(cx + x, cz - dp / 2, 0, -1);
  }
  for (let z = -dp / 2 + 1; z <= dp / 2 - 1; z += step) {
    place(cx + wd / 2, cz + z, 1, 0);
    place(cx - wd / 2, cz + z, -1, 0);
  }
}

export function latticeWindow(w, cx, cy, cz, width, height, facing) {
  const to = frame(cx, cz, facing);
  const [px, pz] = to(0, 0);
  // Recessed dark backing.
  w.box(px, cy, pz, facing === 'e' || facing === 'w' ? 0.6 : width, height, facing === 'n' || facing === 's' ? 0.6 : width, C.dark);
  // White lattice grid on the facade plane.
  const bars = Math.max(2, Math.round(width / 1.4));
  const cols = Math.max(2, Math.round(height / 1.4));
  for (let i = 0; i <= bars; i++) {
    const lx = -width / 2 + (i * width) / bars;
    const [bx, bz] = to(lx, 0.35);
    w.box(bx, cy, bz, facing === 'e' || facing === 'w' ? 0.3 : 0.3, height, facing === 'n' || facing === 's' ? 0.3 : 0.3, C.white);
    void pz;
  }
  for (let j = 0; j <= cols; j++) {
    const yy = cy - height / 2 + (j * height) / cols;
    const [bx, bz] = to(0, 0.35);
    w.box(bx, yy, bz, facing === 'e' || facing === 'w' ? 0.3 : width, 0.3, facing === 'n' || facing === 's' ? 0.3 : width, C.white);
  }
}

export function plaque(w, cx, cy, cz, facing, width = 6, height = 2.4) {
  const along = facing === 'e' || facing === 'w';
  const to = frame(cx, cz, facing);
  const [bx, bz] = to(0, 0.3);
  w.box(bx, cy, bz, along ? 0.5 : width, height, along ? width : 0.5, C.woodDark);
  const [gx, gz] = to(0, 0.58);
  w.box(gx, cy, gz, along ? 0.55 : width - 0.8, height - 0.7, along ? width - 0.8 : 0.55, C.gold);
}

export function lantern(w, x, y, z) {
  w.box(x, y + 1.1, z, 0.3, 0.8, 0.3, C.woodDark); // hanging cord/post top
  w.box(x, y, z, 1.1, 1.3, 1.1, C.lantern);
  w.box(x, y - 0.8, z, 0.7, 0.4, 0.7, C.gold);
  w.box(x, y + 0.8, z, 0.8, 0.3, 0.8, C.gold);
}

export function stoneLion(w, x, z, facing) {
  const to = frame(x, z, facing);
  const [bx, bz] = to(0, 0);
  w.box(bx, 0.75, bz, 2.6, 1.5, 2.6, C.stoneDark); // plinth
  w.box(bx, 1.9, bz, 2.0, 0.8, 2.0, C.stoneLight); // base slab
  const [bodyX, bodyZ] = to(0, -0.2);
  w.box(bodyX, 3.0, bodyZ, 1.6, 1.8, 2.2, C.stone); // body
  const [headX, headZ] = to(0, 0.7);
  w.box(headX, 4.4, headZ, 1.5, 1.3, 1.4, C.stone); // head
  w.box(headX, 4.7, headZ + (facing === 's' ? 0.55 : facing === 'n' ? -0.55 : 0), facing === 'e' || facing === 'w' ? 0.55 : 1.0, 0.7, facing === 'n' || facing === 's' ? 0.55 : 1.0, C.stoneDark); // muzzle
  // front paws
  const [pX, pZ] = to(-0.7, 0.9);
  w.box(pX, 2.3, pZ, 0.6, 0.8, 1.0, C.stone);
  const [p2X, p2Z] = to(0.7, 0.9);
  w.box(p2X, 2.3, p2Z, 0.6, 0.8, 1.0, C.stone);
}

/* ------------------------------------------------------------------ */
/* Buildings                                                           */
/* ------------------------------------------------------------------ */

/** Main hall — largest mass on the central axis, wudian (hip) glazed roof. */
export function buildMainHall(w, { cx = 0, cz = -52 } = {}) {
  const wd = 40;
  const dp = 24;
  const baseY = platform(w, { cx, cz, wd, dp, tiers: 2, tierH: 2, stairFacing: 's', stairW: 12 });
  const wallH = 11;
  const top = baseY + wallH;

  // Core body: back + side walls.
  w.box(cx, baseY + wallH / 2, cz - dp / 2 + 0.75, wd, wallH, 1.5, C.redWall);
  w.box(cx - wd / 2 + 0.75, baseY + wallH / 2, cz, 1.5, wallH, dp, C.redWall);
  w.box(cx + wd / 2 - 0.75, baseY + wallH / 2, cz, 1.5, wallH, dp, C.redWall);
  // Interior floor.
  w.box(cx, baseY + 0.25, cz, wd - 2, 0.5, dp - 2, C.wood);

  // Front facade: 7 bays, columns, doors in the middle 3 bays.
  const bays = 7;
  const colX = [];
  for (let i = 0; i <= bays; i++) colX.push(-wd / 2 + 2 + (i * (wd - 4)) / bays);
  const faceZ = cz + dp / 2;
  for (const lx of colX) {
    w.box(cx + lx, baseY + wallH / 2, faceZ - 0.5, 1.2, wallH, 1.2, C.column);
  }
  // Lintel band.
  w.box(cx, baseY + wallH - 1, faceZ - 0.5, wd, 2, 1.4, C.redWallDark);
  // Bay infill: doors in bays 2..4 (0-indexed), windows elsewhere.
  const bayW = (wd - 4) / bays;
  for (let i = 0; i < bays; i++) {
    const lx = -wd / 2 + 2 + bayW * (i + 0.5);
    const isDoor = i >= 2 && i <= 4;
    if (isDoor) {
      w.box(cx + lx, baseY + (wallH - 2) / 2 + 0.4, faceZ - 0.7, bayW - 0.6, wallH - 2.8, 0.8, C.dark);
      // Door lattice.
      for (let k = 0; k < 3; k++) {
        w.box(cx + lx - bayW / 3 + k * (bayW / 3) + 0.05, baseY + (wallH - 2) / 2 + 0.4, faceZ - 0.35, 0.25, wallH - 3.2, 0.25, C.wood);
      }
      w.box(cx + lx, baseY + 2.2, faceZ - 0.35, bayW - 1.2, 0.3, 0.3, C.wood);
      w.box(cx + lx, baseY + wallH - 3.6, faceZ - 0.35, bayW - 1.2, 0.3, 0.3, C.wood);
    } else {
      latticeWindow(w, cx + lx, baseY + 4.6, faceZ - 0.3, bayW - 1.6, 4.4, 's');
    }
  }

  // Plaque over the central door.
  plaque(w, cx, baseY + wallH - 3.2, faceZ + 0.35, 's', 7, 2.6);

  // Columns on the back/sides for depth readability.
  for (let i = 0; i <= 4; i++) {
    const lx = -wd / 2 + 2 + (i * (wd - 4)) / 4;
    w.box(cx + lx, baseY + wallH / 2, cz - dp / 2 + 1.6, 1.1, wallH, 1.1, C.column);
  }

  dougongRing(w, { cx, cz, wd, dp, y: top - 0.6, step: 3.2 });

  // Wudian roof — long ridge along the wide axis.
  const yRoof = top + 1.4;
  roofHip(w, {
    cx, cz, wd, dp, y: yRoof,
    over: 4.5, lift: 0.6,
    tile: C.roofGold, tileDark: C.roofGoldDark,
    ridgeColor: C.roofGoldDark,
    stopW: 8, stopD: 6,
  });

  // Lanterns flanking the entrance + steps-side lions.
  lantern(w, cx - 6, baseY + 7.5, faceZ + 1.1);
  lantern(w, cx + 6, baseY + 7.5, faceZ + 1.1);
  stoneLion(w, cx - 9, cz + dp / 2 + 7.5, 's');
  stoneLion(w, cx + 9, cz + dp / 2 + 7.5, 's');
  return { cx, cz, wd, dp, top };
}

/** Side hall — symmetric flanking hall, xieshan-style layered roof, grey tiles. */
export function buildSideHall(w, { cx, cz, facing }) {
  const wd = 16; // world-x extent (hall depth)
  const dp = 28; // world-z extent (hall length); facade faces east/west
  const baseY = platform(w, {
    cx, cz, wd, dp, tiers: 1, tierH: 2, stairFacing: facing, stairW: 7,
  });
  const wallH = 8;
  const top = baseY + wallH;
  const to = frame(cx, cz, facing);
  const alongEW = facing === 'e' || facing === 'w';
  const wallT = 1.4;

  // Back wall (local -z side).
  {
    const [bx, bz] = to(0, -wd / 2 + wallT / 2);
    w.box(bx, baseY + wallH / 2, bz, alongEW ? wallT : dp, wallH, alongEW ? dp : wallT, C.redWall);
  }
  // End walls (local ±x sides).
  for (const s of [-1, 1]) {
    const [ex, ez] = to(s * (dp / 2 - wallT / 2), 0);
    w.box(ex, baseY + wallH / 2, ez, alongEW ? wd : wallT, wallH, alongEW ? wallT : wd, C.redWall);
  }
  // Interior floor.
  w.box(cx, baseY + 0.25, cz, wd - 2, 0.5, dp - 2, C.wood);

  // Front facade: 5 bays, center bay is a door; facade spans dp.
  const cols = 5;
  const span = dp;
  const faceLz = wd / 2 - 0.5;
  for (let i = 0; i <= cols; i++) {
    const lx = -span / 2 + 1.5 + (i * (span - 3)) / cols;
    const [px, pz] = to(lx, faceLz);
    w.box(px, baseY + wallH / 2, pz, 1.1, wallH, 1.1, C.column);
  }
  // Lintel band along the facade.
  {
    const [lx, lz] = to(0, faceLz);
    w.box(lx, baseY + wallH - 0.8, lz, alongEW ? 1.3 : span, 1.6, alongEW ? span : 1.3, C.redWallDark);
  }
  // Bay infill: door in the middle, lattice windows elsewhere.
  for (let i = 0; i < cols; i++) {
    const bwidth = (span - 3) / cols;
    const lxc = -span / 2 + 1.5 + bwidth * (i + 0.5);
    const isDoor = i === 2;
    const [px, pz] = to(lxc, faceLz + 0.25);
    if (isDoor) {
      w.box(px, baseY + 3, pz, alongEW ? 0.5 : bwidth - 0.8, 5.6, alongEW ? bwidth - 0.8 : 0.5, C.dark);
      w.box(px, baseY + 4, pz, alongEW ? 0.55 : bwidth - 1.6, 0.3, alongEW ? bwidth - 1.6 : 0.55, C.wood);
      w.box(px, baseY + 6.4, pz, alongEW ? 0.55 : bwidth - 1.6, 0.3, alongEW ? bwidth - 1.6 : 0.55, C.wood);
      const [gx1, gz1] = to(lxc, faceLz + 0.45);
      w.box(gx1, baseY + 3.2, gz1, alongEW ? 0.3 : 0.3, 4.6, alongEW ? 0.3 : 0.3, C.wood);
    } else {
      w.box(px, baseY + 4.4, pz, alongEW ? 0.45 : bwidth - 1.4, 3.4, alongEW ? bwidth - 1.4 : 0.45, C.dark);
      for (let k = 0; k <= 2; k++) {
        const o = -bwidth / 2 + 1 + (k * (bwidth - 2)) / 2;
        const [gx, gz] = to(lxc + o, faceLz + 0.5);
        w.box(gx, baseY + 4.4, gz, 0.25, 3.4, 0.25, C.white);
      }
      w.box(px, baseY + 4.4, pz, alongEW ? 0.5 : bwidth - 1.4, 0.25, alongEW ? bwidth - 1.4 : 0.5, C.white);
    }
  }

  // Name plaque over the center door.
  {
    const [px, pz] = to(0, faceLz + 0.75);
    plaque(w, px, baseY + wallH - 2.4, pz, facing, 5.4, 2);
  }

  dougongRing(w, { cx, cz, wd, dp, y: top - 0.5, step: 3 });

  // Xieshan-style layered roof: wide flat skirt eave → gable band → steep hip.
  const yR = top + 1.2;
  const SW = wd + 7.5;
  const SD = dp + 7.5;
  w.box(cx, yR + 0.3, cz, SW, 0.6, SD, C.roofGrey);
  w.box(cx, yR - 0.1, cz, SW + 0.4, 0.25, SD + 0.4, C.woodDark);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      w.box(cx + sx * (SW / 2 + 0.7), yR + 0.75, cz + sz * (SD / 2 + 0.7), 1.8, 0.6, 1.8, C.roofGreyDark);
      w.box(cx + sx * (SW / 2 + 1.5), yR + 1.45, cz + sz * (SD / 2 + 1.5), 1.2, 0.7, 1.2, C.roofGrey);
    }
  }
  // Gable band (ridge runs along z).
  const yB = yR + 0.6;
  w.box(cx, yB + 1.1, cz, wd * 0.78, 2.2, dp * 0.55, C.woodDark);
  for (const s of [-1, 1]) {
    w.box(cx, yB + 1.1, cz + s * (dp * 0.55) / 2, wd * 0.55, 1.7, 0.5, C.white);
  }
  // Upper steep hip roof with grey tiles and gold ridge.
  roofHip(w, {
    cx, cz, wd: wd * 0.8, dp: dp * 0.6, y: yB + 2.2, over: 2.2, lift: 0.66,
    tile: C.roofGrey, tileDark: C.roofGreyDark,
    stopW: 4, stopD: 5, ridgeColor: C.roofGoldDark,
  });

  // Entrance lanterns.
  {
    const [a, b] = to(-span / 4 - 1, faceLz + 1.2);
    lantern(w, a, baseY + 6.4, b);
    const [c, d] = to(span / 4 + 1, faceLz + 1.2);
    lantern(w, c, baseY + 6.4, d);
  }

  return { cx, cz, wd, dp, top };
}

/** Mountain gate — pass-through entrance at the front of the compound. */
export function buildGate(w, { cx = 0, cz = 62 } = {}) {
  const wd = 12; // depth (z)
  const dp = 26; // width along x — facade faces south
  // For the gate, treat facade along x: use custom layout with facing 's'.
  const baseY = platform(w, { cx, cz, wd: dp, dp: wd, tiers: 1, tierH: 1.5, stairFacing: 's', stairW: 16 });
  const wallH = 9;
  const top = baseY + wallH;
  const W = dp; // width along x
  const D = wd; // depth along z

  // Piers: 4 piers create 3 openings (pass-through arches).
  const pierW = 3.2;
  const pierXs = [-W / 2 + pierW / 2, -W / 6, W / 6, W / 2 - pierW / 2];
  for (const px of pierXs) {
    w.box(cx + px, baseY + wallH / 2, cz, pierW, wallH, D - 1, C.redWall);
    // Column facing on both sides.
    w.box(cx + px, baseY + wallH / 2, cz + D / 2 - 0.4, 1.2, wallH, 0.9, C.column);
    w.box(cx + px, baseY + wallH / 2, cz - D / 2 + 0.4, 1.2, wallH, 0.9, C.column);
  }
  // Lintel over openings (upper band).
  w.box(cx, baseY + wallH - 1.8, cz, W, 3.6, D - 1, C.redWallDark);
  // Dark recesses in the three openings (visible depth).
  const openingCenters = [(-W / 6 + -W / 2 + pierW) / 2, 0, (W / 6 + W / 2 - pierW) / 2];
  const openingWs = [W / 6 - (-W / 2 + pierW) - 0.4, W / 6 - -W / 6 - pierW - 0.4, W / 2 - pierW - W / 6 - 0.4];
  for (let i = 0; i < 3; i++) {
    const ocx = i === 0 ? (-W / 2 + pierW + -W / 6) / 2 : i === 1 ? 0 : (W / 6 + W / 2 - pierW) / 2;
    const ow = i === 0 ? (-W / 6 - (-W / 2 + pierW)) : i === 1 ? (W / 6 - -W / 6 - pierW) : (W / 2 - pierW - W / 6);
    // Ceiling shade inside passage.
    w.box(cx + ocx, baseY + wallH - 3.8, cz, ow, 0.6, D - 1.4, C.woodDark);
    // Threshold floor.
    w.box(cx + ocx, baseY + 0.3, cz, ow, 0.6, D - 1.4, C.stoneLight);
    // Lattice transom above opening.
    for (let k = 0; k < 3; k++) {
      w.box(cx + ocx, baseY + wallH - 3 + k * 0.7, cz + D / 2 - 0.6, ow - 1, 0.3, 0.3, C.white);
    }
    void openingCenters;
    void openingWs;
  }

  // Roof.
  const yRoof = top + 1.2;
  roofHip(w, {
    cx, cz, wd: W, dp: D, y: yRoof, over: 3.4, lift: 0.58,
    tile: C.roofGrey, tileDark: C.roofGreyDark,
    stopW: 6, stopD: 5, ridgeColor: C.roofGoldDark,
  });
  dougongRing(w, { cx, cz, wd: W, dp: D, y: top - 0.6, step: 3 });

  plaque(w, cx, baseY + wallH - 2.6, cz + D / 2 + 0.5, 's', 6, 2.2);
  lantern(w, cx - W / 2 + 3, baseY + 6.5, cz + D / 2 + 1);
  lantern(w, cx + W / 2 - 3, baseY + 6.5, cz + D / 2 + 1);
  stoneLion(w, cx - 10, cz + D / 2 + 6, 's');
  stoneLion(w, cx + 10, cz + D / 2 + 6, 's');
  return { cx, cz, top };
}

/** Bell / drum tower — square tower with double-eave roof. */
export function buildTower(w, { cx, cz, kind = 'bell' }) {
  const baseY = platform(w, { cx, cz, wd: 10, dp: 10, tiers: 1, tierH: 2, stairFacing: 's', stairW: 6 });
  const bodyW = 9;
  const lowerH = 8;
  // Lower body: corner posts + waist wall with open arches on 4 sides.
  const half = bodyW / 2;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      w.box(cx + sx * (half - 0.7), baseY + lowerH / 2, cz + sz * (half - 0.7), 1.4, lowerH, 1.4, C.column);
    }
  }
  // Waist walls (solid lower half, open upper half).
  w.box(cx, baseY + 2, cz + half - 0.5, bodyW, 4, 1, C.redWall);
  w.box(cx, baseY + 2, cz - half + 0.5, bodyW, 4, 1, C.redWall);
  w.box(cx + half - 0.5, baseY + 2, cz, 1, 4, bodyW, C.redWall);
  w.box(cx - half + 0.5, baseY + 2, cz, 1, 4, bodyW, C.redWall);
  // Upper rail band.
  w.box(cx, baseY + lowerH - 1, cz, bodyW, 1.6, bodyW, C.redWallDark);

  // Instrument inside, visible through the open upper body.
  if (kind === 'drum') {
    w.box(cx, baseY + 5.4, cz, 4.4, 3.4, 4.4, C.lantern);
    w.box(cx, baseY + 5.4, cz, 4.8, 2.6, 3.0, C.gold);
    w.box(cx, baseY + 3.4, cz, 1.2, 1.2, 3.0, C.woodDark);
  } else {
    w.box(cx, baseY + 5.6, cz, 3.2, 4.2, 3.2, C.bronze);
    w.box(cx, baseY + 3.6, cz, 4.0, 1.0, 4.0, C.bronze);
    w.box(cx, baseY + 7.9, cz, 1.0, 1.4, 1.0, C.gold);
    w.box(cx, baseY + 2.6, cz, 4.6, 0.8, 4.6, C.woodDark);
  }

  // Middle floor slab + second storey.
  const midY = baseY + lowerH;
  w.box(cx, midY + 0.4, cz, bodyW + 1.6, 0.8, bodyW + 1.6, C.woodDark);
  const upperH = 6;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      w.box(cx + sx * (half - 0.6), midY + 0.8 + upperH / 2, cz + sz * (half - 0.6), 1.2, upperH, 1.2, C.column);
    }
  }
  w.box(cx, midY + 0.8 + 1.8, cz + half - 0.5, bodyW, 3.6, 1, C.redWall);
  w.box(cx, midY + 0.8 + 1.8, cz - half + 0.5, bodyW, 3.6, 1, C.redWall);
  w.box(cx + half - 0.5, midY + 0.8 + 1.8, cz, 1, 3.6, bodyW, C.redWall);
  w.box(cx - half + 0.5, midY + 0.8 + 1.8, cz, 1, 3.6, bodyW, C.redWall);
  w.box(cx, midY + 0.8 + upperH - 0.8, cz, bodyW, 1.4, bodyW, C.redWallDark);

  const topBody = midY + 0.8 + upperH;

  // Lower eave (broad skirt).
  roofHip(w, {
    cx, cz, wd: bodyW + 3, dp: bodyW + 3, y: midY + 0.2, over: 3, lift: 0.5,
    tile: C.roofGrey, tileDark: C.roofGreyDark,
    ridge: false, stopW: Math.round(bodyW * 0.6), stopD: Math.round(bodyW * 0.6),
    wings: true, fascia: true, chiwen: false,
  });
  dougongRing(w, { cx, cz, wd: bodyW, dp: bodyW, y: midY - 0.4, step: 3 });

  // Upper eave.
  const yTop = roofHip(w, {
    cx, cz, wd: bodyW, dp: bodyW, y: topBody + 0.6, over: 3.2, lift: 0.6,
    tile: C.roofGold, tileDark: C.roofGoldDark,
    stopW: 3, stopD: 3, ridgeColor: C.roofGoldDark,
  });
  dougongRing(w, { cx, cz, wd: bodyW, dp: bodyW, y: topBody - 0.8, step: 3 });
  plaque(w, cx, midY + 0.8 + upperH - 2, cz + half + 0.5, 's', 4, 1.8);
  lantern(w, cx - half - 1.2, midY - 2.5, cz + half + 0.6);
  lantern(w, cx + half + 1.2, midY - 2.5, cz + half + 0.6);
  return { cx, cz, top: yTop };
}

/** Five-tier pagoda on the axis behind the main hall (cuanjian roof). */
export function buildPagoda(w, { cx = 0, cz = -82 } = {}) {
  const baseY = platform(w, { cx, cz, wd: 10, dp: 10, tiers: 1, tierH: 2, stairFacing: 's', stairW: 6 });
  let y = baseY;
  let size = 9.5;
  const tiers = 5;
  for (let t = 0; t < tiers; t++) {
    const bodyH = 5.4 - t * 0.35;
    // Body: red walls with dark window slots on 4 faces.
    w.box(cx, y + bodyH / 2, cz, size, bodyH, size, t % 2 === 0 ? C.redWall : C.redWallDark);
    // Corner posts.
    const h = size / 2 - 0.5;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        w.box(cx + sx * h, y + bodyH / 2, cz + sz * h, 1.0, bodyH, 1.0, C.column);
      }
    }
    // Window slot per face.
    w.box(cx, y + bodyH * 0.55, cz + size / 2 + 0.05, size * 0.35, bodyH * 0.4, 0.4, C.dark);
    w.box(cx, y + bodyH * 0.55, cz - size / 2 - 0.05, size * 0.35, bodyH * 0.4, 0.4, C.dark);
    w.box(cx + size / 2 + 0.05, y + bodyH * 0.55, cz, 0.4, bodyH * 0.4, size * 0.35, C.dark);
    w.box(cx - size / 2 - 0.05, y + bodyH * 0.55, cz, 0.4, bodyH * 0.4, size * 0.35, C.dark);

    // Eave ring (small skirt with upturned corners).
    const eaveY = y + bodyH;
    const ew = size + 3.6;
    w.box(cx, eaveY + 0.3, cz, ew, 0.6, ew, t % 2 === 0 ? C.roofGrey : C.roofGreyDark);
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        w.box(cx + sx * (ew / 2 + 0.6), eaveY + 0.8, cz + sz * (ew / 2 + 0.6), 1.6, 0.6, 1.6, C.roofGreyDark);
        w.box(cx + sx * (ew / 2 + 1.2), eaveY + 1.3, cz + sz * (ew / 2 + 1.2), 1.1, 0.6, 1.1, C.roofGold);
      }
    }
    w.box(cx, eaveY + 0.75, cz, ew - 1, 0.35, ew - 1, C.woodDark);
    y = eaveY + 0.95;
    size -= 1.3;
  }
  // Cuanjian cap + finial.
  roofCujian(w, { cx, cz, wd: size + 0.5, dp: size + 0.5, y, over: 2.2, lift: 0.62 });
  return { cx, cz, top: y + 6 };
}
