uniform sampler2D tInput;
uniform vec2 uSourceTexel;
uniform float uThreshold;
varying vec2 vUv;

vec3 brightPart(vec3 color) {
  float brightness = max(max(color.r, color.g), color.b);
  float knee = 0.35;
  float soft = clamp(brightness - uThreshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee);
  float contribution = max(soft, brightness - uThreshold) / max(brightness, 0.00001);
  return color * max(contribution, 0.0);
}

void main() {
  vec2 d = uSourceTexel;
  vec3 color = texture2D(tInput, vUv).rgb * 0.4;
  color += texture2D(tInput, vUv + vec2(d.x, d.y)).rgb * 0.15;
  color += texture2D(tInput, vUv + vec2(-d.x, d.y)).rgb * 0.15;
  color += texture2D(tInput, vUv + vec2(d.x, -d.y)).rgb * 0.15;
  color += texture2D(tInput, vUv + vec2(-d.x, -d.y)).rgb * 0.15;
  gl_FragColor = vec4(brightPart(color), 1.0);
}
