import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { palette } from './materials';
import { createWorld } from './world';

const container = document.getElementById('app');
if (!container) throw new Error('#app container is missing');

const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(palette.fog, 1400, 4400);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 9000);
camera.position.set(950, 380, 1200);
camera.lookAt(0, 70, 0);

const world = createWorld();
scene.add(world.root);

const hemisphere = new THREE.HemisphereLight(0xdcefff, 0xb9a486, 1.25);
scene.add(hemisphere);

const sun = new THREE.DirectionalLight(0xffedc0, 2.35);
sun.position.copy(world.sunDirection).multiplyScalar(1600);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 100;
sun.shadow.camera.far = 3600;
sun.shadow.camera.left = -900;
sun.shadow.camera.right = 900;
sun.shadow.camera.top = 900;
sun.shadow.camera.bottom = -900;
sun.shadow.bias = -0.0004;
scene.add(sun);

const fill = new THREE.DirectionalLight(0xbcd8ff, 0.5);
fill.position.set(700, 520, -900);
scene.add(fill);
scene.add(new THREE.AmbientLight(0xffffff, 0.18));

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 70, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 720;
controls.maxDistance = 2800;
controls.minPolarAngle = 0.32;
controls.maxPolarAngle = Math.PI * 0.54;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.06;
controls.update();

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(
  new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio),
    0.3,
    0.5,
    1.0,
  ),
);
composer.addPass(new OutputPass());
composer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
});

const clock = new THREE.Clock();
let ready = false;

function animate(): void {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.getElapsedTime();
  controls.update(delta);
  world.update(elapsed, delta, camera);
  composer.render();
  if (!ready) {
    ready = true;
    document.documentElement.dataset.celestiaReady = 'true';
  }
}

animate();
