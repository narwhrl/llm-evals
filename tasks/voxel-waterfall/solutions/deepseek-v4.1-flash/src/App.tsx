import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_OPTIONS } from './scene/options'
import type { SceneOptions } from './scene/options'
import { createViewer } from './scene/viewer'
import type { ViewerHandle, ViewerStats } from './scene/viewer'
import ControlPanel from './ui/ControlPanel'

declare global {
  interface Window {
    /** 供自动化校验读取的运行态统计。 */
    __voxelStats?: ViewerStats & { timeOfDay: string }
  }
}

const EMPTY_STATS: ViewerStats = {
  fps: 0,
  voxels: 0,
  quads: 0,
  triangles: 0,
  drawCalls: 0,
  buildMs: 0,
  size: 0,
  seaLevel: 0,
  peakHeight: 0,
  trees: 0,
  waterFalls: 0,
  streams: 0,
  waterVoxels: 0,
  cloudVoxels: 0,
  plantVoxels: 0,
}

function randomSeed(): number {
  return Math.floor(Math.random() * 1_000_000)
}

export default function App() {
  const viewerRef = useRef<ViewerHandle | null>(null)
  const optionsRef = useRef<SceneOptions>(DEFAULT_OPTIONS)

  const [options, setOptions] = useState<SceneOptions>(DEFAULT_OPTIONS)
  const [seedText, setSeedText] = useState(String(DEFAULT_OPTIONS.seed))
  const [stats, setStats] = useState<ViewerStats>(EMPTY_STATS)
  const [building, setBuilding] = useState(true)
  const [panelOpen, setPanelOpen] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  // 用回调 ref 创建渲染器：这是“事件驱动”的挂载点，React 19 会用返回的函数做卸载清理。
  const attachScene = useCallback((node: HTMLDivElement | null) => {
    if (!node) return undefined

    let viewer: ViewerHandle
    try {
      viewer = createViewer(node, optionsRef.current, {
        onStats: (next) => {
          setStats(next)
          window.__voxelStats = { ...next, timeOfDay: optionsRef.current.timeOfDay }
        },
        onBusy: setBuilding,
      })
    } catch (caught) {
      setBuilding(false)
      setError(caught instanceof Error ? caught.message : '浏览器无法创建 WebGL 上下文')
      return undefined
    }

    viewerRef.current = viewer
    return () => {
      viewerRef.current = null
      viewer.dispose()
    }
  }, [])

  useEffect(() => {
    viewerRef.current?.setOptions(options)
  }, [options])

  const handleChange = useCallback((patch: Partial<SceneOptions>) => {
    setOptions((current) => ({ ...current, ...patch }))
  }, [])

  const applySeed = useCallback((value: number) => {
    const seed = Math.abs(Math.round(value)) % 1_000_000
    setSeedText(String(seed))
    setOptions((current) => ({ ...current, seed }))
  }, [])

  const handleSeedTextChange = useCallback((value: string) => {
    setSeedText(value)
  }, [])

  const handleApplySeed = useCallback(() => {
    const parsed = Number.parseInt(seedText, 10)
    applySeed(Number.isFinite(parsed) ? parsed : DEFAULT_OPTIONS.seed)
  }, [applySeed, seedText])

  const handleRandomSeed = useCallback(() => {
    applySeed(randomSeed())
  }, [applySeed])

  const handleReset = useCallback(() => {
    setSeedText(String(DEFAULT_OPTIONS.seed))
    setOptions({ ...DEFAULT_OPTIONS })
  }, [])

  const handleResetView = useCallback(() => {
    viewerRef.current?.resetView()
  }, [])

  const handleTogglePanel = useCallback(() => {
    setPanelOpen((open) => !open)
  }, [])

  return (
    <div className="app">
      <div className="scene-host" ref={attachScene} />

      <ControlPanel
        options={options}
        stats={stats}
        building={building}
        open={panelOpen}
        seedText={seedText}
        onToggle={handleTogglePanel}
        onChange={handleChange}
        onSeedTextChange={handleSeedTextChange}
        onApplySeed={handleApplySeed}
        onRandomSeed={handleRandomSeed}
        onReset={handleReset}
        onResetView={handleResetView}
      />

      <p className="hint">拖动旋转 · 滚轮缩放 · 双指推拉</p>

      {error ? (
        <div className="overlay overlay-error" role="alert">
          <strong>无法启动体素场景</strong>
          <span>{error}</span>
        </div>
      ) : building ? (
        <div className="overlay">
          <strong>正在生成体素世界…</strong>
          <span>山峰、瀑布与云层正在堆叠</span>
        </div>
      ) : null}
    </div>
  )
}
