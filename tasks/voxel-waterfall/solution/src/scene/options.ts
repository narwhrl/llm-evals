export type TimeOfDay = 'dawn' | 'morning' | 'noon' | 'dusk' | 'night'

export type TimePreset = {
  label: string
  /** 太阳方位角（度，0 = +Z 方向，顺时针）。 */
  sunAzimuth: number
  /** 太阳高度角（度）。 */
  sunElevation: number
  sunColor: number
  sunIntensity: number
  hemiSky: number
  hemiGround: number
  hemiIntensity: number
  skyTop: number
  skyHorizon: number
  glowColor: number
  glowStrength: number
  fogColor: number
  exposure: number
}

/** 昼夜循环的先后顺序，循环播放时按此顺序插值。 */
export const TIME_ORDER: TimeOfDay[] = ['dawn', 'morning', 'noon', 'dusk', 'night']

export const TIME_PRESETS: Record<TimeOfDay, TimePreset> = {
  dawn: {
    label: '黎明',
    sunAzimuth: 96,
    sunElevation: 9,
    sunColor: 0xffb877,
    sunIntensity: 1.25,
    hemiSky: 0x9db4d6,
    hemiGround: 0x3a3830,
    hemiIntensity: 0.55,
    skyTop: 0x2f4b7c,
    skyHorizon: 0xf0a97a,
    glowColor: 0xffd2a3,
    glowStrength: 0.95,
    fogColor: 0xdfb69c,
    exposure: 1,
  },
  morning: {
    label: '上午',
    sunAzimuth: 126,
    sunElevation: 34,
    sunColor: 0xfff1d4,
    sunIntensity: 1.45,
    hemiSky: 0xbdd7ff,
    hemiGround: 0x565243,
    hemiIntensity: 0.72,
    skyTop: 0x3d79c4,
    skyHorizon: 0xd2e6f6,
    glowColor: 0xfff3da,
    glowStrength: 0.55,
    fogColor: 0xcfe1ef,
    exposure: 1.02,
  },
  noon: {
    label: '正午',
    sunAzimuth: 186,
    sunElevation: 66,
    sunColor: 0xffffff,
    sunIntensity: 1.55,
    hemiSky: 0xd2e9ff,
    hemiGround: 0x585646,
    hemiIntensity: 0.75,
    skyTop: 0x2e6cc2,
    skyHorizon: 0xdcecf8,
    glowColor: 0xffffff,
    glowStrength: 0.4,
    fogColor: 0xd9e9f3,
    exposure: 1.04,
  },
  dusk: {
    label: '黄昏',
    sunAzimuth: 256,
    sunElevation: 11,
    sunColor: 0xff8f4f,
    sunIntensity: 1.2,
    hemiSky: 0x8e83a8,
    hemiGround: 0x39302a,
    hemiIntensity: 0.5,
    skyTop: 0x2a3f70,
    skyHorizon: 0xf18b58,
    glowColor: 0xffb877,
    glowStrength: 1,
    fogColor: 0xd89b7b,
    exposure: 1,
  },
  night: {
    label: '夜晚',
    sunAzimuth: 305,
    sunElevation: 42,
    sunColor: 0xa9bde3,
    sunIntensity: 0.42,
    hemiSky: 0x2c3a5c,
    hemiGround: 0x14161d,
    hemiIntensity: 0.34,
    skyTop: 0x070c1a,
    skyHorizon: 0x1e2b46,
    glowColor: 0xa9bde3,
    glowStrength: 0.35,
    fogColor: 0x141c2e,
    exposure: 0.95,
  },
}

export type SceneOptions = {
  // 以下改动会重建世界几何
  seed: number
  terrainSize: number
  mountainScale: number
  peakCount: number
  seaLevel: number
  waterfallCount: number
  waterfallWidth: number
  cloudCover: number
  cloudHeight: number
  cloudThickness: number
  cloudMargin: number
  /** 云块的边长（体素单位）：越大越省面数，云也越方块化。 */
  cloudBlock: number
  vegetation: number
  // 以下改动即时生效
  timeOfDay: TimeOfDay
  dayCycle: boolean
  cycleSpeed: number
  fogDensity: number
  shadows: boolean
  shadowMapSize: number
  waterFlowSpeed: number
  cloudDriftSpeed: number
  autoRotate: boolean
  autoRotateSpeed: number
  mist: boolean
  haze: boolean
}

export const TERRAIN_SIZES = [200, 256, 320] as const
export const SHADOW_MAP_SIZES = [1024, 2048, 4096] as const
export const CLOUD_MARGINS = [128, 256, 384] as const
export const CLOUD_BLOCKS = [4, 6, 8] as const

export const DEFAULT_OPTIONS: SceneOptions = {
  seed: 20260922,
  terrainSize: 256,
  mountainScale: 1,
  peakCount: 4,
  seaLevel: 12,
  waterfallCount: 3,
  waterfallWidth: 3,
  cloudCover: 0.52,
  cloudHeight: 0.62,
  cloudThickness: 2,
  cloudMargin: 256,
  cloudBlock: 4,
  vegetation: 0.5,
  timeOfDay: 'morning',
  dayCycle: false,
  cycleSpeed: 0.12,
  fogDensity: 0.002,
  shadows: true,
  shadowMapSize: 2048,
  waterFlowSpeed: 1,
  cloudDriftSpeed: 0.5,
  autoRotate: true,
  autoRotateSpeed: 0.18,
  mist: true,
  haze: true,
}

export const REBUILD_KEYS: (keyof SceneOptions)[] = [
  'seed',
  'terrainSize',
  'mountainScale',
  'peakCount',
  'seaLevel',
  'waterfallCount',
  'waterfallWidth',
  'cloudCover',
  'cloudHeight',
  'cloudThickness',
  'cloudMargin',
  'cloudBlock',
  'vegetation',
]

export function optionsNeedRebuild(current: SceneOptions, next: SceneOptions): boolean {
  return REBUILD_KEYS.some((key) => current[key] !== next[key])
}
