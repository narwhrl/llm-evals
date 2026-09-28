import { range } from '../core/rng.js';
import { solid, dripLine } from '../fx/registry.js';
import { addLight } from '../fx/lights.js';
import { decal, barrelQuad, pallet, crateStack, hedgehog, plasticBarrier, riotShield, sandbags, trashBin, tireStack, jersey } from '../props/basic.js';
import { ladder, stairs, container, fence, streetLamp, railing } from '../props/structures.js';
import { boxTruck, policeVan } from '../props/vehicles.js';
import { armorCrate } from '../props/furniture.js';
import { wallX, wallZ, prism, wedge, graffiti, wetWall } from './common.js';

export const T_Y = 2.0;

// T spawn: raised loading dock at the north edge, closed in by razor wire and containers.
export function buildTSpawn(k) {
  const Y = T_Y;
  k.span('concrete', -8, 0, -31, 12, Y - 0.2, -19, { tint: 0xa8a8a2 });
  k.span('concreteFloor', -8, Y - 0.2, -31, 12, Y, -19, { tint: 0xb0b0aa });
  k.span('darkMetal', -8, Y - 0.12, -19.12, 12, Y - 0.02, -18.98, { tint: 0x6a6a60 });
  solid(-8, -31, 12, -19, Y);
  graffiti(k, '+z', 8.5, 1.0, -19, 1.6, 'tSpray');
  graffiti(k, '+z', -7, 1.0, -19, 1.3, 'bullets');
  wetWall(k, '+z', 7.5, 0, -19, 9, Y);

  // sewer mouth under the ramp's east side: low culvert with a half-open grate
  k.span('concrete', 2.6, 0, -19, 3.0, 1.55, -18.55, { tint: 0x8c8c86 });
  k.span('concrete', 5.0, 0, -19, 5.4, 1.55, -18.55, { tint: 0x8c8c86 });
  k.span('concrete', 2.6, 1.25, -19, 5.4, 1.65, -18.55, { tint: 0x8c8c86 });
  k.box('hole', [4.0, 0.02, -18.98], [2.0, 1.23, 0.02]);
  k.box('grate', [3.3, 0.02, -18.1], [1.4, 1.2, 0.04], { rot: [0, -0.9, 0] });
  decal(k, 'hazard', [4.0, 1.45, -18.53], 2.4, 0.9, '+z');

  // ramp to mid / A, with retaining walls; the east wall has a broken crouch hole
  wedge(k, 'concreteFloor', -2, 0, -11, Math.PI, 8, 8, Y, { tint: 0xa4a49e });
  // anti-slip steel strips following the slope (surface height = (−11 − z) / 8 · Y)
  for (let i = 0; i < 7; i++) {
    const h = ((1.2 + i) / 8) * Y;
    k.span('darkMetal', -5.8, h - 0.03, -12.2 - i, 1.8, h + 0.03, -12.05 - i, { tint: 0x55524c });
  }
  for (let i = 0; i < 8; i++) solid(-6, -19 + i, 2, -18 + i, Y * (1 - (i + 0.5) / 8));
  prism(k, 'concrete', -6.2, 0, -11, Math.PI, 0.4, [[0, 0], [8, 0], [8, Y + 1.1], [0, 1.1]], { tint: 0xb4b4ae });
  wallZ(k, 'concrete', -19, -11, 2.2, 0, 3.1, 0.4, [[-15.6, -14.4, 1.1, 1.8]], 0xb4b4ae);
  for (const [z, y] of [[-15.7, 1.05], [-14.3, 1.85], [-15.2, 1.85]]) k.box('concrete', [2.2, y - 0.1, z], [0.44, 0.2, 0.3], { rot: [0.3, 0.4, 0.2], tint: 0x9a9a94 });
  for (const z of [-15.3, -14.9]) k.rod('metal', [2.2, 1.1, z], [2.35, 1.5, z + 0.1], 0.015, { tint: 0x7a4a2a });
  graffiti(k, '+x', 2.4, 2.2, -12.5, 1.4, 'arrowA');
  graffiti(k, '-x', -6.4, 0.85, -13.5, 1.0, 'tagDust');
  wetWall(k, '+x', 2.4, 0, -15, 8, 3.1);
  // parapet along the dock edge east of the ramp
  wallX(k, 'concrete', 2.0, 12, -19.1, Y, Y + 1.0, 0.3, [[6.5, 7.3, Y + 0.45, Y + 0.7]], 0xb8b8b2);

  // truck on the left, ladder leaning on its box
  boxTruck(k, -4.4, Y, -24.8, -Math.PI / 2);
  // three-high container stack on the right; the 1.2 m slot between the lower pair is a one-man path
  container(k, 7.6, Y, -27.0, 0, 0xa8402c);
  container(k, 7.6, Y, -23.36, 0, 0x2f5f8a);
  container(k, 7.6, Y + 2.59, -25.2, 0, 0x3f6a3e);
  container(k, 6.9, Y + 5.18, -25.9, 0.03, 0xc2862a, { doors: false });
  solid(4.57, -28.22, 10.63, -22.14, Y + 2.59);
  solid(4.57, -26.42, 10.63, -23.98, Y + 5.18);
  solid(3.87, -27.12, 9.93, -24.68, Y + 7.77);
  // low perch (lower pair) -> middle -> high perch
  ladder(k, 10.0, Y, -21.98, 0, 2.62);
  ladder(k, 5.2, Y + 2.59, -23.82, 0, 2.62);
  ladder(k, 9.4, Y + 5.18, -24.52, 0, 2.62);
  dripLine([4.6, Y + 2.62, -22.1], [10.6, Y + 2.62, -22.1], 6);
  dripLine([3.9, Y + 7.8, -24.7], [9.9, Y + 7.8, -24.7], 6);
  dripLine([4.6, Y + 5.2, -24.0], [10.6, Y + 5.2, -24.0], 4);

  // drums and pallets beside the ramp head
  barrelQuad(k, 3.6, Y, -20.3, 0.1);
  for (let i = 0; i < 4; i++) pallet(k, -7.1, Y + i * 0.14, -20.0, range(-0.1, 0.1));
  crateStack(k, -1.6, Y, -29.8, 0, [[0, 0, 0], [1, 0, 0], [0, 1, 0]]);
  tireStack(k, 1.2, Y, -29.6, 3);

  fence(k, [-7.8, Y, -30.8], [11.8, Y, -30.8]);
  fence(k, [-7.8, Y, -30.8], [-7.8, Y, -19.4]);
  fence(k, [11.8, Y, -30.8], [11.8, Y, -28.5]);
  fence(k, [11.8, Y, -21.9], [11.8, Y, -19.4]);
  // steps down into the B back yard, lined up with the container slot
  stairs(k, 14.9, 0, -25.2, -Math.PI / 2, 1.6, Y);
  // sodium floodlight over the dock
  const head = streetLamp(k, 1.0, Y, -30.2, -Math.PI / 2, 5.2);
  addLight({ pos: head, color: 0xffa048, intensity: 30, distance: 22, kind: 'spot', target: [1, Y, -22], angle: 0.95, penumbra: 0.6, glow: 2.4, lamp: 'lampWarm', mode: 'flicker', phase: 2.1 });
  // dead-end gap behind the dock
  trashBin(k, -9.6, 0, -26, Math.PI / 2, 0x48683a);
  barrelQuad(k, -9.5, 0, -22, 0.4);
}

// CT spawn: police cordon at the south edge; the platform and searchlight live in routes.js.
export function buildCTSpawn(k) {
  k.span('concreteFloor', -30.8, 0, 19, 17, 0.1, 30.4, { tint: 0xa9aba8 });
  wallX(k, 'concrete', -30.8, 17, 30.6, 0, 3.2, 0.5, [], 0xc0c0ba);
  decal(k, 'ctEmblem', [-4, 1.9, 30.33], 2.3, 2.3, '-z');
  decal(k, 'policeLine', [-11, 1.3, 30.33], 3.6, 1.6, '-z');
  decal(k, 'policeLine', [4, 1.3, 30.33], 3.6, 1.6, '-z');
  decal(k, 'bullets', [9, 2.1, 30.33], 1.4, 1.4, '-z');
  decal(k, 'policeLine', [-10, 1.4, 30.87], 4.2, 1.8, '+z');
  decal(k, 'ctEmblem', [0, 1.8, 30.87], 2.0, 2.0, '+z');
  decal(k, 'policeLine', [10, 1.4, 30.87], 4.2, 1.8, '+z');
  wetWall(k, '-z', -6, 0, 30.35, 22, 3.2);
  for (const x of [-7.2, -5.8, 1.5, 3.0]) armorCrate(k, x, 0.1, 29.7, Math.PI);

  policeVan(k, -17, 0.1, 25.6, 0.22);
  // cordon: steel cheval-de-frise, water barriers and a shield wall with sandbags
  hedgehog(k, -7.5, 0.1, 20.2, 0.05, 3.2);
  hedgehog(k, 6.5, 0.1, 20.4, -0.08, 3.2);
  hedgehog(k, 12.5, 0.1, 20.8, 0.3, 2.6);
  for (const [x, r] of [[-12, 0.1], [-10.7, 0.02], [9.8, -0.1]]) plasticBarrier(k, x, 0.1, 20.4, Math.PI / 2 + r);
  for (let i = 0; i < 6; i++) riotShield(k, -2.2 + i * 0.66, 0.1, 19.6 + Math.abs(i - 2.5) * 0.12, Math.PI + (i - 2.5) * 0.06);
  sandbags(k, 0, 0.1, 20.5, 0, 4.2, 3);
  jersey(k, -20.5, 0.1, 20.4, Math.PI / 2);

  // sewer exit on the western flank of the spawn
  const sx = -26.5;
  const sz = 22.5;
  for (const [x0, z0, x1, z1] of [[-0.95, -0.95, 0.95, -0.75], [-0.95, 0.75, 0.95, 0.95], [-0.95, -0.75, -0.75, 0.75], [0.75, -0.75, 0.95, 0.75]]) {
    k.span('concrete', sx + x0, 0.1, sz + z0, sx + x1, 0.45, sz + z1, { tint: 0x9c9c96 });
  }
  k.box('hole', [sx, 0.44, sz], [1.5, 0.01, 1.5]);
  for (const dx of [-0.25, 0.25]) k.rod('darkMetal', [sx + dx, 0.2, sz - 0.7], [sx + dx, 1.4, sz - 0.78], 0.025);
  k.rod('darkMetal', [sx - 0.25, 1.4, sz - 0.78], [sx + 0.25, 1.4, sz - 0.78], 0.025);
  k.box('grate', [sx + 1.45, 0.1, sz + 0.2], [1.5, 0.05, 1.5], { rot: [0, 0.35, 1.15] });
  railing(k, [sx - 0.95, 0.45, sz + 0.95], [sx + 0.95, 0.45, sz + 0.95], 0.8);
  decal(k, 'hazard', [sx, 0.3, sz + 0.96], 1.9, 0.6, '+z');
}
