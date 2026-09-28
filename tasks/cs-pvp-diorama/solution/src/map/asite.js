import { Kit } from '../core/kit.js';
import { range } from '../core/rng.js';
import { solid, dripLine, ANIMATED } from '../fx/registry.js';
import { addLight } from '../fx/lights.js';
import { decal, crateStack, sandbags, barrelQuad, cardboardPile, newspaperScatter, straps, acUnit, trashBin } from '../props/basic.js';
import { ladder, rack, railing, gutter, roofVent, wire } from '../props/structures.js';
import { sortingTable, palletJack } from '../props/furniture.js';
import { wallX, wallZ, windowOn, graffiti, wetWall } from './common.js';

// A site: half-open abandoned warehouse in the north-west. Roller door faces the T ramp plaza.
const X0 = -31;
const X1 = -11;
const Z0 = -31;
const Z1 = -13;
const H = 7.5;
const SIDING = 0x7d8c8a;

export function buildASite(k, dynamic) {
  k.span('concreteFloor', X0, 0, Z0, X1, 0.15, Z1, { tint: 0x9a9c98 });
  solid(X0, Z0, X1, Z1, 0.15);
  const P = 1.2; // concrete plinth under the siding

  // east wall: roller door (x = X1) and a caged work lamp
  const door = [-18, -13.8, 0, 4.2];
  wallZ(k, 'concrete', Z0, Z1, X1, 0, P, 0.3, [door], 0xb0b0aa);
  wallZ(k, 'corrugated', Z0, Z1, X1, P, H, 0.2, [[door[0], door[1], 0, 4.2]], SIDING);
  k.span('darkMetal', X1 - 0.1, 4.2, -18.2, X1 + 0.35, 4.75, -13.6, { tint: 0x5a4a3e });
  for (const z of [-18.1, -13.7]) k.span('darkMetal', X1 - 0.05, 0, z - 0.08, X1 + 0.12, 4.2, z + 0.08, { tint: 0x4a4038 });
  graffiti(k, '+x', X1 + 0.1, 2.5, -22, 2.0, 'siteA');
  graffiti(k, '+x', X1 + 0.1, 2.2, -27.5, 1.8, 'bullets');
  decal(k, 'freightSign', [X1 + 0.13, 5.6, -15.9], 2.6, 1.9, '+x');
  wetWall(k, '+x', X1 + 0.1, P, -22, 18, H - P);
  dripLine([X1 + 0.35, 4.75, -18.1], [X1 + 0.35, 4.75, -13.7], 5);

  // the shutter: rolled half up, rattles now and then
  const sk = new Kit();
  sk.span('shutter', -0.06, 2.1, -2.1, 0.06, 4.2, 2.1, { uv: 4 });
  sk.span('darkMetal', -0.09, 2.02, -2.12, 0.09, 2.12, 2.12, { tint: 0x4a3a30 });
  const shutter = sk.build('shutter');
  shutter.position.set(X1 + 0.18, 0, -15.9);
  dynamic.add(shutter);
  let next = 3;
  let shake = 0;
  ANIMATED.push((t, dt) => {
    if (t > next) {
      shake = 1;
      next = t + range(5, 11);
    }
    shake = Math.max(0, shake - dt * 1.6);
    shutter.position.y = Math.sin(t * 48) * 0.022 * shake;
    shutter.position.x = X1 + 0.18 + Math.sin(t * 31) * 0.018 * shake;
    shutter.rotation.x = Math.sin(t * 23) * 0.006 * shake;
  });

  // south wall toward the alley passage: inward side door + two boarded, breachable windows
  const sDoor = [-15.2, -14.0, 0, 2.3];
  const w1 = [-24.4, -22.4, 1.4, 2.8];
  const w2 = [-20.2, -18.2, 1.4, 2.8];
  wallX(k, 'concrete', X0, X1, Z1, 0, P, 0.3, [sDoor, w1, w2].map(([a, b, c, d]) => [a, b, Math.max(c, 0), Math.min(d, P)]).filter((h) => h[2] < P), 0xb0b0aa);
  wallX(k, 'corrugated', X0, X1, Z1, P, H, 0.2, [[sDoor[0], sDoor[1], P, sDoor[3]], w1, w2], SIDING);
  k.push([-15.2, 0.15, Z1 - 0.1], -1.1);
  k.box('wood', [0.6, 0, 0], [1.2, 2.15, 0.06], { tint: 0x8a6a4a });
  k.pop();
  for (const w of [w1, w2]) windowOn(k, '+z', (w[0] + w[1]) / 2, (w[2] + w[3]) / 2, Z1, w[1] - w[0], w[3] - w[2], { boards: true, depth: 0.05 });
  for (const x of [-28.5, -26.9]) acUnit(k, x, 0.8, Z1 + 0.35, 0);
  k.box('darkMetal', [-27.7, 0.15, Z1 + 0.35], [3, 0.65, 0.5], { tint: 0x4a4a48 });
  decal(k, 'freightNo', [-16.5, 4.8, Z1 + 0.13], 2.0, 2.0, '+z');
  graffiti(k, '+z', -29.5, 3.6, Z1 + 0.1, 2.2, 'tagDust');
  trashBin(k, -12.6, 0, Z1 + 0.9, 0, 0x2f5a3a);
  wetWall(k, '+z', -21, P, Z1 + 0.1, 20, H - P);

  // north and west outer walls
  wallX(k, 'concrete', X0, X1, Z0, 0, P, 0.3, [], 0xb0b0aa);
  wallX(k, 'corrugated', X0, X1, Z0, P, H, 0.2, [], SIDING);
  wallZ(k, 'concrete', Z0, Z1, X0, 0, P, 0.3, [], 0xb0b0aa);
  wallZ(k, 'corrugated', Z0, Z1, X0, P, H, 0.2, [], SIDING);
  graffiti(k, '-x', X0 - 0.1, 3.4, -20, 2.4, 'tagGG');

  // back room behind a partition; its half-open door leaks red light
  wallZ(k, 'corrugated', Z0, Z1, -27, 0.15, H, 0.15, [[-24.2, -22.8, 0.15, 2.4]], 0x6a7270);
  k.push([-27.05, 0.15, -22.8], 0.55);
  k.box('darkMetal', [0, 0, -0.7], [0.05, 2.2, 1.4], { tint: 0x5a4a40 });
  k.pop();
  addLight({ pos: [-29, 2.6, -23.5], color: 0xff2a14, intensity: 7, distance: 7, glow: 1.2, glowOpacity: 0.5, lamp: 'lampRed', mode: 'hum', phase: 1 });
  addLight({ kind: 'none', pos: [-27.1, 1.2, -23.4], color: 0xff3a20, intensity: 0, glow: 2.2, glowOpacity: 0.35, mode: 'hum' });
  k.box('lampRed', [-29.5, 2.9, -23.5], [0.3, 0.12, 0.3]);
  crateStack(k, -29.2, 0.15, -28, 0.1, [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]);

  // trusses every 4 m, sheeted roof over the north strip and back room, broken gap mid-span
  for (let x = X0 + 2; x < X1; x += 4) {
    k.span('darkMetal', x - 0.1, H - 0.9, Z0, x + 0.1, H - 0.75, Z1, { tint: 0x5a5a58 });
    k.span('darkMetal', x - 0.1, H - 0.1, Z0, x + 0.1, H, Z1, { tint: 0x5a5a58 });
    for (let z = Z0; z < Z1 - 0.5; z += 1.5) k.rod('darkMetal', [x, H - 0.8, z], [x, H - 0.05, z + 1.5], 0.035, { tint: 0x5a5a58 });
  }
  for (const z of [-28, -24, -20, -16]) k.span('darkMetal', X0, H - 0.1, z - 0.06, X1, H, z + 0.06, { tint: 0x55524c });
  k.span('corrugated', X0, H, Z0, X1, H + 0.08, -25.5, { tint: 0x6a7470 });
  k.span('corrugated', X0, H, -25.5, -27, H + 0.08, Z1, { tint: 0x6a7470 });
  k.span('corrugated', -16, H, -16.5, X1, H + 0.08, Z1, { tint: 0x6a7470 });
  solid(X0, Z0, X1, -25.5, H + 0.08);
  solid(X0, -25.5, -27, Z1, H + 0.08);
  solid(-16, -16.5, X1, Z1, H + 0.08);
  k.span('corrugated', -24, H - 1.4, -25.5, -21, H - 1.32, -23.5, { rot: [0.9, 0, 0.2], tint: 0x64706c });
  k.span('corrugated', -16.5, H - 0.8, -18, -14.5, H - 0.72, -16.5, { rot: [-0.6, 0, -0.3], tint: 0x64706c });
  dripLine([-27, H, -25.5], [-11, H, -25.5], 8);
  dripLine([-16, H, -16.5], [-11, H, -16.5], 3);
  gutter(k, [X0, H - 0.1, Z1 + 0.25], [X1 - 0.3, H - 0.1, Z1 + 0.25], 0.15);
  roofVent(k, -23, H, -29);
  roofVent(k, -14, H, -28);

  // corner loft reached by a vertical ladder; its window looks over the site and the door
  const LY = 3.6;
  k.span('darkMetal', -17, LY - 0.15, -30.7, -11.3, LY, -26.3, { tint: 0x5a5e62 });
  for (const [x, z] of [[-16.9, -26.4], [-11.4, -26.4]]) k.span('darkMetal', x - 0.08, 0.15, z - 0.08, x + 0.08, LY, z + 0.08, { tint: 0x4a4e52 });
  railing(k, [-17, LY, -26.35], [-12.4, LY, -26.35]);
  railing(k, [-17, LY, -30.7], [-17, LY, -26.35]);
  ladder(k, -11.8, 0.15, -26.1, 0, LY - 0.1);
  wallX(k, 'corrugated', -16.4, -12.4, -28.2, LY, LY + 2.3, 0.1, [[-15, -13.2, LY + 1.0, LY + 1.9]], 0x8a5a44);
  wallZ(k, 'corrugated', -30.7, -28.2, -16.4, LY, LY + 2.3, 0.1, [], 0x8a5a44);
  k.span('corrugated', -16.5, LY + 2.3, -30.7, -12.3, LY + 2.4, -28.1, { tint: 0x7a5040 });
  windowOn(k, '+z', -14.1, LY + 1.45, -28.15, 1.8, 0.9, { lit: 'windowCool', depth: 0.02 });
  solid(-17, -30.7, -11.3, -26.3, LY);

  // bomb site A floor marking, the thick column, racks and cover inside
  decal(k, 'siteA', [-20, 0.16, -20], 4.4, 4.4, 'up', { yaw: Math.PI / 2 });
  for (const [a, b, c, d] of [[-23.5, -23.6, -16.5, -23.5], [-23.5, -16.5, -16.5, -16.4], [-23.6, -23.5, -23.5, -16.5], [-16.5, -23.5, -16.4, -16.5]]) {
    k.span('paint', a, 0.15, b, c, 0.165, d, { tint: 0xe4e4dc });
  }
  k.span('concrete', -24.3, 0.15, -22.8, -23.1, H - 0.9, -21.6, { tint: 0xa8a8a2 });
  k.span('concrete', -24.5, H - 1.3, -23.0, -22.9, H - 0.9, -21.4, { tint: 0x9a9a94 });
  for (const face of ['+x', '+z']) graffiti(k, face, face === '+x' ? -23.1 : -23.7, 1.4, face === '+x' ? -22.2 : -21.6, 0.9, 'bullets');
  rack(k, -21.2, 0.15, -30.1, 0, 7.5);
  rack(k, -26.3, 0.15, -18.2, Math.PI / 2, 5.4);
  rack(k, -21, 0.15, -26.2, 0, 5.4, 4);
  crateStack(k, -18, 0.15, -18.5, 0.25, [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 0, 1]]);
  crateStack(k, -21.6, 0.15, -16.2, -0.1, [[0, 0, 0], [0, 1, 0]]);
  sandbags(k, -15.5, 0.15, -21.5, Math.PI / 2 + 0.1, 3.2, 3);
  sandbags(k, -22.4, 0.15, -14.2, 0.05, 2.4, 2);
  barrelQuad(k, -13.2, 0.15, -23.6, 0.2);
  palletJack(k, -16.2, 0.15, -24.5, 2.4);
  sortingTable(k, -25, 0.15, -14.4, 0);
  cardboardPile(k, -29.3, 0.15, -14.6, 0.2, 6);
  cardboardPile(k, -12.4, 0.15, -30, 0, 5);
  newspaperScatter(k, -19, 0.15, -19.5, 5, 3);
  straps(k, -24, 0.16, -16.5, 5);

  // cold-white emergency lamps hung from the trusses
  for (const [x, z, lit] of [[-21, -22, true], [-13, -20, true], [-25, -27.5, false]]) {
    k.box('darkMetal', [x, H - 1.25, z], [1.3, 0.12, 0.28], { tint: 0x3a3e42 });
    k.box('lampCool', [x, H - 1.29, z], [1.2, 0.05, 0.2]);
    wire(k, [x - 0.5, H - 0.8, z], [x - 0.5, H - 1.15, z], 0.0, 0.01);
    wire(k, [x + 0.5, H - 0.8, z], [x + 0.5, H - 1.15, z], 0.0, 0.01);
    if (lit) addLight({ pos: [x, H - 1.5, z], color: 0xcfe0ff, intensity: 22, distance: 18, decay: 1.4, glow: 1.6, glowOpacity: 0.55, lamp: 'lampCool', mode: 'hum', phase: x, shadow: true });
  }
}
