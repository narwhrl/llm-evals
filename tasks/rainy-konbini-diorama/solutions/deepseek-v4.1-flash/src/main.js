import * as THREE from 'three';
import { Raycaster, Vector2 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createRenderer, createComposer } from './core/render.js';
import { createMaterials } from './scene/materials.js';
import { PlanarReflection, createWetMaterial, syncWetMatrices } from './scene/wet.js';
import { buildGround } from './scene/ground.js';
import { buildStore } from './scene/store.js';
import { buildInterior } from './scene/interior.js';
import { buildStreet } from './scene/street.js';
import { buildAtmosphere } from './scene/atmosphere.js';
import { buildLighting } from './scene/lighting.js';
import { BASE_HALF } from './scene/layout.js';

const stage = document.getElementById('stage');

const renderer = createRenderer();
stage.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a1020);

const camera = new THREE.PerspectiveCamera(34, 1, 0.4, 200);
camera.position.set(-9.2, 8.4, 12.6);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-0.15, 1.15, -0.15);
controls.enableDamping = true;
controls.dampingFactor = 0.075;
controls.rotateSpeed = 0.72;
controls.zoomSpeed = 0.82;
controls.panSpeed = 0.6;
controls.screenSpacePanning = false;
controls.minDistance = 5.2;
controls.maxDistance = 30;
controls.minPolarAngle = 0.18;
controls.maxPolarAngle = Math.PI * 0.495;
controls.enablePan = true;
controls.autoRotate = false;

const materials = createMaterials();

// Reflection source for all wet surfaces.
const reflection = new PlanarReflection(renderer, { planeY: 0.372, scale: 0.44 });
const wetFactory = (options) => createWetMaterial({ reflection, ...options });

const lighting = buildLighting(scene);
const ground = buildGround({ scene, materials, wetFactory });
const store = buildStore({ scene, materials, wetFactory, lighting });
const interior = buildInterior({ scene, materials, lighting });
const street = buildStreet({ scene, materials, lighting });
const atmosphere = buildAtmosphere({ scene, camera, lighting });

const wetMeshes = [...ground.wetMeshes, ...store.wetMeshes, ...street.wetMeshes];

// Objects that must not appear in the mirror pass: the weather effects, and the
// wet ground itself (sampling a target while rendering into it is undefined).
reflection.exclude.push(atmosphere.fxRoot, atmosphere.rain, ...wetMeshes);

const post = createComposer(renderer, scene, camera);

function resize() {
  const width = stage.clientWidth || window.innerWidth;
  const height = stage.clientHeight || window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  post.setSize(width, height);
  reflection.setSize(width * dpr, height * dpr);
}

window.addEventListener('resize', resize);
resize();

// The rig is static, so bake the shadow map once instead of every frame.
renderer.shadowMap.needsUpdate = true;

const clock = new THREE.Clock();
let elapsed = 0;
let frames = 0;
let fpsAccum = 0;
let fps = 0;

const state = {
  get elapsed() {
    return elapsed;
  },
  get fps() {
    return fps;
  },
  renderer,
  scene,
  camera,
  controls,
};

function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  elapsed += dt;
  frames += 1;
  fpsAccum += dt;
  if (fpsAccum >= 0.5) {
    fps = frames / fpsAccum;
    frames = 0;
    fpsAccum = 0;
  }

  controls.update();

  // Scene animation.
  interior.update(dt, elapsed);
  store.update(dt, elapsed);
  street.update(dt, elapsed);
  atmosphere.update(dt, elapsed);
  lighting.update(dt, elapsed);

  for (const mesh of wetMeshes) mesh.material.uniforms.uTime.value = elapsed;

  // Mirror pass: render once per frame from the reflected camera.
  camera.updateMatrixWorld();
  if (reflection.updateCamera(camera)) {
    reflection.render(scene);
    syncWetMatrices(reflection, wetMeshes);
  }

  // Normal/depth buffer for the cel outline pass.
  post.renderNormals();
  post.composer.render();

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

// A small non-visual debug handle so automated acceptance can drive the camera
// deterministically without adding any on-screen UI.
window.__DIORAMA__ = {
  ready: true,
  setCamera(position, target) {
    camera.position.set(position[0], position[1], position[2]);
    if (target) controls.target.set(target[0], target[1], target[2]);
    controls.update();
  },
  getCamera() {
    return {
      position: camera.position.toArray(),
      target: controls.target.toArray(),
    };
  },
  state,
  reflection,
  post,
  /**
   * Renders one frame synchronously and immediately reads the canvas back as a
   * data URL. The drawing buffer is not preserved, so this has to happen inside
   * the same task as the render; it exists for automated visual checks only and
   * is never used by the scene itself.
   */
  captureFrame() {
    camera.updateMatrixWorld();
    if (reflection.updateCamera(camera)) {
      reflection.render(scene);
      syncWetMatrices(reflection, wetMeshes);
    }
    post.renderNormals();
    post.composer.render();
    return renderer.domElement.toDataURL('image/png');
  },
  /** Debug: what does the centre ray hit, in order? */
  probeCentre() {
    const raycaster = new Raycaster();
    raycaster.setFromCamera(new Vector2(0, 0), camera);
    return raycaster
      .intersectObjects(scene.children, true)
      .slice(0, 6)
      .map((hit) => ({
        distance: +hit.distance.toFixed(2),
        name: hit.object.name || hit.object.type,
        parent: hit.object.parent?.name ?? '',
        material: hit.object.material?.type ?? '',
      }));
  },
  /** Debug: detailed hit report with world position, scale and owning group. */
  probeCentreDetailed() {
    const raycaster = new Raycaster();
    raycaster.setFromCamera(new Vector2(0, 0), camera);
    return raycaster
      .intersectObjects(scene.children, true)
      .slice(0, 5)
      .map((hit) => {
        const obj = hit.object;
        const worldPos = new THREE.Vector3();
        obj.getWorldPosition(worldPos);
        const worldScale = new THREE.Vector3();
        obj.getWorldScale(worldScale);
        const chain = [];
        let node = obj;
        while (node) {
          chain.push(node.name || node.type);
          node = node.parent;
        }
        return {
          distance: +hit.distance.toFixed(2),
          material: obj.material?.type ?? '',
          color: obj.material?.color ? `#${obj.material.color.getHexString()}` : '',
          worldPos: worldPos.toArray().map((v) => +v.toFixed(2)),
          worldScale: worldScale.toArray().map((v) => +v.toFixed(2)),
          chain: chain.join(' < '),
          point: hit.point.toArray().map((v) => +v.toFixed(2)),
        };
      });
  },
  setVisible(name, visible) {
    scene.traverse((obj) => {
      if (obj.name === name) obj.visible = visible;
    });
  },
  setDoor(open) {
    store.setDoor(open);
  },
  getDebug() {
    return {
      elapsed,
      fps,
      doorOpen: store.doorOpenAmount,
      signalPhase: street.signalPhase,
    };
  },
  baseHalf: BASE_HALF,
};
