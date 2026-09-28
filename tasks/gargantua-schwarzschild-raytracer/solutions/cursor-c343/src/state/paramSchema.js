// Single source of truth for the 21 user parameters: HUD sliders, defaults,
// reset, persistence validation and shader/camera wiring all read this table.
export const PARAM_GROUPS = Object.freeze([
  { id: 'camera', label: '相机', en: 'Camera' },
  { id: 'time', label: '时间', en: 'Time' },
  { id: 'disk', label: '吸积盘', en: 'Accretion disk' },
  { id: 'sky', label: '星空', en: 'Sky' },
  { id: 'post', label: '后期', en: 'Post' },
]);

export const PARAMS = Object.freeze([
  { key: 'fov', group: 'camera', label: '视场角 FOV', min: 20, max: 100, step: 0.5, default: 42, unit: '°', digits: 1 },
  { key: 'distance', group: 'camera', label: '相机距离', min: 7, max: 60, step: 0.1, default: 28, unit: 'M', digits: 1 },
  { key: 'azimuth', group: 'camera', label: '相机方位角', min: -180, max: 180, step: 0.5, default: 0, unit: '°', digits: 1 },
  { key: 'elevation', group: 'camera', label: '相机俯仰角', min: -80, max: 80, step: 0.5, default: 7, unit: '°', digits: 1 },
  { key: 'timeScale', group: 'time', label: '时间倍率', min: 0, max: 4, step: 0.05, default: 1, unit: '×', digits: 2 },
  { key: 'diskInner', group: 'disk', label: '盘内半径', min: 3.2, max: 14, step: 0.05, default: 6, unit: 'M', digits: 2 },
  { key: 'diskOuter', group: 'disk', label: '盘外半径', min: 8, max: 40, step: 0.1, default: 20, unit: 'M', digits: 1 },
  { key: 'diskHalfThickness', group: 'disk', label: '盘半厚度', min: 0.02, max: 2, step: 0.01, default: 0.3, unit: 'M', digits: 2 },
  { key: 'diskTemperature', group: 'disk', label: '盘温度', min: 1500, max: 20000, step: 50, default: 5800, unit: 'K', digits: 0 },
  { key: 'diskIntensity', group: 'disk', label: '盘发射强度', min: 0, max: 4, step: 0.01, default: 1, unit: '×', digits: 2 },
  { key: 'orbitSpeed', group: 'disk', label: '轨道速度倍率', min: 0, max: 1.4, step: 0.01, default: 1, unit: '×', digits: 2 },
  { key: 'turbulenceAmp', group: 'disk', label: '湍流幅度', min: 0, max: 1, step: 0.01, default: 0.65, unit: '', digits: 2 },
  { key: 'turbulenceSpeed', group: 'disk', label: '湍流速度', min: 0, max: 4, step: 0.05, default: 1, unit: '×', digits: 2 },
  { key: 'starDensity', group: 'sky', label: '恒星密度', min: 0, max: 3, step: 0.01, default: 1, unit: '×', digits: 2 },
  { key: 'galaxyBrightness', group: 'sky', label: '银河亮度', min: 0, max: 3, step: 0.01, default: 1, unit: '×', digits: 2 },
  { key: 'bloomIntensity', group: 'post', label: 'Bloom 强度', min: 0, max: 3, step: 0.01, default: 0.75, unit: '', digits: 2 },
  { key: 'bloomThreshold', group: 'post', label: 'Bloom 阈值', min: 0, max: 8, step: 0.05, default: 1.2, unit: '', digits: 2 },
  { key: 'exposure', group: 'post', label: '曝光度', min: -4, max: 4, step: 0.05, default: 0, unit: 'EV', digits: 2 },
  { key: 'vignette', group: 'post', label: '暗角强度', min: 0, max: 1, step: 0.01, default: 0.35, unit: '', digits: 2 },
  { key: 'grain', group: 'post', label: '胶片颗粒强度', min: 0, max: 1, step: 0.01, default: 0.25, unit: '', digits: 2 },
  { key: 'chromaticAberration', group: 'post', label: '色散强度', min: 0, max: 1, step: 0.01, default: 0.3, unit: '', digits: 2 },
]);

export const PARAM_BY_KEY = Object.freeze(Object.fromEntries(PARAMS.map((param) => [param.key, param])));

export const CAMERA_KEYS = Object.freeze(['fov', 'distance', 'azimuth', 'elevation']);

export function defaultParams() {
  return Object.fromEntries(PARAMS.map((param) => [param.key, param.default]));
}

export function wrapDegrees(value) {
  const wrapped = ((((value + 180) % 360) + 360) % 360) - 180;
  return wrapped === -180 ? 180 : wrapped;
}

// Returns a finite in-range value for `key`, or null when `value` is unusable.
export function sanitizeParam(key, value) {
  const param = PARAM_BY_KEY[key];
  if (!param || typeof value !== 'number' || !Number.isFinite(value)) return null;
  const v = key === 'azimuth' ? wrapDegrees(value) : value;
  return Math.min(param.max, Math.max(param.min, v));
}

export function formatParam(param, value) {
  const text = value.toFixed(param.digits);
  return param.unit ? `${text}${param.unit === '°' || param.unit === '×' ? '' : ' '}${param.unit}` : text;
}
