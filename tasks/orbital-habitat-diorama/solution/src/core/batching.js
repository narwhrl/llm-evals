import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/** Batch stationary pieces without crossing material, picking or shadow boundaries. */
export function batchStatic(root, animated = new Set()) {
  root.updateWorldMatrix(true, true);
  const inverse = root.matrixWorld.clone().invert();
  const transform = new THREE.Matrix4();
  const buckets = new Map();
  function collect(object) {
    if (animated.has(object)) return;
    if (object.isMesh && !object.isInstancedMesh && !Array.isArray(object.material)
      && object.material.colorWrite && object.renderOrder === 0 && object.visible) {
      let entry = null, keepFocus = false;
      for (let p = object; p; p = p.parent) {
        entry ||= p.userData.interactive;
        keepFocus ||= !!p.userData.keepFocus;
      }
      const key = `${object.material.id}/${entry?.id || ''}/${object.castShadow}/${object.receiveShadow}/${keepFocus}`;
      if (!buckets.has(key)) buckets.set(key, { objects: [], entry, keepFocus });
      buckets.get(key).objects.push(object);
    }
    for (const child of object.children) collect(child);
  }
  collect(root);
  const mergedSources = new Set();
  for (const { objects, entry, keepFocus } of buckets.values()) {
    if (objects.length < 2) continue;
    const geometries = objects.map(object => {
      transform.multiplyMatrices(inverse, object.matrixWorld);
      const copy = object.geometry.clone().applyMatrix4(transform);
      if (!copy.index) return copy;
      const flat = copy.toNonIndexed(); copy.dispose(); return flat;
    });
    const geometry = mergeGeometries(geometries, false);
    if (!geometry) throw new Error('Static geometry attributes must match');
    const first = objects[0];
    const mesh = new THREE.Mesh(geometry, first.material);
    mesh.name = `batch-${first.material.id}-${entry?.id || root.name}`;
    mesh.castShadow = first.castShadow; mesh.receiveShadow = first.receiveShadow;
    if (entry) mesh.userData.interactive = entry;
    mesh.userData.keepFocus = keepFocus;
    root.add(mesh);
    for (const object of objects) { mergedSources.add(object.geometry); object.removeFromParent(); }
    for (const copy of geometries) copy.dispose();
  }
  // Shared kit geometry may still be used by animated or unbatched meshes.
  const retained = new Set();
  root.traverse(o => { if (o.isMesh) retained.add(o.geometry); });
  for (const geometry of mergedSources) if (!retained.has(geometry)) geometry.dispose();
}

/** Only substantial furniture intersecting a porthole's swept beam casts sunlight shadows. */
export function auditFurnitureShadows(root, portholes) {
  root.updateWorldMatrix(true, true);
  const bounds = new THREE.Box3(), size = new THREE.Vector3();
  root.traverse(object => {
    if (!object.isMesh) return;
    object.castShadow = false;
    for (let p = object; p; p = p.parent) {
      if (p.name.startsWith('floating') || p.name === 'zipperPull') return;
    }
    if (object.isInstancedMesh || object.material.transparent || object.geometry.type === 'PlaneGeometry') return;
    bounds.setFromObject(object); bounds.getSize(size);
    if (Math.max(size.x, size.y, size.z) < 0.075 || Math.min(size.x, size.y, size.z) < 0.018) return;
    const near = Math.max(0, bounds.min.z + 1.95), far = Math.max(0, bounds.max.z + 1.95);
    // Reverse-project to the aperture across the clock's full sun-direction range.
    const minY = bounds.min.y + near * Math.tan(0.45);
    const maxY = bounds.max.y + far * Math.tan(0.50);
    object.castShadow = portholes.some(p =>
      bounds.max.x + far * 0.135 >= p.x - p.radius
      && bounds.min.x - far * 0.035 <= p.x + p.radius
      && maxY >= p.y - p.radius && minY <= p.y + p.radius);
  });
}
