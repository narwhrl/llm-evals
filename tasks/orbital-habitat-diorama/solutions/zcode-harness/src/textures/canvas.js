// Shared procedural texture helpers. All textures are generated at build-time of the scene
// (once, at startup) — never per frame.
import * as THREE from 'three';

let maxAnisotropy = 1;

/** Called once by main.js after the renderer exists. */
export function setMaxAnisotropy(n) {
  maxAnisotropy = Math.max(1, n | 0);
}

export const FONT = '"Segoe UI", Arial, Helvetica, sans-serif';
export const MONO = 'Consolas, "Courier New", monospace';

/**
 * Create a CanvasTexture by drawing into a fresh canvas.
 * @param {number} w
 * @param {number} h
 * @param {(ctx:CanvasRenderingContext2D, w:number, h:number) => void} draw
 * @param {{repeat?:[number,number], srgb?:boolean, anisotropy?:number, wrap?:boolean, mipmaps?:boolean}} [opts]
 * @returns {THREE.CanvasTexture}
 */
export function canvasTexture(w, h, draw, opts = {}) {
  const { repeat = null, srgb = true, anisotropy = maxAnisotropy, wrap = !!repeat, mipmaps = true } = opts;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = Math.min(anisotropy, maxAnisotropy);
  tex.generateMipmaps = mipmaps;
  tex.minFilter = mipmaps ? THREE.LinearMipmapLinearFilter : THREE.LinearFilter;
  if (wrap) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  }
  if (repeat) tex.repeat.set(repeat[0], repeat[1]);
  tex.needsUpdate = true;
  return tex;
}

/** Deterministic PRNG (mulberry32). Returns () => float in [0,1). */
export function rng(seed = 1) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(ix, iy, seed) {
  let h = (ix * 374761393 + iy * 668265263 + seed * 1442695041) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** 2D value noise in [0,1], smooth-interpolated; `period` (cells) makes it tile if given. */
export function valueNoise2(x, y, seed = 0, period = 0) {
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const fx = x - x0, fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const wrap = (v) => (period > 0 ? ((v % period) + period) % period : v);
  const a = hash2(wrap(x0), wrap(y0), seed), b = hash2(wrap(x0 + 1), wrap(y0), seed);
  const c = hash2(wrap(x0), wrap(y0 + 1), seed), d = hash2(wrap(x0 + 1), wrap(y0 + 1), seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

/** Fractal (fBm) value noise in [0,1]. */
export function fbm2(x, y, { octaves = 4, seed = 0, period = 0, gain = 0.5, lacunarity = 2 } = {}) {
  let amp = 0.5, sum = 0, norm = 0, f = 1;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise2(x * f, y * f, seed + i * 17, period ? period * f : 0);
    norm += amp;
    amp *= gain;
    f *= lacunarity;
  }
  return sum / norm;
}

/** Fill the whole canvas with fBm-modulated color noise around `base` (CSS color) — cheap paint tint. */
export function noiseFill(ctx, w, h, { base = '#d8d8d4', amount = 0.06, scale = 24, seed = 1 } = {}) {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = (fbm2((x / w) * scale, (y / h) * scale, { seed, period: scale }) - 0.5) * 2 * amount * 255;
      const i = (y * w + x) * 4;
      d[i] = clamp255(d[i] + n);
      d[i + 1] = clamp255(d[i + 1] + n);
      d[i + 2] = clamp255(d[i + 2] + n);
    }
  }
  ctx.putImageData(img, 0, 0);
}

function clamp255(v) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

/** One rivet: dark rim shadow + light dome highlight. */
export function drawRivet(ctx, x, y, r = 3) {
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.arc(x + r * 0.25, y + r * 0.3, r * 1.05, 0, Math.PI * 2);
  ctx.fill();
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.5, '#cfd2d4');
  g.addColorStop(1, '#8a8e92');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/** Row of rivets from (x0,y0) to (x1,y1) with `count` rivets (inclusive endpoints). */
export function drawRivetRow(ctx, x0, y0, x1, y1, count, r = 3) {
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    drawRivet(ctx, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, r);
  }
}

/**
 * Crisp label plate. Draws a rounded rect with text centered.
 * @param {{bg?:string, fg?:string, font?:string, pad?:number, radius?:number, border?:string, align?:'center'|'left'}} [o]
 */
export function drawLabel(ctx, text, x, y, w, h, o = {}) {
  const { bg = '#f2c230', fg = '#1a1a1a', font = `700 ${Math.round(h * 0.6)}px ${FONT}`, radius = h * 0.15, border = null, align = 'center', pad = h * 0.2 } = o;
  roundRect(ctx, x, y, w, h, radius);
  ctx.fillStyle = bg;
  ctx.fill();
  if (border) {
    ctx.lineWidth = Math.max(1, h * 0.06);
    ctx.strokeStyle = border;
    ctx.stroke();
  }
  ctx.fillStyle = fg;
  ctx.font = font;
  ctx.textBaseline = 'middle';
  ctx.textAlign = align;
  ctx.fillText(text, align === 'center' ? x + w / 2 : x + pad, y + h / 2 + h * 0.03);
}

/** Yellow/black diagonal hazard stripes inside a rect. */
export function drawHazardStripes(ctx, x, y, w, h, stripe = 12) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.fillStyle = '#f2c230';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#1b1b1b';
  for (let i = -h; i < w + h; i += stripe * 2) {
    ctx.beginPath();
    ctx.moveTo(x + i, y + h);
    ctx.lineTo(x + i + stripe, y + h);
    ctx.lineTo(x + i + stripe + h, y);
    ctx.lineTo(x + i + h, y);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

export function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/**
 * Wear overlay: fine scratches, scuffs and soft grime blotches. Deterministic by seed.
 * @param {{scratches?:number, grime?:number, seed?:number, dark?:string, light?:string}} [o]
 */
export function drawGrime(ctx, w, h, o = {}) {
  const { scratches = 60, grime = 14, seed = 7, dark = 'rgba(40,36,30,', light = 'rgba(255,255,255,' } = o;
  const r = rng(seed);
  for (let i = 0; i < grime; i++) {
    const x = r() * w, y = r() * h, rad = (0.03 + r() * 0.12) * Math.max(w, h);
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, dark + (0.05 + r() * 0.07) + ')');
    g.addColorStop(1, dark + '0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  ctx.lineCap = 'round';
  for (let i = 0; i < scratches; i++) {
    const x = r() * w, y = r() * h, len = (0.01 + r() * 0.06) * w, a = r() * Math.PI;
    ctx.strokeStyle = (r() < 0.5 ? dark : light) + (0.12 + r() * 0.2) + ')';
    ctx.lineWidth = 0.6 + r() * 0.9;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
  }
}
