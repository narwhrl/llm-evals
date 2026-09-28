/**
 * Keyboard shortcuts. Matching is done on `KeyboardEvent.code` so the digits and letters work on any
 * layout, and text entry is never intercepted.
 *
 *   0-9          debug view
 *   Shift+1-4    camera preset
 *   Space        play / pause the cinematic loop
 *   H            show / hide the HUD
 *   R            reset everything
 *   Q            cycle the quality tier
 *   M            ambient audio
 */
import { useEffect } from 'react'
import { PRESETS, QUALITY_LEVELS } from '../state/schema.js'

const DIGIT_CODES = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9']

function isTextEntry(target) {
  if (!target || !target.tagName) return false
  const tag = target.tagName.toLowerCase()
  if (tag === 'textarea' || tag === 'select') return true
  if (tag === 'input') {
    const type = (target.type || 'text').toLowerCase()
    return type !== 'range' && type !== 'checkbox' && type !== 'radio' && type !== 'button'
  }
  return target.isContentEditable === true
}

function codeToDigit(event) {
  const index = DIGIT_CODES.indexOf(event.code)
  if (index >= 0) return index
  // Fallback for synthetic events that carry only `key`.
  if (/^[0-9]$/.test(event.key || '')) return Number(event.key)
  return -1
}

export function useShortcuts({ store, engine, audio }) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    function onKeyDown(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (isTextEntry(event.target)) return

      const digit = codeToDigit(event)

      if (digit >= 0 && !event.shiftKey) {
        event.preventDefault()
        store.setDebug(digit)
        return
      }

      if (digit >= 1 && digit <= PRESETS.length && event.shiftKey) {
        event.preventDefault()
        store.setPreset(digit - 1)
        return
      }

      switch (event.code) {
        case 'Space': {
          event.preventDefault()
          store.toggleCinematic()
          return
        }
        case 'KeyH': {
          event.preventDefault()
          store.toggleHud()
          return
        }
        case 'KeyR': {
          event.preventDefault()
          store.reset()
          return
        }
        case 'KeyQ': {
          event.preventDefault()
          store.cycleQuality()
          return
        }
        case 'KeyM': {
          event.preventDefault()
          store.toggleAudio()
          return
        }
        default:
          return
      }
    }

    window.addEventListener('keydown', onKeyDown, { passive: false })
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [store, engine, audio])

  // Keep the audio engine aligned with the store, and silent under capture.
  useEffect(
    () =>
      store.subscribe((state) => {
        if (!audio) return
        const wanted = state.audio && !state.capture
        if (wanted && !audio.running) audio.start()
        if (!wanted && audio.running) audio.stop()
      }),
    [store, audio],
  )
}

export { QUALITY_LEVELS }
