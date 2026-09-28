import * as THREE from 'three';

import { Builder } from './core/builder.js';
import { PuddleReflector } from './core/reflection.js';
import { createLighting, createStage } from './core/stage.js';
import { createMaterials, createOutlineMaterial } from './core/materials.js';

import { BASE } from './world/layout.js';
import { buildBase } from './world/base.js';
import { buildTSpawn } from './world/tspawn.js';
import { buildASite } from './world/asite.js';
import { buildBSite } from './world/bsite.js';
import { buildCTSpawn } from './world/ctspawn.js';
import { buildMid } from './world/mid.js';
import { buildRoutes } from './world/routes.js';

import { createHalos, Lightning } from './fx/glow.js';
import { createDrips, createRain } from './fx/rain.js';
import { createSteam } from './fx/steam.js';
import { createWaterMaterial, updateWaterMaterial } from './fx/water.js';

/**
 * CS PVP Diorama.
 *
 * A rainy-night defusal map presented as a collectible miniature on one square
 * plinth. There is no interface of any kind: the canvas is the whole
 * application, and pointer drag / wheel zoom are the only controls.
 */

const canvas = document.getElementById('stage');
const { renderer, scene, camera, controls } = createStage(canvas);
const lighting = createLighting(scene);

const materials = createMaterials();
const builder = new Builder(materials, createOutlineMaterial(0.0032));

/** Everything below is wired up by buildScene(), which runs before the loop. */
const anchors = {
  vents: [],
  drips: [],
  streetLamp: null,
  searchlight: null,
  beacon: null,
  shutter: null,
};
const practicals = [];

let rain = null;
let steam = null;
let drips = null;
let halos = null;
let reflector = null;
let waterMesh = null;
let drainMesh = null;
let waterMaterial = null;
let drainMaterial = null;
let beaconLights = null;
let lightning = null;

const clock = new THREE.Clock();
let elapsed = 0;

buildScene();
startLoop();

/* ------------------------------------------------------------------ */
/* Construction                                                        */
/* ------------------------------------------------------------------ */

function buildScene() {
  buildBase(builder, anchors.vents);
  buildTSpawn(builder, anchors, practicals);
  buildASite(builder, practicals, anchors);
  buildMid(builder, practicals);
  buildBSite(builder, practicals, anchors);
  buildCTSpawn(builder, practicals, anchors);
  buildRoutes(builder, anchors);

  builder.build(scene);

  for (const p of practicals) {
    const light = new THREE.PointLight(p.color, p.intensity, p.distance, 2);
    light.position.set(p.position[0], p.position[1], p.position[2]);
    scene.add(light);
  }

  if (anchors.beacon) {
    const red = new THREE.PointLight(0xff2a22, 1.2, 13, 2);
    red.position.copy(anchors.beacon.left);
    const blue = new THREE.PointLight(0x2a5cff, 1.2, 13, 2);
    blue.position.copy(anchors.beacon.right);
    scene.add(red, blue);
    beaconLights = [red, blue];
  }

  buildWater();

  // --- weather -------------------------------------------------------
  rain = createRain({ half: 22.6, span: 26, count: 5200 });
  scene.add(rain.mesh);

  steam = createSteam(anchors.vents, { perVent: 16 });
  if (steam) scene.add(steam.mesh);

  drips = createDrips(anchors.drips, { perEmitter: 3 });
  if (drips) scene.add(drips.mesh);

  // --- light halos ---------------------------------------------------
  halos = createHalos(
    practicals
      .filter((p) => p.kind === 'street' || p.kind === 'warehouse' || p.kind === 'searchlight')
      .map((p) => ({
        position: new THREE.Vector3(...p.position),
        color: p.color,
        size: p.kind === 'searchlight' ? 5.0 : p.kind === 'street' ? 4.0 : 2.8,
        opacity: p.kind === 'searchlight' ? 0.4 : p.kind === 'street' ? 0.44 : 0.26,
        kind: p.kind,
      })),
  );
  scene.add(halos.group);

  lightning = new Lightning(lighting.ambient, lighting.key, scene);
}

function buildWater() {
  // The four brightest practicals are the ones that streak across the pools.
  const waterLights = practicals
    .slice()
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 4)
    .map((p) => ({
      position: new THREE.Vector3(...p.position),
      color: new THREE.Color(p.color),
      power: p.intensity * 0.45,
    }));

  // Standalone water planes are created first so the reflector can exclude
  // them from its own render pass.
  const yard = new THREE.PlaneGeometry(BASE.fieldHalf * 2 - 0.5, BASE.fieldHalf * 2 - 0.5, 1, 1);
  yard.rotateX(-Math.PI / 2);
  const drain = new THREE.PlaneGeometry(1.7, 19.4, 1, 1);
  drain.rotateX(-Math.PI / 2);

  waterMesh = new THREE.Mesh(yard, null);
  drainMesh = new THREE.Mesh(drain, null);
  waterMesh.position.y = BASE.waterY;
  drainMesh.position.set(0, BASE.groundY - 0.24, -0.6);
  waterMesh.name = 'standing-water';
  drainMesh.name = 'channel-water';
  waterMesh.renderOrder = 2;
  drainMesh.renderOrder = 2;
  scene.add(waterMesh, drainMesh);

  reflector = new PuddleReflector(renderer, scene, {
    height: BASE.waterY,
    resolution: 768,
    hide: [waterMesh, drainMesh],
  });

  waterMaterial = createWaterMaterial({
    textureMatrix: reflector.textureMatrix,
    reflectTexture: reflector.texture,
    lights: waterLights,
  });
  waterMesh.material = waterMaterial;

  drainMaterial = createWaterMaterial({
    textureMatrix: reflector.textureMatrix,
    reflectTexture: reflector.texture,
    lights: waterLights,
  });
  drainMaterial.uniforms.uStrength.value = 1.0;
  drainMaterial.uniforms.uDistort.value = 0.055;
  drainMaterial.uniforms.uCoverage.value = 1.0;
  drainMesh.material = drainMaterial;
}

/* ------------------------------------------------------------------ */
/* Frame                                                               */
/* ------------------------------------------------------------------ */

function animate(dt) {
  elapsed += dt;

  rain.update(elapsed);
  if (steam) steam.update(elapsed);
  if (drips) drips.update(elapsed);
  halos.update(elapsed);
  lightning.update(dt);
  updateWaterMaterial(waterMaterial, elapsed);
  updateWaterMaterial(drainMaterial, elapsed);

  // Roller shutter: an occasional brief judder, nothing more.
  const shutter = anchors.shutter;
  if (shutter) {
    const cycle = elapsed % 23;
    const active = cycle > 20.4 && cycle < 21.1;
    const judder = active ? Math.sin((cycle - 20.4) * 190) * Math.exp(-(cycle - 20.4) * 5) : 0;
    shutter.position.z = shutter.userData.baseZ + judder * 0.02;
  }

  // Searchlight sweeps slowly across the yard.
  if (anchors.searchlight) {
    anchors.searchlight.rotation.y = Math.PI + 0.22 + Math.sin(elapsed * 0.42) * 0.17;
    anchors.searchlight.rotation.x = -0.42 + Math.sin(elapsed * 0.31 + 1.1) * 0.07;
  }

  // Beacons alternate on a slow beat.
  if (beaconLights) {
    const phase = Math.sin(elapsed * 1.4);
    beaconLights[0].intensity = 1.0 + Math.max(0, phase) * 7.5;
    beaconLights[1].intensity = 1.0 + Math.max(0, -phase) * 7.5;
  }

  reflector.render(camera, waterMesh);
}

function startLoop() {
  // Note the wrapper: setAnimationLoop passes its rAF timestamp as the first
  // argument, which would be read as a delta if animate took it directly.
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);
    animate(dt);
    controls.update();
    renderer.render(scene, camera);
  });
}

/* ------------------------------------------------------------------ */
/* Verification hook                                                   */
/* ------------------------------------------------------------------ */

/**
 * Drives the scene deterministically. Background tabs throttle rAF to zero,
 * so screenshots taken without the tab in front cannot rely on the loop.
 */
window.__diorama = {
  renderer,
  scene,
  camera,
  controls,
  step(frames = 1, dt = 1 / 60) {
    for (let i = 0; i < frames; i += 1) animate(dt);
    controls.update();
    renderer.render(scene, camera);
  },
  /** Places the camera on an orbit around the plinth. */
  orbit(azimuth, polar, distance, target = [0, 1.6, 0]) {
    controls.target.set(target[0], target[1], target[2]);
    camera.position.set(
      target[0] + distance * Math.sin(polar) * Math.sin(azimuth),
      target[1] + distance * Math.cos(polar),
      target[2] + distance * Math.sin(polar) * Math.cos(azimuth),
    );
    camera.lookAt(controls.target);
    controls.update();
    renderer.render(scene, camera);
  },
  /** Times a fixed number of synchronous renders for a cost benchmark. */
  bench(frames = 30) {
    const start = performance.now();
    for (let i = 0; i < frames; i += 1) renderer.render(scene, camera);
    return (performance.now() - start) / frames;
  },
  info() {
    return {
      calls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      programs: renderer.info.programs ? renderer.info.programs.length : 0,
      camera: camera.position.toArray().map((v) => +v.toFixed(2)),
    };
  },
};
