import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const SHOTS = join(process.cwd(), 'scripts', 'shots');
const exe = existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const files = readdirSync(SHOTS).filter((f) => f.endsWith('.png')).sort();
const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage();

for (const f of files) {
  const b64 = readFileSync(join(SHOTS, f)).toString('base64');
  const out = await page.evaluate(async (src) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + src;
    await img.decode();
    const W = 64, H = 32;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.drawImage(img, 0, 0, W, H);
    const d = x.getImageData(0, 0, W, H).data;
    let red = 0, dark = 0;
    const rows = [];
    for (let y = 0; y < H; y++) {
      let row = '';
      for (let xi = 0; xi < W; xi++) {
        const i = (y * W + xi) * 4;
        const r = d[i], g = d[i + 1], bl = d[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * bl;
        const isRed = r > 120 && g < 90 && bl < 90;
        const isDark = lum < 140;
        if (isRed) red++;
        if (isDark) dark++;
        row += isRed ? 'R' : isDark ? '#' : lum < 225 ? '+' : '.';
      }
      rows.push(row);
    }
    return { w: img.width, h: img.height, red, dark, ascii: rows.join('\n') };
  }, b64);
  console.log(`\n==== ${f}  ${out.w}x${out.h}  red=${out.red} dark=${out.dark}`);
  console.log(out.ascii);
}

await browser.close();
