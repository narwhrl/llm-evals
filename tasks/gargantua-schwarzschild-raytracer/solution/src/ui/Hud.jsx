import React, { useState } from 'react';
import {
  PARAM_DEFS,
  PARAM_GROUPS,
  PARAM_BY_ID,
  PRESETS,
  DEBUG_VIEWS,
  QUALITY_LEVELS,
} from '../engine/constants.js';

const QUALITY_LABEL = { standard: 'Standard', high: 'High', cinematic: 'Cinematic' };

function formatValue(id, value) {
  if (id === 'camPolar' || id === 'camAzimuth' || id === 'fov') return `${value.toFixed(0)}°`;
  if (id === 'camDistance') return `${value.toFixed(1)} rs`;
  if (id === 'diskTemp') return `${Math.round(value)} K`;
  return value.toFixed(2);
}

function Slider({ def, value, onChange }) {
  return (
    <label className="param-row">
      <span className="param-label">{def.label}</span>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => onChange(def.id, parseFloat(e.target.value))}
      />
      <span className="param-value">{formatValue(def.id, value)}</span>
    </label>
  );
}

export default function Hud({ engine, state, capture }) {
  const [open, setOpen] = useState(() => !isMobile());
  const showHud = state.hudVisible;

  const setParam = (id, v) => engine.setParams({ [id]: v });

  if (!showHud) {
    return (
      <button className="hud-restore" onClick={() => engine.setHudVisible(true)} title="显示 HUD（H）">
        ⌃ HUD
      </button>
    );
  }

  return (
    <>
      <div className="hud-topbar">
        <div className="hud-brand">
          GARGANTUA <span className="hud-brand-sub">Schwarzschild Raytracer</span>
        </div>
        <div className="hud-status">
          <span className={`badge q-${state.quality}`}>{QUALITY_LABEL[state.quality]}</span>
          <span className="badge">{state.fps} fps</span>
          {capture && <span className="badge capture">CAPTURE</span>}
          <button
            className="icon-btn"
            title="隐藏 HUD（H）"
            onClick={() => engine.setHudVisible(false)}
          >
            ⌄
          </button>
        </div>
      </div>

      {!open && (
        <button className="hud-drawer-toggle" onClick={() => setOpen(true)} title="打开控制面板">
          ☰ 控制面板
        </button>
      )}

      {open && (
        <aside className="hud-panel">
          <div className="panel-head">
            <span>控制面板</span>
            <button className="icon-btn" onClick={() => setOpen(false)} title="收起面板">
              ✕
            </button>
          </div>

          <section className="hud-section">
            <h3>视角预设 <code>Shift+1…4</code></h3>
            <div className="preset-grid">
              {PRESETS.map((p, i) => (
                <button
                  key={p.name}
                  className={`chip ${state.preset === i ? 'active' : ''}`}
                  onClick={() => engine.setPreset(i)}
                >
                  <b>{i + 1}</b> {p.name}
                </button>
              ))}
            </div>
            <div className="hud-line">
              <button
                className={`chip wide ${state.cinematic ? 'active' : ''}`}
                onClick={() => engine.setCinematic(!state.cinematic)}
              >
                {state.cinematic ? '⏸ 暂停电影镜头' : '▶ 播放电影镜头'}
              </button>
            </div>
            <div className="hud-line hint">Space 播放/暂停 · 拖拽旋转 · 滚轮缩放 · 触摸支持</div>
          </section>

          <section className="hud-section">
            <h3>质量档 <code>Q</code></h3>
            <div className="preset-grid three">
              {QUALITY_LEVELS.map((q) => (
                <button
                  key={q}
                  className={`chip ${state.quality === q ? 'active' : ''}`}
                  onClick={() => engine.setQuality(q)}
                >
                  {QUALITY_LABEL[q]}
                </button>
              ))}
            </div>
          </section>

          <section className="hud-section">
            <h3>调试视图 <code>0…9</code></h3>
            <div className="debug-grid">
              {DEBUG_VIEWS.map((name, i) => (
                <button
                  key={name}
                  className={`chip small ${state.debug === i ? 'active' : ''}`}
                  onClick={() => engine.setDebug(i)}
                  title={`${i}: ${name}`}
                >
                  <b>{i}</b> {name}
                </button>
              ))}
            </div>
          </section>

          <section className="hud-section params">
            <h3>参数 <code>{PARAM_DEFS.length} 项</code></h3>
            {PARAM_GROUPS.map((group) => (
              <div key={group.title} className="param-group">
                <h4>{group.title}</h4>
                {group.ids.map((id) => (
                  <Slider key={id} def={PARAM_BY_ID[id]} value={state.params[id]} onChange={setParam} />
                ))}
              </div>
            ))}
          </section>

          <section className="hud-section">
            <div className="hud-line">
              <button className="chip wide danger" onClick={() => engine.resetAll()}>⟲ 重置全部（R）</button>
            </div>
            <div className="hud-line hint">
              快捷键：0–9 调试 · Shift+1–4 预设 · Space 镜头 · H 显隐 · R 重置 · Q 质量档
            </div>
            <div className="hud-line hint dim">
              状态已版本化持久化到 localStorage（gargantua.state.v1）
            </div>
          </section>
        </aside>
      )}
    </>
  );
}

function isMobile() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;
}
