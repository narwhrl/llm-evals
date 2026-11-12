import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { makeMaterials } from "./palette";
import { buildWorld } from "./world";
import { createSkyDome, createCloudSea, createLightShafts, createTeyvat, SUN_POS } from "./sky";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2("#c3d6ec", 0.0003);

// ---------- camera: cinematic 3/4 distant shot ----------
const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.5, 14000);
camera.position.set(2150, 560, 1720);
camera.lookAt(0, 90, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 120, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 350;
controls.maxDistance = 4200;
controls.maxPolarAngle = Math.PI * 0.72;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.32;
controls.update();

// ---------- lighting ----------
const sun = new THREE.DirectionalLight("#ffdf9e", 3.1);
sun.position.copy(SUN_POS);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const sc = 800;
sun.shadow.camera.left = -sc;
sun.shadow.camera.right = sc;
sun.shadow.camera.top = sc;
sun.shadow.camera.bottom = -sc;
sun.shadow.camera.near = 400;
sun.shadow.camera.far = 4200;
sun.shadow.bias = -0.0004;
scene.add(sun);
scene.add(sun.target);

const skyFill = new THREE.HemisphereLight("#bcd7ff", "#8a9db4", 0.85);
scene.add(skyFill);
const bounce = new THREE.DirectionalLight("#cfe4ff", 0.62);
bounce.position.set(600, -900, 800);
scene.add(bounce);
const warm = new THREE.AmbientLight("#ecdfc0", 0.4);
scene.add(warm);

// ---------- world ----------
const mats = makeMaterials();
const world = buildWorld(mats);
scene.add(world.group);

// ---------- sky, clouds, shafts, teyvat ----------
const sky = createSkyDome();
scene.add(sky.mesh);
const driftClouds: THREE.Object3D[] = [];
scene.add(createCloudSea(mats, driftClouds));
const shafts = createLightShafts();
scene.add(shafts.group);
scene.add(createTeyvat());

// fade the loader once the first frame is queued
requestAnimationFrame(() => {
  document.getElementById("loader")?.classList.add("done");
  setTimeout(() => document.getElementById("loader")?.remove(), 1200);
});

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ---------- animation ----------
const clock = new THREE.Clock();
const debrisBase = new Map<THREE.Object3D, THREE.Vector3>();
for (const d of world.animated.debris) {
  debrisBase.set(d, (d.userData.base as THREE.Vector3) ?? d.position.clone());
}

renderer.setAnimationLoop(() => {
  const t = clock.getElapsedTime();

  // armillary: rings precess slowly, core pulses
  world.animated.rings.forEach((r, i) => {
    r.rotation.y += 0.0016 + i * 0.0007;
    r.rotation.x += 0.0009 + i * 0.0004;
  });
  if (world.animated.glow) {
    const s = 1 + Math.sin(t * 2.1) * 0.12;
    world.animated.glow.scale.setScalar(s);
  }

  // waterfalls
  for (const f of world.animated.falls) {
    f.uniforms.uTime.value = t;
  }

  // drifting clouds
  for (const c of driftClouds) {
    c.position.x += c.userData.speed * 0.016;
    if (c.position.x > 2600) c.position.x = -2600;
  }

  // bobbing debris
  for (const d of world.animated.debris) {
    const base = debrisBase.get(d);
    if (!base) continue;
    const { speed, phase, amp } = d.userData as { speed: number; phase: number; amp: number };
    d.position.y = base.y + Math.sin(t * speed + phase) * amp;
    d.rotation.y += 0.0006;
  }

  // light shaft flicker
  for (const m of shafts.materials) m.uniforms.uTime.value = t;
  sky.uniforms.uTime.value = t;

  controls.update();
  renderer.render(scene, camera);
});
