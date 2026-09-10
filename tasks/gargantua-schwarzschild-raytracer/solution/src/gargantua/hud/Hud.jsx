import {
  CAMERA_PRESETS,
  DEBUG_VIEWS,
  PARAM_DEFS,
  QUALITY_ORDER,
  QUALITY_TIERS,
} from '../state.js';
import './hud.css';

const GROUP_ORDER = ['相机', '模拟', '吸积盘', '背景', '后处理'];

const PRESET_SHORTCUTS = ['Shift+1', 'Shift+2', 'Shift+3', 'Shift+4'];

function formatValue(value) {
  if (Math.abs(value) >= 1000) return Math.round(value).toString();
  if (Math.abs(value) >= 100) return value.toFixed(0);
  if (Math.abs(value) >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

function ParamSlider({ def, value, onChange }) {
  return (
    <label className="ctl">
      <span className="ctl-head">
        <span className="ctl-label">{def.label}</span>
        <span className="ctl-value">
          {formatValue(value)}
          {def.unit}
        </span>
      </span>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => onChange(def.key, parseFloat(e.target.value))}
        aria-label={def.label}
      />
    </label>
  );
}

/**
 * Collapsible in-scene HUD: quality tiers, view presets, cinematic toggle,
 * the 21 live parameters, the debug-view indicator, and the shortcut legend.
 */
export function Hud({ store, snapshot }) {
  const collapsed = snapshot.hudCollapsed;
  const debugInfo = DEBUG_VIEWS[snapshot.debugView] ?? DEBUG_VIEWS[0];

  return (
    <div className={`hud-root${collapsed ? ' hud-collapsed' : ''}`}>
      <div className="hud-top">
        <div className="hud-title">
          <h1>GARGANTUA</h1>
          <p>Schwarzschild 黑洞 · 零测地线实时光线追踪</p>
        </div>
        <div className="hud-topbar">
          <div className="hud-cluster" role="group" aria-label="质量档">
            <span className="cluster-label">画质</span>
            {QUALITY_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className={`chip${snapshot.quality === key ? ' active' : ''}`}
                onClick={() => store.setQuality(key)}
              >
                {QUALITY_TIERS[key].label}
              </button>
            ))}
          </div>
          <div className="hud-cluster" role="group" aria-label="视角预设">
            <span className="cluster-label">视角</span>
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                className={`chip${snapshot.presetIndex === i ? ' active' : ''}`}
                title={`${PRESET_SHORTCUTS[i]} 切换`}
                onClick={() => store.setPreset(i)}
              >
                {i + 1}. {CAMERA_PRESETS[i].name}
              </button>
            ))}
          </div>
          <div className="hud-cluster">
            <button
              type="button"
              className={`chip${snapshot.cinematic ? ' active' : ''}`}
              onClick={() => store.toggleCinematic()}
            >
              {snapshot.cinematic ? '⏸ 暂停镜头' : '▶ 电影镜头'}
            </button>
            <button type="button" className="chip" onClick={() => store.reset()}>
              重置
            </button>
            <button
              type="button"
              className="chip"
              onClick={() => store.setHudCollapsed(true)}
              title="折叠面板（H）"
            >
              收起面板
            </button>
          </div>
        </div>
      </div>

      {collapsed ? (
        <button
          type="button"
          className="hud-expand"
          onClick={() => store.setHudCollapsed(false)}
          title="展开面板（H）"
        >
          ☰ 面板
        </button>
      ) : (
        <aside className="hud-panel">
          <div className="panel-head">
            <span>参数控制台</span>
            <button
              type="button"
              className="chip small"
              onClick={() => store.setHudCollapsed(true)}
            >
              ✕
            </button>
          </div>
          {GROUP_ORDER.map((group) => (
            <section key={group} className="panel-group">
              <h4>{group}</h4>
              {PARAM_DEFS.filter((d) => d.group === group).map((def) => (
                <ParamSlider
                  key={def.key}
                  def={def}
                  value={snapshot.params[def.key]}
                  onChange={(key, v) => store.setParam(key, v)}
                />
              ))}
            </section>
          ))}
        </aside>
      )}

      <div className="hud-debug">
        <span className="debug-key">调试 {debugInfo.key}</span>
        <span className="debug-name">{debugInfo.name}</span>
        <span className="debug-desc">{debugInfo.desc}</span>
      </div>

      <div className="hud-legend">
        <span>0–9 调试视图</span>
        <span>Shift+1–4 预设</span>
        <span>Space 电影镜头</span>
        <span>H 面板</span>
        <span>R 重置</span>
        <span>Q 画质</span>
        <span>拖拽旋转 · 滚轮缩放</span>
      </div>
    </div>
  );
}
