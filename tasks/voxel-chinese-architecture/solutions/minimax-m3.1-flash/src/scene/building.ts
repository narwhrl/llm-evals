/**
 * Parametric Chinese classical buildings.
 *
 * A hall is assembled from the same parts every time: a stone platform with
 * steps, a ring of wooden columns, red walls between them, bracket sets
 * (dougong) above the columns and a tiled roof with upturned eaves.
 *
 * The roof is the part that carries the style, so it is generated from a
 * height field rather than from a fixed shape. A hip roof is the intersection
 * of four half-spaces, which in a height field is simply the larger of the
 * two slope distances. A gable roof drops the hip constraint. A hip-and-gable
 * roof applies the hip only below the break line, so the upper part ends in
 * a vertical gable. The corner upturn is added afterwards as a lift that
 * falls off with the distance to the eave corner.
 */

import { PALETTE, mixColor, shade } from "./palette";
import type { Box } from "./voxel";

export type RoofType = "hip" | "hipAndGable" | "pyramidal" | "gable";

export interface BuildingOptions {
  x: number;
  z: number;
  /** Footprint of the walls, in cells. */
  width: number;
  depth: number;
  /** Height of the stone platform. */
  platform: number;
  /** Height of the columns, measured from the platform. */
  wallHeight: number;
  roof: RoofType;
  /** Height of the roof above the eaves. */
  rise: number;
  /** How far the eaves reach past the wall, in cells. */
  overhang: number;
  /** Ridge length as a fraction of the width; 0 gives a pyramidal roof. */
  ridgeRatio: number;
  /** Distance between two columns, in cells. */
  bay: number;
  /** How far the eave corner is lifted, in cells. */
  upturn: number;
  glazed: boolean;
  /** Width of the open passage through the middle, 0 for a closed wall. */
  openCenter: number;
  /** Put a door and a pair of lattice windows on the front face. */
  frontDoor: boolean;
  /** Whether the hall carries a flight of steps on its front. */
  withSteps?: boolean;
}

interface RoofPalette {
  tile: readonly number[];
  tileLight: readonly number[];
  tileDark: readonly number[];
}

function roofPalette(glazed: boolean): RoofPalette {
  return glazed
    ? {
        tile: PALETTE.tileGreen,
        tileLight: PALETTE.tileGreenLight,
        tileDark: PALETTE.tileGreenDark,
      }
    : {
        tile: PALETTE.tileGrey,
        tileLight: PALETTE.tileGreyLight,
        tileDark: PALETTE.tileGreyDark,
      };
}

function box(
  min: [number, number, number],
  max: [number, number, number],
  color: readonly number[],
): Box {
  return { min, max, color };
}

/** Deterministic per-cell jitter so the tiles are not perfectly uniform. */
function jitter(x: number, z: number, salt = 0): number {
  const n = Math.sin(x * 127.1 + z * 311.7 + salt * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

export function buildBuilding(options: BuildingOptions): Box[] {
  const boxes: Box[] = [];
  const palette = roofPalette(options.glazed);
  const halfW = options.width / 2;
  const halfD = options.depth / 2;
  const roofHalfX = halfW + options.overhang;
  const roofHalfZ = halfD + options.overhang;
  const ridgeHalf = options.ridgeRatio * halfW;
  const eaveY = options.platform + options.wallHeight;

  // ---------------------------------------------------------------- platform
  const platPad = 1.5;
  boxes.push(
    box(
      [options.x - halfW - platPad, 0, options.z - halfD - platPad],
      [options.x + halfW + platPad, options.platform - 0.6, options.z + halfD + platPad],
      PALETTE.stone,
    ),
  );
  // Moulding around the top of the platform.
  boxes.push(
    box(
      [options.x - halfW - platPad, options.platform - 0.6, options.z - halfD - platPad],
      [options.x + halfW + platPad, options.platform, options.z + halfD + platPad],
      PALETTE.stoneLight,
    ),
  );
  // Steps down the front, centred on the axis.
  const stepCount = Math.max(2, Math.round(options.platform));
  if (options.withSteps !== false) {
    for (let s = 0; s < stepCount; s++) {
      const y = options.platform - (s + 1) * (options.platform / stepCount);
      const width = 5 + s * 0.6;
      boxes.push(
        box(
          [options.x - width, y, options.z + halfD + platPad - 0.2 + s * 0.5],
          [options.x + width, y + options.platform / stepCount, options.z + halfD + platPad + 0.3],
          PALETTE.stoneLight,
        ),
      );
    }
  }
  // Floor inside the hall.
  boxes.push(
    box(
      [options.x - halfW, options.platform, options.z - halfD],
      [options.x + halfW, options.platform + 0.2, options.z + halfD],
      PALETTE.woodDark,
    ),
  );

  // ------------------------------------------------------------------ walls
  const wallTop = eaveY - 1.2;
  const wallHeight = wallTop - options.platform;
  const openHalf = options.openCenter / 2;
  const doorHalf = 2;

  const wallPanel = (
    axis: "x" | "z",
    from: number,
    to: number,
    fixed: number,
  ) => {
    const isFront: boolean = axis === "z" && fixed > options.z;
    for (let t = from; t < to; t++) {
      const centre = t + 0.5;
      const isCorner = Math.abs(centre - (from + to) / 2) > (to - from) / 2 - 1.2;
      if (isCorner) {
        // Corner piers are square and slightly deeper.
        boxes.push(
          box(
            axis === "x"
              ? [t, options.platform, fixed - 0.6]
              : [fixed - 0.6, options.platform, t],
            axis === "x"
              ? [t + 1.2, wallTop, fixed + 0.6]
              : [fixed + 0.6, wallTop, t + 1.2],
            PALETTE.wallRedDark,
          ),
        );
        continue;
      }
      const inPassage =
        isFront && options.openCenter > 0 && Math.abs(centre - options.z) < openHalf;
      if (inPassage) {
        // A lintel spans the passage; the ground below stays open.
        boxes.push(
          box(
            axis === "x"
              ? [t, options.platform + 6, fixed - 0.5]
              : [fixed - 0.5, options.platform + 6, t],
            axis === "x"
              ? [t + 1, wallTop, fixed + 0.5]
              : [fixed + 0.5, wallTop, t + 1],
            PALETTE.wallRed,
          ),
        );
        continue;
      }
      const isDoor =
        options.frontDoor && isFront && Math.abs(centre - options.z) < doorHalf;
      const color = isDoor ? PALETTE.door : PALETTE.wallRed;
      boxes.push(
        box(
          axis === "x"
            ? [t, options.platform, fixed - 0.5]
            : [fixed - 0.5, options.platform, t],
          axis === "x"
            ? [t + 1, wallTop, fixed + 0.5]
            : [fixed + 0.5, wallTop, t + 1],
          color,
        ),
      );
    }

    // Lattice windows, one per bay.
    const span = to - from;
    const count = Math.max(1, Math.floor(span / 6));
    for (let w = 0; w < count; w++) {
      const wc = from + ((w + 0.5) * span) / count;
      if (isFront && options.frontDoor && Math.abs(wc - options.z) < doorHalf + 2) continue;
      if (isFront && options.openCenter > 0 && Math.abs(wc - options.z) < openHalf + 2) continue;
      boxes.push(
        box(
          axis === "x"
            ? [wc - 1.3, options.platform + wallHeight * 0.45, fixed - 0.7]
            : [fixed - 0.7, options.platform + wallHeight * 0.45, wc - 1.3],
          axis === "x"
            ? [wc + 1.3, options.platform + wallHeight * 0.85, fixed + 0.7]
            : [fixed + 0.7, options.platform + wallHeight * 0.85, wc + 1.3],
          PALETTE.window,
        ),
      );
      // Lattice bars.
      for (let b = -1; b <= 1; b++) {
        boxes.push(
          box(
            axis === "x"
              ? [wc + b * 0.8 - 0.12, options.platform + wallHeight * 0.45, fixed - 0.75]
              : [fixed - 0.75, options.platform + wallHeight * 0.45, wc + b * 0.8 - 0.12],
            axis === "x"
              ? [wc + b * 0.8 + 0.12, options.platform + wallHeight * 0.85, fixed + 0.75]
              : [fixed + 0.75, options.platform + wallHeight * 0.85, wc + b * 0.8 + 0.12],
            PALETTE.woodDark,
          ),
        );
      }
    }
  };

  wallPanel("x", options.x - halfW, options.x + halfW, options.z - halfD);
  wallPanel("x", options.x - halfW, options.x + halfW, options.z + halfD);
  wallPanel("z", options.z - halfD, options.z + halfD, options.x - halfW);
  wallPanel("z", options.z - halfD, options.z + halfD, options.x + halfW);

  // ---------------------------------------------------------------- columns
  const columnPositions: Array<[number, number]> = [];
  const columnSize = 1.4;
  const baysX = Math.max(2, Math.round(options.width / options.bay));
  const baysZ = Math.max(2, Math.round(options.depth / options.bay));
  for (let i = 0; i <= baysX; i++) {
    const cx = options.x - halfW + (i * options.width) / baysX;
    columnPositions.push([cx, options.z - halfD], [cx, options.z + halfD]);
  }
  for (let j = 1; j < baysZ; j++) {
    const cz = options.z - halfD + (j * options.depth) / baysZ;
    columnPositions.push([options.x - halfW, cz], [options.x + halfW, cz]);
  }

  for (const [cx, cz] of columnPositions) {
    boxes.push(
      box(
        [cx - columnSize / 2, options.platform, cz - columnSize / 2],
        [cx + columnSize / 2, eaveY - 1.2, cz + columnSize / 2],
        PALETTE.wood,
      ),
    );
    // Stone column base.
    boxes.push(
      box(
        [cx - columnSize / 2 - 0.25, options.platform, cz - columnSize / 2 - 0.25],
        [cx + columnSize / 2 + 0.25, options.platform + 0.8, cz + columnSize / 2 + 0.25],
        PALETTE.stoneLight,
      ),
    );
  }

  // ---------------------------------------------------------------- dougong
  // Bracket sets: a block above the column with arms reaching outwards.
  for (const [cx, cz] of columnPositions) {
    const outwardX = Math.abs(cx - options.x) > halfW - 1.5;
    const outwardZ = Math.abs(cz - options.z) > halfD - 1.5;
    const armX = outwardX ? 1.1 : 0;
    const armZ = outwardZ ? 1.1 : 0;
    boxes.push(
      box(
        [cx - columnSize / 2 - 0.2, eaveY - 1.2, cz - columnSize / 2 - 0.2],
        [cx + columnSize / 2 + 0.2, eaveY - 0.6, cz + columnSize / 2 + 0.2],
        PALETTE.woodLight,
      ),
    );
    boxes.push(
      box(
        [
          cx - columnSize / 2 - 0.2 - armX,
          eaveY - 0.6,
          cz - columnSize / 2 - 0.2 - armZ,
        ],
        [
          cx + columnSize / 2 + 0.2 + armX,
          eaveY,
          cz + columnSize / 2 + 0.2 + armZ,
        ],
        PALETTE.woodLight,
      ),
    );
    boxes.push(
      box(
        [
          cx - columnSize / 2 - 0.1 - armX * 1.6,
          eaveY,
          cz - columnSize / 2 - 0.1 - armZ * 1.6,
        ],
        [
          cx + columnSize / 2 + 0.1 + armX * 1.6,
          eaveY + 0.55,
          cz + columnSize / 2 + 0.1 + armZ * 1.6,
        ],
        PALETTE.wood,
      ),
    );
  }

  // ------------------------------------------------------------------- roof
  const roofHeight = (i: number, j: number): number => {
    const ax = Math.abs(i) / roofHalfX;
    const az = Math.abs(j) / roofHalfZ;
    let t: number;
    if (options.roof === "pyramidal") {
      t = Math.max(ax, az);
    } else if (options.roof === "gable") {
      t = az;
    } else {
      const hipT =
        ridgeHalf > 0
          ? Math.max(0, (Math.abs(i) - ridgeHalf) / (roofHalfX - ridgeHalf))
          : 1;
      if (options.roof === "hipAndGable" && az < 0.45) {
        t = az;
      } else {
        t = Math.max(az, hipT);
      }
    }
    return eaveY + options.rise * (1 - t);
  };

  const reach = options.upturn * 3 + 2;
  const cornerLift = (i: number, j: number, h: number): number => {
    let best = 0;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const d = Math.abs(i - sx * roofHalfX) + Math.abs(j - sz * roofHalfZ);
        const f = Math.max(0, 1 - d / reach);
        best = Math.max(best, f * f);
      }
    }
    const heightFactor = Math.max(0, Math.min(1, 1 - (h - eaveY) / 3));
    return options.upturn * best * heightFactor;
  };

  const ix0 = Math.floor(-roofHalfX);
  const ix1 = Math.ceil(roofHalfX);
  const iz0 = Math.floor(-roofHalfZ);
  const iz1 = Math.ceil(roofHalfZ);
  const heightAt: number[][] = [];

  for (let i = ix0; i < ix1; i++) {
    heightAt[i - ix0] = [];
    for (let j = iz0; j < iz1; j++) {
      const raw = roofHeight(i + 0.5, j + 0.5);
      const lift = cornerLift(i + 0.5, j + 0.5, raw);
      heightAt[i - ix0][j - iz0] = Math.round(raw + lift);
    }
  }

  for (let i = ix0; i < ix1; i++) {
    for (let j = iz0; j < iz1; j++) {
      const h = heightAt[i - ix0][j - iz0];
      if (h <= eaveY) continue;
      const t = jitter(i, j, 3);
      const color =
        t > 0.86
          ? palette.tileLight
          : t < 0.14
            ? palette.tileDark
            : palette.tile;
      // Solid roof mass: the slope is a staircase of one-block steps.
      boxes.push(
        box(
          [options.x + i, eaveY, options.z + j],
          [options.x + i + 1, h, options.z + j + 1],
          color,
        ),
      );
    }
  }

  // Eave board: a darker fascia along the outer edge of the roof.
  for (let i = ix0; i < ix1; i++) {
    for (const j of [iz0, iz1 - 1]) {
      const h = heightAt[i - ix0][j - iz0];
      boxes.push(
        box(
          [options.x + i, h - 1.1, options.z + j],
          [options.x + i + 1, h, options.z + j + 1],
          palette.tileDark,
        ),
      );
    }
  }
  for (let j = iz0; j < iz1; j++) {
    for (const i of [ix0, ix1 - 1]) {
      const h = heightAt[i - ix0][j - iz0];
      boxes.push(
        box(
          [options.x + i, h - 1.1, options.z + j],
          [options.x + i + 1, h, options.z + j + 1],
          palette.tileDark,
        ),
      );
    }
  }

  // Ridge and its ornaments.
  if (options.roof === "pyramidal") {
    const apex = Math.round(eaveY + options.rise);
    boxes.push(
      box(
        [options.x - 1, apex, options.z - 1],
        [options.x + 1, apex + 2.4, options.z + 1],
        palette.tileDark,
      ),
    );
    boxes.push(
      box(
        [options.x - 0.5, apex + 2.4, options.z - 0.5],
        [options.x + 0.5, apex + 5, options.z + 0.5],
        PALETTE.gold,
      ),
    );
  } else {
    const ridgeSpan = options.roof === "gable" ? roofHalfX : ridgeHalf;
    for (let i = Math.ceil(-ridgeSpan); i <= Math.floor(ridgeSpan); i++) {
      const h = Math.round(eaveY + options.rise);
      boxes.push(
        box(
          [options.x + i, h, options.z - 0.7],
          [options.x + i + 1, h + 1.5, options.z + 0.7],
          palette.tileDark,
        ),
      );
    }
    // Hip ridges: the raised diagonal where the roof turns over the corner.
    if (options.roof !== "gable" && ridgeHalf > 0) {
      const start = options.roof === "hipAndGable" ? 0.45 : 0;
      const steps = Math.ceil((1 - start) * (roofHalfX - ridgeHalf) + roofHalfZ);
      for (let s = 0; s <= steps; s++) {
        const t = start + ((1 - start) * s) / steps;
        const hx = ridgeHalf + t * (roofHalfX - ridgeHalf);
        const hz = t * roofHalfZ;
        const h = Math.round(eaveY + options.rise * (1 - t));
        for (const sz of [-1, 1]) {
          boxes.push(
            box(
              [options.x + hx - 0.6, h - 0.2, options.z + sz * hz - 0.6],
              [options.x + hx + 0.6, h + 0.9, options.z + sz * hz + 0.6],
              palette.tileDark,
            ),
          );
        }
      }
    }
    for (const side of [-1, 1]) {
      const h = Math.round(eaveY + options.rise);
      const rx = options.x + side * ridgeSpan;
      boxes.push(
        box(
          [rx - 0.8, h, options.z - 0.9],
          [rx + 0.8, h + 3.4, options.z + 0.9],
          PALETTE.goldDark,
        ),
      );
      boxes.push(
        box(
          [rx - 0.5, h + 3.4, options.z - 0.6],
          [rx + 0.5, h + 4.6, options.z + 0.6],
          PALETTE.gold,
        ),
      );
    }
  }

  return boxes;
}

/** A multi-storey pagoda: stacked shrinking storeys with their own roofs. */
export function buildPagoda(
  options: Omit<BuildingOptions, "roof"> & { tiers: number },
): Box[] {
  const boxes: Box[] = [];
  let y = 0;
  let width = options.width;
  let depth = options.depth;
  for (let tier = 0; tier < options.tiers; tier++) {
    const wallHeight = options.wallHeight * (1 - tier * 0.1);
    const rise = options.rise * (1 - tier * 0.08);
    const platform = tier === 0 ? options.platform : 1.2;
    const storey = buildBuilding({
      ...options,
      x: options.x,
      z: options.z,
      width: Math.round(width),
      depth: Math.round(depth),
      platform,
      wallHeight,
      rise,
      roof: tier === options.tiers - 1 ? "pyramidal" : "hipAndGable",
      ridgeRatio: tier === options.tiers - 1 ? 0 : options.ridgeRatio,
      openCenter: 0,
      frontDoor: false,
      withSteps: tier === 0,
    });
    // The storey is built at the origin and then lifted onto the tier below.
    for (const b of storey) {
      boxes.push({
        min: [b.min[0], b.min[1] + y, b.min[2]],
        max: [b.max[0], b.max[1] + y, b.max[2]],
        color: b.color,
      });
    }
    y += platform + wallHeight + rise * 0.62;
    width *= 0.8;
    depth *= 0.8;
  }
  return boxes;
}

/** A bell or drum tower: an open pavilion on a tall stone base. */
export function buildTower(options: Omit<BuildingOptions, "roof">): Box[] {
  const boxes: Box[] = [];
  const halfW = options.width / 2;
  const halfD = options.depth / 2;

  boxes.push(
    box(
      [options.x - halfW - 1, 0, options.z - halfD - 1],
      [options.x + halfW + 1, options.platform, options.z + halfD + 1],
      PALETTE.stone,
    ),
  );
  boxes.push(
    box(
      [options.x - halfW - 1, options.platform - 0.6, options.z - halfD - 1],
      [options.x + halfW + 1, options.platform, options.z + halfD + 1],
      PALETTE.stoneLight,
    ),
  );
  // Corner columns.
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      boxes.push(
        box(
          [
            options.x + sx * halfW - 0.8,
            options.platform,
            options.z + sz * halfD - 0.8,
          ],
          [
            options.x + sx * halfW + 0.8,
            options.platform + options.wallHeight,
            options.z + sz * halfD + 0.8,
          ],
          PALETTE.wood,
        ),
      );
    }
  }
  // Balustrade between the columns.
  for (const sz of [-1, 1]) {
    boxes.push(
      box(
        [options.x - halfW, options.platform + 0.6, options.z + sz * halfD - 0.4],
        [options.x + halfW, options.platform + 1.6, options.z + sz * halfD + 0.4],
        PALETTE.woodLight,
      ),
    );
  }
  for (const sx of [-1, 1]) {
    boxes.push(
      box(
        [options.x + sx * halfW - 0.4, options.platform + 0.6, options.z - halfD],
        [options.x + sx * halfW + 0.4, options.platform + 1.6, options.z + halfD],
        PALETTE.woodLight,
      ),
    );
  }
  // The drum itself.
  boxes.push(
    box(
      [options.x - 3.2, options.platform + 1.6, options.z - 3.2],
      [options.x + 3.2, options.platform + 5.2, options.z + 3.2],
      PALETTE.woodDark,
    ),
  );
  boxes.push(
    box(
      [options.x - 3.4, options.platform + 4.4, options.z - 3.4],
      [options.x + 3.4, options.platform + 5.4, options.z + 3.4],
      PALETTE.goldDark,
    ),
  );

  boxes.push(
    ...buildBuilding({
      ...options,
      roof: "hipAndGable",
      openCenter: 0,
      frontDoor: false,
      width: options.width,
      depth: options.depth,
    }),
  );
  return boxes;
}

export { mixColor, shade };
