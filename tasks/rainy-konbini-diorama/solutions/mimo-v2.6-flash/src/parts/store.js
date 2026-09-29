import * as THREE from 'three';
import { P } from '../palette.js';
import { L } from '../layout.js';
import { box, plane, cyl, toon, toonMap, glow, mapped, glassMat, canvasTex, fitText, geo, addOutline } from '../kit.js';

const S = L.store;

function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function brandTexture() {
  return canvasTex(1024, 96, (ctx, w, h) => {
    ctx.fillStyle = P.fasciaWhite;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = P.teal;
    ctx.fillRect(0, 0, 260, h);
    ctx.fillStyle = '#ffffff';
    fitText(ctx, 'MIDORI', 130, h / 2, 215, 52);
    ctx.fillStyle = '#22304e';
    fitText(ctx, 'MART', 590, h / 2, 460, 64);
    ctx.fillStyle = P.orange;
    rrect(ctx, 866, 16, 140, h - 32, 16);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    fitText(ctx, '24h', 936, h / 2, 110, 42);
    ctx.fillStyle = P.orange;
    ctx.fillRect(260, h - 14, w - 260, 14);
    ctx.fillStyle = P.teal;
    ctx.fillRect(260, 0, w - 260, 8);
  });
}

function bladeTexture() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#1d2a46';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = P.teal;
    ctx.lineWidth = 10;
    ctx.strokeRect(14, 14, w - 28, h - 28);
    ctx.fillStyle = '#ffffff';
    fitText(ctx, 'M', w / 2, h / 2 - 26, 130, 120, '800');
    ctx.fillStyle = P.orange;
    fitText(ctx, 'MART', w / 2, h / 2 + 62, 170, 44);
  });
}

function matTexture() {
  return canvasTex(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#2e7d5e';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#1c5a43';
    ctx.lineWidth = 8;
    ctx.strokeRect(6, 6, w - 12, h - 12);
    ctx.fillStyle = '#eafff4';
    fitText(ctx, 'WELCOME', w / 2, h / 2, w - 40, 52);
  });
}

function awningTexture() {
  return canvasTex(256, 64, (ctx, w, h) => {
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 ? P.fasciaWhite : P.teal;
      ctx.fillRect((i * w) / 8, 0, w / 8, h);
    }
  }, { repeat: [4, 1] });
}

export function buildStore(scene) {
  const g = new THREE.Group();
  scene.add(g);

  const wall = P.wallWhite;
  const signMats = [];

  // --- shell ------------------------------------------------------------
  g.add(box(9, 3.4, S.wallT, wall, { x: -3.5, y: 1.7, z: S.z0 + S.wallT / 2, outline: 0.05 })); // north
  g.add(box(S.wallT, 3.4, 7, wall, { x: S.x0 + S.wallT / 2, y: 1.7, z: -2.5, outline: 0.05 })); // west

  // east wall: solid rear section + header over the glazed run
  g.add(box(S.wallT, 3.4, 2.4, wall, { x: S.x1 - S.wallT / 2, y: 1.7, z: -4.8, outline: 0.05 }));
  g.add(box(S.wallT, 0.45, 4.7, wall, { x: S.x1 - S.wallT / 2, y: 3.175, z: -1.35, outline: 0.04 }));
  g.add(box(S.wallT, 3.4, 0.15, wall, { x: S.x1 - S.wallT / 2, y: 1.7, z: 0.925, outline: 0.03 }));

  // south facade piers + header + sills
  const fz = S.z1 - S.wallT / 2;
  for (const [x0, x1] of [[S.x0, -7.6], [-2.6, -2.2], [-0.2, 0.1], [0.9, S.x1]]) {
    g.add(box(x1 - x0, 3.4, S.wallT, wall, { x: (x0 + x1) / 2, y: 1.7, z: fz, outline: 0.04 }));
  }
  g.add(box(9, 0.45, S.wallT, wall, { x: -3.5, y: 3.175, z: fz, outline: 0.04 }));
  g.add(box(L.winA.x1 - L.winA.x0, 0.45, S.wallT, wall, { x: (L.winA.x0 + L.winA.x1) / 2, y: 0.225, z: fz, outline: 0.03 }));
  g.add(box(0.8, 0.45, S.wallT, wall, { x: 0.5, y: 0.225, z: fz, outline: 0.03 }));

  // interior floor slab (level with the pavement)
  g.add(box(8.6, 0.18, 6.7, '#cdc6b4', { x: -3.5, y: 0.15, z: -2.5 }));

  // --- glazing ----------------------------------------------------------
  const glass = glassMat(0.15);
  const gw = L.winA.x1 - L.winA.x0;
  const gh = S.glassTop - 0.45;
  g.add(plane(gw, gh, { mat: glass, x: (L.winA.x0 + L.winA.x1) / 2, y: 0.45 + gh / 2, z: S.z1 - 0.02 }));
  g.add(plane(0.8, gh, { mat: glass, x: 0.5, y: 0.45 + gh / 2, z: S.z1 - 0.02 }));
  const eh = S.glassTop - 0.45;
  g.add(plane(4.5, eh, { mat: glass, x: S.x1 - 0.02, y: 0.45 + eh / 2, z: -1.35, ry: Math.PI / 2 }));

  // dark frames around the openings
  const frame = (w, h, x, y, z, ry) => g.add(box(w, h, 0.09, P.trimDark, { x, y, z, ry, outline: 0.012 }));
  for (const x of [L.winA.x0, -5.93, -4.27, L.winA.x1]) frame(0.09, gh, x, 0.45 + gh / 2, S.z1 + 0.01);
  frame(gw + 0.09, 0.1, (L.winA.x0 + L.winA.x1) / 2, S.glassTop, S.z1 + 0.01);
  frame(gw + 0.09, 0.1, (L.winA.x0 + L.winA.x1) / 2, 0.47, S.z1 + 0.01);
  frame(0.09, gh, 0.1, 0.45 + gh / 2, S.z1 + 0.01);
  frame(0.09, gh, 0.9, 0.45 + gh / 2, S.z1 + 0.01);
  for (const z of [L.winE.z0, -2.2, -0.5, L.winE.z1]) frame(0.09, eh, S.x1 + 0.01, 0.45 + eh / 2, z, Math.PI / 2);
  g.add(box(0.09, 0.1, 4.5, P.trimDark, { x: S.x1 + 0.01, y: S.glassTop, z: -1.35, outline: 0.012 }));

  // --- automatic door ---------------------------------------------------
  const door = new THREE.Group();
  g.add(door);
  door.add(box(L.door.x1 - L.door.x0 + 0.16, 0.14, 0.16, P.trimDark, { x: -1.2, y: L.door.top + 0.05, z: S.z1 - 0.04, outline: 0.014 }));
  for (const x of [L.door.x0, L.door.x1]) {
    door.add(box(0.12, L.door.top - 0.24, 0.14, P.trimDark, { x, y: (0.24 + L.door.top) / 2, z: S.z1 - 0.04, outline: 0.014 }));
  }
  const panels = [];
  for (const side of [-1, 1]) {
    const p = new THREE.Group();
    const cx = side < 0 ? -1.7 : -0.7;
    p.add(plane(0.94, 2.5, { mat: glassMat(0.13), x: cx, y: 1.57, z: S.z1 - 0.03 }));
    p.add(box(1.0, 0.1, 0.1, P.trimDark, { x: cx, y: 0.3, z: S.z1 - 0.03, outline: 0.012 }));
    p.add(box(1.0, 0.1, 0.1, P.trimDark, { x: cx, y: 2.85, z: S.z1 - 0.03, outline: 0.012 }));
    for (const e of [-0.47, 0.47]) p.add(box(0.08, 2.6, 0.1, P.trimDark, { x: cx + e, y: 1.57, z: S.z1 - 0.03 }));
    p.add(box(0.06, 0.7, 0.1, '#aeb8cc', { x: cx + side * 0.3, y: 1.4, z: S.z1 + 0.01 }));
    door.add(p);
    panels.push({ group: p, closed: cx, open: cx + side * 0.92 });
  }

  // --- fascia + signs ---------------------------------------------------
  g.add(box(9.2, 0.9, 0.4, P.fasciaWhite, { x: -3.5, y: 3.85, z: 0.95, outline: 0.05 }));
  g.add(box(0.4, 0.9, 7.3, P.fasciaWhite, { x: 0.95, y: 3.85, z: -2.5, outline: 0.05 }));

  const brandMat = mapped(brandTexture());
  signMats.push(brandMat);
  g.add(plane(8.8, 0.74, { mat: brandMat, x: -3.5, y: 3.85, z: 1.153 }));
  const brandSide = mapped(brandTexture());
  signMats.push(brandSide);
  g.add(plane(6.9, 0.74, { mat: brandSide, x: 1.153, y: 3.85, z: -2.5, ry: Math.PI / 2 }));

  // projecting blade sign over the corner
  g.add(box(0.5, 0.08, 0.12, P.trimDark, { x: 1.22, y: 3.3, z: 0.55, outline: 0.012 }));
  g.add(box(0.9, 1.15, 0.14, P.trimDark, { x: 1.45, y: 2.72, z: 0.55, outline: 0.03 }));
  const bladeA = mapped(bladeTexture());
  const bladeB = mapped(bladeTexture());
  signMats.push(bladeA, bladeB);
  g.add(plane(0.86, 1.05, { mat: bladeA, x: 1.45, y: 2.72, z: 0.55 - 0.076, ry: Math.PI }));
  g.add(plane(0.86, 1.05, { mat: bladeB, x: 1.45, y: 2.72, z: 0.55 + 0.076 }));

  // --- awning over the entrance ---------------------------------------
  const awnTex = awningTexture();
  const awnTop = toonMap('#ffffff', awnTex);
  const awnSide = toon(P.teal);
  const awnGeo = geo('awn', () => new THREE.BoxGeometry(1, 1, 1));
  const awn = new THREE.Mesh(awnGeo, [awnSide, awnSide, awnTop, toon(P.fasciaWhite), awnSide, awnSide]);
  awn.scale.set(L.awning.x1 - L.awning.x0, 0.14, 1.3);
  awn.position.set((L.awning.x0 + L.awning.x1) / 2, (L.awning.y0 + L.awning.y1) / 2, 1.65);
  awn.rotation.x = 0.05;
  addOutline(awn, 0.03);
  g.add(awn);
  g.add(box(L.awning.x1 - L.awning.x0, 0.22, 0.07, P.teal, {
    x: (L.awning.x0 + L.awning.x1) / 2, y: L.awning.y0 - 0.06, z: L.awning.z, outline: 0.014
  }));

  // --- roof -------------------------------------------------------------
  g.add(box(9.0, 0.25, 6.9, '#39415a', { x: -3.5, y: 4.42, z: -2.5, outline: 0.04 }));
  g.add(box(8.6, 0.06, 6.5, '#4a5470', { x: -3.5, y: 4.56, z: -2.5 }));
  for (const [x, z] of [[-6.2, -4.4], [-5.0, -4.4]]) {
    g.add(box(1.1, 0.62, 0.7, '#9aa3b8', { x, y: 4.68, z, outline: 0.03 }));
    const fan = geo('fan', () => new THREE.CircleGeometry(1, 16));
    const f = new THREE.Mesh(fan, toon('#545d75'));
    f.rotation.x = -Math.PI / 2;
    f.scale.set(0.24, 0.24, 1);
    f.position.set(x, 4.995, z);
    g.add(f);
    g.add(box(1.15, 0.1, 0.75, '#6f788f', { x, y: 4.39, z }));
  }
  g.add(box(1.4, 0.5, 1.0, '#8b94ab', { x: -1.4, y: 4.6, z: -4.6, outline: 0.03 }));
  g.add(box(0.5, 0.34, 0.5, '#7d8599', { x: -0.2, y: 4.5, z: -1.0, outline: 0.02 }));
  g.add(cyl(0.05, 1.6, '#6a7488', { x: -7.2, y: 5.3, z: -5.2 }));
  g.add(cyl(0.3, 0.5, '#79839a', { x: -6.8, y: 4.8, z: -5.4, outline: 0.02 }));

  // --- entrance mat -----------------------------------------------------
  const matGeo = geo('mat', () => new THREE.BoxGeometry(1, 1, 1));
  const matTop = mapped(matTexture());
  const matSides = toon('#256247');
  const mat = new THREE.Mesh(matGeo, [matSides, matSides, matTop, matSides, matSides, matSides]);
  mat.scale.set(2.0, 0.05, 1.0);
  mat.position.set(-1.2, 0.265, 1.6);
  g.add(mat);

  // --- exterior wall details -------------------------------------------
  const pipe = geo('pipe', () => new THREE.CylinderGeometry(1, 1, 1, 10));
  for (const [x, z] of [[-7.85, -6.05], [1.05, -6.05]]) {
    const p = new THREE.Mesh(pipe, toon('#98a1b6'));
    p.scale.set(0.07, 3.3, 0.07);
    p.position.set(x, 1.65, z);
    g.add(p);
  }
  // AC condenser on the east wall
  g.add(box(0.6, 0.7, 0.9, '#b7bccb', { x: 1.35, y: 0.6, z: -5.1, outline: 0.03 }));
  const fanRing = geo('fanring', () => new THREE.RingGeometry(0.7, 1, 20));
  const fr = new THREE.Mesh(fanRing, toon('#5b6479'));
  fr.rotation.y = Math.PI / 2;
  fr.scale.set(0.26, 0.26, 1);
  fr.position.set(1.66, 0.62, -5.1);
  g.add(fr);

  return { group: g, panels, signMats };
}
