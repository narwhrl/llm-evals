export const fullscreenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const geodesicFragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform mat3 uCameraMatrix;
  uniform vec3 uCameraPosition;
  uniform float uTanHalfFov;
  uniform float uAspect;
  uniform float uTime;
  uniform int uMaxSteps;
  uniform int uDebug;

  uniform float uInnerRadius;
  uniform float uOuterRadius;
  uniform float uHalfThickness;
  uniform float uTemperature;
  uniform float uEmission;
  uniform float uOrbitalSpeed;
  uniform float uTurbulence;
  uniform float uTurbulenceSpeed;
  uniform float uStarDensity;
  uniform float uGalaxyBrightness;

  const float RS = 1.0;
  const float PHOTON_SPHERE = 1.5;
  const float ESCAPE_RADIUS = 64.0;
  const int HARD_STEP_LIMIT = 1200;

  struct Trace {
    vec3 radiance;
    float steps;
    float captured;
    float crossings;
    float shift;
    float impact;
    vec3 escapeDirection;
    vec3 stars;
    vec3 galaxy;
  };

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

  float hash31(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash31(i), hash31(i + vec3(1, 0, 0)), f.x),
          mix(hash31(i + vec3(0, 1, 0)), hash31(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash31(i + vec3(0, 0, 1)), hash31(i + vec3(1, 0, 1)), f.x),
          mix(hash31(i + vec3(0, 1, 1)), hash31(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise3(p);
      p = p * 2.03 + vec3(17.1, 9.2, 13.7);
      amplitude *= 0.5;
    }
    return value;
  }

  vec2 directionToFace(vec3 direction) {
    vec3 a = abs(direction);
    if (a.x >= a.y && a.x >= a.z) {
      return direction.x > 0.0
        ? vec2(-direction.z, direction.y) / a.x
        : vec2(direction.z, direction.y) / a.x;
    }
    if (a.y >= a.z) {
      return direction.y > 0.0
        ? vec2(direction.x, -direction.z) / a.y
        : vec2(direction.x, direction.z) / a.y;
    }
    return direction.z > 0.0
      ? vec2(direction.x, direction.y) / a.z
      : vec2(-direction.x, direction.y) / a.z;
  }

  float starLayer(vec3 direction, float scale, float threshold, float size) {
    vec2 face = directionToFace(direction) * 0.5 + 0.5;
    vec2 grid = face * scale;
    vec2 cell = floor(grid);
    vec2 local = fract(grid);
    vec2 center = 0.18 + hash22(cell) * 0.64;
    float random = hash12(cell + 11.7);
    float distanceToStar = length((local - center) * vec2(1.0, 1.0));
    float core = exp(-distanceToStar * distanceToStar / max(size * size, 0.00001));
    float present = step(threshold, random);
    float twinkle = 0.72 + 0.28 * hash12(cell + 4.3);
    return core * present * twinkle;
  }

  vec3 starField(vec3 direction) {
    vec3 color = vec3(0.0);
    float small = starLayer(direction, 360.0, 0.955, 0.032);
    float medium = starLayer(direction, 190.0, 0.972, 0.055);
    float bright = starLayer(direction, 82.0, 0.986, 0.085);
    color += small * vec3(0.52, 0.66, 1.0) * 1.6;
    color += medium * vec3(1.0, 0.82, 0.58) * 2.4;
    color += bright * vec3(0.78, 0.88, 1.0) * 5.0;
    return color * uStarDensity;
  }

  vec3 milkyWay(vec3 direction) {
    vec3 normal = normalize(vec3(0.24, 0.88, -0.41));
    float latitude = dot(direction, normal);
    float band = exp(-latitude * latitude * 21.0);
    float clouds = fbm(direction * 5.2 + vec3(3.1, 7.7, 1.9));
    float filaments = fbm(direction * 18.0 - vec3(8.2, 2.4, 5.1));
    float dust = smoothstep(0.42, 0.72, fbm(direction * 11.0 + 21.0));
    vec3 cold = vec3(0.085, 0.12, 0.23);
    vec3 warm = vec3(0.31, 0.19, 0.12);
    vec3 color = mix(cold, warm, clouds) * band * (0.35 + filaments * 0.9);
    color *= 1.0 - dust * 0.62;
    color += vec3(0.11, 0.13, 0.18) * pow(band, 4.0);
    return color * uGalaxyBrightness;
  }

  vec3 blackbody(float kelvin) {
    float t = max(kelvin, 1000.0) / 100.0;
    float red = t <= 66.0 ? 255.0 : 329.698727446 * pow(t - 60.0, -0.1332047592);
    float green = t <= 66.0
      ? 99.4708025861 * log(t) - 161.1195681661
      : 288.1221695283 * pow(t - 60.0, -0.0755148492);
    float blue = t >= 66.0 ? 255.0 : (t <= 19.0 ? 0.0 : 138.5177312231 * log(t - 10.0) - 305.0447927307);
    return pow(clamp(vec3(red, green, blue) / 255.0, 0.0, 1.0), vec3(2.2));
  }

  // Schwarzschild orbital-plane coordinates, G = M = c = 1 and r_s = 2M = 1.
  // With u = 1/r, every null geodesic satisfies Binet's equation
  // u'' + u = (3/2) r_s u^2, where primes denote d/dphi.
  // The camera ray fixes u(0) and u'(0) through its local static-frame angle.
  // RK4 advances phi adaptively; r <= r_s terminates at the event horizon,
  // while r >= 64 with outward radial motion terminates on the distant sky.
  vec2 geodesicDerivative(vec2 state) {
    return vec2(state.y, -state.x + 1.5 * state.x * state.x);
  }

  vec2 geodesicStep(vec2 state, float step) {
    vec2 k1 = geodesicDerivative(state);
    vec2 k2 = geodesicDerivative(state + k1 * (0.5 * step));
    vec2 k3 = geodesicDerivative(state + k2 * (0.5 * step));
    vec2 k4 = geodesicDerivative(state + k3 * step);
    return state + step * (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
  }

  vec3 diskEmission(vec3 position, vec3 rayDirection, float opticalDepthScale) {
    float radius = length(position.xz);
    float radialGradient = smoothstep(uInnerRadius, uInnerRadius + 0.38, radius)
      * (1.0 - smoothstep(uOuterRadius - 1.4, uOuterRadius, radius));
    float angle = atan(position.z, position.x);
    float omega = 0.72 * pow(max(radius, uInnerRadius), -1.5);
    float advectedAngle = angle - uTime * uTurbulenceSpeed * omega * 6.0;
    float turbulenceNoise = fbm(vec3(cos(advectedAngle), sin(advectedAngle), radius * 0.72) * 3.2);
    float fineNoise = noise3(vec3(cos(advectedAngle * 3.0), sin(advectedAngle * 3.0), radius * 2.4) * 6.0);
    float spiral = 0.5 + 0.5 * sin(angle * 7.0 - radius * 2.3 + turbulenceNoise * 7.0);
    float texture = mix(1.0, 0.42 + turbulenceNoise * 1.15 + spiral * 0.18, uTurbulence);
    texture *= mix(1.0, 0.72 + fineNoise * 0.56, uTurbulence * 0.55);

    vec3 orbitalDirection = normalize(vec3(-position.z, 0.0, position.x));
    float beta = min(0.72, sqrt(0.5 / max(radius, 1.05)) * uOrbitalSpeed);
    vec3 velocity = orbitalDirection * beta;
    float metric = max(1.0 - RS / radius, 0.001);
    float doppler = sqrt(metric) / max(0.18, 1.0 + dot(velocity, rayDirection));
    float observedTemperature = uTemperature * pow(radius / uInnerRadius, -0.68) * pow(doppler, 0.62);
    vec3 color = blackbody(observedTemperature);

    float temperatureFalloff = pow(uInnerRadius / max(radius, uInnerRadius), 1.35);
    float intensity = uEmission * temperatureFalloff * texture * pow(doppler, 3.2);
    float edge = smoothstep(0.0, 0.65, radius - uInnerRadius + 0.2)
      * smoothstep(0.0, 1.0, uOuterRadius - radius + 0.2);
    float opacity = 1.0 - exp(-opticalDepthScale * radialGradient * edge * (0.42 + texture * 0.58));
    return color * intensity * opacity;
  }

  Trace traceRay(vec3 origin, vec3 initialDirection) {
    Trace result;
    result.radiance = vec3(0.0);
    result.steps = 0.0;
    result.captured = 0.0;
    result.crossings = 0.0;
    result.shift = 1.0;
    result.impact = 0.0;
    result.escapeDirection = initialDirection;
    result.stars = vec3(0.0);
    result.galaxy = vec3(0.0);

    float radius = length(origin);
    float metric = max(1.0 - RS / radius, 0.001);
    vec3 radial = normalize(origin);
    vec3 direction = normalize(initialDirection);
    float radialCosine = dot(direction, radial);
    vec3 tangential = direction - radialCosine * radial;
    float sine = length(tangential);
    vec3 orbitTangent = sine > 0.00001 ? tangential / sine : normalize(cross(radial, vec3(0.0, 1.0, 0.0)));
    float impact = radius * sine / sqrt(metric);
    result.impact = impact;

    if (impact < 0.05) {
      // Rays below this impact parameter periapses inside the inner disk and
      // the event horizon. Treating them as radial avoids a singular u'(0).
      result.steps = 1.0;
      result.captured = radialCosine < 0.0 ? 1.0 : 0.0;
      result.escapeDirection = normalize(origin);
      result.stars = starField(result.escapeDirection);
      result.galaxy = milkyWay(result.escapeDirection);
      if (result.captured < 0.5) result.radiance = result.stars + result.galaxy;
      return result;
    }

    // du/dphi = -dr/dphi / r^2. For a locally measured ray,
    // dr/dlambda = E cos(alpha), dphi/dlambda = b f / r^2,
    // and b = r sin(alpha). Therefore u'(0) = -cos(alpha) / b.
    vec2 state = vec2(1.0 / radius, -radialCosine / impact);
    float phi = 0.0;
    float previousY = origin.y;
    bool escaped = false;
    vec3 transmitted = vec3(1.0);

    for (int i = 0; i < HARD_STEP_LIMIT; i++) {
      if (i >= uMaxSteps) break;
      float currentRadius = 1.0 / max(state.x, 0.0001);
      if (currentRadius <= RS * 1.006) {
        result.captured = 1.0;
        break;
      }

      float proximity = clamp((currentRadius - RS) / 3.5, 0.07, 1.0);
      float curvature = clamp(abs(state.y) / max(state.x, 0.05), 0.35, 3.0);
      float step = min(0.075, 0.052 * proximity / curvature);
      vec2 nextState = geodesicStep(state, step);
      float nextPhi = phi + step;
      float nextRadius = 1.0 / max(nextState.x, 0.0001);
      vec3 orbitRadial = cos(nextPhi) * radial + sin(nextPhi) * orbitTangent;
      vec3 nextPosition = orbitRadial * nextRadius;

      if (previousY * nextPosition.y <= 0.0 && abs(nextPosition.y - previousY) > 0.000001) {
        float fraction = previousY / (previousY - nextPosition.y);
        float crossingPhi = phi + step * clamp(fraction, 0.0, 1.0);
        float crossingU = mix(state.x, nextState.x, clamp(fraction, 0.0, 1.0));
        float crossingRadius = 1.0 / max(crossingU, 0.0001);
        vec3 crossingRadial = cos(crossingPhi) * radial + sin(crossingPhi) * orbitTangent;
        vec3 crossing = crossingRadial * crossingRadius;
        float planarRadius = length(crossing.xz);
        if (planarRadius >= uInnerRadius && planarRadius <= uOuterRadius) {
          vec2 crossingState = mix(state, nextState, clamp(fraction, 0.0, 1.0));
          float radialDerivative = -crossingState.y / (crossingU * crossingU);
          vec3 orbitDerivative = -sin(crossingPhi) * radial + cos(crossingPhi) * orbitTangent;
          vec3 crossingDirection = normalize(radialDerivative * crossingRadial + crossingRadius * orbitDerivative);
          float verticalCosine = max(abs(crossingDirection.y), 0.035);
          float opticalDepthScale = uHalfThickness * 7.5 / verticalCosine;
          vec3 emission = diskEmission(crossing, crossingDirection, opticalDepthScale);
          float localMetric = max(1.0 - RS / crossingRadius, 0.001);
          vec3 orbitalDirection = normalize(vec3(-crossing.z, 0.0, crossing.x));
          float beta = min(0.72, sqrt(0.5 / max(crossingRadius, 1.05)) * uOrbitalSpeed);
          float shift = sqrt(localMetric) / max(0.18, 1.0 + dot(orbitalDirection * beta, crossingDirection));
          result.shift = shift;
          result.radiance += transmitted * emission;
          transmitted *= 1.0 - clamp(max(emission.r, max(emission.g, emission.b)) * 0.16, 0.0, 0.94);
          result.crossings += 1.0;
        }
      }

      state = nextState;
      phi = nextPhi;
      previousY = nextPosition.y;
      result.steps = float(i + 1);
      result.escapeDirection = normalize(nextPosition);

      if (nextRadius <= RS * 1.006) {
        result.captured = 1.0;
        break;
      }
      if (nextRadius >= ESCAPE_RADIUS && state.y < 0.0) {
        float radialDerivative = -state.y / (nextState.x * nextState.x);
        vec3 orbitDerivative = -sin(nextPhi) * radial + cos(nextPhi) * orbitTangent;
        result.escapeDirection = normalize(radialDerivative * orbitRadial + nextRadius * orbitDerivative);
        escaped = true;
        break;
      }
    }

    result.stars = starField(result.escapeDirection);
    result.galaxy = milkyWay(result.escapeDirection);
    if (result.captured < 0.5 && escaped) {
      result.radiance += transmitted * (result.stars + result.galaxy);
    }
    return result;
  }

  vec3 aces(vec3 color) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return clamp((color * (a * color + b)) / (color * (c * color + d) + e), 0.0, 1.0);
  }

  vec3 debugColor(Trace trace, vec3 hdr) {
    if (uDebug == 1) {
      float load = trace.steps / float(uMaxSteps);
      return mix(vec3(0.02, 0.08, 0.16), vec3(0.15, 0.85, 1.0), load)
        + vec3(1.0, 0.22, 0.05) * trace.captured;
    }
    if (uDebug == 2) {
      float horizon = trace.captured;
      float rim = exp(-abs(trace.impact - 2.598076) * 7.0);
      return mix(vec3(0.015), vec3(0.92, 0.95, 1.0), horizon) + vec3(1.0, 0.18, 0.02) * rim;
    }
    if (uDebug == 3) {
      if (trace.crossings < 0.5) return vec3(0.008, 0.012, 0.02);
      vec3 orders[4] = vec3[4](
        vec3(1.0, 0.28, 0.04),
        vec3(0.1, 0.85, 1.0),
        vec3(0.72, 0.2, 1.0),
        vec3(0.2, 1.0, 0.42)
      );
      int order = int(clamp(trace.crossings - 1.0, 0.0, 3.0));
      return orders[order] * (0.32 + 0.68 * min(trace.crossings * 0.22, 1.0));
    }
    if (uDebug == 4) {
      float value = log(max(trace.shift, 0.05));
      return 0.5 + 0.5 * vec3(value * 1.4, value * 0.45, -value * 1.1);
    }
    if (uDebug == 5) {
      vec2 face = directionToFace(trace.escapeDirection) * 0.5 + 0.5;
      return vec3(face, 0.22) + trace.galaxy * 0.25;
    }
    if (uDebug == 6) return trace.stars;
    if (uDebug == 7) return trace.galaxy;
    if (uDebug == 8) return log(1.0 + hdr) * 0.32;
    if (uDebug == 9) {
      float critical = trace.impact / 2.598076;
      float ring = exp(-abs(critical - 1.0) * 28.0);
      return vec3(0.04, 0.08, 0.15) + vec3(0.1, 0.7, 1.0) * clamp(critical * 0.23, 0.0, 1.0)
        + vec3(1.0, 0.32, 0.04) * ring;
    }
    return hdr;
  }

  void main() {
    vec2 screen = vUv * 2.0 - 1.0;
    vec3 cameraRay = normalize(vec3(screen.x * uAspect * uTanHalfFov, screen.y * uTanHalfFov, -1.0));
    vec3 worldRay = normalize(uCameraMatrix * cameraRay);
    Trace trace = traceRay(uCameraPosition, worldRay);
    vec3 hdr = debugColor(trace, trace.radiance);
    gl_FragColor = vec4(max(hdr, vec3(0.0)), 1.0);
  }
`;

export const brightFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uThreshold;
  void main() {
    vec3 color = texture2D(uTexture, vUv).rgb;
    float brightness = max(color.r, max(color.g, color.b));
    float soft = smoothstep(uThreshold, uThreshold + 0.65, brightness);
    gl_FragColor = vec4(color * soft, 1.0);
  }
`;

export const blurFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uDirection;
  uniform int uSamples;
  void main() {
    vec3 color = texture2D(uTexture, vUv).rgb * 0.2270270270;
    for (int i = 1; i <= 6; i++) {
      if (i > uSamples / 2) break;
      float offset = float(i) * 1.3846153846;
      float weight = exp(-float(i * i) * 0.28);
      color += texture2D(uTexture, vUv + uDirection * offset).rgb * weight;
      color += texture2D(uTexture, vUv - uDirection * offset).rgb * weight;
    }
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const compositeFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uScene;
  uniform sampler2D uBloom;
  uniform float uBloomStrength;
  uniform float uExposure;
  uniform float uVignette;
  uniform float uGrain;
  uniform float uDispersion;
  uniform float uTime;
  uniform int uDebug;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  vec3 aces(vec3 color) {
    return clamp((color * (2.51 * color + 0.03)) / (color * (2.43 * color + 0.59) + 0.14), 0.0, 1.0);
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float radius = length(centered);
    vec2 dispersionOffset = centered * uDispersion * (0.35 + radius);
    vec3 scene;
    scene.r = texture2D(uScene, vUv + dispersionOffset).r;
    scene.g = texture2D(uScene, vUv).g;
    scene.b = texture2D(uScene, vUv - dispersionOffset).b;
    vec3 bloom = texture2D(uBloom, vUv).rgb;
    vec3 color = scene + bloom * uBloomStrength * (uDebug == 0 ? 1.0 : 0.0);

    if (uDebug == 0) {
      color = aces(color * uExposure);
      float vignette = 1.0 - smoothstep(0.24, 0.86, radius * (0.72 + uVignette * 0.72));
      color *= mix(1.0, vignette, uVignette);
      float grain = hash12(gl_FragCoord.xy + floor(uTime * 24.0) * 17.0) - 0.5;
      color += grain * uGrain * (0.35 + 0.65 * (1.0 - dot(color, vec3(0.333))));
    } else {
      color = aces(color * max(uExposure, 0.65));
    }

    gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
    #include <colorspace_fragment>
  }
`;
