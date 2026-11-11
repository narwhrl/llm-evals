import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./styles.css";
import { createWorld } from "./world.js";

const INITIAL_CAMERA = new THREE.Vector3(25.9, 28, 32.9);
const INITIAL_TARGET = new THREE.Vector3(1, -3, 1.5);
const MIN_SPEED = 0.5;
const MAX_SPEED = 2;
const DEFAULT_SPEED = 1;

const DUSK_LIGHT = {
  sun: new THREE.Color("#ffd2a0"),
  sky: new THREE.Color("#dfe7e9"),
  ground: new THREE.Color("#7e6a50"),
  fill: new THREE.Color("#cbd6d8"),
};

const NIGHT_LIGHT = {
  sun: new THREE.Color("#aec6e0"),
  sky: new THREE.Color("#7189a7"),
  ground: new THREE.Color("#253336"),
  fill: new THREE.Color("#536d88"),
};

const canvas = document.querySelector("#scene");
const loadingScreen = document.querySelector("#loading-screen");
const loadingLabel = loadingScreen.querySelector("p");
const playToggle = document.querySelector("#play-toggle");
const speedInput = document.querySelector("#speed");
const speedValue = document.querySelector("#speed-value");
const resetButton = document.querySelector("#reset");
const lightingToggle = document.querySelector("#lighting-toggle");
const lightingLabel = document.querySelector("#lighting-label");
const serviceStatus = document.querySelector("#service-status");
const serviceLabel = document.querySelector("#service-label");

function showFatalError(error) {
  const message = error instanceof Error ? error.message : String(error);
  loadingScreen.classList.remove("is-hidden");
  loadingScreen.classList.add("is-error");
  loadingLabel.textContent = "Willow Creek could not open";
  let details = loadingScreen.querySelector("small");
  if (!details) {
    details = document.createElement("small");
    loadingScreen.appendChild(details);
  }
  details.textContent = `WebGL or scene initialization failed: ${message}`;
  console.error("Willow Creek failed to initialize:", error);
}

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    32,
    window.innerWidth / window.innerHeight,
    0.1,
    120,
  );
  camera.position.copy(INITIAL_CAMERA);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.setClearColor(0x000000, 0);

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(INITIAL_TARGET);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.enablePan = false;
  controls.minDistance = 21;
  controls.maxDistance = 62;
  controls.minPolarAngle = THREE.MathUtils.degToRad(12);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(84);
  controls.rotateSpeed = 0.62;
  controls.zoomSpeed = 0.75;
  controls.update();
  controls.saveState();

  const sun = new THREE.DirectionalLight(DUSK_LIGHT.sun, 3.4);
  sun.position.set(-14, 25, 14);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -19;
  sun.shadow.camera.right = 19;
  sun.shadow.camera.top = 17;
  sun.shadow.camera.bottom = -17;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 65;
  sun.shadow.bias = -0.00025;
  sun.shadow.normalBias = 0.022;
  scene.add(sun);
  scene.add(sun.target);

  const skyLight = new THREE.HemisphereLight(
    DUSK_LIGHT.sky,
    DUSK_LIGHT.ground,
    1.55,
  );
  scene.add(skyLight);

  const fill = new THREE.DirectionalLight(DUSK_LIGHT.fill, 0.42);
  fill.position.set(13, 8, -15);
  scene.add(fill);

  const world = createWorld(scene, renderer);

  let paused = false;
  let speed = DEFAULT_SPEED;
  let theme = "dusk";
  let nightAmount = 0;
  let nightTarget = 0;
  let elapsed = 0;
  let statusKey = "";
  let ready = false;

  const duskExposure = 1.08;
  const nightExposure = 1.16;

  function updateNightLighting(amount) {
    sun.color.lerpColors(DUSK_LIGHT.sun, NIGHT_LIGHT.sun, amount);
    sun.intensity = THREE.MathUtils.lerp(3.4, 1.15, amount);
    skyLight.color.lerpColors(DUSK_LIGHT.sky, NIGHT_LIGHT.sky, amount);
    skyLight.groundColor.lerpColors(
      DUSK_LIGHT.ground,
      NIGHT_LIGHT.ground,
      amount,
    );
    skyLight.intensity = THREE.MathUtils.lerp(1.55, 0.72, amount);
    fill.color.lerpColors(DUSK_LIGHT.fill, NIGHT_LIGHT.fill, amount);
    fill.intensity = THREE.MathUtils.lerp(0.42, 0.34, amount);
    renderer.toneMappingExposure = THREE.MathUtils.lerp(
      duskExposure,
      nightExposure,
      amount,
    );
  }

  function updatePlaybackUi() {
    playToggle.classList.toggle("is-paused", paused);
    playToggle.setAttribute("aria-pressed", String(paused));
    playToggle.setAttribute(
      "aria-label",
      paused ? "Resume train" : "Pause train",
    );
  }

  function updateSpeedUi() {
    speedInput.value = String(speed);
    speedValue.value = `${speed.toFixed(1)}×`;
    speedValue.textContent = `${speed.toFixed(1)}×`;
  }

  function updateThemeUi() {
    const isNight = theme === "night";
    document.body.dataset.theme = theme;
    lightingToggle.setAttribute("aria-pressed", String(isNight));
    lightingToggle.setAttribute(
      "aria-label",
      isNight ? "Switch to dusk lighting" : "Switch to night lighting",
    );
    lightingLabel.textContent = isNight ? "Night" : "Dusk";
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", isNight ? "#172527" : "#d5c7b2");
    canvas.setAttribute(
      "aria-label",
      `Interactive three-dimensional model of a railway town at ${theme}`,
    );
  }

  function updateServiceStatus() {
    const train = world.train;
    const key = paused
      ? train.isDwelling
        ? "paused-station"
        : "paused"
      : train.isDwelling
        ? "station"
        : "running";
    if (key === statusKey) return;
    statusKey = key;
    serviceStatus.classList.toggle("is-dwelling", train.isDwelling);
    serviceStatus.classList.toggle("is-paused", paused);
    serviceLabel.textContent =
      key === "paused-station"
        ? "Paused at Willow Creek"
        : key === "paused"
          ? "Service paused"
          : key === "station"
            ? "At Willow Creek station"
            : "Departing Willow Creek";
  }

  function setPaused(value) {
    paused = Boolean(value);
    updatePlaybackUi();
    updateServiceStatus();
  }

  function setSpeed(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    speed = THREE.MathUtils.clamp(parsed, MIN_SPEED, MAX_SPEED);
    updateSpeedUi();
  }

  function setTheme(value) {
    const next = value === "night" ? "night" : "dusk";
    if (theme === next) return;
    theme = next;
    nightTarget = theme === "night" ? 1 : 0;
    updateThemeUi();
  }

  function resetCamera() {
    const damping = controls.enableDamping;
    controls.enableDamping = false;
    controls.reset();
    camera.position.copy(INITIAL_CAMERA);
    controls.target.copy(INITIAL_TARGET);
    controls.update();
    controls.enableDamping = damping;
  }

  function reset() {
    setPaused(false);
    setSpeed(DEFAULT_SPEED);
    resetCamera();
    setTheme("dusk");
    world.train.reset();
    updateServiceStatus();
  }

  function getState() {
    const train = world.train;
    const vehicles = train.vehicles.map((vehicle, index) => {
      const position = new THREE.Vector3();
      const direction = new THREE.Vector3(0, 0, 1);
      vehicle.getWorldPosition(position);
      direction.applyQuaternion(vehicle.getWorldQuaternion(new THREE.Quaternion()));
      return {
        index,
        position: position.toArray(),
        heading: direction.toArray(),
        yaw: Math.atan2(direction.x, direction.z),
      };
    });
    return {
      ready,
      paused,
      speed,
      theme,
      nightAmount,
      distance: train.distance,
      dwellRemaining: train.dwellRemaining,
      isDwelling: train.isDwelling,
      stationDistance: train.stationDistance,
      trackLength: train.trackLength,
      camera: {
        position: camera.position.toArray(),
        target: controls.target.toArray(),
        distance: camera.position.distanceTo(controls.target),
      },
      train: {
        distance: train.distance,
        dwellRemaining: train.dwellRemaining,
        isDwelling: train.isDwelling,
        stationDistance: train.stationDistance,
        trackLength: train.trackLength,
        vehicles,
      },
      vehicles,
    };
  }

  playToggle.addEventListener("click", () => setPaused(!paused));
  speedInput.addEventListener("input", () => setSpeed(speedInput.value));
  resetButton.addEventListener("click", reset);
  lightingToggle.addEventListener("click", () =>
    setTheme(theme === "night" ? "dusk" : "night"),
  );

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  });

  window.__diorama = {
    getState,
    reset,
    setPaused,
    setSpeed,
    setTheme,
  };

  updateSpeedUi();
  updateThemeUi();
  updatePlaybackUi();
  updateServiceStatus();

  const clock = new THREE.Clock();
  function frame() {
    const delta = Math.min(clock.getDelta(), 0.05);
    elapsed += delta;
    controls.update();
    nightAmount = THREE.MathUtils.damp(nightAmount, nightTarget, 3.5, delta);
    if (Math.abs(nightAmount - nightTarget) < 0.0005) {
      nightAmount = nightTarget;
    }
    world.setNight(nightAmount);
    updateNightLighting(nightAmount);
    world.train.update(delta, speed, paused);
    world.update(elapsed);
    updateServiceStatus();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  renderer.render(scene, camera);
  ready = true;
  requestAnimationFrame(() => {
    loadingScreen.classList.add("is-hidden");
    requestAnimationFrame(frame);
  });
}

try {
  init();
} catch (error) {
  showFatalError(error);
}
