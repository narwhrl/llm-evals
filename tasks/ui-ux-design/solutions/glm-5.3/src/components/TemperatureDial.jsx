import React, { useEffect, useRef, useState } from 'react'
import { useSession } from '../session'

/**
 * θ 温度旋钮：全站唯一的「设置」。
 * 影响：采样分布的陡峭程度（分布面板里的条会实时变平/变陡）、
 * 颤动幅度、字段里字的躁动速度、下划线厚度。概念即参数，参数即可视。
 */
export default function TemperatureDial() {
  const { state, setTheta } = useSession()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const label =
    state.theta < 0.45 ? '冷静' : state.theta > 1.05 ? '激进' : '平常'

  return (
    <div className="dial-wrap" ref={wrapRef}>
      <button
        type="button"
        className="dial mono"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`温度 θ ${state.theta.toFixed(2)}，${label}。展开调节`}
        onClick={() => setOpen((o) => !o)}
      >
        θ {state.theta.toFixed(2)}
      </button>
      {open && (
        <div className="dial-pop" role="dialog" aria-label="温度调节">
          <input
            type="range"
            min="0.1"
            max="1.5"
            step="0.05"
            value={state.theta}
            onChange={(e) => setTheta(parseFloat(e.target.value))}
            aria-label="温度 θ：越低越保守，越高越敢乱猜"
            autoFocus
          />
          <div className="dial-labels mono">
            <span>0.1 冷静</span>
            <span>{label}</span>
            <span>1.5 激进</span>
          </div>
          <p className="dial-note">θ 改变我敢不敢乱猜。页面里所有分布都会跟着变。</p>
        </div>
      )}
    </div>
  )
}
