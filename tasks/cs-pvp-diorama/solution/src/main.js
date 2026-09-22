import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildWorld } from './world.js';
import { random } from './materials.js';
import './style.css';

const host = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a1015);
scene.fog = new THREE.FogExp2(0x0a1015, .008);

const camera = new THREE.PerspectiveCamera(39, 1, .1, 150);
camera.position.set(27.6, 36.8, 35);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.87;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
host.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, -1.25, 0);
controls.enableDamping = true;
controls.dampingFactor = .055;
controls.minDistance = 25;
controls.maxDistance = 110;
controls.minPolarAngle = .25;
controls.maxPolarAngle = Math.PI / 2 - .025;
controls.maxTargetRadius = 6;
controls.update();

scene.add(new THREE.HemisphereLight(0xb9dcf2, 0x46575c, 2.8));
const moon = new THREE.DirectionalLight(0xb1d8f3, 3.35);
moon.position.set(-10, 19, 6);
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
moon.shadow.camera.left = -22;
moon.shadow.camera.right = 22;
moon.shadow.camera.top = 22;
moon.shadow.camera.bottom = -22;
moon.shadow.camera.near = 1;
moon.shadow.camera.far = 55;
moon.shadow.bias = -.0004;
scene.add(moon);

const animated = buildWorld(scene);

// Thin line segments preserve the miniature scale while giving the rain depth.
const drops = 740;
const rainPositions = new Float32Array(drops * 6);
const rainSpeed = new Float32Array(drops);
function placeDrop(i, top = false) {
  const p = i * 6;
  const x = (random() - .5) * 29.15;
  const z = (random() - .5) * 29.15;
  const y = top ? 8.7 + random() * 2.7 : .25 + random() * 11.2;
  rainSpeed[i] = 6.5 + random() * 6;
  rainPositions[p] = x;
  rainPositions[p + 1] = y;
  rainPositions[p + 2] = z;
  rainPositions[p + 3] = x - .075;
  rainPositions[p + 4] = y - (.28 + random() * .27);
  rainPositions[p + 5] = z + .035;
}
for (let i = 0; i < drops; i++) placeDrop(i);
const rainGeometry = new THREE.BufferGeometry();
rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3).setUsage(THREE.DynamicDrawUsage));
const rain = new THREE.LineSegments(rainGeometry, new THREE.LineBasicMaterial({ color: 0xa7cee0, transparent: true, opacity: .31, depthWrite: false }));
rain.frustumCulled = false;
scene.add(rain);

const dripSources = [];
for (let i = 0; i < 28; i++) dripSources.push([-13.9 + i * .31, 5.52, -3.62, 4.8]);
for (let i = 0; i < 18; i++) dripSources.push([8.25 + i * .26, 4.17, -7.28, 3.8]);
for (let i = 0; i < 10; i++) dripSources.push([1.25 + i * .33, 1.8, -10.95, 1.4]);
for (let i = 0; i < 9; i++) dripSources.push([-11.6 + i * .49, 3.92, -3.57, 3.4]);
const dripPositions = new Float32Array(dripSources.length * 6);
const dripPhase = dripSources.map(() => random());
const dripGeometry = new THREE.BufferGeometry();
dripGeometry.setAttribute('position', new THREE.BufferAttribute(dripPositions, 3).setUsage(THREE.DynamicDrawUsage));
const drips = new THREE.LineSegments(dripGeometry, new THREE.LineBasicMaterial({ color: 0xb3d9e5, transparent: true, opacity: .48, depthWrite: false }));
drips.frustumCulled = false;
scene.add(drips);

function resize() {
  const width = host.clientWidth;
  const height = host.clientHeight;
  camera.aspect = width / height;
  const portrait = THREE.MathUtils.clamp((1 - camera.aspect) / .54, 0, 1);
  camera.fov = 39 + 43 * portrait;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);
resize();

const clock = new THREE.Clock();
let elapsed = 0;
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), .05);
  elapsed += dt;
  for (let i = 0; i < drops; i++) {
    const p = i * 6;
    const fall = dt * rainSpeed[i];
    rainPositions[p + 1] -= fall;
    rainPositions[p + 4] -= fall;
    rainPositions[p] -= fall * .16;
    rainPositions[p + 3] -= fall * .16;
    if (rainPositions[p + 1] < .16) placeDrop(i, true);
  }
  rainGeometry.attributes.position.needsUpdate = true;
  for (let i = 0; i < dripSources.length; i++) {
    const [x, top, z, travel] = dripSources[i];
    const y = top - ((elapsed * (1.3 + i % 5 * .17) + dripPhase[i] * travel) % travel);
    const p = i * 6;
    dripPositions[p] = x;
    dripPositions[p + 1] = y;
    dripPositions[p + 2] = z;
    dripPositions[p + 3] = x;
    dripPositions[p + 4] = y - .14;
    dripPositions[p + 5] = z;
  }
  dripGeometry.attributes.position.needsUpdate = true;
  for (const ripple of animated.ripples) {
    const phase = (elapsed * .46 * ripple.scale + ripple.phase) % 1;
    ripple.mesh.scale.setScalar(.22 + phase * 3.2);
    ripple.mesh.material.opacity = .28 * (1 - phase);
  }
  animated.police[0].intensity = 1 + 9 * (.5 + .5 * Math.sin(elapsed * 2.4));
  animated.police[1].intensity = 1 + 9 * (.5 + .5 * Math.sin(elapsed * 2.4 + Math.PI));
  animated.flicker.intensity = 14 + 2 * Math.sin(elapsed * 12) + .7 * Math.sin(elapsed * 29);
  animated.spotlight.intensity = 51 + 3 * Math.sin(elapsed * 1.2);
  animated.shutter.position.y = 3.95 + .012 * Math.sin(elapsed * 2.7);
  for (let i = 0; i < animated.steam.length; i++) {
    const mist = animated.steam[i];
    mist.position.y = 3.5 + .2 * Math.sin(elapsed * .7 + i);
    mist.scale.x = 1.45 + .35 * Math.sin(elapsed * .85 + i);
    mist.material.opacity = .07 + .035 * Math.sin(elapsed * 1.1 + i);
  }
  const lightning = Math.pow(Math.max(0, Math.sin(elapsed * .47) * Math.sin(elapsed * 1.17)), 28);
  moon.intensity = 3.35 + lightning * 2.8;
  controls.update();
  renderer.render(scene, camera);
}
animate();
