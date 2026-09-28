import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  Points,
  PointsMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';
import { BASE, hooks } from '../world/layout.js';

const dummy = new Object3D();
const RAIN = 2400;
const DROPS = 90;

function makeRain(tex) {
  const geo = new BufferGeometry();
  const pos = new Float32Array(RAIN * 3);
  const speed = new Float32Array(RAIN);
  for (let i = 0; i < RAIN; i += 1) {
    pos[i * 3] = (Math.random() - 0.5) * (BASE + 1.4);
    pos[i * 3 + 1] = Math.random() * 4.6;
    pos[i * 3 + 2] = (Math.random() - 0.5) * (BASE + 1.4);
    speed[i] = 2.8 + Math.random() * 2.4;
  }
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  geo.userData.speed = speed;
  const mat = new PointsMaterial({
    map: tex.rain,
    color: 0xc5d6e2,
    size: 0.13,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  });
  mat.userData.outlineParameters = { visible: false, keepAlive: true };
  const points = new Points(geo, mat);
  points.frustumCulled = false;
  return points;
}

function makeDrops() {
  const geo = new SphereGeometry(0.012, 5, 5);
  const mat = new MeshBasicMaterial({
    color: 0xb7c8d4,
    transparent: true,
    opacity: 0.7,
  });
  mat.userData.outlineParameters = { visible: false, keepAlive: true };
  const mesh = new InstancedMesh(geo, mat, DROPS);
  const state = [];
  const n = Math.max(1, hooks.drips.length);
  for (let i = 0; i < DROPS; i += 1) {
    const src = hooks.drips[i % n].clone();
    state.push({
      src,
      y: src.y - Math.random() * 0.8,
      v: 0.4 + Math.random() * 0.8,
      hang: Math.random() * 1.6,
    });
  }
  mesh.userData.state = state;
  mesh.frustumCulled = false;
  return mesh;
}

function makeSteamTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 4, 32, 32, 30);
  g.addColorStop(0, 'rgba(230,236,240,0.55)');
  g.addColorStop(1, 'rgba(230,236,240,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new CanvasTexture(c);
  return tex;
}

export function addAtmosphere(scene, mats, lights) {
  const root = new Group();
  scene.add(root);

  const rain = makeRain(mats.tex);
  root.add(rain);

  const drops = hooks.drips.length ? makeDrops() : null;
  if (drops) root.add(drops);

  const steamTex = makeSteamTexture();
  const steam = [];
  hooks.vents.forEach((v, i) => {
    for (let k = 0; k < 2; k += 1) {
      const sprMat = new SpriteMaterial({
        map: steamTex,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        blending: AdditiveBlending,
      });
      sprMat.userData.outlineParameters = { visible: false, keepAlive: true };
      const spr = new Sprite(sprMat);
      spr.position.copy(v);
      spr.scale.set(0.22, 0.28, 1);
      root.add(spr);
      steam.push({ spr, base: v.clone(), phase: i * 1.7 + k });
    }
  });

  const glassOverlays = [];
  hooks.glasses.forEach((glass) => {
    const w = glass.geometry.parameters?.width ?? 1;
    const h = glass.geometry.parameters?.height ?? 1;
    const overlay = new Mesh(
      new PlaneGeometry(w, h),
      new MeshBasicMaterial({
        map: mats.tex.rainGlass.clone(),
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        side: DoubleSide,
      }),
    );
    overlay.material.userData.outlineParameters = { visible: false, keepAlive: true };
    overlay.position.copy(glass.position);
    overlay.quaternion.copy(glass.quaternion);
    overlay.translateZ(0.012);
    glass.parent.add(overlay);
    glassOverlays.push(overlay);
  });

  const hanging = [];
  hooks.drips.slice(0, 18).forEach((p) => {
    const drop = new Mesh(
      new SphereGeometry(0.01, 5, 5),
      new MeshBasicMaterial({ color: 0xc5d4de, transparent: true, opacity: 0.8 }),
    );
    drop.material.userData.outlineParameters = { visible: false, keepAlive: true };
    drop.position.copy(p);
    root.add(drop);
    hanging.push({ mesh: drop, base: p.clone(), phase: Math.random() * Math.PI * 2 });
  });

  return {
    root,
    rain,
    drops,
    steam,
    hanging,
    glassOverlays,
    flash: { sky: new Color(0x0b121a), lit: new Color(0x6a7c94), t: 8 + Math.random() * 6, hold: 0 },
    lights,
  };
}

export function updateAtmosphere(fx, dt, elapsed, scene) {
  const pos = fx.rain.geometry.attributes.position;
  const speed = fx.rain.geometry.userData.speed;
  const arr = pos.array;
  for (let i = 0; i < RAIN; i += 1) {
    arr[i * 3 + 1] -= speed[i] * dt;
    arr[i * 3] += dt * 0.18;
    if (arr[i * 3 + 1] < 0.02) {
      arr[i * 3] = (Math.random() - 0.5) * (BASE + 1.4);
      arr[i * 3 + 1] = 3.6 + Math.random() * 1.4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * (BASE + 1.4);
    }
    if (arr[i * 3] > BASE * 0.55) arr[i * 3] -= BASE + 1.4;
  }
  pos.needsUpdate = true;

  if (fx.drops) {
    const state = fx.drops.userData.state;
    state.forEach((d, i) => {
      d.hang -= dt;
      if (d.hang > 0) {
        dummy.position.copy(d.src);
        dummy.scale.setScalar(0.6);
      } else {
        d.v += 4.8 * dt;
        d.y -= d.v * dt;
        dummy.position.set(d.src.x, d.y, d.src.z);
        dummy.scale.setScalar(1);
        if (d.y < 0.02) {
          const src = hooks.drips[i % hooks.drips.length];
          d.src.copy(src);
          d.y = src.y;
          d.v = 0.35 + Math.random() * 0.5;
          d.hang = 0.4 + Math.random() * 1.8;
        }
      }
      dummy.updateMatrix();
      fx.drops.setMatrixAt(i, dummy.matrix);
    });
    fx.drops.instanceMatrix.needsUpdate = true;
  }

  fx.hanging.forEach((h) => {
    const s = 0.7 + Math.sin(elapsed * 2.2 + h.phase) * 0.35;
    h.mesh.scale.setScalar(s);
    h.mesh.position.y = h.base.y - (s - 0.7) * 0.02;
  });

  fx.steam.forEach((s) => {
    const t = elapsed * 0.22 + s.phase;
    const rise = (t % 1.8) / 1.8;
    s.spr.position.set(s.base.x + Math.sin(t) * 0.03, s.base.y + rise * 0.45, s.base.z);
    s.spr.material.opacity = 0.22 * (1 - rise);
    s.spr.scale.set(0.18 + rise * 0.28, 0.22 + rise * 0.34, 1);
  });

  hooks.puddles.forEach((p, i) => {
    if (p.material && p.material.normalMap) {
      p.material.normalMap.offset.x = elapsed * 0.07 + i * 0.1;
      p.material.normalMap.offset.y = elapsed * 0.05;
      p.material.roughness = 0.1 + Math.sin(elapsed * 1.6 + i) * 0.03;
    }
  });

  fx.glassOverlays.forEach((glass) => {
    if (glass.material.map) glass.material.map.offset.y = (elapsed * 0.12) % 1;
  });

  if (hooks.shutter) {
    const beat = elapsed % 7.4;
    hooks.shutter.rotation.z = beat < 0.28 ? Math.sin(elapsed * 46) * 0.012 : 0;
    hooks.shutter.position.y = 1.18 + (beat < 0.28 ? Math.sin(elapsed * 50) * 0.004 : 0);
  }

  if (hooks.streetLamp) {
    const flicker = 0.92 + Math.sin(elapsed * 11.3) * 0.05 + (Math.random() - 0.5) * 0.04;
    hooks.streetLamp.intensity = 5.2 * flicker;
  }
  if (hooks.streetLampHalo && hooks.streetLampHalo.userData.lamp) {
    hooks.streetLampHalo.rotation.z = Math.sin(elapsed * 1.3) * 0.03;
  }

  if (hooks.policeBar) {
    const wave = Math.sin(elapsed * 2.15);
    hooks.policeBar.intensity = 0.7 + (wave * 0.5 + 0.5) * 2.1;
    hooks.policeBar.color.setHSL(0.98, 0.85, 0.45 + wave * 0.08);
  }

  if (hooks.searchlight) {
    hooks.searchlight.intensity = 5.4 + Math.sin(elapsed * 7.2) * 0.25 + (Math.random() - 0.5) * 0.15;
    const sway = Math.sin(elapsed * 0.55) * 0.18;
    hooks.searchlight.target.position.set(0.15 + sway, 0.32, 0.2 + Math.cos(elapsed * 0.4) * 0.12);
    if (hooks.searchHead) {
      hooks.searchHead.rotation.y = sway * 0.4;
      hooks.searchHead.rotation.x = -0.35 + Math.sin(elapsed * 0.4) * 0.04;
    }
  }

  hooks.warehouseLamps.forEach((l, i) => {
    l.intensity = 3.4 + Math.sin(elapsed * 8 + i) * 0.1;
  });

  fx.flash.t -= dt;
  if (fx.flash.t < 0) {
    fx.flash.t = 6 + Math.random() * 8;
    fx.flash.hold = 0.12 + Math.random() * 0.1;
  }
  if (fx.flash.hold > 0) {
    fx.flash.hold -= dt;
    const k = Math.min(1, fx.flash.hold * 8);
    scene.background.lerpColors(fx.flash.sky, fx.flash.lit, k);
    if (fx.lights.hemi) fx.lights.hemi.intensity = 1.15 + k * 0.7;
    if (fx.lights.moon) fx.lights.moon.intensity = 1.15 + k * 0.6;
  } else if (scene.background) {
    scene.background.lerp(fx.flash.sky, 1 - Math.exp(-dt * 6));
    if (fx.lights.hemi) fx.lights.hemi.intensity += (1.15 - fx.lights.hemi.intensity) * 0.08;
    if (fx.lights.moon) fx.lights.moon.intensity += (1.15 - fx.lights.moon.intensity) * 0.08;
  }
}
