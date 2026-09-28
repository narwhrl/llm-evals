/**
 * The Ink River — the core experience device.
 *
 * It is a single SVG path drawn vertically down the LEFT margin of the page.
 * - Length corresponds to total scroll progress (river "fills" as you read).
 * - Stroke width varies per-chapter (knot, pool, glow, drip, flow).
 * - At the knot chapter, the path crosses itself visibly.
 * - At the pool chapter, ink visibly slows & thickens near the bottom.
 * - Glow chapter: older segments fade slightly (return, time passing).
 *
 * The river is the live record of attention: dwell time on each chapter
 * thickens its segment.
 */

import { useMemo } from 'react';
import { MANUSCRIPT } from '../lib/manuscript';

type Props = {
  /** 0..1 scroll progress through the entire page */
  progress: number;
  /** Per-chapter dwell intensity 0..1, indexed by chapter id */
  dwell: Record<string, number>;
  /** Whether motion is reduced */
  reducedMotion: boolean;
};

const RIVER_X = 64;

export function InkRiver({ progress, dwell, reducedMotion: _rm }: Props) {
  // We render the SVG fixed to viewport; the path length is mapped from scroll progress.
  const viewportH = typeof window === 'undefined' ? 800 : window.innerHeight;
  const pathHeight = viewportH * 1.05;

  // Build path d-string with knots / drips / pools
  const pathD = useMemo(() => buildPath(pathHeight), [pathHeight]);

  // For each chapter, look up dwell to slightly thicken that chapter segment
  const chapterSegments = useMemo(() => {
    return MANUSCRIPT.map((c) => {
      const intensity = dwell[c.id] ?? 0;
      const base = c.river.kind === 'pool' ? 4.6 : c.river.kind === 'knot' ? 3.4 : 2.4;
      const width = base + intensity * 2.6;
      const opacity = c.river.kind === 'glow' ? 0.78 : 0.95;
      return { id: c.id, kind: c.river.kind, width, opacity, intensity };
    });
  }, [dwell]);

  // One path per chapter segment so widths can vary.
  const segPaths = useMemo(() => {
    return chapterSegments.map((seg, i) => {
      const chapter = MANUSCRIPT[i];
      const yTop = chapter.yStart * pathHeight;
      const yBot = chapter.yEnd * pathHeight;
      const segD = clipPathToRange(pathD, yTop, yBot);
      const segLen = approxPathLength(segD);
      const segDrawn = segLen * Math.max(0, Math.min(1, progress));
      return { ...seg, segD, segLen, segDrawn, yTop, yBot };
    });
  }, [chapterSegments, pathD, pathHeight, progress]);

  // Knot overlay — visible only during 改 chapter.
  const knotVisible = progress > 0.45 && progress < 0.78;

  const splatters = useMemo(() => splatterPositions(pathHeight), [pathHeight]);

  return (
    <svg
      className="ink-river"
      viewBox={`0 0 ${RIVER_X * 2 + 80} ${pathHeight}`}
      width={RIVER_X * 2 + 80}
      height={pathHeight}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 2,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}
      aria-hidden="true"
    >
      <defs>
        <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.35" />
        </filter>
        <filter id="ink-pool" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <linearGradient id="ink-sum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ink-sum)" stopOpacity="0.92" />
          <stop offset="1" stopColor="var(--ink-sum)" stopOpacity="1" />
        </linearGradient>
      </defs>

      <g filter="url(#ink-bleed)">
        {segPaths.map((s) => (
          <path
            key={s.id}
            d={s.segD}
            fill="none"
            stroke="url(#ink-sum)"
            strokeWidth={s.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${s.segDrawn} ${s.segLen}`}
            opacity={s.opacity}
          />
        ))}
      </g>

      {knotVisible && (
        <g filter="url(#ink-bleed)">
          {segPaths
            .filter((s) => s.kind === 'knot')
            .map((s, i) => (
              <path
                key={'knot-' + s.id + '-' + i}
                d={knotCrossingPath(s.yTop, s.yBot)}
                fill="none"
                stroke="var(--ink-rin)"
                strokeWidth={1.6}
                strokeLinecap="round"
                opacity="0.78"
              />
            ))}
        </g>
      )}

      {progress > 0.86 && (
        <g filter="url(#ink-pool)">
          <ellipse
            cx={RIVER_X}
            cy={pathHeight * 0.96}
            rx={20 + (progress - 0.86) * 140}
            ry={4 + (progress - 0.86) * 30}
            fill="var(--ink-sum)"
            opacity={Math.min(0.5, (progress - 0.86) * 3)}
          />
        </g>
      )}

      {splatters.map((sp, i) => {
        const revealed = progress > sp.revealAt;
        if (!revealed) return null;
        return (
          <circle
            key={'sp-' + i}
            cx={sp.x}
            cy={sp.y}
            r={sp.r}
            fill="var(--ink-sum)"
            opacity={sp.o}
          />
        );
      })}

      {progress > 0.72 &&
        segPaths
          .filter((s) => s.kind === 'flow' || s.kind === 'drip')
          .map((s) => (
            <path
              key={'glow-' + s.id}
              d={s.segD}
              fill="none"
              stroke="var(--ink-och)"
              strokeWidth={s.width + 1.2}
              strokeLinecap="round"
              opacity={Math.min(0.22, (progress - 0.72) * 1.6) * s.intensity}
            />
          ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Geometry                                                           */
/* ------------------------------------------------------------------ */

function buildPath(H: number): string {
  const pts = [
    { y: 0.02 * H, x: RIVER_X, kind: 'flow' as const },
    { y: 0.08 * H, x: RIVER_X, kind: 'flow' as const },
    { y: 0.2 * H, x: RIVER_X, kind: 'flow' as const },
    { y: 0.28 * H, x: RIVER_X, kind: 'drip' as const },
    { y: 0.4 * H, x: RIVER_X + 8, kind: 'drip' as const },
    { y: 0.45 * H, x: RIVER_X + 14, kind: 'drip' as const },
    { y: 0.5 * H, x: RIVER_X + 18, kind: 'knot' as const },
    { y: 0.55 * H, x: RIVER_X + 36, kind: 'knot' as const },
    { y: 0.6 * H, x: RIVER_X + 18, kind: 'knot' as const },
    { y: 0.65 * H, x: RIVER_X + 4, kind: 'knot' as const },
    { y: 0.7 * H, x: RIVER_X - 6, kind: 'knot' as const },
    { y: 0.78 * H, x: RIVER_X - 4, kind: 'glow' as const },
    { y: 0.85 * H, x: RIVER_X, kind: 'glow' as const },
    { y: 0.9 * H, x: RIVER_X, kind: 'glow' as const },
    { y: 0.94 * H, x: RIVER_X, kind: 'pool' as const },
    { y: 0.98 * H, x: RIVER_X, kind: 'pool' as const },
  ];

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const c1x = a.x;
    const c1y = (a.y + b.y) / 2;
    const c2x = b.x;
    const c2y = (a.y + b.y) / 2;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
  }
  return d;
}

function approxPathLength(d: string, samples = 120): number {
  const pts = samplePath(d, samples);
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    len += Math.hypot(dx, dy);
  }
  return len;
}

function samplePath(d: string, samples: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const tokens = d.match(/[MLC]|[-+]?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [];
  let i = 0;
  let cur = { x: 0, y: 0 };
  while (i < tokens.length) {
    const t = tokens[i++];
    if (t === 'M') {
      cur = { x: parseFloat(tokens[i++]), y: parseFloat(tokens[i++]) };
      pts.push(cur);
    } else if (t === 'L') {
      cur = { x: parseFloat(tokens[i++]), y: parseFloat(tokens[i++]) };
      pts.push(cur);
    } else if (t === 'C') {
      const x1 = parseFloat(tokens[i++]);
      const y1 = parseFloat(tokens[i++]);
      const x2 = parseFloat(tokens[i++]);
      const y2 = parseFloat(tokens[i++]);
      const x = parseFloat(tokens[i++]);
      const y = parseFloat(tokens[i++]);
      for (let s = 1; s <= samples / 8; s++) {
        const tt = s / (samples / 8);
        const it = 1 - tt;
        const px =
          it * it * it * cur.x +
          3 * it * it * tt * x1 +
          3 * it * tt * tt * x2 +
          tt * tt * tt * x;
        const py =
          it * it * it * cur.y +
          3 * it * it * tt * y1 +
          3 * it * tt * tt * y2 +
          tt * tt * tt * y;
        pts.push({ x: px, y: py });
      }
      cur = { x, y };
    }
  }
  return pts;
}

function clipPathToRange(d: string, yTop: number, yBot: number): string {
  const pts = samplePath(d, 400);
  const inside = pts.filter((p) => p.y >= yTop - 0.5 && p.y <= yBot + 0.5);
  if (inside.length < 2) return '';
  let s = `M ${inside[0].x.toFixed(2)} ${inside[0].y.toFixed(2)}`;
  for (let i = 1; i < inside.length; i++) {
    s += ` L ${inside[i].x.toFixed(2)} ${inside[i].y.toFixed(2)}`;
  }
  return s;
}

function knotCrossingPath(yTop: number, yBot: number): string {
  const yMid = (yTop + yBot) / 2;
  return `M ${RIVER_X - 28} ${yMid} Q ${RIVER_X} ${yMid - 14}, ${RIVER_X + 28} ${yMid}`;
}

function splatterPositions(H: number) {
  const baseY = 0.32 * H;
  return [
    { x: RIVER_X + 26, y: baseY + 12, r: 1.4, o: 0.7, revealAt: 0.25 },
    { x: RIVER_X + 38, y: baseY + 38, r: 0.9, o: 0.55, revealAt: 0.27 },
    { x: RIVER_X + 12, y: baseY + 56, r: 1.7, o: 0.78, revealAt: 0.3 },
    { x: RIVER_X + 48, y: baseY + 80, r: 1.1, o: 0.62, revealAt: 0.32 },
    { x: RIVER_X - 6, y: baseY + 102, r: 0.8, o: 0.5, revealAt: 0.34 },
    { x: RIVER_X + 24, y: baseY + 124, r: 1.3, o: 0.7, revealAt: 0.36 },
  ];
}
