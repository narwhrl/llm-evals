import { box, cyl, decal } from '../kit.js';
import * as P from '../props.js';
import { REGION, T_PLATEAU_Y } from '../config.js';

/**
 * T spawn: the raised freight unloading yard in the north.
 * Barbed wire and old containers close the area in; a ramp drops from the
 * yard toward mid and A, with a breach in the ramp wall for a crouch peek.
 */
export function buildTSpawn(b) {
  const Y = T_PLATEAU_Y;
  const R = REGION.tSpawn;
  const rampX0 = -4.2, rampX1 = 2.2, rampZ0 = -11.0, rampZ1 = -8.2;

  // --- raised yard ------------------------------------------------------
  const westW = rampX0 - R.x0;
  b.add(box(westW, Y, R.z1 - R.z0), 'concrete', {
    pos: [(R.x0 + rampX0) / 2, Y / 2, (R.z0 + R.z1) / 2],
  });
  const eastW = R.x1 - rampX1;
  b.add(box(eastW, Y, R.z1 - R.z0), 'concrete', {
    pos: [(rampX1 + R.x1) / 2, Y / 2, (R.z0 + R.z1) / 2],
  });
  // rusty edge trim along the drop
  b.add(box(eastW, 0.12, 0.22), 'rustHeavy', { pos: [(rampX1 + R.x1) / 2, Y - 0.05, R.z1 - 0.11] });
  b.add(box(westW, 0.12, 0.22), 'rustHeavy', { pos: [(R.x0 + rampX0) / 2, Y - 0.05, R.z1 - 0.11] });

  // --- ramp -------------------------------------------------------------
  const dz = rampZ1 - rampZ0, dy = Y;
  const theta = Math.atan2(dy, dz);
  const slope = Math.hypot(dz, dy);
  const nx = Math.sin(theta), nz = Math.cos(theta);
  const midZ = (rampZ0 + rampZ1) / 2, midY = Y / 2;
  const rampW = rampX1 - rampX0;

  b.add(box(rampW, 0.3, slope), 'concrete', {
    pos: [(rampX0 + rampX1) / 2, midY - 0.15 * nx, midZ + 0.15 * nz],
    rot: [theta, 0, 0],
  });

  // ramp side walls, the west one broken open
  const segs = 4;
  for (const side of [-1, 1]) {
    const wx = side < 0 ? rampX0 + 0.15 : rampX1 - 0.15;
    for (let i = 0; i < segs; i++) {
      const s = (i + 0.5) * (slope / segs);
      const sy = Y - Math.sin(theta) * s;
      const sz = rampZ0 + Math.cos(theta) * s;
      const hole = side < 0 && i === 1;
      if (hole) {
        // lintel above a person-sized breach
        b.add(box(0.3, 0.45, slope / segs), 'concreteDark', {
          pos: [wx, sy + 0.92, sz], rot: [theta, 0, 0],
        });
        // broken rubble at the foot of the gap
        b.add(box(0.34, 0.22, 0.5), 'concreteDark', { pos: [wx - 0.05, sy + 0.1, sz - 0.2], rot: [0.1, 0.3, 0.2] });
        b.add(box(0.3, 0.16, 0.34), 'concreteDark', { pos: [wx + 0.06, sy + 0.08, sz + 0.18], rot: [0.2, -0.4, 0.35] });
        continue;
      }
      b.add(box(0.3, 1.15, slope / segs), 'concrete', {
        pos: [wx, sy + 0.5, sz], rot: [theta, 0, 0],
      });
    }
  }

  // --- perimeter fence --------------------------------------------------
  P.fenceMesh(b, R.x0, -15.7, R.x1, -15.7, Y, 2.4);
  P.fenceMesh(b, R.x0, -15.7, R.x0, -13.0, Y, 2.4);
  P.fenceMesh(b, R.x1, -15.7, R.x1, -12.4, Y, 2.4);
  P.barbedWire(b, R.x0, -15.7, R.x1, -15.7, Y + 2.4, 0.55);
  P.barbedWire(b, R.x0, -15.7, R.x0, -13.0, Y + 2.4, 0.55);
  P.barbedWire(b, R.x1, -15.7, R.x1, -12.4, Y + 2.4, 0.55);

  // --- box truck --------------------------------------------------------
  const tx = -4.2, tz = -14.2;
  // cargo box
  b.add(box(4.2, 2.6, 2.3), 'plasticWhite', { pos: [tx + 0.4, Y + 1.5, tz], rot: [0, 0, 0.015] });
  b.add(box(4.3, 0.12, 2.38), 'steelDark', { pos: [tx + 0.4, Y + 2.86, tz], rot: [0, 0, 0.015] });
  // cab and bonnet
  b.add(box(1.35, 1.85, 2.15), 'steelDark', { pos: [tx - 2.35, Y + 1.28, tz] });
  b.add(box(1.05, 0.85, 2.05), 'plasticWhite', { pos: [tx - 3.35, Y + 0.85, tz] });
  b.add(box(0.12, 0.7, 1.85), 'glass', { pos: [tx - 2.98, Y + 1.7, tz], outline: false });
  b.add(box(0.35, 0.45, 2.05), 'steelDark', { pos: [tx - 3.9, Y + 0.62, tz] });
  for (const sz of [-1.25, 1.25]) {
    b.add(box(0.1, 0.42, 0.16), 'steelDark', { pos: [tx - 3.05, Y + 1.95, tz + sz] });
  }
  for (const fx of [-2.2, 1.5]) {
    for (const fz of [-1.05, 1.05]) {
      b.add(cyl(0.46, 0.46, 0.32, 14), 'tire', { pos: [tx + fx, Y + 0.46, tz + fz], rot: [0, 0, Math.PI / 2] });
      b.add(cyl(0.2, 0.2, 0.34, 10), 'steel', { pos: [tx + fx, Y + 0.46, tz + fz], rot: [0, 0, Math.PI / 2] });
    }
  }
  decal(b, 'freightMark', tx + 0.4, Y + 1.9, tz + 1.17, 2.6, 1.3);
  decal(b, 'graffitiA', tx - 1.1, Y + 1.2, tz + 1.17, 1.9, 0.95);
  decal(b, 'bulletHoles', tx + 1.6, Y + 1.35, tz + 1.17, 1.1, 0.9);

  // ladder leaning on the cargo box
  P.ladder(b, tx + 0.7, Y, tz + 1.95, 3.4, Math.PI, 0.26, 'wood');

  // --- container stack --------------------------------------------------
  const cx = 3.3, cz = -14.5;
  P.container(b, cx, Y, cz, 0, 'containerRed', 4.6, 2.3, 2.4);
  P.container(b, cx, Y + 2.45, cz, 0, 'containerBlue', 4.6, 2.3, 2.4);
  P.container(b, cx, Y + 4.9, cz, 0, 'containerGrey', 4.6, 2.3, 2.4);
  decal(b, 'freightMark2', cx, Y + 1.6, cz + 1.17, 2.8, 1.4);
  decal(b, 'graffitiB', cx + 1.2, Y + 3.9, cz + 1.17, 2.2, 1.1);
  decal(b, 'graffitiC', cx - 1.4, Y + 6.1, cz + 1.17, 1.8, 0.9);

  // single container further east leaves a squeeze gap in the stack
  P.container(b, 9.0, Y, -14.5, 0, 'containerGreen', 4.0, 2.3, 2.4);
  decal(b, 'freightMark', 9.0, Y + 1.6, cz + 1.17, 2.6, 1.3);
  decal(b, 'graffitiB', 8.2, Y + 1.2, cz + 1.17, 1.9, 0.95);

  // loose container in the north-east corner, outside the yard
  P.container(b, 13.8, 0, -13.6, Math.PI / 2, 'containerBlue', 4.0, 2.3, 2.4);
  decal(b, 'freightMark2', 13.8, 1.6, -11.58, 2.6, 1.3, Math.PI / 2);

  // --- yard clutter -----------------------------------------------------
  P.drumStack(b, 2.8, Y, -11.9, 2, 2, 'drumBlue');
  P.pallet(b, 4.6, Y, -11.7, 0.2);
  P.pallet(b, 5.4, Y, -11.6, -0.35);
  P.crateStack(b, -6.3, Y, -11.6, 2, 0.85, 0.3);
  P.tire(b, -6.9, Y, -12.4, 0.4);
  P.tire(b, -6.6, Y, -12.1, 1.1);
  P.cardboardStack(b, 0.4, Y, -15.0, 2, 0.5);
  P.trashBin(b, 6.5, Y, -12.0, 0.3, 'drumGreen');
  P.jersey(b, 5.9, Y, -12.7, 0.1, 1.8);

  // ramp side clutter
  P.drum(b, -5.1, 0, -9.0, 'drumRed', 0.3);
  P.pallet(b, -5.6, 0, -8.4, 0.5);
  P.crate(b, 2.9, 0, -9.0, 0.8, 0.4, 'wood');

  // freight signage on the yard
  P.signBoard(b, 6.4, Y, -12.9, -0.4, 1.8, 'sign2');
}
