import { BLOCK } from '../constants.js';
import { RoofBuilder } from './RoofBuilder.js';
import { DougongBuilder } from './DougongBuilder.js';
import { DetailBuilder } from './DetailBuilder.js';

/**
 * Chinese Classical Building Builder
 * Constructs:
 * 1. Main Hall (大雄宝殿) - Grand double-eaved imperial hall on central axis
 * 2. Side Halls (东配殿、西配殿) - Symmetrical single-eaved halls flanking courtyard
 * 3. Mountain Gate (山门殿) - Front triple-arch entrance gatehouse
 * 4. Bell Tower (东钟楼) & Drum Tower (西鼓楼) - Double-tier pavilions
 */
export class BuildingBuilder {
  /**
   * 1. Main Hall (大雄宝殿)
   * The supreme building in the complex, occupying the core position of the central axis.
   */
  static buildMainHall(world, cx = 0, cz = 32) {
    const podiumW = 44; // X: -22..22
    const podiumD = 30; // Z: 17..47
    const halfPW = Math.floor(podiumW / 2);
    const halfPD = Math.floor(podiumD / 2);

    // --- A. Elevated White Marble Podium (须弥座台基) ---
    // Plinth base (Y = 1)
    world.fillBox(cx - halfPW, 1, cz - halfPD, cx + halfPW, 1, cz + halfPD, BLOCK.DARK_STONE);
    // Marble body & upper floor (Y = 2..4)
    world.fillBox(cx - halfPW + 1, 2, cz - halfPD + 1, cx + halfPW - 1, 4, cz + halfPD - 1, BLOCK.WHITE_MARBLE);

    // Marble Balustrade (汉白玉栏杆) around podium perimeter at Y = 5
    const pMinX = cx - halfPW + 1;
    const pMaxX = cx + halfPW - 1;
    const pMinZ = cz - halfPD + 1;
    const pMaxZ = cz + halfPD - 1;

    for (let x = pMinX; x <= pMaxX; x++) {
      // Railing handrail
      world.setVoxel(x, 5, pMinZ, BLOCK.WHITE_MARBLE);
      world.setVoxel(x, 5, pMaxZ, BLOCK.WHITE_MARBLE);
      // Posts (望柱) every 2 blocks
      if (Math.abs(x) % 2 === 0) {
        world.setVoxel(x, 6, pMinZ, BLOCK.WHITE_MARBLE);
        world.setVoxel(x, 6, pMaxZ, BLOCK.WHITE_MARBLE);
      }
    }
    for (let z = pMinZ; z <= pMaxZ; z++) {
      world.setVoxel(pMinX, 5, z, BLOCK.WHITE_MARBLE);
      world.setVoxel(pMaxX, 5, z, BLOCK.WHITE_MARBLE);
      if (Math.abs(z) % 2 === 0) {
        world.setVoxel(pMinX, 6, z, BLOCK.WHITE_MARBLE);
        world.setVoxel(pMaxX, 6, z, BLOCK.WHITE_MARBLE);
      }
    }

    // --- B. Front Grand Steps & Carved Dragon Ramp (丹陛石御道) ---
    // Opening in the front balustrade for staircases (X: -9..9)
    world.fillBox(cx - 9, 5, pMinZ, cx + 9, 6, pMinZ, BLOCK.AIR);

    // Steps extend forward from Z = pMinZ - 1 down to Z = pMinZ - 6
    const stepCount = 4;
    for (let s = 0; s < stepCount; s++) {
      const stepY = 4 - s;
      const stepZ = (pMinZ - 1) - s * 2;

      // Central Imperial Dragon Ramp (丹陛石: X = -3..3)
      world.fillBox(cx - 3, stepY, stepZ, cx + 3, stepY, stepZ + 1, BLOCK.WHITE_MARBLE_CARVED);

      // Left Staircase (X = -8..-4)
      world.fillBox(cx - 8, stepY, stepZ, cx - 4, stepY, stepZ + 1, BLOCK.WHITE_MARBLE);

      // Right Staircase (X = 4..8)
      world.fillBox(cx + 4, stepY, stepZ, cx + 8, stepY, stepZ + 1, BLOCK.WHITE_MARBLE);
    }

    // Flanking Balustrades for stairs
    for (let s = 0; s < stepCount; s++) {
      const stepY = 4 - s;
      const stepZ = (pMinZ - 1) - s * 2;
      world.setVoxel(cx - 9, stepY + 1, stepZ, BLOCK.WHITE_MARBLE);
      world.setVoxel(cx - 9, stepY + 1, stepZ + 1, BLOCK.WHITE_MARBLE);
      world.setVoxel(cx + 9, stepY + 1, stepZ, BLOCK.WHITE_MARBLE);
      world.setVoxel(cx + 9, stepY + 1, stepZ + 1, BLOCK.WHITE_MARBLE);
    }

    // Guardian Stone Lions in front of stairs
    DetailBuilder.buildStoneLion(world, cx - 11, 1, pMinZ - 7, -1, true);  // Male lion on East
    DetailBuilder.buildStoneLion(world, cx + 11, 1, pMinZ - 7, -1, false); // Female lion on West

    // --- C. Lower Hall Story (下层殿身: Y = 5..14) ---
    const hallW = 34; // X: -17..17
    const hallD = 22; // Z: 21..43
    const hMinX = cx - 17;
    const hMaxX = cx + 17;
    const hMinZ = cz - 11;
    const hMaxZ = cz + 11;

    // Solid perimeter walls
    world.fillBox(hMinX, 5, hMinZ, hMaxX, 13, hMaxZ, BLOCK.RED_WALL);
    // Hollow interior
    world.fillBox(hMinX + 2, 5, hMinZ + 2, hMaxX - 2, 13, hMaxZ - 2, BLOCK.AIR);

    // Massive Vermilion Columns (立柱) - Five Bays Facade
    const columnX = [-17, -10, -4, 4, 10, 17];
    const columnZ = [hMinZ, cz, hMaxZ];

    for (const x of columnX) {
      for (const z of columnZ) {
        for (let y = 5; y <= 13; y++) {
          world.setVoxel(cx + x, y, z, BLOCK.RED_COLUMN);
          world.setVoxel(cx + x - 1, y, z, BLOCK.RED_COLUMN);
        }
      }
    }

    // Front Facade Openings (facing -Z towards courtyard):
    // Central Bay (X: -3..3): Grand studded double wooden doors
    for (let x = cx - 3; x <= cx + 3; x++) {
      for (let y = 5; y <= 11; y++) {
        world.setVoxel(x, y, hMinZ, BLOCK.DOOR_WOOD);
        // Golden door studs
        if ((x + y) % 2 === 0) {
          world.setVoxel(x, y, hMinZ - 1, BLOCK.DOOR_GOLD);
        }
      }
    }

    // Flanking Bays: Warm glowing lattice windows (直棂窗/花窗)
    const windowBays = [
      { startX: cx - 15, endX: cx - 11 },
      { startX: cx - 9, endX: cx - 5 },
      { startX: cx + 5, endX: cx + 9 },
      { startX: cx + 11, endX: cx + 15 },
    ];
    for (const bay of windowBays) {
      for (let x = bay.startX; x <= bay.endX; x++) {
        for (let y = 7; y <= 11; y++) {
          world.setVoxel(x, y, hMinZ, BLOCK.LATTICE_WINDOW);
        }
        // Dark wood sill and lintel
        world.setVoxel(x, 6, hMinZ, BLOCK.DARK_WOOD);
        world.setVoxel(x, 12, hMinZ, BLOCK.DARK_WOOD);
      }
    }

    // --- D. Lower Eaves Skirt Roof (下檐 / 副阶周匝) & Dougong ---
    // Lower Dougong perimeter band at Y = 13..15
    DougongBuilder.buildPerimeterDougong(world, {
      minX: hMinX,
      maxX: hMaxX,
      y: 13,
      minZ: hMinZ,
      maxZ: hMaxZ,
      columnSpacing: 6,
    });

    // Lower Eaves Skirt Roof at Y = 16
    RoofBuilder.buildSkirtEaves(world, {
      cx,
      baseY: 15,
      cz,
      width: 44,
      depth: 30,
      inwardSteps: 4,
      tileType: BLOCK.GOLD_TILE,
      ridgeType: BLOCK.GOLD_RIDGE,
      cornerLift: 3,
    });

    // --- E. Upper Hall Story (上层殿身: Y = 18..24) ---
    const upMinX = cx - 12;
    const upMaxX = cx + 12;
    const upMinZ = cz - 8;
    const upMaxZ = cz + 8;

    world.fillBox(upMinX, 18, upMinZ, upMaxX, 23, upMaxZ, BLOCK.RED_WALL);
    world.fillBox(upMinX + 1, 18, upMinZ + 1, upMaxX - 1, 23, upMaxZ - 1, BLOCK.AIR);

    // Upper columns
    for (const x of [upMinX, cx - 6, cx, cx + 6, upMaxX]) {
      for (let y = 18; y <= 23; y++) {
        world.setVoxel(x, y, upMinZ, BLOCK.RED_COLUMN);
        world.setVoxel(x, y, upMaxZ, BLOCK.RED_COLUMN);
      }
    }
    // Upper lattice windows
    for (let x = upMinX + 2; x <= upMaxX - 2; x++) {
      if (Math.abs(x - cx) % 6 !== 0) {
        for (let y = 19; y <= 22; y++) {
          world.setVoxel(x, y, upMinZ, BLOCK.LATTICE_WINDOW);
          world.setVoxel(x, y, upMaxZ, BLOCK.LATTICE_WINDOW);
        }
      }
    }

    // Horizontal Plaque under upper eaves: "大雄宝殿"
    world.fillBox(cx - 3, 21, upMinZ - 1, cx + 3, 23, upMinZ - 1, BLOCK.PLAQUE_BLACK);
    world.setVoxel(cx - 2, 22, upMinZ - 2, BLOCK.PLAQUE_GOLD);
    world.setVoxel(cx - 1, 22, upMinZ - 2, BLOCK.PLAQUE_GOLD);
    world.setVoxel(cx + 1, 22, upMinZ - 2, BLOCK.PLAQUE_GOLD);
    world.setVoxel(cx + 2, 22, upMinZ - 2, BLOCK.PLAQUE_GOLD);

    // --- F. Upper Dougong Bracket Band ---
    DougongBuilder.buildPerimeterDougong(world, {
      minX: upMinX,
      maxX: upMaxX,
      y: 23,
      minZ: upMinZ,
      maxZ: upMaxZ,
      columnSpacing: 6,
    });

    // --- G. Grand Upper Roof (重檐歇山顶 - Upper Roof) ---
    // Starts at Y = 25, extends to Width: 40, Depth: 28, Height: 12
    RoofBuilder.buildSlopedRoof(world, {
      cx,
      baseY: 25,
      cz,
      width: 40,
      depth: 28,
      height: 12,
      ridgeLength: 20,
      tileType: BLOCK.GOLD_TILE,
      ridgeType: BLOCK.GOLD_RIDGE,
      isXieshan: true,
      cornerLift: 4,
    });

    // --- H. Hanging Lanterns under Eaves ---
    DetailBuilder.placeHangingLantern(world, cx - 16, 14, hMinZ - 2);
    DetailBuilder.placeHangingLantern(world, cx - 8, 14, hMinZ - 2);
    DetailBuilder.placeHangingLantern(world, cx + 8, 14, hMinZ - 2);
    DetailBuilder.placeHangingLantern(world, cx + 16, 14, hMinZ - 2);
  }

  /**
   * 2. Side Halls (东配殿、西配殿)
   * Symmetrically arranged on both sides of the central courtyard.
   */
  static buildSideHall(world, cx, cz, facingX = 1) {
    const width = 18;  // along X
    const depth = 26;  // along Z
    const hw = Math.floor(width / 2);
    const hd = Math.floor(depth / 2);

    // Stone Podium (Y = 1..2)
    world.fillBox(cx - hw, 1, cz - hd, cx + hw, 1, cz + hd, BLOCK.DARK_STONE);
    world.fillBox(cx - hw + 1, 2, cz - hd + 1, cx + hw - 1, 2, cz + hd - 1, BLOCK.GREY_STONE);

    // Front Steps facing inward towards central courtyard
    const stepFaceX = facingX > 0 ? (cx - hw) : (cx + hw);
    const stepDir = -facingX;
    world.fillBox(stepFaceX + stepDir, 1, cz - 3, stepFaceX + stepDir * 2, 1, cz + 3, BLOCK.WHITE_MARBLE);

    // Hall Walls & Columns (Y = 3..9)
    const wallMinX = cx - hw + 1;
    const wallMaxX = cx + hw - 1;
    const wallMinZ = cz - hd + 1;
    const wallMaxZ = cz + hd - 1;

    world.fillBox(wallMinX, 3, wallMinZ, wallMaxX, 9, wallMaxZ, BLOCK.RED_WALL);
    world.fillBox(wallMinX + 1, 3, wallMinZ + 1, wallMaxX - 1, 9, wallMaxZ - 1, BLOCK.AIR);

    // Columns
    for (let z = wallMinZ; z <= wallMaxZ; z += 6) {
      for (let y = 3; y <= 9; y++) {
        world.setVoxel(wallMinX, y, z, BLOCK.RED_COLUMN);
        world.setVoxel(wallMaxX, y, z, BLOCK.RED_COLUMN);
      }
    }

    // Inward Facade Openings (Doors and Windows facing central axis)
    const inX = facingX > 0 ? wallMinX : wallMaxX;

    // Central double door
    for (let z = cz - 2; z <= cz + 2; z++) {
      for (let y = 3; y <= 7; y++) {
        world.setVoxel(inX, y, z, BLOCK.DOOR_WOOD);
      }
    }

    // Windows flanking door
    for (const z of [cz - 6, cz - 5, cz + 5, cz + 6]) {
      for (let y = 4; y <= 7; y++) {
        world.setVoxel(inX, y, z, BLOCK.LATTICE_WINDOW);
      }
    }

    // Dougong Bracket Band at Y = 9..11
    DougongBuilder.buildPerimeterDougong(world, {
      minX: wallMinX,
      maxX: wallMaxX,
      y: 9,
      minZ: wallMinZ,
      maxZ: wallMaxZ,
      columnSpacing: 6,
    });

    // Xieshan Roof with Cyan/Slate tiles
    RoofBuilder.buildSlopedRoof(world, {
      cx,
      baseY: 11,
      cz,
      width: 22,
      depth: 30,
      height: 8,
      ridgeLength: 16,
      tileType: BLOCK.CYAN_TILE,
      ridgeType: BLOCK.CYAN_RIDGE,
      isXieshan: true,
      cornerLift: 3,
    });

    // Hanging Lanterns
    DetailBuilder.placeHangingLantern(world, inX - facingX, 10, cz - 4);
    DetailBuilder.placeHangingLantern(world, inX - facingX, 10, cz + 4);
  }

  /**
   * 3. Mountain Gate (山门殿 / 前殿)
   * Front entrance of the sacred complex, triple-arch gateway.
   */
  static buildMountainGate(world, cx = 0, cz = -55) {
    const width = 34; // X: -17..17
    const depth = 16; // Z: -63..-47
    const hw = Math.floor(width / 2);
    const hd = Math.floor(depth / 2);

    // 1. Stone Podium (Y = 1..2)
    world.fillBox(cx - hw, 1, cz - hd, cx + hw, 1, cz + hd, BLOCK.DARK_STONE);
    world.fillBox(cx - hw + 1, 2, cz - hd + 1, cx + hw - 1, 2, cz + hd - 1, BLOCK.GREY_STONE);

    // Steps leading down south to approach avenue
    world.fillBox(cx - 10, 1, cz - hd - 3, cx + 10, 1, cz - hd, BLOCK.WHITE_MARBLE);

    // Stone Lions guarding Mountain Gate approach
    DetailBuilder.buildStoneLion(world, cx - 12, 1, cz - hd - 4, -1, true);
    DetailBuilder.buildStoneLion(world, cx + 12, 1, cz - hd - 4, -1, false);

    // 2. Gateway Walls & Columns (Y = 3..10)
    const minX = cx - hw + 1;
    const maxX = cx + hw - 1;
    const minZ = cz - hd + 1;
    const maxZ = cz + hd - 1;

    world.fillBox(minX, 3, minZ, maxX, 10, maxZ, BLOCK.RED_WALL);
    world.fillBox(minX + 1, 3, minZ + 1, maxX - 1, 10, maxZ - 1, BLOCK.AIR);

    // Columns along front and back
    for (const x of [minX, cx - 10, cx - 4, cx + 4, cx + 10, maxX]) {
      for (let y = 3; y <= 10; y++) {
        world.setVoxel(x, y, minZ, BLOCK.RED_COLUMN);
        world.setVoxel(x, y, maxZ, BLOCK.RED_COLUMN);
      }
    }

    // 3. Triple Passageways (三门: 空门、无相门、无作门)
    // Central Main Gate Portal (空门: X = -3..3)
    for (let x = cx - 3; x <= cx + 3; x++) {
      for (let y = 2; y <= 7; y++) {
        world.setVoxel(x, y, minZ, BLOCK.AIR);
        world.setVoxel(x, y, maxZ, BLOCK.AIR);
        world.setVoxel(x, y, cz, BLOCK.AIR);
      }
    }
    // Arched portal lintel in central gate
    world.setVoxel(cx - 3, 7, minZ, BLOCK.RED_WALL);
    world.setVoxel(cx + 3, 7, minZ, BLOCK.RED_WALL);

    // Left Gate Portal (无相门: X = -9..-7)
    for (let x = cx - 9; x <= cx - 7; x++) {
      for (let y = 2; y <= 6; y++) {
        world.setVoxel(x, y, minZ, BLOCK.AIR);
        world.setVoxel(x, y, maxZ, BLOCK.AIR);
      }
    }

    // Right Gate Portal (无作门: X = 7..9)
    for (let x = cx + 7; x <= cx + 9; x++) {
      for (let y = 2; y <= 6; y++) {
        world.setVoxel(x, y, minZ, BLOCK.AIR);
        world.setVoxel(x, y, maxZ, BLOCK.AIR);
      }
    }

    // Horizontal Plaque: "山门殿"
    world.fillBox(cx - 3, 8, minZ - 1, cx + 3, 9, minZ - 1, BLOCK.PLAQUE_BLACK);
    world.setVoxel(cx - 2, 9, minZ - 2, BLOCK.PLAQUE_GOLD);
    world.setVoxel(cx, 9, minZ - 2, BLOCK.PLAQUE_GOLD);
    world.setVoxel(cx + 2, 9, minZ - 2, BLOCK.PLAQUE_GOLD);

    // 4. Dougong Bracket Band at Y = 10..12
    DougongBuilder.buildPerimeterDougong(world, {
      minX,
      maxX,
      y: 10,
      minZ,
      maxZ,
      columnSpacing: 6,
    });

    // 5. Xieshan Flying Eaves Roof
    RoofBuilder.buildSlopedRoof(world, {
      cx,
      baseY: 12,
      cz,
      width: 38,
      depth: 22,
      height: 9,
      ridgeLength: 18,
      tileType: BLOCK.CYAN_TILE,
      ridgeType: BLOCK.GOLD_RIDGE,
      isXieshan: true,
      cornerLift: 3,
    });

    // Hanging Lanterns
    DetailBuilder.placeHangingLantern(world, cx - 6, 11, minZ - 1);
    DetailBuilder.placeHangingLantern(world, cx + 6, 11, minZ - 1);
  }

  /**
   * 4. Bell Tower (钟楼) & Drum Tower (鼓楼)
   * Double-tier pavilion towers flanking the front courtyard.
   */
  static buildTower(world, cx, cz, isBellTower = true) {
    const size = 16;
    const hs = Math.floor(size / 2);

    // --- Tier 1: Masonry Podium & Lower Story (Y = 1..10) ---
    // Stone Podium (Y = 1..2)
    world.fillBox(cx - hs, 1, cz - hs, cx + hs, 1, cz + hs, BLOCK.DARK_STONE);
    world.fillBox(cx - hs + 1, 2, cz - hs + 1, cx + hs - 1, 2, cz + hs - 1, BLOCK.GREY_STONE);

    // Entrance steps
    world.fillBox(cx - 2, 1, cz - hs - 2, cx + 2, 1, cz - hs, BLOCK.WHITE_MARBLE);

    // Lower masonry walls in vermilion
    const wMinX = cx - hs + 1;
    const wMaxX = cx + hs - 1;
    const wMinZ = cz - hs + 1;
    const wMaxZ = cz + hs - 1;

    world.fillBox(wMinX, 3, wMinZ, wMaxX, 9, wMaxZ, BLOCK.RED_WALL);
    world.fillBox(wMinX + 1, 3, wMinZ + 1, wMaxX - 1, 9, wMaxZ - 1, BLOCK.AIR);

    // Corner columns
    for (const x of [wMinX, wMaxX]) {
      for (const z of [wMinZ, wMaxZ]) {
        for (let y = 3; y <= 9; y++) {
          world.setVoxel(x, y, z, BLOCK.RED_COLUMN);
        }
      }
    }

    // Arched portal opening in lower story
    for (let x = cx - 2; x <= cx + 2; x++) {
      for (let y = 3; y <= 7; y++) {
        world.setVoxel(x, y, wMinZ, BLOCK.AIR);
        world.setVoxel(x, y, wMaxZ, BLOCK.AIR);
      }
    }

    // Lower Skirt Eaves at Y = 10
    RoofBuilder.buildPyramidRoof(world, {
      cx,
      baseY: 9,
      cz,
      radius: hs + 2,
      height: 3,
      tileType: BLOCK.CYAN_TILE,
      ridgeType: BLOCK.CYAN_RIDGE,
      cornerLift: 2,
    });

    // --- Tier 2: Open Colonnade Pavilion with Balustrade (平座: Y = 12..18) ---
    const t2MinX = cx - hs + 2;
    const t2MaxX = cx + hs - 2;
    const t2MinZ = cz - hs + 2;
    const t2MaxZ = cz + hs - 2;

    // Floor
    world.fillBox(t2MinX, 12, t2MinZ, t2MaxX, 12, t2MaxZ, BLOCK.DARK_WOOD);

    // Balustrade railing at Y = 13
    for (let x = t2MinX; x <= t2MaxX; x++) {
      world.setVoxel(x, 13, t2MinZ, BLOCK.LIGHT_WOOD);
      world.setVoxel(x, 13, t2MaxZ, BLOCK.LIGHT_WOOD);
    }
    for (let z = t2MinZ; z <= t2MaxZ; z++) {
      world.setVoxel(t2MinX, 13, z, BLOCK.LIGHT_WOOD);
      world.setVoxel(t2MaxX, 13, z, BLOCK.LIGHT_WOOD);
    }

    // Pavilion Columns (12 open columns)
    for (const x of [t2MinX + 1, cx, t2MaxX - 1]) {
      for (const z of [t2MinZ + 1, cz, t2MaxZ - 1]) {
        if (!(x === cx && z === cz)) {
          for (let y = 13; y <= 18; y++) {
            world.setVoxel(x, y, z, BLOCK.RED_COLUMN);
          }
        }
      }
    }

    // Inside Pavilion: Visible Bronze Bell or Ceremonial Drum!
    if (isBellTower) {
      // Giant hanging Patina Bronze Bell (大铜钟)
      // Hanging beam
      world.fillBox(cx - 2, 17, cz, cx + 2, 17, cz, BLOCK.DARK_WOOD);
      // Bell body
      world.fillBox(cx - 1, 14, cz - 1, cx + 1, 16, cz + 1, BLOCK.BRONZE);
      world.fillBox(cx - 2, 13, cz - 2, cx + 2, 13, cz + 2, BLOCK.BRONZE); // Bell lip
    } else {
      // Giant Ceremonial Drum (大鼓)
      // Wooden drum stand
      world.setVoxel(cx - 2, 13, cz, BLOCK.DARK_WOOD);
      world.setVoxel(cx + 2, 13, cz, BLOCK.DARK_WOOD);
      // Drum cylinder
      world.fillBox(cx - 2, 14, cz - 1, cx + 2, 16, cz + 1, BLOCK.DOOR_WOOD);
      // Drum skin faces (white/leather) with gold studs
      for (let y = 14; y <= 16; y++) {
        world.setVoxel(cx - 3, y, cz, BLOCK.WHITE_MARBLE);
        world.setVoxel(cx + 3, y, cz, BLOCK.WHITE_MARBLE);
      }
      world.setVoxel(cx - 3, 15, cz, BLOCK.DOOR_GOLD);
      world.setVoxel(cx + 3, 15, cz, BLOCK.DOOR_GOLD);
    }

    // Upper Dougong bracket band at Y = 18..19
    DougongBuilder.buildPerimeterDougong(world, {
      minX: t2MinX + 1,
      maxX: t2MaxX - 1,
      y: 18,
      minZ: t2MinZ + 1,
      maxZ: t2MaxZ - 1,
      columnSpacing: 4,
    });

    // Upper Pyramidal Cuanjian Roof with Golden Finial Spire
    RoofBuilder.buildPyramidRoof(world, {
      cx,
      baseY: 20,
      cz,
      radius: hs + 1,
      height: 7,
      tileType: BLOCK.CYAN_TILE,
      ridgeType: BLOCK.CYAN_RIDGE,
      finialType: BLOCK.GOLD_FINIAL,
      cornerLift: 3,
    });

    // Hanging Lanterns
    DetailBuilder.placeHangingLantern(world, cx - hs + 1, 19, cz - hs + 1);
    DetailBuilder.placeHangingLantern(world, cx + hs - 1, 19, cz - hs + 1);
    DetailBuilder.placeHangingLantern(world, cx - hs + 1, 19, cz + hs - 1);
    DetailBuilder.placeHangingLantern(world, cx + hs - 1, 19, cz + hs - 1);
  }
}
