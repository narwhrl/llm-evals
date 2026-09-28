import * as THREE from 'three';
import { box } from '../core/geom.js';
import { T_SPAWN } from './layout.js';
import { decalGround, decalWall } from './decals.js';
import {
  barrelRack,
  crateStack,
  fenceRun,
  ladder,
  pallet,
  shippingContainer,
  tireStack,
} from './props.js';
import { boxTruck } from './vehicles.js';

/**
 * T spawn — the loading end of the freight yard.
 *
 * A raised terrace fenced off with barbed wire, a dead box truck on one side
 * and a stepped container stack on the other, so the terrace has two distinct
 * overwatch heights. The only way off it is the ramp, which funnels attackers
 * exactly where a defusal map wants them funnelled.
 */
export function buildTSpawn(b, anchors, practicals) {
  const { x0, x1, z0, z1, floorY, rampZ0, rampZ1, rampX0, rampX1 } = T_SPAWN;

  // --- terrace --------------------------------------------------------
  b.add(box(x1 - x0, floorY, z1 - z0, 0.5), 'concrete', {
    position: [(x0 + x1) / 2, floorY / 2, (z0 + z1) / 2],
  });

  // --- ramp down to the yard -----------------------------------------
  const rampRun = rampZ1 - rampZ0;
  const steps = 7;
  for (let i = 0; i < steps; i += 1) {
    const t = i / steps;
    const z = rampZ0 + rampRun * t;
    const h = floorY * (1 - t) + 0.04 * t;
    b.add(box(rampX1 - rampX0, h, rampRun / steps + 0.02, 0.6), 'concrete', {
      position: [0, h / 2, z + rampRun / steps / 2],
      outline: i === 0,
    });
  }

  // Retaining walls either side of the ramp. The west one is broken open to
  // give a crouched peek straight down the lane.
  for (const side of [-1, 1]) {
    const segments = side < 0 ? 2 : 3;
    for (let s = 0; s < segments; s += 1) {
      const x = side * (rampX1 + 0.3);
      const startZ = rampZ0 + (rampRun * s) / segments;
      const segLen = rampRun / segments;
      const h = floorY * (1 - s / segments) + 0.55;
      b.add(box(0.55, h + 0.5, segLen, 0.7), 'concrete', {
        position: [x, (h + 0.5) / 2, startZ + segLen / 2],
        outline: s === 0 || s === segments - 1,
      });
    }
  }
  // Sill of the breach: low enough to crouch behind, high enough to cover.
  b.add(box(0.6, 0.62, 1.6, 1.1), 'concreteDark', {
    position: [-(rampX1 + 0.3), floorY * 0.48, rampZ0 + rampRun * 0.55],
    outline: false,
  });

  // --- perimeter ------------------------------------------------------
  fenceRun(b, x0, z1, x0, z0, floorY, 2.5, 5);
  fenceRun(b, x1, z1, x1, z0, floorY, 2.5, 5);
  b.add(box(x1 - x0, 2.9, 0.55, 0.55), 'concrete', {
    position: [0, floorY + 1.45, z0 + 0.28],
  });
  fenceRun(b, x0, z0 + 0.55, x1, z0 + 0.55, floorY + 2.9, 0.95, 7);

  // --- box truck, west -------------------------------------------------
  boxTruck(b, -7.4, floorY, -17.3, 0.07);

  // Ladder leaning against the trailer.
  ladder(b, -4.0, floorY, -18.1, 2.85, 0.55, 'wood');
  b.add(box(0.11, 0.11, 0.95, 1.4), 'wood', {
    position: [-4.28, floorY + 1.45, -17.75],
    rotation: [0.48, 0.55, 0],
    outline: false,
  });

  // --- container stack, east ------------------------------------------
  // Two-high here, one-high beside it: the slot between is walkable and the
  // two tops are the terrace's low and high sniping positions.
  shippingContainer(b, 6.9, floorY, -17.5, Math.PI / 2, 'containerGreen');
  shippingContainer(b, 6.9, floorY + 2.5, -17.5, Math.PI / 2, 'containerGreen');
  shippingContainer(b, 10.1, floorY, -17.5, Math.PI / 2, 'containerBlue');

  crateStack(b, 4.6, floorY, -19.1, 2, 0.88, 0.2);
  tireStack(b, 10.4, floorY, -13.6, 3, 0.4);

  // --- ramp dressing ---------------------------------------------------
  barrelRack(b, -6.4, floorY, rampZ0 - 1.6, 0.15);
  pallet(b, -5.2, 0.04, -12.7, 0.2);
  pallet(b, -5.05, 0.16, -12.55, 0.62);
  pallet(b, 5.5, 0.04, -13.0, -0.25);
  crateStack(b, 6.0, 0.04, -12.3, 2, 0.84, 0.5);
  barrelRack(b, 2.3, 0.04, -13.7, -0.3);

  // --- paint -----------------------------------------------------------
  decalGround(b, 'decalSprayT', 0, floorY + 0.03, z0 + 0.95, 5.0, 0);
  decalWall(b, 'decalWarningThree', -7.0, floorY + 1.9, z0 + 0.56, 2.6, 1.1, 0);
  decalWall(b, 'decalGraffitiTwo', 3.4, floorY + 1.5, z0 + 0.56, 4.2, 1.7, 0);
  decalWall(b, 'decalBulletHoles', -1.6, floorY + 1.2, z0 + 0.56, 1.8, 1.8, 0);

  // --- drip emitters ---------------------------------------------------
  anchors.drips.push({ position: new THREE.Vector3(6.9, floorY + 5.05, -14.9), spread: 0.4, rate: 0.4 });
  anchors.drips.push({ position: new THREE.Vector3(10.1, floorY + 2.55, -14.9), spread: 0.4, rate: 0.4 });
  anchors.drips.push({ position: new THREE.Vector3(-7.4, floorY + 2.9, -15.6), spread: 0.9, rate: 0.35 });
  anchors.drips.push({ position: new THREE.Vector3(0, floorY + 2.9, z0 + 0.6), spread: 5.0, rate: 0.25 });

  // --- loading-dock wall pack -----------------------------------------
  // A cold bulkhead over the ramp head, so the terrace is not a dead zone.
  b.add(box(0.62, 0.3, 0.34, 1.4), 'metalDark', {
    position: [-(rampX1 + 0.3), floorY + 2.3, rampZ0 + 0.5],
    outline: false,
  });
  b.add(box(0.5, 0.2, 0.1, 1.6), 'lampCold', {
    position: [-(rampX1 + 0.12), floorY + 2.24, rampZ0 + 0.5],
    outline: false,
  });
  practicals.push({
    position: [-(rampX1 + 0.6), floorY + 2.2, rampZ0 + 0.5],
    color: 0xcfe4ff,
    intensity: 6.5,
    distance: 11,
    kind: 'warehouse',
  });
}
