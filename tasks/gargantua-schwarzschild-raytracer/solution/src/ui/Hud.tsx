import { useState } from 'react';
import {
  DEBUG_MODES,
  GROUP_LABELS,
  PARAM_DEFS,
  PRESETS,
  QUALITY_LABELS,
  type ParamGroup,
} from '../state/defaults';
import { store } from '../state/store';
import { useStoreState } from './useStore';
import { ParamSlider } from './ParamSlider';
import './hud.css';

const GROUPS: ParamGroup[] = ['camera', 'disk', 'background', 'post'];

function TopBar() {
  const s = useStoreState();
  return (
    <div className="hud-panel top-bar">
      <div className="title">GARGANTUA</div>
      <div className="subtitle">Schwarzschild Black Hole Raytracer</div>
      <div className="status">
        <span>
          质量 <b>{QUALITY_LABELS[s.quality]}</b>
        </span>
        <span>
          镜头{' '}
          <b>
            {s.cinematic ? '电影循环 ▶' : '手动控制 ❚❚'}
          </b>
        </span>
        <span>
          调试 <b>{s.debug}·{DEBUG_MODES[s.debug].name}</b>
        </span>
        <span>
          FPS <b>{s.perf.fps || '—'}</b>
          {s.perf.ms ? <small> ({s.perf.ms} ms)</small> : null}
        </span>
      </div>
    </div>
  );
}

function PresetsBar() {
  const s = useStoreState();
  return (
    <div className="hud-panel presets-bar">
      <div className="bar-caption">
        视角预设 <small>Shift+1–4</small>
      </div>
      <div className="row">
        {PRESETS.map((p, i) => (
          <button
            key={p.name}
            className={s.preset === i ? 'active' : ''}
            title={p.desc}
            onClick={() => store.applyPresetCamera(i)}
          >
            {i + 1}·{p.name}
          </button>
        ))}
      </div>
      <div className="row">
        <button onClick={() => store.cycleQuality()} title="快捷键 Q">
          质量 {QUALITY_LABELS[s.quality]} ⇄
        </button>
        <button
          onClick={() => store.toggleCinematic()}
          title="快捷键 Space"
          disabled={store.capture.capture}
        >
          {s.cinematic ? '暂停镜头' : '播放镜头'}
        </button>
        <button className="danger" onClick={() => store.reset()} title="快捷键 R">
          重置全部
        </button>
      </div>
    </div>
  );
}

function DebugBar() {
  const s = useStoreState();
  return (
    <div className="hud-panel debug-bar">
      <div className="bar-caption">
        调试视图 <small>0–9</small> — {DEBUG_MODES[s.debug].desc}
      </div>
      <div className="row">
        {DEBUG_MODES.map((m, i) => (
          <button
            key={i}
            className={s.debug === i ? 'active' : ''}
            title={m.desc}
            onClick={() => store.setDebug(i)}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}

function ParamsPanel({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className={`hud-panel params-panel ${open ? '' : 'collapsed'}`}>
      <button className="panel-toggle" onClick={onToggle}>
        {open ? '收起参数 ▾' : '▴ 参数'}
      </button>
      {open ? (
        <div className="params-scroll">
          {GROUPS.map((g) => (
            <details key={g} open={g === 'camera' || g === 'disk'}>
              <summary>{GROUP_LABELS[g]}</summary>
              {PARAM_DEFS.filter((d) => d.group === g).map((d) => (
                <ParamSlider key={d.key} paramKey={d.key} />
              ))}
            </details>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HelpBar() {
  const [open, setOpen] = useState(!window.matchMedia('(max-width: 760px)').matches);
  return (
    <div className="hud-panel help-bar">
      <button className="panel-toggle" onClick={() => setOpen(!open)}>
        操作 {open ? '▾' : '▸'}
      </button>
      {open ? (
        <ul>
          <li>拖拽 旋转 · 滚轮/双指 缩放</li>
          <li>
            <b>0–9</b> 调试视图 · <b>Shift+1–4</b> 预设
          </li>
          <li>
            <b>Space</b> 镜头播放/暂停 · <b>H</b> HUD
          </li>
          <li>
            <b>R</b> 重置 · <b>Q</b> 质量档 · <b>M</b> 氛围音
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export function ContextLostOverlay() {
  return (
    <div className="overlay">
      <div className="hud-panel overlay-card">
        <div className="overlay-title">WebGL 上下文已丢失</div>
        <div>渲染已暂停。等待上下文恢复后将自动重建资源并继续…</div>
      </div>
    </div>
  );
}

export function FatalOverlay({ message }: { message: string }) {
  return (
    <div className="overlay">
      <div className="hud-panel overlay-card">
        <div className="overlay-title">无法启动 WebGL 渲染</div>
        <div className="mono">{message}</div>
        <div>请使用支持 WebGL2 的浏览器重试。</div>
      </div>
    </div>
  );
}

export function Hud() {
  const [paramsOpen, setParamsOpen] = useState(
    !window.matchMedia('(max-width: 760px)').matches,
  );
  return (
    <div className="hud-root">
      <TopBar />
      <PresetsBar />
      <DebugBar />
      <ParamsPanel open={paramsOpen} onToggle={() => setParamsOpen(!paramsOpen)} />
      <HelpBar />
    </div>
  );
}
