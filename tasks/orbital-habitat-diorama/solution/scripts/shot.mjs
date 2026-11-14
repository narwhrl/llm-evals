import { chromium } from 'playwright-core'

const URL = process.env.URL || 'http://localhost:5199/'
const OUT = process.env.OUT || 'evidence'
const shots = [
  { name: '01-day', setup: `__diorama.setFast(false); __diorama.setCruise(false); __diorama.setPlant(true); __diorama.focus(null); __diorama.setTime(0.19)` , wait: 2500 },
  { name: '02-night', setup: `__diorama.setTime(0.75)`, wait: 2500 },
  { name: '03-focus-workstation', setup: `__diorama.setTime(0.22); __diorama.focus('workstation')`, wait: 2200 },
  { name: '04-night-cruise', setup: `__diorama.focus(null); __diorama.setTime(0.75); __diorama.setCruise(true)`, wait: 2500 },
  { name: '05-fast-forward', setup: `__diorama.setCruise(false); __diorama.setTime(0.82); __diorama.setFast(true)`, wait: 3500 }
]

const browser = await chromium.launch({ executablePath: 'C:\\Users\\narwhrl\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push(String(e)))
await page.goto(URL, { waitUntil: 'load' })
await page.waitForFunction(() => window.__diorama, null, { timeout: 30000 })
await page.waitForTimeout(1500)
for (const s of shots) {
  await page.evaluate(s.setup)
  await page.waitForTimeout(s.wait)
  await page.screenshot({ path: `${OUT}/${s.name}.png` })
  console.log('shot', s.name, JSON.stringify(await page.evaluate(() => window.__diorama.state())))
}
console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
