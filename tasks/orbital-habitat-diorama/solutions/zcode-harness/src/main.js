// Entry point: renderer, camera, post-processing, shared context, render loop. See docs/DESIGN.md.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import { createClock } from './core/clock.js';
import { registry } from './core/registry.js';
import { state, setState, toggleState, onState } from './core/state.js';
import { createControls } from './core/controls.js';
import { createInteraction } from './core/interaction.js';
import * as canvasTextures from './textures/canvas.js';
import { PROFILE, wallPoint, sAtHeight, profileLength } from './cabin/profile.js';

import { buildCabin } from './cabin/index.js';
import { buildFurniture } from './furniture/index.js';
import { createEarth } from './earth/earth.js';
import { createLighting } from './lighting/lighting.js';

/** Bloom base strength; lighting adds clock.glare * 1.6 on top (DESIGN.md §7). */
export const BLOOM_BASE = 0.35;

const canvas = document.getElementById('scene');
const dpr = Math.min(window.devicePixelRatio || 1, 2);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, stencil: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(dpr);
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
canvasTextures.setMaxAnisotropy(renderer.capabilities.getMaxAnisotropy());

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
const controls = createControls(camera, canvas);
const clock = createClock();
const interaction = createInteraction({ dom: canvas, scene, camera, controls, clock, state, setState });

// The composer target needs stencil for the porthole masks. FXAA avoids a costly MSAA resolve.
const size = renderer.getSize(new THREE.Vector2());
const composerTarget = new THREE.WebGLRenderTarget(size.x * dpr, size.y * dpr, {
  type: THREE.HalfFloatType,
  depthBuffer: true,
  stencilBuffer: true,
  samples: 0,
});
const composer = new EffectComposer(renderer, composerTarget);
composer.setPixelRatio(dpr);
composer.setSize(size.x, size.y);
composer.addPass(new RenderPass(scene, camera));
// UnrealBloomPass already starts at half-size; halve that pyramid again to reduce GPU bandwidth.
class HabitatBloomPass extends UnrealBloomPass {
  setSize(width, height) { super.setSize(Math.max(1, width / 2), Math.max(1, height / 2)); }
}
const bloom = new HabitatBloomPass(new THREE.Vector2(size.x, size.y), BLOOM_BASE, 0.55, 0.82);
composer.addPass(bloom);
composer.addPass(new OutputPass());
const fxaa = new ShaderPass(FXAAShader);
fxaa.uniforms.resolution.value.set(1 / (size.x * dpr), 1 / (size.y * dpr));
composer.addPass(fxaa);

// Porthole centers on the inner wall surface (the wall's vertical part, so s === y).
function porthole(id, x, y, radius, stencil) {
  const center = wallPoint(x, sAtHeight(y), 0);
  return { id, x, y, center, normal: new THREE.Vector3(0, 0, 1), radius, stencil };
}
const portholes = [
  porthole('big', 1.33, 1.35, 0.75, 1),
  porthole('smallA', -2.6, 1.45, 0.225, 2),
  porthole('smallB', -1.2, 1.45, 0.225, 3),
];

const quality = {
  maxAnisotropy: renderer.capabilities.getMaxAnisotropy(),
};

const ctx = {
  THREE,
  scene,
  renderer,
  camera,
  controls,
  clock,
  state,
  setState,
  toggleState,
  onState,
  registry,
  interaction,
  bloom,
  profile: { PROFILE, wallPoint, sAtHeight, profileLength },
  portholes,
  loader: new THREE.TextureLoader(),
  baseUrl: import.meta.env.BASE_URL,
  quality,
};

// state.fastForward is the single source of truth; the clock just follows it.
clock.setFastForward(state.fastForward);
onState('fastForward', (on) => clock.setFastForward(on));

// Fixed build order: structure -> furnishings -> Earth -> lights (lights may look up meshes by name).
const modules = [buildCabin(ctx), buildFurniture(ctx), createEarth(ctx), createLighting(ctx)];
for (const m of modules) {
  if (m && typeof m.update === 'function') registry.addUpdatable(m.update);
}
interaction.rebuildCandidates();

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  composer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  fxaa.uniforms.resolution.value.set(1 / (w * dpr), 1 / (h * dpr));
}
window.addEventListener('resize', onResize);

let last = performance.now();
renderer.setAnimationLoop((now) => {
  const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
  last = now;
  controls.update(dt);
  clock.tick(dt);
  interaction.update(dt);
  const list = registry.updatables;
  for (let i = 0; i < list.length; i++) list[i](dt, clock.elapsed, clock);
  composer.render(dt);
});

// Read/drive handle for automated verification; these are references to the running scene.
window.__HABITAT__ = { THREE, clock, state, setState, controls, camera, renderer, composer, scene, registry, interaction };
