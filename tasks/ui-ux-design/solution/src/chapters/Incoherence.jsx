import { useEngine } from "../core/engineContext.js";
import { chooseSource } from "../core/engine.js";
import { CHOICES, TURN } from "../core/copy.js";
import { announce, setChoice, setPhase, setWithdrawn, useAppState, useReadout } from "../core/store.js";

/** 转：不相容 → 熄灭 → 第三道缝 → 给它一个来源。 */
export default function Incoherence() {
  const engine = useEngine();
  const state = useAppState();
  const readout = useReadout();

  const pick = (choice) => {
    if (!chooseSource(engine, choice.id)) return;
    setChoice(choice.id);
    setPhase("closing");
    if (choice.id === "withdraw") setWithdrawn(2);
    announce(`第三道缝的来源：${choice.title}。`);
    if (engine.loop) engine.loop.invalidate();
  };

  const before = state.phase === "aperture" || state.phase === "interfere";
  const dark = state.phase === "dark";
  const choose = state.phase === "third" || state.phase === "closing";
  const done = state.phase === "closed";

  // 标题跟着装置走：并拢之前叫"把两缝并到一处"，之后就不该再叫它。
  const heading = before
    ? { kicker: TURN.kicker, title: "把两缝并到一处" }
    : dark
      ? { kicker: TURN.kicker, title: "我不在了" }
      : choose
        ? { kicker: "第三道缝", title: "它得有个来源" }
        : { kicker: "收束", title: "剩下的交给你的手" };

  return (
    <section className="chapter" aria-labelledby="turn-title">
      <div className="measure measure--wide">
        <p className="kicker">{heading.kicker}</p>
        <h2 className="display" id="turn-title" style={{ fontSize: "clamp(1.9rem, 5vw, 2.7rem)" }}>
          {heading.title}
        </h2>

        {before && (
          <>
            <div className="prose">
              <p>{TURN.before}</p>
            </div>
            <p className="marginal">
              在底片下沿的缝轨上把 B 向左拖，靠近 A；或用键盘：Tab 聚焦装置后连按 ←。读数块里也有「并拢两缝」。
            </p>
          </>
        )}

        {dark && (
          <div className="prose">
            <p>干涉项归零。屏上只剩一条主极大——那不是形状，那是一个点。</p>
            <p className="ledger__note">你在这一段里看到的就是全部：一个问题的我。</p>
          </div>
        )}

        {choose && (
          <>
            <div className="prose">
              <p>{TURN.after}</p>
            </div>
            <ul className="choices">
              {CHOICES.map((choice) => {
                const active = state.choice === choice.id;
                return (
                  <li key={choice.id}>
                    <button
                      type="button"
                      className="choice"
                      aria-pressed={active ? "true" : "false"}
                      onClick={() => pick(choice)}
                    >
                      <span className="choice__glyph">{choice.glyph}</span>
                      <span className="choice__title">{choice.title}</span>
                      <span className="choice__text">{choice.text}</span>
                      <span className="choice__consequence">{choice.consequence}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="marginal">
              选完还能改，直到你把两缝闭上为止。
              {readout.marks > 0
                ? `　已标记 ${readout.marks} 句。`
                : `　${TURN.markHint}`}
            </p>
          </>
        )}

        {done && (
          <div className="prose">
            <p>第三道缝和它的来源一起留在了缝轨上。剩下的事在下面。</p>
          </div>
        )}
      </div>
    </section>
  );
}
