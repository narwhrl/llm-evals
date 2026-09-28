/**
 * 纯几何数学：不依赖 three，可在 node 测试环境直接运行。
 * 坐标系：Y 向上；地图 collider 仅绕 Y 轴旋转（yaw）。
 */

export interface Vec3 { x: number; y: number; z: number; }
export interface Box {
  /** 中心 */ cx: number; cy: number; cz: number;
  /** 半尺寸 */ hx: number; hy: number; hz: number;
  /** 绕 Y 旋转（弧度） */ yaw: number;
}
export interface RayHit {
  tEnter: number;
  tExit: number;
}

export const v3 = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z });
export const vCopy = (a: Vec3): Vec3 => ({ x: a.x, y: a.y, z: a.z });
export const vAdd = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
export const vSub = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
export const vScale = (a: Vec3, s: number): Vec3 => ({ x: a.x * s, y: a.y * s, z: a.z * s });
export const vDot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;
export const vCross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});
export const vLen = (a: Vec3): number => Math.sqrt(vDot(a, a));
export const vDist = (a: Vec3, b: Vec3): number => vLen(vSub(a, b));
export const vNorm = (a: Vec3): Vec3 => {
  const l = vLen(a);
  return l > 1e-9 ? vScale(a, 1 / l) : v3();
};
export const vLerp = (a: Vec3, b: Vec3, t: number): Vec3 => ({
  x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t,
});
export const clamp = (x: number, a: number, b: number): number => (x < a ? a : x > b ? b : x);

/** 绕 Y 轴旋转（世界 -> 局部用 -yaw） */
export function rotY(v: Vec3, ang: number): Vec3 {
  const c = Math.cos(ang), s = Math.sin(ang);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
}

/** 点是否在盒内（考虑 yaw） */
export function pointInBox(p: Vec3, b: Box, margin = 0): boolean {
  const l = rotY(vSub(p, v3(b.cx, b.cy, b.cz)), -b.yaw);
  return Math.abs(l.x) <= b.hx + margin && Math.abs(l.y) <= b.hy + margin && Math.abs(l.z) <= b.hz + margin;
}

/** 射线 vs 盒（yaw）：返回世界参数 t 的进出区间，未命中返回 null */
export function rayBox(o: Vec3, d: Vec3, b: Box): RayHit | null {
  const lo = rotY(vSub(o, v3(b.cx, b.cy, b.cz)), -b.yaw);
  const ld = rotY(d, -b.yaw);
  let tmin = -Infinity, tmax = Infinity;
  const axes: Array<[number, number, number]> = [
    [lo.x, ld.x, b.hx], [lo.y, ld.y, b.hy], [lo.z, ld.z, b.hz],
  ];
  for (const [p, q, h] of axes) {
    if (Math.abs(q) < 1e-10) {
      if (Math.abs(p) > h) return null;
      continue;
    }
    let t1 = (-h - p) / q, t2 = (h - p) / q;
    if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; }
    if (t1 > tmin) tmin = t1;
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return null;
  }
  return { tEnter: tmin, tExit: tmax };
}

/** 线段到点距离的平方 */
export function segPointDist2(a: Vec3, b: Vec3, p: Vec3): number {
  const ab = vSub(b, a);
  const l2 = vDot(ab, ab);
  if (l2 < 1e-12) return vDot(vSub(p, a), vSub(p, a));
  let t = vDot(vSub(p, a), ab) / l2;
  t = clamp(t, 0, 1);
  const c = vAdd(a, vScale(ab, t));
  return vDot(vSub(p, c), vSub(p, c));
}

/** 线段是否穿过球（含端点在球内） */
export function segIntersectsSphere(a: Vec3, b: Vec3, center: Vec3, r: number): boolean {
  return segPointDist2(a, b, center) <= r * r;
}

/** 射线方向从偏航/俯仰角构造：yaw=0 朝 -Z，俯仰向上为正 */
export function dirFromAngles(yawDeg: number, pitchDeg: number): Vec3 {
  const y = yawDeg * Math.PI / 180, p = pitchDeg * Math.PI / 180;
  return { x: Math.sin(y) * Math.cos(p), y: Math.sin(p), z: -Math.cos(y) * Math.cos(p) };
}

/** 从原点 o 朝 d 方向的圆盘采样（散布用，角度制） */
export function coneSpread(dir: Vec3, halfAngleDeg: number, u1: number, u2: number): Vec3 {
  if (halfAngleDeg <= 0) return vCopy(dir);
  const ang = halfAngleDeg * Math.PI / 180;
  const cosA = Math.cos(ang * Math.sqrt(u1));
  const phi = 2 * Math.PI * u2;
  const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
  // 构造正交基
  const up = Math.abs(dir.y) > 0.94 ? v3(1, 0, 0) : v3(0, 1, 0);
  const rx = vNorm(vCross(up, dir));
  const ry = vNorm(vCross(dir, rx));
  return vNorm(vAdd(vAdd(vScale(dir, cosA), vScale(rx, sinA * Math.cos(phi))), vScale(ry, sinA * Math.sin(phi))));
}
