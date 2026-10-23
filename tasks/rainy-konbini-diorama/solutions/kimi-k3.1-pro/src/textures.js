import * as THREE from 'three';
import { basic } from './lib.js';

export function canvasTexture(width, height, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  draw(context, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function textureMaterial(texture, options = {}) {
  return basic(0xffffff, { map: texture, toneMapped: false, ...options });
}

export function storeSignTexture() {
  return canvasTexture(1536, 220, (ctx, w, h) => {
    ctx.fillStyle = '#eff4d9';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#4aa994';
    ctx.fillRect(0, 0, w, 24);
    ctx.fillRect(0, h - 37, w, 16);
    ctx.fillStyle = '#ef9b63';
    ctx.fillRect(0, h - 21, w, 21);
    ctx.fillStyle = '#276f6d';
    ctx.font = '900 140px Arial, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('AOI', 76, 116);
    ctx.fillStyle = '#df8b58';
    ctx.beginPath();
    ctx.arc(465, 105, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff7df';
    ctx.font = '700 58px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('あ', 465, 111);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#344f59';
    ctx.font = '700 83px "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText('あおい', 565, 108);
    ctx.font = '500 27px Arial, sans-serif';
    ctx.fillStyle = '#618079';
    ctx.fillText('KONBINI  ·  EVERY DAY, A LITTLE LIGHT', 575, 172);
    ctx.fillStyle = '#276f6d';
    ctx.font = '900 94px Arial, sans-serif';
    ctx.fillText('24', 1240, 100);
    ctx.font = '700 30px Arial, sans-serif';
    ctx.fillText('OPEN', 1247, 167);
  });
}

export function textTexture(title, subtitle = '', options = {}) {
  const {
    background = '#e7edcf',
    color = '#285e62',
    accent = '#e89a62',
    vertical = false,
  } = options;
  return canvasTexture(vertical ? 320 : 768, vertical ? 768 : 320, (ctx, w, h) => {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(8, w * 0.018);
    ctx.strokeRect(12, 12, w - 24, h - 24);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, vertical ? w : w * 0.075, vertical ? h * 0.055 : h);
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (vertical) {
      const letters = [...title];
      ctx.font = '800 100px "Yu Gothic", sans-serif';
      letters.forEach((letter, index) => ctx.fillText(letter, w / 2, 155 + index * 118));
      if (subtitle) {
        ctx.font = '700 31px Arial, sans-serif';
        ctx.fillText(subtitle, w / 2, h - 58);
      }
    } else {
      ctx.font = '800 92px "Yu Gothic", Arial, sans-serif';
      ctx.fillText(title, w / 2, subtitle ? h * 0.42 : h * 0.53);
      if (subtitle) {
        ctx.font = '600 34px "Yu Gothic", Arial, sans-serif';
        ctx.fillText(subtitle, w / 2, h * 0.75);
      }
    }
  });
}

export function posterTexture(title, subtitle, palette = 0) {
  const palettes = [
    ['#f1b56f', '#753f51', '#fff0c9'],
    ['#8cc9bd', '#244c60', '#f5e6b9'],
    ['#dc8790', '#542f50', '#ffe8bb'],
    ['#8da9cf', '#263451', '#f3d38a'],
  ];
  const [background, color, accent] = palettes[palette % palettes.length];
  return canvasTexture(420, 560, (ctx, w, h) => {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(w * 0.72, h * 0.28, w * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(30, 320);
    ctx.bezierCurveTo(120, 230, 235, 430, 400, 280);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.font = '900 75px "Yu Gothic", Arial, sans-serif';
    ctx.fillText(title, w / 2, 105);
    ctx.font = '700 33px "Yu Gothic", Arial, sans-serif';
    ctx.fillText(subtitle, w / 2, 470);
    ctx.fillRect(42, 510, w - 84, 8);
  });
}

export function vendingHeaderTexture() {
  return canvasTexture(512, 160, (ctx, w, h) => {
    ctx.fillStyle = '#e9f5e7';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#418f91';
    ctx.font = '900 69px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AOI DRINKS', w / 2, h / 2 - 5);
    ctx.fillStyle = '#e69767';
    ctx.fillRect(0, h - 15, w, 15);
  });
}

export function magazineTexture(index) {
  const titles = ['週刊', '暮らし', 'MANGA', '東京'];
  const colors = ['#e69c83', '#8bb6b0', '#d6b66e', '#829fc5'];
  return canvasTexture(256, 360, (ctx, w, h) => {
    ctx.fillStyle = '#f0e9d4';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(12, 72, w - 24, 220);
    ctx.fillStyle = '#334255';
    ctx.font = '900 42px "Yu Gothic", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(titles[index % titles.length], w / 2, 53);
    ctx.fillStyle = '#f7e7c4';
    ctx.beginPath();
    ctx.arc(w * 0.5, 175, 62, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#334255';
    ctx.font = '700 22px Arial, sans-serif';
    ctx.fillText(`ISSUE  ${12 + index}`, w / 2, 330);
  });
}

export function glowTexture() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
    gradient.addColorStop(0.15, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  });
}

export function reflectionTexture() {
  return canvasTexture(128, 256, (ctx, w, h) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.25, 'rgba(255,255,255,0.48)');
    gradient.addColorStop(0.65, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'destination-out';
    for (let y = 24; y < h; y += 18) {
      ctx.fillStyle = `rgba(0,0,0,${0.25 + (y % 4) * 0.1})`;
      ctx.fillRect(0, y, w, 4);
    }
  });
}

export function matTexture() {
  return canvasTexture(768, 256, (ctx, w, h) => {
    ctx.fillStyle = '#315b61';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#73948a';
    ctx.lineWidth = 8;
    ctx.strokeRect(15, 15, w - 30, h - 30);
    ctx.fillStyle = '#c5d6b7';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 55px "Yu Gothic", sans-serif';
    ctx.fillText('いらっしゃいませ', w / 2, h / 2);
  });
}
