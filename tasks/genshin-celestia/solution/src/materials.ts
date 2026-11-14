import * as THREE from 'three';

/** Deterministic RNG so every load shows the same composition. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Cheap value-noise-ish wobble, deterministic. */
export function wobble(x: number, z: number, seed = 0): number {
  return (
    Math.sin(x * 0.043 + seed) * Math.cos(z * 0.037 + seed * 1.7) * 0.55 +
    Math.sin(x * 0.11 + seed * 2.3) * Math.cos(z * 0.093 + seed) * 0.3 +
    Math.sin(x * 0.23 + z * 0.19 + seed * 0.7) * 0.15
  );
}

function canvasTexture(size: number, paint: (ctx: CanvasRenderingContext2D, s: number) => void): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  paint(ctx, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
/** Soft round puff used for clouds / mist / glow. */
export let puffTexture: THREE.CanvasTexture;

export function initSharedTextures(): void {
  puffTexture = canvasTexture(128, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });
}

export const palette = {
  ivory: 0xf4edde,
  ivoryShadow: 0xd9cdb4,
  gold: 0xd9a94e,
  goldBright: 0xffd98a,
  grass: 0x71bd5d,
  grassDeep: 0x4d9450,
  rock: 0x99887a,
  rockDark: 0x6e6055,
  trunk: 0x6b4a35,
  leaf: 0x3f8f4e,
  leafLight: 0x6fbf5a,
  water: 0xbfe3f5,
  windowGlow: 0xffe9a8,
};

export function toonGradient(): THREE.DataTexture {
  const data = new Uint8Array([120, 170, 225, 255]);
  const tex = new THREE.DataTexture(data, 4, 1, THREE.RGBAFormat);
  tex.needsUpdate = true;
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  return tex;
}

export interface SharedMats {
  grad: THREE.DataTexture;
  ivory: THREE.MeshToonMaterial;
  ivoryFlat: THREE.MeshStandardMaterial;
  gold: THREE.MeshStandardMaterial;
  grass: THREE.MeshStandardMaterial;
  grassDeep: THREE.MeshStandardMaterial;
  rock: THREE.MeshStandardMaterial;
  rockDark: THREE.MeshStandardMaterial;
  trunk: THREE.MeshStandardMaterial;
  leaf: THREE.MeshStandardMaterial;
  leafLight: THREE.MeshStandardMaterial;
  dark: THREE.MeshBasicMaterial; // arcade shadow insets
  glowGold: THREE.MeshBasicMaterial;
  glowWindow: THREE.MeshBasicMaterial;
}

export function makeSharedMats(): SharedMats {
  const grad = toonGradient();
  return {
    grad,
    ivory: new THREE.MeshToonMaterial({ color: palette.ivory, gradientMap: grad }),
    ivoryFlat: new THREE.MeshStandardMaterial({ color: palette.ivory, roughness: 0.85, flatShading: true }),
    gold: new THREE.MeshStandardMaterial({
      color: palette.gold, roughness: 0.32, metalness: 0.85, emissive: 0x51380a, emissiveIntensity: 0.55,
    }),
    grass: new THREE.MeshStandardMaterial({ color: palette.grass, roughness: 1, flatShading: true }),
    grassDeep: new THREE.MeshStandardMaterial({ color: palette.grassDeep, roughness: 1, flatShading: true }),
    rock: new THREE.MeshStandardMaterial({ color: palette.rock, roughness: 1, flatShading: true }),
    rockDark: new THREE.MeshStandardMaterial({ color: palette.rockDark, roughness: 1, flatShading: true }),
    trunk: new THREE.MeshStandardMaterial({ color: palette.trunk, roughness: 1, flatShading: true }),
    leaf: new THREE.MeshStandardMaterial({ color: palette.leaf, roughness: 1, flatShading: true }),
    leafLight: new THREE.MeshStandardMaterial({ color: palette.leafLight, roughness: 1, flatShading: true }),
    dark: new THREE.MeshBasicMaterial({ color: 0x3a3f52 }),
    glowGold: new THREE.MeshBasicMaterial({ color: palette.goldBright }),
    glowWindow: new THREE.MeshBasicMaterial({ color: palette.windowGlow }),
  };
}
