import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GargantuaRenderer } from './renderer.js';
import {
  PARAMS, PRESETS, QUALITY_LEVELS, DEBUG_LABELS, STATE_VERSION,
  makeDefaultState, loadState, saveState, parseUrl,
} from './state.js';

const GROUPS = ['相机', '时间', '吸积盘', '星空', '后处理'];
const reject = (error) => ({ ok: false, error });
const safe = (fn) => {
  try { return fn(); } catch (e) { return { ok: false, error: String((e && e.message) || e) }; }
};

function ParamSlider({ spec, value, onChange }) {
  const digits = spec.step >= 1 ? 0 : (spec.step >= 0.1 ? 1 : 2);
  return (
    <label className="param">
      <span className="param__head"><span>{spec.label}</span><b>{value.toFixed(digits)}{spec.unit}</b></span>
      <input type="range" min={spec.min} max={spec.max} step={spec.step} value={value}
        onChange={(e) => onChange(spec.key, parseFloat(e.target.value))} />
    </label>
  );
}

export default function App() {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const urlRef = useRef(null);
  if (urlRef.current === null) urlRef.current = parseUrl(window.location.search);
  const url = urlRef.current;

  const [state, setState] = useState(() => {
    const base = url.capture ? makeDefaultState() : loadState();
    const merged = { ...base, ...url.overrides };
    if (url.capture) merged.playing = false;
    // On phones the parameter drawer starts collapsed; the status strip stays visible.
    if (!url.capture && !('hud' in url.overrides) && window.innerWidth < 720) merged.hud = false;
    return merged;
  });
  const stateRef = useRef(state);
  stateRef.current = state;

  const simRef = useRef({ time: url.time, frozen: url.frozen, last: 0 });
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const applyPresetRef = useRef(null);

  const updateState = useCallback((updater) => {
    const next = typeof updater === 'function' ? updater(stateRef.current) : updater;
    stateRef.current = next;
    setState(next);
    return next;
  }, []);

  const onParam = useCallback((key, value) => {
    updateState((s) => ({ ...s, params: { ...s.params, [key]: value } }));
  }, [updateState]);

  const applyPreset = useCallback((index) => {
    const c = PRESETS[index].camera;
    const next = updateState((s) => ({ ...s, preset: index, params: { ...s.params, ...c } }));
    rendererRef.current?.setCameraFromParams(next.params);
  }, [updateState]);
  applyPresetRef.current = applyPreset;

  const resetAll = useCallback(() => {
    const d = makeDefaultState();
    d.playing = !simRef.current.frozen;
    updateState(d);
    simRef.current.time = url.capture ? url.time : 0;
    rendererRef.current?.setCameraFromParams(d.params);
    rendererRef.current?.setQuality(d.quality);
  }, [updateState, url]);

  // ---------------------------------------------------------------- GL lifetime
  useLayoutEffect(() => {
    const r = new GargantuaRenderer(canvasRef.current, {
      onContextLost: () => setContextLost(true),
      onContextRestored: () => setContextLost(false),
    });
    rendererRef.current = r;
    const s = stateRef.current;
    r.setCameraFromParams(s.params);
    r.resize(window.innerWidth, window.innerHeight, s.quality);
    r.setAutoRotate(s.playing && !simRef.current.frozen);

    const onResize = () => r.resize(window.innerWidth, window.innerHeight, stateRef.current.quality);
    window.addEventListener('resize', onResize);

    // Manual camera input hands control back to the user permanently.
    const onStart = () => {
      if (stateRef.current.playing) updateState((st) => ({ ...st, playing: false }));
    };
    const onEnd = () => {
      const cam = r.getCameraParams();
      updateState((st) => ({ ...st, params: { ...st.params, ...cam } }));
    };
    r.controls.addEventListener('start', onStart);
    r.controls.addEventListener('end', onEnd);

    let raf = 0;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (r.contextLost) return;                 // paused until context is restored
      const st = stateRef.current;
      const sim = simRef.current;
      const dt = sim.last ? Math.min(0.05, Math.max(0, (now - sim.last) / 1000)) : 0.016;
      sim.last = now;
      if (!sim.frozen) sim.time += dt * st.params.timeScale;
      r.setAutoRotate(st.playing && !sim.frozen);
      r.controls.update(dt);
      r.render(st, sim.time);
      if (!readyRef.current) {
        readyRef.current = true;
        document.documentElement.dataset.gargantuaReady = 'true';
        setReady(true);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      r.controls.removeEventListener('start', onStart);
      r.controls.removeEventListener('end', onEnd);
      r.dispose();
      rendererRef.current = null;
    };
  }, [updateState]);

  useEffect(() => {
    stateRef.current = state;
    if (!url.capture) saveState(state);
  }, [state, url]);

  useEffect(() => { rendererRef.current?.setQuality(state.quality); }, [state.quality]);

  useEffect(() => {
    rendererRef.current?.setCameraFromParams(state.params);
  }, [state.params.fov, state.params.distance, state.params.azimuth, state.params.elevation]);

  // ---------------------------------------------------------- keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat) return;
      const code = e.code;
      if (e.shiftKey && /^Digit[1-4]$/.test(code)) {
        e.preventDefault(); applyPresetRef.current(parseInt(code.slice(5), 10) - 1); return;
      }
      if (!e.shiftKey && /^Digit[0-9]$/.test(code)) {
        e.preventDefault(); updateState((s) => ({ ...s, debug: parseInt(code.slice(5), 10) })); return;
      }
      if (code === 'Space') { e.preventDefault(); updateState((s) => ({ ...s, playing: !s.playing })); return; }
      if (code === 'KeyH') { e.preventDefault(); updateState((s) => ({ ...s, hud: !s.hud })); return; }
      if (code === 'KeyR') { e.preventDefault(); resetAll(); return; }
      if (code === 'KeyQ') {
        e.preventDefault();
        updateState((s) => ({ ...s, quality: QUALITY_LEVELS[(QUALITY_LEVELS.indexOf(s.quality) + 1) % 3] }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [updateState, resetAll]);

  // --------------------------------------------------- window.__GARGANTUA__ API
  useEffect(() => {
    const snapshot = () => {
      const s = stateRef.current;
      return {
        version: STATE_VERSION, ready: readyRef.current,
        quality: s.quality, preset: s.preset, debug: s.debug, hud: s.hud,
        playing: s.playing, params: { ...s.params },
        time: simRef.current.time, frozen: simRef.current.frozen,
        contextLost: !!rendererRef.current?.contextLost,
      };
    };
    const api = {
      getState: () => safe(snapshot),
      setQuality: (level) => safe(() => {
        if (!QUALITY_LEVELS.includes(level)) return reject('quality must be standard|high|cinematic');
        updateState((s) => ({ ...s, quality: level }));
        rendererRef.current?.setQuality(level);
        return snapshot();
      }),
      setPreset: (index) => safe(() => {
        if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return reject('preset must be an integer 0..3');
        applyPresetRef.current(index);
        return snapshot();
      }),
      setDebug: (index) => safe(() => {
        if (!Number.isInteger(index) || index < 0 || index >= DEBUG_LABELS.length) return reject('debug must be an integer 0..9');
        updateState((s) => ({ ...s, debug: index }));
        return snapshot();
      }),
      setTime: (seconds) => safe(() => {
        if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) {
          return reject('time must be a finite non-negative number');
        }
        simRef.current.time = Math.min(seconds, 1e6);
        simRef.current.frozen = true;
        updateState((s) => ({ ...s, playing: false }));
        return snapshot();
      }),
    };
    Object.defineProperty(api, 'ready', { get: () => readyRef.current, enumerable: true });
    window.__GARGANTUA__ = api;
    return () => { delete window.__GARGANTUA__; };
  }, [updateState]);

  const p = state.params;
  return (
    <div className={`app ${state.hud ? 'app--hud-open' : ''}`}>
      <canvas ref={canvasRef} className="scene" />

      <div className="status">
        <div className="brand">
          <span className="brand__mark">◉</span>
          <span className="brand__name">GARGANTUA</span>
          <span className="brand__sub">Schwarzschild Raytracer</span>
        </div>
        <div className="chips">
          <span className="chip">质量 <b>{state.quality}</b></span>
          <span className="chip">调试 <b>{state.debug} · {DEBUG_LABELS[state.debug]}</b></span>
          <span className="chip">镜头 <b>{state.playing ? '电影循环中' : '手动 / 暂停'}</b></span>
          <span className="chip">预设 <b>{PRESETS[state.preset].name}</b></span>
          <span className={`chip chip--ready ${ready ? 'is-ready' : ''}`}>● {ready ? 'READY' : '初始化'}</span>
        </div>
      </div>

      <button className="hud-fab" onClick={() => updateState((s) => ({ ...s, hud: !s.hud }))}
        title="H — 显示/隐藏 HUD">
        {state.hud ? '隐藏 HUD' : '显示 HUD'}
      </button>

      <aside className={`panel ${state.hud ? '' : 'panel--hidden'}`}>
        <div className="panel__scroll">
          <section className="sect">
            <h3>视角预设 <small>Shift + 1…4</small></h3>
            <div className="presets">
              {PRESETS.map((ps, i) => (
                <button key={i} className={`preset ${state.preset === i ? 'is-active' : ''}`}
                  style={{ '--pc': ps.color }} onClick={() => applyPreset(i)}>
                  <span className="preset__key">{i + 1}</span>
                  <span className="preset__name">{ps.name}</span>
                  <span className="preset__en">{ps.en}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="sect">
            <h3>渲染与镜头</h3>
            <div className="row">
              {QUALITY_LEVELS.map((lv) => (
                <button key={lv} className={`btn ${state.quality === lv ? 'is-active' : ''}`}
                  onClick={() => updateState((s) => ({ ...s, quality: lv }))}>{lv}</button>
              ))}
            </div>
            <div className="row">
              <button className={`btn ${state.playing ? 'is-active' : ''}`}
                onClick={() => updateState((s) => ({ ...s, playing: !s.playing }))}>
                {state.playing ? '⏸ 暂停镜头' : '▶ 播放镜头'}
              </button>
              <button className="btn btn--warn" onClick={resetAll}>⟲ 重置全部</button>
            </div>
          </section>

          <section className="sect">
            <h3>调试视图 <small>0…9 · 当前 {state.debug} {DEBUG_LABELS[state.debug]}</small></h3>
            <div className="debug-grid">
              {DEBUG_LABELS.map((label, i) => (
                <button key={i} className={`dbg ${state.debug === i ? 'is-active' : ''}`}
                  onClick={() => updateState((s) => ({ ...s, debug: i }))}>
                  <b>{i}</b><span>{label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="sect sect--keys">
            <h3>快捷键</h3>
            <ul>
              <li><kbd>0</kbd>–<kbd>9</kbd> 调试视图切换</li>
              <li><kbd>Shift</kbd>+<kbd>1</kbd>…<kbd>4</kbd> 视角预设</li>
              <li><kbd>Space</kbd> 播放 / 暂停电影镜头</li>
              <li><kbd>H</kbd> HUD 显隐　<kbd>R</kbd> 重置</li>
              <li><kbd>Q</kbd> 质量档切换</li>
              <li>拖拽旋转 · 滚轮 / 双指缩放 · 触摸可用</li>
            </ul>
          </section>

          <section className="sect">
            <h3>参数 <small>共 {PARAMS.length} 项 · 自动持久化</small></h3>
            {GROUPS.map((g) => (
              <div className="group" key={g}>
                <h4>{g}</h4>
                {PARAMS.filter((s) => s.group === g).map((s) => (
                  <ParamSlider key={s.key} spec={s} value={p[s.key]} onChange={onParam} />
                ))}
              </div>
            ))}
          </section>
        </div>
      </aside>

      {contextLost && (
        <div className="gl-overlay">
          <div className="gl-overlay__card">
            <h2>WebGL 上下文已丢失</h2>
            <p>渲染已暂停。浏览器恢复图形上下文后，将自动重建渲染目标与着色器，并从已持久化状态继续渲染，无需刷新页面。</p>
          </div>
        </div>
      )}
    </div>
  );
}
