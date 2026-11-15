import * as THREE from 'three';

/**
 * Every surface in the diorama is painted procedurally on a 2D canvas, so the
 * build has zero binary assets to download and nothing can 404 at runtime.
 */

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(w, h = w) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function tex(c, { repeat = [1, 1], srgb = true, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = aniso;
  t.needsUpdate = true;
  return t;
}

/** Smooth value noise, cheap enough to run at 512px. */
function noiseCanvas(size, cells, seed) {
  const rnd = mulberry32(seed);
  const g = new Float32Array((cells + 1) * (cells + 1));
  for (let i = 0; i < g.length; i++) g[i] = rnd();
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const sm = (t) => t * t * (3 - 2 * t);
  for (let y = 0; y < size; y++) {
    const fy = (y / size) * cells;
    const y0 = Math.floor(fy), ty = sm(fy - y0);
    for (let x = 0; x < size; x++) {
      const fx = (x / size) * cells;
      const x0 = Math.floor(fx), tx = sm(fx - x0);
      const i00 = g[y0 * (cells + 1) + x0], i10 = g[y0 * (cells + 1) + x0 + 1];
      const i01 = g[(y0 + 1) * (cells + 1) + x0], i11 = g[(y0 + 1) * (cells + 1) + x0 + 1];
      const v = (i00 * (1 - tx) + i10 * tx) * (1 - ty) + (i01 * (1 - tx) + i11 * tx) * ty;
      const o = (y * size + x) * 4;
      const b = (v * 255) | 0;
      img.data[o] = img.data[o + 1] = img.data[o + 2] = b;
      img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function grain(ctx, size, amount, seed) {
  const rnd = mulberry32(seed);
  const c = canvas(size);
  const cc = c.getContext('2d');
  const img = cc.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = 128 + (rnd() - 0.5) * 255;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  cc.putImageData(img, 0, 0);
  ctx.save();
  ctx.globalAlpha = amount;
  ctx.globalCompositeOperation = 'overlay';
  ctx.drawImage(c, 0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

function blobs(ctx, count, seed, { min = 20, max = 140, color = 'rgba(0,0,0,0.25)', blur = 18 } = {}) {
  const rnd = mulberry32(seed);
  const w = ctx.canvas.width, h = ctx.canvas.height;
  ctx.save();
  for (let i = 0; i < count; i++) {
    const x = rnd() * w, y = rnd() * h, r = min + rnd() * (max - min);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.filter = `blur(${blur}px)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// --- surfaces -------------------------------------------------------------

export function concreteTexture(repeat = 2, seed = 11) {
  const c = canvas(512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#828892';
  ctx.fillRect(0, 0, 512, 512);
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.32;
  ctx.drawImage(noiseCanvas(256, 36, seed), 0, 0, 512, 512);
  ctx.globalAlpha = 0.22;
  ctx.drawImage(noiseCanvas(256, 140, seed + 5), 0, 0, 512, 512);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  blobs(ctx, 26, seed + 9, { min: 30, max: 130, color: 'rgba(38,42,48,0.22)', blur: 26 });
  blobs(ctx, 12, seed + 13, { min: 20, max: 70, color: 'rgba(150,150,140,0.22)', blur: 22 });
  // chipped edges / hairline cracks
  const rnd = mulberry32(seed + 21);
  ctx.strokeStyle = 'rgba(30,32,36,0.5)';
  for (let i = 0; i < 26; i++) {
    ctx.lineWidth = 0.6 + rnd() * 1.2;
    ctx.beginPath();
    let x = rnd() * 512, y = rnd() * 512;
    ctx.moveTo(x, y);
    for (let s = 0; s < 5; s++) {
      x += (rnd() - 0.5) * 90; y += (rnd() - 0.5) * 90;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  grain(ctx, 256, 0.3, seed + 31);
  return tex(c, { repeat: [repeat, repeat] });
}

export function rustTexture(repeat = 2, seed = 77) {
  const c = canvas(512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#8d8a83';
  ctx.fillRect(0, 0, 512, 512);
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.6;
  ctx.drawImage(noiseCanvas(256, 14, seed), 0, 0, 512, 512);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  blobs(ctx, 46, seed + 3, { min: 14, max: 90, color: 'rgba(122,62,26,0.75)', blur: 14 });
  blobs(ctx, 20, seed + 8, { min: 40, max: 150, color: 'rgba(150,80,34,0.5)', blur: 30 });
  blobs(ctx, 14, seed + 17, { min: 20, max: 60, color: 'rgba(36,30,26,0.55)', blur: 18 });
  // vertical rust runs
  const rnd = mulberry32(seed + 41);
  for (let i = 0; i < 60; i++) {
    const x = rnd() * 512, h = 40 + rnd() * 260, w = 1 + rnd() * 4;
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(140,72,30,0.55)');
    g.addColorStop(1, 'rgba(140,72,30,0)');
    ctx.fillStyle = g;
    ctx.save();
    ctx.translate(x, rnd() * 300);
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
  grain(ctx, 256, 0.35, seed + 51);
  return tex(c, { repeat: [repeat, repeat] });
}

export function corrugatedTexture(hex = '#8a3b2e', repeat = [6, 2], seed = 91) {
  const c = canvas(512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, 512, 512);
  // ribs
  const ribs = 16;
  for (let i = 0; i < ribs; i++) {
    const x = (i / ribs) * 512;
    const w = 512 / ribs;
    const g = ctx.createLinearGradient(x, 0, x + w, 0);
    g.addColorStop(0, 'rgba(0,0,0,0.34)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.18)');
    g.addColorStop(0.6, 'rgba(255,255,255,0.06)');
    g.addColorStop(1, 'rgba(0,0,0,0.34)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, w, 512);
  }
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.45;
  ctx.drawImage(noiseCanvas(256, 20, seed), 0, 0, 512, 512);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  blobs(ctx, 30, seed + 4, { min: 12, max: 70, color: 'rgba(110,54,24,0.42)', blur: 12 });
  blobs(ctx, 14, seed + 12, { min: 30, max: 120, color: 'rgba(30,26,22,0.32)', blur: 26 });
  grain(ctx, 256, 0.25, seed + 19);
  return tex(c, { repeat });
}

export function woodTexture(repeat = 1, seed = 33) {
  const c = canvas(512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#8a6842';
  ctx.fillRect(0, 0, 512, 512);
  const rnd = mulberry32(seed);
  const planks = 6;
  for (let i = 0; i < planks; i++) {
    const y = (i / planks) * 512;
    const h = 512 / planks;
    const tone = 0.82 + rnd() * 0.32;
    ctx.fillStyle = `rgb(${Math.round(150 * tone)},${Math.round(112 * tone)},${Math.round(70 * tone)})`;
    ctx.fillRect(0, y + 1.5, 512, h - 3);
    // grain
    ctx.strokeStyle = 'rgba(70,44,22,0.35)';
    for (let k = 0; k < 12; k++) {
      ctx.lineWidth = 0.5 + rnd() * 1.4;
      ctx.beginPath();
      const yy = y + rnd() * h;
      ctx.moveTo(0, yy);
      for (let x = 0; x <= 512; x += 32) {
        ctx.lineTo(x, yy + Math.sin(x * 0.03 + k) * 2.2 + (rnd() - 0.5) * 1.6);
      }
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(30,20,10,0.55)';
    ctx.fillRect(0, y, 512, 2);
  }
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.45;
  ctx.drawImage(noiseCanvas(256, 26, seed + 3), 0, 0, 512, 512);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  blobs(ctx, 12, seed + 6, { min: 20, max: 80, color: 'rgba(40,30,18,0.4)', blur: 20 });
  grain(ctx, 256, 0.25, seed + 44);
  return tex(c, { repeat: [repeat, repeat] });
}

export function cardboardTexture(repeat = 1, seed = 63) {
  const c = canvas(256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#b09468';
  ctx.fillRect(0, 0, 256, 256);
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.5;
  ctx.drawImage(noiseCanvas(128, 14, seed), 0, 0, 256, 256);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  blobs(ctx, 16, seed + 2, { min: 12, max: 60, color: 'rgba(58,44,26,0.55)', blur: 14 });
  // damp patches
  blobs(ctx, 10, seed + 5, { min: 16, max: 46, color: 'rgba(40,36,30,0.5)', blur: 12 });
  // corrugation hint
  ctx.strokeStyle = 'rgba(60,48,30,0.18)';
  for (let i = 0; i < 256; i += 8) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
  }
  grain(ctx, 256, 0.3, seed + 8);
  return tex(c, { repeat: [repeat, repeat] });
}

export function tarpTexture(repeat = 2, seed = 71) {
  const c = canvas(256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#2e4a5c';
  ctx.fillRect(0, 0, 256, 256);
  ctx.globalAlpha = 0.6;
  ctx.drawImage(noiseCanvas(128, 30, seed), 0, 0, 256, 256);
  ctx.globalAlpha = 1;
  blobs(ctx, 12, seed + 1, { min: 20, max: 70, color: 'rgba(14,22,30,0.5)', blur: 16 });
  grain(ctx, 256, 0.25, seed + 3);
  return tex(c, { repeat: [repeat, repeat] });
}

export function metalTexture(repeat = 2, hex = '#4a5058', seed = 51) {
  const c = canvas(256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, 256, 256);
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.45;
  ctx.drawImage(noiseCanvas(128, 18, seed), 0, 0, 256, 256);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  blobs(ctx, 18, seed + 2, { min: 8, max: 40, color: 'rgba(24,26,30,0.55)', blur: 10 });
  blobs(ctx, 8, seed + 6, { min: 10, max: 34, color: 'rgba(130,80,40,0.4)', blur: 12 });
  grain(ctx, 256, 0.2, seed + 11);
  return tex(c, { repeat: [repeat, repeat] });
}

// --- decals ---------------------------------------------------------------

export function stencilTexture(text, { w = 512, h = 256, color = '#e8e4d8', bg = null, size = 150, seed = 5, sub = '' } = {}) {
  const c = canvas(w, h);
  const ctx = c.getContext('2d');
  if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); }
  else ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${size}px "Arial Narrow", Impact, sans-serif`;
  ctx.fillText(text, w / 2, sub ? h / 2 - size * 0.22 : h / 2);
  if (sub) {
    ctx.font = `bold ${size * 0.34}px "Arial Narrow", Impact, sans-serif`;
    ctx.fillText(sub, w / 2, h / 2 + size * 0.42);
  }
  // worn paint
  const rnd = mulberry32(seed);
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 160; i++) {
    ctx.globalAlpha = 0.15 + rnd() * 0.5;
    const r = 2 + rnd() * 12;
    ctx.beginPath();
    ctx.arc(rnd() * w, rnd() * h, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  return tex(c, { repeat: [1, 1] });
}

export function graffitiTexture(seed = 3) {
  const w = 512, h = 256;
  const c = canvas(w, h);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  const rnd = mulberry32(seed);
  const palette = ['#d94f3d', '#e8b33c', '#3fb0a0', '#7b6fd0', '#d8d2c4'];
  for (let s = 0; s < 3; s++) {
    ctx.strokeStyle = palette[(s + Math.floor(rnd() * palette.length)) % palette.length];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 10 + rnd() * 16;
    ctx.globalAlpha = 0.75;
    const x0 = 40 + rnd() * 120, y0 = 60 + rnd() * 120;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    for (let i = 0; i < 5; i++) {
      ctx.quadraticCurveTo(
        x0 + rnd() * 180 - 40, y0 + rnd() * 120 - 40,
        x0 + 60 + i * 70 + rnd() * 30, y0 + (rnd() - 0.5) * 90,
      );
    }
    ctx.stroke();
  }
  // spray speckle
  ctx.globalAlpha = 0.4;
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = palette[Math.floor(rnd() * palette.length)];
    ctx.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 2, 1 + rnd() * 2);
  }
  ctx.globalAlpha = 1;
  return tex(c, { repeat: [1, 1] });
}

export function bulletHoleTexture(seed = 9) {
  const c = canvas(256);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);
  const rnd = mulberry32(seed);
  for (let i = 0; i < 34; i++) {
    const x = 30 + rnd() * 196, y = 30 + rnd() * 196;
    const r = 2.4 + rnd() * 3.6;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.6);
    g.addColorStop(0, 'rgba(8,8,10,0.95)');
    g.addColorStop(0.4, 'rgba(20,18,18,0.7)');
    g.addColorStop(1, 'rgba(30,28,26,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * 2.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(150,148,142,0.5)';
    ctx.beginPath(); ctx.arc(x, y, r * 0.75, 0, Math.PI * 2); ctx.fill();
  }
  return tex(c, { repeat: [1, 1] });
}

export function signTexture(lines, { bg = '#c9b25a', seed = 17 } = {}) {
  const w = 256, h = 128;
  const c = canvas(w, h);
  const ctx = c.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(30,30,30,0.6)';
  ctx.lineWidth = 6;
  ctx.strokeRect(5, 5, w - 10, h - 10);
  ctx.fillStyle = '#1b1d20';
  ctx.textAlign = 'center';
  ctx.font = 'bold 34px "Arial Narrow", Impact, sans-serif';
  lines.forEach((l, i) => ctx.fillText(l, w / 2, 52 + i * 38));
  const rnd = mulberry32(seed);
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 120; i++) {
    ctx.globalAlpha = 0.2 + rnd() * 0.6;
    ctx.beginPath(); ctx.arc(rnd() * w, rnd() * h, 1 + rnd() * 6, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  return tex(c, { repeat: [1, 1] });
}

export function badgeTexture() {
  const w = 512, h = 256;
  const c = canvas(w, h);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#1d2530';
  ctx.beginPath();
  ctx.ellipse(w / 2, h * 0.44, 62, 70, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#9fb6d8';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#9fb6d8';
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
    const x = w / 2 + Math.cos(a) * 34, y = h * 0.44 + Math.sin(a) * 34;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#cfd9ea';
  ctx.textAlign = 'center';
  ctx.font = 'bold 40px "Arial Narrow", Impact, sans-serif';
  ctx.fillText('RESTRICTED', w / 2, h * 0.86);
  ctx.font = 'bold 26px "Arial Narrow", Impact, sans-serif';
  ctx.fillText('NO ENTRY', w / 2, h * 0.95);
  return tex(c, { repeat: [1, 1] });
}

export function glowTexture() {
  const c = canvas(128);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.14)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return tex(c, { repeat: [1, 1] });
}

export function streakTexture(seed = 23) {
  const w = 128, h = 256;
  const c = canvas(w, h);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  const rnd = mulberry32(seed);
  for (let i = 0; i < 40; i++) {
    const x = rnd() * w;
    const y0 = rnd() * h * 0.4;
    const len = h * (0.3 + rnd() * 0.7);
    const g = ctx.createLinearGradient(x, y0, x, y0 + len);
    g.addColorStop(0, 'rgba(200,220,255,0)');
    g.addColorStop(0.2, `rgba(200,220,255,${0.18 + rnd() * 0.25})`);
    g.addColorStop(1, 'rgba(200,220,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, y0, 0.8 + rnd() * 2.4, len);
  }
  return tex(c, { repeat: [1, 1] });
}

// --- map floor ------------------------------------------------------------

/**
 * The whole 32x32 slab is painted as one piece: asphalt, concrete aprons,
 * oil stains, cracks and worn road paint.
 */
export function floorTexture(puddles, size = 2048) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const u = size / 32; // pixels per world unit

  ctx.fillStyle = '#3d434b';
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.34;
  ctx.drawImage(noiseCanvas(512, 150, 101), 0, 0, size, size);
  ctx.globalAlpha = 0.22;
  ctx.drawImage(noiseCanvas(512, 320, 103), 0, 0, size, size);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;

  const world = (x, z) => [(x + 16) * u, (z + 16) * u];

  // concrete aprons: A site, B site, CT spawn, T plateau
  const aprons = [
    [-13.4, -7.4, -13.2, -6.6, '#5d636b'],
    [4.4, 15.6, -11.0, -5.4, '#575d65'],
    [-7.6, 7.6, 9.6, 15.8, '#5a6068'],
    [-7.4, 11.0, -16.0, -11.0, '#5c626a'],
    [-3.4, 3.4, -8.2, 9.6, '#545a62'],
  ];
  for (const [x0, x1, z0, z1, col] of aprons) {
    const [px, py] = world(x0, z0);
    ctx.fillStyle = col;
    ctx.fillRect(px, py, (x1 - x0) * u, (z1 - z0) * u);
  }
  // concrete slab joints
  ctx.strokeStyle = 'rgba(24,26,30,0.55)';
  ctx.lineWidth = 2;
  for (const [x0, x1, z0, z1] of aprons) {
    const [px, py] = world(x0, z0);
    const w = (x1 - x0) * u, h = (z1 - z0) * u;
    for (let i = 1; i < 6; i++) {
      ctx.beginPath(); ctx.moveTo(px + (w * i) / 6, py); ctx.lineTo(px + (w * i) / 6, py + h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px, py + (h * i) / 6); ctx.lineTo(px + w, py + (h * i) / 6); ctx.stroke();
    }
  }

  // oil / damp stains
  const rnd = mulberry32(303);
  for (let i = 0; i < 90; i++) {
    const x = rnd() * size, y = rnd() * size, r = 12 + rnd() * 90;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const dark = rnd() > 0.35;
    g.addColorStop(0, dark ? 'rgba(14,16,20,0.5)' : 'rgba(96,92,80,0.25)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // cracks
  ctx.strokeStyle = 'rgba(16,17,20,0.34)';
  for (let i = 0; i < 48; i++) {
    ctx.lineWidth = 0.8 + rnd() * 2;
    ctx.beginPath();
    let x = rnd() * size, y = rnd() * size;
    ctx.moveTo(x, y);
    for (let s = 0; s < 6; s++) {
      x += (rnd() - 0.5) * 160; y += (rnd() - 0.5) * 160;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // worn road paint along the mid lane
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = '#cfc9b4';
  const [mx0, my0] = world(-2.6, -8);
  ctx.fillRect(mx0, my0, 0.22 * u, 18 * u);
  const [mx1, my1] = world(2.3, -8);
  ctx.fillRect(mx1, my1, 0.22 * u, 18 * u);
  ctx.restore();

  // hazard hatching at the CT barricade line
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.strokeStyle = '#d8c05a';
  ctx.lineWidth = 10;
  for (let i = -10; i < 40; i++) {
    ctx.beginPath();
    ctx.moveTo(world(-7.6, 9.9 + i * 0.5)[0], world(0, 9.9 + i * 0.5)[1]);
    ctx.lineTo(world(-7.6 + 1.6, 9.9 + i * 0.5 + 1.6)[0], world(0, 9.9 + i * 0.5 + 1.6)[1]);
    ctx.stroke();
  }
  ctx.restore();

  // puddles darken the floor as well as the reflection mask
  for (const p of puddles) {
    const [px, py] = world(p.x, p.z);
    const r = p.r * u;
    const g = ctx.createRadialGradient(px, py, r * 0.15, px, py, r);
    g.addColorStop(0, 'rgba(10,16,24,0.85)');
    g.addColorStop(0.75, 'rgba(14,20,28,0.5)');
    g.addColorStop(1, 'rgba(20,26,34,0)');
    ctx.fillStyle = g;
    ctx.fillRect(px - r, py - r, r * 2, r * 2);
  }

  grain(ctx, 512, 0.22, 404);
  return tex(c, { repeat: [1, 1], aniso: 16 });
}

/** Grayscale mask of the puddle field, used by the reflection shader. */
export function puddleMaskTexture(puddles, size = 1024, holes = []) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const u = size / 32;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'lighter';
  for (const p of puddles) {
    const px = (p.x + 16) * u, py = (p.z + 16) * u;
    const r = p.r * u;
    const g = ctx.createRadialGradient(px, py, 0, px, py, r);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.72)');
    g.addColorStop(0.85, 'rgba(255,255,255,0.18)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(px - r, py - r, r * 2, r * 2);
  }
  ctx.globalCompositeOperation = 'source-over';
  // keep the drain and the sewer mouths dry
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = '#000';
  for (const h of holes) {
    ctx.fillRect((h.x0 + 16) * u, (h.z0 + 16) * u, (h.x1 - h.x0) * u, (h.z1 - h.z0) * u);
  }
  ctx.globalCompositeOperation = 'source-over';
  grain(ctx, 256, 0.25, 707);
  return tex(c, { repeat: [1, 1], srgb: false, aniso: 4 });
}

/** Tileable two channel noise used to distort the puddle reflections. */
export function rippleTexture(size = 256) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const a = noiseCanvas(size, 8, 401);
  const b = noiseCanvas(size, 17, 402);
  const ad = a.getContext('2d').getImageData(0, 0, size, size).data;
  const bd = b.getContext('2d').getImageData(0, 0, size, size).data;
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    img.data[i * 4] = ad[i * 4];
    img.data[i * 4 + 1] = bd[i * 4];
    img.data[i * 4 + 2] = 128;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return tex(c, { repeat: [1, 1], srgb: false, aniso: 2 });
}

/** Soft ring used for rain impact ripples. */
export function ringTexture() {
  const c = canvas(128);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(0.62, 'rgba(255,255,255,0)');
  g.addColorStop(0.8, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.92, 'rgba(255,255,255,0.25)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return tex(c, { repeat: [1, 1], srgb: false, aniso: 1 });
}
