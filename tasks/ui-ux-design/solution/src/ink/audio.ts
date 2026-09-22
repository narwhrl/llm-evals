import { Rand } from "../engine/rand";

/**
 * 声音：全部由 WebAudio 现场合成，没有任何外部音频文件，默认关闭。
 * 纸的摩擦、墨滴落地、刀口合上——只用噪声与包络，不用音乐。
 */
export class InkAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private lastStroke = 0;
  private lastDrop = 0;

  enabled = false;

  static get supported(): boolean {
    return typeof window !== "undefined" && "AudioContext" in window;
  }

  /** 必须在用户手势里调用（浏览器只允许这样启动音频）。 */
  enable(): void {
    if (!InkAudio.supported) return;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.16;
      this.master.connect(this.ctx.destination);
      this.noise = this.buildNoise(this.ctx);
    }
    void this.ctx.resume();
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
    void this.ctx?.suspend();
  }

  /** 笔尖划过纸面：带通噪声的一小口气。 */
  stroke(strength = 0.5): void {
    const ctx = this.ctx;
    if (!this.enabled || !ctx || !this.master || !this.noise) return;
    const now = ctx.currentTime;
    if (now - this.lastStroke < 0.045) return;
    this.lastStroke = now;

    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    source.playbackRate.value = 0.8 + strength * 0.5;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 1500 + strength * 2400;
    band.Q.value = 0.9;
    const gain = ctx.createGain();
    const level = 0.05 + strength * 0.09;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09 + strength * 0.06);
    source.connect(band).connect(gain).connect(this.master);
    source.start(now);
    source.stop(now + 0.24);
  }

  /** 刀口合上：低频的一记闷响。 */
  cut(): void {
    const ctx = this.ctx;
    if (!this.enabled || !ctx || !this.master || !this.noise) return;
    const now = ctx.currentTime;

    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    source.playbackRate.value = 0.4;
    const low = ctx.createBiquadFilter();
    low.type = "lowpass";
    low.frequency.value = 520;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
    source.connect(low).connect(gain).connect(this.master);
    source.start(now);
    source.stop(now + 0.4);

    const thud = ctx.createOscillator();
    thud.type = "sine";
    thud.frequency.setValueAtTime(96, now);
    thud.frequency.exponentialRampToValueAtTime(48, now + 0.26);
    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(0.0001, now);
    thudGain.gain.linearRampToValueAtTime(0.34, now + 0.01);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    thud.connect(thudGain).connect(this.master);
    thud.start(now);
    thud.stop(now + 0.34);
  }

  /** 一滴墨落进纸里。 */
  drop(pitch = 1): void {
    const ctx = this.ctx;
    if (!this.enabled || !ctx || !this.master) return;
    const now = ctx.currentTime;
    if (now - this.lastDrop < 0.05) return;
    this.lastDrop = now;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(280 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.09);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(gain).connect(this.master);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  /** 触觉替代：手机上的一记轻震，不支持就安静地忽略。 */
  static buzz(pattern: number | number[]): void {
    const nav = navigator as Navigator & { vibrate?: (pattern: number | number[]) => boolean };
    try {
      nav.vibrate?.(pattern);
    } catch {
      // 没有触觉反馈不影响任何事
    }
  }

  private buildNoise(ctx: AudioContext): AudioBuffer {
    const seconds = 0.5;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    const rand = new Rand(0x51ce);
    let last = 0;
    for (let i = 0; i < data.length; i += 1) {
      // 一点点低通，让噪声更像纸而不是电视雪花
      const white = rand.next() * 2 - 1;
      last = last * 0.42 + white * 0.58;
      data[i] = last;
    }
    return buffer;
  }
}
