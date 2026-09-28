import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createStore } from './state/store.js'
import { Engine } from './render/Engine.js'
import { installPublicApi } from './publicApi.js'
import { ControlPanel } from './ui/ControlPanel.jsx'
import { Hud, PresetBar, debugViewFor } from './ui/Hud.jsx'
import { createAmbientAudio } from './ui/audio.js'
import { useShortcuts } from './ui/shortcuts.js'

const BOOT_TIMEOUT_MS = 20000

export default function App() {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)

  const storeRef = useRef(null)
  if (storeRef.current === null) storeRef.current = createStore()
  const store = storeRef.current

  const audioRef = useRef(null)
  if (audioRef.current === null) audioRef.current = createAmbientAudio()
  const audio = audioRef.current

  const [state, setState] = useState(() => store.getState())
  const [renderInfo, setRenderInfo] = useState({
    maxSteps: 0,
    maxCrossings: 0,
    bloomMips: 0,
    renderWidth: 0,
    renderHeight: 0,
    dpr: 1,
    fps: 0,
    audioUnavailable: false,
  })
  const [overlay, setOverlay] = useState({ kind: 'booting', detail: '' })
  const [controlsCollapsed, setControlsCollapsed] = useState(false)

  // The React tree is a pure view of the store.
  useEffect(() => store.subscribe(setState), [store])

  const engineCallbacks = useMemo(
    () => ({
      onStateChange: (patch) => {
        if (patch.cinematic !== undefined) store.setCinematic(patch.cinematic)
        if (patch.camera) store.syncCameraFraming(patch.camera)
      },
      onReady: () => {
        document.documentElement.dataset.gargantuaReady = 'true'
        document.documentElement.dataset.gargantuaContext = 'ok'
        store.markReady()
        setOverlay({ kind: 'running', detail: '' })
        const boot = document.getElementById('boot')
        if (boot) boot.hidden = true
      },
      onContextChange: (status) => {
        document.documentElement.dataset.gargantuaContext = status
        setOverlay(
          status === 'lost'
            ? { kind: 'context-lost', detail: 'Releasing GPU resources and rebuilding…' }
            : { kind: 'running', detail: '' },
        )
      },
    }),
    [store],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let engine
    try {
      engine = new Engine(canvas, engineCallbacks)
    } catch (error) {
      setOverlay({ kind: 'no-webgl', detail: String(error && error.message ? error.message : error) })
      return undefined
    }

    engineRef.current = engine

    installPublicApi(store, engine)

    const unsubscribe = store.subscribe((next) => engine.setState(next))
    engine.setState(store.getState())
    engine.resize()
    engine.start()

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => engine.resize()) : null
    if (observer) observer.observe(canvas)
    const onWindowResize = () => engine.resize()
    window.addEventListener('resize', onWindowResize)
    window.addEventListener('orientationchange', onWindowResize)

    // A stall is reported rather than hidden behind a permanent loading mask.
    const bootTimer = window.setTimeout(() => {
      if (document.documentElement.dataset.gargantuaReady !== 'true') {
        setOverlay({
          kind: 'stalled',
          detail: 'The first frame did not complete. This build needs WebGL 2.',
        })
      }
    }, BOOT_TIMEOUT_MS)

    const publishInfo = () => {
      const info = engine.describe()
      setRenderInfo({
        maxSteps: info.budget.maxSteps,
        maxCrossings: info.budget.maxCrossings,
        bloomMips: info.budget.bloomMips,
        renderWidth: info.render.renderWidth,
        renderHeight: info.render.renderHeight,
        dpr: info.render.dpr,
        fps: info.render.fps,
        audioUnavailable: audio.unavailable,
      })
    }
    publishInfo()
    const infoTimer = window.setInterval(publishInfo, 500)

    return () => {
      window.clearTimeout(bootTimer)
      window.clearInterval(infoTimer)
      window.removeEventListener('resize', onWindowResize)
      window.removeEventListener('orientationchange', onWindowResize)
      if (observer) observer.disconnect()
      unsubscribe()
      audio.stop()
      engine.dispose()
      engineRef.current = null
    }
  }, [store, engineCallbacks, audio])

  useShortcuts({ store, engine: engineRef, audio })

  const handleParameters = useCallback((patch) => store.setParameters(patch), [store])
  const pauseCinematic = useCallback(() => {
    if (store.getState().cinematic) store.setCinematic(false)
  }, [store])
  const syncCameraNow = useCallback(() => engineRef.current?.syncCameraNow(), [])
  const stepDebug = useCallback(
    (delta) => store.setDebug((store.getState().debug + delta + 10) % 10),
    [store],
  )

  const debugView = debugViewFor(state.debug)
  const hudVisible = state.hudOpen

  return (
    <div className="gargantua-root">
      <canvas ref={canvasRef} className="gargantua-canvas" data-testid="gargantua-canvas" />

      {hudVisible && (
        <div className="hud-layer" data-testid="hud">
          <Hud
            state={state}
            renderInfo={renderInfo}
            debugView={debugView}
            onQuality={(level) => store.setQuality(level)}
            onDebugStep={stepDebug}
            onToggleCinematic={() => store.toggleCinematic()}
            onToggleAudio={() => store.toggleAudio()}
            onReset={() => store.reset()}
            onToggleHud={() => store.toggleHud()}
          />
          <PresetBar active={state.preset} onPreset={(index) => store.setPreset(index)} />
          <ControlPanel
            params={state.params}
            onParameters={handleParameters}
            onPauseCinematic={pauseCinematic}
            onInteractionStart={syncCameraNow}
            collapsed={controlsCollapsed}
            onToggleCollapsed={() => setControlsCollapsed((value) => !value)}
          />
        </div>
      )}

      {!hudVisible && (
        <button
          type="button"
          className="hud-panel hud-button hud-toggle"
          onClick={() => store.toggleHud()}
        >
          Show HUD · H
        </button>
      )}

      {overlay.kind === 'booting' && (
        <div className="status-overlay">
          <div className="status-card">
            <div className="status-spinner" />
            <h2>Compiling</h2>
            <p>Building the null-geodesic integrator…</p>
          </div>
        </div>
      )}

      {overlay.kind === 'context-lost' && (
        <div className="status-overlay" data-testid="context-lost">
          <div className="status-card">
            <h2>WebGL context lost</h2>
            <p>
              Rendering is paused. GPU resources are being rebuilt and the scene will resume
              automatically with the same parameters — no reload needed.
            </p>
          </div>
        </div>
      )}

      {(overlay.kind === 'no-webgl' || overlay.kind === 'stalled') && (
        <div className="status-overlay" data-testid="no-webgl">
          <div className="status-card">
            <h2>{overlay.kind === 'no-webgl' ? 'WebGL 2 unavailable' : 'Renderer stalled'}</h2>
            <p>
              This raytracer integrates null geodesics in a fragment shader and needs WebGL 2.
              {overlay.detail ? ` (${overlay.detail})` : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
