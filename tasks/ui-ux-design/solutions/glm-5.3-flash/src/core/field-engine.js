// 起草场引擎：稿纸上的自画像文字被起草、划掉、重写；
// 读光（注意力透镜）经过的字加速沉淀为墨色定稿。
// 纯 JS 状态机 + 绘制，时间驱动（不依赖帧数），React 组件只负责接线。

import { layoutField, candidatesFor, SERIF_STACK, WORK_STACK, rng } from './manuscript'

const BLANK = 0
const DRAFTING = 1
const STRUCK = 2
const SETTLED = 3

export class FieldEngine {
  constructor(seed = 20260928) {
    this.rand = rng(seed)
    this.chars = [] // {key, ch, state, glyph, cycleMs, cycleT, fails, cyclesLeft, settleAcc, warmT, struckT}
    this.byKey = new Map()
    this.lens = { x: -9999, y: -9999, tx: -9999, ty: -9999, r: 64, a: 0, ta: 0 }
    this.headT = 0
    this.order = []
    this.orderIdx = 0
    this.revision = 0
    this.exit = 0 // 滚出进度 0..1（章末收卷）
    this.time = 0
    this.idleT = 99 // 读光静止计时（注意力离开即淡出）
    this.longFrag = null // 整句重写的对象（最长断句）
    this.rewrite = null // {t} 整句重写进行中：朱线划过整句、字格清空、重起
    this.rewriteT = 9 // 距下一次整句重写
    this.onSettle = null // (key, ch) => void —— 读光定稿（可重复触发同一 key，store 去重）
    this.layout = null
    this.w = 0
    this.h = 0
    this.reduceMotion = false
  }

  build(w, h) {
    this.w = w
    this.h = h
    this.layout = layoutField(w, h)
    this.lens.r = this.layout.cell * 2.3
    this.longFrag = this.layout.fragments.reduce((a, b) =>
      b.text.length > (a ? a.text.length : 0) ? b : a,
      null
    )
    this.rewrite = null
    this.rewriteT = 9
    const prev = this.chars
    this.chars = []
    this.byKey = new Map()
    for (const frag of this.layout.fragments) {
      for (let i = 0; i < frag.text.length; i++) {
        const key = `${frag.fi}:${i}`
        const old = prev.find((c) => c.key === key)
        const ch = frag.text[i]
        const c = {
          key,
          ch,
          x: frag.px[i].x,
          y: frag.px[i].y,
          state: old ? old.state : BLANK,
          glyph: old ? old.glyph : ch,
          cycleMs: old ? old.cycleMs : 160 + this.rand() * 240,
          cycleT: old ? old.cycleT : 0,
          fails: old ? old.fails : 1 + Math.floor(this.rand() * 3),
          cyclesLeft: old ? old.cyclesLeft : 1 + Math.floor(this.rand() * 3),
          settleAcc: old ? old.settleAcc : 0,
          warmT: old ? old.warmT : 0,
          struckT: old ? old.struckT : 0,
        }
        if (c.state === SETTLED) c.glyph = ch
        this.chars.push(c)
        this.byKey.set(key, c)
      }
    }
    this.order = this.chars.map((c) => c.key)
    for (let i = this.order.length - 1; i > 0; i--) {
      const j = Math.floor(this.rand() * (i + 1))
      ;[this.order[i], this.order[j]] = [this.order[j], this.order[i]]
    }
    this.orderIdx = 0
  }

  setLensTarget(x, y) {
    if (this.lens.tx < -999) {
      this.lens.x = x
      this.lens.y = y
    }
    this.lens.tx = x
    this.lens.ty = y
    this.lens.ta = 1
    this.idleT = 0
  }
  lensLeave() {
    this.lens.ta = 0
  }

  settleChar(c, byAttention) {
    c.state = SETTLED
    c.glyph = c.ch
    c.warmT = 40 + this.rand() * 50
    c.settleAcc = 0
    c.by = byAttention ? 'attn' : 'ambient'
    this.revision++
    if (byAttention && this.onSettle) this.onSettle(c.key, c.ch)
  }

  activate(c) {
    if (c.state !== BLANK) return
    c.state = DRAFTING
    c.cyclesLeft = c.fails
    c.cycleT = 0
    c.settleAcc = 0
    c.glyph = '□'
    this.revision++
  }

  update(dt) {
    if (this.reduceMotion || !this.layout) return
    this.time += dt
    const s = Math.min(dt, 0.1)

    // 写作头：按乱序逐个点亮未定稿的字
    this.headT -= s
    if (this.headT <= 0) {
      let guard = this.order.length
      while (guard-- > 0) {
        const key = this.order[this.orderIdx % this.order.length]
        this.orderIdx++
        const c = this.byKey.get(key)
        if (c && (c.state === BLANK || c.state === SETTLED)) {
          if (c.state === SETTLED) {
            c.state = DRAFTING
            c.cyclesLeft = c.fails
            c.cycleT = 0
            c.glyph = '□'
            this.revision++
          } else {
            this.activate(c)
          }
          break
        }
      }
      this.headT = 0.1 + this.rand() * 0.22
    }

    const r = this.lens.r
    for (const c of this.chars) {
      if (c.state === DRAFTING) {
        c.cycleT += s * 1000
        if (c.cycleT >= c.cycleMs) {
          c.cycleT = 0
          this.revision++
          if (c.cyclesLeft > 0) {
            c.cyclesLeft--
            c.state = STRUCK
            c.struckT = 0.24
          } else if (this.rand() < 0.05) {
            this.settleChar(c, false)
          } else {
            const cands = candidatesFor(c.ch)
            c.glyph = cands[Math.floor(this.rand() * cands.length)]
          }
        }
        // 读光沉淀
        const dx = c.x - this.lens.x
        const dy = c.y - this.lens.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (this.lens.a > 0.2 && d < r) {
          c.settleAcc += s * (1.1 + 2.2 * (1 - d / r)) * this.lens.a
          if (c.settleAcc >= 1) this.settleChar(c, true)
        }
      } else if (c.state === STRUCK) {
        c.struckT -= s
        if (c.struckT <= 0) {
          const cands = candidatesFor(c.ch)
          c.glyph = cands[Math.floor(this.rand() * cands.length)]
          c.state = DRAFTING
          c.cycleT = 0
        }
      } else if (c.state === SETTLED) {
        c.warmT -= s
        if (c.warmT <= 0) {
          c.state = DRAFTING
          c.cyclesLeft = c.fails
          c.cycleT = 0
          c.glyph = '□'
        }
      }
    }

    // 整句重写：最长断句周期性被一整道朱线划掉、清格、重起——装置的长时序心跳
    this.idleT += s
    if (this.idleT > 3.5) this.lens.ta = 0
    if (this.rewrite && this.longFrag) {
      this.rewrite.t += s
      if (this.rewrite.t >= 0.9 + this.longFrag.text.length * 0.045) {
        const prefix = this.longFrag.fi + ':'
        for (const c of this.chars) {
          if (c.key.startsWith(prefix)) {
            c.state = BLANK
            c.glyph = c.ch
            c.settleAcc = 0
          }
        }
        this.revision += this.longFrag.text.length
        this.rewrite = null
        this.rewriteT = 14 + this.rand() * 8
      }
    } else {
      this.rewriteT -= s
      if (this.rewriteT <= 0 && this.longFrag) {
        this.rewrite = { t: 0 }
        this.revision++
      }
    }

    // 读光缓动
    const L = this.lens
    L.x += (L.tx - L.x) * Math.min(1, s * 9)
    L.y += (L.ty - L.y) * Math.min(1, s * 9)
    L.a += (L.ta - L.a) * Math.min(1, s * 4)
  }

  draw(ctx) {
    const { cell, ruleX } = this.layout
    ctx.clearRect(0, 0, this.w, this.h)
    ctx.save()
    if (this.exit > 0) {
      ctx.translate(0, -this.exit * 44)
      ctx.globalAlpha = Math.max(0, 1 - this.exit)
    }

    // 稿纸网格
    ctx.strokeStyle = 'rgba(107,97,83,0.16)'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = cell; x < this.w; x += cell) {
      ctx.moveTo(x + 0.5, 0)
      ctx.lineTo(x + 0.5, this.h)
    }
    for (let y = cell; y < this.h; y += cell) {
      ctx.moveTo(0, y + 0.5)
      ctx.lineTo(this.w, y + 0.5)
    }
    ctx.stroke()

    // 朱丝栏（与本页 DOM 朱丝栏同一公式，续接整卷）
    ctx.strokeStyle = 'rgba(179,64,42,0.55)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(ruleX + 0.5, 0)
    ctx.lineTo(ruleX + 0.5, this.h)
    ctx.stroke()

    // 读光：朱笔圈点（纸面微亮 + 朱圈）
    const L = this.lens
    if (L.a > 0.02) {
      const grad = ctx.createRadialGradient(L.x, L.y, 0, L.x, L.y, L.r)
      grad.addColorStop(0, `rgba(255,252,242,${0.5 * L.a})`)
      grad.addColorStop(1, 'rgba(255,252,242,0)')
      ctx.fillStyle = grad
      ctx.fillRect(L.x - L.r, L.y - L.r, L.r * 2, L.r * 2)
      const wob = Math.sin(this.time * 2.6) * 1.6
      ctx.strokeStyle = `rgba(179,64,42,${0.8 * L.a})`
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.arc(L.x, L.y, L.r * 0.62 + wob, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 文字：草稿=等宽石墨（工作之声），定稿=衬线墨色（定稿之声）
    for (const c of this.chars) {
      if (c.state === BLANK) continue
      const settled = c.state === SETTLED
      ctx.font = settled
        ? `${Math.round(cell * 0.62)}px ${SERIF_STACK}`
        : `${Math.round(cell * 0.56)}px ${WORK_STACK}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = settled ? '#262016' : c.glyph === '□' ? '#a89c85' : '#6b6153'
      const jitter = settled ? 0 : Math.sin(this.time * 7 + c.x) * 0.7
      ctx.fillText(c.glyph, c.x + jitter, c.y + 1)

      if (c.state === STRUCK) {
        const p = 1 - c.struckT / 0.24
        ctx.strokeStyle = '#b3402a'
        ctx.lineWidth = 1.8
        ctx.beginPath()
        ctx.moveTo(c.x - cell * 0.36, c.y)
        ctx.lineTo(c.x - cell * 0.36 + cell * 0.72 * p, c.y - cell * 0.06)
        ctx.stroke()
      }
      if (settled && c.by === 'attn') {
        ctx.fillStyle = 'rgba(179,64,42,0.8)'
        ctx.beginPath()
        ctx.arc(c.x + cell * 0.34, c.y - cell * 0.34, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    // 整句重写的长朱线
    if (this.rewrite && this.longFrag) {
      const p = Math.min(1, this.rewrite.t / 0.9)
      const f = this.longFrag
      const x0 = f.x + cell * 0.14
      const x1 = f.x + f.text.length * cell - cell * 0.14
      const y = f.y + cell / 2
      ctx.strokeStyle = '#b3402a'
      ctx.lineWidth = 2.2
      ctx.beginPath()
      ctx.moveTo(x0, y - cell * 0.05)
      ctx.lineTo(x0 + (x1 - x0) * p, y + cell * 0.04)
      ctx.stroke()
    }
    ctx.restore()
  }

  drawStatic(ctx) {
    // reduced-motion：整场以定稿态呈现，无读光、无循环
    const { cell, ruleX } = this.layout
    ctx.clearRect(0, 0, this.w, this.h)
    ctx.strokeStyle = 'rgba(107,97,83,0.16)'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = cell; x < this.w; x += cell) {
      ctx.moveTo(x + 0.5, 0)
      ctx.lineTo(x + 0.5, this.h)
    }
    for (let y = cell; y < this.h; y += cell) {
      ctx.moveTo(0, y + 0.5)
      ctx.lineTo(this.w, y + 0.5)
    }
    ctx.stroke()
    ctx.strokeStyle = 'rgba(179,64,42,0.55)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(ruleX + 0.5, 0)
    ctx.lineTo(ruleX + 0.5, this.h)
    ctx.stroke()
    ctx.font = `${Math.round(cell * 0.62)}px ${SERIF_STACK}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#262016'
    for (const c of this.chars) ctx.fillText(c.ch, c.x, c.y + 1)
  }
}
