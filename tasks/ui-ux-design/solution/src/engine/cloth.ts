import { PALETTE, shade } from './palette'
import { mulberry32 } from './rng'

export type ChapterId = 'think' | 'create' | 'collab' | 'finale'

export interface RowRecord {
  chapter: ChapterId
  solidColor?: string
  halfHeight?: boolean
}

/**
 * 布面渲染器：织过的行画进 offscreen canvas，之后每帧只需 drawImage。
 * 经纬的“压/挑”关系按章节变化：
 *  - think  平纹，靛蓝，行间有呼吸般的明度起伏；
 *  - create 山形斜纹，茜红，藏着一针金色跳线；
 *  - collab 平纹双色（墨黑 × 暖白）交织成格；
 *  - finale 用户选的纯色纬线，加倍厚实。
 */
export class ClothRenderer {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private width = 0
  private rowH = 4
  private dpr = 1
  private gaps = 0
  private gapW = 0
  private rng = mulberry32(20260916)
  private skipRow = -1
  private skipAt = -1

  resize(cssWidth: number, rowH: number, gaps: number, gapW: number, dpr: number) {
    this.width = cssWidth
    this.rowH = rowH
    this.gaps = gaps
    this.gapW = gapW
    this.dpr = dpr
    this.canvas = document.createElement('canvas')
    this.canvas.width = Math.max(2, Math.round(cssWidth * dpr))
    this.canvas.height = Math.max(2, Math.round(120 * rowH * dpr))
    const ctx = this.canvas.getContext('2d')
    if (!ctx) {
      this.canvas = null
      this.ctx = null
      return
    }
    this.ctx = ctx
    ctx.scale(dpr, dpr)
    this.paintWarpGround()
  }

  get ready(): boolean {
    return this.ctx !== null
  }

  /** 经线打底：整幅布先是一层竖向经线条纹，纬线只画“压上去”的部分 */
  private paintWarpGround() {
    const ctx = this.ctx
    if (!ctx) return
    ctx.fillStyle = PALETTE.linenDeep
    ctx.fillRect(0, 0, this.width, this.canvas!.height / this.dpr)
    for (let g = 0; g <= this.gaps; g++) {
      const x = g * this.gapW
      ctx.fillStyle = g % 2 === 0 ? PALETTE.warpLight : PALETTE.warp
      ctx.globalAlpha = 0.55
      ctx.fillRect(x - 0.5, 0, Math.max(1, this.gapW * 0.24), this.canvas!.height / this.dpr)
    }
    ctx.globalAlpha = 1
    // 山形章的跳线位置：只跳一针，落在哪一行哪一段由种子决定
    this.skipRow = 6 + Math.floor(this.rng() * 14)
    this.skipAt = 0.25 + this.rng() * 0.5
  }

  private overUnder(chapter: ChapterId, gap: number, row: number): boolean {
    switch (chapter) {
      case 'think':
      case 'finale':
        return (gap + row) % 2 === 0
      case 'create': {
        // 每 9 行换一次斜向，形成山形
        const dir = Math.floor(row / 9) % 2 === 0 ? 1 : -1
        const v = (((gap + row * dir) % 4) + 4) % 4
        return v < 2
      }
      case 'collab':
        return (gap + row) % 2 === 0
    }
  }

  private weftColor(chapter: ChapterId, row: number, x01: number, solidColor?: string): string {
    const jitter = Math.floor((this.rng() - 0.5) * 14)
    switch (chapter) {
      case 'think': {
        const breath = Math.sin(row * 0.55) * 10
        return shade(row % 12 === 6 ? PALETTE.indigoLight : PALETTE.indigo, jitter + breath)
      }
      case 'create': {
        if (row === this.skipRow && Math.abs(x01 - this.skipAt) < 0.02) return PALETTE.gold
        return shade(row % 9 === 4 ? PALETTE.madderLight : PALETTE.madder, jitter)
      }
      case 'collab': {
        const base = row % 2 === 0 ? PALETTE.ink : '#d8d0bd'
        return shade(base, jitter)
      }
      case 'finale':
        return shade(solidColor ?? PALETTE.gold, jitter)
    }
  }

  addRow(row: number, rec: RowRecord) {
    const ctx = this.ctx
    if (!ctx) return
    const h = rec.halfHeight ? this.rowH * 0.55 : this.rowH
    const y = this.rowTop(row) + (rec.halfHeight ? this.rowH * 0.22 : 0)
    for (let g = 0; g < this.gaps; g++) {
      if (!this.overUnder(rec.chapter, g, row)) continue
      const x0 = g * this.gapW
      const x1 = (g + 1) * this.gapW
      const x01 = (x0 + x1) * 0.5 / this.width
      const selvage = g < 2 || g >= this.gaps - 2
      ctx.fillStyle = this.weftColor(rec.chapter, row, x01, rec.solidColor)
      if (selvage) ctx.fillStyle = shade(ctx.fillStyle as string, -18)
      ctx.fillRect(x0 - 0.4, y, x1 - x0 + 0.8, h)
    }
    // 行间一道极淡的“打纬”阴影，让每一行有被压紧的手工感
    ctx.fillStyle = 'rgba(43, 39, 35, 0.08)'
    ctx.fillRect(0, y + h - 0.6, this.width, 0.6)
  }

  rowTop(row: number): number {
    return row * this.rowH
  }

  drawTo(ctx: CanvasRenderingContext2D, x: number, y: number, visibleHeight: number): boolean {
    if (!this.canvas) return false
    const h = Math.min(visibleHeight, this.canvas.height / this.dpr)
    if (h <= 0) return true
    ctx.drawImage(
      this.canvas,
      0,
      0,
      this.canvas.width,
      h * this.dpr,
      x,
      y,
      this.width,
      h,
    )
    return true
  }
}
