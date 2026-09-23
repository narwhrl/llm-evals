export const STORAGE_KEY = 'gargantua:state:v1';

export const PRESETS = [
  { name: 'Event Horizon', azimuth: 38, elevation: 22, distance: 22, fov: 48 },
  { name: 'Rim Light', azimuth: 140, elevation: 7, distance: 18, fov: 50 },
  { name: 'Polar Crown', azimuth: 265, elevation: 68, distance: 24, fov: 50 },
  { name: 'Photon Ring', azimuth: 320, elevation: 16, distance: 13, fov: 55 },
];

// Portrait framing preserves the full critical boundary on narrow screens.
const MOBILE_CAMERAS = [
  { distance: 31, fov: 60 },
  { distance: 27, fov: 65 },
  { distance: 30, fov: 60 },
  { distance: 23, fov: 75 },
];

export function presetCamera(index, mobile = false) {
  const { name, ...camera } = PRESETS[index];
  return mobile ? { ...camera, ...MOBILE_CAMERAS[index] } : camera;
}

export const QUALITY = {
  standard: { label: 'Standard', scale: 0.65, dprCap: 1.5, steps: 160, diskSamples: 1, bloomLevels: 2 },
  high: { label: 'High', scale: 0.8, dprCap: 1.6, steps: 256, diskSamples: 2, bloomLevels: 3 },
  cinematic: { label: 'Cinematic', scale: 1, dprCap: 1.8, steps: 384, diskSamples: 3, bloomLevels: 4 },
};

export const DEBUG_VIEWS = [
  'Final composite',
  'Steps / termination',
  'Horizon capture',
  'Disk crossing order',
  'Disk intersection radius',
  'Doppler factor',
  'Gravitational redshift',
  'Lensed sky coordinates',
  'Stars / galaxy',
  'Pre-tone HDR energy',
];

export const CONTROLS = [
  { key: 'fov', label: 'Field of view', group: 'Camera & time', min: 30, max: 80, step: 1, default: 48, unit: '°' },
  { key: 'distance', label: 'Camera distance', group: 'Camera & time', min: 10, max: 48, step: 0.1, default: 22, unit: ' M' },
  { key: 'azimuth', label: 'Azimuth', group: 'Camera & time', min: 0, max: 360, step: 1, default: 38, unit: '°' },
  { key: 'elevation', label: 'Elevation', group: 'Camera & time', min: -75, max: 75, step: 1, default: 22, unit: '°' },
  { key: 'timeScale', label: 'Time rate', group: 'Camera & time', min: 0, max: 3, step: 0.01, default: 1, unit: '×' },
  { key: 'diskInner', label: 'Inner radius', group: 'Accretion disk', min: 3.8, max: 8, step: 0.05, default: 5, unit: ' M' },
  { key: 'diskOuter', label: 'Outer radius', group: 'Accretion disk', min: 9, max: 25, step: 0.1, default: 17, unit: ' M' },
  { key: 'diskHeight', label: 'Half thickness', group: 'Accretion disk', min: 0.05, max: 0.8, step: 0.01, default: 0.22, unit: ' M' },
  { key: 'diskTemperature', label: 'Temperature', group: 'Accretion disk', min: 0.5, max: 2, step: 0.01, default: 1, unit: '×' },
  { key: 'diskEmission', label: 'Emission', group: 'Accretion disk', min: 0, max: 5, step: 0.01, default: 2, unit: '×' },
  { key: 'orbitalSpeed', label: 'Orbital speed', group: 'Accretion disk', min: 0, max: 1.5, step: 0.01, default: 1, unit: '×' },
  { key: 'turbulence', label: 'Turbulence', group: 'Accretion disk', min: 0, max: 1, step: 0.01, default: 0.42, unit: '' },
  { key: 'turbulenceSpeed', label: 'Turbulence speed', group: 'Accretion disk', min: 0, max: 3, step: 0.01, default: 1, unit: '×' },
  { key: 'starDensity', label: 'Star density', group: 'Background', min: 0, max: 2, step: 0.01, default: 1, unit: '×' },
  { key: 'galaxyBrightness', label: 'Milky Way', group: 'Background', min: 0, max: 2, step: 0.01, default: 1, unit: '×' },
  { key: 'bloomStrength', label: 'Bloom strength', group: 'Lens & grade', min: 0, max: 2, step: 0.01, default: 0.85, unit: '' },
  { key: 'bloomThreshold', label: 'Bloom threshold', group: 'Lens & grade', min: 0.25, max: 4, step: 0.01, default: 1.2, unit: '' },
  { key: 'exposure', label: 'Exposure', group: 'Lens & grade', min: 0.4, max: 2, step: 0.01, default: 1, unit: '' },
  { key: 'vignette', label: 'Vignette', group: 'Lens & grade', min: 0, max: 0.6, step: 0.01, default: 0.18, unit: '' },
  { key: 'grain', label: 'Film grain', group: 'Lens & grade', min: 0, max: 0.08, step: 0.001, default: 0.025, unit: '' },
  { key: 'chromaticAberration', label: 'Chromatic aberration', group: 'Lens & grade', min: 0, max: 0.006, step: 0.0001, default: 0.0015, unit: '' },
];

const controlByKey = Object.fromEntries(CONTROLS.map((control) => [control.key, control]));

export function defaultState(mobile = false) {
  return {
    version: 1,
    params: {
      ...Object.fromEntries(CONTROLS.map((control) => [control.key, control.default])),
      ...(mobile ? presetCamera(0, true) : {}),
    },
    quality: mobile ? 'standard' : 'high',
    preset: 0,
    debug: 0,
    hud: true,
    drawer: false,
    cinematic: true,
    time: 0,
    capture: false,
  };
}

export function validateControl(key, value) {
  const spec = controlByKey[key];
  return spec && Number.isFinite(value) && value >= spec.min && value <= spec.max;
}

function readEnum(raw, allowed, fallback) {
  return allowed.includes(raw) ? raw : fallback;
}

function readInteger(raw, min, max, fallback) {
  const number = Number(raw);
  return Number.isInteger(number) && number >= min && number <= max ? number : fallback;
}

export function initialState(search = window.location.search, mobile = window.matchMedia('(max-width: 600px)').matches) {
  const defaults = defaultState(mobile);
  const query = new URLSearchParams(search);
  const capture = query.get('capture') === '1';
  const fallback = capture ? { ...defaults, quality: 'high' } : defaults;
  let state = defaults;

  if (!capture) {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (stored?.version === 1) {
        const params = { ...defaults.params };
        for (const key of Object.keys(params)) {
          if (validateControl(key, stored.params?.[key])) params[key] = stored.params[key];
        }
        state = {
          ...defaults,
          params,
          quality: readEnum(stored.quality, Object.keys(QUALITY), defaults.quality),
          preset: stored.preset === null ? null : readInteger(stored.preset, 0, 3, 0),
          debug: readInteger(stored.debug, 0, 9, 0),
          hud: typeof stored.hud === 'boolean' ? stored.hud : defaults.hud,
          drawer: typeof stored.drawer === 'boolean' ? stored.drawer : defaults.drawer,
          cinematic: typeof stored.cinematic === 'boolean' ? stored.cinematic : defaults.cinematic,
          time: Number.isFinite(stored.time) && stored.time >= 0 ? stored.time : defaults.time,
        };
      }
    } catch { /* Corrupt storage falls back to defaults. */ }
  } else {
    state = { ...fallback, capture: true, cinematic: false, time: 0 };
  }

  for (const [key, valid] of [
    ['quality', (value) => Object.hasOwn(QUALITY, value)],
    ['preset', (value) => /^[0-3]$/.test(value)],
    ['debug', (value) => /^[0-9]$/.test(value)],
    ['hud', (value) => value === '0' || value === '1'],
  ]) {
    if (query.has(key)) {
      const value = query.get(key);
      state[key] = valid(value)
        ? key === 'quality' ? value : key === 'hud' ? value === '1' : Number(value)
        : fallback[key];
    }
  }
  if (query.has('time') && capture) {
    const value = Number(query.get('time'));
    state.time = Number.isFinite(value) && value >= 0 ? value : 0;
  }
  if (state.preset !== null && (capture || query.has('preset'))) {
    state.params = { ...state.params, ...presetCamera(state.preset, mobile) };
  }
  return state;
}

export function persistState(state) {
  if (state.capture) return;
  try {
    const { version, params, quality, preset, debug, hud, drawer, cinematic, time } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version, params, quality, preset, debug, hud, drawer, cinematic, time }));
  } catch { /* Storage is optional when private browsing blocks it. */ }
}

export function stateSnapshot(state) {
  return { ...state, params: { ...state.params } };
}
