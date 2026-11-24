export const STORAGE_KEY = 'gargantua.state.v1';

export const QUALITY = {
  standard: { label: 'Standard', renderScale: 0.62, maxSteps: 420, bloomScale: 0.35, blurSamples: 5, dprCap: 1.25 },
  high: { label: 'High', renderScale: 0.82, maxSteps: 760, bloomScale: 0.45, blurSamples: 9, dprCap: 1.5 },
  cinematic: { label: 'Cinematic', renderScale: 1, maxSteps: 1200, bloomScale: 0.5, blurSamples: 13, dprCap: 2 },
};

export const DEFAULT_PARAMS = {
  fov: 43,
  distance: 19,
  azimuth: 0.58,
  elevation: 0.14,
  timeScale: 1,
  innerRadius: 3,
  outerRadius: 11,
  halfThickness: 0.16,
  temperature: 7200,
  emission: 1.1,
  orbitalSpeed: 1,
  turbulence: 0.62,
  turbulenceSpeed: 1,
  starDensity: 0.72,
  galaxyBrightness: 0.68,
  bloom: 0.58,
  bloomThreshold: 1.2,
  exposure: 1.02,
  vignette: 0.34,
  grain: 0.028,
  dispersion: 0.0016,
};

export const PARAM_GROUPS = [
  {
    title: 'Observer',
    items: [
      { key: 'fov', label: 'Field of view', min: 24, max: 78, step: 0.5, unit: '°' },
      { key: 'distance', label: 'Camera distance', min: 9, max: 38, step: 0.1, unit: 'rₛ' },
      { key: 'azimuth', label: 'Azimuth', min: -Math.PI, max: Math.PI, step: 0.01, unit: 'rad' },
      { key: 'elevation', label: 'Elevation', min: -1.45, max: 1.45, step: 0.01, unit: 'rad' },
      { key: 'timeScale', label: 'Time multiplier', min: 0, max: 4, step: 0.05, unit: '×' },
    ],
  },
  {
    title: 'Accretion disk',
    items: [
      { key: 'innerRadius', label: 'Inner radius', min: 1.5, max: 6, step: 0.05, unit: 'rₛ' },
      { key: 'outerRadius', label: 'Outer radius', min: 6, max: 18, step: 0.1, unit: 'rₛ' },
      { key: 'halfThickness', label: 'Half thickness', min: 0.02, max: 0.8, step: 0.01, unit: 'rₛ' },
      { key: 'temperature', label: 'Temperature', min: 2500, max: 14000, step: 100, unit: 'K' },
      { key: 'emission', label: 'Emission', min: 0.1, max: 3.5, step: 0.05, unit: '×' },
      { key: 'orbitalSpeed', label: 'Orbital speed', min: 0, max: 2, step: 0.05, unit: '×' },
      { key: 'turbulence', label: 'Turbulence', min: 0, max: 1.5, step: 0.01, unit: '' },
      { key: 'turbulenceSpeed', label: 'Turbulence speed', min: 0, max: 4, step: 0.05, unit: '×' },
    ],
  },
  {
    title: 'Deep field',
    items: [
      { key: 'starDensity', label: 'Star density', min: 0, max: 1.5, step: 0.01, unit: '' },
      { key: 'galaxyBrightness', label: 'Galaxy brightness', min: 0, max: 2, step: 0.01, unit: '×' },
    ],
  },
  {
    title: 'Lens & finish',
    items: [
      { key: 'bloom', label: 'Bloom strength', min: 0, max: 2, step: 0.01, unit: '' },
      { key: 'bloomThreshold', label: 'Bloom threshold', min: 0, max: 3, step: 0.01, unit: '' },
      { key: 'exposure', label: 'Exposure', min: 0.25, max: 2.5, step: 0.01, unit: '×' },
      { key: 'vignette', label: 'Vignette', min: 0, max: 1, step: 0.01, unit: '' },
      { key: 'grain', label: 'Film grain', min: 0, max: 0.12, step: 0.001, unit: '' },
      { key: 'dispersion', label: 'Dispersion', min: 0, max: 0.008, step: 0.0001, unit: '' },
    ],
  },
];

export const PRESETS = [
  { name: 'Cinematic', caption: 'Lensed disk', azimuth: 0.58, elevation: 0.14, distance: 19, fov: 43 },
  { name: 'Face-on', caption: 'Full accretion flow', azimuth: -0.35, elevation: 1.18, distance: 21, fov: 45 },
  { name: 'Edge-on', caption: 'Photon ring', azimuth: 1.12, elevation: 0.025, distance: 20, fov: 40 },
  { name: 'Close pass', caption: 'Critical boundary', azimuth: -0.72, elevation: 0.24, distance: 14.5, fov: 52 },
];

export const DEBUG_VIEWS = [
  'Final composite',
  'Geodesic step budget',
  'Event horizon mask',
  'Disk crossings & image order',
  'Gravitational redshift / Doppler',
  'Lensed background coordinates',
  'Procedural star field',
  'Procedural Milky Way',
  'Pre-tonemap HDR values',
  'Critical impact parameter',
];

export function defaultState() {
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;
  return {
    version: 1,
    quality: mobile ? 'standard' : 'high',
    preset: 0,
    debug: 0,
    hud: true,
    hudCollapsed: mobile,
    playing: true,
    params: { ...DEFAULT_PARAMS },
  };
}

export function clampParam(key, value) {
  const definition = PARAM_GROUPS.flatMap((group) => group.items).find((item) => item.key === key);
  if (!definition || !Number.isFinite(value)) return DEFAULT_PARAMS[key];
  return Math.min(definition.max, Math.max(definition.min, value));
}

export function sanitizeState(input) {
  const base = defaultState();
  if (!input || typeof input !== 'object') return base;
  const next = {
    ...base,
    quality: Object.hasOwn(QUALITY, input.quality) ? input.quality : base.quality,
    preset: Number.isInteger(input.preset) && input.preset >= -1 && input.preset <= 3 ? input.preset : base.preset,
    debug: Number.isInteger(input.debug) && input.debug >= 0 && input.debug <= 9 ? input.debug : base.debug,
    hud: typeof input.hud === 'boolean' ? input.hud : base.hud,
    hudCollapsed: typeof input.hudCollapsed === 'boolean' ? input.hudCollapsed : base.hudCollapsed,
    playing: typeof input.playing === 'boolean' ? input.playing : base.playing,
    params: { ...base.params },
  };
  for (const key of Object.keys(DEFAULT_PARAMS)) {
    if (typeof input.params?.[key] === 'number') next.params[key] = clampParam(key, input.params[key]);
  }
  return next;
}

export function loadState() {
  const base = defaultState();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    Object.assign(base, sanitizeState(saved));
  } catch {
    // A corrupt or unavailable storage area must not prevent rendering.
  }
  return applyUrl(base);
}

export function applyUrl(state) {
  const url = new URL(window.location.href);
  const capture = url.searchParams.get('capture') === '1';
  const quality = url.searchParams.get('quality');
  const preset = url.searchParams.get('preset');
  const debug = url.searchParams.get('debug');
  const hud = url.searchParams.get('hud');
  const time = url.searchParams.get('time');
  const next = sanitizeState(state);

  if (quality !== null) next.quality = Object.hasOwn(QUALITY, quality) ? quality : defaultState().quality;
  if (preset !== null) {
    const value = Number(preset);
    next.preset = Number.isInteger(value) && value >= 0 && value <= 3 ? value : 0;
    Object.assign(next.params, cameraParams(PRESETS[next.preset]));
  }
  if (debug !== null) {
    const value = Number(debug);
    next.debug = Number.isInteger(value) && value >= 0 && value <= 9 ? value : 0;
  }
  if (hud !== null) next.hud = hud === '1' ? true : hud === '0' ? false : defaultState().hud;

  const parsedTime = time === null ? 0 : Number(time);
  if (capture) next.playing = false;
  return {
    state: next,
    capture,
    time: Number.isFinite(parsedTime) && parsedTime >= 0 ? parsedTime : 0,
  };
}

export function cameraParams(preset) {
  return {
    azimuth: preset.azimuth,
    elevation: preset.elevation,
    distance: preset.distance,
    fov: preset.fov,
  };
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, version: 1 }));
  } catch {
    // Private browsing and full storage quotas do not invalidate the live session.
  }
}
