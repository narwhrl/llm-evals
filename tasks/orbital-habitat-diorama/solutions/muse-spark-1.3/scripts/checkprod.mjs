import { chromium } from 'playwright-core'

const target = process.argv[2] || 'http://localhost:5200/'
const browser = await chromium.launch({ executablePath: 'C:\\Users\\narwhrl\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
const bad = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push(String(e)))
page.on('response', r => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`) })
await page.goto(target, { waitUntil: 'load' })
await page.waitForFunction(() => window.__diorama, null, { timeout: 30000 })
await page.waitForTimeout(2500)
await page.screenshot({ path: process.argv[3] || 'diag-prod.png' })
console.log('state:', JSON.stringify(await page.evaluate(() => window.__diorama.state())))
console.log('bad responses:', bad.length ? bad : 'none')
console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
