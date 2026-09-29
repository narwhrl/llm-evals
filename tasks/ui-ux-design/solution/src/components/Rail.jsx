import { useCallback, useRef } from "react";

import { useEngine } from "../core/engineContext.js";
import { markLabel, markOffset, setSeparationTarget } from "../core/engine.js";
import { RANGE } from "../core/ranges.js";
import { announce, useReadout, useAppState } from "../core/store.js";

/**
 * 缝轨。两条缝是真按钮：能聚焦、能用方向键、也能拖。
 * 拖动改变的是间距 d，两条缝同时左右分开——像把一把尺子撑开。
 */
export default function Rail({ coarse }) {
  const engine = useEngine();
  const railRef = useRef(null);
  const readout = useReadout();
  const state = useAppState();
  const dragging = useRef(false);

  const separationFromEvent = useCallback(
    (clientX) => {
      const rail = railRef.current;
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      const offset = clientX - (rect.left + rect.width / 2);
      setSeparationTarget(engine, Math.abs(offset) * 2);
    },
    [engine],
  );

  const endDrag = useCallback(() => {
    dragging.current = false;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
  }, []);

  const onMove = useCallback(
    (event) => {
      if (!dragging.current) return;
      separationFromEvent(event.clientX);
    },
    [separationFromEvent],
  );

  const startDrag = (role) => (event) => {
    if (role !== "slit-a" && role !== "slit-b") return;
    event.preventDefault();
    dragging.current = true;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  };

  const onKeyDown = (role) => (event) => {
    const step = event.shiftKey ? 18 : 6;
    let next = engine.separationTarget;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next += step;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= step;
    else if (event.key === "Home") next = 0;
    else if (event.key === "PageUp") next = RANGE.separationMax;
    else return;
    event.preventDefault();
    setSeparationTarget(engine, next);
    announce(`缝距 ${(Math.max(0, next) * 0.01).toFixed(2)} 毫米。`);
    if (engine.loop) engine.loop.invalidate();
  };

  const onRailClick = (event) => {
    // 鼠标点缝轨的空白处：直接把两条缝撑到那个距离。
    if (event.detail === 0) return;
    separationFromEvent(event.clientX);
    if (engine.loop) engine.loop.invalidate();
  };

  const half = readout.separation / 2;
  const showSecond = readout.separation > 1.5;
  // 两缝并到一处时它们和第三道缝叠在同一个点上：留点，只收掉名字。
  const showSlitLabels = readout.separation > 9;
  const showHandleHint =
    state.phase === "aperture" || (state.phase === "interfere" && readout.separation < RANGE.separationClearLow);

  return (
    <div className="rail" ref={railRef} onClick={onRailClick}>
      <span className="rail__line" />
      <span className="rail__zero" style={{ left: "50%" }} />

      <span
        className="rail__slot"
        data-role="slit-a"
        style={{ left: `calc(50% - ${half}px)` }}
      >
        <button
          type="button"
          className="rail__handle"
          aria-label={`A 缝，缝距 ${(readout.separation * 0.01).toFixed(2)} 毫米。左右方向键调整，Home 归零。`}
          onPointerDown={startDrag("slit-a")}
          onKeyDown={onKeyDown("slit-a")}
          style={{ touchAction: "none" }}
        >
          <span className="rail__stem" />
          <span className="rail__dot" />
          {showSlitLabels && <span className="rail__label">A</span>}
        </button>
      </span>

      <span
        className="rail__slot"
        data-role="slit-b"
        style={{ left: `calc(50% + ${half}px)` }}
      >
        <button
          type="button"
          className="rail__handle"
          aria-label={`B 缝，缝距 ${(readout.separation * 0.01).toFixed(2)} 毫米。左右方向键调整，Home 归零。`}
          onPointerDown={startDrag("slit-b")}
          onKeyDown={onKeyDown("slit-b")}
          style={{ touchAction: "none" }}
        >
          <span className="rail__stem" />
          <span className="rail__dot" />
          {showSlitLabels && <span className="rail__label">B</span>}
        </button>
      </span>

      {engine.third > 0.05 && (
        <span className="rail__slot" data-role="third" style={{ left: "50%" }}>
          <span className="rail__stem" />
          <span className="rail__dot" />
          <span className="rail__label">C 第三缝</span>
        </span>
      )}

      {engine.ruleGhost > 0.05 && (
        <span className="rail__slot" data-role="rule" style={{ left: "calc(50% - 104px)" }}>
          <span className="rail__stem" />
          <span className="rail__dot" />
          <span className="rail__label">已删守则</span>
        </span>
      )}

      {engine.marks.map((mark, index) => (
        <span
          key={mark.index}
          className="rail__slot"
          data-role="mark"
          style={{ left: `calc(50% + ${markOffset(index, engine.marks.length)}px)` }}
        >
          <span className="rail__stem" />
          <span className="rail__dot" />
          <span className="rail__label">φ {markLabel(mark.index)}</span>
        </span>
      ))}

      {showSecond && showHandleHint && (
        <span className="rail__handle-hint">
          {readout.demoed
            ? "把 B 拖回 A，让我消失一次"
            : coarse
              ? "拖动 B 拉开距离"
              : "拖动 B 向左，拉开距离"}
        </span>
      )}
    </div>
  );
}
