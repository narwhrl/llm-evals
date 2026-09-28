import { solid, dripLine } from '../fx/registry.js';
import { addLight } from '../fx/lights.js';
import { decal, crateStack, barrelQuad, barrel, jersey, tireStack, cardboardPile, concreteBlock, plasticBarrier } from '../props/basic.js';
import { stairs, railing } from '../props/structures.js';
import { console_, roadSign } from '../props/furniture.js';
import { wallX, wallZ, windowOn, graffiti, wetWall } from './common.js';

// Mid: the central duel lane, cut across by a concrete wall with a half-open double iron door.
const WZ = 2; // door wall centre line
const WH = 4.6;

function booth(k, cx, cz, side) {
  // side = -1 west booth (mid window faces +x), +1 east booth (faces -x)
  const x0 = cx - 1.2;
  const x1 = cx + 1.2;
  const z0 = cz - 1.2;
  const z1 = cz + 1.2;
  const midX = side < 0 ? x1 : x0;
  const farX = side < 0 ? x0 : x1;
  const tint = 0xa8aca8;
  k.span('concreteFloor', x0, 0, z0, x1, 0.12, z1, { tint: 0x8e908c });
  wallZ(k, 'concrete', z0, z1, midX, 0, 2.6, 0.18, [[cz - 0.85, cz + 0.85, 1.0, 1.95]], tint);
  wallZ(k, 'concrete', z0, z1, farX, 0, 2.6, 0.18, [], tint);
  const doorX = side < 0 ? [x0 + 0.3, x0 + 1.1] : [x1 - 1.1, x1 - 0.3];
  const winX = side < 0 ? [x1 - 1.0, x1 - 0.2] : [x0 + 0.2, x0 + 1.0];
  wallX(k, 'concrete', x0, x1, z0, 0, 2.6, 0.18, [[doorX[0], doorX[1], 0, 2.1], [winX[0], winX[1], 1.0, 1.9]], tint);
  wallX(k, 'concrete', x0, x1, z1, 0, 2.6, 0.18, [], tint);
  k.span('concrete', x0 - 0.15, 2.6, z0 - 0.15, x1 + 0.15, 2.82, z1 + 0.15, { tint: 0x98a09c });
  solid(x0 - 0.15, z0 - 0.15, x1 + 0.15, z1 + 0.15, 2.82);
  dripLine([x0 - 0.15, 2.6, z0 - 0.15], [x1 + 0.15, 2.6, z0 - 0.15], 3);
  windowOn(k, side < 0 ? '+x' : '-x', midX, 1.475, cz, 1.7, 0.95, { depth: 0 });
  windowOn(k, '-z', (winX[0] + winX[1]) / 2, 1.45, z0, 0.8, 0.9, { depth: 0 });
  // console backed onto the mid window, operator seat on the room side
  console_(k, midX + side * 0.45, 0.12, cz, side < 0 ? -Math.PI / 2 : Math.PI / 2);
  graffiti(k, '-z', cx + side * 0.6, 0.9, z0 - 0.1, 0.9, 'bullets');
}

// Grated rectangular drain: the reflector shows through the bars as standing water.
function drain(k, x0, z0, x1, z1) {
  k.span('plain', x0, 0.02, z0, x1, 0.022, z1, { tint: 0x0c1014 });
  for (const [a, b, c, d] of [[x0 - 0.15, z0 - 0.15, x1 + 0.15, z0], [x0 - 0.15, z1, x1 + 0.15, z1 + 0.15], [x0 - 0.15, z0, x0, z1], [x1, z0, x1 + 0.15, z1]]) {
    k.span('concrete', a, 0, b, c, 0.07, d, { tint: 0x8a8a84 });
  }
  k.span('grate', x0, 0.055, z0, x1, 0.065, z1, { uv: 1.2 });
}

export function buildMid(k) {
  // the door wall: concrete, a double iron door, and a high firing slit on each side
  const door = [-1.8, 1.8, 0, 3.2];
  const slitW = [-6.1, -5.1, 3.35, 3.95];
  const slitE = [5.1, 6.1, 3.35, 3.95];
  wallX(k, 'concrete', -9, 9, WZ, 0, WH, 0.6, [door, slitW, slitE], 0xb6b6b0);
  k.span('darkMetal', -2.0, 3.2, WZ - 0.4, 2.0, 3.45, WZ + 0.4, { tint: 0x4a4038 });
  // left leaf swung toward CT, right leaf almost shut: the classic mid gap
  k.push([-1.8, 0.02, WZ], -0.75);
  k.box('metal', [0.9, 0, 0], [1.78, 3.15, 0.12], { tint: 0x6a5446 });
  for (const y of [0.4, 1.55, 2.7]) k.box('darkMetal', [0.9, y, 0], [1.7, 0.1, 0.16], { tint: 0x3a3632 });
  k.pop();
  k.push([1.8, 0.02, WZ], 0.18);
  k.box('metal', [-0.9, 0, 0], [1.78, 3.15, 0.12], { tint: 0x6a5446 });
  for (const y of [0.4, 1.55, 2.7]) k.box('darkMetal', [-0.9, y, 0], [1.7, 0.1, 0.16], { tint: 0x3a3632 });
  k.pop();
  for (const face of ['-z', '+z']) {
    const z = face === '-z' ? WZ - 0.32 : WZ + 0.32;
    graffiti(k, face, -3.2, 1.6, z, 1.5, 'bullets');
    graffiti(k, face, 3.1, 1.2, z, 1.3, 'bullets');
    wetWall(k, face, 0, 0, z, 18, WH);
  }
  graffiti(k, '-z', -7, 2.0, WZ - 0.32, 2.2, 'tSpray');
  graffiti(k, '+z', 7, 2.0, WZ + 0.32, 2.0, 'ctEmblem');
  graffiti(k, '-z', 6.6, 1.3, WZ - 0.32, 1.8, 'tagGG');
  dripLine([-9, WH, WZ - 0.32], [9, WH, WZ - 0.32], 10);
  solid(-9, WZ - 0.3, 9, WZ + 0.3, WH);
  // caged mercury lamp over the door, T side
  k.box('darkMetal', [0, 3.6, WZ - 0.45], [0.5, 0.3, 0.3], { tint: 0x3a3a38 });
  k.box('lampCool', [0, 3.52, WZ - 0.55], [0.34, 0.14, 0.12]);
  addLight({ pos: [0, 3.4, WZ - 0.9], color: 0xd4f0e4, intensity: 9, distance: 12, glow: 1.4, glowOpacity: 0.6, mode: 'flicker', phase: 4.2 });

  // steel firing platforms behind each slit (CT side), stairs down to the lane
  for (const s of [-1, 1]) {
    const xa = s < 0 ? -8.7 : 4.2;
    const xb = s < 0 ? -4.2 : 8.7;
    k.span('darkMetal', xa, 2.25, WZ + 0.3, xb, 2.4, WZ + 2.3, { tint: 0x5a5e62 });
    for (const x of [xa + 0.1, xb - 0.1]) k.span('darkMetal', x - 0.07, 0, WZ + 2.15, x + 0.07, 2.25, WZ + 2.29, { tint: 0x4a4e52 });
    solid(xa, WZ + 0.3, xb, WZ + 2.3, 2.4);
    const sx = s < 0 ? -7.9 : 7.9;
    railing(k, [s < 0 ? -7.2 : 7.2, 2.4, WZ + 2.3], [s < 0 ? -4.2 : 4.2, 2.4, WZ + 2.3]);
    railing(k, [s < 0 ? -4.2 : 4.2, 2.4, WZ + 0.3], [s < 0 ? -4.2 : 4.2, 2.4, WZ + 2.3]);
    stairs(k, sx, 0, WZ + 2.3 + 3.3, Math.PI, 1.2, 2.4, { steel: true });
    crateStack(k, s * 5.6, 2.4, WZ + 1.6, 0, [[0, 0, 0]], 0.9);
  }

  // guard booths on the T side with dusty rain-streaked glass
  booth(k, -6.8, 0.2, -1);
  booth(k, 6.8, 0.2, 1);

  drain(k, -0.6, -7.5, 0.6, 0.6);
  drain(k, -0.6, 3.6, 0.6, 11.5);

  // low cover wall near the CT end, crates and a discarded road sign behind it
  k.span('concrete', -6.2, 0, 12.3, -1.2, 1.1, 12.7, { tint: 0xb0b0aa });
  k.span('concrete', -6.3, 1.1, 12.2, -1.1, 1.2, 12.8, { tint: 0x9e9e98 });
  graffiti(k, '-z', -3.6, 0.6, 12.2, 0.9, 'bullets');
  solid(-6.2, 12.3, -1.2, 12.7, 1.1);
  crateStack(k, -4.9, 0, 13.5, 0.1, [[0, 0, 0], [1, 0, 0], [0, 1, 0]]);
  roadSign(k, -2.2, 0, 13.4, 0.4);
  concreteBlock(k, 3.2, 0, 12.8, 0.2);
  concreteBlock(k, 4.0, 0, 13.3, -0.3);

  // T-side lane and plaza cover
  barrelQuad(k, 3.6, 0, -4.5, 0.3);
  barrel(k, -3.2, 0, -2.4);
  jersey(k, -3.6, 0, -6.6, 0.15);
  tireStack(k, 4.8, 0, -1.3, 3);
  cardboardPile(k, -4.8, 0, -1.2, 0.2, 5);
  crateStack(k, 5.8, 0, -14.8, 0.2, [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  // A approach between the ramp's west wall and the warehouse door
  plasticBarrier(k, -8.6, 0, -15.4, 0.4);
  plasticBarrier(k, -7.5, 0, -12.2, 0.1);
}
