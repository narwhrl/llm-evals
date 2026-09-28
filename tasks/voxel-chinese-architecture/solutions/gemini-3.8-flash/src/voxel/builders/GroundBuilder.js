import { BLOCK } from '../constants.js';

/**
 * Ground & Landscape Builder
 * Generates:
 * - Natural grass terrain
 * - Central Imperial Avenue (御道/甬道) with axial symmetry
 * - Large stone paved courtyards (前院、中庭、配殿广场、塔院)
 * - Symmetrical lotus ponds (放生池) with stone bridges, water, lotus pads, and flowers
 * - Perimeter vermilion enclosure walls with grey tile caps and circular moon gates (月亮门)
 * - Ancient pine trees (古松翠柏) and path stone lanterns
 */
export class GroundBuilder {
  static buildGroundAndCourtyard(world) {
    const minX = -75;
    const maxX = 75;
    const minZ = -85;
    const maxZ = 85;

    // 1. Base Ground Lawn (Y = 0)
    world.fillBox(minX, 0, minZ, maxX, 0, maxZ, BLOCK.GRASS);

    // 2. Central Imperial Way (御道 - Royal Avenue)
    // Runs from southern outer entrance (Z = -85) all the way to Main Hall (Z = 12)
    world.fillBox(-4, 0, -85, 4, 0, 12, BLOCK.YELLOW_STONE);
    // Dark stone border curbs for imperial way
    world.fillBox(-5, 0, -85, -5, 0, 12, BLOCK.DARK_STONE);
    world.fillBox(5, 0, -85, 5, 0, 12, BLOCK.DARK_STONE);

    // 3. Front Courtyard (前院: Between Mountain Gate Z = -55 and Bell/Drum Towers Z = -25)
    world.fillBox(-42, 0, -50, 42, 0, -14, BLOCK.GREY_STONE);
    // Decorative border band
    for (let x = -42; x <= 42; x++) {
      world.setVoxel(x, 0, -50, BLOCK.DARK_STONE);
      world.setVoxel(x, 0, -14, BLOCK.DARK_STONE);
    }
    for (let z = -50; z <= -14; z++) {
      world.setVoxel(-42, 0, z, BLOCK.DARK_STONE);
      world.setVoxel(42, 0, z, BLOCK.DARK_STONE);
    }

    // 4. Main Grand Courtyard (中庭大院: between front court and Main Hall)
    world.fillBox(-56, 0, -14, 56, 0, 15, BLOCK.GREY_STONE);
    // Paved lateral avenues to East and West Side Halls
    world.fillBox(-56, 0, 15, -34, 0, 38, BLOCK.GREY_STONE);
    world.fillBox(34, 0, 15, 56, 0, 38, BLOCK.GREY_STONE);

    // 5. Rear Pagoda Courtyard (塔院: East rear garden Z = 40..80, X = 20..65)
    world.fillBox(20, 0, 42, 62, 0, 78, BLOCK.GREY_STONE);
    // Paved path connecting Main Hall to Pagoda Courtyard
    world.fillBox(16, 0, 22, 28, 0, 60, BLOCK.GREY_STONE);

    // 6. Dual Lotus Ponds (放生池) in front courtyard
    // West Pond: X: -26..-12, Z: -42..-22
    // East Pond: X: 12..26, Z: -42..-22
    GroundBuilder.buildLotusPond(world, -19, -32, 14, 18);
    GroundBuilder.buildLotusPond(world, 19, -32, 14, 18);

    // 7. Perimeter Enclosure Walls (宫墙/院墙)
    GroundBuilder.buildPerimeterWalls(world);

    // 8. Ancient Pine Trees
    GroundBuilder.plantPines(world);

    // 9. Pathway Stone Lanterns
    GroundBuilder.placeStoneLanterns(world);
  }

  /**
   * Symmetrical Lotus Pond with arched stone bridge
   */
  static buildLotusPond(world, cx, cz, width, depth) {
    const hw = Math.floor(width / 2);
    const hd = Math.floor(depth / 2);

    // Excavate pond basin (Y = -2 to Y = -1)
    world.fillBox(cx - hw, -2, cz - hd, cx + hw, -1, cz + hd, BLOCK.WATER);

    // Pond Bed
    world.fillBox(cx - hw, -3, cz - hd, cx + hw, -3, cz + hd, BLOCK.DARK_STONE);

    // Pond Rim (White Marble border at Y = 0)
    for (let x = cx - hw - 1; x <= cx + hw + 1; x++) {
      world.setVoxel(x, 0, cz - hd - 1, BLOCK.WHITE_MARBLE);
      world.setVoxel(x, 0, cz + hd + 1, BLOCK.WHITE_MARBLE);
    }
    for (let z = cz - hd - 1; z <= cz + hd + 1; z++) {
      world.setVoxel(cx - hw - 1, 0, z, BLOCK.WHITE_MARBLE);
      world.setVoxel(cx + hw + 1, 0, z, BLOCK.WHITE_MARBLE);
    }

    // Marble Balustrade posts around pond (Y = 1)
    for (let x = cx - hw - 1; x <= cx + hw + 1; x += 3) {
      world.setVoxel(x, 1, cz - hd - 1, BLOCK.WHITE_MARBLE);
      world.setVoxel(x, 1, cz + hd + 1, BLOCK.WHITE_MARBLE);
    }
    for (let z = cz - hd - 1; z <= cz + hd + 1; z += 3) {
      world.setVoxel(cx - hw - 1, 1, z, BLOCK.WHITE_MARBLE);
      world.setVoxel(cx + hw + 1, 1, z, BLOCK.WHITE_MARBLE);
    }

    // Lotus pads and flowers floating on water (Y = 0)
    const lotusCoords = [
      { dx: -4, dz: -4 }, { dx: -2, dz: -5 }, { dx: -5, dz: 2 },
      { dx: 3, dz: -4 }, { dx: 4, dz: 3 }, { dx: -3, dz: 4 },
      { dx: 2, dz: 5 }, { dx: -1, dz: 3 }
    ];
    for (const l of lotusCoords) {
      const lx = cx + l.dx;
      const lz = cz + l.dz;
      world.setVoxel(lx, 0, lz, BLOCK.LOTUS_LEAF);
      world.setVoxel(lx + 1, 0, lz, BLOCK.LOTUS_LEAF);
      world.setVoxel(lx, 0, lz + 1, BLOCK.LOTUS_LEAF);
      // Lotus flower in center of some pads
      if ((l.dx + l.dz) % 2 === 0) {
        world.setVoxel(lx, 1, lz, BLOCK.LOTUS_FLOWER);
      }
    }

    // Arched Stone Bridge across center of pond along X
    for (let x = cx - hw - 1; x <= cx + hw + 1; x++) {
      const dist = Math.abs(x - cx);
      const bridgeY = dist <= 2 ? 2 : (dist <= 4 ? 1 : 0);

      // Bridge deck
      world.setVoxel(x, bridgeY, cz - 1, BLOCK.WHITE_MARBLE);
      world.setVoxel(x, bridgeY, cz, BLOCK.WHITE_MARBLE);
      world.setVoxel(x, bridgeY, cz + 1, BLOCK.WHITE_MARBLE);

      // Bridge parapet
      world.setVoxel(x, bridgeY + 1, cz - 2, BLOCK.WHITE_MARBLE);
      world.setVoxel(x, bridgeY + 1, cz + 2, BLOCK.WHITE_MARBLE);
    }
  }

  /**
   * Perimeter Vermilion Enclosure Walls with Moon Gates
   */
  static buildPerimeterWalls(world) {
    const leftX = -68;
    const rightX = 68;
    const backZ = 80;
    const frontZ = -68;
    const wallH = 6;

    // West Wall (along Z)
    for (let z = frontZ; z <= backZ; z++) {
      world.fillBox(leftX, 1, z, leftX, wallH, z, BLOCK.RED_WALL);
      // Dark grey tile cap
      world.setVoxel(leftX - 1, wallH + 1, z, BLOCK.WALL_CAP);
      world.setVoxel(leftX, wallH + 1, z, BLOCK.CYAN_RIDGE);
      world.setVoxel(leftX + 1, wallH + 1, z, BLOCK.WALL_CAP);
    }

    // East Wall (along Z)
    for (let z = frontZ; z <= backZ; z++) {
      world.fillBox(rightX, 1, z, rightX, wallH, z, BLOCK.RED_WALL);
      // Dark grey tile cap
      world.setVoxel(rightX - 1, wallH + 1, z, BLOCK.WALL_CAP);
      world.setVoxel(rightX, wallH + 1, z, BLOCK.CYAN_RIDGE);
      world.setVoxel(rightX + 1, wallH + 1, z, BLOCK.WALL_CAP);
    }

    // North / Rear Wall (along X)
    for (let x = leftX; x <= rightX; x++) {
      world.fillBox(x, 1, backZ, x, wallH, backZ, BLOCK.RED_WALL);
      world.setVoxel(x, wallH + 1, backZ - 1, BLOCK.WALL_CAP);
      world.setVoxel(x, wallH + 1, backZ, BLOCK.CYAN_RIDGE);
      world.setVoxel(x, wallH + 1, backZ + 1, BLOCK.WALL_CAP);
    }

    // South / Front Wall (from corners to Mountain Gate openings)
    // Mountain Gate sits at X: -18..18, Z: -56..-44
    for (let x = leftX; x <= -18; x++) {
      world.fillBox(x, 1, -55, x, wallH, -55, BLOCK.RED_WALL);
      world.setVoxel(x, wallH + 1, -56, BLOCK.WALL_CAP);
      world.setVoxel(x, wallH + 1, -55, BLOCK.CYAN_RIDGE);
      world.setVoxel(x, wallH + 1, -54, BLOCK.WALL_CAP);
    }
    for (let x = 18; x <= rightX; x++) {
      world.fillBox(x, 1, -55, x, wallH, -55, BLOCK.RED_WALL);
      world.setVoxel(x, wallH + 1, -56, BLOCK.WALL_CAP);
      world.setVoxel(x, wallH + 1, -55, BLOCK.CYAN_RIDGE);
      world.setVoxel(x, wallH + 1, -54, BLOCK.WALL_CAP);
    }

    // Internal Dividing Wall separating main courtyard from Pagoda garden
    // Along X = 18, Z = 38..80
    for (let z = 38; z <= 80; z++) {
      world.fillBox(18, 1, z, 18, 5, z, BLOCK.RED_WALL);
      world.setVoxel(17, 6, z, BLOCK.WALL_CAP);
      world.setVoxel(18, 6, z, BLOCK.CYAN_RIDGE);
      world.setVoxel(19, 6, z, BLOCK.WALL_CAP);
    }

    // Circular Moon Gate (月亮门) on the dividing wall at Z = 52
    GroundBuilder.buildMoonGate(world, 18, 52, 'X');
  }

  /**
   * Circular Moon Gate (月亮门)
   */
  static buildMoonGate(world, wallCoord, centerZ, axis = 'X') {
    // Clear circular opening of radius 3
    for (let dy = 1; dy <= 5; dy++) {
      for (let dz = -3; dz <= 3; dz++) {
        const dist2 = Math.pow(dz / 2.8, 2) + Math.pow((dy - 2.8) / 2.8, 2);
        if (dist2 <= 1.0) {
          world.setVoxel(wallCoord, dy, centerZ + dz, BLOCK.AIR);
        } else if (dist2 <= 1.45) {
          // White marble trim around moon gate
          world.setVoxel(wallCoord, dy, centerZ + dz, BLOCK.WHITE_MARBLE);
        }
      }
    }
  }

  /**
   * Classical Ancient Pines (古松翠柏)
   */
  static plantPines(world) {
    const pineLocations = [
      { x: -36, z: -46, height: 11 },
      { x: 36, z: -46, height: 12 },
      { x: -50, z: -32, height: 13 },
      { x: 50, z: -32, height: 11 },
      { x: -58, z: 2, height: 14 },
      { x: 58, z: 2, height: 13 },
      { x: -56, z: 44, height: 12 },
      { x: -38, z: 58, height: 14 },
      { x: 60, z: 48, height: 15 },
      { x: 58, z: 72, height: 13 },
      { x: 28, z: 74, height: 12 },
    ];

    for (const p of pineLocations) {
      GroundBuilder.buildPineTree(world, p.x, p.z, p.height);
    }
  }

  static buildPineTree(world, px, pz, trunkH) {
    // Gnarled organic trunk
    let cx = px;
    let cz = pz;
    for (let y = 1; y <= trunkH; y++) {
      world.setVoxel(cx, y, cz, BLOCK.PINE_TRUNK);
      world.setVoxel(cx + 1, y, cz, BLOCK.PINE_TRUNK);
      // Slight crooked bends
      if (y === 4) cx += 1;
      if (y === 7) cz += 1;
      if (y === 10) cx -= 1;
    }

    // Branching tiers of horizontal foliage clouds (松针层)
    const tiers = [
      { yOffset: trunkH - 6, radius: 4, dx: 2, dz: -1 },
      { yOffset: trunkH - 3, radius: 5, dx: -2, dz: 2 },
      { yOffset: trunkH, radius: 6, dx: 0, dz: 0 },
      { yOffset: trunkH + 2, radius: 3, dx: 0, dz: 0 },
    ];

    for (const t of tiers) {
      const cy = t.yOffset;
      const r = t.radius;
      const bx = cx + t.dx;
      const bz = cz + t.dz;

      // Connecting branch
      world.setVoxel(bx, cy, bz, BLOCK.PINE_TRUNK);

      // Flat pine foliage cloud
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          if (dx * dx + dz * dz <= r * r) {
            world.setVoxel(bx + dx, cy, bz + dz, BLOCK.PINE_LEAF);
            if (dx * dx + dz * dz <= (r - 1) * (r - 1)) {
              world.setVoxel(bx + dx, cy + 1, bz + dz, BLOCK.PINE_LEAF);
            }
          }
        }
      }
    }
  }

  /**
   * Pathway Stone Lanterns (石灯笼)
   */
  static placeStoneLanterns(world) {
    const lanternSpots = [
      // Along entrance avenue
      { x: -7, z: -80 }, { x: 7, z: -80 },
      { x: -7, z: -68 }, { x: 7, z: -68 },
      // Front courtyard
      { x: -8, z: -46 }, { x: 8, z: -46 },
      { x: -8, z: -20 }, { x: 8, z: -20 },
      // Main courtyard
      { x: -14, z: -6 }, { x: 14, z: -6 },
      { x: -14, z: 6 }, { x: 14, z: 6 },
      // Pagoda path
      { x: 24, z: 40 }, { x: 24, z: 54 }, { x: 24, z: 68 },
    ];

    for (const s of lanternSpots) {
      // Pedestal
      world.setVoxel(s.x, 1, s.z, BLOCK.GREY_STONE);
      world.setVoxel(s.x, 2, s.z, BLOCK.DARK_STONE);
      // Light chamber with warm glow
      world.setVoxel(s.x, 3, s.z, BLOCK.LATTICE_WINDOW);
      // Roof cap
      world.setVoxel(s.x - 1, 4, s.z, BLOCK.GREY_STONE);
      world.setVoxel(s.x + 1, 4, s.z, BLOCK.GREY_STONE);
      world.setVoxel(s.x, 4, s.z - 1, BLOCK.GREY_STONE);
      world.setVoxel(s.x, 4, s.z + 1, BLOCK.GREY_STONE);
      world.setVoxel(s.x, 4, s.z, BLOCK.DARK_STONE);
      world.setVoxel(s.x, 5, s.z, BLOCK.GOLD_ORNAMENT);
    }
  }
}
