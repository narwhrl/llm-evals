// Single source of truth for persisted settings, URL validation, presets and
// the render budgets advertised by each quality tier.

export const STATE_VERSION = 1;
export const STORAGE_KEY = 'gargantua.state.v1';

export const PARAMS = {
  fov: {
    label: 'Field of view', min: 20, max: 85, step: 0.5, default: 48,
    unit: 'deg', group: 'camera', digits: 1,
  },
  distance: {
    label: 'Camera distance', min: 10, max: 60, step: 0.1, default: 30,
    unit: 'M', group: 'camera', digits: 1,
  },
  azimuth: {
    label: 'Azimuth', min: 0, max: 360, step: 0.5, default: 34,
    unit: 'deg', group: 'camera', digits: 1, wrap: true,
  },
  elevation: {
    label: 'Elevation', min: -75, max: 75, step: 0.5, default: 18,
    unit: 'deg', group: 'camera', digits: 1,
  },
  timeScale: {
    label: 'Time rate', min: 0, max: 3, step: 0.01, default: 1,
    unit: 'x', group: 'camera', digits: 2,
  },
  diskInner: {
    label: 'Disk inner edge', min: 3.2, max: 13, step: 0.1, default: 6,
    unit: 'M', group: 'disk', digits: 1,
  },
  diskOuter: {
    label: 'Disk outer edge', min: 8, max: 28, step: 0.1, default: 16,
    unit: 'M', group: 'disk', digits: 1,
  },
  diskThickness: {
    label: 'Disk half thickness', min: 0.04, max: 1.2, step: 0.01, default: 0.42,
    unit: 'M', group: 'disk', digits: 2,
  },
  diskTemperature: {
    label: 'Peak temperature', min: 3000, max: 18000, step: 100, default: 5600,
    unit: 'K', group: 'disk', digits: 0,
  },
  diskEmission: {
    label: 'Emission gain', min: 0.1, max: 3, step: 0.01, default: 1,
    unit: 'x', group: 'disk', digits: 2,
  },
  orbitalSpeed: {
    label: 'Orbital velocity', min: 0, max: 1.8, step: 0.01, default: 1,
    unit: 'x', group: 'disk', digits: 2,
  },
  turbulenceAmount: {
    label: 'Turbulence amplitude', min: 0, max: 1.5, step: 0.01, default: 0.72,
    unit: '', group: 'disk', digits: 2,
  },
  turbulenceSpeed: {
    label: 'Turbulence rate', min: 0, max: 3, step: 0.01, default: 1,
    unit: 'x', group: 'disk', digits: 2,
  },
  starDensity: {
    label: 'Star density', min: 0, max: 2.5, step: 0.01, default: 1,
    unit: 'x', group: 'sky', digits: 2,
  },
  galaxyBrightness: {
    label: 'Galaxy brightness', min: 0, max: 2, step: 0.01, default: 0.8,
    unit: 'x', group: 'sky', digits: 2,
  },
  bloomStrength: {
    label: 'Bloom strength', min: 0, max: 2.5, step: 0.01, default: 0.65,
    unit: 'x', group: 'post', digits: 2,
  },
  bloomThreshold: {
    label: 'Bloom threshold', min: 0, max: 3, step: 0.01, default: 1.25,
    unit: '', group: 'post', digits: 2,
  },
  exposure: {
    label: 'Exposure', min: 0.2, max: 3, step: 0.01, default: 0.92,
    unit: 'EV', group: 'post', digits: 2,
  },
  vignette: {
    label: 'Vignette', min: 0, max: 1, step: 0.01, default: 0.32,
    unit: '', group: 'post', digits: 2,
  },
  grain: {
    label: 'Film grain', min: 0, max: 0.15, step: 0.001, default: 0.03,
    unit: '', group: 'post', digits: 3,
  },
  chromatic: {
    label: 'Chromatic dispersion', min: 0, max: 2, step: 0.01, default: 0.32,
    unit: '', group: 'post', digits: 2,
  },
};

export const PARAM_ORDER = Object.keys(PARAMS);

export const PARAM_GROUPS = [
  { id: 'camera', label: 'Observation', hint: 'OrbitControls → shader camera' },
  { id: 'disk', label: 'Accretion disk', hint: 'Curved-path emission / g-factor' },
  { id: 'sky', label: 'Deep field', hint: 'Procedural lensed background' },
  { id: 'post', label: 'Optics', hint: 'HDR composite / lens artifacts' },
];

export const CAMERA_KEYS = ['fov', 'distance', 'azimuth', 'elevation'];

export const QUALITY_PROFILES = {
  standard: {
    id: 'standard', label: 'Standard', short: 'STD',
    renderScale: 0.62, dprCap: 1.25, maxSteps: 420, maxCrossings: 4, bloomLevels: 3,
    note: '0.62x raster · 420 geodesic steps · 4 disk crossings',
  },
  high: {
    id: 'high', label: 'High', short: 'HIGH',
    renderScale: 0.82, dprCap: 1.6, maxSteps: 820, maxCrossings: 6, bloomLevels: 4,
    note: '0.82x raster · 820 geodesic steps · 6 disk crossings',
  },
  cinematic: {
    id: 'cinematic', label: 'Cinematic', short: 'CINE',
    renderScale: 1, dprCap: 2, maxSteps: 1500, maxCrossings: 10, bloomLevels: 5,
    note: '1.00x raster · 1500 geodesic steps · 10 disk crossings',
  },
};

export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

export const PRESETS = [
  {
    id: 'observer', name: 'Observer', code: '01',
    azimuth: 34, elevation: 18, distance: 30, fov: 48,
    blurb: 'Three-quarter view. Front and back disk visible.',
  },
  {
    id: 'edge-on', name: 'Edge-on', code: '02',
    azimuth: 122, elevation: 2.5, distance: 25, fov: 43,
    blurb: 'Near the disk plane. Doppler limb is brightest.',
  },
  {
    id: 'polar', name: 'Polar', code: '03',
    azimuth: 214, elevation: 62, distance: 36, fov: 52,
    blurb: 'High inclination. Full photon ring and spiral lanes.',
  },
  {
    id: 'close-pass', name: 'Close pass', code: '04',
    azimuth: 306, elevation: -9, distance: 16.5, fov: 63,
    blurb: 'Low, close orbit. Extreme lensing and secondary images.',
  },
];

export const DEBUG_VIEWS = [
  { id: 'final', name: 'Final composite', detail: 'Full HDR path-traced frame with bloom, ACES and lens artifacts.' },
  { id: 'steps', name: 'Geodesic steps', detail: 'Integration steps per ray; red tint marks horizon capture.' },
  { id: 'horizon', name: 'Horizon mask', detail: 'Red: terminated at the event horizon. Blue: escaped to the sky.' },
  { id: 'crossings', name: 'Disk crossings', detail: 'Ordered equatorial-plane crossings, coloured by crossing order.' },
  { id: 'redshift', name: 'Redshift / Doppler', detail: 'Observed/emitted frequency g. Blue is blueshift, red is redshift.' },
  { id: 'lensmap', name: 'Lensed sky map', detail: 'Escape direction encoded as RGB after curvature deflection.' },
  { id: 'sky', name: 'Stars + galaxy', detail: 'Procedural deep field only, seen through the gravitational lens.' },
  { id: 'emission', name: 'Disk emission', detail: 'Temperature and turbulence before Doppler beaming is applied.' },
  { id: 'hdr', name: 'Pre-post HDR', detail: 'Log-scaled raw radiance before bloom, ACES, grain or vignette.' },
  { id: 'critical', name: 'Critical curve', detail: 'Impact parameter b / b_crit; the white ridge is the photon ring.' },
];

export const DEFAULT_PARAMS = Object.fromEntries(
  PARAM_ORDER.map((key) => [key, PARAMS[key].default]),
);

export const DEFAULTS = {
  version: STATE_VERSION,
  params: { ...DEFAULT_PARAMS },
  quality: 'high',
  preset: 0,
  debug: 0,
  hudOpen: true,
  playing: true,
  time: 0,
  capture: false,
  frozen: false,
};

export function clampParam(key, value) {
  const def = PARAMS[key];
  if (!def) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return def.default;
  let clamped = Math.min(def.max, Math.max(def.min, number));
  if (def.wrap) {
    const span = def.max - def.min;
    clamped = ((clamped - def.min) % span + span) % span + def.min;
  }
  return clamped;
}

export function applyPresetToParams(params, index) {
  const preset = PRESETS[index];
  if (!preset) return { ...params };
  return {
    ...params,
    azimuth: preset.azimuth,
    elevation: preset.elevation,
    distance: preset.distance,
    fov: preset.fov,
  };
}

export function defaultState() {
  return {
    ...DEFAULTS,
    params: { ...DEFAULT_PARAMS },
  };
}
