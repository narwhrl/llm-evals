import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ACT_LABEL, COPY, WORD_BY_ID } from "./content";
import {
  buildLayout,
  getWorld,
  type Layout,
  type WordPose,
  type World,
} from "./choreography";
import { clamp, lerp, remap, stepSpring } from "./math";

type Spring = { value: number; vel: number };

type WordSpring = {
  x: Spring;
  y: Spring;
  r: Spring;
  s: Spring;
};

const HOLD_MS = 380;

function springOf(value: number): Spring {
  return { value, vel: 0 };
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useWindowScrollY(): number {
  const [scrollY, setScrollY] = useState(() => (typeof window === "undefined" ? 0 : window.scrollY));
  useEffect(() => {
    let last = window.scrollY;
    const read = () => {
      const next = window.scrollY;
      if (next !== last) {
        last = next;
        setScrollY(next);
      }
    };
    const onScroll = () => read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const interval = window.setInterval(read, 32);
    read();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(interval);
    };
  }, []);
  return scrollY;
}

function useElementSize<T extends HTMLElement>(): [React.RefObject<T | null>, { w: number; h: number }] {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const rect = el.getBoundingClientRect();
      setSize((prev) =>
        prev.w === rect.width && prev.h === rect.height ? prev : { w: rect.width, h: rect.height },
      );
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, size];
}

function wordFont(size: number): string {
  return `600 ${size}px Fraunces, "Times New Roman", serif`;
}
export function Stage() {
  const reduced = usePrefersReducedMotion();
  const [stageRef, size] = useElementSize<HTMLDivElement>();
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollY = useWindowScrollY();
  const progress = clamp(scrollY / Math.max(1, size.h * 4.4), 0, 1);
  const progressRef = useRef(progress);
  progressRef.current = progress;
  const [substitutions, setSubstitutions] = useState<Record<string, string>>({});
  const [held, setHeld] = useState<string | null>(null);
  const [caret, setCaret] = useState<string | null>(null);
  const [sealNote, setSealNote] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [render, setRender] = useState<World | null>(null);
  const holdTimer = useRef<number | null>(null);
  const springs = useRef<Record<string, WordSpring>>({});
  const markSpring = useRef({
    x: springOf(80),
    y: springOf(80),
    length: springOf(40),
    angle: springOf(-12),
    pressure: springOf(0.5),
  });
  const sheetSpring = useRef(springOf(0));
  const periodSpring = useRef(springOf(0));
  const lastTick = useRef(performance.now());
  const stampUntil = useRef<Record<string, number>>({});
  const seatedWas = useRef<Record<string, boolean>>({});
  const sealClicks = useRef(0);

  useEffect(() => {
    if (!document.fonts) {
      setFontsReady(true);
      return;
    }
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  const layout = useMemo<Layout>(
    () => buildLayout(size.w, size.h, substitutions),
    [size.w, size.h, substitutions, fontsReady],
  );

  const targetWorld = useMemo(
    () => getWorld(progress, layout, substitutions),
    [progress, layout, substitutions],
  );

  useEffect(() => {
    let frame = 0;
    const tick = (now: number) => {
      const dt = clamp((now - lastTick.current) / 1000, 0.001, 0.034);
      lastTick.current = now;
      const root = rootRef.current;
      if (root) {
        const max = Math.max(1, root.offsetHeight - window.innerHeight);
        progressRef.current = clamp((window.scrollY - root.offsetTop) / max, 0, 1);
      }
      const world = getWorld(progressRef.current, layout, substitutions);
      const stiff = reduced ? 0 : 86;
      const damp = reduced ? 0 : 14;
      const nextWords = world.words.map((word) => {
        let spring = springs.current[word.id];
        if (!spring) {
          spring = {
            x: springOf(word.x),
            y: springOf(word.y),
            r: springOf(word.r),
            s: springOf(1),
          };
          springs.current[word.id] = spring;
        }
        if (word.seated && !seatedWas.current[word.id]) {
          stampUntil.current[word.id] = now + 180;
          if (navigator.vibrate && !reduced) navigator.vibrate(7);
        }
        seatedWas.current[word.id] = word.seated;
        const press = stampUntil.current[word.id] && now < stampUntil.current[word.id] ? 0.94 : 1;
        const scaleTarget = word.scale * press;
        if (reduced) {
          spring.x.value = word.x;
          spring.y.value = word.y;
          spring.r.value = word.r;
          spring.s.value = scaleTarget;
        } else {
          spring.x = stepSpring(spring.x.value, spring.x.vel, word.x, dt, stiff, damp);
          spring.y = stepSpring(spring.y.value, spring.y.vel, word.y, dt, stiff, damp);
          spring.r = stepSpring(spring.r.value, spring.r.vel, word.r, dt, 70, 12);
          spring.s = stepSpring(spring.s.value, spring.s.vel, scaleTarget, dt, 220, 18);
        }
        return {
          ...word,
          x: spring.x.value,
          y: spring.y.value,
          r: spring.r.value,
          scale: spring.s.value,
        };
      });

      const markTarget = world.mark;
      if (caret) {
        const focused = nextWords.find((word) => word.id === caret);
        if (focused) {
          markTarget.x = focused.x + focused.width + 10;
          markTarget.y = focused.y;
          markTarget.mode = "tick";
        }
      }
      const ms = markSpring.current;
      const markStiff = reduced ? 0 : markTarget.mode === "strike" ? 140 : 78;
      if (reduced) {
        ms.x.value = markTarget.x;
        ms.y.value = markTarget.y;
        ms.length.value = markTarget.length;
        ms.angle.value = markTarget.angle;
        ms.pressure.value = markTarget.pressure;
      } else {
        ms.x = stepSpring(ms.x.value, ms.x.vel, markTarget.x, dt, markStiff, 16);
        ms.y = stepSpring(ms.y.value, ms.y.vel, markTarget.y, dt, markStiff, 16);
        ms.length = stepSpring(ms.length.value, ms.length.vel, markTarget.length, dt, 90, 14);
        ms.angle = stepSpring(ms.angle.value, ms.angle.vel, markTarget.angle, dt, 70, 12);
        ms.pressure = stepSpring(
          ms.pressure.value,
          ms.pressure.vel,
          markTarget.pressure,
          dt,
          50,
          10,
        );
      }

      if (reduced) {
        sheetSpring.current.value = world.sheetY;
        periodSpring.current.value = world.period.scale;
      } else {
        sheetSpring.current = stepSpring(
          sheetSpring.current.value,
          sheetSpring.current.vel,
          world.sheetY,
          dt,
          60,
          14,
        );
        periodSpring.current = stepSpring(
          periodSpring.current.value,
          periodSpring.current.vel,
          world.period.scale,
          dt,
          160,
          16,
        );
      }

      setRender({
        ...world,
        words: nextWords,
        sheetY: sheetSpring.current.value,
        mark: {
          ...markTarget,
          x: ms.x.value,
          y: ms.y.value,
          length: ms.length.value,
          angle: ms.angle.value,
          pressure: ms.pressure.value,
        },
        period: { ...world.period, scale: periodSpring.current.value },
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [layout, substitutions, reduced, caret]);

  const world = render ?? targetWorld;
  const interactiveIds = world.words.filter((word) => word.interactive).map((word) => word.id);
  const interactiveRef = useRef(interactiveIds);
  const caretRef = useRef(caret);
  interactiveRef.current = interactiveIds;
  caretRef.current = caret;

  const moveCaret = (direction: 1 | -1) => {
    const ids = interactiveRef.current;
    if (!ids.length) return;
    const index = caretRef.current ? ids.indexOf(caretRef.current) : -1;
    const next = ids[(index + direction + ids.length) % ids.length];
    setCaret(next);
    caretRef.current = next;
    document.getElementById(`sort-${next}`)?.focus();
  };

  const clearHoldTimer = () => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const onWordDown = (id: string, event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!world.words.find((word) => word.id === id)?.interactive) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setCaret(id);
    clearHoldTimer();
    holdTimer.current = window.setTimeout(() => setHeld(id), HOLD_MS);
  };

  const onWordUp = () => {
    clearHoldTimer();
  };

  const chooseAlt = (id: string, text: string) => {
    setSubstitutions((prev) => ({ ...prev, [id]: text }));
    setHeld(null);
    if (navigator.vibrate && !reduced) navigator.vibrate([6, 20, 10]);
  };
  const onWordKey = (event: ReactKeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      caretRef.current = id;
      moveCaret(1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      caretRef.current = id;
      moveCaret(-1);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setCaret(id);
      setHeld((prev) => (prev === id ? null : id));
    } else if (event.key === "Escape") {
      setHeld(null);
    }
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHeld(null);
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target?.id.startsWith("sort-")) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        moveCaret(1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        moveCaret(-1);
      } else if ((event.key === " " || event.key === "Enter") && caretRef.current) {
        event.preventDefault();
        const current = caretRef.current;
        setHeld((prev) => (prev === current ? null : current));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onSealClick = () => {
    sealClicks.current += 1;
    if (sealClicks.current >= 3) {
      setSealNote(true);
      sealClicks.current = 0;
    }
  };

  const heldWord = held ? world.words.find((word) => word.id === held) : null;
  const heldDef = held ? WORD_BY_ID[held] : null;
  const railT = remap(world.progress, 0, 1);
  const note = sealNote ? COPY.sealNote : world.note;

  return (
    <div className="scroll-root" ref={rootRef}>
      <a className="skip" href="#composed">
        {COPY.skip}
      </a>
      <div className="stage" ref={stageRef}>
        <div className="paper-grain" aria-hidden="true" />
        <svg width="0" height="0" aria-hidden="true">
          <filter id="press">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="0.6" />
          </filter>
        </svg>
        <div className="sheet" style={{ transform: `translate3d(0, ${world.sheetY}px, 0)` }}>
          <span className="crop tl" aria-hidden="true" />
          <span className="crop tr" aria-hidden="true" />
          <span className="crop bl" aria-hidden="true" />
          <span className="crop br" aria-hidden="true" />
          <span
            className="register"
            aria-hidden="true"
            style={{ transform: `translate(${world.register}px, ${-world.register * 0.4}px)` }}
          >
            <span className="h" />
            <span className="v" />
            <span className="o" />
          </span>
          <div className="identity">
            <button className="seals" type="button" onClick={onSealClick} aria-label={COPY.seals}>
              <SealMark className="seal" kind="pause" />
              <SealMark className="seal" kind="period" />
            </button>
            <div className="seal-caption">
              <strong lang="zh-Hans">{COPY.seals}</strong>
              <span>{COPY.title}</span>
            </div>
          </div>
          <div className="folio">{COPY.folio}</div>
          <div className="act-rail" aria-hidden="true">
            <div className="act-rail-labels">
              {(["begin", "develop", "turn", "rest"] as const).map((name) => (
                <span key={name} data-active={world.act === name}>
                  {ACT_LABEL[name]}
                </span>
              ))}
            </div>
            <div className="act-rail-line">
              <b className="act-rail-bead" style={{ left: `${railT * 100}%` }} />
            </div>
          </div>
          <p
            className="note"
            style={{
              left: layout.mobile ? 18 : 36,
              top: layout.mobile ? 118 : 96,
              maxWidth: layout.mobile ? "34ch" : "36ch",
            }}
          >
            {note}
          </p>
          <div
            className="stick"
            aria-hidden="true"
            style={{
              left: layout.stick.x,
              top: layout.stick.y,
              width: layout.mobile ? 2 : layout.stick.w,
              height: layout.stick.h,
            }}
          >
            {!layout.mobile ? (
              <>
                <i className="stick-rule" style={{ top: layout.fontSize * 0.92 }} />
                <i className="stick-rule" style={{ top: layout.fontSize * 0.92 + layout.fontSize * 1.42 }} />
              </>
            ) : null}
          </div>
          <div
            className="tray"
            aria-hidden="true"
            style={{
              left: layout.tray.x,
              top: layout.tray.y,
              width: layout.tray.w,
              height: layout.tray.h,
            }}
          >
            <span>Rejected sorts</span>
          </div>
          <div className="field" role="group" aria-label={COPY.liveCompose}>
            {world.words.map((word) => (
              <SortButton
                key={word.id}
                word={word}
                fontSize={layout.fontSize}
                held={held === word.id}
                onDown={onWordDown}
                onUp={onWordUp}
                onKey={onWordKey}
              />
            ))}
          </div>
          {heldWord && heldDef?.alts ? (
            <div className="alts">
              {heldDef.alts.map((alt, index) => {
                const x = heldWord.x + index * (layout.fontSize * 2.1) - (heldDef.alts!.length - 1) * layout.fontSize * 0.7;
                const y = heldWord.y - layout.fontSize * (layout.mobile ? 1.15 : 1.35);
                return (
                  <button
                    key={alt}
                    className="alt"
                    type="button"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, 0) rotate(${-6 + index * 5}deg)`,
                      fontSize: layout.fontSize * 0.48,
                    }}
                    onClick={() => chooseAlt(heldWord.id, alt)}
                  >
                    {alt}
                  </button>
                );
              })}
            </div>
          ) : null}
          <svg className="ink" viewBox={`0 0 ${layout.width} ${layout.height}`} preserveAspectRatio="none">
            <path
              d={`M ${world.strike.x1} ${world.strike.y1} Q ${(world.strike.x1 + world.strike.x2) / 2} ${
                (world.strike.y1 + world.strike.y2) / 2 + 11
              } ${world.strike.x2} ${world.strike.y2}`}
              fill="none"
              stroke="var(--zhu)"
              strokeWidth={Math.max(3.4, layout.fontSize * 0.072)}
              strokeLinecap="round"
              strokeDasharray={world.strike.length}
              strokeDashoffset={world.strike.length * (1 - world.strike.t)}
              opacity={0.94}
            />
            <circle
              cx={world.period.x}
              cy={world.period.y}
              r={Math.max(4.2, layout.fontSize * 0.095)}
              fill="var(--zhu)"
              transform={`translate(${world.period.x} ${world.period.y}) scale(${world.period.scale}) translate(${-world.period.x} ${-world.period.y})`}
            />
            {world.mark.mode === "strike" ? null : (
              <MarkGlyph mark={world.mark} fontSize={layout.fontSize} />
            )}
          </svg>
          <footer className="colophon">
            <div>
              <h2>{COPY.colophonName}</h2>
              <p>{COPY.colophonRole}</p>
              <p>{COPY.colophonBody}</p>
            </div>
            <p className="colophon-aside">{world.composed}</p>
          </footer>
          <p className="help">{COPY.keyboard}</p>
        </div>
        <div className="sr-only" aria-live="polite">
          {ACT_LABEL[world.act]}. {world.composed}. {note}
        </div>
      </div>
      <div id="composed" className="composed-anchor" />
    </div>
  );
}

function SortButton({
  word,
  fontSize,
  held,
  onDown,
  onUp,
  onKey,
}: {
  word: WordPose;
  fontSize: number;
  held: boolean;
  onDown: (id: string, event: ReactPointerEvent<HTMLButtonElement>) => void;
  onUp: () => void;
  onKey: (event: ReactKeyboardEvent<HTMLButtonElement>, id: string) => void;
}) {
  return (
    <button
      id={`sort-${word.id}`}
      className="sort"
      type="button"
      data-held={held}
      aria-disabled={!word.interactive}
      tabIndex={word.interactive ? 0 : -1}
      aria-label={word.interactive ? `${word.text}. Hold to see refused readings.` : word.text}
      style={{
        transform: `translate3d(${word.x}px, ${word.y}px, 0) rotate(${word.r}deg) scale(${word.scale})`,
        fontSize,
        fontFamily: "Fraunces, Times New Roman, serif",
        font: wordFont(fontSize),
      }}
      onPointerDown={(event) => onDown(word.id, event)}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onContextMenu={(event) => event.preventDefault()}
      onKeyDown={(event) => onKey(event, word.id)}
    >
      <span
        style={{
          backgroundImage:
            word.struckInk > 0.02
              ? `linear-gradient(transparent 46%, rgba(196,30,30,${lerp(0, 0.95, word.struckInk)}) 46% 54%, transparent 54%)`
              : "none",
        }}
      >
        {word.text}
      </span>
    </button>
  );
}

function MarkGlyph({
  mark,
  fontSize,
}: {
  mark: World["mark"];
  fontSize: number;
}) {
  const w = Math.max(2.4, fontSize * 0.055 * mark.pressure);
  const len = mark.length;
  if (mark.mode === "strike") {
    return (
      <g transform={`translate(${mark.x} ${mark.y}) rotate(${mark.angle})`}>
        <path
          d={`M ${-len * 0.04} 0 C ${len * 0.18} ${-w * 1.2} ${len * 0.62} ${w} ${len * 0.72} ${w * 0.15}`}
          fill="none"
          stroke="var(--zhu)"
          strokeWidth={w * 1.8}
          strokeLinecap="round"
        />
      </g>
    );
  }
  return (
    <g transform={`translate(${mark.x} ${mark.y}) rotate(${mark.angle})`}>
      <path
        d={`M 0 ${-len * 0.58} C ${w * 1.1} ${-len * 0.08} ${w * 0.4} ${len * 0.2} 0 ${len * 0.5} C ${-w * 1.1} ${len * 0.62} ${-w * 1.8} ${len * 0.52} ${-w * 0.5} ${len * 0.4}`}
        fill="none"
        stroke="var(--zhu)"
        strokeWidth={w * 2.1}
        strokeLinecap="round"
      />
      <circle cx={w * 0.15} cy={-len * 0.62} r={w * 1.05} fill="var(--zhu)" />
    </g>
  );
}

function SealMark({ className, kind }: { className: string; kind: "pause" | "period" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="9" y="9" width="46" height="46" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {kind === "pause" ? (
        <path
          d="M32 16 C33.4 28 32.6 38 32 48 C31.2 50.4 30.2 50.6 29.6 49.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      ) : (
        <circle cx="32" cy="40" r="6.5" fill="currentColor" />
      )}
    </svg>
  );
}


