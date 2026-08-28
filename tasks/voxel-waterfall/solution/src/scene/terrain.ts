/** 地形生成：高度场 + 台地悬崖 + 流径追踪/刻蚀 + 瀑布与瀑潭。
 *
 * 坐标约定：
 *  - 网格 (x, z) ∈ [0, GRID)²，世界坐标 wx = x - GRID/2 + 0.5。
 *  - 列高 h[x,z] = 固体体素数，顶面在 y = h。
 *  - 水体素记录“水位”L：方块占据 [L-1, L]，顶面在 y = L。
 */
import { Noise2D, hashSeed, mulberry32 } from './noise';
import type { SceneParams } from './params';

export const GRID = 160;

export const WaterKind = {
  River: 1, // 溪流
  Lake: 2, // 瀑潭/静水
  Fall: 3, // 跌水水体
  Foam: 4, // 白色浪花
} as const;

export interface WaterVoxel {
  x: number;
  y: number;
  z: number;
  k: number;
}

/** 主瀑水幕描述（世界坐标，x/z 为幕中心，dir 为幕面法线）。 */
export interface FallSheet {
  x: number;
  z: number;
  baseY: number;
  topY: number;
  width: number;
  dirX: number;
  dirZ: number;
}

export interface TerrainResult {
  size: number;
  h: Int16Array;
  water: WaterVoxel[];
  waterMask: Uint8Array; // GRID*GRID，任意水体素所在格 > 0
  falls: FallSheet[];
  peakHeight: number;
  plateauLevel: number;
  poolCenter: { x: number; y: number; z: number } | null;
}

interface Peak {
  x: number;
  z: number;
  h: number;
  r: number;
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const idx = (x: number, z: number) => z * GRID + x;

function smoothstep(a: number, b: number, x: number): number {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

function basePeaks(mh: number): Peak[] {
  return [
    { x: -12, z: -6, h: 62 * mh, r: 44 }, // 主峰
    { x: 34, z: 16, h: 44 * mh, r: 30 }, // 东侧次峰
    { x: -36, z: 28, h: 38 * mh, r: 26 }, // 西南次峰
    { x: 20, z: -36, h: 34 * mh, r: 24 }, // 东北丘陵
    { x: -2, z: -46, h: 30 * mh, r: 22 }, // 北侧山丘
  ];
}

/** 生成地形（含瀑布水系）。 */
export function generateTerrain(params: SceneParams): TerrainResult {
  const N = GRID;
  const seedInt = hashSeed(params.seed);
  const nHeight = new Noise2D(seedInt);
  const nWarpA = new Noise2D(seedInt ^ 0x9e3779b9);
  const nWarpB = new Noise2D(seedInt ^ 0x85ebca6b);
  const nDetail = new Noise2D(seedInt ^ 0xc2b2ae35);
  const nEdge = new Noise2D(seedInt ^ 0x27d4eb2f);
  const rand = mulberry32(seedInt ^ 0x165667b1);

  const peaks = basePeaks(params.mountainHeight);
  const h = new Int16Array(N * N);

  // —— 1. 基础高度场：域扭曲 ridged 噪声 × 高斯山体掩膜 ——
  for (let z = 0; z < N; z++) {
    for (let x = 0; x < N; x++) {
      const wx = x - N / 2 + 0.5;
      const wz = z - N / 2 + 0.5;
      const owx = wx + 15 * nWarpA.sample(wx * 0.011 + 3.7, wz * 0.011);
      const owz = wz + 15 * nWarpB.sample(wx * 0.011, wz * 0.011 + 9.1);

      let massif = 0;
      for (const p of peaks) {
        const dx = owx - p.x;
        const dz = owz - p.z;
        massif += p.h * Math.exp(-(dx * dx + dz * dz) / (p.r * p.r));
      }
      const ridge = nHeight.ridged(owx * 0.03, owz * 0.03, 4);
      const detail = nDetail.fbm(owx * 0.065, owz * 0.065, 3) * (0.6 + 2.4 * params.terrainDetail);
      const plain = nDetail.fbm(owx * 0.02 + 40, owz * 0.02 + 40, 2) * 1.4;
      const hh = 3.2 + massif * (0.3 + 0.71 * Math.pow(ridge, 1.05)) + detail + plain;
      h[idx(x, z)] = Math.max(1, Math.round(hh));
    }
  }

  // —— 1.5 3×3 平滑：柔化单格尖峰与锯齿棱线（崖壁在下一节才刻，不受影响）——
  for (let pass = 0; pass < 2; pass++) {
    const src = Int16Array.from(h);
    for (let z = 1; z < N - 1; z++) {
      for (let x = 1; x < N - 1; x++) {
        let sum = 0;
        for (let dz = -1; dz <= 1; dz++) {
          for (let dx = -1; dx <= 1; dx++) sum += src[(z + dz) * N + x + dx];
        }
        const i = idx(x, z);
        h[i] = Math.round(h[i] * 0.25 + (sum / 9) * 0.75);
      }
    }
  }

  // —— 2. 主峰东南扇区台地化 → 陡崖（主瀑落崖）——
  const main = peaks[0];
  const T = Math.round(main.h * 0.33);
  for (let z = 0; z < N; z++) {
    for (let x = 0; x < N; x++) {
      const wx = x - N / 2 + 0.5 - main.x;
      const wz = z - N / 2 + 0.5 - main.z;
      const d = Math.hypot(wx, wz);
      if (d < 10 || d > 98) continue;
      const az = Math.atan2(wz, wx);
      const jitter = nEdge.sample(wx * 0.09, wz * 0.09) * 0.12;
      const a0 = 0.9 + jitter;
      const a1 = 1.9 + jitter;
      const azMask = smoothstep(a0, a0 + 0.07, az) * (1 - smoothstep(a1 - 0.07, a1, az));
      if (azMask <= 0) continue;
      // 径向阶梯：在崖线半径处压缩过渡（1.6 格）形成陡崖，崖线随噪声锯齿化
      const d0 = 27 + nEdge.sample(wx * 0.05, wz * 0.05) * 5;
      const mask = azMask * smoothstep(10, 14, d) * smoothstep(d0, d0 + 1.6, d) * (1 - smoothstep(85, 98, d));
      if (mask <= 0) continue;
      const cur = h[idx(x, z)];
      const target = Math.min(cur, T);
      h[idx(x, z)] = Math.round(cur + (target - cur) * mask);
    }
  }

  const water: WaterVoxel[] = [];
  const waterMask = new Uint8Array(N * N);
  const falls: FallSheet[] = [];

  const markWater = (x: number, z: number, y: number, k: number) => {
    water.push({ x, y, z, k });
    const m = idx(x, z);
    if (waterMask[m] === 0) waterMask[m] = k;
  };

  // —— 3. 流径追踪（最速下降 + 惯性 + 抖动），边走边刻蚀 ——
  interface StreamOpts {
    startAz: number;
    momentum: number;
    stopAtDrop: number;
    onDrop: 'stop' | 'cascade';
    forceDescentEvery: number;
    maxSteps: number;
    width: number; // 横向体素数（奇数化：实际 2*ceil(w/2)+? 见 widen）
  }
  interface StreamOut {
    crest: null | { cx: number; cz: number; dx: number; dz: number; lowH: number; floor: number };
  }

  const traceStream = (sx: number, sz: number, o: StreamOpts): StreamOut => {
    const out: StreamOut = { crest: null };
    const widen = Math.max(0, Math.min(2, o.width - 1)); // 两侧各拓宽格数
    let cx = sx;
    let cz = sz;
    let dirX = Math.cos(o.startAz);
    let dirZ = Math.sin(o.startAz);
    let floor = h[idx(cx, cz)];
    let flatRun = 0;

    markWater(cx, cz, floor + 1, WaterKind.River);

    for (let step = 0; step < o.maxSteps; step++) {
      // 3.1 前方骤降检测
      let dropDx = 0;
      let dropDz = 0;
      let dropH = Infinity;
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dz === 0) continue;
          const nx = cx + dx;
          const nz = cz + dz;
          if (nx < 1 || nz < 1 || nx >= N - 1 || nz >= N - 1) continue;
          const nh = h[idx(nx, nz)];
          if (nh < floor - o.stopAtDrop && nh < dropH) {
            dropH = nh;
            dropDx = dx;
            dropDz = dz;
          }
        }
      }

      if (dropDx !== 0 || dropDz !== 0) {
        if (o.onDrop === 'stop') {
          out.crest = { cx, cz, dx: dropDx, dz: dropDz, lowH: dropH, floor };
          return out;
        }
        // 级联跌水：在低处邻格立水柱，随后跳落继续
        const perpX = -dropDz;
        const perpZ = dropDx;
        for (let k = -widen; k <= widen; k++) {
          const fx = clamp(cx + dropDx + perpX * k, 1, N - 2);
          const fz = clamp(cz + dropDz + perpZ * k, 1, N - 2);
          const base = Math.min(h[idx(fx, fz)], dropH);
          for (let y = base + 1; y <= floor + 1; y++) markWater(fx, fz, y, WaterKind.Fall);
          markWater(fx, fz, base + 1, WaterKind.Foam);
        }
        cx = clamp(cx + dropDx, 2, N - 3);
        cz = clamp(cz + dropDz, 2, N - 3);
        floor = dropH;
        flatRun = 0;
        dirX = dropDx;
        dirZ = dropDz;
      } else {
        // 3.2 常规选步：高度 + 惯性惩罚 + 抖动
        let bx = cx;
        let bz = cz;
        let best = Infinity;
        for (let dz = -1; dz <= 1; dz++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dz === 0) continue;
            const nx = cx + dx;
            const nz = cz + dz;
            if (nx < 1 || nz < 1 || nx >= N - 1 || nz >= N - 1) continue;
            const len = Math.hypot(dx, dz);
            const dot = (dx * dirX + dz * dirZ) / (len * Math.hypot(dirX, dirZ) || 1);
            const score = h[idx(nx, nz)] + (1 - dot) * o.momentum + rand() * 1.4;
            if (score < best) {
              best = score;
              bx = nx;
              bz = nz;
            }
          }
        }
        const ndx = bx - cx;
        const ndz = bz - cz;
        cx = bx;
        cz = bz;
        if (cx <= 2 || cz <= 2 || cx >= N - 3 || cz >= N - 3) return out;
        dirX = ndx;
        dirZ = ndz;
        const nh = h[idx(cx, cz)];
        const prevFloor = floor;
        // 阶梯缓降：每步至多降 1，跨过噪声低谷（避免 floor 提前跌到台地高度）
        floor = Math.min(floor, Math.max(nh, floor - 1));
        if (floor === prevFloor) {
          if (++flatRun > o.forceDescentEvery) {
            floor = Math.max(1, floor - 1);
            flatRun = 0;
          }
        } else {
          flatRun = 0;
        }
      }

      // 3.3 刻蚀河床、拓宽、筑堤、标记水体
      const perpX = -dirZ;
      const perpZ = dirX;
      h[idx(cx, cz)] = Math.min(h[idx(cx, cz)], floor);
      markWater(cx, cz, floor + 1, step % 7 === 6 ? WaterKind.Foam : WaterKind.River);
      for (let k = 1; k <= widen; k++) {
        const sx2 = clamp(cx + Math.round(perpX * k), 1, N - 2);
        const sz2 = clamp(cz + Math.round(perpZ * k), 1, N - 2);
        h[idx(sx2, sz2)] = Math.min(h[idx(sx2, sz2)], floor);
        markWater(sx2, sz2, floor + 1, WaterKind.River);
        const sx3 = clamp(cx - Math.round(perpX * k), 1, N - 2);
        const sz3 = clamp(cz - Math.round(perpZ * k), 1, N - 2);
        h[idx(sx3, sz3)] = Math.min(h[idx(sx3, sz3)], floor);
        markWater(sx3, sz3, floor + 1, WaterKind.River);
      }
      for (let k = widen + 1; k <= widen + 1; k++) {
        for (const s of [1, -1]) {
          const bx2 = clamp(cx + Math.round(perpX * k * s), 1, N - 2);
          const bz2 = clamp(cz + Math.round(perpZ * k * s), 1, N - 2);
          if (h[idx(bx2, bz2)] <= floor) h[idx(bx2, bz2)] = floor + 1;
        }
      }
    }
    return out;
  };

  // —— 4. 主瀑：崖口扫描 → 泉眼回退 → 蜿蜒引水 → 落差造瀑 ——
  const rayCell = (az: number, d: number): [number, number] => [
    clamp(Math.round(main.x + Math.cos(az) * d + N / 2), 2, N - 3),
    clamp(Math.round(main.z + Math.sin(az) * d + N / 2), 2, N - 3),
  ];

  // 4.1 崖口扫描：从 az0 向两侧扩展，接受“崖顶够高”的首个 ≥5 径向落差
  let crest: { cx: number; cz: number; dx: number; dz: number; lowH: number; crestH: number } | null = null;
  const azCandidates: number[] = [];
  for (let k = 0; k <= 8; k++) azCandidates.push(1.3 + k * 0.06, 1.3 - k * 0.06);
  scan:
  for (const az of azCandidates) {
    if (az < 0.95 || az > 1.85) continue;
    let [px, pz] = rayCell(az, 14);
    for (let d = 15; d < 60; d++) {
      const [nx2, nz2] = rayCell(az, d);
      if (nx2 === px && nz2 === pz) continue;
      const hh0 = h[idx(px, pz)];
      const nh = h[idx(nx2, nz2)];
      if (nh < hh0 - 5 && hh0 >= T + 5) {
        crest = { cx: px, cz: pz, dx: Math.sign(nx2 - px), dz: Math.sign(nz2 - pz), lowH: nh, crestH: hh0 };
        break scan;
      }
      px = nx2;
      pz = nz2;
    }
  }

  let poolCenter: { x: number; y: number; z: number } | null = null;
  if (crest) {
    const tx = clamp(Math.round(main.x + N / 2), 2, N - 3);
    const tz = clamp(Math.round(main.z + N / 2), 2, N - 3);

    // 4.2 泉眼：自崖口向主峰贪婪爬升，直到高出崖口 6 格
    let cx4 = crest.cx;
    let cz4 = crest.cz;
    let springX = crest.cx;
    let springZ = crest.cz;
    for (let i = 0; i < 60; i++) {
      let bx = -1;
      let bz = -1;
      let bh = h[idx(cx4, cz4)];
      const distC = Math.hypot(cx4 - tx, cz4 - tz);
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dz === 0) continue;
          const nx2 = clamp(cx4 + dx, 2, N - 3);
          const nz2 = clamp(cz4 + dz, 2, N - 3);
          if (Math.hypot(nx2 - tx, nz2 - tz) >= distC) continue;
          if (h[idx(nx2, nz2)] > bh) {
            bh = h[idx(nx2, nz2)];
            bx = nx2;
            bz = nz2;
          }
        }
      }
      if (bx < 0) break;
      cx4 = bx;
      cz4 = bz;
      springX = bx;
      springZ = bz;
      if (bh >= crest.crestH + 6) break;
    }

    // 4.3 蜿蜒引水路径：泉 → 崖口（目标距离 + 地形偏好 + 抖动）
    const path: Array<[number, number]> = [[springX, springZ]];
    let cx5 = springX;
    let cz5 = springZ;
    for (let i = 0; i < 400; i++) {
      let bx = cx5;
      let bz = cz5;
      let best = Infinity;
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dz === 0) continue;
          const nx2 = cx5 + dx;
          const nz2 = cz5 + dz;
          if (nx2 < 2 || nz2 < 2 || nx2 >= N - 2 || nz2 >= N - 2) continue;
          const score = Math.hypot(nx2 - crest.cx, nz2 - crest.cz) + rand() * 1.5 + h[idx(nx2, nz2)] * 0.35;
          if (score < best) {
            best = score;
            bx = nx2;
            bz = nz2;
          }
        }
      }
      cx5 = bx;
      cz5 = bz;
      path.push([cx5, cz5]);
      if (Math.hypot(cx5 - crest.cx, cz5 - crest.cz) <= 1.01) break;
    }

    // 4.4 阶梯刻蚀河床：floor 从泉高线性降到崖口高（每步 ≤1）
    const widen = Math.max(0, Math.min(2, params.waterfallWidth - 1));
    const springH = h[idx(springX, springZ)];
    const steps = Math.max(1, path.length - 1);
    for (let i = 0; i < path.length; i++) {
      const [pxx, pzz] = path[i];
      const floorI = Math.max(crest.crestH, Math.round(springH - ((springH - crest.crestH) * i) / steps));
      const prev = path[Math.max(0, i - 1)];
      const dirX = pxx - prev[0] || 1;
      const dirZ = pzz - prev[1];
      const perpX = -dirZ;
      const perpZ = dirX;
      h[idx(pxx, pzz)] = Math.min(h[idx(pxx, pzz)], floorI);
      markWater(pxx, pzz, floorI + 1, i >= path.length - 2 ? WaterKind.Foam : WaterKind.River);
      for (let k = 1; k <= widen; k++) {
        for (const s of [1, -1]) {
          const gx = clamp(pxx + Math.round(perpX * k * s), 1, N - 2);
          const gz = clamp(pzz + Math.round(perpZ * k * s), 1, N - 2);
          h[idx(gx, gz)] = Math.min(h[idx(gx, gz)], floorI);
          markWater(gx, gz, floorI + 1, WaterKind.River);
        }
      }
      for (const s of [1, -1]) {
        const gx = clamp(pxx + Math.round(perpX * (widen + 1) * s), 1, N - 2);
        const gz = clamp(pzz + Math.round(perpZ * (widen + 1) * s), 1, N - 2);
        if (h[idx(gx, gz)] <= floorI) h[idx(gx, gz)] = floorI + 1;
      }
    }

    // 4.5 崖前跌水水体素柱
    const { cx, cz, dx, dz, lowH } = crest;
    const floor = crest.crestH;
    const fx = cx + dx;
    const fz = cz + dz;
    const perpX = -dz;
    const perpZ = dx;
    for (let k = -widen; k <= widen; k++) {
      const gx = clamp(fx + perpX * k, 1, N - 2);
      const gz = clamp(fz + perpZ * k, 1, N - 2);
      const base = Math.min(h[idx(gx, gz)], lowH);
      for (let y = base + 1; y <= floor + 1; y++) markWater(gx, gz, y, WaterKind.Fall);
    }

    // 4.6 水幕（世界坐标）：崖壁面外移 0.07
    const off = 0.07;
    const planeX = dx > 0 ? cx - N / 2 + 1 + off : dx < 0 ? cx - N / 2 - off : fx - N / 2 + 0.5;
    const planeZ = dz > 0 ? cz - N / 2 + 1 + off : dz < 0 ? cz - N / 2 - off : fz - N / 2 + 0.5;
    falls.push({
      x: planeX,
      z: planeZ,
      baseY: lowH - 0.25,
      topY: floor + 1,
      width: 2 * widen + 1.5,
      dirX: dx,
      dirZ: dz,
    });

    // 4.7 瀑潭
    const pcx = clamp(cx + dx * 2, 4, N - 5);
    const pcz = clamp(cz + dz * 2, 4, N - 5);
    const R = 3.4;
    const poolFloor = Math.max(1, lowH - 2);
    for (let z = pcz - 4; z <= pcz + 4; z++) {
      for (let x = pcx - 4; x <= pcx + 4; x++) {
        if (x < 1 || z < 1 || x >= N - 1 || z >= N - 1) continue;
        if (Math.hypot(x - pcx, z - pcz) > R) continue;
        h[idx(x, z)] = Math.min(h[idx(x, z)], poolFloor);
        for (let y = poolFloor + 1; y <= lowH; y++) {
          const nearFall = Math.hypot(x - fx, z - fz) <= 1.9 && y === lowH;
          markWater(x, z, y, nearFall ? WaterKind.Foam : WaterKind.Lake);
        }
      }
    }
    poolCenter = { x: pcx - N / 2 + 0.5, y: lowH, z: pcz - N / 2 + 0.5 };

    // 4.8 出水溪：从瀑潭最低外缘流向地图边缘
    let rimX = pcx;
    let rimZ = pcz;
    let rimH = Infinity;
    for (let z = pcz - 5; z <= pcz + 5; z++) {
      for (let x = pcx - 5; x <= pcx + 5; x++) {
        if (x < 1 || z < 1 || x >= N - 1 || z >= N - 1) continue;
        const dd = Math.hypot(x - pcx, z - pcz);
        if (dd > 4.6 || dd <= R + 0.4) continue;
        if (h[idx(x, z)] < rimH) {
          rimH = h[idx(x, z)];
          rimX = x;
          rimZ = z;
        }
      }
    }
    traceStream(rimX, rimZ, {
      startAz: Math.atan2(rimZ - pcz, rimX - pcx),
      momentum: 1.6,
      stopAtDrop: 4,
      onDrop: 'cascade',
      forceDescentEvery: 3,
      maxSteps: 400,
      width: 2,
    });
  }

  // —— 5. 次级溪流（次峰补给，级联跌水）——
  for (const si of [1, 2]) {
    const p = peaks[si];
    const ang = si === 1 ? 0.15 : -0.55;
    const sx = clamp(Math.round(p.x + Math.cos(ang) * 6 + N / 2), 2, N - 3);
    const sz = clamp(Math.round(p.z + Math.sin(ang) * 6 + N / 2), 2, N - 3);
    traceStream(sx, sz, {
      startAz: ang,
      momentum: 1.8,
      stopAtDrop: 4,
      onDrop: 'cascade',
      forceDescentEvery: 3,
      maxSteps: 300,
      width: 1,
    });
  }

  let peak = 0;
  for (let i = 0; i < h.length; i++) if (h[i] > peak) peak = h[i];

  return { size: N, h, water, waterMask, falls, peakHeight: peak, plateauLevel: T, poolCenter };
}
