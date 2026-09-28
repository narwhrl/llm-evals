import { BLOCK } from '../constants.js';

/**
 * Architectural Details & Artefacts Builder
 * Builds:
 * - Grand Patina Bronze Incense Burner with rising smoke (青铜大香炉)
 * - Guardian Stone Lions (汉白玉石狮)
 * - Ornate Hanging Lanterns (大红灯笼)
 */
export class DetailBuilder {
  /**
   * Build Grand Bronze Incense Burner in the main courtyard
   */
  static buildIncenseBurner(world, cx = 0, cz = -2) {
    const baseY = 1;

    // 1. Stone Foundation Plinth
    world.fillBox(cx - 3, baseY, cz - 3, cx + 3, baseY, cz + 3, BLOCK.DARK_STONE);
    world.fillBox(cx - 2, baseY + 1, cz - 2, cx + 2, baseY + 1, BLOCK.WHITE_MARBLE);

    // 2. Tripod Legs (三足)
    const legY = baseY + 2;
    world.fillBox(cx - 2, legY, cz - 1, cx - 2, legY + 1, cz - 1, BLOCK.BRONZE);
    world.fillBox(cx + 2, legY, cz - 1, cx + 2, legY + 1, cz - 1, BLOCK.BRONZE);
    world.fillBox(cx, legY, cz + 2, cx, legY + 1, cz + 2, BLOCK.BRONZE);

    // 3. Main Bronze Vessel Body (炉身)
    const bodyY = legY + 2; // Y = 5
    world.fillBox(cx - 2, bodyY, cz - 2, cx + 2, bodyY + 2, cz + 2, BLOCK.BRONZE);
    // Hollow interior for burning incense
    world.fillBox(cx - 1, bodyY + 1, cz - 1, cx + 1, bodyY + 2, cz + 1, BLOCK.AIR);
    // Glowing amber embers at bottom
    world.fillBox(cx - 1, bodyY, cz - 1, cx + 1, bodyY, cz + 1, BLOCK.LANTERN_RED);

    // 4. Double Ear Handles (双耳)
    for (let dy = 0; dy <= 2; dy++) {
      world.setVoxel(cx - 3, bodyY + dy, cz, BLOCK.BRONZE);
      world.setVoxel(cx + 3, bodyY + dy, cz, BLOCK.BRONZE);
    }
    world.setVoxel(cx - 4, bodyY + 1, cz, BLOCK.BRONZE);
    world.setVoxel(cx + 4, bodyY + 1, cz, BLOCK.BRONZE);

    // 5. Pagoda/Perforated Lid (炉顶)
    const lidY = bodyY + 3; // Y = 8
    world.fillBox(cx - 2, lidY, cz - 2, cx + 2, lidY, cz + 2, BLOCK.BRONZE);
    world.fillBox(cx - 1, lidY + 1, cz - 1, cx + 1, lidY + 1, cz + 1, BLOCK.BRONZE);
    world.setVoxel(cx, lidY + 2, cz, BLOCK.GOLD_ORNAMENT);

    // 6. Rising Voxel Incense Smoke (香烟袅袅)
    const smokeY = lidY + 3;
    const smokePuffs = [
      { dx: 0, dy: 0, dz: 0 },
      { dx: 0, dy: 1, dz: 0 },
      { dx: 1, dy: 2, dz: 0 },
      { dx: 1, dy: 3, dz: 1 },
      { dx: 0, dy: 4, dz: 1 },
      { dx: -1, dy: 5, dz: 2 },
      { dx: -1, dy: 6, dz: 2 },
      { dx: -2, dy: 7, dz: 3 },
    ];
    for (const p of smokePuffs) {
      world.setVoxel(cx + p.dx, smokeY + p.dy, cz + p.dz, BLOCK.INCENSE_SMOKE);
    }
  }

  /**
   * Build a Guardian Stone Lion (汉白玉石狮)
   * isMale: true has decorative embroidered ball, false has cub
   */
  static buildStoneLion(world, cx, cy, cz, facingZ = 1, isMale = true) {
    // 1. Carved Pedestal
    world.fillBox(cx - 1, cy, cz - 1, cx + 1, cy, cz + 1, BLOCK.DARK_STONE);
    world.fillBox(cx - 1, cy + 1, cz - 1, cx + 1, cy + 1, cz + 1, BLOCK.WHITE_MARBLE);

    // 2. Lion Haunches and Body
    const bodyY = cy + 2;
    world.fillBox(cx - 1, bodyY, cz - 1, cx + 1, bodyY + 1, cz + 1, BLOCK.WHITE_MARBLE);

    // 3. Forelegs
    const fz = cz + facingZ;
    world.setVoxel(cx - 1, bodyY, fz, BLOCK.WHITE_MARBLE);
    world.setVoxel(cx + 1, bodyY, fz, BLOCK.WHITE_MARBLE);

    // Ball or cub under paw
    if (isMale) {
      world.setVoxel(cx + 1, bodyY, fz, BLOCK.GOLD_ORNAMENT);
    } else {
      world.setVoxel(cx - 1, bodyY, fz, BLOCK.WHITE_MARBLE_CARVED);
    }

    // 4. Lion Chest & Mane
    world.fillBox(cx - 1, bodyY + 2, cz - 1, cx + 1, bodyY + 2, cz + 1, BLOCK.WHITE_MARBLE);
    world.setVoxel(cx, bodyY + 2, fz, BLOCK.WHITE_MARBLE_CARVED); // Ribbon/bell on chest

    // 5. Lion Head & Snout
    const headY = bodyY + 3;
    world.fillBox(cx - 1, headY, cz - 1, cx + 1, headY, cz, BLOCK.WHITE_MARBLE);
    world.setVoxel(cx, headY, fz, BLOCK.WHITE_MARBLE_CARVED); // Snout
    world.setVoxel(cx - 1, headY + 1, cz, BLOCK.WHITE_MARBLE); // Left ear
    world.setVoxel(cx + 1, headY + 1, cz, BLOCK.WHITE_MARBLE); // Right ear
  }

  /**
   * Place Hanging Red Silk Lantern
   */
  static placeHangingLantern(world, x, y, z) {
    // Top hook
    world.setVoxel(x, y, z, BLOCK.DARK_WOOD);
    world.setVoxel(x, y - 1, z, BLOCK.LANTERN_GOLD);
    // Lantern body (glowing)
    world.setVoxel(x, y - 2, z, BLOCK.LANTERN_RED);
    world.setVoxel(x, y - 3, z, BLOCK.LANTERN_RED);
    // Bottom gold rim and tassel
    world.setVoxel(x, y - 4, z, BLOCK.LANTERN_GOLD);
  }
}
