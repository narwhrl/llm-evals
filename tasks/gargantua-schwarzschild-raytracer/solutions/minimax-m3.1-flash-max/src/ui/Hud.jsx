import { useState } from 'react';

import { PARAM_GROUPS, SHORTCUTS } from '../state/config.js';

function formatValue(def, value) {
  const decimals = def.step >= 1 ? 0 : def.step >= 0.1 ? 1 : def.step >= 0.01 ? 2 : 3;
  return `${value.toFixed(decimals)}${def.unit ? ` ${def.unit}` : ''}`;
}

function Slider({ def, value, onChange }) {
  return (
    <label className="ctl">
      <span className="ctl__row">
        <span className="ctl__label">{def.label}</span>
        <span className="ctl__value">{formatValue(def, value)}</span>
      </span>
      <input
        className="ctl__slider"
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        aria-label={def.label}
        onChange={(event) => onChange(def.key, Number(event.target.value))}
      />
    </label>
  );
}

export default function Hud({
  state,
  status,
  ready,
  audioOn,
  debugModes,
  presets,
  qualityLevels,
  onParam,
  onPreset,
  onDebug,
  onQuality,
  onReset,
  onToggleHud,
  onToggleCinematic,
  onToggleAudio,
}) {
  const [tab, setTab] = useState('controls');
  const { params, quality, preset, debug, hudOpen, cinematic } = state;
  const activeDebug = debugModes[debug] || debugModes[0];

  const controlsPanel = (
    <div className={`tabpanel ${tab === 'controls' ? 'tabpanel--active' : ''}`}>
      <section className="block">
        <h2 className="block__title">Viewpoints</h2>
        <div className="preset-grid">
          {presets.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`preset ${preset === index ? 'preset--active' : ''}`}
              onClick={() => onPreset(index)}
              title={`${item.hint} - Shift+${index + 1}`}
            >
              <span className="preset__index">{index + 1}</span>
              <span className="preset__name">{item.name}</span>
              <span className="preset__hint">{item.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="block">
        <h2 className="block__title">Quality</h2>
        <div className="segmented">
          {qualityLevels.map((level) => (
            <button
              key={level}
              type="button"
              className={`segmented__item ${quality === level ? 'segmented__item--active' : ''}`}
              onClick={() => onQuality(level)}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="block__note">
          Internal buffer {status.internalWidth || '-'}x{status.internalHeight || '-'} px. Quality changes the render
          scale, the geodesic step budget and the bloom pyramid.
        </p>
      </section>

      {PARAM_GROUPS.map((group) => (
        <section className="block" key={group.id}>
          <h2 className="block__title">{group.title}</h2>
          <div className="ctl-list">
            {group.params.map((def) => (
              <Slider key={def.key} def={def} value={params[def.key]} onChange={onParam} />
            ))}
          </div>
        </section>
      ))}

      <section className="block">
        <h2 className="block__title">Actions</h2>
        <div className="action-row">
          <button type="button" className="button" onClick={onReset} title="Reset everything (R)">
            Reset all
          </button>
          <button
            type="button"
            className="button"
            onClick={onToggleCinematic}
            title="Play or pause the cinematic camera (Space)"
          >
            {cinematic ? 'Pause camera' : 'Play camera'}
          </button>
          <button
            type="button"
            className={`button ${audioOn ? 'button--active' : ''}`}
            onClick={onToggleAudio}
            title="Toggle the procedural ambient drone (M)"
          >
            {audioOn ? 'Sound on' : 'Sound off'}
          </button>
        </div>
      </section>
    </div>
  );

  const diagnosticsPanel = (
    <div className={`tabpanel ${tab === 'diagnostics' ? 'tabpanel--active' : ''}`}>
      <section className="block">
        <h2 className="block__title">Debug views</h2>
        <div className="debug-grid">
          {debugModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={`debug ${debug === mode.id ? 'debug--active' : ''}`}
              onClick={() => onDebug(mode.id)}
              title={`${mode.desc} - key ${mode.id}`}
            >
              <span className="debug__key">{mode.id}</span>
              <span className="debug__name">{mode.name}</span>
            </button>
          ))}
        </div>
        <p className="block__note">
          <strong>{debug}</strong> - {activeDebug.desc}
        </p>
      </section>
      <section className="block">
        <h2 className="block__title">Session</h2>
        <dl className="readout">
          <div>
            <dt>Camera mode</dt>
            <dd>{cinematic ? 'Cinematic loop' : 'Manual control'}</dd>
          </div>
          <div>
            <dt>Quality</dt>
            <dd>{quality}</dd>
          </div>
          <div>
            <dt>Debug view</dt>
            <dd>
              {debug} - {activeDebug.name}
            </dd>
          </div>
          <div>
            <dt>Internal buffer</dt>
            <dd>
              {status.internalWidth}x{status.internalHeight}
            </dd>
          </div>
          <div>
            <dt>WebGL context</dt>
            <dd>{status.contextLost ? 'lost - paused' : 'active'}</dd>
          </div>
        </dl>
      </section>
    </div>
  );

  const helpPanel = (
    <div className={`tabpanel ${tab === 'help' ? 'tabpanel--active' : ''}`}>
      <section className="block">
        <h2 className="block__title">Keyboard</h2>
        <dl className="readout">
          {SHORTCUTS.map((shortcut) => (
            <div key={shortcut.keys}>
              <dt>
                <kbd>{shortcut.keys}</kbd>
              </dt>
              <dd>{shortcut.desc}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="block">
        <h2 className="block__title">Pointer</h2>
        <dl className="readout">
          <div>
            <dt>Drag</dt>
            <dd>Orbit the camera around the black hole</dd>
          </div>
          <div>
            <dt>Wheel / pinch</dt>
            <dd>Change the camera distance (the lensing view changes with it)</dd>
          </div>
        </dl>
      </section>
    </div>
  );

  return (
    <div className={`hud ${hudOpen ? 'hud--open' : 'hud--closed'}`}>
      <button
        type="button"
        className="hud__toggle"
        onClick={onToggleHud}
        aria-label={hudOpen ? 'Hide the HUD' : 'Show the HUD'}
        title={hudOpen ? 'Hide HUD (H)' : 'Show HUD (H)'}
      >
        {hudOpen ? '⟨' : '⟩'}
      </button>

      <div className="hud__panel">
        <header className="hud__header">
          <div>
            <h1 className="hud__title">GARGANTUA</h1>
            <p className="hud__subtitle">Schwarzschild black hole raytracer</p>
          </div>
          <div className="hud__badges">
            <span className={`badge ${ready ? 'badge--ok' : 'badge--wait'}`}>{ready ? 'LIVE' : 'BOOT'}</span>
            <span className="badge">{status.fps ? `${status.fps.toFixed(0)} fps` : '-- fps'}</span>
          </div>
        </header>

        <div className="hud__status">
          <span className="hud__status-item">
            <em>Quality</em>
            {quality}
          </span>
          <span className="hud__status-item">
            <em>Debug</em>
            {debug} {activeDebug.name}
          </span>
          <span className="hud__status-item">
            <em>Camera</em>
            {cinematic ? 'Cinematic' : 'Manual'}
          </span>
        </div>

        <nav className="hud__tabs">
          {['controls', 'diagnostics', 'help'].map((id) => (
            <button
              key={id}
              type="button"
              className={`tab ${tab === id ? 'tab--active' : ''}`}
              onClick={() => setTab(id)}
            >
              {id === 'controls' ? 'Controls' : id === 'diagnostics' ? 'Diagnostics' : 'Shortcuts'}
            </button>
          ))}
        </nav>

        <div className="hud__scroll">
          {controlsPanel}
          {diagnosticsPanel}
          {helpPanel}
        </div>
      </div>
    </div>
  );
}
