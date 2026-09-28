import * as THREE from 'three';
import { box, cylinder } from '../core/geom.js';
import { CT_SPAWN } from './layout.js';
import { decalGround, decalWall } from './decals.js';
import {
  crateStack,
  jerseyBarrier,
  railing,
  sackPile,
  stairs,
} from './props.js';
import { policeVan } from './vehicles.js';

/**
 * CT spawn — the police cordon at the south end.
 *
 * Barricades and shields facing the yard, a police van on one flank and a
 * concrete observation platform with a searchlight on the other. The platform
 * is the reason the CT side has an angle on the mid gate that the attackers
 * cannot return.
 */
export function buildCTSpawn(b, lights, anchors) {
  const {
    x0,
    x1,
    z0,
    z1,
    floorY,
    platformX0,
    platformX1,
    platformZ0,
    platformZ1,
    platformY,
  } = CT_SPAWN;

  // --- cordon pad -----------------------------------------------------
  b.add(box(x1 - x0, floorY, z1 - z0, 0.5), 'concrete', {
    position: [(x0 + x1) / 2, floorY / 2, (z0 + z1) / 2],
  });

  // --- rear wall with badge and warning slogans -----------------------
  b.add(box(x1 - x0 + 1.2, 3.0, 0.5, 0.55), 'concrete', {
    position: [0, floorY + 1.5, z1],
  });
  decalWall(b, 'decalPoliceBadge', -5.4, floorY + 1.75, z1 - 0.27, 2.0, 2.0, Math.PI);
  decalWall(b, 'decalWarningOne', 0.6, floorY + 1.9, z1 - 0.27, 3.0, 1.25, Math.PI);
  decalWall(b, 'decalSprayCT', 6.2, floorY + 1.75, z1 - 0.27, 2.6, 1.5, Math.PI);
  decalWall(b, 'decalBulletHoles', -2.4, floorY + 1.4, z1 - 0.27, 1.8, 1.8, Math.PI);

  // --- forward defence line --------------------------------------------
  for (let i = 0; i < 4; i += 1) {
    jerseyBarrier(b, -5.4 + i * 2.6, floorY, z0 + 0.35, 0.02);
  }
  // Riot shields propped against the barricades.
  for (let i = 0; i < 3; i += 1) {
    b.add(box(0.12, 1.15, 0.72, 1.0), 'glass', {
      position: [-4.0 + i * 2.6, floorY + 0.62, z0 + 0.95],
      rotation: [-0.18, 0, 0],
      outline: true,
    });
    b.add(box(0.09, 1.2, 0.78, 1.2), 'metalDark', {
      position: [-4.06 + i * 2.6, floorY + 0.62, z0 + 0.99],
      rotation: [-0.18, 0, 0],
      outline: false,
    });
  }

  // --- police van (west) ----------------------------------------------
  anchors.beacon = policeVan(b, -7.2, floorY, 18.0, 0.1);

  // --- observation platform (east) ------------------------------------
  const pw = platformX1 - platformX0;
  const pd = platformZ1 - platformZ0;
  const pcx = (platformX0 + platformX1) / 2;
  const pcz = (platformZ0 + platformZ1) / 2;

  b.add(box(pw, platformY, pd, 0.5), 'concrete', {
    position: [pcx, platformY / 2, pcz],
  });
  b.add(box(pw + 0.3, 0.16, pd + 0.3, 0.8), 'concreteDark', {
    position: [pcx, platformY + 0.08, pcz],
    outline: false,
  });

  // Stair up the west face of the platform.
  stairs(b, platformX0 - 1.9, 0.04, platformZ0 + 1.0, 8, platformY / 8, 0.44, 0, 1.5);
  railing(
    b,
    [
      [platformX0, platformZ0],
      [platformX0, platformZ1],
    ],
    platformY + 0.16,
    1.05,
  );
  railing(
    b,
    [
      [platformX0, platformZ1],
      [platformX1, platformZ1],
    ],
    platformY + 0.16,
    1.05,
  );

  // Searchlight on a post, aimed back down the lane.
  const postX = platformX1 - 0.9;
  const postZ = platformZ0 + 1.1;
  b.add(cylinder(0.11, 0.15, 1.5, 10, 0.8), 'metalDark', {
    position: [postX, platformY + 0.83, postZ],
  });
  const searchlight = new THREE.Object3D();
  searchlight.position.set(postX, platformY + 1.72, postZ);
  searchlight.rotation.set(-0.42, Math.PI + 0.22, 0);
  const housing = new THREE.Mesh(
    cylinder(0.34, 0.42, 0.62, 14, 1.0).toNonIndexed(),
    b.materials.metalDark,
  );
  housing.rotation.x = Math.PI / 2;
  searchlight.add(housing);
  const lens = new THREE.Mesh(
    cylinder(0.3, 0.3, 0.08, 14, 1.6).toNonIndexed(),
    b.materials.lampWarm,
  );
  lens.rotation.x = Math.PI / 2;
  lens.position.z = 0.32;
  searchlight.add(lens);

  // Visible beam. Additive, unlit and barely there — it should register as
  // light in the rain when you look for it, not as a pane of glass.
  const beam = new THREE.Mesh(
    cylinder(0.3, 2.6, 9.0, 16, 1.0).toNonIndexed(),
    new THREE.MeshBasicMaterial({
      color: 0xffe2b0,
      transparent: true,
      opacity: 0.016,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      fog: false,
    }),
  );
  beam.rotation.x = Math.PI / 2;
  beam.position.z = 4.6;
  beam.renderOrder = 3;
  searchlight.add(beam);

  b.attach(searchlight);
  anchors.searchlight = searchlight;

  lights.push({
    position: [postX, platformY + 1.7, postZ],
    color: 0xffe6b8,
    intensity: 15.0,
    distance: 20,
    kind: 'searchlight',
  });

  // --- equipment boxes against the rear wall ---------------------------
  for (let i = 0; i < 4; i += 1) {
    const bx = -3.2 + i * 0.85;
    b.add(box(0.7, 0.5, 0.5, 1.2), 'containerGreen', {
      position: [bx, floorY + 0.25, z1 - 0.55],
      rotation: [0, 0.1 * i, 0],
    });
    // Vest and helmet sitting on top of each crate.
    b.add(box(0.4, 0.24, 0.3, 1.6), 'rubber', {
      position: [bx, floorY + 0.62, z1 - 0.55],
      rotation: [0, 0.3 * i, 0],
      outline: false,
    });
    b.add(sphereGeo(0.16), 'rubber', {
      position: [bx + 0.24, floorY + 0.6, z1 - 0.42],
      outline: false,
    });
  }

  crateStack(b, 3.4, floorY, 18.6, 2, 0.9, 0.2);
  sackPile(b, 1.6, floorY, 17.6, 5, 0.1);
  jerseyBarrier(b, -2.0, 0.04, 13.4, 0.0);

  // --- approach markings ------------------------------------------------
  decalGround(b, 'decalSprayCT', 0, floorY + 0.03, 17.0, 4.4, 0);
}

function sphereGeo(r) {
  return new THREE.SphereGeometry(r, 10, 7).toNonIndexed();
}
