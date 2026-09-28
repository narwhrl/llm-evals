/** 可播种随机数（mulberry32）：随机过程可用种子复现 */
export class Rng {
  private s: number;
  constructor(seed = 20260928) {
    this.s = seed >>> 0;
    if (this.s === 0) this.s = 0x9e3779b9;
  }
  /** [0,1) */
  next(): number {
    this.s = (this.s + 0x6d2b79f5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  range(a: number, b: number): number {
    return a + (b - a) * this.next();
  }
  int(a: number, b: number): number {
    return Math.floor(this.range(a, b + 1));
  }
  /** 近似高斯（Box-Muller 简化） */
  gauss(mu = 0, sigma = 1): number {
    const u = Math.max(1e-9, this.next());
    const v = this.next();
    return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  pick<T>(arr: readonly T[]): T {
    return arr[Math.min(arr.length - 1, Math.floor(this.next() * arr.length))];
  }
  chance(p: number): boolean {
    return this.next() < p;
  }
}

export const rngGlobal = new Rng((Date.now() ^ 0x5f3759df) >>> 0);
