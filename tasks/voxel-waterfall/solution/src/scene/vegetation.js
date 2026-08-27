import * as THREE from 'three';
import { hash2 } from './noise.js';
import { VoxelBuilder } from './builder.js';
import { GRID } from './terrain.js';

import { Color } from 'three';
const lin = (hex) => { const c = new Color(hex); return [c.r, c.g, c.b]; };
const TRUNK = lin(0x6b4a2f);
const LEAF_A = lin(0x3f7d2c);
const LEAF_B = lin(0x4f9136);

/** Dilate the water mask by `r` cells: true where water is within r. */
function dilateWater(water, r) {
  const out = new Uint8Array(GRID * GRID);
  for (let z = 0; z < GRID; z++) {
    for (let x = 0; x < GRID; x++) {
      if (water[z * GRID + x] < 0) continue;
      for (let dz = -r; dz <= r; dz++) {
        const zz = z + dz;
        if (zz < 0 || zz >= GRID) continue;
        for (let dx = -r; dx <= r; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= GRID) continue;
          if (dx * dx + dz * dz <= r * r) out[zz * GRID + xx] = 1;
        }
      }
    }
  }
  return out;
}

function addTree(b, x, z, ground, seed) {
  const x0 = x - GRID / 2, z0 = z - GRID / 2;
  const r = hash2(x, z, seed + 41);
  const th = 3 + Math.floor(r * 3); // trunk height 3..5
  b.box(x0 + 0.12, ground, z0 + 0.12, x0 + 0.88, ground + th, z0 + 0.88,
        TRUNK[0], TRUNK[1], TRUNK[2]);

  const leaf = hash2(x, z, seed + 43) < 0.5 ? LEAF_A : LEAF_B;
  const leaf2 = leaf === LEAF_A ? LEAF_B : LEAF_A;
  for (let dy = 0; dy < 2; dy++) {
    const y = ground + th - 1 + dy;
    for (let dz = -1; dz <= 1; dz++) {
      for (let dx = -1; dx <= 1; dx++) {
        // ragged upper corners keep the canopies from looking stamped
        if (dy === 1 && Math.abs(dx) === 1 && Math.abs(dz) === 1
            && hash2(x * 7 + dx, z * 5 + dz, seed + 47) < 0.55) continue;
        const c = hash2(x + dx * 3, z + dz * 7 + dy, seed + 53) < 0.5 ? leaf : leaf2;
        b.box(x0 + dx, y, z0 + dz, x0 + dx + 1, y + 1, z0 + dz + 1, c[0], c[1], c[2]);
      }
    }
  }
  // single cap block
  b.box(x0, ground + th + 1, z0, x0 + 1, ground + th + 2, z0 + 1,
        leaf[0], leaf[1], leaf[2]);
}

/**
 * Scatter voxel trees on the grass biome at the mountain foot.
 * Returns { mesh, count }.
 */
export function buildTrees(heights, water, { seed, treeDensity, snowLine }) {
  const b = new VoxelBuilder();
  const waterNear = dilateWater(water, 2);
  const treeLine = Math.min(26, snowLine * 0.6);
  const p = Math.min(1, treeDensity / 3500);
  let count = 0;

  for (let z = 1; z < GRID - 1; z += 2) {
    for (let x = 1; x < GRID - 1; x += 2) {
      const i = z * GRID + x;
      const h = heights[i];
      if (h < 5 || h > treeLine) continue;
      if (waterNear[i]) continue;
      // slope check: no trees on cliff faces
      const slope = Math.max(
        Math.abs(h - heights[i - 1]), Math.abs(h - heights[i + 1]),
        Math.abs(h - heights[i - GRID]), Math.abs(h - heights[i + GRID]),
      );
      if (slope > 2) continue;
      if (hash2(x, z, seed + 301) > p) continue;
      addTree(b, x, z, h, seed);
      count++;
    }
  }

  const mesh = new THREE.Mesh(
    b.build(true),
    new THREE.MeshLambertMaterial({ vertexColors: true }),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return { mesh, count };
}
