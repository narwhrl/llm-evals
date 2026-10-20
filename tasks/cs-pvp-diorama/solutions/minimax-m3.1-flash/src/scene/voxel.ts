/**
 * Voxel geometry helpers for the diorama.
 *
 * Every prop is a box. The builder keeps two geometries in step: the lit
 * geometry and an expanded copy used for the ink outline, which is rendered
 * back-face first so it reads as a drawn contour around every silhouette.
 */

import * as THREE from "three";

export interface Builder {
  positions: number[];
  normals: number[];
  uvs: number[];
  colors: number[];
  oPositions: number[];
  oNormals: number[];
  oColors: number[];
}

export type Vec3 = [number, number, number];
export type Color = readonly number[];

export function createBuilder(): Builder {
  return {
    positions: [],
    normals: [],
    uvs: [],
    colors: [],
    oPositions: [],
    oNormals: [],
    oColors: [],
  };
}

const INV_SQRT3 = 1 / Math.sqrt(3);

/** Decodes an sRGB channel into the linear space the renderer uses. */
function toLinear(channel: number): number {
  return channel <= 0.04045
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function pushFace(
  b: Builder,
  p0: number[], p1: number[], p2: number[], p3: number[],
  n: number[],
  uv0: number[], uv1: number[], uv2: number[], uv3: number[],
  c: number[],
  o0: number[], o1: number[], o2: number[], o3: number[],
  on0: number[], on1: number[], on2: number[], on3: number[],
) {
  b.positions.push(p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2]);
  for (let i = 0; i < 4; i++) b.normals.push(n[0], n[1], n[2]);
  b.uvs.push(uv0[0], uv0[1], uv1[0], uv1[1], uv2[0], uv2[1], uv3[0], uv3[1]);
  for (let i = 0; i < 4; i++) b.colors.push(c[0], c[1], c[2]);

  b.oPositions.push(
    o0[0], o0[1], o0[2], o1[0], o1[1], o1[2], o2[0], o2[1], o2[2], o3[0], o3[1], o3[2],
  );
  b.oNormals.push(
    on0[0], on0[1], on0[2],
    on1[0], on1[1], on1[2],
    on2[0], on2[1], on2[2],
    on3[0], on3[1], on3[2],
  );
  for (let i = 0; i < 4; i++) b.oColors.push(c[0] * 0.25, c[1] * 0.25, c[2] * 0.25);
}

/**
 * Emits an axis aligned box.
 *
 * @param outline extra size of the ink shell, in world units
 */
export function pushBox(
  b: Builder,
  min: Vec3,
  max: Vec3,
  color: Color,
  outline = 0.016,
  skip?: Set<string>,
) {
  const skipSet = skip ?? new Set<string>();
  // The corners are ordered, so a box written back to front still faces out.
  const [x0, y0, z0] = [Math.min(min[0], max[0]), Math.min(min[1], max[1]), Math.min(min[2], max[2])];
  const [x1, y1, z1] = [Math.max(min[0], max[0]), Math.max(min[1], max[1]), Math.max(min[2], max[2])];
  // The palette is written the way a designer reads colour, so it is decoded
  // from sRGB into the linear space the renderer works in.
  const tint = [
    toLinear(color[0]),
    toLinear(color[1]),
    toLinear(color[2]),
  ];

  // The ink shell expands each corner along the box diagonal so the contour
  // is slightly rounded rather than a hard rectangle.
  // The shell is always a little larger, so it never fights with the surface it outlines.
  const e = Math.max(outline, 0.005);
  const c000 = [x0 - e * INV_SQRT3, y0 - e * INV_SQRT3, z0 - e * INV_SQRT3];
  const c100 = [x1 + e * INV_SQRT3, y0 - e * INV_SQRT3, z0 - e * INV_SQRT3];
  const c110 = [x1 + e * INV_SQRT3, y1 + e * INV_SQRT3, z0 - e * INV_SQRT3];
  const c010 = [x0 - e * INV_SQRT3, y1 + e * INV_SQRT3, z0 - e * INV_SQRT3];
  const c001 = [x0 - e * INV_SQRT3, y0 - e * INV_SQRT3, z1 + e * INV_SQRT3];
  const c101 = [x1 + e * INV_SQRT3, y0 - e * INV_SQRT3, z1 + e * INV_SQRT3];
  const c111 = [x1 + e * INV_SQRT3, y1 + e * INV_SQRT3, z1 + e * INV_SQRT3];
  const c011 = [x0 - e * INV_SQRT3, y1 + e * INV_SQRT3, z1 + e * INV_SQRT3];
  const diag = (sx: number, sy: number, sz: number) => [sx * INV_SQRT3, sy * INV_SQRT3, sz * INV_SQRT3];

  if (!skipSet.has("+y")) {
    pushFace(b,
      [x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0],
      [0, 1, 0],
      [x0, z0], [x0, z1], [x1, z1], [x1, z0],
      tint,
      c010, c011, c111, c110,
      diag(-1, 1, -1), diag(-1, 1, 1), diag(1, 1, 1), diag(1, 1, -1));
  }
  if (!skipSet.has("-y")) {
    pushFace(b,
      [x0, y0, z1], [x0, y0, z0], [x1, y0, z0], [x1, y0, z1],
      [0, -1, 0],
      [x0, z1], [x0, z0], [x1, z0], [x1, z1],
      tint,
      c001, c000, c100, c101,
      diag(-1, -1, 1), diag(-1, -1, -1), diag(1, -1, -1), diag(1, -1, 1));
  }
  if (!skipSet.has("+x")) {
    pushFace(b,
      [x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1],
      [1, 0, 0],
      [z1, y0], [z0, y0], [z0, y1], [z1, y1],
      tint,
      c101, c100, c110, c111,
      diag(1, -1, 1), diag(1, -1, -1), diag(1, 1, -1), diag(1, 1, 1));
  }
  if (!skipSet.has("-x")) {
    pushFace(b,
      [x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0],
      [-1, 0, 0],
      [z0, y0], [z1, y0], [z1, y1], [z0, y1],
      tint,
      c000, c001, c011, c010,
      diag(-1, -1, -1), diag(-1, -1, 1), diag(-1, 1, 1), diag(-1, 1, -1));
  }
  if (!skipSet.has("+z")) {
    pushFace(b,
      [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
      [0, 0, 1],
      [x0, y0], [x1, y0], [x1, y1], [x0, y1],
      tint,
      c001, c101, c111, c011,
      diag(-1, -1, 1), diag(1, -1, 1), diag(1, 1, 1), diag(-1, 1, 1));
  }
  if (!skipSet.has("-z")) {
    pushFace(b,
      [x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0],
      [0, 0, -1],
      [x1, y0], [x0, y0], [x0, y1], [x1, y1],
      tint,
      c100, c000, c010, c110,
      diag(1, -1, -1), diag(-1, -1, -1), diag(-1, 1, -1), diag(1, 1, -1));
  }
}

/** A flat plate that only has a top face; used for decals and paint. */
export function pushPlate(
  b: Builder,
  min: Vec3,
  max: Vec3,
  color: Color,
  outline = 0,
) {
  pushBox(b, min, max, color, outline, new Set(["-y", "+x", "-x", "+z", "-z"]));
}

export function buildGeometry(b: Builder): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(b.positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(b.normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(b.uvs, 2));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(b.colors, 3));
  const quadCount = b.positions.length / 12;
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

export function buildOutlineGeometry(b: Builder): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(b.oPositions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(b.oNormals, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(b.oColors, 3));
  const quadCount = b.oPositions.length / 12;
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
