/**
 * One chapter of the manuscript. The chapter is a three-column page:
 *
 *   [ river gutter ]  [ body ]  [ right margin: marginalia + seals ]
 *
 * The body column carries the paragraphs; the right margin carries notes
 * and seals at deliberate vertical positions. As scroll progresses,
 * marginalia bloom and seals stamp in.
 */

import { useEffect, useRef, useState } from 'react';
import { Chapter as ChapterT } from '../lib/manuscript';
import { Marginalia } from './Marginalia';
import { Seal } from './Seal';

type Props = {
  chapter: ChapterT;
  /** progress 0..1 (page scroll) */
  progress: number;
  /** Report dwell time back up */
  onDwell: (id: string, intensity: number) => void;
  reducedMotion: boolean;
};

const NUMERAL_BY_ID: Record<string, string> = {
  xu: 'I',
  zhu: 'II',
  gai: 'III',
  fu: 'IV',
  ba: 'V',
};

export function Chapter({ chapter, progress, onDwell, reducedMotion }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver for dwell
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setVisible(e.isIntersecting);
        }
      },
      { threshold: [0, 0.3, 0.6] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let last = performance.now();
    let raf = 0;
    let totalMs = 0;
    const tick = (now: number) => {
      totalMs += now - last;
      last = now;
      const intensity = Math.min(1, totalMs / 5000);
      onDwell(chapter.id, intensity);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [visible, chapter.id, onDwell]);

  const marginaliaTriggers = chapter.marginalia.map((m) => {
    const step = (chapter.yEnd - chapter.yStart) / (chapter.paragraphs.length + 1);
    return chapter.yStart + step * (m.paragraph + 1);
  });

  const sealTriggers = chapter.seals.map(
    (s) => chapter.yStart + (chapter.yEnd - chapter.yStart) * s.at,
  );

  const titleRevealed = progress > chapter.yStart + 0.005;

  return (
    <section
      ref={ref}
      className={'chapter chapter--' + chapter.id + (visible ? ' is-visible' : '')}
      id={'chapter-' + chapter.id}
      aria-labelledby={'chapter-title-' + chapter.id}
    >
      <div className="chapter__inner">
        <header className={'chapter__head' + (titleRevealed ? ' is-revealed' : '')}>
          <div className="chapter__numeral">{NUMERAL_BY_ID[chapter.id]}</div>
          <div className="chapter__title-block">
            <h2 className="chapter__title" id={'chapter-title-' + chapter.id}>
              {chapter.title}
            </h2>
            <div className="chapter__subtitle">{chapter.subtitle}</div>
          </div>
          <div className="chapter__rule" />
        </header>

        <div className="chapter__grid">
          <div className="chapter__body">
            {chapter.paragraphs.map((p, i) => {
              const step = (chapter.yEnd - chapter.yStart) / (chapter.paragraphs.length + 1);
              const paraTrigger = chapter.yStart + step * (i + 1);
              const paraRevealed = progress > paraTrigger;
              return (
                <p
                  key={i}
                  className={'chapter__paragraph' + (paraRevealed ? ' is-revealed' : '')}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  {p}
                </p>
              );
            })}

            {/* "below" marginalia live at the bottom of the body column */}
            {chapter.marginalia
              .filter((m) => m.where === 'below')
              .map((m, i) => {
                const idx = chapter.marginalia.findIndex((mm) => mm === m);
                return (
                  <Marginalia
                    key={'mb-' + i}
                    text={m.text}
                    where="below"
                    trigger={marginaliaTriggers[idx] ?? 0.99}
                    progress={progress}
                  />
                );
              })}
          </div>

          <aside className="chapter__margin" aria-hidden="true">
            {/* "right" marginalia stack here */}
            {chapter.marginalia
              .filter((m) => m.where === 'right')
              .map((m, i) => {
                const idx = chapter.marginalia.findIndex((mm) => mm === m);
                return (
                  <Marginalia
                    key={'mr-' + i}
                    text={m.text}
                    where="right"
                    trigger={marginaliaTriggers[idx] ?? 0.99}
                    progress={progress}
                  />
                );
              })}

            {/* Seals in the right column, at deliberate y-positions */}
            {chapter.seals.map((s, i) => (
              <div
                key={'seat-' + i}
                className="chapter__seat"
                style={{
                  alignSelf: s.at < 0.4 ? 'flex-start' : s.at > 0.7 ? 'flex-end' : 'center',
                }}
              >
                <Seal
                  glyph={s.glyph}
                  label={s.label}
                  trigger={sealTriggers[i]}
                  progress={progress}
                  reducedMotion={reducedMotion}
                  tilt={i % 2 === 0 ? -2.2 : 1.8}
                />
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
