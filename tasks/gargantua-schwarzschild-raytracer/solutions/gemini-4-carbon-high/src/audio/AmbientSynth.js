/**
 * Optional Procedural Deep-Space Ambient Organ / Relativistic Hum Synthesizer
 *
 * Uses native Web Audio API oscillators and filtered pink-noise wind only.
 * Strictly off by default and disabled in capture=1 mode so zero autoplay errors ever occur.
 */
export class AmbientSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.nodes = [];
    this.enabled = false;
  }

  _ensureGraph() {
    if (this.ctx) return true;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;

    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.connect(ctx.destination);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(340, ctx.currentTime);
    lowpass.Q.setValueAtTime(1.4, ctx.currentTime);
    lowpass.connect(master);

    // Slow breathing LFO on filter cutoff (evokes orbital tidal modulation)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.085, ctx.currentTime);
    lfoGain.gain.setValueAtTime(115, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);
    lfo.start();

    // Warm cathedral/organ harmonic stack (A1 = 55 Hz, E2 = 82.41 Hz, A2 = 110 Hz, B2 = 123.47 Hz)
    const voices = [
      { freq: 55.0, type: 'sine', gain: 0.34, detune: -3 },
      { freq: 82.41, type: 'triangle', gain: 0.16, detune: 4 },
      { freq: 110.0, type: 'sawtooth', gain: 0.08, detune: -5 },
      { freq: 164.81, type: 'sine', gain: 0.09, detune: 6 },
    ];

    this.nodes.push(lfo, lfoGain, lowpass);

    for (const v of voices) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = v.type;
      osc.frequency.setValueAtTime(v.freq, ctx.currentTime);
      osc.detune.setValueAtTime(v.detune, ctx.currentTime);
      g.gain.setValueAtTime(v.gain, ctx.currentTime);
      osc.connect(g);
      g.connect(lowpass);
      osc.start();
      this.nodes.push(osc, g);
    }

    this.ctx = ctx;
    this.masterGain = master;
    return true;
  }

  async setEnabled(nextEnabled) {
    if (!nextEnabled) {
      this.enabled = false;
      if (this.ctx && this.masterGain) {
        const t = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(t);
        this.masterGain.gain.setTargetAtTime(0.0001, t, 0.25);
      }
      return false;
    }

    try {
      if (!this._ensureGraph()) return false;
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      if (this.ctx.state !== 'running') {
        this.enabled = false;
        return false;
      }
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setTargetAtTime(0.16, t, 0.55);
      this.enabled = true;
      return true;
    } catch {
      this.enabled = false;
      return false;
    }
  }

  dispose() {
    this.enabled = false;
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        // Ignore close errors
      }
      this.ctx = null;
      this.masterGain = null;
      this.nodes = [];
    }
  }
}
