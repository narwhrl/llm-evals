import * as THREE from "three";
import { clamp01, fbm, rng, smooth } from "./util";

export interface IslandSpec {
  radius: number;
  depth: number;
  seed: number;
  /** Angular / radial resolution. */
  segments: number;
  rings: number;
  /** Height of the rolling hills on top. */
  hills: number;
  /** Radius kept flat around the centre, for a plaza to stand on. */
  plaza?: number;
  /** Number of secondary hanging peaks under the island. */
  spikes: number;
}

export interface Island {
  spec: IslandSpec;
  top: THREE.BufferGeometry;
  bottom: THREE.BufferGeometry;
  /** Outline radius at an angle. */
  rim(theta: number): number;
  /** Surface height at a local position. */
  topY(x: number, z: number): number;
  /** Underside height at a local position (before cliff roughening). */
  underY(x: number, z: number): number;
}

const GRASS = [new THREE.Color(0xb4dd62), new THREE.Color(0x7cc44c), new THREE.Color(0x4c9a42)];
const ROCK = [new THREE.Color(0xdcc6a2), new THREE.Color(0xb39c88), new THREE.Color(0x857f9f)];

/** A floating island: grassy irregular plateau on top, a rugged inverted mountain underneath. */
export function makeIsland(spec: IslandSpec): Island {
  const { radius: R, depth, seed, segments, rings, hills } = spec;
  const plaza = spec.plaza ?? 0;
  const rand = rng(seed);
  const so = seed * 13.7;

  const rim = (theta: number) => {
    const c = Math.cos(theta), s = Math.sin(theta);
    return R * (0.8 + 0.4 * fbm(c * 1.25 + so, so * 0.31, s * 1.25, 3) + 0.2 * (fbm(c * 4 + so, 7.7, s * 4, 2) - 0.5) + 0.07 * (fbm(c * 10 + so, 2.2, s * 10, 2) - 0.5));
  };

  const topY = (x: number, z: number) => {
    const r = Math.hypot(x, z);
    const rr = r / rim(Math.atan2(z, x));
    const flat = plaza ? smooth(plaza, plaza * 1.7, r) : 1;
    const lambda = R * 0.42;
    return hills * (fbm(x / lambda + so, 3.3, z / lambda, 3) - 0.42) * flat - 16 * Math.pow(clamp01(rr), 6);
  };

  // Hanging peaks: one dominant inverted summit and a cluster of smaller ones.
  const peaks = [{ x: R * 0.07, z: -R * 0.05, h: depth * 0.5, w: R * 0.74 }];
  for (let i = 0; i < spec.spikes; i++) {
    const a = rand() * Math.PI * 2, d = R * (0.26 + rand() * 0.42);
    peaks.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, h: depth * (0.16 + rand() * 0.3), w: R * (0.17 + rand() * 0.16) });
  }
  const cliff = Math.min(depth * 0.1, R * 0.22);
  const under = (x: number, z: number, s: number) => {
    let d = cliff * smooth(0, 0.07, s) + depth * 0.4 * Math.pow(s, 0.5);
    for (const p of peaks) d += p.h * Math.pow(Math.max(0, 1 - Math.hypot(x - p.x, z - p.z) / p.w), 1.5) * smooth(0, 0.12, s);
    const lambda = R * 0.2;
    d *= 1 + 0.5 * (fbm(x / lambda, so, z / lambda, 4) - 0.5) * smooth(0, 0.1, s);
    // Terraced strata give the cliffs their chunky, hand-carved read.
    const step = depth / 14;
    return -(d * 0.72 + Math.round(d / step) * step * 0.28);
  };
  const underY = (x: number, z: number) => {
    const r = Math.hypot(x, z);
    return under(x, z, clamp01(1 - r / rim(Math.atan2(z, x))));
  };

  // --- top surface (one extra skirt ring curls the grass over the cliff edge) ---
  const topPos: number[] = [], topCol: number[] = [], color = new THREE.Color();
  const topRings = rings + 1;
  for (let i = 0; i <= topRings; i++) {
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      const edge = rim(theta);
      const skirt = i === topRings;
      const r = skirt ? edge * 1.012 : edge * (i / rings);
      const x = Math.cos(theta) * r, z = Math.sin(theta) * r;
      topPos.push(x, topY(x, z) - (skirt ? 20 : 0), z);
      const n = fbm(x / 110 + so, 1.1, z / 110, 3);
      color.copy(GRASS[1]).lerp(n > 0.5 ? GRASS[0] : GRASS[2], Math.min(1, Math.abs(n - 0.5) * 4.5));
      if (skirt) color.lerp(GRASS[2], 0.5);
      topCol.push(color.r, color.g, color.b);
    }
  }
  const top = gridGeometry(topPos, topCol, topRings, segments, false);

  // --- underside (ring 0 shares the rim, the last ring collapses to the summit) ---
  const botPos: number[] = [], botCol: number[] = [];
  const botRings = Math.round(rings * 1.5);
  for (let i = 0; i <= botRings; i++) {
    const s = Math.pow(i / botRings, 1.25);
    for (let j = 0; j <= segments; j++) {
      const theta = ((j % segments) / segments) * Math.PI * 2;
      const c = Math.cos(theta), sn = Math.sin(theta);
      const r0 = rim(theta) * (1 - s);
      const y = i === 0 ? topY(c * r0, sn * r0) : under(c * r0, sn * r0, s);
      // Push the wall in and out so the silhouette is craggy rather than conical.
      // Buttress-like ridges run down the upper cliff; broader bulges shape the hanging mass.
      const ridge = (fbm(c * 12 + so, y / (depth * 0.4), sn * 12, 2) - 0.5) * 0.13 * smooth(0, 0.03, s);
      const bulge = ridge + (fbm(c * 4.5 + so, y / (depth * 0.16), sn * 4.5, 3) - 0.45) * 0.42 * smooth(0, 0.06, s) * (1 - s);
      const r = r0 * (1 + bulge);
      botPos.push(c * r, y, sn * r);
      const t = clamp01(-y / depth);
      color.copy(ROCK[0]).lerp(ROCK[1], smooth(0, 0.4, t)).lerp(ROCK[2], smooth(0.3, 1, t));
      // Horizontal strata: thin darker beds between broad pale ones.
      color.multiplyScalar(0.8 + 0.3 * fbm(c * 9, y / 46, sn * 9, 2) - 0.1 * smooth(0.62, 0.7, fbm(c * 2, y / 30, sn * 2, 2)));
      if (i === 0) color.copy(GRASS[2]);
      botCol.push(color.r, color.g, color.b);
    }
  }
  const bottom = gridGeometry(botPos, botCol, botRings, segments, true);

  return { spec, top, bottom, rim, topY, underY };
}

/** `faceted` unshares vertices so rock gets flat, chiselled facets. */
function gridGeometry(pos: number[], col: number[], rings: number, segments: number, faceted: boolean): THREE.BufferGeometry {
  const index: number[] = [];
  const row = segments + 1;
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * row + j, b = a + 1, c = a + row, d = c + 1;
      index.push(a, b, c, b, d, c);
    }
  }
  let g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(index);
  if (faceted) g = g.toNonIndexed();
  g.computeVertexNormals();
  return g;
}

/** A small drifting boulder: jagged and pointed underneath; `mossy` ones carry a grass cap. */
export function boulderGeometry(seed: number, mossy: boolean): THREE.BufferGeometry {
  const g = new THREE.IcosahedronGeometry(1, 1);
  const p = g.attributes.position as THREE.BufferAttribute;
  const col: number[] = [], color = new THREE.Color(), v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const k = 0.72 + 0.6 * fbm(v.x * 1.7 + seed, v.y * 1.7, v.z * 1.7, 2);
    v.multiplyScalar(k);
    v.y = v.y > 0 ? v.y * 0.42 : v.y * 1.5;
    p.setXYZ(i, v.x, v.y, v.z);
    if (mossy && v.y > 0.16) color.copy(GRASS[1]);
    else color.copy(ROCK[0]).lerp(ROCK[2], clamp01(-v.y * 0.7));
    col.push(color.r, color.g, color.b);
  }
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.computeVertexNormals();
  return g;
}
