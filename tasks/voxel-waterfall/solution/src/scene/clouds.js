import * as THREE from 'three';
import { mulberry32, hash3 } from './rng.js';

const tmpMatrix = new THREE.Matrix4();
const tmpColor = new THREE.Color();
const tmpQuat = new THREE.Quaternion();
const tmpPos = new THREE.Vector3();
const tmpScale = new THREE.Vector3();

// Voxel cloud blobs orbiting the range at a configurable altitude. Peaks
// taller than the cloud level pierce through; transparency + depth testing
// give correct front/back occlusion against the mountain.
export function buildClouds({ seed, count, level, size }) {
  const rng = mulberry32(seed ^ 0xc10d5);
  const voxels = [];
  for (let c = 0; c < count; c++) {
    const ang = rng() * Math.PI * 2;
    const rad = 20 + rng() * 40;
    const dirx = Math.cos(ang);
    const dirz = Math.sin(ang);
    // sub-blobs chain along the tangential direction so banks wrap the range
    const tx = -dirz;
    const tz = dirx;
    const bx = dirx * rad;
    const bz = dirz * rad;
    const by = level + (rng() - 0.5) * 4;
    const subs = 3 + Math.floor(rng() * 3);
    const seen = new Set();
    for (let s = 0; s < subs; s++) {
      const off = (s - (subs - 1) / 2) * (5 + rng() * 4) + (rng() - 0.5) * 3;
      const ox = bx + tx * off;
      const oz = bz + tz * off;
      const oy = by + (rng() - 0.5) * 1.5;
      const n = 16 + Math.floor(rng() * 18);
      const rx = 4 + rng() * 5;
      const ry = 0.6 + rng() * 0.8;
      const rz = 3.5 + rng() * 4;
      for (let i = 0; i < n * 3 && seen.size < subs * 34; i++) {
        // gaussian-ish sample inside an ellipsoid
        const dx = Math.round((rng() + rng() + rng() - 1.5) * rx * 0.9);
        const dy = Math.round((rng() + rng() - 1) * ry);
        const dz = Math.round((rng() + rng() + rng() - 1.5) * rz * 0.9);
        const key = Math.round(ox + dx) + ',' + Math.round(oy + dy) + ',' + Math.round(oz + dz);
        if (seen.has(key)) continue;
        seen.add(key);
        voxels.push({
          x: ox + dx,
          y: oy + dy,
          z: oz + dz,
          s: 1.1 + rng() * 0.8,
        });
      }
    }
  }

  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const mesh = new THREE.InstancedMesh(geo, mat, Math.max(1, voxels.length));
  for (let i = 0; i < voxels.length; i++) {
    const v = voxels[i];
    tmpPos.set(v.x, v.y, v.z);
    tmpScale.setScalar(v.s);
    tmpMatrix.compose(tmpPos, tmpQuat, tmpScale);
    mesh.setMatrixAt(i, tmpMatrix);
    const j = hash3(Math.round(v.x * 7), Math.round(v.y * 7), Math.round(v.z * 7));
    tmpColor.setHex(0xffffff).offsetHSL(0, 0, -j * 0.08);
    mesh.setColorAt(i, tmpColor);
  }
  mesh.count = voxels.length;
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.frustumCulled = false;
  mesh.renderOrder = 10;
  // Instances are positioned relative to the map center so rotating the mesh
  // makes the whole cloud deck drift around the mountain.
  mesh.position.set(size / 2, 0, size / 2);
  return { mesh, count: voxels.length };
}
