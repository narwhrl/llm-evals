// WebAudio 播放：总线（总音量/音效/环境）、HRTF 空间定位、距离与遮挡低通、并发上限与节点回收。
// 首次用户交互后才创建或恢复 AudioContext（浏览器自动播放限制）。
import { type SoundId, synthAll } from "./synth";

const MAX_VOICES = 32;

interface Voice { src: AudioBufferSourceNode; prio: number; t: number; nodes: AudioNode[] }

export interface PlayOpts {
  pos?: [number, number, number];
  gain?: number;
  rate?: number;
  prio?: number; // 0 脚步 … 3 关键提示
  occluded?: boolean;
  refDist?: number;
}

export class AudioEngine {
  ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfx!: GainNode;
  private amb!: GainNode;
  private bufs = new Map<SoundId, AudioBuffer>();
  private voices: Voice[] = [];
  private listener = [0, 0, 0];
  private ambSrc: AudioBufferSourceNode | null = null;
  private vol = { master: 0.8, sfx: 0.9 };
  error: string | null = null;
  peakVoices = 0;
  played = 0;

  /** 在点击等用户手势中调用 */
  unlock(): void {
    try {
      if (!this.ctx) {
        const C = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!C) { this.error = "浏览器不支持 Web Audio"; return; }
        this.ctx = new C({ latencyHint: "interactive" });
        this.master = this.ctx.createGain();
        this.sfx = this.ctx.createGain();
        this.amb = this.ctx.createGain();
        const comp = this.ctx.createDynamicsCompressor();
        comp.threshold.value = -10; comp.ratio.value = 4; comp.attack.value = 0.002; comp.release.value = 0.15;
        this.sfx.connect(comp).connect(this.master);
        this.amb.connect(this.master);
        this.master.connect(this.ctx.destination);
        const sr = this.ctx.sampleRate;
        for (const [id, pcm] of synthAll(sr)) {
          const b = this.ctx.createBuffer(1, pcm.length, sr);
          b.copyToChannel(pcm as Float32Array<ArrayBuffer>, 0);
          this.bufs.set(id, b);
        }
        this.applyVolume();
      }
      if (this.ctx.state === "suspended") void this.ctx.resume();
    } catch (e) {
      this.error = `音频初始化失败：${(e as Error).message}`;
    }
  }

  setVolume(master: number, sfx: number): void {
    this.vol.master = master;
    this.vol.sfx = sfx;
    this.applyVolume();
  }

  private applyVolume(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.vol.master, t, 0.02);
    this.sfx.gain.setTargetAtTime(this.vol.sfx, t, 0.02);
    this.amb.gain.setTargetAtTime(0.16 * this.vol.sfx, t, 0.05);
  }

  /** 暂停、结算时静音并挂起；继续时恢复 */
  suspend(): void {
    if (this.ctx && this.ctx.state === "running") void this.ctx.suspend();
  }

  resume(): void {
    if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume();
  }

  startAmbient(): void {
    if (!this.ctx || this.ambSrc) return;
    const b = this.bufs.get("ambient");
    if (!b) return;
    this.ambSrc = this.ctx.createBufferSource();
    this.ambSrc.buffer = b;
    this.ambSrc.loop = true;
    this.ambSrc.connect(this.amb);
    this.ambSrc.start();
  }

  /** 相机世界坐标与朝向（前、上）。每帧调用。 */
  setListener(p: { x: number; y: number; z: number }, fwd: { x: number; y: number; z: number }, up: { x: number; y: number; z: number }): void {
    this.listener[0] = p.x; this.listener[1] = p.y; this.listener[2] = p.z;
    if (!this.ctx) return;
    const l = this.ctx.listener, t = this.ctx.currentTime;
    if (l.positionX) {
      l.positionX.setValueAtTime(p.x, t); l.positionY.setValueAtTime(p.y, t); l.positionZ.setValueAtTime(p.z, t);
      l.forwardX.setValueAtTime(fwd.x, t); l.forwardY.setValueAtTime(fwd.y, t); l.forwardZ.setValueAtTime(fwd.z, t);
      l.upX.setValueAtTime(up.x, t); l.upY.setValueAtTime(up.y, t); l.upZ.setValueAtTime(up.z, t);
    } else {
      const legacy = l as unknown as { setPosition(x: number, y: number, z: number): void; setOrientation(a: number, b: number, c: number, d: number, e: number, f: number): void };
      legacy.setPosition(p.x, p.y, p.z);
      legacy.setOrientation(fwd.x, fwd.y, fwd.z, up.x, up.y, up.z);
    }
  }

  play(id: SoundId, o: PlayOpts = {}): void {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const buf = this.bufs.get(id);
    if (!buf) return;
    const prio = o.prio ?? 1;
    const now = ctx.currentTime;
    let dist = 0;
    if (o.pos) dist = Math.hypot(o.pos[0] - this.listener[0], o.pos[1] - this.listener[1], o.pos[2] - this.listener[2]);
    if (this.voices.length >= MAX_VOICES) {
      // 先回收最低优先级中最旧的；新声音优先级更低则放弃
      let k = -1;
      for (let i = 0; i < this.voices.length; i++) {
        const v = this.voices[i];
        if (k < 0 || v.prio < this.voices[k].prio || (v.prio === this.voices[k].prio && v.t < this.voices[k].t)) k = i;
      }
      if (k < 0 || this.voices[k].prio > prio) return;
      this.stopVoice(this.voices[k]);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = o.rate ?? 1;
    const g = ctx.createGain();
    g.gain.value = o.gain ?? 1;
    const nodes: AudioNode[] = [src, g];
    let tail: AudioNode = g;
    src.connect(g);
    if (o.pos) {
      // 远处与遮挡：高频先衰减
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = Math.max(500, 18000 * Math.exp(-dist / 55)) * (o.occluded ? 0.12 : 1);
      lp.Q.value = 0.5;
      const p = ctx.createPanner();
      p.panningModel = "HRTF";
      p.distanceModel = "inverse";
      p.refDistance = o.refDist ?? 3;
      p.rolloffFactor = 1.1;
      p.maxDistance = 400;
      if (p.positionX) { p.positionX.value = o.pos[0]; p.positionY.value = o.pos[1]; p.positionZ.value = o.pos[2]; }
      else (p as unknown as { setPosition(x: number, y: number, z: number): void }).setPosition(o.pos[0], o.pos[1], o.pos[2]);
      g.connect(lp).connect(p);
      nodes.push(lp, p);
      tail = p;
      if (o.occluded) g.gain.value *= 0.55;
    }
    tail.connect(this.sfx);
    const v: Voice = { src, prio, t: now, nodes };
    this.voices.push(v);
    this.played++;
    this.peakVoices = Math.max(this.peakVoices, this.voices.length);
    src.onended = () => this.release(v);
    src.start();
  }

  private stopVoice(v: Voice): void {
    try { v.src.stop(); } catch { /* 已结束 */ }
    this.release(v);
  }

  private release(v: Voice): void {
    const i = this.voices.indexOf(v);
    if (i < 0) return;
    this.voices.splice(i, 1);
    v.src.onended = null;
    for (const n of v.nodes) n.disconnect();
  }

  /** 重开对局：停止所有一次性音源 */
  stopAll(): void {
    for (const v of [...this.voices]) this.stopVoice(v);
  }

  get activeVoices(): number {
    return this.voices.length;
  }
}
