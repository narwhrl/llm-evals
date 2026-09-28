import * as THREE from 'three';
import { rand, range, pick } from '../core/rng.js';
import { DECAL } from '../textures/decals.js';

// Small tactical cover props. All take a Kit plus a local frame (x, y, z, rotY).

const decalGeos = [];
function decalGeo(cell) {
  if (!decalGeos[cell]) {
    const g = new THREE.PlaneGeometry(1, 1);
    const uv = g.attributes.uv;
    const col = cell % 4;
    const row = Math.floor(cell / 4);
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, (col + uv.getX(i)) / 4, 1 - (row + 1) / 4 + uv.getY(i) / 4);
    }
    decalGeos[cell] = g;
  }
  return decalGeos[cell];
}

const FACE = { '+z': [0, 0], '-z': [0, Math.PI], '+x': [0, Math.PI / 2], '-x': [0, -Math.PI / 2], up: [-Math.PI / 2, 0] };

// Paint/paper decal. face = direction the decal faces; yaw spins floor decals.
export function decal(k, name, pos, w, h = w, face = '+z', { spin = 0, yaw = 0, tint = 0xffffff } = {}) {
  const [rx, ry] = FACE[face];
  k.geo('decal', decalGeo(DECAL[name]), pos, { rot: [rx, ry + yaw, spin], scale: [w, h, 1], tint });
}

export function crate(k, x, y, z, s = 1.1, rot = 0) {
  const l = range(0.8, 1.05);
  const c = new THREE.Color(l, l * range(0.95, 1), l * range(0.9, 1)).getHex();
  k.box('crate', [x, y, z], [s, s, s], { rot: [0, rot, 0], tint: c });
}

// cells: [[i, level, j]] in crate units around (x, z), rotated by rot.
export function crateStack(k, x, y, z, rot, cells, s = 1.1) {
  k.push([x, y, z], rot);
  for (const [i, lv, j] of cells) crate(k, i * s, lv * s, j * s, s, range(-0.08, 0.08));
  k.pop();
}

export function pallet(k, x, y, z, rot = 0) {
  k.push([x, y, z], rot);
  for (const zz of [-0.45, 0, 0.45]) k.box('wood', [0, 0, zz], [1.2, 0.1, 0.1]);
  for (let i = 0; i < 7; i++) k.box('wood', [-0.54 + i * 0.18, 0.1, 0], [0.13, 0.03, 1.0]);
  k.pop();
}

export function barrel(k, x, y, z) {
  k.cyl('barrel', [x, y, z], 0.3, 0.9, { seg: 16, rot: [0, rand() * 6, 0] });
  k.cyl('darkMetal', [x, y + 0.9, z], 0.285, 0.025, { seg: 16 });
  k.cyl('darkMetal', [x + 0.12, y + 0.925, z + 0.05], 0.04, 0.02, { seg: 6 });
}

// The CS classic: four blue drums on a pallet.
export function barrelQuad(k, x, y, z, rot = 0) {
  pallet(k, x, y, z, rot);
  k.push([x, y + 0.13, z], rot);
  for (const [i, j] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) barrel(k, i * 0.31, 0, j * 0.31);
  k.pop();
}

export function cardboardPile(k, x, y, z, rot = 0, n = 6) {
  k.push([x, y, z], rot);
  let h = 0;
  for (let i = 0; i < n; i++) {
    const w = range(0.4, 0.8);
    const d = range(0.35, 0.6);
    const bh = range(0.3, 0.55);
    const onTop = i > 1 && rand() < 0.5;
    const px = onTop ? range(-0.2, 0.2) : range(-0.7, 0.7);
    const pz = onTop ? range(-0.2, 0.2) : range(-0.5, 0.5);
    const py = onTop ? h : 0;
    // soaked boxes sag and lean
    k.box('cardboard', [px, py, pz], [w, bh * range(0.7, 1), d], { rot: [range(-0.08, 0.08), rand() * 3, range(-0.12, 0.12)] });
    if (!onTop) h = Math.max(h, bh * 0.85);
  }
  k.pop();
}

const TIRE = new THREE.TorusGeometry(0.34, 0.13, 8, 18);
export function tireStack(k, x, y, z, n = 3) {
  for (let i = 0; i < n; i++) {
    k.geo('tire', TIRE, [x + range(-0.06, 0.06), y + 0.13 + i * 0.25, z + range(-0.06, 0.06)], { rot: [Math.PI / 2, 0, range(-0.06, 0.06)] });
  }
}

export function looseTire(k, x, y, z, rot) {
  k.geo('tire', TIRE, [x, y + 0.34, z], { rot: [0.3, rot, 0.25] });
}

const SANDBAG = new THREE.SphereGeometry(0.5, 9, 6);
export function sandbags(k, x, y, z, rot, len, rows = 3) {
  k.push([x, y, z], rot);
  const n = Math.max(1, Math.round(len / 0.58));
  for (let r = 0; r < rows; r++) {
    for (let i = 0; i < n - (r % 2); i++) {
      const px = -len / 2 + 0.29 + i * 0.58 + (r % 2) * 0.29;
      const l = range(0.85, 1.05);
      k.geo('burlap', SANDBAG, [px, 0.1 + r * 0.19, range(-0.03, 0.03)], {
        rot: [0, range(-0.1, 0.1), 0], scale: [0.62, 0.22, 0.36], tint: new THREE.Color(l, l, l * 0.95).getHex(),
      });
    }
  }
  k.pop();
}

function profile(points, depth) {
  const s = new THREE.Shape(points.map(([a, b]) => new THREE.Vector2(a, b)));
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false });
  g.translate(0, 0, -depth / 2);
  return g;
}

const JERSEY = profile([[-0.3, 0], [0.3, 0], [0.3, 0.08], [0.12, 0.32], [0.09, 0.82], [-0.09, 0.82], [-0.12, 0.32], [-0.3, 0.08]], 2.4);
// Concrete jersey divider running along local z.
export function jersey(k, x, y, z, rot = 0) {
  k.geo('concrete', JERSEY, [x, y, z], { rot: [0, rot, 0], tint: 0xd8d8d4 });
}

const WATER_BARRIER = profile([[-0.26, 0], [0.26, 0], [0.2, 0.2], [0.13, 0.85], [-0.13, 0.85], [-0.2, 0.2]], 1.2);
// Plastic road barrier with red/white hazard stripes.
export function plasticBarrier(k, x, y, z, rot = 0) {
  k.geo('hazard', WATER_BARRIER, [x, y, z], { rot: [0, rot, 0] });
}

export function concreteBlock(k, x, y, z, rot = 0) {
  k.push([x, y, z], rot);
  k.box('concrete', [0, 0, 0], [0.62, 0.66, 0.62], { tint: 0xcfcfc8 });
  k.box('concrete', [0, 0.66, 0], [0.5, 0.08, 0.5], { tint: 0xbdbdb6 });
  k.box('hazard', [0, 0.42, 0], [0.64, 0.12, 0.64]);
  k.pop();
}

// Steel cheval-de-frise barricade: a beam carried on crossed legs.
export function hedgehog(k, x, y, z, rot = 0, len = 3) {
  k.push([x, y, z], rot);
  k.box('hazard', [0, 0.55, 0], [len, 0.14, 0.14]);
  const legs = Math.max(2, Math.round(len / 0.9));
  for (let i = 0; i < legs; i++) {
    const px = -len / 2 + 0.2 + (i * (len - 0.4)) / (legs - 1);
    k.rod('darkMetal', [px, 0, -0.55], [px, 1.05, 0.5], 0.035);
    k.rod('darkMetal', [px, 0, 0.55], [px, 1.05, -0.5], 0.035);
  }
  k.pop();
}

export function riotShield(k, x, y, z, rot, lean = 0.22) {
  k.push([x, y, z], rot);
  k.box('paint', [0, 0, 0], [0.62, 1.05, 0.05], { rot: [-lean, 0, 0], tint: 0x283444 });
  k.box('paint', [0, 0.62, -0.02], [0.4, 0.2, 0.03], { rot: [-lean, 0, 0], tint: 0x6a7a8a });
  k.pop();
}

export function trashBin(k, x, y, z, rot = 0, tint = 0x3d6645) {
  k.push([x, y, z], rot);
  k.box('paint', [0, 0.12, 0], [1.4, 1.0, 0.9], { tint });
  k.box('paint', [0, 1.12, -0.05], [1.46, 0.07, 1.0], { rot: [-0.22, 0, 0], tint: 0x2c4a32 });
  for (const wx of [-0.55, 0.55]) for (const wz of [-0.35, 0.35]) k.cyl('tire', [wx, 0, wz], 0.1, 0.12, { rot: [0, 0, Math.PI / 2], seg: 8 });
  k.pop();
}

export function acUnit(k, x, y, z, rot = 0) {
  k.push([x, y, z], rot);
  k.box('paint', [0, 0, 0], [0.95, 0.72, 0.42], { tint: 0xb9bcb8 });
  k.cyl('darkMetal', [0.12, 0.36, 0.21], 0.26, 0.02, { rot: [Math.PI / 2, 0, 0], seg: 16 });
  for (let i = 0; i < 4; i++) k.box('darkMetal', [0.12, 0.14 + i * 0.13, 0.225], [0.52, 0.02, 0.01]);
  k.box('darkMetal', [0, -0.08, 0], [0.9, 0.08, 0.36]);
  k.pop();
}

export function newspaperScatter(k, x, y, z, n = 3, spread = 1.2) {
  for (let i = 0; i < n; i++) {
    decal(k, pick(['newspaper', 'newspaper', 'roster']), [x + range(-spread, spread), y + 0.015, z + range(-spread, spread)], range(0.45, 0.7), undefined, 'up', { yaw: rand() * 6 });
  }
}

// Packing straps lying on the floor as thin bands.
export function straps(k, x, y, z, n = 4) {
  for (let i = 0; i < n; i++) {
    k.box('paint', [x + range(-1, 1), y, z + range(-1, 1)], [range(0.8, 1.6), 0.01, 0.03], { rot: [0, rand() * 3, 0], tint: pick([0x2a5caa, 0xd8d8d0, 0xc84a2a]) });
  }
}
