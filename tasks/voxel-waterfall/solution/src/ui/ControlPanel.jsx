import { useState } from 'react';
import { timeLabel } from '../scene/sky.js';

function Slider({ label, value, min, max, step = 1, onChange, display }) {
  return (
    <label className="row">
      <span className="row-label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <span className="row-value">{display ? display(value) : value}</span>
    </label>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <label className="row toggle">
      <span className="row-label">{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="row-value">{value ? '开' : '关'}</span>
    </label>
  );
}

function Section({ title, children }) {
  return (
    <fieldset className="section">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

export default function ControlPanel({ options, onChange, actions }) {
  const [open, setOpen] = useState(() => window.innerWidth > 720);

  return (
    <>
      <button className={`panel-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        ⚙ 场景设置
      </button>
      <aside className={`panel ${open ? '' : 'closed'}`}>
        <Section title="地形">
          <Slider label="山体高度" value={options.heightScale} min={0.6} max={1.5} step={0.05}
            onChange={(v) => onChange({ heightScale: v })}
            display={(v) => `${Math.round(v * 100)}%`} />
          <Slider label="起伏细节" value={options.noiseScale} min={0.6} max={1.6} step={0.05}
            onChange={(v) => onChange({ noiseScale: v })}
            display={(v) => `${Math.round(v * 100)}%`} />
          <Slider label="雪线高度" value={options.snowLine} min={30} max={58} step={1}
            onChange={(v) => onChange({ snowLine: v })} />
          <button className="btn primary" onClick={actions.regenerate}>🎲 换个地形</button>
        </Section>

        <Section title="瀑布">
          <Toggle label="显示水系" value={options.waterfall}
            onChange={(v) => onChange({ waterfall: v })} />
          <Slider label="流速" value={options.flowSpeed} min={0.2} max={3} step={0.1}
            onChange={(v) => onChange({ flowSpeed: v })}
            display={(v) => `${v.toFixed(1)}×`} />
          <Slider label="主落差" value={options.fallHeight} min={8} max={22} step={1}
            onChange={(v) => onChange({ fallHeight: v })} />
          <Slider label="河道宽度" value={options.channelWidth} min={1} max={3} step={1}
            onChange={(v) => onChange({ channelWidth: v })} />
        </Section>

        <Section title="云层">
          <Slider label="覆盖率" value={options.cloudCoverage} min={0.25} max={0.68} step={0.01}
            onChange={(v) => onChange({ cloudCoverage: v })}
            display={(v) => `${Math.round(v * 100)}%`} />
          <Slider label="云层高度" value={options.cloudHeight} min={18} max={34} step={1}
            onChange={(v) => onChange({ cloudHeight: v })} />
          <Slider label="漂移速度" value={options.cloudDrift} min={0} max={3} step={0.1}
            onChange={(v) => onChange({ cloudDrift: v })}
            display={(v) => `${v.toFixed(1)}×`} />
          <Slider label="通透度" value={options.cloudOpacity} min={0.4} max={1} step={0.05}
            onChange={(v) => onChange({ cloudOpacity: v })}
            display={(v) => `${Math.round(v * 100)}%`} />
        </Section>

        <Section title="光照 · 植被">
          <Slider label="时辰" value={options.timeOfDay} min={0} max={1} step={0.01}
            onChange={(v) => onChange({ timeOfDay: v })}
            display={timeLabel} />
          <Slider label="树木数量" value={options.treeDensity} min={0} max={320} step={10}
            onChange={(v) => onChange({ treeDensity: v })} />
        </Section>

        <Section title="视角">
          <Toggle label="自动环绕" value={options.autoRotate}
            onChange={(v) => onChange({ autoRotate: v })} />
          <button className="btn" onClick={actions.resetView}>重置视角</button>
        </Section>
      </aside>
    </>
  );
}
