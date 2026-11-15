// Optional procedural ambience. Created lazily inside a user gesture so the
// page never triggers an autoplay error; no audio asset or network is used.
export class AmbientAudio {
  constructor() {
    this.ctx = null;
    this.nodes = [];
    this.playing = false;
    this.error = null;
  }

  toggle(enabled) {
    const want = enabled ?? !this.playing;
    return want ? this.start() : this.stop();
  }

  start() {
    if (this.playing) return true;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) {
        this.error = 'WebAudio unavailable';
        return false;
      }
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.0;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 280;
      filter.Q.value = 0.6;
      filter.connect(master);
      master.connect(ctx.destination);

      const o1 = ctx.createOscillator();
      o1.type = 'sine';
      o1.frequency.value = 55;
      const o2 = ctx.createOscillator();
      o2.type = 'triangle';
      o2.frequency.value = 82.41;
      const o3 = ctx.createOscillator();
      o3.type = 'sine';
      o3.frequency.value = 110.3;
      o1.connect(filter);
      o2.connect(filter);
      o3.connect(filter);

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.018;
      lfo.connect(lfoGain);
      lfoGain.connect(master.gain);

      o1.start();
      o2.start();
      o3.start();
      lfo.start();
      master.gain.setTargetAtTime(0.045, ctx.currentTime, 1.2);

      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      this.ctx = ctx;
      this.nodes = [o1, o2, o3, lfo, lfoGain, master, filter];
      this.playing = true;
      this.error = null;
      return true;
    } catch (error) {
      this.error = String(error?.message ?? error);
      return false;
    }
  }

  stop() {
    if (!this.playing) return false;
    try {
      for (const n of this.nodes) {
        if (typeof n.stop === 'function') n.stop();
        n.disconnect();
      }
      this.ctx?.close().catch(() => {});
    } catch (error) {
      this.error = String(error?.message ?? error);
    }
    this.ctx = null;
    this.nodes = [];
    this.playing = false;
    return false;
  }

  dispose() {
    this.stop();
  }
}
