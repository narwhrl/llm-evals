import * as THREE from 'three';
import { annulus, mesh, box, boltBatch } from './common.js';
import { labelTexture } from '../textures/structure.js';

export function buildPortholes(ctx, parent, materials) {
  for (const p of ctx.portholes) {
    const group = new THREE.Group(); group.name = `porthole-frame-${p.id}`;
    group.position.set(p.x, p.y, -1.95); parent.add(group);
    const big = p.id === 'big', outer = big ? 0.94 : 0.32;
    // A deep, faceted baked-enamel pressure ring backed by an exposed rubber seal.
    annulus(group, materials.dark, p.radius, outer + 0.018, 0.032, -0.028);
    annulus(group, materials.rim, p.radius + 0.022, outer, big ? 0.17 : 0.105, 0);
    annulus(group, materials.enamel, p.radius + 0.035, outer - 0.024, 0.025, big ? 0.17 : 0.105);
    annulus(group, materials.gasket, p.radius, p.radius + 0.027, 0.028, big ? 0.152 : 0.091);
    const bead = mesh(group, new THREE.TorusGeometry(p.radius + 0.033, big ? 0.02 : 0.012, 6, 64), materials.steel);
    bead.position.z = big ? 0.182 : 0.115;
    const bolts = [], count = big ? 24 : 12;
    for (let i = 0; i < count; i++) {
      const angle = i * Math.PI * 2 / count, radius = outer - (big ? 0.068 : 0.039);
      bolts.push([Math.cos(angle) * radius, Math.sin(angle) * radius, big ? 0.203 : 0.14, 0, 0, angle]);
    }
    boltBatch(group, materials.steel, bolts, big ? 0.022 : 0.012);
    if (big) {
      const mat = new THREE.MeshStandardMaterial({ map: labelTexture('04', 'OBSERVATION / EARTH'), roughness: 0.95 });
      const badge = mesh(group, new THREE.PlaneGeometry(0.26, 0.065), mat);
      badge.position.set(0.15, 0.826, 0.203);
      for (const direction of [-1, 1]) {
        box(group, materials.steel, 0.079, 0.19, 0.044, direction * 0.915, -0.07, 0.204);
        box(group, materials.enamel, 0.049, 0.15, 0.057, direction * 0.919, -0.07, 0.23);
      }
    }
    group.traverse(o => {
      if (o.isMesh && !o.isInstancedMesh && o.geometry.type !== 'PlaneGeometry') o.castShadow = true;
    });
    // Clear disc and stencil masking are deliberately owned by the Earth module (§4).
  }
}
