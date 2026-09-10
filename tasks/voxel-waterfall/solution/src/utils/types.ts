export type TimeOfDay = 'dawn' | 'day' | 'sunset' | 'night' | 'fantasy';

export interface SceneConfig {
  seed: number;
  gridSize: number; // e.g. 144
  terrainHeight: number; // max height e.g. 76
  waterLevel: number; // e.g. 14
  
  // Environment & Lighting
  timeOfDay: TimeOfDay;
  sunIntensity: number;
  fogDensity: number;
  
  // Clouds
  cloudAltitude: number; // e.g. 40
  cloudThickness: number; // e.g. 4
  cloudDensity: number; // 0.0 - 1.0
  cloudSpeed: number; // drift speed
  cloudPiercingEffect: boolean;
  
  // Waterfall & Water
  waterfallFlowSpeed: number;
  waterfallFoamIntensity: number;
  waterOpacity: number;
  splashParticleCount: number;
  
  // Foliage
  treeDensity: number;
  flowerDensity: number;
  
  // Camera
  autoRotate: boolean;
  autoRotateSpeed: number;
  cameraPreset: 'overview' | 'waterfall' | 'cloudPeak' | 'lakeShore' | 'cinematicTour' | 'custom';
}

export interface TerrainStats {
  gridSize: number;
  voxelCount: number;
  faceCount: number;
  treeCount: number;
  waterVoxelCount: number;
  cloudVoxelCount: number;
  fps: number;
}

export enum VoxelType {
  AIR = 0,
  GRASS = 1,
  GRASS_DARK = 2,
  DIRT = 3,
  STONE = 4,
  STONE_DARK = 5,
  STONE_MOSS = 6,
  SNOW = 7,
  ICE = 8,
  SAND = 9,
  GRAVEL = 10,
  WOOD_TRUNK = 11,
  WOOD_BIRCH = 12,
  LEAVES_PINE = 13,
  LEAVES_OAK = 14,
  LEAVES_SAKURA = 15,
  WATER = 16,
  WATER_FALL = 17,
  CLOUD = 18,
  FLOWER_RED = 19,
  FLOWER_YELLOW = 20,
  FLOWER_BLUE = 21,
  WOOD_PLANK = 22,
  LANTERN = 23,
}
