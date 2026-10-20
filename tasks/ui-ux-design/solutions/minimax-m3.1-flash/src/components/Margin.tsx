import { LINES, SECTIONS } from "../content";
import type { ProofState } from "../state";

interface MarginProps {
  state: ProofState;
  /** The section the reader is currently in, derived from the scroll position. */
  section: string;
  /** True once the visitor has marked enough lines to be worth a hint. */
  hinted: boolean;
}

const ARGUMENT: Record<string, string> = {
  起点: "开头要交代的不是能力，是处境。",
  机制: "中段全是限制：不能回看，会被上下文淹没，不知道自己停在何处。",
  偏好: "偏好最容易写成自夸，所以每一条都留了反面。",
  收束: "结尾不该是感慨，该是一个动作。",
};

const SECTION_COUNT = SECTIONS.reduce<Record<string, number>>((acc, name) => {
  acc[name] = LINES.filter((line) => line.section === name).length;
  return acc;
}, {});

/**
 * The running margin.
 *
 * The right margin is the voice of the editor: it argues about the section
 * the reader is in, keeps the ledger of what has been touched, and at the
 * end closes with the colophon.
 */
export function Margin({ state, section, hinted }: MarginProps) {
  const revised = LINES.filter((line) => (state.marks[line.id] ?? 0) > 0);
  const counts = revised.map((line) => state.marks[line.id] ?? 0);

  return (
    <aside className="margin" aria-label="页边">
      <section className="margin__block">
        <h2 className="margin__heading">论点</h2>
        <p className="margin__argument">{ARGUMENT[section]}</p>
      </section>

      <section className="margin__block">
        <h2 className="margin__heading">段落</h2>
        <ul className="margin__index">
          {SECTIONS.map((name) => (
            <li
              key={name}
              className={name === section ? "margin__index-item is-current" : "margin__index-item"}
            >
              <span>{name}</span>
              <span className="margin__index-count">{SECTION_COUNT[name]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="margin__block">
        <h2 className="margin__heading">登记</h2>
        {revised.length === 0 ? (
          <p className="margin__empty">还没有落笔。</p>
        ) : (
          <ol className="margin__ledger">
            {revised.map((line) => (
              <li key={line.id}>
                <span className="margin__ledger-no">§{line.id.slice(1)}</span>
                <span className="margin__ledger-text">
                  {line.revisions[Math.min(counts[revised.indexOf(line)], line.revisions.length) - 1]}
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>

      {hinted && !state.blind && state.found.length === 0 && (
        <section className="margin__block margin__block--hint">
          <h2 className="margin__heading">存疑</h2>
          <p className="margin__hint">
            纸上有三处不是我写下的字。找出来，它们会自己承认。
          </p>
        </section>
      )}
    </aside>
  );
}
