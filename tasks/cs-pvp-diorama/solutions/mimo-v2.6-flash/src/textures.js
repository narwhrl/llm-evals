import * as THREE from 'three';

// Deterministic PRNG so the scene is reproducible across runs.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cache = new Map();
function cached(key, fn) {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key);
}

function make(w, h, draw, { srgb = true, repeat = null } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = 4;
  return t;
}

function speckle(ctx, w, h, rnd, count, colors, sMin = 1, sMax = 3, alpha = 0.5) {
  for (let i = 0; i < count; i++) {
    ctx.globalAlpha = alpha * (0.4 + rnd() * 0.6);
    ctx.fillStyle = colors[(rnd() * colors.length) | 0];
    const s = sMin + rnd() * (sMax - sMin);
    ctx.fillRect(rnd() * w, rnd() * h, s, s);
  }
  ctx.globalAlpha = 1;
}

function blotches(ctx, w, h, rnd, count, colors, rMin, rMax, alpha) {
  for (let i = 0; i < count; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const r = rMin + rnd() * (rMax - rMin);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const col = colors[(rnd() * colors.length) | 0];
    g.addColorStop(0, col);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = alpha * (0.5 + rnd() * 0.5);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function grimeStreaks(ctx, w, h, rnd, count, color = 'rgba(20,22,26,0.35)') {
  for (let i = 0; i < count; i++) {
    const x = rnd() * w;
    const len = h * (0.2 + rnd() * 0.7);
    const g = ctx.createLinearGradient(0, 0, 0, len);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, 1 + rnd() * 3, len);
  }
}

function cracks(ctx, w, h, rnd, count) {
  ctx.strokeStyle = 'rgba(10,12,14,0.55)';
  ctx.lineWidth = 1;
  for (let i = 0; i < count; i++) {
    let x = rnd() * w;
    let y = rnd() * h;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = 4 + ((rnd() * 6) | 0);
    for (let s = 0; s < steps; s++) {
      x += (rnd() - 0.5) * 30;
      y += (rnd() - 0.5) * 30;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

export function concreteTexture(base = '#8b9096', key = 'c') {
  return cached('concrete' + key + base, () =>
    make(256, 256, (ctx, w, h) => {
      const rnd = mulberry32(101);
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
      blotches(ctx, w, h, rnd, 26, ['rgba(70,74,80,0.5)', 'rgba(160,165,172,0.4)', 'rgba(50,55,62,0.35)'], 12, 60, 0.35);
      speckle(ctx, w, h, rnd, 500, ['#5c6168', '#a8adb4', '#6e737a'], 1, 2, 0.4);
      grimeStreaks(ctx, w, h, rnd, 10, 'rgba(30,34,40,0.3)');
      cracks(ctx, w, h, rnd, 3);
    }, { repeat: [2, 2] })
  );
}

export function asphaltTexture() {
  return cached('asphalt', () =>
    make(512, 512, (ctx, w, h) => {
      const rnd = mulberry32(202);
      ctx.fillStyle = '#343a43';
      ctx.fillRect(0, 0, w, h);
      blotches(ctx, w, h, rnd, 40, ['rgba(20,23,28,0.55)', 'rgba(70,78,88,0.4)', 'rgba(48,54,62,0.5)'], 14, 70, 0.4);
      speckle(ctx, w, h, rnd, 2400, ['#242830', '#484f58', '#3c424a', '#5a616a'], 1, 2, 0.55);
      cracks(ctx, w, h, rnd, 6);
    }, { repeat: [5, 5] })
  );
}

export function rustTexture(base = '#6d757d', key = 'r') {
  return cached('rust' + key + base, () =>
    make(256, 256, (ctx, w, h) => {
      const rnd = mulberry32(303);
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
      blotches(ctx, w, h, rnd, 40, ['rgba(122,74,50,0.8)', 'rgba(85,51,31,0.7)', 'rgba(160,90,40,0.5)'], 6, 34, 0.55);
      speckle(ctx, w, h, rnd, 600, ['#7a4a32', '#55331f', '#8a5a3a'], 1, 3, 0.5);
      grimeStreaks(ctx, w, h, rnd, 8, 'rgba(40,26,16,0.4)');
    }, { repeat: [2, 2] })
  );
}

export function paintTexture(base, { label = '', labelColor = 'rgba(230,235,240,0.85)', key = '' } = {}) {
  return cached('paint' + key + base + label, () =>
    make(256, 256, (ctx, w, h) => {
      const rnd = mulberry32(404 + key.length * 7);
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
      // corrugated / panel shading
      for (let x = 0; x < w; x += 16) {
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(x, 0, 6, h);
        ctx.fillStyle = 'rgba(0,0,0,0.10)';
        ctx.fillRect(x + 8, 0, 4, h);
      }
      blotches(ctx, w, h, rnd, 24, ['rgba(110,70,44,0.5)', 'rgba(30,34,40,0.35)', 'rgba(255,255,255,0.08)'], 5, 26, 0.4);
      speckle(ctx, w, h, rnd, 300, ['#5a3a26', '#20242a', '#b8bcc2'], 1, 2, 0.4);
      grimeStreaks(ctx, w, h, rnd, 6, 'rgba(20,22,26,0.35)');
      if (label) {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = labelColor;
        ctx.font = 'bold 44px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, w / 2, h / 2);
        ctx.font = 'bold 18px monospace';
        ctx.fillText('CS-LINE', w / 2, h / 2 + 40);
        ctx.globalAlpha = 1;
      }
    }, { repeat: [1, 1] })
  );
}

export function woodTexture(key = 'w') {
  return cached('wood' + key, () =>
    make(256, 256, (ctx, w, h) => {
      const rnd = mulberry32(505);
      ctx.fillStyle = '#8a6a42';
      ctx.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 32) {
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(0, y, w, 2);
        ctx.fillStyle = `rgba(${90 + ((rnd() * 40) | 0)},${65 + ((rnd() * 30) | 0)},36,0.35)`;
        ctx.fillRect(0, y + 2, w, 30);
        for (let i = 0; i < 8; i++) {
          ctx.strokeStyle = 'rgba(70,50,28,0.35)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          const yy = y + 4 + rnd() * 26;
          ctx.moveTo(0, yy);
          ctx.bezierCurveTo(w * 0.3, yy + (rnd() - 0.5) * 6, w * 0.7, yy + (rnd() - 0.5) * 6, w, yy + (rnd() - 0.5) * 4);
          ctx.stroke();
        }
      }
      speckle(ctx, w, h, rnd, 200, ['#5a4028', '#a8845a'], 1, 2, 0.4);
    }, { repeat: [1, 1] })
  );
}

export function cardboardTexture(key = 'cb') {
  return cached('cardboard' + key, () =>
    make(128, 128, (ctx, w, h) => {
      const rnd = mulberry32(606);
      ctx.fillStyle = '#97794f';
      ctx.fillRect(0, 0, w, h);
      blotches(ctx, w, h, rnd, 14, ['rgba(70,54,32,0.4)', 'rgba(160,130,86,0.4)'], 6, 30, 0.4);
      // tape strip
      ctx.fillStyle = 'rgba(210,190,150,0.55)';
      ctx.fillRect(w / 2 - 8, 0, 16, h);
      speckle(ctx, w, h, rnd, 200, ['#7a6140', '#b39266'], 1, 2, 0.45);
    }, { repeat: [1, 1] })
  );
}

export function graffitiTexture(text, color = '#c45a8a', key = 'g') {
  return cached('graffiti' + key + text, () =>
    make(256, 128, (ctx, w, h) => {
      const rnd = mulberry32(707 + text.length * 13);
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rnd() - 0.5) * 0.25);
      ctx.font = `bold ${52 + ((rnd() * 20) | 0)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      ctx.fillText(text, 0, 0);
      // drips
      for (let i = 0; i < 6; i++) {
        const x = (rnd() - 0.5) * 160;
        ctx.fillRect(x, 8, 3, 10 + rnd() * 26);
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    })
  );
}

export function zoneMarkTexture(letter, key = 'z') {
  return cached('zone' + key + letter, () =>
    make(256, 256, (ctx, w, h) => {
      const rnd = mulberry32(808 + letter.charCodeAt(0));
      ctx.clearRect(0, 0, w, h);
      // sprayed square outline
      ctx.strokeStyle = '#e8ecf2';
      ctx.lineWidth = 10;
      ctx.globalAlpha = 0.9;
      ctx.strokeRect(28, 28, w - 56, h - 56);
      // rough spray speckle over the frame
      for (let i = 0; i < 300; i++) {
        const edge = (rnd() * 4) | 0;
        let x, y;
        if (edge === 0) { x = 28 + rnd() * (w - 56); y = 24 + rnd() * 16; }
        else if (edge === 1) { x = 28 + rnd() * (w - 56); y = h - 40 + rnd() * 16; }
        else if (edge === 2) { x = 24 + rnd() * 16; y = 28 + rnd() * (h - 56); }
        else { x = w - 40 + rnd() * 16; y = 28 + rnd() * (h - 56); }
        ctx.fillStyle = '#e8ecf2';
        ctx.globalAlpha = 0.25 + rnd() * 0.4;
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = '#e8ecf2';
      ctx.font = 'bold 130px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, w / 2, h / 2 + 6);
      ctx.globalAlpha = 1;
    })
  );
}

export function bulletHoleTexture(key = 'b') {
  return cached('bullet' + key, () =>
    make(64, 64, (ctx, w, h) => {
      const rnd = mulberry32(909);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, 14);
      g.addColorStop(0, 'rgba(8,8,10,0.95)');
      g.addColorStop(0.5, 'rgba(30,30,34,0.8)');
      g.addColorStop(0.8, 'rgba(180,184,190,0.35)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(15,15,18,0.7)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 5; i++) {
        const a = rnd() * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * 5, cy + Math.sin(a) * 5);
        ctx.lineTo(cx + Math.cos(a) * (12 + rnd() * 10), cy + Math.sin(a) * (12 + rnd() * 10));
        ctx.stroke();
      }
    })
  );
}

export function badgeTexture(key = 'bd') {
  return cached('badge' + key, () =>
    make(256, 256, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#d8b040';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2 - 14, 78, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#1d3f7a';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2 - 14, 70, 0, Math.PI * 2);
      ctx.fill();
      // star
      ctx.fillStyle = '#d8b040';
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? 40 : 17;
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
        const x = w / 2 + Math.cos(a) * r;
        const y = h / 2 - 14 + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#e8ecf2';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('POLICE', w / 2, h - 34);
      ctx.font = 'bold 18px sans-serif';
      ctx.fillStyle = '#d8b040';
      ctx.fillText('WARNING', w / 2, h - 8);
    })
  );
}

export function dutyScheduleTexture(key = 'd') {
  return cached('duty' + key, () =>
    make(128, 160, (ctx, w, h) => {
      const rnd = mulberry32(1111);
      ctx.fillStyle = '#d8d4c4';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#3a3a40';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('值班表', w / 2, 20);
      ctx.strokeStyle = 'rgba(60,60,70,0.7)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const y = 34 + i * 15;
        ctx.beginPath();
        ctx.moveTo(8, y);
        ctx.lineTo(w - 8, y);
        ctx.stroke();
        ctx.fillStyle = 'rgba(60,60,70,0.6)';
        ctx.fillRect(12 + rnd() * 20, y - 9, 30 + rnd() * 40, 4);
      }
    })
  );
}

export function wetStreakTexture(key = 's') {
  return cached('streak' + key, () =>
    make(128, 256, (ctx, w, h) => {
      const rnd = mulberry32(1212);
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 40; i++) {
        const x = rnd() * w;
        const y = rnd() * h * 0.4;
        const len = 40 + rnd() * (h - 60);
        const g = ctx.createLinearGradient(0, y, 0, y + len);
        g.addColorStop(0, 'rgba(190,210,240,0)');
        g.addColorStop(0.2, `rgba(190,210,240,${0.10 + rnd() * 0.22})`);
        g.addColorStop(1, 'rgba(190,210,240,0)');
        ctx.fillStyle = g;
        ctx.fillRect(x, y, 1 + rnd() * 2, len);
      }
    })
  );
}

// Puddle blobs in ground-plane UV space (u → +x, v → -z / north).
export const PUDDLE_BLOBS = [
  { u: 0.30, v: 0.62, r: 0.09 },
  { u: 0.52, v: 0.40, r: 0.11 },
  { u: 0.68, v: 0.66, r: 0.08 },
  { u: 0.40, v: 0.24, r: 0.07 },
  { u: 0.22, v: 0.36, r: 0.06 },
  { u: 0.78, v: 0.30, r: 0.07 },
  { u: 0.60, v: 0.80, r: 0.075 },
  { u: 0.36, v: 0.80, r: 0.06 },
  { u: 0.84, v: 0.55, r: 0.055 },
  { u: 0.16, v: 0.72, r: 0.05 },
  { u: 0.50, v: 0.58, r: 0.05 },
  { u: 0.72, v: 0.46, r: 0.05 },
];

export function puddleMaskTexture() {
  return cached('puddleMask', () =>
    make(
      512,
      512,
      (ctx, w, h) => {
        const rnd = mulberry32(1313);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        for (const b of PUDDLE_BLOBS) {
          const cx = b.u * w;
          const cy = (1 - b.v) * h;
          const R = b.r * w;
          for (let i = 0; i < 7; i++) {
            const ox = (rnd() - 0.5) * R * 0.7;
            const oy = (rnd() - 0.5) * R * 0.7;
            const rr = R * (0.5 + rnd() * 0.6);
            const g = ctx.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, rr);
            g.addColorStop(0, 'rgba(255,255,255,0.95)');
            g.addColorStop(0.7, 'rgba(255,255,255,0.75)');
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(cx + ox, cy + oy, rr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      },
      { srgb: false }
    )
  );
}

export function softDotTexture() {
  return cached('softDot', () =>
    make(
      64,
      64,
      (ctx, w, h) => {
        const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.4, 'rgba(255,255,255,0.55)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      },
      { srgb: false }
    )
  );
}

export function paperTexture(key = 'p') {
  return cached('paper' + key, () =>
    make(96, 96, (ctx, w, h) => {
      const rnd = mulberry32(1414);
      ctx.fillStyle = '#cfc9b8';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(50,50,60,0.5)';
      ctx.lineWidth = 1;
      for (let y = 10; y < h - 8; y += 8) {
        ctx.beginPath();
        ctx.moveTo(8, y);
        ctx.lineTo(8 + 30 + rnd() * 44, y);
        ctx.stroke();
      }
    })
  );
}
