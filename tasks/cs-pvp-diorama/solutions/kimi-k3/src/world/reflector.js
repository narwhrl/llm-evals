// Single-pass planar reflector for rain puddles: the official Reflector
// renders the mirrored scene once per frame; the custom shader shows the
// reflection only where the puddle mask says so, with ripple distortion.
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export class PuddleReflector extends Reflector {
  constructor(geometry, { textureWidth = 1024, textureHeight = 1024, clipBias = 0.004, mask, ripple } = {}) {
    super(geometry, {
      textureWidth,
      textureHeight,
      clipBias,
      shader: {
        name: 'PuddleShader',
        uniforms: {
          color: { value: null },
          tDiffuse: { value: null },
          textureMatrix: { value: null },
          uMask: { value: mask },
          uRipple: { value: ripple },
          uTime: { value: 0 },
          uDeep: { value: new THREE.Color(0x18222e).convertSRGBToLinear() },
        },
        vertexShader: /* glsl */ `
          uniform mat4 textureMatrix;
          varying vec2 vUv;
          varying vec4 vUvProj;
          void main() {
            vUv = uv;
            vUvProj = textureMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D tDiffuse;
          uniform sampler2D uMask;
          uniform sampler2D uRipple;
          uniform float uTime;
          uniform vec3 uDeep;
          varying vec2 vUv;
          varying vec4 vUvProj;
          void main() {
            // never overlay the sunken corridor / ramps (the plane floats above them)
            if ( abs( vUv.x - 0.5 ) < 0.062 && vUv.y > 0.144 && vUv.y < 0.856 ) discard;
            float mask = texture2D( uMask, vUv ).r;
            float puddle = smoothstep( 0.25, 0.75, mask );
            vec2 r1 = texture2D( uRipple, vUv * 22.0 + vec2( uTime * 0.031, uTime * 0.017 ) ).rg;
            vec2 r2 = texture2D( uRipple, vUv * 13.0 - vec2( uTime * 0.019, uTime * 0.027 ) ).rg;
            vec2 distort = ( r1 - r2 ) * ( 0.05 * puddle + 0.012 );
            vec4 uvp = vUvProj;
            uvp.xy += distort * uvp.w;
            vec3 refl = texture2DProj( tDiffuse, uvp ).rgb;
            vec3 col = mix( uDeep, refl, 0.88 );
            col += vec3( 0.03, 0.042, 0.06 ) * puddle;
            // puddles mirror strongly; everywhere else a faint wet sheen
            float alpha = puddle * 0.74 + ( 1.0 - puddle ) * 0.12;
            gl_FragColor = vec4( col, alpha );
          }
        `,
      },
    });
    this.isPuddleReflector = true;
    this.material.transparent = true;
    this.material.depthWrite = false;
    // Reflector assigns material.uniforms.textureMatrix/tDiffuse internally.
  }
}
