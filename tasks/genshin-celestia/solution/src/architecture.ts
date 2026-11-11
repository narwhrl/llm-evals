import * as THREE from 'three';
import { box, cylinder, mesh, palette, pointedRoof, seededRandom } from './palette';
import type { Island } from './terrain';

const columnGeometry = new THREE.CylinderGeometry(0.32, 0.39, 1, 8);

function column(parent: THREE.Object3D, x: number, y: number, z: number, height: number, radius = 1): void {
  const shaft = mesh(columnGeometry, palette.white);
  shaft.position.set(x, y + height / 2, z);
  shaft.scale.set(radius, height, radius);
  parent.add(shaft);
  box(parent, new THREE.Vector3(0.98 * radius, 0.34, 0.98 * radius), new THREE.Vector3(x, y + 0.17, z));
  box(parent, new THREE.Vector3(0.86 * radius, 0.42, 0.86 * radius), new THREE.Vector3(x, y + height - 0.21, z), palette.paleGold);
}

function archPanel(parent: THREE.Object3D, width: number, height: number, depth: number, x: number, y: number, z: number, rotation = 0): void {
  const group = new THREE.Group();
  const openingRadius = width * 0.39;
  const archBase = height * 0.59;
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(width / 2, 0);
  shape.lineTo(width / 2, height);
  shape.lineTo(-width / 2, height);
  shape.closePath();
  const opening = new THREE.Path();
  opening.moveTo(-openingRadius, 0.015);
  opening.lineTo(-openingRadius, archBase);
  opening.absarc(0, archBase, openingRadius, Math.PI, 0, true);
  opening.lineTo(openingRadius, 0.015);
  opening.closePath();
  shape.holes.push(opening);
  const body = mesh(new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 12 }), palette.ivory);
  body.position.z = -depth / 2;
  group.add(body);
  const trim = mesh(new THREE.TorusGeometry(openingRadius, 0.16, 5, 24, Math.PI), palette.paleGold);
  trim.position.set(0, archBase, depth / 2 + 0.025);
  group.add(trim);
  for (const side of [-1, 1]) {
    box(group, new THREE.Vector3(0.25, archBase, 0.19), new THREE.Vector3(side * openingRadius, archBase / 2, depth / 2 + 0.04), palette.paleGold);
  }
  box(group, new THREE.Vector3(width + 0.35, 0.3, depth + 0.3), new THREE.Vector3(0, height, 0), palette.paleGold);
  group.position.set(x, y, z);
  group.rotation.y = rotation;
  parent.add(group);
}

function arcade(parent: THREE.Object3D, radius: number, y: number, height: number, count: number, depth = 1.15): void {
  const side = 2 * radius * Math.tan(Math.PI / count);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    archPanel(parent, side * 1.04, height, depth, Math.sin(angle) * radius, y, Math.cos(angle) * radius, angle);
  }
}

function ring(parent: THREE.Object3D, radius: number, y: number, thickness: number, material: THREE.Material): void {
  const torus = mesh(new THREE.TorusGeometry(radius, thickness, 6, 64), material);
  torus.rotation.x = Math.PI / 2;
  torus.position.y = y;
  parent.add(torus);
}

function buttress(parent: THREE.Object3D, angle: number, radius: number, y: number, height: number): void {
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  column(parent, x, y, z, height, 1.3);
  const cap = pointedRoof(parent, 0.83, 3.2, y + height, x, z);
  cap.scale.setScalar(0.8);
}

function createSanctum(scene: THREE.Scene): void {
  const temple = new THREE.Group();
  temple.name = 'The Ivory Sanctum';
  cylinder(temple, 23, 1.6, 1.1, palette.ivory, 64);
  cylinder(temple, 20.5, 1.5, 2.65, palette.white, 64);
  ring(temple, 21.2, 3.2, 0.22, palette.gold);
  cylinder(temple, 16, 2.4, 4.6, palette.ivory, 16);
  arcade(temple, 14.5, 5.8, 9.2, 16, 1.5);
  cylinder(temple, 12.9, 10, 10.3, palette.shade, 16);
  cylinder(temple, 16.3, 1.15, 15.4, palette.white, 32);
  ring(temple, 16.1, 16.05, 0.23, palette.gold);
  arcade(temple, 11.1, 16, 11.2, 12, 1.25);
  cylinder(temple, 9.6, 12, 21.3, palette.shade, 12);
  cylinder(temple, 12.4, 1.1, 27.5, palette.white, 32);
  cylinder(temple, 10.2, 1.1, 28.65, palette.ivory, 16);
  ring(temple, 12, 28, 0.2, palette.gold);
  arcade(temple, 7.9, 29.1, 10.4, 8, 1.1);
  cylinder(temple, 6.2, 11, 34.1, palette.shade, 8);
  cylinder(temple, 9.2, 1.15, 39.7, palette.white, 16);
  ring(temple, 9, 40.35, 0.2, palette.gold);
  arcade(temple, 5.35, 40.3, 10.4, 8, 0.9);
  cylinder(temple, 4.05, 11, 45.4, palette.shade, 8);
  cylinder(temple, 6.5, 0.9, 51.2, palette.white, 16);
  cylinder(temple, 4.8, 2, 52.4, palette.ivory, 8);
  pointedRoof(temple, 5.5, 18, 53.3);
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    buttress(temple, angle, 15.9, 5.5, 11.1);
    buttress(temple, angle, 11.8, 17.2, 10.8);
    if (i % 2 === 0) buttress(temple, angle, 8.8, 30, 9.3);
  }
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    column(temple, Math.sin(angle) * 20.6, 3.35, Math.cos(angle) * 20.6, 4, 0.75);
    pointedRoof(temple, 0.58, 2.3, 7.35, Math.sin(angle) * 20.6, Math.cos(angle) * 20.6);
  }
  const ceremonialStair = new THREE.Group();
  for (let i = 0; i < 13; i++) {
    box(ceremonialStair, new THREE.Vector3(10.5, 0.32, 1.1), new THREE.Vector3(0, 0.16 + i * 0.36, 25.8 - i * 0.83));
  }
  temple.add(ceremonialStair);
  temple.scale.y = 1.36;
  scene.add(temple);
  createArmillary(scene);
}

function createArmillary(scene: THREE.Scene): void {
  const armillary = new THREE.Group();
  armillary.name = 'Celestial Armillary';
  armillary.position.y = 109;
  const radii = [13.2, 11.7, 10.4, 9.2];
  radii.forEach((radius, i) => {
    const ringGroup = new THREE.Group();
    const greatRing = mesh(new THREE.TorusGeometry(radius, i === 0 ? 0.42 : 0.26, 10, 128), palette.gold);
    ringGroup.add(greatRing);
    const innerTrace = mesh(new THREE.TorusGeometry(radius - 0.57, 0.095, 6, 128), palette.paleGold);
    ringGroup.add(innerTrace);
    for (let j = 0; j < 12; j++) {
      const a = (j / 12) * Math.PI * 2;
      const stud = mesh(new THREE.SphereGeometry(0.39, 8, 6), palette.paleGold);
      stud.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
      ringGroup.add(stud);
    }
    ringGroup.rotation.set(i * 0.66, i * 0.92, i * 0.4);
    armillary.add(ringGroup);
  });
  const meridian = mesh(new THREE.TorusGeometry(14.2, 0.21, 8, 128), palette.paleGold);
  meridian.rotation.y = Math.PI / 2;
  armillary.add(meridian);
  const axis = mesh(new THREE.CylinderGeometry(0.18, 0.18, 35, 8), palette.gold);
  axis.rotation.z = -0.3;
  armillary.add(axis);
  const star = mesh(new THREE.OctahedronGeometry(1.4, 0), new THREE.MeshStandardMaterial({ color: '#ffe6a0', emissive: '#e6b75b', emissiveIntensity: 0.85, metalness: 0.5, roughness: 0.3 }));
  armillary.add(star);
  const lowerOrbit = mesh(new THREE.TorusGeometry(6.1, 0.24, 8, 72), palette.gold);
  lowerOrbit.rotation.x = Math.PI / 2;
  lowerOrbit.position.y = -16;
  armillary.add(lowerOrbit);
  scene.add(armillary);
}

function createSatellite(island: Island, index: number): THREE.Group {
  const group = new THREE.Group();
  group.position.set(island.x, island.y + 0.45, island.z);
  const scale = index % 3 === 0 ? 1.15 : 0.9;
  cylinder(group, island.radius * 0.73, 0.85, 0.42, palette.ivory, 48);
  ring(group, island.radius * 0.74, 0.85, 0.13, palette.paleGold);
  arcade(group, island.radius * 0.59, 0.9, 4.3, 12, 0.8);
  cylinder(group, island.radius * 0.62, 0.65, 5.4, palette.white, 24);
  const radius = island.radius * 0.34;
  cylinder(group, radius * 1.25, 1.2, 6.2, palette.ivory, 12);
  arcade(group, radius, 6.8, 8.5 * scale, 8, 0.85);
  cylinder(group, radius * 0.7, 9 * scale, 11 * scale, palette.shade, 8);
  cylinder(group, radius * 1.2, 0.75, 15.4 * scale, palette.white, 16);
  arcade(group, radius * 0.67, 15.8 * scale, 6.7 * scale, 8, 0.7);
  cylinder(group, radius * 0.82, 0.7, 22.7 * scale, palette.white, 12);
  pointedRoof(group, radius * 0.97, 11.5 * scale, 23 * scale);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const r = island.radius * 0.72;
    column(group, Math.sin(a) * r, 0.9, Math.cos(a) * r, 3.4, 0.75);
    pointedRoof(group, 0.6, 2.7, 4.3, Math.sin(a) * r, Math.cos(a) * r);
  }
  return group;
}

function smallChapel(x: number, z: number, rotation: number, scale = 1): THREE.Group {
  const chapel = new THREE.Group();
  box(chapel, new THREE.Vector3(8, 1, 12), new THREE.Vector3(0, 0.5, 0));
  box(chapel, new THREE.Vector3(6.5, 6, 9.5), new THREE.Vector3(0, 4, 0), palette.shade);
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) archPanel(chapel, 2.5, 6, 0.65, -2.6 + i * 2.6, 1, side * 4.8, side < 0 ? Math.PI : 0);
    for (let i = 0; i < 3; i++) archPanel(chapel, 3.2, 6, 0.65, side * 3.25, 1, -3.2 + i * 3.2, side * Math.PI / 2);
  }
  const roof = mesh(new THREE.ConeGeometry(8.1, 5.8, 4), palette.ivory);
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = 1.35;
  roof.position.y = 9.8;
  chapel.add(roof);
  pointedRoof(chapel, 1.7, 9, 6.8, 0, -2.4);
  chapel.position.set(x, 0.5, z);
  chapel.rotation.y = rotation;
  chapel.scale.setScalar(scale);
  return chapel;
}

function bridgeBetween(a: Island, b: Island): THREE.Group {
  const bridge = new THREE.Group();
  const delta = new THREE.Vector3(b.x - a.x, 0, b.z - a.z);
  const length = delta.length();
  const direction = delta.clone().normalize();
  const start = new THREE.Vector3(a.x, a.y + 1.1, a.z).addScaledVector(direction, a.radius * 0.72);
  const end = new THREE.Vector3(b.x, b.y + 1.1, b.z).addScaledVector(direction, -b.radius * 0.72);
  const span = start.distanceTo(end);
  const angle = Math.atan2(direction.x, direction.z);
  const count = Math.max(3, Math.round(span / 8.5));
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const point = start.clone().lerp(end, t);
    point.y += Math.sin(t * Math.PI) * 7;
    const nextT = Math.min(1, t + 0.5 / count);
    const next = start.clone().lerp(end, nextT);
    next.y += Math.sin(nextT * Math.PI) * 7;
    const slope = Math.atan2(next.y - point.y, span / count / 2);
    const arch = new THREE.Group();
    archPanel(arch, span / count + 0.22, 7.4, 4.8, 0, -6.8, 0, Math.PI / 2);
    box(arch, new THREE.Vector3(5.3, 0.7, span / count + 0.25), new THREE.Vector3(0, 0.58, 0), palette.white);
    for (const side of [-1, 1]) {
      box(arch, new THREE.Vector3(0.3, 1.1, span / count + 0.25), new THREE.Vector3(side * 2.48, 1.28, 0), palette.ivory);
      for (const offset of [-0.34, 0.34]) {
        column(arch, side * 2.48, 0.9, offset * span / count, 2.8, 0.52);
        const finial = mesh(new THREE.ConeGeometry(0.35, 1.1, 4), palette.paleGold);
        finial.position.set(side * 2.48, 4.15, offset * span / count);
        arch.add(finial);
      }
    }
    arch.position.copy(point);
    arch.rotation.set(-slope, angle, 0);
    bridge.add(arch);
  }
  return bridge;
}

function radialBridge(angle: number): THREE.Group {
  const bridge = new THREE.Group();
  const count = 8;
  for (let i = 0; i < count; i++) {
    const r = 27 + i * 7.5;
    const y = 1.4 + Math.sin((i / (count - 1)) * Math.PI) * 3;
    const piece = new THREE.Group();
    archPanel(piece, 7.6, 6.7, 5.6, 0, -6.1, 0, Math.PI / 2);
    box(piece, new THREE.Vector3(6.1, 0.65, 7.7), new THREE.Vector3(0, 0.7, 0), palette.white);
    for (const side of [-1, 1]) box(piece, new THREE.Vector3(0.35, 1, 7.7), new THREE.Vector3(side * 2.85, 1.4, 0));
    piece.position.set(Math.sin(angle) * r, y, Math.cos(angle) * r);
    piece.rotation.y = angle;
    bridge.add(piece);
  }
  return bridge;
}

function ruins(parent: THREE.Object3D, island: Island, index: number): void {
  const random = seededRandom(index * 101 + 67);
  const group = new THREE.Group();
  group.position.set(island.x, island.y - island.depth * 0.51, island.z);
  const radius = island.radius * 0.55;
  cylinder(group, radius * 0.85, 0.8, 0, palette.ruin, 16);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const height = 3 + random() * 7;
    column(group, Math.sin(a) * radius, 0.4, Math.cos(a) * radius, height, 0.8);
    if (i % 3 === 0) archPanel(group, 4, 6.8, 0.8, Math.sin(a) * radius, 0.5, Math.cos(a) * radius, a);
  }
  parent.add(group);
  const broken = new THREE.Group();
  const bx = island.x + island.radius * 0.8;
  const bz = island.z + island.radius * 0.2;
  box(broken, new THREE.Vector3(3.5, 2, 3.5), new THREE.Vector3(bx, island.y + 1, bz));
  column(broken, bx, island.y + 2, bz, 8, 1.5);
  pointedRoof(broken, 1.3, 5.5, island.y + 10, bx, bz);
  parent.add(broken);
}

export function createArchitecture(scene: THREE.Scene, islands: Island[]): void {
  createSanctum(scene);
  islands.forEach((island, index) => {
    scene.add(createSatellite(island, index));
    scene.add(bridgeBetween(island, islands[(index + 1) % islands.length]));
    ruins(scene, island, index);
  });
  scene.add(radialBridge(0.78));
  scene.add(radialBridge(3.75));
  scene.add(smallChapel(-31, 20, -0.3, 0.85));
  scene.add(smallChapel(26, -25, 0.75, 0.95));
  scene.add(smallChapel(30, 22, -0.75, 0.7));
  scene.add(smallChapel(-27, -26, 0.3, 0.78));
  const terrace = new THREE.Group();
  const terraceRing = mesh(new THREE.RingGeometry(37, 43, 96), palette.ivory);
  terraceRing.rotation.x = -Math.PI / 2;
  terraceRing.position.y = 0.7;
  terrace.add(terraceRing);
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    if (Math.abs(Math.sin(a - 0.78)) < 0.12 || Math.abs(Math.sin(a - 3.75)) < 0.12) continue;
    column(terrace, Math.sin(a) * 41.5, 0.8, Math.cos(a) * 41.5, 3.8, 0.6);
    pointedRoof(terrace, 0.43, 1.8, 4.6, Math.sin(a) * 41.5, Math.cos(a) * 41.5);
  }
  scene.add(terrace);
}
