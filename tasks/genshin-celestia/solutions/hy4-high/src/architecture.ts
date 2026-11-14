import * as THREE from 'three';
import type { Materials } from './materials';
import { range, type Rng } from './random';

const TAU = Math.PI * 2;

function cylinder(
  radiusTop: number,
  radiusBottom: number,
  height: number,
  sides: number,
  material: THREE.Material,
): THREE.Mesh {
  return new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, sides), material);
}

function horizontalRing(radius: number, tube: number, material: THREE.Material, segments = 48): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 6, segments), material);
  mesh.rotation.x = Math.PI / 2;
  return mesh;
}

export function createColumn(height: number, radius: number, materials: Materials): THREE.Group {
  const group = new THREE.Group();
  const base = cylinder(radius * 1.34, radius * 1.46, height * 0.06, 10, materials.stoneShade);
  base.position.y = height * 0.03;
  const shaft = cylinder(radius * 0.86, radius, height * 0.86, 12, materials.stone);
  shaft.position.y = height * 0.49;
  const capital = cylinder(radius * 1.46, radius * 1.1, height * 0.1, 10, materials.stoneLight);
  capital.position.y = height * 0.95;
  group.add(base, shaft, capital);
  return group;
}

export function createPinnacle(height: number, radius: number, materials: Materials): THREE.Group {
  const group = new THREE.Group();
  const foot = cylinder(radius * 1.3, radius * 1.4, height * 0.16, 8, materials.stoneShade);
  foot.position.y = height * 0.08;
  const cone = new THREE.Mesh(new THREE.ConeGeometry(radius, height * 0.74, 8), materials.stoneLight);
  cone.position.y = height * 0.53;
  const finial = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.26, 8, 6), materials.gold);
  finial.position.y = height * 0.93;
  group.add(foot, cone, finial);
  return group;
}

function lancetShape(width: number, height: number): THREE.Shape {
  const half = width * 0.5;
  const shape = new THREE.Shape();
  shape.moveTo(-half, 0);
  shape.lineTo(half, 0);
  shape.lineTo(half, height * 0.56);
  shape.quadraticCurveTo(half * 0.94, height * 0.86, 0, height);
  shape.quadraticCurveTo(-half * 0.94, height * 0.86, -half, height * 0.56);
  shape.closePath();
  return shape;
}

export function createLancetWindow(width: number, height: number, materials: Materials): THREE.Group {
  const group = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.ExtrudeGeometry(lancetShape(width, height), { depth: 2, bevelEnabled: false, curveSegments: 8 }),
    materials.gold,
  );
  const glass = new THREE.Mesh(
    new THREE.ExtrudeGeometry(lancetShape(width * 0.76, height * 0.86), {
      depth: 1.2,
      bevelEnabled: false,
      curveSegments: 8,
    }),
    materials.window,
  );
  glass.position.set(0, height * 0.07, 2.1);
  group.add(frame, glass);
  return group;
}

export interface ColonnadeOptions {
  radius: number;
  count: number;
  height: number;
  columnRadius: number;
  materials: Materials;
  withArches?: boolean;
}

/** A ring of ivory columns joined by arches, drawn with instancing. */
export function createColonnade(options: ColonnadeOptions): THREE.Group {
  const { radius, count, height, columnRadius: cr, materials } = options;
  const group = new THREE.Group();
  const dummy = new THREE.Object3D();
  const shaft = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(cr * 0.86, cr, height * 0.84, 10),
    materials.stone,
    count,
  );
  const foot = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(cr * 1.4, cr * 1.5, height * 0.07, 10),
    materials.stoneShade,
    count,
  );
  const cap = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(cr * 1.5, cr * 1.12, height * 0.1, 10),
    materials.stoneLight,
    count,
  );
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * TAU;
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.position.set(x, height * 0.49, z);
    dummy.updateMatrix();
    shaft.setMatrixAt(i, dummy.matrix);
    dummy.position.y = height * 0.035;
    dummy.updateMatrix();
    foot.setMatrixAt(i, dummy.matrix);
    dummy.position.y = height * 0.95;
    dummy.updateMatrix();
    cap.setMatrixAt(i, dummy.matrix);
  }
  shaft.instanceMatrix.needsUpdate = true;
  foot.instanceMatrix.needsUpdate = true;
  cap.instanceMatrix.needsUpdate = true;
  shaft.castShadow = true;
  group.add(foot, shaft, cap);

  if (options.withArches !== false) {
    const delta = TAU / count;
    const archRadius = radius * Math.sin(delta * 0.5);
    const midRadius = radius * Math.cos(delta * 0.5);
    const arches = new THREE.InstancedMesh(
      new THREE.TorusGeometry(archRadius, cr * 0.48, 5, 16, Math.PI),
      materials.stoneLight,
      count,
    );
    for (let i = 0; i < count; i += 1) {
      const a = ((i + 0.5) / count) * TAU;
      dummy.position.set(Math.cos(a) * midRadius, height * 0.82, Math.sin(a) * midRadius);
      dummy.rotation.set(0, Math.PI / 2 - a, 0);
      dummy.scale.set(1, 0.7, 1);
      dummy.updateMatrix();
      arches.setMatrixAt(i, dummy.matrix);
    }
    arches.instanceMatrix.needsUpdate = true;
    group.add(arches);
  }
  return group;
}

export interface TierOptions {
  radius: number;
  height: number;
  sides: number;
  columnCount: number;
  windowCount: number;
  pinnacleCount: number;
  materials: Materials;
  colonnade: boolean;
}

/** One stacked tier of the central spire: floors, arcaded walls, windows, cornice, pinnacles. */
export function createSpireTier(options: TierOptions): THREE.Group {
  const { radius, height, sides, materials } = options;
  const group = new THREE.Group();
  const floor = 5;

  const lowerFloor = cylinder(radius * 1.06, radius * 1.06, floor, sides, materials.stoneLight);
  lowerFloor.position.y = floor * 0.5;
  const upperFloor = cylinder(radius * 1.08, radius * 1.08, floor, sides, materials.stoneLight);
  upperFloor.position.y = height - floor * 0.5;
  lowerFloor.castShadow = true;
  upperFloor.castShadow = true;
  group.add(lowerFloor, upperFloor);

  const wallHeight = height - floor * 2;
  const wall = cylinder(radius * 0.78, radius * 0.8, wallHeight, 24, materials.stone);
  wall.position.y = height * 0.5;
  wall.castShadow = true;
  wall.receiveShadow = true;
  group.add(wall);

  const plinth = cylinder(radius * 0.82, radius * 0.84, height * 0.12, 24, materials.roofDeep);
  plinth.position.y = floor + height * 0.06;
  group.add(plinth);

  const windowWidth = radius * 0.24;
  const windowHeight = wallHeight * 0.56;
  for (let i = 0; i < options.windowCount; i += 1) {
    const a = (i / options.windowCount) * TAU + Math.PI / options.windowCount;
    const win = createLancetWindow(windowWidth, windowHeight, materials);
    win.position.set(
      Math.cos(a) * radius * 0.795,
      floor + wallHeight * 0.2,
      Math.sin(a) * radius * 0.795,
    );
    win.rotation.y = Math.PI / 2 - a;
    group.add(win);
  }

  const bandA = horizontalRing(radius * 0.81, 1.1, materials.gold, 32);
  bandA.position.y = height * 0.18;
  const bandB = horizontalRing(radius * 0.81, 1.1, materials.gold, 32);
  bandB.position.y = height * 0.76;
  group.add(bandA, bandB);

  if (options.colonnade) {
    const col = createColonnade({
      radius: radius * 0.94,
      count: options.columnCount,
      height: height * 0.8,
      columnRadius: radius * 0.052,
      materials,
    });
    col.position.y = floor;
    group.add(col);
  }

  const cornice = horizontalRing(radius * 1.08, 1.5, materials.gold, sides * 4);
  cornice.position.y = height;
  group.add(cornice);
  for (let i = 0; i < options.pinnacleCount; i += 1) {
    const a = (i / options.pinnacleCount) * TAU + Math.PI / options.pinnacleCount;
    const pinnacle = createPinnacle(height * 0.34, radius * 0.085, materials);
    pinnacle.position.set(Math.cos(a) * radius * 0.98, height, Math.sin(a) * radius * 0.98);
    group.add(pinnacle);
  }
  return group;
}

export interface Sanctum {
  group: THREE.Group;
  topY: number;
}

/** The very tall, layered ivory spire at the heart of Celestia. */
export function createSanctum(materials: Materials): Sanctum {
  const group = new THREE.Group();
  const steps: Array<{ r: number; h: number; y: number; mat: THREE.Material }> = [
    { r: 116, h: 10, y: 5, mat: materials.stoneShade },
    { r: 103, h: 9, y: 14.5, mat: materials.stone },
    { r: 90, h: 8, y: 23, mat: materials.stoneLight },
  ];
  for (const step of steps) {
    const mesh = cylinder(step.r, step.r * 1.02, step.h, 8, step.mat);
    mesh.position.y = step.y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  const baseRing = horizontalRing(94, 1.8, materials.gold, 48);
  baseRing.position.y = 27.5;
  group.add(baseRing);

  const tiers: TierOptions[] = [
    { radius: 80, height: 92, sides: 8, columnCount: 16, windowCount: 8, pinnacleCount: 8, materials, colonnade: true },
    { radius: 62, height: 78, sides: 8, columnCount: 12, windowCount: 8, pinnacleCount: 8, materials, colonnade: true },
    { radius: 46, height: 66, sides: 8, columnCount: 10, windowCount: 6, pinnacleCount: 6, materials, colonnade: true },
    { radius: 33, height: 56, sides: 8, columnCount: 8, windowCount: 6, pinnacleCount: 6, materials, colonnade: true },
    { radius: 23, height: 46, sides: 8, columnCount: 8, windowCount: 4, pinnacleCount: 4, materials, colonnade: true },
  ];
  let y = 27;
  for (const spec of tiers) {
    const tier = createSpireTier(spec);
    tier.position.y = y;
    group.add(tier);
    y += spec.height;
  }

  const drum = cylinder(20, 23, 14, 8, materials.stoneLight);
  drum.position.y = y + 7;
  const cone = new THREE.Mesh(new THREE.ConeGeometry(19, 76, 8), materials.stoneLight);
  cone.position.y = y + 52;
  cone.castShadow = true;
  group.add(drum, cone);
  for (let i = 0; i < 3; i += 1) {
    const hoop = horizontalRing(18 - i * 4.6, 1.1, materials.gold, 32);
    hoop.position.y = y + 22 + i * 20;
    group.add(hoop);
  }
  const tip = new THREE.Mesh(new THREE.SphereGeometry(3.2, 10, 8), materials.goldGlow);
  tip.position.y = y + 92;
  group.add(tip);
  return { group, topY: y + 92 };
}

export interface Armillary {
  group: THREE.Group;
  update(elapsed: number, delta: number): void;
}

/** The huge interlocking gold rings crowning the spire. */
export function createArmillary(materials: Materials): Armillary {
  const group = new THREE.Group();
  const pedestal = cylinder(9, 13, 12, 12, materials.stoneLight);
  pedestal.position.y = 6;
  const stem = cylinder(2.6, 3.4, 18, 10, materials.gold);
  stem.position.y = 20;
  group.add(pedestal, stem);

  const spinner = new THREE.Group();
  spinner.position.y = 42;
  group.add(spinner);

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(10, 1), materials.goldGlow);
  spinner.add(core);

  const ringSpecs: Array<[number, number, number, number, number]> = [
    [46, 2.4, Math.PI / 2, 0, 0],
    [46, 2.0, 0, 0, 0],
    [44, 2.0, 0, Math.PI / 2, 0],
    [39, 1.7, Math.PI / 4, Math.PI / 5, 0],
    [39, 1.7, -Math.PI / 4, -Math.PI / 5, 0],
    [55, 1.2, Math.PI / 3, Math.PI / 6, Math.PI / 8],
  ];
  ringSpecs.forEach(([radius, tube, rx, ry, rz], index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, tube, 8, 64),
      index % 2 === 0 ? materials.goldGlow : materials.gold,
    );
    ring.rotation.set(rx, ry, rz);
    spinner.add(ring);
  });

  const studs = new THREE.InstancedMesh(new THREE.SphereGeometry(2.6, 8, 6), materials.goldGlow, 12);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * TAU;
    dummy.position.set(Math.cos(a) * 46, Math.sin(a) * 46, 0);
    dummy.updateMatrix();
    studs.setMatrixAt(i, dummy.matrix);
  }
  studs.instanceMatrix.needsUpdate = true;
  spinner.add(studs);

  const outer = new THREE.Mesh(new THREE.TorusGeometry(61, 1.5, 8, 72), materials.gold);
  outer.position.y = 42;
  outer.rotation.y = Math.PI / 5;
  group.add(outer);

  const glow = new THREE.PointLight(0xffd08a, 22, 460, 2);
  glow.position.y = 42;
  group.add(glow);

  return {
    group,
    update(elapsed, delta) {
      spinner.rotation.y += delta * 0.14;
      spinner.rotation.x = Math.sin(elapsed * 0.18) * 0.09;
      outer.rotation.z += delta * 0.05;
    },
  };
}

export interface BridgeOptions {
  from: THREE.Vector3;
  to: THREE.Vector3;
  arch: number;
  width: number;
  materials: Materials;
  fromT?: number;
  toT?: number;
  railings?: boolean;
}

/** A grand white arched bridge; fromT/toT allow a broken span. */
export function createBridge(options: BridgeOptions): THREE.Group {
  const { from, to, arch, width, materials } = options;
  const t0 = options.fromT ?? 0;
  const t1 = options.toT ?? 1;
  const group = new THREE.Group();
  const segments = Math.max(12, Math.round(48 * (t1 - t0)));
  const direction = new THREE.Vector3().subVectors(to, from);
  const horizontal = new THREE.Vector3(direction.x, 0, direction.z).normalize();
  const perp = new THREE.Vector3(-horizontal.z, 0, horizontal.x);
  const half = width * 0.5;
  const thickness = 3.4;
  const centers: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = t0 + (t1 - t0) * (i / segments);
    const center = new THREE.Vector3().lerpVectors(from, to, t);
    center.y += arch * Math.sin(Math.PI * t);
    centers.push(center);
  }

  const deckPositions: number[] = [];
  const deckIndices: number[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const c = centers[i];
    const lx = c.x - perp.x * half;
    const lz = c.z - perp.z * half;
    const rx = c.x + perp.x * half;
    const rz = c.z + perp.z * half;
    deckPositions.push(lx, c.y, lz, rx, c.y, rz, lx, c.y - thickness, lz, rx, c.y - thickness, rz);
  }
  for (let i = 0; i < segments; i += 1) {
    const a = i * 4;
    const b = (i + 1) * 4;
    deckIndices.push(a, a + 1, b, a + 1, b + 1, b);
    deckIndices.push(a + 2, b + 2, a + 3, a + 3, b + 2, b + 3);
    deckIndices.push(a, b, a + 2, a + 2, b, b + 2);
    deckIndices.push(a + 1, a + 3, b + 1, a + 3, b + 3, b + 1);
  }
  const deckGeometry = new THREE.BufferGeometry();
  deckGeometry.setAttribute('position', new THREE.Float32BufferAttribute(deckPositions, 3));
  deckGeometry.setIndex(deckIndices);
  deckGeometry.computeVertexNormals();
  const deck = new THREE.Mesh(deckGeometry, materials.stoneDeck);
  deck.castShadow = true;
  deck.receiveShadow = true;
  group.add(deck);

  if (options.railings !== false) {
    const railHeight = 5.2;
    const railPositions: number[] = [];
    const railIndices: number[] = [];
    for (let i = 0; i <= segments; i += 1) {
      const c = centers[i];
      for (const side of [-1, 1]) {
        const x = c.x + perp.x * half * side;
        const z = c.z + perp.z * half * side;
        railPositions.push(x, c.y + 0.6, z, x, c.y + railHeight, z);
      }
    }
    for (let i = 0; i < segments; i += 1) {
      const a = i * 4;
      const b = (i + 1) * 4;
      railIndices.push(a, b, a + 1, a + 1, b, b + 1);
      railIndices.push(a + 2, a + 3, b + 2, a + 3, b + 3, b + 2);
    }
    const railGeometry = new THREE.BufferGeometry();
    railGeometry.setAttribute('position', new THREE.Float32BufferAttribute(railPositions, 3));
    railGeometry.setIndex(railIndices);
    railGeometry.computeVertexNormals();
    group.add(new THREE.Mesh(railGeometry, materials.stoneDeck));

    const postPositions: THREE.Vector3[] = [];
    for (let s = 0; s <= segments; s += 4) {
      const c = centers[Math.min(s, segments)];
      for (const side of [-1, 1]) {
        postPositions.push(
          new THREE.Vector3(c.x + perp.x * half * side, c.y + railHeight * 0.5, c.z + perp.z * half * side),
        );
      }
    }
    const posts = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(1.1, 1.35, railHeight + 1.4, 6),
      materials.stoneLight,
      postPositions.length,
    );
    const dummy = new THREE.Object3D();
    postPositions.forEach((position, index) => {
      dummy.position.copy(position);
      dummy.updateMatrix();
      posts.setMatrixAt(index, dummy.matrix);
    });
    posts.instanceMatrix.needsUpdate = true;
    group.add(posts);
  }

  if (t0 === 0 || t1 === 1) {
    const endpoints = t0 === 0 ? [centers[0]] : [];
    if (t1 === 1) endpoints.push(centers[centers.length - 1]);
    for (const c of endpoints) {
      for (const side of [-1, 1]) {
        const pier = createPinnacle(19, 3.8, materials);
        pier.position.set(c.x + perp.x * half * 1.18 * side, c.y, c.z + perp.z * half * 1.18 * side);
        group.add(pier);
      }
    }
  }
  return group;
}

export interface ArcadeOptions {
  length: number;
  count: number;
  height: number;
  materials: Materials;
  broken?: boolean;
}

/** A straight colonnade segment, optionally with a broken entablature. */
export function createArcadeSegment(options: ArcadeOptions): THREE.Group {
  const { length, count, height, materials } = options;
  const group = new THREE.Group();
  const cr = height * 0.055;
  const step = length / (count - 1);
  const dummy = new THREE.Object3D();
  const shaft = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(cr * 0.85, cr, height * 0.84, 10),
    materials.stone,
    count,
  );
  const foot = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(cr * 1.4, cr * 1.5, height * 0.07, 10),
    materials.stoneShade,
    count,
  );
  const cap = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(cr * 1.5, cr * 1.12, height * 0.1, 10),
    materials.stoneLight,
    count,
  );
  for (let i = 0; i < count; i += 1) {
    const x = -length * 0.5 + i * step;
    dummy.scale.set(1, 1, 1);
    dummy.position.set(x, height * 0.49, 0);
    dummy.updateMatrix();
    shaft.setMatrixAt(i, dummy.matrix);
    dummy.position.y = height * 0.035;
    dummy.updateMatrix();
    foot.setMatrixAt(i, dummy.matrix);
    dummy.position.y = height * 0.95;
    dummy.updateMatrix();
    cap.setMatrixAt(i, dummy.matrix);
  }
  shaft.instanceMatrix.needsUpdate = true;
  foot.instanceMatrix.needsUpdate = true;
  cap.instanceMatrix.needsUpdate = true;
  shaft.castShadow = true;
  group.add(foot, shaft, cap);

  const arches = new THREE.InstancedMesh(
    new THREE.TorusGeometry(step * 0.5, cr * 0.45, 5, 16, Math.PI),
    materials.stoneLight,
    count - 1,
  );
  for (let i = 0; i < count - 1; i += 1) {
    dummy.position.set(-length * 0.5 + (i + 0.5) * step, height * 0.82, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 0.75, 1);
    dummy.updateMatrix();
    arches.setMatrixAt(i, dummy.matrix);
  }
  arches.instanceMatrix.needsUpdate = true;
  group.add(arches);

  const pieces: Array<[number, number]> = options.broken
    ? [[-length * 0.5, -length * 0.08], [length * 0.2, length * 0.5]]
    : [[-length * 0.5, length * 0.5]];
  for (const [x0, x1] of pieces) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 3.6, cr * 3.2), materials.stoneLight);
    beam.position.set((x0 + x1) * 0.5, height, 0);
    beam.castShadow = true;
    group.add(beam);
  }
  for (const side of [-1, 1]) {
    const finial = createPinnacle(height * 0.28, cr * 1.3, materials);
    finial.position.set(side * length * 0.5, height + 1.8, 0);
    group.add(finial);
  }
  return group;
}

export function createRuinTower(height: number, radius: number, materials: Materials, rng: Rng): THREE.Group {
  const group = new THREE.Group();
  const shaft = cylinder(radius * 0.82, radius, height, 8, materials.stone);
  shaft.position.y = height * 0.5;
  shaft.castShadow = true;
  group.add(shaft);

  const blocks = new THREE.InstancedMesh(
    new THREE.BoxGeometry(radius * 0.5, radius * 0.35, radius * 0.5),
    materials.stoneShade,
    5,
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i += 1) {
    const a = (i / 5) * TAU;
    dummy.position.set(Math.cos(a) * radius * 0.55, height + range(rng, 0, radius * 0.5), Math.sin(a) * radius * 0.55);
    dummy.rotation.set(range(rng, -0.3, 0.3), a, range(rng, -0.3, 0.3));
    dummy.scale.set(1, range(rng, 0.6, 1.4), 1);
    dummy.updateMatrix();
    blocks.setMatrixAt(i, dummy.matrix);
  }
  blocks.instanceMatrix.needsUpdate = true;
  group.add(blocks);

  for (let i = 0; i < 3; i += 1) {
    const a = (i / 3) * TAU;
    const win = createLancetWindow(radius * 0.42, height * 0.3, materials);
    win.position.set(Math.cos(a) * radius * 0.83, height * 0.48, Math.sin(a) * radius * 0.83);
    win.rotation.y = Math.PI / 2 - a;
    group.add(win);
  }
  const band = horizontalRing(radius * 0.85, 0.8, materials.gold, 24);
  band.position.y = height * 0.72;
  group.add(band);
  group.rotation.z = range(rng, -0.09, 0.09);
  return group;
}

/** A small ivory rotunda used for the scattered buildings on the islands. */
export function createPavilion(radius: number, materials: Materials): THREE.Group {
  const group = new THREE.Group();
  const base = cylinder(radius * 1.04, radius * 1.1, 3, 12, materials.stoneShade);
  base.position.y = 1.5;
  group.add(base);
  const columnHeight = radius * 0.95;
  const colonnade = createColonnade({
    radius: radius * 0.82,
    count: 8,
    height: columnHeight,
    columnRadius: radius * 0.075,
    materials,
  });
  colonnade.position.y = 3;
  group.add(colonnade);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(radius * 1.06, radius * 0.72, 12), materials.roof);
  roof.position.y = 3 + columnHeight + radius * 0.36;
  roof.castShadow = true;
  group.add(roof);
  const rim = horizontalRing(radius * 1.05, 0.9, materials.gold, 32);
  rim.position.y = 3 + columnHeight;
  group.add(rim);
  const finial = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.13, 10, 8), materials.goldGlow);
  finial.position.y = 3 + columnHeight + radius * 0.72;
  group.add(finial);
  return group;
}
