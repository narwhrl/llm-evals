import { box, tube, mergeStatic } from './common.js';

export function buildCables(ctx, parent, materials) {
  const z = -1.875, ties = [];
  const heightAt = x => {
    const dx = Math.abs(x - 1.33);
    return dx < 0.98 ? Math.max(2.12, 1.35 + Math.sqrt(0.985 ** 2 - dx ** 2)) : 2.12;
  };
  for (const high of [false, true]) {
    for (let strand = 0; strand < 3; strand++) {
      const points = [];
      for (let i = 0; i <= 80; i++) {
        const x = -3.96 + i * 7.92 / 80;
        points.push([x, (high ? heightAt(x) : 0.105) + strand * 0.025, z]);
      }
      tube(parent, strand === 2 ? materials.cableGold : materials.cable, points, 0.013, 100);
    }
    for (let x = -3.86; x < 4; x += 0.3) {
      const y = high ? heightAt(x) : 0.105;
      ties.push(box(parent, materials.enamel, 0.018, 0.092, 0.022, x, y + 0.023, z + 0.007));
      ties.push(box(parent, materials.dark, 0.026, 0.015, 0.017, x, y + 0.058, z + 0.025));
    }
  }
  // Pressure-frame sensor conduits down each side, outside its bolt circle.
  for (const x of [0.32, 2.34]) {
    tube(parent, materials.cable, [[x, 0.15, z], [x, 0.4, z],
      [x, 1.12, z], [x, 1.66, z], [x, 2.08, z]], 0.018, 32);
    for (const y of [0.34, 0.93, 1.5, 1.94]) {
      ties.push(box(parent, materials.enamel, 0.07, 0.022, 0.032, x, y, z + 0.005));
    }
  }
  // Short useful handholds tucked in the service bays.
  for (const [x, y] of [[-2.55, 0.59], [-0.34, 1.12], [3.54, 0.91]]) {
    tube(parent, materials.steel, [[x - 0.13, y, -1.92], [x - 0.13, y, -1.82],
      [x + 0.13, y, -1.82], [x + 0.13, y, -1.92]], 0.018, 12);
  }
  // Two kinds of tie share geometry dimensions; merging retains their individual textures.
  const pale = ties.filter(o => o.material === materials.enamel);
  const dark = ties.filter(o => o.material === materials.dark);
  mergeStatic(parent, pale, materials.enamel, 'pale-cable-clamps');
  mergeStatic(parent, dark, materials.dark, 'cable-zip-locks');
}
