import * as THREE from 'three';
import {
  beamBetween,
  box,
  corrugatedPanel,
  cylinder,
  ladder,
  railing,
} from './primitives.js';
import {
  createACUnit,
  createBicycle,
  createCardboardPile,
  createCrate,
  createDeskSet,
  createDumpster,
  createFireEscape,
  createLocker,
  createPallet,
  createPalletJack,
  createSackPile,
  createShelf,
} from './props.js';
import { createSignMaterial, createStencilMaterial } from './materials.js';

function floorStencil(letter, position, color, seed) {
  const material = createStencilMaterial(letter, color, seed);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4.15, 4.15), material);
  mesh.name = `${letter.toLowerCase()}-bombsite-floor-stencil`;
  mesh.position.set(...position);
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = 4;
  return mesh;
}

function wallSign({ text, detail, position, rotationY = 0, color, seed }) {
  const material = createSignMaterial({
    text,
    detail,
    color,
    background: 'rgba(22, 30, 33, .72)',
    border: 'rgba(164, 178, 179, .6)',
    seed,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.35, 1.12), material);
  mesh.name = `${text.toLowerCase()}-weathered-freight-sign`;
  mesh.position.set(...position);
  mesh.rotation.y = rotationY;
  return mesh;
}

function boardedWindow(materials, position, rotationY = 0, name = 'boarded-window') {
  const group = new THREE.Group();
  group.name = name;
  group.add(
    box({
      size: [1.42, 1.5, 0.08],
      material: materials.blackPaint,
      outlineMaterial: materials.outline,
      name: `${name}-void`,
      position: [0, 0, 0],
      castShadow: false,
    }),
  );
  for (const [y, angle] of [[-0.42, -0.1], [0.03, 0.08], [0.46, -0.06]]) {
    group.add(
      box({
        size: [1.78, 0.2, 0.13],
        material: materials.lightWood,
        outlineMaterial: materials.outline,
        name: `${name}-breakable-board`,
        position: [0, y, 0.08],
        rotation: [0, 0, angle],
        outline: false,
      }),
    );
  }
  group.position.set(...position);
  group.rotation.y = rotationY;
  return group;
}

function buildWarehouseShell(materials) {
  const group = new THREE.Group();
  group.name = 'a-site-half-open-warehouse-shell';

  group.add(
    box({
      size: [9, 0.2, 9.55],
      material: materials.wetAsphalt,
      outlineMaterial: materials.outline,
      name: 'a-warehouse-wet-floor',
      position: [-10.78, 0.32, -8.3],
      castShadow: false,
    }),
    box({
      size: [9, 5.45, 0.52],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'a-warehouse-rear-wall',
      position: [-10.78, 3.02, -13.04],
    }),
    box({
      size: [0.52, 5.45, 9.55],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'a-warehouse-west-wall',
      position: [-15.28, 3.02, -8.3],
    }),
    box({
      size: [9.1, 0.3, 4.1],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'a-warehouse-partial-roof',
      position: [-10.78, 5.73, -10.92],
    }),
  );

  const frontZ = -3.52;
  group.add(
    box({
      size: [1.15, 5.15, 0.44],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'a-warehouse-front-left-pier',
      position: [-14.72, 2.87, frontZ],
    }),
    box({
      size: [1.15, 5.15, 0.44],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'a-warehouse-front-right-pier',
      position: [-6.85, 2.87, frontZ],
    }),
    box({
      size: [6.75, 1.08, 0.44],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'a-warehouse-front-header',
      position: [-10.78, 4.9, frontZ],
    }),
    corrugatedPanel({
      width: 6.28,
      height: 2.1,
      depth: 0.16,
      material: materials.rust,
      ribMaterial: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'a-half-raised-rolling-shutter',
      position: [-10.78, 3.8, frontZ - 0.02],
    }),
  );

  const sideX = -6.28;
  group.add(
    box({
      size: [0.5, 1.18, 9.3],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'a-side-wall-lower-band',
      position: [sideX, 0.91, -8.4],
    }),
    box({
      size: [0.5, 1.05, 9.3],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'a-side-wall-upper-band',
      position: [sideX, 5.18, -8.4],
    }),
  );
  for (const z of [-12.6, -10.4, -7.5, -4.05]) {
    group.add(
      box({
        size: [0.5, 3.25, 0.62],
        material: materials.concrete,
        outlineMaterial: materials.outline,
        name: 'a-side-wall-column',
        position: [sideX, 3.03, z],
      }),
    );
  }

  group.add(
    boardedWindow(materials, [sideX + 0.01, 3, -8.92], Math.PI / 2, 'a-boarded-window-one'),
    boardedWindow(materials, [sideX + 0.01, 3, -5.74], Math.PI / 2, 'a-boarded-window-two'),
    box({
      size: [0.14, 2.55, 1.34],
      material: materials.redSteel,
      outlineMaterial: materials.outline,
      name: 'a-open-inward-side-door',
      position: [sideX + 0.65, 2.38, -11.55],
      rotation: [0, 0.52, 0],
    }),
  );

  return group;
}

function buildAWarehouse(materials) {
  const group = new THREE.Group();
  group.name = 'a-bombsite-warehouse';
  group.add(buildWarehouseShell(materials));

  group.add(
    floorStencil('A', [-11, 0.44, -6.95], '#e7ece9', 41),
    createShelf(materials, [-14.18, 0.43, -9.18], Math.PI / 2, 5),
    createShelf(materials, [-11.2, 0.43, -11.95], 0, 5),
    createPalletJack(materials, [-9.9, 0.42, -5.1], -0.28),
    createSackPile(materials, [-8.15, 0.43, -7.65], 0.18),
    createCrate(materials, {
      size: [1.5, 1.4, 1.35],
      position: [-12.9, 1.13, -6.45],
      rotationY: 0.08,
      name: 'a-site-peek-crate',
    }),
    createCrate(materials, {
      size: [1.15, 1.05, 1.1],
      position: [-11.8, 0.96, -5.8],
      rotationY: -0.12,
      name: 'a-site-second-crate',
    }),
    createCardboardPile(materials, [-13.42, 0.42, -11.3], 0.08),
    box({
      size: [0.84, 5.05, 0.84],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'a-classic-central-peek-column',
      position: [-10.58, 2.92, -8.25],
    }),
  );

  group.add(
    box({
      size: [3.35, 0.28, 3.05],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'a-warehouse-sheet-metal-loft',
      position: [-8.28, 4.05, -10.55],
    }),
    ladder({
      width: 0.88,
      height: 3.78,
      rungs: 10,
      material: materials.rust,
      name: 'a-loft-vertical-iron-ladder',
      position: [-9.62, 0.45, -9.36],
      rotation: [0, 0, 0],
    }),
    railing({
      length: 3.1,
      material: materials.rust,
      name: 'a-loft-overlook-railing',
      position: [-8.28, 4.2, -8.99],
    }),
    box({
      size: [1.18, 0.95, 0.13],
      material: materials.glass,
      outlineMaterial: materials.outline,
      name: 'a-loft-overlook-window',
      position: [-8.25, 4.55, -12.72],
    }),
  );

  group.add(
    box({
      size: [2.45, 0.18, 0.92],
      material: materials.steel,
      outlineMaterial: materials.outline,
      name: 'a-abandoned-sorting-table',
      position: [-13.42, 1.25, -4.65],
    }),
    createACUnit(materials, [-15.65, 1.1, -5.35], Math.PI / 2),
    createDumpster(materials, [-16.45, 0.42, -11.2], Math.PI / 2),
    wallSign({
      text: 'A-06',
      detail: 'WEST DEPOT',
      position: [-13.22, 3.7, -3.28],
      color: '#e3e5d4',
      seed: 61,
    }),
  );

  for (const x of [-13.25, -9.25]) {
    group.add(
      box({
        size: [2.25, 0.12, 0.26],
        material: materials.emissiveCool,
        name: 'a-cold-emergency-ceiling-light',
        position: [x, 5.28, -9.7],
        outline: false,
      }),
    );
  }
  group.add(
    box({
      size: [0.12, 2.3, 0.05],
      material: materials.emissiveRed,
      name: 'a-rear-door-red-light-leak',
      position: [-8.92, 1.8, -12.74],
      outline: false,
    }),
  );

  return group;
}

function guardhouseWindow(materials, size, position, name) {
  const group = new THREE.Group();
  group.name = name;
  const [width, height] = size;
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(width, height), materials.glass);
  glass.name = `${name}-rain-glass`;
  group.add(glass);
  for (const x of [-width / 2, 0, width / 2]) {
    group.add(
      box({
        size: [0.08, height + 0.12, 0.08],
        material: materials.darkSteel,
        name: `${name}-mullion`,
        position: [x, 0, 0.035],
        outline: false,
      }),
    );
  }
  group.position.set(...position);
  return group;
}

function buildGuardhouseShell(materials) {
  const group = new THREE.Group();
  group.name = 'b-two-storey-sheet-metal-guardhouse';
  const centerX = 11.25;
  const centerZ = -10.15;

  group.add(
    box({
      size: [5.35, 0.2, 5.55],
      material: materials.wetAsphalt,
      outlineMaterial: materials.outline,
      name: 'b-guardhouse-ground-floor',
      position: [centerX, 0.32, centerZ],
    }),
    corrugatedPanel({
      width: 5.35,
      height: 5.25,
      depth: 0.2,
      material: materials.tealSteel,
      ribMaterial: materials.rust,
      outlineMaterial: materials.outline,
      name: 'b-guardhouse-rear-wall',
      position: [centerX, 3.02, -12.93],
    }),
    corrugatedPanel({
      width: 5.55,
      height: 5.25,
      depth: 0.2,
      material: materials.blueSteel,
      ribMaterial: materials.rust,
      outlineMaterial: materials.outline,
      name: 'b-guardhouse-west-wall',
      position: [8.58, 3.02, centerZ],
      rotation: [0, Math.PI / 2, 0],
    }),
    box({
      size: [5.5, 0.24, 5.7],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'b-guardhouse-upper-floor',
      position: [centerX, 2.91, centerZ],
    }),
    box({
      size: [5.6, 0.28, 5.8],
      material: materials.rust,
      outlineMaterial: materials.outline,
      name: 'b-guardhouse-sheet-roof',
      position: [centerX, 5.72, centerZ],
    }),
  );

  for (const x of [8.7, 10.1, 12.62, 13.8]) {
    group.add(
      box({
        size: [0.24, 5.18, 0.25],
        material: materials.rust,
        outlineMaterial: materials.outline,
        name: 'b-front-structural-post',
        position: [x, 3, -7.42],
      }),
    );
  }
  group.add(
    guardhouseWindow(materials, [1.25, 1.2], [9.38, 1.85, -7.27], 'b-ground-floor-window'),
    guardhouseWindow(materials, [1.95, 1.15], [12.72, 4.25, -7.27], 'b-upper-overlook-window'),
    box({
      size: [0.16, 2.35, 1.18],
      material: materials.redSteel,
      outlineMaterial: materials.outline,
      name: 'b-open-front-door',
      position: [11.1, 1.72, -7.05],
      rotation: [0, -0.48, 0],
    }),
  );

  return group;
}

function streetLamp(materials, position) {
  const group = new THREE.Group();
  group.name = 'b-corner-old-street-lamp';
  group.add(
    cylinder({
      radius: 0.13,
      radiusTop: 0.09,
      radiusBottom: 0.17,
      height: 5.6,
      radialSegments: 9,
      material: materials.rust,
      outlineMaterial: materials.outline,
      name: 'old-street-lamp-pole',
      position: [0, 2.8, 0],
    }),
    beamBetween({
      start: [0, 5.25, 0],
      end: [-1.12, 5.25, 0],
      radius: 0.08,
      material: materials.rust,
    }),
    box({
      size: [0.7, 0.38, 0.42],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'street-lamp-housing',
      position: [-1.15, 5.02, 0],
    }),
    box({
      size: [0.48, 0.08, 0.28],
      material: materials.emissiveWarm,
      name: 'street-lamp-warm-lens',
      position: [-1.15, 4.79, 0],
      outline: false,
    }),
  );
  const light = new THREE.PointLight(0xffb65c, 28, 15, 1.65);
  light.name = 'b-warm-rain-halo-light';
  light.position.set(-1.15, 4.78, 0);
  group.add(light);
  group.position.set(...position);
  return group;
}

function buildBBombsite(materials) {
  const group = new THREE.Group();
  group.name = 'b-backstreet-bombsite';
  group.add(
    buildGuardhouseShell(materials),
    floorStencil('B', [9.65, 0.45, -5.35], '#e6ddd0', 53),
    createDeskSet(materials, [10.35, 0.43, -9.72], 0.08),
    createLocker(materials, [12.88, 1.66, -12.42], 0),
    createFireEscape(materials, [14.1, 0.42, -10.15], Math.PI / 2, 5.05),
    streetLamp(materials, [7.35, 0.32, -3.75]),
    createPallet(materials, [8.12, 0.42, -6.45], 0.1),
    createDumpster(materials, [12.75, 0.42, -5.72], -0.12),
    createBicycle(materials, [11.08, 0.42, -4.58], 0.24),
    createCardboardPile(materials, [13.55, 0.42, -8.45], -0.08),
  );

  group.add(
    box({
      size: [3.55, 1.15, 0.58],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'b-to-ct-shortcut-low-wall',
      position: [13.45, 0.99, -3.15],
    }),
    box({
      size: [1.35, 0.12, 1.05],
      material: materials.rust,
      outlineMaterial: materials.outline,
      name: 'b-overturned-iron-table',
      position: [7.4, 0.65, -6.6],
      rotation: [0.26, 0.18, 0.5],
    }),
  );
  for (const offset of [-0.48, 0.48]) {
    group.add(
      box({
        size: [0.55, 0.08, 0.55],
        material: materials.rust,
        name: 'b-overturned-iron-chair',
        position: [6.9 + offset, 0.43, -6.85 + offset * 0.2],
        rotation: [0.48, offset, 0.32],
        outline: false,
      }),
    );
  }

  group.add(
    box({
      size: [1.8, 0.11, 0.22],
      material: materials.emissiveWarm,
      name: 'b-broken-fluorescent-light',
      position: [10.7, 2.55, -10.25],
      rotation: [0, 0, 0.07],
      outline: false,
    }),
    wallSign({
      text: 'B-12',
      detail: 'NIGHT WATCH',
      position: [12.05, 4.15, -7.16],
      color: '#f0c783',
      seed: 87,
    }),
    wallSign({
      text: '03:40',
      detail: 'DUTY ROSTER',
      position: [8.72, 2.05, -10.8],
      rotationY: Math.PI / 2,
      color: '#d8d5c5',
      seed: 37,
    }),
  );

  return group;
}

export function buildBombsites(materials) {
  const group = new THREE.Group();
  group.name = 'a-and-b-defusal-sites';
  group.add(buildAWarehouse(materials), buildBBombsite(materials));
  return group;
}
