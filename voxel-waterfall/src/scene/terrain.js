export const GRID_SIZE = 128;
const DEFAULT_SEED = 0x51f15e;

const PEAKS = [
  { x: 0.08, z: -0.1, height: 43, spreadX: 0.23, spreadZ: 0.29 },
  { x: -0.3, z: -0.18, height: 32, spreadX: 0.24, spreadZ: 0.25 },
  { x: 0.31, z: 0.2, height: 31, spreadX: 0.25, spreadZ: 0.22 },
  { x: -0.22, z: 0.32, height: 28, spreadX: 0.22, spreadZ: 0.21 },
  { x: 0.43, z: -0.24, height: 25, spreadX: 0.18, spreadZ: 0.2 },
];

function smoothstep(min, max, value) {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return t * t * (3 - 2 * t);
}

function hash2(x, z, seed) {
  let value = Math.imul(x, 0x1f123bb5) ^ Math.imul(z, 0x5f356495) ^ seed;
  value = Math.imul(value ^ (value >>> 15), 0x2c1b3c6d);
  value = Math.imul(value ^ (value >>> 12), 0x297a2d39);
  return ((value ^ (value >>> 15)) >>> 0) / 4294967295;
}

function valueNoise(x, z, seed) {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const tx = x - x0;
  const tz = z - z0;
  const sx = tx * tx * (3 - 2 * tx);
  const sz = tz * tz * (3 - 2 * tz);
  const top = hash2(x0, z0, seed) * (1 - sx) + hash2(x0 + 1, z0, seed) * sx;
  const bottom = hash2(x0, z0 + 1, seed) * (1 - sx) + hash2(x0 + 1, z0 + 1, seed) * sx;
  return top * (1 - sz) + bottom * sz;
}

function fbm(x, z, seed) {
  let amplitude = 0.5;
  let frequency = 1;
  let sum = 0;
  let weight = 0;

  for (let octave = 0; octave < 5; octave += 1) {
    sum += valueNoise(x * frequency, z * frequency, seed + octave * 1013) * amplitude;
    weight += amplitude;
    amplitude *= 0.52;
    frequency *= 2.03;
  }

  return sum / weight;
}

function heightAtNormalized(nx, nz, seed) {
  const radialDistance = Math.hypot(nx * 0.94, nz);
  const envelope = 1 - smoothstep(0.7, 1.02, radialDistance);
  let dominantPeak = 0;
  let surroundingMass = 0;

  for (const peak of PEAKS) {
    const dx = (nx - peak.x) / peak.spreadX;
    const dz = (nz - peak.z) / peak.spreadZ;
    const influence = peak.height * Math.exp(-(dx * dx + dz * dz));
    dominantPeak = Math.max(dominantPeak, influence);
    surroundingMass += influence;
  }

  const broadNoise = fbm(nx * 2.2 + 3.7, nz * 2.2 - 1.9, seed) - 0.5;
  const ridgeNoise = 1 - Math.abs(fbm(nx * 5.1 - 4.2, nz * 5.1 + 8.4, seed + 4099) * 2 - 1);
  const mountain = dominantPeak + surroundingMass * 0.13 + broadNoise * 8 + ridgeNoise * 2.8;
  return Math.max(2, Math.round(2 + envelope * Math.max(0, mountain)));
}

export function generateHeightMap({ size = GRID_SIZE, seed = DEFAULT_SEED } = {}) {
  if (!Number.isInteger(size) || size < 16) {
    throw new RangeError('Terrain size must be an integer of at least 16');
  }

  const heights = new Uint8Array(size * size);
  let minHeight = 255;
  let maxHeight = 0;

  for (let z = 0; z < size; z += 1) {
    const nz = (z / (size - 1)) * 2 - 1;
    for (let x = 0; x < size; x += 1) {
      const nx = (x / (size - 1)) * 2 - 1;
      const height = heightAtNormalized(nx, nz, seed);
      heights[z * size + x] = height;
      minHeight = Math.min(minHeight, height);
      maxHeight = Math.max(maxHeight, height);
    }
  }

  return { heights, maxHeight, minHeight, seed, size };
}

export function getHeight(map, x, z) {
  if (x < 0 || z < 0 || x >= map.size || z >= map.size) return 0;
  return map.heights[z * map.size + x];
}

export function countProminentPeaks(map, minimumHeight = 25, separation = 7) {
  const candidates = [];
  for (let z = 1; z < map.size - 1; z += 1) {
    for (let x = 1; x < map.size - 1; x += 1) {
      const height = getHeight(map, x, z);
      if (height < minimumHeight) continue;
      if (
        height >= getHeight(map, x - 1, z) &&
        height >= getHeight(map, x + 1, z) &&
        height >= getHeight(map, x, z - 1) &&
        height >= getHeight(map, x, z + 1)
      ) {
        candidates.push({ x, z, height });
      }
    }
  }

  candidates.sort((a, b) => b.height - a.height);
  const selected = [];
  const minimumDistanceSquared = separation * separation;
  for (const candidate of candidates) {
    if (
      selected.every((peak) => {
        const dx = candidate.x - peak.x;
        const dz = candidate.z - peak.z;
        return dx * dx + dz * dz >= minimumDistanceSquared;
      })
    ) {
      selected.push(candidate);
    }
  }
  return selected.length;
}

function highestPointInRegion(map, region) {
  let highest = { x: region.minX, z: region.minZ, height: -1 };
  for (let z = region.minZ; z <= region.maxZ; z += 1) {
    for (let x = region.minX; x <= region.maxX; x += 1) {
      const height = getHeight(map, x, z);
      if (height > highest.height) highest = { x, z, height };
    }
  }
  return highest;
}

function traceDownhill(map, source, direction) {
  const path = [source];
  const visited = new Set([source.z * map.size + source.x]);
  let current = source;
  let preservedVisibleDrop = false;

  function findCandidate(minForward, maxForward, maxLateral) {
    let best = null;
    for (let forward = minForward; forward <= maxForward; forward += 1) {
      for (let lateral = -maxLateral; lateral <= maxLateral; lateral += 1) {
        const x = current.x + direction.x * forward + direction.z * lateral;
        const z = current.z + direction.z * forward + direction.x * lateral;
        const height = getHeight(map, x, z);
        const key = z * map.size + x;
        if (
          x < 1 ||
          z < 1 ||
          x >= map.size - 1 ||
          z >= map.size - 1 ||
          visited.has(key) ||
          height > current.height
        ) {
          continue;
        }

        const score = height * 0.42 + Math.abs(lateral) * 1.35 + (forward - 1) * 0.4;
        if (!best || score < best.score) best = { x, z, height, key, score };
      }
    }
    return best;
  }

  for (let step = 0; step < map.size; step += 1) {
    const best = findCandidate(1, 2, 2) ?? findCandidate(3, 9, 7);
    if (!best) break;

    const drop = current.height - best.height;
    const preserveGap = !preservedVisibleDrop && drop >= 2;
    for (
      let height = current.height - 1;
      height > best.height + (preserveGap ? 1 : 0);
      height -= 1
    ) {
      path.push({ x: best.x, z: best.z, height, vertical: true });
    }
    preservedVisibleDrop ||= preserveGap;

    current = { x: best.x, z: best.z, height: best.height };
    visited.add(best.key);
    path.push(current);
    if (current.height <= 7) break;
  }

  return path;
}

export function createTerrainLodMap(source, cellSize = 4) {
  const size = Math.ceil(source.size / cellSize);
  const heights = new Uint8Array(size * size);
  let minHeight = 255;
  let maxHeight = 0;

  for (let z = 0; z < size; z += 1) {
    for (let x = 0; x < size; x += 1) {
      let sum = 0;
      let samples = 0;
      let localMaximum = 0;
      for (let offsetZ = 0; offsetZ < cellSize; offsetZ += 1) {
        for (let offsetX = 0; offsetX < cellSize; offsetX += 1) {
          const height = getHeight(source, x * cellSize + offsetX, z * cellSize + offsetZ);
          sum += height;
          samples += 1;
          localMaximum = Math.max(localMaximum, height);
        }
      }
      const height = Math.round((sum / samples) * 0.62 + localMaximum * 0.38);
      heights[z * size + x] = height;
      minHeight = Math.min(minHeight, height);
      maxHeight = Math.max(maxHeight, height);
    }
  }

  return { heights, maxHeight, minHeight, seed: source.seed, size };
}

export function generateWaterfallPaths(map) {
  const firstSource = highestPointInRegion(map, {
    minX: Math.floor(map.size * 0.5),
    maxX: Math.floor(map.size * 0.6),
    minZ: Math.floor(map.size * 0.39),
    maxZ: Math.floor(map.size * 0.5),
  });
  const secondSource = highestPointInRegion(map, {
    minX: Math.floor(map.size * 0.58),
    maxX: Math.floor(map.size * 0.72),
    minZ: Math.floor(map.size * 0.53),
    maxZ: Math.floor(map.size * 0.68),
  });

  return [
    traceDownhill(map, firstSource, { x: 0, z: 1 }),
    traceDownhill(map, secondSource, { x: 1, z: 0 }),
  ];
}
