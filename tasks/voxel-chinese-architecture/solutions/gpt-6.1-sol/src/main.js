import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createIcons, Scan, Map, Orbit, Sun } from 'lucide';
import { buildTemple } from './temple.js';

createIcons({ icons: { Scan, Map, Orbit, Sun } });

function start() {
  const host = document.querySelector('#scene');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', '青岚寺三维场景');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#e8efee');
  const camera = new THREE.OrthographicCamera(-80, 80, 50, -50, 0.5, 650);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.minPolarAngle = 0.08;
  controls.maxPolarAngle = Math.PI / 2.12;
  controls.minZoom = 0.6;
  controls.maxZoom = 4;
  controls.autoRotateSpeed = 0.55;
  controls.screenSpacePanning = true;

  scene.add(new THREE.HemisphereLight('#e4f0ed', '#8b926e', 2.4));
  const sun = new THREE.DirectionalLight('#fff1d4', 3.6);
  sun.position.set(-50, 85, 45);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  Object.assign(sun.shadow.camera, { left: -80, right: 80, top: 80, bottom: -80, near: 1, far: 240 });
  sun.shadow.normalBias = 0.08;
  sun.shadow.bias = -0.00015;
  sun.shadow.camera.updateProjectionMatrix();
  scene.add(sun);
  const fill = new THREE.DirectionalLight('#c5e9e5', 1.2);
  fill.position.set(40, 30, -55);
  scene.add(fill);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshStandardMaterial({ color: '#e8efee', roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -3.6;
  ground.receiveShadow = true;
  scene.add(ground);

  const temple = buildTemple();
  scene.add(temple);
  const bounds = new THREE.Box3().setFromObject(temple);
  let topView = false;
  let dusk = false;
  let alive = true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function frame() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    const aspect = width / height;
    const span = Math.max(108, 125 / aspect);
    camera.left = -span * aspect / 2;
    camera.right = span * aspect / 2;
    camera.top = span / 2;
    camera.bottom = -span / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  function setView(top = false) {
    topView = top;
    controls.autoRotate = false;
    document.querySelector('#rotate').setAttribute('aria-pressed', 'false');
    document.querySelector('#top').setAttribute('aria-pressed', String(top));
    controls.target.set(0, 3, -1);
    camera.position.set(top ? 0 : 85, top ? 180 : 100, top ? 0.1 : 130);
    camera.zoom = 1;
    controls.update();
    camera.updateProjectionMatrix();
  }
  function setDusk(value) {
    dusk = value;
    document.body.classList.toggle('dusk', value);
    document.querySelector('#light').setAttribute('aria-pressed', String(value));
    const button = document.querySelector('#light');
    button.title = value ? '切换日光' : '切换暮色';
    button.setAttribute('aria-label', button.title);
    scene.background.set(value ? '#536b70' : '#e8efee');
    ground.material.color.set(value ? '#536b70' : '#e8efee');
    sun.color.set(value ? '#ffb786' : '#fff1d4');
    sun.intensity = value ? 2.5 : 3.6;
    sun.position.set(value ? -65 : -50, value ? 38 : 85, 45);
    renderer.shadowMap.needsUpdate = true;
    fill.intensity = value ? 0.8 : 1.2;
    renderer.toneMappingExposure = value ? 1 : 1.18;
  }
  document.querySelector('#home').addEventListener('click', () => setView());
  document.querySelector('#top').addEventListener('click', () => setView(!topView));
  document.querySelector('#rotate').addEventListener('click', (event) => {
    controls.autoRotate = !controls.autoRotate;
    event.currentTarget.setAttribute('aria-pressed', String(controls.autoRotate));
  });
  document.querySelector('#light').addEventListener('click', () => setDusk(!dusk));
  window.addEventListener('resize', frame);
  renderer.domElement.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    alive = false;
    showError('图形上下文已中断，请刷新页面重新加载场景。');
  });
  frame();
  setView();

  let previous = performance.now();
  let frames = 0;
  let elapsed = 0;
  let fps = 0;
  renderer.setAnimationLoop((now) => {
    if (!alive || document.hidden) return;
    const frameSeconds = (now - previous) / 1000;
    const delta = Math.min(frameSeconds, 0.1);
    previous = now;
    controls.update(delta);
    renderer.render(scene, camera);
    frames++;
    elapsed += frameSeconds;
    if (elapsed >= 1) {
      fps = Math.round(frames / elapsed);
      frames = 0;
      elapsed = 0;
    }
  });
  renderer.render(scene, camera);
  document.querySelector('#loading').classList.add('loaded');
  document.querySelector('#loading').setAttribute('aria-hidden', 'true');

  // Read pixels immediately after rendering; the default WebGL buffer is not preserved.
  window.__temple = {
    stats() {
      renderer.render(scene, camera);
      const gl = renderer.getContext();
      const width = gl.drawingBufferWidth;
      const height = gl.drawingBufferHeight;
      const pixel = new Uint8Array(4);
      const samples = [];
      for (let y = 0.15; y < 0.9; y += 0.15) {
        for (let x = 0.15; x < 0.9; x += 0.15) {
          gl.readPixels(Math.floor(x * width), Math.floor(y * height), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
          samples.push([...pixel]);
        }
      }
      const corners = [];
      for (const x of [bounds.min.x, bounds.max.x]) {
        for (const y of [bounds.min.y, bounds.max.y]) {
          for (const z of [bounds.min.z, bounds.max.z]) corners.push(new THREE.Vector3(x, y, z).project(camera).toArray());
        }
      }
      return {
        ready: true, voxelCount: temple.userData.voxelCount, buildings: temple.userData.buildingCount,
        drawCalls: renderer.info.render.calls, triangles: renderer.info.render.triangles,
        fps, viewport: [host.clientWidth, host.clientHeight], camera: camera.position.toArray(),
        zoom: camera.zoom, topView, dusk, rotating: controls.autoRotate, reducedMotion,
        contextLost: gl.isContextLost(), glError: gl.getError(),
        pixelColors: new Set(samples.map((p) => p.join(','))).size, samples, projectedBounds: corners,
      };
    },
  };
  window.addEventListener('pagehide', () => {
    alive = false;
    renderer.setAnimationLoop(null);
    controls.dispose();
    const geometries = new Set();
    const materials = new Set();
    const textures = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) {
        for (const material of [object.material].flat()) {
          materials.add(material);
          if (material.map) textures.add(material.map);
        }
      }
    });
    for (const texture of textures) texture.dispose();
    for (const material of materials) material.dispose();
    for (const geometry of geometries) geometry.dispose();
    renderer.dispose();
  }, { once: true });
}
function showError(message) {
  const element = document.querySelector('#error');
  element.textContent = message;
  element.hidden = false;
  document.querySelector('#loading').classList.add('loaded');
}
try {
  start();
} catch (error) {
  console.error(error);
  showError('无法初始化三维场景。请使用支持 WebGL 2 的浏览器并开启硬件加速。');
}
