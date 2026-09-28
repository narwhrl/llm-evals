/**
 * 撕词：词被划掉后化作纸屑，翻卷着飞进废稿篓。
 * 纯几何 —— 给定 t 返回变换，动画层负责把它刷到 DOM 上。
 */

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface TearPose {
  x: number;
  y: number;
  rot: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

/**
 * 二次弧线抛出 + 翻卷（scaleX 周期性压扁）。
 * from 为词位矩形，to 为废稿篓落点，均为视口坐标。
 */
export function tearPose(t: number, from: Rect, to: { x: number; y: number }): TearPose {
  const e = 1 - Math.pow(1 - t, 2.2); // 先快后缓，像被风吹走
  const x0 = from.left + from.width / 2;
  const y0 = from.top + from.height / 2;
  const cx = (x0 + to.x) / 2 + (to.x - x0) * 0.15;
  const cy = Math.min(y0, to.y) - 90;
  const u = 1 - e;
  const x = u * u * x0 + 2 * u * e * cx + e * e * to.x;
  const y = u * u * y0 + 2 * u * e * cy + e * e * to.y;
  return {
    x,
    y,
    rot: e * 210 + Math.sin(e * Math.PI * 2) * 12,
    scaleX: 0.35 + 0.65 * Math.abs(Math.cos(e * Math.PI * 1.7)),
    scaleY: 1 - 0.18 * Math.sin(e * Math.PI),
    opacity: t > 0.92 ? 1 - (t - 0.92) / 0.08 : 1,
  };
}

/** 飞落时长（毫秒） */
export const TEAR_MS = 520;
