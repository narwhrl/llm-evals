import * as THREE from 'three';
import { basic, materials } from './lib.js';

function randomGenerator(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createRain(parent, random) {
  const count = 760;
  const positions = new Float32Array(count * 6);
  const drops = [];
  for (let i = 0; i < count; i += 1) {
    const x = -14.7 + random() * 29.4;
    const z = -14.7 + random() * 29.4;
    let floor = 0.18;
    if (x > -11.5 && x < 3.6 && z > -7.7 && z < 2.65) floor = 6.85;
    else if (x > 5.0 && x < 7.75 && z > -7.75 && z < -1.65) floor = 5.95;
    else if (x > -10.6 && x < -2.8 && z > -13.1 && z < -10.0) floor = 3.72;
    drops.push({
      x, z, floor,
      y: floor + random() * (18.5 - floor),
      speed: 9 + random() * 6,
      length: 0.25 + random() * 0.42,
    });
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  const rain = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
    color: 0xa4c3e0,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  rain.frustumCulled = false;
  rain.renderOrder = 4;
  parent.add(rain);
  return (delta) => {
    drops.forEach((drop, index) => {
      drop.y -= drop.speed * delta;
      if (drop.y < drop.floor) drop.y = 17 + random() * 3;
      const offset = index * 6;
      positions[offset] = drop.x;
      positions[offset + 1] = drop.y;
      positions[offset + 2] = drop.z;
      positions[offset + 3] = drop.x - 0.075;
      positions[offset + 4] = drop.y - drop.length;
      positions[offset + 5] = drop.z + 0.035;
    });
    geometry.attributes.position.needsUpdate = true;
  };
}

function createEaveDrips(parent, random) {
  const count = 48;
  const positions = new Float32Array(count * 6);
  const drops = Array.from({ length: count }, (_, index) => ({
    x: -11.2 + (index / (count - 1)) * 14.45 + (random() - 0.5) * 0.13,
    z: 2.5 + random() * 0.08,
    y: 0.3 + random() * 4.35,
    speed: 4.5 + random() * 3.5,
    length: 0.1 + random() * 0.26,
    delay: random() * 2,
  }));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  const lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
    color: 0xc1deeb, transparent: true, opacity: 0.47, depthWrite: false,
  }));
  lines.frustumCulled = false;
  parent.add(lines);
  return (delta) => {
    drops.forEach((drop, index) => {
      if (drop.delay > 0) drop.delay -= delta;
      else drop.y -= drop.speed * delta;
      if (drop.y < 0.25) {
        drop.y = 4.55;
        drop.delay = random() * 1.8;
      }
      const y = drop.delay > 0 ? 4.55 : drop.y;
      const offset = index * 6;
      positions[offset] = drop.x;
      positions[offset + 1] = y;
      positions[offset + 2] = drop.z;
      positions[offset + 3] = drop.x - 0.012;
      positions[offset + 4] = y - drop.length;
      positions[offset + 5] = drop.z;
    });
    geometry.attributes.position.needsUpdate = true;
  };
}

function createGlassRunoff(parent, random) {
  const count = 58;
  const positions = new Float32Array(count * 6);
  const streaks = Array.from({ length: count }, () => ({
    x: -10.75 + random() * 10.45,
    y: 0.65 + random() * 3.55,
    speed: 0.16 + random() * 0.42,
    length: 0.12 + random() * 0.48,
  }));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  const lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
    color: 0xd0eef0,
    transparent: true,
    opacity: 0.21,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  lines.frustumCulled = false;
  lines.renderOrder = 5;
  parent.add(lines);
  return (delta) => {
    streaks.forEach((streak, index) => {
      streak.y -= streak.speed * delta;
      if (streak.y < 0.65) {
        streak.y = 4.25 + random() * 0.2;
        streak.x = -10.75 + random() * 10.45;
      }
      const offset = index * 6;
      positions[offset] = streak.x;
      positions[offset + 1] = streak.y;
      positions[offset + 2] = 1.092;
      positions[offset + 3] = streak.x - 0.015;
      positions[offset + 4] = streak.y - streak.length;
      positions[offset + 5] = 1.092;
    });
    geometry.attributes.position.needsUpdate = true;
  };
}

function createPuddles(parent, random) {
  const puddles = [
    { p: [-11.7, 0.165, 10.3], s: [1.75, 0.82] },
    { p: [-7.2, 0.165, 13.25], s: [1.25, 0.6] },
    { p: [-0.7, 0.165, 9.65], s: [1.45, 0.68] },
    { p: [2.75, 0.165, 13.1], s: [1.15, 0.52] },
    { p: [10.7, 0.165, 12.8], s: [1.45, 0.7] },
    { p: [12.6, 0.165, -2.8], s: [0.8, 1.55] },
    { p: [10.2, 0.165, -8.4], s: [1.15, 0.72] },
    { p: [11.5, 0.165, 0.6], s: [0.75, 1.2] },
    { p: [4.27, 0.275, -2.2], s: [0.57, 1.0] },
    { p: [-0.25, 0.238, 4.85], s: [1.1, 0.52] },
    { p: [-8.1, 0.238, 2.75], s: [1.25, 0.55] },
    { p: [6.35, 0.238, 2.4], s: [0.8, 0.48] },
  ];
  const circle = new THREE.CircleGeometry(1, 40);
  puddles.forEach(({ p, s }, index) => {
    const puddle = new THREE.Mesh(circle, materials.wet);
    puddle.position.set(...p);
    puddle.scale.set(s[0], s[1], 1);
    puddle.rotation.set(-Math.PI / 2, 0, (index * 1.7) % Math.PI);
    puddle.renderOrder = 1;
    parent.add(puddle);
  });

  const ringGeometry = new THREE.RingGeometry(0.82, 1, 32);
  const ripples = Array.from({ length: 26 }, (_, index) => {
    const puddle = puddles[index % puddles.length];
    const material = basic(0xb4d2db, {
      transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false,
    });
    const mesh = new THREE.Mesh(ringGeometry, material);
    mesh.position.set(
      puddle.p[0] + (random() - 0.5) * puddle.s[0] * 0.8,
      puddle.p[1] + 0.018,
      puddle.p[2] + (random() - 0.5) * puddle.s[1] * 0.8,
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.renderOrder = 3;
    parent.add(mesh);
    return { mesh, material, phase: random(), speed: 0.42 + random() * 0.35 };
  });
  return (delta) => {
    ripples.forEach((ripple) => {
      ripple.phase = (ripple.phase + delta * ripple.speed) % 1;
      const scale = 0.035 + ripple.phase * 0.43;
      ripple.mesh.scale.set(scale, scale, 1);
      ripple.material.opacity = Math.sin(ripple.phase * Math.PI) * (1 - ripple.phase) * 0.34;
    });
  };
}

export function buildEffects(parent) {
  const random = randomGenerator(31012026);
  const updateRain = createRain(parent, random);
  const updateDrips = createEaveDrips(parent, random);
  const updateRunoff = createGlassRunoff(parent, random);
  const updatePuddles = createPuddles(parent, random);
  return (delta) => {
    updateRain(delta);
    updateDrips(delta);
    updateRunoff(delta);
    updatePuddles(delta);
  };
}
