import { range } from '../core/rng.js';
import { decal } from '../props/basic.js';

// The square concrete plinth, the wet asphalt deck on it, curbs, sidewalks and drainage.
export const HALF = 32;

export function buildBase(k) {
  // plinth: a thick slab with a darker chamfered skirt, so it reads as a collectible base
  k.span('concrete', -HALF, -2.6, -HALF, HALF, 0, HALF, { tint: 0x9a9c9e, uv: 6 });
  k.span('concrete', -HALF - 0.5, -3.2, -HALF - 0.5, HALF + 0.5, -2.6, HALF + 0.5, { tint: 0x55585c, uv: 6 });
  k.span('concrete', -HALF + 0.3, -3.3, -HALF + 0.3, HALF - 0.3, -3.2, HALF - 0.3, { tint: 0x3a3c40 });
  k.span('asphalt', -HALF + 0.6, 0, -HALF + 0.6, HALF - 0.6, 0.02, HALF - 0.6);
  // rim curb around the whole deck
  const t = 0.6;
  const cT = 0xc2c2bc;
  k.span('concrete', -HALF, 0, -HALF, HALF, 0.18, -HALF + t, { tint: cT });
  k.span('concrete', -HALF, 0, HALF - t, HALF, 0.18, HALF, { tint: cT });
  k.span('concrete', -HALF, 0, -HALF, -HALF + t, 0.18, HALF, { tint: cT });
  k.span('concrete', HALF - t, 0, -HALF, HALF, 0.18, HALF, { tint: cT });

  // sidewalks along the city blocks
  const walk = (x0, z0, x1, z1) => {
    k.span('concreteFloor', x0, 0, z0, x1, 0.12, z1, { tint: 0xb4b4ae });
  };
  walk(-24.2, -10.2, -8, -9); // west block north
  walk(-24.2, 15, -8, 16.2); // west block south
  walk(-9, -9, -8, 15); // west block, mid side
  walk(8, -5.2, 18, -4); // east block north
  walk(8, 14, 17, 15.2); // east block south
  walk(8, -4, 9, 14); // east block, mid side

  // painted lane lines in the CT street
  for (let x = -20; x < 14; x += 3.2) k.span('paint', x, 0.02, 17.35, x + 1.6, 0.03, 17.55, { tint: 0xd8cf9a });
  // parking bays by the police van
  for (let x = -20.5; x < -10; x += 3) k.span('paint', x, 0.02, 21.4, x + 0.12, 0.03, 25.4, { tint: 0xdedede });

  // manholes tracing the sewer run from the T ramp to the CT flank exit
  for (const [x, z] of [[-6, -9], [-7.5, -1], [-7.8, 7], [-10, 14]]) {
    k.cyl('darkMetal', [x, 0.02, z], 0.55, 0.03, { seg: 18, tint: 0x55504a });
    k.cyl('darkMetal', [x, 0.02, z], 0.6, 0.015, { seg: 18, tint: 0x2a2a2a });
  }
  // storm drains at kerbs
  for (const [x, z, r] of [[-10, -10.5, 0], [10, -6, 0], [-4, 16.4, 0], [16, 16.4, 0], [-26, 3, Math.PI / 2]]) {
    k.box('grate', [x, 0.03, z], [0.9, 0.02, 0.45], { rot: [0, r, 0] });
    k.box('hole', [x, 0.021, z], [0.85, 0.005, 0.4], { rot: [0, r, 0] });
  }
  // route arrows sprayed on the asphalt
  decal(k, 'arrowA', [-6, 0.03, -13], 2.2, 2.2, 'up', { yaw: Math.PI });
  decal(k, 'arrowB', [15, 0.03, -12], 2.2, 2.2, 'up', { yaw: 0 });
  decal(k, 'arrowB', [19.5, 0.03, 12], 2.0, 2.0, 'up', { yaw: Math.PI / 2 });
  decal(k, 'arrowA', [-27, 0.03, 8], 2.0, 2.0, 'up', { yaw: Math.PI / 2 });
  decal(k, 'newspaper', [range(-3, 3), 0.03, 6], 0.6, 0.6, 'up', { yaw: 1 });
}
