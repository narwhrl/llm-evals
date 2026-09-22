// Final composite: chromatic aberration → Bloom → exposure → optical vignette
// → ACES (fitted RRT+ODT) → sRGB → luminance-weighted film grain → dither.
// Debug views 1–7 arrive display-referred and pass through untouched; view 9
// maps the scene-referred HDR luminance (before any post-processing) to Turbo.
precision highp float;

in vec2 vUv;
layout(location = 0) out vec4 fragColor;

uniform sampler2D uHdr;
uniform sampler2D uBloom;
uniform int uBloomEnabled;
uniform float uBloomIntensity;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform int uChromaticTaps;
uniform float uAspect;
uniform float uGrainSeed;
uniform int uDebugMode;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 turbo(float x) {
  x = clamp(x, 0.0, 1.0);
  const vec4 kRed4 = vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234);
  const vec4 kGreen4 = vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333);
  const vec4 kBlue4 = vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771);
  const vec2 kRed2 = vec2(-152.94239396, 59.28637943);
  const vec2 kGreen2 = vec2(4.27729857, 2.82956604);
  const vec2 kBlue2 = vec2(-89.90310912, 27.34824973);
  vec4 v4 = vec4(1.0, x, x * x, x * x * x);
  vec2 v2 = v4.zw * v4.z;
  return clamp(vec3(
    dot(v4, kRed4) + dot(v2, kRed2),
    dot(v4, kGreen4) + dot(v2, kGreen2),
    dot(v4, kBlue4) + dot(v2, kBlue2)
  ), 0.0, 1.0);
}

// ACES fitted (Stephen Hill): sRGB → AP1 with RRT saturation, RRT+ODT
// rational fit, then ODT saturation and AP1 → sRGB. Matrices are column-major.
const mat3 ACES_INPUT = mat3(
  0.59719, 0.07600, 0.02840,
  0.35458, 0.90834, 0.13383,
  0.04823, 0.01566, 0.83777
);
const mat3 ACES_OUTPUT = mat3(
  1.60475, -0.10208, -0.00327,
  -0.53108, 1.10813, -0.07276,
  -0.07367, -0.00605, 1.07602
);

vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFitted(vec3 color) {
  color = ACES_INPUT * color;
  color = rrtAndOdtFit(color);
  color = ACES_OUTPUT * color;
  return clamp(color, 0.0, 1.0);
}

vec3 linearToSrgb(vec3 c) {
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), c));
}

// Radial lateral chromatic aberration, zero at the optical centre so the
// photon ring and horizon edge in the middle of the frame stay sharp.
vec3 sampleWithDispersion(vec2 uv) {
  vec2 centered = uv - 0.5;
  vec2 lens = vec2(centered.x * uAspect, centered.y);
  vec2 shift = centered * dot(lens, lens) * (uChromatic * 0.045);
  if (uChromatic <= 0.0) return texture(uHdr, uv).rgb;
  if (uChromaticTaps <= 3) {
    return vec3(
      texture(uHdr, uv + shift).r,
      texture(uHdr, uv).g,
      texture(uHdr, uv - shift).b
    );
  }
  vec3 sum = vec3(0.0);
  vec3 weights = vec3(0.0);
  for (int i = 0; i < 9; ++i) {
    if (i >= uChromaticTaps) break;
    float t = float(i) / float(uChromaticTaps - 1) * 2.0 - 1.0;
    vec3 w = vec3(max(t, 0.0), 1.0 - abs(t), max(-t, 0.0));
    w = max(w, vec3(0.0));
    sum += texture(uHdr, uv + shift * t).rgb * w;
    weights += w;
  }
  return sum / max(weights, vec3(1e-4));
}

void main() {
  if (uDebugMode >= 1 && uDebugMode <= 7) {
    fragColor = vec4(texture(uHdr, vUv).rgb, 1.0);
    return;
  }
  if (uDebugMode == 9) {
    vec3 hdr = texture(uHdr, vUv).rgb;
    float lum = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
    float x = (log(max(lum, 1e-6)) / log(10.0) + 3.0) / 5.0;
    vec3 col = lum <= 1e-6 ? vec3(0.0) : turbo(x);
    float decade = abs(fract(x * 5.0 + 0.5) - 0.5);
    col *= 1.0 - 0.35 * (1.0 - smoothstep(0.0, 0.04, decade)) * step(1e-6, lum);
    fragColor = vec4(col, 1.0);
    return;
  }

  vec3 color = sampleWithDispersion(vUv);
  if (uBloomEnabled == 1) color += texture(uBloom, vUv).rgb * uBloomIntensity;
  color *= uExposure;

  vec2 centered = (vUv - 0.5) * vec2(uAspect, 1.0);
  float radius = length(centered) / length(vec2(uAspect, 1.0) * 0.5);
  float falloff = 1.0 - smoothstep(0.45, 1.15, radius);
  color *= mix(1.0, falloff * falloff, uVignette);

  // /0.6 matches the exposure normalisation of the reference ACES fit.
  vec3 display = linearToSrgb(acesFitted(color / 0.6));

  float lum = dot(display, vec3(0.2126, 0.7152, 0.0722));
  vec2 pixel = gl_FragCoord.xy;
  float n = hash12(pixel + uGrainSeed * 61.7) + hash12(pixel * 1.37 + uGrainSeed * 17.3) - 1.0;
  display += n * (uGrain * 0.11) * sqrt(lum) * (1.0 - 0.55 * lum);
  float dither = hash12(pixel * 0.713 + 19.19) - 0.5;
  display += dither * (1.0 / 255.0) * min(lum * 48.0, 1.0);
  fragColor = vec4(clamp(display, 0.0, 1.0), 1.0);
}
