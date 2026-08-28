/** 植被与点缀：体素树、岩石、野花（实例化立方体 + 逐实例颜色）。 */
import * as THREE from 'three';
import type { TerrainResult } from './terrain';
import type { SceneParams } from './params';
import { Noise2D, hashSeed, mulberry32 } from './noise';
import type { InstanceSpec } from './water';

export interface VegetationResult {
  trunks: InstanceSpec[];
  leaves: InstanceSpec[];
  rocks: InstanceSpec[];
  flowers: InstanceSpec[];
  treeCount: number;
}

const LEAF_COLORS = [0x4e8f3d, 0x5aa047, 0x3f7a34, 0x67ab4c];
const TRUNK_COLOR = 0x6b4a2f;
const ROCK_COLORS = [0x84848a, 0x77777d, 0x909096];
const FLOWER_COLORS = [0xd95763, 0xe8c547, 0xf2f2f2, 0xc77dd6];

/** 在山脚与缓坡草地上散布植被。 */
export function generateVegetation(t: TerrainResult, params: SceneParams): VegetationResult {
  const N = t.size;
  const rand = mulberry32(hashSeed(params.seed) ^ 0x68e31da4);
  const noise = new Noise2D(hashSeed(params.seed) ^ 0x1b56c4e9);
  const trunks: InstanceSpec[] = [];
  const leaves: InstanceSpec[] = [];
  const rocks: InstanceSpec[] = [];
  const flowers: InstanceSpec[] = [];

  // 邻水掩码（植被离水一格）
  const nearWater = new Uint8Array(N * N);
  for (let z = 1; z < N - 1; z++) {
    for (let x = 1; x < N - 1; x++) {
      if (
        t.waterMask[z * N + x] ||
        t.waterMask[z * N + x + 1] ||
        t.waterMask[z * N + x - 1] ||
        t.waterMask[(z + 1) * N + x] ||
        t.waterMask[(z - 1) * N + x]
      ) {
        nearWater[z * N + x] = 1;
      }
    }
  }

  const treeLimit = Math.round(130 * params.vegetation);
  const wx = (x: number) => x - N / 2 + 0.5;

  /** 单棵树：3-5 格树干 + 2-3 格半径椭球冠层（从远处可辨识的树形）。 */
  const plantTree = (x: number, z: number, col: number, big: boolean) => {
    const trunkH = 3 + Math.floor(rand() * 3);
    const trunkColor = new THREE.Color(TRUNK_COLOR);
    for (let y = 0; y < trunkH; y++) {
      trunks.push({ x: wx(x), y: col + y + 0.5, z: wx(z), c: trunkColor, s: 0.74 });
    }
    const leafColor = new THREE.Color(LEAF_COLORS[Math.floor(rand() * LEAF_COLORS.length)]);
    const cy = col + trunkH - 0.5;
    const cr = big ? 3 : 2 + (rand() < 0.3 ? 1 : 0);
    for (let dy = -1; dy <= 2; dy++) {
      const rr = dy <= 0 ? cr + 0.4 : dy === 1 ? cr - 0.5 : 0.7;
      for (let dz2 = -cr; dz2 <= cr; dz2++) {
        for (let dx2 = -cr; dx2 <= cr; dx2++) {
          const dd = dx2 * dx2 + dz2 * dz2 + dy * dy * 1.5;
          if (dd > rr * rr) continue;
          if (rand() < 0.1) continue; // 破角更自然
          leaves.push({ x: wx(x + dx2), y: cy + dy, z: wx(z + dz2), c: leafColor, s: 0.95 });
        }
      }
    }
  };

  // —— 树木：森林噪声掩膜 + 缓坡草地 ——
  let treeCount = 0;
  treeLoop:
  for (let z = 3; z < N - 3; z += 1) {
    for (let x = 3; x < N - 3; x += 1) {
      if (nearWater[z * N + x]) continue;
      const forest = noise.fbm((x - N / 2) * 0.05, (z - N / 2) * 0.05, 3);
      const densityThresh = 0.28 - params.vegetation * 0.22;
      if (forest < densityThresh) continue;
      if (rand() > 0.05 + params.vegetation * 0.22) continue;

      const col = t.h[z * N + x];
      if (col < 4 || col > params.snowline - 14) continue;
      let slope = 0;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
        slope = Math.max(slope, Math.abs(t.h[(z + dz) * N + x + dx] - col));
      }
      if (slope > 2) continue;

      plantTree(x, z, col, rand() < 0.18);
      treeCount++;
      if (treeCount >= treeLimit) break treeLoop;
    }
  }

  // —— 河岸树：沿低地水系补植醒目树簇（近景可见）——
  for (let z = 3; z < N - 3 && treeCount < treeLimit + 30; z += 1) {
    for (let x = 3; x < N - 3 && treeCount < treeLimit + 30; x += 1) {
      if (!t.waterMask[z * N + x]) continue;
      if (t.h[z * N + x] > 22) continue; // 仅低地河段
      if (rand() > 0.05) continue;
      const ang = rand() * Math.PI * 2;
      const ox = x + Math.round(Math.cos(ang) * (2 + rand() * 2));
      const oz = z + Math.round(Math.sin(ang) * (2 + rand() * 2));
      if (ox < 3 || oz < 3 || ox >= N - 3 || oz >= N - 3) continue;
      if (t.waterMask[oz * N + ox]) continue;
      const col = t.h[oz * N + ox];
      if (col < 3 || col > params.snowline - 16) continue;
      let slope = 0;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
        slope = Math.max(slope, Math.abs(t.h[(oz + dz) * N + ox + dx] - col));
      }
      if (slope > 2) continue;
      plantTree(ox, oz, col, rand() < 0.3);
      treeCount++;
    }
  }

  // —— 岩石点缀 ——
  const rockCount = Math.round(36 * Math.min(1.4, params.vegetation + 0.4));
  for (let i = 0; i < rockCount; i++) {
    const x = 4 + Math.floor(rand() * (N - 8));
    const z = 4 + Math.floor(rand() * (N - 8));
    if (nearWater[z * N + x]) continue;
    const col = t.h[z * N + x];
    if (col < 3 || col > params.snowline - 4) continue;
    const c = new THREE.Color(ROCK_COLORS[Math.floor(rand() * ROCK_COLORS.length)]);
    const s = 0.7 + rand() * 0.9;
    rocks.push({ x: wx(x) + (rand() - 0.5) * 0.4, y: col + s * 0.3, z: wx(z) + (rand() - 0.5) * 0.4, c, s });
    if (rand() < 0.4) {
      rocks.push({ x: wx(x) + (rand() - 0.5), y: col + s * 0.9, z: wx(z) + (rand() - 0.5), c, s: s * 0.6 });
    }
  }

  // —— 野花（平原亮点）——
  const flowerCount = Math.round(70 * params.vegetation);
  for (let i = 0; i < flowerCount; i++) {
    const x = 4 + Math.floor(rand() * (N - 8));
    const z = 4 + Math.floor(rand() * (N - 8));
    if (nearWater[z * N + x]) continue;
    const col = t.h[z * N + x];
    if (col > 14) continue;
    const c = new THREE.Color(FLOWER_COLORS[Math.floor(rand() * FLOWER_COLORS.length)]);
    flowers.push({ x: wx(x) + (rand() - 0.5) * 0.6, y: col + 0.18, z: wx(z) + (rand() - 0.5) * 0.6, c, s: 0.3 });
  }

  return { trunks, leaves, rocks, flowers, treeCount };
}
