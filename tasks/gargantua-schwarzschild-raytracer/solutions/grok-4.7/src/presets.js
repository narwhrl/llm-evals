export const PRESETS = [
  { id: 0, name: '赤道', en: 'Equator', fov: 46, distance: 14.5, azimuth: 24, polar: 72 },
  { id: 1, name: '天顶', en: 'Zenith', fov: 55, distance: 22, azimuth: 36, polar: 8 },
  { id: 2, name: '临边', en: 'Limb', fov: 32, distance: 9, azimuth: 206, polar: 78 },
  { id: 3, name: '远眺', en: 'Approach', fov: 68, distance: 36, azimuth: 132, polar: 54 },
]

export const QUALITY = {
  standard: {
    label: '标准',
    steps: 150,
    crossings: 3,
    stepScale: 1.18,
    scale: 0.58,
    dpr: 1,
    bloomPasses: 2,
    bloomTaps: 5,
  },
  high: {
    label: '高',
    steps: 230,
    crossings: 4,
    stepScale: 0.9,
    scale: 0.78,
    dpr: 1.35,
    bloomPasses: 4,
    bloomTaps: 9,
  },
  cinematic: {
    label: '电影',
    steps: 360,
    crossings: 6,
    stepScale: 0.68,
    scale: 1,
    dpr: 1.75,
    bloomPasses: 6,
    bloomTaps: 13,
  },
}

export const QUALITY_ORDER = ['standard', 'high', 'cinematic']

export const DEBUG_VIEWS = [
  { id: 0, name: '最终合成', detail: '测地线辐射、Bloom 与 ACES' },
  { id: 1, name: '光线步进', detail: '步数与终止：视界为红，步数上限为黄，逃逸为热力色' },
  { id: 2, name: '事件视界', detail: '落入视界为白，临界光子轨道附近的逃逸线为青' },
  { id: 3, name: '盘面交次', detail: '沿测地线的盘面穿越阶次：一次红、二次绿、三次蓝' },
  { id: 4, name: '红移 / Doppler', detail: '盘面 g 因子，接近侧偏蓝，远离侧偏红' },
  { id: 5, name: '透镜坐标', detail: '偏折后的出射方向，视界内为黑' },
  { id: 6, name: '星空', detail: '经透镜映射的程序化恒星' },
  { id: 7, name: '银河', detail: '经透镜映射的程序化银河' },
  { id: 8, name: '盘面辐射', detail: '仅吸积盘交点，无天空与后处理' },
  { id: 9, name: '后处理前 HDR', detail: '线性亮度的对数伪色，取 Bloom 与色调映射之前' },
]

const equator = PRESETS[0]

export const DEFAULT_PARAMS = {
  fov: equator.fov,
  distance: equator.distance,
  azimuth: equator.azimuth,
  polar: equator.polar,
  timeScale: 1,
  diskInner: 3.05,
  diskOuter: 12,
  diskThickness: 0.2,
  diskTemperature: 8800,
  diskEmission: 1.35,
  orbitalSpeed: 1,
  turbulence: 0.58,
  turbulenceSpeed: 0.7,
  starDensity: 0.78,
  galaxy: 1.15,
  bloomStrength: 0.16,
  bloomThreshold: 2.4,
  exposure: -1.05,
  vignette: 0.36,
  grain: 0.055,
  aberration: 0.14,
}

export const PARAM_SPECS = [
  { key: 'fov', label: '视场角', min: 20, max: 90, step: 0.1, digits: 1, unit: '°', group: '相机', camera: true },
  { key: 'distance', label: '相机距离', min: 5.5, max: 64, step: 0.1, digits: 2, unit: 'rs', group: '相机', camera: true },
  { key: 'azimuth', label: '方位角', min: 0, max: 360, step: 0.1, digits: 1, unit: '°', group: '相机', camera: true },
  { key: 'polar', label: '俯仰角', min: 4, max: 176, step: 0.1, digits: 1, unit: '°', group: '相机', camera: true },
  { key: 'timeScale', label: '时间倍率', min: 0, max: 4, step: 0.01, digits: 2, unit: '×', group: '相机' },
  { key: 'diskInner', label: '盘内半径', min: 1.7, max: 8, step: 0.01, digits: 2, unit: 'rs', group: '吸积盘' },
  { key: 'diskOuter', label: '盘外半径', min: 5, max: 28, step: 0.05, digits: 2, unit: 'rs', group: '吸积盘' },
  { key: 'diskThickness', label: '盘半厚度', min: 0.01, max: 1.4, step: 0.01, digits: 2, unit: 'rs', group: '吸积盘' },
  { key: 'diskTemperature', label: '盘温度', min: 2500, max: 14000, step: 10, digits: 0, unit: 'K', group: '吸积盘' },
  { key: 'diskEmission', label: '盘发射强度', min: 0.15, max: 5, step: 0.01, digits: 2, group: '吸积盘' },
  { key: 'orbitalSpeed', label: '轨道速度', min: 0, max: 1.75, step: 0.01, digits: 2, unit: '×', group: '吸积盘' },
  { key: 'turbulence', label: '湍流幅度', min: 0, max: 1, step: 0.01, digits: 2, group: '吸积盘' },
  { key: 'turbulenceSpeed', label: '湍流速度', min: 0, max: 3, step: 0.01, digits: 2, group: '吸积盘' },
  { key: 'starDensity', label: '恒星密度', min: 0, max: 1, step: 0.01, digits: 2, group: '背景' },
  { key: 'galaxy', label: '银河亮度', min: 0, max: 2, step: 0.01, digits: 2, group: '背景' },
  { key: 'bloomStrength', label: 'Bloom 强度', min: 0, max: 2, step: 0.01, digits: 2, group: '画面' },
  { key: 'bloomThreshold', label: 'Bloom 阈值', min: 0.15, max: 4, step: 0.01, digits: 2, group: '画面' },
  { key: 'exposure', label: '曝光', min: -2.5, max: 2.5, step: 0.01, digits: 2, unit: 'EV', group: '画面' },
  { key: 'vignette', label: '暗角', min: 0, max: 1, step: 0.01, digits: 2, group: '画面' },
  { key: 'grain', label: '胶片颗粒', min: 0, max: 1, step: 0.01, digits: 2, group: '画面' },
  { key: 'aberration', label: '色散', min: 0, max: 1, step: 0.01, digits: 2, group: '画面' },
]

export const CAMERA_KEYS = new Set(PARAM_SPECS.filter((spec) => spec.camera).map((spec) => spec.key))

export function defaultQuality() {
  if (typeof window !== 'undefined' && window.innerWidth < 780) return 'standard'
  return 'high'
}

export function defaultHud() {
  if (typeof window !== 'undefined' && window.innerWidth < 780) return false
  return true
}

export function presetPatch(index) {
  const preset = PRESETS[index]
  return {
    preset: index,
    playing: false,
    params: {
      fov: preset.fov,
      distance: preset.distance,
      azimuth: preset.azimuth,
      polar: preset.polar,
    },
  }
}
