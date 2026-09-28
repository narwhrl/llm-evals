/**
 * 帧级数值验收：对验收截图与实时画布做像素签名断言。
 * - 每张截图按文件名期望校验章节身份（谱段色 / 标题暗像素 / 纸面占比）
 * - 暗线态：HUD 按钮实心填充
 * - 指针响应：hero 光束在 x=400 处的 y 高位/低位差
 * - reduced-motion：静态帧中光谱扇面必须已渲染
 * 用法：npm run acceptance 之后，node scripts/frame-qa.mjs
 */
import { chromium } from 'playwright'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173'
const failures = []
const notes = []

// 内置静态服务：直接读取 acceptance-output 截图
const pngServer = http.createServer((req, res) => {
  const p = path.resolve('acceptance-output', decodeURIComponent(req.url.slice(1)))
  if (!p.startsWith(path.resolve('acceptance-output')) || !p.endsWith('.png') || !fs.existsSync(p)) {
    res.writeHead(404)
    res.end()
    return
  }
  res.writeHead(200, { 'Content-Type': 'image/png' })
  fs.createReadStream(p).pipe(res)
})
await new Promise((resolve) => pngServer.listen(0, '127.0.0.1', resolve))
const IMG = `http://127.0.0.1:${pngServer.address().port}`

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage()

async function scan(file, probes) {
  await page.goto(`${IMG}/${file}`, { waitUntil: 'load' })
  await page.waitForFunction(() => {
    const img = document.images[0]
    return img && img.complete && img.naturalWidth > 0
  })
  return await page.evaluate((probes) => {
    const img = document.images[0]
    const c = document.createElement('canvas')
    c.width = img.naturalWidth
    c.height = img.naturalHeight
    const ctx = c.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const out = { w: c.width, h: c.height }
    const region = (pred, x0, y0, w, h) => {
      const d = ctx.getImageData(x0, y0, w, h).data
      let n = 0
      for (let i = 0; i < d.length; i += 4)
        if (pred(d[i], d[i + 1], d[i + 2], d[i + 3])) n++
      return n
    }
    const paperish = (r, g, b) => r > 210 && g > 205 && b > 190
    out.paperRatio = region(paperish, 0, 0, c.width, c.height) / (c.width * c.height)
    for (const p of probes) {
      const pred = new Function('r', 'g', 'b', 'a', 'return (' + p.pred + ')')
      out[p.name] = region(pred, p.x, p.y, p.w, p.h)
    }
    let beamY = -1
    const beamX = 400
    const col = ctx.getImageData(beamX, 60, 1, c.height - 60).data
    for (let y = 0; y < c.height - 60; y++) {
      const i = y * 4
      if (col[i + 3] > 110 && col[i] < 100 && col[i + 1] < 100 && col[i + 2] < 100) {
        beamY = y + 60
        break
      }
    }
    out.beamY = beamY
    return out
  }, probes)
}

const RED = 'a > 110 && r > 150 && g < 110 && b < 90'
const GREEN = 'a > 110 && g > 100 && r < 95 && b < 130 && g - r > 40'
const INDIGO = 'a > 110 && b > 130 && r < 130 && g < 115 && b - g > 40'
const DARK = 'a > 110 && r < 80 && g < 80 && b < 80'
const BLACK = 'a > 110 && r < 45 && g < 45 && b < 45'

function expect(cond, msg) {
  if (cond) notes.push('PASS ' + msg)
  else failures.push('FAIL ' + msg)
}

{
  const s = await scan('desktop-01-hero.png', [
    { name: 'title', pred: DARK, x: 72, y: 300, w: 640, h: 260 },
    { name: 'red', pred: RED, x: 72, y: 340, w: 260, h: 100 },
  ])
  expect(s.w === 1440 && s.title > 5000 && s.red < 50 && s.paperRatio > 0.5,
    `desktop hero: title=${s.title} red=${s.red} paper=${s.paperRatio.toFixed(2)} beamY=${s.beamY}`)
}
{
  const hi = await scan('desktop-02-pointer-high.png', [])
  const lo = await scan('desktop-03-pointer-low.png', [])
  expect(hi.beamY >= 0 && lo.beamY >= 0 && Math.abs(hi.beamY - lo.beamY) > 15,
    `pointer response: beamY@x400 high=${hi.beamY} low=${lo.beamY} d=${Math.abs(hi.beamY - lo.beamY)}`)
}
{
  const s = await scan('desktop-10-think.png', [
    { name: 'red', pred: RED, x: 72, y: 340, w: 320, h: 110 },
    { name: 'title', pred: DARK, x: 72, y: 430, w: 500, h: 120 },
  ])
  expect(s.red > 200 && s.title > 1500, `desktop think: redHead=${s.red} title=${s.title}`)
}
{
  const s = await scan('desktop-11-make.png', [
    { name: 'green', pred: GREEN, x: 72, y: 340, w: 320, h: 110 },
    { name: 'title', pred: DARK, x: 72, y: 430, w: 500, h: 120 },
  ])
  expect(s.green > 150 && s.title > 1500, `desktop make: greenHead=${s.green} title=${s.title}`)
}
{
  const s = await scan('desktop-12-collab.png', [
    { name: 'indigo', pred: INDIGO, x: 72, y: 340, w: 320, h: 110 },
    { name: 'title', pred: DARK, x: 72, y: 430, w: 500, h: 120 },
  ])
  expect(s.indigo > 100 && s.title > 1500, `desktop collab: indigoHead=${s.indigo} title=${s.title}`)
}
{
  const s = await scan('desktop-13-threshold.png', [
    { name: 'title', pred: DARK, x: 72, y: 430, w: 620, h: 170 },
    { name: 'hudBtn', pred: BLACK, x: 205, y: 845, w: 95, h: 40 },
  ])
  expect(s.title > 1500 && s.hudBtn < 400,
    `desktop threshold (OFF): title=${s.title} hudFilled=${s.hudBtn}`)
}
{
  const s = await scan('desktop-20-dark-shift.png', [
    { name: 'hudBtn', pred: BLACK, x: 205, y: 845, w: 95, h: 40 },
    { name: 'list', pred: DARK, x: 72, y: 500, w: 560, h: 320 },
  ])
  expect(s.hudBtn > 400 && s.list > 500,
    `desktop dark-shift (ON): hudFilled=${s.hudBtn} listPx=${s.list}`)
}
{
  const s = await scan('desktop-14-colophon.png', [
    { name: 'center', pred: DARK, x: 470, y: 360, w: 500, h: 200 },
    { name: 'red', pred: RED, x: 72, y: 340, w: 260, h: 100 },
  ])
  expect(s.center > 3000 && s.red < 50, `desktop colophon: centerTitle=${s.center} red=${s.red}`)
}
{
  const s = await scan('desktop-rm-01-hero.png', [
    { name: 'title', pred: DARK, x: 72, y: 300, w: 640, h: 260 },
  ])
  expect(s.title > 5000 && s.paperRatio > 0.5,
    `desktop-rm hero static frame: title=${s.title} paper=${s.paperRatio.toFixed(2)}`)
}
{
  const s = await scan('mobile-01-hero.png', [
    { name: 'title', pred: DARK, x: 20, y: 470, w: 350, h: 170 },
  ])
  expect(s.w === 390 && s.title > 800, `mobile hero: title=${s.title}`)
}
{
  const s = await scan('mobile-10-think.png', [
    { name: 'red', pred: RED, x: 20, y: 370, w: 160, h: 100 },
  ])
  expect(s.red > 100, `mobile think: redHead=${s.red}`)
}
{
  const s = await scan('mobile-12-collab.png', [
    { name: 'indigo', pred: INDIGO, x: 20, y: 370, w: 160, h: 100 },
  ])
  expect(s.indigo > 50, `mobile collab: indigoHead=${s.indigo}`)
}
{
  const s = await scan('mobile-13-threshold.png', [
    { name: 'title', pred: DARK, x: 20, y: 470, w: 350, h: 90 },
    { name: 'hudBtn', pred: BLACK, x: 78, y: 790, w: 110, h: 40 },
  ])
  expect(s.title > 400 && s.hudBtn < 350,
    `mobile threshold (OFF): title=${s.title} hudFilled=${s.hudBtn}`)
}
{
  const s = await scan('mobile-20-dark-toggle.png', [
    { name: 'hudBtn', pred: BLACK, x: 78, y: 790, w: 110, h: 40 },
    { name: 'list', pred: DARK, x: 20, y: 560, w: 350, h: 240 },
  ])
  expect(s.hudBtn > 350 && s.list > 180,
    `mobile dark-toggle (ON): hudFilled=${s.hudBtn} listPx=${s.list}`)
}
{
  const s = await scan('mobile-14-colophon.png', [
    { name: 'frame', pred: DARK, x: 0, y: 0, w: 390, h: 844 },
  ])
  expect(s.frame > 900, `mobile colophon: fullFrameDarkPx=${s.frame}`)
}

// reduced-motion：静态帧中光谱扇面已渲染（非空白画布）
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
  })
  const p = await ctx.newPage()
  await p.goto(BASE, { waitUntil: 'networkidle' })
  await p.waitForTimeout(600)
  const stats = await p.evaluate(() => {
    const canvas = document.querySelector('canvas.spectroscope')
    const g = canvas.getContext('2d')
    const d = g.getImageData(900, 150, 540, 500).data
    let colored = 0
    for (let i = 0; i < d.length; i += 4) {
      if (
        d[i + 3] > 40 &&
        Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]) > 25
      )
        colored++
    }
    return { colored }
  })
  expect(stats.colored > 500, `reduced-motion static fan rendered: coloredPx=${stats.colored}`)
  await ctx.close()
}

await browser.close()
pngServer.close()

for (const n of notes) console.log('  ' + n)
if (failures.length) {
  console.log('—— 失败 ——')
  for (const f of failures) console.log('  ' + f)
  process.exit(1)
}
console.log(`OK：${notes.length} 项帧级断言全部通过。`)
