import * as THREE from 'three';
import { toon, toonMap, glow, glowMap } from '../core/materials.js';
import { rng } from '../core/canvas.js';
import { addGlass } from './glass.js';
import { STORE } from './layout.js';
import {
  floorTexture,
  cigaretteTexture,
  menuTexture,
  labelTexture,
  magazineTexture,
  staffDoorTexture,
} from './storeTextures.js';

const F = STORE.floor;
const IX0 = STORE.x0 + 0.15;
const IX1 = STORE.x1 - 0.15;
const IZ0 = STORE.z0 + 0.15;
const IZ1 = STORE.z1 - 0.15;

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const white = toon(0xffffff);
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const bottleGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 7);
const onigiriGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 3);
const PRODUCT = ['#e94f4f', '#f3b53f', '#4f9de9', '#5cc98b', '#f07fb0', '#ffffff', '#9a6bd8', '#f38b3c', '#e7e052', '#3cc2c9'];
const DRINK = ['#f4f7fb', '#e04848', '#3a7de0', '#f2c230', '#48b870', '#f28ab0', '#7a5230', '#e87a2a', '#bfe6ff'];

function plane(ctx, mat, w, h, x, y, z, ry = 0, rx = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, 0, 'YXZ');
  ctx.root.add(m);
  return m;
}

function floorAndLights(ctx) {
  const floor = plane(ctx, toonMap(floorTexture(), { color: 0xfff6e8 }), IX1 - IX0, IZ1 - IZ0, (IX0 + IX1) / 2, F + 0.005, (IZ0 + IZ1) / 2, 0, -Math.PI / 2);
  floor.receiveShadow = true;
  const strip = glow(0xfff4e0, 2.6);
  for (const x of [-2.0, -0.5, 1.0, 2.1]) ctx.b.box(strip, x, 2.925, -1.7, 0.16, 0.03, 3.8);
  for (const [x, z] of [
    [-1.8, -1.4],
    [0.6, -2.6],
    [0.6, -0.4],
  ]) {
    const l = new THREE.PointLight(0xffe2bc, 7.5, 7, 2);
    l.position.set(x, 2.6, z);
    ctx.root.add(l);
  }
}

function counter(ctx) {
  const { b } = ctx;
  const cx0 = -2.35;
  const cx1 = -1.75;
  const z0 = -2.5;
  const z1 = -0.1;
  b.span(toon(0xf8f6f0), cx0, F, z0, cx1, 0.98, z1);
  b.span(toon(0x19a39a), cx1, 0.55, z0, cx1 + 0.01, 0.68, z1);
  b.span(toon(0xf08a3c), cx1, 0.5, z0, cx1 + 0.01, 0.55, z1);
  b.span(toon(0x6b5a4a), cx0 - 0.03, 0.98, z0 - 0.03, cx1 + 0.05, 1.02, z1 + 0.03);
  const top = 1.02;
  const dark = toon(0x2c3240);
  const screen = glow(0x8fe3ff, 2.2);
  for (const z of [-1.35, -2.25]) {
    b.box(dark, -2.05, top + 0.08, z, 0.34, 0.16, 0.38);
    b.box(dark, -2.0, top + 0.28, z, 0.05, 0.26, 0.3, 0, 0, -0.35);
    b.box(screen, -1.97, top + 0.29, z, 0.01, 0.2, 0.25, 0, 0, -0.35);
    b.box(toon(0x3d4452), -1.82, top + 0.03, z + 0.24, 0.1, 0.06, 0.14);
  }
  // Coffee machine at the front end of the counter.
  b.box(toon(0x2a2d36), -2.05, top + 0.3, -0.35, 0.36, 0.6, 0.32);
  b.box(glow(0xffc27a, 2), -1.865, top + 0.44, -0.35, 0.01, 0.16, 0.22);
  b.box(toon(0x6b4a2e), -1.87, top + 0.12, -0.35, 0.02, 0.12, 0.14);
  for (let i = 0; i < 4; i++) b.cyl(toon(0xf7f3ea), -2.05, top + 0.6 + i * 0.03, -0.35 + 0.08, 0.035, 0.03, 8, 0.045);
  // Oden pot: stainless tank with glowing broth and floating ingredients.
  b.span(toon(0xc6ccd6), -2.3, top, -1.1, -1.8, top + 0.14, -0.62);
  plane(ctx, glow(0xe9b760, 1.5), 0.44, 0.42, -2.05, top + 0.145, -0.86, 0, -Math.PI / 2);
  const r = rng(5);
  for (let i = 0; i < 16; i++) {
    const kind = i % 4;
    const x = -2.25 + r() * 0.4;
    const z = -1.05 + r() * 0.38;
    const col = ['#f7f1dc', '#efe2c2', '#6a6570', '#e3c58f'][kind];
    b.inst(kind === 2 ? onigiriGeo : bottleGeo, white, x, top + 0.15, z, 0.07, 0.04, 0.07, col);
  }
  // Hot snack warmer between the registers.
  b.span(toon(0xd8dde5), -2.3, top, -2.0, -1.8, top + 0.06, -1.6);
  b.span(glow(0xffa55a, 1.8), -2.28, top + 0.06, -1.98, -2.26, top + 0.4, -1.62);
  for (let i = 0; i < 6; i++) b.inst(bottleGeo, white, -2.15 + (i % 3) * 0.12, top + 0.1 + ((i / 3) | 0) * 0.14, -1.8, 0.09, 0.06, 0.09, '#d98b2b');
  const glassBox = addGlass(ctx, ctx.root, 0.4, 0.36, -1.8, top + 0.24, -1.8, Math.PI / 2, { wet: 0 });
  glassBox.renderOrder = 3;
  b.span(toon(0xd8dde5), -2.3, top + 0.4, -2.0, -1.8, top + 0.43, -1.6);
  // Cigarette wall and cabinets behind the counter.
  plane(ctx, glowMap(cigaretteTexture(), 1.1), 2.4, 1.0, IX0 + 0.01, 1.85, -1.4, Math.PI / 2);
  b.span(toon(0xeceae4), IX0, F, -2.6, IX0 + 0.28, 1.12, -0.2);
  b.box(toon(0x2f3440), IX0 + 0.14, 1.28, -0.6, 0.26, 0.32, 0.46);
  plane(ctx, glowMap(menuTexture(), 1.5), 1.8, 0.45, -1.95, 2.45, -1.3, Math.PI / 2);
  b.rod(toon(0x555b66), V(-1.95, 2.68, -0.6), V(-1.95, 2.92, -0.6), 0.008);
  b.rod(toon(0x555b66), V(-1.95, 2.68, -2.0), V(-1.95, 2.92, -2.0), 0.008);
  // Staff door to the back room.
  plane(ctx, toonMap(staffDoorTexture()), 0.7, 2.0, -2.7, F + 1.0, IZ0 + 0.01);
}

function chilledCase(ctx) {
  const { b } = ctx;
  const x0 = -2.1;
  const x1 = -0.15;
  const zb = IZ0;
  b.span(toon(0xe9ebef), x0, F, zb, x1, 2.05, zb + 0.18);
  b.span(toon(0x2f3542), x0, F, zb, x1, 0.55, zb + 0.72);
  b.span(glow(0xeef7ff, 1.4), x0 + 0.04, 0.6, zb + 0.18, x1 - 0.04, 1.85, zb + 0.19);
  plane(ctx, glowMap(labelTexture('おにぎり・お弁当', '#1b8d85', '#ffffff'), 1.6), x1 - x0, 0.2, (x0 + x1) / 2, 1.95, zb + 0.72);
  b.span(toon(0xe9ebef), x0, 1.85, zb, x1, 2.05, zb + 0.75);
  const r = rng(9);
  const tiers = [
    [0.58, 0.68, 'bento'],
    [0.95, 0.52, 'onigiri'],
    [1.3, 0.38, 'sand'],
    [1.6, 0.3, 'onigiri'],
  ];
  for (const [y, depth, kind] of tiers) {
    b.span(toon(0xf3f4f6), x0, y - 0.03, zb + 0.18, x1, y, zb + 0.18 + depth);
    for (let x = x0 + 0.1; x < x1 - 0.05; x += kind === 'bento' ? 0.26 : 0.13) {
      const z = zb + 0.18 + depth - 0.1;
      if (kind === 'bento') {
        b.inst(boxGeo, white, x + 0.02, y + 0.04, z - 0.05, 0.22, 0.07, 0.18, r() > 0.5 ? '#e36b3d' : '#3a3f4b');
        b.inst(boxGeo, white, x + 0.02, y + 0.085, z - 0.05, 0.2, 0.01, 0.16, ['#f5d36b', '#9fd46f', '#f4f1e8'][(r() * 3) | 0]);
      } else if (kind === 'onigiri') {
        b.inst(onigiriGeo, white, x, y + 0.06, z, 0.1, 0.04, 0.1, '#f8f8f4', Math.PI / 6);
        b.inst(boxGeo, white, x, y + 0.03, z + 0.05, 0.05, 0.05, 0.02, '#22302a');
      } else {
        b.inst(onigiriGeo, white, x, y + 0.06, z, 0.12, 0.05, 0.12, r() > 0.5 ? '#f6e3a5' : '#f2c8a0', Math.PI / 2);
      }
    }
  }
}

function coolerRun(ctx, x0, z, doors, ry) {
  const { b } = ctx;
  const w = 0.62;
  const r = rng(Math.round(x0 * 100 + z * 10));
  b.push(x0, 0, z, ry);
  const len = w * doors;
  b.span(toon(0x2c313c), 0, F, -0.62, len, 2.3, 0);
  b.span(glow(0xe8f4ff, 1.5), 0.04, 0.2, -0.6, len - 0.04, 2.1, -0.58);
  for (let d = 0; d < doors; d++) {
    const dx = d * w;
    b.span(toon(0x6a7282), dx, F, -0.02, dx + 0.035, 2.3, 0.02);
    for (let s = 0; s < 5; s++) {
      const y = 0.25 + s * 0.38;
      b.span(toon(0xdfe4ea), dx + 0.04, y - 0.02, -0.56, dx + w - 0.02, y, -0.08);
      for (let k = 0; k < 6; k++) {
        const h = 0.18 + r() * 0.1;
        b.inst(bottleGeo, white, dx + 0.1 + k * 0.085, y + h / 2, -0.16, 0.06, h, 0.06, DRINK[(r() * DRINK.length) | 0]);
      }
    }
    b.span(toon(0xb8c0cc), dx + w - 0.07, 0.9, 0.02, dx + w - 0.05, 1.5, 0.05);
  }
  b.span(toon(0x6a7282), len - 0.035, F, -0.02, len, 2.3, 0.02);
  b.span(glow(0x2f79d6, 1.6), 0, 2.3, -0.3, len, 2.5, 0.01);
  b.pop();
  const glassMats = [];
  for (let d = 0; d < doors; d++) {
    const c = Math.cos(ry);
    const s = Math.sin(ry);
    const lx = d * w + w / 2;
    const m = addGlass(ctx, ctx.root, w - 0.05, 2.1, x0 + lx * c, 1.2, z - lx * s, ry, { wet: 0, tint: 0xd6ecff });
    glassMats.push(m);
  }
}

function gondola(ctx, zc, seed) {
  const { b } = ctx;
  const x0 = -1.05;
  const x1 = 1.25;
  const d = 0.36;
  const r = rng(seed);
  b.span(toon(0xeceff3), x0, F, zc - 0.03, x1, 1.4, zc + 0.03);
  b.span(toon(0xd6dbe3), x0, F, zc - d, x1, 0.14, zc + d);
  for (const side of [1, -1]) {
    for (let s = 0; s < 4; s++) {
      const y = 0.18 + s * 0.3;
      const depth = d - s * 0.04;
      b.span(toon(0xf5f6f8), x0, y - 0.02, side > 0 ? zc : zc - depth, x1, y, side > 0 ? zc + depth : zc);
      b.span(glow(['#f08a3c', '#19a39a', '#e7e052', '#f07fb0'][s], 1.1), x0, y - 0.06, side > 0 ? zc + depth : zc - depth - 0.005, x1, y - 0.02, side > 0 ? zc + depth + 0.005 : zc - depth);
      let x = x0 + 0.04;
      while (x < x1 - 0.1) {
        const w = 0.08 + r() * 0.1;
        const h = 0.12 + r() * 0.12;
        const col = PRODUCT[(r() * PRODUCT.length) | 0];
        for (let k = 0; k < 2; k++) {
          const z = zc + side * (depth - 0.06 - k * 0.12);
          if (r() > 0.2) b.inst(r() > 0.85 ? bottleGeo : boxGeo, white, x + w / 2, y + h / 2, z, w * 0.92, h, 0.1, col);
        }
        x += w;
      }
    }
  }
  // End cap with a promotional stack and POP card.
  b.span(toon(0xeceff3), x1, F, zc - d, x1 + 0.28, 0.14, zc + d);
  for (let i = 0; i < 9; i++) {
    b.inst(boxGeo, white, x1 + 0.14, 0.2 + ((i / 3) | 0) * 0.14, zc - 0.22 + (i % 3) * 0.22, 0.2, 0.12, 0.18, seed % 2 ? '#e94f4f' : '#f3b53f');
  }
  b.rod(toon(0x9aa0aa), V(x1 + 0.14, 0.62, zc), V(x1 + 0.14, 1.25, zc), 0.01);
  plane(ctx, glowMap(labelTexture(seed % 2 ? '特売' : '新商品', seed % 2 ? '#e94f4f' : '#f3b53f', '#ffffff'), 1.2), 0.5, 0.14, x1 + 0.14, 1.32, zc, Math.PI / 2);
  plane(ctx, glowMap(labelTexture(seed % 2 ? 'スナック菓子' : 'カップめん', '#ffffff', '#2c5fb8'), 1.2), 0.9, 0.17, 0.1, 2.35, zc, 0);
}

function magazinesAndFreezer(ctx) {
  const { b } = ctx;
  const x = IX1;
  b.span(toon(0xe6e8ec), x - 0.4, F, -1.7, x, 0.28, 0.35);
  for (let i = 0; i < 3; i++) {
    const y = 0.42 + i * 0.2;
    const mag = toonMap(magazineTexture(30 + i));
    const m = plane(ctx, mag, 2.05, 0.3, x - 0.28 + i * 0.09, y, -0.675, -Math.PI / 2, -0.35);
    m.castShadow = false;
    b.span(toon(0xc7ccd4), x - 0.34 + i * 0.09, y - 0.16, -1.7, x - 0.3 + i * 0.09, y - 0.14, 0.35);
  }
  b.span(toon(0xe6e8ec), x - 0.08, F, -1.7, x, 1.0, 0.35);
  plane(ctx, glowMap(labelTexture('雑誌・コミック', '#2c5fb8', '#ffffff'), 1.1), 1.2, 0.16, x - 0.02, 1.12, -0.7, -Math.PI / 2);

  // Chest freezer of ice cream by the entrance.
  const fx0 = 1.35;
  const fx1 = 2.05;
  const fz0 = -0.62;
  const fz1 = 0.2;
  b.span(toon(0xf2f5f8), fx0, F, fz0, fx1, 0.8, fz1);
  b.span(toon(0x2f79d6), fx0 - 0.005, 0.5, fz0 - 0.005, fx1 + 0.005, 0.6, fz1 + 0.005);
  b.span(glow(0xd9f1ff, 1.4), fx0 + 0.05, 0.62, fz0 + 0.05, fx1 - 0.05, 0.64, fz1 - 0.05);
  const r = rng(77);
  for (let i = 0; i < 20; i++) {
    b.inst(boxGeo, white, fx0 + 0.1 + (i % 5) * 0.12, 0.7, fz0 + 0.12 + ((i / 5) | 0) * 0.17, 0.1, 0.06, 0.14, ['#ffd3e2', '#fff3c4', '#b5e3ff', '#c9a27a', '#ffffff'][(r() * 5) | 0]);
  }
  const lid = addGlass(ctx, ctx.root, fx1 - fx0, fz1 - fz0, (fx0 + fx1) / 2, 0.81, (fz0 + fz1) / 2, 0, { wet: 0, tint: 0xe6f4ff });
  lid.rotation.set(-Math.PI / 2, 0, 0);
  plane(ctx, glowMap(labelTexture('アイス', '#2f79d6', '#ffffff'), 1.2), 0.6, 0.12, (fx0 + fx1) / 2, 0.55, fz1 + 0.01);
}

function hangingSigns(ctx) {
  const labels = [
    ['冷たいお飲み物', '#2c5fb8', 1.2, -3.2],
    ['いらっしゃいませ', '#19a39a', 0.2, 0.2],
  ];
  for (const [t, bg, x, z] of labels) {
    plane(ctx, glowMap(labelTexture(t, bg, '#ffffff'), 1.25), 1.1, 0.2, x, 2.6, z);
    ctx.b.rod(toon(0x555b66), V(x - 0.4, 2.7, z), V(x - 0.4, 2.92, z), 0.006);
    ctx.b.rod(toon(0x555b66), V(x + 0.4, 2.7, z), V(x + 0.4, 2.92, z), 0.006);
  }
}

export function buildInterior(ctx) {
  floorAndLights(ctx);
  counter(ctx);
  chilledCase(ctx);
  coolerRun(ctx, -0.05, IZ0 + 0.62, 3, 0);
  coolerRun(ctx, IX1 - 0.62, IZ0 + 0.62, 2, -Math.PI / 2);
  gondola(ctx, -2.45, 3);
  gondola(ctx, -1.2, 4);
  magazinesAndFreezer(ctx);
  hangingSigns(ctx);
}
