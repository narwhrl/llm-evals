const SLIDERS = [
  { key: 'seed', label: '随机种子', min: 1, max: 99999999, step: 1, rebuild: true },
  { key: 'size', label: '地形尺寸', min: 128, max: 192, step: 32, rebuild: true },
  { key: 'mountainHeight', label: '山体高度', min: 28, max: 64, step: 1, rebuild: true },
  { key: 'roughness', label: '起伏粗糙度', min: 0.15, max: 0.9, step: 0.01, rebuild: true },
  { key: 'waterfallWidth', label: '瀑布宽度', min: 1, max: 4, step: 1, rebuild: true },
  { key: 'cloudHeight', label: '云层高度', min: 0.35, max: 0.8, step: 0.01, rebuild: true },
  { key: 'cloudDensity', label: '云层密度', min: 0.1, max: 0.85, step: 0.01, rebuild: true },
  { key: 'vegetation', label: '植被密度', min: 0, max: 1, step: 0.01, rebuild: true },
  { key: 'flowSpeed', label: '水流速度', min: 0.2, max: 3, step: 0.05, rebuild: false },
  { key: 'cloudOpacity', label: '云层透明度', min: 0.25, max: 1, step: 0.01, rebuild: false },
  { key: 'timeOfDay', label: '晨昏时段', min: 0, max: 1, step: 0.01, rebuild: false },
  { key: 'fogDensity', label: '雾气浓度', min: 0.002, max: 0.03, step: 0.001, rebuild: false },
  { key: 'rotateSpeed', label: '旋转速度', min: 0, max: 0.4, step: 0.01, rebuild: false },
];

export function ControlPanel({ params, onChange, onRebuild, onReset, stats, open, setOpen }) {
  return (
    <aside className={`panel ${open ? 'open' : 'closed'}`}>
      <header className="panel-head">
        <div>
          <h1>体素山川</h1>
          <p>山 · 瀑布 · 穿云</p>
        </div>
        <button type="button" className="icon-btn" onClick={() => setOpen(!open)}>
          {open ? '收起' : '选项'}
        </button>
      </header>

      {open && (
        <>
          <div className="stats">
            <span>FPS {stats.fps ? stats.fps.toFixed(0) : '--'}</span>
            <span>地形 {stats.columns || 0}</span>
            <span>云 {stats.clouds || 0}</span>
            <span>树 {stats.trees || 0}</span>
          </div>

          <label className="toggle">
            <input
              type="checkbox"
              checked={params.autoRotate}
              onChange={(e) => onChange({ autoRotate: e.target.checked })}
            />
            自动环绕全貌
          </label>

          {SLIDERS.map((item) => (
            <label key={item.key} className="slider">
              <span>
                {item.label}
                <b>{formatValue(params[item.key])}</b>
              </span>
              <input
                type="range"
                min={item.min}
                max={item.max}
                step={item.step}
                value={params[item.key]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  onChange({ [item.key]: value }, item.rebuild);
                }}
              />
            </label>
          ))}

          <div className="actions">
            <button type="button" onClick={onRebuild}>
              重新生成
            </button>
            <button type="button" className="ghost" onClick={onReset}>
              恢复默认
            </button>
          </div>
          <p className="hint">拖拽旋转、滚轮缩放。打开页面后相机会自动绕山一周。</p>
        </>
      )}
    </aside>
  );
}

function formatValue(v) {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(2);
}
