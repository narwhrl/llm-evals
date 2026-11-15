import { box, cyl, plane, decal } from '../kit.js';
import * as P from '../props.js';
import { WAREHOUSE } from '../config.js';

/**
 * A site: a half-open freight warehouse. The shutter is pulled half up, the
 * side door stands ajar, a thick column splits the floor for peeking and a
 * sheet-metal mezzanine overlooks the bomb site from the north-east corner.
 */
export function buildASite(b) {
  const W = WAREHOUSE;
  const cx = (W.x0 + W.x1) / 2;
  const cz = (W.z0 + W.z1) / 2;
  const w = W.x1 - W.x0;
  const d = W.z1 - W.z0;
  const t = 0.34;

  // --- shell ------------------------------------------------------------
  // north wall, split around the half-open back door
  const doorX0 = -12.4, doorX1 = -11.4;
  b.add(box(doorX0 - W.x0, W.h, t), 'concrete', { pos: [(W.x0 + doorX0) / 2, W.h / 2, W.z0 + t / 2] });
  b.add(box(W.x1 - doorX1, W.h, t), 'concrete', { pos: [(doorX1 + W.x1) / 2, W.h / 2, W.z0 + t / 2] });
  b.add(box(doorX1 - doorX0, W.h - 2.2, t), 'concrete', { pos: [(doorX0 + doorX1) / 2, 2.2 + (W.h - 2.2) / 2, W.z0 + t / 2] });
  // back door leaf, half shut
  b.add(box(1.0, 2.15, 0.08), 'rustHeavy', { pos: [doorX0 + 0.5, 1.08, W.z0 + 0.24], rot: [0, 0.55, 0] });
  // red glow behind the door
  b.add(plane(1.0, 2.1), 'emissiveRed', { pos: [doorX0 + 0.5, 1.05, W.z0 + 0.1], rot: [0, Math.PI, 0], outline: false, shadow: false });

  // west wall
  b.add(box(t, W.h, d), 'concrete', { pos: [W.x0 + t / 2, W.h / 2, cz] });

  // east wall with an inward opening side door
  const sideDoorZ0 = -8.6, sideDoorZ1 = -7.6;
  b.add(box(t, W.h, sideDoorZ0 - W.z0), 'concrete', { pos: [W.x1 - t / 2, W.h / 2, (W.z0 + sideDoorZ0) / 2] });
  b.add(box(t, W.h, W.z1 - sideDoorZ1), 'concrete', { pos: [W.x1 - t / 2, W.h / 2, (sideDoorZ1 + W.z1) / 2] });
  b.add(box(t, W.h - 2.25, sideDoorZ1 - sideDoorZ0), 'concrete', { pos: [W.x1 - t / 2, 2.25 + (W.h - 2.25) / 2, (sideDoorZ0 + sideDoorZ1) / 2] });
  // door leaf swung inward
  b.add(box(0.09, 2.2, 1.0), 'woodDark', { pos: [W.x1 - 0.75, 1.1, sideDoorZ0 + 0.5], rot: [0, 1.15, 0] });
  b.add(box(0.12, 0.12, 1.0), 'steelDark', { pos: [W.x1 - 0.3, 2.05, sideDoorZ0 + 0.5], rot: [0, 1.15, 0] });

  // front bay: two piers, a lintel and a half rolled shutter
  const openX0 = -12.4, openX1 = -8.4;
  b.add(box(openX0 - W.x0, W.h, t), 'concrete', { pos: [(W.x0 + openX0) / 2, W.h / 2, W.z1 - t / 2] });
  b.add(box(W.x1 - openX1, W.h, t), 'concrete', { pos: [(openX1 + W.x1) / 2, W.h / 2, W.z1 - t / 2] });
  b.add(box(openX1 - openX0, W.h - W.shutterY, t), 'concrete', { pos: [(openX0 + openX1) / 2, W.shutterY + (W.h - W.shutterY) / 2, W.z1 - t / 2] });
  // shutter curtain, half rolled
  const curtainH = 1.35;
  b.add(box(openX1 - openX0, curtainH, 0.1), 'shutter', { pos: [(openX0 + openX1) / 2, W.shutterY - curtainH / 2, W.z1 - 0.16] });
  b.add(cyl(0.26, 0.26, openX1 - openX0, 12), 'rustHeavy', { pos: [(openX0 + openX1) / 2, W.shutterY + 0.12, W.z1 - 0.16], rot: [0, 0, Math.PI / 2] });

  // roof
  b.add(box(w + 0.5, 0.22, d + 0.5), 'rustHeavy', { pos: [cx, W.h + 0.11, cz] });
  for (let i = 0; i < 3; i++) {
    b.add(box(0.5, 0.22, 0.5), 'steelDark', { pos: [W.x0 + 1.2 + i * 2.0, W.h + 0.3, cz + 1.6] });
  }

  // --- windows ----------------------------------------------------------
  for (const wz of [-11.4, -9.4]) {
    b.add(box(0.12, 1.0, 1.2), 'plasticDark', { pos: [W.x1 - 0.12, 2.6, wz] });
    for (let i = 0; i < 4; i++) {
      b.add(box(0.1, 0.2, 1.25), 'woodPale', {
        pos: [W.x1 + 0.02, 2.2 + i * 0.26, wz], rot: [0, 0, (i % 2 ? 0.06 : -0.05)],
      });
    }
  }

  // --- interior ---------------------------------------------------------
  // cold emergency strip light under the roof
  b.add(box(1.6, 0.12, 0.34), 'steelDark', { pos: [-10.4, 4.1, -9.6] });
  b.add(box(1.4, 0.07, 0.26), 'emissiveCold', { pos: [-10.4, 4.02, -9.6], outline: false });
  b.add(cyl(0.03, 0.03, 0.35, 6), 'steelDark', { pos: [-10.9, 4.28, -9.6] });
  b.add(cyl(0.03, 0.03, 0.35, 6), 'steelDark', { pos: [-9.9, 4.28, -9.6] });

  // thick support column
  b.add(box(0.72, W.h, 0.72), 'concreteDark', { pos: [W.colX, W.h / 2, W.colZ] });
  b.add(box(0.9, 0.2, 0.9), 'concreteDark', { pos: [W.colX, W.h - 0.1, W.colZ] });

  // heavy shelving against the west wall
  P.shelf(b, W.x0 + 0.75, 0, -10.6, Math.PI / 2, 3.2, 0.9, 2.7, 5);
  P.shelf(b, W.x0 + 0.75, 0, -7.9, Math.PI / 2, 2.2, 0.9, 2.4, 4);

  // stacked crates and sandbags
  P.crateStack(b, -9.4, 0, -8.2, 3, 0.95, 0.15);
  P.crateStack(b, -8.5, 0, -7.4, 2, 0.8, -0.4);
  P.sandbags(b, -12.2, 0, -7.9, 3, 4, 0.2);
  P.crate(b, -11.9, 0, -7.2, 0.9, 0.5, 'wood');
  P.pallet(b, -8.9, 0, -11.9, 0.25);
  P.cardboardStack(b, -12.5, 0, -6.9, 2, 0.3);

  // manual forklift
  P.forklift(b, -9.3, 0, -9.9, Math.PI * 0.85);

  // sorting table and broken express boxes
  P.ironTable(b, -12.4, 0, -12.2, 0.3, false);
  P.cardboardStack(b, -11.6, 0.74, -12.3, 2, 0.6);
  b.add(box(1.6, 0.04, 0.12), 'plasticDark', { pos: [-10.4, 0.03, -12.6], rot: [0, 0.4, 0] });
  b.add(box(0.9, 0.03, 0.1), 'plasticDark', { pos: [-8.6, 0.03, -12.1], rot: [0, -0.8, 0] });
  for (let i = 0; i < 5; i++) {
    b.add(plane(0.5, 0.38), 'cardboard', {
      pos: [-11.2 + (i % 3) * 0.35, 0.02 + i * 0.004, -7.1 + i * 0.28], rot: [-Math.PI / 2, 0, i * 0.6],
      outline: false, shadow: false,
    });
  }

  // --- mezzanine --------------------------------------------------------
  const M = W.mezz;
  b.add(box(M.x1 - M.x0, 0.16, M.z1 - M.z0), 'rustHeavy', {
    pos: [(M.x0 + M.x1) / 2, M.y, (M.z0 + M.z1) / 2],
  });
  // parapet with a viewing slot toward the bomb site
  b.add(box(M.x1 - M.x0, 0.95, 0.12), 'corrugated', { pos: [(M.x0 + M.x1) / 2, M.y + 0.55, M.z1 - 0.06] });
  b.add(box(0.12, 0.95, M.z1 - M.z0), 'corrugated', { pos: [M.x0 + 0.06, M.y + 0.55, (M.z0 + M.z1) / 2] });
  b.add(box(0.12, 0.95, M.z1 - M.z0), 'corrugated', { pos: [M.x1 - 0.06, M.y + 0.55, (M.z0 + M.z1) / 2] });
  // small window facing the site
  b.add(plane(1.1, 0.55), 'glassLit', { pos: [(M.x0 + M.x1) / 2, M.y + 0.62, M.z1 + 0.02], rot: [0, 0, 0], outline: false, shadow: false });
  b.add(box(1.2, 0.1, 0.1), 'steelDark', { pos: [(M.x0 + M.x1) / 2, M.y + 0.34, M.z1 + 0.02] });
  // vertical iron ladder
  P.ladder(b, M.x1 - 0.35, 0, M.z1 - 0.55, 2.9, 0, 0.06, 'steelDark');
  // roof over the mezzanine
  b.add(box(M.x1 - M.x0 + 0.3, 0.12, M.z1 - M.z0 + 0.3), 'rustHeavy', {
    pos: [(M.x0 + M.x1) / 2, M.y + 1.1, (M.z0 + M.z1) / 2],
  });

  // --- exterior ---------------------------------------------------------
  P.acUnit(b, W.x1 + 0.6, 0, -10.4, 0);
  P.acUnit(b, W.x1 + 0.6, 0, -9.4, 0);
  P.trashBin(b, W.x1 + 0.65, 0, -7.4, 0.2, 'drumGreen');
  P.trashBin(b, W.x1 + 0.65, 0, -6.9, -0.3, 'drumGreen');
  P.signBoard(b, W.x1 + 0.7, 0, -11.8, -Math.PI / 2, 1.9, 'sign');
  P.crate(b, W.x1 + 0.7, 0, -6.3, 0.8, 0.3, 'cardboard');

  // bomb site marking on the warehouse floor
  decal(b, 'paintWhite', -10.6, 0.015, -7.6, 3.4, 2.1, 0, -Math.PI / 2);
  decal(b, 'bulletHoles', W.x1 + 0.02, 1.9, -8.1, 0.9, 0.8, Math.PI / 2);
  decal(b, 'graffitiC', W.x0 - 0.02, 1.6, -9.0, 2.0, 1.0, -Math.PI / 2);
  decal(b, 'graffitiA', -11.0, 2.9, W.z1 + 0.02, 2.2, 1.1);

  // rain running down the walls
  b.add(plane(2.4, 3.4), 'streak', {
    pos: [W.x1 + 0.04, 2.1, -9.8], rot: [0, Math.PI / 2, 0], outline: false, shadow: false,
  });
  b.add(plane(1.8, 2.6), 'streak', {
    pos: [W.x1 + 0.04, 1.6, -11.8], rot: [0, Math.PI / 2, 0], outline: false, shadow: false,
  });
  b.add(plane(2.6, 3.6), 'streak', {
    pos: [-9.6, 2.0, W.z1 + 0.05], rot: [0, 0, 0], outline: false, shadow: false,
  });
  b.add(plane(1.6, 2.8), 'streak', {
    pos: [W.x0 - 0.04, 1.8, -8.6], rot: [0, -Math.PI / 2, 0], outline: false, shadow: false,
  });
}
