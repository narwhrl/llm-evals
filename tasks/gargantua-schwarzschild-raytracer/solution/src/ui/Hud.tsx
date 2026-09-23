import { useSyncExternalStore } from "react";
import {
  DEBUG_VIEWS,
  PARAM_DEFS,
  PRESETS,
  QUALITIES,
  type ParamKey,
} from "../state/defaults";
import { store } from "../state/store";
import type { EngineStatus } from "../engine/Engine";
import { ParamSlider } from "./Slider";

const GROUP_LABELS: Record<string, string> = {
  camera: "相机与时间",
  disk: "吸积盘",
  background: "星空背景",
  post: "后处理",
};

interface Props {
  status: EngineStatus;
  fps: number;
}

export function Hud({ status, fps }: Props) {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  const onParam = (key: ParamKey, value: number) => store.setParams({ [key]: value });

  if (state.hudCollapsed) {
    return (
      <div className="hud-collapsed">
        <button className="hud-chip" onClick={() => store.setHudCollapsed(false)} title="显示 HUD (H)">
          HUD · H
        </button>
        <span className="hud-chip hud-chip-dim">
          {state.quality} · {state.debug}: {DEBUG_VIEWS[state.debug]}
        </span>
      </div>
    );
  }

  return (
    <aside className="hud" aria-label="Gargantua HUD">
      <header className="hud-header">
        <div>
          <h1 className="hud-title">GARGANTUA</h1>
          <p className="hud-sub">Schwarzschild raytracer</p>
        </div>
        <button className="hud-icon-btn" onClick={() => store.setHudCollapsed(true)} title="收起 HUD (H)">
          收起
        </button>
      </header>

      <section className="hud-section">
        <div className="hud-kv">
          <span>质量档 (Q)</span>
          <div className="hud-btn-row">
            {QUALITIES.map((q) => (
              <button
                key={q}
                className={`hud-btn ${state.quality === q ? "is-active" : ""}`}
                onClick={() => store.setQuality(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <div className="hud-kv">
          <span>镜头状态 (Space)</span>
          <button
            className={`hud-btn ${state.cinematic ? "is-live" : ""}`}
            onClick={() => store.setCinematic(!state.cinematic)}
          >
            {state.cinematic ? "电影镜头循环 · 播放中" : "手动控制 · 已暂停"}
          </button>
        </div>
        <div className="hud-kv">
          <span>调试状态 (0–9)</span>
          <span className="hud-value">
            {state.debug} — {DEBUG_VIEWS[state.debug]}
          </span>
        </div>
        <div className="hud-kv">
          <span>渲染</span>
          <span className="hud-value">
            {status === "ok" ? `${fps.toFixed(0)} fps` : status === "context-lost" ? "上下文丢失" : "WebGL 不可用"}
          </span>
        </div>
      </section>

      <section className="hud-section">
        <h2 className="hud-heading">视角预设 (Shift+1…4)</h2>
        <div className="hud-btn-grid">
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              className={`hud-btn ${state.preset === i ? "is-active" : ""}`}
              onClick={() => store.applyPreset(i)}
            >
              {i + 1} · {p.name}
            </button>
          ))}
        </div>
      </section>

      <section className="hud-section">
        <h2 className="hud-heading">调试视图 (0–9)</h2>
        <div className="hud-debug-grid">
          {DEBUG_VIEWS.map((name, i) => (
            <button
              key={name}
              className={`hud-debug-btn ${state.debug === i ? "is-active" : ""}`}
              onClick={() => store.setDebug(i)}
              title={name}
            >
              <span className="hud-debug-num">{i}</span>
              <span className="hud-debug-name">{name}</span>
            </button>
          ))}
        </div>
      </section>

      {(["camera", "disk", "background", "post"] as const).map((group) => (
        <section className="hud-section" key={group}>
          <h2 className="hud-heading">{GROUP_LABELS[group]}</h2>
          {PARAM_DEFS.filter((d) => d.group === group).map((def) => (
            <ParamSlider key={def.key} def={def} value={state.params[def.key]} onChange={onParam} />
          ))}
        </section>
      ))}

      <section className="hud-section">
        <div className="hud-btn-row">
          <button className="hud-btn hud-btn-warn" onClick={() => store.reset()} title="重置 (R)">
            重置全部 (R)
          </button>
          <button
            className={`hud-btn ${state.audio ? "is-live" : ""}`}
            onClick={() => store.setAudio(!state.audio)}
            title="氛围音乐 (M)"
          >
            {state.audio ? "音乐 开 (M)" : "音乐 关 (M)"}
          </button>
        </div>
        <ul className="hud-keys">
          <li>0–9 调试视图 · Shift+1–4 预设</li>
          <li>Space 播放/暂停 · H 显隐 HUD</li>
          <li>R 重置 · Q 质量档 · M 音乐</li>
          <li>拖拽旋转 · 滚轮/双指缩放</li>
        </ul>
      </section>
    </aside>
  );
}
