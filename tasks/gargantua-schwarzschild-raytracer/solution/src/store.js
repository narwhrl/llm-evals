import {
  STATE_VERSION,
  STORAGE_KEY,
  QUALITY_LEVELS,
  DEFAULT_QUALITY,
  PARAM_DEFS,
  PARAM_MAP,
  PRESETS,
} from './config.js';
import { parseUrl } from './url.js';

export const DEFAULT_PRESET = 0;
export const DEFAULT_DEBUG = 0;
export const DEFAULT_TIME = 0;

function defaultHud() {
  const w = typeof globalThis.innerWidth === 'number' ? globalThis.innerWidth : 1200;
  return w > 768;
}

export function defaultState() {
  return {
    version: STATE_VERSION,
    params: Object.fromEntries(PARAM_DEFS.map((p) => [p.key, p.def])),
    quality: DEFAULT_QUALITY,
    preset: DEFAULT_PRESET,
    hudOpen: defaultHud(),
    debug: DEFAULT_DEBUG,
    cinematicPlaying: true,
    time: DEFAULT_TIME,
  };
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Any untrusted persisted value is clamped into its declared range. A version
// mismatch or malformed JSON resets cleanly to defaults rather than throwing.
export function sanitizeState(raw) {
  if (!raw || typeof raw !== 'object' || raw.version !== STATE_VERSION) return defaultState();
  const out = defaultState();
  const src = raw.params && typeof raw.params === 'object' ? raw.params : {};
  for (const p of PARAM_DEFS) {
    const v = src[p.key];
    out.params[p.key] = typeof v === 'number' && Number.isFinite(v) ? clamp(v, p.min, p.max) : p.def;
  }
  out.quality = QUALITY_LEVELS.includes(raw.quality) ? raw.quality : DEFAULT_QUALITY;
  out.preset = Number.isInteger(raw.preset) && raw.preset >= 0 && raw.preset < PRESETS.length ? raw.preset : null;
  out.hudOpen = typeof raw.hudOpen === 'boolean' ? raw.hudOpen : defaultHud();
  out.debug = Number.isInteger(raw.debug) && raw.debug >= 0 && raw.debug <= 9 ? raw.debug : DEFAULT_DEBUG;
  out.cinematicPlaying = typeof raw.cinematicPlaying === 'boolean' ? raw.cinematicPlaying : true;
  out.time = typeof raw.time === 'number' && Number.isFinite(raw.time) && raw.time >= 0 ? raw.time : DEFAULT_TIME;
  return out;
}

export function loadState() {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (raw == null) return { state: defaultState(), ok: true, reason: 'empty' };
    return { state: sanitizeState(JSON.parse(raw)), ok: true, reason: 'loaded' };
  } catch (error) {
    return { state: defaultState(), ok: false, reason: String(error?.message ?? error) };
  }
}

export function saveState(state) {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state));
    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: String(error?.message ?? error) };
  }
}

export function clearState() {
  try {
    globalThis.localStorage?.removeItem(STORAGE_KEY);
    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: String(error?.message ?? error) };
  }
}

export function applyPreset(state, index) {
  const preset = PRESETS[index];
  if (!preset) return false;
  state.params.fov = clamp(preset.fov, PARAM_MAP.fov.min, PARAM_MAP.fov.max);
  state.params.distance = clamp(preset.distance, PARAM_MAP.distance.min, PARAM_MAP.distance.max);
  state.params.azimuth = clamp(preset.azimuth, PARAM_MAP.azimuth.min, PARAM_MAP.azimuth.max);
  state.params.pitch = clamp(preset.pitch, PARAM_MAP.pitch.min, PARAM_MAP.pitch.max);
  state.preset = index;
  return true;
}

export function cloneState(state) {
  return {
    version: state.version,
    params: { ...state.params },
    quality: state.quality,
    preset: state.preset,
    hudOpen: state.hudOpen,
    debug: state.debug,
    cinematicPlaying: state.cinematicPlaying,
    time: state.time,
  };
}

// URL overrides are applied on top of persisted state. Invalid present values
// fall back to documented defaults; missing keys leave persisted state intact.
// Exported so the visible Reset control can restore the same contract.
export function applyUrlOverrides(state, runtime, url) {
  if (url.quality?.present) state.quality = url.quality.valid ? url.quality.value : DEFAULT_QUALITY;
  if (url.preset?.present) {
    const index = url.preset.valid ? url.preset.value : DEFAULT_PRESET;
    applyPreset(state, index);
  }
  if (url.debug?.present) state.debug = url.debug.valid ? url.debug.value : DEFAULT_DEBUG;
  if (url.hud?.present) state.hudOpen = url.hud.valid ? url.hud.value : defaultHud();
  if (url.time?.present) state.time = url.time.valid ? url.time.value : DEFAULT_TIME;
  if (url.capture) {
    runtime.frozenTime = state.time;
    state.cinematicPlaying = false;
  }
}

export function resolveInitialState(search) {
  const loaded = loadState();
  const state = loaded.state;
  const url = parseUrl(search);
  // capture=1 without ?time= must freeze at 0, not at a previously persisted
  // simulation clock from an earlier session.
  if (url.capture && !url.time?.present) state.time = DEFAULT_TIME;
  const runtime = {
    capture: url.capture,
    timeFrozen: url.capture,
    frozenTime: state.time,
    invalidKeys: [...url.invalid],
    storageOk: loaded.ok,
    storageReason: loaded.reason,
    audioEnabled: false,
    cinematicDisabled: url.capture,
    url,
  };

  applyUrlOverrides(state, runtime, url);

  // A mobile first paint should stay light unless the caller explicitly
  // pinned a quality tier in the URL.
  if (!url.quality?.present && loaded.reason === 'empty' && defaultHud() === false) {
    state.quality = 'standard';
  }

  return { state, runtime, url };
}
