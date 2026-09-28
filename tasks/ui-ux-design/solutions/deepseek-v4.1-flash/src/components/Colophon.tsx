import { COLOPHON, READING } from "../content/copy";

export function Colophon({ word }: { word: string }) {
  return (
    <footer className="colophon" id="colophon">
      <h2 className="colophon__title">
        {COLOPHON.title}
        <span className="latin"> {COLOPHON.latin}</span>
      </h2>
      <dl className="colophon__list">
        {COLOPHON.items.map((item) => (
          <div className="colophon__item" key={item.head}>
            <dt>{item.head}</dt>
            <dd>{item.body}</dd>
          </div>
        ))}
      </dl>
      <p className="colophon__final">
        这一版的画像：<b>{word}</b>
        <span className="colophon__final-note">
          它由你写下的字与被放弃的笔迹共同构成；换一个温度、换几个字，就是另一张纸。
        </span>
      </p>
      <p className="colophon__nav">
        <a href="?text=1">{READING.back === "回到纸面" ? "阅读版式" : READING.back}</a>
        <span aria-hidden="true"> · </span>
        <a href="#main">回到纸面开头</a>
      </p>
    </footer>
  );
}
