import { Block, SIZE, WATER_LEVEL, toWorld } from './constants.js';
import { createNoise2D, fbm, hash3 } from './noise.js';

const PEAKS = [
  { x: 64, z: 30, h: 66, rx: 34, rz: 30, power: 1.65, south: 2.15 },
  { x: 36, z: 40, h: 48, rx: 20, rz: 18, power: 1.55, south: 1.45 },
  { x: 92, z: 36, h: 44, rx: 18, rz: 17, power: 1.5, south: 1.35 },
  { x: 50, z: 54, h: 30, rx: 16, rz: 14, power: 1.4, south: 1.15 },
  { x: 80, z: 58, h: 26, rx: 15, rz: 13, power: 1.35, south: 1.1 },
  { x: 22, z: 58, h: 22, rx: 14, rz: 12, power: 1.4, south: 1.05 },
];

const MAIN_CASCADE = [
  { z: 26, h: 62 },
  { z: 36, h: 57 },
  { z: 38, h: 44 },
  { z: 48, h: 41 },
  { z: 50, h: 29 },
  { z: 64, h: 27 },
  { z: 66, h: 17 },
  { z: 82, h: 15 },
  { z: 85, h: 8 },
  { z: 102, h: 6 },
  { z: 112, h: 4 },
];

const SIDE_CASCADE = [
  { z: 38, h: 44 },
  { z: 46, h: 40 },
  { z: 48, h: 28 },
  { z: 60, h: 24 },
  { z: 63, h: 14 },
  { z: 78, h: 12 },
  { z: 88, h: 7 },
];

function computeHeight(x, z, noise, scale) {
  const nx = x;
  const nz = z;
  let h = 8 + fbm(noise, nx * 0.03, nz * 0.03, 4) * 5;

  let peakH = 0;
  for (let i = 0; i < PEAKS.length; i += 1) {
    const p = PEAKS[i];
    const warp = fbm(noise, nx * 0.07 + 10, nz * 0.07 + 4, 3);
    const dx = (nx - p.x + warp * 6) / p.rx;
    const dz = (nz - p.z + warp * 5) / p.rz;
    let d = Math.sqrt(dx * dx + dz * dz);
    if (dz > 0) d *= 1 + dz * (p.south - 1) * 0.35;
    if (d < 1.6) {
      const ridge = 1 - Math.abs(fbm(noise, nx * 0.12, nz * 0.12 + 20, 3));
      const shape = Math.pow(Math.max(0, 1 - d / 1.15), p.power);
      peakH = Math.max(peakH, p.h * shape * (0.82 + 0.18 * ridge));
    }
  }

  h += peakH;
  if (peakH > 8) h += fbm(noise, nx * 0.2, nz * 0.2, 2) * 3.2;
  return Math.max(2, h * scale);
}

function sampleHeight(height, x, z) {
  const xx = Math.min(SIZE - 1, Math.max(0, x));
  const zz = Math.min(SIZE - 1, Math.max(0, z));
  return height[zz * SIZE + xx];
}

function keyframeHeight(frames, z) {
  if (z <= frames[0].z) return frames[0].h;
  if (z >= frames[frames.length - 1].z) return frames[frames.length - 1].h;
  for (let i = 0; i < frames.length - 1; i += 1) {
    const a = frames[i];
    const b = frames[i + 1];
    if (z >= a.z && z <= b.z) {
      const t = (z - a.z) / Math.max(1, b.z - a.z);
      return a.h + (b.h - a.h) * t;
    }
  }
  return frames[frames.length - 1].h;
}

function carveChannel(height, cx, frames, halfWidth, scale) {
  const z0 = frames[0].z;
  const z1 = frames[frames.length - 1].z;
  for (let z = z0; z <= z1; z += 1) {
    const target = Math.max(2, Math.round(keyframeHeight(frames, z) * scale));
    for (let x = cx - halfWidth; x <= cx + halfWidth; x += 1) {
      if (x < 1 || x >= SIZE - 1) continue;
      const dist = Math.abs(x - cx);
      const blend = dist <= 1 ? 0.94 : dist <= 2 ? 0.72 : dist <= 3 ? 0.42 : 0.18;
      const idx = z * SIZE + x;
      const carved = Math.round(height[idx] * (1 - blend) + target * blend);
      height[idx] = Math.min(height[idx], Math.max(2, carved));
    }
  }
}

function carveLake(height) {
  for (let z = 96; z < SIZE - 2; z += 1) {
    for (let x = 38; x < 92; x += 1) {
      const dx = (x - 64) / 24;
      const dz = (z - 112) / 15;
      if (dx * dx + dz * dz < 1) {
        const idx = z * SIZE + x;
        height[idx] = Math.min(height[idx], 4);
      }
    }
  }
}

function channelPath(height, startX, z0, z1) {
  const path = [];
  let x = startX;
  for (let z = z0; z <= z1; z += 1) {
    let best = x;
    let bestH = sampleHeight(height, x, z);
    for (const nx of [x - 1, x, x + 1]) {
      if (nx < 1 || nx >= SIZE - 1) continue;
      const h = sampleHeight(height, nx, z);
      if (h < bestH) {
        bestH = h;
        best = nx;
      }
    }
    x = best;
    path.push({ x, y: sampleHeight(height, x, z), z });
  }
  return path;
}

function expandWaterfall(path, width) {
  const waters = [];
  const seen = new Set();
  const add = (x, y, z, kind) => {
    const key = `${x},${y},${z}`;
    if (seen.has(key) || x < 0 || z < 0 || x >= SIZE || z >= SIZE || y < 1) return;
    seen.add(key);
    waters.push({ x, y, z, kind });
  };

  for (let i = 0; i < path.length; i += 1) {
    const p = path[i];
    const next = path[Math.min(path.length - 1, i + 1)];
    const drop = p.y - next.y;
    const dirZ = next.z >= p.z ? 1 : -1;

    for (let w = -width; w <= width; w += 1) {
      const ox = p.x + w;
      if (drop > 1) {
        for (let y = next.y + 1; y <= p.y; y += 1) {
          add(ox, y, p.z + dirZ, 'fall');
          if (w === 0) add(ox + 1, y, p.z + dirZ, 'fall');
        }
      } else if (p.y > WATER_LEVEL) {
        add(ox, p.y + 1, p.z, 'stream');
      }
    }
  }
  return waters;
}

function placeOak(grid, gi, H, x, y, z, seed) {
  const trunk = 4 + Math.floor(hash3(x, y, z, seed) * 2);
  for (let i = 0; i < trunk; i += 1) {
    if (y + i < H) grid[gi(x, y + i, z)] = Block.WOOD;
  }
  const top = y + trunk;
  for (let dy = -2; dy <= 2; dy += 1) {
    const r = dy === 2 || dy === -2 ? 1 : 2;
    for (let dx = -r; dx <= r; dx += 1) {
      for (let dz = -r; dz <= r; dz += 1) {
        if (Math.abs(dx) === r && Math.abs(dz) === r && hash3(x + dx, top + dy, z + dz, seed) > 0.35) {
          continue;
        }
        const lx = x + dx;
        const ly = top + dy;
        const lz = z + dz;
        if (lx < 0 || lz < 0 || lx >= SIZE || lz >= SIZE || ly < 0 || ly >= H) continue;
        if (grid[gi(lx, ly, lz)] === Block.AIR) grid[gi(lx, ly, lz)] = Block.LEAVES;
      }
    }
  }
}

function placePine(grid, gi, H, x, y, z, seed) {
  const trunk = 6 + Math.floor(hash3(x, 3, z, seed) * 4);
  for (let i = 0; i < trunk; i += 1) {
    if (y + i < H) grid[gi(x, y + i, z)] = Block.WOOD;
  }
  const layers = 4 + Math.floor(hash3(x, 7, z, seed) * 2);
  for (let i = 0; i < layers; i += 1) {
    const ly = y + trunk - layers + i + 1;
    const r = Math.max(0, Math.floor((layers - i) / 1.4));
    for (let dx = -r; dx <= r; dx += 1) {
      for (let dz = -r; dz <= r; dz += 1) {
        if (Math.abs(dx) + Math.abs(dz) > r + 0.5) continue;
        const lx = x + dx;
        const lz = z + dz;
        if (lx < 0 || lz < 0 || lx >= SIZE || lz >= SIZE || ly < 0 || ly >= H) continue;
        if (grid[gi(lx, ly, lz)] === Block.AIR) grid[gi(lx, ly, lz)] = Block.LEAVES;
      }
    }
  }
}

function generateClouds(height, noise, seed, cloudHeight, density) {
  const slabs = [];
  const cell = 4;
  const thresh = 0.18 - density * 0.2;
  for (let z = 0; z < SIZE; z += cell) {
    for (let x = 0; x < SIZE; x += cell) {
      const n = fbm(noise, x * 0.035 + 80, z * 0.035, 4);
      if (n < thresh) continue;
      let blocked = 0;
      for (let dz = 0; dz < cell; dz += 1) {
        for (let dx = 0; dx < cell; dx += 1) {
          if (sampleHeight(height, x + dx, z + dz) >= cloudHeight + 1) blocked += 1;
        }
      }
      if (blocked > cell * cell * 0.4) continue;
      const sy = n > thresh + 0.18 ? 2 : 1;
      const y = cloudHeight + (hash3(x, cloudHeight, z, seed) > 0.7 ? 1 : 0);
      slabs.push({
        x: x + cell / 2,
        y,
        z: z + cell / 2,
        sx: cell,
        sy,
        sz: cell,
      });
    }
  }

  for (let i = 0; i < 14; i += 1) {
    const px = 10 + Math.floor(hash3(i, 3, seed, seed) * (SIZE - 20));
    const pz = 10 + Math.floor(hash3(i, 9, seed + 2, seed) * (SIZE - 16));
    const py = cloudHeight - 6 + Math.floor(hash3(i, 5, seed, seed) * 10);
    if (sampleHeight(height, px, pz) >= py) continue;
    slabs.push({
      x: px,
      y: py,
      z: pz,
      sx: 3 + Math.floor(hash3(i, 1, seed, seed) * 3),
      sy: 1,
      sz: 3 + Math.floor(hash3(i, 2, seed, seed) * 3),
    });
  }

  return slabs;
}

export function generateWorld(settings) {
  const seed = settings.seed | 0;
  const scale = settings.mountainScale;
  const vegetation = settings.vegetation;
  const cloudDensity = settings.cloudDensity;
  const cloudHeight = Math.round(settings.cloudHeight);
  const noise = createNoise2D(seed);

  const height = new Uint8Array(SIZE * SIZE);
  let maxH = 1;
  for (let z = 0; z < SIZE; z += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const h = Math.round(computeHeight(x, z, noise, scale));
      height[z * SIZE + x] = h;
      if (h > maxH) maxH = h;
    }
  }

  carveChannel(height, 64, MAIN_CASCADE, 4, scale);
  carveChannel(height, 36, SIDE_CASCADE, 2, scale);
  carveLake(height);

  maxH = 1;
  for (let i = 0; i < height.length; i += 1) {
    if (height[i] > maxH) maxH = height[i];
  }

  const H = Math.min(140, maxH + 18);
  const grid = new Uint8Array(SIZE * H * SIZE);
  const gi = (x, y, z) => x + SIZE * (y + H * z);

  const snowLine = Math.max(18, Math.floor(maxH * 0.72));
  const stoneLine = Math.max(12, Math.floor(maxH * 0.42));

  for (let z = 0; z < SIZE; z += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const surface = height[z * SIZE + x];
      const n1 = sampleHeight(height, x + 1, z);
      const n2 = sampleHeight(height, x - 1, z);
      const n3 = sampleHeight(height, x, z + 1);
      const n4 = sampleHeight(height, x, z - 1);
      const slope = Math.max(Math.abs(n1 - n2), Math.abs(n3 - n4)) * 0.5;
      const fillFrom = 0;

      for (let y = fillFrom; y <= surface; y += 1) {
        let type = Block.STONE;
        if (y === surface) {
          if (surface >= snowLine) type = Block.SNOW;
          else if (slope > 1.6) type = Block.STONE;
          else if (surface <= WATER_LEVEL + 1) type = Block.SAND;
          else if (surface < stoneLine) type = Block.GRASS;
          else type = hash3(x, y, z, seed) > 0.55 ? Block.STONE : Block.GRASS;
        } else if (y >= surface - 2 && surface < snowLine && slope < 1.8) {
          type = Block.DIRT;
        } else if (surface >= snowLine && y >= surface - 2) {
          type = Block.SNOW;
        }
        grid[gi(x, y, z)] = type;
      }
    }
  }

  const treePositions = [];
  for (let z = 8; z < SIZE - 8; z += 1) {
    for (let x = 8; x < SIZE - 8; x += 1) {
      const surface = height[z * SIZE + x];
      if (surface <= WATER_LEVEL + 2 || surface > stoneLine + 2) continue;
      const slope = Math.max(
        Math.abs(sampleHeight(height, x + 1, z) - sampleHeight(height, x - 1, z)),
        Math.abs(sampleHeight(height, x, z + 1) - sampleHeight(height, x, z - 1)),
      );
      if (slope > 2) continue;
      if (Math.abs(x - 64) < 5 && z > 26 && z < 112) continue;
      const grove = fbm(noise, x * 0.08, z * 0.08 + 40, 3);
      const inGrove = grove > 0.02;
      const chance = vegetation * (inGrove ? 0.055 : 0.012);
      if (hash3(x, 11, z, seed) > chance) continue;
      if (grid[gi(x, surface, z)] !== Block.GRASS) continue;
      treePositions.push({ x, y: surface + 1, z, pine: surface > stoneLine * 0.55 });
    }
  }

  for (let i = 0; i < treePositions.length; i += 1) {
    const t = treePositions[i];
    if (t.pine) placePine(grid, gi, H, t.x, t.y, t.z, seed);
    else placeOak(grid, gi, H, t.x, t.y, t.z, seed);
  }

  for (let z = 10; z < SIZE - 10; z += 2) {
    for (let x = 10; x < SIZE - 10; x += 2) {
      const surface = height[z * SIZE + x];
      if (grid[gi(x, surface, z)] !== Block.GRASS) continue;
      if (hash3(x, 21, z, seed) > 0.035 * vegetation) continue;
      if (surface + 1 < H) grid[gi(x, surface + 1, z)] = Block.LEAVES;
    }
  }

  const solids = [];
  for (let z = 0; z < SIZE; z += 1) {
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < SIZE; x += 1) {
        const type = grid[gi(x, y, z)];
        if (type === Block.AIR) continue;
        const exposed =
          x === 0 ||
          x === SIZE - 1 ||
          z === 0 ||
          z === SIZE - 1 ||
          y === 0 ||
          y === H - 1 ||
          grid[gi(x + 1, y, z)] === Block.AIR ||
          grid[gi(x - 1, y, z)] === Block.AIR ||
          y + 1 >= H ||
          grid[gi(x, y + 1, z)] === Block.AIR ||
          y - 1 < 0 ||
          grid[gi(x, y - 1, z)] === Block.AIR ||
          grid[gi(x, y, z + 1)] === Block.AIR ||
          grid[gi(x, y, z - 1)] === Block.AIR;
        if (exposed) solids.push({ x, y, z, type });
      }
    }
  }

  const getType = (x, y, z) => {
    if (y < 0) return Block.STONE;
    if (x < 0 || z < 0 || x >= SIZE || z >= SIZE || y >= H) return 0;
    return grid[gi(x, y, z)];
  };

  const isSolid = (x, y, z) => getType(x, y, z) !== Block.AIR;


  const mainPath = channelPath(height, 64, 28, 112);
  const sidePath = channelPath(height, 36, 40, 90);
  const waterfallPaths = [mainPath, sidePath].filter((p) => p.length > 8);
  const waterfall = [];
  const widths = [2, 1];
  for (let i = 0; i < waterfallPaths.length; i += 1) {
    const extra = expandWaterfall(waterfallPaths[i], widths[i] || 1);
    for (let j = 0; j < extra.length; j += 1) waterfall.push(extra[j]);
  }

  const waterOccupied = new Set();
  const water = [];
  const addWater = (vox) => {
    const key = `${vox.x},${vox.y},${vox.z}`;
    if (waterOccupied.has(key) || isSolid(vox.x, vox.y, vox.z)) return;
    waterOccupied.add(key);
    water.push(vox);
  };

  for (let z = 0; z < SIZE; z += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const surface = height[z * SIZE + x];
      if (surface >= WATER_LEVEL) continue;
      for (let y = surface + 1; y <= WATER_LEVEL; y += 1) {
        addWater({ x, y, z, kind: 'lake' });
      }
    }
  }
  for (let i = 0; i < waterfall.length; i += 1) addWater(waterfall[i]);

  const clouds = generateClouds(height, noise, seed, cloudHeight, cloudDensity);

  const dropletPath = [];
  const worldPaths = waterfallPaths.map((path) => path.map((p) => ({ ...p, ...toWorld(p.x, p.y, p.z) })));
  for (let i = 0; i < worldPaths.length; i += 1) {
    const path = worldPaths[i];
    for (let j = 0; j < path.length - 1; j += 1) {
      const a = path[j];
      const b = path[j + 1];
      const steps = Math.max(1, Math.abs(a.y - b.y) + 1);
      for (let s = 0; s < steps; s += 1) {
        const t = s / steps;
        dropletPath.push({
          wx: a.wx + (b.wx - a.wx) * t,
          wy: a.wy + (b.wy - a.wy) * t + 1.15,
          wz: a.wz + (b.wz - a.wz) * t + 0.55,
        });
      }
    }
  }

  return {
    size: SIZE,
    height: H,
    maxH,
    solids,
    water,
    clouds,
    waterfallPaths: worldPaths,
    dropletPath,
    isSolid,
    getType,
    stats: {
      columns: SIZE * SIZE,
      solidVoxels: solids.length,
      waterVoxels: water.length,
      cloudVoxels: clouds.reduce((sum, c) => sum + c.sx * c.sy * c.sz, 0),
      trees: treePositions.length,
    },
  };
}
