import * as THREE from 'three';
import { PALETTE } from './constants.js';

function faceShade(nx, ny, nz) {
  if (ny > 0) return 1;
  if (ny < 0) return 0.52;
  if (nx !== 0) return 0.7;
  return 0.82;
}

function tintFrom(x, y, z) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return (n - Math.floor(n)) * 0.06 - 0.03;
}

function greedyQuads(dims, sample) {
  const quads = [];
  const [sx, sy, sz] = dims;

  for (let d = 0; d < 3; d += 1) {
    const u = (d + 1) % 3;
    const v = (d + 2) % 3;
    const x = [0, 0, 0];
    const q = [0, 0, 0];
    q[d] = 1;
    const mask = new Int32Array(dims[u] * dims[v]);

    for (x[d] = -1; x[d] < dims[d]; ) {
      let n = 0;
      for (x[v] = 0; x[v] < dims[v]; x[v] += 1) {
        for (x[u] = 0; x[u] < dims[u]; x[u] += 1, n += 1) {
          const a = sample(x[0], x[1], x[2]);
          const b = sample(x[0] + q[0], x[1] + q[1], x[2] + q[2]);
          if (Boolean(a) === Boolean(b)) mask[n] = 0;
          else if (a) mask[n] = a;
          else mask[n] = -b;
        }
      }

      x[d] += 1;
      n = 0;
      for (let j = 0; j < dims[v]; j += 1) {
        for (let i = 0; i < dims[u]; ) {
          const c = mask[n];
          if (c) {
            let w = 1;
            while (i + w < dims[u] && mask[n + w] === c) w += 1;
            let h = 1;
            let done = false;
            while (j + h < dims[v]) {
              for (let k = 0; k < w; k += 1) {
                if (mask[n + k + h * dims[u]] !== c) {
                  done = true;
                  break;
                }
              }
              if (done) break;
              h += 1;
            }

            x[u] = i;
            x[v] = j;
            const du = [0, 0, 0];
            const dv = [0, 0, 0];
            if (c > 0) {
              du[u] = w;
              dv[v] = h;
            } else {
              dv[u] = w;
              du[v] = h;
            }

            quads.push({
              type: Math.abs(c),
              x: x[0],
              y: x[1],
              z: x[2],
              dx0: du[0],
              dy0: du[1],
              dz0: du[2],
              dx1: dv[0],
              dy1: dv[1],
              dz1: dv[2],
              nx: c > 0 ? q[0] : -q[0],
              ny: c > 0 ? q[1] : -q[1],
              nz: c > 0 ? q[2] : -q[2],
            });

            for (let l = 0; l < h; l += 1) {
              for (let k = 0; k < w; k += 1) mask[n + k + l * dims[u]] = 0;
            }
            i += w;
            n += w;
          } else {
            i += 1;
            n += 1;
          }
        }
      }
    }
  }

  return quads;
}

function quadsToGeometry(quads, origin, colorOf) {
  const positions = [];
  const normals = [];
  const colors = [];
  const indices = [];

  for (let i = 0; i < quads.length; i += 1) {
    const q = quads[i];
    const shade = faceShade(q.nx, q.ny, q.nz);
    const tint = tintFrom(q.x, q.y, q.z);
    const base = colorOf(q.type, q.x, q.y, q.z);
    const r = Math.min(1, Math.max(0, base[0] + tint)) * shade;
    const g = Math.min(1, Math.max(0, base[1] + tint)) * shade;
    const b = Math.min(1, Math.max(0, base[2] + tint)) * shade;
    const v0 = [origin[0] + q.x, origin[1] + q.y, origin[2] + q.z];
    const v1 = [v0[0] + q.dx0, v0[1] + q.dy0, v0[2] + q.dz0];
    const v2 = [v0[0] + q.dx0 + q.dx1, v0[1] + q.dy0 + q.dy1, v0[2] + q.dz0 + q.dz1];
    const v3 = [v0[0] + q.dx1, v0[1] + q.dy1, v0[2] + q.dz1];
    const baseIndex = positions.length / 3;
    positions.push(...v0, ...v1, ...v2, ...v3);
    for (let k = 0; k < 4; k += 1) {
      normals.push(q.nx, q.ny, q.nz);
      colors.push(r, g, b);
    }
    indices.push(baseIndex, baseIndex + 1, baseIndex + 2, baseIndex, baseIndex + 2, baseIndex + 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

export function meshBySampler(dims, sample, origin, colorOf) {
  return quadsToGeometry(greedyQuads(dims, sample), origin, colorOf);
}

export function meshSolid(world) {
  return meshBySampler(
    [world.size, world.height, world.size],
    (x, y, z) => world.getType(x, y, z),
    [-world.size / 2, 0, -world.size / 2],
    (type) => PALETTE[type] || PALETTE[3],
  );
}


export function meshWater(voxels, size, color) {
  if (!voxels.length) return new THREE.BufferGeometry();
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  const set = new Set();
  for (let i = 0; i < voxels.length; i += 1) {
    const v = voxels[i];
    set.add(`${v.x},${v.y},${v.z}`);
    if (v.x < minX) minX = v.x;
    if (v.y < minY) minY = v.y;
    if (v.z < minZ) minZ = v.z;
    if (v.x > maxX) maxX = v.x;
    if (v.y > maxY) maxY = v.y;
    if (v.z > maxZ) maxZ = v.z;
  }
  return meshBySampler(
    [maxX - minX + 1, maxY - minY + 1, maxZ - minZ + 1],
    (x, y, z) => (set.has(`${x + minX},${y + minY},${z + minZ}`) ? 1 : 0),
    [-size / 2 + minX, minY, -size / 2 + minZ],
    () => color,
  );
}
