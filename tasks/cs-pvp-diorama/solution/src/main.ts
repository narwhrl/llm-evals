import {
  Color,
  Fog,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { buildBase } from './scene/base';
import { buildSpawnT } from './scene/spawnT';
import { buildSpawnCT } from './scene/spawnCT';
import { buildSiteA } from './scene/siteA';
import { buildSiteB } from './scene/siteB';
import { buildMid } from './scene/mid';
import { buildWires } from './scene/wires';
import { buildLights, type SceneLights } from './scene/lights';
import { buildRain, type RainSystem } from './scene/rain';
import { buildPuddles, type PuddleSystem } from './scene/puddles';
import { buildLightning, type LightningSystem } from './scene/lightning';
import { applyOutlines } from './scene/outline';

const canvas = document.getElementById('scene') as HTMLCanvasElement;

const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = 'srgb';
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = 2; // PCFSoftShadowMap

const scene = new Scene();
scene.background = new Color(0x070a10);
scene.fog = new Fog(0x070a10, 14, 36);

const camera = new PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.05,
  200,
);
camera.position.set(11, 9, 14);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.5, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.rotateSpeed = 0.6;
controls.zoomSpeed = 0.7;
controls.panSpeed = 0.6;
controls.minDistance = 7;
controls.maxDistance = 22;
controls.minPolarAngle = 0.18;
controls.maxPolarAngle = Math.PI / 2.05; // never below horizon
controls.screenSpacePanning = false;

// Compose the scene graph
const root = new Group();
root.name = 'diorama-root';

// Base (ground + concrete block + markings)
root.add(buildBase());

// Regions
root.add(buildSpawnT());
root.add(buildSiteA());
root.add(buildSiteB());
root.add(buildSpawnCT());
root.add(buildMid());

// Wires and drainage pipes
root.add(buildWires());

// Outlines applied to all child meshes
applyOutlines(root);

// Lights
const sceneLights: SceneLights = buildLights();
root.add(sceneLights.group);

// Atmospheric: rain + puddles + lightning
const rain: RainSystem = buildRain(2200, 5.6, 7);
const puddles: PuddleSystem = buildPuddles();
root.add(rain.group);
root.add(puddles.group);

// lightning adds ambient + hemi to root
const lightning: LightningSystem = buildLightning({ background: scene.background });
root.add(lightning.ambient);
root.add(lightning.hemi);

scene.add(root);

// Animation loop
const clock = new Clock();
let time = 0;

function animate(): void {
  const dt = clock.getDelta();
  time += dt;
  controls.update();

  // Light flicker — street lamp + warehouse subtle, police strobe
  sceneLights.streetLamp.intensity = 1.55 + Math.sin(time * 7) * 0.08 + Math.sin(time * 13) * 0.04;
  sceneLights.warehouseLamp.intensity = 1.3 + Math.sin(time * 3) * 0.05;
  // Police beacon alternates red/blue every ~0.4s
  const phase = (time * 1.8) % 1;
  sceneLights.policeBeacon.color.setHex(phase < 0.5 ? 0xff3030 : 0x3058c8);
  sceneLights.policeBeacon.intensity = 1.6 + Math.sin(time * 12) * 0.2;
  // Searchlight sweep
  const sweep = Math.sin(time * 0.4) * 0.4;
  sceneLights.searchlight.target.position.set(Math.sin(time * 0.2) * 3, 0.5, 1.5 + sweep);

  rain.update(dt);
  puddles.update(time);
  lightning.update(time);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});