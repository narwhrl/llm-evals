import {
  DEFAULT_PARAMS,
  PARAM_DEFS,
  QUALITY_ORDER,
  QUALITY_TIERS,
  SCHEMA_VERSION,
  STORAGE_KEY,
} from './state.js';

const PARAM_DEFS_BY_KEY = new Map(PARAM_DEFS.map((d) => [d.key, d]));

function clampParam(def, value) {
  return Math.min(def.max, Math.max(def.min, value));
}

/** Load and validate persisted state; any defect falls back to defaults. */
function loadPersisted() {
  const fallback = {
    params: { ...DEFAULT_PARAMS },
    quality: 'high',
    presetIndex: 0,
    debugView: 0,
    hudCollapsed: false,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const data = JSON.parse(raw);
    if (!data || data.v !== SCHEMA_VERSION) return fallback;
    const params = { ...DEFAULT_PARAMS };
    for (const def of PARAM_DEFS) {
      const v = data.params?.[def.key];
      if (typeof v === 'number' && Number.isFinite(v)) {
        params[def.key] = clampParam(def, v);
      }
    }
    return {
      params,
      quality: data.quality in QUALITY_TIERS ? data.quality : 'high',
      presetIndex:
        Number.isInteger(data.presetIndex) && data.presetIndex >= 0 && data.presetIndex <= 3
          ? data.presetIndex
          : 0,
      debugView:
        Number.isInteger(data.debugView) && data.debugView >= 0 && data.debugView <= 9
          ? data.debugView
          : 0,
      hudCollapsed: typeof data.hudCollapsed === 'boolean' ? data.hudCollapsed : false,
    };
  } catch {
    return fallback;
  }
}

/**
 * Owns the user-facing application state, mirrors it into the renderer,
 * persists it under a versioned storage key, and notifies the HUD.
 */
export class GargantuaStore {
  constructor(renderer) {
    this.renderer = renderer;
    this.listeners = new Set();
    const saved = loadPersisted();
    this.state = { ...saved, cinematic: false };
    this.applyToRenderer();

    // Any manual camera interaction stops the cinematic loop, and the HUD
    // reflects it — the user never loses control of the view.
    renderer.handleUserInteract = () => {
      if (this.state.cinematic) {
        this.state.cinematic = false;
        this.emit();
      }
    };
  }

  applyToRenderer() {
    const { params, quality, debugView } = this.state;
    this.renderer.setParams(params);
    this.renderer.setQuality(quality);
    this.renderer.setDebugView(debugView);
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  snapshot() {
    return { ...this.state, params: { ...this.state.params } };
  }

  emit() {
    const snap = this.snapshot();
    for (const fn of this.listeners) fn(snap);
  }

  persist() {
    try {
      const { params, quality, presetIndex, debugView, hudCollapsed } = this.state;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ v: SCHEMA_VERSION, params, quality, presetIndex, debugView, hudCollapsed }),
      );
    } catch {
      // Private-browsing or quota errors must never break rendering.
    }
  }

  setParam(key, value) {
    const def = PARAM_DEFS_BY_KEY.get(key);
    if (!def || typeof value !== 'number' || !Number.isFinite(value)) return;
    const v = clampParam(def, value);
    this.state.params[key] = v;
    this.renderer.setParams({ [key]: v });
    this.persist();
    this.emit();
  }

  setQuality(level) {
    if (!(level in QUALITY_TIERS)) return false;
    this.state.quality = level;
    this.renderer.setQuality(level);
    this.persist();
    this.emit();
    return true;
  }

  cycleQuality() {
    const next =
      QUALITY_ORDER[(QUALITY_ORDER.indexOf(this.state.quality) + 1) % QUALITY_ORDER.length];
    this.setQuality(next);
  }

  setPreset(index) {
    if (!Number.isInteger(index) || index < 0 || index > 3) return false;
    this.state.presetIndex = index;
    this.renderer.applyPreset(index);
    this.persist();
    this.emit();
    return true;
  }

  setDebugView(index) {
    if (!Number.isInteger(index) || index < 0 || index > 9) return false;
    this.state.debugView = index;
    this.renderer.setDebugView(index);
    this.persist();
    this.emit();
    return true;
  }

  toggleHud() {
    this.state.hudCollapsed = !this.state.hudCollapsed;
    this.persist();
    this.emit();
  }

  setHudCollapsed(collapsed) {
    this.state.hudCollapsed = !!collapsed;
    this.persist();
    this.emit();
  }

  toggleCinematic() {
    this.state.cinematic = this.renderer.toggleCinematic();
    this.emit();
  }

  /** Camera damping/interaction moves renderer params; pull them for the HUD. */
  pullCamera() {
    const live = this.renderer.getParams();
    const p = this.state.params;
    let changed = false;
    for (const key of ['camDistance', 'camAzimuth', 'camElevation', 'fov']) {
      if (p[key] !== live[key]) {
        p[key] = live[key];
        changed = true;
      }
    }
    if (changed) this.emit();
  }

  reset() {
    this.state.params = { ...DEFAULT_PARAMS };
    this.state.quality = 'high';
    this.state.presetIndex = 0;
    this.state.debugView = 0;
    this.applyToRenderer();
    this.persist();
    this.emit();
  }
}
