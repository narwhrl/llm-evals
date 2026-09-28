/**
 * 程序合成音效（WebAudio）：无外部音频资源。
 * 每种武器有独立射击声；远近/方向/遮挡经 PannerNode 与增益实现；
 * 声音节点有并发上限与回收。
 */
import { AUDIO } from '../core/config';
import { Vec3 } from '../geometry/math';

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private ambient: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;
  private voices = 0;
  masterVolume = AUDIO.master;
  sfxVolume = 1;
  enabled = true;
  private noiseBuf: AudioBuffer | null = null;

  /** 首次用户交互后调用 */
  init(): void {
    if (this.ctx) return;
    try {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.masterVolume;
      this.master.connect(this.ctx.destination);
      this.sfxBus = this.ctx.createGain();
      this.sfxBus.gain.value = this.sfxVolume;
      this.sfxBus.connect(this.master);
      // 噪声源缓冲
      const len = this.ctx.sampleRate * 1.2;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.startAmbient();
    } catch {
      this.enabled = false;
    }
  }

  resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume();
  }

  setVolumes(masterV: number, sfxV: number): void {
    this.masterVolume = masterV;
    this.sfxVolume = sfxV;
    if (this.master) this.master.gain.value = masterV;
    if (this.sfxBus) this.sfxBus.gain.value = sfxV;
    if (this.ambientGain) this.ambientGain.gain.value = AUDIO.seaGain * masterV * sfxV;
  }

  updateListener(pos: Vec3, forward: Vec3): void {
    if (!this.ctx) return;
    const l = this.ctx.listener;
    if (l.positionX) {
      l.positionX.value = pos.x; l.positionY.value = pos.y; l.positionZ.value = pos.z;
      l.forwardX.value = forward.x; l.forwardY.value = forward.y; l.forwardZ.value = forward.z;
      l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0;
    }
  }

  private slot(pos?: Vec3, refDist = 8): { input: GainNode } | null {
    if (!this.ctx || !this.sfxBus || !this.enabled) return null;
    if (this.voices >= AUDIO.maxVoices) return null;
    this.voices++;
    const g = this.ctx.createGain();
    let out: AudioNode = g;
    if (pos) {
      const p = this.ctx.createPanner();
      p.panningModel = 'equalpower';
      p.distanceModel = 'inverse';
      p.refDistance = refDist;
      p.maxDistance = 160;
      p.rolloffFactor = 0.9;
      if (p.positionX) {
        p.positionX.value = pos.x; p.positionY.value = pos.y; p.positionZ.value = pos.z;
      }
      g.connect(p);
      out = p;
    }
    out.connect(this.sfxBus);
    setTimeout(() => { this.voices--; }, 400);
    return { input: g };
  }

  private noiseBurst(slot: { input: GainNode }, dur: number, vol: number, filter: 'lp' | 'hp' | 'bp', freq: number, q = 1): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.playbackRate.value = 0.9 + Math.random() * 0.2;
    const f = ctx.createBiquadFilter();
    f.type = filter === 'lp' ? 'lowpass' : filter === 'hp' ? 'highpass' : 'bandpass';
    f.frequency.value = freq;
    f.Q.value = q;
    const env = ctx.createGain();
    const t0 = ctx.currentTime;
    env.gain.setValueAtTime(vol, t0);
    env.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    src.connect(f); f.connect(env); env.connect(slot.input);
    src.start(t0, Math.random() * 0.4, dur + 0.05);
  }

  private tone(slot: { input: GainNode }, freq: number, dur: number, vol: number, type: OscillatorType = 'sine', slideTo?: number): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = type;
    const t0 = ctx.currentTime;
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    const env = ctx.createGain();
    env.gain.setValueAtTime(vol, t0);
    env.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    o.connect(env); env.connect(slot.input);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  /** 武器射击声：每类武器瞬态/余响不同 */
  gunshot(cls: string, pos?: Vec3): void {
    const s = this.slot(pos, 14);
    if (!s) return;
    switch (cls) {
      case 'rifle':
        this.noiseBurst(s, 0.16, 0.9, 'bp', 900, 0.7);
        this.tone(s, 130, 0.1, 0.5, 'square', 60);
        this.noiseBurst(s, 0.4, 0.16, 'lp', 340);
        break;
      case 'carbine':
        this.noiseBurst(s, 0.12, 0.8, 'bp', 1250, 0.9);
        this.tone(s, 170, 0.07, 0.4, 'square', 80);
        this.noiseBurst(s, 0.3, 0.12, 'lp', 420);
        break;
      case 'smg':
        this.noiseBurst(s, 0.07, 0.62, 'hp', 1500);
        this.tone(s, 220, 0.045, 0.3, 'square', 120);
        break;
      case 'sniper':
        this.noiseBurst(s, 0.3, 1.0, 'lp', 1400);
        this.tone(s, 90, 0.26, 0.7, 'sawtooth', 38);
        this.noiseBurst(s, 0.9, 0.3, 'lp', 260);
        break;
      case 'pistol':
        this.noiseBurst(s, 0.1, 0.75, 'bp', 700, 1.1);
        this.tone(s, 150, 0.08, 0.42, 'square', 70);
        break;
      default: break;
    }
  }

  dryFire(pos?: Vec3): void {
    const s = this.slot(pos);
    if (!s) return;
    this.tone(s, 1600, 0.03, 0.16, 'square', 900);
  }

  reloadStage(stage: 'out' | 'in' | 'slide', pos?: Vec3): void {
    const s = this.slot(pos);
    if (!s) return;
    if (stage === 'out') { this.tone(s, 700, 0.04, 0.2, 'square', 400); this.noiseBurst(s, 0.05, 0.12, 'hp', 2200); }
    if (stage === 'in') { this.tone(s, 500, 0.05, 0.26, 'square', 260); this.noiseBurst(s, 0.06, 0.16, 'bp', 1100); }
    if (stage === 'slide') { this.noiseBurst(s, 0.08, 0.24, 'bp', 1600, 2); this.tone(s, 900, 0.05, 0.14, 'square', 500); }
  }

  bolt(pos?: Vec3): void {
    const s = this.slot(pos);
    if (!s) return;
    this.noiseBurst(s, 0.09, 0.22, 'bp', 1300, 2);
    this.tone(s, 620, 0.07, 0.16, 'square', 320);
  }

  weaponSwitch(pos?: Vec3): void {
    const s = this.slot(pos);
    if (!s) return;
    this.noiseBurst(s, 0.06, 0.15, 'bp', 2000, 1.5);
  }

  meleeSwing(pos?: Vec3): void {
    const s = this.slot(pos, 5);
    if (!s) return;
    this.noiseBurst(s, 0.12, 0.22, 'bp', 600, 0.6);
  }

  meleeHit(pos?: Vec3): void {
    const s = this.slot(pos, 6);
    if (!s) return;
    this.tone(s, 260, 0.09, 0.4, 'square', 120);
    this.noiseBurst(s, 0.07, 0.28, 'bp', 800);
  }

  footstep(pos: Vec3, loud: number): void {
    const s = this.slot(pos, 4);
    if (!s) return;
    this.noiseBurst(s, 0.05 + Math.random() * 0.02, 0.14 * loud, 'bp', 300 + Math.random() * 240, 1.4);
    this.tone(s, 140 + Math.random() * 40, 0.04, 0.06 * loud, 'triangle', 90);
  }

  jump(pos?: Vec3): void {
    const s = this.slot(pos, 5);
    if (!s) return;
    this.noiseBurst(s, 0.06, 0.1, 'bp', 500);
  }

  land(pos: Vec3, hard: boolean): void {
    const s = this.slot(pos, 6);
    if (!s) return;
    this.tone(s, 110, 0.09, hard ? 0.4 : 0.2, 'triangle', 55);
    this.noiseBurst(s, 0.09, hard ? 0.3 : 0.14, 'bp', 380);
  }

  nadeBounce(pos: Vec3): void {
    const s = this.slot(pos, 6);
    if (!s) return;
    this.tone(s, 900, 0.04, 0.2, 'square', 500);
  }

  nadePin(pos?: Vec3): void {
    const s = this.slot(pos);
    if (!s) return;
    this.tone(s, 1800, 0.03, 0.12, 'square', 1200);
  }

  explosion(pos: Vec3): void {
    const s = this.slot(pos, 22);
    if (!s) return;
    this.tone(s, 60, 0.7, 1.0, 'sawtooth', 26);
    this.noiseBurst(s, 0.5, 0.95, 'lp', 900);
    this.noiseBurst(s, 1.6, 0.4, 'lp', 240);
  }

  smokeHiss(pos: Vec3): void {
    const s = this.slot(pos, 10);
    if (!s) return;
    this.noiseBurst(s, 1.6, 0.24, 'hp', 3400);
  }

  hitmarker(head: boolean): void {
    const s = this.slot();
    if (!s) return;
    this.tone(s, head ? 1500 : 950, 0.05, 0.22, 'square', head ? 1100 : 850);
  }

  killCue(): void {
    const s = this.slot();
    if (!s) return;
    this.tone(s, 660, 0.09, 0.2, 'sine', 660);
    setTimeout(() => {
      const s2 = this.slot();
      if (s2) this.tone(s2, 990, 0.12, 0.2, 'sine', 990);
    }, 90);
  }

  hurt(pos?: Vec3): void {
    const s = this.slot(pos, 4);
    if (!s) return;
    this.tone(s, 200, 0.12, 0.3, 'sawtooth', 90);
  }

  private startAmbient(): void {
    if (!this.ctx || !this.master || !this.noiseBuf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 380;
    const g = this.ctx.createGain();
    g.gain.value = AUDIO.seaGain * this.masterVolume;
    // 海浪起伏 LFO
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.13;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = AUDIO.seaGain * 0.55;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    lfo.start();
    src.connect(lp); lp.connect(g); g.connect(this.master);
    src.start();
    this.ambient = src;
    this.ambientGain = g;
  }

  dispose(): void {
    try { this.ambient?.stop(); } catch { /* 未启动 */ }
    void this.ctx?.close();
    this.ctx = null;
  }
}
