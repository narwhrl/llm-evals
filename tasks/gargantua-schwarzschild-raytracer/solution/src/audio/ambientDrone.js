// ambientDrone.js - Pure procedural Web Audio ambient cosmic synthesizer

class AmbientDroneSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.filter = null;
    this.lfo = null;
    this.oscillators = [];
  }

  initContext() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Resonant low-pass filter to create deep dark space rumble
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(160, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // LFO for slow breathing cosmic texture
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(45, this.ctx.currentTime);
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    this.lfo.start();

    // Detuned sub-bass oscillators
    // 55 Hz (A1), 54.7 Hz, 110 Hz (A2), 164.8 Hz (E3 fifth harmonic)
    const freqs = [55.0, 54.7, 110.2, 164.8];
    const types = ['sawtooth', 'triangle', 'sine', 'sine'];
    const gains = [0.12, 0.14, 0.08, 0.04];

    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = types[i];
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(gains[i], this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.filter);
      osc.start();
      this.oscillators.push(osc);
    });
  }

  toggle() {
    if (!this.isPlaying) {
      this.start();
      return true;
    } else {
      this.stop();
      return false;
    }
  }

  start() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.28, now + 2.0);
    this.isPlaying = true;
  }

  stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    this.isPlaying = false;
  }
}

export const ambientDrone = new AmbientDroneSynth();
