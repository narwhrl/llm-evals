import { useEngine } from "../core/engineContext.js";
import {
  resetEngine,
  setDistanceTarget,
  setSeparationTarget,
  setWavelength,
} from "../core/engine.js";
import { A11Y } from "../core/copy.js";
import { announce, resetStore, useAppState, useReadout } from "../core/store.js";

const NUMBER = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 });

/** 读数块。数值是给眼睛看的等宽数字，也是给辅助技术念的文本。 */
export default function Bench() {
  const engine = useEngine();
  const readout = useReadout();
  const state = useAppState();

  const refresh = () => {
    if (engine.loop) engine.loop.invalidate();
  };

  const nudgeWavelength = (direction) => {
    setWavelength(engine, engine.wavelength + direction * 0.2);
    announce(`波长 ${Math.round(engine.wavelength * 190)} 纳米。`);
    refresh();
  };

  const onKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === " " || event.key === "Enter") {
      if (state.phase === "closing" || state.phase === "closed") {
        event.preventDefault();
        closeDown();
      }
      return;
    }
    if (event.key === "0") {
      event.preventDefault();
      doReset();
      return;
    }
    const step = event.shiftKey ? 60 : 20;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setSeparationTarget(engine, engine.separationTarget + step);
      announce(`缝距 ${(engine.separationTarget * 0.01).toFixed(2)} 毫米。`);
      refresh();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setSeparationTarget(engine, engine.separationTarget - step);
      announce(`缝距 ${(Math.max(0, engine.separationTarget) * 0.01).toFixed(2)} 毫米。`);
      refresh();
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const delta = event.key === "PageUp" ? 260 : -260;
      setDistanceTarget(engine, engine.distanceTarget + delta);
      announce(`光程 ${(engine.distanceTarget * 0.001).toFixed(2)} 米。`);
      refresh();
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      nudgeWavelength(1);
    } else if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      nudgeWavelength(-1);
    } else if (event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  const closeDown = () => {
    setSeparationTarget(engine, 0);
    announce("正在闭合两缝。");
    refresh();
  };

  const doReset = () => {
    resetEngine(engine);
    resetStore();
    announce("装置已复位，回到单缝。");
    refresh();
  };

  const darkness = readout.darkness > 0.5;
  const showClose = state.phase === "closing" || state.phase === "closed";
  const showTryDark = state.phase === "interfere" && !state.hintSeen;

  return (
    <div
      className="bench"
      role="group"
      aria-label={A11Y.keyboard}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <dl className="bench__readings">
        <div className="reading">
          <dt className="reading__label">缝距 d</dt>
          <dd className="reading__value" data-alert={readout.band !== "清晰"}>
            {NUMBER.format(readout.separation * 0.01)} mm
          </dd>
        </div>
        <div className="reading">
          <dt className="reading__label">光程 L</dt>
          <dd className="reading__value">{NUMBER.format(readout.distance * 0.001)} m</dd>
        </div>
        <div className="reading">
          <dt className="reading__label">波长 λ</dt>
          <dd className="reading__value">{Math.round(readout.wavelength * 190)} nm</dd>
        </div>
        <div className="reading">
          <dt className="reading__label">可见度 V</dt>
          <dd className="reading__value">{readout.visibility.toFixed(2)}</dd>
        </div>
        <div className="reading">
          <dt className="reading__label">屏上条纹</dt>
          <dd className="reading__value" data-alert={readout.fringes < 6}>
            {Math.max(0, Math.round(readout.fringes))}
          </dd>
        </div>
        <div className="reading">
          <dt className="reading__label">相干</dt>
          <dd className="reading__value" data-alert={readout.band !== "清晰"}>
            {darkness ? "—" : readout.band}
          </dd>
        </div>
        <div className="reading reading--optional">
          <dt className="reading__label">相位标记</dt>
          <dd className="reading__value" data-alert={readout.cancelling}>
            {readout.marks}
            {readout.cancelling ? " · 抵消第三缝" : ""}
          </dd>
        </div>
        <div className="reading reading--optional">
          <dt className="reading__label">帧</dt>
          <dd className="reading__value">{readout.fps}</dd>
        </div>
      </dl>

      <div className="bench__actions">
        <button type="button" className="instrument-button" data-action="wavelength-down" onClick={() => nudgeWavelength(-1)}>
          − λ
        </button>
        <button type="button" className="instrument-button" data-action="wavelength-up" onClick={() => nudgeWavelength(1)}>
          + λ
        </button>
        {showTryDark && (
          <button
            type="button"
            className="instrument-button"
            data-action="collapse"
            onClick={() => {
              setSeparationTarget(engine, 4);
              announce("正在并拢两缝。");
              refresh();
            }}
          >
            {A11Y.controls.tryDark}
          </button>
        )}
        <button
          type="button"
          className="instrument-button"
          data-action="close"
          data-primary="true"
          hidden={!showClose}
          onClick={closeDown}
        >
          {A11Y.controls.close}
        </button>
        <button
          type="button"
          className="instrument-button"
          data-action="reset"
          onClick={doReset}
        >
          {A11Y.controls.reset}
        </button>
      </div>
    </div>
  );
}
