// Terrain model: turn scene options into a heightmap plus the voxel instance
// list. Kept framework-free so the Three.js layer can be swapped or tested.

import { makeValueNoise, fbm, clamp, smoothstep } from "../noise.js";

// Build the mesa (main peak), a ridged sub-peak range and rolling ground into a
// single integer height grid of size resolution x resolution, centred on origin,
// then carve the waterfall chute and the plunge pool and report their levels.
export function buildHeightmap(opts) {
  const R = opts.resolution;
  const noise = makeValueNoise(opts.seed, 256);
  const ridgeNoise = makeValueNoise(opts.seed + 977, 256);

  const half = R / 2;
  const mesaCx = opts.mesaCenter[0];
  const mesaCz = opts.mesaCenter[1];
  const heights = new Int16Array(R * R);
  const gridOf = (wx) => clamp(Math.round(wx + half), 0, R - 1);

  for (let z = 0; z < R; z++) {
    for (let x = 0; x < R; x++) {
      const wx = x - half;
      const wz = z - half;

      // Rolling ground hills, kept low so the main peak dominates.
      const g = fbm(noise, (x / R) * 6, (z / R) * 6, 5);
      let h = Math.pow(g, 1.6) * opts.groundAmp;

      // Ridged noise for a handful of secondary peaks ringing the mesa.
      const ridge = 1 - Math.abs(fbm(ridgeNoise, (x / R) * 3.5 + 12, (z / R) * 3.5 - 7, 4) * 2 - 1);
      const ridgeAmp = opts.subPeakAmp * Math.pow(smoothstep(0.45, 0.9, ridge), 1.4);
      const md = Math.hypot(wx - mesaCx, wz - mesaCz);
      // Keep ridges out of the mesa footprint so the cliff face stays clean.
      const ridgeMask = smoothstep(opts.mesaRadius * 0.6, opts.mesaRadius + opts.rimWidth * 1.4, md);
      h += ridgeAmp * ridgeMask;

      // Mesa: flat top inside mesaRadius, tapering over rimWidth to the ground.
      const t = 1 - smoothstep(opts.mesaRadius, opts.mesaRadius + opts.rimWidth, md);
      h += opts.mesaTop * Math.pow(t, 0.7);

      heights[z * R + x] = Math.max(0, Math.round(h));
    }
  }

  // Flatten the table top into a shallow tarn so the lake rests in a bowl and
  // only spills through the carved notch.
  const lakeR = Math.max(5, opts.mesaRadius - 7);
  let tableTop = 0;
  discEach(heights, R, mesaCx, mesaCz, opts.mesaRadius - 2, (i, h) => {
    tableTop = Math.max(tableTop, h);
  });
  discEach(heights, R, mesaCx, mesaCz, opts.mesaRadius - 2, (i) => {
    heights[i] = tableTop;
  });
  discEach(heights, R, mesaCx, mesaCz, lakeR + 1, (i) => {
    heights[i] = tableTop - 1;
  });

  const lakeY = tableTop - 0.2;

  const dirX = Math.cos(opts.fallAngle);
  const dirZ = Math.sin(opts.fallAngle);
  const poolDist = opts.mesaRadius + opts.rimWidth + 7;
  const poolCx = mesaCx + dirX * poolDist;
  const poolCz = mesaCz + dirZ * poolDist;
  const poolR = Math.max(4, opts.fallWidth * 1.2);

  // Ground level the fall lands on: lowest terrain just outside the basin so
  // the pool stays walled in on every side.
  let ringMin = Infinity;
  for (let a = 0; a < 16; a++) {
    const ang = (a / 16) * Math.PI * 2;
    const rx = gridOf(poolCx + Math.cos(ang) * (poolR + 4));
    const rz = gridOf(poolCz + Math.sin(ang) * (poolR + 4));
    ringMin = Math.min(ringMin, heights[rz * R + rx]);
  }
  const basinFloor = Math.max(0, Math.min(ringMin, opts.groundAmp) - 2);
  const poolY = basinFloor + 1.1;

  carveDisc(heights, R, poolCx, poolCz, poolR + 3, basinFloor);

  // Spillway: notch the rim so the water leaves the lake through the cliff.
  const spillY = lakeY - 2;
  for (let s = 0; s <= 1; s += 0.05) {
    const px = mesaCx + dirX * (opts.mesaRadius - 2 + s * (opts.rimWidth + 6));
    const pz = mesaCz + dirZ * (opts.mesaRadius - 2 + s * (opts.rimWidth + 6));
    const band = Math.round((opts.fallWidth / 2) * (1 - 0.35 * s));
    for (let w = -band; w <= band; w++) {
      const gx = gridOf(px - dirZ * w);
      const gz = gridOf(pz + dirX * w);
      const i = gz * R + gx;
      heights[i] = Math.min(heights[i], Math.round(spillY - s * (spillY - basinFloor)));
    }
  }

  return {
    R,
    half,
    heights,
    features: { tableTop, lakeY, poolY, poolCx, poolCz, poolR, basinFloor, lakeR },
  };
}

function discEach(heights, R, cx, cz, r, visit) {
  const step = Math.max(1, Math.ceil(r));
  for (let dz = -step; dz <= step; dz++) {
    for (let dx = -step; dx <= step; dx++) {
      if (dx * dx + dz * dz > r * r) continue;
      const gx = clamp(Math.round(cx + dx + R / 2), 0, R - 1);
      const gz = clamp(Math.round(cz + dz + R / 2), 0, R - 1);
      const i = gz * R + gx;
      visit(i, heights[i]);
    }
  }
}

function carveDisc(heights, R, cx, cz, r, floor) {
  for (let dz = -Math.ceil(r); dz <= Math.ceil(r); dz++) {
    for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) {
      if (dx * dx + dz * dz > r * r) continue;
      const gx = clamp(Math.round(cx + dx + R / 2), 0, R - 1);
      const gz = clamp(Math.round(cz + dz + R / 2), 0, R - 1);
      const i = gz * R + gx;
      heights[i] = Math.min(heights[i], Math.round(floor));
    }
  }
}

// Convert the height grid into crust voxel transforms plus per-voxel colours.
// A column is filled from the lowest neighbour top up to its own top, so slopes
// and cliffs stay solid while flat ground costs a single cube.
export function buildVoxelMesh(map, opts) {
  const { R, half, heights } = map;
  const colorNoise = makeValueNoise(opts.seed + 33, 256);

  let count = 0;
  for (let z = 0; z < R; z++) {
    for (let x = 0; x < R; x++) {
      count += clamp(heights[z * R + x] - minNeighbour(heights, R, x, z) + 1, 1, 44);
    }
  }

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const out = new THREE_Color();
  let idx = 0;

  for (let z = 0; z < R; z++) {
    for (let x = 0; x < R; x++) {
      const h = heights[z * R + x];
      const m = Math.min(minNeighbour(heights, R, x, z), h);
      const span = clamp(h - m + 1, 1, 44);
      const wx = x - half;
      const wz = z - half;
      const slope = (h - m) / 3;
      const jitter = colorNoise((x / R) * 8, (z / R) * 8);
      for (let k = 0; k < span; k++) {
        const top = k === span - 1;
        terrainColor(out, opts, wx, m + k, h, top, slope, jitter);
        positions[idx * 3] = wx;
        positions[idx * 3 + 1] = m + k + 0.5;
        positions[idx * 3 + 2] = wz;
        colors[idx * 3] = out.r;
        colors[idx * 3 + 1] = out.g;
        colors[idx * 3 + 2] = out.b;
        idx++;
      }
    }
  }

  return { count, positions, colors };
}

function minNeighbour(heights, R, x, z) {
  const i = z * R + x;
  let m = heights[i];
  if (x > 0) m = Math.min(m, heights[i - 1]);
  if (x < R - 1) m = Math.min(m, heights[i + 1]);
  if (z > 0) m = Math.min(m, heights[i - R]);
  if (z < R - 1) m = Math.min(m, heights[i + R]);
  return m;
}

// Tiny mutable colour holder to avoid allocating a THREE.Color per voxel.
class THREE_Color {
  constructor() { this.r = 0; this.g = 0; this.b = 0; }
  set(r, g, b) { this.r = r; this.g = g; this.b = b; return this; }
}

// Palette driven by the time-of-day preset.
function terrainColor(out, opts, wx, y, h, top, slope, jitter) {
  const pal = PALETTES[opts.timeOfDay] || PALETTES.dusk;
  if (!top) {
    const s = 0.8 + jitter * 0.16;
    return out.set(pal.rock[0] * s, pal.rock[1] * s, pal.rock[2] * s);
  }
  if (h >= opts.snowLine) {
    const v = 0.9 + jitter * 0.1;
    return out.set(pal.snow[0] * v, pal.snow[1] * v, pal.snow[2] * v);
  }
  if (h >= opts.snowLine - 6 || slope > 1.4) {
    const v = 0.78 + jitter * 0.22;
    return out.set(pal.rock[0] * v, pal.rock[1] * v, pal.rock[2] * v);
  }
  if (h <= 2) {
    const v = 0.85 + jitter * 0.2;
    return out.set(pal.sand[0] * v, pal.sand[1] * v, pal.sand[2] * v);
  }
  const v = 0.8 + jitter * 0.28;
  return out.set(pal.grass[0] * v, pal.grass[1] * v, pal.grass[2] * v);
}

export const PALETTES = {
  noon: {
    grass: [0.42, 0.68, 0.33], rock: [0.55, 0.52, 0.48], snow: [0.97, 0.98, 1], sand: [0.8, 0.72, 0.53],
    skyTop: "#3f7fc4", skyHorizon: "#a9d3ea", fog: "#a9d3ea",
    sun: [1, 0.97, 0.9], sunPos: [70, 130, 50], sunColor: "#fff6e0", hemi: [0.82, 0.88, 0.96],
  },
  dusk: {
    grass: [0.35, 0.46, 0.34], rock: [0.47, 0.39, 0.38], snow: [0.9, 0.8, 0.8], sand: [0.66, 0.52, 0.44],
    skyTop: "#3a3363", skyHorizon: "#f0895a", fog: "#e08a63",
    sun: [1, 0.7, 0.47], sunPos: [-90, 34, 62], sunColor: "#ff9d5c", hemi: [0.62, 0.52, 0.62],
  },
  dawn: {
    grass: [0.38, 0.52, 0.38], rock: [0.48, 0.44, 0.46], snow: [0.9, 0.88, 0.95], sand: [0.68, 0.6, 0.52],
    skyTop: "#4b6a9a", skyHorizon: "#f6c9a8", fog: "#e8c3ad",
    sun: [1, 0.88, 0.78], sunPos: [80, 30, -70], sunColor: "#ffd9b0", hemi: [0.66, 0.7, 0.84],
  },
  night: {
    grass: [0.13, 0.19, 0.24], rock: [0.17, 0.18, 0.24], snow: [0.42, 0.46, 0.58], sand: [0.25, 0.25, 0.32],
    skyTop: "#050a1c", skyHorizon: "#1a2440", fog: "#141d33",
    sun: [0.52, 0.6, 0.85], sunPos: [-50, 70, 40], sunColor: "#9fb4e8", hemi: [0.2, 0.24, 0.4],
  },
};
