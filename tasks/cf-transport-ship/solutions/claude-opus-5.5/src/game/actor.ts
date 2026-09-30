// 对局中的一名角色（玩家或电脑）。运动、装备、命中体与战绩共用同一实体。
import { MATCH, PLAYER, type PrimaryId, type Slot } from "../config";
import type { Combatant } from "../combat/combat";
import { Inventory } from "../combat/weapons";
import { Motor } from "../core/motor";
import { Rng } from "../core/rng";
import type { Team } from "../map/layout";

/** 每个固定步长的操作意图；玩家输入与电脑决策写入同一结构 */
export interface Intent {
  fwd: number;
  right: number;
  walk: boolean;
  crouch: boolean;
  jump: boolean;
  fire: boolean;
  alt: boolean;
  reload: boolean;
  slot: Slot | -1;
  cycle: -1 | 0 | 1;
  quick: boolean;
  throwNade: boolean;
}

export function emptyIntent(): Intent {
  return { fwd: 0, right: 0, walk: false, crouch: false, jump: false, fire: false, alt: false, reload: false, slot: -1, cycle: 0, quick: false, throwNade: false };
}

/** 清除一次性动作（持续按键保留） */
export function clearEdges(i: Intent): void {
  i.jump = false; i.alt = false; i.reload = false; i.slot = -1; i.cycle = 0; i.quick = false; i.throwNade = false;
}

export class Actor implements Combatant {
  readonly motor = new Motor();
  readonly inv: Inventory;
  readonly rng: Rng;
  yaw = 0;
  pitch = 0;
  kickP = 0; // 后坐造成的瞄准偏移（弧度）
  kickY = 0;
  health: number = MATCH.maxHealth;
  armor: number = MATCH.maxArmor;
  alive = false;
  protect = 0;
  respawnT = 0;
  deathT = 0;
  primaryChoice: PrimaryId;
  kills = 0;
  deaths = 0;
  headshots = 0;
  damageDealt = 0;
  lastAttacker = -1;
  lastHitFrom: [number, number, number] | null = null;
  lastHitT = -99;
  stepDist = 0;
  lastShotT = -99;
  oobCount = 0;
  dummy = false; // 测试靶：不复活、不计入比分
  intent: Intent = emptyIntent();

  constructor(
    readonly id: number, readonly team: Team, readonly name: string, readonly isPlayer: boolean, primary: PrimaryId, seed: number,
  ) {
    this.primaryChoice = primary;
    this.inv = new Inventory(primary);
    this.rng = new Rng(seed);
  }

  get x(): number { return this.motor.x; }
  set x(v: number) { this.motor.x = v; }
  get y(): number { return this.motor.y; }
  set y(v: number) { this.motor.y = v; }
  get z(): number { return this.motor.z; }
  set z(v: number) { this.motor.z = v; }
  /** 与视点高度同步的蹲伏程度（命中体、角色模型共用） */
  get crouch(): number {
    const k = (PLAYER.eyeStand - this.motor.eyeOff) / (PLAYER.eyeStand - PLAYER.eyeCrouch);
    return Math.max(0, Math.min(1, k));
  }
  get score(): number {
    // 得分 = 击杀 ×2 + 爆头 + 每 100 点造成伤害 1 分
    return this.kills * 2 + this.headshots + Math.floor(this.damageDealt / 100);
  }

  eye(): [number, number, number] {
    return [this.motor.x, this.motor.eyeY, this.motor.z];
  }

  /** 实际瞄准方向（含后坐偏移） */
  aimDir(): [number, number, number] {
    return dirFrom(this.yaw + this.kickY, this.pitch + this.kickP);
  }

  /** 枪口位置：视点前方偏右下，随视线旋转 */
  muzzle(): [number, number, number] {
    const y = this.yaw + this.kickY, p = this.pitch + this.kickP;
    const f = dirFrom(y, p);
    const rx = Math.cos(y), rz = -Math.sin(y);
    const ux = Math.sin(y) * Math.sin(p), uy = Math.cos(p), uz = Math.cos(y) * Math.sin(p);
    const e = this.eye();
    return [e[0] + f[0] * 0.55 + rx * 0.14 - ux * 0.13, e[1] + f[1] * 0.55 - uy * 0.13, e[2] + f[2] * 0.55 + rz * 0.14 - uz * 0.13];
  }
}

/** 相机约定：yaw=0 面向 -Z，pitch>0 抬头 */
export function dirFrom(yaw: number, pitch: number): [number, number, number] {
  const cp = Math.cos(pitch);
  return [-Math.sin(yaw) * cp, Math.sin(pitch), -Math.cos(yaw) * cp];
}

export function yawTo(dx: number, dz: number): number {
  return Math.atan2(-dx, -dz);
}

export function wrapAngle(a: number): number {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}
