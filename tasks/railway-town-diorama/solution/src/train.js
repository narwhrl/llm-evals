import * as THREE from 'three';
import * as L from './layout.js';
import { roundedBox, setShadows, glowSprite } from './utils.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const OFFSETS = [0, 3.9, 7.8];

function material(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color, roughness: 0.62, metalness: 0.12, side: THREE.DoubleSide, ...opts,
  });
}

function wheelGeometry(r) {
  const g = new THREE.CylinderGeometry(r, r, 0.14, 16);
  g.rotateZ(Math.PI / 2);
  return g;
}

export function createTrain(glowTex) {
  const group = new THREE.Group();
  const wheels = [];
  const cars = [];

  const green = material(0x2e5745, { roughness: 0.5, metalness: 0.25 });
  const greenDark = material(0x223f33, { roughness: 0.6 });
  const brass = material(0xc39a51, { roughness: 0.32, metalness: 0.75 });
  const iron = material(0x2a2a2c, { roughness: 0.55, metalness: 0.5 });
  const cream = material(0xe7d6b0);
  const teal = material(0x4d7f83);
  const red = material(0x9c4a3a);
  const glass = material(0x30414a, { roughness: 0.25, metalness: 0.2 });
  const windowMat = material(0x3a4a52, {
    emissive: 0xffc477, emissiveIntensity: 0, roughness: 0.3,
  });
  const headlampMat = material(0xfff0c4, {
    emissive: 0xffd487, emissiveIntensity: 0.3, roughness: 0.3,
  });

  function addWheel(parent, x, y, z, r) {
    const w = new THREE.Mesh(wheelGeometry(r), iron);
    w.position.set(x, y, z);
    w.castShadow = true;
    parent.add(w);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(r * 0.34, 8, 6), brass);
    cap.position.set(x + Math.sign(x) * 0.09, y, z);
    parent.add(cap);
    wheels.push({ mesh: w, r });
  }

  /* ------------------------------------------------------ locomotive --- */
  {
    const car = new THREE.Group();

    const chassis = new THREE.Mesh(roundedBox(1.5, 0.42, 3.5, 0.07), greenDark);
    chassis.position.set(0, 0.44, 0);
    car.add(chassis);

    const boilerGeo = new THREE.CylinderGeometry(0.55, 0.55, 2.15, 18);
    boilerGeo.rotateX(Math.PI / 2);
    const boiler = new THREE.Mesh(boilerGeo, green);
    boiler.position.set(0, 1.0, 0.42);
    car.add(boiler);
    for (const z of [-0.2, 0.9]) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.035, 6, 20), brass);
      band.position.set(0, 1.0, z);
      car.add(band);
    }
    const smokebox = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.16, 18), iron);
    smokebox.geometry.rotateX(Math.PI / 2);
    smokebox.position.set(0, 1.0, 1.53);
    car.add(smokebox);
    const frontRing = new THREE.Mesh(new THREE.TorusGeometry(0.57, 0.045, 6, 20), brass);
    frontRing.position.set(0, 1.0, 1.62);
    car.add(frontRing);

    const cab = new THREE.Mesh(roundedBox(1.44, 1.5, 1.15, 0.08), green);
    cab.position.set(0, 1.05, -1.18);
    car.add(cab);
    const cabRoof = new THREE.Mesh(roundedBox(1.6, 0.14, 1.35, 0.06), greenDark);
    cabRoof.position.set(0, 1.88, -1.18);
    car.add(cabRoof);
    for (const s of [-1, 1]) {
      const cw = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.55), glass);
      cw.position.set(s * 0.73, 1.32, -1.18);
      cw.rotation.y = s * Math.PI / 2;
      car.add(cw);
    }

    const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.19, 0.55, 12), iron);
    chimney.position.set(0, 1.66, 1.02);
    car.add(chimney);
    const chimneyCap = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 0.1, 12), iron);
    chimneyCap.position.set(0, 1.97, 1.02);
    car.add(chimneyCap);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), brass);
    dome.position.set(0, 1.55, 0.05);
    car.add(dome);

    const cowcatcher = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.3, 0.55), iron);
    cowcatcher.position.set(0, 0.3, 1.92);
    cowcatcher.rotation.x = -0.45;
    car.add(cowcatcher);

    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), headlampMat);
    lamp.position.set(0, 1.18, 1.66);
    car.add(lamp);
    const halo = glowSprite(glowTex, 2.6, 0xffd28a);
    halo.position.set(0, 1.18, 1.72);
    car.add(halo);

    for (const z of [-1.15, -0.1, 0.95]) {
      for (const s of [-1, 1]) addWheel(car, s * 0.74, 0.34, z, 0.34);
    }
    for (const s of [-1, 1]) addWheel(car, s * 0.62, 0.22, 1.5, 0.22);
    for (const s of [-1, 1]) {
      const rod = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 2.3), brass);
      rod.position.set(s * 0.85, 0.34, -0.1);
      car.add(rod);
    }

    setShadows(car);
    group.add(car);
    cars.push({ group: car, offset: OFFSETS[0], wheels: [], halo, headlampMat });
  }

  /* ---------------------------------------------------------- coaches --- */
  const liveries = [
    { body: cream, stripe: red, roof: greenDark },
    { body: teal, stripe: cream, roof: greenDark },
  ];
  const frameGeo = new THREE.PlaneGeometry(0.48, 0.56);
  const windowGeo = new THREE.PlaneGeometry(0.4, 0.48);

  liveries.forEach((livery, ci) => {
    const car = new THREE.Group();
    const under = new THREE.Mesh(roundedBox(1.5, 0.3, 3.25, 0.06), iron);
    under.position.set(0, 0.42, 0);
    car.add(under);

    const body = new THREE.Mesh(roundedBox(1.5, 1.4, 3.05, 0.1), livery.body);
    body.position.set(0, 1.2, 0);
    car.add(body);

    const roofGeo = new THREE.CylinderGeometry(0.82, 0.82, 3.2, 18);
    roofGeo.rotateX(Math.PI / 2);
    roofGeo.scale(1, 0.3, 1);
    const roof = new THREE.Mesh(roofGeo, livery.roof);
    roof.position.set(0, 1.94, 0);
    car.add(roof);

    const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.53, 0.12, 3.0), livery.stripe);
    stripe.position.set(0, 0.72, 0);
    car.add(stripe);

    for (const s of [-1, 1]) {
      for (const z of [-1.08, -0.54, 0, 0.54, 1.08]) {
        const frame = new THREE.Mesh(frameGeo, iron);
        frame.position.set(s * 0.762, 1.32, z);
        frame.rotation.y = s * Math.PI / 2;
        car.add(frame);
        const win = new THREE.Mesh(windowGeo, windowMat);
        win.position.set(s * 0.772, 1.32, z);
        win.rotation.y = s * Math.PI / 2;
        car.add(win);
      }
    }
    for (const z of [-1.53, 1.53]) {
      const end = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.0, 0.09), iron);
      end.position.set(0, 1.0, z);
      car.add(end);
    }
    for (const z of [-1.15, -0.75, 0.75, 1.15]) {
      for (const s of [-1, 1]) addWheel(car, s * 0.7, 0.28, z, 0.28);
    }
    for (const z of [-1.0, 1.0]) {
      const bogie = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 0.62), iron);
      bogie.position.set(0, 0.3, z);
      car.add(bogie);
    }

    setShadows(car);
    group.add(car);
    cars.push({ group: car, offset: OFFSETS[ci + 1], wheels: [] });
  });

  const headLight = new THREE.PointLight(0xffd08a, 0, 13, 2);
  headLight.position.set(0, 1.3, 2.0);
  cars[0].group.add(headLight);

  function update(distance) {
    for (const car of cars) {
      const u = L.mod1((distance - car.offset) / L.TRACK_LENGTH);
      const p = L.trackPoint(u);
      car.group.position.set(p.x, p.y + 0.13, p.z);
      car.group.quaternion.setFromRotationMatrix(L.trackFrame(u));
    }
    for (const w of wheels) w.mesh.rotation.x = -distance / w.r;
  }

  function setNight(mix) {
    windowMat.emissiveIntensity = mix * 1.8;
    headlampMat.emissiveIntensity = 0.3 + mix * 2.2;
    cars[0].halo.material.opacity = 0.12 + mix * 0.9;
    headLight.intensity = mix * 2.4;
  }

  return { group, cars, update, setNight, carCount: cars.length };
}
