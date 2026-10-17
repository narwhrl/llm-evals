// Versioned state container: single source of truth for every configurable
// value — parameters, quality, preset, HUD/debug visibility, cinematic loop.
// Persists to localStorage under a versioned key and merges with defaults.

import {
  DEFAULTS,
  PARAMS,
  QUALITY_ORDER,
  STORAGE_KEY,
  STORAGE_VERSION,
} from './config.js';

const PARAM_MAP = new Map(PARAMS.map((p) => [p.key, p]));

function clampToParam(key, value) {
  const p = PARAM_MAP.get(key);
  if (!p) return undefined;
  const v = Number(value);
  if (!Number.isFinite(v)) return undefined;
  return Math.min(p.max, Math.max(p.min, v));
}

export class State {
  constructor() {
    this.values = { ...DEFAULTS };
    this.quality = 'high';
    this.preset = 0;
    this.debug = 0;
    this.hud = 1;
    this.cinematic = true;   // cinematic camera loop playing
    this.simTime = 0;        // accumulated simulation seconds
    this.listeners = new Set();
  }

  // ---- persistence ----
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || data.version !== STORAGE_VERSION) return;
      for (const [k, v] of Object.entries(data.params ?? {})) {
        const c = clampToParam(k, v);
        if (c !== undefined) this.values[k] = c;
      }
      if (QUALITY_ORDER.includes(data.quality)) this.quality = data.quality;
      if (Number.isInteger(data.preset) && data.preset >= 0 && data.preset <= 3) this.preset = data.preset;
      if (Number.isInteger(data.debug) && data.debug >= 0 && data.debug <= 9) this.debug = data.debug;
      this.hud = data.hud === 0 ? 0 : 1;
      this.cinematic = data.cinematic !== false;
    } catch {
      /* corrupted storage -> keep defaults */
    }
  }

  save() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: STORAGE_VERSION,
          params: this.values,
          quality: this.quality,
          preset: this.preset,
          debug: this.debug,
          hud: this.hud,
          cinematic: this.cinematic,
        }),
      );
    } catch {
      /* storage unavailable (private mode etc.) — non-fatal */
    }
  }

  reset() {
    this.values = { ...DEFAULTS };
    this.quality = 'high';
    this.preset = 0;
    this.debug = 0;
    this.cinematic = true;
    this.emit('reset');
    this.save();
  }

  // ---- mutation ----
  set(key, value) {
    const c = clampToParam(key, value);
    if (c === undefined) return this.values[key];
    this.values[key] = c;
    this.emit('param', key);
    this.save();
    return c;
  }

  setQuality(level) {
    if (!QUALITY_ORDER.includes(level)) return this.quality;
    this.quality = level;
    this.emit('quality');
    this.save();
    return this.quality;
  }

  setPreset(index) {
    const i = Number(index);
    if (!Number.isInteger(i) || i < 0 || i > 3) return this.preset;
    this.preset = i;
    this.emit('preset');
    this.save();
    return this.preset;
  }

  setDebug(index) {
    const i = Number(index);
    if (!Number.isInteger(i) || i < 0 || i > 9) return this.debug;
    this.debug = i;
    this.emit('debug');
    this.save();
    return this.debug;
  }

  setHud(visible) {
    this.hud = visible ? 1 : 0;
    this.emit('hud');
    this.save();
    return this.hud;
  }

  setCinematic(on) {
    this.cinematic = !!on;
    this.emit('cinematic');
    this.save();
    return this.cinematic;
  }

  on(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit(kind, arg) {
    for (const fn of this.listeners) fn(kind, arg, this);
  }

  snapshot() {
    return {
      params: { ...this.values },
      quality: this.quality,
      preset: this.preset,
      debug: this.debug,
      hud: this.hud,
      cinematic: this.cinematic,
      simTime: this.simTime,
    };
  }
}

// ---- URL capture contract ------------------------------------------------
// ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
export function applyUrlParams(state, search) {
  const q = new URLSearchParams(search);
  const capture = q.get('capture') === '1';

  if (capture) {
    // deterministic still: no cinematic drift, no optional audio, frozen time.
    // capture mode always overrides persisted state for reproducibility.
    state.cinematic = false;
  }
  if (q.has('quality')) {
    const v = q.get('quality');
    if (QUALITY_ORDER.includes(v)) state.quality = v;
  }
  if (q.has('preset')) {
    const v = Number(q.get('preset'));
    if (Number.isInteger(v) && v >= 0 && v <= 3) state.preset = v;
  }
  if (q.has('debug')) {
    const v = Number(q.get('debug'));
    if (Number.isInteger(v) && v >= 0 && v <= 9) state.debug = v;
  }
  if (q.has('hud')) {
    state.hud = q.get('hud') === '1' ? 1 : 0;
  }
  if (q.has('time')) {
    const t = Number(q.get('time'));
    state.simTime = Number.isFinite(t) && t >= 0 ? t : 0;
  } else if (capture) {
    state.simTime = 0;
  }
  return { capture };
}
