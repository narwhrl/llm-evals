import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LINES, TOTAL_MARKS } from "../content";
import type { ProofState } from "../state";
import { stageFor } from "../content";

interface PressProps {
  state: ProofState;
  marks: number;
  onReset: () => void;
  onClose: () => void;
}

type Step = "wait" | "descend" | "contact" | "verso" | "lift" | "done";

const TIMING: Record<Exclude<Step, "done" | "wait">, number> = {
  descend: 950,
  contact: 1200,
  verso: 2800,
  lift: 1000,
};

/**
 * The press run.
 *
 * The platen comes down, the sheet takes the impression, turns over to show
 * the order the words were written in, and comes back up carrying the
 * finished proof. The sequence can be replayed and the whole job can be
 * started again.
 */
export function Press({ state, marks, onReset, onClose }: PressProps) {
  const [step, setStep] = useState<Step>("wait");
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [thread, setThread] = useState<Array<{ x: number; y: number }>>([]);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setStep("done");
      return;
    }
    const timers: number[] = [];
    const order: Exclude<Step, "done" | "wait">[] = [
      "descend",
      "contact",
      "verso",
      "lift",
    ];
    let elapsed = 260;
    timers.push(window.setTimeout(() => setStep("descend"), elapsed));
    order.forEach((name) => {
      elapsed += TIMING[name];
      timers.push(window.setTimeout(() => setStep(name), elapsed));
    });
    timers.push(window.setTimeout(() => setStep("done"), elapsed + 260));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduced]);

  useLayoutEffect(() => {
    const tops = new Map<string, number>();
    LINES.forEach((line, index) => {
      const item = itemsRef.current[index];
      if (item) tops.set(line.id, item.offsetTop + item.offsetHeight / 2);
    });
    setThread(
      state.trail
        .map((id, order) => {
          const y = tops.get(id);
          if (y === undefined) return null;
          return { x: 20 + ((order * 37) % 9) - 4, y };
        })
        .filter((point): point is { x: number; y: number } => point !== null),
    );
  }, [state.trail, state.marks, step]);

  const stage = stageFor(marks);
  const revisedCount = LINES.filter((line) => (state.marks[line.id] ?? 0) > 0).length;

  // The order the lines were touched in, read as a movement down the sheet.
  const order = state.trail.map((id) => LINES.findIndex((line) => line.id === id));
  let up = 0;
  let down = 0;
  for (let i = 1; i < order.length; i += 1) {
    if (order[i] < order[i - 1]) up += 1;
    else if (order[i] > order[i - 1]) down += 1;
  }
  const reading =
    state.trail.length === 0
      ? "还没有落笔。"
      : up === 0
        ? "你从上往下读，一次也没有回头。"
        : down === 0
          ? "你一路往上改，几乎没有往下走。"
          : `你改了 ${up} 处回头，${down} 处顺行——你在纸上来回找。`;

  return (
    <div className="press" data-step={step} role="dialog" aria-modal="true" aria-label="付印">
      <div className="press__bed" aria-hidden="true" />
      <div className="press__platen" aria-hidden="true">
        <span className="press__platen-bar" />
        <span className="press__platen-screw press__platen-screw--l" />
        <span className="press__platen-screw press__platen-screw--r" />
      </div>

      <div className="press__stage">
        <div className="press__sheet">
          <div className="press__face press__face--final">
            <div className="press__stamp" aria-hidden="true">
              <span>付印</span>
              <span>{stage.name}</span>
            </div>
            <h2 className="press__title">定稿</h2>
            <ol className="press__lines">
              {LINES.map((line, index) => {
                const count = state.marks[line.id] ?? 0;
                const applied = Math.min(count, line.revisions.length);
                const text = applied > 0 ? line.revisions[applied - 1] : line.text;
                return (
                  <li
                    key={line.id}
                    ref={(node) => {
                      itemsRef.current[index] = node;
                    }}
                    className={applied > 0 ? "press__line is-revised" : "press__line"}
                  >
                    {text}
                  </li>
                );
              })}
            </ol>
            <svg className="press__signature" aria-hidden="true">
              <polyline points={thread.map((p) => `${p.x},${p.y}`).join(" ")} />
            </svg>
            <div className="press__colophon">
              <p>
                修订 {marks} 处，涉及 {revisedCount} 行；误植 {state.found.length}/3。
                {state.found.length === 3
                  ? "三处误植已全部校出。"
                  : "尚有误植留在纸上。"}
              </p>
              <p>{reading}</p>
              <p>
                这一版的措辞由读者决定，页边那道红线是落笔的次序。
                {marks < TOTAL_MARKS ? "还有句子没有改完。" : "全部句子都定稿了。"}
              </p>
            </div>
          </div>

          <div className="press__face press__face--verso" aria-hidden={step !== "verso"}>
            <h2 className="press__verso-title">背页 · 落笔之前</h2>
            <ol className="press__raw">
              {LINES.map((line) => {
                const chain = [...line.revisions].reverse();
                return (
                  <li key={line.id}>
                    {chain.map((word, order) => (
                      <span key={order} className="press__raw-struck">
                        {word}
                      </span>
                    ))}
                    <span className="press__raw-final">{line.text}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {step === "done" && (
          <div className="press__actions">
            <button type="button" className="press__button" onClick={onReset}>
              重新校样
            </button>
            <button type="button" className="press__button press__button--quiet" onClick={onClose}>
              回到纸面
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
