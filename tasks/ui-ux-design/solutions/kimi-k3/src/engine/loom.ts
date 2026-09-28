import { ClothRenderer, type RowRecord } from './cloth'
import { PALETTE, WEFT_HEX, type WeftColor } from './palette'
import { clamp, easeInOut, lerp, mulberry32 } from './rng'
import { THREAD_WORDS } from './words'

export const THINK_ROWS = 24
export const CREATE_ROWS = 26
export const COLLAB_ROWS = 26

const POINTS = 7 // 每根经线的质点数
const PLANNED_ROWS = THINK_ROWS + CREATE_ROWS + COLLAB_ROWS + 7

export interface PluckEvent {
  x: number
  y: number
  word: string
  broken: boolean
}

export interface LoomEvents {
  onPluck?: (e: PluckEvent) => void
  onBrokenThread?: () => void
  onCombed?: () => void
  onTangleChange?: (amount: number) => void
  onUserRows?: (n: number) => void
  onWarpDone?: () => void
  onSettled?: () => void
}

interface ThreadPoint {
  x: number
  y: number
  px: number
  py: number
}

interface WarpThread {
  restX: number
  points: ThreadPoint[]
  tensionAt: number
  tensioned: boolean
  waved: boolean
  slackSeed: number
  word: string
  isBroken: boolean
  glow: number
  lastPluck: number
  tangleOffsets: Float32Array
  cut: boolean
  cutAt: number
  fade: number
}

interface Fringe {
  x: number
  len: number
  phase: number
  sway: number
  swayV: number
}

type Phase = 'warping' | 'loom' | 'settled'

export class LoomEngine {
  private events: LoomEvents
  private reducedMotion = false

  private W = 0
  private H = 0
  private mobile = false
  private threadCount = 92
  private loomLeft = 0
  private loomW = 0
  private spacing = 12
  private beamY = 0
  private clothTop = 0
  private warpBottom = 0
  private rowH = 4

  private threads: WarpThread[] = []
  private cloth = new ClothRenderer()
  private rowRecords: RowRecord[] = []
  private wovenRows = 0
  private rowQueue: RowRecord[] = []
  private chapterTargets: Record<'think' | 'create' | 'collab', number> = {
    think: 0,
    create: 0,
    collab: 0,
  }

  private phase: Phase = 'warping'
  private time = 0
  private warpT = -0.4
  private warpingDone = false
  private waveT = -1

  private shuttle = { active: false, dir: 1, t: 0, dur: 0.36, fromX: 0, toX: 0, y: 0, color: PALETTE.indigo as string }
  private beatPulse = 0
  private beatCool = 0

  private tangleAmount = 0
  private tangleTarget = 0
  private tangleActive = false
  private combProgress = 0
  private combed = false
  private lastTangleEmitted = 0

  private finaleEnabled = false
  private finaleColor: WeftColor = 'indigo'
  private lastFling = -9
  private userRows = 0
  private pendingSettle = false
  private settleTimer = -1

  private settleT = 0
  private settledAnnounced = false
  private swing = { ang: 0, vel: 0 }
  private fringe: Fringe[] = []

  private brokenIndex = -1
  private pluckCursor = 0
  private pointer = { down: false, x: 0, y: 0, onCloth: false }

  constructor(events: LoomEvents = {}) {
    this.events = events
  }

  // ---------- 几何与构建 ----------

  resize(w: number, h: number, dpr: number, mobile: boolean) {
    this.W = w
    this.H = h
    this.mobile = mobile
    this.threadCount = mobile ? 48 : 92
    this.loomW = Math.min(w * (mobile ? 0.92 : 0.86), 1150)
    this.loomLeft = (w - this.loomW) / 2
    this.spacing = this.loomW / (this.threadCount - 1)
    this.beamY = h * 0.07
    this.clothTop = this.beamY + 12
    this.warpBottom = h * 0.94
    const clothMax = h * 0.46
    this.rowH = clamp(clothMax / PLANNED_ROWS, 2.2, 4)
    this.cloth.resize(this.loomW, this.rowH, this.threadCount - 1, this.spacing, dpr)
    // 重织已有的布（resize 不丢状态）
    const saved = this.rowRecords.slice(0, this.wovenRows)
    this.wovenRows = 0
    for (const rec of saved) this.commitRow(rec)
    this.buildThreads()
    if (this.phase === 'settled') this.buildFringe()
  }

  private buildThreads() {
    const rng = mulberry32(1138)
    const n = this.threadCount
    const center = (n - 1) / 2
    const order: number[] = Array.from({ length: n }, (_, i) => i)
    order.sort((a, b) => Math.abs(a - center) - Math.abs(b - center) || a - b)
    const tensionAt = new Array<number>(n)
    order.forEach((threadIdx, orderIdx) => {
      // 织工上经的拍号：六根一组，组间有一顿
      tensionAt[threadIdx] = orderIdx * 0.03 + Math.floor(orderIdx / 6) * 0.24 + rng() * 0.04
    })
    this.brokenIndex = Math.floor(n * (0.58 + rng() * 0.2))

    // 缠结形状：成对交叉 + 二阶摆动 + 抖动 —— 要乱得像真的打了结
    const allOffsets: Float32Array[] = new Array(n)
    const done = new Array<boolean>(n).fill(false)
    const bellAt = (j: number) => Math.sin((Math.PI * j) / (POINTS - 1))
    const wigAt = (j: number, phase: number) => Math.sin((2 * Math.PI * j) / (POINTS - 1) + phase)
    for (let i = 0; i < n; i++) {
      if (done[i]) continue
      if (i + 1 < n && rng() < 0.55) {
        const amp = this.spacing * (3 + rng() * 4.5)
        const sign = rng() < 0.5 ? 1 : -1
        const phase = rng() * Math.PI * 2
        for (const [idx, s] of [[i, sign], [i + 1, -sign]] as const) {
          const arr = new Float32Array(POINTS)
          for (let j = 0; j < POINTS; j++) {
            arr[j] =
              bellAt(j) * amp * s +
              wigAt(j, phase + idx) * amp * 0.35 +
              (rng() - 0.5) * this.spacing * 0.8 * bellAt(j)
          }
          allOffsets[idx] = arr
          done[idx] = true
        }
      } else {
        const amp = this.spacing * (0.9 + rng() * 2)
        const sign = rng() < 0.5 ? 1 : -1
        const phase = rng() * Math.PI * 2
        const arr = new Float32Array(POINTS)
        for (let j = 0; j < POINTS; j++) {
          arr[j] = bellAt(j) * amp * sign + wigAt(j, phase) * amp * 0.5 + (rng() - 0.5) * this.spacing * 0.5 * bellAt(j)
        }
        allOffsets[i] = arr
        done[i] = true
      }
    }

    this.threads = order.map((i) => i).map((i) => {
      const restX = this.loomLeft + i * this.spacing
      const thread: WarpThread = {
        restX,
        points: [],
        tensionAt: tensionAt[i],
        tensioned: false,
        waved: false,
        slackSeed: rng() * Math.PI * 2,
        word: THREAD_WORDS[Math.floor(rng() * THREAD_WORDS.length)],
        isBroken: i === this.brokenIndex,
        glow: 0,
        lastPluck: -9,
        tangleOffsets: allOffsets[i],
        cut: false,
        cutAt: 0,
        fade: 1,
      }
      thread.points = this.freshPoints(restX)
      return thread
    })
    if (this.reducedMotion) {
      for (const t of this.threads) t.tensioned = true
      this.warpingDone = true
    }
  }

  private freshPoints(restX: number): ThreadPoint[] {
    const pts: ThreadPoint[] = []
    const top = this.fellY()
    const seg = (this.warpBottom - top) / (POINTS - 1)
    for (let j = 0; j < POINTS; j++) {
      const y = top + seg * j
      pts.push({ x: restX, y, px: restX, py: y })
    }
    return pts
  }

  private fellY(): number {
    return this.clothTop + this.wovenRows * this.rowH
  }

  /** 乱线蔓延前沿：0=该质点未被卷入，1=完全卷入 */
  private tangleFront(j: number): number {
    const depth01 = j / (POINTS - 1)
    return clamp((depth01 - (1 - this.tangleAmount)) / 0.18, 0, 1)
  }

  // ---------- 外部驱动 ----------

  setReducedMotion(v: boolean) {
    this.reducedMotion = v
    if (!v) return
    for (const t of this.threads) t.tensioned = true
    if (!this.warpingDone) {
      this.warpingDone = true
      this.events.onWarpDone?.()
    }
    this.flushQueueInstant()
    if (this.phase === 'settled') {
      for (const t of this.threads) t.fade = 0
      this.swing.ang = 0
      this.swing.vel = 0
    }
  }

  /** 章节目标行数：只增不减 —— 织进去的线不可撤回 */
  setChapterRows(chapter: 'think' | 'create' | 'collab', rows: number) {
    const max = chapter === 'think' ? THINK_ROWS : chapter === 'create' ? CREATE_ROWS : COLLAB_ROWS
    const target = clamp(rows, 0, max)
    if (target <= this.chapterTargets[chapter]) return
    this.chapterTargets[chapter] = target
    this.syncChapterQueue()
  }

  private syncChapterQueue() {
    const want: RowRecord[] = []
    for (let i = 0; i < this.chapterTargets.think; i++) want.push({ chapter: 'think' })
    for (let i = 0; i < this.chapterTargets.create; i++) want.push({ chapter: 'create' })
    for (let i = 0; i < this.chapterTargets.collab; i++) want.push({ chapter: 'collab' })
    const chapterRowsSoFar = this.rowRecords.filter((r) => r.chapter !== 'finale').length
    const queuedChapterRows = this.rowQueue.filter((r) => r.chapter !== 'finale').length
    const have = chapterRowsSoFar + queuedChapterRows
    const missing = want.slice(have)
    if (missing.length === 0) return
    if (this.reducedMotion) {
      for (const rec of missing) this.commitRow(rec)
      return
    }
    this.rowQueue.push(...missing)
  }

  setTangleActive(active: boolean) {
    this.tangleActive = active
    if (active && !this.combed && this.combProgress < 1) {
      this.tangleTarget = 1 - this.combProgress
    }
  }

  combButton() {
    if (this.combed) return
    this.combProgress = clamp(this.combProgress + 0.3, 0, 1)
    this.tangleTarget = 1 - this.combProgress
  }

  setFinaleEnabled(v: boolean) {
    this.finaleEnabled = v
  }

  setFinaleColor(c: WeftColor) {
    this.finaleColor = c
  }

  /** 终章：用户投梭。返回是否成功织入 */
  throwShuttle(color: WeftColor): boolean {
    if (!this.finaleEnabled || this.userRows >= 3 || this.phase === 'settled') return false
    this.userRows++
    const rows: RowRecord[] = [
      { chapter: 'finale', solidColor: WEFT_HEX[color] },
      { chapter: 'finale', solidColor: WEFT_HEX[color] },
    ]
    if (this.userRows === 3) {
      rows.push({ chapter: 'finale', solidColor: PALETTE.gold, halfHeight: true })
      this.pendingSettle = true
    }
    if (this.reducedMotion) {
      for (const rec of rows) this.commitRow(rec)
    } else {
      this.rowQueue.push(...rows)
    }
    this.events.onUserRows?.(this.userRows)
    return true
  }

  /** 键盘路径：从左到右依次拨下一根经线 */
  pluckNext() {
    if (this.phase === 'settled') return
    const t = this.threads[this.pluckCursor % this.threads.length]
    this.pluckCursor++
    this.pluckThread(t, 16)
  }

  private pluckThread(t: WarpThread, strength: number) {
    if (!t.tensioned || t.cut) return
    const dir = Math.random() < 0.5 ? 1 : -1
    for (let j = 1; j < POINTS; j++) {
      const bell = Math.sin((Math.PI * j) / (POINTS - 1))
      t.points[j].px -= dir * strength * bell
    }
    t.glow = 1
    const mid = t.points[Math.floor(POINTS / 2)]
    this.events.onPluck?.({ x: mid.x, y: mid.y, word: t.word, broken: t.isBroken })
    if (t.isBroken) this.events.onBrokenThread?.()
  }

  // ---------- 指针交互 ----------

  pointerDown(x: number, y: number) {
    this.pointer.down = true
    this.pointer.x = x
    this.pointer.y = y
    this.pointer.onCloth =
      this.phase === 'settled' &&
      y > this.clothTop - 10 &&
      y < this.fellY() + 30 &&
      x > this.loomLeft - 20 &&
      x < this.loomLeft + this.loomW + 20
  }

  pointerMove(x: number, y: number) {
    if (this.reducedMotion || this.pointer.down || this.phase === 'settled') return
    if (y < this.fellY()) return
    // 悬停：经线轻轻让开一口气
    for (const t of this.threads) {
      if (!t.tensioned || t.cut) continue
      const d = t.restX - x
      if (Math.abs(d) > 30) continue
      const push = (d > 0 ? 1 : -1) * (1 - Math.abs(d) / 30) * 0.5
      for (let j = 1; j < POINTS - 1; j++) t.points[j].px -= push
    }
  }

  pointerDrag(x: number, y: number, vx: number) {
    if (!this.pointer.down) return
    const lastX = this.pointer.x
    this.pointer.x = x
    this.pointer.y = y

    if (this.pointer.onCloth) {
      this.swing.vel += vx * 0.00004
      return
    }
    // 终章：在织口附近用力横甩 = 投出当前选中的纬线
    if (
      this.finaleEnabled &&
      this.phase !== 'settled' &&
      Math.abs(y - this.fellY()) < 46 &&
      Math.abs(vx) > 55
    ) {
      if (this.time - this.lastFling > 0.9) {
        this.lastFling = this.time
        this.throwShuttle(this.finaleColor)
      }
      return
    }
    if (y < this.fellY() || this.phase === 'settled') return

    if (this.tangleActive && this.tangleAmount > 0.04 && !this.combed) {
      // 梳理：抚平 + 计数
      this.combProgress = clamp(this.combProgress + Math.abs(vx) * 0.0011 + 0.002, 0, 1)
      this.tangleTarget = 1 - this.combProgress
      for (const t of this.threads) {
        if (Math.abs(t.restX - x) > 90) continue
        for (let j = 1; j < POINTS; j++) {
          const p = t.points[j]
          p.px += (p.x - t.restX) * 0.03
        }
      }
      return
    }
    if (this.reducedMotion) return
    // 拨弦：扫过的经线被拨响
    const lo = Math.min(lastX, x)
    const hi = Math.max(lastX, x)
    for (const t of this.threads) {
      if (!t.tensioned || t.cut) continue
      const px = t.points[Math.floor(POINTS / 2)].x
      if (px < lo || px > hi) continue
      if (this.time - t.lastPluck < 0.45) continue
      t.lastPluck = this.time
      const strength = clamp(vx * 0.5, -22, 22) || 10
      for (let j = 1; j < POINTS; j++) {
        const bell = Math.sin((Math.PI * j) / (POINTS - 1))
        t.points[j].px -= strength * bell
      }
      t.glow = 1
      const mid = t.points[Math.floor(POINTS / 2)]
      this.events.onPluck?.({ x: mid.x, y: mid.y, word: t.word, broken: t.isBroken })
      if (t.isBroken) this.events.onBrokenThread?.()
    }
  }

  pointerUp() {
    this.pointer.down = false
    this.pointer.onCloth = false
  }

  // ---------- 织造 ----------

  private commitRow(rec: RowRecord) {
    this.cloth.addRow(this.wovenRows, rec)
    this.rowRecords.push(rec)
    this.wovenRows++
    this.beatPulse = 1
  }

  private flushQueueInstant() {
    while (this.rowQueue.length > 0) {
      const rec = this.rowQueue.shift()!
      this.commitRow(rec)
    }
    this.shuttle.active = false
  }

  private startSettle() {
    this.phase = 'settled'
    this.settleT = 0
    const n = this.threads.length
    for (let i = 0; i < n; i++) {
      const t = this.threads[i]
      t.cutAt = (Math.min(i, n - 1 - i) / (n / 2)) * 0.55
    }
    this.swing.vel += this.reducedMotion ? 0 : 0.55
    this.buildFringe()
  }

  private buildFringe() {
    const rng = mulberry32(521)
    this.fringe = []
    const every = this.mobile ? 3 : 5
    for (let g = 0; g < this.threadCount - 1; g += every) {
      this.fringe.push({
        x: g * this.spacing + this.spacing * 0.5,
        len: 20 + rng() * 16,
        phase: rng() * Math.PI * 2,
        sway: 0,
        swayV: 0,
      })
    }
  }

  // ---------- 主循环 ----------

  tick(dtRaw: number) {
    const dt = clamp(dtRaw, 0.001, 0.05)
    this.time += dt

    // 上经
    if (!this.warpingDone && !this.reducedMotion) {
      this.warpT += dt
      let all = true
      for (const t of this.threads) {
        if (!t.tensioned) {
          if (this.warpT >= t.tensionAt) {
            t.tensioned = true
            const dir = t.slackSeed > Math.PI ? 1 : -1
            for (let j = 1; j < POINTS; j++) {
              t.points[j].px = t.points[j].x + dir * 12 * Math.sin((Math.PI * j) / (POINTS - 1))
            }
          } else {
            all = false
          }
        }
      }
      if (all) {
        this.warpingDone = true
        if (this.phase === 'warping') this.phase = 'loom'
        this.waveT = 0 // 上经句号：一道缓波掠过全部经线
        this.events.onWarpDone?.()
      }
    }

    // 一线波：像织工上经后最后一次通查
    if (this.waveT >= 0) {
      this.waveT += dt
      const frontier = this.loomLeft + this.waveT * 850
      for (const t of this.threads) {
        if (t.waved || t.restX > frontier) continue
        t.waved = true
        for (let j = 1; j < POINTS; j++) {
          t.points[j].px -= 5 * Math.sin((Math.PI * j) / (POINTS - 1))
        }
        t.glow = Math.max(t.glow, 0.4)
      }
      if (frontier > this.loomLeft + this.loomW + 140) this.waveT = -1
    }

    // 缠结程度趋近目标
    const tRate = this.reducedMotion ? 20 : 1.6
    this.tangleAmount = lerp(this.tangleAmount, this.tangleTarget, clamp(tRate * dt, 0, 1))
    if (Math.abs(this.tangleAmount - this.lastTangleEmitted) > 0.02) {
      this.lastTangleEmitted = this.tangleAmount
      this.events.onTangleChange?.(this.tangleAmount)
    }
    if (!this.combed && this.tangleAmount < 0.12 && this.combProgress > 0.2) {
      this.combed = true
      this.events.onCombed?.()
    }

    // 梭子与打纬
    this.beatPulse = Math.max(0, this.beatPulse - dt * 3.2)
    this.beatCool -= dt
    if (!this.reducedMotion && this.warpingDone) {
      if (this.shuttle.active) {
        this.shuttle.t += dt / this.shuttle.dur
        if (this.shuttle.t >= 1) {
          this.shuttle.active = false
          const rec = this.rowQueue.shift()
          if (rec) this.commitRow(rec)
          this.beatCool = this.rowQueue.length > 5 ? 0.1 : 0.22
        }
      } else if (this.rowQueue.length > 0 && this.beatCool <= 0 && this.tangleAmount < 0.9) {
        const rec = this.rowQueue[0]
        this.shuttle.active = true
        this.shuttle.dir *= -1
        this.shuttle.t = 0
        this.shuttle.dur = this.rowQueue.length > 5 ? 0.18 : 0.34
        const pad = this.mobile ? 26 : 44
        this.shuttle.fromX = this.shuttle.dir > 0 ? this.loomLeft - pad : this.loomLeft + this.loomW + pad
        this.shuttle.toX = this.shuttle.dir > 0 ? this.loomLeft + this.loomW + pad : this.loomLeft - pad
        this.shuttle.y = this.fellY() + this.rowH * 0.5
        this.shuttle.color = rec.solidColor ?? (rec.chapter === 'think' ? PALETTE.indigo : rec.chapter === 'create' ? PALETTE.madder : rec.chapter === 'collab' ? PALETTE.ink : PALETTE.gold)
      }
    }

    // 终章收尾 → 剪布
    if (this.pendingSettle && this.rowQueue.length === 0 && !this.shuttle.active) {
      if (this.settleTimer < 0) this.settleTimer = 0.7
      this.settleTimer -= dt
      if (this.settleTimer <= 0) {
        this.pendingSettle = false
        this.startSettle()
      }
    }

    // 物理
    const sub = 2
    const sdt = dt / sub
    for (let s = 0; s < sub; s++) this.stepPhysics(sdt)

    // 收束
    if (this.phase === 'settled') {
      this.settleT += dt
      for (const t of this.threads) {
        if (!t.cut && this.settleT >= t.cutAt) t.cut = true
        if (t.cut && this.settleT > t.cutAt + 0.15) {
          t.fade = Math.max(0, t.fade - dt * (this.reducedMotion ? 20 : 2.2))
        }
      }
      // 布的摆动：释放后的单摆
      this.swing.vel += (-this.swing.ang * 6.5 - this.swing.vel * 0.9) * dt
      this.swing.ang += this.swing.vel * dt
      for (const f of this.fringe) {
        const targetSway = this.swing.ang * 2.2 + Math.sin(this.time * 1.3 + f.phase) * 0.12
        f.swayV += ((targetSway - f.sway) * 8 - f.swayV * 2.5) * dt
        f.sway += f.swayV * dt
      }
      if (!this.settledAnnounced && (this.settleT > 1.5 || this.reducedMotion)) {
        this.settledAnnounced = true
        this.events.onSettled?.()
      }
    }

    for (const t of this.threads) t.glow = Math.max(0, t.glow - dt * 1.4)
  }

  private stepPhysics(dt: number) {
    const fell = this.fellY()
    const span = Math.max(40, this.warpBottom - fell)
    const seg = span / (POINTS - 1)
    const kX = 150
    const kY = 320
    const damp = this.reducedMotion ? 0.6 : 0.86
    for (let i = 0; i < this.threads.length; i++) {
      const t = this.threads[i]
      if (!t.tensioned || (t.cut && t.fade <= 0)) continue
      const pts = t.points
      pts[0].x = t.restX
      pts[0].y = fell
      pts[0].px = t.restX
      pts[0].py = fell
      for (let j = 1; j < POINTS; j++) {
        const p = pts[j]
        const vx = (p.x - p.px) * damp
        const vy = (p.y - p.py) * damp
        p.px = p.x
        p.py = p.y
        if (t.cut) {
          // 剪断的线头：只受重力，飘落
          p.x += vx * 0.985
          p.y += vy * 0.985 + 900 * dt * dt
          continue
        }
        const bell = Math.sin((Math.PI * j) / (POINTS - 1))
        const restY = fell + seg * j + bell * this.tangleFront(j) * 14
        // 缠结从线尾向上蔓延：越靠近织口，越晚被卷进去
        const tOff = t.tangleOffsets[j] * this.tangleFront(j)
        let ax = (t.restX + tOff - p.x) * kX
        const ay = (restY - p.y) * kY
        if (!this.reducedMotion) {
          // 呼吸般的风
          ax += (Math.sin(this.time * 0.6 + i * 0.37 + j) * 3 + Math.sin(this.time * 1.7 + i) * 1.5) * Math.sin((Math.PI * j) / (POINTS - 1))
        }
        p.x += vx + ax * dt * dt
        p.y += vy + ay * dt * dt
      }
      // 线内波动传递：只平滑“偏离目标的动态部分”，
      // 静态缠结形状由弹簧目标承担，不被熨平
      for (let pass = 0; pass < 2; pass++) {
        for (let j = 1; j < POINTS - 1; j++) {
          const p = pts[j]
          const dev = (jj: number) => {
            const q = pts[jj]
            return q.x - (t.restX + (t.cut ? 0 : t.tangleOffsets[jj] * this.tangleFront(jj)))
          }
          p.x += (dev(j - 1) + dev(j + 1) - 2 * dev(j)) * 0.16
        }
      }
    }
  }

  // ---------- 渲染 ----------

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.W, this.H)
    this.drawBeam(ctx)

    // 布（带收束摆动）
    const cx = this.W / 2
    ctx.save()
    ctx.translate(cx, this.beamY)
    ctx.rotate(this.swing.ang)
    ctx.translate(-cx, -this.beamY)
    const drew = this.cloth.drawTo(ctx, this.loomLeft, this.clothTop, this.wovenRows * this.rowH)
    if (drew && this.wovenRows > 0) {
      // 织口线：打纬第三拍 —— 下沉回弹 + 亮线脉冲
      ctx.fillStyle = `rgba(43, 39, 35, ${0.22 + this.beatPulse * 0.4})`
      ctx.fillRect(this.loomLeft, this.fellY() - 1 + this.beatPulse * 1.5, this.loomW, 1.2 + this.beatPulse * 1.4)
    }
    if (this.phase === 'settled') this.drawFringe(ctx)
    ctx.restore()

    // 经线（织口以下悬挂的部分）
    this.drawThreads(ctx)

    // 梭子
    if (this.shuttle.active && !this.reducedMotion) this.drawShuttle(ctx)

    // Canvas 不可用时的降级在 React 层处理（静态织纹背景）
  }

  private drawBeam(ctx: CanvasRenderingContext2D) {
    const pad = this.mobile ? 10 : 26
    const x = this.loomLeft - pad
    const w = this.loomW + pad * 2
    const y = this.beamY - 7
    ctx.fillStyle = PALETTE.beam
    ctx.beginPath()
    ctx.roundRect(x, y, w, 12, 5)
    ctx.fill()
    ctx.fillStyle = PALETTE.beamEdge
    ctx.fillRect(x, y + 9, w, 2)
    // 梁两端的手工刻痕
    ctx.strokeStyle = 'rgba(236,231,221,0.25)'
    ctx.lineWidth = 1
    for (const ex of [x + 8, x + w - 8]) {
      ctx.beginPath()
      ctx.moveTo(ex, y + 2)
      ctx.lineTo(ex, y + 10)
      ctx.stroke()
    }
  }

  private drawThreads(ctx: CanvasRenderingContext2D) {
    ctx.lineCap = 'round'
    for (const t of this.threads) {
      if (t.cut && t.fade <= 0) continue
      if (!t.tensioned) {
        this.drawSlack(ctx, t)
        continue
      }
      const pts = t.points
      const baseAlpha = 0.8 * t.fade
      if (baseAlpha <= 0.01) continue
      ctx.strokeStyle = t.isBroken ? PALETTE.brokenTint : PALETTE.warpShadow
      ctx.globalAlpha = baseAlpha
      ctx.lineWidth = this.mobile ? 1 : 1.1
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let j = 1; j < POINTS - 1; j++) {
        const mx = (pts[j].x + pts[j + 1].x) / 2
        const my = (pts[j].y + pts[j + 1].y) / 2
        ctx.quadraticCurveTo(pts[j].x, pts[j].y, mx, my)
      }
      ctx.lineTo(pts[POINTS - 1].x, pts[POINTS - 1].y)
      ctx.stroke()
      if (t.glow > 0.03) {
        ctx.strokeStyle = t.isBroken ? PALETTE.gold : PALETTE.inkSoft
        ctx.globalAlpha = t.glow * 0.85 * t.fade
        ctx.lineWidth = 1.9
        ctx.stroke()
      }
    }
    ctx.globalAlpha = 1
  }

  /** 尚未绷紧的经线：松垮地垂着，尾端微卷 */
  private drawSlack(ctx: CanvasRenderingContext2D, t: WarpThread) {
    const sway = Math.sin(this.time * 0.5 + t.slackSeed) * 6
    const len = (this.warpBottom - this.clothTop) * (0.55 + 0.18 * Math.sin(t.slackSeed * 3))
    const x0 = t.restX
    const y0 = this.clothTop
    ctx.strokeStyle = PALETTE.warp
    ctx.globalAlpha = 0.32
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.quadraticCurveTo(x0 + sway + Math.sin(t.slackSeed) * 26, y0 + len * 0.55, x0 + sway * 1.6 + Math.cos(t.slackSeed) * 20, y0 + len)
    ctx.quadraticCurveTo(x0 + sway * 1.6 + Math.cos(t.slackSeed) * 24, y0 + len + 12, x0 + sway * 1.6 + Math.cos(t.slackSeed) * 14, y0 + len + 16)
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  private drawShuttle(ctx: CanvasRenderingContext2D) {
    const t = easeInOut(clamp(this.shuttle.t, 0, 1))
    const x = lerp(this.shuttle.fromX, this.shuttle.toX, t)
    const y = this.shuttle.y
    const w = this.mobile ? 22 : 34
    const h = this.mobile ? 5 : 7
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(this.shuttle.dir > 0 ? 0.06 : -0.06)
    ctx.fillStyle = PALETTE.beam
    ctx.beginPath()
    ctx.moveTo(-w / 2, 0)
    ctx.quadraticCurveTo(0, -h, w / 2, 0)
    ctx.quadraticCurveTo(0, h, -w / 2, 0)
    ctx.fill()
    ctx.fillStyle = this.shuttle.color
    ctx.beginPath()
    ctx.ellipse(0, 0, w * 0.18, h * 0.5, 0, 0, Math.PI * 2)
    ctx.fill()
    // 拖着的纬线尾
    ctx.strokeStyle = this.shuttle.color
    ctx.globalAlpha = 0.6
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(-this.shuttle.dir * w * 0.4, 0)
    ctx.lineTo(-this.shuttle.dir * (w * 0.4 + 30), Math.sin(this.time * 30) * 2)
    ctx.stroke()
    ctx.globalAlpha = 1
    ctx.restore()
  }

  private drawFringe(ctx: CanvasRenderingContext2D) {
    const y = this.fellY()
    ctx.strokeStyle = PALETTE.warpShadow
    ctx.lineWidth = 1.1
    for (const f of this.fringe) {
      const x = this.loomLeft + f.x
      const bend = f.sway * 10
      ctx.globalAlpha = 0.75
      ctx.beginPath()
      ctx.moveTo(x, y - 1)
      ctx.quadraticCurveTo(x + bend * 0.4, y + f.len * 0.55, x + bend, y + f.len)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  // ---------- 状态快照 ----------

  snapshot() {
    return {
      warpingDone: this.warpingDone,
      combed: this.combed,
      tangleAmount: this.tangleAmount,
      userRows: this.userRows,
      settled: this.phase === 'settled',
      settledAnnounced: this.settledAnnounced,
      wovenRows: this.wovenRows,
      clothReady: this.cloth.ready,
    }
  }

  get canvasUsable(): boolean {
    return this.cloth.ready
  }
}
