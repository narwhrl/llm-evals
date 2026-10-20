import * as THREE from "three";
import { TextureSet } from "./textures";

/**
 * The Earth.
 *
 * One sphere with two equirectangular maps and a cloud layer. The day map
 * and the night map describe the same continents, so the terminator slides
 * across them together and the city lights come up exactly where the sun
 * goes down.
 *
 * The surface is lit by the same sun that lights the cabin, which is why the
 * window shows the night side of the planet when the module is in shadow.
 */

const EARTH_VERT = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const EARTH_FRAG = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform sampler2D uDay;
uniform sampler2D uNight;
uniform sampler2D uClouds;
uniform vec3 uSunDirection;
uniform vec3 uViewDirection;
uniform float uCloudOffset;
uniform float uAtmosphere;

void main() {
  vec3 normal = normalize(vNormal);
  float light = dot(normal, uSunDirection);

  /* The terminator is softened: a hard edge would look like a cut. */
  float day = smoothstep(-0.16, 0.18, light);

  vec3 dayColour = texture2D(uDay, vUv).rgb;
  vec3 nightColour = texture2D(uNight, vUv).rgb;
  vec3 surface = mix(nightColour, dayColour, day);

  /* The night side is not black: the cities are, and a little airglow. */
  surface += vec3(0.02, 0.035, 0.06) * (1.0 - day) * 0.35;

  /* Clouds, on their own slightly faster rotation. */
  vec4 cloud = texture2D(uClouds, vec2(vUv.x + uCloudOffset, vUv.y));
  vec3 cloudColour = vec3(0.95, 0.97, 1.0) * (0.05 + 0.95 * day);
  surface = mix(surface, cloudColour, cloud.a * 0.92);

  /* The limb of the planet: a blue atmosphere that catches the sun. */
  float facing = max(dot(normal, normalize(uViewDirection)), 0.0);
  float rim = pow(1.0 - facing, 3.2);
  float scatter = smoothstep(-0.45, 0.45, light);
  vec3 atmosphere = vec3(0.24, 0.52, 1.0) * rim * (0.25 + 1.5 * scatter) * uAtmosphere;
  /* A warm band right on the terminator. */
  float terminator = exp(-pow(light * 7.0, 2.0));
  atmosphere += vec3(1.0, 0.42, 0.16) * terminator * rim * 0.55 * uAtmosphere;

  gl_FragColor = vec4(surface + atmosphere, 1.0);
}
`;

export interface Earth {
  group: THREE.Group;
  material: THREE.ShaderMaterial;
  /** The centre of the planet, in world space. */
  centre: THREE.Vector3;
  radius: number;
}

export function buildEarth(textures: TextureSet, radius: number): Earth {
  const material = new THREE.ShaderMaterial({
    vertexShader: EARTH_VERT,
    fragmentShader: EARTH_FRAG,
    uniforms: {
      uDay: { value: textures.earthDay },
      uNight: { value: textures.earthNight },
      uClouds: { value: textures.earthClouds },
      uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
      uViewDirection: { value: new THREE.Vector3(0, 0, 1) },
      uCloudOffset: { value: 0 },
      uAtmosphere: { value: 1 },
    },
  });

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 48), material);
  mesh.rotation.z = THREE.MathUtils.degToRad(-23.4);

  const group = new THREE.Group();
  group.add(mesh);

  return { group, material, centre: new THREE.Vector3(), radius };
}
