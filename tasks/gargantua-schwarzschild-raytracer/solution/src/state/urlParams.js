/**
 * The URL capture contract.
 *
 *   ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
 *
 * `capture=1` stops the cinematic loop, freezes simulation time at `time` (a finite, non-negative
 * number of seconds, default 0) and disables the optional audio. Every query value is validated
 * here — before the first frame is rendered — and an illegal value falls back to its default
 * instead of producing an exception or a blank canvas.
 */
import { DEBUG_VIEWS, PRESETS, QUALITY_LEVELS } from './schema.js'

const QUALITY_ALIASES = new Map(QUALITY_LEVELS.map((level) => [level.toLowerCase(), level]))

function parseFlag(value) {
  if (value === '1' || value === 'true') return true
  if (value === '0' || value === 'false') return false
  return undefined
}

function parseIndex(value, max) {
  if (value === null || value === '') return undefined
  if (!/^-?\d+$/.test(value.trim())) return undefined
  const numeric = Number.parseInt(value, 10)
  if (numeric < 0 || numeric > max) return undefined
  return numeric
}

function parseTime(value) {
  if (value === null || value === '') return undefined
  const numeric = Number(value)
  if (!Number.isFinite(numeric) || numeric < 0) return undefined
  return numeric
}

/**
 * Parses the capture URL. Always returns a complete, safe patch: unrecognised or illegal values are
 * reported in `rejected` and simply left out, so applying the patch can never move the app out of
 * its valid range.
 */
export function parseCaptureUrl(search) {
  const params = new URLSearchParams(search || '')
  const patch = {}
  const rejected = []

  const capture = parseFlag(params.get('capture'))
  if (capture === undefined) {
    if (params.has('capture')) rejected.push('capture')
  } else {
    patch.capture = capture
  }

  if (params.has('quality')) {
    const quality = QUALITY_ALIASES.get((params.get('quality') || '').trim().toLowerCase())
    if (quality) patch.quality = quality
    else rejected.push('quality')
  }

  if (params.has('preset')) {
    const preset = parseIndex(params.get('preset'), PRESETS.length - 1)
    if (preset === undefined) rejected.push('preset')
    else patch.preset = preset
  }

  if (params.has('debug')) {
    const debug = parseIndex(params.get('debug'), DEBUG_VIEWS.length - 1)
    if (debug === undefined) rejected.push('debug')
    else patch.debug = debug
  }

  if (params.has('time')) {
    const time = parseTime(params.get('time'))
    if (time === undefined) rejected.push('time')
    else patch.time = time
  }

  if (params.has('hud')) {
    const hud = parseFlag(params.get('hud'))
    if (hud === undefined) rejected.push('hud')
    else patch.hudOpen = hud
  }

  // `time` defaults to 0 whenever capture mode is requested without an explicit value.
  if (patch.capture && patch.time === undefined) patch.time = 0

  return { patch, rejected, isCapture: patch.capture === true }
}
