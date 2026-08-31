// The tactical prop library: crates, barrels, pallets, barriers, tires,
// vehicles, containers, furniture, street hardware. Every factory returns a
// Group anchored at local ground level (y=0) so callers place & rotate freely.
import * as THREE from 'three';
import { box, cyl, decal, noOutline, rnd, pick } from './utils.js';
import { M } from './materials.js';
import * as T from './textures.js';

const R2 = Math.PI / 2;

export function woodCrate({ w = 1.4, h = 1.15, d = 1.4 } = {}) {
  const g = new THREE.Group();
  box(w, h, d, M.crate, { y: h / 2, parent: g });
  return g;
}

export function crateStack({ cols = 2, rows = 2, base = 1.4 } = {}) {
  const g = new THREE.Group();
  let x = 0;
  for (let c = 0; c < cols; c++) {
    const w = base * rnd(0.85, 1.1);
    for (let r = 0; r < rows - (c % 2); r++) {
      const cw = new woodCrate({ w, h: w * 0.82, d: base * rnd(0.9, 1.05) });
      cw.position.set(x, r * w * 0.82, rnd(-0.2, 0.2));
      cw.rotation.y = rnd(-0.12, 0.12);
      g.add(cw);
    }
    x += w * 1.02;
  }
  return g;
}

export function barrel({ h = 1.12, mat = null } = {}) {
  const g = new THREE.Group();
  mat = mat || (rnd(0, 1) < 0.8 ? M.barrel : M.barrelRed);
  cyl(0.42, 0.42, h, mat, { y: h / 2, parent: g });
  cyl(0.43, 0.43, 0.06, M.steelDark, { y: 0.06, parent: g });
  return g;
}

// 四连装油桶堆 — four-barrel cluster with two riding on top.
export function barrelQuad() {
  const g = new THREE.Group();
  const p = [[-0.46, -0.46], [0.46, -0.46], [-0.46, 0.46], [0.46, 0.46]];
  for (const [x, z] of p) {
    const b = barrel();
    b.position.set(x, 0, z);
    g.add(b);
  }
  const top1 = barrel(); top1.position.set(0, 1.12, 0); g.add(top1);
  const top2 = barrel({ mat: M.barrelRed }); top2.position.set(0.15, 1.12, 0.2); top2.rotation.y = 0.4; g.add(top2);
  return g;
}

export function pallet({ w = 1.7, d = 1.2 } = {}) {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    box(0.14, 0.09, d, M.woodDark, { x: -w / 2 + (i * w) / 2, y: 0.045, parent: g });
  }
  for (let i = 0; i < 5; i++) {
    box(w, 0.05, 0.16, M.wood, { y: 0.115, z: -d / 2 + 0.1 + (i * (d - 0.2)) / 4, parent: g, cast: false });
  }
  return g;
}

export function palletLean() {
  const g = new THREE.Group();
  const p = pallet();
  p.rotation.x = -Math.PI / 2 + 0.12;
  p.position.y = 0.85;
  g.add(p);
  return g;
}

export function cardboardStack({ n = 3 } = {}) {
  const g = new THREE.Group();
  let y = 0;
  for (let i = 0; i < n; i++) {
    const w = rnd(0.8, 1.2), h = rnd(0.4, 0.65), d = rnd(0.7, 1.0);
    box(w, h, d, M.cardboard, { y: y + h / 2, parent: g });
    y += h;
  }
  box(1.0, 0.5, 0.9, M.cardboard, { x: 0.9, y: 0.25, rz: 0.2, parent: g });
  return g;
}

// 水泥隔离墩 — jersey barrier profile.
export function jerseyBarrier({ len = 2.0 } = {}) {
  const g = new THREE.Group();
  box(len, 0.34, 0.72, M.concreteDark, { y: 0.17, parent: g });
  box(len, 0.44, 0.4, M.concreteDark, { y: 0.56, parent: g });
  const st = M.stripe;
  box(len, 0.2, 0.42, st, { y: 0.78, parent: g, cast: false });
  return g;
}

// 塑料拒马路障 — water-filled plastic JK barrier.
export function plasticBarrier({ w = 1.9 } = {}) {
  const g = new THREE.Group();
  box(w, 0.72, 0.5, M.policeWhite, { y: 0.36, parent: g });
  box(w, 0.22, 0.54, M.stripe, { y: 0.72, parent: g });
  box(w * 0.92, 0.1, 0.44, M.policeWhite, { y: 0.86, parent: g, cast: false });
  box(0.16, 0.12, 0.7, M.policeWhite, { x: -w / 2 + 0.08, y: 0.06, parent: g, cast: false });
  box(0.16, 0.12, 0.7, M.policeWhite, { x: w / 2 - 0.08, y: 0.06, parent: g, cast: false });
  return g;
}

export function tire({ r = 0.55 } = {}) {
  const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.2, 10, 20), M.tire);
  t.rotation.x = R2; t.position.y = 0.2;
  t.castShadow = true;
  g.add(t);
  const hub = cyl(0.24, 0.24, 0.3, M.tireSide, { rz: R2, y: 0.2, parent: g, cast: false });
  return g;
}

export function tireStack({ n = 3 } = {}) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const t = tire();
    t.position.set(rnd(-0.06, 0.06), i * 0.36, rnd(-0.06, 0.06));
    t.rotation.y = rnd(0, 3);
    g.add(t);
  }
  return g;
}

export function leaningTire() {
  const g = new THREE.Group();
  const t = tire();
  t.rotation.set(0, rnd(0, 3), 0);
  t.rotation.z = Math.PI / 2 - 0.18;
  t.position.y = 0.5;
  g.add(t);
  return g;
}

export function sackPile({ n = 4 } = {}) {
  const g = new THREE.Group();
  const geo = new THREE.SphereGeometry(0.5, 10, 8);
  for (let i = 0; i < n; i++) {
    const s = new THREE.Mesh(geo, M.sack);
    s.scale.set(rnd(0.9, 1.15), 0.5, rnd(0.65, 0.8));
    s.position.set(rnd(-0.7, 0.7), 0.24 + (i > 2 ? 0.48 : 0), rnd(-0.5, 0.5));
    s.castShadow = true; s.receiveShadow = true;
    g.add(s);
  }
  return g;
}

// 废弃瓦楞纸箱堆 — sodden cardboard cluster.
export function cardboardPile() {
  const g = cardboardStack({ n: 2 });
  const b = box(1.1, 0.55, 0.9, M.cardboard, { x: -0.8, y: 0.28, ry: 0.5, parent: g });
  return g;
}

export function dumpster({ w = 2.4, h = 1.3, d = 1.4 } = {}) {
  const g = new THREE.Group();
  box(w, h, d, M.corrGreen, { y: h / 2 + 0.18, parent: g });
  const lid = box(w * 0.98, 0.08, d * 0.99, M.corrRust, { y: h + 0.22, z: -d / 2 + 0.1, rx: -0.35, parent: g });
  // feet
  box(0.3, 0.18, 0.3, M.steelDark, { x: -w / 2 + 0.25, y: 0.09, z: d / 2 - 0.3, parent: g, cast: false });
  box(0.3, 0.18, 0.3, M.steelDark, { x: w / 2 - 0.25, y: 0.09, z: -d / 2 + 0.3, parent: g, cast: false });
  decal(T.codeStencil('NO 12', { size: 44 }), 0.9, 0.4, { x: w / 2 - 0.02, y: h / 2 + 0.2, ry: R2, parent: g });
  return g;
}

export function trashBin({ h = 1.05, r = 0.42 } = {}) {
  const g = new THREE.Group();
  cyl(r, r * 0.92, h, M.corrBlue, { y: h / 2, parent: g });
  cyl(r * 1.06, r * 1.06, 0.08, M.steelDark, { y: h + 0.04, parent: g });
  cyl(0.06, 0.06, 0.16, M.steelDark, { y: h + 0.14, parent: g, cast: false });
  return g;
}

export function acUnit() {
  const g = new THREE.Group();
  box(0.9, 0.7, 0.6, M.steel, { y: 0.35, parent: g });
  cyl(0.22, 0.22, 0.06, M.steelDark, { rx: R2, y: 0.72, parent: g, cast: false });
  cyl(0.16, 0.16, 0.04, M.darkInside, { rx: R2, y: 0.73, parent: g, cast: false });
  box(0.7, 0.08, 0.5, M.steelDark, { y: 0.04, parent: g, cast: false });
  return g;
}

export function roadSign(kind = 'noentry') {
  const g = new THREE.Group();
  cyl(0.05, 0.05, 2.6, M.steelDark, { y: 1.3, parent: g });
  const map = kind === 'noentry'
    ? T.signTexture(['NO', 'ENTRY'], { w: 192, h: 128, bg: 'rgba(150,44,36,0.94)', fg: '#f0e8e2', size: 44 })
    : T.signTexture(['ONE WAY'], { w: 256, h: 96 });
  decal(map, 0.85, 0.6, { y: 2.2, z: 0.03, parent: g, mat: noOutline(new THREE.MeshToonMaterial({ map, transparent: true })) });
  box(1.1, 0.75, 0.04, M.steelDark, { y: 2.2, parent: g });
  g.rotation.z = kind === 'noentry' ? 0.06 : -0.1;
  return g;
}

// 老式路灯 — the B-corner warm lamp.
export function lampPost({ h = 4.0 } = {}) {
  const g = new THREE.Group();
  cyl(0.09, 0.13, h, M.steelDark, { y: h / 2, parent: g });
  cyl(0.16, 0.2, 0.12, M.steelDark, { y: 0.06, parent: g });
  box(0.06, 0.06, 0.9, M.steelDark, { y: h, z: 0.42, parent: g });
  const head = box(0.5, 0.22, 0.34, M.steelDark, { y: h - 0.06, z: 0.82, parent: g });
  const bulb = box(0.4, 0.08, 0.26, M.warmGlow, { y: h - 0.19, z: 0.82, parent: g, cast: false, recv: false });
  g.userData.bulb = bulb;
  return g;
}

export function wirePole({ h = 9.0, kind = 'wood' } = {}) {
  const g = new THREE.Group();
  cyl(0.11, 0.16, h, kind === 'wood' ? M.woodDark : M.concreteDark, { y: h / 2, parent: g });
  for (const y of [h - 0.6, h - 1.5]) {
    box(2.0, 0.09, 0.09, M.woodDark, { y, parent: g, cast: false });
    cyl(0.05, 0.05, 0.14, M.darkInside, { x: -0.8, y: y + 0.12, parent: g, cast: false });
    cyl(0.05, 0.05, 0.14, M.darkInside, { x: 0.8, y: y + 0.12, parent: g, cast: false });
  }
  return g;
}

// 铁皮排水沟 — wall-corner downspout with hopper, returns drip anchor y.
export function downspout(h = 4.5) {
  const g = new THREE.Group();
  box(0.16, h, 0.16, M.corrRust, { y: h / 2, parent: g });
  box(0.34, 0.24, 0.34, M.corrRust, { y: h, parent: g });
  box(0.2, 0.12, 0.2, M.corrRust, { y: 0.28, z: 0.06, parent: g, cast: false });
  box(0.1, 0.06, 0.3, M.corrRust, { y: h - 0.5, z: 0.16, parent: g, cast: false });
  return g;
}

export function forklift() {
  const g = new THREE.Group();
  box(1.1, 0.55, 1.7, M.olive, { y: 0.62, z: 0.1, parent: g }); // body
  box(0.9, 0.5, 0.7, M.olive, { y: 1.1, z: 0.55, parent: g }); // cage
  for (let i = 0; i < 4; i++) {
    box(0.06, 0.5, 0.06, M.steelDark, { x: -0.42 + (i % 2) * 0.84, y: 1.38, z: 0.3 + Math.floor(i / 2) * 0.5, parent: g, cast: false });
  }
  box(0.14, 2.1, 0.14, M.steelDark, { x: -0.3, y: 1.6, z: -0.85, parent: g }); // mast
  box(0.14, 2.1, 0.14, M.steelDark, { x: 0.3, y: 1.6, z: -0.85, parent: g });
  box(0.7, 0.08, 0.5, M.steelDark, { y: 0.75, z: -1.15, parent: g }); // carriage
  box(0.1, 0.06, 1.0, M.steel, { x: -0.25, y: 0.55, z: -1.35, parent: g }); // forks
  box(0.1, 0.06, 1.0, M.steel, { x: 0.25, y: 0.55, z: -1.35, parent: g });
  for (const [x, z] of [[-0.55, 0.45], [0.55, 0.45], [-0.55, -0.45], [0.55, -0.45]]) {
    cyl(0.26, 0.26, 0.22, M.tire, { rz: R2, x, y: 0.26, z, parent: g });
  }
  box(0.3, 0.5, 0.08, M.steelDark, { y: 1.1, z: 0.95, rx: 0.3, parent: g, cast: false }); // wheel
  return g;
}

export function shelfUnit({ w = 3.2, h = 2.7, layers = 5 } = {}) {
  const g = new THREE.Group();
  for (const x of [-w / 2, 0, w / 2]) {
    box(0.1, h, 0.1, M.steelDark, { x, y: h / 2, parent: g });
  }
  for (let i = 0; i < layers; i++) {
    const y = 0.24 + (i * (h - 0.3)) / (layers - 1);
    box(w + 0.1, 0.07, 1.0, M.woodDark, { y, parent: g });
    if (i < layers - 1 && Math.random() < 0.8) {
      const cw = rnd(0.5, 0.9);
      const cr = woodCrate({ w: cw, h: cw * 0.8, d: 0.8 });
      cr.position.set(rnd(-w / 2 + 0.6, w / 2 - 0.6), y + 0.035, rnd(-0.1, 0.1));
      cr.rotation.y = rnd(-0.3, 0.3);
      g.add(cr);
    }
  }
  return g;
}

export function desk() {
  const g = new THREE.Group();
  box(1.7, 0.07, 0.85, M.wood, { y: 0.76, parent: g });
  box(0.08, 0.74, 0.8, M.woodDark, { x: -0.78, y: 0.37, parent: g });
  box(0.08, 0.74, 0.8, M.woodDark, { x: 0.78, y: 0.37, parent: g });
  box(0.55, 0.5, 0.75, M.woodDark, { x: 0.5, y: 1.03, parent: g }); // small hutch
  return g;
}

export function officeChairOverturned() {
  const g = new THREE.Group();
  cyl(0.3, 0.3, 0.07, M.tireSide, { y: 0.55, parent: g });
  cyl(0.05, 0.05, 0.5, M.steelDark, { y: 0.3, rx: Math.PI / 2 - 0.25, parent: g });
  box(0.45, 0.5, 0.07, M.policeBlue, { y: 0.26, z: 0.3, rx: 0.5, parent: g });
  return g;
}

export function officeLocker() {
  const g = new THREE.Group();
  box(0.8, 1.9, 0.5, M.corrGray, { y: 0.95, parent: g });
  box(0.04, 1.7, 0.04, M.steelDark, { x: 0.1, y: 0.95, z: 0.26, parent: g, cast: false });
  return g;
}

// 岗亭控制台 — guard-booth console.
export function consoleDesk() {
  const g = new THREE.Group();
  box(1.5, 0.75, 0.6, M.steelDark, { y: 0.375, parent: g });
  box(1.4, 0.5, 0.06, M.steel, { y: 0.95, rx: -0.5, z: 0.1, parent: g });
  const scr = box(0.5, 0.34, 0.03, M.coldGlow, { y: 0.98, rx: -0.5, z: 0.12, parent: g, cast: false, recv: false });
  box(0.34, 0.2, 0.03, M.darkInside, { x: -0.4, y: 0.97, rx: -0.5, z: 0.12, parent: g, cast: false, recv: false });
  return g;
}

export function boothStool() {
  const g = new THREE.Group();
  cyl(0.06, 0.06, 0.5, M.steelDark, { y: 0.25, parent: g });
  cyl(0.26, 0.26, 0.07, M.tireSide, { y: 0.53, parent: g });
  return g;
}

export function bicycle() {
  const g = new THREE.Group();
  const wheel = () => {
    const t = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 8, 18), M.tireSide);
    t.castShadow = true;
    return t;
  };
  const w1 = wheel(); w1.rotation.y = R2; w1.position.set(-0.52, 0.34, 0);
  const w2 = wheel(); w2.rotation.y = R2; w2.position.set(0.52, 0.34, 0);
  g.add(w1, w2);
  const frame = (x1, z1, x2, z2, y1, y2) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const c = cyl(0.025, 0.025, len, M.steelDark, { cast: false });
    c.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
    c.rotation.z = Math.atan2(y2 - y1, x2 - x1);
    g.add(c);
  };
  frame(-0.52, 0, 0, 0, 0.34, 0.52);
  frame(0, 0, 0.52, 0, 0.52, 0.34);
  frame(-0.52, 0, 0.05, 0, 0.34, 0.72);
  frame(0.05, 0, 0.45, 0, 0.72, 0.62);
  frame(0.45, 0, 0.52, 0, 0.62, 0.34);
  box(0.5, 0.05, 0.05, M.steelDark, { y: 0.78, z: 0.02, ry: 0.15, parent: g, cast: false });
  box(0.3, 0.06, 0.2, M.tireSide, { x: -0.18, y: 0.76, parent: g, cast: false });
  g.rotation.z = 0.16; // leaning
  return g;
}

// 翻倒的铁艺桌椅 — overturned bistro set.
export function ironSet() {
  const g = new THREE.Group();
  const top = cyl(0.62, 0.62, 0.05, M.steelDark, { y: 0.62, parent: g });
  for (let i = 0; i < 3; i++) {
    cyl(0.03, 0.03, 0.6, M.steelDark, { x: Math.cos(i * 2.1) * 0.4, z: Math.sin(i * 2.1) * 0.4, y: 0.3, rx: rnd(-0.15, 0.15), rz: rnd(-0.15, 0.15), parent: g, cast: false });
  }
  const chair = (x, z, ry) => {
    const c = new THREE.Group();
    box(0.42, 0.04, 0.42, M.steelDark, { y: 0.45, parent: c });
    box(0.42, 0.5, 0.04, M.steelDark, { y: 0.7, z: -0.19, parent: c, cast: false });
    for (const [lx, lz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) {
      cyl(0.025, 0.025, 0.45, M.steelDark, { x: lx, z: lz, y: 0.22, parent: c, cast: false });
    }
    c.position.set(x, 0, z);
    c.rotation.y = ry;
    return c;
  };
  const c1 = chair(1.1, 0.4, 0.7); c1.rotation.z = Math.PI * 0.55; c1.position.y = 0.32; // knocked over
  const c2 = chair(-0.8, 0.9, 2.2); c2.rotation.z = Math.PI * 0.62; c2.position.y = 0.3;
  const c3 = chair(-0.3, -1.1, 0.2);
  g.add(c1, c2, c3);
  return g;
}

export function riotShield({ lean = true } = {}) {
  const g = new THREE.Group();
  const mat = noOutline(new THREE.MeshToonMaterial({ color: 0x3a5f9e, transparent: true, opacity: 0.72 }));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 1.15), mat);
  p.position.y = 0.58;
  p.castShadow = false;
  g.add(p);
  box(0.58, 0.06, 0.05, M.policeBlue, { y: 1.12, parent: g, cast: false });
  if (lean) g.rotation.x = -0.22;
  return g;
}

// 海运集装箱 — shipping container, door bars on -z end.
export function container({ len = 6, w = 2.6, h = 2.6, mat = null, code = 'CSLU 482-61' } = {}) {
  const g = new THREE.Group();
  mat = mat || pick([M.corrGreen, M.corrBlue, M.corrRust, M.corrGray]);
  box(w, h, len, mat, { y: h / 2, parent: g });
  for (let i = 0; i < 4; i++) {
    box(0.1, h * 0.92, 0.1, M.steelDark, { x: -w / 2 + 0.08 + (i % 2) * (w - 0.16), y: h / 2, z: -len / 2 + 0.08 + Math.floor(i / 2) * (len - 0.16), parent: g, cast: false });
  }
  // door-end lock rods
  for (let i = 0; i < 4; i++) {
    cyl(0.045, 0.045, h * 0.94, M.steelDark, { x: -w / 2 + 0.35 + i * 0.63, y: h / 2, z: -len / 2 - 0.05, parent: g, cast: false });
  }
  decal(T.codeStencil(code, { size: 40, w: 320, h: 80 }), w * 0.9, w * 0.22, { x: w / 2 + 0.015, y: h * 0.72, ry: R2, parent: g });
  decal(T.codeStencil(code.split(' ')[0], { size: 34, w: 320, h: 70, color: 'rgba(200,205,214,A)' }), w * 0.9, w * 0.2, { x: -w / 2 - 0.015, y: h * 0.6, ry: -R2, parent: g });
  return g;
}

// 破旧厢式货运卡车 — box truck, cab toward -z.
export function boxTruck({ len = 5.6 } = {}) {
  const g = new THREE.Group();
  // cab
  box(2.4, 2.0, 1.9, M.corrRust, { y: 1.45, z: -len / 2 + 0.95, parent: g });
  box(2.1, 0.7, 0.06, M.darkInside, { y: 1.9, z: -len / 2 - 0.005, parent: g, cast: false }); // windshield
  cyl(0.42, 0.42, 0.3, M.tire, { rz: R2, x: -1.05, y: 0.45, z: -len / 2 + 0.7, parent: g });
  cyl(0.42, 0.42, 0.3, M.tire, { rz: R2, x: 1.05, y: 0.45, z: -len / 2 + 0.7, parent: g });
  // trailer box
  box(2.5, 2.5, len - 2.3, M.corrGray, { y: 1.7, z: 0.95, parent: g });
  decal(T.codeStencil('FREIGHT 04', { size: 46 }), 2.4, 0.55, { x: 1.26, y: 1.9, ry: R2, parent: g });
  decal(T.codeStencil('FREIGHT 04', { size: 46 }), 2.4, 0.55, { x: -1.26, y: 1.9, ry: -R2, parent: g });
  for (const z of [len / 2 - 1.2, len / 2 - 2.6]) {
    cyl(0.42, 0.42, 0.3, M.tire, { rz: R2, x: -1.05, y: 0.45, z, parent: g });
    cyl(0.42, 0.42, 0.3, M.tire, { rz: R2, x: 1.05, y: 0.45, z, parent: g });
  }
  // mud flaps / bumper
  box(2.4, 0.3, 0.2, M.steelDark, { y: 0.35, z: len / 2 + 0.05, parent: g, cast: false });
  return g;
}

// 警用面包车 — police van with roof beacon.
export function policeVan({ len = 5.0 } = {}) {
  const g = new THREE.Group();
  box(2.3, 2.1, len, M.policeWhite, { y: 1.5, parent: g });
  box(2.2, 0.8, 0.06, M.darkInside, { y: 1.75, z: -len / 2 - 0.01, parent: g, cast: false });
  box(2.34, 0.55, len * 0.42, M.policeBlue, { y: 1.35, z: -len * 0.18, parent: g, cast: false }); // blue stripe
  const pol = T.codeStencil('POLICE', { size: 66, w: 320, h: 90 });
  decal(pol, 2.0, 0.56, { x: 1.16, y: 1.95, ry: R2, parent: g });
  decal(pol, 2.0, 0.56, { x: -1.16, y: 1.95, ry: -R2, parent: g });
  // beacon
  const b1 = box(0.34, 0.16, 0.22, M.redGlow, { x: -0.25, y: 2.63, parent: g, cast: false, recv: false });
  const b2 = box(0.34, 0.16, 0.22, M.blueGlow, { x: 0.25, y: 2.63, parent: g, cast: false, recv: false });
  g.userData.beacons = [b1, b2];
  for (const z of [-len / 2 + 1.0, len / 2 - 1.1]) {
    cyl(0.4, 0.4, 0.28, M.tire, { rz: R2, x: -1.0, y: 0.42, z, parent: g });
    cyl(0.4, 0.4, 0.28, M.tire, { rz: R2, x: 1.0, y: 0.42, z, parent: g });
  }
  return g;
}

// Chain-link fence span with barbed wire. Runs along local +Z from origin.
export function fenceSpan(len, { h = 2.2 } = {}) {
  const g = new THREE.Group();
  const n = Math.max(1, Math.round(len / 2.4));
  for (let i = 0; i <= n; i++) {
    cyl(0.045, 0.05, h + 0.25, M.steelDark, { z: (i / n) * len, y: (h + 0.25) / 2, parent: g });
  }
  const tex = T.chainLinkTexture();
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(len / 1.2, h / 1.2);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(len, h),
    noOutline(new THREE.MeshToonMaterial({ map: tex, transparent: true, alphaTest: 0.3, side: THREE.DoubleSide })),
  );
  mesh.rotation.y = Math.PI / 2; // plane width runs along local Z
  mesh.position.set(0, h / 2, len / 2);
  g.add(mesh);
  // barbed wire: two strands + barbs
  const barbMat = M.steelDark;
  for (const y of [h + 0.18, h + 0.34]) {
    const wire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, len, 3), barbMat);
    wire1.rotation.x = R2;
    wire1.position.set(0, y, len / 2);
    wire1.castShadow = false;
    g.add(wire1);
    for (let i = 0; i <= n * 2; i++) {
      box(0.14, 0.02, 0.02, barbMat, { y: y + 0.02, z: (i / (n * 2)) * len, ry: rnd(0, 3), parent: g, cast: false });
    }
  }
  return g;
}

// Scaffold tower giving access to the mid high slit.
export function scaffoldTower({ h = 3.6 } = {}) {
  const g = new THREE.Group();
  const w = 1.7;
  for (const [x, z] of [[-w / 2, -0.5], [w / 2, -0.5], [-w / 2, 0.5], [w / 2, 0.5]]) {
    box(0.09, h, 0.09, M.steelDark, { x, y: h / 2, z, parent: g });
  }
  for (const y of [h, h - 1.2]) {
    box(w + 0.1, 0.06, 1.1, M.woodDark, { y, parent: g });
    box(w, 0.05, 0.05, M.steelDark, { y: y - 0.3, parent: g, cast: false });
  }
  // ladder on -x side
  const rails = M.steelDark;
  box(0.06, h, 0.06, rails, { x: -w / 2, y: h / 2, z: 0.62, parent: g, cast: false });
  box(0.06, h, 0.06, rails, { x: -w / 2 + 0.45, y: h / 2, z: 0.62, parent: g, cast: false });
  for (let y = 0.4; y < h; y += 0.38) {
    box(0.45, 0.05, 0.05, rails, { x: -w / 2 + 0.22, y, z: 0.62, parent: g, cast: false });
  }
  return g;
}

// 警用装备模型箱 — printed police equipment crates at CT spawn.
export function equipCrate(kind) {
  const g = new THREE.Group();
  box(1.3, 0.8, 0.9, M.olive, { y: 0.4, parent: g });
  decal(T.equipIconTexture(kind), 0.55, 0.55, { y: 0.42, z: 0.46, parent: g });
  decal(T.codeStencil(kind === 'vest' ? 'ARMOR' : 'HELMET', { size: 40, w: 200, h: 60 }), 0.8, 0.26, { y: 0.72, z: 0.46, parent: g });
  return g;
}
