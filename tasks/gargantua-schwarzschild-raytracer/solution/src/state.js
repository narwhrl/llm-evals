// Configurable state: parameter schema, presets, quality profiles,
// versioned localStorage persistence and the URL capture contract.

export const STORAGE_KEY = 'gargantua.state';
export const STORAGE_VERSION = 1;

// Units: geometric, G = c = M = 1, so the Schwarzschild radius is 2.
export const PARAMS = [
  { key: 'fov', group: 'camera', label: '视场角 FOV', unit: '°', min: 20, max: 100, step: 1, def: 55 },
  { key: 'distance', group: 'camera', label: '相机距离', unit: 'M', min: 6, max: 60, step: 0.1, def: 26 },
  { key: 'azimuth', group: 'camera', label: '相机方位角', unit: '°', min: -180, max: 180, step: 0.5, def: 0 },
  { key: 'elevation', group: 'camera', label: '相机俯仰角', unit: '°', min: -85, max: 85, step: 0.5, def: 6 },
  { key: 'timeScale', group: 'camera', label: '时间倍率', unit: '×', min: 0, max: 4, step: 0.05, def: 1 },
  { key: 'diskInner', group: 'disk', label: '盘内半径', unit: 'M', min: 2.2, max: 12, step: 0.05, def: 6 },
  { key: 'diskOuter', group: 'disk', label: '盘外半径', unit: 'M', min: 8, max: 40, step: 0.1, def: 18 },
  { key: 'diskHalfThickness', group: 'disk', label: '盘半厚度', unit: 'M', min: 0.01, max: 1.2, step: 0.01, def: 0.18 },
  { key: 'diskTemperature', group: 'disk', label: '盘温度', unit: 'K', min: 2000, max: 20000, step: 100, def: 7800 },
  { key: 'diskIntensity', group: 'disk', label: '盘发射强度', unit: '', min: 0, max: 8, step: 0.05, def: 2.4 },
  { key: 'orbitalSpeed', group: 'disk', label: '轨道速度倍率', unit: '×', min: 0, max: 1.5, step: 0.01, def: 1 },
  { key: 'turbulence', group: 'disk', label: '湍流幅度', unit: '', min: 0, max: 1, step: 0.01, def: 0.55 },
  { key: 'turbulenceSpeed', group: 'disk', label: '湍流速度', unit: '×', min: 0, max: 4, step: 0.05, def: 1 },
  { key: 'starDensity', group: 'sky', label: '恒星密度', unit: '', min: 0, max: 2, step: 0.01, def: 1 },
  { key: 'galaxyBrightness', group: 'sky', label: '银河亮度', unit: '', min: 0, max: 3, step: 0.01, def: 1 },
  { key: 'bloomStrength', group: 'post', label: 'Bloom 强度', unit: '', min: 0, max: 2.5, step: 0.01, def: 0.8 },
  { key: 'bloomThreshold', group: 'post', label: 'Bloom 阈值', unit: '', min: 0, max: 6, step: 0.05, def: 1.2 },
  { key: 'exposure', group: 'post', label: '曝光度', unit: 'EV', min: -3, max: 3, step: 0.05, def: 0 },
  { key: 'vignette', group: 'post', label: '暗角强度', unit: '', min: 0, max: 1, step: 0.01, def: 0.35 },
  { key: 'grain', group: 'post', label: '胶片颗粒强度', unit: '', min: 0, max: 0.3, step: 0.005, def: 0.045 },
  { key: 'chromatic', group: 'post', label: '色散强度', unit: '', min: 0, max: 1, step: 0.01, def: 0.25 },
];

export const PARAM_GROUPS = [
  { id: 'camera', label: '相机与时间' },
  { id: 'disk', label: '吸积盘' },
  { id: 'sky', label: '星空背景' },
  { id: 'post', label: '后处理' },
];

export const PARAM_BY_KEY = Object.fromEntries(PARAMS.map((p) => [p.key, p]));

export const QUALITY_LEVELS = ['standard', 'high', 'cinematic'];

// Every field changes real GPU work: internal resolution, geodesic step
// budget, disk crossings composited per ray, bloom mip chain depth and
// chromatic aberration taps.
export const QUALITY_PROFILES = {
  standard: { label: 'Standard', renderScale: 0.6, maxSteps: 160, stepScale: 1.25, maxCrossings: 2, bloomLevels: 4, caTaps: 1, dprCap: 1.25 },
  high: { label: 'High', renderScale: 0.85, maxSteps: 300, stepScale: 1.0, maxCrossings: 3, bloomLevels: 5, caTaps: 3, dprCap: 1.75 },
  cinematic: { label: 'Cinematic', renderScale: 1.0, maxSteps: 520, stepScale: 0.7, maxCrossings: 4, bloomLevels: 6, caTaps: 5, dprCap: 2 },
};

export const PRESETS = [
  { name: 'Gargantua 正面', camera: { fov: 55, distance: 26, azimuth: 0, elevation: 6 } },
  { name: '高倾角侧视', camera: { fov: 50, distance: 30, azimuth: 62, elevation: 38 } },
  { name: '近视界掠射', camera: { fov: 72, distance: 11, azimuth: -28, elevation: 2.5 } },
  { name: '极轴俯视', camera: { fov: 50, distance: 34, azimuth: 0, elevation: 82 } },
];

export const DEBUG_MODES = [
  { name: '最终合成', desc: '完整 HDR 渲染、Bloom、ACES 与镜头效果' },
  { name: '积分步数', desc: '每条光线消耗的 RK4 步数热图（蓝→红）' },
  { name: '终止类型', desc: '黑=落入视界  蓝=逃逸  品红=步数耗尽' },
  { name: '视界掩码', desc: '白=光线被事件视界捕获，按最近近心点着色' },
  { name: '盘面阶次', desc: '首个可见盘交点：橙=主像  绿=次级像  青=三级+' },
  { name: '红移 / Doppler', desc: '盘面 g 因子：蓝=增亮（g>1） 红=红移（g<1）' },
  { name: '透镜坐标', desc: '逃逸方向的天球经纬网格，显示背景偏折' },
  { name: '星空 / 银河', desc: '仅透镜后的程序化星空与银河，不含吸积盘' },
  { name: '盘面温度', desc: '观测温度 g·T(r) 的伪彩色，不含背景' },
  { name: 'HDR 亮度', desc: '后处理前线性亮度的对数伪彩色（每级 1 EV）' },
];

export function defaultParams() {
  return Object.fromEntries(PARAMS.map((p) => [p.key, p.def]));
}

export function defaultState() {
  return {
    params: defaultParams(),
    quality: 'high',
    preset: 0,
    debug: 0,
    hud: true,
    cinematic: true,
  };
}

function clampParam(key, value) {
  const p = PARAM_BY_KEY[key];
  const n = typeof value === 'number' ? value : Number.NaN;
  if (!Number.isFinite(n)) return p.def;
  return Math.min(p.max, Math.max(p.min, n));
}

export function isIntInRange(v, lo, hi) {
  return Number.isInteger(v) && v >= lo && v <= hi;
}

// Normalises untrusted input (localStorage) into a valid state.
export function sanitizeState(raw) {
  const base = defaultState();
  if (!raw || typeof raw !== 'object') return base;
  const params = {};
  for (const p of PARAMS) {
    params[p.key] = raw.params && p.key in raw.params ? clampParam(p.key, raw.params[p.key]) : p.def;
  }
  if (params.diskOuter < params.diskInner + 1) params.diskOuter = Math.min(PARAM_BY_KEY.diskOuter.max, params.diskInner + 1);
  return {
    params,
    quality: QUALITY_LEVELS.includes(raw.quality) ? raw.quality : base.quality,
    preset: isIntInRange(raw.preset, 0, PRESETS.length - 1) ? raw.preset : base.preset,
    debug: isIntInRange(raw.debug, 0, 9) ? raw.debug : base.debug,
    hud: typeof raw.hud === 'boolean' ? raw.hud : base.hud,
    cinematic: typeof raw.cinematic === 'boolean' ? raw.cinematic : base.cinematic,
  };
}

export function loadState() {
  try {
    const text = window.localStorage.getItem(STORAGE_KEY);
    if (!text) return defaultState();
    const parsed = JSON.parse(text);
    if (!parsed || parsed.version !== STORAGE_VERSION) return defaultState();
    return sanitizeState(parsed.state);
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, state }));
  } catch {
    // Storage may be unavailable (private mode, quota); rendering continues.
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignored for the same reason as saveState.
  }
}

function parseIntStrict(text, lo, hi) {
  if (text === null || !/^\d+$/.test(text)) return null;
  const n = Number(text);
  return isIntInRange(n, lo, hi) ? n : null;
}

// URL capture contract. Invalid values fall back to defaults and are
// reported in `rejected` rather than throwing.
export function parseUrl(search) {
  const q = new URLSearchParams(search);
  const out = { capture: q.get('capture') === '1', overrides: {}, time: 0, rejected: [] };
  const check = (name, value, apply) => {
    if (!q.has(name)) return;
    if (value === null) out.rejected.push(name);
    else apply(value);
  };
  if (q.has('capture') && !['0', '1'].includes(q.get('capture'))) out.rejected.push('capture');
  const quality = q.get('quality');
  check('quality', QUALITY_LEVELS.includes(quality) ? quality : null, (v) => (out.overrides.quality = v));
  check('preset', parseIntStrict(q.get('preset'), 0, PRESETS.length - 1), (v) => (out.overrides.preset = v));
  check('debug', parseIntStrict(q.get('debug'), 0, 9), (v) => (out.overrides.debug = v));
  const hud = q.get('hud');
  check('hud', hud === '0' || hud === '1' ? hud === '1' : null, (v) => (out.overrides.hud = v));
  const timeText = q.get('time');
  const t = timeText !== null && /^\d+(\.\d+)?$/.test(timeText) ? Number(timeText) : Number.NaN;
  check('time', Number.isFinite(t) && t >= 0 ? t : null, (v) => (out.time = v));
  return out;
}
