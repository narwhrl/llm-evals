import { box, cyl, plane, decal } from '../kit.js';
import * as P from '../props.js';
import { SHACK } from '../config.js';

/**
 * B site: a back-street courtyard with a two storey sheet metal guard house.
 * A fire escape reaches the balcony above the bomb marking, and a tired street
 * lamp throws the corner into warm haze.
 */
export function buildBSite(b) {
  const S = SHACK;
  const cx = (S.x0 + S.x1) / 2;
  const cz = (S.z0 + S.z1) / 2;
  const w = S.x1 - S.x0;
  const d = S.z1 - S.z0;
  const t = 0.18;

  // --- ground floor -----------------------------------------------------
  b.add(box(w, S.h1, t), 'corrugated', { pos: [cx, S.h1 / 2, S.z0 + t / 2] });
  b.add(box(t, S.h1, d), 'corrugated', { pos: [S.x0 + t / 2, S.h1 / 2, cz] });
  b.add(box(t, S.h1, d), 'corrugated', { pos: [S.x1 - t / 2, S.h1 / 2, cz] });
  // south face with a window bay and an iron door
  const doorX0 = 10.5, doorX1 = 11.5;
  b.add(box(doorX0 - S.x0, S.h1, t), 'corrugated', { pos: [(S.x0 + doorX0) / 2, S.h1 / 2, S.z1 - t / 2] });
  b.add(box(S.x1 - doorX1, S.h1, t), 'corrugated', { pos: [(doorX1 + S.x1) / 2, S.h1 / 2, S.z1 - t / 2] });
  b.add(box(doorX1 - doorX0, S.h1 - 2.15, t), 'corrugated', { pos: [(doorX0 + doorX1) / 2, 2.15 + (S.h1 - 2.15) / 2, S.z1 - t / 2] });
  b.add(box(1.0, 2.1, 0.08), 'rustHeavy', { pos: [doorX0 + 0.5, 1.05, S.z1 - 0.22], rot: [0, 0.35, 0] });
  // window bay
  b.add(box(2.2, 1.1, 0.1), 'glass', { pos: [12.6, 1.7, S.z1 - 0.06], outline: false });
  b.add(box(2.4, 0.12, 0.16), 'steelDark', { pos: [12.6, 1.14, S.z1 - 0.1] });
  b.add(box(2.4, 0.12, 0.16), 'steelDark', { pos: [12.6, 2.26, S.z1 - 0.1] });
  b.add(box(0.12, 1.2, 0.16), 'steelDark', { pos: [11.5, 1.7, S.z1 - 0.1] });
  b.add(box(0.12, 1.2, 0.16), 'steelDark', { pos: [13.7, 1.7, S.z1 - 0.1] });

  // --- upper floor and balcony ------------------------------------------
  b.add(box(w, S.h2, t), 'corrugated', { pos: [cx, S.h1 + S.h2 / 2, S.z0 + t / 2] });
  b.add(box(t, S.h2, d), 'corrugated', { pos: [S.x0 + t / 2, S.h1 + S.h2 / 2, cz] });
  b.add(box(t, S.h2, d), 'corrugated', { pos: [S.x1 - t / 2, S.h1 + S.h2 / 2, cz] });
  // south balcony rail, open toward the site
  b.add(box(w, 0.12, 0.9), 'corrugated', { pos: [cx, S.h1 + 0.06, S.z1 + 0.45] });
  b.add(box(w, 0.85, 0.1), 'corrugated', { pos: [cx, S.h1 + 0.5, S.z1 + 0.88] });
  P.railing(b, S.x0, S.z1 + 0.88, S.x1, S.z1 + 0.88, S.h1 + 0.06, 0.85);
  b.add(box(w + 0.4, 0.12, d + 0.4), 'rustHeavy', { pos: [cx, S.h1 + S.h2 + 0.06, cz] });
  // lit window on the upper floor
  b.add(plane(1.2, 0.9), 'glassLit', { pos: [13.0, S.h1 + 1.2, S.z1 + 0.02], outline: false, shadow: false });

  // --- fire escape ------------------------------------------------------
  P.ladder(b, S.x0 - 0.28, 0, cz + 0.9, 3.2, Math.PI, 0.07, 'steelDark');
  b.add(box(1.2, 0.1, 1.2), 'steelDark', { pos: [S.x0 - 0.6, S.h1 + 0.05, cz + 0.9] });
  P.railing(b, S.x0 - 1.15, cz + 0.3, S.x0 - 0.05, cz + 1.5, S.h1 + 0.05, 0.9);

  // --- guard room interior ---------------------------------------------
  b.add(box(1.9, 0.08, 0.85), 'woodDark', { pos: [11.4, 0.78, -9.2] });
  for (const fx of [-0.85, 0.85]) {
    b.add(box(0.08, 0.78, 0.7), 'steelDark', { pos: [11.4 + fx, 0.39, -9.2] });
  }
  b.add(box(0.45, 0.3, 0.3), 'plasticDark', { pos: [11.0, 1.0, -9.3] });
  b.add(cyl(0.02, 0.02, 0.4, 6), 'steelDark', { pos: [10.85, 1.3, -9.3] });
  b.add(cyl(0.09, 0.09, 0.2, 10), 'steelDark', { pos: [12.1, 0.92, -9.4] });
  P.chair(b, 10.6, 0, -8.5, 0.8, true);
  // duty roster and locker
  b.add(plane(0.7, 0.95), 'cardboard', { pos: [13.3, 1.5, -10.58], rot: [0, 0, 0], outline: false, shadow: false });
  b.add(box(0.7, 1.7, 0.45), 'steel', { pos: [14.0, 0.85, -10.3] });
  b.add(box(0.72, 0.06, 0.47), 'steelDark', { pos: [14.0, 1.15, -10.3] });
  // broken fluorescent fitting
  b.add(box(1.3, 0.1, 0.22), 'plasticDark', { pos: [11.6, 2.55, -8.6], rot: [0.12, 0.05, 0] });
  b.add(box(1.1, 0.06, 0.16), 'emissiveWarm', { pos: [11.6, 2.48, -8.6], rot: [0.12, 0.05, 0], outline: false });
  // newspapers on the floor
  for (let i = 0; i < 4; i++) {
    b.add(plane(0.45, 0.34), 'cardboard', {
      pos: [12.1 + (i % 2) * 0.4, 0.02, -8.9 + i * 0.3], rot: [-Math.PI / 2, 0, i * 0.9], outline: false, shadow: false,
    });
  }

  // --- bomb site marking and cover --------------------------------------
  decal(b, 'paintWhiteB', 11.0, 0.015, -5.4, 3.0, 1.9, 0, -Math.PI / 2);
  P.pallet(b, 8.0, 0, -6.6, 0.2);
  P.pallet(b, 8.1, 0.25, -6.6, -0.1);
  P.trashBin(b, 9.6, 0, -7.2, 0.4, 'drumGreen');
  P.trashBin(b, 6.4, 0, -7.4, -0.2, 'drumGreen');
  P.bicycle(b, 12.6, 0, -8.0, 0.35);
  P.bicycle(b, 13.4, 0, -8.6, -0.6);
  P.ironTable(b, 7.4, 0, -9.6, 0.5, true);
  P.chair(b, 6.9, 0, -9.2, 1.2, true);
  P.drum(b, 6.2, 0, -10.2, 'drumRed', 0.2);
  P.crateStack(b, 14.9, 0, -9.4, 2, 0.8, 0.3);
  P.jersey(b, 10.4, 0, -8.6, 0.15, 1.8);

  // corner wall with the shortcut gap to the CT side
  b.add(box(1.8, 1.1, 0.32), 'concreteDark', { pos: [5.3, 0.55, -5.5] });
  b.add(box(0.9, 1.1, 0.32), 'concreteDark', { pos: [7.6, 0.55, -5.5] });

  // street lamp at the corner
  P.streetLamp(b, 4.9, 0, -6.2, 0, 4.4);
  b.add(cyl(0.36, 0.42, 0.2, 12), 'steelDark', { pos: [4.9, 0.1, -6.2] });

  // wall detail
  decal(b, 'graffitiA', 12.4, 1.4, S.z1 + 0.02, 1.8, 0.9);
  decal(b, 'bulletHoles2', S.x0 - 0.02, 1.6, -8.2, 0.8, 0.7, -Math.PI / 2);
  decal(b, 'graffitiC', S.x0 - 0.02, 1.2, -9.8, 1.5, 0.8, -Math.PI / 2);
  P.vent(b, 14.6, 0, -10.9, -0.2);

  // rain running down the sheet metal
  b.add(plane(1.5, 2.4), 'streak', {
    pos: [13.0, 1.7, S.z1 + 0.04], rot: [0, 0, 0], outline: false, shadow: false,
  });
  b.add(plane(1.4, 2.2), 'streak', {
    pos: [S.x0 - 0.04, 1.5, -9.4], rot: [0, -Math.PI / 2, 0], outline: false, shadow: false,
  });
}
