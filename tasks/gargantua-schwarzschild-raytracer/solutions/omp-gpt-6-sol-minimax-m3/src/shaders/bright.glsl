// =========================================================================
// GARGANTUA — bright-pass extraction (module 2)
//
// Reads the linear HDR scene (output of raytrace.glsl), extracts pixels
// above `u_threshold` (soft-knee with a hard bright shoulder) and
// outputs a tinted luminance scalar.  Used as the input to the
// separable Gaussian blur in blur.glsl, which in turn feeds the bloom
// in composite.glsl.
//
// Note: debug=9 reads this bright target directly through the composite
// pass's diagnostic branch (no amplification — the displayed colour is
// the actual soft-knee extraction with a perceptual gamma).  The bright
// material intentionally has no debug branch of its own; the renderer
// owns the presentation.
// =========================================================================

precision highp float;

uniform sampler2D u_hdr;
uniform vec2 u_texelSize;     // 1.0 / targetSize
uniform float u_threshold;    // bloom threshold (linear HDR units)
uniform float u_intensity;    // bloom intensity (linear scalar)
uniform int u_debug;          // accepted but unused — see note above

varying vec2 v_uv;

vec3 softKnee(vec3 color, float threshold) {
  // Compute luminance using Rec.709 weights.
  float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
  // Hard bright portion: pixels well above threshold contribute linearly
  // so hot disk regions bloom proportionally to their actual brightness
  // instead of saturating at the soft-knee shoulder.
  float hard = max(lum - threshold, 0.0);
  // Soft knee: smooth ramp over the [threshold - knee, threshold + knee]
  // band so we don't pop on/off as rays hit the threshold.
  float knee = max(threshold * 0.5, 1e-4);
  float soft  = lum - threshold + knee;
  soft = clamp(soft, 0.0, 2.0 * knee);
  soft = soft * soft / max(4.0 * knee, 1e-4);
  // Total luminance contribution = hard + soft; per-channel tint is
  // proportional to channel intensity so colour stays tinted, not white.
  float lumBright = hard + soft;
  vec3 contribution = max(vec3(0.0), color) * (lumBright / max(lum, 1e-4));
  return contribution * u_intensity;
}

void main() {
  vec3 hdr = texture2D(u_hdr, v_uv).rgb;

  // Map HalfFloat input into a finite range.  GLSL ES 1.0 has no
  // isnan()/any() so we rely on the clamp alone to handle non-finite
  // values; the soft-knee maths that follows is well-conditioned for
  // any non-NaN value.
  hdr = clamp(hdr, vec3(0.0), vec3(65504.0));

  vec3 bright = softKnee(hdr, u_threshold);
  gl_FragColor = vec4(bright, 1.0);
}
