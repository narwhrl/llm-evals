import * as THREE from 'three';
import { mulberry32 } from './materials.js';

function createSteamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 2, 64, 64, 60);
  gradient.addColorStop(0, 'rgba(226,239,241,.72)');
  gradient.addColorStop(0.38, 'rgba(190,211,216,.32)');
  gradient.addColorStop(1, 'rgba(160,190,198,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  context.globalCompositeOperation = 'destination-out';
  for (let index = 0; index < 22; index += 1) {
    context.fillStyle = `rgba(0,0,0,${0.08 + Math.random() * 0.12})`;
    context.beginPath();
    context.arc(Math.random() * 128, Math.random() * 128, 4 + Math.random() * 14, 0, Math.PI * 2);
    context.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createStreakTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, 64, 256);
  const random = mulberry32(721);
  for (let index = 0; index < 17; index += 1) {
    const x = random() * 64;
    const y = random() * 256;
    const length = 16 + random() * 58;
    const gradient = context.createLinearGradient(0, y, 0, y + length);
    gradient.addColorStop(0, 'rgba(174,218,231,0)');
    gradient.addColorStop(0.45, `rgba(190,226,237,${0.14 + random() * 0.17})`);
    gradient.addColorStop(1, 'rgba(174,218,231,0)');
    context.fillStyle = gradient;
    context.fillRect(x, y, 0.7 + random() * 1.6, length);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function addLightCone(parent, start, end, radius, color) {
  const from = new THREE.Vector3(...start);
  const to = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(to, from);
  const length = direction.length();
  const geometry = new THREE.ConeGeometry(radius, length, 24, 1, true);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.028,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  material.userData.outlineParameters = { visible: false };
  const cone = new THREE.Mesh(geometry, material);
  cone.position.copy(from).add(to).multiplyScalar(0.5);
  cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize().multiplyScalar(-1));
  cone.renderOrder = 1;
  parent.add(cone);
  return cone;
}

export function createWeather(scene, world, materials, lights, regions) {
  const random = mulberry32(4127);
  const weather = new THREE.Group();
  weather.name = 'rain-night-atmosphere';
  world.add(weather);

  const rainCount = 620;
  const rainPositions = new Float32Array(rainCount * 6);
  const rainDrops = Array.from({ length: rainCount }, () => ({
    x: (random() - 0.5) * 31.5,
    y: 1 + random() * 19,
    z: (random() - 0.5) * 31.5,
    speed: 9.5 + random() * 8.5,
    length: 0.22 + random() * 0.38,
  }));
  const rainGeometry = new THREE.BufferGeometry();
  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rain = new THREE.LineSegments(rainGeometry, materials.rain);
  rain.frustumCulled = false;
  weather.add(rain);

  const rippleCenters = regions.puddles;
  const ripples = [];
  const rippleGeometry = new THREE.RingGeometry(0.12, 0.145, 24);
  for (let index = 0; index < 20; index += 1) {
    const center = rippleCenters[index % rippleCenters.length];
    const material = materials.ripple.clone();
    material.userData.outlineParameters = { visible: false };
    const ring = new THREE.Mesh(rippleGeometry, material);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(
      center.x + (random() - 0.5) * 1.45,
      0.39 + (index % 3) * 0.001,
      center.z + (random() - 0.5) * 0.65,
    );
    ring.userData.phase = random();
    ring.userData.speed = 0.42 + random() * 0.32;
    ring.scale.setScalar(0.4);
    weather.add(ring);
    ripples.push(ring);
  }

  const dripOrigins = [
    [-12.7, 5.05, -13.2, 0.18],
    [-3.7, 5.05, -13.2, 0.18],
    [-12.7, 5.05, -4.9, 0.18],
    [-3.7, 5.05, -4.9, 0.18],
    [-11.2, 3.15, -4.42, 0.14],
    [-5.0, 3.15, -4.42, 0.14],
    [4.95, 2.58, -10.0, 0.08],
    [8.2, 2.58, -10.0, 0.08],
    [5.0, 6.92, -10.0, 0.08],
    [8.15, 6.92, -10.0, 0.08],
    [10.25, 2.43, -11.2, 0.07],
    [5.1, 4.8, -10.0, 0.08],
    [8.1, 4.8, -10.0, 0.08],
    [5.7, 6.85, -9.0, 0.05],
    [11.5, 6.7, -9.1, 0.05],
    [11.2, 6.7, -7.0, 0.05],
    [0.2, 15.35, 15.25, 0.04],
    [-9.0, 15.35, 15.25, 0.04],
  ];
  const dripCount = 76;
  const dripPositions = new Float32Array(dripCount * 6);
  const drips = Array.from({ length: dripCount }, (_, index) => {
    const origin = dripOrigins[index % dripOrigins.length];
    const originX = origin[0] + (random() - 0.5) * origin[3] * 2;
    return {
      x: originX,
      originX,
      y: 0.5 + random() * (origin[1] - 0.5),
      z: origin[2] + (random() - 0.5) * origin[3] * 2,
      top: origin[1],
      speed: 2.8 + random() * 2.5,
      length: 0.12 + random() * 0.22,
    };
  });
  const dripGeometry = new THREE.BufferGeometry();
  dripGeometry.setAttribute('position', new THREE.BufferAttribute(dripPositions, 3));
  const dripMesh = new THREE.LineSegments(dripGeometry, materials.rain.clone());
  dripMesh.material.opacity = 0.55;
  dripMesh.material.userData.outlineParameters = { visible: false };
  weather.add(dripMesh);

  const streakTexture = createStreakTexture();
  streakTexture.repeat.set(1, 1.7);
  const streakMaterial = new THREE.MeshBasicMaterial({
    map: streakTexture,
    color: 0x9ec9d6,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  streakMaterial.userData.outlineParameters = { visible: false };
  const streakData = [
    { position: [-2.94, 2.7, -8.7], size: [0.65, 3.8], rotation: [0, Math.PI / 2, 0] },
    { position: [-12.95, 2.9, -8.0], size: [0.75, 4.0], rotation: [0, -Math.PI / 2, 0] },
    { position: [11.67, 2.3, -8.2], size: [0.72, 3.0], rotation: [0, Math.PI / 2, 0] },
    { position: [8.1, 4.6, -11.55], size: [1.6, 1.8], rotation: [0, 0, 0] },
    { position: [5.32, 3.2, -12.45], size: [0.85, 2.6], rotation: [0, 0, 0] },
    { position: [8.1, 5.6, -11.58], size: [1.6, 1.7], rotation: [0, 0, 0] },
  ];
  for (const streak of streakData) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(streak.size[0], streak.size[1]), streakMaterial);
    mesh.position.set(...streak.position);
    mesh.rotation.set(...streak.rotation);
    mesh.renderOrder = 2;
    weather.add(mesh);
  }

  const steamTexture = createSteamTexture();
  const steamSources = [
    regions.warehouse.steamOrigin,
    regions.guardhouse.steamOrigin,
    new THREE.Vector3(-3.0, 0.9, -12.9),
    new THREE.Vector3(14.85, 0.9, 3.0),
  ];
  const steam = [];
  for (let index = 0; index < 12; index += 1) {
    const origin = steamSources[index % steamSources.length];
    const material = new THREE.SpriteMaterial({
      map: steamTexture,
      color: 0xc7dadd,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    });
    material.userData.outlineParameters = { visible: false };
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(origin);
    sprite.scale.set(0.5, 0.7, 1);
    sprite.userData.origin = origin.clone();
    sprite.userData.offset = random();
    sprite.userData.speed = 0.08 + random() * 0.08;
    weather.add(sprite);
    steam.push(sprite);
  }

  const warmCone = addLightCone(weather, [12.4, 4.0, -3.45], [9.6, 0.35, -3.45], 2.1, 0xffbd69);
  const searchCone = addLightCone(weather, [7.4, 4.65, 12.75], [0.5, 0.4, 2.0], 3.4, 0xaedfff);
  searchCone.material.opacity = 0.018;

  const lightning = {
    strength: 0,
    next: 4.2 + random() * 5.5,
    baseBackground: new THREE.Color(0x071019),
    flashBackground: new THREE.Color(0x8ebbd2),
  };
  scene.background = lightning.baseBackground.clone();
  scene.fog = new THREE.FogExp2(0x0b1720, 0.0078);

  function update(time, delta) {
    for (let index = 0; index < rainCount; index += 1) {
      const drop = rainDrops[index];
      drop.y -= drop.speed * delta;
      drop.x -= delta * 0.72;
      if (drop.y < 0.25 || drop.x < -16.2) {
        drop.x = (random() - 0.5) * 31.5;
        drop.y = 18 + random() * 6;
        drop.z = (random() - 0.5) * 31.5;
      }
      const offset = index * 6;
      rainPositions[offset] = drop.x;
      rainPositions[offset + 1] = drop.y;
      rainPositions[offset + 2] = drop.z;
      rainPositions[offset + 3] = drop.x + drop.length * 0.15;
      rainPositions[offset + 4] = drop.y + drop.length;
      rainPositions[offset + 5] = drop.z + 0.025;
    }
    rainGeometry.attributes.position.needsUpdate = true;

    for (const ring of ripples) {
      ring.userData.phase = (ring.userData.phase + delta * ring.userData.speed) % 1;
      const phase = ring.userData.phase;
      const scale = 0.45 + phase * 3.6;
      ring.scale.setScalar(scale);
      ring.material.opacity = (1 - phase) * 0.24;
    }

    for (let index = 0; index < dripCount; index += 1) {
      const drip = drips[index];
      drip.y -= drip.speed * delta;
      if (drip.y < 0.42) {
        drip.y = drip.top;
        drip.x = drip.originX;
      }
      const offset = index * 6;
      dripPositions[offset] = drip.x;
      dripPositions[offset + 1] = drip.y;
      dripPositions[offset + 2] = drip.z;
      dripPositions[offset + 3] = drip.x - 0.025;
      dripPositions[offset + 4] = drip.y + drip.length;
      dripPositions[offset + 5] = drip.z;
    }
    dripGeometry.attributes.position.needsUpdate = true;

    streakTexture.offset.y = (streakTexture.offset.y - delta * 0.19) % 1;
    streakMaterial.opacity = 0.29 + Math.sin(time * 1.8) * 0.045;

    for (const sprite of steam) {
      sprite.userData.offset = (sprite.userData.offset + delta * sprite.userData.speed) % 1;
      const phase = sprite.userData.offset;
      sprite.position.copy(sprite.userData.origin);
      sprite.position.y += phase * 2.5;
      sprite.position.x += Math.sin(time * 0.8 + sprite.id) * phase * 0.18;
      sprite.position.z += Math.cos(time * 0.65 + sprite.id) * phase * 0.12;
      const size = 0.35 + phase * 1.25;
      sprite.scale.set(size * 0.75, size, 1);
      sprite.material.opacity = Math.sin(phase * Math.PI) * 0.12;
    }

    if (time > lightning.next) {
      lightning.strength = 1;
      lightning.next = time + 8 + random() * 10;
    }
    lightning.strength = Math.max(0, lightning.strength - delta * 3.6);
    const flicker = lightning.strength * (0.72 + Math.sin(time * 42) * 0.28);
    lights.applyLightning(flicker);
    scene.background.copy(lightning.baseBackground).lerp(lightning.flashBackground, flicker * 0.28);
    warmCone.material.opacity = 0.027 + Math.sin(time * 7.2) * 0.004;
  }

  return { update, rain, ripples, steam, weather };
}
