import * as THREE from 'three';
import { P } from '../palette.js';
import { L } from '../layout.js';
import { box, plane, cyl, tubeOf, toon, glow, mapped, canvasTex, fitText, geo, rnd, addOutline } from '../kit.js';

const B = L.walkY;

function vendingFace() {
  return canvasTex(256, 512, (ctx, w, h) => {
    ctx.fillStyle = '#dfe8f6';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1d2a46';
    ctx.fillRect(0, 0, w, 44);
    ctx.fillStyle = '#ffffff';
    fitText(ctx, 'HOT  &  COLD', w / 2, 24, w - 20, 26);
    const r = rnd(9);
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 6; i++) {
        const x = 14 + i * 40;
        const y = 70 + row * 100;
        ctx.fillStyle = '#c9d6ea';
        ctx.fillRect(x - 4, y - 8, 36, 74);
        const colors = ['#e8503f', '#4d8ce8', '#ffd75a', '#2fb3a3', '#ff6aa8', '#ff9d3d'];
        ctx.fillStyle = colors[(row * 6 + i) % colors.length];
        ctx.fillRect(x, y, 28, 50);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, 28, 8);
        ctx.fillStyle = '#1d2a46';
        ctx.fillRect(x, y + 60, 28, 12);
      }
    }
    ctx.fillStyle = '#24304e';
    ctx.fillRect(0, h - 96, w, 96);
    ctx.fillStyle = '#9fb4d8';
    ctx.fillRect(w / 2 - 60, h - 70, 120, 42);
  });
}

function binLabel(text, bg) {
  return canvasTex(128, 64, (ctx, w, h) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    fitText(ctx, text, w / 2, h / 2, w - 16, 30);
  });
}

function noticeTexture() {
  return canvasTex(256, 176, (ctx, w, h) => {
    ctx.fillStyle = '#2b3352';
    ctx.fillRect(0, 0, w, h);
    const r = rnd(23);
    const papers = ['#f6f3e8', '#ffe9c9', '#e7f1ff', '#ffe0e0', '#e6ffe9'];
    for (let i = 0; i < 6; i++) {
      const pw = 60 + r() * 24;
      const ph = 54 + r() * 26;
      const x = 16 + (i % 3) * 76;
      const y = 16 + Math.floor(i / 3) * 78;
      ctx.fillStyle = papers[i % papers.length];
      ctx.fillRect(x, y, pw, ph);
      ctx.fillStyle = 'rgba(40,50,80,0.55)';
      for (let l = 0; l < 4; l++) ctx.fillRect(x + 6, y + 10 + l * 12, pw - 16, 4);
    }
  });
}

function seg(x1, y1, x2, y2, t, color, z = 0) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  return box(len, t, t, color, { x: (x1 + x2) / 2, y: (y1 + y2) / 2, z, rz: Math.atan2(dy, dx) });
}

function bicycle(parent, x, z, ry, color, y = B) {
  const g = new THREE.Group();
  const R = 0.34;
  const wheel = geo('bikewheel', () => new THREE.TorusGeometry(1, 0.07, 8, 26));
  const hub = geo('bikehub', () => new THREE.CylinderGeometry(1, 1, 1, 8));
  for (const wx of [-0.62, 0.62]) {
    const w = new THREE.Mesh(wheel, toon('#171c2c'));
    w.scale.set(R, R, R);
    w.position.set(wx, R, 0);
    g.add(w);
    const h = new THREE.Mesh(hub, toon('#8f98ad'));
    h.scale.set(0.05, 0.1, 0.05);
    h.rotation.x = Math.PI / 2;
    h.position.set(wx, R, 0);
    g.add(h);
  }
  g.add(seg(-0.62, R, -0.3, 1.0, 0.055, color));
  g.add(seg(-0.3, 1.0, 0.48, 1.0, 0.055, color));
  g.add(seg(0.48, 1.0, -0.34, 0.42, 0.055, color));
  g.add(seg(-0.34, 0.42, -0.62, R, 0.05, color));
  g.add(seg(-0.34, 0.42, -0.3, 1.0, 0.05, color));
  g.add(seg(0.48, 1.0, 0.62, R, 0.05, '#2a3350'));
  g.add(seg(0.46, 1.0, 0.52, 1.3, 0.05, '#2a3350'));
  g.add(box(0.06, 0.05, 0.42, '#2a3350', { x: 0.52, y: 1.32, rz: 0.12 }));
  g.add(box(0.3, 0.08, 0.16, '#1f2740', { x: -0.34, y: 1.08, rz: -0.12, outline: 0.012 }));
  g.add(cyl(0.12, 0.04, '#2a3350', { x: -0.34, y: 0.42, z: 0.06, rx: Math.PI / 2 }));
  g.add(box(0.34, 0.26, 0.3, '#59617c', { x: 0.72, y: 1.1, outline: 0.02 }));
  g.position.set(x, y, z);
  g.rotation.y = ry;
  g.rotation.z = 0.05;
  parent.add(g);
  return g;
}

function vendingSide() {
  return canvasTex(128, 256, (ctx, w, h) => {
    ctx.fillStyle = '#1d2a46';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#2fb3a3';
    ctx.fillRect(6, 6, w - 12, 58);
    ctx.fillStyle = '#ffffff';
    fitText(ctx, 'MIDORI', w / 2, 36, w - 24, 26);
    ctx.fillStyle = '#ff9d3d';
    ctx.fillRect(6, h - 74, w - 12, 68);
    ctx.fillStyle = '#1d2a46';
    fitText(ctx, 'DRINKS', w / 2, h - 40, w - 24, 26);
  });
}

export function buildProps(scene) {
  const g = new THREE.Group();
  scene.add(g);

  // --- vending machine on the east wall --------------------------------
  g.add(box(0.78, 1.9, 0.95, '#dde5f2', { x: 1.44, y: B + 0.95, z: -3.0, outline: 0.04 }));
  g.add(box(0.8, 0.14, 0.97, '#c3ccdd', { x: 1.44, y: B + 0.07, z: -3.0 }));
  g.add(plane(0.86, 1.6, { mat: mapped(vendingFace()), x: 1.84, y: B + 1.12, z: -3.0, ry: Math.PI / 2 }));
  g.add(plane(0.7, 1.4, { mat: mapped(vendingSide()), x: 1.44, y: B + 1.15, z: -2.517 }));
  g.add(box(0.05, 0.5, 0.9, '#24304e', { x: 1.83, y: B + 0.3, z: -3.0, outline: 0.012 }));
  const vLight = new THREE.PointLight('#7fd8ff', 3.5, 4.5, 2);
  vLight.position.set(2.3, B + 1.2, -3.0);
  g.add(vLight);

  // --- bicycles ----------------------------------------------------------
  bicycle(g, -5.3, 1.9, 0.18, '#3f7fd8');
  bicycle(g, -8.85, -7.0, Math.PI / 2 + 0.2, '#c8506a', L.alley.y);

  // --- umbrella stand ----------------------------------------------------
  g.add(cyl(0.19, 0.5, '#3d4661', { x: 0.6, y: B + 0.25, z: 1.5, outline: 0.02 }));
  g.add(cyl(0.21, 0.06, '#2c3450', { x: 0.6, y: B + 0.5, z: 1.5 }));
  const umb = [[0.06, -0.5, '#d8434f'], [0.0, 0.3, '#27324e'], [-0.08, 0.9, '#e8f2ff']];
  for (const [dx, tilt, col] of umb) {
    const u = new THREE.Group();
    u.add(cyl(0.018, 1.25, '#7b849c', { y: 0.62 }));
    u.add(tubeOf(0.03, 0.11, 0.62, 10, col, { y: 0.78 }));
    u.add(cyl(0.03, 0.1, '#7b849c', { y: 0.05 }));
    u.position.set(0.6 + dx, B + 0.1, 1.5);
    u.rotation.z = tilt * 0.35;
    u.rotation.x = tilt * 0.2;
    g.add(u);
  }

  // --- bins and crates ---------------------------------------------------
  const bin = (x, z, w, h, d, body, lid, label, text) => {
    g.add(box(w, h, d, body, { x, y: B + h / 2, z, outline: 0.03 }));
    g.add(box(w + 0.06, 0.1, d + 0.06, lid, { x, y: B + h + 0.05, z, outline: 0.02 }));
    g.add(plane(w * 0.7, h * 0.3, { mat: mapped(binLabel(text, body)), x, y: B + h * 0.6, z: z + d / 2 + 0.01 }));
  };
  bin(-3.1, 1.55, 0.52, 0.82, 0.46, '#2f6b4f', '#235140', '#2f6b4f', 'BURN');
  bin(-3.75, 1.55, 0.46, 0.7, 0.42, '#5c657f', '#454d66', '#5c657f', 'PET');
  for (let i = 0; i < 3; i++) {
    g.add(box(0.44, 0.28, 0.32, ['#4d8ce8', '#e8503f', '#2fb3a3'][i], {
      x: -4.5, y: B + 0.14 + i * 0.29, z: 1.5, outline: 0.02
    }));
  }

  // --- notice board ------------------------------------------------------
  for (const x of [-7.5, -6.3]) g.add(cyl(0.045, 1.0, '#4a526b', { x, y: B + 0.5, z: 1.8, outline: 0.012 }));
  g.add(box(1.5, 1.05, 0.1, '#2b3352', { x: -6.9, y: B + 1.5, z: 1.8, outline: 0.03 }));
  g.add(plane(1.36, 0.9, { mat: mapped(noticeTexture()), x: -6.9, y: B + 1.5, z: 1.86 }));
  g.add(box(1.56, 0.1, 0.2, '#1f2740', { x: -6.9, y: B + 2.06, z: 1.8, outline: 0.02 }));

  // poster case on the neighbour building's south wall
  g.add(box(0.95, 1.25, 0.1, '#1f2740', { x: -10.5, y: B + 1.5, z: 0.56, outline: 0.03 }));
  g.add(plane(0.8, 1.1, { mat: glow('#f4ead0'), x: -10.5, y: B + 1.5, z: 0.62 }));
  g.add(plane(0.7, 1.0, { mat: mapped(noticeTexture()), x: -10.5, y: B + 1.5, z: 0.63 }));

  // --- alley dressing ----------------------------------------------------
  const A = L.alley;
  const ay = A.y;
  // service door in the store's west wall
  g.add(box(0.08, 2.0, 0.95, '#5b6480', { x: -8.05, y: ay + 1.0, z: -4.6, outline: 0.025 }));
  g.add(box(0.05, 0.5, 0.3, '#8f98ad', { x: -8.1, y: ay + 1.5, z: -4.6 }));
  g.add(cyl(0.03, 0.1, '#d8dfee', { x: -8.1, y: ay + 1.0, z: -4.25, rz: Math.PI / 2 }));
  // wall lamp over the service door
  g.add(box(0.34, 0.08, 0.1, '#333b58', { x: -8.2, y: ay + 2.35, z: -4.6 }));
  g.add(box(0.26, 0.16, 0.26, '#ffe6bb', { mat: glow('#ffe6bb'), x: -8.34, y: ay + 2.24, z: -4.6, outline: 0.02 }));
  const alleyLight = new THREE.PointLight('#ffcf96', 7, 6.5, 2);
  alleyLight.position.set(-8.5, ay + 2.2, -4.6);
  g.add(alleyLight);

  // stacked crates and a milk crate in the alley
  const crateColors = ['#4d8ce8', '#e8503f', '#3f9f6f', '#4d8ce8', '#e8503f'];
  const cratePlan = [
    [-9.1, -1.5, 0], [-8.6, -1.5, 0], [-8.85, -1.5, 1],
    [-9.1, -2.2, 0], [-8.6, -2.2, 0]
  ];
  cratePlan.forEach(([cx, cz, lvl], i) => {
    g.add(box(0.46, 0.3, 0.56, crateColors[i], { x: cx, y: ay + 0.16 + lvl * 0.31, z: cz, outline: 0.022 }));
  });
  g.add(box(0.5, 0.3, 0.4, '#8c8f7a', { x: -8.4, y: ay + 0.16, z: -8.2, outline: 0.02, ry: 0.3 }));

  // drain channel along the alley edge
  g.add(box(0.26, 0.02, 9.6, '#141a2c', { x: A.x0 + 0.14, y: ay + 0.01, z: -3.9 }));

  // wall pipes on the neighbour's alley face
  for (const z of [-2.2, -6.4]) {
    g.add(cyl(0.05, 5.0, '#4a526b', { x: -9.55, y: B + 2.5, z, outline: 0.012 }));
  }

  // --- painted parking mark ---------------------------------------------
  const pMat = new THREE.MeshBasicMaterial({ map: paintP(), transparent: true, depthWrite: false });
  g.add(plane(0.9, 1.1, { mat: pMat, x: 5.75, y: 0.107, z: 9.4, rx: -Math.PI / 2 }));

  return { group: g };
}

function paintP() {
  return canvasTex(128, 160, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(232,238,252,0.92)';
    ctx.font = "800 120px 'Trebuchet MS', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', w / 2, h / 2);
  });
}
