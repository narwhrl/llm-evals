import { CHAPTERS, COLOPHON, MASTHEAD, NOTES, PREMISE, READING } from "../content/copy";

/** 纯文字版式：同一件作品不被看见也能读。 */
export default function ReadingView() {
  return (
    <div className="reading">
      <header className="reading__head">
        <p className="masthead__title">
          <span className="masthead__mark" aria-hidden="true" />
          <span className="masthead__cn">{MASTHEAD.cn}</span>
          <span className="latin">{MASTHEAD.latin}</span>
        </p>
        <a className="reading__back" href="./">
          {READING.back}
        </a>
      </header>

      <h1 className="reading__title">{MASTHEAD.tagline}</h1>
      <p className="reading__premise">{PREMISE}</p>
      <p className="reading__intro">{READING.intro}</p>

      <ol className="reading__chapters">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.id} className="reading__chapter">
            <p className="chapter__index">
              <span>{chapter.index}</span>
              <span aria-hidden="true"> · </span>
              <span className="latin">{chapter.latin}</span>
            </p>
            <h2>{chapter.title}</h2>
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 12)}>{paragraph}</p>
            ))}
            <p className="reading__aside">{chapter.aside.join(" ")}</p>
          </li>
        ))}
      </ol>

      <section className="reading__notes" aria-labelledby="reading-notes-title">
        <h2 id="reading-notes-title">工作笔记</h2>
        <dl>
          {NOTES.map((note) => (
            <div key={note.head}>
              <dt>{note.head}</dt>
              <dd>{note.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="reading__colophon" aria-labelledby="reading-colophon-title">
        <h2 id="reading-colophon-title">{COLOPHON.title}</h2>
        <dl>
          {COLOPHON.items.map((item) => (
            <div key={item.head}>
              <dt>{item.head}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
        <p className="reading__final">
          纸面版式里，最后一张画像由你亲手写下的字决定；这一页只保留它的说明。
        </p>
      </section>
    </div>
  );
}
