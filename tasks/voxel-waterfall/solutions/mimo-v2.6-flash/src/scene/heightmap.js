// Heightmap generation, smoothing, waterfall carving, clouds and vegetation scatter.

import { createRng, fbm, ridgedFbm, smoothstep } from './noise.js';

export const SEA_LEVEL = 3;
export const FOOT_LEVEL = 5; // waterfalls terminate near the foot of the mountain

/**
 * Build an N x N integer heightmap: one main peak, several secondary peaks,
 * ridged noise for natural undulation, radial falloff to a low coastal foot.
 */
export function generateHeightmap(N, seed) {
  const heights = new Int16Array(N * N);
  const half = N / 2;
  const s = seed | 0;

  // Peaks in grid coords (relative to center). Main peak sits at the back so
  // its front face (+z, toward the default camera) carries the waterfall.
  const peaks = [
    { x: -0.04 * N, z: -0.16 * N, amp: 0.52, sig: 0.15 * N }, // main
    { x: 0.26 * N, z: 0.02 * N, amp: 0.36, sig: 0.12 * N },
    { x: -0.3 * N, z: 0.08 * N, amp: 0.3, sig: 0.11 * N },
    { x: 0.14 * N, z: -0.3 * N, amp: 0.33, sig: 0.1 * N },
    { x: -0.18 * N, z: 0.28 * N, amp: 0.22, sig: 0.1 * N },
  ];
  const maxAmp = 0.52 * N * 0.62; // tallest peak height in blocks

  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const x = i - half;
      const z = j - half;
      const r = Math.sqrt(x * x + z * z) / half;
      const mask = smoothstep(1.0, 0.3, r);

      const ridge = ridgedFbm(x * 0.028, z * 0.028, s, 4);
      const detail = fbm(x * 0.09, z * 0.09, s + 77, 3) - 0.5;

      let peakH = 0;
      for (const p of peaks) {
        const dx = x - p.x;
        const dz = z - p.z;
        const g = Math.exp(-(dx * dx + dz * dz) / (2 * p.sig * p.sig));
        const jag = 0.8 + 0.4 * fbm(x * 0.05 + p.x, z * 0.05 + p.z, s + 31, 3);
        peakH += p.amp * maxAmp * g * jag;
      }

      let h = (ridge * maxAmp * 0.55 + peakH + detail * maxAmp * 0.16) * mask;
      h += 1.6 * (1 - mask); // shallow shelf toward the edges
      h += 0.6;

      heights[j * N + i] = Math.max(1, Math.round(h));
    }
  }

  smoothInPlace(heights, N, 2);
  return heights;
}

// 3x3 box blur (keeps edges) — rounds slope transitions into natural ramps.
function smoothInPlace(heights, N, passes) {
  let src = heights;
  for (let p = 0; p < passes; p++) {
    const dst = new Int16Array(src.length);
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        let sum = 0;
        let cnt = 0;
        for (let dj = -1; dj <= 1; dj++) {
          const jj = j + dj;
          if (jj < 0 || jj >= N) continue;
          for (let di = -1; di <= 1; di++) {
            const ii = i + di;
            if (ii < 0 || ii >= N) continue;
            sum += src[jj * N + ii];
            cnt++;
          }
        }
        dst[j * N + i] = Math.round(sum / cnt);
      }
    }
    src = dst;
  }
  heights.set(src);
}

export function slopeAt(heights, N, i, j) {
  const h = heights[j * N + i];
  let diff = 0;
  let cnt = 0;
  for (const [di, dj] of NEIGH4) {
    const ii = i + di;
    const jj = j + dj;
    if (ii < 0 || ii >= N || jj < 0 || jj >= N) continue;
    diff += Math.abs(heights[jj * N + ii] - h);
    cnt++;
  }
  return cnt ? diff / cnt : 0;
}

const NEIGH4 = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/**
 * Carve `count` waterfalls from high springs down to the foot.
 * Mutates `heights` (local pools are carved into the terrain).
 *
 * Returns {
 *   cells: Map<"x,y,z", {flow, kind}>  kind: 0 sea / 1 water / 2 foam
 *   pathCells: Set<"i,j">              columns touched by water (keep trees out)
 * }
 */
export function carveWaterfalls(heights, N, seed, count, width) {
  const cells = new Map();
  const pathCells = new Set();
  const half = N / 2;
  const rng = createRng(seed ^ 0x5eed);
  const key = (x, y, z) => `${x},${y},${z}`;

  const addWater = (x, y, z, flow, kind = 1) => {
    const k = key(x, y, z);
    const prev = cells.get(k);
    if (!prev || kind > prev.kind || flow < prev.flow) {
      cells.set(k, { flow, kind: Math.max(kind, prev ? prev.kind : 0) });
    }
  };

  // Candidate springs: high columns; slight preference for the front-right
  // quadrant that faces the default camera.
  const candidates = [];
  for (let j = 2; j < N - 2; j++) {
    for (let i = 2; i < N - 2; i++) {
      const h = heights[j * N + i];
      if (h > FOOT_LEVEL + 14) {
        // Strong bias toward the front-right quadrant the default camera sees,
        // so the main waterfall is visible as soon as the page opens.
        const bonus = (j > N / 2 ? 28 : 0) + (i > N / 2 ? 8 : 0);
        candidates.push({ i, j, h, score: h + bonus });
      }
    }
  }
  candidates.sort((a, b) => b.score - a.score);

  // Pick well-separated springs; prefer the back half (z small) so water
  // flows toward the default camera (+z front face).
  const springs = [];
  const minSep = Math.max(14, N * 0.16);
  for (const c of candidates) {
    if (springs.length >= count) break;
    const ok = springs.every((s) => {
      const dx = s.i - c.i;
      const dz = s.j - c.j;
      return dx * dx + dz * dz > minSep * minSep;
    });
    if (!ok) continue;
    springs.push(c);
  }

  for (const spring of springs) {
    descend(heights, N, spring.i, spring.j, {
      addWater,
      pathCells,
      rng,
      half,
      width,
    });
  }

  return { cells, pathCells };
}

function descend(heights, N, si, sj, ctx) {
  const { addWater, pathCells, rng, half, width } = ctx;
  let ci = si;
  let cj = sj;
  let ch = heights[cj * N + ci];
  let flow = 0;
  let dirx = 0;
  let dirz = 1; // initial bias: toward +z (front / camera side)
  let steps = 0;
  const maxSteps = N * 4;

  while (steps++ < maxSteps) {
    pathCells.add(`${ci},${cj}`);

    // Water resting on the current column top.
    addWater(ci - half, ch + 1, cj - half, flow);
    flow += 1;

    if (ch <= FOOT_LEVEL) {
      foamAt(heights, N, ci, cj, half, flow, rng, addWater, pathCells, width + 1);
      break;
    }

    // Find the lowest neighbour; break ties by momentum + front bias.
    let minH = Infinity;
    for (let dz = -1; dz <= 1; dz++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dz === 0) continue;
        const ni = ci + dx;
        const nj = cj + dz;
        if (ni < 1 || ni >= N - 1 || nj < 1 || nj >= N - 1) continue;
        const nh = heights[nj * N + ni];
        if (nh < minH) minH = nh;
      }
    }
    if (minH === Infinity) break;

    let best = null;
    for (let dz = -1; dz <= 1; dz++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dz === 0) continue;
        const ni = ci + dx;
        const nj = cj + dz;
        if (ni < 1 || ni >= N - 1 || nj < 1 || nj >= N - 1) continue;
        if (heights[nj * N + ni] > minH) continue;
        const score =
          dz * 1.6 + // toward camera front
          (dx * dirx + dz * dirz) * 1.2 + // momentum
          -Math.abs(dx) * 0.35 +
          rng() * 0.4;
        if (!best || score > best.score) best = { ni, nj, score };
      }
    }
    if (!best) break;

    let nh = minH;
    // Local basin / plateau: cut a channel through the lowest rim so the
    // water always keeps flowing downhill (each step strictly decreases).
    if (minH >= ch) {
      if (ch - 1 < SEA_LEVEL + 1) break;
      heights[best.nj * N + best.ni] = ch - 1;
      nh = ch - 1;
    }

    // Pour a curtain of water down the drop at the destination column.
    for (let y = nh + 1; y <= ch + 1; y++) {
      addWater(best.ni - half, y, best.nj - half, flow + (ch - y) * 0.15);
    }
    pathCells.add(`${best.ni},${best.nj}`);

    if (width > 1) {
      widenStream(heights, N, best.ni, best.nj, nh, width, flow, half, addWater, pathCells);
    }

    dirx = best.ni - ci;
    dirz = best.nj - cj;
    ci = best.ni;
    cj = best.nj;
    ch = nh;
    flow += 1;
  }
}

function widenStream(heights, N, ci, cj, ch, width, flow, half, addWater, pathCells) {
  const radius = width - 1;
  for (let dz = -radius; dz <= radius; dz++) {
    for (let dx = -radius; dx <= radius; dx++) {
      if (dx === 0 && dz === 0) continue;
      const ni = ci + dx;
      const nj = cj + dz;
      if (ni < 0 || ni >= N || nj < 0 || nj >= N) continue;
      const nh = heights[nj * N + ni];
      if (Math.abs(nh - ch) > 1) continue; // only fill near-level banks
      addWater(ni - half, nh + 1, nj - half, flow + 0.3);
      pathCells.add(`${ni},${nj}`);
    }
  }
}

function foamAt(heights, N, ci, cj, half, flow, rng, addWater, pathCells, radius) {
  for (let dz = -radius; dz <= radius; dz++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const ni = ci + dx;
      const nj = cj + dz;
      if (ni < 0 || ni >= N || nj < 0 || nj >= N) continue;
      const dist = Math.abs(dx) + Math.abs(dz);
      if (dist > radius + 1) continue;
      if (rng() > 0.75 - dist * 0.12) continue;
      const nh = heights[nj * N + ni];
      addWater(ni - half, nh + 1, nj - half, flow + dist * 0.4, 2);
      if (rng() < 0.3 && nh + 2 <= FOOT_LEVEL + 3) {
        addWater(ni - half, nh + 2, nj - half, flow + dist * 0.4, 2);
      }
      pathCells.add(`${ni},${nj}`);
    }
  }
}

/** Fill sea cubes for every column below SEA_LEVEL; returns cell map entries. */
export function collectSea(heights, N, cells) {
  const half = N / 2;
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const h = heights[j * N + i];
      if (h >= SEA_LEVEL) continue;
      const x = i - half;
      const z = j - half;
      // irregular flow phase so the shimmer reads as ripples, not stripes.
      // Negative values mark "sea" for the water shader (no emissive lift).
      const phase = -(fbm(x * 0.12, z * 0.12, 4242, 3) * 14 + 1);
      for (let y = h + 1; y <= SEA_LEVEL; y++) {
        const k = `${x},${y},${z}`;
        if (!cells.has(k)) cells.set(k, { flow: phase, kind: 0 });
      }
    }
  }
}

/**
 * Voxel cloud puffs in a band around `cloudHeight`; returns Float32Array
 * positions [x,y,z, ...].
 */
export function generateClouds(N, seed, cloudHeight, density) {
  const rng = createRng((seed ^ 0xc10d) | 0);
  const half = N / 2;
  const pos = [];
  const puffCount = Math.floor(density * N * 0.6);
  const maxCells = 9500;
  const s = seed | 0;

  for (let p = 0; p < puffCount * 3 && pos.length / 3 < maxCells; p++) {
    const cx = (rng() - 0.5) * N * 1.02;
    const cz = (rng() - 0.5) * N * 1.02;
    // Concentrate puffs over the island so the band wraps the mountain waist
    // rather than drifting mostly over open sea.
    const r = Math.sqrt(cx * cx + cz * cz) / half;
    const keep = r < 0.45 ? 1 : r < 0.7 ? 0.8 : 0.35;
    if (rng() > keep) continue;
    const cy = cloudHeight + Math.round((rng() - 0.5) * 4);
    const rx = 4 + rng() * 8;
    const ry = 1.2 + rng() * 1.6;
    const rz = 4 + rng() * 8;

    const i0 = Math.floor(cx - rx) - 1;
    const i1 = Math.ceil(cx + rx) + 1;
    const j0 = Math.floor(cz - rz) - 1;
    const j1 = Math.ceil(cz + rz) + 1;
    const k0 = Math.floor(cy - ry) - 1;
    const k1 = Math.ceil(cy + ry) + 1;

    for (let y = k0; y <= k1; y++) {
      for (let z = j0; z <= j1; z++) {
        for (let x = i0; x <= i1; x++) {
          if (pos.length / 3 >= maxCells) break;
          const ex = (x + 0.5 - cx) / rx;
          const ey = (y + 0.5 - cy) / ry;
          const ez = (z + 0.5 - cz) / rz;
          const d = ex * ex + ey * ey + ez * ez;
          if (d > 1) continue;
          // Erode the rim with noise for a fluffy silhouette.
          const n = fbm(x * 0.35, z * 0.35 + y * 0.5, s + 999, 2);
          if (d > 0.5 && n < 0.42) continue;
          if (x < -half - 6 || x > half + 6 || z < -half - 6 || z > half + 6) continue;
          pos.push(x, y, z);
        }
      }
    }
  }
  return new Float32Array(pos);
}

/**
 * Scatter voxel trees on gentle ground near the foot.
 * Returns { trunks: Float32Array, leaves: Float32Array } positions.
 */
export function generateVegetation(heights, N, seed, density, pathCells) {
  const rng = createRng((seed ^ 0x7ee5) | 0);
  const half = N / 2;
  treeMarks.fill(0);
  const trunks = [];
  const leaves = [];
  const treeCap = Math.floor(900 * density) + 40;
  const treeLine = 26;
  let trees = 0;

  for (let attempt = 0; attempt < N * N * 2 && trees < treeCap; attempt++) {
    const i = 2 + Math.floor(rng() * (N - 4));
    const j = 2 + Math.floor(rng() * (N - 4));
    const h = heights[j * N + i];
    if (h <= SEA_LEVEL || h > treeLine) continue;
    if (slopeAt(heights, N, i, j) > 2.2) continue;
    if (pathCells.has(`${i},${j}`)) continue;
    if (rng() > density * 0.5) continue;

    // Keep trees apart a bit.
    let crowded = false;
    for (let dj = -2; dj <= 2 && !crowded; dj++) {
      for (let di = -2; di <= 2; di++) {
        const ii = i + di;
        const jj = j + dj;
        if (ii < 0 || ii >= N || jj < 0 || jj >= N) continue;
        if (treeMarks[jj * N + ii]) {
          crowded = true;
          break;
        }
      }
    }
    if (crowded) continue;
    treeMarks[j * N + i] = 1;
    trees++;

    const x = i - half;
    const z = j - half;
    const trunkH = 3 + Math.floor(rng() * 2);
    for (let t = 1; t <= trunkH; t++) trunks.push(x, h + t, z);

    const top = h + trunkH;
    for (let dy = 0; dy <= 2; dy++) {
      const rad = dy === 2 ? 1 : 2;
      for (let dz = -rad; dz <= rad; dz++) {
        for (let dx = -rad; dx <= rad; dx++) {
          if (Math.abs(dx) === rad && Math.abs(dz) === rad && rng() < 0.6) continue;
          if (dy === 0 && Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;
          leaves.push(x + dx, top + dy, z + dz);
        }
      }
    }
    // crown tip
    leaves.push(x, top + 3, z);
  }

  return {
    trunks: new Float32Array(trunks),
    leaves: new Float32Array(leaves),
  };
}

// Occupancy grid for tree spacing (reset at the start of each generation).
const treeMarks = new Uint8Array(1024 * 1024);
