export const fullscreenVertex = `
out vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position, 1.0);
}
`;

export const raytracerFragment = `
precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec3 uCameraPos;
uniform vec3 uCameraTarget;
uniform float uFov;
uniform float uTime;
uniform int uQuality;
uniform int uDebug;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemperature;
uniform float uEmission;
uniform float uOrbitalVelocity;
uniform float uTurbulence;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;
uniform float uBloomStrength;
uniform float uBloomThreshold;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;

in vec2 vUv;
out vec4 outColor;

const float HORIZON = 1.0;
const float PHOTON_SPHERE = 1.5;
const float FAR_LIMIT = 46.0;
const int CINEMATIC_STEPS = 260;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);
  return mix(mix(nx00, nx10, f.y), mix(nx01, nx11, f.y), f.z);
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.52;
  for (int i = 0; i < 4; i++) {
    value += amplitude * valueNoise(p);
    p = p * 2.03 + vec3(17.1, 3.7, 11.8);
    amplitude *= 0.5;
  }
  return value;
}

vec3 cameraRay(vec2 uv) {
  vec3 forward = normalize(uCameraTarget - uCameraPos);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = normalize(cross(right, forward));
  vec2 screen = uv * 2.0 - 1.0;
  float aspect = uResolution.x / uResolution.y;
  screen.x *= aspect;
  float portraitZoom = mix(1.0, 1.95, smoothstep(0.8, 0.35, aspect));
  float focal = tan(radians(uFov) * 0.5) * portraitZoom;
  return normalize(forward + right * screen.x * focal + up * screen.y * focal);
}

vec3 starBackground(vec3 direction) {
  float longitude = atan(direction.z, direction.x);
  float latitude = asin(clamp(direction.y, -1.0, 1.0));
  float band = exp(-pow(abs(direction.y + 0.12 * sin(longitude * 2.7)), 2.0) * 42.0);
  float cloud = fbm(direction * 7.0 + vec3(0.0, uTime * 0.003, 4.0));
  vec3 galaxy = vec3(0.35, 0.11, 0.035) * band * cloud * uGalaxyBrightness;
  galaxy += vec3(0.06, 0.12, 0.28) * band * (1.0 - cloud) * uGalaxyBrightness * 0.55;

  float stars = 0.0;
  vec3 starTint = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    float scale = 18.0 + float(i) * 15.0;
    vec3 cellPos = direction * scale;
    vec3 cell = floor(cellPos);
    vec3 local = fract(cellPos) - 0.5;
    float seed = hash13(cell + vec3(float(i) * 19.37));
    float size = mix(0.018, 0.050, seed);
    float point = exp(-dot(local, local) / (size * size));
    float visibility = step(0.68 - uStarDensity * 0.17, seed);
    float brightness = pow(max(seed, 0.05), 8.0) * 6.5;
    stars += point * visibility * brightness;
    starTint += point * visibility * brightness * mix(vec3(0.55, 0.70, 1.0), vec3(1.0, 0.48, 0.15), seed);
  }
  float horizonFade = smoothstep(-0.8, 0.8, latitude);
  return galaxy + starTint * 0.75 + vec3(0.008, 0.012, 0.022) * (0.5 + horizonFade * 0.5);
}

vec3 diskRadiance(vec3 hit, vec3 rayDirection, float order) {
  float radius = length(hit.xz);
  float radial = clamp((uDiskOuter - radius) / max(uDiskOuter - uDiskInner, 0.1), 0.0, 1.0);
  float edge = smoothstep(uDiskInner, uDiskInner + 0.28, radius) * smoothstep(uDiskOuter, uDiskOuter - 0.55, radius);
  float innerProfile = exp(-pow(max(radius - uDiskInner, 0.0) / 1.25, 1.35));
  float turbulence = fbm(vec3(hit.xz * 1.35 + vec2(uTime * uTurbulenceSpeed * 0.09, -uTime * uTurbulenceSpeed * 0.06), radius * 0.15));
  float ribbons = 0.72 + uTurbulence * (0.55 * turbulence + 0.16 * sin(11.0 * atan(hit.z, hit.x) + radius * 2.3 - uTime * uTurbulenceSpeed));
  float temperature = clamp(uDiskTemperature * mix(0.45, 1.25, pow(radial, 0.42)), 0.1, 2.4);
  vec3 hot = mix(vec3(1.0, 0.18, 0.018), vec3(1.0, 0.86, 0.48), smoothstep(0.25, 1.2, temperature));

  vec3 tangent = normalize(vec3(-hit.z, 0.0, hit.x));
  float orbitalSpeed = clamp(uOrbitalVelocity * sqrt(0.42 / max(radius, 1.1)), 0.02, 0.88);
  float gamma = inversesqrt(max(1.0 - orbitalSpeed * orbitalSpeed, 0.06));
  float lineOfSight = dot(tangent, -rayDirection);
  float doppler = 1.0 / max(gamma * (1.0 - orbitalSpeed * lineOfSight), 0.16);
  float gravitationalRedshift = sqrt(max(1.0 - HORIZON / max(radius, 1.001), 0.02));
  float relativisticBoost = pow(doppler * gravitationalRedshift, 3.0);
  float layer = exp(-order * 0.42);
  float thicknessResponse = mix(0.72, 1.18, clamp(uDiskThickness / 0.7, 0.0, 1.0));
  float brightness = edge * innerProfile * ribbons * uEmission * (0.14 + 0.62 * pow(radial, 0.32)) * relativisticBoost * layer * thicknessResponse;
  return hot * brightness * (0.48 + 0.22 * temperature);
}

// Null geodesic state in Schwarzschild areal-radius coordinates.
// pos and dir are integrated with an affine-like screen distance. The
// curvature term is the stable spatial form d2x/dl2 = -3M L2 x / r5,
// where L = pos x dir. Disk intersections are tested on each curved segment.
vec3 traceSchwarzschild(
  vec3 rayOrigin,
  vec3 rayDirection,
  out float horizonMask,
  out float diskHits,
  out float diskOrder,
  out float closestRadius,
  out float dopplerMetric,
  out float stepMetric,
  out float turnMetric
) {
  vec3 pos = rayOrigin;
  vec3 dir = normalize(rayDirection);
  vec3 diskColor = vec3(0.0);
  float diskAlpha = 0.0;
  horizonMask = 0.0;
  diskHits = 0.0;
  diskOrder = 0.0;
  closestRadius = 100.0;
  dopplerMetric = 0.0;
  turnMetric = 0.0;
  float travelled = 0.0;
  int stepsLimit = uQuality == 0 ? 100 : (uQuality == 1 ? 170 : CINEMATIC_STEPS);

  for (int i = 0; i < CINEMATIC_STEPS; i++) {
    if (i >= stepsLimit) break;
    float radius = length(pos);
    closestRadius = min(closestRadius, radius);
    stepMetric = float(i) / float(stepsLimit);
    if (radius < HORIZON) {
      horizonMask = 1.0;
      break;
    }
    if (radius > FAR_LIMIT && i > 12) break;

    vec3 angularMomentum = cross(pos, dir);
    float angularSquared = dot(angularMomentum, angularMomentum);
    vec3 curvature = -1.5 * angularSquared * pos / max(pow(radius, 5.0), 0.0001);
    float curvatureAmount = length(curvature);
    turnMetric += curvatureAmount * 0.03;
    curvature = curvatureAmount > 3.5 ? curvature * (3.5 / curvatureAmount) : curvature;
    float stepLength = mix(0.034, 0.105, smoothstep(2.0, 30.0, radius));
    vec3 nextDir = normalize(dir + curvature * stepLength);
    vec3 nextPos = pos + nextDir * stepLength;
    travelled += stepLength;

    if (pos.y * nextPos.y <= 0.0 && abs(nextPos.y - pos.y) > 0.0002) {
      float crossing = clamp(pos.y / (pos.y - nextPos.y), 0.0, 1.0);
      vec3 hit = mix(pos, nextPos, crossing);
      float hitRadius = length(hit.xz);
      if (hitRadius > uDiskInner && hitRadius < uDiskOuter && diskHits < 5.0) {
        vec3 emission = diskRadiance(hit, nextDir, diskOrder);
        float contribution = clamp(length(emission) * 0.025, 0.12, 0.85);
        diskColor += emission * (1.0 - diskAlpha);
        diskAlpha += contribution * (1.0 - diskAlpha);
        dopplerMetric = max(dopplerMetric, contribution);
        diskOrder += 1.0;
      }
      diskHits += 1.0;
    }

    pos = nextPos;
    dir = nextDir;
  }

  float escaped = 1.0 - horizonMask;
  vec3 background = starBackground(dir);
  float physicalCritical = exp(-abs(closestRadius - PHOTON_SPHERE) * 24.0) * escaped;
  // The projected critical impact parameter keeps the photon ring legible on
  // narrow, low-resolution mobile viewports while the integrated signal remains
  // the primary contribution on the desktop path.
  float criticalImpact = 2.598076 * 1.04;
  float criticalAngle = asin(clamp(criticalImpact / max(length(uCameraPos), criticalImpact + 0.02), 0.0, 0.98));
  float portraitZoom = mix(1.0, 1.95, smoothstep(0.8, 0.35, uResolution.x / uResolution.y));
  float projectedRing = tan(criticalAngle) / (tan(radians(uFov) * 0.5) * portraitZoom);
  float screenRadius = length((vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0));
  float projectedCritical = exp(-pow((screenRadius - projectedRing) / 0.045, 2.0)) * escaped;
  float critical = max(physicalCritical, projectedCritical * 0.55);
  vec3 photonRing = vec3(1.0, 0.26, 0.035) * critical * (1.8 + 2.6 * clamp(turnMetric, 0.0, 1.0));
  vec3 finalHdr = background * (1.0 - diskAlpha * 0.76) + diskColor + photonRing;
  if (horizonMask > 0.5) finalHdr = vec3(0.0);
  stepMetric = clamp(stepMetric + travelled / 140.0, 0.0, 1.0);
  return finalHdr;
}

vec3 acesToneMap(vec3 color) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((color * (a * color + b)) / (color * (c * color + d) + e), 0.0, 1.0);
}

void main() {
  vec3 rayDirection = cameraRay(vUv);
  float horizonMask;
  float diskHits;
  float diskOrder;
  float closestRadius;
  float dopplerMetric;
  float stepMetric;
  float turnMetric;
  vec3 hdr = traceSchwarzschild(uCameraPos, rayDirection, horizonMask, diskHits, diskOrder, closestRadius, dopplerMetric, stepMetric, turnMetric);
  float preToneLum = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
  float bloom = max(preToneLum - uBloomThreshold, 0.0) * uBloomStrength;
  hdr += hdr * bloom * 0.42;

  vec3 diagnostic = hdr;
  if (uDebug == 1) diagnostic = vec3(stepMetric, 1.0 - stepMetric, turnMetric);
  if (uDebug == 2) diagnostic = mix(vec3(0.018, 0.022, 0.035), vec3(0.95, 0.08, 0.015), horizonMask);
  if (uDebug == 3) diagnostic = vec3(clamp(diskHits / 4.0, 0.0, 1.0), clamp(diskOrder / 4.0, 0.0, 1.0), 0.08);
  if (uDebug == 4) diagnostic = vec3(dopplerMetric, 0.22 + dopplerMetric * 0.6, 1.0 - dopplerMetric);
  if (uDebug == 5) diagnostic = vec3(0.5 + rayDirection * 0.5);
  if (uDebug == 6) diagnostic = starBackground(rayDirection) * 2.0;
  if (uDebug == 7) diagnostic = hdr;
  if (uDebug == 8) diagnostic = vec3(clamp((closestRadius - HORIZON) / 3.0, 0.0, 1.0), clamp(turnMetric, 0.0, 1.0), 0.05);
  if (uDebug == 9) diagnostic = vec3(float(uQuality) / 2.0, fract(uTime * 0.025), clamp(preToneLum * 0.08, 0.0, 1.0));

  vec3 color = uDebug == 0 ? acesToneMap(diagnostic * uExposure) : acesToneMap(diagnostic * max(uExposure, 0.8));
  float vignette = smoothstep(1.25, 0.18, length(vUv * 2.0 - 1.0));
  color *= mix(1.0 - uVignette, 1.0, vignette);
  float grain = (hash21(vUv * uResolution + uTime * 13.0) - 0.5) * uGrain * 0.08;
  color += grain;
  color.r *= 1.0 + uChromatic * (0.5 - vUv.x) * 0.06;
  color.b *= 1.0 + uChromatic * (vUv.x - 0.5) * 0.08;
  color = clamp(color, 0.0, 1.0);
  outColor = vec4(color, 1.0);
}
`;
