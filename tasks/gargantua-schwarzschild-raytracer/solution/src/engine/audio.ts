// Optional procedural ambient pad (WebAudio, no assets). Created lazily on
// the first enable gesture so browser autoplay policies are never violated.
export class AmbientAudio {
  private ctx: AudioContext | null = null;
  private enabled = false;

  setEnabled(on: boolean) {
    this.enabled = on;
    if (on) {
      this.start();
    } else if (this.ctx) {
      this.ctx.suspend().catch(() => undefined);
    }
  }

  private start() {
    try {
      if (!this.ctx) {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        this.ctx = new Ctor();
        this.buildGraph();
      }
      this.ctx.resume().catch(() => undefined);
    } catch {
      this.enabled = false;
    }
  }

  private buildGraph() {
    const ctx = this.ctx!;
    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);

    // low drone: three detuned oscillators through a slow-swelling lowpass
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 240;
    filter.Q.value = 0.6;
    filter.connect(master);

    const freqs = [55, 55.4, 82.5, 110.2];
    const gains = [0.5, 0.42, 0.3, 0.18];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = gains[i];
      osc.connect(g).connect(filter);
      osc.start();
    });

    // slow LFO breathing on the lowpass
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 90;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    master.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 3);
  }

  /** user gesture unlock (first pointerdown/keydown) */
  unlock() {
    if (this.enabled && this.ctx?.state === 'suspended') {
      this.ctx.resume().catch(() => undefined);
    }
  }

  dispose() {
    try {
      this.ctx?.close();
    } catch {
      /* ignore */
    }
    this.ctx = null;
  }
}
