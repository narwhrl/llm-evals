import * as THREE from 'three';
import { hash3 } from './rng.js';
import { minNeighborHeight } from './heightmap.js';

const tmpMatrix = new THREE.Matrix4();
const tmpColor = new THREE.Color();

// Surface-only voxelization: each column emits its top voxel plus the side
// voxels exposed where a neighbor column is lower. Keeps instance count far
// below a solid fill while looking identical from outside.
export function buildTerrain({ heights, size, snowLine, wetSet, sandSet }) {
  let count = 0;
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const h = heights[z * size + x];
      const minN = minNeighborHeight(heights, size, x, z);
      count += Math.max(1, h - minN);
    }
  }

  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const mesh = new THREE.InstancedMesh(geo, mat, count);

  let i = 0;
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const h = heights[z * size + x];
      const minN = minNeighborHeight(heights, size, x, z);
      const yStart = Math.max(h - Math.max(1, h - minN) + 1, 1);
      const wet = wetSet.has(x + ',' + z);
      const sand = sandSet.has(x + ',' + z);
      for (let y = yStart; y <= h; y++) {
        tmpMatrix.makeTranslation(x, y, z);
        mesh.setMatrixAt(i, tmpMatrix);
        voxelColor(x, y, z, h, minN, snowLine, wet, sand, tmpColor);
        mesh.setColorAt(i, tmpColor);
        i++;
      }
    }
  }
  mesh.count = i;
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.frustumCulled = false; // instances span the map; unit-box bounds would cull wrongly
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return { mesh, count: i };
}

function voxelColor(x, y, z, h, minN, snowLine, wet, sand, out) {
  const j = (hash3(x, y, z) - 0.5) * 0.14;
  const cliff = h - minN >= 3;
  if (y >= snowLine) {
    out.setHex(0xf2f6fc); // snow
  } else if (y >= snowLine - 5) {
    out.setHex(0x8a8a92); // high rock band
  } else if (cliff) {
    out.setHex(0x7b6f61); // steep cliff face
  } else if (sand) {
    out.setHex(0xb8a671); // shore sand around pools
  } else if (y <= 3) {
    out.setHex(0x6da34c); // lowland grass
  } else if (y < snowLine * 0.5) {
    out.setHex(0x5b9a43); // grass
  } else if (y < snowLine - 8) {
    out.setHex(0x77815a); // subalpine transition
  } else {
    out.setHex(0x8a8a92);
  }
  out.offsetHSL(0, 0, j * 0.5);
  if (wet) out.multiplyScalar(0.62).lerp(new THREE.Color(0x2d4a5e), 0.25);
}
