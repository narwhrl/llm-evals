// =========================================================================
// GARGANTUA — final composite (module 2)
//
// Pipeline (debug == 0 — full beauty pass):
//   * sample linear HDR raytrace output (with chromatic aberration)
//   * add separable-blurred bloom
//   * exposure (multiplicative)
//   * restrained ACES filmic tone curve
//   * radial vignette
//   * pixel-level deterministic grain (luma-masked so the deep-dark
//     event horizon stays pure black)
//   * exactly one linear-to-sRGB conversion before write
//
// Diagnostic path (debug 1..9):
//   * the raytrace shader's `u_debug` branch produces a clean
//     diagnostic colour straight from the shader; we sample that colour
//     from the HDR target, sRGB-encode it once, and write it to the
//     canvas without exposure / ACES / vignette / grain / CA so the
//     visualisation is faithful to the underlying metric.
//   * debug 9 reads the bright-pass target (raw soft-knee luminance)
//     instead of the HDR target, with a perceptual scale to lift the
//     dim values into a visible range.  This is the only diagnostic
//     that does not come from the raytrace shader.
//
// The renderer sets `renderer.outputColorSpace = LinearSRGBColorSpace`
// and `renderer.toneMapping = NoToneMapping` so Three does NOT do its
// own conversion on the way to the default framebuffer.  This shader
// is the ONLY place in the pipeline that performs linear->sRGB
// encoding.
// =========================================================================

precision highp float;

uniform sampler2D u_hdr;       // raytrace HDR scene
uniform sampler2D u_bloom;     // blurred bright pass (also used as the
                               // raw threshold-extracted target for debug 9)
uniform vec2  u_resolution;    // scene render-target size (px)
uniform float u_exposure;      // exposure multiplier
uniform float u_vignette;      // 0..0.6 vignette strength
uniform float u_grain;         // 0..0.12 grain strength
uniform float u_chromatic;     // 0..2 chromatic aberration (px)
uniform float u_bloomAmount;   // effective bloom scalar (>=0)
uniform int   u_debug;

varying vec2 v_uv;

// 2D hash (deterministic, time-independent).  Identical inputs -> identical
// output.  This is the source of grain — capture mode relies on the
// property that nothing in this path uses Date.now() or Math.random().
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// ACES filmic curve (Krzysztof Narkowicz fit).  Input/output in linear.
vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

// Linear -> sRGB transfer (IEC 61966-2-1).  Used once at the end.
vec3 linearToSrgb(vec3 c) {
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
  return mix(hi, lo, step(c, vec3(0.0031308)));
}

// Diagnostic visualisation: sRGB-encode a linear colour without any of
// the beauty pass steps.  The raytrace shader's debug branches already
// produce simple linear palette colours (e.g. heatmap blue->orange);
// the sRGB encoding makes them perceptually correct on screen.
vec3 presentDiagnostic(vec3 linearColour) {
  // Diagnostic outputs can exceed [0,1] (e.g. debug 8 log HDR values
  // up to ~1.0, debug 5 Doppler up to 1.5).  Tone-clamp before sRGB.
  return linearToSrgb(clamp(linearColour, 0.0, 1.0));
}

void main() {
  vec2 uv = v_uv;
  vec2 px = 1.0 / u_resolution;

  // -------------------------------------------------------------------
  // Diagnostic paths first — they bypass the beauty pipeline entirely.
  // -------------------------------------------------------------------
  if (u_debug == 9) {
    // Threshold bright pass: read the raw HDR bright target (soft-knee
    // luminance, before blur).  This is the actual soft-knee extraction
    // the bloom chain feeds from — soft-knee values are typically
    // 0..1.5 in our pipeline.  We present them in red with a small
    // perceptual gamma so dim-but-positive pixels stay visible; pixels
    // genuinely below the threshold read as pure black.  No composite
    // beautification (ACES / vignette / grain / CA) is applied so the
    // visualisation reflects the raw extraction.
    vec3 bright = texture2D(u_bloom, uv).rgb;
    float lum = dot(bright, vec3(0.2126, 0.7152, 0.0722));
    float v = clamp(pow(max(lum, 0.0), 0.55), 0.0, 1.0);
    gl_FragColor = vec4(presentDiagnostic(vec3(v, v * 0.25, v * 0.05)), 1.0);
    return;
  }
  if (u_debug >= 1 && u_debug <= 8) {
    // Diagnostic 1..8: read the HDR target — the raytrace shader
    // already produced the diagnostic colour directly via its
    // u_debug branch — and present it without beautification.
    vec3 colour = texture2D(u_hdr, uv).rgb;
    gl_FragColor = vec4(presentDiagnostic(colour), 1.0);
    return;
  }

  // -------------------------------------------------------------------
  // debug == 0 — full beauty pipeline.
  // -------------------------------------------------------------------

  // Chromatic aberration: per-channel pixel offset along radial axis.
  // Centre is the principal point (default uv 0.5, 0.5).
  vec2 dir = uv - 0.5;
  vec2 caR = dir * (u_chromatic * 1.0)  * px;
  vec2 caB = dir * (u_chromatic * -1.0) * px;
  vec3 hdr;
  hdr.r = texture2D(u_hdr, uv + caR).r;
  hdr.g = texture2D(u_hdr, uv).g;
  hdr.b = texture2D(u_hdr, uv + caB).b;

  vec3 bloom = texture2D(u_bloom, uv).rgb;
  vec3 scene = hdr + bloom * u_bloomAmount;

  // Exposure
  scene *= max(u_exposure, 0.0);

  // ACES tone-map.  Operates in linear; linearToSrgb follows.
  vec3 toneMapped = aces(scene);

  // Vignette (after tone-map so the darkening follows perceptual
  // brightness).  `length(dir)` is 0 at the screen centre and ~0.7 at
  // the corners; `smoothstep(0.35, 0.85, r)` rises from 0 to 1 across
  // that band, so 1 - that gives the brightness multiplier.
  float vig = 1.0 - smoothstep(0.35, 0.85, length(dir));
  toneMapped *= mix(1.0, vig, clamp(u_vignette, 0.0, 1.0));

  // Deterministic grain — hash on integer pixel coords for stability.
  // Modulate by a luminance mask so the deep-dark event horizon stays
  // pure black instead of getting lifted by the grain hash.
  vec2 grainCoord = gl_FragCoord.xy;
  float g = hash21(grainCoord) - 0.5;
  float grainMask = smoothstep(0.02, 0.18, max(max(toneMapped.r, toneMapped.g), toneMapped.b));
  toneMapped += g * clamp(u_grain, 0.0, 1.0) * grainMask;

  // Linear -> sRGB conversion (the only one in the entire pipeline).
  gl_FragColor = vec4(linearToSrgb(clamp(toneMapped, 0.0, 1.0)), 1.0);
}
