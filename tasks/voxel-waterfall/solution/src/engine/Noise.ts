// 高性能 2D/3D Simplex & fBm 噪声生成器 (支持随机种子)

export class PRNG {
  private s: number;
  constructor(seed: number) {
    this.s = Math.floor(seed) || 12345;
  }
  // Mulberry32
  next(): number {
    let t = (this.s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

export class SimplexNoise {
  private p: Uint8Array = new Uint8Array(512);
  private perm: Uint8Array = new Uint8Array(512);
  private permMod12: Uint8Array = new Uint8Array(512);

  private static readonly F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  private static readonly G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  private static readonly F3 = 1.0 / 3.0;
  private static readonly G3 = 1.0 / 6.0;

  private static readonly grad3 = new Float32Array([
    1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
    1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
    0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1
  ]);

  constructor(seed: number = 42) {
    this.init(seed);
  }

  public init(seed: number) {
    const rng = new PRNG(seed);
    const source = new Uint8Array(256);
    for (let i = 0; i < 256; i++) source[i] = i;

    // Fisher-Yates shuffle
    for (let i = 255; i > 0; i--) {
      const r = Math.floor(rng.next() * (i + 1));
      const tmp = source[i];
      source[i] = source[r];
      source[r] = tmp;
    }

    for (let i = 0; i < 512; i++) {
      this.p[i] = source[i & 255];
      this.perm[i] = this.p[i];
      this.permMod12[i] = (this.p[i] % 12);
    }
  }

  // 2D 基础 Simplex 噪声: [-1, 1]
  public noise2D(xin: number, yin: number): number {
    let n0 = 0, n1 = 0, n2 = 0;
    const s = (xin + yin) * SimplexNoise.F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * SimplexNoise.G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    let i1 = 0, j1 = 0;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }

    const x1 = x0 - i1 + SimplexNoise.G2;
    const y1 = y0 - j1 + SimplexNoise.G2;
    const x2 = x0 - 1.0 + 2.0 * SimplexNoise.G2;
    const y2 = y0 - 1.0 + 2.0 * SimplexNoise.G2;

    const ii = i & 255;
    const jj = j & 255;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      const gi0 = this.permMod12[ii + this.perm[jj]] * 3;
      t0 *= t0;
      n0 = t0 * t0 * (SimplexNoise.grad3[gi0] * x0 + SimplexNoise.grad3[gi0 + 1] * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]] * 3;
      t1 *= t1;
      n1 = t1 * t1 * (SimplexNoise.grad3[gi1] * x1 + SimplexNoise.grad3[gi1 + 1] * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      const gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]] * 3;
      t2 *= t2;
      n2 = t2 * t2 * (SimplexNoise.grad3[gi2] * x2 + SimplexNoise.grad3[gi2 + 1] * y2);
    }

    return 70.0 * (n0 + n1 + n2);
  }

  // 3D 基础 Simplex 噪声: [-1, 1]
  public noise3D(xin: number, yin: number, zin: number): number {
    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
    const s = (xin + yin + zin) * SimplexNoise.F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * SimplexNoise.G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;

    let i1: number, j1: number, k1: number;
    let i2: number, j2: number, k2: number;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const x1 = x0 - i1 + SimplexNoise.G3;
    const y1 = y0 - j1 + SimplexNoise.G3;
    const z1 = z0 - k1 + SimplexNoise.G3;
    const x2 = x0 - i2 + 2.0 * SimplexNoise.G3;
    const y2 = y0 - j2 + 2.0 * SimplexNoise.G3;
    const z2 = z0 - k2 + 2.0 * SimplexNoise.G3;
    const x3 = x0 - 1.0 + 3.0 * SimplexNoise.G3;
    const y3 = y0 - 1.0 + 3.0 * SimplexNoise.G3;
    const z3 = z0 - 1.0 + 3.0 * SimplexNoise.G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) {
      const gi0 = this.permMod12[ii + this.perm[jj + this.perm[kk]]] * 3;
      t0 *= t0;
      n0 = t0 * t0 * (SimplexNoise.grad3[gi0] * x0 + SimplexNoise.grad3[gi0 + 1] * y0 + SimplexNoise.grad3[gi0 + 2] * z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) {
      const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] * 3;
      t1 *= t1;
      n1 = t1 * t1 * (SimplexNoise.grad3[gi1] * x1 + SimplexNoise.grad3[gi1 + 1] * y1 + SimplexNoise.grad3[gi1 + 2] * z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) {
      const gi2 = this.permMod12[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] * 3;
      t2 *= t2;
      n2 = t2 * t2 * (SimplexNoise.grad3[gi2] * x2 + SimplexNoise.grad3[gi2 + 1] * y2 + SimplexNoise.grad3[gi2 + 2] * z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) {
      const gi3 = this.permMod12[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] * 3;
      t3 *= t3;
      n3 = t3 * t3 * (SimplexNoise.grad3[gi3] * x3 + SimplexNoise.grad3[gi3 + 1] * y3 + SimplexNoise.grad3[gi3 + 2] * z3);
    }

    return 32.0 * (n0 + n1 + n2 + n3);
  }

  // 分形布朗运动 (Fractal Brownian Motion)
  public fbm2D(x: number, y: number, octaves: number = 5, lacunarity: number = 2.0, persistence: number = 0.5): number {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;
    for (let i = 0; i < octaves; i++) {
      total += this.noise2D(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }
    return total / maxValue;
  }

  // 脊状山脉噪声 (Ridged Multifractal Noise)
  public ridged2D(x: number, y: number, octaves: number = 4): number {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let weight = 1;
    for (let i = 0; i < octaves; i++) {
      let val = 1.0 - Math.abs(this.noise2D(x * frequency, y * frequency));
      val = val * val;
      val *= weight;
      weight = Math.max(0, Math.min(1, val * 2.0));
      total += val * amplitude;
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return total;
  }
}
