import assert from 'node:assert/strict';
import { Box3, Matrix4, OrthographicCamera, Vector3 } from 'three';
import { createWorld } from '../src/world.js';
import { fitCamera } from '../src/framing.js';

const start = performance.now();
const world = createWorld();
const { buildings, voxels, materials } = world.userData;
const bounds = new Box3().setFromObject(world);
assert.equal(buildings.length, 6);
const main = buildings.find((b) => b.main);
const gate = buildings.find((b) => b.gate);
assert.equal(main.x, 0);
assert.equal(gate.x, 0);
assert(gate.z > main.z, 'Gate is on the front of the central axis');
assert(buildings.every((b) => main.width * main.depth >= b.width * b.depth), 'Main hall has the largest footprint');
for (const id of ['west', 'west-tower']) {
  const west = buildings.find((b) => b.id === id);
  const east = buildings.find((b) => b.id === id.replace('west', 'east'));
  assert.equal(west.x, -east.x);
  assert.equal(west.z, east.z);
  assert.equal(west.width, east.width);
  assert.equal(west.depth, east.depth);
}
const matrix = new Matrix4();
const pavers = [];
let measuredCount = 0;
for (const mesh of world.children) {
  assert(mesh.isInstancedMesh, 'Voxel construction uses batched real Three.js meshes');
  measuredCount += mesh.count;
  for (let i = 0; i < mesh.count; i++) {
    mesh.getMatrixAt(i, matrix);
    assert(matrix.elements.every(Number.isFinite), `${mesh.name}: finite transform`);
    assert(matrix.determinant() > 0, `${mesh.name}: positive, nondegenerate voxel size`);
    const e = matrix.elements;
    if (['stone', 'paving'].includes(mesh.name) && Math.abs(e[13] - 0.23) < 1e-5 && Math.abs(e[5] - 0.18) < 1e-5) {
      pavers.push({ x: e[12], z: e[14], width: e[0], depth: e[10] });
    }
  }
}
assert.equal(voxels, measuredCount);
assert(bounds.min.y < 0 && bounds.max.y > 15, 'Island and elevated architecture have volume');
for (let i = 0; i < pavers.length; i++) {
  for (let j = i + 1; j < pavers.length; j++) {
    const a = pavers[i];
    const b = pavers[j];
    const overlapX = Math.abs(a.x - b.x) < (a.width + b.width) / 2 - 1e-4;
    const overlapZ = Math.abs(a.z - b.z) < (a.depth + b.depth) / 2 - 1e-4;
    assert(!(overlapX && overlapZ), 'Paving junctions must not have coplanar overlapping tiles');
  }
}

const center = bounds.getCenter(new Vector3());
const camera = new OrthographicCamera(-80, 80, 60, -60, 0.1, 600);
const point = new Vector3();
let checkedFrames = 0;
for (const offset of [[90, 74, 105], [0, 65, 125], [0, 155, 0.1]]) {
  camera.position.copy(center).add(new Vector3(...offset));
  camera.lookAt(center);
  for (const [width, height] of [[1120, 590], [720, 500], [343, 380], [288, 278]]) {
    fitCamera(camera, bounds, width / height);
    for (const x of [bounds.min.x, bounds.max.x]) {
      for (const y of [bounds.min.y, bounds.max.y]) {
        for (const z of [bounds.min.z, bounds.max.z]) {
          point.set(x, y, z).project(camera);
          assert(Math.abs(point.x) < 1 && Math.abs(point.y) < 1 && Math.abs(point.z) < 1, 'All geometry bounds remain inside the initial view');
        }
      }
    }
    checkedFrames++;
  }
}
console.log(JSON.stringify({
  result: 'PASS',
  buildings: buildings.map((b) => b.name),
  voxels,
  materialBatches: materials,
  checkedCameraFrames: checkedFrames,
  bounds,
  elapsedMs: Math.round(performance.now() - start),
  note: 'Real Three.js geometry and framing smoke check; not a WebGL or visual acceptance test.',
}, null, 2));
const geometries = new Set();
for (const mesh of world.children) {
  geometries.add(mesh.geometry);
  mesh.material.dispose();
  mesh.dispose();
}
for (const geometry of geometries) geometry.dispose();
