// 帧时间采样：固定容量环形缓冲，HUD 帧率与性能报告共用同一数据。
export interface FrameSummary { n: number; fps: number; avgMs: number; p50: number; p95: number; p99: number; maxMs: number; hitches: number }

export class FrameStats {
  private buf: Float64Array;
  private n = 0;
  private i = 0;
  private sorted: Float64Array;
  private cache: FrameSummary | null = null;
  private cacheAt = 0;
  total = 0;
  totalHitches = 0;

  constructor(private cap = 240) {
    this.buf = new Float64Array(cap);
    this.sorted = new Float64Array(cap);
  }

  push(ms: number): void {
    if (!(ms > 0) || ms > 1000) return;
    this.buf[this.i] = ms;
    this.i = (this.i + 1) % this.cap;
    this.n = Math.min(this.cap, this.n + 1);
    this.total++;
    if (ms > 50) this.totalHitches++;
  }

  /** 最近 cap 帧的统计；每 0.25 s 最多重新计算一次 */
  summary(now = performance.now()): FrameSummary {
    if (this.cache && now - this.cacheAt < 250) return this.cache;
    const n = this.n;
    if (!n) return { n: 0, fps: 0, avgMs: 0, p50: 0, p95: 0, p99: 0, maxMs: 0, hitches: 0 };
    const s = this.sorted.subarray(0, n);
    s.set(this.buf.subarray(0, n));
    s.sort();
    let sum = 0, hitches = 0;
    for (let k = 0; k < n; k++) { sum += s[k]; if (s[k] > 50) hitches++; }
    const q = (p: number) => s[Math.min(n - 1, Math.floor(p * (n - 1)))];
    this.cache = { n, fps: 1000 / (sum / n), avgMs: sum / n, p50: q(0.5), p95: q(0.95), p99: q(0.99), maxMs: s[n - 1], hitches };
    this.cacheAt = now;
    return this.cache;
  }

  reset(): void {
    this.n = this.i = 0;
    this.total = this.totalHitches = 0;
    this.cache = null;
  }
}
