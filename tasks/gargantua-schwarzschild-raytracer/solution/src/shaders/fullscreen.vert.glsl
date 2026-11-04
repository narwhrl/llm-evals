precision highp float;

varying vec2 vUv;

// Full-screen quad (PlaneGeometry 2x2). No 3D geometry is projected: the
// fragment shader builds one observation ray per pixel from the camera bases.
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
