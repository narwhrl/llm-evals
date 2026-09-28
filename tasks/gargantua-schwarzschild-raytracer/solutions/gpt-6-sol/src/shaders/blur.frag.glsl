precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uInput;
uniform vec2 uTexel;
uniform vec2 uDirection;
uniform float uThreshold;
uniform bool uApplyThreshold;
uniform bool uRgbm;

vec3 unpackColor(vec4 value) {
  return uRgbm ? value.rgb * value.a * 16.0 : value.rgb;
}
vec4 packColor(vec3 color) {
  if (!uRgbm) return vec4(color, 1.0);
  float m = ceil(clamp(max(max(color.r, color.g), color.b) / 16.0, 1.0 / 255.0, 1.0) * 255.0) / 255.0;
  return vec4(color / (16.0 * m), m);
}
vec3 sampleColor(vec2 uv) {
  vec3 c = unpackColor(texture(uInput, clamp(uv, vec2(0.0), vec2(1.0))));
  if (uApplyThreshold) {
    float peak = max(max(c.r, c.g), c.b);
    c *= smoothstep(uThreshold * 0.65, uThreshold * 1.35, peak);
  }
  return c;
}
void main() {
  vec2 d = uDirection * uTexel;
  vec3 c = sampleColor(vUv) * 0.227027;
  c += (sampleColor(vUv + d) + sampleColor(vUv - d)) * 0.1945946;
  c += (sampleColor(vUv + 2.0 * d) + sampleColor(vUv - 2.0 * d)) * 0.1216216;
  c += (sampleColor(vUv + 3.0 * d) + sampleColor(vUv - 3.0 * d)) * 0.054054;
  c += (sampleColor(vUv + 4.0 * d) + sampleColor(vUv - 4.0 * d)) * 0.016216;
  outColor = packColor(c);
}
