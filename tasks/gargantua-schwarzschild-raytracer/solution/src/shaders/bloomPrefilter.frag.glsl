// Bloom prefilter: 4-tap box downsample + soft-knee luminance threshold.
precision highp float;

uniform sampler2D uSource;
uniform vec2 uTexel;      // texel size of the source
uniform float uThreshold;
uniform float uKnee;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec3 c = texture(uSource, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture(uSource, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
  c += texture(uSource, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
  c += texture(uSource, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
  c *= 0.25;

  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float knee = max(uKnee, 1e-4);
  float soft = clamp(l - uThreshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee);
  float contrib = max(soft, l - uThreshold) / max(l, 1e-5);

  fragColor = vec4(c * contrib, 1.0);
}
