import * as THREE from 'three';

// The railway is a closed curve on the board plane (x, z).
// Points are ordered clockwise when seen from the default camera corner.
const TRACK_POINTS = [
  [-16, -12],
  [-24, -12],
  [-30, -10],
  [-31.6, -5],
  [-31.8, 1],
  [-30.8, 7],
  [-27.5, 12],
  [-22, 15],
  [-13, 16],
  [-4, 17],
  [6, 17],
  [16, 16],
  [22, 14],
  [27, 9],
  [30, 4],
  [32, 1],
  [30, -5],
  [26, -10],
  [18, -13],
  [10, -13],
  [2, -10],
  [-4, -7],
  [-10, -9],
];

export const BOARD = { halfX: 34, halfZ: 22, topY: 0 };

// The river flows in from the eastern board edge and ends inside the board,
// so the closed loop crosses it exactly once.
export const RIVER = {
  x0: 21,
  x1: BOARD.halfX,
  z0: -10.5,
  z1: -6.5,
  width: 4,
  waterY: -0.32,
};

// Approximate world position of the water surface under a point, or null.
export function riverAt(x, z, margin = 0) {
  if (x > RIVER.x0 - margin && x < BOARD.halfX && z > RIVER.z0 - margin && z < RIVER.z1 + margin) {
    return RIVER.waterY;
  }
  return null;
}

export function groundYAt(x, z) {
  const river = riverAt(x, z, 0);
  if (river !== null) return river;
  return BOARD.topY;
}

// Per-vertex colours for a geometry lying on the board plane.
// Top vertices get grass or sand (river bank), sides get earth.
export function paintTerrain(geometry) {
  const pos = geometry.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const grass = new THREE.Color(0x6d9b46);
  const grassDark = new THREE.Color(0x59853a);
  const sand = new THREE.Color(0xcbb98a);
  const earth = new THREE.Color(0x7d6248);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (y < -0.01) {
      c.copy(earth);
    } else if (x > RIVER.x0 - 0.9 && z > RIVER.z0 - 0.9 && z < RIVER.z1 + 0.9) {
      c.copy(sand);
    } else {
      // subtle two-tone grass patchwork
      const n = Math.sin(x * 0.35 + z * 0.9) * Math.cos(x * 0.13 - z * 0.41);
      c.copy(grass).lerp(grassDark, THREE.MathUtils.clamp(n * 0.5 + 0.5, 0, 1) * 0.55);
    }
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

export function buildTrackCurve() {
  const points = TRACK_POINTS.map(([x, z]) => new THREE.Vector3(x, 0, z));
  const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal', 0.5);
  curve.arcLengthDivisions = 4000;
  curve.updateArcLengths();
  return curve;
}

// Distance along the curve (in world units) for a given parameter t in [0,1).
export function curveLength(curve) {
  return curve.getLength();
}

// Convert a travelled distance s into curve parameter u.
export function distanceToU(curve, s, length) {
  const wrapped = ((s % length) + length) % length;
  return curve.getUtoTmapping(wrapped / length);
}

// Position + heading for a point s units along the loop.
export function sampleTrack(curve, s, length, target = {}) {
  const u = distanceToU(curve, s, length);
  const pos = curve.getPointAt(u);
  const tan = curve.getTangentAt(u).normalize();
  target.pos = target.pos || new THREE.Vector3();
  target.tan = target.tan || new THREE.Vector3();
  target.pos.copy(pos);
  target.tan.copy(tan);
  target.u = u;
  return target;
}
