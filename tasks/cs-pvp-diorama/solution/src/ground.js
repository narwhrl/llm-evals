// Square concrete pedestal, wet ground, and the puddle planar-reflection layer.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { noOutline } from './utils.js';
import * as T from './textures.js';
import { toon } from './materials.js';

// Puddle blobs: [x, z, radiusX, radiusZ] in world units. Placed in low ground:
// mid lane, plazas, alleys, CT approach, near the B street lamp.
export const PUDDLES = [
  [0, -18, 1.8, 2.4], [8, -24, 1.5, 2.0], [-20, -25, 1.6, 2.4],
  [-3, -6, 1.3, 2.4], [3.2, -12, 1.1, 2.0],
  [-8, -12, 1.4, 2.6], [-7.5, -6, 1.2, 1.8], [-15, -18, 1.4, 1.4],
  [-28, 2, 1.1, 3.2], [-27.5, -5, 0.9, 2.0],
  [11, -7, 1.8, 2.4], [14, -13, 1.4, 1.8], [9, -4.5, 1.2, 1.2],
  [22, -20, 1.5, 2.6],
  [0, 15, 2.2, 3.0], [-8, 21, 1.6, 2.0], [18, 18, 1.3, 2.2],
];

const PuddleShader = {
  name: 'PuddleReflector',
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    uTime: { value: 0 },
    uMask: { value: null },
  },
  vertexShader: /* glsl */`
    uniform mat4 textureMatrix;
    varying vec4 vUv4;
    varying vec2 vPuddleUv;
    void main() {
      vUv4 = textureMatrix * vec4( position, 1.0 );
      vPuddleUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  fragmentShader: /* glsl */`
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform sampler2D uMask;
    uniform float uTime;
    varying vec4 vUv4;
    varying vec2 vPuddleUv;

    float hash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }

    void main() {
      float puddle = texture2D( uMask, vPuddleUv ).r;

      // expanding raindrop ripple rings, two layers
      vec2 g = vPuddleUv * 46.0;
      vec2 id = floor( g );
      vec2 f = fract( g ) - 0.5;
      float r1 = hash( id );
      float ph = fract( uTime * ( 0.30 + r1 * 0.45 ) + r1 * 7.0 );
      float ring = smoothstep( 0.05, 0.0, abs( length( f ) - ph * 0.42 ) ) * ( 1.0 - ph );
      vec2 g2 = vPuddleUv * 71.0 + 17.0;
      vec2 id2 = floor( g2 );
      vec2 f2 = fract( g2 ) - 0.5;
      float r2 = hash( id2 );
      float ph2 = fract( uTime * ( 0.35 + r2 * 0.55 ) + r2 * 9.0 );
      float ring2 = smoothstep( 0.045, 0.0, abs( length( f2 ) - ph2 * 0.40 ) ) * ( 1.0 - ph2 );
      float rings = ring + ring2 * 0.7;

      // surface wobble distorts the reflection
      vec2 wobble = 0.014 * vec2(
        sin( vPuddleUv.y * 130.0 + uTime * 2.0 ) + sin( vPuddleUv.x * 76.0 - uTime * 1.6 ),
        cos( vPuddleUv.x * 110.0 + uTime * 1.8 ) + cos( vPuddleUv.y * 92.0 - uTime * 2.2 )
      ) * ( 0.4 + rings * 1.6 );

      vec4 refl = texture2DProj( tDiffuse, vUv4 + vec4( wobble * vUv4.w, 0.0, 0.0 ) );

      // keep lamp/light reflections punchy, everything else cool & dark
      float lum = dot( refl.rgb, vec3( 0.333 ) );
      vec3 tinted = refl.rgb * vec3( 0.30, 0.37, 0.50 );
      vec3 col = mix( tinted, refl.rgb * 1.05, smoothstep( 0.18, 0.55, lum ) );
      col += vec3( 0.45, 0.55, 0.72 ) * rings * 0.30;
      col *= color;

      gl_FragColor = vec4( col, puddle * 0.92 );

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

export function buildGround(scene) {
  const g = new THREE.Group();
  g.name = 'ground';

  // Pedestal slab — the collectible concrete base of the diorama.
  const sideTex = T.concreteTexture('#5a5e66', { seed: 37, rustStreaks: 3 });
  sideTex.wrapS = sideTex.wrapT = THREE.RepeatWrapping;
  sideTex.repeat.set(6, 1);
  const pedestal = new THREE.Mesh(
    new THREE.BoxGeometry(60, 3, 60),
    toon('pedestal', { color: 0x70747c, map: sideTex }),
  );
  pedestal.position.y = -1.5;
  pedestal.receiveShadow = true;
  g.add(pedestal);

  // Wet asphalt/concrete top.
  const top = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    toon('groundTop', { color: 0x8b9099, map: T.groundTopTexture() }),
  );
  top.rotation.x = -Math.PI / 2;
  top.position.y = 0.002;
  top.receiveShadow = true;
  g.add(top);

  // Puddle reflector with the custom masked/rippling shader.
  const mask = T.puddleMaskTexture(PUDDLES);
  const reflector = new Reflector(new THREE.PlaneGeometry(60, 60), {
    clipBias: 0.004,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xb8c4d8,
    shader: PuddleShader,
    multisample: 0,
  });
  reflector.rotation.x = -Math.PI / 2;
  reflector.position.y = 0.035;
  noOutline(reflector.material);
  reflector.material.transparent = true;
  reflector.material.uniforms.uMask.value = mask;
  g.add(reflector);

  scene.add(g);
  return { uniforms: [reflector.material.uniforms.uTime] };
}
