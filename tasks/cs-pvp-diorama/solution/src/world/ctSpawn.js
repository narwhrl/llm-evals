import * as THREE from 'three';
import { box, cyl, decal } from '../kit.js';
import * as P from '../props.js';
import { REGION } from '../config.js';

/**
 * CT spawn: the police cordon in the south. Barricades and shields hold the
 * line, a van idles with its light bar turning, and a concrete platform with
 * a searchlight overlooks the mouth of mid.
 */
export function buildCTSpawn(b) {
  const R = REGION.ctSpawn;

  // --- back wall with police signage -----------------------------------
  b.add(box(R.x1 - R.x0, 3.3, 0.35), 'concrete', { pos: [0, 1.65, R.z1 - 0.18] });
  b.add(box(0.35, 3.3, 4.0), 'concrete', { pos: [R.x0 + 0.17, 1.65, R.z1 - 2.2] });
  b.add(box(0.35, 3.3, 4.0), 'concrete', { pos: [R.x1 - 0.17, 1.65, R.z1 - 2.2] });
  b.add(box(R.x1 - R.x0 + 0.3, 0.18, 0.5), 'concreteDark', { pos: [0, 3.38, R.z1 - 0.2] });
  decal(b, 'badge', 0, 2.0, R.z1 - 0.37, 2.6, 1.3);
  decal(b, 'graffitiB', -4.6, 1.6, R.z1 - 0.37, 1.8, 0.9);
  decal(b, 'bulletHoles', 4.4, 1.5, R.z1 - 0.37, 0.9, 0.8);

  // --- defensive line ---------------------------------------------------
  for (const bx of [-6.2, -4.4, -2.6, 2.6, 4.4, 6.2]) {
    P.barrier(b, bx, 0, R.z0 + 0.2, 0);
  }
  P.barrier(b, -1.4, 0, R.z0 + 0.25, 0.2);
  P.policeShield(b, -2.1, 0, R.z0 - 0.1, 0.1);
  P.policeShield(b, 0.9, 0, R.z0 - 0.15, -0.15);
  P.policeShield(b, 2.0, 0, R.z0 + 0.05, 0.05);
  P.jersey(b, 5.4, 0, R.z0 - 0.4, 0.1, 2.0);
  P.drum(b, -7.0, 0, R.z0 + 1.2, 'drumBlue', 0.3);

  // --- police van -------------------------------------------------------
  P.policeVan(b, -4.4, 0, 13.6, 0);
  decal(b, 'badge', -4.4, 1.9, 14.59, 1.6, 0.8);

  // --- concrete platform with the searchlight ---------------------------
  b.add(box(3.8, 2.0, 3.6), 'concrete', { pos: [5.3, 1.0, 13.0] });
  b.add(box(4.0, 0.16, 3.8), 'concreteDark', { pos: [5.3, 2.06, 13.0] });
  P.stairs(b, 3.2, 0, 13.0, Math.PI, 8, 0.25, 0.3, 1.3, 'concrete');
  P.railing(b, 3.45, 11.3, 3.45, 14.7, 2.14, 0.9);
  P.railing(b, 3.45, 11.3, 7.1, 11.3, 2.14, 0.9);
  P.floodlight(b, 5.6, 2.14, 12.4, Math.PI);
  b.add(cyl(0.4, 0.46, 0.2, 12), 'steelDark', { pos: [5.6, 2.24, 12.4] });

  // --- kit crates along the back wall -----------------------------------
  P.crate(b, -6.4, 0, 15.0, 0.95, 0.1, 'plasticDark');
  b.add(box(0.42, 0.3, 0.28), 'plasticDark', { pos: [-6.4, 1.09, 15.0], rot: [0, 0.3, 0] });
  b.add(sphereLocal(0.17, [0, 0, 0]), 'plasticDark', { pos: [-6.1, 1.06, 14.8] });
  P.crate(b, -5.4, 0, 15.05, 0.85, -0.2, 'plasticDark');
  b.add(box(0.4, 0.28, 0.26), 'plasticDark', { pos: [-5.4, 1.02, 15.05], rot: [0, -0.4, 0] });
  b.add(sphereLocal(0.16, [0, 0, 0]), 'plasticDark', { pos: [-5.0, 1.0, 14.9] });
  P.crate(b, 1.6, 0, 15.05, 0.9, 0.25, 'wood');
  P.crateStack(b, -1.8, 0, 15.0, 2, 0.8, 0.1);

  // --- spawn clutter ----------------------------------------------------
  P.trashBin(b, 7.0, 0, 10.6, 0.3, 'drumGreen');
  P.tire(b, -7.0, 0, 11.6, 0.5);
  P.pallet(b, 2.2, 0, 11.4, 0.2);
  P.signBoard(b, -0.2, 0, 10.1, 0.1, 1.7, 'sign2');
  P.jersey(b, -6.6, 0, 12.2, 0.15, 2.0);
  P.jersey(b, -6.6, 0, 14.3, 0.1, 2.0);
  P.crateStack(b, -6.9, 0, 10.4, 2, 0.85, 0.25);
  P.drum(b, 6.9, 0, 13.4, 'drumBlue', 0.4);
  P.drum(b, 6.4, 0, 13.9, 'drumGreen', 0.1);
  P.pallet(b, -2.6, 0, 14.6, 0.3);
  P.pallet(b, -2.2, 0.25, 14.5, -0.15);
  P.crate(b, 1.0, 0, 14.4, 0.9, 0.4, 'wood');
  P.cardboardStack(b, -7.2, 0, 15.0, 2, 0.1);
  P.barrier(b, 3.0, 0, 14.6, 0.35);
  P.trashBin(b, -3.4, 0, 11.0, -0.3, 'drumGreen');
}

// small helper: helmet sized blob for the kit crates
function sphereLocal(r, scale) {
  const geo = new THREE.SphereGeometry(r, 10, 6);
  geo.scale(scale[0] || 1, scale[1] || 1, scale[2] || 1);
  return geo;
}
