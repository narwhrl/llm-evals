import { StrictMode, useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const chapterLinks = [
  { number: '01', label: 'Signal', href: '#signal' },
  { number: '02', label: 'Method', href: '#method' },
  { number: '03', label: 'Shared room', href: '#shared-room' },
  { number: '04', label: 'Echo', href: '#echo' },
];

const controlCopy = [
  { key: 'friction', label: 'friction', low: 'soft', high: 'grain' },
  { key: 'pace', label: 'pace', low: 'linger', high: 'rush' },
  { key: 'temperature', label: 'temperature', low: 'cool', high: 'warm' },
];

const sequencePhases = [
  { end: 0.17, label: 'listen', note: 'the room arrives before the answer' },
  { end: 0.47, label: 'map', note: 'a pattern is allowed to repeat' },
  { end: 0.74, label: 'turn', note: 'one useful disagreement changes the line' },
  { end: 1.01, label: 'make room', note: 'clarity is a shape we can share' },
];

const methodPasses = [
  {
    id: 'hear',
    label: 'hear',
    kicker: '01 / receive',
    title: 'Let the noise have a contour.',
    body: 'I start by staying with the unfinished sentence. The useful material is usually hiding in the pause, the contradiction, or the word nobody has chosen yet.',
    aside: 'I look for',
    bullets: ['the verb beneath the brief', 'the feeling behind the feature', 'the person not in the room'],
  },
  {
    id: 'shape',
    label: 'shape',
    kicker: '02 / translate',
    title: 'Give the tension somewhere to go.',
    body: 'Then I make a small, visible model. Not a final answer — a surface the room can push against, so taste becomes something we can discuss together.',
    aside: 'I make',
    bullets: ['a line you can interrupt', 'a rhythm you can feel', 'a choice with a consequence'],
  },
  {
    id: 'return',
    label: 'return',
    kicker: '03 / hand back',
    title: 'Leave the door open in the work.',
    body: 'The last pass is a handover. The interface should keep enough warmth and legibility for the next person to add their own intelligence.',
    aside: 'I return',
    bullets: ['a clearer next move', 'a little room for surprise', 'the credit for the answer'],
  },
];

const roomModes = [
  {
    label: 'a quiet room',
    title: 'I listen before I decorate.',
    body: 'Every project carries a temperature before it carries a palette. I pay attention to what the team repeats, what they avoid, and where the energy gathers.',
    cue: 'low signal / high attention',
  },
  {
    label: 'a shared table',
    title: 'I make the invisible discussable.',
    body: 'A prototype is a generous interruption. It turns “maybe” into something we can touch, disagree with, and improve without making anyone defend a final answer.',
    cue: 'shared surface / useful friction',
  },
  {
    label: 'an open door',
    title: 'I build for the person arriving next.',
    body: 'The best detail is the one that helps someone else continue. Clarity is not a polished ending; it is a good invitation to the next move.',
    cue: 'clear handover / room to enter',
  },
];

function makeEchoBars(word) {
  const seed = word || 'listening';
  return Array.from({ length: 18 }, (_, index) => {
    const code = seed.charCodeAt(index % seed.length);
    return 18 + ((code * (index + 3) + index * 17) % 66);
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="icon" focusable="false">
      <path d="M3.5 12.5 12 4m0 0H5.5M12 4v6.5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="icon" focusable="false">
      <path d="m5.2 3.7 6.2 4.3-6.2 4.3z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="icon" focusable="false">
      <path d="M5.2 3.7v8.6m5.6-8.6v8.6" />
    </svg>
  );
}

function phaseFor(progress) {
  return sequencePhases.find((phase) => progress < phase.end) ?? sequencePhases.at(-1);
}

function makeSignalPath(index, controls, pointer, progress, echoSeed = 0) {
  const { friction, pace, temperature } = controls;
  const points = [];
  const lineOffset = index - 4;
  const amplitude = 16 + pace * 0.32 + (100 - friction) * 0.22;
  const drift = (pointer.x - 0.5) * (22 + temperature * 0.16);
  const lean = (pointer.y - 0.5) * (28 + friction * 0.12);

  for (let step = 0; step <= 8; step += 1) {
    const t = step / 8;
    const wave = Math.sin(t * 4.3 + progress * 5.4 + index * 0.48 + echoSeed) * amplitude;
    const counterWave = Math.cos(t * 8.1 - progress * 3 + index) * (5 + friction * 0.11);
    const x = 54 + t * 412;
    const y = 304 + lineOffset * 9.4 + wave + counterWave + drift * (t - 0.5) + lean * (t * 0.7 - 0.2);
    points.push({ x, y });
  }

  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let point = 1; point < points.length; point += 1) {
    const previous = points[point - 1];
    const current = points[point];
    const midpoint = (previous.x + current.x) / 2;
    path += ` Q ${midpoint.toFixed(2)} ${previous.y.toFixed(2)} ${current.x.toFixed(2)} ${current.y.toFixed(2)}`;
  }
  return path;
}

function SignalChamber({
  controls,
  onControlChange,
  progress,
  pageProgress,
  echoSeed,
  isPaused,
  reducedMotion,
  onSequenceToggle,
  onNewPass,
  onOpenQuietNote,
  quietNoteOpen,
}) {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const phase = phaseFor(progress);
  const paths = useMemo(
    () => Array.from({ length: 9 }, (_, index) => makeSignalPath(index, controls, pointer, progress + pageProgress * 0.22, echoSeed + controls.temperature * 0.014)),
    [controls, echoSeed, pageProgress, pointer, progress],
  );
  const signalIntensity = Math.round((controls.pace * 0.45 + (100 - controls.friction) * 0.3 + controls.temperature * 0.25));

  const handlePointerMove = useCallback((event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: clamp((event.clientX - bounds.left) / bounds.width, 0, 1),
      y: clamp((event.clientY - bounds.top) / bounds.height, 0, 1),
    });
  }, []);

  const resetPointer = useCallback(() => setPointer({ x: 0.5, y: 0.5 }), []);

  return (
    <div className="device-stack">
      <div
        className={`signal-chamber ${quietNoteOpen ? 'is-note-open' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        style={{ '--pointer-x': `${pointer.x * 100}%`, '--pointer-y': `${pointer.y * 100}%` }}
      >
        <div className="chamber-topline">
          <span>listening engine / live</span>
          <span className="chamber-coordinate">x {String(Math.round(pointer.x * 99)).padStart(2, '0')} · y {String(Math.round(pointer.y * 99)).padStart(2, '0')}</span>
        </div>
        <svg className="signal-canvas" viewBox="0 0 520 620" role="img" aria-labelledby="chamber-title chamber-description">
          <title id="chamber-title">A live signal chamber</title>
          <desc id="chamber-description">Nine responsive lines bend toward a central listening point. Move across the chamber or adjust the controls below to change their tension.</desc>
          <defs>
            <radialGradient id="chamberGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.17" />
              <stop offset="54%" stopColor="var(--signal)" stopOpacity="0.035" />
              <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="signalFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--water)" />
              <stop offset="48%" stopColor="var(--signal)" />
              <stop offset="100%" stopColor="var(--sun)" />
            </linearGradient>
          </defs>
          <g className="chamber-grid" aria-hidden="true">
            {Array.from({ length: 7 }, (_, index) => <line key={`h-${index}`} x1="30" y1={100 + index * 68} x2="490" y2={100 + index * 68} />)}
            {Array.from({ length: 8 }, (_, index) => <line key={`v-${index}`} x1={54 + index * 59} y1="70" x2={54 + index * 59} y2="550" />)}
          </g>
          <circle className="chamber-glow" cx="260" cy="304" r="190" fill="url(#chamberGlow)" aria-hidden="true" />
          <g className="chamber-orbits" aria-hidden="true">
            <ellipse className="orbit orbit-one" cx="260" cy="304" rx="184" ry="116" />
            <ellipse className="orbit orbit-two" cx="260" cy="304" rx="125" ry="184" />
            <circle className="orbit orbit-three" cx="260" cy="304" r="78" />
          </g>
          <g className="signal-paths" aria-hidden="true">
            {paths.map((path, index) => (
              <path
                key={`path-${index}`}
                className={`signal-path signal-path-${index}`}
                d={path}
                pathLength="1"
                style={{ '--path-delay': `${index * -0.17}s` }}
              />
            ))}
          </g>
          <g className="chamber-crosshair" aria-hidden="true">
            <line x1="260" y1="245" x2="260" y2="363" />
            <line x1="201" y1="304" x2="319" y2="304" />
            <circle cx="260" cy="304" r="7" />
          </g>
          <g className="chamber-nodes" aria-hidden="true">
            <circle cx="74" cy="154" r="3" />
            <circle cx="430" cy="184" r="3" />
            <circle cx="116" cy="472" r="3" />
            <circle cx="407" cy="458" r="3" />
          </g>
        </svg>
        <span className="pointer-crosshair" aria-hidden="true"><i /><b /></span>
        <button
          className="knot-trigger"
          type="button"
          aria-expanded={quietNoteOpen}
          aria-controls="quiet-note"
          aria-label={quietNoteOpen ? 'Close the quiet note' : 'Open the quiet note'}
          onClick={onOpenQuietNote}
        >
          <span aria-hidden="true" />
        </button>
        <div className="chamber-corner chamber-corner-top" aria-hidden="true">01 / 04</div>
        <div className="chamber-corner chamber-corner-bottom" aria-hidden="true">move to perturb</div>
        <div className="chamber-state" role="status" aria-live="polite">
          <span className="state-led" aria-hidden="true" />
          <span className="state-name">{phase.label}</span>
          <span className="state-note">{phase.note}</span>
          <span className="state-track" aria-hidden="true"><i style={{ width: `${progress * 100}%` }} /></span>
        </div>
        {quietNoteOpen && (
          <aside id="quiet-note" className="quiet-note" aria-label="A quiet note">
            <span className="quiet-note-label">loose thread / found</span>
            <p>Good work is often the moment a question becomes generous enough for someone else to enter.</p>
            <button className="quiet-note-close" type="button" onClick={onOpenQuietNote}>close note</button>
          </aside>
        )}
      </div>

      <div className="device-readout">
        <div className="readout-heading">
          <span className="section-index">/ core device</span>
          <span className="readout-intensity">signal strength <b>{String(signalIntensity).padStart(3, '0')}</b></span>
        </div>
        <div className="control-list">
          {controlCopy.map((control) => (
            <label className="control-row" key={control.key}>
              <span className="control-name">{control.label}</span>
              <span className="control-track">
                <span className="control-low">{control.low}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={controls[control.key]}
                  onChange={(event) => onControlChange(control.key, Number(event.target.value))}
                  aria-label={`${control.label}, from ${control.low} to ${control.high}`}
                />
                <span className="control-high">{control.high}</span>
              </span>
              <output className="control-value">{String(controls[control.key]).padStart(3, '0')}</output>
            </label>
          ))}
        </div>
        <div className="device-actions">
          <button className="sequence-button" type="button" onClick={onSequenceToggle}>
            {isPaused || progress >= 1 ? <PlayIcon /> : <PauseIcon />}
            <span>{reducedMotion || progress >= 1 ? 'replay sequence' : isPaused ? 'resume sequence' : 'pause sequence'}</span>
          </button>
          <button className="new-pass-button" type="button" onClick={onNewPass}>reset the line <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </div>
  );
}

function MethodSection({ activePass, onPassChange, pageProgress }) {
  const pass = methodPasses[activePass];
  const threadPaths = [
    'M 42 330 C 90 278 112 284 147 310 S 203 365 242 303 S 310 220 365 256 S 386 330 378 388',
    'M 42 348 C 92 298 128 262 160 298 S 216 380 250 312 S 303 183 344 237 S 408 350 378 392',
    'M 42 358 C 94 335 112 258 151 284 S 219 376 262 305 S 295 204 325 278 S 360 362 378 402',
  ];

  return (
    <section className="method-section" id="method" aria-labelledby="method-title" style={{ '--page-drift': pageProgress }}>
      <div className="method-heading">
        <p className="section-index">/ 01 — method</p>
        <p className="method-heading-note">three passes / no straight lines</p>
      </div>
      <div className="method-intro">
        <h2 id="method-title">The shape comes<br /><em>after</em> the listening.</h2>
        <p>I turn ambiguity into a surface we can work on together. The method is less a ladder than a loop: receive, translate, return.</p>
      </div>
      <div className="method-field">
        <div className="method-figure" aria-label={`Method pass ${activePass + 1}: ${pass.label}`}>
          <svg viewBox="0 0 420 460" role="img" aria-labelledby="thread-title thread-description">
            <title id="thread-title">A thread changing direction</title>
            <desc id="thread-description">A hand-drawn signal takes a different route for each method pass.</desc>
            <path className="method-figure-grid" d="M 42 80H378M42 150H378M42 220H378M42 290H378M42 360H378M42 430H378M42 80V430M126 80V430M210 80V430M294 80V430M378 80V430" />
            <ellipse className="method-figure-orbit" cx="210" cy="294" rx="145" ry="102" />
            <path className="method-thread-shadow" d={threadPaths[(activePass + 2) % threadPaths.length]} />
            <path className="method-thread" d={threadPaths[activePass]} pathLength="1" />
            <circle className="method-thread-node" cx={activePass === 0 ? 242 : activePass === 1 ? 250 : 262} cy="304" r="7" />
            <circle className="method-thread-dot" cx="42" cy={330 + activePass * 14} r="3" />
            <circle className="method-thread-dot" cx="378" cy={388 + activePass * 7} r="3" />
          </svg>
          <div className="method-figure-label">
            <span>current pass</span>
            <strong>{String(activePass + 1).padStart(2, '0')} / {pass.label}</strong>
          </div>
          <p className="method-figure-caption">the line remembers every turn</p>
        </div>
        <div className="pass-column">
          <div className="pass-list" role="group" aria-label="Method passes">
            {methodPasses.map((item, index) => (
              <button
                className={`pass-item ${activePass === index ? 'is-active' : ''}`}
                type="button"
                key={item.id}
                aria-pressed={activePass === index}
                onClick={() => onPassChange(index)}
              >
                <span className="pass-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="pass-label">{item.label}</span>
                <span className="pass-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <article className="pass-detail" aria-live="polite">
            <p className="pass-kicker">{pass.kicker}</p>
            <h3>{pass.title}</h3>
            <p>{pass.body}</p>
            <div className="pass-bullets">
              <span>{pass.aside}</span>
              <ul>
                {pass.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </div>
          </article>
        </div>
      </div>
      <div className="method-footer-line">
        <span>01—03 / sequence retained</span>
        <span>scrolling changes the pressure, not the premise</span>
      </div>
    </section>
  );
}

function SharedRoomSection() {
  const [roomMode, setRoomMode] = useState(1);
  const mode = roomModes[roomMode];

  return (
    <section className="shared-room-section" id="shared-room" aria-labelledby="room-title">
      <div className="room-heading">
        <p className="section-index">/ 02 — shared room</p>
        <span className="room-heading-note">the work gets smarter when the room does</span>
      </div>
      <div className="room-intro">
        <h2 id="room-title">Nothing good is<br /><em>solo signal.</em></h2>
        <p>My favorite part of the work is the handoff — the tiny moment when an idea stops belonging to one person and starts becoming useful to a group.</p>
      </div>
      <div className="room-layout">
        <div className="room-diagram" aria-hidden="true">
          <svg viewBox="0 0 520 420" className={`room-svg room-svg-${roomMode}`}>
            <path className="room-axis" d="M52 210H468M260 32V388" />
            <circle className="room-ring room-ring-one" cx="260" cy="210" r="146" />
            <circle className="room-ring room-ring-two" cx="260" cy="210" r="94" />
            <path className="room-thread room-thread-a" d="M52 324 C142 298 168 110 258 210 S370 332 468 94" />
            <path className="room-thread room-thread-b" d="M52 94 C146 118 172 314 260 210 S380 106 468 324" />
            <circle className="room-center" cx="260" cy="210" r="10" />
            <circle className="room-pulse" cx={roomMode === 0 ? 138 : roomMode === 1 ? 388 : 260} cy={roomMode === 0 ? 118 : roomMode === 1 ? 306 : 74} r="5" />
          </svg>
          <span className="room-diagram-label">{mode.cue}</span>
        </div>
        <div className="room-copy">
          <div className="room-mode-list" role="group" aria-label="Ways I work with people">
            {roomModes.map((item, index) => (
              <button
                className={`room-mode-button ${roomMode === index ? 'is-active' : ''}`}
                type="button"
                key={item.label}
                aria-pressed={roomMode === index}
                onClick={() => setRoomMode(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.label}</strong>
                <i aria-hidden="true">{roomMode === index ? '—' : '+'}</i>
              </button>
            ))}
          </div>
          <article className="room-detail" aria-live="polite">
            <span className="room-detail-kicker">current condition / 0{roomMode + 1}</span>
            <h3>{mode.title}</h3>
            <p>{mode.body}</p>
          </article>
        </div>
      </div>
      <div className="room-trust-line">
        <span>design is a contact sport</span>
        <span aria-hidden="true">———</span>
        <span>bring the question, not just the brief</span>
      </div>
    </section>
  );
}

function EchoSection({ submittedWord, draftWord, onDraftChange, onSubmit }) {
  const bars = useMemo(() => makeEchoBars(submittedWord), [submittedWord]);

  return (
    <section className="echo-section" id="echo" aria-labelledby="echo-title">
      <div className="echo-heading">
        <p className="section-index">/ 03 — echo</p>
        <span>local output / no oracle involved</span>
      </div>
      <div className="echo-layout">
        <div className="echo-copy">
          <h2 id="echo-title">Give the signal<br />a <em>noun.</em></h2>
          <p>Leave one word in the chamber. I will return its rhythm — not its meaning — as a small local echo you can carry into the next idea.</p>
          <form className="echo-form" onSubmit={onSubmit}>
            <label htmlFor="echo-word">One word, unfinished</label>
            <div className="echo-input-row">
              <input
                id="echo-word"
                name="echo-word"
                type="text"
                value={draftWord}
                onChange={(event) => onDraftChange(event.target.value)}
                placeholder="e.g. attention"
                maxLength="24"
                autoComplete="off"
              />
              <button type="submit">send it <ArrowUpRight /></button>
            </div>
          </form>
          <p className="echo-status" role="status" aria-live="polite">The current word is <strong>{submittedWord}</strong>.</p>
        </div>
        <div className="echo-visual" aria-label={`A rhythm echo for ${submittedWord}`} role="img">
          <div className="echo-visual-topline"><span>echo / {submittedWord.length} letters</span><span>signal retained</span></div>
          <div className="echo-bars" aria-hidden="true">
            {bars.map((height, index) => <span key={`${height}-${index}`} style={{ '--bar-height': `${height}%`, '--bar-delay': `${index * 24}ms` }} />)}
          </div>
          <div className="echo-word" aria-hidden="true">{submittedWord}</div>
          <div className="echo-visual-bottomline"><span>01</span><span>18</span></div>
        </div>
      </div>
      <footer className="site-footer">
        <span>the listening engine / end of first pass</span>
        <a href="#signal">return to the signal <ArrowUpRight /></a>
      </footer>
    </section>
  );
}

function App() {
  const [controls, setControls] = useState({ friction: 38, pace: 58, temperature: 62 });
  const [progress, setProgress] = useState(0);
  const [sequenceRun, setSequenceRun] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState('signal');
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [quietNoteOpen, setQuietNoteOpen] = useState(false);
  const [activePass, setActivePass] = useState(0);
  const [draftWord, setDraftWord] = useState('');
  const [submittedWord, setSubmittedWord] = useState('listen');

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(query.matches);
    updateMotion();
    query.addEventListener?.('change', updateMotion);
    return () => query.removeEventListener?.('change', updateMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return undefined;
    }
    if (isPaused || progress >= 1) return undefined;
    const duration = 7200;
    let frame;
    const startedAt = performance.now() - progress * duration;
    const tick = (now) => {
      const next = clamp((now - startedAt) / duration, 0, 1);
      setProgress(next);
      if (next < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPaused, reducedMotion, sequenceRun]);

  useEffect(() => {
    let frame;
    const updateProgress = () => {
      frame = undefined;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setPageProgress(maxScroll > 0 ? clamp(window.scrollY / maxScroll, 0, 1) : 0);
      const viewportAnchor = window.innerHeight * 0.38;
      const currentChapter = chapterLinks.reduce((selected, chapter) => {
        const section = document.querySelector(chapter.href);
        return section && section.getBoundingClientRect().top <= viewportAnchor ? chapter.href.slice(1) : selected;
      }, 'signal');
      setActiveChapter(currentChapter);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const handleControlChange = (key, value) => {
    setControls((current) => ({ ...current, [key]: value }));
  };

  const handleSequenceToggle = () => {
    if (reducedMotion || progress >= 1) {
      setProgress(0);
      setIsPaused(false);
      setSequenceRun((current) => current + 1);
      return;
    }
    setIsPaused((current) => !current);
  };

  const handleNewPass = () => {
    setControls({ friction: 38, pace: 58, temperature: Math.round(35 + Math.random() * 50) });
    setProgress(reducedMotion ? 1 : 0);
    setIsPaused(false);
    setSequenceRun((current) => current + 1);
  };

  const handleEchoSubmit = (event) => {
    event.preventDefault();
    const nextWord = draftWord.trim().replace(/\s+/g, ' ').slice(0, 24);
    if (nextWord) setSubmittedWord(nextWord);
  };

  const echoSeed = useMemo(() => submittedWord.split('').reduce((sum, character, index) => sum + character.charCodeAt(0) * (index + 1), 0) / 100, [submittedWord]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to the work</a>
      <header className="site-header">
        <a className="wordmark" href="#signal" aria-label="The Listening Engine home">
          <span className="wordmark-mark" aria-hidden="true">◎</span>
          <span>the listening<br />engine</span>
        </a>
        <div className="header-meta">
          <span className="edition">self-portrait / 01</span>
          <a className="header-link" href="#echo">Leave a mark <ArrowUpRight /></a>
        </div>
      </header>

      <nav className="chapter-nav" aria-label="Chapters">
        {chapterLinks.map((chapter) => (
          <a
            key={chapter.href}
            href={chapter.href}
            className={`chapter-link ${activeChapter === chapter.href.slice(1) ? 'is-active' : ''}`}
            aria-current={activeChapter === chapter.href.slice(1) ? 'location' : undefined}
          >
            <span>{chapter.number}</span>
            <span>{chapter.label}</span>
          </a>
        ))}
      </nav>

      <main id="main-content">
        <section className="hero-section" id="signal" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />A field note on making with people</p>
            <h1 id="hero-title">I work in the<br /><em>interval</em> between<br />almost and clear.</h1>
            <p className="hero-intro">I am a creative front-end mind with a habit of listening for the useful thread inside a noisy idea.</p>
            <a className="text-link" href="#method">Follow the thread <ArrowUpRight /></a>
          </div>
          <SignalChamber
            controls={controls}
            onControlChange={handleControlChange}
            progress={progress}
            pageProgress={pageProgress}
            echoSeed={echoSeed}
            isPaused={isPaused}
            reducedMotion={reducedMotion}
            onSequenceToggle={handleSequenceToggle}
            onNewPass={handleNewPass}
            onOpenQuietNote={() => setQuietNoteOpen((current) => !current)}
            quietNoteOpen={quietNoteOpen}
          />
        </section>

        <section className="intro-band" aria-label="Statement">
          <p className="section-index">/ 00</p>
          <p className="intro-statement">Not an oracle.<br /><span>A responsive surface.</span></p>
          <p className="intro-aside">Move through the page like you would move through a room: slowly enough for the details to answer back.</p>
        </section>

        <MethodSection activePass={activePass} onPassChange={setActivePass} pageProgress={pageProgress} />
        <SharedRoomSection />
        <EchoSection
          submittedWord={submittedWord}
          draftWord={draftWord}
          onDraftChange={setDraftWord}
          onSubmit={handleEchoSubmit}
        />
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
