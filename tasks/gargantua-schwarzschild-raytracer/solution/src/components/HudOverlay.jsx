import React, { useState } from 'react';
import {
  CAMERA_PRESETS,
  DEBUG_VIEWS,
  PARAM_DEFS,
  PARAM_GROUPS,
  QUALITY_ORDER,
  QUALITY_PROFILES,
  SHORTCUT_LIST,
} from '../config/constants.js';
import {
  AlertIcon,
  ChevronIcon,
  EyeIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
  SlidersIcon,
  SoundOffIcon,
  SoundOnIcon,
} from './Icons.jsx';

function formatParamDisplay(def, value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return `${def.defaultValue}${def.unit}`;
  return `${num.toFixed(def.decimals)}${def.unit}`;
}

export function HudOverlay({
  hudVisible,
  captureMode,
  contextLost,
  quality,
  preset,
  debug,
  cinematicPlaying,
  audioEnabled,
  params,
  budget,
  onToggleHud,
  onCycleQuality,
  onSelectQuality,
  onSelectPreset,
  onSelectDebug,
  onToggleCinematic,
  onToggleAudio,
  onParamChange,
  onParamReset,
  onResetAll,
}) {
  // Desktop starts with inspector expanded; narrow viewports start drawer collapsed so black hole is unobstructed
  const [inspectorOpen, setInspectorOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth > 860;
  });
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const activeDebug = DEBUG_VIEWS[debug] || DEBUG_VIEWS[0];
  const activeQuality = QUALITY_PROFILES[quality] || QUALITY_PROFILES.high;
  const activePreset = CAMERA_PRESETS[preset] || CAMERA_PRESETS[0];

  const cameraModeText = captureMode
    ? '冻结快照 CAPTURE'
    : cinematicPlaying
      ? '电影巡航 CINEMATIC'
      : '手动轨道 MANUAL';

  return (
    <>
      {/* Recoverable WebGL Context Loss Banner (always visible if context is lost) */}
      {contextLost && (
        <div className="context-lost-banner" role="status" aria-live="polite">
          <div className="context-lost-card">
            <div className="context-lost-header">
              <AlertIcon />
              <h2>WebGL 渲染上下文已暂停</h2>
            </div>
            <p>
              检测到浏览器 GPU 上下文丢失（<code>webglcontextlost</code>）。渲染循环已安全挂起，当前全部 21
              项物理参数、预设与质量档位已完整保留，等待图形驱动恢复上下文后自动重建帧缓冲与着色器资源。
            </p>
          </div>
        </div>
      )}

      {/* Minimal restore button when HUD is hidden in interactive sessions */}
      {!hudVisible && !captureMode && (
        <div className="hud-restore-pill">
          <button
            type="button"
            className="hud-btn hud-btn-pill"
            onClick={onToggleHud}
            title="显示 HUD 面板 (H)"
            aria-label="显示 HUD 面板"
          >
            <EyeIcon />
            <span>显示 HUD</span>
            <kbd>H</kbd>
          </button>
        </div>
      )}

      {hudVisible && (
        <div className="hud-layer">
          {/* Top Telemetry & Primary Action Strip */}
          <header className="hud-topbar">
            <div className="hud-top-left">
              <div className="brand-cluster">
                <div className="brand-title-row">
                  <h1 className="brand-title">GARGANTUA</h1>
                  <span className="brand-sub">Schwarzschild Geodesic Raytracer</span>
                </div>
                <div className="telemetry-strip" aria-label="实时渲染状态">
                  <span className="telemetry-chip is-accent">
                    质量 {activeQuality.label} ({activeQuality.zhLabel})
                  </span>
                  {budget ? (
                    <span className="telemetry-chip">
                      {budget.internalWidth}×{budget.internalHeight} · {budget.maxSteps} 步 RK4
                    </span>
                  ) : null}
                  <span className="telemetry-chip">镜头: {cameraModeText}</span>
                  <span className={`telemetry-chip ${debug > 0 ? 'is-diag' : ''}`}>
                    视图 [{activeDebug.index}] {activeDebug.name}
                  </span>
                </div>
              </div>

              {debug > 0 && (
                <div className="debug-callout is-highlighted" role="status">
                  <span className="debug-badge">DEBUG {activeDebug.index}</span>
                  <strong className="debug-title">{activeDebug.name}</strong>
                  <span className="debug-desc">{activeDebug.description}</span>
                </div>
              )}
            </div>

            <div className="top-actions" role="toolbar" aria-label="全局控制">
              <button
                type="button"
                className={`hud-btn ${cinematicPlaying ? 'is-active' : ''}`}
                onClick={onToggleCinematic}
                title="播放或暂停电影镜头循环 (Space)"
              >
                {cinematicPlaying ? <PauseIcon /> : <PlayIcon />}
                <span>{cinematicPlaying ? '暂停镜头' : '播放镜头'}</span>
                <kbd>Space</kbd>
              </button>

              <button
                type="button"
                className="hud-btn"
                onClick={onCycleQuality}
                title="切换渲染质量档位 (Q)"
              >
                <span>画质: {activeQuality.label}</span>
                <kbd>Q</kbd>
              </button>

              <button
                type="button"
                className={`hud-btn ${audioEnabled ? 'is-active' : ''}`}
                onClick={onToggleAudio}
                title="切换程序化深空环境音效 (M)"
                aria-pressed={audioEnabled}
              >
                {audioEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
                <span className="hide-compact">{audioEnabled ? '音效开' : '音效关'}</span>
                <kbd>M</kbd>
              </button>

              <button
                type="button"
                className="hud-btn"
                onClick={onResetAll}
                title="重置全部参数、视角与默认状态 (R)"
              >
                <ResetIcon />
                <span className="hide-compact">重置</span>
                <kbd>R</kbd>
              </button>

              <button
                type="button"
                className={`hud-btn inspector-toggle-btn ${inspectorOpen ? 'is-active' : ''}`}
                onClick={() => setInspectorOpen((v) => !v)}
                aria-expanded={inspectorOpen}
                title="展开或收起 21 项物理与光学参数抽屉"
              >
                <SlidersIcon />
                <span>参数面板</span>
                <ChevronIcon expanded={inspectorOpen} />
              </button>

              <button
                type="button"
                className="hud-btn"
                onClick={onToggleHud}
                title="隐藏 HUD (H)"
                aria-label="隐藏 HUD"
              >
                <EyeIcon off />
                <kbd>H</kbd>
              </button>
            </div>
          </header>

          {/* Bottom-Left Camera Presets, Debug Selector & Interaction Hints */}
          <section className="hud-bottom-left" aria-label="视角预设与调试模式">
            <div className="panel-block">
              <div className="block-header">
                <span className="block-title">相机视角预设</span>
                <span className="block-hint">拖拽旋转 · 滚轮/双指缩放 · Shift+1–4</span>
              </div>
              <div className="preset-grid" role="group" aria-label="视角预设选择">
                {CAMERA_PRESETS.map((item) => {
                  const selected = preset === item.index;
                  return (
                    <button
                      key={item.index}
                      type="button"
                      className={`preset-btn ${selected ? 'is-selected' : ''}`}
                      onClick={() => onSelectPreset(item.index)}
                      title={`${item.name} (${item.shortcut}) — ${item.summary}`}
                      aria-pressed={selected}
                    >
                      <span className="preset-name">{item.name}</span>
                      <kbd>{item.shortcut}</kbd>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="panel-block">
              <div className="block-header">
                <span className="block-title">诊断视图 (0–9)</span>
                <button
                  type="button"
                  className="text-link-btn"
                  onClick={() => setShortcutsOpen((v) => !v)}
                  aria-expanded={shortcutsOpen}
                >
                  {shortcutsOpen ? '收起快捷键' : '快捷键列表'}
                </button>
              </div>
              <div className="debug-strip" role="group" aria-label="0 至 9 调试视图切换">
                {DEBUG_VIEWS.map((d) => {
                  const selected = debug === d.index;
                  return (
                    <button
                      key={d.index}
                      type="button"
                      className={`debug-pill ${selected ? 'is-selected' : ''}`}
                      onClick={() => onSelectDebug(d.index)}
                      title={`${d.index}: ${d.name} — ${d.description}`}
                      aria-pressed={selected}
                    >
                      {d.index}
                    </button>
                  );
                })}
              </div>

              {shortcutsOpen && (
                <ul className="shortcut-legend" aria-label="键盘快捷键说明">
                  {SHORTCUT_LIST.map((sc) => (
                    <li key={sc.keys}>
                      <kbd>{sc.keys}</kbd>
                      <span>{sc.action}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Collapsible Right Dock / Mobile Drawer: Quality Selector + All 21 Controls */}
          <aside
            className={`hud-inspector ${inspectorOpen ? 'is-open' : 'is-collapsed'}`}
            aria-label="物理与后处理参数控制台"
          >
            <div className="inspector-header">
              <div>
                <h2 className="inspector-title">物理与光学参数</h2>
                <p className="inspector-subtitle">
                  当前预设: {activePreset.name} · 双击滑块可单项复位
                </p>
              </div>
              <button
                type="button"
                className="hud-btn hud-btn-compact"
                onClick={onResetAll}
                title="恢复全部默认参数 (R)"
              >
                <ResetIcon />
                <span>全部复位</span>
              </button>
            </div>

            <div className="inspector-scroll">
              {/* Quality Tier Direct Segmented Control */}
              <div className="inspector-section">
                <div className="section-heading-row">
                  <h3 className="section-heading">渲染质量档位</h3>
                  <span className="section-meta">快捷键 Q</span>
                </div>
                <div className="quality-segmented" role="group" aria-label="渲染质量档位">
                  {QUALITY_ORDER.map((qId) => {
                    const q = QUALITY_PROFILES[qId];
                    const active = quality === qId;
                    return (
                      <button
                        key={qId}
                        type="button"
                        className={`quality-seg-btn ${active ? 'is-selected' : ''}`}
                        onClick={() => onSelectQuality(qId)}
                        aria-pressed={active}
                      >
                        <strong>{q.label}</strong>
                        <span>{q.maxSteps} 步</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* All 21 Required Parameters Grouped Clearly */}
              {PARAM_GROUPS.map((grp) => {
                const defs = PARAM_DEFS.filter((d) => d.group === grp.id);
                return (
                  <div className="inspector-section" key={grp.id}>
                    <div className="section-heading-row">
                      <h3 className="section-heading">{grp.label}</h3>
                      <span className="section-meta">{grp.enLabel}</span>
                    </div>
                    <div className="param-list">
                      {defs.map((def) => {
                        const val = params[def.key];
                        const pct = ((val - def.min) / Math.max(def.max - def.min, 1e-6)) * 100;
                        return (
                          <div className="param-row" key={def.key}>
                            <div className="param-label-row">
                              <label htmlFor={`param-${def.key}`} className="param-label">
                                {def.label}
                              </label>
                              <output htmlFor={`param-${def.key}`} className="param-value">
                                {formatParamDisplay(def, val)}
                              </output>
                            </div>
                            <input
                              id={`param-${def.key}`}
                              name={def.key}
                              type="range"
                              className="param-slider"
                              min={def.min}
                              max={def.max}
                              step={def.step}
                              value={val}
                              style={{ '--fill-pct': `${Math.max(0, Math.min(100, pct))}%` }}
                              onChange={(e) => onParamChange(def.key, Number(e.target.value))}
                              onDoubleClick={() => onParamReset(def.key)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Always-discoverable Shortcut Summary inside Drawer */}
              <div className="inspector-section inspector-shortcuts-footer">
                <div className="section-heading-row">
                  <h3 className="section-heading">键盘快捷键</h3>
                  <span className="section-meta">Keyboard</span>
                </div>
                <ul className="shortcut-legend is-compact">
                  {SHORTCUT_LIST.map((sc) => (
                    <li key={sc.keys}>
                      <kbd>{sc.keys}</kbd>
                      <span>{sc.action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
