import React, { useEffect, useState } from 'react'
import { GLYPH_POOL } from '../lexicon'

/**
 * 固定文字的「采样中」状态：每个字先在字池里游走，再依次落定。
 * 全站同一套动效语言：颤动 -> 坍缩。reduced-motion 时直接呈现。
 */
export default function Scramble({ text, active, reduced, delay = 0, className }) {
  const [out, setOut] = useState(() =>
    active || reduced ? text : '\u3000'.repeat(text.length)
  )

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setOut(text)
      return
    }
    let raf = 0
    let lastUpd = 0
    const t0 = performance.now() + delay
    const stepMs = 60
    const settleMs = 300
    const tick = (now) => {
      const el = now - t0
      if (el < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      let s = ''
      let done = true
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (el >= i * stepMs + settleMs) {
          s += ch
        } else {
          done = false
          s += ch === ' ' ? ' ' : GLYPH_POOL[(Math.random() * GLYPH_POOL.length) | 0]
        }
      }
      if (now - lastUpd > 46) {
        setOut(s)
        lastUpd = now
      }
      if (!done) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, text, reduced, delay])

  return (
    <span className={className} aria-hidden="true">
      {out}
    </span>
  )
}
