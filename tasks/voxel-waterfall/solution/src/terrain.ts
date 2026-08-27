import { makeNoise } from './noise';

export interface TerrainConfig {
  size: number;          // grid side length (e.g. 128)
  voxelSize: number;     // world units per voxel
  baseHeight: number;    // average ground level (in voxels)
  amplitude: number;     // peak deviation above base (in voxels)
  mainPeakHeight: number;
  seed: number;
  carveWaterfall: boolean;
}

export interface VoxelType {
  color: number;
  emissive?: number;
  metalness?: number;
  roughness?: number;
  opacity?: number;
}

export const VOXEL = {
  grass:   { color: 0x5ea84a, roughness: 0.95 } as VoxelType,
  dirt:    { color: 0x6b4a2b, roughness: 0.95 } as VoxelType,
  stone:   { color: 0x8b8b8b, roughness: 0.9 } as VoxelType,
  rock:    { color: 0x6b6b6b, roughness: 0.85 } as VoxelType,
  snow:    { color: 0xf2f6fb, roughness: 0.6 } as VoxelType,
  sand:    { color: 0xd9c889, roughness: 0.95 } as VoxelType,
  water:   { color: 0x4ea3d8, roughness: 0.2, opacity: 0.78 } as VoxelType,
  cloud:   { color: 0xffffff, roughness: 1.0, opacity: 0.55 } as VoxelType,
  leaf:    { color: 0x2f7a2a, roughness: 0.9 } as VoxelType,
  trunk:   { color: 0x5a3a1f, roughness: 0.95 } as VoxelType,
};

export interface TerrainData {
  size: number;
  voxelSize: number;
  heights: Uint8Array;            // top-surface height per column
  waterfallPath: Array<[number, number, number]>; // (x,y,z) voxels occupied by waterfall
  waterfallStartHeight: number;
  spawnWaterfall: boolean;
}

export function generateTerrain(cfg: TerrainConfig): TerrainData {
  const { size, baseHeight, amplitude, mainPeakHeight, seed, carveWaterfall } = cfg;
  const { fbm } = makeNoise(seed);

  const heights = new Uint8Array(size * size);
  const center = (size - 1) / 2;

  // Main peak position (slightly off-center for cinematic angle).
  const peakX = Math.floor(size * 0.42);
  const peakY = Math.floor(size * 0.55);
  const peakRadius = size * 0.34;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = x / size;
      const ny = y / size;

      // Multi-octave fbm gives small detail ridges.
      const n = fbm(nx * 4, ny * 4, 5, 2.1, 0.5);              // ~[-1,1]
      const ridge = 1 - Math.abs(fbm(nx * 2, ny * 2, 4, 2.0, 0.55)); // sharp ridges

      // Radial mountain profile around the main peak.
      const dx = x - peakX;
      const dy = y - peakY;
      const dist = Math.sqrt(dx * dx + dy * dy) / peakRadius;
      const mainFalloff = Math.max(0, 1 - dist * dist);

      // Secondary peak offsets the silhouette.
      const dx2 = x - (size * 0.72);
      const dy2 = y - (size * 0.30);
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) / (size * 0.22);
      const subFalloff = Math.max(0, 1 - dist2 * dist2) * 0.55;

      // Smaller knoll in the foreground for depth.
      const dx3 = x - (size * 0.20);
      const dy3 = y - (size * 0.78);
      const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3) / (size * 0.18);
      const knollFalloff = Math.max(0, 1 - dist3 * dist3) * 0.35;

      const mountain = (mainFalloff + subFalloff + knollFalloff) * mainPeakHeight;
      const detail = (n * 0.5 + ridge * 0.5) * amplitude * 0.35;

      let h = baseHeight + mountain + detail;
      // Edge falloff so terrain doesn't end abruptly.
      const edge = Math.min(nx, 1 - nx, ny, 1 - ny);
      const edgeFalloff = Math.min(1, Math.max(0, edge * 6));
      h = baseHeight + (h - baseHeight) * edgeFalloff;

      const clamped = Math.max(0, Math.min(255, Math.round(h)));
      heights[y * size + x] = clamped;
    }
  }

  // Carve waterfall channel: start from a point near the main peak, walk
  // downhill along the steepest descent, dropping the height by a few units
  // and widening the channel by 1 voxel.
  const waterfallPath: Array<[number, number, number]> = [];
  let waterfallStartHeight = 0;
  if (carveWaterfall) {
    const startX = peakX;
    const startY = peakY + Math.floor(peakRadius * 0.35); // start south-east of peak
    const startH = heights[startY * size + startX];
    waterfallStartHeight = startH;

    let cx = startX;
    let cy = startY;
    const visited = new Uint8Array(size * size);
    const maxSteps = size * 2;

    for (let step = 0; step < maxSteps; step++) {
      visited[cy * size + cx] = 1;
      const currentH = heights[cy * size + cx];
      // Carve this column down to currentH - 2, but not below baseHeight - 1.
      const target = Math.max(baseHeight - 2, currentH - 3);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 1 || ny < 1 || nx >= size - 1 || ny >= size - 1) continue;
          const idx = ny * size + nx;
          if (heights[idx] > target) heights[idx] = target;
        }
      }
      waterfallPath.push([cx, currentH, cy]);

      // Pick lowest neighbour; bias downward (positive y in world).
      let bestX = cx;
      let bestY = cy;
      let bestH = currentH;
      for (let dy = -1; dy <= 2; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 1 || ny < 1 || nx >= size - 1 || ny >= size - 1) continue;
          if (visited[ny * size + nx]) continue;
          const h = heights[ny * size + nx];
          // Prefer downward but allow small uphill at peak region.
          const score = h - Math.max(0, dy) * 0.5;
          if (score < bestH) {
            bestH = score;
            bestX = nx;
            bestY = ny;
          }
        }
      }
      if (bestX === cx && bestY === cy) break;
      cx = bestX;
      cy = bestY;
      if (currentH <= baseHeight - 1) break;
    }
  }

  return {
    size,
    voxelSize: cfg.voxelSize,
    heights,
    waterfallPath,
    waterfallStartHeight,
    spawnWaterfall: carveWaterfall,
  };
}

export function voxelTypeAt(
  heights: Uint8Array,
  size: number,
  x: number,
  y: number,
  surface: number,
  snowLine: number,
  stoneLine: number,
  sandLine: number
): VoxelType {
  const depthFromSurface = surface - y;
  if (depthFromSurface < 0) return VOXEL.grass; // safety
  if (depthFromSurface === 0) {
    if (surface >= snowLine) return VOXEL.snow;
    if (surface >= stoneLine) return VOXEL.stone;
    if (surface <= sandLine) return VOXEL.sand;
    return VOXEL.grass;
  }
  if (depthFromSurface <= 2) return VOXEL.dirt;
  return VOXEL.rock;
}
