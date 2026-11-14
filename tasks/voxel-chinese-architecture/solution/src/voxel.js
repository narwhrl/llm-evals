import * as THREE from 'three';

// 色板：宫墙红 / 琉璃瓦 / 木构 / 汉白玉 / 铺装 / 草地
export const C = {
  WALL: '#a93226',      // 宫墙红
  COL: '#8e2a1f',       // 柱子深红
  BEAM: '#5d3a1e',      // 木梁深棕
  DOOR: '#3f2413',      // 门深棕
  TRIM: '#c9962e',      // 金色饰边
  PLAQUE: '#1f3a5f',    // 匾额藏青
  TILE_Y: '#d9a419',    // 主殿黄色琉璃瓦
  TILE_T: '#2f7a6e',    // 配殿绿色琉璃瓦
  RIDGE: '#e8b62c',     // 屋脊金黄
  MARBLE: '#cfd4d6',    // 台基汉白玉
  MARBLE_D: '#aeb6ba',  // 台基暗面
  PAVE: '#a7adb1',      // 庭院铺装
  ROAD: '#8b9094',      // 道路
  ROADC: '#6e7478',     // 路缘
  GRASS: '#5da24a',     // 草地
  GRASS_D: '#4d8a3c',   // 草地暗斑
  TRUNK: '#6b4423',     // 树干
  LEAF: '#3f8f3a',      // 叶
  LEAF_D: '#357a30',    // 叶暗
  STONE: '#9aa0a3',     // 石狮/石灯
  BRONZE: '#8a6d2f',    // 铜钟
  DRUM: '#b03a2e',      // 鼓红
  PAPER: '__paper',     // 窗纸（微发光）
  LAMP: '__lamp',       // 灯笼（发光红）
  CLOUD: '#fdf6ea',     // 云
};

const matCache = new Map();

export function materialFor(key) {
  let m = matCache.get(key);
  if (m) return m;
  if (key === C.LAMP) {
    m = new THREE.MeshStandardMaterial({ color: '#e0331b', emissive: '#ff2d08', emissiveIntensity: 0.85, roughness: 0.6 });
  } else if (key === C.PAPER) {
    m = new THREE.MeshStandardMaterial({ color: '#f3e2b3', emissive: '#ffca7a', emissiveIntensity: 0.35, roughness: 0.9 });
  } else {
    m = new THREE.MeshStandardMaterial({ color: key, roughness: 0.92, metalness: 0.0 });
  }
  matCache.set(key, m);
  return m;
}

/**
 * 体素收集器：按颜色分组，build() 时每组一个 InstancedMesh。
 * 坐标为体素中心（整数格点），sx/sy/sz 为该体素块尺寸。
 */
export class Voxels {
  constructor() {
    this.groups = new Map();
    this.count = 0;
  }

  add(x, y, z, color, sx = 1, sy = 1, sz = 1) {
    let g = this.groups.get(color);
    if (!g) {
      g = [];
      this.groups.set(color, g);
    }
    g.push([x, y, z, sx, sy, sz]);
    this.count++;
  }

  /** 闭区间整数填充 */
  fill(x0, x1, y0, y1, z0, z1, color) {
    const xa = Math.min(x0, x1);
    const xb = Math.max(x0, x1);
    const za = Math.min(z0, z1);
    const zb = Math.max(z0, z1);
    for (let x = xa; x <= xb; x++) {
      for (let y = y0; y <= y1; y++) {
        for (let z = za; z <= zb; z++) {
          this.add(x, y, z, color);
        }
      }
    }
  }

  /** 中心盒：(cx,cy,cz) 中心，w/h/d 尺寸 */
  box(cx, cy, cz, w, h, d, color) {
    this.add(cx, cy, cz, color, w, h, d);
  }

  build(shadow = true) {
    const group = new THREE.Group();
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const m = new THREE.Matrix4();
    for (const [color, cells] of this.groups) {
      const inst = new THREE.InstancedMesh(geo, materialFor(color), cells.length);
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        m.makeScale(c[3], c[4], c[5]);
        m.setPosition(c[0], c[1], c[2]);
        inst.setMatrixAt(i, m);
      }
      inst.instanceMatrix.needsUpdate = true;
      inst.castShadow = shadow;
      inst.receiveShadow = true;
      group.add(inst);
    }
    return group;
  }
}
