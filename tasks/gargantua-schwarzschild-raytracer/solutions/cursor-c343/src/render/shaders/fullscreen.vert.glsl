precision highp float;

in vec3 position;
out vec2 vUv;

// One oversized triangle covering clip space; every pass is a per-pixel fragment program.
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
