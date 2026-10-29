import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBlackHole, QUALITY_PRESETS, PRESETS } from './useBlackHole.js';
import {
  DEBUG_VIEWS,
  PARAM_GROUPS,
  clampParam,
  defaultState,
  loadState,
  parseUrlState,
  presetToParams,
  saveState,
} from './state.js';
import './styles.css';

// 模拟时间：capture 模式下由 setTime 冻结，否则按帧累加。
function makeTimeController(initial = 0, frozen = false) {
  let value = initial;
  return {
    advance(dt) {
      if (!frozen) value += dt;
      return value;
    },
    set(seconds) {
      value = seconds;
      return value;
    },
    get frozen() {
      return frozen;
    },
    setFrozen(next) {
      frozen = next;
    },
    get value() {
      return value;
    },
  };
}

const urlState = parseUrlState(typeof window === 'undefined' ? '' : window.location.search);
const persisted = typeof window === 'undefined' ? defaultState() : loadState();

function initialAppState() {
  const base = persisted;
  const next = {
    ...base,
    params: { ...base.params },
    capture: urlState.capture,
  };
  if (urlState.quality) next.quality = urlState.quality;
  if (urlState.preset !== null) {
    next.preset = urlState.preset;
    next.params = presetToParams(urlState.preset, next.params);
  }
  if (urlState.debug !== null) next.debug = urlState.debug;
  if (urlState.hud !== null) next.hudOpen = urlState.hud;
  if (urlState.capture) {
    next.cinematic = false;
    next.paused = true;
  }
  return next;
}

export default function App() {
  const [state, setState] = useState(initialAppState);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [error, setError] = useState(null);
  const [readyFlag, setReadyFlag] = useState(false);
  const [readyMs, setReadyMs] = useState(0);
  const timeController = useMemo(
    () => makeTimeController(urlState.hasTime ? urlState.time : 0, urlState.capture),
    [],
  );
  const startedAt = useRef(performance.now());
  const stateRef = useRef(state);
  stateRef.current = state;

  const patch = useCallback((next) => {
    // 同步更新 ref，使命令式 API 的返回值立即反映最新状态；
    // setState 仍负责触发重渲染。
    const merged = typeof next === 'function' ? next(stateRef.current) : { ...stateRef.current, ...next };
    stateRef.current = merged;
    setState(merged);
    return merged;
  }, []);

  const setParam = useCallback(
    (key, value) => {
      patch((prev) => ({ ...prev, params: { ...prev.params, [key]: clampParam(key, value) } }));
    },
    [patch],
  );

  const onCameraChange = useCallback(
    (camera) => {
      patch((prev) => ({ ...prev, params: { ...prev.params, ...camera } }));
    },
    [patch],
  );

  const markReady = useCallback(() => {
    if (readyFlag) return;
    setReadyFlag(true);
    setReadyMs(Math.round(performance.now() - startedAt.current));
    document.documentElement.dataset.gargantuaReady = 'true';
  }, [readyFlag]);

  const { mountRef, contextLost, stats, resetCamera, loseContext, runtimeRef } = useBlackHole({
    params: { params: state.params },
    quality: state.quality,
    debug: state.debug,
    cinematic: state.cinematic,
    paused: state.paused,
    onCameraChange,
    onError: (err) => setError(err?.message ?? String(err)),
    onReady: markReady,
    timeRef: timeController,
  });

  // 持久化：任何状态变化都写回 localStorage（capture 模式不写，避免污染验收环境）。
  useEffect(() => {
    if (state.capture) return;
    saveState({
      params: state.params,
      quality: state.quality,
      preset: state.preset,
      debug: state.debug,
      hudOpen: state.hudOpen,
      cinematic: state.cinematic,
    });
  }, [state]);

  const setPreset = useCallback(
    (index) => {
      const next = presetToParams(index, stateRef.current.params);
      patch({ preset: index, params: next });
      resetCamera(next);
    },
    [patch, resetCamera],
  );

  const setQuality = useCallback(
    (level) => {
      if (!QUALITY_PRESETS[level]) return false;
      patch({ quality: level });
      return true;
    },
    [patch],
  );

  const setDebug = useCallback(
    (index) => {
      if (!Number.isInteger(index) || index < 0 || index >= DEBUG_VIEWS.length) return false;
      patch({ debug: index });
      return true;
    },
    [patch],
  );

  const setTime = useCallback(
    (seconds) => {
      const num = Number(seconds);
      if (!Number.isFinite(num) || num < 0) return null;
      timeController.set(num);
      return num;
    },
    [timeController],
  );

  const reset = useCallback(() => {
    const base = defaultState();
    patch({ ...base, capture: stateRef.current.capture });
    resetCamera(base.params);
    timeController.set(0);
  }, [patch, resetCamera, timeController]);

  // 键盘：0-9 调试、Shift+1..4 预设、Space 播放/暂停、H 显隐、R 重置、Q 质量
  useEffect(() => {
    const onKey = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      const current = stateRef.current;
      if (event.shiftKey && /^[1-4]$/.test(event.key)) {
        event.preventDefault();
        setPreset(Number(event.key) - 1);
        return;
      }
      switch (event.key) {
        case ' ':
          event.preventDefault();
          patch({ paused: !current.paused });
          break;
        case 'h':
        case 'H':
          patch({ hudOpen: !current.hudOpen });
          break;
        case 'r':
        case 'R':
          reset();
          break;
        case 'q':
        case 'Q': {
          const order = ['standard', 'high', 'cinematic'];
          const index = order.indexOf(current.quality);
          setQuality(order[(index + 1) % order.length]);
          break;
        }
        default:
          if (/^[0-9]$/.test(event.key)) {
            event.preventDefault();
            setDebug(Number(event.key));
          }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [patch, reset, setDebug, setPreset, setQuality]);

  // 对外自动化接口
  useEffect(() => {
    const api = {
      get ready() {
        return Boolean(document.documentElement.dataset.gargantuaReady === 'true');
      },
      getState: () => ({
        ready: document.documentElement.dataset.gargantuaReady === 'true',
        quality: stateRef.current.quality,
        preset: stateRef.current.preset,
        debug: stateRef.current.debug,
        hud: stateRef.current.hudOpen,
        cinematic: stateRef.current.cinematic,
        paused: stateRef.current.paused,
        time: timeController.value,
        capture: stateRef.current.capture,
        params: { ...stateRef.current.params },
        render: runtimeRef.current?.pipeline
          ? {
              width: runtimeRef.current.pipeline.width,
              height: runtimeRef.current.pipeline.height,
              scale: runtimeRef.current.pipeline.budget.scale,
              maxSteps: runtimeRef.current.pipeline.budget.maxSteps,
              diskSamples: runtimeRef.current.pipeline.budget.diskSamples,
              bloomLevels: runtimeRef.current.pipeline.budget.bloomLevels,
            }
          : null,
      }),
      setQuality: (level) => {
        const ok = setQuality(level);
        return ok ? api.getState() : { error: `invalid quality: ${level}` };
      },
      setPreset: (index) => {
        const num = Number(index);
        if (!Number.isInteger(num) || num < 0 || num >= PRESETS.length) {
          return { error: `invalid preset: ${index}` };
        }
        setPreset(num);
        return api.getState();
      },
      setDebug: (index) => {
        const num = Number(index);
        const ok = setDebug(num);
        return ok ? api.getState() : { error: `invalid debug: ${index}` };
      },
      setTime: (seconds) => {
        const value = setTime(seconds);
        return value === null ? { error: `invalid time: ${seconds}` } : { ...api.getState(), time: value };
      },
      loseContext,
    };
    window.__GARGANTUA__ = api;
    return () => {
      delete window.__GARGANTUA__;
    };
  }, [loseContext, setDebug, setPreset, setQuality, setTime, runtimeRef, timeController]);

  const currentDebug = DEBUG_VIEWS[state.debug] ?? DEBUG_VIEWS[0];
  const hudVisible = state.hudOpen && !hudCollapsed;

  return (
    <div className={`app ${state.capture ? 'is-capture' : ''}`}>
      <div className="viewport" ref={mountRef} />

      {error && (
        <div className="fatal" role="alert">
          <h2>渲染初始化失败</h2>
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            重新加载
          </button>
        </div>
      )}

      {contextLost && (
        <div className="context-lost" role="status">
          <h2>WebGL 上下文已丢失</h2>
          <p>渲染已暂停，正在等待浏览器恢复上下文；参数与视角会保留。</p>
          <button type="button" onClick={() => window.location.reload()}>
            手动重新加载
          </button>
        </div>
      )}

      {state.hudOpen && !hudCollapsed && (
        <aside className="hud" aria-label="控制面板">
          <header className="hud-head">
            <div>
              <h1>GARGANTUA</h1>
              <p className="subtitle">Schwarzschild Black Hole Raytracer</p>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => setHudCollapsed(true)}
              aria-label="收起控制面板"
            >
              ×
            </button>
          </header>

          <section className="hud-section">
            <div className="row">
              <span className="label">质量档</span>
              <div className="segmented" role="group" aria-label="质量档">
                {Object.entries(QUALITY_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    type="button"
                    className={state.quality === key ? 'active' : ''}
                    onClick={() => setQuality(key)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <dl className="stats">
              <div>
                <dt>渲染</dt>
                <dd>
                  {stats.fps} fps · {stats.ms} ms
                </dd>
              </div>
              <div>
                <dt>预算</dt>
                <dd>
                  {stats.scale}× · {stats.steps} 步
                </dd>
              </div>
              <div>
                <dt>就绪</dt>
                <dd>{readyFlag ? `${readyMs} ms` : '初始化中'}</dd>
              </div>
            </dl>
          </section>

          <section className="hud-section">
            <div className="row">
              <span className="label">镜头</span>
              <button
                type="button"
                className={`toggle ${state.cinematic && !state.paused ? 'on' : ''}`}
                onClick={() => patch({ cinematic: !state.cinematic, paused: false })}
              >
                {state.cinematic ? (state.paused ? '已暂停' : '循环中') : '手动'}
              </button>
            </div>
            <div className="presets">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={state.preset === preset.id ? 'active' : ''}
                  onClick={() => setPreset(preset.id)}
                >
                  <span className="preset-index">Shift+{preset.id + 1}</span>
                  {preset.name}
                </button>
              ))}
            </div>
          </section>

          <section className="hud-section">
            <div className="row">
              <span className="label">调试视图</span>
              <span className="badge">
                {state.debug} · {currentDebug.name}
              </span>
            </div>
            <p className="hint">{currentDebug.hint}</p>
            <div className="debug-grid">
              {DEBUG_VIEWS.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className={state.debug === view.id ? 'active' : ''}
                  onClick={() => setDebug(view.id)}
                  title={view.hint}
                >
                  {view.id}
                </button>
              ))}
            </div>
          </section>

          <section className="hud-section params">
            {PARAM_GROUPS.map((group) => (
              <details key={group.id} open={group.id === 'camera'}>
                <summary>{group.label}</summary>
                {group.items.map((item) => (
                  <label key={item.key} className="param">
                    <span className="param-name">{item.label}</span>
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      step={item.step}
                      value={state.params[item.key]}
                      onChange={(event) => setParam(item.key, event.target.value)}
                    />
                    <output>
                      {Number(state.params[item.key]).toFixed(item.step < 0.1 ? 2 : item.step < 1 ? 1 : 0)}
                      {item.unit ?? ''}
                    </output>
                  </label>
                ))}
              </details>
            ))}
          </section>

          <footer className="hud-foot">
            <button type="button" onClick={reset}>
              重置全部
            </button>
            <button type="button" onClick={() => loseContext()}>
              模拟上下文丢失
            </button>
          </footer>
        </aside>
      )}

      {state.hudOpen && hudCollapsed && (
        <button type="button" className="hud-reopen" onClick={() => setHudCollapsed(false)}>
          HUD
        </button>
      )}

      {hudVisible && (
        <div className="shortcuts" aria-hidden="true">
          <span>
            <kbd>0</kbd>–<kbd>9</kbd> 调试
          </span>
          <span>
            <kbd>Shift</kbd>+<kbd>1</kbd>–<kbd>4</kbd> 预设
          </span>
          <span>
            <kbd>Space</kbd> 播放/暂停
          </span>
          <span>
            <kbd>H</kbd> HUD
          </span>
          <span>
            <kbd>R</kbd> 重置
          </span>
          <span>
            <kbd>Q</kbd> 质量
          </span>
          <span>拖拽旋转 · 滚轮缩放</span>
        </div>
      )}

      {!state.hudOpen && (
        <button type="button" className="hud-reopen" onClick={() => patch({ hudOpen: true })}>
          HUD
        </button>
      )}
    </div>
  );
}
