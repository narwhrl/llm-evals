import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BASE } from '../world/layout.js';

/**
 * Renderer, camera and viewing controls.
 *
 * The scene is presented bare: one canvas, no overlay, no buttons, no HUD.
 * Drag orbits, wheel zooms, and the polar angle plus the pan bounds are all
 * clamped so the plinth can never be lost off-screen or flipped upside down.
 */
export function createStage(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  // Integer pixel dimensions only: a fractional device pixel ratio produces
  // render targets the driver will not allocate.
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x05070d, 1);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070b14);
  scene.fog = new THREE.Fog(0x0d1526, 78, 210);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 260);
  camera.position.set(26, 24, 31);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.6, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.rotateSpeed = 0.62;
  controls.zoomSpeed = 0.85;
  controls.panSpeed = 0.6;
  controls.screenSpacePanning = false;
  controls.minDistance = 14;
  controls.maxDistance = 88;
  controls.minPolarAngle = 0.14;
  controls.maxPolarAngle = 1.40; // never dip under the base
  controls.zoomToCursor = false;

  // Keep the orbit target on the plinth no matter how the user drags.
  const bounds = new THREE.Vector2(BASE.fieldHalf * 0.55, BASE.fieldHalf * 0.55);
  controls.addEventListener('change', () => {
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -bounds.x, bounds.x);
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -bounds.y, bounds.y);
    controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 7);
  });

  function resize() {
    const width = Math.max(1, Math.floor(window.innerWidth));
    const height = Math.max(1, Math.floor(window.innerHeight));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener('resize', resize);

  return { renderer, scene, camera, controls, resize };
}

/**
 * Scene lighting.
 *
 * A cold blue key standing in for moonlight, a cool hemisphere fill, and the
 * handful of practicals the world modules register. Only the key casts
 * shadows; the practicals are unshadowed point lights, which keeps the map
 * readable inside buildings without paying for six shadow maps.
 */
export function createLighting(scene) {
  const ambient = new THREE.HemisphereLight(0x54749f, 0x161f2c, 2.15);
  const key = new THREE.DirectionalLight(0xc6d8fa, 2.8);
  key.position.set(-26, 38, -22);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 4;
  key.shadow.camera.far = 120;
  key.shadow.camera.left = -30;
  key.shadow.camera.right = 30;
  key.shadow.camera.top = 30;
  key.shadow.camera.bottom = -30;
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.035;

  // Cool rim from behind so silhouettes separate from the dark yard.
  const rim = new THREE.DirectionalLight(0x7f9fd8, 0.95);
  rim.position.set(30, 16, 34);

  scene.add(ambient, key, key.target, rim);

  return { ambient, key, rim };
}
