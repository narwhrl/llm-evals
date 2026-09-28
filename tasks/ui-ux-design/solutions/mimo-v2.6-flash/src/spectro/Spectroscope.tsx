import { useEffect, useRef } from 'react'
import { SpectroscopeEngine, type EngineInput, type FrameInfo } from './engine'

interface Props {
  progress: number
  dark: number
  reduced: boolean
  mobile: boolean
  onFrame?: (info: FrameInfo) => void
}

export default function Spectroscope({
  progress,
  dark,
  reduced,
  mobile,
  onFrame,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<SpectroscopeEngine | null>(null)
  const onFrameRef = useRef(onFrame)
  onFrameRef.current = onFrame

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const engine = new SpectroscopeEngine(canvas)
    engineRef.current = engine
    engine.onFrame = (info) => onFrameRef.current?.(info)
    engine.resize()
    engine.start()

    const norm = (x: number, y: number): Partial<EngineInput> => ({
      pointerX: Math.min(1, Math.max(0, x / window.innerWidth)),
      pointerY: Math.min(1, Math.max(0, y / window.innerHeight)),
    })
    const onPointer = (e: PointerEvent) =>
      engine.setInput(norm(e.clientX, e.clientY))
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) engine.setInput(norm(t.clientX, t.clientY))
    }
    const onResize = () => engine.resize()
    const onVis = () => {
      if (document.hidden) engine.stop()
      else engine.start()
    }

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      engine.stop()
      engineRef.current = null
    }
  }, [])

  useEffect(() => {
    engineRef.current?.setInput({ progress, dark, reduced, mobile })
  }, [progress, dark, reduced, mobile])

  return <canvas ref={canvasRef} className="spectroscope" aria-hidden="true" />
}
