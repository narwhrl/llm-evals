// 统一战斗判定：命中区域、按先后遮挡的弹道、木材穿透、枪口受阻、护甲与伤害。
// 玩家与电脑共用；不依赖渲染。
import { GRENADE, type GunDef, type MeleeAttack, type WeaponId } from "../config";
import { type Box, type RayHit, type World, bulletFilter, makeBox, rayBox, sightFilter } from "../core/world";
import type { Team } from "../map/layout";

export type Zone = "head" | "torso" | "arm" | "leg";

/** 参与命中与伤害判定的最小角色视图 */
export interface Combatant {
  id: number;
  team: Team;
  alive: boolean;
  x: number; y: number; z: number; // 脚底
  yaw: number;
  crouch: number; // 0 站立 … 1 下蹲（与碰撞体同步）
  health: number;
  armor: number;
  protect: number; // 出生保护剩余秒数
}

// 命中体（站立 / 下蹲两套参数按 crouch 插值）。局部坐标：x 右，z 前（-Z 为前，与相机一致）。
interface Part { zone: Zone; cx: number; cy: [number, number]; cz: number; hx: number; hy: [number, number]; hz: number }
const PARTS: Part[] = [
  { zone: "torso", cx: 0, cy: [1.2, 0.84], cz: 0, hx: 0.23, hy: [0.3, 0.26], hz: 0.14 },
  { zone: "leg", cx: 0, cy: [0.46, 0.28], cz: 0, hx: 0.19, hy: [0.46, 0.28], hz: 0.14 },
  { zone: "arm", cx: 0.12, cy: [1.3, 0.94], cz: -0.34, hx: 0.08, hy: [0.08, 0.08], hz: 0.22 },
  { zone: "arm", cx: 0.29, cy: [1.28, 0.92], cz: -0.06, hx: 0.07, hy: [0.13, 0.12], hz: 0.1 },
];
const HEAD = { r: 0.125, y: [1.64, 1.1] as [number, number], z: -0.02 };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const scratchBox = makeBox({ id: "hb", kind: "hitbox", mat: "steel", c: [0, 0, 0], h: [1, 1, 1] });
const scratchHit: RayHit = { box: scratchBox, tIn: 0, tOut: 0, nx: 0, ny: 0, nz: 0 };

function setPart(b: Box, c: Combatant, p: Part): void {
  const s = Math.sin(c.yaw), co = Math.cos(c.yaw);
  const cy = lerp(p.cy[0], p.cy[1], c.crouch);
  // 局部 (x, z) → 世界，旋转与 three.js rotation.y 一致
  b.cx = c.x + p.cx * co + p.cz * s;
  b.cz = c.z - p.cx * s + p.cz * co;
  b.cy = c.y + cy;
  b.hx = p.hx; b.hy = lerp(p.hy[0], p.hy[1], c.crouch); b.hz = p.hz;
  b.yaw = c.yaw; b.cos = co; b.sin = s;
}

export function headCenter(c: Combatant): [number, number, number] {
  const s = Math.sin(c.yaw), co = Math.cos(c.yaw);
  return [c.x + HEAD.z * s, c.y + lerp(HEAD.y[0], HEAD.y[1], c.crouch), c.z + HEAD.z * co];
}

export function chestCenter(c: Combatant): [number, number, number] {
  return [c.x, c.y + lerp(1.25, 0.88, c.crouch), c.z];
}

/** 射线与角色命中体求交，同一角色只返回最近的一个部位 */
export function rayCharacter(
  c: Combatant, ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxT: number,
): { t: number; zone: Zone } | null {
  // 粗筛：射线到竖轴的水平距离
  const rx = c.x - ox, rz = c.z - oz;
  const hl = dx * dx + dz * dz;
  const tc = hl > 1e-9 ? (rx * dx + rz * dz) / hl : 0;
  const px = ox + dx * tc - c.x, pz = oz + dz * tc - c.z;
  if (px * px + pz * pz > 0.8 * 0.8 && hl > 1e-9) return null;
  let best = maxT, zone: Zone | null = null;
  // 头部球体
  const [hx, hy, hz] = headCenter(c);
  const lx = ox - hx, ly = oy - hy, lz = oz - hz;
  const b = lx * dx + ly * dy + lz * dz;
  const cc = lx * lx + ly * ly + lz * lz - HEAD.r * HEAD.r;
  const disc = b * b - cc;
  if (disc >= 0) {
    const t = -b - Math.sqrt(disc);
    if (t >= 0 && t < best) { best = t; zone = "head"; }
  }
  for (const p of PARTS) {
    for (const mirror of p.cx === 0 ? [1] : [1, -1]) {
      const q = mirror === 1 ? p : { ...p, cx: -p.cx };
      setPart(scratchBox, c, q);
      if (rayBox(scratchBox, ox, oy, oz, dx, dy, dz, scratchHit) && scratchHit.tIn >= 0 && scratchHit.tIn < best) {
        best = scratchHit.tIn;
        zone = p.zone;
      }
    }
  }
  return zone ? { t: best, zone } : null;
}

export interface Impact { x: number; y: number; z: number; nx: number; ny: number; nz: number; mat: string; exit: boolean }

export interface ShotResult {
  victim: Combatant | null;
  zone: Zone | null;
  dist: number;
  damageMul: number; // 穿透后剩余倍率
  end: [number, number, number];
  impacts: Impact[];
  penetrated: number;
  muzzleBlocked: boolean;
}

/**
 * 解析一发子弹。先确定准星射线（眼睛 → 方向）的落点，再检查枪口到该落点的实际弹道：
 * 近处墙体、箱体、友军会先于其后的目标截停子弹。木材按厚度消耗穿透力。
 */
export function resolveShot(
  world: World, gun: GunDef, shooter: Combatant, targets: readonly Combatant[],
  eye: [number, number, number], dir: [number, number, number], muzzle: [number, number, number],
): ShotResult {
  const [ex, ey, ez] = eye, [dx, dy, dz] = dir;
  // 准星射线只用于求瞄准点（首个不可穿透的遮挡或角色）
  let aimT = gun.range;
  const wall = world.firstHit(ex, ey, ez, dx, dy, dz, gun.range, (b) => b.bullet && b.mat !== "wood");
  if (wall < aimT) aimT = wall;
  for (const c of targets) {
    if (!c.alive || c.id === shooter.id) continue;
    const h = rayCharacter(c, ex, ey, ez, dx, dy, dz, aimT);
    if (h && h.t < aimT) aimT = h.t;
  }
  const ax = ex + dx * aimT, ay = ey + dy * aimT, az = ez + dz * aimT;
  // 实际弹道：枪口 → 瞄准点，延伸到射程
  let mx = muzzle[0], my = muzzle[1], mz = muzzle[2];
  // 眼睛到枪口之间被实体挡住（贴墙）时，子弹从挡住处截停
  const ebx = mx - ex, eby = my - ey, ebz = mz - ez;
  const el = Math.hypot(ebx, eby, ebz);
  const res: ShotResult = { victim: null, zone: null, dist: 0, damageMul: 1, end: [ax, ay, az], impacts: [], penetrated: 0, muzzleBlocked: false };
  if (el > 1e-4) {
    const hits = world.raycastAll(ex, ey, ez, ebx / el, eby / el, ebz / el, el, bulletFilter);
    if (hits.length) {
      const h = hits[0];
      const t = Math.max(0, h.tIn);
      res.muzzleBlocked = true;
      res.end = [ex + (ebx / el) * t, ey + (eby / el) * t, ez + (ebz / el) * t];
      res.impacts.push({ x: res.end[0], y: res.end[1], z: res.end[2], nx: h.nx, ny: h.ny, nz: h.nz, mat: h.box.mat, exit: false });
      return res;
    }
  }
  let bx = ax - mx, by = ay - my, bz = az - mz;
  let bl = Math.hypot(bx, by, bz);
  if (bl < 0.05) { bx = dx; by = dy; bz = dz; bl = 1; }
  bx /= bl; by /= bl; bz /= bl;
  const maxT = gun.range;
  // 收集世界命中（复制出来，避免后续查询覆盖复用数组）
  const wh = world.raycastAll(mx, my, mz, bx, by, bz, maxT, bulletFilter).map((h) => ({ box: h.box, tIn: h.tIn, tOut: h.tOut, nx: h.nx, ny: h.ny, nz: h.nz }));
  // 角色命中（每名角色至多一次）
  const ch: { c: Combatant; t: number; zone: Zone }[] = [];
  for (const c of targets) {
    if (!c.alive || c.id === shooter.id) continue;
    const h = rayCharacter(c, mx, my, mz, bx, by, bz, maxT);
    if (h) ch.push({ c, t: h.t, zone: h.zone });
  }
  ch.sort((a, b) => a.t - b.t);
  let power = gun.pen, mul = 1, wi = 0, ci = 0;
  for (;;) {
    const w = wi < wh.length ? wh[wi] : null;
    const c = ci < ch.length ? ch[ci] : null;
    if (!w && !c) {
      res.end = [mx + bx * maxT, my + by * maxT, mz + bz * maxT];
      return res;
    }
    if (c && (!w || c.t <= Math.max(0, w.tIn))) {
      ci++;
      res.end = [mx + bx * c.t, my + by * c.t, mz + bz * c.t];
      res.dist = c.t;
      if (c.c.team === shooter.team) return res; // 友军挡枪：截停且不受伤
      res.victim = c.c;
      res.zone = c.zone;
      res.damageMul = mul;
      return res;
    }
    wi++;
    const w2 = w!;
    const tIn = Math.max(0, w2.tIn);
    const px = mx + bx * tIn, py = my + by * tIn, pz = mz + bz * tIn;
    res.impacts.push({ x: px, y: py, z: pz, nx: w2.nx, ny: w2.ny, nz: w2.nz, mat: w2.box.mat, exit: false });
    const thick = w2.tOut - tIn;
    if (w2.box.mat === "wood" && res.penetrated < gun.maxPenObjects && thick <= power) {
      power -= thick;
      res.penetrated++;
      mul *= Math.max(0.2, 0.78 - 0.18 * thick);
      const qx = mx + bx * w2.tOut, qy = my + by * w2.tOut, qz = mz + bz * w2.tOut;
      res.impacts.push({ x: qx, y: qy, z: qz, nx: -w2.nx, ny: -w2.ny, nz: -w2.nz, mat: "wood", exit: true });
      continue;
    }
    res.end = [px, py, pz];
    return res;
  }
}

export function zoneMul(gun: GunDef, zone: Zone): number {
  return zone === "head" ? gun.headMul : zone === "arm" ? gun.limbMul : zone === "leg" ? gun.legMul : 1;
}

export function gunDamage(gun: GunDef, dist: number, zone: Zone, penMul: number): number {
  const f = dist <= gun.falloffStart ? 1
    : dist >= gun.falloffEnd ? gun.minDamageMul
    : 1 - (1 - gun.minDamageMul) * ((dist - gun.falloffStart) / (gun.falloffEnd - gun.falloffStart));
  return gun.damage * f * zoneMul(gun, zone) * penMul;
}

export interface DamageEvent {
  seq: number;
  attacker: number;
  victim: number;
  weapon: WeaponId;
  zone: Zone | "blast";
  raw: number;
  health: number;
  armor: number;
  killed: boolean;
  blocked: "protect" | "friendly" | "dead" | null;
}

let damageSeq = 0;

/**
 * 施加伤害。护甲覆盖头、躯干、手臂，不覆盖腿：
 * 进入生命 = 原始伤害 × armorRatio，护甲扣减 = 其余部分 × 0.5；护甲不足部分回到生命。
 * 已死亡目标不会重复结算。
 */
export function applyDamage(
  victim: Combatant, attacker: Combatant, raw: number, zone: Zone | "blast", armorRatio: number, weapon: WeaponId,
): DamageEvent {
  const ev: DamageEvent = { seq: ++damageSeq, attacker: attacker.id, victim: victim.id, weapon, zone, raw, health: 0, armor: 0, killed: false, blocked: null };
  if (!victim.alive) { ev.blocked = "dead"; return ev; }
  if (victim.team === attacker.team && victim.id !== attacker.id) { ev.blocked = "friendly"; return ev; }
  if (victim.protect > 0) { ev.blocked = "protect"; return ev; }
  let hp = raw, ap = 0;
  if (victim.armor > 0 && zone !== "leg") {
    hp = raw * armorRatio;
    ap = (raw - hp) * 0.5;
    if (ap > victim.armor) {
      hp += (ap - victim.armor) * 2;
      ap = victim.armor;
    }
  }
  hp = Math.round(hp);
  ap = Math.round(ap);
  victim.armor = Math.max(0, victim.armor - ap);
  const before = victim.health;
  victim.health = Math.max(0, victim.health - hp);
  ev.health = before - victim.health;
  ev.armor = ap;
  if (victim.health <= 0) {
    victim.alive = false;
    ev.killed = true;
  }
  return ev;
}

/** 近战：只在命中时刻判定一次；距离、角度与墙体遮挡共同约束，只命中最近的一名敌人 */
export function resolveMelee(
  world: World, attacker: Combatant, targets: readonly Combatant[], eye: [number, number, number],
  fwd: [number, number, number], atk: MeleeAttack,
): { victim: Combatant; zone: Zone; dist: number } | null {
  let best: { victim: Combatant; zone: Zone; dist: number } | null = null;
  for (const c of targets) {
    if (!c.alive || c.team === attacker.team) continue;
    const pts: [Zone, [number, number, number]][] = [["head", headCenter(c)], ["torso", chestCenter(c)]];
    for (const [zone, p] of pts) {
      const vx = p[0] - eye[0], vy = p[1] - eye[1], vz = p[2] - eye[2];
      const d = Math.hypot(vx, vy, vz);
      if (d > atk.range + 0.25 || d < 1e-4) continue;
      const cos = (vx * fwd[0] + vy * fwd[1] + vz * fwd[2]) / d;
      if (cos < Math.cos(atk.halfAngle)) continue;
      if (world.segmentBlocked(eye[0], eye[1], eye[2], p[0], p[1], p[2], bulletFilter)) continue;
      // 头部只在准星确实靠近头部时计入
      if (zone === "head" && cos < Math.cos(0.16)) continue;
      if (!best || d < best.dist || (zone === "head" && best.victim === c)) best = { victim: c, zone, dist: d };
    }
  }
  return best;
}

/** 爆炸伤害：随距离线性衰减，按头/胸/脚三点的遮挡比例折减（实体舱壁、箱体可挡） */
export function blastDamage(world: World, cx: number, cy: number, cz: number, c: Combatant): number {
  const he = GRENADE.he;
  const [chx, chy, chz] = chestCenter(c);
  const d = Math.hypot(chx - cx, chy - cy, chz - cz);
  if (d >= he.radius) return 0;
  const pts: [number, number, number][] = [headCenter(c), [chx, chy, chz], [c.x, c.y + 0.2, c.z]];
  let open = 0;
  for (const p of pts) if (!world.segmentBlocked(cx, cy + 0.05, cz, p[0], p[1], p[2], sightFilter)) open++;
  if (open === 0) return 0;
  return he.damage * (1 - d / he.radius) * (open / pts.length);
}
