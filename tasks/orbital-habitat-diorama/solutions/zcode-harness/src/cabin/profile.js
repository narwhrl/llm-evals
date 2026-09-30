// Cabin cross-section (z-y plane), extruded along X. Units: meters. See docs/DESIGN.md §2.
//
//   y
//   2.50 |   .--  cut edge of the ceiling lip at z=-1.65 (arc angle 90°, lip is horizontal)
//   2.20 |  (     arc R=0.30, center (z=-1.65, y=2.20)
//        |  |
//        |  |     rear wall, vertical, inner face at z=-1.95, faces +Z (viewer)
//   0    +--+-------------------------- floor top y=0, z in [-2, 2]
//          z=-1.95                      -> +Z (open cut-away side)
//
// Arc length s runs from the floor junction (s=0) up the wall and over the lip.
// For the vertical part s === y. The lip is deliberately short: at the true isometric view the
// view rays climb exactly 1 m in y per 1 m in +z (DESIGN.md §3), so a ceiling at y=2.5 reaching
// z=-0.4 would hide every rear-wall point above y≈0.95. With this lip, every profile point in
// front of the big porthole frame (z > -1.83) keeps y - z ≥ 4.15 > 4.12 (frame top y=2.29 at
// z=-1.83), so the whole porthole frame stays unoccluded in the default view.
import * as THREE from 'three';

export const HALF_LENGTH = 4; // x in [-4, 4]
export const FLOOR_Z_MIN = -2;
export const FLOOR_Z_MAX = 2;
export const INTERIOR_HEIGHT = 2.5;
export const WALL_THICKNESS = 0.16;
export const FLOOR_THICKNESS = 0.18;

export const WALL_Z = -1.95; // inner surface of the vertical rear wall
export const VERTICAL_TOP = 2.2; // y where the vertical wall turns into the arc
export const ARC_RADIUS = 0.3;
export const ARC_CENTER_Z = WALL_Z + ARC_RADIUS; // -1.65
export const ARC_CENTER_Y = VERTICAL_TOP; // 2.20
export const ARC_END_ANGLE = THREE.MathUtils.degToRad(90);

const L_VERTICAL = VERTICAL_TOP;
const L_ARC = ARC_RADIUS * ARC_END_ANGLE;

/** Total arc length of the inner profile (≈ 2.627 m). */
export const profileLength = L_VERTICAL + L_ARC;

/**
 * Evaluate the inner profile at arc length s (clamped to [0, profileLength]).
 * Writes into `res` = {z, y, nz, ny}; (nz, ny) is the unit inward normal.
 */
function evalProfile(s, res) {
  const ss = s < 0 ? 0 : s > profileLength ? profileLength : s;
  if (ss <= L_VERTICAL) {
    res.z = WALL_Z;
    res.y = ss;
    res.nz = 1;
    res.ny = 0;
  } else {
    const phi = (ss - L_VERTICAL) / ARC_RADIUS;
    const c = Math.cos(phi), si = Math.sin(phi);
    res.z = ARC_CENTER_Z - ARC_RADIUS * c;
    res.y = ARC_CENTER_Y + ARC_RADIUS * si;
    // Inward normal points toward the arc center.
    res.nz = c;
    res.ny = -si;
  }
  return res;
}

/**
 * Sampled profile: array of { s, z, y, nz, ny } from floor junction to cut edge.
 * Spacing ≤ 0.05 m on the wall, ≤ 3° on the arc; includes both breakpoints exactly.
 */
export const PROFILE = (() => {
  const pts = [];
  const push = (s) => {
    const p = evalProfile(s, { s, z: 0, y: 0, nz: 0, ny: 0 });
    p.s = s;
    pts.push(Object.freeze(p));
  };
  const nV = Math.ceil(L_VERTICAL / 0.05);
  for (let i = 0; i < nV; i++) push((L_VERTICAL * i) / nV);
  const nA = Math.ceil(ARC_END_ANGLE / THREE.MathUtils.degToRad(3));
  for (let i = 0; i <= nA; i++) push(L_VERTICAL + (L_ARC * i) / nA);
  return Object.freeze(pts);
})();

const tmp = { z: 0, y: 0, nz: 0, ny: 0 };

/**
 * World position on the inner wall surface at (x, s), pushed `inset` meters along the inward
 * normal (positive = into the cabin, negative = into the wall; -WALL_THICKNESS = outer skin).
 * @param {number} x
 * @param {number} s arc length along PROFILE
 * @param {number} [inset=0]
 * @param {THREE.Vector3} [out] receives the position (allocated if omitted)
 * @param {THREE.Vector3} [outNormal] receives the unit inward normal (x component 0)
 * @returns {THREE.Vector3} out
 */
export function wallPoint(x, s, inset = 0, out = new THREE.Vector3(), outNormal) {
  evalProfile(s, tmp);
  out.set(x, tmp.y + tmp.ny * inset, tmp.z + tmp.nz * inset);
  if (outNormal) outNormal.set(0, tmp.ny, tmp.nz);
  return out;
}

/**
 * Arc length at which the inner surface reaches height y.
 * Exact identity (s === y) on the vertical part; continues onto the arc up to its end height.
 */
export function sAtHeight(y) {
  if (y <= 0) return 0;
  if (y <= L_VERTICAL) return y;
  const k = Math.min(1, (y - ARC_CENTER_Y) / ARC_RADIUS);
  const phi = Math.min(ARC_END_ANGLE, Math.asin(k));
  return L_VERTICAL + ARC_RADIUS * phi;
}
