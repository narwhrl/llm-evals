/**
 * The ground of the map.
 *
 * A square concrete plinth carries a wet asphalt yard, raised concrete pads
 * for the two bomb sites and the two spawns, the painted bomb markers, the
 * road markings and the drainage channels.
 */

import { BOMBS, MAP } from "./layout";
import { PALETTE } from "./palette";
import { pushBox, pushPlate, type Builder } from "./voxel";

export interface GroundResult {
  /** Patches of standing water, as world positions and radii. */
  puddles: Array<[number, number, number, number]>;
  /** The wet asphalt, drawn as a translucent film over the reflective ground. */
  wet: Builder;
  /** The opaque ground: plinth, pads, markings and drains. */
  builder: Builder;
}

export function buildGround(): GroundResult {
  const b: Builder = {
    positions: [], normals: [], uvs: [], colors: [],
    oPositions: [], oNormals: [], oColors: [],
  };
  const wet: Builder = {
    positions: [], normals: [], uvs: [], colors: [],
    oPositions: [], oNormals: [], oColors: [],
  };
  const H = MAP.half;
  const puddles: Array<[number, number, number, number]> = [];

  // ------------------------------------------------------------------ plinth
  pushBox(b, [-H - 0.3, -0.62, -H - 0.3], [H + 0.3, -0.18, H + 0.3], PALETTE.plinth, 0.02);
  pushBox(b, [-H - 0.14, -0.18, -H - 0.14], [H + 0.14, 0, H + 0.14], PALETTE.plinthEdge, 0.014);
  // A recessed band around the sides of the plinth.
  pushBox(b, [-H - 0.31, -0.5, -H - 0.31], [H + 0.31, -0.44, H + 0.31], PALETTE.plinthEdge, 0.008);

  // The maker plate on the front of the plinth.
  pushBox(b, [-1.5, -0.52, H + 0.28], [1.5, -0.26, H + 0.36], PALETTE.steelDark, 0.01);
  pushBox(b, [-1.38, -0.46, H + 0.35], [0.2, -0.32, H + 0.39], PALETTE.brass, 0.006);
  pushBox(b, [0.36, -0.44, H + 0.35], [1.38, -0.34, H + 0.39], PALETTE.steelLight, 0.006);

  // --------------------------------------------------------------- the yard
  // Wet asphalt over the whole plate, split around the open sewer channel.
  const s = MAP.sewer;
  pushBox(wet, [-H, -0.06, -H], [s.x0, 0.012, H], PALETTE.asphalt, 0);
  pushBox(wet, [s.x1, -0.06, -H], [H, 0.012, H], PALETTE.asphalt, 0);
  pushBox(wet, [s.x0, -0.06, -H], [s.x1, 0.012, s.z0], PALETTE.asphalt, 0);
  pushBox(wet, [s.x0, -0.06, s.z1], [s.x1, 0.012, H], PALETTE.asphalt, 0);

  // The concrete pads.
  const pad = (x0: number, z0: number, x1: number, z1: number, y: number, color: readonly number[]) => {
    pushBox(b, [x0, 0, z0], [x1, y, z1], color, 0.01);
  };
  pad(MAP.aSite.x0, MAP.aSite.z0, MAP.aSite.x1, MAP.aSite.z1, 0.08, PALETTE.concreteWorn);
  pad(MAP.bSite.x0, MAP.bSite.z0, MAP.bSite.x1, MAP.bSite.z1, 0.08, PALETTE.concreteWorn);
  pad(MAP.ctSpawn.x0, MAP.ctSpawn.z0, MAP.ctSpawn.x1, MAP.ctSpawn.z1, 0.1, PALETTE.concrete);
  pad(MAP.tSpawn.x0, MAP.tSpawn.z0, MAP.tSpawn.x1, MAP.tSpawn.z1, MAP.tSpawn.y, PALETTE.concreteDark);

  // The ramp down from the terrorist spawn into mid.
  for (let i = 0; i < 9; i++) {
    const t = i / 9;
    const y = MAP.tSpawn.y * (1 - t);
    pushBox(b, [-2.1, 0, -4.4 + i * 0.42], [2.1, y, -4.0 + i * 0.42], PALETTE.concreteDark, 0.01);
  }
  // The kerb along the ramp.
  for (let i = 0; i < 9; i++) {
    const t = i / 9;
    const y = MAP.tSpawn.y * (1 - t);
    pushBox(b, [2.1, 0, -4.4 + i * 0.42], [2.35, y + 0.1, -4.0 + i * 0.42], PALETTE.concrete, 0.008);
    pushBox(b, [-2.35, 0, -4.4 + i * 0.42], [-2.1, y + 0.1, -4.0 + i * 0.42], PALETTE.concrete, 0.008);
  }

  // ------------------------------------------------------- bomb site markers
  const mark = (cx: number, cz: number, w: number, d: number, y0: number) => {
    const t = 0.12;
    const y1 = y0 + 0.014;
    pushPlate(b, [cx - w / 2, y0, cz - d / 2], [cx + w / 2, y1, cz - d / 2 + t], PALETTE.graffitiWhite, 0);
    pushPlate(b, [cx - w / 2, y0, cz + d / 2 - t], [cx + w / 2, y1, cz + d / 2], PALETTE.graffitiWhite, 0);
    pushPlate(b, [cx - w / 2, y0, cz - d / 2], [cx - w / 2 + t, y1, cz + d / 2], PALETTE.graffitiWhite, 0);
    pushPlate(b, [cx + w / 2 - t, y0, cz - d / 2], [cx + w / 2, y1, cz + d / 2], PALETTE.graffitiWhite, 0);
    // The letter bars in the middle of the mark.
    pushPlate(b, [cx - 0.5, y0, cz - 0.07], [cx - 0.16, y1, cz + 0.07], PALETTE.graffitiWhite, 0);
    pushPlate(b, [cx + 0.16, y0, cz - 0.07], [cx + 0.5, y1, cz + 0.07], PALETTE.graffitiWhite, 0);
  };
  mark(BOMBS.a.x, BOMBS.a.z, BOMBS.a.w, BOMBS.a.d, 0.128);
  mark(BOMBS.b.x, BOMBS.b.z, BOMBS.b.w, BOMBS.b.d, 0.098);

  // --------------------------------------------------------- road markings
  for (let i = 0; i < 8; i++) {
    const x = -6.2 + i * 1.6;
    pushPlate(b, [x, 0.014, 1.5], [x + 0.8, 0.024, 1.62], PALETTE.graffitiYellow, 0);
  }
  for (let i = 0; i < 4; i++) {
    const z = 3.9 + i * 0.42;
    pushPlate(b, [-0.9, 0.014, z], [0.9, 0.024, z + 0.24], PALETTE.graffitiWhite, 0);
  }
  // Parking bay lines on the counter-terrorist pad.
  for (let i = 0; i < 4; i++) {
    const x = -4.6 + i * 2.2;
    pushPlate(b, [x, 0.104, 4.0], [x + 0.08, 0.114, 6.0], PALETTE.graffitiWhite, 0);
  }

  // ----------------------------------------------------------- the drainage
  // A long channel down the west side of mid with a rusty grate over it.
  pushPlate(b, [MAP.mid.x0 + 0.15, 0.004, MAP.mid.z0], [MAP.mid.x0 + 0.75, 0.03, MAP.mid.z1 - 0.2], PALETTE.drain, 0);
  for (let i = 0; i < 16; i++) {
    const z = MAP.mid.z0 + 0.1 + i * 0.42;
    if (z > MAP.mid.z1 - 0.4) break;
    pushPlate(b, [MAP.mid.x0 + 0.2, 0.032, z], [MAP.mid.x0 + 0.7, 0.046, z + 0.3], PALETTE.grate, 0);
  }
  // A channel along the base of the A site wall.
  pushPlate(b, [MAP.aSite.x0, 0.004, -4.3], [MAP.aSite.x0 + 0.3, 0.03, 0.4], PALETTE.drain, 0);
  pushPlate(b, [MAP.bSite.x1 - 0.3, 0.004, -4.3], [MAP.bSite.x1, 0.03, 0.4], PALETTE.drain, 0);

  // ------------------------------------------------------------- the puddles
  const pools: Array<[number, number, number, number]> = [
    [-1.3, 1.2, 1.3, 0.9],
    [1.6, -2.4, 0.9, 1.4],
    [-4.4, 0.2, 1.6, 1.0],
    [4.2, 0.4, 1.2, 0.8],
    [0.2, 2.0, 1.1, 0.7],
    [-3.0, -3.2, 1.0, 0.8],
    [5.4, -2.6, 1.3, 1.0],
    [-0.4, -1.0, 0.8, 0.6],
    [2.6, 4.4, 1.2, 0.9],
    [-5.6, 2.2, 0.9, 1.1],
  ];
  puddles.push(...pools);

  return { puddles, wet, builder: b };
}
