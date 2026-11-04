// Versioned persistent state, quality budgets, presets and the URL contract.

export const STORAGE_KEY = 'gargantua.state.v1';
export const STATE_VERSION = 1;

export const QUALITY = {
  standard:  { label: 'Standard',  renderScale: 0.65, maxSteps: 190, stepScale: 0.15, bloomPasses: 2 },
  high:      { label: 'High',      renderScale: 0.85, maxSteps: 320, stepScale: 0.12, bloomPasses: 3 },
  cinematic: { label: 'Cinematic', renderScale: 1.00, maxSteps: 480, stepScale: 0.10, bloomPasses: 4 },
};
export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

// Four visually distinct camera presets (distance in units of RS).
export const PRESETS = [
  { name: 'Edge-On',    fov: 55, cameraDistance: 14, cameraAzimuth: 0.05, cameraElevation: 0.08 },
  { name: 'Inclined',   fov: 60, cameraDistance: 11, cameraAzimuth: 0.78, cameraElevation: 0.50 },
  { name: 'Overhead',   fov: 50, cameraDistance: 16, cameraAzimuth: 1.30, cameraElevation: 1.20 },
  { name: 'Wide Field', fov: 72, cameraDistance: 24, cameraAzimuth: 2.40, cameraElevation: 0.20 },
];

export const DEBUG_VIEWS = [
  'Final composite',
  'Ray steps / termination',
  'Event horizon mask',
  'Disk crossings & image order',
  'Redshift / Doppler shift',
  'Lensed background coordinates',
  'Procedural stars / galaxy',
  'Pre-post HDR radiance',
  'Geodesic deflection angle',
  'Photon-ring criticality',
];

// The 21 required controls. `camera: true` marks params that move the camera.
export const PARAMS = [
  { key: 'fov',              label: 'Field of view',      min: 20,   max: 100, step: 1,    unit: '°',   group: 'Camera',     camera: true },
  { key: 'cameraDistance',   label: 'Camera distance',    min: 4,    max: 40,  step: 0.1,  unit: 'rs',  group: 'Camera',     camera: true },
  { key: 'cameraAzimuth',    label: 'Camera azimuth',     min: -3.14,max: 3.14,step: 0.01, unit: 'rad', group: 'Camera',     camera: true },
  { key: 'cameraElevation',  label: 'Camera elevation',   min: -1.45,max: 1.45,step: 0.01, unit: 'rad', group: 'Camera',     camera: true },
  { key: 'timeScale',        label: 'Time multiplier',    min: 0,    max: 4,   step: 0.05, unit: '×',   group: 'Simulation' },
  { key: 'diskInner',        label: 'Disk inner radius',  min: 1.6,  max: 6,   step: 0.05, unit: 'rs',  group: 'Disk' },
  { key: 'diskOuter',        label: 'Disk outer radius',  min: 6,    max: 20,  step: 0.1,  unit: 'rs',  group: 'Disk' },
  { key: 'diskThickness',    label: 'Disk half thickness',min: 0.02, max: 1.5, step: 0.01, unit: 'rs',  group: 'Disk' },
  { key: 'diskTemp',         label: 'Disk temperature',   min: 0.3,  max: 2.5, step: 0.01, unit: '',    group: 'Disk' },
  { key: 'diskIntensity',    label: 'Disk emission',      min: 0,    max: 4,   step: 0.01, unit: '',    group: 'Disk' },
  { key: 'orbitalSpeed',     label: 'Orbital velocity',   min: 0,    max: 1.6, step: 0.01, unit: '×',   group: 'Disk' },
  { key: 'turbulenceAmp',    label: 'Turbulence amount',  min: 0,    max: 1.5, step: 0.01, unit: '',    group: 'Disk' },
  { key: 'turbulenceSpeed',  label: 'Turbulence speed',   min: 0,    max: 2,   step: 0.01, unit: '×',   group: 'Disk' },
  { key: 'starDensity',      label: 'Star density',       min: 0,    max: 2,   step: 0.01, unit: '',    group: 'Background' },
  { key: 'galaxyBrightness', label: 'Galaxy brightness',  min: 0,    max: 2.5, step: 0.01, unit: '',    group: 'Background' },
  { key: 'bloomStrength',    label: 'Bloom strength',     min: 0,    max: 2.5, step: 0.01, unit: '',    group: 'Post' },
  { key: 'bloomThreshold',   label: 'Bloom threshold',    min: 0,    max: 3,   step: 0.01, unit: '',    group: 'Post' },
  { key: 'exposure',         label: 'Exposure',           min: 0.2,  max: 3,   step: 0.01, unit: '',    group: 'Post' },
  { key: 'vignette',         label: 'Vignette',           min: 0,    max: 1.5, step: 0.01, unit: '',    group: 'Post' },
  { key: 'grain',            label: 'Film grain',         min: 0,    max: 0.2, step: 0.001,unit: '',    group: 'Post' },
  { key: 'chromatic',        label: 'Chromatic aberration',min: 0,   max: 3,   step: 0.01, unit: '',    group: 'Post' },
];

export const DEFAULTS = {
  fov: 58,
  cameraDistance: 13,
  cameraAzimuth: 0.35,
  cameraElevation: 0.28,
  timeScale: 1.0,
  diskInner: 2.4,
  diskOuter: 11.0,
  diskThickness: 0.35,
  diskTemp: 1.15,
  diskIntensity: 1.5,
  orbitalSpeed: 1.0,
  turbulenceAmp: 0.65,
  turbulenceSpeed: 0.35,
  starDensity: 1.0,
  galaxyBrightness: 1.0,
  bloomStrength: 0.85,
  bloomThreshold: 0.9,
  exposure: 1.0,
  vignette: 0.55,
  grain: 0.035,
  chromatic: 0.6,
  quality: 'high',
  preset: 0,
  debug: 0,
  hudOpen: true,
  playing: true,
  audio: false,
};

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function loadState() {
  const out = { ...DEFAULTS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return out;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STATE_VERSION || typeof parsed.values !== 'object') return out;
    const v = parsed.values;
    for (const p of PARAMS) {
      if (typeof v[p.key] === 'number' && Number.isFinite(v[p.key])) {
        out[p.key] = clamp(v[p.key], p.min, p.max);
      }
    }
    if (QUALITY[v.quality]) out.quality = v.quality;
    if (Number.isInteger(v.preset) && v.preset >= 0 && v.preset < PRESETS.length) out.preset = v.preset;
    if (Number.isInteger(v.debug) && v.debug >= 0 && v.debug <= 9) out.debug = v.debug;
    if (typeof v.hudOpen === 'boolean') out.hudOpen = v.hudOpen;
    if (typeof v.playing === 'boolean') out.playing = v.playing;
    if (typeof v.audio === 'boolean') out.audio = v.audio;
  } catch {
    return { ...DEFAULTS };
  }
  return out;
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, values: state }));
  } catch {
    /* storage unavailable (private mode / quota): rendering still works */
  }
}

export function clearState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}

// Applies ?capture=1&quality=..&preset=..&debug=..&time=..&hud=.. ; every
// invalid value falls back to the default (or to `time = 0`) without throwing.
export function applyUrlParams(base) {
  const q = new URLSearchParams(window.location.search);
  const state = { ...base };
  const capture = q.get('capture') === '1';

  if (q.has('quality') && QUALITY[q.get('quality')]) state.quality = q.get('quality');
  if (q.has('preset')) {
    const n = Number(q.get('preset'));
    if (Number.isInteger(n) && n >= 0 && n < PRESETS.length) state.preset = n;
  }
  if (q.has('debug')) {
    const n = Number(q.get('debug'));
    if (Number.isInteger(n) && n >= 0 && n <= 9) state.debug = n;
  }
  if (q.has('hud')) {
    const v = q.get('hud');
    if (v === '0' || v === '1') state.hudOpen = v === '1';
  }
  let time = 0;
  if (q.has('time')) {
    const n = Number(q.get('time'));
    if (Number.isFinite(n) && n >= 0) time = n;
  }

  if (capture) {
    state.playing = false;   // freeze the cinematic loop & non-deterministic advance
    state.audio = false;     // no audio in capture mode
    if (q.has('preset')) Object.assign(state, PRESETS[state.preset]);
  }
  return { state, capture, time };
}
