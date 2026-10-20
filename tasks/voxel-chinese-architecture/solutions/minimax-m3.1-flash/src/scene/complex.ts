/**
 * The layout of the complex.
 *
 * Everything sits on one north-south axis: the mountain gate at the front, a
 * paved courtyard in the middle, and the main hall at the back. The two side
 * halls mirror each other across the axis, and the pagoda and the bell tower
 * balance the front corners of the enclosure.
 */

import { buildBuilding, buildPagoda, buildTower, type BuildingOptions } from "./building";
import {
  buildBalustrade,
  buildCenser,
  buildLantern,
  buildLion,
  buildPavilion,
  buildPine,
  buildStele,
  buildWall,
} from "./props";
import type { Box } from "./voxel";

export interface ComplexOptions {
  /** Roofs use glazed green tiles instead of grey ones. */
  glazed: boolean;
  /** How large the mountain gate is. */
  gateScale: number;
}

export interface ComplexLayout {
  boxes: Box[];
  /** Camera framing for the whole complex. */
  focus: { x: number; y: number; z: number };
  radius: number;
}

const AXIS = 0;

function hall(
  partial: Partial<BuildingOptions> & Pick<BuildingOptions, "x" | "z" | "width" | "depth">,
): BuildingOptions {
  return {
    platform: 3,
    wallHeight: 9,
    roof: "hipAndGable",
    rise: 11,
    overhang: 3,
    ridgeRatio: 0.42,
    bay: 6,
    upturn: 3,
    glazed: false,
    openCenter: 0,
    frontDoor: true,

    ...partial,
  };
}

export function buildComplex(options: ComplexOptions): ComplexLayout {
  const boxes: Box[] = [];

  // ------------------------------------------------------------- main hall
  const mainHall = hall({
    x: AXIS,
    z: -50,
    width: 46,
    depth: 26,
    platform: 4.5,
    wallHeight: 11,
    rise: 13,
    overhang: 4,
    bay: 6,
    upturn: 6,
    glazed: options.glazed,
    roof: "hipAndGable",
  });
  boxes.push(...buildBuilding(mainHall));
  boxes.push(
    ...buildBalustrade(
      mainHall.x - mainHall.width / 2 - 1.5,
      mainHall.z - mainHall.depth / 2 - 1.5,
      mainHall.x + mainHall.width / 2 + 1.5,
      mainHall.z + mainHall.depth / 2 + 1.5,
      mainHall.platform,
    ),
  );

  // ------------------------------------------------------------ side halls
  for (const side of [-1, 1]) {
    const sideHall = hall({
      x: side * 46,
      z: -20,
      width: 26,
      depth: 18,
      platform: 2.5,
      wallHeight: 8,
      rise: 9,
      overhang: 3,
      bay: 6,
      upturn: 4,
      glazed: options.glazed,
      roof: "hip",
      ridgeRatio: 0.5,
      frontDoor: true,
    });
    boxes.push(...buildBuilding(sideHall));
  }

  // --------------------------------------------------------- mountain gate
  const gate = hall({
    x: AXIS,
    z: 80,
    width: Math.round(28 * options.gateScale),
    depth: Math.round(13 * options.gateScale),
    platform: 2.5,
    wallHeight: 8,
    rise: 10,
    overhang: 3,
    bay: 5,
    upturn: 5,
    glazed: options.glazed,
    roof: "hip",
    ridgeRatio: 0.46,
    openCenter: Math.round(9 * options.gateScale),
    frontDoor: false,
  });
  boxes.push(...buildBuilding(gate));

  // ------------------------------------------------------------- pagoda
  boxes.push(
    ...buildPagoda({
      x: 48,
      z: 64,
      width: 16,
      depth: 16,
      platform: 2.5,
      wallHeight: 6,
      rise: 7,
      overhang: 2.5,
      ridgeRatio: 0.4,
      bay: 5,
      upturn: 3,
      glazed: options.glazed,
      openCenter: 0,
      frontDoor: false,
      tiers: 4,
    }),
  );

  // ------------------------------------------------------ bell/drum tower
  boxes.push(
    ...buildTower({
      x: -48,
      z: 64,
      width: 14,
      depth: 14,
      platform: 5,
      wallHeight: 8,
      rise: 8,
      overhang: 2.5,
      ridgeRatio: 0.4,
      bay: 5,
      upturn: 3,
      glazed: options.glazed,
      openCenter: 0,
      frontDoor: false,
    }),
  );

  // ------------------------------------------------------ enclosure wall
  boxes.push(...buildWall(-74, -74, 74, 98, 6.5, 9));

  // ------------------------------------------------------ stone lions
  boxes.push(...buildLion(-8, 92, 1));
  boxes.push(...buildLion(8, 92, -1));

  // ------------------------------------------------------ censers on axis
  boxes.push(...buildCenser(-13, -30));
  boxes.push(...buildCenser(13, -30));

  // ------------------------------------------------------ steles on axis
  boxes.push(...buildStele(-15, -8));
  boxes.push(...buildStele(15, -8));

  // ------------------------------------------- pavilions in the courtyard
  boxes.push(...buildPavilion(-30, 44, 0.85));
  boxes.push(...buildPavilion(30, 44, 0.85));
  boxes.push(...buildPavilion(-30, 4, 0.85));
  boxes.push(...buildPavilion(30, 4, 0.85));

  // ---------------------------------------------------------- lanterns
  for (const z of [66, 54, 42, 30, 18, 6, -6, -18]) {
    boxes.push(...buildLantern(-9, z));
    boxes.push(...buildLantern(9, z));
  }

  // ------------------------------------------------------------- pines
  const pineSpots: Array<[number, number, number]> = [
    [-64, 84, 1.25], [-64, 62, 1.1], [-64, 40, 1.3], [-64, 16, 1.05],
    [-64, -8, 1.2], [-64, -34, 1.15], [-64, -60, 1.0],
    [64, 84, 1.25], [64, 62, 1.1], [64, 40, 1.3], [64, 16, 1.05],
    [64, -8, 1.2], [64, -34, 1.15], [64, -60, 1.0],
    [-30, 92, 1.1], [30, 92, 1.1],
    [-24, -66, 1.15], [24, -66, 1.15], [0, -66, 1.0],
    [-70, 0, 1.0], [70, 0, 1.0],
  ];
  pineSpots.forEach(([x, z, s], index) => {
    boxes.push(...buildPine(x, z, s, index));
  });

  return {
    boxes,
    focus: { x: 0, y: 12, z: 10 },
    radius: 150,
  };
}
