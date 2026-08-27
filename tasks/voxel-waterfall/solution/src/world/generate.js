import { fbm2, fbm3, hash2, ridge2 } from '../lib/noise.js';
import { BLOCK } from '../lib/palette.js';

const DIRS8 = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export function generateWorld(params) {
  const size = params.size;
  const seed = params.seed | 0;
  const maxH = params.mountainHeight;
  const roughness = params.roughness;
  const waterWidth = Math.max(1, Math.round(params.waterfallWidth));

  const height = new Int16Array(size * size);
  const waterMask = new Uint8Array(size * size);
  const peaks = makePeaks(size, seed);
  let worldMax = 1;

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const nx = x / (size - 1);
      const nz = z / (size - 1);
      const pad = Math.min(nx, 1 - nx, nz, 1 - nz);
      const edge = pad < 0.09 ? smoothstep(0.09, 0.0, pad) : 1;

      const wx = fbm2(nx * 3.1, nz * 3.1, seed + 3, 4) * 0.14 * roughness;
      const wz = fbm2(nx * 3.1 + 18, nz * 3.1 + 11, seed + 9, 4) * 0.14 * roughness;

      let h = 0.11;
      h += (fbm2(nx * 2.1 + wx, nz * 2.1 + wz, seed, 5) * 0.5 + 0.5) * (0.2 + roughness * 0.16);
      h += ridge2(nx * 3.4 + wx * 1.8, nz * 3.4 + wz * 1.8, seed + 21, 4) * (0.1 + roughness * 0.12);

      for (const peak of peaks) {
        const dx = (x - peak.x) / size;
        const dz = (z - peak.z) / size;
        const d = Math.hypot(dx * peak.sx, dz * peak.sz);
        if (d >= peak.r) continue;
        const t = 1 - d / peak.r;
        const shaped = Math.pow(t, peak.sharp) * (t * t * (3 - 2 * t));
        let contrib = peak.h * shaped;
        if (dz > 0) contrib *= 1 - peak.southDrop * Math.min(1, dz / (peak.r + 0.001));
        h += contrib;
      }

      const valley = fbm2(nx * 1.6 + 8, nz * 1.6 - 4, seed + 44, 3);
      h *= 0.92 + valley * 0.07;
      h *= 0.34 + 0.66 * edge;
      const q = Math.max(2, Math.round(h * maxH));
      height[z * size + x] = q;
      if (q > worldMax) worldMax = q;
    }
  }

  const waterfall = carveWaterfalls(height, size, peaks, waterWidth, seed, waterMask);
  flattenPool(height, size, waterfall.poolCenter, waterfall.poolLevel, waterfall.poolRadius, waterMask);

  const clouds = scatterClouds(height, size, seed, worldMax, peaks, params);
  const plants = scatterVegetation(height, waterMask, size, seed, worldMax, params.vegetation);

  return {
    size,
    seed,
    height,
    waterMask,
    worldMax,
    peaks,
    waterfall,
    clouds,
    plants,
  };
}

function makePeaks(size, seed) {
  const jitter = (base, amount, salt) =>
    (base + (hash2(salt, seed, seed + salt) - 0.5) * amount) * (size - 1);
  return [
    { x: jitter(0.5, 0.05, 1), z: jitter(0.44, 0.05, 2), h: 1.05, r: 0.28, sharp: 1.35, sx: 1.08, sz: 0.88, southDrop: 0.34 },
    { x: jitter(0.3, 0.05, 3), z: jitter(0.34, 0.05, 4), h: 0.74, r: 0.2, sharp: 1.2, sx: 1.0, sz: 1.05, southDrop: 0.14 },
    { x: jitter(0.7, 0.05, 5), z: jitter(0.36, 0.05, 6), h: 0.66, r: 0.18, sharp: 1.22, sx: 1.12, sz: 1.0, southDrop: 0.18 },
    { x: jitter(0.62, 0.06, 7), z: jitter(0.66, 0.05, 8), h: 0.44, r: 0.17, sharp: 1.05, sx: 1.0, sz: 1.0, southDrop: 0.08 },
    { x: jitter(0.24, 0.05, 9), z: jitter(0.64, 0.05, 10), h: 0.38, r: 0.15, sharp: 1.0, sx: 1.0, sz: 1.04, southDrop: 0.06 },
  ];
}

function idx(x, z, size) {
  return z * size + x;
}

function inBounds(x, z, size) {
  return x >= 0 && z >= 0 && x < size && z < size;
}

function smoothstep(edge1, edge0, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function carveWaterfalls(height, size, peaks, width, seed, waterMask) {
  const starts = peaks
    .map((p) => ({
      x: Math.max(2, Math.min(size - 3, Math.round(p.x))),
      z: Math.max(2, Math.min(size - 3, Math.round(p.z))),
      h: p.h,
    }))
    .sort((a, b) => height[idx(b.x, b.z, size)] - height[idx(a.x, a.z, size)]);

  const cells = [];
  const reserved = new Uint8Array(size * size);
  let poolCenter = { x: starts[0].x, z: starts[0].z };
  let lowest = height[idx(starts[0].x, starts[0].z, size)];

  starts.slice(0, 2).forEach((start, index) => {
    const prefer = index === 0 ? [0.15, 1] : [-0.35, 0.9];
    const path = descend(height, size, start.x, start.z, prefer);
    if (path.length < 10) return;
    paintPath(height, size, path, index === 0 ? width : Math.max(1, width - 1), waterMask, cells, reserved);
    const end = path[path.length - 1];
    if (height[idx(end.x, end.z, size)] <= lowest) {
      lowest = height[idx(end.x, end.z, size)];
      poolCenter = end;
    }
  });

  return {
    cells,
    poolCenter,
    poolLevel: Math.max(2, lowest),
    poolRadius: Math.max(6, 5 + width),
  };
}

function descend(height, size, sx, sz, prefer) {
  const path = [];
  let x = sx;
  let z = sz;
  const visited = new Uint8Array(size * size);

  for (let step = 0; step < size * 2; step++) {
    const i = idx(x, z, size);
    if (visited[i]) break;
    visited[i] = 1;
    path.push({ x, z, y: height[i] });

    let bestX = x;
    let bestZ = z;
    let bestScore = Infinity;
    let found = false;
    for (const [dx, dz] of DIRS8) {
      const nx = x + dx;
      const nz = z + dz;
      if (!inBounds(nx, nz, size)) continue;
      const ni = idx(nx, nz, size);
      if (visited[ni] || height[ni] <= 0) continue;
      const drop = height[i] - height[ni];
      if (drop < 0) continue;
      const align = dx * prefer[0] + dz * prefer[1];
      const score = height[ni] - drop * 0.35 - align * 1.8;
      if (score < bestScore) {
        bestScore = score;
        bestX = nx;
        bestZ = nz;
        found = true;
      }
    }
    if (!found) break;
    if (height[idx(bestX, bestZ, size)] <= 4 && path.length > 14) {
      path.push({ x: bestX, z: bestZ, y: height[idx(bestX, bestZ, size)] });
      break;
    }
    x = bestX;
    z = bestZ;
  }
  return path;
}

function paintPath(height, size, path, width, waterMask, cells, reserved) {
  for (let p = 0; p < path.length; p++) {
    const cur = path[p];
    const next = path[Math.min(path.length - 1, p + 1)];
    const drop = Math.max(1, cur.y - next.y);

    for (let oz = -width; oz <= width; oz++) {
      for (let ox = -width; ox <= width; ox++) {
        if (ox * ox + oz * oz > width * width + 0.25) continue;
        const x = cur.x + ox;
        const z = cur.z + oz;
        if (!inBounds(x, z, size)) continue;
        const i = idx(x, z, size);
        if (height[i] <= 0) continue;
        if (ox === 0 && oz === 0 && height[i] > 3) height[i] = Math.max(3, height[i] - 1);
        waterMask[i] = 1;
        reserved[i] = 1;
        const top = height[i];
        const fall = ox * ox + oz * oz <= 1 ? drop : 1;
        for (let dy = 0; dy < fall; dy++) {
          const y = top - dy;
          if (y < 1) continue;
          cells.push({
            x,
            y,
            z,
            flow: drop > 1 ? 1 : 0.72,
          });
        }
      }
    }
  }
}

function flattenPool(height, size, center, level, radius, waterMask) {
  const r = radius;
  for (let z = center.z - r; z <= center.z + r; z++) {
    for (let x = center.x - r; x <= center.x + r; x++) {
      if (!inBounds(x, z, size)) continue;
      const d = Math.hypot(x - center.x, z - center.z);
      if (d > r) continue;
      const i = idx(x, z, size);
      if (height[i] <= 0) continue;
      const target = d < r - 1.4 ? level : Math.max(level, height[i] - 1);
      height[i] = Math.min(height[i], Math.max(2, target));
      if (d < r - 0.8) waterMask[i] = 2;
    }
  }
}

function scatterClouds(height, size, seed, worldMax, peaks, params) {
  const clouds = [];
  const band = Math.max(10, Math.round(worldMax * params.cloudHeight));
  const main = peaks[0];
  const puffs = [
    { x: 0.3, z: 0.34, rx: 16, rz: 12, h: 5 },
    { x: 0.72, z: 0.32, rx: 14, rz: 11, h: 5 },
    { x: 0.22, z: 0.58, rx: 13, rz: 12, h: 4 },
    { x: 0.78, z: 0.6, rx: 14, rz: 11, h: 4 },
    { x: 0.48, z: 0.74, rx: 18, rz: 10, h: 4 },
    { x: 0.56, z: 0.22, rx: 12, rz: 9, h: 3 },
  ];

  const density = params.cloudDensity;
  for (const puff of puffs) {
    const px = puff.x * (size - 1);
    const pz = puff.z * (size - 1);
    const rx = puff.rx * (0.75 + density * 0.55);
    const rz = puff.rz * (0.75 + density * 0.55);
    const h = Math.max(3, Math.round(puff.h * (0.8 + density * 0.5)));
    for (let z = Math.floor(pz - rz); z <= Math.ceil(pz + rz); z += 2) {
      for (let x = Math.floor(px - rx); x <= Math.ceil(px + rx); x += 2) {
        if (!inBounds(x, z, size)) continue;
        const peakDist = Math.hypot(x - main.x, z - main.z);
        if (peakDist < size * 0.09) continue;
        const terrainH = height[idx(x, z, size)];
        for (let y = 0; y < h; y++) {
          const wy = band + y - 1;
          if (wy <= terrainH + 2) continue;
          const nx = (x - px) / rx;
          const ny = (y - h * 0.45) / (h * 0.7);
          const nz = (z - pz) / rz;
          const ellip = nx * nx + ny * ny * 1.35 + nz * nz;
          if (ellip > 1) continue;
          const n = (fbm3(x * 0.07, y * 0.22, z * 0.07, seed + 77, 3) + 1) * 0.5;
          if (n > 0.58 - density * 0.2 - (1 - ellip) * 0.12) {
            clouds.push({ x, y: wy, z });
          }
        }
      }
    }
  }
  return clouds;
}

function scatterVegetation(height, waterMask, size, seed, worldMax, density) {
  const trees = [];
  const grass = [];
  if (density <= 0.01) return { trees, grass };

  const treeBudget = Math.round(size * size * 0.0075 * density);
  const grassBudget = Math.round(size * size * 0.028 * density);
  const treeLine = worldMax * 0.48;

  let tries = 0;
  while (trees.length < treeBudget && tries < treeBudget * 20) {
    tries += 1;
    const x = 2 + Math.floor(hash2(tries, 3, seed) * (size - 4));
    const z = 2 + Math.floor(hash2(tries, 9, seed + 4) * (size - 4));
    const i = idx(x, z, size);
    if (waterMask[i] || height[i] < 3 || height[i] > treeLine) continue;
    if (neighborSlope(height, size, x, z) > 2.2) continue;
    trees.push({
      x,
      y: height[i],
      z,
      kind: hash2(x, z, seed + 11) > 0.4 ? 'pine' : 'oak',
    });
  }

  tries = 0;
  while (grass.length < grassBudget && tries < grassBudget * 12) {
    tries += 1;
    const x = 1 + Math.floor(hash2(tries, 21, seed + 8) * (size - 2));
    const z = 1 + Math.floor(hash2(tries, 27, seed + 12) * (size - 2));
    const i = idx(x, z, size);
    if (waterMask[i] || height[i] < 2 || height[i] > worldMax * 0.52) continue;
    grass.push({ x, y: height[i], z });
  }

  return { trees, grass };
}

function neighborSlope(height, size, x, z) {
  const h = height[idx(x, z, size)];
  let maxD = 0;
  for (const [dx, dz] of DIRS8) {
    const nx = x + dx;
    const nz = z + dz;
    if (!inBounds(nx, nz, size)) continue;
    maxD = Math.max(maxD, Math.abs(height[idx(nx, nz, size)] - h));
  }
  return maxD;
}

export function surfaceType(y, top, worldMax) {
  const snow = worldMax * 0.9;
  const rock = worldMax * 0.78;
  if (top <= 0) return BLOCK.STONE;
  if (y >= snow || (y >= top - 1 && top >= snow)) return BLOCK.SNOW;
  if (y >= top - 1 && top <= 4) return BLOCK.SAND;
  if (y >= top - 1) return top >= rock ? BLOCK.STONE : BLOCK.GRASS;
  if (y >= top - 3 && top < rock) return BLOCK.DIRT;
  return BLOCK.STONE;
}
