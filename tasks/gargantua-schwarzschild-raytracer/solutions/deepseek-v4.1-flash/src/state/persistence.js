/**
 * Versioned localStorage persistence.
 *
 * Everything configurable is stored under one key with an explicit schema version: parameters,
 * quality tier, active preset, debug view, HUD visibility, cinematic state, camera framing and the
 * audio flag. On read, every field is validated against the schema; anything missing, unknown,
 * out of range or written by a different version falls back to the schema default rather than being
 * trusted. A corrupt payload therefore degrades to defaults instead of a broken scene.
 */
import {
  DEFAULT_PARAMETERS,
  DEFAULT_QUALITY,
  PARAMETERS,
  PRESETS,
  QUALITY_LEVELS,
  SCHEMA_VERSION,
  STORAGE_KEY,
  coerceParameter,
} from './schema.js'

function defaultState() {
  return {
    version: SCHEMA_VERSION,
    params: { ...DEFAULT_PARAMETERS },
    quality: DEFAULT_QUALITY,
    preset: 0,
    debug: 0,
    hudOpen: true,
    cinematic: true,
    audio: false,
  }
}

function readInteger(value, min, max, fallback) {
  const numeric = typeof value === 'number' ? value : Number.parseInt(value, 10)
  if (!Number.isInteger(numeric) || numeric < min || numeric > max) return fallback
  return numeric
}

/** Validates an arbitrary object into a complete, in-range state. */
export function validateState(raw, fallback = defaultState()) {
  if (!raw || typeof raw !== 'object') return fallback

  const state = defaultState()
  state.version = SCHEMA_VERSION

  const rawParams = raw.params && typeof raw.params === 'object' ? raw.params : {}
  for (const definition of PARAMETERS) {
    const coerced = coerceParameter(definition.id, rawParams[definition.id])
    state.params[definition.id] = coerced === undefined ? definition.value : coerced
  }

  state.quality = QUALITY_LEVELS.includes(raw.quality) ? raw.quality : DEFAULT_QUALITY
  state.preset = readInteger(raw.preset, 0, PRESETS.length - 1, 0)
  state.debug = readInteger(raw.debug, 0, 9, 0)
  state.hudOpen = typeof raw.hudOpen === 'boolean' ? raw.hudOpen : true
  state.cinematic = typeof raw.cinematic === 'boolean' ? raw.cinematic : true
  state.audio = typeof raw.audio === 'boolean' ? raw.audio : false

  return state
}

export function loadPersistedState() {
  if (typeof localStorage === 'undefined') return defaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    // A payload from another schema version is discarded rather than guessed at.
    if (!parsed || parsed.version !== SCHEMA_VERSION) return defaultState()
    return validateState(parsed)
  } catch {
    return defaultState()
  }
}

export function persistState(state) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: SCHEMA_VERSION,
        params: state.params,
        quality: state.quality,
        preset: state.preset,
        debug: state.debug,
        hudOpen: state.hudOpen,
        cinematic: state.cinematic,
        audio: state.audio,
      }),
    )
  } catch {
    // Private-mode / quota failures must not break rendering.
  }
}

export function clearPersistedState() {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignored on purpose; reset still applies in memory
  }
}

export { defaultState }
