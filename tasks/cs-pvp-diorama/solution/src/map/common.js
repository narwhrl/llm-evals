import * as THREE from 'three';
import { rand, range } from '../core/rng.js';
import { decal } from '../props/basic.js';

// Shared architectural helpers. Map scale: 1 unit = 1 m of the 64 m diorama (~1:64 of a real map).

export const FACES = { '+z': 0, '-z': Math.PI, '+x': Math.PI / 2, '-x': -Math.PI / 2 };

// Wall along x (z fixed) or z (x fixed) with rectangular openings [from, to, bottom, top].
export function wallX(k, key, x0, x1, z, y0, y1, t, holes = [], tint = 0xffffff) {
  cutWall(k, key, x0, x1, y0, y1, holes, (a, b, c, d) => k.span(key, a, c, z - t / 2, b, d, z + t / 2, { tint }));
}

export function wallZ(k, key, z0, z1, x, y0, y1, t, holes = [], tint = 0xffffff) {
  cutWall(k, key, z0, z1, y0, y1, holes, (a, b, c, d) => k.span(key, x - t / 2, c, a, x + t / 2, d, b, { tint }));
}

function cutWall(k, key, s0, s1, y0, y1, holes, emit) {
  const hs = [...holes].sort((a, b) => a[0] - b[0]);
  let s = s0;
  for (const [h0, h1, hb, ht] of hs) {
    if (h0 > s) emit(s, h0, y0, y1);
    if (hb > y0) emit(h0, h1, y0, hb);
    if (ht < y1) emit(h0, h1, ht, y1);
    s = h1;
  }
  if (s < s1) emit(s, s1, y0, y1);
}

// Extruded side profile: pts are [along local +z, up]; width is centred on local x.
export function prism(k, key, x, y, z, rot, width, pts, opts = {}) {
  const s = new THREE.Shape(pts.map(([a, b]) => new THREE.Vector2(a, b)));
  const g = new THREE.ExtrudeGeometry(s, { depth: width, bevelEnabled: false });
  g.rotateY(-Math.PI / 2);
  g.translate(width / 2, 0, 0);
  k.push([x, y, z], rot);
  k.geo(key, g, [0, 0, 0], opts);
  k.pop();
}

// Ramp rising from 0 at local z=0 to `rise` at z=len.
export function wedge(k, key, x, y, z, rot, width, len, rise, opts = {}) {
  prism(k, key, x, y, z, rot, width, [[0, 0], [len, 0], [len, rise]], opts);
}

// Window with frame, streaked glass and either lit interior backing, boards, or nothing behind.
export function windowOn(k, face, cx, cy, cz, w, h, { lit, boards = false, frame = 'darkMetal', depth = 0.12 } = {}) {
  k.push([cx, cy, cz], FACES[face]);
  const t = 0.07;
  k.box(frame, [0, -h / 2 - t, depth], [w + t * 2, t, 0.1]);
  k.box(frame, [0, h / 2, depth], [w + t * 2, t, 0.1]);
  for (const s of [-1, 1]) k.box(frame, [s * (w / 2 + t / 2), -h / 2, depth], [t, h, 0.1]);
  k.box(frame, [0, -h / 2, depth], [0.04, h, 0.06]);
  k.box('glass', [0, -h / 2, depth - 0.02], [w, h, 0.02]);
  if (boards) {
    for (let i = 0; i < 3; i++) {
      k.box('wood', [range(-0.1, 0.1), -h / 2 + h * (0.2 + i * 0.3), depth + 0.07], [w + 0.3, 0.2, 0.04], { rot: [0, 0, range(-0.25, 0.25)] });
    }
  }
  // behind the glass: inside the opening for cut walls, just proud of the surface for solid ones (depth >= 0.07)
  if (lit) k.box(lit, [0, -h / 2, depth - 0.05], [w, h, 0.01]);
  k.pop();
}

// Water-streak sheet in front of a wall face (world rect, facing `face`).
export function wetWall(k, face, cx, y0, cz, w, h) {
  const off = 0.03;
  const [dx, dz] = { '+z': [0, off], '-z': [0, -off], '+x': [off, 0], '-x': [-off, 0] }[face];
  const thin = face.endsWith('z') ? [w, h, 0.005] : [0.005, h, w];
  k.box('wetStreak', [cx + dx, y0, cz + dz], thin);
}

const GRAFFITI = ['tagDust', 'tagGG', 'rushB', 'tSpray', 'bullets', 'bullets'];
export function graffiti(k, face, cx, cy, cz, size, name) {
  const n = name ?? GRAFFITI[Math.floor(rand() * GRAFFITI.length)];
  const off = 0.02;
  const [dx, dz] = { '+z': [0, off], '-z': [0, -off], '+x': [off, 0], '-x': [-off, 0] }[face];
  decal(k, n, [cx + dx, cy, cz + dz], size, size, face, { spin: range(-0.1, 0.1) });
}

// Flat roof slab with parapet; registers nothing (callers add solids).
export function flatRoof(k, x0, z0, x1, z1, y, { parapet = 0.5, key = 'concrete', tint = 0xb8b8b2 } = {}) {
  k.span(key, x0, y, z0, x1, y + 0.25, z1, { tint });
  if (parapet > 0) {
    const t = 0.25;
    k.span(key, x0, y, z0, x1, y + parapet + 0.25, z0 + t, { tint });
    k.span(key, x0, y, z1 - t, x1, y + parapet + 0.25, z1, { tint });
    k.span(key, x0, y, z0, x0 + t, y + parapet + 0.25, z1, { tint });
    k.span(key, x1 - t, y, z0, x1, y + parapet + 0.25, z1, { tint });
  }
}
