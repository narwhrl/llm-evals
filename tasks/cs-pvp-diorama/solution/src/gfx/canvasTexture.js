// Canvas 贴图工具：程序化生成全部纹理，零外部资源。
import * as THREE from 'three';
import { clamp } from './rng.js';

export function createCanvas(width, height = width) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return { canvas, ctx: canvas.getContext('2d', { willReadFrequently: true }) };
}

// 逐像素填充，cb(x, y) 返回 [r, g, b, a]（0..255 或 0..1，自动识别）。
export function fillPixels(ctx, width, height, cb) {
  const image = ctx.createImageData(width, height);
  const data = image.data;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const out = cb(x, y);
      const i = (y * width + x) * 4;
      const scale = out[0] <= 1.0001 && out[1] <= 1.0001 && out[2] <= 1.0001 ? 255 : 1;
      data[i] = clamp(out[0] * scale, 0, 255);
      data[i + 1] = clamp(out[1] * scale, 0, 255);
      data[i + 2] = clamp(out[2] * scale, 0, 255);
      data[i + 3] = clamp((out[3] === undefined ? 1 : out[3]) * (out[3] === undefined ? 255 : scale), 0, 255);
    }
  }
  ctx.putImageData(image, 0, 0);
  return image;
}

export function toTexture(canvas, options = {}) {
  const {
    repeat = [1, 1],
    srgb = true,
    anisotropy = 4,
    wrap = THREE.RepeatWrapping,
    flipY = true,
  } = options;
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = wrap;
  texture.wrapT = wrap;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.anisotropy = anisotropy;
  texture.flipY = flipY;
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

// 由灰度高度图生成法线贴图（Sobel），用于混凝土、木纹、瓦楞铁等硬表面细节。
export function normalTextureFromCanvas(heightCanvas, strength = 2.2, anisotropy = 4) {
  const { width, height } = heightCanvas;
  const src = heightCanvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, width, height).data;
  const { canvas, ctx } = createCanvas(width, height);
  const image = ctx.createImageData(width, height);
  const out = image.data;
  const at = (x, y) => {
    const cx = ((x % width) + width) % width;
    const cy = ((y % height) + height) % height;
    return src[(cy * width + cx) * 4] / 255;
  };
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dx = (at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1)) - (at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1));
      const dy = (at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1)) - (at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1));
      let nx = -dx * strength;
      let ny = -dy * strength;
      let nz = 1;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;
      const i = (y * width + x) * 4;
      out[i] = (nx * 0.5 + 0.5) * 255;
      out[i + 1] = (ny * 0.5 + 0.5) * 255;
      out[i + 2] = (nz * 0.5 + 0.5) * 255;
      out[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function grain(ctx, width, height, rng, { count = 4000, minAlpha = 0.03, maxAlpha = 0.14, size = 1.6, dark = true } = {}) {
  for (let i = 0; i < count; i += 1) {
    const a = rng.range(minAlpha, maxAlpha);
    const value = dark ? 0 : 255;
    ctx.fillStyle = `rgba(${value},${value},${value},${a})`;
    const s = rng.range(size * 0.5, size);
    ctx.fillRect(rng.range(0, width), rng.range(0, height), s, s);
  }
}

export function scratches(ctx, width, height, rng, { count = 60, alpha = 0.1, light = false } = {}) {
  ctx.lineCap = 'round';
  for (let i = 0; i < count; i += 1) {
    const x = rng.range(0, width);
    const y = rng.range(0, height);
    const len = rng.range(width * 0.03, width * 0.28);
    const angle = rng.range(-0.35, 0.35) + (rng.chance(0.5) ? 0 : Math.PI / 2);
    ctx.strokeStyle = light ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    ctx.lineWidth = rng.range(0.5, 1.6);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }
}

export function blobs(ctx, width, height, rng, { count = 40, radius = [6, 30], color = 'rgba(0,0,0,0.12)' } = {}) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i += 1) {
    const x = rng.range(0, width);
    const y = rng.range(0, height);
    ctx.beginPath();
    ctx.ellipse(x, y, rng.range(radius[0], radius[1]), rng.range(radius[0], radius[1]) * rng.range(0.5, 1.4), rng.range(0, Math.PI), 0, Math.PI * 2);
    ctx.fill();
  }
}
