export const STORAGE_KEY = 'gargantua.schwarzschild.console';
export const STATE_VERSION = 1;

export const QUALITY_PROFILES = {
  standard: { label: 'Standard', scale: 0.62, maxSteps: 112, maxDiskHits: 3, dprCap: 1.25, bloomScale: 0.28, bloomPasses: 2 },
  high: { label: 'High', scale: 0.82, maxSteps: 160, maxDiskHits: 4, dprCap: 1.5, bloomScale: 0.36, bloomPasses: 3 },
  cinematic: { label: 'Cinematic', scale: 1, maxSteps: 224, maxDiskHits: 4, dprCap: 2, bloomScale: 0.5, bloomPasses: 5 },
};

export const PRESETS = [
  { name: 'Gargantua', code: 'EQUATORIAL', fov: 42, distance: 20.5, azimuth: 0, elevation: 9.5 },
  { name: 'Photon orbit', code: 'INNER SYSTEM', fov: 46, distance: 10.5, azimuth: 45, elevation: 20 },
  { name: 'Polar sentinel', code: 'HIGH LATITUDE', fov: 45, distance: 20, azimuth: -35, elevation: 68 },
  { name: 'Eventide', code: 'GRAZING RAY', fov: 38, distance: 23, azimuth: 130, elevation: 3 },
];

export const DEBUG_VIEWS = [
  { name: 'Final composite', short: 'COMPOSITE', description: 'HDR radiance, bloom, ACES and lens optics' },
  { name: 'Integration / termination', short: 'INTEGRATOR', description: 'RK4 step heatmap; red captures, magenta exhaustion' },
  { name: 'Event horizon mask', short: 'HORIZON', description: 'Rays crossing r = 1 Schwarzschild radius' },
  { name: 'Disk crossings / order', short: 'DISK ORDER', description: 'Ordered slab samples: amber, cyan, violet, white' },
  { name: 'Redshift / Doppler', short: 'SHIFT δ', description: 'First-hit frequency shift; blue approaches, red recedes' },
  { name: 'Lensed celestial UV', short: 'SKY UV', description: 'Escaped-ray equirectangular coordinates after bending' },
  { name: 'Procedural stars', short: 'STARS', description: 'Lensed stellar radiance without disk or galaxy' },
  { name: 'Procedural galaxy', short: 'GALAXY', description: 'Lensed galactic band and dust without stars or disk' },
  { name: 'HDR before optics', short: 'RAW HDR', description: 'Scene radiance before bloom, grain, vignette and dispersion' },
  { name: 'Deflection / periapsis', short: 'DEFLECTION', description: 'Bending angle with closest-approach contouring' },
];

export const PARAMETER_GROUPS = [
  { id: 'camera', label: 'Camera', index: '01' },
  { id: 'disk', label: 'Accretion', index: '02' },
  { id: 'sky', label: 'Celestial', index: '03' },
  { id: 'optics', label: 'Optics', index: '04' },
];

export const PARAMETERS = [
  { key: 'fov', group: 'camera', label: 'Field of view', short: 'FOV', uniform: 'uFov', min: 24, max: 78, step: 0.5, unit: '°', digits: 1 },
  { key: 'distance', group: 'camera', label: 'Camera distance', uniform: 'uDistance', min: 6, max: 34, step: 0.1, unit: ' rₛ', digits: 1 },
  { key: 'azimuth', group: 'camera', label: 'Camera azimuth', uniform: 'uAzimuth', min: -180, max: 180, step: 1, unit: '°', digits: 0 },
  { key: 'elevation', group: 'camera', label: 'Camera elevation', uniform: 'uElevation', min: -80, max: 80, step: 0.5, unit: '°', digits: 1 },
  { key: 'timeScale', group: 'camera', label: 'Time multiplier', uniform: 'uTimeScale', min: 0, max: 3, step: 0.05, unit: '×', digits: 2 },
  { key: 'diskInner', group: 'disk', label: 'Disk inner radius', uniform: 'uDiskInner', min: 2.6, max: 5.5, step: 0.05, unit: ' rₛ', digits: 2 },
  { key: 'diskOuter', group: 'disk', label: 'Disk outer radius', uniform: 'uDiskOuter', min: 6, max: 18, step: 0.1, unit: ' rₛ', digits: 1 },
  { key: 'diskHalfThickness', group: 'disk', label: 'Disk half-thickness', uniform: 'uDiskHalfThickness', min: 0.02, max: 0.42, step: 0.01, unit: ' rₛ', digits: 2 },
  { key: 'diskTemperature', group: 'disk', label: 'Disk temperature', uniform: 'uDiskTemperature', min: 0.45, max: 1.8, step: 0.01, unit: '×', digits: 2 },
  { key: 'diskEmission', group: 'disk', label: 'Disk emission', uniform: 'uDiskEmission', min: 0, max: 7, step: 0.05, unit: '', digits: 2 },
  { key: 'orbitalSpeed', group: 'disk', label: 'Orbital velocity', uniform: 'uOrbitalSpeed', min: 0, max: 1.6, step: 0.01, unit: '×', digits: 2 },
  { key: 'turbulenceAmount', group: 'disk', label: 'Turbulence amplitude', uniform: 'uTurbulenceAmount', min: 0, max: 1.5, step: 0.01, unit: '', digits: 2 },
  { key: 'turbulenceSpeed', group: 'disk', label: 'Turbulence velocity', uniform: 'uTurbulenceSpeed', min: 0, max: 3, step: 0.01, unit: '×', digits: 2 },
  { key: 'starDensity', group: 'sky', label: 'Stellar density', uniform: 'uStarDensity', min: 0, max: 1, step: 0.01, unit: '', digits: 2 },
  { key: 'galaxyBrightness', group: 'sky', label: 'Galaxy brightness', uniform: 'uGalaxyBrightness', min: 0, max: 2, step: 0.01, unit: '', digits: 2 },
  { key: 'bloomStrength', group: 'optics', label: 'Bloom strength', uniform: 'uBloomStrength', min: 0, max: 2, step: 0.01, unit: '', digits: 2 },
  { key: 'bloomThreshold', group: 'optics', label: 'Bloom threshold', uniform: 'uBloomThreshold', min: 0.1, max: 3, step: 0.01, unit: '', digits: 2 },
  { key: 'exposure', group: 'optics', label: 'Exposure', uniform: 'uExposure', min: 0.2, max: 2.5, step: 0.01, unit: ' EV', digits: 2 },
  { key: 'vignette', group: 'optics', label: 'Vignette', uniform: 'uVignette', min: 0, max: 1, step: 0.01, unit: '', digits: 2 },
  { key: 'grain', group: 'optics', label: 'Film grain', uniform: 'uGrain', min: 0, max: 1, step: 0.01, unit: '', digits: 2 },
  { key: 'chromatic', group: 'optics', label: 'Chromatic dispersion', uniform: 'uChromatic', min: 0, max: 1, step: 0.01, unit: '', digits: 2 },
];

export const DEFAULT_PARAMS = Object.freeze({
  fov: 42,
  distance: 20.5,
  azimuth: 0,
  elevation: 9.5,
  timeScale: 0.8,
  diskInner: 3,
  diskOuter: 11,
  diskHalfThickness: 0.08,
  diskTemperature: 1.05,
  diskEmission: 0.72,
  orbitalSpeed: 1,
  turbulenceAmount: 0.7,
  turbulenceSpeed: 0.75,
  starDensity: 0.42,
  galaxyBrightness: 1.2,
  bloomStrength: 0.75,
  bloomThreshold: 0.85,
  exposure: 1.05,
  vignette: 0.32,
  grain: 0.2,
  chromatic: 0.16,
});

export function createDefaultState() {
  return {
    quality: 'high',
    preset: 0,
    debug: 0,
    playing: true,
    hudVisible: true,
    hudCollapsed: typeof window !== 'undefined' && window.innerWidth < 640,
    hudSection: 'camera',
    params: { ...DEFAULT_PARAMS },
  };
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const validQuality = (value) => Object.hasOwn(QUALITY_PROFILES, value);
const validIndex = (value, length) => Number.isInteger(value) && value >= 0 && value < length;

export function normalizeState(input = {}) {
  const defaults = createDefaultState();
  const source = input && typeof input === 'object' ? input : {};
  const params = { ...defaults.params };
  for (const definition of PARAMETERS) {
    const value = source.params?.[definition.key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      params[definition.key] = clamp(value, definition.min, definition.max);
    }
  }
  return {
    quality: validQuality(source.quality) ? source.quality : defaults.quality,
    preset: validIndex(source.preset, PRESETS.length) ? source.preset : defaults.preset,
    debug: validIndex(source.debug, DEBUG_VIEWS.length) ? source.debug : defaults.debug,
    playing: typeof source.playing === 'boolean' ? source.playing : defaults.playing,
    hudVisible: typeof source.hudVisible === 'boolean' ? source.hudVisible : defaults.hudVisible,
    hudCollapsed: typeof source.hudCollapsed === 'boolean' ? source.hudCollapsed : defaults.hudCollapsed,
    hudSection: PARAMETER_GROUPS.some((group) => group.id === source.hudSection) ? source.hudSection : defaults.hudSection,
    params,
  };
}

function readPersistedState() {
  try {
    const envelope = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (envelope?.version === STATE_VERSION) return normalizeState(envelope.state);
  } catch {
    // A blocked or malformed store must never prevent the renderer from starting.
  }
  return createDefaultState();
}

export function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, state }));
    return true;
  } catch {
    return false;
  }
}

function queryInteger(query, key, length, fallback) {
  if (!query.has(key)) return fallback;
  const raw = query.get(key);
  if (!/^(0|[1-9]\d*)$/.test(raw ?? '')) return createDefaultState()[key];
  const value = Number(raw);
  return validIndex(value, length) ? value : createDefaultState()[key];
}

export function getInitialState() {
  const query = new URLSearchParams(window.location.search);
  const capture = query.get('capture') === '1';
  const defaults = createDefaultState();
  // Captures are hermetic: unrelated saved preferences cannot change a reference frame.
  const state = capture ? defaults : readPersistedState();

  if (query.has('quality')) {
    const quality = query.get('quality');
    state.quality = validQuality(quality) ? quality : defaults.quality;
  }
  if (query.has('preset')) {
    state.preset = queryInteger(query, 'preset', PRESETS.length, defaults.preset);
    Object.assign(state.params, cameraParamsForPreset(state.preset));
  }
  if (query.has('debug')) state.debug = queryInteger(query, 'debug', DEBUG_VIEWS.length, defaults.debug);
  if (query.has('hud')) {
    const hud = query.get('hud');
    state.hudVisible = hud === '0' ? false : hud === '1' ? true : defaults.hudVisible;
  }

  let simTime = 0;
  if (query.has('time')) {
    const raw = query.get('time');
    const parsed = raw?.trim() ? Number(raw) : Number.NaN;
    simTime = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  }
  if (capture) state.playing = false;
  return { state: normalizeState(state), capture, simTime };
}

export function cameraParamsForPreset(index) {
  const preset = PRESETS[index] ?? PRESETS[0];
  return { fov: preset.fov, distance: preset.distance, azimuth: preset.azimuth, elevation: preset.elevation };
}

export function formatParameter(parameter, value) {
  return `${Number(value).toFixed(parameter.digits)}${parameter.unit}`;
}
