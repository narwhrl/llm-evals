import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from 'react'
import type { FrameInfo } from '../spectro/engine'

export interface HudHandle {
  update(info: FrameInfo): void
}

interface Props {
  progress: number
  darkActive: boolean
  onToggle: () => void
}

/** 仪器读数 HUD：θ / 色散 / 顶部进度线。读数直接写 DOM，避免随帧重渲染。 */
const Hud = forwardRef<HudHandle, Props>(function Hud(
  { progress, darkActive, onToggle },
  ref,
) {
  const thetaRef = useRef<HTMLSpanElement>(null)
  const dispRef = useRef<HTMLSpanElement>(null)

  useImperativeHandle(
    ref,
    () => ({
      update(info: FrameInfo) {
        if (thetaRef.current)
          thetaRef.current.textContent = `θ ${info.thetaDeg.toFixed(1)}°`
        if (dispRef.current)
          dispRef.current.textContent = `色散 ${info.dispersion}%`
      },
    }),
    [],
  )

  const barStyle: CSSProperties = {
    transform: `scaleX(${Math.max(0.001, progress)})`,
  }

  return (
    <>
      <div className="progressline" style={barStyle} aria-hidden="true" />
      <div className="hud mono" aria-hidden="false">
        <span className="hud__item" ref={thetaRef}>
          θ —°
        </span>
        <span className="hud__item" ref={dispRef}>
          色散 —%
        </span>
        <button
          type="button"
          className="hud__item hud__hold"
          aria-pressed={darkActive}
          data-nohold
          onClick={onToggle}
        >
          ⇧ 暗线 {darkActive ? 'ON' : 'OFF'}
        </button>
      </div>
    </>
  )
})

export default Hud
