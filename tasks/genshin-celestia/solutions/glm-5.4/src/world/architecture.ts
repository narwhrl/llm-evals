import * as THREE from 'three';
import { GeometryBuilder, ORIGIN, TAU, type V3 } from '../core/builder';
import {
  DARK,
  GOLD,
  IVORY,
  ROOF,
  STONE,
  arcade,
  archedSlab,
  architrave,
  arcPoints,
  balustrade,
  column,
  dome,
  facing,
  finial,
  polar,
  polygonPrism,
  ringBand,
  sight,
} from './stonework';
import type { Island } from './island';

const DEG = Math.PI / 180;
const at = (x: number, y: number, z: number): THREE.Matrix4 => new THREE.Matrix4().makeTranslation(x, y, z);

/**
 * The observatory. Everything is laid out around the local Y axis on ground that is level at y = 0.
 * It is deliberately unsymmetric: the deck overhangs toward the default view, a slender needle spire
 * stands apart to one side, a round chapel leans on the other, and a ramp spirals from the terrace
 * up through an opening in the deck.
 */
export function buildObservatory(b: GeometryBuilder): { mastBaseY: number } {
  const terraceY = 2.4;
  polygonPrism(b, IVORY, 27, 27.9, terraceY, 8, ORIGIN, 0.97);

  // Steps down from the terrace.
  const stairAngle = -45 * DEG;
  const apothem = 27 * Math.cos(Math.PI / 8);
  for (let i = 0; i < 3; i++) {
    const tread = 1.3;
    const height = (terraceY * (i + 1)) / 3;
    b.box(IVORY, 13, height, tread, polar(stairAngle, apothem + (3 - i) * tread - tread / 2, height / 2), facing(stairAngle), 0.95);
  }
  const corners = Array.from({ length: 8 }, (_, i): V3 => polar(Math.PI / 8 + (i * Math.PI) / 4, 27, terraceY));
  for (let i = 0; i < 8; i++) {
    if (i !== 6) balustrade(b, [corners[i], corners[(i + 1) % 8]], { shade: 0.98 });
  }

  // Base: an octagon of arched doorways around a shadowed core.
  const baseHeight = 21.5;
  arcade(b, { y: terraceY, height: baseHeight, radius: 12.5, sides: 8, opening: 4.4, spring: 8, depth: 1.3 });
  polygonPrism(b, DARK, 11.3, 11.3, baseHeight, 8, [0, terraceY, 0]);
  for (let i = 0; i < 8; i++) {
    b.box(IVORY, 1.5, baseHeight, 1.5, polar((i * Math.PI) / 4, 12.2, terraceY + baseHeight / 2), facing((i * Math.PI) / 4 + Math.PI / 8));
  }
  polygonPrism(b, IVORY, 12.7, 12.7, 0.5, 8, [0, terraceY + baseHeight, 0], 0.92);
  polygonPrism(b, GOLD, 12.45, 12.45, 0.35, 8, [0, terraceY + baseHeight + 0.5, 0]);
  polygonPrism(b, IVORY, 12.9, 12.4, 1.1, 8, [0, terraceY + baseHeight + 0.85, 0]);
  const drumY = terraceY + baseHeight + 1.95;

  // Drum: a cored wall with lancet recesses inside a ring of columns.
  const drumHeight = 14;
  polygonPrism(b, IVORY, 7.8, 7.8, drumHeight, 24, [0, drumY, 0], 0.78);
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8;
    b.extrude(DARK, archedSlab(1.8, 9.1), 0.3, polar(angle, 7.78, drumY + 1.5), facing(angle), 1, 14);
  }
  for (let i = 0; i < 14; i++) {
    column(b, IVORY, polar((i / 14) * TAU, 10.6, drumY + 0.3), drumHeight - 0.3, 0.62);
  }
  polygonPrism(b, IVORY, 11.6, 11.6, 2.1, 28, [0, drumY + drumHeight, 0]);
  polygonPrism(b, GOLD, 11.75, 11.75, 0.3, 28, [0, drumY + drumHeight + 1.3, 0]);
  const deckY = drumY + drumHeight + 2.1;

  // Deck: a disc pushed off the axis toward the view, carried on a skirt and corbels.
  const deckRadius = 19;
  const deck = polar(-60 * DEG, 5.5, deckY);
  const stairwellCentre = 0.5 * DEG;
  polygonPrism(b, IVORY, 12.2, 11.6, 3.6, 28, [0, deckY - 3.6, 0], 0.88);
  const slab = new THREE.Shape();
  slab.absarc(0, 0, deckRadius, 0, TAU, false);
  const stairwell = new THREE.Path();
  stairwell.absarc(0, 0, 15.9, stairwellCentre - 6.5 * DEG, stairwellCentre + 6.5 * DEG, false);
  stairwell.absarc(0, 0, 12.6, stairwellCentre + 6.5 * DEG, stairwellCentre - 6.5 * DEG, true);
  stairwell.closePath();
  slab.holes.push(stairwell);
  b.extrude(IVORY, slab, 1.6, [deck[0], deckY + 0.8, deck[2]], [Math.PI / 2, 0, 0], 1, 48);
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * TAU;
    if (i === 1 || i === 2) continue; // the stairwell opens here
    b.box(IVORY, 4.6, 0.7, 0.7, [deck[0] + Math.cos(angle) * 16.6, deckY - 0.5, deck[2] + Math.sin(angle) * 16.6], [0, -angle, 0.32], 0.9);
  }
  polygonPrism(b, IVORY, deckRadius + 0.35, deckRadius + 0.1, 0.45, 48, [deck[0], deckY + 1.15, deck[2]], 0.96);
  const rim = arcPoints(deckRadius - 0.45, 0, TAU, deckY + 1.6, 2.4).map(
    ([x, y, z]): V3 => [x + deck[0], y, z + deck[2]],
  );
  balustrade(b, rim, { shade: 0.98 });

  // Gallery around the shaft, open to the sky, and the open balcony carrying the sighting instruments.
  const galleryHeight = 10;
  for (let i = 0; i < 10; i++) {
    const base = polar((i / 10) * TAU + 18 * DEG, 15, deckY + 1.6);
    column(b, IVORY, [base[0] + deck[0], base[1], base[2] + deck[2]], galleryHeight, 0.52);
  }
  ringBand(b, IVORY, 14.2, 16.2, 1.7, [deck[0], deckY + 1.6 + galleryHeight, deck[2]], 1, 48);
  ringBand(b, GOLD, 15.0, 16.35, 0.18, [deck[0], deckY + 1.6 + galleryHeight + 1.7, deck[2]], 1, 48);
  for (const side of [-1, 1]) {
    const instrument = polar(-60 * DEG + side * 28 * DEG, 17, deckY + 1.6);
    sight(b, [instrument[0] + deck[0], instrument[1], instrument[2] + deck[2]], 0.5 + side * 0.2, 0.4 * side);
  }

  // Shaft: a tall octagon with lancet windows in gold frames.
  const shaftY = deckY + 1.6;
  const shaftHeight = 40;
  polygonPrism(b, IVORY, 5.4, 5.4, shaftHeight, 8, [0, shaftY, 0]);
  for (let i = 0; i < 8; i++) {
    const face = (i * Math.PI) / 4;
    const corner = face + Math.PI / 8;
    b.box(IVORY, 0.8, shaftHeight, 0.8, polar(corner, 5.25, shaftY + shaftHeight / 2), facing(corner));
    const window = polar(face, 5.3, shaftY + 8);
    b.extrude(DARK, archedSlab(2.0, 16), 0.3, window, facing(face), 1, 14);
    for (const side of [-1, 1]) {
      b.box(GOLD, 0.16, 15, 0.16, [window[0] + Math.sin(face) * side * 1.08, shaftY + 15.5, window[2] - Math.cos(face) * side * 1.08], facing(face));
    }
    b.place(GOLD, new THREE.TorusGeometry(1.08, 0.09, 6, 16, Math.PI), [window[0], shaftY + 23, window[2]], facing(face));
  }
  for (const height of [25, 35.5]) polygonPrism(b, GOLD, 5.62, 5.62, 0.4, 8, [0, shaftY + height, 0]);
  polygonPrism(b, IVORY, 6.3, 5.5, 1.2, 8, [0, shaftY + shaftHeight - 1.2, 0]);

  // Crown: a flaring bell ringed by pinnacles, closed by a cap that carries the mast.
  const crownY = shaftY + shaftHeight;
  b.lathe(
    IVORY,
    [[5.4, 0], [6.3, 0.8], [8.4, 3.4], [9.0, 5.4], [8.6, 7.0], [6.8, 9.0], [4.6, 11.0], [3.2, 12.6], [2.4, 14.0]],
    32,
    [0, crownY, 0],
  );
  ringBand(b, GOLD, 8.85, 9.35, 0.5, [0, crownY + 5.15, 0], 1, 40);
  for (let i = 0; i < 8; i++) {
    const base = polar((i * Math.PI) / 4 + Math.PI / 8, 8.2, crownY + 4.6);
    b.column(IVORY, 0.3, 0.55, 2.2, 6, base);
    b.cone(IVORY, 0.5, 3.6, 6, [base[0], base[1] + 2.2, base[2]], [0, Math.PI / 8, 0]);
    b.sphere(GOLD, 0.26, [base[0], base[1] + 6.0, base[2]]);
  }
  polygonPrism(b, IVORY, 2.6, 3.0, 1.2, 12, [0, crownY + 14.0, 0]);
  const mastBaseY = crownY + 16.2;
  b.sphere(GOLD, 1.15, [0, mastBaseY, 0]);
  b.cone(GOLD, 0.75, 24, 12, [0, mastBaseY, 0]);

  // Needle spire standing apart, joined to the deck by a short stone link.
  const needleAngle = 75 * DEG;
  const needle = polar(needleAngle, 20, terraceY);
  b.within(at(needle[0], needle[1], needle[2]), () => {
    b.box(IVORY, 6, 3.6, 6, [0, 1.8, 0], [0, Math.PI / 8, 0]);
    polygonPrism(b, IVORY, 3.0, 3.0, 7.5, 8, [0, 3.6, 0], 1, Math.PI / 8);
    polygonPrism(b, IVORY, 2.0, 2.5, 38, 8, [0, 11.1, 0], 1, Math.PI / 8);
    for (const face of [0, 1, 2, 3]) {
      const angle = Math.PI / 8 + (face * Math.PI) / 4;
      b.extrude(DARK, archedSlab(0.9, 12), 0.25, polar(angle, 2.3, 17), facing(angle), 1, 10);
    }
    polygonPrism(b, GOLD, 2.28, 2.28, 0.35, 8, [0, 33, 0], 1, Math.PI / 8);
    polygonPrism(b, IVORY, 2.9, 2.2, 1.0, 8, [0, 49.1, 0], 1, Math.PI / 8);
    b.cone(IVORY, 2.7, 15, 8, [0, 50.1, 0], [0, Math.PI / 8, 0]);
    b.cone(GOLD, 0.45, 4.5, 8, [0, 65.1, 0], [0, Math.PI / 8, 0]);
  });
  const towardDeck = new THREE.Vector2(deck[0] - needle[0], deck[2] - needle[2]).normalize();
  const linkFrom = new THREE.Vector2(needle[0], needle[2]).addScaledVector(towardDeck, 2.2);
  const linkTo = new THREE.Vector2(deck[0], deck[2]).addScaledVector(towardDeck, -19.2);
  const link = linkFrom.clone().add(linkTo).multiplyScalar(0.5);
  b.box(IVORY, linkFrom.distanceTo(linkTo) + 0.6, 0.5, 2.2, [link.x, deckY + 1.35, link.y], [0, Math.atan2(-towardDeck.y, towardDeck.x), 0]);

  // Round chapel with a dome, set against the base on the other side.
  const chapel = polar(-105 * DEG, 17.5, terraceY);
  b.within(at(chapel[0], chapel[1], chapel[2]), () => {
    polygonPrism(b, IVORY, 7.6, 8.0, 0.7, 16, ORIGIN, 0.94);
    polygonPrism(b, IVORY, 6.2, 6.4, 7.5, 16, [0, 0.7, 0]);
    for (const degrees of [-150, -105, -60, -15]) {
      const angle = degrees * DEG;
      b.extrude(DARK, archedSlab(2.2, 5.2), 0.3, polar(angle, 6.25, 1.3), facing(angle), 1, 12);
    }
    ringBand(b, GOLD, 6.25, 6.75, 0.3, [0, 7.9, 0], 1, 32);
    dome(b, IVORY, 6.5, [0, 8.2, 0]);
    finial(b, [0, 14.6, 0], 1.1);
  });

  // Ramp: one continuous flight from the terrace, 1.18 turns around base and drum, surfacing through
  // the stairwell at deck level. Thin props carry the lower flight where it leaves the base.
  const rampRadius = 14.3;
  const rampSweep = 425 * DEG;
  const rampTop = deckY + 1.6;
  const rampPoint = (t: number, side: number, lift: number): V3 => {
    const angle = -420 * DEG + rampSweep * t;
    return polar(angle, rampRadius + side, terraceY + (rampTop - terraceY) * t + lift);
  };
  const steps = 88;
  for (let i = 0; i < steps; i++) {
    const from = rampPoint(i / steps, 0, 0);
    const to = rampPoint((i + 1) / steps, 0, 0);
    const dx = to[0] - from[0];
    const dz = to[2] - from[2];
    const run = Math.hypot(dx, dz);
    const rot: V3 = [0, Math.atan2(-dz, dx), Math.atan2(to[1] - from[1], run)];
    const middle: V3 = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 - 0.18, (from[2] + to[2]) / 2];
    b.box(IVORY, run * 1.06, 0.36, 2.5, middle, rot, 0.95);
    const railFrom = rampPoint(i / steps, 1.15, 1.0);
    const railTo = rampPoint((i + 1) / steps, 1.15, 1.0);
    b.box(IVORY, run * 1.06, 0.12, 0.16, [(railFrom[0] + railTo[0]) / 2, (railFrom[1] + railTo[1]) / 2, (railFrom[2] + railTo[2]) / 2], rot);
    if (i % 2 === 0) {
      const foot = rampPoint(i / steps, 1.15, 0);
      b.column(IVORY, 0.06, 0.08, 1.0, 5, foot);
      if (i > 0 && from[1] < terraceY + 13) {
        const prop = rampPoint(i / steps, 1.0, 0);
        b.column(IVORY, 0.14, 0.2, from[1] - terraceY, 6, [prop[0], terraceY, prop[2]]);
      }
    }
  }

  return { mastBaseY };
}

/** Free-standing colonnade on an arc around the island centre, with its far end broken off. */
export function buildStoa(
  b: GeometryBuilder,
  radius: number,
  start: number,
  end: number,
  count: number,
  ground: (x: number, z: number) => number,
): void {
  const points: V3[] = [];
  for (let i = 0; i < count; i++) {
    const [x, , z] = polar(start + ((end - start) * i) / (count - 1), radius, 0);
    const y = ground(x, z);
    const ruined = i === count - 2 ? 0.55 : i === count - 1 ? 0.3 : 0;
    column(b, IVORY, [x, y, z], 8.5, 0.62, 1, ruined);
    points.push([x, y, z]);
  }
  // The architrave survives in two runs; a bay has fallen out between them.
  architrave(b, IVORY, points.slice(0, 3), 8.5, 1.5, 2.6);
  architrave(b, IVORY, points.slice(3, count - 2), 8.5, 1.5, 2.6);
  architrave(b, GOLD, points.slice(0, 3), 10.02, 0.12, 0.5);
}

export interface PavilionOptions {
  columns?: number;
  height?: number;
  roof?: 'dome' | 'cone' | 'none';
  /** Columns that have fallen. The entablature above them is gone with them. */
  fallen?: readonly number[];
}

/** Round pavilion: columns on a stepped plinth under an entablature and a roof. */
export function buildPavilion(b: GeometryBuilder, position: V3, radius: number, options: PavilionOptions = {}): void {
  const columns = options.columns ?? 6;
  const height = options.height ?? 6;
  const fallen = new Set(options.fallen ?? []);
  const step = TAU / columns;
  b.within(at(...position), () => {
    polygonPrism(b, IVORY, radius * 1.16, radius * 1.3, 0.7, columns * 2, ORIGIN, 0.93);
    for (let i = 0; i < columns; i++) {
      if (!fallen.has(i)) column(b, IVORY, polar(i * step, radius, 0.7), height, 0.36);
    }
    // Entablature over each run of bays whose two columns both stand.
    let open = -1;
    for (let i = 0; i <= columns; i++) {
      const standing = i < columns && !fallen.has(i) && !fallen.has((i + 1) % columns);
      if (standing && open < 0) open = i;
      if (!standing && open >= 0) {
        const bays = i - open;
        ringBand(b, IVORY, radius * 0.82, radius * 1.2, 0.9, [0, 0.7 + height, 0], 1, bays * 6, (open + bays / 2) * step, bays * step);
        open = -1;
      }
    }
    if (options.roof !== 'none' && fallen.size === 0) {
      const roofY = 0.7 + height + 0.9;
      ringBand(b, GOLD, radius * 1.1, radius * 1.24, 0.16, [0, roofY, 0], 1, 32);
      if (options.roof === 'dome') {
        dome(b, ROOF, radius * 1.12, [0, roofY, 0]);
        finial(b, [0, roofY + radius * 1.12, 0], radius / 6);
      } else {
        b.cone(ROOF, radius * 1.3, radius * 0.95, columns * 2, [0, roofY, 0]);
        finial(b, [0, roofY + radius * 0.95, 0], radius / 6);
      }
    }
  });
}

/** Lookout built out over the cliff: a pier dropping along the rock face, railed on top. */
export function buildBelvedere(b: GeometryBuilder, island: Island, angle: number): void {
  const distance = island.outline(angle) + 0.5;
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;
  b.within(at(x, island.heightAt(x, z), z), () => {
    polygonPrism(b, IVORY, 3.5, 2.6, 13, 8, [0, -13, 0], 0.9);
    polygonPrism(b, IVORY, 4.3, 3.7, 0.7, 8, ORIGIN, 0.97);
    const rim = Array.from({ length: 9 }, (_, i): V3 => polar(Math.PI / 8 + (i * Math.PI) / 4, 3.95, 0.7));
    balustrade(b, rim, { shade: 0.98 });
    sight(b, ORIGIN, 0.45, angle, 1);
  });
}

/** Hexagonal tower broken off short, one wall standing higher than the rest, rubble at its foot. */
export function buildRuinedTower(b: GeometryBuilder, position: V3, radius: number, height: number, random: () => number): void {
  b.within(at(...position), () => {
    polygonPrism(b, IVORY, radius * 1.22, radius * 1.34, 1.0, 6, ORIGIN, 0.94);
    const standing = height * 0.62;
    arcade(b, { y: 1, height: standing, radius, sides: 6, opening: radius * 0.62, spring: height * 0.36, depth: 1.0, faces: [0, 1, 2, 4, 5] });
    polygonPrism(b, DARK, radius * 0.86, radius * 0.86, standing, 6, [0, 1, 0]);
    const wall = height * 0.95;
    b.box(IVORY, radius * 0.9, wall, 1.1, polar(Math.PI, radius * 0.82, 1 + wall / 2), facing(Math.PI), 0.96);
    for (let i = 0; i < 6; i++) {
      const z = (i - 2.5) * radius * 0.16;
      b.place(IVORY, new THREE.ConeGeometry(0.6, 1.4 + random(), 5), [-radius * 0.82, 1 + wall + 0.3, z], [random(), random(), random()], 0.9);
    }
    for (let i = 0; i < 12; i++) {
      const spot = polar(random() * TAU, radius * (1.3 + random() * 0.9), 0.35);
      b.place(IVORY, new THREE.DodecahedronGeometry(0.45 + random() * 0.75, 0), spot, [random() * 3, random() * 3, random() * 3], 0.92);
    }
  });
}

/** Slender square shaft with a gold point. */
export function buildObelisk(b: GeometryBuilder, position: V3, height: number): void {
  b.within(at(...position), () => {
    polygonPrism(b, IVORY, 1.9, 2.2, 1.2, 8, ORIGIN, 0.94);
    polygonPrism(b, IVORY, 0.55, 1.0, height, 4, [0, 1.2, 0], 1, Math.PI / 4);
    b.cone(GOLD, 0.8, 1.8, 4, [0, 1.2 + height, 0]);
  });
}

/** Ring of standing stones, some toppled, around a gold armillary. */
export function buildStoneCircle(b: GeometryBuilder, position: V3, radius: number): void {
  b.within(at(...position), () => {
    polygonPrism(b, STONE, radius * 1.25, radius * 1.35, 0.4, 24, ORIGIN, 0.95);
    const stones = 9;
    for (let i = 0; i < stones; i++) {
      const angle = (i / stones) * TAU;
      const base = polar(angle, radius, 0.4);
      if (i % 4 === 3) {
        b.box(STONE, 1.1, 1.3, 0.7, [base[0], 0.4 + 0.65, base[2]], [0, Math.PI / 2 - angle, 0.14], 0.9);
        continue;
      }
      b.box(STONE, 1.1, 4.6, 0.7, [base[0], 0.4 + 2.3, base[2]], facing(angle));
      if ((i + 1) % 4 !== 3) {
        const link = polar(angle + Math.PI / stones, radius, 0.4 + 4.6 + 0.3);
        b.box(STONE, 2 * radius * Math.sin(Math.PI / stones) + 0.5, 0.6, 0.8, link, facing(angle + Math.PI / stones), 0.95);
      }
    }
    polygonPrism(b, STONE, 1.2, 1.5, 1.4, 8, ORIGIN, 0.95);
    sight(b, [0, 1.4, 0], 0.5, 0.8, 1.5);
  });
}

/** Column drums lying where they rolled off a ruin. */
export function buildFallenDrums(b: GeometryBuilder, position: V3, count: number, random: () => number): void {
  b.within(at(...position), () => {
    for (let i = 0; i < count; i++) {
      const spot = polar(random() * TAU, random() * 4, 0.56);
      b.column(IVORY, 0.55, 0.58, 2.2 + random() * 1.2, 12, spot, [0, random() * Math.PI, Math.PI / 2], 0.95);
    }
  });
}

/** Paved path along a polyline, with slabs missing and the rest settled out of true. */
export function buildWalkway(b: GeometryBuilder, points: V3[], width: number, random: () => number): void {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0, z0] = points[i];
    const [x1, y1, z1] = points[i + 1];
    const dx = x1 - x0;
    const dz = z1 - z0;
    const run = Math.hypot(dx, dz);
    const slabs = Math.max(1, Math.round(run / 2.6));
    const yaw = Math.atan2(-dz, dx);
    const slope = Math.atan2(y1 - y0, run);
    for (let k = 0; k < slabs; k++) {
      if (random() < 0.22) continue;
      const t = (k + 0.5) / slabs;
      b.box(
        STONE,
        (run / slabs) * 0.94,
        0.35,
        width,
        [x0 + dx * t, y0 + (y1 - y0) * t - 0.12 - random() * 0.18, z0 + dz * t],
        [random() * 0.06, yaw, slope + random() * 0.08],
        0.92 + random() * 0.08,
      );
    }
  }
}
