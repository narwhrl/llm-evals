// 电脑决策：感知 → 目标 → 行为（推进 / 交战 / 压制 / 搜索 / 掩体换弹 / 投掷）→ 写入与玩家相同的 Intent。
// 电脑只通过视线、声音和最近已知位置获得信息，不读取被遮挡目标的实时坐标。
import { type BotSkill, GRENADE, PLAYER, type PrimaryId } from "../config";
import { chestCenter, headCenter } from "../combat/combat";
import type { Smoke } from "../combat/projectiles";
import type { Rng } from "../core/rng";
import type { World } from "../core/world";
import { type Actor, clearEdges, wrapAngle, yawTo } from "../game/actor";
import { type NavGraph, type NavNode } from "./nav";
import { inFov, lineOfSight, type SoundEvent } from "./perception";

export type Role = "main" | "flankN" | "flankS" | "support" | "rover";

export interface BotHost {
  world: World;
  nav: NavGraph;
  actors: readonly Actor[];
  smokes: readonly Smoke[];
  sounds: readonly SoundEvent[];
  time: number;
  skill: BotSkill;
  /** 枪口到目标点之间是否能打到（考虑友军、实体与当前武器的木材穿透） */
  lineOfFire(a: Actor, p: [number, number, number]): boolean;
}

type P3 = [number, number, number];
const RED_ROUTES: Record<Exclude<Role, "rover">, P3[]> = {
  main: [[-33, 0, 0], [-22, 0, -1.8], [-8, 0, 0.6], [4, 0, -1.2], [18, 0, 1.2], [30, 0, 0]],
  flankN: [[-46.1, 0, 11.4], [-30, 0, 10.9], [-12, 0, 10.9], [6, 0, 10.9], [24, 0, 10.9], [36, 0, 10.9]],
  flankS: [[-46.1, 0, -11.4], [-30, 0, -10.9], [-12, 0, -10.9], [6, 0, -10.9], [24, 0, -10.9], [36, 0, -10.9]],
  support: [[-34.6, 0, 5.2], [-30, 2.6, 8.1]],
};
const HOTSPOTS: P3[] = [
  [-6, 0, 0.8], [6, 0, -0.8], [-12, 0, 5.6], [12, 0, -5.6], [-17, 0, -5.6], [17, 0, 5.6], [0, 0, 5.2], [0, 0, -5.2],
  [-20, 0, 10.9], [20, 0, -10.9], [-24, 1.8, 2.6], [24, 1.8, -2.6], [-26, 0, -4.5], [26, 0, 4.5],
];

export function routeFor(role: Role, team: 0 | 1): P3[] {
  if (role === "rover") return [];
  const r = RED_ROUTES[role];
  return team === 0 ? r : r.map(([x, y, z]) => [-x, y, -z] as P3);
}

export function pickPrimary(role: Role, rng: Rng): PrimaryId {
  if (role === "support") return rng.chance(0.75) ? "awm" : "m4";
  const r = rng.next();
  return r < 0.4 ? "ak" : r < 0.72 ? "m4" : r < 0.92 ? "mp5" : "awm";
}

type State = "advance" | "engage" | "suppress" | "search" | "cover" | "hold" | "throw";

export class BotBrain {
  state: State = "advance";
  route: P3[] = [];
  routeIdx = 0;
  goal: P3 | null = null;
  path: number[] = [];
  pathIdx = 0;
  replanT = 0;
  targetId = -1;
  seenT = -99;
  lastSeen: P3 | null = null;
  heard: P3 | null = null;
  heardT = -99;
  acquireT = 0;
  errYaw = 0;
  errPitch = 0;
  jitterT = 0;
  burstLeft = 0;
  pauseT = 0;
  holdT = 0;
  strafeDir = 1;
  strafeT = 0;
  crouchHold = false;
  headAim = false;
  jumpTuck = false;
  nadeT = 0;
  throwT = -1;
  throwKind: "he" | "smoke" = "he";
  throwPitch = 0;
  throwYaw = 0;
  progressT = 0;
  progressD = Infinity;
  stuck = 0;
  lastMag = 0;
  debug = "";
  private near: number[] = [];

  constructor(public role: Role, readonly actor: Actor) {}

  onSpawn(host: BotHost): void {
    this.route = routeFor(this.role, this.actor.team);
    this.routeIdx = 0;
    this.state = "advance";
    this.targetId = -1;
    this.lastSeen = null;
    this.heard = null;
    this.seenT = -99;
    this.path = [];
    this.goal = null;
    this.stuck = 0;
    this.throwT = -1;
    this.crouchHold = false;
    this.nadeT = host.time + 6 + this.actor.rng.range(0, 8);
    this.nextGoal(host);
  }

  private nextGoal(host: BotHost): void {
    const rng = this.actor.rng;
    if (this.routeIdx < this.route.length) {
      this.goal = this.route[this.routeIdx++];
    } else {
      this.goal = rng.pick(HOTSPOTS);
    }
    const [gx, gy, gz] = this.goal;
    this.goal = [gx + rng.range(-0.6, 0.6), gy, gz + rng.range(-0.4, 0.4)];
    this.plan(host);
  }

  private bias = (n: NavNode): number => {
    switch (this.role) {
      case "flankN": return n.zone === "deck" || n.zone === "laneS" ? 1.2 : 0;
      case "flankS": return n.zone === "deck" || n.zone === "laneN" ? 1.2 : 0;
      case "main": return n.zone === "laneN" || n.zone === "laneS" ? 1.5 : 0;
      default: return 0;
    }
  };

  private plan(host: BotHost): boolean {
    const a = this.actor;
    if (!this.goal) return false;
    const from = host.nav.nearest(a.x, a.y, a.z, 3);
    const to = host.nav.nearest(this.goal[0], this.goal[1], this.goal[2], 4);
    const p = host.nav.path(from, to, this.state === "advance" ? this.bias : undefined);
    this.replanT = host.time + 4 + a.rng.range(0, 2);
    this.progressT = host.time + 1.2;
    this.progressD = Infinity;
    if (!p) { this.path = []; return false; }
    this.path = p;
    this.pathIdx = 0;
    return true;
  }

  /** 每个固定步长调用；perceive 为 10 Hz 错峰感知 */
  think(host: BotHost, dt: number, perceive: boolean): void {
    const a = this.actor, it = a.intent, t = host.time;
    clearEdges(it);
    it.fwd = 0; it.right = 0; it.walk = false;
    if (perceive) this.perceive(host);
    const target = this.targetId >= 0 ? host.actors[this.targetId] : null;
    const visible = !!target && target.alive && t - this.seenT < 0.15;
    if (target && !target.alive && t - this.seenT < 0.15) this.seenT = -99; // 目标已倒下
    this.countShots(host);
    this.manageWeapon(host, visible);
    if (this.throwT >= 0) { this.doThrow(host, dt); return; }
    if (perceive) this.considerNade(host, visible ? target : null);

    let want: { dx: number; dz: number; jump: boolean } | null = null;
    let fire = false;
    let face: P3 | null = null;
    let precise = false;
    it.crouch = this.jumpTuck && !a.motor.grounded;
    if (a.motor.grounded) this.jumpTuck = false;

    if (visible && target) {
      const g = a.inv.gun;
      const reloading = !!g && (g.reloading || g.mag === 0);
      if (reloading && this.state !== "cover") {
        this.state = "cover";
        const c = this.findCover(host, target);
        if (c >= 0) { const n = host.nav.nodes[c]; this.goal = [n.x, n.y, n.z]; this.plan(host); }
        else this.path = [];
      } else if (!reloading) this.state = "engage";
      const aimPt = this.headAim ? headCenter(target) : chestCenter(target);
      face = aimPt;
      precise = true;
      const e = a.eye();
      const d = Math.hypot(aimPt[0] - e[0], aimPt[1] - e[1], aimPt[2] - e[2]);
      const clear = host.lineOfFire(a, aimPt);
      if (this.state === "cover") {
        want = this.pathStep(host);
      } else if (a.inv.slot === 2) {
        const l = Math.hypot(target.x - a.x, target.z - a.z) || 1;
        want = { dx: (target.x - a.x) / l, dz: (target.z - a.z) / l, jump: false };
        fire = d < 1.9;
      } else {
        const bursting = this.burstLeft > 0 && t >= this.pauseT;
        if (!clear) {
          this.crouchHold = false;
          want = this.strafe(target, t, 0.7);
        } else if (!bursting && a.rng.chance(host.skill.strafe * dt * 3)) {
          this.strafeT = t + a.rng.range(0.25, 0.7);
        }
        if (clear && t < this.strafeT && !bursting) want = this.strafe(target, t, 0);
        // 远距离对枪时，非狙击武器在点射间隙继续沿路线推进，避免整队停在出生平台对射
        const g2 = a.inv.gun;
        if (!want && !bursting && d > 30 && g2 && !g2.def.scopeFov && this.path.length) want = this.pathStep(host);
        fire = clear && this.readyToFire(host, aimPt, d);
        it.crouch = it.crouch || (this.crouchHold && clear);
      }
    } else {
      this.crouchHold = false;
      const sinceSeen = t - this.seenT;
      if (this.lastSeen && sinceSeen < 1.0 && a.inv.gun) {
        // 目标刚消失：短时压制最后已知位置
        this.state = "suppress";
        face = this.lastSeen;
        precise = true;
        fire = sinceSeen < 0.6 && a.rng.chance(host.skill.coordination) && host.lineOfFire(a, this.lastSeen) &&
          this.readyToFire(host, this.lastSeen, 20);
      } else if (this.lastSeen && sinceSeen < 8) {
        this.search(host, this.lastSeen);
        face = this.lastSeen;
        want = this.pathStep(host);
      } else if (this.heard && t - this.heardT < 5) {
        this.search(host, this.heard);
        face = this.heard;
        want = this.pathStep(host);
      } else {
        this.lastSeen = null;
        want = this.advance(host);
        if (this.state === "hold") face = this.scanPoint(t);
      }
    }

    // 卡住检测：想移动但位移过小 → 侧移起跳 → 重新规划 → 换目标
    if (want) want = this.unstick(host, want);
    if (want) {
      this.separate(host, want);
      this.move(want.dx, want.dz, this.state === "search" && t - this.heardT < 3);
      if (want.jump && a.motor.grounded) { it.jump = true; this.jumpTuck = true; }
      if (!face) face = [a.x + want.dx * 5, a.motor.eyeY, a.z + want.dz * 5];
    }
    if (face) this.aim(host, face, dt, precise);
    it.fire = fire;
    this.debug = `${this.role}/${this.state} 目标=${this.targetId} 见=${Math.min(99, t - this.seenT).toFixed(1)}s 卡=${this.stuck}`;
  }

  private perceive(host: BotHost): void {
    const a = this.actor, e = a.eye(), t = host.time;
    let best: Actor | null = null, bd = Infinity;
    for (const o of host.actors) {
      if (!o.alive || o.team === a.team) continue;
      const d = Math.hypot(o.x - a.x, o.z - a.z);
      if (d > 95) continue;
      const cur = o.id === this.targetId && t - this.seenT < 0.5;
      if (!inFov(a.yaw, e, o, cur ? host.skill.fov + 40 : host.skill.fov)) continue;
      if (!lineOfSight(host.world, host.smokes, e, o)) continue;
      const score = d - (cur ? 8 : 0);
      if (score < bd) { bd = score; best = o; }
    }
    if (best) {
      if (best.id !== this.targetId || t - this.seenT > 1.2) {
        const d = Math.hypot(best.x - a.x, best.z - a.z);
        const E = host.skill.aimError * DEG * (1 + d / 35);
        this.acquireT = t;
        this.errYaw = a.rng.gauss() * E;
        this.errPitch = a.rng.gauss() * E * 0.5;
        this.headAim = a.rng.chance(host.skill.headAim);
        this.burstLeft = 0;
        this.pauseT = 0;
        this.crouchHold = d > 18 && a.rng.chance(0.35);
      }
      this.targetId = best.id;
      this.seenT = t;
      this.lastSeen = [best.x, best.y + 1.2, best.z];
      return;
    }
    // 受击方向（等同听到来袭枪声）
    if (a.lastHitFrom && t - a.lastHitT < 0.2) {
      this.heard = [a.lastHitFrom[0] + a.rng.gauss(), a.lastHitFrom[1], a.lastHitFrom[2] + a.rng.gauss()];
      this.heardT = t;
    }
    for (let i = host.sounds.length - 1; i >= 0; i--) {
      const s = host.sounds[i];
      if (s.t < t - 0.12) break;
      if (s.team === a.team || s.source === a.id) continue;
      const d = Math.hypot(s.x - a.x, s.z - a.z);
      if (d > s.radius) continue;
      const err = 0.9 + d * 0.1;
      this.heard = [s.x + a.rng.gauss() * err, s.y, s.z + a.rng.gauss() * err];
      this.heardT = t;
    }
  }

  private countShots(host: BotHost): void {
    const g = this.actor.inv.gun;
    if (!g) return;
    if (g.mag < this.lastMag && this.burstLeft > 0) {
      this.burstLeft -= this.lastMag - g.mag;
      if (this.burstLeft <= 0) {
        const d = this.lastSeen ? Math.hypot(this.lastSeen[0] - this.actor.x, this.lastSeen[2] - this.actor.z) : 10;
        this.pauseT = host.time + host.skill.burstPause * (0.6 + d / 25) * this.actor.rng.range(0.7, 1.3);
      }
    }
    this.lastMag = g.mag;
  }

  private manageWeapon(host: BotHost, engaged: boolean): void {
    const a = this.actor, inv = a.inv, it = a.intent, g = inv.gun;
    if (inv.busy || inv.drawT > 0) return;
    const p = inv.primary;
    if (inv.slot === 1 && !engaged && (p.mag > 0 || p.reserve > 0)) { it.slot = 0; return; }
    if (inv.slot === 2 || inv.slot === 3) {
      if (p.mag + p.reserve > 0) it.slot = 0;
      else if (inv.pistol.mag + inv.pistol.reserve > 0) it.slot = 1;
      return;
    }
    if (!g) return;
    if (g.mag === 0 && g.reserve === 0) {
      it.slot = inv.slot === 0 && inv.pistol.mag + inv.pistol.reserve > 0 ? 1 : 2;
      return;
    }
    if (g.reloading) return;
    if (g.mag === 0 || (!engaged && g.mag < g.def.mag * 0.5 && g.reserve > 0 && host.time - this.seenT > 1.5)) it.reload = true;
    // AWM 远距离开镜
    if (g.def.scopeFov && engaged && this.lastSeen) {
      const d = Math.hypot(this.lastSeen[0] - a.x, this.lastSeen[2] - a.z);
      const want = d > 7 ? 1 : 0;
      if (inv.scope !== want && host.time > this.altT) { it.alt = true; this.altT = host.time + 0.3; }
    } else if (inv.scope > 0 && host.time > this.altT) { it.alt = true; this.altT = host.time + 0.3; }
  }
  private altT = 0;
  private pulse = false;

  private readyToFire(host: BotHost, p: P3, dist: number): boolean {
    const a = this.actor, t = host.time;
    if (t - this.acquireT < host.skill.reaction) return false;
    const g = a.inv.gun;
    if (!g || g.reloading || g.mag === 0) return false;
    if (g.def.scopeFov && dist > 7 && a.inv.scope === 0) return false;
    const e = a.eye();
    const dy = yawTo(p[0] - e[0], p[2] - e[2]);
    const dp = Math.atan2(p[1] - e[1], Math.hypot(p[0] - e[0], p[2] - e[2]));
    const off = Math.hypot(wrapAngle(dy - (a.yaw + a.kickY)), dp - (a.pitch + a.kickP));
    const tol = Math.atan2(g.def.mode === "bolt" ? 0.3 : 0.4, Math.max(1, dist));
    if (off > tol) return false;
    if (g.def.mode !== "auto") {
      this.pulse = !this.pulse;
      return this.pulse;
    }
    if (this.burstLeft <= 0) {
      if (t < this.pauseT) return false;
      this.burstLeft = a.rng.int(host.skill.burstMin, host.skill.burstMax) + (dist < 10 ? 3 : 0);
    }
    return true;
  }

  private strafe(target: Actor, t: number, bias: number): { dx: number; dz: number; jump: boolean } {
    const a = this.actor;
    const tx = target.x - a.x, tz = target.z - a.z, l = Math.hypot(tx, tz) || 1;
    if (t > this.strafeFlipT) { this.strafeDir = a.rng.chance(0.5) ? 1 : -1; this.strafeFlipT = t + a.rng.range(0.6, 1.6); }
    return { dx: (-tz / l) * this.strafeDir + (tx / l) * bias * 0.3, dz: (tx / l) * this.strafeDir + (tz / l) * bias * 0.3, jump: false };
  }
  private strafeFlipT = 0;

  private search(host: BotHost, p: P3): void {
    if (this.state !== "search" || !this.goal || Math.hypot(this.goal[0] - p[0], this.goal[2] - p[2]) > 3) {
      this.state = "search";
      this.goal = [p[0], Math.max(0, p[1] - 1.2), p[2]];
      this.plan(host);
    }
  }

  private advance(host: BotHost): { dx: number; dz: number; jump: boolean } | null {
    const a = this.actor, t = host.time;
    if (this.state === "hold") {
      if (t < this.holdT) return null;
      this.state = "advance";
      this.nextGoal(host);
    }
    if (this.state !== "advance") { this.state = "advance"; this.plan(host); }
    if (!this.goal) this.nextGoal(host);
    if (t > this.replanT) this.plan(host);
    const step = this.pathStep(host);
    const g = this.goal!;
    if (!step || Math.hypot(g[0] - a.x, g[2] - a.z) < 1.0) {
      this.state = "hold";
      const atEnd = this.routeIdx >= this.route.length;
      this.holdT = t + (this.role === "support" && atEnd ? a.rng.range(8, 16) : atEnd ? a.rng.range(1.5, 4) : a.rng.range(0, 0.6));
      return null;
    }
    return step;
  }

  private scanPoint(t: number): P3 {
    const a = this.actor, s = a.team === 0 ? 1 : -1;
    const sweep = Math.sin(t * 0.5 + a.id) * 0.9;
    return [a.x + s * 20 * Math.cos(sweep), a.motor.eyeY, a.z + 20 * Math.sin(sweep)];
  }

  private pathStep(host: BotHost): { dx: number; dz: number; jump: boolean } | null {
    const a = this.actor, nav = host.nav;
    while (this.pathIdx < this.path.length) {
      const n = nav.nodes[this.path[this.pathIdx]];
      const dh = Math.hypot(n.x - a.x, n.z - a.z);
      const dy = n.y - a.y;
      if (dh < 0.45 && Math.abs(dy) < 0.6) { this.pathIdx++; continue; }
      if (dh < 0.3 && dy < 0) { this.pathIdx++; continue; }
      break;
    }
    if (this.pathIdx >= this.path.length) return null;
    const cur = nav.nodes[this.path[this.pathIdx]];
    let tgt = cur;
    // 前瞻：连续步行连接上跳过近处节点，路径更平滑
    for (let k = this.pathIdx + 1; k < Math.min(this.path.length, this.pathIdx + 3); k++) {
      const prev = this.path[k - 1], nx = this.path[k];
      if (nav.linkKind(prev, nx) !== "walk" || Math.abs(nav.nodes[nx].y - a.y) > 0.5) break;
      tgt = nav.nodes[nx];
    }
    const prevId = this.pathIdx > 0 ? this.path[this.pathIdx - 1] : -1;
    const kind = prevId >= 0 ? nav.linkKind(prevId, cur.id) : null;
    const dh = Math.hypot(cur.x - a.x, cur.z - a.z);
    const jump = (kind === "jump" || cur.y - a.y > PLAYER.stepHeight + 0.05) && dh < 1.4 && a.motor.grounded;
    const dx = tgt.x - a.x, dz = tgt.z - a.z, l = Math.hypot(dx, dz) || 1;
    return { dx: dx / l, dz: dz / l, jump };
  }

  private unstick(host: BotHost, want: { dx: number; dz: number; jump: boolean }): { dx: number; dz: number; jump: boolean } {
    const a = this.actor, t = host.time;
    if (this.state !== "advance" && this.state !== "search" && this.state !== "cover") return want;
    if (!this.goal) return want;
    if (t < this.progressT) return want;
    const d = Math.hypot(this.goal[0] - a.x, this.goal[2] - a.z);
    if (d > this.progressD - 0.3) this.stuck++;
    else this.stuck = Math.max(0, this.stuck - 1);
    this.progressD = d;
    this.progressT = t + 0.6;
    if (this.stuck >= 6) {
      this.stuck = 0;
      this.nextGoal(host);
    } else if (this.stuck >= 3) {
      this.plan(host);
    } else if (this.stuck >= 1) {
      const s = a.rng.chance(0.5) ? 1 : -1;
      return { dx: want.dx * 0.4 - want.dz * s, dz: want.dz * 0.4 + want.dx * s, jump: true };
    }
    return want;
  }

  private separate(host: BotHost, w: { dx: number; dz: number }): void {
    const a = this.actor;
    for (const o of host.actors) {
      if (o === a || !o.alive || o.team !== a.team) continue;
      const dx = a.x - o.x, dz = a.z - o.z, d = Math.hypot(dx, dz);
      if (d > 1.3 || d < 1e-3 || Math.abs(o.y - a.y) > 1) continue;
      const k = ((1.3 - d) / 1.3) * 1.2;
      w.dx += (dx / d) * k; w.dz += (dz / d) * k;
    }
    const l = Math.hypot(w.dx, w.dz);
    if (l > 1) { w.dx /= l; w.dz /= l; }
  }

  private move(dx: number, dz: number, walk: boolean): void {
    const a = this.actor, it = a.intent;
    const s = Math.sin(a.yaw), c = Math.cos(a.yaw);
    it.fwd = dx * -s + dz * -c;
    it.right = dx * c + dz * -s;
    it.walk = walk;
  }

  private aim(host: BotHost, p: P3, dt: number, precise: boolean): void {
    const a = this.actor, sk = host.skill, t = host.time;
    const e = a.eye();
    let yaw = yawTo(p[0] - e[0], p[2] - e[2]);
    let pitch = Math.atan2(p[1] - e[1], Math.hypot(p[0] - e[0], p[2] - e[2]));
    if (precise) {
      const k = Math.exp(-sk.errorDecay * dt);
      this.errYaw *= k; this.errPitch *= k;
      if (t > this.jitterT) {
        this.jitterT = t + 0.25;
        const tg = this.targetId >= 0 ? host.actors[this.targetId] : null;
        const lat = tg ? Math.min(6, tg.motor.horizSpeed) : 0;
        const j = sk.aimError * DEG * 0.12 * (0.25 + lat * 0.2);
        this.errYaw += a.rng.gauss() * j;
        this.errPitch += a.rng.gauss() * j * 0.5;
      }
      yaw += this.errYaw;
      pitch += this.errPitch;
      // 部分压枪：抵消一部分后坐偏移
      const comp = Math.min(0.9, 0.25 + sk.errorDecay * 0.25);
      yaw -= a.kickY * comp;
      pitch -= a.kickP * comp;
    }
    const maxTurn = sk.turnSpeed * DEG * dt;
    a.yaw = wrapAngle(a.yaw + clamp(wrapAngle(yaw - a.yaw), maxTurn));
    a.pitch = Math.max(-1.4, Math.min(1.4, a.pitch + clamp(pitch - a.pitch, maxTurn * 0.7)));
  }

  /** 寻找对威胁点不可见的近处节点（掩体换弹） */
  private findCover(host: BotHost, threat: Actor): number {
    const a = this.actor, te = threat.eye();
    const ids = host.nav.nodesNear(a.x, a.z, 7, 3, this.near);
    let best = -1, bd = Infinity;
    for (const id of ids) {
      const n = host.nav.nodes[id];
      if (Math.abs(n.y - a.y) > 0.6) continue;
      const d = Math.hypot(n.x - a.x, n.z - a.z);
      if (d < 1.2 || d >= bd) continue;
      if (!host.world.segmentBlocked(te[0], te[1], te[2], n.x, n.y + 1.2, n.z, (b) => b.sight)) continue;
      best = id; bd = d;
    }
    return best;
  }

  /** 有限投掷：目标刚躲进掩体时投高爆雷；低血量被压制时投烟雾撤离 */
  private considerNade(host: BotHost, visibleTarget: Actor | null): void {
    const a = this.actor, t = host.time, inv = a.inv;
    if (t < this.nadeT || inv.busy || inv.totalNades === 0 || inv.gun?.reloading) return;
    let aimAt: P3 | null = null;
    if (inv.nades.he > 0 && !visibleTarget && this.lastSeen && t - this.seenT > 0.8 && t - this.seenT < 4) {
      const d = Math.hypot(this.lastSeen[0] - a.x, this.lastSeen[2] - a.z);
      if (d > 7 && d < 16) { aimAt = [this.lastSeen[0], this.lastSeen[1] - 1.2, this.lastSeen[2]]; this.throwKind = "he"; }
    } else if (inv.nades.smoke > 0 && visibleTarget && a.health < 45) {
      aimAt = [a.x + (visibleTarget.x - a.x) * 0.45, a.y, a.z + (visibleTarget.z - a.z) * 0.45];
      this.throwKind = "smoke";
    }
    if (!aimAt) return;
    if (!a.rng.chance(host.skill.coordination)) { this.nadeT = t + 3; return; }
    const e = a.eye();
    const dx = aimAt[0] - e[0], dz = aimAt[2] - e[2];
    this.throwYaw = yawTo(dx, dz);
    this.throwPitch = solvePitch(Math.hypot(dx, dz), aimAt[1] - e[1]);
    this.throwT = 0;
    this.thrown = false;
    this.nadeT = t + 12 + a.rng.range(0, 10);
  }
  private thrown = false;

  /** 投掷：先转向与调整仰角，再用与玩家相同的 G 键快速投掷 */
  private doThrow(host: BotHost, dt: number): void {
    const a = this.actor, inv = a.inv, it = a.intent;
    this.throwT += dt;
    const maxTurn = host.skill.turnSpeed * DEG * dt;
    a.yaw = wrapAngle(a.yaw + clamp(wrapAngle(this.throwYaw - a.yaw), maxTurn));
    a.pitch += clamp(this.throwPitch - a.pitch, maxTurn);
    if (!this.thrown && this.throwT > 0.35 && !inv.busy) {
      if (inv.nades[this.throwKind] > 0) inv.nadeSel = this.throwKind;
      it.throwNade = true;
      this.thrown = true;
    }
    if ((this.thrown && this.throwT > 0.5 && !inv.busy) || this.throwT > 2) this.throwT = -1;
  }
}

const DEG = Math.PI / 180;

function clamp(v: number, m: number): number {
  return Math.max(-m, Math.min(m, v));
}

/** 求出手仰角，使抛物线落点水平距离接近 d（落点相对出手点高度 h） */
export function solvePitch(d: number, h: number): number {
  const v = GRENADE.throwSpeed, g = 20;
  let best = 0.3, be = Infinity;
  for (let p = -0.3; p <= 1.2; p += 0.02) {
    const vx = v * Math.cos(p), vy = v * Math.sin(p) + 2.2;
    // y(t) = vy·t − g·t²/2 = h
    const disc = vy * vy - 2 * g * h;
    if (disc < 0) continue;
    const tt = (vy + Math.sqrt(disc)) / g;
    const err = Math.abs(vx * tt - d);
    if (err < be) { be = err; best = p; }
  }
  return best;
}
