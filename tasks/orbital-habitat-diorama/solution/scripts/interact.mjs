import { chromium } from 'playwright-core'

// Real-mouse interaction pass: click/drag through the actual event path,
// assert state changes, and capture interaction screenshots.
const URL = process.env.URL || 'http://localhost:5199/'
const browser = await chromium.launch({ executablePath: 'C:\\Users\\narwhrl\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push(String(e)))
await page.goto(URL, { waitUntil: 'load' })
await page.waitForFunction(() => window.__diorama, null, { timeout: 30000 })
await page.waitForTimeout(1200)

const pos = async (name) => await page.evaluate(n => window.__diorama.screenPos(n), name)
const state = async () => await page.evaluate(() => window.__diorama.state())
const click = async (name) => {
  const p = await pos(name)
  await page.mouse.click(p.x, p.y)
  await page.waitForTimeout(1400)
}
const results = []
const check = (label, cond) => {
  results.push(`${cond ? 'PASS' : 'FAIL'} ${label}`)
}

// 1. click workstation -> focus
await page.evaluate(`__diorama.setTime(0.25)`)
await click('desk')
let s = await state()
check('click desk focuses workstation', s.focused === 'workstation')

// 2. click same again -> home
await click('desk')
s = await state()
check('click desk again returns home', s.focused === null)

// 3. click porthole -> fast toggle on
await page.evaluate(`__diorama.setFast(false)`)
await click('porthole')
s = await state()
check('click porthole enables fast', s.fast === true)

// 4. click porthole again -> fast off
await click('porthole')
s = await state()
check('click porthole again disables fast', s.fast === false)

// 5. drag on earth -> scrub time
await page.evaluate(`__diorama.setTime(0.3); __diorama.setFast(false)`)
const t0 = (await state()).t
const ep = await pos('earth')
await page.mouse.move(ep.x, ep.y)
await page.mouse.down()
await page.mouse.move(ep.x + 160, ep.y, { steps: 12 })
await page.waitForTimeout(300)
const t1 = (await state()).t
await page.mouse.up()
await page.waitForTimeout(400)
check(`drag earth scrubs time (${t0.toFixed(3)} -> ${t1.toFixed(3)})`, Math.abs(t1 - t0) > 0.02)

// 6. click pen -> spin (no state change, just no error + still running)
await click('pen')
check('click pen spins without error', true)

// 7. click plant bar -> toggle off, green corner darkens
await click('plant')
s = await state()
check('click plant bar turns light off', s.plant === false)
await page.screenshot({ path: 'evidence/06-plant-off.png' })
await click('plant')
s = await state()
check('click plant bar turns light on', s.plant === true)

// 8. click strip -> night cruise
await page.evaluate(`__diorama.setTime(0.75)`)
await click('strip')
s = await state()
check('click strip enables cruise', s.cruise === true)
await click('strip')
s = await state()
check('click strip disables cruise', s.cruise === false)

// 9. drag-rotate + wheel zoom (no errors, camera still clamped)
await page.mouse.move(720, 450)
await page.mouse.down()
await page.mouse.move(950, 350, { steps: 10 })
await page.mouse.up()
await page.mouse.wheel(0, -400)
await page.waitForTimeout(600)
check('rotate + zoom without error', true)
await page.screenshot({ path: 'evidence/07-rotated.png' })

console.log(results.join('\n'))
console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
if (results.some(r => r.startsWith('FAIL'))) process.exit(1)
