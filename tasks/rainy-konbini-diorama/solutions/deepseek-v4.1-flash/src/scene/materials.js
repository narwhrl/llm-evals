import * as THREE from 'three';
import { toon, glow } from '../core/toon.js';
import { canvasTexture } from '../core/textures.js';

/**
 * Shared material set. Building these once keeps the scene's material count
 * small, and every surface is either a toon material (lit, cel-shaded) or a
 * glow material (self-lit signage and light panels).
 */
export function createMaterials() {
  const mats = {
    // --- Base and paving ---------------------------------------------------
    plinth: toon('plinth', { color: 0x2b3040 }),
    kerb: toon('kerb', { color: 0x9aa0b0 }),
    walkSide: toon('walkSide', { color: 0x6c7182 }),
    drainGrate: toon('drainGrate', { color: 0x2a2e3a }),
    manhole: toon('manhole', { color: 0x3a3f4e }),

    // --- Store shell -------------------------------------------------------
    wallCream: toon('wallCream', { color: 0xdedacf }),
    wallWarm: toon('wallWarm', { color: 0xe8e2d4 }),
    wallSide: toon('wallSide', { color: 0xbcb8b0 }),
    roof: toon('roof', { color: 0x4a4d5c }),
    trim: toon('trim', { color: 0xf2efe6 }),
    trimDark: toon('trimDark', { color: 0x3b3f4c }),
    fascia: toon('fascia', { color: 0xfaf7ef, emissive: 0x2a2620, emissiveIntensity: 1 }),
    interiorWall: toon('interiorWall', { color: 0xf0e2c8, emissive: 0x8a6034, emissiveIntensity: 0.34 }),
    interiorFloor: toon('interiorFloor', { color: 0xd8cdb4, emissive: 0x6a5028, emissiveIntensity: 0.26 }),
    ceiling: toon('ceiling', { color: 0xeee2cc, emissive: 0x8a6c3c, emissiveIntensity: 0.4 }),

    // --- Metals and fittings ----------------------------------------------
    metal: toon('metal', { color: 0x8b90a0 }),
    metalDark: toon('metalDark', { color: 0x4a4e5c }),
    steel: toon('steel', { color: 0xb8bcc8 }),
    plasticWhite: toon('plasticWhite', { color: 0xe6e3da }),
    plasticGrey: toon('plasticGrey', { color: 0x8e93a2 }),
    rubber: toon('rubber', { color: 0x24272f }),

    // --- Props -------------------------------------------------------------
    red: toon('red', { color: 0xc8484a }),
    blue: toon('blue', { color: 0x4a6fa8 }),
    green: toon('green', { color: 0x4f8a6a }),
    yellow: toon('yellow', { color: 0xd8b445 }),
    orange: toon('orange', { color: 0xd08248 }),
    wood: toon('wood', { color: 0x9a7350 }),
    soil: toon('soil', { color: 0x3a3230 }),
    foliage: toon('foliage', { color: 0x3f6b52 }),
    foliageDeep: toon('foliageDeep', { color: 0x2d5040 }),
    concrete: toon('concrete', { color: 0x767a88 }),
    brick: toon('brick', { color: 0x6e5a56 }),
    canopy: toon('canopy', { color: 0x8e8a84 }),

    // --- Self-lit ----------------------------------------------------------
    windowGlow: glow('windowGlow', { color: 0xffe6b8, opacity: 0.9 }),
    lampGlass: glow('lampGlass', { color: 0xfff0cc }),
    ceilingPanel: glow('ceilingPanel', { color: 0xfff6e2 }),
    whiteLight: glow('whiteLight', { color: 0xfff4dc }),
    redLight: glow('redLight', { color: 0xff4a52 }),
    greenLight: glow('greenLight', { color: 0x54e08a }),
    amberLight: glow('amberLight', { color: 0xffb347 }),
  };

  mats.fridgeGlow = glow('fridgeGlow', { color: 0xdff2ff, map: fridgeInteriorTexture(), opacity: 1 });
  mats.fridgeGlow.map.colorSpace = THREE.SRGBColorSpace;

  mats.productStrip = toon('productStrip', { color: 0xffffff, map: productStripTexture() });
  mats.productStrip.map.colorSpace = THREE.SRGBColorSpace;

  mats.magazineStack = toon('magazineStack', { color: 0xffffff, map: magazineTexture() });
  mats.magazineStack.map.colorSpace = THREE.SRGBColorSpace;

  mats.snackStrip = toon('snackStrip', { color: 0xffffff, map: snackTexture() });
  mats.snackStrip.map.colorSpace = THREE.SRGBColorSpace;

  mats.bentoStrip = toon('bentoStrip', { color: 0xffffff, map: bentoTexture() });
  mats.bentoStrip.map.colorSpace = THREE.SRGBColorSpace;

  return mats;
}

// ---------------------------------------------------------------------------
// Interior product artwork
// ---------------------------------------------------------------------------

/** A row of brightly coloured drink bottles seen through a cooler door. */
function fridgeInteriorTexture() {
  const w = 256;
  const h = 512;
  return canvasTexture(w, h, (ctx) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#f4fbff');
    grad.addColorStop(0.5, '#dcefff');
    grad.addColorStop(1, '#bfd8ec');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const palette = ['#e8524f', '#3f7fd0', '#f0b53c', '#54a86a', '#e07b3c', '#c75fa8', '#4fbcc4', '#e8e2d0'];
    const cols = 5;
    const rows = 7;
    const cw = w / cols;
    const rh = h / rows;
    for (let r = 0; r < rows; r += 1) {
      // Shelf board under each row.
      ctx.fillStyle = 'rgba(150,170,190,0.5)';
      ctx.fillRect(0, (r + 1) * rh - 5, w, 4);
      for (let c = 0; c < cols; c += 1) {
        const color = palette[(r * cols + c) % palette.length];
        const bw = cw * 0.52;
        const bh = rh * 0.62;
        const bx = c * cw + (cw - bw) / 2;
        const by = r * rh + rh * 0.22;
        ctx.fillStyle = color;
        ctx.fillRect(bx, by, bw, bh);
        // Bottle neck and cap.
        ctx.fillRect(bx + bw * 0.32, by - rh * 0.1, bw * 0.36, rh * 0.12);
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.fillRect(bx + bw * 0.12, by + bh * 0.12, bw * 0.16, bh * 0.6);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(bx + bw * 0.24, by + bh * 0.34, bw * 0.52, bh * 0.16);
      }
    }
  });
}

/** Shelf rows of small packaged goods, colour-coded by category. */
function productStripTexture() {
  const w = 512;
  const h = 256;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#efeade';
    ctx.fillRect(0, 0, w, h);
    const palette = [
      '#d9534f', '#4a7ec0', '#e2b23f', '#57a068', '#dd8a3e',
      '#b268b8', '#48a8b4', '#e4e0d2', '#c25a74', '#7a8fc8',
    ];
    const rows = 4;
    const rh = h / rows;
    for (let r = 0; r < rows; r += 1) {
      ctx.fillStyle = 'rgba(190,184,172,0.9)';
      ctx.fillRect(0, (r + 1) * rh - 4, w, 3);
      const items = 12;
      const cw = w / items;
      for (let c = 0; c < items; c += 1) {
        const color = palette[(r * 5 + c * 3) % palette.length];
        const bw = cw * (0.62 + ((c + r) % 3) * 0.08);
        const bh = rh * (0.5 + ((c * 2 + r) % 4) * 0.06);
        const bx = c * cw + (cw - bw) / 2;
        const by = r * rh + rh - bh - 8;
        ctx.fillStyle = color;
        ctx.fillRect(bx, by, bw, bh);
        ctx.fillStyle = 'rgba(255,255,255,0.82)';
        ctx.fillRect(bx + bw * 0.18, by + bh * 0.3, bw * 0.64, bh * 0.2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(bx + bw * 0.18, by + bh * 0.62, bw * 0.5, bh * 0.12);
      }
    }
  });
}

/** Snack bags, larger and glossier than the small goods. */
function snackTexture() {
  const w = 512;
  const h = 256;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#f2ece0';
    ctx.fillRect(0, 0, w, h);
    const palette = ['#e06a3c', '#d8443f', '#e8b83c', '#4f8f5c', '#3f76b8', '#b45aa8'];
    const rows = 3;
    const rh = h / rows;
    for (let r = 0; r < rows; r += 1) {
      ctx.fillStyle = 'rgba(190,184,172,0.9)';
      ctx.fillRect(0, (r + 1) * rh - 4, w, 3);
      const items = 7;
      const cw = w / items;
      for (let c = 0; c < items; c += 1) {
        const color = palette[(r * 3 + c * 2) % palette.length];
        const bw = cw * 0.78;
        const bh = rh * 0.7;
        const bx = c * cw + (cw - bw) / 2;
        const by = r * rh + rh - bh - 10;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(bx, by + bh * 0.12);
        ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx, by + bh);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(255,248,230,0.85)';
        ctx.beginPath();
        ctx.arc(bx + bw * 0.5, by + bh * 0.42, bw * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.fillRect(bx + bw * 0.16, by + bh * 0.72, bw * 0.62, bh * 0.1);
      }
    }
  });
}

/** Prepared-food trays in the open chiller. */
function bentoTexture() {
  const w = 256;
  const h = 256;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#e8e2d4';
    ctx.fillRect(0, 0, w, h);
    const rows = 3;
    const rh = h / rows;
    const palette = [['#f0e6d0', '#c8543c', '#5c8a4a'], ['#f4ecd8', '#d8a83c', '#b8543c'], ['#ece4d0', '#8a6a44', '#5c8a4a']];
    for (let r = 0; r < rows; r += 1) {
      ctx.fillStyle = 'rgba(160,168,180,0.85)';
      ctx.fillRect(0, (r + 1) * rh - 5, w, 4);
      const items = 3;
      const cw = w / items;
      for (let c = 0; c < items; c += 1) {
        const bx = c * cw + cw * 0.1;
        const by = r * rh + rh * 0.16;
        const bw = cw * 0.8;
        const bh = rh * 0.62;
        const p = palette[(r + c) % palette.length];
        ctx.fillStyle = '#2c2f38';
        ctx.fillRect(bx, by, bw, bh);
        ctx.fillStyle = p[0];
        ctx.fillRect(bx + 3, by + 3, bw - 6, bh - 6);
        ctx.fillStyle = p[1];
        ctx.fillRect(bx + 6, by + 6, bw * 0.44, bh * 0.42);
        ctx.fillStyle = p[2];
        ctx.fillRect(bx + bw * 0.54, by + 6, bw * 0.4, bh * 0.42);
        ctx.fillStyle = 'rgba(250,246,232,0.9)';
        ctx.fillRect(bx + 6, by + bh * 0.58, bw * 0.86, bh * 0.3);
      }
    }
  });
}

/** Colourful magazine covers in the rack. */
function magazineTexture() {
  const w = 256;
  const h = 256;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#e4ded0';
    ctx.fillRect(0, 0, w, h);
    const palette = ['#d8484a', '#3f76b8', '#e8b83c', '#4f8f5c', '#b45aa8', '#48a8b4', '#e07b3c'];
    const cols = 4;
    const rows = 3;
    const cw = w / cols;
    const rh = h / rows;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const color = palette[(r * cols + c) % palette.length];
        const bx = c * cw + cw * 0.08;
        const by = r * rh + rh * 0.06;
        const bw = cw * 0.84;
        const bh = rh * 0.86;
        ctx.fillStyle = color;
        ctx.fillRect(bx, by, bw, bh);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(bx + bw * 0.1, by + bh * 0.08, bw * 0.8, bh * 0.14);
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.fillRect(bx + bw * 0.1, by + bh * 0.4, bw * 0.6, bh * 0.08);
        ctx.fillRect(bx + bw * 0.1, by + bh * 0.56, bw * 0.5, bh * 0.08);
        ctx.fillStyle = 'rgba(0,0,0,0.16)';
        ctx.fillRect(bx, by, bw, bh * 0.04);
      }
    }
  });
}
