import { BufferAttribute, BufferGeometry } from "three";

export function geometryFromBucket(bucket) {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(bucket.positions), 3));
  geometry.setAttribute("normal", new BufferAttribute(new Float32Array(bucket.normals), 3));
  geometry.setIndex(bucket.indices);
  geometry.computeBoundingSphere();
  return geometry;
}

export function mergeBoxes(boxes) {
  const positions = [];
  const normals = [];
  const indices = [];
  const corners = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 1],
  ];
  const faces = [
    { ids: [1, 2, 6, 5], n: [1, 0, 0] },
    { ids: [4, 7, 3, 0], n: [-1, 0, 0] },
    { ids: [3, 7, 6, 2], n: [0, 1, 0] },
    { ids: [0, 1, 5, 4], n: [0, -1, 0] },
    { ids: [4, 5, 6, 7], n: [0, 0, 1] },
    { ids: [1, 0, 3, 2], n: [0, 0, -1] },
  ];

  for (const box of boxes) {
    const local = corners.map((corner) => [
      box.x + corner[0] * box.sx,
      box.y + corner[1] * box.sy,
      box.z + corner[2] * box.sz,
    ]);
    for (const face of faces) {
      const base = positions.length / 3;
      for (const id of face.ids) {
        positions.push(local[id][0], local[id][1], local[id][2]);
        normals.push(face.n[0], face.n[1], face.n[2]);
      }
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
  }
  return { positions, normals, indices };
}
