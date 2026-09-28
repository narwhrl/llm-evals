import type { ParamDef, ParamKey } from "../state/defaults";

interface Props {
  def: ParamDef;
  value: number;
  onChange: (key: ParamKey, value: number) => void;
}

export function ParamSlider({ def, value, onChange }: Props) {
  return (
    <label className="param">
      <span className="param-label" title={def.label}>
        {def.label}
      </span>
      <span className="param-value">{def.fmt ? def.fmt(value) : value.toFixed(2)}</span>
      <input
        className="param-range"
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => onChange(def.key, Number(e.target.value))}
      />
    </label>
  );
}
