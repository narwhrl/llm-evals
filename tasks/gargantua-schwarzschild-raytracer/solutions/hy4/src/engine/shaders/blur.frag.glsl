// Separable 5-tap Gaussian (9-tap equivalent) used for H and V bloom passes.
precision highp float;
varying vec2 vUv;
uniform sampler2D tSrc;
uniform vec2 uDir;
uniform float uRadius;

void main() {
  vec2 o1 = uDir * 1.3846153846 * uRadius;
  vec2 o2 = uDir * 3.2307692308 * uRadius;
  vec3 c = texture2D(tSrc, vUv).rgb * 0.2270270270;
  c += (texture2D(tSrc, vUv + o1).rgb + texture2D(tSrc, vUv - o1).rgb) * 0.3162162162;
  c += (texture2D(tSrc, vUv + o2).rgb + texture2D(tSrc, vUv - o2).rgb) * 0.0702702703;
  gl_FragColor = vec4(c, 1.0);
}
