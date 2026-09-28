/**
 * The hidden stamp tool — sits in the bottom-right corner, invisible until
 * the visitor moves toward it. Click opens the seal tray; pick a glyph and
 * click anywhere on the page to leave a personal seal that persists in
 * localStorage and re-appears on return.
 *
 * This is the "explore to discover" layer.
 */

import { useEffect, useState } from 'react';

type Stamp = {
  /** Normalized x/y in page coords (0..1) */
  x: number;
  y: number;
  glyph: string;
  /** ISO timestamp of when the visitor stamped it */
  at: string;
  /** Slight rotation jitter */
  tilt: number;
};

const STORAGE_KEY = 'inkriver.stamps.v1';
const PALETTE = ['印', '心', '思', '读', '注', '改', '复', '墨'];

function loadStamps(): Stamp[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (s: unknown): s is Stamp =>
        typeof s === 'object' &&
        s !== null &&
        typeof (s as Stamp).x === 'number' &&
        typeof (s as Stamp).y === 'number' &&
        typeof (s as Stamp).glyph === 'string',
    );
  } catch {
    return [];
  }
}

function saveStamps(stamps: Stamp[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
  } catch {
    /* ignore quota / disabled */
  }
}

type Props = {
  pageHeight: number;
};

export function StampTool({ pageHeight }: Props) {
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState<string | null>(null);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setStamps(loadStamps());
    // Reveal after 6s — long enough that the visitor must be deliberate
    const t = setTimeout(() => setRevealed(true), 6000);
    return () => clearTimeout(t);
  }, []);

  // Stamp on page click when armed
  useEffect(() => {
    if (!armed) return;
    const handler = (ev: MouseEvent) => {
      // ignore clicks on the tool itself
      const target = ev.target as HTMLElement | null;
      if (target?.closest('[data-stamp-tool]')) return;
      // Convert to normalized page coords
      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        pageHeight,
      );
      const x = ev.clientX / window.innerWidth;
      const y = (window.scrollY + ev.clientY) / docH;
      const stamp: Stamp = {
        x,
        y,
        glyph: armed,
        at: new Date().toISOString(),
        tilt: (Math.random() - 0.5) * 6,
      };
      const next = [...stamps, stamp];
      setStamps(next);
      saveStamps(next);
      // Disarm after one stamp; tool feels precise, not automatic
      setArmed(null);
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [armed, stamps, pageHeight]);

  return (
    <>
      {/* Existing visitor stamps */}
      <div className="page-stamps" aria-hidden="true">
        {stamps.map((s, i) => (
          <div
            key={i}
            className="page-stamp"
            style={{
              left: `${s.x * 100}%`,
              top: `${s.y * 100}%`,
              transform: `rotate(${s.tilt}deg)`,
            }}
            title={`stamped ${s.at}`}
          >
            <div className="seal__face">
              <span className="seal__glyph">{s.glyph}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="stamp-tool" data-stamp-tool>
        <button
          type="button"
          className={'stamp-tool__trigger' + (revealed ? ' is-revealed' : '')}
          aria-label={open ? '关闭印章盒' : '打开印章盒'}
          aria-expanded={open}
          onClick={() => {
            setOpen((v) => !v);
            setArmed(null);
          }}
        >
          <span className="stamp-tool__glyph">{armed ?? '印'}</span>
        </button>

        {open && (
          <div className="stamp-tool__tray" role="toolbar" aria-label="印章选择">
            {PALETTE.map((g) => (
              <button
                key={g}
                type="button"
                className={'stamp-tool__pick' + (armed === g ? ' is-armed' : '')}
                aria-pressed={armed === g}
                aria-label={`选择印章 ${g}`}
                onClick={() => setArmed((cur) => (cur === g ? null : g))}
              >
                {g}
              </button>
            ))}
            <button
              type="button"
              className="stamp-tool__clear"
              aria-label="清除全部印章"
              onClick={() => {
                setStamps([]);
                saveStamps([]);
              }}
            >
              清除
            </button>
            <p className="stamp-tool__hint" role="status">
              {armed ? `已选 "${armed}"，点击页面任意位置落印。` : '选一枚印章，再点页面。'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
