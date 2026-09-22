import * as THREE from 'three';
import { PUDDLE_BLOBS } from '../textures.js';
import { uvToWorld } from '../scene/base.js';

// Expanding ripple rings on safe open-ground puddles.
const SAFE_RIPPLE_UV = [
  [0.30, 0.62], [0.52, 0.40], [0.68, 0.66], [0.40, 0.24],
  [0.22, 0.36], [0.78, 0.30], [0.60, 0.80], [0.84, 0.55],
  [0.50, 0.58], [0.72, 0.46], [0.52, 0.36], [0.31, 0.66],
  [0.66, 0.62], [0.75, 0.33], [0.44, 0.27], [0.57, 0.76],
];

export function createRipples() {
  const group = new THREE.Group();
  const geo = new THREE.RingGeometry(0.42, 0.5, 28);
  const rings = [];
  for (let i = 0; i < SAFE_RIPPLE_UV.length; i++) {
    const [u, v] = SAFE_RIPPLE_UV[i];
    const { x, z } = uvToWorld(u, v);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xaebfd8,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.055, z);
    m.renderOrder = 4;
    group.add(m);
    rings.push({ mesh: m, offset: (i * 0.618) % 1, speed: 0.45 + (i % 5) * 0.11 });
  }
  // a couple of rings per key puddle for density
  void PUDDLE_BLOBS;
  return {
    mesh: group,
    update(t) {
      for (const r of rings) {
        const phase = (t * r.speed + r.offset) % 1;
        const s = 0.25 + phase * 2.6;
        r.mesh.scale.set(s, s, 1);
        r.mesh.material.opacity = (1 - phase) * 0.38;
      }
    },
  };
}
