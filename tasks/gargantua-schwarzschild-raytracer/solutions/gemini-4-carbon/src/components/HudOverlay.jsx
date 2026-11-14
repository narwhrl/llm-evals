import React from 'react';
import {
  CAMERA_PRESETS,
  DEBUG_MODES,
  PARAMETER_GROUPS,
  PARAMETER_DEFS,
  QUALITY_PROFILES,
} from '../config/stateSchema.js';

function formatValue(def, val) {
  if (val === undefined || val === null || Number.isNaN(val)) return '';
  if (def.step >= 10) return `${Math.round(val)}${def.unit}`;
  if (def.step >= 0.5) return `${Number(val).toFixed(1)}${def.unit}`;
  if (def.step >= 0.01) return `${Number(val).toFixed(2)}${def.unit}`;
  return `${Number(val).toFixed(3)}${def.unit}`;
}

export function HudOverlay({
  hudVisible,
  capture,
  drawerCollapsed,
  quality,
  budget,
  preset,
  debug,
  cinematicPlaying,
  audioEnabled,
  fps,
  params,
  contextLost,
  onToggleHud,
  onToggleDrawer,
  onCycleQuality,
  onSelectQuality,
  onSelectPreset,
  onSelectDebug,
  onTogglePlay,
  onToggleAudio,
  onParamChange,
  onResetParam,
  onResetAll,
}) {
  const activeDebug = DEBUG_MODES[debug] || DEBUG_MODES[0];
  const activePreset = CAMERA_PRESETS[preset] || CAMERA_PRESETS[0];
  const activeQuality = QUALITY_PROFILES[quality] || QUALITY_PROFILES.high;

  return (
    <>
      {contextLost && (
        <div className="context-lost-banner" role="alert" data-testid="webgl-context-lost">
          <div className="context-lost-card">
            <div className="context-lost-badge">GPU CONTEXT INTERRUPTED · PAUSED</div>
            <h2>WebGL 上下文已丢失，渲染已安全暂停</h2>
            <p>
              当前相机视角、质量档与全部参数状态均已保留。等待浏览器触发{' '}
              <code>webglcontextrestored</code> 后将自动重建 Framebuffer 与 Shader 并恢复实时光线追踪。
            </p>
          </div>
        </div>
      )}

      {!hudVisible && !capture && (
        <button
          type="button"
          className="hud-restore-pill"
          onClick={onToggleHud}
          title="显示 HUD (H)"
          aria-label="显示 HUD"
        >
          HUD <span>[H]</span>
        </button>
      )}

      {hudVisible && (
        <div className="hud-root" data-testid="gargantua-hud">
          {/* Top-Left Telemetry & Action Bar */}
          <header className="hud-panel hud-telemetry">
            <div className="brand-row">
              <div>
                <h1 className="brand-title">GARGANTUA</h1>
                <p className="brand-subtitle">SCHWARZSCHILD NULL-GEODESIC RAYTRACER</p>
              </div>
              <div className="telemetry-metrics">
                <span className="metric-chip" title="当前帧率">
                  {capture ? 'LOCKED' : `${fps} FPS`}
                </span>
                <span className="metric-chip" title="观察者史瓦西径向坐标">
                  r = {Number(params.camDistance).toFixed(1)} rₛ
                </span>
              </div>
            </div>

            <div className="status-strip">
              <span className={`status-pill quality-${quality}`}>
                品质: {activeQuality.label.toUpperCase()} ({budget?.internalWidth || 0}×
                {budget?.internalHeight || 0} · {budget?.maxSteps || 0} steps)
              </span>
              <span className="status-pill">
                镜头: {capture ? 'CAPTURE 冻结' : cinematicPlaying ? '电影巡航' : '手动控制'}
              </span>
            </div>

            <div className="debug-readout" data-testid="debug-readout">
              <div className="debug-readout-title">
                <span className="debug-index-badge">VIEW {activeDebug.index}</span>
                <strong>{activeDebug.name}</strong>
              </div>
              <p className="debug-readout-desc">{activeDebug.description}</p>
            </div>

            <div className="action-toolbar">
              <button
                type="button"
                className={`hud-btn ${cinematicPlaying ? 'active' : ''}`}
                onClick={onTogglePlay}
                disabled={capture}
                title="播放/暂停电影镜头 (Space)"
              >
                {cinematicPlaying ? '⏸ 暂停巡航' : '▶ 镜头巡航'} <kbd>Space</kbd>
              </button>
              <button
                type="button"
                className="hud-btn"
                onClick={onCycleQuality}
                title="切换渲染品质档 (Q)"
              >
                品质: {activeQuality.zhLabel} <kbd>Q</kbd>
              </button>
              <button
                type="button"
                className={`hud-btn ${audioEnabled ? 'active' : ''}`}
                onClick={onToggleAudio}
                disabled={capture}
                title="引力深空环境音合成 (M)"
              >
                {audioEnabled ? '🔊 音效开' : '🔇 音效关'} <kbd>M</kbd>
              </button>
              <button
                type="button"
                className="hud-btn danger-subtle"
                onClick={onResetAll}
                title="重置全部参数与视角 (R)"
              >
                ↺ 重置 <kbd>R</kbd>
              </button>
              <button
                type="button"
                className={`hud-btn ${!drawerCollapsed ? 'active' : ''}`}
                onClick={onToggleDrawer}
                title="展开/收起参数控制台"
              >
                {drawerCollapsed ? '☰ 参数面板' : '✕ 收起面板'}
              </button>
              <button
                type="button"
                className="hud-btn"
                onClick={onToggleHud}
                title="隐藏/显示 HUD (H)"
              >
                隐藏 <kbd>H</kbd>
              </button>
            </div>
          </header>

          {/* Bottom-Left Dock: 4 Camera Presets & 0-9 Debug Selector */}
          <section className="hud-panel hud-dock" aria-label="视角预设与诊断模式">
            <div className="dock-section">
              <div className="dock-header">
                <span>视角预设 · CAMERA PRESETS</span>
                <span className="dock-hint">{activePreset.description}</span>
              </div>
              <div className="preset-grid">
                {CAMERA_PRESETS.map((item) => (
                  <button
                    key={item.index}
                    type="button"
                    data-preset-btn={item.index}
                    className={`preset-btn ${preset === item.index ? 'active' : ''}`}
                    onClick={() => onSelectPreset(item.index)}
                    title={`${item.zhName} (${item.shortcut}) — ${item.description}`}
                  >
                    <span className="preset-top">
                      <strong>{item.zhName}</strong>
                      <kbd>{item.shortcut}</kbd>
                    </span>
                    <span className="preset-sub">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="dock-section">
              <div className="dock-header">
                <span>诊断视图 · DEBUG MODES (0–9)</span>
                <span className="dock-hint">拖拽旋转 · 滚轮/双指缩放</span>
              </div>
              <div className="debug-pill-row">
                {DEBUG_MODES.map((mode) => (
                  <button
                    key={mode.index}
                    type="button"
                    data-debug-btn={mode.index}
                    className={`debug-pill ${debug === mode.index ? 'active' : ''}`}
                    onClick={() => onSelectDebug(mode.index)}
                    title={`${mode.index}: ${mode.name}`}
                  >
                    <kbd>{mode.index}</kbd>
                    <span>{mode.short}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Right-Side / Mobile-Drawer Collapsible Parameter Inspector (22 Controls) */}
          <aside
            className={`hud-panel hud-drawer ${drawerCollapsed ? 'collapsed' : 'open'}`}
            aria-label="物理与渲染参数面板"
          >
            <div className="drawer-topbar">
              <div>
                <h2 className="drawer-title">参数控制台 · {PARAMETER_DEFS.length} CONTROLS</h2>
                <p className="drawer-subtitle">双击单项标签可单独复位 · 自动版本化保存</p>
              </div>
              <div className="drawer-quality-tabs" role="group" aria-label="质量档选择">
                {['standard', 'high', 'cinematic'].map((qKey) => (
                  <button
                    key={qKey}
                    type="button"
                    className={`mini-tab ${quality === qKey ? 'active' : ''}`}
                    onClick={() => onSelectQuality(qKey)}
                  >
                    {QUALITY_PROFILES[qKey].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="drawer-scroll">
              {PARAMETER_GROUPS.map((group) => {
                const items = PARAMETER_DEFS.filter((d) => d.group === group.id);
                return (
                  <div key={group.id} className="param-group">
                    <h3 className="param-group-title">{group.label}</h3>
                    <div className="param-list">
                      {items.map((def) => {
                        const val = params[def.key];
                        const isModified = Math.abs(val - def.defaultValue) > def.step * 0.25;
                        return (
                          <div key={def.key} className="param-row">
                            <div
                              className="param-label-row"
                              onDoubleClick={() => onResetParam(def.key)}
                              title="双击恢复此项默认值"
                            >
                              <label htmlFor={`param-${def.key}`} className="param-label">
                                {def.label}
                                {isModified && <span className="modified-dot" title="已修改" />}
                              </label>
                              <output htmlFor={`param-${def.key}`} className="param-value">
                                {formatValue(def, val)}
                              </output>
                            </div>
                            <input
                              id={`param-${def.key}`}
                              data-param-key={def.key}
                              type="range"
                              min={def.min}
                              max={def.max}
                              step={def.step}
                              value={val}
                              onChange={(e) => onParamChange(def.key, Number(e.target.value))}
                              className="param-slider"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="shortcuts-box">
                <h3 className="param-group-title">快捷键一览 · SHORTCUTS</h3>
                <ul className="shortcut-list">
                  <li>
                    <kbd>0</kbd>–<kbd>9</kbd> <span>切换 10 种物理/渲染诊断视图</span>
                  </li>
                  <li>
                    <kbd>Shift+1</kbd>–<kbd>Shift+4</kbd> <span>切换 4 个电影机位预设</span>
                  </li>
                  <li>
                    <kbd>Space</kbd> <span>播放 / 暂停电影镜头巡航</span>
                  </li>
                  <li>
                    <kbd>Q</kbd> <span>循环切换 Standard / High / Cinematic 质量档</span>
                  </li>
                  <li>
                    <kbd>H</kbd> <span>显示 / 隐藏 HUD 界面</span>
                  </li>
                  <li>
                    <kbd>R</kbd> <span>重置全部参数、视角与默认状态</span>
                  </li>
                  <li>
                    <kbd>M</kbd> <span>开启 / 关闭本地程序化深空环境音效</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
