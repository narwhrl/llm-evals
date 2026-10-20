/**
 * The sound of the pencil.
 *
 * Everything is synthesised, so the piece ships no audio file and needs no
 * network. The context is created on the first gesture, as browsers require.
 */

type Ctx = AudioContext & { __noise?: AudioBuffer };

let context: Ctx | null = null;
let enabled = true;
let master: GainNode | null = null;

function ensure(): Ctx | null {
  if (typeof window === "undefined") return null;
  if (!context) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor() as Ctx;
    master = context.createGain();
    master.gain.value = 0.5;
    master.connect(context.destination);
  }
  if (context.state === "suspended") void context.resume();
  return context;
}

function noiseBuffer(ctx: Ctx): AudioBuffer {
  if (ctx.__noise) return ctx.__noise;
  const length = Math.floor(ctx.sampleRate * 0.6);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  ctx.__noise = buffer;
  return buffer;
}

export function setSoundEnabled(on: boolean): void {
  enabled = on;
}

export function soundEnabled(): boolean {
  return enabled;
}

/** A pencil dragged across paper: a short, filtered scrape. */
export function scratch(intensity = 1): void {
  const ctx = ensure();
  if (!ctx || !enabled || !master) return;
  const now = ctx.currentTime;
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer(ctx);
  source.playbackRate.value = 0.8 + Math.random() * 0.4;

  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(2600 + Math.random() * 900, now);
  band.frequency.exponentialRampToValueAtTime(1200, now + 0.16);
  band.Q.value = 1.1;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.16 * intensity, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);

  source.connect(band).connect(gain).connect(master);
  source.start(now);
  source.stop(now + 0.22);
}

/** The proof stage advancing: a small mechanical clack. */
export function clack(): void {
  const ctx = ensure();
  if (!ctx || !enabled || !master) return;
  const now = ctx.currentTime;

  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer(ctx);
  const high = ctx.createBiquadFilter();
  high.type = "highpass";
  high.frequency.value = 1800;
  const highGain = ctx.createGain();
  highGain.gain.setValueAtTime(0.14, now);
  highGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
  source.connect(high).connect(highGain).connect(master);
  source.start(now);
  source.stop(now + 0.09);

  const body = ctx.createOscillator();
  body.type = "triangle";
  body.frequency.setValueAtTime(220, now);
  body.frequency.exponentialRampToValueAtTime(90, now + 0.1);
  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0.09, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  body.connect(bodyGain).connect(master);
  body.start(now);
  body.stop(now + 0.14);
}

/** The press: paper moving and the platen coming down. */
export function press(): void {
  const ctx = ensure();
  if (!ctx || !enabled || !master) return;
  const now = ctx.currentTime;

  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer(ctx);
  const low = ctx.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.setValueAtTime(400, now);
  low.frequency.exponentialRampToValueAtTime(1800, now + 0.5);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.35);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
  source.connect(low).connect(gain).connect(master);
  source.start(now);
  source.stop(now + 0.75);

  const thud = ctx.createOscillator();
  thud.type = "sine";
  thud.frequency.setValueAtTime(150, now + 0.42);
  thud.frequency.exponentialRampToValueAtTime(48, now + 0.72);
  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0.0001, now + 0.42);
  thudGain.gain.exponentialRampToValueAtTime(0.2, now + 0.46);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
  thud.connect(thudGain).connect(master);
  thud.start(now + 0.42);
  thud.stop(now + 0.85);
}

/** A wrong guess in blind proof mode: one dull, flat knock. */
export function thud(): void {
  const ctx = ensure();
  if (!ctx || !enabled || !master) return;
  const now = ctx.currentTime;
  const body = ctx.createOscillator();
  body.type = "sine";
  body.frequency.setValueAtTime(140, now);
  body.frequency.exponentialRampToValueAtTime(84, now + 0.16);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  body.connect(gain).connect(master);
  body.start(now);
  body.stop(now + 0.22);
}
