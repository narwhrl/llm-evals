// Minimal observable store shared by React (via useSyncExternalStore) and the
// imperative engine. State is versioned and persisted to localStorage.
import {
  DEBUG_VIEWS,
  PARAM_DEFS,
  PRESETS,
  QUALITIES,
  clampParam,
  defaultParams,
  type ParamKey,
  type Params,
  type Quality,
} from "./defaults";

export interface EngineStatus {
  status: "ok" | "context-lost" | "webgl-unsupported";
  fps: number;
}

export interface State {
  params: Params;
  quality: Quality;
  preset: number; // index into PRESETS, -1 once the user moves the camera
  debug: number; // 0..9
  hudCollapsed: boolean;
  cinematic: boolean; // cinematic camera loop running
  audio: boolean; // optional procedural ambience (off by default)
}

export const STORAGE_KEY = "gargantua.state.v1";

function defaultState(): State {
  return {
    params: defaultParams(),
    quality: "high",
    preset: 0,
    debug: 0,
    hudCollapsed: false,
    cinematic: true,
    audio: false,
  };
}

function sanitize(raw: unknown): State {
  const base = defaultState();
  if (typeof raw !== "object" || raw === null) return base;
  const r = raw as Partial<State> & { version?: number };
  if (r.version !== 1) return base;
  const out = base;
  if (r.params && typeof r.params === "object") {
    for (const def of PARAM_DEFS) {
      const key = def.key as keyof Params;
      out.params[key] = clampParam(def.key, (r.params as Record<string, unknown>)[key]);
    }
  }
  if (typeof r.quality === "string" && (QUALITIES as string[]).includes(r.quality)) {
    out.quality = r.quality as Quality;
  }
  if (typeof r.preset === "number" && r.preset >= -1 && r.preset < PRESETS.length && Number.isInteger(r.preset)) {
    out.preset = r.preset;
  }
  if (typeof r.debug === "number" && Number.isInteger(r.debug) && r.debug >= 0 && r.debug < DEBUG_VIEWS.length) {
    out.debug = r.debug;
  }
  if (typeof r.hudCollapsed === "boolean") out.hudCollapsed = r.hudCollapsed;
  if (typeof r.cinematic === "boolean") out.cinematic = r.cinematic;
  if (typeof r.audio === "boolean") out.audio = r.audio;
  return out;
}

function loadPersisted(): State | null {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    if (!text) return null;
    return sanitize(JSON.parse(text));
  } catch {
    return null;
  }
}

type Listener = () => void;

class Store {
  private state: State;
  private listeners = new Set<Listener>();
  private persistTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.state = loadPersisted() ?? defaultState();
  }

  subscribe = (fn: Listener): (() => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  getSnapshot = (): State => this.state;

  private set(patch: Partial<State>, options: { persist?: boolean } = {}): void {
    this.state = { ...this.state, ...patch };
    for (const fn of this.listeners) fn();
    if (options.persist !== false) this.schedulePersist();
  }

  private schedulePersist(): void {
    if (this.persistTimer !== null) clearTimeout(this.persistTimer);
    this.persistTimer = setTimeout(() => {
      this.persistTimer = null;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, ...this.state }));
      } catch {
        // Storage may be unavailable (private mode); rendering must continue.
      }
    }, 250);
  }

  setParams(patch: Partial<Params>, persist = true): void {
    const next = { ...this.state.params };
    for (const [k, v] of Object.entries(patch)) {
      next[k as ParamKey] = clampParam(k as ParamKey, v);
    }
    this.set({ params: next }, { persist });
  }

  setQuality(quality: Quality): void {
    this.set({ quality });
  }

  cycleQuality(): Quality {
    const idx = QUALITIES.indexOf(this.state.quality);
    const next = QUALITIES[(idx + 1) % QUALITIES.length];
    this.set({ quality: next });
    return next;
  }

  setPreset(index: number): void {
    if (index < 0 || index >= PRESETS.length) return;
    this.set({ preset: index });
  }

  // A preset is the camera part of a named framing; the engine picks the
  // parameter diff up and repositions the camera.
  applyPreset(index: number): boolean {
    const pr = PRESETS[index];
    if (!pr) return false;
    this.setParams({ camDist: pr.distance, camAzimuth: pr.azimuth, camPitch: pr.pitch, fov: pr.fov });
    this.set({ preset: index });
    return true;
  }

  markCustomCamera(): void {
    if (this.state.preset !== -1) this.set({ preset: -1 });
  }

  setDebug(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= DEBUG_VIEWS.length) return;
    this.set({ debug: index });
  }

  cycleDebug(): void {
    this.set({ debug: (this.state.debug + 1) % DEBUG_VIEWS.length });
  }

  setHudCollapsed(collapsed: boolean): void {
    this.set({ hudCollapsed: collapsed });
  }

  toggleHud(): void {
    this.set({ hudCollapsed: !this.state.hudCollapsed });
  }

  setCinematic(on: boolean): void {
    this.set({ cinematic: on });
  }

  setAudio(on: boolean): void {
    this.set({ audio: on });
  }

  reset(): void {
    this.set(defaultState());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  // URL capture overrides: applied for the automated screenshot session only,
  // deliberately not persisted, so a later normal reload restores user state.
  applyCapture(patch: {
    quality?: Quality;
    preset?: number;
    debug?: number;
    hudCollapsed?: boolean;
  }): void {
    const p: Partial<State> = {};
    if (patch.quality) p.quality = patch.quality;
    if (patch.preset !== undefined) {
      const pr = PRESETS[patch.preset];
      if (pr) {
        this.setParams(
          { camDist: pr.distance, camAzimuth: pr.azimuth, camPitch: pr.pitch, fov: pr.fov },
          false,
        );
        p.preset = patch.preset;
      }
    }
    if (patch.debug !== undefined) p.debug = patch.debug;
    if (patch.hudCollapsed !== undefined) p.hudCollapsed = patch.hudCollapsed;
    this.set({ ...p, cinematic: false, audio: false }, { persist: false });
  }
}

export const store = new Store();
