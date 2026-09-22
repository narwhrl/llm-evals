import { memo } from 'react'

function decimalsFor(step) {
  const text = String(step)
  const dot = text.indexOf('.')
  return dot === -1 ? 0 : text.length - dot - 1
}

function formatValue(value, definition) {
  const decimals = decimalsFor(definition.step)
  if (definition.id === 'diskTemperature') return Math.round(value).toLocaleString('en-US')
  return value.toFixed(decimals)
}

/**
 * One parameter control. The value shown is the value the shader or camera actually receives: the
 * store clamps and snaps every change, and the engine reads the store every frame, so a slider can
 * never drift out of sync with the render.
 */
export const Slider = memo(function Slider({ definition, value, onChange, onInteractionStart }) {
  return (
    <label className="control">
      <span className="control-head">
        <span className="control-label">{definition.label}</span>
        <span className="control-readout">
          {formatValue(value, definition)}
          {definition.unit ? ` ${definition.unit}` : ''}
        </span>
      </span>
      <input
        type="range"
        min={definition.min}
        max={definition.max}
        step={definition.step}
        value={value}
        aria-label={definition.label}
        onChange={(event) => onChange(definition.id, Number.parseFloat(event.target.value))}
        onPointerDown={onInteractionStart}
      />
    </label>
  )
})
