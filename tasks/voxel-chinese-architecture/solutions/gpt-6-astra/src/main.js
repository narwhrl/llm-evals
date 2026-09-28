import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createWorld } from './world.js';
import { fitCamera } from './framing.js';
import './style.css';

const host = document.querySelector('#canvas-host');
const loading = document.querySelector('#loading');
const status = document.querySelector('#scene-status');
const viewButtons = [...document.querySelectorAll('[data-view]')];
const lightButton = document.querySelector('#light-toggle');
const zoomIn = document.querySelector('#zoom-in');
const zoomOut = document.querySelector('#zoom-out');
const zoomValue = document.querySelector('#zoom-value');
const resetButton = document.querySelector('#reset');

function fail(message, error) {
  console.error(message, error);
  loading.hidden = false;
  loading.classList.add('error');
  loading.setAttribute('role', 'alert');
  loading.textContent = message;
  host.setAttribute('aria-busy', 'false');
  status.textContent = '场景暂不可用';
  for (const button of document.querySelectorAll('button')) button.disabled = true;
}

function addPlaques(world) {
  for (const plaque of world.userData.plaques) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = '#f0cc80';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '68px "STKaiti", "KaiTi", "SimSun", serif';
    context.fillText(plaque.name, 256, 68);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(plaque.plaqueWidth, 1.02),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false }),
    );
    const [x, y, z] = plaque.plaque;
    const angle = plaque.angle ?? 0;
    mesh.position.set(plaque.x + x * Math.cos(angle) + z * Math.sin(angle), y, plaque.z - x * Math.sin(angle) + z * Math.cos(angle));
    mesh.rotation.y = angle;
    world.add(mesh);
  }
}

function start() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
  } catch (error) {
    fail('无法启动 3D 场景。请使用支持 WebGL 2 的浏览器，启用硬件加速后刷新。', error);
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', '栖云古院交互三维场景');
  canvas.setAttribute('aria-describedby', 'scene-description');
  host.prepend(canvas);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f3f1e9');
  const world = createWorld();
  scene.add(world);
  const bounds = new THREE.Box3().setFromObject(world);
  const center = bounds.getCenter(new THREE.Vector3());
  addPlaques(world);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshStandardMaterial({ color: '#eeede2', roughness: 1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = bounds.min.y - 0.06;
  floor.receiveShadow = true;
  scene.add(floor);

  const sky = new THREE.HemisphereLight('#fff5de', '#7c896d', 2.5);
  scene.add(sky);
  const sun = new THREE.DirectionalLight('#fff0cd', 3.2);
  sun.position.set(-45, 75, 50);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -72;
  sun.shadow.camera.right = 72;
  sun.shadow.camera.top = 72;
  sun.shadow.camera.bottom = -72;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 200;
  sun.shadow.bias = -0.00015;
  sun.shadow.normalBias = 0.055;
  sun.shadow.intensity = 0.8;
  scene.add(sun);

  const camera = new THREE.OrthographicCamera(-80, 80, 60, -60, 0.1, 600);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(center);
  controls.enableDamping = false;
  controls.minPolarAngle = 0.04;
  controls.maxPolarAngle = Math.PI / 2.15;
  controls.minZoom = 0.65;
  controls.maxZoom = 4;
  controls.zoomSpeed = 0.75;
  controls.rotateSpeed = 0.65;
  controls.screenSpacePanning = true;
  let requestedFrame = 0;
  let disposed = false;
  let dusk = false;
  let activeView = 'overview';

  function draw() {
    requestedFrame = 0;
    if (disposed || document.hidden || canvas.width === 0 || canvas.height === 0) return;
    renderer.render(scene, camera);
    zoomValue.textContent = `${Math.round(camera.zoom * 100)}%`;
    zoomIn.disabled = camera.zoom >= controls.maxZoom;
    zoomOut.disabled = camera.zoom <= controls.minZoom;
    const compass = document.querySelector('.compass svg');
    compass.style.transform = `rotate(${-THREE.MathUtils.radToDeg(controls.getAzimuthalAngle())}deg)`;
  }

  // Nothing moves by itself: idle scenes consume no continuous animation loop.
  function requestRender() {
    if (!requestedFrame && !disposed) requestedFrame = requestAnimationFrame(draw);
  }

  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    fitCamera(camera, bounds, width / height);
    requestRender();
  }

  function setView(view) {
    activeView = view;
    controls.target.copy(center);
    const positions = { overview: [90, 74, 105], axis: [0, 65, 125], plan: [0, 155, 0.1] };
    camera.position.copy(center).add(new THREE.Vector3(...positions[view]));
    camera.zoom = 1;
    camera.lookAt(center);
    controls.update();
    resize();
    for (const button of viewButtons) button.setAttribute('aria-pressed', String(button.dataset.view === view));
    requestRender();
  }

  function zoom(factor) {
    camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, controls.minZoom, controls.maxZoom);
    camera.updateProjectionMatrix();
    controls.update();
    requestRender();
  }

  function keyboard(event) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === '+' || event.key === '=') zoom(1.2);
    else if (event.key === '-') zoom(1 / 1.2);
    else if (event.key.toLowerCase() === 'r') setView('overview');
    else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      const horizontal = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
      const vertical = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;
      if (event.shiftKey) {
        const shift = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0).multiplyScalar(horizontal * 2);
        shift.addScaledVector(new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1), -vertical * 2);
        camera.position.add(shift);
        controls.target.add(shift);
      } else {
        const spherical = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
        spherical.theta += horizontal * 0.1;
        spherical.phi = THREE.MathUtils.clamp(spherical.phi + vertical * 0.1, controls.minPolarAngle, controls.maxPolarAngle);
        camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
      }
      controls.update();
      for (const button of viewButtons) button.setAttribute('aria-pressed', 'false');
      requestRender();
    } else return;
    event.preventDefault();
  }

  function toggleLight() {
    dusk = !dusk;
    lightButton.setAttribute('aria-pressed', String(dusk));
    document.querySelector('#light-label').textContent = dusk ? '切换晨光' : '切换暮色';
    sky.color.set(dusk ? '#d5ced9' : '#fff5de');
    sky.intensity = dusk ? 1.5 : 2.5;
    sun.color.set(dusk ? '#ffb575' : '#fff0cd');
    sun.intensity = dusk ? 2.4 : 3.2;
    sun.position.set(dusk ? -60 : -45, dusk ? 36 : 75, 50);
    renderer.toneMappingExposure = dusk ? 0.98 : 1.08;
    renderer.shadowMap.needsUpdate = true;
    status.textContent = `${dusk ? '暮色' : '晨光'} · 六座建筑`;
    requestRender();
  }

  controls.addEventListener('change', requestRender);
  controls.addEventListener('start', () => {
    canvas.focus({ preventScroll: true });
    for (const button of viewButtons) button.setAttribute('aria-pressed', 'false');
  });
  canvas.addEventListener('keydown', keyboard);
  for (const button of viewButtons) button.addEventListener('click', () => setView(button.dataset.view));
  zoomIn.addEventListener('click', () => zoom(1.2));
  zoomOut.addEventListener('click', () => zoom(1 / 1.2));
  resetButton.addEventListener('click', () => setView('overview'));
  lightButton.addEventListener('click', toggleLight);
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  document.addEventListener('visibilitychange', requestRender);
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    fail('图形上下文已中断。请关闭其他占用显卡的页面，然后刷新此页恢复场景。', new Error('WebGL context lost'));
  });
  canvas.addEventListener('webglcontextrestored', () => window.location.reload());

  setView(activeView);
  renderer.shadowMap.needsUpdate = true;
  draw();
  loading.hidden = true;
  host.setAttribute('aria-busy', 'false');
  host.dataset.ready = 'true';
  status.textContent = '晨光 · 六座建筑';

  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;
    disposed = true;
    cancelAnimationFrame(requestedFrame);
    observer.disconnect();
    controls.dispose();
    const geometries = new Set();
    const materials = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) materials.add(object.material);
      if (object.isInstancedMesh) object.dispose();
    });
    for (const geometry of geometries) geometry.dispose();
    for (const material of materials) {
      material.map?.dispose();
      material.dispose();
    }
    sun.shadow.dispose();
    renderer.dispose();
  });
}

try {
  start();
} catch (error) {
  fail('场景初始化失败。请刷新页面；若仍失败，请在开发者控制台查看具体错误。', error);
}
