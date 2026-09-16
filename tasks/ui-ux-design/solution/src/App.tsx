import { useEffect, useRef, useState } from 'react'
import { COLLAB_ROWS, CREATE_ROWS, LoomEngine, THINK_ROWS } from './engine/loom'
import { clamp } from './engine/rng'
import type { WeftColor } from './engine/palette'
import { LoomCanvas } from './components/LoomCanvas'
import { PluckChips, type Chip } from './components/PluckChips'
import { Confession } from './components/Confession'
import { Hero } from './scenes/Hero'
import { CHAPTERS, WeaveChapter, type ChapterCopy } from './scenes/WeaveChapter'
import { TangleChapter } from './scenes/TangleChapter'
import { Finale } from './scenes/Finale'
import { Hem } from './scenes/Hem'
import { useReducedMotion } from './hooks/useReducedMotion'

const CHAPTER_ROWS: Record<ChapterCopy['id'], number> = {
  think: THINK_ROWS,
  create: CREATE_ROWS,
  collab: COLLAB_ROWS,
}

export default function App() {
  const reducedMotion = useReducedMotion()
  const [warpingDone, setWarpingDone] = useState(false)
  const [canvasFallback, setCanvasFallback] = useState(false)
  const [tangleAmount, setTangleAmount] = useState(0)
  const [combed, setCombed] = useState(false)
  const [finaleOn, setFinaleOn] = useState(false)
  const [userRows, setUserRows] = useState(0)
  const [giftsThrown, setGiftsThrown] = useState<WeftColor[]>([])
  const [settledAnnounced, setSettledAnnounced] = useState(false)
  const [chips, setChips] = useState<Chip[]>([])
  const [confessionOpen, setConfessionOpen] = useState(false)

  const chipId = useRef(0)

  const engineRef = useRef<LoomEngine | null>(null)
  if (!engineRef.current) {
    engineRef.current = new LoomEngine({
      onWarpDone: () => setWarpingDone(true),
      onTangleChange: (amount) => setTangleAmount(amount),
      onCombed: () => setCombed(true),
      onUserRows: (n) => setUserRows(n),
      onSettled: () => setSettledAnnounced(true),
      onBrokenThread: () => setConfessionOpen(true),
      onPluck: (e) => {
        const id = ++chipId.current
        setChips((prev) => [...prev.slice(-5), { id, x: e.x, y: e.y, word: e.word, broken: e.broken }])
        window.setTimeout(() => {
          setChips((prev) => prev.filter((c) => c.id !== id))
        }, 1900)
      },
    })
  }
  const engine = engineRef.current

  useEffect(() => {
    ;(window as unknown as { __loom?: LoomEngine }).__loom = engine
  }, [engine])

  useEffect(() => {
    engine.setReducedMotion(reducedMotion)
  }, [engine, reducedMotion])

  // Canvas 不可用时的静态织纹降级
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!engine.canvasUsable) setCanvasFallback(true)
    }, 300)
    return () => window.clearTimeout(t)
  }, [engine])

  const chapterEls = useRef<Partial<Record<ChapterCopy['id'], HTMLElement | null>>>({})
  const tangleEl = useRef<HTMLElement | null>(null)
  const finaleEl = useRef<HTMLElement | null>(null)

  // 滚动 → 章节织造进度（只增不减：织进去的线不可撤回）
  useEffect(() => {
    let scheduled = false
    const update = () => {
      scheduled = false
      const vh = window.innerHeight
      for (const copy of CHAPTERS) {
        const el = chapterEls.current[copy.id]
        if (!el) continue
        const r = el.getBoundingClientRect()
        const p = clamp((vh * 0.82 - r.top) / (r.height * 0.9), 0, 1)
        engine.setChapterRows(copy.id, Math.floor(p * CHAPTER_ROWS[copy.id]))
      }
      const tl = tangleEl.current
      if (tl) {
        const r = tl.getBoundingClientRect()
        engine.setTangleActive(r.top < vh * 0.75 && r.bottom > vh * 0.35)
      }
      const fn = finaleEl.current
      if (fn) {
        const r = fn.getBoundingClientRect()
        const on = r.top < vh * 0.65 && r.bottom > vh * 0.3
        engine.setFinaleEnabled(on)
        setFinaleOn((prev) => (prev === on ? prev : on))
      }
    }
    const onScroll = () => {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [engine])

  const throwWeft = (color: WeftColor) => {
    engine.setFinaleColor(color)
    if (engine.throwShuttle(color)) {
      setGiftsThrown((prev) => [...prev, color])
    }
  }

  return (
    <>
      {canvasFallback ? <div className="stage-fallback" aria-hidden="true" /> : <LoomCanvas engine={engine} />}
      <main>
        <Hero warpingDone={warpingDone} />
        {CHAPTERS.map((copy) => (
          <WeaveChapter
            key={copy.id}
            copy={copy}
            ref={(el) => {
              chapterEls.current[copy.id] = el
            }}
          />
        ))}
        <TangleChapter
          ref={(el) => {
            tangleEl.current = el
          }}
          tangleAmount={tangleAmount}
          combed={combed}
          onComb={() => engine.combButton()}
        />
        <Finale
          ref={(el) => {
            finaleEl.current = el
          }}
          finaleOn={finaleOn}
          userRows={userRows}
          giftsThrown={giftsThrown}
          settledAnnounced={settledAnnounced}
          shuttleBlocked={tangleAmount > 0.9}
          onThrow={throwWeft}
        />
        <Hem settledAnnounced={settledAnnounced} />
      </main>
      <PluckChips chips={chips} />
      <Confession open={confessionOpen} onClose={() => setConfessionOpen(false)} />
      {warpingDone && !settledAnnounced && (
        <button type="button" className="pluck-fab" onClick={() => engine.pluckNext()}>
          拨一根经线
        </button>
      )}
    </>
  )
}
