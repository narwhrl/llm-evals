import { memo, useCallback } from 'react'
import { DEFAULT_PARAMETERS, PARAMETERS, PARAMETER_GROUPS } from '../state/schema.js'
import { Slider } from './Slider.jsx'

const CAMERA_FRAMING = new Set(['camDistance', 'camAzimuth', 'camElevation'])

/**
 * The parameter drawer. Every control writes into the store, which clamps and snaps it, persists it
 * and hands it to the engine — there are no decorative sliders here.
 *
 * Moving a framing control (distance / azimuth / elevation) pauses the cinematic loop so the user
 * always keeps the camera they asked for; FOV and the non-camera controls do not interrupt it.
 */
export const ControlPanel = memo(function ControlPanel({
  params,
  onParameters,
  onPauseCinematic,
  onInteractionStart,
  collapsed,
  onToggleCollapsed,
}) {
  const handleChange = useCallback(
    (id, value) => {
      if (CAMERA_FRAMING.has(id)) onPauseCinematic()
      onParameters({ [id]: value })
    },
    [onParameters, onPauseCinematic],
  )

  return (
    <aside className="hud-panel controls-drawer" data-collapsed={collapsed ? 'true' : 'false'}>
      <header className="controls-header">
        <span className="controls-heading">Parameters · {PARAMETERS.length}</span>
        <span style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            className="hud-button"
            onClick={() => {
              onPauseCinematic()
              onParameters({ ...DEFAULT_PARAMETERS })
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="hud-button"
            onClick={onToggleCollapsed}
            aria-expanded={!collapsed}
          >
            {collapsed ? 'Open' : 'Close'}
          </button>
        </span>
      </header>
      {!collapsed && (
        <div className="controls-body">
          {PARAMETER_GROUPS.map((group) => (
            <div key={group.id}>
              <div className="control-group-title">{group.label}</div>
              {PARAMETERS.filter((definition) => definition.group === group.id).map((definition) => (
                <Slider
                  key={definition.id}
                  definition={definition}
                  value={params[definition.id]}
                  onChange={handleChange}
                  onInteractionStart={onInteractionStart}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </aside>
  )
})
