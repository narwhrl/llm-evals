import {
  DEFAULT_PARAMS,
  PARAM_SPECS,
  defaultHud,
  defaultQuality,
  presetPatch,
} from './presets.js'

export const STORAGE_KEY = 'gargantua-state-v1'

const SPEC = Object.fromEntries(PARAM_SPECS.map((spec) => [spec.key, spec]))

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function wrap360(value) {
  let x = value % 360
  if (x < 0) x += 360
  return x
}

export function sanitizeParams(input) {
  const next = { ...DEFAULT_PARAMS }
  for (const spec of PARAM_SPECS) {
    const value = Number(input?.[spec.key])
    if (!Number.isFinite(value)) continue
    next[spec.key] = spec.key === 'azimuth'
      ? wrap360(value)
      : clamp(value, spec.min, spec.max)
  }
  if (next.diskOuter < next.diskInner + 0.6) next.diskOuter = clamp(next.diskInner + 0.6, SPEC.diskOuter.min, SPEC.diskOuter.max)
  if (next.diskInner > next.diskOuter - 0.6) next.diskInner = clamp(next.diskOuter - 0.6, SPEC.diskInner.min, SPEC.diskInner.max)
  return next
}

function factory() {
  return {
    quality: defaultQuality(),
    debug: 0,
    hud: defaultHud(),
    preset: 0,
    playing: true,
    capture: false,
    time: 0,
    captureTime: 0,
    contextLost: false,
    shaderError: '',
    params: { ...DEFAULT_PARAMS },
  }
}

function integerParam(value, min, max) {
  if (typeof value !== 'string' || !/^-?\d+$/.test(value)) return null
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return null
  return parsed
}

function readSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || data.v !== 1 || !data.params) return null
    const quality = ['standard', 'high', 'cinematic'].includes(data.quality) ? data.quality : null
    const debug = Number.isInteger(data.debug) && data.debug >= 0 && data.debug <= 9 ? data.debug : 0
    const preset = data.preset === null
      ? null
      : (Number.isInteger(data.preset) && data.preset >= 0 && data.preset <= 3 ? data.preset : 0)
    return {
      quality,
      debug,
      hud: Boolean(data.hud),
      preset,
      playing: Boolean(data.playing),
      params: sanitizeParams(data.params),
    }
  } catch {
    return null
  }
}

function applyUrl(state, params) {
  if (params.has('quality')) {
    const key = (params.get('quality') || '').trim().toLowerCase()
    state.quality = ['standard', 'high', 'cinematic'].includes(key) ? key : 'high'
  }
  if (params.has('preset')) {
    const preset = integerParam(params.get('preset') ?? '', 0, 3)
    const patch = presetPatch(preset === null ? 0 : preset)
    state.preset = patch.preset
    state.playing = false
    state.params = { ...state.params, ...patch.params }
  }
  if (params.has('debug')) {
    const debug = integerParam(params.get('debug') ?? '', 0, 9)
    state.debug = debug === null ? 0 : debug
  }
  if (params.has('hud')) {
    const hud = params.get('hud')
    state.hud = hud === '0' ? false : true
  }
  if (params.has('time')) {
    const time = Number(params.get('time'))
    state.time = Number.isFinite(time) && time >= 0 ? time : 0
  }
}

function loadInitial() {
  const params = new URLSearchParams(window.location.search)
  const capture = params.get('capture') === '1'
  const state = factory()
  state.capture = capture
  if (!capture) {
    const saved = readSaved()
    if (saved) {
      if (saved.quality) state.quality = saved.quality
      state.debug = saved.debug
      state.hud = saved.hud
      state.preset = saved.preset
      state.playing = saved.playing
      state.params = saved.params
    }
  }
  applyUrl(state, params)
  if (capture || params.has('preset')) state.playing = false
  state.captureTime = state.time
  state.params = sanitizeParams(state.params)
  return state
}

function persist(state) {
  const payload = {
    v: 1,
    quality: state.quality,
    debug: state.debug,
    hud: state.hud,
    preset: state.preset,
    playing: state.playing,
    params: state.params,
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Private mode and full storage both leave the live scene usable.
  }
}

export function createStore() {
  let state = loadInitial()
  const listeners = new Set()
  let saveTimer = 0

  function emit(meta) {
    for (const listener of listeners) listener(state, meta)
  }

  function scheduleSave() {
    window.clearTimeout(saveTimer)
    saveTimer = window.setTimeout(() => persist(state), 160)
  }

  return {
    getState() {
      return state
    },
    set(patch, meta = {}) {
      const source = meta.source ?? 'ui'
      const persistChange = meta.persist ?? (source === 'ui' || source === 'reset')
      const params = patch.params ? sanitizeParams({ ...state.params, ...patch.params }) : state.params
      state = {
        ...state,
        ...patch,
        params,
        capture: state.capture,
        captureTime: state.captureTime,
      }
      if (persistChange && !state.capture) {
        if (source === 'reset') persist(state)
        else scheduleSave()
      }
      emit({ source, syncTime: Boolean(meta.syncTime) })
    },
    reset() {
      const next = factory()
      next.capture = state.capture
      next.captureTime = state.captureTime
      next.time = state.capture ? state.captureTime : 0
      next.contextLost = state.contextLost
      next.shaderError = state.shaderError
      next.playing = !state.capture
      next.quality = defaultQuality()
      next.hud = defaultHud()
      this.set(next, { source: 'reset', persist: true, syncTime: true })
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
