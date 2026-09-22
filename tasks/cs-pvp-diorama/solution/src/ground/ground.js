// 湿地地面：湿沥青 + 积水遮罩 + 平面反射 + 雨滴涟漪 + 湿面高光，全部在一个 shader 内完成。
import * as THREE from 'three';
import * as tex from '../gfx/textures.js';
import { LAYER } from '../core/stage.js';

const RIPPLE_GLSL = /* glsl */ `
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // 雨滴落点涟漪：网格单元内随机相位扩散圆环，叠加成法线扰动。
  vec2 rainRipples(vec2 p, float t, float scale) {
    vec2 acc = vec2(0.0);
    vec2 cell = floor(p);
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 id = cell + vec2(float(x), float(y));
        float h = hash21(id);
        float phase = fract(t * (0.75 + h * 0.9) + h * 7.31);
        vec2 center = id + vec2(hash21(id + 1.3), hash21(id + 4.7));
        vec2 d = p - center;
        float r = length(d);
        float ring = sin((r - phase * 0.85) * scale) * exp(-r * 5.5) * (1.0 - phase);
        acc += normalize(d + 1e-4) * ring;
      }
    }
    return acc;
  }
`;

const GROUND_VERTEX = /* glsl */ `
  varying vec3 vWorldPos;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;
    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const GROUND_FRAGMENT = /* glsl */ `
  uniform sampler2D uAlbedo;
  uniform sampler2D uNormalMap;
  uniform sampler2D uPuddleMask;
  uniform sampler2D uReflectionMap;
  uniform mat4 uReflectionMatrix;
  uniform vec2 uAlbedoScale;
  uniform vec2 uPuddleScale;
  uniform float uTime;
  uniform float uReflectionStrength;
  uniform float uRippleScale;
  uniform float uRippleStrength;
  uniform float uWetDarken;
  uniform vec3 uTint;
  uniform vec3 uLightDir;
  uniform vec3 uLightColor;
  uniform vec3 uAmbient;
  uniform float uAlbedoBoost;
  uniform vec3 uFogColor;
  uniform float uFogDensity;

  varying vec3 vWorldPos;

  ${RIPPLE_GLSL}

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec2 albedoUv = vWorldPos.xz * uAlbedoScale;
    vec3 base = texture2D(uAlbedo, albedoUv).rgb * uTint * uAlbedoBoost;

    vec3 nTex = texture2D(uNormalMap, albedoUv * 2.0).xyz * 2.0 - 1.0;
    vec3 normal = normalize(vec3(nTex.x * 0.6, 1.0, nTex.y * 0.6));

    float wetMask = texture2D(uPuddleMask, vWorldPos.xz * uPuddleScale).r;
    float damp = smoothstep(0.22, 0.58, wetMask);
    float puddle = smoothstep(0.6, 0.9, wetMask);

    vec2 ripple = rainRipples(vWorldPos.xz * uRippleScale, uTime, 42.0) * (0.35 + puddle * 0.65) * uRippleStrength;
    normal = normalize(vec3(normal.x + ripple.x, normal.y, normal.z + ripple.y));

    base *= mix(1.0, uWetDarken, damp * 0.8 + puddle * 0.2);

    // 与场景一致的三渲二色阶漫反射 + 冷蓝环境项，避免地面自成一档亮度
    float ndl = max(dot(normal, uLightDir), 0.0);
    float band = ndl > 0.72 ? 1.0 : (ndl > 0.42 ? 0.74 : (ndl > 0.16 ? 0.54 : 0.4));
    vec3 lit = base * (uAmbient + uLightColor * band);

    vec4 projected = uReflectionMatrix * vec4(vWorldPos, 1.0);
    vec2 reflectionUv = projected.xy / max(projected.w, 1e-4) + ripple * 0.035;
    vec3 reflection = texture2D(uReflectionMap, clamp(reflectionUv, 0.001, 0.999)).rgb;

    float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 3.0);
    float reflectivity = clamp(damp * 0.28 + puddle * 0.72, 0.0, 1.0) * mix(0.58, 1.0, fresnel) * uReflectionStrength;
    vec3 color = mix(lit, reflection, reflectivity);

    vec3 halfDir = normalize(uLightDir + viewDir);
    float specular = pow(max(dot(normal, halfDir), 0.0), 48.0) * (damp * 0.5 + puddle * 1.1);
    color += specular * uLightColor * 0.6;

    float depth = length(cameraPosition - vWorldPos);
    float fogFactor = 1.0 - exp(-(uFogDensity * depth) * (uFogDensity * depth));
    color = mix(color, uFogColor, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(color, 1.0);
  }
`;

function baseUniforms({ reflection, timeUniform, scene }) {
  return {
    uTime: timeUniform,
    uReflectionMap: reflection.uniforms.uReflectionMap,
    uReflectionMatrix: reflection.uniforms.uReflectionMatrix,
    uReflectionStrength: { value: 1 },
    uFogColor: { value: new THREE.Color().copy(scene.fog.color) },
    uFogDensity: { value: scene.fog.density },
  };
}

export function createGround({ reflection, timeUniform, scene, keyLight, size = 64 }) {
  const asphalt = tex.asphalt();
  const puddle = tex.puddleMask();

  const uniforms = {
    ...baseUniforms({ reflection, timeUniform, scene }),
    uAlbedo: { value: asphalt.map },
    uNormalMap: { value: asphalt.normalMap },
    uPuddleMask: { value: puddle.map },
    uAlbedoScale: { value: new THREE.Vector2(1 / 5.5, 1 / 5.5) },
    uPuddleScale: { value: new THREE.Vector2(1 / 21, 1 / 21) },
    uRippleScale: { value: 1.6 },
    uRippleStrength: { value: 0.55 },
    uWetDarken: { value: 0.78 },
    uAlbedoBoost: { value: 2.1 },
    uTint: { value: new THREE.Color(0xdfe4e9) },
    uLightDir: { value: new THREE.Vector3(0.4, 0.8, 0.3).normalize() },
    uLightColor: { value: new THREE.Color(0x9fc4ff) },
    uAmbient: { value: new THREE.Color(0x4f7295).multiplyScalar(0.5) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: GROUND_VERTEX,
    fragmentShader: GROUND_FRAGMENT,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size, 1, 1), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0;
  mesh.name = 'ground:wet-asphalt';
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.layers.set(LAYER.GROUND);

  if (keyLight) {
    uniforms.uLightDir.value.copy(keyLight.position).normalize();
    uniforms.uLightColor.value.setHex(keyLight.color.getHex()).multiplyScalar(keyLight.intensity);
  }

  return { mesh, material, uniforms };
}

// 排水沟/下水道里的静止水面：只做反射 + 涟漪 + 深色水体。
export function createWaterSurface({ reflection, timeUniform, scene, width, depth, time = 0 }) {
  const uniforms = {
    ...baseUniforms({ reflection, timeUniform, scene }),
    uRippleScale: { value: 2.4 },
    uRippleStrength: { value: 0.7 },
    uDeep: { value: new THREE.Color(0x0d1a20) },
    uTimeOffset: { value: time },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vWorldPos;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uReflectionMap;
      uniform mat4 uReflectionMatrix;
      uniform float uTime;
      uniform float uTimeOffset;
      uniform float uReflectionStrength;
      uniform float uRippleScale;
      uniform float uRippleStrength;
      uniform vec3 uDeep;
      uniform vec3 uFogColor;
      uniform float uFogDensity;

      varying vec3 vWorldPos;

      ${RIPPLE_GLSL}

      void main() {
        float t = uTime + uTimeOffset;
        vec2 ripple = rainRipples(vWorldPos.xz * uRippleScale, t, 38.0) * uRippleStrength;

        vec4 projected = uReflectionMatrix * vec4(vWorldPos, 1.0);
        vec2 reflectionUv = projected.xy / max(projected.w, 1e-4) + ripple * 0.05;
        vec3 reflection = texture2D(uReflectionMap, clamp(reflectionUv, 0.001, 0.999)).rgb;

        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float fresnel = pow(1.0 - clamp(viewDir.y, 0.0, 1.0), 2.2);
        vec3 color = mix(uDeep, reflection, clamp(mix(0.5, 1.0, fresnel) * uReflectionStrength, 0.0, 1.0));

        float depth = length(cameraPosition - vWorldPos);
        float fogFactor = 1.0 - exp(-(uFogDensity * depth) * (uFogDensity * depth));
        color = mix(color, uFogColor, clamp(fogFactor, 0.0, 1.0));

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });

  const geometry = new THREE.PlaneGeometry(width, depth, 1, 1);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.name = 'water:surface';
  mesh.receiveShadow = false;
  mesh.castShadow = false;
  mesh.layers.set(LAYER.GROUND);
  return { mesh, material, uniforms };
}
