precision highp float;

varying vec2 vUv;
out highp vec4 fragColor;

uniform sampler2D tScene;
uniform sampler2D tBloom0;
uniform sampler2D tBloom1;
uniform sampler2D tBloom2;
uniform sampler2D tBloom3;
uniform sampler2D tBloom4;
uniform int uBloomLevels;
uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform float uTime;
uniform vec2 uResolution;
uniform int uDebug;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// ACES RRT + ODT fitted by Stephen Hill (ACESFilmicToneMapping reference).
vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFitted(vec3 color) {
  const mat3 inputMatrix = mat3(
    0.59719, 0.07600, 0.02840,
    0.35458, 0.90834, 0.13383,
    0.04823, 0.01566, 0.83777
  );
  const mat3 outputMatrix = mat3(
    1.60475, -0.10208, -0.00327,
    -0.53108, 1.10813, -0.07276,
    -0.07367, -0.00605, 1.07602
  );
  color = inputMatrix * color;
  color = rrtAndOdtFit(color);
  color = outputMatrix * color;
  return clamp(color, 0.0, 1.0);
}

vec3 linearToSRGB(vec3 color) {
  color = max(color, vec3(0.0));
  return mix(
    12.92 * color,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(vec3(0.0031308), color)
  );
}

vec3 sampleBloom(vec2 uv) {
  vec3 bloom = texture(tBloom0, uv).rgb;
  if (uBloomLevels > 1) bloom += texture(tBloom1, uv).rgb * 0.8;
  if (uBloomLevels > 2) bloom += texture(tBloom2, uv).rgb * 0.62;
  if (uBloomLevels > 3) bloom += texture(tBloom3, uv).rgb * 0.45;
  if (uBloomLevels > 4) bloom += texture(tBloom4, uv).rgb * 0.3;
  return bloom;
}

void main() {
  if (uDebug > 0) {
    vec3 debugColor = texture(tScene, vUv).rgb;
    fragColor = vec4(linearToSRGB(debugColor), 1.0);
    return;
  }

  vec2 centered = vUv - 0.5;
  float radius = length(centered);
  float aberration = uChromatic * 0.0022 * (0.28 + radius * 1.45);
  vec3 scene;
  scene.r = texture(tScene, vUv + centered * aberration).r;
  scene.g = texture(tScene, vUv).g;
  scene.b = texture(tScene, vUv - centered * aberration).b;

  vec3 bloom = sampleBloom(vUv);
  vec3 hdr = scene + bloom * uBloomStrength;
  hdr *= uExposure;
  hdr = acesFitted(hdr);
  hdr = linearToSRGB(hdr);

  float vignette = 1.0 - uVignette * smoothstep(0.22, 0.95, radius * 1.35);
  hdr *= vignette;

  float grain = hash12(vUv * uResolution + vec2(uTime * 37.0)) - 0.5;
  float luma = dot(hdr, vec3(0.3333));
  hdr += grain * uGrain * (0.3 + 0.7 * (1.0 - luma));
  hdr += (hash12(vUv * uResolution + 17.0) - 0.5) / 255.0;

  fragColor = vec4(clamp(hdr, 0.0, 1.0), 1.0);
}
