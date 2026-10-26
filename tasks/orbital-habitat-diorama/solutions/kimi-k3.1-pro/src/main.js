import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { makeTextures } from "./materials.js";
import { createHabitat, makeMaterials } from "./habitat.js";
import { createFurniture } from "./furniture.js";
import { createEnvironment } from "./environment.js";
import { batchStaticMeshes } from "./geometry.js";
import "./style.css";

const host = document.querySelector("#habitat");
const scene = new THREE.Scene();
scene.background = new THREE.Color("#080f18");
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
host.appendChild(renderer.domElement);
renderer.domElement.setAttribute("aria-label", "轨道之家三维场景。拖动旋转，滚轮缩放，点击物件聚焦或操作。拖动舷窗地球调整时间，单击舷窗切换快进。");

const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 180);
const defaultTarget = new THREE.Vector3(0.15, 0.86, -0.55);
const defaultOffset = new THREE.Vector3(6, 8.5, 15);
camera.position.copy(defaultTarget).add(defaultOffset);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(defaultTarget);
controls.enableDamping = true;
controls.dampingFactor = 0.075;
controls.enablePan = false;
controls.rotateSpeed = 0.42;
controls.zoomSpeed = 0.75;
controls.minZoom = 0.72;
controls.maxZoom = 3.7;
controls.minPolarAngle = Math.PI * 0.22;
controls.maxPolarAngle = Math.PI * 0.43;
controls.minAzimuthAngle = 0.08;
controls.maxAzimuthAngle = Math.PI * 0.50;
controls.update();

const materials = makeMaterials(makeTextures());
const habitat = createHabitat(materials);
scene.add(habitat.root);
const fixtures = createFurniture(habitat.root, materials);
const environment = createEnvironment(scene, renderer);

const targets = new Map();
function target(id, object, point, zoom) {
  const marker = new THREE.Group();
  marker.name = id;
  object.add(marker);
  object.traverse((child) => { child.userData.focus = id; });
  targets.set(id, { object, point: new THREE.Vector3(...point), zoom });
}
target("workstation", fixtures.workstation.group, [1.0, 1.29, -1.24], 2.6);
target("sleep", fixtures.sleep.group, [-2.70, 1.07, -1.1], 2.8);
target("plants", fixtures.plants.group, [-2.02, 0.93, -1.08], 3.2);
target("chair", fixtures.chair, [1.62, 0.70, 0.04], 2.75);
target("bike", fixtures.bike.group, [3.03, 0.75, -0.25], 3.15);
target("pen", fixtures.pen, [1.03, 1.48, -0.80], 3.7);

batchStaticMeshes(habitat.root, new Set([
  fixtures.sleep.zipper, fixtures.pen, fixtures.manual, fixtures.earbuds,
  fixtures.droplet, fixtures.crumb, fixtures.bike.flywheel,
  ...fixtures.indicators,
]));
for (const item of targets.values()) item.object.children.find((child) => child.name === item.object.name)?.traverse((child) => { child.userData.focus = item.object.name; });

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let activeFocus = null;
let focusTransition = null;
let orbitTime = 0.09;
let elapsed = 0;
let currentDaylight = 1;
let fastForward = false;
let plantOn = true;
let stripOn = true;
let pointerDown = null;
let draggingEarth = false;
let penSpin = 0;
let lastScreenUpdate = -1;
let lastOrbitTimestamp = performance.now();
const floaterBases = [
  { object: fixtures.pen, point: new THREE.Vector3(0.98, 1.58, -0.79), phase: 0 },
  { object: fixtures.manual, point: new THREE.Vector3(1.92, 1.65, -0.88), phase: 2 },
  { object: fixtures.earbuds, point: new THREE.Vector3(-0.53, 1.55, -0.63), phase: 4 },
  { object: fixtures.droplet, point: new THREE.Vector3(-1.65, 1.71, -0.62), phase: 1 },
  { object: fixtures.crumb, point: new THREE.Vector3(0.25, 1.44, -0.77), phase: 3 },
];
for (const item of floaterBases) {
  item.object.traverse((child) => { child.userData.floater = item.object; });
}
function setPointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
}

function pick(event) {
  setPointer(event);
  const plantScreen = window.__habitat?.screenTargets?.plantLight;
  if (plantScreen && Math.hypot(event.clientX - plantScreen[0], event.clientY - plantScreen[1]) < 26) return { action: "plants" };
  const stripScreen = window.__habitat?.screenTargets?.floorStrip;
  if (stripScreen && Math.hypot(event.clientX - stripScreen[0], event.clientY - stripScreen[1]) < 24) return { action: "strip" };
  const penScreen = window.__habitat?.screenTargets?.fixtures?.pen;
  const penHit = raycaster.intersectObject(fixtures.pen, true);
  if (penHit.length || (penScreen && Math.hypot(event.clientX - penScreen[0], event.clientY - penScreen[1]) < 9)) return { action: "pen" };
  const intersections = raycaster.intersectObject(habitat.root, true);
  const portalScreen = window.__habitat?.screenTargets?.porthole;
  if (portalScreen && Math.hypot(event.clientX - portalScreen[0], event.clientY - portalScreen[1]) < 72) return { action: "earth" };
  const earthHit = raycaster.intersectObject(environment.portalMeshes[0].object);
  if (earthHit.length && (!intersections.length || earthHit[0].distance < intersections[0].distance)) return { action: "earth" };
  for (const hit of intersections) {
    if (hit.object.userData.focus) {
      if (hit.object.userData.focus === "pen") return { action: "pen" };
      return { action: "focus", id: hit.object.userData.focus };
    }
    if (hit.object.userData.floater === fixtures.pen) return { action: "pen" };
    if (hit.object.material === materials.grow) return { action: "plants" };
    if (hit.object.material === materials.light) return { action: "strip" };
  }
  return { action: "blank" };
}

function focusOn(id) {
  const next = activeFocus === id ? null : id;
  const destination = next ? targets.get(next) : null;
  const destinationPoint = destination ? destination.point : defaultTarget;
  const direction = camera.position.clone().sub(controls.target).normalize();
  const targetPosition = destinationPoint.clone().addScaledVector(direction, 20);
  focusTransition = {
    start: performance.now(),
    fromPosition: camera.position.clone(),
    toPosition: targetPosition,
    fromTarget: controls.target.clone(),
    toTarget: destinationPoint.clone(),
    fromZoom: camera.zoom,
    toZoom: destination ? destination.zoom : 1,
  };
  activeFocus = next;
}

function operate(action) {
  if (action.action === "earth") fastForward = !fastForward;
  else if (action.action === "focus") focusOn(action.id);
  else if (action.action === "pen") {
    penSpin += Math.PI * 6;
    focusOn("pen");
  } else if (action.action === "plants") plantOn = !plantOn;
  else if (action.action === "strip") stripOn = !stripOn;
  else if (action.action === "blank" && activeFocus) focusOn(activeFocus);
}

renderer.domElement.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || focusTransition) return;
  const action = pick(event);
  pointerDown = { x: event.clientX, y: event.clientY, action, lastX: event.clientX, pointerId: event.pointerId };
  draggingEarth = action.action === "earth";
  if (draggingEarth) {
    controls.enabled = false;
    renderer.domElement.setPointerCapture(event.pointerId);
  }
});
renderer.domElement.addEventListener("pointermove", (event) => {
  setPointer(event);
  const distance = raycaster.ray.distanceToPoint(fixtures.pen.position);
  fixtures.pen.userData.avoid = THREE.MathUtils.clamp(0.21 - distance * 0.065, 0, 0.17);
  if (!pointerDown) return;
  const totalDistance = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
  if (draggingEarth && totalDistance > 4) {
    orbitTime = ((orbitTime + (event.clientX - pointerDown.lastX) / 650) % 1 + 1) % 1;
    pointerDown.moved = true;
  }
  if (totalDistance > 5) pointerDown.moved = true;
  pointerDown.lastX = event.clientX;
});
function releasePointer(event) {
  if (!pointerDown) return;
  const wasDragging = draggingEarth;
  const current = pointerDown;
  pointerDown = null;
  draggingEarth = false;
  controls.enabled = true;
  if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
  if (!current.moved && Math.hypot(event.clientX - current.x, event.clientY - current.y) < 5) operate(pick(event));
  if (wasDragging && current.moved && activeFocus) focusOn(activeFocus);
}
renderer.domElement.addEventListener("pointerup", releasePointer);
renderer.domElement.addEventListener("pointercancel", (event) => {
  pointerDown = null;
  draggingEarth = false;
  controls.enabled = true;
  if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
});
renderer.domElement.addEventListener("contextmenu", (event) => event.preventDefault());
controls.addEventListener("start", () => { focusTransition = null; });

function resize() {
  const aspect = window.innerWidth / window.innerHeight;
  const height = Math.max(5.9, 11.7 / aspect);
  camera.left = -height * aspect / 2;
  camera.right = height * aspect / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize);
resize();

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.2);
  const now = performance.now();
  const orbitDelta = (now - lastOrbitTimestamp) / 1000;
  lastOrbitTimestamp = now;
  elapsed += delta;
  if (!draggingEarth) orbitTime = (orbitTime + orbitDelta / (fastForward ? 15 : 90)) % 1;
  const daylight = environment.update(orbitTime, elapsed, stripOn);
  currentDaylight = daylight;

  materials.light.emissiveIntensity = stripOn ? 2.3 : 0.008;
  materials.light.color.set(stripOn ? "#fff2d4" : "#263b43");
  materials.grow.emissiveIntensity = plantOn ? 1.65 + Math.sin(elapsed * 0.95) * 0.38 : 0;
  materials.grow.color.set(plantOn ? "#e9a0d5" : "#253c43");
  fixtures.plants.light.intensity = plantOn ? 0.93 + Math.sin(elapsed * 0.95) * 0.2 : 0;
  fixtures.sleep.zipper.rotation.z = Math.sin(elapsed * 1.35) * 0.095;
  fixtures.bike.flywheel.rotation.y = elapsed * 0.05;
  fixtures.indicators.forEach((light, index) => {
    light.material.emissiveIntensity = Math.sin(elapsed * (0.8 + index * 0.41) + index * 2) > 0.3 ? 1.7 : 0.16;
  });

  floaterBases.forEach(({ object, point, phase }, index) => {
    object.position.set(point.x + Math.sin(elapsed * 0.19 + phase) * 0.052, point.y + Math.sin(elapsed * 0.31 + phase) * 0.08, point.z + Math.cos(elapsed * 0.22 + phase) * 0.045);
    if (object !== fixtures.pen) {
      object.rotation.y += delta * (0.07 + index * 0.009);
      object.rotation.z += delta * 0.035;
    }
  });
  penSpin = Math.max(0, penSpin - delta * 7.8);
  fixtures.pen.rotation.y += delta * (0.35 + penSpin);
  fixtures.pen.rotation.z = 1.0 + Math.sin(elapsed * 0.29) * 0.15;
  const avoidance = fixtures.pen.userData.avoid || 0;
  fixtures.pen.position.x += avoidance;
  fixtures.pen.position.y += avoidance * 0.5;

  if (elapsed - lastScreenUpdate > 0.12) {
    const { screenContext: ctx, screenMap } = fixtures.workstation;
    ctx.fillStyle = "#071b25"; ctx.fillRect(33, 112, 649, 376);
    ctx.strokeStyle = "#20434e"; ctx.lineWidth = 1;
    for (let x = 32; x < 690; x += 48) { ctx.beginPath(); ctx.moveTo(x, 112); ctx.lineTo(x, 490); ctx.stroke(); }
    for (let y = 114; y < 490; y += 40) { ctx.beginPath(); ctx.moveTo(32, y); ctx.lineTo(684, y); ctx.stroke(); }
    ctx.strokeStyle = "#65ded2"; ctx.lineWidth = 4; ctx.beginPath();
    for (let x = 32; x < 684; x += 3) {
      const y = 293 + Math.sin(x * 0.024 + elapsed * 0.4) * 60 + Math.sin(x * 0.071 + elapsed * 0.2) * 18;
      x === 32 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = "#5c91c7"; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 32; x < 684; x += 3) {
      const y = 363 + Math.sin(x * 0.016 + 2 + elapsed * 0.26) * 38;
      x === 32 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    screenMap.needsUpdate = true;
    lastScreenUpdate = elapsed;
  }

  if (focusTransition) {
    const t = Math.min((performance.now() - focusTransition.start) / 1050, 1);
    const eased = t * t * (3 - 2 * t);
    camera.position.lerpVectors(focusTransition.fromPosition, focusTransition.toPosition, eased);
    controls.target.lerpVectors(focusTransition.fromTarget, focusTransition.toTarget, eased);
    camera.zoom = THREE.MathUtils.clamp(THREE.MathUtils.lerp(focusTransition.fromZoom, focusTransition.toZoom, eased), controls.minZoom, controls.maxZoom);
    camera.updateProjectionMatrix();
    if (t >= 1) focusTransition = null;
  }
  controls.update();
  environment.renderPortals();
  renderer.render(scene, camera);
}
animate();

// Read-only diagnostics for the browser acceptance procedure.
Object.defineProperty(window, "__habitat", {
  value: Object.freeze({
    get state() {
      return Object.freeze({ orbitTime, fastForward, plantOn, stripOn, activeFocus, daylight: currentDaylight, penSpin });
    },
    get cameraType() { return camera.type; },
    get drawCalls() { return renderer.info.render.calls; },
    get texturesLoaded() { return Object.values(environment.textures).every((texture) => texture.image?.width > 0); },
    get screenTargets() {
      const project = (world) => {
        const p = world.clone().project(camera);
        return [(p.x + 1) * window.innerWidth / 2, (1 - p.y) * window.innerHeight / 2];
      };
      return {
        fixtures: Object.fromEntries([...targets].map(([id, target]) => [id, project(target.point)])),
        porthole: project(new THREE.Vector3(1.35, 1.64, -1.95)),
        plantLight: project(fixtures.plants.group.localToWorld(new THREE.Vector3(0, 1.56, 0))),
        floorStrip: project(new THREE.Vector3(-0.2, 0.09, 0.63)),
      };
    },
    get cameraView() { return { position: camera.position.toArray(), target: controls.target.toArray(), zoom: Number.isFinite(camera.zoom) ? camera.zoom : controls.minZoom }; },
    get animationTime() { return elapsed; },
  }),
  writable: false,
});
