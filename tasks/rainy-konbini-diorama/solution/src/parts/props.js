import * as THREE from 'three';
import { P } from '../palette.js';
import {
  make, slab, BOX, CYL, TORUS, PLANE, CONE, toon, flat, textured, tube,
  canvasTexture, posterTexture, glowTexture, smearTexture,
} from '../kit.js';
import { STORE } from './store.js';

// Street furniture: the things that make the corner read as lived-in.
export function buildProps(scene) {
  const group = new THREE.Group();
  group.name = 'props';

  const lights = [];

  // ---- vending machine ----------------------------------------------------
  const vx0 = -7.3;
  const vx1 = -5.75;
  const vz0 = -2.6;
  const vz1 = -1.5;
  const vh = 1.95;
  group.add(slab(vx0, vx1, 0, vh, vz0, vz1, toon(P.vending), { cast: true, receive: true }));
  group.add(slab(vx0 - 0.04, vx1 + 0.04, vh, vh + 0.1, vz0 - 0.04, vz1 + 0.04, toon(0xa8332a), { outline: false }));
  // Lit product window.
  const vendTex = canvasTexture(256, 320, (ctx, w, h) => {
    ctx.fillStyle = '#f6f3ea';
    ctx.fillRect(0, 0, w, h);
    for (let r = 0; r < 4; r += 1) {
      ctx.fillStyle = 'rgba(60,70,90,0.35)';
      ctx.fillRect(0, (h / 4) * r + h / 4 - 8, w, 5);
      for (let c = 0; c < 5; c += 1) {
        ctx.fillStyle = hexOf(P.goods[(r * 4 + c * 3) % P.goods.length]);
        ctx.fillRect(8 + c * 48, (h / 4) * r + 12, 38, h / 4 - 26);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(12 + c * 48, (h / 4) * r + 16, 30, 10);
      }
    }
  });
  const vendMat = flat(0xffffff);
  vendMat.map = vendTex;
  group.add(make(PLANE(1.16, 1.24), vendMat, { pos: [(vx0 + vx1) / 2, 1.22, vz1 + 0.01], outline: false }));
  group.add(slab(vx0 + 0.12, vx1 - 0.12, 0.58, 1.86, vz1 - 0.03, vz1, toon(0x2a2f3a), { outline: false }));
  // Selection buttons, coin slot and delivery flap.
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      group.add(slab(vx0 + 0.24 + c * 0.3, vx0 + 0.42 + c * 0.3, 0.72 + r * 0.28, 0.86 + r * 0.28, vz1, vz1 + 0.05, flat(0xf6d98a), { outline: false }));
    }
  }
  group.add(slab(vx0 + 0.2, vx1 - 0.2, 0.28, 0.5, vz1, vz1 + 0.06, toon(0x3a4250)));
  group.add(slab((vx0 + vx1) / 2 - 0.16, (vx0 + vx1) / 2 + 0.5, 0.16, 0.3, vz1, vz1 + 0.07, toon(0x1f242e), { outline: false }));
  const vendGlow = new THREE.PointLight(0xff6a4a, 3.4, 5.5, 1.7);
  vendGlow.position.set((vx0 + vx1) / 2, 1.2, vz1 + 0.6);
  group.add(vendGlow);
  lights.push({ light: vendGlow, base: 3.4, kind: 'flicker', seed: 0.31 });
  group.add(make(PLANE(3.2, 2.2), textured(smearTexture(P.vendingGlowColor), { blending: THREE.AdditiveBlending, opacity: 0.4 }), {
    pos: [(vx0 + vx1) / 2, 0.11, vz1 + 1.0],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  }));

  // ---- bicycle ------------------------------------------------------------
  const bike = new THREE.Group();
  bike.position.set(-4.75, 0.1, -1.02);
  bike.rotation.set(0, 0.34, 0.12);
  const frameMat = toon(P.bike);
  const tyreMat = toon(0x1c222d);
  for (const wx of [-0.52, 0.52]) {
    bike.add(make(TORUS(0.32, 0.035, 22), tyreMat, { pos: [wx, 0.34, 0], rot: [0, Math.PI / 2, 0] }));
    bike.add(make(TORUS(0.2, 0.016, 16), toon(0x9aa3b0), { pos: [wx, 0.34, 0], rot: [0, Math.PI / 2, 0], outline: false }));
  }
  bike.add(make(BOX(1.0, 0.05, 0.05), frameMat, { pos: [0, 0.52, 0], rot: [0, 0, -0.06] }));
  bike.add(make(BOX(0.05, 0.44, 0.05), frameMat, { pos: [-0.16, 0.42, 0], rot: [0, 0, 0.35] }));
  bike.add(make(BOX(0.05, 0.5, 0.05), frameMat, { pos: [0.4, 0.44, 0], rot: [0, 0, -0.3] }));
  bike.add(make(BOX(0.52, 0.05, 0.05), frameMat, { pos: [0.14, 0.68, 0], rot: [0, 0, 0.18] }));
  bike.add(make(BOX(0.5, 0.04, 0.04), toon(P.bikeAccent), { pos: [0.42, 0.96, 0] }));
  bike.add(make(BOX(0.26, 0.05, 0.14), toon(0x232a36), { pos: [-0.24, 0.92, 0] }));
  bike.add(make(BOX(0.2, 0.18, 0.2), toon(0x8f97a4), { pos: [0.56, 0.76, 0] }));
  bike.add(make(BOX(0.34, 0.03, 0.03), toon(0x2a303c), { pos: [0.34, 0.24, 0.1], rot: [0.3, 0, 0.5] }));
  group.add(bike);

  // A second bike leaning in the alley, silhouetted.
  const bike2 = bike.clone();
  bike2.position.set(3.6, 0.13, -5.4);
  bike2.rotation.set(0, -0.7, 0.16);
  bike2.scale.setScalar(0.98);
  group.add(bike2);

  // ---- umbrella stand -----------------------------------------------------
  const ux = 1.05;
  const uz = -1.0;
  group.add(make(CYL(0.19, 0.17, 0.56, 12), toon(0x4d5666), { pos: [ux, 0.28, uz], cast: true }));
  for (let i = 0; i < 4; i += 1) {
    const a = (i / 4) * Math.PI * 2 + 0.4;
    const tilt = 0.1 + (i % 2) * 0.06;
    const col = [0xd8564a, 0x2f6f8f, 0xf0b429, 0x3d6d5a][i];
    const shaft = make(CYL(0.018, 0.018, 0.86, 6), toon(0x2b323d), {
      pos: [ux + Math.cos(a) * 0.08, 0.7, uz + Math.sin(a) * 0.08],
      rot: [Math.cos(a) * tilt, 0, -Math.sin(a) * tilt],
    });
    group.add(shaft);
    group.add(make(CONE(0.055, 0.5, 8), toon(col), {
      pos: [ux + Math.cos(a) * 0.1, 0.52, uz + Math.sin(a) * 0.1],
      rot: [Math.PI + Math.cos(a) * tilt, 0, -Math.sin(a) * tilt],
      outline: false,
    }));
  }

  // ---- bins ---------------------------------------------------------------
  for (const [bx, bz, col, lid] of [[-6.95, -0.95, 0x3d6d5a, 0x2a5145], [-6.28, -0.82, 0x40506a, 0x2e3a4d]]) {
    group.add(make(CYL(0.27, 0.24, 0.82, 14), toon(col), { pos: [bx, 0.41, bz], cast: true }));
    group.add(make(CYL(0.29, 0.29, 0.07, 14), toon(lid), { pos: [bx, 0.85, bz] }));
    group.add(make(CYL(0.3, 0.3, 0.05, 14), toon(lid), { pos: [bx, 0.16, bz], outline: false }));
  }

  // ---- streetlight --------------------------------------------------------
  const lx = 4.85;
  const lz = 2.15;
  group.add(make(CYL(0.16, 0.2, 0.28, 12), toon(0x5a6373), { pos: [lx, 0.14, lz], cast: true }));
  group.add(make(CYL(0.1, 0.13, 4.5, 10), toon(0x767f8f), { pos: [lx, 2.4, lz], cast: true }));
  group.add(make(BOX(1.5, 0.1, 0.1), toon(0x767f8f), { pos: [lx - 0.72, 4.6, lz] }));
  group.add(slab(lx - 1.62, lx - 1.0, 4.46, 4.6, lz - 0.22, lz + 0.22, toon(0x8b939f), { cast: true }));
  group.add(slab(lx - 1.55, lx - 1.07, 4.4, 4.47, lz - 0.16, lz + 0.16, flat(0xfff0cd), { outline: false }));
  const streetLamp = new THREE.PointLight(P.lampWarm, 9, 11, 1.7);
  streetLamp.position.set(lx - 1.31, 4.28, lz);
  group.add(streetLamp);
  group.add(make(PLANE(3.6, 3.6), textured(glowTexture(P.lampWarm), { blending: THREE.AdditiveBlending, opacity: 0.55 }), {
    pos: [lx - 1.31, 0.115, lz],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  }));
  group.add(make(PLANE(1.5, 5.2), textured(smearTexture(P.lampWarm), { blending: THREE.AdditiveBlending, opacity: 0.45 }), {
    pos: [lx - 1.31, 0.115, lz + 2.4],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  }));
  lights.push({ light: streetLamp, base: 9, kind: 'steady', seed: 0.0 });

  // ---- utility poles and wires --------------------------------------------
  const poles = [
    { x: -9.3, z: 2.2, h: 6.4, arms: 3 },
    { x: 1.7, z: 9.5, h: 6.0, arms: 2 },
  ];
  const tops = [];
  for (const p of poles) {
    group.add(make(CYL(0.17, 0.21, p.h, 10), toon(P.pole), { pos: [p.x, p.h / 2, p.z], cast: true }));
    group.add(slab(p.x - 0.26, p.x + 0.26, 0, 0.5, p.z - 0.26, p.z + 0.26, toon(0x6a6258), { outline: false }));
    const anchors = [];
    for (let a = 0; a < p.arms; a += 1) {
      const ay = p.h - 0.35 - a * 0.62;
      group.add(slab(p.x - 0.06, p.x + 0.06, ay - 0.06, ay + 0.06, p.z - 1.05, p.z + 1.05, toon(P.poleDark)));
      for (const side of [-1, 1]) {
        const ix = p.x + side * 0.34;
        group.add(make(CYL(0.055, 0.07, 0.16, 8), toon(0x5f7fa0), { pos: [ix, ay + 0.14, p.z + side * 0.86] }));
        anchors.push([ix, ay + 0.2, p.z + side * 0.86]);
      }
    }
    // Transformer can on the first pole.
    if (p.arms === 3) {
      group.add(make(CYL(0.24, 0.24, 0.7, 12), toon(0x8b939f), { pos: [p.x + 0.34, p.h - 2.5, p.z - 0.3] }));
    }
    tops.push({ p, anchors });
  }

  // Sagging spans between the two poles, and a drop to the shop roof.
  const wireColor = 0x1b202b;
  function span(a, b, sag, radius) {
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - sag, (a[2] + b[2]) / 2];
    return tube([a, [a[0] + (mid[0] - a[0]) * 0.5, a[1] + (mid[1] - a[1]) * 0.5, a[2] + (mid[2] - a[2]) * 0.5], mid,
      [b[0] - (b[0] - mid[0]) * 0.5, b[1] + (mid[1] - b[1]) * 0.5, b[2] - (b[2] - mid[2]) * 0.5], b], radius, toon(wireColor), { steps: 22, radial: 4 });
  }
  const [t1, t2] = tops;
  for (let i = 0; i < Math.min(3, Math.min(t1.anchors.length, t2.anchors.length)); i += 1) {
    group.add(span(t1.anchors[i], t2.anchors[i], 0.5, 0.012));
  }
  // Service drops. The one to the shop is kept high and short so it does not
  // cut across the signage from the default viewing angle.
  group.add(span(t1.anchors[1], [STORE.x1 - 0.1, 4.62, STORE.z1 - 0.4], 0.12, 0.012));
  group.add(span(t1.anchors[3], [4.7, 4.62, -3.0], 0.2, 0.012));
  group.add(span(t2.anchors[0], [10.2, 5.4, 6.0], 0.35, 0.012));

  // ---- road sign ----------------------------------------------------------
  const sx = 3.4;
  const sz = 2.2;
  group.add(make(CYL(0.05, 0.06, 2.2, 8), toon(P.signPost), { pos: [sx, 1.1, sz], cast: true }));
  group.add(slab(sx - 0.06, sx + 0.06, 0, 0.3, sz - 0.06, sz + 0.06, toon(0x9aa3b2), { outline: false }));
  const plateTex = canvasTexture(256, 160, (ctx, w, h) => {
    ctx.fillStyle = '#2b5fa8';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 64px "Yu Gothic", Meiryo, sans-serif';
    ctx.fillText('一方通行', w / 2, h / 2 - 8);
    ctx.font = '600 30px "Yu Gothic", Meiryo, sans-serif';
    ctx.fillText('この先 100m', w / 2, h / 2 + 46);
  });
  const plateMat = flat(0xffffff);
  plateMat.map = plateTex;
  // Backing plate sits behind the printed face, otherwise it hides the sign.
  group.add(slab(sx - 0.5, sx + 0.5, 1.52, 2.18, sz - 0.02, sz + 0.03, toon(0xdfe5ef), { outline: false }));
  group.add(make(PLANE(0.94, 0.58), plateMat, { pos: [sx, 1.85, sz + 0.05], outline: false }));
  // Small regulatory disc below.
  const discTex = canvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#f2f4f8';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d14242';
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.fillStyle = '#2b3244';
    ctx.fillRect(w / 2 - 8, 30, 16, 68);
  });
  const discMat = flat(0xffffff);
  discMat.map = discTex;
  group.add(make(PLANE(0.4, 0.4), discMat, { pos: [sx, 1.2, sz + 0.07], outline: false }));

  // ---- notice board -------------------------------------------------------
  const nx = 2.55;
  const nz = -0.95;
  for (const side of [-1, 1]) {
    group.add(make(CYL(0.035, 0.035, 1.5, 8), toon(0x6f7787), { pos: [nx + side * 0.5, 0.75, nz], cast: true }));
    group.add(slab(nx + side * 0.5 - 0.07, nx + side * 0.5 + 0.07, 0, 0.06, nz - 0.2, nz + 0.2, toon(0x59627a), { outline: false }));
  }
  group.add(slab(nx - 0.6, nx + 0.6, 0.7, 1.86, nz - 0.07, nz + 0.07, toon(P.notice), { cast: true }));
  const noticeTex = posterTexture('sale');
  const noticeMat = flat(0xffffff);
  noticeMat.map = noticeTex;
  group.add(make(PLANE(0.98, 1.06), noticeMat, { pos: [nx, 1.28, nz + 0.08], outline: false }));
  group.add(slab(nx - 0.62, nx + 0.62, 1.86, 1.96, nz - 0.1, nz + 0.1, toon(0x3f4859)));
  const noticeLight = new THREE.PointLight(0xbfe4ff, 1.5, 3, 1.8);
  noticeLight.position.set(nx, 1.3, nz + 0.4);
  group.add(noticeLight);

  // ---- crates and a stack of boxes outside the shop ------------------------
  group.add(slab(-7.9, -7.3, 0.1, 0.52, -1.0, -0.4, toon(P.crate), { cast: true }));
  group.add(slab(-7.86, -7.34, 0.52, 0.84, -0.96, -0.44, toon(0x8a6d45), { cast: true }));
  group.add(slab(-8.4, -8.0, 0.1, 0.44, -0.9, -0.5, toon(0x6f7787), { outline: false }));
  // Newspaper box.
  group.add(slab(-5.0, -4.55, 0.1, 0.86, -0.85, -0.35, toon(0x2f6f8f), { cast: true }));
  group.add(slab(-4.96, -4.59, 0.5, 0.78, -0.36, -0.33, flat(0xdce9f5, { opacity: 0.7 }), { outline: false }));

  scene.add(group);
  return { group, lights };
}

function hexOf(n) {
  return `#${n.toString(16).padStart(6, '0')}`;
}
