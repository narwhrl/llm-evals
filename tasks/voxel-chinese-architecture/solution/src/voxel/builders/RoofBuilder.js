import { BLOCK } from '../constants.js';

/**
 * Chinese Classical Roof Builder in Voxels
 * Supports:
 * - Wudian Roof (庑殿顶 - 4 full slopes)
 * - Xieshan Roof (歇山顶 - 9 ridges, vertical gables, half-hips)
 * - Cuanjian Roof (攒尖顶 - 4-sided pyramidal pavilion roof)
 * - Flying eaves upturned corners (飞檐翘角) and ridge beasts (鸱吻/戗兽)
 */
export class RoofBuilder {
  /**
   * Build a Chinese Classical Xieshan Roof (歇山顶) or Wudian Roof (庑殿顶)
   */
  static buildSlopedRoof(world, {
    cx,
    baseY,
    cz,
    width,           // total eaves width along X (odd or even)
    depth,           // total eaves depth along Z (odd or even)
    height,          // vertical height from eaves to main ridge
    ridgeLength,     // length of top horizontal ridge along X
    tileType = BLOCK.GOLD_TILE,
    ridgeType = BLOCK.GOLD_RIDGE,
    isXieshan = true,
    cornerLift = 3,
    underEavesWood = true,
  }) {
    const hw = Math.floor(width / 2);
    const hd = Math.floor(depth / 2);
    const halfRidge = Math.floor(ridgeLength / 2);

    // Track surface top for each (x, z) to place tiles and ridges properly
    const heightMap = new Map();

    for (let dx = -hw; dx <= hw; dx++) {
      for (let dz = -hd; dz <= hd; dz++) {
        const absX = Math.abs(dx);
        const absZ = Math.abs(dz);

        // Normalized distance from center
        const uX = absX / hw;
        const uZ = absZ / hd;

        let hVal = 0;

        if (isXieshan) {
          // Xieshan has vertical gables on the sides when absX > halfRidge + 2
          // Main front and back slopes govern Z
          const zSlope = 1.0 - (absZ / hd); // 0 at eave, 1 at center
          
          if (absX <= halfRidge) {
            // Under main ridge: slope depends purely on Z
            // Concave curvature (举折)
            hVal = Math.pow(Math.max(0, zSlope), 1.35) * height;
          } else {
            // Flanks: slope transitions towards side eaves
            const xDistBeyond = absX - halfRidge;
            const xSlope = 1.0 - (xDistBeyond / (hw - halfRidge));
            const sideFactor = Math.min(zSlope, Math.max(0, xSlope));
            hVal = Math.pow(Math.max(0, sideFactor), 1.35) * height;
          }
        } else {
          // Wudian (4 full hipped slopes)
          const zSlope = 1.0 - (absZ / hd);
          const xSlope = absX <= halfRidge ? 1.0 : 1.0 - ((absX - halfRidge) / (hw - halfRidge));
          const hipFactor = Math.min(zSlope, Math.max(0, xSlope));
          hVal = Math.pow(Math.max(0, hipFactor), 1.35) * height;
        }

        // Flying eaves corner lift (飞檐翘角)
        // Corner factor is strongest when both uX and uZ approach 1.0
        const cornerProximity = (uX * uX + uZ * uZ) / 2.0;
        let lift = 0;
        if (uX > 0.65 && uZ > 0.65) {
          const cornerBlend = Math.max(0, (uX - 0.65) / 0.35) * Math.max(0, (uZ - 0.65) / 0.35);
          lift = Math.pow(cornerBlend, 1.5) * cornerLift;
        }

        const finalY = Math.round(baseY + hVal + lift);
        const key = `${dx},${dz}`;
        heightMap.set(key, finalY);

        // Place roof tile layer (2 blocks thick for solid voxel presence)
        world.setVoxel(cx + dx, finalY, cz + dz, tileType);
        world.setVoxel(cx + dx, finalY - 1, cz + dz, tileType);

        // Under-eaves wood rafters layer
        if (underEavesWood && (absX >= hw - 2 || absZ >= hd - 2)) {
          world.setVoxel(cx + dx, finalY - 2, cz + dz, BLOCK.LIGHT_WOOD);
        }
      }
    }

    // Gable triangular walls (山花板) for Xieshan roof
    if (isXieshan) {
      const gableX1 = cx - halfRidge - 1;
      const gableX2 = cx + halfRidge + 1;
      const gableZRadius = Math.floor(hd * 0.55);

      for (let dz = -gableZRadius; dz <= gableZRadius; dz++) {
        const zDist = Math.abs(dz);
        const zFactor = 1.0 - (zDist / (gableZRadius + 1));
        const gableTop = Math.round(baseY + height * Math.pow(zFactor, 0.8));
        const gableBtm = Math.round(baseY + height * 0.45);

        for (let y = gableBtm; y <= gableTop; y++) {
          // Fill gable board with dark red wood / lattice ornament
          const block = (Math.abs(y - gableTop) <= 1 || zDist === 0) ? BLOCK.GOLD_ORNAMENT : BLOCK.DARK_WOOD;
          world.setVoxel(gableX1, y, cz + dz, block);
          world.setVoxel(gableX2, y, cz + dz, block);
        }
      }
    }

    // Build Main Ridge (正脊) along X
    const ridgeY = baseY + height;
    for (let dx = -halfRidge; dx <= halfRidge; dx++) {
      world.setVoxel(cx + dx, ridgeY, cz, ridgeType);
      world.setVoxel(cx + dx, ridgeY + 1, cz, ridgeType);
      // Subtle ridge pattern
      if (Math.abs(dx) % 2 === 0) {
        world.setVoxel(cx + dx, ridgeY + 2, cz, BLOCK.GOLD_ORNAMENT);
      }
    }

    // Chiwen (鸱吻) Ridge Beasts at both ends of the main ridge
    for (const sign of [-1, 1]) {
      const rx = cx + sign * halfRidge;
      world.setVoxel(rx, ridgeY + 1, cz, BLOCK.GOLD_ORNAMENT);
      world.setVoxel(rx, ridgeY + 2, cz, BLOCK.GOLD_ORNAMENT);
      world.setVoxel(rx, ridgeY + 3, cz, BLOCK.GOLD_ORNAMENT);
      world.setVoxel(rx + sign, ridgeY + 3, cz, BLOCK.GOLD_ORNAMENT);
      world.setVoxel(rx + sign * 2, ridgeY + 4, cz, BLOCK.GOLD_ORNAMENT);
      world.setVoxel(rx + sign, ridgeY + 4, cz, ridgeType);
    }

    // Corner Diagonal Ridges (垂脊 / 戗脊)
    // Trace diagonally from ridge ends to the 4 corners
    const corners = [
      { sx: -halfRidge, sz: 0, ex: -hw, ez: -hd },
      { sx: -halfRidge, sz: 0, ex: -hw, ez: hd },
      { sx: halfRidge, sz: 0, ex: hw, ez: -hd },
      { sx: halfRidge, sz: 0, ex: hw, ez: hd },
    ];

    for (const c of corners) {
      const steps = Math.max(Math.abs(c.ex - c.sx), Math.abs(c.ez - c.sz));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const rx = Math.round(c.sx + t * (c.ex - c.sx));
        const rz = Math.round(c.sz + t * (c.ez - c.sz));
        const key = `${rx},${rz}`;
        const surfY = heightMap.get(key) || (baseY + Math.round((1 - t) * height));

        // Place ridge cap
        world.setVoxel(cx + rx, surfY + 1, cz + rz, ridgeType);

        // Place ridge animals (蹲兽 / 脊兽) stepping down the ridge
        if (s > steps * 0.45 && s < steps * 0.9 && s % 2 === 0) {
          world.setVoxel(cx + rx, surfY + 2, cz + rz, BLOCK.GOLD_ORNAMENT);
        }
      }

      // Upturned corner tip beast (套兽 / 翼角翘起)
      const tipKey = `${c.ex},${c.ez}`;
      const tipY = heightMap.get(tipKey) || baseY;
      world.setVoxel(cx + c.ex, tipY + 1, cz + c.ez, BLOCK.GOLD_ORNAMENT);
      world.setVoxel(cx + c.ex, tipY + 2, cz + c.ez, BLOCK.GOLD_ORNAMENT);
      // Extend 1 block outward diagonally for flying eaves flair
      const outX = Math.sign(c.ex);
      const outZ = Math.sign(c.ez);
      world.setVoxel(cx + c.ex + outX, tipY + 2, cz + c.ez + outZ, BLOCK.GOLD_ORNAMENT);
      world.setVoxel(cx + c.ex + outX, tipY + 3, cz + c.ez + outZ, BLOCK.GOLD_ORNAMENT);
    }
  }

  /**
   * Build a Chinese Classical Pyramidal Pavilion Roof (四角攒尖顶)
   * Suitable for Bell Tower, Drum Tower, and Pagoda tiers.
   */
  static buildPyramidRoof(world, {
    cx,
    baseY,
    cz,
    radius,          // half-width at eaves
    height,          // vertical height from eaves to apex
    tileType = BLOCK.CYAN_TILE,
    ridgeType = BLOCK.CYAN_RIDGE,
    finialType = BLOCK.GOLD_FINIAL,
    cornerLift = 2,
  }) {
    const r = Math.floor(radius);

    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        const absX = Math.abs(dx);
        const absZ = Math.abs(dz);

        // Chebyshev distance (square base)
        const distFromCenter = Math.max(absX, absZ);
        const slope = 1.0 - (distFromCenter / r);

        // Concave curve
        let hVal = Math.pow(Math.max(0, slope), 1.25) * height;

        // Corner lift
        let lift = 0;
        if (absX >= r - 2 && absZ >= r - 2) {
          const cornerFactor = (absX - (r - 2) + absZ - (r - 2)) / 4.0;
          lift = cornerFactor * cornerLift;
        }

        const y = Math.round(baseY + hVal + lift);
        world.setVoxel(cx + dx, y, cz + dz, tileType);
        world.setVoxel(cx + dx, y - 1, cz + dz, tileType);

        // 4 diagonal corner ridges
        if (absX === absZ && absX > 1) {
          world.setVoxel(cx + dx, y + 1, cz + dz, ridgeType);
        }
      }
    }

    // 4 Corner Flying Eaves tips
    const corners = [
      { dx: -r, dz: -r },
      { dx: -r, dz: r },
      { dx: r, dz: -r },
      { dx: r, dz: r },
    ];
    for (const c of corners) {
      const tipY = baseY + cornerLift;
      const ox = Math.sign(c.dx);
      const oz = Math.sign(c.dz);
      world.setVoxel(cx + c.dx + ox, tipY + 1, cz + c.dz + oz, BLOCK.GOLD_ORNAMENT);
      world.setVoxel(cx + c.dx + ox, tipY + 2, cz + c.dz + oz, BLOCK.GOLD_ORNAMENT);
    }

    // Apex Finial (宝顶)
    const apexY = baseY + height;
    world.fillBox(cx - 1, apexY, cz - 1, cx + 1, apexY + 1, cz + 1, finialType);
    world.setVoxel(cx, apexY + 2, cz, finialType);
    world.setVoxel(cx, apexY + 3, cz, finialType);
    world.setVoxel(cx, apexY + 4, cz, BLOCK.GOLD_ORNAMENT);
  }

  /**
   * Build Lower Skirt Eaves (下檐 / 副阶周匝) for double-eaved roofs
   */
  static buildSkirtEaves(world, {
    cx,
    baseY,
    cz,
    width,
    depth,
    inwardSteps = 4,
    tileType = BLOCK.GOLD_TILE,
    ridgeType = BLOCK.GOLD_RIDGE,
    cornerLift = 2,
  }) {
    const hw = Math.floor(width / 2);
    const hd = Math.floor(depth / 2);

    for (let step = 0; step < inwardSteps; step++) {
      const curW = hw - step;
      const curD = hd - step;
      const curY = baseY + step;

      // Outer ring of this step
      for (let dx = -curW; dx <= curW; dx++) {
        for (let dz = -curD; dz <= curD; dz++) {
          const isBorder = (Math.abs(dx) === curW || Math.abs(dz) === curD);
          if (isBorder) {
            let lift = 0;
            if (Math.abs(dx) >= curW - 1 && Math.abs(dz) >= curD - 1 && step === 0) {
              lift = cornerLift;
            }
            world.setVoxel(cx + dx, curY + lift, cz + dz, tileType);
            world.setVoxel(cx + dx, curY - 1 + lift, cz + dz, BLOCK.LIGHT_WOOD);

            // Diagonal corner ridges
            if (Math.abs(dx) / curW === Math.abs(dz) / curD) {
              world.setVoxel(cx + dx, curY + 1 + lift, cz + dz, ridgeType);
            }
          }
        }
      }
    }

    // 4 Corner tips for skirt eaves
    const corners = [
      { dx: -hw, dz: -hd },
      { dx: -hw, dz: hd },
      { dx: hw, dz: -hd },
      { dx: hw, dz: hd },
    ];
    for (const c of corners) {
      const ox = Math.sign(c.dx);
      const oz = Math.sign(c.dz);
      world.setVoxel(cx + c.dx + ox, baseY + cornerLift + 1, cz + c.dz + oz, BLOCK.GOLD_ORNAMENT);
    }
  }
}
