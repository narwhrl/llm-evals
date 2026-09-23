precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform vec3 uCameraPos;
uniform mat3 uCameraBasis;
uniform vec2 uResolution;
uniform float uTanHalfFov;
uniform float uAspect;
uniform float uTime;
uniform int uMaxSteps;
uniform int uDiskSamples;
uniform int uDebug;
uniform bool uRgbm;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHeight;
uniform float uDiskTemperature;
uniform float uDiskEmission;
uniform float uOrbitalSpeed;
uniform float uTurbulence;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;

const float PI = 3.141592653589793;
const float HORIZON = 0.505;
const float FAR_FIELD = 82.0;

vec4 packColor(vec3 color) {
  if (!uRgbm) return vec4(color, 1.0);
  float m = ceil(clamp(max(max(color.r, color.g), color.b) / 16.0, 1.0 / 255.0, 1.0) * 255.0) / 255.0;
  return vec4(color / (16.0 * m), m);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x),
             mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise2(p);
    p = mat2(1.7, -1.2, 1.2, 1.7) * p + 7.3;
    a *= 0.5;
  }
  return v;
}

// Schwarzschild in isotropic Cartesian coordinates, M=1:
// ds²= -[(1-a)/(1+a)]² dt² +(1+a)^4 dX², a=1/(2ρ).
// Its optical index is n=(1+a)^3/(1-a). Fermat's equation with Euclidean
// arc length s is X'=v, v'=grad(log n)-v dot(v,grad(log n)).
// Integrating this state traces the spatial projection of a null geodesic.
vec3 opticalAcceleration(vec3 x, vec3 v) {
  float rho = max(length(x), HORIZON);
  float a = 0.5 / rho;
  float dLogN = -(a / rho) * (3.0 / (1.0 + a) + 1.0 / max(1.0 - a, 0.001));
  vec3 grad = (dLogN / rho) * x;
  return grad - v * dot(v, grad);
}

float lapseAt(float rho) {
  float a = 0.5 / max(rho, HORIZON);
  return max((1.0 - a) / (1.0 + a), 0.001);
}

float arealRadius(float rho) {
  float a = 0.5 / max(rho, HORIZON);
  return rho * (1.0 + a) * (1.0 + a);
}

vec2 skyUv(vec3 d) {
  return vec2(atan(d.z, d.x) / (2.0 * PI) + 0.5,
              asin(clamp(d.y, -1.0, 1.0)) / PI + 0.5);
}

vec3 proceduralSky(vec3 d) {
  vec2 uv = skyUv(d);
  vec3 base = vec3(0.002, 0.004, 0.011);
  float lat = dot(d, normalize(vec3(0.32, 0.91, -0.24)));
  float arm = fbm(uv * vec2(15.0, 8.0));
  float dust = fbm(uv * vec2(38.0, 18.0) + 7.1);
  float band = exp(-pow(abs(lat) * 7.0, 1.35));
  vec3 galaxy = mix(vec3(0.018, 0.037, 0.085), vec3(0.12, 0.085, 0.13), arm);
  galaxy *= band * (0.25 + 1.3 * arm) * (1.0 - 0.7 * smoothstep(0.46, 0.7, dust));
  base += galaxy * uGalaxyBrightness;

  vec2 grid = uv * vec2(250.0, 125.0);
  vec2 cell = floor(grid);
  vec2 jitter = vec2(hash21(cell + 13.1), hash21(cell + 29.8));
  float present = step(hash21(cell + 91.7), 0.10 * uStarDensity);
  float point = 1.0 - smoothstep(0.01, 0.18, length(fract(grid) - jitter));
  float magnitude = pow(hash21(cell + 57.3), 7.0);
  float warmth = hash21(cell + 82.6);
  vec3 tint = mix(vec3(0.53, 0.72, 1.0), vec3(1.0, 0.74, 0.48), warmth);
  base += present * point * (0.18 + 3.5 * magnitude) * tint;

  vec2 fineGrid = uv * vec2(590.0, 295.0);
  vec2 fineCell = floor(fineGrid);
  float fine = step(hash21(fineCell + 6.2), 0.018 * uStarDensity);
  vec2 fineJitter = vec2(hash21(fineCell + 31.0), hash21(fineCell + 42.0));
  base += fine * (1.0 - smoothstep(0.0, 0.2, length(fract(fineGrid) - fineJitter))) * vec3(0.45, 0.65, 1.0);
  return base;
}

vec3 thermalPalette(float t) {
  vec3 red = vec3(1.25, 0.12, 0.018);
  vec3 amber = vec3(2.0, 0.65, 0.11);
  vec3 white = vec3(2.3, 1.22, 0.38);
  vec3 c = mix(red, amber, smoothstep(0.28, 0.75, t));
  return mix(c, white, smoothstep(0.8, 1.65, t));
}

vec3 diskRadiance(vec3 x, vec3 backRay, out float doppler, out float gravity) {
  float rho = length(x);
  float R = arealRadius(rho);
  float innerR = arealRadius(uDiskInner);
  vec3 azimuthal = normalize(vec3(-x.z, 0.0, x.x));
  float speed = min(0.84, sqrt(1.0 / max(R - 2.0, 0.25)) * uOrbitalSpeed);
  float gamma = inversesqrt(max(1.0 - speed * speed, 0.01));
  // backRay points observer -> emitter, so the physical emitted photon is -backRay.
  doppler = 1.0 / max(gamma * (1.0 + speed * dot(azimuthal, backRay)), 0.2);
  gravity = lapseAt(rho) / lapseAt(length(uCameraPos));
  float shift = clamp(gravity * doppler, 0.03, 3.0);
  float temperature = uDiskTemperature * pow(innerR / max(R, innerR), 0.75) * shift;
  float angle = atan(x.z, x.x);
  float phase = angle * 7.0 + log(max(R, 1.0)) * 12.0 - uTime * uTurbulenceSpeed * (3.0 / sqrt(max(R, 2.0)));
  float streak = 0.5 + 0.5 * sin(phase + 2.5 * fbm(vec2(angle * 5.0, R * 0.55)));
  float turbulent = fbm(vec2(angle * 8.0 + uTime * 0.18 * uTurbulenceSpeed, R * 1.15));
  float structure = mix(1.0, 0.4 + 1.3 * streak + 0.8 * turbulent, uTurbulence);
  float radial = pow(innerR / max(R, innerR), 2.2);
  return thermalPalette(temperature) * (0.76 * uDiskEmission * radial * pow(shift, 3.0) * structure);
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 position = uCameraPos;
  vec3 direction = normalize(uCameraBasis * vec3(ndc.x * uAspect * uTanHalfFov,
                                                   ndc.y * uTanHalfFov, -1.0));
  float transmittance = 1.0;
  vec3 light = vec3(0.0);
  float lastDiskRadius = 0.0;
  float lastDoppler = 1.0;
  float lastGravity = 1.0;
  int crossings = 0;
  bool insideDisk = false;
  bool captured = false;
  bool escaped = false;
  int usedSteps = 0;

  // Fixed compile-time cap; quality uniforms terminate earlier. The horizon,
  // far field, and step budget are distinct terminal states for diagnostics.
  for (int step = 0; step < 384; step++) {
    if (step >= uMaxSteps) break;
    usedSteps = step + 1;
    float rho = length(position);
    if (rho <= HORIZON) { captured = true; break; }
    if (rho >= FAR_FIELD && dot(position, direction) > 0.0) { escaped = true; break; }

    float ds = clamp(0.058 * rho, 0.045, 1.8);
    if (rho < 2.8) ds = min(ds, 0.12);
    vec3 acceleration = opticalAcceleration(position, direction);
    vec3 midDirection = normalize(direction + 0.5 * ds * acceleration);
    vec3 midPosition = position + 0.5 * ds * direction;
    vec3 nextDirection = normalize(direction + ds * opticalAcceleration(midPosition, midDirection));
    vec3 nextPosition = position + ds * midDirection;

    // Intersect this curved-path segment with the slab before sampling, so
    // even Standard quality does not skip a thin disk between step midpoints.
    float slabStart = 0.0;
    float slabEnd = 1.0;
    float dy = nextPosition.y - position.y;
    if (abs(dy) > 0.000001) {
      float t0 = (-uDiskHeight - position.y) / dy;
      float t1 = (uDiskHeight - position.y) / dy;
      slabStart = max(0.0, min(t0, t1));
      slabEnd = min(1.0, max(t0, t1));
    } else if (abs(position.y) > uDiskHeight) {
      slabStart = 1.0;
      slabEnd = 0.0;
    }
    bool sampledDisk = false;
    for (int sub = 0; sub < 3; sub++) {
      if (sub >= uDiskSamples) break;
      if (slabEnd <= slabStart) break;
      float fraction = mix(slabStart, slabEnd, (float(sub) + 0.5) / float(uDiskSamples));
      vec3 samplePosition = mix(position, nextPosition, fraction);
      float cylindricalRadius = length(samplePosition.xz);
      bool inVolume = cylindricalRadius >= uDiskInner && cylindricalRadius <= uDiskOuter
                   && abs(samplePosition.y) <= uDiskHeight;
      if (inVolume) {
        if (!insideDisk) crossings++;
        insideDisk = true;
        sampledDisk = true;
        float innerFade = smoothstep(uDiskInner, uDiskInner + 0.45, cylindricalRadius);
        float outerFade = 1.0 - smoothstep(uDiskOuter - 0.9, uDiskOuter, cylindricalRadius);
        float vertical = exp(-2.0 * pow(samplePosition.y / uDiskHeight, 2.0));
        float opticalDepth = 0.35 * (ds * (slabEnd - slabStart) / float(uDiskSamples)) / max(2.0 * uDiskHeight, 0.08)
                           * innerFade * outerFade * vertical;
        float alpha = 1.0 - exp(-opticalDepth);
        float doppler, gravity;
        vec3 emission = diskRadiance(samplePosition, normalize(mix(direction, nextDirection, fraction)), doppler, gravity);
        light += transmittance * alpha * emission;
        transmittance *= (1.0 - alpha);
        lastDiskRadius = cylindricalRadius;
        lastDoppler = doppler;
        lastGravity = gravity;
      }
    }
    float nextCylindricalRadius = length(nextPosition.xz);
    insideDisk = sampledDisk && abs(nextPosition.y) <= uDiskHeight
              && nextCylindricalRadius >= uDiskInner && nextCylindricalRadius <= uDiskOuter;

    position = nextPosition;
    direction = nextDirection;
  }

  vec3 sky = escaped ? proceduralSky(direction) : vec3(0.0);
  vec3 hdr = light + transmittance * sky;
  if (uDebug == 0) { outColor = packColor(hdr); return; }
  vec3 debugColor = vec3(0.0);
  if (uDebug == 1) {
    vec3 terminal = captured ? vec3(1.0, 0.14, 0.1) : escaped ? vec3(0.1, 0.8, 0.9) : vec3(1.0, 0.75, 0.1);
    debugColor = terminal * (0.25 + 0.75 * float(usedSteps) / float(uMaxSteps));
  } else if (uDebug == 2) {
    debugColor = captured ? vec3(1.0) : vec3(0.0);
  } else if (uDebug == 3) {
    debugColor = crossings == 0 ? vec3(0.0) : crossings == 1 ? vec3(1.0, 0.36, 0.04)
               : crossings == 2 ? vec3(0.08, 0.86, 1.0) : vec3(0.94, 0.18, 0.75);
  } else if (uDebug == 4) {
    float t = clamp((lastDiskRadius - uDiskInner) / (uDiskOuter - uDiskInner), 0.0, 1.0);
    debugColor = crossings == 0 ? vec3(0.0) : mix(vec3(1.0, 0.18, 0.02), vec3(0.12, 0.32, 1.0), t);
  } else if (uDebug == 5) {
    debugColor = crossings == 0 ? vec3(0.0) : mix(vec3(0.12, 0.22, 1.0), vec3(1.0, 0.25, 0.08), clamp((lastDoppler - 0.6) / 1.1, 0.0, 1.0));
  } else if (uDebug == 6) {
    debugColor = crossings == 0 ? vec3(0.0) : vec3(lastGravity, lastGravity * lastGravity, 1.0 - lastGravity);
  } else if (uDebug == 7) {
    debugColor = escaped ? vec3(skyUv(direction), 0.4) : vec3(0.0);
  } else if (uDebug == 8) {
    debugColor = min(sky * 1.8, vec3(1.0));
  } else if (uDebug == 9) {
    float energy = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
    float level = clamp(log2(1.0 + energy) / 4.0, 0.0, 1.0);
    debugColor = mix(vec3(0.02, 0.03, 0.18), vec3(0.1, 0.9, 0.7), smoothstep(0.0, 0.5, level));
    debugColor = mix(debugColor, vec3(1.0, 0.85, 0.16), smoothstep(0.48, 0.82, level));
    debugColor = mix(debugColor, vec3(1.0, 0.15, 0.12), smoothstep(0.82, 1.0, level));
  }
  outColor = packColor(debugColor);
}
