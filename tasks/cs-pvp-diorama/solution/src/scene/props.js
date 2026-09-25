import * as THREE from 'three';

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);
const boxGeometryCache = new Map();
const cylinderGeometryCache = new Map();
const sphereGeometryCache = new Map();
const torusGeometryCache = new Map();

function getBoxGeometry(size) {
  const key = size.join(',');
  if (!boxGeometryCache.has(key)) {
    boxGeometryCache.set(key, new THREE.BoxGeometry(size[0], size[1], size[2]));
  }
  return boxGeometryCache.get(key);
}

function getCylinderGeometry(radius, height, options) {
  const radiusTop = options.radiusTop ?? radius;
  const radiusBottom = options.radiusBottom ?? radius;
  const segments = options.segments ?? 12;
  const openEnded = options.openEnded ?? false;
  const key = [radiusTop, radiusBottom, height, segments, openEnded].join(',');
  if (!cylinderGeometryCache.has(key)) {
    cylinderGeometryCache.set(
      key,
      new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 1, openEnded),
    );
  }
  return cylinderGeometryCache.get(key);
}

function getSphereGeometry(radius, options) {
  const widthSegments = options.widthSegments ?? 12;
  const heightSegments = options.heightSegments ?? 8;
  const key = [radius, widthSegments, heightSegments].join(',');
  if (!sphereGeometryCache.has(key)) {
    sphereGeometryCache.set(key, new THREE.SphereGeometry(radius, widthSegments, heightSegments));
  }
  return sphereGeometryCache.get(key);
}

function getTorusGeometry(radius, tube, options) {
  const radialSegments = options.radialSegments ?? 6;
  const tubularSegments = options.tubularSegments ?? 16;
  const key = [radius, tube, radialSegments, tubularSegments].join(',');
  if (!torusGeometryCache.has(key)) {
    torusGeometryCache.set(key, new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments));
  }
  return torusGeometryCache.get(key);
}

export function addBox(parent, size, position, material, options = {}) {
  const mesh = new THREE.Mesh(getBoxGeometry(size), material);
  mesh.position.set(position[0], position[1], position[2]);
  if (options.rotation) {
    mesh.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
  }
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  parent.add(mesh);
  return mesh;
}

export function addCylinder(parent, radius, height, position, material, options = {}) {
  const mesh = new THREE.Mesh(getCylinderGeometry(radius, height, options), material);
  mesh.position.set(position[0], position[1], position[2]);
  if (options.rotation) {
    mesh.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
  }
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  parent.add(mesh);
  return mesh;
}

export function addSphere(parent, radius, position, material, options = {}) {
  const mesh = new THREE.Mesh(getSphereGeometry(radius, options), material);
  mesh.position.set(position[0], position[1], position[2]);
  if (options.scale) mesh.scale.set(...options.scale);
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  parent.add(mesh);
  return mesh;
}

export function addTorus(parent, radius, tube, position, material, options = {}) {
  const mesh = new THREE.Mesh(getTorusGeometry(radius, tube, options), material);
  mesh.position.set(position[0], position[1], position[2]);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  if (options.scale) mesh.scale.set(...options.scale);
  mesh.castShadow = options.castShadow ?? true;
  parent.add(mesh);
  return mesh;
}

export function addLine(parent, points, material) {
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map((point) => new THREE.Vector3(point[0], point[1], point[2])),
  );
  const line = new THREE.Line(geometry, material);
  parent.add(line);
  return line;
}

export function addPipe(parent, start, end, radius, material, options = {}) {
  const from = new THREE.Vector3(...start);
  const to = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(to, from);
  const length = direction.length();
  const pipe = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, length, options.segments ?? 8, 1, false),
    material,
  );
  pipe.position.copy(from).add(to).multiplyScalar(0.5);
  pipe.quaternion.setFromUnitVectors(Y_AXIS, direction.normalize());
  pipe.castShadow = options.castShadow ?? true;
  pipe.receiveShadow = options.receiveShadow ?? true;
  parent.add(pipe);
  return pipe;
}

export function addBeam(parent, start, end, thickness, material, options = {}) {
  const from = new THREE.Vector3(...start);
  const to = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(to, from);
  const beam = addBox(
    parent,
    [thickness, thickness, direction.length()],
    from.clone().add(to).multiplyScalar(0.5).toArray(),
    material,
    { castShadow: options.castShadow, receiveShadow: options.receiveShadow },
  );
  beam.quaternion.setFromUnitVectors(Z_AXIS, direction.normalize());
  return beam;
}

export function addDecal(parent, width, height, position, material, rotation = [-Math.PI / 2, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.renderOrder = 3;
  parent.add(mesh);
  return mesh;
}

export function addCrate(parent, position, size = 1.15, material, trimMaterial, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);

  addBox(group, [size, size * 0.82, size], [0, size * 0.41, 0], material);
  const slat = size * 0.1;
  for (const x of [-size * 0.37, size * 0.37]) {
    addBox(group, [slat, size * 0.88, size * 1.025], [x, size * 0.41, 0], trimMaterial, { castShadow: false });
  }
  for (const y of [size * 0.14, size * 0.68]) {
    addBox(group, [size * 1.02, slat, size * 1.03], [0, y, 0], trimMaterial, { castShadow: false });
  }
  addBeam(
    group,
    [-size * 0.43, size * 0.12, size * 0.53],
    [size * 0.43, size * 0.69, size * 0.53],
    slat * 0.72,
    trimMaterial,
    { castShadow: false },
  );
  return group;
}

export function addPallet(parent, position, width = 1.7, depth = 1.2, material, darkMaterial) {
  const group = new THREE.Group();
  group.position.set(...position);
  parent.add(group);
  for (const x of [-width * 0.34, 0, width * 0.34]) {
    addBox(group, [0.18, 0.16, depth], [x, 0.1, 0], darkMaterial);
  }
  for (let index = 0; index < 6; index += 1) {
    const z = -depth * 0.42 + index * (depth * 0.84 / 5);
    addBox(group, [width, 0.11, depth * 0.12], [0, 0.23, z], material);
  }
  return group;
}

export function addOilDrum(parent, position, material, darkMaterial, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  const radius = options.radius ?? 0.38;
  const height = options.height ?? 0.95;
  addCylinder(group, radius, height, [0, height * 0.5, 0], material, { segments: 14 });
  for (const y of [height * 0.24, height * 0.5, height * 0.76]) {
    addTorus(group, radius * 1.015, 0.035, [0, y, 0], darkMaterial, {
      rotation: [Math.PI / 2, 0, 0],
      radialSegments: 5,
      tubularSegments: 14,
    });
  }
  addCylinder(group, radius * 0.22, 0.035, [radius * 0.46, height + 0.01, 0], darkMaterial, { segments: 8 });
  return group;
}

export function addTireStack(parent, position, count, material) {
  const group = new THREE.Group();
  group.position.set(...position);
  parent.add(group);
  for (let index = 0; index < count; index += 1) {
    addTorus(group, 0.42, 0.14, [0, 0.15 + index * 0.25, 0], material, {
      rotation: [Math.PI / 2, 0, index * 0.19],
      radialSegments: 7,
      tubularSegments: 18,
    });
  }
  return group;
}

export function addJerseyBarrier(parent, position, material, options = {}) {
  const width = options.width ?? 0.72;
  const height = options.height ?? 1.0;
  const length = options.length ?? 2.2;
  const shape = new THREE.Shape();
  shape.moveTo(-width * 0.5, 0);
  shape.lineTo(width * 0.5, 0);
  shape.lineTo(width * 0.34, height * 0.22);
  shape.lineTo(width * 0.18, height);
  shape.lineTo(-width * 0.18, height);
  shape.lineTo(-width * 0.34, height * 0.22);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: length,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035,
  });
  geometry.translate(0, 0, -length * 0.5);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  if (options.rotationY) mesh.rotation.y = options.rotationY;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function addTrafficBarrier(parent, position, material, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  addBox(group, [options.length ?? 2.1, 0.18, 0.18], [0, 0.76, 0], material);
  for (const x of [-0.68, 0, 0.68]) {
    addBox(group, [0.1, 0.84, 0.1], [x, 0.37, 0], material);
    addBox(group, [0.34, 0.1, 0.55], [x, 0.06, 0], material);
  }
  for (let index = -2; index <= 2; index += 1) {
    const stripe = addBox(group, [0.24, 0.19, 0.195], [index * 0.34, 0.76, 0], options.stripeMaterial ?? material, { castShadow: false });
    stripe.rotation.z = -0.42;
  }
  return group;
}

export function addDumpster(parent, position, material, darkMaterial, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  addBox(group, [1.75, 1.05, 1.05], [0, 0.55, 0], material);
  const lid = addBox(group, [1.85, 0.12, 1.12], [0.04, 1.13, 0], darkMaterial, { rotation: [0, 0, -0.045] });
  lid.castShadow = true;
  for (const x of [-0.64, 0.64]) {
    addCylinder(group, 0.13, 0.12, [x, 0.1, 0.38], darkMaterial, { rotation: [Math.PI / 2, 0, 0], segments: 8 });
    addCylinder(group, 0.13, 0.12, [x, 0.1, -0.38], darkMaterial, { rotation: [Math.PI / 2, 0, 0], segments: 8 });
  }
  for (const x of [-0.7, 0.7]) {
    addBox(group, [0.08, 0.8, 1.08], [x, 0.55, 0], darkMaterial, { castShadow: false });
  }
  return group;
}

export function addFence(parent, start, end, materials, options = {}) {
  const group = new THREE.Group();
  parent.add(group);
  const from = new THREE.Vector2(start[0], start[2]);
  const to = new THREE.Vector2(end[0], end[2]);
  const distance = from.distanceTo(to);
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const baseY = start[1] ?? 0.1;
  const height = options.height ?? 2.1;
  const postCount = Math.max(2, Math.ceil(distance / (options.spacing ?? 2.2)));
  for (let index = 0; index <= postCount; index += 1) {
    const point = from.clone().lerp(to, index / postCount);
    addCylinder(group, 0.055, height, [point.x, baseY + height * 0.5, point.y], materials.steelWet, { segments: 7 });
  }

  const gridPoints = [];
  for (let y = 0.25; y <= height - 0.15; y += 0.28) {
    gridPoints.push(start[0], baseY + y, start[2], end[0], baseY + y, end[2]);
  }
  for (let x = 0.22; x < distance; x += 0.28) {
    const point = from.clone().lerp(to, x / distance);
    gridPoints.push(point.x, baseY + 0.15, point.y, point.x, baseY + height - 0.1, point.y);
  }
  const gridGeometry = new THREE.BufferGeometry();
  gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPoints, 3));
  group.add(new THREE.LineSegments(gridGeometry, materials.wire));

  for (let index = 0; index < 3; index += 1) {
    const y = baseY + height + index * 0.13;
    const barbStart = [start[0] - Math.sin(angle) * index * 0.08, y, start[2] + Math.cos(angle) * index * 0.08];
    const barbEnd = [end[0] - Math.sin(angle) * index * 0.08, y, end[2] + Math.cos(angle) * index * 0.08];
    addLine(group, [barbStart, barbEnd], materials.wire);
  }
  return group;
}

export function addLadder(parent, position, height, width, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  if (options.rotationX) group.rotation.x = options.rotationX;
  parent.add(group);
  for (const x of [-width * 0.5, width * 0.5]) {
    addPipe(group, [x, 0, 0], [x, height, 0], 0.045, materials.steelWet, { segments: 7 });
  }
  const rungCount = Math.max(2, Math.floor(height / 0.36));
  for (let index = 0; index <= rungCount; index += 1) {
    const y = 0.18 + index * ((height - 0.3) / rungCount);
    addPipe(group, [-width * 0.5, y, 0], [width * 0.5, y, 0], 0.032, materials.steelWet, { segments: 6 });
  }
  return group;
}

export function addShelf(parent, position, width, height, depth, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  for (const x of [-width * 0.5, width * 0.5]) {
    for (const z of [-depth * 0.5, depth * 0.5]) {
      addBox(group, [0.12, height, 0.12], [x, height * 0.5, z], materials.steel);
    }
  }
  const levels = options.levels ?? 5;
  for (let level = 0; level < levels; level += 1) {
    const y = 0.18 + level * ((height - 0.25) / (levels - 1));
    addBox(group, [width, 0.09, depth], [0, y, 0], materials.metalDark);
    if (level < levels - 1) {
      for (let item = 0; item < 2; item += 1) {
        const crate = addCrate(
          group,
          [-width * 0.23 + item * width * 0.44, y + 0.05, (item % 2) * 0.1],
          Math.min(0.64, width * 0.22),
          item % 2 ? materials.cardboard : materials.wood,
          materials.woodDark,
          { rotationY: item * 0.08 },
        );
        crate.scale.setScalar(0.74);
      }
    }
  }
  return group;
}

export function addForklift(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  parent.add(group);

  addBox(group, [1.35, 0.58, 1.75], [0, 0.5, -0.1], materials.yellow);
  addBox(group, [0.9, 0.35, 0.8], [-0.1, 0.96, -0.55], materials.metalDark);
  addBox(group, [0.72, 0.42, 0.08], [-0.1, 1.08, -0.22], materials.rubber);
  addBox(group, [0.72, 0.38, 0.45], [-0.1, 0.96, -0.93], materials.rubber);
  for (const x of [-0.58, 0.58]) {
    for (const z of [-0.62, 0.63]) {
      addCylinder(group, 0.28, 0.2, [x, 0.3, z], materials.rubber, { rotation: [0, 0, Math.PI / 2], segments: 10 });
      addCylinder(group, 0.12, 0.215, [x, 0.3, z], materials.metal, { rotation: [0, 0, Math.PI / 2], segments: 8 });
    }
  }
  for (const x of [-0.5, 0.5]) {
    addBox(group, [0.09, 2.1, 0.09], [x, 1.42, 0.46], materials.steel);
    addBox(group, [0.08, 1.1, 0.08], [x, 2.22, -0.42], materials.steel);
    addPipe(group, [x, 2.46, -0.42], [x, 2.46, 0.46], 0.06, materials.steel);
  }
  addBox(group, [1.15, 0.1, 0.85], [0, 2.48, 0.03], materials.metalDark, { castShadow: false });
  for (const x of [-0.34, 0.34]) {
    addBox(group, [0.12, 0.08, 1.2], [x, 0.18, 1.12], materials.steel);
    addBox(group, [0.12, 0.45, 0.1], [x, 0.35, 0.54], materials.steel);
  }
  addCylinder(group, 0.18, 0.05, [0.58, 1.38, 0.3], materials.warmLight, { rotation: [Math.PI / 2, 0, 0], segments: 10, castShadow: false });
  return group;
}

function addVehicleBase(group, length, width, materials, wheelMaterial) {
  addBox(group, [length, 0.38, width], [0, 0.62, 0], materials.metalDark);
  for (const x of [-length * 0.31, length * 0.31]) {
    for (const z of [-width * 0.53, width * 0.53]) {
      addCylinder(group, 0.46, 0.24, [x, 0.45, z], wheelMaterial, {
        rotation: [Math.PI / 2, 0, 0],
        segments: 12,
      });
      addCylinder(group, 0.2, 0.25, [x, 0.45, z], materials.metal, {
        rotation: [Math.PI / 2, 0, 0],
        segments: 8,
      });
    }
  }
}

export function addTruck(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  parent.add(group);

  addVehicleBase(group, 6.5, 2.25, materials, materials.rubber);
  addBox(group, [4.15, 2.25, 2.18], [0.85, 1.82, 0], materials.blueDark);
  addBox(group, [1.55, 1.62, 2.1], [-2.25, 1.62, 0], materials.blue);
  addBox(group, [0.08, 0.78, 1.72], [-3.04, 1.91, 0], materials.glass, { castShadow: false });
  for (const z of [-1.08, 1.08]) {
    addBox(group, [0.08, 0.72, 0.72], [-2.37, 1.92, z], materials.glass, { castShadow: false });
  }
  addBox(group, [0.26, 0.34, 2.35], [-3.1, 0.82, 0], materials.steelWet);
  for (const z of [-0.76, 0.76]) {
    addBox(group, [0.12, 0.32, 0.35], [-3.25, 1.13, z], materials.warmLight, { castShadow: false });
  }
  for (let rib = -1; rib <= 2; rib += 1) {
    addBox(group, [0.08, 2.08, 2.24], [0.85 + rib * 1.05, 1.84, 0], materials.metal, { castShadow: false });
  }
  addDecal(group, 2.2, 0.72, [0.8, 1.9, 1.105], materials.graffitiA, [0, 0, 0]);
  return group;
}

export function addPoliceVan(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  parent.add(group);
  addVehicleBase(group, 5.2, 2.15, materials, materials.rubber);
  addBox(group, [3.9, 1.72, 2.02], [0.25, 1.66, 0], materials.ivory);
  addBox(group, [0.08, 0.72, 1.65], [-1.73, 1.84, 0], materials.glass, { castShadow: false });
  for (const z of [-1.04, 1.04]) {
    addBox(group, [1.1, 0.68, 0.07], [-0.55, 1.83, z], materials.glass, { castShadow: false });
  }
  addBox(group, [1.3, 0.16, 1.9], [0.15, 2.58, 0], materials.metalDark);
  addBox(group, [0.58, 0.2, 0.32], [0.15, 2.75, 0], materials.black);
  const red = addBox(group, [0.48, 0.18, 0.28], [-0.18, 2.77, 0], materials.redLight, { castShadow: false });
  const blue = addBox(group, [0.48, 0.18, 0.28], [0.48, 2.77, 0], materials.blueLight, { castShadow: false });
  for (const z of [-0.69, 0.69]) {
    addBox(group, [0.06, 0.62, 0.32], [-1.78, 1.15, z], materials.blue, { castShadow: false });
  }
  addBox(group, [1.2, 0.32, 0.12], [0.4, 1.23, 1.04], materials.blue, { castShadow: false });
  group.userData.emergencyLights = { red, blue };
  return group;
}

export function addBicycle(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  group.rotation.z = options.rotationZ ?? 0;
  parent.add(group);
  for (const x of [-0.68, 0.68]) {
    addTorus(group, 0.42, 0.045, [x, 0.44, 0], materials.rubber, { radialSegments: 6, tubularSegments: 18 });
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
      addPipe(
        group,
        [x, 0.44, 0],
        [x + Math.cos(angle) * 0.38, 0.44 + Math.sin(angle) * 0.38, 0],
        0.012,
        materials.steel,
        { segments: 5, castShadow: false },
      );
    }
  }
  const frame = [
    [-0.68, 0.44, 0], [-0.18, 0.43, 0], [0.08, 1.05, 0],
    [-0.42, 1.12, 0], [-0.18, 0.43, 0], [0.52, 0.44, 0], [0.08, 1.05, 0],
  ];
  for (let index = 0; index < frame.length - 1; index += 1) {
    addPipe(group, frame[index], frame[index + 1], 0.032, materials.red, { segments: 6 });
  }
  addPipe(group, [0.08, 1.05, 0], [0.08, 1.28, 0], 0.03, materials.steel, { segments: 6 });
  addPipe(group, [-0.18, 1.28, -0.22], [-0.18, 1.28, 0.22], 0.025, materials.steel, { segments: 6 });
  addBox(group, [0.28, 0.08, 0.18], [-0.42, 1.17, 0], materials.rubber);
  return group;
}

export function addDesk(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  parent.add(group);
  addBox(group, [1.65, 0.12, 0.78], [0, 0.88, 0], materials.woodDark);
  for (const x of [-0.68, 0.68]) {
    for (const z of [-0.28, 0.28]) {
      addBox(group, [0.09, 0.84, 0.09], [x, 0.42, z], materials.metalDark);
    }
  }
  addBox(group, [0.55, 0.08, 0.42], [0.38, 0.98, 0], materials.metalDark, { rotation: [0, 0, 0.04] });
  addBox(group, [0.42, 0.3, 0.04], [0.38, 1.15, -0.14], materials.black, { rotation: [-0.08, 0, 0] });
  addCylinder(group, 0.09, 0.18, [-0.5, 1.03, 0.1], materials.steel, { segments: 8 });
  addCylinder(group, 0.04, 0.25, [-0.4, 1.2, 0.06], materials.ivory, { segments: 6 });
  return group;
}

export function addChair(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  group.rotation.z = options.rotationZ ?? 0;
  parent.add(group);
  addBox(group, [0.56, 0.1, 0.55], [0, 0.55, 0], materials.rubber);
  addBox(group, [0.56, 0.66, 0.1], [0, 0.9, -0.25], materials.rubber, { rotation: [-0.12, 0, 0] });
  addCylinder(group, 0.07, 0.46, [0, 0.28, 0], materials.steel, { segments: 7 });
  addCylinder(group, 0.32, 0.06, [0, 0.05, 0], materials.metalDark, { segments: 10 });
  return group;
}

export function addAirConditioner(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  parent.add(group);
  addBox(group, [1.45, 0.85, 0.7], [0, 0, 0], materials.metal);
  addTorus(group, 0.28, 0.045, [0, 0, 0.36], materials.metalDark, { radialSegments: 5, tubularSegments: 16 });
  for (let index = 0; index < 4; index += 1) {
    const blade = addBox(group, [0.5, 0.07, 0.04], [0, 0, 0.38], materials.black, { castShadow: false });
    blade.rotation.z = index * Math.PI / 4;
  }
  for (const x of [-0.5, 0.5]) {
    addBox(group, [0.18, 0.1, 0.82], [x, -0.49, 0], materials.steelWet);
  }
  return group;
}

export function addWindow(parent, position, width, height, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  parent.add(group);
  addBox(group, [width, height, 0.07], [0, 0, 0], materials.glass, { castShadow: false, receiveShadow: false });
  for (const x of [-width * 0.5, width * 0.5]) {
    addBox(group, [0.09, height + 0.18, 0.13], [x, 0, 0.03], materials.woodDark);
  }
  for (const y of [-height * 0.5, height * 0.5]) {
    addBox(group, [width + 0.18, 0.09, 0.13], [0, y, 0.03], materials.woodDark);
  }
  if (options.boards) {
    for (let index = 0; index < options.boards; index += 1) {
      addBox(
        group,
        [width * 1.12, 0.18, 0.08],
        [0, -height * 0.28 + index * height * 0.33, 0.12],
        materials.wood,
        { rotation: [0, 0, index % 2 ? 0.08 : -0.06] },
      );
    }
  }
  return group;
}

export function addCagedLight(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  const lightMaterial = options.cold ? materials.coldLight : materials.warmLight;
  addBox(group, [0.54, 0.18, 0.32], [0, 0, 0], materials.metalDark);
  addBox(group, [0.4, 0.08, 0.23], [0, -0.11, 0], lightMaterial, { castShadow: false });
  for (let index = -2; index <= 2; index += 1) {
    addPipe(group, [index * 0.1, -0.18, 0], [index * 0.1, -0.02, 0.18], 0.012, materials.steel, { segments: 5, castShadow: false });
  }
  return group;
}

export function addBollard(parent, position, materials, options = {}) {
  const height = options.height ?? 0.82;
  addCylinder(parent, options.radius ?? 0.12, height, [position[0], position[1] + height * 0.5, position[2]], materials.metalDark, { segments: 10 });
  addTorus(parent, (options.radius ?? 0.12) * 1.02, 0.025, [position[0], position[1] + height * 0.72, position[2]], materials.yellow, {
    rotation: [Math.PI / 2, 0, 0],
    radialSegments: 5,
    tubularSegments: 12,
  });
}

export function addSandbagWall(parent, position, width, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = options.rotationY ?? 0;
  parent.add(group);
  const bagWidth = 0.52;
  const rows = options.rows ?? 3;
  const count = Math.max(2, Math.floor(width / bagWidth));
  for (let row = 0; row < rows; row += 1) {
    for (let index = 0; index < count; index += 1) {
      const x = (index - (count - 1) * 0.5) * bagWidth + (row % 2) * bagWidth * 0.22;
      const bag = addSphere(group, 0.32, [x, 0.25 + row * 0.39, (row % 2) * 0.05], materials.sandbag, {
        scale: [1, 0.62, 0.72],
        widthSegments: 8,
        heightSegments: 5,
      });
      bag.rotation.y = (index % 2 ? 1 : -1) * 0.08;
    }
  }
  return group;
}
