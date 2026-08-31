import * as THREE from 'three';
import {
  beamBetween,
  box,
  cable,
  cylinder,
} from './primitives.js';
import {
  createBarrel,
  createBarricade,
  createCardboardPile,
  createConcreteBarrier,
  createCrate,
  createDumpster,
  createPallet,
  createTire,
  createUtilityPole,
} from './props.js';
import { createSignMaterial } from './materials.js';

function controlBooth(materials, position, rotationY, name) {
  const group = new THREE.Group();
  group.name = name;
  group.add(
    box({
      size: [2.45, 0.18, 2.15],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: `${name}-floor`,
      position: [0, 0.09, 0],
    }),
    box({
      size: [2.45, 0.2, 2.2],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: `${name}-roof`,
      position: [0, 2.65, 0],
    }),
    box({
      size: [2.45, 2.55, 0.18],
      material: materials.steel,
      outlineMaterial: materials.outline,
      name: `${name}-back-wall`,
      position: [0, 1.37, -1.05],
    }),
    box({
      size: [0.18, 2.55, 2.15],
      material: materials.steel,
      outlineMaterial: materials.outline,
      name: `${name}-side-wall`,
      position: [-1.14, 1.37, 0],
    }),
  );

  const frontGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.35), materials.glass);
  frontGlass.name = `${name}-rain-streaked-glass`;
  frontGlass.position.set(0, 1.72, 1.085);
  group.add(frontGlass);
  for (const x of [-1.05, 0, 1.05]) {
    group.add(
      box({
        size: [0.07, 1.48, 0.07],
        material: materials.darkSteel,
        name: `${name}-window-frame`,
        position: [x, 1.72, 1.1],
        outline: false,
      }),
    );
  }

  group.add(
    box({
      size: [1.35, 0.45, 0.55],
      material: materials.concreteLight,
      outlineMaterial: materials.outline,
      name: `${name}-abandoned-control-console`,
      position: [0.2, 0.78, 0.35],
      rotation: [-0.18, 0, 0],
    }),
    box({
      size: [0.58, 0.12, 0.58],
      material: materials.rubber,
      outlineMaterial: materials.outline,
      name: `${name}-seat`,
      position: [0.32, 0.48, -0.4],
    }),
    cylinder({
      radius: 0.06,
      height: 0.42,
      material: materials.darkSteel,
      name: `${name}-seat-post`,
      position: [0.32, 0.24, -0.4],
      outline: false,
    }),
  );

  group.position.set(...position);
  group.rotation.y = rotationY;
  return group;
}

function roadSign(materials, position, rotationY, text, detail, color) {
  const group = new THREE.Group();
  group.name = `${text}-discarded-road-sign`;
  const signMaterial = createSignMaterial({
    text,
    detail,
    color,
    background: 'rgba(37, 54, 59, .86)',
    border: 'rgba(205, 214, 211, .65)',
    seed: text.charCodeAt(0) * 3,
  });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.9), signMaterial);
  panel.position.y = 1.75;
  group.add(
    panel,
    cylinder({
      radius: 0.045,
      height: 1.75,
      radialSegments: 8,
      material: materials.rust,
      name: 'road-sign-post',
      position: [0, 0.88, 0],
      outline: false,
    }),
    box({
      size: [1.2, 0.12, 0.62],
      material: materials.concreteDark,
      name: 'road-sign-foot',
      position: [0, 0.06, 0],
      outline: false,
    }),
  );
  group.position.set(...position);
  group.rotation.y = rotationY;
  return group;
}

function bulletCluster(materials, position, rotation = [0, 0, 0], count = 9) {
  const group = new THREE.Group();
  group.name = 'dense-bullet-impact-cluster';
  const geometry = new THREE.CircleGeometry(0.055, 8);
  const ringGeometry = new THREE.RingGeometry(0.065, 0.1, 8);
  for (let index = 0; index < count; index += 1) {
    const angle = index * 2.399;
    const radius = 0.12 + (index % 4) * 0.11;
    const hole = new THREE.Mesh(geometry, materials.blackPaint);
    hole.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.006);
    const chip = new THREE.Mesh(ringGeometry, materials.concreteLight);
    chip.position.copy(hole.position);
    chip.position.z = 0.003;
    group.add(chip, hole);
  }
  group.position.set(...position);
  group.rotation.set(...rotation);
  return group;
}

function runoffStreaks(materials) {
  const material = new THREE.MeshBasicMaterial({
    color: 0x17272e,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
  });
  const group = new THREE.Group();
  group.name = 'wall-rain-runoff-streaks';
  const placements = [
    [-15.57, 2.4, -7.1, Math.PI / 2, 2.1],
    [-15.57, 3.15, -10.4, Math.PI / 2, 1.65],
    [8.43, 2.6, -9.2, -Math.PI / 2, 1.8],
    [11.7, 3.85, -13.05, 0, 1.45],
    [-4.9, 2.5, -0.91, 0, 1.3],
  ];
  for (const [x, y, z, rotationY, height] of placements) {
    for (let index = 0; index < 4; index += 1) {
      const streak = new THREE.Mesh(
        new THREE.PlaneGeometry(0.035 + index * 0.012, height * (0.7 + index * 0.08)),
        material,
      );
      streak.position.set(x + index * 0.11, y - index * 0.08, z + 0.01);
      streak.rotation.y = rotationY;
      group.add(streak);
    }
  }
  return group;
}

function groundLitter(materials) {
  const group = new THREE.Group();
  group.name = 'packaging-straps-and-old-newspapers';
  const paperMaterial = new THREE.MeshStandardMaterial({
    color: 0xa6a397,
    roughness: 0.96,
    side: THREE.DoubleSide,
  });
  const placements = [
    [-13.3, -4.65, 0.15],
    [-8.4, -5.25, -0.18],
    [-11.8, -3.92, 0.08],
    [10.15, -8.5, -0.06],
    [8.85, -4.45, 0.22],
    [1.9, 8.25, -0.14],
    [-14.6, 7.2, 0.05],
  ];
  for (let index = 0; index < placements.length; index += 1) {
    const [x, z, angle] = placements[index];
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.38), paperMaterial);
    paper.name = 'waterlogged-old-newspaper';
    paper.position.set(x, 0.47 + index * 0.001, z);
    paper.rotation.set(-Math.PI / 2, 0, angle);
    group.add(paper);
  }
  for (const [x, z, angle] of [
    [-10.6, -4.45, 0.2],
    [-9.2, -5.2, -0.08],
    [9.9, -6.1, 0.16],
    [-2.7, 7.7, -0.1],
  ]) {
    group.add(
      box({
        size: [1.4, 0.025, 0.055],
        material: materials.redSteel,
        name: 'discarded-packing-band',
        position: [x, 0.45, z],
        rotation: [0, angle, 0],
        outline: false,
        castShadow: false,
      }),
    );
  }
  return group;
}

function overheadUtilities(materials) {
  const group = new THREE.Group();
  group.name = 'overhead-poles-and-black-cables';
  group.add(
    createUtilityPole(materials, [-17.35, 0.25, 8.2], 7.6),
    createUtilityPole(materials, [17.2, 0.25, -9.4], 7.35),
    createUtilityPole(materials, [17.1, 0.25, 9.8], 7.5),
  );

  const cableRuns = [
    [
      [-17.35, 7.25, 8.2],
      [-8.2, 6.55, 4.2],
      [0, 6.85, 0],
      [8.4, 6.15, -4.7],
      [17.2, 7.05, -9.4],
    ],
    [
      [-17.35, 7.08, 8.2],
      [-8.3, 6.28, 4.1],
      [0.1, 6.57, -0.1],
      [8.55, 5.95, -4.8],
      [17.2, 6.88, -9.4],
    ],
    [
      [17.2, 7.05, -9.4],
      [16.7, 6.25, 0.2],
      [17.1, 7.2, 9.8],
    ],
  ];
  for (let index = 0; index < cableRuns.length; index += 1) {
    group.add(
      cable({
        points: cableRuns[index],
        radius: index === 0 ? 0.036 : 0.025,
        material: materials.wire,
        name: `sagging-overhead-cable-${index + 1}`,
        tubularSegments: 40,
      }),
    );
  }
  return group;
}

function drainageDetails(materials) {
  const group = new THREE.Group();
  group.name = 'rusted-gutters-downpipes-and-sewer-exit';
  const pipes = [
    [[-15.58, 5.45, -12.2], [-15.58, 0.48, -12.2]],
    [[-15.58, 5.45, -4.6], [-15.58, 0.48, -4.6]],
    [[13.95, 5.55, -12.55], [13.95, 0.46, -12.55]],
    [[8.4, 5.55, -12.45], [8.4, 0.46, -12.45]],
  ];
  for (const [start, end] of pipes) {
    group.add(
      beamBetween({
        start,
        end,
        radius: 0.095,
        material: materials.rust,
        name: 'rusted-sheet-metal-downpipe',
      }),
    );
  }

  group.add(
    box({
      size: [2.15, 1.5, 0.58],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'ct-flank-sewer-exit-frame',
      position: [3.05, 1.08, 10.9],
    }),
    box({
      size: [1.55, 1.05, 0.08],
      material: materials.blackPaint,
      name: 'ct-flank-dark-sewer-exit',
      position: [3.05, 1.08, 10.59],
      outline: false,
    }),
  );
  for (let index = -2; index <= 2; index += 1) {
    group.add(
      beamBetween({
        start: [2.48 + index * 0.28, 0.57, 10.52],
        end: [2.48 + index * 0.28, 1.57, 10.52],
        radius: 0.025,
        material: materials.rust,
        castShadow: false,
      }),
    );
  }
  return group;
}

function tacticalCover(materials) {
  const group = new THREE.Group();
  group.name = 'distributed-tactical-cover-and-street-debris';
  group.add(
    createBarrel(materials, [-13.75, 0.31, 5.95], materials.blueSteel),
    createBarrel(materials, [-14.65, 0.31, 6.2], materials.rust),
    createCrate(materials, {
      size: [1.35, 1.25, 1.3],
      position: [-12.95, 0.95, 8.15],
      rotationY: 0.12,
      name: 'left-flank-cover-crate',
    }),
    createCardboardPile(materials, [-16.45, 0.31, 3.5], -0.1),
    createDumpster(materials, [-16.45, 0.31, 11.25], Math.PI / 2),
    createPallet(materials, [12.8, 0.31, 9.45], 0.18),
    createBarrel(materials, [12.7, 0.31, 7.65], materials.blueSteel),
    createBarricade(materials, [6.1, 0.31, 9.6], -0.15, false),
    createConcreteBarrier(materials, [-5.15, 0.31, 10.6], 0.08),
    roadSign(materials, [2.15, 0.31, 7.4], -0.18, '← A', 'SERVICE', '#d8d1a8'),
    roadSign(materials, [5.7, 0.31, 1.5], 0.15, 'B →', 'WATCH', '#d8b979'),
  );

  group.add(
    createTire(materials, [-15.8, 0.48, 8.6]),
    createTire(materials, [-15.35, 0.48, 8.8], [Math.PI / 2, 0.12, 0]),
    createTire(materials, [12.6, 0.48, -1.4], [Math.PI / 2, -0.08, 0]),
  );
  return group;
}

export function buildEnvironmentalDetails(materials) {
  const group = new THREE.Group();
  group.name = 'freight-yard-environmental-storytelling';
  group.add(
    controlBooth(materials, [-5.25, 0.32, 3.35], 0.04, 'west-mid-control-booth'),
    controlBooth(materials, [5.3, 0.32, 4.15], Math.PI, 'east-mid-control-booth'),
    tacticalCover(materials),
    overheadUtilities(materials),
    drainageDetails(materials),
    groundLitter(materials),
    runoffStreaks(materials),
    bulletCluster(materials, [-10.65, 2.45, -3.28], [0, 0, 0], 12),
    bulletCluster(materials, [8.7, 2.25, -7.13], [0, 0, 0], 8),
    bulletCluster(materials, [-4.45, 2.42, -0.89], [0, 0, 0], 10),
  );
  return group;
}
