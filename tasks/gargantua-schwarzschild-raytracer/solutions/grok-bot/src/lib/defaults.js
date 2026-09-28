/** Default simulation / render state (versioned for localStorage). */
export const STORAGE_KEY = 'gargantua.schwarzschild.v1';
export const STORAGE_VERSION = 1;

export const QUALITY_LEVELS = ['standard', 'high', 'cinematic'];

export const QUALITY_BUDGET = {
  standard: {
    label: 'Standard',
    internalScale: 0.5,
    maxSteps: 520,
    stepSize: 0.08,
    bloomIterations: 3,
    bloomScale: 0.35,
    dprCap: 1.25,
  },
  high: {
    label: 'High',
    internalScale: 0.7,
    maxSteps: 900,
    stepSize: 0.055,
    bloomIterations: 4,
    bloomScale: 0.5,
    dprCap: 1.75,
  },
  cinematic: {
    label: 'Cinematic',
    internalScale: 0.95,
    maxSteps: 1400,
    stepSize: 0.04,
    bloomIterations: 5,
    bloomScale: 0.65,
    dprCap: 2.0,
  },
};

export const PRESETS = [
  {
    name: 'Wide Approach',
    distance: 18,
    azimuth: 0.35,
    elevation: 0.42,
    fov: 55,
  },
  {
    name: 'Edge-On Disk',
    distance: 14,
    azimuth: 1.15,
    elevation: 0.08,
    fov: 48,
  },
  {
    name: 'High Inclination',
    distance: 12,
    azimuth: -0.55,
    elevation: 0.95,
    fov: 60,
  },
  {
    name: 'Photon Ring Close',
    distance: 8.5,
    azimuth: 2.4,
    elevation: 0.55,
    fov: 70,
  },
];

export const DEBUG_VIEWS = [
  { id: 0, name: 'Final composite', desc: 'ACES + bloom + lens FX' },
  { id: 1, name: 'Ray steps / exit', desc: 'Integration budget & termination' },
  { id: 2, name: 'Event horizon', desc: 'Horizon capture mask' },
  { id: 3, name: 'Disk crossings', desc: 'Ordered disk hit count / order' },
  { id: 4, name: 'Redshift / Doppler', desc: 'Combined spectral shift factor' },
  { id: 5, name: 'Lensed background UV', desc: 'Sky direction after deflection' },
  { id: 6, name: 'Stars only', desc: 'Procedural starfield contribution' },
  { id: 7, name: 'Galaxy only', desc: 'Procedural galactic band' },
  { id: 8, name: 'Disk HDR only', desc: 'Disk emission before tonemap' },
  { id: 9, name: 'Pre-tonemap HDR', desc: 'Full HDR before bloom/ACES' },
];

export function createDefaultParams() {
  return {
    fov: 55,
    camDistance: 16,
    camAzimuth: 0.4,
    camElevation: 0.45,
    timeScale: 1,
    diskInner: 2.2,
    diskOuter: 9.5,
    diskHalfThickness: 0.12,
    diskTemp: 1.0,
    diskEmissivity: 1.15,
    orbitalSpeed: 1.0,
    turbulenceAmp: 0.55,
    turbulenceSpeed: 0.8,
    starDensity: 1.0,
    galaxyBrightness: 0.85,
    bloomStrength: 0.85,
    bloomThreshold: 0.55,
    exposure: 1.05,
    vignette: 0.35,
    grain: 0.08,
    chromatic: 0.0018,
  };
}

export function createDefaultAppState() {
  return {
    version: STORAGE_VERSION,
    params: createDefaultParams(),
    quality: 'high',
    preset: 0,
    debug: 0,
    hudVisible: true,
    cinematicPlaying: true,
    simTime: 0,
  };
}
