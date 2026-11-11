import * as THREE from 'three';
import { materials } from './materials';
import { createRadialTexture, makeMesh, mulberry32 } from './utils';

export interface Sanctum {
  group: THREE.Group;
  update(time: number, delta: number): void;
}

interface PointedArchOptions {
  width: number;
  height: number;
  frameWidth?: number;
  frameMaterial?: THREE.Material;
  panelMaterial?: THREE.Material;
}

function cylinder(
  radiusTop: number,
  radiusBottom: number,
  height: number,
  segments: number,
  material: THREE.Material,
  y = 0,
): THREE.Mesh {
  const mesh = makeMesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 1),
    material,
  );
  mesh.position.y = y;
  return mesh;
}

function ring(
  radius: number,
  tube: number,
  material: THREE.Material,
  y: number,
  horizontal = true,
): THREE.Mesh {
  const mesh = makeMesh(
    new THREE.TorusGeometry(radius, tube, 7, Math.max(36, Math.round(radius * 4)), Math.PI * 2),
    material,
  );
  if (horizontal) {
    mesh.rotation.x = Math.PI / 2;
  }
  mesh.position.y = y;
  return mesh;
}

function pointedArchShape(width: number, height: number): THREE.Shape {
  const shape = new THREE.Shape();
  const half = width / 2;
  const shoulder = height * 0.63;
  shape.moveTo(-half, 0);
  shape.lineTo(half, 0);
  shape.lineTo(half, shoulder);
  shape.quadraticCurveTo(half * 0.78, height * 0.9, 0, height);
  shape.quadraticCurveTo(-half * 0.78, height * 0.9, -half, shoulder);
  shape.closePath();
  return shape;
}

function createPointedArch(options: PointedArchOptions): THREE.Group {
  const {
    width,
    height,
    frameWidth = 0.35,
    frameMaterial = materials.gold,
    panelMaterial = materials.window,
  } = options;
  const group = new THREE.Group();
  const surround = makeMesh(
    new THREE.ShapeGeometry(
      pointedArchShape(width + frameWidth * 2.4, height + frameWidth * 1.9),
      16,
    ),
    materials.ivoryBright,
  );
  surround.position.z = 0.025;
  const frame = makeMesh(
    new THREE.ShapeGeometry(pointedArchShape(width + frameWidth * 1.1, height + frameWidth), 16),
    frameMaterial,
  );
  frame.position.z = 0.055;
  const panel = makeMesh(
    new THREE.ShapeGeometry(pointedArchShape(width, height), 16),
    panelMaterial,
  );
  panel.position.z = 0.075;
  group.add(surround, frame, panel);
  return group;
}

function addPointedWindows(
  parent: THREE.Group,
  radius: number,
  count: number,
  bottomY: number,
  width: number,
  height: number,
  angleOffset = 0,
): void {
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + angleOffset;
    const window = createPointedArch({
      width,
      height,
      frameWidth: width * 0.12,
      panelMaterial: i % 4 === 0 ? materials.windowWarm : materials.window,
    });
    window.position.set(Math.sin(angle) * radius, bottomY, Math.cos(angle) * radius);
    window.rotation.y = angle;
    parent.add(window);
  }
}

function addArcade(
  parent: THREE.Group,
  radius: number,
  count: number,
  baseY: number,
  springHeight: number,
  tube = 0.34,
): void {
  const chord = 2 * radius * Math.sin(Math.PI / count);
  const archRadius = chord * 0.5;
  const columns = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.34, 0.47, springHeight, 8),
    materials.ivory,
    count,
  );
  const capitals = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.62, 0.4, 0.38, 8),
    materials.gold,
    count,
  );
  const bases = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.62, 0.74, 0.42, 8),
    materials.ivoryBright,
    count,
  );
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const one = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    matrix.compose(new THREE.Vector3(x, baseY + springHeight / 2, z), quaternion, one);
    columns.setMatrixAt(i, matrix);
    matrix.compose(
      new THREE.Vector3(x, baseY + springHeight + 0.05, z),
      quaternion,
      one,
    );
    capitals.setMatrixAt(i, matrix);
    matrix.compose(new THREE.Vector3(x, baseY + 0.12, z), quaternion, one);
    bases.setMatrixAt(i, matrix);
  }
  columns.instanceMatrix.needsUpdate = true;
  capitals.instanceMatrix.needsUpdate = true;
  bases.instanceMatrix.needsUpdate = true;
  columns.castShadow = true;
  capitals.castShadow = true;
  bases.castShadow = true;
  parent.add(columns, capitals, bases);

  for (let i = 0; i < count; i += 1) {
    const start = (i / count) * Math.PI * 2;
    const end = ((i + 1) / count) * Math.PI * 2;
    const middle = (start + end) / 2;
    const group = new THREE.Group();
    group.position.set(
      Math.sin(middle) * radius * Math.cos(Math.PI / count),
      baseY + springHeight,
      Math.cos(middle) * radius * Math.cos(Math.PI / count),
    );
    group.rotation.y = middle;
    const arch = makeMesh(
      new THREE.TorusGeometry(archRadius, tube, 6, 20, Math.PI),
      materials.ivory,
    );
    group.add(arch);
    const keystone = makeMesh(new THREE.OctahedronGeometry(0.42, 0), materials.gold);
    keystone.position.set(0, archRadius, 0);
    group.add(keystone);
    parent.add(group);
  }

  const entablature = new THREE.Group();
  entablature.position.y = baseY + springHeight + archRadius;
  const crown = makeMesh(
    new THREE.RingGeometry(radius + 0.18, radius + 1.15, 64),
    materials.ivoryBright,
  );
  crown.rotation.x = -Math.PI / 2;
  crown.receiveShadow = true;
  entablature.add(crown);
  entablature.add(ring(radius + 0.22, 0.2, materials.gold, 0.05));
  entablature.add(ring(radius + 1.08, 0.16, materials.gold, 0.02));
  parent.add(entablature);
}

function addBalustrade(
  parent: THREE.Group,
  radius: number,
  count: number,
  y: number,
  height = 0.85,
): void {
  const posts = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.1, 0.16, height, 6),
    materials.ivoryBright,
    count,
  );
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const one = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    matrix.compose(
      new THREE.Vector3(Math.sin(angle) * radius, y + height / 2, Math.cos(angle) * radius),
      quaternion,
      one,
    );
    posts.setMatrixAt(i, matrix);
  }
  posts.instanceMatrix.needsUpdate = true;
  posts.castShadow = true;
  parent.add(posts);
  const rail = ring(radius, 0.15, materials.ivoryBright, y + height);
  parent.add(rail);
  parent.add(ring(radius, 0.055, materials.gold, y + height + 0.12));
}

function addSpireRibs(
  parent: THREE.Group,
  radius: number,
  topRadius: number,
  baseY: number,
  height: number,
  count: number,
): void {
  const side = Math.hypot(radius - topRadius, height);
  const angleY = Math.atan2(height, radius - topRadius);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const rib = makeMesh(
      new THREE.CylinderGeometry(0.055, 0.09, side, 5),
      materials.gold,
    );
    rib.position.set(
      Math.sin(angle) * (radius + topRadius) * 0.5,
      baseY + height * 0.5,
      Math.cos(angle) * (radius + topRadius) * 0.5,
    );
    rib.rotation.z = angleY;
    rib.rotation.y = angle;
    parent.add(rib);
  }
}

function addFlyingButtresses(parent: THREE.Group, count: number): void {
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + Math.PI / count;
    const outer = new THREE.Vector3(Math.sin(angle) * 16.2, 30.8, Math.cos(angle) * 16.2);
    const control = new THREE.Vector3(Math.sin(angle) * 12.8, 43.2, Math.cos(angle) * 12.8);
    const inner = new THREE.Vector3(Math.sin(angle) * 8.1, 48.2, Math.cos(angle) * 8.1);
    const curve = new THREE.QuadraticBezierCurve3(outer, control, inner);
    const buttress = makeMesh(
      new THREE.TubeGeometry(curve, 20, 0.34, 6, false),
      materials.ivoryBright,
    );
    parent.add(buttress);
    const trim = makeMesh(
      new THREE.TubeGeometry(curve, 20, 0.1, 5, false),
      materials.gold,
    );
    trim.position.y = 0.18;
    parent.add(trim);
    const finial = new THREE.Group();
    finial.position.set(Math.sin(angle) * 16.4, 30.9, Math.cos(angle) * 16.4);
    const pedestal = cylinder(1.15, 1.5, 1.1, 8, materials.ivoryBright, 0.55);
    const needle = cylinder(0.2, 1.0, 6.2, 8, materials.ivory, 3.5);
    const tip = makeMesh(new THREE.ConeGeometry(0.85, 3.8, 8), materials.ivoryBright);
    tip.position.y = 8.2;
    const jewel = makeMesh(new THREE.OctahedronGeometry(0.38, 0), materials.goldBright);
    jewel.position.y = 10.2;
    finial.add(pedestal, needle, tip, jewel);
    parent.add(finial);
  }
}

function createMinorSpire(seed: number): THREE.Group {
  const random = mulberry32(seed);
  const group = new THREE.Group();
  const base = cylinder(3.4, 4.1, 2.3, 10, materials.ivoryShade, 1.15);
  group.add(base);
  group.add(ring(3.5, 0.17, materials.gold, 2.25));
  const drum = cylinder(2.2, 2.9, 11.5, 8, materials.ivory, 8.1);
  group.add(drum);
  addPointedWindows(group, 2.25, 4, 3.6, 0.9, 4.4, Math.PI / 4);
  const upper = cylinder(1.55, 2.1, 4.2, 8, materials.ivoryBright, 16);
  group.add(upper);
  group.add(ring(2.08, 0.15, materials.gold, 14.1));
  const roof = makeMesh(new THREE.ConeGeometry(2.12, 9, 8), materials.roofBlue);
  roof.position.y = 22.5;
  group.add(roof);
  addSpireRibs(group, 2.02, 0.12, 18, 8.8, 8);
  const finial = makeMesh(new THREE.CylinderGeometry(0.08, 0.08, 3.3, 6), materials.goldBright);
  finial.position.y = 28.6;
  group.add(finial);
  const orb = makeMesh(new THREE.SphereGeometry(0.34, 10, 8), materials.goldBright);
  orb.position.y = 30.3;
  group.add(orb);
  group.rotation.y = random() * Math.PI;
  return group;
}

function createArmillary(): { group: THREE.Group; update(time: number, delta: number): void } {
  const group = new THREE.Group();
  group.name = 'celestial-armillary';
  const orbiters: Array<{ object: THREE.Object3D; speed: number; axis: THREE.Vector3 }> = [];
  const glowTexture = createRadialTexture(256);
  const random = mulberry32(88013);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xffdb7c,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  halo.scale.set(38, 38, 1);
  group.add(halo);

  const rings: Array<{
    radius: number;
    tube: number;
    rotation: THREE.Euler;
    speed: number;
    material: THREE.Material;
    markers: number;
  }> = [
    {
      radius: 14.5,
      tube: 0.38,
      rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      speed: 0.035,
      material: materials.gold,
      markers: 12,
    },
    {
      radius: 12.7,
      tube: 0.27,
      rotation: new THREE.Euler(Math.PI / 2, 0.19, 0.12),
      speed: -0.053,
      material: materials.goldBright,
      markers: 8,
    },
    {
      radius: 13.4,
      tube: 0.3,
      rotation: new THREE.Euler(0.18, 0.1, 0.14),
      speed: 0.043,
      material: materials.gold,
      markers: 6,
    },
    {
      radius: 12.2,
      tube: 0.26,
      rotation: new THREE.Euler(0.24, Math.PI / 2, 0.32),
      speed: -0.059,
      material: materials.goldBright,
      markers: 6,
    },
    {
      radius: 10.4,
      tube: 0.22,
      rotation: new THREE.Euler(0.58, 0.6, Math.PI / 3),
      speed: 0.071,
      material: materials.gold,
      markers: 5,
    },
  ];

  rings.forEach((spec, index) => {
    const ringGroup = new THREE.Group();
    ringGroup.rotation.copy(spec.rotation);
    const torus = makeMesh(
      new THREE.TorusGeometry(spec.radius, spec.tube, 8, 128),
      spec.material,
    );
    ringGroup.add(torus);
    for (let marker = 0; marker < spec.markers; marker += 1) {
      const angle = (marker / spec.markers) * Math.PI * 2;
      const jewel = makeMesh(
        new THREE.OctahedronGeometry(index === 0 ? 0.52 : 0.31, 0),
        materials.goldBright,
      );
      jewel.position.set(
        Math.cos(angle) * spec.radius,
        Math.sin(angle) * spec.radius,
        0,
      );
      jewel.rotation.z = angle;
      ringGroup.add(jewel);
    }
    if (index === 0) {
      const innerBand = makeMesh(
        new THREE.TorusGeometry(11.9, 0.5, 7, 128),
        materials.goldDark,
      );
      innerBand.rotation.copy(spec.rotation);
      ringGroup.add(innerBand);
    }
    group.add(ringGroup);
    orbiters.push({
      object: ringGroup,
      speed: spec.speed,
      axis: new THREE.Vector3(
        0.25 + random() * 0.3,
        0.55 + random() * 0.4,
        0.15 + random() * 0.25,
      ).normalize(),
    });
  });

  const coreGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xffe9a4,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  coreGlow.scale.set(10, 10, 1);
  group.add(coreGlow);
  const core = makeMesh(new THREE.SphereGeometry(2.2, 24, 16), materials.goldBright);
  group.add(core);
  const innerCore = makeMesh(
    new THREE.IcosahedronGeometry(1.15, 1),
    new THREE.MeshBasicMaterial({ color: 0xfff5c5 }),
  );
  group.add(innerCore);
  const light = new THREE.PointLight(0xffd27a, 75, 90, 2);
  group.add(light);

  return {
    group,
    update(time, delta) {
      halo.material.rotation = time * 0.035;
      coreGlow.scale.setScalar(9 + Math.sin(time * 1.3) * 0.9);
      core.rotation.y += delta * 0.22;
      innerCore.rotation.x += delta * 0.6;
      innerCore.rotation.y += delta * 0.4;
      orbiters.forEach((orbiter, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        orbiter.object.rotateOnAxis(orbiter.axis, delta * orbiter.speed * direction);
      });
    },
  };
}

export function createPavilion(seed: number, scale = 1): THREE.Group {
  const random = mulberry32(seed);
  const group = new THREE.Group();
  const base = makeMesh(new THREE.BoxGeometry(5.9, 0.75, 4.7), materials.ivoryShade);
  base.position.y = 0.37;
  group.add(base);
  for (let i = 0; i < 4; i += 1) {
    const column = makeMesh(
      new THREE.CylinderGeometry(0.22, 0.3, 3.1, 7),
      materials.ivoryBright,
    );
    column.position.set(
      (i % 2 === 0 ? -1 : 1) * 2.2,
      2.25,
      (i < 2 ? -1 : 1) * 1.6,
    );
    group.add(column);
  }
  const shrine = makeMesh(
    new THREE.CylinderGeometry(1.35, 1.7, 2.8, 6),
    materials.ivory,
  );
  shrine.position.y = 2.25;
  group.add(shrine);
  const crown = cylinder(1.9, 2.35, 0.42, 8, materials.ivoryBright, 3.85);
  group.add(crown);
  const roof = makeMesh(new THREE.ConeGeometry(2.1, 4.9, 8), materials.roofBlue);
  roof.position.y = 6.5;
  group.add(roof);
  const roofTrim = ring(1.35, 0.09, materials.gold, 4.35);
  group.add(roofTrim);
  const finial = makeMesh(new THREE.CylinderGeometry(0.06, 0.06, 2.5, 6), materials.goldBright);
  finial.position.y = 9.6;
  group.add(finial);
  const jewel = makeMesh(new THREE.OctahedronGeometry(0.26, 0), materials.goldBright);
  jewel.position.y = 10.9;
  group.add(jewel);
  addPointedWindows(group, 1.8, 3, 1.4, 0.58, 1.9, Math.PI / 3);
  group.scale.setScalar(scale);
  group.rotation.y = random() * Math.PI * 2;
  return group;
}

export function createRuinedSpire(seed: number, scale = 1): THREE.Group {
  const group = new THREE.Group();
  const random = mulberry32(seed);
  const plinth = cylinder(3.2, 4.0, 1.2, 10, materials.ivoryShade, 0.6);
  group.add(plinth);
  const lower = cylinder(2.1, 2.9, 8.5, 8, materials.ivory, 4.85);
  group.add(lower);
  const broken = makeMesh(
    new THREE.CylinderGeometry(1.5, 1.95, 4.5, 7, 1, false),
    materials.ivory,
  );
  broken.position.y = 11.3;
  broken.rotation.z = 0.08;
  group.add(broken);
  for (let i = 0; i < 4; i += 1) {
    const tooth = makeMesh(
      new THREE.ConeGeometry(0.5, 1.4 + random() * 2.4, 5),
      materials.ivoryShade,
    );
    const angle = (i / 4) * Math.PI * 2;
    tooth.position.set(
      Math.sin(angle) * 1.45,
      14.6 + random() * 1.1,
      Math.cos(angle) * 1.45,
    );
    tooth.rotation.z = (random() - 0.5) * 0.2;
    group.add(tooth);
  }
  for (let i = 0; i < 3; i += 1) {
    const column = makeMesh(
      new THREE.CylinderGeometry(0.22, 0.28, 2 + random() * 2.2, 6),
      materials.ivoryBright,
    );
    const angle = random() * Math.PI * 2;
    column.position.set(Math.sin(angle) * 3.8, 1.45, Math.cos(angle) * 3.8);
    column.rotation.z = (random() - 0.5) * 0.25;
    group.add(column);
  }
  group.scale.setScalar(scale);
  group.rotation.y = random() * Math.PI * 2;
  return group;
}

function createSanctumBase(parent: THREE.Group): void {
  const stepRadii = [24.5, 23.2, 21.8, 20.4];
  stepRadii.forEach((radius, index) => {
    const mesh = cylinder(radius, radius + 0.7, 0.72, 16, index % 2 === 0 ? materials.ivory : materials.ivoryShade, 0.36 + index * 0.62);
    parent.add(mesh);
    const trim = ring(radius + 0.06, 0.12, materials.gold, 0.74 + index * 0.62);
    parent.add(trim);
  });
  const platform = cylinder(19.3, 20.1, 2.2, 16, materials.ivoryBright, 3.14);
  parent.add(platform);
  parent.add(ring(19.5, 0.22, materials.gold, 4.25));

  const avenue = new THREE.Group();
  avenue.rotation.y = 0.63;
  for (let i = 0; i < 9; i += 1) {
    const step = makeMesh(
      new THREE.BoxGeometry(8.4 - i * 0.12, 0.44, 1.15),
      i % 2 === 0 ? materials.ivory : materials.ivoryShade,
    );
    step.position.set(0, 1.86 - i * 0.2, 20.6 + i * 1.02);
    avenue.add(step);
  }
  const avenueTrim = makeMesh(
    new THREE.BoxGeometry(0.12, 0.47, 9.2),
    materials.gold,
  );
  avenueTrim.position.set(4.25, 1.24, 25.2);
  avenue.add(avenueTrim);
  const avenueTrimOther = avenueTrim.clone();
  avenueTrimOther.position.x = -4.25;
  avenue.add(avenueTrimOther);
  parent.add(avenue);
}

export function createSanctum(): Sanctum {
  const parent = new THREE.Group();
  parent.name = 'sanctum-of-celestia';
  createSanctumBase(parent);

  const lowerHall = new THREE.Group();
  lowerHall.position.y = 4.25;
  lowerHall.add(cylinder(12.6, 13.1, 27.6, 16, materials.ivory, 13.8));
  lowerHall.add(ring(12.72, 0.24, materials.gold, 0.45));
  lowerHall.add(ring(12.55, 0.2, materials.gold, 26.9));
  addPointedWindows(lowerHall, 13.18, 8, 8.2, 2.2, 8.7, 0.35);

  for (let i = 0; i < 16; i += 1) {
    const angle = (i / 16) * Math.PI * 2 + Math.PI / 16;
    const pilaster = makeMesh(
      new THREE.BoxGeometry(0.56, 24.5, 0.7),
      i % 4 === 0 ? materials.ivoryBright : materials.ivoryShade,
    );
    pilaster.position.set(Math.sin(angle) * 12.9, 13.4, Math.cos(angle) * 12.9);
    pilaster.rotation.y = angle;
    lowerHall.add(pilaster);
  }
  const door = createPointedArch({
    width: 5.1,
    height: 12.8,
    frameWidth: 0.52,
    panelMaterial: materials.windowWarm,
  });
  door.position.set(Math.sin(0.63) * 13.14, 2.4, Math.cos(0.63) * 13.14);
  door.rotation.y = 0.63;
  lowerHall.add(door);
  parent.add(lowerHall);

  addArcade(parent, 18.25, 14, 4.25, 8.7, 0.31);
  addFlyingButtresses(parent, 8);

  const secondTier = new THREE.Group();
  secondTier.position.y = 32.1;
  const terrace = cylinder(15.2, 16.3, 1.65, 16, materials.ivoryBright, 0.82);
  secondTier.add(terrace);
  secondTier.add(ring(15.65, 0.27, materials.gold, 1.65));
  addBalustrade(secondTier, 15.2, 36, 1.7, 0.88);
  secondTier.add(cylinder(8.5, 9.3, 20.1, 12, materials.ivory, 11.55));
  secondTier.add(ring(9.2, 0.22, materials.gold, 0.4));
  secondTier.add(ring(8.52, 0.19, materials.gold, 19.7));
  addPointedWindows(secondTier, 9.28, 8, 5.3, 1.55, 8.1, 0.22);
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const rib = makeMesh(new THREE.BoxGeometry(0.33, 19.1, 0.46), materials.ivoryBright);
    rib.position.set(Math.sin(angle) * 9.34, 10.5, Math.cos(angle) * 9.34);
    rib.rotation.y = angle;
    secondTier.add(rib);
  }
  parent.add(secondTier);

  for (let i = 0; i < 4; i += 1) {
    const angle = (i / 4) * Math.PI * 2 + 0.62;
    const spire = createMinorSpire(640 + i * 87);
    spire.position.set(Math.sin(angle) * 20.6, 4.2, Math.cos(angle) * 20.6);
    spire.scale.set(
      i === 0 ? 1.12 : 0.9 + (i % 2) * 0.08,
      i === 0 ? 1.55 : 1.35 + (i % 2) * 0.08,
      i === 0 ? 1.12 : 0.9 + (i % 2) * 0.08,
    );
    parent.add(spire);
  }

  const upperTier = new THREE.Group();
  upperTier.position.y = 53.4;
  upperTier.add(cylinder(10.4, 11.6, 1.3, 12, materials.ivoryBright, 0.65));
  upperTier.add(ring(11.1, 0.24, materials.gold, 1.3));
  addBalustrade(upperTier, 10.25, 28, 1.34, 0.72);
  upperTier.add(cylinder(5.4, 6.5, 16.7, 10, materials.ivory, 10.1));
  upperTier.add(ring(6.42, 0.19, materials.gold, 0.3));
  addPointedWindows(upperTier, 6.54, 6, 5.4, 1.25, 6.7, 0.3);
  parent.add(upperTier);

  const crown = new THREE.Group();
  crown.position.y = 71.7;
  crown.add(cylinder(7.9, 8.8, 1.25, 10, materials.ivoryBright, 0.62));
  crown.add(ring(8.45, 0.2, materials.gold, 1.2));
  const drum = cylinder(3.7, 4.5, 4.8, 10, materials.ivory, 3.35);
  crown.add(drum);
  addPointedWindows(crown, 4.53, 5, 1.55, 0.82, 2.75, 0.2);
  const spire = makeMesh(
    new THREE.LatheGeometry(
      [
        new THREE.Vector2(3.85, 0),
        new THREE.Vector2(3.62, 2.0),
        new THREE.Vector2(3.16, 4.4),
        new THREE.Vector2(2.56, 7.6),
        new THREE.Vector2(1.95, 11.4),
        new THREE.Vector2(1.34, 15.6),
        new THREE.Vector2(0.78, 20.2),
        new THREE.Vector2(0.34, 24.7),
        new THREE.Vector2(0.08, 27.2),
        new THREE.Vector2(0, 28.0),
      ],
      10,
    ),
    materials.ivoryBright,
  );
  spire.position.y = 5.75;
  crown.add(spire);
  addSpireRibs(crown, 3.8, 0.08, 5.8, 27.7, 10);
  const spireTrim = ring(3.08, 0.1, materials.gold, 9.3);
  crown.add(spireTrim);
  const spireTrimUpper = ring(1.46, 0.08, materials.gold, 21.2);
  crown.add(spireTrimUpper);
  const crownTip = makeMesh(new THREE.OctahedronGeometry(0.72, 0), materials.goldBright);
  crownTip.position.y = 34.1;
  crown.add(crownTip);
  parent.add(crown);

  const armillary = createArmillary();
  armillary.group.position.y = 119.5;
  armillary.group.scale.setScalar(1.2);
  parent.add(armillary.group);

  const pedestal = new THREE.Group();
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const finial = new THREE.Group();
    const base = cylinder(0.55, 0.78, 0.55, 6, materials.ivoryShade, 0.28);
    const needle = cylinder(0.1, 0.37, 4.2, 6, materials.ivoryBright, 2.55);
    const tip = makeMesh(new THREE.ConeGeometry(0.35, 2.1, 6), materials.ivoryBright);
    tip.position.y = 5.35;
    const jewel = makeMesh(new THREE.OctahedronGeometry(0.18, 0), materials.goldBright);
    jewel.position.y = 6.55;
    finial.add(base, needle, tip, jewel);
    finial.position.set(Math.sin(angle) * 21.2, 4.1, Math.cos(angle) * 21.2);
    pedestal.add(finial);
  }
  parent.add(pedestal);

  const pavilionAngles = [1.15, 2.45, 4.18, 5.3, 0.1, 3.4];
  pavilionAngles.forEach((angle, index) => {
    const pavilion = createPavilion(8100 + index * 71, 0.7 + (index % 3) * 0.1);
    pavilion.position.set(Math.sin(angle) * 40.5, 0.15, Math.cos(angle) * 40.5);
    parent.add(pavilion);
  });

  const terracePath = makeMesh(
    new THREE.RingGeometry(28.2, 33.3, 96),
    materials.warmStone,
  );
  terracePath.rotation.x = -Math.PI / 2;
  terracePath.position.y = 0.32;
  terracePath.receiveShadow = true;
  terracePath.castShadow = false;
  parent.add(terracePath);

  parent.scale.set(1.06, 1.24, 1.06);
  armillary.group.scale.set(1.65, 1.75 / 1.24, 1.65);

  return {
    group: parent,
    update(time, delta) {
      armillary.update(time, delta);
    },
  };
}

export function createPlazaArch(seed: number): THREE.Group {
  const random = mulberry32(seed);
  const group = new THREE.Group();
  for (let side = -1; side <= 1; side += 2) {
    const pedestal = makeMesh(new THREE.BoxGeometry(1.15, 1.5, 1.25), materials.ivoryShade);
    pedestal.position.set(side * 2.2, 0.75, 0);
    const column = makeMesh(
      new THREE.CylinderGeometry(0.36, 0.48, 5.8, 8),
      materials.ivoryBright,
    );
    column.position.set(side * 2.2, 4.4, 0);
    const capital = makeMesh(new THREE.BoxGeometry(1.2, 0.45, 1.2), materials.gold);
    capital.position.set(side * 2.2, 7.5, 0);
    group.add(pedestal, column, capital);
  }
  const arch = makeMesh(
    new THREE.TorusGeometry(2.2, 0.32, 7, 26, Math.PI),
    materials.ivoryBright,
  );
  arch.position.y = 7.7;
  group.add(arch);
  const gem = makeMesh(new THREE.OctahedronGeometry(0.35, 0), materials.goldBright);
  gem.position.y = 10.0;
  group.add(gem);
  group.rotation.y = random() * Math.PI * 2;
  return group;
}
