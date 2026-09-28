import { useEffect, useRef, useState } from 'react'
import { createScene } from './scene/createScene.js'

const PRESET_LABELS = [
  ['dawn', '黎明'],
  ['day', '正午'],
  ['dusk', '黄昏'],
  ['night', '夜晚'],
]

function Slider({ label, value, min, max, step, format, onChange }) {
  return (
    <label className="row">
      <span className="row-label">
        {label}
        <em>{format ? format(value) : value}</em>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

export default function App() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(true)
  const [stats, setStats] = useState({ fps: 0, voxels: 0, trees: 0, water: 0 })
  const [preset, setPreset] = useState('dusk')
  const [cloudHeight, setCloudHeight] = useState(32)
  const [cloudCoverage, setCloudCoverage] = useState(0.6)
  const [waterSpeed, setWaterSpeed] = useState(1)
  const [waterfallCount, setWaterfallCount] = useState(3)
  const [treeDensity, setTreeDensity] = useState(0.7)
  const [autoRotate, setAutoRotate] = useState(true)
  const [shadows, setShadows] = useState(true)

  useEffect(() => {
    let api
    try {
      api = createScene(containerRef.current, undefined, {
        onStats: setStats,
        onAutoRotateChange: setAutoRotate,
      })
    } catch (e) {
      setError(String(e?.message || e))
      return
    }
    sceneRef.current = api
    return () => {
      api.dispose()
      sceneRef.current = null
    }
  }, [])

  const apply = (fn) => {
    if (sceneRef.current) fn(sceneRef.current)
  }

  return (
    <div className="viewport">
      <div ref={containerRef} className="canvas-host" />
      {error && <div className="error-box">WebGL 初始化失败：{error}</div>}

      {open ? (
        <aside className="panel">
          <div className="panel-head">
            <strong>体素瀑布 · 场景设置</strong>
            <button className="icon-btn" title="收起" onClick={() => setOpen(false)}>
              —
            </button>
          </div>

          <section>
            <h3>光照时段</h3>
            <div className="chips">
              {PRESET_LABELS.map(([key, label]) => (
                <button
                  key={key}
                  className={preset === key ? 'chip active' : 'chip'}
                  onClick={() => {
                    setPreset(key)
                    apply((api) => api.setPreset(key))
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3>云海</h3>
            <Slider
              label="云层高度"
              value={cloudHeight}
              min={20}
              max={46}
              step={1}
              onChange={(v) => {
                setCloudHeight(v)
                apply((api) => api.setCloudHeight(v))
              }}
            />
            <Slider
              label="云量"
              value={cloudCoverage}
              min={0}
              max={1}
              step={0.05}
              format={(v) => `${Math.round(v * 100)}%`}
              onChange={(v) => {
                setCloudCoverage(v)
                apply((api) => api.setCloudCoverage(v))
              }}
            />
          </section>

          <section>
            <h3>瀑布与河流</h3>
            <div className="row">
              <span className="row-label">
                瀑布数量
                <em>{waterfallCount} 道</em>
              </span>
              <div className="chips">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={waterfallCount === n ? 'chip active' : 'chip'}
                    onClick={() => {
                      setWaterfallCount(n)
                      apply((api) => api.setWaterfallCount(n))
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <Slider
              label="水流速度"
              value={waterSpeed}
              min={0.2}
              max={3}
              step={0.1}
              format={(v) => `${v.toFixed(1)}x`}
              onChange={(v) => {
                setWaterSpeed(v)
                apply((api) => api.setWaterSpeed(v))
              }}
            />
          </section>

          <section>
            <h3>植被</h3>
            <Slider
              label="树木密度"
              value={treeDensity}
              min={0}
              max={1}
              step={0.05}
              format={(v) => `${Math.round(v * 100)}%`}
              onChange={(v) => {
                setTreeDensity(v)
                apply((api) => api.setTreeDensity(v))
              }}
            />
          </section>

          <section>
            <h3>视角与画质</h3>
            <label className="check">
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => {
                  setAutoRotate(e.target.checked)
                  apply((api) => api.setAutoRotate(e.target.checked))
                }}
              />
              自动环绕
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={shadows}
                onChange={(e) => {
                  setShadows(e.target.checked)
                  apply((api) => api.setShadows(e.target.checked))
                }}
              />
              阴影
            </label>
            <div className="btn-row">
              <button
                onClick={() => {
                  apply((api) => api.regenerate())
                }}
              >
                重新生成地形
              </button>
              <button
                onClick={() => {
                  apply((api) => api.resetView())
                }}
              >
                重置视角
              </button>
            </div>
          </section>

          <footer>
            {stats.fps > 0 && <span>{stats.fps} FPS · </span>}
            体素 {stats.voxels.toLocaleString()} · 树木 {stats.trees} · 水域 {stats.water}
          </footer>
        </aside>
      ) : (
        <button className="reopen" title="打开设置" onClick={() => setOpen(true)}>
          ⚙
        </button>
      )}

      <div className="hint">拖动旋转 · 滚轮缩放 · 右键平移</div>
    </div>
  )
}
