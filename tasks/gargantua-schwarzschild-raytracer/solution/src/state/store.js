import {
  CAMERA_KEYS,
  DEFAULTS,
  PARAMS,
  PRESETS,
  QUALITY_PROFILES,
  STORAGE_KEY,
  STATE_VERSION,
  applyPresetToParams,
  clampParam,
  defaultState,
} from './schema.js';
import { applyUrlState } from './urlParams.js';

let storageWarned = false;

function safeStorageGet() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function safeStorageSet(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    if (!storageWarned) {
      storageWarned = true;
      console.warn('GARGANTUA: localStorage unavailable; settings will not persist.');
    }
  }
}

function safeStorageRemove() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage may be disabled */
  }
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeParams(candidate, fallback) {
  const params = { ...fallback };
  if (!isObject(candidate)) return params;
  for (const key of Object.keys(PARAMS)) {
    if (Object.prototype.hasOwnProperty.call(candidate, key)) {
      params[key] = clampParam(key, candidate[key]);
    }
  }
  if (params.diskOuter < params.diskInner + 0.5) {
    params.diskOuter = Math.min(PARAMS.diskOuter.max, params.diskInner + 0.5);
  }
  return params;
}

function hydratePersisted() {
  const base = defaultState();
  if (typeof window !== 'undefined' && window.matchMedia?.('(max-width: 760px)').matches) {
    base.hudOpen = false;
  }
  const raw = safeStorageGet();
  if (!raw) return base;
  try {
    const saved = JSON.parse(raw);
    if (!isObject(saved) || saved.version !== STATE_VERSION) return base;
    const state = {
      ...base,
      params: normalizeParams(saved.params, base.params),
      quality: QUALITY_PROFILES[saved.quality] ? saved.quality : base.quality,
      preset: Number.isInteger(saved.preset) && saved.preset >= -1 && saved.preset < PRESETS.length
        ? saved.preset : base.preset,
      debug: Number.isInteger(saved.debug) && saved.debug >= 0 && saved.debug <= 9
        ? saved.debug : base.debug,
      hudOpen: typeof saved.hudOpen === 'boolean' ? saved.hudOpen : base.hudOpen,
      playing: typeof saved.playing === 'boolean' ? saved.playing : base.playing,
    };
    return state;
  } catch {
    return base;
  }
}

export function createStore() {
  const initial = applyUrlState(hydratePersisted(), window.location.search);
  let state = { ...initial, fps: 0 };
  const listeners = new Set();

  function emit(meta = {}) {
    for (const listener of listeners) listener(state, meta);
  }

  function persist() {
    const snapshot = {
      version: STATE_VERSION,
      params: state.params,
      quality: state.quality,
      preset: state.preset,
      debug: state.debug,
      hudOpen: state.hudOpen,
      playing: state.playing,
    };
    safeStorageSet(JSON.stringify(snapshot));
  }

  function setState(patch, meta) {
    state = { ...state, ...patch };
    emit(meta);
    if (meta?.persist !== false && meta?.source !== 'telemetry') persist();
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getState() {
    return state;
  }

  function setParam(key, value, meta = { source: 'user' }) {
    if (!PARAMS[key]) return state;
    const params = { ...state.params };
    params[key] = clampParam(key, value);

    if (key === 'diskInner' && params.diskOuter < params.diskInner + 0.5) {
      params.diskOuter = Math.min(PARAMS.diskOuter.max, params.diskInner + 0.5);
    }
    if (key === 'diskOuter' && params.diskOuter < params.diskInner + 0.5) {
      params.diskOuter = params.diskInner + 0.5;
    }
    if (key === 'diskOuter' && params.diskOuter > PARAMS.diskOuter.max) {
      params.diskOuter = PARAMS.diskOuter.max;
      params.diskInner = Math.min(params.diskInner, params.diskOuter - 0.5);
    }

    const patch = { params };
    const isCamera = CAMERA_KEYS.includes(key);
    if (isCamera && meta.source !== 'telemetry') {
      patch.playing = false;
      patch.preset = -1;
    }

    setState(patch, { ...meta, changed: key });
    return state;
  }

  function setCameraFromUser(camera, meta = { source: 'user' }) {
    const params = { ...state.params };
    for (const key of CAMERA_KEYS) {
      if (camera && Number.isFinite(camera[key])) params[key] = clampParam(key, camera[key]);
    }
    setState({ params, preset: -1, playing: false }, { ...meta, changed: 'camera' });
    return state;
  }

  function setQuality(level, meta = { source: 'user' }) {
    if (!QUALITY_PROFILES[level]) return false;
    setState({ quality: level }, { ...meta, changed: 'quality' });
    return true;
  }

  function setPreset(index, meta = { source: 'user' }) {
    if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return false;
    setState({
      preset: index,
      playing: false,
      params: applyPresetToParams(state.params, index),
    }, { ...meta, changed: 'preset' });
    return true;
  }

  function setDebug(index, meta = { source: 'user' }) {
    if (!Number.isInteger(index) || index < 0 || index > 9) return false;
    setState({ debug: index }, { ...meta, changed: 'debug' });
    return true;
  }

  function setHudOpen(open, meta = { source: 'user' }) {
    setState({ hudOpen: Boolean(open) }, { ...meta, changed: 'hud' });
  }

  function setPlaying(playing, meta = { source: 'user' }) {
    setState({ playing: Boolean(playing) }, { ...meta, changed: 'playing' });
  }

  function setTime(seconds, meta = { source: 'api' }) {
    const value = Number(seconds);
    if (!Number.isFinite(value) || value < 0) return false;
    setState({ time: Math.min(value, 1_000_000) }, { ...meta, changed: 'time', persist: false });
    return true;
  }

  function setTelemetry(sample) {
    if (!sample) return;
    const params = { ...state.params };
    const camera = sample.camera;
    if (camera) {
      if (Number.isFinite(camera.fov)) params.fov = clampParam('fov', camera.fov);
      if (Number.isFinite(camera.distance)) params.distance = clampParam('distance', camera.distance);
      if (Number.isFinite(camera.azimuth)) params.azimuth = clampParam('azimuth', camera.azimuth);
      if (Number.isFinite(camera.elevation)) params.elevation = clampParam('elevation', camera.elevation);
    }
    const time = Number.isFinite(sample.time) ? sample.time : state.time;
    const fps = Number.isFinite(sample.fps) ? sample.fps : state.fps;
    state = { ...state, params, time, fps };
    emit({ source: 'telemetry' });
  }

  function reset(meta = { source: 'reset' }) {
    safeStorageRemove();
    state = { ...defaultState(), fps: state.fps };
    emit(meta);
    persist();
    return state;
  }

  return {
    getState,
    subscribe,
    setParam,
    setCameraFromUser,
    setQuality,
    setPreset,
    setDebug,
    setHudOpen,
    setPlaying,
    setTime,
    setTelemetry,
    reset,
  };
}
