function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

const SHOT = {
  rifle: { freq: 150, dur: 0.11, noise: 1400, gain: 0.42 },
  carbine: { freq: 190, dur: 0.08, noise: 1700, gain: 0.34 },
  smg: { freq: 240, dur: 0.045, noise: 2000, gain: 0.22 },
  pistol: { freq: 110, dur: 0.09, noise: 900, gain: 0.4 },
  bolt: { freq: 80, dur: 0.22, noise: 700, gain: 0.7 },
};

export function createAudio() {
  let ctx = null;
  let master = null;
  let noiseBuffer = null;

  function ensure() {
    if (ctx) return ctx.state !== "closed";
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return false;
    ctx = new Context();
    master = ctx.createGain();
    master.gain.value = 0.42;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 8;
    comp.ratio.value = 7;
    comp.attack.value = 0.003;
    comp.release.value = 0.18;
    master.connect(comp);
    comp.connect(ctx.destination);
    const length = ctx.sampleRate;
    noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    const sea = ctx.createBufferSource();
    sea.buffer = noiseBuffer;
    sea.loop = true;
    const low = ctx.createBiquadFilter();
    low.type = "lowpass";
    low.frequency.value = 380;
    const seaGain = ctx.createGain();
    seaGain.gain.value = 0.11;
    sea.connect(low);
    low.connect(seaGain);
    seaGain.connect(master);
    sea.start();
    return true;
  }

  function place(node, world, listener, amount) {
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();
    let spatial = 1;
    let pan = 0;
    if (world && listener) {
      const dx = world.x - listener.x;
      const dz = world.z - listener.z;
      const dist = Math.hypot(dx, dz);
      spatial = clamp(8 / (dist + 3.2), 0.08, 1);
      const right = dx * Math.cos(listener.yaw) - dz * Math.sin(listener.yaw);
      pan = clamp(right / (dist + 0.4), -1, 1);
    }
    gain.gain.value = amount * spatial;
    panner.pan.value = pan;
    node.connect(gain);
    gain.connect(panner);
    panner.connect(master);
  }

  function noiseHit(duration, frequency, q, world, listener, amount) {
    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = frequency;
    filter.Q.value = q;
    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    source.connect(filter);
    filter.connect(gain);
    place(gain, world, listener, amount);
    source.start(t);
    source.stop(t + duration + 0.02);
  }

  function tone(freq, duration, type, world, listener, amount) {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(28, freq * 0.4), t + duration);
    gain.gain.setValueAtTime(1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    place(gain, world, listener, amount);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  return {
    resume() {
      if (!ensure()) return;
      if (ctx.state === "suspended") ctx.resume();
    },
    play(events, listener) {
      if (!ctx || ctx.state !== "running") return;
      for (const event of events) {
        if (event.type === "shot") {
          const spec = SHOT[event.weapon] || SHOT.rifle;
          const local = event.actorId === "player";
          noiseHit(spec.dur, spec.noise, 0.7, local ? null : event.origin, listener, spec.gain);
          tone(spec.freq, spec.dur * 1.4, "sawtooth", local ? null : event.origin, listener, spec.gain * 0.45);
        } else if (event.type === "explode") {
          noiseHit(event.kind === "smoke" ? 0.4 : 0.45, event.kind === "smoke" ? 500 : 120, 0.5, event, listener, event.kind === "smoke" ? 0.2 : 0.7);
          if (event.kind !== "smoke") tone(55, 0.5, "sine", event, listener, 0.5);
        } else if (event.type === "foot") {
          noiseHit(0.05, event.quiet ? 140 : 190, 0.55, event, listener, event.quiet ? 0.02 : 0.07);
        } else if (event.type === "dry" && event.actorId === "player") {
          tone(900, 0.03, "square", null, listener, 0.08);
        } else if (event.type === "swing" && event.actorId === "player") {
          noiseHit(0.12, 900, 0.4, null, listener, 0.12);
        } else if (event.type === "reloaded" && event.actorId === "player") {
          tone(420, 0.04, "square", null, listener, 0.07);
        } else if (event.type === "throw" && event.actorId === "player") {
          noiseHit(0.14, 700, 0.4, null, listener, 0.1);
        } else if (event.type === "hit" && event.victimId === "player") {
          noiseHit(0.12, 220, 0.8, null, listener, 0.28);
          tone(140, 0.1, "sine", null, listener, 0.16);
        } else if (event.type === "hit" && event.attackerId === "player") {
          tone(event.head ? 1400 : 880, 0.04, "square", null, listener, 0.06);
        }
      }
    },
  };
}
