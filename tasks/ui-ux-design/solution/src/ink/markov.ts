// 字级 n-gram（order-2，回退 order-1/unigram）马尔可夫续写引擎。
// 本地、零网络：用自撰语料模拟"接续"这一思考动作，候选项即犹豫。

export interface GenStep {
  chosen: string;
  candidates: string[];
}

interface BackoffModel {
  map2: Map<string, Map<string, number>>;
  map1: Map<string, Map<string, number>>;
  unigram: Map<string, number>;
}

function tally(map: Map<string, number>, key: string): void {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function pickWeighted(dist: Map<string, number>, rand: () => number): string {
  let total = 0;
  for (const n of dist.values()) total += n;
  let r = rand() * total;
  let last = '';
  for (const [ch, n] of dist) {
    r -= n;
    last = ch;
    if (r <= 0) return ch;
  }
  return last;
}

export class Markov {
  private model: BackoffModel = { map2: new Map(), map1: new Map(), unigram: new Map() };

  constructor(corpus: string) {
    const chars = Array.from(corpus);
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      tally(this.model.unigram, c);
      if (i >= 1) {
        const ctx1 = chars[i - 1];
        let m = this.model.map1.get(ctx1);
        if (!m) this.model.map1.set(ctx1, (m = new Map()));
        tally(m, c);
      }
      if (i >= 2) {
        const ctx2 = chars[i - 2] + chars[i - 1];
        let m = this.model.map2.get(ctx2);
        if (!m) this.model.map2.set(ctx2, (m = new Map()));
        tally(m, c);
      }
    }
  }

  /** 给定上下文，返回下一步：选定字 + 候选列表（含未中选者，用于"幽灵字"）。 */
  step(ctx: string, rand: () => number): GenStep {
    const cs = Array.from(ctx);
    const ctx2 = cs.slice(-2).join('');
    const ctx1 = cs.slice(-1).join('');
    const dist =
      this.model.map2.get(ctx2) ?? this.model.map1.get(ctx1) ?? this.model.unigram;
    const chosen = pickWeighted(dist, rand);
    const candidates = Array.from(dist.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([ch]) => ch);
    if (!candidates.includes(chosen)) candidates.push(chosen);
    return { chosen, candidates };
  }

  /** 从开头续写 len 字；带 6 字窗循环护栏，尽量在句号收束。 */
  generate(seed: string, len: number, rand: () => number = Math.random): GenStep[] {
    const steps: GenStep[] = [];
    let ctx = Array.from(seed).slice(-8).join('');
    let out = '';
    const seen = new Set<string>();
    for (let i = 0; i < len; i++) {
      const s = this.step(ctx, rand);
      let chosen = s.chosen;
      const win = (out + chosen).slice(-6);
      if (out.length >= 6 && seen.has(win)) {
        const alt = s.candidates.find((c) => c !== chosen && !seen.has((out + c).slice(-6)));
        if (alt) chosen = alt;
      }
      seen.add((out + chosen).slice(-6));
      out += chosen;
      steps.push({ chosen, candidates: s.candidates });
      ctx = (ctx + chosen).slice(-8);
      if (chosen === '。' && out.length >= 22) break;
    }
    return steps;
  }
}
