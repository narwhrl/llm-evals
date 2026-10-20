import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DEFECTS, LINES, PRIOR_MARKS } from "../content";
import type { ProofState } from "../state";

interface GalleyProps {
  state: ProofState;
  onActivate: (id: string) => void;
  onCaret: (index: number) => void;
  /** Reports the section the reader is currently in. */
  onSection: (section: string) => void;
}

interface Point {
  x: number;
  y: number;
}

/** Splits a line around its misprint so the wrong glyph can be circled. */
function withDefect(text: string, lineId: string, found: string[]): React.ReactNode {
  const defect = DEFECTS.find((item) => item.lineId === lineId);
  if (!defect) return text;
  const at = text.indexOf(defect.wrong);
  if (at < 0) return text;
  const isFound = found.includes(lineId);
  return (
    <>
      {text.slice(0, at)}
      <span className={isFound ? "defect defect--found" : "defect"}>
        {defect.wrong}
      </span>
      {text.slice(at + defect.wrong.length)}
    </>
  );
}

export function Galley({ state, onActivate, onCaret, onSection }: GalleyProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [thread, setThread] = useState<Point[]>([]);

  // The attention thread runs through the gutter, in the order the visitor
  // marked the lines, so it has to be re-measured whenever the sheet reflows.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const tops = new Map<string, number>();
    LINES.forEach((line, index) => {
      const item = itemsRef.current[index];
      if (item) tops.set(line.id, item.offsetTop + item.offsetHeight / 2);
    });
    const points = state.trail
      .map((id, order) => {
        const y = tops.get(id);
        if (y === undefined) return null;
        const previous = order > 0 ? tops.get(state.trail[order - 1]) : undefined;
        const goingUp = previous !== undefined && y < previous;
        const wobble = ((order * 37) % 7) - 3;
        return { x: (goingUp ? 30 : 13) + wobble, y };
      })
      .filter((point): point is Point => point !== null);
    setThread(points);
  }, [state.trail, state.marks]);

  // The margin follows the reader: the section in view is the one argued about.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!listRef.current) return;
      const probe = window.innerHeight * 0.32;
      let current = LINES[0].section;
      for (let index = 0; index < LINES.length; index += 1) {
        const item = itemsRef.current[index];
        if (!item) continue;
        if (item.getBoundingClientRect().top <= probe) current = LINES[index].section;
        else break;
      }
      onSection(current);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [onSection]);

  useEffect(() => {
    const button = buttonsRef.current[state.caret];
    if (!button) return;
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.classList.contains("galley__mark")) {
      button.focus({ preventScroll: false });
    }
  }, [state.caret]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLOListElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const next = Math.min(LINES.length - 1, Math.max(0, state.caret + delta));
    onCaret(next);
    buttonsRef.current[next]?.focus();
  };

  return (
    <ol
      className={state.blind ? "galley galley--blind" : "galley"}
      ref={listRef}
      onKeyDown={handleKeyDown}
    >
      <svg className="galley__thread" aria-hidden="true">
        <polyline points={thread.map((p) => `${p.x},${p.y}`).join(" ")} />
      </svg>
      {LINES.map((line, index) => {
        const count = state.marks[line.id] ?? 0;
        const applied = Math.min(count, line.revisions.length);
        const current = applied > 0 ? line.revisions[applied - 1] : line.text;
        const struck =
          applied > 0 ? [line.text, ...line.revisions.slice(0, applied - 1)] : [];
        const settled = applied >= line.revisions.length;
        const isCaret = index === state.caret;
        const isFound = state.found.includes(line.id);
        const prior = PRIOR_MARKS[line.id];

        return (
          <li
            key={line.id}
            ref={(node) => {
              itemsRef.current[index] = node;
            }}
            className={[
              "galley__line",
              applied > 0 ? "galley__line--revised" : "",
              settled ? "galley__line--settled" : "",
              isFound ? "galley__line--found" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            data-section={line.section}
          >
            <span className="galley__tick" aria-hidden="true">
              {applied > 0 && <span className="galley__tick-mark" />}
            </span>
            <button
              type="button"
              className="galley__mark"
              ref={(node) => {
                buttonsRef.current[index] = node;
              }}
              tabIndex={isCaret ? 0 : -1}
              aria-current={isCaret ? "true" : undefined}
              aria-label={
                applied > 0
                  ? `第 ${index + 1} 段，已改 ${applied} 次，当前：${current}`
                  : `第 ${index + 1} 段，未改：${current}`
              }
              onClick={() => onActivate(line.id)}
            >
              {struck.map((word, order) => (
                <span className="galley__struck" key={`struck-${order}`}>
                  {withDefect(word, line.id, state.found)}
                </span>
              ))}
              <span
                key={applied}
                className={applied > 0 ? "galley__current is-new" : "galley__current"}
              >
                {withDefect(current, line.id, state.found)}
              </span>
            </button>
            <span className="galley__note">
              {isFound
                ? DEFECTS.find((item) => item.lineId === line.id)?.note
                : applied > 0
                  ? line.note
                  : prior}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
