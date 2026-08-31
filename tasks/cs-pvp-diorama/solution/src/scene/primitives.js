import * as THREE from 'three';

const boxGeometryCache = new Map();
const cylinderGeometryCache = new Map();
const edgeGeometryCache = new WeakMap();

function key(values) {
  return values.map((value) => Number(value).toFixed(3)).join(':');
}

function getBoxGeometry(size) {
  const cacheKey = key(size);
  if (!boxGeometryCache.has(cacheKey)) {
    boxGeometryCache.set(cacheKey, new THREE.BoxGeometry(...size));
  }
  return boxGeometryCache.get(cacheKey);
}

function getCylinderGeometry(radiusTop, radiusBottom, height, radialSegments) {
  const cacheKey = key([radiusTop, radiusBottom, height, radialSegments]);
  if (!cylinderGeometryCache.has(cacheKey)) {
    cylinderGeometryCache.set(
      cacheKey,
      new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments),
    );
  }
  return cylinderGeometryCache.get(cacheKey);
}

function getEdges(geometry) {
  if (!edgeGeometryCache.has(geometry)) {
    edgeGeometryCache.set(geometry, new THREE.EdgesGeometry(geometry, 28));
  }
  return edgeGeometryCache.get(geometry);
}

function transform(object, position, rotation) {
  object.position.set(...position);
  object.rotation.set(...rotation);
  return object;
}

export function outlinedMesh(
  geometry,
  material,
  outlineMaterial,
  {
    name = '',
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    castShadow = true,
    receiveShadow = true,
    outline = true,
  } = {},
) {
  const group = new THREE.Group();
  group.name = name;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  mesh.name = name ? `${name}-surface` : '';
  group.add(mesh);

  if (outline && outlineMaterial) {
    const edges = new THREE.LineSegments(getEdges(geometry), outlineMaterial);
    edges.renderOrder = 3;
    edges.name = name ? `${name}-outline` : '';
    group.add(edges);
  }

  return transform(group, position, rotation);
}

export function box({
  size,
  material,
  outlineMaterial,
  name = '',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  outline = true,
  castShadow = true,
  receiveShadow = true,
}) {
  return outlinedMesh(getBoxGeometry(size), material, outlineMaterial, {
    name,
    position,
    rotation,
    outline,
    castShadow,
    receiveShadow,
  });
}

export function cylinder({
  radius = 0.5,
  radiusTop = radius,
  radiusBottom = radius,
  height = 1,
  radialSegments = 12,
  material,
  outlineMaterial,
  name = '',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  outline = true,
  castShadow = true,
  receiveShadow = true,
}) {
  const geometry = getCylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
  return outlinedMesh(geometry, material, outlineMaterial, {
    name,
    position,
    rotation,
    outline,
    castShadow,
    receiveShadow,
  });
}

export function beamBetween({
  start,
  end,
  radius,
  material,
  radialSegments = 8,
  name = '',
  castShadow = true,
}) {
  const startPoint = new THREE.Vector3(...start);
  const endPoint = new THREE.Vector3(...end);
  const direction = endPoint.clone().sub(startPoint);
  const mesh = new THREE.Mesh(
    getCylinderGeometry(radius, radius, direction.length(), radialSegments),
    material,
  );
  mesh.position.copy(startPoint).addScaledVector(direction, 0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize(),
  );
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  mesh.name = name;
  return mesh;
}

export function makeRamp({
  width,
  depth,
  height,
  material,
  outlineMaterial,
  name = 'ramp',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const positions = new Float32Array([
    -halfWidth, 0, -halfDepth,
    halfWidth, 0, -halfDepth,
    -halfWidth, 0, halfDepth,
    halfWidth, 0, halfDepth,
    -halfWidth, height, -halfDepth,
    halfWidth, height, -halfDepth,
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex([
    0, 2, 1, 1, 2, 3,
    0, 1, 4, 1, 5, 4,
    0, 4, 2,
    1, 3, 5,
    2, 4, 3, 3, 4, 5,
  ]);
  geometry.computeVertexNormals();

  return outlinedMesh(geometry, material, outlineMaterial, {
    name,
    position,
    rotation,
  });
}

export function stairs({
  width,
  rise,
  run,
  steps,
  material,
  outlineMaterial,
  name = 'stairs',
  position = [0, 0, 0],
  rotationY = 0,
}) {
  const group = new THREE.Group();
  group.name = name;
  const stepRise = rise / steps;
  const stepRun = run / steps;

  for (let index = 0; index < steps; index += 1) {
    const height = stepRise * (index + 1);
    const step = box({
      size: [width, height, stepRun],
      material,
      outlineMaterial,
      name: `${name}-step-${index + 1}`,
      position: [0, height / 2, -run / 2 + stepRun * (index + 0.5)],
      outline: index === 0 || index === steps - 1,
    });
    group.add(step);
  }

  group.position.set(...position);
  group.rotation.y = rotationY;
  return group;
}

export function ladder({
  width = 1,
  height = 3,
  rungs = 8,
  material,
  name = 'ladder',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) {
  const group = new THREE.Group();
  group.name = name;
  const railOffset = width / 2;
  group.add(
    beamBetween({
      start: [-railOffset, 0, 0],
      end: [-railOffset, height, 0],
      radius: 0.075,
      material,
    }),
    beamBetween({
      start: [railOffset, 0, 0],
      end: [railOffset, height, 0],
      radius: 0.075,
      material,
    }),
  );

  for (let index = 1; index < rungs; index += 1) {
    const y = (height * index) / rungs;
    group.add(
      beamBetween({
        start: [-railOffset, y, 0],
        end: [railOffset, y, 0],
        radius: 0.055,
        material,
        castShadow: false,
      }),
    );
  }

  return transform(group, position, rotation);
}

export function railing({
  length,
  height = 1.15,
  material,
  name = 'railing',
  position = [0, 0, 0],
  rotationY = 0,
  spacing = 1.6,
}) {
  const group = new THREE.Group();
  group.name = name;
  const posts = Math.max(2, Math.ceil(length / spacing) + 1);
  for (let index = 0; index < posts; index += 1) {
    const x = -length / 2 + (length * index) / (posts - 1);
    group.add(
      beamBetween({
        start: [x, 0, 0],
        end: [x, height, 0],
        radius: 0.055,
        material,
        castShadow: false,
      }),
    );
  }
  group.add(
    beamBetween({
      start: [-length / 2, height, 0],
      end: [length / 2, height, 0],
      radius: 0.065,
      material,
    }),
    beamBetween({
      start: [-length / 2, height * 0.5, 0],
      end: [length / 2, height * 0.5, 0],
      radius: 0.035,
      material,
      castShadow: false,
    }),
  );
  group.position.set(...position);
  group.rotation.y = rotationY;
  return group;
}

export function fencePanel({
  width,
  height,
  material,
  frameMaterial,
  name = 'fence',
  position = [0, 0, 0],
  rotationY = 0,
}) {
  const group = new THREE.Group();
  group.name = name;
  const left = -width / 2;
  const right = width / 2;
  group.add(
    beamBetween({ start: [left, 0, 0], end: [left, height, 0], radius: 0.07, material: frameMaterial }),
    beamBetween({ start: [right, 0, 0], end: [right, height, 0], radius: 0.07, material: frameMaterial }),
    beamBetween({ start: [left, height, 0], end: [right, height, 0], radius: 0.055, material: frameMaterial }),
    beamBetween({ start: [left, 0.15, 0], end: [right, 0.15, 0], radius: 0.045, material: frameMaterial }),
  );

  const spacing = 0.42;
  const diagonals = Math.ceil((width + height) / spacing);
  for (let index = -diagonals; index <= diagonals; index += 1) {
    const offset = index * spacing;
    const startX = Math.max(left, left + offset);
    const endX = Math.min(right, right + offset + height);
    if (endX > startX) {
      group.add(
        beamBetween({
          start: [startX, 0.12, 0],
          end: [endX, Math.min(height, 0.12 + endX - startX), 0],
          radius: 0.012,
          material,
          radialSegments: 5,
          castShadow: false,
        }),
      );
    }
  }

  group.position.set(...position);
  group.rotation.y = rotationY;
  return group;
}

export function corrugatedPanel({
  width,
  height,
  depth = 0.12,
  material,
  ribMaterial = material,
  outlineMaterial,
  name = 'corrugated-panel',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  vertical = true,
}) {
  const group = box({
    size: [width, height, depth],
    material,
    outlineMaterial,
    name,
    position,
    rotation,
  });
  const ribCount = Math.max(3, Math.floor((vertical ? width : height) / 0.28));
  const ribs = new THREE.Group();
  const start = -(vertical ? width : height) / 2;

  for (let index = 1; index < ribCount; index += 1) {
    const offset = start + ((vertical ? width : height) * index) / ribCount;
    const rib = new THREE.Mesh(
      getBoxGeometry(vertical ? [0.035, height * 0.96, depth * 0.24] : [width * 0.96, 0.035, depth * 0.24]),
      ribMaterial,
    );
    if (vertical) rib.position.x = offset;
    else rib.position.y = offset;
    rib.position.z = depth * 0.58;
    ribs.add(rib);
  }
  group.children[0].add(ribs);
  return group;
}

export function wallWithOpening({
  width,
  height,
  depth,
  openingWidth,
  openingHeight,
  openingCenterX = 0,
  material,
  outlineMaterial,
  name = 'wall-opening',
  position = [0, 0, 0],
  rotationY = 0,
}) {
  const group = new THREE.Group();
  group.name = name;
  const leftWidth = openingCenterX - openingWidth / 2 + width / 2;
  const rightWidth = width / 2 - (openingCenterX + openingWidth / 2);

  if (leftWidth > 0.05) {
    group.add(box({
      size: [leftWidth, height, depth],
      material,
      outlineMaterial,
      name: `${name}-left`,
      position: [-width / 2 + leftWidth / 2, height / 2, 0],
    }));
  }
  if (rightWidth > 0.05) {
    group.add(box({
      size: [rightWidth, height, depth],
      material,
      outlineMaterial,
      name: `${name}-right`,
      position: [width / 2 - rightWidth / 2, height / 2, 0],
    }));
  }
  if (openingHeight < height) {
    group.add(box({
      size: [openingWidth, height - openingHeight, depth],
      material,
      outlineMaterial,
      name: `${name}-header`,
      position: [openingCenterX, openingHeight + (height - openingHeight) / 2, 0],
    }));
  }
  group.position.set(...position);
  group.rotation.y = rotationY;
  return group;
}

export function cable({
  points,
  radius = 0.028,
  material,
  name = 'cable',
  tubularSegments = 28,
}) {
  const curve = new THREE.CatmullRomCurve3(points.map((pointValue) => new THREE.Vector3(...pointValue)));
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, tubularSegments, radius, 5, false),
    material,
  );
  mesh.name = name;
  return mesh;
}

export function disposePrimitiveCaches() {
  for (const geometry of boxGeometryCache.values()) geometry.dispose();
  for (const geometry of cylinderGeometryCache.values()) geometry.dispose();
  for (const geometry of edgeGeometryCache.values?.() ?? []) geometry.dispose();
  boxGeometryCache.clear();
  cylinderGeometryCache.clear();
}
