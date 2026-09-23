// =========================================================================
// GARGANTUA — separable Gaussian blur (module 2)
//
// One shader is reused for the horizontal pass (direction=(1,0)) and the
// vertical pass (direction=(0,1)).  The renderer allocates a dedicated
// ping-pong pair (blurH, blurV) at half the scene resolution to amortise
// the cost — bloom looks visually identical at 1/2 res while doing only
// ~25% of the fill-rate.
//
// Tap count is selected per quality level:
//   standard  ->  5 taps
//   high      ->  9 taps
//   cinematic -> 13 taps
//
// The shader bakes the maximum-tap compile-time loop upper bound (13) and
// the runtime u_taps guard selects which subset to actually accumulate.
// =========================================================================

precision highp float;

uniform sampler2D u_src;
uniform vec2 u_direction;     // (1,0) horizontal, (0,1) vertical
uniform vec2 u_texelSize;     // 1.0 / sourceSize
uniform int u_taps;           // active taps: 5, 9 or 13
uniform float u_radius;       // pixel radius multiplier (>=1)

varying vec2 v_uv;

// Gaussian weights: sigma chosen so the central tap dominates and the
// outer 13 taps fall to ~0.5%.  Compiled as a const array for unrolling.
const float W0 = 0.196381;
const float W1 = 0.174666;
const float W2 = 0.121836;
const float W3 = 0.066649;
const float W4 = 0.028587;
const float W5 = 0.009625;
const float W6 = 0.002543;

float weightForIndex(int i) {
  if (i == 0) return W0;
  if (i == 1) return W1;
  if (i == 2) return W2;
  if (i == 3) return W3;
  if (i == 4) return W4;
  if (i == 5) return W5;
  return W6;
}

void main() {
  // Effective pair count: taps/2 (rounded down).  5 -> 2, 9 -> 4, 13 -> 6.
  int pairs = u_taps / 2;
  float weightSum = W0; // central tap
  vec3 accum = texture2D(u_src, v_uv).rgb * W0;

  for (int i = 1; i < 7; ++i) {
    if (i > pairs) break;
    float w = weightForIndex(i);
    float ofs = float(i) * u_radius;
    vec2 off = u_direction * u_texelSize * ofs;
    vec3 s1 = texture2D(u_src, v_uv + off).rgb;
    vec3 s2 = texture2D(u_src, v_uv - off).rgb;
    accum += (s1 + s2) * w;
    weightSum += 2.0 * w;
  }

  accum /= max(weightSum, 1e-4);
  gl_FragColor = vec4(accum, 1.0);
}
