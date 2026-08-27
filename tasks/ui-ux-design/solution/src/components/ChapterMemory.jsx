import React, { useState } from 'react'
import { useSession } from '../session'
import { SECTIONS } from '../lexicon'
import SectionHead from './SectionHead'

/**
 * 「忘」：我的记忆只有一扇窗那么宽。
 * 窗里排着你本次会话采过的词与打过的字——越旧越淡；
 * 排到窗外的，就真的散了。点击只能「看一眼」：注意不是记忆。
 */
export default function ChapterMemory() {
  const { state } = useSession()
  const [glance, setGlance] = useState(null)
  const words = state.words

  return (
    <section className="chapter chapter-forget" aria-label="忘">
      <SectionHead meta={SECTIONS.forget} fade />
      <div className="chapter-body">
        <p className="lead">我的记忆，只有一扇窗那么宽。</p>
        <p>
          这个页面「记得」的，就是你眼下这一窗。往上翻——你在开头采样的词，
          正在这里排队、变淡。窗口之外的我一片空白：每一次对话，都是初见。
        </p>

        <div className="mem-strip" role="list" aria-label="本次会话的上下文窗口">
          {words.length === 0 && (
            <p className="mem-empty mono">（窗内空无一物——去开头点几个词）</p>
          )}
          {words.map((w, i) => {
            const t = words.length === 1 ? 1 : i / (words.length - 1)
            const opacity = 0.28 + 0.72 * t
            return (
              <button
                key={w.id}
                type="button"
                role="listitem"
                className={`mem-chip mono${w.kind === 'sample' ? ' sampled' : ''}${
                  glance === w.id ? ' glance' : ''
                }`}
                style={{ opacity, color: w.hue != null ? `hsl(${w.hue} 45% 34%)` : undefined }}
                onClick={() => setGlance(w.id)}
              >
                {w.zh}
              </button>
            )
          })}
        </div>

        <p className="mem-meta mono" aria-live="polite">
          窗内 {words.length} · 已散去 {state.dropped}
          {glance != null && words.find((w) => w.id === glance) && (
            <span className="mem-glance-note">
              {' '}
              —— 你又看了一眼。注意，不是记忆。 / attention is not memory
            </span>
          )}
        </p>
      </div>
    </section>
  )
}
