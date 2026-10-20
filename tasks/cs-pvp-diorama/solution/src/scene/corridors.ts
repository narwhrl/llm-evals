/**
 * Mid, the two spawns and the sewer.
 *
 * Mid is the central duel corridor with a half open iron gate and high walls
 * either side. The terrorist spawn is a raised loading yard behind barbed
 * wire, the counter-terrorist spawn is a police cordon around a high
 * platform, and a low sewer runs under mid from one spawn to the other.
 */

import { MAP } from "./layout";
import { PALETTE, shade } from "./palette";
import {
  barrel,

  bulletHoles,
  cone,
  container,
  crate,
  crateStack,
  policeCar,
  fence,
  graffiti,
  ladder,
  oriented,
  pallet,
  palletStack,
  policeVan,
  signPlate,
  streetLamp,
  truck,
} from "./props";
import { pushBox, type Builder } from "./voxel";

/** The central corridor and the iron gate that splits it. */
export function buildMid(b: Builder) {
  const z0 = MAP.mid.z0;
  const z1 = MAP.mid.z1;

  // The high walls either side of the corridor.
  pushBox(b, [MAP.mid.x0 - 0.2, 0, z0], [MAP.mid.x0, 2.7, -1.1], PALETTE.concreteWorn, 0.016);
  pushBox(b, [MAP.mid.x0 - 0.2, 2.7, z0], [MAP.mid.x0, 2.88, -1.1], PALETTE.concrete, 0.012);
  pushBox(b, [MAP.mid.x0 - 0.2, 0, 1.3], [MAP.mid.x0, 2.7, z1], PALETTE.concreteWorn, 0.016);
  pushBox(b, [MAP.mid.x0 - 0.2, 2.7, 1.3], [MAP.mid.x0, 2.88, z1], PALETTE.concrete, 0.012);
  pushBox(b, [MAP.mid.x1, 0, z0], [MAP.mid.x1 + 0.2, 2.7, -1.5], PALETTE.concreteWorn, 0.016);
  pushBox(b, [MAP.mid.x1 + 0.2, 0, 1.1], [MAP.mid.x1, 2.7, 1.95], PALETTE.concreteWorn, 0.016);
  // The firing slits, cut high in the walls.
  pushBox(b, [MAP.mid.x0 - 0.22, 2.2, -2.3], [MAP.mid.x0 + 0.02, 2.6, -1.7], [0.07, 0.07, 0.08], 0);
  pushBox(b, [MAP.mid.x1 - 0.02, 2.2, -2.6], [MAP.mid.x1 + 0.22, 2.6, -2.0], [0.07, 0.07, 0.08], 0);
  pushBox(b, [MAP.mid.x0 - 0.22, 2.1, 1.9], [MAP.mid.x0 + 0.02, 2.5, 2.5], [0.07, 0.07, 0.08], 0);
  bulletHoles(b, MAP.mid.x0 - 0.21, 1.2, -1.9, 8, 1.0, "x", 12);

  // The double iron gate, half open.
  const gateZ = -0.7;
  for (const gx of [MAP.mid.x0 - 0.2, MAP.mid.x1 + 0.2]) {
    pushBox(b, [gx - 0.14, 0, gateZ - 0.16], [gx + 0.14, 2.7, gateZ + 0.16], PALETTE.steelDark, 0.012);
  }
  pushBox(b, [MAP.mid.x0 - 0.2, 2.42, gateZ - 0.1], [MAP.mid.x1 + 0.2, 2.7, gateZ + 0.1], PALETTE.steelDark, 0.012);
  // The closed leaf, spanning the east half of the opening.
  const leaf = (x0: number, x1: number) => {
    pushBox(b, [x0, 0.1, gateZ - 0.07], [x1, 2.38, gateZ + 0.07], PALETTE.iron, 0.012);
    for (let i = 0; i < 7; i++) {
      const bx = x0 + 0.08 + i * ((x1 - x0 - 0.16) / 6);
      pushBox(b, [bx - 0.035, 0.2, gateZ - 0.09], [bx + 0.035, 2.28, gateZ + 0.09], PALETTE.steelDark, 0.006);
    }
    pushBox(b, [x0, 0.1, gateZ - 0.09], [x1, 0.3, gateZ + 0.09], PALETTE.steelDark, 0.008);
    pushBox(b, [x0, 2.18, gateZ - 0.09], [x1, 2.38, gateZ + 0.09], PALETTE.steelDark, 0.008);
  };
  leaf(0.1, MAP.mid.x1 + 0.2);
  // The open leaf, swung back against the west wall.
  leaf(MAP.mid.x0 - 0.18, MAP.mid.x0 + 0.16);

  // The low cover wall on the counter-terrorist side of mid.
  pushBox(b, [-1.9, 0, 1.35], [0.7, 0.95, 1.6], PALETTE.concreteWorn, 0.014);
  pushBox(b, [-1.95, 0.95, 1.3], [0.75, 1.08, 1.65], PALETTE.concrete, 0.01);
  crateStack(b, -1.3, 2.0, 0, 2, 0.68, PALETTE.wood);
  // A discarded road sign leaning on the wall.
  pushBox(b, [0.85, 0, 1.5], [0.95, 1.5, 1.6], PALETTE.steelDark, 0.008);
  pushBox(b, [0.3, 0.1, 1.45], [0.9, 1.35, 1.55], PALETTE.graffitiBlue, 0.008);

  // The guard posts along mid with their dead consoles.
  for (const [px, pz] of [[-1.75, -2.7], [1.75, 0.2]] as Array<[number, number]>) {
    pushBox(b, [px - 0.6, 0, pz - 0.5], [px + 0.6, 2.3, pz + 0.5], PALETTE.concreteDark, 0.014);
    pushBox(b, [px - 0.6, 2.3, pz - 0.5], [px + 0.6, 2.5, pz + 0.5], PALETTE.concrete, 0.012);
    pushBox(b, [px - 0.55, 0.6, pz - 0.55], [px + 0.55, 1.9, pz - 0.48], PALETTE.glassDark, 0.008);
    pushBox(b, [px - 0.45, 0.9, pz - 0.4], [px + 0.45, 1.1, pz - 0.1], PALETTE.steelDark, 0.008);
    pushBox(b, [px - 0.2, 1.1, pz - 0.35], [px + 0.2, 1.3, pz - 0.2], [0.16, 0.17, 0.19], 0.006);
  }
}

/** The sewer that runs under mid. */
export function buildSewer(b: Builder) {
  const s = MAP.sewer;
  // The trench floor and walls.
  pushBox(b, [s.x0 - 0.15, -0.9, s.z0 - 0.2], [s.x1 + 0.15, -0.7, s.z1 + 0.2], PALETTE.concreteDark, 0.012);
  pushBox(b, [s.x0 - 0.15, -0.7, s.z0 - 0.2], [s.x0, 0.02, s.z1 + 0.2], PALETTE.concreteWorn, 0.012);
  pushBox(b, [s.x1, -0.7, s.z0 - 0.2], [s.x1 + 0.15, 0.02, s.z1 + 0.2], PALETTE.concreteWorn, 0.012);
  // A grate over the middle so the trench reads as covered.
  for (let i = 0; i < 9; i++) {
    const z = s.z0 + 0.4 + i * 0.72;
    pushBox(b, [s.x0, 0.0, z - 0.3], [s.x1, 0.05, z + 0.3], PALETTE.grate, 0.006);
  }
  // A damp glow at the far end so the tunnel does not read as a black hole.
  pushBox(b, [s.x0, -0.68, s.z1 - 0.3], [s.x1, -0.66, s.z1 - 0.26], [0.1, 0.13, 0.16], 0);
}

/** The terrorist spawn: a raised loading yard behind barbed wire. */
export function buildTSpawn(b: Builder, neon: Builder) {
  const t = MAP.tSpawn;
  // Barbed wire along the north edge and the two sides.
  fence(b, t.x0, t.z0, t.x1, t.z0, t.y, 2.4, true);
  fence(b, t.x0, t.z0, t.x0, t.z1, t.y, 2.4, true);
  fence(b, t.x1, t.z0, t.x1, t.z1, t.y, 2.4, true);
  fence(b, t.x0, t.z1, -2.4, t.z1, t.y, 2.4, true);
  fence(b, 2.4, t.z1, t.x1, t.z1, t.y, 2.4, true);

  // The broken box truck on the left.
  truck(b, -5.0, -5.5, t.y, 2);
  ladder(b, -3.6, -6.3, t.y, 1.7, 0);

  // The stacked containers on the right: two levels with a gap to walk through.
  container(b, 4.6, -6.0, t.y, 2.3, 2.5, 1.5, PALETTE.containerRed, 0);
  container(b, 4.6, -4.9, t.y, 2.3, 2.5, 1.5, PALETTE.containerBlue, 0);
  container(b, 4.6, -5.45, t.y + 2.5, 2.3, 2.4, 1.3, PALETTE.containerGrey, 0);
  container(b, 2.6, -6.2, t.y, 2.3, 2.5, 1.5, PALETTE.containerGreen, 0);

  // Four drums in a row and pallets beside the ramp.
  for (let i = 0; i < 4; i++) {
    barrel(b, -2.9 + i * 0.62, -4.9, t.y, i % 2 === 0 ? PALETTE.barrel : PALETTE.barrelYellow);
  }
  palletStack(b, 2.5, -4.95, t.y, 3);
  pallet(b, 1.2, -5.6, t.y, 1);

  // The broken hole in the ramp wall, for watching mid.
  pushBox(b, [-2.4, t.y - 0.1, -5.5], [-2.2, t.y + 0.75, -4.9], [0.07, 0.07, 0.08], 0);
  pushBox(b, [-2.45, t.y - 0.15, -5.55], [-2.35, t.y + 0.85, -4.85], PALETTE.concreteWorn, 0.01);

  // A single work light over the spawn.
  pushBox(b, [-1.6, t.y + 3.2, -5.6], [-1.4, t.y + 3.4, -5.2], PALETTE.steelDark, 0.008);
  pushBox(neon, [-1.55, t.y + 3.05, -5.55], [-1.45, t.y + 3.2, -5.25], PALETTE.lampWarm, 0);

  graffiti(b, -6.7, t.y + 1.0, -5.2, 1.2, 0.9, PALETTE.graffitiRed, "x");
}

/** The counter-terrorist spawn: a police cordon around a high platform. */
export function buildCTSpawn(b: Builder, neon: Builder) {
  const c = MAP.ctSpawn;

  // The cordon at the front of the spawn.
  for (let i = 0; i < 4; i++) {
    oriented(b, -3.2 + i * 1.9, 2.85, 1.5, 0.1, 0.42, 0.86, PALETTE.plastic, 0.01, 0);
    for (const s of [-1, 1]) {
      pushBox(b, [-3.2 + i * 1.9 + s * 0.62 - 0.05, 0.1, 2.6], [-3.2 + i * 1.9 + s * 0.62 + 0.05, 0.52, 2.94], PALETTE.steelDark, 0.008);
    }
  }
  // Police shields propped against the barricades.
  for (let i = 0; i < 3; i++) {
    pushBox(b, [-2.4 + i * 1.1, 0.1, 2.98], [-1.9 + i * 1.1, 1.0, 3.06], PALETTE.vanPanel, 0.01);
  }

  // The police van on the left.
  policeVan(b, -4.0, 4.6, 0.1, 0);

  // The concrete platform on the right, with its stair and spotlight.
  const px0 = 3.1;
  const px1 = 5.4;
  const pz0 = 3.6;
  const pz1 = 6.1;
  const py = 1.4;
  pushBox(b, [px0, 0, pz0], [px1, py, pz1], PALETTE.concrete, 0.014);
  pushBox(b, [px0 - 0.08, py, pz0 - 0.08], [px1 + 0.08, py + 0.12, pz1 + 0.08], PALETTE.concrete, 0.01);
  // A work light on a post, so the platform is not a blank slab.
  pushBox(b, [3.24, py + 0.12, 5.86], [3.38, py + 2.5, 6.0], PALETTE.steelDark, 0.01);
  pushBox(b, [3.08, py + 2.5, 5.7], [3.54, py + 2.78, 6.0], PALETTE.steelDark, 0.012);
  pushBox(b, [3.12, py + 2.54, 5.66], [3.5, py + 2.74, 5.72], PALETTE.fluorescent, 0.008);
  pushBox(neon, [3.14, py + 2.5, 5.62], [3.48, py + 2.72, 5.66], PALETTE.lampWarm, 0);
  // The kit on the platform: a generator, a crate of gear and a cable reel.
  pushBox(b, [4.55, py + 0.12, 5.1], [5.05, py + 0.95, 5.72], PALETTE.containerYellow, 0.014);
  pushBox(b, [4.5, py + 0.62, 5.06], [5.1, py + 0.8, 5.76], PALETTE.steelDark, 0.01);
  pushBox(b, [4.62, py + 0.3, 5.02], [4.98, py + 0.6, 5.08], PALETTE.steelDark, 0.008);
  crateStack(b, 3.55, 4.35, py + 0.12, 2, 0.6, PALETTE.woodDark);
  pushBox(b, [4.3, py + 0.12, 3.9], [4.86, py + 0.5, 4.46], PALETTE.containerGrey, 0.012);
  for (let i = 0; i < 3; i++) {
    pushBox(b, [3.2 + i * 0.16, py + 0.12, 3.78], [3.34 + i * 0.16, py + 0.2, 4.5], PALETTE.tyre, 0.006);
  }
  // The stair up to it.
  for (let i = 0; i < 8; i++) {
    const sy = (i + 1) * (py / 8);
    pushBox(b, [px0 - 0.75, 0, pz0 + 0.3 + i * 0.3], [px0, sy, pz0 + 0.6 + i * 0.3], PALETTE.concreteWorn, 0.01);
  }
  pushBox(b, [px0 - 0.8, 0, pz0 + 0.2], [px0 - 0.68, py + 0.9, pz0 + 2.6], PALETTE.steelDark, 0.008);
  // The searchlight on the platform.
  pushBox(b, [4.7, py + 0.12, 3.7], [4.9, py + 2.3, 3.9], PALETTE.steelDark, 0.01);
  pushBox(b, [4.45, py + 2.3, 3.5], [5.15, py + 2.85, 3.95], PALETTE.steelDark, 0.012);
  pushBox(b, [4.5, py + 2.36, 3.44], [5.1, py + 2.8, 3.52], PALETTE.fluorescent, 0.008);
  // Sandbags on the platform edge, in three short stacks.
  for (let i = 0; i < 3; i++) {
    const sz = pz0 + 0.2 + i * 0.9;
    for (let j = 0; j < 2; j++) {
      pushBox(
        b,
        [px0 + 0.12 + (j % 2) * 0.05, py + 0.12 + j * 0.3, sz],
        [px0 + 0.52, py + 0.4 + j * 0.3, sz + 0.62],
        j === 0 ? PALETTE.sack : shade(PALETTE.sack, 0.9),
        0.01,
      );
    }
  }
  // A low parapet around the platform, with a hazard stripe on the coping.
  pushBox(b, [px0 - 0.08, py, pz0 - 0.08], [px0 + 0.02, py + 0.62, pz1 + 0.08], PALETTE.concreteWorn, 0.012);
  pushBox(b, [px0 - 0.08, py, pz1 - 0.02], [px1 + 0.08, py + 0.62, pz1 + 0.08], PALETTE.concreteWorn, 0.012);
  for (let i = 0; i < 5; i++) {
    const sx = px0 + 0.1 + i * 0.55;
    pushBox(b, [sx, py + 0.62, pz1 - 0.03], [sx + 0.26, py + 0.68, pz1 + 0.09], PALETTE.graffitiYellow, 0.006);
  }

  // The back wall of the cordon, with the badge and the warning stencil.
  pushBox(b, [c.x0, 0, c.z1 - 0.25], [c.x1, 1.8, c.z1], PALETTE.concreteWall, 0.016);
  pushBox(b, [c.x0, 1.8, c.z1 - 0.3], [c.x1, 1.95, c.z1 + 0.05], PALETTE.concrete, 0.012);
  // Pilasters and a service pipe break up the long blank face.
  for (let i = 0; i < 6; i++) {
    const wx = c.x0 + 0.5 + i * 1.8;
    pushBox(b, [wx - 0.16, 0, c.z1 - 0.35], [wx + 0.16, 1.8, c.z1 - 0.25], PALETTE.concrete, 0.01);
  }
  for (let i = 0; i < 7; i++) {
    const wx = c.x0 + 1.1 + i * 1.55;
    pushBox(b, [wx - 0.34, 1.3, c.z1 - 0.36], [wx - 0.22, 1.44, c.z1 - 0.25], PALETTE.rust, 0.006);
  }
  pushBox(b, [c.x0 + 0.8, 1.3, c.z1 - 0.37], [c.x1 - 0.8, 1.44, c.z1 - 0.3], PALETTE.rustDark, 0.008);
  // A warning board bolted to the wall.
  signPlate(b, -3.9, 1.2, c.z1 - 0.36, 0.8, 0.5, PALETTE.graffitiYellow, "z");
  signPlate(b, 4.3, 1.25, c.z1 - 0.36, 0.7, 0.45, PALETTE.graffitiYellow, "z");
  signPlate(b, -2.6, 1.1, c.z1 - 0.26, 0.9, 0.9, PALETTE.badge, "z");
  signPlate(b, -2.6, 1.1, c.z1 - 0.27, 0.55, 0.55, PALETTE.graffitiWhite, "z");
  signPlate(b, 1.0, 1.15, c.z1 - 0.26, 1.8, 0.44, PALETTE.graffitiYellow, "z");
  graffiti(b, 3.2, 1.3, c.z1 - 0.26, 1.2, 0.7, PALETTE.graffitiBlue, "z");
  // A lit warning beacon on the back wall.
  pushBox(b, [-0.2, 2.6, c.z1 - 0.3], [0.1, 2.82, c.z1 - 0.14], PALETTE.steelDark, 0.008);
  pushBox(neon, [-0.16, 2.64, c.z1 - 0.33], [0.06, 2.78, c.z1 - 0.3], PALETTE.lampWarm, 0);
  // A patrol car parked on the cordon, and cones across the road.
  policeCar(b, -0.6, 5.2, 0.1, 0);
  for (let i = 0; i < 5; i++) {
    cone(b, -2.6 + i * 1.35, 3.55, 0.1);
  }
  // Police tape across the front of the cordon.
  for (let i = 0; i < 4; i++) {
    const tx = -3.1 + i * 2.2;
    pushBox(b, [tx - 0.05, 0.1, 2.1], [tx + 0.05, 1.05, 2.2], PALETTE.steelDark, 0.008);
    pushBox(b, [tx + 0.05, 0.92, 2.13], [tx + 2.15, 1.0, 2.17], i % 2 === 0 ? PALETTE.graffitiYellow : PALETTE.graffitiWhite, 0.004);
  }

  // The crate of spare vests and helmets.
  crate(b, -1.4, c.z1 - 0.9, 0.1, 0.8, PALETTE.woodDark, 0);
  pushBox(b, [-1.7, 0.66, c.z1 - 1.15], [-1.2, 0.82, c.z1 - 0.7], [0.2, 0.24, 0.2], 0.006);
  pushBox(b, [-1.1, 0.66, c.z1 - 1.1], [-0.6, 0.8, c.z1 - 0.75], [0.2, 0.24, 0.2], 0.006);
}

/** The street furniture that belongs to the spawn areas. */
export function buildStreetFurniture(b: Builder, neon: Builder) {
  // Lamps along the map.
  streetLamp(b, -7.0, 2.2, 0, 4.6);
  streetLamp(b, 6.95, 3.0, 0, 4.6);
  streetLamp(b, -6.95, -3.2, 0, 4.6);
  // A working light over the counter-terrorist cordon.
  pushBox(b, [0.3, 3.4, 2.95], [0.5, 3.6, 3.15], PALETTE.steelDark, 0.008);
  pushBox(neon, [0.32, 3.28, 2.97], [0.48, 3.4, 3.13], PALETTE.lampWarm, 0);
  // Utility poles with wires across the yard.
  for (const [px, pz] of [[-7.0, -1.2], [-7.0, 4.6]] as Array<[number, number]>) {
    pushBox(b, [px - 0.12, 0, pz - 0.12], [px + 0.12, 5.6, pz + 0.12], PALETTE.woodDark, 0.012);
    for (let i = 0; i < 3; i++) {
      const y = 4.6 + i * 0.34;
      pushBox(b, [px - 0.44, y, pz - 0.05], [px + 0.44, y + 0.08, pz + 0.05], PALETTE.woodDark, 0.008);
      for (const s of [-1, 1]) {
        pushBox(b, [px + s * 0.38 - 0.05, y - 0.12, pz - 0.05], [px + s * 0.38 + 0.05, y + 0.2, pz + 0.05], [0.24, 0.3, 0.36], 0.005);
      }
    }
  }
  // The wires strung between the two poles.
  for (const y of [4.62, 4.96, 5.3]) {
    for (let i = 0; i < 7; i++) {
      const t0 = i / 7;
      const t1 = (i + 1) / 7;
      const sag = (t: number) => Math.sin(t * Math.PI) * 0.3;
      pushBox(
        b,
        [-6.92, y - sag(t0), -1.2 + t0 * 5.8],
        [-6.92, y - sag(t1) + 0.02, -1.2 + t1 * 5.8],
        PALETTE.wire,
        0,
      );
    }
  }
}
