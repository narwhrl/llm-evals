import * as THREE from 'three';
import { P } from '../palette.js';
import { make, slab, PLANE, CIRCLE, toon, pavementTexture, asphaltTexture } from '../kit.js';

// The square collectible base the whole corner is built on.
// Top face sits at y = 0; the plinth drops to y = -1.2.
export const BASE_HALF = 11;
export const PLINTH_BOTTOM = -1.2;

// Road and sidewalk footprints, shared with street.js and store.js.
export const ROAD_A = { z0: 3, z1: 10 };
export const ROAD_B = { x0: 6, x1: 11 };
export const WALK = { x0: -11, x1: 6, z0: -11, z1: 3 };

export function buildBase(scene) {
  const group = new THREE.Group();
  group.name = 'base';

  const pavement = pavementTexture();
  pavement.repeat.set(9, 7);
  const asphalt = asphaltTexture();
  asphalt.repeat.set(7, 4);

  // Plinth: a chamfered dark block with a lighter top rim, so the base reads
  // as a physical model rather than an infinite floor.
  group.add(slab(-BASE_HALF, BASE_HALF, PLINTH_BOTTOM, -0.12, -BASE_HALF, BASE_HALF, toon(P.plinth)));
  group.add(slab(-BASE_HALF, BASE_HALF, -0.12, 0, -BASE_HALF, BASE_HALF, toon(P.plinthTop), { receive: true }));
  // Thin dark reveal around the rim.
  group.add(slab(-BASE_HALF - 0.16, BASE_HALF + 0.16, -0.3, -0.12, -BASE_HALF - 0.16, BASE_HALF + 0.16, toon(P.plinthEdge)));

  // Sidewalk slab (the L-shaped block) and the two road strips.
  const walkMat = toon(0xffffff, {});
  walkMat.map = pavement;
  group.add(slab(WALK.x0, WALK.x1, 0, 0.1, WALK.z0, WALK.z1, walkMat, { receive: true, outline: false }));

  const roadMat = toon(0xffffff, {});
  roadMat.map = asphalt;
  group.add(slab(-BASE_HALF, BASE_HALF, 0, 0.04, ROAD_A.z0, ROAD_A.z1, roadMat, { receive: true, outline: false }));
  group.add(slab(ROAD_B.x0, ROAD_B.x1, 0, 0.04, -BASE_HALF, ROAD_A.z0, roadMat, { receive: true, outline: false }));

  // Wet sheen: a low-opacity cool wash over the tarmac. It is what makes the
  // road read as soaked rather than merely dark, and it is the surface the
  // coloured reflection smears in props.js and street.js sit on.
  const sheen = new THREE.MeshBasicMaterial({
    color: 0x5f79ad,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  group.add(make(PLANE(BASE_HALF * 2, ROAD_A.z1 - ROAD_A.z0), sheen, {
    pos: [0, 0.045, (ROAD_A.z0 + ROAD_A.z1) / 2],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  }));
  group.add(make(PLANE(ROAD_B.x1 - ROAD_B.x0, BASE_HALF + ROAD_A.z0), sheen, {
    pos: [(ROAD_B.x0 + ROAD_B.x1) / 2, 0.045, (ROAD_A.z0 - BASE_HALF) / 2],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  }));

  // Curb along the corner, mitred at the return.
  group.add(slab(WALK.x0, ROAD_B.x0, 0, 0.16, ROAD_A.z0 - 0.3, ROAD_A.z0, toon(P.curb), { receive: true }));
  group.add(slab(ROAD_B.x0 - 0.3, ROAD_B.x0, 0, 0.16, -BASE_HALF, ROAD_A.z0 - 0.3, toon(P.curb), { receive: true }));
  group.add(slab(ROAD_B.x0 - 0.3, ROAD_B.x0, 0, 0.16, ROAD_A.z0 - 0.3, ROAD_A.z0, toon(P.curb), { receive: true }));

  // Gutter channels: a dark recessed strip just inside each curb.
  group.add(slab(WALK.x0, ROAD_B.x0, 0, 0.055, ROAD_A.z0 - 0.62, ROAD_A.z0 - 0.3, toon(P.gutter), { outline: false }));
  group.add(slab(ROAD_B.x0 - 0.62, ROAD_B.x0 - 0.3, 0, 0.055, -BASE_HALF, ROAD_A.z0 - 0.62, toon(P.gutter), { outline: false }));

  // Drain grates sitting in the gutter run.
  for (let i = 0; i < 6; i += 1) {
    const x = -9.4 + i * 2.9;
    if (x > 4.2) continue;
    group.add(slab(x, x + 0.9, 0.05, 0.075, ROAD_A.z0 - 0.58, ROAD_A.z0 - 0.34, toon(0x39404f), { outline: false }));
  }
  for (let i = 0; i < 4; i += 1) {
    const z = -8.5 + i * 3.0;
    group.add(slab(ROAD_B.x0 - 0.58, ROAD_B.x0 - 0.34, 0.05, 0.075, z, z + 0.9, toon(0x39404f), { outline: false }));
  }

  // Manhole covers.
  for (const [x, z] of [[-2.2, 6.6], [8.4, -3.2], [4.4, 8.4]]) {
    group.add(make(CIRCLE(0.42, 20), toon(0x323a4c), {
      pos: [x, 0.045, z],
      rot: [-Math.PI / 2, 0, 0],
      outline: false,
    }));
    group.add(make(CIRCLE(0.3, 20), toon(0x272e3d), { pos: [x, 0.05, z], rot: [-Math.PI / 2, 0, 0], outline: false }));
  }

  // A few raised planting beds break up the long sidewalk run.
  const planterMat = toon(P.curb);
  const soilMat = toon(0x2f3a33);
  for (const [x, z] of [[-9.4, 1.1], [-3.2, 1.4], [4.2, -3.0]]) {
    group.add(slab(x - 0.85, x + 0.85, 0.1, 0.42, z - 0.55, z + 0.55, planterMat, { receive: true }));
    group.add(slab(x - 0.72, x + 0.72, 0.42, 0.5, z - 0.42, z + 0.42, soilMat, { outline: false }));
    for (let i = 0; i < 5; i += 1) {
      const bx = x - 0.6 + (i % 3) * 0.58;
      const bz = z - 0.24 + Math.floor(i / 3) * 0.46;
      group.add(make(new THREE.IcosahedronGeometry(0.3, 0), toon(i % 2 ? P.shrub : P.shrubLight), {
        pos: [bx, 0.62, bz],
        scale: [1, 0.72, 1],
        outline: false,
      }));
    }
  }

  scene.add(group);
  return group;
}
