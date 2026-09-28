// Full-screen rendering primitive vertex shader.
//
// Geometry carries nothing but the screen-space UV: the quad is drawn with an
// OrthographicCamera(-1..1) and every visible pixel — event horizon, accretion
// disk, lensed stars and galaxy — is produced by the fragment shader below.

varying vec2 vUv;

void main() {
  vUv = uv;
  // Bypass the projection matrices entirely and fill the clip volume.
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
