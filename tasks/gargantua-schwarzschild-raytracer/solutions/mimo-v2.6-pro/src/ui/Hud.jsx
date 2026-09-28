import React from 'react';
import ParamSlider from './ParamSlider.jsx';
import {
  PARAM_DEFS,
  PARAM_GROUPS,
  PRESETS,
  DEBUG_VIEWS,
  DEFAULT_PARAMS,
} from '../state/defaults.js';

const QUALITY_LABEL = { standard: 'Standard 标准', high: 'High 高', cinematic: 'Cinematic 电影' };
const CTX_LABEL = { normal: '渲染正常', lost: '上下文丢失 - 恢复中…', restored: '上下文已恢复' };

// 单一可折叠 HUD：状态 / 预设 / 参数 / 快捷键 五区；
// 桌面右侧悬浮列（不遮挡中央临界结构），移动端底部抽屉（可收起）。
export default function Hud({ state, simTime, actions, capture, onResetAll }) {
  const p = state.params;
  const dbg = DEBUG_VIEWS[state.debug] ?? DEBUG_VIEWS[0];
  const hideAll = capture && !state.hudOpen;

  return (
    <>
      <aside
        className={`hud ${state.hudOpen ? 'hud--open' : ''} ${hideAll ? 'hud--hidden' : ''}`}
        aria-label="GARGANTUA HUD"
      >
        <header className="hud__handle" onClick={actions.toggleHud}>
          <strong>GARGANTUA</strong>
          <span className="hud__summary">
            {QUALITY_LABEL[state.quality]} · 调试 {state.debug} · {state.playing ? '镜头播放' : '镜头暂停'}
          </span>
          <span className="hud__toggle">{state.hudOpen ? '收起 ▾' : '展开 ▴'}</span>
        </header>

        <div className="hud__body">
          <section className="hud__section">
            <h3>状态</h3>
            <div className="hud__row">
              <span>质量档</span>
              <button type="button" onClick={actions.cycleQuality}>
                {QUALITY_LABEL[state.quality]}
              </button>
              <kbd>Q</kbd>
            </div>
            <div className="hud__row hud__row--col">
              <span>
                调试视图 <b>{state.debug}</b> · {dbg.name}
              </span>
              <small>{dbg.desc}</small>
            </div>
            <div className="hud__row hud__row--col">
              <span>
                镜头：距离 {p.camDist.toFixed(1)} rs · 方位 {Math.round(p.camAzimuth)}° · 俯仰{' '}
                {Math.round(p.camElevation)}° · FOV {Math.round(p.fov)}°
              </span>
              <small>
                模拟时间 {simTime.toFixed(2)} s · 镜头循环 {state.playing ? '播放' : '暂停'}
                {capture ? ' · capture 冻结' : ''}
              </small>
            </div>
            <div className="hud__row">
              <span className={`hud__chip hud__chip--${state.ctxStatus}`}>{CTX_LABEL[state.ctxStatus]}</span>
            </div>
          </section>

          <section className="hud__section">
            <h3>
              视角预设 <kbd>Shift</kbd>+<kbd>1</kbd>–<kbd>4</kbd>
            </h3>
            <div className="hud__presets">
              {PRESETS.map((ps, i) => (
                <button
                  type="button"
                  key={ps.name}
                  className={i === state.preset ? 'active' : ''}
                  onClick={() => actions.applyPreset(i)}
                >
                  <b>{i + 1}</b> {ps.name}
                </button>
              ))}
            </div>
          </section>

          <section className="hud__section">
            <h3>参数（21 项，均可生效 · ↺ 单项复位）</h3>
            {PARAM_GROUPS.map((g) => (
              <div className="hud__group" key={g}>
                <h4>{g}</h4>
                {PARAM_DEFS.filter((d) => d.group === g).map((d) => (
                  <ParamSlider
                    key={d.key}
                    def={d}
                    value={p[d.key]}
                    onChange={actions.setParam}
                    onReset={(key) => actions.setParam(key, DEFAULT_PARAMS[key])}
                  />
                ))}
              </div>
            ))}
            <button type="button" className="hud__reset" onClick={onResetAll}>
              全部重置 <kbd>R</kbd>
            </button>
          </section>

          <section className="hud__section">
            <h3>快捷键</h3>
            <ul className="hud__keys">
              <li>
                <kbd>0</kbd>–<kbd>9</kbd> 调试视图切换
              </li>
              <li>
                <kbd>Shift</kbd>+<kbd>1</kbd>–<kbd>4</kbd> 视角预设
              </li>
              <li>
                <kbd>Space</kbd> 播放/暂停电影镜头
              </li>
              <li>
                <kbd>H</kbd> HUD 显隐
              </li>
              <li>
                <kbd>R</kbd> 重置全部
              </li>
              <li>
                <kbd>Q</kbd> 质量档切换
              </li>
              <li className="hud__note">氛围音乐为任务可选项，本实现未提供（无 M 键）</li>
            </ul>
          </section>
        </div>
      </aside>

      {!state.hudOpen && !capture && (
        <button type="button" className="hud-reopen" onClick={actions.toggleHud}>
          ☰ HUD (H)
        </button>
      )}
    </>
  );
}
