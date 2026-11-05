import * as THREE from 'three';
import { fbm3, noise3, rng } from './noise';

export interface IslandSpec {
  radius: number;
  depth: number;
  seed: number;
  /** Angular / vertical resolution of the rock body. */
  seg?: number;
  rings?: number;
  /** Height of the gentle hills on top. */
  hills?: number;
  /** Optional mask that lowers colour to paving (0..1) for given local x, z. */
  paving?: (x: number, z: number) => number;
}

export interface Island {
  body: THREE.BufferGeometry;
  top: THREE.BufferGeometry;
  /** Local top surface height (y) at x, z. */
  topY: (x: number, z: number) => number;
  /** Approximate rim radius at angle a. */
  rimR: (a: number) => number;
  spec: IslandSpec;
}

const C = (hex: string) => new THREE.Color(hex);
const STONE_TOP = C('#d3c5ae');
const STONE = C('#aea496');
const STONE_DARK = C('#7b7d8c');
const STONE_COOL = C('#8c95ae');
const SOIL = C('#8c6c4c');
const MOSS = C('#6f9a45');
const GRASS = C('#7dbb4b');
const GRASS_LIGHT = C('#a9d25e');
const GRASS_DARK = C('#5a9a3d');
const PAVING = C('#e9e1cf');

/** Floating island: irregular grassy plateau over a long, craggy inverted cone. */
export function makeIsland(spec: IslandSpec): Island {
  const { radius, depth, seed } = spec;
  const seg = spec.seg ?? 128;
  const rings = spec.rings ?? 64;
  const hills = spec.hills ?? radius * 0.03;
  const rand = rng(seed);
  const sx = rand() * 100, sz = rand() * 100;

  const rimR = (a: number) => {
    const c = Math.cos(a), s = Math.sin(a);
    return radius * (1 + 0.17 * fbm3(c * 1.3 + sx, s * 1.3 + sz, seed * 0.37, 3) + 0.06 * noise3(c * 4 + sz, s * 4, seed * 0.71));
  };
  // Profile: slight lip, steep cliff, then a long tapering keel.
  const profile = (t: number) => Math.pow(1 - t, 1.2) * (1 + 0.45 * Math.sin(Math.PI * Math.min(t * 1.6, 1)) * (1 - t));
  const yAt = (t: number) => -depth * t * (1 + 0.05 * Math.sin(t * 9 + seed));

  const pos: number[] = [];
  const colors: number[] = [];
  const rimPts: THREE.Vector3[] = [];
  const tmp = new THREE.Color();
  for (let j = 0; j <= rings; j++) {
    const t = Math.pow(j / rings, 1.15);
    for (let i = 0; i <= seg; i++) {
      const a = ((i % seg) / seg) * Math.PI * 2;
      const c = Math.cos(a), s = Math.sin(a);
      let y = yAt(t);
      let r = rimR(a) * profile(t);
      if (j < rings) {
        const local = Math.max(r, radius * 0.08);
        const k = radius / 150;
        // vertical crag fluting
        const ridge = 1 - Math.abs(noise3(c * k + sx, y / 340, s * k + sz));
        // strata ledges
        const lv = y / 55 + noise3(c * 3, s * 3, seed * 0.53) * 1.5;
        const ledge = THREE.MathUtils.smoothstep(lv - Math.floor(lv), 0.6, 0.95);
        const n = fbm3(c * radius / 160 + sx, y / 190, s * radius / 160 + sz, 4);
        const fall = j === 0 ? 0 : Math.min(1, t * 12);
        r += fall * local * (0.2 * n + 0.13 * ridge * ridge - 0.05 * ledge);
        y += fall * radius * 0.05 * noise3(c * 5 + sz, s * 5, t * 6);
      }
      const p = new THREE.Vector3(c * r, y, s * r);
      if (j === 0) rimPts.push(p.clone());
      pos.push(p.x, p.y, p.z);

      const d = -y;
      const nv = noise3(p.x / 70, p.y / 45, p.z / 70);
      if (d < 4) tmp.copy(MOSS);
      else if (d < 22) tmp.copy(SOIL).lerp(MOSS, THREE.MathUtils.smoothstep(nv, 0.1, 0.5));
      else {
        const depthT = THREE.MathUtils.clamp(d / depth, 0, 1);
        tmp.copy(STONE_TOP).lerp(STONE, THREE.MathUtils.smoothstep(depthT, 0.02, 0.25));
        tmp.lerp(STONE_COOL, THREE.MathUtils.smoothstep(depthT, 0.3, 0.9));
        tmp.lerp(STONE_DARK, 0.35 * THREE.MathUtils.smoothstep(nv, 0.0, 0.6));
        // moss drips under the rim
        const drip = THREE.MathUtils.smoothstep(noise3(p.x / 25, 0, p.z / 25), 0.15, 0.5) * (1 - THREE.MathUtils.smoothstep(d, 20, 110));
        tmp.lerp(MOSS, drip * 0.8);
        // pale strata bands
        const bandV = Math.sin(y / 23 + nv * 3);
        tmp.offsetHSL(0, 0, 0.035 * bandV);
      }
      colors.push(tmp.r, tmp.g, tmp.b);
    }
  }
  const idx: number[] = [];
  for (let j = 0; j < rings; j++) {
    for (let i = 0; i < seg; i++) {
      const a = j * (seg + 1) + i, b = a + seg + 1;
      idx.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  const body = new THREE.BufferGeometry();
  body.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  body.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  body.setIndex(idx);
  body.computeVertexNormals();

  // Top plateau: polar grid whose outer ring reuses the rim vertices exactly.
  const topH = (rf: number, a: number) => {
    const c = Math.cos(a), s = Math.sin(a);
    const edge = 1 - THREE.MathUtils.smoothstep(rf, 0.82, 1);
    return edge * (hills * (0.6 * (1 - rf * rf) + fbm3(c * rf * 3 + sx, s * rf * 3 + sz, seed + 7, 3))) + 2.5 * (1 - edge);
  };
  const topRings = Math.round(rings * 0.6);
  const tpos: number[] = [];
  const tcol: number[] = [];
  const tidx: number[] = [];
  tpos.push(0, topH(0, 0), 0);
  for (let k = 1; k <= topRings; k++) {
    const rf = k / topRings;
    for (let i = 0; i <= seg; i++) {
      const a = ((i % seg) / seg) * Math.PI * 2;
      const rim = rimPts[i % seg];
      tpos.push(rim.x * rf, k === topRings ? rim.y : topH(rf, a), rim.z * rf);
    }
  }
  for (let v = 0; v < tpos.length / 3; v++) {
    const x = tpos[v * 3], y = tpos[v * 3 + 1], z = tpos[v * 3 + 2];
    const n = fbm3(x / 90 + sx, y / 90, z / 90 + sz, 3);
    tmp.copy(GRASS).lerp(n > 0 ? GRASS_LIGHT : GRASS_DARK, Math.min(1, Math.abs(n) * 2.2));
    const rf = Math.hypot(x, z) / rimR(Math.atan2(z, x));
    tmp.lerp(MOSS, THREE.MathUtils.smoothstep(rf, 0.9, 1.0) * 0.6);
    if (spec.paving) tmp.lerp(PAVING, spec.paving(x, z));
    tcol.push(tmp.r, tmp.g, tmp.b);
  }
  for (let i = 0; i < seg; i++) tidx.push(0, 1 + i + 1, 1 + i);
  for (let k = 1; k < topRings; k++) {
    for (let i = 0; i < seg; i++) {
      const a = 1 + (k - 1) * (seg + 1) + i, b = a + seg + 1;
      tidx.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  const top = new THREE.BufferGeometry();
  top.setAttribute('position', new THREE.Float32BufferAttribute(tpos, 3));
  top.setAttribute('color', new THREE.Float32BufferAttribute(tcol, 3));
  top.setIndex(tidx);
  top.computeVertexNormals();

  const topY = (x: number, z: number) => {
    const a = Math.atan2(z, x);
    return topH(Math.min(1, Math.hypot(x, z) / rimR(a)), a);
  };
  return { body, top, topY, rimR, spec };
}

/** Small floating rock with a grassy cap; flat-shaded. */
export function makeDebris(seed: number, grassy: boolean): THREE.BufferGeometry {
  const g = new THREE.IcosahedronGeometry(1, 2);
  const p = g.attributes.position as THREE.BufferAttribute;
  const colors: number[] = [];
  const tmp = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = fbm3(x * 1.7 + seed, y * 1.7, z * 1.7 - seed, 3);
    const k = 1 + 0.35 * n;
    x *= k; z *= k; y *= k;
    if (y > 0.25) y = 0.25 + (y - 0.25) * 0.25;
    else y = 0.25 + (y - 0.25) * 1.6;
    p.setXYZ(i, x, y, z);
    if (grassy && y > 0.2) tmp.copy(GRASS).lerp(GRASS_DARK, Math.abs(n));
    else tmp.copy(STONE).lerp(STONE_COOL, THREE.MathUtils.clamp(-y, 0, 1)).offsetHSL(0, 0, n * 0.08);
    colors.push(tmp.r, tmp.g, tmp.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.deleteAttribute('uv');
  g.computeVertexNormals();
  return g;
}
