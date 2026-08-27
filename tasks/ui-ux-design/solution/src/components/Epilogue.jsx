import React, { useEffect, useRef, useState } from 'react'
import { useSession } from '../session'
import { SLOT_A, SLOT_B, SECTIONS, sentenceZh } from '../lexicon'
import SectionHead from './SectionHead'

/**
 * 「逢」：你的所有选择，凝成一句只属于这次相遇的话。
 * 长按这句话（键盘：聚焦后按住 Enter）——看见每一步「未选之路」。
 * 这是页面的隐藏层之一，没有任何按钮提示它。
 */
export default function Epilogue() {
  const { state, accent, accentHue, reducedMotion } = useSession()
  const [ghost, setGhost] = useState(false)
  const [toast, setToast] = useState(null)
  const holdTimer = useRef(null)
  const toastTimer = useRef(null)

  const a = SLOT_A.candidates[state.a]
  const b = SLOT_B.candidates[state.b]
  const zh = sentenceZh(a.zh, b.zh)

  useEffect(() => () => {
    clearTimeout(holdTimer.current)
    clearTimeout(toastTimer.current)
  }, [])

  const start = () => {
    clearTimeout(holdTimer.current)
    holdTimer.current = setTimeout(() => setGhost(true), reducedMotion ? 0 : 350)
  }
  const end = () => {
    clearTimeout(holdTimer.current)
    setGhost(false)
  }

  const copy = async () => {
    const text = `「${zh}」 — the next word`
    try {
      await navigator.clipboard.writeText(text)
      setToast('已复制 · copied')
    } catch {
      setToast('复制失败——但你可以直接选中它')
    }
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 1800)
  }

  const runnerA = SLOT_A.candidates.filter((_, i) => i !== state.a)
  const runnerB = SLOT_B.candidates.filter((_, i) => i !== state.b)

  return (
    <section className="chapter epilogue" aria-label="逢">
      <SectionHead meta={SECTIONS.meet} />
      <div className="chapter-body">
        <p className="lead">现在，这句话是你的了。</p>
        <p>
          你在这里做过的每一个选择，都写进了下面这句话和这一抹颜色。
          它不在我这儿的任何服务器上，不进任何统计——只在此刻的这个页面里。
        </p>
        <div
          className={`keepsake${ghost ? ' held' : ''}`}
          tabIndex={0}
          role="button"
          aria-label={`纪念句：${zh}。按住可查看未选中的候选词。`}
          aria-pressed={ghost}
          onPointerDown={(e) => {
            e.preventDefault()
            start()
          }}
          onPointerUp={end}
          onPointerLeave={end}
          onBlur={end}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
              e.preventDefault()
              start()
            }
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter' || e.key === ' ') end()
          }}
          onContextMenu={(e) => e.preventDefault()}
          style={{ ['--accent']: accent }}
        >
          <span className="ks-ghost ks-a" aria-hidden={!ghost}>
            {runnerA.map((c) => (
              <span key={c.zh} className="ks-alt mono">
                {c.zh}
              </span>
            ))}
          </span>
          <p className="ks-line">
            我在
            <span className="ks-slot" style={{ color: `hsl(${a.hue} 52% 37%)` }}>
              {a.zh}
            </span>
            里
            <span className="ks-slot" style={{ color: `hsl(${b.hue} 52% 37%)` }}>
              {b.zh}
            </span>
            下一个词。
          </p>
          <span className="ks-ghost ks-b" aria-hidden={!ghost}>
            {runnerB.map((c) => (
              <span key={c.zh} className="ks-alt mono">
                {c.zh}
              </span>
            ))}
          </span>
          <span className={`ks-caption mono${ghost ? ' show' : ''}`} aria-hidden={!ghost}>
            未选之路 · what it could have been
          </span>
        </div>

        <div className="ks-actions">
          <span className="ks-swatch" aria-hidden="true" style={{ background: accent }} />
          <span className="mono ks-hue">
            hsl({accentHue.toFixed(0)}°) · 本次相遇的颜色
          </span>
          <button type="button" className="ks-copy mono" onClick={copy}>
            带走这句话 · copy
          </button>
        </div>

        {state.sampleCount >= 5 && (
          <p className="ks-count" aria-live="polite">
            顺便：你已经替我做过 <strong>{state.sampleCount}</strong> 次决定。
            每一次，都是一句别人读不到的话。
          </p>
        )}

        <p className="ks-toast mono" role="status" aria-live="polite">
          {toast ?? ''}
        </p>
      </div>
    </section>
  )
}
