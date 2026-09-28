import * as THREE from 'three';
import {
  beamBetween,
  box,
  cylinder,
  ladder,
} from './primitives.js';
import { createSignMaterial } from './materials.js';

const torusCache = new Map();
const sphereGeometry = new THREE.SphereGeometry(0.5, 12, 8);

function torus(majorRadius, tubeRadius, segments = 12) {
  const key = `${majorRadius}:${tubeRadius}:${segments}`;
  if (!torusCache.has(key)) {
    torusCache.set(
      key,
      new THREE.TorusGeometry(majorRadius, tubeRadius, 6, segments),
    );
  }
  return torusCache.get(key);
}

function place(group, name, position, rotationY = 0) {
  group.name = name;
  group.position.set(...position);
  group.rotation.y = rotationY;
  return group;
}

function wheel(materials, position, radius = 0.5, width = 0.3) {
  const group = new THREE.Group();
  const tyre = cylinder({
    radius,
    height: width,
    radialSegments: 14,
    material: materials.rubber,
    outlineMaterial: materials.outline,
    name: 'rubber-wheel',
    rotation: [0, 0, Math.PI / 2],
    outline: false,
  });
  const hub = cylinder({
    radius: radius * 0.42,
    height: width * 1.05,
    radialSegments: 10,
    material: materials.steel,
    name: 'wheel-hub',
    rotation: [0, 0, Math.PI / 2],
    outline: false,
  });
  group.add(tyre, hub);
  group.position.set(...position);
  return group;
}

export function createCrate(
  materials,
  {
    size = [1.25, 1.25, 1.25],
    position = [0, 0, 0],
    rotationY = 0,
    name = 'wooden-freight-crate',
    material = materials.wood,
  } = {},
) {
  const group = box({
    size,
    material,
    outlineMaterial: materials.outline,
    name,
    position,
    rotation: [0, rotationY, 0],
  });
  const [width, height, depth] = size;
  const face = group.children[0];
  const slatDepth = 0.06;

  for (const x of [-width * 0.38, width * 0.38]) {
    face.add(
      box({
        size: [width * 0.08, height * 0.93, slatDepth],
        material: materials.lightWood,
        name: 'crate-vertical-slat',
        position: [x, 0, depth / 2 + slatDepth / 2],
        outline: false,
      }),
    );
  }
  for (const y of [-height * 0.38, height * 0.38]) {
    face.add(
      box({
        size: [width * 0.94, height * 0.08, slatDepth],
        material: materials.lightWood,
        name: 'crate-horizontal-slat',
        position: [0, y, depth / 2 + slatDepth / 2],
        outline: false,
      }),
    );
  }
  return group;
}

export function createCardboardPile(materials, position, rotationY = 0) {
  const group = new THREE.Group();
  const boxes = [
    { size: [1.1, 0.8, 0.9], position: [0, 0.4, 0] },
    { size: [0.8, 0.65, 0.75], position: [0.15, 1.13, -0.04], rotation: 0.13 },
    { size: [0.64, 0.5, 0.58], position: [-0.13, 1.7, 0.08], rotation: -0.09 },
  ];
  for (const item of boxes) {
    group.add(
      box({
        size: item.size,
        material: materials.cardboard,
        outlineMaterial: materials.outline,
        name: 'rain-softened-cardboard-box',
        position: item.position,
        rotation: [0, item.rotation ?? 0, 0],
      }),
    );
  }
  return place(group, 'discarded-cardboard-pile', position, rotationY);
}

export function createPallet(materials, position = [0, 0, 0], rotationY = 0) {
  const group = new THREE.Group();
  const width = 1.55;
  const depth = 1.15;
  for (let index = 0; index < 6; index += 1) {
    const x = -width / 2 + 0.14 + index * ((width - 0.28) / 5);
    group.add(
      box({
        size: [0.18, 0.1, depth],
        material: materials.lightWood,
        name: 'pallet-top-slat',
        position: [x, 0.22, 0],
        outline: false,
      }),
    );
  }
  for (const x of [-0.58, 0, 0.58]) {
    group.add(
      box({
        size: [0.2, 0.18, 1.02],
        material: materials.wood,
        name: 'pallet-runner',
        position: [x, 0.09, 0],
        outline: false,
      }),
    );
  }
  return place(group, 'wooden-cargo-pallet', position, rotationY);
}

export function createBarrel(
  materials,
  position,
  colorMaterial = materials.blueSteel,
  rotation = [0, 0, 0],
) {
  const group = new THREE.Group();
  group.add(
    cylinder({
      radius: 0.43,
      radiusTop: 0.4,
      radiusBottom: 0.4,
      height: 1.16,
      radialSegments: 14,
      material: colorMaterial,
      outlineMaterial: materials.outline,
      name: 'industrial-oil-barrel',
      position: [0, 0.58, 0],
    }),
  );
  for (const y of [0.12, 0.4, 0.76, 1.04]) {
    const ring = new THREE.Mesh(torus(0.405, 0.025, 18), materials.rust);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    group.add(ring);
  }
  group.position.set(...position);
  group.rotation.set(...rotation);
  return group;
}

export function createContainer(
  materials,
  {
    position = [0, 0, 0],
    rotationY = 0,
    material = materials.blueSteel,
    code = 'FRT 06',
    name = 'shipping-container',
  } = {},
) {
  const group = new THREE.Group();
  group.add(
    box({
      size: [5.7, 2.55, 2.55],
      material,
      outlineMaterial: materials.outline,
      name: `${name}-shell`,
      position: [0, 1.28, 0],
    }),
  );

  for (let index = -8; index <= 8; index += 1) {
    const x = index * 0.31;
    group.add(
      box({
        size: [0.045, 2.28, 0.06],
        material: materials.rust,
        name: 'container-side-rib-front',
        position: [x, 1.28, 1.307],
        outline: false,
        castShadow: false,
      }),
      box({
        size: [0.045, 2.28, 0.06],
        material: materials.rust,
        name: 'container-side-rib-back',
        position: [x, 1.28, -1.307],
        outline: false,
        castShadow: false,
      }),
    );
  }

  for (const z of [-0.63, 0, 0.63]) {
    group.add(
      beamBetween({
        start: [-2.87, 0.16, z],
        end: [-2.87, 2.38, z],
        radius: 0.035,
        material: materials.darkSteel,
        castShadow: false,
      }),
    );
  }

  const signMaterial = createSignMaterial({
    text: code,
    detail: 'CARGO / 64',
    color: '#d7d8c8',
    background: 'rgba(19, 31, 35, .2)',
    border: 'rgba(215, 216, 200, .45)',
    seed: code.length * 19,
  });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 0.8), signMaterial);
  sign.position.set(0.6, 1.35, 1.343);
  group.add(sign);

  return place(group, name, position, rotationY);
}

export function createTruck(
  materials,
  {
    position = [0, 0, 0],
    rotationY = 0,
    police = false,
    name = police ? 'ct-police-van' : 'derelict-cargo-truck',
  } = {},
) {
  const group = new THREE.Group();
  const bodyMaterial = police ? materials.blueSteel : materials.tealSteel;
  group.add(
    box({
      size: [2.25, 0.28, 5.8],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: `${name}-chassis`,
      position: [0, 0.72, 0],
    }),
    box({
      size: [2.15, 2.05, police ? 3.65 : 2.25],
      material: bodyMaterial,
      outlineMaterial: materials.outline,
      name: `${name}-cab`,
      position: [0, 1.65, police ? 0.35 : 1.63],
    }),
  );

  if (!police) {
    group.add(
      box({
        size: [2.28, 2.35, 3.6],
        material: materials.concreteLight,
        outlineMaterial: materials.outline,
        name: 'freight-truck-box',
        position: [0, 1.9, -1.18],
      }),
    );
  } else {
    group.add(
      box({
        size: [2.2, 0.18, 2.8],
        material: materials.paint,
        name: 'police-van-side-stripe',
        position: [0, 1.6, 0.35],
        outline: false,
      }),
      box({
        size: [0.35, 0.18, 0.55],
        material: materials.emissiveRed,
        name: 'red-police-beacon',
        position: [-0.48, 2.82, 0],
        outline: false,
      }),
      box({
        size: [0.35, 0.18, 0.55],
        material: materials.emissiveBlue,
        name: 'blue-police-beacon',
        position: [0.48, 2.82, 0],
        outline: false,
      }),
    );
  }

  const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 0.82), materials.glass);
  windshield.position.set(0, 2.08, police ? 2.19 : 2.78);
  windshield.rotation.x = -0.08;
  group.add(windshield);

  for (const x of [-1.08, 1.08]) {
    for (const z of [-1.65, 1.72]) {
      group.add(wheel(materials, [x, 0.62, z], 0.47, 0.3));
    }
  }

  group.add(
    box({
      size: [2.36, 0.24, 0.28],
      material: materials.rust,
      name: `${name}-front-bumper`,
      position: [0, 0.74, police ? 2.25 : 2.83],
      outline: false,
    }),
  );

  return place(group, name, position, rotationY);
}

export function createBarricade(materials, position, rotationY = 0, police = false) {
  const group = new THREE.Group();
  const barMaterial = police ? materials.blueSteel : materials.yellowSteel;
  group.add(
    box({
      size: [3.15, 0.42, 0.16],
      material: barMaterial,
      outlineMaterial: materials.outline,
      name: 'barricade-main-bar',
      position: [0, 1.05, 0],
    }),
    box({
      size: [2.65, 0.11, 0.18],
      material: materials.paint,
      name: 'barricade-reflective-stripe',
      position: [0, 1.05, 0.11],
      outline: false,
    }),
  );
  for (const x of [-1.2, 1.2]) {
    group.add(
      beamBetween({
        start: [x - 0.35, 0.05, -0.42],
        end: [x + 0.15, 1.05, 0],
        radius: 0.08,
        material: materials.darkSteel,
      }),
      beamBetween({
        start: [x + 0.35, 0.05, 0.42],
        end: [x - 0.15, 1.05, 0],
        radius: 0.08,
        material: materials.darkSteel,
      }),
    );
  }
  return place(group, police ? 'police-barricade' : 'plastic-road-barricade', position, rotationY);
}

export function createConcreteBarrier(materials, position, rotationY = 0) {
  const group = new THREE.Group();
  group.add(
    box({
      size: [2.65, 0.34, 0.9],
      material: materials.concreteDark,
      outlineMaterial: materials.outline,
      name: 'jersey-barrier-foot',
      position: [0, 0.17, 0],
    }),
    box({
      size: [2.45, 0.82, 0.5],
      material: materials.concrete,
      outlineMaterial: materials.outline,
      name: 'jersey-barrier-body',
      position: [0, 0.69, 0],
    }),
  );
  return place(group, 'concrete-jersey-barrier', position, rotationY);
}

export function createDumpster(materials, position, rotationY = 0) {
  const group = new THREE.Group();
  group.add(
    box({
      size: [1.85, 1.35, 1.2],
      material: materials.tealSteel,
      outlineMaterial: materials.outline,
      name: 'industrial-dumpster-body',
      position: [0, 0.73, 0],
    }),
    box({
      size: [1.92, 0.12, 1.28],
      material: materials.rust,
      outlineMaterial: materials.outline,
      name: 'industrial-dumpster-lid',
      position: [0, 1.46, -0.08],
      rotation: [-0.12, 0, 0],
    }),
  );
  for (const x of [-0.7, 0, 0.7]) {
    group.add(
      box({
        size: [0.08, 1.08, 0.06],
        material: materials.rust,
        name: 'dumpster-rib',
        position: [x, 0.76, 0.63],
        outline: false,
      }),
    );
  }
  return place(group, 'lidded-industrial-dumpster', position, rotationY);
}

export function createTire(materials, position, rotation = [Math.PI / 2, 0, 0]) {
  const mesh = new THREE.Mesh(torus(0.48, 0.14, 18), materials.rubber);
  mesh.name = 'discarded-rubber-tyre';
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  return mesh;
}

export function createUtilityPole(materials, position, height = 7.2) {
  const group = new THREE.Group();
  group.add(
    cylinder({
      radius: 0.17,
      radiusTop: 0.12,
      radiusBottom: 0.2,
      height,
      radialSegments: 8,
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'weathered-utility-pole',
      position: [0, height / 2, 0],
    }),
    box({
      size: [2.2, 0.18, 0.18],
      material: materials.wood,
      name: 'utility-cross-arm',
      position: [0, height - 0.55, 0],
      outline: false,
    }),
  );
  for (const x of [-0.82, 0, 0.82]) {
    group.add(
      cylinder({
        radius: 0.075,
        height: 0.24,
        radialSegments: 8,
        material: materials.glass,
        name: 'glass-insulator',
        position: [x, height - 0.36, 0],
        outline: false,
      }),
    );
  }
  return place(group, 'old-overhead-utility-pole', position);
}

export function createShelf(materials, position, rotationY = 0, levels = 5) {
  const group = new THREE.Group();
  const width = 3.4;
  const height = 4.4;
  const depth = 1.25;
  for (const x of [-width / 2, width / 2]) {
    for (const z of [-depth / 2, depth / 2]) {
      group.add(
        box({
          size: [0.11, height, 0.11],
          material: materials.rust,
          name: 'warehouse-shelf-post',
          position: [x, height / 2, z],
          outline: false,
        }),
      );
    }
  }
  for (let level = 0; level < levels; level += 1) {
    const y = 0.18 + (height - 0.3) * (level / (levels - 1));
    group.add(
      box({
        size: [width + 0.18, 0.12, depth + 0.15],
        material: materials.darkSteel,
        outlineMaterial: materials.outline,
        name: `warehouse-shelf-level-${level + 1}`,
        position: [0, y, 0],
        outline: level === 0 || level === levels - 1,
      }),
    );
  }
  return place(group, 'five-level-heavy-shelf', position, rotationY);
}

export function createPalletJack(materials, position, rotationY = 0) {
  const group = new THREE.Group();
  for (const x of [-0.34, 0.34]) {
    group.add(
      box({
        size: [0.16, 0.12, 1.85],
        material: materials.yellowSteel,
        name: 'pallet-jack-fork',
        position: [x, 0.15, 0.55],
        outline: false,
      }),
    );
  }
  group.add(
    beamBetween({
      start: [0, 0.22, -0.34],
      end: [0, 1.55, -0.92],
      radius: 0.07,
      material: materials.darkSteel,
    }),
    beamBetween({
      start: [-0.32, 1.57, -0.92],
      end: [0.32, 1.57, -0.92],
      radius: 0.07,
      material: materials.darkSteel,
    }),
  );
  return place(group, 'manual-pallet-jack', position, rotationY);
}

export function createSackPile(materials, position, rotationY = 0) {
  const group = new THREE.Group();
  const placements = [
    [-0.55, 0.25, 0, 0],
    [0, 0.24, 0.08, 0.12],
    [0.55, 0.25, -0.04, -0.08],
    [-0.28, 0.62, 0.02, -0.1],
    [0.32, 0.62, 0, 0.12],
  ];
  for (const [x, y, z, angle] of placements) {
    const sack = new THREE.Mesh(sphereGeometry, materials.cardboard);
    sack.name = 'rain-soaked-cargo-sack';
    sack.scale.set(0.64, 0.33, 0.9);
    sack.position.set(x, y, z);
    sack.rotation.y = angle;
    sack.castShadow = true;
    group.add(sack);
  }
  return place(group, 'stacked-cargo-sacks', position, rotationY);
}

export function createDeskSet(materials, position, rotationY = 0) {
  const group = new THREE.Group();
  group.add(
    box({
      size: [1.8, 0.13, 0.85],
      material: materials.wood,
      outlineMaterial: materials.outline,
      name: 'guard-desk-top',
      position: [0, 1.02, 0],
    }),
  );
  for (const x of [-0.75, 0.75]) {
    for (const z of [-0.33, 0.33]) {
      group.add(
        box({
          size: [0.09, 1, 0.09],
          material: materials.darkSteel,
          name: 'desk-leg',
          position: [x, 0.5, z],
          outline: false,
        }),
      );
    }
  }
  group.add(
    box({
      size: [0.62, 0.12, 0.58],
      material: materials.rubber,
      outlineMaterial: materials.outline,
      name: 'overturned-office-chair-seat',
      position: [0.45, 0.48, 1.05],
      rotation: [0.28, 0.12, 0.42],
    }),
    box({
      size: [0.62, 0.72, 0.12],
      material: materials.rubber,
      outlineMaterial: materials.outline,
      name: 'overturned-office-chair-back',
      position: [0.63, 0.83, 1.16],
      rotation: [0.25, 0.08, 0.42],
    }),
  );
  return place(group, 'abandoned-office-desk-set', position, rotationY);
}

export function createLocker(materials, position, rotationY = 0) {
  const group = box({
    size: [1.25, 2.45, 0.72],
    material: materials.steel,
    outlineMaterial: materials.outline,
    name: 'steel-guard-locker',
    position,
    rotation: [0, rotationY, 0],
  });
  const front = group.children[0];
  for (const x of [-0.28, 0.28]) {
    for (const y of [0.5, 0.68, 0.86]) {
      front.add(
        box({
          size: [0.27, 0.035, 0.035],
          material: materials.blackPaint,
          name: 'locker-vent',
          position: [x, y, 0.38],
          outline: false,
          castShadow: false,
        }),
      );
    }
  }
  return group;
}

export function createACUnit(materials, position, rotationY = 0) {
  const group = box({
    size: [1.35, 1.05, 0.55],
    material: materials.concreteLight,
    outlineMaterial: materials.outline,
    name: 'warehouse-air-conditioner',
    position,
    rotation: [0, rotationY, 0],
  });
  const fan = new THREE.Mesh(torus(0.32, 0.045, 16), materials.darkSteel);
  fan.position.z = 0.3;
  group.children[0].add(fan);
  return group;
}

export function createBicycle(materials, position, rotationY = 0) {
  const group = new THREE.Group();
  for (const z of [-0.72, 0.72]) {
    const wheelMesh = new THREE.Mesh(torus(0.46, 0.035, 20), materials.rubber);
    wheelMesh.position.set(0, 0.48, z);
    wheelMesh.rotation.y = Math.PI / 2;
    group.add(wheelMesh);
  }
  group.add(
    beamBetween({ start: [0, 0.5, -0.68], end: [0, 1.05, 0], radius: 0.035, material: materials.rust }),
    beamBetween({ start: [0, 1.05, 0], end: [0, 0.5, 0.7], radius: 0.035, material: materials.rust }),
    beamBetween({ start: [0, 0.5, -0.68], end: [0, 0.5, 0.7], radius: 0.035, material: materials.rust }),
    beamBetween({ start: [0, 0.5, 0.7], end: [0, 1.28, 0.62], radius: 0.035, material: materials.rust }),
    beamBetween({ start: [0, 1.25, 0.48], end: [0, 1.25, 0.85], radius: 0.03, material: materials.darkSteel }),
  );
  return place(group, 'discarded-bicycle', position, rotationY);
}

export function createFireEscape(materials, position, rotationY = 0, height = 5.1) {
  const group = new THREE.Group();
  group.add(
    box({
      size: [2.7, 0.18, 1.2],
      material: materials.darkSteel,
      outlineMaterial: materials.outline,
      name: 'fire-escape-balcony',
      position: [0, height, 0],
    }),
    ladder({
      width: 0.9,
      height,
      rungs: 12,
      material: materials.rust,
      name: 'fire-escape-ladder',
      position: [-0.72, 0.08, 0.55],
    }),
  );
  return place(group, 'external-fire-escape', position, rotationY);
}
