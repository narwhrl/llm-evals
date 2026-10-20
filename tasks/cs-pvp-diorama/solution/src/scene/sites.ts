/**
 * The two bomb sites.
 *
 * The A site is a half open warehouse with a half raised roller door, heavy
 * shelving, a central support column and a tin mezzanine. The B site is an
 * open yard in front of a two storey tin shed whose ground floor is a ruined
 * gatehouse.
 */


import { PALETTE, shade } from "./palette";
import {
  acUnit,
  bulletHoles,
  carton,
  crate,
  crateStack,
  dumpster,
  graffiti,
  ladder,
  oriented,
  pallet,
  palletStack,
  sack,
  signPlate,
} from "./props";
import { pushBox, type Builder } from "./voxel";

/** The A site: the warehouse and the yard in front of it. */
export function buildWarehouse(b: Builder, neon: Builder) {
  const x0 = -6.6;
  const x1 = -2.6;
  const z0 = -4.2;
  const z1 = 0.2;
  const floor = 0.12;
  const roof = 4.5;

  // The floor slab and the shell.
  pushBox(b, [x0 - 0.1, floor - 0.06, z0 - 0.1], [x1 + 0.1, floor, z1 + 0.1], PALETTE.concreteWorn, 0.01);
  // Walls.
  pushBox(b, [x0 - 0.2, floor, z0 - 0.2], [x0, roof, z1 + 0.2], PALETTE.concreteWorn, 0.016);
  pushBox(b, [x0, floor, z0 - 0.2], [x1, roof, z0], PALETTE.concreteWorn, 0.016);
  // The east wall, built around a side door and two plank windows.
  pushBox(b, [x1, floor, z0], [x1 + 0.2, roof, -3.1], PALETTE.concreteWorn, 0.016);
  pushBox(b, [x1, floor, -2.0], [x1 + 0.2, roof, z1], PALETTE.concreteWorn, 0.016);
  pushBox(b, [x1, floor, -3.1], [x1 + 0.2, 2.5, -2.0], PALETTE.concreteWorn, 0.016);
  pushBox(b, [x1, 3.5, -3.1], [x1 + 0.2, roof, -2.0], PALETTE.concreteWorn, 0.016);
  pushBox(b, [x1, 2.5, -3.1], [x1 + 0.2, 2.75, -2.6], PALETTE.concreteWorn, 0.016);
  pushBox(b, [x1, 2.5, -2.5], [x1 + 0.2, 2.75, -2.0], PALETTE.concreteWorn, 0.016);
  // The plank windows, boarded up.
  for (const [wz0, wz1] of [[-1.6, -1.05], [-0.85, -0.3]] as Array<[number, number]>) {
    pushBox(b, [x1 + 0.14, 2.55, wz0], [x1 + 0.2, 3.45, wz1], [0.1, 0.1, 0.11], 0.008);
    for (let i = 0; i < 3; i++) {
      const pz = wz0 + 0.08 + i * 0.17;
      pushBox(b, [x1 + 0.12, 2.55, pz], [x1 + 0.22, 3.45, pz + 0.1], PALETTE.plank, 0.008);
    }
  }
  // The inward opening side door, hanging open.
  pushBox(b, [x1 + 0.14, floor, -3.05], [x1 + 0.2, 2.5, -2.05], [0.1, 0.11, 0.12], 0.008);
  pushBox(b, [x1 - 0.62, floor, -3.05], [x1 - 0.02, 2.5, -2.95], PALETTE.rustDark, 0.012);
  pushBox(b, [x1 - 0.62, floor, -2.15], [x1 - 0.02, 2.5, -2.05], PALETTE.rustDark, 0.012);

  // The front of the shed is an open loading bay: a low kerb wall either side
  // of the roller door, a heavy header beam, and the shutter rolled up on it.
  const doorX0 = -5.7;
  const doorX1 = -3.5;
  pushBox(b, [x0, floor, z1 - 0.2], [doorX0, 1.05, z1], PALETTE.concreteWorn, 0.016);
  pushBox(b, [doorX1, floor, z1 - 0.2], [x1, 1.05, z1], PALETTE.concreteWorn, 0.016);
  pushBox(b, [x0, 1.05, z1 - 0.24], [x1, 1.3, z1 + 0.04], PALETTE.steelDark, 0.012);
  // The shutter, rolled up in its housing above the beam.
  for (let i = 0; i < 5; i++) {
    pushBox(
      b,
      [doorX0 + 0.05, 1.3 + i * 0.11, z1 - 0.32 + (i % 2) * 0.05],
      [doorX1 - 0.05, 1.41 + i * 0.11, z1 - 0.18 - (i % 2) * 0.05],
      i % 2 === 0 ? PALETTE.rust : shade(PALETTE.rust, 0.85),
      0.008,
    );
  }
  // The guide rails of the door.
  for (const gx of [doorX0 - 0.07, doorX1 + 0.07]) {
    pushBox(b, [gx - 0.06, floor, z1 - 0.26], [gx + 0.06, 1.85, z1 - 0.14], PALETTE.rustDark, 0.008);
  }
  // The hazard stripe on the beam.
  for (let i = 0; i < 8; i++) {
    const sx = doorX0 + i * 0.28;
    pushBox(b, [sx, 1.3, z1 - 0.26], [sx + 0.16, 1.4, z1 - 0.17], PALETTE.graffitiYellow, 0.006);
  }
  // The steel frame that carries the roof over the open bay.
  for (const cx of [x0 + 0.15, x1 - 0.35]) {
    pushBox(b, [cx, floor, z1 - 0.3], [cx + 0.2, roof - 0.3, z1 - 0.1], PALETTE.steelDark, 0.012);
    pushBox(b, [cx - 0.04, floor, z1 - 0.34], [cx + 0.24, floor + 0.3, z1 - 0.06], PALETTE.steel, 0.01);
    pushBox(b, [cx - 0.04, roof - 0.6, z0 - 0.1], [cx + 0.24, roof - 0.3, z1 - 0.06], PALETTE.steelDark, 0.012);
  }
  pushBox(b, [x0 - 0.05, roof - 0.34, z1 - 0.24], [x1 + 0.05, roof - 0.14, z1 - 0.06], PALETTE.steelDark, 0.012);

  // The roof covers only the back half, so the shed reads as a half open
  // structure and the bomb site inside it stays readable from above.
  const roofZ1 = z0 + 2.1;
  pushBox(b, [x0 - 0.25, roof, z0 - 0.25], [x1 + 0.25, roof + 0.22, roofZ1], PALETTE.corrugatedDark, 0.016);
  for (let i = 0; i < 8; i++) {
    const rz = z0 - 0.2 + i * 0.38;
    pushBox(b, [x0 - 0.25, roof + 0.22, rz - 0.07], [x1 + 0.25, roof + 0.3, rz + 0.07], shade(PALETTE.corrugatedDark, 0.85), 0.006);
  }
  // The open edge of the roof, with its trusses.
  pushBox(b, [x0 - 0.25, roof, roofZ1 - 0.1], [x1 + 0.25, roof + 0.26, roofZ1 + 0.1], PALETTE.steelDark, 0.012);
  for (let i = 0; i < 5; i++) {
    const tx = x0 + 0.2 + i * 0.95;
    pushBox(b, [tx - 0.05, roof, roofZ1 - 0.4], [tx + 0.05, roof + 0.24, roofZ1], PALETTE.steelDark, 0.008);
  }

  // Pilasters break up the long blank faces of the shell.
  for (let i = 0; i < 5; i++) {
    const pz = z0 + 0.3 + i * 0.95;
    pushBox(b, [x0 - 0.32, floor, pz], [x0 - 0.2, roof, pz + 0.24], PALETTE.concrete, 0.01);
  }
  for (const px of [x0 + 0.3, x1 - 0.55]) {
    pushBox(b, [px, floor, z1], [px + 0.24, roof, z1 + 0.14], PALETTE.concrete, 0.01);
  }
  // A dark plinth band around the inside of the walls.
  pushBox(b, [x0, floor, z0], [x0 + 0.05, 1.0, z1], PALETTE.concreteDark, 0.006);
  pushBox(b, [x0, floor, z0], [x1, 1.0, z0 + 0.05], PALETTE.concreteDark, 0.006);
  pushBox(b, [x1 - 0.05, floor, z0], [x1, 1.0, z1], PALETTE.concreteDark, 0.006);

  // ------------------------------------------------------- inside the shed
  // The central support column: the classic peek spot.
  pushBox(b, [-4.9, floor, -2.3], [-4.55, roof, -1.95], PALETTE.concrete, 0.016);
  pushBox(b, [-4.98, floor, -2.38], [-4.47, floor + 0.22, -1.87], PALETTE.concreteDark, 0.012);

  // Heavy shelving along the north wall, five tiers.
  for (let tier = 0; tier < 5; tier++) {
    const sy = floor + 0.55 + tier * 0.75;
    pushBox(b, [-6.25, sy, -4.0], [-4.35, sy + 0.1, -3.55], PALETTE.steel, 0.01);
    pushBox(b, [-6.25, sy + 0.1, -3.62], [-4.35, sy + 0.42, -3.55], PALETTE.steelDark, 0.008);
    for (let i = 0; i < 7; i++) {
      const cx = -6.1 + i * 0.26;
      carton(b, cx, -3.78, sy + 0.1, 0.2, 0.3, 0.18, i % 3 === 0 ? PALETTE.cardboardDark : PALETTE.cardboard, 0);
    }
  }
  for (const px of [-6.2, -5.3, -4.4]) {
    pushBox(b, [px - 0.05, floor, -4.02], [px + 0.05, floor + 4.0, -3.92], PALETTE.steelDark, 0.008);
  }

  // A second rack along the west wall.
  for (let tier = 0; tier < 3; tier++) {
    const sy = floor + 0.6 + tier * 0.8;
    pushBox(b, [-6.2, sy, -3.1], [-5.75, sy + 0.1, -1.1], PALETTE.steel, 0.01);
    for (let i = 0; i < 4; i++) {
      crate(b, -5.98, -2.9 + i * 0.5, sy + 0.1, 0.42, PALETTE.woodDark, i);
    }
  }

  // Crates and sacks used as cover around the bomb mark.
  crateStack(b, -5.2, -0.7, floor, 2, 0.72, PALETTE.wood);
  crateStack(b, -3.1, -2.6, floor, 3, 0.66, PALETTE.woodLight);
  crate(b, -3.5, -1.2, floor, 0.8, PALETTE.wood, 1);
  sack(b, -2.95, -1.5, floor);
  sack(b, -2.95, -1.2, floor, shade(PALETTE.sack, 0.92));
  sack(b, -3.35, -1.1, floor);
  pallet(b, -5.9, -0.5, floor, 1);
  palletStack(b, -5.9, -0.5, floor, 2);

  // A forklift parked by the roller door.
  pushBox(b, [-3.95, floor, -1.2], [-3.05, floor + 0.55, -0.35], PALETTE.containerYellow, 0.014);
  pushBox(b, [-3.8, floor + 0.55, -1.05], [-3.25, floor + 1.25, -0.55], PALETTE.steelDark, 0.01);
  pushBox(b, [-3.75, floor + 1.25, -1.0], [-3.3, floor + 1.5, -0.6], PALETTE.glassDark, 0.008);
  for (const fz of [-1.15, -0.45]) {
    pushBox(b, [-3.1, floor, fz - 0.06], [-2.85, floor + 1.5, fz + 0.06], PALETTE.steelDark, 0.008);
  }
  pushBox(b, [-2.9, floor + 0.2, -1.2], [-2.75, floor + 0.5, -0.4], PALETTE.steelDark, 0.008);

  // The sorting table and the broken express boxes.
  pushBox(b, [-6.2, floor + 0.75, -0.9], [-5.1, floor + 0.9, -0.2], PALETTE.steel, 0.01);
  for (const lx of [-6.1, -5.2]) {
    for (const lz of [-0.82, -0.3]) {
      pushBox(b, [lx - 0.04, floor, lz - 0.04], [lx + 0.04, floor + 0.75, lz + 0.04], PALETTE.steelDark, 0.006);
    }
  }
  carton(b, -5.7, -0.55, floor + 0.9, 0.5, 0.36, 0.4, PALETTE.cardboard, 1);
  carton(b, -3.6, 0.0, floor, 0.5, 0.4, 0.42, PALETTE.cardboardDark, 0);
  carton(b, -3.3, -0.2, floor, 0.4, 0.3, 0.34, PALETTE.cardboard, 1);
  // Packing straps and old newspaper on the floor.
  pushBox(b, [-4.3, floor, -0.9], [-3.6, floor + 0.02, -0.82], PALETTE.graffitiYellow, 0);
  pushBox(b, [-5.1, floor, -0.4], [-4.6, floor + 0.02, -0.32], [0.5, 0.49, 0.45], 0);
  pushBox(b, [-4.2, floor, -2.9], [-3.75, floor + 0.02, -2.75], [0.5, 0.49, 0.45], 0);

  // The tin mezzanine in the north east corner.
  const mz = 3.0;
  pushBox(b, [-3.9, mz, -4.05], [-2.65, mz + 0.12, -2.5], PALETTE.corrugated, 0.012);
  for (const px of [-3.85, -3.2, -2.7]) {
    pushBox(b, [px - 0.05, floor, -4.02], [px + 0.05, mz, -3.92], PALETTE.steelDark, 0.008);
  }
  pushBox(b, [-3.9, mz + 0.12, -2.72], [-2.65, mz + 1.0, -2.6], PALETTE.corrugatedDark, 0.01);
  // The ladder up to it.
  ladder(b, -2.95, -2.35, floor, mz + 0.4, 0);
  // A small window overlooking the site.
  pushBox(b, [-3.55, mz + 0.3, -2.66], [-2.95, mz + 0.85, -2.58], PALETTE.glassDark, 0.008);
  pushBox(b, [-3.6, mz + 0.24, -2.68], [-2.9, mz + 0.32, -2.56], PALETTE.steelDark, 0.008);

  // Emergency ceiling lights.
  for (let i = 0; i < 3; i++) {
    const lx = -5.9 + i * 1.3;
    pushBox(b, [lx, roof - 0.42, -3.0], [lx + 0.5, roof - 0.3, -2.7], PALETTE.steelDark, 0.008);
    pushBox(neon, [lx + 0.04, roof - 0.44, -2.98], [lx + 0.46, roof - 0.32, -2.72], PALETTE.emergency, 0);
  }

  // The back door at the rear, with red light leaking through the gap.
  pushBox(b, [-5.4, floor, z0 - 0.06], [-4.5, floor + 2.3, z0 + 0.04], PALETTE.rustDark, 0.012);
  pushBox(neon, [-4.62, floor, z0 - 0.08], [-4.5, floor + 2.1, z0 - 0.04], PALETTE.backRoomRed, 0);

  // ------------------------------------------------------ outside the shed
  acUnit(b, x0 - 0.2, 3.0, -1.4, "x");
  signPlate(b, x0 - 0.22, 2.2, -2.6, 1.1, 0.7, PALETTE.graffitiWhite, "x");
  signPlate(b, x0 - 0.22, 2.2, -2.6, 0.9, 0.5, PALETTE.sprayMark, "x");
  dumpster(b, -2.95, 0.85, 0.0, 0, PALETTE.containerGreen);
  dumpster(b, -6.35, 0.9, 0.0, 0, PALETTE.containerGrey);
  // The narrow passage down to the alley.
  pushBox(b, [-2.6, 0, -4.4], [-2.0, 3.2, -3.6], PALETTE.concreteWorn, 0.012);
  pushBox(b, [-2.0, 0, -4.4], [-1.7, 3.2, -3.6], PALETTE.concrete, 0.012);
  // Graffiti and bullet holes on the outside walls.
  graffiti(b, -4.6, 3.6, 0.22, 1.6, 1.0, PALETTE.graffitiBlue, "z");
  graffiti(b, -3.1, 1.6, 0.22, 1.0, 0.8, PALETTE.graffitiRed, "z");
  bulletHoles(b, -4.0, 1.2, 0.22, 9, 1.1, "z", 3);
  bulletHoles(b, -2.6, 1.6, -1.2, 7, 0.9, "x", 8);
  // A painted faction spray on the pillar.
  signPlate(b, -4.72, 1.4, -1.92, 0.5, 0.7, PALETTE.sprayMark, "z");
}

/** The B site: the yard in front of a two storey tin shed. */
export function buildTinShed(b: Builder, neon: Builder) {
  const x0 = 3.2;
  const x1 = 6.6;
  const z0 = -3.9;
  const z1 = -1.3;
  const floor = 0.12;
  const roof = 4.4;

  // The ground floor of the tin shed: the ruined gatehouse.
  pushBox(b, [x0 - 0.1, floor - 0.06, z0 - 0.1], [x1 + 0.1, floor, z1 + 0.1], PALETTE.concreteWorn, 0.01);
  pushBox(b, [x0 - 0.15, floor, z0 - 0.15], [x0, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  pushBox(b, [x0, floor, z0 - 0.15], [x1, roof, z0], PALETTE.corrugatedDark, 0.016);
  pushBox(b, [x1, floor, z0 - 0.15], [x1 + 0.15, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  // The front wall with a wide door and a window.
  pushBox(b, [x0, floor, z1], [3.95, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  pushBox(b, [5.05, floor, z1], [x1, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  pushBox(b, [3.95, 2.4, z1], [5.05, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  pushBox(b, [x0, floor, z1], [3.95, 0.1, z1 + 0.15], PALETTE.steelDark, 0.01);
  pushBox(b, [5.05, floor, z1], [x1, 0.1, z1 + 0.15], PALETTE.steelDark, 0.01);
  // The window beside the door.
  pushBox(b, [5.35, 1.15, z1 + 0.1], [6.25, 2.15, z1 + 0.16], PALETTE.glassDark, 0.008);
  pushBox(b, [5.3, 1.1, z1 + 0.06], [6.3, 1.18, z1 + 0.2], PALETTE.steelDark, 0.008);
  pushBox(b, [5.3, 2.1, z1 + 0.06], [6.3, 2.18, z1 + 0.2], PALETTE.steelDark, 0.008);

  // The second floor and the balcony that overlooks the site.
  pushBox(b, [x0 - 0.15, 2.7, z0 - 0.15], [x1 + 0.15, 2.85, z1 + 0.15], PALETTE.corrugatedDark, 0.012);
  pushBox(b, [x0 - 0.15, 2.85, z0 - 0.15], [x0, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  pushBox(b, [x0, 2.85, z0 - 0.15], [x1, roof, z0], PALETTE.corrugatedDark, 0.016);
  pushBox(b, [x1, 2.85, z0 - 0.15], [x1 + 0.15, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  pushBox(b, [x0, 2.85, z1], [3.95, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  pushBox(b, [5.05, 2.85, z1], [x1, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  pushBox(b, [3.95, 2.85, z1], [5.05, roof, z1 + 0.15], PALETTE.corrugated, 0.016);
  // The balcony floor and railing in front of the upper door.
  pushBox(b, [3.6, 2.7, z1 + 0.15], [5.4, 2.82, z1 + 1.05], PALETTE.steel, 0.012);
  for (let i = 0; i < 7; i++) {
    const rx = 3.65 + i * 0.28;
    pushBox(b, [rx - 0.04, 2.82, z1 + 0.98], [rx + 0.04, 3.7, z1 + 1.06], PALETTE.steelDark, 0.008);
  }
  pushBox(b, [3.56, 3.62, z1 + 0.96], [5.44, 3.76, z1 + 1.08], PALETTE.steelDark, 0.01);
  // The roof.
  pushBox(b, [x0 - 0.2, roof, z0 - 0.2], [x1 + 0.2, roof + 0.18, z1 + 0.2], PALETTE.corrugatedDark, 0.016);

  // The fire escape up the east wall to the balcony.
  ladder(b, 6.85, -2.4, floor, 2.8, 0);
  ladder(b, 6.85, -1.85, floor, 2.8, 0);
  pushBox(b, [6.7, 2.62, -2.7], [6.95, 2.74, -1.55], PALETTE.steel, 0.01);

  // Inside the gatehouse: a desk, a chair, a roster and a broken light.
  pushBox(b, [3.5, floor + 0.72, -2.6], [4.7, floor + 0.82, -2.0], PALETTE.woodDark, 0.01);
  for (const lx of [3.6, 4.55]) {
    pushBox(b, [lx - 0.05, floor, -2.5], [lx + 0.05, floor + 0.72, -2.1], PALETTE.steelDark, 0.006);
  }
  // The overturned office chair.
  pushBox(b, [4.95, floor, -2.5], [5.35, floor + 0.12, -2.1], PALETTE.steelDark, 0.01);
  pushBox(b, [5.15, floor + 0.1, -2.45], [5.35, floor + 0.85, -2.15], PALETTE.steelDark, 0.01);
  // A radio and a coffee tin on the desk.
  pushBox(b, [3.6, floor + 0.82, -2.45], [3.95, floor + 1.02, -2.25], [0.15, 0.16, 0.17], 0.006);
  pushBox(b, [4.2, floor + 0.82, -2.4], [4.34, floor + 0.98, -2.24], PALETTE.steelLight, 0.006);
  pushBox(b, [4.42, floor + 0.82, -2.42], [4.68, floor + 0.84, -2.06], [0.5, 0.49, 0.45], 0);
  // The duty roster on the wall.
  signPlate(b, 3.45, 1.7, -2.42, 0.7, 0.9, PALETTE.graffitiWhite, "z");
  for (let i = 0; i < 4; i++) {
    pushBox(b, [3.22, 1.4 + i * 0.18, -2.38], [3.66, 1.44 + i * 0.18, -2.36], [0.25, 0.26, 0.28], 0);
  }
  // A steel locker in the corner.
  pushBox(b, [6.1, floor, -3.6], [6.55, floor + 1.8, -3.15], PALETTE.containerGrey, 0.012);
  pushBox(b, [6.05, floor + 0.6, -3.62], [6.12, floor + 1.7, -3.14], PALETTE.steelDark, 0.008);
  // The broken fluorescent tube.
  pushBox(b, [4.2, 2.52, -2.5], [5.0, 2.62, -2.3], PALETTE.steelDark, 0.008);
  pushBox(neon, [4.28, 2.46, -2.46], [4.92, 2.54, -2.34], PALETTE.lampWarm, 0);

  // ---------------------------------------------------------- the B yard
  // Pallets, bins, an abandoned bicycle and toppled chairs around the mark.
  palletStack(b, 3.0, -0.4, 0, 3);
  pallet(b, 3.1, 0.3, 0, 1);
  dumpster(b, 6.3, 0.1, 0, 0, PALETTE.containerBlue);
  crateStack(b, 6.0, -0.7, 0, 2, 0.62, PALETTE.wood);
  // The toppled iron furniture.
  for (let i = 0; i < 2; i++) {
    oriented(b, 4.9 + i * 0.5, 0.35, 0.42, 0.42, 0.02, 0.5, PALETTE.steelDark, 0.01, i);
    oriented(b, 4.9 + i * 0.5, 0.35, 0.42, 0.42, 0.5, 0.58, PALETTE.steelDark, 0.01, i);
  }
  // An abandoned bicycle against the wall.
  pushBox(b, [2.6, 0.3, 0.2], [2.9, 0.42, 0.62], PALETTE.steelDark, 0.008);
  pushBox(b, [2.68, 0.42, 0.3], [2.82, 0.95, 0.42], PALETTE.steelDark, 0.008);
  pushBox(b, [2.55, 0.28, 0.14], [2.95, 0.36, 0.3], PALETTE.tyre, 0.006);

  // The old street lamp at the corner of the site.
  pushBox(b, [6.75, 0, -0.35], [6.95, 4.3, -0.15], PALETTE.steelDark, 0.012);
  pushBox(b, [6.4, 4.3, -0.32], [6.8, 4.48, -0.18], PALETTE.steelDark, 0.01);
  pushBox(neon, [6.42, 4.16, -0.3], [6.68, 4.3, -0.2], PALETTE.lampSodium, 0);

  // The low wall that is the shortcut to the counter-terrorist spawn.
  pushBox(b, [2.3, 0, 0.7], [2.5, 1.1, 2.4], PALETTE.concreteWorn, 0.014);
  pushBox(b, [2.3, 1.1, 0.7], [2.55, 1.22, 2.4], PALETTE.concrete, 0.01);

  // Graffiti and bullet holes.
  graffiti(b, 3.6, 1.6, -1.16, 1.0, 0.9, PALETTE.graffitiYellow, "z");
  graffiti(b, 6.76, 1.4, -2.8, 0.8, 0.8, PALETTE.graffitiRed, "x");
  bulletHoles(b, 4.9, 1.5, -1.16, 8, 0.9, "z", 5);
  // A shipping mark on the tin wall.
  signPlate(b, 5.6, 3.5, -1.14, 1.2, 0.5, PALETTE.graffitiWhite, "z");
  signPlate(b, 5.6, 3.5, -1.13, 0.9, 0.3, PALETTE.sprayMark, "z");
}

/** A short stretch of the alley that runs down the west of the map. */
export function buildAlley(b: Builder, neon: Builder) {
  // The alley between the A site and the map edge.
  pushBox(b, [-6.95, 0, -4.4], [-6.75, 4.2, 1.4], PALETTE.concreteDark, 0.014);
  pushBox(b, [-2.6, 0, 1.2], [-2.4, 3.0, 2.6], PALETTE.concreteWorn, 0.012);
  // A stack of pallets and a skip in the alley mouth.
  palletStack(b, -6.0, 1.2, 0, 3);
  dumpster(b, -4.9, 1.9, 0, 0, PALETTE.containerRed);
  crateStack(b, -3.6, 1.5, 0, 2, 0.66, PALETTE.wood);
  // A wall lamp over the alley.
  pushBox(b, [-6.72, 2.6, 0.4], [-6.6, 2.9, 1.0], PALETTE.steelDark, 0.01);
  pushBox(b, [-6.68, 2.5, 0.5], [-6.56, 2.6, 0.9], PALETTE.steelDark, 0.008);
  pushBox(neon, [-6.6, 2.44, 0.55], [-6.52, 2.52, 0.85], PALETTE.lampWarm, 0);
}
