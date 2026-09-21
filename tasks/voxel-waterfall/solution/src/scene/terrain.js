import { fbm } from "./hash.js";

export const MATERIALS = {
  bedrock: 0,
  dirt: 1,
  grass: 2,
  rock: 3,
  snow: 4,
  water: 5,
  foam: 6,
  trunk: 7,
  leaves: 8,
  shrub: 9,
};

export const MATERIAL_COLORS = {
  [MATERIALS.bedrock]: 0x5c5348,
  [MATERIALS.dirt]: 0x8a6239,
  [MATERIALS.grass]: 0x6f9a3d,
  [MATERIALS.rock]: 0x8d8680,
  [MATERIALS.snow]: 0xeef3f6,
  [MATERIALS.water]: 0x3d8fd4,
  [MATERIALS.foam]: 0xd7f4ff,
  [MATERIALS.trunk]: 0x6b4423,
  [MATERIALS.leaves]: 0x3f7a32,
  [MATERIALS.shrub]: 0x4e8a3a,
};

const PEAKS = [
  { u: 0.5, v: 0.46, radius: 0.3, weight: 1 },
  { u: 0.28, v: 0.34, radius: 0.16, weight: 0.55 },
  { u: 0.72, v: 0.3, radius: 0.15, weight: 0.48 },
  { u: 0.36, v: 0.68, radius: 0.14, weight: 0.4 },
  { u: 0.66, v: 0.64, radius: 0.13, weight: 0.36 },
  { u: 0.18, v: 0.58, radius: 0.1, weight: 0.24 },
  { u: 0.82, v: 0.52, radius: 0.1, weight: 0.22 },
];

export function clampSize(size) {
  const n = Number(size) || 256;
  return Math.max(200, Math.min(320, Math.round(n)));
}

function peakHeight(u, v, peakScale) {
  let h = 0;
  for (const peak of PEAKS) {
    const du = (u - peak.u) / peak.radius;
    const dv = (v - peak.v) / peak.radius;
    const d2 = du * du + dv * dv;
    h += peak.weight * Math.exp(-d2 * 1.7);
  }
  return h * peakScale;
}

export function buildTerrain(options) {
  const size = clampSize(options.size);
  const seed = options.seed | 0;
  const peakScale = options.peakScale ?? 1;
  const maxHeight = Math.max(48, Math.round(78 * peakScale));
  const heights = new Uint8Array(size * size);
  let peak = 0;
  let peakIndex = 0;

  for (let z = 0; z < size; z += 1) {
    const v = z / (size - 1);
    for (let x = 0; x < size; x += 1) {
      const u = x / (size - 1);
      const ridge = peakHeight(u, v, peakScale);
      const detail = fbm(u * 5.5, v * 5.5, seed, 4) - 0.5;
      const warp = fbm(u * 2.2 + 4, v * 2.2 + 9, seed + 17, 3) - 0.5;
      const edge = Math.min(u, v, 1 - u, 1 - v);
      const skirt = Math.min(1, edge / 0.12);
      const basinU = 0.5;
      const basinV = 0.9;
      const basin = Math.exp(-((u - basinU) ** 2 + (v - basinV) ** 2) / 0.012);
      const shaped = Math.pow(Math.max(0, ridge), 0.82) * 0.9 + detail * 0.08 + warp * 0.04;
      const carved = shaped * skirt * (1 - basin * 0.92);
      const height = Math.max(1, Math.min(255, Math.round(carved * maxHeight)));
      const index = z * size + x;
      heights[index] = height;
      if (height > peak) {
        peak = height;
        peakIndex = index;
      }
    }
  }

  return {
    size,
    seed,
    heights,
    peak,
    peakX: peakIndex % size,
    peakZ: Math.floor(peakIndex / size),
    snowLine: Math.round(peak * 0.78),
    cloudBase: Math.round(peak * 0.48),
    cloudTop: Math.round(peak * 0.66),
  };
}

export function heightAt(terrain, x, z) {
  if (x < 0 || z < 0 || x >= terrain.size || z >= terrain.size) return 0;
  return terrain.heights[z * terrain.size + x];
}

export function slopeAt(terrain, x, z) {
  const h = heightAt(terrain, x, z);
  const dx = Math.abs(h - heightAt(terrain, Math.min(terrain.size - 1, x + 1), z));
  const dz = Math.abs(h - heightAt(terrain, x, Math.min(terrain.size - 1, z + 1)));
  return Math.max(dx, dz);
}

export function materialAt(terrain, x, z) {
  const h = heightAt(terrain, x, z);
  const slope = slopeAt(terrain, x, z);
  if (h <= 2) return MATERIALS.bedrock;
  if (h >= terrain.snowLine && slope < 3) return MATERIALS.snow;
  if (slope >= 2 || h > terrain.peak * 0.62) return MATERIALS.rock;
  if (h <= 5) return MATERIALS.dirt;
  return MATERIALS.grass;
}
