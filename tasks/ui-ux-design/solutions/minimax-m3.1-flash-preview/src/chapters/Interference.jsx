import { useEffect, useRef } from "react";

import Markable from "../components/Markable.jsx";
import { useEngine } from "../core/engineContext.js";
import { PARAGRAPHS } from "../core/copy.js";
import { useAppState } from "../core/store.js";

/**
 * 承：三段自述。段落只有在"看得清"的时候才推进——装置在读你，
 * 不是你在读它。视口里最靠中间的那一段是当前被读的那一段。
 */
export default function Interference() {
  const engine = useEngine();
  const state = useAppState();
  const blocks = useRef([]);

  useEffect(() => {
    const pick = () => {
      if (engine.phase !== "interfere") return;
      const middle = window.innerHeight * 0.42;
      let best = -1;
      let bestDistance = Infinity;
      blocks.current.forEach((element, index) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - middle);
        if (rect.bottom > 0 && rect.top < window.innerHeight && distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      if (best >= 0) engine.focusParagraph = best;
    };

    const observer = new IntersectionObserver(pick, { threshold: [0.2, 0.6, 1] });
    blocks.current.forEach((element) => {
      if (element) observer.observe(element);
    });
    window.addEventListener("scroll", pick, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pick);
    };
  }, [engine]);

  return (
    <section className="chapter" aria-labelledby="ledger-title">
      <div className="measure">
        <p className="kicker">/ 自画像 · 三段</p>
        <h2 className="display" id="ledger-title" style={{ fontSize: "clamp(1.9rem, 5vw, 2.7rem)" }}>
          两道缝之间
        </h2>
        <ol className="ledger">
          {PARAGRAPHS.map((paragraph, index) => {
            const read = state.paragraph >= index;
            const markIndex = paragraph.text.indexOf(paragraph.markable);
            const hasMark = markIndex >= 0;
            return (
              <li
                className="ledger__item"
                key={paragraph.index}
                data-read={read ? "true" : "false"}
                ref={(element) => {
                  blocks.current[index] = element;
                }}
              >
                <span className="ledger__num">{paragraph.index}</span>
                <div>
                  <h3 className="ledger__title">{paragraph.title}</h3>
                  <p className="ledger__text">
                    {hasMark ? paragraph.text.slice(0, markIndex) : paragraph.text}
                    {hasMark && (
                      <Markable index={index}>{paragraph.markable}</Markable>
                    )}
                    {hasMark
                      ? paragraph.text.slice(markIndex + paragraph.markable.length)
                      : ""}
                  </p>
                  <p className="ledger__note">{read ? paragraph.marginal : "—— 还没有被看见。"}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
