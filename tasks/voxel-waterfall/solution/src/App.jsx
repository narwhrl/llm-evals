import { useCallback, useMemo, useState } from "react";
import { VoxelScene } from "./scene/VoxelScene.jsx";
import { TIMES } from "./scene/lighting.js";

const DEFAULTS = {
  seed: 7,
  size: 256,
  peakScale: 1,
  waterfallCount: 3,
  flow: 1,
  cloudDensity: 0.62,
  cloudLift: 0,
  foliage: 0.7,
  time: "dusk",
  autorotate: true,
  wireframe: false,
};

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function App() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [stats, setStats] = useState(null);
  const [open, setOpen] = useState(true);
  const onStats = useCallback((next) => setStats(next), []);
  const patch = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setSettings((prev) => ({
      ...prev,
      [key]: event.target.type === "range" || event.target.type === "number" ? Number(value) : value,
    }));
  };

  const summary = useMemo(() => {
    if (!stats) return "正在生成山脉…";
    return `${stats.size}×${stats.size} 柱 · 主峰 ${stats.peak} · 瀑布 ${stats.falls} · 云底 ${stats.cloudBase}`;
  }, [stats]);

  return (
    <main className="app">
      <VoxelScene settings={settings} onStats={onStats} />
      <header className="hud">
        <div>
          <p className="kicker">Voxel landscape</p>
          <h1>山 · 瀑布 · 穿云</h1>
          <p className="summary">{summary}</p>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)}>
          {open ? "收起选项" : "场景选项"}
        </button>
      </header>
      {open && (
        <form className="panel" onSubmit={(event) => event.preventDefault()}>
          <Field label={`种子 ${settings.seed}`}>
            <input type="range" min="1" max="999" value={settings.seed} onChange={patch("seed")} />
          </Field>
          <Field label={`分辨率 ${settings.size}`}>
            <input type="range" min="200" max="320" step="8" value={settings.size} onChange={patch("size")} />
          </Field>
          <Field label={`峰高 ${settings.peakScale.toFixed(2)}`}>
            <input type="range" min="0.7" max="1.45" step="0.05" value={settings.peakScale} onChange={patch("peakScale")} />
          </Field>
          <Field label={`瀑布 ${settings.waterfallCount}`}>
            <input type="range" min="1" max="5" step="1" value={settings.waterfallCount} onChange={patch("waterfallCount")} />
          </Field>
          <Field label={`流量 ${settings.flow.toFixed(2)}`}>
            <input type="range" min="0.2" max="2.4" step="0.1" value={settings.flow} onChange={patch("flow")} />
          </Field>
          <Field label={`云密度 ${settings.cloudDensity.toFixed(2)}`}>
            <input type="range" min="0.15" max="1" step="0.05" value={settings.cloudDensity} onChange={patch("cloudDensity")} />
          </Field>
          <Field label={`云层高度 ${settings.cloudLift}`}>
            <input type="range" min="-8" max="10" step="1" value={settings.cloudLift} onChange={patch("cloudLift")} />
          </Field>
          <Field label={`植被 ${settings.foliage.toFixed(2)}`}>
            <input type="range" min="0" max="1.3" step="0.05" value={settings.foliage} onChange={patch("foliage")} />
          </Field>
          <Field label="时段">
            <select value={settings.time} onChange={patch("time")}>
              {Object.entries(TIMES).map(([id, look]) => (
                <option key={id} value={id}>
                  {look.label}
                </option>
              ))}
            </select>
          </Field>
          <label className="check">
            <input type="checkbox" checked={settings.autorotate} onChange={patch("autorotate")} />
            自动环绕
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.wireframe} onChange={patch("wireframe")} />
            线框
          </label>
          <button type="button" onClick={() => setSettings(DEFAULTS)}>
            恢复默认
          </button>
        </form>
      )}
    </main>
  );
}
