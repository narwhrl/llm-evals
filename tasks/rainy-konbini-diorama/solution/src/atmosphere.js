import * as THREE from 'three';
import { additive, radialTexture } from './core.js';
import { BASE_HALF, WET_Y } from './street.js';
import { STORE } from './store.js';

// 雨、屋檐滴水、积水涟漪、路面反射条、玻璃雨痕、远处雾光。
// 所有动画都通过 update(dt, t) 驱动，不产生额外分配。

const RAIN_COUNT = 2200;
const RIPPLE_COUNT = 40;

export function buildAtmosphere(registry) {
  const group = new THREE.Group();

  // ---- 雨 ---------------------------------------------------------------
  const positions = new Float32Array(RAIN_COUNT * 3);
  const speeds = new Float32Array(RAIN_COUNT);
  for (let i = 0; i < RAIN_COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * (BASE_HALF * 2 - 1);
    positions[i * 3 + 1] = Math.random() * 18;
    positions[i * 3 + 2] = (Math.random() - 0.5) * (BASE_HALF * 2 - 1);
    speeds[i] = 9 + Math.random() * 8;
  }
  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const rainTexture = (() => {
    const c = document.createElement('canvas');
    c.width = 8;
    c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 64);
    grad.addColorStop(0, 'rgba(200,225,255,0)');
    grad.addColorStop(0.5, 'rgba(214,238,255,0.9)');
    grad.addColorStop(1, 'rgba(200,225,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(2, 0, 4, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();

  const rainMat = new THREE.PointsMaterial({
    color: 0xbcd9ff,
    size: 0.42,
    map: rainTexture,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const rain = new THREE.Points(rainGeo, rainMat);
  rain.frustumCulled = false;
  group.add(rain);

  // ---- 屋檐滴水 ---------------------------------------------------------
  const dripGeo = new THREE.SphereGeometry(0.032, 6, 5);
  const dripMat = new THREE.MeshBasicMaterial({ color: 0xd6ecff, transparent: true, opacity: 0.8 });
  const drips = [];
  const anchors = [
    [-8.4, 4.0, 3.0],
    [-6.2, 4.0, 3.0],
    [-4.0, 4.0, 3.0],
    [-1.8, 4.0, 3.0],
    [0.4, 4.0, 3.0],
    [2.6, 4.0, 3.0],
    [3.06, 3.6, -1.2],
    [3.06, 3.6, -4.6],
  ];
  for (const [x, y, z] of anchors) {
    for (let i = 0; i < 2; i += 1) {
      const m = new THREE.Mesh(dripGeo, dripMat);
      m.userData.anchor = new THREE.Vector3(x, y, z);
      m.userData.offset = (i * 0.5 + Math.random() * 0.4) % 1;
      m.userData.speed = 0.85 + Math.random() * 0.4;
      group.add(m);
      drips.push(m);
    }
  }

  // ---- 涟漪 -------------------------------------------------------------
  const rippleGeo = new THREE.RingGeometry(0.055, 0.085, 12);
  const rippleBase = new THREE.MeshBasicMaterial({
    color: 0xa8d8ff,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ripples = [];
  const resetRipple = (m) => {
    const zone = Math.random();
    const x = zone < 0.62 ? -9.4 + Math.random() * 18.6 : 4.6 + Math.random() * 4.6;
    const z = zone < 0.62 ? 4.3 + Math.random() * 4.9 : -9.4 + Math.random() * 13;
    m.position.set(x, WET_Y + 0.005, z);
  };
  for (let i = 0; i < RIPPLE_COUNT; i += 1) {
    const m = new THREE.Mesh(rippleGeo, rippleBase.clone());
    m.rotation.x = -Math.PI / 2;
    resetRipple(m);
    m.userData.t = Math.random();
    m.userData.speed = 0.7 + Math.random() * 0.7;
    group.add(m);
    ripples.push(m);
  }

  // ---- 积水 -------------------------------------------------------------
  const puddleMat = new THREE.MeshBasicMaterial({
    color: 0x0f2340,
    transparent: true,
    opacity: 0.34,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const puddleGeo = new THREE.CircleGeometry(1, 20);
  const puddles = [];
  const puddleSpots = [
    [-7.8, 5.4, 1.5, 0.85],
    [-2.6, 5.9, 2.0, 1.0],
    [2.4, 7.8, 1.6, 0.75],
    [6.4, 1.4, 1.1, 1.5],
    [7.8, -3.2, 1.0, 1.3],
    [-5.2, 1.6, 1.2, 0.62],
    [0.6, 4.5, 1.0, 0.5],
    [8.4, 6.6, 1.2, 1.0],
    [-8.6, 7.6, 1.0, 0.7],
  ];
  for (const [x, z, sx, sz] of puddleSpots) {
    const m = new THREE.Mesh(puddleGeo, puddleMat.clone());
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, WET_Y + 0.001, z);
    m.scale.set(sx, sz, 1);
    m.userData.base = [sx, sz];
    m.userData.phase = Math.random() * Math.PI * 2;
    group.add(m);
    puddles.push(m);
  }

  // ---- 湿路面反射条 -----------------------------------------------------
  const sheenColors = [0xff9a52, 0x67d9ff, 0xff6f9b, 0xffd88a, 0x9d7dff, 0x7dffcf];
  const sheens = [];
  for (let i = 0; i < 30; i += 1) {
    const color = sheenColors[i % sheenColors.length];
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.1 + (i % 5) * 0.03,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const w = 0.1 + ((i * 7) % 5) * 0.06;
    const h = 0.8 + ((i * 11) % 7) * 0.32;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.rotation.x = -Math.PI / 2;
    if (i % 10 < 6) {
      m.position.set(-9 + ((i * 13) % 60) * 0.2, WET_Y + 0.002, 4.4 + ((i * 7) % 47) * 0.1);
    } else {
      m.position.set(4.4 + ((i * 5) % 48) * 0.1, WET_Y + 0.002, -9 + ((i * 17) % 120) * 0.1);
    }
    m.userData.baseOpacity = mat.opacity;
    m.userData.phase = (i * 1.7) % (Math.PI * 2);
    group.add(m);
    sheens.push(m);
  }

  // ---- 灯光在雨幕里的柔光 -------------------------------------------------
  const haloTexture = radialTexture(128);
  const halos = [];
  const haloSpecs = [
    [-3.0, 4.9, 3.2, 9.0, 0xffd9a0, 0.16],
    [4.6, 5.2, 3.6, 5.0, 0xffc87a, 0.14],
    [-9.1, 3.4, -4.3, 3.0, 0xffb877, 0.12],
    [8.7, 3.4, 3.5, 2.4, 0xff8080, 0.1],
  ];
  for (const [x, y, z, size, color, opacity] of haloSpecs) {
    const mat = new THREE.MeshBasicMaterial({
      map: haloTexture,
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprite = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
    sprite.position.set(x, y, z);
    sprite.userData.phase = Math.random() * 6;
    sprite.userData.baseOpacity = opacity;
    group.add(sprite);
    halos.push(sprite);
  }

  registry.atmosphere = group;

  const update = (dt, t) => {
    // 雨
    const pos = rainGeo.attributes.position.array;
    for (let i = 0; i < RAIN_COUNT; i += 1) {
      const iy = i * 3 + 1;
      pos[iy] -= speeds[i] * dt;
      if (pos[iy] < 0.1) {
        pos[iy] = 17 + (i % 7) * 0.2;
        pos[i * 3] = (Math.random() - 0.5) * (BASE_HALF * 2 - 1);
        pos[i * 3 + 2] = (Math.random() - 0.5) * (BASE_HALF * 2 - 1);
      }
    }
    rainGeo.attributes.position.needsUpdate = true;
    rainMat.opacity = 0.44 + Math.sin(t * 1.7) * 0.05;

    // 屋檐滴水
    for (const d of drips) {
      const cycle = (t * d.userData.speed + d.userData.offset) % 1;
      const a = d.userData.anchor;
      d.position.set(a.x, Math.max(0.28, a.y - cycle * (a.y - 0.28)), a.z);
      d.scale.setScalar(cycle > 0.93 ? 1.5 : 1);
    }

    // 涟漪
    for (const r of ripples) {
      r.userData.t += dt * r.userData.speed;
      if (r.userData.t > 1) {
        r.userData.t -= 1;
        resetRipple(r);
      }
      const s = 0.4 + r.userData.t * 3.2;
      r.scale.setScalar(s);
      r.material.opacity = 0.32 * (1 - r.userData.t);
    }

    // 积水呼吸
    for (const p of puddles) {
      const k = 1 + Math.sin(t * 1.3 + p.userData.phase) * 0.03;
      p.scale.set(p.userData.base[0] * k, p.userData.base[1] * k, 1);
      p.material.opacity = 0.26 + Math.sin(t * 2.0 + p.userData.phase) * 0.06;
    }

    // 反射条闪烁
    for (const s of sheens) {
      s.material.opacity = s.userData.baseOpacity * (0.62 + Math.sin(t * 2.4 + s.userData.phase) * 0.38);
    }

    // 雾光呼吸
    for (const h of halos) {
      const base = h.userData.baseOpacity;
      h.material.opacity = base * (0.85 + Math.sin(t * 1.1 + h.userData.phase) * 0.15);
    }
  };

  return { group, update };
}

export function animateGlassRunoff(droplets, t, dt) {
  for (const d of droplets) {
    d.position.y -= d.userData.speed * dt;
    if (d.position.y < STORE.glassBottom + 0.1) {
      d.position.y = STORE.glassTop - 0.15;
      d.position.x = STORE.minX + 0.4 + Math.random() * 10.6;
    }
    d.scale.y = d.userData.len * (0.85 + Math.sin(t * 2.2 + d.position.x) * 0.15);
    d.material.opacity = 0.22 + Math.sin(t * 3.0 + d.position.x * 2) * 0.08;
  }
}
