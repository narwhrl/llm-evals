// Optional procedural ambience (M to toggle). Entirely synthesised with the
// Web Audio API — no audio files, no network. The AudioContext is only
// created from a user gesture (HUD button or the M key), so the default-off
// state can never trigger an autoplay error.
export class Ambience {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private nodes: AudioNode[] = [];

  get enabled(): boolean {
    return this.ctx !== null;
  }

  setEnabled(on: boolean): boolean {
    if (on === this.enabled) return true;
    if (on) return this.start();
    this.stop();
    return true;
  }

  private start(): boolean {
    try {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return false;
      const ctx = new Ctor();
      if (ctx.state === "suspended") void ctx.resume();

      const master = ctx.createGain();
      master.gain.value = 0;
      master.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 1.5);
      master.connect(ctx.destination);

      // Low drone: two slightly detuned sines through a gentle lowpass.
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 240;
      lowpass.Q.value = 0.4;
      lowpass.connect(master);
      for (const [freq, gain] of [
        [48, 0.30],
        [72.4, 0.16],
        [96.8, 0.07],
      ] as const) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.value = gain;
        osc.connect(g).connect(lowpass);
        osc.start();
        this.nodes.push(osc, g);
      }

      // Brown-noise rumble through a bandpass.
      const len = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = 110;
      band.Q.value = 0.65;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.22;
      noise.connect(band).connect(noiseGain).connect(master);
      noise.start();
      this.nodes.push(noise, band, noiseGain);

      // Very slow breathing of the drone.
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 50;
      lfo.connect(lfoGain).connect(lowpass.frequency);
      lfo.start();
      this.nodes.push(lfo, lfoGain);

      this.ctx = ctx;
      this.master = master;
      return true;
    } catch {
      this.cleanup();
      return false;
    }
  }

  private stop(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const master = this.master;
    this.ctx = null;
    this.master = null;
    try {
      if (master) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
      }
    } catch {
      // ignore
    }
    window.setTimeout(() => {
      for (const n of this.nodes) {
        try {
          (n as OscillatorNode).stop?.();
        } catch {
          // already stopped
        }
        try {
          n.disconnect();
        } catch {
          // already disconnected
        }
      }
      this.nodes = [];
      void ctx.close().catch(() => undefined);
    }, 300);
  }

  private cleanup(): void {
    this.ctx = null;
    this.master = null;
    for (const n of this.nodes) {
      try {
        (n as OscillatorNode).stop?.();
      } catch {
        // ignore
      }
    }
    this.nodes = [];
  }
}
