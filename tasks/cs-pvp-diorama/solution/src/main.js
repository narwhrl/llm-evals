import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { wetStreetMaterial } from "./materials.js";
import { buildDiorama, BASE } from "./layout.js";
import { ToonRenderer } from "./postfx.js";
import { batchStaticMeshes } from "./batch.js";
import { makeRain, makeDrips, makeSteam, updateSteam, lampGlow, makeLighting, makeLightning } from "./weather.js";

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.62;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const SKY_TOP = new THREE.Color(0x14202f);
const SKY_LOW = new THREE.Color(0x38455a);
scene.background = skyTexture();
scene.fog = new THREE.Fog(0x1e2836, 90, 240);

// Opening framing solved against the base corners: at this distance the whole
// 60x60 diorama fits a 1440x900 frame with ~6% margin.
const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 400);
camera.position.set(47, 36, 56);
camera.layers.enable(1); // wet street lives on its own layer

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 4.5, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 14;
controls.maxDistance = 130;
controls.minPolarAngle = 0.14;
controls.maxPolarAngle = Math.PI * 0.487;
controls.autoRotate = false;
controls.update();

// Planar mirror feeding the wet street. The pipeline owns the mirror target, so
// the street material must sample that same texture rather than a second one.
const toon = new ToonRenderer(renderer, scene, camera);

const mirrorUniforms = {
  matrix: { value: new THREE.Matrix4() },
  strength: { value: 0.92 },
  time: { value: 0 },
};

const wet = wetStreetMaterial({
  mirrorTexture: { value: toon.mirrorRT.texture },
  reflectorUniforms: mirrorUniforms,
});
const { root, ground, anim } = buildDiorama(scene, wet);
// Merge every immobile prop before the weather rigs attach, so the three
// per-frame scene passes stay cheap.
const batching = batchStaticMeshes(root);

// Rain, drips and steam.
const rain = makeRain(1150, BASE, 28);
const drips = makeDrips(anim.dripLines, 300);
scene.add(rain, drips);
const steam = anim.vents.map((v) => {
  const s = makeSteam(v, 20);
  scene.add(s);
  return s;
});

// Additive halos around every practical light source: these are what read as
// the misty bloom in the rain, and they are mirrored into the wet street too.
const halos = [];
for (const l of anim.lamps) {
  const s = lampGlow(l.lampPos, "rgba(255,190,110,0.95)", 4.4);
  scene.add(s);
  halos.push(s);
}
if (anim.searchlight) {
  const s = lampGlow(new THREE.Vector3(16.4, 3.6, 22.0), "rgba(255,240,205,0.9)", 3.0);
  scene.add(s);
  halos.push(s);
}
scene.add(lampGlow(new THREE.Vector3(-19, 5.2, -8), "rgba(205,228,255,0.75)", 3.6));
scene.add(lampGlow(new THREE.Vector3(18.4, 2.9, -11.4), "rgba(255,208,150,0.8)", 3.0));
scene.add(lampGlow(new THREE.Vector3(-21.6, 1.7, -13.4), "rgba(255,80,60,0.8)", 2.2));
scene.add(lampGlow(new THREE.Vector3(-14.6, 3.4, 24.8), "rgba(150,170,255,0.75)", 2.6));

const lighting = makeLighting(scene, anim);
const lightning = makeLightning(scene, anim);

function skyTexture() {
  const c = document.createElement("canvas");
  c.width = 8; c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "#" + SKY_TOP.getHexString());
  g.addColorStop(0.55, "#1b2530");
  g.addColorStop(1, "#" + SKY_LOW.getHexString());
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 8, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.mapping = THREE.EquirectangularReflectionMapping;
  return tex;
}

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  toon.setSize(w, h, camera.near, camera.far);
}
window.addEventListener("resize", resize);
resize();

const clock = new THREE.Clock();
let mirrorFrame = 0;

renderer.setAnimationLoop(() => {
  const dt = Math.min(0.05, clock.getDelta());
  const t = clock.elapsedTime;

  lighting.update(dt, t);
  lightning.update(dt, t);
  rain.material.uniforms.uTime.value = t;
  drips.material.uniforms.uTime.value = t;
  mirrorUniforms.time.value = t;
  for (const s of steam) updateSteam(s, t);
  for (const h of halos) h.material.opacity = 0.55 + Math.sin(t * 6.1 + h.position.x) * 0.08 + lightning.uniforms.value * 0.2;

  controls.update();

  // The mirror is a full extra scene render, so it refreshes on alternating
  // frames; nothing in the diorama moves fast enough for the lag to show.
  if (mirrorFrame % 2 === 0) {
    toon.renderMirror(scene, ground, [rain, drips, ...steam], 0.02, mirrorUniforms.matrix.value);
  }
  mirrorFrame++;

  toon.render({ flash: lightning.uniforms.value });
});

// Dev-only hook for the acceptance harness: the page exposes no UI at all, so
// camera state is read through this handle instead.
if (import.meta.env.DEV) {
  window.__diorama = { scene, camera, controls, renderer, toon, anim, rain, drips, steam, ground, lighting, lightning, batching };
}
