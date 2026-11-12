import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { createSmokeTexture } from "./textures.js";
import { wrap } from "./geometry.js";

const BASE_SPEED = 2.0;
const DWELL_SECONDS = 2;

function createTrainMaterials() {
  return {
    green: new THREE.MeshStandardMaterial({
      color: "#294a3e",
      roughness: 0.58,
      metalness: 0.08,
    }),
    greenLight: new THREE.MeshStandardMaterial({
      color: "#3f6453",
      roughness: 0.54,
    }),
    cream: new THREE.MeshStandardMaterial({
      color: "#dfcda7",
      roughness: 0.7,
    }),
    maroon: new THREE.MeshStandardMaterial({
      color: "#63362f",
      roughness: 0.74,
    }),
    roof: new THREE.MeshStandardMaterial({
      color: "#4f5750",
      roughness: 0.81,
      metalness: 0.08,
    }),
    black: new THREE.MeshStandardMaterial({
      color: "#252927",
      roughness: 0.67,
      metalness: 0.13,
    }),
    red: new THREE.MeshStandardMaterial({
      color: "#9a3e2f",
      roughness: 0.6,
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#c69a52",
      roughness: 0.28,
      metalness: 0.8,
    }),
    steel: new THREE.MeshStandardMaterial({
      color: "#898e87",
      roughness: 0.31,
      metalness: 0.75,
    }),
    window: new THREE.MeshStandardMaterial({
      color: "#9bb8ba",
      roughness: 0.22,
      metalness: 0.06,
      emissive: new THREE.Color("#ffc36e"),
      emissiveIntensity: 0.04,
    }),
    headlight: new THREE.MeshStandardMaterial({
      color: "#fff0bc",
      emissive: new THREE.Color("#ffe1a0"),
      emissiveIntensity: 1.5,
      roughness: 0.2,
    }),
  };
}

function shadowify(group) {
  group.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;
  });
}

function createWheel(radius, width, materials) {
  const geometry = new THREE.CylinderGeometry(radius, radius, width, 18);
  geometry.rotateZ(Math.PI / 2);
  const wheel = new THREE.Mesh(geometry, materials.black);
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.68, radius * 0.065, 5, 16),
    materials.steel,
  );
  rim.rotation.y = Math.PI / 2;
  wheel.add(rim);
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.18, radius * 0.18, width + 0.024, 10),
    materials.brass,
  );
  hub.rotation.z = Math.PI / 2;
  wheel.add(hub);
  return wheel;
}

function addLocomotiveWheels(group, materials) {
  const wheels = [];
  const axles = [
    { z: 0.43, radius: 0.17 },
    { z: 0.08, radius: 0.19 },
    { z: -0.34, radius: 0.16 },
  ];
  for (const axle of axles) {
    for (const side of [-1, 1]) {
      const wheel = createWheel(axle.radius, 0.075, materials);
      wheel.position.set(side * 0.33, axle.radius, axle.z);
      group.add(wheel);
      wheels.push({ mesh: wheel, radius: axle.radius });
    }
  }
  return wheels;
}

function addCarriageWheels(group, materials) {
  const wheels = [];
  for (const bogieZ of [-0.53, 0.53]) {
    for (const axleOffset of [-0.17, 0.17]) {
      for (const side of [-1, 1]) {
        const wheel = createWheel(0.105, 0.06, materials);
        wheel.position.set(side * 0.315, 0.105, bogieZ + axleOffset);
        group.add(wheel);
        wheels.push({ mesh: wheel, radius: 0.105 });
      }
    }
    const bogie = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.12, 0.5),
      materials.black,
    );
    bogie.position.set(0, 0.15, bogieZ);
    group.add(bogie);
  }
  return wheels;
}

function addBufferBeam(group, materials, z, width = 0.61) {
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.12, 0.08),
    materials.red,
  );
  beam.position.set(0, 0.34, z);
  group.add(beam);
  for (const x of [-0.21, 0.21]) {
    const buffer = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.075, 0.1, 12),
      materials.black,
    );
    buffer.rotation.x = Math.PI / 2;
    buffer.position.set(x, 0.34, z + Math.sign(z) * 0.08);
    group.add(buffer);
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.035, 12),
      materials.steel,
    );
    cap.rotation.x = Math.PI / 2;
    cap.position.set(x, 0.34, z + Math.sign(z) * 0.14);
    group.add(cap);
  }
}

function addCoupling(group, materials, z) {
  const link = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.06, 0.22),
    materials.black,
  );
  link.position.set(0, 0.29, z + Math.sign(z) * 0.1);
  group.add(link);
}

function createLocomotive(materials) {
  const group = new THREE.Group();
  const chassis = new THREE.Mesh(
    new THREE.BoxGeometry(0.54, 0.16, 1.32),
    materials.black,
  );
  chassis.position.y = 0.27;
  group.add(chassis);

  const footplate = new THREE.Mesh(
    new RoundedBoxGeometry(0.72, 0.07, 1.46, 2, 0.02),
    materials.black,
  );
  footplate.position.y = 0.36;
  group.add(footplate);

  const boiler = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.76, 18),
    materials.green,
  );
  boiler.rotation.x = Math.PI / 2;
  boiler.position.set(0, 0.68, 0.16);
  group.add(boiler);

  const smokeBox = new THREE.Mesh(
    new THREE.CylinderGeometry(0.235, 0.235, 0.18, 18),
    materials.black,
  );
  smokeBox.rotation.x = Math.PI / 2;
  smokeBox.position.set(0, 0.68, 0.62);
  group.add(smokeBox);

  const frontDoor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.025, 18),
    materials.greenLight,
  );
  frontDoor.rotation.x = Math.PI / 2;
  frontDoor.position.set(0, 0.68, 0.72);
  group.add(frontDoor);

  for (const side of [-1, 1]) {
    const boilerBand = new THREE.Mesh(
      new THREE.TorusGeometry(0.222, 0.014, 4, 18),
      materials.brass,
    );
    boilerBand.rotation.y = Math.PI / 2;
    boilerBand.position.set(0, 0.68, 0.27 + side * 0.18);
    group.add(boilerBand);
  }

  const chimney = new THREE.Group();
  const stack = new THREE.Mesh(
    new THREE.CylinderGeometry(0.062, 0.082, 0.28, 12),
    materials.black,
  );
  stack.position.y = 0.14;
  chimney.add(stack);
  const lip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.093, 0.07, 0.055, 12),
    materials.black,
  );
  lip.position.y = 0.3;
  chimney.add(lip);
  chimney.position.set(0, 0.98, 0.48);
  group.add(chimney);
  group.userData.chimney = chimney;

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    materials.brass,
  );
  dome.position.set(0, 0.89, 0.17);
  group.add(dome);

  const safety = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.06, 0.14, 10),
    materials.brass,
  );
  safety.position.set(0, 0.94, 0.03);
  group.add(safety);

  const cab = new THREE.Mesh(
    new RoundedBoxGeometry(0.62, 0.73, 0.5, 2, 0.035),
    materials.green,
  );
  cab.position.set(0, 0.81, -0.46);
  group.add(cab);

  const cabRoof = new THREE.Mesh(
    new RoundedBoxGeometry(0.72, 0.09, 0.58, 2, 0.03),
    materials.black,
  );
  cabRoof.position.set(0, 1.22, -0.47);
  group.add(cabRoof);

  for (const side of [-1, 1]) {
    const windowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.25, 0.25),
      materials.window,
    );
    windowMesh.position.set(side * 0.316, 0.93, -0.43);
    windowMesh.rotation.y = side * Math.PI / 2;
    group.add(windowMesh);
  }

  const rearWindow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.26, 0.24),
    materials.window,
  );
  rearWindow.position.set(0, 0.94, -0.715);
  rearWindow.rotation.y = Math.PI;
  group.add(rearWindow);

  for (const side of [-1, 1]) {
    const cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.11, 0.26, 12),
      materials.greenLight,
    );
    cylinder.rotation.z = Math.PI / 2;
    cylinder.position.set(side * 0.35, 0.42, 0.38);
    group.add(cylinder);
    const cylinderCap = new THREE.Mesh(
      new THREE.CircleGeometry(0.112, 12),
      materials.brass,
    );
    cylinderCap.position.set(side * 0.485, 0.42, 0.38);
    cylinderCap.rotation.y = side * Math.PI / 2;
    group.add(cylinderCap);
  }

  const funnelFront = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.11, 0.09),
    materials.red,
  );
  funnelFront.position.set(0, 0.35, 0.81);
  group.add(funnelFront);

  const pilot = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.25, 0.2),
    materials.black,
  );
  pilot.position.set(0, 0.23, 0.9);
  pilot.rotation.x = -0.28;
  group.add(pilot);

  const headlight = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.07, 0.11, 12),
    materials.black,
  );
  headlight.rotation.x = Math.PI / 2;
  headlight.position.set(0, 0.91, 0.66);
  group.add(headlight);
  const headlightLens = new THREE.Mesh(
    new THREE.CircleGeometry(0.07, 16),
    materials.headlight,
  );
  headlightLens.position.set(0, 0.91, 0.72);
  group.add(headlightLens);

  const numberPlate = new THREE.Mesh(
    new THREE.CircleGeometry(0.065, 16),
    materials.brass,
  );
  numberPlate.position.set(0, 0.68, 0.741);
  group.add(numberPlate);

  addBufferBeam(group, materials, 0.82, 0.63);
  addCoupling(group, materials, -0.8);
  const wheels = addLocomotiveWheels(group, materials);
  shadowify(group);
  return { group, wheels, chimney };
}

function createCarriage(materials, variant = "passenger") {
  const group = new THREE.Group();
  const bodyMaterial = variant === "passenger" ? materials.green : materials.cream;
  const lowerPanel =
    variant === "passenger" ? materials.maroon : materials.green;

  const chassis = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.12, 1.38),
    materials.black,
  );
  chassis.position.y = 0.25;
  group.add(chassis);

  const floor = new THREE.Mesh(
    new RoundedBoxGeometry(0.66, 0.07, 1.48, 2, 0.02),
    materials.black,
  );
  floor.position.y = 0.32;
  group.add(floor);

  const body = new THREE.Mesh(
    new RoundedBoxGeometry(0.64, 0.46, 1.44, 2, 0.055),
    bodyMaterial,
  );
  body.position.y = 0.58;
  group.add(body);

  const lowerBand = new THREE.Mesh(
    new RoundedBoxGeometry(0.66, 0.18, 1.45, 2, 0.035),
    lowerPanel,
  );
  lowerBand.position.y = 0.42;
  group.add(lowerBand);

  const roof = new THREE.Mesh(
    new RoundedBoxGeometry(0.7, 0.13, 1.5, 3, 0.065),
    materials.roof,
  );
  roof.position.y = 0.86;
  group.add(roof);

  const roofVent = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.055, 0.44),
    materials.black,
  );
  roofVent.position.y = 0.94;
  group.add(roofVent);

  const windowCount = variant === "passenger" ? 4 : 2;
  for (const side of [-1, 1]) {
    for (let index = 0; index < windowCount; index += 1) {
      const windowMesh = new THREE.Mesh(
        new RoundedBoxGeometry(0.008, 0.25, 0.23, 1, 0.012),
        materials.window,
      );
      windowMesh.position.set(
        side * 0.322,
        0.65,
        -0.45 + index * (windowCount === 4 ? 0.3 : 0.42),
      );
      group.add(windowMesh);
      const goldBand = new THREE.Mesh(
        new THREE.BoxGeometry(0.012, 0.025, 0.27),
        materials.brass,
      );
      goldBand.position.set(
        side * 0.326,
        0.78,
        windowMesh.position.z,
      );
      group.add(goldBand);
    }
  }

  for (const z of [-0.5, 0.5]) {
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(0.008, 0.42, 0.24),
      materials.maroon,
    );
    door.position.set(0.324, 0.58, z);
    group.add(door);
    const doorWindow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.16, 0.14),
      materials.window,
    );
    doorWindow.position.set(0.33, 0.67, z);
    doorWindow.rotation.y = Math.PI / 2;
    group.add(doorWindow);
  }

  for (const z of [-0.61, 0.61]) {
    const endDoor = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.42, 0.012),
      materials.maroon,
    );
    endDoor.position.set(0, 0.58, z + Math.sign(z) * 0.721);
    group.add(endDoor);
    addBufferBeam(group, materials, z + Math.sign(z) * 0.73, 0.56);
    addCoupling(group, materials, z + Math.sign(z) * 0.73);
  }

  const steps = [];
  for (const side of [-1, 1]) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(0.11, 0.035, 0.18),
      materials.steel,
    );
    step.position.set(side * 0.35, 0.23, 0.5);
    group.add(step);
    steps.push(step);
  }

  const wheels = addCarriageWheels(group, materials);
  shadowify(group);
  return { group, wheels };
}

function createSmokeSystem(scene, texture) {
  const sprites = [];
  for (let index = 0; index < 14; index += 1) {
    const material = new THREE.SpriteMaterial({
      map: texture,
      color: "#e4ded2",
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.visible = false;
    scene.add(sprite);
    sprites.push({ sprite, age: 1, life: 1, active: false, drift: 0 });
  }
  return {
    sprites,
    cursor: 0,
    timer: 0,
    spawn(origin, tangent, random) {
      const puff = sprites[this.cursor];
      this.cursor = (this.cursor + 1) % sprites.length;
      puff.active = true;
      puff.age = 0;
      puff.life = 1.25 + random() * 0.75;
      puff.drift = (random() - 0.5) * 0.24;
      puff.sprite.visible = true;
      puff.sprite.position.copy(origin);
      puff.sprite.position.x += (random() - 0.5) * 0.05;
      puff.sprite.position.z += (random() - 0.5) * 0.05;
      puff.sprite.material.opacity = 0.48;
      puff.sprite.scale.setScalar(0.18);
      puff.tangent = tangent.clone();
    },
    update(delta, origin, tangent, moving, random) {
      this.timer += delta;
      if (moving && this.timer > 0.14) {
        this.timer = 0;
        this.spawn(origin, tangent, random);
      }
      for (const puff of sprites) {
        if (!puff.active) continue;
        puff.age += delta;
        const progress = puff.age / puff.life;
        if (progress >= 1) {
          puff.active = false;
          puff.sprite.visible = false;
          continue;
        }
        puff.sprite.position.y += delta * (0.33 + progress * 0.17);
        puff.sprite.position.x += puff.tangent.x * delta * 0.09 + puff.drift * delta;
        puff.sprite.position.z += puff.tangent.z * delta * 0.09;
        puff.sprite.scale.setScalar(0.16 + progress * 0.52);
        puff.sprite.material.opacity = (1 - progress) * 0.36;
      }
    },
    clear() {
      for (const puff of sprites) {
        puff.active = false;
        puff.sprite.visible = false;
      }
    },
  };
}

function crossingStation(before, after, station, length) {
  if (before <= after) {
    return before < station && after >= station;
  }
  return before < station || after >= station;
}

export function createTrain(curve, stationDistance, scene) {
  const trackLength = curve.getLength();
  const materials = createTrainMaterials();
  const group = new THREE.Group();
  const locomotive = createLocomotive(materials);
  const carriageOne = createCarriage(materials, "passenger");
  const carriageTwo = createCarriage(materials, "brake");
  const vehicles = [locomotive, carriageOne, carriageTwo];
  const offsets = [0, 1.92, 3.84];
  for (const vehicle of vehicles) group.add(vehicle.group);

  const headlight = new THREE.PointLight("#ffd99a", 0, 4.5, 2);
  headlight.position.set(0, 0.91, 0.85);
  locomotive.group.add(headlight);
  const headlightGlowMaterial = new THREE.SpriteMaterial({
    map: createSmokeTexture(),
    color: "#ffd38b",
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const headlightGlow = new THREE.Sprite(headlightGlowMaterial);
  headlightGlow.scale.setScalar(0.48);
  headlightGlow.position.set(0, 0.91, 0.78);
  locomotive.group.add(headlightGlow);

  let startDistance = wrap(stationDistance - 4.25, trackLength);
  let distance = startDistance;
  let dwellRemaining = 0;
  let wheelSpin = 0;
  const random = (() => {
    let seed = 521;
    return () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  })();
  const smoke = createSmokeSystem(scene, createSmokeTexture());
  const chimneyOrigin = new THREE.Vector3();
  const currentTangent = new THREE.Vector3();
  const point = new THREE.Vector3();
  const tangent = new THREE.Vector3();

  function placeVehicle(vehicle, vehicleDistance) {
    const u = wrap(vehicleDistance, trackLength) / trackLength;
    curve.getPointAt(u, point);
    curve.getTangentAt(u, tangent);
    vehicle.group.position.copy(point);
    vehicle.group.rotation.set(0, Math.atan2(tangent.x, tangent.z), 0);
  }

  function syncVehicles(travelDistance = 0) {
    for (let index = 0; index < vehicles.length; index += 1) {
      placeVehicle(vehicles[index], distance - offsets[index]);
    }
    wheelSpin -= travelDistance;
    for (const vehicle of vehicles) {
      for (const wheel of vehicle.wheels) {
        wheel.mesh.rotation.x = wheelSpin / wheel.radius;
      }
    }
  }

  function update(delta, speedMultiplier, paused) {
    let travelDistance = 0;
    if (!paused) {
      if (dwellRemaining > 0) {
        dwellRemaining = Math.max(0, dwellRemaining - delta);
      } else {
        const step = delta * BASE_SPEED * speedMultiplier;
        const before = distance;
        const after = wrap(distance + step, trackLength);
        if (crossingStation(before, after, stationDistance, trackLength)) {
          distance = stationDistance;
          dwellRemaining = DWELL_SECONDS;
        } else {
          distance = after;
          travelDistance = step;
        }
      }
      if (travelDistance > 0) {
        syncVehicles(travelDistance);
      }
    }

    group.updateMatrixWorld(true);
    const chimney = locomotive.chimney;
    chimney.getWorldPosition(chimneyOrigin);
    curve.getTangentAt(wrap(distance, trackLength) / trackLength, currentTangent);
    const moving = !paused && dwellRemaining === 0;
    smoke.update(delta, chimneyOrigin, currentTangent, moving, random);
    if (paused) {
      for (const puff of smoke.sprites) {
        if (puff.active) puff.sprite.visible = true;
      }
    }
  }

  function reset() {
    distance = startDistance;
    dwellRemaining = 0;
    wheelSpin = 0;
    smoke.clear();
    syncVehicles(0);
  }

  function setNight(nightAmount) {
    materials.window.emissiveIntensity = 0.04 + nightAmount * 1.45;
    materials.headlight.emissiveIntensity = 1.5 + nightAmount * 1.8;
    headlight.intensity = nightAmount * 5.5;
    headlightGlowMaterial.opacity = nightAmount * 0.68;
    headlightGlow.visible = nightAmount > 0.02;
  }

  reset();
  group.updateMatrixWorld(true);
  return {
    group,
    smoke,
    materials,
    vehicles: vehicles.map((vehicle) => vehicle.group),
    update,
    reset,
    setNight,
    get distance() {
      return distance;
    },
    get dwellRemaining() {
      return dwellRemaining;
    },
    get isDwelling() {
      return dwellRemaining > 0;
    },
    get stationDistance() {
      return stationDistance;
    },
    get startDistance() {
      return startDistance;
    },
    get trackLength() {
      return trackLength;
    },
    get speedBase() {
      return BASE_SPEED;
    },
    get wheelSpin() {
      return wheelSpin;
    },
  };
}
