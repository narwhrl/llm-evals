import {
  STORAGE_KEY,
  STORAGE_VERSION,
  createDefaultAppState,
  createDefaultParams,
  QUALITY_LEVELS,
} from './defaults.js';

function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}

export function sanitizeState(raw) {
  const base = createDefaultAppState();
  if (!raw || typeof raw !== 'object') return base;

  const paramsIn = raw.params && typeof raw.params === 'object' ? raw.params : {};
  const d = createDefaultParams();
  const params = { ...d };
  for (const key of Object.keys(d)) {
    const v = Number(paramsIn[key]);
    if (Number.isFinite(v)) params[key] = v;
  }

  // Soft clamp known ranges
  params.fov = clamp(params.fov, 20, 110);
  params.camDistance = clamp(params.camDistance, 4, 60);
  params.camAzimuth = ((params.camAzimuth % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  params.camElevation = clamp(params.camElevation, -1.45, 1.45);
  params.timeScale = clamp(params.timeScale, 0, 5);
  params.diskInner = clamp(params.diskInner, 1.05, 8);
  params.diskOuter = clamp(params.diskOuter, params.diskInner + 0.5, 40);
  params.diskHalfThickness = clamp(params.diskHalfThickness, 0.01, 1.5);
  params.diskTemp = clamp(params.diskTemp, 0.2, 3);
  params.diskEmissivity = clamp(params.diskEmissivity, 0.05, 4);
  params.orbitalSpeed = clamp(params.orbitalSpeed, 0, 3);
  params.turbulenceAmp = clamp(params.turbulenceAmp, 0, 2);
  params.turbulenceSpeed = clamp(params.turbulenceSpeed, 0, 3);
  params.starDensity = clamp(params.starDensity, 0, 3);
  params.galaxyBrightness = clamp(params.galaxyBrightness, 0, 3);
  params.bloomStrength = clamp(params.bloomStrength, 0, 3);
  params.bloomThreshold = clamp(params.bloomThreshold, 0, 2);
  params.exposure = clamp(params.exposure, 0.1, 4);
  params.vignette = clamp(params.vignette, 0, 1.5);
  params.grain = clamp(params.grain, 0, 0.5);
  params.chromatic = clamp(params.chromatic, 0, 0.02);

  let quality = String(raw.quality || base.quality).toLowerCase();
  if (!QUALITY_LEVELS.includes(quality)) quality = base.quality;

  let preset = Number(raw.preset);
  if (!Number.isInteger(preset) || preset < 0 || preset > 3) preset = 0;

  let debug = Number(raw.debug);
  if (!Number.isInteger(debug) || debug < 0 || debug > 9) debug = 0;

  return {
    version: STORAGE_VERSION,
    params,
    quality,
    preset,
    debug,
    hudVisible: raw.hudVisible !== false,
    cinematicPlaying: raw.cinematicPlaying !== false,
    simTime: Number.isFinite(Number(raw.simTime)) ? Math.max(0, Number(raw.simTime)) : 0,
  };
}

export function loadState() {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    if (!text) return createDefaultAppState();
    return sanitizeState(JSON.parse(text));
  } catch {
    return createDefaultAppState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeState(state)));
  } catch {
    // ignore quota / private mode
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
