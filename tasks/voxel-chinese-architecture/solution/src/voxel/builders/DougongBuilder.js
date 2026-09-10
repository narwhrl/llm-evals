import { BLOCK } from '../constants.js';

/**
 * Chinese Classical Dougong (斗拱) Bracket System Builder
 * Supports:
 * - Column head brackets (柱头科)
 * - Intercolumnar brackets (平身科)
 * - Corner diagonal brackets (角科)
 * - Architrave / Lintel beams (阑额 / 普拍枋)
 */
export class DougongBuilder {
  /**
   * Place a single Dougong bracket cluster facing outward in direction (dirX, dirZ)
   */
  static placeBracketSet(world, x, y, z, dirX, dirZ) {
    // 1. Base Block (栌斗 - Lu Dou)
    world.setVoxel(x, y, z, BLOCK.LIGHT_WOOD);

    // 2. Transverse Cantilever Arm (华拱 - Hua Gong) stepping outward
    const outX = dirX;
    const outZ = dirZ;
    const lateralX = dirZ; // perpendicular vector
    const lateralZ = dirX;

    // Tier 1 cantilever
    world.setVoxel(x + outX, y, z + outZ, BLOCK.DOUGONG_GREEN);
    world.setVoxel(x + outX, y + 1, z + outZ, BLOCK.LIGHT_WOOD);

    // Lateral arms (横拱 - Heng Gong)
    world.setVoxel(x + lateralX, y, z + lateralZ, BLOCK.LIGHT_WOOD);
    world.setVoxel(x - lateralX, y, z - lateralZ, BLOCK.LIGHT_WOOD);
    world.setVoxel(x + lateralX, y + 1, z + lateralZ, BLOCK.DOUGONG_BLUE);
    world.setVoxel(x - lateralX, y + 1, z - lateralZ, BLOCK.DOUGONG_BLUE);

    // Tier 2 cantilever stepping further outward
    world.setVoxel(x + outX * 2, y + 1, z + outZ * 2, BLOCK.DOUGONG_GREEN);
    world.setVoxel(x + outX * 2, y + 2, z + outZ * 2, BLOCK.GOLD_ORNAMENT);

    // Cushion block & tie beam top
    world.setVoxel(x, y + 1, z, BLOCK.DOUGONG_BLUE);
    world.setVoxel(x, y + 2, z, BLOCK.DARK_WOOD);
    world.setVoxel(x + outX, y + 2, z + outZ, BLOCK.DARK_WOOD);
  }

  /**
   * Build a continuous Dougong perimeter bracket band with architrave
   */
  static buildPerimeterDougong(world, {
    minX,
    maxX,
    y,
    minZ,
    maxZ,
    columnSpacing = 4,
  }) {
    // 1. Lower Architrave Beam (阑额 / 普拍枋)
    for (let x = minX; x <= maxX; x++) {
      world.setVoxel(x, y - 1, minZ, BLOCK.DARK_WOOD);
      world.setVoxel(x, y - 1, maxZ, BLOCK.DARK_WOOD);
    }
    for (let z = minZ; z <= maxZ; z++) {
      world.setVoxel(minX, y - 1, z, BLOCK.DARK_WOOD);
      world.setVoxel(maxX, y - 1, z, BLOCK.DARK_WOOD);
    }

    // 2. Front & Back Facade Dougong brackets
    for (let x = minX + 2; x <= maxX - 2; x += columnSpacing) {
      // Front (facing -Z)
      DougongBuilder.placeBracketSet(world, x, y, minZ, 0, -1);
      // Back (facing +Z)
      DougongBuilder.placeBracketSet(world, x, y, maxZ, 0, 1);
    }

    // 3. Side Facade Dougong brackets
    for (let z = minZ + 2; z <= maxZ - 2; z += columnSpacing) {
      // West (facing -X)
      DougongBuilder.placeBracketSet(world, minX, y, z, -1, 0);
      // East (facing +X)
      DougongBuilder.placeBracketSet(world, maxX, y, z, 1, 0);
    }

    // 4. Corner Brackets (角科) at 45 degrees
    const corners = [
      { x: minX, z: minZ, dx: -1, dz: -1 },
      { x: minX, z: maxZ, dx: -1, dz: 1 },
      { x: maxX, z: minZ, dx: 1, dz: -1 },
      { x: maxX, z: maxZ, dx: 1, dz: 1 },
    ];
    for (const c of corners) {
      world.setVoxel(c.x, y, c.z, BLOCK.LIGHT_WOOD);
      world.setVoxel(c.x + c.dx, y, c.z + c.dz, BLOCK.DOUGONG_GREEN);
      world.setVoxel(c.x + c.dx, y + 1, c.z + c.dz, BLOCK.DOUGONG_BLUE);
      world.setVoxel(c.x + c.dx * 2, y + 1, c.z + c.dz * 2, BLOCK.GOLD_ORNAMENT);
    }

    // 5. Upper Purlin Plate (枋/檩) supporting roof eaves
    for (let x = minX - 1; x <= maxX + 1; x++) {
      world.setVoxel(x, y + 2, minZ - 1, BLOCK.DARK_WOOD);
      world.setVoxel(x, y + 2, maxZ + 1, BLOCK.DARK_WOOD);
    }
    for (let z = minZ - 1; z <= maxZ + 1; z++) {
      world.setVoxel(minX - 1, y + 2, z, BLOCK.DARK_WOOD);
      world.setVoxel(maxX + 1, y + 2, z, BLOCK.DARK_WOOD);
    }
  }
}
