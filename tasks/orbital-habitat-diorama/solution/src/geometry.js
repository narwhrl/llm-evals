import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export function batchStaticMeshes(root, dynamicObjects) {
  root.updateMatrixWorld(true);
  const inverse = root.matrixWorld.clone().invert();
  const batches = new Map();
  const originals = [];
  root.traverse((object) => {
    if (!object.isMesh || Array.isArray(object.material)) return;
    for (let parent = object; parent && parent !== root; parent = parent.parent) {
      if (dynamicObjects.has(parent)) return;
    }
    const key = `${object.material.uuid}/${object.userData.focus || ""}/${object.castShadow}/${object.receiveShadow}`;
    if (!batches.has(key)) batches.set(key, { material: object.material, focus: object.userData.focus, castShadow: object.castShadow, receiveShadow: object.receiveShadow, geometries: [] });
    const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
    geometry.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, object.matrixWorld));
    batches.get(key).geometries.push(geometry);
    originals.push(object);
  });
  for (const object of originals) object.removeFromParent();
  for (const batch of batches.values()) {
    const geometry = mergeGeometries(batch.geometries, false);
    const object = new THREE.Mesh(geometry, batch.material);
    object.castShadow = batch.castShadow;
    object.receiveShadow = batch.receiveShadow;
    object.userData.focus = batch.focus;
    root.add(object);
    for (const source of batch.geometries) source.dispose();
  }
}
