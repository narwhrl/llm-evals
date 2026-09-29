import * as THREE from 'three';
import { P } from '../palette.js';
import { L } from '../layout.js';
import { box, plane, toon, toonMap, glow, canvasTex, geo, rnd } from '../kit.js';

const MARK = '#d3ddf2';

function walkTexture() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#3d445e';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(18,24,44,0.6)';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, w, h);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    const r = rnd(7);
    ctx.fillStyle = 'rgba(90,100,140,0.35)';
    for (let i = 0; i < 90; i++) {
      ctx.fillRect(r() * w, r() * h, 3, 3);
    }
  }, { repeat: [15, 15] });
}

function asphaltTexture() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#2b3450';
    ctx.fillRect(0, 0, w, h);
    const r = rnd(31);
    for (let i = 0; i < 240; i++) {
      const a = r() * 0.16;
      ctx.fillStyle = `rgba(150,165,210,${a})`;
      ctx.fillRect(r() * w, r() * h, 2, 2);
    }
    ctx.fillStyle = 'rgba(10,14,26,0.35)';
    for (let i = 0; i < 120; i++) ctx.fillRect(r() * w, r() * h, 5, 4);
  }, { repeat: [14, 6] });
}

function radialPool(color) {
  return canvasTex(160, 160, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}

// Fading streak used for neon reflected on wet asphalt.
function streakTexture(color) {
  return canvasTex(64, 256, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, color);
    g.addColorStop(0.45, color.replace(')', ',0.35)').replace('rgb', 'rgba'));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    const r = rnd(5);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 26; i++) {
      ctx.fillStyle = `rgba(0,0,0,${0.15 + r() * 0.4})`;
      ctx.fillRect(0, r() * h, w, 2 + r() * 6);
    }
  });
}

export function buildBase(scene) {
  const g = new THREE.Group();
  scene.add(g);

  // plinth + tabletop frame
  g.add(box(L.baseSize, 1.6, L.baseSize, P.plinth, { y: -0.8, outline: 0.07 }));
  g.add(box(L.tabletop * 2, 0.06, L.tabletop * 2, '#252c44', { y: 0.03 }));

  // roads
  const roadMat = toonMap(P.asphaltWet, asphaltTexture());
  g.add(box(23, 0.04, 8, null, { mat: roadMat, y: 0.08, z: 7.5 }));
  g.add(box(8, 0.04, 15, null, { mat: roadMat, y: 0.08, x: 7.5, z: -4 }));

  // sidewalk block (top carries the paving texture, sides read as kerb)
  const walkSide = toon(P.walkEdge);
  const walkTop = toonMap(P.walk, walkTexture());
  const walkGeo = geo('walkblock', () => new THREE.BoxGeometry(1, 1, 1));
  const block = new THREE.Mesh(walkGeo, [walkSide, walkSide, walkTop, walkSide, walkSide, walkSide]);
  block.scale.set(15, 0.14, 15);
  block.position.set(-4, 0.17, -4);
  g.add(block);

  // alley floor, a shade above the paving so the corridor reads as asphalt
  g.add(box(L.alley.x1 - L.alley.x0, 0.07, L.alley.z1 - L.alley.z0, P.alley, {
    x: (L.alley.x0 + L.alley.x1) / 2,
    y: 0.21,
    z: (L.alley.z0 + L.alley.z1) / 2
  }));

  // gutters along both kerbs
  g.add(box(15, 0.012, 0.42, P.gutter, { x: -4, y: 0.104, z: 3.71 }));
  g.add(box(0.42, 0.012, 15, P.gutter, { x: 3.71, y: 0.104, z: -4 }));
  for (const [x, z, rot] of [[-6.4, 3.71, 0], [0.6, 3.71, 0], [3.71, -5.2, 1], [3.71, 1.4, 1]]) {
    const grate = new THREE.Group();
    grate.add(box(rot ? 0.36 : 0.86, 0.02, rot ? 0.86 : 0.36, '#0f1424', { y: 0.006 }));
    for (let i = -1; i <= 1; i++) {
      grate.add(box(rot ? 0.3 : 0.06, 0.02, rot ? 0.06 : 0.3, '#2b3550', { x: rot ? 0 : i * 0.24, y: 0.014, z: rot ? i * 0.24 : 0 }));
    }
    grate.position.set(x, 0.1, z);
    g.add(grate);
  }

  // --- road markings (slightly proud of the wet surface so they read bright)
  const my = 0.104;
  const stripe = (w, d, x, z) => g.add(box(w, 0.008, d, MARK, { mat: glow(MARK), y: my, x, z }));

  // south crosswalk
  for (let i = 0; i < 10; i++) stripe(0.34, 7.3, -5.6 + i * 0.55, 7.6);
  // east crosswalk
  for (let i = 0; i < 10; i++) stripe(7.3, 0.34, 7.6, -5.6 + i * 0.55);
  // lane dashes
  for (let x = -11; x <= 11; x += 1.6) {
    if (x > -6.7 && x < -0.1) continue;
    stripe(0.9, 0.14, x, 7.5);
  }
  for (let z = -11; z <= 3; z += 1.6) {
    if (z > -6.7 && z < -0.1) continue;
    stripe(0.14, 0.9, 7.5, z);
  }
  // parking bays
  for (const x of [2.6, 4.7, 6.8, 8.9]) stripe(0.14, 1.5, x, 10.6);
  stripe(6.4, 0.14, 5.75, 9.9);
  for (const x of [3.6, 5.7, 7.8]) {
    g.add(box(1.1, 0.1, 0.24, P.tactile, { x, y: 0.15, z: 11.25, outline: 0.02 }));
  }

  // alley threshold line + tactile guidance strip from the door
  g.add(box(1.5, 0.01, 0.3, '#c8d2ea', { mat: glow('#c8d2ea'), x: -8.8, y: 0.178, z: 1.0 }));

  // --- puddles --------------------------------------------------------
  const circle = geo('circle', () => new THREE.CircleGeometry(1, 28));
  const puddleMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#31436b'),
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });
  const puddles = [
    { x: -4.5, z: 6.6, rx: 2.3, rz: 1.2 },
    { x: 3.4, z: 5.2, rx: 1.5, rz: 0.9 },
    { x: 7.6, z: -3.6, rx: 1.2, rz: 2.3 },
    { x: -8.6, z: 9.7, rx: 2.0, rz: 1.0 },
    { x: 0.6, z: 10.5, rx: 1.4, rz: 0.8 },
    { x: 9.6, z: 1.6, rx: 1.5, rz: 1.1 },
    { x: -6.4, z: 2.7, rx: 1.1, rz: 0.5, walk: true },
    { x: 2.3, z: -6.4, rx: 0.8, rz: 1.3, walk: true },
    { x: -8.8, z: -3.6, rx: 0.9, rz: 2.2, alley: true },
    { x: -6.2, z: 8.4, rx: 1.0, rz: 0.7 }
  ];
  for (const p of puddles) {
    const m = new THREE.Mesh(circle, puddleMat);
    m.rotation.x = -Math.PI / 2;
    m.scale.set(p.rx, p.rz, 1);
    m.position.set(p.x, p.walk ? L.walkY + 0.004 : p.alley ? L.alley.y + 0.004 : L.roadY + 0.004, p.z);
    g.add(m);
  }

  // --- wet reflections ------------------------------------------------
  const reflectionMats = [];
  const reflect = (w, d, x, y, z, tex, opacity, ry = 0) => {
    const m = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const mesh = plane(w, d, { mat: m, rx: -Math.PI / 2, ry, x, y, z });
    g.add(mesh);
    reflectionMats.push(m);
    return m;
  };

  const warmStreak = streakTexture('rgb(255,170,90)');
  const cyanStreak = streakTexture('rgb(90,220,255)');
  const pinkStreak = streakTexture('rgb(255,110,170)');
  const greenStreak = streakTexture('rgb(90,255,160)');

  // shop lightbox bleeding across the wet crossing
  reflect(6.4, 5.6, -1.4, L.roadY + 0.008, 6.2, warmStreak, 0.5);
  reflect(4.0, 3.2, -4.6, L.roadY + 0.008, 2.4, warmStreak, 0.3);
  // vending machine and neon spill
  reflect(2.0, 2.6, 2.4, L.walkY + 0.006, -1.6, cyanStreak, 0.5);
  reflect(3.0, 4.4, 6.2, L.roadY + 0.008, -2.4, cyanStreak, 0.28);
  reflect(2.4, 3.6, -9.0, L.roadY + 0.008, 5.0, pinkStreak, 0.22);
  // traffic signal shimmer far up the street
  const signalRefl = reflect(1.6, 3.2, 5.4, L.roadY + 0.008, -8.4, greenStreak, 0.3);

  // light pools
  const pool = (size, x, y, z, tex, opacity) => {
    const m = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const mesh = plane(size, size, { mat: m, rx: -Math.PI / 2, x, y, z });
    g.add(mesh);
    reflectionMats.push(m);
  };
  const warmPoolTex = radialPool('rgba(255,205,140,0.9)');
  const coolPoolTex = radialPool('rgba(150,190,255,0.75)');
  pool(7.0, -1.2, L.roadY + 0.01, 4.6, warmPoolTex, 0.35);
  pool(6.0, -1.0, L.walkY + 0.006, 1.9, warmPoolTex, 0.3);
  pool(6.4, 5.4, L.roadY + 0.01, 5.0, warmPoolTex, 0.32);
  pool(5.0, 4.6, L.roadY + 0.01, -4.6, coolPoolTex, 0.16);

  return { group: g, puddles, reflectionMats, signalRefl };
}
