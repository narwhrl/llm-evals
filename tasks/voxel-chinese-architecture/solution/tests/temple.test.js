import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Box3, Matrix4 } from 'three';
import { buildTemple, layout, roofHeight, VoxelBatch } from '../src/temple.js';

test('seven buildings have a dominant axial main hall and mirrored side halls and towers', () => {
  assert.equal(layout.length, 7);
  const main = layout.find((b) => b.id === 'main-hall');
  assert.equal(main.x, 0);
  for (const building of layout.filter((b) => b.kind !== 'tower' && b !== main)) {
    assert.ok(main.width * main.depth > building.width * building.depth);
  }
  for (const ids of [['east-hall', 'west-hall'], ['bell-tower', 'drum-tower']]) {
    const [a, b] = ids.map((id) => layout.find((building) => building.id === id));
    assert.equal(a.x, -b.x);
    assert.equal(a.z, b.z);
    assert.equal(a.width, b.width);
    assert.equal(a.depth, b.depth);
  }
  assert.ok(layout.find((b) => b.kind === 'gate').z > main.z);
});

test('side-hall entrances face inward toward the courtyard', () => {
  for (const building of layout.filter((b) => b.id === 'east-hall' || b.id === 'west-hall')) {
    assert.ok(building.x * Math.sin(building.rotation) < 0);
  }
});

test('roof has a raised ridge and visibly lifted corners', () => {
  const middle = roofHeight(0, 0, 30, 18, 4);
  const eave = roofHeight(0, 8.75, 30, 18, 4);
  const corner = roofHeight(14.75, 8.75, 30, 18, 4);
  assert.ok(middle > corner);
  assert.ok(corner > eave + 0.75);
});

test('voxel geometry is deterministic, bounded and batched', () => {
  const scene = buildTemple({ labels: false });
  assert.equal(scene.userData.buildingCount, 7);
  assert.ok(scene.userData.voxelCount > 25000);
  assert.equal(scene.children.length, 2);
  const bounds = new Box3().setFromObject(scene);
  assert.ok(bounds.min.x >= -43 && bounds.max.x <= 43);
  assert.ok(bounds.min.z >= -46 && bounds.max.z <= 46);
  assert.ok(bounds.max.y > 19);
  const second = buildTemple({ labels: false });
  assert.equal(second.userData.voxelCount, scene.userData.voxelCount);
  assert.deepEqual(Array.from(second.children[0].instanceMatrix.array), Array.from(scene.children[0].instanceMatrix.array));
});

test('mountain gate provides a traversable central opening through both facades', () => {
  const scene = buildTemple({ labels: false });
  const mesh = scene.children[0];
  const matrix = new Matrix4();
  for (let i = 0; i < mesh.count; i++) {
    mesh.getMatrixAt(i, matrix);
    const elements = matrix.elements;
    const [x, y, z] = [elements[12], elements[13], elements[14]];
    const [w, h, d] = [elements[0], elements[5], elements[10]];
    const blocksPath = Math.abs(x) < w / 2 + 0.1 && y - h / 2 < 3 && y + h / 2 > 1.2
      && z + d / 2 > 27.1 && z - d / 2 < 32.5;
    assert.equal(blocksPath, false, `Block ${i} obstructs the gate at ${x},${y},${z}`);
  }
});

test('voxel builder rejects invalid dimensions', () => {
  const batch = new VoxelBatch();
  assert.throws(() => batch.box(0, 0, 0, -1, 1, 1, '#fff'));
  assert.throws(() => batch.box(NaN, 0, 0, 1, 1, 1, '#fff'));
});
