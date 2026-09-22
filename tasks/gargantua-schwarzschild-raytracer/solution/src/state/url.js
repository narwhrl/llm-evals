// URL screenshot-automation contract.
//
// Parsed exactly once, before the WebGL renderer is created, after the persisted
// state has been loaded. Keys that are present in the query override persisted
// state; keys that are absent leave it untouched. Values that are present but
// invalid fall back to the documented default instead of throwing, so a typo in
// a capture URL can never black-screen the page.

import {
  QUALITY_TIERS,
  normalizeInteger,
  runtime,
  setAppField,
  setDebug,
  setQuality,
  DEFAULT_APP,
} from './store.js'
import { applyPreset } from './presets.js'

const INTEGER_RE = /^[0-9]+$/
const TIME_RE = /^[0-9]+(\.[0-9]+)?$/

export const DEFAULT_CAPTURE_TIME = 0

function readKey(query, name) {
  return query.has(name) ? String(query.get(name)) : null
}

// Accepts only non-negative decimal seconds ("12", "12.5"); rejects "-3",
// "abc", "1e5", "+2", NaN, Infinity.
export function parseTime(raw) {
  if (raw === null) return DEFAULT_CAPTURE_TIME
  const trimmed = raw.trim()
  if (!TIME_RE.test(trimmed)) return DEFAULT_CAPTURE_TIME
  const n = Number(trimmed)
  if (!Number.isFinite(n) || n < 0) return DEFAULT_CAPTURE_TIME
  return n
}

// Integer parsing that rejects the traps of parseInt(): "0x3", "3abc", "1.0",
// " 7", "+7" are all invalid.
export function parseInteger(raw, lo, hi, fallback) {
  if (raw === null) return fallback
  const trimmed = raw.trim()
  if (!INTEGER_RE.test(trimmed)) return fallback
  const n = normalizeInteger(trimmed, lo, hi)
  return n === null ? fallback : n
}

export function parseQuality(raw) {
  if (raw === null) return DEFAULT_APP.quality
  const value = raw.trim().toLowerCase()
  return Object.prototype.hasOwnProperty.call(QUALITY_TIERS, value) ? value : DEFAULT_APP.quality
}

export function parseHud(raw) {
  if (raw === null) return DEFAULT_APP.hudVisible
  const trimmed = raw.trim()
  if (trimmed === '0') return false
  if (trimmed === '1') return true
  return DEFAULT_APP.hudVisible
}

export function parseUrlContract(search) {
  const query = new URLSearchParams(search || '')
  const raw = {
    capture: readKey(query, 'capture'),
    time: readKey(query, 'time'),
    quality: readKey(query, 'quality'),
    preset: readKey(query, 'preset'),
    debug: readKey(query, 'debug'),
    hud: readKey(query, 'hud'),
  }
  const report = {
    capture: raw.capture !== null && raw.capture.trim() === '1',
    time: parseTime(raw.time),
    quality: parseQuality(raw.quality),
    preset: parseInteger(raw.preset, 0, 3, 0),
    debug: parseInteger(raw.debug, 0, 9, 0),
    hud: parseHud(raw.hud),
    invalid: [],
  }

  const validQuality = (v) => Object.prototype.hasOwnProperty.call(QUALITY_TIERS, v.trim().toLowerCase())
  const checks = [
    ['capture', raw.capture !== null && !['0', '1'].includes(raw.capture.trim())],
    ['time', raw.time !== null && !TIME_RE.test(raw.time.trim())],
    ['quality', raw.quality !== null && !validQuality(raw.quality)],
    ['preset', raw.preset !== null && normalizeInteger(raw.preset.trim(), 0, 3) === null],
    ['debug', raw.debug !== null && normalizeInteger(raw.debug.trim(), 0, 9) === null],
    ['hud', raw.hud !== null && !['0', '1'].includes(raw.hud.trim())],
  ]
  for (const [name, bad] of checks) {
    if (bad) report.invalid.push(name)
  }
  return report
}

export function applyUrlContract(search) {
  const report = parseUrlContract(search)
  const query = new URLSearchParams(search || '')

  runtime.captureActive = report.capture
  runtime.captureTime = report.time
  runtime.time = report.time

  if (query.has('quality')) setQuality(report.quality)
  if (query.has('preset')) applyPreset(report.preset)
  if (query.has('debug')) setDebug(report.debug)
  if (query.has('hud')) setAppField('hudVisible', report.hud)

  if (report.capture) {
    // Capture mode: no cinematic loop, no non-deterministic time advance.
    setAppField('cinemaPlaying', false)
    setAppField('userHasTakenControl', true)
  }
  return report
}
