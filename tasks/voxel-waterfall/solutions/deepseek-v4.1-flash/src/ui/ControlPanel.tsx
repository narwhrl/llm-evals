import type { SceneOptions } from '../scene/options'
import {
  CLOUD_BLOCKS,
  CLOUD_MARGINS,
  SHADOW_MAP_SIZES,
  TERRAIN_SIZES,
  TIME_ORDER,
  TIME_PRESETS,
} from '../scene/options'
import type { ViewerStats } from '../scene/viewer'

type SliderProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  hint?: string
  format?(value: number): string
  onInput(value: number): void
}

function Slider({ label, value, min, max, step, hint, format, onInput }: SliderProps) {
  return (
    <label className="control">
      <span className="control-head">
        <span className="control-label">{label}</span>
        <span className="control-value">{format ? format(value) : value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onInput(event.target.valueAsNumber)}
      />
      {hint ? <span className="control-hint">{hint}</span> : null}
    </label>
  )
}

type ToggleProps = {
  label: string
  checked: boolean
  onChange(checked: boolean): void
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="control control-inline">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="control-label">{label}</span>
    </label>
  )
}

type ChoiceProps = {
  label: string
  value: string
  choices: { value: string; label: string }[]
  onChange(value: string): void
}

function Choice({ label, value, choices, onChange }: ChoiceProps) {
  return (
    <label className="control control-inline">
      <span className="control-label">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {choices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export type ControlPanelProps = {
  options: SceneOptions
  stats: ViewerStats
  building: boolean
  open: boolean
  seedText: string
  onToggle(): void
  onChange(patch: Partial<SceneOptions>): void
  onSeedTextChange(value: string): void
  onApplySeed(): void
  onRandomSeed(): void
  onReset(): void
  onResetView(): void
}

export default function ControlPanel({
  options,
  stats,
  building,
  open,
  seedText,
  onToggle,
  onChange,
  onSeedTextChange,
  onApplySeed,
  onRandomSeed,
  onReset,
  onResetView,
}: ControlPanelProps) {
  if (!open) {
    return (
      <button type="button" className="panel-tab" onClick={onToggle}>
        场景选项
      </button>
    )
  }

  return (
    <aside className="panel" aria-label="场景选项">
      <header className="panel-head">
        <div>
          <h1>体素山水·瀑布</h1>
          <p>Three.js · 面剔除体素网格</p>
        </div>
        <button type="button" className="panel-close" onClick={onToggle} aria-label="收起选项">
          ×
        </button>
      </header>

      <div className="stats" aria-live="polite">
        <span>
          <strong>{stats.fps}</strong> FPS
        </span>
        <span>
          <strong>{stats.drawCalls}</strong> draw call
        </span>
        <span>
          <strong>{stats.quads.toLocaleString('en-US')}</strong> 面
        </span>
        <span>
          <strong>{stats.voxels.toLocaleString('en-US')}</strong> 体素
        </span>
        <span>
          <strong>{stats.buildMs}</strong> ms 生成
        </span>
        <span>
          最高 <strong>{stats.peakHeight}</strong> 格
        </span>
      </div>

      <section className="group">
        <h2>世界</h2>
        <div className="control control-inline">
          <span className="control-label">随机种子</span>
          <div className="seed-row">
            <input
              type="text"
              inputMode="numeric"
              value={seedText}
              onChange={(event) => onSeedTextChange(event.target.value)}
              onBlur={onApplySeed}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onApplySeed()
              }}
            />
            <button type="button" onClick={onRandomSeed}>
              随机
            </button>
          </div>
        </div>
        <Choice
          label="地形尺寸"
          value={String(options.terrainSize)}
          choices={TERRAIN_SIZES.map((size) => ({
            value: String(size),
            label: `${size} × ${size} 体素`,
          }))}
          onChange={(value) => onChange({ terrainSize: Number(value) })}
        />
        <Slider
          label="山体高度"
          value={options.mountainScale}
          min={0.6}
          max={1.6}
          step={0.05}
          format={(value) => `${value.toFixed(2)} ×`}
          onInput={(value) => onChange({ mountainScale: value })}
        />
        <Slider
          label="山峰数量"
          value={options.peakCount}
          min={2}
          max={6}
          step={1}
          format={(value) => `${value} 座`}
          onInput={(value) => onChange({ peakCount: value })}
        />
        <Slider
          label="海平面高度"
          value={options.seaLevel}
          min={8}
          max={18}
          step={1}
          format={(value) => `${value} 格`}
          onInput={(value) => onChange({ seaLevel: value })}
        />
        <Slider
          label="植被密度"
          value={options.vegetation}
          min={0}
          max={1}
          step={0.05}
          format={(value) => `${Math.round(value * 100)}%（${stats.trees} 棵）`}
          onInput={(value) => onChange({ vegetation: value })}
        />
      </section>

      <section className="group">
        <h2>瀑布</h2>
        <Slider
          label="瀑布道数"
          value={options.waterfallCount}
          min={1}
          max={3}
          step={1}
          format={(value) => `${value} 道`}
          onInput={(value) => onChange({ waterfallCount: value })}
        />
        <Slider
          label="水流宽度"
          value={options.waterfallWidth}
          min={1}
          max={4}
          step={1}
          format={(value) => `${value} 格`}
          onInput={(value) => onChange({ waterfallWidth: value })}
        />
        <Slider
          label="水流动画速度"
          value={options.waterFlowSpeed}
          min={0}
          max={3}
          step={0.1}
          format={(value) => `${value.toFixed(1)} ×`}
          onInput={(value) => onChange({ waterFlowSpeed: value })}
        />
        <Toggle
          label="瀑布水雾"
          checked={options.mist}
          onChange={(checked) => onChange({ mist: checked })}
        />
      </section>

      <section className="group">
        <h2>云与雾</h2>
        <Slider
          label="云层高度"
          value={options.cloudHeight}
          min={0.2}
          max={0.9}
          step={0.02}
          format={(value) => `峰高 ${Math.round(value * 100)}%`}
          onInput={(value) => onChange({ cloudHeight: value })}
        />
        <Slider
          label="云量"
          value={options.cloudCover}
          min={0}
          max={0.8}
          step={0.02}
          format={(value) => `${Math.round(value * 100)}%`}
          onInput={(value) => onChange({ cloudCover: value })}
        />
        <Slider
          label="云层厚度"
          value={options.cloudThickness}
          min={1}
          max={4}
          step={1}
          format={(value) => `${value} 层`}
          onInput={(value) => onChange({ cloudThickness: value })}
        />
        <Choice
          label="云的方块尺寸"
          value={String(options.cloudBlock)}
          choices={CLOUD_BLOCKS.map((block) => ({ value: String(block), label: `${block} 格` }))}
          onChange={(value) => onChange({ cloudBlock: Number(value) })}
        />
        <Slider
          label="云漂移速度"
          value={options.cloudDriftSpeed}
          min={0}
          max={2}
          step={0.1}
          format={(value) => `${value.toFixed(1)} ×`}
          onInput={(value) => onChange({ cloudDriftSpeed: value })}
        />
        <Slider
          label="雾浓度"
          value={options.fogDensity}
          min={0}
          max={0.006}
          step={0.0002}
          format={(value) => value.toFixed(4)}
          onInput={(value) => onChange({ fogDensity: value })}
        />
        <Toggle
          label="云底薄雾"
          checked={options.haze}
          onChange={(checked) => onChange({ haze: checked })}
        />
      </section>

      <section className="group">
        <h2>光照与画面</h2>
        <Choice
          label="时段"
          value={options.timeOfDay}
          choices={TIME_ORDER.map((key) => ({ value: key, label: TIME_PRESETS[key].label }))}
          onChange={(value) => onChange({ timeOfDay: value as SceneOptions['timeOfDay'] })}
        />
        <Toggle
          label="昼夜循环"
          checked={options.dayCycle}
          onChange={(checked) => onChange({ dayCycle: checked })}
        />
        <Slider
          label="循环速度"
          value={options.cycleSpeed}
          min={0.02}
          max={0.6}
          step={0.02}
          format={(value) => `${value.toFixed(2)} ×`}
          onInput={(value) => onChange({ cycleSpeed: value })}
        />
        <Toggle
          label="阴影"
          checked={options.shadows}
          onChange={(checked) => onChange({ shadows: checked })}
        />
        <Choice
          label="阴影精度"
          value={String(options.shadowMapSize)}
          choices={SHADOW_MAP_SIZES.map((size) => ({ value: String(size), label: `${size} px` }))}
          onChange={(value) => onChange({ shadowMapSize: Number(value) })}
        />
        <Toggle
          label="自动旋转"
          checked={options.autoRotate}
          onChange={(checked) => onChange({ autoRotate: checked })}
        />
        <Slider
          label="旋转速度"
          value={options.autoRotateSpeed}
          min={0.05}
          max={1.2}
          step={0.05}
          format={(value) => `${value.toFixed(2)} ×`}
          onInput={(value) => onChange({ autoRotateSpeed: value })}
        />
        <Choice
          label="云板留白"
          value={String(options.cloudMargin)}
          choices={CLOUD_MARGINS.map((margin) => ({ value: String(margin), label: `${margin} 格` }))}
          onChange={(value) => onChange({ cloudMargin: Number(value) })}
        />
      </section>

      <footer className="panel-foot">
        <button type="button" onClick={onResetView}>
          重置视角
        </button>
        <button type="button" onClick={onReset}>
          恢复默认
        </button>
      </footer>

      {building ? <p className="building">正在生成体素世界…</p> : null}
    </aside>
  )
}
