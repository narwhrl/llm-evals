import type { SceneSettings } from '../voxel/types';

interface Props {
  settings: SceneSettings;
  onChange: (patch: Partial<SceneSettings>) => void;
  onRegenerate: () => void;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="control-row">
      <span>
        {label}
        <em>{typeof value === 'number' ? (Number.isInteger(step) ? value : value.toFixed(2)) : value}</em>
      </span>
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

export function ControlPanel({ settings, onChange, onRegenerate }: Props) {
  return (
    <aside className="panel" aria-label="Scene controls">
      <header>
        <h1>Voxel Waterfall</h1>
        <p>Minecraft-style mountains · waterfall · piercing clouds</p>
      </header>

      <section>
        <h2>Atmosphere</h2>
        <Slider
          label="Time of day"
          value={settings.timeOfDay}
          min={0}
          max={1}
          step={0.01}
          onChange={(timeOfDay) => onChange({ timeOfDay })}
        />
        <label className="control-check">
          <input
            type="checkbox"
            checked={settings.fogEnabled}
            onChange={(e) => onChange({ fogEnabled: e.target.checked })}
          />
          Fog / mist
        </label>
        <Slider
          label="Fog density"
          value={settings.fogDensity}
          min={0.002}
          max={0.04}
          step={0.001}
          onChange={(fogDensity) => onChange({ fogDensity })}
        />
      </section>

      <section>
        <h2>Water &amp; clouds</h2>
        <Slider
          label="Waterfall speed"
          value={settings.waterfallSpeed}
          min={0}
          max={3}
          step={0.05}
          onChange={(waterfallSpeed) => onChange({ waterfallSpeed })}
        />
        <Slider
          label="Water opacity"
          value={settings.waterOpacity}
          min={0.25}
          max={1}
          step={0.01}
          onChange={(waterOpacity) => onChange({ waterOpacity })}
        />
        <label className="control-check">
          <input
            type="checkbox"
            checked={settings.showClouds}
            onChange={(e) => onChange({ showClouds: e.target.checked })}
          />
          Cloud layer
        </label>
        <Slider
          label="Cloud density"
          value={settings.cloudDensity}
          min={0.15}
          max={0.95}
          step={0.01}
          onChange={(cloudDensity) => onChange({ cloudDensity })}
        />
        <Slider
          label="Cloud height"
          value={settings.cloudHeight}
          min={12}
          max={40}
          step={1}
          onChange={(cloudHeight) => onChange({ cloudHeight })}
        />
      </section>

      <section>
        <h2>Terrain</h2>
        <Slider
          label="Mountain height"
          value={settings.mountainHeight}
          min={28}
          max={70}
          step={1}
          onChange={(mountainHeight) => onChange({ mountainHeight })}
        />
        <Slider
          label="Seed"
          value={settings.seed}
          min={1}
          max={200}
          step={1}
          onChange={(seed) => onChange({ seed })}
        />
        <label className="control-check">
          <input
            type="checkbox"
            checked={settings.vegetation}
            onChange={(e) => onChange({ vegetation: e.target.checked })}
          />
          Foothill vegetation
        </label>
        <label className="control-check">
          <input
            type="checkbox"
            checked={settings.autoOrbit}
            onChange={(e) => onChange({ autoOrbit: e.target.checked })}
          />
          Auto-orbit camera
        </label>
        <button type="button" className="regen" onClick={onRegenerate}>
          Regenerate (new seed)
        </button>
      </section>

      <footer>
        Footprint {settings.size}×{settings.size} voxels · drag to look around
      </footer>
    </aside>
  );
}
