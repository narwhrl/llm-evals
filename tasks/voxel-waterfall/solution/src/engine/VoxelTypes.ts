// 体素类型定义与材质色彩系统

export enum VoxelType {
  AIR = 0,
  BEDROCK = 1,
  STONE = 2,
  DARK_STONE = 3,
  LIGHT_STONE = 4,
  DIRT = 5,
  GRASS = 6,
  MOSS_STONE = 7,
  SNOW = 8,
  PACKED_ICE = 9,
  SAND = 10,
  GRAVEL = 11,
  WOOD_TRUNK = 12,
  WOOD_TOP = 13,
  LEAVES_PINE = 14,
  LEAVES_OAK = 15,
  LEAVES_AUTUMN = 16,
  WATER_STILL = 17,
  WATER_FLOW = 18,
  WATER_FOAM = 19,
  CLOUD = 20,
  FLOWER_RED = 21,
  FLOWER_YELLOW = 22,
  FLOWER_BLUE = 23,
  LILYPAD = 24,
  WOOD_PLANK = 25,
}

export interface VoxelDef {
  name: string;
  isTransparent: boolean;
  isFluid: boolean;
  isSolid: boolean;
  isEmissive?: boolean;
  // Top, bottom, side base colors [r, g, b] (0-1)
  topColor: [number, number, number];
  bottomColor: [number, number, number];
  sideColor: [number, number, number];
  roughness: number;
  metalness: number;
}

export const VOXEL_DEFS: Record<number, VoxelDef> = {
  [VoxelType.AIR]: {
    name: 'Air',
    isTransparent: true,
    isFluid: false,
    isSolid: false,
    topColor: [0, 0, 0],
    bottomColor: [0, 0, 0],
    sideColor: [0, 0, 0],
    roughness: 1,
    metalness: 0
  },
  [VoxelType.BEDROCK]: {
    name: 'Bedrock',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.12, 0.12, 0.14],
    bottomColor: [0.08, 0.08, 0.10],
    sideColor: [0.10, 0.10, 0.12],
    roughness: 0.95,
    metalness: 0.1
  },
  [VoxelType.STONE]: {
    name: 'Stone',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.52, 0.53, 0.55],
    bottomColor: [0.42, 0.43, 0.45],
    sideColor: [0.47, 0.48, 0.50],
    roughness: 0.9,
    metalness: 0.05
  },
  [VoxelType.DARK_STONE]: {
    name: 'Dark Stone',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.32, 0.33, 0.36],
    bottomColor: [0.24, 0.25, 0.27],
    sideColor: [0.28, 0.29, 0.31],
    roughness: 0.9,
    metalness: 0.1
  },
  [VoxelType.LIGHT_STONE]: {
    name: 'Light Stone',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.65, 0.65, 0.67],
    bottomColor: [0.55, 0.55, 0.57],
    sideColor: [0.60, 0.60, 0.62],
    roughness: 0.85,
    metalness: 0.05
  },
  [VoxelType.DIRT]: {
    name: 'Dirt',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.46, 0.32, 0.20],
    bottomColor: [0.38, 0.26, 0.16],
    sideColor: [0.42, 0.29, 0.18],
    roughness: 0.95,
    metalness: 0.0
  },
  [VoxelType.GRASS]: {
    name: 'Grass',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.32, 0.66, 0.22],     // 郁郁葱葱的草甸绿
    bottomColor: [0.40, 0.28, 0.18],  // 底部泥土
    sideColor: [0.38, 0.50, 0.20],    // 侧面草土混杂
    roughness: 0.9,
    metalness: 0.0
  },
  [VoxelType.MOSS_STONE]: {
    name: 'Mossy Stone',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.36, 0.52, 0.32],
    bottomColor: [0.38, 0.40, 0.36],
    sideColor: [0.35, 0.46, 0.32],
    roughness: 0.88,
    metalness: 0.02
  },
  [VoxelType.SNOW]: {
    name: 'Snow',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.94, 0.96, 0.98],
    bottomColor: [0.85, 0.88, 0.92],
    sideColor: [0.90, 0.93, 0.96],
    roughness: 0.75,
    metalness: 0.05
  },
  [VoxelType.PACKED_ICE]: {
    name: 'Packed Ice',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.65, 0.80, 0.92],
    bottomColor: [0.55, 0.72, 0.86],
    sideColor: [0.60, 0.76, 0.90],
    roughness: 0.4,
    metalness: 0.15
  },
  [VoxelType.SAND]: {
    name: 'Sand',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.84, 0.78, 0.58],
    bottomColor: [0.76, 0.70, 0.50],
    sideColor: [0.80, 0.74, 0.54],
    roughness: 0.95,
    metalness: 0.0
  },
  [VoxelType.GRAVEL]: {
    name: 'Gravel',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.54, 0.50, 0.48],
    bottomColor: [0.46, 0.42, 0.40],
    sideColor: [0.50, 0.46, 0.44],
    roughness: 0.95,
    metalness: 0.05
  },
  [VoxelType.WOOD_TRUNK]: {
    name: 'Wood Trunk',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.60, 0.48, 0.34],
    bottomColor: [0.50, 0.38, 0.25],
    sideColor: [0.35, 0.24, 0.15],
    roughness: 0.9,
    metalness: 0.0
  },
  [VoxelType.WOOD_TOP]: {
    name: 'Wood Top',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.62, 0.50, 0.36],
    bottomColor: [0.62, 0.50, 0.36],
    sideColor: [0.35, 0.24, 0.15],
    roughness: 0.9,
    metalness: 0.0
  },
  [VoxelType.LEAVES_PINE]: {
    name: 'Pine Leaves',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.16, 0.38, 0.22],
    bottomColor: [0.12, 0.28, 0.16],
    sideColor: [0.14, 0.34, 0.20],
    roughness: 0.85,
    metalness: 0.0
  },
  [VoxelType.LEAVES_OAK]: {
    name: 'Oak Leaves',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.26, 0.58, 0.20],
    bottomColor: [0.20, 0.46, 0.16],
    sideColor: [0.24, 0.52, 0.18],
    roughness: 0.85,
    metalness: 0.0
  },
  [VoxelType.LEAVES_AUTUMN]: {
    name: 'Autumn Leaves',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.86, 0.42, 0.16],
    bottomColor: [0.72, 0.32, 0.12],
    sideColor: [0.80, 0.38, 0.14],
    roughness: 0.85,
    metalness: 0.0
  },
  [VoxelType.WATER_STILL]: {
    name: 'Still Water',
    isTransparent: true,
    isFluid: true,
    isSolid: false,
    topColor: [0.18, 0.54, 0.78],
    bottomColor: [0.12, 0.40, 0.65],
    sideColor: [0.15, 0.48, 0.72],
    roughness: 0.1,
    metalness: 0.1
  },
  [VoxelType.WATER_FLOW]: {
    name: 'Flowing Water',
    isTransparent: true,
    isFluid: true,
    isSolid: false,
    topColor: [0.28, 0.68, 0.88],
    bottomColor: [0.20, 0.55, 0.75],
    sideColor: [0.25, 0.62, 0.82],
    roughness: 0.15,
    metalness: 0.1
  },
  [VoxelType.WATER_FOAM]: {
    name: 'Water Foam',
    isTransparent: true,
    isFluid: true,
    isSolid: false,
    topColor: [0.92, 0.96, 1.00],
    bottomColor: [0.75, 0.88, 0.95],
    sideColor: [0.85, 0.92, 0.98],
    roughness: 0.3,
    metalness: 0.05
  },
  [VoxelType.CLOUD]: {
    name: 'Cloud',
    isTransparent: true,
    isFluid: false,
    isSolid: false,
    topColor: [0.98, 0.98, 1.00],
    bottomColor: [0.82, 0.84, 0.92],
    sideColor: [0.92, 0.94, 0.98],
    roughness: 0.9,
    metalness: 0.0
  },
  [VoxelType.FLOWER_RED]: {
    name: 'Red Flower',
    isTransparent: false,
    isFluid: false,
    isSolid: false,
    topColor: [0.90, 0.18, 0.22],
    bottomColor: [0.25, 0.55, 0.20],
    sideColor: [0.85, 0.20, 0.25],
    roughness: 0.8,
    metalness: 0.0
  },
  [VoxelType.FLOWER_YELLOW]: {
    name: 'Yellow Flower',
    isTransparent: false,
    isFluid: false,
    isSolid: false,
    topColor: [0.98, 0.85, 0.12],
    bottomColor: [0.25, 0.55, 0.20],
    sideColor: [0.92, 0.78, 0.15],
    roughness: 0.8,
    metalness: 0.0
  },
  [VoxelType.FLOWER_BLUE]: {
    name: 'Blue Flower',
    isTransparent: false,
    isFluid: false,
    isSolid: false,
    topColor: [0.25, 0.52, 0.95],
    bottomColor: [0.25, 0.55, 0.20],
    sideColor: [0.28, 0.50, 0.90],
    roughness: 0.8,
    metalness: 0.0
  },
  [VoxelType.LILYPAD]: {
    name: 'Lilypad',
    isTransparent: false,
    isFluid: false,
    isSolid: false,
    topColor: [0.15, 0.48, 0.18],
    bottomColor: [0.10, 0.35, 0.12],
    sideColor: [0.12, 0.40, 0.15],
    roughness: 0.7,
    metalness: 0.0
  },
  [VoxelType.WOOD_PLANK]: {
    name: 'Wood Plank',
    isTransparent: false,
    isFluid: false,
    isSolid: true,
    topColor: [0.72, 0.55, 0.35],
    bottomColor: [0.60, 0.45, 0.28],
    sideColor: [0.65, 0.50, 0.32],
    roughness: 0.8,
    metalness: 0.0
  }
};
