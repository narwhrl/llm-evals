import * as THREE from 'three';
import { makeCanvas, toTexture, rng } from './utils.js';

function speckle(ctx, w, h, r, colors, count) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = colors[Math.floor(r() * colors.length)];
    const s = 1 + r() * 2.6;
    ctx.fillRect(r() * w, r() * h, s, s * (0.6 + r()));
  }
}

function makeWood(base, dark, light, seed) {
  const r = rng(seed);
  const c = makeCanvas(512, 512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 170; i++) {
    const y = r() * 512;
    ctx.strokeStyle = r() > 0.5 ? dark : light;
    ctx.globalAlpha = 0.06 + r() * 0.16;
    ctx.lineWidth = 0.6 + r() * 2.4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 24) {
      ctx.lineTo(x, y + Math.sin(x / 60 + i) * (1.5 + r() * 2));
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  for (let k = 0; k < 5; k++) {
    const x = r() * 512, y = r() * 512;
    ctx.strokeStyle = dark;
    ctx.globalAlpha = 0.22;
    for (let j = 0; j < 4; j++) {
      ctx.beginPath();
      ctx.ellipse(x, y, 5 + j * 6, 2 + j * 2.4, 0.3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
  return toTexture(c);
}

function makeGrass() {
  const r = rng(31);
  const c = makeCanvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#6d8b49';
  ctx.fillRect(0, 0, 256, 256);
  speckle(ctx, 256, 256, r, ['#7d9c55', '#5f7c40', '#88a75f', '#6a884a', '#93ad68'], 4200);
  for (let i = 0; i < 500; i++) {
    const x = r() * 256, y = r() * 256;
    ctx.strokeStyle = r() > 0.5 ? '#a0b978' : '#4f6b36';
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (r() - 0.5) * 3, y - 2 - r() * 3);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return toTexture(c);
}

function makeGravel() {
  const r = rng(53);
  const c = makeCanvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#8d8576';
  ctx.fillRect(0, 0, 256, 256);
  speckle(ctx, 256, 256, r, ['#a49b8a', '#6e685c', '#b3a998', '#7a7466', '#5c574d'], 5200);
  return toTexture(c);
}

function makeRoad() {
  const r = rng(67);
  const c = makeCanvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#b6a181';
  ctx.fillRect(0, 0, 256, 256);
  speckle(ctx, 256, 256, r, ['#c6b393', '#9e8b6e', '#d0bd9c', '#ab9878'], 3600);
  return toTexture(c);
}

function makeWater() {
  const r = rng(83);
  const c = makeCanvas(512, 256);
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#3c8195');
  g.addColorStop(0.5, '#306e88');
  g.addColorStop(1, '#285f7b');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 256);
  // Wide, soft bands instead of thin strokes: thin lines alias into scratches
  // when the ribbon UVs repeat along the river.
  for (let i = 0; i < 26; i++) {
    const y = r() * 256;
    const h = 4 + r() * 11;
    const band = ctx.createLinearGradient(0, y, 0, y + h);
    band.addColorStop(0, 'rgba(190,228,232,0)');
    band.addColorStop(0.5, r() > 0.45 ? 'rgba(190,228,232,0.09)' : 'rgba(18,62,88,0.10)');
    band.addColorStop(1, 'rgba(190,228,232,0)');
    ctx.fillStyle = band;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 32) {
      ctx.lineTo(x, y + Math.sin(x / 90 + i) * 2.5);
    }
    for (let x = 512; x >= 0; x -= 32) {
      ctx.lineTo(x, y + h + Math.sin(x / 90 + i) * 2.5);
    }
    ctx.closePath();
    ctx.fill();
  }
  return toTexture(c);
}

function makeTile() {
  const r = rng(97);
  const c = makeCanvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#8c4b3b';
  ctx.fillRect(0, 0, 256, 256);
  const rows = 9, cols = 7;
  const hh = 256 / rows, ww = 256 / cols;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const off = row % 2 ? ww / 2 : 0;
      const x = col * ww + off, y = row * hh;
      const shade = 0.86 + r() * 0.26;
      ctx.fillStyle = `rgb(${Math.floor(140 * shade)},${Math.floor(74 * shade)},${Math.floor(58 * shade)})`;
      ctx.fillRect(x + 1, y + 1, ww - 2, hh - 2);
      ctx.strokeStyle = 'rgba(60,28,22,0.55)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 1, y + 1, ww - 2, hh - 2);
      ctx.fillStyle = 'rgba(255,205,170,0.10)';
      ctx.fillRect(x + 2, y + 2, ww - 4, 2);
    }
  }
  return toTexture(c);
}

function makeStone() {
  const r = rng(113);
  const c = makeCanvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#a49a88';
  ctx.fillRect(0, 0, 256, 256);
  for (let row = 0; row < 6; row++) {
    const hh = 256 / 6;
    const off = row % 2 ? 32 : 0;
    for (let col = -1; col < 5; col++) {
      const ww = 64;
      const x = col * ww + off, y = row * hh;
      const s = 0.88 + r() * 0.24;
      ctx.fillStyle = `rgb(${Math.floor(164 * s)},${Math.floor(154 * s)},${Math.floor(136 * s)})`;
      ctx.fillRect(x + 2, y + 2, ww - 4, hh - 4);
      ctx.strokeStyle = 'rgba(70,62,52,0.5)';
      ctx.strokeRect(x + 2, y + 2, ww - 4, hh - 4);
    }
  }
  speckle(ctx, 256, 256, r, ['#8b8271', '#b6ac98'], 1400);
  return toTexture(c);
}

function makeEarth() {
  const r = rng(127);
  const c = makeCanvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#59432f';
  ctx.fillRect(0, 0, 256, 256);
  speckle(ctx, 256, 256, r, ['#6b5038', '#463424', '#7a5d40', '#3d2e21'], 3000);
  for (let i = 0; i < 60; i++) {
    ctx.strokeStyle = 'rgba(30,20,14,0.35)';
    ctx.lineWidth = 1 + r() * 2;
    const y = r() * 256;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y + (r() - 0.5) * 14);
    ctx.stroke();
  }
  return toTexture(c);
}

function makePlaque() {
  const c = makeCanvas(768, 160);
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 160);
  g.addColorStop(0, '#8a6c34');
  g.addColorStop(0.5, '#c39b52');
  g.addColorStop(1, '#7a5c2c');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 768, 160);
  ctx.strokeStyle = 'rgba(60,40,16,0.8)';
  ctx.lineWidth = 5;
  ctx.strokeRect(10, 10, 748, 140);
  ctx.strokeStyle = 'rgba(255,230,170,0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, 732, 124);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#2f2412';
  ctx.font = 'bold 52px Georgia, serif';
  ctx.fillText('LITTLE RAILWAY TOWN', 384, 84);
  ctx.font = '22px Georgia, serif';
  ctx.fillStyle = '#4a3818';
  ctx.fillText('·  A  T A B L E T O P   M I N I A T U R E  ·', 384, 126);
  return toTexture(c);
}

/** Painted building facade plus an emissive mask for a random subset of windows. */
export function makeFacade(opts = {}) {
  const {
    wall = '#d9c6a4',
    style = 'plaster',
    cols = 3,
    rows = 2,
    seed = 1,
    litRatio = 0.45,
  } = opts;
  const r = rng(seed);
  const c = makeCanvas(256, 256), ctx = c.getContext('2d');
  const em = makeCanvas(256, 256), ectx = em.getContext('2d');
  ectx.fillStyle = '#000000';
  ectx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, 256, 256);
  speckle(ctx, 256, 256, r, ['rgba(255,255,255,0.06)', 'rgba(60,40,20,0.07)'], 1500);

  if (style === 'brick') {
    ctx.strokeStyle = 'rgba(90,55,40,0.22)';
    ctx.lineWidth = 1;
    for (let y = 8; y < 256; y += 13) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
    }
    for (let y = 8, row = 0; y < 256; y += 13, row++) {
      for (let x = row % 2 ? 16 : 0; x < 256; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 13); ctx.stroke();
      }
    }
  } else if (style === 'timber') {
    ctx.strokeStyle = 'rgba(74,48,30,0.72)';
    ctx.lineWidth = 9;
    for (let x = 4; x < 256; x += 62) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
    }
    for (let y = 10; y < 256; y += 84) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
    }
  } else if (style === 'stone') {
    ctx.strokeStyle = 'rgba(70,60,48,0.28)';
    ctx.lineWidth = 2;
    for (let y = 14; y < 256; y += 34) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
      for (let x = (y / 34) % 2 ? 24 : 0; x < 256; x += 48) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 34); ctx.stroke();
      }
    }
  }

  // cornice and base band
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.fillRect(0, 10, 256, 7);
  ctx.fillStyle = 'rgba(50,36,24,0.20)';
  ctx.fillRect(0, 17, 256, 3);
  ctx.fillRect(0, 240, 256, 16);

  const mx = 24, top = 34, bottom = 30;
  const cellW = (256 - mx * 2) / cols;
  const cellH = (256 - top - bottom) / rows;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const wx = mx + col * cellW + cellW * 0.20;
      const ww = cellW * 0.60;
      const wy = top + row * cellH + cellH * 0.16;
      const wh = cellH * 0.62;
      ctx.fillStyle = '#3d3327';
      ctx.fillRect(wx - 4, wy - 4, ww + 8, wh + 8);
      ctx.fillStyle = '#e8dcc0';
      ctx.fillRect(wx - 3, wy - 3, ww + 6, wh + 6);
      ctx.fillStyle = '#394750';
      ctx.fillRect(wx, wy, ww, wh);
      ctx.fillStyle = 'rgba(150,190,205,0.18)';
      ctx.fillRect(wx + 1, wy + 1, ww * 0.42, wh - 2);
      ctx.strokeStyle = '#d8cbb0';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh);
      ctx.moveTo(wx, wy + wh / 2); ctx.lineTo(wx + ww, wy + wh / 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(60,44,28,0.35)';
      ctx.fillRect(wx - 5, wy + wh + 4, ww + 10, 4);

      if (r() < litRatio) {
        ectx.fillStyle = r() > 0.25 ? '#fff0c8' : '#ffdca0';
        ectx.fillRect(wx + 1, wy + 1, ww - 2, wh - 2);
      }
    }
  }
  return { map: toTexture(c), emissiveMap: toTexture(em) };
}

/** Station / shop name board; doubles as its own emissive mask at night. */
export function makeSign(title, subtitle = '') {
  const c = makeCanvas(512, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#243b33';
  ctx.fillRect(0, 0, 512, 128);
  ctx.strokeStyle = '#d9b56d';
  ctx.lineWidth = 6;
  ctx.strokeRect(9, 9, 494, 110);
  ctx.strokeStyle = 'rgba(217,181,109,0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, 476, 92);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f2dda9';
  ctx.font = 'bold 42px Georgia, serif';
  ctx.fillText(title, 256, subtitle ? 64 : 78);
  if (subtitle) {
    ctx.font = '20px Georgia, serif';
    ctx.fillStyle = '#c9ae78';
    ctx.fillText(subtitle, 256, 96);
  }
  const t = toTexture(c);
  return { map: t, emissiveMap: t };
}

export function createTextures() {
  return {
    wood: makeWood('#6b452a', '#3a2112', '#a0713f', 11),
    woodDark: makeWood('#41291a', '#22140c', '#6d4527', 19),
    grass: makeGrass(),
    gravel: makeGravel(),
    road: makeRoad(),
    water: makeWater(),
    tile: makeTile(),
    stone: makeStone(),
    earth: makeEarth(),
    plaque: makePlaque(),
  };
}
