import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./style.css";
import "./screen.css";
import { ERAS, MAX_YEAR, MIN_YEAR, eraForYear, eraIndexForYear, getNote } from "./content.js";
import { createScreenPainters, ScreenOverlay } from "./screens.js";
import { createWorld } from "./world.js";
import { glowTexture } from "./textures.js";

const canvas = document.querySelector("#scene");
const loading = document.querySelector("#loading");
const yearLabel = document.querySelector("#year");
const yearCaption = document.querySelector("#year-caption");
const slider = document.querySelector("#year-slider");
const playButton = document.querySelector("#play");
const playLabel = document.querySelector("#play-label");
const ticks = [...document.querySelectorAll("#ticks button")];
const memory = document.querySelector("#memory");
const memoryClose = document.querySelector("#memory-close");
const memoryKicker = document.querySelector("#memory-kicker");
const memoryTitle = document.querySelector("#memory-title");
const memoryBody = document.querySelector("#memory-body");
const memoryQuote = document.querySelector("#memory-quote");
const memoryBadge = document.querySelector("#memory-badge");
const hoverLabel = document.querySelector("#hover-label");
const toast = document.querySelector("#toast");
const viewButtons = [...document.querySelectorAll(".viewswitch button")];
const screenModal = document.querySelector("#screen-modal");
const screenSurface = document.querySelector("#screen-surface");
const screenClose = document.querySelector("#screen-close");
const monitorLabel = document.querySelector("#monitor-label");
const monitorCaption = document.querySelector("#monitor-caption");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: "high-performance",
  alpha: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.96;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x15110e);
scene.fog = new THREE.FogExp2(0x17120e, 0.013);

const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 80);
const overview = {
  position: new THREE.Vector3(6.15, 4.65, 8.85),
  target: new THREE.Vector3(-0.2, 1.18, -0.62),
};
const deskView = {
  position: new THREE.Vector3(2.15, 2.25, 1.15),
  target: new THREE.Vector3(-1.25, 1.14, -3.15),
};
camera.position.copy(overview.position);

const controls = new OrbitControls(camera, canvas);
controls.target.copy(overview.target);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.enablePan = false;
controls.minDistance = 2.8;
controls.maxDistance = 17;
controls.minPolarAngle = 0.42;
controls.maxPolarAngle = 1.47;
controls.minAzimuthAngle = -1.22;
controls.maxAzimuthAngle = 1.22;
controls.update();

const painters = createScreenPainters(ERAS);
const world = createWorld(scene, painters);

const ambient = new THREE.AmbientLight(0xffeed8, 0.22);
scene.add(ambient);
const hemisphere = new THREE.HemisphereLight(0xc7d3d5, 0x594a39, 0.52);
scene.add(hemisphere);
const sun = new THREE.DirectionalLight(0xffd9a6, 1.65);
sun.position.set(-7.5, 7.4, 4.5);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -7;
sun.shadow.camera.right = 7;
sun.shadow.camera.top = 7;
sun.shadow.camera.bottom = -6;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 30;
sun.shadow.bias = -0.0003;
sun.shadow.normalBias = 0.024;
scene.add(sun);

const overhead = new THREE.PointLight(0xfff0d8, 9, 11, 2);
overhead.position.set(0.35, 2.88, 0.45);
scene.add(overhead);
const deskLight = new THREE.PointLight(0xffba70, 1.7, 3.2, 2);
deskLight.position.set(-2.54, 1.48, -3.32);
scene.add(deskLight);
const screenLight = new THREE.PointLight(0x79a6cf, 1.1, 3.6, 2);
screenLight.position.set(-1.7, 1.22, -2.82);
scene.add(screenLight);
const accentLight = new THREE.PointLight(0x4f7f69, 0, 4.2, 2);
accentLight.position.set(-1.7, 1.85, -3.28);
scene.add(accentLight);
const floorLight = new THREE.PointLight(0xffa75f, 0, 5.2, 2);
floorLight.position.set(3.88, 1.42, 2.14);
scene.add(floorLight);

const floorPlane = new THREE.Mesh(
  new THREE.CircleGeometry(26, 64),
  new THREE.MeshStandardMaterial({ color: 0x17120d, roughness: 1, metalness: 0 })
);
floorPlane.rotation.x = -Math.PI / 2;
floorPlane.position.y = -0.5;
floorPlane.receiveShadow = true;
scene.add(floorPlane);

const dustGeometry = new THREE.BufferGeometry();
const dustCount = 240;
const dustPositions = new Float32Array(dustCount * 3);
const dustSeeds = [];
let seed = 7713;
const random = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
for (let i = 0; i < dustCount; i += 1) {
  dustPositions[i * 3] = -4.1 + random() * 8.2;
  dustPositions[i * 3 + 1] = 0.35 + random() * 2.75;
  dustPositions[i * 3 + 2] = -3.5 + random() * 6.9;
  dustSeeds.push({ phase: random() * Math.PI * 2, speed: 0.03 + random() * 0.07, base: dustPositions[i * 3 + 1] });
}
dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
const dustMaterial = new THREE.PointsMaterial({
  color: 0xffd3a1,
  size: 0.012,
  transparent: true,
  opacity: 0.28,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
const dust = new THREE.Points(dustGeometry, dustMaterial);
scene.add(dust);

const hoverSpriteMaterial = new THREE.SpriteMaterial({
  map: glowTexture("rgba(255,221,164,0.9)"),
  color: 0xffffff,
  transparent: true,
  opacity: 0.8,
  depthTest: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
const hoverSprite = new THREE.Sprite(hoverSpriteMaterial);
hoverSprite.scale.set(0.22, 0.22, 1);
hoverSprite.visible = false;
hoverSprite.renderOrder = 20;
scene.add(hoverSprite);

const screenOverlay = new ScreenOverlay(
  screenModal,
  screenSurface,
  monitorLabel,
  monitorCaption,
  screenClose
);

const state = {
  year: 2005,
  eraIndex: 0,
  playing: false,
  yearFloat: 2005,
  hovered: null,
  selectedId: null,
  modalOpen: false,
  lastFrame: performance.now(),
  cameraTween: null,
  view: "overview",
  toastTimer: 0,
};

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(-10, -10);
let pointerDown = null;
let pointerOverCanvas = false;

if (import.meta.env.DEV) {
  window.__debug = { scene, camera, renderer, world, controls, state, THREE };
}

let elapsed = 0;

const currentLight = {
  exposure: 0.96,
  hemisphere: 0.52,
  sun: 1.65,
  fill: 9,
  screen: 1.1,
  lamp: 1.7,
  accent: 0,
  floor: 0,
  sky: new THREE.Color(0xc7d3d5),
  ground: new THREE.Color(0x594a39),
  sunColor: new THREE.Color(0xffd9a6),
  fillColor: new THREE.Color(0xfff0d8),
  screenColor: new THREE.Color(0x79a6cf),
  lampColor: new THREE.Color(0xffba70),
  accentColor: new THREE.Color(0x4f7f69),
};
const eraLightColors = ERAS.map((era) => ({
  sky: new THREE.Color(era.lighting.hemisphereSky),
  ground: new THREE.Color(era.lighting.hemisphereGround),
  sun: new THREE.Color(era.lighting.sunColor),
  fill: new THREE.Color(era.lighting.fillColor),
  screen: new THREE.Color(era.lighting.screenColor),
  lamp: new THREE.Color(era.lighting.lampColor),
  accent: new THREE.Color(era.lighting.accentColor),
}));

const damp = (current, target, speed, dt) => target + (current - target) * Math.exp(-speed * dt);

const updateLights = (dt) => {
  const target = ERAS[state.eraIndex].lighting;
  const colors = eraLightColors[state.eraIndex];
  currentLight.exposure = damp(currentLight.exposure, target.exposure, 2.2, dt);
  currentLight.hemisphere = damp(currentLight.hemisphere, target.hemisphere, 2.2, dt);
  currentLight.sun = damp(currentLight.sun, target.sunIntensity, 2.2, dt);
  currentLight.fill = damp(currentLight.fill, target.fillIntensity, 2.2, dt);
  currentLight.screen = damp(currentLight.screen, target.screenIntensity, 2.2, dt);
  currentLight.lamp = damp(currentLight.lamp, target.lampIntensity, 2.2, dt);
  currentLight.accent = damp(currentLight.accent, target.accentIntensity, 2.2, dt);
  const floorTarget = [0, 3.5, 7, 21, 26][state.eraIndex];
  currentLight.floor = damp(currentLight.floor, floorTarget, 2.2, dt);
  const blend = 1 - Math.exp(-2.2 * dt);
  currentLight.sky.lerp(colors.sky, blend);
  currentLight.ground.lerp(colors.ground, blend);
  currentLight.sunColor.lerp(colors.sun, blend);
  currentLight.fillColor.lerp(colors.fill, blend);
  currentLight.screenColor.lerp(colors.screen, blend);
  currentLight.lampColor.lerp(colors.lamp, blend);
  currentLight.accentColor.lerp(colors.accent, blend);
  renderer.toneMappingExposure = currentLight.exposure;
  hemisphere.color.copy(currentLight.sky);
  hemisphere.groundColor.copy(currentLight.ground);
  hemisphere.intensity = currentLight.hemisphere;
  sun.color.copy(currentLight.sunColor);
  sun.intensity = currentLight.sun;
  overhead.color.copy(currentLight.fillColor);
  overhead.intensity = currentLight.fill;
  screenLight.color.copy(currentLight.screenColor);
  screenLight.intensity = currentLight.screen;
  deskLight.color.copy(currentLight.lampColor);
  deskLight.intensity = currentLight.lamp;
  accentLight.color.copy(currentLight.accentColor);
  accentLight.intensity = currentLight.accent * 2.2;
  floorLight.color.copy(currentLight.lampColor);
  floorLight.intensity = currentLight.floor;
};

const updateYearUi = (animate = false) => {
  yearLabel.textContent = String(state.year);
  yearCaption.textContent = ERAS[state.eraIndex].caption;
  slider.value = String(state.year);
  const fill = ((state.year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
  slider.style.setProperty("--fill", `${fill}%`);
  ticks.forEach((tick) => {
    tick.classList.toggle("active", Number(tick.dataset.year) === ERAS[state.eraIndex].year);
  });
  if (animate) {
    yearLabel.classList.remove("is-shifting");
    void yearLabel.offsetWidth;
    yearLabel.classList.add("is-shifting");
  }
  if (state.selectedId) refreshMemory();
};

const setYear = (value, { animate = true, pause = true } = {}) => {
  const year = Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(value)));
  const nextEra = eraIndexForYear(year);
  const changedEra = nextEra !== state.eraIndex;
  state.year = year;
  state.yearFloat = year;
  state.eraIndex = nextEra;
  if (changedEra) screenOverlay.close();
  if (pause && state.playing) setPlaying(false);
  updateYearUi(animate || changedEra);
  if (state.hovered) {
    const note = state.hovered.id === "screen" ? null : getNote(state.hovered.id, ERAS[nextEra].year);
    if (!note) {
      state.hovered = null;
      hoverLabel.classList.remove("is-visible");
      hoverSprite.visible = false;
      canvas.classList.remove("is-hovering");
    }
  }
};

const setPlaying = (playing) => {
  state.playing = playing;
  playButton.classList.toggle("is-playing", playing);
  playButton.setAttribute("aria-label", playing ? "暂停自动播放" : "自动播放时间");
  playLabel.textContent = playing ? "暂停" : "自动播放";
  if (playing) {
    if (state.year >= MAX_YEAR) {
      state.yearFloat = MIN_YEAR;
      setYear(MIN_YEAR, { pause: false });
    } else {
      state.yearFloat = state.year;
    }
  }
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
};

const closeMemory = () => {
  state.selectedId = null;
  memory.classList.remove("is-open");
  memory.setAttribute("aria-hidden", "true");
};

const refreshMemory = () => {
  if (!state.selectedId) return;
  const note = getNote(state.selectedId, ERAS[state.eraIndex].year);
  if (!note) {
    closeMemory();
    return;
  }
  memoryKicker.textContent = `${note.kind} · ${ERAS[state.eraIndex].year}`;
  memoryTitle.textContent = note.title;
  memoryBody.textContent = note.body;
  memoryQuote.textContent = note.quote ?? "";
  if (note.badge) {
    memoryBadge.textContent = note.badge;
    memoryBadge.classList.add("is-visible");
  } else {
    memoryBadge.classList.remove("is-visible");
  }
};

const openMemory = (entry) => {
  if (entry.id === "screen") {
    openScreen();
    return;
  }
  const note = getNote(entry.id, ERAS[state.eraIndex].year);
  if (!note) return;
  state.selectedId = entry.id;
  hideHover();
  refreshMemory();
  memory.classList.add("is-open");
  memory.setAttribute("aria-hidden", "false");
};

const openScreen = () => {
  setPlaying(false);
  closeMemory();
  hideHover();
  state.modalOpen = true;
  screenOverlay.open(ERAS[state.eraIndex]);
};

const closeScreen = () => {
  screenOverlay.close();
};

screenOverlay.onClose = () => {
  state.modalOpen = false;
};

const hideHover = () => {
  state.hovered = null;
  hoverLabel.classList.remove("is-visible");
  hoverSprite.visible = false;
  canvas.classList.remove("is-hovering");
};

const setPointerFromEvent = (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
};

const findInteraction = (event) => {
  setPointerFromEvent(event);
  raycaster.setFromCamera(pointer, camera);
  const active = world.getActiveInteractions();
  const meshes = active.map((entry) => entry.mesh);
  const hits = raycaster.intersectObjects(meshes, false);
  for (const hit of hits) {
    const entry = hit.object.userData.interaction;
    if (entry) return entry;
  }
  return null;
};

const updateHover = (event) => {
  if (state.modalOpen || state.playing || !pointerOverCanvas) return;
  const entry = findInteraction(event);
  if (!entry) {
    hideHover();
    return;
  }
  const era = ERAS[state.eraIndex];
  const note = entry.id === "screen" ? null : getNote(entry.id, era.year);
  if (entry.id !== "screen" && !note) {
    hideHover();
    return;
  }
  if (state.hovered?.mesh !== entry.mesh) {
    state.hovered = entry;
    const label = entry.id === "screen" ? `点亮 ${era.screen.label.split(" · ")[0]} 屏幕` : note.title;
    hoverLabel.textContent = label;
    canvas.classList.add("is-hovering");
  }
  const x = Math.min(window.innerWidth - 180, event.clientX + 16);
  const y = Math.min(window.innerHeight - 60, event.clientY + 18);
  hoverLabel.style.left = `${x}px`;
  hoverLabel.style.top = `${y}px`;
  hoverLabel.classList.add("is-visible");
  const box = new THREE.Box3().setFromObject(entry.mesh);
  const center = box.getCenter(new THREE.Vector3());
  hoverSprite.position.set(center.x, box.max.y + 0.1, center.z);
  hoverSprite.visible = true;
};

const updateCameraTween = (dt) => {
  if (!state.cameraTween) return;
  const tween = state.cameraTween;
  tween.elapsed += dt;
  const t = Math.min(1, tween.elapsed / tween.duration);
  const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  camera.position.lerpVectors(tween.fromPosition, tween.toPosition, eased);
  controls.target.lerpVectors(tween.fromTarget, tween.toTarget, eased);
  if (t >= 1) state.cameraTween = null;
};

const moveCamera = (view) => {
  const preset = view === "desk" ? deskView : overview;
  state.view = view;
  state.cameraTween = {
    fromPosition: camera.position.clone(),
    toPosition: preset.position.clone(),
    fromTarget: controls.target.clone(),
    toTarget: preset.target.clone(),
    elapsed: 0,
    duration: 1.25,
  };
  viewButtons.forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
};

viewButtons.forEach((button) => {
  button.addEventListener("click", () => moveCamera(button.dataset.view));
});

ticks.forEach((tick) => {
  tick.addEventListener("click", () => {
    setYear(Number(tick.dataset.year));
  });
});

slider.addEventListener("pointerdown", () => {
  if (state.playing) setPlaying(false);
});

slider.addEventListener("input", () => {
  setYear(Number(slider.value));
});

playButton.addEventListener("click", () => {
  if (state.playing) {
    setPlaying(false);
  } else {
    setPlaying(true);
  }
});

memoryClose.addEventListener("click", closeMemory);

document.querySelectorAll("[data-screen-close]").forEach((element) => {
  element.addEventListener("click", closeScreen);
});

window.addEventListener("keydown", (event) => {
  if (state.modalOpen) return;
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) {
    if (event.key !== "Escape") return;
  }
  if (event.key === "Escape") {
    if (state.selectedId) closeMemory();
    return;
  }
  if (event.code === "Space") {
    event.preventDefault();
    setPlaying(!state.playing);
  } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    setYear(state.year + (event.key === "ArrowRight" ? 1 : -1));
  } else if (event.key === "1") {
    moveCamera("overview");
  } else if (event.key === "2") {
    moveCamera("desk");
  }
});

canvas.addEventListener("pointerenter", () => {
  pointerOverCanvas = true;
});
canvas.addEventListener("pointerleave", () => {
  pointerOverCanvas = false;
  hideHover();
});
canvas.addEventListener("pointermove", (event) => {
  updateHover(event);
});
canvas.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  pointerDown = { x: event.clientX, y: event.clientY };
  canvas.classList.add("is-dragging");
  state.cameraTween = null;
});
canvas.addEventListener("pointerup", (event) => {
  canvas.classList.remove("is-dragging");
  if (!pointerDown) return;
  const moved = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
  pointerDown = null;
  if (moved > 6 || state.modalOpen) return;
  const entry = findInteraction(event);
  if (!entry) {
    closeMemory();
    return;
  }
  openMemory(entry);
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const updateDust = (dt) => {
  const positions = dust.geometry.attributes.position.array;
  for (let i = 0; i < dustCount; i += 1) {
    const s = dustSeeds[i];
    positions[i * 3 + 1] = s.base + Math.sin(elapsed * s.speed + s.phase) * 0.16;
    positions[i * 3] += Math.sin(elapsed * 0.03 + s.phase) * dt * 0.004;
  }
  dust.geometry.attributes.position.needsUpdate = true;
};

const animate = () => {
  requestAnimationFrame(animate);
  const now = performance.now();
  const dt = Math.min(0.2, (now - state.lastFrame) / 1000);
  state.lastFrame = now;
  elapsed += dt;
  if (state.playing) {
    state.yearFloat += dt * 1.35;
    if (state.yearFloat >= MAX_YEAR) {
      state.yearFloat = MAX_YEAR;
      setYear(MAX_YEAR, { pause: false });
      setPlaying(false);
      showToast("2025 · 灯还亮着");
    } else {
      const nextYear = Math.floor(state.yearFloat);
      if (nextYear !== state.year) setYear(nextYear, { pause: false });
    }
  }
  updateCameraTween(dt);
  controls.update();
  updateLights(dt);
  world.update({ dt, eraIndex: state.eraIndex });
  painters.get(ERAS[state.eraIndex].year).update(performance.now());
  updateDust(dt);
  if (state.hovered?.mesh) {
    const box = new THREE.Box3().setFromObject(state.hovered.mesh);
    const center = box.getCenter(new THREE.Vector3());
    hoverSprite.position.set(center.x, box.max.y + 0.1, center.z);
  }
  renderer.render(scene, camera);
};

setYear(2005, { animate: false, pause: false });
requestAnimationFrame(() => {
  renderer.render(scene, camera);
});
setTimeout(() => loading.classList.add("is-done"), 900);
animate();
