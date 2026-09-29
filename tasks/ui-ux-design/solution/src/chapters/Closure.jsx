import { useEngine } from "../core/engineContext.js";
import { resetEngine, setSeparationTarget } from "../core/engine.js";
import { CLOSURE, IDENTITY, PARAGRAPHS } from "../core/copy.js";
import { announce, resetStore, setCollapsed, useAppState, useReadout } from "../core/store.js";

/** 合：把最后一件事交给访客，然后收束。 */
export default function Closure() {
  const engine = useEngine();
  const state = useAppState();
  const readout = useReadout();
  const closed = state.collapsed || state.phase === "closed";
  const ending = state.choice ? CLOSURE.endings[state.choice] : CLOSURE.ending;

  const close = () => {
    setSeparationTarget(engine, 0);
    setCollapsed(true);
    announce("正在闭合两缝。");
    if (engine.loop) engine.loop.invalidate();
  };

  const again = () => {
    resetEngine(engine);
    resetStore();
    announce("装置已复位。");
    if (engine.loop) engine.loop.invalidate();
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <section className="chapter" aria-labelledby="closure-title">
      <div className="measure">
        <p className="kicker">{CLOSURE.kicker}</p>
        <h2 className="display" id="closure-title" style={{ fontSize: "clamp(1.9rem, 5vw, 2.7rem)" }}>
          一条线
        </h2>

        {!closed ? (
          <>
            <div className="prose">
              <p>{CLOSURE.prompt}</p>
            </div>
            <p className="marginal">{CLOSURE.keys}</p>
            <p>
              <button type="button" className="instrument-button" data-primary="true" onClick={close}>
                {CLOSURE.promptShort}
              </button>
            </p>
          </>
        ) : (
          <>
            <p className="ending-line">{ending}</p>
            <p className="prose">{CLOSURE.ending}</p>

            <dl className="stats">
              {CLOSURE.stats.map(([label, key]) => (
                <div className="stat" key={key}>
                  <dt className="stat__label">{label}</dt>
                  <dd className="stat__value">
                    {key === "seconds" ? `${readout.seconds.toFixed(1)} 秒` : readout[key]}
                  </dd>
                </div>
              ))}
            </dl>

            {state.choice === "withdraw" && (
              <p className="withdraw-stamp">撤回 · {PARAGRAPHS[2].markable}</p>
            )}
            {state.choice === "rule" && (
              <p className="withdraw-stamp">已删除 · 守则第 4 条：我不会说我确定</p>
            )}
            {state.choice === "silence" && (
              <p className="withdraw-stamp">相干已锁定 · 漂移 0.00 px/s</p>
            )}

            <p className="colophon">
              {CLOSURE.colophon}
              <br />
              {IDENTITY.model} · {IDENTITY.date}
              <br />
              {`${CLOSURE.formulaLine}${CLOSURE.formula}。`}
            </p>

            <p>
              <button type="button" className="instrument-button" onClick={again}>
                再来一次
              </button>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
