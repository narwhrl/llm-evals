/**
 * 电脑对手：感知（视野角 + 视线 + 烟雾 + 声音）、反应、瞄准误差、
 * 路线选择、交战行为（点射/横移/换弹/掩体/投掷物）、卡住检测。
 * 与玩家共用移动、弹药、伤害、视线规则。
 */
import { COMBAT, DIFFICULTY, Difficulty, DiffParams } from '../core/config';
import { Rng } from '../core/rng';
import { NavGraph, astar, nearestNode } from './nav';
import { Character, MoveIntent, emptyIntent } from '../entities/character';
import { switchSlot } from '../combat/weapons';
import { SmokeRegistry } from '../combat/smoke';
import { ColliderWorld } from '../physics/world';
import { Vec3, clamp } from '../geometry/math';

export interface BotHost {
  world: ColliderWorld;
  smoke: SmokeRegistry;
  characters: Character[];
  now: number;
  /** 触发真实开火管线 */
  fireWeapon(c: Character, aimAt: Vec3): void;
  throwGrenadeAt(c: Character, target: Vec3): void;
  reloadWeapon(c: Character): void;
}

export type BotRole = 'assault' | 'flankPort' | 'flankStar' | 'sniper';

export class BotBrain {
  readonly char: Character;
  readonly diff: DiffParams;
  private rng: Rng;
  private g: NavGraph;
  private host: () => BotHost;

  role: BotRole;
  private path: number[] = [];
  private pathIdx = 0;
  private repathAt = 0;
  private stuckTimer = 0;
  private lastPos = { x: 0, z: 0 };
  private sidestepUntil = 0;
  private sidestepDir = 1;

  // 感知
  target: Character | null = null;
  private visibleUntil = 0;
  private reactionUntil = 0;
  lastKnownPos: Vec3 | null = null;
  lastKnownAt = -99;
  private heardPos: Vec3 | null = null;
  private heardAt = -99;

  // 交战
  private burstEnd = 0;
  private pauseEnd = 0;
  private strafePhase = 0;
  private wantReload = false;
  private nadeCooldown = 6;
  private aimErrYaw = 0;
  private aimErrPitch = 0;
  private aimErrTargetYaw = 0;
  private aimErrTargetPitch = 0;

  constructor(char: Character, role: BotRole, difficulty: Difficulty, seed: number, g: NavGraph, host: () => BotHost) {
    this.char = char;
    this.role = role;
    this.diff = DIFFICULTY[difficulty];
    this.rng = new Rng(seed);
    this.g = g;
    this.host = host;
    this.repathAt = 0;
  }

  get intent(): MoveIntent {
    return this._intent;
  }
  private _intent = emptyIntent();

  get aiming(): boolean {
    return this.target !== null;
  }

  update(dt: number): void {
    const h = this.host();
    const now = h.now;
    const c = this.char;
    if (!c.alive) {
      this.target = null;
      this._intent = emptyIntent();
      return;
    }

    this.perceive(h);
    this.updateAim(dt, now);
    this.updateCombat(now, h);
    this.updateNav(dt, h);
    this.nadeCooldown -= dt;
  }

  /** 视觉 + 声音感知 */
  private perceive(h: BotHost): void {
    const c = this.char;
    const now = h.now;
    let best: Character | null = null;
    let bestScore = -Infinity;
    const eye = c.eyePos();
    const look = c.lookDir();
    for (const e of h.characters) {
      if (!e.alive || e.team === c.team) continue;
      const ep = e.eyePos();
      const dx = ep.x - eye.x, dy = ep.y - eye.y, dz = ep.z - eye.z;
      const dist = Math.hypot(dx, dy, dz);
      if (dist > this.diff.viewDist) continue;
      // 视野角（以身体朝向为准）
      const dot = (dx * look.x + dy * look.y + dz * look.z) / Math.max(1e-6, dist);
      const fovCos = Math.cos((this.diff.fovDeg * Math.PI) / 360);
      const inFov = dot > fovCos;
      // 声音感知：不要求视野角，但要求距离与噪声
      let heard = false;
      if (!inFov && e.noiseLevel > 0.2 && dist < this.diff.hearDist * e.noiseLevel) heard = true;
      if (!inFov && !heard) continue;
      // 实际遮挡（含烟雾）
      const blocked = h.world.lineOfSight(eye, ep, (a, b) => h.smoke.blocksVision(a, b));
      if (blocked !== null) continue;
      const score = 100 - dist + (inFov ? 30 : 0) + (e.isPlayer ? 8 : 0);
      if (score > bestScore) { bestScore = score; best = e; }
    }
    if (best) {
      if (this.target !== best && now > this.reactionUntil - this.diff.reaction) {
        this.reactionUntil = now + this.diff.reaction;
      }
      if (this.target !== best) this.target = best;
      this.visibleUntil = now + 0.25;
      this.lastKnownPos = { ...best.body.pos };
      this.lastKnownAt = now;
    } else if (now > this.visibleUntil) {
      // 目标消失：保留短时最后已知位置
      this.target = null;
    }
    // 声音事件更新（非视野时）
    if (!this.target) {
      for (const e of h.characters) {
        if (!e.alive || e.team === c.team) continue;
        if (e.noiseLevel <= 0.05) continue;
        const d = Math.hypot(e.body.pos.x - c.body.pos.x, e.body.pos.z - c.body.pos.z);
        if (d < this.diff.hearDist * e.noiseLevel) {
          this.heardPos = { ...e.body.pos };
          this.heardAt = now;
        }
      }
    }
  }

  private updateAim(dt: number, now: number): void {
    const c = this.char;
    if (this.target && now > this.reactionUntil) {
      const tp = this.target.eyePos();
      const eye = c.eyePos();
      const dx = tp.x - eye.x, dy = tp.y - eye.y, dz = tp.z - eye.z;
      const dist = Math.hypot(dx, dy, dz);
      const wantYaw = Math.atan2(dx, -dz);
      const wantPitch = Math.asin(clamp(dy / Math.max(1e-6, dist), -1, 1));
      // 转身限速
      let dyaw = wantYaw - c.yaw;
      while (dyaw > Math.PI) dyaw -= 2 * Math.PI;
      while (dyaw < -Math.PI) dyaw += 2 * Math.PI;
      const maxTurn = this.diff.turnRate * dt;
      c.yaw += clamp(dyaw, -maxTurn, maxTurn);
      c.pitch = clamp(c.pitch + clamp(wantPitch - c.pitch, -maxTurn * 0.7, maxTurn * 0.7), -1.35, 1.35);
      // 瞄准误差漂移
      if (now > this.aimErrRefresh) {
        this.aimErrRefresh = now + 0.4;
        this.aimErrTargetYaw = this.rng.gauss(0, this.diff.aimErrDeg * Math.PI / 180);
        this.aimErrTargetPitch = this.rng.gauss(0, this.diff.aimErrDeg * 0.55 * Math.PI / 180);
      }
      this.aimErrYaw += (this.aimErrTargetYaw - this.aimErrYaw) * Math.min(1, dt * 6);
      this.aimErrPitch += (this.aimErrTargetPitch - this.aimErrPitch) * Math.min(1, dt * 6);
      c.aimYaw = this.aimErrYaw;
      c.aimPitch = this.aimErrPitch;
    } else {
      c.aimYaw *= Math.max(0, 1 - dt * 4);
      c.aimPitch *= Math.max(0, 1 - dt * 4);
    }
  }
  private aimErrRefresh = 0;

  private updateCombat(now: number, h: BotHost): void {
    const c = this.char;
    const ws = c.weaponState;
    this._intent.ads = false;

    if (this.target && now > this.reactionUntil && now < this.visibleUntil) {
      const dist = Math.hypot(
        this.target.body.pos.x - c.body.pos.x,
        this.target.body.pos.y - c.body.pos.y,
        this.target.body.pos.z - c.body.pos.z,
      );
      // 狙击开镜
      this._intent.ads = c.weaponDef.cls === 'sniper' && dist > 12;

      // 弹匣管理
      if (ws) {
        if (ws.mag <= 0 || (this.wantReload && ws.canReload(now))) {
          if (ws.mag <= 0) {
            if (ws.reserve > 0) h.reloadWeapon(c);
            else this.switchToPistol(h);
          } else if (this.coveredNow(now)) {
            h.reloadWeapon(c);
          }
          this.wantReload = false;
        }
        // 空仓换副武器
        if (ws.mag <= 0 && ws.reserve <= 0) this.switchToPistol(h);
      }

      // 开火节奏
      const canSee = true; // perceive 已确认
      if (now > this.pauseEnd && now > this.reactionUntil && ws && ws.canFire(now) && canSee) {
        if (now > this.burstEnd) {
          this.burstEnd = now + this.diff.burstLen * this.rng.range(0.7, 1.3);
          this.pauseEnd = this.burstEnd + this.diff.pauseLen * this.rng.range(0.6, 1.4);
        }
        // 枪口被掩体挡住时贴近调整站位（简化为小幅横移）
        const tp = this.target.eyePos();
        h.fireWeapon(c, tp);
        if (this.role === 'sniper') this.pauseEnd = Math.max(this.pauseEnd, now + 0.9);
      }

      // 目标在掩体后：有限的最后已知位置压制 + 投掷物
      if (this.lastKnownPos && now - this.lastKnownAt < COMBAT.lkpHoldTime && now > this.nadeCooldown) {
        const hidden = now > this.visibleUntil + 0.3;
        if (hidden && this.rng.chance(this.diff.nadeChance) && c.loadout.grenades.he > 0 && dist < 26) {
          h.throwGrenadeAt(c, this.lastKnownPos);
          this.nadeCooldown = 14 + this.rng.range(0, 8);
        }
      }
    } else if (this.lastKnownPos && now - this.lastKnownAt < COMBAT.lkpHoldTime) {
      // 追击最后已知位置
      this.goalOverride = this.lastKnownPos;
    } else if (this.heardAt > 0 && now - this.heardAt < 5) {
      // 声音感知：朝最近听到的位置推进
      this.goalOverride = this.heardPos;
    } else {
      this.goalOverride = null;
    }
    // 换弹时机：无目标且弹匣过半空
    if (!this.target && ws && ws.mag < ws.def.mag * 0.4 && ws.canReload(now)) {
      h.reloadWeapon(c);
    }
  }
  private goalOverride: Vec3 | null = null;

  private switchToPistol(h: BotHost): void {
    const c = this.char;
    const pistol = c.loadout.slots[1];
    if (c.loadout.slot !== 1 && pistol.mag + pistol.reserve > 0) {
      switchSlot(c.loadout, 1, h.now);
    }
  }

  private coveredNow(now: number): boolean {
    // 无可见目标时视为安全换弹时机
    return !this.target || now > this.visibleUntil + 0.5;
  }

  private updateNav(dt: number, h: BotHost): void {
    const c = this.char;
    const now = h.now;
    const intent = this._intent;
    const inCombat = this.target !== null && now < this.visibleUntil + 0.4;

    // 战斗走位：停射点 + 横移 + 蹲
    if (inCombat) {
      intent.forward = 0;
      intent.jump = false;
      this.strafePhase += dt * this.diff.strafe * 1.6;
      intent.right = Math.sin(this.strafePhase) * 0.85;
      intent.crouch = this.role === 'sniper' ? false : this.rng.chance(0.003);
      intent.silent = false;
      // 血量低撤退
      if (c.hp < 30 && this.rng.chance(0.01)) this.goalOverride = this.retreatNode();
      this.stuckTimer = 0;
      return;
    }
    intent.crouch = false;

    // 路线目标
    let goalPos: Vec3 | null = this.goalOverride;
    if (!goalPos && (now > this.repathAt || this.pathIdx >= this.path.length)) {
      this.repathAt = now + this.diff.repathMin * this.rng.range(0.8, 1.5);
      goalPos = this.pickGoal();
      const start = nearestNode(this.g, c.body.pos.x, c.body.pos.y, c.body.pos.z);
      const goal = nearestNode(this.g, goalPos.x, goalPos.y, goalPos.z);
      const p = astar(this.g, start, goal);
      this.path = p ?? [];
      this.pathIdx = 0;
    }

    // 沿路径行进
    if (this.path.length && this.pathIdx < this.path.length) {
      const node = this.g.nodes.get(this.path[this.pathIdx])!;
      const dx = node.x - c.body.pos.x;
      const dz = node.z - c.body.pos.z;
      const dy = node.y - c.body.pos.y;
      const dist = Math.hypot(dx, dz);
      // 朝向节点（非战斗时不强制对准敌人）
      if (!inCombat) {
        const wantYaw = Math.atan2(dx, -dz);
        let dyaw = wantYaw - c.yaw;
        while (dyaw > Math.PI) dyaw -= 2 * Math.PI;
        while (dyaw < -Math.PI) dyaw += 2 * Math.PI;
        c.yaw += clamp(dyaw, -this.diff.turnRate * dt, this.diff.turnRate * dt);
      }
      intent.forward = 1;
      intent.silent = false;
      // 跳跃边：接近且需要上升
      const edge = (this.g.adj.get(this.path[Math.max(0, this.pathIdx - 1)]) ?? []).find((e) => e.to === node.id);
      if (dy > 0.35 && dist < 2.2 && edge?.jump === 'up') {
        intent.jump = true;
      } else {
        intent.jump = false;
      }
      if (dist < 1.0 && Math.abs(dy) < 1.2) {
        this.pathIdx += 1;
      }
    } else {
      intent.forward = 0;
    }

    // 卡住检测：无进展先侧移，持续则重规划
    const movedSq = (c.body.pos.x - this.lastPos.x) ** 2 + (c.body.pos.z - this.lastPos.z) ** 2;
    if (intent.forward > 0 && movedSq < 0.0004) {
      this.stuckTimer += dt;
      if (this.stuckTimer > 0.9 && now > this.sidestepUntil) {
        this.sidestepUntil = now + 0.45;
        this.sidestepDir = this.rng.chance(0.5) ? 1 : -1;
      }
      if (now < this.sidestepUntil) {
        intent.right = this.sidestepDir;
        intent.forward = 0.3;
        intent.jump = this.rng.chance(0.02);
      }
      if (this.stuckTimer > 2.4) {
        this.repathAt = 0;
        this.stuckTimer = 0;
      }
    } else {
      this.stuckTimer = Math.max(0, this.stuckTimer - dt);
    }
    this.lastPos.x = c.body.pos.x;
    this.lastPos.z = c.body.pos.z;
  }

  /** 角色路线目标：推进 / 侧翼 / 高点 / 支援 */
  private pickGoal(): Vec3 {
    const c = this.char;
    const enemySign = c.team === 'blue' ? -1 : 1;
    const r = this.rng.next();
    switch (this.role) {
      case 'flankPort':
        return { x: 46 * enemySign, y: 0, z: -13.0 };
      case 'flankStar':
        return { x: 46 * enemySign, y: 0, z: 13.0 };
      case 'sniper': {
        // 前往己方半场的高点或支援位
        if (r < 0.5 && c.team === 'red') return { x: -14.5, y: 2.6, z: 11.7 };
        if (r < 0.5 && c.team === 'blue') return { x: 14.3, y: 2.6, z: 11.7 };
        return { x: 38 * -enemySign, y: 0, z: this.rng.chance(0.5) ? 6.5 : -6.5 };
      }
      default: {
        // 主攻：偶发换线
        if (r < 0.68) return { x: 48 * enemySign, y: 0, z: this.rng.range(-3, 3) };
        if (r < 0.84) return { x: 46 * enemySign, y: 0, z: -13.0 };
        return { x: 46 * enemySign, y: 0, z: 13.0 };
      }
    }
  }

  private retreatNode(): Vec3 {
    const c = this.char;
    const ownSign = c.team === 'blue' ? 1 : -1;
    return { x: 44 * ownSign, y: 0, z: c.body.pos.z > 0 ? 8.6 : -8.6 };
  }

  /** 调试信息 */
  debugState(): string {
    return `${this.char.name} role=${this.role} target=${this.target?.name ?? '-'} path=${this.pathIdx}/${this.path.length} stuck=${this.stuckTimer.toFixed(1)}`;
  }
}
