// Hand-built landmarks: station and platform, town hall, church, factory and outlying buildings.
import * as THREE from 'three';
import { mat, mul, shade } from './kit.js';
import { STATION } from './layout.js';
import { FLOOR0, FRAME, windowAt, door, gableRoof, hipRoof, building } from './buildings.js';
import { signTexture } from './textures.js';

const I = new THREE.Matrix4();
const GREEN = '#3d5a4a';

function signMesh(text, w, h, matrix, opts) {
  const tex = signTexture(text, opts);
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: '#ffffff', emissiveIntensity: 0, roughness: 0.6 }),
  );
  m.applyMatrix4(matrix);
  return m;
}

function clock(kit, F, x, y, z, ry, r = 0.13) {
  const nx = Math.sin(ry);
  const nz = Math.cos(ry);
  kit.cyl('paint', GREEN, F, r + 0.025, r + 0.025, 0.02, x + nx * 0.01, y, z + nz * 0.01, 20, Math.PI / 2, 0, ry);
  kit.cyl('glow', '#f6f1e2', F, r, r, 0.02, x + nx * 0.02, y, z + nz * 0.02, 20, Math.PI / 2, 0, ry);
  kit.box('paint', '#222', F, 0.012, r * 0.75, 0.01, x + nx * 0.032, y + r * 0.3, z + nz * 0.032, ry);
  kit.box('paint', '#222', F, r * 0.55, 0.012, 0.01, x + nx * 0.034 + Math.cos(ry) * r * 0.25, y, z + nz * 0.034 - Math.sin(ry) * r * 0.25, ry);
}

function station(kit, signs) {
  const b = STATION.building;
  const F = mat(b.x, 0, b.z, Math.PI);
  const wall = '#efe2c4';
  const quoin = '#d2c3a2';
  kit.box('stone', '#a69e90', F, b.w + 0.06, 0.1, b.d + 0.06, 0, 0.05, 0);
  // Two-storey centre block with a clock cupola, between single-storey wings.
  const cw = 1.9;
  const H = 1.55;
  kit.rbox('paint', wall, F, cw, H, b.d, 0, H / 2, 0, 0, 0.02);
  kit.box('paint', quoin, F, cw + 0.03, 0.04, b.d + 0.03, 0, FLOOR0 + 0.06, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) kit.box('paint', quoin, F, 0.07, H, 0.07, (sx * cw) / 2, H / 2, (sz * b.d) / 2);
  hipRoof(kit, F, cw, b.d, H, '#545c66', 0.32);
  kit.rbox('paint', wall, F, 0.44, 0.42, 0.44, 0, H + 0.5, 0, 0, 0.02);
  for (const r of [0, Math.PI]) clock(kit, F, 0, H + 0.52, Math.cos(r) * 0.22, r, 0.12);
  kit.add('roof', new THREE.ConeGeometry(0.38, 0.36, 4, 1), '#545c66', mul(F, mat(0, H + 0.89, 0, Math.PI / 4)));
  kit.cyl('metal', '#c9a24a', F, 0.012, 0.012, 0.22, 0, H + 1.15, 0, 6);
  const ww = (b.w - cw) / 2;
  const wh = 0.76;
  for (const s of [-1, 1]) {
    const x = s * (cw / 2 + ww / 2);
    kit.rbox('paint', wall, F, ww, wh, b.d - 0.2, x, wh / 2, 0, 0, 0.02);
    hipRoof(kit, mul(F, mat(x, 0, 0)), ww, b.d - 0.2, wh, '#5c646e', 0.4);
    for (const z of [(b.d - 0.2) / 2, -(b.d - 0.2) / 2]) {
      const ry = z > 0 ? 0 : Math.PI;
      windowAt(kit, F, x - 0.25, 0.38, z, ry, true, 0.2, 0.32);
      windowAt(kit, F, x + 0.25, 0.38, z, ry, true, 0.2, 0.32);
    }
  }
  // Plaza side (local +z): main doors, clock and name board.
  door(kit, F, 0, b.d / 2, 0, '#5b3a29', 0.44, 0.5);
  for (const x of [-0.62, 0.62]) windowAt(kit, F, x, 0.36, b.d / 2, 0, true, 0.22, 0.32);
  for (const x of [-0.6, 0.6]) windowAt(kit, F, x, 1.08, b.d / 2, 0, true, 0.2, 0.3);
  clock(kit, F, 0, 1.1, b.d / 2, 0);
  signs.push(signMesh('柳河站', 0.9, 0.17, mul(F, mat(0, 0.7, b.d / 2 + 0.03)), { w: 512, h: 96, font: 'bold 64px' }));
  // Platform side (local -z).
  door(kit, F, 0, -b.d / 2, Math.PI, '#5b3a29', 0.4, 0.48);
  for (const x of [-0.6, 0.6]) {
    windowAt(kit, F, x, 0.36, -b.d / 2, Math.PI, true, 0.22, 0.32);
    windowAt(kit, F, x, 1.08, -b.d / 2, Math.PI, true, 0.2, 0.3);
  }
  signs.push(signMesh('柳河站', 0.9, 0.17, mul(F, mat(0, 1.38, -b.d / 2 - 0.03, Math.PI)), { w: 512, h: 96, font: 'bold 64px' }));
}

function wedge(kit, kind, color, frame, len, h, depth) {
  const tri = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(len, 0), new THREE.Vector2(0, h)]);
  kit.add(kind, new THREE.ExtrudeGeometry(tri, { depth, bevelEnabled: false }), color, mul(frame, mat(0, 0, -depth / 2)));
}

function platform(kit, signs, pools) {
  const p = STATION.platform;
  const cx = (p.x0 + p.x1) / 2;
  const cz = (p.z0 + p.z1) / 2;
  const len = p.x1 - p.x0;
  kit.box('stone', '#b8b1a4', I, len, p.top, p.z1 - p.z0, cx, p.top / 2, cz);
  kit.box('stone', '#ddd6c8', I, len, 0.03, 0.14, cx, p.top + 0.012, p.z1 - 0.07);
  kit.box('paint', '#e9c64a', I, len, 0.006, 0.03, cx, p.top + 0.002, p.z1 - 0.2);
  wedge(kit, 'stone', '#b8b1a4', mat(p.x1, 0, cz), 0.6, p.top, p.z1 - p.z0);
  wedge(kit, 'stone', '#b8b1a4', mat(p.x0, 0, cz, Math.PI), 0.6, p.top, p.z1 - p.z0);

  // Canopy on two rows of posts, with lights between them.
  const c0 = -8.7;
  const c1 = -1.1;
  const top = p.top + 0.82;
  const bays = 5;
  for (let i = 0; i <= bays; i++) {
    const x = c0 + ((c1 - c0) * i) / bays;
    for (const z of [6.12, 6.72]) kit.cyl('metal', GREEN, I, 0.025, 0.03, top - p.top, x, (top + p.top) / 2, z, 8);
    kit.box('metal', GREEN, I, 0.05, 0.05, 0.95, x, top - 0.02, 6.42);
  }
  for (const z of [6.12, 6.72]) kit.box('metal', GREEN, I, c1 - c0, 0.05, 0.04, (c0 + c1) / 2, top - 0.02, z);
  kit.box('roof', '#5d6a63', I, c1 - c0 + 0.3, 0.04, 1.12, (c0 + c1) / 2, top + 0.04, 6.44, 0, 0.05);
  kit.box('wood', '#e8dcc0', I, c1 - c0 + 0.3, 0.09, 0.02, (c0 + c1) / 2, top - 0.02, 7.0);
  for (let i = 0; i < bays; i++) {
    const x = c0 + ((c1 - c0) * (i + 0.5)) / bays;
    kit.box('glow', '#fff4dc', I, 0.32, 0.025, 0.06, x, top - 0.06, 6.42);
    pools.push({ x, z: 6.42, r: 1.25, k: 0.9, y: p.top });
  }
  for (const x of [-8.1, -6.6, -3.2, -1.6]) {
    kit.box('wood', '#7a5236', I, 0.5, 0.03, 0.14, x, p.top + 0.13, 6.18);
    kit.box('wood', '#7a5236', I, 0.5, 0.12, 0.025, x, p.top + 0.21, 6.1);
    for (const s of [-0.2, 0.2]) kit.box('metal', '#333', I, 0.025, 0.13, 0.12, x + s, p.top + 0.065, 6.16);
  }
  // Name boards at both ends face the line.
  for (const x of [p.x0 + 0.4, p.x1 - 0.42]) {
    for (const s of [-0.34, 0.34]) kit.cyl('metal', '#2e3a33', I, 0.015, 0.015, 0.62, x + s, p.top + 0.31, 6.55, 6);
    kit.box('paint', '#2b3a4a', I, 0.78, 0.2, 0.025, x, p.top + 0.56, 6.55);
    signs.push(signMesh('柳河站', 0.72, 0.16, mat(x, p.top + 0.56, 6.565), { w: 512, h: 112, font: 'bold 72px' }));
    lantern(kit, x, 6.22, p.top, pools);
  }
}

function lantern(kit, x, z, y0, pools) {
  const F = mat(x, y0, z);
  kit.cyl('metal', '#2b3530', F, 0.02, 0.028, 0.72, 0, 0.36, 0, 8);
  kit.box('glow', '#fff1d0', F, 0.07, 0.1, 0.07, 0, 0.77, 0);
  kit.cyl('metal', '#2b3530', F, 0.0, 0.065, 0.06, 0, 0.85, 0, 4, 0, 0, Math.PI / 4);
  pools.push({ x, z, r: 1.1, k: 0.8, y: y0 });
}

function streetLamp(kit, l, pools) {
  const F = mat(l.x, 0, l.z, l.rot);
  const c = '#2b3530';
  kit.cyl('metal', c, F, 0.05, 0.055, 0.06, 0, 0.03, 0, 8);
  kit.cyl('metal', c, F, 0.018, 0.026, 0.84, 0, 0.42, 0, 8);
  kit.box('metal', c, F, 0.2, 0.018, 0.018, 0.09, 0.83, 0);
  kit.cyl('metal', c, F, 0.022, 0.075, 0.05, 0.19, 0.81, 0, 10);
  kit.cyl('glow', '#fff1d0', F, 0.04, 0.04, 0.03, 0.19, 0.78, 0, 10);
  pools.push({ x: l.x + Math.cos(l.rot) * 0.19, z: l.z - Math.sin(l.rot) * 0.19, r: 1.15, k: 1 });
}

function goodsShed(kit, l) {
  const F = mat(l.x, 0, l.z, l.rot);
  const H = 0.8;
  kit.box('stone', '#9d9587', F, l.w + 0.06, 0.12, l.d + 0.06, 0, 0.06, 0);
  kit.rbox('wood', '#8b4a32', F, l.w, H, l.d, 0, H / 2, 0, 0, 0.02);
  gableRoof(kit, F, l.w, l.d, H, '#555b60', '#8b4a32', 0.35);
  for (const z of [l.d / 2, -l.d / 2]) {
    const ry = z > 0 ? 0 : Math.PI;
    kit.box('wood', '#5a2f22', F, 0.62, 0.55, 0.03, 0, 0.36, z + Math.cos(ry) * 0.01, ry);
    kit.box('paint', FRAME, F, 0.66, 0.03, 0.035, 0, 0.65, z + Math.cos(ry) * 0.012, ry);
    for (const x of [-0.7, 0.7]) windowAt(kit, F, x, 0.48, z, ry, false, 0.18, 0.18);
  }
}

function townHall(kit, l) {
  const F = mat(l.x, 0, l.z, l.rot);
  const wall = '#e2cfa6';
  const H = 1.34;
  kit.box('stone', '#a39a8a', F, l.w + 0.06, 0.12, l.d + 0.06, 0, 0.06, 0);
  kit.rbox('paint', wall, F, l.w, H, l.d, 0, H / 2, 0, 0, 0.02);
  kit.box('paint', shade(wall, 0.84), F, l.w + 0.04, 0.04, l.d + 0.04, 0, FLOOR0 + 0.04, 0);
  hipRoof(kit, F, l.w, l.d, H, '#59606a', 0.36);
  for (const z of [l.d / 2, -l.d / 2]) {
    const ry = z > 0 ? 0 : Math.PI;
    for (let i = 0; i < 6; i++) {
      const x = -l.w / 2 + 0.3 + i * ((l.w - 0.6) / 5);
      if (Math.abs(x) < 0.4) continue;
      windowAt(kit, F, x, 0.36, z, ry, i % 2 === 0, 0.2, 0.32);
      windowAt(kit, F, x, 1.0, z, ry, i % 3 === 0, 0.2, 0.3);
    }
  }
  // Pedimented portico in front of the entrance.
  const pz = l.d / 2 + 0.22;
  kit.box('stone', '#c8bda8', F, 1.1, 0.06, 0.48, 0, 0.03, l.d / 2 + 0.2);
  for (const x of [-0.42, -0.14, 0.14, 0.42]) kit.cyl('paint', '#f2ead8', F, 0.035, 0.04, 0.66, x, 0.39, pz + 0.12, 10);
  kit.box('paint', '#efe5cf', F, 1.12, 0.08, 0.46, 0, 0.76, pz - 0.02);
  const tri = new THREE.Shape([new THREE.Vector2(-0.58, 0), new THREE.Vector2(0.58, 0), new THREE.Vector2(0, 0.26)]);
  kit.add('paint', new THREE.ExtrudeGeometry(tri, { depth: 0.44, bevelEnabled: false }), '#efe5cf', mul(F, mat(0, 0.8, pz - 0.24)));
  door(kit, F, 0, l.d / 2, 0, '#4a2f20', 0.3, 0.46);
  windowAt(kit, F, 0, 1.0, l.d / 2, 0, true, 0.24, 0.3);
  // Clock tower.
  const tw = 0.72;
  const tz = -0.05;
  kit.rbox('paint', wall, F, tw, 1.0, tw, 0, H + 0.36, tz, 0, 0.02);
  kit.box('paint', shade(wall, 0.84), F, tw + 0.08, 0.06, tw + 0.08, 0, H + 0.88, tz);
  for (const r of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    clock(kit, F, Math.sin(r) * (tw / 2), H + 0.6, tz + Math.cos(r) * (tw / 2), r, 0.16);
  }
  kit.add('roof', new THREE.ConeGeometry(0.62, 0.85, 4, 1), '#5f8f7a', mul(F, mat(0, H + 1.33, tz, Math.PI / 4)));
  kit.cyl('metal', '#c9a24a', F, 0.012, 0.012, 0.3, 0, H + 1.88, tz, 6);
}

function church(kit, l) {
  const F = mat(l.x, 0, l.z, l.rot);
  const stone = '#d8cfbf';
  const nave = { len: 2.5, z: -0.45, H: 1.0 };
  kit.box('stone', stone, F, l.w, nave.H, nave.len, 0, nave.H / 2, nave.z);
  gableRoof(kit, mul(F, mat(0, 0, nave.z, Math.PI / 2)), nave.len, l.w, nave.H, '#4d5560', stone, 0.62);
  for (const s of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const z = nave.z - nave.len / 2 + 0.35 + i * 0.6;
      windowAt(kit, F, (s * l.w) / 2, 0.52, z, (s * Math.PI) / 2, true, 0.14, 0.46, '#cfc4b0');
    }
  }
  // Bell tower on the entrance front, with a slate spire.
  const tw = 0.8;
  const tz = nave.z + nave.len / 2 + tw / 2 - 0.05;
  const th = 2.15;
  kit.box('stone', stone, F, tw, th, tw, 0, th / 2, tz);
  kit.box('stone', shade(stone, 0.85), F, tw + 0.08, 0.07, tw + 0.08, 0, th, tz);
  for (const r of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    const x = Math.sin(r) * (tw / 2);
    const z = tz + Math.cos(r) * (tw / 2);
    kit.box('glass', '#1f2328', F, 0.18, 0.3, 0.02, x + Math.sin(r) * 0.01, th - 0.28, z + Math.cos(r) * 0.01, r);
    clock(kit, F, x, th - 0.72, z, r, 0.13);
  }
  kit.add('roof', new THREE.ConeGeometry(0.58, 1.35, 4, 1), '#4d5560', mul(F, mat(0, th + 0.72, tz, Math.PI / 4)));
  kit.box('metal', '#c9a24a', F, 0.02, 0.26, 0.02, 0, th + 1.52, tz);
  kit.box('metal', '#c9a24a', F, 0.14, 0.02, 0.02, 0, th + 1.56, tz);
  door(kit, F, 0, tz + tw / 2, 0, '#4a2f20', 0.26, 0.48);
  windowAt(kit, F, 0, 1.05, tz + tw / 2, 0, true, 0.16, 0.36, '#cfc4b0');
}

function factory(kit, l) {
  const F = mat(l.x, 0, l.z, l.rot);
  const brick = '#9a4e3a';
  const H = 0.95;
  kit.box('stone', '#8f877a', F, l.w + 0.06, 0.1, l.d + 0.06, 0, 0.05, 0);
  kit.rbox('paint', brick, F, l.w, H, l.d, 0, H / 2, 0, 0, 0.02);
  kit.box('paint', '#c7b79a', F, l.w + 0.03, 0.04, l.d + 0.03, 0, H - 0.04, 0);
  const n = 3;
  const bay = l.w / n;
  for (let i = 0; i < n; i++) {
    const x = -l.w / 2 + bay * (i + 0.5);
    gableRoof(kit, mul(F, mat(x, 0, 0, Math.PI / 2)), l.d, bay, H, '#5a5f63', brick, 0.45);
    for (const z of [l.d / 2, -l.d / 2]) {
      const ry = z > 0 ? 0 : Math.PI;
      if (z > 0 && i === 1) kit.box('wood', '#3f4a3c', F, 0.5, 0.62, 0.03, x, 0.36, z + 0.012);
      else windowAt(kit, F, x, 0.5, z, ry, i !== 2, 0.42, 0.42, '#d9d0bd');
    }
  }
  const cx = l.w / 2 - 0.35;
  const cz = -l.d / 2 + 0.35;
  kit.cyl('paint', brick, F, 0.12, 0.18, 3.0, cx, 1.5, cz, 14);
  kit.cyl('paint', '#3a2c27', F, 0.135, 0.135, 0.12, cx, 2.95, cz, 14);
  kit.cyl('paint', '#c7b79a', F, 0.145, 0.145, 0.05, cx, 2.4, cz, 14);
  for (let i = 0; i < 5; i++) kit.box('wood', '#8a6a46', F, 0.16, 0.16, 0.16, -l.w / 2 + 0.25 + (i % 3) * 0.2, 0.08 + Math.floor(i / 3) * 0.16, l.d / 2 + 0.22);
}

function waterTower(kit, l) {
  const F = mat(l.x, 0, l.z);
  const legH = 1.05;
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) kit.box('wood', '#5b4030', F, 0.07, legH, 0.07, sx * 0.3, legH / 2, sz * 0.3);
  for (const s of [-1, 1]) {
    const v = (x, y, z) => new THREE.Vector3(x, y, z);
    kit.beam('wood', '#5b4030', F, v(-0.3, 0.1, s * 0.3), v(0.3, legH - 0.1, s * 0.3), 0.03);
    kit.beam('wood', '#5b4030', F, v(s * 0.3, 0.1, -0.3), v(s * 0.3, legH - 0.1, 0.3), 0.03);
  }
  kit.cyl('wood', '#7d4c33', F, 0.48, 0.48, 0.6, 0, legH + 0.3, 0, 20);
  for (const y of [0.1, 0.3, 0.5]) kit.cyl('metal', '#2f2f2f', F, 0.49, 0.49, 0.025, 0, legH + y, 0, 20);
  kit.add('roof', new THREE.ConeGeometry(0.55, 0.32, 20, 1), '#4f565c', mul(F, mat(0, legH + 0.76, 0)));
  kit.beam('metal', '#2f2f2f', F, new THREE.Vector3(0, legH + 0.15, 0.45), new THREE.Vector3(0, legH - 0.1, 1.0), 0.06);
}

function bandstand(kit, l, pools) {
  const F = mat(l.x, 0, l.z);
  kit.cyl('stone', '#bdb3a2', F, 0.62, 0.66, 0.14, 0, 0.07, 0, 8);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    kit.cyl('paint', '#f1ece0', F, 0.022, 0.022, 0.62, Math.cos(a) * 0.54, 0.45, Math.sin(a) * 0.54, 6);
    if (i === 2) continue;
    const b = a + Math.PI / 4;
    kit.beam('paint', '#f1ece0', F, new THREE.Vector3(Math.cos(a) * 0.54, 0.34, Math.sin(a) * 0.54), new THREE.Vector3(Math.cos(b) * 0.54, 0.34, Math.sin(b) * 0.54), 0.02);
  }
  kit.add('roof', new THREE.ConeGeometry(0.76, 0.38, 8, 1), '#5f8f7a', mul(F, mat(0, 0.95, 0, Math.PI / 8)));
  kit.cyl('glow', '#fff1d0', F, 0.06, 0.06, 0.06, 0, 0.72, 0, 8);
  pools.push({ x: l.x, z: l.z, r: 1.4, k: 0.8 });
}

function barn(kit, l) {
  const F = mat(l.x, 0, l.z, l.rot);
  const H = 0.82;
  kit.rbox('wood', '#8e3b2e', F, l.w, H, l.d, 0, H / 2, 0, 0, 0.02);
  gableRoof(kit, F, l.w, l.d, H, '#4a4f52', '#8e3b2e', 0.55);
  const z = l.d / 2 + 0.015;
  kit.box('wood', '#6e2c22', F, 0.7, 0.62, 0.02, 0, 0.32, z);
  const v = (x, y) => new THREE.Vector3(x, y, z + 0.012);
  kit.beam('paint', FRAME, F, v(-0.33, 0.04), v(0.33, 0.6), 0.03, 0.01);
  kit.beam('paint', FRAME, F, v(-0.33, 0.6), v(0.33, 0.04), 0.03, 0.01);
  kit.box('paint', FRAME, F, 0.74, 0.03, 0.01, 0, 0.64, z + 0.012);
  for (let i = 0; i < 4; i++) kit.cyl('wood', '#d9bf6a', F, 0.12, 0.12, 0.2, -l.w / 2 - 0.25, 0.12, -0.5 + i * 0.3, 12, Math.PI / 2);
}

function boathouse(kit, l) {
  const F = mat(l.x, 0, l.z, l.rot);
  const H = 0.6;
  kit.rbox('wood', '#6b5a48', F, l.w, H, l.d, 0, H / 2, 0, 0, 0.02);
  gableRoof(kit, mul(F, mat(0, 0, 0, Math.PI / 2)), l.d, l.w, H, '#5a3a2c', '#6b5a48', 0.5);
  kit.box('paint', '#1d2226', F, 0.6, 0.42, 0.02, 0, 0.22, l.d / 2 + 0.01);
  // Jetty out over the water and a moored rowboat.
  kit.box('wood', '#8a6a4a', F, 0.42, 0.04, 1.7, 0, 0.02, l.d / 2 + 0.85);
  for (const s of [-0.18, 0.18]) for (const z of [0.9, 1.4]) kit.cyl('wood', '#5a4434', F, 0.025, 0.025, 1.0, s, -0.48, l.d / 2 + z, 6);
  const boat = mul(F, mat(0.45, -0.44, l.d / 2 + 1.65));
  kit.rbox('wood', '#a0522d', boat, 0.24, 0.1, 0.62, 0, 0, 0, 0, 0.05);
  kit.box('wood', '#5b3a29', boat, 0.18, 0.02, 0.5, 0, 0.045, 0);
}

const BUILDERS = { goodsshed: goodsShed, townhall: townHall, church, factory, watertower: waterTower, barn, boathouse };

// Builds every landmark and street lamp into `kit`; returns name boards and light pool spots.
export function buildLandmarks(kit, plan) {
  const signs = [];
  const pools = [];
  station(kit, signs);
  platform(kit, signs, pools);
  for (const l of plan.landmarks) {
    if (l.kind === 'bandstand') bandstand(kit, l, pools);
    else if (l.kind === 'farmhouse') building(kit, { ...l, floors: 2, roof: 'gable', wall: '#efe6d2', roofColor: '#7d3b2e', style: 'house', seed: 99 });
    else BUILDERS[l.kind]?.(kit, l);
  }
  for (const l of plan.lamps) streetLamp(kit, l, pools);
  return { signs, pools };
}
