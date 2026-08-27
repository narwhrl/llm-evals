import { useEffect, useRef, useState } from 'react';

interface Props {
  /** 在钤印那一刻才取字：访客全程驻留最久的汉字。 */
  getChars: () => string[];
  reduced: boolean;
}

const FALLBACK = ['在', '读', '此', '刻'];
/** 白文印章 2×2 排布：右上 → 右下 → 左上 → 左下（传统印面读序）。 */
const POS = [
  { x: 148, y: 52 },
  { x: 148, y: 148 },
  { x: 52, y: 52 },
  { x: 52, y: 148 },
];

export function Seal({ getChars, reduced }: Props) {
  const [chars, setChars] = useState<string[] | null>(null);
  const [pressKey, setPressKey] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const stamped = useRef(false);

  const press = () => {
    const picked = getChars().filter((c, i, a) => a.indexOf(c) === i);
    for (const f of FALLBACK) {
      if (picked.length >= 4) break;
      if (!picked.includes(f)) picked.push(f);
    }
    setChars(picked.slice(0, 4));
    setPressKey((k) => k + 1);
    if (!reduced && 'vibrate' in navigator) navigator.vibrate?.(18);
  };

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !stamped.current) {
          stamped.current = true;
          press();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="seal-wrap" ref={rootRef}>
      <div className={`seal-stage${chars ? ' is-stamped' : ''}`}>
        {chars && (
          <svg
            key={pressKey}
            className={reduced ? 'seal-svg' : 'seal-svg seal-press'}
            viewBox="0 0 200 200"
            role="img"
            aria-label={`印章：${chars.join('')}`}
          >
            <defs>
              <filter id="seal-rough" x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
              </filter>
            </defs>
            <g filter="url(#seal-rough)">
              <rect x="14" y="14" width="172" height="172" rx="12" fill="#b23a2a" />
              <rect
                x="26"
                y="26"
                width="148"
                height="148"
                rx="6"
                fill="none"
                stroke="#f4efe6"
                strokeWidth="3"
                opacity="0.85"
              />
              {chars.map((c, i) => (
                <text
                  key={i}
                  x={POS[i].x}
                  y={POS[i].y + 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#f6f1e7"
                  fontSize="58"
                  fontWeight="900"
                  fontFamily='"Noto Serif SC", "Songti SC", serif'
                >
                  {c}
                </text>
              ))}
            </g>
          </svg>
        )}
        {!chars && <div className="seal-placeholder" aria-hidden="true" />}
      </div>
      <p className="seal-caption">你读过的字，钤于此。</p>
      <button type="button" className="seal-again" onClick={press} disabled={!chars}>
        再钤一次
      </button>
    </div>
  );
}
