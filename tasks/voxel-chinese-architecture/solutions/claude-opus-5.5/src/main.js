import {
  ACESFilmicToneMapping, AmbientLight, BackSide, Color, DirectionalLight, Fog, HemisphereLight, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, PointLight, SRGBColorSpace,
  Scene, ShaderMaterial, SphereGeometry, Timer, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLAZED, GLOW, MATTE } from './palette.js';
import { meshGrid } from './mesher.js';
import { BOUNDS, buildWorld } from './scene.js';

const app = document.getElementById('app');
const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = SRGBColorSpace;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
app.appendChild(renderer.domElement);

const scene = new Scene();
const HORIZON = new Color(0xf2b37a);
scene.fog = new Fog(HORIZON, 260, 620);

// Late-afternoon gradient sky with a soft sun glow.
const SUN_DIR = new Vector3(-0.62, 0.42, 0.66).normalize();
const sky = new Mesh(
  new SphereGeometry(900, 32, 16),
  new ShaderMaterial({
    side: BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top: { value: new Color(0x3d5f94) },
      mid: { value: new Color(0xe7a878) },
      bottom: { value: HORIZON },
      sun: { value: SUN_DIR },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 top, mid, bottom, sun;
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 c = mix(bottom, mid, smoothstep(-0.02, 0.12, h));
        c = mix(c, top, smoothstep(0.12, 0.6, h));
        float s = max(dot(vDir, sun), 0.0);
        c += vec3(1.0, 0.72, 0.42) * (pow(s, 12.0) * 0.45 + pow(s, 400.0) * 2.5);
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  }),
);
sky.frustumCulled = false;
scene.add(sky);

// Lighting: warm low sun with shadows, cool sky fill, faint ambient.
const hemi = new HemisphereLight(0xa9c2e8, 0x6a4a30, 0.85);
scene.add(hemi);
scene.add(new AmbientLight(0xffe2c0, 0.12));
const sun = new DirectionalLight(0xffc98a, 3.1);
const CENTER = new Vector3(0, 10, -4);
sun.position.copy(CENTER).addScaledVector(SUN_DIR, 260);
sun.target.position.copy(CENTER);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
const sc = sun.shadow.camera;
sc.left = -150; sc.right = 150; sc.top = 150; sc.bottom = -150;
sc.near = 60; sc.far = 480;
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.6;
sun.shadow.radius = 2;
scene.add(sun, sun.target);

// Build and mesh the voxel world.
const t0 = performance.now();
const grid = buildWorld();
const tBuild = performance.now() - t0;
const parts = meshGrid(grid, 3);
const tMesh = performance.now() - t0 - tBuild;
const materials = [];
materials[MATTE] = new MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0 });
materials[GLAZED] = new MeshStandardMaterial({ vertexColors: true, roughness: 0.42, metalness: 0.12 });
materials[GLOW] = new MeshBasicMaterial({ vertexColors: true, toneMapped: false });
let faces = 0;
for (let s = 0; s < parts.length; s++) {
  const m = new Mesh(parts[s].geometry, materials[s]);
  m.castShadow = s !== GLOW;
  m.receiveShadow = s !== GLOW;
  scene.add(m);
  faces += parts[s].faces;
}

// A few warm point lights so lanterns spill onto nearby surfaces.
for (const [x, y, z] of [[0, 22, -18], [0, 12, 80], [0, 4, -6]]) {
  const l = new PointLight(0xff9a4a, 60, 40, 2);
  l.position.set(x, y, z);
  scene.add(l);
}

// Camera: opens on a three-quarter aerial view of the whole compound.
const camera = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 1, 2400);
const HOME = { position: new Vector3(96, 120, 232), target: new Vector3(0, 4, -2) };
camera.position.copy(HOME.position);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(HOME.target);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 30;
controls.maxDistance = 520;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = Math.PI * 0.47;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.35;
controls.update();
const stopAuto = () => { controls.autoRotate = false; };
renderer.domElement.addEventListener('pointerdown', stopAuto);
renderer.domElement.addEventListener('wheel', stopAuto, { passive: true });

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
}
window.addEventListener('resize', resize);

const timer = new Timer();
renderer.setAnimationLoop((time) => {
  timer.update(time);
  controls.update(timer.getDelta());
  sky.position.copy(camera.position);
  renderer.render(scene, camera);
});

// Read-only inspection handle for automated review.
window.__SCENE__ = {
  stats: { faces, buildMs: Math.round(tBuild), meshMs: Math.round(tMesh), bounds: BOUNDS },
  view(px, py, pz, tx, ty, tz) {
    controls.autoRotate = false;
    camera.position.set(px, py, pz);
    controls.target.set(tx, ty, tz);
    controls.update();
  },
  home() {
    camera.position.copy(HOME.position);
    controls.target.copy(HOME.target);
    controls.update();
  },
  setAutoRotate(on) { controls.autoRotate = on; },
};
