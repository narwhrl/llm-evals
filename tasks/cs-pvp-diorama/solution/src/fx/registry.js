// Collected while the map is built, consumed by the effect systems afterwards.

// Drip emitters: water beads hanging from an edge at [x, y, z].
export const DRIPS = [];
// Vent mouths that exhale steam: [x, y, z].
export const STEAM = [];
// Rain-blocking solids as [x0, z0, x1, z1, topY]; rain stops and splashes on the highest one.
export const SOLIDS = [];
// Per-frame callbacks (t seconds, dt seconds) for moving scenery.
export const ANIMATED = [];

export function drip(x, y, z) {
  DRIPS.push([x, y, z]);
}

// A row of drips along an edge from a to b.
export function dripLine(a, b, count) {
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count + (Math.sin(i * 12.9898 + a[0]) * 0.5) / count;
    DRIPS.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
  }
}

export function steam(x, y, z) {
  STEAM.push([x, y, z]);
}

export function solid(x0, z0, x1, z1, top) {
  SOLIDS.push([Math.min(x0, x1), Math.min(z0, z1), Math.max(x0, x1), Math.max(z0, z1), top]);
}

// Highest surface under a point hanging at height y (drips land on it).
export function floorBelow(x, z, y) {
  let best = 0;
  for (const s of SOLIDS) {
    if (x >= s[0] && x <= s[2] && z >= s[1] && z <= s[3] && s[4] < y - 0.05 && s[4] > best) best = s[4];
  }
  return best;
}

export function floorAt(x, z) {
  let y = 0;
  for (const s of SOLIDS) {
    if (x >= s[0] && x <= s[2] && z >= s[1] && z <= s[3] && s[4] > y) y = s[4];
  }
  return y;
}
