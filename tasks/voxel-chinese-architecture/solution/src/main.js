import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildChineseVoxelScene } from './voxel/scene.js';

// Setup Canvas and Renderer
const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
container.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera (Elevated Isometric Overview framing the entire complex upon load)
const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
const defaultCamPos = new THREE.Vector3(95, 78, -115);
const defaultTarget = new THREE.Vector3(0, 12, 0);
camera.position.copy(defaultCamPos);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.copy(defaultTarget);
controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below ground
controls.minDistance = 15;
controls.maxDistance = 350;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.4;

// Build Voxel Complex
const { group: voxelGroup, stats, pointLights } = buildChineseVoxelScene();
scene.add(voxelGroup);

// Update HUD Stats
const hudStatsEl = document.getElementById('hud-stats');
if (hudStatsEl) {
  hudStatsEl.innerHTML = `
    <span>总计体素: ${stats.totalVoxels.toLocaleString()}</span>
    <span>渲染实例: ${stats.renderedVoxels.toLocaleString()}</span>
    <span>剔除率: ${stats.cullEfficiency}</span>
    <span id="fps-counter">FPS: 60</span>
  `;
}

// Lighting Setup
const hemiLight = new THREE.HemisphereLight(0xd0e0f5, 0x5c4228, 0.85);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffd99b, 2.2);
dirLight.position.set(70, 65, -70);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 10;
dirLight.shadow.camera.far = 400;
dirLight.shadow.camera.left = -110;
dirLight.shadow.camera.right = 110;
dirLight.shadow.camera.top = 110;
dirLight.shadow.camera.bottom = -110;
dirLight.shadow.bias = -0.0004;
scene.add(dirLight);

// Sky Background & Fog
const fog = new THREE.Fog(0xd8c8b8, 130, 420);
scene.fog = fog;
scene.background = new THREE.Color(0xd8c8b8);

// Lighting Presets Config
const LIGHT_PRESETS = {
  dawn: {
    dirColor: 0xffd99b,
    dirIntensity: 2.2,
    dirPos: [70, 65, -70],
    hemiSky: 0xd0e0f5,
    hemiGround: 0x5c4228,
    hemiIntensity: 0.85,
    bg: 0xd8c8b8,
    fogNear: 130,
    fogFar: 420,
    exposure: 1.1,
    lanternMult: 1.0,
  },
  noon: {
    dirColor: 0xffffff,
    dirIntensity: 2.6,
    dirPos: [45, 120, -35],
    hemiSky: 0xb5daf5,
    hemiGround: 0x485244,
    hemiIntensity: 1.0,
    bg: 0x8ab8d8,
    fogNear: 150,
    fogFar: 460,
    exposure: 1.0,
    lanternMult: 0.6,
  },
  dusk: {
    dirColor: 0xff6628,
    dirIntensity: 2.5,
    dirPos: [-90, 36, -30],
    hemiSky: 0x8f557d,
    hemiGround: 0x3d2018,
    hemiIntensity: 0.65,
    bg: 0x542b3b,
    fogNear: 110,
    fogFar: 390,
    exposure: 1.18,
    lanternMult: 1.8,
  },
  night: {
    dirColor: 0x6e94db,
    dirIntensity: 0.85,
    dirPos: [-50, 80, 50],
    hemiSky: 0x16203a,
    hemiGround: 0x0a0e18,
    hemiIntensity: 0.45,
    bg: 0x0c111e,
    fogNear: 90,
    fogFar: 360,
    exposure: 1.3,
    lanternMult: 3.0,
  },
};

function applyLighting(presetKey) {
  const p = LIGHT_PRESETS[presetKey];
  if (!p) return;

  dirLight.color.setHex(p.dirColor);
  dirLight.intensity = p.dirIntensity;
  dirLight.position.set(...p.dirPos);

  hemiLight.color.setHex(p.hemiSky);
  hemiLight.groundColor.setHex(p.hemiGround);
  hemiLight.intensity = p.hemiIntensity;

  scene.background.setHex(p.bg);
  fog.color.setHex(p.bg);
  fog.near = p.fogNear;
  fog.far = p.fogFar;

  renderer.toneMappingExposure = p.exposure;

  // Modulate point lights
  for (const pl of pointLights) {
    pl.intensity = pl.userData.baseIntensity
      ? pl.userData.baseIntensity * p.lanternMult
      : (pl.userData.baseIntensity = pl.intensity) * p.lanternMult;
  }
}

// Camera View Presets
const CAMERA_PRESETS = {
  panorama: {
    pos: [95, 78, -115],
    target: [0, 12, 0],
  },
  gate: {
    pos: [0, 22, -90],
    target: [0, 8, -55],
  },
  courtyard: {
    pos: [0, 28, -35],
    target: [0, 10, 0],
  },
  mainhall: {
    pos: [0, 32, -8],
    target: [0, 18, 30],
  },
  pagoda: {
    pos: [72, 48, 26],
    target: [40, 26, 60],
  },
  towers: {
    pos: [-52, 28, -55],
    target: [-15, 14, -26],
  },
  bell: {
    pos: [-55, 26, -50],
    target: [-32, 14, -26],
  },
  drum: {
    pos: [55, 26, -50],
    target: [32, 14, -26],
  },
  westwing: {
    pos: [-24, 22, 25],
    target: [-44, 8, 25],
  },
  eastwing: {
    pos: [24, 22, 25],
    target: [44, 8, 25],
  },
};

// Smooth Camera Transition State
let isTransitioning = false;
let transitionProgress = 0;
const transitionStartPos = new THREE.Vector3();
const transitionEndPos = new THREE.Vector3();
const transitionStartTarget = new THREE.Vector3();
const transitionEndTarget = new THREE.Vector3();

function transitionToView(presetKey) {
  const preset = CAMERA_PRESETS[presetKey];
  if (!preset) return;

  transitionStartPos.copy(camera.position);
  transitionEndPos.set(...preset.pos);

  transitionStartTarget.copy(controls.target);
  transitionEndTarget.set(...preset.target);

  transitionProgress = 0;
  isTransitioning = true;
}

// UI Event Handlers
document.querySelectorAll('#view-controls .btn[data-view]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#view-controls .btn[data-view]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    transitionToView(btn.dataset.view);
  });
});

document.querySelectorAll('#light-controls .btn[data-light]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#light-controls .btn[data-light]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyLighting(btn.dataset.light);
  });
});

document.querySelectorAll('.legend-item[data-focus]').forEach(item => {
  item.addEventListener('click', () => {
    transitionToView(item.dataset.focus);
  });
});

// Auto-rotate Toggle
const autoRotateBtn = document.getElementById('btn-autorotate');
if (autoRotateBtn) {
  autoRotateBtn.addEventListener('click', () => {
    controls.autoRotate = !controls.autoRotate;
    autoRotateBtn.textContent = `旋转: ${controls.autoRotate ? '开' : '关'}`;
    autoRotateBtn.classList.toggle('active', controls.autoRotate);
  });
}

// Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// FPS Calculation and Animation Loop
let lastTime = performance.now();
let frames = 0;
let lastFpsUpdate = lastTime;
const fpsEl = document.getElementById('fps-counter');

function animate(now) {
  requestAnimationFrame(animate);

  // Smooth Camera Transition
  if (isTransitioning) {
    transitionProgress += 0.035;
    if (transitionProgress >= 1) {
      transitionProgress = 1;
      isTransitioning = false;
    }
    // Smooth step easing
    const t = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
    camera.position.lerpVectors(transitionStartPos, transitionEndPos, t);
    controls.target.lerpVectors(transitionStartTarget, transitionEndTarget, t);
  }

  controls.update();
  renderer.render(scene, camera);

  // FPS calculation
  frames++;
  if (now - lastFpsUpdate >= 1000) {
    if (fpsEl) {
      fpsEl.textContent = `FPS: ${Math.round((frames * 1000) / (now - lastFpsUpdate))}`;
    }
    frames = 0;
    lastFpsUpdate = now;
  }
}

requestAnimationFrame(animate);
