import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createCourtyard } from "./scene.js";
import "./style.css";

const canvas = document.querySelector("#scene");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: "high-performance",
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const courtyard = createCourtyard();
const { scene, camera, target } = courtyard;

const controls = new OrbitControls(camera, canvas);
controls.target.copy(target);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = true;
controls.minDistance = 24;
controls.maxDistance = 210;
controls.maxPolarAngle = Math.PI * 0.49;
controls.minPolarAngle = 0.18;
controls.update();

let raf = 0;
let disposed = false;
const clock = new THREE.Clock();

function resize() {
  const width = window.innerWidth;
  const height = Math.max(1, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function frame() {
  if (disposed) return;
  courtyard.update(clock.getElapsedTime());
  controls.update();
  renderer.render(scene, camera);
  raf = requestAnimationFrame(frame);
}

function dispose() {
  if (disposed) return;
  disposed = true;
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
  window.removeEventListener("pagehide", dispose);
  controls.dispose();
  courtyard.dispose();
  renderer.dispose();
}

window.addEventListener("resize", resize);
window.addEventListener("pagehide", dispose);
resize();
frame();
