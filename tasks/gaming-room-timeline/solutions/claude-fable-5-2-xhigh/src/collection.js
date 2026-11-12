// Game collection on the shelves and what hangs on the walls, era by era.
import { box, rbox, cyl, ball, plane, group, mat, glow, at, spines, label, woodMat, grainMat } from './kit.js';
import { SHELF05 } from './furniture.js';
import { gamepad, mechKb } from './gear.js';

const rowAt = (x, y, ...a) => at(spines(...a), x, y, 0);
const row = (y, ...a) => rowAt(-0.31, y, ...a);
const TEXT = ['#e9e3d6', '#c9d6c2', '#d8c9a0', '#b9c6d6', '#e6cfc0'];
const BIGBOX = ['#2f5fa8', '#c9463d', '#3e8f6b', '#e8b04a', '#7a5fc0', '#222'];
const DVD = ['#1b1b1d', '#f4f1ea', '#1b1b1d', '#2a3550', '#3a2a2a', '#f4f1ea'];

const trophy = () => group(box(0.07, 0.03, 0.07, '#3a2a1a'), cyl(0.01, 0.06, '#d9b44a', 0, 0.03, 0), cyl(0.02, 0.06, mat('#d9b44a', { metalness: 0.8, roughness: 0.3 }), 0, 0.09, 0, 0.04));
function figure(color, h = 0.16) {
  return group(cyl(0.04, 0.012, '#222'), box(0.05, h * 0.45, 0.03, color, 0, 0.012, 0), box(0.07, h * 0.3, 0.04, color, 0, 0.012 + h * 0.45, 0), ball(h * 0.14, '#e6c4a0', 0, 0.012 + h * 0.88, 0));
}

// 2005: textbooks above, a handful of boxed games and pirated-disc wallets below.
export function coll05() {
  const [, s1, s2, s3, s4] = SHELF05;
  return group(row(s3, 0.6, TEXT, 0.19, 0.26, 0.19, 5), row(s2, 0.3, BIGBOX, 0.22, 0.25, 0.2, 9, 0.035, 0.05), at(rbox(0.16, 0.05, 0.15, '#222', 0, 0, 0, 0.01), 0.17, s2 + 0.025, 0), at(trophy(), -0.22, s4, 0), at(ball(0.07, '#3f7ac0'), 0.18, s4 + 0.09, 0), cyl(0.05, 0.02, '#8a6238', 0.18, s4, 0), at(rbox(0.2, 0.09, 0.14, '#e8a0a0', 0, 0, 0, 0.04), -0.1, s1 + 0.045, 0));
}
// 2009: exam cram books and a shelf of DVD cases; the collector's box of the big MMO.
export function coll09() {
  const [, s1, s2, s3, s4] = SHELF05;
  return group(row(s3, 0.62, ['#c9463d', '#e9e3d6', '#7a5fc0', '#e8b04a'], 0.22, 0.27, 0.19, 12, 0.02, 0.045), row(s2, 0.5, DVD, 0.19, 0.19, 0.135, 21, 0.014, 0.016), box(0.3, 0.24, 0.1, '#1a2a4a', 0, s1, 0.02), at(box(0.22, 0.004, 0.06, '#d9b44a'), 0, s1 + 0.16, 0.071), at(trophy(), -0.22, s4, 0), at(figure('#3a5a8a'), 0.1, s4, 0));
}
// 2013: university textbooks, manga, fewer boxes (the library went digital), first statue.
export function coll13() {
  const [, s1, s2, s3, s4] = SHELF05;
  return group(row(s3, 0.62, ['#2a3550', '#e9e3d6', '#3e8f6b', '#8a8a88'], 0.2, 0.27, 0.19, 31, 0.02, 0.05), row(s2, 0.28, DVD, 0.19, 0.19, 0.135, 21, 0.014, 0.016), rowAt(0, s2, 0.3, ['#f4f1ea', '#e8b04a', '#c9463d'], 0.17, 0.18, 0.12, 4, 0.012, 0.015), box(0.28, 0.07, 0.2, '#3e8f6b', -0.1, s1, 0), box(0.26, 0.06, 0.2, '#c9463d', -0.08, s1 + 0.07, 0), at(figure('#b3262a', 0.22), -0.18, s4, 0), at(figure('#3a5a8a'), 0.02, s4, 0), at(figure('#e9e3d6', 0.19), 0.2, s4, 0));
}

const cell = (c, r) => [c ? 0.19 : -0.19, 0.03 + 0.37 * r, 0];
const cases = (c, r, palette, h, seed, w = 0.3) => at(spines(w, palette, h, h, 0.14, seed, 0.013, 0.015), cell(c, r)[0] - 0.165, cell(c, r)[1], 0);
const binBox = (c, r, color) => at(rbox(0.32, 0.3, 0.33, grainMat(color, '#333', [2, 2], 0.2), 0, 0, 0, 0.02), cell(c, r)[0], cell(c, r)[1] + 0.15, 0);

// 2016: console generation in blue cases, fabric bins for cables, figures on top.
export function coll17() {
  return group(cases(0, 3, ['#2f5fa8', '#3468b5', '#2a528f'], 0.17, 3), cases(1, 3, DVD, 0.19, 8, 0.2), at(figure('#b3262a', 0.22), 0.27, cell(1, 3)[1], 0), cases(0, 2, ['#2f5fa8', '#3468b5', '#f4f1ea'], 0.17, 5, 0.22), at(gamepad(), 0.19, cell(1, 2)[1], 0.05), at(gamepad('#e9e6df'), 0.19, cell(1, 2)[1] + 0.03, -0.04, 0.4), binBox(0, 1, '#8a8f8a'), rowAt(0.03, cell(1, 1)[1], 0.3, ['#2a3550', '#e9e3d6', '#3e8f6b'], 0.24, 0.27, 0.19, 31, 0.025, 0.05), binBox(0, 0, '#6f7775'), binBox(1, 0, '#8a8f8a'));
}
// 2021: red and white cases join the blue ones; art books, a record player's worth of calm.
export function coll21() {
  return group(cases(0, 3, ['#d8372e', '#e04a3f', '#c92f28'], 0.17, 2), cases(1, 3, ['#f4f1ea', '#2f5fa8', '#f4f1ea', '#3468b5'], 0.17, 6), cases(0, 2, ['#2f5fa8', '#3468b5', '#d8372e'], 0.17, 5), rowAt(0.03, cell(1, 2)[1], 0.3, ['#1b1b1d', '#e9e3d6', '#8d5f3c', '#b0528a'], 0.26, 0.3, 0.22, 14, 0.025, 0.045), binBox(0, 1, '#b9a58c'), at(gamepad('#e9e6df'), 0.19, cell(1, 1)[1], 0.04), at(gamepad(), 0.19, cell(1, 1)[1] + 0.03, -0.05, 0.5), binBox(0, 0, '#6f7775'), binBox(1, 0, '#b9a58c'));
}

// Glass cabinet: figures, the retired mechanical keyboard, old handhelds.
export function cabinetStuff() {
  const g = group();
  ['#b3262a', '#3a5a8a', '#e9e3d6', '#3e8f6b'].forEach((c, i) => g.add(at(figure(c, 0.18 + (i % 2) * 0.05), -0.27 + i * 0.18, 1.28, 0, i * 0.3 - 0.4)));
  g.add(at(mechKb(), 0, 0.98, -0.08, 0, -1.1), at(figure('#e8b04a', 0.14), -0.3, 0.86, 0.08), at(figure('#7a5fc0', 0.14), 0.3, 0.86, 0.08));
  g.add(at(rbox(0.13, 0.018, 0.07, '#c9d3de', 0, 0, 0, 0.006), -0.2, 0.453, 0.02, 0.3), at(rbox(0.17, 0.02, 0.075, '#1b1b1d', 0, 0, 0, 0.008), 0.12, 0.454, 0, -0.2), at(box(0.3, 0.24, 0.1, '#1a2a4a'), 0.2, 0.14, 0, -0.2), at(box(0.2, 0.2, 0.2, '#e8b04a'), -0.2, 0.12, 0, 0.3));
  return g;
}

function hanging(w, h, draw) {
  return group(plane(w, h, label(w, h, draw), 0, 0, 0.004));
}
// 2009: guild banner from the MMO years.
export const wallScroll = () => group(hanging(0.42, 1.0, (c, w, h) => {
  c.fillStyle = '#7a1f1f';
  c.fillRect(0, 0, w, h);
  c.fillStyle = '#d9b44a';
  c.fillRect(8, 8, w - 16, 6);
  c.fillRect(8, h - 14, w - 16, 6);
  c.beginPath();
  c.moveTo(w / 2, h * 0.22);
  c.lineTo(w * 0.78, h * 0.42);
  c.lineTo(w / 2, h * 0.62);
  c.lineTo(w * 0.22, h * 0.42);
  c.fill();
  c.textAlign = 'center';
  c.font = `bold ${w * 0.16}px "Songti SC", "SimSun", serif`;
  c.fillText('为了部落', w / 2, h * 0.8);
}), cyl(0.012, 0.48, '#3a2a1a', 0, 0.26, 0.01).rotateZ(Math.PI / 2));
// 2012: tournament poster from the MOBA years.
export const poster13 = () => hanging(0.9, 0.6, (c, w, h) => {
  const g = c.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#0e2a3a');
  g.addColorStop(1, '#1a5a6a');
  c.fillStyle = g;
  c.fillRect(0, 0, w, h);
  c.fillStyle = '#d9b44a';
  c.beginPath();
  c.moveTo(w * 0.5, h * 0.12);
  c.lineTo(w * 0.62, h * 0.5);
  c.lineTo(w * 0.5, h * 0.62);
  c.lineTo(w * 0.38, h * 0.5);
  c.fill();
  c.textAlign = 'center';
  c.font = `bold ${h * 0.13}px sans-serif`;
  c.fillText('全球总决赛 2013', w / 2, h * 0.84);
});

// 2016: pegboard for controllers, cables and a spare headset.
export function pegboard() {
  const g = group(box(0.9, 0.6, 0.012, mat('#efe9dc', { roughness: 0.7 }), 0, -0.3, 0.006));
  for (let i = 0; i < 40; i++) g.add(box(0.008, 0.008, 0.002, '#b9b09a', -0.4 + (i % 10) * 0.089, -0.22 + ((i / 10) | 0) * 0.15, 0.013));
  g.add(at(gamepad(), -0.25, 0.08, 0.04, 0, Math.PI / 2), at(gamepad('#c9463d'), 0.02, 0.08, 0.04, 0, Math.PI / 2), box(0.2, 0.012, 0.07, '#d9c9a0', 0.28, -0.12, 0.045), at(cyl(0.03, 0.08, '#3e8f6b'), 0.24, -0.068, 0.05), at(cyl(0.03, 0.08, '#e8b04a'), 0.32, -0.068, 0.05));
  return g;
}
// 2020: felt acoustic panels for video calls, and a shelf of small things.
export function panels() {
  const g = group(), cols = ['#8a6f5a', '#b9a58c', '#5f6f66', '#b9a58c', '#8a6f5a', '#5f6f66'];
  cols.forEach((c, i) => g.add(rbox(0.29, 0.29, 0.02, grainMat(c, '#222', [2, 2], 0.25), -0.75 + (i % 3) * 0.3, ((i / 3) | 0) * 0.3 - 0.3, 0.01, 0.008)));
  g.add(box(0.7, 0.025, 0.14, woodMat('#8d5f3c', '#5e3b22'), 0.5, -0.2, 0.07), at(figure('#e8b04a', 0.13), 0.3, -0.175, 0.07), at(figure('#3a5a8a', 0.15), 0.45, -0.175, 0.07));
  return g;
}
export function prints() {
  const g = group();
  [['#2a3550', '#e8b04a'], ['#7a1f1f', '#d9b44a'], ['#1a5a6a', '#f4f1ea']].forEach(([a, b], i) => {
    g.add(box(0.34, 0.44, 0.02, '#1b1b1d', (i - 1) * 0.42, -0.22, 0.01), plane(0.3, 0.4, label(0.3, 0.4, (c, w, h) => {
      c.fillStyle = a;
      c.fillRect(0, 0, w, h);
      c.fillStyle = b;
      c.beginPath();
      c.arc(w / 2, h * 0.42, w * (0.18 + i * 0.05), 0, 7);
      c.fill();
      c.fillRect(w * 0.2, h * 0.8, w * 0.6, h * 0.03);
    }), (i - 1) * 0.42, 0, 0.021));
  });
  return g;
}

// 2023: sideboard for the retro corner, with the grey console that once lived at a cousin's.
export function sideboard() {
  const m = woodMat('#8d5f3c', '#5e3b22', [2, 1], 4), g = group(box(1.1, 0.04, 0.44, m, 0, 0.46, 0), box(1.1, 0.03, 0.44, m, 0, 0.1, 0));
  for (const x of [-0.53, 0, 0.53]) g.add(box(0.03, 0.34, 0.44, m, x, 0.12, 0));
  for (const x of [-0.5, 0.5]) for (const z of [-0.18, 0.18]) g.add(cyl(0.015, 0.1, '#222', x, 0, z));
  g.add(rbox(0.26, 0.07, 0.19, '#b9b6ae', -0.26, 0.13, 0.04, 0.01), box(0.1, 0.006, 0.08, '#8a8880', -0.26, 0.2, 0.04), box(0.02, 0.01, 0.004, glow('#ff3b30', 2), -0.36, 0.16, 0.137), at(gamepad('#b9b6ae'), -0.02, 0.5, 0.12, 0.4), at(spines(0.4, BIGBOX, 0.22, 0.25, 0.2, 9, 0.035, 0.05), 0.07, 0.13, 0));
  return g;
}
