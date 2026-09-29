// Rain & wet effects: instanced rain streaks, awning drips, puddle ripple
// rings, traffic signal, and a glass-runoff shader overlay on the storefront.
import * as THREE from 'three';
import { glow, planeGeo } from './toon.js';
import { STORE } from './store.js';

// ---------- rain streaks (instanced crossed quads) ----------
export function makeRain(scene, count = 850) {
  const geo = new THREE.PlaneGeometry(0.05, 0.75);
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uColor: { value: new THREE.Color(0x9fb8d8) } },
    vertexShader: `
      varying vec2 vUv;
      varying float vDepth;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; varying vec2 vUv; varying float vDepth;
      void main() {
        float a = (1.0 - abs(vUv.x - 0.5) * 2.0) * 0.34 * (1.0 - abs(vUv.y - 0.5) * 0.9);
        a *= smoothstep(90.0, 25.0, vDepth); // fade distant rain into mist
        gl_FragColor = vec4(uColor, a);
      }`,
  });
  const inst = new THREE.InstancedMesh(geo, mat, count);
  inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  inst.frustumCulled = false;
  const dummy = new THREE.Object3D();
  const drops = [];
  for (let i = 0; i < count; i++) {
    drops.push({
      x: (Math.random() - 0.5) * 47,
      y: Math.random() * 16,
      z: (Math.random() - 0.5) * 47,
      v: 9 + Math.random() * 5,
      drift: 0.7 + Math.random() * 0.5,
    });
  }
  scene.add(inst);

  function update(dt, camQuat) {
    for (let i = 0; i < count; i++) {
      const d = drops[i];
      d.y -= d.v * dt;
      d.x += d.drift * dt; // slight wind
      if (d.y < 0) {
        d.y = 14 + Math.random() * 3;
        d.x = (Math.random() - 0.5) * 47;
        d.z = (Math.random() - 0.5) * 47;
      }
      dummy.position.set(d.x, d.y, d.z);
      // billboard toward camera (yaw only) + slight slant
      dummy.quaternion.copy(camQuat);
      dummy.rotation.z = 0.06;
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  }
  return { update };
}

// ---------- awning drips ----------
export function makeDrips(scene, lip, count = 26) {
  const geo = new THREE.SphereGeometry(0.035, 6, 6);
  geo.scale(1, 2.6, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0xbfd8ec, transparent: true, opacity: 0.75 });
  const inst = new THREE.InstancedMesh(geo, mat, count);
  inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  inst.frustumCulled = false;
  const drops = [];
  for (let i = 0; i < count; i++) {
    drops.push({
      x: lip.x0 + Math.random() * (lip.x1 - lip.x0),
      y: lip.y,
      wait: Math.random() * 3,
      v: 0,
    });
  }
  scene.add(inst);
  const dummy = new THREE.Object3D();
  function update(dt) {
    for (let i = 0; i < count; i++) {
      const d = drops[i];
      if (d.wait > 0) {
        d.wait -= dt;
        dummy.position.set(d.x, lip.y, lip.z);
        dummy.scale.setScalar(0.4);
      } else {
        d.v += 9.8 * dt;
        d.y -= d.v * dt;
        dummy.position.set(d.x, d.y, lip.z);
        dummy.scale.setScalar(1);
        if (d.y < 0.35) {
          d.y = lip.y; d.v = 0; d.wait = 0.4 + Math.random() * 3.4;
          d.x = lip.x0 + Math.random() * (lip.x1 - lip.x0);
        }
      }
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  }
  return { update };
}

// ---------- puddle ripples: expanding rings ----------
export function makeRipples(scene, puddles, perPuddle = 3) {
  const count = puddles.length * perPuddle;
  const geo = new THREE.RingGeometry(0.85, 1.0, 28);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xbfd8ec, transparent: true, opacity: 0.4,
    depthWrite: false, side: THREE.DoubleSide,
  });
  const inst = new THREE.InstancedMesh(geo, mat, count);
  inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  inst.frustumCulled = false;
  const ripples = [];
  for (let i = 0; i < count; i++) {
    ripples.push({ p: i % puddles.length, t: Math.random() });
  }
  scene.add(inst);
  const dummy = new THREE.Object3D();
  function update(dt) {
    for (let i = 0; i < count; i++) {
      const r = ripples[i];
      r.t += dt * 0.55;
      if (r.t > 1) r.t -= 1;
      const p = puddles[r.p];
      const s = 0.08 + r.t * 0.75;
      dummy.position.set(
        p.position.x + (Math.sin(i * 7.3) * 0.4) * p.scale.x * 0.5,
        p.position.y + 0.012,
        p.position.z + (Math.cos(i * 5.1) * 0.4) * p.scale.y * 0.5,
      );
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    mat.opacity = 0.32;
  }
  return { update };
}

// ---------- glass runoff: shader plane clinging to the storefront ----------
export function makeGlassRunoff(scene) {
  const s = STORE;
  const W = s.x1 - s.x0 - 0.2;
  const H = s.wallH - 1.3;
  const geo = new THREE.PlaneGeometry(W, H);
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform float uTime; varying vec2 vUv;
      float hash(float n) { return fract(sin(n) * 43758.5453123); }
      void main() {
        float col = floor(vUv.x * 26.0);
        float h1 = hash(col * 1.37);
        float h2 = hash(col * 3.11);
        float speed = 0.05 + h2 * 0.09;
        float head = fract(h1 + uTime * speed);
        float dx = abs(fract(vUv.x * 26.0) - 0.5) * (1.5 + h2);
        float trail = smoothstep(0.0, 0.22, head - vUv.y) * step(vUv.y, head);
        float a = trail * smoothstep(0.5, 0.0, dx) * 0.22;
        a += smoothstep(0.035, 0.0, abs(vUv.y - head)) * smoothstep(0.4, 0.0, dx) * 0.5;
        gl_FragColor = vec4(vec3(0.75, 0.86, 0.95), a);
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set((s.x0 + s.x1) / 2, 0.6 + 0.3 + H / 2, s.z1 + 0.015);
  scene.add(mesh);
  return { update(t) { mat.uniforms.uTime.value = t; } };
}

// ---------- distant traffic signal on the far road corner ----------
export function makeTrafficSignal(scene) {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 4.6, 8),
    new THREE.MeshToonMaterial({ color: 0x555c6c }));
  pole.position.y = 2.3;
  const headBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.36, 0.3),
    new THREE.MeshToonMaterial({ color: 0x22262e }));
  headBox.position.set(-0.4, 4.5, 0);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.08),
    new THREE.MeshToonMaterial({ color: 0x555c6c }));
  arm.position.set(-0.5, 4.62, 0);
  g.add(pole, headBox, arm);

  const mk = (color, x) => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(0.11, 12),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25 }));
    m.position.set(x, 4.5, 0.16);
    g.add(m);
    const halo = new THREE.Mesh(planeGeo(0.5, 0.5), glow(color, 0));
    halo.position.set(x, 4.5, 0.18);
    g.add(halo);
    return { m, halo, color };
  };
  const red = mk(0xff5a4a, -0.62);
  const green = mk(0x4ae8a0, -0.18);
  g.position.set(15.4, 0, 21.6);
  g.rotation.y = Math.PI / 4;
  scene.add(g);

  let phase = 0; // 0 green, 1 red
  let t = 0;
  function update(dt) {
    t += dt;
    const cycle = 14;
    const p = (t % cycle) / cycle;
    phase = p < 0.55 ? 0 : 1;
    const greenOn = phase === 0;
    red.m.material.opacity = greenOn ? 0.18 : 1;
    green.m.material.opacity = greenOn ? 1 : 0.18;
    red.halo.material.opacity = greenOn ? 0 : 0.22;
    green.halo.material.opacity = greenOn ? 0.22 : 0;
  }
  return { update };
}
