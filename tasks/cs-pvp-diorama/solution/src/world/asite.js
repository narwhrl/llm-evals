import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { box, cylinder } from '../core/geom.js';
import { A_SITE } from './layout.js';
import { decalGround, decalWall } from './decals.js';
import {
  acUnit,
  crate,
  crateStack,
  forklift,
  ladder,
  railing,
  sackPile,
  shelfRack,
  tireStack,
} from './props.js';

/**
 * A site — the derelict freight warehouse.
 *
 * Half-open by design: the north half still carries its corrugated roof, the
 * south half has lost its panels and shows bare trusses. That is both what a
 * condemned shed looks like and what lets an orbiting camera actually read the
 * bomb site, the centre column and the loft inside it.
 */
export function buildASite(b, lights, anchors) {
  const { x0, x1, z0, z1, floorY, wallHeight, loftY } = A_SITE;
  const roofY = floorY + wallHeight;
  const t = 0.42; // wall thickness
  const roofSplitZ = -10.4;

  // --- slab and walls -------------------------------------------------
  b.add(box(x1 - x0, floorY, z1 - z0, 0.5), 'concrete', {
    position: [(x0 + x1) / 2, floorY / 2, (z0 + z1) / 2],
  });

  const wallH = wallHeight;
  const wallMidY = floorY + wallH / 2;

  // North wall (solid) and west wall (solid, faces the alley).
  b.add(box(x1 - x0, wallH, t, 0.6), 'corrugated', {
    position: [(x0 + x1) / 2, wallMidY, z0 + t / 2],
  });
  b.add(box(t, wallH, z1 - z0, 0.6), 'corrugated', {
    position: [x0 + t / 2, wallMidY, (z0 + z1) / 2],
  });

  // --- south face: half-rolled shutter --------------------------------
  const shutterW = 5.6;
  const shutterCx = (x0 + x1) / 2 - 0.4;
  const shutterH = 3.6;
  const shutterX0 = shutterCx - shutterW / 2;
  const shutterX1 = shutterCx + shutterW / 2;
  const doorTop = floorY + shutterH;

  b.add(box(shutterX0 - x0, wallH, t, 0.6), 'corrugated', {
    position: [(x0 + shutterX0) / 2, wallMidY, z1 - t / 2],
  });
  b.add(box(x1 - shutterX1, wallH, t, 0.6), 'corrugated', {
    position: [(shutterX1 + x1) / 2, wallMidY, z1 - t / 2],
  });
  b.add(box(shutterW, wallH - shutterH, t, 0.6), 'corrugated', {
    position: [shutterCx, doorTop + (wallH - shutterH) / 2, z1 - t / 2],
  });

  // Shutter slats rolled down over the top third of the opening. Kept as its
  // own mesh so the roller can judder without rebuilding the whole batch.
  const dropped = 1.35;
  const slats = [];
  for (let i = 0; i < 5; i += 1) {
    slats.push(
      box(shutterW - 0.1, dropped / 5 - 0.02, 0.14, 1.1).translate(
        0,
        doorTop - dropped / 2 + (i * dropped) / 5,
        0,
      ),
    );
  }
  const shutterMesh = new THREE.Mesh(
    mergeGeometries(slats, false),
    b.materials.rust,
  );
  shutterMesh.position.set(shutterCx, 0, z1 - t / 2 + 0.1);
  shutterMesh.castShadow = true;
  shutterMesh.name = 'roller-shutter';
  shutterMesh.userData.baseZ = shutterMesh.position.z;
  b.attach(shutterMesh);
  anchors.shutter = shutterMesh;
  b.add(cylinder(0.34, 0.34, shutterW - 0.2, 12, 1.0), 'rustDark', {
    position: [shutterCx, doorTop + 0.42, z1 - t / 2 + 0.1],
    rotation: [0, 0, Math.PI / 2],
  });
  for (const side of [-1, 1]) {
    b.add(box(0.16, shutterH, 0.2, 1.2), 'metalDark', {
      position: [shutterCx + side * (shutterW / 2 - 0.08), floorY + shutterH / 2, z1 - t / 2 + 0.06],
      outline: false,
    });
  }

  // --- east face: two plywood windows and an inward side door ---------
  const winZ = [-11.6, -6.6];
  const winW = 1.7;
  const winH = 1.5;
  const winSill = floorY + 1.25;

  let cursor = z0;
  const doorZ = -9.3;
  const doorW = 1.35;
  const doorH = 2.55;

  const eastRun = (fromZ, toZ, height, yBase) => {
    b.add(box(t, height, toZ - fromZ, 0.6), 'corrugated', {
      position: [x1 - t / 2, yBase + height / 2, (fromZ + toZ) / 2],
    });
  };

  eastRun(cursor, winZ[0] - winW / 2, wallH, floorY);
  eastRun(winZ[0] + winW / 2, winZ[1] - winW / 2, wallH, floorY);
  eastRun(winZ[1] + winW / 2, doorZ - doorW / 2, wallH, floorY);
  eastRun(doorZ + doorW / 2, z1 - t, wallH, floorY);

  // Sill and lintel bands so the punched openings read as built, not cut.
  for (const wz of winZ) {
    eastRun(wz - winW / 2, wz + winW / 2, winSill - floorY, floorY);
    eastRun(wz - winW / 2, wz + winW / 2, wallH - (winH + (winSill - floorY)), winSill + winH);
    // Boarded over with plywood, as specified.
    b.add(box(0.1, winH - 0.06, winW - 0.06, 1.0), 'wood', {
      position: [x1 - t / 2 - 0.03, winSill + winH / 2, wz],
      outline: false,
    });
    for (let i = -1; i <= 1; i += 2) {
      b.add(box(0.07, winH - 0.2, 0.16, 1.3), 'woodDark', {
        position: [x1 - t / 2 - 0.09, winSill + winH / 2, wz + i * (winW / 2 - 0.18)],
        rotation: [0, 0, 0.06 * i],
        outline: false,
      });
    }
  }

  eastRun(doorZ - doorW / 2, doorZ + doorW / 2, wallH - doorH, floorY + doorH);
  // Door leaf swung inward against the interior.
  b.add(box(doorW - 0.08, doorH - 0.06, 0.09, 1.1), 'corrugatedDark', {
    position: [x1 - t / 2 - 0.72, floorY + doorH / 2, doorZ - 0.62],
    rotation: [0, -1.15, 0],
  });

  // --- roof: solid north half, open trusses over the south half ------
  b.add(box(x1 - x0 + 0.5, 0.22, roofSplitZ - z0 + 0.3, 0.5), 'corrugatedDark', {
    position: [(x0 + x1) / 2, roofY, (z0 + roofSplitZ) / 2],
  });
  for (let i = 0; i < 6; i += 1) {
    const z = roofSplitZ + ((z1 - roofSplitZ) * i) / 5;
    b.add(box(x1 - x0, 0.22, 0.18, 0.9), 'woodDark', {
      position: [(x0 + x1) / 2, roofY + 0.22, z],
      outline: i === 0,
    });
  }
  // Gable edge above the missing panels.
  b.add(box(x1 - x0, 0.26, 0.3, 0.7), 'corrugatedDark', {
    position: [(x0 + x1) / 2, roofY + 0.2, roofSplitZ],
  });

  // --- centre column: the classic peek pillar -------------------------
  b.add(box(0.85, wallH, 0.85, 0.8), 'concrete', {
    position: [(x0 + x1) / 2, floorY + wallH / 2, -8.6],
  });
  b.add(box(1.05, 0.22, 1.05, 0.8), 'concreteDark', {
    position: [(x0 + x1) / 2, floorY + 0.11, -8.6],
    outline: false,
  });

  // --- loft in the south-east corner ----------------------------------
  const loftX0 = -9.7;
  const loftX1 = x1;
  const loftZ0 = -6.3;
  const loftZ1 = z1;
  b.add(box(loftX1 - loftX0, 0.2, loftZ1 - loftZ0, 0.7), 'woodDark', {
    position: [(loftX0 + loftX1) / 2, loftY, (loftZ0 + loftZ1) / 2],
  });
  railing(
    b,
    [
      [loftX0, loftZ0],
      [loftX0, loftZ1],
    ],
    loftY + 0.1,
    0.95,
  );
  ladder(b, loftX0 + 0.35, floorY, -5.4, loftY - floorY + 0.2, 0, 'metalDark');
  // Loft walls with a viewing slit over the site and the shutter approach.
  b.add(box(loftX1 - loftX0, 1.5, 0.14, 0.9), 'corrugatedDark', {
    position: [(loftX0 + loftX1) / 2, loftY + 0.85, loftZ0 + 0.07],
  });
  b.add(box(0.14, 1.5, loftZ1 - loftZ0, 0.9), 'corrugatedDark', {
    position: [loftX0 + 0.07, loftY + 0.85, (loftZ0 + loftZ1) / 2],
  });
  b.add(box(loftX1 - loftX0, 0.34, 0.16, 1.0), 'woodDark', {
    position: [(loftX0 + loftX1) / 2, loftY + 1.72, loftZ0 + 0.08],
    outline: false,
  });

  // --- interior dressing ----------------------------------------------
  shelfRack(b, -12.0, floorY, -12.7, 5, 4.6, 1.15, 0);
  forklift(b, -15.6, floorY, -6.0, 0.45);
  crateStack(b, -9.0, floorY, -11.6, 3, 0.9, 0.3);
  crateStack(b, -14.2, floorY, -10.4, 2, 0.95, -0.2);
  sackPile(b, -10.2, floorY, -7.2, 6, 0.25);
  sackPile(b, -9.1, floorY, -7.4, 4, -0.4);
  tireStack(b, -15.9, floorY, -11.6, 2, 0.9);

  // Sorting table and its scattered output.
  b.add(box(2.6, 0.09, 1.1, 1.0), 'wood', { position: [-8.2, floorY + 0.92, -12.1] });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(box(0.09, 0.9, 0.09, 1.4), 'metalDark', {
        position: [-8.2 + sx * 1.15, floorY + 0.45, -12.1 + sz * 0.45],
        outline: false,
      });
    }
  }
  crate(b, -8.6, floorY + 1.0, -12.2, 0.5, 0.4, 'cardboard');
  crate(b, -7.5, floorY, -12.9, 0.55, 0.2, 'cardboard');
  crate(b, -9.4, floorY, -12.6, 0.5, -0.3, 'cardboard');

  // Packing straps and newspapers: flat litter that catches the eye from above.
  for (let i = 0; i < 7; i += 1) {
    const sx = -10.5 + (i % 4) * 0.9;
    const sz = -6.2 + ((i / 4) | 0) * 0.8;
    b.add(box(0.9, 0.02, 0.07, 1.6), 'paintWhite', {
      position: [sx, floorY + 0.02, sz],
      rotation: [0, i * 0.7, 0],
      outline: false,
    });
  }
  for (let i = 0; i < 6; i += 1) {
    b.add(box(0.42, 0.015, 0.32, 2.0), 'paintWhite', {
      position: [-13.6 + i * 0.55, floorY + 0.015, -5.2 + (i % 3) * 0.42],
      rotation: [0, i * 1.1, 0],
      outline: false,
    });
  }

  // --- bomb site paint and cold emergency light ------------------------
  decalGround(b, 'decalBombA', shutterCx, floorY + 0.03, -5.6, 4.4, 0);

  lights.push({
    position: [shutterCx - 1.6, floorY + 3.1, -7.4],
    color: 0xcfe4ff,
    intensity: 9.5,
    distance: 13,
    kind: 'warehouse',
  });
  lights.push({
    position: [shutterCx + 2.2, floorY + 3.1, -10.6],
    color: 0xcfe4ff,
    intensity: 6.0,
    distance: 10,
    kind: 'warehouse',
  });
  // Faint red glow from the half-closed back door at the far end.
  lights.push({
    position: [-16.4, floorY + 1.2, -12.6],
    color: 0xff4a3a,
    intensity: 1.5,
    distance: 4.0,
    kind: 'backdoor',
  });

  // --- outside the west wall, facing the alley ------------------------
  acUnit(b, x0 + 0.1, floorY, -6.4, -Math.PI / 2);
  b.add(box(0.08, 1.5, 2.4, 1.0), 'metal', { position: [x0 - 0.06, floorY + 2.0, -9.4] });
  b.add(box(0.5, 0.07, 0.07, 1.6), 'metalDark', {
    position: [x0 - 0.28, floorY + 2.7, -9.4],
    outline: false,
  });
  crate(b, x0 - 1.1, 0.04, -11.2, 0.72, 0.5, 'cardboard');
  tireStack(b, x0 - 0.9, 0.04, -4.2, 3, 0.3);

  // --- yard in front of the shutter -----------------------------------
  crateStack(b, shutterCx - 4.2, 0.04, -1.9, 2, 0.95, 0.15);
  crateStack(b, shutterCx + 3.9, 0.04, -2.2, 3, 0.9, -0.25);
  sackPile(b, shutterCx + 1.2, 0.04, -1.1, 5, 0.1);

  // --- wall graphics ---------------------------------------------------
  decalWall(b, 'decalGraffitiThree', -8.0, floorY + 1.9, z1 + 0.02, 4.0, 1.6, 0);
  decalWall(b, 'decalBulletHoles', -11.0, floorY + 1.5, z1 + 0.02, 2.0, 2.0, 0);
  decalWall(b, 'decalBulletHoles', x1 + 0.02, floorY + 1.6, -4.4, 1.8, 1.8, Math.PI / 2);
  decalWall(b, 'decalGraffitiOne', x0 - t / 2 - 0.05, floorY + 1.8, -8.0, 3.4, 1.4, -Math.PI / 2);
  decalWall(b, 'decalFreightCode', x0 - t / 2 - 0.05, floorY + 2.2, -11.0, 2.4, 1.0, -Math.PI / 2);
  decalWall(b, 'decalWarningOne', x1 + 0.02, floorY + 2.2, -7.4, 2.2, 0.9, Math.PI / 2);

  // --- drip emitters ---------------------------------------------------
  // Roof edge, shutter drum and the loft lip all shed water.
  anchors.drips.push({ position: new THREE.Vector3(shutterCx - 1.6, roofY + 0.1, z1 + 0.12), spread: 2.6 });
  anchors.drips.push({ position: new THREE.Vector3(shutterCx + 2.0, roofY + 0.1, z1 + 0.12), spread: 2.0 });
  anchors.drips.push({ position: new THREE.Vector3(shutterCx, doorTop + 0.2, z1 + 0.2), spread: 1.8, rate: 0.3 });
  anchors.drips.push({ position: new THREE.Vector3(x0 - 0.1, roofY + 0.1, -9.0), spread: 2.4 });
  anchors.drips.push({ position: new THREE.Vector3(loftX0 + 0.2, loftY + 0.1, loftZ0 + 0.1), spread: 0.7, rate: 0.4 });
}
