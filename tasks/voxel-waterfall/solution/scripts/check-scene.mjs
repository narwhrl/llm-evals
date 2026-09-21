import { buildTerrain, heightAt } from "../src/scene/terrain.js";
import { buildWaterfalls } from "../src/scene/waterfall.js";
import { buildTerrainMesh, countQuads } from "../src/scene/mesh.js";

const terrain = buildTerrain({ size: 200, seed: 7, peakScale: 1 });
const falls = buildWaterfalls(terrain, 3);
const quads = countQuads(buildTerrainMesh(terrain));
const failures = [];

if (terrain.size < 200) failures.push(`size ${terrain.size} < 200`);
if (terrain.peak < 16) failures.push(`peak ${terrain.peak} is too low`);
if (terrain.cloudBase >= terrain.peak) failures.push("clouds are not below the peak");
if (terrain.peak < terrain.cloudTop) failures.push("peak does not pierce the cloud deck");

const secondary = [];
for (const [x, z] of [
  [Math.round(terrain.size * 0.28), Math.round(terrain.size * 0.34)],
  [Math.round(terrain.size * 0.72), Math.round(terrain.size * 0.3)],
]) {
  secondary.push(heightAt(terrain, x, z));
}
if (secondary.some((h) => h >= terrain.peak)) failures.push("a secondary peak is not lower than the main peak");
if (falls.length < 1) failures.push("no waterfall reached the foot");
for (const fall of falls) {
  for (let i = 1; i < fall.path.length; i += 1) {
    if (fall.path[i].y > fall.path[i - 1].y) failures.push("waterfall path rises");
  }
  if (fall.path.at(-1).y > 3) failures.push(`waterfall ${fall.index} stops at y=${fall.path.at(-1).y}`);
}
if (quads <= 0) failures.push("terrain mesh is empty");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  JSON.stringify({
    size: terrain.size,
    peak: terrain.peak,
    cloudBase: terrain.cloudBase,
    cloudTop: terrain.cloudTop,
    falls: falls.map((fall) => ({
      cells: fall.path.length,
      drop: fall.path[0].y - fall.path.at(-1).y,
      mouth: fall.path.at(-1).y,
    })),
    quads,
  }),
);
