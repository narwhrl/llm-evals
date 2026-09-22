import { PARAM_DEFS, type ParamKey } from '../state/defaults';
import { store } from '../state/store';

export function ParamSlider({ paramKey }: { paramKey: ParamKey }) {
  const def = PARAM_DEFS.find((d) => d.key === paramKey)!;
  const value = store.getState().params[paramKey];
  const digits = def.digits ?? 2;

  return (
    <label className="slider-row" title={def.hint}>
      <span className="slider-label">{def.label}</span>
      <span className="slider-value">
        {value.toFixed(digits)}
        {def.unit ?? ''}
      </span>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => store.setParam(paramKey, Number(e.target.value))}
      />
    </label>
  );
}
