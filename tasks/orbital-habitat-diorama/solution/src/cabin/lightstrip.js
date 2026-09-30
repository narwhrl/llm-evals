import * as THREE from 'three';
import { mesh, box, boltBatch } from './common.js';
import { canvasTexture } from '../textures/canvas.js';

export function buildLightstrip(ctx, parent, materials) {
  box(parent, materials.dark, 7.87, 0.025, 0.135, 0, 0.012, 0, 'lightstrip-channel');
  for (const z of [-0.071, 0.071]) {
    box(parent, materials.rim, 7.9, 0.018, 0.016, 0, 0.019, z);
  }
  const map = canvasTexture(2048, 128, (c, w, h) => {
    c.fillStyle = '#e7dac1'; c.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 32) {
      c.fillStyle = '#f6e7ca'; c.fillRect(x + 2, 18, 27, h - 36);
      c.fillStyle = '#bba88b'; c.fillRect(x, 0, 2, h);
      c.fillStyle = '#fff4d8'; c.fillRect(x + 5, 27, 21, 2);
    }
  });
  const material = new THREE.MeshStandardMaterial({ map, emissiveMap: map,
    emissive: '#ffe2b8', emissiveIntensity: 2, roughness: 0.88, metalness: 0 });
  const strip = mesh(parent, new THREE.BoxGeometry(7.78, 0.009, 0.081), material, 'floor-lightstrip');
  strip.position.set(0, 0.027, 0);
  const fixings = [];
  for (let x = -3.75; x < 4; x += 0.5) for (const z of [-0.07, 0.07]) {
    fixings.push([x, 0.032, z, -Math.PI / 2]);
  }
  boltBatch(parent, materials.steel, fixings, 0.006);
  let target = ctx.state.nightCruise ? 0 : 2;
  let strength = target;
  material.emissiveIntensity = target;
  ctx.onState('nightCruise', on => { target = on ? 0 : 2; });
  ctx.registry.addUpdatable(dt => {
    strength += (target - strength) * (1 - Math.exp(-dt * 5));
    if (Math.abs(target - strength) < 0.002) strength = target;
    // Bloom reads linear HDR before exposure. Keep the strip below its glare threshold,
    // then compensate the exposure lift; actual sunlit strip pixels still receive sunlight.
    const exposureBoost = ctx.renderer.toneMappingExposure / (1 + ctx.clock.sunFactor * 0.12);
    material.emissiveIntensity = strength / ((1 + ctx.clock.glare * 8) * Math.max(1, exposureBoost));
  });
  ctx.registry.addInteractive(strip, { id: 'lightstrip',
    onClick: () => ctx.toggleState('nightCruise') });
}
