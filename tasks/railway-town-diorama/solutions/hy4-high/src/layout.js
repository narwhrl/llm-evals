import * as THREE from 'three';

export const BOARD = { w: 64, d: 46 };
export const SOIL_BOTTOM = -1.25;
export const TRACK_Y = 0.62;
export const WHEEL_R = 0.34;

export const RIVER = {
  halfWater: 4.0,
  halfBank: 5.3,
  waterY: -0.40,
  bedY: -0.88,
  ribbonHalf: 5.1,
};

export const BRIDGE_THRESHOLD = 5.0;
export const HUMP_HEIGHT = 0.78;
export const HUMP_SPAN = 25;

export const mod1 = (u) => ((u % 1) + 1) % 1;

export function smoothstep(t) {
  t = THREE.MathUtils.clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

// A gently meandering river crossing the board from left to right.
export function riverZ(x) {
  return 2.0 * Math.sin((x + 5) / 9.5) + 0.6 * Math.sin(x / 3.6) - 1.2;
}

export const RIVER_POINTS = [];
for (let x = -38; x <= 38; x += 0.5) {
  RIVER_POINTS.push([x, riverZ(x)]);
}

export function riverDistance(x, z) {
  let best = Infinity;
  for (let i = 0; i < RIVER_POINTS.length - 1; i++) {
    const [ax, az] = RIVER_POINTS[i];
    const [bx, bz] = RIVER_POINTS[i + 1];
    const dx = bx - ax, dz = bz - az;
    const t = THREE.MathUtils.clamp(
      ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz), 0, 1,
    );
    const d = Math.hypot(x - (ax + t * dx), z - (az + t * dz));
    if (d < best) best = d;
  }
  return best;
}

// Height of the sculpted terrain. The river is a real depression, so the
// railway needs a bridge where the loop crosses it.
export function groundHeight(x, z) {
  const d = riverDistance(x, z);
  let h;
  if (d <= RIVER.halfWater) {
    h = RIVER.bedY + 0.05 * Math.sin(x * 0.9) * Math.cos(z * 0.7);
  } else if (d >= RIVER.halfBank) {
    h = 0;
  } else {
    h = RIVER.bedY * (1 - smoothstep((d - RIVER.halfWater) / (RIVER.halfBank - RIVER.halfWater)));
  }
  const edge = smoothstep(Math.min(BOARD.w / 2 - Math.abs(x), BOARD.d / 2 - Math.abs(z)) / 2.5);
  const fade = smoothstep(d / RIVER.halfBank);
  const noise = (0.09 * Math.sin(x * 0.42) * Math.cos(z * 0.51)
    + 0.05 * Math.sin(x * 0.93 + z * 0.71)) * edge * fade;
  return h + noise;
}

// Closed oval with softly varied ends; the two ends sit on the river so the
// loop crosses it exactly twice.
const FLAT_POINTS = [
  [-24.5, -2.5], [-24.0, -8.5], [-19.5, -13.5], [-10.0, -16.2],
  [0.5, -16.6], [11.0, -15.4], [19.0, -12.0], [23.5, -6.0],
  [24.5, 0.5], [22.5, 7.5], [16.0, 13.0], [6.0, 16.0],
  [-4.5, 16.3], [-14.0, 14.0], [-21.0, 9.0], [-24.0, 3.0],
].map(([x, z]) => new THREE.Vector3(x, 0, z));

export const trackCurve = new THREE.CatmullRomCurve3(FLAT_POINTS, true, 'centripetal', 0.5);
trackCurve.arcLengthDivisions = 2400;
export const TRACK_LENGTH = trackCurve.getLength();

// Detect the two arcs of the loop that lie over the river.
const DETECT_N = 720;
const bridgeCentersU = [];
{
  const flags = [];
  for (let i = 0; i < DETECT_N; i++) {
    const p = trackCurve.getPointAt(i / DETECT_N);
    flags.push(riverDistance(p.x, p.z) < BRIDGE_THRESHOLD);
  }
  const off = flags.findIndex((f) => !f);
  let start = -1;
  for (let k = 0; k <= DETECT_N; k++) {
    const f = k < DETECT_N ? flags[(off + k) % DETECT_N] : false;
    if (f && start < 0) start = k;
    if (!f && start >= 0) {
      bridgeCentersU.push(mod1((off + (start + k) / 2) / DETECT_N));
      start = -1;
    }
  }
}
export const BRIDGE_CENTERS = bridgeCentersU;

// A gentle, zero-slope rise over each crossing gives the viaducts their shape.
export function elevAt(u) {
  const dist = mod1(u) * TRACK_LENGTH;
  let e = 0;
  for (const c of BRIDGE_CENTERS) {
    const cd = c * TRACK_LENGTH;
    let dd = Math.abs(dist - cd);
    dd = Math.min(dd, TRACK_LENGTH - dd);
    if (dd < HUMP_SPAN / 2) {
      e += HUMP_HEIGHT * 0.5 * (1 + Math.cos((2 * Math.PI * dd) / HUMP_SPAN));
    }
  }
  return e;
}

export function trackPoint(u) {
  const p = trackCurve.getPointAt(mod1(u));
  p.y = TRACK_Y + elevAt(u);
  return p;
}

export function trackTangent(u) {
  const e = 0.0008;
  const a = trackPoint(u - e);
  const b = trackPoint(u + e);
  return b.sub(a).normalize();
}

// Local frame of the track: +Z forward, +Y up, +X to the right.
export function trackFrame(u) {
  const forward = trackTangent(u);
  const worldUp = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(worldUp, forward).normalize();
  const up = new THREE.Vector3().crossVectors(forward, right).normalize();
  return new THREE.Matrix4().makeBasis(right, up, forward);
}

// The station sits on the near arc, facing into the town.
export const STATION_TARGET = new THREE.Vector2(-9.5, 15.4);
export const STATION_U = (() => {
  let best = Infinity, bestU = 0;
  for (let i = 0; i < 1200; i++) {
    const u = i / 1200;
    const p = trackCurve.getPointAt(u);
    const d = Math.hypot(p.x - STATION_TARGET.x, p.z - STATION_TARGET.y);
    if (d < best) { best = d; bestU = u; }
  }
  return bestU;
})();
export const START_U = mod1(STATION_U - 0.3);

// Roads are polylines in XZ. An explicit `y` marks an elevated road-bridge
// deck; otherwise the road follows the sculpted ground.
export const ROADS = [
  { name: 'near', width: 2.0, points: [
    [-18, 6.9], [-11, 6.8], [-4, 6.9], [3, 7.0], [10, 6.8], [17, 6.6], [20, 5.8],
  ] },
  { name: 'far', width: 1.9, points: [
    [-17, -7.4], [-10, -7.6], [-3, -7.5], [4, -7.7], [11, -7.4], [16, -7.0],
  ] },
  { name: 'spine', width: 2.1, bridge: true, points: [
    [-9.0, 9.2], [-7.2, 8.2], [-4.2, 7.3], [-1.6, 7.0], [0.3, 7.0],
    [0.5, 6.2], { x: 0.5, z: 5.0, y: 0.12 },
    { x: 0.5, z: 3.0, y: 0.55 }, { x: 0.5, z: 0.0, y: 0.74 },
    { x: 0.5, z: -2.6, y: 0.55 }, { x: 0.5, z: -4.4, y: 0.12 },
    [0.6, -5.8], [0.8, -7.5], [1.2, -9.4], [3.5, -10.2], [7.0, -10.4], [11.0, -9.6],
  ] },
  { name: 'outer', width: 1.7, points: [
    [11.0, -9.6], [12.0, -12.0], [12.5, -14.6], [13.5, -17.5], [16.0, -19.3],
  ] },
];

export function roadPoints(road) {
  return road.points.map((p) => {
    const x = Array.isArray(p) ? p[0] : p.x;
    const z = Array.isArray(p) ? p[1] : p.z;
    const y = !Array.isArray(p) && p.y !== undefined ? p.y : groundHeight(x, z) + 0.06;
    return new THREE.Vector3(x, y, z);
  });
}

export function roadSegments() {
  const segs = [];
  for (const road of ROADS) {
    const pts = roadPoints(road);
    for (let i = 0; i < pts.length - 1; i++) {
      segs.push({ road: road.name, a: pts[i], b: pts[i + 1] });
    }
  }
  return segs;
}

const ROAD_SEGMENTS = roadSegments();

export function distToSegment(x, z, a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const t = THREE.MathUtils.clamp(((x - a.x) * dx + (z - a.z) * dz) / (dx * dx + dz * dz || 1), 0, 1);
  return Math.hypot(x - (a.x + t * dx), z - (a.z + t * dz));
}

export function nearestRoad(x, z) {
  let best = Infinity, name = 'near', tx = 1, tz = 0;
  for (const s of ROAD_SEGMENTS) {
    const d = distToSegment(x, z, s.a, s.b);
    if (d < best) {
      best = d;
      name = s.road;
      tx = s.b.x - s.a.x; tz = s.b.z - s.a.z;
    }
  }
  return { dist: best, name, tx, tz };
}

export function distToRoad(x, z) {
  let best = Infinity;
  for (const s of ROAD_SEGMENTS) {
    const d = distToSegment(x, z, s.a, s.b);
    if (d < best) best = d;
  }
  return best;
}

const TRACK_SAMPLES = [];
for (let i = 0; i < 360; i++) {
  const p = trackCurve.getPointAt(i / 360);
  TRACK_SAMPLES.push([p.x, p.z]);
}

export function distToTrack(x, z) {
  let best = Infinity;
  for (const [px, pz] of TRACK_SAMPLES) {
    const d = Math.hypot(x - px, z - pz);
    if (d < best) best = d;
  }
  return best;
}

// Circular runs of a boolean array, expressed in a rotated linear index so
// strips that wrap around u=0 can be built with a plain ascending loop.
export function circularRuns(flags, wanted) {
  const n = flags.length;
  const out = [];
  const off = flags.findIndex((f) => f !== wanted);
  if (off < 0) return [{ off: 0, startK: 0, endK: n }];
  let start = -1;
  for (let k = 0; k <= n; k++) {
    const f = k < n ? flags[(off + k) % n] : !wanted;
    if (f === wanted && start < 0) start = k;
    if (f !== wanted && start >= 0) {
      out.push({ off, startK: start, endK: k });
      start = -1;
    }
  }
  return out;
}

export function sampleTrack(startK, endK, off, n, pad = 0) {
  const pts = [];
  for (let k = startK - pad; k <= endK + pad; k++) {
    pts.push(trackPoint(mod1((off + k) / n)));
  }
  return pts;
}
