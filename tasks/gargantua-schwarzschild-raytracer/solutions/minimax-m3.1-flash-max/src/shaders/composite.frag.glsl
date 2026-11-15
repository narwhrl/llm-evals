// Final composite: chromatic aberration -> bloom -> exposure -> ACES -> vignette
// -> film grain -> sRGB transfer.
precision highp float;

uniform sampler2D uHdr;
uniform sampler2D uBloom0;
uniform sampler2D uBloom1;
uniform sampler2D uBloom2;
uniform float uBloomStrength;
uniform vec3 uBloomWeights;   // per-pyramid-level contribution weights
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform float uTime;
uniform vec2 uResolution;
uniform int uDebug;

in vec2 vUv;
out vec4 fragColor;

// ACES RRT+ODT fit (Stephen Hill), identical to the matrix pair used by the
// Three.js ACESFilmicToneMapping operator.
const mat3 ACESInputMat = mat3(
  vec3(0.59719, 0.07600, 0.02840),
  vec3(0.35458, 0.90834, 0.13383),
  vec3(0.04823, 0.01566, 0.83777)
);
const mat3 ACESOutputMat = mat3(
  vec3( 1.60475, -0.10208, -0.00327),
  vec3(-0.53108,  1.10813, -0.07276),
  vec3(-0.07367, -0.00605,  1.07602)
);

vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFilmic(vec3 color) {
  color = ACESInputMat * color;
  color = rrtAndOdtFit(color);
  color = ACESOutputMat * color;
  return clamp(color, 0.0, 1.0);
}

vec3 linearToSRGB(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 uv = vUv;

  if (uDebug != 0) {
    // Diagnostic views are authored in display space by the ray tracer.
    fragColor = vec4(texture(uHdr, uv).rgb, 1.0);
    return;
  }

  vec2 centred = uv - 0.5;
  float r2 = dot(centred, centred);

  // --- chromatic aberration (radial, only in the outer part of the frame) ---
  vec3 hdr;
  if (uChromatic > 0.0001) {
    vec2 offset = centred * (uChromatic * r2);
    hdr.r = texture(uHdr, uv + offset).r;
    hdr.g = texture(uHdr, uv).g;
    hdr.b = texture(uHdr, uv - offset).b;
  } else {
    hdr = texture(uHdr, uv).rgb;
  }

  // --- bloom ---------------------------------------------------------------
  vec3 bloom = texture(uBloom0, uv).rgb * uBloomWeights.x
             + texture(uBloom1, uv).rgb * uBloomWeights.y
             + texture(uBloom2, uv).rgb * uBloomWeights.z;
  hdr += bloom * uBloomStrength;

  // --- exposure + tone mapping --------------------------------------------
  hdr *= uExposure;
  vec3 col = acesFilmic(hdr);

  // --- vignette ------------------------------------------------------------
  float vig = 1.0 - uVignette * smoothstep(0.22, 1.02, length(centred) * 1.42);
  col *= vig;

  // --- film grain ----------------------------------------------------------
  if (uGrain > 0.0001) {
    float g = hash12(uv * uResolution + vec2(uTime * 61.7, uTime * 43.1)) - 0.5;
    // grain is stronger in the shadows, like real film
    float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col += g * uGrain * 0.075 * (1.0 - 0.7 * lum);
  }

  fragColor = vec4(linearToSRGB(max(col, vec3(0.0))), 1.0);
}
