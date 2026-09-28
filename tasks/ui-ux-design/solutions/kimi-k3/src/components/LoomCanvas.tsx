import { useEffect, useRef } from 'react'
import type { LoomEngine } from '../engine/loom'

/**
 * 织机画布：fixed 全视口，aria-hidden（叙事文字全部是真实 HTML）。
 * touch-action: pan-y —— 纵向滚动照常，横向拂过即是拨线。
 */
export function LoomCanvas({ engine }: { engine: LoomEngine }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let last = performance.now()
    let running = true

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const mobile = w <= 700
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      engine.resize(w, h, dpr, mobile)
    }
    resize()
    window.addEventListener('resize', resize)

    const loop = (now: number) => {
      if (!running) return
      const dt = (now - last) / 1000
      last = now
      engine.tick(dt)
      engine.render(ctx)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const pos = (e: PointerEvent) => ({ x: e.clientX, y: e.clientY })
    let lastX = 0
    const onDown = (e: PointerEvent) => {
      const p = pos(e)
      lastX = p.x
      engine.pointerDown(p.x, p.y)
    }
    const onMove = (e: PointerEvent) => {
      const p = pos(e)
      const vx = p.x - lastX
      lastX = p.x
      engine.pointerMove(p.x, p.y)
      engine.pointerDrag(p.x, p.y, vx)
    }
    const onUp = () => engine.pointerUp()
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [engine])

  return <canvas ref={canvasRef} className="stage" aria-hidden="true" />
}
