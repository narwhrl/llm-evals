import { memo } from 'react'
import { DEBUG_VIEWS, PRESETS, QUALITY_LEVELS, SHORTCUTS } from '../state/schema.js'

const QUALITY_ABBREVIATION = { standard: 'Std', high: 'High', cinematic: 'Cine' }

/**
 * The heads-up display: what the renderer is actually doing, what the shortcuts are, and the way
 * back to a known state. It is anchored to the corners so the critical structure in the middle of
 * the frame stays unobstructed.
 */
export const Hud = memo(function Hud({
  state,
  renderInfo,
  debugView,
  onQuality,
  onDebugStep,
  onToggleCinematic,
  onToggleAudio,
  onReset,
  onToggleHud,
}) {
  return (
    <>
      <section className="hud-panel hud-info" aria-label="Render status">
        <h1 className="hud-title">
          <span>GARGANTUA</span>
          <span className="hud-value-accent">{state.capture ? 'CAPTURE' : 'LIVE'}</span>
        </h1>
        <p className="hud-subtitle">Schwarzschild null-geodesic raytracer</p>

        <div className="hud-section">
          <div className="hud-section-title">Render</div>
          <dl className="hud-grid">
            <dt>Quality</dt>
            <dd>
              {QUALITY_LEVELS.map((level, index) => (
                <button
                  key={level}
                  type="button"
                  className="hud-button"
                  style={{ marginLeft: index === 0 ? 0 : 4, padding: '2px 6px' }}
                  aria-pressed={state.quality === level}
                  onClick={() => onQuality(level)}
                >
                  {QUALITY_ABBREVIATION[level] || level}
                </button>
              ))}
            </dd>
            <dt>Steps / ray</dt>
            <dd>{renderInfo.maxSteps}</dd>
            <dt>Disk crossings</dt>
            <dd>{renderInfo.maxCrossings}</dd>
            <dt>Bloom mips</dt>
            <dd>{renderInfo.bloomMips}</dd>
            <dt>Buffer</dt>
            <dd>
              {renderInfo.renderWidth} × {renderInfo.renderHeight}
            </dd>
            <dt>DPR</dt>
            <dd>{renderInfo.dpr.toFixed(2)}</dd>
            <dt>FPS</dt>
            <dd>{renderInfo.fps.toFixed(0)}</dd>
          </dl>
        </div>

        <div className="hud-section">
          <div className="hud-section-title">Debug view</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="hud-value-accent" style={{ fontSize: 18 }}>
              {state.debug}
            </span>
            <span style={{ fontSize: 11.5 }}>{debugView.name}</span>
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              <button
                type="button"
                className="hud-button"
                onClick={() => onDebugStep(-1)}
                aria-label="Previous debug view"
              >
                −
              </button>
              <button
                type="button"
                className="hud-button"
                onClick={() => onDebugStep(1)}
                aria-label="Next debug view"
              >
                +
              </button>
            </span>
          </div>
          <p className="debug-description">{debugView.description}</p>
        </div>

        <div className="hud-section">
          <div className="hud-section-title">Camera</div>
          <dl className="hud-grid">
            <dt>Distance</dt>
            <dd>{state.params.camDistance.toFixed(1)} r<sub>s</sub></dd>
            <dt>Azimuth</dt>
            <dd>{state.params.camAzimuth.toFixed(1)}°</dd>
            <dt>Elevation</dt>
            <dd>{state.params.camElevation.toFixed(1)}°</dd>
            <dt>FOV</dt>
            <dd>{state.params.fov.toFixed(1)}°</dd>
            <dt>Simulation time</dt>
            <dd>{state.time.toFixed(2)} s</dd>
          </dl>
          <div className="hud-button-row">
            <button
              type="button"
              className="hud-button"
              aria-pressed={state.cinematic}
              onClick={onToggleCinematic}
            >
              {state.cinematic ? 'Pause loop' : 'Play loop'}
            </button>
            <button
              type="button"
              className="hud-button"
              aria-pressed={state.audio}
              onClick={onToggleAudio}
              disabled={renderInfo.audioUnavailable}
            >
              {renderInfo.audioUnavailable ? 'Audio n/a' : state.audio ? 'Audio on' : 'Audio off'}
            </button>
            <button type="button" className="hud-button" onClick={onReset}>
              Reset all
            </button>
            <button type="button" className="hud-button" onClick={onToggleHud}>
              Hide HUD
            </button>
          </div>
        </div>

        <div className="hud-section">
          <div className="hud-section-title">Shortcuts</div>
          <div className="shortcut-list">
            {SHORTCUTS.map((shortcut) => (
              <div className="shortcut-row" key={shortcut.keys}>
                <span className="shortcut-keys">{shortcut.keys}</span>
                <span className="shortcut-action">{shortcut.action}</span>
              </div>
            ))}
            <div className="shortcut-row">
              <span className="shortcut-keys">Drag / wheel</span>
              <span className="shortcut-action">Orbit and zoom</span>
            </div>
          </div>
        </div>
      </section>

      <button type="button" className="hud-panel hud-button hud-toggle" onClick={onToggleHud}>
        Show HUD · H
      </button>
    </>
  )
})

export const PresetBar = memo(function PresetBar({ active, onPreset }) {
  return (
    <nav className="hud-panel preset-bar" aria-label="Camera presets">
      {PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          className="preset-button"
          aria-pressed={active === preset.id}
          title={preset.description}
          onClick={() => onPreset(preset.id)}
        >
          <span className="preset-index">{preset.id + 1}</span>
          {preset.name}
        </button>
      ))}
    </nav>
  )
})

export function debugViewFor(index) {
  return DEBUG_VIEWS[index] || DEBUG_VIEWS[0]
}
