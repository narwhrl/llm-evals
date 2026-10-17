import { memo } from 'react';

const UNIT_LABELS = {
  deg: '°',
  x: '×',
  M: 'M',
  K: 'K',
  '': '',
};

function formatValue(def, value) {
  const digits = def.digits ?? 2;
  const display = digits === 0 ? String(Math.round(value)) : Number(value).toFixed(digits);
  return `${display}${UNIT_LABELS[def.unit] ?? def.unit}`;
}

function ParamSlider({ defKey, def, value, onChange }) {
  const id = `param-${defKey}`;
  return (
    <label className="param" htmlFor={id} data-param={defKey} data-value={value}>
      <span className="param-head">
        <span>{def.label}</span>
        <span className="param-value">{formatValue(def, value)}</span>
      </span>
      <input
        id={id}
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        aria-label={def.label}
        aria-valuetext={formatValue(def, value)}
        onChange={(event) => onChange(defKey, Number(event.target.value))}
      />
    </label>
  );
}

export default memo(ParamSlider);
