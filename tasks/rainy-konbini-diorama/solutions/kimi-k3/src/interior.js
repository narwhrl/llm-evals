// Konbini interior: gondola shelves with instanced goods, drinks wall,
// bento/sandwich case, onigiri & snacks, checkout counter with register,
// coffee machine, magazine rack, posters, freezer chest, oden counter,
// floor guidance arrows, storage lockers and back-room door.
import * as THREE from 'three';
import { toon, flat, box, cyl, planeGeo, boxGeo, cylGeo, at } from './toon.js';
import { STORE } from './store.js';
import { lightboxTexture, posterTexture, magazinesTexture, priceStripTexture, flyerTexture } from './textures.js';

const GOODS_COLORS = [
  0xe8604c, 0x3a6fc2, 0x3f8f4f, 0xd9a13b, 0x8c4c9c, 0x40b8b0,
  0xc23a5e, 0xf2e4c2, 0x5a4a8c, 0xe88a3a,
];

export function buildInterior(scene) {
  const s = STORE;
  const g = new THREE.Group();
  const FLOOR = 0.61; // top of interior floor tile

  // ---------- shelving unit builder ----------
  const shelfMat = toon(0xdcd6c4, { steps: 4 });
  const shelfSide = toon(0xb8b2a0, { steps: 4 });
  const priceTex = priceStripTexture();

  function gondola(w, d, h) {
    const grp = new THREE.Group();
    const body = box(w, h, d, shelfMat, { thickness: 0.02 });
    body.position.y = h / 2;
    grp.add(body);
    const strip = new THREE.Mesh(planeGeo(w - 0.1, 0.12),
      new THREE.MeshBasicMaterial({ map: priceTex }));
    strip.position.set(0, h * 0.62, d / 2 + 0.012);
    grp.add(strip);
    const strip2 = strip.clone();
    strip2.rotation.y = Math.PI;
    strip2.position.z = -d / 2 - 0.012;
    grp.add(strip2);
    return grp;
  }

  // Collect goods transform slots: {pos, ry, kind, box:[w,h,d]}
  const slots = [];
  function fillShelf(grp, w, d, h, rows, cols, cellH) {
    for (let r = 0; r < rows; r++) {
      const y = 0.34 + r * cellH;
      if (y > h - 0.24) break;
      for (let side = -1; side <= 1; side += 2) {
        for (let c = 0; c < cols; c++) {
          const x = -w / 2 + 0.3 + (c + 0.5) * ((w - 0.6) / cols);
          const z = side * (d / 2 - 0.16);
          slots.push({
            x: grp.position.x + x * Math.cos(grp.rotation.y) + z * Math.sin(grp.rotation.y),
            z: grp.position.z - x * Math.sin(grp.rotation.y) + z * Math.cos(grp.rotation.y),
            y: FLOOR + y,
            ry: grp.rotation.y + (side > 0 ? 0 : Math.PI),
            kind: (r + c) % 3,
            seed: slots.length,
          });
        }
      }
    }
  }

  // ---------- two gondola shelf islands ----------
  const isle1 = gondola(4.2, 1.1, 1.7);
  isle1.position.set(-6.6, FLOOR, -2.2);
  g.add(isle1);
  fillShelf(isle1, 4.2, 1.1, 1.7, 3, 7, 0.46);

  const isle2 = gondola(4.2, 1.1, 1.7);
  isle2.position.set(-6.6, FLOOR, -4.6);
  g.add(isle2);
  fillShelf(isle2, 4.2, 1.1, 1.7, 3, 7, 0.46);

  // ---------- drinks wall (back, refrigerated case) ----------
  const caseW = 7.6, caseH = 2.5;
  const fridge = new THREE.Group();
  const fBody = box(caseW, caseH, 0.5, toon(0x39404f, { steps: 3 }), { thickness: 0.015 });
  fBody.position.y = caseH / 2;
  fridge.add(fBody);
  // glowing interior with bottle rows
  const fGlow = new THREE.Mesh(planeGeo(caseW - 0.3, caseH - 0.4),
    new THREE.MeshBasicMaterial({ color: 0xd8f0ff }));
  fGlow.position.set(0, caseH / 2 + 0.05, 0.26);
  fridge.add(fGlow);
  const bottleColors = [0x74c0e8, 0x9ad880, 0xf2b04a, 0xe86a6a, 0xc9a2e8, 0xf4f0e0];
  for (let r = 0; r < 4; r++) {
    const shelfLine = new THREE.Mesh(boxGeo(caseW - 0.3, 0.035, 0.05), flat(0x9fb8c8));
    shelfLine.position.set(0, 0.42 + r * 0.52, 0.28);
    fridge.add(shelfLine);
    for (let c = 0; c < 22; c++) {
      const b = new THREE.Mesh(boxGeo(0.13, 0.34, 0.05),
        new THREE.MeshBasicMaterial({ color: bottleColors[(r * 5 + c) % bottleColors.length] }));
      b.position.set(-caseW / 2 + 0.35 + c * 0.325, 0.42 + r * 0.52 + 0.19, 0.29);
      fridge.add(b);
    }
  }
  // lightbox header over fridge
  const lb = new THREE.Mesh(planeGeo(caseW, 0.5),
    new THREE.MeshBasicMaterial({ map: lightboxTexture('ドリンク', '#fff', '#3a9fc2', '#2a6f9f') }));
  lb.position.set(0, caseH + 0.35, 0.26);
  fridge.add(lb);
  fridge.position.set(-4.9, FLOOR, s.z0 + 0.55);
  g.add(fridge);

  // ---------- bento / sandwich chilled case (right wall) ----------
  const bento = new THREE.Group();
  const bBody = box(0.7, 2.1, 3.6, toon(0x4a505f, { steps: 3 }), { thickness: 0.02 });
  bBody.position.y = 1.05;
  bento.add(bBody);
  const bGlow = new THREE.Mesh(planeGeo(3.3, 1.5), new THREE.MeshBasicMaterial({ color: 0xfff0d8 }));
  bGlow.rotation.y = -Math.PI / 2;
  bGlow.position.set(-0.36, 1.35, 0);
  bento.add(bGlow);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 8; c++) {
      const pack = new THREE.Mesh(boxGeo(0.08, 0.09, 0.3),
        new THREE.MeshBasicMaterial({ color: [0xf2e4c2, 0xe8b8c8, 0xb8d8a8, 0xf8d898][(r + c) % 4] }));
      pack.position.set(-0.38, 0.85 + r * 0.5, -1.45 + c * 0.42);
      bento.add(pack);
    }
  }
  const bLb = new THREE.Mesh(planeGeo(3.4, 0.44),
    new THREE.MeshBasicMaterial({ map: lightboxTexture('お弁当', '#fff8ea', '#e88a3a', '#c25e1a') }));
  bLb.rotation.y = -Math.PI / 2;
  bLb.position.set(-0.37, 2.35, 0);
  bento.add(bLb);
  bento.position.set(s.x1 - 0.75, FLOOR, -3.4);
  g.add(bento);

  // ---------- onigiri / snack shelf near checkout ----------
  const oni = gondola(2.4, 0.7, 1.5);
  oni.position.set(-2.2, FLOOR, -1.2);
  oni.rotation.y = Math.PI / 2;
  g.add(oni);
  fillShelf(oni, 2.4, 0.7, 1.5, 2, 4, 0.5);

  // ---------- checkout counter ----------
  const counter = new THREE.Group();
  const cBody = box(3.2, 1.0, 0.9, toon(0x8a4a3a, { steps: 4 }), { thickness: 0.02 });
  cBody.position.y = 0.5;
  const cTop = box(3.3, 0.08, 1.0, flat(0xf0e8d8));
  cTop.position.y = 1.04;
  counter.add(cBody, cTop);
  // register
  const reg = box(0.5, 0.3, 0.45, toon(0x333a48, { steps: 3 }), { thickness: 0.05 });
  reg.position.set(-0.9, 1.22, 0);
  const regScreen = new THREE.Mesh(planeGeo(0.34, 0.24),
    new THREE.MeshBasicMaterial({ color: 0x9adfC8 }));
  regScreen.position.set(-0.9, 1.5, -0.1);
  regScreen.rotation.x = -0.3;
  counter.add(reg, regScreen);
  // scanner + basket + flyer
  const scan = box(0.16, 0.22, 0.16, flat(0xd84040));
  scan.position.set(-0.35, 1.18, 0.15);
  const basket = box(0.45, 0.25, 0.32, toon(0x3a6fc2, { steps: 3 }), { thickness: 0.05 });
  basket.position.set(0.3, 1.2, 0.1);
  const flyer = new THREE.Mesh(planeGeo(0.5, 0.26),
    new THREE.MeshBasicMaterial({ map: flyerTexture() }));
  flyer.rotation.x = -0.5;
  flyer.position.set(1.0, 1.16, 0.2);
  counter.add(scan, basket, flyer);
  // hot snacks warmer next to register (fried chicken case)
  const warmer = new THREE.Group();
  const wBody = box(0.7, 0.55, 0.5, toon(0x555c6c, { steps: 3 }), { thickness: 0.04 });
  wBody.position.y = 0.275;
  const wGlass = new THREE.Mesh(planeGeo(0.6, 0.34),
    new THREE.MeshBasicMaterial({ color: 0xffd898, transparent: true, opacity: 0.85 }));
  wGlass.position.set(0, 0.32, 0.26);
  warmer.add(wBody, wGlass);
  for (let i = 0; i < 4; i++) {
    const nug = new THREE.Mesh(boxGeo(0.1, 0.06, 0.12), flat(0xd9963f));
    nug.position.set(-0.18 + (i % 2) * 0.24, 0.24, 0.14 - Math.floor(i / 2) * 0.16);
    warmer.add(nug);
  }
  warmer.position.set(1.15, 1.08, -0.15);
  counter.add(warmer);
  counter.position.set(-3.4, FLOOR, 0.6);
  g.add(counter);

  // ---------- coffee machine on side counter ----------
  const coffee = new THREE.Group();
  const cmBody = box(0.6, 0.75, 0.55, toon(0x2c2620, { steps: 3 }), { thickness: 0.04 });
  cmBody.position.y = 0.375;
  const cmFace = new THREE.Mesh(planeGeo(0.44, 0.3), new THREE.MeshBasicMaterial({ color: 0xffb03a }));
  cmFace.position.set(0, 0.5, 0.28);
  const cmBase = box(0.7, 0.9, 0.65, toon(0x6a5a48, { steps: 3 }), { thickness: 0.03 });
  cmBase.position.y = -0.45;
  coffee.add(cmBase, cmBody, cmFace);
  coffee.position.set(-0.6, FLOOR + 0.9, 0.6);
  g.add(coffee);

  // ---------- oden counter (front-right inside) ----------
  const oden = new THREE.Group();
  const oBody = box(1.8, 0.95, 0.7, toon(0x7a4438, { steps: 4 }), { thickness: 0.02 });
  oBody.position.y = 0.475;
  const oPot = box(1.5, 0.22, 0.5, flat(0x8a8f9c));
  oPot.position.y = 1.0;
  oden.add(oBody, oPot);
  const broth = new THREE.Mesh(planeGeo(1.4, 0.42),
    new THREE.MeshBasicMaterial({ color: 0xd9963f }));
  broth.rotation.x = -Math.PI / 2;
  broth.position.y = 1.12;
  oden.add(broth);
  const odenBits = [];
  for (let i = 0; i < 8; i++) {
    const bit = new THREE.Mesh(cylGeo(0.05, 0.05, 0.05, 8),
      flat([0xf2e4c2, 0xe8b87a, 0xd9c8a8, 0xc2d8a8][i % 4]));
    bit.position.set(-0.6 + (i % 4) * 0.4, 1.14, -0.12 + Math.floor(i / 4) * 0.24);
    oden.add(bit);
    odenBits.push(bit);
  }
  const oLb = new THREE.Mesh(planeGeo(1.7, 0.4),
    new THREE.MeshBasicMaterial({ map: lightboxTexture('おでん', '#fff', '#c23a3a', '#8c1f1f') }));
  oLb.position.set(0, 1.55, -0.1);
  oLb.rotation.x = -0.15;
  oden.add(oLb);
  oden.position.set(-6.9, FLOOR, 0.7);
  g.add(oden);

  // ---------- freezer chest (アイス) ----------
  const freezer = new THREE.Group();
  const frBody = box(1.6, 0.9, 0.8, toon(0xd8e4ec, { steps: 3 }), { thickness: 0.02 });
  frBody.position.y = 0.45;
  const frLid = new THREE.Mesh(planeGeo(1.4, 0.6),
    new THREE.MeshBasicMaterial({ color: 0xbfe4f4, transparent: true, opacity: 0.7 }));
  frLid.rotation.x = -Math.PI / 2;
  frLid.position.y = 0.92;
  const frLb = new THREE.Mesh(planeGeo(1.5, 0.36),
    new THREE.MeshBasicMaterial({ map: lightboxTexture('アイス', '#fff', '#5ab8e8', '#2a7fb8') }));
  frLb.position.set(0, 1.35, 0);
  freezer.add(frBody, frLid, frLb);
  const icePops = [];
  for (let i = 0; i < 6; i++) {
    const p = new THREE.Mesh(boxGeo(0.16, 0.05, 0.3), flat([0xe86a9a, 0x6ac8e8, 0xf2d04a][i % 3]));
    p.position.set(-0.5 + (i % 3) * 0.5, 0.9, -0.15 + Math.floor(i / 3) * 0.3);
    freezer.add(p);
    icePops.push(p);
  }
  freezer.position.set(-8.6, FLOOR, 0.9);
  g.add(freezer);

  // ---------- magazine rack (front-right window) ----------
  const magz = new THREE.Group();
  const mBody = box(2.2, 1.5, 0.4, toon(0x8a8474, { steps: 3 }), { thickness: 0.02 });
  mBody.position.y = 0.75;
  const mFace = new THREE.Mesh(planeGeo(2.05, 1.25),
    new THREE.MeshBasicMaterial({ map: magazinesTexture() }));
  mFace.position.set(0, 0.82, 0.21);
  mFace.rotation.x = -0.12;
  magz.add(mBody, mFace);
  magz.position.set(-1.6, FLOOR, 1.55);
  g.add(magz);

  // ---------- posters on interior walls ----------
  const posters = [
    { tex: posterTexture('oden'), pos: [-9.2, FLOOR + 2.2, -1.5], ry: Math.PI / 2 },
    { tex: posterTexture('festival'), pos: [-9.2, FLOOR + 2.2, -5.0], ry: Math.PI / 2 },
    { tex: posterTexture('coffee'), pos: [0.2, FLOOR + 2.3, -0.8], ry: -Math.PI / 2 },
    { tex: posterTexture('bento'), pos: [0.2, FLOOR + 2.3, -6.0], ry: -Math.PI / 2 },
  ];
  for (const p of posters) {
    const m = new THREE.Mesh(planeGeo(0.85, 1.28), new THREE.MeshBasicMaterial({ map: p.tex }));
    m.position.set(...p.pos);
    m.rotation.y = p.ry;
    g.add(m);
  }

  // ---------- floor guidance arrows ----------
  const arrowMat = new THREE.MeshBasicMaterial({ color: 0x74d8c8, transparent: true, opacity: 0.85 });
  const arrowShape = new THREE.Shape();
  arrowShape.moveTo(0, 0.3); arrowShape.lineTo(0.22, 0); arrowShape.lineTo(0.08, 0);
  arrowShape.lineTo(0.08, -0.3); arrowShape.lineTo(-0.08, -0.3); arrowShape.lineTo(-0.08, 0);
  arrowShape.lineTo(-0.22, 0); arrowShape.closePath();
  const arrowGeo = new THREE.ShapeGeometry(arrowShape);
  const arrowPath = [[-4.5, 1.2, 0], [-4.5, -1.0, 0], [-4.5, -3.2, 0], [-3.2, -6.0, Math.PI / 2], [-1.0, -6.0, Math.PI / 2]];
  for (const [x, z, ry] of arrowPath) {
    const a = new THREE.Mesh(arrowGeo, arrowMat);
    a.rotation.x = -Math.PI / 2;
    a.rotation.z = ry;
    a.position.set(x, FLOOR + 0.005, z);
    g.add(a);
  }

  // ---------- storage lockers + back-room door ----------
  const locker = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const lk = box(0.5, 1.7, 0.45, toon(0x7a8494, { steps: 3 }), { thickness: 0.03 });
    lk.position.set(i * 0.55, 0.85, 0);
    locker.add(lk);
    const handle = new THREE.Mesh(boxGeo(0.05, 0.12, 0.03), flat(0x333));
    handle.position.set(i * 0.55 + 0.16, 0.95, 0.24);
    locker.add(handle);
  }
  locker.position.set(s.x0 + 0.7, FLOOR, s.z0 + 0.75);
  g.add(locker);
  const backDoor = box(0.9, 2.0, 0.08, toon(0x9a8a6a, { steps: 3 }), { thickness: 0.03 });
  at(backDoor, -1.0, FLOOR + 1.0, s.z0 + 0.36);
  const doorSign = new THREE.Mesh(planeGeo(0.7, 0.22),
    new THREE.MeshBasicMaterial({ map: lightboxTexture('関係者以外立入禁止', '#fff', '#555c6c', '#333a48') }));
  doorSign.position.set(-1.0, FLOOR + 2.15, s.z0 + 0.42);
  g.add(backDoor, doorSign);

  // ---------- instanced goods on shelves ----------
  const perKind = [[0.22, 0.3, 0.16], [0.18, 0.26, 0.18], [0.26, 0.12, 0.2]];
  const counts = [0, 0, 0];
  for (const sl of slots) counts[sl.kind]++;
  const goodsMeshes = [];
  const dummy = new THREE.Object3D();
  const cinst = new THREE.Color();
  perKind.forEach((dims, kind) => {
    const geo = boxGeo(dims[0], dims[1], dims[2]);
    const mat = new THREE.MeshToonMaterial({ color: 0xffffff });
    const inst = new THREE.InstancedMesh(geo, mat, Math.max(1, counts[kind]));
    let i = 0;
    for (const sl of slots) {
      if (sl.kind !== kind) continue;
      dummy.position.set(sl.x, sl.y + dims[1] / 2, sl.z);
      dummy.rotation.set(0, sl.ry, 0);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
      cinst.setHex(GOODS_COLORS[(sl.seed * 7 + kind * 3) % GOODS_COLORS.length]);
      inst.setColorAt(i, cinst);
      i++;
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    g.add(inst);
    goodsMeshes.push(inst);
  });

  // ---------- warm interior lights ----------
  const warm1 = new THREE.PointLight(0xffd9a0, 75, 17, 2);
  warm1.position.set(-6.5, FLOOR + 3.4, -3);
  const warm2 = new THREE.PointLight(0xffe4b8, 60, 15, 2);
  warm2.position.set(-2.5, FLOOR + 3.4, -1);
  const warm3 = new THREE.PointLight(0xffd0a0, 40, 11, 2);
  warm3.position.set(-3.4, FLOOR + 2.2, 0.9);
  g.add(warm1, warm2, warm3);

  scene.add(g);
  return { group: g, odenBits, icePops, regScreen };
}
