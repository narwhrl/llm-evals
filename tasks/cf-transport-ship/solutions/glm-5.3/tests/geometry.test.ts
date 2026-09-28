import { describe, expect, it } from 'vitest';
import { rayBox, coneSpread, segIntersectsSphere, dirFromAngles, v3 } from '../src/geometry/math';

describe('射线 vs 盒（含 yaw 旋转）', () => {
  it('轴对齐盒：命中与 t 值', () => {
    const box = { cx: 10, cy: 1, cz: 0, hx: 0.5, hy: 1, hz: 0.5, yaw: 0 };
    const hit = rayBox(v3(0, 1, 0), v3(1, 0, 0), box);
    expect(hit).not.toBeNull();
    expect(hit!.tEnter).toBeCloseTo(9.5, 5);
    expect(hit!.tExit).toBeCloseTo(10.5, 5);
  });
  it('未命中返回 null', () => {
    const box = { cx: 10, cy: 1, cz: 5, hx: 0.5, hy: 1, hz: 0.5, yaw: 0 };
    expect(rayBox(v3(0, 1, 0), v3(1, 0, 0), box)).toBeNull();
  });
  it('旋转盒：45° 斜置货物的命中距离', () => {
    const box = { cx: 5, cy: 1, cz: 0, hx: 4, hy: 1, hz: 0.5, yaw: Math.PI / 4 };
    // 射线沿 +X，局部系方向 (cos45, 0, sin45)，从长侧面进入：
    // t = (hz - lz0) / lzDir，其中 lz0 = -5*sin45
    const s = Math.SQRT1_2;
    const hit = rayBox(v3(0, 1, 0), v3(1, 0, 0), box);
    expect(hit).not.toBeNull();
    expect(hit!.tEnter).toBeCloseTo((5 * s - 0.5) / s, 4);
  });
  it('起点在盒内：tEnter 为负', () => {
    const box = { cx: 0, cy: 1, cz: 0, hx: 1, hy: 1, hz: 1, yaw: 0 };
    const hit = rayBox(v3(0, 1, 0), v3(1, 0, 0), box);
    expect(hit!.tEnter).toBeLessThanOrEqual(0);
    expect(hit!.tExit).toBeCloseTo(1, 5);
  });
});

describe('锥形散布', () => {
  it('零散布 = 原方向', () => {
    const d = v3(0, 0, -1);
    const s = coneSpread(d, 0, 0.3, 0.7);
    expect(s.x).toBeCloseTo(0);
    expect(s.z).toBeCloseTo(-1);
  });
  it('同一种子可复现', () => {
    const d = v3(1, 0, 0);
    const a = coneSpread(d, 5, 0.25, 0.75);
    const b = coneSpread(d, 5, 0.25, 0.75);
    expect(a).toEqual(b);
  });
  it('角度上限约束', () => {
    const d = v3(0, 0, -1);
    for (let i = 0; i < 200; i++) {
      const s = coneSpread(d, 3, (i * 0.37) % 1, (i * 0.61) % 1);
      const ang = Math.acos(Math.max(-1, Math.min(1, s.z * -1)));
      expect(ang).toBeLessThanOrEqual((3 + 1e-6) * Math.PI / 180);
    }
  });
});

describe('线段 vs 球（烟雾遮挡几何）', () => {
  it('穿过球心判定遮挡', () => {
    expect(segIntersectsSphere(v3(-10, 1, 0), v3(10, 1, 0), v3(0, 1, 0), 2)).toBe(true);
  });
  it('平行线不遮挡', () => {
    expect(segIntersectsSphere(v3(-10, 1, 0), v3(10, 1, 0), v3(0, 1, 8), 2)).toBe(false);
  });
});

describe('方向角构造', () => {
  it('yaw=0 朝 -Z', () => {
    const d = dirFromAngles(0, 0);
    expect(d.x).toBeCloseTo(0);
    expect(d.z).toBeCloseTo(-1);
  });
  it('俯仰 +90 朝上', () => {
    const d = dirFromAngles(0, 90);
    expect(d.y).toBeCloseTo(1, 5);
  });
});
