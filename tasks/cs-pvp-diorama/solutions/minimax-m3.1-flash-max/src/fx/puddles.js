import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { PUDDLES, SEWER, DRAIN, HALF } from '../config.js';
import { puddleMaskTexture, rippleTexture, ringTexture } from '../textures.js';

/**
 * Standing water. A single planar reflection is masked down to the puddle
 * field, distorted by scrolling ripple noise and lit by the scene lights, so
 * lamps, roofs and rain streaks show up in the water.
 */
const PuddleShader = {
  name: 'PuddleShader',
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    tMask: { value: null },
    tRipple: { value: null },
    uTime: { value: 0 },
    uWet: { value: new THREE.Color(0x0b141d) },
    uStrength: { value: 1.0 },
  },
  vertexShader: /* glsl */`
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec2 vLocal;
    varying vec3 vViewPosition;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      vViewPosition = -mvPosition.xyz;
      vUv = textureMatrix * vec4( position, 1.0 );
      vLocal = uv;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform sampler2D tMask;
    uniform sampler2D tRipple;
    uniform float uTime;
    uniform vec3 uWet;
    uniform float uStrength;
    varying vec4 vUv;
    varying vec2 vLocal;
    varying vec3 vViewPosition;

    void main() {
      float mask = texture2D( tMask, vLocal ).r;
      if ( mask < 0.02 ) discard;

      vec2 r1 = texture2D( tRipple, vLocal * 2.4 + vec2( uTime * 0.013, uTime * 0.009 ) ).rg - 0.5;
      vec2 r2 = texture2D( tRipple, vLocal * 6.1 - vec2( uTime * 0.021, uTime * 0.017 ) ).rg - 0.5;
      vec2 distort = r1 * 0.010 + r2 * 0.005;

      vec4 coord = vUv;
      coord.xy += distort * coord.w;
      vec3 refl = texture2DProj( tDiffuse, coord ).rgb;

      // fresnel: shallow angles reflect more strongly
      vec3 viewDir = normalize( vViewPosition );
      float fres = pow( 1.0 - clamp( viewDir.z, 0.0, 1.0 ), 2.0 );
      float mixAmt = clamp( uStrength * ( 0.52 + 0.85 * fres ), 0.0, 1.0 );

      vec3 col = mix( uWet, refl * 1.05, mixAmt );
      float alpha = clamp( mask * 0.95, 0.0, 1.0 );
      gl_FragColor = vec4( col, alpha );

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
};

export function createPuddles(scene, { width = 1024, height = 1024 } = {}) {
  const holes = [...SEWER, DRAIN];
  const mask = puddleMaskTexture(PUDDLES, 1024, holes);
  const ripple = rippleTexture(256);
  ripple.wrapS = ripple.wrapT = THREE.RepeatWrapping;

  const geo = new THREE.PlaneGeometry(HALF * 2, HALF * 2);
  const reflector = new Reflector(geo, {
    textureWidth: width,
    textureHeight: height,
    color: 0xffffff,
    clipBias: 0.003,
    multisample: 0,
    shader: PuddleShader,
  });
  reflector.rotateX(-Math.PI / 2);
  reflector.position.y = 0.03;
  reflector.material.transparent = true;
  reflector.material.depthWrite = false;
  reflector.material.uniforms.tMask.value = mask;
  reflector.material.uniforms.tRipple.value = ripple;
  reflector.material.uniforms.uWet.value = new THREE.Color(0x0a121b);
  reflector.renderOrder = 2;
  scene.add(reflector);

  // rain impact rings on the water
  const ringGeo = new THREE.BufferGeometry();
  const count = 46;
  const pos = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  const period = new Float32Array(count);
  const scale = new Float32Array(count);
  let i = 0;
  for (const p of PUDDLES) {
    const n = Math.max(1, Math.round(p.r * 1.6));
    for (let k = 0; k < n && i < count; k++, i++) {
      const a = Math.random() * Math.PI * 2;
      const rr = Math.random() * p.r * 0.8;
      pos[i * 3] = p.x + Math.cos(a) * rr;
      pos[i * 3 + 1] = 0.05;
      pos[i * 3 + 2] = p.z + Math.sin(a) * rr;
      phase[i] = Math.random();
      period[i] = 1.6 + Math.random() * 1.8;
      scale[i] = 0.5 + Math.random() * 0.9;
    }
  }
  ringGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  ringGeo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  ringGeo.setAttribute('aPeriod', new THREE.BufferAttribute(period, 1));
  ringGeo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));

  const ringMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      tRing: { value: ringTexture() },
      uSize: { value: 60 },
    },
    vertexShader: /* glsl */`
      uniform float uTime;
      uniform float uSize;
      attribute float aPhase;
      attribute float aPeriod;
      attribute float aScale;
      varying float vAlpha;
      void main() {
        float t = fract( ( uTime + aPhase * aPeriod ) / aPeriod );
        vAlpha = ( 1.0 - t ) * ( 1.0 - t );
        vec4 mv = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = uSize * aScale * ( 0.25 + t * 1.6 ) / max( -mv.z, 1.0 );
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D tRing;
      varying float vAlpha;
      void main() {
        vec4 c = texture2D( tRing, gl_PointCoord );
        gl_FragColor = vec4( vec3( 0.72, 0.82, 1.0 ), c.a * vAlpha * 0.55 );
      }
    `,
  });
  const rings = new THREE.Points(ringGeo, ringMat);
  rings.frustumCulled = false;
  rings.renderOrder = 3;
  scene.add(rings);

  return {
    reflector,
    update(t) {
      reflector.material.uniforms.uTime.value = t;
      ringMat.uniforms.uTime.value = t;
    },
  };
}
