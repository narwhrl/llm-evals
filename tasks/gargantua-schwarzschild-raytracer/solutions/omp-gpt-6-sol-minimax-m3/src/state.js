// Reactive store backing the raytracer.
//
// Module 3 (phase 3) introduces:
//   * Versioned localStorage persistence at key `gargantua:v1`.
//   * URL query parsing for capture / quality / preset / debug / hud /
//     time, applied before the first render frame so that screenshot
//     URLs deterministically reflect the requested state.
//   * Mutable camera ownership: the renderer owns the live camera while
//     the user is dragging; the store records the camera between drag
//     sessions and applies preset / slider changes through the same
//     method so OrbitControls and the shader uniforms stay coherent.
//   * Stable configuration snapshots so React's useSyncExternalStore
//     does not re-render every animation frame.
//
// The 21 parameters, 3 quality budgets and 4 presets remain unchanged
// from module 1; module 3 only adds the persistence layer on top.

export const DEFAULT_PARAMETERS = Object.freeze({
  // camera / time
  fov: 46,                  // degrees
  cameraDistance: 22,       // in r_s
  azimuth: 32,              // degrees
  elevation: 24,            // degrees
  timeScale: 1,             // 0..3

  // disk
  diskInner: 3,             // r_s units
  diskOuter: 11,
  diskHalfThickness: 0.16,
  diskTemperature: 1,
  diskEmission: 1.2,
  orbitalSpeed: 1,
  turbulenceAmplitude: 0.35,
  turbulenceSpeed: 0.7,

  // stars / galaxy
  starDensity: 1,
  galaxyBrightness: 0.7,

  // post (wiring only; full passes arrive in module 2)
  bloomIntensity: 0.65,
  bloomThreshold: 1.2,
  exposure: 1.0,
  vignette: 0.18,
  grain: 0.025,
  chromaticAberration: 0.4,
});

export const QUALITY_BUDGETS = Object.freeze({
  standard:  Object.freeze({ scale: 0.55, maxSteps: 96,  maxCrossings: 2, bloomTaps: 5 }),
  high:      Object.freeze({ scale: 0.72, maxSteps: 176, maxCrossings: 3, bloomTaps: 9 }),
  cinematic: Object.freeze({ scale: 1.0,  maxSteps: 288, maxCrossings: 4, bloomTaps: 13 }),
});

// Diagnostic labels for HUD consumption.
export const DEBUG_LABELS = Object.freeze([
  'final composite',                       // 0
  'steps / termination heatmap',           // 1
  'horizon / capture mask',                // 2
  'first disk crossing radius',            // 3
  'higher-order disk crossings',           // 4
  'redshift / Doppler factor',             // 5
  'escape direction (lensed sky)',         // 6
  'procedural sky / galaxy alone',         // 7
  'pre-post log HDR (disk + sky)',         // 8
  'bloom threshold bright pass',           // 9
]);

const PRESET_NAMES = Object.freeze([
  'classic observer',
  'equatorial skim',
  'polar overview',
  'far-field lensing',
]);

export const PRESETS = Object.freeze([
  Object.freeze({ name: PRESET_NAMES[0], cameraDistance: 22, azimuth: 32,   elevation: 24,  fov: 46 }),
  Object.freeze({ name: PRESET_NAMES[1], cameraDistance: 16, azimuth: 105,  elevation: 8,   fov: 50 }),
  Object.freeze({ name: PRESET_NAMES[2], cameraDistance: 26, azimuth: -35,  elevation: 58,  fov: 43 }),
  Object.freeze({ name: PRESET_NAMES[3], cameraDistance: 34, azimuth: -120, elevation: -20, fov: 37 }),
]);

const QUALITY_LEVELS = Object.freeze(['standard', 'high', 'cinematic']);

const PARAMETER_META = Object.freeze({
  fov:                  { min: 30,    max: 75,    step: 1,    label: 'FOV (degrees)' },
  cameraDistance:       { min: 12,    max: 45,    step: 0.5,  label: 'camera distance (r_s)' },
  azimuth:              { min: -180,  max: 180,   step: 1,    label: 'azimuth (degrees)' },
  elevation:            { min: -70,   max: 70,    step: 1,    label: 'elevation (degrees)' },
  timeScale:            { min: 0,     max: 3,     step: 0.05, label: 'time scale' },
  diskInner:            { min: 2.7,   max: 6,     step: 0.1,  label: 'disk inner radius' },
  diskOuter:            { min: 7,     max: 18,    step: 0.2,  label: 'disk outer radius' },
  diskHalfThickness:    { min: 0.03,  max: 0.7,   step: 0.01, label: 'disk half thickness' },
  diskTemperature:      { min: 0.5,   max: 2,     step: 0.05, label: 'disk temperature' },
  diskEmission:         { min: 0.25,  max: 3,     step: 0.05, label: 'disk emission' },
  orbitalSpeed:         { min: 0.5,   max: 1.4,   step: 0.02, label: 'orbital speed' },
  turbulenceAmplitude:  { min: 0,     max: 1,     step: 0.02, label: 'turbulence amplitude' },
  turbulenceSpeed:      { min: 0,     max: 2,     step: 0.05, label: 'turbulence speed' },
  starDensity:          { min: 0.1,   max: 3,     step: 0.05, label: 'star density' },
  galaxyBrightness:     { min: 0,     max: 2,     step: 0.05, label: 'galaxy brightness' },
  bloomIntensity:       { min: 0,     max: 2,     step: 0.05, label: 'bloom intensity' },
  bloomThreshold:       { min: 0.5,   max: 4,     step: 0.05, label: 'bloom threshold' },
  exposure:             { min: 0.4,   max: 2,     step: 0.05, label: 'exposure' },
  vignette:             { min: 0,     max: 0.6,   step: 0.01, label: 'vignette' },
  grain:                { min: 0,     max: 0.12,  step: 0.005, label: 'film grain' },
  chromaticAberration:  { min: 0,     max: 2,     step: 0.05, label: 'chromatic aberration' },
});

export function getParameterMeta() {
  return PARAMETER_META;
}

export function getPresetNames() {
  return PRESET_NAMES;
}

// ---- value coercion ----------------------------------------------------

function clampRange(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function wrapDegrees(v) {
  return ((v + 540) % 360) - 180;
}

function clampParameters(params) {
  const out = { ...DEFAULT_PARAMETERS, ...(params || {}) };
  out.fov                 = clampRange(out.fov, 30, 75);
  out.cameraDistance      = clampRange(out.cameraDistance, 12, 45);
  out.azimuth             = wrapDegrees(out.azimuth);
  out.elevation           = clampRange(out.elevation, -70, 70);
  out.timeScale           = clampRange(out.timeScale, 0, 3);
  out.diskInner           = clampRange(out.diskInner, 2.7, 6);
  out.diskOuter           = clampRange(out.diskOuter, 7, 18);
  out.diskHalfThickness   = clampRange(out.diskHalfThickness, 0.03, 0.7);
  out.diskTemperature     = clampRange(out.diskTemperature, 0.5, 2);
  out.diskEmission        = clampRange(out.diskEmission, 0.25, 3);
  out.orbitalSpeed        = clampRange(out.orbitalSpeed, 0.5, 1.4);
  out.turbulenceAmplitude = clampRange(out.turbulenceAmplitude, 0, 1);
  out.turbulenceSpeed     = clampRange(out.turbulenceSpeed, 0, 2);
  out.starDensity         = clampRange(out.starDensity, 0.1, 3);
  out.galaxyBrightness    = clampRange(out.galaxyBrightness, 0, 2);
  out.bloomIntensity      = clampRange(out.bloomIntensity, 0, 2);
  out.bloomThreshold      = clampRange(out.bloomThreshold, 0.5, 4);
  out.exposure            = clampRange(out.exposure, 0.4, 2);
  out.vignette            = clampRange(out.vignette, 0, 0.6);
  out.grain               = clampRange(out.grain, 0, 0.12);
  out.chromaticAberration = clampRange(out.chromaticAberration, 0, 2);
  if (out.diskInner + 0.5 > out.diskOuter) {
    out.diskOuter = Math.min(18, out.diskInner + 1.0);
  }
  return out;
}

function coerceFiniteNumber(v) {
  if (typeof v !== 'number') return null;
  if (!Number.isFinite(v)) return null;
  return v;
}

function isMobilePointer() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try { return window.matchMedia('(pointer: coarse)').matches; } catch (_) { return false; }
}

function safeLocalStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const probe = '__gargantua_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch (_) {
    return null;
  }
}

const STORAGE_KEY = 'gargantua:v1';

function readPersisted(storage) {
  if (!storage) return null;
  let raw;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch (_) {
    return null;
  }
  if (!raw) return null;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (_) {
    return null;
  }
  if (!parsed || typeof parsed !== 'object') return null;
  if (parsed.version !== 1) return null;
  const out = {};
  // Validate every parameter individually: only accept finite numbers
  // for known keys.  Strings, NaN, Infinity, objects, or unknown keys
  // are dropped so a malformed localStorage cannot leak through
  // clampRange and produce NaN uniforms (which would render black).
  if (parsed.parameters && typeof parsed.parameters === 'object') {
    const safeParams = {};
    for (const [name, meta] of Object.entries(PARAMETER_META)) {
      const raw = parsed.parameters[name];
      if (typeof raw === 'number' && Number.isFinite(raw)) {
        safeParams[name] = raw;
      }
    }
    if (Object.keys(safeParams).length > 0) {
      out.parameters = clampParameters(safeParams);
    }
  }
  if (typeof parsed.quality === 'string' && Object.prototype.hasOwnProperty.call(QUALITY_BUDGETS, parsed.quality)) {
    out.quality = parsed.quality;
  }
  if (Number.isInteger(parsed.preset) && parsed.preset >= 0 && parsed.preset < PRESETS.length) {
    out.preset = parsed.preset;
  } else if (parsed.preset === null) {
    out.preset = null;
  }
  if (Number.isInteger(parsed.debug) && parsed.debug >= 0 && parsed.debug <= 9) {
    out.debug = parsed.debug;
  }
  if (typeof parsed.hud === 'boolean') {
    out.hud = parsed.hud;
  }
  if (typeof parsed.playing === 'boolean') {
    out.playing = parsed.playing;
  }
  return out;
}

function writePersisted(storage, snapshot) {
  if (!storage) return;
  const payload = JSON.stringify({
    version: 1,
    parameters: snapshot.parameters,
    quality: snapshot.quality,
    preset: snapshot.preset,
    debug: snapshot.debug,
    hud: snapshot.hud,
    playing: snapshot.playing,
  });
  try {
    storage.setItem(STORAGE_KEY, payload);
  } catch (_) { /* quota / private mode → ignore */ }
}

function clearPersisted(storage) {
  if (!storage) return;
  try { storage.removeItem(STORAGE_KEY); } catch (_) { /* ignore */ }
}

// URL parsing -------------------------------------------------------------

function parseSearch(search) {
  if (!search) return {};
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const out = {};
  for (const key of ['capture', 'quality', 'preset', 'debug', 'hud', 'time']) {
    const raw = params.get(key);
    if (raw == null) continue;
    out[key] = raw;
  }
  return out;
}

function coerceUrlQuality(raw) {
  if (typeof raw !== 'string') return null;
  if (Object.prototype.hasOwnProperty.call(QUALITY_BUDGETS, raw)) return raw;
  return null;
}

// Strict integer URL coercion: only accept exact integer strings.
// Reject fractional values (1.9 → null), empty string (Number("")===0
// but "" is not an integer), whitespace, and anything Number can't
// round-trip to the exact same value.
const INTEGER_RE = /^-?\d+$/;

function coerceUrlInteger(raw) {
  if (typeof raw !== 'string') return null;
  if (!INTEGER_RE.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  return n;
}

function coerceUrlPreset(raw) {
  const i = coerceUrlInteger(raw);
  if (i == null) return null;
  if (i < 0 || i >= PRESETS.length) return null;
  return i;
}

function coerceUrlDebug(raw) {
  const i = coerceUrlInteger(raw);
  if (i == null) return null;
  if (i < 0 || i > 9) return null;
  return i;
}

function coerceUrlHud(raw) {
  if (raw === '0') return false;
  if (raw === '1') return true;
  return null;
}

function coerceUrlTime(raw) {
  // Time accepts any finite non-negative *number*, including
  // fractional seconds like `12.5` (the canonical capture URL).
  // We do NOT reuse coerceUrlInteger here because that helper
  // rejects fractions.  Empty strings, whitespace, NaN, Infinity,
  // and non-string inputs are still rejected.
  if (typeof raw !== 'string') return null;
  if (raw.length === 0 || !/^\d+(\.\d+)?$/.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  if (n < 0) return null;
  return n;
}

function coerceUrlCapture(raw) {
  if (raw === '1') return true;
  if (raw === '0') return false;
  return null;
}

function applyUrlOverrides(base, url) {
  // Precedence: defaults → valid persisted values → valid URL values.
  // Invalid URL values fall back to their *default*, not the persisted
  // value, so a single bad query string can't poison the user config.
  const next = { ...base };
  if ('capture' in url) {
    const c = coerceUrlCapture(url.capture);
    if (c !== null) next.capture = c;
    else next.capture = false;
  }
  if ('quality' in url) {
    const q = coerceUrlQuality(url.quality);
    if (q !== null) next.quality = q;
    else next.quality = isMobilePointer() ? 'standard' : 'high';
  }
  if ('preset' in url) {
    const p = coerceUrlPreset(url.preset);
    if (p !== null) {
      next.preset = p;
      next.parameters = clampParameters({
        ...next.parameters,
        cameraDistance: PRESETS[p].cameraDistance,
        azimuth: PRESETS[p].azimuth,
        elevation: PRESETS[p].elevation,
        fov: PRESETS[p].fov,
      });
    } else {
      // Invalid preset URL: fall back to the default preset AND its
      // default camera parameters, not whatever the user had
      // persisted.  This matches the spec that invalid URL fields
      // must not poison the user's stored configuration.
      const d = PRESETS[0];
      next.preset = 0;
      next.parameters = clampParameters({
        ...next.parameters,
        cameraDistance: d.cameraDistance,
        azimuth: d.azimuth,
        elevation: d.elevation,
        fov: d.fov,
      });
    }
  }
  if ('debug' in url) {
    const d = coerceUrlDebug(url.debug);
    if (d !== null) next.debug = d;
    else next.debug = 0;
  }
  if ('hud' in url) {
    const h = coerceUrlHud(url.hud);
    if (h !== null) next.hud = h;
    else next.hud = true;
  }
  if ('time' in url) {
    const t = coerceUrlTime(url.time);
    if (t !== null) next.time = t;
    // invalid time → leave time at default 0
  }
  return next;
}

// Factory -----------------------------------------------------------------

export function createStore(search) {
  const storage = safeLocalStorage();
  const persisted = readPersisted(storage) || {};
  const defaults = {
    parameters: { ...DEFAULT_PARAMETERS },
    quality: isMobilePointer() ? 'standard' : 'high',
    preset: 0,
    debug: 0,
    hud: true,
    playing: true,
    capture: false,
    time: 0,
  };
  // Compose base from defaults + valid persisted overrides.
  const base = { ...defaults };
  if (persisted.parameters) base.parameters = persisted.parameters;
  if (persisted.quality)   base.quality   = persisted.quality;
  if (persisted.preset !== undefined) base.preset = persisted.preset;
  if (persisted.debug !== undefined) base.debug = persisted.debug;
  if (persisted.hud !== undefined) base.hud = persisted.hud;
  if (persisted.playing !== undefined) base.playing = persisted.playing;
  // URL last so URL overrides win; capture=false leaves defaults intact.
  const parsedUrl = parseSearch(search || (typeof window !== 'undefined' ? window.location.search : ''));
  const initial = applyUrlOverrides(base, parsedUrl);
  if (initial.capture) {
    initial.playing = false;
    if (!('time' in parsedUrl) || coerceUrlTime(parsedUrl.time) == null) {
      initial.time = 0;
    }
  }
  // Reset is allowed: clears persisted overrides (storage) but does not
  // touch URL on this page-load.
  function reset() {
    internalState.parameters = { ...DEFAULT_PARAMETERS };
    internalState.quality = isMobilePointer() ? 'standard' : 'high';
    internalState.preset = 0;
    internalState.debug = 0;
    internalState.hud = true;
    // Reset respects capture mode: when a screenshot session is active
    // we must NOT flip playing back to true (the frozen UI contradicts
    // a moving movie loop).  Also don't zero time — capture has its own
    // time value that's been pinned by URL or programmatic setTime.
    if (!internalState.capture) {
      internalState.playing = true;
      internalState.time = 0;
    }
    // Drop stored overrides first, then notify.  Suppress persistence
    // across the notify so the freshly-cleared storage isn't
    // immediately repopulated with the same defaults.
    clearPersisted(storage);
    suppressPersist = true;
    try {
      notify();
    } finally {
      suppressPersist = false;
    }
  }

  // During URL init / programmatic applySearchOverrides we don't want
  // the captured config to overwrite the user's stored values.  This
  // flag is flipped around the relevant notify() calls so that all
  // other notify() sites still persist normally.
  let suppressPersist = false;

  function snapshotConfig(state) {
    return Object.freeze({
      parameters: Object.freeze({ ...state.parameters }),
      quality: state.quality,
      preset: state.preset,
      debug: state.debug,
      hud: state.hud,
      playing: state.playing,
    });
  }

  const internalState = {
    parameters: initial.parameters,
    quality: initial.quality,
    preset: initial.preset,
    debug: initial.debug,
    hud: initial.hud,
    playing: initial.playing,
    time: initial.time,
    status: { kind: 'booting', message: '' },
    capture: initial.capture,
  };

  let configSnapshot = Object.freeze(snapshotConfig(internalState));
  const listeners = new Set();

  function snapshotFull(state) {
    return Object.freeze({
      ...configSnapshot,
      time: state.time,
      capture: state.capture,
      status: state.status,
    });
  }

  function invalidateConfig() {
    configSnapshot = snapshotConfig(internalState);
  }

  function persistNow() {
    if (storage) writePersisted(storage, configSnapshot);
  }

  function notify() {
    invalidateConfig();
    if (!suppressPersist) persistNow();
    const snap = snapshotFull(internalState);
    for (const listener of listeners) {
      try { listener(snap); } catch (_) { /* isolate */ }
    }
  }

  function setParameter(name, value) {
    if (!Object.prototype.hasOwnProperty.call(DEFAULT_PARAMETERS, name)) return;
    const n = coerceFiniteNumber(value);
    if (n == null) return;
    const next = clampParameters({ ...internalState.parameters, [name]: n });
    internalState.parameters = { ...internalState.parameters, ...next };
    if (
      name === 'fov' ||
      name === 'cameraDistance' ||
      name === 'azimuth' ||
      name === 'elevation'
    ) {
      internalState.preset = null;
    }
    notify();
  }

  function setCameraFromControls({ fov, cameraDistance, azimuth, elevation }) {
    const f = coerceFiniteNumber(fov);
    const d = coerceFiniteNumber(cameraDistance);
    const a = coerceFiniteNumber(azimuth);
    const e = coerceFiniteNumber(elevation);
    if (f == null || d == null || a == null || e == null) return;
    const next = clampParameters({
      ...internalState.parameters,
      fov: f,
      cameraDistance: d,
      azimuth: a,
      elevation: e,
    });
    internalState.parameters = { ...internalState.parameters, ...next };
    internalState.preset = null;
    notify();
  }

  function setQuality(level) {
    if (!Object.prototype.hasOwnProperty.call(QUALITY_BUDGETS, level)) return null;
    if (internalState.quality !== level) {
      internalState.quality = level;
      notify();
    }
    return snapshotFull(internalState);
  }

  function setPreset(index) {
    if (index === null) {
      if (internalState.preset !== null) {
        internalState.preset = null;
        notify();
      }
      return snapshotFull(internalState);
    }
    if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return null;
    const p = PRESETS[index];
    internalState.parameters = clampParameters({
      ...internalState.parameters,
      cameraDistance: p.cameraDistance,
      azimuth: p.azimuth,
      elevation: p.elevation,
      fov: p.fov,
    });
    internalState.preset = index;
    notify();
    return snapshotFull(internalState);
  }

  function setDebug(d) {
    const n = coerceFiniteNumber(d);
    if (n == null) return null;
    const i = Math.trunc(n);
    if (!Number.isInteger(i) || i < 0 || i > 9) return null;
    if (internalState.debug !== i) {
      internalState.debug = i;
      notify();
    }
    return snapshotFull(internalState);
  }

  function setHud(visible) {
    const v = !!visible;
    if (internalState.hud !== v) {
      internalState.hud = v;
      notify();
    }
    return snapshotFull(internalState);
  }

  function setPlaying(playing) {
    const v = !!playing;
    if (internalState.playing !== v) {
      internalState.playing = v;
      notify();
    }
    return snapshotFull(internalState);
  }

  function setTime(seconds) {
    const n = coerceFiniteNumber(seconds);
    if (n == null) return null;
    if (n < 0) return null;
    if (internalState.time !== n) {
      internalState.time = n;
      notify();
    }
    return snapshotFull(internalState);
  }

  // Advance the simulation clock without invalidating the configuration
  // snapshot (which would force the renderer's subscribe handler to
  // re-evaluate camera alignment every second) or writing to
  // localStorage.  Listeners still get notified at ~1Hz so the HUD
  // updates its `t` readout.
  let timeSinceLastNotify = 0;
  function advanceTime(delta) {
    const n = coerceFiniteNumber(delta);
    if (n == null) return;
    if (n <= 0) return;
    internalState.time += n;
    timeSinceLastNotify += n;
    if (timeSinceLastNotify >= 1.0) {
      timeSinceLastNotify = 0;
      // Do NOT invalidate configSnapshot — the configuration didn't
      // change, only the simulation clock did.  Subscribers receive a
      // fresh snapshot but with the same config reference so
      // useSyncExternalStore-equivalent logic in the renderer can
      // skip work.
      const snap = snapshotFull(internalState);
      for (const listener of listeners) {
        try { listener(snap); } catch (_) { /* isolate */ }
      }
    }
  }

  function setStatus(status) {
    internalState.status = status;
    const snap = snapshotFull(internalState);
    for (const listener of listeners) {
      try { listener(snap); } catch (_) { /* isolate */ }
    }
  }

  function setCaptureMode(active) {
    internalState.capture = !!active;
    if (active) {
      internalState.playing = false;
    }
    notify();
  }

  function getState() {
    return snapshotFull(internalState);
  }

  function getConfigSnapshot() {
    return configSnapshot;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getQualityBudget() {
    return QUALITY_BUDGETS[internalState.quality] || QUALITY_BUDGETS.standard;
  }

  function getPresetConstants() {
    return PRESETS;
  }

  // For tests / API: programmatic URL simulation (no string re-write).
  function applySearchOverrides(nextSearch) {
    const parsed = parseSearch(nextSearch || '');
    const overrides = applyUrlOverrides(
      {
        parameters: internalState.parameters,
        quality: internalState.quality,
        preset: internalState.preset,
        debug: internalState.debug,
        hud: internalState.hud,
        playing: internalState.playing,
        capture: internalState.capture,
      },
      parsed,
    );
    suppressPersist = true;
    try {
      internalState.parameters = overrides.parameters;
      internalState.quality = overrides.quality;
      internalState.preset = overrides.preset;
      internalState.debug = overrides.debug;
      internalState.hud = overrides.hud;
      internalState.playing = overrides.playing;
      internalState.capture = overrides.capture;
      if (overrides.time != null) internalState.time = overrides.time;
      notify();
    } finally {
      suppressPersist = false;
    }
  }

  // Initial config snapshot write to storage so a brand-new visit gets
  // its defaults captured the first time any state mutation occurs.
  invalidateConfig();

  return {
    getState,
    getConfigSnapshot,
    subscribe,
    setParameter,
    setCameraFromControls,
    setQuality,
    setPreset,
    setDebug,
    setHud,
    setPlaying,
    setTime,
    advanceTime,
    reset,
    setStatus,
    setCaptureMode,
    getQualityBudget,
    getPresetConstants,
    applySearchOverrides,
  };
}