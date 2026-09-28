import { A, drip } from './layout.js';
import { box, group } from './kit.js';
import {
  barbedFence,
  barrelQuad,
  container,
  crate,
  leaningLadder,
  pallet,
  tire,
  truck,
} from './props.js';
import { addBulletPits } from './decals.js';

export function addTSpawn(root, mats) {
  const g = group(root, 0, 0, 0);

  barbedFence(g, mats, 0.05, 0, 5.18, 4.55, 0, 0.7);
  barbedFence(g, mats, -2.2, 0, 4.55, 1.35, Math.PI / 2, 0.7);
  barbedFence(g, mats, 2.32, 0, 4.72, 0.95, Math.PI / 2, 0.7);

  truck(g, mats, A.truck.x, 0, A.truck.z, 0.08);
  leaningLadder(g, mats, 0.72, A.truck.x + 0.55, 0, A.truck.z + 0.32, 0.42, -0.4);

  container(g, mats, mats.orange, 1.85, 0.5, 0.62, 1.15, 0.25, 4.62, 0);
  container(g, mats, mats.teal, 1.85, 0.5, 0.62, 1.15, 0.75, 4.62, 0.02);
  container(g, mats, mats.orange, 1.85, 0.5, 0.62, 1.15, 1.25, 4.62, -0.01);
  container(g, mats, mats.teal, 1.05, 0.5, 0.62, 2.18, 0.25, 4.58, 0.05);
  container(g, mats, mats.orange, 1.05, 0.5, 0.62, 2.18, 0.75, 4.58, 0.03);
  crate(g, mats, 1.62, 1.5, 4.55, 0.2);
  drip(1.9, 1.51, 4.92);
  drip(0.4, 1.51, 4.32);

  box(g, mats.darkConcrete, 2.15, 0.28, 1.35, 0.02, 0.08, 3.15);
  box(g, mats.asphalt, 2.05, 0.02, 1.4, 0.02, 0.22, 3.12, 0, -0.2);
  box(g, mats.wall, 0.14, 0.62, 1.45, -1.12, 0.31, 3.12);
  box(g, mats.wall, 0.22, 0.22, 0.28, -1.12, 0.18, 3.18);
  box(g, mats.darkConcrete, 0.2, 0.2, 0.26, -1.12, 0.42, 3.05);
  addBulletPits(g, mats.tex, -1.04, 0.4, 3.35, Math.PI / 2);

  barrelQuad(g, mats, -1.52, 0, 3.28);
  pallet(g, mats, -1.95, 0, 2.95, 0.2);
  pallet(g, mats, -1.82, 0.07, 2.95, -0.1);
  crate(g, mats, -1.55, 0, 2.62, 0.24, 0.3);
  tire(g, mats, 1.05, 0, 3.55, Math.PI / 2);

  box(g, mats.wall, 0.16, 0.85, 1.15, 1.18, 0.42, 3.35);
  return g;
}
