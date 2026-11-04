// Versioned, validated application state. All configurable state lives here so the
// renderer, HUD, URL capture contract and localStorage all read one definition.

export const STATE_VERSION = 2;
export const STORAGE_KEY = 'gargantua.state.v2';

// 21 controls. `group` is only for HUD layout; every `key` is a live render/camera input.
export const PARAMS = [
  { key: 'fov', label: '视场角 FOV', group: '相机', min: 30, max: 100, step: 1, def: 55, unit: '°' },
  { key: 'distance', label: '相机距离', group: '相机', min: 6, max: 40, step: 0.1, def: 16, unit: 'rs' },
  { key: 'azimuth', label: '相机方位角', group: '相机', min: -180, max: 180, step: 1, def: 18, unit: '°' },
  { key: 'elevation', label: '相机俯仰角', group: '相机', min: -85, max: 85, step: 1, def: 9, unit: '°' },
  { key: 'timeScale', label: '时间倍率', group: '时间', min: 0, max: 4, step: 0.05, def: 1, unit: '×' },
  { key: 'diskInner', label: '盘内半径', group: '吸积盘', min: 1.7, max: 6, step: 0.05, def: 2.8, unit: 'rs' },
  { key: 'diskOuter', label: '盘外半径', group: '吸积盘', min: 5, max: 22, step: 0.1, def: 11, unit: 'rs' },
  { key: 'diskThickness', label: '盘半厚度', group: '吸积盘', min: 0.02, max: 1.2, step: 0.01, def: 0.26, unit: 'rs' },
  { key: 'diskTemp', label: '盘温度', group: '吸积盘', min: 0.2, max: 2.0, step: 0.01, def: 1.0, unit: '' },
  { key: 'emission', label: '盘发射强度', group: '吸积盘', min: 0.2, max: 4, step: 0.01, def: 1.5, unit: '' },
  { key: 'orbitSpeed', label: '轨道速度倍率', group: '吸积盘', min: 0, max: 2, step: 0.01, def: 1.0, unit: '×' },
  { key: 'turbAmp', label: '湍流幅度', group: '吸积盘', min: 0, max: 2, step: 0.01, def: 0.85, unit: '' },
  { key: 'turbSpeed', label: '湍流速度', group: '吸积盘', min: 0, max: 4, step: 0.01, def: 1.0, unit: '×' },
  { key: 'starDensity', label: '恒星密度', group: '星空', min: 20, max: 400, step: 1, def: 150, unit: '' },
  { key: 'galaxy', label: '银河亮度', group: '星空', min: 0, max: 3, step: 0.01, def: 1.0, unit: '' },
  { key: 'bloomStrength', label: 'Bloom 强度', group: '后处理', min: 0, max: 3, step: 0.01, def: 0.85, unit: '' },
  { key: 'bloomThreshold', label: 'Bloom 阈值', group: '后处理', min: 0, max: 4, step: 0.01, def: 1.05, unit: '' },
  { key: 'exposure', label: '曝光度', group: '后处理', min: 0.2, max: 3, step: 0.01, def: 1.15, unit: '' },
  { key: 'vignette', label: '暗角强度', group: '后处理', min: 0, max: 1.5, step: 0.01, def: 0.5, unit: '' },
  { key: 'grain', label: '胶片颗粒强度', group: '后处理', min: 0, max: 1, step: 0.01, def: 0.3, unit: '' },
  { key: 'chromatic', label: '色散强度', group: '后处理', min: 0, max: 2, step: 0.01, def: 0.5, unit: '' },
];

export const DEFAULT_PARAMS = Object.fromEntries(PARAMS.map((p) => [p.key, p.def]));

export const QUALITY_LEVELS = ['standard', 'high', 'cinematic'];

// Real rendering budgets: internal resolution ratio, integration steps, step size,
// disk-noise octaves, bloom blur iterations and DPR cap all change per tier.
export const QUALITY = {
  standard: { scale: 0.62, maxSteps: 130, dphi: 0.055, noiseOctaves: 2, blurIters: 1, dprCap: 1.25 },
  high: { scale: 0.82, maxSteps: 240, dphi: 0.032, noiseOctaves: 3, blurIters: 2, dprCap: 1.75 },
  cinematic: { scale: 1.0, maxSteps: 460, dphi: 0.020, noiseOctaves: 4, blurIters: 3, dprCap: 2.0 },
};

export const PRESETS = [
  { name: '边缘视角', en: 'Edge-On', short: '边缘', color: '#ffae62', camera: { fov: 55, distance: 16, azimuth: 18, elevation: 9 } },
  { name: '俯瞰极区', en: 'Polar', short: '俯瞰', color: '#79d4ff', camera: { fov: 58, distance: 19, azimuth: 70, elevation: 72 } },
  { name: '近距掠影', en: 'Close', short: '近距', color: '#ff86cf', camera: { fov: 68, distance: 8.5, azimuth: -40, elevation: 19 } },
  { name: '广域全景', en: 'Wide', short: '广域', color: '#a6f58f', camera: { fov: 82, distance: 30, azimuth: 130, elevation: 34 } },
];

export const DEBUG_LABELS = [
  '最终合成画面',
  '测地线步进 / 终止',
  '事件视界掩码 / 临界边界',
  '盘面交点与像阶次',
  '红移 / Doppler 因子',
  '背景透镜坐标',
  '星空与银河（透镜后）',
  '后处理前 HDR 值',
  '光子环 / 临界绕转',
  '盘面发射（多次像）',
];

export function makeDefaultState() {
  return {
    version: STATE_VERSION,
    quality: 'high',
    preset: 0,
    debug: 0,
    hud: true,
    playing: true,
    params: { ...DEFAULT_PARAMS },
  };
}

const clamp = (v, lo, hi) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null);

function sanitize(raw) {
  const d = makeDefaultState();
  if (!raw || typeof raw !== 'object') return d;
  const out = d;
  if (QUALITY_LEVELS.includes(raw.quality)) out.quality = raw.quality;
  if (Number.isInteger(raw.preset) && raw.preset >= 0 && raw.preset < PRESETS.length) out.preset = raw.preset;
  if (Number.isInteger(raw.debug) && raw.debug >= 0 && raw.debug < DEBUG_LABELS.length) out.debug = raw.debug;
  if (typeof raw.hud === 'boolean') out.hud = raw.hud;
  if (typeof raw.playing === 'boolean') out.playing = raw.playing;
  if (raw.params && typeof raw.params === 'object') {
    for (const p of PARAMS) {
      const v = clamp(raw.params[p.key], p.min, p.max);
      if (v !== null) out.params[p.key] = v;
    }
  }
  return out;
}

export function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (raw && raw.version === STATE_VERSION) return sanitize(raw);
  } catch (_) { /* corrupt or unavailable storage -> defaults */ }
  return makeDefaultState();
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, version: STATE_VERSION }));
  } catch (_) { /* storage disabled: rendering must not depend on it */ }
}

function strictInt(v) {
  if (v === null || !/^-?\d+$/.test(v.trim())) return null;
  return parseInt(v, 10);
}

// Stable, same-origin URL capture contract. Invalid values are ignored (defaults win).
export function parseUrl(search) {
  const q = new URLSearchParams(search);
  const capture = q.get('capture') === '1';
  const overrides = {};
  const quality = q.get('quality');
  if (QUALITY_LEVELS.includes(quality)) overrides.quality = quality;
  const preset = strictInt(q.get('preset'));
  if (preset !== null && preset >= 0 && preset < PRESETS.length) overrides.preset = preset;
  const debug = strictInt(q.get('debug'));
  if (debug !== null && debug >= 0 && debug < DEBUG_LABELS.length) overrides.debug = debug;
  const hud = q.get('hud');
  if (hud === '0' || hud === '1') overrides.hud = hud === '1';
  let time = 0;
  if (capture) {
    const t = Number(q.get('time'));
    time = Number.isFinite(t) && t >= 0 ? Math.min(t, 1e6) : 0;
  }
  return { capture, overrides, time, frozen: capture };
}
