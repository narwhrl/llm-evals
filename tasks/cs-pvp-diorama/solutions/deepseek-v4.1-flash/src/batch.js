// Static geometry batching. The diorama is assembled from ~1,200 individually
// placed boxes, and the pipeline renders the scene three times per frame (planar
// mirror, colour, view-normal), so unbatched meshes cost thousands of draw calls.
//
// Everything that never moves is merged into one mesh per material/geometry pair
// after layout, which keeps the authoring code declarative and the frame cheap.
// Animated or per-mesh-shaded objects opt out with `userData.noBatch`.

import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const MIN_BATCH = 2;

function optedOut(object) {
  for (let o = object; o; o = o.parent) {
    if (o.userData && o.userData.noBatch) return true;
  }
  return false;
}

export function markNoBatch(object) {
  object.userData.noBatch = true;
  return object;
}

export function batchStaticMeshes(root) {
  root.updateMatrixWorld(true);

  const buckets = new Map();

  root.traverse((o) => {
    if (!o.isMesh || !o.geometry || !o.material || Array.isArray(o.material)) return;
    if (o.layers.mask !== 1) return; // only the default layer: the wet street stays alone
    if (optedOut(o)) return;
    const key = `${o.material.uuid}|${o.geometry.uuid}|${o.castShadow ? 1 : 0}${o.receiveShadow ? 1 : 0}`;
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { material: o.material, geometry: o.geometry, castShadow: o.castShadow, receiveShadow: o.receiveShadow, items: [] };
      buckets.set(key, bucket);
    }
    bucket.items.push(o);
  });

  let before = 0;
  let merged = 0;
  for (const bucket of buckets.values()) {
    before += bucket.items.length;
    if (bucket.items.length < MIN_BATCH) continue;

    const parts = [];
    for (const mesh of bucket.items) {
      const geo = bucket.geometry.clone();
      geo.applyMatrix4(mesh.matrixWorld);
      parts.push(geo);
    }
    const mergedGeo = mergeGeometries(parts, false);
    if (!mergedGeo) {
      parts.forEach((p) => p.dispose());
      continue;
    }
    parts.forEach((p) => p.dispose());
    mergedGeo.computeBoundingSphere();

    const mesh = new THREE.Mesh(mergedGeo, bucket.material);
    mesh.castShadow = bucket.castShadow;
    mesh.receiveShadow = bucket.receiveShadow;
    root.add(mesh);
    merged += 1;

    for (const old of bucket.items) old.parent?.remove(old);
    // The source geometry stays alive: other buckets and the un-merged singles
    // still reference it, and disposing here would only invite a re-upload.
  }

  const after = (() => {
    let n = 0;
    root.traverse((o) => { if (o.isMesh) n++; });
    return n;
  })();

  return { batched: before, meshesAfter: after, batchedMeshes: merged };
}
