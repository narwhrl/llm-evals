/**
 * Shared state defaults, parameter metadata, and quality tiers.
 *
 * The 21 required live parameters (task.md「核心参数」) map 1:1 to shader or
 * camera uniforms; groups/order drive the HUD built in a later commit.
 */

export const DEFAULT_PARAMS = {
  // 相机
  fov: 58,
  camDistance: 14,
  camAzimuth: 0,
  camElevation: 4,
  // 模拟
  timeScale: 1,
  // 吸积盘
  diskInner: 3.0,
  diskOuter: 12.0,
  diskHalfThickness: 0.18,
  diskTemperature: 6200,
  diskBrightness: 1.0,
  orbitalSpeed: 1.0,
  turbulenceAmplitude: 0.75,
  turbulenceSpeed: 1.0,
  // 背景
  starDensity: 0.55,
  galaxyBrightness: 1.0,
  // 后处理
  bloomStrength: 0.85,
  bloomThreshold: 1.0,
  exposure: 1.15,
  vignette: 0.55,
  grain: 0.06,
  aberration: 0.5,
};

/**
 * Parameter metadata: HUD label, slider range/step, group, and unit.
 * `uniform` names the shader/camera sink resolved by the renderer.
 */
export const PARAM_DEFS = [
  { key: 'fov', label: '视场角', min: 24, max: 100, step: 1, group: '相机', unit: '°' },
  { key: 'camDistance', label: '相机距离', min: 3.5, max: 60, step: 0.1, group: '相机', unit: 'rₛ' },
  { key: 'camAzimuth', label: '相机方位角', min: -180, max: 180, step: 1, group: '相机', unit: '°' },
  { key: 'camElevation', label: '相机俯仰角', min: -89, max: 89, step: 1, group: '相机', unit: '°' },
  { key: 'timeScale', label: '时间倍率', min: 0, max: 4, step: 0.05, group: '模拟', unit: '×' },
  { key: 'diskInner', label: '盘内半径', min: 1.6, max: 8, step: 0.05, group: '吸积盘', unit: 'rₛ' },
  { key: 'diskOuter', label: '盘外半径', min: 4, max: 24, step: 0.1, group: '吸积盘', unit: 'rₛ' },
  { key: 'diskHalfThickness', label: '盘半厚度', min: 0.03, max: 0.8, step: 0.01, group: '吸积盘', unit: 'rₛ' },
  { key: 'diskTemperature', label: '盘温度', min: 2000, max: 12000, step: 50, group: '吸积盘', unit: 'K' },
  { key: 'diskBrightness', label: '盘发射强度', min: 0, max: 3, step: 0.01, group: '吸积盘', unit: '' },
  { key: 'orbitalSpeed', label: '轨道速度倍率', min: 0, max: 1.4, step: 0.01, group: '吸积盘', unit: '×' },
  { key: 'turbulenceAmplitude', label: '湍流幅度', min: 0, max: 1, step: 0.01, group: '吸积盘', unit: '' },
  { key: 'turbulenceSpeed', label: '湍流速度', min: 0, max: 4, step: 0.05, group: '吸积盘', unit: '×' },
  { key: 'starDensity', label: '恒星密度', min: 0, max: 1, step: 0.01, group: '背景', unit: '' },
  { key: 'galaxyBrightness', label: '银河亮度', min: 0, max: 3, step: 0.01, group: '背景', unit: '' },
  { key: 'bloomStrength', label: 'Bloom 强度', min: 0, max: 2, step: 0.01, group: '后处理', unit: '' },
  { key: 'bloomThreshold', label: 'Bloom 阈值', min: 0, max: 3, step: 0.01, group: '后处理', unit: '' },
  { key: 'exposure', label: '曝光', min: 0.2, max: 3, step: 0.01, group: '后处理', unit: '' },
  { key: 'vignette', label: '暗角强度', min: 0, max: 1.5, step: 0.01, group: '后处理', unit: '' },
  { key: 'grain', label: '胶片颗粒', min: 0, max: 0.3, step: 0.005, group: '后处理', unit: '' },
  { key: 'aberration', label: '色散强度', min: 0, max: 2, step: 0.01, group: '后处理', unit: '' },
];

/** Camera presets (task.md: ≥4 个视角预设，Shift+1–4 切换). */
export const CAMERA_PRESETS = [
  { name: '赤道边缘', distance: 14, azimuth: 0, elevation: 4, fov: 58 },
  { name: '高轨俯瞰', distance: 26, azimuth: 42, elevation: 33, fov: 50 },
  { name: '光子环特写', distance: 7.5, azimuth: 158, elevation: 2, fov: 38 },
  { name: '极区倾斜', distance: 19, azimuth: 268, elevation: 57, fov: 55 },
];

/** Debug view metadata (keys 0–9); the shader muxes on the same integers. */
export const DEBUG_VIEWS = [
  { key: 0, name: '最终合成', desc: 'ACES + Bloom 后的成片画面' },
  { key: 1, name: '步进/终止', desc: '测地线积分步数热图与终止类型（红=步数耗尽，暗红=落入视界，蓝=逃逸）' },
  { key: 2, name: '事件视界掩码', desc: '被事件视界捕获的射线显示为白' },
  { key: 3, name: '盘面交点阶次', desc: '橙=一次像，青=二次像，白=更高阶像' },
  { key: 4, name: '红移/Doppler', desc: '首次盘面穿越的 g 因子：蓝=多普勒增亮，红=红移去增亮' },
  { key: 5, name: '背景透镜坐标', desc: '逃逸方向的经纬网格，可见透镜扭曲' },
  { key: 6, name: '星空/银河', desc: '透镜后程序化天空（无盘）' },
  { key: 7, name: '后处理前 HDR', desc: '进入后处理前的 HDR 值（仅曝光）' },
  { key: 8, name: '仅盘面发射', desc: '关闭天空，仅吸积盘的多次穿越发射' },
  { key: 9, name: '捕获边界', desc: '冲击参数热图与临界带 b ≈ 2.598 rₛ' },
];

/**
 * Quality tiers really change the render budget: internal resolution scale,
 * geodesic step budget, turbulence octaves, bloom mips, and DPR cap.
 */
export const QUALITY_TIERS = {
  standard: { label: 'Standard', renderScale: 0.55, maxSteps: 160, turbOctaves: 3, bloomMips: 3, maxDpr: 1.25 },
  high: { label: 'High', renderScale: 0.75, maxSteps: 288, turbOctaves: 4, bloomMips: 4, maxDpr: 1.5 },
  cinematic: { label: 'Cinematic', renderScale: 1.0, maxSteps: 416, turbOctaves: 5, bloomMips: 5, maxDpr: 2.0 },
};

export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

/** Versioned localStorage key; bump SCHEMA_VERSION to invalidate old state. */
export const STORAGE_KEY = 'gargantua.settings.v1';
export const SCHEMA_VERSION = 1;
