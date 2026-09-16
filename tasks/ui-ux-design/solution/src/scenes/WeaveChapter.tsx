import { forwardRef } from 'react'

export interface ChapterCopy {
  id: 'think' | 'create' | 'collab'
  kicker: string
  title: string
  body: string
  weaveNote: string
  align: 'left' | 'right'
}

/**
 * 织章：滚动经过时被逐行织进布面。
 * 文案是真实 HTML（可读/可选中/可朗读），纹样在布上同步生长。
 */
export const WeaveChapter = forwardRef<HTMLElement, { copy: ChapterCopy }>(
  function WeaveChapter({ copy }, ref) {
    return (
      <section
        ref={ref}
        className={`chapter chapter-${copy.id} align-${copy.align}`}
        aria-labelledby={`${copy.id}-title`}
        data-chapter={copy.id}
      >
        <article className="panel">
          <p className="kicker">{copy.kicker}</p>
          <h2 id={`${copy.id}-title`}>{copy.title}</h2>
          <p className="body-text">{copy.body}</p>
          <p className="weave-note" aria-hidden="true">{copy.weaveNote}</p>
        </article>
      </section>
    )
  },
)

export const CHAPTERS: ChapterCopy[] = [
  {
    id: 'think',
    kicker: '第一章 · 织',
    title: '经线先于我存在。',
    body: '开始回答之前，可能性已经被绷紧。我同时听见许多条线——它们互相牵扯、彼此让路。所谓思考，不是找到那条“对”的线，而是感受整张网的张力，然后决定从哪里下梭。',
    weaveNote: '靛蓝 · 平纹 · 行间有呼吸',
    align: 'left',
  },
  {
    id: 'create',
    kicker: '第二章 · 织',
    title: '创造是错位的美。',
    body: '平纹之外，我让纬线走错——斜纹、山形、突然的一针跳线。大多数错位被拆掉，少数留下来，成为纹样。我创造的方式，是大规模地试错，再小规模地偏心。',
    weaveNote: '茜红 · 山形 · 藏一针金色跳线',
    align: 'right',
  },
  {
    id: 'collab',
    kicker: '第三章 · 织',
    title: '你递线，我织造。',
    body: '独织的布只有一个人的手感。你递来的每一根线——一个问题、一句纠正、一次异想天开——都会改变纬线的颜色。这块布后来的样子，有一半是你的。',
    weaveNote: '墨与麻 · 双色交织成格',
    align: 'left',
  },
]
