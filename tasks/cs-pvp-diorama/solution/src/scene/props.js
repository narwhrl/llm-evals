import * as THREE from 'three';
import { COLORS } from '../palette.js';
import { toon, toonMap } from '../materials.js';
import {
  woodTexture, cardboardTexture, rustTexture, paintTexture, concreteTexture,
  graffitiTexture, bulletHoleTexture, softDotTexture,
} from '../textures.js';
import { box, cyl, card, ladder } from './helpers.js';

// ---- shared materials (module-level, created once) ----
export const MAT = {
  woodCrate: () => toonMap(woodTexture(), {}),
  cardboard: () => toonMap(cardboardTexture(), {}),
  drumBlue: () => toonMap(paintTexture('#33587e', { key: 'drumb' }), {}),
  drumRed: () => toonMap(paintTexture('#8a3a32', { key: 'drumr' }), {}),
  rusted: () => toonMap(rustTexture(), {}),
  steel: () => toon(COLORS.steel),
  steelDark: () => toon(COLORS.steelDark),
  concrete: () => toonMap(concreteTexture(), {}),
  concreteDark: () => toon(COLORS.concreteDark),
  tire: () => toon(COLORS.tire),
  plasticOrange: () => toon(COLORS.barricadeOrange),
  plasticWhite: () => toon(COLORS.plasticWhite),
  bulletHole: () => new THREE.MeshBasicMaterial({ map: bulletHoleTexture(), transparent: true, depthWrite: false }),
};

let _holeMat = null;
export function bulletMat() {
  if (!_holeMat) _holeMat = MAT.bulletHole();
  return _holeMat;
}
let _holeMat2 = null;
export function bulletMat2() {
  if (!_holeMat2) _holeMat2 = new THREE.MeshBasicMaterial({ map: bulletHoleTexture('b2'), transparent: true, depthWrite: false });
  return _holeMat2;
}

// ---- prop builders ----

export function crate(size = 1.6, seedRot = 0) {
  const g = new THREE.Group();
  const m = toonMap(woodTexture(), {});
  g.add(box(size, size, size, m, 0, size / 2, 0, seedRot));
  // edge slats
  const slat = toon(COLORS.woodDark);
  const half = size / 2;
  g.add(box(size * 1.02, 0.1, 0.1, slat, 0, size * 0.85, half, seedRot));
  g.add(box(size * 1.02, 0.1, 0.1, slat, 0, size * 0.15, half, seedRot));
  return g;
}

export function crateStack(x, y, z, rows, ry = 0) {
  const g = new THREE.Group();
  const rnd = Math.abs(Math.sin(x * 12.9898 + z * 78.233)) % 1;
  for (let i = 0; i < rows; i++) {
    const s = 1.5 + rnd * 0.3;
    const c = crate(s, (i % 2) * 0.3);
    c.position.set((i % 2) * 0.12 - 0.06, y + i * (s + 0.02), (i % 2) * -0.1);
    c.rotation.y = ry + (i * 0.14);
    g.add(c);
  }
  g.position.set(x, 0, z);
  return g;
}

export function barrel(color = 'blue', x = 0, y = 0, z = 0) {
  const g = new THREE.Group();
  const m = color === 'red' ? toonMap(paintTexture('#8a3a32', { key: 'drumr' }), {}) : toonMap(paintTexture('#33587e', { key: 'drumb' }), {});
  const body = cyl(0.42, 0.42, 1.1, m, 0, 0.55, 0, 14);
  g.add(body);
  const ringMat = toon(COLORS.steelDark);
  g.add(cyl(0.45, 0.45, 0.06, ringMat, 0, 0.3, 0, 14));
  g.add(cyl(0.45, 0.45, 0.06, ringMat, 0, 0.8, 0, 14));
  g.add(cyl(0.4, 0.4, 0.05, ringMat, 0, 1.1, 0, 14));
  g.position.set(x, y, z);
  return g;
}

export function barrelCluster(x, z, count = 4) {
  const g = new THREE.Group();
  const pos = [
    [0, 0], [0.9, 0.1], [0.45, 0.85], [-0.4, 0.9],
  ];
  for (let i = 0; i < count; i++) {
    g.add(barrel(i % 3 === 0 ? 'red' : 'blue', pos[i][0], 0, pos[i][1]));
  }
  // one tipped barrel
  const t = barrel('blue');
  t.rotation.z = Math.PI / 2;
  t.position.set(-1.1, 0.42, 0.3);
  g.add(t);
  g.position.set(x, 0, z);
  return g;
}

export function pallet(x, y, z, ry = 0) {
  const g = new THREE.Group();
  const m = toonMap(woodTexture('p'), {});
  for (let i = -2; i <= 2; i++) {
    g.add(box(1.4, 0.06, 0.2, m, 0, 0.14, i * 0.28));
  }
  g.add(box(1.3, 0.08, 0.12, toon(COLORS.woodDark), -0.5, 0.06, 0));
  g.add(box(1.3, 0.08, 0.12, toon(COLORS.woodDark), 0.5, 0.06, 0));
  g.position.set(x, y, z);
  g.rotation.y = ry;
  return g;
}

export function cardboardPile(x, z, ry = 0) {
  const g = new THREE.Group();
  const m = toonMap(cardboardTexture(), {});
  const m2 = toonMap(cardboardTexture('cb2'), {});
  g.add(box(1.2, 0.7, 0.9, m, 0, 0.35, 0, 0.1));
  g.add(box(1.0, 0.55, 0.8, m2, 0.2, 0.95, 0.1, -0.2));
  g.add(box(0.9, 0.5, 0.7, m, -0.3, 0.75, 0.4, 0.5));
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  return g;
}

export function jerseyBarrier(x, z, ry = 0) {
  const g = new THREE.Group();
  const m = toonMap(concreteTexture('#9a9fa6', 'jb'), {});
  g.add(box(2.2, 0.5, 0.55, m, 0, 0.25, 0));
  g.add(box(1.9, 0.5, 0.4, m, 0, 0.72, 0));
  g.add(box(2.2, 0.12, 0.5, toon(COLORS.barricadeOrange), 0, 1.0, 0));
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  return g;
}

export function concreteBarrier(x, z, ry = 0) {
  const g = new THREE.Group();
  const m = toonMap(concreteTexture('#7f858c', 'cb2'), {});
  g.add(box(1.8, 0.9, 0.7, m, 0, 0.45, 0));
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  // bullet holes
  const holes = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const h = card(0.16, 0.16, bulletMat(), (i - 1) * 0.4, 0.5 + i * 0.1, 0.36);
    holes.add(h);
  }
  g.add(holes);
  return g;
}

export function tire(x, y, z, ry = 0, flat = true) {
  const m = toon(COLORS.tire);
  const geo = new THREE.TorusGeometry(0.42, 0.17, 8, 16);
  const t = new THREE.Mesh(geo, m);
  t.castShadow = true;
  t.receiveShadow = true;
  t.position.set(x, y + (flat ? 0.17 : 0.42), z);
  if (flat) t.rotation.x = -Math.PI / 2;
  else t.rotation.y = ry;
  t.rotation.z = flat ? ry : 0;
  return t;
}

export function trashBin(x, z, ry = 0, lidded = true) {
  const g = new THREE.Group();
  const m = toonMap(rustTexture('#5a6168', 'bin'), {});
  g.add(cyl(0.5, 0.45, 1.2, m, 0, 0.6, 0, 14));
  if (lidded) {
    const lid = cyl(0.54, 0.54, 0.1, toon(COLORS.steelDark), 0, 1.25, 0, 14);
    g.add(lid);
    g.add(cyl(0.08, 0.08, 0.12, toon(COLORS.steelDark), 0, 1.34, 0, 8));
  }
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  return g;
}

export function acUnit(x, y, z, ry = 0) {
  const g = new THREE.Group();
  const m = toonMap(paintTexture('#a8adb2', { key: 'ac' }), {});
  g.add(box(1.3, 0.9, 0.6, m, 0, 0, 0));
  const fan = cyl(0.3, 0.3, 0.06, toon(COLORS.steelDark), 0, 0, 0.32, 12);
  fan.rotation.x = Math.PI / 2;
  g.add(fan);
  g.position.set(x, y, z);
  g.rotation.y = ry;
  return g;
}

export function bike(x, z, ry = 0) {
  const g = new THREE.Group();
  const m = toon(0x8a3a32);
  const wheelMat = toon(COLORS.tire);
  const w1 = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 6, 16), wheelMat);
  const w2 = w1.clone();
  w1.position.set(-0.5, 0.35, 0);
  w2.position.set(0.5, 0.35, 0);
  w1.castShadow = w2.castShadow = true;
  g.add(w1, w2);
  g.add(box(0.7, 0.05, 0.05, m, 0, 0.6, 0));
  g.add(box(0.05, 0.5, 0.05, m, -0.3, 0.55, 0, 0.4));
  g.add(box(0.05, 0.55, 0.05, m, 0.35, 0.6, 0, -0.3));
  g.add(box(0.4, 0.05, 0.05, m, 0.45, 0.85, 0));
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  g.rotation.z = 0.15; // leaning / abandoned
  return g;
}

export function streetLamp(height = 5.5) {
  const g = new THREE.Group();
  const poleMat = toon(COLORS.steelDark);
  g.add(cyl(0.09, 0.13, height, poleMat, 0, height / 2, 0, 10));
  // curved arm
  g.add(box(1.4, 0.09, 0.09, poleMat, 0.65, height - 0.1, 0));
  g.add(box(0.5, 0.09, 0.09, poleMat, 1.3, height - 0.28, 0));
  const head = box(0.7, 0.18, 0.35, toon(COLORS.steel), 1.35, height - 0.45, 0);
  g.add(head);
  const bulbMat = new THREE.MeshBasicMaterial({ color: COLORS.bulbWarm });
  const bulb = box(0.55, 0.06, 0.25, bulbMat, 1.35, height - 0.55, 0);
  bulb.name = 'lampBulb';
  g.add(bulb);
  return g;
}

export function utilityPole(height = 7.5) {
  const g = new THREE.Group();
  const m = toonMap(rustTexture('#4a4038', 'pole'), {});
  g.add(cyl(0.12, 0.17, height, m, 0, height / 2, 0, 8));
  g.add(box(2.2, 0.1, 0.1, m, 0, height - 0.5, 0));
  g.add(box(1.6, 0.1, 0.1, m, 0, height - 1.1, 0));
  // insulators
  const ins = toon(0x6a7a8a);
  g.add(cyl(0.05, 0.05, 0.14, ins, -0.9, height - 0.38, 0, 6));
  g.add(cyl(0.05, 0.05, 0.14, ins, 0.9, height - 0.38, 0, 6));
  g.add(cyl(0.05, 0.05, 0.14, ins, -0.6, height - 0.98, 0, 6));
  g.add(cyl(0.05, 0.05, 0.14, ins, 0.6, height - 0.98, 0, 6));
  return g;
}

export function wire(from, to, sag = 0.8, mat = null) {
  const m = mat || toon(0x14161a);
  const mid = from.clone().add(to).multiplyScalar(0.5);
  mid.y -= sag;
  const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
  const geo = new THREE.TubeGeometry(curve, 16, 0.03, 5, false);
  const mesh = new THREE.Mesh(geo, m);
  mesh.castShadow = false;
  return mesh;
}

export function barbedWireRun(x1, z1, x2, z2, postEvery = 3.2) {
  const g = new THREE.Group();
  const postMat = toon(COLORS.barWire);
  const dx = x2 - x1;
  const dz = z2 - z1;
  const len = Math.hypot(dx, dz);
  const n = Math.max(2, Math.round(len / postEvery));
  const ry = Math.atan2(dx, dz);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const px = x1 + dx * t;
    const pz = z1 + dz * t;
    g.add(cyl(0.05, 0.06, 1.5, postMat, px, 0.75, pz, 6));
  }
  // three wire strands
  for (const h of [0.55, 0.95, 1.35]) {
    const w = wire(
      new THREE.Vector3(x1, h, z1),
      new THREE.Vector3(x2, h, z2),
      0.06,
      toon(COLORS.barWire)
    );
    g.add(w);
  }
  // zigzag coil hint
  const coilMat = toon(COLORS.barWire);
  const seg = Math.max(4, Math.floor(len / 0.8));
  for (let i = 0; i < seg; i++) {
    const t0 = i / seg;
    const t1 = (i + 1) / seg;
    const a = new THREE.Vector3(x1 + dx * t0, 1.1 + (i % 2) * 0.3, z1 + dz * t0);
    const b = new THREE.Vector3(x1 + dx * t1, 1.1 + ((i + 1) % 2) * 0.3, z1 + dz * t1);
    g.add(wire(a, b, 0, coilMat));
  }
  void ry;
  return g;
}

export function graffitiCard(text, color, w, h, x, y, z, ry = 0) {
  const mat = new THREE.MeshBasicMaterial({
    map: graffitiTexture(text, color, text + color),
    transparent: true,
    depthWrite: false,
  });
  const c = card(w, h, mat, x, y, z, 0, ry);
  return c;
}

export function glowSprite(color, scale, x, y, z, opacity = 0.55) {
  const mat = new THREE.SpriteMaterial({
    map: softDotTexture(),
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const s = new THREE.Sprite(mat);
  s.scale.set(scale, scale, 1);
  s.position.set(x, y, z);
  return s;
}

export function ladderProp(x, y, z, height, ry = 0) {
  const rails = toonMap(woodTexture('lad'), {});
  return ladder(rails, toon(COLORS.woodDark), height, x, y, z, ry);
}
