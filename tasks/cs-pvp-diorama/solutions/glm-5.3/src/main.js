// CS PVP Diorama — bootstrap. Renders the rain-night defusal-map diorama with
// toon shading + outlines, orbit/drag/zoom viewing, and the subtle FX layer.
// No UI: the page is nothing but the canvas.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import { noOutline } from './utils.js';
import { buildGround } from './ground.js';
import { buildLighting } from './lighting.js';
import { buildMid } from './mid.js';
import { buildTSpawn } from './tspawn.js';
import { buildASite } from './asite.js';
import { buildBSite } from './bsite.js';
import { buildCTSpawn } from './ctspawn.js';
import { buildFlanks } from './flanks.js';
import { buildFX } from './fx.js';

function skyDome(scene) {
  const c = document.createElement('canvas');
  c.width = 4; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.0, '#0a111d');
  g.addColorStop(0.45, '#0e1726');
  g.addColorStop(0.72, '#1a2942');
  g.addColorStop(1.0, '#22344e');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 4, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(170, 24, 16),
    noOutline(new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false })),
  );
  scene.add(dome);
}

function main() {
  const canvas = document.getElementById('scene');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.25;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d1420);
  scene.fog = new THREE.Fog(0x0d1420, 75, 200);
  skyDome(scene);

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.5, 400);
  camera.position.set(33, 24, 41);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 16;
  controls.maxDistance = 130;
  controls.maxPolarAngle = 1.46;
  controls.target.set(0, 1.5, 0);

  const outline = new OutlineEffect(renderer, {
    defaultThickness: 0.0032,
    defaultColor: [0.045, 0.06, 0.095],
    defaultAlpha: 1,
  });

  // Build the diorama; regions collect FX anchors into ctx.
  const ctx = { drips: [], steams: [], scrollMats: [], uniforms: [] };
  const ground = buildGround(scene);
  ctx.uniforms.push(...ground.uniforms);
  const lighting = buildLighting(scene);
  buildTSpawn(scene, ctx);
  buildASite(scene, ctx);
  buildMid(scene, ctx);
  buildBSite(scene, ctx);
  buildCTSpawn(scene, ctx);
  buildFlanks(scene, ctx);
  const fxUpdate = buildFX(scene, ctx, lighting);

  // Keep panning inside the board.
  const clampTarget = () => {
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -26, 26);
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -26, 26);
    controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 12);
  };

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  const tick = () => {
    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.elapsedTime;
    controls.update();
    clampTarget();
    lighting.update(t);
    fxUpdate(dt, t);
    outline.render(scene, camera);
  };

  // Debug/verification handle (not UI).
  window.__diorama = { renderer, scene, camera, controls, outline, tick, started: false };

  renderer.setAnimationLoop(() => {
    window.__diorama.started = true;
    try {
      tick();
    } catch (e) {
      if (!window.__loopError) {
        window.__loopError = String((e && e.stack) || e);
        console.error('DIORAMA LOOP FAIL', e);
      }
      throw e;
    }
  });
}

try {
  main();
} catch (e) {
  console.error('DIORAMA BOOT FAIL', e);
  window.__dioramaError = String((e && e.stack) || e);
}
