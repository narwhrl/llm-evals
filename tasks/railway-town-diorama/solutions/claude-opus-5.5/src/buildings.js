// Street buildings and the shared facade and roof parts that landmarks reuse.
import * as THREE from 'three';
import { mat, mul, shade } from './kit.js';
import { mulberry32 } from './layout.js';

export const FLOOR0 = 0.64;
const FLOOR = 0.56;
const DOORS = ['#5b3a29', '#2f4f4f', '#7a2e2e', '#3b4f6b', '#6b4a2b'];
const AWNINGS = ['#b5432f', '#2f6b5a', '#c9952f', '#3d5f8a', '#8a3b5a'];
export const FRAME = '#f1ece0';

export function windowAt(kit, F, x, y, z, ry, lit, ww = 0.2, wh = 0.27, frame = FRAME) {
  const nx = Math.sin(ry);
  const nz = Math.cos(ry);
  kit.box('paint', frame, F, ww + 0.05, wh + 0.05, 0.02, x + nx * 0.006, y, z + nz * 0.006, ry);
  kit.box(lit ? 'glow' : 'glass', lit ? '#3a332c' : '#2c3b48', F, ww, wh, 0.02, x + nx * 0.013, y, z + nz * 0.013, ry);
  kit.box('paint', frame, F, ww + 0.07, 0.025, 0.05, x + nx * 0.022, y - wh / 2 - 0.012, z + nz * 0.022, ry);
}

export function door(kit, F, x, z, ry, color, w = 0.22, h = 0.42) {
  const nx = Math.sin(ry);
  const nz = Math.cos(ry);
  kit.box('paint', FRAME, F, w + 0.05, h + 0.03, 0.02, x + nx * 0.006, h / 2 + 0.06, z + nz * 0.006, ry);
  kit.box('wood', color, F, w, h, 0.03, x + nx * 0.014, h / 2 + 0.06, z + nz * 0.014, ry);
  kit.box('stone', '#b3ab9c', F, w + 0.12, 0.05, 0.12, x + nx * 0.06, 0.025, z + nz * 0.06, ry);
}

// Gable roof with its ridge along local x, over a body `len` long and `span` deep whose walls end at H.
export function gableRoof(kit, F, len, span, H, color, wall, pitch = 0.4) {
  const rh = span * pitch;
  const tri = new THREE.Shape([new THREE.Vector2(-span / 2, 0), new THREE.Vector2(span / 2, 0), new THREE.Vector2(0, rh)]);
  kit.add('paint', new THREE.ExtrudeGeometry(tri, { depth: len, bevelEnabled: false }), wall, mul(F, mat(-len / 2, H, 0, Math.PI / 2)));
  const ov = 0.09;
  const t = 0.045;
  const a = Math.atan2(rh, span / 2);
  const L = Math.hypot(span / 2, rh) + ov;
  for (const s of [1, -1]) {
    const cz = s * ((Math.cos(a) * L) / 2 + (Math.sin(a) * t) / 2);
    const cy = H + rh - (Math.sin(a) * L) / 2 + (Math.cos(a) * t) / 2;
    kit.add('roof', new THREE.BoxGeometry(len + ov * 2, t, L), color, mul(F, mat(0, cy, cz, 0, s * a)), true);
  }
  kit.box('roof', shade(color, 0.7), F, len + ov * 2 + 0.02, 0.06, 0.06, 0, H + rh + 0.035, 0, 0, Math.PI / 4);
  return rh;
}

// Hipped roof (pyramid when square) with the ridge along the longer side.
export function hipRoof(kit, F, w, d, H, color, pitch = 0.38) {
  const swap = d > w;
  const W = (swap ? d : w) + 0.18;
  const D = (swap ? w : d) + 0.18;
  const rh = (D - 0.18) * pitch;
  const r = (W - D) / 2;
  const e = [[-W / 2, 0, D / 2], [W / 2, 0, D / 2], [W / 2, 0, -D / 2], [-W / 2, 0, -D / 2]];
  const R0 = [-r, rh, 0];
  const R1 = [r, rh, 0];
  const tris = [e[0], e[1], R1, e[0], R1, R0, e[2], e[3], R0, e[2], R0, R1, e[1], e[2], R1, e[3], e[0], R0, e[0], e[3], e[2], e[0], e[2], e[1]];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(tris.flat(), 3));
  g.computeVertexNormals();
  kit.add('roof', g, color, mul(F, mat(0, H - 0.01, 0, swap ? Math.PI / 2 : 0)), true);
  return rh;
}

export function flatRoof(kit, F, w, d, H, wall, rng) {
  const trim = shade(wall, 0.82);
  kit.box('paint', trim, F, w + 0.07, 0.07, d + 0.07, 0, H + 0.02, 0);
  kit.box('stone', '#77736d', F, w - 0.04, 0.03, d - 0.04, 0, H + 0.05, 0);
  for (const s of [-1, 1]) {
    kit.box('paint', trim, F, w + 0.07, 0.1, 0.04, 0, H + 0.1, s * (d / 2 + 0.015));
    kit.box('paint', trim, F, 0.04, 0.1, d + 0.07, s * (w / 2 + 0.015), H + 0.1, 0);
  }
  if (rng() < 0.6) kit.box('paint', '#9a948a', F, 0.3, 0.16, 0.24, (rng() - 0.5) * (w - 0.5), H + 0.14, (rng() - 0.5) * (d - 0.5));
  return 0.12;
}

function chimney(kit, F, x, z, top) {
  kit.box('paint', '#8a4a3a', F, 0.13, top, 0.13, x, top / 2, z);
  kit.box('paint', '#4a3a34', F, 0.17, 0.035, 0.17, x, top, z);
}

// A street building from the town plan: plinth, painted body, windows, door, optional awning and a roof.
export function building(kit, b) {
  const rng = mulberry32(b.seed);
  const F = mat(b.x, 0, b.z, b.rot);
  const { w, d, floors } = b;
  const H = FLOOR0 + (floors - 1) * FLOOR;
  const shop = b.style === 'shop' || b.style === 'shopShallow' || b.style === 'square';
  kit.box('stone', '#a29a8c', F, w + 0.04, 0.09, d + 0.04, 0, 0.045, 0);
  kit.rbox('paint', b.wall, F, w, H, d, 0, H / 2, 0, 0, 0.025);
  if (floors > 1) kit.box('paint', shade(b.wall, 0.82), F, w + 0.03, 0.035, d + 0.03, 0, FLOOR0, 0);

  const cols = Math.max(1, Math.floor((w - 0.16) / 0.42));
  const doorAt = Math.floor(rng() * cols);
  for (let f = 0; f < floors; f++) {
    const y = f === 0 ? 0.36 : FLOOR0 + (f - 1) * FLOOR + 0.3;
    for (let i = 0; i < cols; i++) {
      const x = -w / 2 + (w / cols) * (i + 0.5);
      if (f === 0 && i === doorAt) door(kit, F, x, d / 2, 0, DOORS[Math.floor(rng() * DOORS.length)]);
      else if (f === 0 && shop) windowAt(kit, F, x, 0.36, d / 2, 0, rng() < 0.75, Math.min(0.32, w / cols - 0.12), 0.32);
      else windowAt(kit, F, x, y, d / 2, 0, rng() < 0.5);
      windowAt(kit, F, x, y, -d / 2, Math.PI, rng() < 0.45);
    }
    if (d > 1.15) for (const s of [-1, 1]) windowAt(kit, F, (s * w) / 2, y, 0, (s * Math.PI) / 2, rng() < 0.4);
  }
  if (shop) {
    const col = AWNINGS[Math.floor(rng() * AWNINGS.length)];
    kit.box('paint', col, F, w * 0.86, 0.025, 0.3, 0, 0.66, d / 2 + 0.14, 0, 0.38);
    kit.box('paint', FRAME, F, w * 0.86, 0.05, 0.012, 0, 0.6, d / 2 + 0.28);
  }

  let top;
  if (b.roof === 'flat') top = flatRoof(kit, F, w, d, H, b.wall, rng);
  else if (b.roof === 'hip') top = hipRoof(kit, F, w, d, H, b.roofColor);
  else if (b.roof === 'gable') top = gableRoof(kit, F, w, d, H, b.roofColor, b.wall);
  else top = gableRoof(kit, mul(F, mat(0, 0, 0, Math.PI / 2)), d, w, H, b.roofColor, b.wall);
  if (b.roof !== 'flat') chimney(kit, F, w * (rng() < 0.5 ? 0.25 : -0.25), d * 0.16, H + top * 0.8 + 0.12);
}
