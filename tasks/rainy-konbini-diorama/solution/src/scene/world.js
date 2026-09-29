import * as THREE from 'three';
import { Builder } from '../core/builder.js';
import { canvasTexture } from '../core/canvas.js';
import { buildGround } from './ground.js';
import { buildStore } from './store.js';
import { buildInterior } from './interior.js';
import { buildStreet } from './street.js';
import { buildProps } from './props.js';
import { buildBuildings } from './buildings.js';
import { buildRain } from './rain.js';
import { STORE, AWNING, HALF } from './layout.js';

function skyTexture() {
  return canvasTexture(16, 512, (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#070b1c');
    grad.addColorStop(0.55, '#141c3c');
    grad.addColorStop(1, '#2a2448');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
  });
}

function lights(ctx) {
  const { root } = ctx;
  root.add(new THREE.HemisphereLight(0x7688cc, 0x2a2838, 2.0));
  const moon = new THREE.DirectionalLight(0xa8bcff, 1.4);
  moon.position.set(-8, 16, -6);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  const c = moon.shadow.camera;
  c.left = c.bottom = -HALF - 2;
  c.right = c.top = HALF + 2;
  c.near = 1;
  c.far = 40;
  moon.shadow.bias = -0.0006;
  moon.shadow.normalBias = 0.02;
  root.add(moon, moon.target);
  // Warm spill from the storefront onto the forecourt.
  const spill = new THREE.PointLight(0xffd29a, 9, 7, 2);
  spill.position.set(0, 2.0, STORE.z1 + 0.9);
  root.add(spill);
  ctx.rainLights.push([0, 2.2, AWNING.z1 + 0.3, 1.0], [2.0, 2.2, AWNING.z1 + 0.3, 0.6]);
}

// Lightbox flicker: steady most of the time, with brief stutters every few seconds.
function flicker(ctx) {
  let next = 3;
  let until = 0;
  let neonNext = 1.5;
  let neonUntil = 0;
  ctx.updaters.push((t) => {
    if (t > next) {
      until = t + 0.18 + Math.random() * 0.25;
      next = t + 4 + Math.random() * 6;
    }
    const stutter = t < until ? (Math.sin(t * 90) > 0 ? 0.55 : 1.0) : 1.0;
    const hum = 1 + 0.02 * Math.sin(t * 7.3);
    ctx.signs.forEach((s, i) => {
      const k = i === 0 ? stutter * hum : hum;
      s.mat.color.setScalar(s.base * k);
    });
    if (ctx.neon) {
      if (t > neonNext) {
        neonUntil = t + 0.3 + Math.random() * 0.5;
        neonNext = t + 2.5 + Math.random() * 4;
      }
      const n = t < neonUntil ? (Math.random() > 0.45 ? 1 : 0.2) : 0.94 + 0.06 * Math.sin(t * 13.0);
      for (const m of ctx.neon.mats) m.color.setScalar(ctx.neon.base * n);
      ctx.neon.light.intensity = 2.5 * n;
    }
  });
}

export function buildWorld(scene) {
  const root = new THREE.Group();
  scene.add(root);
  scene.background = skyTexture();
  const ctx = {
    root,
    b: new Builder(),
    updaters: [],
    resizers: [],
    noOutline: [],
    noReflect: [],
    glass: [],
    signs: [],
    blockers: [],
    drips: [],
    rainLights: [],
    neon: null,
  };
  lights(ctx);
  buildGround(ctx);
  buildStore(ctx);
  buildInterior(ctx);
  buildStreet(ctx);
  buildProps(ctx);
  buildBuildings(ctx);
  ctx.b.flush(root);
  buildRain(ctx);
  flicker(ctx);
  ctx.updaters.push((t) => {
    for (const g of ctx.glass) g.uniforms.time.value = t;
  });

  return {
    noOutline: ctx.noOutline,
    update(t, dt) {
      for (const u of ctx.updaters) u(t, dt);
    },
    resize(w, h) {
      for (const r of ctx.resizers) r(w, h);
    },
  };
}
