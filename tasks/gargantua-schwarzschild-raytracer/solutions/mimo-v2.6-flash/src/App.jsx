import { useEffect, useSyncExternalStore } from 'react'

import { getSnapshot, subscribe } from './state/store.js'
import { RendererManager } from './render/RendererManager.js'
import { installShortcuts } from './ui/shortcuts.js'
import Hud from './ui/Hud.jsx'

export default function App({ canvas }) {
  // Only store changes re-render React; the animation loop lives in the plain
  // RendererManager module and never touches React state.
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  useEffect(() => {
    let manager = null
    try {
      manager = new RendererManager(canvas)
      manager.start()
    } catch (err) {
      console.error('[gargantua] could not start the WebGL renderer', err)
    }
    return () => {
      if (manager) manager.dispose()
    }
  }, [canvas])

  useEffect(() => installShortcuts(), [])

  return (
    <>
      <Hud snapshot={snapshot} />
      {snapshot.contextLost ? (
        <div className="context-overlay" role="alert">
          <div className="context-card">
            <h2>WebGL context lost</h2>
            <p>
              Rendering is paused. The GPU context was dropped by the browser; your camera, parameters and quality
              tier are preserved.
            </p>
            <p className="context-note">waiting for restore…</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
