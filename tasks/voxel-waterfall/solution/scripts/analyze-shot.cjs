// 临时验证工具：解码 PNG 截图并输出区域色彩统计（交付前保留于 scripts/，用于复现验收）。
const zlib = require('zlib');
const fs = require('fs');

function decodePng(buf) {
  let pos = 8;
  let w = 0;
  let h = 0;
  let colorType = 6;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      colorType = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    }
    pos += 12 + len;
    if (type === 'IEND') break;
  }
  const bpp = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * bpp;
  const out = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    const rowStart = y * (stride + 1) + 1;
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0;
      const b = prev ? prev[i] : 0;
      let v = raw[rowStart + i];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) {
        const pa = Math.abs(b);
        const pb = Math.abs(a - b);
        v += pa <= pb ? b : a;
      }
      cur[i] = v & 255;
    }
  }
  return { w, h, bpp, px: out };
}

function analyze(img) {
  const { w, h, bpp, px } = img;
  const colors = new Set();
  let waterish = 0;
  let terrainish = 0;
  let bright = 0;
  let total = 0;
  let topR = 0;
  let topG = 0;
  let topB = 0;
  let topN = 0;
  let midWhite = 0;
  let midN = 0;
  let botR = 0;
  let botG = 0;
  let botB = 0;
  let botN = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * bpp;
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      total++;
      colors.add(((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3));
      if (b > r + 18 && b > g + 8 && b > 60) waterish++;
      const mx = Math.max(r, g, b);
      const mn = Math.min(r, g, b);
      if (mx > 45 && mx - mn < 60 && r > b - 10 && g > b - 5) terrainish++;
      if (r > 200 && g > 200 && b > 200) bright++;
      if (y < h * 0.12) {
        topR += r;
        topG += g;
        topB += b;
        topN++;
      }
      if (y > h * 0.3 && y < h * 0.62) {
        midN++;
        if (r > 195 && g > 198 && b > 205) midWhite++;
      }
      if (y > h * 0.8) {
        botR += r;
        botG += g;
        botB += b;
        botN++;
      }
    }
  }
  return {
    size: `${w}x${h}`,
    uniqueColors: colors.size,
    waterShare: +(waterish / total).toFixed(4),
    terrainShare: +(terrainish / total).toFixed(4),
    brightShare: +(bright / total).toFixed(4),
    topMean: [Math.round(topR / topN), Math.round(topG / topN), Math.round(topB / topN)],
    midWhiteShare: +(midWhite / midN).toFixed(4),
    botMean: [Math.round(botR / botN), Math.round(botG / botN), Math.round(botB / botN)],
  };
}

if (process.argv[2]) {
  const img = decodePng(fs.readFileSync(process.argv[2]));
  console.log(JSON.stringify(analyze(img), null, 2));
}

module.exports = { decodePng, analyze };
