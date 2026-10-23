import * as THREE from 'three';
import {
  basic,
  beam,
  box,
  cylinder,
  emissive,
  instanced,
  materials,
  plane,
  sphere,
  toon,
  tube,
  unitBox,
} from './lib.js';
import {
  glowTexture,
  posterTexture,
  reflectionTexture,
  textTexture,
  textureMaterial,
  vendingHeaderTexture,
} from './textures.js';

function buildBase(group) {
  box(group, [30, 1.08, 30], [0, -0.63, 0], materials.base);
  box(group, [29.72, 0.22, 29.72], [0, -1.25, 0], materials.baseTrim);
  box(group, [30.08, 0.15, 30.08], [0, -0.055, 0], materials.baseTrim);
  box(group, [23.05, 0.18, 23.1], [-3.2, 0.105, -3.2], materials.sidewalk);

  // Two non-overlapping road meshes meet at the corner without z-fighting.
  box(group, [23.25, 0.14, 6.45], [-3.2, 0.075, 11.65], materials.asphalt, false);
  box(group, [6.45, 0.14, 29.7], [11.65, 0.075, 0], materials.asphalt, false);
  box(group, [23.2, 0.26, 0.24], [-3.25, 0.21, 8.35], materials.curb);
  box(group, [0.24, 0.26, 22.95], [8.35, 0.21, -3.15], materials.curb);

  // Sidewalk expansion joints are actual line geometry, not a flat texture.
  const joints = [];
  for (let x = -14.3; x < 8.1; x += 1.45) joints.push(x, 0.202, -14.55, x, 0.202, 8.1);
  for (let z = -14.5; z < 8.1; z += 1.45) joints.push(-14.55, 0.202, z, 8.15, 0.202, z);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(joints, 3));
  group.add(new THREE.LineSegments(geometry, materials.grout));

  // Rear service lane and the narrow alley remain readable from reverse views.
  box(group, [21.9, 0.035, 3.25], [-3.45, 0.22, -12.65], materials.alley, false);
  box(group, [1.83, 0.04, 9.0], [4.27, 0.225, -3.25], materials.alley, false);
  for (let i = 0; i < 7; i += 1) {
    box(group, [1.55, 0.025, 0.055], [4.27, 0.252, -7.0 + i * 1.18], materials.metal, false);
  }

  // Small rear storage annex gives the square base a compact, layered silhouette.
  box(group, [7.4, 3.25, 2.75], [-6.7, 1.85, -11.55], materials.wallDark);
  box(group, [7.7, 0.22, 3.0], [-6.7, 3.56, -11.55], materials.navy);
  box(group, [2.65, 2.35, 0.09], [-7.6, 1.52, -10.135], materials.metal);
  for (let i = 0; i < 12; i += 1) {
    box(group, [2.58, 0.035, 0.04], [-7.6, 0.48 + i * 0.18, -10.075], materials.darkMetal, false);
  }
  const storageSign = textureMaterial(textTexture('AOI 資材置場', 'DELIVERIES  ·  6–10 AM', {
    background: '#aeb9ad', color: '#3e5358', accent: '#d58d64',
  }));
  plane(group, [3.25, 0.65], [-5.2, 2.95, -10.11], storageSign, [0, 0, 0]);
}

function buildRoadMarkings(group) {
  // Reflective zebra crossings on both legs of the corner.
  for (let i = 0; i < 7; i += 1) {
    box(group, [3.05, 0.025, 0.48], [5.75, 0.16, 8.95 + i * 0.76], materials.roadPaint, false);
  }
  for (let i = 0; i < 7; i += 1) {
    box(group, [0.48, 0.025, 2.85], [8.95 + i * 0.76, 0.16, 3.85], materials.roadPaint, false);
  }
  box(group, [0.18, 0.025, 5.5], [8.0, 0.16, 11.65], materials.roadPaint, false);
  box(group, [5.45, 0.025, 0.18], [11.65, 0.16, 7.75], materials.roadPaint, false);
  for (let x = -13; x < 2.5; x += 3.0) {
    box(group, [1.45, 0.02, 0.1], [x, 0.155, 11.65], materials.roadPaint, false);
  }
  for (let z = -13; z < 0.5; z += 3.0) {
    box(group, [0.1, 0.02, 1.45], [11.65, 0.155, z], materials.roadPaint, false);
  }

  // Two compact parking bays, wheel stops, and a physical parking sign.
  [-9.6, -5.25].forEach((x) => {
    box(group, [0.09, 0.025, 4.15], [x - 1.9, 0.225, 5.65], materials.roadPaint, false);
    box(group, [0.09, 0.025, 4.15], [x + 1.9, 0.225, 5.65], materials.roadPaint, false);
    box(group, [3.88, 0.025, 0.09], [x, 0.225, 7.7], materials.roadPaint, false);
    box(group, [1.85, 0.22, 0.25], [x, 0.34, 3.88], materials.curb);
    box(group, [0.28, 0.24, 0.27], [x - 0.65, 0.35, 3.88], materials.yellow, false);
    box(group, [0.28, 0.24, 0.27], [x + 0.65, 0.35, 3.88], materials.yellow, false);
  });
  cylinder(group, 0.055, 2.75, [-12.75, 1.63, 5.45], materials.metal, 12);
  const parking = textureMaterial(textTexture('P', '2台  ·  30分以内', {
    background: '#417ca0', color: '#f0efdb', accent: '#70a9ba',
  }));
  box(group, [1.05, 1.12, 0.09], [-12.75, 3.0, 5.45], materials.navy);
  plane(group, [0.94, 1.0], [-12.75, 3.0, 5.501], parking, [0, 0, 0]);

  const manhole = cylinder(group, 0.67, 0.035, [-2.3, 0.165, 11.15], materials.darkMetal, 32);
  manhole.receiveShadow = true;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.025, 6, 32), materials.metal);
  ring.position.set(-2.3, 0.19, 11.15);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);
  for (let i = 0; i < 5; i += 1) {
    box(group, [0.75, 0.018, 0.04], [-2.3, 0.19, 10.85 + i * 0.15], materials.metal, false);
  }
}

function buildDrainage(group) {
  const grates = [];
  const slots = [];
  for (let x = -13.2; x <= 7.0; x += 2.0) {
    grates.push({ p: [x, 0.225, 8.05], s: [1.25, 0.055, 0.32] });
    for (let i = 0; i < 7; i += 1) slots.push({ p: [x - 0.48 + i * 0.16, 0.258, 8.05], s: [0.055, 0.02, 0.27] });
  }
  for (let z = -13.0; z <= 6.0; z += 2.0) {
    grates.push({ p: [8.08, 0.225, z], s: [0.32, 0.055, 1.25] });
    for (let i = 0; i < 7; i += 1) slots.push({ p: [8.08, 0.258, z - 0.48 + i * 0.16], s: [0.27, 0.02, 0.055] });
  }
  instanced(group, unitBox, materials.darkMetal, grates);
  instanced(group, unitBox, materials.metal, slots);
}

function buildVendingMachine(group) {
  const vending = new THREE.Group();
  vending.position.set(-12.55, 0.22, 0.15);
  group.add(vending);
  box(vending, [1.48, 2.95, 0.88], [0, 1.48, 0], materials.white);
  box(vending, [1.32, 0.44, 0.06], [0, 2.67, 0.47], emissive(0xddeed9, 0.75));
  plane(vending, [1.24, 0.35], [0, 2.67, 0.505], textureMaterial(vendingHeaderTexture()), [0, 0, 0]);
  box(vending, [1.17, 1.38, 0.08], [-0.04, 1.72, 0.47], materials.darkMetal);
  box(vending, [1.04, 1.19, 0.035], [-0.04, 1.74, 0.52], emissive(0x8fb5b0, 0.32), false);
  const canColors = [materials.orange, materials.mint, materials.yellow, materials.red];
  for (let row = 0; row < 3; row += 1) {
    box(vending, [1.06, 0.045, 0.17], [-0.04, 1.28 + row * 0.42, 0.57], materials.white, false);
    for (let column = 0; column < 5; column += 1) {
      cylinder(vending, 0.067, 0.22, [-0.46 + column * 0.21, 1.43 + row * 0.42, 0.59], canColors[(row + column) % 4], 10);
      box(vending, [0.13, 0.04, 0.025], [-0.46 + column * 0.21, 1.25 + row * 0.42, 0.675], materials.paper, false);
    }
  }
  box(vending, [1.12, 1.18, 0.035], [-0.04, 1.73, 0.685], materials.fridgeGlass, false).castShadow = false;
  box(vending, [0.28, 0.55, 0.08], [0.46, 0.78, 0.49], materials.darkMetal);
  box(vending, [0.7, 0.28, 0.09], [-0.22, 0.36, 0.49], materials.rubber);
  box(vending, [0.53, 0.07, 0.05], [-0.22, 0.35, 0.56], materials.metal, false);
  for (let i = 0; i < 3; i += 1) {
    cylinder(vending, 0.045, 0.025, [0.47, 1.22 + i * 0.18, 0.55], emissive(0x86c6ae, 0.7), 10).rotation.x = Math.PI / 2;
  }
  const light = new THREE.PointLight(0xa7d9c4, 9, 4, 2);
  light.position.set(0, 1.8, 1.1);
  vending.add(light);
}

function buildBicycle(group) {
  const bike = new THREE.Group();
  bike.position.set(-2.3, 0.19, 2.85);
  bike.rotation.y = -0.22;
  group.add(bike);
  const frameMaterial = toon(0x6fa9a2);
  const wheelMaterial = materials.rubber;
  [-0.72, 0.72].forEach((x) => {
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.055, 8, 28), wheelMaterial);
    tire.position.set(x, 0.62, 0);
    bike.add(tire);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.018, 6, 28), materials.metal);
    rim.position.copy(tire.position);
    bike.add(rim);
    const points = [];
    for (let i = 0; i < 12; i += 1) {
      const angle = (i / 12) * Math.PI * 2;
      points.push(x, 0.62, 0, x + Math.cos(angle) * 0.44, 0.62 + Math.sin(angle) * 0.44, 0);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    bike.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0x829098 })));
  });
  const rear = [-0.72, 0.62, 0];
  const front = [0.72, 0.62, 0];
  const pedal = [-0.02, 0.65, 0];
  const seat = [-0.28, 1.28, 0];
  const head = [0.42, 1.3, 0];
  [[rear, pedal], [pedal, seat], [seat, rear], [seat, head], [head, pedal], [head, front]].forEach(([a, b]) => beam(bike, a, b, 0.035, frameMaterial, 8));
  beam(bike, [-0.28, 1.2, 0], [-0.3, 1.47, 0], 0.028, materials.metal, 8);
  box(bike, [0.36, 0.07, 0.18], [-0.34, 1.48, 0], materials.rubber);
  beam(bike, [0.42, 1.25, 0], [0.46, 1.59, 0], 0.03, materials.metal, 8);
  beam(bike, [0.46, 1.58, -0.25], [0.46, 1.58, 0.25], 0.025, materials.darkMetal, 8);
  beam(bike, [-0.02, 0.65, -0.22], [-0.02, 0.65, 0.22], 0.025, materials.metal, 8);
  box(bike, [0.42, 0.36, 0.4], [0.79, 1.33, 0], materials.wallDark);
  box(bike, [0.36, 0.26, 0.34], [0.79, 1.38, 0], materials.alley, false);
  beam(bike, [-0.1, 0.64, 0.05], [-0.32, 0.08, 0.28], 0.025, materials.darkMetal, 8);
}

function buildUmbrellasAndBins(group) {
  cylinder(group, 0.34, 0.58, [2.88, 0.53, 1.75], materials.metal, 16, true);
  const umbrellaColors = [materials.navy, materials.orange, materials.mintDark];
  for (let i = 0; i < 3; i += 1) {
    const x = 2.72 + i * 0.16;
    const z = 1.73 + (i % 2) * 0.12;
    beam(group, [x, 0.55, z], [x + 0.08, 1.85 + i * 0.09, z], 0.018, materials.metal, 8);
    const folded = new THREE.Mesh(new THREE.ConeGeometry(0.105, 0.95, 8), umbrellaColors[i]);
    folded.position.set(x + 0.04, 1.17, z);
    folded.rotation.z = -0.06;
    group.add(folded);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.018, 6, 12, Math.PI), materials.darkMetal);
    handle.position.set(x + 0.14, 1.88 + i * 0.09, z);
    handle.rotation.z = Math.PI / 2;
    group.add(handle);
  }
  [-12.9, -11.85].forEach((x, index) => {
    box(group, [0.88, 1.15, 0.78], [x, 0.82, 2.55], index ? materials.mintDark : materials.wallDark);
    box(group, [0.94, 0.13, 0.84], [x, 1.45, 2.55], materials.darkMetal);
    box(group, [0.54, 0.15, 0.04], [x, 1.23, 2.96], materials.rubber, false);
    const label = textureMaterial(textTexture(index ? 'びん・缶' : '燃えるごみ', '分別にご協力ください', {
      background: '#d8ddc9', color: '#415f60', accent: '#7ba18f',
    }));
    plane(group, [0.69, 0.34], [x, 0.82, 2.956], label, [0, 0, 0]);
  });
}

function buildNeighborAndAlley(group) {
  // A shuttered service building forms the other wall of the narrow alley.
  box(group, [2.3, 5.45, 5.6], [6.4, 2.94, -4.7], toon(0x606b7b));
  box(group, [2.55, 0.25, 5.85], [6.4, 5.78, -4.7], materials.navy);
  box(group, [1.75, 2.65, 0.09], [6.4, 1.65, -1.855], materials.darkMetal);
  for (let i = 0; i < 14; i += 1) {
    box(group, [1.68, 0.035, 0.04], [6.4, 0.43 + i * 0.18, -1.79], materials.metal, false);
  }
  const sign = textureMaterial(textTexture('青井町', 'AOI  ·  3-CHOME', {
    background: '#c0c6b7', color: '#485b60', accent: '#d58f67',
  }));
  plane(group, [1.76, 0.65], [6.4, 3.55, -1.82], sign, [0, 0, 0]);
  box(group, [1.25, 1.25, 0.06], [6.4, 4.55, -1.82], materials.glass, false);
  box(group, [0.07, 1.3, 0.09], [6.4, 4.55, -1.77], materials.darkMetal);
  box(group, [1.3, 0.07, 0.09], [6.4, 4.55, -1.77], materials.darkMetal);

  // Outdoor condenser, fan grille, electrical meters and exposed conduit.
  box(group, [0.68, 1.12, 1.58], [3.68, 1.0, -5.2], materials.metal);
  const fan = cylinder(group, 0.48, 0.055, [4.045, 1.02, -5.2], materials.darkMetal, 24);
  fan.rotation.z = Math.PI / 2;
  for (let i = 0; i < 6; i += 1) {
    beam(group, [4.085, 0.62 + i * 0.15, -5.56], [4.085, 0.62 + i * 0.15, -4.84], 0.012, materials.metal, 6);
  }
  tube(group, [[3.55, 1.5, -5.75], [3.48, 2.1, -6.1], [3.43, 3.5, -6.1]], 0.035, materials.metal, 12);
  box(group, [0.22, 0.62, 0.48], [5.16, 2.3, -3.0], materials.darkMetal);
  cylinder(group, 0.15, 0.05, [5.02, 2.38, -3.0], materials.glass, 20).rotation.z = Math.PI / 2;
  tube(group, [[5.1, 2.6, -3.0], [5.08, 4.5, -3.0], [5.08, 4.5, -6.5]], 0.025, materials.darkMetal, 12);

  const notice = new THREE.Group();
  notice.position.set(5.9, 0.2, 0.15);
  group.add(notice);
  box(notice, [1.75, 1.65, 0.14], [0, 1.45, 0], materials.wood);
  box(notice, [1.5, 1.4, 0.05], [0, 1.45, 0.1], materials.paper, false);
  plane(notice, [0.57, 0.78], [-0.38, 1.52, 0.135], textureMaterial(posterTexture('町内会', '防犯灯  ·  お知らせ', 1)), [0, 0, 0]);
  plane(notice, [0.55, 0.73], [0.35, 1.5, 0.135], textureMaterial(posterTexture('祭り', '今週末  ·  神社', 2)), [0, 0, 0]);
  box(notice, [1.98, 0.12, 0.65], [0, 2.37, 0], materials.navy);
  beam(notice, [-0.67, 0, 0], [-0.67, 0.66, 0], 0.045, materials.darkMetal, 8);
  beam(notice, [0.67, 0, 0], [0.67, 0.66, 0], 0.045, materials.darkMetal, 8);

  const lanternMaterial = emissive(0xf2aa72, 1.25);
  box(group, [0.42, 0.78, 0.42], [5.02, 3.55, -2.3], lanternMaterial);
  box(group, [0.53, 0.08, 0.53], [5.02, 3.99, -2.3], materials.darkMetal);
  const alleyLight = new THREE.PointLight(0xffa36d, 15, 6, 2);
  alleyLight.position.set(4.7, 3.35, -2.3);
  group.add(alleyLight);
}

function buildStreetlight(group, x, z, direction = 1) {
  cylinder(group, 0.21, 0.25, [x, 0.36, z], materials.darkMetal, 16);
  cylinder(group, 0.085, 6.15, [x, 3.42, z], materials.darkMetal, 12);
  tube(group, [[x, 6.35, z], [x + direction * 0.15, 6.72, z], [x + direction * 0.9, 6.75, z]], 0.07, materials.darkMetal, 12);
  box(group, [0.85, 0.2, 0.48], [x + direction * 0.91, 6.66, z], materials.darkMetal);
  box(group, [0.67, 0.07, 0.36], [x + direction * 0.91, 6.53, z], emissive(0xffd29a, 2.1), false);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: glowTexture(), color: 0xffc88c, transparent: true, opacity: 0.36,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const glow = new THREE.Sprite(spriteMaterial);
  glow.position.set(x + direction * 0.91, 6.42, z);
  glow.scale.set(2.5, 2.5, 1);
  group.add(glow);
  const light = new THREE.SpotLight(0xffc68d, 72, 15, 0.72, 0.72, 2);
  light.position.set(x + direction * 0.91, 6.42, z);
  light.target.position.set(x + direction * 0.65, 0, z + 0.6);
  group.add(light, light.target);
}

function buildUtilityPoles(group) {
  const poles = [
    { x: 7.55, z: -10.25, h: 10.2 },
    { x: -12.8, z: -9.75, h: 9.7 },
  ];
  poles.forEach(({ x, z, h }) => {
    cylinder(group, 0.16, h, [x, h / 2 + 0.2, z], materials.darkMetal, 14, true);
    box(group, [2.55, 0.12, 0.16], [x, h - 0.25, z], materials.darkMetal);
    box(group, [1.65, 0.1, 0.14], [x, h - 1.05, z], materials.darkMetal);
    [-0.95, 0, 0.95].forEach((offset) => {
      cylinder(group, 0.09, 0.28, [x + offset, h - 0.02, z], materials.glass, 12);
      cylinder(group, 0.13, 0.055, [x + offset, h - 0.12, z], materials.metal, 12);
    });
    cylinder(group, 0.38, 1.05, [x + 0.38, h - 2.15, z], materials.metal, 16, true);
    box(group, [0.48, 0.7, 0.08], [x, 2.6, z + 0.18], materials.paper);
  });
  [-0.85, 0, 0.85].forEach((offset, index) => {
    tube(group, [
      [-12.8 + offset, 9.85, -9.75],
      [-2.65 + offset, 7.85 - index * 0.08, -10.0],
      [7.55 + offset, 10.35, -10.25],
    ], 0.025, materials.rubber, 40);
  });
  [-0.55, 0.55].forEach((offset) => {
    tube(group, [
      [7.55 + offset, 9.2, -10.25],
      [8.15 + offset, 6.9, -1.7],
      [7.65 + offset, 6.5, 6.8],
    ], 0.021, materials.rubber, 40);
  });
}

function buildGuardrailsAndSigns(group) {
  for (let z = -7.5; z <= 5.7; z += 2.2) {
    cylinder(group, 0.05, 1.0, [8.0, 0.73, z], materials.white, 10);
    cylinder(group, 0.075, 0.16, [8.0, 1.29, z], materials.mintDark, 10);
  }
  beam(group, [8.0, 1.14, -7.5], [8.0, 1.14, 5.7], 0.055, materials.white, 10);
  beam(group, [8.0, 0.72, -7.5], [8.0, 0.72, 5.7], 0.04, materials.white, 10);
  [-13.6, -11.5].forEach((x) => cylinder(group, 0.05, 1.0, [x, 0.73, 7.96], materials.white, 10));
  beam(group, [-13.6, 1.14, 7.96], [-11.5, 1.14, 7.96], 0.055, materials.white, 10);

  cylinder(group, 0.065, 4.0, [7.15, 2.23, 5.6], materials.metal, 12);
  const streetName = textureMaterial(textTexture('青井町 三丁目', 'AOI  3-CHOME', {
    background: '#427e88', color: '#f0efda', accent: '#70a9a2',
  }));
  box(group, [2.2, 0.65, 0.09], [7.15, 4.0, 5.6], materials.mintDark);
  plane(group, [2.08, 0.55], [7.15, 4.0, 5.651], streetName, [0, 0, 0]);
  const stop = textureMaterial(textTexture('止まれ', 'STOP', {
    background: '#d66e6c', color: '#fff0d9', accent: '#f2d5b5',
  }));
  const stopSign = new THREE.Mesh(new THREE.CircleGeometry(0.6, 3), basic(0xffffff, { map: stop.map, side: THREE.DoubleSide, toneMapped: false }));
  stopSign.position.set(7.15, 3.05, 5.67);
  stopSign.rotation.z = Math.PI / 2;
  group.add(stopSign);
}

function buildTrafficSignal(group) {
  cylinder(group, 0.1, 5.65, [13.45, 3.05, 7.0], materials.darkMetal, 12);
  beam(group, [13.45, 5.65, 7.0], [10.55, 5.65, 7.0], 0.085, materials.darkMetal, 10);
  box(group, [1.65, 0.63, 0.52], [10.85, 5.38, 7.0], materials.rubber);
  const signalMaterials = [
    emissive(0xd85964, 0.08),
    emissive(0xe6b85e, 0.08),
    emissive(0x6fbea4, 1.6),
  ];
  signalMaterials.forEach((material, index) => {
    const lamp = cylinder(group, 0.19, 0.055, [10.35 + index * 0.5, 5.38, 7.29], material, 20);
    lamp.rotation.x = Math.PI / 2;
    box(group, [0.45, 0.055, 0.42], [10.35 + index * 0.5, 5.72, 7.16], materials.darkMetal, false);
  });
  box(group, [0.58, 0.95, 0.42], [13.43, 3.35, 7.12], materials.rubber);
  const pedestrian = emissive(0x79c5ad, 1.1);
  sphere(group, 0.095, [13.43, 3.57, 7.36], pedestrian, 12);
  box(group, [0.075, 0.22, 0.055], [13.43, 3.29, 7.36], pedestrian, false);
  return (time) => {
    const phase = time % 18;
    const active = phase < 9 ? 2 : phase < 11 ? 1 : 0;
    signalMaterials.forEach((material, index) => {
      material.emissiveIntensity = index === active ? 1.65 : 0.055;
    });
    pedestrian.emissiveIntensity = active === 0 ? 1.1 : 0.08;
  };
}

function buildReflections(group) {
  const texture = reflectionTexture();
  const reflectionMaterials = [];
  const specs = [
    { p: [-3.7, 0.232, 3.0], s: [12.8, 4.5], c: 0xffc48c, o: 0.2 },
    { p: [0.2, 0.17, 8.95], s: [5.0, 3.2], c: 0x78c9b0, o: 0.19 },
    { p: [-12.45, 0.23, 2.15], s: [1.6, 3.4], c: 0x9cd9c4, o: 0.22 },
    { p: [10.85, 0.17, 8.8], s: [1.1, 3.6], c: 0x69b6a4, o: 0.16 },
    { p: [6.9, 0.23, 5.6], s: [2.4, 4.0], c: 0xffc17e, o: 0.18 },
  ];
  specs.forEach((spec) => {
    const material = basic(spec.c, {
      map: texture, transparent: true, opacity: spec.o,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    material.userData.baseOpacity = spec.o;
    reflectionMaterials.push(material);
    plane(group, spec.s, spec.p, material);
  });
  return (time) => {
    reflectionMaterials.forEach((material, index) => {
      material.opacity = material.userData.baseOpacity * (0.88 + Math.sin(time * 1.7 + index * 1.9) * 0.12);
    });
  };
}

export function buildStreet(parent) {
  const group = new THREE.Group();
  group.name = 'Rainy street corner';
  parent.add(group);
  buildBase(group);
  buildRoadMarkings(group);
  buildDrainage(group);
  buildVendingMachine(group);
  buildBicycle(group);
  buildUmbrellasAndBins(group);
  buildNeighborAndAlley(group);
  buildStreetlight(group, 7.35, 7.25, -1);
  buildStreetlight(group, -13.25, 7.1, 1);
  buildUtilityPoles(group);
  buildGuardrailsAndSigns(group);
  const updateTraffic = buildTrafficSignal(group);
  const updateReflections = buildReflections(group);

  // Cool ambient moonlight and one shadow-casting key light define the toon forms.
  const hemisphere = new THREE.HemisphereLight(0x8ba7d5, 0x263149, 1.55);
  group.add(hemisphere);
  const ambient = new THREE.AmbientLight(0x7181a4, 0.42);
  group.add(ambient);
  const moon = new THREE.DirectionalLight(0xabc8f2, 2.15);
  moon.position.set(-14, 24, 12);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -23;
  moon.shadow.camera.right = 23;
  moon.shadow.camera.top = 23;
  moon.shadow.camera.bottom = -23;
  moon.shadow.camera.near = 1;
  moon.shadow.camera.far = 65;
  moon.shadow.bias = -0.00035;
  moon.shadow.normalBias = 0.025;
  group.add(moon);

  return (time) => {
    updateTraffic(time);
    updateReflections(time);
  };
}
