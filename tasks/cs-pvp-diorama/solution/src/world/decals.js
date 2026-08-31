import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
} from 'three';
import { hooks } from './layout.js';
import { box, group } from './kit.js';

const markMat = new MeshBasicMaterial({ color: 0xf4f0e4 });
markMat.userData.outlineParameters = { visible: false, keepAlive: true };
const ringMat = new MeshBasicMaterial({ color: 0xe8e4d8 });
ringMat.userData.outlineParameters = { visible: false, keepAlive: true };

function letterA(parent, x, z) {
  const g = group(parent, x, 0, z);
  box(g, markMat, 0.06, 0.04, 0.42, -0.12, 0.03, 0, 0.35);
  box(g, markMat, 0.06, 0.04, 0.42, 0.12, 0.03, 0, -0.35);
  box(g, markMat, 0.16, 0.04, 0.06, 0, 0.03, 0.02);
  return g;
}

function letterB(parent, x, z) {
  const g = group(parent, x, 0, z);
  box(g, markMat, 0.06, 0.04, 0.4, -0.12, 0.03, 0);
  box(g, markMat, 0.18, 0.04, 0.06, 0.02, 0.03, 0.17);
  box(g, markMat, 0.16, 0.04, 0.06, 0.02, 0.03, 0);
  box(g, markMat, 0.18, 0.04, 0.06, 0.02, 0.03, -0.17);
  box(g, markMat, 0.06, 0.04, 0.16, 0.12, 0.03, 0.08);
  box(g, markMat, 0.06, 0.04, 0.16, 0.12, 0.03, -0.08);
  return g;
}

function decal(parent, map, w, h, x, y, z, rx, ry, opacity = 0.88) {
  const mat = new MeshBasicMaterial({
    map,
    transparent: true,
    opacity,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  mat.userData.outlineParameters = { visible: false, keepAlive: true };
  const mesh = new Mesh(new PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, 0);
  mesh.renderOrder = 2;
  parent.add(mesh);
  return mesh;
}

export function wallDecal(parent, map, w, h, x, y, z, ry = 0, opacity = 0.86) {
  return decal(parent, map, w, h, x, y, z, 0, ry, opacity);
}

export function floorDecal(parent, map, w, h, x, y, z, ry = 0, opacity = 0.9) {
  const mesh = decal(parent, map, w, h, x, y, z, -Math.PI / 2, ry, opacity);
  return mesh;
}

export function addBombMark(parent, texs, letter, x, z) {
  const map = letter === 'A' ? texs.bombA : texs.bombB;
  const mark = floorDecal(parent, map, 1.28, 1.28, x, 0.018, z, 0.1, 1);
  hooks.bombMarks.push(mark);
  if (letter === 'A') letterA(parent, x, z);
  else letterB(parent, x, z);
  return mark;
}

export function addBulletPits(parent, texs, x, y, z, ry = 0) {
  return wallDecal(parent, texs.bullets, 0.28, 0.28, x, y, z, ry, 0.8);
}

export function addGraffitiSet(parent, texs) {
  wallDecal(parent, texs.graffitiT, 0.62, 0.62, -1.08, 0.78, 3.55, Math.PI / 2, 0.95);
  wallDecal(parent, texs.graffitiT, 0.5, 0.5, 1.15, 0.88, 4.94, 0, 0.9);
  wallDecal(parent, texs.graffitiCT, 0.52, 0.52, 0.15, 0.78, -5.16, 0, 0.95);
  wallDecal(parent, texs.graffitiTag, 0.5, 0.28, -2.05, 0.7, 2.4, Math.PI / 2, 0.7);
  wallDecal(parent, texs.freight, 0.5, 0.32, 1.62, 0.95, 5.18, 0, 0.84);
  wallDecal(parent, texs.hazard, 0.36, 0.18, -4.88, 0.85, 2.58, Math.PI / 2, 0.7);
  wallDecal(parent, texs.warning, 1.55, 0.3, 0.05, 1.0, -5.16, 0, 0.95);
  wallDecal(parent, texs.badge, 0.4, 0.4, -1.05, 0.95, -5.16, 0, 0.95);
  standMark(parent, texs.bombA, -1.95, 1.22, Math.PI / 2);
  standMark(parent, texs.bombB, 2.72, 1.55, -0.35);
  standMark(parent, texs.graffitiCT, 0.35, -3.85, 0.1);
  addBulletPits(parent, texs, -2.02, 0.55, 1.55, Math.PI / 2);
  addBulletPits(parent, texs, 1.26, 0.62, 0.55, -Math.PI / 2);
  addBulletPits(parent, texs, 3.14, 0.48, 2.34, Math.PI);
  addBulletPits(parent, texs, -1.1, 0.5, 2.72, Math.PI / 2);
}

export function hangingRoster(parent, texs, x, y, z, ry = 0) {
  return wallDecal(parent, texs.roster, 0.18, 0.22, x, y, z, ry, 0.95);
}

export function newspaper(parent, texs, x, y, z, ry = 0.4) {
  return floorDecal(parent, texs.news, 0.16, 0.1, x, y, z, ry, 0.95);
}

export function standMark(parent, map, x, z, ry = 0) {
  const g = group(parent, x, 0, z, ry);
  box(g, ringMat, 0.03, 0.42, 0.03, 0, 0.21, 0);
  box(g, ringMat, 0.28, 0.22, 0.03, 0, 0.52, 0);
  wallDecal(g, map, 0.26, 0.2, 0, 0.52, 0.02, 0, 1);
  return g;
}

export function freightPlaque(parent, texs, x, y, z, ry = 0) {
  return wallDecal(parent, texs.freightSign, 0.32, 0.2, x, y, z, ry, 0.95);
}

export function roadSignFace(parent, texs, x, y, z, ry = 0.2) {
  return wallDecal(parent, texs.roadSign, 0.22, 0.22, x, y, z, ry, 0.95);
}
