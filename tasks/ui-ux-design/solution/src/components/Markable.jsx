import { useEffect, useRef, useState } from "react";

import { useEngine } from "../core/engineContext.js";
import { addMark, removeMark } from "../core/engine.js";
import { announce, setMarks, useAppState } from "../core/store.js";

const HOLD_MS = 1200;

/**
 * 隐藏层：长按一句话，它变成缝轨上一个反相光源（相位 +π / +π/2 / −π/2），
 * 在底片上抵消掉一片光。三句互不相同，抵消的样子也不相同。
 */
export default function Markable({ index, children }) {
  const engine = useEngine();
  const state = useAppState();
  const timer = useRef(0);
  const [arming, setArming] = useState(false);

  const mark = state.marks.find((item) => item.index === index) || null;
  const withdrawn = state.withdrawn === index;
  const canMark = state.phase === "third" || state.phase === "closing" || state.phase === "closed";

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const refresh = () => {
    setMarks(engine.marks);
    if (engine.loop) engine.loop.invalidate();
  };

  const toggle = () => {
    if (!canMark) {
      announce("先让我消失一次。第三道缝打开之后，你才能给一句话加相位。");
      return;
    }
    if (mark) {
      removeMark(engine);
      announce("相位标记已撤下，那片光回来了。");
    } else {
      const added = addMark(engine);
      if (!added) {
        announce("标记最多三处。");
        return;
      }
      announce(`给这句加了相位 ${added.label}，它现在是一个反相光源。`);
    }
    refresh();
  };

  const start = () => {
    if (withdrawn) return;
    setArming(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setArming(false);
      toggle();
    }, HOLD_MS);
  };

  const cancel = () => {
    setArming(false);
    window.clearTimeout(timer.current);
  };

  return (
    <>
      <span
        className="markable"
        data-marked={mark ? "true" : "false"}
        data-arming={arming ? "true" : "false"}
        data-withdrawn={withdrawn ? "true" : "false"}
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerCancel={cancel}
        onPointerLeave={cancel}
        onContextMenu={(event) => {
          if (canMark) event.preventDefault();
        }}
      >
        {children}
        {withdrawn && <span className="sr-only">（这句话已被撤回）</span>}
      </span>
      {!withdrawn && (
        <button
          type="button"
          className="markable__phi"
          aria-pressed={Boolean(mark)}
          aria-label={mark ? `撤下 ${index + 1} 号句子的相位标记` : `给第 ${index + 1} 号句子加一个相位标记`}
          onClick={toggle}
        >
          {mark ? mark.label : "φ"}
        </button>
      )}
    </>
  );
}
