// Weather and micro-animation: rain sheets, eave drips, vent steam, puddle
// rings, plus the light behaviour (beacon, searchlight sway, tube flicker,
// shutter rattle, distant lightning). Everything animates in vertex shaders or
// per-frame transforms on a handful of objects — no per-particle CPU loop.

import * as THREE from "three";
import { glowSprite } from "./textures.js";

const rnd = (n) => {
  let s = n >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
};

// ---------------------------------------------------------------- falling rain

export function makeRain(count, extent, height) {
  const rand = rnd(4242);
  const pos = new Float32Array(count * 6);
  const seed = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * extent * 2.2;
    const z = (rand() - 0.5) * extent * 2.2;
    const y0 = rand() * height;
    const len = 0.22 + rand() * 0.42;
    pos[i * 6 + 0] = x; pos[i * 6 + 1] = y0; pos[i * 6 + 2] = z;
    pos[i * 6 + 3] = x + 0.05; pos[i * 6 + 4] = y0 + len; pos[i * 6 + 5] = z;
    seed[i * 2] = rand();
    seed[i * 2 + 1] = 0.6 + rand() * 0.7;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 2));
  geo.setAttribute("aPair", new THREE.BufferAttribute(
    new Float32Array(Array.from({ length: count * 2 }, (_, i) => i % 2)), 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uHeight: { value: height },
      uWind: { value: new THREE.Vector2(-0.7, 0.35) },
      uColor: { value: new THREE.Color(0xa8c8e6) },
      uOpacity: { value: 0.26 },
    },
    vertexShader: /* glsl */`
      attribute vec2 aSeed;
      attribute float aPair;
      uniform float uTime;
      uniform float uHeight;
      uniform vec2 uWind;
      varying float vFade;
      void main() {
        float speed = 8.0 + aSeed.y * 6.0;
        float fall = mod(uTime * speed + aSeed.x * uHeight, uHeight);
        vec3 p = position;
        p.y = uHeight - fall;
        p.xz += uWind * (uHeight - p.y) * 0.16;
        // Streaks taper: the head of each line is brighter than the tail.
        vFade = mix(1.0, 0.15, aPair);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vFade;
      void main() {
        gl_FragColor = vec4(uColor, uOpacity * vFade);
      }`,
  });
  const lines = new THREE.LineSegments(geo, mat);
  lines.frustumCulled = false;
  lines.renderOrder = 5;
  return lines;
}

// ---------------------------------------------------------------- eave drips

export function makeDrips(dripLines, count = 260) {
  const rand = rnd(909);
  const pos = new Float32Array(count * 3);
  const attr = new Float32Array(count * 4); // origin, fall height, phase, speed
  for (let i = 0; i < count; i++) {
    const line = dripLines[Math.floor(rand() * dripLines.length)] || { from: new THREE.Vector3(), to: new THREE.Vector3(), count: 1 };
    const t = rand();
    const x = line.from.x + (line.to.x - line.from.x) * t;
    const z = line.from.z + (line.to.z - line.from.z) * t;
    pos[i * 3] = x; pos[i * 3 + 1] = 0; pos[i * 3 + 2] = z;
    attr[i * 4] = x;
    attr[i * 4 + 1] = line.from.y + (rand() - 0.5) * 0.1;
    attr[i * 4 + 2] = z;
    attr[i * 4 + 3] = rand();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aDrop", new THREE.BufferAttribute(attr, 4));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xbcd8f0) } },
    vertexShader: /* glsl */`
      attribute vec4 aDrop;
      uniform float uTime;
      varying float vA;
      void main() {
        float phase = aDrop.w;
        float speed = 2.2 + phase * 2.4;
        float drop = mod(uTime * speed + phase * 9.0, 4.2);
        vec3 p = vec3(aDrop.x, aDrop.y - drop, aDrop.z);
        vA = 1.0 - smoothstep(3.0, 4.2, drop);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = clamp(140.0 / -mv.z, 1.2, 4.5);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      varying float vA;
      void main() {
        vec2 d = gl_PointCoord - 0.5;
        if (dot(d, d) > 0.25) discard;
        gl_FragColor = vec4(uColor, 0.75 * vA);
      }`,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  return pts;
}

// ---------------------------------------------------------------- vent steam

export function makeSteam(origin, count = 26) {
  const rand = rnd(1717);
  const group = new THREE.Group();
  const tex = glowSprite("rgba(226,236,246,0.85)");
  const sprites = [];
  for (let i = 0; i < count; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, transparent: true, depthWrite: false, opacity: 0, color: 0xd9e6f2,
    }));
    s.userData = { phase: rand(), drift: new THREE.Vector2((rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6), size: 0.5 + rand() * 0.9 };
    sprites.push(s);
    group.add(s);
  }
  group.position.copy(origin);
  group.userData.sprites = sprites;
  return group;
}

export function updateSteam(group, time) {
  for (const s of group.userData.sprites) {
    const life = ((time * 0.28 + s.userData.phase) % 1 + 1) % 1;
    s.position.set(s.userData.drift.x * life * 2.2, life * 3.0, s.userData.drift.y * life * 2.2);
    const scale = s.userData.size * (0.4 + life * 2.1);
    s.scale.set(scale, scale, 1);
    s.material.opacity = Math.sin(Math.PI * life) * 0.3;
  }
}

// ---------------------------------------------------------------- light rigs

export function lampGlow(position, color, size = 3.4) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite(color), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.85,
  }));
  s.position.copy(position);
  s.scale.setScalar(size);
  s.renderOrder = 4;
  return s;
}

// Constrained light count: only the pieces the prompt names as light sources
// get a real light; the rest is emissive material plus additive glow sprites.
export function makeLighting(scene, anim) {
  const rig = { time: 0 };

  // Three r155+ works in physical light units: point/spot intensity falls off
  // with distance squared, so the practicals need candela-scale values while the
  // sun/hemisphere terms are irradiance.
  scene.add(new THREE.HemisphereLight(0x7ea4cd, 0x232b36, 2.15));
  scene.add(new THREE.AmbientLight(0x46617f, 0.62));

  const moon = new THREE.DirectionalLight(0xbcdbf7, 3.6);
  moon.position.set(-38, 46, -26);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  const c = moon.shadow.camera;
  c.left = -42; c.right = 42; c.top = 42; c.bottom = -42; c.near = 1; c.far = 150;
  moon.shadow.bias = -0.0012;
  moon.shadow.normalBias = 0.045;
  scene.add(moon);

  // Cool fill from the opposite side so the shaded faces of the model stay
  // readable the way a lit collectible diorama would be.
  const fill = new THREE.DirectionalLight(0x7d9cc0, 0.85);
  fill.position.set(34, 26, 40);
  scene.add(fill);

  // Cool warehouse work light.
  const warehouse = new THREE.PointLight(0xdfeaff, 240, 26, 2.0);
  warehouse.position.set(-19, 5.2, -8);
  scene.add(warehouse);
  const warehouseBack = new THREE.PointLight(0xff4433, 70, 12, 2.0);
  warehouseBack.position.set(-21.6, 1.6, -13.4);
  scene.add(warehouseBack);

  // Warm guard-office tube.
  const office = new THREE.PointLight(0xffd39a, 150, 18, 2.0);
  office.position.set(18.4, 2.9, -11.4);
  scene.add(office);

  // Street/wall lamps.
  const warm = anim.lamps.map(() => {
    const light = new THREE.PointLight(0xffca7a, 190, 20, 2.0);
    return light;
  });
  anim.lamps.forEach((l, i) => { warm[i].position.copy(l.lampPos); scene.add(warm[i]); });

  // Guard booth interiors.
  const booths = anim.boothLights.map((p) => {
    const l = new THREE.PointLight(0xbfe6ff, 60, 9, 2.0);
    l.position.copy(p);
    scene.add(l);
    return l;
  });

  const beaconRed = new THREE.PointLight(0xff2e2e, 90, 16, 2.0);
  const beaconBlue = new THREE.PointLight(0x2e5bff, 90, 16, 2.0);
  beaconRed.position.set(-15.0, 3.4, 24.8);
  beaconBlue.position.set(-14.1, 3.4, 24.8);
  scene.add(beaconRed, beaconBlue);

  rig.items = { moon, warehouse, warehouseBack, office, warm, booths, beaconRed, beaconBlue };
  rig.update = (dt, time) => {
    rig.time = time;
    // Street lamps breathe with the rain; searchlight sways and stutters.
    const flick = 0.86 + Math.sin(time * 7.3) * 0.05 + (Math.sin(time * 23.0) > 0.93 ? -0.3 : 0);
    anim.lamps.forEach((l, i) => {
      if (rig.items.warm[i]) rig.items.warm[i].intensity = 190 * flick;
      l.bulb.material.color.setScalar(Math.max(0.25, flick));
    });
    if (anim.searchlight) {
      const sway = Math.sin(time * 0.42) * 0.5;
      anim.searchlight.group.rotation.y = sway;
      if (anim.searchSpot) {
        anim.searchSpot.angle = 0.4 + Math.sin(time * 1.9) * 0.04;
        anim.searchSpot.intensity = 900 * (0.82 + Math.sin(time * 9.1) * 0.1);
      }
    }
    // Police beacon: slow alternating cross-fade.
    const cycle = Math.sin(time * 3.4);
    rig.items.beaconRed.intensity = 30 + Math.max(0, cycle) * 150;
    rig.items.beaconBlue.intensity = 30 + Math.max(0, -cycle) * 150;
    if (anim.beacon) anim.beacon.children.forEach((m, i) => {
      const on = i === 0 ? Math.max(0, cycle) : Math.max(0, -cycle);
      m.material.color.setRGB(i === 0 ? 0.35 + on * 0.65 : on * 0.25, 0.05, i === 0 ? 0.05 : 0.35 + on * 0.65);
    });
    // Dead fluorescent tube in the office: mostly dark, occasional strike.
    if (anim.flickerTube) {
      const strike = Math.sin(time * 11.0) * Math.sin(time * 3.1);
      const on = strike > 0.55 ? 1 : 0.16;
      anim.flickerTube.material.color.setScalar(on * 1.1);
      rig.items.office.intensity = 90 + on * 130;
    }
    rig.items.warehouse.intensity = 240 * (0.9 + Math.sin(time * 5.7) * 0.06);
    anim.redSeep.forEach((m) => m.material.color.setRGB(1.1 * (0.6 + Math.sin(time * 1.7) * 0.25), 0.2, 0.16));
    // Roller shutter rattle.
    anim.shutters.forEach((s, i) => {
      const jitter = Math.sin(time * 30 + i) * (Math.sin(time * 0.7 + i) > 0.86 ? 0.02 : 0);
      s.position.y = jitter;
    });
  };
  return rig;
}

export function makeLightning(scene, anim) {
  const flash = new THREE.DirectionalLight(0xd8e8ff, 0);
  flash.position.set(30, 60, 50);
  scene.add(flash);
  let next = 4 + Math.random() * 9;
  let energy = 0;
  return {
    uniforms: { value: 0 },
    update(dt, time) {
      next -= dt;
      if (next <= 0) { energy = 1; next = 7 + Math.random() * 14; }
      if (energy > 0) {
        const pulse = Math.max(0, Math.sin(energy * 9.0)) * energy;
        flash.intensity = pulse * 2.6;
        energy = Math.max(0, energy - dt * 1.9);
      } else flash.intensity = 0;
      this.uniforms.value = flash.intensity / 2.6;
      scene.background = null;
    },
  };
}
