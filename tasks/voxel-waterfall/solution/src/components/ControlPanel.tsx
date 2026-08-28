import { useEffect, useRef, useState } from 'react';
import type { SceneParams } from '../scene/params';

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: (v: number) => string;
  onCommit: (v: number) => void;
}

/** 防抖滑杆：拖动即时回显，停顿后提交。 */
function Slider({ label, min, max, step, value, display, onCommit }: SliderProps) {
  const [local, setLocal] = useState(value);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(
    () => () => window.clearTimeout(timer.current),
    [],
  );

  const handle = (v: number) => {
    setLocal(v);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => onCommit(v), 160);
  };

  return (
    <label className="ctl">
      <span className="ctl-head">
        <span>{label}</span>
        <span className="ctl-val">{display(local)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={local}
        aria-label={label}
        onChange={(e) => handle(Number(e.target.value))}
      />
    </label>
  );
}

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ label, value, onChange }: ToggleProps) {
  return (
    <label className="ctl toggle">
      <span>{label}</span>
      <span className="switch">
        <input type="checkbox" checked={value} aria-label={label} onChange={(e) => onChange(e.target.checked)} />
        <span className="track" />
      </span>
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details open className="section">
      <summary>{title}</summary>
      <div className="section-body">{children}</div>
    </details>
  );
}

const pct = (v: number) => `${Math.round(v * 100)}%`;

function todLabel(v: number): string {
  if (v < 0.18) return '清晨';
  if (v < 0.38) return '上午';
  if (v < 0.62) return '正午';
  if (v < 0.84) return '午后';
  return '黄昏';
}

interface ControlPanelProps {
  params: SceneParams;
  onPatch: (p: Partial<SceneParams>) => void;
  onResetView: () => void;
  onRegenerate: () => void;
}

export function ControlPanel({ params, onPatch, onResetView, onRegenerate }: ControlPanelProps) {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`panel ${open ? '' : 'collapsed'}`}>
      <button
        type="button"
        className="panel-toggle"
        aria-expanded={open}
        aria-label={open ? '收起控制面板' : '展开控制面板'}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '收起 ›' : '‹ 参数'}
      </button>
      {open && (
        <div className="panel-body">
          <div className="panel-title">场景参数</div>

          <Section title="地形">
            <div className="ctl seed-row">
              <span>种子</span>
              <input
                type="text"
                value={params.seed}
                aria-label="地形种子"
                onChange={(e) => onPatch({ seed: e.target.value })}
              />
              <button type="button" onClick={onRegenerate}>
                随机
              </button>
            </div>
            <Slider label="山体高度" min={0.4} max={1.6} step={0.05} value={params.mountainHeight}
              display={(v) => `${Math.round(v * 100)}%`} onCommit={(v) => onPatch({ mountainHeight: v })} />
            <Slider label="地形细节" min={0} max={1} step={0.05} value={params.terrainDetail}
              display={pct} onCommit={(v) => onPatch({ terrainDetail: v })} />
            <Slider label="雪线高度" min={16} max={58} step={1} value={params.snowline}
              display={(v) => `${v}`} onCommit={(v) => onPatch({ snowline: v })} />
            <Slider label="植被密度" min={0} max={1.6} step={0.05} value={params.vegetation}
              display={pct} onCommit={(v) => onPatch({ vegetation: v })} />
          </Section>

          <Section title="瀑布与水">
            <Slider label="瀑布流速" min={0.2} max={3} step={0.05} value={params.waterfallSpeed}
              display={(v) => `${v.toFixed(2)}×`} onCommit={(v) => onPatch({ waterfallSpeed: v })} />
            <Slider label="瀑布宽度" min={1} max={3} step={1} value={params.waterfallWidth}
              display={(v) => `${2 * Math.max(0, v - 1) + 1} 格`} onCommit={(v) => onPatch({ waterfallWidth: v })} />
            <Slider label="水体透明度" min={0.35} max={1} step={0.01} value={params.waterOpacity}
              display={pct} onCommit={(v) => onPatch({ waterOpacity: v })} />
          </Section>

          <Section title="云与雾">
            <Slider label="云量" min={0} max={1} step={0.02} value={params.cloudDensity}
              display={pct} onCommit={(v) => onPatch({ cloudDensity: v })} />
            <Slider label="云层高度" min={14} max={46} step={1} value={params.cloudHeight}
              display={(v) => `${v}`} onCommit={(v) => onPatch({ cloudHeight: v })} />
            <Slider label="云漂移速度" min={0} max={3} step={0.05} value={params.cloudSpeed}
              display={(v) => `${v.toFixed(2)}×`} onCommit={(v) => onPatch({ cloudSpeed: v })} />
            <Slider label="雾浓度" min={0} max={1} step={0.02} value={params.fogAmount}
              display={pct} onCommit={(v) => onPatch({ fogAmount: v })} />
          </Section>

          <Section title="光照与大气">
            <Slider label="时间" min={0} max={1} step={0.01} value={params.timeOfDay}
              display={todLabel} onCommit={(v) => onPatch({ timeOfDay: v })} />
            <Toggle label="投射阴影" value={params.shadows} onChange={(v) => onPatch({ shadows: v })} />
          </Section>

          <Section title="视角">
            <Toggle label="自动环绕" value={params.autoRotate} onChange={(v) => onPatch({ autoRotate: v })} />
            <Slider label="环绕速度" min={0.1} max={3} step={0.05} value={params.rotateSpeed}
              display={(v) => `${v.toFixed(2)}×`} onCommit={(v) => onPatch({ rotateSpeed: v })} />
            <button type="button" className="wide-btn" onClick={onResetView}>
              重置视角
            </button>
          </Section>
        </div>
      )}
    </aside>
  );
}
