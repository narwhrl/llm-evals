import * as THREE from 'three';
import { P } from '../palette.js';
import { L } from '../layout.js';
import { box, plane, cyl, toon, glow, mapped, canvasTex, fitText, geo, rnd, addOutline } from '../kit.js';

const F = L.store.floorY;
const PRODUCTS = ['#e8503f', '#ffd75a', '#2fb3a3', '#4d8ce8', '#ff6aa8', '#ff9d3d', '#f2f0e6', '#7bd389', '#a78bfa'];

function coolerTexture(seed) {
  const r = rnd(seed);
  return canvasTex(256, 512, (ctx, w, h) => {
    ctx.fillStyle = '#243252';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#e9f3ff';
    ctx.fillRect(6, 6, w - 12, h - 12);
    for (let row = 0; row < 5; row++) {
      const y = 40 + row * 92;
      ctx.fillStyle = '#c8d6ea';
      ctx.fillRect(10, y + 54, w - 20, 8);
      for (let i = 0; i < 7; i++) {
        ctx.fillStyle = PRODUCTS[(seed + row * 7 + i) % PRODUCTS.length];
        const bw = 26;
        const bh = 44 + r() * 12;
        ctx.fillRect(18 + i * 32, y + 54 - bh, bw, bh);
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillRect(18 + i * 32, y + 54 - bh, bw, 8);
      }
    }
    ctx.fillStyle = 'rgba(120,170,230,0.25)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#dff0ff';
    ctx.fillRect(0, 0, w, 26);
    ctx.fillStyle = '#2b6fd6';
    fitText(ctx, 'COLD DRINKS', w / 2, 14, w - 20, 18);
  });
}

function posterTexture(kind) {
  const sets = [
    { bg: '#ff6a4d', fg: '#fff6e8', a: 'NEW', b: 'ODEN' },
    { bg: '#2f8fd6', fg: '#ffffff', a: 'COFFEE', b: '100' },
    { bg: '#ffd75a', fg: '#3a2a10', a: 'FRESH', b: 'DAILY' },
    { bg: '#2fb3a3', fg: '#062b26', a: '2 FOR', b: '1 DEAL' },
    { bg: '#e8503f', fg: '#ffe9e4', a: 'HOT', b: 'SOUP' },
    { bg: '#7bd389', fg: '#0d3018', a: 'SALAD', b: 'BAR' }
  ];
  const s = sets[kind % sets.length];
  return canvasTex(128, 192, (ctx, w, h) => {
    ctx.fillStyle = s.bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = s.fg;
    fitText(ctx, s.a, w / 2, h * 0.34, w - 16, 34);
    fitText(ctx, s.b, w / 2, h * 0.6, w - 16, 34);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(10, h - 26, w - 20, 8);
  });
}

function guideTexture() {
  return canvasTex(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#1f7a52';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#eafff2';
    ctx.beginPath();
    ctx.moveTo(w / 2, 20);
    ctx.lineTo(w - 26, h / 2 + 14);
    ctx.lineTo(w / 2 + 22, h / 2 + 14);
    ctx.lineTo(w / 2 + 22, h - 22);
    ctx.lineTo(w / 2 - 22, h - 22);
    ctx.lineTo(w / 2 - 22, h / 2 + 14);
    ctx.lineTo(26, h / 2 + 14);
    ctx.closePath();
    ctx.fill();
  });
}

export function buildInterior(scene) {
  const g = new THREE.Group();
  scene.add(g);

  const y0 = F;

  // ceiling closes the shell; the light panels hang just under it
  g.add(box(8.6, 0.08, 6.7, '#e9e6dd', { x: -3.5, y: 3.14, z: -2.5 }));
  for (const x of [-5.6, -2.4]) {
    for (const z of [-1.7, -4.3]) {
      g.add(box(2.5, 0.07, 0.9, '#fff6e4', { mat: glow('#fff6e4'), x, y: 3.06, z }));
      g.add(box(2.6, 0.05, 1.0, '#cfd6e4', { x, y: 3.1, z }));
    }
  }
  // header lightbox inside the storefront
  g.add(box(8.3, 0.3, 0.08, '#fff1d6', { mat: glow('#fff1d6'), x: -3.5, y: 2.74, z: 0.66 }));

  // --- coolers along the west wall -------------------------------------
  const coolerGeo = geo('cooler', () => new THREE.BoxGeometry(1, 1, 1));
  const coolerBody = toon('#dde4f0');
  for (let i = 0; i < 4; i++) {
    const cz = -5.0 + i * 1.1;
    const body = new THREE.Mesh(coolerGeo, coolerBody);
    body.scale.set(0.75, 1.95, 1.05);
    body.position.set(-7.37, y0 + 0.975, cz);
    addOutline(body, 0.03);
    g.add(body);
    const face = plane(0.98, 1.72, { mat: mapped(coolerTexture(i + 3)), x: -6.99, y: y0 + 1.1, z: cz, ry: Math.PI / 2 });
    g.add(face);
    g.add(box(0.05, 0.14, 1.05, '#2f6fd0', { x: -6.98, y: y0 + 1.86, z: cz, outline: 0.01 }));
  }

  // --- gondola runs (long axis east-west so the window reads the rows) ---
  const shelf = (zc) => {
    g.add(box(3.6, 0.12, 0.8, '#e7e2d4', { x: -4.6, y: y0 + 0.06, z: zc, outline: 0.03 }));
    for (const sy of [0.3, 0.75, 1.2, 1.65]) {
      g.add(box(3.6, 0.05, 0.78, '#efeadd', { x: -4.6, y: y0 + sy, z: zc }));
    }
    for (const sx of [-6.36, -2.84]) {
      g.add(box(0.09, 1.7, 0.8, '#d9d3c4', { x: sx, y: y0 + 0.85, z: zc, outline: 0.025 }));
    }
    g.add(box(3.5, 0.28, 0.06, P.teal, { x: -4.6, y: y0 + 1.78, z: zc + 0.39, outline: 0.012 }));
    const r = rnd(Math.round(zc * 100));
    const pgeo = geo('prod', () => new THREE.BoxGeometry(1, 1, 1));
    for (const sy of [0.34, 0.79, 1.24]) {
      let x = -6.2;
      while (x < -3.0) {
        const w = 0.22 + r() * 0.2;
        const h = 0.22 + r() * 0.14;
        const m = new THREE.Mesh(pgeo, toon(PRODUCTS[Math.floor(r() * PRODUCTS.length)]));
        m.scale.set(w, h, 0.34 + r() * 0.16);
        m.position.set(x + w / 2, y0 + sy + h / 2, zc + (r() - 0.5) * 0.1);
        g.add(m);
        x += w + 0.06;
      }
    }
  };
  shelf(-2.5);
  shelf(-4.3);

  // --- posters on the interior walls ------------------------------------
  for (let i = 0; i < 4; i++) {
    g.add(plane(0.5, 0.75, { mat: mapped(posterTexture(i)), x: -7.72, y: 2.3, z: -4.9 + i * 1.15, ry: Math.PI / 2 }));
  }
  for (let i = 0; i < 3; i++) {
    g.add(plane(0.55, 0.8, { mat: mapped(posterTexture(i + 2)), x: -6.6 + i * 1.4, y: 2.35, z: -5.72 }));
  }
  for (let i = 0; i < 2; i++) {
    g.add(plane(0.5, 0.75, { mat: mapped(posterTexture(i + 4)), x: 0.72, y: 2.3, z: -2.2 - i * 1.2, ry: -Math.PI / 2 }));
  }

  // --- back-room door ----------------------------------------------------
  g.add(box(1.1, 2.1, 0.1, '#7f8ba3', { x: -1.1, y: y0 + 1.05, z: -5.7, outline: 0.03 }));
  g.add(box(0.7, 0.45, 0.06, '#dfe7f4', { mat: glow('#cfe0f5'), x: -1.1, y: y0 + 1.55, z: -5.63 }));
  g.add(box(0.44, 0.16, 0.05, '#20304e', { x: -1.1, y: y0 + 1.9, z: -5.63 }));
  g.add(cyl(0.03, 0.16, '#c9d2e6', { x: -0.7, y: y0 + 1.0, z: -5.62, rx: Math.PI / 2 }));

  // --- storage shelving beside the back door ----------------------------
  for (const sy of [0.2, 0.75, 1.3]) {
    g.add(box(1.5, 0.06, 0.5, '#9aa3b8', { x: -2.7, y: y0 + sy, z: -5.4 }));
  }
  for (const sx of [-3.4, -2.0]) g.add(box(0.06, 1.6, 0.5, '#8a93a8', { x: sx, y: y0 + 0.8, z: -5.4 }));
  const crateR = rnd(19);
  for (const [cx, cz, cy] of [[-3.1, -5.4, 0.36], [-2.4, -5.4, 0.36], [-2.9, -5.4, 0.91], [-3.1, -5.4, 1.46]]) {
    g.add(box(0.5, 0.3, 0.42, PRODUCTS[Math.floor(crateR() * 5)], { x: cx, y: y0 + cy, z: cz, outline: 0.02 }));
  }

  // --- chest freezer on the east wall -----------------------------------
  g.add(box(0.75, 0.85, 1.0, '#e4eaf6', { x: 0.34, y: y0 + 0.425, z: -5.0, outline: 0.03 }));
  g.add(box(0.78, 0.1, 1.03, '#c3cde0', { x: 0.34, y: y0 + 0.88, z: -5.0 }));
  g.add(box(0.06, 0.2, 0.7, '#3f8fd8', { x: -0.06, y: y0 + 0.5, z: -5.0 }));

  // --- checkout counter --------------------------------------------------
  g.add(box(1.9, 0.9, 1.0, '#5a6480', { x: -0.25, y: y0 + 0.45, z: -2.1, outline: 0.035 }));
  g.add(box(2.0, 0.07, 1.1, '#f0ece0', { x: -0.25, y: y0 + 0.93, z: -2.1, outline: 0.02 }));
  g.add(box(0.42, 0.4, 0.36, '#2c3550', { x: -0.62, y: y0 + 1.17, z: -2.3, outline: 0.02 }));
  g.add(box(0.3, 0.22, 0.06, '#7ee0a8', { mat: glow('#7ee0a8'), x: -0.62, y: y0 + 1.2, z: -2.11, rx: -0.35 }));
  g.add(box(0.4, 0.26, 0.3, '#e8e2d4', { x: 0.1, y: y0 + 1.1, z: -2.35, outline: 0.018 }));
  // coffee machine
  g.add(box(0.36, 0.62, 0.32, '#4b556e', { x: 0.42, y: y0 + 1.24, z: -2.4, outline: 0.022 }));
  g.add(box(0.24, 0.16, 0.04, '#ff9d3d', { mat: glow('#ff9d3d'), x: 0.42, y: y0 + 1.4, z: -2.23 }));
  g.add(cyl(0.06, 0.12, '#f4f1e6', { x: 0.42, y: y0 + 1.0, z: -2.2 }));
  // impulse rack on the counter's west end
  g.add(box(0.5, 0.3, 0.7, '#e8503f', { x: -1.25, y: y0 + 1.1, z: -2.1, outline: 0.02 }));
  const impR = rnd(41);
  for (let i = 0; i < 6; i++) {
    g.add(box(0.1, 0.2, 0.1, PRODUCTS[Math.floor(impR() * PRODUCTS.length)], {
      x: -1.42 + (i % 3) * 0.16, y: y0 + 1.32, z: -2.32 + Math.floor(i / 3) * 0.4
    }));
  }

  // --- oden counter ------------------------------------------------------
  g.add(box(0.7, 0.78, 0.6, '#8c5a3a', { x: -1.75, y: y0 + 0.39, z: -2.1, outline: 0.03 }));
  g.add(box(0.76, 0.08, 0.66, '#c8a06a', { x: -1.75, y: y0 + 0.8, z: -2.1 }));
  for (let i = 0; i < 3; i++) {
    g.add(cyl(0.11, 0.1, '#3a4460', { x: -1.95 + i * 0.2, y: y0 + 0.88, z: -2.1, outline: 0.012 }));
  }
  g.add(box(0.6, 0.05, 0.5, '#ff8a3d', { mat: glow('#ff8a3d'), x: -1.75, y: y0 + 0.83, z: -2.1 }));

  // --- chilled bento case by the window ---------------------------------
  g.add(box(1.8, 0.8, 0.7, '#dfe6f2', { x: -4.7, y: y0 + 0.4, z: -0.3, outline: 0.03 }));
  g.add(plane(1.7, 0.6, { mat: glow('#dceeff'), x: -4.7, y: y0 + 0.62, z: 0.06, rx: -0.5 }));
  const benR = rnd(77);
  for (let i = 0; i < 5; i++) {
    g.add(box(0.28, 0.12, 0.4, PRODUCTS[Math.floor(benR() * PRODUCTS.length)], {
      x: -5.35 + i * 0.33, y: y0 + 0.86, z: -0.3, outline: 0.014
    }));
  }
  g.add(box(1.84, 0.08, 0.74, '#c8d2e6', { x: -4.7, y: y0 + 0.84, z: -0.3 }));

  // --- magazine rack by the front glass ---------------------------------
  for (let i = 0; i < 3; i++) {
    g.add(box(0.9, 0.05, 0.34, '#6f788f', { x: -6.75, y: y0 + 0.4 + i * 0.34, z: -0.45 + i * 0.16, rx: 0.35 }));
    g.add(plane(0.8, 0.3, { mat: mapped(posterTexture(i + 1)), x: -6.75, y: y0 + 0.52 + i * 0.34, z: -0.36 + i * 0.16, rx: -1.1 }));
  }
  g.add(box(0.06, 1.3, 0.5, '#6f788f', { x: -7.22, y: y0 + 0.65, z: -0.3 }));
  g.add(box(0.06, 1.3, 0.5, '#6f788f', { x: -6.28, y: y0 + 0.65, z: -0.3 }));

  // --- snack rack near the door -----------------------------------------
  g.add(box(0.8, 1.4, 0.45, '#4b556e', { x: -2.6, y: y0 + 0.7, z: -0.6, outline: 0.03 }));
  for (let i = 0; i < 3; i++) {
    g.add(box(0.74, 0.05, 0.42, '#d9d3c4', { x: -2.6, y: y0 + 0.42 + i * 0.4, z: -0.6 }));
    const r = rnd(101 + i);
    for (let k = 0; k < 5; k++) {
      g.add(box(0.12, 0.2, 0.2, PRODUCTS[Math.floor(r() * PRODUCTS.length)], {
        x: -2.88 + k * 0.15, y: y0 + 0.55 + i * 0.4, z: -0.6
      }));
    }
  }

  // --- floor guidance ----------------------------------------------------
  g.add(box(0.45, 0.015, 3.0, P.tactile, { mat: glow(P.tactile), x: -1.2, y: y0 + 0.01, z: -0.9 }));
  g.add(plane(0.5, 0.5, { mat: mapped(guideTexture()), x: -1.2, y: y0 + 0.02, z: -2.9, rx: -Math.PI / 2 }));

  return { group: g };
}
