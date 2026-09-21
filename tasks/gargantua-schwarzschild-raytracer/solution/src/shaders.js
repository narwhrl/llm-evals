export const SCREEN_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vec2 p = position.xy;
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}
`

export const RAY_FRAG = /* glsl */ `
varying vec2 vUv;

uniform vec2 uResolution;
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uFov;
uniform float uTime;
uniform int uMaxSteps;
uniform int uMaxCrossings;
uniform float uStepScale;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskH;
uniform float uTemp;
uniform float uEmit;
uniform float uOrbital;
uniform float uTurbAmp;
uniform float uTurbSpeed;
uniform float uStarDensity;
uniform float uGalaxy;
uniform int uDebug;

// Schwarzschild null geodesics in the areal-radius Cartesian embedding.
// rs = 2M = 1. The spatial orbit equation is
//   d²u/dφ² + u = (3 rs / 2) u²,  u = 1/r.
// Binet's formula turns that into the curvature acceleration
//   d²x/dλ² = -(3 rs / 2) |x × dx/dλ|² x / |x|⁵.
// State per pixel: position x, velocity v = dx/dλ, conserved L² = |x × v|².
// Integrated with RK4. Terminate at the event horizon r <= rs, or when the
// ray is outbound past the escape radius. Disk hits are analytic segment tests
// against the equatorial slab, accumulated front-to-back in path order.
const float RS = 1.0;
const float MASS = 0.5;
const float PHOTON_R = 1.5;
const float ESCAPE_R = 52.0;
const int STEP_CAP = 360;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int octave = 0; octave < 4; octave++) {
    sum += amp * vnoise(p);
    p = p * 2.03 + vec2(13.1, 7.7);
    amp *= 0.5;
  }
  return sum;
}

vec3 schwarzschildAcceleration(vec3 x, float h2) {
  float r2 = max(dot(x, x), 1.0e-4);
  float r = sqrt(r2);
  float invR5 = 1.0 / (r2 * r2 * r);
  return (-1.5 * RS * h2 * invR5) * x;
}

void rk4(inout vec3 x, inout vec3 v, float h2, float dt) {
  vec3 a1 = schwarzschildAcceleration(x, h2);
  vec3 v2 = v + 0.5 * dt * a1;
  vec3 x2 = x + 0.5 * dt * v;
  vec3 a2 = schwarzschildAcceleration(x2, h2);
  vec3 v3 = v + 0.5 * dt * a2;
  vec3 x3 = x + 0.5 * dt * v2;
  vec3 a3 = schwarzschildAcceleration(x3, h2);
  vec3 v4 = v + dt * a3;
  vec3 x4 = x + dt * v3;
  vec3 a4 = schwarzschildAcceleration(x4, h2);
  x += (dt / 6.0) * (v + 2.0 * v2 + 2.0 * v3 + v4);
  v += (dt / 6.0) * (a1 + 2.0 * a2 + 2.0 * a3 + a4);
}

float affineStep(float r, float speed) {
  float dt = uStepScale * (0.02 + 0.034 * r);
  float ring = 1.0 - smoothstep(0.12, 1.25, abs(r - PHOTON_R));
  dt *= mix(1.0, 0.58, ring);
  float budget = 0.4 * max(r - RS, 0.055);
  dt = min(dt, budget / max(speed, 0.25));
  return clamp(dt, 0.0045, 0.72);
}

vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  float r;
  float g;
  float b;
  if (t <= 66.0) {
    r = 255.0;
    g = 99.4708025861 * log(t) - 161.1195681661;
  } else {
    r = 329.698727446 * pow(t - 60.0, -0.1332047592);
    g = 288.1221695283 * pow(t - 60.0, -0.0755148492);
  }
  if (t >= 66.0) b = 255.0;
  else if (t <= 19.0) b = 0.0;
  else b = 138.5177312231 * log(t - 10.0) - 305.0447927307;
  return clamp(vec3(r, g, b) / 255.0, 0.0, 1.0);
}

vec3 diskRadiance(vec3 p, vec3 vel, out float gOut) {
  float rho = max(length(p.xz), 0.25);
  float rin = max(uDiskInner, 1.2);
  float rout = max(uDiskOuter, rin + 0.5);
  float temperature = uTemp * pow(rin / rho, 0.75);
  float phi = atan(p.z, p.x);
  float flow = phi - uTime * uTurbSpeed / max(pow(rho, 1.15), 0.45);
  float turb = mix(fbm(vec2(rho * 0.52, flow * 1.65)), fbm(vec2(rho * 1.28 + 4.2, flow * 3.05)), 0.42);
  float modulate = mix(1.0, 0.32 + 1.4 * turb, clamp(uTurbAmp, 0.0, 1.0));
  temperature *= mix(0.7, 1.18, modulate);

  float beta = uOrbital * sqrt(MASS / rho) / sqrt(max(1.0 - RS / rho, 1.0e-3));
  beta = clamp(beta, 0.0, 0.88);
  float gamma = inversesqrt(max(1.0 - beta * beta, 1.0e-4));
  vec3 orbit = vec3(p.z, 0.0, -p.x) / rho;
  vec3 photon = -vel / max(length(vel), 1.0e-4);
  float grav = sqrt(max(1.0 - RS / rho, 0.0));
  float g = grav / (gamma * max(1.0 - beta * dot(orbit, photon), 0.05));
  gOut = g;

  float width = max(0.35, 0.14 * (rout - rin));
  float outer = 1.0 - smoothstep(rout - width, rout, rho);
  float inner = smoothstep(rin, rin + 0.05, rho);
  float energy = pow(max(g, 0.0), 3.0) * pow(max(temperature, 700.0) / 7200.0, 2.35) * uEmit * 0.34 * modulate;
  energy *= outer * inner * mix(0.82, 1.18, clamp(uDiskH / 0.2, 0.0, 2.0));
  return blackbody(clamp(temperature * g, 800.0, 40000.0)) * energy;
}

bool diskIntersection(vec3 a, vec3 b, float halfH, float rin, float rout, out vec3 hit, out float tHit) {
  float y0 = a.y;
  float dy = b.y - y0;
  if (abs(dy) > 1.0e-6) {
    float tRaw = -y0 / dy;
    if (tRaw >= 0.0 && tRaw <= 1.0) {
      vec3 plane = mix(a, b, tRaw);
      float rho = length(plane.xz);
      if (rho >= rin && rho <= rout && abs(plane.y) <= halfH + 1.0e-4) {
        hit = plane;
        tHit = tRaw;
        return true;
      }
    }
  }

  float t0 = 0.0;
  float t1 = 1.0;
  if (abs(dy) > 1.0e-6) {
    float ta = (-halfH - y0) / dy;
    float tb = (halfH - y0) / dy;
    float enter = min(ta, tb);
    float exitT = max(ta, tb);
    if (exitT < 0.0 || enter > 1.0) return false;
    t0 = clamp(enter, 0.0, 1.0);
    t1 = clamp(exitT, 0.0, 1.0);
  } else if (abs(y0) > halfH) {
    return false;
  }
  if (t1 < t0) return false;

  for (int sampleIndex = 0; sampleIndex < 3; sampleIndex++) {
    float t = mix(t0, t1, float(sampleIndex) * 0.5);
    vec3 p = mix(a, b, t);
    float rho = length(p.xz);
    if (rho >= rin && rho <= rout) {
      hit = p;
      tHit = t;
      return true;
    }
  }
  return false;
}

vec3 starLayer(vec3 dir, float scale, float cutoff) {
  vec3 id = floor(dir * scale);
  vec3 f = fract(dir * scale) - 0.5;
  float h = hash13(id);
  if (h < cutoff) return vec3(0.0);
  vec3 jitter = vec3(hash13(id + 1.7), hash13(id + 2.3), hash13(id + 3.1)) - 0.5;
  float dist = length(f - jitter * 0.28);
  float core = pow(1.0 - smoothstep(0.0, 0.2, dist), 1.45);
  float tint = hash13(id + 5.1);
  vec3 color = mix(vec3(0.62, 0.76, 1.0), vec3(1.0, 0.74, 0.5), tint);
  float mag = mix(0.7, 5.5, pow(hash13(id + 8.4), 3.0));
  return color * core * mag;
}

vec3 starField(vec3 dir) {
  float density = clamp(uStarDensity, 0.0, 1.0);
  if (density <= 0.001) return vec3(0.0);
  vec3 stars = starLayer(dir, mix(14.0, 36.0, density), mix(0.972, 0.62, density));
  stars += starLayer(dir, mix(28.0, 70.0, density), mix(0.99, 0.78, density));
  float haze = fbm(dir.xy * 1.8 + dir.yz * 1.3);
  stars += vec3(0.07, 0.09, 0.13) * haze * density;
  return stars;
}

vec3 milkyWay(vec3 dir) {
  float gain = max(uGalaxy, 0.0);
  if (gain <= 0.001) return vec3(0.0);
  vec3 axis = normalize(vec3(0.62, 0.28, 0.73));
  float lat = dot(dir, axis);
  float band = exp(-pow(lat * 3.1, 2.0));
  float wide = exp(-pow(lat * 1.35, 2.0));
  float clouds = fbm(dir.xy * 2.1 + dir.yz * 1.4);
  float dust = fbm(dir.zx * 4.2 + clouds);
  vec3 cool = vec3(0.48, 0.62, 0.95);
  vec3 warm = vec3(0.78, 0.42, 0.2);
  vec3 color = mix(warm, cool, smoothstep(0.15, 0.8, dust));
  color *= band * (0.4 + 1.15 * clouds);
  color += cool * wide * 0.9;
  return color * gain * 1.35;
}

void main() {
  vec2 ndc = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float tanHalf = tan(radians(uFov) * 0.5);
  vec3 forward = normalize(uCamForward);
  vec3 right = normalize(uCamRight);
  vec3 up = normalize(uCamUp);
  vec3 dir = normalize(forward + ndc.x * tanHalf * aspect * right + ndc.y * tanHalf * up);

  vec3 x = uCamPos;
  vec3 v = dir;
  float h2 = dot(cross(x, v), cross(x, v));
  float rin = max(uDiskInner, 1.2);
  float rout = max(uDiskOuter, rin + 0.5);
  float halfH = max(uDiskH, 0.001);
  float rho0 = length(x.xz);
  bool inside = abs(x.y) <= halfH && rho0 >= rin && rho0 <= rout;

  vec3 radiance = vec3(0.0);
  float thru = 1.0;
  int crossings = 0;
  int steps = 0;
  bool horizon = false;
  bool escaped = false;
  float primaryG = 1.0;
  float minR = length(x);

  for (int i = 0; i < STEP_CAP; i++) {
    if (i >= uMaxSteps) break;
    float r = length(x);
    minR = min(minR, r);
    if (r <= RS * 1.012) {
      horizon = true;
      break;
    }
    if (r > ESCAPE_R && dot(x, v) > 0.0) {
      escaped = true;
      break;
    }

    float dt = affineStep(r, length(v));
    vec3 x0 = x;
    vec3 v0 = v;
    rk4(x, v, h2, dt);
    steps = i + 1;
    if (!(x.x == x.x) || !(v.x == v.x)) {
      horizon = true;
      break;
    }

    vec3 hit;
    float tHit;
    bool overlap = diskIntersection(x0, x, halfH, rin, rout, hit, tHit);
    if (overlap && !inside) {
      inside = true;
      crossings += 1;
      if (crossings <= uMaxCrossings) {
        float g;
        vec3 emit = diskRadiance(hit, mix(v0, v, tHit), g);
        if (crossings == 1) primaryG = g;
        radiance += thru * emit;
        thru *= 0.6;
      }
    } else if (!overlap) {
      inside = false;
    }

    if (length(x) <= RS) {
      horizon = true;
      break;
    }
  }

  if (!horizon && !escaped) {
    if (length(x) < 1.85 * RS) horizon = true;
    else escaped = true;
  }

  vec3 skyDir = normalize(v);
  vec3 stars = vec3(0.0);
  vec3 galaxy = vec3(0.0);
  vec3 diskOnly = radiance;
  if (!horizon) {
    stars = starField(skyDir);
    galaxy = milkyWay(skyDir);
    if (escaped) radiance += thru * (stars + galaxy);
  }
  radiance = min(radiance, vec3(18.0));

  vec3 display = radiance;
  if (uDebug == 1) {
    float heat = clamp(float(steps) / float(max(uMaxSteps, 1)), 0.0, 1.0);
    display = mix(vec3(0.03, 0.05, 0.14), vec3(0.95, 0.78, 0.28), heat);
    if (horizon) display = vec3(0.92, 0.1, 0.07);
    else if (!escaped) display = vec3(0.95, 0.78, 0.12);
  } else if (uDebug == 2) {
    display = vec3(0.0);
    if (horizon) display = vec3(1.0);
    else if (minR < PHOTON_R + 0.38) display = vec3(0.12, 0.86, 0.78);
  } else if (uDebug == 3) {
    if (crossings <= 0) display = vec3(0.025);
    else if (crossings == 1) display = vec3(0.92, 0.22, 0.14);
    else if (crossings == 2) display = vec3(0.12, 0.78, 0.38);
    else if (crossings == 3) display = vec3(0.22, 0.46, 0.96);
    else display = vec3(0.96, 0.88, 0.52);
  } else if (uDebug == 4) {
    if (crossings <= 0) display = vec3(0.04, 0.045, 0.05);
    else {
      float g = clamp(primaryG, 0.0, 2.4);
      vec3 rest = vec3(0.78, 0.74, 0.68);
      display = g < 1.0
        ? mix(vec3(0.62, 0.05, 0.04), rest, g)
        : mix(rest, vec3(0.45, 0.74, 1.0), clamp(g - 1.0, 0.0, 1.0));
    }
  } else if (uDebug == 5) {
    display = horizon ? vec3(0.0) : 0.5 + 0.5 * skyDir;
  } else if (uDebug == 6) {
    vec3 s = stars / (1.0 + stars);
    display = horizon ? vec3(0.0) : pow(max(s, 0.0), vec3(0.4545));
  } else if (uDebug == 7) {
    vec3 gcol = galaxy / (1.0 + galaxy);
    display = horizon ? vec3(0.0) : pow(max(gcol, 0.0), vec3(0.4545));
  } else if (uDebug == 8) {
    vec3 disk = diskOnly / (1.0 + diskOnly);
    display = pow(max(disk, 0.0), vec3(0.4545));
  } else if (uDebug == 9) {
    float y = dot(radiance, vec3(0.2126, 0.7152, 0.0722));
    float t = clamp(log(1.0 + y) / log(25.0), 0.0, 1.0);
    display = mix(vec3(0.02, 0.0, 0.05), vec3(0.95, 0.24, 0.06), smoothstep(0.0, 0.48, t));
    display = mix(display, vec3(1.0, 0.93, 0.78), smoothstep(0.48, 1.0, t));
  }

  gl_FragColor = vec4(display, 1.0);
}
`

export const EXTRACT_FRAG = /* glsl */ `
varying vec2 vUv;
uniform sampler2D uScene;
uniform float uExposure;
uniform float uThreshold;

void main() {
  vec3 color = texture2D(uScene, vUv).rgb * exp2(uExposure);
  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float weight = smoothstep(uThreshold, uThreshold + 0.5, luma);
  gl_FragColor = vec4(color * weight, 1.0);
}
`

export const BLUR_FRAG = /* glsl */ `
varying vec2 vUv;
uniform sampler2D uImage;
uniform vec2 uResolution;
uniform vec2 uDirection;
uniform int uTaps;

void main() {
  vec2 texel = uDirection / max(uResolution, vec2(1.0));
  vec3 acc = vec3(0.0);
  float wsum = 0.0;
  float sigma = 2.15;
  for (int i = 0; i < 13; i++) {
    if (i >= uTaps) break;
    float offset = float(i) - float(uTaps - 1) * 0.5;
    float w = exp(-0.5 * offset * offset / (sigma * sigma));
    acc += texture2D(uImage, vUv + texel * offset).rgb * w;
    wsum += w;
  }
  gl_FragColor = vec4(acc / max(wsum, 1.0e-4), 1.0);
}
`

export const COMPOSITE_FRAG = /* glsl */ `
varying vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform vec2 uResolution;
uniform int uDebug;
uniform float uExposure;
uniform float uBloomStrength;
uniform float uVignette;
uniform float uGrain;
uniform float uAberration;
uniform float uTime;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 acesTonemap(vec3 x) {
  // Stephen Narkowicz fit of the ACES RRT + ODT.
  x = max(x, 0.0);
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 srgbEncode(vec3 color) {
  color = clamp(color, 0.0, 1.0);
  vec3 low = color * 12.92;
  vec3 high = 1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055;
  return mix(low, high, step(vec3(0.0031308), color));
}

vec3 sampleHdr(vec2 uv) {
  vec2 coord = clamp(uv, 0.0, 1.0);
  vec3 scene = texture2D(uScene, coord).rgb * exp2(uExposure);
  vec3 bloom = texture2D(uBloom, coord).rgb * uBloomStrength;
  return scene + bloom;
}

void main() {
  if (uDebug != 0) {
    gl_FragColor = vec4(texture2D(uScene, vUv).rgb, 1.0);
    return;
  }

  vec2 radial = vUv - 0.5;
  vec2 offset = radial * uAberration * 0.02;
  vec3 color = vec3(
    sampleHdr(vUv + offset).r,
    sampleHdr(vUv).g,
    sampleHdr(vUv - offset).b
  );
  color = acesTonemap(color);
  vec2 p = vUv * 2.0 - 1.0;
  float radius = length(p * vec2(0.92, 1.0));
  float vig = 1.0 - smoothstep(0.32, 1.28, radius);
  color *= mix(1.0, vig, clamp(uVignette, 0.0, 1.0));
  color = srgbEncode(color);
  float grain = hash21(gl_FragCoord.xy + vec2(uTime * 13.1, uTime * 7.7)) - 0.5;
  color += grain * uGrain * 0.16;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`
