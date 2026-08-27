import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { temperedWeights } from '../lib/sampling'

/**
 * 词位——整件作品的核心装置的最小单元。
 *
 * 三种形态：
 *  - flicker：装配期的「未坍缩」。词在分布里颤动（墨灰色，没有意义色），
 *    下方露出可点选的候选条——第一次点击就是一次坍缩。
 *  - live：已坍缩。点击重采样（永远给出新词）；按住 320ms 展开完整分布，
 *    按住拖到某候选上释放 = 你替模型选定；hover 时其他候选以双重曝光显影。
 *  - static：尾声纪念句的只读形态。
 *
 * 键盘：Enter/Space 重采样；↓ 展开分布；↑↓ 移动；Enter 选定；Esc 收起。
 */

const HOLD_MS = 320

export default function WordSlot({
  slot,
  index,
  displayIndex,
  mode = 'live',
  theta,
  reduced,
  onResolve, // (index|null, rect) 装配期
  onResample, // (rect)
  onPick, // (index, rect)
}) {
  const btnRef = useRef(null)
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const [distOpen, setDistOpen] = useState(false)
  const [distIdx, setDistIdx] = useState(-1)
  const [prevWord, setPrevWord] = useState(null)
  const [manualIdx, setManualIdx] = useState(-1)
  const holdTimer = useRef(null)
  const didHold = useRef(false)
  const prevIndex = useRef(index)
  const prevSeq = useRef(0)

  const cands = slot.candidates
  const current = cands[index] || cands[0]
  const shown = mode === 'flicker' ? cands[displayIndex] || cands[0] : current
  const weights = temperedWeights(cands, theta)

  // 旧词坠落动画（跳过首次渲染）
  useEffect(() => {
    if (prevIndex.current !== index) {
      const old = cands[prevIndex.current]
      if (old) setPrevWord({ zh: old.zh, id: ++prevSeq.current })
      prevIndex.current = index
    }
  }, [index, cands])

  useEffect(() => {
    if (mode === 'flicker') setManualIdx(-1)
  }, [mode, displayIndex])

  const rect = () => btnRef.current?.getBoundingClientRect()

  const closeDist = useCallback(() => {
    clearTimeout(holdTimer.current)
    setDistOpen(false)
    setDistIdx(-1)
  }, [])

  // 面板打开时，点击外部关闭
  useEffect(() => {
    if (!distOpen) return
    const onDown = (e) => {
      if (!e.target.closest?.('.slot-wrap')) closeDist()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [distOpen, closeDist])

  const flashPrev = () => setPrevWord(null)

  /* ---------- 指针：短按=重采样，长按=分布，按住拖放=选定 ---------- */
  const onPointerDown = (e) => {
    if (mode !== 'live' || reduced) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    didHold.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}
    clearTimeout(holdTimer.current)
    holdTimer.current = setTimeout(() => {
      didHold.current = true
      setDistOpen(true)
      setDistIdx(index)
    }, HOLD_MS)
  }

  const onPointerUp = () => {
    clearTimeout(holdTimer.current)
    // 释放在面板行上时，行内的 pointerup 负责选定（stopPropagation）
    if (didHold.current && distOpen) closeDist()
  }

  const onClick = () => {
    if (didHold.current) {
      didHold.current = false
      return
    }
    if (mode === 'flicker') {
      onResolve?.(manualIdx >= 0 ? manualIdx : null, rect())
    } else if (mode === 'live') {
      onResample?.(rect())
    }
  }

  const onContextMenu = (e) => {
    if (mode === 'live') e.preventDefault()
  }

  /* ---------- 键盘 ---------- */
  const onKeyDown = (e) => {
    if (mode === 'flicker') {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const dir = e.key === 'ArrowRight' ? 1 : -1
        const cur = manualIdx >= 0 ? manualIdx : displayIndex
        const next = (cur + dir + cands.length) % cands.length
        setManualIdx(next)
      }
      return
    }
    if (mode !== 'live') return
    if (distOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const dir = e.key === 'ArrowDown' ? 1 : -1
        setDistIdx((i) => (i + dir + cands.length) % cands.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        onPick?.(distIdx >= 0 ? distIdx : index, rect())
        closeDist()
      } else if (e.key === 'Escape' || e.key === 'Tab') {
        closeDist()
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setDistOpen(true)
      setDistIdx(index)
    }
  }

  const rowPointerUp = (i) => (e) => {
    e.stopPropagation()
    onPick?.(i, rect())
    didHold.current = false
    closeDist()
  }

  /* ---------- 渲染 ---------- */
  const others = mode === 'live' ? cands.filter((_, i) => i !== index) : []
  const wordColor =
    mode === 'flicker'
      ? undefined // 未坍缩：没有意义色
      : `hsl(${current.hue} 52% 37%)`
  const underline =
    mode === 'flicker'
      ? { borderBottom: '2px dashed var(--hair-strong)' }
      : {
          borderBottom: `${(2 + (theta - 0.1) * 3.2).toFixed(1)}px solid hsl(${current.hue} 52% 37% / 0.85)`,
        }

  const showMini = mode === 'flicker' || hover || focus || distOpen

  return (
    <span
      className={`slot-wrap mode-${mode}${distOpen ? ' open' : ''}`}
      onPointerUp={onPointerUp}
    >
      <button
        ref={btnRef}
        type="button"
        className="slot"
        style={{ ...underline, ['--slot-hue']: current.hue }}
        aria-label={
          mode === 'flicker'
            ? `${slot.aria}候选，正在颤动，点击使其坍缩`
            : `${slot.aria}：${current.zh}。点击重新采样，按住查看候选分布，下方向键展开`
        }
        aria-haspopup="true"
        aria-expanded={distOpen}
        onPointerDown={onPointerDown}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onContextMenu={onContextMenu}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false)
          closeDist()
        }}
      >
        {mode === 'live' && !reduced && (
          <span className="slot-ghosts" aria-hidden="true">
            {others.slice(0, 2).map((c, i) => (
              <span key={c.zh} className={`slot-ghost g${i}`}>
                {c.zh}
              </span>
            ))}
          </span>
        )}
        {prevWord && (
          <span
            key={prevWord.id}
            className="slot-word out"
            onAnimationEnd={flashPrev}
            aria-hidden="true"
          >
            {prevWord.zh}
          </span>
        )}
        <span
          key={mode === 'flicker' ? 'f' : index}
          className={`slot-word in${mode === 'flicker' ? ' flick' : ''}`}
          style={wordColor ? { color: wordColor } : undefined}
        >
          {mode === 'flicker' && manualIdx >= 0 ? cands[manualIdx].zh : shown.zh}
        </span>
        {mode === 'flicker' && <span className="slot-caret" aria-hidden="true" />}
      </button>

      {/* 迷你分布条：装配期可点选，平时是权重的影子 */}
      {showMini && !reduced && (
        <span className="slot-mini" aria-hidden={mode !== 'flicker'}>
          {cands.map((c, i) =>
            mode === 'flicker' ? (
              <button
                key={c.zh}
                type="button"
                className="mini-seg btn"
                style={{ flexGrow: weights[i] }}
                tabIndex={-1}
                aria-label={`选定候选 ${c.zh}`}
                onPointerUp={(e) => {
                  e.stopPropagation()
                  onResolve?.(i, rect())
                }}
              >
                <span
                  className="mini-fill"
                  style={{
                    opacity:
                      (manualIdx >= 0 ? manualIdx : displayIndex) === i ? 1 : 0.45,
                  }}
                />
              </button>
            ) : (
              <span
                key={c.zh}
                className="mini-seg"
                style={{ flexGrow: weights[i] }}
                title={`${c.zh} ${(weights[i] * 100).toFixed(0)}%`}
              >
                <span
                  className="mini-fill"
                  style={{ opacity: i === index ? 1 : 0.4 }}
                />
              </span>
            )
          )}
        </span>
      )}

      {/* 完整分布面板（按住 / ↓ 展开） */}
      {distOpen && (
        <span className="dist-panel" role="listbox" aria-label={`${slot.aria}的候选分布`}>
          <span className="dist-head">
            候选分布 · θ {theta.toFixed(2)}
          </span>
          {cands.map((c, i) => (
            <span
              key={c.zh}
              role="option"
              aria-selected={distIdx === i}
              className={`dist-row${distIdx === i ? ' hot' : ''}${i === index ? ' now' : ''}`}
              onPointerEnter={() => setDistIdx(i)}
              onPointerUp={rowPointerUp(i)}
            >
              <span className="dist-word" style={{ color: `hsl(${c.hue} 52% 37%)` }}>
                {c.zh}
              </span>
              <span className="dist-bar">
                <span
                  className="dist-bar-fill"
                  style={{ width: `${weights[i] * 100}%` }}
                />
              </span>
              <span className="dist-pct">{(weights[i] * 100).toFixed(0)}%</span>
            </span>
          ))}
          <span className="dist-foot">松开选定 · release to sample</span>
        </span>
      )}
    </span>
  )
}
