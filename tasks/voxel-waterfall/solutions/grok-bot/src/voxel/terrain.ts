import { fbm2D, ridged2D, valueNoise2D } from './noise';
import type { BlockType } from './types';

export interface TerrainData {
  size: number;
  heights: Float32Array;
  blocks: Map<string, BlockType>;
  waterfallCells: Array<{ x: number; y: number; z: number }>;
  poolCells: Array<{ x: number; y: number; z: number }>;
  cloudCells: Array<{ x: number; y: number; z: number }>;
  mainPeak: { x: number; z: number; h: number };
}

function key(x: number, y: number, z: number): string {
  return `${x},${y},${z}`;
}

function peakGaussian(
  x: number,
  z: number,
  cx: number,
  cz: number,
  radius: number,
  height: number,
): number {
  const dx = (x - cx) / radius;
  const dz = (z - cz) / radius;
  const d2 = dx * dx + dz * dz;
  return height * Math.exp(-d2 * 2.2);
}

/** Build a 200×200+ Minecraft-like mountain + waterfall heightmap and surface voxels. */
export function generateTerrain(
  size: number,
  seed: number,
  mountainHeight: number,
  cloudHeight: number,
  cloudDensity: number,
  vegetation: boolean,
  showClouds: boolean,
): TerrainData {
  const heights = new Float32Array(size * size);
  const blocks = new Map<string, BlockType>();
  const half = size / 2;

  // Peak layout (in world voxel coords)
  const main = { x: half * 0.95, z: half * 1.05 };
  const peaks = [
    { x: main.x, z: main.z, r: size * 0.28, h: 1.0 },
    { x: half * 0.45, z: half * 0.7, r: size * 0.18, h: 0.62 },
    { x: half * 1.45, z: half * 0.55, r: size * 0.16, h: 0.55 },
    { x: half * 1.35, z: half * 1.45, r: size * 0.2, h: 0.7 },
    { x: half * 0.55, z: half * 1.4, r: size * 0.14, h: 0.48 },
  ];

  let maxH = 0;
  let mainPeak = { x: 0, z: 0, h: 0 };

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const nx = x / size;
      const nz = z / size;

      let h = 4 + fbm2D(nx * 3.5, nz * 3.5, 4, 2, 0.5, seed) * 6;
      h += ridged2D(nx * 2.2 + 10, nz * 2.2 + 10, 5, seed + 7) * mountainHeight * 0.35;

      for (const p of peaks) {
        h += peakGaussian(x, z, p.x, p.z, p.r, mountainHeight * p.h);
      }

      // Gentle valleys / ridges
      h += (fbm2D(nx * 8, nz * 8, 3, 2.2, 0.45, seed + 3) - 0.5) * 5;

      // Flatten a bit near edges
      const edge = Math.min(x, z, size - 1 - x, size - 1 - z) / (size * 0.12);
      const edgeFactor = Math.max(0, Math.min(1, edge));
      h = 2 + h * (0.25 + 0.75 * edgeFactor);

      const ih = Math.max(1, Math.floor(h));
      heights[z * size + x] = ih;
      if (ih > maxH) {
        maxH = ih;
        mainPeak = { x, z, h: ih };
      }
    }
  }

  // Recompute main peak near intended center so waterfall starts on the big mountain
  {
    let best = 0;
    let bx = Math.floor(main.x);
    let bz = Math.floor(main.z);
    const r = Math.floor(size * 0.12);
    for (let z = bz - r; z <= bz + r; z++) {
      for (let x = bx - r; x <= bx + r; x++) {
        if (x < 0 || z < 0 || x >= size || z >= size) continue;
        const h = heights[z * size + x];
        if (h > best) {
          best = h;
          mainPeak = { x, z, h };
        }
      }
    }
  }

  const getH = (x: number, z: number) =>
    x < 0 || z < 0 || x >= size || z >= size ? 0 : heights[z * size + x];

  const snowLine = mountainHeight * 0.72;
  const stoneLine = mountainHeight * 0.35;

  // Surface shell voxels (top + exposed sides)
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const h = getH(x, z);
      const neighbors = [getH(x - 1, z), getH(x + 1, z), getH(x, z - 1), getH(x, z + 1)];
      const minN = Math.min(...neighbors);

      for (let y = Math.max(0, minN); y <= h; y++) {
        // Skip fully buried interior columns
        if (y < h && y < minN) continue;

        let type: BlockType;
        if (y >= snowLine) type = 'snow';
        else if (y >= stoneLine) type = 'stone';
        else if (y === h && h < stoneLine * 0.55) type = 'grass';
        else if (y === h) type = y > stoneLine * 0.4 ? 'stone' : 'grass';
        else if (y > h - 3 && h < stoneLine) type = 'dirt';
        else type = 'stone';

        // Dirt under grass tops
        if (type === 'grass' && y === h) {
          blocks.set(key(x, y, z), 'grass');
          if (y - 1 >= minN) blocks.set(key(x, y - 1, z), 'dirt');
          continue;
        }
        blocks.set(key(x, y, z), type);
      }
    }
  }

  // Waterfall path: steepest descent from near main peak toward a foothill basin
  const waterfallCells: Array<{ x: number; y: number; z: number }> = [];
  const poolCells: Array<{ x: number; y: number; z: number }> = [];

  const startX = Math.min(size - 2, mainPeak.x + 2);
  const startZ = Math.min(size - 2, mainPeak.z + 1);
  let wx = startX;
  let wz = startZ;
  const path: Array<{ x: number; z: number }> = [];
  const visited = new Set<string>();

  for (let step = 0; step < size * 2; step++) {
    const pk = `${wx},${wz}`;
    if (visited.has(pk)) break;
    visited.add(pk);
    path.push({ x: wx, z: wz });

    const h = getH(wx, wz);
    if (h <= 8 || wx < 4 || wz < 4 || wx > size - 5 || wz > size - 5) break;

    // Prefer downhill toward +x/+z foothills (basin)
    let bestScore = Infinity;
    let nx = wx;
    let nz = wz;
    for (const [dx, dz] of [
      [1, 0],
      [0, 1],
      [1, 1],
      [-1, 1],
      [1, -1],
      [0, -1],
      [-1, 0],
      [-1, -1],
    ] as const) {
      const tx = wx + dx;
      const tz = wz + dz;
      if (tx < 1 || tz < 1 || tx >= size - 1 || tz >= size - 1) continue;
      const th = getH(tx, tz);
      // Bias downhill + slightly toward lower-right basin
      const score = th + dx * -0.15 + dz * -0.1 + valueNoise2D(tx * 0.2, tz * 0.2, seed) * 0.4;
      if (score < bestScore) {
        bestScore = score;
        nx = tx;
        nz = tz;
      }
    }
    if (nx === wx && nz === wz) break;
    wx = nx;
    wz = nz;
  }

  // Carve a channel and place waterfall blocks along the path
  for (let i = 0; i < path.length; i++) {
    const { x, z } = path[i];
    const h = getH(x, z);
    const next = path[i + 1];
    const nextH = next ? getH(next.x, next.z) : h;
    const fromY = h;
    const toY = Math.min(h, nextH);

    // Widen waterfall near top
    const width = i < 8 ? 2 : i < path.length * 0.4 ? 1 : 1;
    for (let ox = -width; ox <= width; ox++) {
      for (let oz = -width; oz <= 0; oz++) {
        const cx = x + ox;
        const cz = z + oz;
        if (cx < 0 || cz < 0 || cx >= size || cz >= size) continue;
        // Remove a shallow trench
        const ch = getH(cx, cz);
        for (let y = toY; y <= ch; y++) {
          blocks.delete(key(cx, y, cz));
        }
        if (ch > toY) heights[cz * size + cx] = toY;

        for (let y = toY; y <= fromY + 1; y++) {
          waterfallCells.push({ x: cx, y, z: cz });
          blocks.set(key(cx, y, cz), 'waterfall');
        }
      }
    }
  }

  // Pool at the foot of the waterfall
  if (path.length > 0) {
    const end = path[path.length - 1];
    const poolR = 7;
    const poolY = Math.max(2, getH(end.x, end.z) - 1);
    for (let z = end.z - poolR; z <= end.z + poolR; z++) {
      for (let x = end.x - poolR; x <= end.x + poolR; x++) {
        if (x < 0 || z < 0 || x >= size || z >= size) continue;
        const dx = x - end.x;
        const dz = z - end.z;
        if (dx * dx + dz * dz > poolR * poolR) continue;
        const h = getH(x, z);
        const target = Math.min(h, poolY);
        for (let y = target; y <= h; y++) blocks.delete(key(x, y, z));
        heights[z * size + x] = target;
        // Sand rim + water surface
        if (dx * dx + dz * dz > (poolR - 1.5) * (poolR - 1.5)) {
          blocks.set(key(x, target, z), 'sand');
        } else {
          blocks.set(key(x, target, z), 'water');
          poolCells.push({ x, y: target, z });
          if (target > 1) blocks.set(key(x, target - 1, z), 'sand');
        }
      }
    }
  }

  // Secondary small cascade from a side peak
  {
    const sx = Math.floor(half * 1.35);
    const sz = Math.floor(half * 1.45);
    let x = sx;
    let z = sz;
    for (let step = 0; step < 40; step++) {
      const h = getH(x, z);
      if (h < 10) break;
      waterfallCells.push({ x, y: h, z });
      waterfallCells.push({ x, y: h - 1, z });
      blocks.set(key(x, h, z), 'waterfall');
      blocks.set(key(x, Math.max(1, h - 1), z), 'waterfall');
      // step downhill toward main basin
      let best = h;
      let nx = x;
      let nz = z;
      for (const [dx, dz] of [
        [-1, 0],
        [0, -1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ] as const) {
        const tx = x + dx;
        const tz = z + dz;
        const th = getH(tx, tz);
        if (th < best) {
          best = th;
          nx = tx;
          nz = tz;
        }
      }
      if (nx === x && nz === z) break;
      x = nx;
      z = nz;
    }
  }

  // Vegetation at foothills
  if (vegetation) {
    for (let z = 2; z < size - 2; z += 2) {
      for (let x = 2; x < size - 2; x += 2) {
        const h = getH(x, z);
        if (h < 4 || h > stoneLine * 0.45) continue;
        if (blocks.get(key(x, h, z)) !== 'grass') continue;
        const n = valueNoise2D(x * 0.35, z * 0.35, seed + 99);
        if (n > 0.72) {
          // Tree
          const trunkH = 2 + Math.floor(n * 3);
          for (let ty = 1; ty <= trunkH; ty++) {
            blocks.set(key(x, h + ty, z), 'trunk');
          }
          const top = h + trunkH;
          for (let oy = 0; oy <= 2; oy++) {
            const r = oy === 2 ? 1 : 2;
            for (let oz = -r; oz <= r; oz++) {
              for (let ox = -r; ox <= r; ox++) {
                if (Math.abs(ox) + Math.abs(oz) > r + 1) continue;
                blocks.set(key(x + ox, top + oy, z + oz), 'leaf');
              }
            }
          }
        } else if (n > 0.62) {
          // Bush / tall grass as leaf block
          blocks.set(key(x, h + 1, z), 'leaf');
        }
      }
    }
  }

  // Cloud layer — mid-mountain band so peaks pierce through
  const cloudCells: Array<{ x: number; y: number; z: number }> = [];
  if (showClouds) {
    const baseY = Math.floor(cloudHeight);
    for (let z = 0; z < size; z += 2) {
      for (let x = 0; x < size; x += 2) {
        const n = fbm2D(x * 0.04 + seed, z * 0.04, 4, 2, 0.55, seed + 50);
        if (n < 1 - cloudDensity * 0.85) continue;
        // Soft cloud blobs
        const thickness = 1 + Math.floor(n * 3);
        for (let oy = 0; oy < thickness; oy++) {
          for (let oz = 0; oz <= 1; oz++) {
            for (let ox = 0; ox <= 1; ox++) {
              const cx = x + ox;
              const cz = z + oz;
              if (cx >= size || cz >= size) continue;
              const cy = baseY + oy + Math.floor(valueNoise2D(cx * 0.1, cz * 0.1, seed) * 2);
              // Only place clouds where terrain is below (or leave holes for piercing peaks)
              if (getH(cx, cz) >= cy - 1) continue;
              cloudCells.push({ x: cx, y: cy, z: cz });
            }
          }
        }
      }
    }
  }

  return {
    size,
    heights,
    blocks,
    waterfallCells,
    poolCells,
    cloudCells,
    mainPeak,
  };
}
