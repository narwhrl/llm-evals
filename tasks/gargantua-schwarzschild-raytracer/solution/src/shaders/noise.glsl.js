/**
 * Shared GLSL: hashing, value noise, fbm and a small rotation helper.
 *
 * Every generator here is deterministic in its inputs, which is what makes the
 * `?capture=1&time=<seconds>` contract reproducible: freezing the simulation time freezes
 * all procedural detail, because no generator consults a wall clock or a frame counter.
 * Hashing uses Dave Hoskins' sin-free integer mix to stay stable on low-precision GPUs.
 */
export const NOISE_GLSL = /* glsl */ `
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.xxy + p3.yxx) * p3.zyx);
}

// Trilinear value noise on the integer lattice.
float valueNoise3(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z);
}

// Fractal sum. \`octaves\` is a uniform-derived value, which GLSL ES 3.00 permits.
float fbm3(vec3 p, int octaves) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    sum += amp * valueNoise3(p);
    norm += amp;
    amp *= 0.5;
    p = p * 2.03 + vec3(11.7, 5.3, 7.1);
  }
  return sum / max(norm, 1e-5);
}

// Ridged variant, used for the filamentary structure inside the galactic band.
float ridged3(vec3 p, int octaves) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    float n = 1.0 - abs(valueNoise3(p) * 2.0 - 1.0);
    sum += amp * n * n;
    norm += amp;
    amp *= 0.5;
    p = p * 2.11 + vec3(3.9, 17.3, 9.4);
  }
  return sum / max(norm, 1e-5);
}

mat3 rotationY(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

mat3 rotationAxis(vec3 axis, float a) {
  float s = sin(a);
  float c = cos(a);
  float t = 1.0 - c;
  vec3 n = normalize(axis);
  return mat3(
    t * n.x * n.x + c,        t * n.x * n.y - s * n.z,  t * n.x * n.z + s * n.y,
    t * n.x * n.y + s * n.z,  t * n.y * n.y + c,        t * n.y * n.z - s * n.x,
    t * n.x * n.z - s * n.y,  t * n.y * n.z + s * n.x,  t * n.z * n.z + c);
}
`
