/**
 * 统一射击判定：玩家与电脑共用。
 * 按空间先后遮挡处理：木箱/篷布可按厚度穿透并衰减，金属截停；
 * 角色命中盒（头/躯干/腿）与姿态同步；一发子弹只结算一个目标。
 */
import { PART_MUL, MELEE_PART_MUL, COMBAT, WeaponDef, BodyPart } from '../core/config';
import { Rng } from '../core/rng';
import { Box, Vec3, coneSpread, rayBox, rotY, v3, vSub, vScale, vAdd, vDist } from '../geometry/math';
import type { ColliderWorld } from '../physics/world';

export interface HitTarget {
  id: number;
  team: string;
  alive: boolean;
  crouching: boolean;
  /** 脚底中心 */
  pos: Vec3;
  /** 朝向（弧度，仅影响命中盒朝向） */
  yaw: number;
  radius: number;
  standHeight: number;
  crouchHeight: number;
}

export interface DamageEvent {
  targetId: number;
  part: BodyPart;
  dmg: number;
  point: Vec3;
  dist: number;
  penetrated: boolean;
}

export interface SurfaceEvent {
  point: Vec3;
  normal: Vec3;
  surface: 'metal' | 'wood' | 'tarp' | 'deck';
  penetrated: boolean;
}

export interface ShotResult {
  /** 弹道终点（曳光用） */
  endPoint: Vec3;
  damages: DamageEvent[];
  surfaces: SurfaceEvent[];
  stoppedBy: 'target' | 'metal' | 'thickness' | 'range' | 'none';
}

/** 目标命中盒：头（窄）、躯干（含臂）、腿 */
export function hitboxes(t: HitTarget): Array<{ part: BodyPart; box: Box }> {
  const h = t.crouching ? t.crouchHeight : t.standHeight;
  const scale = h / t.standHeight;
  const eye = 1.62 * scale;
  return [
    { part: 'head', box: { cx: t.pos.x, cy: t.pos.y + eye + 0.10, cz: t.pos.z, hx: 0.135, hy: 0.125, hz: 0.16, yaw: t.yaw } },
    { part: 'torso', box: { cx: t.pos.x, cy: t.pos.y + 0.92 * scale, cz: t.pos.z, hx: 0.26, hy: 0.34 * scale, hz: 0.20, yaw: t.yaw } },
    { part: 'legs', box: { cx: t.pos.x, cy: t.pos.y + 0.30 * scale, cz: t.pos.z, hx: 0.22, hy: 0.30 * scale, hz: 0.19, yaw: t.yaw } },
  ];
}

interface RayEvent {
  t: number;
  kind: 'target' | 'surface';
  part?: BodyPart;
  target?: HitTarget;
  collider?: { surface: string; charBlock: boolean; bulletBlock: boolean };
  tExit?: number;
  normal?: Vec3;
}

function distanceFalloff(def: WeaponDef, dist: number): number {
  if (dist <= def.falloffStart) return 1;
  if (dist >= def.falloffEnd) return def.falloffMul;
  const t = (dist - def.falloffStart) / (def.falloffEnd - def.falloffStart);
  return 1 + (def.falloffMul - 1) * t;
}

/** 计算实际射击方向（散布），并返回弹道结果 */
export function resolveShot(
  world: ColliderWorld,
  targets: readonly HitTarget[],
  origin: Vec3,
  aimDir: Vec3,
  def: WeaponDef,
  spreadDeg: number,
  rng: Rng,
  maxDist = 200,
  attackerTeam?: string,
): ShotResult {
  const dir = coneSpread(aimDir, spreadDeg, rng.next(), rng.next());
  const events: RayEvent[] = [];

  for (const c of world.raycastPenetrations(origin, dir, maxDist)) {
    events.push({
      t: c.tEnter, kind: 'surface',
      collider: { surface: c.collider.surface, charBlock: c.collider.charBlock, bulletBlock: c.collider.bulletBlock },
      tExit: c.tExit,
      normal: surfaceNormal(origin, dir, c.tEnter, c.collider),
    });
  }
  for (const t of targets) {
    if (!t.alive) continue;
    for (const hb of hitboxes(t)) {
      const hit = rayBox(origin, dir, hb.box);
      if (hit && hit.tEnter > 0.1 && hit.tEnter < maxDist) {
        events.push({ t: hit.tEnter, kind: 'target', part: hb.part, target: t });
      }
    }
  }
  events.sort((a, b) => a.t - b.t);

  const result: ShotResult = { endPoint: vAdd(origin, vScale(dir, maxDist)), damages: [], surfaces: [], stoppedBy: 'none' };
  let dmg = def.dmgTorso;
  let budget = def.penThickness;
  let anyPen = false;

  for (const ev of events) {
    const point = vAdd(origin, vScale(dir, ev.t));
    if (ev.kind === 'target') {
      // 友军实体阻挡子弹但不受伤
      if (attackerTeam && ev.target!.team === attackerTeam) {
        result.endPoint = point;
        result.stoppedBy = 'target';
        return result;
      }
      const falloff = distanceFalloff(def, ev.t);
      const final = dmg * falloff * PART_MUL[ev.part!];
      result.damages.push({
        targetId: ev.target!.id, part: ev.part!, dmg: final,
        point, dist: ev.t, penetrated: anyPen,
      });
      result.endPoint = point;
      result.stoppedBy = 'target';
      return result;
    }
    // 静态面
    const surf = ev.collider!.surface as 'metal' | 'wood' | 'tarp' | 'deck';
    const thickness = Math.max(0, (ev.tExit ?? ev.t) - ev.t);
    const penetrable = (surf === 'wood' || surf === 'tarp') && def.penThickness > 0 && thickness <= budget + 1e-6;
    result.surfaces.push({ point, normal: ev.normal ?? v3(0, 1, 0), surface: surf, penetrated: penetrable });
    if (!penetrable) {
      result.endPoint = point;
      result.stoppedBy = surf === 'wood' || surf === 'tarp' ? 'thickness' : 'metal';
      return result;
    }
    // 穿透：衰减 + 厚度预算扣减
    dmg *= def.penDamageFactor;
    budget -= thickness;
    anyPen = true;
  }
  result.stoppedBy = events.length ? 'range' : 'none';
  return result;
}

/** 命中面法线（局部系主轴 → 世界系） */
function surfaceNormal(o: Vec3, d: Vec3, t: number, c: { cx: number; cy: number; cz: number; hx: number; hy: number; hz: number; yaw: number }): Vec3 {
  const p = vAdd(o, vScale(d, t));
  const lp = rotY(vSub(p, v3(c.cx, c.cy, c.cz)), -c.yaw);
  const dx = c.hx - Math.abs(lp.x), dy = c.hy - Math.abs(lp.y), dz = c.hz - Math.abs(lp.z);
  let nLocal: Vec3;
  if (dx <= dy && dx <= dz) nLocal = v3(Math.sign(lp.x) || 1, 0, 0);
  else if (dy <= dz) nLocal = v3(0, Math.sign(lp.y) || 1, 0);
  else nLocal = v3(0, 0, Math.sign(lp.z) || 1);
  return rotY(nLocal, c.yaw);
}

/** 近战判定：有效距离 + 角度 + 遮挡，命中单一目标 */
export function resolveMelee(
  world: ColliderWorld,
  targets: readonly HitTarget[],
  origin: Vec3,
  aimDir: Vec3,
  def: WeaponDef,
  heavy: boolean,
  excludeTeam?: string,
): { hit: boolean; dmg: number; targetId: number; part: BodyPart; point: Vec3 } | null {
  const range = heavy ? COMBAT.meleeHeavyRange : COMBAT.meleeLightRange;
  const arc = ((heavy ? COMBAT.meleeHeavyArc : COMBAT.meleeLightArc) * Math.PI) / 180;
  let best: { t: HitTarget; part: BodyPart; d: number } | null = null;
  for (const t of targets) {
    if (!t.alive) continue;
    if (excludeTeam && t.team === excludeTeam) continue;
    const center = v3(t.pos.x, t.pos.y + 0.9, t.pos.z);
    const to = vSub(center, origin);
    const d = Math.hypot(to.x, to.y, to.z);
    if (d > range + 0.3) continue;
    const nd = vScale(to, 1 / Math.max(1e-6, d));
    const dot = nd.x * aimDir.x + nd.y * aimDir.y + nd.z * aimDir.z;
    if (dot < Math.cos(arc / 1.0)) continue; // 朝向锥内
    const blocked = world.lineOfSight(origin, center);
    if (blocked !== null) continue;
    if (!best || d < best.d) best = { t, part: 'torso', d };
  }
  if (!best) return null;
  const mul = heavy ? COMBAT.meleeHeavyMul : 1;
  return {
    hit: true,
    dmg: def.dmgTorso * mul * MELEE_PART_MUL.torso,
    targetId: best.t.id,
    part: best.part,
    point: v3(best.t.pos.x, best.t.pos.y + 1.0, best.t.pos.z),
  };
}

/** 高爆手雷爆炸：距离衰减 + 实体遮挡 */
export function resolveExplosion(
  world: ColliderWorld,
  targets: readonly HitTarget[],
  pos: Vec3,
  excludeTeam?: string,
): Array<{ targetId: number; dmg: number; dist: number }> {
  const out: Array<{ targetId: number; dmg: number; dist: number }> = [];
  for (const t of targets) {
    if (!t.alive) continue;
    if (excludeTeam && t.team === excludeTeam) continue;
    const center = v3(t.pos.x, t.pos.y + 0.9 * (t.crouching ? 0.75 : 1), t.pos.z);
    const dist = vDist(center, pos);
    if (dist > COMBAT.heRadius) continue;
    const blocked = world.lineOfSight(pos, center) !== null;
    let k = 1 - dist / COMBAT.heRadius;
    let dmg = COMBAT.heMinDmg + (COMBAT.heMaxDmg - COMBAT.heMinDmg) * k * k;
    if (blocked) {
      dmg *= COMBAT.heBlockFactor;
      if (dist > 4) dmg = 0;
    }
    if (dmg > 0.5) out.push({ targetId: t.id, dmg, dist });
  }
  return out;
}
