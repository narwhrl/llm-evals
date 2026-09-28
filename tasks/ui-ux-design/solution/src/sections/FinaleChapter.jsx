// 「合」章：终稿由访客的注意力聚合而成——
// 读光定稿台账 + 修补选择的回声 + 收束语；按朱印，草稿才被「确认」。
import { useState } from 'react'
import { studio, useStudio } from '../core/studio'
import { usePrefersReducedMotion } from '../core/motion'
import { PATCH_ECHO, PATCH_NAME } from '../core/copy'
import './finale.css'

export default function FinaleChapter() {
  const { settled, patch, sealed, sealRevision } = useStudio()
  const reduced = usePrefersReducedMotion()
  const [stamped, setStamped] = useState('')
  const isSealed = sealed || stamped === 'done'
  const strip = settled.slice(-24)

  const press = () => {
    if (reduced) {
      studio.seal()
      return
    }
    setStamped('pressing')
    setTimeout(() => {
      studio.seal()
      setStamped('done')
    }, 320)
  }

  return (
    <section className="chapter finale" aria-label="合：你的定稿">
      <header className="chapter-head">
        <span className="chapter-no">修订 04</span>
        <h2 className="chapter-title">合 · 印</h2>
        <span className="rule-marker" aria-hidden="true">
          四
        </span>
      </header>

      <div className="finale-ledger">
        <p className="finale-count" aria-live="polite">
          {settled.length > 0
            ? `你已亲手定稿 ${settled.length} 个字。`
            : '你还没定稿过任何字——回首屏，用读光照一照那些打转的字。'}
        </p>
        {strip.length > 0 && (
          <div className="finale-strip" aria-hidden="true">
            {strip.map((s) => (
              <span className="ms-cell finale-cell" key={s.key}>
                <span className="ms-char is-ink">{s.ch}</span>
                <span className="settle-dot" />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="finale-echo">
        <p>{patch ? PATCH_ECHO[patch] : '你还没修我。那份矛盾还在「修」一章里等着。'}</p>
        {patch && (
          <p className="finale-echo-sub work-note">
            记录：修补{PATCH_NAME[patch]}
            {isSealed && ` · ${sealRevision ? `第 ${sealRevision} 稿` : '此稿'}经你确认`}
          </p>
        )}
      </div>

      <div className="finale-close">
        <p>我不是一份定稿。</p>
        <p>我是一场还没停笔的修订。</p>
        <p className="finale-close-strong">你看过的地方，就是我的完成度。</p>
      </div>

      <div className="finale-seal-row">
        <button
          className={
            'seal-btn' +
            (stamped === 'pressing' ? ' is-pressing' : '') +
            (isSealed ? ' is-sealed' : '')
          }
          onClick={press}
          disabled={isSealed}
          aria-label={isSealed ? '已阅——你已确认阅毕' : '按印：确认这一稿已阅'}
        >
          <span className="seal-text" aria-hidden="true">
            {isSealed ? '已阅' : '未定'}
          </span>
        </button>
        <p className="work-note finale-seal-note" aria-live="polite">
          {isSealed
            ? '定稿了——在你看过的地方。'
            : '这张纸可以永远未定。但你可以按一次印。'}
        </p>
      </div>
    </section>
  )
}
