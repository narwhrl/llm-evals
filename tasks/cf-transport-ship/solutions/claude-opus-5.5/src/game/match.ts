// 对局规则：比分、时间、结束条件。纯逻辑，便于测试；结束后拒绝任何新的计分。
import type { Team } from "../map/layout";

export interface MatchRules {
  killTarget: number;
  timeLimit: number;
}

export type MatchEnd = { winner: Team | null; reason: "kills" | "time" };

export class Match {
  score: [number, number] = [0, 0];
  elapsed = 0;
  ended: MatchEnd | null = null;
  endCount = 0; // 用于验证结算只触发一次

  constructor(readonly rules: MatchRules) {}

  get remaining(): number {
    return Math.max(0, this.rules.timeLimit - this.elapsed);
  }

  /** 推进对局时间；时间到时按比分结算 */
  tick(dt: number): MatchEnd | null {
    if (this.ended) return null;
    this.elapsed += dt;
    if (this.elapsed >= this.rules.timeLimit) {
      this.elapsed = this.rules.timeLimit;
      const [a, b] = this.score;
      return this.finish({ winner: a === b ? null : a > b ? 0 : 1, reason: "time" });
    }
    return null;
  }

  /** 记录一次击杀。自杀不给任何一方加分。返回是否被计入。 */
  recordKill(killerTeam: Team, victimTeam: Team, suicide: boolean): { counted: boolean; end: MatchEnd | null } {
    if (this.ended) return { counted: false, end: null };
    if (suicide || killerTeam === victimTeam) return { counted: false, end: null };
    this.score[killerTeam]++;
    if (this.score[killerTeam] >= this.rules.killTarget) {
      return { counted: true, end: this.finish({ winner: killerTeam, reason: "kills" }) };
    }
    return { counted: true, end: null };
  }

  private finish(e: MatchEnd): MatchEnd | null {
    if (this.ended) return null;
    this.ended = e;
    this.endCount++;
    return e;
  }
}
