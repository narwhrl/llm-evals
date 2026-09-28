export const GRID_SIZE = 200;
export const GRID_HALF = GRID_SIZE / 2;
export const CELL_SIZE = 0.5;
export const BLOCK_HEIGHT = 0.46;
export const WORLD_SIZE = GRID_SIZE * CELL_SIZE;

const MATERIAL_PALETTE = [
  [0.18, 0.5, 0.2],
  [0.2, 0.31, 0.28],
  [0.65, 0.5, 0.27],
  [0.75, 0.82, 0.78],
  [0.32, 0.36, 0.36],
  [0.2, 0.45, 0.22],
];

export const WATERFALLS = [
  {
    id: 'main',
    width: 5.2,
    startHeight: 39,
    endHeight: 1.35,
    path: [
      { x: 75, z: 61 },
      { x: 76, z: 77 },
      { x: 72, z: 94 },
      { x: 78, z: 112 },
      { x: 74, z: 131 },
      { x: 81, z: 150 },
      { x: 88, z: 174 },
    ],
  },
  {
    id: 'east',
    width: 3.3,
    startHeight: 29,
    endHeight: 1.5,
    path: [
      { x: 125, z: 67 },
      { x: 119, z: 84 },
      { x: 111, z: 101 },
      { x: 101, z: 119 },
      { x: 90, z: 137 },
    ],
  },
  {
    id: 'west',
    width: 2.7,
    startHeight: 24,
    endHeight: 1.7,
    path: [
      { x: 37, z: 76 },
      { x: 42, z: 93 },
      { x: 51, z: 111 },
      { x: 65, z: 128 },
      { x: 76, z: 142 },
    ],
  },
];

const PEAKS = [
  { x: 74, z: 58, height: 38, spreadX: 20, spreadZ: 24 },
  { x: 37, z: 69, height: 28, spreadX: 20, spreadZ: 23 },
  { x: 125, z: 66, height: 31, spreadX: 19, spreadZ: 22 },
  { x: 50, z: 119, height: 18, spreadX: 18, spreadZ: 23 },
  { x: 137, z: 113, height: 20, spreadX: 20, spreadZ: 24 },
  { x: 92, z: 38, height: 16, spreadX: 18, spreadZ: 18 },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

function hash2(x, z) {
  const value = Math.sin(x * 127.1 + z * 311.7 + 19.37) * 43758.5453123;
  return value - Math.floor(value);
}

function valueNoise(x, z) {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const tx = x - x0;
  const tz = z - z0;
  const sx = tx * tx * (3 - 2 * tx);
  const sz = tz * tz * (3 - 2 * tz);
  const a = hash2(x0, z0);
  const b = hash2(x0 + 1, z0);
  const c = hash2(x0, z0 + 1);
  const d = hash2(x0 + 1, z0 + 1);
  return lerp(lerp(a, b, sx), lerp(c, d, sx), sz);
}

function fbm(x, z) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let octave = 0; octave < 4; octave += 1) {
    value += valueNoise(x * frequency, z * frequency) * amplitude;
    frequency *= 2.03;
    amplitude *= 0.5;
  }
  return value;
}

function peakHeight(x, z, peak) {
  const dx = (x - peak.x) / peak.spreadX;
  const dz = (z - peak.z) / peak.spreadZ;
  return peak.height * Math.exp(-(dx * dx + dz * dz) * 1.65);
}

function nearestOnPath(path, x, z) {
  let bestDistance = Infinity;
  let bestT = 0;
  for (let index = 0; index < path.length - 1; index += 1) {
    const a = path[index];
    const b = path[index + 1];
    const abx = b.x - a.x;
    const abz = b.z - a.z;
    const apx = x - a.x;
    const apz = z - a.z;
    const lengthSquared = abx * abx + abz * abz;
    const projection = lengthSquared === 0 ? 0 : clamp((apx * abx + apz * abz) / lengthSquared, 0, 1);
    const nearestX = a.x + abx * projection;
    const nearestZ = a.z + abz * projection;
    const distance = Math.hypot(x - nearestX, z - nearestZ);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestT = (index + projection) / (path.length - 1);
    }
  }
  return { distance: bestDistance, t: bestT };
}

function pathPointAt(path, t) {
  const clampedT = clamp(t, 0, 1);
  const scaled = clampedT * (path.length - 1);
  const index = Math.min(path.length - 2, Math.floor(scaled));
  const localT = scaled - index;
  const a = path[index];
  const b = path[index + 1];
  return {
    x: lerp(a.x, b.x, localT),
    z: lerp(a.z, b.z, localT),
  };
}

function waterfallHeight(fall, t) {
  const eased = t * t * (3 - 2 * t);
  const pulse = Math.sin(t * Math.PI) * 0.28;
  return fall.startHeight + (fall.endHeight - fall.startHeight) * eased + pulse;
}

export function gridToWorld(x, z) {
  return {
    x: (x - GRID_HALF + 0.5) * CELL_SIZE,
    z: (z - GRID_HALF + 0.5) * CELL_SIZE,
  };
}

export function sampleWaterfall(fall, t) {
  const point = pathPointAt(fall.path, t);
  const world = gridToWorld(point.x, point.z);
  const blocks = waterfallHeight(fall, t);
  return {
    x: world.x,
    y: blocks * BLOCK_HEIGHT + 0.24,
    z: world.z,
    blocks,
  };
}

function getBaseHeight(x, z) {
  let mountain = 0;
  for (const peak of PEAKS) {
    mountain = Math.max(mountain, peakHeight(x, z, peak));
  }

  const ridgeNoise = 1 - Math.abs(valueNoise(x * 0.045 + 3, z * 0.045 - 7) * 2 - 1);
  const rolling = fbm(x * 0.025 + 11, z * 0.025 - 4);
  const radial = Math.max(Math.abs(x - (GRID_HALF - 0.5)), Math.abs(z - (GRID_HALF - 0.5))) / GRID_HALF;
  const edgeFade = 1 - smoothstep(0.72, 1.04, radial);
  const shoulder = Math.exp(-Math.pow((x - 86) / 52, 2) - Math.pow((z - 90) / 75, 2)) * 3.2;
  const height = 1.35 + mountain * edgeFade + ridgeNoise * 2.2 * edgeFade + rolling * 1.35 * edgeFade + shoulder;
  return clamp(height, 1, 43);
}

export function buildTerrain() {
  const cellCount = GRID_SIZE * GRID_SIZE;
  const heights = new Int16Array(cellCount);
  const materials = new Uint8Array(cellCount);
  const channelMask = new Uint8Array(cellCount);
  const distances = new Float32Array(cellCount);

  for (let z = 0; z < GRID_SIZE; z += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const index = z * GRID_SIZE + x;
      let height = getBaseHeight(x, z);
      let nearest = { distance: Infinity, fall: null, t: 0 };
      let nearestBed = 0;

      for (const fall of WATERFALLS) {
        const result = nearestOnPath(fall.path, x, z);
        const bed = waterfallHeight(fall, result.t);
        if (result.distance < nearest.distance) {
          nearest = { distance: result.distance, fall, t: result.t };
          nearestBed = bed;
        }
        if (result.distance < fall.width * 2.5) {
          const influence = 1 - smoothstep(fall.width * 0.42, fall.width * 2.5, result.distance);
          height = result.distance < 1.2
            ? bed
            : lerp(height, Math.max(1.15, bed), influence * 0.96);
        }
      }

      const detail = fbm(x * 0.13 - 5, z * 0.13 + 8) - 0.5;
      height = nearest.distance < 1.2
        ? nearestBed
        : height + detail * (nearest.distance < 16 ? 0.35 : 1.1);
      const blockHeight = clamp(Math.round(height), 1, 44);
      heights[index] = blockHeight;
      distances[index] = nearest.distance;
      channelMask[index] = nearest.distance < nearest.fall?.width * 1.25 ? 1 : 0;
    }
  }

  for (let z = 0; z < GRID_SIZE; z += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const index = z * GRID_SIZE + x;
      const height = heights[index];
      const left = heights[z * GRID_SIZE + Math.max(0, x - 1)];
      const right = heights[z * GRID_SIZE + Math.min(GRID_SIZE - 1, x + 1)];
      const up = heights[Math.max(0, z - 1) * GRID_SIZE + x];
      const down = heights[Math.min(GRID_SIZE - 1, z + 1) * GRID_SIZE + x];
      const slope = Math.max(Math.abs(height - left), Math.abs(height - right), Math.abs(height - up), Math.abs(height - down));
      const distance = distances[index];
      const channel = channelMask[index] === 1;

      if (channel && height < 9) {
        materials[index] = 1; // wet river stone
      } else if (height <= 2) {
        materials[index] = 2; // warm shoreline sand
      } else if (height >= 31 || (height >= 28 && slope < 1.5)) {
        materials[index] = 3; // high alpine snow
      } else if (slope >= 3 || height >= 23) {
        materials[index] = 4; // exposed mountain rock
      } else if (distance < 12) {
        materials[index] = 5; // mossy river bank
      } else {
        materials[index] = 0; // meadow grass
      }
    }
  }

  return {
    heights,
    materials,
    channelMask,
    gridSize: GRID_SIZE,
    cellSize: CELL_SIZE,
    blockHeight: BLOCK_HEIGHT,
    waterfallCount: WATERFALLS.length,
  };
}

export function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function terrainIndex(x, z) {
  const gridX = clamp(Math.round(x), 0, GRID_SIZE - 1);
  const gridZ = clamp(Math.round(z), 0, GRID_SIZE - 1);
  return gridZ * GRID_SIZE + gridX;
}

export function colorForMaterial(materialIndex, height) {
  const color = MATERIAL_PALETTE[materialIndex] ?? MATERIAL_PALETTE[0];
  const variation = ((height * 13) % 7) / 100;
  return [color[0] + variation, color[1] + variation * 0.45, color[2] + variation * 0.25];
}
