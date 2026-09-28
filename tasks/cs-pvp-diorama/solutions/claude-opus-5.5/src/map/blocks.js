import { rand, range } from '../core/rng.js';
import { solid, dripLine, steam } from '../fx/registry.js';
import { addLight } from '../fx/lights.js';
import { decal, trashBin, cardboardPile, tireStack, looseTire, pallet, jersey, acUnit, barrel, crateStack } from '../props/basic.js';
import { gutter, roofVent, vent, powerPole, wire, ladder } from '../props/structures.js';
import { wallX, wallZ, windowOn, graffiti, wetWall, flatRoof } from './common.js';

// Row of windows on a face; `mode(i)` returns 'lit' | 'dark' | 'boards'.
function windowRow(k, face, fixed, from, to, y, n, w, h, mode) {
  for (let i = 0; i < n; i++) {
    const c = from + ((i + 0.5) * (to - from)) / n;
    const m = mode(i);
    const lit = { lit: 'windowWarm', cool: 'windowCool', dark: 'hole', boards: 'hole' }[m];
    const opts = { lit, boards: m === 'boards', depth: 0.08 };
    if (face.endsWith('x')) windowOn(k, face, fixed, y, c, w, h, opts);
    else windowOn(k, face, c, y, fixed, w, h, opts);
  }
}

function waterTank(k, x, y, z) {
  for (const [dx, dz] of [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]]) k.rod('darkMetal', [x + dx, y, z + dz], [x + dx * 0.8, y + 1.4, z + dz * 0.8], 0.05);
  k.cyl('metal', [x, y + 1.4, z], 0.9, 1.5, { seg: 14, tint: 0x8a9294 });
  k.cyl('metal', [x, y + 2.9, z], 0.95, 0.12, { seg: 14, tint: 0x6a7274 });
}

// West block: closed two-storey brick building between the left alley and mid.
function westBlock(k) {
  const [x0, x1, z0, z1, h] = [-23, -9, -9, 15, 6.5];
  k.span('brick', x0, 0, z0, x1, h, z1, { uv: 3 });
  k.span('concrete', x0 - 0.05, 0, z0 - 0.05, x1 + 0.05, 0.9, z1 + 0.05, { tint: 0x8a8a86 });
  k.span('concrete', x0 - 0.08, 3.1, z0 - 0.08, x1 + 0.08, 3.3, z1 + 0.08, { tint: 0xa0a09a });
  flatRoof(k, x0, z0, x1, z1, h, { parapet: 0.6 });
  solid(x0, z0, x1, z1, h + 0.25);
  const pick = () => { const r = rand(); return r < 0.25 ? 'lit' : r < 0.55 ? 'dark' : r < 0.75 ? 'boards' : 'dark'; };
  for (const y of [2.0, 4.9]) {
    windowRow(k, '+x', x1, z0 + 1, z1 - 1, y, 6, 1.2, 1.3, pick);
    windowRow(k, '-x', x0, z0 + 1, z1 - 1, y, 6, 1.1, 1.3, () => (rand() < 0.6 ? 'boards' : 'dark'));
    windowRow(k, '-z', z0, x0 + 1, x1 - 1, y, 4, 1.2, 1.3, pick);
    windowRow(k, '+z', z1, x0 + 1, x1 - 1, y, 4, 1.2, 1.3, pick);
  }
  graffiti(k, '+x', x1 + 0.02, 1.6, 9, 2.2, 'tagDust');
  graffiti(k, '+x', x1 + 0.02, 1.4, -4, 1.4, 'bullets');
  graffiti(k, '-x', x0 - 0.02, 1.5, 3, 2.4, 'rushB');
  graffiti(k, '-x', x0 - 0.02, 1.6, -5, 1.8, 'tagGG');
  graffiti(k, '+z', -12, 1.5, z1 + 0.02, 1.6, 'arrowA');
  decal(k, 'freightNo', [-16, 1.9, z0 - 0.03], 2.0, 2.0, '-z');
  for (const f of ['+x', '-x']) wetWall(k, f, f === '+x' ? x1 : x0, 0, 3, 24, h);
  wetWall(k, '-z', -16, 0, z0, 14, h);
  gutter(k, [x1 + 0.25, h - 0.1, z0], [x1 + 0.25, h - 0.1, z1 - 0.3], 0);
  gutter(k, [x0 - 0.25, h - 0.1, z1], [x0 - 0.25, h - 0.1, z0 + 0.4], 0);
  dripLine([x0, h, z1 + 0.1], [x1, h, z1 + 0.1], 7);
  dripLine([x0, h, z0 - 0.1], [x1, h, z0 - 0.1], 7);
  roofVent(k, -19, h + 0.25, -3);
  roofVent(k, -12, h + 0.25, 8);
  acUnit(k, -15, h + 0.25, 1, 0);
  waterTank(k, -19.5, h + 0.25, 10);
  for (const z of [-2, 6]) acUnit(k, x0 - 0.3, 3.8, z, -Math.PI / 2);
  vent(k, x1 + 0.3, 0.4, 12.5, Math.PI / 2, 0.8);
  // steam pipe running up the alley face
  k.rod('metal', [x0 - 0.2, 0.3, -7], [x0 - 0.2, h + 0.8, -7], 0.1, { tint: 0x9a9ea0 });
  k.rod('metal', [x0 - 0.2, 0.3, -7.3], [x0 - 0.2, 0.3, -6.7], 0.12, { tint: 0x8a8e90 });
  steam(x0 - 0.2, h + 0.9, -7);
}

// East block: two-storey shuttered shop house between mid and the B shortcut lane.
function eastBlock(k) {
  const [x0, x1, z0, z1, h] = [9, 17, -4, 14, 7];
  k.span('concrete', x0, 0, z0, x1, h, z1, { tint: 0xa49a8a, uv: 4 });
  k.span('concrete', x0 - 0.08, 3.4, z0 - 0.08, x1 + 0.08, 3.6, z1 + 0.08, { tint: 0x8a8274 });
  flatRoof(k, x0, z0, x1, z1, h, { parapet: 0.5, tint: 0xa0a09a });
  solid(x0, z0, x1, z1, h + 0.25);
  // shop shutters facing mid, a cool-lit window above
  for (const z of [-1, 4, 9]) {
    k.span('shutter', x0 - 0.12, 0.1, z - 1.9, x0 - 0.02, 2.9, z + 1.9, { uv: 3.5 });
    k.span('darkMetal', x0 - 0.3, 2.9, z - 2.0, x0, 3.25, z + 2.0, { tint: 0x4a4a48 });
  }
  graffiti(k, '-x', x0 - 0.14, 1.4, 4, 2.2, 'tagGG');
  graffiti(k, '-x', x0 - 0.14, 1.0, -1.4, 1.2, 'bullets');
  decal(k, 'freightSign', [x0 - 0.05, 4.4, 11.5], 3.0, 2.2, '-x');
  windowRow(k, '-x', x0, z0 + 1, z1 - 4, 5.2, 4, 1.3, 1.3, (i) => (i === 1 ? 'cool' : i === 3 ? 'lit' : 'dark'));
  windowRow(k, '+x', x1, z0 + 1, z1 - 1, 5.2, 5, 1.2, 1.3, () => (rand() < 0.3 ? 'lit' : 'dark'));
  windowRow(k, '+x', x1, z0 + 1, z1 - 1, 2.0, 5, 1.2, 1.2, () => (rand() < 0.5 ? 'boards' : 'dark'));
  windowRow(k, '-z', z0, x0 + 1, x1 - 1, 5.2, 3, 1.2, 1.3, () => 'dark');
  windowRow(k, '+z', z1, x0 + 1, x1 - 1, 5.2, 3, 1.2, 1.3, (i) => (i === 0 ? 'lit' : 'dark'));
  k.span('shutter', x0 + 2, 0.1, z0 - 0.12, x1 - 2, 3.0, z0 - 0.02, { uv: 3.5 });
  graffiti(k, '-z', 13, 1.4, z0 - 0.14, 2.2, 'arrowB');
  graffiti(k, '+x', x1 + 0.02, 1.6, 6, 2.0, 'tSpray');
  for (const f of ['-x', '+x']) wetWall(k, f, f === '-x' ? x0 : x1, 3.6, 5, 18, h - 3.6);
  gutter(k, [x0 - 0.25, h - 0.1, z1], [x0 - 0.25, h - 0.1, z0 + 0.4], 0);
  dripLine([x0, h, z0 - 0.1], [x1, h, z0 - 0.1], 5);
  dripLine([x0 - 0.3, 3.25, -3], [x0 - 0.3, 3.25, 11], 9);
  for (const z of [0, 8]) acUnit(k, x1 + 0.3, 4.3, z, Math.PI / 2);
  vent(k, x1 + 0.3, 1.0, 11, Math.PI / 2, 0.7);
  roofVent(k, 12, h + 0.25, 1);
  waterTank(k, 14.5, h + 0.25, 10);
  ladder(k, x1 + 0.3, 0, 12.8, Math.PI / 2, h + 0.6);
}

// Left alley: narrow flank from the A-site passage down to the CT street.
function leftAlley(k) {
  k.span('brick', -31.4, 0, -12.5, -30.8, 3.4, 18.5, { uv: 3 });
  k.span('concrete', -31.5, 3.4, -12.5, -30.7, 3.6, 18.5, { tint: 0x9a9a94 });
  solid(-31.4, -12.5, -30.8, 18.5, 3.6);
  graffiti(k, '+x', -30.78, 1.6, -6, 2.4, 'tagGG');
  graffiti(k, '+x', -30.78, 1.4, 6, 2.2, 'tagDust');
  graffiti(k, '+x', -30.78, 1.2, 13, 1.4, 'bullets');
  wetWall(k, '+x', -30.78, 0, 3, 31, 3.4);
  trashBin(k, -29.6, 0, -7.5, Math.PI / 2, 0x2f5a3a);
  trashBin(k, -29.6, 0, 9.6, Math.PI / 2, 0x3a3f6a);
  cardboardPile(k, -29.8, 0, -4.8, 0.4, 7);
  cardboardPile(k, -24, 0, 11.8, -0.3, 5);
  tireStack(k, -29.9, 0, 1.4, 4);
  looseTire(k, -28.8, 0, 2.2, 0.6);
  for (let i = 0; i < 3; i++) pallet(k, -30.2, 0.02, 4.5 + i * 0.02, 0.1);
  k.push([-30.25, 0.3, 4.9], 0, 0, -1.2);
  pallet(k, 0, 0, 0, Math.PI / 2);
  k.pop();
  // corrugated lean-to pinching the alley
  k.span('corrugated', -30.8, 0, -1.8, -28.8, 2.4, -1.6, { tint: 0x7a5a48 });
  k.span('corrugated', -30.8, 2.4, -1.8, -28.4, 2.5, 0.8, { rot: [0, 0, 0.12], tint: 0x6a5040 });
  jersey(k, -26.2, 0, 14.5, 0.1);
  barrel(k, -24.4, 0, 6.5);
  crateStack(k, -24.3, 0, -3.5, 0.2, [[0, 0, 0], [0, 1, 0]]);
  // dim caged lamp over the passage out of A
  k.box('darkMetal', [-23.2, 3.6, -8.8], [0.3, 0.3, 0.3], { tint: 0x3a3a38 });
  k.box('lampWarm', [-23.2, 3.55, -9.0], [0.2, 0.18, 0.08]);
  addLight({ pos: [-23.6, 3.3, -9.6], color: 0xffa860, intensity: 6, distance: 10, glow: 1.2, glowOpacity: 0.6, mode: 'flicker', phase: 0.8 });
}

// Old timber poles with black cables slung across the streets and between eaves.
function wiring(k) {
  const p1 = powerPole(k, -24.3, 0, -7.5, Math.PI / 2);
  const p2 = powerPole(k, -24.3, 0, 12.5, Math.PI / 2);
  const p3 = powerPole(k, 7.6, 0, -8.8, 0);
  const p4 = powerPole(k, 12.6, 0, -8.8, 0);
  const p5 = powerPole(k, -8.2, 0, 17.8, 0);
  const p6 = powerPole(k, 16.2, 0, 17.8, 0);
  const p7 = powerPole(k, -9.6, 2.0, -30.2, 0);
  for (let i = 0; i < 2; i++) {
    wire(k, p1[i], p2[i], 1.4);
    wire(k, p5[i], p6[i], 1.6);
    wire(k, p3[i], p4[i], 0.4);
    wire(k, p7[i], p1[i], 1.6);
  }
  wire(k, p2[0], p5[0], 1.2);
  wire(k, p2[1], [-23, 6.2, 13], 0.6);
  wire(k, p4[1], [22, 6.2, -20], 1.0);
  wire(k, p4[0], [17, 6.8, -3.6], 0.5);
  wire(k, p3[0], [-9, 6.4, -8.6], 1.8);
  wire(k, p6[1], [17.5, 5.6, 19.5], 0.4);
  wire(k, p6[0], [9, 6.8, 14.2], 0.8);
  // cross-lane cables between eaves over mid
  for (const [z, s] of [[-6, 1.2], [5.5, 1.6], [12.5, 1.0]]) wire(k, [-9, 6.1, z], [9, 6.6, z + range(-1, 1)], s);
  wire(k, [-11, 7.2, -13.2], [-9, 6.2, -9.2], 0.5);
  wire(k, [-23, 6.1, -2], [-30.8, 3.5, -3], 0.5);
}

export function buildBlocks(k) {
  westBlock(k);
  eastBlock(k);
  leftAlley(k);
  wiring(k);
}
