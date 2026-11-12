// Entry: renderer + orbit-style free look, click-to-inspect, timeline
// slider (drag + autoplay), and the screen-surface bridge.

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Room } from "./room";
import { ScreenSurface } from "./screenSurface";
import { INFOS, pickPhase, REPRESENTATIVE_YEARS } from "./era";

const app = document.getElementById("app")!;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
app.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.05, 50);
camera.position.set(3.6, 2.6, 4.2);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(-0.4, 0.8, 0.2);
controls.minDistance = 0.6;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI * 0.55;

const room = new Room();
const surface = new ScreenSurface();
const scene = room.scene;
scene.add(camera);

let year = 2005;
room.setYear(year);
surface.setYear(year);

// ---------- UI ----------
const yearLabel = document.getElementById("yearLabel")!;
const phaseLabel = document.getElementById("phaseLabel")!;
const slider = document.getElementById("yearSlider") as HTMLInputElement;
const playBtn = document.getElementById("playBtn") as HTMLButtonElement;
const info = document.getElementById("info")!;
const toast = document.getElementById("toast")!;
const marks = document.getElementById("marks")!;

for (const y of REPRESENTATIVE_YEARS) {
  const s = document.createElement("span");
  s.textContent = String(y);
  s.style.left = `${((y - 2005) / 20) * 100}%`;
  s.addEventListener("click", () => { slider.value = String(y); setYear(y); });
  marks.appendChild(s);
}

function setYear(y: number) {
  year = Math.max(2005, Math.min(2025, y));
  room.setYear(year);
  surface.setYear(year);
  yearLabel.textContent = String(Math.floor(year));
  phaseLabel.textContent = pickPhase(year);
}

slider.addEventListener("input", () => { stop(); setYear(parseFloat(slider.value)); });
slider.addEventListener("pointerdown", () => stop());

let playing = false;
let playDir = 1;
let rafId = 0;
function step() {
  const v = parseFloat(slider.value) + playDir * 0.06;
  if (v >= 2025 || v <= 2005) { stop(); return; }
  slider.value = String(v);
  setYear(v);
  rafId = requestAnimationFrame(step);
}
function play() {
  if (playing) { stop(); return; }
  if (parseFloat(slider.value) >= 2024.9) slider.value = "2005";
  playing = true;
  playBtn.textContent = "⏸";
  rafId = requestAnimationFrame(step);
}
function stop() {
  playing = false;
  playBtn.textContent = "▶";
  cancelAnimationFrame(rafId);
}
playBtn.addEventListener("click", play);

function showToast(t: string, ms = 2200) {
  toast.textContent = t;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", ms);
}

// ---------- picking ----------
const ray = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let downAt = 0;

const PICKABLE: Record<string, string> = {
  monitor: "monitor", tower: "tower", keyboard: "keyboard", mouse: "mouse",
  desk: "desk", chair: "chair", bed: "bed", plush: "plush", trophy: "trophy",
  gameboy: "gameboy", mug: "mug", discs: "discs", poster: "poster",
  lamp: "lamp", router: "router", retroNook: "retroNook", headset: "headset",
  plant: "plant", ac: "ac", mic: "mic", window: "window", shelf: "shelf",
};

function findInfoKey(o: THREE.Object3D): string | undefined {
  let cur: THREE.Object3D | null = o;
  while (cur) {
    const n = cur.name;
    if (n.startsWith("keep:")) return n.slice(5);
    for (const k of Object.keys(PICKABLE))
      if (n.startsWith(k + ":")) return k;
    if (n.startsWith("clutter:")) return n.slice(8);
    cur = cur.parent;
  }
  return undefined;
}

renderer.domElement.addEventListener("pointerdown", () => { downAt = performance.now(); });
renderer.domElement.addEventListener("pointerup", e => {
  if (performance.now() - downAt > 220) return; // it was a drag
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  ray.setFromCamera(mouse, camera);
  const hits = ray.intersectObjects(scene.children, true);
  for (const h of hits) {
    const key = findInfoKey(h.object);
    if (!key) continue;
    const infoData = INFOS[key];
    if (infoData) {
      info.style.display = "block";
      info.innerHTML =
        `<h3>${infoData.title}</h3><div class="era">${infoData.era}</div>` +
        `<div class="mem">${infoData.mem}</div>`;
      showToast(`${infoData.title} · ${Math.floor(year)}`);
    }
    return;
  }
  info.style.display = "none";
});

// ---------- loop ----------
const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, clock.getDelta());
  room.tick(dt);
  controls.update();
  surface.update(camera, room.screenAnchor, room.screenSize, renderer.domElement);
  renderer.render(scene, camera);
}
loop();

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// keyboard shortcuts: 1-9 snap to representative years
addEventListener("keydown", e => {
  const idx = parseInt(e.key, 10);
  if (idx >= 1 && idx <= REPRESENTATIVE_YEARS.length) {
    slider.value = String(REPRESENTATIVE_YEARS[idx - 1]);
    setYear(REPRESENTATIVE_YEARS[idx - 1]);
  }
});

setYear(2005);

// debug hooks (dev only; harmless in prod)
(window as unknown as { __room: typeof room; __surface: typeof surface }).__room = room;
(window as unknown as { __room: typeof room; __surface: typeof surface }).__surface = surface;
(window as unknown as { __camera: typeof camera }).__camera = camera;
(window as unknown as { __THREE: typeof THREE }).__THREE = THREE;
