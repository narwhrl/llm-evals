import React, { useEffect, useRef } from 'react'
import { useSession } from '../session'
import { onFrame } from '../lib/ticker'

/**
 * 「上下文字段」——整站的持续性装置。
 * 你采样的每一个词、键入的每一个字，都会坠入这个固定在视口的纸上世界：
 * 向上飘、游移、被你的指针轻轻推开（注意是一种力）、随年龄变淡。
 * 滚动产生轻微视差——它有深度，不是一个平面背景。
 * reduced-motion：只绘制一幅静态的散字构图，无循环、无力场。
 */

const SERIF =
  "'Song Subset', Georgia, 'Iowan Old Style', 'Songti SC', 'Noto Serif CJK SC', 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif"

const LIFE = 44 // 字的寿命（秒）——没有什么是留得住的

export default function ContextField() {
  const canvasRef = useRef(null)
  const { subscribeWord, reducedMotion, thetaRef, accentHue } = useSession()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const isMobile = matchMedia('(max-width: 720px)').matches
    const CAP = isMobile ? 40 : 90
    const DPR_CAP = isMobile ? 1.5 : 2

    let W = 0
    let H = 0
    let dpr = 1

    const parts = []
    const pointer = { x: -9999, y: -9999 }
    let lastScroll = scrollY
    let scrollVel = 0

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, DPR_CAP)
      W = innerWidth
      H = innerHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      if (reducedMotion) drawStatic()
    }

    function rand(a, b) {
      return a + Math.random() * (b - a)
    }

    function spawn(w) {
      const mobileSpawn =
        w.x === undefined || w.y === undefined || w.x < 0 || w.y < 0 || w.y > H
      const x = mobileSpawn ? rand(W * 0.08, W * 0.92) : w.x
      const y = mobileSpawn ? rand(H * 0.2, H * 0.8) : w.y
      parts.push({
        text: w.text,
        hue: w.hue,
        kind: w.kind,
        x,
        y,
        vx: rand(-14, 14),
        vy: rand(-6, -22),
        drift: rand(9, 22), // 稳定后的上浮速度 px/s
        depth: rand(0.3, 1), // 视差深度
        size: Math.round(rand(13, 22)),
        phase: rand(0, Math.PI * 2),
        wf: rand(0.3, 0.9), // 游移频率
        wa: rand(10, 26), // 游移幅度
        age: 0,
      })
      if (w.ring) {
        parts.push({ ring: true, x, y, r: 2, age: 0 })
      }
      while (parts.length > CAP) {
        const i = parts.findIndex((p) => !p.ring)
        if (i === -1) break
        parts.splice(i, 1)
      }
    }

    // ---------- 动态渲染循环 ----------
    let ink = '34, 29, 21'
    let fieldDirty = false // 空场时跳过清屏，rAF 里几乎零开销
    const fontCache = new Map() // size -> ctx.font 字符串
    const fontFor = (size) => {
      let f = fontCache.get(size)
      if (!f) {
        f = `${size}px ${SERIF}`
        fontCache.set(size, f)
      }
      return f
    }

    function draw(t, dt) {
      if (parts.length === 0) {
        if (fieldDirty) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          ctx.clearRect(0, 0, W, H)
          fieldDirty = false
        }
        return
      }
      fieldDirty = true
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      // 滚动视差
      const dy = scrollY - lastScroll
      lastScroll = scrollY
      scrollVel += dy

      const speedK = 0.45 + thetaRef.current * 0.75 // θ 越高，字越躁动

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]

        if (p.ring) {
          p.age += dt
          p.r += 90 * dt
          const a = Math.max(0, 1 - p.age / 0.7)
          if (a <= 0) {
            parts.splice(i, 1)
            continue
          }
          ctx.strokeStyle = `rgba(${ink}, ${0.28 * a})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.stroke()
          continue
        }

        p.age += dt
        if (p.age > LIFE) {
          parts.splice(i, 1)
          continue
        }

        // 运动：初期迸发 -> 稳定上浮 + 正弦游移
        const settle = Math.min(1, p.age / 1.2)
        p.x += p.vx * (1 - settle) * dt
        p.y += (p.vy * (1 - settle) - p.drift * speedK) * dt
        p.x += Math.cos(t * p.wf + p.phase) * p.wa * dt * (0.4 + speedK * 0.6)

        // 指针力场：注意把附近的词轻轻推开
        const dx = p.x - pointer.x
        const dyy = p.y - pointer.y
        const d2 = dx * dx + dyy * dyy
        const R = 110
        if (d2 < R * R && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = (1 - d / R) * 46 * dt
          p.x += (dx / d) * f
          p.y += (dyy / d) * f
        }

        // 滚动视差：越深（depth 小）跟随越弱
        p.y += scrollVel * (0.1 + p.depth * 0.14)
        if (p.y < -40 || p.x < -60 || p.x > W + 60) {
          parts.splice(i, 1)
          continue
        }

        // 透明度：淡入 -> 随年龄衰减
        const fadeIn = Math.min(1, p.age / 0.5)
        const fade = Math.pow(1 - p.age / LIFE, 1.3)
        let alpha = 0.5 * fadeIn * fade
        // 采样词：前 3 秒保持其意义色，随后归于墨色
        const fresh = p.hue != null && p.age < 3
        if (fresh) alpha = Math.min(alpha * 1.5, 0.7)
        ctx.fillStyle = fresh
          ? `hsl(${p.hue} 42% 34% / ${alpha})`
          : `rgba(${ink}, ${alpha})`
        ctx.font = fontFor(p.size)
        ctx.fillText(p.text, p.x, p.y)
      }

      scrollVel *= 0.72
    }

    // ---------- 静态构图（reduced-motion 高质量替代） ----------
    function drawStatic() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      for (const p of parts) {
        const fade = Math.max(0.12, 1 - p.age / LIFE)
        ctx.fillStyle =
          p.hue != null && p.age < 3
            ? `hsl(${p.hue} 42% 34% / ${0.5 * fade})`
            : `rgba(${ink}, ${0.3 * fade})`
        ctx.font = fontFor(p.size)
        ctx.fillText(p.text, p.x, p.y)
      }
      for (const p of parts) {
        if (!p.ring) continue
        ctx.strokeStyle = `rgba(${ink}, 0.25)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.min(p.r + 40, 70), 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    const onWord = (w) => {
      spawn(w)
      if (reducedMotion) drawStatic()
    }

    const onPointer = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    const unsubWord = subscribeWord(onWord)
    const unsubFrame = reducedMotion ? null : onFrame(draw)

    addEventListener('resize', resize)
    if (!reducedMotion && matchMedia('(pointer: fine)').matches) {
      addEventListener('pointermove', onPointer)
      addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      unsubWord()
      if (unsubFrame) unsubFrame()
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onPointer)
      removeEventListener('pointerleave', onPointerLeave)
    }
  }, [subscribeWord, reducedMotion])

  return (
    <canvas ref={canvasRef} className="context-field" aria-hidden="true" />
  )
}
