import React, { useEffect, useRef, useState } from 'react'
import { useSession } from '../session'

/**
 * 章节标题：与首屏同一套动效语言——章节大字先在字源池里游走，再坍缩落定；
 * 字源注在旁，标尺随后划开。IntersectionObserver 触发一次。
 *
 * 章节变奏（同一语法下的移调，避免长页同构）：
 *  - variant="mirror"：大字与标尺右起，像一次应答（听）。
 *  - fade：大字随章节滚出视野而变淡——心不在场，就是忘（忘）。
 * reduced-motion 直接呈现完成态。
 */
export default function SectionHead({ meta, variant, fade }) {
  const { reducedMotion } = useSession()
  const ref = useRef(null)
  const charRef = useRef(null)
  const [active, setActive] = useState(reducedMotion)
  const [settled, setSettled] = useState(reducedMotion)
  const [flick, setFlick] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (!active || reducedMotion) return undefined
    let n = 0
    const iv = setInterval(() => {
      n += 1
      if (n >= 7) {
        clearInterval(iv)
        setSettled(true)
      } else {
        setFlick((f) => (f + 1 + ((Math.random() * 2) | 0)) % meta.pool.length)
      }
    }, 85)
    return () => clearInterval(iv)
  }, [active, reducedMotion, meta.pool])

  // 「忘」：章节滚出视野时，大字跟着心一起离场
  useEffect(() => {
    if (!fade || reducedMotion) return undefined
    const io = new IntersectionObserver(
      ([e]) => {
        const el = charRef.current
        if (el) el.style.opacity = String(Math.max(0.16, e.intersectionRatio))
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [fade, reducedMotion])

  return (
    <header
      className={`sec-head${active ? ' lit' : ''}${variant === 'mirror' ? ' mirror' : ''}`}
      ref={ref}
    >
      <p className="sec-label mono">
        {meta.no} · {meta.en}
      </p>
      <h2 className="sec-title" aria-label={meta.char}>
        <span className={`sec-char${active ? ' on' : ''}`} aria-hidden="true" ref={charRef}>
          {settled ? meta.char : meta.pool[flick]}
        </span>
        <span className="sec-note">{meta.note}</span>
      </h2>
      <span className="sec-rule" aria-hidden="true" />
    </header>
  )
}
