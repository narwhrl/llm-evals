/**
 * The street corner and everything standing on it.
 *
 * The base is a square plinth with an L-shaped road around the block, so the
 * composition turns a corner exactly like the night scene the brief
 * describes. The convenience store takes the inside of the corner, an alley
 * runs down its western flank, and a small car park with a bicycle rank fills
 * the southern lot.
 */

import { PALETTE, shade } from "./palette";
import { pushBox, pushPlate, type Builder } from "./voxel";
import { SHOP } from "./konbini";

export const LAYOUT = {
  half: 7,
  roadSouthZ0: -0.9,
  roadSouthZ1: 3.0,
  roadEastX0: 2.6,
  roadEastX1: 5.6,
  walkHeight: 0.15,
  /** The wet asphalt sits on top of the mirror that reflects the signs. */
  wetTop: 0.012,
};

/** Where the traffic signal stands, so the lenses can be lit separately. */
export const SIGNAL = { x: 5.85, z: 0.9 };

function rand(seed: number): number {
  const x = Math.sin(seed * 91.3458) * 47453.1234;
  return x - Math.floor(x);
}

export interface StreetResult {
  /** Everything opaque: plinth, kerbs, markings and all the furniture. */
  builder: Builder;
  /** The asphalt, drawn as a translucent film over the reflective ground. */
  wet: Builder;
  /** Flat dark patches that act as puddles on the road. */
  puddles: Array<[number, number, number, number]>;
}

export function buildStreet(): StreetResult {
  const b: Builder = {
    positions: [], normals: [], uvs: [], colors: [],
    oPositions: [], oNormals: [], oColors: [],
  };
  const wet: Builder = {
    positions: [], normals: [], uvs: [], colors: [],
    oPositions: [], oNormals: [], oColors: [],
  };
  const puddles: Array<[number, number, number, number]> = [];
  const H = LAYOUT.half;
  const { roadSouthZ0, roadSouthZ1, roadEastX0, roadEastX1 } = LAYOUT;

  // ------------------------------------------------------------- the plinth
  pushBox(b, [-H - 0.28, -0.55, -H - 0.28], [H + 0.28, -0.14, H + 0.28], PALETTE.basePlinth, 0.02);
  pushBox(b, [-H - 0.12, -0.14, -H - 0.12], [H + 0.12, 0, H + 0.12], PALETTE.baseEdge, 0.014);

  // ------------------------------------------------------- raised block level
  // The lot the shop stands on.
  pushBox(b, [SHOP.x0, 0, -H], [roadEastX0, LAYOUT.walkHeight, roadSouthZ0], PALETTE.sidewalk, 0.01);
  // The southern lot with the car park.
  pushBox(b, [-H, 0, roadSouthZ1], [roadEastX0, LAYOUT.walkHeight, H], PALETTE.sidewalk, 0.01);
  // The eastern block, with the neighbouring buildings on it.
  pushBox(b, [roadEastX1, 0, -H], [H, LAYOUT.walkHeight, H], PALETTE.sidewalk, 0.01);

  // Kerbs around the roads.
  pushBox(b, [SHOP.x0, 0, roadSouthZ0 - 0.12], [roadEastX0, LAYOUT.walkHeight, roadSouthZ0], PALETTE.curb, 0.008);
  pushBox(b, [roadEastX0 - 0.12, 0, -H], [roadEastX0, LAYOUT.walkHeight, roadSouthZ0], PALETTE.curb, 0.008);
  pushBox(b, [roadEastX0, 0, roadSouthZ1], [roadEastX1, LAYOUT.walkHeight, roadSouthZ1 + 0.12], PALETTE.curb, 0.008);
  pushBox(b, [roadEastX1, 0, roadSouthZ1], [roadEastX1 + 0.12, LAYOUT.walkHeight, H], PALETTE.curb, 0.008);
  pushBox(b, [-H, 0, roadSouthZ1], [roadEastX0, LAYOUT.walkHeight, roadSouthZ1 + 0.12], PALETTE.curb, 0.008);
  pushBox(b, [roadEastX1, 0, -H], [roadEastX1 + 0.12, LAYOUT.walkHeight, roadSouthZ1], PALETTE.curb, 0.008);

  // ------------------------------------------------------------ road surface
  pushBox(wet, [-H, -0.06, roadSouthZ0], [H, LAYOUT.wetTop, roadSouthZ1], PALETTE.asphalt, 0);
  pushBox(wet, [roadEastX0, -0.06, -H], [roadEastX1, LAYOUT.wetTop, H], PALETTE.asphalt, 0);

  // Centre line of the main road.
  for (let i = 0; i < 9; i++) {
    const x = -6.6 + i * 1.6;
    if (x > 1.9 && x < 2.7) continue;
    pushPlate(b, [x, LAYOUT.wetTop + 0.004, 0.82], [x + 0.85, LAYOUT.wetTop + 0.014, 0.94], PALETTE.roadLineYellow, 0);
  }
  // Stop line on the side road.
  pushPlate(b, [roadEastX0 + 0.1, LAYOUT.wetTop + 0.004, roadSouthZ1 - 0.32], [roadEastX0 + 0.24, LAYOUT.wetTop + 0.014, roadSouthZ1], PALETTE.roadLineWhite, 0);

  // Crosswalk across the main road, just before the corner.
  for (let i = 0; i < 6; i++) {
    const x = -0.7 + i * 0.52;
    pushPlate(b, [x, LAYOUT.wetTop + 0.004, roadSouthZ0 + 0.16], [x + 0.32, LAYOUT.wetTop + 0.014, roadSouthZ1 - 0.16], PALETTE.crosswalk, 0);
  }
  // A crossing on the side road.
  for (let i = 0; i < 5; i++) {
    const z = 0.2 + i * 0.5;
    pushPlate(b, [roadEastX0 + 0.16, LAYOUT.wetTop + 0.004, z], [roadEastX1 - 0.16, LAYOUT.wetTop + 0.014, z + 0.3], PALETTE.crosswalk, 0);
  }

  // Parking bays painted on the southern lot.
  for (let i = 0; i < 4; i++) {
    const x = -6.5 + i * 1.5;
    pushPlate(b, [x, LAYOUT.walkHeight + 0.011, 3.4], [x + 0.08, LAYOUT.walkHeight + 0.021, 6.1], PALETTE.roadLineWhite, 0);
  }
  pushPlate(b, [-6.5, LAYOUT.walkHeight + 0.011, 3.4], [-5.0, LAYOUT.walkHeight + 0.021, 3.48], PALETTE.roadLineWhite, 0);

  // Drainage gutter and its grate along the kerb of the main road.
  pushPlate(b, [-H, 0.004, roadSouthZ0 + 0.04], [roadEastX0, 0.028, roadSouthZ0 + 0.26], PALETTE.drain, 0);
  for (let i = 0; i < 22; i++) {
    const x = -6.6 + i * 0.33;
    if (x > 1.9) break;
    pushPlate(b, [x, 0.03, roadSouthZ0 + 0.06], [x + 0.24, 0.042, roadSouthZ0 + 0.24], PALETTE.drainGrate, 0);
  }
  pushPlate(b, [roadEastX0 + 0.04, 0.004, -H], [roadEastX0 + 0.26, 0.028, roadSouthZ0], PALETTE.drain, 0);

  // ------------------------------------------------------------- puddles
  puddles.push([-1.9, 0.8, 1.4, 0.9]);
  puddles.push([1.1, 2.1, 1.0, 0.7]);
  puddles.push([4.1, -2.4, 1.0, 1.3]);
  puddles.push([4.6, 0.9, 0.9, 0.8]);
  puddles.push([-4.2, 1.9, 1.3, 0.8]);
  puddles.push([3.8, -4.6, 0.9, 1.2]);
  puddles.push([0.1, -0.4, 1.1, 0.6]);
  puddles.push([-5.6, 0.7, 0.8, 1.0]);

  // -------------------------------------------------------------- the alley
  // A dark slot down the western flank of the shop, with a lamp over the
  // mouth so the entrance reads at a glance.
  pushBox(b, [-H, 0, SHOP.z0], [-6.2, 0.05, roadSouthZ0], PALETTE.asphalt, 0);
  pushBox(b, [-H, 0, SHOP.z0], [-6.05, 3.6, roadSouthZ0], [0.2, 0.21, 0.24], 0.016);
  for (let i = 0; i < 4; i++) {
    pushBox(b, [-6.0, 1.1 + i * 0.72, -5.6 + (i % 2) * 1.8], [-5.85, 1.55 + i * 0.72, -5.0 + (i % 2) * 1.8], [0.85, 0.8, 0.62], 0.01);
  }
  pushBox(b, [SHOP.x0, 1.9, -4.3], [SHOP.x0 + 0.14, 2.2, -3.7], [0.98, 0.82, 0.52], 0.01);
  pushBox(b, [SHOP.x0 + 0.1, 1.84, -4.35], [SHOP.x0 + 0.28, 2.26, -3.65], [0.16, 0.17, 0.2], 0.01);
  // A lit sign over the alley mouth.
  pushBox(b, [-6.15, 2.5, roadSouthZ0 - 0.06], [-5.25, 2.95, roadSouthZ0], PALETTE.frameDark, 0.012);
  pushBox(b, [-6.09, 2.56, roadSouthZ0 - 0.1], [-5.31, 2.89, roadSouthZ0 - 0.05], PALETTE.neonCool, 0.008);

  // --------------------------------------------------------- street furniture
  // Vending machines against the side wall of the shop.
  vendingMachine(b, 2.03, -5.7, PALETTE.vendingBlue);
  vendingMachine(b, 2.03, -4.65, PALETTE.vendingRed);

  // Bicycles parked in front of the window.
  bicycle(b, -5.85, -2.05, 0.18, PALETTE.bikeRed);
  bicycle(b, -5.25, -1.98, -0.12, PALETTE.bikeTeal);
  bicycle(b, -6.35, -1.5, 0.08, PALETTE.bikeYellow);

  // The entrance mat in front of the automatic doors.
  pushBox(b, [SHOP.doorX0 - 0.15, LAYOUT.walkHeight, SHOP.z1 + 0.12], [SHOP.doorX1 + 0.15, LAYOUT.walkHeight + 0.09, SHOP.z1 + 0.62], [0.4, 0.43, 0.48], 0.008);
  pushBox(b, [SHOP.doorX0 - 0.05, LAYOUT.walkHeight + 0.09, SHOP.z1 + 0.18], [SHOP.doorX1 + 0.05, LAYOUT.walkHeight + 0.11, SHOP.z1 + 0.56], [0.55, 0.58, 0.63], 0.006);

  // Umbrella rack by the door.
  umbrellaRack(b, 0.55, -1.62);

  // Rubbish bins by the window.
  bin(b, -5.05, -1.32, PALETTE.binGreen);
  bin(b, -5.05, -1.0, PALETTE.binGrey);

  // Street lamp on the corner.
  streetLamp(b, 2.2, -1.2);
  streetLamp(b, -6.3, 3.7);
  streetLamp(b, 5.9, -1.0);
  streetLamp(b, 5.75, 5.0);

  // Traffic signal further down the side road.
  trafficSignal(b, SIGNAL.x, SIGNAL.z);

  // Utility poles and the wires strung between them.
  utilityPole(b, 6.4, -4.2);
  utilityPole(b, 6.4, 2.2);
  for (const y of [4.42, 4.76, 5.1]) {
    for (let i = 0; i < 8; i++) {
      const t0 = i / 8;
      const t1 = (i + 1) / 8;
      const sag = (t: number) => Math.sin(t * Math.PI) * 0.28;
      pushBox(
        b,
        [6.32, y - sag(t0), -4.2 + t0 * 6.4],
        [6.48, y - sag(t1) + 0.02, -4.2 + t1 * 6.4],
        PALETTE.wire,
        0,
      );
    }
  }

  // Road signs.
  roadSign(b, 2.25, -2.2, PALETTE.signRedPlate, 0.62);
  roadSign(b, 5.9, -1.9, PALETTE.signBluePlate, 0.5);
  roadSign(b, -4.3, -1.15, PALETTE.signWhitePlate, 0.44);

  // Guardrails: one across the alley mouth, one along the car park.
  guardrail(b, -6.1, roadSouthZ0 + 0.16, -5.35, roadSouthZ0 + 0.16);
  guardrail(b, -6.4, roadSouthZ1 - 0.16, -1.4, roadSouthZ1 - 0.16);

  // Notice board and posters on the pavement.
  noticeBoard(b, 1.55, -1.3, 0.85);

  // Air conditioning units on the side wall, above the window.
  pushBox(b, [SHOP.x1, 2.4, -4.6], [SHOP.x1 + 0.36, 2.95, -3.85], PALETTE.acUnit, 0.012);
  pushBox(b, [SHOP.x1 + 0.04, 2.48, -4.55], [SHOP.x1 + 0.32, 2.88, -3.9], PALETTE.steelDark, 0.006);

  // Neighbouring buildings closing the eastern edge of the block.
  pushBox(b, [roadEastX1 + 0.3, 0, -H], [H, 3.4, -1.8], [0.24, 0.25, 0.28], 0.016);
  pushBox(b, [roadEastX1 + 0.3, 3.4, -H], [H, 3.62, -1.8], [0.3, 0.31, 0.34], 0.016);
  // A low workshop further down the block, so the corner is not a blank wall.
  pushBox(b, [roadEastX1 + 0.45, 0, 2.2], [H, 1.9, 4.3], [0.22, 0.23, 0.26], 0.016);
  pushBox(b, [roadEastX1 + 0.45, 1.9, 2.2], [H, 2.06, 4.3], [0.3, 0.31, 0.34], 0.014);
  for (let i = 0; i < 4; i++) {
    pushBox(b, [roadEastX1 + 0.3, 0.9 + i * 0.7, -3.2], [H - 0.4, 1.32 + i * 0.7, -2.5], [0.84, 0.8, 0.62], 0.01);
  }
  for (let i = 0; i < 2; i++) {
    pushBox(b, [roadEastX1 + 0.45, 0.8 + i * 0.66, 3.5], [H - 0.55, 1.14 + i * 0.66, 3.95], [0.8, 0.78, 0.64], 0.01);
  }
  // A fence along the rest of the block.
  for (let i = 0; i < 6; i++) {
    const fz = 4.5 + i * 0.45;
    pushBox(b, [roadEastX1 + 0.5, LAYOUT.walkHeight, fz], [roadEastX1 + 0.62, LAYOUT.walkHeight + 0.85, fz + 0.1], PALETTE.guardrail, 0.008);
  }
  pushBox(b, [roadEastX1 + 0.5, LAYOUT.walkHeight + 0.6, 4.5], [roadEastX1 + 0.62, LAYOUT.walkHeight + 0.72, 7.0], PALETTE.guardrail, 0.008);
  // A drain pipe and a small sign on the neighbouring wall.
  pushBox(b, [roadEastX1 + 0.38, 0, -1.7], [roadEastX1 + 0.48, 3.4, -1.6], PALETTE.steelDark, 0.008);
  pushBox(b, [roadEastX1 + 0.32, 1.5, -0.7], [roadEastX1 + 0.38, 2.1, -0.3], PALETTE.posterBlue, 0.008);

  // ---------------------------------------------------------- the car park
  car(b, -6.1, 4.9, 0, [0.88, 0.9, 0.92]);
  car(b, -4.6, 4.9, 0, [0.4, 0.5, 0.72]);
  car(b, -3.1, 4.9, 0, [0.8, 0.28, 0.25]);
  // A bicycle rank on the edge of the lot.
  for (let i = 0; i < 5; i++) {
    bicycle(b, -1.9 + i * 0.55, 5.4, 1.57, [0.42, 0.52, 0.6]);
  }
  pushBox(b, [-2.1, LAYOUT.walkHeight, 5.02], [-0.2, LAYOUT.walkHeight + 0.12, 5.12], PALETTE.steelDark, 0.008);

  // A few bushes and a low wall on the southern lot.
  for (let i = 0; i < 8; i++) {
    const x = -6.6 + i * 1.1 + rand(i) * 0.4;
    const z = 6.5 + rand(i + 9) * 0.4;
    const r = 0.3 + rand(i + 3) * 0.22;
    pushBox(b, [x - r, LAYOUT.walkHeight, z - r], [x + r, LAYOUT.walkHeight + r * 1.4, z + r], [0.19, 0.32, 0.21], 0.012);
  }
  pushBox(b, [-H, LAYOUT.walkHeight, 6.9], [roadEastX0, LAYOUT.walkHeight + 0.42, 7.06], [0.42, 0.43, 0.44], 0.012);

  // A bench and a lit waiting shelter so the lot is not empty.
  pushBox(b, [-0.2, LAYOUT.walkHeight, 6.4], [1.2, LAYOUT.walkHeight + 0.1, 6.75], [0.55, 0.42, 0.3], 0.01);
  pushBox(b, [-0.2, LAYOUT.walkHeight + 0.1, 6.62], [1.2, LAYOUT.walkHeight + 0.52, 6.75], [0.55, 0.42, 0.3], 0.01);
  for (const bx of [-0.05, 0.95]) {
    pushBox(b, [bx - 0.05, LAYOUT.walkHeight, 6.42], [bx + 0.05, LAYOUT.walkHeight + 0.12, 6.7], PALETTE.steelDark, 0.006);
  }
  waitingShelter(b, 1.7, 3.75);

  return { builder: b, wet, puddles };
}

/** A lit waiting shelter at the edge of the car park. */
function waitingShelter(b: Builder, x: number, z: number) {
  const w = 1.0;
  const d = 0.5;
  const h = 2.05;
  // Posts and a roof.
  for (const sx of [-w / 2 + 0.06, w / 2 - 0.06]) {
    pushBox(b, [x + sx - 0.05, LAYOUT.walkHeight, z - d / 2], [x + sx + 0.05, LAYOUT.walkHeight + h, z - d / 2 + 0.1], PALETTE.steelDark, 0.008);
    pushBox(b, [x + sx - 0.05, LAYOUT.walkHeight, z + d / 2 - 0.1], [x + sx + 0.05, LAYOUT.walkHeight + h, z + d / 2], PALETTE.steelDark, 0.008);
  }
  pushBox(b, [x - w / 2 - 0.08, LAYOUT.walkHeight + h, z - d / 2 - 0.08], [x + w / 2 + 0.08, LAYOUT.walkHeight + h + 0.1, z + d / 2 + 0.08], [0.34, 0.36, 0.4], 0.012);
  // The back panel carries a lit advertisement, on both sides.
  pushBox(b, [x - w / 2, LAYOUT.walkHeight + 0.2, z - d / 2], [x + w / 2, LAYOUT.walkHeight + h - 0.15, z - d / 2 + 0.08], [0.16, 0.2, 0.26], 0.01);
  pushBox(b, [x - w / 2 + 0.08, LAYOUT.walkHeight + 0.3, z - d / 2 - 0.03], [x + w / 2 - 0.08, LAYOUT.walkHeight + h - 0.25, z - d / 2 + 0.01], [0.95, 0.88, 0.7], 0.006);
  pushBox(b, [x - w / 2 + 0.14, LAYOUT.walkHeight + 0.38, z - d / 2 - 0.05], [x + 0.02, LAYOUT.walkHeight + h - 0.33, z - d / 2 - 0.02], PALETTE.posterPink, 0.004);
  pushBox(b, [x - w / 2, LAYOUT.walkHeight + 0.2, z + d / 2 - 0.08], [x + w / 2, LAYOUT.walkHeight + h - 0.15, z + d / 2], [0.16, 0.2, 0.26], 0.01);
  pushBox(b, [x - w / 2 + 0.08, LAYOUT.walkHeight + 0.3, z + d / 2 - 0.01], [x + w / 2 - 0.08, LAYOUT.walkHeight + h - 0.25, z + d / 2 + 0.03], [0.95, 0.88, 0.7], 0.006);
  pushBox(b, [x - w / 2 + 0.14, LAYOUT.walkHeight + 0.38, z + d / 2 + 0.02], [x + 0.02, LAYOUT.walkHeight + h - 0.33, z + d / 2 + 0.05], PALETTE.posterBlue, 0.004);
  pushBox(b, [x + 0.06, LAYOUT.walkHeight + 0.44, z - d / 2 - 0.05], [x + w / 2 - 0.14, LAYOUT.walkHeight + h - 0.4, z - d / 2 - 0.02], PALETTE.posterBlue, 0.004);
  // A bench under the roof.
  pushBox(b, [x - w / 2 + 0.1, LAYOUT.walkHeight + 0.42, z + 0.02], [x + w / 2 - 0.1, LAYOUT.walkHeight + 0.5, z + 0.3], [0.5, 0.4, 0.3], 0.008);
}

function vendingMachine(b: Builder, x: number, z: number, accent: readonly number[]) {
  const w = 0.52;
  const d = 0.95;
  const h = 1.92;
  pushBox(b, [x, 0.15, z - d / 2], [x + w, 0.15 + h, z + d / 2], PALETTE.vendingWhite, 0.014);
  // The lit product window.
  pushBox(b, [x + w - 0.04, 0.35, z - d / 2 + 0.08], [x + w + 0.02, 0.35 + h - 0.45, z + d / 2 - 0.08], [0.95, 0.88, 0.72], 0.008);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) {
      const px = x + w - 0.02;
      const pz = z - d / 2 + 0.14 + c * 0.16;
      const py = 0.45 + r * 0.34;
      const colors: Array<readonly number[]> = [
        [0.85, 0.25, 0.25], [0.3, 0.6, 0.8], [0.95, 0.8, 0.3],
        [0.4, 0.7, 0.4], [0.9, 0.5, 0.7],
      ];
      pushBox(b, [px, py, pz], [px + 0.05, py + 0.24, pz + 0.12], colors[(r * 5 + c) % 5], 0.004);
    }
  }
  // The lit brand panel and the delivery flap.
  pushBox(b, [x + w, 1.62, z - d / 2 + 0.06], [x + w + 0.03, 1.86, z + d / 2 - 0.06], accent, 0.01);
  pushBox(b, [x, 0.15, z - d / 2 - 0.03], [x + w, 0.32, z + d / 2 + 0.03], accent, 0.01);
  pushBox(b, [x - 0.02, 0.16, z - d / 2 + 0.1], [x + 0.06, 0.3, z + d / 2 - 0.1], PALETTE.steelDark, 0.006);
}

function bicycle(b: Builder, x: number, z: number, rot: number, color: readonly number[]) {
  const r = 0.34;
  const lift = 0.15;
  // Wheels.
  for (const offset of [-0.52, 0.52]) {
    const wx = x + Math.cos(rot) * offset;
    const wz = z + Math.sin(rot) * offset;
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const px = wx + Math.cos(a) * r;
      const pz = wz + Math.sin(a) * r;
      const py = lift + r + Math.sin(a) * r;
      pushBox(b, [px - 0.05, py - 0.05, pz - 0.05], [px + 0.05, py + 0.05, pz + 0.05], PALETTE.tire, 0.003);
    }
    pushBox(b, [wx - 0.04, lift + r - 0.04, wz - 0.04], [wx + 0.04, lift + r + 0.04, wz + 0.04], PALETTE.steelDark, 0.004);
  }
  // Frame.
  const fx = x + Math.cos(rot) * 0.1;
  const fz = z + Math.sin(rot) * 0.1;
  pushBox(b, [fx - 0.45, lift + r + 0.02, fz - 0.035], [fx + 0.3, lift + r + 0.12, fz + 0.035], color, 0.006);
  pushBox(b, [fx - 0.08, lift + r + 0.1, fz - 0.035], [fx + 0.06, lift + r + 0.75, fz + 0.035], color, 0.006);
  pushBox(b, [fx - 0.42, lift + r + 0.6, fz - 0.03], [fx - 0.3, lift + r + 0.72, fz + 0.03], PALETTE.steelDark, 0.005);
  // Handlebar and saddle.
  pushBox(b, [fx - 0.12, lift + r + 0.72, fz - 0.22], [fx - 0.04, lift + r + 0.8, fz + 0.22], PALETTE.steelDark, 0.005);
  pushBox(b, [fx - 0.3, lift + r + 0.76, fz - 0.08], [fx - 0.14, lift + r + 0.84, fz + 0.08], [0.26, 0.26, 0.3], 0.005);
  // Basket.
  pushBox(b, [fx + 0.24, lift + r + 0.24, fz - 0.16], [fx + 0.52, lift + r + 0.56, fz + 0.16], PALETTE.shelfGrey, 0.006);
}

/** A parked car, seen nose in. */
function car(b: Builder, x: number, z: number, rot: number, color: readonly number[]) {
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  const at = (lx: number, lz: number): [number, number] => [
    x + lx * cos - lz * sin,
    z + lx * sin + lz * cos,
  ];
  const halfW = 0.68;
  const halfL = 1.6;
  const body = (lx0: number, lz0: number, lx1: number, lz1: number, y0: number, y1: number, c: readonly number[]) => {
    const [ax, az] = at(lx0, lz0);
    const [bx, bz] = at(lx1, lz1);
    pushBox(
      b,
      [Math.min(ax, bx), y0, Math.min(az, bz)],
      [Math.max(ax, bx), y1, Math.max(az, bz)],
      c,
      0.012,
    );
  };

  // Sill, body and the boot.
  body(-halfW, -halfL, halfW, halfL, 0.32, 0.54, shade(color, 0.62));
  body(-halfW, -halfL, halfW, halfL, 0.54, 1.0, color);
  body(-halfW + 0.04, -halfL + 0.1, halfW - 0.04, -halfL + 0.9, 1.0, 1.12, color);
  // The greenhouse: a narrow cabin with a band of glazing down each side.
  body(-halfW + 0.16, -1.02, halfW - 0.16, 0.62, 1.0, 1.08, color);
  body(-halfW + 0.13, -0.9, halfW - 0.13, 0.5, 1.08, 1.42, color);
  body(-halfW + 0.11, -0.82, halfW - 0.11, 0.42, 1.16, 1.34, [0.14, 0.2, 0.28]);
  // The roof.
  body(-halfW + 0.15, -0.78, halfW - 0.15, 0.38, 1.42, 1.48, color);
  // Wheels.
  for (const lx of [-halfW - 0.01, halfW - 0.13]) {
    for (const lz of [-1.0, 0.62]) {
      const [wx, wz] = at(lx, lz);
      pushBox(b, [wx, 0.13, wz - 0.32], [wx + 0.14, 0.46, wz + 0.32], PALETTE.tire, 0.006);
    }
  }
  // Head and tail lamps.
  body(-halfW + 0.12, halfL - 0.06, halfW - 0.12, halfL + 0.02, 0.68, 0.84, [0.96, 0.94, 0.82]);
  body(-halfW + 0.12, -halfL - 0.02, halfW - 0.12, -halfL + 0.06, 0.68, 0.84, [0.85, 0.2, 0.18]);
}

function umbrellaRack(b: Builder, x: number, z: number) {
  pushBox(b, [x - 0.22, 0.15, z - 0.22], [x + 0.22, 0.28, z + 0.22], PALETTE.steelDark, 0.008);
  const colors = [PALETTE.umbrellaRed, PALETTE.umbrellaNavy, PALETTE.umbrellaWhite, PALETTE.umbrellaRed];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const ux = x + Math.cos(a) * 0.11;
    const uz = z + Math.sin(a) * 0.11;
    pushBox(b, [ux - 0.045, 0.28, uz - 0.045], [ux + 0.045, 0.9, uz + 0.045], PALETTE.steelDark, 0.005);
    pushBox(b, [ux - 0.06, 0.8, uz - 0.06], [ux + 0.06, 1.06, uz + 0.06], colors[i], 0.006);
  }
}

function bin(b: Builder, x: number, z: number, color: readonly number[]) {
  pushBox(b, [x - 0.22, 0.15, z - 0.22], [x + 0.22, 0.78, z + 0.22], color, 0.01);
  pushBox(b, [x - 0.25, 0.78, z - 0.25], [x + 0.25, 0.88, z + 0.25], shade(color, 0.8), 0.01);
  pushBox(b, [x - 0.12, 0.88, z - 0.12], [x + 0.12, 0.94, z + 0.12], [0.1, 0.11, 0.12], 0.006);
}

function streetLamp(b: Builder, x: number, z: number) {
  pushBox(b, [x - 0.09, 0.15, z - 0.09], [x + 0.09, 3.95, z + 0.09], PALETTE.poleConcrete, 0.012);
  pushBox(b, [x - 0.08, 3.5, z - 0.08], [x + 0.08, 3.95, z + 0.08], PALETTE.steelDark, 0.01);
  pushBox(b, [x - 0.46, 3.85, z - 0.18], [x + 0.1, 4.02, z + 0.18], PALETTE.steelDark, 0.01);
  pushBox(b, [x - 0.48, 3.72, z - 0.16], [x - 0.28, 3.85, z + 0.16], PALETTE.lampWarm, 0.008);
  pushBox(b, [x - 0.2, 0.15, z - 0.2], [x + 0.2, 0.3, z + 0.2], PALETTE.steelDark, 0.008);
}

function trafficSignal(b: Builder, x: number, z: number) {
  pushBox(b, [x - 0.1, 0.15, z - 0.1], [x + 0.1, 3.0, z + 0.1], PALETTE.poleConcrete, 0.012);
  pushBox(b, [x - 0.22, 2.3, z - 0.18], [x + 0.22, 3.05, z + 0.18], [0.16, 0.17, 0.19], 0.012);
  pushBox(b, [x - 0.16, 2.95, z - 0.14], [x + 0.16, 3.1, z + 0.14], PALETTE.steelDark, 0.008);
  // Three dark lens recesses; the lit lenses are separate meshes.
  for (let i = 0; i < 3; i++) {
    const y = 2.74 - i * 0.18;
    pushBox(b, [x - 0.08, y, z + 0.14], [x + 0.08, y + 0.14, z + 0.2], [0.07, 0.08, 0.09], 0.004);
  }
}

function utilityPole(b: Builder, x: number, z: number) {
  pushBox(b, [x - 0.14, 0.15, z - 0.14], [x + 0.14, 5.4, z + 0.14], PALETTE.poleConcrete, 0.012);
  for (let i = 0; i < 3; i++) {
    const y = 4.4 + i * 0.34;
    pushBox(b, [x - 0.5, y, z - 0.05], [x + 0.5, y + 0.08, z + 0.05], PALETTE.poleConcrete, 0.008);
    for (const s of [-1, 1]) {
      pushBox(b, [x + s * 0.42 - 0.05, y - 0.12, z - 0.05], [x + s * 0.42 + 0.05, y + 0.2, z + 0.05], [0.3, 0.42, 0.5], 0.005);
    }
  }
  pushBox(b, [x - 0.18, 0.15, z - 0.18], [x + 0.18, 0.4, z + 0.18], [0.4, 0.42, 0.44], 0.008);
}

function roadSign(b: Builder, x: number, z: number, color: readonly number[], size: number) {
  pushBox(b, [x - 0.05, 0.15, z - 0.05], [x + 0.05, 2.1, z + 0.05], PALETTE.steelDark, 0.008);
  pushBox(b, [x - 0.04, 1.85, z - 0.04], [x + 0.04, 2.1, z + 0.04], PALETTE.steelDark, 0.006);
  pushBox(b, [x - size / 2, 1.95, z - 0.04], [x + size / 2, 1.95 + size * 0.72, z + 0.04], color, 0.01);
  pushBox(b, [x - size / 2 + 0.06, 2.05, z + 0.03], [x + size / 2 - 0.06, 2.05 + size * 0.5, z + 0.05], PALETTE.signWhitePlate, 0.006);
}

function guardrail(b: Builder, x0: number, z0: number, x1: number, z1: number) {
  const length = Math.hypot(x1 - x0, z1 - z0);
  const steps = Math.max(1, Math.round(length / 0.5));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + (x1 - x0) * t;
    const z = z0 + (z1 - z0) * t;
    pushBox(b, [x - 0.05, 0.15, z - 0.05], [x + 0.05, 0.95, z + 0.05], PALETTE.guardrail, 0.008);
  }
  pushBox(b, [x0 - 0.04, 0.75, z0 - 0.04], [x1 + 0.04, 0.9, z1 + 0.04], PALETTE.guardrail, 0.008);
}

/** A poster board standing on the pavement, facing the road. */
function noticeBoard(b: Builder, x: number, z: number, y: number) {
  pushBox(b, [x - 0.05, y - 0.7, z - 0.06], [x + 0.05, y + 0.7, z + 0.02], [0.3, 0.34, 0.38], 0.01);
  pushBox(b, [x - 0.52, y - 0.72, z - 0.08], [x + 0.52, y + 0.72, z + 0.04], [0.22, 0.25, 0.3], 0.01);
  const colors = [PALETTE.posterPink, PALETTE.posterYellow, PALETTE.posterBlue, PALETTE.signWhitePlate];
  for (let i = 0; i < 4; i++) {
    const px = x - 0.44 + (i % 2) * 0.46;
    const py = y - 0.58 + Math.floor(i / 2) * 0.58;
    pushBox(b, [px, py, z + 0.04], [px + 0.4, py + 0.48, z + 0.07], colors[i], 0.004);
  }
}
