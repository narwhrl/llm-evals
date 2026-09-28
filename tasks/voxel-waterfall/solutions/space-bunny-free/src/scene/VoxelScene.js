import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  BLOCK_HEIGHT,
  CELL_SIZE,
  GRID_SIZE,
  WATERFALLS,
  WORLD_SIZE,
  buildTerrain,
  colorForMaterial,
  gridToWorld,
  sampleWaterfall,
  seededRandom,
  terrainIndex,
} from './terrain.js';

const TERRAIN_COLORS = {
  grass: [0.19, 0.42, 0.23],
  grassLight: [0.31, 0.55, 0.27],
  grassDark: [0.12, 0.31, 0.2],
  rock: [0.35, 0.38, 0.39],
  rockLight: [0.49, 0.5, 0.47],
  rockDark: [0.22, 0.27, 0.29],
  snow: [0.84, 0.9, 0.88],
  sand: [0.69, 0.57, 0.35],
  wetStone: [0.22, 0.34, 0.33],
  water: [0.18, 0.76, 0.88],
  waterLight: [0.55, 0.98, 0.94],
  foam: [0.9, 0.98, 0.94],
  trunk: [0.42, 0.22, 0.11],
  leaf: [0.16, 0.52, 0.25],
  leafLight: [0.32, 0.7, 0.32],
};

const dummy = new THREE.Object3D();
const colorScratch = new THREE.Color();

function addInstancedBlocks(parent, entries, options = {}) {
  const {
    name = 'blocks',
    roughness = 0.86,
    metalness = 0.02,
    opacity = 1,
    transparent = false,
    depthWrite = true,
    renderOrder = 0,
    flatShading = true,
    unlit = false,
    color = 0xffffff,
    depthTest = true,
    vertexColors = true,
  } = options;

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = unlit
    ? new THREE.MeshBasicMaterial({
      color,
      opacity,
      transparent,
      depthWrite,
      depthTest,
      vertexColors,
    })
    : new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      opacity,
      transparent,
      depthWrite,
      depthTest,
      vertexColors,
      flatShading,
    });
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(entries.length, 1));
  mesh.name = name;
  mesh.count = entries.length;
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  mesh.frustumCulled = false;
  mesh.renderOrder = renderOrder;

  entries.forEach((entry, index) => {
    dummy.position.set(entry.x, entry.y, entry.z);
    dummy.rotation.set(0, entry.rotationY ?? 0, 0);
    dummy.scale.set(entry.sx, entry.sy, entry.sz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
    mesh.setColorAt(index, colorScratch.setRGB(entry.color[0], entry.color[1], entry.color[2]));
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  parent.add(mesh);
  return mesh;
}

function createTerrain(terrain) {
  const group = new THREE.Group();
  group.name = 'voxel-terrain';
  const capEntries = [];
  // Keep one visible top face for every logical 200 × 200 cell; indexed faces
  // preserve the voxel silhouette without paying for 40,000 separate cubes.
  const surfaceSize = GRID_SIZE;
  const surfaceCellSize = CELL_SIZE;
  const surfaceHeights = terrain.heights;
  const surfaceMaterials = terrain.materials;
  const neighborOffsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let sideQuadCount = 0;
  for (let surfaceZ = 0; surfaceZ < surfaceSize; surfaceZ += 1) {
    for (let surfaceX = 0; surfaceX < surfaceSize; surfaceX += 1) {
      const height = surfaceHeights[surfaceZ * surfaceSize + surfaceX];
      for (const [offsetX, offsetZ] of neighborOffsets) {
        const neighborX = surfaceX + offsetX;
        const neighborZ = surfaceZ + offsetZ;
        if (neighborX < 0 || neighborX >= surfaceSize || neighborZ < 0 || neighborZ >= surfaceSize) continue;
        if (height > surfaceHeights[neighborZ * surfaceSize + neighborX]) sideQuadCount += 1;
      }
    }
  }
  const topPositions = new Float32Array(surfaceSize * surfaceSize * 12);
  const topColors = new Float32Array(surfaceSize * surfaceSize * 12);
  const sidePositions = new Float32Array(sideQuadCount * 12);
  const sideColors = new Float32Array(sideQuadCount * 12);
  let topQuadIndex = 0;
  let sideQuadIndex = 0;

  const addQuad = (positions, colors, quadIndex, corners, color) => {
    const offset = quadIndex * 12;
    positions[offset] = corners[0][0];
    positions[offset + 1] = corners[0][1];
    positions[offset + 2] = corners[0][2];
    positions[offset + 3] = corners[1][0];
    positions[offset + 4] = corners[1][1];
    positions[offset + 5] = corners[1][2];
    positions[offset + 6] = corners[2][0];
    positions[offset + 7] = corners[2][1];
    positions[offset + 8] = corners[2][2];
    positions[offset + 9] = corners[3][0];
    positions[offset + 10] = corners[3][1];
    positions[offset + 11] = corners[3][2];
    for (let vertex = 0; vertex < 4; vertex += 1) {
      const colorOffset = offset + vertex * 3;
      colors[colorOffset] = color[0];
      colors[colorOffset + 1] = color[1];
      colors[colorOffset + 2] = color[2];
    }
  };

  const createQuadMesh = (name, positions, colors, quadCount, renderOrder) => {
    const indices = new Uint32Array(quadCount * 6);
    for (let quadIndex = 0; quadIndex < quadCount; quadIndex += 1) {
      const vertexBase = quadIndex * 4;
      const indexOffset = quadIndex * 6;
      indices[indexOffset] = vertexBase;
      indices[indexOffset + 1] = vertexBase + 1;
      indices[indexOffset + 2] = vertexBase + 2;
      indices[indexOffset + 3] = vertexBase;
      indices[indexOffset + 4] = vertexBase + 2;
      indices[indexOffset + 5] = vertexBase + 3;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      vertexColors: true,
      side: THREE.DoubleSide,
      fog: false,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.frustumCulled = false;
    mesh.renderOrder = renderOrder;
    return mesh;
  };

  for (let surfaceZ = 0; surfaceZ < surfaceSize; surfaceZ += 1) {
    for (let surfaceX = 0; surfaceX < surfaceSize; surfaceX += 1) {
      const surfaceIndex = surfaceZ * surfaceSize + surfaceX;
      const height = surfaceHeights[surfaceIndex];
      const world = gridToWorld(surfaceX + 0.5, surfaceZ + 0.5);
      const half = surfaceCellSize * 0.49;
      const top = height * BLOCK_HEIGHT - 0.02;
      const baseColor = colorForMaterial(surfaceMaterials[surfaceIndex], height);
      addQuad(topPositions, topColors, topQuadIndex, [
        [world.x - half, top, world.z - half],
        [world.x - half, top, world.z + half],
        [world.x + half, top, world.z + half],
        [world.x + half, top, world.z - half],
      ], baseColor);
      topQuadIndex += 1;
      if (height >= 18 && (surfaceX + surfaceZ) % 3 === 0) {
        capEntries.push({
          x: world.x,
          y: top + BLOCK_HEIGHT * 0.22,
          z: world.z,
          sx: surfaceCellSize * 0.7,
          sy: BLOCK_HEIGHT * 0.52,
          sz: surfaceCellSize * 0.7,
          color: [baseColor[0] * 1.06, baseColor[1] * 1.06, baseColor[2] * 1.06],
        });
      }

      for (const [offsetX, offsetZ] of neighborOffsets) {
        const neighborX = surfaceX + offsetX;
        const neighborZ = surfaceZ + offsetZ;
        if (neighborX < 0 || neighborX >= surfaceSize || neighborZ < 0 || neighborZ >= surfaceSize) continue;
        const neighborHeight = surfaceHeights[neighborZ * surfaceSize + neighborX];
        if (height <= neighborHeight) continue;
        const bandCount = 1;
        for (let band = 0; band < bandCount; band += 1) {
          const y0 = (neighborHeight + (height - neighborHeight) * (band / bandCount)) * BLOCK_HEIGHT;
          const y1 = (neighborHeight + (height - neighborHeight) * ((band + 1) / bandCount)) * BLOCK_HEIGHT;
          const sideColor = colorForMaterial(4, Math.round((y0 + y1) / (BLOCK_HEIGHT * 2)));
          const shaded = [sideColor[0] * 0.52, sideColor[1] * 0.52, sideColor[2] * 0.52];
          let corners;
          if (offsetX === -1) {
            corners = [
              [world.x - half, y0, world.z - half],
              [world.x - half, y0, world.z + half],
              [world.x - half, y1, world.z + half],
              [world.x - half, y1, world.z - half],
            ];
          } else if (offsetX === 1) {
            corners = [
              [world.x + half, y0, world.z - half],
              [world.x + half, y0, world.z + half],
              [world.x + half, y1, world.z + half],
              [world.x + half, y1, world.z - half],
            ];
          } else if (offsetZ === -1) {
            corners = [
              [world.x - half, y0, world.z - half],
              [world.x + half, y0, world.z - half],
              [world.x + half, y1, world.z - half],
              [world.x - half, y1, world.z - half],
            ];
          } else {
            corners = [
              [world.x - half, y0, world.z + half],
              [world.x + half, y0, world.z + half],
              [world.x + half, y1, world.z + half],
              [world.x - half, y1, world.z + half],
            ];
          }
          addQuad(sidePositions, sideColors, sideQuadIndex, corners, shaded);
          sideQuadIndex += 1;
        }
      }
    }
  }

  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x152c2b,
    roughness: 1,
    metalness: 0,
  });
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(WORLD_SIZE + 0.9, 1.35, WORLD_SIZE + 0.9),
    baseMaterial,
  );
  base.name = 'terrain-foundation';
  base.position.y = -0.68;
  base.receiveShadow = true;
  base.castShadow = true;
  group.add(base);

  const topMesh = createQuadMesh('terrain-top-faces', topPositions, topColors, topQuadIndex, 1);
  const sideMesh = createQuadMesh('terrain-exposed-faces', sidePositions, sideColors, sideQuadIndex, 0);
  const capMesh = addInstancedBlocks(group, capEntries, {
    name: 'voxel-ridge-caps',
    roughness: 0.92,
    renderOrder: 2,
    castShadow: false,
    receiveShadow: true,
  });
  group.add(sideMesh, topMesh);

  return {
    group,
    topMesh,
    sideMesh,
    capMesh,
    count: topQuadIndex + sideQuadIndex + capEntries.length,
  };
}

function createPool() {
  const group = new THREE.Group();
  group.name = 'waterfall-pool';
  const end = sampleWaterfall(WATERFALLS[0], 0.985);
  const poolMaterial = new THREE.MeshBasicMaterial({
    color: 0x39c6d6,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    depthTest: false,
  });
  const pool = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.28, 7.2), poolMaterial);
  pool.position.set(end.x + 0.5, 0.34, end.z + 0.3);
  pool.rotation.y = -0.12;
  pool.receiveShadow = true;
  pool.renderOrder = 18;
  group.add(pool);

  const riverEntries = [];
  for (let index = 0; index < 30; index += 1) {
    const t = index / 29;
    riverEntries.push({
      x: end.x + 0.5 + Math.sin(t * Math.PI * 2.2) * (1.2 + t * 1.6),
      y: 0.3 + Math.sin(t * Math.PI) * 0.04,
      z: end.z + 0.5 + t * 12,
      sx: 1.45 + Math.sin(t * Math.PI) * 0.5,
      sy: 0.16,
      sz: 1.7,
      color: TERRAIN_COLORS.water,
    });
  }
  addInstancedBlocks(group, riverEntries, {
    name: 'voxel-river-runnel',
    unlit: true,
    color: 0x35b9ca,
    vertexColors: false,
    opacity: 0.68,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    renderOrder: 17,
    castShadow: false,
    receiveShadow: false,
  });

  const foamMaterial = new THREE.MeshBasicMaterial({
    color: TERRAIN_COLORS.foam,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    depthTest: false,
  });
  for (let index = 0; index < 16; index += 1) {
    const angle = (index / 16) * Math.PI * 2;
    const ripple = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.22), foamMaterial);
    ripple.position.set(
      end.x + 0.5 + Math.cos(angle) * (1.6 + (index % 3) * 0.7),
      0.38 + (index % 2) * 0.05,
      end.z + 0.3 + Math.sin(angle) * (0.75 + (index % 4) * 0.18),
    );
    ripple.scale.set(1.8, 1, 0.65);
    ripple.rotation.y = angle;
    ripple.renderOrder = 25;
    group.add(ripple);
  }
  return group;
}

function getWaterfallFrame(fall, t) {
  const point = sampleWaterfall(fall, t);
  const next = sampleWaterfall(fall, Math.min(1, t + 0.006));
  let tangentX = next.x - point.x;
  let tangentZ = next.z - point.z;
  const length = Math.hypot(tangentX, tangentZ);
  if (length < 0.00001) {
    tangentX = 0;
    tangentZ = 1;
  } else {
    tangentX /= length;
    tangentZ /= length;
  }
  return {
    x: point.x,
    y: point.y,
    z: point.z,
    sideX: tangentZ,
    sideZ: -tangentX,
    rotationY: Math.atan2(tangentX, tangentZ),
  };
}

function buildFoamTrack(fall) {
  const track = [];
  for (let index = 0; index <= 96; index += 1) {
    track.push(getWaterfallFrame(fall, index / 96));
  }
  return track;
}

const WATERFALL_PROFILES = {
  main: {
    sampleCount: 154,
    laneCount: 5,
    laneSpacing: 0.92,
    waterScale: 0.84,
    sheetScale: 1.05,
    highlightScale: 0.34,
    foamCount: 28,
    foamOpacity: 0.92,
  },
  east: {
    sampleCount: 112,
    laneCount: 3,
    laneSpacing: 0.74,
    waterScale: 0.68,
    sheetScale: 0.76,
    highlightScale: 0.26,
    foamCount: 15,
    foamOpacity: 0.78,
  },
};

function createWaterfalls() {
  const group = new THREE.Group();
  group.name = 'waterfall-system';
  const waterEntries = [];
  const sheetEntries = [];
  const highlightEntries = [];
  const foamMeshes = [];
  for (const fall of WATERFALLS) {
    const profile = WATERFALL_PROFILES[fall.id] ?? WATERFALL_PROFILES.east;
    const sampleCount = profile.sampleCount;
    const laneCount = profile.laneCount;
    const laneSpacing = CELL_SIZE * profile.laneSpacing;
    let previous = getWaterfallFrame(fall, 0);

    for (let index = 0; index <= sampleCount; index += 1) {
      const t = index / sampleCount;
      const point = getWaterfallFrame(fall, t);

      for (let lane = 0; lane < laneCount; lane += 1) {
        const offset = (lane - (laneCount - 1) / 2) * laneSpacing;
        const shimmer = 0.04 + ((index * 7 + lane * 3) % 5) * 0.012;
        waterEntries.push({
          x: point.x + point.sideX * offset,
          y: point.y + shimmer,
          z: point.z + point.sideZ * offset,
          sx: CELL_SIZE * profile.waterScale,
          sy: BLOCK_HEIGHT * 1.08,
          sz: CELL_SIZE * profile.waterScale,
          color: lane % 2 === 0 ? TERRAIN_COLORS.water : TERRAIN_COLORS.waterLight,
        });
      }

      if (index % 6 === 0) {
        highlightEntries.push({
          x: point.x,
          y: point.y + 0.2,
          z: point.z,
          sx: profile.highlightScale,
          sy: 0.12,
          sz: profile.highlightScale,
          color: TERRAIN_COLORS.foam,
        });
      }

      if (index > 0) {
        const midY = (previous.y + point.y) * 0.5;
        const drop = Math.max(BLOCK_HEIGHT * 0.8, Math.abs(previous.y - point.y) + BLOCK_HEIGHT * 0.7);
        sheetEntries.push({
          x: (previous.x + point.x) * 0.5,
          y: midY,
          z: (previous.z + point.z) * 0.5,
          sx: fall.width * CELL_SIZE * profile.sheetScale,
          sy: drop,
          sz: CELL_SIZE * 0.26,
          rotationY: point.rotationY,
          color: index % 3 === 0 ? TERRAIN_COLORS.waterLight : TERRAIN_COLORS.water,
        });
      }
      previous = point;
    }

    const foamMaterial = new THREE.MeshBasicMaterial({
      color: TERRAIN_COLORS.foam,
      transparent: true,
      opacity: profile.foamOpacity,
      depthWrite: false,
      depthTest: false,
    });
    const foamGeometry = new THREE.BoxGeometry(0.36, 0.16, 0.36);
    const foamTrack = buildFoamTrack(fall);
    const foamCount = profile.foamCount;
    for (let index = 0; index < foamCount; index += 1) {
      const foam = new THREE.Mesh(foamGeometry, foamMaterial);
      foam.renderOrder = 24;
      foam.userData = {
        track: foamTrack,
        width: fall.width,
        offset: (index + (fall.id === 'main' ? 0 : 0.17)) / foamCount,
        speed: 0.055 + (index % 4) * 0.006,
        lane: (index % 5 - 2) * 0.22,
      };
      foamMeshes.push(foam);
      group.add(foam);
    }
  }

  const waterMesh = addInstancedBlocks(group, waterEntries, {
    name: 'water-voxels',
    opacity: 0.88,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    renderOrder: 20,
    color: 0x74edf2,
    vertexColors: false,
    unlit: true,
    castShadow: false,
    receiveShadow: false,
  });
  const sheetMesh = addInstancedBlocks(group, sheetEntries, {
    name: 'water-cascade-sheets',
    opacity: 0.76,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    renderOrder: 19,
    color: 0x52e4ee,
    vertexColors: false,
    unlit: true,
    castShadow: false,
    receiveShadow: false,
  });
  addInstancedBlocks(group, highlightEntries, {
    name: 'water-foam-blocks',
    unlit: true,
    color: 0xf4ffff,
    vertexColors: false,
    opacity: 0.88,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    renderOrder: 23,
    castShadow: false,
    receiveShadow: false,
  });

  return { group, waterMesh, sheetMesh, foamMeshes, material: waterMesh.material, sheetMaterial: sheetMesh.material };
}

function createCloudField() {
  const group = new THREE.Group();
  group.name = 'cloud-and-mist-field';
  const random = seededRandom(42017);
  const backEntries = [];
  const frontEntries = [];
  const clusters = [
    { x: -47, y: 20, z: -31, scale: 1.45, count: 20, front: false },
    { x: -20, y: 16, z: -12, scale: 1.18, count: 16, front: false },
    { x: 27, y: 21, z: -37, scale: 1.55, count: 22, front: false },
    { x: 52, y: 17, z: -2, scale: 1.12, count: 15, front: false },
    { x: -55, y: 13, z: 32, scale: 1.28, count: 19, front: true },
    { x: -7, y: 15, z: 22, scale: 1.02, count: 18, front: true },
    { x: -2, y: 19, z: 12, scale: 1.35, count: 24, front: true },
    { x: 19, y: 17, z: 5, scale: 1.15, count: 18, front: true },
    { x: 25, y: 12, z: 43, scale: 1.2, count: 17, front: true },
    { x: 59, y: 15, z: 48, scale: 1.25, count: 16, front: true },
    { x: 2, y: 10, z: 70, scale: 0.9, count: 13, front: true },
  ];

  for (const cluster of clusters) {
    for (let index = 0; index < cluster.count; index += 1) {
      const angle = random() * Math.PI * 2;
      const distance = Math.pow(random(), 0.7) * 5.4 * cluster.scale;
      const width = (1.6 + random() * 2.5) * cluster.scale;
      const height = (0.9 + random() * 1.2) * cluster.scale;
      const depth = (1.8 + random() * 2.5) * cluster.scale;
      const entry = {
        x: cluster.x + Math.cos(angle) * distance,
        y: cluster.y + (random() - 0.5) * 2.6 * cluster.scale,
        z: cluster.z + Math.sin(angle) * distance * 0.58,
        sx: width,
        sy: height,
        sz: depth,
        color: [0.94 + random() * 0.05, 0.97 + random() * 0.03, 0.98 + random() * 0.02],
      };
      (cluster.front ? frontEntries : backEntries).push(entry);
    }
  }

  for (let index = 0; index < 22; index += 1) {
    const t = index / 21;
    const x = -44 + t * 88;
    const y = 13.2 + Math.sin(t * Math.PI * 2.4) * 1.8;
    const z = 13 + Math.sin(t * Math.PI * 1.7) * 5;
    frontEntries.push({
      x,
      y,
      z,
      sx: 6.5 + Math.sin(t * Math.PI) * 2.5,
      sy: 1.1 + (index % 3) * 0.28,
      sz: 3.2 + (index % 4) * 0.7,
      color: [0.96, 0.98, 0.98],
    });
  }

  const back = addInstancedBlocks(group, backEntries, {
    name: 'clouds-behind-ridge',
    opacity: 0.2,
    transparent: true,
    depthWrite: false,
    renderOrder: 3,
    unlit: true,
    color: 0xd8f0f1,
    vertexColors: false,
    castShadow: false,
    receiveShadow: false,
  });
  const front = addInstancedBlocks(group, frontEntries, {
    name: 'clouds-in-front-of-ridge',
    opacity: 0.3,
    transparent: true,
    depthWrite: false,
    renderOrder: 9,
    unlit: true,
    color: 0xf3ffff,
    vertexColors: false,
    castShadow: false,
    receiveShadow: false,
  });
  back.material.color.set(0xb8d6dc);
  front.material.color.set(0xdcefed);

  const mistEntries = [];
  for (let index = 0; index < 48; index += 1) {
    const angle = (index / 48) * Math.PI * 2;
    const radius = 30 + random() * 48;
    mistEntries.push({
      x: Math.cos(angle) * radius,
      y: 8 + random() * 12,
      z: Math.sin(angle) * radius * 0.72,
      sx: 4 + random() * 8,
      sy: 0.5 + random() * 1.2,
      sz: 1.4 + random() * 3.8,
      color: [0.73, 0.86, 0.87],
    });
  }
  const mist = addInstancedBlocks(group, mistEntries, {
    name: 'valley-mist',
    opacity: 0.1,
    transparent: true,
    depthWrite: false,
    renderOrder: 10,
    unlit: true,
    color: 0xc6e6e4,
    vertexColors: false,
    castShadow: false,
    receiveShadow: false,
  });
  mist.material.color.set(0xc3e0df);

  return { group, materials: [back.material, front.material, mist.material] };
}

function createVegetation(terrain) {
  const group = new THREE.Group();
  group.name = 'voxel-vegetation';
  const trunks = [];
  const leaves = [];
  const shadows = [];
  const rocks = [];
  const flowers = [];
  const random = seededRandom(90210);
  let treeCount = 0;

  for (let attempt = 0; attempt < 700 && treeCount < 54; attempt += 1) {
    const x = 10 + Math.floor(random() * (GRID_SIZE - 20));
    const z = 12 + Math.floor(random() * (GRID_SIZE - 24));
    const index = terrainIndex(x, z);
    const height = terrain.heights[index];
    const isExcluded = terrain.channelMask[index] === 1;
    if (height > 11 || height < 2 || isExcluded) continue;
    if (Math.hypot(x - 82, z - 142) < 11) continue;

    const world = gridToWorld(x, z);
    const baseY = height * BLOCK_HEIGHT;
    const treeHeight = 2.6 + random() * 2.6;
    const trunkHeight = treeHeight * 0.62;
    shadows.push({
      x: world.x,
      y: baseY + 0.02,
      z: world.z,
      sx: 1.75 + random() * 0.45,
      sy: 0.04,
      sz: 1.35 + random() * 0.35,
      color: [0.08, 0.18, 0.12],
    });
    trunks.push({
      x: world.x,
      y: baseY + trunkHeight * 0.5,
      z: world.z,
      sx: 0.28 + random() * 0.12,
      sy: trunkHeight,
      sz: 0.28 + random() * 0.12,
      color: TERRAIN_COLORS.trunk,
    });

    const layers = 3 + Math.floor(random() * 2);
    for (let layer = 0; layer < layers; layer += 1) {
      const layerWidth = (1.65 - layer * 0.25) * (0.85 + random() * 0.25);
      leaves.push({
        x: world.x,
        y: baseY + trunkHeight * 0.72 + layer * 0.58,
        z: world.z,
        sx: layerWidth,
        sy: 0.7 + random() * 0.22,
        sz: layerWidth,
        color: layer % 2 === 0 ? TERRAIN_COLORS.leaf : TERRAIN_COLORS.leafLight,
      });
    }
    treeCount += 1;
  }

  for (let index = 0; index < 72; index += 1) {
    const x = 8 + Math.floor(random() * (GRID_SIZE - 16));
    const z = 8 + Math.floor(random() * (GRID_SIZE - 16));
    const terrainIndexValue = terrainIndex(x, z);
    const height = terrain.heights[terrainIndexValue];
    if (height > 9 || terrain.channelMask[terrainIndexValue] === 1) continue;
    const world = gridToWorld(x, z);
    const size = 0.25 + random() * 0.55;
    rocks.push({
      x: world.x,
      y: height * BLOCK_HEIGHT + size * 0.4,
      z: world.z,
      sx: size,
      sy: size * (0.6 + random() * 0.6),
      sz: size * (0.7 + random() * 0.7),
      color: random() > 0.5 ? TERRAIN_COLORS.rockLight : TERRAIN_COLORS.rock,
    });
  }

  for (let index = 0; index < 90; index += 1) {
    const x = 10 + Math.floor(random() * (GRID_SIZE - 20));
    const z = 10 + Math.floor(random() * (GRID_SIZE - 20));
    const terrainIndexValue = terrainIndex(x, z);
    const height = terrain.heights[terrainIndexValue];
    if (height > 7 || terrain.channelMask[terrainIndexValue] === 1) continue;
    const world = gridToWorld(x, z);
    flowers.push({
      x: world.x,
      y: height * BLOCK_HEIGHT + 0.18,
      z: world.z,
      sx: 0.12,
      sy: 0.18 + random() * 0.16,
      sz: 0.12,
      color: random() > 0.5 ? [0.95, 0.67, 0.28] : [0.9, 0.39, 0.46],
    });
  }

  addInstancedBlocks(group, shadows, {
    name: 'tree-contact-shadows',
    unlit: true,
    color: 0x183b2d,
    vertexColors: false,
    opacity: 0.22,
    transparent: true,
    depthWrite: false,
    renderOrder: 0,
    castShadow: false,
    receiveShadow: false,
  });
  addInstancedBlocks(group, trunks, {
    name: 'tree-trunks',
    unlit: true,
    color: 0x8a5a32,
    vertexColors: false,
    castShadow: true,
  });
  addInstancedBlocks(group, leaves, {
    name: 'tree-canopies',
    unlit: true,
    color: 0x4eaf65,
    vertexColors: false,
    castShadow: true,
  });
  addInstancedBlocks(group, rocks, {
    name: 'voxel-rocks',
    unlit: true,
    color: 0x73827e,
    vertexColors: false,
    castShadow: true,
  });
  addInstancedBlocks(group, flowers, {
    name: 'wildflowers',
    unlit: true,
    color: 0xf1b45e,
    vertexColors: false,
    castShadow: false,
  });

  return group;
}

function createSunTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,248,211,1)');
  gradient.addColorStop(0.18, 'rgba(255,222,157,0.95)');
  gradient.addColorStop(0.48, 'rgba(255,191,124,0.35)');
  gradient.addColorStop(1, 'rgba(255,178,119,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addAtmosphere(scene) {
  const hemisphere = new THREE.HemisphereLight(0xe4f7ff, 0x52715b, 2.65);
  hemisphere.name = 'sky-fill-light';
  scene.add(hemisphere);

  const ambient = new THREE.AmbientLight(0x9bc8c4, 0.82);
  ambient.name = 'soft-ambient-fill';
  scene.add(ambient);

  const sunLight = new THREE.DirectionalLight(0xffd7aa, 3.25);
  sunLight.name = 'warm-sun-light';
  sunLight.position.set(-72, 108, 48);
  sunLight.castShadow = false;
  scene.add(sunLight);
  scene.add(sunLight.target);

  const rim = new THREE.DirectionalLight(0x8bc8d5, 1.1);
  rim.name = 'cool-rim-light';
  rim.position.set(80, 52, -100);
  scene.add(rim);

  const frontFill = new THREE.DirectionalLight(0xc3eee4, 1.35);
  frontFill.name = 'front-fill-light';
  frontFill.position.set(35, 62, 135);
  scene.add(frontFill);

  const sun = new THREE.Sprite(new THREE.SpriteMaterial({
    map: createSunTexture(),
    color: 0xffd19b,
    transparent: true,
    opacity: 0.86,
    depthWrite: false,
    depthTest: true,
  }));
  sun.name = 'soft-sun-disc';
  sun.position.set(-78, 92, -118);
  sun.scale.set(34, 34, 1);
  sun.renderOrder = -1;
  scene.add(sun);

  return { hemisphere, sunLight, rim, frontFill, sun };
}

function createMistAtBase() {
  const group = new THREE.Group();
  group.name = 'waterfall-spray';
  const random = seededRandom(1188);
  const entries = [];
  const end = sampleWaterfall(WATERFALLS[0], 1);
  for (let index = 0; index < 44; index += 1) {
    const angle = random() * Math.PI * 2;
    const distance = random() * 8;
    entries.push({
      x: end.x + Math.cos(angle) * distance,
      y: 0.65 + random() * 2.5,
      z: end.z + Math.sin(angle) * distance * 0.65,
      sx: 0.8 + random() * 2.3,
      sy: 0.45 + random() * 1.1,
      sz: 0.7 + random() * 1.7,
      color: [0.8, 0.92, 0.91],
    });
  }
  const mesh = addInstancedBlocks(group, entries, {
    name: 'spray-blocks',
    opacity: 0.18,
    transparent: true,
    depthWrite: false,
    renderOrder: 11,
    unlit: true,
    color: 0xe1f6f1,
    vertexColors: false,
    castShadow: false,
    receiveShadow: false,
  });
  mesh.material.color.set(0xd7f1ef);
  return group;
}

function framingForAspect(aspect) {
  if (aspect < 0.8) return 1.42;
  if (aspect < 1.15) return 1.18;
  return 1;
}

function createScene(canvas, initialSettings, onStats) {
  const terrain = buildTerrain();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xb9d9df);
  scene.fog = new THREE.Fog(0xb9d9df, 145, 315);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);
  const initialAspect = window.innerWidth / Math.max(1, window.innerHeight);
  const initialFraming = framingForAspect(initialAspect);
  const initialTargetY = initialAspect < 0.8 ? 7 : 13;
  const initialTarget = new THREE.Vector3(0, initialTargetY, 0);
  camera.position.copy(initialTarget).add(new THREE.Vector3(112, 65, 128).multiplyScalar(initialFraming));

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5) * 0.82);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.14;
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, initialTargetY, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.minDistance = 42;
  controls.maxDistance = 320;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minPolarAngle = Math.PI * 0.16;
  controls.autoRotate = initialSettings.autoRotate;
  controls.autoRotateSpeed = 0.18;
  controls.enablePan = true;
  controls.panSpeed = 0.45;

  const world = new THREE.Group();
  world.name = 'voxel-waterfall-world';
  scene.add(world);

  const terrainResult = createTerrain(terrain);
  world.add(terrainResult.group);

  const waterResult = createWaterfalls();
  world.add(waterResult.group);
  world.add(createPool());
  world.add(createMistAtBase());

  const cloudResult = createCloudField();
  world.add(cloudResult.group);

  const vegetation = createVegetation(terrain);
  world.add(vegetation);

  const atmosphere = addAtmosphere(scene);

  const settings = {
    timeOfDay: initialSettings.timeOfDay ?? 0.28,
    cloudCover: initialSettings.cloudCover ?? 0.68,
    waterFlow: initialSettings.waterFlow ?? 0.78,
    vegetation: initialSettings.vegetation ?? true,
    showClouds: initialSettings.showClouds ?? true,
    autoRotate: initialSettings.autoRotate ?? true,
    voxelEdges: initialSettings.voxelEdges ?? false,
  };

  const clock = new THREE.Clock();
  let elapsed = 0;
  let frameId = 0;
  let disposed = false;
  let cameraTween = null;
  const stats = {
    gridSize: GRID_SIZE,
    terrainBlocks: terrainResult.count,
    totalBlocks: terrainResult.count + waterResult.waterMesh.count + waterResult.sheetMesh.count,
  };

  function applyAtmosphere() {
    const time = settings.timeOfDay;
    const dawn = new THREE.Color(0xb8d8e0);
    const noon = new THREE.Color(0x91c9d7);
    const dusk = new THREE.Color(0xd29b91);
    const sky = dawn.clone().lerp(noon, Math.min(1, time * 1.8));
    if (time > 0.58) sky.lerp(dusk, (time - 0.58) / 0.42);
    scene.background.copy(sky);
    scene.fog.color.copy(sky);

    const sunAngle = Math.PI * (0.12 + time * 0.72);
    atmosphere.sunLight.position.set(
      -72 + Math.cos(sunAngle) * 34,
      78 + Math.sin(sunAngle) * 48,
      48 + Math.sin(sunAngle) * 20,
    );
    atmosphere.sunLight.intensity = 2.3 + Math.sin(time * Math.PI) * 1.45;
    atmosphere.sunLight.color.set(time > 0.62 ? 0xffb47f : 0xffddb0);
    atmosphere.hemisphere.intensity = 1.7 + (1 - Math.abs(time - 0.38) * 1.6) * 0.75;
    atmosphere.rim.intensity = 0.8 + (1 - time) * 0.5;
    atmosphere.sun.material.opacity = 0.62 + (1 - time) * 0.3;
    atmosphere.sun.position.x = -78 + Math.cos(sunAngle) * 30;
    atmosphere.sun.position.y = 84 + Math.sin(sunAngle) * 18;
    renderer.toneMappingExposure = 1.06 + Math.sin(time * Math.PI) * 0.14;
    const warmGrade = new THREE.Color(0xffffff).lerp(new THREE.Color(0xffc89f), Math.max(0, time - 0.42) * 0.48);
    terrainResult.topMesh.material.color.copy(warmGrade);
    terrainResult.sideMesh.material.color.copy(new THREE.Color(0xb8d0d0).lerp(warmGrade, 0.22));
  }

  function applySettings() {
    vegetation.visible = settings.vegetation;
    cloudResult.group.visible = settings.showClouds;
    waterResult.material.opacity = 0.64 + settings.waterFlow * 0.24;
    waterResult.sheetMaterial.opacity = 0.48 + settings.waterFlow * 0.28;
    const cloudOpacity = 0.14 + settings.cloudCover * 0.28;
    cloudResult.materials[0].opacity = cloudOpacity * 0.76;
    cloudResult.materials[1].opacity = cloudOpacity * 1.18;
    cloudResult.materials[2].opacity = cloudOpacity * 0.42;
    cloudResult.group.scale.setScalar(0.84 + settings.cloudCover * 0.2);
    terrainResult.topMesh.material.wireframe = settings.voxelEdges;
    terrainResult.sideMesh.material.wireframe = settings.voxelEdges;
    controls.autoRotate = settings.autoRotate;
    applyAtmosphere();
  }

  function setSettings(nextSettings) {
    Object.assign(settings, nextSettings);
    applySettings();
  }

  const views = {
    overview: {
      position: new THREE.Vector3(112, 78, 128),
      target: new THREE.Vector3(0, 13, 0),
    },
    waterfall: {
      position: new THREE.Vector3(72, 42, 98),
      target: new THREE.Vector3(8, 14, 25),
    },
    ridge: {
      position: new THREE.Vector3(-108, 68, 88),
      target: new THREE.Vector3(-4, 18, -7),
    },
    valley: {
      position: new THREE.Vector3(24, 28, 152),
      target: new THREE.Vector3(3, 8, 58),
    },
  };

  function moveCamera(viewName) {
    const view = views[viewName] ?? views.overview;
    const framing = framingForAspect(camera.aspect);
    const endPosition = view.target.clone().add(view.position.clone().sub(view.target).multiplyScalar(framing));
    cameraTween = {
      startPosition: camera.position.clone(),
      startTarget: controls.target.clone(),
      endPosition,
      endTarget: view.target.clone(),
      elapsed: 0,
      duration: 0.95,
    };
  }

  function updateCameraTween(delta) {
    if (!cameraTween) return;
    cameraTween.elapsed += delta;
    const progress = Math.min(1, cameraTween.elapsed / cameraTween.duration);
    const eased = progress * progress * (3 - 2 * progress);
    camera.position.lerpVectors(cameraTween.startPosition, cameraTween.endPosition, eased);
    controls.target.lerpVectors(cameraTween.startTarget, cameraTween.endTarget, eased);
    if (progress >= 1) cameraTween = null;
  }

  function updateFoam(delta) {
    const flow = 0.55 + settings.waterFlow * 0.8;
    for (let index = 0; index < waterResult.foamMeshes.length; index += 1) {
      const foam = waterResult.foamMeshes[index];
      const data = foam.userData;
      const track = data.track;
      const trackPosition = ((data.offset + elapsed * data.speed * flow) % 1) * (track.length - 1);
      const trackIndex = Math.floor(trackPosition);
      const nextTrackIndex = Math.min(track.length - 1, trackIndex + 1);
      const blend = trackPosition - trackIndex;
      const point = track[trackIndex];
      const next = track[nextTrackIndex];
      const lateral = data.lane * (data.width * CELL_SIZE * 0.8);
      foam.position.set(
        point.x + (next.x - point.x) * blend + point.sideX * lateral,
        point.y + (next.y - point.y) * blend + 0.36 + Math.sin(elapsed * 3.2 + index) * 0.07,
        point.z + (next.z - point.z) * blend + point.sideZ * lateral,
      );
      const pulse = 0.82 + Math.sin(elapsed * 4.5 + index * 0.8) * 0.18;
      foam.scale.set(pulse, 0.82 + pulse * 0.22, pulse);
      foam.rotation.y += delta * (0.4 + (index % 3) * 0.12);
    }
  }

  function resize() {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();
  applySettings();
  onStats?.({ ...stats });

  function animate() {
    if (disposed) return;
    frameId = requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05);
    elapsed += delta;
    updateCameraTween(delta);
    updateFoam(delta);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  function dispose() {
    disposed = true;
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    controls.dispose();
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          if (material.map) material.map.dispose();
          material.dispose();
        });
      }
    });
    renderer.dispose();
  }

  return {
    dispose,
    setSettings,
    moveCamera,
  };
}

export default createScene;
