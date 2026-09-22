import { paramDef, resetParam, setParam } from '../state/store.js'

function formatValue(value, step) {
  if (step >= 1) return value.toFixed(0)
  if (step >= 0.1) return value.toFixed(1)
  if (step >= 0.01) return value.toFixed(2)
  return value.toFixed(3)
}

export default function ParamSlider({ paramKey, value }) {
  const def = paramDef(paramKey)
  if (!def) return null
  const id = `param-${paramKey}`

  return (
    <div className="param">
      <div className="param-head">
        <label className="param-label" htmlFor={id} title="Double-click to restore the default">
          <span onDoubleClick={() => resetParam(paramKey)}>{def.label}</span>
        </label>
        <span className="param-value">
          {formatValue(value, def.step)}
          {def.unit ? <em>{def.unit}</em> : null}
        </span>
      </div>
      <input
        id={id}
        className="param-range"
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(event) => setParam(paramKey, Number.parseFloat(event.target.value))}
        onDoubleClick={() => resetParam(paramKey)}
      />
    </div>
  )
}
