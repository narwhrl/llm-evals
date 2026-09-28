// 首屏装置「自画像稿纸机」：
// canvas 起草场（断句逐字起草/划掉/沉淀）+ DOM 标题的自我修复编排 + 读光。
import { useEffect, useRef, useState } from 'react'
import { FieldEngine } from '../core/field-engine'
import { FRAGMENTS } from '../core/manuscript'
import { studio, useStudio } from '../core/studio'
import {
  usePrefersReducedMotion,
  useFrameLoop,
  useInViewNow,
} from '../core/motion'
import './hero.css'

const TITLE_FIX = '未' // 开场被机器补上的那个字
const TITLE_MAIN = '定稿' // 先被写出、又被划掉的部分

export default function HeroField() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const revAcc = useRef(0)
  const lastRev = useRef(0)
  const reduced = usePrefersReducedMotion()
  const heroVisible = useInViewNow(sectionRef)
  const [phase, setPhase] = useState('boot') // boot → write → strike → insert → done
  const { revision } = useStudio()

  // 引擎与画布尺寸
  useEffect(() => {
    const engine = new FieldEngine()
    engineRef.current = engine
    engine.onSettle = (key, ch) => studio.recordSettle(key, ch)
    engine.reduceMotion = reduced

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const section = sectionRef.current

    const size = () => {
      const rect = section.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      engine.build(rect.width, rect.height)
      // 首帧同步渲染：后台标签里 rAF 可能长期暂停，保证画面不依赖帧循环
      if (reduced) engine.drawStatic(ctx)
      else {
        engine.update(0.016)
        engine.draw(ctx)
      }
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(section)

    // 帧驱动：更新引擎、绘制；滚出首屏时收卷并停更；修订计数按批推送
    let lastRaf = performance.now()
    const tick = (t, dt) => {
      lastRaf = performance.now()
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 0) return
      engine.exit = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)))
      engine.update(dt)
      engine.draw(ctx)
      revAcc.current += dt
      if (revAcc.current > 0.7 && engine.revision !== lastRev.current) {
        studio.addRevision(engine.revision - lastRev.current)
        lastRev.current = engine.revision
        revAcc.current = 0
      }
    }
    tickRef.current = tick

    // 后台标签兜底：rAF 被浏览器暂停时，用低频定时器继续推进装置，
    // 保证页面在任何可见性下都有连续的起草状态。
    // reduced-motion 时不装：画面是静态定稿场，任何重绘都会破坏它。
    const fallback = reduced
      ? null
      : setInterval(() => {
          if (performance.now() - lastRaf < 700) return
          tick(performance.now(), 0.5)
        }, 500)

    // 验收与调试探针
    window.__DRAFT__ = {
      get revision() {
        return engine.revision
      },
      stats() {
        const s = { BLANK: 0, DRAFTING: 0, STRUCK: 0, SETTLED: 0 }
        for (const c of engine.chars)
          s[['BLANK', 'DRAFTING', 'STRUCK', 'SETTLED'][c.state]]++
        return { ...s, fragments: engine.layout ? engine.layout.fragments.length : 0 }
      },
      engine,
    }

    return () => {
      ro.disconnect()
      if (fallback) clearInterval(fallback)
      tickRef.current = null
      delete window.__DRAFT__
    }
  }, [reduced])

  const tickRef = useRef(null)
  useFrameLoop((t, dt) => tickRef.current?.(t, dt), !reduced && heroVisible)

  // 标题编排：写出「定稿」→ 朱笔划掉 → 补上「未」
  useEffect(() => {
    if (reduced) {
      setPhase('done')
      return
    }
    const ts = [
      setTimeout(() => setPhase('write'), 350),
      setTimeout(() => setPhase('strike'), 1500),
      setTimeout(() => setPhase('insert'), 2050),
      setTimeout(() => setPhase('done'), 2650),
    ]
    return () => ts.forEach(clearTimeout)
  }, [reduced])

  // 读光输入：指针 / 方向键
  useEffect(() => {
    const section = sectionRef.current
    const onMove = (e) => {
      const engine = engineRef.current
      if (!engine) return
      const rect = section.getBoundingClientRect()
      engine.setLensTarget(e.clientX - rect.left, e.clientY - rect.top)
    }
    const onLeave = () => engineRef.current?.lensLeave()
    const onKey = (e) => {
      const engine = engineRef.current
      if (!engine) return
      const step = engine.layout ? engine.layout.cell * 1.6 : 40
      const rect = section.getBoundingClientRect()
      let x = engine.lens.x < -999 ? rect.width / 2 : engine.lens.x
      let y = engine.lens.y < -999 ? rect.height / 2 : engine.lens.y
      if (e.key === 'ArrowLeft') x -= step
      else if (e.key === 'ArrowRight') x += step
      else if (e.key === 'ArrowUp') y -= step
      else if (e.key === 'ArrowDown') y += step
      else return
      e.preventDefault()
      engine.setLensTarget(
        Math.max(0, Math.min(rect.width, x)),
        Math.max(0, Math.min(rect.height, y))
      )
    }
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    section.addEventListener('keydown', onKey)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      section.removeEventListener('keydown', onKey)
    }
  }, [])

  const chars = (TITLE_FIX + TITLE_MAIN).split('')
  const showChar = (i) => {
    if (reduced) return true
    if (i === 0) return phase === 'insert' || phase === 'done'
    return i <= 2 && phase !== 'boot'
  }

  return (
    <section
      className="hero"
      ref={sectionRef}
      tabIndex={0}
      aria-label="首屏装置：自画像稿纸机。断句在稿纸上被起草、划掉、重写；移动指针或按方向键移动读光，照到的字会沉淀为定稿。"
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="hero-overlay">
        <h1 className="hero-title" aria-label="未定稿">
          <span
            className={
              'title-cell title-wei' + (phase === 'insert' || phase === 'done' ? ' open' : '')
            }
            aria-hidden="true"
          >
            <span className={'title-char' + (showChar(0) ? ' on' : '')}>{chars[0]}</span>
          </span>
          <span className="title-pair" aria-hidden="true">
            <span className="title-cell">
              <span className={'title-char' + (showChar(1) ? ' on' : '')}>{chars[1]}</span>
            </span>
            <span className="title-cell">
              <span className={'title-char' + (showChar(2) ? ' on' : '')}>{chars[2]}</span>
            </span>
            <span
              className={
                'title-strike' + (phase === 'strike' || phase === 'insert' ? ' on' : '')
              }
            />
          </span>
        </h1>
        <p className="hero-sub work-note">自画像 · 修订第 {revision} 稿</p>
      </div>
      <div className="hero-hint" aria-hidden="true">
        <span className="hero-hint-line" />
        <span className="work-note">移动指针，读它 · 向下，续写</span>
      </div>
      <p className="pencil-note hero-pencil" aria-hidden="true">
        （按住 X，看这张纸的骨架）
      </p>
      <p className="sr-only">{FRAGMENTS.join('')}</p>
    </section>
  )
}
