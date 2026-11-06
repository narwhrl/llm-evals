import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createWorld } from './world.js';
import { createTrainState, advanceTrain, sampleTrack } from './railway.js';
import './style.css';

const element = id => document.getElementById(id);

function start() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.13;
  element('world').appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', 'Willowbrook miniature town. Drag to rotate; scroll to zoom.');
  renderer.domElement.setAttribute('role', 'img');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeae1);
  const camera = new THREE.OrthographicCamera(-15, 15, 10, -10, .1, 150);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = .07;
  controls.enablePan = false;
  controls.minPolarAngle = .25;
  controls.maxPolarAngle = Math.PI / 2.25;
  controls.minZoom = .72;
  controls.maxZoom = 2.8;
  controls.rotateSpeed = .55;
  controls.zoomSpeed = .75;

  const groundMat = new THREE.MeshStandardMaterial({ color: 0xe8e4da, roughness: 1 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), groundMat);
  floor.rotation.x = -Math.PI / 2; floor.position.y = -1.025; floor.receiveShadow = true; scene.add(floor);
  const sky = new THREE.HemisphereLight(0xfff3dc, 0x8d947e, 2.15); scene.add(sky);
  const sun = new THREE.DirectionalLight(0xffe1ac, 3.3);
  sun.position.set(-10, 17, 10); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -17, right: 17, top: 15, bottom: -15, near: .5, far: 65 });
  sun.shadow.normalBias = .035; sun.shadow.bias = -.00015;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xc2d8dc, .55); fill.position.set(10, 9, -8); scene.add(fill);
  const world = createWorld(scene);
  let state = createTrainState();
  let night = false;
  let elapsedMotion = 0;
  let previousTime = null;
  let lastStatus = '';
  const carSpacing = 1.58;
  const dayColor = new THREE.Color(0xeeeae1), nightColor = new THREE.Color(0x253d43);
  const dayGround = new THREE.Color(0xe8e4da), nightGround = new THREE.Color(0x293e43);

  function setNight(value) {
    night = value;
    document.body.classList.toggle('night', night);
    element('day').classList.toggle('active', !night);
    element('night').classList.toggle('active', night);
    element('day').setAttribute('aria-pressed', String(!night));
    element('night').setAttribute('aria-pressed', String(night));
    sky.color.set(night ? 0x9cc4d7 : 0xfff3dc);
    sky.groundColor.set(night ? 0x526c65 : 0x8d947e);
    sky.intensity = night ? 1.15 : 2.15;
    sun.color.set(night ? 0xb1cddd : 0xffe1ac);
    sun.intensity = night ? .72 : 3.3;
    fill.intensity = night ? .65 : .55;
    renderer.toneMappingExposure = night ? 1.3 : 1.13;
    for (const light of world.lights) light.intensity = night ? 1.8 : 0;
    for (const material of world.windowMaterials) material.emissiveIntensity = night ? 1.5 : 0;
  }
  function updateTrain() {
    for (let i = 0; i < world.cars.length; i++) {
      const p = sampleTrack(state.distance - i * carSpacing);
      world.cars[i].position.set(p.x, .113, p.z);
      world.cars[i].rotation.y = -Math.atan2(p.tz, p.tx);
    }
  }
  function updateControls() {
    element('pause-icon').toggleAttribute('hidden', !state.running);
    element('play-icon').toggleAttribute('hidden', state.running);
    element('play').setAttribute('aria-label', state.running ? 'Pause train' : 'Run train');
    element('play').title = `${state.running ? 'Pause' : 'Run'} train (Space)`;
    document.body.classList.toggle('paused', !state.running);
  }
  function resetCamera() {
    controls.enableDamping = false;
    controls.update();
    camera.position.set(19, 19, 24);
    controls.target.set(0, .2, 0);
    camera.zoom = 1; camera.updateProjectionMatrix(); controls.update();
    controls.enableDamping = true;
  }
  function reset() {
    state = createTrainState(); elapsedMotion = 0;
    element('speed').value = '1'; element('speed-value').value = '1×';
    resetCamera(); setNight(false); updateTrain(); updateControls();
  }
  function resize() {
    const width = window.innerWidth, height = window.innerHeight;
    const aspect = width / height;
    const viewHeight = Math.max(18.9, 27.8 / aspect);
    camera.left = -viewHeight * aspect / 2; camera.right = viewHeight * aspect / 2;
    camera.top = viewHeight / 2; camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix(); renderer.setSize(width, height);
  }
  element('play').addEventListener('click', () => { state.running = !state.running; updateControls(); });
  element('speed').addEventListener('input', event => {
    state.speed = Number(event.target.value); element('speed-value').value = `${state.speed}×`;
  });
  element('reset').addEventListener('click', reset);
  element('day').addEventListener('click', () => setNight(false));
  element('night').addEventListener('click', () => setNight(true));
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => { previousTime = null; });
  window.addEventListener('keydown', event => {
    if (event.target.closest('input, button, a, textarea, select')) return;
    if (event.code === 'Space') { event.preventDefault(); element('play').click(); }
    if (event.code === 'KeyR') reset();
  });
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault(); renderer.setAnimationLoop(null);
    element('error').hidden = false;
    element('error').querySelector('strong').textContent = 'The 3D view was interrupted.';
    element('error').querySelector('span').textContent = 'Reload this page to restart your little world.';
  });
  resize(); reset();
  element('loading').hidden = true;

  renderer.setAnimationLoop(timestamp => {
    const delta = previousTime === null ? 0 : (timestamp - previousTime) / 1000;
    previousTime = timestamp;
    advanceTrain(state, delta);
    if (state.running && state.dwellRemaining === 0) elapsedMotion += delta * state.speed;
    updateTrain(); controls.update();
    const status = !state.running ? 'Taking a little pause' : state.dwellRemaining > 0 ? `At Willowbrook · ${state.dwellRemaining.toFixed(1)}s` : 'On the move';
    if (status !== lastStatus) { element('train-status').textContent = status; lastStatus = status; }
    for (let i = 0; i < world.smoke.length; i++) {
      const puff = world.smoke[i]; const age = (elapsedMotion * .7 + i / world.smoke.length) % 1;
      const history = sampleTrack(state.distance - age * 1.1);
      puff.position.set(history.x + history.tx * .4 - age * .25, 1.3 + age * 1.6, history.z + history.tz * .4 - age * .3);
      puff.scale.setScalar(.08 + age * .24);
      puff.material.opacity = (1 - age) * .28;
      puff.visible = state.dwellRemaining === 0;
    }
    world.ripples.position.y = Math.sin(timestamp * .0007) * .004;
    scene.background.lerp(night ? nightColor : dayColor, Math.min(delta * 4, 1));
    groundMat.color.lerp(night ? nightGround : dayGround, Math.min(delta * 4, 1));
    renderer.render(scene, camera);
  });
}

try { start(); }
catch (error) {
  console.error(error);
  element('loading').hidden = true;
  element('error').hidden = false;
}
