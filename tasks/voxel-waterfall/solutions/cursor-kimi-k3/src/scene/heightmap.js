import { mulberry32, makeNoise2D, fbm } from './rng.js';

export const SIZE = 128;

// Builds a 128x128 column-height map: one main peak plus several secondary
// peaks (gaussian bumps, max-blended), fbm base hills, altitude-scaled
// roughness, edge falloff onto a plain, then smoothing for natural slopes.
export function generateHeightmap(seed) {
  const rng = mulberry32(seed);
  const noise = makeNoise2D(seed ^ 0x9e3779b9);
  const size = SIZE;
  const cx = size / 2;
  const cz = size / 2;

  const peaks = [];
  const main = {
    x: cx + (rng() - 0.5) * 14,
    z: cz + (rng() - 0.5) * 14,
    h: 44 + Math.floor(rng() * 6),
    r: 30 + rng() * 8,
  };
  peaks.push(main);
  // shoulder bumps break the main cone's symmetry into a ridged massif
  const nShoulder = 2 + Math.floor(rng() * 2);
  for (let i = 0; i < nShoulder; i++) {
    const ang = rng() * Math.PI * 2;
    const dist = 8 + rng() * 9;
    peaks.push({
      x: main.x + Math.cos(ang) * dist,
      z: main.z + Math.sin(ang) * dist,
      h: main.h * (0.55 + rng() * 0.25),
      r: main.r * (0.45 + rng() * 0.3),
    });
  }
  const nSec = 4 + Math.floor(rng() * 3);
  for (let i = 0; i < nSec; i++) {
    const ang = (i / nSec) * Math.PI * 2 + rng() * 0.9;
    const dist = 24 + rng() * 26;
    peaks.push({
      x: cx + Math.cos(ang) * dist,
      z: cz + Math.sin(ang) * dist,
      h: 18 + rng() * 20,
      r: 13 + rng() * 12,
    });
  }

  const heights = new Float32Array(size * size);
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      let m = 0;
      for (const p of peaks) {
        const dx = x - p.x;
        const dz = z - p.z;
        const d2 = (dx * dx + dz * dz) / (p.r * p.r);
        const v = p.h * Math.exp(-d2 * 2.2);
        if (v > m) m = v;
      }
      const base = fbm(noise, x * 0.03, z * 0.03, 4) * 8;
      const rough = fbm(noise, x * 0.09 + 50, z * 0.09 + 50, 4) - 0.5;
      let h = m + base + rough * (5 + m * 0.55);
      // radial falloff so the range reads as a round massif, not a square
      const rdx = (x - cx) / (size * 0.5);
      const rdz = (z - cz) / (size * 0.5);
      const rd = Math.sqrt(rdx * rdx + rdz * rdz);
      const fall = Math.min(1, Math.max(0, (1.12 - rd) / 0.32));
      h = h * (0.2 + 0.8 * fall * fall);
      heights[z * size + x] = Math.max(1, h);
    }
  }

  smoothHeights(heights, size, 2);

  const out = new Uint8Array(size * size);
  let maxH = 0;
  for (let i = 0; i < heights.length; i++) {
    out[i] = Math.max(1, Math.round(heights[i]));
    if (out[i] > maxH) maxH = out[i];
  }
  return { size, heights: out, maxH, peaks };
}

function smoothHeights(h, size, passes) {
  const tmp = new Float32Array(h.length);
  for (let p = 0; p < passes; p++) {
    for (let z = 0; z < size; z++) {
      for (let x = 0; x < size; x++) {
        let sum = 0;
        let n = 0;
        for (let dz = -1; dz <= 1; dz++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const nz = z + dz;
            if (nx < 0 || nz < 0 || nx >= size || nz >= size) continue;
            sum += h[nz * size + nx];
            n++;
          }
        }
        tmp[z * size + x] = sum / n;
      }
    }
    h.set(tmp);
  }
}

export function minNeighborHeight(heights, size, x, z) {
  let m = Infinity;
  for (let dz = -1; dz <= 1; dz++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dz) continue;
      const nx = x + dx;
      const nz = z + dz;
      const nh = nx < 0 || nz < 0 || nx >= size || nz >= size ? 0 : heights[nz * size + nx];
      if (nh < m) m = nh;
    }
  }
  return m;
}
