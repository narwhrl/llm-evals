import * as THREE from 'three';
import { box, cylinder, wire } from '../core/geom.js';
import { ALLEY, BASE, FLANK } from './layout.js';
import { decalWall } from './decals.js';
import { crateStack, dumpster, pallet, powerPole, railing, sackPile, tireStack } from './props.js';

/**
 * The two flanking routes and the overhead wiring.
 *
 * The west alley is a quiet ground-level back line from A down toward CT; the
 * east flank is a raised walkway that starts at the B balcony and overlooks
 * the whole east side. Together with mid they are the three ways across the
 * map, and the height difference between them is what gives the layout its
 * vertical rhythm.
 */
export function buildRoutes(b, anchors) {
  buildAlley(b);
  buildFlank(b);
  buildWires(b, anchors);
}

/* ------------------------------ west alley ------------------------------ */

function buildAlley(b) {
  const { x0, x1, z0, z1 } = ALLEY;

  // Low retaining wall with breaks, so the alley reads as a route rather than
  // as a trench you cannot see into.
  const runs = [[-14.6, -7.4], [-5.0, 2.2], [4.6, 12.6]];
  for (const [a, c] of runs) {
    b.add(box(0.5, 1.85, c - a, 0.6), 'concrete', {
      position: [x1 + 0.25, 0.92, (a + c) / 2],
    });
    b.add(box(0.66, 0.13, c - a + 0.1, 1.1), 'concreteDark', {
      position: [x1 + 0.25, 1.91, (a + c) / 2],
      outline: false,
    });
  }

  // Rubbish and pallets break the sightline so the alley is not a clean lane.
  dumpster(b, x0 + 0.85, 0.04, -12.2, 0.1, 'containerGreen', false);
  dumpster(b, x0 + 0.85, 0.04, -10.4, -0.15, 'corrugatedDark', true);
  crateStack(b, x0 + 0.9, 0.04, -6.2, 3, 0.88, 0.2);
  tireStack(b, x0 + 1.0, 0.04, 1.4, 4, 0.4);
  pallet(b, x0 + 0.8, 0.04, 4.6, 0.15);
  pallet(b, x0 + 0.85, 0.16, 4.5, 0.5);
  sackPile(b, x0 + 1.1, 0.04, 8.4, 6, -0.2);
  crateStack(b, x0 + 0.9, 0.04, 11.2, 2, 0.9, -0.4);

  decalWall(b, 'decalGraffitiThree', x1 + 0.02, 1.3, -8.0, 3.0, 1.2, Math.PI / 2);
  decalWall(b, 'decalBulletHoles', x1 + 0.02, 1.2, 3.2, 1.8, 1.8, Math.PI / 2);
  decalWall(b, 'decalWarningThree', x1 + 0.02, 1.8, 9.6, 1.8, 0.8, Math.PI / 2);
}

/* ------------------------------ east flank ------------------------------ */

function buildFlank(b) {
  const { x0, x1, z0, z1, deckY } = FLANK;

  // Support piers, then the deck slab.
  const piers = 7;
  for (let i = 0; i < piers; i += 1) {
    const z = z0 + ((z1 - z0) * i) / (piers - 1);
    b.add(box(0.55, deckY, 0.55, 0.8), 'concrete', {
      position: [x0 + 0.5, deckY / 2, z],
      outline: i % 2 === 0,
    });
  }
  b.add(box(x1 - x0, 0.28, z1 - z0, 0.55), 'concrete', {
    position: [(x0 + x1) / 2, deckY, (z0 + z1) / 2],
  });
  b.add(box(x1 - x0 + 0.24, 0.12, z1 - z0, 0.8), 'concreteDark', {
    position: [(x0 + x1) / 2, deckY + 0.2, (z0 + z1) / 2],
    outline: false,
  });

  // Inner railing; the outer side is the diorama edge.
  railing(
    b,
    [
      [x0, z0],
      [x0, z1],
    ],
    deckY + 0.14,
    1.05,
  );

  // Stair down to the CT-side yard, closing the loop between the two flanks.
  const steps = 8;
  for (let i = 0; i < steps; i += 1) {
    const z = z1 - (i * 0.5);
    const h = deckY * (1 - i / steps);
    b.add(box(1.9, h, 0.52, 0.7), 'concrete', {
      position: [x0 + 1.0, h / 2, z],
      outline: i === 0,
    });
  }

  crateStack(b, x0 + 1.4, deckY + 0.14, z0 + 2.2, 2, 0.82, 0.3);
  tireStack(b, x0 + 1.6, deckY + 0.14, z1 - 3.4, 3, 0.7);
  pallet(b, x0 + 1.5, deckY + 0.14, z0 + 5.0, 0.2);
}

/* ------------------------------ wiring ------------------------------ */

/**
 * Power poles and the sagging cables between them, run right across the yard
 * so the overhead layer reads from every orbit angle.
 */
function buildWires(b, anchors) {
  const groundY = BASE.groundY;
  const runs = [
    // [x, z, rotation]
    [-19.4, -6.0, 0.0],
    [-19.4, 8.5, 0.0],
    [12.0, -18.6, 0.0],
    [19.6, 6.0, 0.0],
    [-4.0, 19.4, Math.PI / 2],
  ];

  const heads = runs.map(([x, z, rotY]) => powerPole(b, x, groundY, z, 6.4, rotY));

  // Cables strung between neighbouring poles and across the map.
  const link = (a, c, count = 3, sag = 0.55) => {
    const [pa, pc] = [heads[a], heads[c]];
    const offsetX = Math.cos(pa.rotY);
    const offsetZ = -Math.sin(pa.rotY);
    for (let i = 0; i < count; i += 1) {
      const lane = (i - (count - 1) / 2) * 0.42;
      const from = new THREE.Vector3(
        pa.top.x + offsetX * lane,
        pa.top.y + 0.16,
        pa.top.z + offsetZ * lane,
      );
      const to = new THREE.Vector3(
        pc.top.x + Math.cos(pc.rotY) * lane,
        pc.top.y + 0.16,
        pc.top.z - Math.sin(pc.rotY) * lane,
      );
      b.add(wire(from, to, sag, 0.017, 12), 'wire');
    }
  };

  link(0, 1);
  link(2, 3, 3, 0.7);
  link(4, 1, 2, 0.9);
  link(0, 2, 2, 1.2);

  anchors.poleCount = runs.length;
}

/** Wall-mounted conduit run, used to break up long blank walls. */
export function conduit(b, x, y, z, length, rotY) {
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  b.add(cylinder(0.07, 0.07, length, 8, 1.0), 'metalDark', {
    position: [x, y, z],
    rotation: [Math.PI / 2, rotY, 0],
    outline: false,
  });
  const clamps = Math.max(2, Math.round(length / 2.2));
  for (let i = 0; i < clamps; i += 1) {
    const t = i / (clamps - 1) - 0.5;
    b.add(box(0.16, 0.14, 0.1, 1.4), 'metalDark', {
      position: [x + sin * t * length, y, z + cos * t * length],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
}
