/**
 * 视觉验收脚本：桌面 / 移动 × 常规 / reduced-motion，
 * 覆盖核心装置交互、滚动长序列、暗线显影、键盘走查与 console 错误。
 *
 * 用法：先 `npm run build && npm run preview`，再 `npm run acceptance`。
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173'
const OUT = path.resolve('acceptance-output')
await mkdir(OUT, { recursive: true })

const errors = []
const results = []

function track(page, name) {
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[${name}] console: ${m.text()}`)
  })
  page.on('pageerror', (e) => errors.push(`[${name}] pageerror: ${e.message}`))
}

async function shot(page, name, file) {
  await page.screenshot({ path: path.join(OUT, `${name}-${file}.png`) })
}

async function run(name, opts) {
  const { viewport, reducedMotion = 'no-preference', isMobile = false, hasTouch = false } = opts
  const ctx = await browser.newContext({
    viewport,
    reducedMotion,
    isMobile,
    hasTouch,
    deviceScaleFactor: 1,
    locale: 'zh-CN',
  })
  const page = await ctx.newPage()
  track(page, name)

  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(reducedMotion === 'reduce' ? 400 : 1900)
  await shot(page, name, '01-hero')

  // 核心装置：指针改变入射角（仅精确指针环境）
  if (!isMobile) {
    await page.mouse.move(viewport.width * 0.25, viewport.height * 0.2)
    await page.waitForTimeout(700)
    await shot(page, name, '02-pointer-high')
    await page.mouse.move(viewport.width * 0.75, viewport.height * 0.85)
    await page.waitForTimeout(700)
    await shot(page, name, '03-pointer-low')
  } else {
    await page.touchscreen.tap(viewport.width * 0.5, viewport.height * 0.35)
    await page.waitForTimeout(400)
  }

  // 长序列：逐章节滚动
  const stops = [
    ['#think', '10-think'],
    ['#make', '11-make'],
    ['#collab', '12-collab'],
    ['#threshold', '13-threshold'],
    ['#colophon', '14-colophon'],
  ]
  for (const [sel, file] of stops) {
    await page.locator(sel).scrollIntoViewIfNeeded()
    // 等待最晚的擦入完成（delay 0.4s + duration 0.9s）
    await page.waitForTimeout(reducedMotion === 'reduce' ? 300 : 1450)
    await shot(page, name, file)
    if (sel === '#think') {
      const dispMid = (await page.locator('.hud__item').nth(1).textContent()) || ''
      const pct = Number((dispMid.match(/(\d+)/) || [])[1] ?? -1)
      results.push(`${name}: HUD@think "${dispMid.trim()}"`)
      if (pct <= 0) errors.push(`[${name}] dispersion did not open while scrolling (got ${pct})`)
    }
  }

  // HUD 读数在页尾应收束
  const dispText = await page.locator('.hud__item').nth(1).textContent()
  results.push(`${name}: HUD@colophon "${dispText?.trim()}"`)

  // 暗线显影
  await page.locator('#threshold').scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  if (!isMobile) {
    await page.keyboard.down('Shift')
    await page.waitForTimeout(reducedMotion === 'reduce' ? 200 : 800)
    let dark = await page.getAttribute('.page', 'data-dark')
    await shot(page, name, '20-dark-shift')
    results.push(`${name}: shift-hold data-dark=${dark}`)
    if (dark !== 'on') errors.push(`[${name}] Shift hold did not enable dark layer`)
    await page.keyboard.up('Shift')
    await page.waitForTimeout(300)

    // 长按切换
    await page.mouse.move(viewport.width * 0.5, viewport.height * 0.2)
    await page.mouse.down()
    await page.waitForTimeout(550)
    await page.mouse.up()
    await page.waitForTimeout(600)
    dark = await page.getAttribute('.page', 'data-dark')
    results.push(`${name}: long-press data-dark=${dark}`)
    if (dark !== 'on') errors.push(`[${name}] long-press did not toggle dark layer`)
    await shot(page, name, '21-dark-longpress')
    // 复位
    await page.locator('.threshold__btn').click()
    await page.waitForTimeout(300)
  } else {
    await page.locator('.threshold__btn').click()
    await page.waitForTimeout(600)
    const dark = await page.getAttribute('.page', 'data-dark')
    results.push(`${name}: button-toggle data-dark=${dark}`)
    if (dark !== 'on') errors.push(`[${name}] toggle button did not enable dark layer`)
    await shot(page, name, '20-dark-toggle')
    await page.locator('.threshold__btn').click()
    await page.waitForTimeout(300)
  }

  // 键盘走查
  if (!isMobile) {
    await page.evaluate(() => {
      window.scrollTo(0, 0)
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    })
    await page.waitForTimeout(400)
    const order = []
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab')
      order.push(
        await page.evaluate(() => {
          const el = document.activeElement
          if (!el) return 'none'
          return `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}`
        }),
      )
    }
    results.push(`${name}: tab ${order.join(' → ')}`)
    await page.waitForTimeout(800)
    await shot(page, name, '22-focus')
    const hasHudFocus = order.some((o) => o.includes('hud') || o.includes('topbar'))
    if (!hasHudFocus) errors.push(`[${name}] keyboard path cannot reach controls: ${order.join(',')}`)
  }

  await ctx.close()
}

const browser = await chromium.launch({ channel: 'chrome', headless: true })

try {
  await run('desktop', { viewport: { width: 1440, height: 900 } })
  await run('mobile', {
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  })
  await run('desktop-rm', {
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  await run('mobile-rm', {
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  })
} finally {
  await browser.close()
}

console.log('—— 验收记录 ——')
for (const r of results) console.log('  ' + r)
if (errors.length) {
  console.log('—— 失败项 ——')
  for (const e of errors) console.log('  ' + e)
  process.exit(1)
}
console.log('OK：4 组场景通过，无 console/page 错误。截图位于 acceptance-output/')
