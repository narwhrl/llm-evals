import * as THREE from "three";
import { ROOM, PORTHOLE, SMALL_PORTHOLES, VIEW, FOCUS, ORBIT } from "./layout.js";
import { createMaterials } from "./materials.js";
import { createHull, addWallDecals } from "./hull.js";
import { createFurnishings, createFloaters } from "./furnishings.js";
import { createDetails } from "./details.js";
import { createGlobe, loadEarthTextures } from "./earth.js";
import { starTexture } from "./textures.js";
import { clamp, lerp, smoothstep } from "./utils.js";

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, stencil: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03050a);

// ---------------------------------------------------------------------------
// Camera: orthographic, isometric framing.
// ---------------------------------------------------------------------------
const aspect = window.innerWidth / window.innerHeight;
// Fits the module's 8.8 x 7.4 projected bounding box with a small margin.
const frustum = 6.35;
const camera = new THREE.OrthographicCamera(
  (-frustum * aspect) / 2,
  (frustum * aspect) / 2,
  frustum / 2,
  -frustum / 2,
  0.1,
  120,
);

const camState = {
  azimuth: VIEW.azimuth,
  elevation: VIEW.elevation,
  zoom: 1,
  target: new THREE.Vector3(...VIEW.target),
  goalAzimuth: VIEW.azimuth,
  goalElevation: VIEW.elevation,
  goalZoom: 1,
  goalTarget: new THREE.Vector3(...VIEW.target),
  transition: 0,
  dragging: false,
};

// Orthographic cameras do not gain magnification from distance, so zoom is
// expressed as a frustum scale and applied here.
function setFrustumScale(scale) {
  const h = frustum / scale;
  camera.top = h / 2;
  camera.bottom = -h / 2;
  camera.left = (-h * aspect) / 2;
  camera.right = (h * aspect) / 2;
  camera.updateProjectionMatrix();
}

// Filled after the Earth textures load; applyCamera() repositions it.
const globes = [];

function applyCamera() {
  const az = (camState.azimuth * Math.PI) / 180;
  const el = (camState.elevation * Math.PI) / 180;
  const x = Math.sin(az) * Math.cos(el) * VIEW.height;
  const y = Math.sin(el) * VIEW.height;
  const z = Math.cos(az) * Math.cos(el) * VIEW.height;
  camera.position.set(camState.target.x + x, camState.target.y + y, camState.target.z + z);
  camera.lookAt(camState.target);
  camera.updateMatrixWorld();

  // Globes are anchored in screen space behind each porthole: under an
  // orthographic camera the projected disc keeps its size and offset while the
  // diorama rotates, so every window keeps showing the same planet.
  const right = new THREE.Vector3(Math.cos(az), 0, -Math.sin(az));
  const up = new THREE.Vector3(-Math.sin(el) * Math.sin(az), Math.cos(el), -Math.sin(el) * Math.cos(az));
  const back = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
  for (const globe of globes) {
    const { porthole, depth, offset, radius } = globe.anchor;
    const center = new THREE.Vector3(porthole.x, porthole.y, ROOM.wallZ);
    const shift = offset * radius;
    globe.group.position
      .copy(center)
      .addScaledVector(right, shift)
      .addScaledVector(up, shift * 0.55)
      .addScaledVector(back, -depth);
  }
}
applyCamera();

// ---------------------------------------------------------------------------
// World.
// ---------------------------------------------------------------------------
const materials = createMaterials();
const hull = createHull(materials);
scene.add(hull);
addWallDecals(hull, materials);

const furnishings = createFurnishings(materials);
scene.add(furnishings.root);

const details = createDetails(materials);
scene.add(details);

const floaters = createFloaters(materials);
scene.add(floaters.root);

// Backdrop: star field behind everything.
const starMat = new THREE.MeshBasicMaterial({ map: starTexture(), depthWrite: false });
const backdrop = new THREE.Mesh(new THREE.SphereGeometry(46, 48, 32), starMat);
backdrop.position.set(0, 0, 0);
scene.add(backdrop);

const earthTextures = await loadEarthTextures();
// Globe radius sits just above the window radius so the sphere's limb — the
// curved horizon and its atmosphere — crosses the glass instead of filling it
// with featureless surface. The offset pushes the limb to the upper left.
const globeSpecs = [
  { porthole: PORTHOLE, radius: PORTHOLE.r * 1.55, stencilRef: 1, longitude: 4.262, tilt: 0.16, depth: 3.2, offset: 0.52 },
  { porthole: SMALL_PORTHOLES[0], radius: SMALL_PORTHOLES[0].r * 2.6, stencilRef: 2, longitude: 4.262, tilt: -0.12, depth: 3.2, offset: 0.5 },
  { porthole: SMALL_PORTHOLES[1], radius: SMALL_PORTHOLES[1].r * 2.6, stencilRef: 3, longitude: 4.262, tilt: 0.08, depth: 3.2, offset: 0.5 },
];
for (const spec of globeSpecs) {
  const globe = createGlobe(earthTextures, {
    radius: spec.radius,
    stencilRef: spec.stencilRef,
    longitude: spec.longitude,
    tilt: spec.tilt,
  });
  globe.anchor = spec;
  globes.push(globe);
  scene.add(globe.group);
}

// ---------------------------------------------------------------------------
// Lighting.
// ---------------------------------------------------------------------------
const ambient = new THREE.HemisphereLight(0x2a3a52, 0x0c0f14, 0.55);
scene.add(ambient);

// Warm bounce: sunlight entering the porthole lights the whole cabin in day.
const bounceA = new THREE.PointLight(0xffe7c4, 0, 9, 1.4);
bounceA.position.set(PORTHOLE.x, 1.35, -0.9);
scene.add(bounceA);
const bounceB = new THREE.PointLight(0xffdcb4, 0, 9, 1.4);
bounceB.position.set(0.2, 1.6, -0.2);
scene.add(bounceB);
const bounceC = new THREE.PointLight(0xffe4c8, 0, 10, 1.2);
bounceC.position.set(-1.6, 1.7, 0.4);
scene.add(bounceC);

const sunLight = new THREE.DirectionalLight(0xfff2dc, 3.4);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.left = -6;
sunLight.shadow.camera.right = 6;
sunLight.shadow.camera.top = 6;
sunLight.shadow.camera.bottom = -6;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 30;
sunLight.shadow.bias = -0.00015;
sunLight.shadow.normalBias = 0.008;
scene.add(sunLight);
scene.add(sunLight.target);

const stripLight = new THREE.PointLight(0xffa855, 2.2, 7.5, 2);
stripLight.position.set(0, 0.16, 0);
scene.add(stripLight);

const readingLight = new THREE.PointLight(0xffb870, 1.5, 3.2, 2);
readingLight.position.set(-3.85, 1.5, -1.7);
scene.add(readingLight);

const growLight = new THREE.PointLight(0xff5ccf, 1.0, 2.2, 2);
growLight.position.set(-2.1, 1.6, -1.5);
scene.add(growLight);

const screenLight = new THREE.PointLight(0x74d8ff, 0.9, 2.2, 2);
screenLight.position.set(PORTHOLE.x - 0.15, 0.95, -1.4);
scene.add(screenLight);

// Cool earthshine washing the porthole frame from the night-side planet.
const earthShine = new THREE.PointLight(0x6fb4ff, 0.3, 4.5, 1.6);
const fillLight = new THREE.PointLight(0xdfe6ff, 0.5, 8, 1.6);
fillLight.position.set(0.6, 2.1, 2.2);
scene.add(fillLight);
earthShine.position.set(PORTHOLE.x, PORTHOLE.y, ROOM.wallZ + 0.5);
scene.add(earthShine);

// The sunlight patch is real: the wall casts a shadow and light only reaches
// the floor through the porthole opening. This additive disc marks the sharp
// sunlit spot on the grating.
const sunPatch = new THREE.Mesh(
  new THREE.CircleGeometry(PORTHOLE.r * 0.5, 64),
  new THREE.MeshBasicMaterial({
    color: 0xfff4d8,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }),
);
sunPatch.rotation.x = -Math.PI / 2;
sunPatch.renderOrder = 2;
scene.add(sunPatch);

// ---------------------------------------------------------------------------
// Orbit / day-night state.
// ---------------------------------------------------------------------------
const state = {
  time: 0,
  orbit: 0.16, // 0 = noon through the window, 0.5 = deep night
  speed: 1,
  fastForward: false,
  nightCruise: false,
  growLights: true,
  focusTarget: null,
  penSpin: 0,
  pointer: new THREE.Vector3(0, 1, 0),
};

function sunDirection(orbit) {
  // The Sun sweeps around the station. At orbit 0 it is directly in front of
  // the window (full day); a quarter orbit later it rakes in from the side, and
  // at 0.5 it is behind the Earth (night).
  const angle = orbit * Math.PI * 2;
  return new THREE.Vector3(Math.sin(angle) * 0.78, 0.34, Math.cos(angle) * 0.86).normalize();
}

function updateLighting(dt) {
  const sun = sunDirection(state.orbit);
  const facing = clamp(sun.z, 0, 1);
  const day = smoothstep(0.02, 0.42, facing);
  const sunPower = day;
  // Earth keeps a stable sun for its own shading; the station's shadow phase
  // switches the visible hemisphere to the city-light map.
  const earthSun = new THREE.Vector3(0.42, 0.26, 0.87).normalize();
  const nightMix = smoothstep(0.55, 0.92, 1 - facing);
  for (const globe of globes) {
    globe.setSun(earthSun);
    globe.setNight(nightMix);
  }

  // Sun sits outside the module, behind the rear wall, so its light can only
  // enter through the porthole opening.
  sunLight.position.set(PORTHOLE.x + sun.x * 9, 1.15 + sun.y * 9, ROOM.wallZ - Math.abs(sun.z) * 9);
  sunLight.target.position.set(PORTHOLE.x + sun.x * 2.2, 0.1, 0.9);
  sunLight.intensity = 0.2 + sunPower * 5.2;
  sunLight.color.setHSL(0.09, 0.2, lerp(0.62, 0.9, sunPower));

  ambient.intensity = lerp(0.42, 0.66, day);
  ambient.color.setHSL(0.58, 0.24, lerp(0.24, 0.44, day));

  // Interior bounce follows the sun: the cabin is bright and warm in day and
  // falls back to lamp light at night. It stays below the Earth's brightness so
  // the window keeps the visual weight.
  bounceA.intensity = lerp(0, 7.5, sunPower);
  bounceB.intensity = lerp(0, 5.0, sunPower);
  bounceC.intensity = lerp(0, 3.4, sunPower);

  const stripOn = state.nightCruise ? 0 : 1;
  const stripTarget = stripOn * lerp(0.55, 3.4, 1 - day);
  stripLight.intensity = lerp(stripLight.intensity, stripTarget, 1 - Math.exp(-dt * 4));
  const stripEmissiveTarget = stripOn * lerp(0.9, 2.6, 1 - day);
  materials.stripLight.emissiveIntensity = lerp(
    materials.stripLight.emissiveIntensity,
    stripEmissiveTarget,
    1 - Math.exp(-dt * 4),
  );
  if (stripOn === 0) {
    // Night cruise must read as truly dark: snap the strip fully off instead of
    // leaving an exponential tail glowing.
    materials.stripLight.emissiveIntensity = Math.min(materials.stripLight.emissiveIntensity, 0.06);
    stripLight.intensity = Math.min(stripLight.intensity, 0.05);
  }

  // Earthshine: a cool blue rim on the porthole frame and the desk below it,
  // strongest when the station is on the night side. Kept well under the
  // interior lights so it reads as a rim, not a neon tube.
  earthShine.intensity = lerp(0.12, 0.75, nightMix);
  materials.portholeRim.emissiveIntensity = lerp(0.03, 0.16, nightMix);

  readingLight.intensity = lerp(1.2, 4.2, 1 - day);
  screenLight.intensity = lerp(0.5, 1.15, 1 - day);

  const breathe = 0.82 + Math.sin(state.time * 1.7) * 0.18;
  const growTarget = state.growLights ? 1.5 * breathe : 0;
  growLight.intensity = lerp(growLight.intensity, growTarget, 1 - Math.exp(-dt * 6));
  materials.growLight.emissiveIntensity = lerp(materials.growLight.emissiveIntensity, state.growLights ? 2.2 * breathe : 0.05, 1 - Math.exp(-dt * 6));

  // Sunlight spot on the floor: the beam enters the porthole and lands where
  // the sun direction meets the deck.
  const beamDir = sunLight.target.position.clone().sub(sunLight.position).normalize();
  const aperture = new THREE.Vector3(PORTHOLE.x, PORTHOLE.y, ROOM.wallZ + 0.04);
  const drop = aperture.y;
  const landing = aperture.clone().addScaledVector(beamDir, drop / Math.max(0.16, -beamDir.y));
  landing.y = 0.012;
  sunPatch.position.copy(landing);
  // Foreshortening: the patch is a circle lying on the floor.
  const stretch = 1 / Math.max(0.35, Math.abs(beamDir.y));
  sunPatch.scale.set(1 + (stretch - 1) * 0.5, 1 + (stretch - 1) * 0.16, 1);
  sunPatch.material.opacity = sunPower * (state.nightCruise ? 0 : 0.22);

  // Night keeps a lifted black point so the cabin stays readable instead of
  // crushing to pure black; day is bright enough to feel blown out.
  renderer.toneMappingExposure = lerp(1.16, 1.24, sunPower);
}

// ---------------------------------------------------------------------------
// Interaction: drag to orbit, wheel to zoom, click to focus, drag the Earth to
// scrub orbital time, click the porthole to fast-forward.
// ---------------------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const focusables = [
  { key: "workstation", object: furnishings.work.desk },
  { key: "sleep", object: furnishings.sleep.bag },
  { key: "plants", object: furnishings.plants.rack },
  { key: "seat", object: furnishings.seat.seat },
  { key: "bike", object: furnishings.bike.bike },
  { key: "storage", object: furnishings.storage.group },
];
const penObject = floaters.items[0].object;
const growLightObject = furnishings.plants.glow;
const stripObject = hull.getObjectByName("floorStrip");
const portholeAnchor = new THREE.Vector3(PORTHOLE.x, PORTHOLE.y, ROOM.wallZ);

function setPointer(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
}

function portholeRadiusPx() {
  const a = portholeAnchor.clone().project(camera);
  const b = portholeAnchor.clone().add(new THREE.Vector3(PORTHOLE.r, 0, 0)).project(camera);
  return Math.abs(b.x - a.x) * 0.5 * window.innerWidth;
}

function isOverPorthole(event) {
  const v = portholeAnchor.clone().project(camera);
  const sx = (v.x * 0.5 + 0.5) * window.innerWidth;
  const sy = (-v.y * 0.5 + 0.5) * window.innerHeight;
  return Math.hypot(event.clientX - sx, event.clientY - sy) < portholeRadiusPx() * 0.98;
}

function pickFocus() {
  for (const entry of focusables) {
    const hits = raycaster.intersectObject(entry.object, true);
    if (hits.length) return entry.key;
  }
  return null;
}

function pickPen() {
  const hits = raycaster.intersectObject(penObject, true);
  return hits.length > 0;
}

function pickToggle() {
  if (growLightObject && raycaster.intersectObject(growLightObject, true).length) return "growLights";
  if (stripObject && raycaster.intersectObject(stripObject, true).length) return "nightCruise";
  return null;
}

function focusOn(key) {
  if (!key || !FOCUS[key]) {
    camState.goalAzimuth = VIEW.azimuth;
    camState.goalElevation = VIEW.elevation;
    camState.goalZoom = 1;
    camState.goalTarget.set(...VIEW.target);
    state.focusTarget = null;
  } else {
    const f = FOCUS[key];
    camState.goalAzimuth = f.azimuth;
    camState.goalElevation = f.elevation;
    camState.goalZoom = f.zoom;
    camState.goalTarget.set(...f.target);
    state.focusTarget = key;
  }
  camState.transition = 1;
}

let drag = null;
canvas.addEventListener("pointerdown", (event) => {
  setPointer(event);
  const overPorthole = isOverPorthole(event);
  drag = {
    startX: event.clientX,
    startY: event.clientY,
    lastX: event.clientX,
    lastY: event.clientY,
    moved: 0,
    mode: overPorthole ? "earth" : "orbit",
    startOrbit: state.orbit,
    wasFast: state.fastForward,
  };
  canvas.setPointerCapture(event.pointerId);
  canvas.style.cursor = overPorthole ? "grabbing" : "grabbing";
});

canvas.addEventListener("pointermove", (event) => {
  setPointer(event);
  if (drag) {
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    drag.moved += Math.abs(dx) + Math.abs(dy);
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    if (drag.mode === "earth") {
      // Horizontal scrub through the orbit: a full window width is one orbit.
      const delta = (event.clientX - drag.startX) / Math.max(240, window.innerWidth * 0.34);
      state.orbit = ((drag.startOrbit - delta) % 1 + 1) % 1;
    } else {
      camState.goalAzimuth = clamp(camState.goalAzimuth + dx * 0.11, VIEW.minAzimuth, VIEW.maxAzimuth);
      camState.goalElevation = clamp(camState.goalElevation - dy * 0.075, VIEW.minElevation, VIEW.maxElevation);
      camState.transition = 0;
    }
  } else {
    canvas.style.cursor = isOverPorthole(event) ? "grab" : "default";
  }
  // Pointer position on the focus plane, used by the floating pen.
  const planeNormal = new THREE.Vector3();
  camera.getWorldDirection(planeNormal);
  const denom = raycaster.ray.direction.dot(planeNormal);
  if (Math.abs(denom) > 1e-5) {
    const t = camState.target.clone().sub(raycaster.ray.origin).dot(planeNormal) / denom;
    state.pointer.copy(raycaster.ray.origin).addScaledVector(raycaster.ray.direction, t);
  }
});

canvas.addEventListener("pointerup", (event) => {
  if (drag) {
    setPointer(event);
    const isClick = drag.moved < 7;
    if (isClick) {
      if (drag.mode === "earth") {
        // A click (no drag) toggles the fast-forward cycle.
        state.fastForward = !state.fastForward;
      } else if (pickPen()) {
        state.penSpin = 1;
      } else {
        const toggle = pickToggle();
        if (toggle === "growLights") {
          state.growLights = !state.growLights;
        } else if (toggle === "nightCruise") {
          state.nightCruise = !state.nightCruise;
        } else {
          const key = pickFocus();
          focusOn(key && state.focusTarget === key ? null : key);
        }
      }
    }
    canvas.style.cursor = isOverPorthole(event) ? "grab" : "default";
  }
  drag = null;
});

canvas.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    camState.goalZoom = clamp(camState.goalZoom * (1 - event.deltaY * 0.0012), VIEW.minZoom, VIEW.maxZoom);
    camState.transition = 0;
  },
  { passive: false },
);

// ---------------------------------------------------------------------------
// Animation loop.
// ---------------------------------------------------------------------------
const clock = new THREE.Clock();
const avoidance = { pen: penObject, point: state.pointer, spinBoost: 0 };

function animate() {
  const dt = Math.min(clock.getDelta(), 0.05);
  state.time += dt;

  const cycle = state.fastForward ? ORBIT.fastSeconds : ORBIT.daySeconds;
  state.orbit = (state.orbit + dt / cycle) % 1;

  // Smooth camera easing toward the goal.
  const k = 1 - Math.exp(-dt * (camState.transition ? 5.5 : 9));
  camState.azimuth = lerp(camState.azimuth, camState.goalAzimuth, k);
  camState.elevation = lerp(camState.elevation, camState.goalElevation, k);
  camState.zoom = lerp(camState.zoom, camState.goalZoom, k);
  camState.target.lerp(camState.goalTarget, k);
  if (camState.transition && Math.abs(camState.zoom - camState.goalZoom) < 0.002) camState.transition = 0;
  applyCamera();
  setFrustumScale(camState.zoom);

  updateLighting(dt);
  for (const globe of globes) globe.update(dt, state.orbit);
  floaters.update(state.time, avoidance);
  materials.screenTexture.update(state.time);

  // Clicked pen spins up quickly, then decays back to its slow drift.
  if (state.penSpin > 0.001) {
    avoidance.spinBoost = state.penSpin * 0.09;
    state.penSpin *= Math.exp(-dt * 1.6);
  } else {
    avoidance.spinBoost = 0;
  }

  // Zipper pull sways with the cabin's slow drift.
  if (furnishings.sleep.pull) {
    furnishings.sleep.pull.rotation.z = Math.sin(state.time * 1.15) * 0.22;
    furnishings.sleep.pull.rotation.x = Math.cos(state.time * 0.9) * 0.12;
  }

  // Indicator blinkers.
  furnishings.seat.buttons.forEach((button, i) => {
    const rate = [2.1, 1.3, 3.2][i];
    const phase = [0, 1.7, 3.1][i];
    button.material.emissiveIntensity = Math.sin(state.time * rate + phase) > 0.15 ? 2.4 : 0.25;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  const a = window.innerWidth / window.innerHeight;
  const h = frustum / camState.zoom;
  camera.left = (-h * a) / 2;
  camera.right = (h * a) / 2;
  camera.top = h / 2;
  camera.bottom = -h / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Expose a tiny control surface for evidence capture (not UI).
window.__habitat = {
  state,
  camera,
  renderer,
  scene,
  THREE,
  setOrbit(value) {
    state.orbit = ((value % 1) + 1) % 1;
  },
  setFast(value) {
    state.fastForward = value;
  },
  setNightCruise(value) {
    state.nightCruise = value;
  },
  setGrowLights(value) {
    state.growLights = value;
  },
  focus(key) {
    focusOn(key);
    state.focusTarget = key;
  },
  resetView() {
    focusOn(null);
    state.focusTarget = null;
  },
  setTarget(p) {
    camState.target.set(...p);
    camState.goalTarget.set(...p);
  },
  setZoom(scale) {
    camState.zoom = scale;
    camState.goalZoom = scale;
    setFrustumScale(scale);
  },
};
