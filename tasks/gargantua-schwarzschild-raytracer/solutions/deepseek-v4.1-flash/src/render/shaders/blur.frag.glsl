precision highp float;

varying vec2 vUv;
out highp vec4 fragColor;

uniform sampler2D tInput;
uniform vec2 uDirection;

void main() {
  vec3 color = texture(tInput, vUv).rgb * 0.2270270270;
  color += texture(tInput, vUv + uDirection * 1.3846153846).rgb * 0.3162162162;
  color += texture(tInput, vUv - uDirection * 1.3846153846).rgb * 0.3162162162;
  color += texture(tInput, vUv + uDirection * 3.2307692308).rgb * 0.0702702703;
  color += texture(tInput, vUv - uDirection * 3.2307692308).rgb * 0.0702702703;
  fragColor = vec4(color, 1.0);
}
