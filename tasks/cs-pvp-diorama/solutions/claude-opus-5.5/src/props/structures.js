import * as THREE from 'three';
import { rand, range, pick } from '../core/rng.js';
import { drip, dripLine, steam } from '../fx/registry.js';
import { decal, crate, cardboardPile, barrel } from './basic.js';

// Vertical steel ladder; local z faces the climber.
export function ladder(k, x, y, z, rot, height, key = 'darkMetal', lean = 0) {
  k.push([x, y, z], rot, lean);
  for (const sx of [-0.22, 0.22]) k.box(key, [sx, 0, 0], [0.05, height, 0.05]);
  for (let h = 0.3; h < height; h += 0.3) k.box(key, [0, h, 0], [0.44, 0.03, 0.03]);
  k.pop();
}

// Straight stair climbing along local +z from (x, y, z). Solid concrete or open steel.
export function stairs(k, x, y, z, rot, width, rise, { steel = false, rails = true } = {}) {
  const n = Math.max(2, Math.round(rise / 0.22));
  const h = rise / n;
  const run = 0.3;
  k.push([x, y, z], rot);
  for (let i = 0; i < n; i++) {
    if (steel) k.box('darkMetal', [0, (i + 1) * h - 0.04, i * run + run / 2], [width, 0.04, run * 0.92]);
    else k.box('concrete', [0, 0, i * run + run / 2], [width, (i + 1) * h, run], { tint: 0xc4c4be });
  }
  const len = n * run;
  if (steel) for (const sx of [-width / 2, width / 2]) k.rod('darkMetal', [sx, 0, 0], [sx, rise, len], 0.04);
  if (rails) for (const sx of [-width / 2 + 0.04, width / 2 - 0.04]) {
    k.rod('darkMetal', [sx, 0.95, 0], [sx, rise + 0.95, len], 0.025);
    for (let i = 0; i <= 2; i++) {
      const t = i / 2;
      k.rod('darkMetal', [sx, rise * t, len * t], [sx, rise * t + 0.95, len * t], 0.02);
    }
  }
  k.pop();
  return len;
}

// Railing from a to b (world-in-frame points at deck height).
export function railing(k, a, b, h = 1.0, key = 'darkMetal') {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const n = Math.max(1, Math.round(va.distanceTo(vb) / 1.3));
  for (let i = 0; i <= n; i++) {
    const p = va.clone().lerp(vb, i / n);
    k.rod(key, [p.x, p.y, p.z], [p.x, p.y + h, p.z], 0.03);
  }
  k.rod(key, [a[0], a[1] + h, a[2]], [b[0], b[1] + h, b[2]], 0.03);
  k.rod(key, [a[0], a[1] + h * 0.5, a[2]], [b[0], b[1] + h * 0.5, b[2]], 0.02);
}

// Sagging black cable between two points.
export function wire(k, a, b, sag = 0.6, r = 0.022) {
  const pts = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    pts.push(new THREE.Vector3(
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t - sag * 4 * t * (1 - t),
      a[2] + (b[2] - a[2]) * t,
    ));
  }
  k.geo('wire', new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, r, 4, false));
}

// Weathered timber pole; returns the two crossarm cable anchors in world space.
export function powerPole(k, x, y, z, rot = 0, h = 7.8) {
  k.cyl('wood', [x, y, z], 0.13, h, { seg: 8, tint: 0x6a5a4a });
  k.box('wood', [x, y + h - 0.6, z], [2.0, 0.12, 0.12], { rot: [0, rot, 0], tint: 0x5a4a3a });
  const ax = Math.cos(rot);
  const az = -Math.sin(rot);
  const anchors = [];
  for (const s of [-0.85, 0.85]) {
    const px = x + ax * s;
    const pz = z + az * s;
    k.cyl('plain', [px, y + h - 0.54, pz], 0.05, 0.14, { seg: 6, tint: 0x8a9aa0 });
    anchors.push([px, y + h - 0.42, pz]);
  }
  k.box('darkMetal', [x, y + h - 1.6, z + 0.2], [0.42, 0.55, 0.36], { rot: [0, rot, 0], tint: 0x5a6068 });
  k.rod('darkMetal', [x, y + 1, z], [x + ax * 0.9, y, z + az * 0.9], 0.02);
  return anchors;
}

// Street lamp; returns the lamp head position in world space.
export function streetLamp(k, x, y, z, rot, h = 4.8) {
  k.cyl('darkMetal', [x, y, z], 0.1, 0.5, { seg: 10 });
  k.cyl('darkMetal', [x, y, z], 0.06, h, { seg: 8 });
  const ax = Math.cos(rot);
  const az = -Math.sin(rot);
  k.rod('darkMetal', [x, y + h - 0.05, z], [x + ax * 1.2, y + h + 0.15, z + az * 1.2], 0.04);
  const hx = x + ax * 1.3;
  const hz = z + az * 1.3;
  k.box('darkMetal', [hx, y + h, hz], [0.55, 0.18, 0.3], { rot: [0, rot, 0] });
  k.box('lampWarm', [hx, y + h - 0.04, hz], [0.44, 0.05, 0.22], { rot: [0, rot, 0] });
  return [hx, y + h - 0.12, hz];
}

class Helix extends THREE.Curve {
  constructor(a, b, r, turns) {
    super();
    this.a = new THREE.Vector3(...a);
    this.d = new THREE.Vector3(...b).sub(this.a);
    this.r = r;
    this.turns = turns;
    this.u = new THREE.Vector3(0, 1, 0);
    this.v = new THREE.Vector3().crossVectors(this.d, this.u).normalize();
  }

  getPoint(t, target = new THREE.Vector3()) {
    const ang = t * this.turns * Math.PI * 2;
    return target.copy(this.a).addScaledVector(this.d, t)
      .addScaledVector(this.u, Math.cos(ang) * this.r)
      .addScaledVector(this.v, Math.sin(ang) * this.r);
  }
}

// Chain-link fence topped with razor-wire coil, between two ground points.
export function fence(k, a, b, h = 2.1, { barbed = true } = {}) {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const len = va.distanceTo(vb);
  const n = Math.max(1, Math.round(len / 2.6));
  for (let i = 0; i <= n; i++) {
    const p = va.clone().lerp(vb, i / n);
    k.cyl('darkMetal', [p.x, p.y, p.z], 0.045, h + 0.3, { seg: 6 });
  }
  const rot = -Math.atan2(vb.z - va.z, vb.x - va.x);
  const mid = va.clone().add(vb).multiplyScalar(0.5);
  k.box('chain', [mid.x, mid.y + 0.05, mid.z], [len, h, 0.02], { rot: [0, rot, 0] });
  k.rod('darkMetal', [a[0], a[1] + h, a[2]], [b[0], b[1] + h, b[2]], 0.025);
  if (barbed) {
    const top = [a[0], a[1] + h + 0.28, a[2]];
    const end = [b[0], b[1] + h + 0.28, b[2]];
    k.geo('wire', new THREE.TubeGeometry(new Helix(top, end, 0.22, Math.round(len * 3)), Math.round(len * 24), 0.012, 3, false), undefined, { tint: 0x9aa0a8 });
  }
}

// Rusty sheet gutter along a roof edge with a downpipe to the ground at the end.
export function gutter(k, a, b, groundY = 0) {
  k.rod('metal', a, b, 0.08, { seg: 6, tint: 0xb08060 });
  k.rod('metal', [b[0], b[1], b[2]], [b[0], groundY + 0.35, b[2]], 0.06, { seg: 6, tint: 0xa07050 });
  dripLine(a, b, Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[2] - a[2]) / 1.4)));
  drip(b[0], groundY + 0.25, b[2]);
}

export function vent(k, x, y, z, rot = 0, s = 0.7) {
  k.push([x, y, z], rot);
  k.box('metal', [0, 0, 0], [s, s * 0.8, s * 0.5], { tint: 0x9aa0a4 });
  for (let i = 0; i < 4; i++) k.box('darkMetal', [0, 0.1 + i * s * 0.16, s * 0.26], [s * 0.85, 0.03, 0.03]);
  k.pop();
  const ax = Math.sin(rot);
  const az = Math.cos(rot);
  steam(x + ax * s * 0.4, y + s * 0.4, z + az * s * 0.4);
}

// Roof-mounted mushroom exhaust.
export function roofVent(k, x, y, z) {
  k.cyl('metal', [x, y, z], 0.22, 0.9, { seg: 10, tint: 0x9aa0a4 });
  k.cyl('metal', [x, y + 0.95, z], 0.36, 0.12, { seg: 10, tint: 0x80868a });
  steam(x, y + 1.0, z);
}

// 20 ft ISO container on the ground, doors at local +x.
export function container(k, x, y, z, rot, tint, { doors = true, number = true } = {}) {
  const L = 6.06;
  const W = 2.44;
  const H = 2.59;
  k.push([x, y, z], rot);
  k.box('corrugated', [0, 0, 0], [L, H, W], { tint });
  const frame = new THREE.Color(tint).multiplyScalar(0.55).getHex();
  for (const sx of [-L / 2, L / 2]) for (const sz of [-W / 2, W / 2]) k.box('darkMetal', [sx, 0, sz], [0.16, H + 0.02, 0.16], { tint: frame });
  for (const sy of [0, H - 0.1]) for (const sz of [-W / 2, W / 2]) k.box('darkMetal', [0, sy, sz], [L, 0.12, 0.1], { tint: frame });
  if (doors) {
    k.box('darkMetal', [L / 2 + 0.01, 0.05, 0], [0.02, H - 0.1, 0.03], { tint: frame });
    for (const sz of [-0.9, -0.35, 0.35, 0.9]) k.box('darkMetal', [L / 2 + 0.04, 0.12, sz], [0.04, H - 0.25, 0.04], { tint: 0x55595e });
  }
  if (number) {
    decal(k, 'freightNo', [0.8, H * 0.62, W / 2 + 0.012], 1.6, 1.6, '+z');
    if (rand() < 0.6) decal(k, pick(['bullets', 'tagDust', 'rushB', 'tSpray']), [-1.5, 1.0, W / 2 + 0.014], 1.3, 1.3, '+z');
    decal(k, 'freightNo', [-0.6, H * 0.62, -W / 2 - 0.012], 1.6, 1.6, '-z');
  }
  k.pop();
}

// Five-tier heavy pallet rack loaded with crates, drums, and boxes (along local x).
export function rack(k, x, y, z, rot, len = 5.4, tiers = 5) {
  const depth = 1.1;
  const th = 0.9;
  k.push([x, y, z], rot);
  const posts = Math.round(len / 2.7) + 1;
  for (let i = 0; i < posts; i++) {
    const px = -len / 2 + (i * len) / (posts - 1);
    for (const pz of [-depth / 2, depth / 2]) k.box('paint', [px, 0, pz], [0.09, th * tiers + 0.2, 0.09], { tint: 0x3a5a9a });
  }
  for (let t = 1; t <= tiers; t++) {
    const ty = t * th - 0.1;
    for (const pz of [-depth / 2, depth / 2]) k.box('paint', [0, ty, pz], [len, 0.12, 0.07], { tint: 0xd86a1a });
    k.box('wood', [0, ty + 0.1, 0], [len - 0.1, 0.03, depth]);
  }
  for (let t = 0; t < tiers; t++) {
    const ty = t === 0 ? 0 : t * th + 0.03;
    for (let px = -len / 2 + 0.6; px < len / 2 - 0.4; px += range(0.9, 1.4)) {
      const r = rand();
      if (r < 0.4) crate(k, px, ty, 0, range(0.55, 0.7), range(-0.1, 0.1));
      else if (r < 0.65) cardboardPile(k, px, ty, 0, rand(), 2);
      else if (r < 0.8 && t === 0) barrel(k, px, ty, 0);
    }
  }
  k.pop();
}
