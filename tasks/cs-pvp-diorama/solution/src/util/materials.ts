import {
  CanvasTexture,
  NearestFilter,
  RepeatWrapping,
  SRGBColorSpace,
  MeshToonMaterial,
  Texture,
  LinearFilter,
  DataTexture,
  RGBAFormat,
  UnsignedByteType,
  NoColorSpace,
} from 'three';

// Build a small 1D gradient ramp used by MeshToonMaterial for cel/toon shading.
// Returns a Texture suitable for use as `gradientMap`.
function buildToonGradient(steps = 4): Texture {
  const w = steps;
  const data = new Uint8Array(w * 4);
  for (let i = 0; i < w; i++) {
    // Push the lower band darker so shadows read as deep blue-grey.
    const v = i === 0 ? 90 : i === 1 ? 150 : i === 2 ? 210 : 255;
    data[i * 4 + 0] = v;
    data[i * 4 + 1] = v;
    data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  }
  const tex = new DataTexture(data, w, 1, RGBAFormat, UnsignedByteType);
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

const sharedGradient: Texture = buildToonGradient(4);

// Cache materials by hex color to avoid duplicate MeshToonMaterial instances.
const cache = new Map<number, MeshToonMaterial>();

export function toonMaterial(hex: number): MeshToonMaterial {
  const cached = cache.get(hex);
  if (cached) return cached;
  const mat = new MeshToonMaterial({ color: hex, gradientMap: sharedGradient });

  cache.set(hex, mat);
  return mat;
}

// Concrete wall / floor with subtle speckle, mapped at given UV repeats.
export function concreteMaterial(hex: number, repeat = 1): MeshToonMaterial {
  const mat = new MeshToonMaterial({
    color: hex,
    gradientMap: sharedGradient,
  });
  const tex = makeSpeckleTexture(hex, 128, repeat);
  mat.map = tex;
  return mat;
}

export function metalMaterial(hex: number): MeshToonMaterial {
  const mat = new MeshToonMaterial({ color: hex, gradientMap: sharedGradient });
  return mat;
}

export function woodMaterial(hex: number): MeshToonMaterial {
  const mat = new MeshToonMaterial({ color: hex, gradientMap: sharedGradient });
  const tex = makeWoodTexture(hex, 128);
  mat.map = tex;
  return mat;
}

export function wetAsphaltMaterial(): MeshToonMaterial {
  const mat = new MeshToonMaterial({
    color: 0x1a1d22,
    gradientMap: sharedGradient,
  });
  const tex = makeAsphaltTexture(256);
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.repeat.set(4, 4);
  mat.map = tex;
  return mat;
}

// Procedural speckle concrete texture.
function makeSpeckleTexture(baseHex: number, size: number, repeat: number): Texture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const base = '#' + baseHex.toString(16).padStart(6, '0');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  // dark grit
  for (let i = 0; i < size * size * 0.18; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = Math.random() * 50;
    ctx.fillStyle = `rgba(0,0,0,${0.05 + Math.random() * 0.12})`;
    ctx.fillRect(x, y, 1 + Math.random() * 1.5, 1 + Math.random() * 1.5);
  }
  // light highlights
  for (let i = 0; i < size * size * 0.08; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.08})`;
    ctx.fillRect(x, y, 1, 1);
  }
  // cracks
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    let x = Math.random() * size;
    let y = Math.random() * size;
    ctx.moveTo(x, y);
    for (let j = 0; j < 8; j++) {
      x += (Math.random() - 0.5) * 16;
      y += (Math.random() - 0.5) * 16;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function makeWoodTexture(baseHex: number, size: number): Texture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const base = '#' + baseHex.toString(16).padStart(6, '0');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    const v = 30 + Math.sin(y * 0.45) * 14 + (Math.random() - 0.5) * 12;
    ctx.fillStyle = `rgba(0,0,0,${Math.max(0, v / 255)})`;
    ctx.fillRect(0, y, size, 1);
  }
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.strokeStyle = `rgba(0,0,0,${0.1 + Math.random() * 0.2})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 18, y + (Math.random() - 0.5) * 4);
    ctx.stroke();
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.needsUpdate = true;
  return tex;
}

function makeAsphaltTexture(size: number): Texture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#1a1d22';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < size * size * 0.4; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const g = 30 + Math.random() * 40;
    ctx.fillStyle = `rgba(${g},${g},${g + 4},${0.15 + Math.random() * 0.25})`;
    ctx.fillRect(x, y, 1, 1);
  }
  // dark patches
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 6 + Math.random() * 16;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(0,0,0,0.35)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.needsUpdate = true;
  return tex;
}