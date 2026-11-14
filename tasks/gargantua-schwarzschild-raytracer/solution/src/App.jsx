import { useEffect, useRef, useState } from 'react';
import { createEngine } from './engine.js';
import {
  PARAMS, PRESETS, QUALITIES, DEBUG_VIEWS,
  loadState, saveState, resetState,
} from './state.js';

const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

function parseQuery() {
  const q = new URLSearchParams(window.location.search);
  const out = { present: false };
  const raw = (k) => q.get(k);
  try {
    if (raw('capture') === '1') { out.capture = true; out.present = true; }
    const qual = raw('quality');
    if (qual === 'standard' || qual === 'high' || qual === 'cinematic') {
      out.quality = qual; out.present = true;
    }
    if (raw('preset') !== null) {
      const preset = Number(raw('preset'));
      if (Number.isInteger(preset) && preset >= 0 && preset <= 3) {
        out.preset = preset; out.present = true;
      }
    }
    if (raw('debug') !== null) {
      const debug = Number(raw('debug'));
      if (Number.isInteger(debug) && debug >= 0 && debug <= 9) {
        out.debug = debug; out.present = true;
      }
    }
    if (raw('hud') !== null) {
      const hud = Number(raw('hud'));
      if (hud === 0 || hud === 1) { out.hud = hud; out.present = true; }
    }
    if (out.capture) {
      const t = Number(raw('time'));
      out.time = Number.isFinite(t) && t >= 0 ? t : 0;
    }
  } catch { /* malformed query: fall through to safe defaults */ }
  return out;
}

function presetView(i) {
  const p = PRESETS[i];
  return { camDist: p.dist, camAzim: p.azim, camElev: p.elev, fov: p.fov };
}

export default function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const captureRef = useRef(null);
  const readyRef = useRef(false);
  const setQualityRef = useRef(null);
  const setPresetRef = useRef(null);
  const setDebugRef = useRef(null);
  const setTimeRef = useRef(null);
  const resetAllRef = useRef(null);
  const togglePlayRef = useRef(null);

  const [s, setS] = useState(() => {
    const base = loadState();
    const qq = parseQuery();
    captureRef.current = qq;
    const next = { ...base };
    if (qq.quality) next.quality = qq.quality;
    if (qq.preset !== undefined) Object.assign(next, { preset: qq.preset }, presetView(qq.preset));
    if (qq.debug !== undefined) next.debug = qq.debug;
    if (qq.hud !== undefined) next.hud = qq.hud;
    if (qq.capture) next.playing = false;
    return next;
  });
  const sRef = useRef(s);
  sRef.current = s;
  const [ready, setReady] = useState(false);
  const [lost, setLost] = useState(false);
  const [fps, setFps] = useState(0);
  useEffect(() => { readyRef.current = ready; }, [ready]);

  const push = (next, prev) => {
    const E = engineRef.current;
    if (!E) return;
    E.setParams(next);
    if (!prev || prev.quality !== next.quality) E.setQuality(next.quality);
    if (!prev || prev.camDist !== next.camDist || prev.camAzim !== next.camAzim ||
        prev.camElev !== next.camElev || prev.fov !== next.fov) {
      E.setView({ dist: next.camDist, azim: next.camAzim, elev: next.camElev, fov: next.fov });
    }
  };

  const update = (patch) => {
    setS((prev) => {
      const next = { ...prev, ...patch };
      saveState(next);
      push(next, prev);
      return next;
    });
  };

  const setQuality = (level) => {
    if (!(level in QUALITIES)) return false;
    update({ quality: level });
    return { ...sRef.current, quality: level };
  };
  const setPreset = (i) => {
    if (!Number.isInteger(i) || i < 0 || i > 3) return false;
    const v = presetView(i);
    update({ preset: i, ...presetView(i) });
    return { ...sRef.current, preset: i };
  };
  const setDebug = (d) => {
    if (!Number.isInteger(d) || d < 0 || d > 9) return false;
    update({ debug: d });
    return { ...sRef.current, debug: d };
  };
  const setTime = (t) => {
    if (typeof t !== 'number' || !Number.isFinite(t) || t < 0) return false;
    engineRef.current?.setTime(t);
    return { ...sRef.current, time: engineRef.current?.getTime() ?? t };
  };
  const resetAll = () => {
    const cap = captureRef.current;
    const next = { ...resetState() };
    if (cap?.capture) next.playing = false;
    if (cap?.hud !== undefined) next.hud = cap.hud;
    saveState(next);
    setS(next);
    const E = engineRef.current;
    if (E) {
      E.setParams(next);
      E.setQuality(next.quality);
      E.setView({ dist: next.camDist, azim: next.camAzim, elev: next.camElev, fov: next.fov });
      E.setTime(cap?.capture ? cap.time : 0);
    }
  };
  const togglePlay = () => {
    if (captureRef.current?.capture) return;
    update({ playing: !sRef.current.playing });
  };

  setQualityRef.current = setQuality;
  setPresetRef.current = setPreset;
  setDebugRef.current = setDebug;
  setTimeRef.current = setTime;
  resetAllRef.current = resetAll;
  togglePlayRef.current = togglePlay;

  useEffect(() => {
    const canvas = canvasRef.current;
    const cap = captureRef.current;
    const st = sRef.current;
    const engine = createEngine(canvas, {
      getDebug: () => sRef.current.debug,
      isPlaying: () => sRef.current.playing && !cap?.capture,
      onUserTakeover: () => {
        if (cap?.capture) return; // frozen session: never fight the script
        if (sRef.current.playing) {
          const next = { ...sRef.current, playing: false };
          saveState(next);
          setS(next);
        }
      },
      onContextLost: (isLost) => setLost(isLost),
      onReady: () => {
        document.documentElement.dataset.gargantuaReady = 'true';
        setReady(true);
      },
    });
    engineRef.current = engine;
    engine.mount(st, st.quality,
      { dist: st.camDist, azim: st.camAzim, elev: st.camElev, fov: st.fov },
      cap?.capture ? cap.time : 0, !!cap?.capture);
    push(st, null);

    window.__GARGANTUA__ = {
      get ready() { return readyRef.current; },
      getState: () => ({
        ...sRef.current, time: engine.getTime(), ready: readyRef.current,
      }),
      setQuality: (l) => setQualityRef.current(l),
      setPreset: (i) => setPresetRef.current(i),
      setDebug: (d) => setDebugRef.current(d),
      setTime: (t) => setTimeRef.current(t),
    };

    let raf = 0;
    let last = performance.now();
    let frames = 0;
    let lastFps = last;
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      engine.renderFrame(dt);
      frames++;
      if (now - lastFps >= 1000) {
        setFps(Math.round(frames * 1000 / (now - lastFps)));
        frames = 0;
        lastFps = now;
        // Slow camera sync: orbit/pinch edits flow back into the sliders.
        setS((prev) => {
          const v = engine.readView();
          if (!v || v.dist < 3) return prev;
          const r = (x) => Math.round(x * 10) / 10;
          if (r(v.dist) === r(prev.camDist) && r(v.azim) === r(prev.camAzim) &&
              r(v.elev) === r(prev.camElev)) return prev;
          const az = v.azim > 180 ? v.azim - 360 : (v.azim < -180 ? v.azim + 360 : v.azim);
          const next = {
            ...prev,
            camDist: Math.min(40, Math.max(6, v.dist)),
            camAzim: Math.min(180, Math.max(-180, az)),
            camElev: Math.min(85, Math.max(-85, v.elev)),
          };
          saveState(next);
          return next;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k >= '0' && k <= '9' && !e.shiftKey) setDebugRef.current(Number(k));
      else if (k === '!' || k === '@' || k === '#' || k === '$') {
        setPresetRef.current(['!', '@', '#', '$'].indexOf(k));
      } else if (k === ' ') { e.preventDefault(); togglePlayRef.current(); }
      else if (k === 'h' || k === 'H') update({ hud: sRef.current.hud ? 0 : 1 });
      else if (k === 'r' || k === 'R') resetAllRef.current();
      else if (k === 'q' || k === 'Q') {
        const i = QUALITY_ORDER.indexOf(sRef.current.quality);
        setQualityRef.current(QUALITY_ORDER[(i + 1) % 3]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
      engine.dispose();
      engineRef.current = null;
      delete window.__GARGANTUA__;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hudVisible = s.hud === 1;

  return (
    <div className="stage">
      <canvas ref={canvasRef} className="gl" />
      {!ready && <div className="boot">compiling shaders…</div>}
      {lost && (
        <div className="lost">
          <strong>GPU context lost</strong>
          <span>rendering paused — state kept, waiting for restore…</span>
        </div>
      )}
      {hudVisible && (
        <aside className="hud">
          <div className="hud-head">
            <div>
              <h1>GARGANTUA</h1>
              <p className="sub">Schwarzschild raytracer · M=1 · rs=2</p>
            </div>
            <button className="icon" onClick={() => update({ hud: 0 })} title="Hide HUD (H)">–</button>
          </div>

          <section>
            <h2>View preset <span className="dim">Shift+1–4</span></h2>
            <div className="row4">
              {PRESETS.map((p, i) => (
                <button key={p.name} className={s.preset === i ? 'on' : ''}
                  onClick={() => setPreset(i)} title={`Shift+${i + 1}`}>
                  {i + 1} · {p.name}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Quality <span className="dim">Q cycles</span></h2>
            <div className="row3">
              {QUALITY_ORDER.map((qq) => (
                <button key={qq} className={s.quality === qq ? 'on' : ''}
                  onClick={() => setQuality(qq)}>
                  {QUALITIES[qq].label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Debug <span className="dim">0–9 · {s.debug}: {DEBUG_VIEWS[s.debug]}</span></h2>
            <div className="dbg">
              {DEBUG_VIEWS.map((d, i) => (
                <button key={d} className={s.debug === i ? 'on' : ''}
                  onClick={() => setDebug(i)} title={d}>{i}</button>
              ))}
            </div>
          </section>

          <section>
            <h2>Parameters <span className="dim">{PARAMS.length} live</span></h2>
            <div className="params">
              {PARAMS.map((p) => (
                <label key={p.key} className="param">
                  <span className="pl">{p.label}
                    <em>{s[p.key].toFixed(2)}{p.unit ? ` ${p.unit}` : ''}</em>
                  </span>
                  <input type="range" min={p.min} max={p.max} step={p.step}
                    value={s[p.key]}
                    onChange={(e) => update({ [p.key]: Number(e.target.value) })} />
                </label>
              ))}
            </div>
          </section>

          <section className="rowbtns">
            <button onClick={togglePlay} title="Space">
              {s.playing ? '❚❚ pause loop' : '▶ play loop'}
            </button>
            <button onClick={resetAll} title="R">⟲ reset</button>
          </section>

          <section>
            <h2>Status</h2>
            <p className="status">
              {ready ? '● live' : '○ starting'} · {s.quality} · preset {s.preset + 1} ·
              dbg {s.debug} · {fps} fps · {lost ? 'CONTEXT LOST' : 'gl ok'}
            </p>
            <p className="keys">
              0–9 debug · Shift+1–4 preset · Space loop · H hud · R reset · Q quality
            </p>
          </section>
        </aside>
      )}
      {!hudVisible && (
        <button className="showhud" onClick={() => update({ hud: 1 })} title="Show HUD (H)">+</button>
      )}
    </div>
  );
}
