import * as THREE from 'three';
import { rand, range } from './rng.js';

export function makeCanvas(w, h = w) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export function toTexture(canvas, { srgb = true, repeat = true } = {}) {
  const t = new THREE.CanvasTexture(canvas);
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

// fn(u, v, out) writes RGBA 0..255 into `out`; one shared array avoids per-pixel allocation.
export function paintPixels(ctx, w, h, fn) {
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const out = [0, 0, 0, 255];
  let i = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      out[3] = 255;
      fn(x / w, y / h, out);
      d[i++] = out[0];
      d[i++] = out[1];
      d[i++] = out[2];
      d[i++] = out[3];
    }
  }
  ctx.putImageData(img, 0, 0);
}

export function cracks(ctx, size, count, color, width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < count; i++) {
    let x = rand() * size;
    let y = rand() * size;
    let a = rand() * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const n = 6 + rand() * 16;
    for (let k = 0; k < n; k++) {
      a += range(-0.8, 0.8);
      const l = range(3, 12) * (size / 512);
      x += Math.cos(a) * l;
      y += Math.sin(a) * l;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

// rgb is "r,g,b"; blotches fade from alpha at the centre to 0.
export function stains(ctx, size, count, rgb, alpha, rMin, rMax) {
  for (let i = 0; i < count; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = range(rMin, rMax);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${rgb},${alpha})`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
}

// Vertical dirt / rust runs from a start row downwards.
export function streaksDown(ctx, size, count, rgb, alpha, maxLen, fromTop = false) {
  for (let i = 0; i < count; i++) {
    const x = rand() * size;
    const y = fromTop ? 0 : rand() * size * 0.7;
    const len = range(maxLen * 0.3, maxLen);
    const w = range(2, 9) * (size / 512);
    const g = ctx.createLinearGradient(0, y, 0, y + len);
    g.addColorStop(0, `rgba(${rgb},${alpha})`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, len);
  }
}

export function speckle(ctx, size, count, rgb, alphaMax, rMax = 1.5) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = `rgba(${rgb},${rand() * alphaMax})`;
    const r = rand() * rMax + 0.3;
    ctx.fillRect(rand() * size, rand() * size, r, r);
  }
}

export function scratches(ctx, size, count, rgb, alpha) {
  ctx.lineWidth = 0.8;
  for (let i = 0; i < count; i++) {
    ctx.strokeStyle = `rgba(${rgb},${rand() * alpha})`;
    const x = rand() * size;
    const y = rand() * size;
    const a = rand() * Math.PI;
    const l = range(6, 40) * (size / 512);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
    ctx.stroke();
  }
}
