/**
 * Voxel Block Types and Material Definitions
 * Designed for Chinese Classical Architecture in Three.js
 */

export const BLOCK = {
  AIR: 0,
  
  // Roof Materials
  GOLD_TILE: 1,         // Imperial glazed golden yellow roof tile
  GOLD_RIDGE: 2,        // Ridge cap and flying eaves upturned corner
  CYAN_TILE: 3,         // Dark slate / cyan-grey roof tile (side halls / pagoda)
  CYAN_RIDGE: 4,        // Dark ridge cap
  
  // Wall & Structural Materials
  RED_WALL: 5,          // Vermilion red palace wall
  RED_COLUMN: 6,        // Deep vermilion lacquer column
  DARK_WOOD: 7,         // Sandalwood/mahogany primary beams and lintels
  LIGHT_WOOD: 8,        // Cedar/pine bracket arms and rafters
  
  // Decorative Painting (Caihua 彩画 / Dougong 斗拱)
  DOUGONG_GREEN: 9,     // Turquoise/mineral green decorative bracket
  DOUGONG_BLUE: 10,     // Royal mineral blue bracket accent
  GOLD_ORNAMENT: 11,    // Gilded bracket ornament / Chiwen ridge beast
  
  // Stone & Podium Materials
  WHITE_MARBLE: 12,     // Han white marble (podium, balustrade, railings)
  WHITE_MARBLE_CARVED: 13, // Carved dragon/cloud ramp (Danbi stone 丹陛石)
  GREY_STONE: 14,       // Courtyard paving stone
  DARK_STONE: 15,       // Plinth foundation / pathway curb border
  YELLOW_STONE: 16,     // Royal central imperial road pavers
  
  // Architectural Openings & Doors
  LATTICE_WINDOW: 17,   // Translucent paper/wood lattice window with interior warm glow
  DOOR_WOOD: 18,        // Ornate dark red wooden door
  DOOR_GOLD: 19,        // Golden door studs and bronze knocker
  PLAQUE_BLACK: 20,     // Lacquered horizontal plaque base
  PLAQUE_GOLD: 21,      // Gilded calligraphy on plaque
  
  // Lighting & Ornaments
  LANTERN_RED: 22,      // Glowing red silk lantern
  LANTERN_GOLD: 23,     // Lantern gold crown and tassel
  BRONZE: 24,           // Patina bronze (Grand incense burner / bell)
  INCENSE_SMOKE: 25,    // Voxel incense smoke puff
  GOLD_FINIAL: 26,      // Pagoda golden spire and rings (Xianglun 相轮)
  
  // Nature & Landscape
  WATER: 27,            // Clear lotus pond water
  LOTUS_LEAF: 28,       // Green lotus pad
  LOTUS_FLOWER: 29,     // Pink lotus blossom
  GRASS: 30,            // Natural green lawn
  PINE_LEAF: 31,        // Deep emerald pine needles
  PINE_TRUNK: 32,       // Textured pine bark
  WALL_CAP: 33,         // Dark grey tile capping for perimeter walls
};

/**
 * Material configurations for Three.js MeshStandardMaterial
 */
export const MATERIAL_CONFIGS = {
  [BLOCK.GOLD_TILE]: {
    color: 0xdca028,
    roughness: 0.42,
    metalness: 0.15,
  },
  [BLOCK.GOLD_RIDGE]: {
    color: 0xeead2d,
    roughness: 0.32,
    metalness: 0.28,
  },
  [BLOCK.CYAN_TILE]: {
    color: 0x36454f,
    roughness: 0.58,
    metalness: 0.1,
  },
  [BLOCK.CYAN_RIDGE]: {
    color: 0x242f36,
    roughness: 0.5,
    metalness: 0.1,
  },
  [BLOCK.RED_WALL]: {
    color: 0x932720,
    roughness: 0.72,
    metalness: 0.05,
  },
  [BLOCK.RED_COLUMN]: {
    color: 0x7a1e18,
    roughness: 0.48,
    metalness: 0.08,
  },
  [BLOCK.DARK_WOOD]: {
    color: 0x482413,
    roughness: 0.68,
    metalness: 0.05,
  },
  [BLOCK.LIGHT_WOOD]: {
    color: 0x8a5531,
    roughness: 0.65,
    metalness: 0.05,
  },
  [BLOCK.DOUGONG_GREEN]: {
    color: 0x1f6d57,
    roughness: 0.5,
    metalness: 0.1,
  },
  [BLOCK.DOUGONG_BLUE]: {
    color: 0x22467d,
    roughness: 0.5,
    metalness: 0.1,
  },
  [BLOCK.GOLD_ORNAMENT]: {
    color: 0xf5b82e,
    roughness: 0.3,
    metalness: 0.45,
  },
  [BLOCK.WHITE_MARBLE]: {
    color: 0xe8e8df,
    roughness: 0.38,
    metalness: 0.05,
  },
  [BLOCK.WHITE_MARBLE_CARVED]: {
    color: 0xd8d8ce,
    roughness: 0.48,
    metalness: 0.08,
  },
  [BLOCK.GREY_STONE]: {
    color: 0x6e767c,
    roughness: 0.82,
    metalness: 0.04,
  },
  [BLOCK.DARK_STONE]: {
    color: 0x474e53,
    roughness: 0.85,
    metalness: 0.04,
  },
  [BLOCK.YELLOW_STONE]: {
    color: 0xa89e86,
    roughness: 0.78,
    metalness: 0.05,
  },
  [BLOCK.LATTICE_WINDOW]: {
    color: 0xf5d99b,
    roughness: 0.55,
    metalness: 0.05,
    emissive: 0x8a5518,
    emissiveIntensity: 0.4,
  },
  [BLOCK.DOOR_WOOD]: {
    color: 0x5a1813,
    roughness: 0.58,
    metalness: 0.06,
  },
  [BLOCK.DOOR_GOLD]: {
    color: 0xebb32e,
    roughness: 0.35,
    metalness: 0.6,
  },
  [BLOCK.PLAQUE_BLACK]: {
    color: 0x141618,
    roughness: 0.45,
    metalness: 0.1,
  },
  [BLOCK.PLAQUE_GOLD]: {
    color: 0xffca28,
    roughness: 0.28,
    metalness: 0.55,
  },
  [BLOCK.LANTERN_RED]: {
    color: 0xd32f2f,
    roughness: 0.35,
    metalness: 0.05,
    emissive: 0xff2200,
    emissiveIntensity: 0.8,
  },
  [BLOCK.LANTERN_GOLD]: {
    color: 0xfbc02d,
    roughness: 0.32,
    metalness: 0.4,
  },
  [BLOCK.BRONZE]: {
    color: 0x3d5447,
    roughness: 0.52,
    metalness: 0.45,
  },
  [BLOCK.INCENSE_SMOKE]: {
    color: 0xe0e6ed,
    roughness: 0.9,
    metalness: 0.0,
    transparent: true,
    opacity: 0.55,
  },
  [BLOCK.GOLD_FINIAL]: {
    color: 0xffc400,
    roughness: 0.25,
    metalness: 0.7,
  },
  [BLOCK.WATER]: {
    color: 0x2d7aa5,
    roughness: 0.15,
    metalness: 0.2,
    transparent: true,
    opacity: 0.82,
  },
  [BLOCK.LOTUS_LEAF]: {
    color: 0x2e7d32,
    roughness: 0.65,
    metalness: 0.05,
  },
  [BLOCK.LOTUS_FLOWER]: {
    color: 0xec407a,
    roughness: 0.45,
    metalness: 0.08,
  },
  [BLOCK.GRASS]: {
    color: 0x4f7836,
    roughness: 0.88,
    metalness: 0.02,
  },
  [BLOCK.PINE_LEAF]: {
    color: 0x1e462d,
    roughness: 0.85,
    metalness: 0.03,
  },
  [BLOCK.PINE_TRUNK]: {
    color: 0x442c1c,
    roughness: 0.82,
    metalness: 0.03,
  },
  [BLOCK.WALL_CAP]: {
    color: 0x374151,
    roughness: 0.62,
    metalness: 0.08,
  },
};
