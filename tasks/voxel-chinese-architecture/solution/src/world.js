import * as THREE from 'three';

const key = (x, y, z) => x + ',' + y + ',' + z;

/**
 * 稀疏体素世界。整数坐标即体素中心；y=0 层的底面贴在草地平面 (y=-0.5) 上。
 * 收集完所有体素后调用 buildMeshes()，只把至少有一个空邻域的"暴露"体素
 * 写入 InstancedMesh，被完全包裹的内部体素直接丢弃。
 */
export class VoxelWorld {
  constructor() {
    this.voxels = new Map(); // key -> { c: hex, g: glow? }
    this.count = 0;
  }

  set(x, y, z, color, glow = false) {
    if (!Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z)) {
      throw new Error(`voxel coords must be integers, got ${x},${y},${z}`);
    }
    if (!this.voxels.has(key(x, y, z))) this.count++;
    this.voxels.set(key(x, y, z), glow ? { c: color, g: true } : { c: color });
  }

  has(x, y, z) {
    return this.voxels.has(key(x, y, z));
  }

  clear(x, y, z) {
    if (this.voxels.delete(key(x, y, z))) this.count--;
  }

  /** 闭合长方体填充（坐标含端点，自动按分量排序）。 */
  box(x0, y0, z0, x1, y1, z1, color, glow = false) {
    const [xa, xb] = [Math.min(x0, x1), Math.max(x0, x1)];
    const [ya, yb] = [Math.min(y0, y1), Math.max(y0, y1)];
    const [za, zb] = [Math.min(z0, z1), Math.max(z0, z1)];
    for (let x = xa; x <= xb; x++)
      for (let y = ya; y <= yb; y++)
        for (let z = za; z <= zb; z++) this.set(x, y, z, color, glow);
  }

  /** 1 个体素深的矩形环（俯视外框），用于栏檐 / 平台边。 */
  ring(x0, y0, z0, x1, y1, z1, color, glow = false) {
    const [xa, xb] = [Math.min(x0, x1), Math.max(x0, x1)];
    const [za, zb] = [Math.min(z0, z1), Math.max(z0, z1)];
    for (let x = xa; x <= xb; x++) {
      this.set(x, y0, za, color, glow);
      this.set(x, y0, zb, color, glow);
    }
    for (let z = za; z <= zb; z++) {
      this.set(xa, y0, z, color, glow);
      this.set(xb, y0, z, color, glow);
    }
  }

  buildMeshes() {
    const lit = [];
    const glow = [];
    for (const [k, v] of this.voxels) {
      const [x, y, z] = k.split(',').map(Number);
      const exposed =
        !this.voxels.has(key(x + 1, y, z)) ||
        !this.voxels.has(key(x - 1, y, z)) ||
        !this.voxels.has(key(x, y + 1, z)) ||
        !this.voxels.has(key(x, y - 1, z)) ||
        !this.voxels.has(key(x, y, z + 1)) ||
        !this.voxels.has(key(x, y, z - 1));
      if (exposed) (v.g ? glow : lit).push([x, y, z, v.c]);
    }

    const geo = new THREE.BoxGeometry(1, 1, 1);
    const meshes = [];
    const make = (list, material, shadows) => {
      if (list.length === 0) return;
      const mesh = new THREE.InstancedMesh(geo, material, list.length);
      const m = new THREE.Matrix4();
      const col = new THREE.Color();
      for (let i = 0; i < list.length; i++) {
        const [x, y, z, c] = list[i];
        m.makeTranslation(x, y, z);
        mesh.setMatrixAt(i, m);
        mesh.setColorAt(i, jitter(c, x, y, z, col));
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.castShadow = shadows;
      mesh.receiveShadow = shadows;
      mesh.frustumCulled = false;
      meshes.push(mesh);
    };

    make(lit, new THREE.MeshLambertMaterial(), true);
    // 灯笼 / 灯火类自发光体素：不受光照，也不投影。
    make(glow, new THREE.MeshBasicMaterial({ toneMapped: false }), false);
    return meshes;
  }
}

/** 基于坐标哈希的确定性微抖动，给大面积同色体素一层 Minecraft 式颗粒感。 */
function jitter(hex, x, y, z, out) {
  let h = (x * 374761393 + y * 668265263 + z * 1274126177) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  const f = ((h >>> 16) & 0xff) / 255;
  out.setHex(hex);
  out.offsetHSL(0, 0, (f - 0.5) * 0.07);
  return out;
}
