// Central description of every tunable of GARGANTUA.
// The parameter list is the single source of truth for the HUD, the shader
// uniforms and the persisted state.

export const STORAGE_KEY = 'gargantua.settings';
export const STORAGE_VERSION = 1;

export const QUALITY_LEVELS = ['standard', 'high', 'cinematic'];

export const QUALITY_PROFILES = {
  standard: {
    label: 'Standard',
    renderScale: 0.55,
    maxSteps: 190,
    stepPhi: 0.16,
    starLayers: 1,
    bloomLevels: 2,
    maxPixels: 1.1e6,
  },
  high: {
    label: 'High',
    renderScale: 0.75,
    maxSteps: 420,
    stepPhi: 0.09,
    starLayers: 2,
    bloomLevels: 3,
    maxPixels: 2.2e6,
  },
  cinematic: {
    label: 'Cinematic',
    renderScale: 1.0,
    maxSteps: 900,
    stepPhi: 0.05,
    starLayers: 3,
    bloomLevels: 3,
    maxPixels: 4.2e6,
  },
};

// Every entry drives either a shader uniform or the camera state.
export const PARAM_GROUPS = [
  {
    id: 'camera',
    title: 'Camera',
    params: [
      { key: 'fov', label: 'Field of view', min: 14, max: 90, step: 0.5, unit: '°', default: 38 },
      { key: 'cameraDistance', label: 'Camera distance', min: 3.2, max: 90, step: 0.1, unit: 'M', default: 36 },
      { key: 'cameraAzimuth', label: 'Camera azimuth', min: -Math.PI, max: Math.PI, step: 0.005, unit: 'rad', default: 0.85 },
      { key: 'cameraElevation', label: 'Camera elevation', min: -1.4, max: 1.4, step: 0.005, unit: 'rad', default: 0.22 },
    ],
  },
  {
    id: 'disc',
    title: 'Accretion disc',
    params: [
      { key: 'diskInner', label: 'Inner radius', min: 3.05, max: 16, step: 0.05, unit: 'M', default: 6 },
      { key: 'diskOuter', label: 'Outer radius', min: 5, max: 46, step: 0.1, unit: 'M', default: 15.5 },
      { key: 'diskHalfThickness', label: 'Half thickness', min: 0.02, max: 2.5, step: 0.01, unit: 'M', default: 0.22 },
      { key: 'diskTemperature', label: 'Peak temperature', min: 1200, max: 24000, step: 50, unit: 'K', default: 5200 },
      { key: 'diskIntensity', label: 'Emission intensity', min: 0, max: 12, step: 0.01, default: 0.45 },
      { key: 'diskOpacity', label: 'Optical opacity', min: 1, max: 40, step: 0.5, unit: '1/M', default: 14 },
      { key: 'orbitSpeed', label: 'Orbital speed', min: 0, max: 3, step: 0.01, unit: '×', default: 1 },
    ],
  },
  {
    id: 'turbulence',
    title: 'Turbulence',
    params: [
      { key: 'turbulenceAmp', label: 'Turbulence amplitude', min: 0, max: 1.5, step: 0.01, default: 0.42 },
      { key: 'turbulenceSpeed', label: 'Turbulence speed', min: 0, max: 6, step: 0.05, unit: '×', default: 1 },
    ],
  },
  {
    id: 'background',
    title: 'Background',
    params: [
      { key: 'starDensity', label: 'Star density', min: 0, max: 2, step: 0.01, default: 1 },
      { key: 'starBrightness', label: 'Star brightness', min: 0, max: 4, step: 0.02, default: 2.2 },
      { key: 'galaxyBrightness', label: 'Galaxy brightness', min: 0, max: 4, step: 0.02, default: 1.1 },
    ],
  },
  {
    id: 'post',
    title: 'Post processing',
    params: [
      { key: 'bloomStrength', label: 'Bloom strength', min: 0, max: 2.5, step: 0.01, default: 0.5 },
      { key: 'bloomThreshold', label: 'Bloom threshold', min: 0, max: 4, step: 0.01, default: 1.05 },
      { key: 'exposure', label: 'Exposure', min: 0.05, max: 6, step: 0.01, default: 1.0 },
      { key: 'vignette', label: 'Vignette', min: 0, max: 1.2, step: 0.01, default: 0.42 },
      { key: 'grain', label: 'Film grain', min: 0, max: 1.5, step: 0.01, default: 0.22 },
      { key: 'chromatic', label: 'Chromatic aberration', min: 0, max: 0.05, step: 0.0005, default: 0.006 },
    ],
  },
  {
    id: 'time',
    title: 'Simulation',
    params: [
      { key: 'timeScale', label: 'Time multiplier', min: 0, max: 12, step: 0.05, unit: '×', default: 1 },
    ],
  },
];

export const ALL_PARAMS = PARAM_GROUPS.flatMap((g) => g.params);

export const DEFAULT_PARAMS = Object.fromEntries(ALL_PARAMS.map((p) => [p.key, p.default]));

// Four clearly different camera viewpoints.
export const PRESETS = [
  {
    name: 'Hero Orbit',
    hint: 'Classic three-quarter view',
    fov: 38,
    cameraDistance: 36,
    cameraAzimuth: 0.85,
    cameraElevation: 0.22,
  },
  {
    name: 'Edge-On Disc',
    hint: 'Grazing view through the disc plane',
    fov: 32,
    cameraDistance: 29,
    cameraAzimuth: -0.35,
    cameraElevation: 0.03,
  },
  {
    name: 'Polar Plunge',
    hint: 'Looking down the rotation axis',
    fov: 46,
    cameraDistance: 30,
    cameraAzimuth: 2.1,
    cameraElevation: 1.18,
  },
  {
    name: 'Photon Ring',
    hint: 'Close to the critical curve',
    fov: 46,
    cameraDistance: 13.5,
    cameraAzimuth: -1.15,
    cameraElevation: 0.12,
  },
];

export const DEBUG_MODES = [
  { id: 0, name: 'Composite', desc: 'Final HDR composite with bloom and ACES tone mapping' },
  { id: 1, name: 'Geodesic', desc: 'Integration steps and termination reason (red = horizon capture)' },
  { id: 2, name: 'Horizon', desc: 'Event-horizon capture mask, critical curve and total deflection' },
  { id: 3, name: 'Disc Hits', desc: 'Disc plane crossings and their order along the ray' },
  { id: 4, name: 'Redshift', desc: 'Doppler plus gravitational redshift factor of the disc hits' },
  { id: 5, name: 'Lens Map', desc: 'Background lensing coordinates of the asymptotic escape direction' },
  { id: 6, name: 'Sky', desc: 'Procedural star field and galactic band without lensing' },
  { id: 7, name: 'Raw HDR', desc: 'Pre-post-processing radiance, log encoded' },
  { id: 8, name: 'Disc Physics', desc: 'Disc temperature and turbulent density at the first crossing' },
  { id: 9, name: 'Photon Ring', desc: 'Closest approach radius and the critical photon-sphere structure' },
];

export const SHORTCUTS = [
  { keys: '0 - 9', desc: 'Switch diagnostic view' },
  { keys: 'Shift + 1..4', desc: 'Jump to camera preset' },
  { keys: 'Space', desc: 'Play / pause the cinematic camera' },
  { keys: 'H', desc: 'Show / hide the HUD' },
  { keys: 'R', desc: 'Reset every parameter and the camera' },
  { keys: 'Q', desc: 'Cycle the quality tier' },
  { keys: 'M', desc: 'Toggle the procedural ambient drone' },
];

export const DEFAULT_QUALITY = 'high';
export const DEFAULT_PRESET = 0;
export const DEFAULT_DEBUG = 0;
export const DEFAULT_HUD_OPEN = true;

export function defaultState() {
  return {
    params: { ...DEFAULT_PARAMS },
    quality: DEFAULT_QUALITY,
    preset: DEFAULT_PRESET,
    debug: DEFAULT_DEBUG,
    hudOpen: DEFAULT_HUD_OPEN,
    cinematic: true,
    audio: false,
  };
}

export function clampParam(key, value) {
  const def = ALL_PARAMS.find((p) => p.key === key);
  if (!def || !Number.isFinite(value)) return null;
  return Math.min(def.max, Math.max(def.min, value));
}
