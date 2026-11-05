import * as THREE from 'three';
import { box, cyl, sph, plane, mesh, grp, mat, tmat, glow, glass, bulgedPlane, curvedPlane, rng } from './kit.js';
import { keyboardTex, fabric, wood } from './textures.js';

export const C = {
  beige: mat('#d9ceb1', 0.55), beige2: mat('#c4b693', 0.6), black: mat('#1e1e21', 0.55), gloss: mat('#0d0d0f', 0.2),
  grey: mat('#55585e', 0.5), silver: mat('#b8bcc2', 0.3, 0.75), steel: mat('#2b2b2f', 0.35, 0.7), white: mat('#ece8df', 0.45),
  cream: mat('#efe4cf', 0.6), red: mat('#b3332b', 0.5), paper: mat('#f3eee2', 0.9), card: mat('#b98e5c', 0.85), tape: mat('#d9c48c', 0.6),
  green: mat('#4f8a46', 0.6), rubber: mat('#26262a', 0.85),
};
export const WOOD = {
  maple: tmat(wood('#d9b98b', '#a77b4a', { seed: 12 }), 0.55),
  walnut: tmat(wood('#6e4b31', '#382315', { seed: 15 }), 0.5),
  oak: tmat(wood('#caa476', '#8d6640', { seed: 17 }), 0.55),
  pine: tmat(wood('#e0c193', '#b48a57', { seed: 19 }), 0.6),
};

export const screenMat = () => new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });

// ---------- displays (origin at bottom centre, screen faces +z) ----------

export function crt(g, s) {
  const m = C.beige;
  box(g, 0.22, 0.02, 0.22, m, 0, 0, 0, { r: 0.008 });
  box(g, 0.1, 0.035, 0.1, C.beige2, 0, 0.02, 0);
  box(g, 0.42, 0.38, 0.07, m, 0, 0.05, 0.17, { r: 0.02 });
  box(g, 0.38, 0.34, 0.2, m, 0, 0.065, 0.04, { r: 0.035 });
  box(g, 0.27, 0.24, 0.16, C.beige2, 0, 0.1, -0.11, { r: 0.04 });
  for (let i = 0; i < 6; i++) box(g, 0.16, 0.004, 0.08, C.beige2, 0, 0.36 - i * 0.012, -0.09, { cast: false });
  box(g, 0.34, 0.27, 0.01, mat('#2a2b2a', 0.4), 0, 0.105, 0.2);
  const screen = mesh(g, bulgedPlane(0.315, 0.235, 0.01), s, 0, 0.24, 0.209, { cast: false });
  sph(g, 0.006, glow('#5bd36b', 2), 0.17, 0.075, 0.207);
  box(g, 0.03, 0.012, 0.01, C.beige2, 0.12, 0.069, 0.206);
  return screen;
}

export function flat(g, s, o) {
  const { w, h, b = 0.012, chin = 0, standH = 0.1, col = C.gloss, base = 'oval' } = o;
  if (base === 'oval') {
    cyl(g, 0.11, 0.115, 0.014, col, 0, 0, -0.02, { seg: 32, s: [1, 1, 0.72] });
    box(g, 0.035, standH + h * 0.3, 0.02, col, 0, 0.01, -0.035);
  } else if (base === 'v') {
    box(g, 0.035, 0.012, 0.22, col, -0.09, 0, -0.03, { ry: 0.55 });
    box(g, 0.035, 0.012, 0.22, col, 0.09, 0, -0.03, { ry: -0.55 });
    box(g, 0.05, standH + h * 0.35, 0.025, o.accent ?? col, 0, 0.005, -0.08, { rx: -0.08 });
  } else if (base === 'rect') {
    box(g, 0.24, 0.012, 0.16, C.silver, 0, 0, -0.02, { r: 0.004 });
    box(g, 0.05, standH + h * 0.35, 0.018, C.silver, 0, 0.005, -0.06);
  }
  const y = standH + h / 2;
  box(g, w, h, 0.022, col, 0, y, 0, { c: true, r: 0.005 });
  box(g, w * 0.6, h * 0.55, 0.035, col, 0, y, -0.02, { c: true, r: 0.012 });
  if (o.accent) box(g, w * 0.3, 0.008, 0.024, o.accent, 0, y - h / 2 + 0.004, 0, { c: true });
  return plane(g, w - 2 * b, h - 2 * b - chin, s, 0, y + chin / 2, 0.0115);
}

export function ultrawide(g, s) {
  const w = 0.82, h = 0.35, R = 1.5, y = 0.11 + h / 2;
  const shell = new THREE.MeshStandardMaterial({ color: '#17171a', roughness: 0.45, side: THREE.DoubleSide });
  mesh(g, curvedPlane(w + 0.016, h + 0.016, R), shell, 0, y, -0.006);
  const back = mesh(g, curvedPlane(w * 0.55, h * 0.6, R), shell, 0, y, -0.035);
  back.position.z -= 0.01;
  box(g, 0.32, 0.012, 0.2, C.steel, 0, 0, 0.0, { r: 0.004 });
  box(g, 0.06, 0.26, 0.025, C.steel, 0, 0.01, -0.05);
  return mesh(g, curvedPlane(w - 0.01, h - 0.012, R), s, 0, y, 0, { cast: false });
}

export function laptop(g, s, col = C.grey, open = 1.85) {
  box(g, 0.33, 0.016, 0.23, col, 0, 0, 0, { r: 0.005 });
  box(g, 0.29, 0.002, 0.1, C.black, 0, 0.016, -0.02, { cast: false });
  const lid = grp(g, 0, 0.016, -0.115);
  lid.rotation.x = -(open - Math.PI / 2);
  box(lid, 0.33, 0.22, 0.008, col, 0, 0, -0.004, { r: 0.003 });
  return plane(lid, 0.3, 0.19, s, 0, 0.11, 0.001);
}

// ---------- input devices ----------

export function keyboard(g, { w = 0.44, d = 0.15, h = 0.03, body = C.beige, top, x = 0, y = 0, z = 0, ry = 0, tilt = 0.05 }) {
  const k = box(g, w, h, d, body, x, y, z, { ry, rx: tilt });
  k.material = [body, body, tmat(keyboardTex(top), 0.6), body, body, body];
  return k;
}
export const KB = {
  y2005: { base: '#cbbf9e', key: '#e6dcc2', legend: 'rgba(60,50,30,0.55)' },
  y2008: { base: '#141416', key: '#26262b', legend: 'rgba(120,170,255,0.8)' },
  y2012: { base: '#18181a', key: '#2c2c30', legend: 'rgba(230,230,230,0.7)', accent: (r, c) => (r === 3 && c < 2 ? '#b33' : null) },
  y2016: { base: '#141416', key: '#222', rgb: true, cols: 17 },
  y2020: { base: '#c9c2b2', key: '#efe7d6', legend: 'rgba(80,90,70,0.6)', cols: 16, accent: (r, c) => (c > 13 || r === 0 || (r === 5 && c < 3) ? '#8f9f84' : null) },
};

export function mouse(g, col, x, y, z, ry = 0, len = 0.11) {
  const m = sph(g, len / 2, col, x, y + 0.012, z, { s: [0.55, 0.36, 1], ry });
  return m;
}

export function pad(g, w, d, m, x, y, z, ry = 0) {
  return box(g, w, 0.004, d, m, x, y, z, { ry, cast: false });
}

export function gamepad(g, col, x, y, z, ry = 0) {
  const p = grp(g, x, y, z, ry);
  box(p, 0.11, 0.03, 0.06, col, 0, 0, 0, { r: 0.015 });
  sph(p, 0.03, col, -0.045, 0.012, 0.025, { s: [1, 0.6, 1.2] });
  sph(p, 0.03, col, 0.045, 0.012, 0.025, { s: [1, 0.6, 1.2] });
  cyl(p, 0.008, 0.008, 0.012, C.black, -0.025, 0.028, -0.005);
  cyl(p, 0.008, 0.008, 0.012, C.black, 0.012, 0.028, 0.012);
  for (const [dx, c] of [[0.035, '#4caf50'], [0.045, '#e53935'], [0.025, '#1e88e5']]) sph(p, 0.005, mat(c, 0.4), dx, 0.03, -0.012 + (dx - 0.035) * 0.6);
  return p;
}

export function headset(g, col, cup, x, y, z, ry = 0, mic = true) {
  const h = grp(g, x, y, z, ry);
  mesh(h, new THREE.TorusGeometry(0.085, 0.009, 6, 20, Math.PI), col, 0, 0.05, 0);
  for (const s of [-1, 1]) cyl(h, 0.045, 0.045, 0.035, cup, s * 0.085, 0.045, 0, { rz: Math.PI / 2, c: true });
  if (mic) cyl(h, 0.003, 0.003, 0.12, col, -0.1, 0.04, 0.06, { rx: Math.PI / 2, rz: 0.4, c: true });
  return h;
}

// ---------- computers (origin bottom centre, front faces +z, side window on +x) ----------

export function tower(g, kind) {
  if (kind === 'beige') {
    box(g, 0.19, 0.42, 0.44, C.beige, 0, 0, 0, { r: 0.008 });
    for (let i = 0; i < 2; i++) box(g, 0.15, 0.04, 0.01, C.beige2, 0, 0.33 - i * 0.05, 0.221);
    box(g, 0.1, 0.025, 0.01, C.beige2, 0, 0.24, 0.221);
    box(g, 0.06, 0.003, 0.012, C.black, 0, 0.25, 0.222);
    cyl(g, 0.015, 0.015, 0.01, C.beige2, 0, 0.15, 0.222, { rx: Math.PI / 2, c: true });
    sph(g, 0.004, glow('#60e070', 2), 0.04, 0.15, 0.226);
    sph(g, 0.004, glow('#ff9a3a', 2), 0.06, 0.15, 0.226);
  } else if (kind === 'black08') {
    box(g, 0.2, 0.45, 0.46, C.black, 0, 0, 0, { r: 0.01 });
    box(g, 0.16, 0.12, 0.01, C.gloss, 0, 0.3, 0.231);
    mesh(g, new THREE.TorusGeometry(0.055, 0.006, 6, 24), glow('#3b7bff', 2.2), 0, 0.12, 0.232, { cast: false });
    cyl(g, 0.05, 0.05, 0.004, mat('#111', 0.8), 0, 0.12, 0.23, { rx: Math.PI / 2, c: true });
    sph(g, 0.006, glow('#3b7bff', 3), 0.05, 0.4, 0.234);
  } else if (kind === 'window12') {
    box(g, 0.21, 0.47, 0.48, C.black, 0, 0, 0, { r: 0.01 });
    box(g, 0.005, 0.28, 0.3, glass, 0.106, 0.12, 0.02, { cast: false });
    box(g, 0.02, 0.04, 0.24, mat('#7a1d1d', 0.4), 0.08, 0.2, 0.02);
    box(g, 0.01, 0.12, 0.12, C.silver, 0.07, 0.3, -0.06);
    sph(g, 0.01, glow('#3b7bff', 2), 0.1, 0.36, 0.15);
    box(g, 0.15, 0.2, 0.01, mat('#232326', 0.7), 0, 0.22, 0.241);
  } else if (kind === 'rgb16') {
    box(g, 0.22, 0.48, 0.47, C.black, 0, 0, 0, { r: 0.008 });
    box(g, 0.004, 0.42, 0.42, glass, 0.111, 0.03, 0, { cast: false });
    box(g, 0.004, 0.4, 0.17, mat('#111', 0.3), 0, 0.04, 0.236);
    for (let i = 0; i < 3; i++) {
      const hue = ['#ff3d6e', '#7a5cff', '#2ad1ff'][i];
      mesh(g, new THREE.TorusGeometry(0.045, 0.006, 6, 24), glow(hue, 2.4), 0, 0.12 + i * 0.12, 0.238, { cast: false });
    }
    box(g, 0.02, 0.05, 0.28, mat('#303034', 0.35, 0.5), 0.07, 0.2, -0.02);
    box(g, 0.012, 0.012, 0.26, glow('#9a7bff', 1.5), 0.094, 0.24, -0.02, { cast: false });
    box(g, 0.012, 0.13, 0.13, C.silver, 0.07, 0.32, -0.08);
  } else if (kind === 'wood25') {
    box(g, 0.23, 0.48, 0.45, mat('#2b2b2c', 0.5), 0, 0, 0, { r: 0.012 });
    for (let i = 0; i < 9; i++) box(g, 0.016, 0.44, 0.012, WOOD.walnut, -0.08 + i * 0.02, 0.02, 0.228);
    box(g, 0.004, 0.42, 0.4, glass, 0.116, 0.03, 0, { cast: false });
    box(g, 0.02, 0.06, 0.3, mat('#d8d4cc', 0.45), 0.07, 0.2, -0.02);
    box(g, 0.01, 0.3, 0.004, glow('#ffd9a8', 1.1), 0.09, 0.08, -0.19, { cast: false });
    cyl(g, 0.006, 0.006, 0.005, glow('#fff', 2), 0.08, 0.44, 0.23, { rx: Math.PI / 2, c: true });
  }
}

// ---------- seating (origin on floor, sitter faces -z) ----------

function starBase(g, legMat, r = 0.3, lift = 0.38) {
  for (let i = 0; i < 5; i++) {
    const a = (i * Math.PI * 2) / 5;
    box(g, 0.04, 0.03, r, legMat, (Math.sin(a) * r) / 2, 0.05, (Math.cos(a) * r) / 2, { ry: a });
    sph(g, 0.025, C.rubber, Math.sin(a) * r, 0.025, Math.cos(a) * r);
  }
  cyl(g, 0.045, 0.045, 0.06, legMat, 0, 0.05, 0);
  cyl(g, 0.022, 0.022, lift - 0.08, C.silver, 0, 0.08, 0);
}

export function woodChair(g) {
  const m = WOOD.maple;
  for (const [x, z] of [[-0.19, -0.18], [0.19, -0.18], [-0.19, 0.18], [0.19, 0.18]]) box(g, 0.035, 0.44, 0.035, m, x, 0, z);
  box(g, 0.44, 0.03, 0.42, m, 0, 0.44, 0, { r: 0.008 });
  for (const x of [-0.19, 0.19]) box(g, 0.035, 0.46, 0.035, m, x, 0.47, 0.18);
  for (const y of [0.62, 0.8]) box(g, 0.4, 0.06, 0.02, m, 0, y, 0.18, { r: 0.006 });
  box(g, 0.4, 0.04, 0.38, tmat(fabric('#b5473a', 'floral', 31), 0.95), 0, 0.47, -0.01, { r: 0.018 });
}

export function officeChair(g) {
  starBase(g, C.black, 0.28, 0.42);
  box(g, 0.46, 0.07, 0.44, mat('#2a2a2e', 0.9), 0, 0.42, 0, { r: 0.03 });
  box(g, 0.05, 0.3, 0.03, C.black, 0, 0.42, 0.22);
  box(g, 0.42, 0.42, 0.05, mat('#303036', 0.95), 0, 0.58, 0.24, { r: 0.04, rx: -0.12 });
  for (const s of [-1, 1]) {
    box(g, 0.03, 0.18, 0.03, C.black, s * 0.24, 0.42, 0.04);
    box(g, 0.06, 0.025, 0.22, C.black, s * 0.24, 0.6, 0.02, { r: 0.01 });
  }
}

export function gamingChair(g) {
  const blk = mat('#1b1b1e', 0.6), red = mat('#a8232b', 0.55);
  starBase(g, blk, 0.32, 0.44);
  box(g, 0.5, 0.08, 0.48, blk, 0, 0.44, 0, { r: 0.03 });
  for (const s of [-1, 1]) box(g, 0.07, 0.07, 0.46, red, s * 0.23, 0.48, 0, { r: 0.03 });
  const back = grp(g, 0, 0.5, 0.25);
  back.rotation.x = -0.14;
  box(back, 0.44, 0.82, 0.08, blk, 0, 0, 0, { r: 0.04 });
  for (const s of [-1, 1]) box(back, 0.08, 0.7, 0.1, red, s * 0.2, 0.02, -0.01, { r: 0.035, rz: s * 0.06 });
  box(back, 0.08, 0.12, 0.02, red, 0, 0.66, -0.045, { r: 0.008 });
  box(back, 0.24, 0.1, 0.08, blk, 0, 0.6, -0.07, { r: 0.04 });
  for (const s of [-1, 1]) {
    box(g, 0.035, 0.2, 0.035, blk, s * 0.27, 0.44, 0.05);
    box(g, 0.07, 0.03, 0.24, blk, s * 0.27, 0.64, 0.03, { r: 0.01 });
  }
}

export function meshChair(g) {
  const frame = mat('#6c6f73', 0.4, 0.5), seat = mat('#4d5052', 0.9);
  starBase(g, frame, 0.32, 0.45);
  box(g, 0.5, 0.06, 0.48, seat, 0, 0.45, 0, { r: 0.025 });
  const back = grp(g, 0, 0.55, 0.25);
  back.rotation.x = -0.12;
  box(back, 0.46, 0.6, 0.02, frame, 0, 0, 0.01, { r: 0.01 });
  box(back, 0.42, 0.56, 0.01, new THREE.MeshStandardMaterial({ color: '#2b2d30', roughness: 0.9, transparent: true, opacity: 0.85 }), 0, 0.02, -0.005);
  box(back, 0.36, 0.08, 0.04, seat, 0, 0.12, -0.02, { r: 0.02 });
  box(back, 0.3, 0.12, 0.04, seat, 0, 0.66, -0.01, { r: 0.03 });
  for (const s of [-1, 1]) {
    box(g, 0.03, 0.2, 0.03, frame, s * 0.27, 0.45, 0.05);
    box(g, 0.07, 0.03, 0.22, seat, s * 0.27, 0.65, 0.03, { r: 0.012 });
  }
}

// ---------- small props ----------

export function books(g, { x, y, z, width, depth = 0.17, hMin = 0.14, hMax = 0.22, seed = 1, palette, lean = true, axis = 'x' }) {
  const r = rng(seed);
  const pal = palette ?? ['#8c2f2f', '#2f4f7c', '#d9a441', '#3d6b4a', '#e8dcc2', '#5b3f6b', '#c76a3a', '#283340'];
  let p = 0;
  while (p < width - 0.03) {
    const t = 0.012 + r() * 0.03, h = hMin + r() * (hMax - hMin);
    if (p + t > width) break;
    const m = mat(pal[Math.floor(r() * pal.length)], 0.75);
    const off = p + t / 2 - width / 2;
    if (axis === 'x') box(g, t, h, depth * (0.85 + r() * 0.15), m, x + off, y, z);
    else box(g, depth * (0.85 + r() * 0.15), h, t, m, x, y, z + off);
    p += t + 0.001;
  }
  if (lean && p < width - 0.04) {
    const h = hMin + 0.04;
    const off = width / 2 - 0.02;
    box(g, 0.02, h, depth * 0.9, mat(pal[1], 0.75), axis === 'x' ? x + off : x, y, axis === 'x' ? z : z + off, axis === 'x' ? { rz: -0.35 } : { rx: 0.35 });
  }
}

export function cases(g, { x, y, z, n, w = 0.014, h = 0.19, d = 0.135, seed = 2, palette }) {
  const r = rng(seed);
  const pal = palette ?? ['#1d5fa8', '#1a1a1a', '#b52b2b', '#e8e2d2', '#2f6b3f', '#d18a2a'];
  for (let i = 0; i < n; i++) box(g, w, h, d, mat(pal[Math.floor(r() * pal.length)], 0.4), x + (i - (n - 1) / 2) * (w + 0.002), y, z);
}

export function stack(g, { x, y, z, n, w, d, t = 0.008, seed = 3, palette, jitter = 0.02 }) {
  const r = rng(seed);
  const pal = palette ?? ['#c9302c', '#2e6fb5', '#f0c419', '#efe8d8', '#3b8a5a'];
  for (let i = 0; i < n; i++) box(g, w, t, d, mat(pal[Math.floor(r() * pal.length)], 0.8), x + (r() - 0.5) * jitter, y + i * t, z + (r() - 0.5) * jitter, { ry: (r() - 0.5) * 0.25 });
}

export function can(g, col, x, y, z, h = 0.115, r = 0.033) {
  cyl(g, r, r, h, col, x, y, z, { seg: 16 });
  cyl(g, r * 0.85, r, 0.008, C.silver, x, y + h, z, { seg: 16 });
}

export function bottle(g, col, x, y, z, h = 0.3) {
  cyl(g, 0.045, 0.045, h * 0.7, col, x, y, z, { seg: 14 });
  cyl(g, 0.016, 0.045, h * 0.22, col, x, y + h * 0.7, z, { seg: 14 });
  cyl(g, 0.017, 0.017, h * 0.08, C.red, x, y + h * 0.92, z, { seg: 10 });
}

export function frame(g, w, h, picture, col = C.black, depth = 0.025) {
  box(g, w, h, depth, col, 0, -h / 2, 0, { r: 0.004 });
  plane(g, w - 0.04, h - 0.04, picture, 0, 0, depth / 2 + 0.001);
}

export function pleatedCurtain(w, h, folds, depth) {
  const geo = new THREE.PlaneGeometry(w, h, folds * 6, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin((pos.getX(i) / w) * folds * Math.PI * 2) * depth);
  geo.computeVertexNormals();
  return geo;
}

export function leafGeo() {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.035, 0.01, 0.04, 0.05, 0, 0.075);
  s.bezierCurveTo(-0.04, 0.05, -0.035, 0.01, 0, 0);
  const g = new THREE.ShapeGeometry(s, 6);
  g.rotateX(-0.6);
  return g;
}
