import * as THREE from 'three';
import { box, cyl, plane, torus, sphere } from './kit.js';

/**
 * Reusable props. Each builder writes into the shared static builder so the
 * whole map collapses into a handful of merged meshes.
 */

const rnd = (() => {
  let s = 20240117;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
})();

/** Rotate a local (x,z) offset by `rot` around Y, matching three's convention. */
function off(rot, lx, lz) {
  const c = Math.cos(rot), s = Math.sin(rot);
  return [lx * c + lz * s, -lx * s + lz * c];
}

export function crate(b, x, y, z, s = 1.0, rot = 0, mat = 'wood', detail = true) {
  const w = s * 1.0, h = s * 0.78, d = s * 0.9;
  b.add(box(w, h, d), mat, { pos: [x, y + h / 2, z], rot: [0, rot, 0] });
  if (!detail) return;
  const t = s * 0.07;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const o = off(rot, sx * (w / 2 - t / 2), sz * (d / 2 - t / 2));
      b.add(box(t, h * 0.98, t), 'woodDark', { pos: [x + o[0], y + h / 2, z + o[1]], rot: [0, rot, 0] });
    }
  }
  for (const sz of [-1, 1]) {
    for (const sy of [t * 0.6, h - t * 0.6]) {
      const o = off(rot, 0, sz * (d / 2 - t / 2));
      b.add(box(w * 0.98, t, t), 'woodDark', { pos: [x + o[0], y + sy, z + o[1]], rot: [0, rot, 0] });
    }
  }
}

export function crateStack(b, x, y, z, n = 3, s = 0.9, rot = 0) {
  let cy = y;
  for (let i = 0; i < n; i++) {
    const jitter = (rnd() - 0.5) * 0.12;
    crate(b, x + jitter, cy, z + jitter * 0.6, s, rot + jitter, i % 2 ? 'wood' : 'woodDark');
    cy += s * 0.8;
  }
  return cy;
}

export function drum(b, x, y, z, mat = 'drumBlue', rot = 0, tipped = false) {
  const r = 0.42, h = 1.05;
  if (tipped) {
    b.add(cyl(r, r, h, 16), mat, { pos: [x, y + r, z], rot: [Math.PI / 2, 0, rot] });
    return;
  }
  b.add(cyl(r, r, h, 16), mat, { pos: [x, y + h / 2, z], rot: [0, rot, 0] });
  b.add(cyl(r * 1.04, r * 1.04, 0.07, 16), mat, { pos: [x, y + h * 0.32, z], rot: [0, rot, 0] });
  b.add(cyl(r * 1.04, r * 1.04, 0.07, 16), mat, { pos: [x, y + h * 0.68, z], rot: [0, rot, 0] });
  b.add(cyl(r * 0.96, r * 0.96, 0.05, 16), 'steelDark', { pos: [x, y + h + 0.01, z], rot: [0, rot, 0], outline: false });
}

export function drumStack(b, x, y, z, cols = 2, rows = 2, mat = 'drumBlue') {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      drum(b, x + i * 0.92, y, z + j * 0.92, mat, (rnd() - 0.5) * 0.4);
    }
  }
}

export function pallet(b, x, y, z, rot = 0, s = 1) {
  const w = 1.15 * s, d = 0.95 * s;
  for (let i = 0; i < 3; i++) {
    const o = off(rot, 0, (i - 1) * 0.33 * s);
    b.add(box(w, 0.06 * s, 0.16 * s), 'woodDark', { pos: [x + o[0], y + 0.19 * s, z + o[1]], rot: [0, rot, 0] });
  }
  for (let i = 0; i < 5; i++) {
    const o = off(rot, (i - 2) * 0.24 * s, 0);
    b.add(box(0.17 * s, 0.05 * s, d), 'wood', { pos: [x + o[0], y + 0.245 * s, z + o[1]], rot: [0, rot, 0] });
  }
  for (let i = 0; i < 3; i++) {
    const o = off(rot, (i - 1) * 0.4 * s, 0);
    b.add(box(0.2 * s, 0.13 * s, 0.2 * s), 'woodDark', { pos: [x + o[0], y + 0.09 * s, z + o[1]], rot: [0, rot, 0] });
  }
}

export function tire(b, x, y, z, rot = 0, lying = true) {
  if (lying) b.add(torus(0.42, 0.16, 8, 16), 'tire', { pos: [x, y + 0.16, z], rot: [Math.PI / 2, 0, rot] });
  else b.add(torus(0.42, 0.16, 8, 16), 'tire', { pos: [x, y + 0.42, z], rot: [0, rot, 0] });
}

export function cardboardStack(b, x, y, z, n = 3, rot = 0) {
  let cy = y;
  for (let i = 0; i < n; i++) {
    const w = 0.85 - i * 0.08, h = 0.42, d = 0.72 - i * 0.06;
    b.add(box(w, h, d), 'cardboard', {
      pos: [x + (rnd() - 0.5) * 0.16, cy + h / 2, z + (rnd() - 0.5) * 0.16],
      rot: [0, rot + (rnd() - 0.5) * 0.5, 0],
    });
    cy += h;
  }
  return cy;
}

export function barrier(b, x, y, z, rot = 0) {
  b.add(box(1.9, 0.12, 0.62), 'barrier', { pos: [x, y + 0.06, z], rot: [0, rot, 0] });
  for (const sx of [-1, 1]) {
    const o = off(rot, sx * 0.72, 0);
    b.add(box(0.16, 0.95, 0.16), 'barrierWhite', { pos: [x + o[0], y + 0.55, z + o[1]], rot: [0, rot, 0] });
  }
  b.add(box(1.75, 0.44, 0.1), 'barrierWhite', { pos: [x, y + 0.74, z], rot: [0, rot, 0] });
  b.add(box(1.75, 0.3, 0.09), 'barrier', { pos: [x, y + 0.28, z], rot: [0, rot, 0] });
}

export function jersey(b, x, y, z, rot = 0, len = 2.2) {
  b.add(box(len, 0.28, 0.86), 'concreteDark', { pos: [x, y + 0.14, z], rot: [0, rot, 0] });
  b.add(box(len, 0.42, 0.52), 'concrete', { pos: [x, y + 0.49, z], rot: [0, rot, 0] });
  b.add(box(len, 0.2, 0.3), 'concrete', { pos: [x, y + 0.8, z], rot: [0, rot, 0] });
}

export function sandbags(b, x, y, z, rows = 3, per = 4, rot = 0) {
  let cy = y;
  for (let r = 0; r < rows; r++) {
    const n = per - r;
    for (let i = 0; i < n; i++) {
      const o = off(rot, (i - (n - 1) / 2) * 0.52, 0);
      b.add(sphere(0.32, 8), 'sandbag', {
        pos: [x + o[0], cy + 0.16, z + o[1]],
        rot: [0, rot + (rnd() - 0.5) * 0.4, 0],
        scale: [1, 0.55, 0.8],
      });
    }
    cy += 0.28;
  }
  return cy;
}

export function ladder(b, x, y, z, len = 3.2, rot = 0, tilt = 0.22, mat = 'wood') {
  const dir = off(rot, 0, 1);
  const c = Math.cos(rot), s = Math.sin(rot);
  for (const side of [-1, 1]) {
    const o = off(rot, side * 0.26, 0);
    b.add(box(0.1, len, 0.1), mat, {
      pos: [x + o[0], y + (len / 2) * Math.cos(tilt), z + o[1] + (len / 2) * Math.sin(tilt)],
      rot: [tilt, rot, 0],
    });
  }
  const rungs = Math.max(3, Math.floor(len / 0.34));
  for (let i = 1; i < rungs; i++) {
    const t = (i / rungs) * len;
    b.add(box(0.58, 0.06, 0.06), mat, {
      pos: [x + dir[0] * t * Math.sin(tilt), y + t * Math.cos(tilt) + 0.04, z + dir[1] * t * Math.sin(tilt)],
      rot: [0, rot, 0],
    });
  }
  void c; void s;
}

export function container(b, x, y, z, rot = 0, mat = 'containerRed', len = 6.0, w = 2.44, h = 2.59) {
  b.add(box(len, h, w), mat, { pos: [x, y + h / 2, z], rot: [0, rot, 0] });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      for (const sy of [0.13, h - 0.13]) {
        const o = off(rot, sx * (len / 2 - 0.1), sz * (w / 2 - 0.1));
        b.add(box(0.26, 0.26, 0.26), 'steelDark', { pos: [x + o[0], y + sy, z + o[1]], rot: [0, rot, 0] });
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    const o = off(rot, len / 2 + 0.05, (i - 1.5) * 0.42);
    b.add(cyl(0.05, 0.05, h - 0.3, 8), 'steelDark', { pos: [x + o[0], y + h / 2, z + o[1]] });
  }
}

export function trashBin(b, x, y, z, rot = 0, mat = 'drumGreen', lid = true) {
  b.add(cyl(0.38, 0.34, 0.95, 14), mat, { pos: [x, y + 0.48, z], rot: [0, rot, 0] });
  if (lid) b.add(cyl(0.4, 0.4, 0.07, 14), 'steelDark', { pos: [x, y + 0.98, z], rot: [0, rot, 0] });
}

export function dumpster(b, x, y, z, rot = 0) {
  b.add(box(2.1, 1.0, 1.25), 'drumGreen', { pos: [x, y + 0.55, z], rot: [0, rot, 0] });
  b.add(box(2.2, 0.1, 1.35), 'steelDark', { pos: [x, y + 1.06, z], rot: [0, rot, 0.03] });
  for (const sx of [-1, 1]) {
    const o = off(rot, sx * 0.8, 0);
    b.add(cyl(0.18, 0.18, 0.12, 10), 'tire', {
      pos: [x + o[0], y + 0.18, z + o[1]], rot: [Math.PI / 2, 0, rot],
    });
  }
}

export function acUnit(b, x, y, z, rot = 0) {
  b.add(box(0.95, 0.8, 0.5), 'steel', { pos: [x, y + 0.4, z], rot: [0, rot, 0] });
  b.add(cyl(0.3, 0.3, 0.06, 14), 'steelDark', {
    pos: [x + Math.sin(rot) * 0.28, y + 0.42, z + Math.cos(rot) * 0.28], rot: [Math.PI / 2, 0, rot],
  });
  b.add(box(0.3, 0.3, 0.06), 'steelDark', { pos: [x, y + 0.82, z], rot: [0, rot, 0] });
}

export function signBoard(b, x, y, z, rot = 0, h = 1.7, mat = 'sign') {
  b.add(cyl(0.06, 0.06, h, 8), 'steelDark', { pos: [x, y + h / 2, z] });
  b.add(box(1.15, 0.58, 0.06), mat, { pos: [x, y + h - 0.15, z], rot: [0, rot, 0], outline: false });
}

export function vent(b, x, y, z, rot = 0) {
  b.add(box(0.9, 0.7, 0.55), 'steelDark', { pos: [x, y + 0.35, z], rot: [0, rot, 0] });
  for (let i = 0; i < 4; i++) {
    b.add(box(0.8, 0.05, 0.5), 'steel', { pos: [x, y + 0.12 + i * 0.16, z], rot: [0, rot, 0.25] });
  }
}

export function shelf(b, x, y, z, rot = 0, w = 2.6, d = 0.9, h = 2.6, levels = 5) {
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const o = off(rot, sx * (w / 2 - 0.05), sz * (d / 2 - 0.05));
      b.add(box(0.09, h, 0.09), 'steelDark', { pos: [x + o[0], y + h / 2, z + o[1]], rot: [0, rot, 0] });
    }
  }
  for (let i = 0; i < levels; i++) {
    const ly = y + 0.12 + (i * (h - 0.2)) / (levels - 1);
    b.add(box(w, 0.07, d), 'steelDark', { pos: [x, ly, z], rot: [0, rot, 0] });
    if (i < levels - 1) {
      const n = 1 + Math.floor(rnd() * 2);
      for (let k = 0; k < n; k++) {
        const o = off(rot, (rnd() - 0.5) * (w - 0.9), (rnd() - 0.5) * 0.2);
        crate(b, x + o[0], ly + 0.04, z + o[1], 0.55 + rnd() * 0.25, rot + (rnd() - 0.5) * 0.3, 'wood');
      }
    }
  }
}

export function forklift(b, x, y, z, rot = 0) {
  b.add(box(1.5, 0.7, 1.15), 'barrier', { pos: [x, y + 0.52, z], rot: [0, rot, 0] });
  const seat = off(rot, -0.1, 0);
  b.add(box(0.85, 0.55, 1.0), 'plasticDark', { pos: [x + seat[0], y + 1.1, z + seat[1]], rot: [0, rot, 0] });
  const back = off(rot, -0.35, 0);
  b.add(box(0.8, 0.1, 0.9), 'plasticDark', { pos: [x + back[0], y + 1.42, z + back[1]], rot: [0, rot, 0] });
  for (const sz of [-0.32, 0.32]) {
    const o = off(rot, 0.85, sz);
    b.add(box(0.12, 2.1, 0.12), 'steelDark', { pos: [x + o[0], y + 1.05, z + o[1]], rot: [0, rot, 0] });
  }
  const top = off(rot, 0.85, 0);
  b.add(box(0.14, 0.12, 0.9), 'steelDark', { pos: [x + top[0], y + 2.05, z + top[1]], rot: [0, rot, 0] });
  for (const sz of [-0.28, 0.28]) {
    const o = off(rot, 1.45, sz);
    b.add(box(1.1, 0.07, 0.14), 'steelDark', { pos: [x + o[0], y + 0.08, z + o[1]], rot: [0, rot, 0] });
  }
  for (const sx of [-0.55, 0.6]) {
    for (const sz of [-0.58, 0.58]) {
      const o = off(rot, sx, sz);
      b.add(cyl(0.3, 0.3, 0.22, 12), 'tire', { pos: [x + o[0], y + 0.3, z + o[1]], rot: [0, 0, Math.PI / 2 + rot] });
    }
  }
}

export function bicycle(b, x, y, z, rot = 0) {
  for (const fx of [-0.52, 0.52]) {
    const o = off(rot, fx, 0);
    b.add(torus(0.33, 0.045, 6, 14), 'steelDark', { pos: [x + o[0], y + 0.33, z + o[1]], rot: [0, rot, 0] });
  }
  b.add(box(1.05, 0.05, 0.05), 'steelDark', { pos: [x, y + 0.55, z], rot: [0, rot, 0] });
  const a = off(rot, 0.2, 0);
  b.add(box(0.05, 0.5, 0.05), 'steelDark', { pos: [x + a[0], y + 0.35, z + a[1]], rot: [0, rot, 0] });
  const c = off(rot, -0.4, 0);
  b.add(box(0.05, 0.62, 0.05), 'steelDark', { pos: [x + c[0], y + 0.4, z + c[1]], rot: [0.25, rot, 0] });
  b.add(box(0.3, 0.06, 0.14), 'plasticDark', { pos: [x + c[0], y + 0.72, z + c[1]], rot: [0, rot, 0] });
}

export function ironTable(b, x, y, z, rot = 0, overturned = false) {
  const tilt = overturned ? Math.PI * 0.46 : 0;
  const h = overturned ? 0.42 : 0.74;
  b.add(cyl(0.42, 0.42, 0.05, 12), 'steelDark', { pos: [x, y + h, z], rot: [tilt, rot, 0] });
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + rot;
    const o = off(rot, Math.cos(a) * 0.36, Math.sin(a) * 0.36);
    b.add(box(0.05, h, 0.05), 'steelDark', { pos: [x + o[0], y + h / 2, z + o[1]], rot: [overturned ? tilt : 0, rot, 0] });
  }
}

export function chair(b, x, y, z, rot = 0, overturned = false) {
  const tilt = overturned ? Math.PI * 0.52 : 0;
  b.add(box(0.44, 0.05, 0.44), 'steelDark', { pos: [x, y + 0.45, z], rot: [tilt, rot, 0] });
  const back = off(rot, -0.2, 0);
  b.add(box(0.44, 0.5, 0.05), 'steelDark', { pos: [x + back[0], y + 0.7, z + back[1]], rot: [tilt, rot, 0] });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const o = off(rot, sx * 0.18, sz * 0.18);
      b.add(box(0.04, 0.45, 0.04), 'steelDark', { pos: [x + o[0], y + 0.22, z + o[1]], rot: [tilt, rot, 0] });
    }
  }
}

export function policeShield(b, x, y, z, rot = 0) {
  b.add(box(0.9, 1.15, 0.09), 'plasticDark', { pos: [x, y + 0.62, z], rot: [0, rot, 0] });
  const v = off(rot, 0.06, 0);
  b.add(box(0.52, 0.2, 0.03), 'glass', { pos: [x + v[0], y + 0.95, z + v[1]], rot: [0, rot, 0], outline: false });
  b.add(box(0.3, 0.1, 0.04), 'barrier', { pos: [x, y + 0.3, z], rot: [0, rot, 0] });
}

export function policeVan(b, x, y, z, rot = 0) {
  b.add(box(3.0, 1.85, 1.95), 'plasticWhite', { pos: [x, y + 1.32, z], rot: [0, rot, 0] });
  const cab = off(rot, 1.35, 0);
  b.add(box(1.5, 1.3, 1.85), 'plasticWhite', { pos: [x + cab[0], y + 1.05, z + cab[1]], rot: [0, rot, 0] });
  const wind = off(rot, 2.05, 0);
  b.add(box(0.1, 0.62, 1.6), 'glass', { pos: [x + wind[0], y + 1.35, z + wind[1]], rot: [0, rot, 0], outline: false });
  b.add(box(3.0, 0.12, 1.9), 'plasticDark', { pos: [x, y + 2.28, z], rot: [0, rot, 0] });
  const bar = off(rot, 0.55, 0);
  b.add(box(1.0, 0.16, 1.1), 'plasticDark', { pos: [x + bar[0], y + 2.42, z + bar[1]], rot: [0, rot, 0] });
  const red = off(rot, 0.25, 0);
  const blue = off(rot, 0.85, 0);
  b.add(box(0.42, 0.16, 0.46), 'emissiveRed', { pos: [x + red[0], y + 2.53, z + red[1]], rot: [0, rot, 0], outline: false });
  b.add(box(0.42, 0.16, 0.46), 'emissiveBlue', { pos: [x + blue[0], y + 2.53, z + blue[1]], rot: [0, rot, 0], outline: false });
  for (const fx of [-1.15, 1.5]) {
    for (const sz of [-0.95, 0.95]) {
      const o = off(rot, fx, sz);
      b.add(cyl(0.42, 0.42, 0.28, 14), 'tire', { pos: [x + o[0], y + 0.42, z + o[1]], rot: [0, 0, Math.PI / 2 + rot] });
      b.add(cyl(0.2, 0.2, 0.3, 10), 'steel', { pos: [x + o[0], y + 0.42, z + o[1]], rot: [0, 0, Math.PI / 2 + rot] });
    }
  }
  b.add(box(3.02, 0.28, 1.99), 'emissiveBlue', { pos: [x, y + 0.9, z], rot: [0, rot, 0], outline: false });
}

export function streetLamp(b, x, y, z, rot = 0, h = 4.4) {
  b.add(cyl(0.34, 0.42, 0.22, 12), 'steelDark', { pos: [x, y + 0.11, z] });
  b.add(cyl(0.09, 0.13, h, 10), 'steelDark', { pos: [x, y + h / 2, z] });
  const arm = off(rot, 0.85, 0);
  b.add(cyl(0.07, 0.07, 0.95, 8), 'steelDark', {
    pos: [x + arm[0] / 2, y + h - 0.1, z + arm[1] / 2], rot: [0, rot, Math.PI / 2 - 0.25],
  });
  b.add(box(0.55, 0.22, 0.36), 'steelDark', { pos: [x + arm[0], y + h - 0.26, z + arm[1]], rot: [0, rot, 0] });
  b.add(box(0.42, 0.06, 0.28), 'emissiveWarm', { pos: [x + arm[0], y + h - 0.4, z + arm[1]], rot: [0, rot, 0], outline: false });
  return [x + arm[0], y + h - 0.45, z + arm[1]];
}

export function floodlight(b, x, y, z, rot = 0) {
  for (let i = 0; i < 3; i++) {
    const a = rot + (i / 3) * Math.PI * 2;
    b.add(box(0.06, 1.15, 0.06), 'steelDark', {
      pos: [x + Math.cos(a) * 0.32, y + 0.56, z + Math.sin(a) * 0.32],
      rot: [Math.cos(a) * 0.22, 0, -Math.sin(a) * 0.22],
    });
  }
  b.add(cyl(0.07, 0.07, 0.5, 8), 'steelDark', { pos: [x, y + 1.25, z] });
  b.add(box(0.52, 0.5, 0.72), 'steelDark', { pos: [x, y + 1.72, z], rot: [0.32, rot, 0] });
  const face = off(rot, 0.2, 0);
  b.add(box(0.44, 0.06, 0.6), 'emissiveCold', {
    pos: [x + face[0], y + 1.6, z + face[1]], rot: [0.32, rot, 0], outline: false,
  });
  return [x, y + 1.72, z];
}

export function powerPole(b, x, y, z, h = 6.4, rot = 0) {
  b.add(cyl(0.14, 0.19, h, 10), 'woodDark', { pos: [x, y + h / 2, z] });
  b.add(box(1.9, 0.12, 0.14), 'woodDark', { pos: [x, y + h - 0.5, z], rot: [0, rot, 0] });
  b.add(box(1.3, 0.1, 0.12), 'woodDark', { pos: [x, y + h - 1.1, z], rot: [0, rot, 0] });
  for (const sx of [-0.8, 0.0, 0.8]) {
    const o = off(rot, sx, 0);
    b.add(cyl(0.05, 0.05, 0.2, 6), 'plasticDark', {
      pos: [x + o[0], y + h - 0.38, z + o[1]], rot: [0, 0, Math.PI / 2 + rot],
    });
  }
  b.add(box(0.4, 0.6, 0.4), 'steelDark', { pos: [x + 0.3, y + h - 1.6, z] });
}

/** Sagging catenary wire between two points. */
export function wire(b, a, c, sag = 0.5, radius = 0.035, mat = 'plasticDark') {
  const mid = new THREE.Vector3((a[0] + c[0]) / 2, (a[1] + c[1]) / 2 - sag, (a[2] + c[2]) / 2);
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(a[0], a[1], a[2]), mid, new THREE.Vector3(c[0], c[1], c[2]),
  );
  b.add(new THREE.TubeGeometry(curve, 14, radius, 5, false), mat, { outline: false });
}

export function barbedWire(b, x0, z0, x1, z1, y, h = 0.5) {
  const len = Math.hypot(x1 - x0, z1 - z0);
  const n = Math.max(2, Math.round(len / 2.4));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    b.add(cyl(0.05, 0.05, h, 6), 'steelDark', { pos: [x0 + (x1 - x0) * t, y + h / 2, z0 + (z1 - z0) * t] });
  }
  for (let s = 0; s < 3; s++) {
    const yy = y + h * (0.45 + s * 0.28);
    wire(b, [x0, yy, z0], [x1, yy, z1], 0.12, 0.022, 'steelDark');
  }
  const steps = Math.max(6, Math.round(len * 3));
  for (let i = 0; i < steps; i++) {
    const t = (i + 0.5) / steps;
    b.add(torus(0.11, 0.02, 5, 8), 'steelDark', {
      pos: [x0 + (x1 - x0) * t, y + h * 0.72 + Math.sin(i * 1.7) * 0.05, z0 + (z1 - z0) * t],
      rot: [Math.PI / 2, 0, i * 0.9],
      outline: false,
    });
  }
}

export function fenceMesh(b, x0, z0, x1, z1, y, h = 2.4) {
  const len = Math.hypot(x1 - x0, z1 - z0);
  const ang = Math.atan2(x1 - x0, z1 - z0);
  const posts = Math.max(2, Math.round(len / 2.6));
  for (let i = 0; i <= posts; i++) {
    const t = i / posts;
    b.add(cyl(0.07, 0.07, h, 8), 'steelDark', { pos: [x0 + (x1 - x0) * t, y + h / 2, z0 + (z1 - z0) * t] });
  }
  b.add(plane(len, h), 'plasticDark', {
    pos: [(x0 + x1) / 2, y + h / 2, (z0 + z1) / 2], rot: [0, ang + Math.PI / 2, 0], outline: false,
  });
  b.add(box(len, 0.06, 0.06), 'steelDark', { pos: [(x0 + x1) / 2, y + h, (z0 + z1) / 2], rot: [0, ang + Math.PI / 2, 0] });
}

export function stairs(b, x, y, z, rot, steps = 8, rise = 0.25, run = 0.34, width = 1.4, mat = 'concrete') {
  for (let i = 0; i < steps; i++) {
    const o = off(rot, i * run, 0);
    b.add(box(run, rise, width), mat, { pos: [x + o[0], y + rise * (i + 0.5), z + o[1]], rot: [0, rot, 0] });
  }
}

export function railing(b, x0, z0, x1, z1, y, h = 1.0, mat = 'steelDark') {
  const len = Math.hypot(x1 - x0, z1 - z0);
  const ang = Math.atan2(x1 - x0, z1 - z0);
  const posts = Math.max(2, Math.round(len / 1.6));
  for (let i = 0; i <= posts; i++) {
    const t = i / posts;
    b.add(cyl(0.04, 0.04, h, 6), mat, { pos: [x0 + (x1 - x0) * t, y + h / 2, z0 + (z1 - z0) * t] });
  }
  b.add(cyl(0.05, 0.05, len, 6), mat, {
    pos: [(x0 + x1) / 2, y + h, (z0 + z1) / 2], rot: [Math.PI / 2, 0, ang + Math.PI / 2],
  });
  b.add(cyl(0.035, 0.035, len, 6), mat, {
    pos: [(x0 + x1) / 2, y + h * 0.55, (z0 + z1) / 2], rot: [Math.PI / 2, 0, ang + Math.PI / 2],
  });
}
