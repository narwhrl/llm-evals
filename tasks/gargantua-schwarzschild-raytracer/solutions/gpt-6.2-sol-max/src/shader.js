export const vertexShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uFov;
uniform vec3 uCameraPosition;
uniform vec3 uCameraForward;
uniform vec3 uCameraRight;
uniform vec3 uCameraUp;

uniform float uRs;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemperature;
uniform float uDiskEmission;
uniform float uOrbitalSpeed;
uniform float uTurbulence;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;
uniform float uBloomStrength;
uniform float uBloomThreshold;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uDispersion;
uniform float uMaxSteps;
uniform float uDiskSamples;
uniform float uDebug;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const int MAX_STEPS = 220;

struct TraceResult {
  vec3 diskColor;
  vec3 escapedDirection;
  float steps;
  float crossings;
  float captured;
  float escaped;
  float redshift;
  float doppler;
  float curvature;
  float starValue;
  float galaxyValue;
  float critical;
  float impact;
};

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += valueNoise(p) * amplitude;
    p = p * 2.03 + vec2(17.17, -9.31);
    amplitude *= 0.5;
  }
  return value;
}

vec3 blackbody(float temperature) {
  float t = clamp(temperature, 0.0, 1.0);
  vec3 cool = vec3(0.82, 0.045, 0.006);
  vec3 warm = vec3(1.0, 0.27, 0.025);
  vec3 hot = vec3(1.0, 0.92, 0.64);
  return mix(mix(cool, warm, smoothstep(0.0, 0.5, t)), hot, smoothstep(0.45, 1.0, t));
}

vec3 diskEmission(vec3 point, vec3 rayDirection, float crossingIndex, out float localDoppler, out float localRedshift, out float localEnergy) {
  vec2 planePoint = point.xz;
  float radius = length(planePoint);
  float radialIn = smoothstep(uDiskInner - 0.14, uDiskInner + 0.22, radius);
  float radialOut = 1.0 - smoothstep(uDiskOuter - 0.55, uDiskOuter + 0.18, radius);
  float radial = radialIn * radialOut;
  float angle = atan(planePoint.y, planePoint.x);
  float flow = angle * 3.0 + log(max(radius, 1.01)) * 7.0;
  float turbulence = fbm(vec2(flow * 0.72, radius * 0.78) + vec2(uTime * uTurbulenceSpeed * 0.35, -uTime * uTurbulenceSpeed * 0.19));
  turbulence = mix(1.0, 0.52 + turbulence * 1.22, clamp(uTurbulence, 0.0, 1.0));

  vec3 tangent = normalize(vec3(-planePoint.y, 0.0, planePoint.x));
  float orbitalBeta = clamp(uOrbitalSpeed * sqrt(uRs / max(2.0 * radius, 0.01)), 0.025, 0.78);
  float gamma = inversesqrt(max(0.05, 1.0 - orbitalBeta * orbitalBeta));
  localDoppler = 1.0 / (gamma * max(0.08, 1.0 - orbitalBeta * dot(tangent, -rayDirection)));
  localRedshift = sqrt(max(0.035, 1.0 - uRs / max(radius, uRs + 0.02)));
  float spectralShift = clamp(localDoppler * localRedshift, 0.28, 2.2);
  float innerHeat = 1.0 - smoothstep(uDiskInner, uDiskOuter, radius);
  float temperature = clamp(uDiskTemperature * (0.32 + innerHeat * 0.9) * turbulence * spectralShift, 0.0, 1.6);
  vec3 color = blackbody(clamp(temperature * 0.82, 0.0, 1.0));
  float edge = 0.68 + 0.32 * smoothstep(-uDiskThickness, uDiskThickness, abs(point.y));
  float relativisticGain = pow(max(0.1, localDoppler * localRedshift), 3.0);
  float movingRim = 0.82 + 0.18 * sin(angle * 5.0 + uTime * uTurbulenceSpeed);
  localEnergy = radial * turbulence * edge * movingRim * relativisticGain;
  localEnergy *= (0.72 + 0.28 * exp(-radius * 0.13)) * uDiskEmission;
  localEnergy *= 1.0 / (1.0 + 0.35 * crossingIndex);
  return color * localEnergy;
}

vec3 proceduralSky(vec3 direction, out float starValue, out float galaxyValue) {
  vec3 d = normalize(direction);
  float longitude = atan(d.z, d.x);
  float latitude = asin(clamp(d.y, -1.0, 1.0));
  vec2 skyUv = vec2(longitude / TAU + 0.5, latitude / PI + 0.5);
  float cloud = fbm(skyUv * vec2(9.0, 5.0) + vec2(2.0, -3.0));
  float galacticLatitude = latitude + 0.12 * sin(longitude * 2.3) + 0.035 * sin(longitude * 8.0);
  float band = exp(-pow(abs(galacticLatitude) / 0.19, 2.0));
  galaxyValue = band * (0.32 + cloud * 0.88) * uGalaxyBrightness;
  vec3 galaxy = vec3(0.33, 0.11, 0.18) * galaxyValue;
  galaxy += vec3(0.055, 0.15, 0.31) * band * band * (0.38 + cloud * 0.44) * uGalaxyBrightness;

  starValue = 0.0;
  vec3 stars = vec3(0.0);
  for (int layer = 0; layer < 3; layer++) {
    float scale = 42.0 + float(layer) * 68.0;
    vec2 grid = skyUv * scale;
    vec2 cell = floor(grid);
    vec2 local = fract(grid) - 0.5;
    float seed = hash21(cell + vec2(float(layer) * 43.1, float(layer) * 17.7));
    float threshold = 0.992 - uStarDensity * (0.024 - float(layer) * 0.004);
    float star = 1.0 - smoothstep(0.0, 0.06, length(local - vec2(hash11(seed + 1.7) - 0.5, hash11(seed + 4.1) - 0.5) * 0.18));
    star *= step(threshold, seed);
    float hue = hash11(seed + 8.0);
    vec3 starColor = mix(vec3(0.55, 0.72, 1.0), vec3(1.0, 0.55, 0.2), hue);
    stars += starColor * star * (1.0 + float(layer) * 1.8);
    starValue += star * (1.0 + float(layer) * 1.8);
  }
  stars *= (0.48 + 0.82 * uStarDensity);
  vec3 deep = vec3(0.0012, 0.0024, 0.008) + galaxy;
  return deep + stars;
}

// Schwarzschild null-geodesic integration in a stable spatial affine form.
// The state is position plus a unit spatial direction. The curvature term
// uses conserved angular momentum L = r x k, producing d2r/ds2 =
// -3 Rs |L|^2 r / (2 |r|^5). Each step checks the event horizon and disk
// plane, so multiple ordered disk crossings contribute along one bent ray.
TraceResult traceNullGeodesic(vec3 rayOrigin, vec3 rayDirection) {
  TraceResult result;
  result.diskColor = vec3(0.0);
  result.escapedDirection = normalize(rayDirection);
  result.steps = 0.0;
  result.crossings = 0.0;
  result.captured = 0.0;
  result.escaped = 0.0;
  result.redshift = 0.0;
  result.doppler = 0.0;
  result.curvature = 0.0;
  result.starValue = 0.0;
  result.galaxyValue = 0.0;
  result.impact = length(cross(rayOrigin, rayDirection));
  result.critical = exp(-pow((result.impact - 2.60) / 0.11, 2.0));

  vec3 position = rayOrigin;
  vec3 direction = normalize(rayDirection);
  vec3 previous = position;
  float throughput = 1.0;
  float previousRadius = length(position);

  for (int i = 0; i < MAX_STEPS; i++) {
    if (float(i) >= uMaxSteps) {
      break;
    }
    float radius = length(position);
    result.steps = float(i) + 1.0;
    if (radius <= uRs * 1.015) {
      result.captured = 1.0;
      break;
    }
    if (radius > 25.0 && i > 8) {
      result.escaped = 1.0;
      break;
    }

    float adaptiveStep = mix(0.013, 0.088, smoothstep(1.4, 15.0, radius));
    adaptiveStep *= mix(0.72, 1.0, clamp(radius / 8.0, 0.0, 1.0));
    vec3 angularMomentum = cross(position, direction);
    float angularMomentumSquared = dot(angularMomentum, angularMomentum);
    vec3 curvatureAcceleration = -1.5 * uRs * angularMomentumSquared * position / max(pow(radius, 5.0), 0.001);
    result.curvature = max(result.curvature, length(curvatureAcceleration));
    vec3 nextDirection = normalize(direction + curvatureAcceleration * adaptiveStep);
    vec3 nextPosition = position + direction * adaptiveStep;

    float planeCrossed = previous.y * nextPosition.y;
    if (planeCrossed <= 0.0 && abs(previous.y - nextPosition.y) > 0.0001 && result.crossings < uDiskSamples) {
      float hitT = clamp(previous.y / (previous.y - nextPosition.y), 0.0, 1.0);
      vec3 hitPoint = mix(previous, nextPosition, hitT);
      float hitRadius = length(hitPoint.xz);
      if (hitRadius > uDiskInner - uDiskThickness && hitRadius < uDiskOuter + uDiskThickness && abs(hitPoint.y) < uDiskThickness + 0.035) {
        float localDoppler;
        float localRedshift;
        float localEnergy;
        vec3 layer = diskEmission(hitPoint, direction, result.crossings, localDoppler, localRedshift, localEnergy);
        result.diskColor += layer * throughput;
        result.doppler += localDoppler * localEnergy;
        result.redshift += localRedshift * localEnergy;
        result.crossings += 1.0;
        throughput *= 0.58;
      }
    }

    previous = position;
    previousRadius = radius;
    position = nextPosition;
    direction = nextDirection;
  }

  result.escapedDirection = direction;
  vec3 background = proceduralSky(direction, result.starValue, result.galaxyValue);
  if (result.captured > 0.5) {
    background = vec3(0.0);
  }
  result.diskColor *= 1.0 - 0.025 * clamp(previousRadius - uRs, 0.0, 10.0);
  result.diskColor = max(result.diskColor, vec3(0.0));
  return result;
}

vec3 acesToneMap(vec3 color) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((color * (a * color + b)) / (color * (c * color + d) + e), 0.0, 1.0);
}

vec3 debugColor(float mode, TraceResult result, vec3 hdr, vec3 background) {
  if (mode > 0.5 && mode < 1.5) {
    float progress = clamp(result.steps / max(uMaxSteps, 1.0), 0.0, 1.0);
    return vec3(progress, result.escaped, result.captured);
  }
  if (mode > 1.5 && mode < 2.5) {
    return mix(vec3(0.015, 0.02, 0.035), vec3(0.88, 0.025, 0.012), result.captured) + vec3(result.critical * 0.65);
  }
  if (mode > 2.5 && mode < 3.5) {
    return vec3(clamp(result.crossings / 3.0, 0.0, 1.0), result.crossings > 0.5 ? 0.85 : 0.03, result.crossings > 1.5 ? 0.95 : 0.03);
  }
  if (mode > 3.5 && mode < 4.5) {
    float shift = clamp((result.doppler / max(result.redshift, 0.01)) * 0.35, 0.0, 1.0);
    return vec3(shift, clamp(result.redshift * 0.25, 0.0, 1.0), 1.0 - shift);
  }
  if (mode > 4.5 && mode < 5.5) {
    return result.escapedDirection * 0.5 + 0.5;
  }
  if (mode > 5.5 && mode < 6.5) {
    return background * 4.0;
  }
  if (mode > 6.5 && mode < 7.5) {
    return vec3(1.0 - exp(-max(hdr, vec3(0.0)) * 0.18));
  }
  if (mode > 7.5 && mode < 8.5) {
    return vec3(result.critical * 1.8, result.critical * 0.28, result.critical * 0.02);
  }
  return vec3(clamp(result.curvature * 2.2, 0.0, 1.0), clamp(result.steps / max(uMaxSteps, 1.0), 0.0, 1.0), clamp(result.impact / 6.0, 0.0, 1.0));
}

void main() {
  vec2 centered = vUv - 0.5;
  centered.x *= uResolution.x / max(uResolution.y, 1.0);
  float tangentFov = tan(radians(uFov) * 0.5);
  vec3 rayDirection = normalize(uCameraForward + uCameraRight * centered.x * tangentFov * 2.0 + uCameraUp * centered.y * tangentFov * 2.0);
  TraceResult result = traceNullGeodesic(uCameraPosition, rayDirection);
  vec3 background = proceduralSky(result.escapedDirection, result.starValue, result.galaxyValue);

  float diskLuminance = dot(result.diskColor, vec3(0.2126, 0.7152, 0.0722));
  float bloomGate = smoothstep(uBloomThreshold * 0.18, uBloomThreshold * 1.65, diskLuminance);
  float ringHalo = exp(-pow((result.impact - 2.60) / 0.29, 2.0)) * (0.3 + 0.7 * result.critical);
  vec3 ringColor = vec3(1.0, 0.23, 0.035) * ringHalo * (0.14 + 0.32 * uBloomStrength);
  vec3 bloomColor = vec3(1.0, 0.16, 0.018) * bloomGate * uBloomStrength * 0.42;
  vec3 hdr = background + result.diskColor + ringColor + bloomColor;
  if (result.captured > 0.5) {
    hdr = result.diskColor + ringColor + bloomColor;
  }
  hdr *= max(0.05, uExposure);

  vec3 outputColor;
  if (uDebug > 0.5) {
    outputColor = debugColor(uDebug, result, hdr, background);
    outputColor = acesToneMap(max(outputColor, vec3(0.0)));
  } else {
    float edge = clamp(length(centered) * 0.72, 0.0, 1.0);
    hdr *= 1.0 - edge * edge * uVignette;
    float aberration = uDispersion * edge * 0.18;
    hdr.r *= 1.0 + aberration;
    hdr.b *= 1.0 - aberration;
    outputColor = acesToneMap(max(hdr, vec3(0.0)));
    float grain = (hash21(gl_FragCoord.xy + uTime * 17.0) - 0.5) * uGrain;
    outputColor += grain;
  }
  gl_FragColor = vec4(clamp(outputColor, 0.0, 1.0), 1.0);
}
`;
