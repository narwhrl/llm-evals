/**
 * Procedural ambient drone.  No audio files are shipped and nothing is
 * fetched: the sound is synthesised with two detuned oscillators, a noise bed
 * and a slowly moving low pass filter.
 *
 * The AudioContext is created lazily on the first user gesture (the M key or
 * the HUD button) so that no browser ever reports an autoplay error.
 */
export class AmbientAudio {
  constructor() {
    this.context = null;
    this.master = null;
    this.enabled = false;
    this.failed = false;
  }

  build() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      this.failed = true;
      return false;
    }
    const ctx = new AudioCtx();
    this.context = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);
    this.master = master;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 320;
    filter.Q.value = 1.4;
    filter.connect(master);

    // Two detuned low oscillators -> the fundamental drone.
    for (const [frequency, detune, gain] of [[55, -6, 0.55], [82.5, 7, 0.28], [110, 3, 0.16]]) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = frequency;
      osc.detune.value = detune;
      const g = ctx.createGain();
      g.gain.value = gain;
      osc.connect(g).connect(filter);
      osc.start();

      // Slow amplitude drift so the drone never sits still.
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.03 + Math.random() * 0.05;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = gain * 0.45;
      lfo.connect(lfoGain).connect(g.gain);
      lfo.start();
    }

    // Filter sweep.
    const sweep = ctx.createOscillator();
    sweep.type = 'sine';
    sweep.frequency.value = 0.021;
    const sweepGain = ctx.createGain();
    sweepGain.gain.value = 140;
    sweep.connect(sweepGain).connect(filter.frequency);
    sweep.start();

    // A very quiet filtered noise bed.
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 640;
    noiseFilter.Q.value = 0.6;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.035;
    noise.connect(noiseFilter).connect(noiseGain).connect(master);
    noise.start();

    return true;
  }

  async enable() {
    if (this.failed) return false;
    try {
      if (!this.context && !this.build()) return false;
      if (this.context.state === 'suspended') await this.context.resume();
      this.master.gain.setTargetAtTime(0.085, this.context.currentTime, 1.2);
      this.enabled = true;
      return true;
    } catch {
      this.enabled = false;
      return false;
    }
  }

  disable() {
    if (!this.context || !this.master) {
      this.enabled = false;
      return false;
    }
    try {
      this.master.gain.setTargetAtTime(0.0, this.context.currentTime, 0.35);
    } catch {
      /* the context may already be gone */
    }
    this.enabled = false;
    return true;
  }

  async toggle() {
    if (this.enabled) {
      this.disable();
      return false;
    }
    return this.enable();
  }
}
