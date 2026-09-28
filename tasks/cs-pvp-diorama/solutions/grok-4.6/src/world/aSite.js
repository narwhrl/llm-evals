import { A, drip, hooks, vent } from './layout.js';
import { box, cyl, group, ladder } from './kit.js';
import {
  acUnit,
  cardboardStack,
  crate,
  crateStack,
  forklift,
  gutter,
  industrialBin,
  rack,
  sack,
  sortingTable,
} from './props.js';
import { addBombMark, freightPlaque, newspaper } from './decals.js';

export function addASite(root, mats) {
  const g = group(root, 0, 0, 0);
  const cx = A.aHouse.x;
  const cz = A.aHouse.z;

  box(g, mats.wall, 2.95, 1.58, 0.14, cx, 0.79, cz + 1.22);
  box(g, mats.wall, 0.14, 1.58, 2.45, cx - 1.42, 0.79, cz);
  box(g, mats.wall, 2.95, 1.58, 0.14, cx, 0.79, cz - 1.22);
  box(g, mats.wall, 0.22, 1.58, 0.7, cx + 1.42, 0.79, cz + 0.88);
  box(g, mats.wall, 0.22, 1.58, 0.55, cx + 1.42, 0.79, cz - 0.95);

  box(g, mats.tin, 3.15, 0.08, 0.42, cx, 1.6, cz + 1.14);
  box(g, mats.tin, 3.15, 0.08, 0.42, cx, 1.6, cz - 1.14);
  box(g, mats.tin, 0.42, 0.08, 2.7, cx - 1.36, 1.6, cz);
  box(g, mats.tin, 0.42, 0.08, 2.7, cx + 1.36, 1.6, cz);
  box(g, mats.darkConcrete, 0.55, 0.04, 0.4, cx + 0.15, 1.62, cz + 0.1);
  gutter(g, mats, cx, 1.58, cz + 1.32, 2.9, 0);
  drip(cx + 1.2, 1.58, cz + 1.32);

  const shutter = group(g, cx + 1.48, 1.18, cz + 0.05);
  box(shutter, mats.rust, 0.05, 0.82, 1.42, 0, 0, 0);
  for (let i = 0; i < 10; i += 1) {
    box(shutter, mats.rust, 0.06, 0.05, 1.4, 0.01, -0.36 + i * 0.08, 0);
  }
  hooks.shutter = shutter;
  drip(cx + 1.5, 0.78, cz + 0.6);
  drip(cx + 1.5, 0.78, cz - 0.5);

  box(g, mats.wood, 0.04, 0.32, 0.36, cx - 0.55, 0.72, cz - 1.28);
  box(g, mats.wood, 0.04, 0.32, 0.36, cx + 0.35, 0.72, cz - 1.28);
  box(g, mats.wood, 0.38, 0.04, 0.04, cx - 0.55, 0.9, cz - 1.28);
  box(g, mats.wood, 0.38, 0.04, 0.04, cx + 0.35, 0.9, cz - 1.28);
  const door = box(g, mats.wood, 0.36, 0.72, 0.05, cx + 0.95, 0.36, cz - 1.18, -0.55);
  door.rotation.y = -0.7;

  box(g, mats.concrete, 2.7, 0.04, 2.2, cx, 0.02, cz);
  addBombMark(g, mats.tex, 'A', cx + 0.35, cz - 0.05);
  addBombMark(g, mats.tex, 'A', cx + 1.22, cz + 0.08);

  cyl(g, mats.concrete, 0.12, 1.45, cx - 0.05, 0.74, cz + 0.15, 0, 10);

  rack(g, mats, cx - 0.85, 0, cz + 0.85, 5, 1.15, 0.3, 0);
  crateStack(g, mats, cx + 0.75, 0, cz + 0.7, 3, 0.24, 0.2);
  crate(g, mats, cx + 0.55, 0, cz - 0.55, 0.26, 0.4);
  sack(g, mats, cx + 0.82, 0, cz - 0.72);
  sack(g, mats, cx + 0.95, 0, cz - 0.55);
  sack(g, mats, cx + 0.7, 0.15, cz - 0.62);
  forklift(g, mats, cx + 0.95, 0, cz + 0.15, -0.4);

  box(g, mats.tin, 1.15, 0.08, 1.05, cx - 0.85, 1.12, cz + 0.55);
  box(g, mats.tin, 1.15, 0.42, 0.08, cx - 0.85, 1.35, cz + 1.02);
  box(g, mats.tin, 0.08, 0.42, 1.05, cx - 1.38, 1.35, cz + 0.55);
  box(g, mats.tin, 0.08, 0.42, 1.05, cx - 0.32, 1.35, cz + 0.55);
  box(g, mats.glass, 0.22, 0.16, 0.03, cx - 0.28, 1.38, cz + 0.55);
  ladder(g, mats, 1.12, cx - 0.28, 0, cz + 0.15, 0, 0.18);
  crate(g, mats, cx - 0.95, 1.16, cz + 0.45, 0.16);

  sortingTable(g, mats, cx - 0.95, 0, cz - 0.75, 0.15);
  cardboardStack(g, mats, cx - 0.7, 0.32, cz - 0.7, 2);
  cardboardStack(g, mats, cx - 1.15, 0, cz - 0.95, 3);
  newspaper(g, mats.tex, cx - 0.55, 0.025, cz - 0.4, 0.6);
  newspaper(g, mats.tex, cx - 0.4, 0.025, cz - 0.55, -0.3);
  box(g, mats.plastic, 0.16, 0.01, 0.04, cx - 0.85, 0.02, cz - 0.45, 0.8);

  const rear = box(g, mats.rust, 0.06, 0.7, 0.32, cx - 1.28, 0.38, cz + 0.95, 0.35);
  rear.rotation.y = 0.45;
  box(g, mats.emissiveRed, 0.02, 0.12, 0.08, cx - 1.34, 0.42, cz + 1.05);

  acUnit(g, mats, cx + 0.15, 0, cz - 1.42, 0);
  freightPlaque(g, mats.tex, cx - 0.55, 0.85, cz - 1.3, 0);
  industrialBin(g, mats, cx + 0.85, 0, cz - 1.48, true, 0.2);

  box(g, mats.tin, 0.18, 0.12, 0.18, cx + 0.9, 1.68, cz + 0.7);
  vent(cx + 0.9, 1.74, cz + 0.7);
  vent(cx - 1.1, 1.66, cz - 0.2);

  box(g, mats.emissiveCold, 0.16, 0.04, 0.16, cx + 0.2, 1.54, cz);
  box(g, mats.emissiveCold, 0.12, 0.03, 0.12, cx - 0.7, 1.54, cz + 0.4);

  return g;
}
