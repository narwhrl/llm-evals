// Tank locomotive and two coaches. Each car is posed independently from its own bogie points on the track.
import * as THREE from 'three';
import { Kit, mat } from './kit.js';
import { TRACK, TRAIN, RAIL_TOP } from './layout.js';
import { carPose } from './motion.js';

const I = new THREE.Matrix4();
const GREEN = '#2f5d3a';
const BLACK = '#1f2022';
const RED = '#a3322a';
const BRASS = '#c9a24a';
const HALF_GAUGE = 0.25;

function wheelSet(r, materials, color) {
  const kit = new Kit();
  for (const s of [-1, 1]) {
    kit.cyl('paint', color, I, r, r, 0.05, 0, 0, s * HALF_GAUGE, 18, Math.PI / 2);
    kit.cyl('metal', '#9a9690', I, r + 0.012, r + 0.012, 0.02, 0, 0, s * (HALF_GAUGE - 0.03), 18, Math.PI / 2);
    kit.box('paint', BLACK, I, r * 0.9, r * 0.5, 0.012, r * 0.35, 0, s * (HALF_GAUGE + 0.03));
  }
  kit.cyl('metal', '#555', I, 0.02, 0.02, HALF_GAUGE * 2, 0, 0, 0, 6, Math.PI / 2);
  return kit.build(materials).children;
}

function locomotive(materials) {
  const kit = new Kit();
  const boilerY = 0.66;
  kit.box('paint', BLACK, I, 2.44, 0.08, 0.64, 0, 0.27, 0);
  kit.box('paint', GREEN, I, 2.5, 0.05, 0.76, 0, 0.335, 0);
  for (const s of [-1, 1]) {
    kit.box('paint', RED, I, 0.06, 0.15, 0.8, s * 1.27, 0.3, 0);
    for (const z of [-0.25, 0.25]) {
      kit.cyl('metal', '#3a3a3a', I, 0.022, 0.022, 0.08, s * 1.33, 0.3, z, 8, 0, Math.PI / 2);
      kit.cyl('metal', '#6a6a6a', I, 0.045, 0.045, 0.02, s * 1.37, 0.3, z, 12, 0, Math.PI / 2);
    }
    kit.box('metal', '#333', I, 0.06, 0.04, 0.05, s * 1.33, 0.26, 0);
  }
  kit.cyl('paint', GREEN, I, 0.27, 0.27, 1.36, 0.42, boilerY, 0, 22, 0, Math.PI / 2);
  for (const x of [-0.1, 0.42, 0.92]) kit.cyl('metal', BRASS, I, 0.276, 0.276, 0.025, x, boilerY, 0, 22, 0, Math.PI / 2);
  kit.cyl('paint', BLACK, I, 0.29, 0.29, 0.28, 1.1, boilerY, 0, 22, 0, Math.PI / 2);
  kit.cyl('paint', BLACK, I, 0.25, 0.25, 0.03, 1.25, boilerY, 0, 22, 0, Math.PI / 2);
  kit.cyl('paint', BLACK, I, 0.075, 0.065, 0.24, 1.1, boilerY + 0.34, 0, 14);
  kit.cyl('paint', BLACK, I, 0.095, 0.08, 0.05, 1.1, boilerY + 0.475, 0, 14);
  kit.cyl('metal', BRASS, I, 0.09, 0.1, 0.14, 0.5, boilerY + 0.3, 0, 14);
  kit.add('metal', new THREE.SphereGeometry(0.09, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), BRASS, mat(0.5, boilerY + 0.37, 0));
  kit.cyl('metal', BRASS, I, 0.035, 0.035, 0.1, 0.02, boilerY + 0.3, 0, 8);
  for (const s of [-1, 1]) {
    kit.rbox('paint', GREEN, I, 1.0, 0.42, 0.17, 0.42, 0.57, s * 0.3, 0, 0.02);
    kit.box('paint', BLACK, I, 1.0, 0.02, 0.18, 0.42, 0.79, s * 0.3);
    kit.cyl('paint', BLACK, I, 0.09, 0.09, 0.32, 0.98, 0.33, s * 0.34, 12, 0, Math.PI / 2);
  }
  // Cab, bunker and roof.
  kit.rbox('paint', GREEN, I, 0.82, 0.78, 0.76, -0.7, 0.73, 0, 0, 0.02);
  kit.rbox('paint', GREEN, I, 0.34, 0.5, 0.72, -1.1, 0.6, 0, 0, 0.02);
  kit.rbox('paint', BLACK, I, 0.3, 0.08, 0.6, -1.1, 0.86, 0, 0, 0.03);
  kit.rbox('paint', BLACK, I, 0.96, 0.05, 0.84, -0.72, 1.14, 0, 0, 0.02);
  for (const s of [-1, 1]) {
    kit.box('glow', '#2a2622', I, 0.3, 0.26, 0.02, -0.66, 0.88, s * 0.381);
    kit.box('glow', '#2a2622', I, 0.02, 0.18, 0.18, -0.29, 0.93, s * 0.2);
    kit.box('metal', BRASS, I, 0.5, 0.012, 0.012, 0.3, 0.86, s * 0.39);
  }
  kit.box('glow', '#fff4d6', I, 0.05, 0.08, 0.1, 1.29, 0.48, 0);
  kit.box('paint', BLACK, I, 0.04, 0.1, 0.12, 1.27, 0.48, 0);
  const body = kit.build(materials);
  const axles = [0.62, 0.06, -0.5].map((x) => ({ x, y: 0.19, r: 0.19 }));
  return { body, axles, wheelColor: RED, rods: true };
}

function coach(materials, livery) {
  const kit = new Kit();
  kit.box('paint', BLACK, I, 2.3, 0.08, 0.6, 0, 0.3, 0);
  kit.rbox('paint', livery.lower, I, 2.4, 0.42, 0.7, 0, 0.56, 0, 0, 0.03);
  kit.rbox('paint', livery.upper, I, 2.4, 0.22, 0.7, 0, 0.87, 0, 0, 0.02);
  kit.box('paint', BRASS, I, 2.41, 0.015, 0.705, 0, 0.765, 0);
  kit.rbox('paint', '#5c5f62', I, 2.46, 0.08, 0.74, 0, 1.0, 0, 0, 0.035);
  kit.rbox('paint', '#4b4e51', I, 2.2, 0.06, 0.46, 0, 1.06, 0, 0, 0.025);
  for (const s of [-1, 1]) {
    for (let i = 0; i < 7; i++) kit.box('glow', '#2a2622', I, 0.19, 0.15, 0.02, -0.96 + i * 0.32, 0.87, s * 0.352);
    for (const x of [-1.12, 1.12]) kit.box('paint', '#3a1a18', I, 0.1, 0.5, 0.02, x, 0.66, s * 0.352);
    kit.box('paint', BLACK, I, 0.06, 0.52, 0.5, s * 1.23, 0.7, 0);
    for (const z of [-0.25, 0.25]) kit.cyl('metal', '#6a6a6a', I, 0.04, 0.04, 0.02, s * 1.27, 0.3, z, 12, 0, Math.PI / 2);
    // Bogie frames.
    kit.box('paint', BLACK, I, 0.62, 0.08, 0.58, s * 0.8, 0.2, 0);
  }
  const body = kit.build(materials);
  const axles = [-1.0, -0.6, 0.6, 1.0].map((x) => ({ x, y: 0.11, r: 0.11 }));
  return { body, axles, wheelColor: BLACK, rods: false };
}

const LIVERIES = [
  { lower: '#7a2b2b', upper: '#e8dcc0' },
  { lower: '#7a2b2b', upper: '#e8dcc0' },
];

export function createTrain(materials) {
  const group = new THREE.Group();
  const specs = [locomotive(materials), coach(materials, LIVERIES[0]), coach(materials, LIVERIES[1])];
  const wheelTemplates = new Map();
  const cars = specs.map((spec, i) => {
    const car = new THREE.Group();
    car.add(spec.body);
    const wheels = spec.axles.map((a) => {
      const key = `${a.r}${spec.wheelColor}`;
      if (!wheelTemplates.has(key)) wheelTemplates.set(key, wheelSet(a.r, materials, spec.wheelColor));
      const axle = new THREE.Group();
      for (const m of wheelTemplates.get(key)) axle.add(new THREE.Mesh(m.geometry, m.material));
      axle.position.set(a.x, a.y, 0);
      car.add(axle);
      return { axle, r: a.r };
    });
    let rods = null;
    if (spec.rods) {
      rods = [-1, 1].map((s) => {
        const rod = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.03, 0.02), materials.metal);
        rod.userData.z = s * (HALF_GAUGE + 0.06);
        car.add(rod);
        return rod;
      });
    }
    car.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    group.add(car);
    return { car, wheels, rods, ...TRAIN.cars[i] };
  });

  // Headlight cone, used at night.
  const headlight = new THREE.SpotLight('#ffe2b0', 0, 9, 0.42, 0.65, 1.2);
  headlight.position.set(1.32, 0.48, 0);
  headlight.target.position.set(6, -0.4, 0);
  cars[0].car.add(headlight, headlight.target);

  const smoke = createSmoke(group);
  const pose = {};
  const chimney = new THREE.Vector3();

  function place(s) {
    for (const c of cars) {
      carPose(TRACK, s - c.offset, c.bogie, pose);
      c.car.position.set(pose.x, RAIL_TOP, pose.z);
      c.car.rotation.y = Math.atan2(-pose.dz, pose.dx);
      for (const w of c.wheels) w.axle.rotation.z = -s / w.r;
      if (c.rods) {
        const a = -s / 0.19;
        for (const rod of c.rods) rod.position.set(0.06 + Math.cos(a) * 0.08, 0.19 + Math.sin(a) * 0.08, rod.userData.z);
      }
    }
    cars[0].car.updateMatrixWorld();
    return chimney.set(1.1, 1.18, 0).applyMatrix4(cars[0].car.matrixWorld);
  }

  return {
    group,
    headlight,
    update(state, dt) {
      const top = place(state.s);
      smoke.update(dt, top, state.v, cars[0].car);
    },
    reset(state) {
      smoke.clear();
      place(state.s);
    },
  };
}

// Puffs leave the chimney faster at speed, rise, swell and fade; driven by simulation time so they pause too.
function createSmoke(parent) {
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const puffs = Array.from({ length: 36 }, () => {
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#e9e6e1', roughness: 1, transparent: true, opacity: 0, depthWrite: false }));
    m.visible = false;
    m.userData = { age: 0, life: 1, vel: new THREE.Vector3() };
    parent.add(m);
    return m;
  });
  let next = 0;
  let timer = 0;
  const back = new THREE.Vector3();
  return {
    update(dt, origin, speed, loco) {
      if (dt <= 0) return;
      timer -= dt;
      if (timer <= 0) {
        timer = speed > 0.05 ? Math.max(0.07, 0.42 / (speed + 0.4)) : 0.55;
        const p = puffs[next];
        next = (next + 1) % puffs.length;
        back.set(-1, 0, 0).transformDirection(loco.matrixWorld);
        p.position.copy(origin);
        p.userData.age = 0;
        p.userData.life = 1.8 + Math.random() * 0.8;
        p.userData.vel.set((Math.random() - 0.5) * 0.15, 0.55 + Math.random() * 0.25, (Math.random() - 0.5) * 0.15).addScaledVector(back, speed * 0.25);
        p.visible = true;
      }
      for (const p of puffs) {
        if (!p.visible) continue;
        const u = p.userData;
        u.age += dt;
        const t = u.age / u.life;
        if (t >= 1) {
          p.visible = false;
          continue;
        }
        p.position.addScaledVector(u.vel, dt);
        u.vel.multiplyScalar(1 - dt * 0.6);
        p.scale.setScalar(0.06 + t * 0.26);
        p.material.opacity = 0.42 * (1 - t) * Math.min(1, t * 8);
      }
    },
    clear() {
      for (const p of puffs) p.visible = false;
      timer = 0;
    },
  };
}
