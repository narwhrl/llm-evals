/**
 * Optional ambient audio: a fully procedural Web Audio drone, no files, no network.
 *
 * The context is created lazily on the first user gesture that enables it, so a page load can never
 * trip the browser's autoplay policy, and the whole module degrades to a no-op when Web Audio is
 * unavailable. Capture runs never call into it.
 */
export function createAmbientAudio() {
  let context = null
  let master = null
  let nodes = []
  let running = false
  let unavailable = false

  function build() {
    if (context) return true
    const Ctor = typeof window !== 'undefined' ? window.AudioContext || window.webkitAudioContext : null
    if (!Ctor) {
      unavailable = true
      return false
    }
    try {
      context = new Ctor()
    } catch {
      unavailable = true
      return false
    }

    master = context.createGain()
    master.gain.value = 0

    // Two deep partials a fifth apart plus a slow detuned shimmer, all under a low-pass so the
    // result reads as a room tone rather than a tone burst.
    const filter = context.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 420
    filter.Q.value = 0.6

    const base = [55, 82.5, 110.3]
    for (const [index, frequency] of base.entries()) {
      const oscillator = context.createOscillator()
      oscillator.type = index === 2 ? 'triangle' : 'sine'
      oscillator.frequency.value = frequency
      const gain = context.createGain()
      gain.gain.value = index === 2 ? 0.045 : 0.11 / (index + 1)
      oscillator.connect(gain).connect(filter)
      oscillator.start()
      nodes.push(oscillator, gain)
    }

    // Slow amplitude breathing.
    const lfo = context.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.045
    const lfoGain = context.createGain()
    lfoGain.gain.value = 0.05
    lfo.connect(lfoGain).connect(master.gain)
    lfo.start()
    nodes.push(lfo, lfoGain)

    filter.connect(master)
    master.connect(context.destination)
    nodes.push(filter)
    return true
  }

  function start() {
    if (!build()) return false
    if (context.state === 'suspended') context.resume().catch(() => {})
    running = true
    const now = context.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setTargetAtTime(0.16, now, 1.4)
    return true
  }

  function stop() {
    if (!context || !master) {
      running = false
      return
    }
    running = false
    const now = context.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setTargetAtTime(0, now, 0.35)
  }

  function dispose() {
    running = false
    for (const node of nodes) {
      try {
        if (typeof node.stop === 'function') node.stop()
        node.disconnect()
      } catch {
        // A node already torn down needs no further action.
      }
    }
    nodes = []
    if (context) {
      context.close().catch(() => {})
      context = null
    }
  }

  return {
    start,
    stop,
    dispose,
    get running() {
      return running
    },
    get unavailable() {
      return unavailable
    },
  }
}
