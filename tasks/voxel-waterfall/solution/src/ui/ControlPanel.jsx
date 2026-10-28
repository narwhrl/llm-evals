import { useState } from "react";

function Slider({ label, value, min, max, step, unit, onChange, format }) {
  const shown = format ? format(value) : value;
  return (
    <label className="ctl">
      <span className="ctl-label">
        {label}
        <em>
          {shown}
          {unit || ""}
        </em>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="ctl ctl-toggle">
      <span className="ctl-label">{label}</span>
      <button
        type="button"
        className={"switch" + (checked ? " on" : "")}
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
      >
        <span className="knob" />
      </button>
    </label>
  );
}

function Section({ title, children }) {
  return (
    <details className="section" open>
      <summary>{title}</summary>
      <div className="section-body">{children}</div>
    </details>
  );
}

export function ControlPanel({ opts, set, patch, onRandomize }) {
  const deg = Math.round((opts.fallAngle * 180) / Math.PI);
  return (
    <div className="panel">
      <div className="panel-head">
        <span>Voxel Waterfall · 体素瀑布</span>
        <button
          type="button"
          className="collapse"
          onClick={() => document.querySelector(".panel-body").classList.toggle("hidden")}
        >
          –
        </button>
      </div>
      <div className="panel-body">
        <Section title="山体地形">
          <Slider label="体素网格" value={opts.resolution} min={120} max={240} step={10} onChange={(v) => set("resolution", v)} format={(v) => `${v}×${v}`} />
          <Slider label="主峰高度" value={opts.mesaTop} min={24} max={70} step={1} onChange={(v) => set("mesaTop", v)} />
          <Slider label="平顶半径" value={opts.mesaRadius} min={14} max={40} step={1} onChange={(v) => set("mesaRadius", v)} />
          <Slider label="悬崖宽度" value={opts.rimWidth} min={6} max={30} step={1} onChange={(v) => set("rimWidth", v)} />
          <Slider label="地面起伏" value={opts.groundAmp} min={0} max={20} step={1} onChange={(v) => set("groundAmp", v)} />
          <Slider label="次峰高度" value={opts.subPeakAmp} min={0} max={36} step={1} onChange={(v) => set("subPeakAmp", v)} />
          <Slider label="雪线" value={opts.snowLine} min={20} max={60} step={1} onChange={(v) => set("snowLine", v)} />
        </Section>

        <Section title="瀑布">
          <Slider label="落瀑方向" value={deg} min={0} max={359} step={1} unit="°" onChange={(v) => set("fallAngle", (v * Math.PI) / 180)} />
          <Slider label="瀑布宽度" value={opts.fallWidth} min={4} max={18} step={1} onChange={(v) => set("fallWidth", v)} />
          <Slider label="水量（粒子）" value={opts.fallCount} min={150} max={1400} step={50} onChange={(v) => set("fallCount", v)} />
        </Section>

        <Section title="穿云效果">
          <Slider label="云层高度" value={opts.cloudY} min={6} max={60} step={1} onChange={(v) => set("cloudY", v)} />
          <Slider label="云量" value={opts.cloudCount} min={60} max={520} step={10} onChange={(v) => set("cloudCount", v)} />
          <Slider label="飘移速度" value={opts.cloudSpeed} min={0} max={10} step={0.5} onChange={(v) => set("cloudSpeed", v)} />
        </Section>

        <Section title="光影氛围">
          <label className="ctl">
            <span className="ctl-label">时间段</span>
            <select value={opts.timeOfDay} onChange={(e) => set("timeOfDay", e.target.value)}>
              <option value="noon">正午</option>
              <option value="dusk">黄昏</option>
              <option value="dawn">清晨</option>
              <option value="night">夜晚</option>
            </select>
          </label>
          <Slider label="阳光强度" value={opts.lightIntensity} min={0} max={2} step={0.05} onChange={(v) => set("lightIntensity", v)} />
          <Slider label="环境光" value={opts.hemiIntensity} min={0} max={1.5} step={0.05} onChange={(v) => set("hemiIntensity", v)} />
          <Slider label="雾气浓度" value={opts.fogDensity} min={0} max={0.012} step={0.0005} onChange={(v) => set("fogDensity", v)} format={(v) => v.toFixed(4)} />
          <Toggle label="实时阴影" checked={opts.shadows} onChange={(v) => set("shadows", v)} />
          <Toggle label="太阳旋转" checked={opts.sunOrbit} onChange={(v) => set("sunOrbit", v)} />
        </Section>

        <Section title="镜头与随机">
          <Toggle label="自动环绕" checked={opts.autoRotate} onChange={(v) => set("autoRotate", v)} />
          <Slider label="环绕速度" value={opts.rotateSpeed} min={0.1} max={3} step={0.1} onChange={(v) => set("rotateSpeed", v)} />
          <button type="button" className="btn" onClick={onRandomize}>
            随机地形（seed {opts.seed}）
          </button>
        </Section>
      </div>
    </div>
  );
}
