import {
  ConeGeometry,
  Mesh,
  MeshBasicMaterial,
} from 'three';
import { box, cyl, group, ladder, leaningLadder, ribbedBox, sphere } from './kit.js';
import { drip } from './layout.js';

export function crate(parent, mats, x, y, z, s = 0.28, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.wood, s, s, s, 0, s / 2, 0);
  box(root, mats.wood, s + 0.01, 0.02, s + 0.01, 0, s, 0);
  box(root, mats.wood, s + 0.01, 0.02, s + 0.01, 0, 0.012, 0);
  return root;
}

export function crateStack(parent, mats, x, y, z, count = 2, s = 0.28, ry = 0) {
  const root = group(parent, x, y, z, ry);
  for (let i = 0; i < count; i += 1) {
    crate(root, mats, (i % 2) * 0.03, i * s, 0, s, i * 0.08);
  }
  return root;
}

export function barrel(parent, mats, x, y, z, color = 'blue') {
  const mat = color === 'blue' ? mats.blue : color === 'red' ? mats.red : mats.rust;
  const root = group(parent, x, y, z);
  cyl(root, mat, 0.11, 0.32, 0, 0.16, 0, 0, 12);
  cyl(root, mats.rust, 0.115, 0.02, 0, 0.31, 0, 0, 12);
  cyl(root, mats.rust, 0.115, 0.02, 0, 0.16, 0, 0, 12);
  cyl(root, mats.rust, 0.115, 0.02, 0, 0.02, 0, 0, 12);
  return root;
}

export function barrelQuad(parent, mats, x, y, z) {
  const root = group(parent, x, y, z);
  barrel(root, mats, -0.13, 0, -0.13);
  barrel(root, mats, 0.13, 0, -0.13);
  barrel(root, mats, -0.13, 0, 0.13);
  barrel(root, mats, 0.13, 0, 0.13, 'red');
  return root;
}

export function pallet(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.wood, 0.52, 0.03, 0.38, 0, 0.05, 0);
  box(root, mats.wood, 0.52, 0.03, 0.06, 0, 0.018, 0.16);
  box(root, mats.wood, 0.52, 0.03, 0.06, 0, 0.018, 0);
  box(root, mats.wood, 0.52, 0.03, 0.06, 0, 0.018, -0.16);
  return root;
}

export function cardboardStack(parent, mats, x, y, z, n = 3, ry = 0) {
  const root = group(parent, x, y, z, ry);
  for (let i = 0; i < n; i += 1) {
    box(root, mats.cardboard, 0.3 - i * 0.02, 0.08, 0.22, i * 0.02, 0.05 + i * 0.08, i * 0.015);
  }
  return root;
}

export function tire(parent, mats, x, y, z, rx = Math.PI / 2) {
  const root = group(parent, x, y, z);
  const t = cyl(root, mats.rubber, 0.12, 0.07, 0, 0.12, 0, 0, 12);
  t.rotation.x = rx;
  cyl(root, mats.black, 0.05, 0.08, 0, 0.12, 0, 0, 10).rotation.x = rx;
  return root;
}

export function tireStack(parent, mats, x, y, z, n = 3) {
  const root = group(parent, x, y, z);
  for (let i = 0; i < n; i += 1) {
    tire(root, mats, 0, i * 0.075, 0, 0);
  }
  return root;
}

export function jersey(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.concrete, 0.72, 0.34, 0.2, 0, 0.17, 0);
  box(root, mats.concrete, 0.78, 0.1, 0.24, 0, 0.05, 0);
  box(root, mats.barrier, 0.72, 0.04, 0.04, 0, 0.3, 0.09);
  return root;
}

export function plasticBarrier(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.plastic, 0.62, 0.28, 0.12, 0, 0.16, 0);
  box(root, mats.red, 0.62, 0.04, 0.13, 0, 0.3, 0);
  return root;
}

export function bollard(parent, mats, x, y, z) {
  const root = group(parent, x, y, z);
  cyl(root, mats.concrete, 0.08, 0.28, 0, 0.14, 0, 0, 8);
  cyl(root, mats.barrier, 0.082, 0.04, 0, 0.18, 0, 0, 8);
  return root;
}

export function industrialBin(parent, mats, x, y, z, lidded = true, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.tin, 0.28, 0.34, 0.22, 0, 0.17, 0);
  if (lidded) box(root, mats.rust, 0.3, 0.03, 0.24, 0.01, 0.35, 0, 0, 0.15);
  box(root, mats.black, 0.04, 0.08, 0.04, 0.1, 0.3, 0.12);
  drip(x, 0.36, z);
  return root;
}

export function sack(parent, mats, x, y, z) {
  const root = group(parent, x, y, z);
  cyl(root, mats.sand, 0.09, 0.16, 0, 0.08, 0, 0, 8);
  box(root, mats.sand, 0.1, 0.04, 0.1, 0, 0.17, 0);
  return root;
}

export function forklift(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.orange, 0.38, 0.16, 0.22, 0, 0.16, 0);
  box(root, mats.orange, 0.16, 0.18, 0.2, -0.08, 0.32, 0);
  box(root, mats.black, 0.12, 0.08, 0.2, -0.1, 0.42, 0);
  box(root, mats.rust, 0.02, 0.36, 0.03, 0.2, 0.28, 0.06);
  box(root, mats.rust, 0.02, 0.36, 0.03, 0.2, 0.28, -0.06);
  box(root, mats.rust, 0.28, 0.02, 0.12, 0.32, 0.08, 0);
  cyl(root, mats.black, 0.06, 0.06, 0.12, 0.06, 0.12, 0, 8).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.06, 0.06, 0.12, 0.06, -0.12, 0, 8).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.07, 0.06, -0.12, 0.07, 0.12, 0, 8).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.07, 0.06, -0.12, 0.07, -0.12, 0, 8).rotation.z = Math.PI / 2;
  return root;
}

export function rack(parent, mats, x, y, z, tiers = 5, w = 0.9, d = 0.28, ry = 0) {
  const root = group(parent, x, y, z, ry);
  const h = 0.22 * tiers + 0.08;
  box(root, mats.rust, 0.03, h, 0.03, -w / 2, h / 2, -d / 2);
  box(root, mats.rust, 0.03, h, 0.03, w / 2, h / 2, -d / 2);
  box(root, mats.rust, 0.03, h, 0.03, -w / 2, h / 2, d / 2);
  box(root, mats.rust, 0.03, h, 0.03, w / 2, h / 2, d / 2);
  for (let i = 0; i < tiers; i += 1) {
    const py = 0.1 + i * 0.22;
    box(root, mats.rust, w, 0.02, d, 0, py, 0);
    if (i % 2 === 0) crate(root, mats, -w * 0.22, py, 0, 0.16);
    else cardboardStack(root, mats, w * 0.18, py, 0, 2);
  }
  return root;
}

export function container(parent, mats, mat, w, h, d, x, y, z, ry = 0, dripEdge = true) {
  const root = ribbedBox(parent, mat, w, h, d, x, y, z, 7, 'z', ry);
  box(root, mats.black, 0.02, h * 0.92, 0.01, w * 0.12, 0, d / 2 + 0.006);
  box(root, mats.rust, 0.08, 0.04, 0.04, -w / 2 + 0.06, h / 2 - 0.04, d / 2);
  box(root, mats.rust, 0.08, 0.04, 0.04, w / 2 - 0.06, h / 2 - 0.04, d / 2);
  if (dripEdge) {
    drip(x + w * 0.3, y + h / 2 + 0.02, z + d / 2);
    drip(x - w * 0.2, y + h / 2 + 0.02, z - d / 2);
  }
  return root;
}

export function truck(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.rust, 0.95, 0.42, 0.48, 0.22, 0.46, 0);
  box(root, mats.orange, 0.42, 0.38, 0.46, -0.48, 0.48, 0);
  box(root, mats.glass, 0.02, 0.16, 0.36, -0.7, 0.56, 0);
  box(root, mats.black, 0.16, 0.08, 0.48, -0.58, 0.72, 0);
  cyl(root, mats.black, 0.11, 0.1, 0.42, 0.11, 0.22, 0, 10).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.11, 0.1, 0.42, 0.11, -0.22, 0, 10).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.11, 0.1, -0.42, 0.11, 0.22, 0, 10).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.11, 0.1, -0.42, 0.11, -0.22, 0, 10).rotation.z = Math.PI / 2;
  box(root, mats.rust, 0.08, 0.06, 0.16, -0.72, 0.22, 0);
  drip(x + 0.5, 0.7, z + 0.24);
  return root;
}

export function policeVan(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.police, 0.95, 0.38, 0.44, 0, 0.42, 0);
  box(root, mats.barrier, 0.95, 0.05, 0.45, 0, 0.58, 0);
  box(root, mats.police, 0.34, 0.2, 0.42, -0.28, 0.7, 0);
  box(root, mats.glass, 0.02, 0.14, 0.34, -0.46, 0.7, 0);
  box(root, mats.glass, 0.18, 0.12, 0.01, -0.22, 0.7, 0.22);
  const bar = group(root, 0.08, 0.82, 0);
  box(bar, mats.emissiveRed, 0.28, 0.05, 0.16, 0, 0, 0);
  box(bar, mats.emissiveCold, 0.1, 0.04, 0.14, 0, 0.02, 0);
  cyl(root, mats.black, 0.1, 0.09, 0.3, 0.1, 0.2, 0, 10).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.1, 0.09, 0.3, 0.1, -0.2, 0, 10).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.1, 0.09, -0.3, 0.1, 0.2, 0, 10).rotation.z = Math.PI / 2;
  cyl(root, mats.black, 0.1, 0.09, -0.3, 0.1, -0.2, 0, 10).rotation.z = Math.PI / 2;
  drip(x + 0.3, 0.72, z + 0.22);
  root.userData.lightBar = bar;
  return root;
}

export function bicycle(parent, mats, x, y, z, ry = 0.4) {
  const root = group(parent, x, y, z, ry);
  cyl(root, mats.black, 0.09, 0.02, 0.16, 0.09, 0, 0, 10).rotation.x = Math.PI / 2;
  cyl(root, mats.black, 0.09, 0.02, -0.16, 0.09, 0, 0, 10).rotation.x = Math.PI / 2;
  box(root, mats.rust, 0.3, 0.015, 0.015, 0, 0.2, 0, 0, 0.4);
  box(root, mats.rust, 0.22, 0.015, 0.015, 0.02, 0.14, 0, 0, -0.5);
  box(root, mats.black, 0.08, 0.02, 0.04, 0.02, 0.22, 0);
  box(root, mats.black, 0.12, 0.01, 0.01, 0.16, 0.24, 0);
  return root;
}

export function cafeSet(parent, mats, x, y, z) {
  const root = group(parent, x, y, z);
  box(root, mats.rust, 0.34, 0.04, 0.34, 0.08, 0.08, 0, 0, 1.15);
  box(root, mats.rust, 0.03, 0.22, 0.03, 0.18, 0.02, 0.1);
  box(root, mats.rust, 0.16, 0.03, 0.16, -0.2, 0.05, 0.12, 0.6, 1.2);
  box(root, mats.rust, 0.02, 0.18, 0.02, -0.16, 0.02, 0.18);
  return root;
}

export function acUnit(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.tin, 0.28, 0.22, 0.16, 0, 0.2, 0);
  box(root, mats.black, 0.22, 0.16, 0.02, 0, 0.2, 0.08);
  box(root, mats.rust, 0.06, 0.04, 0.08, 0.16, 0.08, 0);
  return root;
}

export function sortingTable(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.tin, 0.55, 0.03, 0.32, 0, 0.32, 0);
  box(root, mats.rust, 0.03, 0.32, 0.03, -0.24, 0.16, -0.13);
  box(root, mats.rust, 0.03, 0.32, 0.03, 0.24, 0.16, -0.13);
  box(root, mats.rust, 0.03, 0.32, 0.03, -0.24, 0.16, 0.13);
  box(root, mats.rust, 0.03, 0.32, 0.03, 0.24, 0.16, 0.13);
  return root;
}

export function desk(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.wood, 0.46, 0.03, 0.26, 0, 0.28, 0);
  box(root, mats.wood, 0.03, 0.28, 0.24, -0.2, 0.14, 0);
  box(root, mats.wood, 0.03, 0.28, 0.24, 0.2, 0.14, 0);
  return root;
}

export function chair(parent, mats, x, y, z, fallen = false, ry = 0) {
  const root = group(parent, x, y, z, ry);
  if (fallen) root.rotation.z = 1.2;
  box(root, mats.wood, 0.16, 0.02, 0.16, 0, 0.18, 0);
  box(root, mats.wood, 0.16, 0.16, 0.02, 0, 0.26, -0.07);
  box(root, mats.wood, 0.02, 0.18, 0.02, -0.06, 0.09, 0.06);
  box(root, mats.wood, 0.02, 0.18, 0.02, 0.06, 0.09, 0.06);
  return root;
}

export function locker(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.tin, 0.22, 0.48, 0.16, 0, 0.24, 0);
  box(root, mats.black, 0.01, 0.44, 0.01, 0, 0.24, 0.082);
  box(root, mats.rust, 0.02, 0.04, 0.02, 0.08, 0.24, 0.085);
  return root;
}

export function radioCanPaper(parent, mats, x, y, z) {
  const root = group(parent, x, y, z);
  box(root, mats.black, 0.06, 0.03, 0.04, -0.08, 0.02, 0);
  cyl(root, mats.red, 0.025, 0.05, 0.06, 0.03, 0.02, 0, 8);
  box(root, mats.paper, 0.12, 0.004, 0.08, 0.02, 0.004, -0.05, 0.4);
  return root;
}

export function gearCrate(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.wood, 0.34, 0.16, 0.22, 0, 0.08, 0);
  box(root, mats.cloth, 0.14, 0.05, 0.12, -0.04, 0.18, 0);
  sphere(root, mats.darkConcrete, 0.055, 0.1, 0.2, 0, 8);
  return root;
}

export function riotShield(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.police, 0.18, 0.32, 0.02, 0, 0.2, 0);
  box(root, mats.glass, 0.12, 0.1, 0.01, 0, 0.26, 0.012);
  box(root, mats.barrier, 0.18, 0.03, 0.025, 0, 0.06, 0);
  return root;
}

export function searchlightRig(parent, mats, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  cyl(root, mats.rust, 0.03, 0.42, 0, 0.21, 0, 0, 8);
  const head = group(root, 0, 0.46, 0.04);
  cyl(head, mats.black, 0.08, 0.1, 0, 0, 0, 0, 10).rotation.x = Math.PI / 2;
  cyl(head, mats.emissiveWarm, 0.06, 0.02, 0, 0, 0.06, 0, 10).rotation.x = Math.PI / 2;
  const beamMat = new MeshBasicMaterial({
    color: 0xffe6b0,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
  });
  beamMat.userData.outlineParameters = { visible: false, keepAlive: true };
  const beam = new Mesh(new ConeGeometry(0.55, 2.4, 12, 1, true), beamMat);
  beam.position.set(0, 0, 1.25);
  beam.rotation.x = Math.PI / 2;
  head.add(beam);
  root.userData.head = head;
  return root;
}

export function streetLampPost(parent, mats, x, y, z) {
  const root = group(parent, x, y, z);
  cyl(root, mats.black, 0.035, 1.42, 0, 0.71, 0, 0, 8);
  box(root, mats.black, 0.36, 0.03, 0.03, 0.12, 1.4, 0);
  const lamp = box(root, mats.emissiveWarm, 0.12, 0.08, 0.12, 0.28, 1.34, 0);
  sphere(root, mats.emissiveWarm, 0.09, 0.28, 1.3, 0, 8);
  drip(x + 0.12, 1.42, z);
  root.userData.lamp = lamp;
  return root;
}

export function pole(parent, mats, x, y, z, h = 2.15) {
  const root = group(parent, x, y, z);
  cyl(root, mats.rust, 0.04, h, 0, h / 2, 0, 0, 8);
  box(root, mats.black, 0.7, 0.03, 0.03, 0.2, h - 0.08, 0);
  box(root, mats.black, 0.03, 0.18, 0.03, 0, h + 0.02, 0);
  drip(x, h, z);
  return root;
}

export function gutter(parent, mats, x, y, z, len, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mats.rust, len, 0.03, 0.05, 0, 0, 0);
  box(root, mats.rust, 0.03, 0.08, 0.03, -len / 2, -0.03, 0);
  box(root, mats.rust, 0.03, 0.08, 0.03, len / 2, -0.03, 0);
  drip(x, y, z);
  drip(x + Math.cos(ry) * (len * 0.35), y, z + Math.sin(ry) * (len * 0.35));
  return root;
}

export function barbedFence(parent, mats, x, y, z, len, ry = 0, h = 0.72) {
  const root = group(parent, x, y, z, ry);
  const posts = Math.max(2, Math.round(len / 0.55));
  for (let i = 0; i < posts; i += 1) {
    const px = -len / 2 + (i * len) / Math.max(1, posts - 1);
    box(root, mats.rust, 0.03, h, 0.03, px, h / 2, 0);
  }
  box(root, mats.rust, len, 0.012, 0.012, 0, h * 0.28, 0);
  box(root, mats.rust, len, 0.012, 0.012, 0, h * 0.58, 0);
  box(root, mats.rust, len, 0.012, 0.012, 0, h * 0.88, 0);
  for (let i = 0; i < posts; i += 1) {
    const px = -len / 2 + (i * len) / Math.max(1, posts - 1);
    cyl(root, mats.rust, 0.03, 0.012, px, h + 0.02, 0, 0, 6);
  }
  return root;
}

export { ladder, leaningLadder };
