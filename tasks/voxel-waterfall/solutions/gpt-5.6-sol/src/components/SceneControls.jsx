const PRESET_OPTIONS = [
  { label: '破晓', value: 'dawn' },
  { label: '晴昼', value: 'daylight' },
  { label: '暮色', value: 'dusk' },
];

function RangeControl({ formatValue, label, max, min, onChange, step, value }) {
  const output = formatValue ? formatValue(value) : value;
  return (
    <label className="range-control">
      <span className="control-label">
        <span>{label}</span>
        <output>{output}</output>
      </span>
      <input
        aria-label={label}
        aria-valuetext={String(output)}
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

function ToggleControl({ checked, label, onChange }) {
  return (
    <label className="toggle-control">
      <span>{label}</span>
      <input
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
    </label>
  );
}

export function SceneControls({ onChange, onResetCamera, settings }) {
  const update = (key, value) => onChange({ ...settings, [key]: value });

  return (
    <section aria-labelledby="controls-heading" className="controls-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">环境参数</p>
          <h2 id="controls-heading">调节云岭</h2>
        </div>
        <span className="live-badge"><span aria-hidden="true" />实时</span>
      </div>

      <div className="control-group">
        <label className="select-control" htmlFor="scene-preset">
          <span>光照时刻</span>
          <select
            id="scene-preset"
            onChange={(event) => update('preset', event.target.value)}
            value={settings.preset}
          >
            {PRESET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="control-group range-stack">
        <RangeControl
          formatValue={(value) => `${Math.round(value * 100)}%`}
          label="云层密度"
          max="1"
          min="0.25"
          onChange={(value) => update('cloudCoverage', value)}
          step="0.01"
          value={settings.cloudCoverage}
        />
        <RangeControl
          formatValue={(value) => `${value} 格`}
          label="云层高度"
          max="34"
          min="18"
          onChange={(value) => update('cloudAltitude', value)}
          step="1"
          value={settings.cloudAltitude}
        />
        <RangeControl
          formatValue={(value) => `${Math.round(value * 100)}%`}
          label="山脚植被"
          max="1"
          min="0"
          onChange={(value) => update('vegetation', value)}
          step="0.01"
          value={settings.vegetation}
        />
        <RangeControl
          formatValue={(value) => `${value.toFixed(1)}×`}
          label="水流速度"
          max="2"
          min="0.2"
          onChange={(value) => update('waterfallSpeed', value)}
          step="0.1"
          value={settings.waterfallSpeed}
        />
        <RangeControl
          formatValue={(value) => `${value.toFixed(1)}×`}
          label="环绕速度"
          max="1.5"
          min="0.2"
          onChange={(value) => update('orbitSpeed', value)}
          step="0.1"
          value={settings.orbitSpeed}
        />
      </div>

      <div className="control-group toggle-stack">
        <ToggleControl
          checked={settings.autoRotate}
          label="镜头自动环绕"
          onChange={(value) => update('autoRotate', value)}
        />
        <ToggleControl
          checked={settings.waterfalls}
          label="显示瀑布水流"
          onChange={(value) => update('waterfalls', value)}
        />
        <ToggleControl
          checked={settings.mist}
          label="山谷薄雾"
          onChange={(value) => update('mist', value)}
        />
      </div>

      <button className="reset-button" onClick={onResetCamera} type="button">
        重置观景位置
      </button>
    </section>
  );
}
