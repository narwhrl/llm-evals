import { hash2 } from "./hash.js";
import { heightAt, materialAt } from "./terrain.js";
import { MATERIALS } from "./terrain.js";

export function buildFoliage(terrain, density) {
  const trees = [];
  const shrubs = [];
  const amount = Math.max(0, Math.min(1.4, density ?? 0.6));
  const step = amount < 0.35 ? 6 : amount < 0.8 ? 4 : 3;

  for (let z = 3; z < terrain.size - 3; z += step) {
    for (let x = 3; x < terrain.size - 3; x += step) {
      const h = heightAt(terrain, x, z);
      if (h < 3 || h > terrain.peak * 0.42) continue;
      if (materialAt(terrain, x, z) !== MATERIALS.grass && materialAt(terrain, x, z) !== MATERIALS.dirt) continue;
      const n = hash2(x, z, terrain.seed + 3);
      if (n > 0.18 + amount * 0.7) continue;
      const jitterX = Math.round((hash2(x, z, terrain.seed + 11) - 0.5) * 2);
      const jitterZ = Math.round((hash2(x, z, terrain.seed + 19) - 0.5) * 2);
      const px = Math.min(terrain.size - 2, Math.max(1, x + jitterX));
      const pz = Math.min(terrain.size - 2, Math.max(1, z + jitterZ));
      const y = heightAt(terrain, px, pz);
      if (n < amount * 0.28) {
        trees.push({ x: px, y, z: pz, trunk: 3 + (n > 0.12 ? 1 : 0), canopy: n > 0.18 ? 2 : 1 });
      } else {
        shrubs.push({ x: px, y, z: pz, h: 1 + (n > 0.5 ? 1 : 0) });
      }
    }
  }
  return { trees, shrubs };
}
