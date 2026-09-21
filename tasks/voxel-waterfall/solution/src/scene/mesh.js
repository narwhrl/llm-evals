import { MATERIALS, materialAt, heightAt } from "./terrain.js";

const FACES = [
  { dir: [1, 0, 0], corners: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] },
  { dir: [-1, 0, 0], corners: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]] },
  { dir: [0, 1, 0], corners: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]] },
  { dir: [0, -1, 0], corners: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] },
  { dir: [0, 0, 1], corners: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]] },
  { dir: [0, 0, -1], corners: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]] },
];

function pushFace(bucket, x, y, z, face) {
  const [nx, ny, nz] = face.dir;
  const base = bucket.positions.length / 3;
  for (const corner of face.corners) {
    bucket.positions.push(x + corner[0], y + corner[1], z + corner[2]);
    bucket.normals.push(nx, ny, nz);
  }
  bucket.indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
}

function emptyBucket() {
  return { positions: [], normals: [], indices: [] };
}

export function buildTerrainMesh(terrain, options = {}) {
  const { size } = terrain;
  const stride = 1;
  void options;
  const buckets = new Map();
  const solid = (x, z, y) => {
    if (x < 0 || z < 0 || x >= size || z >= size) return false;
    return y < heightAt(terrain, x, z);
  };

  for (let z = 0; z < size; z += stride) {
    for (let x = 0; x < size; x += stride) {
      const top = heightAt(terrain, x, z);
      const material = materialAt(terrain, x, z);
      if (!buckets.has(material)) buckets.set(material, emptyBucket());
      const bucket = buckets.get(material);
      const y = top - 1;
      for (const face of FACES) {
        const [dx, dy, dz] = face.dir;
        const covered = dy === 1 ? false : dy === -1 ? y > 0 : solid(x + dx, z + dz, y);
        if (!covered) pushFace(bucket, x, y, z, face);
      }
    }
  }
  return buckets;
}

export function countQuads(buckets) {
  let quads = 0;
  for (const bucket of buckets.values()) quads += bucket.indices.length / 6;
  return quads;
}

export function exposedFaceCount(terrain) {
  return countQuads(buildTerrainMesh(terrain));
}

export const SURFACE_MATERIALS = [
  MATERIALS.bedrock,
  MATERIALS.dirt,
  MATERIALS.grass,
  MATERIALS.rock,
  MATERIALS.snow,
];
