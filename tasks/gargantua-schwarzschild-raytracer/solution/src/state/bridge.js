// `window.__GARGANTUA__` — the automation surface used by the screenshot harness.
//
// Installed immediately (with `ready === false`) so a harvester that polls early
// always finds the object; `ready` flips to true once the shader has compiled, the
// first frame has been rendered, and the URL contract has been applied.
//
// Every method validates its input and never throws: invalid input returns null.

import { QUALITY_TIERS, normalizeInteger, store } from './store.js'
import { applyPreset } from './presets.js'

export const BRIDGE_KEY = '__GARGANTUA__'

let ready = false
const readyWaiters = new Set()

function frozenState() {
  const state = store.getState()
  return Object.freeze({
    ...state,
    params: Object.freeze(state.params),
  })
}

function validateQuality(level) {
  if (typeof level !== 'string') return null
  const key = level.trim().toLowerCase()
  return Object.prototype.hasOwnProperty.call(QUALITY_TIERS, key) ? key : null
}

function validateSeconds(value) {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

const api = {
  get ready() {
    return ready
  },

  getState() {
    try {
      return frozenState()
    } catch (err) {
      console.error('[gargantua] getState failed', err)
      return null
    }
  },

  setQuality(level) {
    try {
      const key = validateQuality(level)
      if (key === null) return null
      store.setQuality(key)
      return frozenState()
    } catch (err) {
      console.error('[gargantua] setQuality failed', err)
      return null
    }
  },

  setPreset(index) {
    try {
      const i = normalizeInteger(index, 0, 3)
      if (i === null) return null
      applyPreset(i)
      return frozenState()
    } catch (err) {
      console.error('[gargantua] setPreset failed', err)
      return null
    }
  },

  setDebug(index) {
    try {
      const i = normalizeInteger(index, 0, 9)
      if (i === null) return null
      store.setDebug(i)
      return frozenState()
    } catch (err) {
      console.error('[gargantua] setDebug failed', err)
      return null
    }
  },

  setTime(seconds) {
    try {
      const s = validateSeconds(seconds)
      if (s === null) return null
      store.setTime(s)
      return frozenState()
    } catch (err) {
      console.error('[gargantua] setTime failed', err)
      return null
    }
  },

  setCinema(playing) {
    try {
      if (typeof playing !== 'boolean') return null
      store.setCinemaPlaying(playing)
      return frozenState()
    } catch (err) {
      console.error('[gargantua] setCinema failed', err)
      return null
    }
  },

  // Resolves once the first frame is on screen; used by tooling that wants a
  // deterministic handshake instead of polling the ready flag.
  whenReady(timeoutMs = 60000) {
    if (ready) return Promise.resolve(true)
    const ms = validateSeconds(timeoutMs) ?? 60000
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        readyWaiters.delete(waiter)
        resolve(false)
      }, ms)
      const waiter = () => {
        clearTimeout(timer)
        resolve(true)
      }
      readyWaiters.add(waiter)
    })
  },
}

export function installBridge() {
  if (typeof window === 'undefined') return api
  if (window[BRIDGE_KEY] && window[BRIDGE_KEY].__installed) return window[BRIDGE_KEY]
  Object.defineProperty(api, '__installed', { value: true, enumerable: false })
  window[BRIDGE_KEY] = api
  return api
}

// Called by the renderer once shader compilation and the first successful
// composer render have completed and the URL contract is applied.
export function markReady() {
  if (ready) return
  ready = true
  try {
    document.documentElement.dataset.gargantuaReady = 'true'
  } catch (err) {
    console.error('[gargantua] could not set ready dataset', err)
  }
  for (const waiter of Array.from(readyWaiters)) waiter()
  readyWaiters.clear()
}
