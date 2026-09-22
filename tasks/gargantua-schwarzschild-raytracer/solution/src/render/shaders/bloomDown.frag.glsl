// Bloom downsample: 13-tap filter (Jimenez, "Next Generation Post Processing in
// Call of Duty: Advanced Warfare", 2014). The first pass additionally applies
// exposure, a soft-knee brightness threshold and a Karis average so isolated
// hot pixels (lensed stars, Doppler-boosted disk) do not flicker.
precision highp float;

in vec2 vUv;
layout(location = 0) out vec4 fragColor;

uniform sampler2D uSource;
uniform vec2 uSourceTexel;
uniform int uPrefilter;
uniform float uExposure;
uniform float uThreshold;
uniform float uKnee;

vec3 tap(vec2 offset) {
  return texture(uSource, vUv + offset * uSourceTexel).rgb;
}

float luma(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

vec3 thresholded(vec3 c) {
  c *= uExposure;
  float brightness = max(c.r, max(c.g, c.b));
  float soft = clamp(brightness - uThreshold + uKnee, 0.0, 2.0 * uKnee);
  soft = soft * soft / (4.0 * uKnee + 1e-5);
  return c * (max(soft, brightness - uThreshold) / max(brightness, 1e-5));
}

vec3 groupAverage(vec3 a, vec3 b, vec3 c, vec3 d) {
  vec3 avg = (a + b + c + d) * 0.25;
  if (uPrefilter == 1) avg *= 1.0 / (1.0 + luma(avg));
  return avg;
}

void main() {
  vec3 A = tap(vec2(-2.0, -2.0));
  vec3 B = tap(vec2(0.0, -2.0));
  vec3 C = tap(vec2(2.0, -2.0));
  vec3 D = tap(vec2(-1.0, -1.0));
  vec3 E = tap(vec2(1.0, -1.0));
  vec3 F = tap(vec2(-2.0, 0.0));
  vec3 G = tap(vec2(0.0, 0.0));
  vec3 H = tap(vec2(2.0, 0.0));
  vec3 I = tap(vec2(-1.0, 1.0));
  vec3 J = tap(vec2(1.0, 1.0));
  vec3 K = tap(vec2(-2.0, 2.0));
  vec3 L = tap(vec2(0.0, 2.0));
  vec3 M = tap(vec2(2.0, 2.0));
  if (uPrefilter == 1) {
    A = thresholded(A); B = thresholded(B); C = thresholded(C); D = thresholded(D);
    E = thresholded(E); F = thresholded(F); G = thresholded(G); H = thresholded(H);
    I = thresholded(I); J = thresholded(J); K = thresholded(K); L = thresholded(L);
    M = thresholded(M);
  }
  vec3 color = groupAverage(D, E, I, J) * 0.5
    + groupAverage(A, B, G, F) * 0.125
    + groupAverage(B, C, H, G) * 0.125
    + groupAverage(F, G, L, K) * 0.125
    + groupAverage(G, H, M, L) * 0.125;
  if (uPrefilter == 1) color *= 1.0 / max(1.0 - luma(color), 1e-3);
  fragColor = vec4(color, 1.0);
}
