/**
 * Terrain generation and voxel meshing.
 *
 * The landscape is a height field of `size x size` cells where one cell is one
 * voxel wide. Only the faces that are actually visible are emitted: a top
 * face per cell plus a side face wherever a neighbour cell sits lower. That
 * keeps the mesh proportional to the silhouette instead of to the volume.
 */

import * as THREE from "three";
import { clamp, fbm, lerp, mulberry32, ridgedFbm, smoothstepRange } from "./noise";
import { createBuffers, pushQuad, toGeometry } from "./voxel";

export interface TerrainOptions {
  size: number;
  peakHeight: number;
  seed: number;
  ridgeSharpness: number;
  snowLine: number;
  treeLine: number;
  waterStreams: number;
}

export interface PathPoint {
  x: number;
  z: number;
  h: number;
  dirX: number;
  dirZ: number;
}

export interface WaterPool {
  x: number;
  z: number;
  level: number;
  radius: number;
}

export interface Waterfall {
  id: number;
  path: PathPoint[];
  /** Height of the water surface for each path point. */
  surface: number[];
  pools: WaterPool[];
}

export interface TerrainField {
  options: TerrainOptions;
  size: number;
  half: number;
  maxHeight: number;
  heights: Float32Array;
  slope: Float32Array;
  waterfalls: Waterfall[];
  waterLevel: number;
}

interface Peak {
  x: number;
  z: number;
  r: number;
  h: number;
}

/**
 * Hand placed massing. The main peak sits slightly off centre so the
 * composition has a clear focal point, with four secondary masses arranged
 * around it to produce the ridge-and-valley silhouette the brief asks for.
 */
const PEAKS: Peak[] = [
  { x: -0.1, z: -0.06, r: 0.5, h: 1.0 },
  { x: 0.47, z: 0.19, r: 0.29, h: 0.6 },
  { x: -0.47, z: 0.31, r: 0.26, h: 0.54 },
  { x: 0.1, z: 0.55, r: 0.21, h: 0.4 },
  { x: -0.63, z: -0.4, r: 0.19, h: 0.32 },
];

function heightAt(nx: number, nz: number, options: TerrainOptions): number {
  let h = 0;
  for (const peak of PEAKS) {
    const dx = (nx - peak.x) * 1.15;
    const dz = (nz - peak.z) * 1.0;
    const d2 = (dx * dx + dz * dz) / (peak.r * peak.r);
    h += peak.h * Math.exp(-d2);
  }
  const ridge = ridgedFbm(nx * 1.55 + 11.3, nz * 1.55 - 7.1, options.seed, 5);
  h += ridge * ridge * 0.5 * options.ridgeSharpness;
  const detail = fbm(nx * 6.2, nz * 6.2, options.seed + 977, 3);
  h += (detail - 0.5) * 0.07;

  // Fade the massing out towards the border so the diorama keeps a low plain
  // frame instead of being sliced through a mountain flank.
  const border = Math.min(1 - Math.abs(nx), 1 - Math.abs(nz));
  const falloff = smoothstepRange(0.0, 0.2, border);
  return h * (0.14 + 0.86 * falloff) + 0.015;
}

/** Minimal binary heap keyed by a numeric cost. */
class MinHeap {
  private keys: number[] = [];
  private values: number[] = [];

  get size(): number {
    return this.keys.length;
  }

  push(key: number, value: number) {
    this.keys.push(key);
    this.values.push(value);
    let i = this.keys.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.keys[parent] <= this.keys[i]) break;
      this.swap(i, parent);
      i = parent;
    }
  }

  pop(): { key: number; value: number } | undefined {
    if (this.keys.length === 0) return undefined;
    const key = this.keys[0];
    const value = this.values[0];
    const lastKey = this.keys.pop() as number;
    const lastValue = this.values.pop() as number;
    if (this.keys.length > 0) {
      this.keys[0] = lastKey;
      this.values[0] = lastValue;
      let i = 0;
      for (;;) {
        const left = i * 2 + 1;
        const right = left + 1;
        let smallest = i;
        if (left < this.keys.length && this.keys[left] < this.keys[smallest]) smallest = left;
        if (right < this.keys.length && this.keys[right] < this.keys[smallest]) smallest = right;
        if (smallest === i) break;
        this.swap(i, smallest);
        i = smallest;
      }
    }
    return { key, value };
  }

  private swap(a: number, b: number) {
    const k = this.keys[a];
    this.keys[a] = this.keys[b];
    this.keys[b] = k;
    const v = this.values[a];
    this.values[a] = this.values[b];
    this.values[b] = v;
  }
}

/**
 * Cost-to-outlet field.
 *
 * Every cell is given the price of the cheapest walk to the plain at the foot
 * of the mountain. Descending is free, climbing is expensive, so the field
 * behaves like a flow map: following it downhill always reaches the foot and
 * always takes the steepest, shortest line, which is where the cliffs are.
 */
function buildCostField(heights: Float32Array, size: number): Float64Array {
  // Float64 on purpose: the costs are float64 and a float32 store would round
  // them up, which makes the relaxation test re-push the same cell forever.
  const dist = new Float64Array(size * size).fill(Infinity);
  const heap = new MinHeap();

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      if (heights[z * size + x] <= 3) {
        const idx = z * size + x;
        dist[idx] = 0;
        heap.push(0, idx);
      }
    }
  }

  while (heap.size > 0) {
    const top = heap.pop();
    if (!top) break;
    const idx = top.value;
    const d = top.key;
    if (d > dist[idx]) continue;
    const x = idx % size;
    const z = (idx - x) / size;
    const h = heights[idx];
    for (const [dx, dz] of NEIGHBOURS) {
      const nx = x + dx;
      const nz = z + dz;
      if (nx < 0 || nz < 0 || nx >= size || nz >= size) continue;
      const nIdx = nz * size + nx;
      const nh = heights[nIdx];
      const length = Math.hypot(dx, dz);
      const climb = Math.max(0, nh - h);
      const cost = d + length + climb * 3.5;
      if (cost < dist[nIdx]) {
        dist[nIdx] = cost;
        heap.push(cost, nIdx);
      }
    }
  }
  return dist;
}

interface Source {
  x: number;
  z: number;
  h: number;
}

function findSources(heights: Float32Array, size: number, count: number): Source[] {
  let maxHeight = 0;
  for (let i = 0; i < heights.length; i++) maxHeight = Math.max(maxHeight, heights[i]);
  const threshold = maxHeight * 0.5;
  const candidates: Source[] = [];
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const h = heights[z * size + x];
      if (h >= threshold) candidates.push({ x, z, h });
    }
  }
  candidates.sort((a, b) => b.h - a.h);
  const minSeparation = size * 0.22;
  const picked: Source[] = [];
  for (const candidate of candidates) {
    if (picked.length >= count) break;
    let ok = true;
    for (const other of picked) {
      const d = Math.hypot(candidate.x - other.x, candidate.z - other.z);
      if (d < minSeparation) {
        ok = false;
        break;
      }
    }
    if (ok) picked.push(candidate);
  }
  return picked;
}

const NEIGHBOURS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

/**
 * Route of the stream.
 *
 * The walk follows the cost-to-outlet field, so it always reaches the plain
 * at the foot of the mountain and it takes the steepest short line available,
 * which is where the cliffs are.
 */
function descend(
  heights: Float32Array,
  cost: Float64Array,
  size: number,
  start: Source,
): PathPoint[] {
  const path: PathPoint[] = [];
  let x = start.x;
  let z = start.z;
  let dirX = 0;
  let dirZ = 0;
  const visited = new Set<number>();

  for (let step = 0; step < size * 10; step++) {
    const key = z * size + x;
    if (visited.has(key)) break;
    visited.add(key);
    const h = heights[key];
    path.push({ x, z, h, dirX, dirZ });
    if (h <= 2.5) break;

    let bestDx = 0;
    let bestDz = 0;
    let bestScore = Infinity;
    for (const [dx, dz] of NEIGHBOURS) {
      const nx = x + dx;
      const nz = z + dz;
      if (nx < 0 || nz < 0 || nx >= size || nz >= size) continue;
      const nIdx = nz * size + nx;
      const drop = h - heights[nIdx];
      // The cost field strictly decreases along the route, so the walk cannot
      // cycle; the drop only breaks ties between equally cheap neighbours.
      const score = cost[nIdx] - drop * 0.001;
      if (score < bestScore) {
        bestScore = score;
        bestDx = dx;
        bestDz = dz;
      }
    }
    if (!Number.isFinite(bestScore)) break;
    dirX = bestDx;
    dirZ = bestDz;
    x += bestDx;
    z += bestDz;
  }
  return path;
}

/**
 * Cuts a cliff into the flank of the mountain.
 *
 * The band downstream of the chosen route point is lowered by a fixed height,
 * so the stream arrives at the lip at full height and then pours over it.
 * The lip itself keeps its height, which is what forms the edge the water
 * falls from.
 */
function carveCliff(
  heights: Float32Array,
  size: number,
  path: PathPoint[],
  index: number,
  peakHeight: number,
): boolean {
  const p = path[index];
  const q = path[Math.min(path.length - 1, index + 1)];
  let dx = q.x - p.x;
  let dz = q.z - p.z;
  const length = Math.hypot(dx, dz);
  if (length === 0) return false;
  dx /= length;
  dz /= length;
  const px = -dz;
  const pz = dx;

  const drop = Math.round(Math.min(28, Math.max(12, peakHeight * 0.34)));
  const halfWidth = 3.2;
  const basin = 4;
  const reach = 16;

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const rx = x - p.x;
      const rz = z - p.z;
      const along = rx * dx + rz * dz;
      if (along <= 0.6 || along > reach) continue;
      const side = Math.abs(rx * px + rz * pz);
      if (side > halfWidth) continue;
      const amount = along <= basin ? drop : Math.round(drop * (1 - (along - basin) / reach));
      const idx = z * size + x;
      heights[idx] = Math.max(0, heights[idx] - amount);
    }
  }
  return true;
}

export function generateTerrain(options: TerrainOptions): TerrainField {
  const size = options.size;
  const half = (size - 1) / 2;
  const heights = new Float32Array(size * size);

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const nx = (x - half) / half;
      const nz = (z - half) / half;
      const h = heightAt(nx, nz, options) * options.peakHeight;
      heights[z * size + x] = h;
    }
  }

  // Quantise to whole voxels: the whole point of the style.
  let maxHeight = 0;
  for (let i = 0; i < heights.length; i++) {
    heights[i] = Math.max(0, Math.round(heights[i]));
    if (heights[i] > maxHeight) maxHeight = heights[i];
  }

  const cost = buildCostField(heights, size);
  const sources = findSources(heights, size, Math.max(1, options.waterStreams));
  const waterfalls: Waterfall[] = [];

  for (let s = 0; s < sources.length; s++) {
    const source = sources[s];
    const path = descend(heights, cost, size, source);
    if (path.length < 8) continue;

    // Widen the spring into a small basin at the top of the fall so the water
    // visibly collects before it spills over the lip.
    for (let dz = -2; dz <= 2; dz++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = source.x + dx;
        const nz = source.z + dz;
        if (nx < 0 || nz < 0 || nx >= size || nz >= size) continue;
        const dist = Math.hypot(dx, dz);
        if (dist > 2.2) continue;
        const idx = nz * size + nx;
        heights[idx] = Math.min(heights[idx], Math.max(0, source.h - (dist < 1.6 ? 2 : 1)));
      }
    }

    // Cut a cliff into the flank at the point where the stream has already
    // dropped a good part of the way, so the fall has a real lip to pour over.
    const fallIndex = Math.max(4, Math.min(path.length - 6, Math.round(path.length * 0.45)));
    const cliff = carveCliff(heights, size, path, fallIndex, options.peakHeight);

    // The plunge basin right under the lip.
    if (cliff) {
      const base = path[Math.min(path.length - 1, fallIndex + 4)];
      const floor = Math.max(0, heights[base.z * size + base.x]);
      for (let dz = -3; dz <= 3; dz++) {
        for (let dx = -3; dx <= 3; dx++) {
          const nx = base.x + dx;
          const nz = base.z + dz;
          if (nx < 0 || nz < 0 || nx >= size || nz >= size) continue;
          const idx = nz * size + nx;
          heights[idx] = Math.min(heights[idx], floor);
        }
      }
    }

    // The plunge pool at the foot of the fall.
    const last = path[path.length - 1];
    const poolRadius = 6;
    let poolFloor = Infinity;
    for (let dz = -7; dz <= 7; dz++) {
      for (let dx = -7; dx <= 7; dx++) {
        const nx = last.x + dx;
        const nz = last.z + dz;
        if (nx < 0 || nz < 0 || nx >= size || nz >= size) continue;
        const dist = Math.hypot(dx, dz);
        if (dist > poolRadius) continue;
        const idx = nz * size + nx;
        const floor = Math.max(0, last.h - 2 - Math.max(0, dist - poolRadius + 2));
        heights[idx] = Math.min(heights[idx], floor);
        poolFloor = Math.min(poolFloor, heights[idx]);
      }
    }
    const poolLevel = (Number.isFinite(poolFloor) ? poolFloor : last.h - 2) + 1;

    // The water surface rides the real terrain, so a cliff in the ground
    // becomes a cliff of falling water.
    const surface: number[] = [];
    let running = Infinity;
    for (const p of path) {
      const idx = p.z * size + p.x;
      const value = Math.min(heights[idx] + 1, running);
      surface.push(value);
      running = value;
    }

    const pools: WaterPool[] = [
      { x: last.x - half, z: last.z - half, level: poolLevel, radius: poolRadius + 2 },
    ];
    if (cliff) {
      const base = path[Math.min(path.length - 1, fallIndex + 4)];
      const baseIdx = base.z * size + base.x;
      pools.push({
        x: base.x - half,
        z: base.z - half,
        level: heights[baseIdx] + 1,
        radius: 4.2,
      });
    }

    waterfalls.push({ id: s, path, surface, pools });
  }

  // Recompute the slope field after carving so the colouring matches the mesh.
  const slope = new Float32Array(size * size);
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const h = heights[z * size + x];
      let steepest = 0;
      for (const [dx, dz] of NEIGHBOURS) {
        const nx = x + dx;
        const nz = z + dz;
        if (nx < 0 || nz < 0 || nx >= size || nz >= size) continue;
        steepest = Math.max(steepest, Math.abs(h - heights[nz * size + nx]));
      }
      slope[z * size + x] = steepest;
    }
  }

  let waterLevel = 0;
  for (const waterfall of waterfalls) {
    for (const pool of waterfall.pools) waterLevel = Math.max(waterLevel, pool.level);
  }

  return { options, size, half, maxHeight, heights, slope, waterfalls, waterLevel };
}

const GRASS_DARK = new THREE.Color("#4f7f31");
const GRASS_LIGHT = new THREE.Color("#86b455");
const ROCK_DARK = new THREE.Color("#6b717a");
const ROCK_LIGHT = new THREE.Color("#979da6");
const SNOW = new THREE.Color("#eef4fb");
const SAND = new THREE.Color("#c9ad7c");
const DIRT = new THREE.Color("#6d5136");

const AO_BRIGHTNESS = [0.5, 0.7, 0.86, 1.0];

function mixColor(a: THREE.Color, b: THREE.Color, t: number, out: THREE.Color): THREE.Color {
  out.setRGB(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t));
  return out;
}

/** Surface colour of the top block of a cell. */
function surfaceColor(
  field: TerrainField,
  x: number,
  z: number,
  h: number,
  out: THREE.Color,
): { rock: number; snow: number; grass: boolean } {
  const { options, maxHeight, slope, size } = field;
  const alt = maxHeight > 0 ? h / maxHeight : 0;
  const steep = clamp(slope[z * size + x] / 5, 0, 1);
  const variation = fbm(x * 0.09, z * 0.09, options.seed + 313, 2);

  const rockAmount = clamp(smoothstepRange(0.42, 0.85, alt) * 0.85 + steep * 0.55, 0, 1);
  const snowAmount = smoothstepRange(options.snowLine, options.snowLine + 0.07, alt);
  const grassAmount = smoothstepRange(0.02, 0.06, alt) * (1 - smoothstepRange(options.treeLine, options.treeLine + 0.16, alt));

  mixColor(GRASS_DARK, GRASS_LIGHT, variation, out);
  const rock = new THREE.Color();
  mixColor(ROCK_DARK, ROCK_LIGHT, variation * 0.8 + 0.1, rock);
  out.lerp(rock, rockAmount);
  out.lerp(SNOW, snowAmount);
  if (h <= 2) out.lerp(SAND, clamp(1 - h / 2, 0, 1) * 0.85);
  return { rock: rockAmount, snow: snowAmount, grass: grassAmount > 0.35 };
}

export interface TerrainMesh {
  geometry: THREE.BufferGeometry;
}

/**
 * Builds the visible voxel shell.
 *
 * UVs are expressed in cell units so one texture tile equals one block; that
 * is what draws the seams between blocks. Ambient occlusion is evaluated per
 * corner of the top faces, which is what gives the stepped landscape its
 * readable depth.
 */
export function buildTerrainMesh(field: TerrainField): TerrainMesh {
  const { size, half, heights } = field;
  const buf = createBuffers();

  const color = new THREE.Color();
  const scratch = new THREE.Color();

  const heightAtIndex = (x: number, z: number) => {
    if (x < 0 || z < 0 || x >= size || z >= size) return 0;
    return heights[z * size + x];
  };

  const solidAbove = (x: number, z: number, h: number) => heightAtIndex(x, z) > h;

  const cornerAO = (x: number, z: number, h: number, cx: number, cz: number): number => {
    const dx = cx === x ? -1 : 1;
    const dz = cz === z ? -1 : 1;
    const s1 = solidAbove(x + dx, z, h) ? 1 : 0;
    const s2 = solidAbove(x, z + dz, h) ? 1 : 0;
    const co = solidAbove(x + dx, z + dz, h) ? 1 : 0;
    const ao = s1 && s2 ? 0 : 3 - (s1 + s2 + co);
    return AO_BRIGHTNESS[ao];
  };

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const h = heights[z * size + x];
      if (h <= 0) continue;
      const wx = x - half;
      const wz = z - half;

      const info = surfaceColor(field, x, z, h, color);
      const tint = 0.94 + (((x * 73856093) ^ (z * 19349663)) % 97) / 97 * 0.12;
      color.multiplyScalar(tint);

      // ---- top face -------------------------------------------------------
      const ao00 = cornerAO(x, z, h, x, z);
      const ao01 = cornerAO(x, z, h, x, z + 1);
      const ao11 = cornerAO(x, z, h, x + 1, z + 1);
      const ao10 = cornerAO(x, z, h, x + 1, z);
      const top = (ao: number) => {
        scratch.copy(color).multiplyScalar(ao);
        return [scratch.r, scratch.g, scratch.b];
      };
      pushQuad(
        buf,
        [wx, h, wz], [wx, h, wz + 1], [wx + 1, h, wz + 1], [wx + 1, h, wz],
        [0, 1, 0],
        [x, z], [x, z + 1], [x + 1, z + 1], [x + 1, z],
        top(ao00), top(ao01), top(ao11), top(ao10),
      );

      // ---- side faces -----------------------------------------------------
      const emitSide = (
        neighbourHeight: number,
        quad: (y0: number, y1: number) => void,
      ) => {
        if (neighbourHeight >= h) return;
        const grassBand = info.grass && !info.snow && h - neighbourHeight >= 1;
        const split = grassBand ? h - 1 : neighbourHeight;
        if (split > neighbourHeight) {
          quad(neighbourHeight, split);
        }
        quad(split, h);
      };

      const sideColor = (y0: number, y1: number, grass: boolean): [number, number, number][] => {
        const top = info.snow > 0.4 ? SNOW : info.rock > 0.5 ? ROCK_LIGHT : DIRT;
        scratch.copy(top).multiplyScalar(0.8 + 0.2 * ((x * 31 + z * 17) % 11) / 11);
        const gradient = (y: number) => {
          const t = y1 === y0 ? 1 : (y - y0) / (y1 - y0);
          return lerp(0.64, 1.0, t);
        };
        const lower: [number, number, number] = [
          scratch.r * gradient(y0),
          scratch.g * gradient(y0),
          scratch.b * gradient(y0),
        ];
        const upper: [number, number, number] = [
          scratch.r * gradient(y1),
          scratch.g * gradient(y1),
          scratch.b * gradient(y1),
        ];
        if (grass && !info.snow) {
          const g = GRASS_DARK.clone().multiplyScalar(0.95);
          return [[g.r, g.g, g.b], [g.r, g.g, g.b], upper, upper];
        }
        return [lower, lower, upper, upper];
      };

      // -X face
      emitSide(heightAtIndex(x - 1, z), (y0, y1) => {
        const c = sideColor(y0, y1, y0 >= h - 1);
        pushQuad(
          buf,
          [wx, y0, wz], [wx, y0, wz + 1], [wx, y1, wz + 1], [wx, y1, wz],
          [-1, 0, 0],
          [z, y0], [z + 1, y0], [z + 1, y1], [z, y1],
          c[0], c[1], c[2], c[3],
        );
      });
      // +X face
      emitSide(heightAtIndex(x + 1, z), (y0, y1) => {
        const c = sideColor(y0, y1, y0 >= h - 1);
        pushQuad(
          buf,
          [wx + 1, y0, wz + 1], [wx + 1, y0, wz], [wx + 1, y1, wz], [wx + 1, y1, wz + 1],
          [1, 0, 0],
          [z + 1, y0], [z, y0], [z, y1], [z + 1, y1],
          c[0], c[1], c[2], c[3],
        );
      });
      // -Z face
      emitSide(heightAtIndex(x, z - 1), (y0, y1) => {
        const c = sideColor(y0, y1, y0 >= h - 1);
        pushQuad(
          buf,
          [wx, y0, wz], [wx, y1, wz], [wx + 1, y1, wz], [wx + 1, y0, wz],
          [0, 0, -1],
          [x, y0], [x, y1], [x + 1, y1], [x + 1, y0],
          c[0], c[1], c[2], c[3],
        );
      });
      // +Z face
      emitSide(heightAtIndex(x, z + 1), (y0, y1) => {
        const c = sideColor(y0, y1, y0 >= h - 1);
        pushQuad(
          buf,
          [wx, y0, wz + 1], [wx + 1, y0, wz + 1], [wx + 1, y1, wz + 1], [wx, y1, wz + 1],
          [0, 0, 1],
          [x, y0], [x + 1, y0], [x + 1, y1], [x, y1],
          c[0], c[1], c[2], c[3],
        );
      });
    }
  }

  const geometry = toGeometry(buf);
  return { geometry };
}

/** Random helper shared with the vegetation builder so both use one stream. */
export function makeRandom(seed: number): () => number {
  return mulberry32(seed);
}
