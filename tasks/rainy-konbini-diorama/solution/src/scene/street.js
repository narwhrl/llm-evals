import * as THREE from 'three';
import { toon, toonMap, glow, halo } from '../core/materials.js';
import { canvasTexture, text } from '../core/canvas.js';
import { POLES, ROAD, SIDE_ROAD, NEAR_WALK, MAIN_CROSS, CURB, PAL } from './layout.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const POLE_H = 7.4;

function signTexture(kind) {
  return canvasTexture(256, 256, (g, w) => {
    g.clearRect(0, 0, w, w);
    if (kind === 'stop') {
      g.fillStyle = '#ffffff';
      g.beginPath();
      g.moveTo(8, 20);
      g.lineTo(248, 20);
      g.lineTo(128, 236);
      g.closePath();
      g.fill();
      g.fillStyle = '#d42a2a';
      g.beginPath();
      g.moveTo(26, 30);
      g.lineTo(230, 30);
      g.lineTo(128, 214);
      g.closePath();
      g.fill();
      text(g, '止まれ', 128, 82, 56, '#ffffff', { weight: 900 });
    } else if (kind === 'speed') {
      g.fillStyle = '#ffffff';
      g.beginPath();
      g.arc(128, 128, 124, 0, 7);
      g.fill();
      g.fillStyle = '#d42a2a';
      g.beginPath();
      g.arc(128, 128, 116, 0, 7);
      g.fill();
      g.fillStyle = '#ffffff';
      g.beginPath();
      g.arc(128, 128, 88, 0, 7);
      g.fill();
      text(g, '30', 128, 134, 110, '#1d3b8f', { font: 'Arial, sans-serif', weight: 800 });
    } else if (kind === 'cross') {
      g.fillStyle = '#ffffff';
      g.fillRect(4, 4, 248, 248);
      g.fillStyle = '#1e5fbf';
      g.fillRect(14, 14, 228, 228);
      g.fillStyle = '#ffffff';
      g.beginPath();
      g.moveTo(128, 30);
      g.lineTo(228, 206);
      g.lineTo(28, 206);
      g.closePath();
      g.fill();
      g.fillStyle = '#1e1e1e';
      g.beginPath();
      g.arc(128, 92, 13, 0, 7);
      g.fill();
      g.fillRect(118, 108, 20, 44);
      g.fillRect(96, 180, 64, 10);
      for (let i = 0; i < 4; i++) g.fillRect(84 + i * 24, 192, 14, 8);
    } else {
      g.fillStyle = '#ffffff';
      g.fillRect(0, 0, w, w);
      g.fillStyle = '#1d3b8f';
      g.fillRect(8, 8, w - 16, w - 16);
      text(g, '月見町', 128, 90, 64, '#ffffff');
      text(g, '二丁目 4', 128, 176, 48, '#ffffff');
    }
  });
}

function signPlate(ctx, kind, w, h, x, y, z, ry) {
  const mat = toonMap(signTexture(kind), { transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  ctx.root.add(m);
  return m;
}

function sag(a, b, drop, steps = 16) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = a.clone().lerp(b, t);
    p.y -= drop * 4 * t * (1 - t);
    pts.push(p);
  }
  return new THREE.CatmullRomCurve3(pts);
}

function poles(ctx) {
  const { b } = ctx;
  const concrete = toon(PAL.pole);
  const arms = [];
  POLES.forEach(([x, z], i) => {
    b.cyl(concrete, x, 0, z, 0.15, POLE_H, 10, 0.1);
    // Neighbouring poles define the span direction; the crossarm is perpendicular to it.
    const next = POLES[i === 0 ? 1 : i === 3 ? 0 : i - 1];
    const dir = V(next[0] - x, 0, next[1] - z).normalize();
    const side = V(-dir.z, 0, dir.x);
    const arm = [];
    for (const [y, half] of [
      [POLE_H - 0.35, 0.8],
      [POLE_H - 0.95, 0.6],
    ]) {
      const a = V(x, y, z).addScaledVector(side, -half);
      const c = V(x, y, z).addScaledVector(side, half);
      b.rod(toon(0x6f7680), a, c, 0.045);
      for (const s of [-1, 0, 1]) {
        const p = V(x, y, z).addScaledVector(side, s * half * 0.85);
        b.cyl(toon(0xf3f3f0), p.x, y + 0.02, p.z, 0.04, 0.12, 6);
        if (s !== 0 || y > POLE_H - 0.5) arm.push(p.clone().setY(y + 0.12));
      }
    }
    arms.push(arm);
    // Yellow-black guard sleeve, step bolts, blue address plate.
    for (let k = 0; k < 6; k++) b.cyl(toon(k % 2 ? 0x222222 : 0xf2c230), x, 0.3 + k * 0.28, z, 0.158, 0.28, 10);
    for (let k = 0; k < 8; k++) {
      const ang = k * 1.7;
      b.box(toon(0x555b66), x + Math.cos(ang) * 0.14, 2.6 + k * 0.45, z + Math.sin(ang) * 0.14, 0.16, 0.03, 0.03, 0, -ang);
    }
    if (i === 0 || i === 1) {
      b.cyl(toon(0x8a919b), x + side.x * 0.35, POLE_H - 2.2, z + side.z * 0.35, 0.22, 0.6, 12);
      b.box(toon(0x6f7680), x + side.x * 0.18, POLE_H - 1.9, z + side.z * 0.18, 0.3, 0.05, 0.05, 0, Math.atan2(-side.z, side.x));
    }
  });
  signPlate(ctx, 'address', 0.3, 0.3, POLES[0][0] + 0.16, 2.3, POLES[0][1], Math.PI / 2);
  signPlate(ctx, 'address', 0.3, 0.3, POLES[1][0], 2.3, POLES[1][1] + 0.16, 0);

  // Security lamp on the corner pole.
  const [px, pz] = POLES[0];
  b.rod(toon(0x6f7680), V(px, 4.6, pz), V(px + 0.55, 4.75, pz + 0.2), 0.03);
  b.box(toon(0xdfe3ea), px + 0.6, 4.72, pz + 0.22, 0.34, 0.08, 0.14);
  b.box(glow(0xd8f0ff, 4), px + 0.6, 4.67, pz + 0.22, 0.3, 0.02, 0.1);

  // Wires: power along the frontage, branch down the side street, service drop to the store.
  const wireMat = toon(0x161a24);
  const tube = (curve, r) => {
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, r, 4), wireMat);
    ctx.root.add(m);
  };
  const spans = [
    [0, 1],
    [1, 2],
    [0, 3],
  ];
  for (const [a, c] of spans) {
    const n = Math.min(arms[a].length, arms[c].length);
    for (let k = 0; k < n; k++) tube(sag(arms[a][k], arms[c][k], 0.35 + k * 0.06), 0.012);
  }
  tube(sag(V(POLES[1][0], 5.6, POLES[1][1]), V(-2.6, 3.5, 0.6), 0.25), 0.01);
  tube(sag(V(POLES[0][0], 5.9, POLES[0][1]), V(2.7, 3.5, -3.8), 0.3), 0.01);
  tube(sag(V(POLES[2][0], 5.4, POLES[2][1]), V(-8.8, 4.2, -6.4), 0.3), 0.01);
}

function streetlight(ctx) {
  const { b } = ctx;
  const x = -1.0;
  const z = ROAD.z0 - 0.5;
  const mat = toon(0x9ba2ad);
  b.cyl(mat, x, CURB, z, 0.08, 5.3, 10, 0.06);
  const pts = [V(x, 5.3, z), V(x, 5.8, z + 0.3), V(x, 5.9, z + 1.0), V(x, 5.85, z + 1.6)];
  const curve = new THREE.CatmullRomCurve3(pts);
  ctx.root.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.05, 6), mat));
  b.box(toon(0x7e8592), x, 5.82, z + 1.75, 0.3, 0.1, 0.62);
  b.box(glow(0xe4f2ff, 6), x, 5.765, z + 1.75, 0.24, 0.02, 0.5);
  const l = new THREE.SpotLight(0xcfe4ff, 60, 11, 0.68, 0.55, 2);
  l.position.set(x, 5.7, z + 1.75);
  l.target.position.set(x, 0, z + 2.2);
  l.castShadow = true;
  l.shadow.mapSize.set(1024, 1024);
  l.shadow.bias = -0.0005;
  l.shadow.camera.near = 0.5;
  l.shadow.camera.far = 12;
  ctx.root.add(l, l.target);
  const pool = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 4.5), halo(0x7fa8ff, 0.18));
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(x, 0.02, z + 2.1);
  ctx.root.add(pool);
  ctx.noOutline.push(pool);
  ctx.noReflect.push(pool);
  ctx.rainLights.push([x, 5.7, z + 1.75, 0.9]);
}

function signalCycle(t) {
  const c = t % 34;
  const car = c < 14 ? 0 : c < 17 ? 1 : 2;
  const walk = c < 14 ? (c < 10 || Math.floor(c * 4) % 2 === 0 ? 1 : 0) : 0;
  return { car, walk, dontWalk: walk ? 0 : 1 };
}

function signals(ctx) {
  const { b } = ctx;
  const mat = toon(0x8e949e);
  const housing = toon(0x3a4050);
  // Vehicle signal far down the side street, facing the junction.
  const sx = SIDE_ROAD.x1 + 0.4;
  const sz = -6.8;
  b.cyl(mat, sx, CURB, sz, 0.1, 5.2, 10, 0.08);
  b.rod(mat, V(sx, 5.0, sz), V(SIDE_ROAD.x0 + 1.6, 5.0, sz), 0.05);
  const hx = SIDE_ROAD.x0 + 2.2;
  b.box(housing, hx, 5.0, sz, 1.1, 0.36, 0.2);
  const car = [0x3dffb0, 0xffc233, 0xff3b3b].map((c) => new THREE.MeshBasicMaterial({ color: c }));
  const carCols = car.map((m) => m.color.clone());
  for (let i = 0; i < 3; i++) {
    const lamp = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), car[i]);
    lamp.position.set(hx - 0.34 + i * 0.34, 5.0, sz + 0.105);
    ctx.root.add(lamp);
    b.box(housing, hx - 0.34 + i * 0.34, 5.14, sz + 0.14, 0.3, 0.03, 0.12);
  }

  // Pedestrian signals facing each other across the main crosswalk.
  const cx = (MAIN_CROSS.x0 + MAIN_CROSS.x1) / 2 + 1.3;
  const peds = [];
  for (const [z, ry] of [
    [ROAD.z0 - 0.35, 0],
    [NEAR_WALK.z0 + 0.35, Math.PI],
  ]) {
    b.cyl(mat, cx, CURB, z, 0.07, 3.0, 8);
    b.push(cx, 0, z, ry);
    b.box(housing, 0, 2.55, 0.14, 0.34, 0.7, 0.22);
    b.pop();
    const red = new THREE.MeshBasicMaterial({ color: 0xff4a3a });
    const green = new THREE.MeshBasicMaterial({ color: 0x3dffb0 });
    for (const [m, y] of [
      [red, 2.72],
      [green, 2.38],
    ]) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.28), m);
      p.position.set(cx, y, z + Math.cos(ry) * 0.255);
      p.rotation.y = ry;
      ctx.root.add(p);
    }
    peds.push({ red, green });
  }
  signPlate(ctx, 'cross', 0.5, 0.5, cx, 3.25, ROAD.z0 - 0.3, 0);

  const off = new THREE.Color(0x10141c);
  const redC = new THREE.Color(0xff4a3a);
  const greenC = new THREE.Color(0x3dffb0);
  ctx.updaters.push((t) => {
    const s = signalCycle(t);
    for (let i = 0; i < 3; i++) {
      // Lit lamps breathe very slightly so the distant signal reads as alive.
      const on = i === s.car;
      const k = on ? 3.2 + 0.25 * Math.sin(t * 3.1 + i) : 0.06;
      car[i].color.copy(carCols[i]).multiplyScalar(k);
    }
    for (const p of peds) {
      p.red.color.copy(s.dontWalk ? redC : off).multiplyScalar(s.dontWalk ? 3 : 1);
      p.green.color.copy(s.walk ? greenC : off).multiplyScalar(s.walk ? 3 : 1);
    }
  });
}

function roadSigns(ctx) {
  const { b } = ctx;
  const mat = toon(0x9aa2ad);
  const x = SIDE_ROAD.x0 - 0.35;
  const z = 0.4;
  b.cyl(mat, x, CURB, z, 0.04, 2.6, 8);
  signPlate(ctx, 'stop', 0.75, 0.68, x + 0.05, 2.35, z, Math.PI / 2);
  const rx = SIDE_ROAD.x1 + 0.35;
  b.cyl(mat, rx, CURB, -3.2, 0.04, 2.6, 8);
  signPlate(ctx, 'speed', 0.6, 0.6, rx, 2.25, -3.2 + 0.05, 0.6);
}

function rails(ctx) {
  const { b } = ctx;
  const post = toon(0xf2f2ee);
  const run = (pts) => {
    for (let i = 0; i < pts.length - 1; i++) {
      const a = V(pts[i][0], 0, pts[i][1]);
      const c = V(pts[i + 1][0], 0, pts[i + 1][1]);
      const len = a.distanceTo(c);
      const n = Math.max(1, Math.round(len / 1.4));
      for (let k = 0; k <= n; k++) {
        if (k === n && i < pts.length - 2) continue;
        const p = a.clone().lerp(c, k / n);
        b.cyl(post, p.x, CURB, p.z, 0.035, 0.85, 8);
      }
      for (const y of [0.55, 0.95]) b.rod(post, a.clone().setY(y), c.clone().setY(y), 0.03);
    }
  };
  const nz = NEAR_WALK.z0 + 0.22;
  run([
    [-8.6, nz],
    [MAIN_CROSS.x0 - 0.3, nz],
  ]);
  run([
    [MAIN_CROSS.x1 + 0.3, nz],
    [8.6, nz],
  ]);
  const sz = ROAD.z0 - 0.22;
  run([
    [-1.2, sz],
    [MAIN_CROSS.x0 - 0.3, sz],
  ]);
  const cx = SIDE_ROAD.x0 - 0.22;
  run([
    [cx, -1.2],
    [cx, -6.8],
  ]);
  const rx = SIDE_ROAD.x1 + 0.22;
  run([
    [rx, 0.8],
    [rx, -6.2],
  ]);
}

export function buildStreet(ctx) {
  poles(ctx);
  streetlight(ctx);
  signals(ctx);
  roadSigns(ctx);
  rails(ctx);
}
