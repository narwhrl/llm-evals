// Desks, chairs, bed, sofa, shelving. Every builder returns a group standing on y = 0, facing +z.
import { box, rbox, cyl, group, mat, woodMat, grainMat, at } from './kit.js';

const steel = () => mat('#2a2a2c', { metalness: 0.6, roughness: 0.45 });

// 2005: cheap particle-board computer desk with keyboard tray, tower cubby and a hutch shelf.
export function desk05() {
  const m = woodMat('#dcbd8d', '#b28f5c'), W = 1.2, D = 0.6;
  return group(
    box(W, 0.03, D, m, 0, 0.72, 0),
    box(0.025, 0.72, D, m, -W / 2 + 0.0125, 0, 0),
    box(0.025, 0.72, D, m, W / 2 - 0.0125, 0, 0),
    box(0.025, 0.72, D - 0.05, m, 0.25, 0, 0),
    box(W - 0.05, 0.45, 0.015, m, 0, 0.25, -D / 2 + 0.02),
    box(0.8, 0.02, 0.32, m, -0.165, 0.62, 0.12),
    box(0.31, 0.02, D - 0.06, m, 0.42, 0.12, 0),
    box(0.02, 0.57, 0.2, m, -W / 2 + 0.01, 0.75, -D / 2 + 0.1),
    box(0.02, 0.57, 0.2, m, W / 2 - 0.01, 0.75, -D / 2 + 0.1),
    box(W, 0.02, 0.22, m, 0, 1.3, -D / 2 + 0.11),
  );
}

// 2012: plain white tabletop on a drawer unit and two legs.
export function desk13() {
  const w = mat('#eeeae0', { roughness: 0.5 }), W = 1.5, D = 0.7;
  const g = group(
    rbox(W, 0.035, D, w, 0, 0.715, 0, 0.008),
    box(0.36, 0.71, 0.58, w, W / 2 - 0.2, 0, 0),
    cyl(0.025, 0.715, w, -W / 2 + 0.07, 0, D / 2 - 0.08),
    cyl(0.025, 0.715, w, -W / 2 + 0.07, 0, -D / 2 + 0.08),
  );
  for (let i = 0; i < 4; i++)
    g.add(box(0.34, 0.006, 0.01, '#cfcabd', W / 2 - 0.2, 0.17 * i + 0.02, 0.29), box(0.08, 0.012, 0.015, '#b9b4a6', W / 2 - 0.2, 0.17 * i + 0.11, 0.295));
  return g;
}

// 2020: electric standing desk, walnut top on black lifting columns.
export function desk20() {
  const top = woodMat('#8d5f3c', '#5e3b22', [2, 1], 4), W = 1.8, D = 0.75, s = steel();
  const g = group(rbox(W, 0.04, D, top, 0, 0.71, 0, 0.012), box(W - 0.3, 0.05, 0.06, s, 0, 0.66, 0), box(0.5, 0.06, 0.16, s, 0, 0.6, -0.22));
  for (const x of [-W / 2 + 0.2, W / 2 - 0.2])
    g.add(box(0.08, 0.68, 0.07, s, x, 0.03, 0), box(0.09, 0.03, 0.68, s, x, 0, 0));
  g.add(box(0.12, 0.02, 0.04, '#111', W / 2 - 0.35, 0.69, D / 2 - 0.02));
  return g;
}

// 2005: a dining chair borrowed from the living room, with mum's cushion.
export function chair05() {
  const m = woodMat('#9a6a3e', '#6d4526'), g = group();
  for (const x of [-0.18, 0.18]) g.add(box(0.035, 0.44, 0.035, m, x, 0, 0.18), box(0.035, 0.92, 0.035, m, x, 0, -0.18));
  g.add(box(0.42, 0.03, 0.42, m, 0, 0.44, 0), box(0.36, 0.07, 0.02, m, 0, 0.82, -0.18), box(0.36, 0.05, 0.02, m, 0, 0.64, -0.18));
  g.add(rbox(0.38, 0.05, 0.38, grainMat('#b5483c', '#f1d7a8', [2, 2], 0.5), 0, 0.47, 0, 0.02));
  return g;
}

function swivelBase(color, seatY) {
  const m = mat(color, { roughness: 0.5 }), g = group(cyl(0.025, seatY - 0.1, mat('#888', { metalness: 0.8, roughness: 0.3 }), 0, 0.08, 0));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const leg = box(0.05, 0.03, 0.3, m, Math.sin(a) * 0.15, 0.06, Math.cos(a) * 0.15);
    leg.rotation.y = a;
    g.add(leg, cyl(0.025, 0.05, '#1a1a1a', Math.sin(a) * 0.29, 0, Math.cos(a) * 0.29));
  }
  return g;
}

// 2009: the black mesh office chair every dorm and net cafe had.
export function chair09() {
  const k = mat('#303036'), g = swivelBase('#26262a', 0.44);
  g.add(rbox(0.46, 0.07, 0.44, k, 0, 0.42, 0, 0.03), box(0.05, 0.3, 0.03, k, 0, 0.45, -0.22));
  g.add(at(rbox(0.42, 0.45, 0.04, mat('#3e3e46', { roughness: 0.95 }), 0, 0, 0, 0.03), 0, 0.92, -0.24, 0, -0.12));
  for (const x of [-0.26, 0.26]) g.add(box(0.03, 0.2, 0.03, k, x, 0.45, 0), box(0.05, 0.025, 0.24, k, x, 0.65, 0.02));
  return g;
}

// 2016: racing-style gaming chair bought with the first salary.
export function chair16() {
  const k = mat('#1d1d20', { roughness: 0.55 }), r = mat('#b3262a', { roughness: 0.55 }), g = swivelBase('#1c1c1e', 0.46);
  g.add(rbox(0.5, 0.1, 0.5, k, 0, 0.44, 0, 0.04), rbox(0.06, 0.1, 0.46, r, -0.24, 0.47, 0, 0.03), rbox(0.06, 0.1, 0.46, r, 0.24, 0.47, 0, 0.03));
  const back = group(
    rbox(0.46, 0.82, 0.08, k, 0, 0, 0, 0.04),
    rbox(0.07, 0.6, 0.12, r, -0.23, 0.05, 0.03, 0.03),
    rbox(0.07, 0.6, 0.12, r, 0.23, 0.05, 0.03, 0.03),
    rbox(0.3, 0.16, 0.1, r, 0, 0.64, 0.02, 0.04),
    rbox(0.3, 0.14, 0.08, k, 0, 0.12, 0.07, 0.05),
  );
  g.add(at(back, 0, 0.52, -0.24, 0, -0.14));
  for (const x of [-0.29, 0.29]) g.add(box(0.03, 0.2, 0.03, k, x, 0.5, 0), rbox(0.07, 0.03, 0.26, k, x, 0.7, 0.02, 0.01));
  return g;
}

// 2021: ergonomic mesh chair, after the back started to complain.
export function chair21() {
  const f = mat('#c9c7c1', { roughness: 0.5 }), mesh = mat('#6f7775', { roughness: 0.95 }), g = swivelBase('#c9c7c1', 0.47);
  g.add(rbox(0.48, 0.06, 0.46, mesh, 0, 0.46, 0, 0.03), box(0.06, 0.5, 0.03, f, 0, 0.45, -0.25));
  g.add(at(rbox(0.44, 0.52, 0.03, mesh, 0, 0, 0, 0.015), 0, 0.92, -0.25, 0, -0.1), at(rbox(0.26, 0.12, 0.04, mesh, 0, 0, 0, 0.02), 0, 1.3, -0.28, 0, -0.1));
  g.add(rbox(0.3, 0.1, 0.05, f, 0, 0.62, -0.2, 0.02));
  for (const x of [-0.28, 0.28]) g.add(box(0.03, 0.2, 0.03, f, x, 0.49, 0), rbox(0.07, 0.025, 0.24, mat('#3a3d3c'), x, 0.69, 0.03, 0.01));
  return g;
}

// Single bed; the head is at -z.
export function bed() {
  const m = woodMat('#b98b59', '#8a6238');
  return group(
    box(1.0, 0.2, 2.0, m, 0, 0.12, 0),
    box(1.0, 0.75, 0.04, m, 0, 0, -1.0),
    box(1.0, 0.4, 0.04, m, 0, 0, 1.0),
    rbox(0.96, 0.16, 1.94, '#f1ece0', 0, 0.32, 0, 0.04),
    rbox(0.6, 0.1, 0.36, '#f6f1e4', 0, 0.47, -0.74, 0.045),
  );
}

export function nightstand() {
  const m = woodMat('#b98b59', '#8a6238');
  return group(box(0.42, 0.5, 0.38, m, 0, 0, 0), box(0.36, 0.16, 0.01, '#a67a4b', 0, 0.3, 0.19), box(0.08, 0.02, 0.02, '#6d4c2a', 0, 0.37, 0.2));
}

export function sofa() {
  const f = grainMat('#7d8a78', '#39423a', [3, 3], 0.25), g = group(rbox(1.6, 0.26, 0.82, f, 0, 0.1, 0, 0.05), rbox(1.6, 0.5, 0.2, f, 0, 0.3, -0.31, 0.07));
  for (const x of [-0.72, 0.72]) g.add(rbox(0.16, 0.34, 0.82, f, x, 0.26, 0, 0.06));
  for (const x of [-0.33, 0.33]) g.add(rbox(0.63, 0.12, 0.58, f, x, 0.35, 0.09, 0.05), at(rbox(0.6, 0.34, 0.14, f, 0, 0, 0, 0.06), x, 0.63, -0.16, 0, -0.2));
  for (const x of [-0.7, 0.7]) for (const z of [-0.33, 0.33]) g.add(cyl(0.02, 0.1, '#5a3d24', x, 0, z));
  return g;
}

export function wardrobe() {
  const m = woodMat('#c9a271', '#96703f', [1, 1], 4), g = group(box(1.0, 1.9, 0.56, m, 0, 0, 0));
  g.add(box(0.008, 1.8, 0.01, '#7c5a30', 0, 0.06, 0.281), cyl(0.012, 0.12, '#d8c9a0', -0.05, 0.95, 0.29), cyl(0.012, 0.12, '#d8c9a0', 0.05, 0.95, 0.29));
  return g;
}

// 2005: narrow pine bookshelf. Shelf tops at y = 0.05 / 0.42 / 0.78 / 1.12 / 1.44.
export const SHELF05 = [0.05, 0.42, 0.78, 1.12, 1.44];
export function shelf05() {
  const m = woodMat('#dcc08f', '#b0905c'), g = group(box(0.02, 1.7, 0.28, m, -0.34, 0, 0), box(0.02, 1.7, 0.28, m, 0.34, 0, 0), box(0.7, 1.7, 0.012, m, 0, 0, -0.134));
  for (const y of [...SHELF05, 1.7]) g.add(box(0.68, 0.02, 0.27, m, 0, y - 0.02, 0));
  return g;
}

// 2016: white cube shelf, 2 x 4 cells of 0.35. Cell floors at y = 0.03 + 0.37 * row.
export function cubeShelf() {
  const w = mat('#f1eee6', { roughness: 0.5 }), g = group(box(0.78, 1.51, 0.012, w, 0, 0, -0.18));
  for (const x of [-0.38, 0, 0.38]) g.add(box(0.02, 1.51, 0.38, w, x, 0, 0));
  for (let i = 0; i <= 4; i++) g.add(box(0.78, 0.03, 0.38, w, 0, 0.37 * i, 0));
  return g;
}

export function tvStand() {
  const m = woodMat('#b9905e', '#8a6238', [2, 1], 4), g = group(box(1.3, 0.04, 0.4, m, 0, 0.42, 0), box(1.3, 0.04, 0.4, m, 0, 0.12, 0));
  for (const x of [-0.63, 0, 0.63]) g.add(box(0.03, 0.3, 0.4, m, x, 0.14, 0));
  for (const x of [-0.58, 0.58]) for (const z of [-0.15, 0.15]) g.add(cyl(0.018, 0.12, '#222', x, 0, z));
  return g;
}

// 2019: glass display cabinet for what survived every clear-out.
export function cabinet() {
  const f = steel(), glass = mat('#cfe3e6', { transparent: true, opacity: 0.16, roughness: 0.1 }), g = group();
  for (const x of [-0.4, 0.4]) for (const z of [-0.18, 0.18]) g.add(box(0.025, 1.7, 0.025, f, x, 0, z));
  for (const y of [0.02, 0.44, 0.86, 1.28, 1.7]) g.add(box(0.82, 0.02, 0.38, y < 0.1 || y > 1.6 ? f : mat('#d9e6e4', { transparent: true, opacity: 0.45 }), 0, y - 0.02, 0));
  const pane = box(0.8, 1.66, 0.006, glass, 0, 0.02, 0.185);
  pane.castShadow = false;
  g.add(pane);
  return g;
}

export function rug() {
  const g = group(rbox(2.1, 0.015, 1.4, grainMat('#b9a58c', '#5f4b3a', [4, 3], 0.3), 0, 0, 0, 0.007), rbox(1.9, 0.016, 1.2, grainMat('#5d6f7a', '#e6dcc6', [4, 3], 0.3), 0, 0, 0, 0.007));
  g.children.forEach((c) => (c.castShadow = false));
  return g;
}
