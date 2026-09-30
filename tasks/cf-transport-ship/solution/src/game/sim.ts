// 本地对局模拟：玩家与电脑共用的开火、弹道、伤害、投掷、复活与计分。无渲染依赖，可在 Node 中完整跑一局。
import { type BotHost, BotBrain, type Role, pickPrimary } from "../ai/brain";
import type { NavGraph } from "../ai/nav";
import type { SoundEvent } from "../ai/perception";
import {
  applyDamage, blastDamage, type DamageEvent, gunDamage, type Impact, rayCharacter, resolveMelee, resolveShot, type Zone,
} from "../combat/combat";
import { type Grenade, type Smoke, smokeAlive, spawnGrenade, stepGrenade, insideSmoke } from "../combat/projectiles";
import type { InvEvent } from "../combat/weapons";
import {
  type BotSkill, DIFFICULTY, type Difficulty, GRENADE, GUNS, KNIFE, MATCH, PLAYER, type PrimaryId, type WeaponId,
} from "../config";
import { hashSeed, Rng } from "../core/rng";
import { type Box, type World, bulletFilter } from "../core/world";
import { inSpawnZone, spawnPoints, type Team } from "../map/layout";
import { Actor, dirFrom } from "./actor";
import { Match, type MatchEnd, type MatchRules } from "./match";

export type KillCause = WeaponId | "fall";

export type SimEvent =
  | { type: "shot"; actor: Actor; weapon: WeaponId; from: [number, number, number]; to: [number, number, number]; impacts: Impact[]; muzzleBlocked: boolean; suppressed: boolean }
  | { type: "hit"; attacker: Actor; victim: Actor; zone: Zone | "blast"; dmg: DamageEvent; at: [number, number, number] }
  | { type: "blocked"; attacker: Actor; victim: Actor; reason: string }
  | { type: "kill"; killer: Actor; victim: Actor; cause: KillCause; headshot: boolean; penetrated: boolean }
  | { type: "respawn"; actor: Actor }
  | { type: "inv"; actor: Actor; ev: InvEvent }
  | { type: "step"; actor: Actor; loud: number }
  | { type: "land"; actor: Actor; speed: number }
  | { type: "jump"; actor: Actor }
  | { type: "bounce"; nade: Grenade }
  | { type: "blast"; x: number; y: number; z: number }
  | { type: "smoke"; smoke: Smoke }
  | { type: "melee"; actor: Actor; hit: boolean; heavy: boolean }
  | { type: "end"; end: MatchEnd }
  | { type: "diag"; msg: string };

export interface KillFeedEntry { t: number; killer: string; killerTeam: Team; victim: string; victimTeam: Team; cause: KillCause; headshot: boolean; penetrated: boolean }

export interface SimOptions {
  world: World;
  nav: NavGraph;
  difficulty: Difficulty;
  rules: MatchRules;
  seed: number;
  playerTeam: Team | null; // null：十名电脑（测试/观战）
  playerPrimary: PrimaryId;
  playerName?: string;
}

const NAMES: [string[], string[]] = [
  ["毒蝎", "夜枭", "灰狼", "铁锚", "赤狐"],
  ["雷鸣", "海鹰", "磐石", "北斗", "猎隼"],
];
const ROLES: Role[] = ["main", "flankN", "flankS", "support", "main"];

export class Sim implements BotHost {
  readonly world: World;
  readonly nav: NavGraph;
  readonly match: Match;
  readonly actors: Actor[] = [];
  readonly brains = new Map<number, BotBrain>();
  readonly grenades: Grenade[] = [];
  readonly smokes: Smoke[] = [];
  readonly sounds: SoundEvent[] = [];
  readonly events: SimEvent[] = [];
  readonly killfeed: KillFeedEntry[] = [];
  readonly damageLog: DamageEvent[] = [];
  readonly reveals: { id: number; x: number; z: number; t: number }[] = [];
  readonly skill: BotSkill;
  readonly rng: Rng;
  player: Actor | null = null;
  time = 0;
  stepCount = 0;
  freezeBots = false;
  private smokeSeq = 0;
  private scratch: Box[] = [];

  constructor(readonly opts: SimOptions) {
    this.world = opts.world;
    this.nav = opts.nav;
    this.match = new Match(opts.rules);
    this.skill = DIFFICULTY[opts.difficulty];
    this.rng = new Rng(opts.seed);
    let id = 0;
    for (const team of [0, 1] as Team[]) {
      for (let i = 0; i < MATCH.teamSize; i++) {
        const isPlayer = opts.playerTeam === team && i === 0;
        const seed = hashSeed(opts.seed, team, i);
        const role = ROLES[i];
        const primary = isPlayer ? opts.playerPrimary : pickPrimary(role, new Rng(seed ^ 0x9e37));
        const name = isPlayer ? opts.playerName ?? "你" : NAMES[team][i];
        const a = new Actor(id++, team, name, isPlayer, primary, seed);
        this.actors.push(a);
        if (isPlayer) this.player = a;
        else this.brains.set(a.id, new BotBrain(role, a));
      }
    }
    for (const a of this.actors) this.respawn(a);
  }

  get ended(): boolean {
    return !!this.match.ended;
  }

  /** 推进一个固定步长 */
  step(dt: number): void {
    this.events.length = 0;
    if (this.match.ended) return;
    this.time += dt;
    this.stepCount++;
    const end = this.match.tick(dt);
    if (end) { this.events.push({ type: "end", end }); return; }
    while (this.sounds.length && this.sounds[0].t < this.time - 1.2) this.sounds.shift();
    while (this.reveals.length && this.reveals[0].t < this.time - 1.5) this.reveals.shift();

    for (const a of this.actors) {
      if (!a.alive) {
        if (a.respawnT > 0) {
          a.respawnT -= dt;
          if (a.respawnT <= 0) this.respawn(a);
        }
        continue;
      }
      const brain = this.brains.get(a.id);
      if (brain) {
        if (this.freezeBots) { a.intent.fwd = 0; a.intent.right = 0; a.intent.fire = false; }
        else brain.think(this, dt, (this.stepCount + a.id * 3) % 12 === 0);
      }
      this.stepActor(a, dt);
      if (this.match.ended) return;
    }
    this.separateActors();
    this.stepGrenades(dt);
    for (let i = this.smokes.length - 1; i >= 0; i--) {
      this.smokes[i].age += dt;
      if (!smokeAlive(this.smokes[i])) this.smokes.splice(i, 1);
    }
  }

  private stepActor(a: Actor, dt: number): void {
    const it = a.intent, inv = a.inv;
    if (it.slot !== -1) inv.select(it.slot);
    if (it.cycle) inv.cycle(it.cycle);
    if (it.quick) inv.quickSwitch();
    if (it.throwNade) inv.quickThrow();
    if (it.reload) inv.reload();
    if (it.alt) inv.alt();
    inv.setTrigger(it.fire);
    const m = a.motor;
    const wasGrounded = m.grounded;
    m.step({ fwd: it.fwd, right: it.right, jump: it.jump, crouch: it.crouch, walk: it.walk, yaw: a.yaw, speedMul: inv.moveMul }, dt, this.world);
    if (m.jumped) this.events.push({ type: "jump", actor: a });
    if (m.landSpeed > 2 && !wasGrounded) {
      const loud = Math.min(1, m.landSpeed / 9);
      this.events.push({ type: "land", actor: a, speed: m.landSpeed });
      if (!(it.walk || m.crouched) || m.landSpeed > 7) this.sound(a, 12 * loud + 4, "land");
    }
    if (m.grounded && m.horizSpeed > 0.6) {
      a.stepDist += m.horizSpeed * dt;
      const stride = m.crouched ? 0.75 : it.walk ? 0.8 : 1.45;
      if (a.stepDist >= stride) {
        a.stepDist -= stride;
        const loud = m.crouched ? 0.25 : it.walk ? 0.3 : 1;
        this.events.push({ type: "step", actor: a, loud });
        this.sound(a, m.crouched ? 2.5 : it.walk ? 3 : 15, "step");
      }
    }
    if (m.outOfBounds) {
      a.oobCount++;
      this.events.push({ type: "diag", msg: `越界：${a.name} @ (${a.x.toFixed(1)}, ${a.y.toFixed(1)}, ${a.z.toFixed(1)})，按坠落处理` });
      a.health = 0;
      a.alive = false;
      this.onKill(a, a, "fall", null, false);
      return;
    }
    if (a.protect > 0) {
      a.protect -= dt;
      if (!inSpawnZone(a.team, a.x)) a.protect = 0;
    }
    inv.tick(dt);
    const g = inv.gun;
    if (g && g.sinceShot > 60 / g.def.rpm * 0.9) {
      const r = (g.def.recoilRecover * Math.PI) / 180 * dt;
      a.kickP = Math.sign(a.kickP) * Math.max(0, Math.abs(a.kickP) - r);
      a.kickY = Math.sign(a.kickY) * Math.max(0, Math.abs(a.kickY) - r * 0.8);
    }
    for (const ev of inv.events) {
      this.events.push({ type: "inv", actor: a, ev });
      if (ev.type === "shot") { a.protect = 0; this.fire(a); }
      else if (ev.type === "melee") { a.protect = 0; this.melee(a, ev.heavy); }
      else if (ev.type === "throw") { a.protect = 0; this.throwNade(a, ev.kind, ev.lob); }
      if (this.match.ended) break;
    }
    inv.events.length = 0;
  }

  /** 当前武器的实际散布半角（弧度）。HUD 准星使用同一数值。 */
  spreadOf(a: Actor, firing = false): number {
    const g = a.inv.gun;
    if (!g) return 0;
    const d = g.def, m = a.motor;
    const speedK = Math.min(1, m.horizSpeed / PLAYER.runSpeed);
    let s: number;
    if (d.scopeFov) s = (a.inv.scope > 0 ? d.scopedSpread! : d.spreadBase) + speedK * d.spreadMove;
    else s = d.spreadBase + speedK * d.spreadMove + Math.max(0, g.bloom - (firing ? d.spreadPerShot : 0));
    if (!m.grounded) s += d.spreadAir;
    if (m.crouched && m.grounded) s *= d.crouchMul;
    return s;
  }

  private fire(a: Actor): void {
    const g = a.inv.gun!;
    const def = g.def;
    const eye = a.eye();
    const muzzle = a.muzzle();
    const dir = perturb(a.aimDir(), this.spreadOf(a, true), a.rng);
    const res = resolveShot(this.world, def, a, this.actors, eye, dir, muzzle);
    // 相机后坐：可学习的主趋势（上抬 + 左右摆动）加适量随机
    const k = Math.PI / 180, n = g.shotsInBurst;
    const grow = 1 + def.recoilGrow * Math.min(n, 12);
    const crouchK = a.motor.crouched ? 0.8 : 1;
    a.kickP = Math.min(0.2, a.kickP + def.recoilUp * k * grow * crouchK * (n > 12 ? 0.35 : 1));
    const side = def.id === "ak" ? Math.sin(n * 0.55) * 1.1 : def.id === "m4" ? Math.sin(n * 0.4 + 1) * 0.8 : a.rng.range(-1, 1);
    a.kickY += (side + a.rng.gauss() * 0.35) * def.recoilSide * k * (n > 6 ? 1.3 : 0.6);
    a.lastShotT = this.time;
    const suppressed = insideSmoke(this.smokes, eye[0], eye[1], eye[2]) > 0.5;
    if (!suppressed) this.reveals.push({ id: a.id, x: a.x, z: a.z, t: this.time });
    this.sound(a, def.id === "awm" ? 80 : 60, "shot");
    this.events.push({ type: "shot", actor: a, weapon: def.id, from: muzzle, to: res.end, impacts: res.impacts, muzzleBlocked: res.muzzleBlocked, suppressed });
    if (res.victim && res.zone) {
      const raw = gunDamage(def, res.dist, res.zone, res.damageMul);
      this.applyHit(a, res.victim as Actor, raw, res.zone, def.armorRatio, def.id, res.end, res.penetrated > 0);
    }
  }

  private applyHit(
    a: Actor, v: Actor, raw: number, zone: Zone | "blast", ratio: number, weapon: WeaponId, at: [number, number, number], pen: boolean,
  ): void {
    if (this.match.ended) return;
    const ev = applyDamage(v, a, raw, zone, ratio, weapon);
    this.damageLog.push(ev);
    if (this.damageLog.length > 200) this.damageLog.shift();
    if (ev.blocked) { this.events.push({ type: "blocked", attacker: a, victim: v, reason: ev.blocked }); return; }
    if (a !== v) a.damageDealt += ev.health;
    v.lastAttacker = a.id;
    v.lastHitFrom = a.eye();
    v.lastHitT = this.time;
    this.events.push({ type: "hit", attacker: a, victim: v, zone, dmg: ev, at });
    if (ev.killed) this.onKill(v, a, weapon, zone, pen);
  }

  /** 死亡只在生命归零的那一次调用；负责计分、击杀信息与复活倒计时 */
  private onKill(v: Actor, killer: Actor, cause: KillCause, zone: Zone | "blast" | null, pen: boolean): void {
    v.alive = false;
    v.health = 0;
    v.deathT = this.time;
    v.deaths++;
    v.respawnT = v.dummy ? -1 : MATCH.respawnDelay;
    v.inv.interrupt();
    v.inv.throwT = -1;
    v.intent.fire = false;
    const suicide = killer === v;
    const headshot = zone === "head";
    if (!suicide) {
      killer.kills++;
      if (headshot) killer.headshots++;
    }
    this.killfeed.push({ t: this.time, killer: killer.name, killerTeam: killer.team, victim: v.name, victimTeam: v.team, cause, headshot, penetrated: pen });
    if (this.killfeed.length > 6) this.killfeed.shift();
    this.events.push({ type: "kill", killer, victim: v, cause, headshot, penetrated: pen });
    if (v.dummy) return;
    const r = this.match.recordKill(killer.team, v.team, suicide);
    if (r.end) this.events.push({ type: "end", end: r.end });
  }

  respawn(a: Actor): void {
    const brain = this.brains.get(a.id);
    if (brain && this.rng.chance(0.3) && brain.role !== "support") {
      brain.role = this.rng.pick<Role>(["main", "flankN", "flankS", "rover", "main"]);
    }
    if (brain && this.rng.chance(0.25)) a.primaryChoice = pickPrimary(brain.role, a.rng);
    const sp = this.chooseSpawn(a);
    a.motor.place(sp.x, sp.y, sp.z);
    a.yaw = sp.yaw;
    a.pitch = 0;
    a.kickP = a.kickY = 0;
    a.health = MATCH.maxHealth;
    a.armor = MATCH.maxArmor;
    a.alive = true;
    a.protect = MATCH.spawnProtect;
    a.respawnT = 0;
    a.lastHitFrom = null;
    a.inv.respawn(a.primaryChoice);
    a.intent.fire = false;
    brain?.onSpawn(this);
    this.events.push({ type: "respawn", actor: a });
  }

  /** 从本方候选点中选择：避开活着的角色，尽量远离敌人 */
  private chooseSpawn(a: Actor): { x: number; y: number; z: number; yaw: number } {
    const pts = spawnPoints(a.team);
    let best = pts[0], bs = -Infinity;
    for (const p of pts) {
      let near = Infinity, enemy = Infinity;
      for (const o of this.actors) {
        if (o === a || !o.alive) continue;
        const d = Math.hypot(o.x - p.x, o.z - p.z);
        near = Math.min(near, d);
        if (o.team !== a.team) enemy = Math.min(enemy, d);
      }
      const score = (near < 1.2 ? -100 : Math.min(near, 6)) + Math.min(enemy, 30) * 0.3 + this.rng.range(0, 1.5);
      if (score > bs) { bs = score; best = p; }
    }
    return best;
  }

  /** 角色之间的占位：敌人硬分离，友军软分离（让行） */
  private separateActors(): void {
    const n = this.actors.length, R = PLAYER.radius * 2;
    for (let i = 0; i < n; i++) {
      const a = this.actors[i];
      if (!a.alive) continue;
      for (let j = i + 1; j < n; j++) {
        const b = this.actors[j];
        if (!b.alive || Math.abs(a.y - b.y) > 1.6) continue;
        const dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz);
        if (d >= R || d < 1e-5) continue;
        const k = (R - d) * (a.team === b.team ? 0.25 : 0.5);
        const ux = dx / d, uz = dz / d;
        a.motor.x -= ux * k; a.motor.z -= uz * k;
        b.motor.x += ux * k; b.motor.z += uz * k;
        a.motor.resolveHorizontal(this.world);
        b.motor.resolveHorizontal(this.world);
      }
    }
  }

  private stepGrenades(dt: number): void {
    const scratch = this.scratch;
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const g = this.grenades[i];
      if (stepGrenade(g, dt, this.world)) {
        this.events.push({ type: "bounce", nade: g });
        this.sounds.push({ x: g.x, y: g.y, z: g.z, radius: 9, kind: "bounce", team: -1, source: g.owner, t: this.time });
      }
      if (g.fuse > 0) continue;
      this.grenades.splice(i, 1);
      if (g.kind === "smoke") {
        const gy = this.world.groundAt(g.x, g.z, 0.1, g.y + 0.3, scratch);
        const s: Smoke = { id: ++this.smokeSeq, x: g.x, y: Number.isFinite(gy) ? gy : g.y, z: g.z, age: 0 };
        this.smokes.push(s);
        if (this.smokes.length > 6) this.smokes.shift();
        this.events.push({ type: "smoke", smoke: s });
        continue;
      }
      this.events.push({ type: "blast", x: g.x, y: g.y, z: g.z });
      this.sounds.push({ x: g.x, y: g.y, z: g.z, radius: 45, kind: "blast", team: -1, source: g.owner, t: this.time });
      const owner = this.actors[g.owner];
      for (const v of this.actors) {
        if (!v.alive || (v.team === owner.team && v !== owner)) continue;
        const dmg = blastDamage(this.world, g.x, g.y, g.z, v);
        if (dmg > 0.5) this.applyHit(owner, v, dmg, "blast", GRENADE.he.armorRatio, "he", [v.x, v.y + 1, v.z], false);
        if (this.match.ended) return;
      }
    }
  }

  private melee(a: Actor, heavy: boolean): void {
    const atk = heavy ? KNIFE.heavy : KNIFE.light;
    const hit = resolveMelee(this.world, a, this.actors, a.eye(), a.aimDir(), atk);
    this.events.push({ type: "melee", actor: a, hit: !!hit, heavy });
    this.sound(a, 5, "step");
    if (!hit) return;
    const raw = atk.damage * (hit.zone === "head" ? 1.5 : 1);
    this.applyHit(a, hit.victim as Actor, raw, hit.zone, KNIFE.armorRatio, "knife", [hit.victim.x, hit.victim.y + 1.2, hit.victim.z], false);
  }

  private throwNade(a: Actor, kind: "he" | "smoke", lob: boolean): void {
    const e = a.eye(), d = a.aimDir();
    let p: [number, number, number] = [e[0] + d[0] * 0.4, e[1] + d[1] * 0.4 - 0.1, e[2] + d[2] * 0.4];
    if (this.world.segmentBlocked(e[0], e[1], e[2], p[0], p[1], p[2], bulletFilter)) p = [e[0], e[1] - 0.1, e[2]];
    const g = spawnGrenade(kind, a.id, a.team, p, d, [a.motor.vx, a.motor.vy, a.motor.vz], lob);
    this.grenades.push(g);
    if (this.grenades.length > 12) this.grenades.shift();
  }

  /** 电脑开火前检查：友军挡枪、实体遮挡、当前武器能否穿透木材 */
  lineOfFire(a: Actor, p: [number, number, number]): boolean {
    const g = a.inv.gun;
    const m = a.muzzle(), e = a.eye();
    if (this.world.segmentBlocked(e[0], e[1], e[2], m[0], m[1], m[2], bulletFilter)) return false;
    const dx = p[0] - m[0], dy = p[1] - m[1], dz = p[2] - m[2];
    const len = Math.hypot(dx, dy, dz);
    if (len < 0.1) return true;
    const ux = dx / len, uy = dy / len, uz = dz / len;
    let wood = 0, count = 0;
    for (const h of this.world.raycastAll(m[0], m[1], m[2], ux, uy, uz, len - 0.3, bulletFilter)) {
      if (h.box.mat !== "wood" || !g) return false;
      wood += h.tOut - Math.max(0, h.tIn);
      if (++count > g.def.maxPenObjects || wood > g.def.pen) return false;
    }
    for (const o of this.actors) {
      if (o === a || !o.alive || o.team !== a.team) continue;
      if (Math.hypot(o.x - a.x, o.z - a.z) > len + 1) continue;
      if (rayActor(o, m, [ux, uy, uz], len)) return false;
    }
    return true;
  }

  private sound(a: Actor, radius: number, kind: SoundEvent["kind"]): void {
    this.sounds.push({ x: a.x, y: a.y + 1, z: a.z, radius, kind, team: a.team, source: a.id, t: this.time });
    if (this.sounds.length > 160) this.sounds.shift();
  }

  /** 测试入口：生成静止靶（复用正式的碰撞、命中与伤害规则） */
  spawnDummy(team: Team, x: number, y: number, z: number, yaw = 0, armor = 0): Actor {
    const a = new Actor(this.actors.length, team, `靶${this.actors.length}`, false, "ak", hashSeed("dummy", this.actors.length));
    a.dummy = true;
    this.actors.push(a);
    a.motor.place(x, y, z);
    a.yaw = yaw;
    a.health = MATCH.maxHealth;
    a.armor = armor;
    a.alive = true;
    return a;
  }

  /** 以当前视线给出第一人称方向（供渲染与 HUD 使用） */
  viewDir(a: Actor): [number, number, number] {
    return dirFrom(a.yaw + a.kickY, a.pitch + a.kickP);
  }

  /** 按规则中的主武器数值，暴露给 HUD 的武器定义 */
  static gunDef(id: PrimaryId | "deagle") {
    return GUNS[id];
  }
}

function rayActor(o: Actor, m: [number, number, number], d: [number, number, number], len: number): boolean {
  return !!rayCharacter(o, m[0], m[1], m[2], d[0], d[1], d[2], len);
}

/** 在锥角 spread（半角）内均匀扰动方向 */
export function perturb(d: [number, number, number], spread: number, rng: Rng): [number, number, number] {
  if (spread <= 0) return d;
  const ang = rng.next() * Math.PI * 2;
  const r = Math.tan(spread) * Math.sqrt(rng.next());
  let rx = d[2], ry = 0, rz = -d[0];
  let rl = Math.hypot(rx, rz);
  if (rl < 1e-6) { rx = 1; rz = 0; rl = 1; }
  rx /= rl; rz /= rl;
  // up = right × d
  const ux = ry * d[2] - rz * d[1], uy = rz * d[0] - rx * d[2], uz = rx * d[1] - ry * d[0];
  const ox = d[0] + (rx * Math.cos(ang) + ux * Math.sin(ang)) * r;
  const oy = d[1] + (ry * Math.cos(ang) + uy * Math.sin(ang)) * r;
  const oz = d[2] + (rz * Math.cos(ang) + uz * Math.sin(ang)) * r;
  const l = Math.hypot(ox, oy, oz);
  return [ox / l, oy / l, oz / l];
}
