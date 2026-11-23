import * as THREE from 'three';
import { GeometryBuilder, ORIGIN, TAU, UPRIGHT, type V3 } from '../core/builder';

// Material keys, as defined by `createMaterials`.
export const IVORY = 'ivory';
export const GOLD = 'gold';
export const DARK = 'dark';
export const GLOW = 'glow';
export const BRONZE = 'bronze';
export const ROOF = 'roof';
export const STONE = 'stone';

/** Point at `angle` (around +Y, from +X toward +Z) and `radius` on the plane at height `y`. */
export function polar(angle: number, radius: number, y = 0): V3 {
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
}

/** Rotation that turns a part built facing +Z to face `angle`. Its local +X then runs along the tangent. */
export function facing(angle: number): V3 {
  return [0, Math.PI / 2 - angle, 0];
}

/** Right prism with its base at `pos`, whose faces look out at `faceAngle + i * 2π / sides`. */
export function polygonPrism(
  b: GeometryBuilder,
  key: string,
  radiusTop: number,
  radiusBottom: number,
  height: number,
  sides: number,
  pos: V3 = ORIGIN,
  shade = 1,
  faceAngle = 0,
): void {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, sides);
  // CylinderGeometry puts its first vertex at +Z; turn so the vertices sit halfway between the face angles.
  geometry.rotateY(Math.PI / 2 - faceAngle - Math.PI / sides);
  geometry.translate(0, height / 2, 0);
  b.place(key, geometry, pos, UPRIGHT, shade);
}

/** Flat ring lying on the plane at `pos`, centred on `start` and sweeping `length` radians. */
export function ringBand(
  b: GeometryBuilder,
  key: string,
  inner: number,
  outer: number,
  height: number,
  pos: V3 = ORIGIN,
  shade = 1,
  segments = 48,
  start = 0,
  length = TAU,
): void {
  const profile = [
    new THREE.Vector2(inner, 0),
    new THREE.Vector2(outer, 0),
    new THREE.Vector2(outer, height),
    new THREE.Vector2(inner, height),
    new THREE.Vector2(inner, 0),
  ];
  // LatheGeometry opens at +Z; shift so the band straddles `start`.
  b.place(key, new THREE.LatheGeometry(profile, segments, Math.PI / 2 - start - length / 2, length), pos, UPRIGHT, shade);
}

/** Points along an arc around the local origin, spaced roughly `spacing` apart. */
export function arcPoints(radius: number, start: number, end: number, y: number, spacing = 2.4): V3[] {
  const count = Math.max(1, Math.ceil((Math.abs(end - start) * radius) / spacing));
  return Array.from({ length: count + 1 }, (_, i) => polar(start + ((end - start) * i) / count, radius, y));
}

/** Classical column: plinth, tapered shaft, capital. `broken` is the fraction of its height that is gone. */
export function column(b: GeometryBuilder, key: string, pos: V3, height: number, radius: number, shade = 1, broken = 0): void {
  const plinth = radius * 0.45;
  b.place(
    key,
    new THREE.CylinderGeometry(radius * 1.3, radius * 1.45, plinth, 12),
    [pos[0], pos[1] + plinth / 2, pos[2]],
    UPRIGHT,
    shade * 0.94,
  );
  const standing = height * (1 - broken);
  const capital = radius * 0.9;
  const shaft = standing - plinth - capital;
  if (shaft > 0) {
    b.place(
      key,
      new THREE.CylinderGeometry(radius * 0.86, radius, shaft, 12),
      [pos[0], pos[1] + plinth + shaft / 2, pos[2]],
      UPRIGHT,
      shade,
    );
  }
  if (broken > 0) {
    // A tilted stump where the shaft snapped.
    b.place(key, new THREE.ConeGeometry(radius * 0.95, radius * 1.3, 7), [pos[0], pos[1] + standing - radius * 0.6, pos[2]], [0.3, 0, 0.22], shade * 0.88);
  } else {
    b.place(
      key,
      new THREE.CylinderGeometry(radius * 1.28, radius * 0.88, radius * 0.4, 12),
      [pos[0], pos[1] + height - radius * 0.5, pos[2]],
      UPRIGHT,
      shade * 1.02,
    );
    b.place(key, new THREE.BoxGeometry(radius * 2.7, radius * 0.5, radius * 2.7), [pos[0], pos[1] + height - radius * 0.25, pos[2]], UPRIGHT, shade);
  }
}

export interface BalustradeOptions {
  height?: number;
  shade?: number;
  /** Every nth baluster becomes a square newel post. */
  postEvery?: number;
  goldCap?: boolean;
}

/** Curb, balusters and rail along a polyline of ground-level points. Leave a gap by splitting the polyline. */
export function balustrade(b: GeometryBuilder, points: V3[], options: BalustradeOptions = {}): void {
  const height = options.height ?? 1.15;
  const shade = options.shade ?? 1;
  let baluster = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0, z0] = points[i];
    const [x1, y1, z1] = points[i + 1];
    const dx = x1 - x0;
    const dz = z1 - z0;
    const run = Math.hypot(dx, dz);
    const rot: V3 = [0, Math.atan2(-dz, dx), Math.atan2(y1 - y0, run)];
    const middle: V3 = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
    b.box(IVORY, run * 1.03, 0.16, 0.34, [middle[0], middle[1] + height, middle[2]], rot, shade);
    if (options.goldCap) b.box(GOLD, run * 1.03, 0.05, 0.14, [middle[0], middle[1] + height + 0.105, middle[2]], rot);
    b.box(IVORY, run * 1.03, 0.18, 0.42, [middle[0], middle[1] + 0.09, middle[2]], rot, shade * 0.96);

    const count = Math.max(1, Math.round(run / 1.5));
    for (let k = i === 0 ? 0 : 1; k <= count; k++) {
      if (k === count && i < points.length - 2) continue; // the next run lays the shared corner
      const t = k / count;
      const x = x0 + dx * t;
      const y = y0 + (y1 - y0) * t;
      const z = z0 + dz * t;
      if (baluster++ % (options.postEvery ?? 5) === 0) {
        b.box(IVORY, 0.36, height + 0.24, 0.36, [x, y + (height + 0.24) / 2, z], UPRIGHT, shade);
      } else {
        b.column(IVORY, 0.085, 0.12, height - 0.1, 6, [x, y + 0.18, z], UPRIGHT, shade * 0.97);
      }
    }
  }
}

/** Filled arch outline standing on y = 0, used for dark recesses and gold frames. */
export function archedSlab(width: number, height: number): THREE.Shape {
  const r = width / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-r, 0);
  shape.lineTo(-r, height - r);
  shape.absarc(0, height - r, r, Math.PI, 0, true);
  shape.lineTo(r, 0);
  shape.closePath();
  return shape;
}

/**
 * Wall panel with one arched opening. With no sill the opening is a doorway cut into the outline;
 * with a sill it is a window enclosed by the wall.
 */
export function archOpening(width: number, height: number, opening: number, spring: number, sill = 0): THREE.Shape {
  const r = opening / 2;
  const trace = (path: THREE.Path): void => {
    path.moveTo(-r, sill);
    path.lineTo(-r, spring);
    path.absarc(0, spring, r, Math.PI, 0, true);
    path.lineTo(r, sill);
    path.closePath();
  };
  const shape = new THREE.Shape();
  if (sill > 0) {
    shape.moveTo(-width / 2, 0);
    shape.lineTo(width / 2, 0);
    shape.lineTo(width / 2, height);
    shape.lineTo(-width / 2, height);
    shape.closePath();
    const hole = new THREE.Path();
    trace(hole);
    shape.holes.push(hole);
  } else {
    shape.moveTo(-width / 2, 0);
    shape.lineTo(-r, 0);
    shape.lineTo(-r, spring);
    shape.absarc(0, spring, r, Math.PI, 0, true);
    shape.lineTo(r, 0);
    shape.lineTo(width / 2, 0);
    shape.lineTo(width / 2, height);
    shape.lineTo(-width / 2, height);
    shape.closePath();
  }
  return shape;
}

export interface ArcadeOptions {
  y: number;
  height: number;
  /** Distance from the axis to the panel corners. */
  radius: number;
  sides: number;
  opening: number;
  spring: number;
  depth?: number;
  shade?: number;
  /** Direction the first face looks out at. */
  faceAngle?: number;
  /** Indices of the faces that still stand; all of them when omitted. */
  faces?: readonly number[];
}

/** Ring of flat wall panels with arched doorways, approximating a polygon around the local Y axis. */
export function arcade(b: GeometryBuilder, options: ArcadeOptions): void {
  const step = TAU / options.sides;
  const apothem = options.radius * Math.cos(Math.PI / options.sides);
  const width = 2 * options.radius * Math.sin(Math.PI / options.sides);
  const faces = options.faces ?? Array.from({ length: options.sides }, (_, i) => i);
  const panel = archOpening(width, options.height, options.opening, options.spring);
  for (const face of faces) {
    const angle = (options.faceAngle ?? 0) + face * step;
    b.extrude(IVORY, panel, options.depth ?? 1.2, polar(angle, apothem, options.y), facing(angle), options.shade ?? 1, 16);
  }
}

/** Straight beam following a polyline of points, offset upward by half its height. */
export function architrave(b: GeometryBuilder, key: string, points: V3[], height: number, width: number, shade = 1): void {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0, z0] = points[i];
    const [x1, y1, z1] = points[i + 1];
    const dx = x1 - x0;
    const dz = z1 - z0;
    const run = Math.hypot(dx, dz);
    b.box(
      key,
      run * 1.02,
      height,
      width,
      [(x0 + x1) / 2, (y0 + y1) / 2 + height / 2, (z0 + z1) / 2],
      [0, Math.atan2(-dz, dx), Math.atan2(y1 - y0, run)],
      shade,
    );
  }
}

/** Slightly bulbous hemisphere on the plane at `pos`. */
export function dome(b: GeometryBuilder, key: string, radius: number, pos: V3, shade = 1): void {
  const profile: [number, number][] = [];
  const steps = 14;
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * (Math.PI / 2);
    profile.push([radius * Math.cos(phi) * (1 + 0.12 * Math.sin(phi * Math.PI)), radius * Math.sin(phi)]);
  }
  b.lathe(key, profile, 32, pos, shade);
}

/** Gold orb and spike, for roof peaks. */
export function finial(b: GeometryBuilder, pos: V3, scale = 1): void {
  b.sphere(GOLD, 0.55 * scale, [pos[0], pos[1] + 0.45 * scale, pos[2]]);
  b.cone(GOLD, 0.22 * scale, 2.2 * scale, 10, [pos[0], pos[1] + scale, pos[2]]);
}

/** Armillary sighting instrument on a stone pedestal. */
export function sight(b: GeometryBuilder, pos: V3, tilt: number, yaw: number, scale = 1): void {
  polygonPrism(b, IVORY, 0.45 * scale, 0.7 * scale, 1.5 * scale, 8, pos, 0.95);
  const hub: V3 = [pos[0], pos[1] + 2.3 * scale, pos[2]];
  b.place(BRONZE, new THREE.TorusGeometry(1.15 * scale, 0.07 * scale, 8, 32), hub, [tilt, yaw, 0]);
  b.place(BRONZE, new THREE.TorusGeometry(0.9 * scale, 0.06 * scale, 8, 32), hub, [tilt + 1.2, yaw + 0.8, 0.5]);
  b.place(GOLD, new THREE.CylinderGeometry(0.045 * scale, 0.045 * scale, 3.4 * scale, 6), hub, [tilt + Math.PI / 2, yaw, 0]);
  b.sphere(GOLD, 0.16 * scale, hub);
}
