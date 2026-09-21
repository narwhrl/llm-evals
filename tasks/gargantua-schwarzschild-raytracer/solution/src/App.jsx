import { useEffect, useRef, useState } from 'react'
import { GargantuaEngine } from './engine.js'
import { DEBUG_VIEWS, PARAM_SPECS, PRESETS, QUALITY, QUALITY_ORDER, presetPatch } from './presets.js'
import { createStore } from './store.js'

function formatValue(spec, value) {
  const text = spec.digits === 0 ? String(Math.round(value)) : Number(value).toFixed(spec.digits)
  return spec.unit ? `${text} ${spec.unit}` : text
}

export default function App() {
  const canvasRef = useRef(null)
  const storeRef = useRef(null)
  if (!storeRef.current) storeRef.current = createStore()
  const store = storeRef.current
  const [snap, setSnap] = useState(() => store.getState())

  useEffect(() => store.subscribe((state) => setSnap(state)), [store])

  useEffect(() => {
    const engine = new GargantuaEngine(canvasRef.current, store)
    engine.start()
    return () => engine.dispose()
  }, [store])

  useEffect(() => {
    const onKey = (event) => {
      if (event.repeat) return
      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === 'TEXTAREA' || tag === 'SELECT') return
        if (tag === 'INPUT' && target.getAttribute('type') !== 'range') return
      }
      const state = store.getState()
      if (event.shiftKey && /^Digit[1-4]$/.test(event.code)) {
        event.preventDefault()
        const index = Number(event.code.slice(5)) - 1
        store.set(presetPatch(index), { source: 'ui', persist: true, camera: true })
        return
      }
      if (!event.shiftKey && /^Digit[0-9]$/.test(event.code)) {
        event.preventDefault()
        store.set({ debug: Number(event.code.slice(5)) }, { source: 'ui', persist: true })
        return
      }
      const key = event.key.toLowerCase()
      if (event.code === 'Space') {
        event.preventDefault()
        if (!state.capture) store.set({ playing: !state.playing }, { source: 'ui', persist: true })
      } else if (key === 'h') {
        event.preventDefault()
        store.set({ hud: !state.hud }, { source: 'ui', persist: true })
      } else if (key === 'r') {
        event.preventDefault()
        store.reset()
      } else if (key === 'q') {
        event.preventDefault()
        const index = QUALITY_ORDER.indexOf(state.quality)
        const next = QUALITY_ORDER[(index + 1) % QUALITY_ORDER.length]
        store.set({ quality: next }, { source: 'ui', persist: true })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [store])

  const quality = QUALITY[snap.quality] || QUALITY.high
  const debug = DEBUG_VIEWS[snap.debug] || DEBUG_VIEWS[0]
  let group = ''

  return (
    <div className="app">
      <canvas ref={canvasRef} aria-label="Schwarzschild black hole raytracer" />
      {snap.hud && (
        <aside className="hud" aria-label="控制面板">
          <div className="hud-sticky">
            <header className="brand">
              <div>
                <p className="kicker">Schwarzschild · rs = 2M</p>
                <h1>GARGANTUA</h1>
              </div>
              <button type="button" className="text-button" onClick={() => store.set({ hud: false }, { source: 'ui', persist: true })}>
                收起
              </button>
            </header>
            <div className="status">
              <span>质量 {quality.label}</span>
              <span>步进 {quality.steps}</span>
              <span>交点 {quality.crossings}</span>
              <span>{snap.capture ? '截图冻结' : snap.playing ? '电影镜头' : '手动控制'}</span>
            </div>
            <p className="debug-line">调试 {debug.id} · {debug.name}</p>
            <p className="debug-detail">{debug.detail}</p>
            <p className="keys">0–9 调试 · Shift+1–4 预设 · Space 镜头 · H 界面 · R 重置 · Q 质量</p>
            <div className="preset-row">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={snap.preset === preset.id ? 'preset active' : 'preset'}
                  data-preset={preset.id}
                  onClick={() => store.set(presetPatch(preset.id), { source: 'ui', persist: true, camera: true })}
                >
                  <b>{preset.id + 1}</b>
                  <span>{preset.name}</span>
                  <small>{preset.en}</small>
                </button>
              ))}
            </div>
            <div className="segmented" role="radiogroup" aria-label="质量档">
              {QUALITY_ORDER.map((level) => (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={snap.quality === level}
                  className={snap.quality === level ? 'on' : ''}
                  onClick={() => store.set({ quality: level }, { source: 'ui', persist: true })}
                >
                  {QUALITY[level].label}
                </button>
              ))}
            </div>
            <div className="actions">
              <button
                type="button"
                disabled={snap.capture}
                onClick={() => {
                  if (!snap.capture) store.set({ playing: !snap.playing }, { source: 'ui', persist: true })
                }}
              >
                {snap.capture ? '截图冻结' : snap.playing ? '暂停镜头' : '播放镜头'}
              </button>
              <button type="button" onClick={() => store.reset()}>重置</button>
            </div>
          </div>
          <div className="hud-scroll">
            {PARAM_SPECS.map((spec) => {
              const showGroup = spec.group !== group
              group = spec.group
              return (
                <label key={spec.key} className="field">
                  {showGroup && <span className="group">{spec.group}</span>}
                  <span className="field-label">
                    <span>{spec.label}</span>
                    <span>{formatValue(spec, snap.params[spec.key])}</span>
                  </span>
                  <input
                    type="range"
                    min={spec.min}
                    max={spec.max}
                    step={spec.step}
                    value={snap.params[spec.key]}
                    aria-label={spec.label}
                    onChange={(event) => {
                      const patch = { params: { [spec.key]: Number(event.target.value) } }
                      if (spec.camera) {
                        patch.playing = false
                        patch.preset = null
                      }
                      store.set(patch, { source: 'ui', persist: true, camera: Boolean(spec.camera) })
                    }}
                  />
                </label>
              )
            })}
            <div className="debug-grid" role="group" aria-label="调试视图">
              {DEBUG_VIEWS.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className={snap.debug === view.id ? 'on' : ''}
                  title={view.detail}
                  onClick={() => store.set({ debug: view.id }, { source: 'ui', persist: true })}
                >
                  {view.id}
                </button>
              ))}
            </div>
            <p className="footnote">t = {snap.time.toFixed(2)} s · 光子球 1.5 rs · ISCO 3 rs</p>
          </div>
        </aside>
      )}
      {!snap.hud && !snap.capture && (
        <button type="button" className="handle" onClick={() => store.set({ hud: true }, { source: 'ui', persist: true })}>
          控制
        </button>
      )}
      {snap.contextLost && (
        <div className="banner" role="status">
          <strong>WebGL 上下文已丢失</strong>
          <p>渲染已暂停。上下文恢复后会重建着色器、缓冲和材质，并继续当前场景。</p>
        </div>
      )}
      {snap.shaderError && (
        <div className="banner error" role="alert">
          <strong>着色器编译失败</strong>
          <pre>{snap.shaderError}</pre>
        </div>
      )}
    </div>
  )
}
