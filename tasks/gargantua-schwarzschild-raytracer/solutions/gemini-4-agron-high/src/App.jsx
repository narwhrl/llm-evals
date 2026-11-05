import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GargantuaEngine } from './renderer/GargantuaEngine.js';
import { CosmicAudioController } from './audio/cosmicAudio.js';
import {
  CAMERA_PRESETS,
  DEBUG_MODES,
  PARAM_GROUPS,
  PARAM_MAP,
  PARAM_SPECS,
  QUALITY_ORDER,
  QUALITY_PROFILES,
  clearPersistedState,
  createDefaultState,
  isValidDebug,
  isValidPreset,
  isValidQuality,
  isValidSimTime,
  parseInitialStateWithUrl,
  sanitizeParams,
  savePersistedState,
} from './state/schema.js';

const CAMERA_PARAM_KEYS = new Set([
  'fov',
  'cameraDistance',
  'cameraAzimuth',
  'cameraElevation',
  'cameraRoll',
]);

export default function App() {
  const [appState, setAppState] = useState(() => parseInitialStateWithUrl(window.location.search));
  const [telemetry, setTelemetry] = useState({ fps: 60, simTime: appState.simTime });
  const [renderBudget, setRenderBudget] = useState(() => {
    const p = QUALITY_PROFILES[appState.quality] || QUALITY_PROFILES.high;
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      renderScale: p.renderScale,
      effectiveDpr: Math.min(window.devicePixelRatio || 1, p.maxDpr),
      maxSteps: p.maxSteps,
      diskSubsamples: p.diskSubsamples,
      starLayers: p.starLayers,
      bloomMips: p.bloomMips,
      caSamples: p.caSamples,
    };
  });
  const [contextLost, setContextLost] = useState(false);

  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const audioRef = useRef(null);
  const stateRef = useRef(appState);
  stateRef.current = appState;

  const commitState = useCallback((updater, engineOpts = {}) => {
    const prev = stateRef.current;
    const computed = typeof updater === 'function' ? updater(prev) : updater;
    const next = {
      ...computed,
      params: sanitizeParams(computed.params, prev.params),
    };
    stateRef.current = next;
    setAppState(next);
    savePersistedState(next);
    engineRef.current?.applyState(next, engineOpts);
    return next;
  }, []);

  const buildSnapshot = useCallback(() => {
    const s = stateRef.current;
    const eng = engineRef.current;
    const liveTime = eng ? eng.state.simTime : s.simTime;
    const liveParams = eng ? { ...eng.state.params } : { ...s.params };
    return {
      ready: Boolean(eng?.ready && !eng?.contextLost),
      capture: Boolean(s.capture),
      contextLost: Boolean(eng?.contextLost),
      quality: s.quality,
      preset: s.preset,
      presetName: CAMERA_PRESETS[s.preset]?.name ?? 'Custom Orbit',
      debug: s.debug,
      debugName: DEBUG_MODES[s.debug]?.name ?? 'Final Composite',
      time: Number(liveTime.toFixed(4)),
      hud: s.hudVisible ? 1 : 0,
      hudVisible: Boolean(s.hudVisible),
      cinematicPlaying: Boolean(s.cinematicPlaying),
      audioEnabled: Boolean(s.audioEnabled),
      renderBudget: eng ? { ...eng.renderBudget } : { ...renderBudget },
      params: liveParams,
    };
  }, [renderBudget]);

  // Actions
  const handleSetQuality = useCallback(
    (level) => {
      if (!isValidQuality(level)) {
        return {
          ...buildSnapshot(),
          ok: false,
          error: 'Invalid quality: expected "standard", "high", or "cinematic".',
        };
      }
      commitState((prev) => ({ ...prev, quality: level }), { renderImmediate: true });
      return { ...buildSnapshot(), ok: true };
    },
    [buildSnapshot, commitState],
  );

  const handleCycleQuality = useCallback(() => {
    const idx = QUALITY_ORDER.indexOf(stateRef.current.quality);
    const nextQ = QUALITY_ORDER[(idx + 1) % QUALITY_ORDER.length];
    return handleSetQuality(nextQ);
  }, [handleSetQuality]);

  const handleSetPreset = useCallback(
    (index) => {
      if (!isValidPreset(index)) {
        return {
          ...buildSnapshot(),
          ok: false,
          error: 'Invalid preset: expected integer 0..3.',
        };
      }
      const presetDef = CAMERA_PRESETS[index];
      commitState(
        (prev) => ({
          ...prev,
          preset: index,
          cinematicPlaying: false,
          params: sanitizeParams({ ...prev.params, ...presetDef.params }, prev.params),
        }),
        { cameraUpdated: true, resetAnchor: true, renderImmediate: true },
      );
      return { ...buildSnapshot(), ok: true };
    },
    [buildSnapshot, commitState],
  );

  const handleSetDebug = useCallback(
    (index) => {
      if (!isValidDebug(index)) {
        return {
          ...buildSnapshot(),
          ok: false,
          error: 'Invalid debug mode: expected integer 0..9.',
        };
      }
      commitState((prev) => ({ ...prev, debug: index }), { renderImmediate: true });
      return { ...buildSnapshot(), ok: true };
    },
    [buildSnapshot, commitState],
  );

  const handleSetTime = useCallback(
    (seconds) => {
      if (!isValidSimTime(seconds)) {
        return {
          ...buildSnapshot(),
          ok: false,
          error: 'Invalid time: expected a finite non-negative number.',
        };
      }
      commitState((prev) => ({ ...prev, simTime: seconds }), { renderImmediate: true });
      setTelemetry((t) => ({ ...t, simTime: seconds }));
      return { ...buildSnapshot(), ok: true };
    },
    [buildSnapshot, commitState],
  );

  const handleParamChange = useCallback(
    (key, rawValue) => {
      const spec = PARAM_MAP[key];
      const num = Number(rawValue);
      if (!spec || !Number.isFinite(num)) return;
      const isCamKey = CAMERA_PARAM_KEYS.has(key);
      commitState(
        (prev) => {
          const nextParams = { ...prev.params, [key]: num };
          if (key === 'diskInnerRadius' && nextParams.diskInnerRadius > nextParams.diskOuterRadius - 0.8) {
            nextParams.diskOuterRadius = Math.min(
              PARAM_MAP.diskOuterRadius.max,
              nextParams.diskInnerRadius + 0.8,
            );
          } else if (
            key === 'diskOuterRadius' &&
            nextParams.diskOuterRadius < nextParams.diskInnerRadius + 0.8
          ) {
            nextParams.diskInnerRadius = Math.max(
              PARAM_MAP.diskInnerRadius.min,
              nextParams.diskOuterRadius - 0.8,
            );
          }
          return {
            ...prev,
            preset: isCamKey ? -1 : prev.preset,
            cinematicPlaying: isCamKey ? false : prev.cinematicPlaying,
            params: nextParams,
          };
        },
        { cameraUpdated: isCamKey, resetAnchor: isCamKey, renderImmediate: true },
      );
    },
    [commitState],
  );

  const handleToggleLoop = useCallback(() => {
    if (stateRef.current.capture) return;
    commitState(
      (prev) => {
        const liveParams = engineRef.current
          ? { ...engineRef.current.state.params }
          : prev.params;
        return {
          ...prev,
          cinematicPlaying: !prev.cinematicPlaying,
          params: liveParams,
        };
      },
      { resetAnchor: true, renderImmediate: true },
    );
  }, [commitState]);

  const handleToggleHud = useCallback(() => {
    commitState((prev) => ({ ...prev, hudVisible: !prev.hudVisible }), { renderImmediate: false });
  }, [commitState]);

  const handleToggleAudio = useCallback(async () => {
    if (stateRef.current.capture) return;
    if (!audioRef.current) {
      audioRef.current = new CosmicAudioController();
    }
    const desired = !stateRef.current.audioEnabled;
    const active = await audioRef.current.setEnabled(desired);
    commitState((prev) => ({ ...prev, audioEnabled: active }), { renderImmediate: false });
  }, [commitState]);

  const handleResetAll = useCallback(() => {
    clearPersistedState();
    const defaults = createDefaultState();
    const preservedCapture = stateRef.current.capture;
    if (audioRef.current) {
      audioRef.current.setEnabled(false);
    }
    commitState(
      {
        ...defaults,
        capture: preservedCapture,
        cinematicPlaying: preservedCapture ? false : defaults.cinematicPlaying,
        simTime: preservedCapture ? stateRef.current.simTime : 0,
      },
      { cameraUpdated: true, resetAnchor: true, renderImmediate: true },
    );
    setTelemetry((t) => ({ ...t, simTime: preservedCapture ? stateRef.current.simTime : 0 }));
  }, [commitState]);

  // Mount Three.js Engine + window.__GARGANTUA__ automation interface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    document.documentElement.dataset.gargantuaReady = 'false';

    const engine = new GargantuaEngine(canvas, stateRef.current, {
      onBudgetChange: (budget) => setRenderBudget(budget),
      onCameraInput: ({ cinematicPlaying, preset, params }) => {
        const next = {
          ...stateRef.current,
          cinematicPlaying,
          preset,
          params: sanitizeParams(params, stateRef.current.params),
        };
        stateRef.current = next;
        setAppState(next);
        savePersistedState(next);
      },
      onCameraChange: ({ params, preset }) => {
        const next = {
          ...stateRef.current,
          preset,
          params: sanitizeParams(params, stateRef.current.params),
        };
        stateRef.current = next;
        setAppState(next);
      },
      onCameraInputEnd: ({ params }) => {
        const next = {
          ...stateRef.current,
          params: sanitizeParams(params, stateRef.current.params),
        };
        stateRef.current = next;
        setAppState(next);
        savePersistedState(next);
      },
      onTelemetry: ({ fps, simTime, params }) => {
        setTelemetry({ fps, simTime });
        if (params) {
          const next = { ...stateRef.current, simTime, params };
          stateRef.current = next;
          setAppState(next);
        } else {
          stateRef.current.simTime = simTime;
        }
      },
      onContextLost: () => setContextLost(true),
      onContextRestored: () => setContextLost(false),
    });

    engineRef.current = engine;
    setRenderBudget({ ...engine.renderBudget });

    const api = {};
    Object.defineProperty(api, 'ready', {
      get: () => Boolean(engineRef.current?.ready && !engineRef.current?.contextLost),
      enumerable: true,
      configurable: false,
    });
    api.getState = () => buildSnapshot();
    api.setQuality = (level) => handleSetQuality(level);
    api.setPreset = (index) => handleSetPreset(index);
    api.setDebug = (index) => handleSetDebug(index);
    api.setTime = (seconds) => handleSetTime(seconds);
    api.reset = () => {
      handleResetAll();
      return { ...buildSnapshot(), ok: true };
    };

    window.__GARGANTUA__ = api;
    document.documentElement.dataset.gargantuaReady = engine.ready ? 'true' : 'false';

    return () => {
      document.documentElement.dataset.gargantuaReady = 'false';
      audioRef.current?.dispose();
      audioRef.current = null;
      engine.dispose();
      engineRef.current = null;
      if (window.__GARGANTUA__ === api) {
        delete window.__GARGANTUA__;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global Keyboard Shortcuts: 0-9, Shift+1..Shift+4, Space, H, R, Q, M
  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (
        target &&
        (target.tagName === 'TEXTAREA' ||
          (target.tagName === 'INPUT' && target.type !== 'range'))
      ) {
        return;
      }
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      // Shift+1 .. Shift+4 -> Presets 0..3
      if (event.shiftKey) {
        const shiftPresetMap = {
          Digit1: 0,
          Digit2: 1,
          Digit3: 2,
          Digit4: 3,
        };
        const symbolMap = { '!': 0, '@': 1, '#': 2, $: 3 };
        const presetIdx =
          shiftPresetMap[event.code] ?? symbolMap[event.key] ?? undefined;
        if (presetIdx !== undefined) {
          event.preventDefault();
          handleSetPreset(presetIdx);
          return;
        }
      }

      // 0..9 without Shift -> Debug modes 0..9
      if (!event.shiftKey) {
        if (/^Digit[0-9]$/.test(event.code)) {
          event.preventDefault();
          handleSetDebug(Number(event.code.slice(5)));
          return;
        }
        if (/^Numpad[0-9]$/.test(event.code)) {
          event.preventDefault();
          handleSetDebug(Number(event.code.slice(6)));
          return;
        }
      }

      if (event.code === 'Space') {
        event.preventDefault();
        handleToggleLoop();
        return;
      }

      const lower = event.key.toLowerCase();
      if (lower === 'h') {
        event.preventDefault();
        handleToggleHud();
      } else if (lower === 'r') {
        event.preventDefault();
        handleResetAll();
      } else if (lower === 'q') {
        event.preventDefault();
        handleCycleQuality();
      } else if (lower === 'm') {
        event.preventDefault();
        handleToggleAudio();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    handleCycleQuality,
    handleResetAll,
    handleSetDebug,
    handleSetPreset,
    handleToggleAudio,
    handleToggleHud,
    handleToggleLoop,
  ]);

  const activeDebug = DEBUG_MODES[appState.debug] || DEBUG_MODES[0];
  const activeQuality = QUALITY_PROFILES[appState.quality] || QUALITY_PROFILES.high;

  return (
    <div className="gargantua-stage">
      <canvas ref={canvasRef} className="gargantua-canvas" />

      {contextLost && (
        <div className="context-lost-banner" role="alert">
          <div className="context-lost-card">
            <h2>WebGL 上下文已挂起 · GPU Context Lost</h2>
            <p>
              零测地线渲染循环已安全暂停。当前相机、吸积盘参数、质量档与调试视图均已保留，等待
              GPU 触发恢复信号后自动重建 HDR RenderTarget 与 Shader 资源。
            </p>
            <span className="context-status-pill">
              Standing by for webglcontextrestored…
            </span>
          </div>
        </div>
      )}

      {!appState.hudVisible && !appState.capture && (
        <div className="hud-restore-pill">
          <button type="button" className="hud-btn glass-panel" onClick={handleToggleHud}>
            显示 HUD <span className="kbd-tag">H</span>
          </button>
        </div>
      )}

      {appState.hudVisible && (
        <div className="hud-layer">
          {/* Top-Left Telemetry & Primary Controls */}
          <header className="hud-masthead glass-panel">
            <div className="masthead-top">
              <h1 className="brand-title">GARGANTUA</h1>
              <span className="brand-subtitle">
                SCHWARZSCHILD NULL-GEODESIC RAYTRACER · r_s = 2GM/c²
              </span>
            </div>

            <div className="telemetry-pills">
              <button
                type="button"
                className="hud-btn active"
                onClick={handleCycleQuality}
                title="切换渲染质量档 (Q)"
              >
                质量: {activeQuality.label} ({activeQuality.labelZh})
                <span className="kbd-tag">Q</span>
              </button>

              <button
                type="button"
                className={`hud-btn ${appState.cinematicPlaying ? 'cyan-active' : ''}`}
                onClick={handleToggleLoop}
                title="播放/暂停电影镜头循环 (Space)"
              >
                镜头: {appState.cinematicPlaying ? '巡航中 Loop' : '手动 Orbit'}
                <span className="kbd-tag">Space</span>
              </button>

              <button
                type="button"
                className={`hud-btn ${appState.audioEnabled ? 'active' : ''}`}
                onClick={handleToggleAudio}
                title="程序化深空管风琴氛围音 (M)"
              >
                音效: {appState.audioEnabled ? '开启' : '静音'}
                <span className="kbd-tag">M</span>
              </button>

              <button
                type="button"
                className="hud-btn"
                onClick={handleResetAll}
                title="恢复默认参数与视角 (R)"
              >
                重置 <span className="kbd-tag">R</span>
              </button>

              <button
                type="button"
                className="hud-btn"
                onClick={handleToggleHud}
                title="隐藏/显示 HUD (H)"
              >
                隐藏 <span className="kbd-tag">H</span>
              </button>

              <button
                type="button"
                className={`hud-btn mobile-only ${appState.drawerOpen ? 'active' : ''}`}
                onClick={() =>
                  setAppState((prev) => ({ ...prev, drawerOpen: !prev.drawerOpen }))
                }
              >
                参数抽屉 ({PARAM_SPECS.length})
              </button>
            </div>

            <div className="telemetry-meta">
              <span>
                <strong>{telemetry.fps}</strong> FPS
              </span>
              <span>
                Render <strong>{renderBudget.width}×{renderBudget.height}</strong>
              </span>
              <span>
                RK4 <strong>{renderBudget.maxSteps}</strong> steps
              </span>
              <span>
                Bloom <strong>{renderBudget.bloomMips}</strong> mips
              </span>
              <span>
                t = <strong>{telemetry.simTime.toFixed(1)}s</strong>
              </span>
              <span>拖拽旋转 · 滚轮/双指缩放</span>
            </div>
          </header>

          {/* Bottom-Left Camera Presets & 0-9 Debug Selector */}
          <section className="hud-bottom-left glass-panel" aria-label="视角预设与调试视图">
            <div className="strip-label-row">
              <span>视角预设 · Camera Presets</span>
              <span>Shift+1 – Shift+4</span>
            </div>

            <div className="preset-grid">
              {CAMERA_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`preset-btn ${appState.preset === preset.index ? 'active' : ''}`}
                  onClick={() => handleSetPreset(preset.index)}
                >
                  <span className="preset-top">
                    <span>0{preset.index + 1}</span>
                    <span>{preset.code}</span>
                  </span>
                  <span className="preset-name">{preset.nameZh}</span>
                  <span className="preset-sub">{preset.name}</span>
                </button>
              ))}
            </div>

            <div className="debug-bar">
              <div className="debug-buttons">
                {DEBUG_MODES.map((mode) => (
                  <button
                    key={mode.index}
                    type="button"
                    className={`debug-btn ${appState.debug === mode.index ? 'active' : ''}`}
                    onClick={() => handleSetDebug(mode.index)}
                    title={`${mode.index}: ${mode.nameZh} (${mode.name})`}
                  >
                    {mode.key}
                  </button>
                ))}
              </div>
              <div className="debug-readout">
                <strong>[{activeDebug.index}] {activeDebug.nameZh} ({activeDebug.name})</strong>
                {' — '}
                {activeDebug.desc}
              </div>
            </div>
          </section>

          {/* Right-Side Collapsible Parameter Drawer (22 Controls + Shortcut Guide) */}
          <aside
            className={`hud-inspector glass-panel ${appState.drawerOpen ? 'drawer-open' : ''}`}
            aria-label="物理与后处理参数控制面板"
          >
            <div className="inspector-header">
              <span className="inspector-title">
                参数控制台 · {PARAM_SPECS.length} Controls
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button type="button" className="hud-btn" onClick={handleResetAll}>
                  全部复位
                </button>
                <button
                  type="button"
                  className="hud-btn mobile-only"
                  onClick={() => setAppState((prev) => ({ ...prev, drawerOpen: false }))}
                >
                  收起
                </button>
              </div>
            </div>

            <div className="inspector-scroll">
              {PARAM_GROUPS.map((group) => {
                const groupSpecs = PARAM_SPECS.filter((s) => s.group === group.id);
                return (
                  <div key={group.id} className="param-section">
                    <div className="param-section-title">
                      <span>{group.labelZh}</span>
                      <span>{group.label}</span>
                    </div>
                    {groupSpecs.map((spec) => {
                      const val = appState.params[spec.key];
                      return (
                        <div key={spec.key} className="param-row">
                          <div className="param-label-line">
                            <label htmlFor={`ctrl-${spec.key}`} className="param-label">
                              {spec.label}
                            </label>
                            <span className="param-val">
                              {Number(val).toFixed(spec.digits)}
                              {spec.unit ? ` ${spec.unit}` : ''}
                            </span>
                          </div>
                          <input
                            id={`ctrl-${spec.key}`}
                            className="param-slider"
                            type="range"
                            min={spec.min}
                            max={spec.max}
                            step={spec.step}
                            value={val}
                            onChange={(e) => handleParamChange(spec.key, e.target.value)}
                            onDoubleClick={() => handleParamChange(spec.key, spec.default)}
                            title="双击恢复单项默认值"
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div className="shortcuts-card">
                <div className="shortcuts-title">快捷键 · Shortcuts</div>
                <div className="shortcut-list">
                  <div className="shortcut-item">
                    <span>调试视图</span>
                    <span className="kbd-tag">0 – 9</span>
                  </div>
                  <div className="shortcut-item">
                    <span>视角预设</span>
                    <span className="kbd-tag">Shift+1–4</span>
                  </div>
                  <div className="shortcut-item">
                    <span>电影镜头</span>
                    <span className="kbd-tag">Space</span>
                  </div>
                  <div className="shortcut-item">
                    <span>质量切换</span>
                    <span className="kbd-tag">Q</span>
                  </div>
                  <div className="shortcut-item">
                    <span>显隐 HUD</span>
                    <span className="kbd-tag">H</span>
                  </div>
                  <div className="shortcut-item">
                    <span>重置参数</span>
                    <span className="kbd-tag">R</span>
                  </div>
                  <div className="shortcut-item">
                    <span>氛围音乐</span>
                    <span className="kbd-tag">M</span>
                  </div>
                  <div className="shortcut-item">
                    <span>单项复位</span>
                    <span className="kbd-tag">双击滑块</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
