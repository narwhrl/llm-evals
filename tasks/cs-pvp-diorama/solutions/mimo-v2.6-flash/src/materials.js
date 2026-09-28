import * as THREE from 'three';

let gradient = null;
export function toonGradient() {
  if (!gradient) {
    const steps = new Uint8Array([118, 176, 222, 255]);
    gradient = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat);
    gradient.minFilter = THREE.NearestFilter;
    gradient.magFilter = THREE.NearestFilter;
    gradient.needsUpdate = true;
  }
  return gradient;
}

export function toon(color, opts = {}) {
  return new THREE.MeshToonMaterial({ color, gradientMap: toonGradient(), ...opts });
}

export function toonMap(map, opts = {}) {
  return new THREE.MeshToonMaterial({ color: 0xffffff, map, gradientMap: toonGradient(), ...opts });
}

export function glowSpriteMaterial(color, opacity = 0.65) {
  return new THREE.SpriteMaterial({
    color,
    opacity,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
