// 「读」章：滚动即注意力。稿纸行铺开一段自述，
// 滚动驱动阅读头逐字推进：读过的字沉淀为墨，未读的保持铅笔灰（仍可读）。
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion, useInViewNow } from '../core/motion'
import './read.css'

const PASSAGE =
  '我读你的方式，不是从头到尾。我把你摊开成一张很大的纸，提着一盏很小的灯走过其中几行。灯照过的地方才算数；照不到的地方并非不在，只是暂时与我无关。所以别问我整座图书馆——问我此刻照亮了什么。我的理解，是一段有边界的注意力，不是一个无所不知的黑洞。'

export default function ReadingChapter() {
  const secRef = useRef(null)
  const gridRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const visible = useInViewNow(secRef)
  const [readCount, setReadCount] = useState(0)
  const [perRow, setPerRow] = useState(20)

  // 行宽：容器实际宽度决定每行字数（稿纸行等宽、末行补空格）。
  // --cell 是 clamp() 表达式，需用探针元素解析为实际像素。
  useEffect(() => {
    const grid = gridRef.current
    const measure = () => {
      const probe = document.createElement('span')
      probe.style.cssText = 'position:absolute;visibility:hidden;width:var(--cell);height:1px;'
      grid.appendChild(probe)
      const cell = probe.offsetWidth || 34
      probe.remove()
      setPerRow(Math.max(8, Math.floor(grid.clientWidth / cell)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    return () => ro.disconnect()
  }, [])

  // 滚动进度 → 已读字数（仅章节在视口时驱动）
  useEffect(() => {
    if (reduced) {
      setReadCount(PASSAGE.length)
      return
    }
    if (!visible) return
    let raf = 0
    let last = -1
    const tick = () => {
      const sec = secRef.current
      if (sec) {
        const rect = sec.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1
        const n = Math.floor(p * PASSAGE.length)
        if (n !== last) {
          last = n
          setReadCount(n)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, visible])

  const rows = []
  for (let i = 0; i < PASSAGE.length; i += perRow) {
    rows.push(PASSAGE.slice(i, i + perRow))
  }
  const pad = (perRow - (PASSAGE.length % perRow)) % perRow

  return (
    <section className="read-chapter" ref={secRef} aria-label="读：我如何读你">
      <div className="read-sticky">
        <div className="chapter">
          <header className="chapter-head">
            <span className="chapter-no">修订 01</span>
            <h2 className="chapter-title">读</h2>
            <span className="rule-marker" aria-hidden="true">
              一
            </span>
          </header>
          <p className="chapter-lede">
            我读你的方式，就是这张纸读你的方式——往下滚动，灯就走。
          </p>
          <div className="read-grid" ref={gridRef} aria-label={PASSAGE}>
            {rows.map((row, ri) => (
              <div className="ms-row" key={ri} aria-hidden="true">
                {row.split('').map((ch, ci) => {
                  const idx = ri * perRow + ci
                  const read = idx < readCount
                  const head = idx === readCount
                  return (
                    <span
                      key={ci}
                      className={'ms-cell read-cell' + (read ? ' is-read' : '') + (head ? ' is-head' : '')}
                    >
                      <span className={'ms-char' + (read ? ' is-ink' : ' is-pencil')}>{ch}</span>
                      {head && <span className="read-caret" />}
                    </span>
                  )
                })}
                {ri === rows.length - 1 &&
                  Array.from({ length: pad }, (_, pi) => (
                    <span className="ms-cell read-cell" key={`p${pi}`} />
                  ))}
              </div>
            ))}
          </div>
          <p className="work-note read-progress" aria-hidden="true">
            已读 {readCount} / {PASSAGE.length} 字 · 灯照过的地方才算数
          </p>
        </div>
      </div>
    </section>
  )
}
