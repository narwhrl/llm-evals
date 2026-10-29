import * as THREE from 'three';

// 体素世界的统一尺度与配色。所有几何体都是边长 1 的立方体，
// 通过合并（InstancedMesh）把上万个体素压成少量绘制调用。

export const VOXEL = 1;

export const PALETTE = {
  ground: 0x6f7a55,
  grass: 0x5f6f4a,
  grassLight: 0x74855a,
  dirt: 0x6a5742,
  paving: 0x9a958a,
  pavingDark: 0x7d786f,
  pavingLight: 0xb3ada0,
  marble: 0xd8d2c4,
  marbleDark: 0xbdb6a6,
  wallRed: 0xa3342b,
  wallRedDark: 0x872a23,
  plaster: 0xe6dcc4,
  wood: 0x8a5a33,
  woodDark: 0x5f3c22,
  woodLight: 0xa9743f,
  tileGreen: 0x35704f,
  tileGreenDark: 0x2b6047,
  tileGold: 0xc39a44,
  tileGoldDark: 0xb28c3e,
  tileGrey: 0x6c7078,
  tileGreyDark: 0x555961,
  stone: 0x8d8a82,
  stoneDark: 0x6f6c66,
  stoneLight: 0xa8a49a,
  lantern: 0xd8432c,
  lanternGlow: 0xffc46b,
  gold: 0xd8b24a,
  black: 0x24211d,
  window: 0x3b3a34,
  water: 0x35505c,
  pine: 0x33503a,
  pineLight: 0x436a45,
  trunk: 0x4d3a28,
  lion: 0xbdb7a8,
};

const materialCache = new Map();

export function voxelMaterial(color) {
  let mat = materialCache.get(color);
  if (!mat) {
    mat = new THREE.MeshLambertMaterial({ color });
    materialCache.set(color, mat);
  }
  return mat;
}

const boxGeometry = new THREE.BoxGeometry(VOXEL, VOXEL, VOXEL);

/**
 * 按颜色累积体素坐标，最后一次性生成 InstancedMesh。
 * 每栋建筑各自持有一个 Batch，方便整体定位与开关。
 */
export class Batch {
  constructor(scale = 1) {
    this.scale = scale;
    this.buckets = new Map();
  }

  add(color, x, y, z) {
    const key = color;
    let list = this.buckets.get(key);
    if (!list) {
      list = [];
      this.buckets.set(key, list);
    }
    list.push(x, y, z);
    return this;
  }

  // 实心长方体：x/z 为水平范围，y 为竖直范围（含端点）。
  fill(color, x0, x1, y0, y1, z0, z1) {
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x += 1) {
      for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y += 1) {
        for (let z = Math.min(z0, z1); z <= Math.max(z0, z1); z += 1) {
          this.add(color, x, y, z);
        }
      }
    }
    return this;
  }

  // 空心盒体：只保留外表面，省下大量内部体素。
  shell(color, x0, x1, y0, y1, z0, z1) {
    for (let x = x0; x <= x1; x += 1) {
      for (let y = y0; y <= y1; y += 1) {
        for (let z = z0; z <= z1; z += 1) {
          const edge =
            x === x0 || x === x1 || y === y0 || y === y1 || z === z0 || z === z1;
          if (edge) this.add(color, x, y, z);
        }
      }
    }
    return this;
  }

  // 水平矩形（地面铺装用）。
  plate(color, x0, x1, y, z0, z1) {
    for (let x = x0; x <= x1; x += 1) {
      for (let z = z0; z <= z1; z += 1) {
        this.add(color, x, y, z);
      }
    }
    return this;
  }

  get count() {
    let n = 0;
    for (const list of this.buckets.values()) n += list.length / 3;
    return n;
  }

  build({ castShadow = true, receiveShadow = true } = {}) {
    const group = new THREE.Group();
    const matrix = new THREE.Matrix4();
    for (const [color, list] of this.buckets) {
      const instanced = new THREE.InstancedMesh(
        boxGeometry,
        voxelMaterial(color),
        list.length / 3,
      );
      for (let i = 0; i < list.length; i += 3) {
        matrix.makeTranslation(list[i] * this.scale, list[i + 1] * this.scale, list[i + 2] * this.scale);
        instanced.setMatrixAt(i / 3, matrix);
      }
      instanced.instanceMatrix.needsUpdate = true;
      instanced.castShadow = castShadow;
      instanced.receiveShadow = receiveShadow;
      group.add(instanced);
    }
    return group;
  }
}
