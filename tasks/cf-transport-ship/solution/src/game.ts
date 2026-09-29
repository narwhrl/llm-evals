import * as THREE from 'three';
import { DIFFICULTY, MATCH_SECONDS, RESPAWN_SECONDS, SCORE_LIMIT, SPAWN_PROTECTION, WEAPONS, type Difficulty, type Team, type WeaponId } from './config';
import { blockedLine, SPAWNS, traceBlocks, type Vec2 } from './map';
import { bodyHeight, canStand, eyeHeight, makeBody, moveBody, type Body } from './physics';
import { findPath } from './navigation';

export type Phase = 'menu' | 'playing' | 'paused' | 'ended';
export type Zone = 'head' | 'torso' | 'limb';
export type Gear = { mag: number; reserve: number; reloadEnd: number; nextFire: number; boltEnd: number };
export type Actor = {
  id: number; name: string; team: Team; player: boolean; body: Body; yaw: number; pitch: number;
  health: number; armor: number; alive: boolean; kills: number; deaths: number; protectedUntil: number;
  respawnAt: number; primary: WeaponId; selected: WeaponId | 'grenade'; previous: WeaponId;
  gear: Record<WeaponId, Gear>; grenades: { he: number; smoke: number }; grenadeChoice: 'he' | 'smoke';
  ads: boolean; moving: number; firing: boolean; shotCount: number; hitFlash: number; lastDamageYaw: number;
  meleeAt: number; meleeHeavy: boolean; meleeDone: boolean; footstepDistance: number;
  ai?: AiState;
};
type AiState = {
  lane: number; routeStage: number; path: Vec2[]; waypoint: number; repathAt: number; thinkAt: number;
  targetId: number; seenAt: number; acquiredAt: number; lastKnown: Vec2 | null;
  noiseAt: number; noisePos: Vec2 | null; strafe: number; stuckTime: number; lastX: number; lastZ: number;
  burstUntil: number; coolUntil: number;
};
export type Grenade = { kind: 'he' | 'smoke'; owner: number; team: Team; x: number; y: number; z: number; vx: number; vy: number; vz: number; detonateAt: number; bounces: number };
export type Smoke = { x: number; y: number; z: number; start: number; end: number; radius: number };
export type GameEvent = { type: string; x: number; y: number; z: number; actor?: number; target?: number; weapon?: WeaponId; zone?: Zone; amount?: number; text?: string };
export type PlayerInput = { forward: number; strafe: number; crouch: boolean; quiet: boolean; jump: boolean; fire: boolean; ads: boolean };
export type ShotResult = { target?: Actor; zone?: Zone; block?: string; damage: number; point: THREE.Vector3; penetrated: number };

const UP = new THREE.Vector3(0, 1, 0);
const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3(), tmpDir = new THREE.Vector3();
export function direction(yaw: number, pitch: number, out = new THREE.Vector3()): THREE.Vector3 {
  const c = Math.cos(pitch);
  return out.set(Math.sin(yaw) * c, Math.sin(pitch), Math.cos(yaw) * c);
}
export function raySphere(origin: THREE.Vector3, dir: THREE.Vector3, center: THREE.Vector3, radius: number): number {
  const dx = origin.x - center.x, dy = origin.y - center.y, dz = origin.z - center.z;
  const b = dx * dir.x + dy * dir.y + dz * dir.z;
  const c = dx * dx + dy * dy + dz * dz - radius * radius;
  const q = b * b - c;
  if (q < 0) return Infinity;
  const t = -b - Math.sqrt(q);
  return t >= 0 ? t : Infinity;
}
function angleTo(from: number, to: number): number { return Math.atan2(Math.sin(to - from), Math.cos(to - from)); }
function clamp(n: number, a: number, b: number): number { return Math.max(a, Math.min(b, n)); }
function evidenceSound(type: string): boolean { return type === 'shot' || type === 'footstep' || type === 'explosion'; }
export function armorDamage(amount: number, armor: number): { health: number; armor: number } {
  const absorbed = Math.min(armor / 1.3, amount * .38);
  return { health: amount - absorbed, armor: absorbed * 1.3 };
}
export function smokeOpacity(smoke: Smoke, now: number): number {
  return clamp((now - smoke.start) / 1.4, 0, 1) * clamp((smoke.end - now) / 2, 0, 1);
}
function segmentSphere(a: THREE.Vector3, b: THREE.Vector3, center: Smoke): number {
  const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
  const len = dx * dx + dy * dy + dz * dz;
  const t = clamp(((center.x - a.x) * dx + (center.y - a.y) * dy + (center.z - a.z) * dz) / Math.max(len, .0001), 0, 1);
  return Math.hypot(a.x + dx * t - center.x, a.y + dy * t - center.y, a.z + dz * t - center.z);
}

export class Game {
  phase: Phase = 'menu'; actors: Actor[] = []; grenades: Grenade[] = []; smokes: Smoke[] = []; events: GameEvent[] = [];
  now = 0; remaining = MATCH_SECONDS; score = { red: 0, blue: 0 }; winner: Team | 'draw' | null = null;
  playerTeam: Team = 'red'; primary: WeaponId = 'vandal'; difficulty: Difficulty = 'normal'; scoreLimit = SCORE_LIMIT;
  input: PlayerInput = { forward: 0, strafe: 0, crouch: false, quiet: false, jump: false, fire: false, ads: false };
  private randomState: number; private nextEventId = 0;
  constructor(seed = 710283) { this.randomState = seed >>> 0 || 1; }
  random(): number { this.randomState ^= this.randomState << 13; this.randomState ^= this.randomState >>> 17; this.randomState ^= this.randomState << 5; return (this.randomState >>> 0) / 4294967296; }
  get player(): Actor { return this.actors.find(a => a.player)!; }
  getActor(id: number): Actor | undefined { return this.actors.find(a => a.id === id); }
  emit(type: string, x: number, y: number, z: number, extra: Partial<GameEvent> = {}) {
    this.events.push({ type, x, y, z, ...extra }); this.nextEventId++;
    if (evidenceSound(type) && extra.actor !== undefined) {
      const source = this.getActor(extra.actor), range = type === 'footstep' ? extra.text === 'quiet' ? 5 : 11 : type === 'explosion' ? 35 : 29;
      if (source) for (const actor of this.actors) {
        if (!actor.ai || !actor.alive || actor.team === source.team) continue;
        if (Math.hypot(actor.body.x - x, actor.body.z - z) <= range) {
          actor.ai.noiseAt = this.now;
          actor.ai.noisePos = { x: x + (this.random() - .5) * 2.6, z: z + (this.random() - .5) * 2.6 };
        }
      }
    }
  }

  start(team: Team, primary: WeaponId, difficulty: Difficulty, practiceMinutes = 10): void {
    this.phase = 'playing'; this.now = 0; this.remaining = practiceMinutes * 60; this.score = { red: 0, blue: 0 };
    this.winner = null; this.grenades = []; this.smokes = []; this.events = []; this.nextEventId = 0;
    this.playerTeam = team; this.primary = primary; this.difficulty = difficulty;
    this.actors = [];
    let id = 0;
    for (const side of ['red', 'blue'] as Team[]) {
      for (let i = 0; i < 5; i++) {
        const player = side === team && i === 0;
        const botPrimary = (['vandal', 'sentinel', 'vector', 'longshot', 'sentinel'] as WeaponId[])[i];
        const chosen = player ? primary : botPrimary;
        const p = SPAWNS[side][i];
        const a: Actor = {
          id: id++, name: player ? '你' : `${side === 'red' ? '赤隼' : '蓝鲸'} ${i + 1}`, team: side, player,
          body: makeBody(p.x, p.z), yaw: side === 'red' ? 0 : Math.PI, pitch: 0,
          health: 100, armor: 100, alive: true, kills: 0, deaths: 0, protectedUntil: SPAWN_PROTECTION,
          respawnAt: 0, primary: chosen, selected: chosen, previous: 'revolver', gear: this.makeGear(),
          grenades: { he: 1, smoke: 1 }, grenadeChoice: 'he', ads: false, moving: 0, firing: false,
          shotCount: 0, hitFlash: 0, lastDamageYaw: 0, meleeAt: 0, meleeHeavy: false, meleeDone: false,
          footstepDistance: 0,
          ai: player ? undefined : { lane: (i + (side === 'blue' ? 1 : 0)) % 3 - 1, routeStage: 0, path: [], waypoint: 0, repathAt: 0,
            thinkAt: 0, targetId: -1, seenAt: -100, acquiredAt: 0, lastKnown: null, noiseAt: -100, noisePos: null,
            strafe: i % 2 ? 1 : -1, stuckTime: 0, lastX: p.x, lastZ: p.z, burstUntil: 0, coolUntil: 0 }
        };
        this.actors.push(a);
      }
    }
    this.emit('start', 0, 0, 0);
  }
  private makeGear(): Record<WeaponId, Gear> {
    return Object.fromEntries((Object.keys(WEAPONS) as WeaponId[]).map(id => [id, { mag: WEAPONS[id].mag, reserve: WEAPONS[id].reserve, reloadEnd: 0, nextFire: 0, boltEnd: 0 }])) as Record<WeaponId, Gear>;
  }
  pause(): void { if (this.phase === 'playing') { this.phase = 'paused'; this.input.fire = false; this.input.jump = false; this.emit('pause', 0, 0, 0); } }
  resume(): void { if (this.phase === 'paused') { this.phase = 'playing'; this.emit('resume', 0, 0, 0); } }
  setPrimaryForNextSpawn(id: WeaponId) { if (['vandal', 'sentinel', 'vector', 'longshot'].includes(id)) this.primary = id; }
  switchWeapon(a: Actor, next: WeaponId | 'grenade') {
    if (!a.alive || a.selected === next) return;
    if (next === 'grenade' && a.grenades.he + a.grenades.smoke === 0) return;
    if (a.selected !== 'grenade') { a.previous = a.selected; a.gear[a.selected].reloadEnd = 0; }
    a.selected = next; a.ads = false; a.firing = false;
    this.emit('switch', a.body.x, a.body.y + 1, a.body.z, { actor: a.id, weapon: next === 'grenade' ? undefined : next });
  }
  cycleGrenade(a: Actor) {
    if (a.selected !== 'grenade') this.switchWeapon(a, 'grenade');
    else a.grenadeChoice = a.grenadeChoice === 'he' ? 'smoke' : 'he';
    if (a.grenades[a.grenadeChoice] === 0) a.grenadeChoice = a.grenadeChoice === 'he' ? 'smoke' : 'he';
  }
  reload(a: Actor) {
    if (!a.alive || a.selected === 'grenade' || a.selected === 'knife') return;
    const g = a.gear[a.selected], cfg = WEAPONS[a.selected];
    if (g.reloadEnd > 0 || g.mag >= cfg.mag || g.reserve <= 0) return;
    g.reloadEnd = this.now + cfg.reload;
    this.emit('reload', a.body.x, a.body.y + 1, a.body.z, { actor: a.id, weapon: a.selected });
  }
  attack(a: Actor, heavy = false): ShotResult | null {
    if (this.phase !== 'playing' || !a.alive) return null;
    if (a.selected === 'grenade') { this.throwGrenade(a); return null; }
    if (a.selected === 'knife') { this.startMelee(a, heavy); return null; }
    return this.fire(a);
  }
  private startMelee(a: Actor, heavy: boolean) {
    const g = a.gear.knife;
    if (this.now < g.nextFire) return;
    g.nextFire = this.now + (heavy ? .92 : .55); a.meleeAt = this.now + (heavy ? .28 : .17);
    a.meleeHeavy = heavy; a.meleeDone = false; a.protectedUntil = 0;
    this.emit('melee', a.body.x, a.body.y + 1, a.body.z, { actor: a.id });
  }
  private resolveMelee(a: Actor) {
    if (a.meleeDone || a.meleeAt <= 0 || this.now < a.meleeAt) return;
    a.meleeDone = true;
    const dir = direction(a.yaw, a.pitch), eye = tmpA.set(a.body.x, a.body.y + eyeHeight(a.body), a.body.z).clone();
    let best: Actor | null = null, range = a.meleeHeavy ? 2.3 : 1.85;
    for (const target of this.actors) {
      if (!target.alive || target.id === a.id || target.team === a.team) continue;
      tmpB.set(target.body.x, target.body.y + 1, target.body.z).sub(eye);
      const d = tmpB.length();
      if (d < range && tmpB.normalize().dot(dir) > .68 && !blockedLine(eye, new THREE.Vector3(target.body.x, target.body.y + 1, target.body.z))) { best = target; range = d; }
    }
    if (best) this.damage(a, best, a.meleeHeavy ? 92 : 58, 'torso', new THREE.Vector3(best.body.x, best.body.y + 1, best.body.z), 'knife');
  }
  private throwGrenade(a: Actor) {
    const kind = a.grenadeChoice;
    if (a.grenades[kind] === 0) { a.grenadeChoice = kind === 'he' ? 'smoke' : 'he'; return; }
    a.grenades[kind]--; a.protectedUntil = 0;
    const d = direction(a.yaw, a.pitch + .13);
    const pos = new THREE.Vector3(a.body.x, a.body.y + eyeHeight(a.body) - .18, a.body.z).addScaledVector(d, .45);
    this.grenades.push({ kind, owner: a.id, team: a.team, x: pos.x, y: pos.y, z: pos.z, vx: d.x * 12, vy: d.y * 12 + 3.2, vz: d.z * 12, detonateAt: this.now + (kind === 'he' ? 2.35 : 1.9), bounces: 0 });
    this.emit('throw', pos.x, pos.y, pos.z, { actor: a.id, text: kind });
    if (a.grenades[kind] === 0 && a.grenades[kind === 'he' ? 'smoke' : 'he'] > 0) a.grenadeChoice = kind === 'he' ? 'smoke' : 'he';
    else if (!a.grenades.he && !a.grenades.smoke) this.switchWeapon(a, a.primary);
  }
  private actorRay(origin: THREE.Vector3, dir: THREE.Vector3, max: number, shooter: Actor): { target: Actor; zone: Zone; distance: number }[] {
    const result: { target: Actor; zone: Zone; distance: number }[] = [];
    for (const a of this.actors) {
      if (!a.alive || a.id === shooter.id) continue;
      const scale = a.body.crouched ? .64 : 1;
      const x = a.body.x, y = a.body.y, z = a.body.z;
      let best = Infinity, zone: Zone = 'limb';
      for (const hit of [
        { cx: x, cy: y + 1.55 * scale, cz: z, radius: .225, zone: 'head' as Zone },
        { cx: x, cy: y + .99 * scale, cz: z, radius: .37, zone: 'torso' as Zone },
        { cx: x, cy: y + .39 * scale, cz: z, radius: .32, zone: 'limb' as Zone }
      ]) {
        const d = raySphere(origin, dir, tmpB.set(hit.cx, hit.cy, hit.cz), hit.radius);
        if (d < best && d <= max) { best = d; zone = hit.zone; }
      }
      if (best < Infinity) result.push({ target: a, zone, distance: best });
    }
    result.sort((a, b) => a.distance - b.distance);
    return result;
  }
  traceShot(shooter: Actor, weapon: WeaponId, origin: THREE.Vector3, dir: THREE.Vector3, max = 100): ShotResult {
    const cfg = WEAPONS[weapon];
    const blocks = traceBlocks(origin, dir, max), people = this.actorRay(origin, dir, max, shooter);
    let bi = 0, pi = 0, penetration = cfg.penetration, passed = 0, multiplier = 1;
    while (bi < blocks.length || pi < people.length) {
      const block = blocks[bi], person = people[pi];
      if (block && (!person || block.enter <= person.distance)) {
        bi++;
        const thickness = block.exit - block.enter;
        if (block.block.kind === 'wood' && penetration >= thickness && passed < 2) {
          penetration -= thickness; multiplier *= .68; passed++; continue;
        }
        return { block: block.block.id, damage: 0, point: block.point, penetrated: passed };
      }
      if (person) {
        pi++;
        const point = origin.clone().addScaledVector(dir, person.distance);
        if (person.target.team === shooter.team) return { target: person.target, zone: person.zone, damage: 0, point, penetrated: passed };
        const distanceFalloff = weapon === 'vector' ? clamp(1 - Math.max(0, person.distance - 12) * .023, .55, 1) : clamp(1 - Math.max(0, person.distance - cfg.range) * .007, .75, 1);
        const zoneFactor = person.zone === 'head' ? 2.65 : person.zone === 'limb' ? .72 : 1;
        const amount = cfg.damage * zoneFactor * distanceFalloff * multiplier;
        const dealt = this.damage(shooter, person.target, amount, person.zone, point, weapon);
        return { target: person.target, zone: person.zone, damage: dealt, point, penetrated: passed };
      }
    }
    return { damage: 0, point: origin.clone().addScaledVector(dir, max), penetrated: passed };
  }
  private fire(a: Actor, scheduledAt = this.now): ShotResult | null {
    const weapon = a.selected;
    if (weapon === 'grenade' || weapon === 'knife') return null;
    const cfg = WEAPONS[weapon], g = a.gear[weapon];
    if (this.phase !== 'playing' || this.now < g.nextFire || this.now < g.boltEnd || g.reloadEnd > this.now) return null;
    if (g.mag <= 0) { g.nextFire = this.now + .2; this.emit('empty', a.body.x, a.body.y + 1, a.body.z, { actor: a.id }); if (!a.player) this.reload(a); return null; }
    g.mag--; g.nextFire = scheduledAt + 1 / cfg.rate;
    if (cfg.bolt) g.boltEnd = this.now + cfg.bolt;
    a.shotCount++; a.protectedUntil = 0; a.firing = true;
    const eye = new THREE.Vector3(a.body.x, a.body.y + eyeHeight(a.body), a.body.z);
    const aim = direction(a.yaw, a.pitch);
    const moving = clamp(a.moving / 5, 0, 1);
    const baseSpread = weapon === 'longshot' && a.ads ? .0008 : cfg.spread;
    const spread = (baseSpread + cfg.movingSpread * moving + Math.min(a.shotCount, 10) * baseSpread * .28) * (a.body.crouched ? .75 : 1);
    const aiError = a.player ? 0 : DIFFICULTY[this.difficulty].aim;
    const scatterX = (this.random() + this.random() - 1) * (spread + aiError);
    const scatterY = (this.random() + this.random() - 1) * (spread + aiError);
    aim.addScaledVector(new THREE.Vector3(Math.cos(a.yaw), 0, -Math.sin(a.yaw)), scatterX).addScaledVector(UP, scatterY).normalize();
    // A second ray from the actual muzzle catches close cover between eye and weapon.
    const right = new THREE.Vector3(Math.cos(a.yaw), 0, -Math.sin(a.yaw));
    const muzzle = eye.clone().addScaledVector(direction(a.yaw, a.pitch), .43).addScaledVector(right, .12).addScaledVector(UP, -.16);
    const aimPoint = eye.clone().addScaledVector(aim, 100);
    const bulletDir = aimPoint.sub(muzzle).normalize();
    const result = this.traceShot(a, weapon, muzzle, bulletDir, 100);
    this.emit('shot', muzzle.x, muzzle.y, muzzle.z, { actor: a.id, weapon });
    this.emit('impact', result.point.x, result.point.y, result.point.z, { actor: a.id, text: result.block ? result.block : result.target ? 'actor' : 'air' });
    if (a.player) { a.pitch = clamp(a.pitch + cfg.recoil * (a.ads ? .65 : 1), -1.35, 1.35); a.yaw += (this.random() - .5) * cfg.recoil * .4; }
    return result;
  }
  damage(attacker: Actor, target: Actor, raw: number, zone: Zone, point: THREE.Vector3, weapon: WeaponId | 'grenade'): number {
    if (this.phase !== 'playing' || !target.alive || target.protectedUntil > this.now || (attacker.team === target.team && attacker.id !== target.id)) return 0;
    const split = armorDamage(raw, target.armor);
    target.armor = Math.max(0, target.armor - split.armor);
    target.health = Math.max(0, target.health - split.health);
    target.hitFlash = .25; target.lastDamageYaw = Math.atan2(attacker.body.x - target.body.x, attacker.body.z - target.body.z);
    this.emit('hit', point.x, point.y, point.z, { actor: attacker.id, target: target.id, zone, amount: split.health, weapon: weapon === 'grenade' ? undefined : weapon });
    if (target.health <= 0) this.kill(attacker, target, weapon, zone);
    return split.health;
  }
  private kill(attacker: Actor, target: Actor, weapon: WeaponId | 'grenade', zone: Zone) {
    if (!target.alive) return;
    target.alive = false; target.health = 0; target.deaths++; target.respawnAt = this.now + RESPAWN_SECONDS;
    target.firing = false; target.ads = false; target.meleeAt = 0;
    if (attacker.id !== target.id) { attacker.kills++; this.score[attacker.team]++; }
    this.emit('death', target.body.x, target.body.y + 1, target.body.z, { actor: attacker.id, target: target.id, text: weapon, zone });
    if (this.score.red >= this.scoreLimit || this.score.blue >= this.scoreLimit) this.finish();
  }
  private respawn(a: Actor) {
    const positions = SPAWNS[a.team];
    let best = positions[0], bestScore = -Infinity;
    for (const pos of positions) {
      let score = 0;
      for (const other of this.actors) {
        if (!other.alive) continue;
        const d = Math.hypot(other.body.x - pos.x, other.body.z - pos.z);
        if (other.team === a.team) score -= d < 1.2 ? 100 : d < 2.1 ? 4 : 0;
        else score += Math.min(35, d) + (blockedLine(new THREE.Vector3(pos.x, 1.2, pos.z), new THREE.Vector3(other.body.x, 1.2, other.body.z)) ? 6 : 0);
      }
      if (score > bestScore) { bestScore = score; best = pos; }
    }
    a.body = makeBody(best.x, best.z); a.yaw = a.team === 'red' ? 0 : Math.PI; a.pitch = 0;
    a.health = 100; a.armor = 100; a.alive = true; a.protectedUntil = this.now + SPAWN_PROTECTION;
    a.gear = this.makeGear(); a.grenades = { he: 1, smoke: 1 }; a.grenadeChoice = 'he';
    a.primary = a.player ? this.primary : a.primary; a.selected = a.primary; a.ads = false; a.shotCount = 0;
    if (a.ai) { a.ai.routeStage = 0; a.ai.path = []; a.ai.repathAt = 0; a.ai.targetId = -1; a.ai.lastKnown = null; a.ai.lane = Math.floor(this.random() * 3) - 1; }
    this.emit('respawn', best.x, 0, best.z, { actor: a.id });
  }
  private finish() {
    if (this.phase === 'ended') return;
    this.phase = 'ended'; this.input.fire = false;
    this.winner = this.score.red === this.score.blue ? 'draw' : this.score.red > this.score.blue ? 'red' : 'blue';
    this.emit('end', 0, 0, 0, { text: this.winner });
  }
  private visible(observer: Actor, target: Actor): boolean {
    if (!target.alive || target.team === observer.team) return false;
    const a = tmpA.set(observer.body.x, observer.body.y + eyeHeight(observer.body), observer.body.z).clone();
    const b = tmpB.set(target.body.x, target.body.y + (target.body.crouched ? .7 : 1.1), target.body.z).clone();
    const delta = b.clone().sub(a), dist = delta.length();
    if (dist > DIFFICULTY[this.difficulty].range) return false;
    const facing = direction(observer.yaw, observer.pitch);
    if (delta.divideScalar(dist).dot(facing) < .26 && dist > 5) return false;
    if (blockedLine(a, b)) return false;
    for (const smoke of this.smokes) if (smokeOpacity(smoke, this.now) > .35 && segmentSphere(a, b, smoke) < smoke.radius * .86) return false;
    return true;
  }
  private think(a: Actor) {
    const ai = a.ai!; ai.thinkAt = this.now + .14 + this.random() * .1;
    let closest: Actor | null = null, best = Infinity;
    for (const enemy of this.actors) {
      if (!this.visible(a, enemy)) continue;
      const d = Math.hypot(enemy.body.x - a.body.x, enemy.body.z - a.body.z);
      if (d < best) { best = d; closest = enemy; }
    }
    if (closest) {
      if (ai.targetId !== closest.id) ai.acquiredAt = this.now;
      ai.targetId = closest.id; ai.seenAt = this.now; ai.lastKnown = { x: closest.body.x, z: closest.body.z };
    } else if (this.now - ai.seenAt > 1.3) ai.targetId = -1;
    if (this.now >= ai.repathAt || ai.path.length === 0) {
      ai.repathAt = this.now + 1.4 + this.random() * .5;
      let goal: Vec2;
      const advance = a.team === 'red' ? 1 : -1;
      const routeGoal = (): Vec2 => {
        if (ai.lane === 0) return { x: 0, z: advance * (ai.routeStage === 0 ? -8 : ai.routeStage === 1 ? 9 : 25) };
        return { x: ai.lane * (ai.routeStage < 2 ? 12.05 : 7.2), z: advance * (ai.routeStage === 0 ? -7.7 : ai.routeStage === 1 ? 7.7 : 24) };
      };
      let route = routeGoal();
      if (Math.hypot(route.x - a.body.x, route.z - a.body.z) < 2.1 && ai.routeStage < 2) { ai.routeStage++; route = routeGoal(); }
      if (ai.lane !== 0 && ai.routeStage < 2) goal = route;
      else if (ai.targetId >= 0 && ai.lastKnown) goal = ai.lastKnown;
      else if (ai.lastKnown && this.now - ai.seenAt < 3) goal = ai.lastKnown;
      else if (ai.noisePos && this.now - ai.noiseAt < 2.5) goal = ai.noisePos;
      else goal = route;
      ai.path = findPath({ x: a.body.x, z: a.body.z }, goal); ai.waypoint = 0;
    }
  }
  private updateBot(a: Actor, dt: number) {
    const ai = a.ai!;
    if (this.now >= ai.thinkAt) this.think(a);
    const target = this.getActor(ai.targetId);
    const targetVisible = !!target && this.now - ai.seenAt < .29 && this.visible(a, target);
    let tx = 0, tz = 0;
    if (targetVisible && target) {
      tx = target.body.x; tz = target.body.z;
      const deltaX = tx - a.body.x, deltaZ = tz - a.body.z;
      const wantedYaw = Math.atan2(deltaX, deltaZ);
      a.yaw += clamp(angleTo(a.yaw, wantedYaw), -2.8 * dt, 2.8 * dt);
      const wantedPitch = Math.atan2(target.body.y + (target.body.crouched ? .7 : 1.05) - a.body.y - eyeHeight(a.body), Math.hypot(deltaX, deltaZ));
      a.pitch += clamp(wantedPitch - a.pitch, -1.8 * dt, 1.8 * dt);
      if (this.now > ai.acquiredAt + DIFFICULTY[this.difficulty].reaction && Math.abs(angleTo(a.yaw, wantedYaw)) < .18) {
        if (this.now > ai.coolUntil) {
          if (this.now > ai.burstUntil) ai.burstUntil = this.now + .28 + this.random() * DIFFICULTY[this.difficulty].burst;
          if (this.now < ai.burstUntil) this.fire(a);
          else ai.coolUntil = this.now + .22 + this.random() * .38;
        }
      }
      const d = Math.hypot(deltaX, deltaZ);
      if (d < 15 && d > 4) {
        const side = ai.strafe, vx = deltaZ / d * side * 1.1, vz = -deltaX / d * side * 1.1;
        const forward = d > 9 ? .72 : d < 5 ? -.55 : 0;
        moveBody(a.body, vx + deltaX / d * forward, vz + deltaZ / d * forward, dt);
        a.moving = Math.hypot(vx, vz) + Math.abs(forward);
      } else if (d > 15 && !(a.primary === 'longshot' && d < 27)) {
        const point = ai.path[ai.waypoint];
        if (point) {
          const mx = point.x - a.body.x, mz = point.z - a.body.z, md = Math.hypot(mx, mz);
          if (md < .62) ai.waypoint++;
          else { moveBody(a.body, mx / md * 3.45, mz / md * 3.45, dt); a.moving = 3.45; }
        } else a.moving = 0;
      } else a.moving = 0;
      if (d > 8 && d < 23 && a.grenades.he && this.random() < dt * .025) { a.grenadeChoice = 'he'; this.throwGrenade(a); }
    } else {
      const point = ai.path[ai.waypoint];
      if (point) {
        const dx = point.x - a.body.x, dz = point.z - a.body.z, d = Math.hypot(dx, dz);
        if (d < .62) ai.waypoint++;
        else {
          const wantedYaw = Math.atan2(dx, dz);
          a.yaw += clamp(angleTo(a.yaw, wantedYaw), -3.7 * dt, 3.7 * dt);
          a.pitch += clamp(-a.pitch, -1.5 * dt, 1.5 * dt);
          const speed = a.selected === 'longshot' ? 3.25 : 3.8;
          moveBody(a.body, dx / d * speed, dz / d * speed, dt);
          a.moving = speed;
        }
      } else a.moving = 0;
    }
    if (a.gear[a.selected as WeaponId]?.mag === 0 && a.selected !== 'knife' && a.selected !== 'grenade') this.reload(a);
    if (Math.hypot(a.body.x - ai.lastX, a.body.z - ai.lastZ) < .015 && a.moving > .2) ai.stuckTime += dt;
    else ai.stuckTime = Math.max(0, ai.stuckTime - dt * 2);
    if (ai.stuckTime > 1.2) { ai.repathAt = 0; ai.strafe *= -1; ai.stuckTime = 0; }
    ai.lastX = a.body.x; ai.lastZ = a.body.z;
  }
  private updateGrenades(dt: number) {
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const g = this.grenades[i], oldX = g.x, oldY = g.y, oldZ = g.z;
      g.vy -= 15 * dt; g.x += g.vx * dt; g.y += g.vy * dt; g.z += g.vz * dt;
      if (g.y < .14) { g.y = .14; g.vy = Math.abs(g.vy) * .38; g.vx *= .76; g.vz *= .76; g.bounces++; }
      const a = new THREE.Vector3(oldX, oldY, oldZ), b = new THREE.Vector3(g.x, g.y, g.z), d = b.clone().sub(a);
      if (d.lengthSq() > .0001 && traceBlocks(a, d.clone().normalize(), d.length() + .12).length) {
        g.x = oldX; g.y = oldY; g.z = oldZ;
        g.vx *= -.42; g.vz *= -.42; g.vy *= .62; g.bounces++;
      }
      if (this.now >= g.detonateAt) {
        this.grenades.splice(i, 1);
        if (g.kind === 'smoke') { this.smokes.push({ x: g.x, y: .9, z: g.z, start: this.now, end: this.now + 16, radius: 4.3 }); this.emit('smoke', g.x, .3, g.z, { actor: g.owner }); }
        else {
          this.emit('explosion', g.x, g.y, g.z, { actor: g.owner });
          const owner = this.getActor(g.owner)!;
          for (const target of this.actors) {
            if (!target.alive || (target.team === owner.team && target.id !== owner.id)) continue;
            const point = new THREE.Vector3(target.body.x, target.body.y + .8, target.body.z);
            const dist = point.distanceTo(new THREE.Vector3(g.x, g.y, g.z));
            if (dist > 5.3) continue;
            const occluded = blockedLine(new THREE.Vector3(g.x, g.y + .12, g.z), point);
            const amount = 108 * (1 - dist / 5.3) ** 1.25 * (occluded ? .16 : 1);
            if (amount > 1) this.damage(owner, target, amount, 'torso', point, 'grenade');
          }
        }
      }
    }
    this.smokes = this.smokes.filter(s => s.end > this.now);
  }
  private updatePlayer(dt: number) {
    const a = this.player;
    if (!a.alive) return;
    a.body.crouched = this.input.crouch || (a.body.crouched && !canStand(a.body));
    const speed = this.input.crouch ? 2.25 : this.input.quiet ? 2.8 : a.selected === 'knife' ? 5.25 : 4.65;
    const forward = clamp(this.input.forward, -1, 1), strafe = clamp(this.input.strafe, -1, 1);
    const magnitude = Math.max(1, Math.hypot(forward, strafe));
    const fx = Math.sin(a.yaw), fz = Math.cos(a.yaw), rx = Math.cos(a.yaw), rz = -Math.sin(a.yaw);
    const vx = (fx * forward + rx * strafe) * speed / magnitude;
    const vz = (fz * forward + rz * strafe) * speed / magnitude;
    const wasGrounded = a.body.grounded;
    moveBody(a.body, vx, vz, dt, this.input.jump);
    this.input.jump = false;
    a.moving = Math.hypot(vx, vz);
    a.ads = this.input.ads && a.selected === 'longshot';
    if (this.input.fire && a.selected !== 'grenade' && a.selected !== 'knife' && WEAPONS[a.selected].automatic) {
      const gear = a.gear[a.selected];
      // Keep sustained fire on its own clock instead of adding one render tick to every interval.
      let scheduledAt = gear.nextFire > 0 ? Math.max(gear.nextFire, this.now - dt) : this.now;
      while (scheduledAt <= this.now + 1e-8) {
        if (!this.fire(a, scheduledAt)) break;
        scheduledAt = gear.nextFire;
      }
    }
    if (!wasGrounded && a.body.grounded) this.emit('land', a.body.x, a.body.y, a.body.z, { actor: a.id });
    if (a.moving > .2 && a.body.grounded) {
      a.footstepDistance += a.moving * dt;
      if (a.footstepDistance > (this.input.quiet || a.body.crouched ? 2.5 : 1.85)) {
        a.footstepDistance = 0; this.emit('footstep', a.body.x, a.body.y, a.body.z, { actor: a.id, text: this.input.quiet ? 'quiet' : 'normal' });
      }
    }
    if (Math.abs(a.body.z) < 25 || Math.abs(a.body.x) > 8.8) a.protectedUntil = 0;
  }
  update(dt: number) {
    if (this.phase !== 'playing') return;
    this.now += dt; this.remaining = Math.max(0, this.remaining - dt);
    this.updatePlayer(dt);
    for (const a of this.actors) {
      if (!a.alive) { if (this.now >= a.respawnAt) this.respawn(a); continue; }
      for (const id of Object.keys(WEAPONS) as WeaponId[]) {
        const g = a.gear[id];
        if (g.reloadEnd > 0 && this.now >= g.reloadEnd) {
          const added = Math.min(WEAPONS[id].mag - g.mag, g.reserve);
          g.mag += added; g.reserve -= added; g.reloadEnd = 0;
          this.emit('reloadDone', a.body.x, a.body.y + 1, a.body.z, { actor: a.id, weapon: id });
        }
      }
      if (a.ai) this.updateBot(a, dt);
      if (this.phase !== 'playing') break;
      this.resolveMelee(a);
      a.hitFlash = Math.max(0, a.hitFlash - dt);
      a.shotCount = Math.max(0, a.shotCount - dt * 2.3);
      if (a.selected !== 'grenade') a.firing = this.now >= a.gear[a.selected].nextFire - .09 && this.now < a.gear[a.selected].nextFire;
    }
    if (this.phase !== 'playing') return;
    this.updateGrenades(dt);
    if (this.remaining <= 1e-6 && this.phase === 'playing') { this.remaining = 0; this.finish(); }
  }
  stateSnapshot() {
    return { phase: this.phase, now: this.now, remaining: this.remaining, score: { ...this.score }, winner: this.winner,
      actors: this.actors.map(a => ({ id: a.id, team: a.team, alive: a.alive, health: a.health, armor: a.armor, kills: a.kills, deaths: a.deaths,
        x: a.body.x, y: a.body.y, z: a.body.z, selected: a.selected, ammo: a.selected === 'grenade' ? 0 : a.gear[a.selected].mag,
        ai: a.ai ? { lane: a.ai.lane, targetId: a.ai.targetId, seenAt: a.ai.seenAt, stuckTime: a.ai.stuckTime } : undefined })) };
  }
}
