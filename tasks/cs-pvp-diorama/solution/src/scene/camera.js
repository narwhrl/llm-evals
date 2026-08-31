import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createCamera(canvas) {
  const camera = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.08, 80);
  camera.position.set(15.4, 11.6, 15.0);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  controls.target.set(0, 0.12, 0.02);
  controls.minDistance = 9.5;
  controls.maxDistance = 24;
  controls.minPolarAngle = 0.22;
  controls.maxPolarAngle = 1.28;
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;
  controls.zoomSpeed = 0.85;
  controls.rotateSpeed = 0.72;
  controls.autoRotate = false;
  controls.update();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  return {
    camera,
    controls,
    dispose: () => {
      window.removeEventListener('resize', onResize);
      controls.dispose();
    },
  };
}
