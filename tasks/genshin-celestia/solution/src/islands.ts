import * as THREE from 'three';
import { materials } from './materials';
import { fractalNoise, makeMesh, mulberry32, type Random } from './utils';

export interface FloatingIslandOptions {
  radius: number;
  depth: number;
  seed: number;
  segments?: number;
  grass?: boolean;
  treeCount?: number;
  treeExclusion?: number;
  flowers?: boolean;
  ruin?: boolean;
}

export interface FloatingIsland {
  group: THREE.Group;
  radius: number;
  depth: number;
  seed: number;
}

interface Point {
  x: number;
  z: number;
}

const scratchColor = new THREE.Color();
const mossColor = new THREE.Color(0x547c49);

function pushColor(target: number[], color: THREE.Color): void {
  target.push(color.r, color.g, color.b);
}

function createRockBody(
  radius: number,
  depth: number,
  seed: number,
  segments: number,
): THREE.BufferGeometry {
  const levelProfile = [
    0, 0.025, 0.07, 0.13, 0.18, 0.245, 0.3, 0.38, 0.47, 0.56, 0.65, 0.74, 0.84, 0.92, 1,
  ];
  const radialProfile = [
    1.035, 1.075, 1.1, 1.02, 1.06, 0.985, 0.9, 0.85, 0.79, 0.71, 0.63, 0.55, 0.43, 0.26,
    0.014,
  ];
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const random = mulberry32(seed * 671 + 41);

  for (let level = 0; level < levelProfile.length; level += 1) {
    const t = levelProfile[level];
    for (let segment = 0; segment < segments; segment += 1) {
      const angle = (segment / segments) * Math.PI * 2;
      const angularNoise =
        Math.sin(angle * 3 + seed * 0.71) * 0.072 +
        Math.sin(angle * 7 - seed * 0.37) * 0.032 +
        (fractalNoise(Math.cos(angle) * 1.8 + seed, Math.sin(angle) * 1.8 - level * 0.11, seed) -
          0.5) *
          0.17;
      const buttress = Math.max(0, Math.sin(angle * 5 + seed * 1.3)) * 0.035;
      const broadLobe =
        Math.pow(Math.max(0, Math.cos(angle - (seed % 17) * 0.37)), 4) *
        0.19 *
        Math.sin(Math.PI * Math.min(1, t * 1.25));
      const windwardShoulder =
        Math.sin(angle * 1.7 + seed * 0.21) * 0.045 * Math.sin(t * Math.PI);
      const verticalNoise = (random() - 0.5) * 0.012;
      const y = -depth * THREE.MathUtils.clamp(t + verticalNoise, 0, 1);
      const localRadius =
        radius *
        radialProfile[level] *
        (1 + angularNoise + buttress + broadLobe + windwardShoulder);
      positions.push(Math.cos(angle) * localRadius, y, Math.sin(angle) * localRadius);
      uvs.push(segment / segments, 1 - t);

      const stratum =
        Math.sin(t * 38 + seed * 0.19) * 0.5 +
        Math.sin(t * 91 - seed * 0.43) * 0.25;
      if (t < 0.055) {
        scratchColor.setHex(0xc4ad87);
      } else if (t < 0.24) {
        scratchColor.setHex(0xb29e80);
      } else if (t < 0.48) {
        scratchColor.setHex(0x948a7b);
      } else if (t < 0.73) {
        scratchColor.setHex(0x7b7880);
      } else {
        scratchColor.setHex(0x676a78);
      }
      const lightness = 0.9 + stratum * 0.09 + (random() - 0.5) * 0.12;
      scratchColor.multiplyScalar(lightness);
      const crevice =
        Math.pow(
          Math.max(
            0,
            Math.sin(angle * 11 + seed * 0.73 + level * 1.37),
          ),
          7,
        ) *
        (0.18 + Math.sin(t * 31 + seed) * 0.05);
      scratchColor.multiplyScalar(1 - Math.max(0, crevice));
      if (
        t < 0.17 &&
        fractalNoise(Math.cos(angle) * 4.3 + seed, t * 7 + seed * 0.1, seed + 7) > 0.57
      ) {
        scratchColor.lerp(mossColor, 0.22);
      }
      if (t > 0.76) {
        scratchColor.multiplyScalar(0.9);
      }
      pushColor(colors, scratchColor);
    }
  }

  for (let level = 0; level < levelProfile.length - 1; level += 1) {
    for (let segment = 0; segment < segments; segment += 1) {
      const next = (segment + 1) % segments;
      const a = level * segments + segment;
      const b = level * segments + next;
      const c = (level + 1) * segments + segment;
      const d = (level + 1) * segments + next;
      indices.push(a, b, c, b, d, c);
    }
  }

  const bottomCenter = positions.length / 3;
  positions.push(0, -depth * 1.055, 0);
  uvs.push(0.5, 1);
  scratchColor.setHex(0x5d6270).multiplyScalar(0.86 + random() * 0.1);
  pushColor(colors, scratchColor);
  const lastRing = (levelProfile.length - 1) * segments;
  for (let segment = 0; segment < segments; segment += 1) {
    indices.push(lastRing + segment, bottomCenter, lastRing + ((segment + 1) % segments));
  }

  const indexed = new THREE.BufferGeometry();
  indexed.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  indexed.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  indexed.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  indexed.setIndex(indices);
  const geometry = indexed.toNonIndexed();
  indexed.dispose();
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function createGrassTop(
  radius: number,
  seed: number,
  segments: number,
): THREE.BufferGeometry {
  const rings = 8;
  const random = mulberry32(seed + 9501);
  const positions: number[] = [0, 1.55, 0];
  const colors: number[] = [];
  const uvs: number[] = [0.5, 0.5];
  const indices: number[] = [];
  const grassPalette = [0x507742, 0x5f8749, 0x6e9450, 0x486d3e, 0x7b9e57];
  scratchColor.setHex(grassPalette[Math.floor(random() * grassPalette.length)]);
  pushColor(colors, scratchColor);

  for (let ring = 1; ring <= rings; ring += 1) {
    const t = ring / rings;
    for (let segment = 0; segment < segments; segment += 1) {
      const angle = (segment / segments) * Math.PI * 2;
      const edgeNoise =
        1 +
        Math.sin(angle * 3 + seed) * 0.048 +
        Math.sin(angle * 6 - seed * 0.7) * 0.022 +
        (fractalNoise(Math.cos(angle) * 2.3 + seed, Math.sin(angle) * 2.3, seed) - 0.5) * 0.085;
      const distance = radius * 0.995 * t * edgeNoise;
      const hill =
        Math.sin(angle * 2.4 + seed * 0.33) * 0.32 +
        Math.sin(angle * 5.2 - seed * 0.16) * 0.16 +
        (fractalNoise(Math.cos(angle) * 1.5 + t, Math.sin(angle) * 1.5, seed + 12) - 0.5) *
          0.48;
      const rimDrop = THREE.MathUtils.smoothstep(t, 0.78, 1);
      const y = 1.45 * (1 - Math.pow(t, 2.6)) + hill * (1 - rimDrop * 0.7) + 0.04;
      positions.push(Math.cos(angle) * distance, y, Math.sin(angle) * distance);
      uvs.push(0.5 + (Math.cos(angle) * t) / 2, 0.5 + (Math.sin(angle) * t) / 2);

      const patch =
        fractalNoise(Math.cos(angle) * 3 + t * 2, Math.sin(angle) * 3 - t, seed + 88) - 0.5;
      scratchColor.setHex(grassPalette[Math.floor(random() * grassPalette.length)]);
      scratchColor.multiplyScalar(0.92 + patch * 0.17 + (random() - 0.5) * 0.06);
      pushColor(colors, scratchColor);
    }
  }

  for (let segment = 0; segment < segments; segment += 1) {
    indices.push(0, 1 + ((segment + 1) % segments), 1 + segment);
  }
  for (let ring = 1; ring < rings; ring += 1) {
    for (let segment = 0; segment < segments; segment += 1) {
      const current = 1 + (ring - 1) * segments + segment;
      const next = 1 + (ring - 1) * segments + ((segment + 1) % segments);
      const above = 1 + ring * segments + segment;
      const aboveNext = 1 + ring * segments + ((segment + 1) % segments);
      indices.push(current, next, above, next, aboveNext, above);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createTreeInstances(
  parent: THREE.Group,
  placements: Array<{ x: number; z: number; size: number; baseY: number }>,
  seed: number,
): void {
  if (placements.length === 0) {
    return;
  }
  const random = mulberry32(seed + 713);
  const trunkGeometry = new THREE.CylinderGeometry(0.23, 0.45, 4, 5, 2);
  trunkGeometry.translate(0, 2, 0);
  const canopyGeometry = new THREE.IcosahedronGeometry(1, 1);
  const trunkMesh = new THREE.InstancedMesh(trunkGeometry, materials.trunk, placements.length);
  const leafCount = placements.length * 3;
  const leaves = new THREE.InstancedMesh(canopyGeometry, materials.leaves, leafCount);
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const position = new THREE.Vector3();
  const leafTones = [0x2e7448, 0x3f8f55, 0x65a862, 0x78b868, 0x28704a];
  let leafIndex = 0;

  placements.forEach((tree, index) => {
    const height = 2.8 + tree.size * 1.7;
    position.set(tree.x, tree.baseY - 0.05, tree.z);
    scale.set(tree.size * 0.86, height / 4, tree.size * 0.86);
    matrix.compose(position, quaternion, scale);
    trunkMesh.setMatrixAt(index, matrix);

    for (let cluster = 0; cluster < 3; cluster += 1) {
      const angle = random() * Math.PI * 2;
      const radius = cluster === 0 ? 0 : (0.5 + random() * 0.95) * tree.size;
      const clusterScale = tree.size * (cluster === 0 ? 1.45 : 1.05 + random() * 0.5);
      position.set(
        tree.x + Math.cos(angle) * radius,
        tree.baseY + height * (0.73 + cluster * 0.055) + random() * 0.25,
        tree.z + Math.sin(angle) * radius,
      );
      scale.set(clusterScale * (1.0 + random() * 0.25), clusterScale * 0.8, clusterScale);
      quaternion.setFromEuler(new THREE.Euler(random() * 0.12, random() * Math.PI, random() * 0.1));
      matrix.compose(position, quaternion, scale);
      leaves.setMatrixAt(leafIndex, matrix);
      scratchColor.setHex(leafTones[Math.floor(random() * leafTones.length)]);
      leaves.setColorAt(leafIndex, scratchColor);
      leafIndex += 1;
    }
  });
  trunkMesh.instanceMatrix.needsUpdate = true;
  leaves.instanceMatrix.needsUpdate = true;
  if (leaves.instanceColor) {
    leaves.instanceColor.needsUpdate = true;
  }
  trunkMesh.castShadow = true;
  trunkMesh.receiveShadow = true;
  leaves.castShadow = true;
  leaves.receiveShadow = true;
  parent.add(trunkMesh, leaves);
}

function addFlowerDetails(
  parent: THREE.Group,
  random: Random,
  radius: number,
  count: number,
  baseY: number,
): void {
  const geometry = new THREE.IcosahedronGeometry(0.12, 0);
  const flower = new THREE.InstancedMesh(
    geometry,
    new THREE.MeshToonMaterial({ color: 0xfff0c6 }),
    count,
  );
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const colorOptions = [0xfff7d1, 0xf8dd8d, 0xffffff, 0xe8d8ff];
  for (let i = 0; i < count; i += 1) {
    const angle = random() * Math.PI * 2;
    const distance = Math.sqrt(random()) * radius * 0.8;
    const size = 0.65 + random() * 1.25;
    matrix.compose(
      new THREE.Vector3(
        Math.cos(angle) * distance,
        baseY + 0.22 + random() * 0.12,
        Math.sin(angle) * distance,
      ),
      quaternion,
      new THREE.Vector3(size, size, size),
    );
    flower.setMatrixAt(i, matrix);
    scratchColor.setHex(colorOptions[Math.floor(random() * colorOptions.length)]);
    flower.setColorAt(i, scratchColor);
  }
  flower.instanceMatrix.needsUpdate = true;
  if (flower.instanceColor) {
    flower.instanceColor.needsUpdate = true;
  }
  parent.add(flower);
}

function addRimOutcrops(
  parent: THREE.Group,
  random: Random,
  radius: number,
  count: number,
): void {
  const rocks = new THREE.InstancedMesh(
    new THREE.DodecahedronGeometry(1, 0),
    materials.rockPlain,
    count,
  );
  const moss = new THREE.InstancedMesh(
    new THREE.IcosahedronGeometry(1, 0),
    materials.leaves,
    Math.ceil(count * 0.65),
  );
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  let mossIndex = 0;
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + (random() - 0.5) * 0.42;
    const distance = radius * (0.9 + random() * 0.065);
    const width = (2.2 + random() * 5.2) * (radius / 45);
    const height = (2.4 + random() * 4.8) * (radius / 45);
    quaternion.setFromEuler(
      new THREE.Euler((random() - 0.5) * 0.32, random() * Math.PI, (random() - 0.5) * 0.24),
    );
    const basePosition = new THREE.Vector3(
      Math.cos(angle) * distance,
      -0.3 + height * 0.15,
      Math.sin(angle) * distance,
    );
    matrix.compose(
      basePosition,
      quaternion,
      new THREE.Vector3(width, height, width * (0.7 + random() * 0.55)),
    );
    rocks.setMatrixAt(i, matrix);
    scratchColor.setHex(random() > 0.45 ? 0x8f806d : 0x7c7063);
    rocks.setColorAt(i, scratchColor);
    if (i % 3 !== 1 && mossIndex < moss.count) {
      quaternion.identity();
      matrix.compose(
        basePosition.clone().add(new THREE.Vector3(0, height * 0.42, 0)),
        quaternion,
        new THREE.Vector3(width * 0.8, height * 0.24, width * 0.55),
      );
      moss.setMatrixAt(mossIndex, matrix);
      scratchColor.setHex(random() > 0.5 ? 0x557b43 : 0x456d3c);
      moss.setColorAt(mossIndex, scratchColor);
      mossIndex += 1;
    }
  }
  rocks.instanceMatrix.needsUpdate = true;
  moss.instanceMatrix.needsUpdate = true;
  if (rocks.instanceColor) {
    rocks.instanceColor.needsUpdate = true;
  }
  if (moss.instanceColor) {
    moss.instanceColor.needsUpdate = true;
  }
  rocks.castShadow = true;
  rocks.receiveShadow = true;
  moss.castShadow = true;
  parent.add(rocks, moss);
}

export function createRuinPillar(
  height: number,
  radius: number,
  seed: number,
  broken = true,
): THREE.Group {
  const random = mulberry32(seed);
  const group = new THREE.Group();
  const base = makeMesh(
    new THREE.CylinderGeometry(radius * 1.55, radius * 1.75, radius * 0.65, 8),
    materials.ivoryShade,
  );
  base.position.y = radius * 0.32;
  group.add(base);
  const shaftHeight = broken ? height * (0.55 + random() * 0.36) : height;
  const shaft = makeMesh(
    new THREE.CylinderGeometry(radius * 0.7, radius, shaftHeight, 10, 1),
    materials.ivory,
  );
  shaft.position.y = shaftHeight / 2 + radius * 0.6;
  shaft.rotation.z = broken ? (random() - 0.5) * 0.08 : 0;
  group.add(shaft);
  if (!broken) {
    const capital = makeMesh(
      new THREE.CylinderGeometry(radius * 1.25, radius * 0.76, radius * 0.55, 10),
      materials.ivoryBright,
    );
    capital.position.y = shaftHeight + radius * 0.9;
    group.add(capital);
  }
  return group;
}

export function addRuinedColonnade(
  parent: THREE.Group,
  random: Random,
  centerX: number,
  centerZ: number,
  baseY: number,
  scale = 1,
  count = 5,
): void {
  const group = new THREE.Group();
  const spacing = 3.1 * scale;
  for (let i = 0; i < count; i += 1) {
    if (i === Math.floor(count / 2) && random() > 0.1) {
      continue;
    }
    const column = createRuinPillar(
      (5.5 + random() * 2.1) * scale,
      0.55 * scale,
      711 + i * 31 + Math.floor(random() * 999),
      random() > 0.35,
    );
    column.position.set((i - (count - 1) / 2) * spacing, 0, (random() - 0.5) * 0.4 * scale);
    column.rotation.y = (random() - 0.5) * 0.12;
    group.add(column);
  }
  const lintel = makeMesh(
    new THREE.BoxGeometry(spacing * 2.3 * scale, 0.42 * scale, 0.8 * scale),
    materials.ivoryShade,
  );
  lintel.position.set(-spacing * 1.6 * scale, 5.7 * scale, 0);
  lintel.rotation.z = -0.045;
  group.add(lintel);
  group.position.set(centerX, baseY, centerZ);
  group.rotation.y = random() * Math.PI * 2;
  parent.add(group);
}

export function createFloatingIsland(options: FloatingIslandOptions): FloatingIsland {
  const {
    radius,
    depth,
    seed,
    segments = 38,
    grass = true,
    treeCount = 0,
    treeExclusion = radius * 0.3,
    flowers = false,
    ruin = false,
  } = options;
  const random = mulberry32(seed + 1009);
  const group = new THREE.Group();
  group.name = `floating-island-${seed}`;

  const rock = makeMesh(
    createRockBody(radius, depth, seed, segments),
    materials.cliff,
    'inverted-rock',
  );
  group.add(rock);

  let topHeight = 0.1;
  if (grass) {
    const top = makeMesh(
      createGrassTop(radius, seed, segments),
      materials.grass,
      'grass-crown',
    );
    top.receiveShadow = true;
    group.add(top);
    topHeight = 1.55;

    const lip = makeMesh(
      new THREE.CylinderGeometry(
        radius * 1.008,
        radius * 0.985,
        1.75,
        segments,
        1,
        true,
      ),
      materials.warmStoneShade,
      'earth-rim',
    );
    lip.position.y = -0.68;
    group.add(lip);

    const fringe = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(1, 1),
      materials.leaves,
      20,
    );
    const fringeMatrix = new THREE.Matrix4();
    const fringeQuaternion = new THREE.Quaternion();
    for (let i = 0; i < fringe.count; i += 1) {
      const angle = random() * Math.PI * 2;
      const distance = radius * (0.91 + random() * 0.08);
      const size = (0.42 + random() * 1.35) * (radius / 48);
      fringeQuaternion.setFromEuler(
        new THREE.Euler(random() * 0.4, random() * Math.PI, random() * 0.35),
      );
      fringeMatrix.compose(
        new THREE.Vector3(
          Math.cos(angle) * distance,
          -0.5 - random() * 6.5,
          Math.sin(angle) * distance,
        ),
        fringeQuaternion,
        new THREE.Vector3(size * 1.25, size * 0.72, size),
      );
      fringe.setMatrixAt(i, fringeMatrix);
      scratchColor.setHex(random() > 0.45 ? 0x3f703c : 0x557f43);
      fringe.setColorAt(i, scratchColor);
    }
    fringe.instanceMatrix.needsUpdate = true;
    if (fringe.instanceColor) {
      fringe.instanceColor.needsUpdate = true;
    }
    fringe.castShadow = true;
    group.add(fringe);
    addRimOutcrops(group, random, radius, Math.max(5, Math.round(radius * 0.14)));

    const placements: Array<{ x: number; z: number; size: number; baseY: number }> = [];
    let attempts = 0;
    while (placements.length < treeCount && attempts < treeCount * 24) {
      attempts += 1;
      const angle = random() * Math.PI * 2;
      const distance = treeExclusion + Math.sqrt(random()) * Math.max(0, radius * 0.78 - treeExclusion);
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      if (placements.some((tree) => Math.hypot(tree.x - x, tree.z - z) < radius * 0.1 + 1.5)) {
        continue;
      }
      placements.push({
        x,
        z,
        size: (0.52 + random() * 0.85) * (radius / 18),
        baseY: topHeight - 0.15 + (random() - 0.5) * 0.28,
      });
    }
    createTreeInstances(group, placements, seed);

    if (flowers) {
      addFlowerDetails(group, random, radius, Math.floor(radius * 1.9), topHeight);
    }

    const boulderGeometry = new THREE.DodecahedronGeometry(1, 0);
    const boulders = new THREE.InstancedMesh(
      boulderGeometry,
      materials.warmStone,
      Math.max(5, Math.floor(radius * 0.34)),
    );
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    for (let i = 0; i < boulders.count; i += 1) {
      const angle = random() * Math.PI * 2;
      const distance = radius * (0.76 + random() * 0.2);
      const size = 0.35 + random() * 0.95;
      quaternion.setFromEuler(new THREE.Euler(random(), random() * Math.PI, random()));
      matrix.compose(
        new THREE.Vector3(Math.cos(angle) * distance, 0.55 + random() * 0.45, Math.sin(angle) * distance),
        quaternion,
        new THREE.Vector3(size * 1.3, size * 0.65, size),
      );
      boulders.setMatrixAt(i, matrix);
    }
    boulders.instanceMatrix.needsUpdate = true;
    boulders.castShadow = true;
    group.add(boulders);
  }

  if (ruin) {
    addRuinedColonnade(
      group,
      random,
      (random() - 0.5) * radius * 0.42,
      (random() - 0.5) * radius * 0.42,
      topHeight - 0.1,
      Math.max(0.65, radius / 18),
    );
  }

  return { group, radius, depth, seed };
}

export function addTreeGrove(
  parent: THREE.Group,
  seed: number,
  positions: Point[],
  baseY: number,
  averageSize = 1,
): void {
  const random = mulberry32(seed);
  createTreeInstances(
    parent,
    positions.map((point) => ({
      x: point.x,
      z: point.z,
      size: averageSize * (0.72 + random() * 0.55),
      baseY: baseY + random() * 0.12,
    })),
    seed,
  );
}

export function addUndersideRuins(parent: THREE.Group, radius: number, depth: number, seed: number): void {
  const random = mulberry32(seed + 7781);
  const surfaceFactors = [1.075, 1.04, 0.98, 0.91];
  for (let i = 0; i < 4; i += 1) {
    const angle = 0.3 + i * 1.5 + random() * 0.3;
    const distance = radius * (surfaceFactors[i] + (random() - 0.5) * 0.015);
    const group = new THREE.Group();
    group.position.set(
      Math.cos(angle) * distance,
      -depth * (0.105 + i * 0.075),
      Math.sin(angle) * distance,
    );
    group.rotation.y = -angle + Math.PI / 2;

    const ledge = makeMesh(
      new THREE.BoxGeometry(11 + random() * 8, 0.75, 4.1),
      materials.warmStoneShade,
    );
    ledge.rotation.z = (random() - 0.5) * 0.12;
    group.add(ledge);
    for (let columnIndex = 0; columnIndex < 4; columnIndex += 1) {
      const column = createRuinPillar(
        3.2 + random() * 4,
        0.35,
        seed + i * 97 + columnIndex,
        random() > 0.3,
      );
      column.position.set((columnIndex - 1.5) * 2.15, 0.2, 0);
      group.add(column);
    }
    for (let step = 0; step < 5; step += 1) {
      const stair = makeMesh(
        new THREE.BoxGeometry(1.25, 0.32, 0.8),
        materials.warmStoneShade,
      );
      stair.position.set(
        4.1,
        -0.25 - step * 0.3,
        1.4 + step * 0.72,
      );
      group.add(stair);
    }
    parent.add(group);
  }

  for (let i = 0; i < 12; i += 1) {
    const angle = random() * Math.PI * 2;
    const distance = radius * (0.42 + random() * 0.4);
    const shard = makeMesh(
      new THREE.ConeGeometry(0.65 + random() * 1.8, 4 + random() * 13, 5),
      materials.rockPlain,
    );
    shard.position.set(
      Math.cos(angle) * distance,
      -depth * (0.45 + random() * 0.38),
      Math.sin(angle) * distance,
    );
    shard.rotation.z = Math.PI;
    shard.rotation.y = random() * Math.PI;
    parent.add(shard);
  }
}

export function addHangingCrags(
  parent: THREE.Group,
  radius: number,
  depth: number,
  seed: number,
  count: number,
): void {
  const random = mulberry32(seed + 4217);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + random() * 0.48;
    const cragRadius = radius * (0.12 + random() * 0.14);
    const cragDepth = depth * (0.22 + random() * 0.34);
    const crag = makeMesh(
      createRockBody(cragRadius, cragDepth, seed + i * 173, 11),
      materials.cliff,
    );
    const distance = radius * (0.7 + random() * 0.25);
    crag.position.set(
      Math.cos(angle) * distance,
      -depth * (0.16 + random() * 0.28),
      Math.sin(angle) * distance,
    );
    crag.rotation.y = random() * Math.PI * 2;
    crag.rotation.z = (random() - 0.5) * 0.08;
    parent.add(crag);
  }
}

export function addCliffShelves(
  parent: THREE.Group,
  radius: number,
  depth: number,
  seed: number,
): void {
  const levels = [
    { t: 0.14, factor: 1.0 },
    { t: 0.29, factor: 0.92 },
    { t: 0.46, factor: 0.78 },
    { t: 0.62, factor: 0.59 },
    { t: 0.77, factor: 0.39 },
  ];
  const segments = 56;
  const random = mulberry32(seed + 6631);
  levels.forEach((level, levelIndex) => {
    const positions: number[] = [];
    const indices: number[] = [];
    const centerY = -depth * level.t;
    const centerRadius = radius * level.factor;
    for (let segment = 0; segment < segments; segment += 1) {
      const angle = (segment / segments) * Math.PI * 2;
      const jagged =
        1 +
        Math.sin(angle * 4 + seed * 0.21 + levelIndex) * 0.055 +
        (random() - 0.5) * 0.055;
      const innerRadius = centerRadius * jagged * 0.95;
      const outerRadius = centerRadius * jagged + 1.4 + random() * 1.4;
      const y = centerY + Math.sin(angle * 5 + seed) * 0.8 + (random() - 0.5) * 0.45;
      for (const [r, drop] of [
        [innerRadius, 0],
        [outerRadius, 0],
        [innerRadius, 1.1],
        [outerRadius, 1.8],
      ] as const) {
        positions.push(Math.cos(angle) * r, y - drop, Math.sin(angle) * r);
      }
      if (segment < segments - 1) {
        const a = segment * 4;
        const b = (segment + 1) * 4;
        indices.push(a, a + 1, b, b, a + 1, b + 1);
        indices.push(a + 2, b + 2, a + 3, a + 3, b + 2, b + 3);
        indices.push(a + 1, a + 3, b + 1, b + 1, a + 3, b + 3);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const material = materials.warmStoneShade.clone();
    material.side = THREE.DoubleSide;
    const shelf = makeMesh(geometry, material);
    shelf.castShadow = false;
    parent.add(shelf);
  });
}
