uniform sampler2D tInput;
uniform vec2 uDirection;
varying vec2 vUv;

void main() {
  vec3 color = texture2D(tInput, vUv).rgb * 0.227027;
  color += texture2D(tInput, vUv + uDirection * 1.384615).rgb * 0.316216;
  color += texture2D(tInput, vUv - uDirection * 1.384615).rgb * 0.316216;
  color += texture2D(tInput, vUv + uDirection * 3.230769).rgb * 0.070270;
  color += texture2D(tInput, vUv - uDirection * 3.230769).rgb * 0.070270;
  gl_FragColor = vec4(color, 1.0);
}
