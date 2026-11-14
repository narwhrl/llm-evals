import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

const sceneHost = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#6d7b76');
scene.fog = new THREE.Fog('#6d7b76', 25, 48);

const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, 0.1, 100);
camera.position.set(18, 18, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
sceneHost.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.1, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.minDistance = 12;
controls.maxDistance = 31;
controls.maxPolarAngle = Math.PI * 0.46;

const palette = {
  wood: 0x60432b, woodEdge: 0x3b2a20, grass: 0x78906b, grassLight: 0x97a878,
  roof: 0x594943, brick: 0xb86f53, cream: 0xdcc58f, blue: 0x587b88,
  rail: 0x3a3c3b, sleeper: 0x5a4030, water: 0x4f8993, road: 0x555955,
};
const mats = {
  wood: new THREE.MeshStandardMaterial({ color: palette.wood, roughness: .82 }),
  woodEdge: new THREE.MeshStandardMaterial({ color: palette.woodEdge, roughness: .78 }),
  grass: new THREE.MeshStandardMaterial({ color: palette.grass, roughness: 1 }),
  grassLight: new THREE.MeshStandardMaterial({ color: palette.grassLight, roughness: 1 }),
  rail: new THREE.MeshStandardMaterial({ color: palette.rail, metalness: .7, roughness: .32 }),
  sleeper: new THREE.MeshStandardMaterial({ color: palette.sleeper, roughness: .9 }),
  road: new THREE.MeshStandardMaterial({ color: palette.road, roughness: .95 }),
  water: new THREE.MeshStandardMaterial({ color: palette.water, roughness: .18, metalness: .12, transparent: true, opacity: .86 }),
  bridge: new THREE.MeshStandardMaterial({ color: 0x857d6c, roughness: .9 }),
};

function addMesh(geometry, material, position, parent = scene) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

// Thick wooden presentation base and layered terrain.
addMesh(new THREE.BoxGeometry(25, 1.15, 19), mats.wood, [0, -.75, 0]);
addMesh(new THREE.BoxGeometry(24.2, .28, 18.2), mats.grass, [0, -.1, 0]);
for (const [x, z, sx, sz] of [[0,-9.25,25,.25],[0,9.25,25,.25],[-12.25,0,.25,19],[12.25,0,.25,19]]) addMesh(new THREE.BoxGeometry(sx,.55,sz), mats.woodEdge, [x,-.1,z]);

// River, banks and a small footpath.
addMesh(new THREE.PlaneGeometry(22, 3.25), mats.water, [0, .05, 0]).rotation.x = -Math.PI / 2;
for (const z of [-1.88, 1.88]) addMesh(new THREE.BoxGeometry(21.5, .13, .28), mats.grassLight, [0, .11, z]);
const riverSparkle = new THREE.Group();
for (let i = 0; i < 16; i++) {
  const dash = addMesh(new THREE.BoxGeometry(.55 + (i % 3) * .2, .015, .035), new THREE.MeshBasicMaterial({ color: 0xa1d0c4, transparent: true, opacity: .45 }), [-10 + i * 1.25, .13, -.55 + (i % 4) * .38], riverSparkle);
  dash.rotation.y = -.08;
}
scene.add(riverSparkle);

const trackPoints = [
  new THREE.Vector3(-8, .3, -5.45), new THREE.Vector3(-3.2, .3, -6.2), new THREE.Vector3(4.9, .3, -6.2),
  new THREE.Vector3(8.15, .3, -3.7), new THREE.Vector3(8.15, .3, 3.7), new THREE.Vector3(5.15, .3, 6.15),
  new THREE.Vector3(-3.8, .3, 6.15), new THREE.Vector3(-8.1, .3, 4), new THREE.Vector3(-8.8, .3, -.4),
];
const trackCurve = new THREE.CatmullRomCurve3(trackPoints, true, 'catmullrom', .12);
const curveSamples = 220;
const railCurves = [];
const sampled = [];
for (let i = 0; i <= curveSamples; i++) {
  const t = i / curveSamples;
  const p = trackCurve.getPointAt(t);
  const tangent = trackCurve.getTangentAt(t).normalize();
  const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
  sampled.push({ p, tangent, side });
}
for (const offset of [-.24, .24]) {
  railCurves.push(new THREE.CatmullRomCurve3(sampled.map(({ p, side }) => p.clone().addScaledVector(side, offset)), true, 'catmullrom', .12));
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(railCurves.at(-1), curveSamples, .065, 6, true), mats.rail));
}
for (let i = 0; i < curveSamples; i += 8) {
  const { p, tangent } = sampled[i];
  const sleeper = addMesh(new THREE.BoxGeometry(.78, .09, .28), mats.sleeper, [p.x, .27, p.z]);
  sleeper.rotation.y = Math.atan2(tangent.x, tangent.z);
}

// Bridge over the river with visible piers.
addMesh(new THREE.BoxGeometry(1.25, .35, 5.55), mats.bridge, [8.15, .49, 0]);
for (const z of [-1.65, 1.65]) {
  for (const x of [7.73, 8.57]) addMesh(new THREE.BoxGeometry(.32, 1.25, .45), mats.bridge, [x, -.18, z]);
}
for (const z of [-2.55, 2.55]) addMesh(new THREE.BoxGeometry(1.7, .18, .18), mats.woodEdge, [8.15, .73, z]);

function addRoad(x, z, width, depth, rotation = 0) {
  const road = addMesh(new THREE.BoxGeometry(width, .025, depth), mats.road, [x, .075, z]);
  road.rotation.y = rotation;
  const line = addMesh(new THREE.BoxGeometry(width * .76, .012, .035), new THREE.MeshBasicMaterial({ color: 0xb9a97f, transparent: true, opacity: .6 }), [x, .1, z]);
  line.rotation.y = rotation;
}
addRoad(-3.4, -4.0, 8, .72, -.02);
addRoad(-3.35, -2.55, .7, 3.4, 0);
addRoad(2.5, 2.75, 9.6, .58, .02);
addRoad(0.3, 1.05, .55, 5.3, .04);

const windowMats = [];
function makeBuilding({ x, z, w = 1.6, d = 1.35, h = 1.25, color = palette.cream, roof = palette.roof, tower = false }) {
  const group = new THREE.Group();
  group.position.set(x, .1, z);
  const wallMat = new THREE.MeshStandardMaterial({ color, roughness: .88 });
  const roofMat = new THREE.MeshStandardMaterial({ color: roof, roughness: .8 });
  addMesh(new THREE.BoxGeometry(w, h, d), wallMat, [0, h / 2, 0], group);
  const roofMesh = addMesh(new THREE.ConeGeometry(Math.max(w, d) * .72, .62, 4), roofMat, [0, h + .3, 0], group);
  roofMesh.rotation.y = Math.PI / 4;
  for (const side of [-1, 1]) {
    const win = addMesh(new THREE.BoxGeometry(.3, .34, .025), new THREE.MeshStandardMaterial({ color: 0xd9b870, emissive: 0x2f2412, emissiveIntensity: .15 }), [side * w * .27, h * .61, d / 2 + .014], group);
    windowMats.push(win.material);
  }
  if (tower) {
    addMesh(new THREE.CylinderGeometry(.26, .31, 1.25, 8), wallMat, [0, h + .8, 0], group);
    addMesh(new THREE.ConeGeometry(.4, .48, 8), roofMat, [0, h + 1.66, 0], group);
  }
  scene.add(group);
  return group;
}

// Station beside the lower straight with a canopy and clock tower.
const station = makeBuilding({ x: -5.9, z: -4.25, w: 2.45, d: 1.25, h: 1.35, color: 0xd6b77e, roof: 0x6b463e, tower: true });
const canopy = addMesh(new THREE.BoxGeometry(2.9, .12, 1.12), new THREE.MeshStandardMaterial({ color: 0x4a5e58, roughness: .75 }), [-5.9, 1.43, -3.25]);
for (const x of [-7.1, -4.7]) addMesh(new THREE.CylinderGeometry(.045, .055, 1.35, 8), mats.woodEdge, [x, .78, -3.28]);
addMesh(new THREE.BoxGeometry(2.9, .08, .35), new THREE.MeshStandardMaterial({ color: 0xd8c6a0, roughness: .8 }), [-5.9, .26, -3.3]);

makeBuilding({ x: -2.75, z: -2.35, w: 1.45, d: 1.35, h: 1.15, color: 0xb87859, roof: 0x4a4843 });
makeBuilding({ x: -.55, z: -2.35, w: 1.6, d: 1.35, h: 1.4, color: 0xd9c38f, roof: 0x5f4d4a });
makeBuilding({ x: 2.25, z: 3.25, w: 1.8, d: 1.45, h: 1.42, color: 0xc48763, roof: 0x4e5050 });
makeBuilding({ x: 4.7, z: 3.35, w: 1.45, d: 1.2, h: 1.08, color: 0x9ea87e, roof: 0x555050 });
makeBuilding({ x: -3.7, z: 3.2, w: 1.55, d: 1.3, h: 1.2, color: 0xd0a56e, roof: 0x705045 });

// Trees provide scale and soften the town edges.
function addTree(x, z, scale = 1) {
  const g = new THREE.Group(); g.position.set(x, .08, z); g.scale.setScalar(scale);
  addMesh(new THREE.CylinderGeometry(.09, .13, .72, 7), new THREE.MeshStandardMaterial({ color: 0x60442b, roughness: 1 }), [0, .38, 0], g);
  const foliage = new THREE.Mesh(new THREE.IcosahedronGeometry(.52, 1), new THREE.MeshStandardMaterial({ color: 0x496746, roughness: 1 }));
  foliage.position.y = .9; foliage.castShadow = true; g.add(foliage);
  scene.add(g);
}
for (const tree of [[-9,-6.8,1.1],[-7.8,6.8,1.05],[-5.6,7.15,.8],[-1.1,7.2,.85],[6.4,6.7,1], [6.5,-5.7,.9],[3.8,-5.1,.74],[-9,2.2,.82],[8.9,2.5,.8]]) addTree(...tree);

const lampLights = [];
function addStreetLamp(x, z) {
  addMesh(new THREE.CylinderGeometry(.035, .05, .85, 8), mats.woodEdge, [x, .52, z]);
  addMesh(new THREE.SphereGeometry(.105, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffd78b, emissive: 0xffad3c, emissiveIntensity: .8 }), [x, .98, z]);
  const light = new THREE.PointLight(0xffc970, .45, 3.2, 2); light.position.set(x, 1.04, z); light.castShadow = true; scene.add(light); lampLights.push(light);
}
for (const p of [[-4.1,-3.3],[-2.1,-3.3],[-.2,-3.3],[.4,1.75],[2.6,2.1]]) addStreetLamp(...p);
const stationLight = new THREE.PointLight(0xffbf63, .7, 5, 2); stationLight.position.set(-5.9, 2, -3.1); scene.add(stationLight);

// Moving train: engine and cars have independent progress along the loop.
const trainParts = [];
function makeTrainPart(type, color) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(type === 'engine' ? .78 : .68, .46, type === 'engine' ? 1.22 : 1.05), new THREE.MeshStandardMaterial({ color, roughness: .65, metalness: .12 }));
  body.position.y = .72; body.castShadow = true; g.add(body);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(type === 'engine' ? .86 : .74, .12, type === 'engine' ? 1.08 : .92), new THREE.MeshStandardMaterial({ color: 0x363a39, roughness: .6 }));
  roof.position.y = 1.02; roof.castShadow = true; g.add(roof);
  if (type === 'engine') {
    const chimney = new THREE.Mesh(new THREE.CylinderGeometry(.11, .14, .3, 8), new THREE.MeshStandardMaterial({ color: 0x343432, roughness: .55 })); chimney.position.set(0, 1.22, .2); chimney.castShadow = true; g.add(chimney);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffd681, emissive: 0xffb32e, emissiveIntensity: 1.7 })); lamp.position.set(0, .85, -.67); g.add(lamp);
  }
  for (const z of [-.32, .32]) for (const x of [-.31, .31]) { const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .07, 12), mats.rail); wheel.rotation.z = Math.PI / 2; wheel.position.set(x, .42, z); g.add(wheel); }
  scene.add(g); trainParts.push(g); return g;
}
makeTrainPart('engine', 0xb95742);
makeTrainPart('car', 0x3e7780);
makeTrainPart('car', 0xc48d4f);

const totalLength = trackCurve.getLength();
let progress = .075;
let running = true;
let speed = 1;
let isNight = false;
let stationHold = 0;
let stationGate = false;
const stationT = .055;
const stationNotice = document.querySelector('#stationNotice');
function placeTrainPart(part, t) {
  const p = trackCurve.getPointAt((t + 1) % 1);
  const tangent = trackCurve.getTangentAt((t + 1) % 1).normalize();
  part.position.set(p.x, .1, p.z);
  part.rotation.y = Math.atan2(tangent.x, tangent.z);
}
function updateTrain(delta) {
  if (running) {
    if (stationHold > 0) stationHold = Math.max(0, stationHold - delta);
    else {
      progress = (progress + (delta * .018 * speed)) % 1;
      const distanceFromStation = Math.min(Math.abs(progress - stationT), 1 - Math.abs(progress - stationT));
      if (distanceFromStation < .006 && !stationGate) {
        stationHold = 2;
        stationGate = true;
        stationNotice.classList.add('visible');
        setTimeout(() => stationNotice.classList.remove('visible'), 2200);
      }
      if (distanceFromStation > .045) stationGate = false;
    }
  }
  placeTrainPart(trainParts[0], progress);
  placeTrainPart(trainParts[1], progress - .043);
  placeTrainPart(trainParts[2], progress - .086);
}

const sun = new THREE.DirectionalLight(0xffd6a0, 2.35); sun.position.set(-9, 18, 7); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.left = -16; sun.shadow.camera.right = 16; sun.shadow.camera.top = 16; sun.shadow.camera.bottom = -16; scene.add(sun);
const fill = new THREE.HemisphereLight(0xe5ead2, 0x43524b, 1.15); scene.add(fill);

function setNight(value) {
  isNight = value;
  scene.background.set(value ? '#17232b' : '#6d7b76');
  scene.fog.color.set(value ? '#17232b' : '#6d7b76');
  sun.intensity = value ? .62 : 2.35;
  fill.intensity = value ? .68 : 1.15;
  sun.color.set(value ? '#9ab3d1' : '#ffd6a0');
  for (const mat of windowMats) { mat.emissive.set(value ? 0xe8973c : 0x2f2412); mat.emissiveIntensity = value ? 1.25 : .15; }
  stationLight.intensity = value ? 1.45 : .7;
  lampLights.forEach((light) => { light.intensity = value ? 1.25 : .0; });
  document.querySelector('#timeToggle').textContent = value ? '切换白天' : '切换夜晚';
}
setNight(false);

document.querySelector('#runToggle').addEventListener('click', (event) => { running = !running; event.currentTarget.textContent = running ? '暂停列车' : '继续列车'; });
document.querySelector('#speed').addEventListener('input', (event) => { speed = Number(event.target.value); document.querySelector('#speedValue').textContent = `${speed.toFixed(1)}×`; });
document.querySelector('#timeToggle').addEventListener('click', () => setNight(!isNight));
document.querySelector('#reset').addEventListener('click', () => { progress = .075; speed = 1; stationHold = 0; stationGate = false; running = true; controls.reset(); document.querySelector('#speed').value = '1'; document.querySelector('#speedValue').textContent = '1.0×'; document.querySelector('#runToggle').textContent = '暂停列车'; setNight(false); });

let lastTime = performance.now();
function animate(now) {
  const delta = Math.min((now - lastTime) / 1000, .05); lastTime = now;
  updateTrain(delta); controls.update(); renderer.render(scene, camera); requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
