// Procedural canvas textures: grayscale material detail (tinted by material
// color) plus colored decals (graffiti, markings, signs, bullet holes).
import * as THREE from 'three';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
}

function toTexture(canvas, { srgb = true, repeat = false } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  }
  tex.anisotropy = 4;
  return tex;
}

// Deterministic pseudo random from seed.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function speckle(ctx, w, h, rand, count, alphaMin, alphaMax, sizeMin, sizeMax, light) {
  for (let i = 0; i < count; i++) {
    const v = Math.floor(128 + rand() * 127);
    const a = alphaMin + rand() * (alphaMax - alphaMin);
    ctx.fillStyle = light
      ? `rgba(${v},${v},${v},${a})`
      : `rgba(0,0,0,${a})`;
    const s = sizeMin + rand() * (sizeMax - sizeMin);
    ctx.fillRect(rand() * w, rand() * h, s, s);
  }
}

// --- grayscale tiling detail maps ------------------------------------------

export function concreteTexture() {
  const [c, ctx] = makeCanvas(256, 256);
  const rand = mulberry32(11);
  ctx.fillStyle = '#cfcfcf';
  ctx.fillRect(0, 0, 256, 256);
  speckle(ctx, 256, 256, rand, 2600, 0.04, 0.12, 1, 3, false);
  speckle(ctx, 256, 256, rand, 1200, 0.04, 0.1, 1, 2, true);
  // stains
  for (let i = 0; i < 10; i++) {
    const g = ctx.createRadialGradient(rand() * 256, rand() * 256, 2, rand() * 256, rand() * 256, 30 + rand() * 50);
    g.addColorStop(0, 'rgba(60,60,60,0.10)');
    g.addColorStop(1, 'rgba(60,60,60,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  }
  return toTexture(c, { srgb: false, repeat: true });
}

export function asphaltTexture() {
  const [c, ctx] = makeCanvas(256, 256);
  const rand = mulberry32(23);
  ctx.fillStyle = '#c8c8c8';
  ctx.fillRect(0, 0, 256, 256);
  speckle(ctx, 256, 256, rand, 3400, 0.05, 0.16, 1, 2, false);
  speckle(ctx, 256, 256, rand, 900, 0.05, 0.12, 1, 2, true);
  // cracks
  ctx.strokeStyle = 'rgba(40,40,40,0.35)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    let x = rand() * 256;
    let y = rand() * 256;
    ctx.moveTo(x, y);
    for (let j = 0; j < 6; j++) {
      x += (rand() - 0.5) * 60;
      y += (rand() - 0.5) * 60;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return toTexture(c, { srgb: false, repeat: true });
}

export function corrugatedTexture() {
  const [c, ctx] = makeCanvas(128, 128);
  // vertical ribs shading (grayscale)
  for (let x = 0; x < 128; x++) {
    const t = (x % 16) / 16;
    const v = 165 + Math.floor(90 * Math.abs(Math.sin(t * Math.PI)));
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(x, 0, 1, 128);
  }
  const rand = mulberry32(37);
  speckle(ctx, 128, 128, rand, 500, 0.03, 0.1, 1, 2, false);
  return toTexture(c, { srgb: false, repeat: true });
}

export function metalTexture() {
  const [c, ctx] = makeCanvas(256, 256);
  const rand = mulberry32(41);
  ctx.fillStyle = '#c4c4c4';
  ctx.fillRect(0, 0, 256, 256);
  speckle(ctx, 256, 256, rand, 1500, 0.03, 0.1, 1, 3, false);
  // scratches
  ctx.strokeStyle = 'rgba(70,70,70,0.25)';
  for (let i = 0; i < 24; i++) {
    ctx.lineWidth = 0.5 + rand();
    ctx.beginPath();
    const x = rand() * 256;
    const y = rand() * 256;
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rand() - 0.5) * 90, y + (rand() - 0.5) * 30);
    ctx.stroke();
  }
  // rust blotches
  for (let i = 0; i < 12; i++) {
    const x = rand() * 256;
    const y = rand() * 256;
    const g = ctx.createRadialGradient(x, y, 1, x, y, 8 + rand() * 22);
    g.addColorStop(0, 'rgba(70,50,40,0.28)');
    g.addColorStop(1, 'rgba(70,50,40,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  }
  return toTexture(c, { srgb: false, repeat: true });
}

export function woodTexture() {
  const [c, ctx] = makeCanvas(256, 256);
  const rand = mulberry32(53);
  ctx.fillStyle = '#d0d0d0';
  ctx.fillRect(0, 0, 256, 256);
  // horizontal planks
  for (let p = 0; p < 4; p++) {
    const y = p * 64;
    ctx.fillStyle = `rgba(0,0,0,${0.06 + rand() * 0.1})`;
    ctx.fillRect(0, y, 256, 2);
    // grain
    for (let i = 0; i < 26; i++) {
      ctx.strokeStyle = `rgba(90,70,50,${0.05 + rand() * 0.09})`;
      ctx.lineWidth = 0.6 + rand();
      ctx.beginPath();
      const gy = y + 4 + rand() * 58;
      ctx.moveTo(0, gy);
      ctx.bezierCurveTo(80, gy + (rand() - 0.5) * 8, 170, gy + (rand() - 0.5) * 8, 256, gy);
      ctx.stroke();
    }
  }
  speckle(ctx, 256, 256, rand, 500, 0.03, 0.08, 1, 2, false);
  return toTexture(c, { srgb: false, repeat: true });
}

export function cardboardTexture() {
  const [c, ctx] = makeCanvas(128, 128);
  const rand = mulberry32(67);
  ctx.fillStyle = '#d8d8d8';
  ctx.fillRect(0, 0, 128, 128);
  speckle(ctx, 128, 128, rand, 700, 0.03, 0.09, 1, 2, false);
  // fluting hint
  for (let x = 0; x < 128; x += 4) {
    ctx.fillStyle = 'rgba(0,0,0,0.045)';
    ctx.fillRect(x, 0, 1, 128);
  }
  // tape strip
  ctx.fillStyle = 'rgba(120,120,120,0.35)';
  ctx.fillRect(56, 0, 16, 128);
  return toTexture(c, { srgb: false, repeat: true });
}

// Tileable ripple field for puddle distortion (wrapped drawing).
export function rippleTexture() {
  const S = 256;
  const [c, ctx] = makeCanvas(S, S);
  const rand = mulberry32(79);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, S, S);
  ctx.lineWidth = 2;
  for (let i = 0; i < 42; i++) {
    const x = rand() * S;
    const y = rand() * S;
    const r = 4 + rand() * 22;
    const a = 0.25 + rand() * 0.5;
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(x + ox * S, y + oy * S, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,255,255,${a * 0.5})`;
        ctx.beginPath();
        ctx.arc(x + ox * S, y + oy * S, r * 0.55, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }
  return toTexture(c, { srgb: false, repeat: true });
}

// Vertical water streaks (alpha overlay for walls/glass).
export function streakTexture() {
  const [c, ctx] = makeCanvas(256, 256);
  const rand = mulberry32(91);
  ctx.clearRect(0, 0, 256, 256);
  for (let i = 0; i < 46; i++) {
    const x = rand() * 256;
    const w = 0.8 + rand() * 2.2;
    const len = 40 + rand() * 200;
    const y = rand() * 256 - 40;
    const g = ctx.createLinearGradient(0, y, 0, y + len);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.3, `rgba(255,255,255,${0.10 + rand() * 0.16})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, len);
  }
  const tex = toTexture(c, { srgb: false, repeat: true });
  return tex;
}

// Soft radial glow sprite (lamp halos, light cones).
export function glowTexture() {
  const [c, ctx] = makeCanvas(128, 128);
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return toTexture(c);
}

// Soft irregular blob (steam puffs).
export function blobTexture() {
  const [c, ctx] = makeCanvas(128, 128);
  const rand = mulberry32(103);
  for (let i = 0; i < 9; i++) {
    const x = 40 + rand() * 48;
    const y = 40 + rand() * 48;
    const r = 14 + rand() * 22;
    const g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }
  return toTexture(c);
}

// --- colored decals ---------------------------------------------------------

function worn(ctx, w, h, rand, amount) {
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < amount; i++) {
    ctx.fillStyle = `rgba(0,0,0,${0.3 + rand() * 0.6})`;
    ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 6, 1 + rand() * 3);
  }
  ctx.globalCompositeOperation = 'source-over';
}

// Stencil text decal (graffiti / markings). Returns texture with alpha.
export function textDecal(text, { color = '#c8ccd4', size = 90, w = 256, h = 256, seed = 5, angle = 0, font = 'bold %spx "Arial Black", Arial, sans-serif' } = {}) {
  const [c, ctx] = makeCanvas(w, h);
  const rand = mulberry32(seed);
  ctx.translate(w / 2, h / 2);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.font = font.replace('%s', size);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 0);
  worn(ctx, w, h, rand, 260);
  return toTexture(c);
}

// Bombsite floor marking: circle + letter, white spray paint.
export function bombsiteTexture(letter) {
  const [c, ctx] = makeCanvas(256, 256);
  const rand = mulberry32(letter.charCodeAt(0));
  ctx.strokeStyle = 'rgba(230,233,238,0.92)';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(128, 128, 96, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(230,233,238,0.92)';
  ctx.font = 'bold 110px "Arial Black", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 128, 134);
  worn(ctx, 256, 256, rand, 380);
  return toTexture(c);
}

// Cluster of bullet holes.
export function bulletHoleTexture() {
  const [c, ctx] = makeCanvas(128, 128);
  const rand = mulberry32(7);
  for (let i = 0; i < 14; i++) {
    const x = 20 + rand() * 88;
    const y = 20 + rand() * 88;
    const r = 1.5 + rand() * 2.5;
    const g = ctx.createRadialGradient(x, y, 0.5, x, y, r * 1.8);
    g.addColorStop(0, 'rgba(10,10,12,0.9)');
    g.addColorStop(0.5, 'rgba(22,22,26,0.55)');
    g.addColorStop(1, 'rgba(30,30,34,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
  return toTexture(c);
}

// Police badge for the CT rear wall.
export function badgeTexture() {
  const [c, ctx] = makeCanvas(256, 256);
  const rand = mulberry32(13);
  ctx.strokeStyle = 'rgba(210,220,235,0.9)';
  ctx.fillStyle = 'rgba(210,220,235,0.12)';
  ctx.lineWidth = 8;
  // shield outline
  ctx.beginPath();
  ctx.moveTo(128, 26);
  ctx.lineTo(214, 62);
  ctx.lineTo(200, 168);
  ctx.quadraticCurveTo(180, 216, 128, 234);
  ctx.quadraticCurveTo(76, 216, 56, 168);
  ctx.lineTo(42, 62);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // star
  ctx.fillStyle = 'rgba(210,220,235,0.9)';
  ctx.beginPath();
  const cx = 128;
  const cy = 118;
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 46 : 19;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    ctx[i === 0 ? 'moveTo' : 'lineTo'](cx + r * Math.cos(a), cy + r * Math.sin(a));
  }
  ctx.closePath();
  ctx.fill();
  ctx.font = 'bold 30px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('POLICE', 128, 208);
  worn(ctx, 256, 256, rand, 200);
  return toTexture(c);
}

// Duty schedule paper for the B guard room wall.
export function scheduleTexture() {
  const [c, ctx] = makeCanvas(128, 160);
  const rand = mulberry32(17);
  ctx.fillStyle = '#d8d4c8';
  ctx.fillRect(0, 0, 128, 160);
  ctx.fillStyle = '#3a3a3a';
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DUTY ROSTER', 64, 22);
  ctx.strokeStyle = 'rgba(60,60,60,0.7)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 7; i++) {
    const y = 40 + i * 16;
    ctx.beginPath();
    ctx.moveTo(12, y);
    ctx.lineTo(116, y);
    ctx.stroke();
    ctx.fillStyle = 'rgba(60,60,60,0.55)';
    ctx.fillRect(16, y - 7, 30 + rand() * 50, 3);
  }
  worn(ctx, 128, 160, rand, 60);
  return toTexture(c);
}

// Freight sign board (arrow + text).
export function freightSignTexture() {
  const [c, ctx] = makeCanvas(256, 128);
  const rand = mulberry32(29);
  ctx.fillStyle = '#28406b';
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = '#dfe4ea';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 244, 116);
  ctx.fillStyle = '#dfe4ea';
  ctx.font = 'bold 34px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FREIGHT  YARD', 128, 50);
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillText('GATE 03  →', 128, 94);
  worn(ctx, 256, 128, rand, 160);
  return toTexture(c);
}

// Road sign (fallen, near mid low wall).
export function roadSignTexture() {
  const [c, ctx] = makeCanvas(128, 128);
  const rand = mulberry32(31);
  ctx.fillStyle = '#b8742c';
  ctx.beginPath();
  ctx.moveTo(64, 8);
  ctx.lineTo(120, 64);
  ctx.lineTo(64, 120);
  ctx.lineTo(8, 64);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#1c1c1c';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = '#1c1c1c';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DETOUR', 64, 72);
  worn(ctx, 128, 128, rand, 120);
  return toTexture(c);
}

// Hazard stripes (barriers, curb edges).
export function hazardTexture() {
  const [c, ctx] = makeCanvas(128, 32);
  ctx.fillStyle = '#c7c9cd';
  ctx.fillRect(0, 0, 128, 32);
  ctx.fillStyle = '#b23a2e';
  for (let x = -32; x < 160; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 32);
    ctx.lineTo(x + 16, 0);
    ctx.lineTo(x + 32, 0);
    ctx.lineTo(x + 16, 32);
    ctx.closePath();
    ctx.fill();
  }
  return toTexture(c, { repeat: true });
}

// Police van livery stripe.
export function policeStripeTexture() {
  const [c, ctx] = makeCanvas(256, 64);
  ctx.fillStyle = '#e3e7ec';
  ctx.fillRect(0, 0, 256, 64);
  ctx.fillStyle = '#274067';
  ctx.fillRect(0, 20, 256, 24);
  ctx.fillStyle = '#dfe4ea';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('POLICE', 128, 38);
  return toTexture(c);
}

// Container side with ribs + painted id.
export function containerTexture(id, base = '#7a7a7a') {
  const [c, ctx] = makeCanvas(256, 128);
  const rand = mulberry32(id.length * 13 + 3);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 128);
  for (let x = 0; x < 256; x++) {
    const t = (x % 24) / 24;
    const v = Math.floor(40 * Math.abs(Math.sin(t * Math.PI)));
    ctx.fillStyle = `rgba(0,0,0,${0.08 + v / 900})`;
    ctx.fillRect(x, 0, 1, 128);
  }
  ctx.fillStyle = 'rgba(230,233,238,0.75)';
  ctx.font = 'bold 26px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(id, 18, 40);
  ctx.font = 'bold 14px "Courier New", monospace';
  ctx.fillText('MAX 30480 KG', 18, 64);
  ctx.fillText('CS-' + id, 18, 104);
  worn(ctx, 256, 128, rand, 260);
  return toTexture(c);
}
