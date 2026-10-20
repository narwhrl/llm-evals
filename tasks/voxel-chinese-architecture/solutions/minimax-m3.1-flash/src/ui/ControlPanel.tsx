import { useState } from "react";
import { SKY_PRESETS } from "../scene/sky";
import type { SceneParams, WorldStats } from "../scene/World";

const VIEW_PRESETS = ["全景", "正面", "殿前", "俯瞰"];

export function ControlPanel({
  params,
  stats,
  viewIndex,
  onChange,
  onView,
}: {
  params: SceneParams;
  stats: WorldStats;
  viewIndex: number;
  onChange: (patch: Partial<SceneParams>) => void;
  onView: (index: number) => void;
}) {
  // On a narrow screen the panel would cover the scene, so it starts collapsed.
  const [open, setOpen] = useState(() => window.innerWidth > 720);

  return (
    <aside className={`panel ${open ? "" : "is-collapsed"}`}>
      <button className="panel-toggle" onClick={() => setOpen((v) => !v)}>
        {open ? "收起参数" : "参数"}
      </button>
      {open && (
        <div className="panel-body">
          <section>
            <h3>屋瓦</h3>
            <div className="chips">
              <button
                className={params.glazed ? "chip active" : "chip"}
                onClick={() => onChange({ glazed: true })}
              >
                琉璃瓦
              </button>
              <button
                className={!params.glazed ? "chip active" : "chip"}
                onClick={() => onChange({ glazed: false })}
              >
                青瓦
              </button>
            </div>
          </section>

          <section>
            <h3>山门</h3>
            <label className="ctrl">
              <span>
                门楼体量<b>{Math.round(params.gateScale * 100)}%</b>
              </span>
              <input
                type="range"
                min={70}
                max={140}
                step={5}
                value={Math.round(params.gateScale * 100)}
                onChange={(event) => onChange({ gateScale: Number(event.target.value) / 100 })}
              />
            </label>
          </section>

          <section>
            <h3>天光</h3>
            <div className="chips">
              {SKY_PRESETS.map((preset, index) => (
                <button
                  key={preset.id}
                  className={params.skyIndex === index ? "chip active" : "chip"}
                  onClick={() => onChange({ skyIndex: index })}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3>视角</h3>
            <div className="chips">
              {VIEW_PRESETS.map((label, index) => (
                <button
                  key={label}
                  className={viewIndex === index ? "chip active" : "chip"}
                  onClick={() => onView(index)}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="toggle">
              <span>自动环绕</span>
              <input
                type="checkbox"
                checked={params.autoRotate}
                onChange={(event) => onChange({ autoRotate: event.target.checked })}
              />
              <i aria-hidden="true" />
            </label>
          </section>

          <footer className="panel-foot">
            <span>构件 {stats.boxes.toLocaleString()}</span>
            <span>三角面 {stats.triangles.toLocaleString()}</span>
            <span>{Math.round(stats.fps)} FPS</span>
          </footer>
        </div>
      )}
    </aside>
  );
}
