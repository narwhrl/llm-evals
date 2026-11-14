/**
 * Optional local procedural WebAudio cosmic drone synthesizer.
 * Zero network/file dependencies; strictly user-initiated and disabled in capture=1 mode.
 */
export class AmbientDrone {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.nodes = [];
    this.active = false;
  }

  setEnabled(enabled) {
    if (enabled === this.active) return this.active;
    if (enabled) {
      return this.start();
    }
    this.stop();
    return false;
  }

  start() {
    if (typeof window === 'undefined') return false;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;

    try {
      if (!this.ctx) {
        this.ctx = new AudioCtx();
        this.buildGraph();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.11, now + 1.2);
      this.active = true;
      return true;
    } catch {
      this.active = false;
      return false;
    }
  }

  buildGraph() {
    const ctx = this.ctx;
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    this.masterGain = master;

    // Deep relativistic gravitational sub-bass fifths (D1 / A1 / D2)
    const freqs = [36.71, 55.0, 73.42, 110.2];
    const types = ['sine', 'triangle', 'sine', 'sine'];
    const gains = [0.42, 0.22, 0.18, 0.08];

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 190;
    filter.Q.value = 1.8;
    filter.connect(master);

    // Slow breathing LFO modulating filter cutoff
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.085;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 65;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.nodes.push(lfo);

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = types[i];
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = gains[i];
      osc.connect(g);
      g.connect(filter);
      osc.start();
      this.nodes.push(osc);
    });

    // Procedural filtered cosmic dust noise buffer
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 140;
    noiseFilter.Q.value = 0.9;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.22;

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    this.nodes.push(noise);
  }

  stop() {
    if (!this.ctx || !this.masterGain) {
      this.active = false;
      return;
    }
    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
    } catch {
      // Ignore audio shutdown errors
    }
    this.active = false;
  }

  dispose() {
    this.stop();
    for (const node of this.nodes) {
      try {
        node.stop?.();
        node.disconnect?.();
      } catch {
        // Ignore
      }
    }
    this.nodes = [];
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}
