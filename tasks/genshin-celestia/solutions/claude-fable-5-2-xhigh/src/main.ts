import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { CAMERA_AZIMUTH, installAtmosphere } from "./atmos";
import { buildCelestia } from "./celestia";
import { buildClouds } from "./clouds";
import { buildSky } from "./sky";

function start(renderer: THREE.WebGLRenderer): void {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.92;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Must run before any material compiles: it rewrites the shared fog shader chunks.
  installAtmosphere(scene);

  // Default shot: a distant three-quarter view, slightly above the plateau, framing ring, spire and hanging rock.
  const HFOV = THREE.MathUtils.degToRad(49);
  const camera = new THREE.PerspectiveCamera(32, 1, 20, 400000);
  const target = new THREE.Vector3(0, -110, 0);
  const elevation = THREE.MathUtils.degToRad(9), distance = 6250;
  camera.position.set(
    Math.cos(CAMERA_AZIMUTH) * Math.cos(elevation) * distance,
    target.y + Math.sin(elevation) * distance,
    Math.sin(CAMERA_AZIMUTH) * Math.cos(elevation) * distance,
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 900;
  controls.maxDistance = 12000;
  // Keeps the camera above the cloud sea.
  controls.maxPolarAngle = THREE.MathUtils.degToRad(97);
  controls.autoRotate = true;
  // A slow drift (about 9° a minute) keeps the opening composition for the first minutes.
  controls.autoRotateSpeed = 0.025;

  const tickSky = buildSky(scene);
  const tickClouds = buildClouds(scene);
  const celestia = buildCelestia();
  scene.add(celestia.group);
  console.assert(
    celestia.inventory.islets === 8 && celestia.inventory.armillaryRings >= 5 && celestia.inventory.brokenSpans >= 1,
    "Celestia silhouette is incomplete",
    celestia.inventory,
  );

  // HDR pipeline: multisampled scene → soft bloom on sunlit stone and gold → tone mapping.
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }));
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.22, 0.6, 1.0));
  composer.addPass(new OutputPass());

  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    // Hold the horizontal field of view on narrow windows so the whole ring stays in frame.
    camera.fov = Math.max(32, THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(HFOV / 2) / camera.aspect)));
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  };
  window.addEventListener("resize", resize);
  resize();

  let last = 0, time = 0, frames = 0;
  renderer.setAnimationLoop((ms) => {
    const dt = Math.min((ms - last) / 1000, 0.1);
    last = ms;
    time += dt;
    tickSky(time);
    tickClouds(time);
    celestia.tick(time);
    controls.update(dt);
    composer.render(dt);
    frames++;
  });

  // Read-only hook for inspecting what was built and whether the loop is alive.
  Object.assign(window, { __celestia: { inventory: celestia.inventory, frames: () => frames } });
}

let renderer: THREE.WebGLRenderer;
try {
  renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance" });
} catch (error) {
  document.body.textContent = "This scene needs WebGL2, which is unavailable in this browser.";
  throw error;
}
start(renderer);
