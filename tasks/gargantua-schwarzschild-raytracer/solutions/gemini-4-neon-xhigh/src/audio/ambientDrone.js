/**
 * 100% procedural Web Audio API deep-space harmonic drone.
 * Off by default; never instantiates AudioContext until user explicitly toggles it.
 * Automatically disabled in capture=1 mode so zero autoplay warnings ever occur.
 */
export class AmbientDrone {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.nodes = [];
    this.enabled = false;
  }

  _initGraph() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, ctx.currentTime);
    filter.Q.setValueAtTime(1.4, ctx.currentTime);
    filter.connect(masterGain);

    // Sub-harmonic celestial chord (D1, A1, D2, F#2 slightly detuned)
    const voices = [
      { type: 'sine', freq: 36.71, gain: 0.24 },
      { type: 'triangle', freq: 55.0, gain: 0.12 },
      { type: 'sine', freq: 73.42, gain: 0.09 },
      { type: 'sine', freq: 110.22, gain: 0.05 },
    ];

    const nodes = [masterGain, filter];
    for (const v of voices) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = v.type;
      osc.frequency.setValueAtTime(v.freq, ctx.currentTime);
      g.gain.setValueAtTime(v.gain, ctx.currentTime);
      osc.connect(g);
      g.connect(filter);
      osc.start();
      nodes.push(osc, g);
    }

    // Slow cosmic breath LFO modulating filter cutoff
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.065, ctx.currentTime);
    lfoGain.gain.setValueAtTime(95, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    nodes.push(lfo, lfoGain);

    // Soft filtered procedural space noise (in-memory AudioBuffer, zero remote assets)
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i += 1) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 2.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.06, ctx.currentTime);
    noise.connect(noiseGain);
    noiseGain.connect(filter);
    noise.start();
    nodes.push(noise, noiseGain);

    this.ctx = ctx;
    this.masterGain = masterGain;
    this.nodes = nodes;
    return true;
  }

  async setEnabled(nextEnabled) {
    const target = Boolean(nextEnabled);
    if (!target) {
      this.enabled = false;
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0.0001, now, 0.18);
      }
      return false;
    }

    try {
      if (!this.ctx && !this._initGraph()) {
        this.enabled = false;
        return false;
      }
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.28, now, 0.35);
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
        // Ignore close errors during teardown
      }
      this.ctx = null;
      this.masterGain = null;
      this.nodes = [];
    }
  }
}
