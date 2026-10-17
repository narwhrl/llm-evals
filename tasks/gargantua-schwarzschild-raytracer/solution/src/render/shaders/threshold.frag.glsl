precision highp float;

varying vec2 vUv;
out highp vec4 fragColor;

uniform sampler2D tInput;
uniform float uThreshold;
uniform float uKnee;

void main() {
  vec3 color = texture(tInput, vUv).rgb;
  float brightness = max(color.r, max(color.g, color.b));
  float soft = clamp(brightness - uThreshold + uKnee, 0.0, 2.0 * uKnee);
  soft = soft * soft / (4.0 * uKnee + 1e-4);
  float contribution = max(soft, brightness - uThreshold) / max(brightness, 1e-4);
  fragColor = vec4(color * contribution, 1.0);
}
