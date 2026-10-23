/*
 * GARGANTUA — numerical Schwarzschild ray tracer
 *
 * Geometrized units: G = c = 1 and r_s = 2M = 1. The observer's local
 * static-frame direction is converted to a coordinate direction. In the
 * orbital plane, Schwarzschild null geodesics obey
 *
 *     d²u/dφ² + u = (3/2) r_s u²,     u = 1/r.
 *
 * Its equivalent Cartesian form, with h = |x × v| conserved, is
 *
 *     dv/dλ = -(3/2) r_s h² x / |x|⁵,  dx/dλ = v.
 *
 * We integrate that state per pixel with adaptive RK4. No lens texture,
 * sphere SDF, disk mesh, or analytic screen-space bend is used.
 */

uniform vec2 uResolution;
uniform float uTime;
uniform float uAspect;
uniform float uTanHalfFov;
uniform vec3 uCameraPos;
uniform vec3 uCameraForward;
uniform vec3 uCameraRight;
uniform vec3 uCameraUp;
uniform int uMaxSteps;
uniform int uMaxDiskHits;
uniform int uDebug;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThickness;
uniform float uDiskTemperature;
uniform float uDiskEmission;
uniform float uOrbitalSpeed;
uniform float uTurbulenceAmount;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;

varying vec2 vUv;

#define PI 3.141592653589793
#define TAU 6.283185307179586
#define MAX_INTEGRATION_STEPS 224

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i), hash13(i + vec3(1, 0, 0)), f.x),
        mix(hash13(i + vec3(0, 1, 0)), hash13(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash13(i + vec3(0, 0, 1)), hash13(i + vec3(1, 0, 1)), f.x),
        mix(hash13(i + vec3(0, 1, 1)), hash13(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}

float fbm3(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 4; octave++) {
    value += amplitude * noise3(p);
    p = p * 2.03 + vec3(7.1, 3.7, 5.9);
    amplitude *= 0.5;
  }
  return value;
}

vec3 heatMap(float t) {
  t = clamp(t, 0.0, 1.0);
  return clamp(vec3(1.5 - abs(4.0 * t - 3.0),
                    1.5 - abs(4.0 * t - 2.0),
                    1.5 - abs(4.0 * t - 1.0)), 0.0, 1.0);
}

vec2 celestialUv(vec3 direction) {
  return vec2(atan(direction.z, direction.x) / TAU + 0.5,
              asin(clamp(direction.y, -1.0, 1.0)) / PI + 0.5);
}

vec3 starLayer(vec2 uv, vec2 scale, float seed, float population) {
  vec2 coordinates = uv * scale;
  vec2 cell = floor(coordinates);
  vec2 randomPosition = 0.12 + 0.76 * hash22(cell + seed);
  float randomValue = hash12(cell + seed * 3.17);
  float exists = step(1.0 - population * uStarDensity, randomValue);
  vec2 delta = fract(coordinates) - randomPosition;
  float footprint = max(length(fwidth(coordinates)), 0.0001);
  float radius = mix(0.022, 0.046, hash12(cell + 19.7));
  float distanceSquared = dot(delta, delta);
  float core = exp(-distanceSquared / max(radius * radius, 0.00001));
  float halo = 0.055 * exp(-distanceSquared / max(radius * radius * 7.0, 0.00001));
  float energy = mix(0.45, 2.7, pow(hash12(cell + 41.3), 5.0));
  energy /= 1.0 + footprint * 1.5;
  float colorIndex = hash12(cell + 83.1);
  vec3 warm = vec3(1.0, 0.69, 0.43);
  vec3 cool = vec3(0.55, 0.73, 1.0);
  vec3 starColor = mix(warm, cool, smoothstep(0.25, 0.9, colorIndex));
  starColor = mix(starColor, vec3(1.0), 0.48);
  return starColor * energy * (core + halo) * exists;
}

vec3 proceduralStars(vec3 direction) {
  vec2 uv = celestialUv(direction);
  vec3 stars = starLayer(uv, vec2(280, 140), 1.7, 0.34);
  stars += starLayer(uv, vec2(690, 345), 8.3, 0.25) * 0.7;
  stars += starLayer(uv, vec2(1440, 720), 17.1, 0.19) * 0.38;
  return stars;
}

vec3 proceduralGalaxy(vec3 direction) {
  vec3 galacticNormal = normalize(vec3(0.38, 0.92, 0.0));
  vec3 galacticCore = normalize(vec3(0.92, -0.38, -0.2));
  float latitude = abs(dot(direction, galacticNormal));
  float band = exp(-latitude * latitude * 95.0);
  float wideBand = exp(-latitude * latitude * 19.0);
  float cloud = fbm3(direction * 6.5 + vec3(2.7, 8.1, 1.4));
  float filament = fbm3(direction * 19.0 + vec3(11.0, 3.0, 7.0));
  float dustField = fbm3(direction * 10.0 + vec3(5.0, 17.0, 2.0));
  float dust = smoothstep(0.38, 0.64, dustField) * band;
  float core = pow(max(dot(direction, galacticCore), 0.0), 7.0);
  float structure = band * (0.12 + 1.25 * cloud * cloud) * (0.15 + 1.6 * filament);
  structure *= 1.0 - dust * 0.92;
  structure += wideBand * 0.012 * cloud;
  structure += core * band * (0.08 + 0.22 * cloud);
  vec3 blue = vec3(0.19, 0.29, 0.58);
  vec3 ivory = vec3(0.88, 0.67, 0.42);
  vec3 color = mix(blue, ivory, clamp(core * 1.8 + cloud * 0.45, 0.0, 1.0));
  return color * structure * uGalaxyBrightness * 0.48;
}

vec3 backgroundRadiance(vec3 direction) {
  vec3 base = vec3(0.0008, 0.0013, 0.0032);
  return base + proceduralGalaxy(direction) + proceduralStars(direction);
}

// Approximate Planckian radiator, returned in linear light. Input is Kelvin.
vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1200.0, 32000.0) / 100.0;
  vec3 color;
  color.r = t <= 66.0 ? 1.0 : 1.292936 * pow(max(t - 60.0, 1.0), -0.1332047);
  color.g = t <= 66.0 ? 0.3900816 * log(max(t, 1.0)) - 0.6318414
                      : 1.1298909 * pow(max(t - 60.0, 1.0), -0.0755148);
  color.b = t >= 66.0 ? 1.0 : (t <= 19.0 ? 0.0 : 0.5432068 * log(max(t - 10.0, 1.0)) - 1.1962541);
  color = clamp(color, 0.0, 1.0);
  return pow(color, vec3(2.2));
}

struct DiskSample {
  vec3 source;
  float alpha;
  float shift;
};

DiskSample sampleDisk(vec3 hit, vec3 rayDirection, float pathLength) {
  float radius = max(length(hit.xz), 1.001);
  float phi = atan(hit.z, hit.x);
  float orbitalOmega = sqrt(0.5 / (radius * radius * radius));
  float advection = -uTime * orbitalOmega * 2.4 * uTurbulenceSpeed;
  float cs = cos(advection);
  float sn = sin(advection);
  vec2 advected = mat2(cs, -sn, sn, cs) * hit.xz;
  vec3 noisePosition = vec3(advected * 1.42, log(radius) * 6.2 - uTime * 0.055 * uTurbulenceSpeed);
  float turbulence = fbm3(noisePosition);
  float spiral = 0.5 + 0.5 * sin(phi * 3.0 - log(radius) * 18.0
                                  + uTime * uTurbulenceSpeed * 0.24 + turbulence * 4.6);
  float fineFilament = noise3(vec3(advected * 3.1, log(radius) * 11.0 - uTime * 0.08 * uTurbulenceSpeed));
  float density = max(0.055, 1.0 + uTurbulenceAmount *
                    ((turbulence - 0.48) * 2.15 + (spiral - 0.5) * 0.42));
  float innerEdge = smoothstep(uDiskInner, uDiskInner + 0.22, radius);
  float outerEdge = 1.0 - smoothstep(uDiskOuter - 1.25, uDiskOuter, radius);
  float radialProfile = pow(uDiskInner / radius, 0.82) * innerEdge * outerEdge;
  float vertical = 0.35 + 0.65 * max(0.0, 1.0 - pow(hit.y / max(uDiskHalfThickness, 0.001), 2.0));

  // Circular-orbit velocity measured in the local static frame.
  float beta = min(0.92, uOrbitalSpeed * sqrt(0.5 / max(radius - 1.0, 0.5)));
  vec3 tangent = vec3(-hit.z, 0.0, hit.x) / radius;
  vec3 towardObserver = -normalize(rayDirection);
  float lineOfSightVelocity = beta * dot(tangent, towardObserver);
  float specialRelativistic = sqrt(max(1.0 - beta * beta, 0.01)) /
                               max(1.0 - lineOfSightVelocity, 0.08);
  float gravitational = sqrt(max(1.0 - 1.0 / radius, 0.001));
  float shift = clamp(gravitational * specialRelativistic, 0.08, 3.5);

  // I_nu/nu^3 invariance supplies beaming; frequency shift also moves temperature.
  float beaming = pow(shift, 3.0);
  float temperature = 9500.0 * uDiskTemperature * pow(radius / uDiskInner, -0.75);
  vec3 emissionColor = blackbody(temperature * shift);
  float opticalDepth = pathLength * density * vertical * radialProfile * 3.1;

  DiskSample result;
  result.alpha = 1.0 - exp(-max(opticalDepth, 0.0));
  float filamentBrightness = mix(1.0, 0.55 + 1.0 * spiral * (0.6 + 0.6 * fineFilament), clamp(uTurbulenceAmount, 0.0, 1.0));
  result.source = emissionColor * uDiskEmission * radialProfile * beaming * (0.58 + density * 0.62) * filamentBrightness;
  result.shift = shift;
  return result;
}

vec3 geodesicAcceleration(vec3 position, float hSquared) {
  float radiusSquared = max(dot(position, position), 0.0001);
  float inverseRadius = inversesqrt(radiusSquared);
  float inverseRadius2 = inverseRadius * inverseRadius;
  float inverseRadius5 = inverseRadius2 * inverseRadius2 * inverseRadius;
  return -1.5 * hSquared * position * inverseRadius5;
}

void rk4GeodesicStep(inout vec3 position, inout vec3 velocity, float hSquared, float stepSize) {
  vec3 k1p = velocity;
  vec3 k1v = geodesicAcceleration(position, hSquared);
  vec3 k2p = velocity + 0.5 * stepSize * k1v;
  vec3 k2v = geodesicAcceleration(position + 0.5 * stepSize * k1p, hSquared);
  vec3 k3p = velocity + 0.5 * stepSize * k2v;
  vec3 k3v = geodesicAcceleration(position + 0.5 * stepSize * k2p, hSquared);
  vec3 k4p = velocity + stepSize * k3v;
  vec3 k4v = geodesicAcceleration(position + stepSize * k3p, hSquared);
  position += stepSize * (k1p + 2.0 * k2p + 2.0 * k3p + k4p) / 6.0;
  velocity += stepSize * (k1v + 2.0 * k2v + 2.0 * k3v + k4v) / 6.0;
}

// Clip a curved-path integration segment to the finite equatorial slab.
bool diskSlabSegment(vec3 start, vec3 end, out vec3 hit, out float pathLength) {
  vec3 delta = end - start;
  float enter = 0.0;
  float leave = 1.0;
  if (abs(delta.y) < 0.000001) {
    if (abs(start.y) > uDiskHalfThickness) return false;
  } else {
    float a = (-uDiskHalfThickness - start.y) / delta.y;
    float b = ( uDiskHalfThickness - start.y) / delta.y;
    enter = max(0.0, min(a, b));
    leave = min(1.0, max(a, b));
  }
  if (leave <= enter) return false;
  hit = mix(start, end, (enter + leave) * 0.5);
  pathLength = length(delta) * (leave - enter);
  return true;
}

vec3 orderColor(int order) {
  if (order == 1) return vec3(1.0, 0.38, 0.06);
  if (order == 2) return vec3(0.04, 0.72, 1.0);
  if (order == 3) return vec3(0.62, 0.2, 1.0);
  return vec3(0.85, 0.95, 1.0);
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 localDirection = normalize(uCameraForward
                        + uCameraRight * ndc.x * uTanHalfFov * uAspect
                        + uCameraUp * ndc.y * uTanHalfFov);
  float cameraRadius = length(uCameraPos);
  vec3 radialBasis = uCameraPos / cameraRadius;
  float metric = 1.0 - 1.0 / cameraRadius;

  // Local static-observer direction -> Schwarzschild coordinate direction.
  float radialComponent = dot(localDirection, radialBasis);
  vec3 velocity = normalize(localDirection + (sqrt(metric) - 1.0) * radialComponent * radialBasis);
  vec3 position = uCameraPos;
  vec3 initialDirection = velocity;
  vec3 angularMomentum = cross(position, velocity);
  float hSquared = dot(angularMomentum, angularMomentum);
  float escapeRadius = max(26.0, cameraRadius * 1.4);

  vec3 radiance = vec3(0.0);
  vec3 diskOrderRadiance = vec3(0.0);
  float transmittance = 1.0;
  float minimumRadius = cameraRadius;
  float firstShift = 0.0;
  int diskHits = 0;
  int stepsTaken = 0;
  bool insideDisk = false;
  bool captured = false;
  bool escaped = false;

  for (int step = 0; step < MAX_INTEGRATION_STEPS; step++) {
    if (step >= uMaxSteps) break;
    float radius = length(position);
    minimumRadius = min(minimumRadius, radius);
    if (radius <= 1.002) {
      captured = true;
      stepsTaken = step;
      break;
    }

    // Reduce affine step near r_s and the unstable photon sphere at r = 1.5 r_s.
    float stepSize = clamp(0.065 * max(radius - 0.85, 0.1), 0.022, 0.42);
    vec3 previousPosition = position;
    vec3 previousVelocity = velocity;
    rk4GeodesicStep(position, velocity, hSquared, stepSize);
    stepsTaken = step + 1;

    vec3 hit;
    float slabPathLength;
    bool insideNow = false;
    if (diskSlabSegment(previousPosition, position, hit, slabPathLength)) {
      float diskRadius = length(hit.xz);
      if (diskRadius >= uDiskInner && diskRadius <= uDiskOuter && (diskHits < uMaxDiskHits || insideDisk)) {
        insideNow = true;
        if (!insideDisk) diskHits++;
        DiskSample diskSample = sampleDisk(hit, previousVelocity, slabPathLength);
        float absorbed = transmittance * diskSample.alpha;
        radiance += transmittance * diskSample.source * diskSample.alpha;
        diskOrderRadiance += absorbed * orderColor(diskHits) * 1.8;
        if (diskHits == 1 && firstShift == 0.0) firstShift = diskSample.shift;
        transmittance *= 1.0 - diskSample.alpha;
      }
    }
    insideDisk = insideNow;

    radius = length(position);
    minimumRadius = min(minimumRadius, radius);
    if (radius > escapeRadius && dot(position, velocity) > 0.0 && step > 3) {
      escaped = true;
      break;
    }
  }

  bool exhausted = !captured && !escaped;
  vec3 escapedDirection = normalize(velocity);
  vec3 sky = vec3(0.0);
  vec3 stars = vec3(0.0);
  vec3 galaxy = vec3(0.0);
  if (!captured) {
    if (uDebug == 6) {
      stars = proceduralStars(escapedDirection);
    } else if (uDebug == 7) {
      galaxy = proceduralGalaxy(escapedDirection);
    } else {
      sky = backgroundRadiance(escapedDirection);
    }
  }

  if (uDebug == 0 || uDebug == 8) {
    radiance += transmittance * sky;
  } else if (uDebug == 6) {
    radiance = stars;
  } else if (uDebug == 7) {
    radiance = galaxy;
  }

  if (uDebug == 1) {
    vec3 heat = heatMap(float(stepsTaken) / float(max(uMaxSteps, 1)));
    radiance = captured ? heat * vec3(1.0, 0.12, 0.035)
                        : (exhausted ? vec3(0.8, 0.05, 0.75) * (0.25 + float(stepsTaken) / float(max(uMaxSteps, 1))) : heat);
  } else if (uDebug == 2) {
    radiance = captured ? vec3(0.0) : (exhausted ? vec3(0.2, 0.03, 0.24) : vec3(0.72, 0.84, 1.0));
  } else if (uDebug == 3) {
    radiance = diskOrderRadiance + vec3(0.001, 0.002, 0.004);
  } else if (uDebug == 4) {
    if (firstShift > 0.0) {
      float red = 1.0 - smoothstep(0.25, 1.0, firstShift);
      float blue = smoothstep(1.0, 2.2, firstShift);
      radiance = vec3(red, 0.12 + 0.35 * clamp(1.0 - abs(firstShift - 1.0), 0.0, 1.0), blue) * 1.3;
    } else {
      radiance = vec3(0.001);
    }
  } else if (uDebug == 5) {
    if (captured) {
      radiance = vec3(0.0);
    } else {
      vec2 uv = celestialUv(escapedDirection);
      vec2 grid = abs(fract(uv * vec2(24.0, 12.0)) - 0.5);
      float lines = smoothstep(0.465, 0.495, max(grid.x, grid.y));
      radiance = vec3(uv.x, uv.y, 0.72) * 0.38 + lines * vec3(0.18, 0.28, 0.34);
    }
  } else if (uDebug == 9) {
    float bending = acos(clamp(dot(initialDirection, escapedDirection), -1.0, 1.0));
    vec3 heat = heatMap(clamp(bending / PI, 0.0, 1.0));
    float photonOrbitContour = exp(-abs(minimumRadius - 1.5) * 32.0);
    radiance = heat * (captured ? 0.22 : 0.8) + photonOrbitContour * vec3(0.1, 0.8, 0.48);
  }

  gl_FragColor = vec4(max(radiance, vec3(0.0)), 1.0);
}
