/**
 * Shared voxel geometry helpers.
 *
 * Every box in the scene is emitted with world-projected UVs: horizontal
 * faces use their world X/Z coordinates, vertical faces use X/Y or Z/Y. One
 * texture tile therefore always covers one world unit, which keeps the block
 * grain continuous across separate boxes.
 *
 * Quads are stored as four unique vertices and stitched together by an index
 * buffer in `toGeometry`, which halves the vertex count compared with
 * duplicating the corners of every triangle.
 */

import * as THREE from "three";

export interface MeshBuffers {
  positions: number[];
  normals: number[];
  uvs: number[];
  colors: number[];
}

export function createBuffers(): MeshBuffers {
  return { positions: [], normals: [], uvs: [], colors: [] };
}

export function pushQuad(
  buf: MeshBuffers,
  p0: number[], p1: number[], p2: number[], p3: number[],
  n: number[],
  uv0: number[], uv1: number[], uv2: number[], uv3: number[],
  c0: number[], c1: number[], c2: number[], c3: number[],
) {
  buf.positions.push(p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2]);
  for (let i = 0; i < 4; i++) buf.normals.push(n[0], n[1], n[2]);
  buf.uvs.push(uv0[0], uv0[1], uv1[0], uv1[1], uv2[0], uv2[1], uv3[0], uv3[1]);
  buf.colors.push(c0[0], c0[1], c0[2], c1[0], c1[1], c1[2], c2[0], c2[1], c2[2], c3[0], c3[1], c3[2]);
}

/**
 * Emits an axis aligned box.
 *
 * @param min lower corner of the box
 * @param max upper corner of the box
 * @param color rgb triple used for every face of the box
 * @param skip optional set of face names to omit (`+x`, `-x`, `+y`, `-y`, `+z`, `-z`)
 */
export function pushBox(
  buf: MeshBuffers,
  min: number[],
  max: number[],
  color: number[],
  skip?: Set<string>,
) {
  const skipSet = skip ?? new Set<string>();
  const [x0, y0, z0] = min;
  const [x1, y1, z1] = max;

  if (!skipSet.has("+y")) {
    pushQuad(buf,
      [x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0],
      [0, 1, 0],
      [x0, z0], [x0, z1], [x1, z1], [x1, z0],
      color, color, color, color);
  }
  if (!skipSet.has("-y")) {
    pushQuad(buf,
      [x0, y0, z1], [x0, y0, z0], [x1, y0, z0], [x1, y0, z1],
      [0, -1, 0],
      [x0, z1], [x0, z0], [x1, z0], [x1, z1],
      color, color, color, color);
  }
  if (!skipSet.has("+x")) {
    pushQuad(buf,
      [x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1],
      [1, 0, 0],
      [z1, y0], [z0, y0], [z0, y1], [z1, y1],
      color, color, color, color);
  }
  if (!skipSet.has("-x")) {
    pushQuad(buf,
      [x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0],
      [-1, 0, 0],
      [z0, y0], [z1, y0], [z1, y1], [z0, y1],
      color, color, color, color);
  }
  if (!skipSet.has("+z")) {
    pushQuad(buf,
      [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
      [0, 0, 1],
      [x0, y0], [x1, y0], [x1, y1], [x0, y1],
      color, color, color, color);
  }
  if (!skipSet.has("-z")) {
    pushQuad(buf,
      [x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0],
      [0, 0, -1],
      [x1, y0], [x0, y0], [x0, y1], [x1, y1],
      color, color, color, color);
  }
}

export function toGeometry(buf: MeshBuffers): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(buf.positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(buf.normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(buf.uvs, 2));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(buf.colors, 3));

  const quadCount = buf.positions.length / 12;
  const index = new Uint32Array(quadCount * 6);
  for (let q = 0; q < quadCount; q++) {
    const v = q * 4;
    const o = q * 6;
    index[o] = v;
    index[o + 1] = v + 1;
    index[o + 2] = v + 2;
    index[o + 3] = v;
    index[o + 4] = v + 2;
    index[o + 5] = v + 3;
  }
  geometry.setIndex(new THREE.BufferAttribute(index, 1));
  geometry.computeBoundingSphere();
  return geometry;
}
