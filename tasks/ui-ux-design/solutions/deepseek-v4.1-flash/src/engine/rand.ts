/**
 * 确定性随机与噪声。整件作品用固定种子：同一版画可复现，
 * 访客的温度、选择与输入是唯一变量。
 */
export class Rand {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  next(): number {
    this.state = (this.state + 0x6d2b79f5) >>> 0;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  range(min: number, max: number): number {
    return min + (max - min) * this.next();
  }

  int(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min + 1));
  }

  sign(): number {
    return this.next() < 0.5 ? -1 : 1;
  }
}

function hash2(ix: number, iy: number, seed: number): number {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** 平滑值噪声，输出 [-1, 1]。用于笔迹卷曲与纸纹。 */
export function noise2(x: number, y: number, seed = 0): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const n00 = hash2(x0, y0, seed);
  const n10 = hash2(x0 + 1, y0, seed);
  const n01 = hash2(x0, y0 + 1, seed);
  const n11 = hash2(x0 + 1, y0 + 1, seed);
  const a = n00 + (n10 - n00) * sx;
  const b = n01 + (n11 - n01) * sx;
  return (a + (b - a) * sy) * 2 - 1;
}

/** 两个八度的分形噪声，用于纸纤维与墨迹边缘。 */
export function fbm2(x: number, y: number, seed = 0): number {
  return noise2(x, y, seed) * 0.66 + noise2(x * 2.31 + 5.2, y * 2.31 - 3.7, seed + 977) * 0.34;
}
