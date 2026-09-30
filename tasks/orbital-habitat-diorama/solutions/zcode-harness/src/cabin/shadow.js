import * as THREE from 'three';
import { perforatedPanel } from './shell.js';
import { mesh } from './common.js';

export function buildShadowShell(ctx, parent) {
  const material = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false,
    side: THREE.DoubleSide });
  const group = new THREE.Group(); group.name = 'invisible-light-blocking-capsule'; parent.add(group);
  // A radius-2.3 rounded enclosure, clipped at the rear pressure-wall plane so the
  // actual openings and shadow openings coincide exactly (not an approximate cut mesh).
  const radius = 2.3, cz = -0.35, cy = 1.1, rear = -2.11;
  const angle = Math.acos((rear - cz) / radius);
  const low = cy - radius * Math.sin(angle), high = cy + radius * Math.sin(angle);
  const panel = perforatedPanel(-4.1, 4.1, low, high, ctx.portholes, rear, 0.001, material);
  group.add(panel);
  const pos = [], uv = [], indices = [], cross = [];
  const segments = 96;
  for (let i = 0; i <= segments; i++) {
    const a = -angle + i * angle * 2 / segments;
    const z = cz + Math.cos(a) * radius, y = cy + Math.sin(a) * radius;
    cross.push([z, y]);
    for (const x of [-4.1, 4.1]) { pos.push(x, y, z); uv.push(i / segments, x); }
    if (i < segments) {
      const k = i * 2; indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(indices);
  geo.computeVertexNormals(); mesh(group, geo, material);
  const shape = new THREE.Shape();
  shape.moveTo(cross[0][0], cross[0][1]);
  for (const [z, y] of cross) shape.lineTo(z, y);
  shape.closePath();
  for (const side of [-1, 1]) {
    const cap = mesh(group, new THREE.ShapeGeometry(shape), material);
    cap.rotation.y = -Math.PI / 2; cap.position.x = side * 4.1;
  }
  group.traverse(object => {
    if (object.isMesh) {
      object.castShadow = true; object.receiveShadow = false;
      object.frustumCulled = false; object.raycast = () => {};
    }
  });
}
