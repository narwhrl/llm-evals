import React from 'react';
import { DEBUG_VIEWS, PRESETS, QUALITY_LEVELS, QUALITY_BUDGET } from '../lib/defaults.js';

const PARAM_DEFS = [
  { key: 'fov', label: 'FOV', min: 20, max: 110, step: 0.5 },
  { key: 'camDistance', label: 'Camera distance', min: 4.5, max: 55, step: 0.1 },
  { key: 'camAzimuth', label: 'Camera azimuth', min: -Math.PI, max: Math.PI, step: 0.01 },
  { key: 'camElevation', label: 'Camera elevation', min: -1.4, max: 1.4, step: 0.01 },
  { key: 'timeScale', label: 'Time scale', min: 0, max: 3, step: 0.01 },
  { key: 'diskInner', label: 'Disk inner radius', min: 1.05, max: 6, step: 0.01 },
  { key: 'diskOuter', label: 'Disk outer radius', min: 3, max: 30, step: 0.05 },
  { key: 'diskHalfThickness', label: 'Disk half-thickness', min: 0.02, max: 0.8, step: 0.01 },
  { key: 'diskTemp', label: 'Disk temperature', min: 0.2, max: 2.5, step: 0.01 },
  { key: 'diskEmissivity', label: 'Disk emissivity', min: 0.1, max: 3, step: 0.01 },
  { key: 'orbitalSpeed', label: 'Orbital speed', min: 0, max: 2.5, step: 0.01 },
  { key: 'turbulenceAmp', label: 'Turbulence amplitude', min: 0, max: 2, step: 0.01 },
  { key: 'turbulenceSpeed', label: 'Turbulence speed', min: 0, max: 3, step: 0.01 },
  { key: 'starDensity', label: 'Star density', min: 0, max: 2.5, step: 0.01 },
  { key: 'galaxyBrightness', label: 'Galaxy brightness', min: 0, max: 2.5, step: 0.01 },
  { key: 'bloomStrength', label: 'Bloom strength', min: 0, max: 2.5, step: 0.01 },
  { key: 'bloomThreshold', label: 'Bloom threshold', min: 0, max: 2, step: 0.01 },
  { key: 'exposure', label: 'Exposure', min: 0.2, max: 3, step: 0.01 },
  { key: 'vignette', label: 'Vignette', min: 0, max: 1.2, step: 0.01 },
  { key: 'grain', label: 'Film grain', min: 0, max: 0.35, step: 0.005 },
  { key: 'chromatic', label: 'Chromatic aberration', min: 0, max: 0.012, step: 0.0001 },
];

function fmt(v) {
  if (Math.abs(v) >= 10) return v.toFixed(1);
  if (Math.abs(v) >= 1) return v.toFixed(2);
  return v.toFixed(3);
}

export default function HUD({
  visible,
  state,
  onToggleHud,
  onParam,
  onQuality,
  onPreset,
  onDebug,
  onToggleCinematic,
  onReset,
}) {
  if (!visible) {
    return (
      <div className="hud-collapsed-bar">
        <button type="button" className="btn" onClick={onToggleHud} title="Show HUD (H)">
          HUD
        </button>
      </div>
    );
  }

  const dbg = DEBUG_VIEWS[state.debug] || DEBUG_VIEWS[0];

  return (
    <aside className="hud" aria-label="Gargantua controls">
      <div className="panel">
        <h1>GARGANTUA</h1>
        <p className="sub">Schwarzschild null-geodesic raytracer</p>
        <div className="row">
          <button type="button" className={`btn ${state.cinematicPlaying ? 'active' : ''}`} onClick={onToggleCinematic}>
            {state.cinematicPlaying ? 'Pause cam' : 'Play cam'}
          </button>
          <button type="button" className="btn" onClick={onToggleHud}>Hide (H)</button>
          <button type="button" className="btn danger" onClick={onReset}>Reset (R)</button>
        </div>
        <div className="row">
          {QUALITY_LEVELS.map((q) => (
            <button
              key={q}
              type="button"
              className={`btn ${state.quality === q ? 'active' : ''}`}
              onClick={() => onQuality(q)}
            >
              {QUALITY_BUDGET[q].label}
            </button>
          ))}
        </div>
        <div className="debug-pill">
          Debug {dbg.id}: {dbg.name}
          <div className="sub">{dbg.desc}</div>
        </div>
      </div>

      <div className="panel">
        <strong style={{ fontSize: 12 }}>View presets</strong>
        <div className="preset-grid">
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className={`btn ${state.preset === i ? 'active' : ''}`}
              onClick={() => onPreset(i)}
            >
              {i + 1}. {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="panel scroll">
        <strong style={{ fontSize: 12 }}>Parameters ({PARAM_DEFS.length})</strong>
        {PARAM_DEFS.map((def) => (
          <div className="control" key={def.key}>
            <label htmlFor={`p-${def.key}`}>{def.label}</label>
            <span className="val">{fmt(state.params[def.key])}</span>
            <input
              id={`p-${def.key}`}
              type="range"
              min={def.min}
              max={def.max}
              step={def.step}
              value={state.params[def.key]}
              onChange={(e) => onParam(def.key, Number(e.target.value))}
            />
          </div>
        ))}
        <p className="hints">
          Shortcuts: 0–9 debug · Shift+1–4 presets · Space cinematic · H HUD · R reset · Q quality
          · Drag/pinch orbit · Wheel zoom
        </p>
      </div>
    </aside>
  );
}

export { PARAM_DEFS };
