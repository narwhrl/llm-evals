import { drip, hooks, vent } from './layout.js';
import { box, group } from './kit.js';
import { crate, crateStack, gutter } from './props.js';
import { roadSignFace } from './decals.js';

function booth(parent, mats, x, z, ry) {
  const b = group(parent, x, 0, z, ry);
  box(b, mats.wall, 0.62, 0.08, 0.52, 0, 0.04, 0);
  box(b, mats.wall, 0.62, 0.72, 0.06, 0, 0.44, -0.23);
  box(b, mats.wall, 0.06, 0.72, 0.52, -0.28, 0.44, 0);
  box(b, mats.wall, 0.06, 0.72, 0.52, 0.28, 0.44, 0);
  box(b, mats.tin, 0.66, 0.05, 0.56, 0, 0.82, 0);
  gutter(b, mats, 0, 0.86, 0.26, 0.6, 0);
  const glass = box(b, mats.rainGlass, 0.5, 0.32, 0.02, 0, 0.58, 0.24);
  hooks.glasses.push(glass);
  box(b, mats.black, 0.32, 0.08, 0.16, 0, 0.32, -0.05);
  box(b, mats.black, 0.08, 0.1, 0.08, 0.08, 0.4, -0.02);
  box(b, mats.wood, 0.14, 0.16, 0.14, -0.12, 0.2, 0.05);
  vent(x, 0.9, z);
  drip(x, 0.88, z + 0.26);
  return b;
}

export function addMidLane(root, mats) {
  const g = group(root, 0, 0, 0);

  box(g, mats.wall, 0.18, 1.28, 3.35, -1.18, 0.64, 0.15);
  box(g, mats.wall, 0.18, 1.28, 3.35, 1.18, 0.64, 0.15);

  box(g, mats.darkConcrete, 0.22, 0.18, 0.28, -1.18, 1.22, 0.55);
  box(g, mats.darkConcrete, 0.22, 0.18, 0.28, 1.18, 1.22, 0.55);
  box(g, mats.black, 0.2, 0.14, 0.22, -1.18, 1.22, 0.55);
  box(g, mats.black, 0.2, 0.14, 0.22, 1.18, 1.22, 0.55);

  box(g, mats.concrete, 0.7, 0.08, 1.85, -1.72, 0.98, 0.45);
  box(g, mats.concrete, 0.7, 0.08, 1.85, 1.72, 0.98, 0.45);
  box(g, mats.concrete, 0.16, 0.98, 1.85, -2.02, 0.49, 0.45);
  box(g, mats.concrete, 0.16, 0.98, 1.85, 2.02, 0.49, 0.45);
  box(g, mats.rust, 0.08, 1.05, 0.08, -1.55, 0.52, -0.4);
  box(g, mats.rust, 0.08, 1.05, 0.08, 1.55, 0.52, -0.4);
  box(g, mats.rust, 0.08, 0.08, 1.85, -1.55, 1.02, 0.45);
  box(g, mats.rust, 0.08, 0.08, 1.85, 1.55, 1.02, 0.45);

  const leftDoor = box(g, mats.rust, 0.08, 1.35, 0.72, -0.42, 0.68, 0.32, 0.55);
  const rightDoor = box(g, mats.rust, 0.08, 1.35, 0.72, 0.48, 0.68, 0.38, -0.72);
  leftDoor.rotation.y = 0.55;
  rightDoor.rotation.y = -0.72;
  box(g, mats.black, 0.1, 1.38, 0.08, -1.02, 0.7, 0.32);
  box(g, mats.black, 0.1, 1.38, 0.08, 1.02, 0.7, 0.32);

  box(g, mats.darkConcrete, 1.55, 0.38, 0.16, 0, 0.19, -2.22);
  crateStack(g, mats, -0.45, 0, -2.48, 2, 0.22, 0.1);
  crate(g, mats, 0.42, 0, -2.5, 0.2, 0.3);
  box(g, mats.rust, 0.03, 0.55, 0.03, 0.72, 0.28, -2.42);
  roadSignFace(g, mats.tex, 0.72, 0.58, -2.4, 0.35);

  booth(g, mats, -1.88, 1.82, 0.15);
  booth(g, mats, 1.88, 1.82, -0.15);

  box(g, mats.darkConcrete, 0.46, 0.42, 3.35, 0.72, -0.28, -0.2);
  box(g, mats.darkConcrete, 0.46, 0.08, 3.35, 0.72, -0.05, -0.2);
  box(g, mats.rust, 0.42, 0.02, 0.42, 0.55, 0.02, 2.55);
  box(g, mats.rust, 0.08, 0.02, 0.42, 0.55, 0.03, 2.55);
  box(g, mats.rust, 0.42, 0.02, 0.08, 0.55, 0.03, 2.55);
  box(g, mats.rust, 0.42, 0.02, 0.42, 1.62, 0.02, -3.28);
  box(g, mats.black, 0.08, 0.12, 0.08, 0.55, 0.08, 2.72);
  box(g, mats.emissiveWarm, 0.05, 0.04, 0.05, 0.72, -0.12, 1.4);
  box(g, mats.emissiveWarm, 0.05, 0.04, 0.05, 0.72, -0.12, -1.6);

  box(g, mats.wall, 0.5, 0.55, 0.08, -1.35, 0.28, 2.55);
  box(g, mats.wall, 0.5, 0.55, 0.08, 1.35, 0.28, 2.55);

  return g;
}
