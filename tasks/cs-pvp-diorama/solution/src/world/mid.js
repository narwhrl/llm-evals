import { box } from '../core/geom.js';
import { MID } from './layout.js';
import { decalGround, decalWall } from './decals.js';
import { crateStack, guardBooth, jerseyBarrier, tireStack } from './props.js';

/**
 * Mid lane — the spine of the map.
 *
 * The classic long duel corridor: two concrete walls with a high shooting
 * port each, a heavy double gate left half open at the halfway mark, and the
 * grated drain running the whole length. It is the only place on the map
 * where two players can see each other at full body height, so everything
 * else in the layout exists to break that sightline from the flanks.
 */
export function buildMid(b, lights) {
  const { x0, x1, z0, z1, wallHeight, gateZ } = MID;
  const t = 0.55;

  // --- side walls, broken into segments so the lane is not a corridor ---
  // Gaps between the blocks matter as much as the blocks themselves: they are
  // the side entrances that stop mid being one long blind duel, and they keep
  // the lane legible when the diorama is viewed from a low angle.
  const blocks = [-12.2, -8.4, -3.2, 2.6, 6.8, 11.4];
  const blockLen = 2.9;
  const portBlock = 1;
  const sill = MID.portSill;

  for (const side of [-1, 1]) {
    const wx = side < 0 ? x0 : x1;
    blocks.forEach((cz, i) => {
      const isPort = i === portBlock;
      if (isPort) {
        // Wall with a firing port punched through it, plus the ledge behind.
        const pz0 = cz - 0.75;
        const pz1 = cz + 0.75;
        const edge = (blockLen - (pz1 - pz0)) / 2;
        for (const sz of [-1, 1]) {
          const mid = cz + sz * (edge / 2 + (pz1 - pz0) / 2);
          b.add(box(t, wallHeight, edge, 0.7), 'concrete', {
            position: [wx, wallHeight / 2, mid],
            outline: true,
          });
        }
        b.add(box(t, sill, pz1 - pz0, 0.8), 'concrete', {
          position: [wx, sill / 2, cz],
          outline: false,
        });
        b.add(box(t, wallHeight - sill - 0.62, pz1 - pz0, 0.8), 'concrete', {
          position: [wx, sill + (wallHeight - sill - 0.62) / 2, cz],
          outline: false,
        });
        // Catwalk ledge you can actually stand on behind the port.
        b.add(box(t + 0.5, 0.14, pz1 - pz0 + 0.5, 1.0), 'metalDark', {
          position: [wx, sill, cz],
          outline: false,
        });
      } else {
        b.add(box(t, wallHeight, blockLen, 0.7), 'concrete', {
          position: [wx, wallHeight / 2, cz],
          outline: true,
        });
        // Coping stones break the top edge so it is not one flat ribbon.
        b.add(box(t + 0.16, 0.14, blockLen + 0.1, 1.1), 'concreteDark', {
          position: [wx, wallHeight + 0.07, cz],
          outline: false,
        });
      }
    });
  }

  // --- the gate: two leaves, one swung open ----------------------------
  const gateW = 5.4;
  const gateH = 3.0;
  const postT = 0.7;
  for (const side of [-1, 1]) {
    b.add(box(postT, gateH + 0.55, postT + 0.2, 0.8), 'concrete', {
      position: [side * (gateW / 2 + postT / 2), (gateH + 0.55) / 2, gateZ],
    });
  }
  // Closed leaf.
  b.add(box(gateW / 2 - 0.06, gateH, 0.2, 1.0), 'rustDark', {
    position: [-gateW / 4, gateH / 2, gateZ],
  });
  for (let i = 0; i < 3; i += 1) {
    b.add(box(gateW / 2 - 0.3, 0.12, 0.26, 1.3), 'rust', {
      position: [-gateW / 4, 0.45 + i * 1.05, gateZ],
      outline: false,
    });
  }
  // Open leaf, hinged back against the wall.
  b.add(box(gateW / 2 - 0.06, gateH, 0.2, 1.0), 'rustDark', {
    position: [gateW * 0.52, gateH / 2, gateZ - 1.05],
    rotation: [0, -1.02, 0],
  });

  // --- low cover wall on the CT side ----------------------------------
  const lowZ = 8.6;
  b.add(box(6.6, 1.18, 0.55, 0.7), 'concrete', { position: [-0.2, 0.59, lowZ] });
  b.add(box(6.8, 0.14, 0.7, 1.0), 'concreteDark', {
    position: [-0.2, 1.25, lowZ],
    outline: false,
  });
  crateStack(b, -2.3, 0.04, lowZ + 0.85, 2, 0.88, 0.2);
  crateStack(b, 1.9, 0.04, lowZ + 0.8, 3, 0.85, -0.35);
  // Abandoned road sign leaning on the cover.
  b.add(box(1.15, 0.85, 0.07, 1.0), 'metalDark', {
    position: [0.9, 0.5, lowZ + 0.5],
    rotation: [0.32, 0.2, 0],
  });
  b.add(box(0.07, 0.95, 0.07, 1.4), 'metalDark', {
    position: [0.9, 0.48, lowZ + 0.72],
    outline: false,
  });

  // --- guard posts between the walls -----------------------------------
  for (const side of [-1, 1]) {
    guardBooth(b, side * 5.2, 0.04, -5.4, 1.6, 1.45, 1.5);
    guardBooth(b, side * 5.2, 0.04, 5.6, 1.6, 1.45, 1.5);
  }

  // --- junk in the lane ------------------------------------------------
  jerseyBarrier(b, -2.4, 0.04, -8.2, 0.12);
  jerseyBarrier(b, 2.5, 0.04, 1.4, -0.05);
  tireStack(b, -2.6, 0.04, 3.1, 4, 0.5);
  crateStack(b, 2.2, 0.04, -3.4, 2, 0.92, 0.3);

  // --- wall graphics ---------------------------------------------------
  decalWall(b, 'decalGraffitiTwo', x0 - t / 2 - 0.03, 1.6, -2.4, 3.6, 1.5, -Math.PI / 2);
  decalWall(b, 'decalBulletHoles', x0 - t / 2 - 0.03, 1.4, 3.6, 2.0, 2.0, -Math.PI / 2);
  decalWall(b, 'decalBulletHoles', x1 + t / 2 + 0.03, 1.5, -6.4, 1.9, 1.9, Math.PI / 2);
  decalWall(b, 'decalGraffitiThree', x1 + t / 2 + 0.03, 1.5, 6.2, 3.2, 1.3, Math.PI / 2);
  decalWall(b, 'decalWarningTwo', x0 - t / 2 - 0.03, 2.2, -9.4, 2.0, 0.85, -Math.PI / 2);
  decalGround(b, 'decalRoadSign', -2.5, 0.06, -12.0, 1.5, 0.3);

  // Faint cold fill so the lane is never a black void between the lights.
  lights.push({
    position: [0, 3.6, -6.5],
    color: 0x8fb6e0,
    intensity: 3.0,
    distance: 12,
    kind: 'lane',
  });
  lights.push({
    position: [0, 3.6, 6.0],
    color: 0x8fb6e0,
    intensity: 2.4,
    distance: 11,
    kind: 'lane',
  });
}
