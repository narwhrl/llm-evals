import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { COLORS } from '../palette.js';
import { toon, toonMap } from '../materials.js';
import { asphaltTexture, concreteTexture, puddleMaskTexture } from '../textures.js';
import { box, plane } from './helpers.js';

const PUDDLE_VERT = /* glsl */ `
uniform mat4 textureMatrix;
varying vec4 vUvProj;
varying vec2 vUvPlane;
void main() {
  vUvProj = textureMatrix * vec4(position, 1.0);
  vUvPlane = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const PUDDLE_FRAG = /* glsl */ `
uniform vec3 color;
uniform sampler2D tDiffuse;
uniform sampler2D tPuddle;
uniform float uStrength;
varying vec4 vUvProj;
varying vec2 vUvPlane;
void main() {
  vec4 refl = texture2DProj(tDiffuse, vUvProj);
  float mask = texture2D(tPuddle, vUvPlane).r;
  if (mask < 0.01) discard;
  vec3 tinted = refl.rgb * vec3(0.82, 0.9, 1.05) + vec3(0.015, 0.02, 0.035);
  gl_FragColor = vec4(color * tinted, mask * uStrength);
}
`;

// Ground-plane UV → world for PlaneGeometry rotated -PI/2 about X:
// u → x = u*58 - 29;  v → z = 29 - v*58.
export function uvToWorld(u, v, size = 58) {
  return { x: u * size - size / 2, z: size / 2 - v * size };
}

export function buildBase(ctx) {
  const g = ctx.group;

  // Square concrete slab — the collectible base. Top face at y = 0.
  const sideTex = concreteTexture('#8a8f96', 'base');
  sideTex.repeat.set(4, 1);
  const slab = box(60, 2.6, 60, toonMap(sideTex, {}), 0, -1.3, 0);
  slab.castShadow = false;
  g.add(slab);

  // Thin lip around the top edge reads as a model base frame.
  const lipMat = toon(COLORS.concreteLight);
  g.add(box(60.0, 0.2, 0.6, lipMat, 0, 0.08, -29.7));
  g.add(box(60.0, 0.2, 0.6, lipMat, 0, 0.08, 29.7));
  g.add(box(0.6, 0.2, 59.0, lipMat, -29.7, 0.08, 0));
  g.add(box(0.6, 0.2, 59.0, lipMat, 29.7, 0.08, 0));

  // Asphalt wearing layer (58×58, concrete frame remains visible).
  const ground = plane(58, 58, toonMap(asphaltTexture(), {}), 0, 0.02, 0, -Math.PI / 2);
  ground.receiveShadow = true;
  g.add(ground);

  // Real-time puddle reflections — masked Reflector over the ground.
  // Its onBeforeRender is neutralised; the RT is updated manually once per
  // frame from the animation loop (see main.js) so the mesh itself is drawn
  // through the normal render path.
  const puddleShader = {
    name: 'PuddleReflector',
    uniforms: {
      color: { value: null },
      tDiffuse: { value: null },
      textureMatrix: { value: new THREE.Matrix4() },
      tPuddle: { value: null },
      uStrength: { value: 0.85 },
    },
    vertexShader: PUDDLE_VERT,
    fragmentShader: PUDDLE_FRAG,
  };
  const reflector = new Reflector(new THREE.PlaneGeometry(58, 58), {
    clipBias: 0.004,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xb8c4d4,
    shader: puddleShader,
    multisample: 0,
  });
  reflector.rotation.x = -Math.PI / 2;
  reflector.position.y = 0.045;
  reflector.material.transparent = true;
  reflector.material.depthWrite = false;
  reflector.material.uniforms.tPuddle.value = puddleMaskTexture();
  reflector.receiveShadow = false;
  g.add(reflector);

  // Detach the mid-render hook: keep the original updater for manual calls.
  const updateReflection = reflector.onBeforeRender;
  reflector.onBeforeRender = function () { /* handled in animate() */ };

  return { ground, reflector, updateReflection };
}
