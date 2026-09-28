import {
  CanvasTexture,
  ClampToEdgeWrapping,
  LinearFilter,
  LinearMipmapLinearFilter,
  NearestFilter,
  RepeatWrapping,
  SRGBColorSpace,
} from 'three';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  return { c, ctx };
}

function tex(c, opts = {}) {
  const t = new CanvasTexture(c);
  t.colorSpace = opts.colorSpace ?? SRGBColorSpace;
  t.wrapS = opts.wrapS ?? RepeatWrapping;
  t.wrapT = opts.wrapT ?? RepeatWrapping;
  t.repeat.set(opts.repeatX ?? 1, opts.repeatY ?? 1);
  t.anisotropy = opts.anisotropy ?? 4;
  t.minFilter = opts.nearest ? NearestFilter : LinearMipmapLinearFilter;
  t.magFilter = opts.nearest ? NearestFilter : LinearFilter;
  t.needsUpdate = true;
  return t;
}

function hash(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function noise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x, y, oct = 4) {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < oct; i += 1) {
    v += noise(x * f, y * f) * a;
    a *= 0.5;
    f *= 2;
  }
  return v;
}

function fillNoise(ctx, w, h, base, vary, scale) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const n = fbm(x * scale, y * scale, 5);
      const k = (n - 0.5) * vary;
      const i = (y * w + x) * 4;
      d[i] = Math.max(0, Math.min(255, base[0] + k));
      d[i + 1] = Math.max(0, Math.min(255, base[1] + k * 0.92));
      d[i + 2] = Math.max(0, Math.min(255, base[2] + k * 0.85));
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

export function makeToonGradient(stops) {
  const { c, ctx } = canvas(stops.length, 1);
  stops.forEach((hex, i) => {
    ctx.fillStyle = hex;
    ctx.fillRect(i, 0, 1, 1);
  });
  const t = tex(c, { nearest: true, wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
  t.generateMipmaps = false;
  return t;
}

export function makeAsphalt() {
  const { c, ctx } = canvas(512, 512);
  fillNoise(ctx, 512, 512, [38, 40, 44], 28, 0.018);
  ctx.strokeStyle = 'rgba(18,18,20,0.35)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 40; i += 1) {
    ctx.beginPath();
    let x = hash(i, 2) * 512;
    let y = hash(i, 9) * 512;
    ctx.moveTo(x, y);
    for (let k = 0; k < 6; k += 1) {
      x += (hash(i, k + 3) - 0.5) * 48;
      y += (hash(i, k + 17) - 0.5) * 48;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(12,14,16,0.28)';
  for (let i = 0; i < 80; i += 1) {
    ctx.beginPath();
    ctx.ellipse(hash(i, 1) * 512, hash(i, 4) * 512, 6 + hash(i, 8) * 18, 3 + hash(i, 11) * 10, hash(i, 6) * 4, 0, Math.PI * 2);
    ctx.fill();
  }
  return tex(c, { repeatX: 3, repeatY: 3 });
}

export function makeConcrete() {
  const { c, ctx } = canvas(512, 512);
  fillNoise(ctx, 512, 512, [118, 120, 124], 36, 0.03);
  ctx.fillStyle = 'rgba(70,72,76,0.35)';
  for (let i = 0; i < 220; i += 1) {
    ctx.fillRect(hash(i, 3) * 512, hash(i, 7) * 512, 1 + hash(i, 2) * 3, 1 + hash(i, 5) * 2);
  }
  ctx.strokeStyle = 'rgba(60,62,66,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 240);
  ctx.lineTo(512, 268);
  ctx.moveTo(180, 0);
  ctx.lineTo(210, 512);
  ctx.stroke();
  return tex(c, { repeatX: 2, repeatY: 2 });
}

export function makePlinth() {
  const { c, ctx } = canvas(512, 512);
  fillNoise(ctx, 512, 512, [132, 134, 138], 22, 0.025);
  ctx.strokeStyle = 'rgba(90,92,96,0.45)';
  ctx.lineWidth = 8;
  ctx.strokeRect(18, 18, 476, 476);
  ctx.strokeStyle = 'rgba(40,42,46,0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, 432, 432);
  return tex(c);
}

export function makeWood() {
  const { c, ctx } = canvas(256, 256);
  fillNoise(ctx, 256, 256, [108, 82, 58], 30, 0.04);
  for (let x = 0; x < 256; x += 1) {
    const n = fbm(x * 0.08, 2.2, 4);
    ctx.strokeStyle = `rgba(60,40,24,${0.08 + n * 0.18})`;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + (n - 0.5) * 8, 256);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(40,28,16,0.35)';
  for (let i = 0; i < 8; i += 1) {
    ctx.fillRect(0, 28 + i * 28, 256, 2);
  }
  return tex(c);
}

export function makeCardboard() {
  const { c, ctx } = canvas(256, 256);
  fillNoise(ctx, 256, 256, [132, 112, 78], 24, 0.05);
  ctx.strokeStyle = 'rgba(70,55,30,0.35)';
  ctx.strokeRect(12, 12, 232, 232);
  ctx.strokeRect(20, 20, 216, 216);
  ctx.fillStyle = 'rgba(40,30,16,0.2)';
  ctx.fillRect(0, 120, 256, 16);
  return tex(c);
}

export function makeRust() {
  const { c, ctx } = canvas(256, 256);
  fillNoise(ctx, 256, 256, [96, 62, 44], 50, 0.05);
  ctx.globalCompositeOperation = 'multiply';
  for (let i = 0; i < 30; i += 1) {
    const g = ctx.createRadialGradient(
      hash(i, 1) * 256,
      hash(i, 2) * 256,
      2,
      hash(i, 1) * 256,
      hash(i, 2) * 256,
      12 + hash(i, 3) * 40,
    );
    g.addColorStop(0, 'rgba(40,18,10,0.8)');
    g.addColorStop(1, 'rgba(40,18,10,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  }
  ctx.globalCompositeOperation = 'source-over';
  return tex(c);
}

export function makePaintMetal(rgb, stain = [40, 28, 18]) {
  const { c, ctx } = canvas(256, 256);
  fillNoise(ctx, 256, 256, rgb, 22, 0.04);
  ctx.fillStyle = `rgba(${stain[0]},${stain[1]},${stain[2]},0.22)`;
  for (let i = 0; i < 16; i += 1) {
    ctx.beginPath();
    ctx.ellipse(hash(i, 2) * 256, hash(i, 6) * 256, 20, 10, hash(i, 1) * 5, 0, Math.PI * 2);
    ctx.fill();
  }
  return tex(c);
}

export function makeTin() {
  const { c, ctx } = canvas(256, 256);
  fillNoise(ctx, 256, 256, [92, 98, 104], 18, 0.06);
  ctx.strokeStyle = 'rgba(30,32,36,0.28)';
  for (let y = 8; y < 256; y += 14) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y + 2);
    ctx.stroke();
  }
  return tex(c, { repeatX: 2, repeatY: 2 });
}

export function makeGlass() {
  const { c, ctx } = canvas(256, 256);
  ctx.fillStyle = '#6d7f88';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = 'rgba(20,24,28,0.28)';
  for (let i = 0; i < 18; i += 1) {
    const x = hash(i, 3) * 256;
    ctx.globalAlpha = 0.15 + hash(i, 8) * 0.25;
    ctx.fillRect(x, 0, 1 + hash(i, 2) * 3, 256);
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'rgba(200,220,230,0.12)';
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(90, 0);
  ctx.lineTo(40, 256);
  ctx.lineTo(0, 256);
  ctx.fill();
  return tex(c);
}

export function makeRainGlass() {
  const { c, ctx } = canvas(256, 256);
  ctx.clearRect(0, 0, 256, 256);
  for (let i = 0; i < 70; i += 1) {
    const x = hash(i, 1) * 256;
    const y = hash(i, 4) * 256;
    const h = 18 + hash(i, 7) * 70;
    ctx.strokeStyle = `rgba(210,230,240,${0.12 + hash(i, 9) * 0.28})`;
    ctx.lineWidth = 1 + hash(i, 2);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (hash(i, 5) - 0.5) * 6, y + h);
    ctx.stroke();
    ctx.fillStyle = `rgba(200,220,230,${0.2 + hash(i, 6) * 0.35})`;
    ctx.beginPath();
    ctx.ellipse(x, y + h, 1.4, 2.2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  const t = tex(c, { wrapS: RepeatWrapping, wrapT: RepeatWrapping });
  t.colorSpace = SRGBColorSpace;
  return t;
}

export function makeGraffiti(kind) {
  const { c, ctx } = canvas(256, 256);
  ctx.clearRect(0, 0, 256, 256);
  if (kind === 't') {
    ctx.translate(128, 140);
    ctx.rotate(-0.12);
    ctx.fillStyle = '#c45a24';
    ctx.font = 'bold 150px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('T', 0, 0);
  } else if (kind === 'ct') {
    ctx.translate(128, 128);
    ctx.rotate(0.08);
    ctx.strokeStyle = '#3d6d9a';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(0, -6, 78, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#3d6d9a';
    ctx.font = 'bold 54px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CT', 0, 16);
  } else if (kind === 'hazard') {
    ctx.fillStyle = '#c2a226';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#161616';
    ctx.save();
    ctx.translate(128, 128);
    ctx.rotate(-0.7);
    for (let i = -4; i < 5; i += 1) {
      ctx.fillRect(-200, i * 36, 400, 16);
    }
    ctx.restore();
  } else if (kind === 'freight') {
    ctx.fillStyle = 'rgba(240,236,220,0.82)';
    ctx.font = 'bold 42px monospace';
    ctx.fillText('MSKU', 24, 80);
    ctx.font = 'bold 56px monospace';
    ctx.fillText('482 19 0', 18, 150);
    ctx.strokeStyle = 'rgba(240,236,220,0.7)';
    ctx.strokeRect(12, 20, 232, 160);
  } else {
    ctx.fillStyle = '#7aa0b8';
    ctx.font = 'italic 64px sans-serif';
    ctx.rotate(-0.2);
    ctx.fillText('CLEAR', 20, 140);
  }
  const t = tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
  return t;
}

export function makeBombMark(letter) {
  const { c, ctx } = canvas(512, 512);
  ctx.clearRect(0, 0, 512, 512);
  ctx.translate(256, 256);
  ctx.strokeStyle = 'rgba(236,236,232,0.92)';
  ctx.lineWidth = 10;
  ctx.setLineDash([18, 10]);
  ctx.beginPath();
  ctx.arc(0, 0, 168, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(0, 0, 132, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(236,236,232,0.94)';
  ctx.font = 'bold 168px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 0, 8);
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('BOMB SITE', 0, 118);
  const t = tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
  return t;
}

export function makeSign(title, body, bg = '#2a2d32', fg = '#d8d4c8') {
  const { c, ctx } = canvas(256, 160);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 160);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 248, 152);
  ctx.fillStyle = fg;
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText(title, 18, 48);
  ctx.font = '16px sans-serif';
  const lines = body.split('\n');
  lines.forEach((line, i) => ctx.fillText(line, 18, 82 + i * 22));
  return tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
}

export function makeRoster() {
  const { c, ctx } = canvas(256, 320);
  ctx.fillStyle = '#d8c9a4';
  ctx.fillRect(0, 0, 256, 320);
  ctx.fillStyle = '#3a2a18';
  ctx.font = 'bold 20px serif';
  ctx.fillText('NIGHT WATCH', 24, 36);
  ctx.font = '14px serif';
  ['00:00  —  empty', '04:00  —  empty', '08:00  —  —', '12:00  —  —', '16:00  —  rain', '20:00  —  rain'].forEach(
    (row, i) => ctx.fillText(row, 24, 80 + i * 32),
  );
  ctx.strokeStyle = 'rgba(40,24,10,0.35)';
  ctx.strokeRect(12, 12, 232, 296);
  return tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
}

export function makeNewspaper() {
  const { c, ctx } = canvas(256, 160);
  ctx.fillStyle = '#c9c2ad';
  ctx.fillRect(0, 0, 256, 160);
  ctx.fillStyle = '#2c2618';
  ctx.font = 'bold 22px serif';
  ctx.fillText('YARD CLOSED', 12, 32);
  ctx.fillRect(12, 44, 140, 6);
  ctx.fillRect(12, 58, 230, 3);
  ctx.fillRect(12, 68, 210, 3);
  ctx.fillRect(12, 78, 220, 3);
  ctx.fillRect(12, 96, 80, 50);
  ctx.fillRect(102, 96, 140, 3);
  ctx.fillRect(102, 108, 130, 3);
  ctx.fillRect(102, 120, 136, 3);
  return tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
}

export function makeBadge() {
  const { c, ctx } = canvas(256, 256);
  ctx.clearRect(0, 0, 256, 256);
  ctx.translate(128, 128);
  ctx.fillStyle = '#c8b24a';
  ctx.beginPath();
  ctx.moveTo(0, -88);
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    ctx.lineTo(Math.cos(a) * 88, Math.sin(a) * 88);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#1d2b44';
  ctx.beginPath();
  ctx.arc(0, 0, 58, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#d8d2c0';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CT', 0, 10);
  const t = tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
  return t;
}

export function makeWarning() {
  const { c, ctx } = canvas(512, 128);
  ctx.fillStyle = '#111318';
  ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = '#d4c24a';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('RESTRICTED  LINE', 256, 52);
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('NO  CROSSING', 256, 90);
  return tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
}

export function makeBulletDecal() {
  const { c, ctx } = canvas(128, 128);
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(12,12,12,0.85)';
  const holes = [
    [40, 44, 5],
    [70, 38, 4],
    [58, 70, 6],
    [88, 62, 3.5],
    [34, 78, 3],
    [96, 88, 4],
    [50, 96, 2.5],
  ];
  holes.forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(30,30,30,0.45)';
    ctx.beginPath();
    ctx.arc(x, y, r + 2.5, 0, Math.PI * 2);
    ctx.stroke();
  });
  const t = tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
  return t;
}

export function makeRoadSign() {
  const { c, ctx } = canvas(256, 256);
  ctx.fillStyle = '#2f6a3a';
  ctx.beginPath();
  ctx.moveTo(128, 18);
  ctx.lineTo(238, 128);
  ctx.lineTo(128, 238);
  ctx.lineTo(18, 128);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#e8e4d4';
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.fillStyle = '#e8e4d4';
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('!', 128, 128);
  return tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
}

export function makeRubber() {
  const { c, ctx } = canvas(128, 128);
  fillNoise(ctx, 128, 128, [28, 28, 30], 12, 0.1);
  ctx.strokeStyle = 'rgba(10,10,12,0.5)';
  for (let i = 8; i < 128; i += 10) {
    ctx.beginPath();
    ctx.arc(64, 64, i * 0.42, 0, Math.PI * 2);
    ctx.stroke();
  }
  return tex(c);
}

export function makeRippleNormal() {
  const { c, ctx } = canvas(256, 256);
  const img = ctx.createImageData(256, 256);
  for (let y = 0; y < 256; y += 1) {
    for (let x = 0; x < 256; x += 1) {
      const n = fbm(x * 0.06, y * 0.06, 3);
      const i = (y * 256 + x) * 4;
      img.data[i] = 128 + (n - 0.5) * 80;
      img.data[i + 1] = 128 + (fbm(x * 0.06 + 20, y * 0.06, 3) - 0.5) * 80;
      img.data[i + 2] = 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return tex(c, { repeatX: 2, repeatY: 2 });
}

export function makeRainStreak() {
  const { c, ctx } = canvas(32, 128);
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, 'rgba(210,230,240,0)');
  g.addColorStop(0.35, 'rgba(210,230,240,0.55)');
  g.addColorStop(1, 'rgba(210,230,240,0)');
  ctx.fillStyle = g;
  ctx.filter = 'blur(0.6px)';
  ctx.fillRect(13, 0, 4, 128);
  const t = tex(c, { wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping });
  return t;
}

let cache = null;

export function buildTextures() {
  if (cache) return cache;
  cache = {
    toon: makeToonGradient(['#3a4048', '#6a727c', '#9aa3ae', '#e4e8ee']),
    toonWarm: makeToonGradient(['#3c3228', '#6e5844', '#a88864', '#edd2a8']),
    asphalt: makeAsphalt(),
    concrete: makeConcrete(),
    plinth: makePlinth(),
    wood: makeWood(),
    cardboard: makeCardboard(),
    rust: makeRust(),
    tin: makeTin(),
    glass: makeGlass(),
    rainGlass: makeRainGlass(),
    rubber: makeRubber(),
    rustBlue: makePaintMetal([46, 78, 122]),
    rustOrange: makePaintMetal([156, 78, 36]),
    rustTeal: makePaintMetal([38, 92, 90]),
    rustRed: makePaintMetal([110, 36, 36]),
    police: makePaintMetal([28, 48, 78]),
    graffitiT: makeGraffiti('t'),
    graffitiCT: makeGraffiti('ct'),
    graffitiTag: makeGraffiti('tag'),
    hazard: makeGraffiti('hazard'),
    freight: makeGraffiti('freight'),
    bombA: makeBombMark('A'),
    bombB: makeBombMark('B'),
    roster: makeRoster(),
    news: makeNewspaper(),
    badge: makeBadge(),
    warning: makeWarning(),
    bullets: makeBulletDecal(),
    roadSign: makeRoadSign(),
    freightSign: makeSign('BAY 04', 'UNLOAD\nONLY', '#2b3036', '#e6e0d0'),
    policeSign: makeSign('POLICE', 'UNIT 04', '#1d2b44', '#e8e4d4'),
    ripple: makeRippleNormal(),
    rain: makeRainStreak(),
  };
  return cache;
}
