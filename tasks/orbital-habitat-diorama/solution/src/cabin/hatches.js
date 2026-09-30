import * as THREE from 'three';
import { mesh, box, annulus, boltBatch } from './common.js';
import { canvasTexture, drawHazardStripes } from '../textures/canvas.js';
import { labelTexture, surfaceTexture } from '../textures/structure.js';

export function buildHatches(ctx, parent, materials) {
  const hazardMap = canvasTexture(1024, 1024, (c, w, h) => {
    drawHazardStripes(c, 0, 0, w, h, 82);
  });
  const hazard = new THREE.MeshStandardMaterial({ map: hazardMap, roughness: 0.97, metalness: 0.03 });
  const glassMap = surfaceTexture('#142f3d', 84);
  const glassMat = new THREE.MeshStandardMaterial({ map: glassMap, roughness: 0.7,
    metalness: 0.03, emissive: '#172d38', emissiveMap: glassMap, emissiveIntensity: 0.12 });
  for (const side of [-1, 1]) {
    const group = new THREE.Group(); group.name = `hatch-${side < 0 ? 'sleep' : 'fitness'}`;
    // Both modelled sides face into the default view; right cap's outer pressure door is visible.
    group.position.set(side < 0 ? -3.982 : 4.165, 1.1, -1);
    group.rotation.y = Math.PI / 2; parent.add(group);
    annulus(group, materials.dark, 0.723, 0.817, 0.04, 0);
    annulus(group, hazard, 0.745, 0.8, 0.026, 0.04);
    annulus(group, materials.enamel, 0.682, 0.747, 0.067, 0.04);
    const plate = mesh(group, new THREE.CylinderGeometry(0.682, 0.69, 0.046, 48), materials.rim);
    plate.rotation.x = Math.PI / 2; plate.position.z = 0.058;
    annulus(group, materials.enamel, 0.56, 0.64, 0.012, 0.09);
    const bolts = [];
    for (let i = 0; i < 20; i++) {
      const a = i * Math.PI / 10;
      bolts.push([Math.cos(a) * 0.715, Math.sin(a) * 0.715, 0.122]);
    }
    boltBatch(group, materials.steel, bolts, 0.017);
    const window = new THREE.Group(); window.position.set(0, 0.36, 0.092); group.add(window);
    annulus(window, materials.dark, 0.101, 0.129, 0.028);
    annulus(window, materials.enamel, 0.106, 0.16, 0.025, 0.017);
    const view = mesh(window, new THREE.CircleGeometry(0.103, 32), glassMat); view.position.z = 0.015;
    const reflection = mesh(window, new THREE.PlaneGeometry(0.11, 0.013), materials.steel);
    reflection.position.set(-0.017, 0.03, 0.021); reflection.rotation.z = 0.4;
    const wheel = new THREE.Group(); wheel.position.set(0, -0.035, 0.15); group.add(wheel);
    annulus(wheel, materials.dark, 0.122, 0.155, 0.035);
    const hub = mesh(wheel, new THREE.CylinderGeometry(0.036, 0.036, 0.077, 8), materials.steel);
    hub.rotation.x = Math.PI / 2;
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3;
      const spoke = box(wheel, materials.steel, 0.136, 0.022, 0.019,
        Math.cos(a) * 0.064, Math.sin(a) * 0.064, 0.02); spoke.rotation.z = a;
    }
    for (const y of [-0.36, 0.26]) {
      box(group, materials.steel, 0.13, 0.145, 0.096, -0.61, y, 0.11);
      box(group, materials.enamel, 0.073, 0.17, 0.034, -0.603, y, 0.168);
    }
    const mat = new THREE.MeshStandardMaterial({ map: labelTexture(
      side < 0 ? '01 / SLEEP' : '02 / FITNESS', 'SEALED · CHECK PRESSURE'), roughness: 0.94 });
    const label = mesh(group, new THREE.PlaneGeometry(0.59, 0.148), mat);
    label.position.set(0, -0.41, 0.099);
    box(group, materials.dark, 0.082, 0.205, 0.05, 0.52, -0.13, 0.13);
    box(group, materials.enamel, 0.034, 0.143, 0.036, 0.53, -0.13, 0.175);
  }
}
