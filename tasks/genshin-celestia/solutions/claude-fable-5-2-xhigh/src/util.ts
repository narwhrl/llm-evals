import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/** Deterministic PRNG (mulberry32) so every load builds the same Celestia. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash3(x: number, y: number, z: number): number {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const fade = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Value noise in [0, 1]. */
function noise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const u = fade(x - xi), v = fade(y - yi), w = fade(z - zi);
  const c = (dx: number, dy: number, dz: number) => hash3(xi + dx, yi + dy, zi + dz);
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), u), lerp(c(0, 1, 0), c(1, 1, 0), u), v),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), u), lerp(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  );
}

/** Fractal noise in roughly [0, 1]. */
export function fbm(x: number, y: number, z: number, octaves = 4): number {
  let sum = 0, amp = 0.5, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise3(x, y, z);
    norm += amp;
    amp *= 0.5;
    x = x * 2.03 + 17.1; y = y * 2.03 + 5.7; z = z * 2.03 + 11.3;
  }
  return sum / norm;
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (a: number, b: number, v: number) => fade(clamp01((v - a) / (b - a)));

/** GLSL value noise shared by the sky, cloud, water and land shaders. */
export const GLSL_NOISE = /* glsl */ `
float hash21(vec2 p) {
  // Integer hash: stays crisp at the huge coordinates of the cloud sea, where fract() tricks band.
  uvec2 q = uvec2(ivec2(p)) * uvec2(1597334673u, 3812015801u);
  uint n = (q.x ^ q.y) * 1597334673u;
  return float(n) * (1.0 / 4294967295.0);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    s += a * vnoise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p + 7.3;
    a *= 0.5;
  }
  return s;
}
`;

/**
 * Collects transformed pieces per material so a whole building compiles into one mesh each.
 * Pieces are stored non-indexed with position/normal (and optional color) only.
 */
export class Kit {
  private parts = new Map<string, THREE.BufferGeometry[]>();

  add(key: string, geo: THREE.BufferGeometry, m?: THREE.Matrix4): this {
    const g = geo.index ? geo.toNonIndexed() : geo.clone();
    for (const name of Object.keys(g.attributes)) {
      if (name !== "position" && name !== "normal") g.deleteAttribute(name);
    }
    if (m) g.applyMatrix4(m);
    let list = this.parts.get(key);
    if (!list) this.parts.set(key, (list = []));
    list.push(g);
    return this;
  }

  /** Copies every piece of another kit through a transform. */
  addKit(other: Kit, m: THREE.Matrix4): this {
    for (const [key, list] of other.parts) for (const g of list) this.add(key, g, m);
    return this;
  }

  geometry(key: string): THREE.BufferGeometry | null {
    const list = this.parts.get(key);
    return list?.length ? mergeGeometries(list) : null;
  }

  keys(): string[] {
    return [...this.parts.keys()];
  }
}

/** Translation · rotationY · scale, the only transform most pieces need. */
export function trs(x: number, y: number, z: number, ry = 0, s: number | [number, number, number] = 1): THREE.Matrix4 {
  const sc = typeof s === "number" ? new THREE.Vector3(s, s, s) : new THREE.Vector3(...s);
  return new THREE.Matrix4().compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry),
    sc,
  );
}
