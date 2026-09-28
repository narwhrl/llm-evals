import * as THREE from 'three';
import { box, cylinder } from '../core/geom.js';
import { B_SITE } from './layout.js';
import { decalGround, decalWall } from './decals.js';
import {
  bicycle,
  chair,
  crateStack,
  dumpster,
  ironTable,
  ladder,
  pallet,
  railing,
  sackPile,
  stairs,
} from './props.js';

/**
 * B site — the back-alley guard house.
 *
 * A two-storey tin hut wedged into the alley, bombsite paint on the ground in
 * front of its door, and a fire escape climbing the outside to a balcony that
 * watches both the site and the alley mouth. Everything down here is close
 * range: the alley leaves no room to hold an angle at distance.
 */
export function buildBSite(b, lights, anchors) {
  const { houseX0, houseX1, houseZ0, houseZ1, wallHeight, balconyY, floorY } = B_SITE;
  const t = 0.34;
  const houseCx = (houseX0 + houseX1) / 2;
  const houseCz = (houseZ0 + houseZ1) / 2;

  // --- ground pad -----------------------------------------------------
  b.add(box(houseX1 - houseX0 + 0.6, floorY, houseZ1 - houseZ0 + 0.6, 0.5), 'concrete', {
    position: [houseCx, floorY / 2, houseCz],
  });

  // --- shell ----------------------------------------------------------
  b.add(box(houseX1 - houseX0, wallHeight, t, 0.7), 'corrugated', {
    position: [houseCx, floorY + wallHeight / 2, houseZ0 + t / 2],
  });
  b.add(box(t, wallHeight, houseZ1 - houseZ0, 0.7), 'corrugated', {
    position: [houseX0 + t / 2, floorY + wallHeight / 2, houseCz],
  });
  b.add(box(t, wallHeight, houseZ1 - houseZ0, 0.7), 'corrugated', {
    position: [houseX1 - t / 2, floorY + wallHeight / 2, houseCz],
  });

  // South face with a window and the main door.
  const doorX = houseCx - 1.0;
  const doorW = 1.3;
  const doorH = 2.45;
  const winX = houseCx + 2.2;
  const winW = 2.1;
  const winH = 1.35;
  const sill = floorY + 1.15;
  const southZ = houseZ1;

  const southRun = (x0, x1, yBase, height) => {
    b.add(box(x1 - x0, height, t, 0.7), 'corrugated', {
      position: [(x0 + x1) / 2, yBase + height / 2, southZ - t / 2],
    });
  };
  southRun(houseX0, doorX - doorW / 2, floorY, wallHeight);
  southRun(doorX + doorW / 2, winX - winW / 2, floorY, wallHeight);
  southRun(winX + winW / 2, houseX1, floorY, wallHeight);
  southRun(doorX - doorW / 2, doorX + doorW / 2, floorY + doorH, wallHeight - doorH);
  southRun(winX - winW / 2, winX + winW / 2, floorY, sill - floorY);
  southRun(winX - winW / 2, winX + winW / 2, sill + winH, wallHeight - winH - (sill - floorY));

  // Dirty glass in the window and the door leaf standing ajar.
  b.add(box(winW - 0.12, winH - 0.08, 0.05, 1.0), 'glass', {
    position: [winX, sill + winH / 2, southZ - t / 2],
    outline: false,
  });
  b.add(box(doorW - 0.08, doorH - 0.06, 0.09, 1.1), 'corrugatedDark', {
    position: [doorX + 0.52, floorY + doorH / 2, southZ - 0.45],
    rotation: [0, 0.95, 0],
  });

  // --- floor slab between the storeys ----------------------------------
  b.add(box(houseX1 - houseX0, 0.2, houseZ1 - houseZ0, 0.7), 'woodDark', {
    position: [houseCx, floorY + wallHeight / 2, houseCz],
  });

  // --- roof, pulled back over the rear half so the office stays visible -
  const roofY = floorY + wallHeight;
  b.add(box(houseX1 - houseX0 + 0.5, 0.2, houseZ1 - houseZ0 - 2.6, 0.6), 'corrugated', {
    position: [houseCx, roofY + 0.12, houseZ0 + (houseZ1 - houseZ0 - 2.6) / 2],
  });
  for (let i = 0; i < 4; i += 1) {
    b.add(box(houseX1 - houseX0, 0.16, 0.14, 1.0), 'woodDark', {
      position: [houseCx, roofY + 0.16, houseZ1 - 0.5 - i * 0.75],
      outline: i === 0,
    });
  }
  // Vent on the roof, which is where the steam comes from.
  b.add(box(0.8, 0.5, 0.8, 1.0), 'metal', {
    position: [houseX0 + 1.6, roofY + 0.4, houseZ0 + 1.5],
  });
  anchors.vents.push(new THREE.Vector3(houseX0 + 1.6, roofY + 0.75, houseZ0 + 1.5));

  // --- second-floor balcony and its rail -------------------------------
  const balZ0 = houseZ1 - 0.2;
  b.add(box(houseX1 - houseX0 - 0.4, 0.18, 2.3, 0.7), 'woodDark', {
    position: [houseCx, balconyY, balZ0 + 1.05],
  });
  railing(
    b,
    [
      [houseX0 + 0.2, balZ0],
      [houseX0 + 0.2, balZ0 + 2.3],
      [houseX1 - 0.2, balZ0 + 2.3],
      [houseX1 - 0.2, balZ0],
    ],
    balconyY + 0.09,
    1.0,
  );

  // --- fire escape up the east face ------------------------------------
  stairs(b, houseX1 + 0.5, 0.04, houseZ0 + 2.2, 8, balconyY / 8, 0.42, 0, 1.2, 'metalDark');
  // Landing at the top, joining the balcony.
  b.add(box(1.5, 0.16, 1.4, 1.0), 'metalDark', {
    position: [houseX1 + 0.55, balconyY, houseZ0 + 1.55],
  });
  railing(
    b,
    [
      [houseX1 + 1.3, houseZ0 + 0.9],
      [houseX1 + 1.3, houseZ0 + 2.3],
    ],
    balconyY + 0.08,
    0.95,
  );
  ladder(b, houseX1 - 0.55, floorY, houseZ0 + 2.6, 2.3, 0, 'metalDark');

  // --- ground-floor office ---------------------------------------------
  b.add(box(1.7, 0.08, 0.85, 1.0), 'wood', { position: [houseCx + 1.5, floorY + 0.78, houseZ0 + 1.1] });
  for (const sx of [-1, 1]) {
    b.add(box(0.08, 0.76, 0.08, 1.4), 'metalDark', {
      position: [houseCx + 1.5 + sx * 0.75, floorY + 0.38, houseZ0 + 1.1],
      outline: false,
    });
  }
  chair(b, houseCx + 1.4, floorY, houseZ0 + 2.0, 2.4, true);
  // Stove pipe, dead coffee tin, radio set.
  b.add(box(0.22, 1.0, 0.22, 1.4), 'metalDark', {
    position: [houseX0 + 0.7, floorY + 0.5, houseZ0 + 0.9],
    outline: false,
  });
  b.add(cylinder(0.11, 0.11, 0.16, 10, 1.6), 'metalDark', {
    position: [houseCx + 2.0, floorY + 0.86, houseZ0 + 1.25],
    outline: false,
  });
  b.add(box(0.42, 0.26, 0.24, 1.6), 'metalDark', {
    position: [houseCx + 0.6, floorY + 0.95, houseZ0 + 0.95],
    outline: false,
  });
  // Locker in the corner.
  b.add(box(0.55, 1.75, 0.5, 1.0), 'corrugatedDark', {
    position: [houseX1 - 0.6, floorY + 0.88, houseZ0 + 0.6],
  });

  // Broken fluorescent tube hanging in the office.
  const tubeY = floorY + 2.55;
  b.add(box(1.4, 0.09, 0.16, 1.6), 'metalDark', {
    position: [houseCx + 0.4, tubeY + 0.1, houseZ0 + 1.5],
    outline: false,
  });
  b.add(box(1.25, 0.07, 0.09, 1.8), 'lampBroken', {
    position: [houseCx + 0.4, tubeY, houseZ0 + 1.5],
    outline: false,
  });

  // --- site dressing ---------------------------------------------------
  decalGround(b, 'decalBombB', doorX + 0.6, 0.06, B_SITE.markingZ, 4.0, 0.1);
  pallet(b, 7.6, 0.06, -5.0, 0.3);
  pallet(b, 7.5, 0.2, -4.9, 0.6);
  pallet(b, 7.7, 0.34, -5.1, -0.2);
  dumpster(b, 19.2, 0.06, -4.4, 0.4, 'containerGreen', true);
  dumpster(b, 19.0, 0.06, -2.6, -0.2, 'corrugatedDark', false);
  bicycle(b, 12.4, 0.06, -5.6, 1.1, 0.3);
  bicycle(b, 13.1, 0.06, -5.1, 1.35, -0.2);
  ironTable(b, 11.2, 0.06, -3.4, 0.4, true);
  chair(b, 11.9, 0.06, -3.9, 0.9, true);
  chair(b, 10.5, 0.06, -2.9, -0.5, true);
  crateStack(b, 18.4, 0.06, -8.4, 2, 0.9, 0.3);
  sackPile(b, 8.0, 0.06, -8.0, 5, 0.15);

  // --- corner lamp: the one genuinely warm light on the map -----------
  const lampX = 15.2;
  const lampZ = -5.0;
  b.add(cylinder(0.11, 0.16, 4.3, 10, 0.8), 'metalDark', {
    position: [lampX, 2.15, lampZ],
  });
  b.add(box(0.6, 0.12, 0.6, 1.0), 'metalDark', {
    position: [lampX, 0.12, lampZ],
    outline: false,
  });
  b.add(box(1.3, 0.1, 0.1, 1.4), 'metalDark', {
    position: [lampX + 0.5, 4.2, lampZ],
    outline: false,
  });
  b.add(cylinder(0.34, 0.16, 0.34, 12, 1.0), 'metalDark', {
    position: [lampX + 1.0, 4.05, lampZ],
  });
  b.add(box(0.34, 0.1, 0.34, 1.6), 'lampWarm', {
    position: [lampX + 1.0, 3.87, lampZ],
    outline: false,
  });
  anchors.streetLamp = { position: new THREE.Vector3(lampX + 1.0, 3.85, lampZ) };
  lights.push({
    position: [lampX + 1.0, 3.8, lampZ],
    color: 0xffbe6a,
    intensity: 13.0,
    distance: 16,
    kind: 'street',
  });

  // Shortcut wall from the B corner toward CT.
  b.add(box(4.6, 1.15, 0.5, 0.7), 'concrete', { position: [16.6, 0.6, -1.6] });
  b.add(box(4.8, 0.14, 0.62, 1.0), 'concreteDark', {
    position: [16.6, 1.24, -1.6],
    outline: false,
  });

  // --- wall graphics ---------------------------------------------------
  decalWall(b, 'decalDutyRoster', houseX0 - t / 2 - 0.03, floorY + 1.7, houseZ0 + 2.2, 1.1, 0.85, -Math.PI / 2);
  decalWall(b, 'decalGraffitiOne', houseX1 + t / 2 + 0.03, floorY + 1.8, houseZ0 + 2.6, 2.6, 1.1, Math.PI / 2);
  decalWall(b, 'decalBulletHoles', houseX1 + t / 2 + 0.03, floorY + 1.5, houseZ1 - 1.0, 1.7, 1.7, Math.PI / 2);
  decalWall(b, 'decalFreightCodeTwo', houseX0 + 2.6, floorY + 3.4, houseZ0 - 0.02, 2.6, 1.0, Math.PI);

  // Interior warm fill.
  lights.push({
    position: [houseCx + 0.4, floorY + 2.4, houseZ0 + 1.5],
    color: 0xffd79a,
    intensity: 5.4,
    distance: 7.5,
    kind: 'office',
  });

  // --- drip emitters ---------------------------------------------------
  anchors.drips.push({ position: new THREE.Vector3(houseCx, roofY + 0.24, houseZ1 - 2.5), spread: 3.2 });
  anchors.drips.push({ position: new THREE.Vector3(houseX0 + 1.6, roofY + 0.75, houseZ0 + 1.5), spread: 0.3, rate: 0.45 });
  anchors.drips.push({ position: new THREE.Vector3(winX, sill + winH, southZ + 0.05), spread: 0.8, rate: 0.4 });
  anchors.drips.push({ position: new THREE.Vector3(houseCx, balconyY + 0.12, balZ0 + 2.2), spread: 3.0, rate: 0.3 });
}
