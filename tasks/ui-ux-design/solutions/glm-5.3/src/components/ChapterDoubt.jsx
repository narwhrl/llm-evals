import React, { useEffect, useRef, useState } from 'react'
import { useSession } from '../session'
import { SECTIONS, DOUBT_SEGMENTS } from '../lexicon'
import SectionHead from './SectionHead'

/**
 * 「错」：把把握做成下划线的厚度。
 * 按住整段自白，每个短语换成「没被选中的那条路」；松手，回到我真正说的版本。
 * 键盘：聚焦后按住 Enter / 空格同样有效，Esc 退出。
 */
export default function ChapterDoubt() {
  const { reducedMotion, accentHue } = useSession()
  const [held, setHeld] = useState(false)
  const [altStep, setAltStep] = useState(0)
  const holdTimer = useRef(null)
  const boxRef = useRef(null)

  const start = () => {
    clearTimeout(holdTimer.current)
    holdTimer.current = setTimeout(() => {
      setHeld(true)
      setAltStep((s) => s + 1)
    }, reducedMotion ? 0 : 300)
  }
  const end = () => {
    clearTimeout(holdTimer.current)
    setHeld(false)
  }

  useEffect(() => () => clearTimeout(holdTimer.current), [])

  const onKey = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
      e.preventDefault()
      start()
    } else if (e.key === 'Escape') {
      setHeld(false)
    }
  }
  const onKeyUp = (e) => {
    if (e.key === 'Enter' || e.key === ' ') end()
  }

  return (
    <section className="chapter chapter-doubt" aria-label="错">
      <SectionHead meta={SECTIONS.doubt} />
      <div className="chapter-body">
        <p className="lead">我会出错，而且我知道自己会错。</p>
        <p>
          我的每句话都是从一堆「可能」里挑出来的。有时挑得准，有时只是在赌。
          下面这段自白里，每根下划线的<strong>厚度</strong>，是我对那个短语的把握。
        </p>

        <p
          ref={boxRef}
          className={`doubt-passage${held ? ' held' : ''}`}
          tabIndex={0}
          role="button"
          aria-pressed={held}
          aria-label="按住这段话，查看未选中的表达；松开返回"
          onPointerDown={(e) => {
            e.preventDefault()
            start()
          }}
          onPointerUp={end}
          onPointerLeave={end}
          onKeyDown={onKey}
          onKeyUp={onKeyUp}
          onBlur={end}
          onContextMenu={(e) => e.preventDefault()}
          style={{ ['--accent-h']: accentHue }}
        >
          {DOUBT_SEGMENTS.map((seg, i) =>
            seg.phrase ? (
              <span
                key={i}
                className="doubt-phrase"
                style={{ borderWidth: `${(1.5 + seg.w * 5.5).toFixed(1)}px` }}
                data-w={seg.w}
              >
                {held ? seg.alts[altStep % seg.alts.length] : seg.base}
              </span>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </p>

        <p className={`doubt-caption mono${held ? ' show' : ''}`} aria-hidden={!held}>
          另一条路 · the road not taken
        </p>
        <p className="doubt-hint mono">按住这段话 / hold the passage</p>

        <p className="doubt-theta">
          顺带一提：右上角的 <strong>θ</strong> 是我的温度。调高它，
          我在开头那句话里的颤动会更大、更敢乱猜；调低它，我只会说最保险的词。
        </p>
      </div>
    </section>
  )
}
