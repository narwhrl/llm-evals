import * as THREE from 'three';
import { atmosphere } from '../core/atmosphere';

/** Radiance of the sun disc. High enough to bloom; dialled down while the reflection map is baked. */
const SUN_DISC = 26;

const VERTEX = /* glsl */ `
varying vec3 vDirection;
void main() {
	vDirection = position;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uSunDir;
uniform vec3 uZenith;
uniform vec3 uMiddle;
uniform vec3 uHorizon;
uniform vec3 uGround;uniform vec3 uSunColor;
uniform float uSunDisc;
varying vec3 vDirection;

void main() {
	vec3 dir = normalize(vDirection);
	float sunDot = max(dot(dir, uSunDir), 0.0);

	// Clear sky: saturated zenith over a wide, pale band at the horizon.
	float up = pow(clamp(dir.y, 0.0, 1.0), 0.42);
	vec3 sky = mix(uHorizon, uMiddle, smoothstep(0.0, 0.3, up));
	sky = mix(sky, uZenith, smoothstep(0.22, 1.0, up));
	// Below the horizon the dome stands in for the cloud sea the islands float above: bright, and
	// slightly blue in the gaps.
	sky = mix(uGround, sky, smoothstep(-0.02, 0.02, dir.y));

	// Forward scattering: a broad warm wash around the sun, a tighter aureole, then the disc itself.
	sky += uSunColor * (pow(sunDot, 2.5) * 0.12 + pow(sunDot, 5.0) * 0.3 + pow(sunDot, 48.0) * 0.6);
	sky += uSunColor * smoothstep(0.99955, 0.99985, sunDot) * uSunDisc;
	gl_FragColor = vec4(sky, 1.0);
}
`;

export interface Sky {
  readonly mesh: THREE.Mesh;
  readonly material: THREE.ShaderMaterial;
}

export function createSky(): Sky {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: atmosphere.uSunDir,
      uZenith: { value: new THREE.Color(0x1d5cc9) },
      uMiddle: { value: new THREE.Color(0x5a9fe6) },
      uHorizon: { value: new THREE.Color(0xdcebf4) },
      uGround: { value: new THREE.Color(0xc4d2e2) },
      uSunColor: { value: new THREE.Color(0xffe0b0) },
      uSunDisc: { value: SUN_DISC },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), material);
  mesh.scale.setScalar(24000);
  mesh.renderOrder = -1000;
  mesh.frustumCulled = false;
  return { mesh, material };
}

/** Renders the sky into a filtered environment map so stone and gold pick up its light. */
export function bakeSkyEnvironment(renderer: THREE.WebGLRenderer, sky: Sky): THREE.Texture {
  const probe = new THREE.Mesh(sky.mesh.geometry, sky.material);
  probe.scale.setScalar(60);
  const scene = new THREE.Scene();
  scene.add(probe);

  const disc = sky.material.uniforms.uSunDisc;
  disc.value = 4;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene, 0, 0.1, 100);
  disc.value = SUN_DISC;
  pmrem.dispose();
  return target.texture;
}
