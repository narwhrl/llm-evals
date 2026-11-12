import * as THREE from 'three';
import { distanceToU, riverAt } from './track.js';

const DEG = Math.PI / 180;

function box(w, h, d, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cyl(r, h, mat, seg = 10) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

const GAP = 0.55; // coupler gap between cars

export class Train {
  constructor(curve, stationS) {
    this.curve = curve;
    this.trackLength = curve.getLength();
    this.stationS = stationS;

    // movement state
    this.speed = 4.2; // world units per second at 1x
    this.dwellTime = 2.0;
    this.headway = 4.0; // approach / depart distance

    this.group = new THREE.Group();
    this.cars = [];
    this.carLens = [];

    this._buildLocomotive();
    this._buildWagon(0xa3492f);
    this._buildWagon(0x3f5a4a);

    this.reset();
    this._sample = {};
  }

  _materials() {
    return {
      body: new THREE.MeshStandardMaterial({ color: 0xa8342a, roughness: 0.55, metalness: 0.25 }),
      boiler: new THREE.MeshStandardMaterial({ color: 0x2e3236, roughness: 0.4, metalness: 0.7 }),
      trim: new THREE.MeshStandardMaterial({ color: 0xd9b45a, roughness: 0.35, metalness: 0.8 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x26292e, roughness: 0.6, metalness: 0.5 }),
      wheel: new THREE.MeshStandardMaterial({ color: 0x1f2226, roughness: 0.45, metalness: 0.7 }),
      cab: new THREE.MeshStandardMaterial({ color: 0x7a2a22, roughness: 0.6 }),
      coachBody: new THREE.MeshStandardMaterial({ color: 0xa3492f, roughness: 0.6 }),
      coachRoof: new THREE.MeshStandardMaterial({ color: 0xefe8d8, roughness: 0.8 }),
      winLit: new THREE.MeshStandardMaterial({
        color: 0xd8e4ea,
        roughness: 0.25,
        metalness: 0.4,
        emissive: 0xffbf72,
        emissiveIntensity: 0,
      }),
    };
  }

  _addWheels(g, mat, radius, positions, width = 1.5) {
    const wheelGeo = new THREE.CylinderGeometry(radius, radius, 0.14, 12);
    wheelGeo.rotateZ(Math.PI / 2);
    for (const pz of positions) {
      for (const px of [-width / 2, width / 2]) {
        const w = new THREE.Mesh(wheelGeo, mat);
        w.position.set(px, radius, pz);
        w.castShadow = true;
        g.add(w);
      }
    }
  }

  _buildLocomotive() {
    const m = this._materials();
    const g = new THREE.Group();
    // frame
    const frame = box(1.5, 0.28, 3.6, m.dark);
    frame.position.y = 0.42;
    g.add(frame);
    // boiler along z
    const boiler = cyl(0.52, 2.1, m.boiler, 14);
    boiler.rotation.x = Math.PI / 2;
    boiler.position.set(0, 1.05, 0.55);
    g.add(boiler);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.52, 12, 10), m.boiler);
    nose.position.set(0, 1.05, 1.6);
    nose.scale.z = 0.5;
    nose.castShadow = true;
    g.add(nose);
    // chimney + dome
    const chim = cyl(0.16, 0.55, m.dark, 8);
    chim.position.set(0, 1.75, 1.25);
    g.add(chim);
    const chimTop = cyl(0.24, 0.16, m.trim, 8);
    chimTop.position.set(0, 1.98, 1.25);
    g.add(chimTop);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), m.trim);
    dome.position.set(0, 1.6, 0.45);
    dome.scale.y = 0.7;
    g.add(dome);
    // cab
    const cab = box(1.6, 1.35, 1.1, m.cab);
    cab.position.set(0, 1.35, -1.05);
    g.add(cab);
    const cabRoof = box(1.75, 0.12, 1.3, m.dark);
    cabRoof.position.set(0, 2.08, -1.05);
    g.add(cabRoof);
    const cabWin = box(0.5, 0.4, 0.06, m.winLit);
    cabWin.position.set(0, 1.5, -0.48);
    g.add(cabWin);
    // headlamp
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), m.winLit);
    lamp.position.set(0, 1.3, 1.92);
    g.add(lamp);
    // cowcatcher
    const cow = box(1.4, 0.35, 0.5, m.trim);
    cow.position.set(0, 0.32, 1.95);
    cow.rotation.x = 20 * DEG;
    g.add(cow);
    this._addWheels(g, m.wheel, 0.32, [1.15, 0.25, -0.85]);
    this.locoLampMat = m.winLit;

    const wrapper = new THREE.Group();
    wrapper.add(g);
    this.group.add(wrapper);
    this.cars.push(wrapper);
    this.carLens.push(4.0);
  }

  _buildWagon(color) {
    const body = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    const roofM = new THREE.MeshStandardMaterial({ color: 0xefe8d8, roughness: 0.8 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x26292e, roughness: 0.6, metalness: 0.5 });
    const wheelM = new THREE.MeshStandardMaterial({ color: 0x1f2226, roughness: 0.45, metalness: 0.7 });
    const winM = this.locoLampMat;

    const g = new THREE.Group();
    const frame = box(1.5, 0.25, 3.4, dark);
    frame.position.y = 0.42;
    g.add(frame);
    const coach = box(1.55, 1.15, 3.3, body);
    coach.position.y = 1.15;
    g.add(coach);
    const roof = box(1.7, 0.18, 3.5, roofM);
    roof.position.y = 1.82;
    g.add(roof);
    // window band
    const band = box(1.58, 0.45, 3.0, new THREE.MeshStandardMaterial({ color: 0xefe8d8, roughness: 0.7 }));
    band.position.y = 1.32;
    g.add(band);
    const winGeo = new THREE.BoxGeometry(1.6, 0.34, 0.5);
    for (const wz of [-1.0, 0, 1.0]) {
      const w = new THREE.Mesh(winGeo, winM);
      w.position.set(0, 1.32, wz);
      g.add(w);
    }
    this._addWheels(g, wheelM, 0.3, [1.05, -1.05]);

    const wrapper = new THREE.Group();
    wrapper.add(g);
    this.group.add(wrapper);
    this.cars.push(wrapper);
    this.carLens.push(3.8);
  }

  // spacing of car centre points behind headS (the loco centre), front to back
  get offsets() {
    const offs = [0];
    let acc = 0;
    for (let i = 1; i < this.carLens.length; i++) {
      acc += this.carLens[i - 1] / 2 + GAP + this.carLens[i] / 2;
      offs.push(acc);
    }
    return offs;
  }

  get trainLength() {
    return this.offsets[this.offsets.length - 1] + this.carLens[this.carLens.length - 1] / 2;
  }

  reset() {
    // start just after leaving the station: lead point is a bit past stationS
    this.headS = this.stationS + 7.0;
    this.state = 'run';
    this.dwell = 0;
    this.update(0, true);
  }

  // s is the lead (front) reference of the train
  _posOnTrack(s, target) {
    if (!target.pos) target.pos = new THREE.Vector3();
    if (!target.tan) target.tan = new THREE.Vector3();
    const u = distanceToU(this.curve, s, this.trackLength);
    this.curve.getPointAt(u, target.pos);
    this.curve.getTangentAt(u, target.tan);
    target.u = u;
    return target;
  }

  update(dt, force = false) {
    if (this.state === 'dwell') {
      if (dt > 0) {
        this.dwell -= dt;
        if (this.dwell <= 0) {
          this.state = 'run';
          this.dwell = 0;
          // nudge past the trigger point so the same arrival does not retrigger
          this.headS += this.speed * dt + 0.001;
        }
      }
    } else if (dt > 0) {
      const prev = this.headS;
      const next = prev + this.speed * dt;
      const front = this.carLens[0] / 2; // nose offset from car reference
      if (this._crossed(prev + front, next + front, this.stationS + front)) {
        this.headS = this.stationS;
        this.state = 'dwell';
        this.dwell = this.dwellTime;
      } else {
        this.headS = next;
      }
    }

    // position each car at its own sample along the loop
    const offs = this.offsets;
    for (let i = 0; i < this.cars.length; i++) {
      const s = this.headS - offs[i];
      const sm = this._posOnTrack(s, {});
      const car = this.cars[i];
      const bank = riverAt(sm.pos.x, sm.pos.z, 0) !== null;
      car.position.set(sm.pos.x, bank ? 0.18 : 0.0, sm.pos.z);
      car.rotation.y = Math.atan2(sm.tan.x, sm.tan.z);
    }
  }

  // true if travelling s0 -> s1 along the loop passed through st
  _crossed(s0, s1, st) {
    const L = this.trackLength;
    const a = ((s0 % L) + L) % L;
    const b = ((s1 % L) + L) % L;
    const t = ((st % L) + L) % L;
    if (a <= b) return a < t && t <= b;
    return t > a || t <= b;
  }
}
