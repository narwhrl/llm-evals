import type { Settings, WeaponId } from './config';
import type { Game, GameEvent } from './game';

export class AudioEngine {
  private ctx: AudioContext | null = null; private master: GainNode | null = null; private effects: GainNode | null = null;
  private ambient: GainNode | null = null; private noise: AudioBuffer | null = null; private active = 0;
  constructor(private settings: Settings) {}
  async init() {
    if (this.ctx) { await this.ctx.resume(); return; }
    const ctx = new AudioContext(); this.ctx = ctx;
    this.master = ctx.createGain(); this.master.gain.value = this.settings.volume; this.master.connect(ctx.destination);
    this.effects = ctx.createGain(); this.effects.gain.value = this.settings.effectsVolume; this.effects.connect(this.master);
    this.ambient = ctx.createGain(); this.ambient.gain.value = .018; this.ambient.connect(this.master);
    const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), data = noise.getChannelData(0);
    let seed = 7183; for (let i = 0; i < data.length; i++) { seed = (seed * 1664525 + 1013904223) >>> 0; data[i] = (seed / 2147483648 - 1) * .65; }
    this.noise = noise;
    const bed = ctx.createBufferSource(); bed.buffer = noise; bed.loop = true;
    const seaFilter = ctx.createBiquadFilter(); seaFilter.type = 'lowpass'; seaFilter.frequency.value = 480;
    bed.connect(seaFilter).connect(this.ambient); bed.start();
  }
  setSettings(settings: Settings) {
    this.settings = settings;
    if (this.ctx && this.master && this.effects) {
      this.master.gain.setTargetAtTime(settings.volume, this.ctx.currentTime, .04);
      this.effects.gain.setTargetAtTime(settings.effectsVolume, this.ctx.currentTime, .04);
    }
  }
  pause() { this.ctx?.suspend().catch(() => {}); }
  resume() { this.ctx?.resume().catch(() => {}); }
  private output(e: GameEvent, game: Game, volume: number): GainNode | null {
    if (!this.ctx || !this.effects || this.active > 34) return null;
    const gain = this.ctx.createGain(); gain.gain.value = volume;
    if (e.actor === game.player.id || e.type === 'hit' && e.target === game.player.id) gain.connect(this.effects);
    else {
      const panner = this.ctx.createPanner(); panner.panningModel = 'HRTF'; panner.distanceModel = 'inverse';
      panner.refDistance = 4; panner.maxDistance = 65; panner.rolloffFactor = 1.2;
      panner.positionX.value = e.x; panner.positionY.value = e.y; panner.positionZ.value = e.z;
      gain.connect(panner).connect(this.effects);
    }
    return gain;
  }
  private tone(out: GainNode, freq: number, duration: number, volume: number, wave: OscillatorType = 'triangle', endFreq = 0) {
    const ctx = this.ctx!; this.active++;
    const osc = ctx.createOscillator(), env = ctx.createGain(); osc.type = wave;
    osc.frequency.setValueAtTime(freq, ctx.currentTime); if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), ctx.currentTime + duration);
    env.gain.setValueAtTime(Math.max(.0001, volume), ctx.currentTime); env.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration);
    osc.connect(env).connect(out); osc.onended = () => { this.active--; osc.disconnect(); env.disconnect(); }; osc.start(); osc.stop(ctx.currentTime + duration + .006);
  }
  private burst(out: GainNode, duration: number, volume: number, highpass = 0, lowpass = 12000) {
    const ctx = this.ctx!; if (!this.noise) return;
    this.active++; const source = ctx.createBufferSource(); source.buffer = this.noise;
    const hp = ctx.createBiquadFilter(), lp = ctx.createBiquadFilter(), env = ctx.createGain();
    hp.type = 'highpass'; hp.frequency.value = Math.max(20, highpass); lp.type = 'lowpass'; lp.frequency.value = lowpass;
    env.gain.setValueAtTime(Math.max(volume, .0001), ctx.currentTime); env.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration);
    source.connect(hp).connect(lp).connect(env).connect(out);
    source.onended = () => { this.active--; source.disconnect(); hp.disconnect(); lp.disconnect(); env.disconnect(); };
    source.start(); source.stop(ctx.currentTime + duration + .006);
  }
  updateListener(game: Game) {
    if (!this.ctx || !game.actors.length) return;
    const p = game.player, listener = this.ctx.listener;
    listener.positionX.value = p.body.x; listener.positionY.value = p.body.y + 1.5; listener.positionZ.value = p.body.z;
    listener.forwardX.value = Math.sin(p.yaw); listener.forwardY.value = Math.sin(p.pitch); listener.forwardZ.value = Math.cos(p.yaw);
    listener.upX.value = 0; listener.upY.value = 1; listener.upZ.value = 0;
  }
  handle(events: GameEvent[], game: Game) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    this.updateListener(game);
    for (const e of events) {
      if (!['shot', 'empty', 'reload', 'reloadDone', 'switch', 'footstep', 'land', 'throw', 'explosion', 'hit', 'death', 'melee'].includes(e.type)) continue;
      const out = this.output(e, game, 1); if (!out) continue;
      switch (e.type) {
        case 'shot': {
          const id = e.weapon as WeaponId;
          const tone = id === 'longshot' ? [85, .48, 29] : id === 'vector' ? [180, .12, 65] : id === 'revolver' ? [135, .26, 42] : id === 'sentinel' ? [115, .19, 40] : [95, .24, 31];
          this.burst(out, tone[1], id === 'longshot' ? .4 : id === 'vector' ? .13 : .24, 95, id === 'longshot' ? 6800 : 8500);
          this.tone(out, tone[0], tone[1] * .7, id === 'longshot' ? .36 : .23, 'sawtooth', tone[2]); break;
        }
        case 'empty': this.tone(out, 860, .045, .075, 'square', 540); break;
        case 'reload': this.burst(out, .075, .105, 900, 6500); this.tone(out, 340, .08, .04, 'square', 155); break;
        case 'reloadDone': this.burst(out, .11, .13, 1200, 8500); break;
        case 'switch': this.burst(out, .08, .08, 350, 4000); break;
        case 'footstep': this.burst(out, .09, e.text === 'quiet' ? .027 : .08, 60, 980); break;
        case 'land': this.burst(out, .16, .16, 40, 750); break;
        case 'throw': this.burst(out, .12, .08, 350, 4200); break;
        case 'explosion': this.burst(out, .72, .65, 35, 3000); this.tone(out, 70, .52, .33, 'sawtooth', 25); break;
        case 'hit': if (e.actor === game.player.id) this.tone(out, e.zone === 'head' ? 1350 : 910, .08, .08, 'sine', e.zone === 'head' ? 680 : 440); else if (e.target === game.player.id) this.burst(out, .12, .12, 450, 4700); break;
        case 'death': if (e.actor === game.player.id) { this.tone(out, 840, .11, .09, 'sine', 980); this.tone(out, 1190, .16, .07, 'sine', 770); } break;
        case 'melee': this.burst(out, .18, .09, 300, 7000); break;
      }
      // The scheduled sources keep their own gain nodes until onended.
    }
  }
}
