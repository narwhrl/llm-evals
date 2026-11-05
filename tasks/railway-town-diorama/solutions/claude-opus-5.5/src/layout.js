// Board layout: track, river, roads and the town plan. Pure data and math, no three.js.
import { createTrackPath } from './motion.js';

export const BOARD = { hx: 20, hz: 14, inner: [19.4, 13.4] };
export const RAIL_TOP = 0.25;
export const BALLAST_TOP = 0.12;

// Rounded rectangle: x in [-15, 15], z in [-8.5, 7.5]. s = 0 at the west end of the front straight.
export const TRACK = createTrackPath([-10, 7.5], 0, [
  ['line', 20], ['arc', 5, Math.PI / 2], ['line', 6], ['arc', 5, Math.PI / 2],
  ['line', 20], ['arc', 5, Math.PI / 2], ['line', 6], ['arc', 5, Math.PI / 2],
]);
export const FRONT_Z = 7.5;
export const BACK_Z = -8.5;
// Arc length of a point on the front straight (heading +x) and the back straight (heading -x).
const frontS = (x) => x + 10;
const backS = (x) => 20 + Math.PI * 2.5 + 6 + (10 - x);

export const TRAIN = {
  baseSpeed: 3,
  startS: frontS(1.0),
  // Locomotive centre when its front buffer reaches the platform's east ramp.
  stopS: frontS(-2.25),
  // Arc-length offsets of car centres behind the locomotive centre, and half bogie spacing.
  cars: [
    { offset: 0, bogie: 0.7, half: 1.35 },
    { offset: 2.8, bogie: 0.8, half: 1.25 },
    { offset: 5.5, bogie: 0.8, half: 1.25 },
  ],
};

export const STATION = {
  platform: { x0: -9.4, x1: -0.4, z0: 5.95, z1: 6.95, top: 0.32 },
  building: { x: -4.9, z: 5.0, w: 4.0, d: 1.9 },
  plaza: { x0: -8.2, x1: -1.4, z0: 2.15, z1: 4.05 },
};

export const CROSSING = { x: 2.8, s: frontS(2.8), width: 1.0 };

// ---------- geometry helpers ----------

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function distToPolyline(x, z, pts, closed = false) {
  let best = Infinity;
  const n = pts.length;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[(i + 1) % n];
    const ex = bx - ax;
    const ez = bz - az;
    const len2 = ex * ex + ez * ez || 1;
    const t = Math.min(1, Math.max(0, ((x - ax) * ex + (z - az) * ez) / len2));
    const qx = ax + ex * t - x;
    const qz = az + ez * t - z;
    const d = qx * qx + qz * qz;
    if (d < best) best = d;
  }
  return Math.sqrt(best);
}

// Uniform Catmull-Rom through the control points, open ends.
function catmullRom(points, steps) {
  const out = [];
  const p = (i) => points[Math.min(points.length - 1, Math.max(0, i))];
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    for (let k = 0; k < steps; k++) {
      const t = k / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a, b, c, d) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

function polylineLength(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return len;
}

// Evenly spaced samples {x, z, dx, dz} along an open polyline.
export function resample(pts, step) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.ceil(len / step));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      out.push({ x: ax + (bx - ax) * t, z: az + (bz - az) * t, dx: (bx - ax) / len, dz: (bz - az) / len });
    }
  }
  const [ax, az] = pts[pts.length - 2];
  const [bx, bz] = pts[pts.length - 1];
  const len = Math.hypot(bx - ax, bz - az);
  out.push({ x: bx, z: bz, dx: (bx - ax) / len, dz: (bz - az) / len });
  return out;
}

export const TRACK_PTS = (() => {
  const pts = [];
  const n = Math.round(TRACK.length / 0.2);
  for (let i = 0; i < n; i++) {
    const p = TRACK.sample((i / n) * TRACK.length);
    pts.push([p.x, p.z]);
  }
  return pts;
})();
export const distToTrack = (x, z) => distToPolyline(x, z, TRACK_PTS, true);

// ---------- river ----------

export const RIVER = {
  points: catmullRom(
    [
      [5.0, -14.6], [5.4, -12.0], [5.8, -10.0], [5.8, -7.2], [5.0, -5.0], [4.4, -3.0], [4.5, -0.4],
      [5.5, 1.8], [6.8, 4.0], [7.2, 6.0], [7.2, 9.0], [6.6, 10.8], [6.9, 12.6], [7.6, 14.6],
    ],
    8,
  ),
  bed: 0.7, // half width of the flat bed
  bank: 1.75, // half width at ground level
  bedY: -0.9,
  waterY: -0.45,
};
export const distToRiver = (x, z) => distToPolyline(x, z, RIVER.points);

// x where the river centreline crosses a given z line.
function riverCrossingX(z) {
  const pts = RIVER.points;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    if ((az - z) * (bz - z) <= 0 && az !== bz) return ax + ((z - az) / (bz - az)) * (bx - ax);
  }
  throw new Error(`river does not cross z=${z}`);
}

// Rail bridges span the channel between abutment faces set slightly into the banks.
const span = 1.55;
export const BRIDGES = {
  front: { x: riverCrossingX(FRONT_Z), z: FRONT_Z, span },
  back: { x: riverCrossingX(BACK_Z), z: BACK_Z, span },
};
for (const b of Object.values(BRIDGES)) {
  b.x0 = b.x - b.span;
  b.x1 = b.x + b.span;
}
BRIDGES.front.s0 = frontS(BRIDGES.front.x0);
BRIDGES.front.s1 = frontS(BRIDGES.front.x1);
BRIDGES.back.s0 = backS(BRIDGES.back.x1);
BRIDGES.back.s1 = backS(BRIDGES.back.x0);

// ---------- terrain ----------

const HILLS = [
  { x: -15.5, z: -12.5, r: 4.2, h: 1.1 },
  { x: -4, z: -12.8, r: 3.2, h: 0.55 },
  { x: 14.5, z: -12, r: 4.5, h: 1.2 },
  { x: 18.6, z: -2.5, r: 3.2, h: 0.8 },
  { x: 17.5, z: 12.5, r: 2.8, h: 0.45 },
  { x: -19, z: 0, r: 2.5, h: 0.5 },
];

export function groundHeight(x, z) {
  let y = 0;
  const dr = distToRiver(x, z);
  if (dr < RIVER.bank) y = RIVER.bedY * (1 - smoothstep(RIVER.bed, RIVER.bank, dr));
  let hill = 0;
  for (const h of HILLS) {
    const d2 = ((x - h.x) ** 2 + (z - h.z) ** 2) / (h.r * h.r);
    if (d2 < 4) hill += h.h * Math.exp(-d2 * 1.6);
  }
  if (hill > 0.002) {
    const edge = Math.min(BOARD.inner[0] - Math.abs(x), BOARD.inner[1] - Math.abs(z));
    hill *= smoothstep(0, 1.4, edge) * smoothstep(2.2, 4.2, distToTrack(x, z)) * smoothstep(2.2, 3.6, dr);
    y += hill;
  }
  return y;
}

// ---------- roads ----------

export const ROADS = [
  { id: 'avenue', width: 1.2, pts: [[-4.9, 2.3], [-4.9, -5.0]] },
  { id: 'river', width: 1.1, pts: [[-12.3, -1.6], [10.6, -1.6]] },
  { id: 'west', width: 0.9, pts: [[-11.9, -5.0], [-11.9, 2.9]] },
  { id: 'north', width: 0.8, pts: [[-11.9, -5.0], [2.2, -5.0]] },
  { id: 'plazaWest', width: 0.9, pts: [[-11.9, 2.9], [-8.2, 2.9]] },
  { id: 'east', width: 1.0, pts: [[-1.4, 3.0], [1.9, 3.0], [2.8, 3.9], [2.8, 12.0]] },
  { id: 'front', width: 0.9, pts: [[4.9, 12.0], [-14.4, 12.0], [-16.2, 11.0], [-16.9, 9.6]] },
];
export const ROAD_BRIDGE = { x: riverCrossingX(-1.6), z: -1.6, span: 1.95, width: 1.35 };

export const PAVED = [
  STATION.plaza,
  { x0: -6.6, x1: -3.2, z0: -5.6, z1: -4.4 },
  { x0: 9.8, x1: 11.4, z0: -2.6, z1: -1.6 },
];

// Park paths are painted, not reserved roads.
export const PATHS = [
  [[8.0, -1.0], [9.2, 0.6], [10.2, 1.6], [11.6, 2.2], [12.4, 3.4]],
  [[10.2, 1.6], [9.4, 3.2], [9.6, 4.4]],
];

export const FIELDS = [
  { x: -17.6, z: 8.2, w: 2.6, d: 3.4, rot: 0.15, crop: 0 },
  { x: -17.8, z: 4.2, w: 2.2, d: 2.8, rot: 0, crop: 1 },
  { x: 14.6, z: 11.1, w: 4.6, d: 2.6, rot: -0.06, crop: 2 },
  { x: 11.4, z: 11.4, w: 2.2, d: 2.4, rot: 0, crop: 1 },
];

// ---------- occupancy grid ----------

const CELL = 0.1;
const NX = Math.round((BOARD.inner[0] * 2) / CELL);
const NZ = Math.round((BOARD.inner[1] * 2) / CELL);
const OCC = { FREE: 0, TRACK: 1, RIVER: 2, ROAD: 3, BUILDING: 4, TREE: 5, RESERVED: 6 };

function createGrid() {
  const cells = new Uint8Array(NX * NZ);
  const index = (x, z) => {
    const ix = Math.floor((x + BOARD.inner[0]) / CELL);
    const iz = Math.floor((z + BOARD.inner[1]) / CELL);
    return ix < 0 || iz < 0 || ix >= NX || iz >= NZ ? -1 : iz * NX + ix;
  };
  const at = (x, z) => {
    const i = index(x, z);
    return i < 0 ? 255 : cells[i];
  };
  function eachCell(x0, z0, x1, z1, fn) {
    const ix0 = Math.max(0, Math.floor((x0 + BOARD.inner[0]) / CELL));
    const iz0 = Math.max(0, Math.floor((z0 + BOARD.inner[1]) / CELL));
    const ix1 = Math.min(NX - 1, Math.floor((x1 + BOARD.inner[0]) / CELL));
    const iz1 = Math.min(NZ - 1, Math.floor((z1 + BOARD.inner[1]) / CELL));
    for (let iz = iz0; iz <= iz1; iz++) {
      for (let ix = ix0; ix <= ix1; ix++) {
        const cx = (ix + 0.5) * CELL - BOARD.inner[0];
        const cz = (iz + 0.5) * CELL - BOARD.inner[1];
        if (fn(cx, cz, iz * NX + ix) === false) return false;
      }
    }
    return true;
  }
  const disc = (x, z, r, code) =>
    eachCell(x - r, z - r, x + r, z + r, (cx, cz, i) => {
      if ((cx - x) ** 2 + (cz - z) ** 2 <= r * r && cells[i] < code) cells[i] = code;
    });
  const discFree = (x, z, r) =>
    eachCell(x - r, z - r, x + r, z + r, (cx, cz, i) => !((cx - x) ** 2 + (cz - z) ** 2 <= r * r && cells[i]));
  // Oriented rectangle {x, z, w, d, rot}: w along local x, d along local z.
  function rectCells(rect, margin, fn) {
    const c = Math.cos(rect.rot);
    const s = Math.sin(rect.rot);
    const hw = rect.w / 2 + margin;
    const hd = rect.d / 2 + margin;
    const ext = Math.hypot(hw, hd);
    return eachCell(rect.x - ext, rect.z - ext, rect.x + ext, rect.z + ext, (cx, cz, i) => {
      const lx = (cx - rect.x) * c - (cz - rect.z) * s;
      const lz = (cx - rect.x) * s + (cz - rect.z) * c;
      if (Math.abs(lx) <= hw && Math.abs(lz) <= hd) return fn(i);
    });
  }
  const rectFree = (rect, margin = 0) => {
    if (!rectInside(rect)) return false;
    return rectCells(rect, margin, (i) => cells[i] === 0);
  };
  const markRect = (rect, code, margin = 0) => rectCells(rect, margin, (i) => void (cells[i] = code));
  const stampPolyline = (pts, r, code) => {
    for (const p of resample(pts, CELL)) disc(p.x, p.z, r, code);
  };
  return { cells, at, disc, discFree, rectFree, markRect, stampPolyline };
}

function rectInside(rect) {
  const c = Math.cos(rect.rot);
  const s = Math.sin(rect.rot);
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    const lx = (sx * rect.w) / 2;
    const lz = (sz * rect.d) / 2;
    const x = rect.x + lx * c + lz * s;
    const z = rect.z - lx * s + lz * c;
    if (Math.abs(x) > BOARD.inner[0] - 0.15 || Math.abs(z) > BOARD.inner[1] - 0.15) return false;
  }
  return true;
}

// ---------- town plan ----------

// Building rotation: local +z (the facade) faces direction (sin rot, cos rot).
export const LANDMARKS = [
  { kind: 'station', ...STATION.building, rot: Math.PI },
  { kind: 'platform', x: (STATION.platform.x0 + STATION.platform.x1) / 2, z: 6.45, w: 9.0, d: 1.0, rot: 0 },
  { kind: 'goodsshed', x: -8.35, z: 5.05, w: 2.0, d: 1.5, rot: Math.PI },
  { kind: 'townhall', x: -4.9, z: -6.35, w: 3.2, d: 1.5, rot: 0 },
  { kind: 'church', x: 10.6, z: -4.7, w: 1.7, d: 3.4, rot: 0 },
  { kind: 'factory', x: -8.85, z: -6.35, w: 2.9, d: 1.5, rot: 0 },
  { kind: 'watertower', x: -10.7, z: 4.75, w: 1.2, d: 1.2, rot: 0 },
  { kind: 'bandstand', x: 10.4, z: 2.6, w: 1.3, d: 1.3, rot: 0 },
  { kind: 'barn', x: -15.0, z: 10.4, w: 2.2, d: 1.5, rot: 0.3 },
  { kind: 'farmhouse', x: -17.9, z: 11.4, w: 1.8, d: 1.3, rot: Math.PI / 2 + 0.4 },
  { kind: 'boathouse', x: 9.6, z: 10.6, w: 1.4, d: 1.2, rot: -Math.PI / 2 },
];

// Street frontages: a line from a to b; buildings stand on its left (side 1) or right (side -1)
// with their facades `edge` away from the line, facing it.
const FRONTAGES = [
  { a: [-8.2, 2.15], b: [-1.4, 2.15], side: 1, edge: 0.12, style: 'square' },
  { a: [-11.3, -1.6], b: [2.3, -1.6], side: 1, edge: 0.75, style: 'shop' },
  { a: [-11.3, -1.6], b: [2.3, -1.6], side: -1, edge: 0.75, style: 'shopShallow' },
  { a: [-4.9, 1.6], b: [-4.9, -4.3], side: 1, edge: 1.3, style: 'shop' },
  { a: [-4.9, 1.6], b: [-4.9, -4.3], side: -1, edge: 1.3, style: 'shop' },
  { a: [-11.9, 2.9], b: [-8.2, 2.9], side: 1, edge: 0.65, style: 'house' },
  { a: [-1.4, 3.0], b: [1.9, 3.0], side: 1, edge: 0.65, style: 'house' },
  { a: [-1.4, 3.0], b: [1.9, 3.0], side: -1, edge: 0.65, style: 'shop' },
  { a: [-11.9, -4.4], b: [-11.9, 2.3], side: 1, edge: 0.6, style: 'house' },
  { a: [-11.3, -5.0], b: [2.2, -5.0], side: 1, edge: 0.55, style: 'cottage' },
  { a: [6.6, -1.6], b: [9.6, -1.6], side: 1, edge: 0.75, style: 'house' },
  { a: [4.4, 12.0], b: [-14.0, 12.0], side: -1, edge: 0.65, style: 'cottage' },
];

const STYLES = {
  square: { w: [1.4, 2.0], d: [1.05, 1.35], floors: [2, 3], roofs: ['flat', 'hip', 'gable'] },
  shop: { w: [1.3, 2.0], d: [1.3, 1.65], floors: [2, 3], roofs: ['flat', 'gable', 'hip', 'gableEnd'] },
  shopShallow: { w: [1.3, 2.0], d: [1.1, 1.4], floors: [2, 3], roofs: ['gable', 'hip', 'gableEnd'] },
  house: { w: [1.3, 1.8], d: [1.1, 1.45], floors: [1, 2], roofs: ['gable', 'gableEnd', 'hip'] },
  cottage: { w: [1.2, 1.7], d: [1.0, 1.35], floors: [1, 2], roofs: ['gable', 'gableEnd'] },
};

const WALLS = ['#e9dcc0', '#d9c39b', '#c9d3cf', '#e3c8b0', '#b9c7d6', '#efe6d2', '#d6b18a', '#c4b8a8', '#a9bf9b', '#e6d3a3'];
const ROOFS = ['#9a4a35', '#7d3b2e', '#5f6670', '#4c5a63', '#8b5a3c', '#a65e3f', '#3f4d45'];

export function planTown(seed = 7) {
  const rng = mulberry32(seed);
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const range = ([a, b]) => a + (b - a) * rng();
  const grid = createGrid();

  grid.stampPolyline([...TRACK_PTS, TRACK_PTS[0]], 1.35, OCC.TRACK);
  grid.stampPolyline(RIVER.points, RIVER.bank + 0.25, OCC.RIVER);
  for (const road of ROADS) grid.stampPolyline(road.pts, road.width / 2 + 0.15, OCC.ROAD);
  for (const p of PAVED) {
    grid.markRect({ x: (p.x0 + p.x1) / 2, z: (p.z0 + p.z1) / 2, w: p.x1 - p.x0, d: p.z1 - p.z0, rot: 0 }, OCC.ROAD);
  }
  for (const path of PATHS) grid.stampPolyline(path, 0.3, OCC.RESERVED);
  for (const f of FIELDS) grid.markRect(f, OCC.RESERVED);

  const landmarks = LANDMARKS.map((l) => ({ ...l }));
  for (const l of landmarks) grid.markRect(l, OCC.BUILDING, 0.1);

  const buildings = [];
  for (const { a, b, side, edge, style } of FRONTAGES) {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const dx = (b[0] - a[0]) / len;
    const dz = (b[1] - a[1]) / len;
    const nx = dz * side;
    const nz = -dx * side;
    const st = STYLES[style];
    let t = 0;
    while (t < len) {
      const w = range(st.w);
      const d = range(st.d);
      const along = t + w / 2;
      if (along + w / 2 > len) break;
      const rect = {
        x: a[0] + dx * along + nx * (edge + d / 2),
        z: a[1] + dz * along + nz * (edge + d / 2),
        w,
        d,
        rot: Math.atan2(-nx, -nz),
      };
      if (grid.rectFree(rect, 0.05)) {
        grid.markRect(rect, OCC.BUILDING, 0.05);
        buildings.push({
          ...rect,
          style,
          floors: Math.round(range([st.floors[0] - 0.49, st.floors[1] + 0.49])),
          roof: pick(st.roofs),
          wall: pick(WALLS),
          roofColor: pick(ROOFS),
          seed: Math.floor(rng() * 1e9),
        });
        t += w + 0.08 + rng() * 0.3;
      } else {
        t += 0.25;
      }
    }
  }
  // Street trees along the avenue, then scattered planting by zone density.
  const trees = [];
  const addTree = (x, z, kind, scale) => {
    trees.push({ x, z, y: groundHeight(x, z), kind, scale, hue: rng(), rot: rng() * Math.PI * 2 });
    grid.disc(x, z, 0.42 * scale, OCC.TREE);
  };
  for (let z = 1.4; z > -4.4; z -= 1.45) {
    for (const x of [-4.9 - 0.95, -4.9 + 0.95]) if (grid.discFree(x, z, 0.2)) addTree(x, z, 'round', 0.62);
  }
  const density = (x, z) => {
    const outside = !insideLoop(x, z);
    const dr = distToRiver(x, z);
    if (outside && z < -9.5) return 0.95;
    if (outside && x > 16) return 0.85;
    if (outside && x < -16 && z < 4) return 0.7;
    if (dr < 3.2) return 0.35;
    if (x > 7.6 && x < 13.6 && z > -1 && z < 5.6) return 0.38; // park
    if (outside) return 0.22;
    return 0.06;
  };
  for (let i = 0; i < 9000; i++) {
    const x = (rng() * 2 - 1) * (BOARD.inner[0] - 0.4);
    const z = (rng() * 2 - 1) * (BOARD.inner[1] - 0.4);
    if (rng() > density(x, z)) continue;
    const scale = 0.7 + rng() * 0.55;
    if (!grid.discFree(x, z, 0.3 * scale)) continue;
    const conifer = z < -9.5 || x > 16.2 || (x < -15.8 && z < 3) ? rng() < 0.7 : rng() < 0.15;
    addTree(x, z, conifer ? 'conifer' : 'round', scale);
  }

  const lamps = [];
  for (const road of ROADS) {
    if (road.id === 'front') continue;
    const samples = resample(road.pts, 0.1);
    const total = polylineLength(road.pts);
    let side = 1;
    for (let d = 0.8; d < total - 0.4; d += 2.6) {
      const p = samples[Math.min(samples.length - 1, Math.round(d / 0.1))];
      const off = road.width / 2 + 0.12;
      const x = p.x + p.dz * off * side;
      const z = p.z - p.dx * off * side;
      const code = grid.at(x, z);
      // rot turns the lamp arm (local +x) toward the road centre.
      if (code === OCC.FREE || code === OCC.ROAD) lamps.push({ x, z, rot: Math.atan2(-p.dx * side, -p.dz * side) });
      side = -side;
    }
  }

  return { buildings, landmarks, trees, lamps, grid };
}

// Point-in-loop test for the rounded rectangle track.
function insideLoop(x, z) {
  const qx = Math.abs(x) - 10;
  const qz = Math.abs(z + 0.5) - 3;
  const sd = Math.hypot(Math.max(qx, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qz), 0) - 5;
  return sd < 0;
}
