import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  createProfileRibbonGeometry,
  createRibbonGeometry,
  findCurveIntersections,
  nearestCurveU,
} from "./geometry.js";
import { markShadows } from "./buildings.js";
import { createStationSignTexture } from "./textures.js";

export const TRACK_POINTS = [
  [0.3, 6.72],
  [4.4, 6.45],
  [7.63, 5.22],
  [9.48, 2.55],
  [9.78, -0.92],
  [8.55, -4.35],
  [5.1, -6.38],
  [0.7, -6.95],
  [-4.3, -6.5],
  [-8.15, -4.92],
  [-9.98, -1.43],
  [-9.62, 2.1],
  [-7.77, 5.02],
  [-4.05, 6.58],
];

export function createTrackCurve() {
  return new THREE.CatmullRomCurve3(
    TRACK_POINTS.map(([x, z]) => new THREE.Vector3(x, 0.585, z)),
    true,
    "catmullrom",
    0.34,
  );
}

function createMaterialSet(renderer, textures) {
  const ballastTexture = textures.ballast.clone();
  ballastTexture.needsUpdate = true;
  ballastTexture.repeat.set(7, 2);
  ballastTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  return {
    ballast: new THREE.MeshStandardMaterial({
      map: ballastTexture,
      color: "#898279",
      roughness: 0.98,
    }),
    sleeper: new THREE.MeshStandardMaterial({
      color: "#594235",
      roughness: 0.94,
    }),
    rail: new THREE.MeshStandardMaterial({
      color: "#605b51",
      roughness: 0.38,
      metalness: 0.72,
    }),
    railTop: new THREE.MeshStandardMaterial({
      color: "#9d9685",
      roughness: 0.3,
      metalness: 0.8,
    }),
    bridgeWood: new THREE.MeshStandardMaterial({
      color: "#574234",
      roughness: 0.9,
    }),
    bridgeStone: new THREE.MeshStandardMaterial({
      color: "#a79a86",
      roughness: 0.95,
    }),
  };
}

function createEmbankmentSegments(curve, excludedWindows, profile, material) {
  const group = new THREE.Group();
  const sorted = excludedWindows
    .map((window) => ({
      start: ((window.start % 1) + 1) % 1,
      end: ((window.end % 1) + 1) % 1,
    }))
    .sort((a, b) => a.start - b.start);

  const ranges = [];
  if (sorted.length === 0) {
    ranges.push([0, 1]);
  } else {
    for (let index = 0; index < sorted.length; index += 1) {
      const current = sorted[index];
      const next = sorted[(index + 1) % sorted.length];
      const end = index === sorted.length - 1 ? next.start + 1 : next.start;
      ranges.push([current.end, end]);
    }
  }

  for (const [start, end] of ranges) {
    if (end - start <= 0.002) continue;
    const geometry = createProfileRibbonGeometry(curve, profile, 280, {
      closed: true,
      uStart: start,
      uEnd: end,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    group.add(mesh);
  }
  return group;
}

function createRails(curve) {
  const group = new THREE.Group();
  const railY = 0.548;
  const halfGauge = 0.245;
  const samples = 260;

  for (const offset of [-halfGauge, halfGauge]) {
    const points = [];
    const point = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const side = new THREE.Vector3();
    for (let index = 0; index < samples; index += 1) {
      const u = index / samples;
      curve.getPointAt(u, point);
      curve.getTangentAt(u, tangent);
      side.set(-tangent.z, 0, tangent.x).normalize();
      points.push(
        new THREE.Vector3(
          point.x + side.x * offset,
          railY,
          point.z + side.z * offset,
        ),
      );
    }
    const railCurve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.3);
    const rail = new THREE.Mesh(
      new THREE.TubeGeometry(railCurve, 620, 0.034, 5, true),
      createRails.material,
    );
    rail.castShadow = true;
    rail.receiveShadow = true;
    group.add(rail);
  }

  return group;
}

function createSleepers(curve) {
  const sleeperCount = 164;
  const geometry = new THREE.BoxGeometry(0.67, 0.075, 0.13);
  const material = createSleepers.material;
  const mesh = new THREE.InstancedMesh(geometry, material, sleeperCount);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(1, 1, 1);
  const position = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const random = (() => {
    let seed = 31;
    return () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  })();

  for (let index = 0; index < sleeperCount; index += 1) {
    const u = index / sleeperCount;
    curve.getPointAt(u, position);
    curve.getTangentAt(u, tangent);
    position.y = 0.505 + (random() - 0.5) * 0.006;
    const yaw = Math.atan2(tangent.x, tangent.z);
    quaternion.setFromAxisAngle(up, yaw);
    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(index, matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
  return mesh;
}

function createBridge(curve, crossingU, trackLength, architecture, materials) {
  const group = new THREE.Group();
  const length = 5.0;
  const halfAngle = length / trackLength / 2;
  const centerPoint = curve.getPointAt(crossingU);
  const tangent = curve.getTangentAt(crossingU).normalize();
  const yaw = Math.atan2(tangent.x, tangent.z);
  group.position.set(centerPoint.x, 0, centerPoint.z);
  group.rotation.y = yaw;

  const deck = new THREE.Mesh(
    new RoundedBoxGeometry(1.82, 0.18, length, 2, 0.035),
    materials.bridgeWood,
  );
  deck.position.y = 0.38;
  group.add(deck);

  for (const side of [-1, 1]) {
    const girder = new THREE.Mesh(
      new THREE.BoxGeometry(0.17, 0.24, length + 0.08),
      architecture.darkWoodMaterial,
    );
    girder.position.set(side * 0.56, 0.22, 0);
    group.add(girder);
  }

  for (const z of [-1.55, 0, 1.55]) {
    const crossBeam = new THREE.Mesh(
      new THREE.BoxGeometry(1.58, 0.12, 0.16),
      architecture.darkWoodMaterial,
    );
    crossBeam.position.set(0, 0.24, z);
    group.add(crossBeam);
  }

  for (const bentZ of [-1.3, 1.3]) {
    for (const side of [-1, 1]) {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.58, 0.18),
        materials.bridgeWood,
      );
      post.position.set(side * 0.57, -0.08, bentZ);
      post.rotation.z = side * 0.1;
      group.add(post);
    }
    const bentBeam = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.14, 0.17),
      architecture.darkWoodMaterial,
    );
    bentBeam.position.set(0, 0.09, bentZ);
    group.add(bentBeam);
    for (const side of [-1, 1]) {
      const brace = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.4, 0.1),
        architecture.darkWoodMaterial,
      );
      brace.position.set(side * 0.29, 0.0, bentZ);
      brace.rotation.z = side * 0.62;
      group.add(brace);
    }
  }

  for (const side of [-1, 1]) {
    const abutment = new THREE.Mesh(
      new RoundedBoxGeometry(2.04, 0.46, 0.58, 2, 0.025),
      materials.bridgeStone,
    );
    abutment.position.set(0, 0.2, side * (length / 2 - 0.2));
    group.add(abutment);
  }

  for (const side of [-1, 1]) {
    for (const z of [-2.25, -1.12, 0, 1.12, 2.25]) {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.085, 0.44, 0.085),
        architecture.darkWoodMaterial,
      );
      post.position.set(side * 0.86, 0.69, z);
      group.add(post);
    }
    for (const railY of [0.66, 0.88]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.055, length + 0.12),
        architecture.darkWoodMaterial,
      );
      rail.position.set(side * 0.86, railY, 0);
      group.add(rail);
    }
  }

  markShadows(group);
  return {
    group,
    startU: ((crossingU - halfAngle) % 1 + 1) % 1,
    endU: ((crossingU + halfAngle) % 1 + 1) % 1,
    crossingU,
  };
}

export function buildTrack(
  curve,
  renderer,
  textures,
  architecture,
  riverCurve,
) {
  const materials = createMaterialSet(renderer, textures);
  createRails.material = materials.rail;
  createSleepers.material = materials.sleeper;
  const group = new THREE.Group();
  const trackLength = curve.getLength();
  const intersections = riverCurve
    ? findCurveIntersections(curve, riverCurve)
    : [];
  const crossingUs = [];
  for (const intersection of intersections) {
    if (
      crossingUs.every(
        (existing) => Math.abs(existing - intersection.aU) > 0.015,
      )
    ) {
      crossingUs.push(intersection.aU);
    }
  }

  const bridgeHalfMeters = 2.62;
  const bridgeWindows = crossingUs.map((u) => {
    const half = bridgeHalfMeters / trackLength;
    return { start: u - half, end: u + half };
  });

  const ballastProfile = [
    { offset: -1.04, y: 0.02, uv: 0 },
    { offset: -1.04, y: 0.245, uv: 0.05 },
    { offset: -0.57, y: 0.475, uv: 0.33 },
    { offset: 0.57, y: 0.475, uv: 0.67 },
    { offset: 1.04, y: 0.245, uv: 0.95 },
    { offset: 1.04, y: 0.02, uv: 1 },
  ];
  const embankment = createEmbankmentSegments(
    curve,
    bridgeWindows,
    ballastProfile,
    materials.ballast,
  );
  group.add(embankment);

  group.add(createRails(curve));
  group.add(createSleepers(curve));

  const bridges = [];
  for (const crossingU of crossingUs) {
    const bridge = createBridge(
      curve,
      crossingU,
      trackLength,
      architecture,
      materials,
    );
    group.add(bridge.group);
    bridges.push(bridge);
  }

  return {
    group,
    curve,
    trackLength,
    crossingUs,
    bridges,
    materials,
  };
}

function createStationStructure(curve, stationU, architecture) {
  const group = new THREE.Group();
  const point = curve.getPointAt(stationU);
  const tangent = curve.getTangentAt(stationU).normalize();
  const outward = new THREE.Vector3(-tangent.z, 0, tangent.x);
  const towardCenter = new THREE.Vector3(-point.x, 0, -point.z);
  if (outward.dot(towardCenter) < 0) outward.negate();

  const frame = new THREE.Group();
  frame.position.set(point.x, 0, point.z);
  frame.rotation.y = Math.atan2(outward.x, outward.z);
  group.add(frame);

  const platform = new THREE.Mesh(
    new RoundedBoxGeometry(5.0, 0.44, 1.22, 2, 0.04),
    architecture.stoneMaterial,
  );
  platform.position.set(0, 0.28, 1.18);
  frame.add(platform);

  const platformEdge = new THREE.Mesh(
    new THREE.BoxGeometry(5.02, 0.46, 0.08),
    architecture.darkStoneMaterial,
  );
  platformEdge.position.set(0, 0.29, 0.57);
  frame.add(platformEdge);

  const canopy = new THREE.Mesh(
    new RoundedBoxGeometry(4.8, 0.09, 1.14, 2, 0.035),
    architecture.slateMaterial,
  );
  canopy.position.set(0, 1.58, 1.04);
  canopy.rotation.z = 0.045;
  frame.add(canopy);

  const canopyTrim = new THREE.Mesh(
    new THREE.BoxGeometry(4.84, 0.055, 0.07),
    architecture.brassMaterial,
  );
  canopyTrim.position.set(0, 1.54, 0.48);
  frame.add(canopyTrim);

  for (const x of [-2.05, -0.68, 0.68, 2.05]) {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.045, 1.15, 8),
      architecture.brassMaterial,
    );
    post.position.set(x, 1.02, 0.66);
    frame.add(post);
  }

  const benchMaterial = architecture.darkWoodMaterial;
  for (const x of [-1.35, 1.35]) {
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.05, 0.18),
      benchMaterial,
    );
    seat.position.set(x, 0.72, 1.48);
    frame.add(seat);
    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.2, 0.04),
        benchMaterial,
      );
      leg.position.set(x + side * 0.19, 0.6, 1.48);
      frame.add(leg);
    }
  }

  for (const x of [-2.32, 2.32]) {
    const lampPost = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.045, 1.12, 8),
      architecture.brassMaterial,
    );
    lampPost.position.set(x, 1.06, 1.24);
    frame.add(lampPost);
    const lampGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 10, 8),
      architecture.lampMaterial,
    );
    lampGlobe.position.set(x, 1.68, 1.24);
    frame.add(lampGlobe);
    const lampCap = new THREE.Mesh(
      new THREE.ConeGeometry(0.13, 0.09, 10),
      architecture.darkStoneMaterial,
    );
    lampCap.position.set(x, 1.79, 1.24);
    frame.add(lampCap);
  }

  const stationPosition = new THREE.Vector3(point.x, 0, point.z).addScaledVector(
    outward,
    2.31,
  );
  const stationYaw = Math.atan2(
    outward.x,
    outward.z,
  );
  const stationFrame = new THREE.Group();
  stationFrame.position.set(stationPosition.x, 0, stationPosition.z);
  stationFrame.rotation.y = stationYaw;
  group.add(stationFrame);

  const terrace = new THREE.Mesh(
    new RoundedBoxGeometry(3.2, 0.44, 1.9, 2, 0.045),
    architecture.stoneMaterial,
  );
  terrace.position.y = 0.28;
  stationFrame.add(terrace);

  for (let step = 0; step < 3; step += 1) {
    const height = 0.36 - step * 0.11;
    const stepMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.12, height, 0.22),
      architecture.stoneMaterial,
    );
    stepMesh.position.set(0, 0.04 + height / 2, 1.68 + step * 0.21);
    stationFrame.add(stepMesh);
  }

  const station = architecture.createStationHouse();
  station.position.set(0, 0.5, 0);
  stationFrame.add(station);

  const trackSideSign = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.46),
    new THREE.MeshStandardMaterial({
      map: createStationSignTexture(),
      roughness: 0.7,
      metalness: 0,
    }),
  );
  trackSideSign.position.set(0, 2.08, -0.83);
  trackSideSign.rotation.y = Math.PI;
  stationFrame.add(trackSideSign);

  const hangingSign = new THREE.Mesh(
    new THREE.PlaneGeometry(1.18, 0.36),
    new THREE.MeshStandardMaterial({
      map: createStationSignTexture(),
      roughness: 0.7,
      metalness: 0,
    }),
  );
  hangingSign.position.set(0, 1.22, 0.69);
  hangingSign.rotation.y = Math.PI;
  frame.add(hangingSign);

  for (const x of [-0.55, 0.55]) {
    const chain = new THREE.Mesh(
      new THREE.CylinderGeometry(0.011, 0.011, 0.27, 5),
      architecture.brassMaterial,
    );
    chain.position.set(x, 1.5, 0.69);
    frame.add(chain);
  }

  markShadows(group);
  return {
    group,
    frame,
    platform,
    station,
    stationFrame,
    outward,
    tangent,
  };
}

export function addStation(curve, architecture, target) {
  const stationU = nearestCurveU(
    curve,
    target ?? new THREE.Vector3(9.208, 0.585, -3.03),
  );
  const station = createStationStructure(curve, stationU, architecture);
  return {
    ...station,
    stationU,
    stationDistance: stationU * curve.getLength(),
    worldPosition: curve.getPointAt(stationU),
  };
}
