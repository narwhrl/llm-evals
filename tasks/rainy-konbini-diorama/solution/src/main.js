import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buildDiorama } from "./world.js";

const canvas = document.querySelector("#scene");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1020);
scene.fog = new THREE.Fog(0x0b1020, 30, 78);

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
camera.position.set(9.5, 8.5, 19.0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-1.0, 1.4, 0.0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = true;
controls.minDistance = 7;
controls.maxDistance = 42;
controls.maxPolarAngle = Math.PI * 0.495;
controls.minPolarAngle = Math.PI * 0.06;
controls.update();

const world = buildDiorama();
scene.add(world.root);

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

const clock = new THREE.Clock();
let elapsed = 0;

function tick() {
  const dt = Math.min(clock.getDelta(), 0.05);
  elapsed += dt;
  world.update(elapsed, dt);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
