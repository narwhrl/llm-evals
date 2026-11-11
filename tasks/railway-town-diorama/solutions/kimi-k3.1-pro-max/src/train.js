import * as THREE from 'three';
import { box, cylinder, sphere, beam, glowMaterial } from './models.js';

export class Railway {
  constructor(parent) {
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10.1, 0.86, 4.8),
      new THREE.Vector3(-5.5, 0.86, 5.55),
      new THREE.Vector3(0.0, 0.86, 5.75),
      new THREE.Vector3(5.8, 0.86, 5.35),
      new THREE.Vector3(10.2, 0.86, 3.3),
      new THREE.Vector3(10.6, 0.86, -1.5),
      new THREE.Vector3(8.4, 0.86, -5.4),
      new THREE.Vector3(3.0, 0.86, -6.05),
      new THREE.Vector3(-3.5, 0.86, -6.05),
      new THREE.Vector3(-8.8, 0.86, -4.6),
      new THREE.Vector3(-10.6, 0.86, -0.2),
    ], true, 'catmullrom', 0.35);
    this.length = this.curve.getLength();
    this.stationDistance = this.findStationDistance();
    this.distance = (this.stationDistance + this.length - 7.0) % this.length;
    this.speed = 1;
    this.running = true;
    this.dwell = 0;
    this.justReset = false;
    this.buildTrack(parent);
    this.units = [this.createLocomotive(parent), this.createCoach(parent, '#d9b26c'), this.createCoach(parent, '#b86c4e')];
    this.update(0);
  }

  findStationDistance() {
    let closest = 0;
    let distance = Infinity;
    for (let index = 0; index <= 1200; index++) {
      const point = this.curve.getPointAt(index / 1200);
      const current = point.distanceTo(new THREE.Vector3(-3.1, 0.86, 5.65));
      if (current < distance) { closest = index / 1200; distance = current; }
    }
    return closest * this.length;
  }

  poseAt(distance) {
    const u = ((distance % this.length) + this.length) % this.length / this.length;
    return { point: this.curve.getPointAt(u), tangent: this.curve.getTangentAt(u).normalize() };
  }

  buildTrack(parent) {
    const track = new THREE.Group();
    parent.add(track);
    const count = 260;
    const railMaterial = new THREE.MeshStandardMaterial({ color: '#8b9288', metalness: 0.72, roughness: 0.42 });
    for (const offset of [-0.29, 0.29]) {
      const points = [];
      for (let index = 0; index < count; index++) {
        const u = index / count;
        const point = this.curve.getPointAt(u);
        const tangent = this.curve.getTangentAt(u);
        points.push(new THREE.Vector3(point.x - tangent.z * offset, point.y + 0.115, point.z + tangent.x * offset));
      }
      const railCurve = new THREE.CatmullRomCurve3(points, true);
      const rail = new THREE.Mesh(new THREE.TubeGeometry(railCurve, 500, 0.036, 5, true), railMaterial);
      rail.castShadow = true;
      track.add(rail);
    }
    const tieGeometry = new THREE.BoxGeometry(0.16, 0.085, 0.87);
    const ties = new THREE.InstancedMesh(tieGeometry, new THREE.MeshStandardMaterial({ color: '#675540', roughness: 1 }), 205);
    ties.castShadow = true;
    ties.receiveShadow = true;
    const transform = new THREE.Object3D();
    for (let index = 0; index < 205; index++) {
      const u = index / 205;
      const point = this.curve.getPointAt(u);
      const tangent = this.curve.getTangentAt(u);
      transform.position.set(point.x, point.y + 0.055, point.z);
      transform.rotation.set(0, Math.atan2(tangent.x, tangent.z), 0);
      transform.updateMatrix();
      ties.setMatrixAt(index, transform.matrix);
    }
    track.add(ties);
    const ballastMaterial = new THREE.MeshStandardMaterial({ color: '#a9a38d', roughness: 1, side: THREE.DoubleSide });
    const positions = [];
    const indices = [];
    for (let index = 0; index <= count; index++) {
      const u = index / count;
      const point = this.curve.getPointAt(u);
      const tangent = this.curve.getTangentAt(u);
      for (const side of [-1, 1]) positions.push(point.x - tangent.z * 0.53 * side, 0.702, point.z + tangent.x * 0.53 * side);
      if (index < count) {
        const base = index * 2;
        indices.push(base, base + 2, base + 1, base + 1, base + 2, base + 3);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const ballast = new THREE.Mesh(geometry, ballastMaterial);
    ballast.receiveShadow = true;
    track.add(ballast);
  }

  wheels(group, length) {
    for (const x of [-0.33, 0.33]) {
      for (const z of [-length * 0.31, length * 0.31]) {
        const wheel = cylinder(group, 0.16, 0.16, 0.08, '#303a35', x, 0.15, z, 14);
        wheel.rotation.z = Math.PI / 2;
        const hub = cylinder(group, 0.07, 0.07, 0.085, '#899084', x, 0.15, z, 10);
        hub.rotation.z = Math.PI / 2;
      }
    }
  }

  createLocomotive(parent) {
    const group = new THREE.Group();
    parent.add(group);
    box(group, 0.68, 0.14, 1.64, '#374d40', 0, 0.25, 0);
    this.wheels(group, 1.6);
    const boiler = cylinder(group, 0.27, 0.27, 0.86, '#355f50', 0, 0.57, 0.29, 18);
    boiler.rotation.x = Math.PI / 2;
    const front = cylinder(group, 0.23, 0.23, 0.04, '#2e4038', 0, 0.57, 0.74, 18);
    front.rotation.x = Math.PI / 2;
    box(group, 0.65, 0.65, 0.55, '#456e56', 0, 0.60, -0.47);
    box(group, 0.75, 0.08, 0.66, '#2e433a', 0, 0.97, -0.47);
    for (const side of [-1, 1]) {
      box(group, 0.02, 0.29, 0.29, '#edcf87', side * 0.334, 0.72, -0.43);
      box(group, 0.03, 0.31, 0.035, '#d9d1ad', side * 0.35, 0.72, -0.43);
      beam(group, [side * 0.32, 0.46, 0.6], [side * 0.32, 0.46, -0.1], 0.045, '#c9a566');
    }
    cylinder(group, 0.105, 0.14, 0.36, '#2f4238', 0, 0.96, 0.43, 12);
    cylinder(group, 0.16, 0.12, 0.08, '#2f4238', 0, 1.17, 0.43, 12);
    cylinder(group, 0.085, 0.09, 0.20, '#bc9c60', 0, 0.89, 0.02, 12);
    const light = sphere(group, 0.095, '#ffe2a0', 0, 0.63, 0.79, 12, 8);
    light.material = glowMaterial('#ffe2a0');
    box(group, 0.75, 0.10, 0.10, '#a6513c', 0, 0.29, 0.86);
    for (const side of [-1, 1]) cylinder(group, 0.055, 0.055, 0.10, '#333e37', side * 0.25, 0.29, 0.93, 8).rotation.x = Math.PI / 2;
    return group;
  }

  createCoach(parent, color) {
    const group = new THREE.Group();
    parent.add(group);
    box(group, 0.67, 0.13, 1.54, '#39483c', 0, 0.25, 0);
    this.wheels(group, 1.50);
    box(group, 0.68, 0.66, 1.43, color, 0, 0.61, 0);
    box(group, 0.77, 0.10, 1.58, '#49564a', 0, 0.99, 0);
    box(group, 0.70, 0.065, 1.46, '#e7d8ae', 0, 0.39, 0);
    for (const side of [-1, 1]) {
      for (const z of [-0.46, 0, 0.46]) {
        box(group, 0.025, 0.30, 0.31, '#f1d69c', side * 0.352, 0.72, z);
        box(group, 0.03, 0.31, 0.027, '#e9e0bd', side * 0.368, 0.72, z);
      }
    }
    box(group, 0.36, 0.32, 0.025, '#e7ce93', 0, 0.72, 0.73);
    return group;
  }

  update(delta) {
    if (this.running) {
      if (this.dwell > 0) {
        this.dwell = Math.max(0, this.dwell - delta);
      } else {
        const previous = this.distance;
        this.distance = (this.distance + delta * 1.55 * this.speed) % this.length;
        const crossed = previous <= this.stationDistance
          ? this.distance >= this.stationDistance
          : this.distance < previous && (this.stationDistance >= previous || this.stationDistance <= this.distance);
        if (crossed && !this.justReset) {
          this.distance = this.stationDistance;
          this.dwell = 2;
        }
      }
    }
    this.justReset = false;
    this.units.forEach((unit, index) => {
      const { point, tangent } = this.poseAt(this.distance - index * 1.98);
      unit.position.copy(point);
      unit.rotation.y = Math.atan2(tangent.x, tangent.z);
    });
  }

  reset() {
    this.distance = (this.stationDistance + this.length - 7.0) % this.length;
    this.speed = 1;
    this.running = true;
    this.dwell = 0;
    this.justReset = true;
    this.update(0);
  }
}
