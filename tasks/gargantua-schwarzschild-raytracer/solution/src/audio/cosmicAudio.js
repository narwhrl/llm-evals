// Procedural Web Audio Cosmic Organ & Relativistic Sub-Drone
// Strictly lazy-initialized on explicit user gesture; zero external audio files.

export class CosmicAudioController {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.nodes = [];
    this.lfoTimer = null;
    this.enabled = false;
  }

  initGraph() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    this.ctx = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.masterGain = masterGain;

    // Warm low-pass filter modulated by slow breathing LFO
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(360, ctx.currentTime);
    filter.Q.setValueAtTime(1.4, ctx.currentTime);

    // Stereo space echo network
    const dryGain = ctx.createGain();
    dryGain.gain.value = 0.68;
    const delayL = ctx.createDelay(2.0);
    const delayR = ctx.createDelay(2.0);
    delayL.delayTime.value = 0.43;
    delayR.delayTime.value = 0.61;

    const fbGain = ctx.createGain();
    fbGain.gain.value = 0.36;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.34;

    filter.connect(dryGain);
    dryGain.connect(masterGain);

    filter.connect(delayL);
    delayL.connect(delayR);
    delayR.connect(fbGain);
    fbGain.connect(delayL);
    delayL.connect(wetGain);
    delayR.connect(wetGain);
    wetGain.connect(masterGain);

    // Pipe-organ inspired D2 - A2 - D3 - E3 - A3 harmonic voicing
    const voices = [
      { freq: 73.42, type: 'sine', detune: -3, amp: 0.28 },
      { freq: 110.0, type: 'triangle', detune: 4, amp: 0.16 },
      { freq: 146.83, type: 'sine', detune: -5, amp: 0.18 },
      { freq: 164.81, type: 'sine', detune: 6, amp: 0.09 },
      { freq: 220.0, type: 'triangle', detune: -4, amp: 0.07 },
    ];

    for (const v of voices) {
      const osc = ctx.createOscillator();
      const vGain = ctx.createGain();
      osc.type = v.type;
      osc.frequency.setValueAtTime(v.freq, ctx.currentTime);
      osc.detune.setValueAtTime(v.detune, ctx.currentTime);
      vGain.gain.setValueAtTime(v.amp, ctx.currentTime);
      osc.connect(vGain);
      vGain.connect(filter);
      osc.start();
      this.nodes.push(osc, vGain);
    }

    // Slow LFO sweeping filter cutoff between 220 Hz and 540 Hz
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.07, ctx.currentTime);
    lfoGain.gain.setValueAtTime(150, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.nodes.push(lfo, lfoGain, filter, dryGain, delayL, delayR, fbGain, wetGain);
  }

  async setEnabled(nextEnabled) {
    const target = Boolean(nextEnabled);
    this.enabled = target;

    if (!target) {
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0.0001, now, 0.18);
      }
      return false;
    }

    try {
      this.initGraph();
      if (!this.ctx) {
        this.enabled = false;
        return false;
      }
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.18, now, 0.45);
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
