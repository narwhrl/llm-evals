import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { mulberry32 } from './materials.js';
import {
  addAirConditioner,
  addBeam,
  addBicycle,
  addBox,
  addBollard,
  addCagedLight,
  addChair,
  addCrate,
  addCylinder,
  addDecal,
  addDesk,
  addDumpster,
  addFence,
  addForklift,
  addJerseyBarrier,
  addLadder,
  addLine,
  addOilDrum,
  addPallet,
  addPipe,
  addPoliceVan,
  addSandbagWall,
  addShelf,
  addSphere,
  addTireStack,
  addTorus,
  addTrafficBarrier,
  addTruck,
  addWindow,
} from './props.js';

const FLOOR_Y = 0.18;

function addRamp(parent, width, length, height, position, material) {
  const halfWidth = width * 0.5;
  const halfLength = length * 0.5;
  const vertices = new Float32Array([
    -halfWidth, 0, -halfLength,
    halfWidth, 0, -halfLength,
    halfWidth, height, halfLength,
    -halfWidth, height, halfLength,
    -halfWidth, 0, halfLength,
    halfWidth, 0, halfLength,
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex([
    0, 1, 2,
    0, 2, 3,
    0, 4, 1,
    1, 4, 5,
    3, 2, 5,
    3, 5, 4,
    0, 3, 4,
    1, 5, 2,
  ]);
  geometry.computeVertexNormals();
  const ramp = new THREE.Mesh(geometry, material);
  ramp.position.set(...position);
  ramp.castShadow = true;
  ramp.receiveShadow = true;
  parent.add(ramp);
  return ramp;
}

function addStairs(parent, position, width, run, rise, steps, material, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  const stepRun = run / steps;
  const stepRise = rise / steps;
  for (let index = 0; index < steps; index += 1) {
    addBox(
      group,
      [width, stepRise * (index + 1), stepRun],
      [0, stepRise * (index + 1) * 0.5, -run * 0.5 + stepRun * (index + 0.5)],
      material,
    );
  }
  if (options.rails) {
    for (const x of [-width * 0.5, width * 0.5]) {
      addPipe(group, [x, 0.1, -run * 0.5], [x, rise + 0.9, run * 0.5], 0.04, options.railMaterial, { segments: 7 });
      for (let index = 0; index <= 3; index += 1) {
        const t = index / 3;
        const z = -run * 0.5 + t * run;
        addPipe(group, [x, 0.1, z], [x, 0.1 + rise + 0.9, z], 0.032, options.railMaterial, { segments: 6 });
      }
    }
  }
  return group;
}

function addContainer(parent, position, size, material, trimMaterial, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  addBox(group, size, [0, size[1] * 0.5, 0], material);
  const ribCount = Math.max(4, Math.floor(size[2] / 0.42));
  for (let index = 1; index < ribCount; index += 1) {
    const z = -size[2] * 0.5 + (size[2] / ribCount) * index;
    addBox(group, [size[0] * 1.015, size[1] * 0.92, 0.055], [0, size[1] * 0.5, z], trimMaterial, { castShadow: false });
  }
  for (const x of [-size[0] * 0.5, size[0] * 0.5]) {
    for (const y of [0.1, size[1] - 0.1]) {
      addBox(group, [0.12, 0.12, size[2] * 1.02], [x, y, 0], trimMaterial);
    }
  }
  addBox(group, [0.08, size[1] * 0.88, 0.12], [0, size[1] * 0.5, size[2] * 0.5 + 0.025], trimMaterial, { castShadow: false });
  if (options.sign) {
    addDecal(group, size[0] * 0.58, size[1] * 0.26, [0, size[1] * 0.55, size[2] * 0.5 + 0.055], options.sign, [0, 0, 0]);
  }
  return group;
}

function addStreetLamp(parent, position, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  const height = options.height ?? 3.7;
  addCylinder(group, 0.09, height, [0, height * 0.5, 0], materials.metalDark, { segments: 9 });
  addCylinder(group, 0.23, 0.18, [0, 0.12, 0], materials.concreteDark, { segments: 10 });
  addPipe(group, [0, height - 0.1, 0], [0.85, height + 0.1, 0], 0.065, materials.metalDark, { segments: 8 });
  addBox(group, [0.55, 0.16, 0.34], [0.86, height + 0.04, 0], materials.metalDark, { rotation: [0, 0, 0.05] });
  addBox(group, [0.42, 0.045, 0.26], [0.86, height - 0.06, 0], options.cold ? materials.coldLight : materials.warmLight, { castShadow: false });
  return group;
}

function addGuardRail(parent, start, end, height, materials) {
  const from = new THREE.Vector3(...start);
  const to = new THREE.Vector3(...end);
  const distance = from.distanceTo(to);
  const posts = Math.max(2, Math.ceil(distance / 1.2));
  for (let index = 0; index <= posts; index += 1) {
    const point = from.clone().lerp(to, index / posts);
    addPipe(parent, point.toArray(), [point.x, point.y + height, point.z], 0.035, materials.steelWet, { segments: 6 });
  }
  for (const y of [height * 0.48, height]) {
    addPipe(
      parent,
      [from.x, from.y + y, from.z],
      [to.x, to.y + y, to.z],
      0.032,
      materials.steelWet,
      { segments: 7 },
    );
  }
}

function addBulletMarks(parent, position, count, width, height, materials, rotationY = 0) {
  const random = mulberry32(Math.floor(position[0] * 31 + position[2] * 17 + count));
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = rotationY;
  parent.add(group);
  for (let index = 0; index < count; index += 1) {
    const radius = 0.025 + random() * 0.035;
    const mark = new THREE.Mesh(new THREE.CircleGeometry(radius, 8), materials.dark);
    mark.position.set((random() - 0.5) * width, (random() - 0.5) * height, 0.012);
    mark.rotation.z = random() * Math.PI;
    group.add(mark);
  }
  return group;
}

function createPuddleGeometry(puddles, seed = 812) {
  const random = mulberry32(seed);
  const positions = [];
  for (const puddle of puddles) {
    const points = [];
    const segments = 14;
    for (let index = 0; index < segments; index += 1) {
      const angle = index / segments * Math.PI * 2;
      const wobble = 0.78 + random() * 0.28;
      points.push([
        puddle.x + Math.cos(angle) * puddle.rx * wobble,
        -(puddle.z + Math.sin(angle) * puddle.rz * wobble),
      ]);
    }
    for (let index = 0; index < segments; index += 1) {
      const next = (index + 1) % segments;
      positions.push(
        puddle.x, -puddle.z, 0,
        points[next][0], points[next][1], 0,
        points[index][0], points[index][1], 0,
      );
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function addDrainGrate(parent, position, size, materials, options = {}) {
  const group = new THREE.Group();
  group.position.set(...position);
  if (options.rotationY) group.rotation.y = options.rotationY;
  parent.add(group);
  const [width, length] = size;
  addBox(group, [width + 0.12, 0.08, length + 0.12], [0, -0.015, 0], materials.rust);
  addBox(group, [width, 0.05, length], [0, 0.035, 0], materials.dark, { castShadow: false });
  const barCount = Math.max(3, Math.floor(length / 0.23));
  for (let index = 0; index < barCount; index += 1) {
    const z = -length * 0.5 + (index + 0.5) * length / barCount;
    addBox(group, [width * 0.96, 0.055, 0.055], [0, 0.068, z], materials.steelWet, { castShadow: false });
  }
  return group;
}

function addChevron(parent, position, material, rotationY = 0) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = rotationY;
  parent.add(group);
  for (const side of [-1, 1]) {
    const bar = addBox(group, [0.12, 0.025, 0.82], [side * 0.16, 0, 0.12], material, { castShadow: false });
    bar.rotation.y = side * 0.72;
  }
  return group;
}

function buildBase(scene, materials) {
  const world = new THREE.Group();
  world.name = 'square-diorama-base';
  scene.add(world);

  addBox(world, [33.2, 1.15, 33.2], [0, -0.66, 0], materials.base);
  addBox(world, [32.45, 0.26, 32.45], [0, 0.01, 0], materials.concreteDark);
  addBox(world, [31.75, 0.16, 31.75], [0, 0.15, 0], materials.asphalt);

  for (const x of [-15.7, 15.7]) {
    addBox(world, [0.42, 0.36, 31.4], [x, 0.24, 0], materials.concrete);
    for (let z = -14; z <= 14; z += 2) {
      addBox(world, [0.46, 0.39, 0.07], [x, 0.25, z], materials.concreteDark, { castShadow: false });
    }
  }
  for (const z of [-15.7, 15.7]) {
    addBox(world, [31.4, 0.36, 0.42], [0, 0.24, z], materials.concrete);
    for (let x = -14; x <= 14; x += 2) {
      addBox(world, [0.07, 0.39, 0.46], [x, 0.25, z], materials.concreteDark, { castShadow: false });
    }
  }

  addBox(world, [7.1, 0.055, 30.5], [0, 0.255, 0], materials.asphalt);
  addBox(world, [30.6, 0.05, 5.2], [0, 0.258, 0.2], materials.asphalt);
  addBox(world, [5.2, 0.08, 9.2], [-10.2, 0.29, -10.1], materials.concreteDark);
  addBox(world, [5.6, 0.08, 7.8], [10.2, 0.29, -9.1], materials.concrete);
  addBox(world, [6.1, 0.08, 7.3], [7.5, 0.3, 11.3], materials.concreteDark);

  for (const x of [-3.72, 3.72]) {
    addBox(world, [0.28, 0.13, 30], [x, 0.31, 0], materials.concrete);
  }

  const seamMaterial = materials.line;
  for (let z = -14; z <= 14; z += 2) {
    addLine(world, [[-3.5, 0.302, z], [3.5, 0.302, z]], seamMaterial);
  }
  for (let x = -2.5; x <= 2.5; x += 1.25) {
    addLine(world, [[x, 0.304, -15], [x, 0.304, 15]], seamMaterial);
  }

  for (let z = -12; z <= 12; z += 4) {
    addChevron(world, [-2.75, 0.315, z], materials.yellow);
  }

  addDrainGrate(world, [-0.9, 0.325, 0.5], [0.72, 14.8], materials, { rotationY: Math.PI / 2 });
  addDrainGrate(world, [4.8, 0.34, 5.2], [0.65, 4.1], materials, { rotationY: Math.PI / 2 });
  addDrainGrate(world, [-11.7, 0.35, -1.5], [0.62, 5.2], materials, { rotationY: Math.PI / 2 });

  for (const x of [-15.25, 15.25]) {
    addBox(world, [0.16, 0.11, 30.2], [x, 0.36, 0], materials.rust);
    for (let z = -14; z < 14; z += 1.2) {
      addBox(world, [0.2, 0.035, 0.56], [x, 0.425, z], materials.dark, { castShadow: false });
    }
  }

  addDecal(world, 4.3, 4.3, [-8.4, 0.455, -7.1], materials.siteA);
  addDecal(world, 4.1, 4.1, [8.7, 0.36, -4.75], materials.siteB);

  const puddles = [
    { x: -6.6, z: -1.6, rx: 2.15, rz: 0.92 },
    { x: -0.8, z: 4.7, rx: 1.15, rz: 2.25 },
    { x: 2.7, z: 1.7, rx: 1.4, rz: 0.72 },
    { x: 8.9, z: 3.4, rx: 1.5, rz: 0.72 },
    { x: -11.3, z: 5.4, rx: 0.92, rz: 2.1 },
    { x: 7.3, z: -4.4, rx: 1.05, rz: 1.42 },
    { x: -4.4, z: -12.2, rx: 1.0, rz: 1.5 },
    { x: 13.2, z: 8.0, rx: 0.82, rz: 1.7 },
    { x: -1.9, z: 10.5, rx: 1.6, rz: 0.65 },
  ];
  const puddleGeometry = createPuddleGeometry(puddles);
  const reflector = new Reflector(puddleGeometry, {
    clipBias: 0.003,
    textureWidth: 768,
    textureHeight: 768,
    color: 0x587382,
    multisample: 2,
  });
  reflector.rotation.x = -Math.PI / 2;
  reflector.position.y = 0.365;
  reflector.material.userData.outlineParameters = { visible: false };
  world.add(reflector);

  const waterSkin = new THREE.Mesh(puddleGeometry, materials.water);
  waterSkin.rotation.x = -Math.PI / 2;
  waterSkin.position.y = 0.372;
  waterSkin.renderOrder = 2;
  world.add(waterSkin);

  return world;
}

function buildTSpawn(world, materials) {
  const group = new THREE.Group();
  group.name = 't-spawn';
  world.add(group);

  addFence(group, [-14.6, FLOOR_Y, -15.15], [14.6, FLOOR_Y, -15.15], materials, { height: 2.05, spacing: 2.3 });
  addFence(group, [14.6, FLOOR_Y, -15.15], [14.6, FLOOR_Y, -10.4], materials, { height: 2.05, spacing: 2.3 });
  addFence(group, [-14.6, FLOOR_Y, -15.15], [-14.6, FLOOR_Y, -10.2], materials, { height: 2.05, spacing: 2.3 });

  addTruck(group, [-7.3, FLOOR_Y, -12.6], materials, { rotationY: 0.02 });
  addLadder(group, [-3.85, FLOOR_Y, -12.0], 3.2, 0.75, materials, { rotationY: 0.18, rotationX: -0.12 });

  addContainer(group, [6.6, FLOOR_Y, -12.2], [3.5, 2.4, 5.5], materials.blueDark, materials.metal, { sign: materials.signBlue });
  addContainer(group, [6.6, FLOOR_Y + 2.42, -12.3], [3.25, 2.25, 5.0], materials.rust, materials.metalDark, { sign: materials.graffitiB });
  addContainer(group, [11.65, FLOOR_Y, -13.25], [3.2, 2.25, 4.1], materials.blue, materials.metal, { rotationY: 0.02, sign: materials.graffitiA });

  addRamp(group, 7.4, 5.2, 1.15, [0, FLOOR_Y, -7.15], materials.concreteDark);
  addBox(group, [0.42, 1.18, 5.4], [-3.8, 0.77, -7.15], materials.concrete);
  addBox(group, [0.42, 1.18, 5.4], [3.8, 0.77, -7.15], materials.concrete);
  addBox(group, [3.2, 0.52, 0.26], [-2.5, 0.48, -8.45], materials.wallDark);
  addBox(group, [1.5, 0.78, 0.08], [-1.25, 0.59, -8.29], materials.dark, { castShadow: false });
  addBox(group, [1.65, 0.12, 0.12], [-1.25, 1.02, -8.27], materials.rust);

  for (let index = 0; index < 4; index += 1) {
    addOilDrum(
      group,
      [-4.65 + (index % 2) * 0.82, FLOOR_Y, -9.75 + Math.floor(index / 2) * 0.83],
      index % 2 ? materials.blue : materials.rust,
      materials.metalDark,
      { rotationY: index * 0.17 },
    );
  }
  addPallet(group, [4.2, FLOOR_Y, -8.7], 1.8, 1.2, materials.wood, materials.woodDark);
  addCrate(group, [4.2, FLOOR_Y + 0.29, -8.7], 1.1, materials.wood, materials.woodDark);
  addCrate(group, [4.15, FLOOR_Y + 1.1, -8.72], 0.86, materials.cardboard, materials.woodDark, { rotationY: 0.12 });
  addJerseyBarrier(group, [0.8, FLOOR_Y, -4.25], materials.concrete, { length: 2.4, rotationY: 0.08 });

  addDecal(group, 1.6, 0.72, [-3.57, 1.05, -7.1], materials.signYellow, [0, Math.PI / 2, 0]);
  return group;
}

function buildWarehouse(world, materials) {
  const group = new THREE.Group();
  group.name = 'a-bombsite-warehouse';
  world.add(group);

  const centerX = -8.2;
  const centerZ = -9.1;
  const width = 10.4;
  const depth = 8.8;
  const height = 4.8;
  const left = centerX - width * 0.5;
  const right = centerX + width * 0.5;
  const back = centerZ - depth * 0.5;
  const front = centerZ + depth * 0.5;

  addBox(group, [width, 0.2, depth], [centerX, 0.34, centerZ], materials.concreteDark);

  const rearDoorX = centerX + 3.2;
  const rearDoorWidth = 1.7;
  const rearDoorHeight = 2.65;
  const rearOpeningLeft = rearDoorX - rearDoorWidth * 0.5;
  const leftRearWidth = rearOpeningLeft - left;
  const rightRearWidth = right - (rearDoorX + rearDoorWidth * 0.5);
  addBox(group, [leftRearWidth, height, 0.34], [(left + rearOpeningLeft) * 0.5, height * 0.5 + 0.36, back], materials.wall);
  addBox(group, [rightRearWidth, height, 0.34], [rearDoorX + rearDoorWidth * 0.5 + rightRearWidth * 0.5, height * 0.5 + 0.36, back], materials.wall);
  addBox(group, [rearDoorWidth + 0.16, height - rearDoorHeight, 0.34], [rearDoorX, rearDoorHeight + (height - rearDoorHeight) * 0.5 + 0.36, back], materials.wall);
  addBox(group, [rearDoorWidth, rearDoorHeight, 0.08], [rearDoorX, rearDoorHeight * 0.5 + 0.42, back + 0.19], materials.dark, { castShadow: false });

  const rearDoorLeaf = new THREE.Group();
  rearDoorLeaf.position.set(rearDoorX - 0.43, 0.44, back + 0.25);
  rearDoorLeaf.rotation.y = -0.48;
  group.add(rearDoorLeaf);
  addBox(rearDoorLeaf, [0.84, rearDoorHeight - 0.08, 0.12], [0, rearDoorHeight * 0.5, 0], materials.rust);
  addBox(rearDoorLeaf, [0.12, 0.32, 0.16], [0.25, 1.28, 0.08], materials.steelWet);
  addBox(group, [0.84, rearDoorHeight - 0.08, 0.12], [rearDoorX + 0.43, (rearDoorHeight - 0.08) * 0.5 + 0.44, back + 0.25], materials.metalDark);
  addBox(group, [0.12, 0.32, 0.16], [rearDoorX + 0.66, 1.72, back + 0.34], materials.steelWet);

  addBox(group, [0.34, height, depth], [left, height * 0.5 + 0.36, centerZ], materials.wallDark);
  addBox(group, [0.34, height, depth], [right, height * 0.5 + 0.36, centerZ], materials.wall);
  addBox(group, [width, 0.72, 0.38], [centerX, height + 0.25, front], materials.wallDark);
  addBox(group, [0.48, height, 0.48], [left + 0.2, height * 0.5 + 0.35, front], materials.metalDark);
  addBox(group, [0.48, height, 0.48], [right - 0.2, height * 0.5 + 0.35, front], materials.metalDark);

  addBox(group, [width * 0.34, 0.26, depth + 0.45], [centerX - width * 0.31, height + 0.48, centerZ - 0.3], materials.metalDark, { rotation: [0.03, 0, -0.015] });
  addBox(group, [width * 0.18, 0.22, depth + 0.35], [centerX + width * 0.38, height + 0.45, centerZ - 0.4], materials.rust, { rotation: [0.02, 0, 0.012] });
  for (let index = 0; index < 8; index += 1) {
    addBox(group, [0.07, 0.26, depth + 0.4], [left + 0.8 + index * 1.15, height + 0.47, centerZ - 0.3], materials.metal, { castShadow: false });
  }

  const shutter = new THREE.Group();
  shutter.position.set(centerX, 3.15, front + 0.25);
  group.add(shutter);
  for (let index = 0; index < 8; index += 1) {
    addBox(shutter, [7.1 - index * 0.03, 0.19, 0.14], [0, index * 0.2, 0], index % 3 === 0 ? materials.rust : materials.metal, { castShadow: false });
  }
  shutter.userData.baseX = centerX;

  addBox(group, [0.72, height, 0.72], [centerX, height * 0.5 + 0.36, centerZ + 0.35], materials.concreteDark);
  addBox(group, [0.96, 0.28, 0.96], [centerX, 0.55, centerZ + 0.35], materials.rust);
  addShelf(group, [left + 1.2, 0.45, back + 1.1], 3.2, 4.1, 1.0, materials, { rotationY: Math.PI / 2, levels: 5 });
  addShelf(group, [right - 1.05, 0.45, centerZ - 0.2], 1.0, 3.8, 3.6, materials, { levels: 4 });

  addBox(group, [3.7, 0.24, 2.8], [centerX + 2.3, 2.85, back + 1.55], materials.metalDark);
  addBox(group, [3.25, 1.65, 0.18], [centerX + 2.3, 3.8, back + 0.18], materials.rust);
  addWindow(group, [centerX + 2.3, 3.82, back + 0.31], 1.45, 0.72, materials, { boards: 1 });
  addLadder(group, [centerX + 0.38, 0.45, back + 2.0], 2.5, 0.62, materials);
  addGuardRail(group, [centerX + 0.4, 2.98, back + 2.9], [right - 0.3, 2.98, back + 2.9], 0.72, materials);
  addGuardRail(group, [right - 0.3, 2.98, back + 0.35], [right - 0.3, 2.98, back + 2.9], 0.72, materials);

  addForklift(group, [centerX - 1.9, 0.46, centerZ + 1.15], materials, { rotationY: -0.44 });
  addSandbagWall(group, [centerX + 2.0, 0.46, centerZ + 1.65], 2.2, materials, { rows: 3, rotationY: 0.04 });
  addCrate(group, [centerX - 3.6, 0.45, centerZ + 2.1], 1.2, materials.wood, materials.woodDark, { rotationY: 0.08 });
  addCrate(group, [centerX - 3.55, 1.34, centerZ + 2.08], 0.94, materials.cardboard, materials.woodDark, { rotationY: -0.08 });
  addCrate(group, [centerX + 3.1, 0.45, centerZ + 2.6], 1.05, materials.wood, materials.woodDark, { rotationY: -0.16 });
  addCrate(group, [centerX + 3.2, 1.38, centerZ + 2.55], 0.8, materials.wood, materials.woodDark, { rotationY: 0.12 });
  addDumpster(group, [centerX + 3.4, 0.44, back + 1.4], materials.green, materials.metalDark, { rotationY: Math.PI / 2 });

  const sortingX = centerX + 1.85;
  const sortingZ = back + 0.82;
  addBox(group, [2.25, 0.16, 0.92], [sortingX, 1.32, sortingZ], materials.metal, { rotation: [0.03, 0, -0.025] });
  for (const x of [sortingX - 0.82, sortingX + 0.82]) {
    addBox(group, [0.1, 0.86, 0.1], [x, 0.86, sortingZ], materials.steelWet);
  }
  addBox(group, [0.72, 0.42, 0.58], [sortingX - 0.5, 1.58, sortingZ], materials.cardboard, { rotation: [0, 0.12, 0] });
  addBox(group, [0.56, 0.3, 0.5], [sortingX + 0.5, 1.53, sortingZ - 0.08], materials.cardboard, { rotation: [0, -0.18, 0.04] });
  for (let strap = 0; strap < 3; strap += 1) {
    addBox(group, [0.055, 0.022, 2.2], [centerX - 0.1 + strap * 0.22, 0.465, centerZ + 2.4], materials.yellow, { rotation: [0, 0.1 + strap * 0.06, 0], castShadow: false });
  }
  for (let paper = 0; paper < 5; paper += 1) {
    addBox(group, [0.5, 0.018, 0.34], [centerX - 2.4 + paper * 0.24, 0.47 + paper * 0.002, centerZ + 2.5 + (paper % 2) * 0.18], materials.ivory, { rotation: [0, 0.35 * paper, 0], castShadow: false });
  }

  addWindow(group, [right + 0.19, 2.7, centerZ - 2.0], 1.15, 1.05, materials, { rotationY: Math.PI / 2, boards: 2 });
  addWindow(group, [right + 0.19, 2.7, centerZ + 0.15], 1.1, 1.05, materials, { rotationY: Math.PI / 2 });
  addBox(group, [0.12, 2.5, 1.5], [right + 0.2, 1.65, centerZ + 2.45], materials.metalDark);
  addWindow(group, [right + 0.28, 2.05, centerZ + 2.45], 1.18, 1.55, materials, { rotationY: Math.PI / 2 });
  addAirConditioner(group, [right + 0.68, 3.7, centerZ - 1.5], materials, { rotationY: Math.PI / 2 });
  addDecal(group, 2.6, 1.15, [centerX - 2.5, 4.05, front + 0.205], materials.graffitiA, [0, 0, -0.03]);
  addDecal(group, 1.5, 0.65, [right + 0.205, 1.05, centerZ + 0.15], materials.signBlue, [0, Math.PI / 2, 0]);
  addBulletMarks(group, [right + 0.205, 1.55, centerZ + 0.2], 26, 1.6, 1.5, materials, Math.PI / 2);

  const coldFixture = addCagedLight(group, [centerX, 4.15, centerZ - 0.1], materials, { cold: true });
  coldFixture.rotation.x = Math.PI / 2;
  const coldFixture2 = addCagedLight(group, [centerX - 2.7, 3.8, centerZ - 2.3], materials, { cold: true });
  coldFixture2.rotation.x = Math.PI / 2;
  const coldFixtures = [coldFixture, coldFixture2];

  addBox(group, [0.24, 1.7, 0.2], [rearDoorX + 0.55, 1.28, back + 0.25], materials.rust);
  addBox(group, [0.14, 0.48, 0.14], [rearDoorX - 0.42, 1.58, back + 0.34], materials.redLight, { castShadow: false });

  function update(time) {
    shutter.position.x = shutter.userData.baseX + Math.sin(time * 17.3) * Math.sin(time * 0.71) * 0.012;
    coldFixtures.forEach((fixture, index) => {
      fixture.rotation.z = Math.sin(time * (index + 2) * 0.7) * 0.012;
    });
  }

  return {
    group,
    steamOrigin: new THREE.Vector3(rearDoorX - 0.42, 1.9, back + 0.36),
    update,
  };
}

function buildGuardhouse(world, materials) {
  const group = new THREE.Group();
  group.name = 'b-bombsite-guardhouse';
  world.add(group);

  const x = 8.6;
  const z = -9.3;
  addBox(group, [6.2, 0.22, 5.2], [x, 0.36, z], materials.concreteDark);

  const rearDoorWidth = 2.05;
  const rearSideWidth = (6.2 - rearDoorWidth) * 0.5;
  addBox(group, [rearSideWidth, 3.15, 0.3], [x - rearDoorWidth * 0.5 - rearSideWidth * 0.5, 1.95, z - 2.45], materials.wallDark);
  addBox(group, [rearSideWidth, 3.15, 0.3], [x + rearDoorWidth * 0.5 + rearSideWidth * 0.5, 1.95, z - 2.45], materials.wallDark);
  addBox(group, [rearDoorWidth + 0.18, 0.78, 0.3], [x, 2.76, z - 2.45], materials.wallDark);
  addBox(group, [rearDoorWidth, 2.27, 0.08], [x, 1.58, z - 2.29], materials.dark, { castShadow: false });

  const rearDoorLeaf = new THREE.Group();
  rearDoorLeaf.position.set(x - 0.51, 0.46, z - 2.22);
  rearDoorLeaf.rotation.y = 0.42;
  group.add(rearDoorLeaf);
  addBox(rearDoorLeaf, [0.98, 2.2, 0.11], [0, 1.1, 0], materials.metalDark);
  addBox(rearDoorLeaf, [0.08, 0.25, 0.15], [0.31, 1.05, 0.08], materials.steelWet);
  addBox(group, [0.98, 2.2, 0.11], [x + 0.51, 1.56, z - 2.22], materials.metalDark);
  addBox(group, [0.08, 0.25, 0.15], [x + 0.18, 1.51, z - 2.14], materials.steelWet);

  addBox(group, [0.3, 3.15, 5.2], [x - 3.0, 1.95, z], materials.wall);
  addBox(group, [0.3, 3.15, 5.2], [x + 3.0, 1.95, z], materials.wallDark);
  addBox(group, [0.42, 3.2, 0.42], [x - 2.8, 1.95, z + 2.4], materials.metalDark);
  addBox(group, [0.42, 3.2, 0.42], [x + 2.8, 1.95, z + 2.4], materials.metalDark);
  addBox(group, [5.6, 0.48, 0.38], [x, 3.15, z + 2.4], materials.rust);

  addWindow(group, [x - 1.65, 2.05, z + 2.58], 1.65, 1.45, materials, { boards: 1 });
  addWindow(group, [x + 1.45, 2.05, z + 2.58], 1.55, 1.45, materials);
  addBox(group, [1.05, 2.3, 0.12], [x + 0.15, 1.55, z + 2.58], materials.metalDark);
  addWindow(group, [x + 0.15, 1.95, z + 2.66], 0.82, 1.25, materials, { rotationY: 0, boards: 1 });

  addBox(group, [6.2, 0.28, 5.2], [x, 3.47, z], materials.metalDark);
  addBox(group, [5.4, 0.24, 4.6], [x, 6.55, z - 0.15], materials.rust, { rotation: [0.025, 0, -0.01] });
  addBox(group, [6.3, 0.3, 0.3], [x, 6.42, z + 2.5], materials.metalDark);
  addGuardRail(group, [x - 2.7, 6.72, z + 2.45], [x + 2.7, 6.72, z + 2.45], 0.72, materials);
  addGuardRail(group, [x + 2.72, 6.72, z - 1.9], [x + 2.72, 6.72, z + 2.45], 0.72, materials);
  addBox(group, [2.2, 0.16, 1.45], [x - 1.35, 3.73, z + 0.2], materials.metalDark);
  addWindow(group, [x - 1.35, 4.45, z + 2.38], 1.75, 1.25, materials, { boards: 2 });
  addBox(group, [0.18, 1.4, 2.2], [x - 2.72, 4.48, z - 0.3], materials.metalDark);
  addBox(group, [0.18, 1.4, 2.2], [x + 2.72, 4.48, z - 0.3], materials.metalDark);
  addWindow(group, [x + 2.76, 4.48, z - 0.3], 1.75, 1.2, materials, { rotationY: Math.PI / 2 });

  addLadder(group, [x + 3.17, 0.46, z], 6.05, 0.82, materials, { rotationY: Math.PI / 2 });
  addBox(group, [1.15, 0.14, 1.18], [x + 3.6, 3.42, z], materials.metalDark);
  for (let hoop = 0; hoop < 4; hoop += 1) {
    const y = 2.25 + hoop * 1.05;
    addTorus(group, 0.58, 0.026, [x + 3.43, y, z], materials.steelWet, {
      rotation: [Math.PI / 2, 0, 0],
      radialSegments: 5,
      tubularSegments: 18,
    });
  }
  for (let bar = 0; bar < 5; bar += 1) {
    const angle = bar / 5 * Math.PI * 2;
    addPipe(
      group,
      [x + 3.43 + Math.cos(angle) * 0.58, 2.25, z + Math.sin(angle) * 0.58],
      [x + 3.43 + Math.cos(angle) * 0.58, 5.4, z + Math.sin(angle) * 0.58],
      0.022,
      materials.steelWet,
      { segments: 6 },
    );
  }
  addGuardRail(group, [x + 3.0, 3.48, z - 0.6], [x + 4.12, 3.48, z - 0.6], 0.66, materials);
  addGuardRail(group, [x + 4.12, 3.48, z - 0.6], [x + 4.12, 3.48, z + 0.6], 0.66, materials);
  addDecal(group, 0.82, 0.56, [x - 2.83, 2.05, z - 0.4], materials.dutyRoster, [0, Math.PI / 2, 0]);

  addDesk(group, [x - 1.3, 0.5, z - 1.0], materials, { rotationY: 0.18 });
  addChair(group, [x - 1.25, 0.47, z - 0.05], materials, { rotationY: 0.18, rotationZ: 0.04 });
  addBox(group, [0.8, 1.8, 0.52], [x + 2.3, 1.35, z - 1.55], materials.metalDark);
  for (let drawer = 0; drawer < 4; drawer += 1) {
    addBox(group, [0.65, 0.05, 0.06], [x + 2.22, 0.82 + drawer * 0.36, z - 1.27], materials.steel, { castShadow: false });
  }
  const fixture = addCagedLight(group, [x, 3.05, z - 0.2], materials, { cold: false });
  fixture.rotation.x = Math.PI / 2;
  addBox(group, [2.0, 0.05, 0.18], [x, 5.8, z - 0.3], materials.coldLight, { castShadow: false });
  addBox(group, [2.2, 0.12, 0.28], [x, 5.9, z - 0.3], materials.metalDark);

  addPallet(group, [5.1, 0.4, -4.3], 1.9, 1.25, materials.wood, materials.woodDark);
  addPallet(group, [5.2, 0.69, -4.3], 1.75, 1.18, materials.wood, materials.woodDark, { rotationY: 0.06 });
  addDumpster(group, [11.7, 0.37, -4.9], materials.green, materials.metalDark, { rotationY: 0.06 });
  addBicycle(group, [7.0, 0.39, -4.5], materials, { rotationY: 0.62, rotationZ: 0.08 });
  addChair(group, [10.0, 1.08, -4.25], materials, { rotationY: -0.5, rotationZ: 1.25 });
  addChair(group, [10.8, 1.08, -4.75], materials, { rotationY: 0.35, rotationZ: 1.38 });
  addBox(group, [1.25, 0.1, 0.72], [9.0, 0.55, -4.9], materials.woodDark, { rotation: [0, 0.25, 1.35] });

  addDecal(group, 2.2, 0.88, [x - 0.2, 2.5, z + 2.6], materials.graffitiB, [0, 0, 0.02]);
  addDecal(group, 1.1, 0.55, [x + 3.17, 1.15, z + 0.3], materials.signBlue, [0, Math.PI / 2, 0]);
  addBulletMarks(group, [x - 1.65, 1.35, z + 2.67], 18, 1.6, 1.2, materials);

  function update(time) {
    fixture.rotation.z = Math.sin(time * 2.4) * 0.018;
  }

  return {
    group,
    steamOrigin: new THREE.Vector3(x - 2.3, 1.6, z - 2.63),
    update,
  };
}

function buildMidLane(world, materials) {
  const group = new THREE.Group();
  group.name = 'central-duel-lane';
  world.add(group);

  for (const side of [-1, 1]) {
    addBox(group, [0.5, 3.8, 7.2], [side * 4.35, 2.15, 0], materials.concreteDark);
    addBox(group, [0.58, 0.24, 7.5], [side * 4.35, 4.12, 0], materials.rust);
    addBox(group, [2.1, 1.2, 4.3], [side * 5.55, 0.92, 0], materials.concrete);
    addStairs(group, [side * 5.55, 0.35, -3.35], 1.4, 2.0, 0.86, 4, materials.concreteDark, { rotationY: side < 0 ? 0 : Math.PI, rails: true, railMaterial: materials.steelWet });
    addBox(group, [0.12, 0.7, 1.05], [side * 4.05, 2.88, -0.8], materials.dark, { castShadow: false });
    addGuardRail(group, [side * 4.5, 1.55, -2.05], [side * 6.5, 1.55, -2.05], 0.72, materials);
  }

  for (const side of [-1, 1]) {
    const boothX = side * 5.55;
    const boothZ = 1.25;
    addBox(group, [1.72, 0.14, 2.05], [boothX, 1.58, boothZ], materials.concreteDark);
    addBox(group, [1.72, 1.72, 0.14], [boothX, 2.48, boothZ + 0.96], materials.wallDark);
    addBox(group, [0.14, 1.72, 2.05], [boothX + side * 0.79, 2.48, boothZ], materials.wall);
    addBox(group, [1.9, 0.16, 2.25], [boothX, 3.4, boothZ], materials.rust, { rotation: [0, 0, side * 0.018] });
    addWindow(
      group,
      [boothX - side * 0.8, 2.52, boothZ + 0.05],
      1.48,
      1.08,
      materials,
      { rotationY: side < 0 ? Math.PI / 2 : -Math.PI / 2 },
    );
    addDesk(group, [boothX, 1.66, boothZ + 0.18], materials, { rotationY: side * 0.06 });
    addChair(group, [boothX + side * 0.16, 1.64, boothZ - 0.55], materials, { rotationY: side * 0.1, rotationZ: 0.03 });
    const boothFixture = addCagedLight(group, [boothX, 3.2, boothZ + 0.15], materials, { cold: side < 0 });
    boothFixture.rotation.x = Math.PI / 2;
  }

  addBox(group, [0.62, 4.35, 0.72], [-2.25, 2.45, 0], materials.metalDark);
  addBox(group, [0.62, 4.35, 0.72], [2.25, 2.45, 0], materials.metalDark);
  addBox(group, [5.1, 0.55, 0.75], [0, 4.3, 0], materials.rust);
  addBox(group, [4.15, 0.18, 0.18], [0, 4.0, 0], materials.steelWet);

  const leftGate = new THREE.Group();
  leftGate.position.set(-2.0, 0.36, 0.22);
  leftGate.rotation.y = -0.58;
  group.add(leftGate);
  addBox(leftGate, [2.0, 3.3, 0.18], [-0.95, 1.7, 0], materials.metalDark);
  for (let index = 0; index < 5; index += 1) {
    addBox(leftGate, [0.08, 3.05, 0.23], [-1.72 + index * 0.39, 1.7, 0], materials.steelWet, { castShadow: false });
  }
  addBox(leftGate, [1.78, 0.11, 0.23], [-0.95, 0.25, 0], materials.rust);
  addBox(leftGate, [1.78, 0.11, 0.23], [-0.95, 3.05, 0], materials.rust);

  const rightGate = leftGate.clone(true);
  rightGate.position.x = 2.0;
  rightGate.rotation.y = 0.58;
  rightGate.scale.x = -1;
  group.add(rightGate);

  addJerseyBarrier(group, [-0.8, 0.35, 7.2], materials.concrete, { length: 2.7, rotationY: 0.04 });
  addCrate(group, [1.2, 0.35, 7.55], 1.1, materials.wood, materials.woodDark, { rotationY: -0.1 });
  addCrate(group, [1.18, 1.18, 7.56], 0.86, materials.cardboard, materials.woodDark, { rotationY: 0.08 });
  addBox(group, [0.1, 1.4, 1.5], [2.4, 1.1, 6.2], materials.metalDark, { rotation: [0, 0, -0.04] });
  addDecal(group, 1.15, 0.72, [2.34, 1.4, 6.2], materials.signYellow, [0, -Math.PI / 2, 0.05]);

  addBox(group, [1.32, 0.1, 14.2], [2.85, 0.36, 2.15], materials.dark, { castShadow: false });
  for (const x of [2.15, 3.55]) {
    addBox(group, [0.3, 1.12, 14.2], [x, 0.93, 2.15], materials.concreteDark);
    addBox(group, [0.38, 0.16, 14.35], [x, 1.54, 2.15], materials.rust);
  }
  for (let z = -3.85; z < 8.3; z += 2.25) {
    addBox(group, [1.7, 0.18, 0.22], [2.85, 1.46, z], materials.metalDark);
    addBox(group, [0.16, 0.9, 0.16], [2.24, 0.96, z], materials.steelWet, { castShadow: false });
    addBox(group, [0.16, 0.9, 0.16], [3.46, 0.96, z], materials.steelWet, { castShadow: false });
    if ((z + 3.85) % 4.5 < 0.1) {
      addBox(group, [0.62, 0.05, 0.24], [2.85, 1.34, z], materials.coldLight, { castShadow: false });
    }
  }
  for (const slabZ of [-1.25, 3.25, 7.25]) {
    addBox(group, [1.78, 0.2, 1.9], [2.85, 1.5, slabZ], materials.concreteDark);
  }
  for (const z of [-4.72, 9.18]) {
    addBox(group, [0.34, 1.15, 0.38], [2.15, 0.93, z], materials.rust);
    addBox(group, [0.34, 1.15, 0.38], [3.55, 0.93, z], materials.rust);
    addBox(group, [1.76, 0.28, 0.42], [2.85, 1.42, z], materials.rust);
  }
  addDrainGrate(group, [2.85, 0.43, 9.52], [1.3, 1.1], materials);
  addDrainGrate(group, [2.85, 0.43, -5.02], [1.3, 1.1], materials);
  for (let z = -3.2; z < 8; z += 2.25) {
    addBox(group, [1.2, 0.045, 0.38], [2.85, 0.43, z], materials.metalDark, { castShadow: false });
  }

  addDecal(group, 2.3, 0.8, [-4.03, 1.2, 0], materials.graffitiA, [0, Math.PI / 2, 0.02]);
  addBulletMarks(group, [-4.02, 2.1, 1.2], 24, 2.0, 1.8, materials, Math.PI / 2);
  return group;
}

function buildCTSpawn(world, materials) {
  const group = new THREE.Group();
  group.name = 'ct-spawn';
  world.add(group);

  addBox(group, [29.7, 2.35, 0.48], [0, 1.43, 15.25], materials.concreteDark);
  for (let x = -14; x <= 14; x += 2.2) {
    addBox(group, [0.18, 2.5, 0.58], [x, 1.48, 15.17], materials.concrete, { castShadow: false });
  }
  addDecal(group, 3.2, 1.2, [0, 1.55, 14.98], materials.signPolice, [0, Math.PI, 0]);

  addPoliceVan(group, [-7.0, 0.34, 12.1], materials, { rotationY: 0.03 });
  addJerseyBarrier(group, [-0.8, 0.34, 9.0], materials.concrete, { length: 2.8, rotationY: 0.04 });
  addTrafficBarrier(group, [2.6, 0.34, 9.2], materials.ivory, { rotationY: 0.05, stripeMaterial: materials.blue });
  addTrafficBarrier(group, [4.65, 0.34, 9.35], materials.ivory, { rotationY: -0.08, stripeMaterial: materials.blue });

  for (let index = 0; index < 3; index += 1) {
    addBox(group, [0.12, 1.05, 0.72], [0.15 + index * 0.58, 0.88, 8.6], materials.blueDark, { rotation: [0.08, 0, 0.04 * (index - 1)] });
    addBox(group, [0.07, 0.24, 0.34], [0.15 + index * 0.58, 1.2, 8.58], materials.ivory, { castShadow: false });
  }

  addBox(group, [5.6, 1.35, 5.2], [7.55, 0.92, 11.2], materials.concrete);
  addStairs(group, [7.55, 0.34, 7.85], 2.2, 2.5, 1.35, 6, materials.concreteDark, { rails: true, railMaterial: materials.steelWet });
  addGuardRail(group, [4.78, 1.62, 8.75], [4.78, 1.62, 13.85], 0.78, materials);
  addGuardRail(group, [10.32, 1.62, 8.75], [10.32, 1.62, 13.85], 0.78, materials);
  addBox(group, [0.18, 3.1, 0.18], [7.4, 3.1, 12.9], materials.metalDark);
  addBox(group, [1.25, 0.82, 0.32], [7.4, 4.42, 12.9], materials.metalDark, { rotation: [0.18, 0, 0] });
  addBox(group, [1.05, 0.58, 0.06], [7.4, 4.4, 12.7], materials.coldLight, { rotation: [0.18, 0, 0], castShadow: false });

  addBox(group, [2.0, 0.82, 1.1], [-2.0, 0.78, 13.8], materials.metalDark);
  addBox(group, [1.82, 0.18, 0.96], [-2.0, 1.28, 13.8], materials.blueDark);
  addDecal(group, 0.85, 0.55, [-2.0, 0.92, 12.23], materials.signPolice, [0, 0, 0]);
  addSphere(group, 0.28, [-2.55, 1.48, 13.65], materials.sandbag, { scale: [1, 0.72, 1.1], widthSegments: 8, heightSegments: 6 });
  addBox(group, [0.32, 0.62, 0.24], [-1.85, 1.57, 13.65], materials.black, { rotation: [0, 0, -0.12] });
  return group;
}

function buildFlanks(world, materials) {
  const group = new THREE.Group();
  group.name = 'flank-routes';
  world.add(group);

  addBox(group, [2.35, 0.1, 24.7], [-14.45, 0.32, 1.4], materials.concreteDark);
  addBox(group, [1.4, 0.12, 13.3], [14.55, 0.33, 2.5], materials.metalDark);
  addBox(group, [1.65, 1.1, 13.2], [14.55, 0.86, 2.6], materials.concreteDark);
  addGuardRail(group, [13.73, 1.44, -3.7], [13.73, 1.44, 8.85], 0.78, materials);
  addGuardRail(group, [15.35, 1.44, -3.7], [15.35, 1.44, 8.85], 0.78, materials);
  for (let z = -3; z <= 8; z += 2.75) {
    addBox(group, [0.16, 1.12, 0.16], [14.55, 0.75, z], materials.metalDark);
  }
  addStairs(group, [14.55, 0.34, -4.8], 1.45, 2.2, 1.2, 5, materials.concreteDark, { rotationY: Math.PI, rails: true, railMaterial: materials.steelWet });

  addDumpster(group, [-14.25, 0.36, 2.8], materials.green, materials.metalDark, { rotationY: Math.PI / 2 });
  addTireStack(group, [-14.3, 0.36, 5.0], 4, materials.rubber);
  addCrate(group, [-14.15, 0.36, 7.3], 1.15, materials.cardboard, materials.woodDark, { rotationY: 0.2 });
  addCrate(group, [-14.1, 1.23, 7.28], 0.9, materials.wood, materials.woodDark, { rotationY: -0.08 });
  addJerseyBarrier(group, [-14.1, 0.36, 9.4], materials.concrete, { length: 2.4, rotationY: Math.PI / 2 });
  addJerseyBarrier(group, [-14.1, 0.36, -1.1], materials.concrete, { length: 2.4, rotationY: Math.PI / 2 });
  addBollard(group, [-13.55, 0.35, 0.4], materials, { height: 0.9 });
  addBollard(group, [-13.55, 0.35, 1.55], materials, { height: 0.9 });
  return group;
}

function buildUtilityDetails(world, materials) {
  const group = new THREE.Group();
  group.name = 'utility-details';
  world.add(group);

  const poles = [
    [-14.25, -2.6],
    [14.2, -13.6],
    [14.35, 6.8],
    [-14.3, 12.7],
  ];
  for (const [x, z] of poles) {
    addCylinder(group, 0.11, 5.6, [x, 2.9, z], materials.woodDark, { segments: 8 });
    addBox(group, [2.3, 0.12, 0.14], [x, 5.25, z], materials.woodDark);
    for (const offset of [-0.75, 0, 0.75]) {
      addCylinder(group, 0.045, 0.3, [x + offset, 5.47, z], materials.glass, { segments: 6, castShadow: false });
    }
  }

  const spans = [
    [[-14.25, 5.2, -2.6], [14.2, 5.2, -13.6]],
    [[14.2, 5.2, -13.6], [14.35, 5.2, 6.8]],
    [[14.35, 5.2, 6.8], [-14.3, 5.2, 12.7]],
    [[-14.3, 5.2, 12.7], [-14.25, 5.2, -2.6]],
  ];
  for (const [start, end] of spans) {
    for (let wire = 0; wire < 3; wire += 1) {
      const points = [];
      for (let index = 0; index <= 18; index += 1) {
        const t = index / 18;
        const x = THREE.MathUtils.lerp(start[0], end[0], t);
        const z = THREE.MathUtils.lerp(start[2], end[2], t);
        const y = THREE.MathUtils.lerp(start[1], end[1], t) - Math.sin(t * Math.PI) * (0.45 + wire * 0.12) - wire * 0.18;
        points.push([x, y, z]);
      }
      addLine(group, points, materials.wire);
    }
  }

  addStreetLamp(group, [13.25, 0.35, -3.35], materials, { rotationY: Math.PI, height: 3.9 });
  addStreetLamp(group, [-12.7, 0.35, 10.1], materials, { rotationY: -0.4, height: 3.4, cold: true });
  addStreetLamp(group, [11.8, 1.82, 9.5], materials, { rotationY: 0.3, height: 2.9, cold: true });

  for (const [x, z, rotation] of [[-12.4, -14.55, 0], [3.1, -15.3, Math.PI / 2], [14.9, 3.0, -Math.PI / 2]]) {
    addBox(group, [1.8, 1.35, 0.72], [x, 0.87, z], materials.metalDark, { rotation: [0, rotation, 0] });
    addBox(group, [1.55, 0.12, 0.78], [x, 1.61, z], materials.rust, { rotation: [0, rotation, 0.02] });
  }

  return group;
}

function buildLighting(scene, world, warehouse) {
  const hemisphere = new THREE.HemisphereLight(0x8bb7d1, 0x18242a, 2.15);
  scene.add(hemisphere);

  const ambient = new THREE.AmbientLight(0x344b5d, 0.92);
  scene.add(ambient);

  const moon = new THREE.DirectionalLight(0xa9d3eb, 3.1);
  moon.position.set(-14, 24, 12);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -22;
  moon.shadow.camera.right = 22;
  moon.shadow.camera.top = 22;
  moon.shadow.camera.bottom = -22;
  moon.shadow.camera.near = 3;
  moon.shadow.camera.far = 55;
  moon.shadow.bias = -0.00035;
  moon.shadow.normalBias = 0.025;
  scene.add(moon);

  const warehouseLight = new THREE.PointLight(0xc6eaff, 155, 12, 2.0);
  warehouseLight.position.set(-8.1, 3.9, -8.8);
  scene.add(warehouseLight);

  const warehouseBackLight = new THREE.PointLight(0xb8dfff, 48, 7, 2.0);
  warehouseBackLight.position.set(-5.2, 2.6, -12.4);
  scene.add(warehouseBackLight);

  const guardLight = new THREE.PointLight(0xffc66c, 135, 10, 2.0);
  guardLight.position.set(8.6, 2.8, -9.1);
  scene.add(guardLight);

  const streetLight = new THREE.PointLight(0xffbd61, 175, 12, 2.0);
  streetLight.position.set(12.4, 4.05, -3.5);
  scene.add(streetLight);

  const coldStreetLight = new THREE.PointLight(0x9edcff, 92, 9, 2.0);
  coldStreetLight.position.set(-12.0, 3.55, 10.0);
  scene.add(coldStreetLight);

  const underpassLightA = new THREE.PointLight(0x86c9d7, 28, 5.5, 2);
  const underpassLightB = new THREE.PointLight(0x86c9d7, 24, 5.5, 2);
  underpassLightA.position.set(2.85, 1.08, -1.4);
  underpassLightB.position.set(2.85, 1.08, 5.4);
  scene.add(underpassLightA, underpassLightB);

  const searchTarget = new THREE.Object3D();
  searchTarget.position.set(0.5, 0.4, 2.0);
  world.add(searchTarget);
  const searchlight = new THREE.SpotLight(0xc7e8ff, 245, 22, 0.38, 0.56, 1.65);
  searchlight.position.set(7.4, 4.8, 12.8);
  searchlight.target = searchTarget;
  scene.add(searchlight);

  const policeRed = new THREE.PointLight(0xff2828, 0, 7, 2);
  const policeBlue = new THREE.PointLight(0x2f7dff, 0, 7, 2);
  policeRed.position.set(-7.2, 3.1, 12.1);
  policeBlue.position.set(-6.8, 3.1, 12.1);
  scene.add(policeRed, policeBlue);

  const redVent = new THREE.PointLight(0xff3434, 34, 3.5, 2);
  redVent.position.copy(warehouse.steamOrigin).add(new THREE.Vector3(0, 0.15, 0));
  scene.add(redVent);

  let emergencyMeshes = [];
  function setEmergencyMeshes(meshes) {
    emergencyMeshes = meshes;
  }

  function update(time) {
    const slowPulse = 0.5 + Math.sin(time * 2.1) * 0.5;
    streetLight.intensity = 170 + Math.sin(time * 8.2) * 7 + Math.sin(time * 19.7) * 3.2;
    coldStreetLight.intensity = 88 + slowPulse * 7;
    searchlight.intensity = 240 + Math.sin(time * 5.4) * 14;
    searchlight.target.position.x = 0.5 + Math.sin(time * 0.38) * 1.6;
    guardLight.intensity = 130 + Math.sin(time * 11.6) * 6;

    const policeCycle = (Math.sin(time * 5.6) + 1) * 0.5;
    policeRed.intensity = 6 + policeCycle * 32;
    policeBlue.intensity = 6 + (1 - policeCycle) * 32;
    if (emergencyMeshes[0]) emergencyMeshes[0].visible = policeCycle > 0.18;
    if (emergencyMeshes[1]) emergencyMeshes[1].visible = policeCycle < 0.82;
  }

  return {
    hemisphere,
    ambient,
    moon,
    searchlight,
    setEmergencyMeshes,
    update,
  };
}

export function buildWorld(scene, materials) {
  const world = buildBase(scene, materials);
  const tSpawn = buildTSpawn(world, materials);
  const warehouse = buildWarehouse(world, materials);
  const guardhouse = buildGuardhouse(world, materials);
  const mid = buildMidLane(world, materials);
  const ctSpawn = buildCTSpawn(world, materials);
  const flanks = buildFlanks(world, materials);
  const utilities = buildUtilityDetails(world, materials);
  const lights = buildLighting(scene, world, warehouse);

  const emergencyMeshes = [];
  ctSpawn.traverse((object) => {
    if (object.userData?.emergencyLights) {
      emergencyMeshes.push(object.userData.emergencyLights.red, object.userData.emergencyLights.blue);
    }
  });

  lights.setEmergencyMeshes(emergencyMeshes);

  function update(time) {
    warehouse.update(time);
    guardhouse.update(time);
    lights.update(time);
  }

  return {
    world,
    regions: { tSpawn, warehouse, guardhouse, mid, ctSpawn, flanks, utilities },
    lights,
    update,
  };
}
