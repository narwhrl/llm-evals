// Single source of truth for parameter metadata (drives UI sliders AND
// validation/clamping for persistence + the URL capture contract).
export type ParamKey =
  | 'fov'
  | 'camDistance'
  | 'camAzimuth'
  | 'camPolar'
  | 'timeScale'
  | 'diskInner'
  | 'diskOuter'
  | 'diskThickness'
  | 'diskTemp'
  | 'diskIntensity'
  | 'orbitSpeed'
  | 'turbAmp'
  | 'turbSpeed'
  | 'starDensity'
  | 'milkyWay'
  | 'bloomStrength'
  | 'bloomThreshold'
  | 'exposure'
  | 'vignette'
  | 'grain'
  | 'chroma';

export type ParamGroup = 'camera' | 'disk' | 'background' | 'post';

export interface ParamDef {
  key: ParamKey;
  label: string;
  hint: string;
  group: ParamGroup;
  min: number;
  max: number;
  step: number;
  def: number;
  unit?: string;
  digits?: number;
}

export const GROUP_LABELS: Record<ParamGroup, string> = {
  camera: '相机 / 时间',
  disk: '吸积盘',
  background: '星空背景',
  post: '后期处理',
};

export const PARAM_DEFS: ParamDef[] = [
  { key: 'fov',           label: '视场角 FOV', hint: '相机垂直视场角', group: 'camera', min: 25, max: 90, step: 1, def: 55, unit: '°', digits: 0 },
  { key: 'camDistance',   label: '相机距离',   hint: '到黑洞的距离(rₛ)', group: 'camera', min: 2.5, max: 45, step: 0.1, def: 15, unit: ' rₛ', digits: 1 },
  { key: 'camAzimuth',    label: '方位角',     hint: '绕竖直轴的角度', group: 'camera', min: -180, max: 180, step: 1, def: 35, unit: '°', digits: 0 },
  { key: 'camPolar',      label: '俯仰角',     hint: '相对赤道面(90°=赤道)', group: 'camera', min: 3, max: 177, step: 1, def: 82, unit: '°', digits: 0 },
  { key: 'timeScale',     label: '时间倍率',   hint: '模拟时间推进速度', group: 'camera', min: 0, max: 4, step: 0.05, def: 1, digits: 2 },
  { key: 'diskInner',     label: '盘内半径',   hint: '吸积盘内缘(ISCO=3)', group: 'disk', min: 1.6, max: 5, step: 0.05, def: 2.6, unit: ' rₛ', digits: 2 },
  { key: 'diskOuter',     label: '盘外半径',   hint: '吸积盘外缘', group: 'disk', min: 6, max: 18, step: 0.1, def: 12, unit: ' rₛ', digits: 1 },
  { key: 'diskThickness', label: '盘半厚度',   hint: '盘面不透明度/厚度感', group: 'disk', min: 0.05, max: 1.2, step: 0.01, def: 0.35, digits: 2 },
  { key: 'diskTemp',      label: '盘温度',     hint: '黑体色温标度', group: 'disk', min: 0.4, max: 2.4, step: 0.01, def: 1.0, digits: 2 },
  { key: 'diskIntensity', label: '盘发射强度', hint: '整体辐射增益', group: 'disk', min: 0, max: 4, step: 0.05, def: 1.0, digits: 2 },
  { key: 'orbitSpeed',    label: '轨道速度倍率', hint: 'Kepler 转速与 Doppler 标度', group: 'disk', min: 0, max: 3, step: 0.05, def: 1, digits: 2 },
  { key: 'turbAmp',       label: '湍流幅度',   hint: '盘面湍流对比度', group: 'disk', min: 0, max: 1.5, step: 0.01, def: 0.55, digits: 2 },
  { key: 'turbSpeed',     label: '湍流速度',   hint: '湍流演化速度', group: 'disk', min: 0, max: 4, step: 0.05, def: 1, digits: 2 },
  { key: 'starDensity',   label: '恒星密度',   hint: '程序化星星数量', group: 'background', min: 0, max: 1, step: 0.01, def: 0.7, digits: 2 },
  { key: 'milkyWay',      label: '银河亮度',   hint: '银河带亮度', group: 'background', min: 0, max: 2, step: 0.02, def: 0.9, digits: 2 },
  { key: 'bloomStrength', label: 'Bloom 强度', hint: '泛光叠加强度', group: 'post', min: 0, max: 1.5, step: 0.01, def: 0.45, digits: 2 },
  { key: 'bloomThreshold',label: 'Bloom 阈值', hint: '泛光提取阈值(HDR)', group: 'post', min: 0, max: 3, step: 0.05, def: 1.0, digits: 2 },
  { key: 'exposure',      label: '曝光度',     hint: '色调映射前曝光', group: 'post', min: 0.1, max: 3, step: 0.05, def: 1.1, digits: 2 },
  { key: 'vignette',      label: '暗角强度',   hint: '四角压暗', group: 'post', min: 0, max: 1, step: 0.01, def: 0.35, digits: 2 },
  { key: 'grain',         label: '胶片颗粒',   hint: '颗粒噪声幅度', group: 'post', min: 0, max: 0.12, step: 0.002, def: 0.028, digits: 3 },
  { key: 'chroma',        label: '色散强度',   hint: '径向色差偏移', group: 'post', min: 0, max: 2, step: 0.02, def: 0.2, digits: 2 },
];

export type Params = Record<ParamKey, number>;

export const DEFAULT_PARAMS: Params = Object.fromEntries(
  PARAM_DEFS.map((d) => [d.key, d.def]),
) as Params;

export function clampParam(key: ParamKey, value: unknown): number {
  const def = PARAM_DEFS.find((d) => d.key === key)!;
  const v = typeof value === 'number' && Number.isFinite(value) ? value : def.def;
  return Math.min(def.max, Math.max(def.min, v));
}

export type QualityLevel = 'standard' | 'high' | 'cinematic';

export interface QualityBudget {
  renderScale: number; // internal HDR buffer scale vs drawing buffer
  maxSteps: number;    // max RK4 geodesic steps per ray
  stepScale: number;   // geodesic step length scale (smaller = finer)
  bloomMips: number;   // bloom mip chain depth
  dprCap: number;      // devicePixelRatio cap
}

export const QUALITY_TIERS: Record<QualityLevel, QualityBudget> = {
  standard:  { renderScale: 0.7,  maxSteps: 220, stepScale: 1.4,  bloomMips: 4, dprCap: 1.5 },
  high:      { renderScale: 0.85, maxSteps: 320, stepScale: 1.0,  bloomMips: 5, dprCap: 2.0 },
  cinematic: { renderScale: 1.0,  maxSteps: 460, stepScale: 0.75, bloomMips: 6, dprCap: 2.0 },
};

export const QUALITY_LEVELS: QualityLevel[] = ['standard', 'high', 'cinematic'];
export const QUALITY_LABELS: Record<QualityLevel, string> = {
  standard: 'Standard',
  high: 'High',
  cinematic: 'Cinematic',
};

export interface CameraPreset {
  name: string;
  desc: string;
  distance: number; // r_s
  azimuth: number;  // deg
  polar: number;    // deg from +y (90 = equatorial)
  fov: number;      // deg
}

export const PRESETS: CameraPreset[] = [
  { name: '赤道全景', desc: '微俯瞰赤道盘面 — 经典电影构图', distance: 15, azimuth: 35,  polar: 82, fov: 55 },
  { name: '极地俯瞰', desc: '高俯瞰 — 盘环与反向透镜像',   distance: 17, azimuth: -20, polar: 24, fov: 48 },
  { name: '光子环特写', desc: '近距掠过临界轨道 — 光子环细节', distance: 8.5, azimuth: 10,  polar: 84, fov: 44 },
  { name: '远眺银心', desc: '远距广角 — 黑洞与银河同框',   distance: 32, azimuth: 120, polar: 66, fov: 42 },
];

export const DEBUG_MODES: { name: string; desc: string }[] = [
  { name: '最终合成',   desc: '完整电影画面(HDR+Bloom+ACES)' },
  { name: '步数/终止',  desc: '测地线积分步数与终止原因' },
  { name: '视界掩码',   desc: '事件视界捕获 / 逃逸分类' },
  { name: '盘面交点',   desc: '赤道穿越次数与阶次' },
  { name: '红移 Doppler', desc: '首交点 g 因子(蓝<1>红)' },
  { name: '透镜坐标',   desc: '逃逸方向网格+偏折热量图' },
  { name: '星空银河',   desc: '未衰减程序化背景' },
  { name: '湍流场',     desc: '盘面湍流噪声采样' },
  { name: '原始 HDR',   desc: '后处理前线性 HDR 值' },
  { name: '临界光参',   desc: 'impact parameter 与 b_crit 接近度' },
];

export function defaultQuality(): QualityLevel {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = Math.min(window.screen.width, window.screen.height) < 900;
  return coarse || small ? 'standard' : 'high';
}

export const STATE_VERSION = 1;
export const STORAGE_KEY = 'gargantua.state.v1';
