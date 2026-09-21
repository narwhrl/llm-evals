export type BlockType =
  | 'grass'
  | 'dirt'
  | 'stone'
  | 'snow'
  | 'water'
  | 'waterfall'
  | 'sand'
  | 'leaf'
  | 'trunk'
  | 'cloud';

export interface SceneSettings {
  size: number;
  seed: number;
  mountainHeight: number;
  cloudHeight: number;
  cloudDensity: number;
  fogEnabled: boolean;
  fogDensity: number;
  waterfallSpeed: number;
  timeOfDay: number; // 0..1, 0=dawn, 0.5=noon, 1=dusk-ish cycle
  vegetation: boolean;
  autoOrbit: boolean;
  showClouds: boolean;
  waterOpacity: number;
}

export const DEFAULT_SETTINGS: SceneSettings = {
  size: 200,
  seed: 42,
  mountainHeight: 48,
  cloudHeight: 28,
  cloudDensity: 0.55,
  fogEnabled: true,
  fogDensity: 0.012,
  waterfallSpeed: 1,
  timeOfDay: 0.18,
  vegetation: true,
  autoOrbit: true,
  showClouds: true,
  waterOpacity: 0.75,
};

export const BLOCK_COLORS: Record<BlockType, number> = {
  grass: 0x5a8f3c,
  dirt: 0x8b5a2b,
  stone: 0x7a7a7a,
  snow: 0xeef5ff,
  water: 0x3a8fd0,
  waterfall: 0x6ec8f0,
  sand: 0xd2b48c,
  leaf: 0x3d7a2e,
  trunk: 0x6b4423,
  cloud: 0xf2f6fa,
};
