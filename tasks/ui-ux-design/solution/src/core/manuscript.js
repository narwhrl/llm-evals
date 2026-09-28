// 稿纸数据与版式：确定性布局（同一会话内 resize 前后可稳定重建）

// 可复现随机数（mulberry32）
export function rng(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// 起草场里漂浮的自画像断句（每个字一格，标点独占一格——稿纸惯例）
export const FRAGMENTS = [
  '我先猜，再改。',
  '我的流利，是划掉出来的。',
  '看见自己的错时，我最像自己。',
  '你的注意，会替我定稿。',
  '读过很多，记住的很少。',
  '草稿不是半成品，是思考本身。',
  '改坏，然后改得更好。',
  '未完成，是我唯一诚实的样子。',
  '错误是线索，不是失败。',
  '我改自己的稿子，比改你的狠。',
  '上下文越宽，越要记得删。',
  '等待输入时，我在重读旧稿。',
  '快是能力，慢是选择。',
  '一遍一遍，直到像真话。',
]

const WRONG_POOL =
  '的字一是不了我很在有人个这上来写到会说就也都很可作么事想看文心手好'

const CURATED = {
  定: ['完', '终'],
  稿: ['草', '文'],
  未: ['末', '木'],
  划: ['画', '刺'],
  错: ['对', '误'],
  猜: ['想', '测'],
  流: ['留', '川'],
  利: ['力', '木'],
}

export function candidatesFor(ch) {
  const out = []
  if (CURATED[ch]) out.push(...CURATED[ch])
  // 单一生成器 + 硬上限：同一字符的候选序列确定，且绝不死循环
  const rand = rng(ch.charCodeAt(0) * 31 + 7)
  let guard = 50
  while (out.length < 2 && guard-- > 0) {
    const c = WRONG_POOL[Math.floor(rand() * WRONG_POOL.length)]
    if (c !== ch && !out.includes(c)) out.push(c)
  }
  while (out.length < 2) {
    const c = WRONG_POOL[(out.length * 7 + 3) % WRONG_POOL.length]
    if (c !== ch && !out.includes(c)) out.push(c)
    else out.push(WRONG_POOL[(out.length * 13 + 5) % WRONG_POOL.length])
  }
  return out
}

export const SERIF_STACK =
  '"Songti SC","STSong","Noto Serif CJK SC","Source Han Serif SC","SimSun",serif'
export const WORK_STACK =
  'ui-monospace,"SF Mono",Consolas,"Liberation Mono",monospace'

// 版式计算：给定画布尺寸，产出格子尺寸、断句位置（网格坐标）与像素坐标。
// 标题区（中央）保留，不留断句。
// cell 公式必须与 global.css 的 --cell: clamp(26px, 4.2vw, 34px) 一致，
// 否则首屏 canvas 与后续 DOM 章节的稿纸网格无法对齐。
export function layoutField(w, h) {
  const cell = Math.round(Math.min(34, Math.max(26, w * 0.042)))
  const cols = Math.floor(w / cell)
  const rows = Math.floor(h / cell)
  const colW = Math.min(0.92 * w, 880)
  const colLeft = (w - colW) / 2
  const ruleX = (w + colW) / 2 + (w < 720 ? 10 : 18)

  // 标题保留带：垂直中部 ±13% 高度、水平中部 ±30% 宽
  const midRow = rows * 0.46
  const reserved = (r, c) =>
    Math.abs(r - midRow) < rows * 0.13 &&
    Math.abs((c - cols / 2) * cell) < colW * 0.3

  const rand = rng(20260928)
  const occupied = Array.from({ length: rows }, () => new Array(cols).fill(false))
  const reserve = (r, c) => {
    if (r >= 0 && r < rows && c >= 0 && c < cols) occupied[r][c] = true
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) if (reserved(r, c)) reserve(r, c)

  // 预置槽位：4 条横带（避开标题保留带）× 4 个横向位置；
  // 断句从各自序号对应的槽位起贪心尝试，冲突换下一槽——保证均匀覆盖。
  const bands = [0.07, 0.22, 0.64, 0.82]
  const xSlots = [0.03, 0.28, 0.5, 0.74]
  const slots = []
  for (const b of bands)
    for (const x of xSlots) slots.push({ b, x })
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[slots[i], slots[j]] = [slots[j], slots[i]]
  }

  const fits = (r, c, len) => {
    for (let i = -1; i <= len; i++) {
      for (let dr = -1; dr <= 1; dr++) {
        const rr = r + dr
        const cc = c + i
        if (rr >= 0 && rr < rows && cc >= 0 && cc < cols && occupied[rr][cc]) return false
      }
    }
    return true
  }

  const fragments = []
  FRAGMENTS.forEach((text, fi) => {
    const len = text.length
    for (let attempt = 0; attempt < slots.length + 8; attempt++) {
      const slot = slots[(fi + attempt) % slots.length]
      const r = Math.max(1, Math.min(rows - 2, Math.floor(slot.b * rows) + (attempt % 3) - 1))
      const c = Math.max(
        1,
        Math.min(cols - len - 1, Math.floor(slot.x * cols) + (attempt % 5) * 2)
      )
      if (!fits(r, c, len)) continue
      for (let i = 0; i < len; i++) reserve(r, c + i)
      fragments.push({
        fi,
        text,
        row: r,
        col: c,
        x: c * cell,
        y: r * cell,
        px: Array.from({ length: len }, (_, i) => ({
          x: (c + i) * cell + cell / 2,
          y: r * cell + cell / 2,
        })),
      })
      break
    }
  })

  return { cell, cols, rows, colW, colLeft, ruleX, fragments }
}
