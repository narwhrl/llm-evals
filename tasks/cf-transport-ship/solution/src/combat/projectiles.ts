// 投掷物：真实飞行、重力、与地图盒体反弹、引信；烟雾体的起烟/持续/消散与视线遮挡。
import { GRENADE } from "../config";
import { type World, bulletFilter } from "../core/world";
import type { GrenadeKind } from "./weapons";

export interface Grenade {
  id: number;
  kind: GrenadeKind;
  owner: number;
  team: 0 | 1;
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  fuse: number;
  resting: boolean;
  bounces: number;
  lastBounce: number; // 反弹音冷却
}

let nadeSeq = 0;

export function spawnGrenade(
  kind: GrenadeKind, owner: number, team: 0 | 1, pos: [number, number, number], dir: [number, number, number],
  inherit: [number, number, number], lob: boolean,
): Grenade {
  const sp = lob ? GRENADE.lobSpeed : GRENADE.throwSpeed;
  return {
    id: ++nadeSeq, kind, owner, team,
    x: pos[0], y: pos[1], z: pos[2],
    vx: dir[0] * sp + inherit[0] * 0.6, vy: dir[1] * sp + 2.2 + inherit[1] * 0.3, vz: dir[2] * sp + inherit[2] * 0.6,
    fuse: kind === "he" ? GRENADE.he.fuse : GRENADE.smoke.fuse,
    resting: false, bounces: 0, lastBounce: 0,
  };
}

/** 推进投掷物；返回本步是否发生了可听见的反弹 */
export function stepGrenade(g: Grenade, dt: number, world: World): boolean {
  g.fuse -= dt;
  g.lastBounce = Math.max(0, g.lastBounce - dt);
  if (g.resting) return false;
  g.vy -= 20 * dt;
  let remaining = dt;
  let bounced = false;
  for (let iter = 0; iter < 3 && remaining > 1e-6; iter++) {
    const sp = Math.hypot(g.vx, g.vy, g.vz);
    if (sp < 1e-6) break;
    const dx = g.vx / sp, dy = g.vy / sp, dz = g.vz / sp;
    const travel = sp * remaining;
    const hits = world.raycastAll(g.x, g.y, g.z, dx, dy, dz, travel + GRENADE.radius, bulletFilter);
    let hit = null;
    // 忽略已在远离的表面（刚反弹后的同一面）
    for (const h of hits) if (h.tIn >= -GRENADE.radius && g.vx * h.nx + g.vy * h.ny + g.vz * h.nz < 0) { hit = h; break; }
    if (!hit) {
      g.x += dx * travel; g.y += dy * travel; g.z += dz * travel;
      break;
    }
    const t = Math.max(0, hit.tIn - GRENADE.radius);
    g.x += dx * t; g.y += dy * t; g.z += dz * t;
    remaining -= t / sp;
    // 反射：法向分量乘恢复系数，切向分量乘摩擦
    const vn = g.vx * hit.nx + g.vy * hit.ny + g.vz * hit.nz;
    const tx = g.vx - vn * hit.nx, ty = g.vy - vn * hit.ny, tz = g.vz - vn * hit.nz;
    const e = GRENADE.restitution;
    g.vx = tx * GRENADE.friction - vn * e * hit.nx;
    g.vy = ty * GRENADE.friction - vn * e * hit.ny;
    g.vz = tz * GRENADE.friction - vn * e * hit.nz;
    if (Math.abs(vn) > 1.5 && g.lastBounce <= 0) { bounced = true; g.lastBounce = 0.12; }
    g.bounces++;
    if (hit.ny > 0.7 && Math.hypot(g.vx, g.vy, g.vz) < 0.9) {
      g.vx = g.vy = g.vz = 0;
      g.resting = true;
      break;
    }
  }
  if (g.y < -6) { g.resting = true; g.fuse = Math.min(g.fuse, 0); }
  return bounced;
}

export interface Smoke {
  id: number;
  x: number; y: number; z: number;
  age: number;
}

const S = GRENADE.smoke;
const TOTAL = S.grow + S.hold + S.fade;

export function smokeAlive(s: Smoke): boolean {
  return s.age < TOTAL;
}

/** 当前半径与浓度（0..1） */
export function smokeState(s: Smoke): { r: number; density: number } {
  if (s.age < S.grow) {
    const k = s.age / S.grow;
    return { r: S.radius * (0.3 + 0.7 * Math.sqrt(k)), density: 0.5 + 0.5 * k };
  }
  if (s.age < S.grow + S.hold) return { r: S.radius, density: 1 };
  const k = Math.min(1, (s.age - S.grow - S.hold) / S.fade);
  return { r: S.radius * (1 + 0.15 * k), density: 1 - k };
}

/**
 * 线段穿过烟雾体（竖向压扁的椭球）的有效长度 × 浓度超过阈值即视为遮挡。
 * 视觉感知、敌人标识、小地图暴露共用这一判定；子弹不受烟雾影响。
 */
export function smokeBlocks(smokes: readonly Smoke[], ax: number, ay: number, az: number, bx: number, by: number, bz: number): boolean {
  let total = 0;
  for (const s of smokes) {
    const { r, density } = smokeState(s);
    if (density < 0.15) continue;
    const ky = r / (S.height * 0.55); // 竖向缩放，使椭球成为半径 r 的球
    const cy = s.y + S.height * 0.45;
    const ox = ax - s.x, oy = (ay - cy) * ky, oz = az - s.z;
    const dx = bx - ax, dy = (by - ay) * ky, dz = bz - az;
    const a = dx * dx + dy * dy + dz * dz;
    if (a < 1e-9) continue;
    const b = ox * dx + oy * dy + oz * dz;
    const c = ox * ox + oy * oy + oz * oz - r * r;
    const disc = b * b - a * c;
    if (disc <= 0) continue;
    const sq = Math.sqrt(disc);
    const t0 = Math.max(0, (-b - sq) / a), t1 = Math.min(1, (-b + sq) / a);
    if (t1 <= t0) continue;
    const segLen = Math.hypot(bx - ax, by - ay, bz - az);
    total += (t1 - t0) * segLen * density;
    if (total >= S.blockChord) return true;
  }
  return false;
}

/** 某点是否位于烟雾内部（用于画面遮罩与感知） */
export function insideSmoke(smokes: readonly Smoke[], x: number, y: number, z: number): number {
  let best = 0;
  for (const s of smokes) {
    const { r, density } = smokeState(s);
    const ky = r / (S.height * 0.55);
    const d = Math.hypot(x - s.x, (y - (s.y + S.height * 0.45)) * ky, z - s.z) / r;
    if (d < 1) best = Math.max(best, density * Math.min(1, (1 - d) * 2.5));
  }
  return best;
}
