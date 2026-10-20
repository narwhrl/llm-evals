import { ParamDef, formatParam } from "../config/params";

interface SliderProps {
  def: ParamDef;
  value: number;
  onChange: (value: number) => void;
  onReset: () => void;
  disabled?: boolean;
}

/**
 * One parameter row: a label, the live value, the slider and a button that
 * puts the control back where it started. Every slider in the panel can be
 * reset on its own, because a long session moves a lot of them.
 */
export function Slider({ def, value, onChange, onReset, disabled }: SliderProps) {
  const id = `param-${def.key}`;
  const atDefault = Math.abs(value - def.default) < 1e-6;

  return (
    <div className={`slider${disabled ? " slider--disabled" : ""}`}>
      <div className="slider__head">
        <label className="slider__label" htmlFor={id} title={def.hint}>
          {def.label}
        </label>
        <span className="slider__value">{formatParam(def.key, value)}</span>
        <button
          type="button"
          className="slider__reset"
          onClick={onReset}
          disabled={disabled || atDefault}
          aria-label={`Reset ${def.label}`}
          title={`Reset ${def.label} to ${formatParam(def.key, def.default)}`}
        >
          ↺
        </button>
      </div>
      <input
        id={id}
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
