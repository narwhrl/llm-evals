// Reusable tactical-prop factories. Everything writes into a Chunk so static
// geometry merges into a handful of draw calls.
import * as THREE from 'three';
import { Chunk } from '../core/toon.js';

// A positioned/rotated proxy into a parent chunk (yaw only).
export function subChunk(parent, ox, oy, oz, ory = 0) {
  const cos = Math.cos(ory);
  const sin = Math.sin(ory);
  const px = (cx, cz) => [ox + cx * cos + cz * sin, oz - cx * sin + cz * cos];
  return {
    box(key, w, h, d, cx, yb, cz, opts = {}) {
      const [wx, wz] = px(cx, cz);
      parent.box(key, w, h, d, wx, oy + yb, wz, { ...opts, ry: (opts.ry || 0) + ory });
    },
    cyl(key, rt, rb, h, seg, cx, yb, cz, opts = {}) {
      const [wx, wz] = px(cx, cz);
      parent.cyl(key, rt, rb, h, seg, wx, oy + yb, wz, { ...opts, ry: (opts.ry || 0) + ory });
    },
    slab(key, w, d, cx, y, cz, opts = {}) {
      const [wx, wz] = px(cx, cz);
      parent.slab(key, w, d, wx, oy + y, wz, { ...opts, ry: (opts.ry || 0) + ory });
    },
    plane(key, w, h, cx, cy, cz, opts = {}) {
      const [wx, wz] = px(cx, cz);
      parent.plane(key, w, h, wx, oy + cy, wz, { ...opts, ry: (opts.ry || 0) + ory });
    },
  };
}

// --- props -----------------------------------------------------------------

export function crate(chunk, x, y, z, s = 1.1, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('wood', s, s, s, 0, 0, 0);
  const t = 0.09;
  const e = s / 2 - t / 2;
  for (const sx of [-1, 1]) {
    c.box('woodDark', t, s, t, sx * e, 0, -e);
    c.box('woodDark', t, s, t, sx * e, 0, e);
  }
  c.box('woodDark', s, t, t, 0, s - t, -e);
  c.box('woodDark', s, t, t, 0, s - t, e);
}

export function barrel(chunk, x, y, z, key = 'barrelBlue', ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.cyl(key, 0.34, 0.34, 0.95, 12, 0, 0, 0);
  c.cyl(key, 0.37, 0.37, 0.08, 12, 0, 0.24, 0);
  c.cyl(key, 0.37, 0.37, 0.08, 12, 0, 0.62, 0);
}

export function pallet(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  for (let i = -2; i <= 2; i++) c.box('wood', 1.5, 0.05, 0.16, 0, 0.14, i * 0.3);
  for (const sx of [-0.6, 0, 0.6]) c.box('woodDark', 0.12, 0.14, 1.36, sx, 0, 0);
}

export function cardboardPile(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('cardboard', 0.9, 0.6, 0.7, 0, 0, 0, { ry: 0.1 });
  c.box('cardboard', 0.7, 0.5, 0.6, 0.25, 0.6, 0.1, { ry: -0.2 });
  c.box('cardboard', 0.8, 0.28, 0.65, -0.2, 0.05, 0.55, { ry: 0.5 }); // soaked, crushed
  c.box('cardboard', 0.55, 0.45, 0.5, 0.05, 1.1, 0.05, { ry: 0.35 });
}

export function jerseyBarrier(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('concrete', 2.0, 0.35, 0.62, 0, 0, 0);
  c.box('concrete', 2.0, 0.55, 0.4, 0, 0.35, 0);
  c.box('concrete', 2.0, 0.18, 0.28, 0, 0.9, 0);
}

export function plasticBarrier(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  // A-frame legs
  for (const s of [-0.85, 0.85]) {
    c.box('plasticOrange', 0.09, 1.0, 0.5, s, 0, 0);
  }
  c.box('plasticWhite', 1.9, 0.22, 0.06, 0, 0.72, 0);
  c.box('plasticOrange', 1.9, 0.22, 0.06, 0, 0.34, 0);
}

export function tireStack(chunk, x, y, z, n = 3, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  for (let i = 0; i < n; i++) {
    const g = new THREE.TorusGeometry(0.34, 0.15, 8, 16);
    const m = new THREE.Matrix4()
      .makeRotationX(Math.PI / 2)
      .premultiply(new THREE.Matrix4().makeRotationY(ry))
      .setPosition(x, y + 0.16 + i * 0.31, z);
    chunk.add(g, m, 'tire');
  }
}

export function trashBin(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.cyl('metalDark', 0.42, 0.36, 0.95, 10, 0, 0, 0);
  c.cyl('metal', 0.46, 0.46, 0.1, 10, 0, 0.95, 0); // lid
  c.box('metal', 0.3, 0.06, 0.08, 0, 1.05, 0); // lid handle
}

export function dumpster(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('contGreen', 2.4, 1.3, 1.3, 0, 0.15, 0);
  c.box('metalDark', 2.5, 0.12, 1.4, 0, 1.45, 0, { rx: 0.06 });
  for (const s of [-1, 1]) c.box('metalDark', 0.18, 0.18, 0.18, s * 1.0, 0, 0.5);
}

export function sandbags(chunk, x, y, z, ry = 0, rows = 3) {
  const c = subChunk(chunk, x, y, z, ry);
  for (let r = 0; r < rows; r++) {
    const bags = 4 - Math.floor(r * 0.7);
    for (let i = 0; i < bags; i++) {
      const off = (i - (bags - 1) / 2) * 0.62 + (r % 2) * 0.18;
      c.box('sandbag', 0.58, 0.26, 0.4, off, r * 0.24, 0, { ry: (i % 2) * 0.15 });
    }
  }
}

// Shipping container; len along x.
export function container(chunk, x, y, z, matKey, ry = 0, len = 6.1) {
  const c = subChunk(chunk, x, y, z, ry);
  const h = 2.6;
  const w = 2.45;
  c.box(matKey, len, h, w, 0, 0, 0);
  // corner posts + top/bottom rails
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      c.box('metalDark', 0.18, h, 0.18, sx * (len / 2 - 0.09), 0, sz * (w / 2 - 0.09));
    }
  }
  c.box('metalDark', len, 0.14, w, 0, h - 0.14, 0);
  c.box('metalDark', len, 0.14, w, 0, 0, 0);
  // door end frame
  c.box('metalDark', 0.1, h - 0.3, w - 0.3, len / 2 - 0.02, 0.15, 0);
}

// Barbed-wire run along x (helix tube + posts).
export function barbedWire(chunk, x, y, z, len, ry = 0) {
  const pts = [];
  const turns = Math.max(6, Math.round(len * 2.2));
  for (let i = 0; i <= turns * 8; i++) {
    const t = i / (turns * 8);
    const a = t * turns * Math.PI * 2;
    pts.push(new THREE.Vector3((t - 0.5) * len, Math.sin(a) * 0.09 + 0.12, Math.cos(a) * 0.09));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const g = new THREE.TubeGeometry(curve, turns * 8, 0.02, 4, false);
  const m = new THREE.Matrix4().makeRotationY(ry).setPosition(x, y, z);
  chunk.add(g, m, 'metalDark');
  const c = subChunk(chunk, x, y, z, ry);
  const posts = Math.max(2, Math.round(len / 1.6));
  for (let i = 0; i < posts; i++) {
    const px = -len / 2 + (i / (posts - 1)) * len;
    c.box('metalDark', 0.05, 0.3, 0.05, px, -0.05, 0);
  }
}

// Wooden ladder leaning (rx tilt) or vertical (rx=0).
export function ladder(chunk, x, y, z, h = 3, ry = 0, rx = 0) {
  const rail = 0.06;
  const w = 0.5;
  const g1 = new THREE.BoxGeometry(rail, h, rail);
  const g2 = new THREE.BoxGeometry(rail, h, rail);
  const rot = new THREE.Matrix4().makeRotationX(rx).premultiply(new THREE.Matrix4().makeRotationY(ry));
  const m1 = rot.clone().setPosition(x, y, z);
  const off = new THREE.Vector3(w, 0, 0).applyMatrix4(new THREE.Matrix4().makeRotationY(ry));
  const m2 = rot.clone().setPosition(x + off.x, y, z + off.z);
  // center the rails at h/2: geometry centered, so place at y+h/2 along tilt axis;
  // simple approach: shift along local up
  const up = new THREE.Vector3(0, h / 2, 0).applyMatrix4(rot.clone());
  m1.setPosition(x + up.x, y + up.y, z + up.z);
  m2.setPosition(x + off.x + up.x, y + up.y, z + off.z + up.z);
  chunk.add(g1, m1, 'wood');
  chunk.add(g2, m2, 'wood');
  const rungs = Math.floor(h / 0.32);
  for (let i = 1; i < rungs; i++) {
    const t = i / rungs;
    const rg = new THREE.BoxGeometry(w, 0.045, 0.045);
    const local = new THREE.Vector3(w / 2, t * h, 0).applyMatrix4(rot.clone());
    const rm = new THREE.Matrix4().makeRotationY(ry).setPosition(x + local.x, y + local.y, z + local.z);
    chunk.add(rg, rm, 'woodDark');
  }
}

export function poleWithCrossarm(chunk, x, y, z, h = 6.5) {
  chunk.cyl('woodDark', 0.09, 0.12, h, 8, x, y, z);
  chunk.box('woodDark', 1.6, 0.09, 0.09, x, y + h - 0.7, z);
  chunk.box('woodDark', 1.2, 0.09, 0.09, x, y + h - 1.1, z);
}

// Catenary wire between two points (merged thin tube).
export function wire(chunk, p0, p1, sag = 0.6) {
  const mid = p0.clone().lerp(p1, 0.5);
  mid.y -= sag;
  const curve = new THREE.QuadraticBezierCurve3(p0, mid, p1);
  const g = new THREE.TubeGeometry(curve, 16, 0.025, 3, false);
  chunk.add(g, null, 'metalDark');
}

// Rusty gutter downspout on a building corner; returns drip emitter point.
export function downspout(chunk, x, yTop, z, yBottom = 0) {
  chunk.cyl('rust', 0.06, 0.06, yTop - yBottom, 6, x, yBottom, z);
  chunk.box('rust', 0.16, 0.1, 0.16, x, yTop - 0.05, z);
  return new THREE.Vector3(x, yBottom + 0.25, z);
}

// Abandoned bicycle leaning against something.
export function bicycle(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  for (const s of [-0.55, 0.55]) {
    const g = new THREE.TorusGeometry(0.33, 0.035, 6, 16);
    const [wx, wz] = [x + s * Math.cos(ry), z - s * Math.sin(ry)];
    const m = new THREE.Matrix4().makeRotationY(ry + Math.PI / 2).setPosition(wx, y + 0.33, wz);
    chunk.add(g, m, 'tire');
  }
  c.box('bikeFrame', 0.95, 0.05, 0.05, 0, 0.62, 0, { rz: 0.1 });
  c.box('bikeFrame', 0.5, 0.05, 0.05, -0.25, 0.4, 0, { rz: 0.75 });
  c.box('bikeFrame', 0.5, 0.05, 0.05, 0.28, 0.42, 0, { rz: -0.7 });
  c.box('metalDark', 0.05, 0.3, 0.05, -0.5, 0.62, 0);
  c.box('metalDark', 0.34, 0.04, 0.05, -0.5, 0.92, 0); // handlebar
  c.box('metalDark', 0.22, 0.05, 0.14, 0.05, 0.78, 0); // saddle
}

// Overturned iron table + chairs.
export function ironTableSet(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  // table flipped: top against ground
  c.cyl('metalDark', 0.55, 0.55, 0.05, 12, 0, 0.5, 0, { rx: Math.PI / 2 - 0.25 });
  c.cyl('metalDark', 0.04, 0.04, 0.7, 6, 0.3, 0, 0.5, { rz: 1.2 });
  // chairs
  for (const [cx, cz, cr] of [[1.1, 0.4, 0.6], [-0.9, 0.7, 2.4]]) {
    c.box('metalDark', 0.42, 0.05, 0.42, cx, 0.42, cz, { ry: cr });
    c.box('metalDark', 0.42, 0.5, 0.05, cx - Math.sin(cr) * 0.2, 0.47, cz - Math.cos(cr) * 0.2, { ry: cr });
    for (const [lx, lz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) {
      c.box('metalDark', 0.04, 0.42, 0.04, cx + lx, 0, cz + lz, { ry: cr });
    }
  }
}

// Heavy 5-tier shelf unit.
export function shelfUnit(chunk, x, y, z, w = 3.4, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  const h = 3.1;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      c.box('shelfMetal', 0.07, h, 0.07, sx * (w / 2 - 0.05), 0, sz * 0.45);
    }
  }
  for (let i = 0; i < 5; i++) {
    c.box('shelfMetal', w, 0.05, 1.0, 0, 0.25 + i * 0.62, 0);
  }
  // stored goods on some tiers
  c.box('cardboard', 0.7, 0.5, 0.6, -0.9, 0.3, 0, { ry: 0.1 });
  c.box('cardboard', 0.6, 0.4, 0.55, 0.6, 0.92, 0, { ry: -0.15 });
  c.box('wood', 0.8, 0.45, 0.7, 0.2, 1.54, 0);
  c.box('cardboard', 0.65, 0.5, 0.5, -0.5, 2.16, 0, { ry: 0.3 });
  c.box('tarp', 1.2, 0.35, 0.8, 0.7, 2.78, 0);
}

// Manual forklift.
export function forklift(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('plasticOrange', 1.1, 0.55, 0.7, 0, 0.18, 0); // body
  c.cyl('tire', 0.16, 0.16, 0.12, 10, -0.35, 0.05, 0.3, { rx: Math.PI / 2 });
  c.cyl('tire', 0.16, 0.16, 0.12, 10, -0.35, 0.05, -0.3, { rx: Math.PI / 2 });
  c.cyl('tire', 0.2, 0.2, 0.12, 10, 0.45, 0.05, 0.3, { rx: Math.PI / 2 });
  c.cyl('tire', 0.2, 0.2, 0.12, 10, 0.45, 0.05, -0.3, { rx: Math.PI / 2 });
  // mast + forks
  c.box('metalDark', 0.08, 1.6, 0.5, 0.62, 0.1, 0);
  c.box('metalDark', 0.7, 0.05, 0.12, 0.95, 0.06, 0.14);
  c.box('metalDark', 0.7, 0.05, 0.12, 0.95, 0.06, -0.14);
  // overhead guard
  c.box('metalDark', 0.05, 1.15, 0.05, -0.45, 0.5, 0.28);
  c.box('metalDark', 0.05, 1.15, 0.05, -0.45, 0.5, -0.28);
  c.box('metalDark', 0.05, 1.15, 0.05, 0.15, 0.5, 0.28);
  c.box('metalDark', 0.05, 1.15, 0.05, 0.15, 0.5, -0.28);
  c.box('metalDark', 0.75, 0.05, 0.65, -0.15, 1.65, 0);
  c.box('metalDark', 0.3, 0.35, 0.3, -0.3, 0.73, 0); // seat
}

// Police anti-riot shield leaning.
export function policeShield(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('policeBlue', 0.62, 1.15, 0.06, 0, 0.02, 0, { rx: -0.18 });
  c.box('glass', 0.34, 0.2, 0.03, 0, 0.85, -0.04, { rx: -0.18 });
}

// Open crate with spare vest + helmet.
export function gearCrate(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('woodDark', 1.1, 0.08, 0.8, 0, 0, 0);
  for (const s of [-1, 1]) {
    c.box('wood', 1.1, 0.4, 0.06, 0, 0.08, s * 0.37);
    c.box('wood', 0.06, 0.4, 0.8, s * 0.52, 0.08, 0);
  }
  c.box('tarp', 0.5, 0.28, 0.35, -0.2, 0.1, 0.05, { ry: 0.2 }); // vest bundle
  c.cyl('metalDark', 0.17, 0.19, 0.2, 10, 0.28, 0.1, -0.1); // helmet
}

export function trafficCone(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('plasticOrange', 0.34, 0.05, 0.34, 0, 0, 0);
  c.cyl('plasticOrange', 0.05, 0.17, 0.55, 8, 0, 0.05, 0);
  c.cyl('plasticWhite', 0.115, 0.135, 0.12, 8, 0, 0.28, 0);
}

export function acUnit(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('metal', 0.9, 0.7, 0.35, 0, 0, 0);
  c.cyl('metalDark', 0.24, 0.24, 0.05, 12, 0, 0.12, 0.18, { rx: Math.PI / 2 });
  c.box('metalDark', 1.0, 0.06, 0.4, 0, -0.06, 0);
}

export function signBoard(chunk, x, y, z, tex, w = 2.2, h = 1.1, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  c.box('metalDark', 0.08, 1.6, 0.08, -w / 4, 0, 0);
  c.box('metalDark', 0.08, 1.6, 0.08, w / 4, 0, 0);
  return { w, h, yTop: y + 1.6 };
}

// Wall with rectangular openings. alongX=true: wall runs along x at z=fixedZ;
// else runs along z at x=fixedZ. openings: [{a, b, y0, y1}] in wall coords.
export function wallSeg(chunk, key, alongX, fixed, a0, a1, y0, y1, thick, openings = []) {
  const sorted = [...openings].sort((p, q) => p.a - q.a);
  const cuts = [];
  let cursor = a0;
  for (const o of sorted) {
    if (o.a > cursor) cuts.push([cursor, o.a, y0, y1]);
    if (o.y0 > y0) cuts.push([o.a, o.b, y0, o.y0]);
    if (o.y1 < y1) cuts.push([o.a, o.b, o.y1, y1]);
    cursor = Math.max(cursor, o.b);
  }
  if (cursor < a1) cuts.push([cursor, a1, y0, y1]);
  for (const [a, b, ya, yb] of cuts) {
    if (b - a < 0.01 || yb - ya < 0.01) continue;
    if (alongX) chunk.box(key, b - a, yb - ya, thick, (a + b) / 2, ya, fixed);
    else chunk.box(key, thick, yb - ya, b - a, fixed, ya, (a + b) / 2);
  }
}

export function newChunk() {
  return new Chunk();
}
