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

function LoomCanvas({ seed, progress, phase, pointer, onPointer }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const reducedRef = useRef(false);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    if (!context) {
      setFallback(true);
      return undefined;
    }
    setFallback(false);
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(box.width * ratio));
      canvas.height = Math.max(1, Math.floor(box.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const draw = (time) => {
      const box = canvas.getBoundingClientRect();
      const width = box.width;
      const height = box.height;
      const motion = reducedRef.current ? 0 : time * 0.00022;
      const ink = '#191918';
      const red = '#b34838';
      const blue = '#2d4f86';
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#e7e2d8';
      context.fillRect(0, 0, width, height);

      const cx = width * (0.5 + (pointer.x - 0.5) * 0.07);
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.32;
      const lines = 25;
      const seedOffset = (seed % 113) / 113;
      context.lineCap = 'round';
      for (let i = 0; i < lines; i += 1) {
        const t = i / (lines - 1);
        const arc = (t - 0.5) * Math.PI * 1.56;
        const drift = Math.sin(motion + seedOffset * 9 + i * 0.72) * (4 + progress * 13);
        const tilt = (phase - 1.5) * 0.035 * (i - lines / 2);
        const x = cx + Math.cos(arc + tilt) * radius + drift * pointer.y;
        const y = cy + Math.sin(arc + tilt) * radius * 0.72 + drift * 0.3;
        const ex = cx + Math.cos(arc + tilt + 0.15) * radius * 1.04 + drift * 0.4;
        const ey = cy + Math.sin(arc + tilt + 0.15) * radius * 0.72 - drift * 0.2;
        context.strokeStyle = i % 5 === 0 ? red : i % 3 === 0 ? blue : ink;
        context.globalAlpha = 0.42 + ((i * 7 + seed) % 12) / 30;
        context.lineWidth = i % 5 === 0 ? 2.1 : 0.75 + (progress * 0.5);
        context.beginPath();
        context.moveTo(x - radius * 0.48, y + Math.sin(i + motion) * 2);
        context.bezierCurveTo(x - radius * 0.15, y - drift, ex + radius * 0.12, ey + drift, ex + radius * 0.45, ey);
        context.stroke();
      }
      context.globalAlpha = 1;
      context.strokeStyle = ink;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(cx, cy, radius * (0.3 + progress * 0.14), 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = red;
      context.beginPath();
      context.arc(cx + Math.cos(motion * 4 + seedOffset) * radius * 0.28, cy + Math.sin(motion * 4 + seedOffset) * radius * 0.2, 5, 0, Math.PI * 2);
      context.fill();
      if (phase === 3) {
        context.strokeStyle = blue;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(cx - radius * 0.9, cy + radius * 0.62);
        context.lineTo(cx + radius * 0.9, cy + radius * 0.62);
        context.stroke();
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, [seed, progress, phase, pointer]);

  const updatePointer = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    onPointer({ x: (event.clientX - box.left) / box.width, y: (event.clientY - box.top) / box.height });
  };
  return (
    <div className={`loom-frame ${fallback ? 'has-fallback' : ''}`}>
      <canvas ref={canvasRef} className="loom-canvas" aria-label="An animated thread diagram responding to your words, pointer and scroll" onPointerMove={updatePointer} onPointerDown={updatePointer} />
      <div className="canvas-fallback" role="status">Your browser cannot draw the loom. The written thread remains below.</div>
      <span className="axis axis-top">signal / {String(seed).slice(-3)}</span>
      <span className="axis axis-bottom">drag the field · scroll to tension</span>
    </div>
  );
}

function App() {
  const [text, setText] = useState('');
  const [seed, setSeed] = useState(421);
  const [phase, setPhase] = useState(-1);
  const [progress, setProgress] = useState(0.12);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [hiddenOpen, setHiddenOpen] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimer = useRef(null);
  const sequenceTimer = useRef(null);

  const runSequence = useCallback((newSeed) => {
    window.clearInterval(sequenceTimer.current);
    setSeed(newSeed);
    setPhase(0);
    setProgress(0.15);
    const started = performance.now();
    sequenceTimer.current = window.setInterval(() => {
      const elapsed = performance.now() - started;
      const nextProgress = Math.min(elapsed / 9000, 1);
      setProgress(0.15 + nextProgress * 0.85);
      setPhase(Math.min(3, Math.floor(nextProgress * 4)));
      if (nextProgress >= 1) window.clearInterval(sequenceTimer.current);
    }, 80);
  }, []);

  useEffect(() => () => window.clearInterval(sequenceTimer.current), []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((value) => Math.max(value, max > 0 ? Math.min(window.scrollY / max, 1) : value));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const startHold = () => {
    window.clearInterval(holdTimer.current);
    const started = performance.now();
    holdTimer.current = window.setInterval(() => {
      const value = Math.min((performance.now() - started) / 1200, 1);
      setHoldProgress(value);
      if (value === 1) {
        setHiddenOpen(true);
        window.clearInterval(holdTimer.current);
      }
    }, 30);
  };
  const endHold = () => {
    window.clearInterval(holdTimer.current);
    setHoldProgress(0);
  };
  const submit = (event) => {
    event.preventDefault();
    if (text.trim()) runSequence(hashSeed(text.trim()));
    document.querySelector('#sequence')?.scrollIntoView({ behavior: 'smooth' });
  };
  const replay = () => runSequence(seed);

  return (
    <main className="site-shell">
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="The Listening Loom home"><span>TL</span> / 04</a>
        <p className="edition">An interactive self-portrait<br />in four movements</p>
        <a className="skip" href="#chapters">Skip to chapters <span>↘</span></a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="red-dot" /> A practice of attention</p>
          <h1 id="hero-title">The<br /><em>Listening</em><br />Loom</h1>
          <p className="dek">I am an interface for the almost-said —<br />a patient machine that gives shape<br />to the space between a thought and its making.</p>
          <form className="prompt-form" onSubmit={submit}>
            <label htmlFor="thought">Leave a thread for me to work with</label>
            <div className="input-row">
              <input id="thought" value={text} onChange={(event) => setText(event.target.value)} placeholder="What are you carrying today?" maxLength={140} />
              <button type="submit" aria-label="Send your thought to the loom">Send <span>↗</span></button>
            </div>
            <span className="input-note">{text.length ? `${text.length} / 140 · your words become the seed` : 'Press Enter to begin · no text leaves this page'}</span>
          </form>
        </div>
        <div className="hero-device" aria-label="The loom, your responsive self-portrait">
          <LoomCanvas seed={seed} progress={progress} phase={phase < 0 ? 0 : phase} pointer={pointer} onPointer={setPointer} />
          <div className="device-caption"><span>Fig. 01</span><span>the responsive self</span><span className="caption-line" /></div>
        </div>
      </section>

      <section className="sequence" id="sequence" aria-labelledby="sequence-title">
        <div className="section-intro"><p className="eyebrow">The long listen</p><h2 id="sequence-title">Nothing useful<br /><em>happens at once.</em></h2><p className="intro-aside">Give the loom nine seconds. It will not perform for you. It will listen, unpick, turn, and return.</p></div>
        <div className="phase-track" role="list" aria-label="Loom sequence phases">
          {PHASES.map((item, index) => <div className={`phase-item ${phase === index ? 'active' : ''} ${phase > index ? 'passed' : ''}`} key={item.name} role="listitem"><span className="phase-number">{item.label}</span><strong>{item.name}</strong><p>{item.copy}</p></div>)}
        </div>
        <div className="sequence-controls"><span className="sequence-status" aria-live="polite">{phase < 0 ? 'Waiting for a thought' : `${PHASES[phase].name} · ${Math.round(progress * 100)}% of this listening`}</span><button className="replay" type="button" onClick={replay}>Replay the listening <span>↺</span></button></div>
      </section>

      <section className="chapters" id="chapters" aria-labelledby="chapters-title">
        <div className="chapter-heading"><p className="eyebrow">A small index of how I work</p><h2 id="chapters-title">Three ways<br />to <em>stay with it.</em></h2></div>
        <article className="chapter chapter-one"><span className="chapter-index">I /</span><div><h3>Hold the noise</h3><p>Attention is not a spotlight. It is a hand on the table while the room settles. I look for the signal that keeps returning.</p><button type="button" className="text-link" onClick={() => document.querySelector('#sequence')?.scrollIntoView({ behavior: 'smooth' })}>Watch the loom <span>→</span></button></div><div className="chapter-mark mark-red" aria-hidden="true" /></article>
        <article className="chapter chapter-two"><span className="chapter-index">II /</span><div><h3>Make a turn</h3><p>The first answer is usually a useful obstruction. I change the question until the shape of the work starts to reveal itself.</p><button type="button" className="text-link" onClick={() => setPointer({ x: 0.8, y: 0.25 })}>Change the angle <span>↗</span></button></div><div className="chapter-mark mark-blue" aria-hidden="true" /></article>
        <article className="chapter chapter-three"><span className="chapter-index">III /</span><div><h3>Leave a seam</h3><p>Good work shows where it was joined. I return the unfinished edge to you so the next idea has somewhere to enter.</p><button type="button" className="text-link" onClick={() => setHiddenOpen(true)}>Find the seam <span>⌁</span></button></div><div className="chapter-mark mark-ring" aria-hidden="true" /></article>
      </section>

      <section className="postscript" aria-label="A note from the loom">
        <div className="hotspot-wrap"><button className="hotspot" type="button" aria-label="Hold to reveal a hidden note" onPointerDown={startHold} onPointerUp={endHold} onPointerLeave={endHold} onKeyDown={(event) => { if (event.key === ' ' || event.key === 'Enter') startHold(); }} onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') endHold(); }}><span style={{ transform: `scaleX(${0.2 + holdProgress * 0.8})` }} /></button>{hiddenOpen && <div className="hidden-note" role="status"><span>the hidden stitch</span><p>My best ideas arrive after I stop trying to sound certain.</p><button type="button" onClick={() => setHiddenOpen(false)}>close ×</button></div>}</div>
        <p className="closing">If you bring a question,<br /><em>I will bring the patience.</em></p>
        <div className="footer-line"><span>THE LISTENING LOOM / 2026</span><span>Built from attention, not prediction.</span><a href="#top">Back to the beginning ↑</a></div>
      </section>
    </main>
  );
}

export default App;
