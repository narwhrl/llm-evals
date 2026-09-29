import * as THREE from 'three';
import { P } from './palette.js';
import { buildBase } from './parts/base.js';
import { buildStore } from './parts/store.js';
import { buildInterior } from './parts/interior.js';
import { buildStreet } from './parts/street.js';
import { buildProps } from './parts/props.js';
import { buildWeather } from './parts/weather.js';

// Assembles the whole corner and returns a single update(t) entry point.
export function createDiorama(scene) {
  scene.fog = new THREE.FogExp2(P.fog, 0.0105);
  scene.background = new THREE.Color(P.sky);

  addLights(scene);
  addSky(scene);

  buildBase(scene);
  const store = buildStore(scene);
  buildInterior(scene);
  const street = buildStreet(scene);
  const props = buildProps(scene);
  const weather = buildWeather(scene, { store, street, props, puddles: street.puddles });

  return {
    update(time, dt) {
      weather.update(time, dt);
    },
  };
}

function addLights(scene) {
  // Cool ambient sky/ground wrap, a single moon key, and a faint fill from the
  // town beyond the frame so the shadow side is never pure black.
  const hemi = new THREE.HemisphereLight(0x47639c, 0x141a28, 0.95);
  scene.add(hemi);

  const moon = new THREE.DirectionalLight(P.moon, 1.15);
  moon.position.set(-9, 15, 11);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.near = 4;
  moon.shadow.camera.far = 48;
  moon.shadow.camera.left = -16;
  moon.shadow.camera.right = 16;
  moon.shadow.camera.top = 16;
  moon.shadow.camera.bottom = -16;
  moon.shadow.bias = -0.0012;
  moon.shadow.normalBias = 0.02;
  scene.add(moon);

  const fill = new THREE.DirectionalLight(0x7f96cd, 0.32);
  fill.position.set(12, 7, -12);
  scene.add(fill);

  // Warm bounce from the shopfront onto the wet pavement. Kept short-range so
  // it lights the pavement without flattening the night.
  const spill = new THREE.PointLight(0xffc98a, 2.8, 8, 1.9);
  spill.position.set(-2, 1.9, 0.2);
  scene.add(spill);

  const alleyBounce = new THREE.PointLight(0xffd2a0, 1.4, 4.5, 1.9);
  alleyBounce.position.set(3.0, 1.5, -4.0);
  scene.add(alleyBounce);
}

/** Distant town glow behind the base, so the horizon is not empty black. */
function addSky(scene) {
  const geo = new THREE.CylinderGeometry(34, 34, 26, 32, 1, true);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      top: { value: new THREE.Color(P.sky) },
      bottom: { value: new THREE.Color(P.horizonGlow) },
    },
    vertexShader: `
      varying float vH;
      void main() {
        vH = uv.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 top;
      uniform vec3 bottom;
      varying float vH;
      void main() {
        float t = smoothstep(0.18, 0.62, vH);
        gl_FragColor = vec4(mix(bottom, top, t), 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(geo, mat);
  sky.position.y = 6;
  sky.renderOrder = -10;
  scene.add(sky);

  // A faint warm haze low on the horizon suggests a town beyond the base
  // without introducing visible geometry that would read as floating debris.
  const hazeGeo = new THREE.CylinderGeometry(30, 30, 5, 32, 1, true);
  const hazeMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    transparent: true,
    fog: false,
    uniforms: { tint: { value: new THREE.Color(0x6d7ba8) } },
    vertexShader: `
      varying float vH;
      void main() {
        vH = uv.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 tint;
      varying float vH;
      void main() {
        float a = smoothstep(0.0, 0.45, vH) * (1.0 - smoothstep(0.35, 0.95, vH));
        gl_FragColor = vec4(tint, a * 0.28);
      }
    `,
  });
  const haze = new THREE.Mesh(hazeGeo, hazeMat);
  haze.position.y = 2.4;
  haze.renderOrder = -9;
  scene.add(haze);
}
