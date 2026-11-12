import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { createArchitecture, markShadows } from "./buildings.js";
import { createRibbonGeometry, nearestCurveU } from "./geometry.js";
import { addStation, buildTrack, createTrackCurve } from "./railway.js";
import { createTrain } from "./train.js";
import {
  createBallastTexture,
  createCobbleTexture,
  createContactShadowTexture,
  createGlowTexture,
  createGrassTexture,
  createPlaqueTexture,
  createWoodTexture,
  seededRandom,
} from "./textures.js";

const GROUND_Y = 0.005;

function curveFromPairs(points, closed = false, tension = 0.3) {
  return new THREE.CatmullRomCurve3(
    points.map(([x, z]) => new THREE.Vector3(x, 0, z)),
    closed,
    "catmullrom",
    tension,
  );
}

function createBoard(root, renderer) {
  const board = new THREE.Group();
  board.name = "display base";

  const woodMap = createWoodTexture();
  woodMap.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const wood = new THREE.MeshStandardMaterial({
    map: woodMap,
    color: "#c69b76",
    roughness: 0.72,
    metalness: 0,
  });
  const rimWood = new THREE.MeshStandardMaterial({
    color: "#4c2e20",
    roughness: 0.64,
  });
  const inlay = new THREE.MeshStandardMaterial({
    color: "#b58a4b",
    roughness: 0.34,
    metalness: 0.68,
  });

  const body = new THREE.Mesh(
    new RoundedBoxGeometry(25.2, 1.18, 19.2, 4, 0.11),
    wood,
  );
  body.name = "wooden board";
  body.position.y = -0.7;
  board.add(body);

  const rim = new THREE.Mesh(
    new RoundedBoxGeometry(25.3, 0.18, 19.3, 3, 0.055),
    rimWood,
  );
  rim.name = "board rim";
  rim.position.y = -0.14;
  board.add(rim);

  const grassMap = createGrassTexture();
  grassMap.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const grass = new THREE.MeshStandardMaterial({
    map: grassMap,
    color: "#c1c3a1",
    roughness: 1,
  });
  const terrain = new THREE.Mesh(
    new RoundedBoxGeometry(24.02, 0.2, 18.02, 3, 0.045),
    grass,
  );
  terrain.name = "grass terrain";
  terrain.position.y = -0.095;
  terrain.receiveShadow = true;
  board.add(terrain);

  for (const z of [-9.02, 9.02]) {
    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(23.78, 0.018, 0.035),
      inlay,
    );
    strip.position.set(0, 0.043, z);
    board.add(strip);
  }
  for (const x of [-12.02, 12.02]) {
    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(0.035, 0.018, 17.78),
      inlay,
    );
    strip.position.set(x, 0.043, 0);
    board.add(strip);
  }

  for (const side of [-1, 1]) {
    const band = new THREE.Mesh(
      new THREE.BoxGeometry(25.08, 0.045, 0.05),
      rimWood,
    );
    band.position.set(0, -0.37, side * 9.585);
    board.add(band);
  }

  const plaqueMap = createPlaqueTexture();
  plaqueMap.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const plaqueBack = new THREE.Mesh(
    new RoundedBoxGeometry(5.68, 1.19, 0.07, 2, 0.035),
    rimWood,
  );
  plaqueBack.position.set(0, -0.6, 9.585);
  board.add(plaqueBack);
  const plaque = new THREE.Mesh(
    new THREE.PlaneGeometry(5.38, 1.01),
    new THREE.MeshStandardMaterial({
      map: plaqueMap,
      roughness: 0.48,
      metalness: 0.16,
    }),
  );
  plaque.position.set(0, -0.6, 9.626);
  board.add(plaque);

  const contactShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 23),
    new THREE.MeshBasicMaterial({
      map: createContactShadowTexture(),
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = -1.302;
  contactShadow.renderOrder = -2;
  board.add(contactShadow);

  markShadows(body, true, true);
  rim.receiveShadow = true;
  root.add(board);
  return board;
}

function createPondGeometry(radiusX, radiusZ, seed) {
  const random = seededRandom(seed);
  const points = [];
  const segments = 48;
  for (let index = 0; index < segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    const wobble =
      1 +
      Math.sin(angle * 3 + 0.8) * 0.055 +
      Math.sin(angle * 7 - 1.2) * 0.025 +
      (random() - 0.5) * 0.025;
    points.push([
      Math.cos(angle) * radiusX * wobble,
      Math.sin(angle) * radiusZ * wobble,
    ]);
  }
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let index = 1; index < points.length; index += 1) {
    shape.lineTo(points[index][0], points[index][1]);
  }
  shape.closePath();
  const geometry = new THREE.ShapeGeometry(shape, 1);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function createRiver(root, textures, renderer) {
  const curve = curveFromPairs(
    [
      [-12.32, -4.48],
      [-11.82, -3.88],
      [-10.42, -3.35],
      [-9.2, -3.1],
      [-7.8, -2.7],
      [-6.4, -2.25],
      [-5.1, -2.35],
      [-4.1, -2.9],
      [-3.7, -3.6],
    ],
    false,
    0.36,
  );

  const soilMap = textures.grass.clone();
  soilMap.needsUpdate = true;
  soilMap.repeat.set(3, 3);
  const bankMaterial = new THREE.MeshStandardMaterial({
    map: soilMap,
    color: "#716950",
    roughness: 1,
    side: THREE.DoubleSide,
  });
  const bedMaterial = new THREE.MeshStandardMaterial({
    color: "#4e4c3a",
    roughness: 0.96,
    side: THREE.DoubleSide,
  });
  const waterMaterial = new THREE.MeshPhysicalMaterial({
    color: "#4c7775",
    emissive: new THREE.Color("#142b32"),
    emissiveIntensity: 0.22,
    roughness: 0.17,
    metalness: 0.02,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
    transparent: true,
    opacity: 0.91,
    side: THREE.DoubleSide,
  });

  const bank = new THREE.Mesh(
    createRibbonGeometry(curve, 2.65, 300, {
      yOffset: 0.011,
      closed: false,
      uvRepeat: 8,
    }),
    bankMaterial,
  );
  bank.receiveShadow = true;
  root.add(bank);

  const bed = new THREE.Mesh(
    createRibbonGeometry(curve, 1.42, 300, {
      yOffset: 0.026,
      closed: false,
      uvRepeat: 10,
    }),
    bedMaterial,
  );
  bed.receiveShadow = true;
  root.add(bed);

  const water = new THREE.Mesh(
    createRibbonGeometry(curve, 1.18, 300, {
      yOffset: 0.044,
      closed: false,
      uvRepeat: 12,
    }),
    waterMaterial,
  );
  water.receiveShadow = true;
  root.add(water);

  const pondCenter = new THREE.Vector3(-4.08, 0, -3.55);
  const pondBank = new THREE.Mesh(
    createPondGeometry(1.83, 1.26, 312),
    bankMaterial,
  );
  pondBank.position.set(pondCenter.x, 0.009, pondCenter.z);
  pondBank.receiveShadow = true;
  root.add(pondBank);
  const pondBed = new THREE.Mesh(
    createPondGeometry(1.55, 1.03, 411),
    bedMaterial,
  );
  pondBed.position.set(pondCenter.x, 0.024, pondCenter.z);
  pondBed.receiveShadow = true;
  root.add(pondBed);
  const pond = new THREE.Mesh(
    createPondGeometry(1.44, 0.9, 522),
    waterMaterial,
  );
  pond.position.set(pondCenter.x, 0.042, pondCenter.z);
  pond.receiveShadow = true;
  root.add(pond);

  const rippleMaterial = new THREE.LineBasicMaterial({
    color: "#bfddd1",
    transparent: true,
    opacity: 0.27,
    depthWrite: false,
  });
  const ripples = [];
  for (let index = 0; index < 5; index += 1) {
    const start = 0.36 + index * 0.075;
    const points = [];
    for (let sample = 0; sample <= 16; sample += 1) {
      const u = start + (sample / 16) * 0.13;
      const point = curve.getPointAt(Math.min(0.995, u));
      const tangent = curve.getTangentAt(Math.min(0.995, u));
      const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const offset = (index % 2 === 0 ? -1 : 1) * (0.12 + index * 0.025);
      points.push(
        new THREE.Vector3(
          point.x + side.x * offset,
          0.049,
          point.z + side.z * offset,
        ),
      );
    }
    const rippleCurve = new THREE.CatmullRomCurve3(points, false);
    const ripple = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        rippleCurve.getPoints(28),
      ),
      rippleMaterial,
    );
    ripples.push(ripple);
    root.add(ripple);
  }

  const rockGeometry = new THREE.IcosahedronGeometry(0.16, 1);
  const rockMaterials = [
    new THREE.MeshStandardMaterial({ color: "#8b8878", roughness: 0.98 }),
    new THREE.MeshStandardMaterial({ color: "#6e7566", roughness: 0.98 }),
    new THREE.MeshStandardMaterial({ color: "#a19b89", roughness: 0.98 }),
  ];
  const random = seededRandom(72);
  for (let index = 0; index < 34; index += 1) {
    const u = 0.1 + random() * 0.9;
    const point = curve.getPointAt(u);
    const tangent = curve.getTangentAt(u);
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const sign = index % 2 === 0 ? -1 : 1;
    const offset = sign * (0.61 + random() * 0.13);
    const rock = new THREE.Mesh(
      rockGeometry,
      rockMaterials[index % rockMaterials.length],
    );
    rock.scale.set(
      0.6 + random() * 1.1,
      0.35 + random() * 0.55,
      0.55 + random() * 0.95,
    );
    rock.position.set(
      point.x + side.x * offset,
      0.055 + random() * 0.025,
      point.z + side.z * offset,
    );
    rock.rotation.set(random() * 2, random() * 2, random() * 2);
    rock.castShadow = true;
    rock.receiveShadow = true;
    root.add(rock);
  }

  for (let index = 0; index < 26; index += 1) {
    const angle = (index / 26) * Math.PI * 2 + seededRandom(index + 90)() * 0.1;
    const radius = 1.66 + seededRandom(index + 45)() * 0.12;
    const rock = new THREE.Mesh(
      rockGeometry,
      rockMaterials[index % rockMaterials.length],
    );
    rock.scale.set(0.72, 0.42 + (index % 3) * 0.08, 0.58);
    rock.position.set(
      pondCenter.x + Math.cos(angle) * radius,
      0.06,
      pondCenter.z + Math.sin(angle) * radius * 0.7,
    );
    rock.rotation.y = angle * 1.7;
    rock.castShadow = true;
    rock.receiveShadow = true;
    root.add(rock);
  }

  const reedMaterial = new THREE.MeshStandardMaterial({
    color: "#7b8051",
    roughness: 0.96,
  });
  for (let index = 0; index < 18; index += 1) {
    const u = 0.62 + seededRandom(index + 31)() * 0.32;
    const point = curve.getPointAt(Math.min(0.99, u));
    const tangent = curve.getTangentAt(Math.min(0.99, u));
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const offset = (index % 2 === 0 ? -1 : 1) * (0.63 + seededRandom(index + 2)() * 0.12);
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.012, 0.28 + (index % 4) * 0.035, 5),
      reedMaterial,
    );
    stem.position.set(
      point.x + side.x * offset,
      0.18,
      point.z + side.z * offset,
    );
    stem.rotation.z = (seededRandom(index + 18)() - 0.5) * 0.16;
    stem.castShadow = true;
    root.add(stem);
  }

  const bridgePoint = curve.getPointAt(
    nearestCurveU(curve, new THREE.Vector3(-5.68, 0, -2.4)),
  );
  return {
    curve,
    waterMaterial,
    ripples,
    bridgePoint,
    pondCenter,
    update(elapsed) {
      rippleMaterial.opacity = 0.22 + Math.sin(elapsed * 0.9) * 0.055;
      for (let index = 0; index < ripples.length; index += 1) {
        ripples[index].position.y = Math.sin(elapsed * 0.75 + index) * 0.0015;
      }
    },
  };
}

function createRoadNetwork(root, textures) {
  const cobbleMap = createCobbleTexture();
  const roadMaterial = new THREE.MeshStandardMaterial({
    map: cobbleMap,
    color: "#c7b493",
    roughness: 0.96,
  });
  const shoulderMaterial = new THREE.MeshStandardMaterial({
    color: "#695f4d",
    roughness: 1,
    side: THREE.DoubleSide,
  });
  const paths = [];
  let level = 0;

  function addRoad(points, width, material = roadMaterial, height = null) {
    const curve = curveFromPairs(points, false, 0.28);
    const y = height ?? 0.013 + level * 0.0009;
    level += 1;
    const length = curve.getLength();
    if (material === roadMaterial) {
      const shoulder = new THREE.Mesh(
        createRibbonGeometry(curve, width + 0.14, Math.max(36, Math.ceil(length * 12)), {
          yOffset: y - 0.004,
          closed: false,
          uvRepeat: Math.max(2, length * 0.8),
        }),
        shoulderMaterial,
      );
      shoulder.receiveShadow = true;
      root.add(shoulder);
    }
    const road = new THREE.Mesh(
      createRibbonGeometry(curve, width, Math.max(36, Math.ceil(length * 12)), {
        yOffset: y,
        closed: false,
        uvRepeat: Math.max(2, length * 0.8),
      }),
      material,
    );
    road.receiveShadow = true;
    root.add(road);
    paths.push({ curve, width, material });
    return curve;
  }

  addRoad(
    [
      [4.95, -3.82],
      [5.72, -3.28],
      [6.02, -2.55],
      [5.87, -1.55],
      [5.08, -0.48],
      [4.18, 0.62],
      [3.08, 1.55],
      [1.72, 2.16],
    ],
    0.82,
  );
  addRoad(
    [
      [1.72, 2.16],
      [0.18, 1.8],
      [-1.45, 1.15],
      [-3.22, 0.9],
      [-4.9, 1.08],
      [-5.95, 1.2],
    ],
    0.64,
  );
  addRoad(
    [
      [1.72, 2.16],
      [2.28, 3.03],
      [3.15, 3.34],
      [1.9, 4.02],
      [-0.18, 4.78],
      [-2.8, 5.1],
      [-4.9, 4.82],
      [-6.3, 4.0],
    ],
    0.58,
  );
  addRoad(
    [
      [1.72, 2.16],
      [2.28, 1.05],
      [2.5, -0.1],
      [2.65, -1.38],
      [2.5, -2.55],
      [2.45, -3.08],
      [1.25, -3.2],
      [0.15, -3.26],
      [-1.85, -3.5],
    ],
    0.58,
  );
  addRoad(
    [
      [4.18, 0.62],
      [4.05, 1.55],
      [4.16, 2.55],
      [4.35, 3.28],
    ],
    0.36,
  );
  addRoad(
    [
      [3.13, 3.35],
      [3.55, 3.82],
      [4.12, 4.15],
    ],
    0.32,
    roadMaterial,
    0.018,
  );
  addRoad(
    [
      [-5.95, 1.2],
      [-5.82, 0.25],
      [-5.74, -0.95],
    ],
    0.34,
    roadMaterial,
    0.018,
  );

  const plazaUnderlay = new THREE.Mesh(
    new THREE.CircleGeometry(1, 64),
    shoulderMaterial,
  );
  plazaUnderlay.rotation.x = -Math.PI / 2;
  plazaUnderlay.scale.set(1.62, 1.04, 1);
  plazaUnderlay.position.set(5.45, 0.017, -1.98);
  root.add(plazaUnderlay);
  const forecourt = new THREE.Mesh(
    new THREE.CircleGeometry(1, 64),
    roadMaterial,
  );
  forecourt.rotation.x = -Math.PI / 2;
  forecourt.scale.set(1.53, 0.94, 1);
  forecourt.position.set(5.45, 0.023, -1.98);
  forecourt.receiveShadow = true;
  root.add(forecourt);

  const squareUnderlay = new THREE.Mesh(
    new THREE.CircleGeometry(1, 64),
    shoulderMaterial,
  );
  squareUnderlay.rotation.x = -Math.PI / 2;
  squareUnderlay.scale.set(1.02, 0.78, 1);
  squareUnderlay.position.set(-0.28, 0.02, 2.62);
  root.add(squareUnderlay);
  const square = new THREE.Mesh(
    new THREE.CircleGeometry(1, 64),
    roadMaterial,
  );
  square.rotation.x = -Math.PI / 2;
  square.scale.set(0.94, 0.7, 1);
  square.position.set(-0.28, 0.025, 2.62);
  square.receiveShadow = true;
  root.add(square);

  return {
    paths,
    roadMaterial,
    addRoad,
  };
}

function createFootbridge(root, river, roadMaterial) {
  const center = river.bridgePoint;
  const group = new THREE.Group();
  group.position.set(center.x, 0, center.z);

  const stone = new THREE.MeshStandardMaterial({
    color: "#928878",
    roughness: 0.96,
  });
  const wood = new THREE.MeshStandardMaterial({
    color: "#634733",
    roughness: 0.9,
  });
  const darkWood = new THREE.MeshStandardMaterial({
    color: "#3f2d23",
    roughness: 0.92,
  });

  for (const side of [-1, 1]) {
    const abutment = new THREE.Mesh(
      new RoundedBoxGeometry(0.92, 0.2, 0.36, 2, 0.025),
      stone,
    );
    abutment.position.set(0, 0.07, side * 0.82);
    group.add(abutment);
  }

  const deck = new THREE.Mesh(
    new RoundedBoxGeometry(0.82, 0.11, 2.25, 2, 0.035),
    wood,
  );
  deck.position.y = 0.16;
  group.add(deck);
  for (let slat = 0; slat < 10; slat += 1) {
    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(0.77, 0.025, 0.17),
      slat % 2 === 0 ? wood : darkWood,
    );
    plank.position.set(0, 0.225, -0.98 + slat * 0.217);
    group.add(plank);
  }
  for (const side of [-1, 1]) {
    for (const z of [-0.92, -0.46, 0, 0.46, 0.92]) {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.055, 0.48, 0.055),
        darkWood,
      );
      post.position.set(side * 0.36, 0.47, z);
      group.add(post);
    }
    const handrail = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.055, 2.02),
      wood,
    );
    handrail.position.set(side * 0.36, 0.7, 0);
    group.add(handrail);
  }

  markShadows(group);
  root.add(group);

  const north = [
    [-5.95, 1.2],
    [-5.82, 0.25],
    [-5.74, -0.95],
  ];
  const south = [
    [center.x, center.z - 0.54],
    [center.x - 0.08, center.z - 1.32],
    [center.x - 0.2, center.z - 2.12],
    [-5.82, -4.15],
  ];
  const pathMaterial = roadMaterial.clone();
  pathMaterial.color.set("#8b7d60");
  const pathHeight = 0.016;
  for (const points of [north, south]) {
    const curve = curveFromPairs(points, false, 0.25);
    const path = new THREE.Mesh(
      createRibbonGeometry(curve, 0.31, 54, {
        yOffset: pathHeight,
        closed: false,
        uvRepeat: 4,
      }),
      pathMaterial,
    );
    path.receiveShadow = true;
    root.add(path);
  }
}

function createHouseBlock(root, architecture) {
  const buildings = [];

  function place(object, x, z, rotation = 0) {
    object.position.set(x, GROUND_Y, z);
    object.rotation.y = rotation;
    root.add(object);
    buildings.push(object);
    return object;
  }

  place(
    architecture.createHouse({
      width: 2.55,
      depth: 1.7,
      wallHeight: 1.92,
      roofHeight: 0.78,
      storeys: 2,
      wallMaterial: architecture.creamMaterial,
      timber: true,
      shopfront: true,
      awningMaterial: architecture.awningWineMaterial,
      roofMaterial: architecture.terracottaMaterial,
      dormer: true,
    }),
    -0.4,
    0.5,
    0.03,
  );

  place(
    architecture.createHouse({
      width: 2.2,
      depth: 1.5,
      wallHeight: 1.66,
      roofHeight: 0.64,
      storeys: 2,
      wallMaterial: architecture.sageMaterial,
      roofMaterial: architecture.mossRoofMaterial,
      timber: false,
      shopfront: true,
      awningMaterial: architecture.awningGreenMaterial,
    }),
    5.5,
    1.6,
    -0.08,
  );

  place(
    architecture.createHouse({
      width: 2.1,
      depth: 1.55,
      wallHeight: 1.62,
      roofHeight: 0.66,
      storeys: 2,
      wallMaterial: architecture.blueMaterial,
      roofMaterial: architecture.terracottaMaterial,
      flowerBoxes: true,
      dormer: true,
    }),
    3.75,
    -4.15,
    -0.06,
  );

  place(
    architecture.createHouse({
      width: 2.15,
      depth: 1.5,
      wallHeight: 1.54,
      roofHeight: 0.63,
      storeys: 2,
      wallMaterial: architecture.roseMaterial,
      roofMaterial: architecture.terracottaMaterial,
      shutters: true,
      flowerBoxes: true,
    }),
    0.3,
    -4.22,
    0.04,
  );

  place(
    architecture.createHouse({
      width: 1.9,
      depth: 1.35,
      wallHeight: 1.48,
      roofHeight: 0.58,
      storeys: 2,
      wallMaterial: architecture.creamMaterial,
      roofMaterial: architecture.mossRoofMaterial,
      timber: true,
      shutters: true,
    }),
    4.9,
    3.94,
    -0.13,
  );

  place(
    architecture.createHouse({
      width: 2,
      depth: 1.4,
      wallHeight: 1.55,
      roofHeight: 0.62,
      storeys: 2,
      wallMaterial: architecture.blueMaterial,
      roofMaterial: architecture.terracottaMaterial,
      shutters: true,
      flowerBoxes: true,
      dormer: true,
    }),
    -6.0,
    2.7,
    0.1,
  );

  place(
    architecture.createWorkshop(),
    -6.5,
    0.0,
    -0.02,
  );

  place(
    architecture.createChurch(),
    -2.9,
    3.05,
    0,
  );

  return buildings;
}

function createFountain(root) {
  const group = new THREE.Group();
  group.position.set(-0.28, 0.03, 2.62);
  const stone = new THREE.MeshStandardMaterial({
    color: "#a79b86",
    roughness: 0.95,
  });
  const darkStone = new THREE.MeshStandardMaterial({
    color: "#716b60",
    roughness: 0.95,
  });
  const water = new THREE.MeshPhysicalMaterial({
    color: "#6b9695",
    transparent: true,
    opacity: 0.85,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    emissive: new THREE.Color("#173237"),
    emissiveIntensity: 0.12,
  });
  const basin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.46, 0.21, 24),
    stone,
  );
  basin.position.y = 0.11;
  group.add(basin);
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.39, 0.055, 7, 28),
    darkStone,
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.22;
  group.add(rim);
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(0.35, 28),
    water,
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.219;
  group.add(pool);
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.14, 0.38, 10),
    stone,
  );
  plinth.position.y = 0.39;
  group.add(plinth);
  const bowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.15, 0.09, 20),
    darkStone,
  );
  bowl.position.y = 0.58;
  group.add(bowl);
  const jet = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.018, 0.44, 6),
    water,
  );
  jet.position.y = 0.78;
  group.add(jet);
  markShadows(group);
  root.add(group);
}

function createBench(x, z, rotation = 0) {
  const group = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({
    color: "#6a4932",
    roughness: 0.88,
  });
  const iron = new THREE.MeshStandardMaterial({
    color: "#343b35",
    roughness: 0.5,
    metalness: 0.5,
  });
  const seat = new THREE.Mesh(
    new RoundedBoxGeometry(0.72, 0.055, 0.22, 2, 0.018),
    wood,
  );
  seat.position.y = 0.3;
  group.add(seat);
  const back = new THREE.Mesh(
    new RoundedBoxGeometry(0.72, 0.25, 0.045, 2, 0.016),
    wood,
  );
  back.position.set(0, 0.5, -0.1);
  back.rotation.x = -0.07;
  group.add(back);
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(0.035, 0.28, 0.19),
      iron,
    );
    leg.position.set(side * 0.29, 0.15, 0);
    group.add(leg);
  }
  markShadows(group);
  group.position.set(x, GROUND_Y, z);
  group.rotation.y = rotation;
  return group;
}

function createStreetLamp(root, x, z, glowTexture, glowMaterial, withLight, index) {
  const group = new THREE.Group();
  group.position.set(x, GROUND_Y, z);
  const iron = new THREE.MeshStandardMaterial({
    color: "#303a34",
    roughness: 0.55,
    metalness: 0.48,
  });
  const glass = new THREE.MeshStandardMaterial({
    color: "#ffe0a2",
    emissive: new THREE.Color("#ffc66b"),
    emissiveIntensity: 0.08,
    roughness: 0.25,
  });
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.1, 10),
    iron,
  );
  base.position.y = 0.05;
  group.add(base);
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.035, 1.46, 8),
    iron,
  );
  pole.position.y = 0.82;
  group.add(pole);
  const arm = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.035, 0.035),
    iron,
  );
  arm.position.set(0.14, 1.53, 0);
  group.add(arm);
  const lantern = new THREE.Mesh(
    new RoundedBoxGeometry(0.14, 0.2, 0.14, 2, 0.025),
    glass,
  );
  lantern.position.set(0.28, 1.44, 0);
  group.add(lantern);
  const cap = new THREE.Mesh(
    new THREE.ConeGeometry(0.13, 0.09, 4),
    iron,
  );
  cap.rotation.y = Math.PI / 4;
  cap.position.set(0.28, 1.58, 0);
  group.add(cap);

  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      color: "#ffc778",
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
  );
  glow.position.set(0.28, 1.45, 0);
  glow.scale.setScalar(0.8);
  group.add(glow);

  let light = null;
  if (withLight) {
    light = new THREE.PointLight("#ffc373", 0, 5.4, 2);
    light.position.set(0.28, 1.57, 0);
    light.userData.nightIntensity = 8.5;
    group.add(light);
  }

  group.userData.lampIndex = index;
  markShadows(group);
  root.add(group);
  return { group, glow, glass, light };
}

function createTree(root, x, z, options = {}) {
  const {
    scale = 1,
    type = "round",
    seed = 1,
    leafColor = null,
  } = options;
  const random = seededRandom(seed);
  const group = new THREE.Group();
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: "#66442e",
    roughness: 0.96,
  });
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.085, 1.08, 7),
    trunkMaterial,
  );
  trunk.position.y = 0.54;
  group.add(trunk);

  const foliagePalette = [
    "#556c45",
    "#647b4f",
    "#738257",
    "#4f6748",
    "#7c8a5d",
  ];
  const baseColor =
    leafColor || foliagePalette[Math.floor(random() * foliagePalette.length)];
  const foliage = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.92,
    flatShading: true,
  });

  if (type === "pine") {
    for (let layer = 0; layer < 3; layer += 1) {
      const needle = new THREE.Mesh(
        new THREE.ConeGeometry(
          0.43 - layer * 0.08,
          0.88 - layer * 0.11,
          8,
        ),
        foliage,
      );
      needle.position.y = 0.88 + layer * 0.38;
      needle.rotation.y = layer * 0.42;
      group.add(needle);
    }
  } else {
    const clusters = 4 + Math.floor(random() * 2);
    for (let index = 0; index < clusters; index += 1) {
      const crown = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.34 + random() * 0.13, 1),
        foliage,
      );
      const angle = (index / clusters) * Math.PI * 2 + random() * 0.4;
      const radius = index === 0 ? 0 : 0.23 + random() * 0.13;
      crown.position.set(
        Math.cos(angle) * radius,
        1.05 + (index === 0 ? 0.21 : random() * 0.27),
        Math.sin(angle) * radius,
      );
      crown.scale.y = 0.82 + random() * 0.26;
      group.add(crown);
    }
    const top = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.24, 1),
      foliage,
    );
    top.position.y = 1.47;
    group.add(top);
  }

  group.position.set(x, GROUND_Y, z);
  group.scale.setScalar(scale);
  group.rotation.y = random() * Math.PI * 2;
  markShadows(group);
  root.add(group);
  return group;
}

function createBush(root, x, z, scale, seed) {
  const random = seededRandom(seed);
  const colors = ["#5f754c", "#6e8356", "#849163"];
  const material = new THREE.MeshStandardMaterial({
    color: colors[Math.floor(random() * colors.length)],
    roughness: 0.94,
    flatShading: true,
  });
  const group = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const leaf = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.17 + random() * 0.08, 1),
      material,
    );
    leaf.position.set(
      (random() - 0.5) * 0.26,
      0.14 + random() * 0.08,
      (random() - 0.5) * 0.2,
    );
    group.add(leaf);
  }
  group.position.set(x, GROUND_Y, z);
  group.scale.setScalar(scale);
  markShadows(group);
  root.add(group);
}

function createFence(root, points, height = 0.38) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: "#776854",
    roughness: 0.93,
  });
  for (let index = 0; index < points.length - 1; index += 1) {
    const [ax, az] = points[index];
    const [bx, bz] = points[index + 1];
    const length = Math.hypot(bx - ax, bz - az);
    const count = Math.max(2, Math.ceil(length / 0.22));
    for (let post = 0; post <= count; post += 1) {
      const t = post / count;
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, height, 0.035),
        material,
      );
      slat.position.set(
        ax + (bx - ax) * t,
        GROUND_Y + height / 2,
        az + (bz - az) * t,
      );
      group.add(slat);
    }
    for (const railHeight of [height * 0.38, height * 0.72]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(length, 0.028, 0.028),
        material,
      );
      rail.position.set(
        (ax + bx) / 2,
        GROUND_Y + railHeight,
        (az + bz) / 2,
      );
      rail.rotation.y = Math.atan2(bz - az, bx - ax);
      group.add(rail);
    }
  }
  markShadows(group);
  root.add(group);
}

function populateTown(root, architecture, river, roadNetwork) {
  createHouseBlock(root, architecture);
  createFountain(root);

  const benchSpots = [
    [-0.95, 2.38, 0.62],
    [0.32, 2.91, -2.1],
    [6.2, -2.12, 1.45],
    [-4.35, -1.9, 0.2],
  ];
  for (const [x, z, rotation] of benchSpots) {
    root.add(createBench(x, z, rotation));
  }

  const glowTexture = createGlowTexture();
  const sharedGlowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: "#ffd18a",
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const glowSprites = [];
  const pointLights = [];
  const lampSpecs = [
    [4.72, -2.46, true],
    [4.58, -0.07, true],
    [3.58, 1.15, false],
    [2.92, 2.48, true],
    [-1.24, 1.42, true],
    [-4.1, 1.37, false],
    [-4.27, 4.38, true],
    [-0.7, 4.36, false],
    [2.12, -2.8, true],
    [1.34, -3.78, false],
    [4.65, 3.3, false],
    [-5.62, 3.37, false],
  ];
  for (let index = 0; index < lampSpecs.length; index += 1) {
    const [x, z, withLight] = lampSpecs[index];
    const lamp = createStreetLamp(
      root,
      x,
      z,
      glowTexture,
      sharedGlowMaterial,
      withLight,
      index,
    );
    lamp.glow.material = sharedGlowMaterial.clone();
    lamp.glow.material.opacity = 0;
    glowSprites.push(lamp.glow);
    if (lamp.light) pointLights.push(lamp.light);
  }

  const stationPointLight = new THREE.PointLight("#ffc474", 0, 5.8, 2);
  stationPointLight.position.set(7.24, 2.15, -2.0);
  stationPointLight.userData.nightIntensity = 9.5;
  root.add(stationPointLight);
  pointLights.push(stationPointLight);

  const trees = [
    [-11.08, 2.0, 1.16, "pine"],
    [-11.18, -1.35, 0.95, "round"],
    [-11.32, 4.25, 0.8, "pine"],
    [-10.35, 0.32, 0.78, "round"],
    [-9.58, 4.68, 0.96, "pine"],
    [-8.45, 3.15, 0.77, "round"],
    [-7.55, 3.65, 0.79, "round"],
    [-8.6, -3.7, 0.92, "pine"],
    [-7.62, -1.05, 0.72, "round"],
    [-5.03, 3.54, 0.74, "round"],
    [-4.92, -1.02, 0.6, "round"],
    [-2.68, -1.8, 0.68, "round"],
    [-2.72, -5.28, 0.84, "pine"],
    [0.72, -5.52, 0.72, "round"],
    [3.26, -5.58, 0.78, "round"],
    [5.82, -5.15, 0.75, "round"],
    [6.58, -4.0, 0.82, "round"],
    [7.82, 3.17, 0.86, "pine"],
    [7.8, -0.85, 0.69, "round"],
    [6.16, 3.0, 0.62, "round"],
    [3.38, 5.32, 0.82, "pine"],
    [1.16, 5.23, 0.66, "round"],
    [-5.12, 5.49, 0.62, "round"],
    [-10.53, 7.5, 0.92, "pine"],
    [-7.82, 7.86, 0.82, "round"],
    [-3.3, 7.72, 0.7, "round"],
    [2.32, 7.83, 0.8, "pine"],
    [6.82, 7.47, 0.75, "round"],
    [10.53, 5.15, 0.9, "pine"],
    [11.18, 1.7, 0.72, "round"],
    [11.11, -2.25, 0.86, "round"],
    [9.45, -6.52, 0.82, "pine"],
    [6.75, -7.68, 0.74, "round"],
    [1.4, -8.05, 0.85, "round"],
    [-3.85, -7.8, 0.72, "pine"],
    [-8.72, -6.77, 0.85, "round"],
  ];
  for (let index = 0; index < trees.length; index += 1) {
    const [x, z, scale, type] = trees[index];
    const autumnal = index % 7 === 3;
    createTree(root, x, z, {
      scale,
      type,
      seed: 200 + index * 17,
      leafColor: autumnal ? "#8a7a4d" : null,
    });
  }

  const bushes = [
    [-1.78, 1.55, 0.8],
    [0.75, 1.03, 0.72],
    [5.63, 0.69, 0.78],
    [4.15, 4.58, 0.65],
    [3.12, -3.27, 0.7],
    [1.43, -3.3, 0.65],
    [-4.93, 1.98, 0.8],
    [-7.23, 2.02, 0.72],
    [-4.33, 3.52, 0.6],
    [2.98, 4.69, 0.6],
    [-1.46, 4.82, 0.58],
    [6.02, 2.42, 0.56],
    [-4.92, -2.18, 0.55],
    [-2.05, -3.03, 0.54],
    [1.72, -3.7, 0.5],
  ];
  for (let index = 0; index < bushes.length; index += 1) {
    const [x, z, scale] = bushes[index];
    createBush(root, x, z, scale, 700 + index * 13);
  }

  createFence(
    root,
    [
      [-5.05, 1.73],
      [-5.05, 2.48],
      [-6.95, 2.48],
    ],
    0.34,
  );
  createFence(
    root,
    [
      [4.06, 4.72],
      [5.74, 4.72],
    ],
    0.34,
  );
  createFence(
    root,
    [
      [2.68, -3.66],
      [4.82, -3.66],
    ],
    0.31,
  );

  for (const [x, z, rotation] of [
    [5.88, 0.95, -0.3],
    [-5.38, -0.36, 0.1],
    [-3.58, 4.63, 0.15],
  ]) {
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.14, 0.28, 12),
      new THREE.MeshStandardMaterial({
        color: "#6b4f37",
        roughness: 0.87,
      }),
    );
    barrel.position.set(x, GROUND_Y + 0.14, z);
    barrel.rotation.y = rotation;
    barrel.castShadow = true;
    barrel.receiveShadow = true;
    root.add(barrel);
  }

  return {
    sharedGlowMaterial,
    glowSprites,
    pointLights,
  };
}

export function createWorld(scene, renderer) {
  const root = new THREE.Group();
  root.name = "Willow Creek";
  scene.add(root);

  const textures = {
    ballast: createBallastTexture(),
    grass: createGrassTexture(),
  };

  const board = createBoard(root, renderer);
  const architecture = createArchitecture(renderer);
  const river = createRiver(root, textures, renderer);
  const roads = createRoadNetwork(root, textures);
  const trackCurve = createTrackCurve();
  const track = buildTrack(
    trackCurve,
    renderer,
    textures,
    architecture,
    river.curve,
  );
  root.add(track.group);

  createFootbridge(root, river, roads.roadMaterial);

  const station = addStation(trackCurve, architecture);
  root.add(station.group);

  const train = createTrain(
    trackCurve,
    station.stationDistance,
    scene,
  );
  root.add(train.group);

  const town = populateTown(root, architecture, river, roads);

  const stationGlowTexture = createGlowTexture();
  const stationGlowMaterial = new THREE.SpriteMaterial({
    map: stationGlowTexture,
    color: "#ffc878",
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  for (const x of [-2.32, 2.32]) {
    const glow = new THREE.Sprite(stationGlowMaterial);
    glow.position.set(x, 1.7, 1.24);
    glow.scale.setScalar(0.72);
    station.frame.add(glow);
  }

  const nightMaterials = architecture.exportNightMaterials();
  let currentNight = 0;

  function setNight(amount) {
    currentNight = THREE.MathUtils.clamp(amount, 0, 1);
    const eased = currentNight * currentNight * (3 - 2 * currentNight);
    nightMaterials.litWindowMaterial.emissiveIntensity = 0.03 + eased * 1.75;
    nightMaterials.lampMaterial.emissiveIntensity = 0.08 + eased * 3.1;
    for (const material of nightMaterials.clockFaceMaterials) {
      material.emissiveIntensity = eased * 0.95;
    }
    for (const light of town.pointLights) {
      light.intensity = eased * light.userData.nightIntensity;
    }
    for (const glow of town.glowSprites) {
      glow.material.opacity = eased * 0.72;
      glow.visible = eased > 0.012;
    }
    stationGlowMaterial.opacity = eased * 0.66;
    stationGlowMaterial.visible = eased > 0.012;
    train.setNight(eased);
  }

  setNight(0);

  return {
    root,
    board,
    train,
    station,
    track,
    trackCurve,
    trackLength: track.trackLength,
    river,
    architecture,
    setNight,
    getNightAmount() {
      return currentNight;
    },
    update(elapsed) {
      river.update(elapsed);
    },
  };
}
