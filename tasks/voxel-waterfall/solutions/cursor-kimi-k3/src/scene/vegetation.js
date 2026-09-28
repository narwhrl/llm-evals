import * as THREE from 'three';
import { mulberry32, hash3 } from './rng.js';
import { minNeighborHeight } from './heightmap.js';

const tmpMatrix = new THREE.Matrix4();
const tmpColor = new THREE.Color();

// Voxel trees scattered on gentle low-altitude slopes, kept clear of streams.
export function buildTrees({ heights, size, seed, density, snowLine, blockedSet }) {
  const rng = mulberry32(seed ^ 0x7ee55);
  const trunks = [];
  const leaves = [];
  const treeLine = Math.max(8, snowLine - 10);

  for (let z = 2; z < size - 2; z++) {
    for (let x = 2; x < size - 2; x++) {
      const h = heights[z * size + x];
      if (h < 2 || h > treeLine) continue;
      if (h - minNeighborHeight(heights, size, x, z) > 2) continue;
      if (blockedSet.has(x + ',' + z)) continue;
      if (rng() > density * 0.055) continue;

      const th = 2 + Math.floor(rng() * 3);
      for (let i = 1; i <= th; i++) trunks.push({ x, y: h + i, z });
      const top = h + th;
      for (let dy = 0; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (dy === 1 && Math.abs(dx) + Math.abs(dz) === 2 && rng() < 0.6) continue;
            leaves.push({ x: x + dx, y: top + dy, z: z + dz });
          }
        }
      }
      leaves.push({ x, y: top + 2, z });
    }
  }

  const group = new THREE.Group();
  const geo = new THREE.BoxGeometry(1, 1, 1);

  const trunkMesh = new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial({ color: 0xffffff }), Math.max(1, trunks.length));
  for (let i = 0; i < trunks.length; i++) {
    const v = trunks[i];
    tmpMatrix.makeTranslation(v.x, v.y, v.z);
    trunkMesh.setMatrixAt(i, tmpMatrix);
    tmpColor.setHex(0x6b4a2f).offsetHSL(0, 0, (hash3(v.x, v.y, v.z) - 0.5) * 0.1);
    trunkMesh.setColorAt(i, tmpColor);
  }
  trunkMesh.count = trunks.length;
  trunkMesh.castShadow = true;
  trunkMesh.receiveShadow = true;

  const leafMesh = new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial({ color: 0xffffff }), Math.max(1, leaves.length));
  for (let i = 0; i < leaves.length; i++) {
    const v = leaves[i];
    tmpMatrix.makeTranslation(v.x, v.y, v.z);
    leafMesh.setMatrixAt(i, tmpMatrix);
    tmpColor.setHex(0x3e7d32).offsetHSL((hash3(v.x, v.y, v.z) - 0.5) * 0.06, 0.05, (hash3(v.z, v.x, v.y) - 0.5) * 0.16);
    leafMesh.setColorAt(i, tmpColor);
  }
  leafMesh.count = leaves.length;
  leafMesh.castShadow = true;
  leafMesh.receiveShadow = true;

  for (const m of [trunkMesh, leafMesh]) {
    m.frustumCulled = false;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    group.add(m);
  }
  return { group, count: trunks.length + leaves.length };
}
