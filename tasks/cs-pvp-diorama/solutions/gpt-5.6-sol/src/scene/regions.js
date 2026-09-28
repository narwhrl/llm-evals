import * as THREE from 'three';
import { BASE } from './layout.js';
import {
  beamBetween,
  box,
  cable,
  cylinder,
  fencePanel,
  ladder,
  makeRamp,
  railing,
  stairs,
  wallWithOpening,
} from './primitives.js';
import {
  createBarrel,
  createBarricade,
  createConcreteBarrier,
  createContainer,
  createCrate,
  createPallet,
  createTruck,
  createUtilityPole,
} from './props.js';
import { createSignMaterial } from './materials.js';
import { buildBombsites } from './sites.js';

function addRoadSegment(group, materials, name, size, position, rotationY = 0) {
  group.add(
    box({
      size,
      material: materials.wetAsphalt,
      outlineMaterial: materials.outline,
      name,
      position,
      rotation: [0, rotationY, 0],
      outline: false,
      castShadow: false,
      receiveShadow: true,
    }),
  );
}

function buildBase(materials) {
  const group = new THREE.Group();
  group.name = 'square-concrete-diorama-base';
  group.add(
    box({
      size: [BASE.width, BASE.thickness, BASE.depth],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'solid-square-concrete-plinth',
      position: [0, -BASE.thickness / 2, 0],
    }),
    box({
      size: [39.2, 0.24, 39.2],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'weathered-concrete-surface',
      position: [0, 0.02, 0],
      castShadow: false,
    }),
  );

  const seamMaterial = materials.concreteDark;
  for (const x of [-9.8, 9.8]) {
    group.add(
      box({
        size: [0.055, 0.018, 38.4],
        material: seamMaterial,
        name: `concrete-expansion-seam-x-${x}`,
        position: [x, 0.16, 0],
        outline: false,
        castShadow: false,
      }),
    );
  }
  for (const z of [-9.8, 9.8]) {
    group.add(
      box({
        size: [38.4, 0.018, 0.055],
        material: seamMaterial,
        name: `concrete-expansion-seam-z-${z}`,
        position: [0, 0.16, z],
        outline: false,
        castShadow: false,
      }),
    );
  }

  const edgeInset = 19.45;
  const trimHeight = 0.52;
  group.add(
    box({
      size: [38.9, trimHeight, 0.18],
      material: materials.concreteLight,
      name: 'north-plinth-trim',
      position: [0, -0.34, -edgeInset],
      outline: false,
    }),
    box({
      size: [38.9, trimHeight, 0.18],
      material: materials.concreteLight,
      name: 'south-plinth-trim',
      position: [0, -0.34, edgeInset],
      outline: false,
    }),
    box({
      size: [0.18, trimHeight, 38.9],
      material: materials.concreteLight,
      name: 'west-plinth-trim',
      position: [-edgeInset, -0.34, 0],
      outline: false,
    }),
    box({
      size: [0.18, trimHeight, 38.9],
      material: materials.concreteLight,
      name: 'east-plinth-trim',
      position: [edgeInset, -0.34, 0],
      outline: false,
    }),
  );

  return group;
}

function buildRoadNetwork(materials) {
  const group = new THREE.Group();
  group.name = 'three-route-road-network';

  addRoadSegment(group, materials, 'central-duel-lane', [6.6, 0.16, 30.5], [0, 0.19, 0.2]);
  addRoadSegment(group, materials, 'left-flank-spine', [4.25, 0.16, 30.4], [-15.05, 0.19, 0.9]);
  addRoadSegment(group, materials, 'left-flank-north-link', [10.7, 0.16, 4.25], [-9.8, 0.19, -14.5], 0.08);
  addRoadSegment(group, materials, 'left-flank-south-link', [11.2, 0.16, 4.1], [-9.6, 0.19, 12.7], -0.16);
  addRoadSegment(group, materials, 'right-flank-spine', [4.25, 0.16, 30.4], [14.75, 0.19, 0.8]);
  addRoadSegment(group, materials, 'right-flank-north-link', [10.7, 0.16, 4.25], [9.7, 0.19, -14.45], -0.1);
  addRoadSegment(group, materials, 'right-flank-south-link', [10.8, 0.16, 4.1], [9.6, 0.19, 12.65], 0.16);

  const curbMaterial = materials.concreteLight;
  for (const x of [-3.45, 3.45]) {
    group.add(
      box({
        size: [0.34, 0.32, 29.8],
        material: curbMaterial,
        outlineMaterial: materials.outline,
        name: `mid-lane-curb-${x}`,
        position: [x, 0.3, 0],
        outline: false,
      }),
    );
  }

  return group;
}

function shootingWall(materials, x, name) {
  const group = new THREE.Group();
  group.name = name;
  const width = 5.7;
  const depth = 0.68;
  const wallHeight = 3.9;
  const openingWidth = 1.15;
  const openingBottom = 2.08;
  const openingHeight = 0.86;
  group.position.set(x, 0.22, -0.55);

  group.add(
    box({
      size: [width, openingBottom, depth],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: `${name}-lower`,
      position: [0, openingBottom / 2, 0],
    }),
    box({
      size: [(width - openingWidth) / 2, wallHeight - openingBottom, depth],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: `${name}-upper-left`,
      position: [-(width + openingWidth) / 4, openingBottom + (wallHeight - openingBottom) / 2, 0],
    }),
    box({
      size: [(width - openingWidth) / 2, wallHeight - openingBottom, depth],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: `${name}-upper-right`,
      position: [(width + openingWidth) / 4, openingBottom + (wallHeight - openingBottom) / 2, 0],
    }),
    box({
      size: [openingWidth, wallHeight - openingBottom - openingHeight, depth],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: `${name}-window-header`,
      position: [0, openingBottom + openingHeight + (wallHeight - openingBottom - openingHeight) / 2, 0],
    }),
    box({
      size: [2.8, 0.25, 2.1],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: `${name}-firing-platform`,
      position: [0, 1.93, x < 0 ? 1.22 : -1.22],
    }),
  );

  const platformZ = x < 0 ? 1.55 : -1.55;
  const stairRotation = x < 0 ? Math.PI : 0;
  group.add(
    stairs({
      width: 1.3,
      rise: 1.92,
      run: 3.3,
      steps: 7,
      material: materials.rust,
      outlineMaterial: materials.outline,
      name: `${name}-access-stairs`,
      position: [x < 0 ? -1.4 : 1.4, 0, platformZ + (x < 0 ? 1.6 : -1.6)],
      rotationY: stairRotation,
    }),
  );

  return group;
}

function buildMid(materials) {
  const group = new THREE.Group();
  group.name = 'mid-duel-lane';

  group.add(
    shootingWall(materials, -6.6, 'west-high-fire-wall'),
    shootingWall(materials, 6.6, 'east-high-fire-wall'),
  );

  for (const x of [-3.55, 3.55]) {
    group.add(
      box({
        size: [0.65, 4.25, 0.85],
        material: materials.concreteDark,
        outlineMaterial: materials.outline,
        name: `mid-gate-post-${x}`,
        position: [x, 2.25, -0.56],
      }),
    );
  }

  const leftDoor = box({
    size: [3.08, 3.52, 0.24],
    material: materials.blueSteel,
    outlineMaterial: materials.outline,
    name: 'half-open-left-iron-door',
    position: [-1.86, 2.01, -0.54],
    rotation: [0, -0.23, 0],
  });
  const rightDoor = box({
    size: [3.08, 3.52, 0.24],
    material: materials.rust,
    outlineMaterial: materials.outline,
    name: 'half-open-right-iron-door',
    position: [1.95, 2.01, -0.32],
    rotation: [0, 0.52, 0],
  });
  group.add(leftDoor, rightDoor);

  for (const door of [leftDoor, rightDoor]) {
    door.add(
      box({
        size: [2.6, 0.12, 0.14],
        material: materials.darkSteel,
        name: 'door-horizontal-brace',
        position: [0, 0.58, 0.17],
        outline: false,
      }),
      box({
        size: [2.6, 0.12, 0.14],
        material: materials.darkSteel,
        name: 'door-horizontal-brace',
        position: [0, -0.62, 0.17],
        outline: false,
      }),
    );
  }

  group.add(
    box({
      size: [1.18, 0.13, 10.8],
      material: materials.blackPaint,
      outlineMaterial: materials.outline,
      name: 'mid-drainage-channel',
      position: [0.15, 0.32, 6.25],
      castShadow: false,
    }),
    box({
      size: [4.2, 1.35, 0.72],
      material: materials.concreteLight,
      outlineMaterial: materials.outline,
      name: 'ct-mid-low-wall',
      position: [-0.65, 0.91, 8.45],
    }),
  );

  for (let index = 0; index < 19; index += 1) {
    const z = 1.05 + index * 0.58;
    group.add(
      box({
        size: [1.24, 0.065, 0.075],
        material: materials.rust,
        name: `drain-grate-${index}`,
        position: [0.15, 0.43, z],
        outline: false,
        castShadow: false,
      }),
    );
  }

  group.add(
    makeRamp({
      width: 6.1,
      depth: 5.3,
      height: 1.32,
      material: materials.wetAsphalt,
      outlineMaterial: materials.outline,
      name: 't-mid-loading-ramp',
      position: [0, 0.2, -10.65],
    }),
    wallWithOpening({
      width: 5.7,
      height: 1.8,
      depth: 0.68,
      openingWidth: 1.65,
      openingHeight: 1.18,
      openingCenterX: -1.65,
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'sewer-entry-retaining-wall',
      position: [0, 0.2, -7.98],
    }),
    box({
      size: [1.42, 1.04, 0.08],
      material: materials.blackPaint,
      name: 'dark-sewer-mouth',
      position: [-1.65, 0.73, -7.61],
      outline: false,
      castShadow: false,
    }),
  );

  for (let index = -2; index <= 2; index += 1) {
    group.add(
      beamBetween({
        start: [-2.28 + index * 0.31, 0.24, -7.55],
        end: [-2.28 + index * 0.31, 1.28, -7.55],
        radius: 0.026,
        material: materials.rust,
        castShadow: false,
      }),
    );
  }

  return group;
}

function buildLeftFlank(materials) {
  const group = new THREE.Group();
  group.name = 'left-back-alley-route';
  group.add(
    box({
      size: [0.58, 3.2, 31.5],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'left-boundary-alley-wall',
      position: [-18.65, 1.75, 0.6],
    }),
    box({
      size: [1.1, 1.2, 5.5],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'left-alley-cover-wall',
      position: [-13.1, 0.84, 4.5],
    }),
    box({
      size: [2.7, 0.24, 6.4],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'left-alley-short-catwalk',
      position: [-16.65, 2.55, -1.8],
    }),
  );
  group.add(
    railing({
      length: 6.2,
      material: materials.rust,
      name: 'left-alley-catwalk-rail',
      position: [-15.25, 2.7, -1.8],
      rotationY: Math.PI / 2,
    }),
  );
  return group;
}

function buildRightFlank(materials) {
  const group = new THREE.Group();
  group.name = 'right-elevated-flank-route';
  group.add(
    box({
      size: [3.7, 0.35, 15.2],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'right-flank-elevated-deck',
      position: [14.75, 3.15, 1.3],
    }),
    box({
      size: [0.55, 3.5, 31.2],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'right-boundary-wall',
      position: [18.68, 1.9, 0.45],
    }),
  );

  for (const z of [-5.5, -1, 3.5, 8]) {
    group.add(
      box({
        size: [0.46, 3.08, 0.46],
        material: materials.rust,
        outlineMaterial: materials.outline,
        name: `right-platform-support-${z}`,
        position: [13.35, 1.6, z],
        outline: false,
      }),
      box({
        size: [0.46, 3.08, 0.46],
        material: materials.rust,
        outlineMaterial: materials.outline,
        name: `right-platform-support-${z}-outer`,
        position: [16.15, 1.6, z],
        outline: false,
      }),
    );
  }

  group.add(
    railing({
      length: 14.8,
      material: materials.rust,
      name: 'right-flank-inner-rail',
      position: [12.96, 3.32, 1.3],
      rotationY: Math.PI / 2,
      spacing: 1.8,
    }),
    stairs({
      width: 1.75,
      rise: 3.02,
      run: 5.6,
      steps: 10,
      material: materials.rust,
      outlineMaterial: materials.outline,
      name: 'right-flank-south-stairs',
      position: [14.75, 0.2, 8.85],
      rotationY: Math.PI,
    }),
    stairs({
      width: 1.75,
      rise: 3.02,
      run: 5.2,
      steps: 9,
      material: materials.rust,
      outlineMaterial: materials.outline,
      name: 'right-flank-north-stairs',
      position: [14.75, 0.2, -6.35],
      rotationY: 0,
    }),
  );

  return group;
}

function buildTSpawn(materials) {
  const group = new THREE.Group();
  group.name = 't-north-loading-spawn';

  group.add(
    fencePanel({
      width: 12.5,
      height: 2.65,
      material: materials.wire,
      frameMaterial: materials.rust,
      name: 't-spawn-rear-chain-fence',
      position: [0, 0.3, -18.55],
    }),
    fencePanel({
      width: 5.8,
      height: 2.65,
      material: materials.wire,
      frameMaterial: materials.rust,
      name: 't-spawn-west-chain-fence',
      position: [-9.3, 0.3, -16.2],
      rotationY: Math.PI / 2,
    }),
    createTruck(materials, {
      position: [-6.15, 0.3, -15.35],
      rotationY: 0.02,
    }),
    ladder({
      width: 0.9,
      height: 3.45,
      rungs: 9,
      material: materials.wood,
      name: 'truck-side-wooden-ladder',
      position: [-4.83, 0.38, -15.55],
      rotation: [0.02, 0, -0.28],
    }),
  );

  const containerPositions = [
    [5.15, 0.3, -16.15, materials.blueSteel, 'N7 402'],
    [5.15, 2.88, -16.15, materials.tealSteel, 'N7 403'],
    [5.15, 5.46, -16.15, materials.redSteel, 'N7 404'],
    [8.35, 0.3, -16.15, materials.blueSteel, 'N7 211'],
  ];
  for (const [x, y, z, material, code] of containerPositions) {
    group.add(
      createContainer(materials, {
        position: [x, y, z],
        rotationY: Math.PI / 2,
        material,
        code,
        name: `t-container-${code}`,
      }),
    );
  }

  const barrelPositions = [
    [-2.72, 0.31, -13.55],
    [-1.82, 0.31, -13.55],
    [-2.72, 0.31, -12.62],
    [-1.82, 0.31, -12.62],
  ];
  for (let index = 0; index < barrelPositions.length; index += 1) {
    group.add(
      createBarrel(
        materials,
        barrelPositions[index],
        index % 2 === 0 ? materials.blueSteel : materials.rust,
      ),
    );
  }

  group.add(
    createPallet(materials, [-3.9, 0.3, -12.75], -0.14),
    createCrate(materials, {
      size: [1.25, 1.05, 1.1],
      position: [8.35, 0.84, -12.65],
      rotationY: 0.09,
      name: 't-lane-single-gap-crate',
    }),
    createUtilityPole(materials, [-10.35, 0.25, -12.55], 7.4),
  );

  const spawnSignMaterial = createSignMaterial({
    text: 'T',
    detail: 'FREIGHT ACCESS',
    color: '#d76454',
    background: 'rgba(24, 31, 34, .72)',
    border: '#87433a',
    seed: 72,
  });
  const spawnSign = new THREE.Mesh(
    new THREE.PlaneGeometry(2.7, 1.35),
    spawnSignMaterial,
  );
  spawnSign.name = 't-spawn-environment-stencil';
  spawnSign.position.set(-1.25, 1.72, -18.49);
  group.add(spawnSign);

  group.add(
    cable({
      points: [
        [-6.1, 3.15, -18.5],
        [-3.2, 2.95, -18.5],
        [0, 3.1, -18.5],
        [3.2, 2.92, -18.5],
        [6.1, 3.14, -18.5],
      ],
      radius: 0.025,
      material: materials.wire,
      name: 't-spawn-barbed-top-wire',
    }),
  );

  return group;
}

function buildCTSpawn(materials) {
  const group = new THREE.Group();
  group.name = 'ct-south-police-lockdown-spawn';

  group.add(
    box({
      size: [19.5, 3.1, 0.55],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'ct-sealed-rear-wall',
      position: [0, 1.82, 18.55],
    }),
    createTruck(materials, {
      position: [-6.15, 0.3, 14.9],
      rotationY: -0.05,
      police: true,
    }),
    createBarricade(materials, [-0.5, 0.3, 13.55], 0.08, true),
    createBarricade(materials, [3.05, 0.3, 15.3], -0.18, true),
    createConcreteBarrier(materials, [-1.65, 0.3, 16.55], 0.02),
    createCrate(materials, {
      size: [1.7, 1.05, 1.25],
      position: [4.8, 0.84, 17.2],
      name: 'ct-armour-equipment-case',
      material: materials.blueSteel,
    }),
    createCrate(materials, {
      size: [1.2, 0.8, 1],
      position: [6.2, 0.7, 17.35],
      rotationY: 0.08,
      name: 'ct-helmet-equipment-case',
      material: materials.darkSteel,
    }),
  );

  for (const [x, z, angle] of [
    [-2.75, 14.45, -0.18],
    [1.02, 15.7, 0.16],
  ]) {
    group.add(
      box({
        size: [0.72, 1.28, 0.18],
        material: materials.blueSteel,
        outlineMaterial: materials.outline,
        name: 'ct-ballistic-shield',
        position: [x, 0.94, z],
        rotation: [0, angle, 0],
      }),
    );
  }

  group.add(
    box({
      size: [4.25, 0.35, 5.4],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'ct-overwatch-platform',
      position: [10.65, 3.02, 14.75],
    }),
    stairs({
      width: 1.65,
      rise: 2.85,
      run: 4.6,
      steps: 9,
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'ct-overwatch-exterior-stairs',
      position: [8.3, 0.3, 14.75],
      rotationY: Math.PI / 2,
    }),
  );
  for (const x of [9.05, 12.25]) {
    for (const z of [12.65, 16.85]) {
      group.add(
        box({
          size: [0.5, 2.8, 0.5],
          material: materials.concreteDark,
          name: 'ct-platform-support',
          position: [x, 1.55, z],
          outline: false,
        }),
      );
    }
  }
  group.add(
    railing({
      length: 5,
      material: materials.darkSteel,
      name: 'ct-overwatch-front-railing',
      position: [10.65, 3.18, 12.2],
    }),
    box({
      size: [1.25, 0.62, 0.68],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'ct-searchlight-housing',
      position: [10.65, 5.22, 13.25],
      rotation: [-0.24, 0, 0],
    }),
    cylinder({
      radius: 0.12,
      height: 2.2,
      material: materials.rust,
      outlineMaterial: materials.outline,
      name: 'ct-searchlight-stand',
      position: [10.65, 4.08, 13.7],
    }),
    box({
      size: [0.72, 0.32, 0.05],
      material: materials.emissiveCool,
      name: 'ct-searchlight-lens',
      position: [10.65, 5.12, 12.89],
      rotation: [-0.24, 0, 0],
      outline: false,
    }),
  );

  const searchlight = new THREE.SpotLight(0xbde9ff, 72, 35, 0.3, 0.72, 1.5);
  searchlight.name = 'ct-sweeping-tactical-searchlight';
  searchlight.position.set(10.65, 5.25, 13.1);
  searchlight.castShadow = true;
  searchlight.shadow.mapSize.set(512, 512);
  const searchTarget = new THREE.Object3D();
  searchTarget.position.set(0, 0.8, 1.5);
  searchlight.target = searchTarget;
  group.add(searchlight, searchTarget);

  const ctSignMaterial = createSignMaterial({
    text: 'CT',
    detail: 'POLICE CONTROL',
    color: '#dce8ed',
    background: 'rgba(21, 47, 64, .78)',
    border: '#6590a5',
    seed: 94,
  });
  const ctSign = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 1.45),
    ctSignMaterial,
  );
  ctSign.name = 'ct-spawn-police-wall-marking';
  ctSign.position.set(0, 1.95, 18.25);
  ctSign.rotation.y = Math.PI;
  group.add(ctSign);

  return group;
}

export function buildCoreMap(materials) {
  const group = new THREE.Group();
  group.name = 'bounded-cs-pvp-map';
  group.add(
    buildBase(materials),
    buildRoadNetwork(materials),
    buildMid(materials),
    buildLeftFlank(materials),
    buildRightFlank(materials),
    buildTSpawn(materials),
    buildCTSpawn(materials),
    buildBombsites(materials),
  );
  return group;
}
