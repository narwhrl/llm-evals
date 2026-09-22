import { useEffect, useRef } from 'react';
import { useFinePointer } from '../hooks/useReducedMotion';

interface Props {
  active: boolean;
  reduced: boolean;
}

/** 朱笔笔尖：桌面端跟随指针，带一点运笔的迟滞 */
export function PencilCursor({ active, reduced }: Props) {
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(0);

  useEffect(() => {
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (reduced) pos.current = { ...target.current };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [fine, reduced]);

  useEffect(() => {
    if (!fine || !active) return;
    const tick = () => {
      const k = reduced ? 1 : 0.28;
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;
      const el = ref.current;
      if (el) {
        el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [fine, active, reduced]);

  if (!fine) return null;

  return (
    <div
      ref={ref}
      className={`pencil-cursor${active ? ' is-active' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 48" width="18" height="36">
        {/* 笔杆 */}
        <path d="M9 0 h6 v26 h-6 z" fill="#c22e28" />
        <path d="M9 0 h2.2 v26 h-2.2 z" fill="#9c211d" />
        {/* 削开的木与笔尖 */}
        <path d="M9 26 h6 l-3 9 z" fill="#e8dcc0" />
        <path d="M10.6 35 h2.8 l-1.4 8 z" fill="#211d17" />
      </svg>
    </div>
  );
}
