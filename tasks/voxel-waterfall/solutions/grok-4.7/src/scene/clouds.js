import { fbm, hash2 } from "./hash.js";
import { heightAt } from "./terrain.js";

export function buildClouds(terrain, options) {
  const density = options.cloudDensity ?? 0.55;
  const lift = options.cloudLift ?? 0;
  const base = Math.max(8, terrain.cloudBase + Math.round(lift));
  const cells = [];
  const count = Math.round(18 + density * 34);

  for (let i = 0; i < count; i += 1) {
    const angle = hash2(i, 3, terrain.seed + 41) * Math.PI * 2;
    const radial = 0.2 + hash2(i, 9, terrain.seed + 77) * 0.2;
    const cx = Math.round(terrain.size * (0.5 + Math.cos(angle) * radial));
    const cz = Math.round(terrain.size * (0.46 + Math.sin(angle) * radial * 0.85));
    const n = fbm(i * 0.17, angle, terrain.seed + 90, 3);
    const span = 5 + Math.round(n * (4 + density * 8));
    const y = base + Math.round((n - 0.5) * 6);
    for (let dz = -span; dz <= span; dz += 2) {
      for (let dx = -span; dx <= span; dx += 2) {
        const d = Math.hypot(dx, dz) / span;
        if (d > 1) continue;
        const puff = hash2(cx + dx, cz + dz, terrain.seed + i);
        if (puff < 0.28) continue;
        const x = cx + dx;
        const z = cz + dz;
        if (x < 2 || z < 2 || x >= terrain.size - 2 || z >= terrain.size - 2) continue;
        const ground = heightAt(terrain, x, z);
        const h = 2 + Math.round((1 - d) * (3 + puff * 4));
        const py = y + Math.round((puff - 0.5) * 2);
        if (ground > terrain.snowLine - 4) continue;
        cells.push({ x, y: py, z, h, s: 2 });
      }
    }
  }
  return { base, thickness: 6, cells };
}
