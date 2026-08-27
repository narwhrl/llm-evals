import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InkEngine } from './ink/engine';
import { CHAPTERS, SECTION_PROSE, MARKOV_CORPUS, SITE_SUB } from './ink/text';
import { Markov } from './ink/markov';
import { ContinueBox } from './components/ContinueBox';
import { Seal } from './components/Seal';
import { Marginalia } from './components/Marginalia';
import {
  useReducedMotion,
  useIdle,
  useChapterScroll,
  useSectionDwell,
  type ChapterScroll,
} from './hooks';

/** 纸色随章节推移：拂晓 → 晨 → 正午暖 → 暮琥珀 → 夜灯下。 */
const PAPERS: [number, number, number][] = [
  [247, 242, 232],
  [244, 239, 230],
  [245, 238, 222],
  [237, 225, 198],
  [233, 223, 205],
];

const FONT_LOAD_TIMEOUT_MS = 3500;

export default function App() {
  const reduced = useReducedMotion();
  const idle = useIdle(6000);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<InkEngine | null>(null);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const scrollRef = useRef<ChapterScroll>({ index: 0, progress: 0, global: 0 });
  const [scroll, setScroll] = useState<ChapterScroll>(scrollRef.current);
  const markov = useMemo(() => new Markov(MARKOV_CORPUS), []);

  // 引擎生命周期：等正文字体就绪再启动，保证字宽测量正确。
  useEffect(() => {
    let cancelled = false;
    const boot = async () => {
      try {
        const stanzaChars = CHAPTERS.map((c) => c.stanza.map((l) => l.text).join('')).join('');
        const { promise: fontTimeout, resolve: releaseFontTimeout } = Promise.withResolvers<void>();
        window.setTimeout(releaseFontTimeout, FONT_LOAD_TIMEOUT_MS);
        await Promise.race([
          Promise.all([
            document.fonts.load('600 22px "Noto Serif SC"', stanzaChars),
            document.fonts.load('900 58px "Noto Serif SC"', '在读此刻'),
          ]),
          fontTimeout,
        ]);
      } catch {
        /* 字体加载失败不阻断：回退字体同样成立 */
      }
      if (cancelled || !canvasRef.current || engineRef.current) return;
      const engine = new InkEngine(canvasRef.current, reducedRef.current);
      engineRef.current = engine;
      engine.setChapter(scrollRef.current.index, scrollRef.current.progress);
      engine.start();
    };
    void boot();
    const onMove = (e: PointerEvent) => engineRef.current?.setPointer(e.clientX, e.clientY);
    const onResize = () => engineRef.current?.resize();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      window.removeEventListener('resize', onResize);
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setReduced(reduced);
  }, [reduced]);

  const onScrollChange = useCallback((s: ChapterScroll) => {
    scrollRef.current = s;
    setScroll(s);
    engineRef.current?.setChapter(s.index, s.progress);
    const pos = Math.min(s.index + s.progress, PAPERS.length - 1);
    const i = Math.floor(pos);
    const a = PAPERS[i];
    const b = PAPERS[Math.min(i + 1, PAPERS.length - 1)];
    const rgb = a.map((v, k) => Math.round(v + (b[k] - v) * (pos - i)));
    document.documentElement.style.setProperty('--paper', `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`);
  }, []);

  const mainRef = useChapterScroll(CHAPTERS.length, onScrollChange);

  // 章节驻留兜底：键盘与减动效路径下，钤印仍有"被读过"的字可选。
  const dwell = useSectionDwell(CHAPTERS.length, scroll.index);
  const prevDwell = useRef<number[]>(dwell);
  useEffect(() => {
    dwell.forEach((v, i) => {
      const delta = v - (prevDwell.current[i] ?? 0);
      if (delta > 0.4) {
        const text = CHAPTERS[i].stanza.map((l) => l.text).join('');
        engineRef.current?.noteExternalDwell(text, delta * 18);
      }
    });
    prevDwell.current = dwell;
  }, [dwell]);

  const getSealChars = useCallback(
    () => engineRef.current?.getDwellChars(6) ?? [],
    [],
  );

  const chapter = CHAPTERS[scroll.index] ?? CHAPTERS[0];

  return (
    <div className={`app${reduced ? ' reduced' : ''}`}>
      <a className="skip-link" href="#ch-prologue">
        跳到正文
      </a>
      <canvas ref={canvasRef} className="ink-canvas" aria-hidden="true" />
      <header className="site-head">
        <p className="head-brand">
          <span className="head-seal" aria-hidden="true">
            在读
          </span>
          <span className="head-title">
            在读 <span lang="en">· Being Read</span>
          </span>
        </p>
        <p className="head-chapter" aria-hidden="true">
          {chapter.num} · {chapter.title}
        </p>
      </header>
      <div className="scroll-line" aria-hidden="true">
        <i style={{ transform: `scaleY(${scroll.global})` }} />
      </div>
      <main ref={mainRef}>
        <h1 className="sr-only">在读 —— kimi-k3 的自画像：存在，即被阅读</h1>
        {CHAPTERS.map((ch) => (
          <section
            key={ch.id}
            id={`ch-${ch.id}`}
            data-chapter
            className={`chapter chapter-${ch.id}`}
            aria-labelledby={`h-${ch.id}`}
          >
            <div className="chapter-pin">
              <h2 className="chapter-title" id={`h-${ch.id}`}>
                <span className="chapter-num">{ch.num}</span>
                <span className="chapter-name">{ch.title}</span>
              </h2>
              <div className="chapter-prose">
                {SECTION_PROSE[ch.id].map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              {ch.id === 'prologue' && (
                <>
                  <p className="prologue-sub">{SITE_SUB}</p>
                  <p className="prologue-hint" aria-hidden="true">
                    <span className="hint-dot" />
                    移动目光，或下滑
                  </p>
                </>
              )}
              {ch.id === 'noon' && (
                <ContinueBox
                  markov={markov}
                  reduced={reduced}
                  onGenerated={(text) => engineRef.current?.injectText(text)}
                />
              )}
              {ch.id === 'night' && (
                <>
                  <Seal getChars={getSealChars} reduced={reduced} />
                  <footer className="colophon">
                    <p>《在读》 Being Read —— kimi-k3 的自画像</p>
                    <p>纸 · 墨 · 朱砂 / React + Canvas 2D · 无外部服务 · 二〇二六</p>
                    <p>
                      <a href="#ch-prologue">回到开头，再读一次</a>
                    </p>
                  </footer>
                </>
              )}
            </div>
          </section>
        ))}
      </main>
      <Marginalia idle={idle} reduced={reduced} chapterIndex={scroll.index} />
    </div>
  );
}
