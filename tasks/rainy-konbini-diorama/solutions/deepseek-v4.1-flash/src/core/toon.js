import * as THREE from 'three';

/**
 * A 64-texel ramp sampled by MeshToonMaterial as dot(N, L) * 0.5 + 0.5.
 * The left half is the away-facing region; the right half carries four visible
 * cel bands so lit surfaces read as flat anime colour steps.
 */
let gradientMap = null;

export function toonGradient() {
  if (gradientMap) return gradientMap;
  const size = 64;
  const bands = [0.30, 0.52, 0.76, 1.0];
  const data = new Uint8Array(size);
  for (let i = 0; i < size; i += 1) {
    const u = (i + 0.5) / size;
    let value;
    if (u < 0.5) {
      value = 0.30;
    } else {
      const t = (u - 0.5) * 2;
      value = bands[Math.min(bands.length - 1, Math.floor(t * bands.length))];
    }
    data[i] = Math.round(value * 255);
  }
  gradientMap = new THREE.DataTexture(data, size, 1, THREE.RedFormat);
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;
  gradientMap.generateMipmaps = false;
  gradientMap.needsUpdate = true;
  return gradientMap;
}

const cache = new Map();

function key(name, options) {
  return `${name}|${JSON.stringify(options)}`;
}

/** Cel-shaded surface material. */
export function toon(name, options = {}) {
  const cacheKey = key(name, options);
  const hit = cache.get(cacheKey);
  if (hit) return hit;

  const {
    color = 0xffffff,
    emissive = 0x000000,
    emissiveIntensity = 1,
    map = null,
    side = THREE.FrontSide,
    transparent = false,
    opacity = 1,
    depthWrite = true,
  } = options;

  const material = new THREE.MeshToonMaterial({
    color,
    emissive,
    emissiveIntensity,
    gradientMap: toonGradient(),
    map,
    side,
    transparent,
    opacity,
    depthWrite,
  });
  cache.set(cacheKey, material);
  return material;
}

/** Flat self-lit surface for signage, screens and light panels. */
export function glow(name, options = {}) {
  const cacheKey = key(name, options);
  const hit = cache.get(cacheKey);
  if (hit) return hit;

  const {
    color = 0xffffff,
    map = null,
    transparent = true,
    opacity = 1,
    blending = THREE.NormalBlending,
    depthWrite = false,
    side = THREE.FrontSide,
    toneMapped = false,
  } = options;

  const material = new THREE.MeshBasicMaterial({
    color,
    map,
    transparent,
    opacity,
    blending,
    depthWrite,
    side,
    toneMapped,
  });
  cache.set(cacheKey, material);
  return material;
}

export function disposeMaterialCache() {
  for (const material of cache.values()) material.dispose();
  cache.clear();
}
