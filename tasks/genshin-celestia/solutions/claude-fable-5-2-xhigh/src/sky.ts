import * as THREE from "three";
import { CAMERA_AZIMUTH, GLSL_ATMOS, LAND_Y, SUN_DIR } from "./atmos";
import { GLSL_NOISE, rng } from "./util";

export type Tick = (time: number) => void;

const WORLD_VERT = /* glsl */ `
varying vec3 vToFrag;
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vToFrag = w.xyz - cameraPosition;
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

function skyDome(): { mesh: THREE.Mesh; tick: Tick } {
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: WORLD_VERT,
    fragmentShader: /* glsl */ `
uniform float uTime;
varying vec3 vToFrag;
${GLSL_NOISE}
${GLSL_ATMOS}
void main() {
  vec3 d = normalize(vToFrag);
  float up = d.y;
  vec3 col = mix(hazeColor(d), SKY_MID, smoothstep(-0.01, 0.09, up));
  col = mix(col, SKY_ZENITH, smoothstep(0.05, 0.5, up));
  float sd = max(dot(d, SUN_DIR), 0.0);
  col += vec3(1.0, 0.84, 0.58) * (pow(sd, 10.0) * 0.32 + pow(sd, 120.0) * 0.9);
  col += vec3(1.0, 0.95, 0.82) * smoothstep(0.99950, 0.99985, sd) * 16.0;
  // High cirrus streaks, stretched along the wind.
  vec2 cp = d.xz / (abs(up) + 0.22);
  float cirrus = fbm(cp * vec2(1.3, 4.2) + vec2(uTime * 0.004, 0.0));
  cirrus = smoothstep(0.52, 0.8, cirrus) * smoothstep(0.03, 0.3, up) * (1.0 - smoothstep(0.55, 0.95, up));
  col = mix(col, vec3(1.0, 0.98, 0.94), cirrus * 0.55);
  gl_FragColor = vec4(col, 1.0);
}`,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(190000, 48, 24), material);
  mesh.renderOrder = -10;
  mesh.frustumCulled = false;
  return { mesh, tick: (t) => (material.uniforms.uTime.value = t) };
}

/** The Teyvat continent far below: coastlines, plains and snow peaks dissolved in haze. */
function teyvat(): THREE.Mesh {
  const material = new THREE.ShaderMaterial({
    vertexShader: WORLD_VERT,
    fragmentShader: /* glsl */ `
varying vec3 vToFrag;
varying vec3 vWorld;
${GLSL_NOISE}
${GLSL_ATMOS}
void main() {
  vec2 p = vWorld.xz * 0.000021 + vec2(4.2, 1.7);
  float h = fbm(p) * 0.72 + fbm(p * 3.1 + 9.0) * 0.28;
  float land = smoothstep(0.485, 0.505, h);
  vec3 sea = mix(vec3(0.02, 0.15, 0.42), vec3(0.10, 0.52, 0.64), smoothstep(0.37, 0.49, h));
  // Forest and meadow, sand country, then grey ranges capped with snow.
  vec3 ground = mix(vec3(0.17, 0.48, 0.20), vec3(0.44, 0.72, 0.27), smoothstep(0.35, 0.6, fbm(p * 5.0 + 3.0)));
  ground = mix(ground, vec3(0.88, 0.74, 0.44), smoothstep(0.56, 0.7, fbm(p * 2.3 + 20.0)));
  ground = mix(ground, vec3(0.46, 0.43, 0.43), smoothstep(0.575, 0.61, h));
  ground = mix(ground, vec3(0.95, 0.97, 1.0), smoothstep(0.615, 0.65, h));
  // Rivers follow a contour of a second noise field.
  ground = mix(vec3(0.12, 0.52, 0.66), ground, smoothstep(0.004, 0.013, abs(fbm(p * 4.0 + 40.0) - 0.5)));
  vec3 col = mix(sea, ground, land);
  col += vec3(0.95, 0.9, 0.7) * smoothstep(0.47, 0.487, h) * (1.0 - land) * 0.3;
  // Thinner haze than the generic falloff, so coastlines stay legible through cloud gaps.
  gl_FragColor = vec4(mix(col, atmosphere(col, vToFrag, cameraPosition.y), 0.52), 1.0);
}`,
  });
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(185000, 48).rotateX(-Math.PI / 2), material);
  mesh.position.y = LAND_Y;
  mesh.renderOrder = -9;
  return mesh;
}

/** Soft volumetric sunbeams: open cylinders along the sun direction with view-angle falloff. */
function lightShafts(): { group: THREE.Group; tick: Tick } {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
varying vec3 vNormalW;
varying vec3 vToFrag;
varying vec2 vUv;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vToFrag = w.xyz - cameraPosition;
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,
    fragmentShader: /* glsl */ `
uniform float uTime;
varying vec3 vNormalW;
varying vec3 vToFrag;
varying vec2 vUv;
${GLSL_NOISE}
void main() {
  float facing = abs(dot(normalize(vNormalW), normalize(vToFrag)));
  float a = pow(facing, 2.6);
  a *= smoothstep(0.0, 0.3, vUv.y) * (1.0 - smoothstep(0.55, 1.0, vUv.y));
  a *= 0.55 + 0.45 * vnoise(vec2(vUv.x * 14.0, uTime * 0.05 + vUv.y));
  gl_FragColor = vec4(vec3(1.0, 0.8, 0.46) * a * 0.08, 1.0);
}`,
  });
  const group = new THREE.Group();
  const rand = rng(77);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), SUN_DIR);
  for (let i = 0; i < 8; i++) {
    const length = 6500 + rand() * 2500;
    const width = 70 + rand() * 190;
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(width * 0.8, width * 1.25, length, 20, 1, true), material);
    // Beams pass through points on the far side of the islands from the default camera, framing the spire rather than washing over it.
    const a = CAMERA_AZIMUTH + Math.PI + (rand() - 0.5) * 3.6, r = 2100 + rand() * 3000;
    const through = new THREE.Vector3(Math.cos(a) * r, -600 + rand() * 900, Math.sin(a) * r);
    mesh.position.copy(through).addScaledVector(SUN_DIR, length * 0.12);
    mesh.quaternion.copy(q);
    mesh.renderOrder = 20;
    group.add(mesh);
  }
  return { group, tick: (t) => (material.uniforms.uTime.value = t) };
}

export function buildSky(scene: THREE.Scene): Tick {
  const sky = skyDome();
  const shafts = lightShafts();
  scene.add(sky.mesh, teyvat(), shafts.group);

  const sun = new THREE.DirectionalLight(0xffe9c0, 2.7);
  sun.position.copy(SUN_DIR).multiplyScalar(6000);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  const cam = sun.shadow.camera;
  cam.left = cam.bottom = -2500;
  cam.right = cam.top = 2500;
  cam.near = 1000;
  cam.far = 11000;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 2.5;
  // Sky above, sunlit cloud sea below: shadows stay luminous and blue.
  const ambient = new THREE.HemisphereLight(0xc6daff, 0xb6c2ec, 1.8);
  scene.add(sun, sun.target, ambient);

  return (t) => {
    sky.tick(t);
    shafts.tick(t);
  };
}
