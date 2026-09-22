import { useEffect, useRef, useState } from "react";
import { InkEngine, type EngineSnapshot } from "./ink/engine";
import type { HatchTarget } from "./ink/field";

const initial: EngineSnapshot = {
  temperature: 0.4,
  live: 0,
  abandoned: 0,
  archive: 0,
  spawned: 0,
  cuts: 0,
  tier: "high",
  workMs: 0,
  fps: 60,
  hatchPlaced: 0,
  hatchTotal: 0,
  hatchDone: false,
  mode: "live",
};

function circleTargets(width: number, height: number): HatchTarget[] {
  const targets: HatchTarget[] = [];
  const cx = width / 2;
  const cy = height * 0.52;
  const radius = Math.min(width, height) * 0.22;
  const rings = 5;
  for (let ring = 0; ring < rings; ring += 1) {
    const r = radius + ring * 7;
    const points = Math.round(40 + ring * 22);
    for (let i = 0; i < points; i += 1) {
      const angle = (i / points) * Math.PI * 2 + ring * 0.2;
      targets.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r * 0.72,
        angle: angle + Math.PI / 2,
        size: 7,
      });
    }
  }
  return targets;
}

/** 开发期的墨迹样张台：只看笔触、纸纹与场的节奏，不进最终交付。 */
export default function Lab() {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<InkEngine | null>(null);
  const [state, setState] = useState<EngineSnapshot>(initial);
  const [params, setParams] = useState({ temperature: 0.4, attract: 6, maxStrokes: 240, ambient: 1 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const engine = new InkEngine(host, {
      temperature: params.temperature,
      ambient: params.ambient,
      attract: params.attract,
      maxStrokes: params.maxStrokes,
    });
    engineRef.current = engine;
    (window as unknown as { __lab?: unknown }).__lab = engine;
    engine.start();
    const timer = window.setInterval(() => setState(engine.snapshot()), 240);
    return () => {
      window.clearInterval(timer);
      engine.destroy();
      engineRef.current = null;
    };
    // 只在挂载时建一次引擎
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.params.temperature = params.temperature;
    engine.params.attract = params.attract;
    engine.params.maxStrokes = params.maxStrokes;
    engine.params.ambient = params.ambient;
  }, [params]);

  const bake = (seconds: number) => {
    engineRef.current?.bake(seconds);
  };

  return (
    <>
      <div ref={hostRef} className="stage" />
      <div
        style={{
          position: "fixed",
          zIndex: 9,
          top: 16,
          left: "var(--gutter)",
          display: "grid",
          gap: 10,
          width: 300,
          padding: 16,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "var(--ink)",
          background: "rgba(242, 237, 227, 0.92)",
          border: "1px solid var(--rule-strong)",
        }}
      >
        <strong style={{ letterSpacing: "0.18em" }}>INK LAB</strong>
        <label>
          温度 {params.temperature.toFixed(2)}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={params.temperature}
            onChange={(event) => setParams({ ...params, temperature: Number(event.target.value) })}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          吸附 {params.attract}
          <input
            type="range"
            min={0}
            max={40}
            step={1}
            value={params.attract}
            onChange={(event) => setParams({ ...params, attract: Number(event.target.value) })}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          上限 {params.maxStrokes}
          <input
            type="range"
            min={20}
            max={400}
            step={10}
            value={params.maxStrokes}
            onChange={(event) => setParams({ ...params, maxStrokes: Number(event.target.value) })}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          环境 {params.ambient.toFixed(2)}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={params.ambient}
            onChange={(event) => setParams({ ...params, ambient: Number(event.target.value) })}
            style={{ width: "100%" }}
          />
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <button type="button" onClick={() => bake(6)}>
            跑 6 秒
          </button>
          <button type="button" onClick={() => bake(20)}>
            跑 20 秒
          </button>
          <button
            type="button"
            onClick={() => {
              const engine = engineRef.current;
              if (engine) engine.field.cutSweep(engine.field.height * 0.45, false);
            }}
          >
            斩断
          </button>
          <button
            type="button"
            onClick={() => {
              const engine = engineRef.current;
              if (!engine) return;
              engine.field.startHatch(circleTargets(engine.field.width, engine.field.height));
            }}
          >
            拓印
          </button>
          <button
            type="button"
            onClick={() => {
              const engine = engineRef.current;
              if (!engine) return;
              engine.field.clear();
              engine.renderer.clearAll();
            }}
          >
            清空
          </button>
        </div>
        <div style={{ lineHeight: 1.7, color: "var(--ink-soft)" }}>
          档位 {state.tier} · 帧工时 {state.workMs.toFixed(2)}ms · {state.fps.toFixed(0)}fps
          <br />
          活跃 {state.live} · 已放弃 {state.abandoned} · 纸面 {state.archive}
          <br />
          拓印 {state.hatchPlaced}/{state.hatchTotal}
          {state.hatchDone ? " 完成" : ""}
        </div>
      </div>
    </>
  );
}
