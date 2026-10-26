import * as THREE from 'three';
import { BASE_HALF } from './layout.js';

/**
 * Night lighting rig.
 *
 * The key is a cool moon/sky fill from the north-west, the store's warm interior
 * spills through the glass, and a handful of small point lights sit under the
 * lamps and neon signage. Shadows come only from the key light so the cost stays
 * flat, and the shadow map is refreshed on demand rather than every frame.
 */
export function buildLighting(scene) {
  const hemi = new THREE.HemisphereLight(0x5f7fb8, 0x14161f, 1.05);
  scene.add(hemi);

  const moon = new THREE.DirectionalLight(0xa8c4f0, 1.35);
  moon.position.set(-9, 12.5, 7.5);
  moon.target.position.set(0, 1, -0.6);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -7.5;
  moon.shadow.camera.right = 7.5;
  moon.shadow.camera.top = 7.5;
  moon.shadow.camera.bottom = -7.5;
  moon.shadow.camera.near = 2;
  moon.shadow.camera.far = 34;
  moon.shadow.bias = -0.0009;
  moon.shadow.normalBias = 0.022;
  moon.shadow.radius = 2.4;
  scene.add(moon);
  scene.add(moon.target);

  // Cool rim from the opposite side keeps the silhouette readable at night.
  const rim = new THREE.DirectionalLight(0x6f8fd0, 0.55);
  rim.position.set(8.5, 6.5, -8.5);
  scene.add(rim);

  // Warm wash spilling out of the storefront onto the wet sidewalk. This sits
  // outside the glass and is kept low: a strong light here reaches through the
  // glazing and blows out the checkout counter behind it.
  const storeSpill = new THREE.PointLight(0xffd9a0, 6.5, 8.2, 2);
  storeSpill.position.set(0.3, 1.9, 2.55);
  scene.add(storeSpill);

  // Street lamp pools.
  const lampA = new THREE.PointLight(0xffe3b0, 9.5, 6.4, 2);
  lampA.position.set(-2.5, 4.15, 1.1);
  scene.add(lampA);

  const lampB = new THREE.PointLight(0xffe3b0, 7.5, 5.8, 2);
  lampB.position.set(-1.9, 4.15, -3.4);
  scene.add(lampB);

  // Cool neon bounce from the vending machines.
  const vendingGlow = new THREE.PointLight(0xbfe0ff, 3.4, 2.6, 2);
  vendingGlow.position.set(3.05, 1.35, 2.15);
  scene.add(vendingGlow);

  // Service bulb over the alley back door. Without it the neighbouring wall
  // falls into pure black from the default camera.
  const alleyLight = new THREE.PointLight(0xffd8a0, 3.2, 3.6, 2);
  alleyLight.position.set(3.18, 2.72, -1.55);
  scene.add(alleyLight);

  const flickerLight = new THREE.PointLight(0xff7a86, 2.2, 3.4, 2);
  flickerLight.position.set(-1.5, 3.3, 2.6);
  scene.add(flickerLight);

  const baseAmbient = {
    hemi: hemi.intensity,
    spill: storeSpill.intensity,
    flicker: flickerLight.intensity,
  };

  // Deterministic flicker pattern: brief, shallow, and clearly restrained.
  const flickerPattern = [
    [0.0, 1.0],
    [7.4, 0.22],
    [7.62, 1.0],
    [11.2, 0.62],
    [11.45, 1.0],
    [23.8, 0.35],
    [24.05, 0.9],
    [24.28, 0.5],
    [24.5, 1.0],
  ];

  return {
    moon,
    hemi,
    storeSpill,
    lampA,
    lampB,
    vendingGlow,
    alleyLight,
    flickerLight,
    flickerPattern,
    update(dt, elapsed) {
      // Sign flicker drives both the point light and the emissive signage.
      let value = 1;
      for (let i = flickerPattern.length - 1; i >= 0; i -= 1) {
        if (elapsed >= flickerPattern[i][0]) {
          value = flickerPattern[i][1];
          break;
        }
      }
      flickerLight.intensity = baseAmbient.flicker * value;
      this.flicker = value;
    },
  };
}
