// Centralized application state with versioned localStorage persistence
// and a window.__GARGANTUA__ API.

import { parseCaptureUrl } from './url.js';

const STORAGE_KEY = 'gargantua-state-v1';
const STATE_VERSION = 1;

export const PARAM_DEFS = [
  // [id, label, min, max, step, default]
  ['fov', 'FOV (°)', 25, 110, 1, 65],
  ['camDistance', 'Camera distance', 6, 60, 0.1, 18],
  ['camAzimuth', 'Camera azimuth (°)', -180, 180, 1, 0],
  ['camPitch', 'Camera pitch (°)', -80, 80, 1, 6],
  ['timeScale', 'Time multiplier', 0, 5, 0.05, 1],
  ['diskInner', 'Disk inner radius', 4, 12, 0.1, 6],
  ['diskOuter', 'Disk outer radius', 10, 36, 0.1, 16],
  ['diskThickness', 'Disk half-thickness', 0.05, 1.2, 0.01, 0.35],
  ['diskTemperature', 'Disk temperature', 0.2, 3.0, 0.05, 1.0],
  ['diskIntensity', 'Disk emission intensity', 0.0, 4.0, 0.05, 0.85],
  ['orbitSpeed', 'Orbital velocity multiplier', 0.4, 1.8, 0.02, 1.0],
  ['turbulence', 'Turbulence amplitude', 0.0, 1.0, 0.02, 0.35],
  ['turbulenceSpeed', 'Turbulence speed', 0.0, 4.0, 0.05, 1.0],
  ['starDensity', 'Star density', 0.1, 3.0, 0.05, 1.2],
  ['galaxyBrightness', 'Galaxy brightness', 0.0, 2.0, 0.05, 0.7],
  ['bloomStrength', 'Bloom strength', 0.0, 2.5, 0.02, 0.6],
  ['bloomThreshold', 'Bloom threshold', 0.0, 4.0, 0.02, 1.4],
  ['exposure', 'Exposure', 0.2, 3.0, 0.02, 1.1],
  ['vignette', 'Vignette strength', 0.0, 1.5, 0.02, 0.45],
  ['grain', 'Film grain strength', 0.0, 0.3, 0.005, 0.04],
  ['chromaticAberration', 'Chromatic aberration strength', 0.0, 0.02, 0.0005, 0.002]
];

export const QUALITY_PRESETS = {
  standard:   { dpr: 1.0, maxSteps: 80,  bloomMips: 2, blurTaps: 8,  label: 'Standard' },
  high:       { dpr: 1.5, maxSteps: 160, bloomMips: 3, blurTaps: 12, label: 'High' },
  cinematic:  { dpr: 2.0, maxSteps: 320, bloomMips: 4, blurTaps: 16, label: 'Cinematic' }
};

export const CAMERA_PRESETS = [
  { id: 0, name: 'Equatorial',
    distance: 18, azimuth: 0,   pitch: 22, fov: 65 },
  { id: 1, name: 'High Inclination',
    distance: 22, azimuth: 30,  pitch: 55, fov: 60 },
  { id: 2, name: 'Photon Toll',
    distance: 16, azimuth: -45, pitch: 26, fov: 70 },
  { id: 3, name: 'Low Orbit',
    distance: 14, azimuth: 120, pitch: 32, fov: 80 }
];

export const DEBUG_MODES = [
  { id: 0, name: 'Final', caption: 'Composite render' },
  { id: 1, name: 'Step heatmap', caption: 'Geodesic step count heatmap' },
  { id: 2, name: 'Horizon mask', caption: 'Inside event horizon (1)' },
  { id: 3, name: 'Photon ring', caption: 'Critical orbit band' },
  { id: 4, name: 'Disk crossing', caption: 'Number of disk-plane crossings' },
  { id: 5, name: 'Doppler', caption: 'Relativistic Doppler factor' },
  { id: 6, name: 'Redshift', caption: 'Gravitational redshift factor' },
  { id: 7, name: 'Escape dir', caption: 'Final photon direction (encoded rgb)' },
  { id: 8, name: 'Galaxy', caption: 'Procedural galaxy sample intensity' },
  { id: 9, name: 'HDR luma', caption: 'Pre-tonemap HDR luma' }
];

function defaultsFromDefs() {
  const out = {};
  for (const [id, , , , , def] of PARAM_DEFS) out[id] = def;
  return out;
}

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STATE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persist(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / disabled — ignore */
  }
}

function applyOverrides(state, url) {
  if (!url) return state;
  const merged = { ...state };
  if (url.quality && QUALITY_PRESETS[url.quality]) merged.quality = url.quality;
  if (typeof url.preset === 'number') merged.preset = url.preset;
  if (typeof url.debug === 'number') merged.debugMode = url.debug;
  if (typeof url.hud === 'boolean') merged.hudVisible = url.hud;
  if (typeof url.time === 'number' && url.time >= 0) merged.timeFrozen = url.time;
  return merged;
}

export function createController() {
  const persisted = loadPersisted();
  const initial = persisted || {};
  const params = { ...defaultsFromDefs(), ...(initial.params || {}) };
  const capture = parseCaptureUrl(typeof window !== 'undefined' ? window.location.search : '');

  const initialQuality = QUALITY_PRESETS[initial.quality] ? initial.quality : 'high';

  const state = {
    version: STATE_VERSION,
    params,
    quality: initialQuality,
    preset: typeof initial.preset === 'number' ? initial.preset : 0,
    debugMode: typeof initial.debugMode === 'number' ? initial.debugMode : 0,
    hudVisible: typeof initial.hudVisible === 'boolean' ? initial.hudVisible : true,
    cinematicPlaying: capture?.capture ? false : (initial.cinematicPlaying !== false),
    audioEnabled: false, // disabled by default per task
    timeFrozen: null,    // null = live, number = frozen seconds
    capture: capture?.capture === true,
    ready: false,
    paused: false,
    contextLost: false
  };

  // Apply URL overrides (validated by parseCaptureUrl)
  const overridden = applyOverrides(state, capture);
  Object.assign(state, overridden);

  // Reset param values to preset defaults if a preset is selected via URL
  if (state.capture && typeof state.preset === 'number') {
    const p = CAMERA_PRESETS[state.preset];
    if (p) {
      state.params.fov = p.fov;
      state.params.camDistance = p.distance;
      state.params.camAzimuth = p.azimuth;
      state.params.camPitch = p.pitch;
    }
  }

  const listeners = new Set();
  let saveTimer = null;
  function notify() {
    listeners.forEach((fn) => {
      try { fn(state); } catch (e) { console.warn('listener error', e); }
    });
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      persist({
        version: STATE_VERSION,
        params: state.params,
        quality: state.quality,
        preset: state.preset,
        debugMode: state.debugMode,
        hudVisible: state.hudVisible,
        cinematicPlaying: state.cinematicPlaying
      });
    }, 250);
  }

  function setParam(id, value) {
    const def = PARAM_DEFS.find((d) => d[0] === id);
    if (!def) return false;
    const [, , min, max] = def;
    const clamped = Math.max(min, Math.min(max, Number(value)));
    if (!Number.isFinite(clamped)) return false;
    state.params[id] = clamped;
    notify();
    return true;
  }

  function setQuality(level) {
    if (!QUALITY_PRESETS[level]) return getState();
    state.quality = level;
    notify();
    return getState();
  }

  function cycleQuality() {
    const order = ['standard', 'high', 'cinematic'];
    const idx = order.indexOf(state.quality);
    state.quality = order[(idx + 1) % order.length];
    notify();
    return state.quality;
  }

  function setPreset(index) {
    if (typeof index !== 'number' || !CAMERA_PRESETS[index]) return getState();
    const p = CAMERA_PRESETS[index];
    state.preset = index;
    state.params.fov = p.fov;
    state.params.camDistance = p.distance;
    state.params.camAzimuth = p.azimuth;
    state.params.camPitch = p.pitch;
    notify();
    return getState();
  }

  function setDebug(index) {
    if (typeof index !== 'number' || !DEBUG_MODES[index]) return getState();
    state.debugMode = index;
    notify();
    return getState();
  }

  function setTime(seconds) {
    if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) {
      return getState();
    }
    state.timeFrozen = seconds;
    notify();
    return getState();
  }

  function toggleHud(force) {
    state.hudVisible = typeof force === 'boolean' ? force : !state.hudVisible;
    notify();
    return state.hudVisible;
  }

  function toggleCinematic() {
    state.cinematicPlaying = !state.cinematicPlaying;
    notify();
    return state.cinematicPlaying;
  }

  function toggleAudio() {
    // Audio is disabled by default; this is a no-op toggle that
    // tracks intent for HUD display only.
    state.audioEnabled = !state.audioEnabled;
    notify();
    return state.audioEnabled;
  }

  function resetAll() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    state.params = defaultsFromDefs();
    state.quality = 'high';
    state.preset = 0;
    state.debugMode = 0;
    state.hudVisible = true;
    state.cinematicPlaying = true;
    notify();
    return getState();
  }

  function markReady() {
    state.ready = true;
    notify();
  }

  function setPaused(v) {
    state.paused = !!v;
    notify();
  }

  function setContextLost(v) {
    state.contextLost = !!v;
    notify();
  }

  function getState() {
    // shallow clone; consumers should treat as read-only
    return {
      ...state,
      params: { ...state.params }
    };
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function applyPresetByName(pname) {
    const idx = CAMERA_PRESETS.findIndex((p) => p.id === pname);
    if (idx >= 0) setPreset(idx);
  }

  return {
    version: STATE_VERSION,
    getState,
    setParam,
    setQuality,
    cycleQuality,
    setPreset,
    setDebug,
    setTime,
    toggleHud,
    toggleCinematic,
    toggleAudio,
    resetAll,
    markReady,
    setPaused,
    setContextLost,
    subscribe,
    applyPresetByName
  };
}