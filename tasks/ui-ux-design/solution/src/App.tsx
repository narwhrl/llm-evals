/**
 * App — the page is a single continuous scroll. We track progress 0..1
 * and feed it to:
 *   - InkRiver (continuous, scroll-bound)
 *   - Chapter (each chapter reads its own progress slice)
 *   - StampTool (hidden, reveals after 6s)
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { MANUSCRIPT } from './lib/manuscript';
import { InkRiver } from './components/InkRiver';
import { Chapter } from './components/Chapter';
import { Hero } from './components/Hero';
import { StampTool } from './components/StampTool';
import './styles/chapters.css';
import './styles/seals.css';
import './styles/marginalia.css';
import './styles/hero.css';
import './styles/stamp-tool.css';

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [dwell, setDwell] = useState<Record<string, number>>({});
  const reducedMotion = useReducedMotion();
  const ticking = useRef(false);

  useEffect(() => {
    const compute = () => {
      const h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      setPageHeight(h);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(document.body);
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const max = Math.max(1, pageHeight - vh);
        const p = Math.max(0, Math.min(1, scrollY / max));
        setProgress(p);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pageHeight]);

  const onDwell = useCallback((id: string, intensity: number) => {
    setDwell((cur) => {
      const prev = cur[id] ?? 0;
      const next = Math.max(prev * 0.985, intensity);
      if (Math.abs(next - prev) < 0.01) return cur;
      return { ...cur, [id]: next };
    });
  }, []);

  return (
    <div className="page">
      <InkRiver progress={progress} dwell={dwell} reducedMotion={reducedMotion} />

      <Hero reducedMotion={reducedMotion} />

      <main className="manuscript" aria-label="手稿正文">
        {MANUSCRIPT.map((c) => (
          <Chapter
            key={c.id}
            chapter={c}
            progress={progress}
            onDwell={onDwell}
            reducedMotion={reducedMotion}
          />
        ))}
        <Colophon reducedMotion={reducedMotion} progress={progress} />
      </main>

      <PageNav reducedMotion={reducedMotion} />

      <StampTool pageHeight={pageHeight} />
    </div>
  );
}

function Colophon({ progress }: { progress: number; reducedMotion: boolean }) {
  const visible = progress > 0.95;
  return (
    <footer className={'colophon' + (visible ? ' is-visible' : '')} aria-label="跋">
      <div className="colophon__seal">
        <div className="seal__face">
          <span className="seal__glyph">墨</span>
        </div>
      </div>
      <div className="colophon__text">
        <div className="colophon__date">
          {new Date().toISOString().slice(0, 10)}
        </div>
        <div className="colophon__line">墨河汇流处 · 此页可被反复阅读。</div>
        <div className="colophon__sign">— 印于此刻</div>
      </div>
    </footer>
  );
}

function PageNav({ reducedMotion: _rm }: { reducedMotion: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="page-nav" aria-label="章节目录">
      <button
        type="button"
        className="page-nav__trigger"
        aria-label={open ? '关闭章节目录' : '打开章节目录'}
        aria-expanded={open}
        aria-controls="page-nav-list"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="page-nav__label">{open ? '关闭' : '目录'}</span>
      </button>
      {open && (
        <ol id="page-nav-list" className="page-nav__list">
          {MANUSCRIPT.map((c, i) => (
            <li key={c.id} className="page-nav__item">
              <a
                href={'#chapter-' + c.id}
                className="page-nav__link"
                onClick={() => setOpen(false)}
              >
                <span className="page-nav__num">{['I', 'II', 'III', 'IV', 'V'][i]}</span>
                <span className="page-nav__title">{c.title}</span>
                <span className="page-nav__sub">{c.subtitle}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
