import { fbm2D, ridged2D, hash2 } from './noise.js';

export const GRID = 160;   // voxel columns per side (task requires >= 128)
export const HALF = GRID / 2;

// Peak layout in normalized [0,1] grid coordinates: main summit + three
// secondary summits. Gaussian envelopes give natural peak/valley rhythm.
const PEAKS = [
  { x: 0.42, z: 0.46, h: 62, r: 0.26 },
  { x: 0.72, z: 0.68, h: 44, r: 0.19 },
  { x: 0.30, z: 0.78, h: 38, r: 0.17 },
  { x: 0.80, z: 0.24, h: 33, r: 0.15 },
];

/**
 * Generate the pristine terrain heightmap.
 * Returns { heights: Int16Array(GRID*GRID), maxH }.
 * heights[i] = number of solid voxels in the column; top surface at y = heights[i].
 */
export function generateHeightmap({ seed, heightScale, noiseScale }) {
  const heights = new Int16Array(GRID * GRID);
  let maxH = 0;
  const ns = noiseScale;

  for (let z = 0; z < GRID; z++) {
    for (let x = 0; x < GRID; x++) {
      const u = x / GRID, v = z / GRID;

      // Rolling foothills base.
      const base = 4.5 + fbm2D(u * 4.3 * ns, v * 4.3 * ns, seed + 11, 4) * 7.5;

      // Mountain envelope: strongest peak wins, saddles form in between.
      let mount = 0;
      for (let k = 0; k < PEAKS.length; k++) {
        const p = PEAKS[k];
        const dx = u - p.x, dz = v - p.z;
        const contrib = p.h * Math.exp(-(dx * dx + dz * dz) / (p.r * p.r) * 2.1);
        if (contrib > mount) mount = contrib;
      }

      // Ridged detail on the envelope: crests and gullies on the flanks.
      const ridge = ridged2D(u * 6.5 * ns, v * 6.5 * ns, seed + 77, 4);
      mount *= 0.62 + 0.55 * ridge;

      // Border falloff: terrain sinks to low ground at the map edge.
      const bx = Math.min(x, z, GRID - 1 - x, GRID - 1 - z);
      const edge = 0.06 + 0.94 * Math.min(bx / 10, 1);

      const hgt = Math.max(1, (base + mount * heightScale) * edge);
      const h = Math.min(92, Math.round(hgt));
      heights[z * GRID + x] = h;
      if (h > maxH) maxH = h;
    }
  }
  return { heights, maxH };
}

/** Box-blur the heightmap (radius r) into a new array — used for pathfinding. */
export function smoothHeightmap(heights, r = 3) {
  const out = new Float32Array(GRID * GRID);
  for (let z = 0; z < GRID; z++) {
    for (let x = 0; x < GRID; x++) {
      let sum = 0, n = 0;
      for (let dz = -r; dz <= r; dz++) {
        const zz = z + dz;
        if (zz < 0 || zz >= GRID) continue;
        for (let dx = -r; dx <= r; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= GRID) continue;
          sum += heights[zz * GRID + xx];
          n++;
        }
      }
      out[z * GRID + x] = sum / n;
    }
  }
  return out;
}

// ---- Biome palettes (converted to linear working space once) ----
import { Color } from 'three';
const lin = (hex) => { const c = new Color(hex); return [c.r, c.g, c.b]; };
const PAL = {
  grassA: lin(0x5a943c), grassB: lin(0x6fa040),
  rockA: lin(0x7f828c), rockB: lin(0x6e7179),
  rockHigh: lin(0x8b8f9a),
  dirt: lin(0x7a5a3a),
  snow: lin(0xf2f6fa),
  sand: lin(0xd6c08a),
};

/**
 * Build the per-voxel color function handed to the mesher.
 * colorFn(x, z, y, isTopFace) -> [r, g, b] in linear space.
 */
export function makeColorFn(heights, water, { seed, snowLine, maxH }) {
  const snow = Math.min(snowLine, maxH - 5);
  return (x, z, y, isTop) => {
    const h = heights[z * GRID + x];
    const jitter = (hash2(x * 3 + y * 17, z * 7 + y * 5, seed) - 0.5) * 0.12;
    let out;

    if (isTop) {
      // Slope: max height difference to the 4 neighbors.
      let slope = 0;
      if (x > 0) slope = Math.max(slope, h - heights[z * GRID + x - 1]);
      if (x < GRID - 1) slope = Math.max(slope, h - heights[z * GRID + x + 1]);
      if (z > 0) slope = Math.max(slope, h - heights[(z - 1) * GRID + x]);
      if (z < GRID - 1) slope = Math.max(slope, h - heights[(z + 1) * GRID + x]);

      const underWater = water[z * GRID + x] >= 0;
      if (underWater) {
        out = PAL.sand; // river bed / pool floor
      } else if (slope >= 3) {
        out = (hash2(x, z, seed + 5) < 0.5) ? PAL.rockA : PAL.rockB;
      } else if (y >= snow) {
        out = PAL.snow;
      } else if (y >= snow - 4) {
        // narrow rock/snow transition band
        out = (hash2(x, z, seed + 9) < 0.45) ? PAL.rockHigh : PAL.snow;
      } else if (y >= snow - 14) {
        out = (hash2(x, z, seed + 3) < 0.5) ? PAL.rockA : PAL.rockB;
      } else {
        const patch = hash2(x >> 3, z >> 3, seed + 21);
        out = patch < 0.5 ? PAL.grassA : PAL.grassB;
      }
    } else {
      // Side faces: dirt lip just under a grass top, rock strata deeper.
      if (y === h && h > 4 && h < snow - 14) {
        out = PAL.dirt;
      } else {
        out = (hash2(x * 3 + y, z * 5 + y, seed + 31) < 0.5) ? PAL.rockA : PAL.rockB;
      }
    }
    return [out[0] * (1 + jitter), out[1] * (1 + jitter), out[2] * (1 + jitter)];
  };
}
