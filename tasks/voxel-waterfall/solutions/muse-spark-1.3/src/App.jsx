import { useEffect, useRef, useState } from 'react'
import { buildScene, TIMES } from './voxel.js'

const STRUCT_KEYS = ['grid', 'peakHeight', 'waterfallCount', 'fallWidth', 'cloudAmount', 'cloudHeight', 'treeDensity']

export default function App() {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const [cfg, setCfg] = useState({
    grid: 200,
    peakHeight: 44,
    waterfallCount: 2,
    fallWidth: 3,
    flowSpeed: 1.0,
    cloudAmount: 0.7,
    cloudHeight: 34,
    cloudSpeed: 1.2,
    treeDensity: 0.8,
    timeOfDay: 'morning',
    autoRotate: true,
  })
  const [stats, setStats] = useState({ voxels: 0, fps: 0 })
  const [built, setBuilt] = useState(0)

  // 结构参数变化 → 重建场景；实时参数 → setLive 热更新
  const structKey = STRUCT_KEYS.map((k) => cfg[k]).join('|')
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const handle = buildScene(mount, cfg)
    sceneRef.current = handle
    setStats({ voxels: handle.totalVoxels, fps: 0 })
    setBuilt((b) => b + 1)
    const timer = setInterval(() => {
      setStats((s) => ({ ...s, fps: handle.getFps() }));
    }, 800)
    return () => {
      clearInterval(timer)
      handle.dispose()
      sceneRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [structKey])

  useEffect(() => {
    sceneRef.current?.setLive({
      flowSpeed: cfg.flowSpeed,
      cloudSpeed: cfg.cloudSpeed,
      timeOfDay: cfg.timeOfDay,
      autoRotate: cfg.autoRotate,
    })
  }, [cfg.flowSpeed, cfg.cloudSpeed, cfg.timeOfDay, cfg.autoRotate])

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setCfg((c) => ({
      ...c,
      [k]: e.target.type === 'checkbox' ? v : e.target.type === 'number' ? Number(v) : v,
    }))
  }
  const setNum = (k) => (e) => setCfg((c) => ({ ...c, [k]: Number(e.target.value) }))

  return (
    <div className="stage">
      <div ref={mountRef} className="viewport" />
      <header className="title">
        <h1>体素山水 <span>Voxel Waterfall</span></h1>
        <p>{cfg.grid}×{cfg.grid} 体素地形 · 体素总数 {stats.voxels.toLocaleString()} · {stats.fps} FPS</p>
      </header>
      <aside className="panel">
        <h2>场景调整</h2>
        <label>地形尺寸
          <select value={cfg.grid} onChange={setNum('grid')}>
            <option value={120}>120×120（流畅）</option>
            <option value={160}>160×160（均衡）</option>
            <option value={200}>200×200（完整）</option>
          </select>
        </label>
        <label>主峰高度 <b>{cfg.peakHeight}</b>
          <input type="range" min={24} max={60} step={1} value={cfg.peakHeight} onChange={setNum('peakHeight')} />
        </label>
        <label>瀑布数量 <b>{cfg.waterfallCount}</b>
          <input type="range" min={1} max={3} step={1} value={cfg.waterfallCount} onChange={setNum('waterfallCount')} />
        </label>
        <label>瀑布宽度 <b>{cfg.fallWidth}</b>
          <input type="range" min={1} max={7} step={2} value={cfg.fallWidth} onChange={setNum('fallWidth')} />
        </label>
        <label>水流速度 <b>{cfg.flowSpeed.toFixed(1)}</b>
          <input type="range" min={0} max={3} step={0.1} value={cfg.flowSpeed} onChange={setNum('flowSpeed')} />
        </label>
        <label>云量 <b>{Math.round(cfg.cloudAmount * 100)}%</b>
          <input type="range" min={0} max={1} step={0.05} value={cfg.cloudAmount} onChange={setNum('cloudAmount')} />
        </label>
        <label>云层高度 <b>{cfg.cloudHeight}</b>
          <input type="range" min={22} max={48} step={1} value={cfg.cloudHeight} onChange={setNum('cloudHeight')} />
        </label>
        <label>云漂移速度 <b>{cfg.cloudSpeed.toFixed(1)}</b>
          <input type="range" min={0} max={4} step={0.1} value={cfg.cloudSpeed} onChange={setNum('cloudSpeed')} />
        </label>
        <label>植被密度 <b>{Math.round(cfg.treeDensity * 100)}%</b>
          <input type="range" min={0} max={1} step={0.05} value={cfg.treeDensity} onChange={setNum('treeDensity')} />
        </label>
        <label>时段
          <select value={cfg.timeOfDay} onChange={set('timeOfDay')}>
            {Object.entries(TIMES).map(([k, t]) => (
              <option key={k} value={k}>{t.label}</option>
            ))}
          </select>
        </label>
        <label className="row">
          <input type="checkbox" checked={cfg.autoRotate} onChange={set('autoRotate')} />
          自动环绕
        </label>
        <p className="hint">拖拽旋转 · 滚轮缩放 · 右键平移</p>
      </aside>
    </div>
  )
}
