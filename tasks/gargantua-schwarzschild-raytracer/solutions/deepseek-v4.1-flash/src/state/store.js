/**
 * The application store: one mutable state object, a subscriber list, validated mutators, and
 * persistence on every committed change.
 *
 * The capture URL is applied *over* the persisted state and before the first frame, so a capture
 * run is reproducible even if the browser profile still holds a previous session's parameters.
 * Every mutator validates its input, records the outcome in `state.lastCommand`, and never throws —
 * which is what lets `window.__GARGANTUA__.setDebug(...)` reject a bad value safely.
 */
import {
  DEFAULT_PARAMETERS,
  PRESETS,
  QUALITY_LEVELS,
  coerceParameter,
} from './schema.js'
import { clearPersistedState, defaultState, loadPersistedState, persistState } from './persistence.js'
import { parseCaptureUrl } from './urlParams.js'

export function createStore(search) {
  const url = parseCaptureUrl(search ?? (typeof window !== 'undefined' ? window.location.search : ''))
  const persisted = loadPersistedState()

  const initial = {
    ...persisted,
    capture: url.isCapture,
    time: url.patch.time ?? 0,
    rejectedQuery: url.rejected,
    // Capture mode disables the cinematic loop and the optional audio for determinism.
    cinematic: url.isCapture ? false : persisted.cinematic,
    audio: url.isCapture ? false : persisted.audio,
    lastCommand: null,
  }
  if (url.patch.quality) initial.quality = url.patch.quality
  if (url.patch.preset !== undefined) initial.preset = url.patch.preset
  if (url.patch.debug !== undefined) initial.debug = url.patch.debug
  if (url.patch.hudOpen !== undefined) initial.hudOpen = url.patch.hudOpen

  let state = initial
  // A capture URL that names a preset must actually frame the camera that way, so the preset's
  // absolute camera parameters are layered over whatever was persisted.
  if (url.patch.preset !== undefined) {
    const presetParams = { ...initial.params }
    for (const [id, raw] of Object.entries(PRESETS[initial.preset].params)) {
      const coerced = coerceParameter(id, raw)
      if (coerced !== undefined) presetParams[id] = coerced
    }
    state = { ...state, params: presetParams }
  }

  const listeners = new Set()

  function emit() {
    for (const listener of listeners) listener(state)
  }

  function commit(next, command) {
    state = command ? { ...next, lastCommand: command } : next
    persistState(state)
    emit()
    return state
  }

  function subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  function getState() {
    return state
  }

  function setParameters(patch, commandName = 'setParameters') {
    const params = { ...state.params }
    const applied = {}
    for (const [id, raw] of Object.entries(patch || {})) {
      const value = coerceParameter(id, raw)
      if (value === undefined) continue
      params[id] = value
      applied[id] = value
    }
    // Keep the annulus self-consistent no matter which handle the user moved.
    if (applied.diskInner !== undefined || applied.diskOuter !== undefined) {
      if (params.diskOuter < params.diskInner + 0.5) {
        if (applied.diskInner !== undefined) params.diskOuter = Math.min(42, params.diskInner + 0.5)
        else params.diskInner = Math.max(1.6, params.diskOuter - 0.5)
      }
    }
    return commit({ ...state, params }, { name: commandName, ok: true, reason: null })
  }

  function setQuality(level) {
    const normalised = typeof level === 'string' ? level.trim().toLowerCase() : ''
    if (!QUALITY_LEVELS.includes(normalised)) {
      return commit(state, {
        name: 'setQuality',
        ok: false,
        reason: `expected one of ${QUALITY_LEVELS.join(', ')}`,
      })
    }
    return commit({ ...state, quality: normalised }, { name: 'setQuality', ok: true, reason: null })
  }

  function cycleQuality() {
    const index = QUALITY_LEVELS.indexOf(state.quality)
    return setQuality(QUALITY_LEVELS[(index + 1) % QUALITY_LEVELS.length])
  }

  function setPreset(index) {
    const numeric = typeof index === 'number' ? index : Number.parseInt(index, 10)
    if (!Number.isInteger(numeric) || numeric < 0 || numeric >= PRESETS.length) {
      return commit(state, {
        name: 'setPreset',
        ok: false,
        reason: `expected an integer in 0..${PRESETS.length - 1}`,
      })
    }
    const params = { ...state.params, ...PRESETS[numeric].params }
    for (const id of Object.keys(PRESETS[numeric].params)) {
      const value = coerceParameter(id, params[id])
      if (value !== undefined) params[id] = value
    }
    // Choosing a preset is an explicit framing request, so the cinematic loop hands the camera over
    // instead of orbiting away from the framing that was just asked for.
    return commit(
      { ...state, params, preset: numeric, cinematic: false },
      { name: 'setPreset', ok: true, reason: null },
    )
  }

  function setDebug(index) {
    const numeric = typeof index === 'number' ? index : Number.parseInt(index, 10)
    if (!Number.isInteger(numeric) || numeric < 0 || numeric > 9) {
      return commit(state, { name: 'setDebug', ok: false, reason: 'expected an integer in 0..9' })
    }
    return commit({ ...state, debug: numeric }, { name: 'setDebug', ok: true, reason: null })
  }

  function setTime(seconds) {
    const numeric = typeof seconds === 'number' ? seconds : Number(seconds)
    if (!Number.isFinite(numeric) || numeric < 0) {
      return commit(state, {
        name: 'setTime',
        ok: false,
        reason: 'expected a finite, non-negative number of seconds',
      })
    }
    return commit({ ...state, time: numeric }, { name: 'setTime', ok: true, reason: null })
  }

  function setHudOpen(open) {
    return commit({ ...state, hudOpen: !!open }, { name: 'setHudOpen', ok: true, reason: null })
  }

  function toggleHud() {
    return setHudOpen(!state.hudOpen)
  }

  function setCinematic(playing) {
    return commit({ ...state, cinematic: !!playing }, { name: 'setCinematic', ok: true, reason: null })
  }

  function toggleCinematic() {
    return setCinematic(!state.cinematic)
  }

  function setAudio(enabled) {
    // Capture runs are silent by contract.
    const next = state.capture ? false : !!enabled
    return commit({ ...state, audio: next }, { name: 'setAudio', ok: true, reason: null })
  }

  function toggleAudio() {
    return setAudio(!state.audio)
  }

  function reset() {
    clearPersistedState()
    const fresh = defaultState()
    return commit(
      {
        ...fresh,
        // A capture run keeps its frozen clock and stays paused and silent so the reset cannot
        // break the determinism the capture contract guarantees. Outside capture the loop also
        // stays paused: it would otherwise orbit away from the default framing the user just
        // asked to be restored.
        capture: state.capture,
        time: state.time,
        rejectedQuery: state.rejectedQuery,
        cinematic: false,
        audio: state.capture ? false : fresh.audio,
      },
      { name: 'reset', ok: true, reason: null },
    )
  }

  /**
   * Pushes the live camera framing back into the parameters so the HUD readouts and the camera
   * sliders always describe the camera the shader is actually using. Throttled by the caller.
   */
  function syncCameraFraming({ azimuth, elevation, distance }) {
    const params = { ...state.params }
    const a = coerceParameter('camAzimuth', azimuth)
    const e = coerceParameter('camElevation', elevation)
    const d = coerceParameter('camDistance', distance)
    if (a === params.camAzimuth && e === params.camElevation && d === params.camDistance) return state
    if (a !== undefined) params.camAzimuth = a
    if (e !== undefined) params.camElevation = e
    if (d !== undefined) params.camDistance = d
    state = { ...state, params }
    emit()
    return state
  }

  /** Called by the engine once the first frame has been rendered with the URL state applied. */
  function markReady() {
    state = { ...state, ready: true }
    emit()
    return state
  }

  return {
    subscribe,
    getState,
    setParameters,
    setQuality,
    cycleQuality,
    setPreset,
    setDebug,
    setTime,
    setHudOpen,
    toggleHud,
    setCinematic,
    toggleCinematic,
    setAudio,
    toggleAudio,
    reset,
    syncCameraFraming,
    markReady,
  }
}
