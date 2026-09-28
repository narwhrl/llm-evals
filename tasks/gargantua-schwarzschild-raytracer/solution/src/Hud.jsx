import { useState } from 'react';

const SHORTCUTS = [
  ['0–9', '调试视图'],
  ['Shift+1–4', '视角预设'],
  ['Space', '播放/暂停镜头循环'],
  ['H', '显示/隐藏 HUD'],
  ['R', '重置全部参数'],
  ['Q', '切换质量档'],
];

function formatValue(p, v) {
  const digits = p.step >= 1 ? 0 : p.step >= 0.1 ? 1 : p.step >= 0.01 ? 2 : 3;
  return `${v.toFixed(digits)}${p.unit ? ` ${p.unit}` : ''}`;
}

function Slider({ p, value, onChange }) {
  const id = `param-${p.key}`;
  return (
    <div className="slider">
      <label htmlFor={id}>
        <span>{p.label}</span>
        <output htmlFor={id}>{formatValue(p, value)}</output>
      </label>
      <input
        id={id}
        type="range"
        min={p.min}
        max={p.max}
        step={p.step}
        value={value}
        onChange={(e) => onChange(p.key, Number(e.target.value))}
      />
    </div>
  );
}

export default function Hud({ state, status, actions, params, groups, presets, debugModes, qualityProfiles, capture }) {
  const [panel, setPanel] = useState(() => (window.innerWidth >= 900 ? 'camera' : null));
  if (!state.hud) {
    if (capture) return null;
    return (
      <button type="button" className="hud-reveal" onClick={actions.toggleHud} aria-label="显示 HUD（H）">
        HUD · H
      </button>
    );
  }
  const q = qualityProfiles[state.quality];
  const debug = debugModes[state.debug];
  return (
    <div className="hud">
      <header className="hud-top">
        <div className="title">
          <h1>GARGANTUA</h1>
          <p>Schwarzschild 零测地线实时光线追踪 · M = 1</p>
        </div>
        <div className="chips" aria-live="polite">
          <button type="button" className="chip" onClick={actions.cycleQuality} title="切换质量档（Q）">
            质量 <b>{q.label}</b>
          </button>
          <span className="chip">
            调试 <b>{state.debug}</b> {debug.name}
          </span>
          <button type="button" className={`chip ${state.cinematic ? 'on' : ''}`} onClick={actions.toggleCinematic} title="播放/暂停（Space）">
            镜头 <b>{state.cinematic ? '循环播放' : '手动'}</b>
          </button>
          <button type="button" className="chip ghost" onClick={actions.toggleHud} title="隐藏 HUD（H）">
            隐藏
          </button>
        </div>
      </header>

      <nav className="presets" aria-label="视角预设">
        {presets.map((p, i) => (
          <button
            type="button"
            key={p.name}
            className={state.preset === i ? 'active' : ''}
            onClick={() => actions.setPreset(i)}
            title={`Shift+${i + 1}`}
          >
            <kbd>⇧{i + 1}</kbd> {p.name}
          </button>
        ))}
      </nav>

      <aside className={`drawer ${panel ? 'open' : ''}`}>
        <div className="tabs" role="tablist">
          {groups.map((g) => (
            <button
              type="button"
              role="tab"
              aria-selected={panel === g.id}
              key={g.id}
              className={panel === g.id ? 'active' : ''}
              onClick={() => setPanel(panel === g.id ? null : g.id)}
            >
              {g.label}
            </button>
          ))}
          <button type="button" role="tab" aria-selected={panel === 'debug'} className={panel === 'debug' ? 'active' : ''} onClick={() => setPanel(panel === 'debug' ? null : 'debug')}>
            调试
          </button>
        </div>
        {panel && panel !== 'debug' && (
          <div className="panel">
            {params
              .filter((p) => p.group === panel)
              .map((p) => (
                <Slider key={p.key} p={p} value={state.params[p.key]} onChange={actions.setParam} />
              ))}
          </div>
        )}
        {panel === 'debug' && (
          <div className="panel debug-list">
            {debugModes.map((d, i) => (
              <button type="button" key={d.name} className={state.debug === i ? 'active' : ''} onClick={() => actions.setDebug(i)}>
                <kbd>{i}</kbd>
                <span>
                  <b>{d.name}</b>
                  <small>{d.desc}</small>
                </span>
              </button>
            ))}
          </div>
        )}
        {panel && (
          <div className="panel-foot">
            <span>
              {status.renderSize[0]}×{status.renderSize[1]} · {q.maxSteps} 步 · {q.maxCrossings} 次盘面穿越 · Bloom {q.bloomLevels} 级
            </span>
            <button type="button" className="reset" onClick={actions.reset}>
              重置全部（R）
            </button>
          </div>
        )}
      </aside>

      <footer className="hud-bottom">
        <p className="debug-desc">
          <b>
            [{state.debug}] {debug.name}
          </b>{' '}
          {debug.desc}
        </p>
        <ul className="keys">
          {SHORTCUTS.map(([k, d]) => (
            <li key={k}>
              <kbd>{k}</kbd> {d}
            </li>
          ))}
          <li>
            <kbd>拖拽 / 滚轮 / 双指</kbd> 环绕与缩放
          </li>
        </ul>
      </footer>
    </div>
  );
}
