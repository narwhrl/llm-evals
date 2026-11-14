// Versioned, persisted UI + render state. Key bump = schema reset.

export const STORE_KEY = 'gargantua.v1';

export const PARAMS = [
  { key: 'fov', label: 'Field of view', unit: 'deg', min: 20, max: 110, step: 0.5 },
  { key: 'camDist', label: 'Camera distance', unit: 'M', min: 6, max: 40, step: 0.1 },
  { key: 'camAzim', label: 'Camera azimuth', unit: 'deg', min: -180, max: 180, step: 0.5 },
  { key: 'camElev', label: 'Camera elevation', unit: 'deg', min: -85, max: 85, step: 0.5 },
  { key: 'timeScale', label: 'Time rate', unit: 'x', min: 0, max: 4, step: 0.05 },
  { key: 'diskIn', label: 'Disk inner radius', unit: 'M', min: 2.6, max: 9, step: 0.05 },
  { key: 'diskOut', label: 'Disk outer radius', unit: 'M', min: 9, max: 30, step: 0.1 },
  { key: 'diskH', label: 'Disk half thickness', unit: 'M', min: 0.02, max: 1.5, step: 0.01 },
  { key: 'diskTemp', label: 'Disk temperature', unit: '', min: 0.2, max: 3, step: 0.01 },
  { key: 'diskBright', label: 'Disk emission', unit: '', min: 0, max: 6, step: 0.05 },
  { key: 'orbVel', label: 'Orbital velocity', unit: 'x', min: 0, max: 2, step: 0.01 },
  { key: 'turbAmp', label: 'Turbulence amount', unit: '', min: 0, max: 2, step: 0.01 },
  { key: 'turbSpeed', label: 'Turbulence speed', unit: 'x', min: 0, max: 4, step: 0.05 },
  { key: 'starDensity', label: 'Star density', unit: '', min: 0, max: 2.5, step: 0.01 },
  { key: 'galaxy', label: 'Galaxy brightness', unit: '', min: 0, max: 3, step: 0.01 },
  { key: 'bloom', label: 'Bloom strength', unit: '', min: 0, max: 2.5, step: 0.01 },
  { key: 'bloomThresh', label: 'Bloom threshold', unit: '', min: 0, max: 5, step: 0.01 },
  { key: 'exposure', label: 'Exposure', unit: 'EV', min: -3, max: 3, step: 0.01 },
  { key: 'vignette', label: 'Vignette', unit: '', min: 0, max: 1.5, step: 0.01 },
  { key: 'grain', label: 'Film grain', unit: '', min: 0, max: 1.5, step: 0.01 },
  { key: 'chromAb', label: 'Chromatic aberration', unit: '', min: 0, max: 2, step: 0.01 },
];

export const DEFAULTS = {
  fov: 55, camDist: 17, camAzim: 32, camElev: 13,
  timeScale: 1, diskIn: 4.2, diskOut: 17, diskH: 0.28,
  diskTemp: 1.15, diskBright: 2.6, orbVel: 1, turbAmp: 0.85, turbSpeed: 1,
  starDensity: 1, galaxy: 1.1, bloom: 0.85, bloomThresh: 1.0,
  exposure: 0.35, vignette: 0.55, grain: 0.35, chromAb: 0.5,
  quality: 'high', preset: 0, debug: 0, hud: 1, playing: true,
};

// Four visually distinct viewpoints. Elevation/distance/FOV all differ.
export const PRESETS = [
  { name: 'Lensed Equator', dist: 17, azim: 32, elev: 9, fov: 55 },
  { name: 'Polar Descent', dist: 15, azim: -60, elev: 58, fov: 50 },
  { name: 'Photon Ring Close-up', dist: 12, azim: 140, elev: 12, fov: 42 },
  { name: 'Far Lensed Vista', dist: 30, azim: -125, elev: 22, fov: 62 },
];

export const QUALITIES = {
  standard: { label: 'Standard', scale: 0.55, steps: 150, crossings: 4, bloomLevels: 1, taps: 5 },
  high: { label: 'High', scale: 0.8, steps: 240, crossings: 6, bloomLevels: 2, taps: 9 },
  cinematic: { label: 'Cinematic', scale: 1.0, steps: 380, crossings: 8, bloomLevels: 3, taps: 13 },
};

export const DEBUG_VIEWS = [
  'Final composite',
  'Geodesic fate + winding',
  'Event horizon mask',
  'Disk crossings + order',
  'Redshift / Doppler',
  'Lensed background coords',
  'Stars + galaxy only',
  'Disk emission only',
  'Disk temperature field',
  'Pre-tonemap HDR luminance',
];

export function defaultState() {
  return { ...DEFAULTS };
}

export function sanitize(patch) {
  const out = {};
  for (const p of PARAMS) {
    if (typeof patch[p.key] === 'number' && Number.isFinite(patch[p.key])) {
      out[p.key] = Math.min(p.max, Math.max(p.min, patch[p.key]));
    }
  }
  if (patch.quality in QUALITIES) out.quality = patch.quality;
  if (Number.isInteger(patch.preset) && patch.preset >= 0 && patch.preset < 4) out.preset = patch.preset;
  if (Number.isInteger(patch.debug) && patch.debug >= 0 && patch.debug <= 9) out.debug = patch.debug;
  if (patch.hud === 0 || patch.hud === 1) out.hud = patch.hud;
  if (typeof patch.playing === 'boolean') out.playing = patch.playing;
  return out;
}

export function loadState() {
  const base = defaultState();
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    if (parsed?.v !== 1 || typeof parsed?.s !== 'object') return base;
    return { ...base, ...sanitize(parsed.s) };
  } catch {
    return base;
  }
}

export function saveState(s) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ v: 1, s: sanitize(s) }));
  } catch { /* storage full/blocked: render anyway */ }
}

export function resetState() {
  try {
    localStorage.removeItem(STORE_KEY);
  } catch { /* ignore */ }
  return defaultState();
}
