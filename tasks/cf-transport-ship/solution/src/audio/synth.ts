// 程序合成音效：初始化时一次性生成 PCM 缓冲，播放时仅创建 BufferSource。全部自制，无外部音频文件。
import { Rng } from "../core/rng";

export type SoundId =
  | "shot_ak" | "shot_m4" | "shot_mp5" | "shot_awm" | "shot_deagle"
  | "dry" | "mag_out" | "mag_in" | "bolt" | "switch" | "draw_knife"
  | "step0" | "step1" | "step2" | "step3" | "land" | "jump"
  | "blast" | "bounce" | "throw" | "pin" | "smoke_hiss"
  | "swing" | "stab" | "hit" | "hit_head" | "kill" | "hurt"
  | "ambient";

type Buf = Float32Array;

function mk(sr: number, sec: number): Buf {
  return new Float32Array(Math.max(1, Math.floor(sr * sec)));
}

function normalize(b: Buf, peak = 0.9): Buf {
  let m = 0;
  for (let i = 0; i < b.length; i++) m = Math.max(m, Math.abs(b[i]));
  if (m > 0) for (let i = 0; i < b.length; i++) b[i] *= peak / m;
  return b;
}

/** 一阶低通，就地处理；cut 为截止频率 */
function lowpass(b: Buf, sr: number, cut: number): Buf {
  const a = 1 - Math.exp((-2 * Math.PI * cut) / sr);
  let y = 0;
  for (let i = 0; i < b.length; i++) { y += a * (b[i] - y); b[i] = y; }
  return b;
}

function highpass(b: Buf, sr: number, cut: number): Buf {
  const a = Math.exp((-2 * Math.PI * cut) / sr);
  let px = 0, py = 0;
  for (let i = 0; i < b.length; i++) { const x = b[i]; py = a * (py + x - px); px = x; b[i] = py; }
  return b;
}

/** 金属甲板/舱壁的早期反射 + 衰减尾音 */
function reverb(b: Buf, sr: number, taps: [number, number][], tail: number, tailLp: number, rng: Rng): Buf {
  const dry = b.slice();
  for (const [ms, g] of taps) {
    const d = Math.floor((ms / 1000) * sr);
    for (let i = d; i < b.length; i++) b[i] += dry[i - d] * g;
  }
  if (tail > 0) {
    const t = mk(sr, b.length / sr);
    // 尾音包络由干声能量驱动，避免尾音先于主体出现
    const k = Math.exp(-1 / (tail * sr));
    let e = 0;
    for (let i = 0; i < t.length; i++) {
      e = Math.max(Math.abs(dry[i]) * 0.35, e * k);
      t[i] = rng.range(-1, 1) * e;
    }
    lowpass(t, sr, tailLp);
    lowpass(t, sr, tailLp * 1.4);
    for (let i = 0; i < b.length; i++) b[i] += t[i] * 0.9;
  }
  return b;
}

interface ShotSpec { thumpF0: number; thumpF1: number; thumpDecay: number; bodyDecay: number; bodyLp: number; crack: number; crackDecay: number; tail: number; tailLp: number; mech: number; len: number }

const SHOTS: Record<"ak" | "m4" | "mp5" | "awm" | "deagle", ShotSpec> = {
  ak: { thumpF0: 150, thumpF1: 58, thumpDecay: 0.06, bodyDecay: 0.085, bodyLp: 2400, crack: 0.9, crackDecay: 0.006, tail: 0.32, tailLp: 1500, mech: 0.25, len: 1.0 },
  m4: { thumpF0: 190, thumpF1: 80, thumpDecay: 0.045, bodyDecay: 0.06, bodyLp: 3600, crack: 1.1, crackDecay: 0.005, tail: 0.26, tailLp: 2200, mech: 0.3, len: 0.85 },
  mp5: { thumpF0: 260, thumpF1: 120, thumpDecay: 0.03, bodyDecay: 0.038, bodyLp: 4200, crack: 0.6, crackDecay: 0.004, tail: 0.16, tailLp: 2600, mech: 0.45, len: 0.6 },
  awm: { thumpF0: 120, thumpF1: 40, thumpDecay: 0.12, bodyDecay: 0.16, bodyLp: 1900, crack: 1.4, crackDecay: 0.009, tail: 0.75, tailLp: 1100, mech: 0.12, len: 2.0 },
  deagle: { thumpF0: 170, thumpF1: 62, thumpDecay: 0.07, bodyDecay: 0.1, bodyLp: 2800, crack: 1.0, crackDecay: 0.007, tail: 0.4, tailLp: 1400, mech: 0.2, len: 1.2 },
};

function gunshot(sr: number, s: ShotSpec, rng: Rng): Buf {
  const b = mk(sr, s.len);
  const crack = mk(sr, s.len), body = mk(sr, s.len);
  let ph = 0;
  for (let i = 0; i < b.length; i++) {
    const t = i / sr;
    const n = rng.range(-1, 1);
    crack[i] = n * Math.exp(-t / s.crackDecay) * s.crack;
    body[i] = n * Math.exp(-t / s.bodyDecay);
    const f = s.thumpF1 + (s.thumpF0 - s.thumpF1) * Math.exp(-t / 0.02);
    ph += (2 * Math.PI * f) / sr;
    b[i] = Math.sin(ph) * Math.exp(-t / s.thumpDecay) * 1.2;
    // 机件撞击声：极短的方波咔嗒
    if (t > 0.012 && t < 0.02) b[i] += (Math.sin(t * 2 * Math.PI * 2300) > 0 ? 1 : -1) * s.mech * Math.exp(-(t - 0.012) / 0.003);
  }
  highpass(crack, sr, 1800);
  lowpass(body, sr, s.bodyLp);
  lowpass(body, sr, s.bodyLp * 1.5);
  for (let i = 0; i < b.length; i++) b[i] += crack[i] + body[i] * 1.6;
  // 软削波，形成冲击感
  for (let i = 0; i < b.length; i++) b[i] = Math.tanh(b[i] * 1.8);
  reverb(b, sr, [[19, 0.32], [37, 0.22], [61, 0.16], [97, 0.1], [143, 0.06]], s.tail, s.tailLp, rng);
  return normalize(b);
}

function modes(sr: number, len: number, parts: [number, number, number][], attackNoise: number, noiseLp: number, rng: Rng): Buf {
  const b = mk(sr, len);
  for (let i = 0; i < b.length; i++) {
    const t = i / sr;
    let v = 0;
    for (const [f, dec, g] of parts) v += Math.sin(2 * Math.PI * f * t) * Math.exp(-t / dec) * g;
    b[i] = v;
  }
  if (attackNoise > 0) {
    const n = mk(sr, len);
    for (let i = 0; i < n.length; i++) n[i] = rng.range(-1, 1) * Math.exp(-(i / sr) / 0.012);
    lowpass(n, sr, noiseLp);
    for (let i = 0; i < b.length; i++) b[i] += n[i] * attackNoise;
  }
  return b;
}

function concat(sr: number, len: number, parts: [number, Buf, number][]): Buf {
  const b = mk(sr, len);
  for (const [at, p, g] of parts) {
    const o = Math.floor(at * sr);
    for (let i = 0; i < p.length && o + i < b.length; i++) b[o + i] += p[i] * g;
  }
  return b;
}

function click(sr: number, f: number, rng: Rng, dec = 0.02): Buf {
  return modes(sr, 0.12, [[f, dec, 0.6], [f * 2.3, dec * 0.6, 0.4], [f * 4.1, dec * 0.4, 0.25]], 1.2, 5000, rng);
}

function whoosh(sr: number, len: number, lpFrom: number, lpTo: number, rng: Rng): Buf {
  const b = mk(sr, len);
  let y = 0;
  for (let i = 0; i < b.length; i++) {
    const k = i / b.length;
    const cut = lpFrom + (lpTo - lpFrom) * k;
    const a = 1 - Math.exp((-2 * Math.PI * cut) / sr);
    y += a * (rng.range(-1, 1) - y);
    b[i] = y * Math.sin(Math.PI * k) ** 2;
  }
  return b;
}

function ambient(sr: number, rng: Rng): Buf {
  const L = 8, X = 0.6;
  const n = Math.floor(sr * (L + X));
  const wind = new Float32Array(n), waves = new Float32Array(n);
  for (let i = 0; i < n; i++) { wind[i] = rng.range(-1, 1); waves[i] = rng.range(-1, 1); }
  lowpass(wind, sr, 500); lowpass(wind, sr, 700);
  lowpass(waves, sr, 260); lowpass(waves, sr, 380);
  highpass(waves, sr, 40);
  const b = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const gust = 0.55 + 0.3 * Math.sin((2 * Math.PI * t) / L) + 0.15 * Math.sin((2 * Math.PI * 3 * t) / L + 1);
    const swell = 0.4 + 0.6 * Math.max(0, Math.sin((2 * Math.PI * 2 * t) / L)) ** 2 + 0.25 * Math.max(0, Math.sin((2 * Math.PI * 5 * t) / L + 2)) ** 3;
    b[i] = wind[i] * gust * 0.8 + waves[i] * swell * 1.6;
  }
  // 首尾交叉淡化，保证无缝循环
  const out = new Float32Array(Math.floor(sr * L));
  const xs = Math.floor(sr * X);
  for (let i = 0; i < out.length; i++) out[i] = b[i];
  for (let i = 0; i < xs; i++) {
    const k = i / xs;
    out[i] = b[i] * k + b[out.length + i] * (1 - k);
  }
  return normalize(out, 0.7);
}

/** 生成全部音效 PCM。约 20 ms–80 ms（取决于设备）。 */
export function synthAll(sr: number): Map<SoundId, Buf> {
  const rng = new Rng(20260929);
  const m = new Map<SoundId, Buf>();
  for (const id of ["ak", "m4", "mp5", "awm", "deagle"] as const) m.set(`shot_${id}`, gunshot(sr, SHOTS[id], rng));
  m.set("dry", normalize(click(sr, 2600, rng, 0.012), 0.5));
  m.set("mag_out", normalize(concat(sr, 0.35, [[0, click(sr, 1400, rng), 1], [0.05, whoosh(sr, 0.2, 1500, 3000, rng), 0.35]]), 0.6));
  m.set("mag_in", normalize(concat(sr, 0.3, [[0, whoosh(sr, 0.08, 2000, 3000, rng), 0.3], [0.07, click(sr, 900, rng, 0.03), 1], [0.1, click(sr, 1800, rng), 0.6]]), 0.7));
  m.set("bolt", normalize(concat(sr, 0.6, [[0, click(sr, 1100, rng), 1], [0.03, whoosh(sr, 0.12, 2000, 4000, rng), 0.4], [0.28, whoosh(sr, 0.1, 3000, 2000, rng), 0.3], [0.36, click(sr, 1500, rng, 0.03), 1]]), 0.7));
  m.set("switch", normalize(concat(sr, 0.35, [[0, whoosh(sr, 0.25, 800, 2500, rng), 0.6], [0.2, click(sr, 1700, rng), 0.7]]), 0.5));
  m.set("draw_knife", normalize(whoosh(sr, 0.3, 3000, 7000, rng), 0.45));
  for (let k = 0; k < 4; k++) {
    const f = 380 + k * 55 + rng.range(-20, 20);
    const s = modes(sr, 0.22, [[f, 0.05, 0.5], [f * 2.14, 0.035, 0.35], [f * 3.7, 0.02, 0.25], [f * 5.3, 0.012, 0.15]], 1.4, 1800, rng);
    m.set(`step${k}` as SoundId, normalize(s, 0.6));
  }
  m.set("land", normalize(concat(sr, 0.5, [[0, modes(sr, 0.45, [[90, 0.09, 1], [260, 0.08, 0.5], [610, 0.05, 0.3], [1320, 0.03, 0.15]], 2, 1200, rng), 1]]), 0.8));
  m.set("jump", normalize(whoosh(sr, 0.18, 600, 1400, rng), 0.3));
  {
    const len = 3.2, b = mk(sr, len), r = mk(sr, len);
    let ph = 0;
    for (let i = 0; i < b.length; i++) {
      const t = i / sr;
      r[i] = rng.range(-1, 1) * (Math.exp(-t / 0.5) + 0.6 * Math.exp(-t / 0.04));
      ph += (2 * Math.PI * (30 + 60 * Math.exp(-t / 0.08))) / sr;
      b[i] = Math.sin(ph) * Math.exp(-t / 0.35) * 1.5;
      if (rng.chance(0.0006 * Math.exp(-t / 0.6))) for (let j = 0; j < 60 && i + j < b.length; j++) b[i + j] += rng.range(-1, 1) * 0.5 * Math.exp(-j / 15);
    }
    lowpass(r, sr, 700); lowpass(r, sr, 900);
    for (let i = 0; i < b.length; i++) b[i] = Math.tanh((b[i] + r[i] * 3) * 1.5);
    reverb(b, sr, [[45, 0.3], [90, 0.2], [170, 0.12]], 0.9, 600, rng);
    m.set("blast", normalize(b));
  }
  m.set("bounce", normalize(modes(sr, 0.2, [[1150, 0.04, 0.6], [2680, 0.025, 0.4], [4100, 0.015, 0.2]], 0.5, 4000, rng), 0.5));
  m.set("throw", normalize(whoosh(sr, 0.28, 700, 2400, rng), 0.5));
  m.set("pin", normalize(concat(sr, 0.3, [[0, click(sr, 3200, rng, 0.01), 0.7], [0.08, modes(sr, 0.2, [[2400, 0.06, 0.3], [3900, 0.04, 0.2]], 0, 0, rng), 1]]), 0.45));
  {
    const b = mk(sr, 2.5);
    for (let i = 0; i < b.length; i++) b[i] = rng.range(-1, 1) * Math.min(1, i / (sr * 0.05)) * Math.exp(-(i / sr) / 1.2);
    highpass(b, sr, 2500);
    lowpass(b, sr, 7000);
    m.set("smoke_hiss", normalize(b, 0.5));
  }
  m.set("swing", normalize(whoosh(sr, 0.22, 1200, 5000, rng), 0.5));
  m.set("stab", normalize(concat(sr, 0.3, [[0, modes(sr, 0.25, [[120, 0.05, 1], [340, 0.03, 0.4]], 2.5, 900, rng), 1]]), 0.8));
  m.set("hit", normalize(modes(sr, 0.08, [[1850, 0.018, 1], [3700, 0.01, 0.4]], 0, 0, rng), 0.45));
  m.set("hit_head", normalize(modes(sr, 0.35, [[2450, 0.09, 0.8], [3680, 0.07, 0.6], [5210, 0.05, 0.3]], 0.3, 6000, rng), 0.55));
  m.set("kill", normalize(concat(sr, 0.4, [[0, modes(sr, 0.2, [[880, 0.08, 1], [1760, 0.05, 0.3]], 0, 0, rng), 1], [0.09, modes(sr, 0.3, [[1320, 0.12, 1], [2640, 0.08, 0.3]], 0, 0, rng), 1]]), 0.5));
  m.set("hurt", normalize(modes(sr, 0.25, [[160, 0.06, 1], [95, 0.1, 0.8]], 1.5, 700, rng), 0.7));
  m.set("ambient", ambient(sr, rng));
  return m;
}
