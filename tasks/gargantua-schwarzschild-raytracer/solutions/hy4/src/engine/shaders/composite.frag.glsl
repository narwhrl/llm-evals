// Final HDR composite: multi-level bloom -> exposure -> ACES filmic ->
// sRGB encode -> restrained vignette / grain / radial chromatic aberration.
precision highp float;
varying vec2 vUv;

uniform sampler2D tScene;
uniform sampler2D tBloom0;
uniform sampler2D tBloom1;
uniform sampler2D tBloom2;
uniform float uBloomIntensity;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChroma;
uniform float uTime;
uniform int uBloomLevels;
uniform int uDebug;

// ACES filmic tone-mapping fit (Narkowicz 2015), an explicit ACES-style curve.
vec3 aces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 linearToSRGB(vec3 c) {
  return mix(1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, c * 12.92,
             step(c, vec3(0.0031308)));
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 bloomAt(vec2 uv) {
  vec3 b = vec3(0.0);
  if (uBloomLevels > 0) b += texture2D(tBloom0, uv).rgb;
  if (uBloomLevels > 1) b += texture2D(tBloom1, uv).rgb * 0.70;
  if (uBloomLevels > 2) b += texture2D(tBloom2, uv).rgb * 0.45;
  return b;
}

vec3 sceneAt(vec2 uv) {
  return texture2D(tScene, uv).rgb + bloomAt(uv) * uBloomIntensity;
}

void main() {
  if (uDebug > 0) {
    // Diagnostic channels are already display-range; bypass the HDR grade so
    // the numbers/colours stay legible instead of being tone-mapped away.
    gl_FragColor = vec4(clamp(texture2D(tScene, vUv).rgb, 0.0, 1.0), 1.0);
    return;
  }

  vec2 uv = vUv;
  vec2 d = uv - 0.5;
  float amt = uChroma * 0.006 * dot(d, d);
  vec3 hdr = vec3(
    sceneAt(uv + d * amt).r,
    sceneAt(uv).g,
    sceneAt(uv - d * amt).b
  );

  vec3 mapped = linearToSRGB(aces(hdr * uExposure));
  float r2 = dot(d, d);
  float vig = 1.0 - uVignette * pow(r2 * 2.0, 1.15);
  mapped *= clamp(vig, 0.0, 1.0);

  float grain = hash12(gl_FragCoord.xy + vec2(uTime * 37.0, uTime * 19.0)) - 0.5;
  mapped += vec3(uGrain * 0.055 * grain);

  gl_FragColor = vec4(clamp(mapped, 0.0, 1.0), 1.0);
}
