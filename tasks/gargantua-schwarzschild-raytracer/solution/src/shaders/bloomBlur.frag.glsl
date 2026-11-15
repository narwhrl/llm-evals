// Separable 9-tap Gaussian blur (linear-sampling optimised, sigma ~ 2).
precision highp float;

uniform sampler2D uSource;
uniform vec2 uDirection;  // texel-scaled blur direction

in vec2 vUv;
out vec4 fragColor;

const float W0 = 0.2270270270;
const float W1 = 0.3162162162;
const float W2 = 0.0702702703;
const float O1 = 1.3846153846;
const float O2 = 3.2307692308;

void main() {
  vec3 c = texture(uSource, vUv).rgb * W0;
  c += texture(uSource, vUv + uDirection * O1).rgb * W1;
  c += texture(uSource, vUv - uDirection * O1).rgb * W1;
  c += texture(uSource, vUv + uDirection * O2).rgb * W2;
  c += texture(uSource, vUv - uDirection * O2).rgb * W2;
  fragColor = vec4(c, 1.0);
}
