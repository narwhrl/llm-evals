import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './styles.css';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#8fc7ee');
scene.fog = new THREE.FogExp2('#8fc7ee', 0.0105);

const camera = new THREE.PerspectiveCamera(43, innerWidth / innerHeight, 0.1, 220);
camera.position.set(35, 20, 39);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.querySelector('#app')!.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2.9, 0);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.04;
controls.minDistance = 18;
controls.maxDistance = 58;
controls.minPolarAngle = 0.48;
controls.maxPolarAngle = 1.47;

const ivory = new THREE.MeshStandardMaterial({ color: '#f4f0df', roughness: 0.66, metalness: 0.03, flatShading: true });
const ivorySmooth = new THREE.MeshStandardMaterial({ color: '#fffaf0', roughness: 0.4, metalness: 0.05 });
const gold = new THREE.MeshStandardMaterial({ color: '#e8b64d', emissive: '#9b6216', emissiveIntensity: 0.22, roughness: 0.3, metalness: 0.78 });
const green = new THREE.MeshStandardMaterial({ color: '#4d9a63', roughness: 1, flatShading: true });
const deepGreen = new THREE.MeshStandardMaterial({ color: '#286049', roughness: 1, flatShading: true });
const rock = new THREE.MeshStandardMaterial({ color: '#566c72', roughness: 0.96, flatShading: true });
const rockLight = new THREE.MeshStandardMaterial({ color: '#74878a', roughness: 0.95, flatShading: true });
const cloudMaterial = new THREE.MeshStandardMaterial({ color: '#f4fbff', transparent: true, opacity: 0.72, roughness: 1, depthWrite: false });

scene.add(new THREE.HemisphereLight('#d9efff', '#31526c', 2.0));
const sun = new THREE.DirectionalLight('#fff0bf', 4.0);
sun.position.set(-18, 31, 18);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -35; sun.shadow.camera.right = 35; sun.shadow.camera.top = 35; sun.shadow.camera.bottom = -35;
scene.add(sun);
const rim = new THREE.DirectionalLight('#78bced', 1.5);
rim.position.set(22, 10, -28);
scene.add(rim);

function rockGeometry(radius: number, height: number, seed: number): THREE.BufferGeometry {
  const sides = 18;
  const levels = [0, -height * 0.22, -height * 0.58, -height];
  const radii = [radius, radius * 1.12, radius * 0.76, radius * 0.12];
  const positions: number[] = [];
  const noise = (i: number, level: number) => 0.9 + 0.16 * Math.sin(i * 2.17 + seed + level * 1.7) + 0.06 * Math.cos(i * 4.4 + seed);
  for (let level = 0; level < levels.length; level++) {
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2;
      const r = radii[level] * noise(i, level);
      positions.push(Math.cos(a) * r, levels[level], Math.sin(a) * r);
    }
  }
  const indices: number[] = [];
  for (let level = 0; level < levels.length - 1; level++) {
    for (let i = 0; i < sides; i++) {
      const n = (i + 1) % sides, a = level * sides + i, b = level * sides + n, c = (level + 1) * sides + n, d = (level + 1) * sides + i;
      indices.push(a, b, d, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function addRockIsland(parent: THREE.Object3D, radius: number, height: number, seed: number, y = 0): THREE.Group {
  const group = new THREE.Group();
  group.position.y = y;
  const underside = new THREE.Mesh(rockGeometry(radius, height, seed), rock);
  underside.castShadow = true; underside.receiveShadow = true;
  group.add(underside);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.94, radius * 0.88, 0.32, 18), green);
  top.position.y = 0.14; top.scale.z = 0.97; top.receiveShadow = true;
  group.add(top);
  parent.add(group);
  return group;
}

function addTree(parent: THREE.Object3D, x: number, z: number, scale = 1): void {
  const tree = new THREE.Group();
  tree.position.set(x, 0.45, z); tree.scale.setScalar(scale);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.18, 1.25, 7), new THREE.MeshStandardMaterial({ color: '#705238', roughness: 1 }));
  trunk.position.y = 0.6; trunk.castShadow = true; tree.add(trunk);
  const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.66, 1), deepGreen);
  crown.position.y = 1.3; crown.castShadow = true; tree.add(crown);
  parent.add(tree);
}

function addSpire(parent: THREE.Object3D, x: number, z: number, scale = 1): void {
  const g = new THREE.Group(); g.position.set(x, 0.3, z); g.scale.setScalar(scale);
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.26, 1.6, 8), ivory); shaft.position.y = 0.8; shaft.castShadow = true; g.add(shaft);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.95, 8), ivorySmooth); roof.position.y = 2.0; roof.castShadow = true; g.add(roof);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.5, 6), gold); tip.position.y = 2.7; g.add(tip);
  parent.add(g);
}

function addWaterfall(parent: THREE.Object3D, x: number, z: number, length: number, scale = 1): void {
  const mat = new THREE.MeshBasicMaterial({ color: '#a9e8ff', transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false });
  const ribbon = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * scale, 0.46 * scale, length, 8, 1, true), mat);
  ribbon.position.set(x, -length / 2 - 0.2, z);
  ribbon.rotation.z = (x % 2 ? 0.08 : -0.08);
  parent.add(ribbon);
  const mist = new THREE.Mesh(new THREE.SphereGeometry(0.35 * scale, 10, 8), new THREE.MeshBasicMaterial({ color: '#e3fbff', transparent: true, opacity: 0.28, depthWrite: false }));
  mist.position.set(x, -length - 0.25, z); parent.add(mist);
}

function addArchBridge(parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, width = 0.42): void {
  const mid = a.clone().add(b).multiplyScalar(0.5); mid.y += 1.25;
  const curve = new THREE.CatmullRomCurve3([a, mid, b]);
  const bridge = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, width, 8, false), ivorySmooth);
  bridge.castShadow = true; bridge.receiveShadow = true; parent.add(bridge);
  const rail = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, width * 0.24, 6, false), gold);
  rail.position.y += 0.27; parent.add(rail);
}

const celestia = new THREE.Group();
scene.add(celestia);
const mainIsland = addRockIsland(celestia, 9.1, 10.8, 2.2, -0.2);
mainIsland.rotation.y = 0.12;

// Green terraces, ancient ruins and trees on the main island.
const terrace = new THREE.Mesh(new THREE.TorusGeometry(5.9, 0.18, 7, 36), ivory);
terrace.rotation.x = Math.PI / 2; terrace.position.y = 0.42; terrace.scale.z = 0.82; terrace.castShadow = true; mainIsland.add(terrace);
addTree(mainIsland, -3.8, -1.9, 1.15); addTree(mainIsland, -2.9, 1.3, 0.86); addTree(mainIsland, 3.1, 1.4, 0.92); addTree(mainIsland, 4.1, -1.1, 0.72);
addSpire(mainIsland, -4.7, 1.3, 0.65); addSpire(mainIsland, 4.5, 1.3, 0.55);
addWaterfall(mainIsland, -6.2, -1.0, 4.8, 1.0); addWaterfall(mainIsland, 6.1, 1.4, 5.4, 0.8);

// Concentric ring road and the seven outer islets.
const road = new THREE.Mesh(new THREE.TorusGeometry(14.2, 0.22, 8, 96), ivorySmooth);
road.rotation.x = Math.PI / 2; road.position.y = -0.08; road.scale.z = 0.94; road.castShadow = true; celestia.add(road);
const ringRadius = 20.4;
const islets: THREE.Vector3[] = [];
for (let i = 0; i < 8; i++) {
  const angle = (i / 8) * Math.PI * 2 + 0.16;
  const r = 2.5 + (i % 3) * 0.38;
  const pos = new THREE.Vector3(Math.cos(angle) * ringRadius, -0.9 + Math.sin(i * 1.7) * 0.5, Math.sin(angle) * ringRadius * 0.86);
  islets.push(pos.clone());
  const island = addRockIsland(celestia, r, 4.1 + (i % 2) * 1.2, i * 2.7 + 5, pos.y);
  island.position.x = pos.x; island.position.z = pos.z; island.rotation.y = angle;
  addSpire(island, 0, 0, 0.48 + (i % 2) * 0.1);
  if (i % 2 === 0) addTree(island, -0.7, 0.3, 0.65);
  if (i === 1 || i === 5) addWaterfall(island, r * 0.55, 0.2, 3.2, 0.65);
}
for (let i = 0; i < islets.length; i++) {
  const a = islets[i].clone().setY(-0.05), b = islets[(i + 1) % islets.length].clone().setY(-0.08);
  addArchBridge(celestia, a, b, 0.32);
  if (i % 2 === 0) addArchBridge(celestia, new THREE.Vector3(0, 0.1, 0), a, 0.28);
}

// Sacred central sanctum: stacked tiers, arcades, pointed roofs and gold filigree.
const sanctum = new THREE.Group(); sanctum.position.y = 0.48; celestia.add(sanctum);
let tierY = 0;
const tiers = [
  [4.4, 0.75], [3.7, 1.0], [3.0, 1.1], [2.45, 1.2], [1.86, 1.35]
] as const;
tiers.forEach(([radius, height], idx) => {
  const base = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 1.05, height, 12), idx === 0 ? ivory : ivorySmooth);
  base.position.y = tierY + height / 2; base.castShadow = true; base.receiveShadow = true; sanctum.add(base);
  const trim = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.94, 0.09, 6, 36), gold); trim.rotation.x = Math.PI / 2; trim.position.y = tierY + height + 0.04; sanctum.add(trim);
  if (idx > 0) {
    const roof = new THREE.Mesh(new THREE.ConeGeometry(radius * 0.98, 0.68, 12), ivorySmooth); roof.position.y = tierY + height + 0.34; roof.castShadow = true; sanctum.add(roof);
  }
  tierY += height + (idx === 0 ? 0.18 : 0.28);
});
for (let i = 0; i < 12; i++) {
  const a = (i / 12) * Math.PI * 2;
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 1.65, 8), ivorySmooth);
  p.position.set(Math.cos(a) * 3.42, 1.57, Math.sin(a) * 3.42); p.castShadow = true; sanctum.add(p);
  const capital = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), gold); capital.position.set(Math.cos(a) * 3.42, 2.4, Math.sin(a) * 3.42); sanctum.add(capital);
}
const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.42, 7.2, 10), ivorySmooth); shaft.position.y = 7.0; shaft.castShadow = true; sanctum.add(shaft);
for (let i = 0; i < 8; i++) {
  const a = (i / 8) * Math.PI * 2 + 0.2;
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 4.6, 7), ivory);
  col.position.set(Math.cos(a) * 1.42, 6.9, Math.sin(a) * 1.42); col.castShadow = true; sanctum.add(col);
}
const spireRoof = new THREE.Mesh(new THREE.ConeGeometry(1.65, 3.4, 10), ivorySmooth); spireRoof.position.y = 12.25; spireRoof.castShadow = true; sanctum.add(spireRoof);
const spireTip = new THREE.Mesh(new THREE.ConeGeometry(0.19, 2.5, 8), gold); spireTip.position.y = 15.1; sanctum.add(spireTip);

const armillary = new THREE.Group(); armillary.position.y = 16.2; sanctum.add(armillary);
const ringA = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.16, 12, 72), gold); ringA.rotation.x = 0.58; ringA.rotation.y = 0.18; armillary.add(ringA);
const ringB = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.16, 12, 72), gold); ringB.rotation.y = 1.12; ringB.rotation.z = 0.22; armillary.add(ringB);
const ringC = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.16, 12, 72), gold); ringC.rotation.x = 1.52; ringC.rotation.z = 0.72; armillary.add(ringC);
const ringD = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.1, 10, 64), gold); ringD.rotation.x = 0.9; ringD.rotation.y = 0.6; armillary.add(ringD);
const star = new THREE.Mesh(new THREE.IcosahedronGeometry(0.58, 2), new THREE.MeshStandardMaterial({ color: '#fff1a7', emissive: '#ffd23e', emissiveIntensity: 2.5, roughness: 0.25 })); armillary.add(star);
const glow = new THREE.PointLight('#ffd66b', 8, 15, 2); armillary.add(glow);

// Floating debris and a broken ruin in the foreground.
for (let i = 0; i < 18; i++) {
  const a = i * 2.37, rad = 10 + (i % 5) * 2.5;
  const shard = new THREE.Mesh(new THREE.TetrahedronGeometry(0.28 + (i % 4) * 0.12), i % 3 ? rock : rockLight);
  shard.position.set(Math.cos(a) * rad, -2.4 - (i % 4) * 1.5, Math.sin(a) * rad * 0.72); shard.rotation.set(a, a * 0.6, a * 0.3); shard.castShadow = true; celestia.add(shard);
}
const ruin = new THREE.Group(); ruin.position.set(-11, 0.2, 3.4); celestia.add(ruin);
for (let i = 0; i < 4; i++) {
  const c = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 2.6 + i * 0.3, 7), ivory); c.position.set((i - 1.5) * 0.8, 1.3, (i % 2) * 0.4); c.rotation.z = i % 2 ? 0.08 : -0.04; c.castShadow = true; ruin.add(c);
}
const broken = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.2, 7, 16, Math.PI * 1.15), ivory); broken.rotation.x = Math.PI / 2; broken.position.y = 2.65; broken.rotation.z = -0.3; ruin.add(broken);

// Cloud sea and a distant hint of Teyvat under the clouds.
const cloudSea = new THREE.Group(); scene.add(cloudSea);
for (let i = 0; i < 76; i++) {
  const a = i * 1.91, rad = 17 + (i % 11) * 3.6;
  const puff = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 7), cloudMaterial);
  puff.position.set(Math.cos(a) * rad, -10.5 + Math.sin(i * 1.31) * 1.1, Math.sin(a) * rad * 0.54 - 8);
  const s = 1.3 + (i % 5) * 0.42; puff.scale.set(s * 1.8, s * 0.48, s); cloudSea.add(puff);
}
const continentShape = new THREE.Shape();
continentShape.moveTo(-17, -3); continentShape.bezierCurveTo(-11, -7, -6, -2, -2, -5); continentShape.bezierCurveTo(4, -8, 11, -5, 18, -2); continentShape.lineTo(17, -8); continentShape.lineTo(-18, -8); continentShape.closePath();
const continent = new THREE.Mesh(new THREE.ShapeGeometry(continentShape), new THREE.MeshBasicMaterial({ color: '#426f81', transparent: true, opacity: 0.42, depthWrite: false }));
continent.rotation.x = -Math.PI / 2; continent.position.set(0, -13.5, -17); continent.scale.set(1.3, 1.1, 1); scene.add(continent);

// Gold atmospheric beams add the sacred high-altitude glow.
for (let i = 0; i < 5; i++) {
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 3.7, 26, 20, 1, true), new THREE.MeshBasicMaterial({ color: '#fff2bd', transparent: true, opacity: 0.045, depthWrite: false, side: THREE.DoubleSide }));
  beam.position.set(-14 + i * 7.2, 3, -18 - (i % 2) * 5); beam.rotation.z = (i - 2) * 0.08; scene.add(beam);
}

function animate(): void {
  requestAnimationFrame(animate);
  armillary.rotation.y += 0.0024;
  ringA.rotation.z += 0.0012; ringB.rotation.x -= 0.0015; ringC.rotation.y += 0.001;
  cloudSea.position.x = Math.sin(performance.now() * 0.00004) * 0.35;
  controls.update();
  renderer.render(scene, camera);
}
animate();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
