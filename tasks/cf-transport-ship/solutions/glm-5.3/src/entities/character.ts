/**
 * 角色：玩家与电脑共用（生命、护甲、装备、物理、姿态、脚步噪声）。
 * 只含逻辑；视觉模型见 characterModel.ts。
 */
import { COMBAT, PLAYER, Team, WeaponDef } from '../core/config';
import { Rng } from '../core/rng';
import { Body, ColliderWorld } from '../physics/world';
import { Loadout, WeaponState, activeWeapon, createLoadout, resetLoadout } from '../combat/weapons';
import { Vec3, clamp } from '../geometry/math';

export interface MoveIntent {
  forward: number;  // -1..1
  right: number;    // -1..1
  jump: boolean;
  crouch: boolean;
  silent: boolean;
  ads: boolean;
}

export const emptyIntent = (): MoveIntent => ({ forward: 0, right: 0, jump: false, crouch: false, silent: false, ads: false });

let nextCharId = 1;
export function resetCharIds(): void { nextCharId = 1; }

export class Character {
  readonly id: number;
  name: string;
  team: Team;
  isPlayer: boolean;

  body: Body;
  yaw = 0;
  pitch = 0;
  aimYaw = 0;   // 实际瞄准（后坐影响）
  aimPitch = 0;

  hp = COMBAT.hp;
  armor = COMBAT.armor;
  alive = true;
  crouching = false;
  crouch01 = 0;         // 0 站 .. 1 蹲（视觉过渡）
  onGround = true;
  spawnProtectedUntil = 0;
  respawnAt = 0;
  lastDamageFrom: number | null = null;
  lastDamageDir: Vec3 = { x: 0, y: 0, z: 0 };
  lastDamageAt = 0;

  loadout: Loadout;
  /** 视觉/听觉事件由 Game 读取 */
  events: Array<{ type: string; [k: string]: unknown }> = [];
  kills = 0;
  deaths = 0;
  score = 0;
  /** 脚步噪声强度（0 静 .. 1 跑），供电脑听觉感知 */
  noiseLevel = 0;
  private stepPhase = 0;

  constructor(team: Team, name: string, primaryId: string, isPlayer = false) {
    this.id = nextCharId++;
    this.team = team;
    this.name = name;
    this.isPlayer = isPlayer;
    this.loadout = createLoadout(primaryId);
    this.body = {
      pos: { x: 0, y: 0, z: 0 },
      vel: { x: 0, y: 0, z: 0 },
      radius: PLAYER.capsuleRadius,
      height: PLAYER.heightStand,
      grounded: false,
      groundY: 0,
    };
  }

  get eyeY(): number {
    return this.body.pos.y + (PLAYER.eyeStand - (PLAYER.eyeStand - PLAYER.eyeCrouch) * this.crouch01);
  }

  get weaponState(): WeaponState | null {
    return this.loadout.slot === 3 ? null : this.loadout.slots[this.loadout.slot];
  }

  get weaponDef(): WeaponDef {
    return activeWeapon(this.loadout);
  }

  eyePos(): Vec3 {
    return { x: this.body.pos.x, y: this.eyeY, z: this.body.pos.z };
  }

  /** 朝向单位向量 */
  lookDir(): Vec3 {
    const cp = Math.cos(this.pitch + this.aimPitch);
    return {
      x: Math.sin(this.yaw + this.aimYaw) * cp,
      y: Math.sin(this.pitch + this.aimPitch),
      z: -Math.cos(this.yaw + this.aimYaw) * cp,
    };
  }

  protected pushEvent(type: string, data: Record<string, unknown> = {}): void {
    this.events.push({ type, ...data });
    if (this.events.length > 64) this.events.splice(0, 32);
  }

  /**
   * 受击结算：护甲吸收；死亡只触发一次。
   * 返回实际扣除的生命值。
   */
  takeDamage(dmg: number, attacker: Character | null, dir: Vec3, now: number): number {
    if (!this.alive) return 0;
    if (dmg <= 0) return 0;
    if (this.protectedNow(now)) return 0;
    let rest = dmg;
    if (this.armor > 0) {
      const absorbed = Math.min(this.armor, dmg * COMBAT.armorAbsorb);
      this.armor -= absorbed;
      rest = dmg - absorbed;
    }
    this.hp -= rest;
    this.lastDamageFrom = attacker ? attacker.id : null;
    this.lastDamageDir = dir;
    this.lastDamageAt = now;
    this.pushEvent('hurt', { dmg, from: attacker?.id ?? 0 });
    if (this.hp <= 0) {
      this.hp = 0;
      this.die(attacker, now);
    }
    return rest;
  }

  /** 幂等死亡：重复调用不再计分 */
  die(killer: Character | null, now: number): boolean {
    if (!this.alive) return false;
    this.alive = false;
    this.deaths += 1;
    this.respawnAt = now + COMBAT.respawnDelay;
    this.body.vel = { x: 0, y: 0, z: 0 };
    if (killer && killer !== this) {
      killer.kills += 1;
      killer.score += 100;
    }
    this.pushEvent('death', { killer: killer?.id ?? 0, killerName: killer?.name ?? '', weapon: killer?.weaponDef.nameEn ?? '' });
    return true;
  }

  respawn(pos: Vec3, yaw: number, now: number): void {
    this.hp = COMBAT.hp;
    this.armor = COMBAT.armor;
    this.alive = true;
    this.crouching = false;
    this.crouch01 = 0;
    this.body.pos = { x: pos.x, y: pos.y + 0.05, z: pos.z };
    this.body.vel = { x: 0, y: 0, z: 0 };
    this.body.height = PLAYER.heightStand;
    this.yaw = yaw;
    this.pitch = 0;
    this.aimYaw = 0;
    this.aimPitch = 0;
    this.spawnProtectedUntil = now + COMBAT.spawnProtect;
    this.lastDamageFrom = null;
    resetLoadout(this.loadout);
    this.pushEvent('respawn', {});
  }

  /** 出生保护是否有效（开火会由 Game 解除） */
  protectedNow(now: number): boolean {
    return this.alive && now < this.spawnProtectedUntil;
  }

  breakProtection(now: number): void {
    if (now < this.spawnProtectedUntil) this.spawnProtectedUntil = now;
  }

  /** 共享移动：由 Player/Bot 提供 intent */
  updateMovement(dt: number, intent: MoveIntent, world: ColliderWorld, now: number): void {
    if (!this.alive) return;
    // 蹲起（头顶受限时保持蹲姿由碰撞高度限制处理）
    const wantCrouch = intent.crouch;
    if (wantCrouch) this.crouching = true;
    else if (this.crouching) {
      // 尝试站起：头顶有实体则保持
      const headroom = this.headroom(world);
      if (headroom) this.crouching = true;
      else this.crouching = false;
    }
    this.crouch01 = clamp(this.crouch01 + (this.crouching ? 1 : -1) * dt * PLAYER.crouchLerp, 0, 1);
    const targetH = PLAYER.heightStand - (PLAYER.heightStand - PLAYER.heightCrouch) * this.crouch01;
    this.body.height = targetH;

    // 速度
    let speed = PLAYER.walkSpeed;
    if (intent.silent && !intent.jump) speed = PLAYER.silentSpeed;
    if (this.crouching) speed = Math.min(speed, PLAYER.crouchSpeed);
    if (intent.ads) speed *= PLAYER.adsMoveMul;
    const wep = this.weaponDef;
    if (wep.cls === 'sniper') speed *= 0.9;

    // 世界系方向：前向 (sin yaw, 0, -cos yaw)，右向 (cos yaw, 0, sin yaw)
    const sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    const fx = sy * intent.forward + cy * intent.right;
    const fz = -cy * intent.forward + sy * intent.right;
    const flen = Math.hypot(fx, fz);
    const wishX = flen > 1e-4 ? (fx / flen) * speed : 0;
    const wishZ = flen > 1e-4 ? (fz / flen) * speed : 0;

    const accel = this.body.grounded ? PLAYER.accel : PLAYER.airAccel;
    const dvx = wishX - this.body.vel.x;
    const dvz = wishZ - this.body.vel.z;
    const dl = Math.hypot(dvx, dvz);
    if (dl > 1e-6) {
      const a = Math.min(dl, accel * dt);
      this.body.vel.x += (dvx / dl) * a;
      this.body.vel.z += (dvz / dl) * a;
    }
    if (flen <= 1e-4 && this.body.grounded) {
      const f = Math.max(0, 1 - PLAYER.friction * dt);
      this.body.vel.x *= f;
      this.body.vel.z *= f;
    }
    if (intent.jump && this.body.grounded) {
      this.body.vel.y = PLAYER.jumpVel;
      this.body.grounded = false;
      this.pushEvent('jump');
    }
    this.body.vel.y -= PLAYER.gravity * dt;
    if (this.body.vel.y < -40) this.body.vel.y = -40;

    const wasAir = !this.body.grounded;
    const prevVy = this.body.vel.y;
    world.moveBody(this.body, dt, PLAYER.stepHeight);
    this.onGround = this.body.grounded;

    if (wasAir && this.onGround) {
      if (prevVy < -PLAYER.fallDamageVel) {
        const dmg = (-prevVy - PLAYER.fallDamageVel) * 7;
        this.takeDamage(dmg, null, { x: 0, y: -1, z: 0 }, now);
      }
      this.pushEvent('land', { hard: prevVy < -12 });
    }

    // 脚步声：由真实移动驱动
    const hSpeed = Math.hypot(this.body.vel.x, this.body.vel.z);
    if (this.onGround && hSpeed > 0.5) {
      this.stepPhase += hSpeed * dt;
      const stride = intent.silent || this.crouching ? 2.6 : 1.9;
      if (this.stepPhase > stride) {
        this.stepPhase = 0;
        const loud = intent.silent ? 0.15 : this.crouching ? 0.25 : 1;
        this.pushEvent('step', { loud, pos: { ...this.body.pos } });
        this.noiseLevel = loud;
      }
    } else {
      this.noiseLevel = 0;
    }
  }

  /** 头顶 0.6m 内是否有实体（蹲起限制） */
  private headroom(world: ColliderWorld): boolean {
    const p = this.body.pos;
    const cols = world.queryRegion(p.x - 0.3, p.z - 0.3, p.x + 0.3, p.z + 0.3);
    const top = p.y + PLAYER.heightStand;
    for (const c of cols) {
      if (!c.charBlock) continue;
      const bottom = c.cy - c.hy;
      if (bottom > p.y + PLAYER.heightCrouch - 0.1 && bottom < top) {
        // 水平重叠检查
        const dx = p.x - c.cx, dz = p.z - c.cz;
        const lx = dx * Math.cos(-c.yaw) + dz * Math.sin(-c.yaw);
        const lz = -dx * Math.sin(-c.yaw) + dz * Math.cos(-c.yaw);
        if (Math.abs(lx) < c.hx + this.body.radius && Math.abs(lz) < c.hz + this.body.radius) return true;
      }
    }
    return false;
  }

  /** 当前射击散布（度）：基础 + 连射 + 移动 + 姿态 */
  currentSpread(_now: number, ads: boolean): number {
    const def = this.weaponDef;
    const ws = this.weaponState;
    const heat = ws ? ws.heat : 0;
    let s = ads ? def.spreadAds : def.spreadHip;
    s += def.spreadGrow * heat;
    const hSpeed = Math.hypot(this.body.vel.x, this.body.vel.z);
    const moveK = clamp(hSpeed / PLAYER.walkSpeed, 0, 1) * def.spreadMoveMul;
    s *= 1 + moveK;
    if (!this.onGround) s *= 2.1;
    if (this.crouching) s *= 0.8;
    if (def.cls === 'sniper' && !ads) s = def.spreadHip; // 狙击腰射恒定巨大散布
    return s;
  }

  drainEvents(): Array<{ type: string; [k: string]: unknown }> {
    const e = this.events;
    this.events = [];
    return e;
  }
}

/** 命名池 */
export const BOT_NAMES_BLUE = ['阿列克谢', '马库斯', '陈锋', '维克多', '渡边', '萨米尔', '李云龙', '安东'];
export const BOT_NAMES_RED = ['夜枭', '毒蛇', '猎隼', '灰狼', '秃鹫', '黑豹', '螳螂', '银狐'];

export function pickBotName(team: Team, used: Set<string>, rng: Rng): string {
  const pool = team === 'blue' ? BOT_NAMES_BLUE : BOT_NAMES_RED;
  for (let i = 0; i < 40; i++) {
    const n = rng.pick(pool);
    if (!used.has(n)) { used.add(n); return n; }
  }
  return (team === 'blue' ? '保卫者' : '潜伏者') + rng.int(1, 99);
}
