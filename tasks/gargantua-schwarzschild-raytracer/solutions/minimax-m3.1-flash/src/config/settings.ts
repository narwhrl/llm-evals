import { DEFAULT_DEBUG } from "./debugViews";
import {
  PARAM_BY_KEY,
  ParamKey,
  ParamValues,
  clampParam,
  defaultParamValues,
  quantiseParam,
} from "./params";
import { DEFAULT_PRESET, PRESETS } from "./presets";
import { DEFAULT_QUALITY, isQualityLevel, QualityLevel } from "./quality";

/** Everything the scene can be in. One object, persisted as one record. */
export interface Settings {
  params: ParamValues;
  quality: QualityLevel;
  preset: number;
  debug: number;
  hudOpen: boolean;
}

export function defaultSettings(): Settings {
  return {
    params: defaultParamValues(),
    quality: DEFAULT_QUALITY,
    preset: DEFAULT_PRESET,
    debug: DEFAULT_DEBUG,
    hudOpen: true,
  };
}

export const STORAGE_KEY = "gargantua.settings";
export const STORAGE_VERSION = 1;

interface StoredRecord {
  version: number;
  settings: Settings;
}

/**
 * Writes the settings record.
 *
 * The version lives inside the payload rather than in the key so that a
 * future change of shape can be detected and dropped instead of being read
 * as a valid record with nonsense in it.
 */
export function saveSettings(settings: Settings): void {
  try {
    const record: StoredRecord = { version: STORAGE_VERSION, settings };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private browsing, a full quota or a hostile sandbox. The scene works
    // without persistence; it just forgets.
  }
}

function readStored(): StoredRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Partial<StoredRecord>;
    if (record.version !== STORAGE_VERSION) return null;
    if (!record.settings || typeof record.settings !== "object") return null;
    return record as StoredRecord;
  } catch {
    return null;
  }
}

/**
 * Reads the settings record back, dropping anything that no longer fits the
 * schema. A stored value that is out of range or the wrong type falls back to
 * the default for that control rather than poisoning the scene.
 */
export function loadSettings(): Settings {
  const base = defaultSettings();
  const record = readStored();
  if (!record) return base;

  const stored = record.settings;
  const params = { ...base.params };
  const rawParams = (stored.params ?? {}) as Partial<Record<ParamKey, unknown>>;
  for (const key of Object.keys(PARAM_BY_KEY) as ParamKey[]) {
    const value = rawParams[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      params[key] = quantiseParam(key, clampParam(key, value));
    }
  }

  return {
    params,
    quality: isQualityLevel(stored.quality) ? stored.quality : base.quality,
    preset: isPresetId(stored.preset) ? stored.preset : base.preset,
    debug: isDebugId(stored.debug) ? stored.debug : base.debug,
    hudOpen: typeof stored.hudOpen === "boolean" ? stored.hudOpen : base.hudOpen,
  };
}

export function isPresetId(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && PRESETS.some((p) => p.id === value);
}

export function isDebugId(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 9;
}

/** True when a settings record from an earlier session is on disk. */
export function hasStoredSettings(): boolean {
  return readStored() !== null;
}
