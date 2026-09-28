import { useCallback, useEffect, useRef, useState } from 'react';

const PHASES = [
  { name: 'Listening', label: '01 / receive', copy: 'I make room before I make meaning.' },
  { name: 'Unpicking', label: '02 / separate', copy: 'Signals become threads: rhythm, doubt, direction.' },
  { name: 'Turning', label: '03 / turn', copy: 'A useful question changes the whole pattern.' },
  { name: 'Returning', label: '04 / return', copy: 'What comes back is yours — only clearer.' },
];

function hashSeed(text) {
  let value = 17;
  for (let i = 0; i < text.length; i += 1) value = (value * 31 + text.charCodeAt(i)) % 1000003;
  return value;
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mediaQuery) return undefined;
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', update);
    else mediaQuery.addListener?.(update);
    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', update);
      else mediaQuery.removeListener?.(update);
    };
  }, []);

  return reducedMotion;
}

function LoomCanvas({ seed, progress, phase, pointer, onPointer }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const drawRef = useRef(null);
  const reducedRef = useRef(false);
  const valuesRef = useRef({ seed, progress, phase, pointer });
  const sizeRef = useRef({ width: 0, height: 0, ratio: 0 });
  const activePointerRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  valuesRef.current = { seed, progress, phase, pointer };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext?.('2d');
    if (!context) {
      setFallback(true);
      return undefined;
    }
    setFallback(false);
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    reducedRef.current = mediaQuery?.matches ?? false;

    const draw = (time = 0) => {
      const { width, height } = sizeRef.current;
      const { seed: currentSeed, progress: currentProgress, phase: currentPhase, pointer: currentPointer } = valuesRef.current;
      if (!width || !height) return;
      const motion = reducedRef.current ? 0 : time * 0.00022;
      const ink = '#191918';
      const red = '#b34838';
      const blue = '#2d4f86';
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#e7e2d8';
      context.fillRect(0, 0, width, height);

      const cx = width * (0.5 + (currentPointer.x - 0.5) * 0.07);
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.32;
      const lines = 25;
      const seedOffset = (currentSeed % 113) / 113;
      context.lineCap = 'round';
      for (let i = 0; i < lines; i += 1) {
        const t = i / (lines - 1);
        const arc = (t - 0.5) * Math.PI * 1.56;
        const drift = Math.sin(motion + seedOffset * 9 + i * 0.72) * (4 + currentProgress * 13);
        const tilt = (currentPhase - 1.5) * 0.035 * (i - lines / 2);
        const x = cx + Math.cos(arc + tilt) * radius + drift * currentPointer.y;
        const y = cy + Math.sin(arc + tilt) * radius * 0.72 + drift * 0.3;
        const ex = cx + Math.cos(arc + tilt + 0.15) * radius * 1.04 + drift * 0.4;
        const ey = cy + Math.sin(arc + tilt + 0.15) * radius * 0.72 - drift * 0.2;
        context.strokeStyle = i % 5 === 0 ? red : i % 3 === 0 ? blue : ink;
        context.globalAlpha = 0.42 + ((i * 7 + currentSeed) % 12) / 30;
        context.lineWidth = i % 5 === 0 ? 2.1 : 0.75 + (currentProgress * 0.5);
        context.beginPath();
        context.moveTo(x - radius * 0.48, y + Math.sin(i + motion) * 2);
        context.bezierCurveTo(x - radius * 0.15, y - drift, ex + radius * 0.12, ey + drift, ex + radius * 0.45, ey);
        context.stroke();
      }
      context.globalAlpha = 1;
      context.strokeStyle = ink;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(cx, cy, radius * (0.3 + currentProgress * 0.14), 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = red;
      context.beginPath();
      context.arc(cx + Math.cos(motion * 4 + seedOffset) * radius * 0.28, cy + Math.sin(motion * 4 + seedOffset) * radius * 0.2, 5, 0, Math.PI * 2);
      context.fill();
      if (currentPhase === 3) {
        context.strokeStyle = blue;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(cx - radius * 0.9, cy + radius * 0.62);
        context.lineTo(cx + radius * 0.9, cy + radius * 0.62);
        context.stroke();
      }
    };
    drawRef.current = draw;

    const tick = (time) => {
      frameRef.current = null;
      draw(time);
      if (!reducedRef.current) frameRef.current = requestAnimationFrame(tick);
    };
    const startAnimation = () => {
      if (reducedRef.current || frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(tick);
    };
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(box.width));
      const height = Math.max(1, Math.floor(box.height));
      if (width === sizeRef.current.width && height === sizeRef.current.height && ratio === sizeRef.current.ratio) return;
      sizeRef.current = { width, height, ratio };
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedRef.current) draw();
      else startAnimation();
    };
    resize();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(canvas);
    if (!observer) window.addEventListener('resize', resize);
    const onMediaChange = () => {
      reducedRef.current = mediaQuery?.matches ?? false;
      if (reducedRef.current) {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        draw();
      } else {
        startAnimation();
      }
    };
    if (mediaQuery?.addEventListener) mediaQuery.addEventListener('change', onMediaChange);
    else mediaQuery?.addListener?.(onMediaChange);
    if (reducedRef.current) draw();
    else startAnimation();

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', resize);
      if (mediaQuery?.removeEventListener) mediaQuery.removeEventListener('change', onMediaChange);
      else mediaQuery?.removeListener?.(onMediaChange);
      drawRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (reducedRef.current) drawRef.current?.();
  }, [seed, progress, phase, pointer]);

  const updatePointer = (event) => {
    if (activePointerRef.current !== null && activePointerRef.current !== event.pointerId) return;
    const box = event.currentTarget.getBoundingClientRect();
    onPointer({ x: clamp((event.clientX - box.left) / box.width), y: clamp((event.clientY - box.top) / box.height) });
  };
  const handlePointerDown = (event) => {
    activePointerRef.current = event.pointerId;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updatePointer(event);
  };
  const releasePointer = (event) => {
    if (activePointerRef.current !== event.pointerId) return;
    updatePointer(event);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture?.(event.pointerId);
    activePointerRef.current = null;
  };
  const losePointer = (event) => {
    if (activePointerRef.current === event.pointerId) activePointerRef.current = null;
  };
  return (
    <div className={`loom-frame ${fallback ? 'has-fallback' : ''}`}>
      <canvas ref={canvasRef} className="loom-canvas" role="img" aria-label="An animated thread diagram responding to your words, pointer and scroll" onPointerMove={updatePointer} onPointerDown={handlePointerDown} onPointerUp={releasePointer} onPointerCancel={releasePointer} onLostPointerCapture={losePointer} />
      <div className="canvas-fallback" role="img" aria-label="The written thread remains available without Canvas">Your browser cannot draw the loom. The written thread remains below.</div>
      <span className="axis axis-top">signal / {String(seed).slice(-3)}</span>
      <span className="axis axis-bottom">drag the field · scroll to tension</span>
    </div>
  );
}

function HiddenStitch({ open, onOpen, onClose }) {
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const holdTimerRef = useRef(null);
  const holdStartedRef = useRef(0);
  const holdingRef = useRef(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const clearHold = useCallback(() => {
    window.clearInterval(holdTimerRef.current);
    holdTimerRef.current = null;
    holdStartedRef.current = 0;
    holdingRef.current = false;
    setHoldProgress(0);
  }, []);

  const startHold = useCallback((event) => {
    if (event?.type === 'keydown' && event.repeat) return;
    if (open || holdingRef.current) return;
    holdingRef.current = true;
    holdStartedRef.current = performance.now();
    holdTimerRef.current = window.setInterval(() => {
      const value = Math.min((performance.now() - holdStartedRef.current) / 1200, 1);
      setHoldProgress(value);
      if (value >= 1) {
        clearHold();
        onOpen(triggerRef.current);
      }
    }, 30);
  }, [clearHold, onOpen, open]);

  const stopHold = useCallback(() => {
    clearHold();
  }, [clearHold]);

  useEffect(() => {
    if (open) window.requestAnimationFrame(() => closeRef.current?.focus());
  }, [open]);

  useEffect(() => {
    const onBlur = () => clearHold();
    const onWindowKeyDown = (event) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      if (holdingRef.current) {
        event.preventDefault();
        clearHold();
      } else if (open) {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('blur', onBlur);
    window.addEventListener('keydown', onWindowKeyDown);
    return () => {
      clearHold();
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('keydown', onWindowKeyDown);
    };
  }, [clearHold, onClose, open]);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    startHold(event);
  };
  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture?.(event.pointerId);
    stopHold();
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (holdingRef.current) clearHold();
      else if (open) onClose();
      return;
    }
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    startHold(event);
  };

  return (
    <div className="hotspot-wrap">
      <button ref={triggerRef} className="hotspot" type="button" aria-label="Hold to reveal a hidden note" aria-expanded={open} aria-controls="hidden-stitch-note" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={stopHold} onLostPointerCapture={stopHold} onPointerLeave={stopHold} onKeyDown={handleKeyDown} onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') stopHold(); }}><span style={{ transform: `scaleX(${0.2 + holdProgress * 0.8})` }} /></button>
      {open && <div id="hidden-stitch-note" className="hidden-note" role="dialog" aria-modal="false" aria-labelledby="hidden-stitch-title" aria-describedby="hidden-stitch-copy"><span id="hidden-stitch-title">the hidden stitch</span><p id="hidden-stitch-copy">My best ideas arrive after I stop trying to sound certain.</p><button ref={closeRef} type="button" onClick={onClose}>close ×</button></div>}
    </div>
  );
}

function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState('');
  const [inputError, setInputError] = useState(false);
  const [seed, setSeed] = useState(421);
  const [phase, setPhase] = useState(-1);
  const [sequenceProgress, setSequenceProgress] = useState(0.12);
  const [scrollTension, setScrollTension] = useState(0);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [hiddenOpen, setHiddenOpen] = useState(false);
  const sequenceTimer = useRef(null);
  const hiddenInvokerRef = useRef(null);

  const loomProgress = Math.max(sequenceProgress, 0.12 + scrollTension * 0.48);

  const runSequence = useCallback((newSeed) => {
    window.clearInterval(sequenceTimer.current);
    setSeed(newSeed);
    if (reducedMotion) {
      setPhase(3);
      setSequenceProgress(1);
      return;
    }
    setPhase(0);
    setSequenceProgress(0.15);
    const started = performance.now();
    sequenceTimer.current = window.setInterval(() => {
      const elapsed = performance.now() - started;
      const nextProgress = Math.min(elapsed / 9000, 1);
      setSequenceProgress(0.15 + nextProgress * 0.85);
      setPhase(Math.min(3, Math.floor(nextProgress * 4)));
      if (nextProgress >= 1) window.clearInterval(sequenceTimer.current);
    }, 80);
  }, [reducedMotion]);

  useEffect(() => () => window.clearInterval(sequenceTimer.current), []);

  useEffect(() => {
    if (reducedMotion && phase >= 0 && sequenceProgress < 1) {
      window.clearInterval(sequenceTimer.current);
      setPhase(3);
      setSequenceProgress(1);
    }
  }, [reducedMotion]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollTension(max > 0 ? clamp(window.scrollY / max) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = useCallback((selector, focus = false) => {
    const target = document.querySelector(selector);
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    if (focus) target.focus({ preventScroll: true });
  }, [reducedMotion]);

  const openHidden = useCallback((invoker) => {
    hiddenInvokerRef.current = invoker;
    setHiddenOpen(true);
  }, []);
  const closeHidden = useCallback(() => {
    setHiddenOpen(false);
    window.requestAnimationFrame(() => hiddenInvokerRef.current?.focus());
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const thread = text.trim();
    if (!thread) {
      setInputError(true);
      return;
    }
    setInputError(false);
    runSequence(hashSeed(thread));
    scrollToSection('#sequence');
  };
  const replay = () => runSequence(seed);
  const updatePointerAxis = (axis, event) => setPointer((current) => ({ ...current, [axis]: Number(event.target.value) / 100 }));

  return (
    <main className="site-shell">
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="The Listening Loom home"><span>TL</span> / 04</a>
        <p className="edition">An interactive self-portrait<br />in four movements</p>
        <a className="skip" href="#chapters" onClick={(event) => { event.preventDefault(); scrollToSection('#chapters', true); }}>Skip to chapters <span>↘</span></a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="red-dot" /> A practice of attention</p>
          <h1 id="hero-title">The<br /><em>Listening</em><br />Loom</h1>
          <p className="dek">I am an interface for the almost-said —<br />a patient machine that gives shape<br />to the space between a thought and its making.</p>
          <form className="prompt-form" onSubmit={submit}>
            <label htmlFor="thought">Leave a thread for me to work with</label>
            <div className="input-row">
              <input id="thought" value={text} onChange={(event) => { setText(event.target.value); if (event.target.value.trim()) setInputError(false); }} placeholder="What are you carrying today?" maxLength={140} required aria-invalid={inputError} aria-describedby="thought-note thought-error" />
              <button type="submit" aria-label="Send your thought to the loom">Send <span>↗</span></button>
            </div>
            <span className="input-note" id="thought-note">{text.length ? `${text.length} / 140 · your words become the seed` : 'Press Enter to begin · no text leaves this page'}</span>
            {inputError && <span className="input-error" id="thought-error" role="alert">Add a thread before beginning.</span>}
          </form>
        </div>
        <figure className="hero-device" aria-labelledby="loom-caption" aria-describedby="loom-help">
          <LoomCanvas seed={seed} progress={loomProgress} phase={phase < 0 ? 0 : phase} pointer={pointer} onPointer={setPointer} />
          <p className="sr-only" id="loom-help">Move across the field or adjust the keyboard controls to change the listening angle.</p>
          <div className="loom-controls" role="group" aria-labelledby="loom-control-label"><span className="loom-control-label" id="loom-control-label">Tune the listening angle</span><label htmlFor="loom-horizontal">horizontal <input id="loom-horizontal" type="range" min="0" max="100" value={Math.round(pointer.x * 100)} onChange={(event) => updatePointerAxis('x', event)} aria-label="Horizontal listening angle" /></label><label htmlFor="loom-vertical">vertical <input id="loom-vertical" type="range" min="0" max="100" value={Math.round(pointer.y * 100)} onChange={(event) => updatePointerAxis('y', event)} aria-label="Vertical listening angle" /></label></div>
          <figcaption className="device-caption" id="loom-caption"><span>Fig. 01</span><span>the responsive self</span><span className="caption-line" /></figcaption>
        </figure>
      </section>

      <section className="sequence" id="sequence" tabIndex={-1} aria-labelledby="sequence-title">
        <div className="section-intro"><p className="eyebrow">The long listen</p><h2 id="sequence-title">Nothing useful<br /><em>happens at once.</em></h2><p className="intro-aside">Give the loom nine seconds. It will not perform for you. It will listen, unpick, turn, and return.</p></div>
        <div className="phase-track" role="list" aria-label="Loom sequence phases">
          {PHASES.map((item, index) => <div className={`phase-item ${phase === index ? 'active' : ''} ${phase > index ? 'passed' : ''}`} key={item.name} role="listitem"><span className="phase-number">{item.label}</span><strong>{item.name}</strong><p>{item.copy}</p></div>)}
        </div>
        <div className="sequence-controls"><div className="sequence-readout"><span className="sequence-status" aria-live="polite">{phase < 0 ? 'Waiting for a thought' : `${PHASES[phase].name} phase`}</span><span className="sequence-progress" aria-hidden="true">{phase < 0 ? '0%' : `${Math.round(sequenceProgress * 100)}% of this listening`}</span></div><button className="replay" type="button" onClick={replay}>Replay the listening <span>↺</span></button></div>
      </section>

      <section className="chapters" id="chapters" tabIndex={-1} aria-labelledby="chapters-title">
        <div className="chapter-heading"><p className="eyebrow">A small index of how I work</p><h2 id="chapters-title">Three ways<br />to <em>stay with it.</em></h2></div>
        <article className="chapter chapter-one"><span className="chapter-index">I /</span><div><h3>Hold the noise</h3><p>Attention is not a spotlight. It is a hand on the table while the room settles. I look for the signal that keeps returning.</p><button type="button" className="text-link" onClick={() => scrollToSection('#sequence', true)}>Watch the loom <span>→</span></button></div><div className="chapter-mark mark-red" aria-hidden="true" /></article>
        <article className="chapter chapter-two"><span className="chapter-index">II /</span><div><h3>Make a turn</h3><p>The first answer is usually a useful obstruction. I change the question until the shape of the work starts to reveal itself.</p><button type="button" className="text-link" onClick={() => setPointer({ x: 0.8, y: 0.25 })}>Change the angle <span>↗</span></button></div><div className="chapter-mark mark-blue" aria-hidden="true" /></article>
        <article className="chapter chapter-three"><span className="chapter-index">III /</span><div><h3>Leave a seam</h3><p>Good work shows where it was joined. I return the unfinished edge to you so the next idea has somewhere to enter.</p><button type="button" className="text-link" onClick={(event) => openHidden(event.currentTarget)}>Find the seam <span>⌁</span></button></div><div className="chapter-mark mark-ring" aria-hidden="true" /></article>
      </section>

      <section className="postscript" aria-label="A note from the loom">
        <HiddenStitch open={hiddenOpen} onOpen={openHidden} onClose={closeHidden} />
        <p className="closing">If you bring a question,<br /><em>I will bring the patience.</em></p>
        <div className="footer-line"><span>THE LISTENING LOOM / 2026</span><span>Built from attention, not prediction.</span><a href="#top">Back to the beginning ↑</a></div>
      </section>
    </main>
  );
}

export default App;
