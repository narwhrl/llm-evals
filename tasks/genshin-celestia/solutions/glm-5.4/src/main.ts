import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { createRealm } from './world/realm';
import { GradeShader } from './post/grade';

const DEG = Math.PI / 180;
/** Vertical field of view at the reference aspect; narrower windows widen it to keep the sides. */
const BASE_FOV = 38;
const REFERENCE_ASPECT = 16 / 10;
const MAX_FOV = 72;
/** Three-quarter view: a little to the side of the observatory and only just above it. */
const VIEW_BEARING = 30 * DEG;
const VIEW_ELEVATION = 7 * DEG;
/** Share of the frame kept clear around the scene. */
const PADDING = 0.07;

function fieldOfView(aspect: number): number {
  if (aspect >= REFERENCE_ASPECT) return BASE_FOV;
  const kept = (Math.tan((BASE_FOV * DEG) / 2) * REFERENCE_ASPECT) / aspect;
  return Math.min((MAX_FOV * DEG), 2 * Math.atan(kept)) / DEG;
}

/** Nearest distance along `direction` from `target` that keeps every point on screen. */
function fitDistance(camera: THREE.PerspectiveCamera, points: THREE.Vector3[], target: THREE.Vector3, direction: THREE.Vector3): number {
  const projected = new THREE.Vector3();
  const holds = (distance: number): boolean => {
    camera.position.copy(target).addScaledVector(direction, distance);
    camera.lookAt(target);
    camera.updateMatrixWorld();
    return points.every((point) => {
      projected.copy(point).project(camera);
      return Math.abs(projected.x) <= 1 - PADDING && Math.abs(projected.y) <= 1 - PADDING;
    });
  };
  let near = 120;
  let far = 3000;
  for (let i = 0; i < 36; i++) {
    const middle = (near + far) / 2;
    if (holds(middle)) far = middle;
    else near = middle;
  }
  return far;
}

function start(): void {
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  document.body.appendChild(renderer.domElement);

  const realm = createRealm(renderer);
  const camera = new THREE.PerspectiveCamera(BASE_FOV, 1, 2, 30000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 60;
  controls.maxDistance = 900;
  controls.minPolarAngle = 0.12;
  controls.maxPolarAngle = 1.72;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }));
  composer.addPass(new RenderPass(realm.scene, camera));
  // The threshold sits above anything lit stone can reach, even at grazing angles where its specular
  // rim is strongest. Only the lamps and gold squarely facing the sun bloom.
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.35, 0.5, 2.2));
  composer.addPass(new OutputPass());
  // Last, so it grades what the tone curve produced.
  const grade = new ShaderPass(GradeShader);
  composer.addPass(grade);

  // Until the visitor takes over, the camera sits at the default view and breathes around it.
  let visited = false;
  controls.addEventListener('start', () => {
    visited = true;
  });
  const bearing = new THREE.Vector3(
    Math.sin(VIEW_BEARING) * Math.cos(VIEW_ELEVATION),
    Math.sin(VIEW_ELEVATION),
    -Math.cos(VIEW_BEARING) * Math.cos(VIEW_ELEVATION),
  );
  function frameDefault(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = fieldOfView(camera.aspect);
    camera.updateProjectionMatrix();
    // `fitDistance` moves the camera while searching, so the result is applied only afterwards.
    const distance = fitDistance(camera, realm.cameraPoints, realm.target, bearing);
    camera.position.copy(realm.target).addScaledVector(bearing, distance);
    camera.lookAt(realm.target);
    controls.target.copy(realm.target);
    controls.update();
  }

  const offset = new THREE.Vector3();
  const spherical = new THREE.Spherical();
  let lastSway = 0;
  let lastRise = 0;
  function breathe(time: number): void {
    const sway = Math.sin(time * 0.11) * 0.014 + Math.sin(time * 0.043 + 1.2) * 0.009;
    const rise = Math.sin(time * 0.07 + 0.4) * 0.007;
    offset.copy(camera.position).sub(controls.target);
    spherical.setFromVector3(offset);
    spherical.theta -= sway - lastSway;
    spherical.phi -= rise - lastRise;
    lastSway = sway;
    lastRise = rise;
    camera.position.copy(controls.target).add(offset.setFromSpherical(spherical));
  }

  function resize(): void {
    const size = new THREE.Vector2(window.innerWidth, window.innerHeight);
    renderer.setSize(size.x, size.y);
    composer.setSize(size.x, size.y);
    grade.uniforms.uAspect.value = size.x / size.y;
    if (visited) {
      camera.aspect = size.x / size.y;
      camera.fov = fieldOfView(camera.aspect);
      camera.updateProjectionMatrix();
    } else {
      frameDefault();
    }
  }
  window.addEventListener('resize', resize);
  resize();

  // The scene takes a moment to build; let the first frame fade in over the sky-coloured page instead
  // of snapping on.
  renderer.domElement.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, easing: 'ease-out' });
  let last = performance.now();
  renderer.setAnimationLoop((now: number) => {
    const time = now / 1000;
    if (!visited) breathe(time);
    controls.update();
    realm.update(time, camera);
    composer.render(Math.min(0.05, (now - last) / 1000));
    last = now;
  });
}

try {
  start();
} catch (error) {
  console.error(error);
  const message = document.createElement('p');
  message.textContent = 'This scene needs a browser with WebGL 2 support.';
  Object.assign(message.style, { position: 'fixed', inset: '0', display: 'grid', placeItems: 'center', font: '16px system-ui, sans-serif', color: '#334', margin: '0' });
  document.body.replaceChildren(message);
}
