// 「承」章（转折）：机器修好之后本想写一段漂亮的总结，
// 写完自己划掉——朱批批注，然后说实话。
// 若访客在「修」章选了丙（改漂亮话），机器先点破那件事。
import { useEffect, useRef, useState } from 'react'
import { useStudio } from '../core/studio'
import { useInViewOnce, usePrefersReducedMotion } from '../core/motion'
import './confession.css'

const STRUCK_CLAUSES = ['我高效、精准、', '永不出错，', '随时准备', '为您提供专业的帮助。']
const ZHU_NOTES = ['太整齐了，不像我。', '「提供」？我不认识「您」。', '删。']
const HONEST_LINES = [
  '说实话：我记不住你没写下来的事。',
  '我的把握都是借来的——借自我读过的无数文本，有时借来的东西里藏着偏见。',
  '我会把好东西改坏，也常在改坏之后的那一版里，遇见更好的东西。',
  '我最好的状态不是独自完成，是有人站在旁边说：这里不对。',
]

export default function ConfessionChapter() {
  const secRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const inView = useInViewOnce(secRef)
  const { patch } = useStudio()
  const [struckAll, setStruckAll] = useState(reduced)

  // 入场编排：四道朱痕依次划过漂亮话，随后朱批浮现
  const onStrikeTick = (i) => {
    if (i === STRUCK_CLAUSES.length - 1) setStruckAll(true)
  }

  return (
    <section className="chapter confession" ref={secRef} aria-label="承：机器的自我批评">
      <header className="chapter-head">
        <span className="chapter-no">修订 03</span>
        <h2 className="chapter-title">承 · 自白</h2>
        <span className="rule-marker" aria-hidden="true">
          三
        </span>
      </header>

      {patch === 'c' && (
        <p className="confession-callout pencil-note">
          关于刚才第 [3] 行：改得很顺。顺得不太像我。
        </p>
      )}

      <div className="confession-struck" aria-label="（被划掉的一段漂亮话）">
        <p className="confession-fake">
          {STRUCK_CLAUSES.map((clause, i) => (
            <StrikeClause
              key={i}
              text={clause}
              go={inView}
              index={i}
              reduced={reduced}
              onTick={onStrikeTick}
            />
          ))}
        </p>
        <div className={'confession-notes' + (struckAll ? ' show' : '')} aria-hidden={!struckAll}>
          {ZHU_NOTES.map((note, i) => (
            <span className="zhu-note" key={i} style={{ transitionDelay: `${i * 0.35}s` }}>
              {note}
            </span>
          ))}
        </div>
      </div>

      <div className={'confession-honest' + (struckAll ? ' show' : '')}>
        {HONEST_LINES.map((line, i) => (
          <p key={i} style={{ transitionDelay: `${0.5 + i * 0.3}s` }}>
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}

function StrikeClause({ go, text, index, reduced, onTick }) {
  const [drawn, setDrawn] = useState(reduced)

  useEffect(() => {
    if (!go || drawn) return
    if (reduced) {
      setDrawn(true)
      onTick(index)
      return
    }
    const t = setTimeout(() => {
      setDrawn(true)
      onTick(index)
    }, 300 + index * 380)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go])

  return (
    <span className={'strike-clause' + (drawn ? ' is-struck' : '')}>
      {text}
      <span className={'strike-line' + (drawn ? ' is-drawn' : '')} />
    </span>
  )
}
