import { Vector3 } from 'three';

// Fit the actual geometry in camera space, including the elevated roofs and
// island thickness. Both portrait and landscape viewports retain the full site.
export function fitCamera(camera, bounds, aspect, margin = 1.13) {
  camera.updateMatrixWorld(true);
  const point = new Vector3();
  let extentX = 0;
  let extentY = 0;
  for (const x of [bounds.min.x, bounds.max.x]) {
    for (const y of [bounds.min.y, bounds.max.y]) {
      for (const z of [bounds.min.z, bounds.max.z]) {
        point.set(x, y, z).applyMatrix4(camera.matrixWorldInverse);
        extentX = Math.max(extentX, Math.abs(point.x));
        extentY = Math.max(extentY, Math.abs(point.y));
      }
    }
  }
  const halfHeight = Math.max(extentY, extentX / aspect) * margin;
  camera.left = -halfHeight * aspect;
  camera.right = halfHeight * aspect;
  camera.top = halfHeight;
  camera.bottom = -halfHeight;
  camera.updateProjectionMatrix();
}
