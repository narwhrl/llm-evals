import * as THREE from 'three';

import { getHeight } from './terrain.js';

const UNIT_CUBE = new THREE.BoxGeometry(1, 1, 1);
const MAX_TREES = 420;
const MAX_CLOUD_VOXELS = 560;
const FLOW_DUMMY = new THREE.Object3D();

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function worldCoordinate(index, size) {
  return index - size / 2 + 0.5;
}

function exposedDepth(map, x, z, height) {
  const lowestNeighbor = Math.min(
    getHeight(map, x - 1, z),
    getHeight(map, x + 1, z),
    getHeight(map, x, z - 1),
    getHeight(map, x, z + 1),
  );
  return Math.max(1, height - lowestNeighbor);
}

function terrainColor(color, x, z, level, surfaceHeight, maxHeight) {
  const topBlock = level === surfaceHeight;
  if (topBlock && level >= maxHeight * 0.78) color.set(0xd8ded4);
  else if (topBlock && level >= maxHeight * 0.58) color.set(0x7c8177);
  else if (topBlock && level >= maxHeight * 0.34) color.set(0x53674a);
  else if (topBlock && level >= 6) color.set(0x3f6648);
  else if (topBlock) color.set(0x66754b);
  else if (level < 8) color.set(0x5a4e39);
  else color.set(0x67675e);

  const variation = (((x * 73856093) ^ (z * 19349663) ^ (level * 83492791)) >>> 0) % 7;
  color.offsetHSL(0, 0, (variation - 3) * 0.012);
}

export function createTerrainMesh(map, cellSize = 1) {
  let faceCount = 0;
  let voxelCount = 0;
  for (let z = 0; z < map.size; z += 1) {
    for (let x = 0; x < map.size; x += 1) {
      const height = getHeight(map, x, z);
      const westHeight = getHeight(map, x - 1, z);
      const eastHeight = getHeight(map, x + 1, z);
      const northHeight = getHeight(map, x, z - 1);
      const southHeight = getHeight(map, x, z + 1);
      voxelCount += exposedDepth(map, x, z, height);
      if (cellSize > 1) {
        faceCount +=
          1 +
          Number(height > westHeight) +
          Number(height > eastHeight) +
          Number(height > northHeight) +
          Number(height > southHeight);
      } else {
        faceCount +=
          1 +
          Math.max(0, height - westHeight) +
          Math.max(0, height - eastHeight) +
          Math.max(0, height - northHeight) +
          Math.max(0, height - southHeight);
      }
    }
  }

  const positions = new Float32Array(faceCount * 12);
  const normals = new Float32Array(faceCount * 12);
  const colors = new Float32Array(faceCount * 12);
  const indices = new Uint32Array(faceCount * 6);
  const color = new THREE.Color();
  let faceIndex = 0;

  function addFace(vertices, normal, x, z, level, surfaceHeight) {
    terrainColor(color, x, z, level, surfaceHeight, map.maxHeight);
    const vertexOffset = faceIndex * 12;
    const indexOffset = faceIndex * 6;
    const firstVertex = faceIndex * 4;
    for (let vertex = 0; vertex < 4; vertex += 1) {
      const target = vertexOffset + vertex * 3;
      const source = vertex * 3;
      positions[target] = vertices[source];
      positions[target + 1] = vertices[source + 1];
      positions[target + 2] = vertices[source + 2];
      normals[target] = normal[0];
      normals[target + 1] = normal[1];
      normals[target + 2] = normal[2];
      colors[target] = color.r;
      colors[target + 1] = color.g;
      colors[target + 2] = color.b;
    }
    indices.set(
      [firstVertex, firstVertex + 1, firstVertex + 2, firstVertex, firstVertex + 2, firstVertex + 3],
      indexOffset,
    );
    faceIndex += 1;
  }

  for (let z = 0; z < map.size; z += 1) {
    for (let x = 0; x < map.size; x += 1) {
      const height = getHeight(map, x, z);
      const x0 = x * cellSize - (map.size * cellSize) / 2;
      const x1 = x0 + cellSize;
      const z0 = z * cellSize - (map.size * cellSize) / 2;
      const z1 = z0 + cellSize;
      addFace([x0, height, z0, x0, height, z1, x1, height, z1, x1, height, z0], [0, 1, 0], x, z, height, height);

      const westHeight = getHeight(map, x - 1, z);
      const westStep = cellSize > 1 ? Math.max(1, height - westHeight) : 1;
      for (let level = height; level > westHeight; level -= westStep) {
        const bottom = cellSize > 1 ? westHeight : level - 1;
        addFace([x0, bottom, z1, x0, level, z1, x0, level, z0, x0, bottom, z0], [-1, 0, 0], x, z, level, height);
      }
      const eastHeight = getHeight(map, x + 1, z);
      const eastStep = cellSize > 1 ? Math.max(1, height - eastHeight) : 1;
      for (let level = height; level > eastHeight; level -= eastStep) {
        const bottom = cellSize > 1 ? eastHeight : level - 1;
        addFace([x1, bottom, z0, x1, level, z0, x1, level, z1, x1, bottom, z1], [1, 0, 0], x, z, level, height);
      }
      const northHeight = getHeight(map, x, z - 1);
      const northStep = cellSize > 1 ? Math.max(1, height - northHeight) : 1;
      for (let level = height; level > northHeight; level -= northStep) {
        const bottom = cellSize > 1 ? northHeight : level - 1;
        addFace([x0, bottom, z0, x0, level, z0, x1, level, z0, x1, bottom, z0], [0, 0, -1], x, z, level, height);
      }
      const southHeight = getHeight(map, x, z + 1);
      const southStep = cellSize > 1 ? Math.max(1, height - southHeight) : 1;
      for (let level = height; level > southHeight; level -= southStep) {
        const bottom = cellSize > 1 ? southHeight : level - 1;
        addFace([x1, bottom, z1, x1, level, z1, x0, level, z1, x0, bottom, z1], [0, 0, 1], x, z, level, height);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeBoundingSphere();
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.95,
    vertexColors: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = '128x128 visible-face voxel terrain';
  return { faceCount, instanceCount: voxelCount, mesh };
}


function createFoamMesh(positions) {
  const material = new THREE.MeshBasicMaterial({
    color: 0xe9f8ed,
    transparent: true,
    opacity: 0.84,
    depthWrite: false,
  });
  const mesh = new THREE.InstancedMesh(UNIT_CUBE, material, positions.length);
  const dummy = new THREE.Object3D();

  positions.forEach((position, index) => {
    dummy.position.set(position.x, position.y, position.z);
    dummy.scale.set(position.scale, position.scale * 0.55, position.scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  mesh.renderOrder = 4;
  mesh.name = 'waterfall foam';
  return mesh;
}

export function createWaterfallMeshes(map, paths) {
  const group = new THREE.Group();
  const totalPoints = paths.reduce((sum, path) => sum + path.length, 0);
  const material = new THREE.MeshStandardMaterial({
    color: 0x72c7c2,
    emissive: 0x163e43,
    emissiveIntensity: 0.5,
    metalness: 0.05,
    opacity: 0.86,
    roughness: 0.18,
    transparent: true,
    depthWrite: false,
  });
  const water = new THREE.InstancedMesh(UNIT_CUBE, material, totalPoints);
  const dummy = new THREE.Object3D();
  const foamPositions = [];
  const pathCells = new Set();
  let index = 0;

  paths.forEach((path, pathIndex) => {
    const outwardX = pathIndex === 1 ? 0.46 : 0;
    const outwardZ = pathIndex === 0 ? 0.46 : 0;
    path.forEach((point, pointIndex) => {
      const x = worldCoordinate(point.x, map.size) + outwardX;
      const z = worldCoordinate(point.z, map.size) + outwardZ;
      const vertical = Boolean(point.vertical);
      dummy.position.set(x, vertical ? point.height + 0.05 : point.height + 0.12, z);
      if (vertical) {
        dummy.scale.set(pathIndex === 0 ? 0.76 : 0.2, 0.96, pathIndex === 0 ? 0.2 : 0.76);
      } else {
        dummy.scale.set(0.84, 0.18, 0.84);
      }
      dummy.updateMatrix();
      water.setMatrixAt(index, dummy.matrix);
      index += 1;
      pathCells.add(point.z * map.size + point.x);

      const next = path[pointIndex + 1];
      if ((!next || (!vertical && next.vertical)) && pointIndex > 0) {
        foamPositions.push({ x, y: point.height + 0.35, z, scale: next ? 0.68 : 1.25 });
      }
    });

    const end = path.at(-1);
    for (let foamIndex = 0; foamIndex < 9; foamIndex += 1) {
      const angle = (foamIndex / 9) * Math.PI * 2;
      foamPositions.push({
        x: worldCoordinate(end.x, map.size) + outwardX + Math.cos(angle) * (0.7 + (foamIndex % 3) * 0.3),
        y: end.height + 0.2 + (foamIndex % 2) * 0.16,
        z: worldCoordinate(end.z, map.size) + outwardZ + Math.sin(angle) * (0.7 + (foamIndex % 3) * 0.3),
        scale: 0.42 + (foamIndex % 3) * 0.12,
      });
    }
  });

  water.instanceMatrix.needsUpdate = true;
  water.computeBoundingSphere();
  water.renderOrder = 3;
  water.name = 'voxel waterfalls';
  group.add(water, createFoamMesh(foamPositions));

  const particles = createFlowParticles(map, paths);
  group.add(particles.mesh);
  return { group, material, particles, pathCells, water };
}

function createFlowParticles(map, paths) {
  const random = seededRandom(0xa71f0);
  const verticalPoints = paths.flatMap((path, pathIndex) =>
    path.filter((point) => point.vertical).map((point) => ({ ...point, pathIndex })),
  );
  const count = Math.min(96, Math.max(48, verticalPoints.length * 2));
  const material = new THREE.MeshBasicMaterial({
    color: 0xc7f2e7,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });
  const mesh = new THREE.InstancedMesh(UNIT_CUBE, material, count);
  const data = new Array(count);

  for (let index = 0; index < count; index += 1) {
    const point = verticalPoints[index % verticalPoints.length];
    data[index] = {
      phase: random(),
      size: 0.1 + random() * 0.16,
      x: worldCoordinate(point.x, map.size) + (point.pathIndex === 1 ? 0.55 : (random() - 0.5) * 0.42),
      y: point.height + 0.8,
      z: worldCoordinate(point.z, map.size) + (point.pathIndex === 0 ? 0.55 : (random() - 0.5) * 0.42),
    };
  }

  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  mesh.name = 'waterfall flow particles';
  return { data, mesh };
}

export function updateFlowParticles(particles, elapsed, speed, visible) {
  particles.mesh.visible = visible;
  if (!visible) return;
  const dummy = FLOW_DUMMY;
  for (let index = 0; index < particles.data.length; index += 1) {
    const particle = particles.data[index];
    const progress = (particle.phase + elapsed * speed * 0.46) % 1;
    dummy.position.set(particle.x, particle.y - progress * 2.8, particle.z);
    dummy.scale.set(particle.size, 0.18 + particle.size, particle.size);
    dummy.updateMatrix();
    particles.mesh.setMatrixAt(index, dummy.matrix);
  }
  particles.mesh.instanceMatrix.needsUpdate = true;
}

export function createVegetationMeshes(map, excludedCells) {
  const random = seededRandom(0x7ee51);
  const trees = [];

  for (let attempt = 0; attempt < 18000 && trees.length < MAX_TREES; attempt += 1) {
    const x = 3 + Math.floor(random() * (map.size - 6));
    const z = 3 + Math.floor(random() * (map.size - 6));
    const height = getHeight(map, x, z);
    const slope = Math.max(
      Math.abs(height - getHeight(map, x - 1, z)),
      Math.abs(height - getHeight(map, x + 1, z)),
      Math.abs(height - getHeight(map, x, z - 1)),
      Math.abs(height - getHeight(map, x, z + 1)),
    );
    if (height < 4 || height > 17 || slope > 2 || excludedCells.has(z * map.size + x) || random() > 0.16) {
      continue;
    }
    trees.push({ height, x: worldCoordinate(x, map.size), z: worldCoordinate(z, map.size) });
  }

  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x594c36, roughness: 1 });
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.96,
    vertexColors: true,
  });
  const trunks = new THREE.InstancedMesh(UNIT_CUBE, trunkMaterial, trees.length);
  const leaves = new THREE.InstancedMesh(UNIT_CUBE, leafMaterial, trees.length);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  trees.forEach((tree, index) => {
    dummy.position.set(tree.x, tree.height + 0.9, tree.z);
    dummy.scale.set(0.48, 1.8, 0.48);
    dummy.updateMatrix();
    trunks.setMatrixAt(index, dummy.matrix);

    dummy.position.set(tree.x, tree.height + 2.45, tree.z);
    dummy.scale.set(2.05, 2.35, 2.05);
    dummy.updateMatrix();
    leaves.setMatrixAt(index, dummy.matrix);
    color.set(0x31543d).offsetHSL(0, 0, (random() - 0.5) * 0.08);
    leaves.setColorAt(index, color);
  });

  trunks.instanceMatrix.needsUpdate = true;
  leaves.instanceMatrix.needsUpdate = true;
  leaves.instanceColor.needsUpdate = true;
  trunks.name = 'voxel tree trunks';
  leaves.name = 'voxel tree canopies';
  const group = new THREE.Group();
  group.add(trunks, leaves);
  return { group, leaves, maxTrees: trees.length, trunks };
}

export function createCloudMesh() {
  const random = seededRandom(0xc10d5);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    depthWrite: false,
    opacity: 0.47,
    transparent: true,
    vertexColors: true,
  });
  const mesh = new THREE.InstancedMesh(UNIT_CUBE, material, MAX_CLOUD_VOXELS);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  let index = 0;

  for (let cluster = 0; cluster < 44 && index < MAX_CLOUD_VOXELS; cluster += 1) {
    const angle = random() * Math.PI * 2;
    const radius = 18 + random() * 56;
    const centerX = Math.cos(angle) * radius + (random() - 0.5) * 18;
    const centerZ = Math.sin(angle) * radius + (random() - 0.5) * 18;
    const pieces = 9 + Math.floor(random() * 8);

    for (let piece = 0; piece < pieces && index < MAX_CLOUD_VOXELS; piece += 1) {
      const distance = random() * 10;
      const pieceAngle = random() * Math.PI * 2;
      dummy.position.set(
        centerX + Math.cos(pieceAngle) * distance,
        (random() - 0.5) * 5,
        centerZ + Math.sin(pieceAngle) * distance,
      );
      dummy.scale.set(3.4 + random() * 5.5, 1.1 + random() * 1.8, 2.8 + random() * 4.8);
      dummy.rotation.y = (random() - 0.5) * 0.25;
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      color.set(random() > 0.22 ? 0xe4ece5 : 0xb9c7c2).offsetHSL(0, 0, (random() - 0.5) * 0.04);
      mesh.setColorAt(index, color);
      index += 1;
    }
  }

  mesh.count = index;
  mesh.instanceMatrix.needsUpdate = true;
  mesh.instanceColor.needsUpdate = true;
  mesh.computeBoundingSphere();
  mesh.renderOrder = 2;
  mesh.name = 'mid-mountain voxel clouds';
  return { maxCount: index, material, mesh };
}

export function createLake() {
  const geometry = new THREE.BoxGeometry(300, 1.6, 300);
  const material = new THREE.MeshStandardMaterial({
    color: 0x315d61,
    metalness: 0.08,
    roughness: 0.28,
  });
  const lake = new THREE.Mesh(geometry, material);
  lake.position.y = 1.35;
  lake.name = 'mountain lake';
  return lake;
}

export function createSky() {
  const uniforms = {
    bottomColor: { value: new THREE.Color(0xa9b8ac) },
    topColor: { value: new THREE.Color(0x35565e) },
  };
  const material = new THREE.ShaderMaterial({
    depthWrite: false,
    side: THREE.BackSide,
    uniforms,
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 bottomColor;
      uniform vec3 topColor;
      varying vec3 vWorldPosition;
      void main() {
        float heightMix = smoothstep(-0.12, 0.72, normalize(vWorldPosition).y);
        gl_FragColor = vec4(mix(bottomColor, topColor, heightMix), 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(420, 32, 18), material);
  sky.name = 'gradient sky';
  return { sky, uniforms };
}
