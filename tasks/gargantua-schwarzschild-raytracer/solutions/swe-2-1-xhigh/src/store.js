// Central application state: the 21 render/camera parameters, quality tier,
// debug view, HUD state, cinematic toggle. Versioned persistence to
// localStorage, URL capture-contract parsing, validation, subscribe/notify.

export const PARAMS = {
  // key: [default, min, max, label, unit]
  fov: [50, 25, 95, 'Field of view', '°'],
  distance: [12.0, 3.2, 20.0, 'Camera distance', 'rs'],
  azimuth: [35, -180, 180, 'Camera azimuth', '°'],
  elevation: [20, -85, 85, 'Camera elevation', '°'],
  timeScale: [1.0, 0.0, 3.0, 'Time scale', '×'],
  diskInner: [2.3, 1.6, 4.5, 'Disk inner radius', 'rs'],
  diskOuter: [8.5, 5.0, 16.0, 'Disk outer radius', 'rs'],
  diskHalfThick: [0.15, 0.03, 0.5, 'Disk half thickness', 'rs'],
  diskTemp: [1.0, 0.3, 2.5, 'Disk temperature', '×'],
  diskEmission: [1.0, 0.2, 4.0, 'Disk emission', '×'],
  orbitSpeed: [1.0, 0.0, 2.0, 'Orbit velocity', '×'],
  turbAmp: [0.55, 0.0, 1.0, 'Turbulence amplitude', ''],
  turbSpeed: [0.8, 0.0, 3.0, 'Turbulence speed', '×'],
  starDensity: [0.7, 0.0, 2.0, 'Star density', '×'],
  galaxyBright: [0.85, 0.0, 2.0, 'Galaxy brightness', '×'],
  bloomStrength: [0.28, 0.0, 2.0, 'Bloom strength', ''],
  bloomThreshold: [0.8, 0.0, 1.0, 'Bloom threshold', ''],
  exposure: [0.0, -2.0, 2.0, 'Exposure', 'ev'],
  vignette: [0.32, 0.0, 1.0, 'Vignette', ''],
  grain: [0.35, 0.0, 1.0, 'Film grain', ''],
  chroma: [0.15, 0.0, 1.0, 'Chromatic aberration', ''],
};
export const PARAM_KEYS = Object.keys(PARAMS);

export const QUALITIES = ['standard', 'high', 'cinematic'];
export const QUALITY_BUDGET = {
  // real rendering budgets: internal scale, geodesic step count, disk crossings,
  // bloom resolution divisor
  standard: { scale: 0.62, maxSteps: 144, maxCross: 2, bloomDiv: 4 },
  high: { scale: 0.85, maxSteps: 208, maxCross: 3, bloomDiv: 2 },
  cinematic: { scale: 1.0, maxSteps: 320, maxCross: 4, bloomDiv: 2 },
};

export const PRESETS = [
  { name: 'Portrait', azimuth: 35, elevation: 20, distance: 12.0, fov: 50 },
  { name: 'Edge-On', azimuth: -95, elevation: 4, distance: 13.5, fov: 45 },
  { name: 'Polar', azimuth: 160, elevation: 64, distance: 11.0, fov: 55 },
  { name: 'Photon Ring', azimuth: -10, elevation: 12, distance: 5.2, fov: 33 },
];

export const DEBUG_VIEWS = [
  'Final composite',
  'Integration cost / termination',
  'Event horizon capture mask',
  'Disk crossing order count',
  'Redshift / Doppler factor',
  'Lensed background coordinates',
  'Lensed sky background only',
  'Star field channel',
  'HDR luminance (log, pre-post)',
  'Impact parameter / critical',
];

const STORAGE_KEY = 'gargantua-state-v1';
const STORAGE_VERSION = 1;

export function defaultState() {
  const params = {};
  for (const k of PARAM_KEYS) params[k] = PARAMS[k][0];
  return {
    params,
    quality: 'high',
    debug: 0,
    cinematic: true,
    hudVisible: true,
    hudCollapsed: false,
    presetIndex: 0,
  };
}

export function clampParam(key, value) {
  const def = PARAMS[key];
  if (!def) return undefined;
  const v = Number(value);
  if (!Number.isFinite(v)) return undefined;
  return Math.min(def[2], Math.max(def[1], v));
}

export function isQuality(q) {
  return typeof q === 'string' && QUALITIES.includes(q.toLowerCase());
}

function validateState(raw) {
  const base = defaultState();
  if (!raw || typeof raw !== 'object') return base;
  if (raw.params && typeof raw.params === 'object') {
    for (const k of PARAM_KEYS) {
      const v = clampParam(k, raw.params[k]);
      if (v !== undefined) base.params[k] = v;
    }
  }
  if (isQuality(raw.quality)) base.quality = raw.quality.toLowerCase();
  if (Number.isInteger(raw.debug) && raw.debug >= 0 && raw.debug <= 9) base.debug = raw.debug;
  base.cinematic = raw.cinematic !== false;
  base.hudVisible = raw.hudVisible !== false;
  base.hudCollapsed = raw.hudCollapsed === true;
  if (Number.isInteger(raw.presetIndex) && raw.presetIndex >= 0 && raw.presetIndex <= 3) {
    base.presetIndex = raw.presetIndex;
  }
  return base;
}

export function loadPersisted() {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    if (!text) return null;
    const parsed = JSON.parse(text);
    if (parsed?.version !== STORAGE_VERSION) return null;
    return validateState(parsed.state);
  } catch {
    return null;
  }
}

export function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, state }));
  } catch {
    // storage full / unavailable — non-fatal
  }
}

export function clearPersisted() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}

// --- URL capture contract -----------------------------------------------------
// ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
// Invalid values fall back safely to defaults — never throw, never black-screen.
export function parseCaptureUrl(search = window.location.search) {
  const q = new URLSearchParams(search);
  const capture = q.get('capture') === '1';
  const out = {
    capture,
    time: 0,
    quality: null,
    preset: null,
    debug: null,
    hud: null,
  };
  const t = Number(q.get('time'));
  out.time = Number.isFinite(t) && t >= 0 ? t : 0;

  const qual = q.get('quality');
  if (qual && isQuality(qual)) out.quality = qual.toLowerCase();

  const pi = q.get('preset');
  if (pi !== null) {
    const n = Number(pi);
    if (Number.isInteger(n) && n >= 0 && n <= 3) out.preset = n;
  }
  const di = q.get('debug');
  if (di !== null) {
    const n = Number(di);
    if (Number.isInteger(n) && n >= 0 && n <= 9) out.debug = n;
  }
  const hud = q.get('hud');
  if (hud === '0') out.hud = false;
  else if (hud === '1') out.hud = true;
  return out;
}

// --- minimal observable store --------------------------------------------------
export function createStore(initial, { persist = true } = {}) {
  let state = initial;
  const listeners = new Set();
  let persistTimer = 0;

  function notify(what) {
    for (const fn of listeners) fn(state, what);
    if (!persist) return;
    clearTimeout(persistTimer);
    persistTimer = setTimeout(() => persistState(state), 250);
  }

  return {
    get: () => state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    setParam(key, value) {
      const v = clampParam(key, value);
      if (v === undefined) return false;
      if (state.params[key] === v) return true;
      state = { ...state, params: { ...state.params, [key]: v } };
      notify(`param:${key}`);
      return true;
    },
    set(patch, what = 'ui') {
      state = { ...state, ...patch };
      notify(what);
    },
    applyPreset(index) {
      if (!Number.isInteger(index) || index < 0 || index > 3) return false;
      const p = PRESETS[index];
      state = {
        ...state,
        presetIndex: index,
        cinematic: false,
        params: {
          ...state.params,
          azimuth: p.azimuth,
          elevation: p.elevation,
          distance: p.distance,
          fov: p.fov,
        },
      };
      notify('preset');
      return true;
    },
    reset() {
      clearPersisted();
      const keepHud = state.hudVisible;
      state = { ...defaultState(), hudVisible: keepHud };
      notify('reset');
    },
    flush() {
      if (!persist) return;
      clearTimeout(persistTimer);
      persistState(state);
    },
  };
}
