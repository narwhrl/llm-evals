import React from 'react';
import {
  DEBUG_MODES,
  KEYBOARD_SHORTCUTS,
  PARAMETER_SPECS,
  PARAM_GROUPS,
  PRESETS,
  QUALITY_LEVELS,
  QUALITY_PROFILES,
} from '../config/constants.js';

function formatParamValue(spec, value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return String(spec.defaultValue);
  return `${num.toFixed(spec.decimals)}${spec.unit ? ` ${spec.unit}` : ''}`;
}

export function Hud({
  state,
  telemetry,
  captureMode,
  contextLost,
  onToggleHudExpanded,
  onToggleHudVisible,
  onToggleCinematic,
  onSelectPreset,
  onSelectQuality,
  onCycleQuality,
  onSelectDebug,
  onChangeParam,
  onResetParam,
  onResetAll,
  onToggleAudio,
}) {
  const activeQuality = QUALITY_PROFILES[state.quality] || QUALITY_PROFILES.high;
  const activeDebug = DEBUG_MODES[state.debugMode] || DEBUG_MODES[0];

  if (contextLost) {
    return (
      <div className="context-lost-overlay" role="alert" aria-live="assertive">
        <div className="context-lost-card">
          <div className="context-lost-badge">WEBGL CONTEXT INTERRUPTED</div>
          <h2>WebGL 渲染上下文已丢失</h2>
          <p>
            已安全暂停测地线积分渲染并完整保留您的当前参数与持久化状态。等待浏览器恢复 GPU
            上下文后，系统将自动重建着色器、HDR 缓冲与 Bloom 管线并继续渲染，无需刷新页面。
          </p>
          <div className="context-lost-meta">
            <span>质量档：{activeQuality.label}</span>
            <span>视图：[{activeDebug.index}] {activeDebug.name}</span>
            <span>视角预设：#{state.preset + 1}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!state.hudVisible) {
    return null;
  }

  return (
    <div className="hud-root" data-expanded={state.hudExpanded ? 'true' : 'false'}>
      {/* Top-left non-occluding telemetry header */}
      <header className="hud-header glass-panel">
        <div className="hud-brand">
          <span className="hud-title">GARGANTUA</span>
          <span className="hud-subtitle">SCHWARZSCHILD NULL-GEODESIC RAYTRACER</span>
        </div>

        <div className="hud-status-row">
          <span className="status-pill accent" data-testid="hud-quality-badge">
            {activeQuality.label}
          </span>
          <span className="status-pill cyan" data-testid="hud-debug-badge">
            [{activeDebug.index}] {activeDebug.shortName}
          </span>
          <span className={`status-pill ${state.cinematicMode ? 'live' : 'muted'}`} data-testid="hud-cinematic-badge">
            {captureMode ? 'CAPTURE' : state.cinematicMode ? 'CINEMATIC' : 'MANUAL'}
          </span>
          {telemetry && telemetry.internalWidth > 1 && (
            <span className="status-pill mono" title="Internal raytrace target & RK4 step budget">
              {telemetry.internalWidth}×{telemetry.internalHeight} · {telemetry.maxSteps}stp
              {telemetry.fps > 0 ? ` · ${telemetry.fps}fps` : ''}
            </span>
          )}
        </div>

        <p className="hud-debug-caption" data-testid="hud-debug-description">
          <strong>视图 {activeDebug.index} · {activeDebug.name}：</strong>
          {activeDebug.description}
        </p>
      </header>

      {/* Top-right drawer toggle button */}
      <div className="hud-top-actions">
        <button
          type="button"
          className="icon-pill-btn glass-panel"
          onClick={onToggleHudExpanded}
          aria-expanded={state.hudExpanded}
          data-testid="toggle-controls-btn"
        >
          {state.hudExpanded ? '收起面板 ✕' : '参数与调试 ☰'}
        </button>
      </div>

      {/* Bottom-left quick dock: presets & core actions */}
      <section className="hud-dock glass-panel" aria-label="视角预设与快捷操作">
        <div className="dock-presets" role="group" aria-label="视角预设">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`dock-btn ${state.preset === preset.index ? 'active' : ''}`}
              onClick={() => onSelectPreset(preset.index)}
              title={`${preset.name} (${preset.description}) [Shift+${preset.index + 1}]`}
              data-testid={`preset-btn-${preset.index}`}
            >
              <span className="key-hint">⇧{preset.index + 1}</span>
              <span>{preset.zhName}</span>
            </button>
          ))}
        </div>

        <div className="dock-actions">
          <button
            type="button"
            className={`dock-btn ${state.cinematicMode ? 'active-soft' : ''}`}
            onClick={onToggleCinematic}
            disabled={captureMode}
            title="播放 / 暂停电影镜头循环 [Space]"
            data-testid="cinematic-toggle-btn"
          >
            <span className="key-hint">Space</span>
            <span>{state.cinematicMode ? '暂停镜头' : '电影循环'}</span>
          </button>

          <button
            type="button"
            className="dock-btn"
            onClick={onCycleQuality}
            title="切换渲染质量档 [Q]"
            data-testid="quality-cycle-btn"
          >
            <span className="key-hint">Q</span>
            <span>{activeQuality.label}</span>
          </button>

          <button
            type="button"
            className={`dock-btn ${state.audioEnabled ? 'active-soft' : ''}`}
            onClick={onToggleAudio}
            disabled={captureMode}
            title="程序化深空氛围音频（可选）[M]"
            data-testid="audio-toggle-btn"
          >
            <span className="key-hint">M</span>
            <span>{state.audioEnabled ? '音频开' : '静音'}</span>
          </button>

          <button
            type="button"
            className="dock-btn danger"
            onClick={onResetAll}
            title="重置全部参数与持久化状态 [R]"
            data-testid="reset-all-btn"
          >
            <span className="key-hint">R</span>
            <span>重置</span>
          </button>

          <button
            type="button"
            className="dock-btn"
            onClick={onToggleHudVisible}
            title="隐藏 HUD（再按 H 恢复）[H]"
            data-testid="hide-hud-btn"
          >
            <span className="key-hint">H</span>
            <span>隐藏</span>
          </button>
        </div>

        <div className="dock-hint">
          拖拽旋转 · 滚轮/双指缩放 · <span>0–9</span> 调试 · <span>⇧1–4</span> 预设 ·{' '}
          <span>Space</span> 镜头 · <span>H</span> HUD
        </div>
      </section>

      {/* Collapsible right sidebar (desktop) / bottom-slide drawer (mobile) */}
      {state.hudExpanded && (
        <aside className="hud-drawer glass-panel" aria-label="物理参数与诊断控制面板">
          <div className="drawer-scroll">
            {/* Quality profile selector */}
            <div className="drawer-section">
              <div className="section-heading">
                <span>渲染质量预算</span>
                <span className="section-sub">QUALITY [Q]</span>
              </div>
              <div className="quality-grid">
                {QUALITY_LEVELS.map((qId) => {
                  const prof = QUALITY_PROFILES[qId];
                  return (
                    <button
                      key={qId}
                      type="button"
                      className={`seg-btn ${state.quality === qId ? 'active' : ''}`}
                      onClick={() => onSelectQuality(qId)}
                      title={prof.description}
                      data-testid={`quality-btn-${qId}`}
                    >
                      <strong>{prof.label}</strong>
                      <small>
                        {Math.round(prof.renderScale * 100)}% · {prof.maxSteps}stp
                      </small>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 10 Diagnostic Debug Views (0-9) */}
            <div className="drawer-section">
              <div className="section-heading">
                <span>调试诊断视图</span>
                <span className="section-sub">DEBUG [0–9]</span>
              </div>
              <div className="debug-grid">
                {DEBUG_MODES.map((dm) => (
                  <button
                    key={dm.index}
                    type="button"
                    className={`debug-btn ${state.debugMode === dm.index ? 'active' : ''}`}
                    onClick={() => onSelectDebug(dm.index)}
                    title={`${dm.name} — ${dm.description}`}
                    data-testid={`debug-btn-${dm.index}`}
                  >
                    <span className="debug-idx">{dm.index}</span>
                    <span className="debug-name">{dm.shortName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* All 21 Parameter Controls grouped cleanly */}
            {PARAM_GROUPS.map((group) => {
              const specs = PARAMETER_SPECS.filter((s) => s.group === group.id);
              return (
                <div className="drawer-section" key={group.id}>
                  <div className="section-heading">
                    <span>{group.title}</span>
                    <span className="section-sub">{group.enTitle}</span>
                  </div>
                  <div className="param-list">
                    {specs.map((spec) => {
                      const val = state.params[spec.key];
                      const isModified = Math.abs(val - spec.defaultValue) > spec.step * 0.25;
                      return (
                        <div className="param-row" key={spec.key}>
                          <div className="param-top">
                            <label htmlFor={`param-${spec.key}`} className="param-label">
                              {spec.label}
                            </label>
                            <div className="param-right">
                              <span className="param-value">{formatParamValue(spec, val)}</span>
                              {isModified && (
                                <button
                                  type="button"
                                  className="param-reset-dot"
                                  onClick={() => onResetParam(spec.key)}
                                  title={`恢复默认 (${formatParamValue(spec, spec.defaultValue)})`}
                                  aria-label={`恢复 ${spec.label} 默认值`}
                                >
                                  ↺
                                </button>
                              )}
                            </div>
                          </div>
                          <input
                            id={`param-${spec.key}`}
                            data-testid={`param-slider-${spec.key}`}
                            className="param-slider"
                            type="range"
                            min={spec.min}
                            max={spec.max}
                            step={spec.step}
                            value={val}
                            onChange={(e) => onChangeParam(spec.key, Number(e.target.value))}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Keyboard shortcuts reference */}
            <div className="drawer-section">
              <div className="section-heading">
                <span>快捷键指南</span>
                <span className="section-sub">SHORTCUTS</span>
              </div>
              <div className="shortcut-list">
                {KEYBOARD_SHORTCUTS.map((sc) => (
                  <div className="shortcut-item" key={sc.keys}>
                    <kbd>{sc.keys}</kbd>
                    <span>{sc.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="drawer-footer">
            <button type="button" className="footer-reset-btn" onClick={onResetAll}>
              重置全部参数与默认视角 (R)
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
