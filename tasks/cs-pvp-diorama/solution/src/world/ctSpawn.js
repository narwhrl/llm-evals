import { A, drip, hooks } from './layout.js';
import { box, group, steps } from './kit.js';
import { wallDecal } from './decals.js';
import {
  barbedFence,
  crate,
  gearCrate,
  jersey,
  plasticBarrier,
  policeVan,
  riotShield,
  searchlightRig,
} from './props.js';

export function addCTSpawn(root, mats) {
  const g = group(root, 0, 0, 0);

  box(g, mats.wall, 5.15, 1.32, 0.16, 0.05, 0.66, -5.18);
  box(g, mats.wall, 0.16, 1.32, 1.85, -2.5, 0.66, -4.3);
  box(g, mats.wall, 0.16, 1.32, 1.15, 2.55, 0.66, -4.65);
  barbedFence(g, mats, -2.48, 0, -3.55, 1.1, Math.PI / 2, 0.55);

  jersey(g, mats, -0.95, 0, -3.52, 0.08);
  jersey(g, mats, 0.05, 0, -3.48, -0.05);
  jersey(g, mats, 0.95, 0, -3.55, 0.12);
  plasticBarrier(g, mats, -1.55, 0, -3.72, 0.2);
  riotShield(g, mats, -0.45, 0, -3.32, 0.15);
  riotShield(g, mats, 0.55, 0, -3.28, -0.1);

  policeVan(g, mats, A.van.x, 0, A.van.z, 0.18);
  wallDecal(g, mats.tex.policeSign, 0.42, 0.16, A.van.x + 0.05, 0.5, A.van.z + 0.24, 0.18, 0.95);

  box(g, mats.concrete, 1.85, 0.68, 2.55, A.platform.x, 0.34, A.platform.z);
  box(g, mats.concrete, 1.95, 0.08, 2.65, A.platform.x, 0.7, A.platform.z);
  steps(g, mats.concrete, 6, 0.16, 0.115, 0.42, 1.35, 0, -4.55, 0);
  box(g, mats.rust, 0.03, 0.32, 0.9, 1.12, 0.86, -3.7);
  box(g, mats.rust, 1.7, 0.03, 0.03, A.platform.x, 0.88, -2.32);

  const rig = searchlightRig(g, mats, A.search.x, 0.7, A.search.z, 0.4);
  hooks.searchHead = rig.userData.head;
  if (hooks.searchHead) hooks.searchHead.rotation.x = -0.35;

  gearCrate(g, mats, -0.15, 0, -4.85, 0.2);
  gearCrate(g, mats, 0.28, 0, -4.72, -0.15);
  crate(g, mats, 0.85, 0, -4.55, 0.2, 0.3);

  box(g, mats.darkConcrete, 1.35, 0.12, 0.7, -0.2, 0.06, -3.95);

  drip(-2.4, 1.32, -5.1);
  drip(2.2, 1.32, -5.1);
  return g;
}
