import * as THREE from 'three';

export const JP_FONT = '"Hiragino Sans","Yu Gothic UI","Yu Gothic","Meiryo","Noto Sans JP","Noto Sans CJK JP",sans-serif';

/** Draw into a fresh canvas and wrap it as an sRGB texture. */
export function canvasTexture(w, h, draw, { repeat = null, anisotropy = 8 } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = anisotropy;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

/** Linear (non-colour) data texture drawn on a canvas, e.g. wetness masks. */
export function dataCanvasTexture(w, h, draw) {
  const t = canvasTexture(w, h, draw);
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

export function text(g, str, x, y, size, color, { weight = 800, align = 'center', font = JP_FONT, base = 'middle' } = {}) {
  g.font = `${weight} ${size}px ${font}`;
  g.fillStyle = color;
  g.textAlign = align;
  g.textBaseline = base;
  g.fillText(str, x, y);
}

export function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** Small deterministic PRNG so every load shows the same miniature. */
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Tiny crescent-moon logo used by the store brand. */
export function moonLogo(g, cx, cy, r, color, cut) {
  g.fillStyle = color;
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = cut;
  g.beginPath();
  g.arc(cx + r * 0.42, cy - r * 0.28, r * 0.86, 0, Math.PI * 2);
  g.fill();
}
