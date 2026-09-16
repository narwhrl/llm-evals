import { useEffect, useRef, useState } from 'react'
import { COLLAB_ROWS, CREATE_ROWS, LoomEngine, THINK_ROWS } from './engine/loom'
import { clamp } from './engine/rng'
import { LoomCanvas } from './components/LoomCanvas'
import { Hero } from './scenes/Hero'
import { CHAPTERS, WeaveChapter, type ChapterCopy } from './scenes/WeaveChapter'
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

  const engineRef = useRef<LoomEngine | null>(null)
  if (!engineRef.current) {
    engineRef.current = new LoomEngine({
      onWarpDone: () => setWarpingDone(true),
    })
  }
  const engine = engineRef.current

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
      </main>
    </>
  )
}
