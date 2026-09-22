// Global keyboard shortcuts. Inputs and textareas keep their own keys.

import {
  cycleQuality,
  getApp,
  resetAll,
  setCinemaPlaying,
  setDebug,
  setHudVisible,
} from '../state/store.js'
import { applyPreset } from '../state/presets.js'

export const SHORTCUTS = [
  { keys: '0 – 9', label: 'Debug views' },
  { keys: 'Shift + 1 – 4', label: 'Camera presets' },
  { keys: 'Space', label: 'Cinema play / pause' },
  { keys: 'H', label: 'Show / hide HUD' },
  { keys: 'R', label: 'Reset everything' },
  { keys: 'Q', label: 'Cycle quality tier' },
]

function isTypingTarget(target) {
  if (!target || typeof target.tagName !== 'string') return false
  const tag = target.tagName.toUpperCase()
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable === true
}

function digitFromCode(code) {
  const match = /^(?:Digit|Numpad)([0-9])$/.exec(code || '')
  return match ? Number(match[1]) : null
}

export function handleShortcut(event) {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return false
  if (isTypingTarget(event.target)) return false

  if (event.code === 'Space' || event.key === ' ') {
    event.preventDefault()
    setCinemaPlaying(!getApp().cinemaPlaying)
    return true
  }

  const digit = digitFromCode(event.code)

  if (event.shiftKey) {
    if (digit !== null && digit >= 1 && digit <= 4) {
      event.preventDefault()
      applyPreset(digit - 1)
      return true
    }
    return false
  }

  if (digit !== null) {
    event.preventDefault()
    setDebug(digit)
    return true
  }

  switch (event.key) {
    case 'h':
    case 'H':
      setHudVisible(!getApp().hudVisible)
      return true
    case 'r':
    case 'R':
      resetAll()
      return true
    case 'q':
    case 'Q':
      cycleQuality()
      return true
    default:
      return false
  }
}

export function installShortcuts() {
  const listener = (event) => {
    try {
      handleShortcut(event)
    } catch (err) {
      console.error('[gargantua] shortcut failed', err)
    }
  }
  window.addEventListener('keydown', listener)
  return () => window.removeEventListener('keydown', listener)
}
