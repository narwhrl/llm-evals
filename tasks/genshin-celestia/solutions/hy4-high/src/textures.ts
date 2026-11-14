import * as THREE from 'three';
import { createRng } from './random';

function makeCanvas(width: number, height: number): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas context is unavailable');
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Vertical sky gradient: zenith blue -> warm horizon -> pale cloud haze. */
export function createSkyGradientTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(16, 1024);
  const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
  gradient.addColorStop(0.0, '#1f477c');
  gradient.addColorStop(0.16, '#3365a4');
  gradient.addColorStop(0.32, '#3f7ab4');
  gradient.addColorStop(0.44, '#64a1cf');
  gradient.addColorStop(0.52, '#b6d6e9');
  gradient.addColorStop(0.585, '#f2e6c6');
  gradient.addColorStop(0.65, '#d3e4ee');
  gradient.addColorStop(0.80, '#b9d6e7');
  gradient.addColorStop(1.0, '#dcecf4');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 16, 1024);
  return toTexture(canvas);
}

/** Soft radial glow used for the sun disc and its halo. */
export function createSunGlowTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(256, 256);
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0.0, 'rgba(255,253,240,1)');
  gradient.addColorStop(0.10, 'rgba(255,246,214,0.92)');
  gradient.addColorStop(0.28, 'rgba(255,226,160,0.35)');
  gradient.addColorStop(0.62, 'rgba(255,220,160,0.08)');
  gradient.addColorStop(1.0, 'rgba(255,220,160,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  return toTexture(canvas);
}

/** Repeating soft cloud blobs for the endless cloud sea plane. */
export function createCloudTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(512, 512);
  const rng = createRng(4242);
  ctx.clearRect(0, 0, 512, 512);
  for (let i = 0; i < 210; i += 1) {
    const x = rng() * 512;
    const y = rng() * 512;
    const radius = 22 + rng() * 108;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(255,255,255,${0.18 + rng() * 0.3})`);
    gradient.addColorStop(0.48, `rgba(244,251,255,${0.09 + rng() * 0.16})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Vertical streaks with a fading tail for suspended waterfalls. */
export function createWaterfallTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(128, 512);
  const rng = createRng(77);
  const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0.0, 'rgba(255,255,255,0.95)');
  gradient.addColorStop(0.14, 'rgba(216,242,252,0.78)');
  gradient.addColorStop(0.72, 'rgba(186,226,247,0.44)');
  gradient.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 512);
  for (let i = 0; i < 90; i += 1) {
    const x = rng() * 128;
    const y = rng() * 512;
    const width = 0.8 + rng() * 3.4;
    const height = 22 + rng() * 110;
    ctx.fillStyle = `rgba(255,255,255,${0.06 + rng() * 0.22})`;
    ctx.fillRect(x, y, width, height);
  }
  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/** Faint green continent shapes under the cloud sea (distant Teyvat). */
export function createTeyvatTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(512, 512);
  const rng = createRng(909);
  ctx.clearRect(0, 0, 512, 512);
  for (let i = 0; i < 30; i += 1) {
    const x = rng() * 512;
    const y = rng() * 512;
    const rx = 34 + rng() * 118;
    const ry = 20 + rng() * 74;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    gradient.addColorStop(0, 'rgba(74,130,94,1)');
    gradient.addColorStop(0.55, 'rgba(96,146,108,0.88)');
    gradient.addColorStop(1, 'rgba(150,186,158,0)');
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, ry / rx);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  return toTexture(canvas);
}
