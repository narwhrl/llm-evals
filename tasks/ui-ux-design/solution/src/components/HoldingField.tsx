import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { FRAGMENTS, type Fragment } from "../data/fragments";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export type FieldPhase = "arrive" | "develop" | "turn" | "resolve";

export interface HoldingFieldProps {
  scrollProgress: number;
  committedId: string | null;
  onCommit: (id: string | null) => void;
  onPhaseChange?: (phase: FieldPhase) => void;
}

interface NodeState {
  id: string;
  angle: number;
  radius: number;
  x: number;
  y: number;
  focus: number;
}

function phaseFromScroll(p: number, committed: boolean): FieldPhase {
  if (committed) return "resolve";
  if (p < 0.12) return "arrive";
  if (p < 0.45) return "develop";
  return "turn";
}

function initialAngles(): Map<string, number> {
  const m = new Map<string, number>();
  for (const f of FRAGMENTS) m.set(f.id, f.phase);
  return m;
}

export function HoldingField({
  scrollProgress,
  committedId,
  onCommit,
  onPhaseChange,
}: HoldingFieldProps) {
  const reduced = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const anglesRef = useRef<Map<string, number>>(initialAngles());
  const inkFlashRef = useRef(0);
  const flareRef = useRef(0);
  const centerNudgeRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const scrollRef = useRef(scrollProgress);
  const committedRef = useRef(committedId);
  const reducedRef = useRef(reduced);
  const sizeRef = useRef({ w: 640, h: 640 });
  const timeRef = useRef(0);

  const [nodes, setNodes] = useState<NodeState[]>(() =>
    FRAGMENTS.map((f) => ({
      id: f.id,
      angle: f.phase,
      radius: 120,
      x: 0,
      y: 0,
      focus: 0,
    })),
  );
  const [focusIndex, setFocusIndex] = useState(0);
  const [size, setSize] = useState({ w: 640, h: 640 });
  const [centerNudge, setCenterNudge] = useState({ x: 0, y: 0 });
  const [footnote, setFootnote] = useState(false);
  const [inkFlash, setInkFlash] = useState(0);
  const [dash, setDash] = useState(0);
  const phase = phaseFromScroll(scrollProgress, Boolean(committedId));
  const phaseRef = useRef(phase);

  scrollRef.current = scrollProgress;
  committedRef.current = committedId;
  reducedRef.current = reduced;
  sizeRef.current = size;
  centerNudgeRef.current = centerNudge;
  inkFlashRef.current = inkFlash;

  const fragmentById = useMemo(() => {
    const m = new Map<string, Fragment>();
    for (const f of FRAGMENTS) m.set(f.id, f);
    return m;
  }, []);

  useEffect(() => {
    if (phaseRef.current !== phase) {
      phaseRef.current = phase;
      onPhaseChange?.(phase);
    }
  }, [phase, onPhaseChange]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setSize({ w: Math.max(280, cr.width), h: Math.max(280, cr.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      timeRef.current += dt;

      const { w, h } = sizeRef.current;
      const nudge = centerNudgeRef.current;
      const scrollP = scrollRef.current;
      const committed = committedRef.current;
      const isReduced = reducedRef.current;
      const pointer = pointerRef.current;

      const cx = w / 2 + nudge.x;
      const cy = h / 2 + nudge.y;
      const maxR = Math.min(w, h) * 0.42;

      const densify = 0.55 + scrollP * 0.45;
      const tension = scrollP > 0.45 ? Math.min(1, (scrollP - 0.45) / 0.35) : 0;
      const commitPull = committed ? 0.35 : 0;
      const flare = flareRef.current;

      const px = pointer.active ? pointer.x : cx;
      const py = pointer.active ? pointer.y : cy;
      const warpX = pointer.active ? (px - cx) * 0.18 : 0;
      const warpY = pointer.active ? (py - cy) * 0.18 : 0;

      const next: NodeState[] = [];
      for (const f of FRAGMENTS) {
        let angle = anglesRef.current.get(f.id) ?? f.phase;
        if (!isReduced) {
          const speedScale =
            (0.35 + (1 - densify) * 0.9) * (committed === f.id ? 0.1 : 1);
          angle += f.speed * speedScale * dt * (1 + tension * 0.85);
          anglesRef.current.set(f.id, angle);
        } else {
          angle = f.phase;
        }

        const band =
          f.orbit * maxR * (1.15 - densify * 0.35) * (1 - commitPull * 0.25);
        let targetR =
          committed === f.id
            ? maxR * 0.16
            : band * (1 - tension * 0.12 * (f.orbit > 0.5 ? 1 : 0.4));

        // Verdict pushes alternatives aside, then settles.
        if (committed && committed !== f.id && flare > 0) {
          targetR *= 1 + flare * 0.55;
        }

        const x = cx + warpX * (1 - f.orbit) + Math.cos(angle) * targetR;
        const y = cy + warpY * (1 - f.orbit) + Math.sin(angle) * targetR;

        const dist = Math.hypot(px - x, py - y) || 1;
        const focus = pointer.active ? Math.max(0, 1 - dist / (maxR * 0.55)) : 0;

        next.push({ id: f.id, angle, radius: targetR, x, y, focus });
      }

      setNodes(next);

      if (!isReduced) {
        setDash(timeRef.current * 18);
      }

      if (inkFlashRef.current > 0) {
        const v = Math.max(0, inkFlashRef.current - dt * 1.6);
        inkFlashRef.current = v;
        setInkFlash(v);
      }

      if (flareRef.current > 0) {
        flareRef.current = Math.max(0, flareRef.current - dt * 1.1);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const commitFragment = useCallback(
    (id: string) => {
      if (committedId === id) {
        onCommit(null);
        setInkFlash(0);
        inkFlashRef.current = 0;
        flareRef.current = 0;
        return;
      }
      onCommit(id);
      setInkFlash(1);
      inkFlashRef.current = 1;
      flareRef.current = 1;
    },
    [committedId, onCommit],
  );

  const onPointerMove = (e: ReactPointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const onPointerLeave = () => {
    pointerRef.current = { ...pointerRef.current, active: false };
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIndex((i) => (i + 1) % FRAGMENTS.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex((i) => (i - 1 + FRAGMENTS.length) % FRAGMENTS.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commitFragment(FRAGMENTS[focusIndex].id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCommit(null);
      flareRef.current = 0;
    }
  };

  const onCenterPointerDown = (e: ReactPointerEvent) => {
    e.stopPropagation();
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const origin = { ...centerNudgeRef.current };

    const move = (ev: PointerEvent) => {
      const dx = (ev.clientX - startX) / rect.width;
      const dy = (ev.clientY - startY) / rect.height;
      const nx = Math.max(-28, Math.min(28, origin.x + dx * 80));
      const ny = Math.max(-28, Math.min(28, origin.y + dy * 80));
      setCenterNudge({ x: nx, y: ny });
      if (Math.hypot(nx, ny) > 14) setFootnote(true);
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      const from = { ...centerNudgeRef.current };
      if (reducedRef.current) {
        setCenterNudge({ x: 0, y: 0 });
        return;
      }
      const start = performance.now();
      const anim = (t: number) => {
        const u = Math.min(1, (t - start) / 650);
        const ease = 1 - Math.pow(1 - u, 3);
        setCenterNudge({
          x: from.x * (1 - ease),
          y: from.y * (1 - ease),
        });
        if (u < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const cx = size.w / 2 + centerNudge.x;
  const cy = size.h / 2 + centerNudge.y;

  const links = useMemo(() => {
    if (scrollProgress < 0.18) return [] as Array<[NodeState, NodeState]>;
    const pairs: Array<[NodeState, NodeState]> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const fa = fragmentById.get(a.id)!;
        const fb = fragmentById.get(b.id)!;
        if (fa.kind === fb.kind || Math.abs(fa.orbit - fb.orbit) < 0.12) {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < Math.min(size.w, size.h) * 0.38) pairs.push([a, b]);
        }
      }
    }
    return pairs.slice(0, 10);
  }, [nodes, scrollProgress, fragmentById, size.w, size.h]);

  const focusedId = FRAGMENTS[focusIndex]?.id;
  const densify = 0.55 + scrollProgress * 0.45;
  const narrow = size.w < 420;
  const plateW = narrow ? 96 : 118;
  const plateH = narrow ? 24 : 28;

  return (
    <div className="holding-field" data-phase={phase}>
      <svg
        ref={svgRef}
        className="holding-svg"
        role="application"
        aria-label="Holding pattern deliberation field. Arrow keys focus fragments, Enter commits a reading, Escape releases."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="well" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(196,92,38,0.14)" />
            <stop offset="60%" stopColor="rgba(244,239,230,0)" />
          </radialGradient>
          <filter id="ink" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale={inkFlash * 5}
            />
          </filter>
        </defs>

        <rect width={size.w} height={size.h} fill="url(#well)" />

        {[0.28, 0.48, 0.7].map((o, idx) => {
          const r =
            o *
            Math.min(size.w, size.h) *
            0.42 *
            (1.15 - densify * 0.35) *
            (committedId ? 0.85 : 1);
          return (
            <circle
              key={o}
              cx={cx}
              cy={cy}
              r={Math.max(8, r)}
              className="orbit-guide"
              style={{
                opacity: 0.12 + scrollProgress * 0.28,
                strokeDashoffset: dash * (idx % 2 === 0 ? 1 : -1),
              }}
            />
          );
        })}

        {links.map(([a, b], i) => (
          <line
            key={`${a.id}-${b.id}-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            className="thought-link"
            style={{
              opacity: 0.06 + scrollProgress * 0.24 + (committedId ? 0.06 : 0),
            }}
          />
        ))}

        <g
          className="center-well"
          transform={`translate(${cx}, ${cy})`}
          onPointerDown={onCenterPointerDown}
          style={{ cursor: "grab" }}
          aria-hidden="true"
        >
          <circle r={26 + scrollProgress * 12} className="center-ring" />
          <circle r={5 + (committedId ? 5 : 0)} className="center-dot" />
          <text className="center-label" textAnchor="middle" dy="0.35em">
            I
          </text>
        </g>

        {nodes.map((n) => {
          const f = fragmentById.get(n.id)!;
          const isCommitted = committedId === n.id;
          const isFocused = focusedId === n.id;
          const scale = 1 + n.focus * 0.18 + (isCommitted ? 0.22 : 0);
          return (
            <g
              key={n.id}
              className={`fragment-node kind-${f.kind}${isCommitted ? " is-committed" : ""}${
                isFocused ? " is-focused" : ""
              }`}
              transform={`translate(${n.x}, ${n.y}) scale(${scale})`}
              filter={isCommitted && inkFlash > 0.05 ? "url(#ink)" : undefined}
              onClick={() => {
                setFocusIndex(FRAGMENTS.findIndex((x) => x.id === n.id));
                commitFragment(n.id);
              }}
              role="button"
              tabIndex={-1}
              aria-pressed={isCommitted}
              aria-label={`${f.label}. ${f.kind}. Activate to commit this reading.`}
              style={{ cursor: "pointer" }}
            >
              <rect
                className="frag-plate"
                x={-plateW / 2}
                y={-plateH / 2}
                width={plateW}
                height={plateH}
                rx={3}
              />
              <text className="frag-label" textAnchor="middle" dy="0.35em">
                {f.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="field-chrome" aria-live="polite">
        <p className="field-phase">
          <span className="mono">{phase}</span>
          <span className="sep" aria-hidden="true">
            ·
          </span>
          <span>
            {committedId
              ? "committed — click again or Esc to reopen"
              : scrollProgress < 0.45
                ? "orbiting — scroll to densify"
                : "tension peak — commit a fragment"}
          </span>
        </p>
        <p className="field-legend mono">
          click / ←→ enter / esc · drag the I
        </p>
        {footnote && (
          <p className="field-footnote">
            Assistants aren’t centers; tasks are. Drag the “I” — it always
            returns.
          </p>
        )}
      </div>
    </div>
  );
}
