import * as THREE from 'three';
import {
  createPavilion,
  createPlazaArch,
  createRuinedSpire,
  createSanctum,
} from './architecture';
import { createBridge, type BridgeEnd } from './bridges';
import { createWaterfall } from './environment';
import {
  addTreeGrove,
  addCliffShelves,
  addHangingCrags,
  addUndersideRuins,
  createFloatingIsland,
  type FloatingIsland,
} from './islands';
import { materials } from './materials';
import { makeMesh, mulberry32 } from './utils';

export interface CelestiaWorld {
  group: THREE.Group;
  update(time: number, delta: number): void;
}

interface RingIslandDefinition {
  angle: number;
  orbit: number;
  radius: number;
  depth: number;
  topY: number;
  seed: number;
  trees: number;
  ruin: boolean;
  pavilion: boolean;
  pavilionScale: number;
}

const ringIslands: RingIslandDefinition[] = [
  {
    angle: 0.08,
    orbit: 214,
    radius: 21,
    depth: 47,
    topY: 5.5,
    seed: 41,
    trees: 7,
    ruin: false,
    pavilion: true,
    pavilionScale: 0.78,
  },
  {
    angle: 0.865,
    orbit: 194,
    radius: 15.5,
    depth: 38,
    topY: 8.2,
    seed: 52,
    trees: 5,
    ruin: true,
    pavilion: false,
    pavilionScale: 1,
  },
  {
    angle: 1.65,
    orbit: 214,
    radius: 18,
    depth: 51,
    topY: 10.2,
    seed: 63,
    trees: 6,
    ruin: false,
    pavilion: true,
    pavilionScale: 0.92,
  },
  {
    angle: 2.435,
    orbit: 188,
    radius: 14,
    depth: 34,
    topY: 12.6,
    seed: 74,
    trees: 4,
    ruin: true,
    pavilion: false,
    pavilionScale: 1,
  },
  {
    angle: 3.22,
    orbit: 226,
    radius: 23,
    depth: 57,
    topY: 7.6,
    seed: 85,
    trees: 8,
    ruin: false,
    pavilion: false,
    pavilionScale: 1,
  },
  {
    angle: 4.005,
    orbit: 203,
    radius: 17,
    depth: 43,
    topY: 9.2,
    seed: 96,
    trees: 5,
    ruin: false,
    pavilion: true,
    pavilionScale: 0.82,
  },
  {
    angle: 4.79,
    orbit: 218,
    radius: 19.5,
    depth: 49,
    topY: 6.2,
    seed: 107,
    trees: 6,
    ruin: true,
    pavilion: false,
    pavilionScale: 1,
  },
  {
    angle: 5.575,
    orbit: 196,
    radius: 16.5,
    depth: 41,
    topY: 8.9,
    seed: 118,
    trees: 5,
    ruin: false,
    pavilion: true,
    pavilionScale: 0.88,
  },
];

function islandPosition(definition: RingIslandDefinition): THREE.Vector3 {
  return new THREE.Vector3(
    Math.sin(definition.angle) * definition.orbit,
    definition.topY,
    Math.cos(definition.angle) * definition.orbit,
  );
}

function addCentralGroves(island: FloatingIsland): void {
  const random = mulberry32(18447);
  const groveCenters = [
    { angle: 0.2, radius: 46 },
    { angle: 1.55, radius: 49 },
    { angle: 2.8, radius: 46 },
    { angle: 4.1, radius: 48 },
    { angle: 5.25, radius: 46 },
  ];
  groveCenters.forEach((grove, groveIndex) => {
    const positions: Array<{ x: number; z: number }> = [];
    for (let i = 0; i < 6; i += 1) {
      const angle = grove.angle + (random() - 0.5) * 0.44;
      const distance = grove.radius + (random() - 0.5) * 5.5;
      positions.push({ x: Math.sin(angle) * distance, z: Math.cos(angle) * distance });
    }
    addTreeGrove(island.group, 1910 + groveIndex * 73, positions, 1.44, 1.2);
  });
}

function createFloatingDebris(): {
  group: THREE.Group;
  update(time: number): void;
} {
  const group = new THREE.Group();
  const random = mulberry32(61983);
  const geometry = new THREE.DodecahedronGeometry(1, 0);
  const debris = new THREE.InstancedMesh(geometry, materials.rockPlain, 52);
  const grassGeometry = new THREE.CylinderGeometry(1, 1.1, 0.2, 7);
  const grassCaps = new THREE.InstancedMesh(
    grassGeometry,
    new THREE.MeshToonMaterial({ color: 0x5a9c57 }),
    12,
  );
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  let grassIndex = 0;
  for (let i = 0; i < debris.count; i += 1) {
    const angle = random() * Math.PI * 2;
    const distance = 145 + random() * 220;
    const size = 0.55 + Math.pow(random(), 2.2) * 5.6;
    const height = -42 + random() * 82;
    quaternion.setFromEuler(
      new THREE.Euler(random() * Math.PI, random() * Math.PI, random() * Math.PI),
    );
    const position = new THREE.Vector3(
      Math.sin(angle) * distance,
      height,
      Math.cos(angle) * distance,
    );
    matrix.compose(position, quaternion, new THREE.Vector3(size, size * (0.65 + random()), size));
    debris.setMatrixAt(i, matrix);
    if (i % 4 === 0 && grassIndex < grassCaps.count) {
      quaternion.identity();
      matrix.compose(
        position.clone().add(new THREE.Vector3(0, size * 0.58, 0)),
        quaternion,
        new THREE.Vector3(size * 0.85, size * 0.2, size * 0.72),
      );
      grassCaps.setMatrixAt(grassIndex, matrix);
      grassIndex += 1;
    }
  }
  debris.instanceMatrix.needsUpdate = true;
  grassCaps.instanceMatrix.needsUpdate = true;
  debris.castShadow = true;
  debris.receiveShadow = true;
  grassCaps.castShadow = true;
  grassCaps.receiveShadow = true;
  group.add(debris, grassCaps);
  group.name = 'floating-debris';
  return {
    group,
    update(time) {
      group.rotation.y = time * 0.0035;
    },
  };
}

export function createCelestiaWorld(): CelestiaWorld {
  const root = new THREE.Group();
  root.name = 'celestia';

  const central = createFloatingIsland({
    radius: 60,
    depth: 108,
    seed: 3201,
    segments: 58,
    grass: true,
    treeCount: 0,
    flowers: true,
  });
  central.group.position.y = 8;
  addCentralGroves(central);
  addUndersideRuins(central.group, 60, 108, 3201);
  addHangingCrags(central.group, 60, 108, 3201, 7);
  addCliffShelves(central.group, 60, 108, 3201);
  addingAncientUnderside(central.group);
  root.add(central.group);

  const sanctum = createSanctum();
  sanctum.group.position.y = 1.45;
  central.group.add(sanctum.group);

  const waterfallMaterials: THREE.ShaderMaterial[] = [];
  const registerWaterfall = (
    top: THREE.Vector3,
    outward: THREE.Vector3,
    height: number,
    width: number,
    seed: number,
  ): void => {
    const waterfall = createWaterfall(top, outward, height, width, seed);
    const material = waterfall.userData.waterfallMaterial;
    if (material instanceof THREE.ShaderMaterial) {
      waterfallMaterials.push(material);
    }
    root.add(waterfall);
  };

  registerWaterfall(
    new THREE.Vector3(Math.sin(0.82) * 59.4, 9.3, Math.cos(0.82) * 59.4),
    new THREE.Vector3(Math.sin(0.82), 0, Math.cos(0.82)),
    112,
    10,
    11,
  );
  registerWaterfall(
    new THREE.Vector3(Math.sin(2.24) * 58.6, 9.0, Math.cos(2.24) * 58.6),
    new THREE.Vector3(Math.sin(2.24), 0, Math.cos(2.24)),
    104,
    6.2,
    37,
  );

  const ringGroups: FloatingIsland[] = [];
  ringIslands.forEach((definition) => {
    const island = createFloatingIsland({
      radius: definition.radius,
      depth: definition.depth,
      seed: definition.seed,
      segments: 34,
      grass: true,
      treeCount: definition.trees,
      treeExclusion: definition.radius * 0.38,
      flowers: true,
      ruin: definition.ruin,
    });
    island.group.position.copy(islandPosition(definition));
    if (definition.pavilion) {
      const pavilion = createPavilion(7700 + definition.seed, definition.pavilionScale);
      pavilion.position.set(
        Math.sin(definition.angle + 0.5) * definition.radius * 0.3,
        1.3,
        Math.cos(definition.angle + 0.5) * definition.radius * 0.3,
      );
      island.group.add(pavilion);
      const arch = createPlazaArch(9900 + definition.seed);
      arch.position.set(
        Math.sin(definition.angle - 0.8) * definition.radius * 0.55,
        1.3,
        Math.cos(definition.angle - 0.8) * definition.radius * 0.55,
      );
      island.group.add(arch);
    }
    if (definition.ruin) {
      const spire = createRuinedSpire(5500 + definition.seed, definition.radius / 17);
      spire.position.set(
        Math.sin(definition.angle - 0.35) * definition.radius * 0.33,
        1.2,
        Math.cos(definition.angle - 0.35) * definition.radius * 0.33,
      );
      island.group.add(spire);
    }
    if (definition.seed === 63 || definition.seed === 85) {
      addUndersideRuins(
        island.group,
        definition.radius,
        definition.depth,
        definition.seed,
      );
    }
    if (definition.seed === 52 || definition.seed === 96) {
      addHangingCrags(
        island.group,
        definition.radius,
        definition.depth,
        definition.seed,
        2,
      );
    }
    ringGroups.push(island);
    root.add(island.group);
  });

  const bridgeEnds: BridgeEnd[] = ringGroups.map((island) => ({
    x: island.group.position.x,
    y: island.group.position.y,
    z: island.group.position.z,
    radius: island.radius,
  }));
  for (let i = 0; i < bridgeEnds.length; i += 1) {
    const from = bridgeEnds[i];
    const to = bridgeEnds[(i + 1) % bridgeEnds.length];
    const bridge = createBridge(from, to, i, i === 1);
    root.add(bridge);
  }

  registerWaterfall(
    new THREE.Vector3(
      ringGroups[0].group.position.x + Math.sin(0.4) * ringGroups[0].radius * 0.8,
      ringGroups[0].group.position.y + 1.2,
      ringGroups[0].group.position.z + Math.cos(0.4) * ringGroups[0].radius * 0.8,
    ),
    new THREE.Vector3(Math.sin(0.4), 0, Math.cos(0.4)),
    68,
    3.2,
    64,
  );
  registerWaterfall(
    new THREE.Vector3(
      ringGroups[6].group.position.x + Math.sin(5.25) * ringGroups[6].radius * 0.8,
      ringGroups[6].group.position.y + 1.2,
      ringGroups[6].group.position.z + Math.cos(5.25) * ringGroups[6].radius * 0.8,
    ),
    new THREE.Vector3(Math.sin(5.25), 0, Math.cos(5.25)),
    57,
    2.5,
    91,
  );

  const debris = createFloatingDebris();
  root.add(debris.group);

  return {
    group: root,
    update(time, delta) {
      sanctum.update(time, delta);
      debris.update(time);
      waterfallMaterials.forEach((material) => {
        material.uniforms.uTime.value = time;
      });
    },
  };
}

function addingAncientUnderside(parent: THREE.Group): void {
  const gateAngles = [0.54, 1.48, 2.52];
  gateAngles.forEach((angle, index) => {
    const group = new THREE.Group();
    const distance = 62.2 - index * 1.5;
    const depth = 21.5 + index * 5.6;
    group.position.set(Math.sin(angle) * distance, -depth, Math.cos(angle) * distance);
    group.rotation.y = angle;
    const recess = makeMesh(
      new THREE.BoxGeometry(5.8, 9.2, 0.35),
      materials.dark,
    );
    recess.position.set(0, -4.1, 0.16);
    group.add(recess);
    for (const side of [-1, 1] as const) {
      const column = makeMesh(
        new THREE.CylinderGeometry(0.3, 0.48, 6.5, 7),
        materials.ivoryShade,
      );
      column.position.set(side * 3.25, -1.2, 0.8);
      group.add(column);
    }
    const arch = makeMesh(
      new THREE.TorusGeometry(3.25, 0.34, 6, 22, Math.PI),
      materials.ivoryShade,
    );
    arch.position.set(0, 2.05, 0.8);
    group.add(arch);
    const sill = makeMesh(
      new THREE.BoxGeometry(9.1, 0.7, 3.7),
      materials.warmStoneShade,
    );
    sill.position.set(0, -5.65, 1.2);
    group.add(sill);
    const lantern = makeMesh(
      new THREE.OctahedronGeometry(0.42, 0),
      materials.goldBright,
    );
    lantern.position.set(0, -2.5, 1.05);
    group.add(lantern);
    parent.add(group);
  });

  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0x22353e,
    emissive: 0xe3ad55,
    emissiveIntensity: 0.42,
    roughness: 0.4,
  });
  for (let i = 0; i < 7; i += 1) {
    const angle = 0.1 + i * 0.83;
    const glow = makeMesh(new THREE.PlaneGeometry(0.7, 2.3), windowMaterial);
    glow.position.set(Math.sin(angle) * 61.8, -13 - (i % 3) * 2.8, Math.cos(angle) * 61.8);
    glow.rotation.y = angle;
    parent.add(glow);
  }
}
