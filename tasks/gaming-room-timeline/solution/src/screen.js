// screen.js — 电脑屏幕：CanvasTexture 各年代桌面 + 可玩小游戏
// 画布 512×320，DOM 面板中的小画布每帧 drawImage 同步。
export const SCREENS = [
  { min: 2005, max: 2008, mode: 'snake',   title: 'Windows XP · 贪吃蛇', start: '开始', bg: '#1c4f9c', bar: '#0a246a', task: '#245edb', win: '#ece9d8', ink: '#1a1a1a', acc: '#e8a33d' },
  { min: 2008, max: 2011, mode: 'shooter', title: 'Windows Vista · 靶场射击', start: '开始', bg: '#123246', bar: '#0d2233', task: '#2e5a74', win: '#dfe9ef', ink: '#12232e', acc: '#7fb3d5' },
  { min: 2011, max: 2014, mode: 'snake',   title: 'Windows 7 · 贪吃蛇', start: '开始', bg: '#14536b', bar: '#0b3242', task: '#1d6f8e', win: '#eef3f6', ink: '#10313d', acc: '#f0b429' },
  { min: 2014, max: 2017, mode: 'shooter', title: 'Windows 10 · 靶场射击', start: '开始', bg: '#10202e', bar: '#0a1620', task: '#1c3a4d', win: '#e8edf1', ink: '#16242e', acc: '#e86a5e' },
  { min: 2017, max: 2020, mode: 'dodge',   title: 'Win10 · 星尘躲避', start: '开始', bg: '#1a1430', bar: '#120d24', task: '#33266e', win: '#0f0c22', ink: '#e8e4ff', acc: '#8e7bff' },
  { min: 2020, max: 2023, mode: 'dodge',   title: 'Win11 · 星尘躲避', start: '开始', bg: '#171224', bar: '#100b1c', task: '#2c2154', win: '#0c0918', ink: '#e6e2ff', acc: '#b388ff' },
  { min: 2023, max: 2026, mode: 'shooter', title: 'Win11 · 靶场射击', start: '开始', bg: '#12161f', bar: '#0b0e15', task: '#232b3a', win: '#dfe3ea', ink: '#1b2230', acc: '#ffd257' },
]

export class ScreenUI {
  constructor(canvas, onYear) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.year = 2005
    this.onYear = onYear || (() => 2005)
    this.view = 'desktop' // desktop | game
    this.game = null
    this.last = 0
    this.listeners = []
  }
  era() { return SCREENS.find(s => this.year >= s.min && this.year < s.max) || SCREENS.at(-1) }
  setYear(y) { this.year = y }
  resetToDesktop() { this.view = 'desktop'; this.game = null }
  on(cb) { this.listeners.push(cb) }

  startGame() {
    const mode = this.era().mode
    if (mode === 'snake') this.game = { score: 0, alive: true, dir: { x: 1, y: 0 }, snake: [{x:5,y:6},{x:4,y:6},{x:3,y:6}], food: {x:10,y:6}, t: 0 }
    else if (mode === 'shooter') this.game = { score: 0, time: 30, targets: [], spawnT: 0 }
    else this.game = { score: 0, alive: true, px: 256, blocks: [], spawnT: 0 }
    this.view = 'game'
  }

  click(x, y) {
    if (this.view === 'desktop') {
      // 「开始游戏」按钮
      if (x > 206 && x < 306 && y > 214 && y < 248) { this.startGame(); return }
      // 关闭/最小化等装饰按钮：点击无副作用
      return
    }
    const g = this.game
    if (!g) return
    if (this.view === 'game' && !this.game.alive && this.game.gameOver) {
      if (x > 206 && x < 306 && y > 214 && y < 248) { this.startGame(); return }
      if (x > 206 && x < 306 && y > 258 && y < 292) { this.resetToDesktop(); return }
    }
    if (this.era().mode === 'shooter' && g.targets) {
      for (let i = g.targets.length - 1; i >= 0; i--) {
        const t = g.targets[i]
        if ((x - t.x) ** 2 + (y - t.y) ** 2 < (t.r + 6) ** 2) { g.targets.splice(i, 1); g.score += 10; return }
      }
    }
  }

  move(x, y) {
    if (this.view === 'game' && this.era().mode === 'dodge' && this.game) this.game.px = x
  }

  key(name) {
    if (this.view !== 'game') return
    const g = this.game
    if (this.era().mode === 'snake' && g && g.alive) {
      const map = { ArrowLeft: {x:-1,y:0}, ArrowRight: {x:1,y:0}, ArrowUp: {x:0,y:-1}, ArrowDown: {x:0,y:1} }
      if (map[name]) g.dir = map[name]
    }
  }

  update(dt) {
    if (this.view !== 'game' || !this.game) return
    const g = this.game, mode = this.era().mode
    if (mode === 'shooter') {
      g.time -= dt
      if (g.time <= 0) { g.time = 0; g.gameOver = true }
      g.spawnT -= dt
      if (g.spawnT <= 0 && !g.gameOver) { g.targets.push({ x: 40 + Math.random() * 432, y: 60 + Math.random() * 200, r: 24 + Math.random() * 18, ttl: 1.4 }); g.spawnT = 0.7 }
      for (let i = g.targets.length - 1; i >= 0; i--) { g.targets[i].ttl -= dt; if (g.targets[i].ttl <= 0) g.targets.splice(i, 1) }
    } else if (mode === 'dodge') {
      if (!g.alive) { g.gameOver = true; return }
      g.score += dt * 10
      g.spawnT -= dt
      if (g.spawnT <= 0) { g.blocks.push({ x: 20 + Math.random() * 472, y: -30, vy: 130 + Math.random() * 90, r: 16 }); g.spawnT = 0.55 }
      const W = 512, padY = 292
      for (let i = g.blocks.length - 1; i >= 0; i--) {
        const b = g.blocks[i]; b.y += b.vy * dt
        if (b.y > 330) { g.blocks.splice(i, 1); continue }
        if (Math.abs(b.x - g.px) < 52 && Math.abs(b.y - padY) < 30) { g.alive = false; g.gameOver = true }
      }
    } else if (mode === 'snake') {
      if (!g.alive) { g.gameOver = true; return }
      g.t += dt
      if (g.t < 0.14) return
      g.t = 0
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }
      const COLS = 32, ROWS = 20
      if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS || g.snake.some(s => s.x === head.x && s.y === head.y)) { g.alive = false; g.gameOver = true; return }
      g.snake.unshift(head)
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score += 10
        g.food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
      } else g.snake.pop()
    }
  }

  render(now) {
    const c = this.ctx, W = 512, H = 320, e = this.era()
    c.clearRect(0, 0, W, H)
    // 壁纸
    const grad = c.createLinearGradient(0, 0, 0, H)
    grad.addColorStop(0, e.bg); grad.addColorStop(1, '#0c0c12')
    c.fillStyle = grad; c.fillRect(0, 0, W, H)
    if (this.view === 'desktop') this.drawDesktop(c, e)
    else this.drawGame(c, e)
  }

  drawDesktop(c, e) {
    const W = 512, H = 320
    // 图标
    const icons = ['我的电脑', '回收站', '游戏', '文档', '浏览器']
    c.font = '11px system-ui, sans-serif'
    for (let i = 0; i < icons.length; i++) {
      const x = 24 + (i % 5) * 56, y = 22 + Math.floor(i / 5) * 56
      c.fillStyle = 'rgba(255,255,255,.9)'; c.fillRect(x, y, 26, 26)
      c.fillStyle = '#fff'; c.fillText(icons[i], x - 6, y + 42)
    }
    // 主窗口
    c.fillStyle = e.win; c.fillRect(120, 70, 272, 190)
    c.fillStyle = e.bar
    if (this.year >= 2008 && this.year < 2011) { c.fillStyle = 'rgba(20,40,60,.92)' }
    c.fillRect(120, 70, 272, 24)
    c.fillStyle = '#fff'; c.font = '12px system-ui, sans-serif'
    c.fillText(e.title, 132, 87)
    c.textAlign = 'right'; c.fillText('—  □  ✕', 384, 87); c.textAlign = 'left'
    c.fillStyle = e.ink; c.font = '12px system-ui, sans-serif'
    c.fillText('欢迎来到 ' + Math.floor(this.year) + ' 年的电脑', 136, 112)
    c.font = '11px system-ui, sans-serif'
    c.fillText('桌面右下角的时钟显示当前年份。', 136, 130)
    c.fillText('点击下面的按钮开始小游戏。', 136, 146)
    // 开始按钮
    c.fillStyle = e.acc; c.fillRect(206, 214, 100, 34)
    c.fillStyle = '#12100a'; c.font = 'bold 14px system-ui, sans-serif'; c.textAlign = 'center'
    c.fillText(e.start, 256, 235); c.textAlign = 'left'
    // 任务栏
    c.fillStyle = e.task; c.fillRect(0, H - 26, W, 26)
    c.fillStyle = 'rgba(255,255,255,.9)'; c.font = '11px system-ui, sans-serif'
    c.fillText('开始', 12, H - 9)
    c.textAlign = 'right'; c.fillText(String(Math.floor(this.year)), W - 12, H - 9); c.textAlign = 'left'
  }

  drawGame(c, e) {
    const g = this.game, W = 512, H = 320
    c.fillStyle = '#101018'; c.fillRect(0, 0, W, H)
    c.fillStyle = '#fff'; c.font = '12px system-ui, sans-serif'
    const mode = e.mode
    if (mode === 'shooter') {
      c.fillText('得分 ' + g.score + '   时间 ' + Math.ceil(g.time) + 's', 12, 20)
      for (const t of g.targets) {
        const pct = Math.max(0, t.ttl / 1.4)
        c.fillStyle = e.acc; c.beginPath(); c.arc(t.x, t.y, t.r * pct + 8, 0, 7); c.fill()
        c.fillStyle = '#fff'; c.beginPath(); c.arc(t.x, t.y, t.r * pct * 0.5 + 4, 0, 7); c.fill()
        c.fillStyle = '#c0392b'; c.beginPath(); c.arc(t.x, t.y, (t.r * pct * 0.5 + 4) * 0.45, 0, 7); c.fill()
      }
      if (g.gameOver) this.drawOver(c, e, g.score)
    } else if (mode === 'dodge') {
      c.fillText('存活得分 ' + Math.floor(g.score), 12, 20)
      // 挡板
      c.fillStyle = e.acc; c.fillRect(g.px - 44, 284, 88, 10)
      for (const b of g.blocks) {
        c.fillStyle = '#e86a5e'; c.beginPath(); c.arc(b.x, b.y, b.r, 0, 7); c.fill()
      }
      if (!g.alive) this.drawOver(c, e, Math.floor(g.score))
    } else if (mode === 'snake') {
      c.fillText('得分 ' + g.score, 12, 16)
      const cw = 16, ox = 0, oy = 24
      c.strokeStyle = 'rgba(255,255,255,.15)'; c.strokeRect(ox, oy, 32 * cw, 20 * cw)
      c.fillStyle = '#7ee787'
      for (const s of g.snake) c.fillRect(ox + s.x * cw + 1, oy + s.y * cw + 1, cw - 2, cw - 2)
      c.fillStyle = '#ff6b6b'
      c.beginPath(); c.arc(ox + g.food.x * cw + 8, oy + g.food.y * cw + 8, 6, 0, 7); c.fill()
      c.fillStyle = 'rgba(255,255,255,.55)'; c.font = '11px system-ui, sans-serif'
      c.fillText('方向键 / 点击画面移动', 12, H - 24)
      if (!g.alive) this.drawOver(c, e, g.score)
    }
    // 返回桌面
    c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(422, 286, 78, 24)
    c.fillStyle = '#fff'; c.font = '12px system-ui, sans-serif'; c.textAlign = 'center'
    c.fillText('返回桌面', 461, 302); c.textAlign = 'left'
    if (this.view === 'game' && !g.gameOver) {
      c.fillStyle = 'rgba(255,255,255,.45)'; c.font = '11px system-ui, sans-serif'
      c.fillText(e.title, 12, H - 8)
    }
  }

  drawOver(c, e, score) {
    c.fillStyle = 'rgba(10,10,16,.78)'; c.fillRect(0, 0, 512, 320)
    c.fillStyle = '#fff'; c.font = 'bold 26px system-ui, sans-serif'; c.textAlign = 'center'
    c.fillText('游戏结束', 256, 120)
    c.font = '16px system-ui, sans-serif'
    c.fillText('得分 ' + score, 256, 152)
    c.fillStyle = e.acc; c.fillRect(206, 176, 100, 38)
    c.fillStyle = '#12100a'; c.font = 'bold 14px system-ui, sans-serif'
    c.fillText('再来一局', 256, 200)
    c.fillStyle = '#fff'; c.font = '12px system-ui, sans-serif'
    c.textAlign = 'left'
  }
}
