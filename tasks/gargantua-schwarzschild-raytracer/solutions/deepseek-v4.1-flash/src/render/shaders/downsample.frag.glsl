precision highp float;

varying vec2 vUv;
out highp vec4 fragColor;

uniform sampler2D tInput;
uniform vec2 uTexel;

void main() {
  vec3 color = texture(tInput, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  color += texture(tInput, vUv + uTexel * vec2(1.0, -1.0)).rgb;
  color += texture(tInput, vUv + uTexel * vec2(-1.0, 1.0)).rgb;
  color += texture(tInput, vUv + uTexel * vec2(1.0, 1.0)).rgb;
  fragColor = vec4(color * 0.25, 1.0);
}
