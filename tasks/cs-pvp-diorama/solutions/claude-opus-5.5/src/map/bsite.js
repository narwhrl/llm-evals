import { solid, dripLine } from '../fx/registry.js';
import { addLight } from '../fx/lights.js';
import { decal, pallet, trashBin, crateStack, cardboardPile, barrel } from '../props/basic.js';
import { stairs, railing, gutter, roofVent, vent, streetLamp, wire } from '../props/structures.js';
import { desk, toppledChair, locker, ironSet, bicycle } from '../props/furniture.js';
import { wallX, wallZ, windowOn, graffiti, wetWall, flatRoof } from './common.js';

// B site: back-street yard in the north-east around a two-storey tin guard house.
const [X0, X1, Z0, Z1] = [20, 30, -28, -20];
const F2 = 3.2;
const H = 6.4;
const TIN = 0x8a9a9c;

function guardHouse(k) {
  k.span('concreteFloor', X0, 0, Z0, X1, 0.15, Z1, { tint: 0x8c8e8a });
  // ground floor: guard room with glass windows and front + back doors
  const front = [22, 23.2, 0.15, 2.3];
  const back = [27, 28.2, 0.15, 2.3];
  wallX(k, 'corrugated', X0, X1, Z1, 0.15, F2, 0.15, [front, [24.2, 26.6, 1.0, 2.2], [27.4, 29.2, 1.0, 2.2]], TIN);
  wallX(k, 'corrugated', X0, X1, Z0, 0.15, F2, 0.15, [back, [22.4, 24.4, 1.0, 2.2]], TIN);
  wallZ(k, 'corrugated', Z0, Z1, X0, 0.15, F2, 0.15, [[-25.5, -22.5, 1.0, 2.2]], TIN);
  wallZ(k, 'corrugated', Z0, Z1, X1, 0.15, F2, 0.15, [], TIN);
  for (const [cx, w] of [[25.4, 2.4], [28.3, 1.8]]) windowOn(k, '+z', cx, 1.6, Z1, w, 1.2, { depth: 0 });
  windowOn(k, '-z', 23.4, 1.6, Z0, 2.0, 1.2, { depth: 0 });
  windowOn(k, '-x', X0, 1.6, -24, 3.0, 1.2, { depth: 0 });
  // doors: front ajar, back shut
  k.push([23.2, 0.15, Z1], 2.2);
  k.box('darkMetal', [0.6, 0, 0], [1.2, 2.15, 0.05], { tint: 0x5a6a6a });
  k.pop();
  k.box('darkMetal', [27.6, 0.15, Z0 - 0.02], [1.2, 2.15, 0.05], { tint: 0x5a6a6a });
  // interior: desk, toppled chair, lockers, duty roster, broken fluorescent tube
  desk(k, 23.4, 0.15, -26.9, 0);
  toppledChair(k, 24.6, 0.15, -25.2, 0.7);
  locker(k, 29.4, 0.15, -25, -Math.PI / 2, 3);
  decal(k, 'roster', [26, 1.8, Z0 + 0.1], 0.8, 0.8, '+z');
  decal(k, 'freightSign', [21, 2.0, Z0 + 0.1], 0.9, 0.7, '+z');
  cardboardPile(k, 28.6, 0.15, -21.2, 0.3, 3);
  k.push([25.5, F2 - 0.45, -24], 0.2, 0, 0.3);
  k.box('darkMetal', [0, 0, 0], [1.3, 0.08, 0.18], { tint: 0x8a8a84 });
  k.box('lampFluoro', [0, -0.03, 0], [1.2, 0.04, 0.08]);
  k.pop();
  wire(k, [24.9, F2 - 0.05, -24.1], [24.9, F2 - 0.55, -24.1], 0, 0.008);
  addLight({ pos: [25.5, F2 - 0.8, -24], color: 0xffd890, intensity: 14, distance: 12, decay: 1.5, glow: 1.2, glowOpacity: 0.5, lamp: 'lampFluoro', mode: 'fluoro', phase: 0.4, shadow: true });

  // upper floor, balcony door and window over the site
  k.span('concrete', X0 - 0.1, F2, Z0 - 0.1, X1 + 0.1, F2 + 0.2, Z1 + 0.1, { tint: 0x9a9a94 });
  wallX(k, 'corrugated', X0, X1, Z1, F2 + 0.2, H, 0.15, [[21, 22.1, F2 + 0.2, F2 + 2.3], [24.5, 27, F2 + 1.1, F2 + 2.2]], TIN);
  wallX(k, 'corrugated', X0, X1, Z0, F2 + 0.2, H, 0.15, [], TIN);
  wallZ(k, 'corrugated', Z0, Z1, X0, F2 + 0.2, H, 0.15, [], TIN);
  wallZ(k, 'corrugated', Z0, Z1, X1, F2 + 0.2, H, 0.15, [], TIN);
  k.box('hole', [21.55, F2 + 0.2, Z1 - 0.2], [1.1, 2.1, 0.02]);
  windowOn(k, '+z', 25.75, F2 + 1.65, Z1, 2.5, 1.1, { lit: 'windowWarm', depth: 0 });
  windowRow2(k);
  flatRoof(k, X0 - 0.2, Z0 - 0.2, X1 + 0.2, Z1 + 0.2, H, { parapet: 0.4, key: 'concrete', tint: 0x9e9e98 });
  solid(X0 - 0.2, Z0 - 0.2, X1 + 0.2, Z1 + 0.2, H + 0.25);
  roofVent(k, 27.5, H + 0.25, -26);
  vent(k, X1 + 0.3, 1.2, -22, Math.PI / 2, 0.7);
  gutter(k, [X0, H - 0.1, Z1 + 0.3], [X1 - 0.3, H - 0.1, Z1 + 0.3], 0);
  dripLine([X0, F2 + 0.2, Z1 + 0.15], [X1, F2 + 0.2, Z1 + 0.15], 4);
  graffiti(k, '+z', 21.3, 1.3, Z1 + 0.1, 1.6, 'siteB');
  graffiti(k, '+x', X1 + 0.1, 2.0, -24, 2.0, 'tagDust');
  graffiti(k, '-z', 25, 4.5, Z0 - 0.1, 1.8, 'rushB');
  for (const f of ['+z', '+x']) wetWall(k, f, f === '+z' ? 25 : X1 + 0.08, F2 + 0.2, f === '+z' ? Z1 + 0.08 : -24, f === '+z' ? 10 : 8, H - F2 - 0.2);

  // balcony + steel fire escape up the west face
  k.span('darkMetal', X0 - 1.4, F2, Z1, 27.5, F2 + 0.15, Z1 + 1.6, { tint: 0x5a5e62 });
  solid(X0 - 1.4, Z1, 27.5, Z1 + 1.6, F2 + 0.15);
  railing(k, [X0 - 1.4, F2 + 0.15, Z1 + 1.6], [27.5, F2 + 0.15, Z1 + 1.6]);
  railing(k, [27.5, F2 + 0.15, Z1], [27.5, F2 + 0.15, Z1 + 1.6]);
  for (const x of [X0 - 1.2, 23, 26.5]) k.rod('darkMetal', [x, F2 - 1.0, Z1 + 0.05], [x, F2, Z1 + 1.5], 0.04);
  k.span('darkMetal', X0 - 1.4, F2, -23.3, X0, F2 + 0.15, Z1, { tint: 0x5a5e62 });
  railing(k, [X0 - 1.4, F2 + 0.15, -23.3], [X0 - 1.4, F2 + 0.15, Z1 + 1.6]);
  stairs(k, X0 - 0.7, 0, Z0 + 0.3, 0, 1.2, F2, { steel: true });
}

// windows on solid upper walls sit on the outer surface (half the 0.15 wall thickness)
function windowRow2(k) {
  windowOn(k, '-x', X0 - 0.075, F2 + 1.7, -25, 1.4, 1.0, { lit: 'hole', depth: 0.08 });
  windowOn(k, '+x', X1 + 0.075, F2 + 1.7, -24, 1.4, 1.0, { lit: 'windowWarm', depth: 0.08 });
  windowOn(k, '-z', 24, F2 + 1.7, Z0 - 0.075, 1.4, 1.0, { lit: 'hole', boards: true, depth: 0.08 });
}

export function buildBSite(k) {
  guardHouse(k);
  // bomb site B painted on the open ground in front of the house
  decal(k, 'siteB', [24.5, 0.03, -14.5], 4.2, 4.2, 'up', { yaw: 0 });
  for (const [a, b, c, d] of [[21, -18, 28, -17.9], [21, -11.1, 28, -11], [21, -18, 21.1, -11], [27.9, -18, 28, -11]]) {
    k.span('paint', a, 0.02, b, c, 0.035, d, { tint: 0xe0e0d8 });
  }
  // irregular cover: pallets, bins, a dumped bicycle, an overturned iron table and chairs
  for (let i = 0; i < 5; i++) pallet(k, 20.2, i * 0.14, -16.4, 0.3 + i * 0.05);
  for (let i = 0; i < 3; i++) pallet(k, 27.6, i * 0.14, -12.6, -0.4);
  trashBin(k, 29.8, 0, -18.3, -Math.PI / 2, 0x2e5a3a);
  trashBin(k, 18.6, 0, -19.2, 0.4, 0x3a4a6a);
  bicycle(k, 25.8, 0, -16.2, 0.9);
  ironSet(k, 23, 0, -12.6, 0.4);
  crateStack(k, 29.4, 0, -14.6, 0.1, [[0, 0, 0], [0, 1, 0], [0, 0, 1]]);
  barrel(k, 17.6, 0, -13.5);
  cardboardPile(k, 14.8, 0, -8.5, 0.3, 5);

  // side alley into B from the plaza: brick wall with a gap
  k.span('brick', 12, 0, -18.6, 12.4, 2.8, -12.5, { uv: 3 });
  k.span('brick', 12, 0, -9.5, 12.4, 2.8, -5.2, { uv: 3 });
  solid(12, -18.6, 12.4, -12.5, 2.8);
  solid(12, -9.5, 12.4, -5.2, 2.8);
  graffiti(k, '-x', 11.98, 1.4, -15.5, 1.8, 'rushB');
  graffiti(k, '+x', 12.42, 1.3, -7.4, 1.6, 'arrowB');

  // low corner wall; the gap behind it is the shortcut to CT spawn
  k.span('concrete', 17.2, 0, -5.4, 20.6, 1.15, -4.8, { tint: 0xaeaea8 });
  solid(17.2, -5.4, 20.6, -4.8, 1.15);
  graffiti(k, '-z', 18.9, 0.6, -5.42, 0.9, 'bullets');
  // old warm street lamp at the B corner
  const head = streetLamp(k, 20.9, 0, -6.4, 1.18, 5.0);
  addLight({
    pos: head, color: 0xffb060, intensity: 38, distance: 20, kind: 'spot', target: [23, 0, -12], angle: 0.85, penumbra: 0.7,
    glow: 3.2, lamp: 'lampWarm', mode: 'flicker', phase: 0, shadow: true, beam: { length: 5.2, radius: 2.4, strength: 0.16 },
  });
}
