import * as THREE from 'three';
import { L } from '../layout.js';
import { plane, canvasTex, geo, rnd, clamp01, smooth } from '../kit.js';

// Solid volumes the rain must not fall through.
const OBSTACLES = [
  { x0: -8.4, x1: 1.35, z0: -6.5, z1: 1.18, top: 4.6 },
  { x0: -3.5, x1: 1.05, z0: 1.18, z1: 2.45, top: 3.45 },
  { x0: -11.6, x1: -9.5, z0: -11.6, z1: 0.6, top: 5.95 },
  { x0: -9.7, x1: 1.1, z0: -11.6, z1: -8.7, top: 7.5 },
  { x0: 3.9, x1: 11.6, z0: -11.6, z1: -9.5, top: 6.4 }
];

function runoffTexture() {
  return canvasTex(256, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const r = rnd(83);
    for (let i = 0; i < 46; i++) {
      const x = r() * w;
      const y = r() * h;
      const len = 60 + r() * 260;
      const g = ctx.createLinearGradient(x, y, x, y + len);
      g.addColorStop(0, 'rgba(220,236,255,0)');
      g.addColorStop(0.35, `rgba(226,240,255,${0.1 + r() * 0.22})`);
      g.addColorStop(1, 'rgba(220,236,255,0)');
      ctx.fillStyle = g;
      const wdt = 1.5 + r() * 3;
      ctx.fillRect(x, y, wdt, len);
      ctx.beginPath();
      ctx.fillStyle = `rgba(240,248,255,${0.25 + r() * 0.4})`;
      ctx.ellipse(x + wdt / 2, y + len, wdt * 1.3, 2.6 + r() * 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 90; i++) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(235,245,255,${0.12 + r() * 0.35})`;
      const x = r() * w;
      const y = r() * h;
      ctx.ellipse(x, y, 1.4 + r() * 2.2, 2 + r() * 3.4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }, { repeat: [1, 1] });
}

class LineField {
  constructor(count, material) {
    this.count = count;
    this.pos = new Float32Array(count * 6);
    this.col = new Float32Array(count * 6);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.mesh = new THREE.LineSegments(g, material);
    this.mesh.frustumCulled = false;
  }
}

export function buildWeather(scene, refs) {
  const group = new THREE.Group();
  scene.add(group);
  const r = rnd(1234);

  // --- rain -------------------------------------------------------------
  const RAIN = 780;
  const rain = new LineField(RAIN, new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
  }));
  group.add(rain.mesh);
  const rx = new Float32Array(RAIN);
  const ry = new Float32Array(RAIN);
  const rz = new Float32Array(RAIN);
  const rs = new Float32Array(RAIN);
  const rl = new Float32Array(RAIN);
  const rc = new Float32Array(RAIN);
  const WX = 0.34;
  const WZ = 0.1;
  const dl = Math.hypot(WX, 1, WZ);
  const dx = WX / dl;
  const dy = -1 / dl;
  const dz = WZ / dl;

  const spawnRain = (i) => {
    const x = -11.4 + r() * 22.8;
    const z = -11.4 + r() * 22.8;
    rx[i] = x;
    rz[i] = z;
    ry[i] = Math.max(4.7, roofTop(x, z) + 0.2) + r() * 1.5;
    rs[i] = 7.5 + r() * 5;
    rl[i] = 0.12 + r() * 0.2;
    rc[i] = 0.42 + r() * 0.58;
  };

  function roofTop(x, z) {
    let top = 0;
    for (const o of OBSTACLES) {
      if (x > o.x0 && x < o.x1 && z > o.z0 && z < o.z1 && o.top > top) top = o.top;
    }
    return top;
  }

  for (let i = 0; i < RAIN; i++) {
    spawnRain(i);
    ry[i] = 0.1 + r() * Math.max(1, roofTop(rx[i], rz[i]) + 4.4);
    const o = i * 6;
    const shade = rc[i];
    rain.col[o] = shade * 0.72;
    rain.col[o + 1] = shade * 0.82;
    rain.col[o + 2] = shade;
    rain.col[o + 3] = shade * 0.5;
    rain.col[o + 4] = shade * 0.58;
    rain.col[o + 5] = shade * 0.72;
  }

  const updateRain = (dt) => {
    const p = rain.pos;
    for (let i = 0; i < RAIN; i++) {
      ry[i] -= rs[i] * dt;
      rx[i] += WX * dt * 2.2;
      rz[i] += WZ * dt * 2.2;
      const roof = roofTop(rx[i], rz[i]);
      if (ry[i] < Math.max(0.03, roof) || Math.abs(rx[i]) > 11.6 || Math.abs(rz[i]) > 11.6) {
        spawnRain(i);
      }
      const o = i * 6;
      const l = rl[i];
      p[o] = rx[i];
      p[o + 1] = ry[i];
      p[o + 2] = rz[i];
      p[o + 3] = rx[i] - dx * l;
      p[o + 4] = ry[i] - dy * l;
      p[o + 5] = rz[i] - dz * l;
    }
    rain.mesh.geometry.attributes.position.needsUpdate = true;
  };

  // --- eave drips -------------------------------------------------------
  const DRIP = 150;
  const drips = new LineField(DRIP, new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    depthWrite: false
  }));
  group.add(drips.mesh);
  const edges = [
    { axis: 'x', fixed: L.awning.z + 0.03, from: L.awning.x0, to: L.awning.x1, y: L.awning.y0, ground: L.walkY },
    { axis: 'x', fixed: 1.18, from: -8, to: 1, y: 3.4, ground: L.walkY },
    { axis: 'z', fixed: 1.18, from: -6, to: 1, y: 3.4, ground: L.walkY },
    { axis: 'x', fixed: -5.98, from: -8, to: 1, y: L.store.roofY, ground: L.walkY },
    { axis: 'z', fixed: -8.05, from: -6, to: 1, y: L.store.wallTop, ground: L.walkY }
  ];
  const dEdge = new Int8Array(DRIP);
  const dPos = new Float32Array(DRIP);
  const dY = new Float32Array(DRIP);
  const dSp = new Float32Array(DRIP);
  const dLen = new Float32Array(DRIP);
  const respawnDrip = (i) => {
    const e = Math.floor(r() * edges.length);
    dEdge[i] = e;
    const ed = edges[e];
    dPos[i] = ed.from + r() * (ed.to - ed.from);
    dY[i] = ed.y - r() * 0.12;
    dSp[i] = 5 + r() * 3.5;
    dLen[i] = 0.1 + r() * 0.2;
    const o = i * 6;
    const s = 0.75 + r() * 0.25;
    drips.col[o] = s * 0.8;
    drips.col[o + 1] = s * 0.88;
    drips.col[o + 2] = s;
    drips.col[o + 3] = s * 0.55;
    drips.col[o + 4] = s * 0.62;
    drips.col[o + 5] = s * 0.75;
  };
  for (let i = 0; i < DRIP; i++) {
    respawnDrip(i);
    dY[i] = edges[dEdge[i]].ground + r() * (edges[dEdge[i]].y - edges[dEdge[i]].ground);
  }
  const updateDrips = (dt) => {
    const p = drips.pos;
    for (let i = 0; i < DRIP; i++) {
      dY[i] -= dSp[i] * dt;
      const ed = edges[dEdge[i]];
      if (dY[i] < ed.ground) respawnDrip(i);
      const o = i * 6;
      const along = dPos[i];
      const l = dLen[i];
      if (ed.axis === 'x') {
        p[o] = along;
        p[o + 1] = dY[i];
        p[o + 2] = ed.fixed;
        p[o + 3] = along - 0.05;
        p[o + 4] = dY[i] + l;
        p[o + 5] = ed.fixed;
      } else {
        p[o] = ed.fixed;
        p[o + 1] = dY[i];
        p[o + 2] = along;
        p[o + 3] = ed.fixed;
        p[o + 4] = dY[i] + l;
        p[o + 5] = along + 0.05;
      }
    }
    drips.mesh.geometry.attributes.position.needsUpdate = true;
  };

  // --- puddle ripples ----------------------------------------------------
  const RIPPLES = 18;
  const rippleGeo = geo('ripple', () => new THREE.RingGeometry(0.55, 0.72, 32));
  const ripples = [];
  for (let i = 0; i < RIPPLES; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#bfe0ff'),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const m = new THREE.Mesh(rippleGeo, mat);
    m.rotation.x = -Math.PI / 2;
    m.visible = false;
    group.add(m);
    ripples.push({ m, t: -r() * 2, dur: 1.5 + r() * 1.1, hold: r() * 1.4 });
  }
  const puddles = refs.puddles;
  const respawnRipple = (rp) => {
    const p = puddles[Math.floor(r() * puddles.length)];
    const a = r() * Math.PI * 2;
    const rr = Math.sqrt(r());
    rp.m.position.set(
      p.x + Math.cos(a) * p.rx * rr * 0.75,
      (p.walk ? L.walkY : p.alley ? L.alley.y : L.roadY) + 0.012,
      p.z + Math.sin(a) * p.rz * rr * 0.75
    );
    rp.t = 0;
    rp.dur = 1.4 + r() * 1.2;
    rp.scale = 0.25 + p.rx * 0.35;
  };
  const updateRipples = (dt) => {
    for (const rp of ripples) {
      rp.t += dt;
      if (rp.t < 0) {
        rp.m.visible = false;
        continue;
      }
      if (rp.t > rp.dur) {
        rp.hold -= dt;
        if (rp.hold <= 0) {
          rp.hold = r() * 1.6;
          respawnRipple(rp);
        } else {
          rp.m.visible = false;
        }
        continue;
      }
      const k = rp.t / rp.dur;
      rp.m.visible = true;
      const s = rp.scale * (0.25 + k * 1.5);
      rp.m.scale.set(s, s, 1);
      rp.m.material.opacity = 0.42 * (1 - k) * (1 - k);
    }
  };
  for (const rp of ripples) respawnRipple(rp);
  for (const rp of ripples) rp.t = -r() * 2.5;

  // --- water running down the glass -------------------------------------
  const runoffTex = runoffTexture();
  runoffTex.wrapS = runoffTex.wrapT = THREE.RepeatWrapping;
  const runoffMat = new THREE.MeshBasicMaterial({
    map: runoffTex,
    transparent: true,
    opacity: 0.6,
    depthWrite: false
  });
  const runoffTex2 = runoffTexture();
  runoffTex2.wrapS = runoffTex2.wrapT = THREE.RepeatWrapping;
  const runoffMat2 = new THREE.MeshBasicMaterial({
    map: runoffTex2,
    transparent: true,
    opacity: 0.55,
    depthWrite: false
  });
  group.add(plane(5.0, 2.5, { mat: runoffMat, x: -5.1, y: 1.7, z: 1.04 }));
  group.add(plane(4.5, 2.5, { mat: runoffMat2, x: 1.04, y: 1.7, z: -1.3, ry: Math.PI / 2 }));

  // --- sign / lightbox flicker -------------------------------------------
  const flicker = refs.signMats.map((mat, i) => ({
    mat,
    phase: r() * 6,
    nextDip: 3 + r() * 5,
    until: 0
  }));

  const updateFlicker = (t) => {
    for (const f of flicker) {
      if (t > f.nextDip) {
        f.until = t + 0.16 + r() * 0.22;
        f.nextDip = t + 3.5 + r() * 7;
      }
      let b = 1 + Math.sin(t * 6.1 + f.phase) * 0.025 + Math.sin(t * 23.7 + f.phase) * 0.012;
      if (t < f.until) {
        b *= Math.sin(t * 70 + f.phase) > -0.2 ? 0.42 : 0.9;
      }
      f.mat.color.setScalar(b);
    }
  };

  // --- automatic door ----------------------------------------------------
  const DOOR_T = 24;
  const updateDoor = (t) => {
    const c = t % DOOR_T;
    let open = 0;
    if (c > 13.5 && c < 19.2) {
      open = smooth((c - 13.5) / 1.1) - smooth((c - 18.1) / 1.1);
    }
    open = clamp01(open);
    for (const p of refs.doorPanels) {
      p.group.position.x = (p.open - p.closed) * open;
    }
    return open;
  };

  // --- traffic signals ---------------------------------------------------
  const LAMP = {
    red: ['#ff5b4d', '#3a1b1b'],
    yellow: ['#ffd75a', '#3a331b'],
    green: ['#4ade80', '#1b3a2a']
  };
  const updateSignals = (t) => {
    for (const head of refs.signalHeads) {
      const c = (t + (head.phase || 0) * 9.4) % 21;
      const on = c < 11 ? 'green' : c < 13.4 ? 'yellow' : 'red';
      for (const key of ['red', 'yellow', 'green']) {
        head[key].color.setStyle(key === on ? LAMP[key][0] : LAMP[key][1]);
      }
      head.active = on;
    }
  };

  // --- wet-surface shimmer ------------------------------------------------
  const reflBase = new Map();
  const updateReflections = (t) => {
    refs.reflectionMats.forEach((m, i) => {
      if (!reflBase.has(m)) reflBase.set(m, m.opacity);
      const base = reflBase.get(m);
      m.opacity = base * (0.82 + 0.18 * Math.sin(t * 1.7 + i * 1.9) + 0.06 * Math.sin(t * 9.3 + i));
    });
    const head = refs.signalHeads[0];
    if (head && refs.signalRefl) {
      const key = head.active || 'green';
      refs.signalRefl.color.setStyle(LAMP[key][0]);
    }
  };

  return {
    group,
    update(t, dt) {
      updateRain(dt);
      updateDrips(dt);
      updateRipples(dt);
      updateDoor(t);
      updateFlicker(t);
      updateSignals(t);
      updateReflections(t);
      runoffTex.offset.y = -t * 0.045;
      runoffTex2.offset.y = -t * 0.038;
      runoffTex.offset.x = Math.sin(t * 0.4) * 0.02;
    }
  };
}
