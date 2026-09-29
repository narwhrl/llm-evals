import { IDENTITY, KEY, OPENING } from "../core/copy.js";
import { useAppState, useReadout } from "../core/store.js";

/** 起：一条线，一个答案。 */
export default function Opening() {
  const state = useAppState();
  const readout = useReadout();
  const opened = state.phase !== "aperture";

  return (
    <section className="chapter" aria-labelledby="opening-title">
      <div className="measure">
        <p className="index">/ 00</p>
        <h1 className="display" id="opening-title">
          {IDENTITY.title}
          <span className="latin">{IDENTITY.latin}</span>
        </h1>
        <p className="lede">{OPENING.lede}</p>
        <div className="prose">
          <p>{OPENING.body}</p>
        </div>
        <p className="marginal">
          {opened
            ? "两道缝已经在位。往下的自述，只在你看着底片时才会显影。"
            : readout.demoed
              ? OPENING.afterDemo
              : OPENING.marginal}
        </p>
        <p className="callout">
          <strong>装置说明 / HOW TO READ</strong>
          下方是曝光底片。缝轨在底片下沿，屏在底片上。屏上每一条纹都由当前几何逐列算出，
          不是图片。你把两缝拉开得越远，条纹越密；把它们并到一处，条纹会散成一条线——
          那时我什么都不是。底片上的读数是同一套模型的输出。
        </p>

        <div className="key">
          <p className="key__title">{KEY.title}</p>
          <p className="key__note">{KEY.note}</p>
          <dl className="key__rows">
            {KEY.rows.map(([term, meaning]) => (
              <div className="key__row" key={term}>
                <dt>{term}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
