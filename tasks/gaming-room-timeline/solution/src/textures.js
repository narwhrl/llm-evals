import * as THREE from 'three';

export function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { c, ctx: c.getContext('2d') };
}

function toTexture(canvas, repeatX = 1, repeatY = 1) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.anisotropy = 8;
  return texture;
}

function grain(ctx, w, h, rand, count, alpha, size = 1.5) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = rand() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    ctx.fillRect(rand() * w, rand() * h, size * rand() + 0.4, size * rand() + 0.4);
  }
}

export function woodTexture(base, dark, seed = 7, repeatX = 1, repeatY = 1) {
  const { c, ctx } = makeCanvas(512, 512);
  const rand = seeded(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 512);
  const planks = 6;
  const ph = 512 / planks;
  for (let p = 0; p < planks; p++) {
    const y = p * ph;
    ctx.fillStyle = `rgba(0,0,0,${0.03 + rand() * 0.05})`;
    ctx.fillRect(0, y, 512, ph);
    ctx.strokeStyle = dark;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(512, y + 0.5);
    ctx.stroke();
    ctx.globalAlpha = 1;
    for (let i = 0; i < 26; i++) {
      const ly = y + 4 + rand() * (ph - 8);
      ctx.strokeStyle = dark;
      ctx.globalAlpha = 0.05 + rand() * 0.13;
      ctx.lineWidth = 0.6 + rand() * 1.4;
      ctx.beginPath();
      ctx.moveTo(0, ly);
      for (let x = 0; x <= 512; x += 32) {
        ctx.lineTo(x, ly + Math.sin((x + p * 90 + i * 31) * 0.02) * (1 + rand() * 1.5));
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (rand() > 0.55) {
      const kx = rand() * 512;
      const ky = y + 8 + rand() * (ph - 16);
      ctx.strokeStyle = dark;
      ctx.globalAlpha = 0.22;
      for (let r = 2; r < 9; r += 2) {
        ctx.beginPath();
        ctx.ellipse(kx, ky, r * 2.2, r, 0.3, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    const seam = (p + 1 + Math.floor(rand() * 2)) * 78;
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(Math.min(seam, 500), y + 2, 2, ph - 4);
  }
  grain(ctx, 512, 512, rand, 5000, 0.035);
  return toTexture(c, repeatX, repeatY);
}

export function wallTexture() {
  const { c, ctx } = makeCanvas(512, 512);
  const rand = seeded(31);
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#e0d2bb');
  grad.addColorStop(0.72, '#d8c8ae');
  grad.addColorStop(1, '#cbb99e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  for (let x = 0; x < 512; x += 3) {
    ctx.fillStyle = `rgba(120,100,78,${0.015 + rand() * 0.02})`;
    ctx.fillRect(x, 0, 1, 512);
  }
  grain(ctx, 512, 512, rand, 7000, 0.04);
  for (let i = 0; i < 9; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const r = 20 + rand() * 50;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(126,104,76,0.045)');
    g.addColorStop(1, 'rgba(126,104,76,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  return toTexture(c, 2, 1);
}

export function fabricTexture(color, seed = 5) {
  const { c, ctx } = makeCanvas(256, 256);
  const rand = seeded(seed);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 3) {
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.fillRect(i, 0, 1, 256);
    ctx.fillStyle = 'rgba(0,0,0,0.045)';
    ctx.fillRect(0, i, 256, 1);
  }
  grain(ctx, 256, 256, rand, 3000, 0.06, 2);
  return toTexture(c, 2, 2);
}

export function carpetTexture(color = '#8c5b46', seed = 12) {
  const { c, ctx } = makeCanvas(256, 256);
  const rand = seeded(seed);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 9000; i++) {
    ctx.strokeStyle = rand() > 0.5 ? 'rgba(255,235,210,0.11)' : 'rgba(0,0,0,0.13)';
    ctx.lineWidth = 0.7;
    const x = rand() * 256;
    const y = rand() * 256;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + rand() * 3 - 1.5, y + rand() * 3 - 1.5);
    ctx.stroke();
  }
  return toTexture(c, 3, 3);
}

export function cardboardTexture() {
  const { c, ctx } = makeCanvas(256, 256);
  const rand = seeded(88);
  ctx.fillStyle = '#b08a5e';
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 4) {
    ctx.fillStyle = `rgba(90,64,38,${0.02 + rand() * 0.04})`;
    ctx.fillRect(0, i, 256, 1);
  }
  grain(ctx, 256, 256, rand, 5000, 0.07, 2);
  ctx.fillStyle = 'rgba(222,206,176,0.42)';
  ctx.fillRect(0, 108, 256, 34);
  ctx.strokeStyle = 'rgba(80,56,32,0.35)';
  ctx.setLineDash([6, 5]);
  ctx.strokeRect(14, 14, 228, 228);
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(60,44,28,0.55)';
  ctx.font = 'bold 21px Georgia, serif';
  ctx.fillText('OLD STUFF', 78, 92);
  ctx.font = '13px monospace';
  ctx.fillText('2005 — KEEP', 84, 185);
  return toTexture(c);
}

export function spineTexture(text, bg = '#2b3a52', fg = '#e8dcc2') {
  const { c, ctx } = makeCanvas(96, 512);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 96, 512);
  ctx.fillStyle = 'rgba(255,255,255,0.09)';
  ctx.fillRect(0, 0, 8, 512);
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.fillRect(88, 0, 8, 512);
  ctx.save();
  ctx.translate(52, 470);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = fg;
  ctx.font = 'bold 27px Georgia, serif';
  ctx.fillText(text, 0, 0);
  ctx.restore();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '11px monospace';
  ctx.fillText('·', 42, 34);
  return toTexture(c);
}

export function keyboardTexture(dark = '#2b2b2f') {
  const { c, ctx } = makeCanvas(512, 200);
  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, 512, 200);
  const key = (x, y, w, h) => {
    ctx.fillStyle = '#45464c';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.09)';
    ctx.fillRect(x + 1, y + 1, w - 2, 1);
    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    ctx.fillRect(x + 1, y + h - 2, w - 2, 2);
  };
  const kw = 29;
  const kh = 26;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 15; col++) {
      key(12 + col * (kw + 3), 14 + row * (kh + 8), kw, kh);
    }
  }
  key(12, 14 + 5 * (kh + 8), 210, kh);
  key(232, 14 + 5 * (kh + 8), 40, kh);
  key(282, 14 + 5 * (kh + 8), 180, kh);
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.strokeRect(3, 3, 506, 194);
  return toTexture(c);
}

export function deskMatTexture(text = 'PLAY', color = '#242a31') {
  const { c, ctx } = makeCanvas(512, 256);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = 'rgba(229,168,105,0.28)';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, 488, 232);
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let x = 32; x < 512; x += 32) {
    ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, 236); ctx.stroke();
  }
  for (let y = 28; y < 256; y += 32) {
    ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(492, y); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(229,168,105,0.5)';
  ctx.font = 'bold 22px Georgia, serif';
  ctx.fillText(text, 34, 228);
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.font = '12px monospace';
  ctx.fillText('S / 20 YEARS', 34, 52);
  return toTexture(c);
}

const posterData = [
  { bg: '#18304a', accent: '#ee9b4a', title: 'LAN', sub: 'PARTY · 2005', foot: 'BASEMENT / 8 BIT NIGHT' },
  { bg: '#4a1e22', accent: '#e8c86a', title: '09', sub: 'WINTER CUP', foot: 'BRING YOUR OWN MOUSE' },
  { bg: '#2a2150', accent: '#8f7ce0', title: 'S3', sub: 'LEAGUE', foot: 'SEASON THREE / HOME' },
  { bg: '#171719', accent: '#d8b46a', title: '17', sub: 'GRAND FINAL', foot: 'ONE MORE GAME' },
  { bg: '#123a3c', accent: '#6fd4c0', title: 'ON', sub: 'AIR · 2021', foot: 'STREAM FROM THE ROOM' },
  { bg: '#e2d6bd', accent: '#8c4a32', title: '20', sub: 'STILL HERE', foot: '2005 — 2025' },
];

export function posterTexture(index, alt = false) {
  const d = posterData[index % posterData.length];
  const { c, ctx } = makeCanvas(384, 512);
  const rand = seeded(400 + index + (alt ? 100 : 0));
  const bg = alt ? d.accent : d.bg;
  const accent = alt ? d.bg : d.accent;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 384, 512);
  const grad = ctx.createRadialGradient(192, 210, 20, 192, 240, 320);
  grad.addColorStop(0, 'rgba(255,255,255,0.13)');
  grad.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 384, 512);
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.32;
  for (let i = 0; i < 16; i++) {
    ctx.lineWidth = 1 + rand() * 2;
    ctx.beginPath();
    ctx.moveTo(rand() * 384, 0);
    ctx.lineTo(rand() * 384, 512);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = accent;
  ctx.fillRect(0, 372, 384, 5);
  ctx.fillStyle = alt ? '#2b211a' : (index === 5 ? '#3d2a21' : '#f6ead4');
  ctx.font = 'bold 148px Georgia, serif';
  ctx.fillText(alt ? d.title.split(' ')[0] : d.title, 24, 268);
  ctx.font = 'bold 32px Georgia, serif';
  ctx.fillText(d.sub, 26, 322);
  ctx.font = 'bold 24px Georgia, serif';
  if (alt) ctx.fillText(d.title, 26, 356);
  ctx.fillStyle = accent;
  ctx.font = '15px monospace';
  ctx.fillText(d.foot, 26, 424);
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.font = '12px monospace';
  ctx.fillText('NO. ' + String(index + 1).padStart(2, '0'), 26, 468);
  grain(ctx, 384, 512, rand, 2600, 0.05);
  return toTexture(c);
}

export function photoTexture() {
  const { c, ctx } = makeCanvas(256, 300);
  ctx.fillStyle = '#f2ece0';
  ctx.fillRect(0, 0, 256, 300);
  const g = ctx.createLinearGradient(0, 18, 0, 232);
  g.addColorStop(0, '#e8a869');
  g.addColorStop(0.55, '#c8756a');
  g.addColorStop(1, '#5c5266');
  ctx.fillStyle = g;
  ctx.fillRect(16, 16, 224, 216);
  ctx.fillStyle = 'rgba(255,214,150,0.55)';
  ctx.beginPath(); ctx.arc(176, 78, 34, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(40,32,38,0.82)';
  ctx.fillRect(28, 176, 200, 56);
  // two figures and the old monitor, drawn as simple silhouettes
  ctx.fillStyle = '#332b33';
  ctx.beginPath(); ctx.arc(88, 148, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(66, 168, 44, 62);
  ctx.beginPath(); ctx.arc(140, 154, 19, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(122, 172, 38, 58);
  ctx.fillStyle = '#d9c9a9';
  ctx.fillRect(176, 150, 42, 34);
  ctx.fillStyle = '#6a5f52';
  ctx.fillRect(182, 156, 30, 22);
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(16, 16, 224, 216);
  ctx.fillStyle = '#6b6155';
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillText('summer, 2005', 30, 272);
  const rand = seeded(99);
  grain(ctx, 256, 300, rand, 1800, 0.045);
  return toTexture(c);
}

export function noteTexture(lines) {
  const { c, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = '#f4e7bd';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = 'rgba(160,140,90,0.16)';
  for (let y = 30; y < 256; y += 28) ctx.fillRect(16, y, 224, 1);
  ctx.fillStyle = '#4a4335';
  ctx.font = '20px "Microsoft YaHei", sans-serif';
  lines.forEach((line, i) => ctx.fillText(line, 20, 52 + i * 34));
  return toTexture(c);
}

export function tvTexture() {
  const { c, ctx } = makeCanvas(256, 192);
  ctx.fillStyle = '#101a16';
  ctx.fillRect(0, 0, 256, 192);
  ctx.strokeStyle = 'rgba(120,220,160,0.16)';
  for (let y = 0; y < 192; y += 4) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
  }
  ctx.fillStyle = '#4fd08a';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('PLAYER 1', 24, 52);
  ctx.fillStyle = '#e8d08a';
  ctx.fillText('PRESS START', 24, 104);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillRect(24, 130, 120, 6);
  return toTexture(c);
}
