/**
 * 墨线穿字检测：在真实页面各章节、各指针位置下，
 * 读取固定 canvas 在文本元素矩形内的近黑像素（光束/棱镜边/主谱线/暗线刻度）。
 * 色散扇面为彩色低透明填充，不计入（设计允许掠过）。
 * 用法：先启动 preview，再 node scripts/ink-clash.mjs
 */
import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173'

const TEXT_SELECTOR = [
  '.topbar',
  '.hud',
  '.hero__meta',
  'h1.hero__title',
  '.hero__sub',
  '.hero__steps li',
  '.facet__head',
  'h2.facet__title',
  '.facet__lead',
  '.facet__body',
  '.facet__note',
  '.threshold__kicker',
  'h2.threshold__title',
  '.threshold__body',
  '.threshold__hint',
  '.threshold__btn',
  '.threshold__list li',
  '.threshold__tease',
  '.colophon__kicker',
  'h2.colophon__title',
  '.colophon__body',
  '.colophon__sig',
  '.colophon__top',
].join(', ')

const sections = ['#top', '#think', '#make', '#collab', '#threshold', '#colophon']
const violations = []
const reports = []

const browser = await chromium.launch({ channel: 'chrome', headless: true })

async function check(name, viewport, opts = {}) {
  const { isMobile = false, reducedMotion = 'no-preference', dark = false, pointers = [] } = opts
  const ctx = await browser.newContext({
    viewport,
    isMobile,
    hasTouch: isMobile,
    reducedMotion,
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => violations.push(`[${name}] pageerror ${e.message}`))
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(reducedMotion === 'reduce' ? 400 : 1900)

  if (dark) {
    await page.locator('.threshold__btn').click()
    await page.waitForTimeout(700)
  }

  for (const ptr of pointers.length ? pointers : [null]) {
    if (ptr && !isMobile) {
      await page.mouse.move(ptr[0], ptr[1])
      await page.waitForTimeout(500)
    }
    for (const sel of sections) {
      await page.locator(sel).scrollIntoViewIfNeeded()
      await page.waitForTimeout(reducedMotion === 'reduce' ? 250 : 800)
      const hits = await page.evaluate((query) => {
        const canvas = document.querySelector('canvas.spectroscope')
        if (!canvas) return [{ err: 'no canvas' }]
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1

        // 祖先裁剪后的可见矩形（跳过 max-height:0 折叠的隐藏列表等）
        function visibleRect(el) {
          const r = el.getBoundingClientRect()
          let x0 = r.left
          let y0 = r.top
          let x1 = r.right
          let y1 = r.bottom
          for (let p = el.parentElement; p; p = p.parentElement) {
            const cs = getComputedStyle(p)
            if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
              const pr = p.getBoundingClientRect()
              x0 = Math.max(x0, pr.left)
              y0 = Math.max(y0, pr.top)
              x1 = Math.min(x1, pr.right)
              y1 = Math.min(y1, pr.bottom)
            }
            if (x1 - x0 < 1 || y1 - y0 < 1) return null
          }
          return { x0, y0, x1, y1 }
        }

        // 字形级行矩形
        function glyphRects(el) {
          const rects = []
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
          let node
          while ((node = walker.nextNode())) {
            if (!node.textContent.trim()) continue
            const range = document.createRange()
            range.selectNodeContents(node)
            for (const r of range.getClientRects()) {
              if (r.width >= 2 && r.height >= 2) rects.push(r)
            }
          }
          return rects
        }

        const found = []
        for (const el of document.querySelectorAll(query)) {
          const vis = visibleRect(el)
          if (!vis) continue
          const vr = {
            left: vis.x0,
            top: vis.y0,
            right: vis.x1,
            bottom: vis.y1,
          }
          if (vr.bottom < 0 || vr.top > innerHeight || vr.right < 0 || vr.left > innerWidth) continue
          let n = 0
          let sample = null
          for (const g of glyphRects(el)) {
            const x0 = Math.max(0, Math.floor(g.left - 3))
            const y0 = Math.max(0, Math.floor(g.top - 3))
            const x1 = Math.min(canvas.width / dpr, Math.ceil(g.right + 3))
            const y1 = Math.min(canvas.height / dpr, Math.ceil(g.bottom + 3))
            if (x1 - x0 < 2 || y1 - y0 < 2) continue
            const w = Math.floor((x1 - x0) * dpr)
            const h = Math.floor((y1 - y0) * dpr)
            const data = ctx.getImageData(Math.floor(x0 * dpr), Math.floor(y0 * dpr), w, h).data
            let gn = 0
            for (let i = 0; i < data.length; i += 4) {
              if (data[i + 3] > 110 && data[i] < 115 && data[i + 1] < 115 && data[i + 2] < 115) gn++
            }
            n += gn
            if (gn > 24 && !sample) sample = [x0, y0, Math.round(x1 - x0), Math.round(y1 - y0)]
          }
          if (n > 24) {
            const label = (el.textContent || '').trim().slice(0, 18)
            found.push({ el: el.className || el.tagName, label, darkPx: n, rect: sample })
          }
        }
        return found
      }, TEXT_SELECTOR)
      for (const hit of hits) {
        if (hit.err) violations.push(`[${name}${ptr ? ` ptr(${ptr})` : ''}] ${sel} ${hit.err}`)
        else if (hit) violations.push(`[${name}${ptr ? ` ptr(${ptr})` : ''}] ${sel} "${hit.el}" "${hit.label}" darkPx=${hit.darkPx} rect=${hit.rect}`)
      }
      reports.push(`${name}${ptr ? ` ptr(${ptr})` : ''} ${sel}: ${hits.length === 0 ? 'clean' : hits.length + ' hits'}`)
    }
  }
  await ctx.close()
}

await check('desktop', { width: 1440, height: 900 }, {
  pointers: [[200, 135], [720, 450], [1300, 780]],
})
await check('desktop-dark', { width: 1440, height: 900 }, {
  dark: true,
  pointers: [[200, 135], [1300, 780]],
})
await check('mobile', { width: 390, height: 844 }, { isMobile: true })
await check('mobile-dark', { width: 390, height: 844 }, { isMobile: true, dark: true })
await check('desktop-rm', { width: 1440, height: 900 }, { reducedMotion: 'reduce' })

await browser.close()

console.log('—— 检测记录 ——')
for (const r of reports) console.log('  ' + r)
if (violations.length) {
  console.log('—— 墨线穿字违规 ——')
  for (const v of violations) console.log('  ' + v)
  process.exit(1)
}
console.log('OK：所有章节、指针与暗线状态下，画布墨线均未侵入文本矩形。')
