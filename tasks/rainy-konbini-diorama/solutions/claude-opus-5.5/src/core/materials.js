import * as THREE from 'three';

// Three-band ramp: shadow, mid, lit. Nearest filtering keeps the bands crisp.
const ramp = new Uint8Array([105, 105, 170, 170, 170, 255, 255, 255]);
const gradientMap = new THREE.DataTexture(ramp, ramp.length, 1, THREE.RedFormat);
gradientMap.minFilter = THREE.NearestFilter;
gradientMap.magFilter = THREE.NearestFilter;
gradientMap.generateMipmaps = false;
gradientMap.needsUpdate = true;

const toonCache = new Map();
const glowCache = new Map();

/** Cached cel-shaded material for a flat colour. */
export function toon(hex, opts = {}) {
  const key = `${hex}|${opts.emissive ?? ''}|${opts.emissiveIntensity ?? ''}|${opts.side ?? ''}`;
  let m = toonCache.get(key);
  if (!m) {
    m = new THREE.MeshToonMaterial({ color: hex, gradientMap });
    if (opts.emissive !== undefined) {
      m.emissive.set(opts.emissive);
      m.emissiveIntensity = opts.emissiveIntensity ?? 1;
    }
    if (opts.side !== undefined) m.side = opts.side;
    toonCache.set(key, m);
  }
  return m;
}

/** Toon material with a colour map (never cached, textures are unique). */
export function toonMap(map, opts = {}) {
  const m = new THREE.MeshToonMaterial({ color: opts.color ?? 0xffffff, map, gradientMap });
  if (opts.emissiveMap) {
    m.emissive.set(opts.emissive ?? 0xffffff);
    m.emissiveMap = opts.emissiveMap;
    m.emissiveIntensity = opts.emissiveIntensity ?? 1;
  }
  if (opts.transparent) {
    m.transparent = true;
    m.alphaTest = opts.alphaTest ?? 0;
  }
  if (opts.side !== undefined) m.side = opts.side;
  return m;
}

/** Unlit HDR colour for light sources; values above 1 feed the bloom pass. */
export function glow(hex, intensity = 1) {
  const key = `${hex}|${intensity}`;
  let m = glowCache.get(key);
  if (!m) {
    m = new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(intensity), toneMapped: true });
    glowCache.set(key, m);
  }
  return m;
}

/** Unlit textured panel (signs, lightboxes, screens). Not cached so it can flicker independently. */
export function glowMap(map, intensity = 1, opts = {}) {
  const m = new THREE.MeshBasicMaterial({ map, color: new THREE.Color(1, 1, 1).multiplyScalar(intensity) });
  if (opts.transparent) {
    m.transparent = true;
    m.depthWrite = false;
  }
  if (opts.side !== undefined) m.side = opts.side;
  return m;
}

/** Soft additive light pool / halo; excluded from outlines. */
export function halo(hex, opacity = 0.5) {
  return new THREE.MeshBasicMaterial({
    color: hex,
    map: haloTexture(),
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

let haloTex = null;
function haloTexture() {
  if (haloTex) return haloTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  haloTex = new THREE.CanvasTexture(c);
  haloTex.colorSpace = THREE.SRGBColorSpace;
  return haloTex;
}

export { gradientMap };
