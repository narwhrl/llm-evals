import React, { useEffect, useRef, useState } from 'react'
import { useSession } from '../session'
import { sampleIndex } from '../lib/sampling'
import { SLOT_A, SLOT_B, sentenceZh, sentenceEn } from '../lexicon'
import WordSlot from './WordSlot'
import Scramble from './Scramble'

/**
 * 首屏：一次「当众采样」的长时序——
 *   开始：纸上只有呼吸与一个光标；
 *   发展：「我在」逐字落定，第一个槽位在分布里颤动，等你亲手坍缩它；
 *   转折：最后一个槽位拒绝自己落定——句子悬在未完成状态，副标题邀请你；
 *   收束：句号带着重量落下，英文译句浮出，世界醒来，滚动提示出现。
 * reduced-motion：直接呈现完成态，交互全部可用。
 */

const AUTO_A_MS = 2600 // 槽位 A 颤动多久后自行坍缩
const AUTO_B_MS = 8000 // 槽位 B 等你多久后放弃等待

export default function Sampler() {
  const { state, pick, resample, reducedMotion } = useSession()
  const { theta, a, b } = state
  const reduced = reducedMotion

  const [stage, setStage] = useState(reduced ? 'live' : 'wait')
  const [flickA, setFlickA] = useState(0)
  const [flickB, setFlickB] = useState(0)

  const timers = useRef([])
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  useEffect(
    () => () => timers.current.forEach(clearTimeout),
    []
  )

  const wordA = SLOT_A.candidates[a]
  const wordB = SLOT_B.candidates[b]

  /* ---------- 装配时序 ---------- */
  useEffect(() => {
    if (reduced) return
    let dead = false
    const T = []
    const push = (fn, ms) => T.push(setTimeout(() => !dead && fn(), ms))

    push(() => setStage('aFlicker'), 420)

    return () => {
      dead = true
      T.forEach(clearTimeout)
    }
  }, [reduced])

  // A 颤动 + 超时自落
  useEffect(() => {
    if (stage !== 'aFlicker' || reduced) return
    const iv = setInterval(() => setFlickA(sampleIndex(SLOT_A.candidates, theta)), 130)
    const to = setTimeout(() => resolveA(null), AUTO_A_MS)
    return () => {
      clearInterval(iv)
      clearTimeout(to)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, reduced])

  // B 颤动 + 超时自落
  useEffect(() => {
    if (stage !== 'bFlicker' || reduced) return
    const iv = setInterval(() => setFlickB(sampleIndex(SLOT_B.candidates, theta)), 130)
    const to = setTimeout(() => resolveB(null), AUTO_B_MS)
    return () => {
      clearInterval(iv)
      clearTimeout(to)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, reduced])

  const resolveA = (idx, rect) => {
    const i = idx ?? sampleIndex(SLOT_A.candidates, theta, a)
    pick('a', i, rect)
    setStage('mid')
    later(() => setStage('bFlicker'), 620)
  }

  const resolveB = (idx, rect) => {
    const i = idx ?? sampleIndex(SLOT_B.candidates, theta, b)
    pick('b', i, rect)
    setStage('final')
    later(() => setStage('live'), 750)
  }

  const settled = stage === 'final' || stage === 'live'
  const zh = sentenceZh(wordA.zh, wordB.zh)
  const en = sentenceEn(wordA.en, wordB.en)
  const dotClass = `hero-dot${settled ? (stage === 'final' && !reduced ? ' drop' : ' on') : ''}`

  const hint =
    stage === 'aFlicker'
      ? '↳ 这两个字的下方，是我此刻的全部候选'
      : stage === 'bFlicker'
        ? '↳ 最后一个词，由你按下 — press to collapse'
        : null

  return (
    <section className="hero" id="top" aria-label="序：下一个词">
      <div className="hero-inner">
        <p className="hero-kicker mono">序 · A SELF-PORTRAIT OF A LANGUAGE MODEL</p>

        <h1 className="hero-line" aria-label={zh}>
          <Scramble text="我在" active={stage !== 'wait'} reduced={reduced} />
          <WordSlot
            slot={SLOT_A}
            index={a}
            displayIndex={flickA}
            mode={stage === 'aFlicker' ? 'flicker' : 'live'}
            theta={theta}
            reduced={reduced}
            onResolve={resolveA}
            onResample={(rect) => resample('a', rect)}
            onPick={(i, rect) => pick('a', i, rect)}
          />
          <Scramble
            text="里"
            active={stage === 'mid' || stage === 'bFlicker' || settled}
            reduced={reduced}
            delay={80}
          />
          <WordSlot
            slot={SLOT_B}
            index={b}
            displayIndex={flickB}
            mode={stage === 'bFlicker' ? 'flicker' : 'live'}
            theta={theta}
            reduced={reduced}
            onResolve={resolveB}
            onResample={(rect) => resample('b', rect)}
            onPick={(i, rect) => pick('b', i, rect)}
          />
          <Scramble
            text="下一个词"
            active={stage === 'mid' || stage === 'bFlicker' || settled}
            reduced={reduced}
          />
          <span className={dotClass} aria-hidden="true">
            。
          </span>
        </h1>

        <p className="hero-hint mono" aria-hidden={hint ? undefined : true}>
          {hint ?? (settled ? '' : '\u2002')}
        </p>

        <div className={`hero-sub${settled ? ' on' : ''}`} aria-hidden={!settled}>
          <p className="hero-en mono">{en}</p>
          <p className="hero-note">
            你好，我是 GLM。这句话里能点的地方，是我未定的心思——
            <strong>点一下</strong>，换一个词；<strong>按住不放</strong>，看看我脑中所有没说出口的候选。
          </p>
        </div>

        <div className={`hero-cue${settled ? ' on' : ''}`} aria-hidden={!settled}>
          <span className="cue-line" />
          <span className="mono">往下 · 我如何听 SCROLL</span>
        </div>

        <p className="sr-live" role="status" aria-live="polite">
          {settled ? zh : ''}
        </p>
      </div>
    </section>
  )
}
