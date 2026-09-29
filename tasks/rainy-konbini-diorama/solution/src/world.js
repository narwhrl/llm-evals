import * as THREE from 'three';
import { buildBase } from './parts/base.js';
import { buildStore } from './parts/store.js';
import { buildInterior } from './parts/interior.js';
import { buildStreet } from './parts/street.js';
import { buildProps } from './parts/props.js';
import { buildWeather } from './parts/weather.js';

function warm(scene, x, y, z, intensity, distance) {
  const l = new THREE.PointLight('#ffd7a8', intensity, distance, 2);
  l.position.set(x, y, z);
  scene.add(l);
  return l;
}

export function createWorld(scene) {
  // cool rainy night key, warm practicals below
  scene.add(new THREE.HemisphereLight('#3d5288', '#0d1220', 0.85));
  scene.add(new THREE.AmbientLight('#293459', 0.5));
  const moon = new THREE.DirectionalLight('#9fbbff', 1.15);
  moon.position.set(-9, 17, 13);
  scene.add(moon);
  const back = new THREE.DirectionalLight('#4f6fc4', 0.55);
  back.position.set(11, 9, -13);
  scene.add(back);

  const base = buildBase(scene);
  const store = buildStore(scene);
  buildInterior(scene);
  const street = buildStreet(scene);
  buildProps(scene);

  // shop lighting: bright, warm, spilling through the glazing
  warm(scene, -5.2, 2.55, -2.1, 26, 13);
  warm(scene, -1.6, 2.55, -3.4, 22, 12);
  warm(scene, -6.4, 2.5, -4.9, 16, 10);
  warm(scene, -0.4, 2.5, -1.2, 16, 9);
  warm(scene, -3.6, 2.4, 1.5, 12, 7);

  // street light pool over the corner
  const sl = new THREE.PointLight('#ffd9a5', 42, 17, 2);
  sl.position.set(5.0, 5.4, 4.0);
  scene.add(sl);

  const weather = buildWeather(scene, {
    puddles: base.puddles,
    reflectionMats: base.reflectionMats,
    signalRefl: base.signalRefl,
    signMats: store.signMats,
    doorPanels: store.panels,
    signalHeads: street.signalHeads
  });

  return {
    update(t, dt) {
      weather.update(t, dt);
    }
  };
}
