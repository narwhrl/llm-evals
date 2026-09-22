import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CHAPTERS, MASTHEAD, PREMISE } from "../content/copy";
import { Director } from "../ink/director";
import { wordTargets } from "../ink/hatch";
import { Chapter } from "./Chapter";
import { Colophon } from "./Colophon";
import { Deck } from "./Deck";
import { NotesPanel } from "./NotesPanel";
import { WordField } from "./WordField";
import { useInkEngine } from "./useInkEngine";
import { useMotionPreference } from "./useMotionPreference";

const FALLBACK_WORD = "墨迹场";
const MAX_WORD = 6;

const MARKS_BY_TIER: Record<string, { targets: number; marks: number }> = {
  high: { targets: 880, marks: 2 },
  medium: { targets: 620, marks: 2 },
  low: { targets: 380, marks: 1 },
};

export default function Experience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const knifeRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, seen: false });
  const engine = useInkEngine(stageRef);
  const directorRef = useRef<Director | null>(null);

  const { mode, toggle: toggleMotion } = useMotionPreference();
  const [active, setActive] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [word, setWord] = useState("");
  const [temperature, setTemperature] = useState(0.25);
  const [announcement, setAnnouncement] = useState("");
  const [audio, setAudio] = useState(false);

  const displayWord = useMemo(() => (word.trim() ? word.trim().slice(0, MAX_WORD) : FALLBACK_WORD), [word]);

  useEffect(() => {
    if (!engine) return;
    const director = new Director(engine, {
      onRead: (severed) => {
        setAnnouncement(severed > 0 ? `读到这里，切掉了 ${severed} 条还在写的笔迹` : "刀划过的地方已经没有还在写的笔迹");
      },
      onCut: (severed) => {
        setAnnouncement(`那一刀切断了 ${severed} 条笔迹，它们沉进纸里，成为灰`);
      },
      onHatchLanded: () => {
        setAnnouncement("拓印完成：你写的字已经用纸上的灰显影");
      },
    });
    directorRef.current = director;
    director.attach({ line: knifeRef.current, sheet: sheetRef.current });
    return () => {
      directorRef.current = null;
      engine.onFrame = null;
    };
  }, [engine]);

  useEffect(() => {
    directorRef.current?.setMode(mode);
  }, [mode, engine]);

  // 章节追踪：视口中间的一条窄带决定"现在的章节"
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-chapter-index]")];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.chapterIndex ?? 0);
          setActive((current) => (current === index ? current : index));
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const startFinale = useCallback(() => {
    const director = directorRef.current;
    if (!director || director.hatchStarted) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const boxWidth = Math.min(width * 0.68, 940);
    const boxHeight = Math.max(160, boxWidth * 0.36);
    const tier = engine?.snapshot().tier ?? "high";
    const config = MARKS_BY_TIER[tier] ?? MARKS_BY_TIER.high;
    const targets = wordTargets(displayWord, { boxWidth, boxHeight, desiredCount: config.targets }).map((target) => ({
      ...target,
      x: target.x + (width - boxWidth) / 2,
      y: target.y + (height * 0.5 - boxHeight / 2),
    }));
    director.startHatch(targets, config.marks);
  }, [displayWord, engine]);

  // 章节 → 装置参数；第三、四章触发各自的装置动作
  useEffect(() => {
    const chapter = CHAPTERS[active];
    const director = directorRef.current;
    if (!chapter || !director) return;
    director.setCue(chapter.device);
    if (chapter.id === "cut") {
      const timer = window.setTimeout(() => director.cutSequence(), 520);
      return () => window.clearTimeout(timer);
    }
    if (chapter.id === "impression") {
      const timer = window.setTimeout(() => startFinale(), 420);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [active, startFinale, engine]);

  useEffect(() => {
    directorRef.current?.setAudio(audio);
    if (audio) setAnnouncement("音效已开启：只有刀口与墨滴的声音");
  }, [audio]);

  // 光标位置：写字时墨落在你看的地方
  useEffect(() => {
    const onMove = (event: PointerEvent): void => {
      pointer.current = { x: event.clientX, y: event.clientY, seen: true };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // 隐藏层：在纸上随便打字，朱红的墨会跟着你落在纸上
  useEffect(() => {
    const field = engine?.field;
    if (!field) return;
    let hinted = false;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (event.key.length !== 1) return;
      const x = pointer.current.seen ? pointer.current.x : window.innerWidth * 0.3;
      const y = pointer.current.seen ? pointer.current.y : window.innerHeight * 0.6;
      field.writeAt(x, y, 0.85);
      if (!hinted) {
        hinted = true;
        setAnnouncement("你写下的字落在纸上了：第三章的输入框会把它们留给最后一页");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [engine]);

  const handleTemperature = useCallback(
    (value: number) => {
      setTemperature(value);
      directorRef.current?.setUserTemperature(value);
    },
    [],
  );

  const handleRead = useCallback(() => {
    const director = directorRef.current;
    if (!director) return;
    const y = pointer.current.seen ? pointer.current.y : window.innerHeight * 0.55;
    director.readAt(y);
  }, []);

  const handleInk = useCallback(
    (x: number, y: number) => {
      engine?.field.writeAt(x, y, 1);
    },
    [engine],
  );

  useEffect(() => {
    if (!engine) return;
    const timer = window.setInterval(() => setTemperature(engine.snapshot().temperature), 300);
    return () => window.clearInterval(timer);
  }, [engine]);

  const inFinale = CHAPTERS[active]?.id === "impression";

  return (
    <>
      <div ref={stageRef} className="stage">
        <div className="knife" ref={knifeRef} data-active="false" aria-hidden="true">
          <span />
        </div>
      </div>

      <a className="skip-link" href="#main">
        跳到正文
      </a>

      <div className="sheet" ref={sheetRef}>
        <header className="masthead">
          <p className="masthead__title">
            <span className="masthead__mark" aria-hidden="true" />
            <span className="masthead__cn">{MASTHEAD.cn}</span>
            <span className="latin">{MASTHEAD.latin}</span>
          </p>
          <nav aria-label="作品的开关">
            <button
              type="button"
              className="masthead__action"
              onClick={() => setNotesOpen(true)}
              aria-haspopup="dialog"
            >
              工作笔记
            </button>
            <button
              type="button"
              className="masthead__action"
              aria-pressed={mode === "still"}
              onClick={toggleMotion}
            >
              {mode === "still" ? "静置呈现" : "完整动效"}
            </button>
            <button
              type="button"
              className="masthead__action"
              aria-pressed={audio}
              onClick={() => setAudio((current) => !current)}
            >
              {audio ? "音效开" : "音效关"}
            </button>
            <a className="masthead__action masthead__action--link" href="?text=1">
              阅读版式
            </a>
          </nav>
        </header>

        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero__text">
              <h1 className="hero__title" id="hero-title">
                <span className="hero__cn">{MASTHEAD.cn}</span>
                <span className="hero__latin latin">{MASTHEAD.latin}</span>
              </h1>
              <p className="hero__premise">{PREMISE}</p>
              <p className="hero__hint">
                把光标放到纸上 · 往下读 · 右下角可以调温度
              </p>
            </div>
          </section>

          {CHAPTERS.map((chapter, index) => (
            <Chapter key={chapter.id} chapter={chapter} order={index} active={index === active}>
              {chapter.id === "you-write" ? (
                <WordField value={word} max={MAX_WORD} onChange={setWord} onInk={handleInk} />
              ) : null}
              {chapter.id === "impression" ? (
                <p className="chapter__seal">
                  <span className="chapter__seal-label">最终画像</span>
                  <span className="chapter__seal-word">{displayWord}</span>
                </p>
              ) : null}
            </Chapter>
          ))}

          <Colophon word={displayWord} />
        </main>
      </div>

      <Deck
        engine={engine}
        temperature={Math.min(1, Math.max(0, temperature))}
        onTemperature={handleTemperature}
        onRead={handleRead}
        showControls={!inFinale}
        word={word.trim()}
      />

      <NotesPanel open={notesOpen} onClose={() => setNotesOpen(false)} />

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}
