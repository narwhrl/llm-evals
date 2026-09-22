import { BoxGeometry, Color, Group, InstancedMesh, Matrix4, MeshStandardMaterial } from "three";
import { BLOCKS, P, FAMILIES } from "./palette.js";

/** 邻接遮挡压暗强度：单盒六面被包夹越多，颜色略压暗，制造檐下与墙角的体积感。 */
export const AO_STRENGTH = 0.055;

const OUT_OF_BOUNDS = "体素越界";

/**
 * 定长体素网格。
 *
 * 作者约定：所有体量都写在 x ≥ 0 的半场里，x = 0 是中轴列；默认每次写入都会
 * 自动镜像出 x < 0 的一半，因此「中轴对称」是结构性保证而不是靠手工复制。
 * 需要四面对称（四角翘檐、斗拱转角等）时套一层 quadZ(cz)。
 */
export class VoxelWorld {
  constructor({ minX, minY, minZ, sizeX, sizeY, sizeZ }) {
    if ((sizeX & 1) === 0) throw new Error("sizeX 必须是奇数，才能让 x = 0 落在格子中心线上");
    this.minX = minX;
    this.minY = minY;
    this.minZ = minZ;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.sizeZ = sizeZ;
    this.maxX = minX + sizeX - 1;
    this.maxY = minY + sizeY - 1;
    this.maxZ = minZ + sizeZ - 1;
    this.cells = new Uint16Array(sizeX * sizeY * sizeZ);
    this.counters = new Uint32Array(sizeY);
    this.used = 0;
    this.layerUsed = this.counters;
    this.tight = { minX: sizeX, maxX: -1, minY: sizeY, maxY: -1, minZ: sizeZ, maxZ: -1 };
    this._zMirror = [];
  }

  index(x, y, z) {
    return ((y - this.minY) * this.sizeZ + (z - this.minZ)) * this.sizeX + (x - this.minX);
  }

  /** 禁止镜像的写作用域，用于少量不对称构件。 */
  once(fn) {
    this._zMirror.push(null);
    try {
      fn();
    } finally {
      this._zMirror.pop();
    }
  }

  /** 写作用域：围绕 z = cz 再镜像一份，配合默认 x 镜像即得四面对称。 */
  quadZ(cz, fn) {
    this._zMirror.push(cz);
    try {
      fn();
    } finally {
      this._zMirror.pop();
    }
  }

  get xMirror() {
    return this._zMirror.length === 0 || this._zMirror[this._zMirror.length - 1] !== null;
  }

  get(x, y, z) {
    if (!this.contains(x, y, z)) return 0;
    return this.cells[this.index(x, y, z)];
  }

  contains(x, y, z) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY && z >= this.minZ && z <= this.maxZ;
  }

  /** 写一个方块；越界直接抛错，避免出现「场景里少了东西但没人知道」的隐性故障。 */
  set(x, y, z, block) {
    if (!block) return this.clear(x, y, z);
    const mirrored = this.xMirror;
    this._write(x, y, z, block, false);
    if (mirrored && x !== 0) this._write(-x, y, z, block, true);
  }

  setIfEmpty(x, y, z, block) {
    if (this.get(x, y, z) === 0) this.set(x, y, z, block);
  }

  clear(x, y, z) {
    const mirrored = this.xMirror;
    this._write(x, y, z, 0, false);
    if (mirrored && x !== 0) this._write(-x, y, z, 0, true);
  }

  /** 实心长方体，范围是 [x0, x0 + w) × [y0, y0 + h) × [z0, z0 + d)。 */
  box(x0, y0, z0, w, h, d, block) {
    if (w <= 0 || h <= 0 || d <= 0) return;
    const mirrored = this.xMirror;
    // 镜像后的 x 区间是 [-x0 - w + 1, -x0]；跨越中轴时两次写入会重叠，重复写同一格是幂等的。
    const mx0 = -x0 - w + 1;
    for (let y = y0; y < y0 + h; y++) {
      for (let z = z0; z < z0 + d; z++) {
        for (let x = x0; x < x0 + w; x++) this._write(x, y, z, block, false);
        if (mirrored) for (let x = mx0; x <= -x0; x++) this._write(x, y, z, block, true);
      }
    }
  }

  /** 单层平板。 */
  plate(y, x0, z0, w, d, block) {
    this.box(x0, y, z0, w, 1, d, block);
  }

  /** 挖空长方体。 */
  clearBox(x0, y0, z0, w, h, d) {
    this.box(x0, y0, z0, w, h, d, 0);
  }

  /**
   * 空心矩形墙圈（四边封闭、中间空），用于院墙、台基裙边、圈梁。
   * thickness 为墙厚，向内增厚。
   */
  ring(x0, y0, z0, w, h, d, thickness, block) {
    const t = Math.max(1, Math.min(thickness, Math.floor(Math.min(w, d) / 2)));
    this.box(x0, y0, z0, w, h, t, block);
    this.box(x0, y0, z0 + d - t, w, h, t, block);
    this.box(x0, y0, z0 + t, t, h, d - 2 * t, block);
    this.box(x0 + w - t, y0, z0 + t, t, h, d - 2 * t, block);
  }

  /** 单行。 */
  rowX(y, z, x0, x1, block) {
    this.box(x0, y, z, x1 - x0 + 1, 1, 1, block);
  }

  rowZ(y, x, z0, z1, block) {
    this.box(x, y, z0, 1, 1, z1 - z0 + 1, block);
  }

  _write(x, y, z, block, mirrored, skipZMirror = false) {
    if (!this.contains(x, y, z) || !this.contains(-x, y, z)) {
      throw new Error(`${OUT_OF_BOUNDS}${mirrored ? "（镜像写入）" : ""}：(${x}, ${y}, ${z})`);
    }
    const i = this.index(x, y, z);
    const prev = this.cells[i];
    if (prev === block) return;
    if (prev === 0 && block !== 0) {
      this.used++;
      this.counters[y - this.minY]++;
      const t = this.tight;
      if (x < t.minX) t.minX = x;
      if (x > t.maxX) t.maxX = x;
      if (y < t.minY) t.minY = y;
      if (y > t.maxY) t.maxY = y;
      if (z < t.minZ) t.minZ = z;
      if (z > t.maxZ) t.maxZ = z;
    } else if (prev !== 0 && block === 0) {
      this.used--;
      this.counters[y - this.minY]--;
    }
    this.cells[i] = block;
    if (skipZMirror) return;
    const cz = this._zMirror[this._zMirror.length - 1];
    if (typeof cz === "number") this._write(x, y, 2 * cz - z, block, mirrored, true);
  }
}

const SAMPLE_CACHE = new Map();

function sampleOffsets(extent) {
  let cached = SAMPLE_CACHE.get(extent);
  if (cached) return cached;
  let offsets;
  if (extent <= 1) offsets = [0];
  else if (extent === 2) offsets = [0, 1];
  else offsets = [0, 1, extent >> 1, extent - 2, extent - 1];
  SAMPLE_CACHE.set(extent, offsets);
  return offsets;
}

/** 采样估算盒体被邻接体素包夹的比例（0 ~ 1），用于轻量 AO。 */
function enclosureRatio(world, x, y, z, w, h, d) {
  let covered = 0;
  let total = 0;
  const sample = (sx, sy, sz) => {
    total++;
    if (world.get(sx, sy, sz) !== 0) covered++;
  };
  const ox = sampleOffsets(w);
  const oy = sampleOffsets(h);
  const oz = sampleOffsets(d);
  for (const a of ox) {
    for (const b of oy) {
      sample(x + a, y - 1, z + b);
      sample(x + a, y + h, z + b);
    }
  }
  for (const a of ox) {
    for (const b of oz) {
      sample(x + a, y + b, z - 1);
      sample(x + a, y + b, z + d);
    }
  }
  for (const a of oy) {
    for (const b of oz) {
      sample(x - 1, y + a, z + b);
      sample(x + w, y + a, z + b);
    }
  }
  return total === 0 ? 0 : covered / total;
}

/**
 * 3D 贪心合并：把同色且相邻的体素并成最大长方体。
 * 实心台基、整层铺装、长墙因此从数万格降为几十个盒子，
 * 内部面也顺带消失，无需再做隐藏面剔除。
 */
export function mergeVoxels(world, { ao = AO_STRENGTH } = {}) {
  const { cells, sizeX } = world;
  const t = world.tight;
  const boxes = [];
  if (t.maxX < 0) return boxes;
  const visited = new Uint8Array(cells.length);
  const index = (x, y, z) => ((y - world.minY) * world.sizeZ + (z - world.minZ)) * sizeX + (x - world.minX);

  for (let y = t.minY; y <= t.maxY; y++) {
    if (world.counters[y - world.minY] === 0) continue;
    for (let z = t.minZ; z <= t.maxZ; z++) {
      for (let x = t.minX; x <= t.maxX; x++) {
        const i0 = index(x, y, z);
        const block = cells[i0];
        if (block === 0 || visited[i0]) continue;

        let w = 1;
        while (x + w <= t.maxX) {
          const i = index(x + w, y, z);
          if (visited[i] || cells[i] !== block) break;
          w++;
        }

        let h = 1;
        growY: while (y + h <= t.maxY) {
          for (let dx = 0; dx < w; dx++) {
            const i = index(x + dx, y + h, z);
            if (visited[i] || cells[i] !== block) break growY;
          }
          h++;
        }

        let d = 1;
        growZ: while (z + d <= t.maxZ) {
          for (let dy = 0; dy < h; dy++) {
            for (let dx = 0; dx < w; dx++) {
              const i = index(x + dx, y + dy, z + d);
              if (visited[i] || cells[i] !== block) break growZ;
            }
          }
          d++;
        }

        for (let dy = 0; dy < h; dy++) {
          for (let dz = 0; dz < d; dz++) {
            const base = index(x, y + dy, z + dz);
            for (let dx = 0; dx < w; dx++) visited[base + dx] = 1;
          }
        }

        boxes.push({
          x,
          y,
          z,
          w,
          h,
          d,
          block,
          dim: ao > 0 ? ao * enclosureRatio(world, x, y, z, w, h, d) : 0,
        });
      }
    }
  }
  return boxes;
}

const scratchMatrix = new Matrix4();
const scratchColor = new Color();

function createMaterial(family) {
  const preset = FAMILIES[family];
  const material = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: preset.roughness,
    metalness: preset.metalness,
  });
  if (preset.transparent) {
    material.transparent = true;
    material.opacity = preset.opacity;
  }
  if (preset.emissive !== undefined) {
    material.emissive = new Color(preset.emissive);
    material.emissiveIntensity = preset.emissiveIntensity ?? 1;
  }
  material.name = family;
  return material;
}

/**
 * 把体素网格编译成一组实例化网格：每个材质族一个 InstancedMesh，
 * 每实例带位置、尺寸与颜色，全场景 draw call 数等于实际用到的族数。
 */
export function compileVoxels(world, options = {}) {
  const boxes = mergeVoxels(world, options);
  const buckets = new Map();
  for (const box of boxes) {
    const family = BLOCKS[box.block].family;
    let list = buckets.get(family);
    if (!list) buckets.set(family, (list = []));
    list.push(box);
  }

  const group = new Group();
  group.name = "voxels";
  const geometry = new BoxGeometry(1, 1, 1);
  const materials = new Map();
  const stats = { voxels: world.used, boxes: boxes.length, families: 0, instances: 0, triangles: 0 };

  for (const [family, list] of buckets) {
    const material = createMaterial(family);
    materials.set(family, material);
    const mesh = new InstancedMesh(geometry, material, list.length);
    mesh.name = `voxels:${family}`;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    for (let i = 0; i < list.length; i++) {
      const box = list[i];
      scratchMatrix.makeScale(box.w, box.h, box.d);
      scratchMatrix.setPosition(box.x + box.w / 2, box.y + box.h / 2, box.z + box.d / 2);
      mesh.setMatrixAt(i, scratchMatrix);
      scratchColor.copy(BLOCKS[box.block].color);
      if (box.dim > 0) scratchColor.multiplyScalar(1 - box.dim);
      mesh.setColorAt(i, scratchColor);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    // InstancedMesh 的默认包围球只覆盖几何体本体，必须按实例重算，否则会被错误剔除。
    mesh.computeBoundingSphere();
    group.add(mesh);
    stats.families++;
    stats.instances += list.length;
    stats.triangles += list.length * 12;
  }

  return { group, stats, materials, geometry, boxes };
}

/** 释放一组实例化网格占用的 GPU 资源。 */
export function disposeVoxels(compiled) {
  if (!compiled) return;
  compiled.geometry.dispose();
  for (const material of compiled.materials.values()) material.dispose();
  for (const child of compiled.group.children) child.dispose();
  compiled.group.clear();
}

export { P };
