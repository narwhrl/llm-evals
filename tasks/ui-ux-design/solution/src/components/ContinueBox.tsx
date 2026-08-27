import { useEffect, useRef, useState } from 'react';
import type { Markov, GenStep } from '../ink/markov';

interface Props {
  markov: Markov;
  reduced: boolean;
  onGenerated: (text: string) => void;
}

type Phase = 'idle' | 'writing' | 'done';

const SEEDS = ['你在读我的时候', '我读过海', '给我一个开头'];
const GHOST_MS = 210;

/**
 * 续写装置：访客给开头，本地马尔可夫引擎逐字接续。
 * 每一步先浮现候选"幽灵字"，再落定选中的字——犹豫是可见的。
 */
export function ContinueBox({ markov, reduced, onGenerated }: Props) {
  const [seed, setSeed] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [committed, setCommitted] = useState('');
  const [ghosts, setGhosts] = useState<string[]>([]);
  const [discarded, setDiscarded] = useState<string[]>([]);
  const runId = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const run = (e?: React.FormEvent) => {
    e?.preventDefault();
    const s = seed.trim() || SEEDS[Math.floor(Math.random() * SEEDS.length)];
    const id = ++runId.current;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setPhase('writing');
    setCommitted('');
    setDiscarded([]);
    const steps: GenStep[] = markov.generate(s, 24 + Math.floor(Math.random() * 10));

    const finish = () => {
      if (runId.current !== id) return;
      const full = steps.map((st) => st.chosen).join('');
      setCommitted(full);
      setGhosts([]);
      const drop = Array.from(
        new Set(steps.flatMap((st) => st.candidates.filter((c) => c !== st.chosen))),
      ).slice(0, 9);
      setDiscarded(drop);
      setPhase('done');
      onGenerated(s + full);
    };

    if (reduced) {
      finish();
      return;
    }
    let acc = '';
    steps.forEach((st, i) => {
      timers.current.push(
        window.setTimeout(() => {
          if (runId.current !== id) return;
          setGhosts(st.candidates.slice(0, 3));
        }, i * GHOST_MS),
      );
      timers.current.push(
        window.setTimeout(() => {
          if (runId.current !== id) return;
          acc += st.chosen;
          setCommitted(acc);
          setGhosts([]);
        }, i * GHOST_MS + GHOST_MS * 0.62),
      );
    });
    timers.current.push(window.setTimeout(finish, steps.length * GHOST_MS + 120));
  };

  return (
    <form className="continue-box" onSubmit={run}>
      <label className="continue-label" htmlFor="seed-input">
        给我一个开头
      </label>
      <div className="continue-row">
        <input
          id="seed-input"
          type="text"
          value={seed}
          maxLength={12}
          placeholder={SEEDS[0]}
          onChange={(e) => setSeed(e.target.value)}
          disabled={phase === 'writing'}
          autoComplete="off"
        />
        <button type="submit" disabled={phase === 'writing'}>
          {phase === 'writing' ? '续写中…' : '续写'}
        </button>
      </div>
      <div className="continue-out" aria-live="polite" aria-atomic="true">
        {phase === 'done' && <span className="sr-only">{committed}</span>}
        <span aria-hidden={phase === 'done' ? undefined : true}>
          {phase !== 'idle' && (
            <>
              <span className="out-seed">{seed.trim() || SEEDS[0]}</span>
              <span className="out-committed">{committed}</span>
              {ghosts.length > 0 && (
                <span className="out-ghosts">
                  {ghosts.map((g, i) => (
                    <i key={`${g}-${i}`} style={{ animationDelay: `${i * 40}ms` }}>
                      {g}
                    </i>
                  ))}
                </span>
              )}
            </>
          )}
        </span>
        {phase === 'idle' && <span className="out-hint">你的开头会流进身后的墨河。</span>}
      </div>
      {phase === 'done' && discarded.length > 0 && (
        <p className="continue-discarded">
          途中舍弃的后来：<em>{discarded.join(' ')}</em>
        </p>
      )}
    </form>
  );
}
