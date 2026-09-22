import {
  DEFAULT_PARAMS,
  PARAM_DEFS,
  PRESETS,
  QUALITY_LEVELS,
  STATE_VERSION,
  STORAGE_KEY,
  clampParam,
  defaultQuality,
  type ParamKey,
  type Params,
  type QualityLevel,
} from './defaults';

export interface PerfInfo {
  fps: number;
  ms: number;
}

export interface GargantuaState {
  version: number;
  quality: QualityLevel;
  preset: number; // last applied preset index; -1 = custom camera
  debug: number; // 0..9
  hud: boolean;
  cinematic: boolean;
  audio: boolean;
  params: Params;
  // display-only, never persisted
  perf: PerfInfo;
  contextLost: boolean;
  fatal: string | null;
}

export interface CaptureOptions {
  capture: boolean;
  time: number; // finite, >= 0
  quality?: QualityLevel;
  preset?: number; // 0..3
  debug?: number; // 0..9
  hud?: boolean;
}

// Strict, exception-free parsing of the screenshot automation contract:
// ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
export function parseCaptureParams(search: string): CaptureOptions {
  const q = new URLSearchParams(search);
  const out: CaptureOptions = { capture: false, time: 0 };

  if (q.get('capture') === '1') {
    out.capture = true;
    const t = Number(q.get('time'));
    out.time = Number.isFinite(t) && t >= 0 ? t : 0;

    const quality = q.get('quality');
    if (quality && (QUALITY_LEVELS as string[]).includes(quality)) {
      out.quality = quality as QualityLevel;
    }

    const preset = Number(q.get('preset'));
    if (Number.isInteger(preset) && preset >= 0 && preset <= 3) out.preset = preset;

    const debug = Number(q.get('debug'));
    if (Number.isInteger(debug) && debug >= 0 && debug <= 9) out.debug = debug;

    const hud = q.get('hud');
    if (hud === '0') out.hud = false;
    else if (hud === '1') out.hud = true;
  }
  return out;
}

function loadPersisted(): Partial<GargantuaState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (typeof data !== 'object' || data === null) return null;

    const patch: Partial<GargantuaState> = {};

    if (data.version === STATE_VERSION) {
      if (typeof data.quality === 'string' && (QUALITY_LEVELS as string[]).includes(data.quality)) {
        patch.quality = data.quality as QualityLevel;
      }
      if (typeof data.preset === 'number' && Number.isInteger(data.preset) && data.preset >= -1 && data.preset <= 3) {
        patch.preset = data.preset;
      }
      if (typeof data.debug === 'number' && Number.isInteger(data.debug) && data.debug >= 0 && data.debug <= 9) {
        patch.debug = data.debug;
      }
      if (typeof data.hud === 'boolean') patch.hud = data.hud;
      if (typeof data.cinematic === 'boolean') patch.cinematic = data.cinematic;
      if (typeof data.audio === 'boolean') patch.audio = data.audio;
      if (typeof data.params === 'object' && data.params !== null) {
        const params = { ...DEFAULT_PARAMS };
        for (const def of PARAM_DEFS) {
          const v = (data.params as Record<string, unknown>)[def.key];
          if (v !== undefined) params[def.key] = clampParam(def.key, v);
        }
        // keep inner/outer coupled
        params.diskInner = Math.min(params.diskInner, params.diskOuter - 1);
        patch.params = params;
      }
      return patch;
    }
    return null; // unknown version -> fresh defaults
  } catch {
    return null; // corrupted storage must never break startup
  }
}

function defaultState(capture: CaptureOptions): GargantuaState {
  const params = { ...DEFAULT_PARAMS };
  const preset = capture.preset ?? 0;
  return {
    version: STATE_VERSION,
    quality: capture.quality ?? defaultQuality(),
    preset,
    debug: capture.debug ?? 0,
    hud: capture.hud ?? true,
    cinematic: false, // capture mode freezes the camera loop; normal mode starts playing
    audio: false,
    params,
    perf: { fps: 0, ms: 0 },
    contextLost: false,
    fatal: null,
  };
}

type Listener = () => void;

export class GargantuaStore {
  readonly capture: CaptureOptions;

  /** bumped when camera params change from UI/preset -> engine applies them */
  cameraVersion = 0;
  /** bumped when the rig writes camera state back -> engine skips re-apply */
  rigFeedback = 0;

  private state: GargantuaState;
  private listeners = new Set<Listener>();
  private saveTimer: ReturnType<typeof setTimeout> | undefined;
  private pendingSave = false;

  constructor(search: string) {
    this.capture = parseCaptureParams(search);
    const base = defaultState(this.capture);
    const persisted = this.capture.capture ? null : loadPersisted();
    this.state = persisted ? { ...base, ...persisted } : base;
    if (!this.capture.capture) this.state.cinematic = persisted?.cinematic ?? true;
    // preset camera wins over persisted params when explicitly requested
    if (this.capture.preset !== undefined) this.applyPresetCamera(this.capture.preset);
    // capture sessions never overwrite saved state (patch); also flush pending
    // saves on pagehide so a reload right after a change cannot lose them
    window.addEventListener('pagehide', () => this.flushSave());
  }

  getState = (): GargantuaState => this.state;

  subscribe = (l: Listener): (() => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };

  private emit() {
    for (const l of this.listeners) l();
  }

  private patch(p: Partial<GargantuaState>, persist = true) {
    this.state = { ...this.state, ...p };
    this.emit();
    if (persist && !this.capture.capture) this.scheduleSave(); // capture sessions never overwrite saved state
  }

  private scheduleSave() {
    this.pendingSave = true;
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.flushSave(), 250);
  }

  private flushSave() {
    if (!this.pendingSave) return;
    this.pendingSave = false;
    clearTimeout(this.saveTimer);
    try {
      const { version, quality, preset, debug, hud, cinematic, audio, params } = this.state;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version, quality, preset, debug, hud, cinematic, audio, params }),
      );
    } catch {
      /* storage unavailable (private mode) — persistence is best-effort */
    }
  }

  setParam(key: ParamKey, value: number) {
    const v = clampParam(key, value);
    const params = { ...this.state.params, [key]: v };
    if (key === 'diskInner') params.diskInner = Math.min(v, params.diskOuter - 1);
    if (key === 'diskOuter') params.diskOuter = Math.max(v, params.diskInner + 1);
    const cameraKeys: ParamKey[] = ['fov', 'camDistance', 'camAzimuth', 'camPolar'];
    const wasCamera = cameraKeys.includes(key);
    this.patch({ params, ...(wasCamera ? { preset: -1 } : {}) });
    if (wasCamera) this.cameraVersion++;
  }

  /** camera -> store sync from dragging; must not trigger engine write-back */
  setCameraFromRig(distance: number, azimuth: number, polar: number, fov: number) {
    const params = {
      ...this.state.params,
      camDistance: clampParam('camDistance', distance),
      camAzimuth: Math.round(clampParam('camAzimuth', azimuth)),
      camPolar: Math.round(clampParam('camPolar', polar)),
      fov: Math.round(clampParam('fov', fov)),
    };
    this.rigFeedback++;
    this.patch({ params }); // persisted (debounced), rigFeedback skips write-back
  }

  applyPresetCamera(index: number) {
    if (index < 0 || index >= PRESETS.length) return;
    const preset = PRESETS[index];
    const params = {
      ...this.state.params,
      camDistance: preset.distance,
      camAzimuth: preset.azimuth,
      camPolar: preset.polar,
      fov: preset.fov,
    };
    this.patch({ params, preset: index });
    this.cameraVersion++;
  }

  setQuality(level: QualityLevel) {
    if (!QUALITY_LEVELS.includes(level)) return;
    this.patch({ quality: level });
  }

  cycleQuality(): QualityLevel {
    const next = QUALITY_LEVELS[(QUALITY_LEVELS.indexOf(this.state.quality) + 1) % QUALITY_LEVELS.length];
    this.setQuality(next);
    return next;
  }

  setDebug(n: number) {
    if (!Number.isInteger(n) || n < 0 || n > 9) return;
    this.patch({ debug: n });
  }

  toggleHud() {
    this.patch({ hud: !this.state.hud });
  }

  setCinematic(on: boolean) {
    if (this.capture.capture && on) return; // capture freezes the camera loop
    this.patch({ cinematic: on });
  }

  toggleCinematic() {
    this.setCinematic(!this.state.cinematic);
  }

  setAudio(on: boolean) {
    if (this.capture.capture && on) return;
    this.patch({ audio: on });
  }

  toggleAudio() {
    this.setAudio(!this.state.audio);
  }

  reset() {
    const params = { ...DEFAULT_PARAMS };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* best-effort */
    }
    this.cameraVersion++;
    this.patch({ params, preset: 0, debug: 0, hud: true, quality: defaultQuality() });
  }

  setPerf(fps: number, ms: number) {
    this.patch({ perf: { fps, ms } }, false);
  }

  setContextLost(lost: boolean) {
    this.patch({ contextLost: lost }, false);
  }

  setFatal(message: string | null) {
    this.patch({ fatal: message }, false);
  }
}

export const store = new GargantuaStore(window.location.search);
