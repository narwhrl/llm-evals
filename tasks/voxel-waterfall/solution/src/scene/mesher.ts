/** 体素 → 贪心合并网格。
 *
 * 仅生成暴露面（体素与空气的界面），相同颜色键的共面面片合并为大四边形，
 * 输出单个非索引 BufferGeometry（position / normal / color 顶点色）。
 * 面朝向在生成时用叉积自校验，避免绕序错误导致背面剔除穿模。
 */
import * as THREE from 'three';
import { WaterKind } from './terrain';
import type { TerrainResult } from './terrain';
import type { SceneParams } from './params';
import { Noise2D, hashSeed } from './noise';

// —— 调色板（sRGB 十六进制，THREE.Color 构造时自动转线性）——
const PALETTE_HEX = [
  0x67a04b, 0x5f9a46, 0x71a854, // 1-3 草地
  0x8b8b90, 0x7f7f86, 0x96969b, // 4-6 岩石
  0x6f6b64, 0x63605a, 0x7a766e, // 7-9 深层岩层
  0x7c5c40, 0x6f5238, // 10-11 泥土
  0xf2f6fa, 0xe6eef5, // 12-13 雪
  0xc9b98a, 0xbfb07f, // 14-15 岸滩沙
  0x5d6668, 0x556063, // 16-17 湿岩
];
const PA = {
  GRASS0: 1, GRASS1: 2, GRASS2: 3,
  ROCK0: 4, ROCK1: 5, ROCK2: 6,
  DEEP0: 7, DEEP1: 8, DEEP2: 9,
  DIRT0: 10, DIRT1: 11,
  SNOW0: 12, SNOW1: 13,
  SHORE0: 14, SHORE1: 15,
  WET0: 16, WET1: 17,
} as const;

export const PALETTE: THREE.Color[] = PALETTE_HEX.map((hex) => new THREE.Color(hex));

export const WATER_COLORS: Record<number, THREE.Color> = {
  [WaterKind.River]: new THREE.Color(0x3f76c9),
  [WaterKind.Lake]: new THREE.Color(0x3a6fc0),
  [WaterKind.Fall]: new THREE.Color(0x7fb3e8),
  [WaterKind.Foam]: new THREE.Color(0xeaf6ff),
};

interface MeshBuffers {
  pos: number[];
  nor: number[];
  col: number[];
}

/** 单场贪心网格。field 布局 idx = (y * D + z) * W + x，值 0 = 空，其余为合并键。 */
function greedyMesh(
  field: Uint8Array,
  W: number,
  H: number,
  D: number,
  colorOf: (key: number, ox: number, oy: number, oz: number, out: THREE.Color) => void,
): MeshBuffers {
  const bufs: MeshBuffers = { pos: [], nor: [], col: [] };
  const dims = [W, H, D];
  const at = (x: number, y: number, z: number): number => {
    if (y < 0 || y >= H || x < 0 || z < 0 || x >= W || z >= D) return 0;
    return field[(y * D + z) * W + x];
  };
  const tmp = new THREE.Color();

  const emitQuad = (p: number[], duv: number[], dvv: number[], d: number, sign: number, key: number) => {
    // 自校验绕序：cross(du, dv) 在 d 轴上的分量必须与面法线同号
    const u = (d + 1) % 3;
    const v = (d + 2) % 3;
    const crossDot = duv[u] * dvv[v] - duv[v] * dvv[u];
    const flip = crossDot * sign < 0;
    const p1 = [p[0] + duv[0], p[1] + duv[1], p[2] + duv[2]];
    const p2 = [p[0] + duv[0] + dvv[0], p[1] + duv[1] + dvv[1], p[2] + duv[2] + dvv[2]];
    const p3 = [p[0] + dvv[0], p[1] + dvv[1], p[2] + dvv[2]];
    const quad = flip ? [p, p3, p2, p1] : [p, p1, p2, p3];
    colorOf(key, p[0], p[1], p[2], tmp);
    const normal = [0, 0, 0];
    normal[d] = sign;
    for (const t of [0, 1, 2, 0, 2, 3]) {
      const vt = quad[t];
      bufs.pos.push(vt[0], vt[1], vt[2]);
      bufs.nor.push(normal[0], normal[1], normal[2]);
      bufs.col.push(tmp.r, tmp.g, tmp.b);
    }
  };

  for (let d = 0; d < 3; d++) {
    const u = (d + 1) % 3;
    const v = (d + 2) % 3;
    const du = dims[u];
    const dv = dims[v];
    const mask = new Int16Array(du * dv);
    const x = [0, 0, 0];
    const q = [0, 0, 0];
    q[d] = 1;

    for (x[d] = -1; x[d] < dims[d]; ) {
      let n = 0;
      for (x[v] = 0; x[v] < dv; x[v]++) {
        for (x[u] = 0; x[u] < du; x[u]++, n++) {
          const a = at(x[0], x[1], x[2]);
          const b = at(x[0] + q[0], x[1] + q[1], x[2] + q[2]);
          mask[n] = a !== 0 && b === 0 ? a : a === 0 && b !== 0 ? -b : 0;
        }
      }
      x[d]++;

      n = 0;
      for (let j = 0; j < dv; j++) {
        for (let i = 0; i < du; ) {
          const c = mask[n];
          if (c === 0) {
            i++;
            n++;
            continue;
          }
          let w = 1;
          while (i + w < du && mask[n + w] === c) w++;
          let hgt = 1;
          let blocked = false;
          while (j + hgt < dv && !blocked) {
            for (let k = 0; k < w; k++) {
              if (mask[n + k + hgt * du] !== c) {
                blocked = true;
                break;
              }
            }
            if (!blocked) hgt++;
          }
          x[u] = i;
          x[v] = j;
          const duv = [0, 0, 0];
          duv[u] = w;
          const dvv = [0, 0, 0];
          dvv[v] = hgt;
          emitQuad([x[0], x[1], x[2]], duv, dvv, d, c > 0 ? 1 : -1, Math.abs(c));
          for (let l = 0; l < hgt; l++) {
            for (let k = 0; k < w; k++) mask[n + k + l * du] = 0;
          }
          i += w;
          n += w;
        }
      }
    }
  }
  return bufs;
}

function toGeometry(bufs: MeshBuffers, N: number): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(bufs.pos.length);
  for (let i = 0; i < bufs.pos.length; i += 3) {
    pos[i] = bufs.pos[i] - N / 2;
    pos[i + 1] = bufs.pos[i + 1];
    pos[i + 2] = bufs.pos[i + 2] - N / 2;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(bufs.nor, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(bufs.col, 3));
  geo.computeBoundingSphere();
  return geo;
}

export interface TerrainMeshes {
  terrain: THREE.BufferGeometry;
  water: THREE.BufferGeometry;
  quadCount: number;
  waterQuadCount: number;
  shellVoxels: number;
}

const NEIGHBORS: readonly (readonly [number, number])[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/** 由地形数据构建地形与水的合并网格（世界坐标，网格原点居中）。 */
export function buildTerrainMeshes(t: TerrainResult, params: SceneParams): TerrainMeshes {
  const N = t.size;
  const H = t.peakHeight + 2;
  const solid = new Uint8Array(N * H * N);
  const waterField = new Uint8Array(N * H * N);
  const nColor = new Noise2D(hashSeed(params.seed) ^ 0x51ed270b);
  const rockline = params.snowline - 9;

  // 岸滩判定：非水格但邻水
  const nearWater = new Uint8Array(N * N);
  for (let z = 1; z < N - 1; z++) {
    for (let x = 1; x < N - 1; x++) {
      if (t.waterMask[z * N + x]) continue;
      for (const [dx, dz] of NEIGHBORS) {
        if (t.waterMask[(z + dz) * N + x + dx]) {
          nearWater[z * N + x] = 1;
          break;
        }
      }
    }
  }

  let shellVoxels = 0;
  for (let z = 0; z < N; z++) {
    for (let x = 0; x < N; x++) {
      const col = t.h[z * N + x];
      const hasWater = t.waterMask[z * N + x] !== 0;
      const nearW = nearWater[z * N + x] !== 0;
      let slope = 0;
      let minNeighbor = col;
      for (const [dx, dz] of NEIGHBORS) {
        const nx = x + dx;
        const nz = z + dz;
        if (nx < 0 || nz < 0 || nx >= N || nz >= N) continue;
        const nh = t.h[nz * N + nx];
        slope = Math.max(slope, Math.abs(nh - col));
        minNeighbor = Math.min(minNeighbor, nh);
      }
      const nv = nColor.sample(x * 0.33, z * 0.33);
      const nv2 = nColor.sample(x * 0.13 + 31, z * 0.13 - 17);
      const snowDither = nv > 0.15 ? 2 : 0;

      // 外壳填充：列顶到最低邻列下 1 层，内部留空省体素
      const shellBottom = Math.max(0, minNeighbor - 1);
      shellVoxels += col - shellBottom;

      for (let y = shellBottom; y < col; y++) {
        const cell = (y * N + z) * N + x;
        if (y === col - 1) {
          if (col >= params.snowline + snowDither) {
            solid[cell] = nv > -0.2 ? PA.SNOW0 : PA.SNOW1;
          } else if (hasWater) {
            solid[cell] = nv > 0 ? PA.WET0 : PA.WET1;
          } else if (nearW && slope <= 2) {
            solid[cell] = nv > 0 ? PA.SHORE0 : PA.SHORE1;
          } else if (slope >= 3 || col >= rockline) {
            solid[cell] = nv2 > 0.33 ? PA.ROCK2 : nv2 > -0.33 ? PA.ROCK0 : PA.ROCK1;
          } else {
            solid[cell] = nv2 > 0.3 ? PA.GRASS2 : nv2 > -0.3 ? PA.GRASS0 : PA.GRASS1;
          }
        } else if (y >= col - 2) {
          const topIsRocky = col >= rockline || slope >= 3;
          solid[cell] = topIsRocky ? PA.ROCK1 : nv > 0 ? PA.DIRT0 : PA.DIRT1;
        } else {
          const band = ((y >> 2) + (nv2 > 0 ? 1 : 0)) % 3;
          solid[cell] = band === 0 ? PA.DEEP0 : band === 1 ? PA.DEEP1 : PA.ROCK0;
        }
      }
    }
  }

  for (const w of t.water) {
    const y = w.y - 1;
    if (y >= 0 && y < H) waterField[(y * N + w.z) * N + w.x] = w.k;
  }

  const jitter01 = (a: number, b: number, c: number) => {
    let hsh = (a * 73856093) ^ (b * 19349663) ^ (c * 83492791);
    hsh = Math.imul(hsh ^ (hsh >>> 13), 0x5bd1e995);
    return ((hsh ^ (hsh >>> 15)) >>> 0) / 4294967296;
  };

  const terrainBufs = greedyMesh(solid, N, H, N, (key, ox, oy, oz, out) => {
    out.copy(PALETTE[key - 1]);
    out.multiplyScalar(0.95 + 0.1 * jitter01(ox, oy, oz));
  });
  const waterBufs = greedyMesh(waterField, N, H, N, (key, _ox, _oy, _oz, out) => {
    out.copy(WATER_COLORS[key]);
  });

  return {
    terrain: toGeometry(terrainBufs, N),
    water: toGeometry(waterBufs, N),
    quadCount: terrainBufs.pos.length / 18,
    waterQuadCount: waterBufs.pos.length / 18,
    shellVoxels,
  };
}
