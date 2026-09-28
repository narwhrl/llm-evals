// Shared GLSL snippets. All passes draw one full-screen triangle with a
// RawShaderMaterial (GLSL ES 3.00), so colour management is explicit.

export const FULLSCREEN_VERT = /* glsl */ `
precision highp float;
in vec3 position;
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const HASH_NOISE = /* glsl */ `
uint pcg(uint v) {
  uint state = v * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}
uint hash3u(uvec3 v) { return pcg(v.x ^ pcg(v.y ^ pcg(v.z))); }
float u2f(uint h) { return float(h & 0x00ffffffu) / 16777215.0; }

float valueNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = p - i;
  vec3 w = f * f * (3.0 - 2.0 * f);
  uvec3 c = uvec3(ivec3(i) + 32768);
  float n000 = u2f(hash3u(c));
  float n100 = u2f(hash3u(c + uvec3(1u, 0u, 0u)));
  float n010 = u2f(hash3u(c + uvec3(0u, 1u, 0u)));
  float n110 = u2f(hash3u(c + uvec3(1u, 1u, 0u)));
  float n001 = u2f(hash3u(c + uvec3(0u, 0u, 1u)));
  float n101 = u2f(hash3u(c + uvec3(1u, 0u, 1u)));
  float n011 = u2f(hash3u(c + uvec3(0u, 1u, 1u)));
  float n111 = u2f(hash3u(c + uvec3(1u, 1u, 1u)));
  return mix(mix(mix(n000, n100, w.x), mix(n010, n110, w.x), w.y),
             mix(mix(n001, n101, w.x), mix(n011, n111, w.x), w.y), w.z);
}

float fbm(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * valueNoise(p);
    p = p * 2.03 + vec3(17.1, 5.3, 11.7);
    amp *= 0.5;
  }
  return sum / 0.96875;
}
`;

// Approximate Planckian colour (Tanner Helland fit), converted to linear
// RGB and normalised so its largest channel is 1.
export const BLACKBODY = /* glsl */ `
vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  float r = t <= 66.0 ? 1.0 : clamp(1.29293618606 * pow(t - 60.0, -0.1332047592), 0.0, 1.0);
  float g = t <= 66.0 ? clamp(0.39008157876 * log(t) - 0.63184144378, 0.0, 1.0)
                      : clamp(1.12989086089 * pow(t - 60.0, -0.0755148492), 0.0, 1.0);
  float b = t >= 66.0 ? 1.0 : (t <= 19.0 ? 0.0 : clamp(0.54320678911 * log(t - 10.0) - 1.19625408914, 0.0, 1.0));
  return pow(vec3(r, g, b), vec3(2.2));
}
`;
