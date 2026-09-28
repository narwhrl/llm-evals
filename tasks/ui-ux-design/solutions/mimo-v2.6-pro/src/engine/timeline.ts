/** 滚动时间轴工具：全部动效都是进度的纯函数，保证可回溯。 */

export function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** 把全局进度 p 映射到 [a, b] 区间内的 0..1 */
export function seg(p: number, a: number, b: number): number {
  return clamp01((p - a) / (b - a));
}

export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

/** 压印：落下、过冲、回弹定住 */
export function easePress(t: number): number {
  const c = 1.7;
  const u = 1 - t;
  return 1 + (c + 1) * u * u * u * -1 + c * u * u;
}

export type Phase = 'cover' | 'drafting' | 'revising' | 'condemned' | 'clean';

export const PHASE_RANGES: Record<Phase, [number, number]> = {
  cover: [0, 0.1],
  drafting: [0.1, 0.38],
  revising: [0.38, 0.62],
  condemned: [0.62, 0.8],
  clean: [0.8, 1],
};

export function phaseOf(p: number): Phase {
  if (p < 0.1) return 'cover';
  if (p < 0.38) return 'drafting';
  if (p < 0.62) return 'revising';
  if (p < 0.8) return 'condemned';
  return 'clean';
}

/** 判死笔迹的绘制进度（可随滚动来回擦写） */
export function deleProgress(p: number): number {
  return seg(p, 0.62, 0.74);
}

/** 印版翻面进度 */
export function flipProgress(p: number): number {
  return seg(p, 0.74, 0.86);
}

/** 钤印进度 */
export function sealProgress(p: number): number {
  return seg(p, 0.9, 0.985);
}
