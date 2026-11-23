import * as THREE from 'three';
import { GeometryBuilder, ORIGIN, UPRIGHT, type V3 } from '../core/builder';
import { GLOW, IVORY, architrave, balustrade, column } from './stonework';

const UP = new THREE.Vector3(0, 1, 0);

export interface BridgeOptions {
  width?: number;
  /** Height from deck down to the foot of the piers. Defaults to a share of the full span. */
  height?: number;
  /** Fraction of the full span, measured from each end, that still stands. */
  standing?: readonly [number, number];
  /** A colonnade runs along both rails. */
  colonnade?: boolean;
}

/**
 * White arched bridge between two deck-level points. Its side profile is a single extrusion: a gently
 * cambered deck over a row of arches. Returns the masonry left hanging in mid-air where the span has
 * fallen away, so it can drift.
 */
export function buildBridge(
  b: GeometryBuilder,
  from: THREE.Vector3,
  to: THREE.Vector3,
  random: () => number,
  options: BridgeOptions = {},
): THREE.Matrix4[] {
  const horizontal = new THREE.Vector3(to.x - from.x, 0, to.z - from.z);
  const run = horizontal.length();
  horizontal.normalize();
  const frame = new THREE.Matrix4().makeBasis(horizontal, UP, new THREE.Vector3().crossVectors(horizontal, UP));
  frame.setPosition(from);

  const rise = to.y - from.y;
  const width = options.width ?? 4.6;
  const height = options.height ?? THREE.MathUtils.clamp(run * 0.17, 3.5, 9);
  const camber = Math.min(2.2, run * 0.04);
  const deck = (x: number): number => rise * (x / run) + camber * Math.sin((Math.PI * x) / run);
  const [keepFrom, keepTo] = options.standing ?? [0, 1];
  const start = keepFrom * run;
  const end = keepTo * run;
  const span = end - start;

  // Arches share the span evenly between two short abutments.
  const arches = Math.max(1, Math.round(span / 26));
  const pier = 1.5;
  const abutment = Math.min(3, span * 0.14);
  const opening = (span - 2 * abutment - (arches - 1) * pier) / arches;
  const foot = Math.min(1.4, height * 0.25);
  const spring = (x: number): number => deck(x) - height + foot;
  const crown = Math.min(opening * 0.42, height - foot - 1.5);

  // Top edge left to right, then back along the underside right to left, stepping up and over each arch.
  const profile = new THREE.Shape();
  profile.moveTo(start, deck(start));
  for (let i = 1; i <= 24; i++) {
    const x = start + (span * i) / 24;
    profile.lineTo(x, deck(x));
  }
  profile.lineTo(end, deck(end) - height);
  for (let arch = arches - 1; arch >= 0; arch--) {
    const right = start + abutment + arch * (opening + pier) + opening;
    const left = right - opening;
    profile.lineTo(right, deck(right) - height);
    profile.lineTo(right, spring(right));
    profile.absellipse((left + right) / 2, (spring(left) + spring(right)) / 2, opening / 2, crown, 0, Math.PI, false);
    profile.lineTo(left, deck(left) - height);
  }
  profile.lineTo(start, deck(start) - height);
  profile.closePath();

  const ruins: THREE.Matrix4[] = [];
  // A broken end: crushed stone still attached to the cut, and blocks that have not finished falling.
  const wreck = (x: number, outward: number): void => {
    for (let i = 0; i < 9; i++) {
      const chip = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(random() * 3, random() * 3, random() * 3));
      chip.setPosition(x + outward * random() * 0.9, deck(x) - random() * height, (random() - 0.5) * width);
      b.placeMatrix(IVORY, new THREE.DodecahedronGeometry(0.3 + random() * 0.5, 0), chip, 0.9);
    }
    for (let i = 0; i < 6; i++) {
      const hover = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(random() * 3, random() * 3, random() * 3));
      const size = 0.5 + random() * 1.1;
      hover.scale(new THREE.Vector3(size, size * (0.6 + random() * 0.6), size));
      hover.setPosition(x + outward * (2 + random() * 11), deck(x) - random() * (height + 5), (random() - 0.5) * width * 1.4);
      ruins.push(new THREE.Matrix4().multiplyMatrices(frame, hover));
    }
  };

  b.within(frame, () => {
    b.extrude(IVORY, profile, width, ORIGIN, UPRIGHT, 1, 24);

    // Archivolts: a raised half-ring around each arch on both faces.
    for (let arch = 0; arch < arches; arch++) {
      const centre = start + abutment + arch * (opening + pier) + opening / 2;
      const trim = new THREE.TorusGeometry(opening / 2, 0.14, 6, 24, Math.PI);
      trim.scale(1, crown / (opening / 2), 1);
      for (const side of [-1, 1]) b.place(IVORY, trim, [centre, spring(centre), (side * width) / 2], UPRIGHT, 0.97);
    }

    for (const side of [-1, 1]) {
      const rail: V3[] = [];
      const steps = Math.max(2, Math.round(span / 2.4));
      for (let i = 0; i <= steps; i++) {
        const x = start + (span * i) / steps;
        rail.push([x, deck(x), (side * (width - 0.5)) / 2]);
      }
      balustrade(b, rail, { goldCap: true });
    }

    // Lamp posts mark the ends that still reach land.
    const landings: number[] = [];
    if (keepFrom === 0) landings.push(start);
    if (keepTo === 1) landings.push(end);
    for (const x of landings) {
      for (const side of [-1, 1]) {
        const z = (side * (width - 0.5)) / 2;
        b.box(IVORY, 0.7, 1.9, 0.7, [x, deck(x) + 0.95, z], UPRIGHT, 0.98);
        b.sphere(GLOW, 0.3, [x, deck(x) + 2.25, z]);
      }
    }

    if (options.colonnade) {
      const bays = Math.max(2, Math.round(span / 5.5));
      const lost = Math.floor(bays / 2);
      for (const side of [-1, 1]) {
        const z = (side * (width - 1.2)) / 2;
        const tops: V3[] = [];
        for (let i = 0; i <= bays; i++) {
          const x = start + (span * i) / bays;
          column(b, IVORY, [x, deck(x), z], 5.4, 0.34, 1, side === 1 && i === lost ? 0.35 : 0);
          tops.push([x, deck(x) + 5.4, z]);
        }
        for (let i = 0; i < bays; i++) {
          // The beams either side of a snapped column have come down with it.
          if (side === 1 && (i === lost || i === lost - 1)) continue;
          architrave(b, IVORY, tops.slice(i, i + 2), 0.8, 0.62);
        }
      }
    }

    if (keepFrom > 0) wreck(start, -1);
    if (keepTo < 1) wreck(end, 1);
  });
  return ruins;
}
