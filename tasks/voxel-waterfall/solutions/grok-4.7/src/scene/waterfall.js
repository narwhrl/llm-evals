import { heightAt } from "./terrain.js";

function scoreSource(terrain, x, z) {
  const h = heightAt(terrain, x, z);
  if (h < terrain.peak * 0.62) return -1;
  const dx = x - terrain.peakX;
  const dz = z - terrain.peakZ;
  const south = z / terrain.size;
  return h * 10 + south * 12 - Math.hypot(dx, dz) * 0.08;
}

export function findSources(terrain, count) {
  const found = [];
  const minDist = Math.max(12, Math.round(terrain.size * 0.08));
  let best = [];
  const step = Math.max(1, Math.floor(terrain.size / 96));
  for (let z = 2; z < terrain.size - 2; z += step) {
    for (let x = 2; x < terrain.size - 2; x += step) {
      best.push({ x, z, score: scoreSource(terrain, x, z) });
    }
  }
  best.sort((a, b) => b.score - a.score);
  for (const cell of best) {
    if (cell.score < 0) break;
    if (found.some((item) => Math.hypot(item.x - cell.x, item.z - cell.z) < minDist)) continue;
    found.push(cell);
    if (found.length >= count) break;
  }
  if (!found.length) found.push({ x: terrain.peakX, z: terrain.peakZ, score: terrain.peak });
  return found;
}

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export function traceFall(terrain, source) {
  const path = [{ x: source.x, z: source.z, y: heightAt(terrain, source.x, source.z) }];
  const seen = new Set([`${source.x},${source.z}`]);
  let x = source.x;
  let z = source.z;
  const limit = terrain.size * 3;

  for (let step = 0; step < limit; step += 1) {
    const h = heightAt(terrain, x, z);
    if (h <= 2 || x <= 1 || z <= 1 || x >= terrain.size - 2 || z >= terrain.size - 2) break;
    let next = null;
    let best = Infinity;
    for (const [dx, dz] of DIRS) {
      const nx = x + dx;
      const nz = z + dz;
      if (nx < 0 || nz < 0 || nx >= terrain.size || nz >= terrain.size) continue;
      const key = `${nx},${nz}`;
      if (seen.has(key)) continue;
      const nh = heightAt(terrain, nx, nz);
      const south = nz > z ? 0.35 : 0;
      const score = nh - south + (Math.abs(dx) + Math.abs(dz) > 1 ? 0.2 : 0);
      if (score < best) {
        best = score;
        next = { x: nx, z: nz, y: nh };
      }
    }
    if (!next || next.y > h + 1) break;
    path.push(next);
    seen.add(`${next.x},${next.z}`);
    x = next.x;
    z = next.z;
    if (next.y <= 2) break;
  }
  return path;
}

export function buildWaterfalls(terrain, count) {
  const sources = findSources(terrain, Math.max(1, count | 0));
  return sources
    .map((source, index) => ({ index, source, path: traceFall(terrain, source) }))
    .filter((fall) => fall.path.length >= 4 && fall.path[0].y - fall.path[fall.path.length - 1].y >= 6);
}

export function waterfallColumns(fall) {
  const columns = [];
  for (let i = 0; i < fall.path.length; i += 1) {
    const cell = fall.path[i];
    const prev = fall.path[Math.max(0, i - 1)];
    const next = fall.path[Math.min(fall.path.length - 1, i + 1)];
    const lip = i === 0;
    const y1 = lip ? cell.y + 2 : Math.max(cell.y + 1, prev.y);
    const width = 3;
    for (let ox = 0; ox < width; ox += 1) {
      for (let oz = 0; oz < width; oz += 1) {
        columns.push({
          x: Math.min(9999, cell.x + ox - Math.floor((width - 1) / 2)),
          z: Math.min(9999, cell.z + oz),
          y0: cell.y,
          y1,
          foam: lip || prev.y - cell.y >= 2 || cell.y - next.y >= 2 || i > fall.path.length - 4,
        });
      }
    }
  }
  const mouth = fall.path[fall.path.length - 1];
  return { columns, mouth };
}
