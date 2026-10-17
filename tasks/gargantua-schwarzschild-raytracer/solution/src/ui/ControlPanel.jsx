import { memo } from 'react';
import { PARAM_GROUPS, PARAMS } from '../state/schema.js';
import ParamSlider from './ParamSlider.jsx';

const GROUP_PARAMS = Object.fromEntries(
  PARAM_GROUPS.map((group) => [
    group.id,
    Object.keys(PARAMS).filter((key) => PARAMS[key].group === group.id),
  ]),
);

function ControlPanel({ params, onParam }) {
  return (
    <div className="control-stack">
      {PARAM_GROUPS.map((group) => (
        <section className="panel-section" key={group.id} aria-label={group.label}>
          <div className="section-title">
            <span>{group.label}</span>
            <span className="section-hint">{group.hint}</span>
          </div>
          {GROUP_PARAMS[group.id].map((key) => (
            <ParamSlider
              key={key}
              defKey={key}
              def={PARAMS[key]}
              value={params[key]}
              onChange={onParam}
            />
          ))}
        </section>
      ))}
    </div>
  );
}

export default memo(ControlPanel);
