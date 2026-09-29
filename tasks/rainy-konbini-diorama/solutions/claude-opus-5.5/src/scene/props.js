import * as THREE from 'three';
import { toon, toonMap, glow, glowMap, halo } from '../core/materials.js';
import { rng } from '../core/canvas.js';
import { STORE, ROAD, NEAR_WALK, BLOCK_WALL_Z, CURB, DOOR } from './layout.js';
import { vendingTexture, binLabel, pylonTexture, noticeTexture } from './propTextures.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

function plane(ctx, mat, w, h, x, y, z, ry = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  ctx.root.add(m);
  return m;
}

function groundHalo(ctx, color, opacity, size, x, z) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), halo(color, opacity));
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, 0.015, z);
  ctx.root.add(m);
  ctx.noOutline.push(m);
  ctx.noReflect.push(m);
}

function vendingMachine(ctx, x, z, body, accent, seed) {
  const { b } = ctx;
  const W = 0.95;
  b.push(x, 0, z);
  b.box(toon(body), 0, 0.93, 0, W, 1.82, 0.8);
  b.box(toon(accent), 0, 1.88, 0.05, W + 0.04, 0.08, 0.84);
  b.box(toon(0x2b303b), 0, 0.3, 0.405, W - 0.16, 0.3, 0.02);
  b.box(toon(0x14171e), 0, 0.3, 0.42, W - 0.3, 0.14, 0.01);
  b.box(toon(0xc0c6cf), 0.34, 0.75, 0.41, 0.12, 0.2, 0.02);
  b.box(glow(0xff6a3d, 2.5), 0.34, 0.8, 0.425, 0.06, 0.03, 0.01);
  b.pop();
  plane(ctx, glowMap(vendingTexture(seed, '#' + accent.toString(16).padStart(6, '0')), 1.9), W - 0.12, 1.05, x, 1.25, z + 0.41);
  const l = new THREE.PointLight(0xdcecff, 2.2, 3.2, 2);
  l.position.set(x, 1.2, z + 0.9);
  ctx.root.add(l);
  groundHalo(ctx, 0xbcd6ff, 0.28, 2.6, x, z + 1.0);
  ctx.blockers.push([x - W / 2, z - 0.4, x + W / 2, z + 0.45, 1.92]);
  ctx.rainLights.push([x, 1.2, z + 0.7, 0.5]);
}

function bins(ctx, x, z, labels) {
  const { b } = ctx;
  labels.forEach(([label, color], i) => {
    const bx = x + i * 0.52;
    b.box(toon(0xe7eaee), bx, 0.46, z, 0.46, 0.92, 0.44);
    b.box(toon(0x7b828f), bx, 0.94, z, 0.48, 0.05, 0.46);
    b.cyl(toon(0x1a1d24), bx, 0.962, z, 0.09, 0.01, 12);
    plane(ctx, toonMap(binLabel(label, color)), 0.4, 0.15, bx, 0.74, z + 0.222);
  });
}

function umbrellaStand(ctx, x, z) {
  const { b } = ctx;
  b.box(toon(0x7c838f), x, 0.3, z, 0.5, 0.6, 0.26);
  b.box(toon(0x3b414d), x, 0.61, z, 0.52, 0.03, 0.28);
  const cols = [0x5ec4f0, 0xf07fb0, 0xf5f5f5, 0x2c3a5c, 0xf2c230];
  cols.forEach((c, i) => {
    const ux = x - 0.18 + i * 0.09;
    const lean = (i - 2) * 0.06;
    b.rod(toon(0x333333), V(ux, 0.2, z), V(ux + lean, 1.05, z + 0.02), 0.01);
    b.cyl(toon(c), ux + lean * 0.5, 0.45, z, 0.035, 0.5, 8, 0.02);
    b.rod(toon(0x333333), V(ux + lean, 1.05, z + 0.02), V(ux + lean + 0.05, 1.08, z + 0.05), 0.012);
  });
}

function bicycle(ctx, x, z, ry) {
  const { b } = ctx;
  const frame = toon(0xd9eef2);
  const tyre = toon(0x1a1d24);
  b.push(x, 0, z, ry);
  const R = 0.32;
  const torus = new THREE.TorusGeometry(R, 0.025, 6, 20);
  const m = new THREE.Matrix4();
  for (const zz of [-0.52, 0.52]) {
    m.makeRotationY(Math.PI / 2).setPosition(0, R + 0.02, zz);
    b.geo(torus, tyre, m);
    b.rod(toon(0x9aa0aa), V(0, R + 0.02, zz - 0.02), V(0, R + 0.02, zz + 0.02), 0.04);
  }
  const rear = V(0, R + 0.02, -0.52);
  const front = V(0, R + 0.02, 0.52);
  const crank = V(0, 0.34, -0.05);
  const seatTop = V(0, 0.82, -0.2);
  const head = V(0, 0.82, 0.4);
  b.rod(frame, rear, crank, 0.018);
  b.rod(frame, crank, seatTop, 0.02);
  b.rod(frame, crank, head, 0.022);
  b.rod(frame, rear, seatTop, 0.015);
  b.rod(frame, head, front, 0.02);
  b.box(toon(0x3b2c24), 0, 0.86, -0.22, 0.12, 0.05, 0.22);
  b.rod(toon(0x9aa0aa), V(-0.26, 0.98, 0.36), V(0.26, 0.98, 0.36), 0.015);
  b.rod(toon(0x9aa0aa), head, V(0, 0.98, 0.36), 0.018);
  b.box(toon(0xb9c0cb), 0, 0.82, 0.62, 0.3, 0.2, 0.26);
  b.box(toon(0x2b3140), 0, 0.93, 0.62, 0.28, 0.01, 0.24);
  b.box(toon(0xb9c0cb), 0, 0.62, -0.55, 0.22, 0.03, 0.26);
  b.rod(toon(0x9aa0aa), V(0.06, 0.02, -0.25), V(0.14, 0.3, -0.35), 0.012);
  b.pop();
}

function pylon(ctx, x, z) {
  const { b } = ctx;
  b.box(toon(0x6f7680), x, 0.25, z, 0.5, 0.5, 0.5);
  b.box(toon(0x9aa2ad), x, 2.2, z, 0.18, 3.6, 0.18);
  b.box(toon(0xf1f2f4), x, 5.0, z, 1.05, 2.1, 0.42);
  const tex = pylonTexture();
  const front = glowMap(tex, 1.6);
  plane(ctx, front, 0.92, 1.95, x, 5.0, z + 0.215);
  plane(ctx, glowMap(tex, 1.6), 0.92, 1.95, x, 5.0, z - 0.215, Math.PI);
  ctx.signs.push({ mat: front, base: 1.6 });
  ctx.rainLights.push([x, 5.0, z + 0.4, 0.6]);
}

function blockWall(ctx) {
  const { b } = ctx;
  const z = BLOCK_WALL_Z;
  const block = toon(0xa7a39a);
  b.span(block, -9, 0, z - 0.15, STORE.x0 - 0.02, 1.4, z);
  for (let x = -8.6; x < STORE.x0; x += 0.8) b.span(toon(0x8f8b83), x, 0, z - 0.155, x + 0.02, 1.4, z + 0.005);
  b.span(toon(0x8f8b83), -9, 0.7, z - 0.155, STORE.x0, 0.72, z + 0.005);
  b.span(toon(0x8a857c), -9, 1.4, z - 0.18, STORE.x0 - 0.02, 1.46, z + 0.03);
  // Community notice board on the wall.
  const nx = -6.4;
  b.span(toon(0x5d4431), nx - 0.85, 0.5, z, nx + 0.85, 1.65, z + 0.08);
  b.span(toon(0x3c4a3f), nx - 0.95, 1.65, z - 0.05, nx + 0.95, 1.72, z + 0.32);
  for (const px of [nx - 0.8, nx + 0.8]) b.span(toon(0x5d4431), px - 0.04, 0, z, px + 0.04, 1.65, z + 0.1);
  plane(ctx, toonMap(noticeTexture()), 1.55, 0.97, nx, 1.1, z + 0.085);
  ctx.blockers.push([nx - 0.95, z - 0.05, nx + 0.95, z + 0.32, 1.72]);
}

function hydrangeas(ctx) {
  const r = rng(41);
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const leaf = new THREE.IcosahedronGeometry(1, 0);
  const white = toon(0xffffff);
  const spots = [
    [-8.4, -5.0],
    [-7.7, -5.1],
    [-4.8, -5.0],
    [-4.1, -5.15],
    [2.3, -7.0],
    [-8.4, -8.4],
  ];
  for (const [x, z] of spots) {
    ctx.b.inst(leaf, white, x, 0.35, z, 0.42, 0.35, 0.36, '#2f6b4a');
    for (let i = 0; i < 6; i++) {
      const a = r() * Math.PI * 2;
      const d = r() * 0.28;
      const s = 0.12 + r() * 0.07;
      const col = ['#8fa6ff', '#b28cff', '#6fb4ff', '#d49cf0'][(r() * 4) | 0];
      ctx.b.inst(geo, white, x + Math.cos(a) * d, 0.55 + r() * 0.2, z + Math.sin(a) * d, s, s, s, col);
    }
  }
}

function mailbox(ctx, x, z) {
  const { b } = ctx;
  const red = toon(0xd8342f);
  b.box(toon(0x2b303b), x, CURB + 0.3, z, 0.12, 0.6, 0.12);
  b.box(red, x, CURB + 0.95, z, 0.46, 0.7, 0.4);
  b.box(red, x, CURB + 1.33, z, 0.5, 0.06, 0.44);
  b.box(toon(0x1a1d24), x, CURB + 1.12, z - 0.205, 0.3, 0.04, 0.01);
  b.box(toon(0xf2f2ee), x, CURB + 0.9, z - 0.205, 0.22, 0.12, 0.01);
}

function alley(ctx) {
  const { b } = ctx;
  // Propane cylinders, beer crates and a netted garbage station behind the store.
  for (const z of [-5.95, -6.3]) {
    b.cyl(toon(0xb9bfc9), 3.1, 0, z, 0.16, 1.0, 12);
    b.cyl(toon(0x7a808b), 3.1, 1.0, z, 0.07, 0.1, 8);
  }
  const crate = toon(0xf2c230);
  for (let i = 0; i < 4; i++) b.box(crate, -0.4 + (i % 2) * 0.46, 0.15 + ((i / 2) | 0) * 0.3, -5.8, 0.44, 0.28, 0.32);
  b.box(toon(0x2c6e4a), -2.3, 0.5, -5.1, 1.3, 1.0, 0.75);
  b.box(toon(0x3b8d5e), -2.3, 1.02, -5.1, 1.34, 0.04, 0.8);
  for (let i = 0; i < 3; i++) b.inst(new THREE.IcosahedronGeometry(1, 1), toon(0xffffff), -2.7 + i * 0.4, 0.2, -5.2, 0.22, 0.2, 0.22, '#e8ecf2');
  b.cyl(toon(0x3c6ab0), 1.0, 0, -4.8, 0.2, 0.45, 12, 0.24);
}

export function buildProps(ctx) {
  vendingMachine(ctx, -2.8, STORE.z1 + 0.42, 0xf5f7fb, 0x2c5fb8, 101);
  vendingMachine(ctx, -3.8, STORE.z1 + 0.42, 0xd8342f, 0xb71f1f, 202);
  bins(ctx, -5.7, STORE.z1 + 0.28, [
    ['もえるゴミ', '#c8332e'],
    ['かん・びん', '#2c5fb8'],
    ['ペットボトル', '#e0782c'],
  ]);
  umbrellaStand(ctx, DOOR.x1 + 0.45, STORE.z1 + 0.25);
  bicycle(ctx, 3.08, -0.2, 0.08);
  pylon(ctx, -4.8, ROAD.z0 - 1.25);
  blockWall(ctx);
  hydrangeas(ctx);
  mailbox(ctx, -6.8, NEAR_WALK.z0 + 0.7);
  alley(ctx);
}
