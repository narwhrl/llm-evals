import * as THREE from 'three';
import { box, groundPlane } from '../core/geom.js';
import { BASE, MID } from './layout.js';
import { drainGrate } from './props.js';

/**
 * The plinth, the yard surface and the mid-lane drainage channel.
 *
 * Everything in the scene sits on one square concrete base. The asphalt is
 * laid as four slabs so the drain channel can be a genuine recess rather than
 * a stripe painted on top, which is what lets the standing water read as
 * sitting *in* the ground.
 */
export function buildBase(b, vents) {
  const { slabSize, slabHeight, plinthSize, plinthHeight, fieldHalf, groundY } = BASE;
  const half = slabSize / 2;

  // --- plinth ---------------------------------------------------------
  b.add(
    box(slabSize, slabHeight, slabSize, 0.42),
    'concrete',
    { position: [0, -slabHeight / 2, 0] },
  );
  // Display plinth under the slab, slightly proud on every side.
  b.add(
    box(plinthSize, plinthHeight, plinthSize, 0.6),
    'concreteDark',
    { position: [0, -slabHeight - plinthHeight / 2, 0] },
  );

  // --- yard surface ---------------------------------------------------
  const gapX0 = MID.drainX0;
  const gapX1 = MID.drainX1;
  const gapZ0 = MID.drainZ0;
  const gapZ1 = MID.drainZ1;

  const slab = (x0, x1, z0, z1) => {
    const w = x1 - x0;
    const d = z1 - z0;
    b.add(groundPlane(w, d, 0.34), 'asphalt', {
      position: [(x0 + x1) / 2, groundY, (z0 + z1) / 2],
      outline: false,
    });
  };

  slab(-fieldHalf, gapX0, -fieldHalf, fieldHalf);
  slab(gapX1, fieldHalf, -fieldHalf, fieldHalf);
  slab(gapX0, gapX1, -fieldHalf, gapZ0);
  slab(gapX0, gapX1, gapZ1, fieldHalf);

  // Old concrete pours breaking up the asphalt.
  const patches = [
    [-13.2, 8.4, 5.6, 4.2, 0.1],
    [7.4, 10.6, 4.8, 3.4, -0.06],
    [-2.6, -16.2, 3.0, 2.6, 0.2],
    [14.6, 3.2, 4.2, 5.0, 0.04],
    [-16.4, -8.2, 2.4, 6.0, -0.15],
    [3.2, 15.4, 3.2, 2.8, 0.12],
  ];
  for (const [x, z, w, d, rot] of patches) {
    b.add(groundPlane(w, d, 0.4), 'concretePatch', {
      position: [x, groundY + 0.012, z],
      rotation: [0, rot, 0],
      outline: false,
    });
  }

  // --- drainage channel ----------------------------------------------
  const depth = MID.drainDepth;
  const floorY = groundY - depth;
  const channelLength = gapZ1 - gapZ0;
  const midZ = (gapZ0 + gapZ1) / 2;

  b.add(box(gapX1 - gapX0, 0.1, channelLength, 0.7), 'concreteDark', {
    position: [0, floorY - 0.05, midZ],
    outline: false,
  });
  for (const side of [-1, 1]) {
    b.add(box(0.16, depth + 0.1, channelLength, 0.8), 'concreteDark', {
      position: [side * (gapX1 + 0.04), floorY + (depth + 0.1) / 2, midZ],
      outline: false,
    });
  }

  // Rusted grate over the middle of the run, open water at both ends.
  drainGrate(b, 0, groundY + 0.02, midZ, gapX1 - gapX0 - 0.1, channelLength - 3.0);

  // --- sewer mouths ---------------------------------------------------
  // Low passage under the yard: one mouth under the T ramp, one at the CT
  // flank. Both read as dark recesses framed in stained concrete.
  sewerMouth(b, 0, -11.15, 1.85, 1.15, Math.PI);
  sewerMouth(b, -5.6, 13.5, 1.7, 1.1, -Math.PI / 2);

  // --- scattered debris ----------------------------------------------
  vents.push(ventAt(-9.6, -16.2, 0.5));
  vents.push(ventAt(12.8, 5.6, 0.45));

  return half;
}

function sewerMouth(b, x, z, width, height, rotY) {
  const depth = 2.6;
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  // Recessed dark box so the opening reads as depth, not a painted arch.
  b.add(box(width, height, depth, 1.0), 'concreteDark', {
    position: [x - sin * depth * 0.5, height / 2, z + cos * depth * 0.5],
    rotation: [0, rotY, 0],
    outline: false,
  });
  b.add(box(width - 0.1, height - 0.1, 0.2, 1.2), 'rubber', {
    position: [x - sin * (depth - 0.3), height / 2, z + cos * (depth - 0.3)],
    rotation: [0, rotY, 0],
    outline: false,
  });
  // Concrete surround.
  for (const side of [-1, 1]) {
    b.add(box(0.34, height + 0.5, 0.5, 1.0), 'concrete', {
      position: [x + cos * side * (width / 2 + 0.17), (height + 0.5) / 2, z + sin * side * (width / 2 + 0.17)],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
  b.add(box(width + 1.0, 0.42, 0.5, 1.0), 'concrete', {
    position: [x, height + 0.21, z],
    rotation: [0, rotY, 0],
  });
}

function ventAt(x, z, y) {
  return new THREE.Vector3(x, y, z);
}
