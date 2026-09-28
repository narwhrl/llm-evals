import { DEFAULT_SETTINGS } from '../scene/constants.js';

function Slider({ label, hint, min, max, step, value, onChange }) {
  return (
    <label className="control">
      <span className="control-head">
        <span>{label}</span>
        <span className="control-value">{typeof value === 'number' ? Number(value).toFixed(step < 1 ? 2 : 0) : value}</span>
      </span>
      {hint ? <span className="control-hint">{hint}</span> : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export function ControlPanel({ settings, stats, fps, onChange, onReset }) {
  const patch = (partial) => onChange({ ...settings, ...partial });
  const fpsTone = fps >= 50 ? 'ok' : fps >= 30 ? 'warn' : 'bad';

  return (
    <aside className="panel">
      <header className="panel-header">
        <div>
          <p className="eyebrow">Voxel Vista</p>
          <h1>体素山景</h1>
        </div>
        <div className={`fps fps-${fpsTone}`}>{fps} fps</div>
      </header>

      <p className="lede">
        打开即可观看：主峰穿云、瀑布顺坡而下、山脚植被与晨昏光影。可拖拽旋转，也可保持自动巡航。
      </p>

      <section>
        <h2>氛围</h2>
        <Slider
          label="晨昏"
          hint="0 黎明 · 0.5 正午 · 1 黄昏"
          min={0}
          max={1}
          step={0.01}
          value={settings.timeOfDay}
          onChange={(timeOfDay) => patch({ timeOfDay })}
        />
        <Slider
          label="雾气浓度"
          min={0.002}
          max={0.03}
          step={0.001}
          value={settings.fogDensity}
          onChange={(fogDensity) => patch({ fogDensity })}
        />
      </section>

      <section>
        <h2>云与水</h2>
        <Slider
          label="云层高度"
          min={18}
          max={52}
          step={1}
          value={settings.cloudHeight}
          onChange={(cloudHeight) => patch({ cloudHeight })}
        />
        <Slider
          label="云层密度"
          min={0.15}
          max={0.95}
          step={0.01}
          value={settings.cloudDensity}
          onChange={(cloudDensity) => patch({ cloudDensity })}
        />
        <Slider
          label="瀑布流速"
          min={0.2}
          max={2.4}
          step={0.05}
          value={settings.waterfallSpeed}
          onChange={(waterfallSpeed) => patch({ waterfallSpeed })}
        />
      </section>

      <section>
        <h2>地形</h2>
        <Slider
          label="山体尺度"
          min={0.7}
          max={1.45}
          step={0.01}
          value={settings.mountainScale}
          onChange={(mountainScale) => patch({ mountainScale })}
        />
        <Slider
          label="植被密度"
          min={0}
          max={1.4}
          step={0.01}
          value={settings.vegetation}
          onChange={(vegetation) => patch({ vegetation })}
        />
        <Slider
          label="随机种子"
          min={1}
          max={200}
          step={1}
          value={settings.seed}
          onChange={(seed) => patch({ seed })}
        />
      </section>

      <section>
        <h2>相机 / 性能</h2>
        <label className="toggle">
          <input
            type="checkbox"
            checked={settings.autoRotate}
            onChange={(e) => patch({ autoRotate: e.target.checked })}
          />
          自动旋转
        </label>
        <Slider
          label="旋转速度"
          min={0.05}
          max={1.2}
          step={0.01}
          value={settings.rotateSpeed}
          onChange={(rotateSpeed) => patch({ rotateSpeed })}
        />
        <label className="toggle">
          <input
            type="checkbox"
            checked={settings.shadows}
            onChange={(e) => patch({ shadows: e.target.checked })}
          />
          阴影
        </label>
      </section>

      {stats ? (
        <section className="stats">
          <h2>场景规模</h2>
          <ul>
            <li>水平网格 {Math.sqrt(stats.columns) | 0} × {Math.sqrt(stats.columns) | 0}</li>
            <li>地表体素 {stats.solidVoxels}</li>
            <li>水体 {stats.waterVoxels}</li>
            <li>云块 {stats.cloudVoxels}</li>
            <li>树木 {stats.trees}</li>
          </ul>
        </section>
      ) : null}

      <button type="button" className="reset" onClick={onReset}>
        恢复默认
      </button>
      <p className="foot">默认设置：{DEFAULT_SETTINGS.seed} 号种子 · 黎明</p>
    </aside>
  );
}
