import { useState } from "react";
import { SKY_PRESETS } from "../scene/sky";
import { WORLD_PRESETS, type SceneParams } from "../scene/params";
import type { WorldStats } from "../scene/World";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}

function Slider({ label, value, min, max, step, suffix, onChange }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <label className="ctrl">
      <span className="ctrl-label">
        {label}
        <b>
          {Number.isInteger(step) ? Math.round(value) : value.toFixed(2)}
          {suffix ?? ""}
        </b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ ["--fill" as string]: `${percent}%` }}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="toggle">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <i aria-hidden="true" />
    </label>
  );
}

export function ControlPanel({
  params,
  stats,
  presetIndex,
  onChange,
  onPreset,
}: {
  params: SceneParams;
  stats: WorldStats;
  presetIndex: number;
  onChange: (patch: Partial<SceneParams>) => void;
  onPreset: (index: number) => void;
}) {
  const [open, setOpen] = useState(() => window.innerWidth > 720);
  const [section, setSection] = useState<"terrain" | "atmosphere" | "view">("terrain");

  return (
    <aside className={`panel ${open ? "is-open" : "is-closed"}`}>
      <header className="panel-head">
        <div>
          <h2>场景参数</h2>
          <p>Scene Parameters</p>
        </div>
        <button className="icon-btn" onClick={() => setOpen((v) => !v)} aria-label="切换面板">
          {open ? "—" : "+"}
        </button>
      </header>

      {open && (
        <div className="panel-body">
          <nav className="tabs">
            {(
              [
                ["terrain", "地形"],
                ["atmosphere", "光影"],
                ["view", "视角"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                className={section === id ? "active" : ""}
                onClick={() => setSection(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          {section === "terrain" && (
            <div className="group">
              <Slider
                label="体素网格"
                value={params.size}
                min={128}
                max={256}
                step={16}
                suffix=" × "
                onChange={(size) => onChange({ size })}
              />
              <Slider
                label="主峰高度"
                value={params.peakHeight}
                min={28}
                max={104}
                step={1}
                suffix=" 格"
                onChange={(peakHeight) => onChange({ peakHeight })}
              />
              <Slider
                label="山脊锐度"
                value={params.ridgeSharpness}
                min={0.2}
                max={1.8}
                step={0.05}
                onChange={(ridgeSharpness) => onChange({ ridgeSharpness })}
              />
              <Slider
                label="雪线"
                value={params.snowLine}
                min={0.3}
                max={0.95}
                step={0.01}
                onChange={(snowLine) => onChange({ snowLine })}
              />
              <Slider
                label="林线"
                value={params.treeLine}
                min={0.25}
                max={0.9}
                step={0.01}
                onChange={(treeLine) => onChange({ treeLine })}
              />
              <Slider
                label="瀑布数量"
                value={params.waterStreams}
                min={1}
                max={4}
                step={1}
                onChange={(waterStreams) => onChange({ waterStreams })}
              />
              <Slider
                label="云层覆盖"
                value={params.cloudCoverage}
                min={0}
                max={1}
                step={0.01}
                onChange={(cloudCoverage) => onChange({ cloudCoverage })}
              />
              <Slider
                label="云层高度"
                value={params.cloudAltitude}
                min={0.18}
                max={0.72}
                step={0.01}
                onChange={(cloudAltitude) => onChange({ cloudAltitude })}
              />
              <div className="row">
                <button
                  className="wide-btn"
                  onClick={() => onChange({ seed: Math.floor(Math.random() * 1e6) })}
                >
                  换一座山 · 随机种子
                </button>
              </div>
            </div>
          )}

          {section === "atmosphere" && (
            <div className="group">
              <div className="row wrap">
                {SKY_PRESETS.map((preset, index) => (
                  <button
                    key={preset.id}
                    className={`chip ${params.skyIndex === index ? "active" : ""}`}
                    onClick={() => onChange({ skyIndex: index })}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <Slider
                label="雾气浓度"
                value={params.fogScale}
                min={0}
                max={2.4}
                step={0.05}
                onChange={(fogScale) => onChange({ fogScale })}
              />
              <Toggle
                label="投射阴影"
                checked={params.shadows}
                onChange={(shadows) => onChange({ shadows })}
              />
              <Toggle
                label="自动环绕"
                checked={params.autoRotate}
                onChange={(autoRotate) => onChange({ autoRotate })}
              />
            </div>
          )}

          {section === "view" && (
            <div className="group">
              <div className="row wrap">
                {WORLD_PRESETS.map((preset, index) => (
                  <button
                    key={preset.id}
                    className={`chip ${presetIndex === index ? "active" : ""}`}
                    onClick={() => onPreset(index)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className="hint">拖拽旋转 · 滚轮缩放 · 右键平移</p>
            </div>
          )}

          <footer className="panel-foot">
            <span>体素 {stats.voxels.toLocaleString()}</span>
            <span>三角面 {stats.triangles.toLocaleString()}</span>
            <span>{Math.round(stats.fps)} FPS</span>
          </footer>
        </div>
      )}
    </aside>
  );
}
