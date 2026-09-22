import { useEffect, useState } from 'react'

import {
  PARAM_DEFS,
  PARAM_GROUPS,
  QUALITY_TIERS,
  resetAll,
  runtime,
  setCinemaPlaying,
  setDebug,
  setHudVisible,
} from '../state/store.js'
import { PRESETS, applyPreset } from '../state/presets.js'
import { SHORTCUTS } from './shortcuts.js'
import { DEBUG_VIEWS, debugMeta } from './debugMeta.js'
import ParamSlider from './ParamSlider.jsx'

function useCompactLayout() {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches,
  )
  useEffect(() => {
    const query = window.matchMedia('(max-width: 820px)')
    const listener = (event) => setCompact(event.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])
  return compact
}

// Simulated time is read straight from the render loop's runtime object and
// refreshed four times per second, so the HUD never re-renders per frame.
function TimeReadout() {
  const [time, setTime] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTime(runtime.time), 250)
    return () => clearInterval(id)
  }, [])
  return <span className="badge">T {time.toFixed(2)} s{runtime.captureActive ? ' · FROZEN' : ''}</span>
}

function CinemaStatus({ snapshot }) {
  let text = 'CINEMA'
  let className = 'badge badge-cinema'
  if (snapshot.captureActive) {
    text = 'CAPTURE'
  } else if (snapshot.userHasTakenControl) {
    text = 'MANUAL'
    className = 'badge badge-manual'
  } else if (!snapshot.cinemaPlaying) {
    text = 'PAUSED'
    className = 'badge badge-paused'
  }
  return <span className={className}>{text}</span>
}

export default function Hud({ snapshot }) {
  const compact = useCompactLayout()
  const [panelOpen, setPanelOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => ({ Post: false }))

  useEffect(() => {
    // Desktop: the panel starts open on the right edge, where it never covers
    // the photon ring. Compact viewports start with the drawer stowed.
    setPanelOpen(!compact)
  }, [compact])

  if (!snapshot.hudVisible) {
    // Capture frames must be free of all overlay pixels, so the hint is only
    // offered in interactive mode.
    if (snapshot.captureActive) return null
    return (
      <button className="hud-hint" type="button" onClick={() => setHudVisible(true)}>
        H · HUD hidden — press H to show
      </button>
    )
  }

  const quality = QUALITY_TIERS[snapshot.quality] || QUALITY_TIERS.high
  const meta = debugMeta(snapshot.debug)
  const grouped = PARAM_GROUPS.map((group) => ({
    group,
    params: PARAM_DEFS.filter((def) => def.group === group),
  }))

  const toggleGroup = (group) => setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }))

  return (
    <div className={`hud ${compact ? 'hud-compact' : 'hud-desktop'}`}>
      <header className="brand">
        <h1 className="brand-title">GARGANTUA</h1>
        <p className="brand-sub">Schwarzschild Black Hole Raytracer</p>
        <div className="badges">
          <span className="badge badge-quality">QUALITY · {quality.label}</span>
          <CinemaStatus snapshot={snapshot} />
          <TimeReadout />
          <span className="badge badge-muted">
            {quality.maxSteps} steps · ×{quality.renderScale.toFixed(2)} · DPR ≤{quality.dprCap.toFixed(1)}
          </span>
        </div>
        {snapshot.debug > 0 ? (
          <div className="debug-banner">
            <strong>DEBUG {snapshot.debug} — {meta.name}</strong>
            <span>{meta.description}</span>
          </div>
        ) : null}
      </header>

      <button
        className="panel-toggle"
        type="button"
        aria-expanded={panelOpen}
        onClick={() => setPanelOpen((open) => !open)}
      >
        {panelOpen ? 'Controls ▸' : 'Controls ◂'}
      </button>

      <aside className={`panel ${panelOpen ? 'panel-open' : 'panel-closed'}`} aria-label="Parameters">
        <div className="panel-scroll">
          {grouped.map(({ group, params }) => (
            <section className="group" key={group}>
              <button className="group-head" type="button" onClick={() => toggleGroup(group)}>
                <span>{group}</span>
                <span className="group-caret">{collapsed[group] ? '+' : '−'}</span>
              </button>
              {collapsed[group] ? null : (
                <div className="group-body">
                  {params.map((def) => (
                    <ParamSlider key={def.key} paramKey={def.key} value={snapshot.params[def.key]} />
                  ))}
                </div>
              )}
            </section>
          ))}
          <section className="group">
            <div className="group-body">
              <button className="wide-button" type="button" onClick={() => resetAll()}>
                Reset all (R)
              </button>
              <button className="wide-button ghost" type="button" onClick={() => setCinemaPlaying(!snapshot.cinemaPlaying)}>
                {snapshot.cinemaPlaying ? 'Pause cinema (Space)' : 'Play cinema (Space)'}
              </button>
            </div>
          </section>
        </div>
      </aside>

      <footer className="hud-footer">
        <div className="preset-row">
          {PRESETS.map((preset, index) => (
            <button
              key={preset.name}
              type="button"
              className={`preset ${snapshot.preset === index ? 'preset-active' : ''}`}
              title={preset.blurb}
              onClick={() => applyPreset(index)}
            >
              <span className="preset-index">{index + 1}</span>
              {preset.name}
            </button>
          ))}
        </div>
        <ul className="legend">
          {SHORTCUTS.map((shortcut) => (
            <li key={shortcut.keys}>
              <kbd>{shortcut.keys}</kbd>
              <span>{shortcut.label}</span>
            </li>
          ))}
        </ul>
        <ol className="debug-list">
          {DEBUG_VIEWS.map((view) => (
            <li key={view.index} className={snapshot.debug === view.index ? 'debug-current' : ''}>
              <button type="button" onClick={() => setDebug(view.index)} title={view.description}>
                <kbd>{view.index}</kbd>
                {view.name}
              </button>
            </li>
          ))}
        </ol>
      </footer>
    </div>
  )
}
