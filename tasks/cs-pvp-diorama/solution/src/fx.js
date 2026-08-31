// 细微动效 — fine motion layer: rain streaks, falling drips, vent steam,
// sheet lightning, shutter micro-vibration, beacon alternation, tube flicker,
// drain-water scroll, searchlight cone aim. All updates are driven from one
// per-frame tick.
import * as THREE from 'three';
import { noOutline } from './utils.js';
import { steamTexture, glowTexture } from './textures.js';

const RAIN_N = 850;
const RAIN_H = 27;
const RAIN_BOX = 34;

function buildRain(scene) {
  const positions = new Float32Array(RAIN_N * 2 * 3);
  const speed = new Float32Array(RAIN_N * 2);
  const tip = new Float32Array(RAIN_N * 2);
  for (let i = 0; i < RAIN_N; i++) {
    const x = (Math.random() * 2 - 1) * RAIN_BOX;
    const y0 = Math.random() * RAIN_H;
    const z = (Math.random() * 2 - 1) * RAIN_BOX;
    const s = 14 + Math.random() * 9;
    const len = 0.45 + Math.random() * 0.5;
    positions.set([x, y0, z, x, y0, z], i * 6);
    speed[i * 2] = s; speed[i * 2 + 1] = s;
    tip[i * 2] = 0; tip[i * 2 + 1] = 1;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
  geo.setAttribute('aTip', new THREE.BufferAttribute(tip, 1));
  const mat = noOutline(new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uHeight: { value: RAIN_H },
      uWind: { value: 1.4 },
      uColor: { value: new THREE.Color(0xa9c0e2) },
    },
    vertexShader: /* glsl */`
      attribute float aSpeed;
      attribute float aTip;
      uniform float uTime;
      uniform float uHeight;
      uniform float uWind;
      varying float vAlpha;
      void main() {
        float y = mod( position.y - uTime * aSpeed, uHeight );
        vec3 p = vec3( position.x + uWind * ( y / uHeight ), y + aTip * ( 0.4 + aSpeed * 0.02 ), position.z + uWind * 0.3 * ( y / uHeight ) );
        vAlpha = smoothstep( 0.0, 2.5, y ) * smoothstep( uHeight, uHeight - 3.0, y );
        vAlpha *= 0.24 + 0.2 * aTip;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4( uColor, vAlpha );
      }`,
  }));
  const rain = new THREE.LineSegments(geo, mat);
  rain.frustumCulled = false;
  scene.add(rain);
  return mat.uniforms.uTime;
}

function buildDrips(scene, points) {
  const n = points.length;
  if (!n) return null;
  const pos = new Float32Array(n * 3);
  const phase = new Float32Array(n);
  const rate = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    pos.set([points[i].x, points[i].y, points[i].z], i * 3);
    phase[i] = Math.random();
    rate[i] = 0.45 + Math.random() * 0.5;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  geo.setAttribute('aRate', new THREE.BufferAttribute(rate, 1));
  const mat = noOutline(new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uTime: { value: 0 }, uFloor: { value: 0.05 } },
    vertexShader: /* glsl */`
      attribute float aPhase;
      attribute float aRate;
      uniform float uTime;
      uniform float uFloor;
      varying float vAlpha;
      void main() {
        float cyc = fract( uTime * aRate * 0.35 + aPhase );
        float fall = cyc * cyc;
        vAlpha = ( 1.0 - cyc ) * 0.9;
        vec4 mv = modelViewMatrix * vec4( p, 1.0 );
        gl_Position = projectionMatrix * mv;
        gl_PointSize = 220.0 / max( 1.0, -mv.z );
      }`,
    fragmentShader: /* glsl */`
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float a = smoothstep( 0.5, 0.1, length( c ) ) * vAlpha;
        gl_FragColor = vec4( 0.75, 0.83, 0.95, a );
      }`,
  }));
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  scene.add(pts);
  return mat.uniforms.uTime;
}

// Steam as a proper closure with base positions captured.
function makeSteam(scene, vents) {
  const tex = steamTexture();
  const items = vents.map((v) => {
    const m = new THREE.SpriteMaterial({
      map: tex, transparent: true, opacity: 0, depthWrite: false, color: 0xcfe0ee,
    });
    const s = new THREE.Sprite(m);
    s.position.copy(v);
    scene.add(s);
    return { s, base: v.clone(), phase: Math.random(), rate: 0.09 + Math.random() * 0.07 };
  });
  return (t) => {
    for (const it of items) {
      const c = (t * it.rate + it.phase) % 1;
      it.s.position.set(it.base.x, it.base.y + c * 2.2, it.base.z);
      const sc = 1.1 + c * 2.6;
      it.s.scale.set(sc, sc, 1);
      it.s.material.opacity = 0.30 * Math.sin(Math.PI * c);
    }
  };
}

export function buildFX(scene, ctx, lighting) {
  const searchLight = lighting.search;
  const rainTime = buildRain(scene);
  const dripTime = buildDrips(scene, ctx.drips);
  const steamFn = makeSteam(scene, ctx.steams);
  // Clone shared glow materials so animation stays local to these meshes.
  const beacons = (ctx.beacons || []).map((b) => {
    b.material = b.material.clone();
    noOutline(b.material);
    return b;
  });
  if (ctx.fluoroTube) ctx.fluoroTube.material = noOutline(ctx.fluoroTube.material.clone());
  if (ctx.alleyLamp) ctx.alleyLamp.material = noOutline(ctx.alleyLamp.material.clone());
  if (ctx.redSeam) ctx.redSeam.material = noOutline(ctx.redSeam.material.clone());

  // Lightning scheduler.
  let nextBolt = 4 + Math.random() * 8;
  let boltT = -10;
  const bgBase = new THREE.Color(0x0d1420);
  const bgFlash = new THREE.Color(0x43557a);
  const hemiBase = lighting.hemi.intensity;
  const ambBase = lighting.ambient.intensity;
  const moonBase = lighting.moon.intensity;

  let shutterNext = 6, shutterT = -10;
  const shutterBaseX = ctx.shutter ? ctx.shutter.position.x : 0;

  return function update(dt, t) {
    rainTime.value = t;
    if (dripTime) dripTime.value = t;
    steamFn(t);
    for (const u of ctx.uniforms || []) u.value = t;
    for (const s of ctx.scrollMats || []) s.mat.map.offset.y -= s.speed * dt;

    // lightning
    if (t > nextBolt) {
      boltT = t;
      nextBolt = t + 7 + Math.random() * 14;
    }
    const lb = t - boltT;
    if (lb >= 0 && lb < 1.1) {
      const f = Math.max(
        Math.exp(-lb * 14) * 1.0,
        Math.exp(-Math.abs(lb - 0.18) * 16) * 0.8,
        Math.exp(-Math.abs(lb - 0.32) * 20) * 0.55,
      );
      lighting.hemi.intensity = hemiBase * (1 + f * 2.6);
      lighting.ambient.intensity = ambBase * (1 + f * 2.2);
      lighting.moon.intensity = moonBase * (1 + f * 1.6);
      lighting.scene.background.copy(bgBase).lerp(bgFlash, Math.min(1, f));
    } else {
      lighting.hemi.intensity = hemiBase;
      lighting.ambient.intensity = ambBase;
      lighting.moon.intensity = moonBase;
      lighting.scene.background.copy(bgBase);
    }

    // roll-door micro vibration
    if (ctx.shutter) {
      if (t > shutterNext) {
        shutterT = t;
        shutterNext = t + 5 + Math.random() * 7;
      }
      const sv = t - shutterT;
      const env = sv >= 0 && sv < 0.9 ? Math.sin(Math.PI * (sv / 0.9)) : 0;
      ctx.shutter.position.x = shutterBaseX + Math.sin(t * 63) * 0.012 * env;
    }

    // beacon alternation (van roof)
    if (beacons.length === 2) {
      const p = (t * 1.1) % 2;
      const r = Math.max(0, Math.sin(p * Math.PI));
      const b = Math.max(0, Math.sin((p - 1) * Math.PI));
      beacons[0].material.color.setRGB(1, 0.22, 0.16).multiplyScalar(0.25 + r * 1.6);
      beacons[1].material.color.setRGB(0.2, 0.4, 1).multiplyScalar(0.25 + b * 1.6);
    }

    // B guard-room broken fluorescent + alley wall lamp flicker
    if (ctx.fluoroTube) {
      const s = Math.sin(t * 43) > 0.88 ? 0.2 : (Math.sin(t * 5.3) > -0.85 ? 1 : 0.5);
      ctx.fluoroTube.material.color.setRGB(1, 0.78, 0.45).multiplyScalar(0.3 + s * 1.2);
    }
    if (ctx.alleyLamp) {
      const st = Math.sin(t * 61) > 0.82 ? 0.3 : 1;
      ctx.alleyLamp.material.color.setRGB(0.72, 0.84, 1).multiplyScalar(0.3 + st * 1.1);
    }
    if (ctx.redSeam) {
      const p = 0.5 + 0.5 * Math.sin(t * 0.9);
      ctx.redSeam.material.color.setRGB(1, 0.2, 0.13).multiplyScalar(0.35 + p * 1.3);
    }

    // searchlight cone follows the sweeping target
    if (ctx.searchCone) {
      ctx.searchCone.lookAt(searchLight.target.position);
    }
  };
}
