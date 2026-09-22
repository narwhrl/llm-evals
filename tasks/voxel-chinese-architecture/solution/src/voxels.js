import * as THREE from "three";
import { Surface } from "./palette.js";

// Packed keys stay inside MAX_SAFE_INTEGER for the courtyard bounds.
const BIAS_X = 512;
const BIAS_Y = 64;
const BIAS_Z = 256;
const STRIDE_Y = 2048;
const STRIDE_Z = 2048 * 512;

export function pack(x, y, z) {
  return (x + BIAS_X) + (y + BIAS_Y) * STRIDE_Y + (z + BIAS_Z) * STRIDE_Z;
}

export function unpack(key) {
  const z = Math.floor(key / STRIDE_Z) - BIAS_Z;
  const remZ = key - (z + BIAS_Z) * STRIDE_Z;
  const y = Math.floor(remZ / STRIDE_Y) - BIAS_Y;
  const x = remZ - (y + BIAS_Y) * STRIDE_Y - BIAS_X;
  return { x, y, z };
}

export class VoxelVolume {
  constructor() {
    this.cells = new Map();
    this._capture = null;
  }

  beginCapture() {
    this._capture = [];
  }

  mirrorCapture() {
    const keys = this._capture;
    this._capture = null;
    if (!keys) return;
    for (const key of keys) {
      const { x, y, z } = unpack(key);
      if (x === 0) continue;
      const color = this.cells.get(key);
      if (color === undefined) continue;
      this.cells.set(pack(-x, y, z), color);
    }
  }

  set(x, y, z, color) {
    const key = pack(x, y, z);
    this.cells.set(key, color);
    if (this._capture) this._capture.push(key);
  }

  get(x, y, z) {
    return this.cells.get(pack(x, y, z));
  }

  fill(x, y, z, w, h, d, color) {
    for (let iy = 0; iy < h; iy++) {
      for (let iz = 0; iz < d; iz++) {
        for (let ix = 0; ix < w; ix++) {
          this.set(x + ix, y + iy, z + iz, color);
        }
      }
    }
  }

  fillSym(x, y, z, w, h, d, color) {
    this.fill(x, y, z, w, h, d, color);
    const mx = -x - w + 1;
    if (mx !== x) this.fill(mx, y, z, w, h, d, color);
  }

  carve(x, y, z, w, h, d) {
    for (let iy = 0; iy < h; iy++) {
      for (let iz = 0; iz < d; iz++) {
        for (let ix = 0; ix < w; ix++) {
          this.cells.delete(pack(x + ix, y + iy, z + iz));
        }
      }
    }
  }

  maxY(predicate) {
    let max = -Infinity;
    for (const key of this.cells.keys()) {
      const cell = unpack(key);
      if (cell.y > max && predicate(cell)) max = cell.y;
    }
    return max;
  }

  bounds() {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (const key of this.cells.keys()) {
      const { x, y, z } = unpack(key);
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }
    return { count: this.cells.size, minX, maxX, minY, maxY, minZ, maxZ };
  }
}

/**
 * Greedy box mesher. Same-color voxels grow into a run along X, then that run
 * merges through Z and Y into one axis-aligned box.
 */
export function greedyBoxes(volume) {
  const cells = volume.cells;
  const visited = new Set();
  const keys = [...cells.keys()].sort((a, b) => a - b);
  const boxes = [];

  for (const start of keys) {
    if (visited.has(start)) continue;
    const color = cells.get(start);
    const { x, y, z } = unpack(start);

    const same = (px, py, pz) => {
      const key = pack(px, py, pz);
      return !visited.has(key) && cells.get(key) === color;
    };

    let sx = 1;
    while (same(x + sx, y, z)) sx += 1;

    let sz = 1;
    while (rowMatches(x, y, z + sz, sx)) sz += 1;

    let sy = 1;
    while (slabMatches(x, y + sy, z, sx, sz)) sy += 1;

    for (let iy = 0; iy < sy; iy++) {
      for (let iz = 0; iz < sz; iz++) {
        for (let ix = 0; ix < sx; ix++) {
          visited.add(pack(x + ix, y + iy, z + iz));
        }
      }
    }

    boxes.push({ x, y, z, sx, sy, sz, color });

    function rowMatches(px, py, pz, length) {
      for (let ix = 0; ix < length; ix++) {
        if (!same(px + ix, py, pz)) return false;
      }
      return true;
    }

    function slabMatches(px, py, pz, lengthX, lengthZ) {
      for (let iz = 0; iz < lengthZ; iz++) {
        for (let ix = 0; ix < lengthX; ix++) {
          if (!same(px + ix, py, pz + iz)) return false;
        }
      }
      return true;
    }
  }

  return boxes;
}

export function createMeshes(volume) {
  const boxes = greedyBoxes(volume);
  const grouped = new Map();
  for (const box of boxes) {
    let list = grouped.get(box.color);
    if (!list) {
      list = [];
      grouped.set(box.color, list);
    }
    list.push(box);
  }

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials = [];
  const lanterns = [];
  const group = new THREE.Group();
  const dummy = new THREE.Object3D();

  for (const [color, list] of grouped) {
    const surface = Surface[color];
    if (!surface) {
      throw new Error(`Missing material for color ${color.toString(16)}`);
    }
    const { pulse, ...params } = surface;
    const material = new THREE.MeshStandardMaterial({
      color,
      ...params,
    });
    if (pulse) {
      material.userData.baseIntensity = material.emissiveIntensity;
      lanterns.push(material);
    }
    materials.push(material);

    const mesh = new THREE.InstancedMesh(geometry, material, list.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // Instance matrices sit far from the shared unit cube, so culling the
    // geometry bounds would drop entire colors.
    mesh.frustumCulled = false;
    for (let i = 0; i < list.length; i++) {
      const box = list[i];
      dummy.position.set(
        box.x + box.sx / 2,
        box.y + box.sy / 2,
        box.z + box.sz / 2,
      );
      dummy.scale.set(box.sx, box.sy, box.sz);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    group.add(mesh);
  }

  return { group, geometry, materials, lanterns, boxCount: boxes.length };
}
