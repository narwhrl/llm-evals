import {
  Color,
  FogExp2,
  Group,
  Scene,
} from 'three';
import { createRenderer } from './scene/renderer.js';
import { createCamera } from './scene/camera.js';
import { addLights } from './scene/lights.js';
import { buildMaterials } from './scene/materials.js';
import { addPlinth } from './world/plinth.js';
import { addGround } from './world/ground.js';
import { addTSpawn } from './world/tSpawn.js';
import { addASite } from './world/aSite.js';
import { addMidLane } from './world/midLane.js';
import { addBSite } from './world/bSite.js';
import { addCTSpawn } from './world/ctSpawn.js';
import { addFlanks } from './world/flanks.js';
import { addGraffitiSet } from './world/decals.js';
import { addAtmosphere, updateAtmosphere } from './fx/atmosphere.js';

const canvas = document.getElementById('stage');

try {
  const { renderer, outline } = createRenderer(canvas);
  const { camera, controls } = createCamera(canvas);

  const scene = new Scene();
  scene.background = new Color(0x0b121a);
  scene.fog = new FogExp2(0x0b121a, 0.012);

  const mats = buildMaterials();
  const world = new Group();
  scene.add(world);

  addPlinth(world, mats);
  addGround(world, mats);
  addTSpawn(world, mats);
  addASite(world, mats);
  addMidLane(world, mats);
  addBSite(world, mats);
  addCTSpawn(world, mats);
  addFlanks(world, mats);
  addGraffitiSet(world, mats.tex);

  const lights = addLights(scene);
  const fx = addAtmosphere(scene, mats, lights);

  Object.assign(window, {
    __diorama: { ready: true, camera, controls, scene, renderer },
  });

  let last = performance.now();

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    controls.update();
    updateAtmosphere(fx, dt, now / 1000, scene);
    outline.render(scene, camera);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
} catch (err) {
  console.error('[diorama] init failed', err);
  Object.assign(window, { __diorama: { ready: false, error: String(err && err.stack ? err.stack : err) } });
}
