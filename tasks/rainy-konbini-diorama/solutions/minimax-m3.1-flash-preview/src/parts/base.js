import * as THREE from 'three';
import { P } from '../palette.js';
import { make, slab, PLANE, CIRCLE, toon, textured, pavementTexture, asphaltTexture, tactileTexture, grimeTexture, groundShadow } from '../kit.js';

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

  // Kerb joints. Real kerbstones are laid in ~2 m lengths, and the joints are
  // what stop the edge reading as one extruded rail.
  const kerbJoint = toon(0x0b0f18, { opacity: 0.4 });
  for (let x = WALK.x0 + 2; x < ROAD_B.x0 - 0.4; x += 2) {
    group.add(slab(x - 0.022, x + 0.022, 0, 0.165, ROAD_A.z0 - 0.3, ROAD_A.z0, kerbJoint, { outline: false }));
  }
  for (let z = -BASE_HALF + 2; z < ROAD_A.z0 - 0.4; z += 2) {
    group.add(slab(ROAD_B.x0 - 0.3, ROAD_B.x0, 0, 0.165, z - 0.022, z + 0.022, kerbJoint, { outline: false }));
  }

  // Tactile paving. Every Japanese sidewalk carries this guidance strip, and it
  // is the strongest single cue that the block is a real street.
  const tactileRun = tactileTexture();
  tactileRun.repeat.set(17, 1);
  const tactileMat = toon(0xffffff);
  tactileMat.map = tactileRun;
  group.add(slab(-10.6, 5.4, 0.1, 0.115, 2.16, 2.56, tactileMat, { receive: true, outline: false }));
  const tactileTurn = tactileTexture();
  tactileTurn.repeat.set(1, 8);
  const tactileTurnMat = toon(0xffffff);
  tactileTurnMat.map = tactileTurn;
  group.add(slab(4.98, 5.38, 0.1, 0.115, -1.2, 2.56, tactileTurnMat, { receive: true, outline: false }));
  const tactileFar = tactileTexture();
  tactileFar.repeat.set(4, 1);
  const tactileFarMat = toon(0xffffff);
  tactileFarMat.map = tactileFar;
  group.add(slab(5.42, 5.82, 0.1, 0.115, -1.62, 0.42, tactileFarMat, { receive: true, outline: false }));

  // ---- road wear ----------------------------------------------------------
  // Polished tyre tracks, repair patches and oil weeping at the kerb. Without
  // tonal variation the tarmac is one flat sheet and every reflection on it
  // reads as a decal rather than as water over a real surface.
  const grime = (x, z, w, d, opacity, seed) => make(PLANE(w, d), textured(grimeTexture(seed), { opacity }), {
    pos: [x, 0.047, z],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  });
  for (const [x, z, w, d, o, s] of [
    [0, 4.5, 21, 1.6, 0.2, 1],
    [0, 8.1, 21, 1.6, 0.17, 2],
    [8.5, -2.5, 1.6, 15, 0.2, 3],
    [8.5, -8.4, 1.6, 8, 0.16, 4],
  ]) {
    group.add(grime(x, z, w, d, o, s));
  }
  for (const [x, z, w, d, s] of [[-6.4, 5.4, 3.6, 2.2, 5], [2.6, 7.6, 2.8, 1.8, 6], [9.2, 1.8, 2.2, 3.0, 7], [-1.6, 9.2, 3.2, 1.5, 8]]) {
    group.add(grime(x, z, w, d, 0.3, s));
  }
  for (const [x, z, r, o] of [[-5.7, 3.9, 0.55, 0.34], [-2.0, 3.75, 0.4, 0.26], [6.7, -0.4, 0.5, 0.28]]) {
    group.add(make(CIRCLE(r, 18), textured(grimeTexture(20 + Math.round(r * 10)), { opacity: o }), {
      pos: [x, 0.048, z],
      rot: [-Math.PI / 2, 0, 0],
      outline: false,
    }));
  }

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
    group.add(groundShadow(x, z, 1.05, 0.78, 0.5, 0.105));
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
