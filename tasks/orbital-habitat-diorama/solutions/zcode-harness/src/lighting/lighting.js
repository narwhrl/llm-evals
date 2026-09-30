import * as THREE from 'three';
import { createSunShaft } from './sunShaft.js';

/** All physical lights, with state-driven fades and orbit-driven sunlight. */
export function createLighting(ctx) {
  const { scene, clock, bloom, renderer } = ctx;
  const anchors = scene.userData.furnitureLightPositions;
  const lights = [];
  function point(name, color, intensity, distance, x, y, z, anchor) {
    const light = new THREE.PointLight(color, intensity, distance, 2);
    light.name = name;
    if (anchor) light.position.copy(anchor);
    else light.position.set(x, y, z);
    scene.add(light);
    lights.push(light);
    return light;
  }
  const sun = new THREE.DirectionalLight(0xfff1dc, 5.5 * clock.sunFactor);
  sun.name = 'orbitalSun';
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 2048);
  sun.shadow.bias = -0.00015;
  sun.shadow.normalBias = 0.012;
  sun.shadow.radius = 0.5;
  // All beam casters are stationary. Refresh only after sub-texel sun motion (including seeks).
  sun.shadow.autoUpdate = false;
  sun.shadow.needsUpdate = true;
  const shadowDirection = new THREE.Vector3();
  const shadowCamera = sun.shadow.camera;
  shadowCamera.near = 0.5;
  shadowCamera.far = 25;
  // Project the cabin interior into light space; 4096 keeps floor texels below 3 mm.
  const apertureCorners = [];
  for (const x of [-4.2, 4.2]) for (const y of [-0.2, 2.7]) for (const z of [-2.2, 2.1]) {
    apertureCorners.push(new THREE.Vector3(x, y, z));
  }
  const lightPoint = new THREE.Vector3();
  function fitShadow() {
    shadowCamera.position.copy(sun.position);
    shadowCamera.lookAt(sun.target.position);
    shadowCamera.updateMatrixWorld();
    let left = Infinity, right = -Infinity, bottom = Infinity, top = -Infinity;
    for (const p of apertureCorners) {
      lightPoint.copy(p).applyMatrix4(shadowCamera.matrixWorldInverse);
      left = Math.min(left, lightPoint.x); right = Math.max(right, lightPoint.x);
      bottom = Math.min(bottom, lightPoint.y); top = Math.max(top, lightPoint.y);
    }
    shadowCamera.left = left - 0.05; shadowCamera.right = right + 0.05;
    shadowCamera.bottom = bottom - 0.05; shadowCamera.top = top + 0.05;
    shadowCamera.updateProjectionMatrix();
  }
  sun.target.position.set(0, 1.0, -0.5);
  scene.add(sun, sun.target);
  const strip = [];
  for (let i = 0; i < 3; i++) {
    strip.push(point(`floorStripLight-${i}`, 0xffe2b8,
      ctx.state.nightCruise ? 0 : 0.8, 3.1, (i - 1) * 2.65, 0.32, 0));
  }
  const reading = point('readingLight', 0xffb45a, 0.9, 2.5,
    -3.2, 1.85, -1.5, anchors?.reading);
  const screen = point('screenLight', 0x4fd6ff, 0.25, 1.2,
    1.12, 1.0, -1.34, anchors?.laptop);
  const plantActive = () => ctx.state.plantLight && (!ctx.state.nightCruise || ctx.state.plantLightOverride);
  const grow = point('plantLight', 0xd06bff, plantActive() ? 0.8 : 0,
    1.8, -1.9, 1.78, -1.7, anchors?.grow);
  const earthRim = new THREE.SpotLight(0x6fa8ff, 0.4, 3.8, 0.92, 0.72, 2);
  earthRim.name = 'earthshine';
  earthRim.position.set(1.33, 1.5, -2.65);
  earthRim.target.position.set(1.33, 1.32, -1.35);
  scene.add(earthRim, earthRim.target);
  const hemi = new THREE.HemisphereLight(0x9fb4ff, 0x2a2420, 0.45);
  hemi.name = 'quietFill';
  const bounce = new THREE.AmbientLight(0xffefd8, 1.2 * clock.sunFactor);
  bounce.name = 'sunlitCabinBounce';
  scene.add(hemi, bounce);
  const shaft = createSunShaft(ctx);
  let cruise = ctx.state.nightCruise;
  let floorStrength = cruise ? 0 : 1;
  let plantStrength = plantActive() ? 1 : 0;
  ctx.onState('nightCruise', (value) => { cruise = value; });
  bloom.radius = 0.55;
  bloom.threshold = 0.82;
  function update(dt = 0, t = clock.elapsed) {
    const k = 1 - Math.exp(-dt / 0.4);
    floorStrength += ((cruise ? 0 : 1) - floorStrength) * k;
    plantStrength += ((plantActive() ? 1 : 0) - plantStrength) * k;
    const sunrise = (17.0 + clock.glare * 8.0) * clock.sunFactor
      + clock.glare * 9.0;
    if (clock.sunFactor > 0 && shadowDirection.distanceToSquared(clock.sunDir) > 0.00018 ** 2) {
      sun.shadow.needsUpdate = true;
      shadowDirection.copy(clock.sunDir);
    }
    sun.position.copy(clock.sunDir).multiplyScalar(12).add(sun.target.position);
    fitShadow();
    sun.intensity += (sunrise - sun.intensity) * k;
    for (let i = 0; i < strip.length; i++) strip[i].intensity = 0.8 * floorStrength;
    reading.intensity = 0.9;
    screen.intensity = 0.25;
    grow.intensity = 0.8 * plantStrength * (1 + Math.sin(t * Math.PI * 0.4) * 0.15);
    earthRim.intensity += (0.4 + clock.nightFactor * 0.8 - earthRim.intensity) * k;
    // Day fill makes the whole cabin read bright (舱内通亮); night values (sunFactor 0) are unchanged.
    const fill = cruise ? 0.07 + clock.sunFactor * 0.45 : 0.14 + clock.sunFactor * 0.95;
    hemi.intensity += (fill - hemi.intensity) * k;
    bounce.intensity += (2.3 * clock.sunFactor - bounce.intensity) * k;
    const exposure = 1 + clock.sunFactor * 0.12 + clock.glare * 0.35; // day lift; night (sunFactor 0) unchanged
    renderer.toneMappingExposure += (exposure - renderer.toneMappingExposure) * k;
    bloom.strength += (0.16 + clock.glare * 0.65 - bloom.strength) * k;
    bloom.radius = 0.55 - clock.glare * 0.30;
    bloom.threshold += (1.2 - clock.glare * 0.25 - bloom.threshold) * k;
    shaft.update(sun.intensity / 17); // keep the additive shaft as subtle as before
  }
  update(0);
  return { update, sun, lights };
}
