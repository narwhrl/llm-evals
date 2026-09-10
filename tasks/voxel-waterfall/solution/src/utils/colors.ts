import * as THREE from 'three';
import { VoxelType, TimeOfDay } from './types';

// Minecraft-inspired vibrant color palette with subtle realistic tones
export const VOXEL_COLORS: Record<VoxelType, number> = {
  [VoxelType.AIR]: 0x000000,
  [VoxelType.GRASS]: 0x5b8e32,
  [VoxelType.GRASS_DARK]: 0x487528,
  [VoxelType.DIRT]: 0x866043,
  [VoxelType.STONE]: 0x7c8288,
  [VoxelType.STONE_DARK]: 0x5a6067,
  [VoxelType.STONE_MOSS]: 0x5e7052,
  [VoxelType.SNOW]: 0xf0f5ff,
  [VoxelType.ICE]: 0xd2eaf7,
  [VoxelType.SAND]: 0xdcc696,
  [VoxelType.GRAVEL]: 0x8f8c87,
  [VoxelType.WOOD_TRUNK]: 0x5a3e26,
  [VoxelType.WOOD_BIRCH]: 0xded8ce,
  [VoxelType.LEAVES_PINE]: 0x274e2d,
  [VoxelType.LEAVES_OAK]: 0x3d7a26,
  [VoxelType.LEAVES_SAKURA]: 0xfca5c9,
  [VoxelType.WATER]: 0x299bd6,
  [VoxelType.WATER_FALL]: 0x6dd5fa,
  [VoxelType.CLOUD]: 0xffffff,
  [VoxelType.FLOWER_RED]: 0xe03131,
  [VoxelType.FLOWER_YELLOW]: 0xfcc419,
  [VoxelType.FLOWER_BLUE]: 0x339af0,
  [VoxelType.WOOD_PLANK]: 0xa87948,
  [VoxelType.LANTERN]: 0xffd166,
};

export interface LightingPreset {
  skyTopColor: number;
  skyBottomColor: number;
  fogColor: number;
  sunColor: number;
  sunIntensity: number;
  ambientColor: number;
  ambientIntensity: number;
  sunPosition: [number, number, number];
  cloudTint: number;
  waterColor: number;
  waterEmissive: number;
  name: string;
}

export const LIGHTING_PRESETS: Record<TimeOfDay, LightingPreset> = {
  dawn: {
    name: '晨曦 (Dawn)',
    skyTopColor: 0x4a3f6b,
    skyBottomColor: 0xffa07a,
    fogColor: 0xfcb294,
    sunColor: 0xffb07c,
    sunIntensity: 1.6,
    ambientColor: 0x7a637a,
    ambientIntensity: 0.7,
    sunPosition: [120, 35, -100],
    cloudTint: 0xffd2c4,
    waterColor: 0x2b80a8,
    waterEmissive: 0x0a1b24,
  },
  day: {
    name: '晴空 (Day)',
    skyTopColor: 0x4ba3e3,
    skyBottomColor: 0xb5e0f8,
    fogColor: 0xcae8fa,
    sunColor: 0xfffae8,
    sunIntensity: 2.2,
    ambientColor: 0x8ebbdb,
    ambientIntensity: 0.9,
    sunPosition: [80, 140, 60],
    cloudTint: 0xffffff,
    waterColor: 0x299bd6,
    waterEmissive: 0x08253a,
  },
  sunset: {
    name: '晚霞 (Sunset)',
    skyTopColor: 0x2c2b58,
    skyBottomColor: 0xea5f43,
    fogColor: 0xd97452,
    sunColor: 0xff7b39,
    sunIntensity: 2.0,
    ambientColor: 0x784a56,
    ambientIntensity: 0.65,
    sunPosition: [-130, 25, 80],
    cloudTint: 0xffb38a,
    waterColor: 0x7d496a,
    waterEmissive: 0x260a16,
  },
  night: {
    name: '月夜 (Night)',
    skyTopColor: 0x060b18,
    skyBottomColor: 0x121d33,
    fogColor: 0x0e1728,
    sunColor: 0x93b7e8,
    sunIntensity: 0.8,
    ambientColor: 0x1f2e4d,
    ambientIntensity: 0.45,
    sunPosition: [-70, 110, -80],
    cloudTint: 0x7b8ea8,
    waterColor: 0x13344d,
    waterEmissive: 0x051320,
  },
  fantasy: {
    name: '极光幻境 (Fantasy Aurora)',
    skyTopColor: 0x12082b,
    skyBottomColor: 0x1a4959,
    fogColor: 0x18434a,
    sunColor: 0x5ef2b8,
    sunIntensity: 1.5,
    ambientColor: 0x4f2d68,
    ambientIntensity: 0.8,
    sunPosition: [50, 90, -110],
    cloudTint: 0xaef7e0,
    waterColor: 0x1fa69b,
    waterEmissive: 0x073b37,
  },
};
