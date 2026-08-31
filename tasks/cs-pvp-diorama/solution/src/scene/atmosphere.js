import * as THREE from 'three';

function randomStream(seed = 45817) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function createWetGround() {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x304149,
    roughness: 0.14,
    metalness: 0.38,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.65,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(38.55, 38.55), material);
  mesh.name = 'real-time-wet-concrete-reflection-surface';
  mesh.position.y = 0.17;
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = -1;
  return mesh;
}

function createReflectionTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 128, 3, 64, 128, 124);
  gradient.addColorStop(0, 'rgba(255, 255, 255, .9)');
  gradient.addColorStop(0.24, 'rgba(255, 255, 255, .42)');
  gradient.addColorStop(0.62, 'rgba(255, 255, 255, .1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createTacticalReflections() {
  const texture = createReflectionTexture();
  const group = new THREE.Group();
  group.name = 'live-tactical-light-puddle-reflections';
  const specs = [
    { key: 'a', color: 0x9ad7f2, position: [-10.8, 0.355, -5.1], scale: [1.5, 3.6], opacity: 0.1 },
    { key: 'b', color: 0xffad52, position: [7.7, 0.355, -4.05], scale: [1.3, 3.9], opacity: 0.15 },
    { key: 'red', color: 0xff3b32, position: [-1.65, 0.355, 13.8], scale: [0.85, 2.3], opacity: 0.14 },
    { key: 'blue', color: 0x3488ff, position: [1.45, 0.355, 13.9], scale: [0.85, 2.4], opacity: 0.14 },
    { key: 'search', color: 0xc5ebff, position: [7.5, 0.355, 8.1], scale: [0.9, 4.4], opacity: 0.09 },
  ];
  const reflections = {};

  for (const spec of specs) {
    const material = new THREE.MeshBasicMaterial({
      color: spec.color,
      map: texture,
      transparent: true,
      opacity: spec.opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    mesh.name = `${spec.key}-live-light-reflection`;
    mesh.position.set(...spec.position);
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.set(spec.scale[0], spec.scale[1], 1);
    mesh.renderOrder = 4;
    reflections[spec.key] = mesh;
    group.add(mesh);
  }

  return {
    group,
    update(elapsed, policeWave) {
      reflections.a.material.opacity = 0.09 + Math.sin(elapsed * 4.1) * 0.008;
      reflections.b.material.opacity = 0.14 + Math.sin(elapsed * 2.7 + 0.8) * 0.012;
      reflections.red.material.opacity = 0.05 + policeWave * 0.16;
      reflections.blue.material.opacity = 0.05 + (1 - policeWave) * 0.17;
      reflections.search.material.opacity = 0.085 + Math.sin(elapsed * 1.2) * 0.008;
    },
  };
}

function irregularPuddleGeometry(seed) {
  const random = randomStream(seed);
  const shape = new THREE.Shape();
  const points = 11;
  for (let index = 0; index < points; index += 1) {
    const angle = (index / points) * Math.PI * 2;
    const radius = 0.72 + random() * 0.34;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function createPuddles(materials) {
  const group = new THREE.Group();
  group.name = 'irregular-road-puddles';
  const placements = [
    [-1.8, 5.3, 1.7, 0.72, 0.2],
    [1.95, 11.4, 1.2, 0.58, -0.12],
    [-14.4, 2.2, 1.45, 0.62, 0.08],
    [-14.9, -5.8, 1.15, 0.52, -0.2],
    [14.6, 5.9, 1.5, 0.62, 0.15],
    [9.1, -4.2, 1.25, 0.65, -0.08],
    [-8.25, 11.8, 1.2, 0.54, 0.12],
    [5.1, 13.1, 1.42, 0.48, 0.05],
    [0.8, -4.2, 0.95, 0.48, -0.14],
  ];
  for (let index = 0; index < placements.length; index += 1) {
    const [x, z, scaleX, scaleZ, angle] = placements[index];
    const puddle = new THREE.Mesh(
      irregularPuddleGeometry(120 + index * 37),
      materials.puddle,
    );
    puddle.name = 'light-reflecting-puddle';
    puddle.position.set(x, 0.34, z);
    puddle.rotation.set(-Math.PI / 2, 0, angle);
    puddle.scale.set(scaleX, scaleZ, 1);
    puddle.renderOrder = 2;
    group.add(puddle);
  }
  return group;
}

function createRain() {
  const count = 620;
  const positions = new Float32Array(count * 6);
  const speeds = new Float32Array(count);
  const lengths = new Float32Array(count);
  const random = randomStream(73129);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 6;
    const x = -18.65 + random() * 37.3;
    const y = 0.55 + random() * 16.5;
    const z = -18.65 + random() * 37.3;
    const length = 0.28 + random() * 0.65;
    speeds[index] = 8.5 + random() * 7.5;
    lengths[index] = length;
    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;
    positions[offset + 3] = x + 0.08;
    positions[offset + 4] = y - length;
    positions[offset + 5] = z + 0.025;
  }

  const geometry = new THREE.BufferGeometry();
  const attribute = new THREE.BufferAttribute(positions, 3);
  attribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', attribute);
  const material = new THREE.LineBasicMaterial({
    color: 0xb8d7e1,
    transparent: true,
    opacity: 0.27,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const lines = new THREE.LineSegments(geometry, material);
  lines.name = 'continuous-fine-rain-streaks';
  lines.frustumCulled = false;
  lines.renderOrder = 7;

  return {
    object: lines,
    update(delta) {
      for (let index = 0; index < count; index += 1) {
        const offset = index * 6;
        let top = positions[offset + 1] - speeds[index] * delta;
        if (top < 0.35) top += 16.8;
        positions[offset + 1] = top;
        positions[offset + 4] = top - lengths[index];
      }
      attribute.needsUpdate = true;
    },
  };
}

function createRoofDrips() {
  const anchors = [];
  for (const x of [-14.3, -12.4, -10.4, -8.35, -6.8]) {
    anchors.push([x, 5.7, -3.45]);
  }
  for (const x of [8.7, 9.9, 11.15, 12.5, 13.7]) {
    anchors.push([x, 5.72, -7.3]);
  }
  for (const z of [-17.8, -16.3, -14.7]) anchors.push([9.55, 2.9, z]);
  anchors.push([-4.95, 2.8, 4.35], [4.95, 2.8, 3.25]);

  const positions = new Float32Array(anchors.length * 6);
  const phases = new Float32Array(anchors.length);
  for (let index = 0; index < anchors.length; index += 1) {
    phases[index] = index / anchors.length;
  }
  const geometry = new THREE.BufferGeometry();
  const attribute = new THREE.BufferAttribute(positions, 3);
  attribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', attribute);
  const material = new THREE.LineBasicMaterial({
    color: 0xc8e4ea,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
    toneMapped: false,
  });
  const lines = new THREE.LineSegments(geometry, material);
  lines.name = 'continuous-roof-edge-drips';
  lines.frustumCulled = false;

  return {
    object: lines,
    update(elapsed) {
      for (let index = 0; index < anchors.length; index += 1) {
        const [x, y, z] = anchors[index];
        const progress = (elapsed * 1.45 + phases[index]) % 1;
        const offset = index * 6;
        positions[offset] = x;
        positions[offset + 1] = y - progress * 1.25;
        positions[offset + 2] = z;
        positions[offset + 3] = x;
        positions[offset + 4] = y - progress * 1.25 - 0.18;
        positions[offset + 5] = z;
      }
      attribute.needsUpdate = true;
    },
  };
}

function createRipples() {
  const geometry = new THREE.RingGeometry(0.18, 0.21, 28);
  const placements = [
    [-1.8, 5.3],
    [1.95, 11.4],
    [-14.4, 2.2],
    [-14.9, -5.8],
    [14.6, 5.9],
    [9.1, -4.2],
    [-8.25, 11.8],
    [5.1, 13.1],
    [0.8, -4.2],
    [0.2, 7.5],
    [13.8, 2.4],
    [-15.2, 9.7],
  ];
  const ripples = placements.map(([x, z], index) => {
    const material = new THREE.MeshBasicMaterial({
      color: 0xb9d9df,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'puddle-rain-ripple';
    mesh.position.set(x, 0.365, z);
    mesh.rotation.x = -Math.PI / 2;
    mesh.userData.phase = index / placements.length;
    return mesh;
  });

  return {
    objects: ripples,
    update(elapsed) {
      for (const ripple of ripples) {
        const progress = (elapsed * 0.48 + ripple.userData.phase) % 1;
        const scale = 0.35 + progress * 2.7;
        ripple.scale.setScalar(scale);
        ripple.material.opacity = Math.sin(progress * Math.PI) * 0.22;
      }
    },
  };
}

function createSteam() {
  const count = 34;
  const positions = new Float32Array(count * 3);
  const origins = [
    [-7.7, 5.9, -11.1],
    [12.8, 5.95, -11.4],
    [-14.8, 2.3, -5.2],
  ];
  const phases = new Float32Array(count);
  const random = randomStream(1982);
  for (let index = 0; index < count; index += 1) phases[index] = random();

  const geometry = new THREE.BufferGeometry();
  const attribute = new THREE.BufferAttribute(positions, 3);
  attribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', attribute);
  const material = new THREE.PointsMaterial({
    color: 0xc4d7da,
    size: 0.42,
    transparent: true,
    opacity: 0.13,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  points.name = 'faint-white-vent-steam';
  points.frustumCulled = false;

  return {
    object: points,
    update(elapsed) {
      for (let index = 0; index < count; index += 1) {
        const origin = origins[index % origins.length];
        const progress = (elapsed * 0.09 + phases[index]) % 1;
        const offset = index * 3;
        positions[offset] = origin[0] + Math.sin(elapsed * 0.55 + index) * progress * 0.55;
        positions[offset + 1] = origin[1] + progress * 3.2;
        positions[offset + 2] = origin[2] + Math.cos(elapsed * 0.42 + index * 1.7) * progress * 0.38;
      }
      attribute.needsUpdate = true;
    },
  };
}

function unlockAnimatedObject(object) {
  if (!object) return;
  object.traverse((child) => {
    child.matrixWorldAutoUpdate = true;
  });
  object.matrixAutoUpdate = true;
}

export function createAtmosphere({ root, materials, lights, reducedMotion }) {
  const group = new THREE.Group();
  group.name = 'rain-night-dynamic-atmosphere';
  const wetGround = createWetGround();
  const tacticalReflections = createTacticalReflections();
  const rain = createRain();
  const drips = createRoofDrips();
  const ripples = createRipples();
  const steam = createSteam();
  const lightning = new THREE.DirectionalLight(0xc4eaff, 0);
  lightning.name = 'occasional-distant-lightning';
  lightning.position.set(8, 18, -10);

  group.add(
    wetGround,
    tacticalReflections.group,
    createPuddles(materials),
    rain.object,
    drips.object,
    steam.object,
    lightning,
    ...ripples.objects,
  );

  const shutter = root.getObjectByName('a-half-raised-rolling-shutter');
  const shutterBaseY = shutter?.position.y ?? 0;
  unlockAnimatedObject(shutter);
  const warmStreetLight = root.getObjectByName('b-warm-rain-halo-light');
  let previousElapsed = 0;

  return {
    group,
    update(elapsed) {
      const delta = Math.min(Math.max(elapsed - previousElapsed, 0), 0.05);
      previousElapsed = elapsed;
      if (reducedMotion) return;

      rain.update(delta);
      drips.update(elapsed);
      ripples.update(elapsed);
      steam.update(elapsed);

      lights.aLight.intensity = 23.5 + Math.sin(elapsed * 4.1) * 0.45;
      lights.bLight.intensity = 25.2 + Math.sin(elapsed * 2.7 + 0.8) * 0.7;
      const policeWave = (Math.sin(elapsed * 2.1) + 1) * 0.5;
      tacticalReflections.update(elapsed, policeWave);
      lights.ctRed.intensity = 8 + policeWave * 15;
      lights.ctBlue.intensity = 8 + (1 - policeWave) * 16;
      if (warmStreetLight) {
        warmStreetLight.intensity = 26 + Math.sin(elapsed * 7.3) * 0.45;
      }

      if (shutter) {
        const gust = Math.max(0, Math.sin(elapsed * 0.42 - 2.35));
        shutter.position.y = shutterBaseY + Math.sin(elapsed * 18) * 0.018 * gust ** 8;
        shutter.updateMatrix();
      }

      const lightningPhase = (elapsed + 7.2) % 19.6;
      let flash = 0;
      if (lightningPhase < 0.09) flash = 1 - lightningPhase / 0.09;
      else if (lightningPhase > 0.23 && lightningPhase < 0.34) {
        flash = (1 - (lightningPhase - 0.23) / 0.11) * 0.62;
      }
      lightning.intensity = flash * 5.6;
    },
    dispose() {
      wetGround.geometry.dispose();
      wetGround.material.dispose();
    },
  };
}
