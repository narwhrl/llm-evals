// Dynamic atmosphere: GPU rain streaks, edge drips, steam vents, wall water
// streaks, and occasional distant lightning.
import * as THREE from 'three';
import { streakTexture, blobTexture } from '../core/textures.js';

// --- rain ---------------------------------------------------------------------
function buildRain(count = 2600) {
  const COUNT = count;
  const geo = new THREE.InstancedBufferGeometry();
  const quad = new THREE.PlaneGeometry(1, 1);
  geo.index = quad.index;
  geo.setAttribute('position', quad.attributes.position);
  geo.setAttribute('uv', quad.attributes.uv);
  const offsets = new Float32Array(COUNT * 4); // x, y0, z, speed
  for (let i = 0; i < COUNT; i++) {
    offsets[i * 4 + 0] = (Math.random() - 0.5) * 82;
    offsets[i * 4 + 1] = Math.random() * 26;
    offsets[i * 4 + 2] = (Math.random() - 0.5) * 82;
    offsets[i * 4 + 3] = 16 + Math.random() * 7;
  }
  geo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 4));
  geo.instanceCount = COUNT;

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x8ea6c8).convertSRGBToLinear() },
      // roofed volumes where rain must not fall through: warehouse, B house
      uRectA: { value: new THREE.Vector4(-28.6, -25.6, -11.4, -6.4) },
      uRectB: { value: new THREE.Vector4(15.4, -22.6, 28.6, -10.4) },
      uRoofY: { value: new THREE.Vector2(7.0, 6.8) },
    },
    vertexShader: /* glsl */ `
      attribute vec4 aOffset;
      uniform float uTime;
      uniform vec4 uRectA;
      uniform vec4 uRectB;
      uniform vec2 uRoofY;
      varying vec2 vUv;
      varying float vFade;
      void main() {
        vUv = uv;
        float H = 26.0;
        float y = mod( aOffset.y - uTime * aOffset.w, H );
        vec3 basePos = vec3( aOffset.x, y, aOffset.z );
        float inA = step( uRectA.x, basePos.x ) * step( basePos.x, uRectA.z )
                  * step( uRectA.y, basePos.z ) * step( basePos.z, uRectA.w )
                  * step( basePos.y, uRoofY.x );
        float inB = step( uRectB.x, basePos.x ) * step( basePos.x, uRectB.z )
                  * step( uRectB.y, basePos.z ) * step( basePos.z, uRectB.w )
                  * step( basePos.y, uRoofY.y );
        vFade = 1.0 - clamp( inA + inB, 0.0, 1.0 );
        vFade *= smoothstep( 0.0, 0.4, y ) * smoothstep( H, H - 3.0, y );
        vec3 right = normalize( vec3( viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0] ) );
        vec3 up = normalize( vec3( -0.10, 1.0, -0.03 ) ); // slight wind slant
        vec3 pos = basePos + right * ( position.x * 0.032 ) + up * ( position.y * 0.95 );
        gl_Position = projectionMatrix * viewMatrix * vec4( pos, 1.0 );
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying vec2 vUv;
      varying float vFade;
      void main() {
        float a = 1.0 - abs( vUv.x - 0.5 ) * 2.0;
        a *= smoothstep( 0.0, 0.12, vUv.y ) * smoothstep( 1.0, 0.88, vUv.y );
        gl_FragColor = vec4( uColor, a * 0.45 * vFade );
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 10;
  return mesh;
}

// --- edge drips ---------------------------------------------------------------
function buildDrips(drips) {
  const COUNT = Math.max(1, drips.length * 2);
  const geo = new THREE.InstancedBufferGeometry();
  const quad = new THREE.PlaneGeometry(1, 1);
  geo.index = quad.index;
  geo.setAttribute('position', quad.attributes.position);
  geo.setAttribute('uv', quad.attributes.uv);
  const fromArr = new Float32Array(COUNT * 3); // emitter position
  const miscArr = new Float32Array(COUNT * 2); // fall distance, phase
  for (let i = 0; i < COUNT; i++) {
    const d = drips[i % drips.length] || { from: new THREE.Vector3(), to: 0 };
    fromArr[i * 3 + 0] = d.from.x + (i >= drips.length ? 0.35 : 0);
    fromArr[i * 3 + 1] = d.from.y;
    fromArr[i * 3 + 2] = d.from.z + (i >= drips.length ? 0.2 : 0);
    miscArr[i * 2 + 0] = Math.max(0.2, d.from.y - d.to);
    miscArr[i * 2 + 1] = Math.random();
  }
  geo.setAttribute('aFrom', new THREE.InstancedBufferAttribute(fromArr, 3));
  geo.setAttribute('aMisc', new THREE.InstancedBufferAttribute(miscArr, 2));
  geo.instanceCount = COUNT;

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xa8bdd8).convertSRGBToLinear() } },
    vertexShader: /* glsl */ `
      attribute vec3 aFrom;
      attribute vec2 aMisc;
      uniform float uTime;
      varying vec2 vUv;
      varying float vFade;
      void main() {
        vUv = uv;
        float speed = 3.6;
        float fallT = aMisc.x / speed;
        float period = fallT + 0.9;
        float ct = mod( uTime + aMisc.y * period, period );
        float falling = step( ct, fallT );
        float y = aFrom.y - min( ct * speed, aMisc.x );
        vFade = falling * smoothstep( 0.0, 0.06, ct ) * ( 0.45 + 0.55 * ct / max( fallT, 0.001 ) );
        vec3 right = normalize( vec3( viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0] ) );
        vec3 pos = vec3( aFrom.x, y, aFrom.z ) + right * ( position.x * 0.02 ) + vec3( 0.0, position.y * 0.16, 0.0 );
        gl_Position = projectionMatrix * viewMatrix * vec4( pos, 1.0 );
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying vec2 vUv;
      varying float vFade;
      void main() {
        float a = 1.0 - abs( vUv.x - 0.5 ) * 2.0;
        gl_FragColor = vec4( uColor, a * 0.55 * vFade );
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 11;
  return mesh;
}

// --- steam vents ----------------------------------------------------------------
function buildSteam(points) {
  const PER = 9;
  const COUNT = Math.max(1, points.length * PER);
  const geo = new THREE.InstancedBufferGeometry();
  const quad = new THREE.PlaneGeometry(1, 1);
  geo.index = quad.index;
  geo.setAttribute('position', quad.attributes.position);
  geo.setAttribute('uv', quad.attributes.uv);
  const baseArr = new Float32Array(COUNT * 3); // vent origin
  const puffArr = new Float32Array(COUNT * 2); // phase, seed
  for (let i = 0; i < COUNT; i++) {
    const p = points[Math.floor(i / PER)] || new THREE.Vector3();
    baseArr[i * 3 + 0] = p.x;
    baseArr[i * 3 + 1] = p.y;
    baseArr[i * 3 + 2] = p.z;
    puffArr[i * 2 + 0] = Math.random();
    puffArr[i * 2 + 1] = Math.random();
  }
  geo.setAttribute('aBase', new THREE.InstancedBufferAttribute(baseArr, 3));
  geo.setAttribute('aPuff', new THREE.InstancedBufferAttribute(puffArr, 2));
  geo.instanceCount = COUNT;

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uMap: { value: blobTexture() },
      uColor: { value: new THREE.Color(0xcdd8e6).convertSRGBToLinear() },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aBase;
      attribute vec2 aPuff;
      uniform float uTime;
      varying vec2 vUv;
      varying float vAlpha;
      void main() {
        vUv = uv;
        float cycle = fract( uTime * 0.16 + aPuff.x );
        float seed = aPuff.y;
        float size = mix( 0.35, 1.5, cycle ) * ( 0.7 + seed * 0.6 );
        vAlpha = sin( cycle * 3.14159 ) * 0.26;
        vec3 drift = vec3( cycle * 0.7, cycle * 2.4, cycle * 0.25 );
        vec3 right = normalize( vec3( viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0] ) );
        vec3 up2 = normalize( vec3( viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1] ) );
        vec3 pos = aBase + drift + ( right * position.x + up2 * position.y ) * size;
        gl_Position = projectionMatrix * viewMatrix * vec4( pos, 1.0 );
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying float vAlpha;
      void main() {
        vec4 tex = texture2D( uMap, vUv );
        gl_FragColor = vec4( uColor, tex.a * vAlpha );
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 12;
  return mesh;
}

// --- wall water streaks ------------------------------------------------------------
function buildStreaks(scene) {
  const tex = streakTexture();
  const defs = [
    { x: -20, y: 3.4, z: -6.76, w: 15, h: 6.4, ry: 0 }, // warehouse south face
    { x: 22, y: 3.4, z: -10.78, w: 11.4, h: 6.5, ry: 0 }, // B house south face
    { x: -3.47, y: 1.7, z: -12, w: 10, h: 4.4, ry: Math.PI / 2 }, // mid west wall inner
    { x: 0, y: 1.8, z: 34.66, w: 18, h: 3.2, ry: Math.PI }, // CT rear wall inner
  ];
  const mats = [];
  for (const d of defs) {
    const t = tex.clone();
    t.needsUpdate = true;
    const m = new THREE.MeshBasicMaterial({
      map: t,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    m.userData.noOutline = true;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(d.w, d.h), m);
    mesh.position.set(d.x, d.y, d.z);
    mesh.rotation.y = d.ry;
    mesh.renderOrder = 3;
    scene.add(mesh);
    mats.push(m);
  }
  return mats;
}

// --- lightning ----------------------------------------------------------------------
function makeLightning(sky, rig) {
  const state = { next: 5 + Math.random() * 6, pulses: [] };
  const baseHemi = rig.hemi.intensity;
  const baseMoon = rig.moon.intensity;
  const tick = (t) => {
    if (t >= state.next) {
      state.next = t + 9 + Math.random() * 9;
      state.pulses = [];
      let at = t;
      const n = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < n; i++) {
        const dur = 0.08 + Math.random() * 0.12;
        state.pulses.push({ at, dur, amp: 0.5 + Math.random() * 0.5 });
        at += dur + 0.05 + Math.random() * 0.12;
      }
    }
    let flash = 0;
    for (const p of state.pulses) {
      const k = (t - p.at) / p.dur;
      if (k >= 0 && k <= 1) flash = Math.max(flash, Math.sin(k * Math.PI) * p.amp);
    }
    sky.material.uniforms.uFlash.value = flash * 0.55;
    rig.hemi.intensity = baseHemi * (1 + flash * 1.7);
    rig.moon.intensity = baseMoon * (1 + flash * 1.3);
  };
  return { tick, trigger: () => { state.next = -1; } };
}

export function buildFX(ctx, { sky, rig }) {
  const { scene } = ctx;
  const rain = buildRain(ctx.quality.rain);
  scene.add(rain);
  const drips = buildDrips(ctx.drips);
  scene.add(drips);
  const steam = buildSteam(ctx.steamPoints);
  scene.add(steam);
  const streakMats = buildStreaks(scene);
  const lightning = makeLightning(sky, rig);

  return {
    forceFlash: lightning.trigger,
    update(t, dt) {
      rain.material.uniforms.uTime.value = t;
      drips.material.uniforms.uTime.value = t;
      steam.material.uniforms.uTime.value = t;
      for (const m of streakMats) {
        m.map.offset.y -= dt * 0.22;
      }
      lightning.tick(t);
    },
  };
}
