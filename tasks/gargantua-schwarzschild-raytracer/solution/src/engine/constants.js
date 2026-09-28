// Central definitions: the 21 tunable parameters, quality profiles,
// camera presets and debug view names shared by the engine and the HUD.

export const RS = 1.0; // Schwarzschild radius in world units

export const QUALITY_LEVELS = ['standard', 'high', 'cinematic'];

// Real render budget knobs. All three tiers keep the horizon, photon ring and
// lensed disk legible; they differ in internal render scale (which also scales
// the bloom buffer), geodesic step count/size and disk column samples.
export const QUALITY_PROFILES = {
  standard: { renderScale: 0.55, maxSteps: 170, stepSize: 0.062, diskSamples: 6 },
  high: { renderScale: 0.8, maxSteps: 300, stepSize: 0.05, diskSamples: 10 },
  cinematic: { renderScale: 1.0, maxSteps: 440, stepSize: 0.042, diskSamples: 14 },
};

export const PARAM_DEFS = [
  { id: 'fov', label: '视场角 FOV', min: 40, max: 110, step: 1, def: 62 },
  { id: 'camDistance', label: '相机距离', min: 3.5, max: 40, step: 0.1, def: 16 },
  { id: 'camAzimuth', label: '相机方位角', min: 0, max: 360, step: 0.5, def: 20 },
  { id: 'camPolar', label: '相机俯仰角', min: -85, max: 85, step: 0.5, def: 8 },
  { id: 'timeScale', label: '时间倍率', min: 0, max: 5, step: 0.05, def: 1 },
  { id: 'diskInner', label: '盘内半径', min: 2.2, max: 6, step: 0.05, def: 3.0 },
  { id: 'diskOuter', label: '盘外半径', min: 6, max: 22, step: 0.1, def: 12.5 },
  { id: 'diskThickness', label: '盘半厚度', min: 0.02, max: 0.8, step: 0.01, def: 0.22 },
  { id: 'diskTemp', label: '盘温度', min: 2000, max: 12000, step: 50, def: 6800 },
  { id: 'diskEmission', label: '盘发射强度', min: 0.1, max: 4, step: 0.05, def: 1.6 },
  { id: 'orbitSpeed', label: '轨道速度倍率', min: 0, max: 1.5, step: 0.01, def: 1.0 },
  { id: 'turbAmp', label: '湍流幅度', min: 0, max: 2, step: 0.02, def: 1.0 },
  { id: 'turbSpeed', label: '湍流速度', min: 0, max: 3, step: 0.02, def: 1.0 },
  { id: 'starDensity', label: '恒星密度', min: 0, max: 2, step: 0.02, def: 1.0 },
  { id: 'galaxyBrightness', label: '银河亮度', min: 0, max: 3, step: 0.05, def: 1.0 },
  { id: 'bloomStrength', label: 'Bloom 强度', min: 0, max: 2, step: 0.02, def: 0.5 },
  { id: 'bloomThreshold', label: 'Bloom 阈值', min: 0, max: 4, step: 0.05, def: 1.0 },
  { id: 'exposure', label: '曝光度', min: 0.2, max: 3, step: 0.02, def: 1.0 },
  { id: 'vignette', label: '暗角强度', min: 0, max: 1.2, step: 0.02, def: 0.4 },
  { id: 'grain', label: '胶片颗粒强度', min: 0, max: 0.3, step: 0.005, def: 0.055 },
  { id: 'chroma', label: '色散强度', min: 0, max: 3, step: 0.05, def: 0.8 },
];

export const PARAM_GROUPS = [
  { title: '相机 Camera', ids: ['fov', 'camDistance', 'camAzimuth', 'camPolar'] },
  { title: '吸积盘 Disk', ids: ['diskInner', 'diskOuter', 'diskThickness', 'diskTemp', 'diskEmission', 'orbitSpeed'] },
  { title: '湍流 Turbulence', ids: ['turbAmp', 'turbSpeed'] },
  { title: '背景 Background', ids: ['starDensity', 'galaxyBrightness'] },
  { title: '后期 Post', ids: ['bloomStrength', 'bloomThreshold', 'exposure', 'vignette', 'grain', 'chroma'] },
  { title: '时间 Time', ids: ['timeScale'] },
];

export function defaultParams() {
  const params = {};
  for (const p of PARAM_DEFS) params[p.id] = p.def;
  return params;
}

function clampParam(def, value) {
  const v = typeof value === 'number' && Number.isFinite(value) ? value : def.def;
  return Math.min(def.max, Math.max(def.min, v));
}

// Merge unknown/partial input over defaults, clamping every known parameter
// into its documented range. Unknown keys are dropped.
export function sanitizeParams(input) {
  const out = defaultParams();
  if (!input || typeof input !== 'object') return out;
  for (const def of PARAM_DEFS) {
    if (def.id in input) out[def.id] = clampParam(def, input[def.id]);
  }
  return out;
}

export const PARAM_BY_ID = Object.fromEntries(PARAM_DEFS.map((d) => [d.id, d]));

// Four visually distinct camera presets. Shift+1..4 and the HUD buttons apply
// them; fov/distance/azimuth/polar are all real render inputs.
export const PRESETS = [
  { name: '赤道全景', fov: 62, camDistance: 16, camAzimuth: 20, camPolar: 8 },
  { name: '光子环近观', fov: 78, camDistance: 8.5, camAzimuth: 210, camPolar: 4 },
  { name: '极向俯瞰', fov: 55, camDistance: 18, camAzimuth: 130, camPolar: 62 },
  { name: '掠面飞行', fov: 92, camDistance: 11.5, camAzimuth: 305, camPolar: 19 },
];

export const DEBUG_VIEWS = [
  '合成画面',
  '射线步进/终止',
  '事件视界掩码',
  '盘面交点阶次',
  '多普勒/红移因子',
  '背景透镜坐标',
  '星空与银河',
  '色调映射前 HDR',
  '盘面温度场',
  'HDR 亮度图',
];

export const STORAGE_KEY = 'gargantua.state.v1';
export const STORAGE_VERSION = 1;
