import * as THREE from 'three';
import { P } from '../palette.js';
import { L } from '../layout.js';
import { box, plane, cyl, tubeOf, toon, glow, mapped, canvasTex, fitText, geo, rnd, at } from '../kit.js';

const B = L.walkY;

function litWin(g, w, h, x, y, z, ry, lit) {
  const m = lit
    ? glow(lit === 2 ? '#ffd9a5' : '#9fd0ff', 0.95)
    : glow('#1b2338');
  g.add(plane(w, h, { mat: m, x, y, z, ry }));
  g.add(box(w + 0.1, h + 0.1, 0.05, '#2a3350', { x: x - Math.sin(ry) * 0.03, y, z: z - Math.cos(ry) * 0.03, ry, outline: 0.012 }));
}

function grid(g, face, ox, oy, oz, cols, rows, w, h, gx, gy, seed) {
  const r = rnd(seed);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const roll = r();
      const lit = roll > 0.62 ? (roll > 0.86 ? 2 : 1) : 0;
      const u = i * gx;
      const v = j * gy;
      if (face === 'x+') litWin(g, w, h, ox, oy + v, oz + u, Math.PI / 2, lit);
      else if (face === 'z+') litWin(g, w, h, ox + u, oy + v, oz, 0, lit);
      else if (face === 'x-') litWin(g, w, h, ox, oy + v, oz - u, -Math.PI / 2, lit);
      else litWin(g, w, h, ox - u, oy + v, oz, Math.PI, lit);
    }
  }
}

function signTexture(text, bg, fg) {
  return canvasTex(512, 192, (ctx, w, h) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = fg;
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = fg;
    fitText(ctx, text, w / 2, h / 2, w - 60, 78);
  });
}

function catenary(a, b, sag) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.y -= sag;
  return new THREE.QuadraticBezierCurve3(a, mid, b);
}

function pole(g, x, z, h, seed) {
  const base = 0.1;
  g.add(tubeOf(0.075, 0.11, h, 12, '#4a526b', { x, y: base + h / 2, z, outline: 0.02 }));
  g.add(box(0.4, 0.16, 0.4, '#5a6480', { x, y: base + 0.08, z, outline: 0.02 }));
  for (const [dx, dz] of [[0.02, 0.02], [-0.02, -0.02]]) {
    g.add(box(0.9, 0.07, 0.07, '#3b4258', { x: x + dx, y: base + h - 0.5, z: z + dz, outline: 0.012 }));
  }
  const r = rnd(seed);
  for (let i = 0; i < 3; i++) {
    g.add(cyl(0.045, 0.12, r() > 0.5 ? '#8fa3c8' : '#6d7fa6', { x: x - 0.35 + i * 0.35, y: base + h - 0.4, z }));
  }
  return { x, z, top: base + h };
}

export function buildStreet(scene) {
  const g = new THREE.Group();
  scene.add(g);
  const signalHeads = [];

  // --- backdrop buildings ------------------------------------------------
  const wB = L.westBuilding;
  g.add(box(wB.x1 - wB.x0, wB.h, wB.z1 - wB.z0, '#39415f', {
    x: (wB.x0 + wB.x1) / 2, y: B + wB.h / 2, z: (wB.z0 + wB.z1) / 2, outline: 0.06
  }));
  g.add(box(wB.x1 - wB.x0 + 0.2, 0.3, wB.z1 - wB.z0 + 0.2, '#2c3350', {
    x: (wB.x0 + wB.x1) / 2, y: B + wB.h + 0.1, z: (wB.z0 + wB.z1) / 2
  }));
  g.add(box(wB.x1 - wB.x0, 0.5, wB.z1 - wB.z0 + 0.02, '#2e3552', { x: (wB.x0 + wB.x1) / 2, y: B + 0.25, z: (wB.z0 + wB.z1) / 2 }));
  grid(g, 'z+', wB.x0 + 0.5, B + 1.6, wB.z1 + 0.02, 3, 3, 0.6, 0.8, 0.6, 1.3, 11);
  grid(g, 'x+', wB.x1 + 0.02, B + 1.9, -8.4, 1, 3, 0.6, 0.8, 0, 1.3, 12);
  grid(g, 'x+', wB.x1 + 0.02, B + 1.9, -10.4, 1, 3, 0.6, 0.8, 0, 1.3, 13);
  g.add(box(0.85, 2.0, 0.08, '#20293f', { x: -10.4, y: B + 1.0, z: wB.z1 + 0.03, outline: 0.02 }));
  g.add(box(0.7, 0.5, 0.05, '#ffe6b8', { mat: glow('#ffe6b8'), x: -10.4, y: B + 2.3, z: wB.z1 + 0.05 }));

  const nB = L.northBuilding;
  g.add(box(nB.x1 - nB.x0, nB.h, nB.z1 - nB.z0, '#333b58', {
    x: (nB.x0 + nB.x1) / 2, y: B + nB.h / 2, z: (nB.z0 + nB.z1) / 2, outline: 0.06
  }));
  g.add(box(nB.x1 - nB.x0 + 0.2, 0.3, nB.z1 - nB.z0 + 0.2, '#272e49', {
    x: (nB.x0 + nB.x1) / 2, y: B + nB.h + 0.1, z: (nB.z0 + nB.z1) / 2
  }));
  grid(g, 'z+', nB.x0 + 1.0, B + 3.4, nB.z1 + 0.02, 7, 2, 0.7, 0.9, 1.35, 1.7, 21);

  const fB = L.farBuilding;
  g.add(box(7.5, 0.14, 0.5, P.walkEdge, { x: 7.75, y: 0.17, z: -9.35 }));
  g.add(box(fB.x1 - fB.x0, fB.h, fB.z1 - fB.z0, '#3d4568', {
    x: (fB.x0 + fB.x1) / 2, y: 0.1 + fB.h / 2, z: (fB.z0 + fB.z1) / 2, outline: 0.06
  }));
  g.add(box(7.7, 0.28, 2.1, '#2c3350', { x: 7.75, y: 0.1 + fB.h + 0.14, z: -10.55 }));
  // lit ground-floor shopfront facing down the street
  g.add(box(5.6, 2.2, 0.1, '#202941', { x: 7.4, y: 1.2, z: -9.55, outline: 0.03 }));
  g.add(plane(4.4, 1.5, { mat: glow('#ffd9a5'), x: 7.4, y: 1.35, z: -9.48 }));
  g.add(box(5.8, 0.4, 0.16, '#1c2338', { x: 7.4, y: 2.55, z: -9.5, outline: 0.02 }));
  const farSign = mapped(signTexture('CAFE  COFFEE', '#1d5a48', '#eafff4'));
  g.add(plane(3.6, 0.42, { mat: farSign, x: 7.4, y: 2.55, z: -9.4 }));
  g.add(cyl(0.06, 3.2, '#49516b', { x: 10.5, y: 0.1 + 1.6, z: -9.1, outline: 0.014 }));
  signalHeads.push(makeSignal(g, 10.5, 3.5, -9.1, 0.9));

  // --- utility poles and wires ------------------------------------------
  const p1 = pole(g, 3.0, -1.0, 7.2, 3);
  const p2 = pole(g, 3.0, -9.5, 7.0, 4);
  const p3 = pole(g, -10.6, 2.6, 6.6, 5);

  // transformer on the corner pole
  g.add(cyl(0.26, 0.7, '#5c657f', { x: 3.32, y: 5.3, z: -1.0, outline: 0.03 }));
  g.add(box(0.5, 0.06, 0.06, '#3b4258', { x: 3.16, y: 5.6, z: -1.0 }));

  const wire = (a, b, sag, dy = 0) => {
    const c = catenary(at(a.x, a.y + dy, a.z), at(b.x, b.y + dy, b.z), sag);
    g.add(new THREE.Mesh(geo(`w${a.x}${a.y}${b.x}${b.y}${dy}${sag}`, () => new THREE.TubeGeometry(c, 20, 0.028, 5, false)), toon('#151b2e')));
  };
  const top1 = { x: p1.x, y: p1.top - 0.5, z: p1.z };
  const top2 = { x: p2.x, y: p2.top - 0.5, z: p2.z };
  const top3 = { x: p3.x, y: p3.top - 0.5, z: p3.z };
  for (const [dx, dy] of [[0.3, 0], [0, 0.16], [-0.3, 0]]) {
    wire({ ...top1, x: top1.x + dx }, { ...top2, x: top2.x + dx }, 0.5, dy);
    wire({ ...top1, x: top1.x + dx }, { ...top3, x: top3.x }, 0.7, dy);
  }
  wire(top3, { x: wB.x1, y: B + 5.0, z: 0.2 }, 0.35);
  wire(top2, { x: 3.0, y: B + 6.4, z: nB.z1 }, 0.3);

  // --- street light ------------------------------------------------------
  const slx = 3.05, slz = 2.55;
  g.add(tubeOf(0.07, 0.1, 5.4, 12, '#49516b', { x: slx, y: 0.1 + 2.7, z: slz, outline: 0.02 }));
  g.add(box(0.36, 0.14, 0.36, '#5a6480', { x: slx, y: 0.16, z: slz, outline: 0.018 }));
  const arm = catenary(at(slx, 5.3, slz), at(5.0, 5.7, 4.0), 0.25);
  g.add(new THREE.Mesh(geo('slarm', () => new THREE.TubeGeometry(arm, 16, 0.06, 6, false)), toon('#49516b')));
  g.add(box(0.9, 0.16, 0.4, '#5a6480', { x: 5.0, y: 5.66, z: 4.0, ry: -0.6, outline: 0.02 }));
  g.add(plane(0.7, 0.3, { mat: glow('#ffe6bb'), x: 5.0, y: 5.56, z: 4.0, rx: Math.PI / 2 }));

  // --- traffic signals ---------------------------------------------------
  g.add(box(1.9, 0.08, 0.08, '#3b4258', { x: 3.9, y: 5.05, z: -1.0, outline: 0.012 }));
  signalHeads.push(makeSignal(g, 4.6, 4.62, -1.0, 0));

  // --- guardrails --------------------------------------------------------
  const railRun = (x0, z0, dx, dz, count) => {
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      g.add(cyl(0.05, 0.6, P.guardrail, { x: x0 + dx * t, y: 0.4, z: z0 + dz * t, outline: 0.012 }));
    }
    for (const y of [0.36, 0.55]) {
      const len = Math.hypot(dx, dz);
      const horiz = Math.abs(dx) > Math.abs(dz);
      g.add(box(horiz ? len : 0.1, 0.1, horiz ? 0.1 : len, P.guardrail, {
        x: x0 + dx / 2, y, z: z0 + dz / 2, outline: 0.014
      }));
    }
  };
  railRun(-11, 11.42, 8, 0, 9);
  railRun(11.42, -9.2, 0, 6.0, 7);

  // --- road signs --------------------------------------------------------
  g.add(cyl(0.05, 2.6, '#6a7488', { x: 1.75, y: 0.24 + 1.3, z: 2.7, outline: 0.014 }));
  g.add(box(1.3, 0.56, 0.07, '#1f4fa8', { x: 1.75, y: 2.5, z: 2.7, outline: 0.02 }));
  g.add(plane(1.2, 0.46, { mat: mapped(signTexture('KONBINI ST.', '#1f4fa8', '#eaf2ff')), x: 1.75, y: 2.5, z: 2.74 }));
  g.add(cyl(0.04, 2.0, '#6a7488', { x: -6.6, y: 0.24 + 1.0, z: 3.1, outline: 0.012 }));
  g.add(box(0.9, 0.36, 0.06, '#f0f3fb', { x: -6.6, y: 2.1, z: 3.1, outline: 0.016 }));
  g.add(plane(0.82, 0.28, { mat: mapped(signTexture('SHIBA 3-2', '#f0f3fb', '#24304e')), x: -6.6, y: 2.1, z: 3.14 }));

  return { group: g, signalHeads };
}

function makeSignal(g, x, y, z, phase) {
  const mats = {
    green: glow('#1b3a2a'),
    yellow: glow('#3a331b'),
    red: glow('#3a1b1b'),
    phase
  };
  g.add(box(0.3, 0.78, 0.3, '#232a41', { x, y, z, outline: 0.02 }));
  const ys = [y + 0.26, y, y - 0.26];
  for (const [i, key] of ['red', 'yellow', 'green'].entries()) {
    g.add(cyl(0.1, 0.06, '#141a2c', { x, y: ys[i], z: z + 0.16, rx: Math.PI / 2, outline: 0.01 }));
    const lamp = new THREE.Mesh(geo('lamp', () => new THREE.CircleGeometry(1, 16)), mats[key]);
    lamp.scale.set(0.08, 0.08, 1);
    lamp.position.set(x, ys[i], z + 0.2);
    g.add(lamp);
    const back = new THREE.Mesh(lamp.geometry, mats[key]);
    back.scale.set(0.08, 0.08, 1);
    back.position.set(x, ys[i], z - 0.2);
    back.rotation.y = Math.PI;
    g.add(back);
  }
  g.add(box(0.36, 0.06, 0.36, '#232a41', { x, y: y + 0.44, z, outline: 0.012 }));
  return mats;
}
