import { box, cyl, plane, decal } from '../kit.js';
import * as P from '../props.js';
import { MID } from '../config.js';

/**
 * Mid lane: the central duel corridor. Heavy concrete flanks with high
 * shooting holes, a half open iron gate, grated drain, side booths and a low
 * wall of cover near the CT side.
 */

/** Wall panel split around rectangular openings. */
function wallWithOpenings(b, mat, x, z0, z1, y0, y1, t, openings) {
  const sorted = [...openings].sort((a, c) => a.z0 - c.z0);
  let cursor = z0;
  for (const o of sorted) {
    if (o.z0 > cursor) {
      b.add(box(t, y1 - y0, o.z0 - cursor), mat, { pos: [x, (y0 + y1) / 2, (cursor + o.z0) / 2] });
    }
    if (o.y0 > y0) {
      b.add(box(t, o.y0 - y0, o.z1 - o.z0), mat, { pos: [x, (y0 + o.y0) / 2, (o.z0 + o.z1) / 2] });
    }
    if (o.y1 < y1) {
      b.add(box(t, y1 - o.y1, o.z1 - o.z0), mat, { pos: [x, (o.y1 + y1) / 2, (o.z0 + o.z1) / 2] });
    }
    cursor = o.z1;
  }
  if (cursor < z1) {
    b.add(box(t, y1 - y0, z1 - cursor), mat, { pos: [x, (y0 + y1) / 2, (cursor + z1) / 2] });
  }
}

export function buildMidLane(b) {
  const t = MID.wallT;
  const h = MID.wallH;
  const wallZ0 = MID.wallZ0, wallZ1 = MID.wallZ1;

  const westOpenings = [
    { z0: -5.4, z1: -4.1, y0: 0, y1: 2.4 },     // side passage
    { z0: -2.7, z1: -1.7, y0: 2.3, y1: 3.05 },  // high shooting hole
    { z0: 3.6, z1: 4.9, y0: 0, y1: 2.4 },       // side passage
  ];
  const eastOpenings = [
    { z0: -6.3, z1: -5.0, y0: 0, y1: 2.4 },
    { z0: -2.7, z1: -1.7, y0: 2.3, y1: 3.05 },
    { z0: 4.2, z1: 5.5, y0: 0, y1: 2.4 },
  ];

  wallWithOpenings(b, 'concrete', -MID.wallX - t / 2, wallZ0, wallZ1, 0, h, t, westOpenings);
  wallWithOpenings(b, 'concrete', MID.wallX + t / 2, wallZ0, wallZ1, 0, h, t, eastOpenings);
  // wall caps
  b.add(box(t + 0.12, 0.16, wallZ1 - wallZ0), 'concreteDark', { pos: [-MID.wallX - t / 2, h + 0.08, (wallZ0 + wallZ1) / 2] });
  b.add(box(t + 0.12, 0.16, wallZ1 - wallZ0), 'concreteDark', { pos: [MID.wallX + t / 2, h + 0.08, (wallZ0 + wallZ1) / 2] });

  // --- iron gate --------------------------------------------------------
  const gz = MID.gateZ;
  b.add(box(0.5, 3.4, 0.6), 'concreteDark', { pos: [-MID.wallX - 0.1, 1.7, gz] });
  b.add(box(0.5, 3.4, 0.6), 'concreteDark', { pos: [MID.wallX + 0.1, 1.7, gz] });
  b.add(box(MID.wallX * 2, 0.35, 0.5), 'concreteDark', { pos: [0, 3.3, gz] });

  // closed leaf
  b.add(box(1.62, 2.55, 0.1), 'steelDark', { pos: [-1.72, 1.3, gz] });
  for (let i = 0; i < 6; i++) {
    b.add(box(0.09, 2.45, 0.09), 'rustHeavy', { pos: [-2.42 + i * 0.28, 1.3, gz - 0.08] });
  }
  b.add(box(1.62, 0.12, 0.14), 'rustHeavy', { pos: [-1.72, 2.52, gz - 0.04] });
  b.add(box(1.62, 0.12, 0.14), 'rustHeavy', { pos: [-1.72, 0.1, gz - 0.04] });

  // open leaf, swinging into the lane
  const ang = 0.95;
  const leafLen = 1.62;
  const hx = 0.0;
  const cxg = hx + Math.cos(ang) * leafLen * 0.5;
  const czg = gz - Math.sin(ang) * leafLen * 0.5;
  b.add(box(leafLen, 2.55, 0.1), 'steelDark', { pos: [cxg, 1.3, czg], rot: [0, ang, 0] });
  for (let i = 0; i < 6; i++) {
    const t2 = (i + 0.5) / 6;
    b.add(box(0.09, 2.45, 0.09), 'rustHeavy', {
      pos: [hx + Math.cos(ang) * leafLen * t2, 1.3, gz - Math.sin(ang) * leafLen * t2 - 0.08 * Math.cos(ang)],
      rot: [0, ang, 0],
    });
  }
  b.add(box(leafLen, 0.12, 0.14), 'rustHeavy', { pos: [cxg, 2.52, czg], rot: [0, ang, 0] });
  b.add(box(leafLen, 0.12, 0.14), 'rustHeavy', { pos: [cxg, 0.1, czg], rot: [0, ang, 0] });
  decal(b, 'bulletHoles2', cxg - 0.3, 1.5, czg - 0.12, 0.8, 0.7, ang);

  // --- raised flanking platforms ---------------------------------------
  for (const side of [-1, 1]) {
    const px = side < 0 ? -MID.wallX - t - 1.3 : MID.wallX + t + 1.3;
    b.add(box(2.6, 0.28, 3.4), 'concrete', { pos: [px, MID.platformY - 0.14, -1.4] });
    b.add(box(2.6, 0.9, 0.22), 'concrete', { pos: [px, MID.platformY + 0.45, -3.0] });
    for (const cz2 of [-2.8, -0.2]) {
      b.add(cyl(0.16, 0.16, MID.platformY, 10), 'steelDark', {
        pos: [px + side * 1.0, MID.platformY / 2, cz2],
      });
    }
    // stair up from the outer side
    P.stairs(b, px + side * 1.3, 0, -0.3, side > 0 ? Math.PI : 0, 8, 0.275, 0.28, 1.2, 'concrete');
    P.railing(b, px + side * 1.3, -3.1, px + side * 1.3, 0.3, MID.platformY, 0.95);
  }

  // --- guard booths -----------------------------------------------------
  for (const side of [-1, 1]) {
    const bx = side < 0 ? -MID.wallX - t - 1.5 : MID.wallX + t + 1.5;
    const bz = side < 0 ? -5.6 : 2.2;
    b.add(box(1.7, 0.12, 2.1), 'concrete', { pos: [bx, 0.06, bz] });
    b.add(box(1.7, 2.3, 0.1), 'concrete', { pos: [bx, 1.15, bz - 1.0] });
    b.add(box(1.7, 2.3, 0.1), 'concrete', { pos: [bx, 1.15, bz + 1.0] });
    b.add(box(0.1, 2.3, 2.1), 'concrete', { pos: [bx - 0.8, 1.15, bz] });
    b.add(box(0.1, 2.3, 2.1), 'concrete', { pos: [bx + 0.8, 1.15, bz] });
    b.add(box(1.8, 0.14, 2.2), 'rustHeavy', { pos: [bx, 2.36, bz] });
    // grimy window facing the lane
    b.add(plane(1.5, 1.0), 'glass', { pos: [bx + side * 0.86, 1.5, bz], rot: [0, side * Math.PI / 2, 0], outline: false, shadow: false });
    // abandoned console and chair
    b.add(box(0.5, 0.12, 1.3), 'plasticDark', { pos: [bx + side * 0.5, 0.85, bz] });
    b.add(box(0.4, 0.5, 1.2), 'plasticDark', { pos: [bx + side * 0.62, 1.15, bz] });
    for (let i = 0; i < 3; i++) {
      b.add(plane(0.22, 0.16), 'emissiveGreen', {
        pos: [bx + side * 0.72, 1.25, bz - 0.35 + i * 0.35], rot: [0, side * Math.PI / 2, 0], outline: false, shadow: false,
      });
    }
    P.chair(b, bx + side * 0.1, 0, bz + 0.4, side * 0.7, true);
  }

  // --- low cover wall near the CT side ----------------------------------
  b.add(box(3.4, 1.0, 0.4), 'concreteDark', { pos: [-1.4, 0.5, MID.lowWallZ] });
  b.add(box(3.6, 0.12, 0.55), 'concrete', { pos: [-1.4, 1.03, MID.lowWallZ] });
  P.crateStack(b, -2.6, 0, MID.lowWallZ + 0.6, 2, 0.85, 0.2);
  P.crate(b, -1.2, 0, MID.lowWallZ + 0.7, 0.9, -0.3, 'wood');
  P.signBoard(b, 0.2, 0, MID.lowWallZ + 0.8, 0.25, 1.5, 'sign');
  b.add(box(0.7, 0.5, 0.06), 'sign', { pos: [0.2, 1.2, MID.lowWallZ + 0.82], rot: [0, 0.25, 0], outline: false });

  // --- scattered detail -------------------------------------------------
  P.drum(b, 2.6, 0, 4.2, 'drumBlue', 0.4);
  P.tire(b, 2.9, 0, 3.6, 0.2);
  P.pallet(b, -2.9, 0, -6.4, 0.35);
  P.jersey(b, 2.5, 0, -3.6, 0.2, 1.8);
  b.add(cyl(0.42, 0.42, 0.06, 14), 'steelDark', { pos: [2.2, 0.04, 1.2], outline: false });

  decal(b, 'graffitiB', -MID.wallX - t - 0.02, 1.7, -6.0, 2.0, 1.0, -Math.PI / 2);
  decal(b, 'bulletHoles', MID.wallX + t + 0.02, 1.5, 0.6, 0.9, 0.8, Math.PI / 2);
}
