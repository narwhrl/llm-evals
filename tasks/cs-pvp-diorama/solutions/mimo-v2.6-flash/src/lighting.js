import * as THREE from 'three';
import { LIGHT_COLORS } from './palette.js';

// Cool rain-night ambience: blue hemisphere fill + moon key light (shadow
// caster) + a dedicated flash light driven by the lightning effect.
export function buildLighting(ctx) {
  const hemi = new THREE.HemisphereLight(LIGHT_COLORS.hemiSky, LIGHT_COLORS.hemiGround, 1.6);
  ctx.group.add(hemi);

  const moon = new THREE.DirectionalLight(LIGHT_COLORS.moon, 4.2);
  moon.position.set(34, 52, -26);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -42;
  moon.shadow.camera.right = 42;
  moon.shadow.camera.top = 42;
  moon.shadow.camera.bottom = -42;
  moon.shadow.camera.near = 1;
  moon.shadow.camera.far = 140;
  moon.shadow.camera.updateProjectionMatrix();
  moon.shadow.bias = -0.0004;
  moon.shadow.normalBias = 0.03;
  ctx.group.add(moon);
  ctx.group.add(moon.target);

  const flash = new THREE.DirectionalLight(0xcfe0ff, 0);
  flash.position.set(-40, 40, -60);
  ctx.group.add(flash);
  ctx.flashLight = flash;

  // faint warm bounce so pure toon shadows are not crushed to black
  const bounce = new THREE.AmbientLight(0x36455c, 1.5);
  ctx.group.add(bounce);
}
