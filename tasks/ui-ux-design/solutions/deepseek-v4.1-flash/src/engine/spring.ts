export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const smoothstep = (t: number): number => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

export const easeOutCubic = (t: number): number => 1 - (1 - clamp01(t)) ** 3;

export const easeOutQuint = (t: number): number => 1 - (1 - clamp01(t)) ** 5;

export const easeInOutCubic = (t: number): number => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
};

/** 落笔用的冲击缓动：极快冲刺后收住。 */
export const easeOutExpo = (t: number): number => (clamp01(t) === 1 ? 1 : 1 - 2 ** (-10 * clamp01(t)));

/** 二阶弹簧：用于页面的重量感（震动、跟随、温度指针）。 */
export class Spring {
  value: number;
  velocity = 0;
  target: number;
  stiffness: number;
  damping: number;

  constructor(value = 0, stiffness = 180, damping = 22) {
    this.value = value;
    this.target = value;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  update(dt: number): number {
    // 半隐式欧拉，dt 上限避免掉帧后爆炸
    const step = Math.min(dt, 1 / 30);
    const accel = (this.target - this.value) * this.stiffness - this.velocity * this.damping;
    this.velocity += accel * step;
    this.value += this.velocity * step;
    return this.value;
  }

  get settled(): boolean {
    return Math.abs(this.target - this.value) < 0.0005 && Math.abs(this.velocity) < 0.0005;
  }
}
