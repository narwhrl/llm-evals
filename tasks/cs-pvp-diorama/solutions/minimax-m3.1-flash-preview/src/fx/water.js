import * as THREE from 'three';

/**
 * Standing water.
 *
 * A single transparent plane over the whole yard. The puddle footprint comes
 * from fbm noise, so the pools have irregular organic edges instead of the
 * tell-tale circle of a decal, and a cell-based ripple field drives both the
 * normal distortion of the planar reflection and the crest highlights. The
 * same shader carries the vertical smear of the scene's practical lights, so
 * lamps streak across the wet ground the way they do in real rain.
 */

const VERTEX = /* glsl */ `
  #include <common>
  #include <fog_pars_vertex>
  uniform mat4 uTextureMatrix;

  varying vec3 vWorldPosition;
  varying vec4 vReflectUv;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vec4 mvPosition = viewMatrix * worldPosition;
    vReflectUv = uTextureMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const FRAGMENT = /* glsl */ `
  #include <common>
  #include <fog_pars_fragment>

  uniform sampler2D tReflect;
  uniform float uTime;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform float uStrength;
  uniform float uDistort;
  uniform float uCoverage;
  uniform vec3 uSkyTint;
  uniform vec3 uLightPos[4];
  uniform vec3 uLightColor[4];
  uniform float uLightPower[4];

  varying vec3 vWorldPosition;
  varying vec4 vReflectUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec2 hash22(vec2 p) {
    return vec2(hash21(p), hash21(p + 19.19));
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      total += amplitude * valueNoise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }
    return total;
  }

  // Expanding rings from individual raindrop impacts. Returns the gradient of
  // the ripple height field, which is all the reflection needs.
  vec2 rippleGradient(vec2 p, float time) {
    vec2 gradient = vec2(0.0);
    for (int layer = 0; layer < 2; layer++) {
      float layerIndex = float(layer);
      float scale = 2.3 + layerIndex * 4.1;
      vec2 q = p * scale;
      vec2 id = floor(q);
      vec2 f = fract(q) - 0.5;
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec2 offset = vec2(float(x), float(y));
          vec2 rnd = hash22(id + offset + layerIndex * 31.7);
          float cycle = fract(time * (0.35 + rnd.x * 0.3) + rnd.y);
          float radius = cycle * 0.66;
          vec2 center = offset + rnd * 0.7 - 0.35;
          vec2 delta = f - center;
          float dist = length(delta);
          float ring = exp(-abs(dist - radius) * 30.0) * (1.0 - cycle);
          gradient += normalize(delta + vec2(1e-5)) * ring;
        }
      }
    }
    return gradient;
  }

  void main() {
    // Puddle footprint. uCoverage forces the surface fully wet, which is what
    // the permanently flooded drainage channel needs.
    float field = fbm(vWorldPosition.xz * 0.17) * 0.72
                + fbm(vWorldPosition.xz * 0.62 + 11.3) * 0.28;
    float mask = max(smoothstep(0.44, 0.55, field), uCoverage);
    if (mask <= 0.002) discard;

    vec2 gradient = rippleGradient(vWorldPosition.xz, uTime);

    // Distort the projective reflection UV by the ripple slope.
    vec4 projected = vReflectUv;
    projected.xy += gradient * uDistort * projected.w;
    // The night sky is nearly black, so a raw mirror sample turns every pool
    // into a hole in the floor. The sky tint is the overcast glow a wet
    // surface actually picks up, and it is what makes puddles read as water.
    vec3 reflected = texture2DProj(tReflect, projected).rgb + uSkyTint;

    // Grazing angles mirror more, looking straight down barely does.
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - clamp(viewDirection.y, 0.0, 1.0), 3.0);
    float mirror = clamp(0.22 + fresnel * 0.95, 0.0, 1.0) * uStrength;

    // Practicals smear into the water as vertical streaks.
    vec3 sheen = vec3(0.0);
    for (int i = 0; i < 4; i++) {
      vec3 toLight = uLightPos[i] - vWorldPosition;
      float dist = length(toLight);
      vec3 lightDir = toLight / max(dist, 0.001);
      vec2 flat_ = normalize(lightDir.xz + vec2(1e-5));
      vec2 rel = vWorldPosition.xz - uLightPos[i].xz;
      float along = dot(rel, flat_);
      float across = dot(rel, vec2(-flat_.y, flat_.x));
      float falloff = uLightPower[i] / (1.0 + dist * dist * 0.055);
      float streak = exp(-abs(across) * 1.7) * exp(-abs(along) * 0.16);
      sheen += uLightColor[i] * streak * falloff;
    }

    vec3 body = mix(uDeepColor, uShallowColor, mask * 0.5);
    vec3 color = mix(body, reflected * 0.8 + sheen, mirror);
    color += abs(gradient.x + gradient.y) * 0.07;

    gl_FragColor = vec4(color, mask * uStrength);
    #include <fog_fragment>
  }
`;

const LIGHT_COUNT = 4;

export function createWaterMaterial({ textureMatrix, reflectTexture, lights = [] }) {
  const positions = [];
  const colors = [];
  const powers = [];
  for (let i = 0; i < LIGHT_COUNT; i += 1) {
    const light = lights[i];
    positions.push(light ? light.position.clone() : new THREE.Vector3(0, -999, 0));
    colors.push(light ? new THREE.Color(light.color) : new THREE.Color(0, 0, 0));
    powers.push(light ? light.power : 0);
  }

  const material = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        tReflect: { value: null },
        uTextureMatrix: { value: new THREE.Matrix4() },
        uTime: { value: 0 },
        uDeepColor: { value: new THREE.Color(0x28323f) },
        uShallowColor: { value: new THREE.Color(0x4a6076) },
        uSkyTint: { value: new THREE.Color(0x2b3a4d) },
        uStrength: { value: 1.0 },
        uDistort: { value: 0.032 },
        uCoverage: { value: 0.0 },
        uLightPos: { value: positions },
        uLightColor: { value: colors },
        uLightPower: { value: powers },
      },
    ]),
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    fog: true,
  });

  material.uniforms.tReflect.value = reflectTexture;
  material.uniforms.uTextureMatrix.value = textureMatrix;
  return material;
}

export function updateWaterMaterial(material, time) {
  material.uniforms.uTime.value = time;
}
