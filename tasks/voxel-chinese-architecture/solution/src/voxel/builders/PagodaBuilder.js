import { BLOCK } from '../constants.js';
import { RoofBuilder } from './RoofBuilder.js';
import { DetailBuilder } from './DetailBuilder.js';

/**
 * Chinese Classical Multi-Tier Pagoda Builder (千佛宝塔)
 * Constructs a 5-tier tapering tower with flying eaves,
 * arched openings, and a golden spire finial (相轮宝刹).
 */
export class PagodaBuilder {
  static buildPagoda(world, cx = 40, cz = 60) {
    let currentY = 1;

    // 1. High Stone Podium (须弥座台基)
    const baseRadius = 9;
    world.fillBox(cx - baseRadius, currentY, cz - baseRadius, cx + baseRadius, currentY, cz + baseRadius, BLOCK.DARK_STONE);
    currentY += 1;
    world.fillBox(cx - baseRadius + 1, currentY, cz - baseRadius + 1, cx + baseRadius - 1, currentY + 1, cz + baseRadius - 1, BLOCK.WHITE_MARBLE);
    currentY += 2; // currentY = 4

    // Steps leading up south facade of pagoda podium
    for (let s = 0; s < 3; s++) {
      world.fillBox(cx - 3, 1 + s, cz - baseRadius - 3 + s, cx + 3, 1 + s, cz - baseRadius - 3 + s, BLOCK.WHITE_MARBLE);
    }

    // 5 Tiers configuration (tapering width and height)
    const tiers = [
      { halfW: 7, height: 7, eaveRadius: 9, cornerLift: 2 },
      { halfW: 6, height: 6, eaveRadius: 8, cornerLift: 2 },
      { halfW: 5, height: 6, eaveRadius: 7, cornerLift: 2 },
      { halfW: 4, height: 5, eaveRadius: 6, cornerLift: 2 },
      { halfW: 3, height: 5, eaveRadius: 5, cornerLift: 3 },
    ];

    for (let t = 0; t < tiers.length; t++) {
      const { halfW, height: tierH, eaveRadius, cornerLift } = tiers[t];
      const tierBaseY = currentY;

      // 2. Tier Body Walls & Columns
      // Solid outer walls with hollow center for performance
      for (let y = tierBaseY; y < tierBaseY + tierH; y++) {
        // Red walls
        for (let dx = -halfW; dx <= halfW; dx++) {
          for (let dz = -halfW; dz <= halfW; dz++) {
            const isBorder = (Math.abs(dx) === halfW || Math.abs(dz) === halfW);
            if (isBorder) {
              world.setVoxel(cx + dx, y, cz + dz, BLOCK.RED_WALL);
            }
          }
        }

        // Corner columns
        world.setVoxel(cx - halfW, y, cz - halfW, BLOCK.RED_COLUMN);
        world.setVoxel(cx + halfW, y, cz - halfW, BLOCK.RED_COLUMN);
        world.setVoxel(cx - halfW, y, cz + halfW, BLOCK.RED_COLUMN);
        world.setVoxel(cx + halfW, y, cz + halfW, BLOCK.RED_COLUMN);
      }

      // 3. Arched Doors / Windows on 4 facades of each tier
      const winH = Math.min(3, tierH - 2);
      const winY = tierBaseY + 1;
      for (let wy = winY; wy < winY + winH; wy++) {
        // South opening
        world.setVoxel(cx, wy, cz - halfW, BLOCK.LATTICE_WINDOW);
        // North opening
        world.setVoxel(cx, wy, cz + halfW, BLOCK.LATTICE_WINDOW);
        // East opening
        world.setVoxel(cx + halfW, wy, cz, BLOCK.LATTICE_WINDOW);
        // West opening
        world.setVoxel(cx - halfW, wy, cz, BLOCK.LATTICE_WINDOW);
      }

      // 4. Bracket under-eaves layer
      const bracketY = tierBaseY + tierH;
      for (let dx = -halfW; dx <= halfW; dx++) {
        world.setVoxel(cx + dx, bracketY, cz - halfW, BLOCK.DOUGONG_GREEN);
        world.setVoxel(cx + dx, bracketY, cz + halfW, BLOCK.DOUGONG_GREEN);
      }
      for (let dz = -halfW; dz <= halfW; dz++) {
        world.setVoxel(cx - halfW, bracketY, cz + dz, BLOCK.DOUGONG_GREEN);
        world.setVoxel(cx + halfW, bracketY, cz + dz, BLOCK.DOUGONG_GREEN);
      }

      // 5. Tier Eaves Roof
      const roofBaseY = bracketY + 1;
      const isTopTier = (t === tiers.length - 1);

      if (!isTopTier) {
        // Intermediate tier hip/pyramid eaves
        RoofBuilder.buildPyramidRoof(world, {
          cx,
          baseY: roofBaseY,
          cz,
          radius: eaveRadius,
          height: 3,
          tileType: BLOCK.CYAN_TILE,
          ridgeType: BLOCK.CYAN_RIDGE,
          cornerLift: cornerLift,
        });

        // Wind bells / small lanterns at 4 corners
        const corners = [
          { dx: -eaveRadius, dz: -eaveRadius },
          { dx: eaveRadius, dz: -eaveRadius },
          { dx: -eaveRadius, dz: eaveRadius },
          { dx: eaveRadius, dz: eaveRadius },
        ];
        for (const c of corners) {
          DetailBuilder.placeHangingLantern(world, cx + c.dx, roofBaseY + cornerLift - 1, cz + c.dz);
        }

        currentY = roofBaseY + 3;
      } else {
        // Top Tier Roof with dramatic spire
        RoofBuilder.buildPyramidRoof(world, {
          cx,
          baseY: roofBaseY,
          cz,
          radius: eaveRadius,
          height: 4,
          tileType: BLOCK.CYAN_TILE,
          ridgeType: BLOCK.CYAN_RIDGE,
          cornerLift: 3,
        });

        // 6. Magnificent Golden Spire Finial (金刚相轮宝刹)
        const spireBaseY = roofBaseY + 4;

        // Lotus Throne Base
        world.fillBox(cx - 2, spireBaseY, cz - 2, cx + 2, spireBaseY, cz + 2, BLOCK.GOLD_FINIAL);
        world.fillBox(cx - 1, spireBaseY + 1, cz - 1, cx + 1, spireBaseY + 1, cz + 1, BLOCK.GOLD_FINIAL);

        // Multi-ring Spire (5 Xianglun discs)
        let sy = spireBaseY + 2;
        for (let ring = 0; ring < 5; ring++) {
          // Central staff
          world.setVoxel(cx, sy, cz, BLOCK.GOLD_FINIAL);
          // Disc ring
          world.setVoxel(cx - 1, sy, cz, BLOCK.GOLD_ORNAMENT);
          world.setVoxel(cx + 1, sy, cz, BLOCK.GOLD_ORNAMENT);
          world.setVoxel(cx, sy, cz - 1, BLOCK.GOLD_ORNAMENT);
          world.setVoxel(cx, sy, cz + 1, BLOCK.GOLD_ORNAMENT);
          sy += 1;
          world.setVoxel(cx, sy, cz, BLOCK.GOLD_FINIAL);
          sy += 1;
        }

        // Top Golden Crescent & Flame Pearl (宝珠)
        world.fillBox(cx - 1, sy, cz - 1, cx + 1, sy, cz + 1, BLOCK.GOLD_FINIAL);
        world.setVoxel(cx, sy + 1, cz, BLOCK.GOLD_FINIAL);
        world.setVoxel(cx, sy + 2, cz, BLOCK.GOLD_ORNAMENT);
        world.setVoxel(cx, sy + 3, cz, BLOCK.GOLD_ORNAMENT);
      }
    }
  }
}
