import {
  GROUP_LABELS,
  GROUP_ORDER,
  PARAM_DEFS,
  ParamKey,
  ParamValues,
} from "../config/params";
import { Slider } from "./Slider";

interface ControlPanelProps {
  values: ParamValues;
  onChange: (key: ParamKey, value: number) => void;
  onResetParam: (key: ParamKey) => void;
  onResetAll: () => void;
  disabled?: boolean;
}

/**
 * The parameter panel. It is grouped the way the picture is built: first the
 * observer, then the gas, then the sky behind it, then the lens in front of
 * it, then time.
 */
export function ControlPanel({
  values,
  onChange,
  onResetParam,
  onResetAll,
  disabled,
}: ControlPanelProps) {
  return (
    <div className="panel">
      <div className="panel__head">
        <h2 className="panel__title">Parameters</h2>
        <button type="button" className="button button--ghost" onClick={onResetAll}>
          Reset all
        </button>
      </div>
      <div className="panel__body">
        {GROUP_ORDER.map((group) => {
          const defs = PARAM_DEFS.filter((def) => def.group === group);
          return (
            <section className="panel__group" key={group}>
              <h3 className="panel__groupTitle">{GROUP_LABELS[group]}</h3>
              {defs.map((def) => (
                <Slider
                  key={def.key}
                  def={def}
                  value={values[def.key]}
                  onChange={(value) => onChange(def.key, value)}
                  onReset={() => onResetParam(def.key)}
                  disabled={disabled}
                />
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}
