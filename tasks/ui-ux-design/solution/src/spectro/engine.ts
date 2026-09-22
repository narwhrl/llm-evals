/**
 * 分光仪 Canvas 引擎。
 * 状态由三个输入连续驱动：滚动进度、指针、暗线显影；点燃为载入时序。
 * 仅在状态变化时重绘（dirty 检查），reduced-motion 下冻结时序与弹性。
 */

export interface EngineInput {
  progress: number
  pointerX: number
  pointerY: number
  dark: number
  reduced: boolean
  mobile: boolean
}

export interface FrameInfo {
  thetaDeg: number
  dispersion: number
}

const INK = 'rgba(22, 21, 15,'
const SPECTRUM = [
  '#C4442C',
  '#CC7A2B',
  '#C2A32C',
  '#3E8A5F',
  '#3B6FA8',
  '#5B4A9E',
]

const PRINCIPAL = [
  { t: 0.1, color: '#C4442C', lambda: 'λ 660' },
  { t: 0.5, color: '#2F7D5B', lambda: 'λ 525' },
  { t: 0.9, color: '#5B4A9E', lambda: 'λ 430' },
]

const DARK_LINES = [
  { t: 0.16, id: 'H-β' },
  { t: 0.34, id: 'Na-D' },
  { t: 0.52, id: 'Mg-b' },
  { t: 0.7, id: 'Ca-K' },
  { t: 0.86, id: 'Fe-F' },
]

const MONO =
  'ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, "Liberation Mono", monospace'

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

function smoothstep(a: number, b: number, x: number): number {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

function easeOutCubic(t: number): number {
  const u = 1 - clamp01(t)
  return 1 - u * u * u
}

function easeInOutCubic(t: number): number {
  const u = clamp01(t)
  return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2
}

/** 射线与扩展视口矩形的交点距离。 */
function rayLength(
  ox: number,
  oy: number,
  ang: number,
  w: number,
  h: number,
  pad: number,
): number {
  const dx = Math.cos(ang)
  const dy = Math.sin(ang)
  let t = Infinity
  if (dx > 1e-6) t = Math.min(t, (w + pad - ox) / dx)
  if (dx < -1e-6) t = Math.min(t, (-pad - ox) / dx)
  if (dy > 1e-6) t = Math.min(t, (h + pad - oy) / dy)
  if (dy < -1e-6) t = Math.min(t, (-pad - oy) / dy)
  return Number.isFinite(t) ? t : Math.hypot(w, h)
}

export class SpectroscopeEngine {
  private ctx: CanvasRenderingContext2D
  private w = 0
  private h = 0
  private dpr = 1
  private raf = 0
  private startTs = 0
  private lastTs = 0
  private running = false

  private input: EngineInput = {
    progress: 0,
    pointerX: 0.5,
    pointerY: 0.5,
    dark: 0,
    reduced: false,
    mobile: false,
  }

  /** 平滑后的指针（0..1）与暗线（0..1）。 */
  private sx = 0.5
  private sy = 0.5
  private sd = 0
  private igniteBeam = 0
  private igniteSplit = 0

  private dirty = true
  private lastKey = ''

  onFrame: ((info: FrameInfo) => void) | null = null

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) throw new Error('Canvas 2D context unavailable')
    this.ctx = ctx
  }

  start(): void {
    if (this.running) return
    this.running = true
    this.startTs = performance.now()
    this.lastTs = this.startTs
    this.dirty = true
    const loop = (ts: number) => {
      if (!this.running) return
      const dt = Math.min(0.05, (ts - this.lastTs) / 1000)
      this.lastTs = ts
      this.tick(ts, dt)
      this.raf = requestAnimationFrame(loop)
    }
    this.raf = requestAnimationFrame(loop)
  }

  stop(): void {
    this.running = false
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
  }

  setInput(next: Partial<EngineInput>): void {
    const merged = { ...this.input, ...next }
    const mobileChanged = merged.mobile !== this.input.mobile
    const reducedChanged = merged.reduced !== this.input.reduced
    this.input = merged
    if (mobileChanged || reducedChanged) {
      this.resize()
      if (reducedChanged && next.reduced) {
        this.igniteBeam = 1
        this.igniteSplit = 1
      }
    }
    this.dirty = true
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width))
    const h = Math.max(1, Math.round(rect.height))
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    if (w === this.w && h === this.h && dpr === this.dpr) return
    this.w = w
    this.h = h
    this.dpr = dpr
    this.canvas.width = Math.round(w * dpr)
    this.canvas.height = Math.round(h * dpr)
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.dirty = true
  }

  private tick(now: number, dt: number): void {
    const { reduced } = this.input

    if (!reduced && this.startTs) {
      const t = (now - this.startTs) / 1000
      this.igniteBeam = easeOutCubic((t - 0.05) / 0.8)
      this.igniteSplit = easeInOutCubic((t - 0.55) / 0.95)
    } else if (reduced) {
      this.igniteBeam = 1
      this.igniteSplit = 1
    }

    const kPtr = reduced ? 1 : 1 - Math.exp(-dt * 7)
    const kDark = reduced ? 1 : 1 - Math.exp(-dt * 4.5)
    const prevSx = this.sx
    const prevSy = this.sy
    const prevSd = this.sd
    this.sx += (this.input.pointerX - this.sx) * kPtr
    this.sy += (this.input.pointerY - this.sy) * kPtr
    this.sd += (this.input.dark - this.sd) * kDark

    const moving =
      Math.abs(this.sx - prevSx) > 1e-4 ||
      Math.abs(this.sy - prevSy) > 1e-4 ||
      Math.abs(this.sd - prevSd) > 1e-4
    if (moving) this.dirty = true
    if (this.igniteBeam < 1 || this.igniteSplit < 1) this.dirty = true

    const key = [
      Math.round(this.input.progress * 2000),
      Math.round(this.sx * 500),
      Math.round(this.sy * 500),
      Math.round(this.sd * 200),
      this.w,
      this.h,
      this.input.reduced ? 1 : 0,
      this.input.mobile ? 1 : 0,
      Math.round(this.igniteBeam * 100),
      Math.round(this.igniteSplit * 100),
    ].join('|')
    if (!this.dirty && key === this.lastKey) return
    this.lastKey = key
    this.dirty = false
    this.draw()
  }

  private geometry() {
    const { progress, mobile } = this.input
    const w = this.w
    const h = this.h
    const drift = easeInOutCubic(progress)
    const conv = smoothstep(0.84, 0.97, progress)

    // 仪器走廊：装置常驻视口上部；文本区在下方版式中保证不与墨线相交
    const cx = w * (mobile ? 0.5 : 0.66 - 0.16 * drift + 0.1 * conv)
    const cy = h * (mobile ? 0.16 + 0.03 * drift - 0.06 * conv : 0.27 + 0.03 * drift - 0.12 * conv)
    const sideBase = mobile ? Math.min(w * 0.3, h * 0.15) : Math.min(w * 0.185, h * 0.28)
    const side = sideBase * (1 - (mobile ? 0.2 : 0.3) * conv)
    const rot = -0.06 + 0.35 * drift + (this.sx - 0.5) * 0.06

    // 首屏保留基线色散（点燃后即有一缕预拆开的光谱），滚动展开，页尾收拢
    const open = 0.1 + 0.9 * smoothstep(0.03, 0.2, progress)
    const spreadMax = mobile ? 0.55 : 0.62
    const pointerSpread = 0.55 + 0.9 * this.sx
    const dispersion = this.igniteSplit * open
    const spread = spreadMax * dispersion * pointerSpread * (1 - conv)

    // 教科书式棱镜：左顶点入射、右侧面中点出射
    const r = side * 0.62
    const pts: Array<[number, number]> = [180, 60, -60].map((deg) => {
      const a = (deg * Math.PI) / 180 + rot
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as [number, number]
    })
    const entry: [number, number] = pts[0]
    const exit: [number, number] = [(pts[1][0] + pts[2][0]) / 2, (pts[1][1] + pts[2][1]) / 2]

    // 入射光束锚定在顶栏下方的固定条带内
    const yIn = h * (mobile ? 0.1 + 0.08 * this.sy : 0.13 + 0.09 * this.sy)

    const baseRaw = 0.1 + (this.sx - 0.5) * 0.25
    const baseAng = baseRaw * (1 - conv) + 0.02 * conv

    return {
      cx,
      cy,
      side,
      rot,
      pts,
      entry,
      exit,
      yIn,
      baseAng,
      spread,
      conv,
      open,
      dispersion,
    }
  }

  private draw(): void {
    const ctx = this.ctx
    const w = this.w
    const h = this.h
    if (!w || !h) return
    const g = this.geometry()
    const { mobile, reduced } = this.input
    const beamAlpha = 0.85

    ctx.clearRect(0, 0, w, h)

    // —— 出射软光谱扇面 ——
    const fanAlpha = (mobile ? 0.2 : 0.32) * g.dispersion * this.igniteSplit
    if (fanAlpha > 0.01 && g.spread > 0.002) {
      const N = 18
      const lens: number[] = []
      const angs: number[] = []
      for (let i = 0; i < N; i++) {
        const f = i / (N - 1)
        const ang = g.baseAng + (f - 0.5) * g.spread
        angs.push(ang)
        lens.push(rayLength(g.exit[0], g.exit[1], ang, w, h, 40))
      }
      // 填充多边形
      const grad = ctx.createLinearGradient(
        g.exit[0],
        g.exit[1] + Math.sin(g.baseAng - g.spread / 2) * 10,
        g.exit[0] + Math.cos(g.baseAng + g.spread / 2) * 400,
        g.exit[1] + Math.sin(g.baseAng + g.spread / 2) * 400,
      )
      SPECTRUM.forEach((c, i) => grad.addColorStop(i / (SPECTRUM.length - 1), c))
      ctx.save()
      ctx.globalAlpha = fanAlpha
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(g.exit[0], g.exit[1])
      for (let i = 0; i < N; i++) {
        ctx.lineTo(
          g.exit[0] + Math.cos(angs[i]) * lens[i],
          g.exit[1] + Math.sin(angs[i]) * lens[i],
        )
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // —— 三条主谱线 ——
    const rayAlpha = this.igniteSplit
    if (rayAlpha > 0.01 && g.dispersion > 0.01) {
      for (const p of PRINCIPAL) {
        const ang = g.baseAng + (p.t - 0.5) * g.spread
        const len = rayLength(g.exit[0], g.exit[1], ang, w, h, 40)
        const ex = g.exit[0] + Math.cos(ang) * len
        const ey = g.exit[1] + Math.sin(ang) * len
        ctx.save()
        ctx.globalAlpha = 0.9 * rayAlpha * (1 - g.conv * 0.55)
        ctx.strokeStyle = p.color
        ctx.lineWidth = mobile ? 2 : 2.5
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(g.exit[0], g.exit[1])
        ctx.lineTo(ex, ey)
        ctx.stroke()
        // λ 标签（桌面端；移动端由 DOM 承担波长信息）
        if (!mobile) {
          const at = 0.78
          const lx = g.exit[0] + Math.cos(ang) * len * at
          const ly = g.exit[1] + Math.sin(ang) * len * at
          ctx.globalAlpha = 0.75 * rayAlpha * (1 - g.conv)
          ctx.fillStyle = p.color
          ctx.font = `600 11px ${MONO}`
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(p.lambda, lx + 6, ly - 8)
        }
        ctx.restore()
      }
    }

    // —— 暗线（吸收线）显影 ——
    if (this.sd > 0.02 && g.dispersion > 0.05) {
      ctx.save()
      ctx.font = `600 11px ${MONO}`
      ctx.textBaseline = 'middle'
      for (let i = 0; i < DARK_LINES.length; i++) {
        const line = DARK_LINES[i]
        const reveal = clamp01((this.sd - i * 0.1) / 0.35)
        if (reveal < 0.02) continue
        const ang = g.baseAng + (line.t - 0.5) * g.spread
        const len = rayLength(g.exit[0], g.exit[1], ang, w, h, 40) * 0.58
        const px = g.exit[0] + Math.cos(ang) * len
        const py = g.exit[1] + Math.sin(ang) * len
        const perp = ang + Math.PI / 2
        const tick = mobile ? 14 : 20
        ctx.globalAlpha = 0.85 * reveal * (1 - g.conv * 0.6)
        ctx.strokeStyle = INK + '0.9)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(px - Math.cos(perp) * tick, py - Math.sin(perp) * tick)
        ctx.lineTo(px + Math.cos(perp) * tick, py + Math.sin(perp) * tick)
        ctx.stroke()
        if (reveal > 0.55 && !mobile) {
          ctx.globalAlpha = reveal * (1 - g.conv * 0.6)
          ctx.fillStyle = INK + '0.92)'
          ctx.textAlign = ang > 0.3 ? 'right' : 'left'
          const ox = ang > 0.3 ? -10 : 10
          ctx.fillText(line.id, px + ox, py + tick + 12)
        }
      }
      ctx.restore()
    }

    // —— 入射光束（墨线，按点燃伸长） ——
    const beamLen = this.igniteBeam
    if (beamLen > 0.01) {
      const bx = g.entry[0]
      const by = g.yIn
      const tx = g.entry[0]
      const ty = g.entry[1]
      const ex = bx + (tx - bx) * beamLen
      const ey = by + (ty - by) * beamLen
      ctx.save()
      ctx.strokeStyle = INK + `${beamAlpha})`
      ctx.lineWidth = mobile ? 1.5 : 2
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(0, by)
      ctx.lineTo(ex, ey)
      ctx.stroke()
      // 光束上的行进刻度（速度感）
      const beamTotal = Math.hypot(tx - bx, ty - by) * beamLen
      if (beamTotal > 60 && !reduced) {
        const flow = ((performance.now() / 24) % 90) / 90
        ctx.globalAlpha = 0.35
        ctx.fillStyle = INK + '0.5)'
        for (let k = 1; k <= 4; k++) {
          const f = ((flow + k * 0.25) % 1) * 0.92
          if (f > beamLen) continue
          const px = 0 + (tx - 0) * f
          const py = by + (ty - by) * f
          ctx.beginPath()
          ctx.arc(px, py, 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.restore()
    }

    // —— 棱镜 ——
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(g.pts[0][0], g.pts[0][1])
    ctx.lineTo(g.pts[1][0], g.pts[1][1])
    ctx.lineTo(g.pts[2][0], g.pts[2][1])
    ctx.closePath()
    ctx.fillStyle = 'rgba(255, 253, 247, 0.5)'
    ctx.fill()
    ctx.strokeStyle = INK + '0.85)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    // 出射点小十字
    ctx.globalAlpha = 0.5
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(g.exit[0] - 5, g.exit[1])
    ctx.lineTo(g.exit[0] + 5, g.exit[1])
    ctx.moveTo(g.exit[0], g.exit[1] - 5)
    ctx.lineTo(g.exit[0], g.exit[1] + 5)
    ctx.stroke()
    // 棱镜标签（收束阶段淡出）
    if (!mobile) {
      ctx.globalAlpha = 0.45 * (1 - g.conv * 0.85)
      ctx.fillStyle = INK + '0.8)'
      ctx.font = `11px ${MONO}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText('PRISM · 手艺', g.cx, g.cy + g.side * 0.72)
    }
    ctx.restore()

    if (this.onFrame) {
      this.onFrame({
        thetaDeg: Math.abs(Math.atan2(g.yIn - g.entry[1], g.entry[0] || 1)) *
          (180 / Math.PI),
        dispersion: Math.round(g.dispersion * (1 - g.conv) * 100),
      })
    }
  }
}

