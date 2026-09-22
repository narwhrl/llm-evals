// ===========================================================================
// Final presentation pass
// ===========================================================================
// The pipeline renders HDR radiance into a half-float target, adds bloom, and
// hands the result here. This pass applies restrained chromatic aberration,
// exposure, ACES tone mapping, vignetting, film grain and the linear->sRGB
// encode. In debug mode (uDebug != 0) it bypasses every "camera" effect so the
// diagnostic colours reach the screen unmodified.

uniform sampler2D tDiffuse;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform float uTime;
uniform int   uDebug;

varying vec2 vUv;

// ACES filmic tone mapping, Narkowicz 2015 analytic fit:
//   (x(a x + b)) / (x(c x + d) + e)
// with a=2.51, b=0.03, c=2.43, d=0.59, e=0.14. Operates on linear HDR values.
vec3 acesToneMap(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 linearToSRGB(vec3 c) {
  vec3 low = c * 12.92;
  vec3 high = 1.055 * pow(max(c, vec3(1e-5)), vec3(1.0 / 2.4)) - 0.055;
  return mix(low, high, step(vec3(0.0031308), c));
}

float grainNoise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;

  if (uDebug != 0) {
    vec3 raw = max(texture2D(tDiffuse, uv).rgb, vec3(0.0));
    if (uDebug == 7) {
      // Raw pre-post HDR: fixed-white-point log presentation so the full
      // dynamic range is readable (documented in the HUD).
      vec3 shaped = log2(1.0 + raw * 3.0) / log2(1.0 + 3.0 * 8.0);
      gl_FragColor = vec4(linearToSRGB(clamp(shaped, 0.0, 1.0)), 1.0);
      return;
    }
    // Views 1-6, 8, 9 already emit LDR-safe colours.
    gl_FragColor = vec4(linearToSRGB(clamp(raw, 0.0, 1.0)), 1.0);
    return;
  }

  vec2 centred = uv - 0.5;
  float radius2 = dot(centred, centred);

  // --- chromatic aberration: three radially offset samples -----------------
  vec2 offset = centred * radius2 * uChromatic * 0.075;
  vec3 colour;
  if (uChromatic > 0.0) {
    colour.r = texture2D(tDiffuse, uv + offset).r;
    colour.g = texture2D(tDiffuse, uv).g;
    colour.b = texture2D(tDiffuse, uv - offset).b;
  } else {
    colour = texture2D(tDiffuse, uv).rgb;
  }
  colour = max(colour, vec3(0.0));

  // --- exposure and ACES tone mapping --------------------------------------
  colour = acesToneMap(colour * uExposure);

  // --- vignette: falloff starts at 0.55 of the corner radius so the photon
  // ring and the disk's inner structure stay untouched ----------------------
  float cornerDistance = length(centred) * 1.41421356;
  float vignette = 1.0 - uVignette * smoothstep(0.55, 1.05, cornerDistance);
  colour *= clamp(vignette, 0.0, 1.0);

  // --- animated film grain -------------------------------------------------
  if (uGrain > 0.0) {
    float n = grainNoise(gl_FragCoord.xy + vec2(uTime * 91.7, uTime * 53.3));
    colour += (n - 0.5) * uGrain;
  }

  gl_FragColor = vec4(linearToSRGB(clamp(colour, 0.0, 1.0)), 1.0);
}
