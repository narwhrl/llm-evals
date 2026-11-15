import * as THREE from 'three';
import { glowTexture } from '../textures.js';

/**
 * Weather: continuous rain, drips off edges, steam from vents and a rare
 * lightning flash over the freight yard.
 */

const LAMP = new THREE.Vector3(5.75, 3.9, -6.2);

export function createWeather(scene, { drops = 3800, height = 16 } = {}) {
  const group = new THREE.Group();
  group.name = 'weather';

  // --- rain -------------------------------------------------------------
  const rainGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(drops * 6);
  const aEnd = new Float32Array(drops * 2);
  const aSpeed = new Float32Array(drops * 2);
  const aLen = new Float32Array(drops * 2);
  const aSeed = new Float32Array(drops * 2);
  for (let i = 0; i < drops; i++) {
    const x = (Math.random() - 0.5) * 34;
    const z = (Math.random() - 0.5) * 34;
    const y = Math.random() * height;
    const speed = 11 + Math.random() * 9;
    const len = 0.32 + Math.random() * 0.55;
    const seed = Math.random();
    for (let v = 0; v < 2; v++) {
      const o = (i * 2 + v) * 3;
      pos[o] = x; pos[o + 1] = y; pos[o + 2] = z;
      aEnd[i * 2 + v] = v;
      aSpeed[i * 2 + v] = speed;
      aLen[i * 2 + v] = len;
      aSeed[i * 2 + v] = seed;
    }
  }
  rainGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  rainGeo.setAttribute('aEnd', new THREE.BufferAttribute(aEnd, 1));
  rainGeo.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1));
  rainGeo.setAttribute('aLen', new THREE.BufferAttribute(aLen, 1));
  rainGeo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1));

  const rainMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uHeight: { value: height },
      uWind: { value: new THREE.Vector2(0.55, 0.22) },
      uCold: { value: new THREE.Color(0x7fa8d8) },
      uWarm: { value: new THREE.Color(0xffbe73) },
      uLamp: { value: LAMP.clone() },
    },
    vertexShader: /* glsl */`
      uniform float uTime;
      uniform float uHeight;
      uniform vec2 uWind;
      attribute float aEnd;
      attribute float aSpeed;
      attribute float aLen;
      attribute float aSeed;
      varying vec3 vWorld;
      varying float vFade;
      void main() {
        float fall = mod( uTime * aSpeed + aSeed * uHeight, uHeight );
        float y = mod( position.y - fall + uHeight, uHeight );
        float dropped = uHeight - y;
        vec3 p = position;
        p.x += uWind.x * dropped * 0.05;
        p.z += uWind.y * dropped * 0.05;
        p.y = y - aEnd * aLen;
        vWorld = p;
        vec4 mv = modelViewMatrix * vec4( p, 1.0 );
        vFade = clamp( 1.0 - ( -mv.z ) / 80.0, 0.0, 1.0 );
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uCold;
      uniform vec3 uWarm;
      uniform vec3 uLamp;
      varying vec3 vWorld;
      varying float vFade;
      void main() {
        float d = distance( vWorld, uLamp );
        float lamp = exp( -d * 0.42 );
        vec3 col = mix( uCold, uWarm, clamp( lamp * 0.9, 0.0, 1.0 ) );
        float a = vFade * ( 0.19 + lamp * 0.7 );
        gl_FragColor = vec4( col * a, a );
      }
    `,
  });
  const rain = new THREE.LineSegments(rainGeo, rainMat);
  rain.frustumCulled = false;
  rain.renderOrder = 6;
  group.add(rain);

  // --- drips ------------------------------------------------------------
  const anchors = [
    [-13.4, 4.5, -6.6], [-7.4, 4.5, -6.6], [-13.4, 4.5, -13.2], [-10.4, 4.5, -13.2],
    [1.3, 7.35, -13.4], [5.9, 7.35, -13.4], [7.0, 3.65, -13.4], [11.0, 3.65, -14.5],
    [9.4, 5.6, -10.8], [14.4, 5.6, -6.8], [11.9, 5.6, -10.8],
    [5.75, 3.95, -6.2], [3.4, 2.16, 11.2], [11.2, 2.2, -6.4], [14.2, 2.2, 0.0],
    [-12.4, 1.2, -6.75], [-8.4, 1.2, -6.75],
  ];
  const drips = [];
  for (const a of anchors) {
    const n = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < n; i++) {
      drips.push({
        x: a[0] + (Math.random() - 0.5) * 0.25,
        y: a[1],
        z: a[2] + (Math.random() - 0.5) * 0.25,
        fall: a[1] + 0.1,
      });
    }
  }
  const dripGeo = new THREE.BufferGeometry();
  const dpos = new Float32Array(drips.length * 6);
  const dend = new Float32Array(drips.length * 2);
  const dphase = new Float32Array(drips.length * 2);
  const dperiod = new Float32Array(drips.length * 2);
  const dfall = new Float32Array(drips.length * 2);
  drips.forEach((d, i) => {
    const period = 1.4 + Math.random() * 2.4;
    for (let v = 0; v < 2; v++) {
      const o = (i * 2 + v) * 3;
      dpos[o] = d.x; dpos[o + 1] = d.y; dpos[o + 2] = d.z;
      dend[i * 2 + v] = v;
      dphase[i * 2 + v] = Math.random() * period;
      dperiod[i * 2 + v] = period;
      dfall[i * 2 + v] = d.fall;
    }
  });
  dripGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  dripGeo.setAttribute('aEnd', new THREE.BufferAttribute(dend, 1));
  dripGeo.setAttribute('aPhase', new THREE.BufferAttribute(dphase, 1));
  dripGeo.setAttribute('aPeriod', new THREE.BufferAttribute(dperiod, 1));
  dripGeo.setAttribute('aFall', new THREE.BufferAttribute(dfall, 1));

  const dripMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */`
      uniform float uTime;
      attribute float aEnd;
      attribute float aPhase;
      attribute float aPeriod;
      attribute float aFall;
      varying float vAlpha;
      void main() {
        float t = fract( ( uTime + aPhase ) / aPeriod );
        vec3 p = position;
        p.y -= t * t * aFall;
        p.y -= aEnd * 0.1;
        vAlpha = ( 1.0 - t ) * 0.9;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
      }
    `,
    fragmentShader: /* glsl */`
      varying float vAlpha;
      void main() {
        float a = vAlpha * 0.75;
        gl_FragColor = vec4( vec3( 0.72, 0.83, 1.0 ) * a, a );
      }
    `,
  });
  const dripMesh = new THREE.LineSegments(dripGeo, dripMat);
  dripMesh.frustumCulled = false;
  dripMesh.renderOrder = 7;
  group.add(dripMesh);

  // --- steam ------------------------------------------------------------
  const vents = [
    [-12.2, 4.75, -8.3], [-10.2, 4.75, -8.3], [-8.2, 4.75, -8.3],
    [14.6, 0.72, -10.9], [11.9, 5.6, -10.8],
  ];
  const perVent = 16;
  const steamCount = vents.length * perVent;
  const sGeo = new THREE.BufferGeometry();
  const spos = new Float32Array(steamCount * 3);
  const sseed = new Float32Array(steamCount);
  const sper = new Float32Array(steamCount);
  let k = 0;
  for (const v of vents) {
    for (let i = 0; i < perVent; i++, k++) {
      spos[k * 3] = v[0] + (Math.random() - 0.5) * 0.5;
      spos[k * 3 + 1] = v[1];
      spos[k * 3 + 2] = v[2] + (Math.random() - 0.5) * 0.4;
      sseed[k] = Math.random();
      sper[k] = 4 + Math.random() * 3;
    }
  }
  sGeo.setAttribute('position', new THREE.BufferAttribute(spos, 3));
  sGeo.setAttribute('aSeed', new THREE.BufferAttribute(sseed, 1));
  sGeo.setAttribute('aPeriod', new THREE.BufferAttribute(sper, 1));

  const steamMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      tSprite: { value: glowTexture() },
    },
    vertexShader: /* glsl */`
      uniform float uTime;
      attribute float aSeed;
      attribute float aPeriod;
      varying float vAlpha;
      void main() {
        float t = fract( uTime / aPeriod + aSeed );
        vec3 p = position;
        p.y += t * 2.8;
        p.x += sin( aSeed * 41.0 + t * 2.4 ) * 0.45 * t;
        p.z += cos( aSeed * 27.0 + t * 1.9 ) * 0.45 * t;
        vAlpha = sin( t * 3.14159 ) * 0.55;
        vec4 mv = modelViewMatrix * vec4( p, 1.0 );
        gl_PointSize = ( 26.0 + t * 110.0 ) / max( -mv.z, 1.0 );
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D tSprite;
      varying float vAlpha;
      void main() {
        vec4 c = texture2D( tSprite, gl_PointCoord );
        float a = c.a * vAlpha * 0.42;
        gl_FragColor = vec4( vec3( 0.72, 0.80, 0.92 ) * a, a );
      }
    `,
  });
  const steam = new THREE.Points(sGeo, steamMat);
  steam.frustumCulled = false;
  steam.renderOrder = 5;
  group.add(steam);

  scene.add(group);

  // --- lightning schedule ----------------------------------------------
  let next = 6 + Math.random() * 8;
  let strikeT = -1;
  const seq = [];

  return {
    group,
    update(t, dt) {
      rainMat.uniforms.uTime.value = t;
      dripMat.uniforms.uTime.value = t;
      steamMat.uniforms.uTime.value = t;

      // gentle wind variation
      rainMat.uniforms.uWind.value.set(0.55 + Math.sin(t * 0.21) * 0.25, 0.22 + Math.cos(t * 0.17) * 0.18);

      // lightning
      let flash = 0;
      if (strikeT >= 0) {
        strikeT += dt;
        let done = true;
        for (const s of seq) {
          const local = strikeT - s.at;
          if (local >= 0 && local < s.len) {
            flash = Math.max(flash, (1 - local / s.len) * s.power);
            done = false;
          }
        }
        if (done && strikeT > 1.2) { strikeT = -1; next = 9 + Math.random() * 16; }
      } else {
        next -= dt;
        if (next <= 0) {
          strikeT = 0;
          seq.length = 0;
          let at = 0;
          const n = 2 + Math.floor(Math.random() * 2);
          for (let i = 0; i < n; i++) {
            seq.push({ at, len: 0.09 + Math.random() * 0.1, power: 0.45 + Math.random() * 0.4 });
            at += 0.13 + Math.random() * 0.22;
          }
        }
      }
      return flash;
    },
  };
}
