// All textures are procedural canvas art — zero external assets.
// A seeded RNG keeps every regeneration deterministic.
import * as THREE from 'three';
import { mulberry32 } from './utils.js';

function tex(w, h, draw, { repeat = null, srgb = true } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

function noiseRect(ctx, w, h, r, g, b, { count = 2600, size = [0.5, 2.2], alpha = [0.04, 0.14], seed = 7 } = {}) {
  const rand = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const a = alpha[0] + (alpha[1] - alpha[0]) * rand();
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    const s = size[0] + (size[1] - size[0]) * rand();
    ctx.fillRect(rand() * w, rand() * h, s, s);
  }
}

function blotches(ctx, w, h, color, { count = 24, r = [8, 42], alpha = [0.05, 0.16], seed = 11 } = {}) {
  const rand = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const x = rand() * w, y = rand() * h;
    const rad = r[0] + (r[1] - r[0]) * rand();
    const grad = ctx.createRadialGradient(x, y, 0, x, y, rad);
    const a = alpha[0] + (alpha[1] - alpha[0]) * rand();
    grad.addColorStop(0, `rgba(${color},${a})`);
    grad.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
}

function crack(ctx, x, y, len, angle, color, depth = 0) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1 + Math.random() * 0.8;
  ctx.beginPath();
  ctx.moveTo(x, y);
  let a = angle;
  for (let i = 0; i < len / 6; i++) {
    a += (Math.random() - 0.5) * 0.9;
    x += Math.cos(a) * 6; y += Math.sin(a) * 6;
    ctx.lineTo(x, y);
    if (depth < 2 && Math.random() < 0.12) crack(ctx, x, y, len * 0.4, a + 1.2, color, depth + 1);
  }
  ctx.stroke();
}

function stencilText(ctx, text, x, y, size, color, alpha = 0.9, font = 'bold', rot = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.font = `${font} ${size}px "Arial Black", "DejaVu Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = `rgba(0,0,0,${alpha * 0.35})`;
  ctx.fillText(text, 1.5, 1.5);
  ctx.fillStyle = color.replace('A)', `${alpha})`);
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

// ---------------------------------------------------------------- ground ----
// Puddle mask: red channel = reflectivity. Blobs given in world coords (-30..30).
export function puddleMaskTexture(blobs) {
  return tex(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    const px = (v) => ((v + 30) / 60) * w;
    for (const b of blobs) {
      const [x, z, rx, rz] = b;
      const cx = px(x), cy = px(z);
      const ppu = w / 60; // pixels per world unit
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(rx * ppu, rz * ppu);
      const rg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      rg.addColorStop(0, 'rgba(255,255,255,0.98)');
      rg.addColorStop(0.62, 'rgba(255,255,255,0.85)');
      rg.addColorStop(0.85, 'rgba(255,255,255,0.25)');
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = rg;
      ctx.fillRect(-1.2, -1.2, 2.4, 2.4);
      ctx.restore();
    }
  }, { srgb: false });
}

export function groundTopTexture() {
  return tex(1024, 1024, (ctx, w, h) => {
    const px = w / 60; // world-units -> pixels
    ctx.fillStyle = '#252a33';
    ctx.fillRect(0, 0, w, h);
    // asphalt aggregate
    noiseRect(ctx, w, h, 190, 200, 215, { count: 5200, alpha: [0.03, 0.1], seed: 3 });
    noiseRect(ctx, w, h, 10, 12, 20, { count: 4200, alpha: [0.05, 0.16], seed: 4 });
    // worn concrete patches (walkways / plaza repairs)
    const rand = mulberry32(21);
    ctx.fillStyle = 'rgba(96,101,112,0.5)';
    for (let i = 0; i < 9; i++) {
      const x = rand() * w, y = rand() * h;
      ctx.save(); ctx.translate(x, y); ctx.rotate((rand() - 0.5) * 0.7);
      ctx.fillRect(-rand() * 90 - 30, -rand() * 70 - 20, rand() * 180 + 70, rand() * 140 + 50);
      ctx.restore();
    }
    // cracks
    for (let i = 0; i < 16; i++) crack(ctx, rand() * w, rand() * h, 60 + rand() * 160, rand() * 6.28, 'rgba(8,10,14,0.5)');
    // oil stains
    blotches(ctx, w, h, '5,6,10', { count: 14, r: [14, 55], alpha: [0.14, 0.3], seed: 5 });
    // tire arcs near mid lane (x world -5..5 => px center 512 +- 85)
    ctx.strokeStyle = 'rgba(12,13,18,0.32)';
    ctx.lineWidth = 10;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      const cx = 512 + (rand() - 0.5) * 60, cy = 200 + i * 130;
      ctx.moveTo(cx - 30, cy);
      ctx.quadraticCurveTo(cx + (rand() - 0.5) * 80, cy + 60, cx + 26, cy + 130);
      ctx.stroke();
    }
    // bare concrete rim (collector base edge)
    ctx.fillStyle = '#494e58';
    ctx.fillRect(0, 0, w, 3 * px); ctx.fillRect(0, h - 3 * px, w, 3 * px);
    ctx.fillRect(0, 0, 3 * px, h); ctx.fillRect(w - 3 * px, 0, 3 * px, h);
    noiseRect(ctx, w, h, 220, 224, 232, { count: 2600, alpha: [0.03, 0.09], seed: 6 });
    // painted route hints (worn white arrows in mid + site lanes)
    ctx.fillStyle = 'rgba(214,220,228,0.16)';
    ctx.save(); ctx.translate(512, 360); ctx.beginPath();
    ctx.moveTo(0, -46); ctx.lineTo(22, -10); ctx.lineTo(8, -10); ctx.lineTo(8, 46); ctx.lineTo(-8, 46); ctx.lineTo(-8, -10); ctx.lineTo(-22, -10); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.fillStyle = 'rgba(214,220,228,0.10)';
    ctx.fillRect(300, 420, 56, 8); ctx.fillRect(668, 700, 8, 56);
  });
}

function rnd2(rand) { return rand() * 2 - 1; }


// ------------------------------------------------------------- surfaces ----

export function concreteTexture(tint = '#6f747e', { seams = true, rustStreaks = 6, seed = 31 } = {}) {
  return tex(512, 512, (ctx, w, h) => {
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, w, h);
    noiseRect(ctx, w, h, 235, 238, 245, { count: 3200, alpha: [0.03, 0.1], seed });
    noiseRect(ctx, w, h, 20, 22, 30, { count: 2600, alpha: [0.04, 0.12], seed: seed + 1 });
    blotches(ctx, w, h, '40,44,54', { count: 16, r: [20, 70], alpha: [0.06, 0.16], seed: seed + 2 });
    if (seams) {
      const rand = mulberry32(seed + 3);
      ctx.strokeStyle = 'rgba(14,16,22,0.5)';
      ctx.lineWidth = 2;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(0, (i * h) / 4); ctx.lineTo(w, (i * h) / 4 + rnd2(rand) * 6); ctx.stroke();
      }
    }
    const rand2 = mulberry32(seed + 4);
    for (let i = 0; i < rustStreaks; i++) {
      const x = rand2() * w, y = rand2() * h * 0.5;
      const grad = ctx.createLinearGradient(0, y, 0, y + 60 + rand2() * 90);
      grad.addColorStop(0, 'rgba(96,58,30,0.30)');
      grad.addColorStop(1, 'rgba(96,58,30,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - 2.5 - rand2() * 2, y, 5 + rand2() * 4, 60 + rand2() * 90);
    }
    // grime at the bottom
    const g2 = ctx.createLinearGradient(0, h * 0.6, 0, h);
    g2.addColorStop(0, 'rgba(10,12,16,0)');
    g2.addColorStop(1, 'rgba(10,12,16,0.4)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 5; i++) crack(ctx, rand2() * w, rand2() * h, 40 + rand2() * 90, rand2() * 6.28, 'rgba(12,14,18,0.4)');
  }, { repeat: [1, 1] });
}

export function corrugatedTexture(base = '#5c6d5f', { rust = 0.5, seed = 41, slats = null } = {}) {
  return tex(512, 512, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    if (slats) { // horizontal roll-door slats
      const period = h / slats;
      for (let i = 0; i < slats; i++) {
        const g = ctx.createLinearGradient(0, i * period, 0, (i + 1) * period);
        g.addColorStop(0, 'rgba(255,255,255,0.14)');
        g.addColorStop(0.35, 'rgba(255,255,255,0.05)');
        g.addColorStop(0.62, 'rgba(0,0,0,0.22)');
        g.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = g;
        ctx.fillRect(0, i * period, w, period);
      }
    } else { // vertical corrugation ribs
      const period = 32;
      for (let x = 0; x < w; x += period) {
        const g = ctx.createLinearGradient(x, 0, x + period, 0);
        g.addColorStop(0, 'rgba(0,0,0,0.30)');
        g.addColorStop(0.3, 'rgba(255,255,255,0.10)');
        g.addColorStop(0.55, 'rgba(255,255,255,0.16)');
        g.addColorStop(0.8, 'rgba(0,0,0,0.10)');
        g.addColorStop(1, 'rgba(0,0,0,0.34)');
        ctx.fillStyle = g;
        ctx.fillRect(x, 0, period, h);
      }
    }
    noiseRect(ctx, w, h, 25, 28, 34, { count: 2200, alpha: [0.04, 0.1], seed });
    const rand = mulberry32(seed + 9);
    for (let i = 0; i < 14 * rust; i++) {
      const x = rand() * w, y = rand() * h, r = 6 + rand() * 26;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(122,66,30,${0.25 + rand() * 0.3})`);
      g.addColorStop(1, 'rgba(122,66,30,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    // rust runs downward
    for (let i = 0; i < 10 * rust; i++) {
      const x = rand() * w, y = rand() * h * 0.6;
      const grad = ctx.createLinearGradient(0, y, 0, y + 40 + rand() * 120);
      grad.addColorStop(0, 'rgba(110,60,26,0.28)');
      grad.addColorStop(1, 'rgba(110,60,26,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - 2, y, 4 + rand() * 3, 40 + rand() * 120);
    }
    const g2 = ctx.createLinearGradient(0, h * 0.55, 0, h);
    g2.addColorStop(0, 'rgba(8,10,14,0)');
    g2.addColorStop(1, 'rgba(8,10,14,0.35)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
  }, { repeat: [1, 1] });
}

export function woodTexture(base = '#8a6b45', { seed = 51, vertical = false } = {}) {
  return tex(512, 512, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    const rand = mulberry32(seed);
    const planks = 5;
    const ph = h / planks;
    for (let i = 0; i < planks; i++) {
      const tone = 0.86 + rand() * 0.26;
      ctx.fillStyle = `rgba(${Math.min(255, 138 * tone)},${Math.min(255, 107 * tone)},${Math.min(255, 69 * tone)},1)`;
      ctx.fillRect(0, i * ph + 1, w, ph - 2);
      ctx.strokeStyle = 'rgba(30,20,10,0.55)';
      ctx.lineWidth = 2;
      ctx.strokeRect(0.5, i * ph + 0.5, w - 1, ph - 1);
      // grain
      ctx.strokeStyle = 'rgba(60,40,20,0.25)';
      ctx.lineWidth = 1;
      for (let g2 = 0; g2 < 7; g2++) {
        const y0 = i * ph + rand() * ph;
        ctx.beginPath();
        ctx.moveTo(0, y0);
        for (let x = 0; x < w; x += 22) ctx.lineTo(x, y0 + Math.sin(x * 0.02 + rand() * 6) * 2.2);
        ctx.stroke();
      }
      if (rand() < 0.5) { // knot
        const kx = rand() * w, ky = i * ph + ph / 2;
        const g = ctx.createRadialGradient(kx, ky, 1, kx, ky, 7);
        g.addColorStop(0, 'rgba(40,24,10,0.8)');
        g.addColorStop(1, 'rgba(40,24,10,0)');
        ctx.fillStyle = g;
        ctx.fillRect(kx - 8, ky - 8, 16, 16);
      }
    }
    noiseRect(ctx, w, h, 30, 22, 12, { count: 1400, alpha: [0.04, 0.12], seed: seed + 2 });
  }, { repeat: [1, 1] });
}

export function crateTexture(seed = 61) {
  const wood = woodTexture('#8a6b45', { seed });
  // draw stencil over the wood canvas
  const c = wood.image; const ctx = c.getContext('2d');
  ctx.strokeStyle = 'rgba(40,26,12,0.85)';
  ctx.lineWidth = 26;
  ctx.strokeRect(13, 13, 512 - 26, 512 - 26);
  ctx.fillStyle = 'rgba(40,26,12,0.85)';
  ctx.fillRect(13, 13, 512 - 26, 20);
  stencilText(ctx, 'AMMO 7.62', 256, 120, 52, 'rgba(226,222,210,A)', 0.5);
  stencilText(ctx, 'THIS SIDE UP', 256, 400, 30, 'rgba(226,222,210,A)', 0.4);
  wood.needsUpdate = true;
  return wood;
}

export function cardboardTexture(seed = 71) {
  return tex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#a07d52';
    ctx.fillRect(0, 0, w, h);
    noiseRect(ctx, w, h, 234, 210, 168, { count: 1600, alpha: [0.05, 0.12], seed });
    blotches(ctx, w, h, '70,50,30', { count: 8, r: [12, 40], alpha: [0.1, 0.28], seed: seed + 1 });
    ctx.strokeStyle = 'rgba(60,42,24,0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    ctx.fillStyle = 'rgba(70,66,60,0.6)';
    ctx.fillRect(w * 0.42, 0, w * 0.16, h / 2); // tape strip
    ctx.strokeStyle = 'rgba(50,36,20,0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
  }, { repeat: [1, 1] });
}

export function barrelTexture(base = '#3d6fa8', seed = 81) {
  return tex(512, 256, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    // ribs (two bands top/bottom + mid)
    for (const frac of [0.16, 0.5, 0.84]) {
      const y = h * frac;
      const g = ctx.createLinearGradient(0, y - 14, 0, y + 14);
      g.addColorStop(0, 'rgba(0,0,0,0.3)');
      g.addColorStop(0.4, 'rgba(255,255,255,0.15)');
      g.addColorStop(1, 'rgba(0,0,0,0.3)');
      ctx.fillStyle = g;
      ctx.fillRect(0, y - 14, w, 28);
    }
    const rand = mulberry32(seed);
    for (let i = 0; i < 16; i++) {
      const x = rand() * w, y = rand() * h, r = 6 + rand() * 22;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(122,66,30,${0.2 + rand() * 0.3})`);
      g.addColorStop(1, 'rgba(122,66,30,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    // hazard diamond
    ctx.save();
    ctx.translate(w * 0.5, h * 0.5); ctx.rotate(Math.PI / 4);
    ctx.fillStyle = 'rgba(220,170,40,0.85)';
    ctx.fillRect(-20, -20, 40, 40);
    ctx.restore();
    ctx.fillStyle = 'rgba(20,20,24,0.9)';
    ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('!', w * 0.5, h * 0.5 + 1);
    noiseRect(ctx, w, h, 10, 12, 18, { count: 900, alpha: [0.05, 0.14], seed: seed + 1 });
    const g2 = ctx.createLinearGradient(0, h * 0.6, 0, h);
    g2.addColorStop(0, 'rgba(8,10,14,0)');
    g2.addColorStop(1, 'rgba(8,10,14,0.4)');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);
  });
}

export function rustIronTexture(seed = 91) {
  return tex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#4b4f55';
    ctx.fillRect(0, 0, w, h);
    blotches(ctx, w, h, '122,66,30', { count: 26, r: [8, 36], alpha: [0.2, 0.5], seed });
    blotches(ctx, w, h, '80,44,20', { count: 14, r: [10, 30], alpha: [0.2, 0.45], seed: seed + 1 });
    noiseRect(ctx, w, h, 20, 22, 28, { count: 1400, alpha: [0.05, 0.14], seed: seed + 2 });
    // rivet grid
    ctx.fillStyle = 'rgba(15,16,20,0.55)';
    for (let x = 16; x < w; x += 48) for (let y = 16; y < h; y += 48) {
      ctx.beginPath(); ctx.arc(x, y, 3, 0, 6.29); ctx.fill();
      ctx.fillStyle = 'rgba(200,205,214,0.25)';
      ctx.beginPath(); ctx.arc(x - 1, y - 1, 1.4, 0, 6.29); ctx.fill();
      ctx.fillStyle = 'rgba(15,16,20,0.55)';
    }
  }, { repeat: [1, 1] });
}

export function sackTexture(seed = 101) {
  return tex(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#9b8659';
    ctx.fillRect(0, 0, w, h);
    noiseRect(ctx, w, h, 60, 48, 26, { count: 1800, alpha: [0.08, 0.2], seed });
    ctx.strokeStyle = 'rgba(60,48,24,0.35)';
    ctx.lineWidth = 1;
    for (let y = 6; y < h; y += 7) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y + 2); ctx.stroke(); }
  });
}

// ---------------------------------------------------------------- decals ----

export function graffitiTexture(kind, seed = 111) {
  const draws = {
    tFaction: (ctx, w, h) => {
      ctx.fillStyle = 'rgba(232,120,40,0.85)';
      ctx.beginPath(); // angular phoenix/wing
      ctx.moveTo(w * 0.5, h * 0.12); ctx.lineTo(w * 0.9, h * 0.45); ctx.lineTo(w * 0.62, h * 0.42);
      ctx.lineTo(w * 0.78, h * 0.88); ctx.lineTo(w * 0.5, h * 0.6); ctx.lineTo(w * 0.22, h * 0.88);
      ctx.lineTo(w * 0.38, h * 0.42); ctx.lineTo(w * 0.1, h * 0.45); ctx.closePath(); ctx.fill();
      stencilText(ctx, 'T', w * 0.5, h * 0.3, 46, 'rgba(20,16,20,A)', 0.8);
    },
    ctFaction: (ctx, w, h) => {
      ctx.strokeStyle = 'rgba(96,150,230,0.9)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(w * 0.5, h * 0.1); ctx.lineTo(w * 0.88, h * 0.28); ctx.lineTo(w * 0.8, h * 0.72);
      ctx.lineTo(w * 0.5, h * 0.92); ctx.lineTo(w * 0.2, h * 0.72); ctx.lineTo(w * 0.12, h * 0.28);
      ctx.closePath(); ctx.stroke();
      ctx.lineWidth = 8;
      ctx.beginPath(); ctx.moveTo(w * 0.5, h * 0.25); ctx.lineTo(w * 0.5, h * 0.75); ctx.moveTo(w * 0.3, h * 0.5); ctx.lineTo(w * 0.7, h * 0.5); ctx.stroke();
      stencilText(ctx, 'CT', w * 0.5, h * 0.5, 40, 'rgba(96,150,230,A)', 0.85);
    },
    rushB: (ctx, w, h) => {
      stencilText(ctx, 'RUSH B', w * 0.5, h * 0.4, 64, 'rgba(226,222,210,A)', 0.7, 'bold', -0.06);
      stencilText(ctx, 'dont stop', w * 0.5, h * 0.72, 34, 'rgba(226,160,60,A)', 0.55);
    },
    glhf: (ctx, w, h) => {
      stencilText(ctx, 'GL HF', w * 0.5, h * 0.5, 70, 'rgba(210,205,195,A)', 0.5, 'bold', 0.04);
    },
    cs1337: (ctx, w, h) => {
      stencilText(ctx, 'CS', w * 0.32, h * 0.45, 96, 'rgba(240,235,225,A)', 0.75);
      stencilText(ctx, '1337', w * 0.68, h * 0.6, 52, 'rgba(150,200,240,A)', 0.6, 'bold', 0.1);
    },
    skull: (ctx, w, h) => {
      ctx.fillStyle = 'rgba(220,215,205,0.75)';
      ctx.beginPath(); ctx.ellipse(w / 2, h * 0.42, w * 0.26, h * 0.3, 0, 0, 6.29); ctx.fill();
      ctx.fillRect(w * 0.36, h * 0.6, w * 0.28, h * 0.14);
      ctx.fillStyle = 'rgba(15,15,20,0.9)';
      ctx.beginPath(); ctx.ellipse(w * 0.42, h * 0.4, w * 0.06, h * 0.08, 0, 0, 6.29); ctx.fill();
      ctx.beginPath(); ctx.ellipse(w * 0.58, h * 0.4, w * 0.06, h * 0.08, 0, 0, 6.29); ctx.fill();
      ctx.fillRect(w * 0.485, h * 0.52, w * 0.03, h * 0.05);
      for (let i = 0; i < 4; i++) ctx.fillRect(w * (0.4 + i * 0.05), h * 0.62, w * 0.024, h * 0.1);
    },
  };
  return tex(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    draws[kind](ctx, w, h);
    // spray dissolvance
    const rand = mulberry32(seed);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 260; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand() * 0.5})`;
      ctx.fillRect(rand() * w, rand() * h, 2 + rand() * 5, 2 + rand() * 5);
    }
    ctx.globalCompositeOperation = 'source-over';
  });
}

export function bulletHoleTexture() {
  return tex(64, 64, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 13);
    g.addColorStop(0, 'rgba(6,6,8,0.95)');
    g.addColorStop(0.5, 'rgba(16,16,20,0.8)');
    g.addColorStop(1, 'rgba(16,16,20,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(32, 32, 13, 0, 6.29); ctx.fill();
    ctx.strokeStyle = 'rgba(10,10,14,0.5)';
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * 6.28 + 0.4;
      ctx.beginPath();
      ctx.moveTo(32 + Math.cos(a) * 6, 32 + Math.sin(a) * 6);
      ctx.lineTo(32 + Math.cos(a) * (14 + Math.random() * 7), 32 + Math.sin(a) * (14 + Math.random() * 7));
      ctx.stroke();
    }
  });
}

export function siteMarkTexture(letter) {
  return tex(512, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(224,228,234,0.75)';
    ctx.lineWidth = 14;
    ctx.setLineDash([34, 20]);
    ctx.strokeRect(40, 40, w - 80, h - 80);
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(w / 2, h / 2, 130, 0, 6.29); ctx.stroke();
    ctx.font = 'bold 190px "Arial Black", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(224,228,234,0.8)';
    ctx.fillText(letter, w / 2, h / 2 + 8);
    stencilText(ctx, 'BOMB SITE', w / 2, h - 62, 40, 'rgba(224,228,234,A)', 0.6);
    const rand = mulberry32(letter === 'A' ? 5 : 9);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand() * 0.6})`;
      ctx.fillRect(rand() * w, rand() * h, 3 + rand() * 6, 3 + rand() * 6);
    }
  });
}

export function signTexture(lines, { w = 256, h = 128, bg = 'rgba(28,32,40,0.92)', fg = '#cfd6df', border = '#8a919c', size = 42 } = {}) {
  return tex(w, h, (ctx) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = bg;
    roundRect(ctx, 6, 6, w - 12, h - 12, 10); ctx.fill();
    ctx.strokeStyle = border; ctx.lineWidth = 5;
    roundRect(ctx, 6, 6, w - 12, h - 12, 10); ctx.stroke();
    ctx.font = `bold ${size}px "Arial Black", sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = fg;
    const arr = Array.isArray(lines) ? lines : [lines];
    arr.forEach((t, i) => ctx.fillText(t, w / 2, (h / (arr.length + 1)) * (i + 1)));
    noiseRect(ctx, w, h, 10, 12, 16, { count: 260, alpha: [0.06, 0.2], seed: 3 });
  });
}

export function arrowTexture(letter, dir) {
  return tex(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(220,224,230,0.6)';
    ctx.font = 'bold 120px "Arial Black", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(letter, w / 2 - 30, h / 2);
    ctx.save();
    ctx.translate(w / 2 + 70, h / 2);
    ctx.rotate(dir === 'left' ? Math.PI : 0);
    ctx.beginPath();
    ctx.moveTo(-40, -18); ctx.lineTo(10, -18); ctx.lineTo(10, -38); ctx.lineTo(46, 0);
    ctx.lineTo(10, 38); ctx.lineTo(10, 18); ctx.lineTo(-40, 18); ctx.closePath(); ctx.fill();
    ctx.restore();
    const rand = mulberry32(77);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand() * 0.55})`;
      ctx.fillRect(rand() * w, rand() * h, 3 + rand() * 5, 3 + rand() * 5);
    }
  });
}

export function policeEmblemTexture() {
  return tex(256, 320, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    // shield
    ctx.beginPath();
    ctx.moveTo(w / 2, 16); ctx.lineTo(w - 30, 56); ctx.lineTo(w - 44, h - 90);
    ctx.quadraticCurveTo(w / 2, h - 16, 30, h - 90); ctx.lineTo(30 + 0, 56);
    ctx.closePath();
    ctx.fillStyle = 'rgba(24,34,56,0.95)'; ctx.fill();
    ctx.strokeStyle = '#c8a54a'; ctx.lineWidth = 7; ctx.stroke();
    // star
    ctx.fillStyle = '#c8a54a';
    ctx.beginPath();
    const cx = w / 2, cy = h * 0.36, R = 42;
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI * 2) / 5;
      const b = a + Math.PI / 5;
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.lineTo(cx + Math.cos(b) * R * 0.42, cy + Math.sin(b) * R * 0.42);
    }
    ctx.closePath(); ctx.fill();
    ctx.font = 'bold 34px "Arial Black", sans-serif';
    ctx.textAlign = 'center'; ctx.fillStyle = '#dfe4ec';
    ctx.fillText('POLICE', w / 2, h * 0.72);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('KEEP OUT', w / 2, h * 0.82);
    noiseRect(ctx, w, h, 10, 12, 16, { count: 200, alpha: [0.05, 0.18], seed: 8 });
  });
}

export function rosterTexture() {
  return tex(128, 160, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(222,220,210,0.92)';
    ctx.fillRect(4, 4, w - 8, h - 8);
    ctx.fillStyle = 'rgba(180,50,40,0.85)';
    ctx.fillRect(4, 4, w - 8, 22);
    ctx.strokeStyle = 'rgba(60,60,66,0.6)';
    ctx.lineWidth = 1;
    for (let y = 40; y < h - 10; y += 14) {
      ctx.beginPath(); ctx.moveTo(12, y); ctx.lineTo(w - 12, y); ctx.stroke();
    }
    for (let x = 64; x < w - 8; x += 18) {
      ctx.beginPath(); ctx.moveTo(x, 32); ctx.lineTo(x, h - 10); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(30,30,40,0.8)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(16, 46); ctx.bezierCurveTo(34, 40, 40, 56, 58, 48); ctx.stroke();
  });
}

export function newspaperTexture() {
  return tex(128, 96, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(206,204,196,0.9)';
    ctx.fillRect(2, 2, w - 4, h - 4);
    ctx.fillStyle = 'rgba(40,40,46,0.85)';
    ctx.fillRect(8, 8, w - 16, 10);
    ctx.fillStyle = 'rgba(80,80,88,0.6)';
    for (let col = 0; col < 3; col++) {
      for (let y = 26; y < h - 10; y += 6) ctx.fillRect(10 + col * 38, y, 30 - col * 2, 2.6);
    }
  });
}

export function glassTexture() {
  return tex(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(120,150,190,0.24)');
    g.addColorStop(1, 'rgba(40,60,90,0.4)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(200,220,245,0.28)';
    ctx.lineWidth = 2;
    const rand = mulberry32(55);
    for (let i = 0; i < 14; i++) {
      const x = rand() * w;
      ctx.beginPath();
      ctx.moveTo(x, rand() * h * 0.5);
      ctx.bezierCurveTo(x - 4, h * 0.5, x + 5, h * 0.7, x - 2, h);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(200,215,235,0.10)';
    for (let i = 0; i < 6; i++) ctx.fillRect(rand() * w, rand() * h, 8 + rand() * 20, 3 + rand() * 4);
  });
}

export function stripeTexture() {
  return tex(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#c8ccd2';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#b8412f';
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-Math.PI / 4);
    for (let x = -w; x < w; x += 48) ctx.fillRect(x, -h, 24, h * 2);
    ctx.restore();
    noiseRect(ctx, w, h, 20, 22, 28, { count: 500, alpha: [0.06, 0.18], seed: 6 });
    const g = ctx.createLinearGradient(0, h * 0.5, 0, h);
    g.addColorStop(0, 'rgba(8,10,14,0)');
    g.addColorStop(1, 'rgba(8,10,14,0.35)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }, { repeat: [1, 1] });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Soft radial glow sprite (lamp halos, steam).
export function glowTexture(inner = 'rgba(255,255,255,0.9)', mid = 'rgba(255,255,255,0.25)') {
  return tex(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h / 2, 1, w / 2, h / 2, w / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, mid);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }, { srgb: false });
}

export function steamTexture() {
  return tex(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const rand = mulberry32(88);
    for (let i = 0; i < 26; i++) {
      const x = w / 2 + (rand() - 0.5) * w * 0.5, y = h / 2 + (rand() - 0.5) * h * 0.5;
      const r = 10 + rand() * 26;
      const g = ctx.createRadialGradient(x, y, 1, x, y, r);
      g.addColorStop(0, `rgba(235,240,248,${0.10 + rand() * 0.12})`);
      g.addColorStop(1, 'rgba(235,240,248,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }, { srgb: false });
}

export function chainLinkTexture() {
  return tex(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(150,158,170,0.85)';
    ctx.lineWidth = 2.4;
    const step = 16;
    for (let i = -h; i < w + h; i += step) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + h, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(i, h); ctx.lineTo(i + h, 0); ctx.stroke();
    }
  }, { repeat: [1, 1], srgb: false });
}

// Transparent stencil text decal (freight codes, container IDs, wall marks).
export function codeStencil(text, { color = 'rgba(226,222,210,A)', size = 60, w = 256, h = 96, rot = 0 } = {}) {
  return tex(w, h, (ctx) => {
    ctx.clearRect(0, 0, w, h);
    stencilText(ctx, text, w / 2, h / 2, size, color, 0.75, 'bold', rot);
    const rand = mulberry32(text.length * 7 + 13);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand() * 0.5})`;
      ctx.fillRect(rand() * w, rand() * h, 2 + rand() * 4, 2 + rand() * 4);
    }
  });
}

// Small equipment icon stencil (body armour / helmet boxes at CT spawn).
export function equipIconTexture(kind) {
  return tex(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(226,228,232,0.8)';
    if (kind === 'vest') {
      ctx.beginPath();
      ctx.moveTo(w * 0.3, h * 0.18); ctx.lineTo(w * 0.7, h * 0.18);
      ctx.lineTo(w * 0.76, h * 0.42); ctx.lineTo(w * 0.66, h * 0.86);
      ctx.lineTo(w * 0.34, h * 0.86); ctx.lineTo(w * 0.24, h * 0.42);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(30,34,44,0.85)';
      ctx.fillRect(w * 0.42, h * 0.3, w * 0.16, h * 0.4);
    } else {
      ctx.beginPath(); ctx.arc(w / 2, h * 0.46, w * 0.26, Math.PI, 0); ctx.fill();
      ctx.fillRect(w * 0.24, h * 0.46, w * 0.52, h * 0.1);
      ctx.fillRect(w * 0.3, h * 0.56, w * 0.4, h * 0.18);
    }
  });
}
