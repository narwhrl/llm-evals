// 相机控制：自由拖拽旋转 + 缩放，无任何界面元素；限制俯仰与目标范围以免看穿底座。
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BASE_HALF } from './stage.js';

export function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.target.set(0, 1, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.rotateSpeed = 0.85;
  controls.zoomSpeed = 0.9;
  controls.panSpeed = 0.7;
  controls.screenSpacePanning = false;
  controls.minDistance = 10;
  controls.maxDistance = 155;
  controls.minPolarAngle = 0.08;
  controls.maxPolarAngle = 1.5;
  controls.zoomToCursor = false;

  const targetLimit = BASE_HALF - 6;
  const clampTarget = () => {
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -targetLimit, targetLimit);
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -targetLimit, targetLimit);
    controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 9);
  };

  return {
    controls,
    update() {
      controls.update();
      clampTarget();
    },
    setView(view) {
      controls.target.set(view.target[0], view.target[1], view.target[2]);
      camera.position.set(view.position[0], view.position[1], view.position[2]);
      camera.updateProjectionMatrix();
      controls.update();
    },
  };
}
