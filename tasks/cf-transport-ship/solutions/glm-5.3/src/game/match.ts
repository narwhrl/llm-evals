/**
 * 对局状态机：比分、时间、复活调度、结束条件（击杀上限 / 时间 / 平局）。
 * 结束后仅触发一次结算，不再产生伤害与比分。
 */
import { MATCH, MatchMode, Team } from '../core/config';
import { Character } from '../entities/character';
import { SPAWNS } from '../map/mapData';
import { ColliderWorld } from '../physics/world';

export interface MatchSnapshot {
  blue: number;
  red: number;
  timeLeft: number;
  goal: number;
  ended: boolean;
  result: 'win' | 'lose' | 'draw' | null;
  winner: Team | null;
}

export class Match {
  killLimit: number;
  duration: number;
  timeLeft: number;
  scores: Record<Team, number> = { blue: 0, red: 0 };
  ended = false;
  result: 'win' | 'lose' | 'draw' | null = null;
  winner: Team | null = null;
  playerTeam: Team = 'blue';
  private characters: Character[] = [];
  private world: ColliderWorld;
  private rngPos = { next: () => Math.random() };

  constructor(mode: MatchMode, characters: Character[], world: ColliderWorld) {
    const cfg = MATCH[mode];
    this.killLimit = cfg.killLimit;
    this.duration = cfg.duration;
    this.timeLeft = cfg.duration;
    this.characters = characters;
    this.world = world;
  }

  snapshot(): MatchSnapshot {
    return {
      blue: this.scores.blue, red: this.scores.red, timeLeft: this.timeLeft,
      goal: this.killLimit, ended: this.ended, result: this.result, winner: this.winner,
    };
  }

  /** 击杀入账（死亡幂等性由 Character 保证） */
  addKill(killer: Character | null, victim: Character): void {
    if (this.ended) return;
    if (killer && killer.team !== victim.team) {
      this.scores[killer.team] += 1;
      this.checkEnd();
    }
  }

  update(dt: number, now: number): void {
    if (this.ended) return;
    this.timeLeft = Math.max(0, this.timeLeft - dt);
    // 复活
    for (const c of this.characters) {
      if (!c.alive && c.respawnAt > 0 && now >= c.respawnAt) {
        const sp = this.pickSpawn(c.team);
        c.respawn({ x: sp.x, y: 0, z: sp.z }, sp.yaw, now);
      }
    }
    if (this.timeLeft <= 0) this.checkEnd();
  }

  private checkEnd(): void {
    if (this.ended) return;
    let winner: Team | null = null;
    if (this.scores.blue >= this.killLimit) winner = 'blue';
    else if (this.scores.red >= this.killLimit) winner = 'red';
    else if (this.timeLeft <= 0) {
      if (this.scores.blue > this.scores.red) winner = 'blue';
      else if (this.scores.red > this.scores.blue) winner = 'red';
      else winner = null;
    }
    if (this.timeLeft <= 0 || winner !== null) {
      this.ended = true;
      this.winner = winner;
      this.result = winner === null ? 'draw' : winner === this.playerTeam ? 'win' : 'lose';
    }
  }

  /** 选择距存活敌人最远的己方出生点，避免重叠与落在墙里 */
  private pickSpawn(team: Team): { x: number; z: number; yaw: number } {
    const spawns = SPAWNS[team];
    const enemies = this.characters.filter((c) => c.alive && c.team !== team);
    let best = spawns[0], bestScore = -Infinity;
    for (const sp of spawns) {
      let minDist = 999;
      for (const e of enemies) {
        const d = Math.hypot(e.body.pos.x - sp.x, e.body.pos.z - sp.z);
        minDist = Math.min(minDist, d);
      }
      // 出生点占用检查（活着的队友）
      let overlap = 0;
      for (const a of this.characters) {
        if (a.alive && a.team === team && Math.hypot(a.body.pos.x - sp.x, a.body.pos.z - sp.z) < 1.2) overlap += 10;
      }
      const clear = this.world.spawnClear(sp.x, 0, sp.z, 1.85, 0.36) ? 0 : 5;
      const score = minDist - overlap - clear + this.rngPos.next() * 0.8;
      if (score > bestScore) { bestScore = score; best = sp; }
    }
    return best;
  }

  reset(now: number): void {
    this.timeLeft = this.duration;
    this.scores = { blue: 0, red: 0 };
    this.ended = false;
    this.result = null;
    this.winner = null;
    for (const c of this.characters) {
      const sp = this.pickSpawn(c.team);
      c.respawn({ x: sp.x, y: 0, z: sp.z }, sp.yaw, now);
      c.kills = 0;
      c.deaths = 0;
      c.score = 0;
    }
  }
}
