import * as THREE from 'three';
import { range } from '../core/rng.js';
import { decal, cardboardPile, newspaperScatter } from './basic.js';

// Interior dressing: office, sorting line, pallet jack, street furniture.

export function desk(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  k.box('paint', [0, 0.74, 0], [1.5, 0.05, 0.75], { tint: 0x7a6a52 });
  for (const sx of [-0.7, 0.7]) for (const sz of [-0.33, 0.33]) k.box('darkMetal', [sx, 0, sz], [0.05, 0.74, 0.05]);
  k.box('paint', [0.45, 0.25, 0], [0.5, 0.48, 0.7], { tint: 0x6e7278 });
  // old two-way radio, empty coffee cans, newspaper
  k.box('darkMetal', [-0.4, 0.79, 0.1], [0.12, 0.22, 0.07], { rot: [0, 0.3, 0], tint: 0x2a2c30 });
  k.rod('darkMetal', [-0.42, 1.0, 0.1], [-0.42, 1.18, 0.1], 0.008);
  k.cyl('paint', [0.1, 0.79, -0.15], 0.05, 0.13, { seg: 8, tint: 0xb83a2a });
  k.cyl('paint', [0.3, 0.79, 0.12], 0.05, 0.13, { seg: 8, tint: 0xc8c8c0, rot: [0, 0, Math.PI / 2] });
  decal(k, 'newspaper', [-0.1, 0.775, 0.05], 0.5, 0.5, 'up', { yaw: 0.4 });
  k.pop();
}

function chairParts(k) {
  k.box('paint', [0, 0.45, 0], [0.5, 0.07, 0.48], { tint: 0x2a2c30 });
  k.box('paint', [0, 0.52, -0.22], [0.48, 0.5, 0.06], { tint: 0x2a2c30 });
  k.cyl('darkMetal', [0, 0.1, 0], 0.03, 0.36, { seg: 6 });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    k.rod('darkMetal', [0, 0.08, 0], [Math.cos(a) * 0.3, 0.04, Math.sin(a) * 0.3], 0.02);
  }
}

// Office chair knocked onto its back.
export function toppledChair(k, x, y, z, rot) {
  k.push([x, y + 0.26, z], rot, -Math.PI / 2 + 0.15);
  chairParts(k);
  k.pop();
}

export function officeChair(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  chairParts(k);
  k.pop();
}

export function locker(k, x, y, z, rot, n = 2) {
  k.push([x, y, z], rot);
  for (let i = 0; i < n; i++) {
    const px = (i - (n - 1) / 2) * 0.5;
    k.box('paint', [px, 0, 0], [0.48, 1.85, 0.5], { tint: 0x5a6a62 });
    for (let s = 0; s < 3; s++) k.box('darkMetal', [px, 1.45 + s * 0.08, 0.255], [0.3, 0.025, 0.01]);
    k.box('darkMetal', [px + 0.16, 0.9, 0.26], [0.03, 0.12, 0.03]);
  }
  k.pop();
}

function ironChair(k) {
  k.box('darkMetal', [0, 0.44, 0], [0.42, 0.04, 0.42], { tint: 0x2a2e2e });
  for (const sx of [-0.18, 0.18]) for (const sz of [-0.18, 0.18]) k.rod('darkMetal', [sx, 0, sz], [sx, 0.44, sz], 0.018);
  for (let i = 0; i < 4; i++) k.rod('darkMetal', [-0.18 + i * 0.12, 0.46, -0.19], [-0.18 + i * 0.12, 0.92, -0.2], 0.014);
  k.rod('darkMetal', [-0.2, 0.92, -0.2], [0.2, 0.92, -0.2], 0.02);
}

// Wrought-iron cafe table on its side with two chairs, one knocked over.
export function ironSet(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  k.push([0, 0.4, 0], 0, 0, Math.PI / 2 - 0.1);
  k.cyl('darkMetal', [0, 0.72, 0], 0.4, 0.04, { seg: 16, tint: 0x2a2e2e });
  k.rod('darkMetal', [0, 0, 0], [0, 0.72, 0], 0.03);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    k.rod('darkMetal', [0, 0.02, 0], [Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3], 0.02);
  }
  k.pop();
  k.push([1.0, 0, 0.4], 0.6);
  ironChair(k);
  k.pop();
  k.push([-0.8, 0.22, 0.6], 2.2, Math.PI / 2 - 0.1);
  ironChair(k);
  k.pop();
  k.pop();
}

const WHEEL = new THREE.TorusGeometry(0.33, 0.025, 6, 20);
// Abandoned bicycle lying on its side.
export function bicycle(k, x, y, z, rot) {
  k.push([x, y + 0.05, z], rot, 0, Math.PI / 2 - 0.08);
  for (const wx of [-0.52, 0.52]) {
    k.geo('darkMetal', WHEEL, [wx, 0.33, 0], { tint: 0x1a1a1a });
    k.rod('darkMetal', [wx, 0.33, -0.03], [wx, 0.33, 0.03], 0.03);
  }
  const f = 0x2a6ab0;
  k.rod('paint', [-0.52, 0.33, 0], [-0.05, 0.33, 0], 0.02, { tint: f });
  k.rod('paint', [-0.05, 0.33, 0], [-0.15, 0.75, 0], 0.02, { tint: f });
  k.rod('paint', [-0.15, 0.75, 0], [0.42, 0.72, 0], 0.02, { tint: f });
  k.rod('paint', [-0.05, 0.33, 0], [0.42, 0.72, 0], 0.02, { tint: f });
  k.rod('paint', [-0.52, 0.33, 0], [-0.15, 0.75, 0], 0.016, { tint: f });
  k.rod('paint', [0.52, 0.33, 0], [0.42, 0.9, 0], 0.02, { tint: f });
  k.rod('darkMetal', [0.42, 0.9, -0.25], [0.42, 0.9, 0.25], 0.018);
  k.box('darkMetal', [-0.16, 0.78, 0], [0.24, 0.05, 0.1]);
  k.pop();
}

// Parcel sorting station: roller conveyor with burst boxes.
export function sortingTable(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  for (const sx of [-1.3, 1.3]) for (const sz of [-0.35, 0.35]) k.box('darkMetal', [sx, 0, sz], [0.07, 0.85, 0.07], { tint: 0x5a6068 });
  for (const sz of [-0.38, 0.38]) k.box('paint', [0, 0.8, sz], [2.8, 0.1, 0.06], { tint: 0xc8a02a });
  for (let i = 0; i < 18; i++) k.rod('metal', [-1.33 + i * 0.157, 0.84, -0.34], [-1.33 + i * 0.157, 0.84, 0.34], 0.03, { tint: 0xb8bcc0 });
  cardboardPile(k, -0.6, 0.87, 0, 0.3, 2);
  cardboardPile(k, 0.8, 0.87, 0, -0.4, 1);
  cardboardPile(k, 0.4, 0, 0.9, 0.2, 3);
  newspaperScatter(k, 0, 0, 0.8, 2, 0.8);
  k.pop();
}

// Manual pallet jack, forks along local +x.
export function palletJack(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  for (const sz of [-0.28, 0.28]) k.box('paint', [0.5, 0.04, sz], [1.15, 0.07, 0.16], { tint: 0xd89a1a });
  k.box('paint', [-0.12, 0.04, 0], [0.22, 0.42, 0.72], { tint: 0xc8321e });
  k.cyl('tire', [-0.12, 0, 0], 0.09, 0.3, { rot: [Math.PI / 2, 0, 0], seg: 10 });
  k.rod('darkMetal', [-0.15, 0.45, 0], [-0.62, 1.3, 0], 0.03);
  k.rod('darkMetal', [-0.62, 1.3, -0.2], [-0.62, 1.3, 0.2], 0.03);
  k.pop();
}

// Leaning discarded road sign.
export function roadSign(k, x, y, z, rot) {
  k.push([x, y, z], rot, 0.35);
  k.rod('darkMetal', [0, 0, 0], [0, 1.9, 0], 0.035);
  k.box('paint', [0, 1.35, 0.05], [0.7, 0.7, 0.03], { rot: [0, 0, Math.PI / 4], tint: 0xd8b41e });
  decal(k, 'hazard', [0, 1.55, 0.075], 0.6, 0.6, '+z');
  k.pop();
}

// Spare body-armour and helmet crates at the CT wall.
export function armorCrate(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  k.box('paint', [0, 0, 0], [1.2, 0.55, 0.7], { tint: 0x3a4a36 });
  k.box('paint', [0, 0.55, -0.32], [1.22, 0.06, 0.72], { rot: [-1.1, 0, 0], tint: 0x34422f });
  k.box('paint', [-0.2, 0.55, 0.05], [0.45, 0.14, 0.38], { tint: 0x2a3440 });
  const helmet = new THREE.SphereGeometry(0.16, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2);
  k.geo('paint', helmet, [0.32, 0.55, 0.05], { tint: 0x2e3a2e });
  k.pop();
}

// Sentry-booth control console with a faintly glowing screen, plus a chair.
export function console_(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  k.box('paint', [0, 0, 0], [1.4, 0.8, 0.55], { tint: 0x5c6468 });
  k.box('paint', [0, 0.8, -0.05], [1.4, 0.35, 0.45], { rot: [-0.45, 0, 0], tint: 0x4a5256 });
  k.box('screen', [-0.3, 0.9, 0.1], [0.4, 0.22, 0.02], { rot: [-0.45, 0, 0] });
  for (let i = 0; i < 5; i++) k.box('lampRed', [0.2 + i * 0.1, 0.86, 0.12], [0.04, 0.02, 0.04], { tint: i % 2 ? 0x30ff30 : 0xffffff });
  k.pop();
  officeChair(k, x + Math.sin(rot) * 0.8 + range(-0.1, 0.1), y, z + Math.cos(rot) * 0.8, rot + 2.6);
}
