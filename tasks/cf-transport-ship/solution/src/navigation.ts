import { navigationBlocked, type Vec2 } from './map';

const CELL = 1.15, WIDTH = 24, HEIGHT = 65;
const X0 = -13.2, Z0 = -37.0;
const blocked = new Uint8Array(WIDTH * HEIGHT);
for (let z = 0; z < HEIGHT; z++) for (let x = 0; x < WIDTH; x++) {
  blocked[z * WIDTH + x] = navigationBlocked(X0 + (x + .5) * CELL, Z0 + (z + .5) * CELL, .41) ? 1 : 0;
}
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
function cellOf(x: number, z: number): number {
  const col = Math.max(0, Math.min(WIDTH - 1, Math.floor((x - X0) / CELL)));
  const row = Math.max(0, Math.min(HEIGHT - 1, Math.floor((z - Z0) / CELL)));
  return row * WIDTH + col;
}
function center(i: number): Vec2 { return { x: X0 + (i % WIDTH + .5) * CELL, z: Z0 + (Math.floor(i / WIDTH) + .5) * CELL }; }
function nearestOpen(i: number): number {
  if (!blocked[i]) return i;
  const p = center(i); let best = -1, dist = Infinity;
  for (let n = 0; n < blocked.length; n++) {
    if (blocked[n]) continue;
    const q = center(n), d = (q.x - p.x) ** 2 + (q.z - p.z) ** 2;
    if (d < dist) { dist = d; best = n; }
  }
  return best;
}
export function findPath(start: Vec2, end: Vec2): Vec2[] {
  const s = nearestOpen(cellOf(start.x, start.z)), goal = nearestOpen(cellOf(end.x, end.z));
  if (s < 0 || goal < 0) return [];
  const count = blocked.length, g = new Float32Array(count), parent = new Int32Array(count), done = new Uint8Array(count);
  g.fill(Infinity); parent.fill(-1); g[s] = 0;
  const open: { i: number; f: number }[] = [{ i: s, f: 0 }];
  function push(i: number, f: number) {
    let p = open.length; open.push({ i, f });
    while (p > 0) { const q = (p - 1) >> 1; if (open[q].f <= f) break; open[p] = open[q]; p = q; } open[p] = { i, f };
  }
  function pop(): number {
    const first = open[0].i, tail = open.pop()!;
    if (open.length) {
      let p = 0;
      while (p * 2 + 1 < open.length) {
        let q = p * 2 + 1; if (q + 1 < open.length && open[q + 1].f < open[q].f) q++;
        if (tail.f <= open[q].f) break; open[p] = open[q]; p = q;
      } open[p] = tail;
    }
    return first;
  }
  while (open.length) {
    const i = pop(); if (done[i]) continue; done[i] = 1;
    if (i === goal) break;
    const x = i % WIDTH, z = Math.floor(i / WIDTH);
    for (const [dx, dz] of dirs) {
      const nx = x + dx, nz = z + dz; if (nx < 0 || nx >= WIDTH || nz < 0 || nz >= HEIGHT) continue;
      const n = nz * WIDTH + nx; if (blocked[n] || done[n]) continue;
      if (dx && dz && (blocked[z * WIDTH + nx] || blocked[nz * WIDTH + x])) continue;
      const cost = g[i] + (dx && dz ? 1.414 : 1);
      if (cost >= g[n]) continue;
      g[n] = cost; parent[n] = i;
      const h = Math.hypot(goal % WIDTH - nx, Math.floor(goal / WIDTH) - nz);
      push(n, cost + h);
    }
  }
  if (goal !== s && parent[goal] < 0) return [];
  const route: Vec2[] = []; let i = goal;
  while (i !== s && i >= 0) { route.push(center(i)); i = parent[i]; }
  route.reverse();
  // Remove collinear grid points; movement still follows every actual turn.
  const compact: Vec2[] = [];
  for (let j = 0; j < route.length; j++) {
    const a = route[j - 1] ?? start, b = route[j], c = route[j + 1];
    if (!c || Math.abs((b.x - a.x) * (c.z - b.z) - (b.z - a.z) * (c.x - b.x)) > .01) compact.push(b);
  }
  return compact;
}
