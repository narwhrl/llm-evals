// URL screenshot-automation contract + window.__GARGANTUA__ state API.
//
//   ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
//
// capture=1 freezes the simulation clock at `time` (finite non-negative
// seconds, default 0), disables the cinematic loop and the optional audio so
// the first screenshot-able frame is deterministic. quality accepts only
// standard|high|cinematic, preset 0..3, debug 0..9, hud 0|1; any illegal value
// falls back safely (ignored) rather than throwing or black-screening.
import { DEBUG_VIEWS, PRESETS, QUALITIES, type Quality } from "../state/defaults";
import { store } from "../state/store";
import type { Engine } from "./Engine";

export interface CaptureOptions {
  capture: boolean;
  time: number; // valid when capture
  quality?: Quality;
  preset?: number;
  debug?: number;
  hud?: boolean;
}

function parseIntInRange(raw: string | null, min: number, max: number): number | undefined {
  if (raw === null) return undefined;
  const v = Number.parseInt(raw, 10);
  if (!Number.isFinite(v) || v < min || v > max) return undefined;
  return v;
}

export function parseCaptureQuery(search: string): CaptureOptions {
  const q = new URLSearchParams(search);
  const opts: CaptureOptions = { capture: q.get("capture") === "1", time: 0 };

  const timeRaw = q.get("time");
  if (timeRaw !== null) {
    const t = Number(timeRaw);
    if (Number.isFinite(t) && t >= 0) opts.time = t;
  }
  const qualityRaw = q.get("quality");
  if (qualityRaw !== null && (QUALITIES as string[]).includes(qualityRaw)) {
    opts.quality = qualityRaw as Quality;
  }
  opts.preset = parseIntInRange(q.get("preset"), 0, PRESETS.length - 1);
  opts.debug = parseIntInRange(q.get("debug"), 0, DEBUG_VIEWS.length - 1);
  const hudRaw = q.get("hud");
  if (hudRaw === "0") opts.hud = true;
  if (hudRaw === "1") opts.hud = false;
  return opts;
}

// Apply URL state to the store (no persistence — capture must not hijack the
// user's saved state). Engine clock freezing happens once the engine exists.
export function applyCaptureToStore(opts: CaptureOptions): void {
  if (!opts.capture) {
    // Non-capture URLs may still carry valid overrides; apply them too.
    if (opts.quality || opts.preset !== undefined || opts.debug !== undefined || opts.hud !== undefined) {
      store.applyCapture({
        quality: opts.quality,
        preset: opts.preset,
        debug: opts.debug,
        hudCollapsed: opts.hud,
      });
    }
    return;
  }
  store.applyCapture({
    quality: opts.quality,
    preset: opts.preset,
    debug: opts.debug,
    hudCollapsed: opts.hud,
  });
}

export function applyCaptureToEngine(engine: Engine, opts: CaptureOptions): void {
  if (!opts.capture) return;
  engine.setFrozen(true);
  engine.setTime(opts.time);
}

// ---------------------------------------------------------------------------
// window.__GARGANTUA__
let engineRef: Engine | null = null;
let readyFlag = false;
let bootCapture: CaptureOptions = { capture: false, time: 0 };

export function setBootCapture(opts: CaptureOptions): void {
  bootCapture = opts;
}

export function getBootCapture(): CaptureOptions {
  return bootCapture;
}

export function bindEngine(engine: Engine): void {
  engineRef = engine;
}

export function notifyReady(): void {
  readyFlag = true;
  document.documentElement.dataset.gargantuaReady = "true";
}

export interface GargantuaStateSnapshot {
  ready: boolean;
  time: number;
  quality: Quality;
  preset: number;
  debug: number;
  hudCollapsed: boolean;
  cinematic: boolean;
  audio: boolean;
  params: Record<string, number>;
}

type ApiResult = GargantuaStateSnapshot | { ok: false; error: string };

function snapshot(): GargantuaStateSnapshot {
  const s = store.getSnapshot();
  return {
    ready: readyFlag,
    time: engineRef ? engineRef.simTime : 0,
    quality: s.quality,
    preset: s.preset,
    debug: s.debug,
    hudCollapsed: s.hudCollapsed,
    cinematic: s.cinematic,
    audio: s.audio,
    params: { ...s.params },
  };
}

declare global {
  interface Window {
    __GARGANTUA__?: {
      readonly ready: boolean;
      getState(): GargantuaStateSnapshot;
      setQuality(level: string): ApiResult;
      setPreset(index: number): ApiResult;
      setDebug(index: number): ApiResult;
      setTime(seconds: number): ApiResult;
    };
  }
}

export function installGlobalApi(): void {
  const api = {
    get ready(): boolean {
      return readyFlag;
    },
    getState: (): GargantuaStateSnapshot => snapshot(),
    setQuality: (level: string): ApiResult => {
      if (!(QUALITIES as string[]).includes(level)) {
        return { ok: false, error: `quality must be one of ${QUALITIES.join("|")}` };
      }
      store.setQuality(level as Quality);
      return snapshot();
    },
    setPreset: (index: number): ApiResult => {
      if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) {
        return { ok: false, error: `preset must be an integer in [0, ${PRESETS.length - 1}]` };
      }
      store.applyPreset(index);
      return snapshot();
    },
    setDebug: (index: number): ApiResult => {
      if (!Number.isInteger(index) || index < 0 || index >= DEBUG_VIEWS.length) {
        return { ok: false, error: `debug must be an integer in [0, ${DEBUG_VIEWS.length - 1}]` };
      }
      store.setDebug(index);
      return snapshot();
    },
    setTime: (seconds: number): ApiResult => {
      if (!Number.isFinite(seconds) || seconds < 0) {
        return { ok: false, error: "time must be a finite non-negative number" };
      }
      if (!engineRef || !engineRef.setTime(seconds)) {
        return { ok: false, error: "engine not ready" };
      }
      return snapshot();
    },
  };
  window.__GARGANTUA__ = api;
}
