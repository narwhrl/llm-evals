import * as THREE from 'three';
import { materials } from './materials';
import { makeMesh } from './utils';

export interface BridgeEnd {
  x: number;
  y: number;
  z: number;
  radius: number;
}

const bridgeStone = materials.ivoryBright.clone();
bridgeStone.side = THREE.DoubleSide;
const bridgeShade = materials.ivory.clone();
bridgeShade.side = THREE.DoubleSide;

function offsetCurve(
  curve: THREE.CatmullRomCurve3,
  offset: number,
  lift: number,
  startT = 0,
  endT = 1,
): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  const divisions = 28;
  for (let i = 0; i <= divisions; i += 1) {
    const t = THREE.MathUtils.lerp(startT, endT, i / divisions);
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).setY(0).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
    points.push(point.clone().addScaledVector(side, offset).add(new THREE.Vector3(0, lift, 0)));
  }
  return new THREE.CatmullRomCurve3(points, false, 'centripetal');
}

function createDeckGeometry(
  curve: THREE.CatmullRomCurve3,
  width: number,
  thickness: number,
  startT = 0,
  endT = 1,
): THREE.BufferGeometry {
  const divisions = Math.max(4, Math.ceil(48 * (endT - startT)));
  const positions: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= divisions; i += 1) {
    const t = THREE.MathUtils.lerp(startT, endT, i / divisions);
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).setY(0).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const left = point.clone().addScaledVector(side, width * 0.5);
    const right = point.clone().addScaledVector(side, -width * 0.5);
    positions.push(
      left.x,
      left.y,
      left.z,
      right.x,
      right.y,
      right.z,
      left.x,
      left.y - thickness,
      left.z,
      right.x,
      right.y - thickness,
      right.z,
    );
  }

  for (let i = 0; i < divisions; i += 1) {
    const a = i * 4;
    const b = (i + 1) * 4;
    indices.push(
      a,
      b,
      a + 1,
      a + 1,
      b,
      b + 1,
      a + 2,
      a + 3,
      b + 2,
      a + 3,
      b + 3,
      b + 2,
      a,
      a + 2,
      b,
      a + 2,
      b + 2,
      b,
      a + 1,
      b + 1,
      a + 3,
      a + 3,
      b + 1,
      b + 3,
    );
  }
  const start = 0;
  const end = divisions * 4;
  indices.push(
    start,
    start + 1,
    start + 2,
    start + 1,
    start + 3,
    start + 2,
    end,
    end + 2,
    end + 1,
    end + 1,
    end + 2,
    end + 3,
  );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function addRailings(
  group: THREE.Group,
  curve: THREE.CatmullRomCurve3,
  width: number,
  startT: number,
  endT: number,
): void {
  for (const direction of [-1, 1] as const) {
    const offset = offsetCurve(
      curve,
      direction * (width * 0.5 - 0.14),
      0.1,
      startT,
      endT,
    );
    const rail = makeMesh(
      new THREE.TubeGeometry(offset, 44, 0.105, 5, false),
      materials.ivoryBright,
    );
    rail.position.y = 1.22;
    group.add(rail);
    const goldRail = makeMesh(
      new THREE.TubeGeometry(offset, 44, 0.035, 4, false),
      materials.gold,
    );
    goldRail.position.y = 1.38;
    group.add(goldRail);
  }

  const postCount = Math.max(4, Math.round(24 * (endT - startT)));
  const posts = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.07, 0.13, 1.22, 5),
    materials.ivory,
    postCount * 2,
  );
  const caps = new THREE.InstancedMesh(
    new THREE.OctahedronGeometry(0.14, 0),
    materials.gold,
    postCount * 2,
  );
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const one = new THREE.Vector3(1, 1, 1);
  let instance = 0;
  for (let i = 0; i < postCount; i += 1) {
    const t = THREE.MathUtils.lerp(startT, endT, i / Math.max(1, postCount - 1));
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).setY(0).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
    for (const direction of [-1, 1] as const) {
      const position = point.clone().addScaledVector(side, direction * (width * 0.5 - 0.14));
      position.y += 0.6;
      matrix.compose(position, quaternion, one);
      posts.setMatrixAt(instance, matrix);
      const capPosition = position.clone();
      capPosition.y += 0.65;
      matrix.compose(capPosition, quaternion, one);
      caps.setMatrixAt(instance, matrix);
      instance += 1;
    }
  }
  posts.instanceMatrix.needsUpdate = true;
  caps.instanceMatrix.needsUpdate = true;
  posts.castShadow = true;
  caps.castShadow = true;
  group.add(posts, caps);
}

function addDeckTrim(
  group: THREE.Group,
  curve: THREE.CatmullRomCurve3,
  width: number,
  startT: number,
  endT: number,
): void {
  for (const direction of [-1, 1] as const) {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 28; i += 1) {
      const t = THREE.MathUtils.lerp(startT, endT, i / 28);
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t).setY(0).normalize();
      const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
      points.push(
        point.clone().addScaledVector(side, direction * (width * 0.5 + 0.03)).add(
          new THREE.Vector3(0, 0.06, 0),
        ),
      );
    }
    const trim = makeMesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points, false, 'centripetal'),
        52,
        0.065,
        4,
        false,
      ),
      materials.gold,
    );
    group.add(trim);
  }
}

function addArchSupports(
  group: THREE.Group,
  curve: THREE.CatmullRomCurve3,
  length: number,
): void {
  const stations = [0.16, 0.4, 0.64, 0.86];
  stations.forEach((t, index) => {
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).setY(0).normalize();
    const span = Math.min(11, length * 0.15);
    const drop = 4.1 + (index % 2) * 0.5;
    const left = point.clone().addScaledVector(tangent, -span * 0.5);
    const right = point.clone().addScaledVector(tangent, span * 0.5);
    left.y -= drop;
    right.y -= drop;
    const apex = point.clone();
    apex.y -= 0.87;
    const control = apex.clone().add(new THREE.Vector3(0, drop * 0.72, 0));
    const archCurve = new THREE.QuadraticBezierCurve3(left, control, right);
    const arch = makeMesh(
      new THREE.TubeGeometry(archCurve, 24, 0.46, 6, false),
      bridgeStone,
    );
    group.add(arch);
    const gold = makeMesh(
      new THREE.TubeGeometry(archCurve, 24, 0.05, 4, false),
      materials.gold,
    );
    gold.position.y = -0.22;
    group.add(gold);
    for (const endpoint of [left, right]) {
      const pier = makeMesh(
        new THREE.CylinderGeometry(0.28, 0.66, 3.6, 7),
        bridgeShade,
      );
      pier.position.copy(endpoint);
      pier.position.y -= 1.5;
      group.add(pier);
      const pendant = makeMesh(new THREE.OctahedronGeometry(0.3, 0), materials.goldBright);
      pendant.position.copy(endpoint);
      pendant.position.y -= 3.6;
      group.add(pendant);
    }
    if (index === 2) {
      const finial = makeMesh(new THREE.ConeGeometry(0.55, 3.1, 7), materials.ivoryBright);
      finial.position.copy(point);
      finial.position.y -= 4.9;
      finial.rotation.z = Math.PI;
      group.add(finial);
    }
  });
}

function addGrandArch(group: THREE.Group, curve: THREE.CatmullRomCurve3): void {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 30; i += 1) {
    const t = 0.02 + (i / 30) * 0.96;
    const point = curve.getPoint(t);
    point.y -= 1.85 + Math.pow(Math.abs(2 * t - 1), 1.3) * 6.2;
    points.push(point);
  }
  const archCurve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  const arch = makeMesh(
    new THREE.TubeGeometry(archCurve, 48, 0.82, 7, false),
    bridgeStone,
  );
  group.add(arch);
  const trim = makeMesh(
    new THREE.TubeGeometry(archCurve, 48, 0.12, 5, false),
    materials.gold,
  );
  trim.position.y = -0.62;
  group.add(trim);
  for (const t of [0.25, 0.75]) {
    const point = curve.getPoint(t);
    point.y -= 3.7;
    const pendant = makeMesh(new THREE.ConeGeometry(0.7, 4.2, 6), materials.ivoryBright);
    pendant.position.copy(point);
    pendant.rotation.z = Math.PI;
    group.add(pendant);
  }
}

function addLanding(
  group: THREE.Group,
  point: THREE.Vector3,
  direction: THREE.Vector3,
  width: number,
): void {
  const angle = Math.atan2(direction.x, direction.z);
  const platform = makeMesh(
    new THREE.BoxGeometry(width + 4.2, 0.72, 4.4),
    materials.ivoryShade,
  );
  platform.position.copy(point);
  platform.position.y -= 0.33;
  platform.rotation.y = angle;
  group.add(platform);
  const step = makeMesh(
    new THREE.BoxGeometry(width + 2.4, 0.5, 1.25),
    materials.ivory,
  );
  step.position.copy(point);
  step.position.y -= 0.84;
  step.rotation.y = angle;
  group.add(step);
  const trim = makeMesh(
    new THREE.BoxGeometry(width + 4.3, 0.1, 0.12),
    materials.gold,
  );
  trim.position.copy(point);
  trim.position.y += 0.09;
  trim.rotation.y = angle;
  group.add(trim);
}

function addBrokenRubble(group: THREE.Group, breakPoint: THREE.Vector3): void {
  const shards = [
    [-2.2, -1.2, 1.1, 1.6],
    [1.7, -2.3, 0.6, 2.1],
    [-0.5, -3.1, 1.9, 1.2],
    [0.9, -4.2, -1.1, 0.8],
    [-2.6, -4.4, -0.3, 0.65],
  ];
  shards.forEach(([dx, dy, dz, size], index) => {
    const shard = makeMesh(
      index % 2 === 0
        ? new THREE.BoxGeometry(size * 2.1, size * 0.55, size * 1.25)
        : new THREE.DodecahedronGeometry(size, 0),
      index % 2 === 0 ? bridgeShade : materials.warmStone,
    );
    shard.position.copy(breakPoint).add(new THREE.Vector3(dx, dy, dz));
    shard.rotation.set(0.2 * index, 0.6 * index, 0.13 * index);
    group.add(shard);
  });
  const hangingArch = makeMesh(
    new THREE.TorusGeometry(4.2, 0.38, 6, 26, Math.PI * 0.68),
    bridgeStone,
  );
  hangingArch.position.copy(breakPoint).add(new THREE.Vector3(0.2, -4.7, 0));
  hangingArch.rotation.set(0.34, 0.9, -0.72);
  group.add(hangingArch);
}

function addColonnadeArches(
  group: THREE.Group,
  curve: THREE.CatmullRomCurve3,
  width: number,
  stations: number[],
): void {
  const springHeight = 3.15;
  const archRadius = width * 0.5 + 0.42;
  const up = new THREE.Vector3(0, 1, 0);
  stations.forEach((t) => {
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).setY(0).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const localFrame = new THREE.Matrix4().makeBasis(
      side,
      up,
      tangent.clone().negate(),
    );
    const archGroup = new THREE.Group();
    archGroup.position.copy(point);
    archGroup.quaternion.setFromRotationMatrix(localFrame);
    group.add(archGroup);

    for (const direction of [-1, 1] as const) {
      const column = makeMesh(
        new THREE.CylinderGeometry(0.18, 0.29, springHeight, 7),
        materials.ivoryBright,
      );
      column.position.set(direction * archRadius, springHeight / 2, 0);
      archGroup.add(column);
      const base = makeMesh(
        new THREE.CylinderGeometry(0.34, 0.44, 0.32, 7),
        materials.ivoryShade,
      );
      base.position.set(direction * archRadius, 0.16, 0);
      archGroup.add(base);
      const capital = makeMesh(
        new THREE.CylinderGeometry(0.34, 0.22, 0.28, 7),
        materials.gold,
      );
      capital.position.set(
        direction * archRadius,
        springHeight + 0.14,
        0,
      );
      archGroup.add(capital);
    }

    const arch = makeMesh(
      new THREE.TorusGeometry(archRadius, 0.18, 5, 26, Math.PI),
      materials.ivoryBright,
    );
    arch.position.y = springHeight;
    archGroup.add(arch);
    const keystone = makeMesh(new THREE.OctahedronGeometry(0.3, 0), materials.gold);
    keystone.position.y = springHeight + archRadius;
    archGroup.add(keystone);
  });
}

export function createBridge(
  from: BridgeEnd,
  to: BridgeEnd,
  index: number,
  broken = false,
): THREE.Group {
  const group = new THREE.Group();
  group.name = `skybridge-${index}`;
  const start = new THREE.Vector3(from.x, from.y + 0.7, from.z);
  const end = new THREE.Vector3(to.x, to.y + 0.7, to.z);
  const flatDirection = end.clone().sub(start).setY(0).normalize();
  start.addScaledVector(flatDirection, from.radius * 0.73);
  end.addScaledVector(flatDirection, -to.radius * 0.73);
  const distance = start.distanceTo(end);
  const lift = THREE.MathUtils.clamp(distance * 0.1, 5.5, 12);
  const quarter = start.clone().lerp(end, 0.28);
  quarter.y += lift * 0.62;
  const middle = start.clone().lerp(end, 0.5);
  middle.y += lift;
  const threeQuarter = start.clone().lerp(end, 0.72);
  threeQuarter.y += lift * 0.62;
  const curve = new THREE.CatmullRomCurve3(
    [start, quarter, middle, threeQuarter, end],
    false,
    'centripetal',
  );
  const length = curve.getLength();
  const width = 7.2;

  if (broken) {
    const leftDeck = makeMesh(
      createDeckGeometry(curve, width, 1.7, 0, 0.41),
      bridgeStone,
    );
    const rightDeck = makeMesh(
      createDeckGeometry(curve, width, 1.7, 0.66, 1),
      bridgeStone,
    );
    group.add(leftDeck, rightDeck);
    addDeckTrim(group, curve, width, 0, 0.405);
    addDeckTrim(group, curve, width, 0.665, 1);
    addRailings(group, curve, width, 0, 0.41);
    addRailings(group, curve, width, 0.66, 1);
    addArchSupports(group, curve, length);
    addBrokenRubble(group, curve.getPoint(0.535));
  } else {
    group.add(makeMesh(createDeckGeometry(curve, width, 1.7), bridgeStone));
    addDeckTrim(group, curve, width, 0, 1);
    addRailings(group, curve, width, 0, 1);
    addArchSupports(group, curve, length);
  }

  addLanding(group, start, flatDirection, width);
  addLanding(group, end, flatDirection.clone().negate(), width);
  addGrandArch(group, curve);
  addColonnadeArches(
    group,
    curve,
    width,
    broken ? [0.14, 0.32, 0.74, 0.91] : [0.14, 0.32, 0.5, 0.68, 0.86],
  );

  const pendantCount = 7;
  for (let i = 0; i < pendantCount; i += 1) {
    const t = (i + 0.7) / (pendantCount + 0.4);
    const point = curve.getPoint(t);
    const jewel = makeMesh(new THREE.OctahedronGeometry(0.17, 0), materials.goldBright);
    jewel.position.copy(point);
    jewel.position.y -= 1.56;
    group.add(jewel);
  }

  return group;
}
