// Single mutable store for the whole application.
//
// React subscribes through `useSyncExternalStore` and only ever reads immutable
// snapshots; the render loop reads the live mutable objects directly, so no React
// re-render happens per animation frame. Camera changes that originate from
// OrbitControls (cinematic loop / drag) are written into the same params object but
// notify React at a throttled rate, which keeps slider readouts live without paying
// a reconciliation pass on every frame.

export const STORAGE_KEY = 'gargantua.state.v1'
export const STORAGE_VERSION = 1

const TAU = Math.PI * 2

// ---------------------------------------------------------------------------
// Quality tiers — these change the real rendering budget (see RendererManager).
// ---------------------------------------------------------------------------
export const QUALITY_TIERS = {
  standard: {
    key: 'standard',
    label: 'Standard',
    renderScale: 0.75,
    dprCap: 1.0,
    maxSteps: 160,
    stepScale: 1.25,
    bloomFactor: 0.5,
  },
  high: {
    key: 'high',
    label: 'High',
    renderScale: 1.0,
    dprCap: 1.5,
    maxSteps: 320,
    stepScale: 1.0,
    bloomFactor: 1.0,
  },
  cinematic: {
    key: 'cinematic',
    label: 'Cinematic',
    renderScale: 1.0,
    dprCap: 2.0,
    maxSteps: 480,
    stepScale: 0.85,
    bloomFactor: 1.0,
  },
}

export const QUALITY_ORDER = ['standard', 'high', 'cinematic']

// ---------------------------------------------------------------------------
// The 21 required parameters.
// ---------------------------------------------------------------------------
export const PARAM_DEFS = [
  // Camera ------------------------------------------------------------------
  { key: 'fov', group: 'Camera', label: 'Field of view', min: 25, max: 100, step: 0.5, def: 55, unit: '°' },
  { key: 'camDistance', group: 'Camera', label: 'Orbit distance', min: 8, max: 80, step: 0.5, def: 24, unit: 'M' },
  { key: 'camAzimuth', group: 'Camera', label: 'Azimuth', min: 0, max: TAU, step: 0.01, def: 0.65, unit: 'rad' },
  { key: 'camElevation', group: 'Camera', label: 'Elevation', min: -1.35, max: 1.35, step: 0.01, def: 0.3, unit: 'rad' },
  { key: 'timeScale', group: 'Camera', label: 'Time scale', min: 0, max: 4, step: 0.01, def: 1.0, unit: '×' },
  // Accretion disk ----------------------------------------------------------
  { key: 'diskInner', group: 'Disk', label: 'Inner radius', min: 3, max: 24, step: 0.1, def: 6, unit: 'M' },
  { key: 'diskOuter', group: 'Disk', label: 'Outer radius', min: 8, max: 48, step: 0.1, def: 18, unit: 'M' },
  { key: 'diskThickness', group: 'Disk', label: 'Half thickness', min: 0.05, max: 2.5, step: 0.01, def: 0.5, unit: 'M' },
  { key: 'diskTemp', group: 'Disk', label: 'Peak temperature', min: 2500, max: 14000, step: 50, def: 7200, unit: 'K' },
  { key: 'diskIntensity', group: 'Disk', label: 'Emission intensity', min: 0.1, max: 6, step: 0.01, def: 1.4, unit: '×' },
  { key: 'orbitSpeedMul', group: 'Disk', label: 'Orbital speed', min: 0, max: 2.5, step: 0.01, def: 1.0, unit: '×' },
  { key: 'turbAmp', group: 'Disk', label: 'Turbulence amount', min: 0, max: 1.5, step: 0.01, def: 0.55, unit: '' },
  { key: 'turbSpeed', group: 'Disk', label: 'Turbulence speed', min: 0, max: 3, step: 0.01, def: 1.0, unit: '×' },
  // Background --------------------------------------------------------------
  { key: 'starDensity', group: 'Background', label: 'Star density', min: 0, max: 3, step: 0.01, def: 1.0, unit: '×' },
  { key: 'galaxyBrightness', group: 'Background', label: 'Galaxy brightness', min: 0, max: 3, step: 0.01, def: 0.9, unit: '×' },
  // Post processing ---------------------------------------------------------
  { key: 'bloomStrength', group: 'Post', label: 'Bloom strength', min: 0, max: 2, step: 0.01, def: 0.55, unit: '' },
  { key: 'bloomThreshold', group: 'Post', label: 'Bloom threshold', min: 0, max: 2, step: 0.01, def: 0.85, unit: '' },
  { key: 'exposure', group: 'Post', label: 'Exposure', min: 0.2, max: 3, step: 0.01, def: 1.15, unit: '×' },
  { key: 'vignette', group: 'Post', label: 'Vignette', min: 0, max: 1, step: 0.01, def: 0.35, unit: '' },
  { key: 'grain', group: 'Post', label: 'Film grain', min: 0, max: 0.5, step: 0.005, def: 0.06, unit: '' },
  { key: 'chromatic', group: 'Post', label: 'Chromatic aberration', min: 0, max: 1, step: 0.01, def: 0.15, unit: '' },
]

export const PARAM_GROUPS = ['Camera', 'Disk', 'Background', 'Post']

const DEF_BY_KEY = new Map(PARAM_DEFS.map((d) => [d.key, d]))

export function paramDef(key) {
  return DEF_BY_KEY.get(key)
}

export const DEFAULT_PARAMS = Object.freeze(
  PARAM_DEFS.reduce((acc, d) => {
    acc[d.key] = d.def
    return acc
  }, {}),
)

export const DEFAULT_APP = Object.freeze({
  quality: 'high',
  preset: 0,
  debug: 0,
  hudVisible: true,
  cinemaPlaying: true,
  userHasTakenControl: false,
  contextLost: false,
})

// ---------------------------------------------------------------------------
// Live state. `params` and `app` are the mutable objects the render loop reads;
// `runtime` holds values that change every frame and must never trigger React.
// ---------------------------------------------------------------------------
const params = { ...DEFAULT_PARAMS }
const app = { ...DEFAULT_APP }
export const runtime = {
  time: 0, // simulated seconds, advanced by the render loop (frozen in capture mode)
  captureActive: false,
  captureTime: 0,
  frame: 0,
}

const listeners = new Set()
let version = 0
let snapshot = null
let persistTimer = null
let notifyTimer = null
let lastNotifyAt = 0
let suppressPersist = false
const NOTIFY_THROTTLE_MS = 250
const PERSIST_DEBOUNCE_MS = 300

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v
}

// Returns the cached frozen snapshot. A new object is produced only when the
// store actually changed, so `useSyncExternalStore` never sees a new identity
// twice for the same state.
export function getSnapshot() {
  if (snapshot === null) snapshot = buildSnapshot()
  return snapshot
}

function buildSnapshot() {
  return Object.freeze({
    version,
    params: Object.freeze({ ...params }),
    quality: app.quality,
    preset: app.preset,
    debug: app.debug,
    hudVisible: app.hudVisible,
    cinemaPlaying: app.cinemaPlaying,
    userHasTakenControl: app.userHasTakenControl,
    contextLost: app.contextLost,
    captureActive: runtime.captureActive,
  })
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getParams() {
  return params
}

export function getApp() {
  return app
}

function emit() {
  version += 1
  snapshot = buildSnapshot()
  for (const listener of Array.from(listeners)) {
    try {
      listener()
    } catch (err) {
      // A broken subscriber must not take the render loop down with it.
      console.error('[gargantua] store listener failed', err)
    }
  }
  if (suppressPersist) {
    suppressPersist = false
  } else {
    schedulePersist()
  }
}

// Same as emit() but at most every NOTIFY_THROTTLE_MS; used for camera values
// that OrbitControls rewrites continuously.
function emitThrottled() {
  const now = Date.now()
  const elapsed = now - lastNotifyAt
  if (elapsed >= NOTIFY_THROTTLE_MS) {
    lastNotifyAt = now
    emit()
    return
  }
  if (notifyTimer !== null) return
  notifyTimer = setTimeout(() => {
    notifyTimer = null
    lastNotifyAt = Date.now()
    emit()
  }, NOTIFY_THROTTLE_MS - elapsed)
}

// ---------------------------------------------------------------------------
// Parameter mutation
// ---------------------------------------------------------------------------
function coerce(def, value) {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return null
  return clamp(n, def.min, def.max)
}

// Keeps the annulus non-degenerate: the outer radius always stays more than
// 1 M beyond the inner one, so the disk never collapses to a line.
const DISK_GAP_MARGIN = 1.5

function repairDiskAnnulus(changedKey) {
  if (changedKey === 'diskInner' && params.diskOuter < params.diskInner + DISK_GAP_MARGIN) {
    params.diskOuter = clamp(
      params.diskInner + DISK_GAP_MARGIN,
      DEF_BY_KEY.get('diskOuter').min,
      DEF_BY_KEY.get('diskOuter').max,
    )
  } else if (changedKey === 'diskOuter' && params.diskInner > params.diskOuter - DISK_GAP_MARGIN) {
    params.diskInner = clamp(
      params.diskOuter - DISK_GAP_MARGIN,
      DEF_BY_KEY.get('diskInner').min,
      DEF_BY_KEY.get('diskInner').max,
    )
  }
}

export function setParam(key, value) {
  const def = DEF_BY_KEY.get(key)
  if (!def) return null
  const v = coerce(def, value)
  if (v === null) return null
  if (params[key] === v) return v
  params[key] = v
  repairDiskAnnulus(key)
  emit()
  return params[key]
}

export function setParams(patch) {
  let changed = false
  for (const key of Object.keys(patch)) {
    const def = DEF_BY_KEY.get(key)
    if (!def) continue
    const v = coerce(def, patch[key])
    if (v === null) continue
    if (params[key] !== v) {
      params[key] = v
      changed = true
    }
    repairDiskAnnulus(key)
  }
  if (changed) emit()
  return changed
}

export function resetParam(key) {
  const def = DEF_BY_KEY.get(key)
  if (!def) return null
  return setParam(key, def.def)
}

// Camera values written back from OrbitControls: no clamping surprises (they are
// already inside the ranges) and only a throttled notification.
export function syncCameraParams(fov, distance, azimuth, elevation) {
  params.fov = clamp(fov, DEF_BY_KEY.get('fov').min, DEF_BY_KEY.get('fov').max)
  params.camDistance = clamp(distance, DEF_BY_KEY.get('camDistance').min, DEF_BY_KEY.get('camDistance').max)
  params.camAzimuth = azimuth
  params.camElevation = clamp(elevation, DEF_BY_KEY.get('camElevation').min, DEF_BY_KEY.get('camElevation').max)
  emitThrottled()
}

// ---------------------------------------------------------------------------
// App state
// ---------------------------------------------------------------------------
export function setAppField(key, value) {
  if (!(key in app)) return false
  if (app[key] === value) return false
  app[key] = value
  emit()
  return true
}

export function setQuality(level) {
  if (!Object.prototype.hasOwnProperty.call(QUALITY_TIERS, level)) return false
  return setAppField('quality', level)
}

export function setPreset(index) {
  const i = normalizeInteger(index, 0, 3)
  if (i === null) return false
  return setAppField('preset', i)
}

export function setDebug(index) {
  const i = normalizeInteger(index, 0, 9)
  if (i === null) return false
  return setAppField('debug', i)
}

export function setHudVisible(visible) {
  return setAppField('hudVisible', !!visible)
}

export function setContextLost(lost) {
  return setAppField('contextLost', !!lost)
}

export function setCinemaPlaying(playing) {
  const next = !!playing
  if (next) app.userHasTakenControl = false
  return setAppField('cinemaPlaying', next)
}

// Any manual camera interaction hands control to the user for good, until they
// explicitly start the cinematic loop again with Space.
export function takeManualControl() {
  if (app.userHasTakenControl && !app.cinemaPlaying) return
  app.userHasTakenControl = true
  app.cinemaPlaying = false
  emit()
}

export function cycleQuality() {
  const i = QUALITY_ORDER.indexOf(app.quality)
  app.quality = QUALITY_ORDER[(i + 1) % QUALITY_ORDER.length]
  emit()
  return app.quality
}

export function normalizeInteger(value, lo, hi) {
  if (typeof value === 'number') {
    if (!Number.isInteger(value)) return null
    return value >= lo && value <= hi ? value : null
  }
  if (typeof value !== 'string') return null
  if (!/^[0-9]+$/.test(value)) return null
  const n = Number(value)
  return n >= lo && n <= hi ? n : null
}

// ---------------------------------------------------------------------------
// Reset
// ---------------------------------------------------------------------------
export function resetAll() {
  Object.assign(params, DEFAULT_PARAMS)
  Object.assign(app, DEFAULT_APP)
  app.cinemaPlaying = false // reset parks the cinematic loop
  runtime.time = 0
  if (runtime.captureActive) runtime.captureTime = 0
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.warn('[gargantua] could not clear persisted state', err)
  }
  suppressPersist = true
  emit()
}

// ---------------------------------------------------------------------------
// Persistence (localStorage, versioned, debounced)
// ---------------------------------------------------------------------------
function serialize() {
  return {
    version: STORAGE_VERSION,
    params: { ...params },
    quality: app.quality,
    preset: app.preset,
    debug: app.debug,
    hudVisible: app.hudVisible,
    cinemaPlaying: app.cinemaPlaying,
    userHasTakenControl: app.userHasTakenControl,
  }
}

function schedulePersist() {
  if (persistTimer !== null) clearTimeout(persistTimer)
  persistTimer = setTimeout(() => {
    persistTimer = null
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize()))
    } catch (err) {
      console.warn('[gargantua] could not persist state', err)
    }
  }, PERSIST_DEBOUNCE_MS)
}

// Reads localStorage and merges it over the defaults, clamping every value.
// Corrupt JSON, a missing key, or a different schema version all fall back to
// the defaults without throwing.
export function loadPersisted() {
  let raw = null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch (err) {
    return { loaded: false, reason: 'unavailable' }
  }
  if (!raw) return { loaded: false, reason: 'empty' }
  let data
  try {
    data = JSON.parse(raw)
  } catch (err) {
    return { loaded: false, reason: 'corrupt' }
  }
  if (!data || typeof data !== 'object' || data.version !== STORAGE_VERSION) {
    return { loaded: false, reason: 'version' }
  }
  if (data.params && typeof data.params === 'object') {
    for (const def of PARAM_DEFS) {
      const v = coerce(def, data.params[def.key])
      if (v !== null) params[def.key] = v
    }
  }
  // Restore the annulus invariant even if the stored pair was edited by hand.
  if (params.diskOuter < params.diskInner + DISK_GAP_MARGIN) {
    params.diskOuter = clamp(
      params.diskInner + DISK_GAP_MARGIN,
      DEF_BY_KEY.get('diskOuter').min,
      DEF_BY_KEY.get('diskOuter').max,
    )
  }
  if (typeof data.quality === 'string' && QUALITY_TIERS[data.quality]) app.quality = data.quality
  const preset = normalizeInteger(data.preset, 0, 3)
  if (preset !== null) app.preset = preset
  const debug = normalizeInteger(data.debug, 0, 9)
  if (debug !== null) app.debug = debug
  if (typeof data.hudVisible === 'boolean') app.hudVisible = data.hudVisible
  if (typeof data.cinemaPlaying === 'boolean') app.cinemaPlaying = data.cinemaPlaying
  if (typeof data.userHasTakenControl === 'boolean') app.userHasTakenControl = data.userHasTakenControl
  version += 1
  snapshot = null
  return { loaded: true, reason: 'ok' }
}

// ---------------------------------------------------------------------------
// Snapshot for the automation bridge (built fresh, includes live time)
// ---------------------------------------------------------------------------
export function liveState() {
  return {
    quality: app.quality,
    preset: app.preset,
    debug: app.debug,
    hud: app.hudVisible,
    time: runtime.time,
    cinemaPlaying: app.cinemaPlaying,
    userHasTakenControl: app.userHasTakenControl,
    contextLost: app.contextLost,
    capture: runtime.captureActive,
    params: { ...params },
  }
}

export function setTime(seconds) {
  const n = typeof seconds === 'number' ? seconds : Number(seconds)
  if (!Number.isFinite(n) || n < 0) return null
  runtime.time = n
  if (runtime.captureActive) runtime.captureTime = n
  return n
}

// Aggregate handle: the mutable state plus the whole mutation API in one place,
// mirroring how the rest of the app talks about "the store".
export const store = {
  subscribe,
  getSnapshot,
  getState: liveState,
  getParams,
  getApp,
  setParam,
  setParams,
  setState: setAppField,
  setQuality,
  setPreset,
  setDebug,
  setTime,
  setCinemaPlaying,
  resetAll,
}
