import { box, decal } from '../kit.js';
import * as P from '../props.js';
import { REGION } from '../config.js';

/**
 * The two flanking routes: a tight service alley down the west side that
 * links T to CT behind the warehouse, and a raised concrete walkway down the
 * east side that overlooks mid and the B courtyard.
 */
export function buildFlanks(b) {
  const A = REGION.westAlley;
  const E = REGION.eastWalk;

  // --- west alley -------------------------------------------------------
  // retaining wall along the outer edge
  b.add(box(0.4, 1.7, A.z1 - A.z0), 'concreteDark', { pos: [A.x0 + 0.2, 0.85, (A.z0 + A.z1) / 2] });
  b.add(box(0.55, 0.12, A.z1 - A.z0), 'concrete', { pos: [A.x0 + 0.27, 1.74, (A.z0 + A.z1) / 2] });

  // north corridor behind the warehouse, joining the alley to the T yard
  b.add(box(0.4, 1.7, 2.8), 'concreteDark', { pos: [A.x0 + 0.2, 0.85, -14.6] });
  // steps from the yard down into the corridor
  P.stairs(b, -7.6, 0, -14.6, -Math.PI / 2, 6, 0.2, 0.3, 1.4, 'concrete');

  P.dumpster(b, -14.9, 0, -9.4, 0.06);
  P.crateStack(b, -14.6, 0, -7.6, 3, 0.85, 0.2);
  P.pallet(b, -14.7, 0, -6.4, 0.35);
  P.pallet(b, -14.7, 0.25, -6.4, -0.1);
  P.drum(b, -14.3, 0, -4.6, 'drumGreen', 0.3);
  P.drum(b, -14.7, 0, -3.9, 'drumBlue', 0.1);
  P.tire(b, -14.4, 0, -2.4, 0.6);
  P.tire(b, -14.6, 0.16, -2.6, 0.2);
  P.trashBin(b, -14.6, 0, 0.8, 0.4, 'drumGreen');
  P.crate(b, -14.5, 0, 2.4, 0.9, -0.3, 'wood');
  P.cardboardStack(b, -14.4, 0, 4.0, 3, 0.2);
  P.jersey(b, -14.7, 0, 6.0, 0.2, 2.0);
  P.drum(b, -14.2, 0, 7.6, 'drumRed', 0.5);
  P.barrier(b, -14.4, 0, 8.6, 0.9);
  P.crateStack(b, -14.6, 0, 6.9, 2, 0.8, -0.2);
  P.pallet(b, -14.5, 0, -11.6, 0.25);
  P.trashBin(b, -14.4, 0, -13.2, 0.5, 'drumGreen');
  P.tire(b, -14.5, 0, -10.2, 0.2);
  P.drum(b, -13.9, 0, 3.2, 'drumBlue', 0.2);
  P.crate(b, -14.2, 0, -0.4, 0.85, 0.3, 'wood');

  decal(b, 'graffitiA', A.x0 + 0.42, 1.0, -6.0, 2.0, 1.0, Math.PI / 2);
  decal(b, 'bulletHoles2', A.x0 + 0.42, 0.9, 1.6, 0.8, 0.7, Math.PI / 2);
  decal(b, 'graffitiB', A.x0 + 0.42, 1.0, 5.4, 1.8, 0.9, Math.PI / 2);

  // --- east elevated walkway -------------------------------------------
  const deckLen = E.z1 - E.z0;
  b.add(box(E.x1 - E.x0, 0.26, deckLen), 'concrete', { pos: [(E.x0 + E.x1) / 2, E.y - 0.13, (E.z0 + E.z1) / 2] });
  b.add(box(0.3, 0.5, deckLen), 'concreteDark', { pos: [E.x1 - 0.15, E.y + 0.25, (E.z0 + E.z1) / 2] });
  for (let z = E.z0 + 0.8; z <= E.z1; z += 2.9) {
    b.add(box(0.4, E.y, 0.4), 'concreteDark', { pos: [E.x0 + 0.3, E.y / 2, z] });
    b.add(box(0.3, 0.3, 0.9), 'concreteDark', { pos: [E.x0 + 0.3, E.y - 0.35, z] });
  }
  P.railing(b, E.x0, E.z0, E.x0, E.z1, E.y, 1.0);

  // stairs up from the B courtyard and down to the CT side
  P.stairs(b, E.x0 + 1.4, 0, E.z0 - 0.2, 0, 8, 0.275, 0.28, 1.3, 'concrete');
  P.stairs(b, E.x0 + 1.4, 0, E.z1 + 0.2, Math.PI, 8, 0.275, 0.28, 1.3, 'concrete');
  P.railing(b, E.x0 + 0.3, E.z0 - 2.2, E.x0 + 0.3, E.z0, 0, 1.0);

  // deck clutter
  P.crate(b, E.x1 - 0.6, E.y, -4.6, 0.85, 0.2, 'wood');
  P.drum(b, E.x0 + 0.6, E.y, -1.4, 'drumBlue', 0.3);
  P.acUnit(b, E.x1 - 0.55, E.y, 2.2, Math.PI / 2);
  P.pallet(b, E.x0 + 0.7, E.y, 4.6, 0.4);
  decal(b, 'graffitiC', E.x0 + 0.02, E.y + 0.7, 0.4, 1.8, 0.9, -Math.PI / 2);

  // short cut from the B corner to the CT approach
  b.add(box(0.32, 1.1, 3.4), 'concreteDark', { pos: [7.9, 0.55, -3.6] });
  b.add(box(0.45, 0.12, 3.6), 'concrete', { pos: [7.9, 1.14, -3.6] });
}
