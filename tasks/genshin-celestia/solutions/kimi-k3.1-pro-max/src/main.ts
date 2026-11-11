import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createArchitecture } from './architecture';
import { createAtmosphere } from './atmosphere';
import { createVegetation, createWaterfalls } from './nature';
import { createTerrain, outerIslands } from './terrain';
import './style.css';

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.22;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2('#b6d2d8', 0.00073);
const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 1, 4500);
camera.position.set(296, 146, 395);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, -9, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.045;
controls.enablePan = false;
controls.minDistance = 220;
controls.maxDistance = 780;
controls.minPolarAngle = Math.PI * 0.12;
controls.maxPolarAngle = Math.PI * 0.55;
controls.rotateSpeed = 0.35;
controls.zoomSpeed = 0.65;
controls.update();

scene.add(new THREE.HemisphereLight('#d7edfa', '#809399', 1.8));
const sunlight = new THREE.DirectionalLight('#fff1d4', 2.85);
sunlight.position.set(-170, 280, 190);
sunlight.castShadow = true;
sunlight.shadow.mapSize.set(2048, 2048);
sunlight.shadow.camera.left = -205;
sunlight.shadow.camera.right = 205;
sunlight.shadow.camera.top = 205;
sunlight.shadow.camera.bottom = -205;
sunlight.shadow.camera.near = 1;
sunlight.shadow.camera.far = 650;
sunlight.shadow.normalBias = 0.38;
sunlight.shadow.bias = -0.00012;
sunlight.shadow.radius = 3;
scene.add(sunlight);
const fill = new THREE.DirectionalLight('#b7dcef', 0.8);
fill.position.set(180, 60, -180);
scene.add(fill);

createTerrain(scene);
createArchitecture(scene, outerIslands);
createVegetation(scene, outerIslands);
const updateWaterfalls = createWaterfalls(scene, outerIslands);
const updateAtmosphere = createAtmosphere(scene);
batchStaticMeshes(scene);

function batchStaticMeshes(root: THREE.Scene): void {
  root.updateMatrixWorld(true);
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const originals: THREE.Mesh[] = [];
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || object instanceof THREE.InstancedMesh) return;
    if (Array.isArray(object.material) || !(object.material instanceof THREE.MeshStandardMaterial)) return;
    const geometry = object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    const normalized = geometry.index ? geometry.toNonIndexed() : geometry;
    if (!normalized.attributes.uv) normalized.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(normalized.attributes.position.count * 2), 2));
    for (const name of Object.keys(normalized.attributes)) {
      if (!['position', 'normal', 'uv', 'color'].includes(name)) normalized.deleteAttribute(name);
    }
    const material = object.material;
    if (material.vertexColors && !normalized.attributes.color) {
      const colors = new Float32Array(normalized.attributes.position.count * 3).fill(1);
      normalized.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }
    if (!material.vertexColors) normalized.deleteAttribute('color');
    const list = batches.get(material) ?? [];
    list.push(normalized);
    batches.set(material, list);
    originals.push(object);
  });
  for (const original of originals) original.removeFromParent();
  for (const [material, geometries] of batches) {
    const merged = mergeGeometries(geometries, false);
    if (!merged) throw new Error('Unable to batch scene geometry');
    const combined = new THREE.Mesh(merged, material);
    combined.castShadow = true;
    combined.receiveShadow = true;
    scene.add(combined);
    geometries.forEach((geometry) => geometry.dispose());
  }
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
let elapsed = 0;
renderer.setAnimationLoop(() => {
  elapsed += Math.min(clock.getDelta(), 0.05);
  controls.update();
  updateWaterfalls(elapsed);
  updateAtmosphere(elapsed);
  renderer.render(scene, camera);
});

canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  renderer.setAnimationLoop(null);
});
