import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { wallTexture, surfaceTexture, floorTexture } from '../textures/structure.js';

export function createMaterials() {
  const make = (map, extra = {}) => new THREE.MeshStandardMaterial({
    map, roughness: 0.91, metalness: 0.08, ...extra,
  });
  return {
    wall: make(wallTexture()),
    enamel: make(surfaceTexture('#d8ded5', 31)),
    rim: make(surfaceTexture('#b3c1bb', 33)),
    steel: make(surfaceTexture('#778d8e', 17)),
    dark: make(surfaceTexture('#35494e', 55)),
    gasket: make(surfaceTexture('#263537', 98, 'cable'), { metalness: 0 }),
    foam: make(surfaceTexture('#b8a775', 45, 'foam'), { metalness: 0 }),
    outer: make(surfaceTexture('#738888', 71)),
    cable: make(surfaceTexture('#535e62', 69, 'cable'), { metalness: 0 }),
    cableGold: make(surfaceTexture('#a99871', 40, 'cable'), { metalness: 0 }),
    floor: make(floorTexture()),
  };
}

export function mesh(parent, geometry, material, name = '') {
  const object = new THREE.Mesh(geometry, material);
  object.name = name; object.castShadow = false; object.receiveShadow = true;
  parent.add(object); return object;
}

export function box(parent, material, w, h, d, x, y, z, name = '') {
  const object = mesh(parent, new THREE.BoxGeometry(w, h, d), material, name);
  object.position.set(x, y, z); return object;
}

export function tube(parent, material, points, radius = 0.015, segments = 48) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  return mesh(parent, new THREE.TubeGeometry(curve, segments, radius, 6, false), material);
}

export function annulus(parent, material, inner, outer, depth, z = 0) {
  const shape = new THREE.Shape(); shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
  const hole = new THREE.Path(); hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: false, curveSegments: outer > 0.6 ? 64 : 32,
  });
  const object = mesh(parent, geo, material); object.position.z = z;
  return object;
}

export function boltBatch(parent, material, transforms, radius = 0.014) {
  const geo = new THREE.CylinderGeometry(radius, radius, 0.009, 6);
  geo.rotateX(Math.PI / 2);
  const bolts = new THREE.InstancedMesh(geo, material, transforms.length);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < transforms.length; i++) {
    const t = transforms[i]; dummy.position.set(t[0], t[1], t[2]);
    dummy.rotation.set(t[3] || 0, t[4] || 0, t[5] || 0);
    dummy.updateMatrix(); bolts.setMatrixAt(i, dummy.matrix);
  }
  bolts.castShadow = false; bolts.receiveShadow = true;
  bolts.instanceMatrix.needsUpdate = true; parent.add(bolts); return bolts;
}

// Merge only material-identical, stationary details, keeping animated/interactive meshes separate.
export function mergeStatic(parent, objects, material, name) {
  if (!objects.length) return;
  const geometries = objects.map(object => {
    object.updateMatrix();
    const copy = object.geometry.clone().applyMatrix4(object.matrix);
    if (!copy.index) return copy;
    const geometry = copy.toNonIndexed(); copy.dispose(); return geometry;
  });
  const combined = mergeGeometries(geometries, false);
  const object = mesh(parent, combined, material, name);
  for (const old of objects) { parent.remove(old); old.geometry.dispose(); }
  for (const geometry of geometries) geometry.dispose();
  return object;
}
