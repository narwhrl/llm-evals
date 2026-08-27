/**
 * 「意义有颜色」系统：
 * 每个候选词携带一个色相；全站强调色 = 本次会话所有采样词色相的圆均值。
 * 颜色是被内容推导出来的，不是装饰。
 */

export const NEUTRAL_HUE = 16 // 初始暖赭，像未蘸墨的笔

/** 圆均值色相： hues -> [0,360) */
export function mixHues(hues) {
  if (hues.length === 0) return NEUTRAL_HUE
  let x = 0
  let y = 0
  for (const h of hues) {
    const r = (h * Math.PI) / 180
    x += Math.cos(r)
    y += Math.sin(r)
  }
  if (x === 0 && y === 0) return NEUTRAL_HUE
  return (((Math.atan2(y, x) * 180) / Math.PI) % 360 + 360) % 360
}

/** 主强调色：纸上可读的深色（用于文字/下划线/焦点） */
export function accent(h) {
  return `hsl(${h.toFixed(1)} 52% 37%)`
}

/** 弱化强调色（用于底纹、hover 洗色） */
export function accentWash(h) {
  return `hsl(${h.toFixed(1)} 60% 88% / 0.55)`
}

/** 幽灵候选色（未说出口的词） */
export function accentGhost(h, a = 0.4) {
  return `hsl(${h.toFixed(1)} 40% 32% / ${a})`
}
