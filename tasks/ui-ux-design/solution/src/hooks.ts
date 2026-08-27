import { useEffect, useRef, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** 静止 ms 毫秒后为 true；任何指针/键盘/滚动活动复位。 */
export function useIdle(ms: number): boolean {
  const [idle, setIdle] = useState(false);
  const timer = useRef(0);
  useEffect(() => {
    const reset = () => {
      setIdle(false);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setIdle(true), ms);
    };
    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    for (const e of events) window.addEventListener(e, reset, { passive: true });
    reset();
    return () => {
      for (const e of events) window.removeEventListener(e, reset);
      window.clearTimeout(timer.current);
    };
  }, [ms]);
  return idle;
}

export interface ChapterScroll {
  index: number;
  /** 当前章节内部进度 0..1。 */
  progress: number;
  /** 整页进度 0..1（供纸色与进度线）。 */
  global: number;
}

/**
 * 以"章节占据视口中部"为准的滚动追踪。
 * 返回 ref 回调挂到 <main>，sections 用 data-chapter 标记。
 */
export function useChapterScroll(
  sectionCount: number,
  onChange: (s: ChapterScroll) => void,
): (node: HTMLElement | null) => void {
  const cb = useRef(onChange);
  cb.current = onChange;
  const state = useRef<ChapterScroll>({ index: 0, progress: 0, global: 0 });
  const raf = useRef(0);
  const sections = useRef<HTMLElement[]>([]);

  const measure = () => {
    raf.current = 0;
    const secs = sections.current;
    if (secs.length === 0) return;
    const mid = window.innerHeight * 0.5;
    let index = 0;
    let progress = 0;
    for (let i = 0; i < secs.length; i++) {
      const r = secs[i].getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        index = i;
        progress = (mid - r.top) / r.height;
        break;
      }
      if (r.top > mid) break;
      index = i;
      progress = 1;
    }
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const global = max > 0 ? window.scrollY / max : 0;
    const next = { index, progress, global };
    const prev = state.current;
    if (
      next.index !== prev.index ||
      Math.abs(next.progress - prev.progress) > 0.002 ||
      Math.abs(next.global - prev.global) > 0.001
    ) {
      state.current = next;
      cb.current(next);
    }
  };

  const schedule = () => {
    if (!raf.current) raf.current = requestAnimationFrame(measure);
  };

  useEffect(() => {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionCount]);

  return (node) => {
    sections.current = node
      ? Array.from(node.querySelectorAll<HTMLElement>('[data-chapter]'))
      : [];
    schedule();
  };
}

/** 驻留追踪：记录各章节在视口中的停留秒数，供钤印兜底（键盘/减动效路径）。 */
export function useSectionDwell(sectionCount: number, activeIndex: number): number[] {
  const [dwell, setDwell] = useState<number[]>(() => new Array(sectionCount).fill(0));
  const acc = useRef<number[]>(new Array(sectionCount).fill(0));
  useEffect(() => {
    const t0 = performance.now();
    return () => {
      const dt = (performance.now() - t0) / 1000;
      acc.current[activeIndex] += dt;
      setDwell([...acc.current]);
    };
  }, [activeIndex]);
  return dwell;
}
