// Plain downsample copy for successive bloom pyramid levels.
precision highp float;
varying vec2 vUv;
uniform sampler2D tSrc;

void main() {
  gl_FragColor = vec4(texture2D(tSrc, vUv).rgb, 1.0);
}
