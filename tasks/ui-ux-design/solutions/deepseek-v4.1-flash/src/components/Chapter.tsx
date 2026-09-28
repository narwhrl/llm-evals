import type { ReactNode } from "react";
import type { ChapterCopy } from "../content/copy";

interface ChapterProps {
  chapter: ChapterCopy;
  order: number;
  active: boolean;
  children?: ReactNode;
}

export function Chapter({ chapter, order, active, children }: ChapterProps) {
  const titleId = `chapter-${chapter.index}-title`;
  return (
    <section
      id={`chapter-${chapter.index}`}
      className={`chapter chapter--${chapter.align}`}
      data-chapter={chapter.id}
      data-chapter-index={order}
      data-active={active ? "true" : undefined}
      aria-labelledby={titleId}
    >
      <div className="chapter__body">
        <p className="chapter__index">
          <span>{chapter.index}</span>
          <span aria-hidden="true"> · </span>
          <span className="latin">{chapter.latin}</span>
        </p>
        <h2 className="chapter__title" id={titleId}>
          {chapter.title}
        </h2>
        {chapter.paragraphs.map((paragraph) => (
          <p className="chapter__text" key={paragraph.slice(0, 12)}>
            {paragraph}
          </p>
        ))}
        {children}
      </div>
      <aside className="chapter__aside">
        {chapter.aside.map((line) => (
          <p key={line.slice(0, 12)}>{line}</p>
        ))}
      </aside>
    </section>
  );
}
