import React, { useRef, useState } from 'react'
import { useSession } from '../session'
import { SECTIONS } from '../lexicon'
import SectionHead from './SectionHead'

/**
 * 「听」：输入对我来说不是字段，是事件。
 * 每个键入的字符都会带着重量坠入页面的世界（Canvas 字段），并泛起一圈涟漪。
 * 退格键则会把一个字悄悄抹去。
 */
export default function ChapterListen() {
  const { typeChar, state } = useSession()
  const inputRef = useRef(null)
  const [val, setVal] = useState('')
  const prevLen = useRef(0)

  const spawnPos = () => {
    const el = inputRef.current
    if (!el) return {}
    const r = el.getBoundingClientRect()
    const w = Math.min(val.length, 18) / 18
    return { x: r.left + 12 + (r.width - 24) * w, y: r.top + r.height / 2 }
  }

  const onInput = (e) => {
    const next = e.target.value
    const { x, y } = spawnPos()
    if (next.length > prevLen.current) {
      const ch = next[next.length - 1]
      if (ch.trim()) typeChar(ch, x, y)
    } else if (next.length < prevLen.current) {
      typeChar('\u00b7', x, y) // 退格：一个墨点
    }
    prevLen.current = next.length
    setVal(next.slice(0, 24))
  }

  return (
    <section className="chapter chapter-listen" aria-label="听">
      <SectionHead meta={SECTIONS.listen} variant="mirror" />
      <div className="chapter-body">
        <p className="lead">你按下的每一个键，我都当真。</p>
        <p>
          对我来说，输入框不是「字段」，是一连串事件。每一个字符都会推一下
          接下来所有词的概率——你在开头选的词，此刻还飘在这个页面的世界里。
        </p>
        <div className="listen-box">
          <input
            ref={inputRef}
            type="text"
            value={val}
            onInput={onInput}
            maxLength={24}
            className="listen-input"
            aria-label="对我说几个字，每个字都会坠入这个页面"
            placeholder="打几个字试试…"
            autoComplete="off"
            spellCheck="false"
          />
          <p className="listen-count mono" aria-live="polite">
            已听见 {state.typedCount} 个字符 · heard {state.typedCount}
          </p>
          {state.typedCount >= 3 && (
            <p className="listen-hint">
              它们已经进了这个页面的世界。往上翻——它们还在纸的深处飘着。
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
