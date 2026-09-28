import { integerPercentages, rebalanceWeight } from '../lib/decisionMath.js';

const DIMENSIONS = [
  { key: 'clarity', zh: '清晰', en: 'CLARITY', index: '01' },
  { key: 'surprise', zh: '意外', en: 'SURPRISE', index: '02' },
  { key: 'care', zh: '关照', en: 'CARE', index: '03' },
];

export function CalibrationControls({ weights, onChange }) {
  const percentages = integerPercentages(weights);
  const updateDimension = (key, value) => {
    onChange(rebalanceWeight(weights, key, Number(value) / 100));
  };

  return (
    <fieldset className="calibration-controls" aria-describedby="calibration-help">
      <legend className="sr-only">校准决定的三股张力</legend>
      <p id="calibration-help" className="sr-only">
        三个数值合计为百分之百。调整其中一项时，其余两项会按当前比例重新分配。
      </p>
      {DIMENSIONS.map(({ key, zh, en, index }) => {
        const percentage = percentages[key];
        return (
          <label className={`dimension dimension--${key}`} key={key}>
            <span className="dimension__index" aria-hidden="true">{index}</span>
            <span className="dimension__name">
              <span>{zh}</span>
              <span lang="en">{en}</span>
            </span>
            <input
              aria-label={`${zh}，${percentage}%`}
              max="92"
              min="4"
              onChange={(event) => updateDimension(key, event.target.value)}
              step="1"
              type="range"
              value={percentage}
            />
            <output className="dimension__value">{String(percentage).padStart(2, '0')}</output>
          </label>
        );
      })}
    </fieldset>
  );
}
