import * as THREE from 'three';
import { mesh, box, boltBatch, mergeStatic } from './common.js';
import { canvasTexture, drawHazardStripes } from '../textures/canvas.js';
import { labelTexture } from '../textures/structure.js';

export function buildFloor(ctx, parent, materials) {
  const deck = new THREE.Group(); deck.name = 'layered-floor'; parent.add(deck); parent = deck;
  box(parent, materials.outer, 8, 0.022, 4, 0, -0.169, 0, 'floor-bottom-skin');
  box(parent, materials.foam, 8, 0.13, 4, 0, -0.093, 0, 'floor-insulation');
  box(parent, materials.steel, 8, 0.026, 4, 0, -0.015, 0, 'floor-inner-deck');
  const tiles = [];
  for (let x = -3.75; x < 4; x += 0.5) {
    for (let z = -1.75; z < 2; z += 0.5) {
      const tile = box(parent, materials.floor, 0.487, 0.019, 0.487, x, -0.006, z);
      tiles.push(tile);
    }
  }
  mergeStatic(parent, tiles, materials.floor, 'anti-slip-floor-panels');
  // Structural cross-members visibly interrupt the honeycomb at the front cut.
  const beams = [];
  for (let x = -3.95; x < 4; x += 0.5) {
    beams.push(box(parent, materials.outer, 0.028, 0.132, 4, x, -0.091, 0));
  }
  mergeStatic(parent, beams, materials.outer, 'floor-cut-crossmembers');
  const frontRivets = [];
  for (let x = -3.9; x <= 3.9; x += 0.15) frontRivets.push([x, -0.025, 2.012]);
  boltBatch(parent, materials.steel, frontRivets, 0.006);
  const hazard = canvasTexture(1024, 128, (c, w, h) => drawHazardStripes(c, 0, 0, w, h, 65));
  const hazardMat = new THREE.MeshStandardMaterial({ map: hazard, roughness: 0.95, metalness: 0.03 });
  for (const x of [-3.65, 3.65]) {
    const tape = mesh(parent, new THREE.PlaneGeometry(0.46, 0.072), hazardMat);
    tape.rotation.x = -Math.PI / 2; tape.position.set(x, 0.006, 1.73);
  }
  const idMaterial = new THREE.MeshStandardMaterial({ map: labelTexture('ZONE B', 'ORBITAL HAB / 04'),
    roughness: 0.95, metalness: 0 });
  const idPlate = mesh(parent, new THREE.PlaneGeometry(0.65, 0.163), idMaterial);
  idPlate.position.set(-2.82, -0.085, 2.018);
  // Coplanar deck layers must receive the aperture shadow without shadowing each other.
  for (const object of parent.children) {
    if (object.isMesh && object.position.y <= 0.01) object.castShadow = false;
  }
}
