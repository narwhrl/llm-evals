import { A, drip, hooks, vent } from './layout.js';
import { box, group, ladder } from './kit.js';
import {
  bicycle,
  cafeSet,
  chair,
  cardboardStack,
  crate,
  desk,
  gutter,
  industrialBin,
  locker,
  pallet,
  radioCanPaper,
  streetLampPost,
} from './props.js';
import { addBombMark, hangingRoster, newspaper } from './decals.js';

export function addBSite(root, mats) {
  const g = group(root, 0, 0, 0);
  const cx = A.bHouse.x;
  const cz = A.bHouse.z;

  box(g, mats.tin, 1.62, 0.88, 0.08, cx, 0.44, cz + 0.68);
  box(g, mats.tin, 1.62, 0.88, 0.08, cx, 0.44, cz - 0.68);
  box(g, mats.tin, 0.08, 0.88, 1.36, cx - 0.77, 0.44, cz);
  box(g, mats.tin, 0.08, 0.88, 1.36, cx + 0.77, 0.44, cz);
  box(g, mats.tin, 1.7, 0.06, 1.48, cx, 0.9, cz);

  box(g, mats.tin, 1.55, 0.82, 0.08, cx, 1.32, cz + 0.64);
  box(g, mats.tin, 1.55, 0.82, 0.08, cx, 1.32, cz - 0.64);
  box(g, mats.tin, 0.08, 0.82, 1.28, cx - 0.74, 1.32, cz);
  box(g, mats.tin, 0.08, 0.82, 1.28, cx + 0.74, 1.32, cz);
  box(g, mats.tin, 1.68, 0.06, 0.28, cx, 1.76, cz + 0.57);
  box(g, mats.tin, 1.68, 0.06, 0.28, cx, 1.76, cz - 0.57);
  box(g, mats.tin, 0.28, 0.06, 1.42, cx - 0.7, 1.76, cz);
  box(g, mats.tin, 0.28, 0.06, 1.42, cx + 0.7, 1.76, cz);
  gutter(g, mats, cx, 1.8, cz + 0.72, 1.6, 0);
  drip(cx + 0.6, 1.8, cz + 0.72);
  vent(cx + 0.4, 1.84, cz - 0.2);

  box(g, mats.wood, 0.32, 0.62, 0.04, cx - 0.15, 0.32, cz - 0.7, 0.15);
  box(g, mats.wood, 0.32, 0.62, 0.04, cx + 0.1, 0.32, cz + 0.7, -0.25);
  const glassF = box(g, mats.rainGlass, 0.36, 0.28, 0.02, cx + 0.42, 0.52, cz - 0.7);
  const glassB = box(g, mats.rainGlass, 0.3, 0.24, 0.02, cx - 0.42, 0.55, cz + 0.7);
  hooks.glasses.push(glassF, glassB);

  box(g, mats.tin, 0.7, 0.05, 0.42, cx - 0.15, 1.18, cz - 0.88);
  box(g, mats.rust, 0.03, 0.22, 0.42, cx - 0.48, 1.3, cz - 0.88);
  box(g, mats.rust, 0.03, 0.22, 0.42, cx + 0.18, 1.3, cz - 0.88);
  box(g, mats.rust, 0.7, 0.03, 0.03, cx - 0.15, 1.42, cz - 1.08);
  box(g, mats.glass, 0.18, 0.14, 0.02, cx - 0.2, 1.38, cz - 0.66);
  ladder(g, mats, 1.18, cx - 0.72, 0, cz - 0.55, 0.15, 0.18);

  desk(g, mats, cx - 0.15, 0, cz + 0.05, 0.2);
  chair(g, mats, cx + 0.22, 0, cz - 0.15, true, 0.8);
  locker(g, mats, cx + 0.52, 0, cz + 0.35, -0.2);
  radioCanPaper(g, mats, cx - 0.1, 0.3, cz + 0.02);
  hangingRoster(g, mats.tex, cx - 0.72, 0.58, cz + 0.15, Math.PI / 2);
  newspaper(g, mats.tex, cx + 0.05, 0.31, cz + 0.12, 0.3);
  box(g, mats.emissiveWarm, 0.28, 0.03, 0.05, cx, 0.82, cz);
  box(g, mats.black, 0.3, 0.02, 0.06, cx, 0.84, cz);

  addBombMark(g, mats.tex, 'B', A.bSite.x, A.bSite.z);
  pallet(g, mats, 3.55, 0, 1.35, 0.3);
  pallet(g, mats, 2.55, 0, 2.15, -0.2);
  crate(g, mats, 2.58, 0.07, 2.15, 0.22, 0.2);
  industrialBin(g, mats, 3.75, 0, 2.15, true, 0.4);
  industrialBin(g, mats, 2.42, 0, 1.35, false, -0.2);
  bicycle(g, mats, 3.55, 0, 2.35, 0.7);
  cafeSet(g, mats, 2.55, 0, 1.55);
  cardboardStack(g, mats, 3.35, 0, 1.15, 2);

  const lamp = streetLampPost(g, mats, A.lamp.x, 0, A.lamp.z);
  hooks.streetLampHalo = lamp;
  const halo = box(g, mats.emissiveWarm, 0.55, 0.02, 0.55, A.lamp.x + 0.28, 0.018, A.lamp.z);
  halo.material = halo.material.clone();
  halo.material.transparent = true;
  halo.material.opacity = 0.35;
  halo.material.userData.outlineParameters = { visible: false, keepAlive: true };

  box(g, mats.darkConcrete, 0.85, 0.32, 0.14, 2.85, 0.16, -0.55);
  crate(g, mats, 2.55, 0, -0.75, 0.2);

  box(g, mats.wall, 0.14, 1.15, 1.35, 5.08, 0.57, 2.4);
  box(g, mats.wall, 1.6, 1.15, 0.12, 4.4, 0.57, 4.55);

  return g;
}
