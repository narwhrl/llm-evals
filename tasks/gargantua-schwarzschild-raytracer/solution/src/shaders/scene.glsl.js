/**
 * The scene fragment shader: one full-screen pass that numerically integrates a Schwarzschild null
 * geodesic per pixel and accumulates every relativistic phenomenon along it.
 *
 * Structure:
 *   cameraRay()          - rebuild the ray from the real camera's world matrix and vertical FOV
 *   traceGeodesic()      - RK4 integration in the Binet variable, ordered disk crossings,
 *                          horizon / escape / step-budget termination, front-to-back compositing
 *   debugRadiance()      - the ten diagnostic views; 0 is the linear HDR scene, 1..9 are
 *                          display-referred diagnostics that the composite pass passes through
 */
import { NOISE_GLSL } from './noise.glsl.js'
import { BLACKBODY_GLSL } from './blackbody.glsl.js'
import { GEODESIC_GLSL } from './geodesic.glsl.js'
import { DISK_GLSL } from './disk.glsl.js'
import { SKY_GLSL } from './sky.glsl.js'

// Hard loop bound; the per-tier budget uMaxSteps is always <= this.
const HARD_MAX_STEPS = 700
const HARD_MAX_CROSSINGS = 8

export const SCENE_VERTEX_GLSL = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

export const SCENE_FRAGMENT_GLSL = /* glsl */ `
precision highp float;
precision highp int;

layout(location = 0) out vec4 fragColor;

uniform mat4 uCameraMatrix;
uniform vec2 uResolution;
uniform float uTanHalfFov;
uniform float uAspect;
uniform float uTime;

uniform int uMaxSteps;
uniform int uMaxCrossings;
uniform float uStepScale;
uniform int uTurbulenceOctaves;
uniform int uSkyOctaves;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemperature;
uniform float uDiskEmission;
uniform float uDiskOpacity;
uniform float uOrbitalSpeed;
uniform float uTurbulenceAmplitude;
uniform float uTurbulenceSpeed;

uniform float uStarDensity;
uniform float uGalaxyBrightness;

uniform int uDebugMode;

${NOISE_GLSL}
${BLACKBODY_GLSL}
${GEODESIC_GLSL}
${DISK_GLSL}
${SKY_GLSL}

const int MAX_STEPS = ${HARD_MAX_STEPS};
const int MAX_CROSSINGS = ${HARD_MAX_CROSSINGS};
const float GRAZING_EPSILON = 1.0e-4;

struct TraceResult {
  vec3 radiance;          // linearly composited scene radiance (HDR)
  vec3 diskRadiance;      // disk-only contribution
  vec3 skyValue;          // background as seen through the lens
  vec3 escapedDirection;  // final ray direction, used by the lens-coordinate view
  vec3 crossingTint;      // per-order crossing colour
  float crossingCount;
  float primaryShift;     // observed / emitted frequency ratio of the first crossing
  float maxAbsLogShift;   // strongest beaming magnitude encountered
  float steps;
  float sweptPhi;
  float impactParameter;
  float minRadius;
  int termination;
};

// ---------------------------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------------------------

void cameraRay(out vec3 origin, out vec3 direction) {
  vec2 ndc = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  origin = (uCameraMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  direction = normalize(
    (uCameraMatrix * vec4(ndc.x * uTanHalfFov * uAspect, ndc.y * uTanHalfFov, -1.0, 0.0)).xyz);
}

// ---------------------------------------------------------------------------------------------
// Disk-plane root finding
// ---------------------------------------------------------------------------------------------

struct StepState {
  float phi;
  float u;
  float du;
};

/** Cubic Hermite reconstruction of the integration state inside one RK4 step. */
StepState hermiteState(float phiA, float uA, float duA, float phiB, float uB, float duB, float t) {
  float d = phiB - phiA;
  float t2 = t * t;
  float t3 = t2 * t;
  float h00 = 2.0 * t3 - 3.0 * t2 + 1.0;
  float h10 = t3 - 2.0 * t2 + t;
  float h01 = -2.0 * t3 + 3.0 * t2;
  float h11 = t3 - t2;
  float dh00 = 6.0 * t2 - 6.0 * t;
  float dh10 = 3.0 * t2 - 4.0 * t + 1.0;
  float dh01 = -6.0 * t2 + 6.0 * t;
  float dh11 = 3.0 * t2 - 2.0 * t;

  StepState s;
  s.phi = phiA + t * d;
  s.u = h00 * uA + h10 * d * duA + h01 * uB + h11 * d * duB;
  s.du = (dh00 * uA + dh10 * d * duA + dh01 * uB + dh11 * d * duB) / max(abs(d), 1e-9);
  return s;
}

/** Height above the disk mid-plane: y(phi) = r(phi) * (A cos phi + B sin phi). */
float planeHeight(float phi, float u, float A, float B) {
  return (A * cos(phi) + B * sin(phi)) / max(u, 1e-12);
}

/** dy/dt at one end of a step, where t is the normalised step parameter. */
float planeHeightSlopeT(float phi, float u, float du, float A, float B, float stepLength) {
  float uu = max(u, 1e-12);
  float c = A * cos(phi) + B * sin(phi);
  float dc = -A * sin(phi) + B * cos(phi);
  return stepLength * (dc / uu - (c * du) / (uu * uu));
}

/** y(t) for the cubic Hermite through (yA, mA) at t=0 and (yB, mB) at t=1. */
float hermiteCubic(float t, float yA, float yB, float mA, float mB) {
  float ca = 2.0 * yA - 2.0 * yB + mA + mB;
  float cb = -3.0 * yA + 3.0 * yB - 2.0 * mA - mB;
  return ((ca * t + cb) * t + mA) * t + yA;
}

/**
 * Mid-plane crossings inside one RK4 step, in increasing t.
 *
 * A sign test on the step endpoints is not sufficient: a ray travelling nearly parallel to the disk
 * plane can dip through the mid-plane and come back within a single step, and the endpoints then
 * have the same sign. Missing those pairs punched a thin dark arc through the disk wherever the
 * step subtended a long chord, so the full cubic is isolated here: the cheap sign test settles the
 * common case, and only when it fails are the cubic's critical points computed and each monotone
 * sub-interval tested.
 */
int findPlaneCrossings(
  float phiA, float uA, float duA,
  float phiB, float uB, float duB,
  float A, float B,
  out float roots[2]) {
  float stepLength = phiB - phiA;
  float yA = planeHeight(phiA, uA, A, B);
  float yB = planeHeight(phiB, uB, A, B);
  float mA = planeHeightSlopeT(phiA, uA, duA, A, B, stepLength);
  float mB = planeHeightSlopeT(phiB, uB, duB, A, B, stepLength);

  float ca = 2.0 * yA - 2.0 * yB + mA + mB;
  float cb = -3.0 * yA + 3.0 * yB - 2.0 * mA - mB;

  int found = 0;

  if (yA * yB < 0.0) {
    // Single crossing: Newton on the cubic, clamped to the step.
    float lo = 0.0;
    float hi = 1.0;
    float t = clamp(yA / (yA - yB), 0.02, 0.98);
    for (int i = 0; i < 6; i++) {
      float y = hermiteCubic(t, yA, yB, mA, mB);
      if (y == 0.0) break;
      if ((y > 0.0) == (yA > 0.0)) lo = t; else hi = t;
      float dy = (3.0 * ca * t + 2.0 * cb) * t + mA;
      float next = abs(dy) > 1e-9 ? t - y / dy : 0.5 * (lo + hi);
      t = clamp(next, lo, hi);
    }
    roots[found++] = t;
    return found;
  }

  // No endpoint sign change: look for an interior dip crossing the plane twice.
  // Critical points solve 3*ca*t^2 + 2*cb*t + mA = 0.
  float qa = 3.0 * ca;
  float qb = 2.0 * cb;
  float qc = mA;
  float brackets[3];
  int bracketCount = 0;
  brackets[bracketCount++] = 0.0;

  if (abs(qa) < 1e-7) {
    if (abs(qb) > 1e-7) {
      float t = -qc / qb;
      if (t > 0.0 && t < 1.0) brackets[bracketCount++] = t;
    }
  } else {
    float disc = qb * qb - 4.0 * qa * qc;
    if (disc > 0.0) {
      float sq = sqrt(disc);
      float t1 = (-qb - sq) / (2.0 * qa);
      float t2 = (-qb + sq) / (2.0 * qa);
      if (t1 > t2) {
        float swap = t1;
        t1 = t2;
        t2 = swap;
      }
      if (t1 > 0.0 && t1 < 1.0) brackets[bracketCount++] = t1;
      if (t2 > 0.0 && t2 < 1.0) brackets[bracketCount++] = t2;
    }
  }
  brackets[bracketCount++] = 1.0;

  for (int i = 0; i + 1 < bracketCount; i++) {
    float ta = brackets[i];
    float tb = brackets[i + 1];
    float ya = hermiteCubic(ta, yA, yB, mA, mB);
    float yb = hermiteCubic(tb, yA, yB, mA, mB);
    if (ya * yb < 0.0) {
      float lo = ta;
      float hi = tb;
      for (int k = 0; k < 10; k++) {
        float mid = 0.5 * (lo + hi);
        float y = hermiteCubic(mid, yA, yB, mA, mB);
        if ((y > 0.0) == (ya > 0.0)) lo = mid; else hi = mid;
      }
      if (found < 2) roots[found++] = 0.5 * (lo + hi);
    }
  }
  return found;
}

// ---------------------------------------------------------------------------------------------
// Geodesic integration
// ---------------------------------------------------------------------------------------------

TraceResult traceGeodesic(vec3 origin, vec3 direction) {
  // Initialised through the struct constructor rather than field by field: every field is then
  // definitely assigned on all paths, which the HLSL backend otherwise cannot prove across the
  // loop's break statements and reports as a "potentially uninitialized variable" warning.
  TraceResult result = TraceResult(
    vec3(0.0),          // radiance
    vec3(0.0),          // diskRadiance
    vec3(0.0),          // skyValue
    direction,          // escapedDirection
    vec3(0.0),          // crossingTint
    0.0,                // crossingCount
    1.0,                // primaryShift
    0.0,                // maxAbsLogShift
    0.0,                // steps
    0.0,                // sweptPhi
    0.0,                // impactParameter
    1.0e9,              // minRadius
    TERM_STEPS);        // termination

  OrbitalPlane plane = buildOrbitalPlane(origin, direction);
  result.impactParameter = plane.b;

  float r0 = length(origin);
  result.minRadius = r0;

  // Exactly radial rays have no orbital plane: they fall straight in or leave straight out.
  if (plane.degenerate) {
    if (dot(direction, plane.e1) < 0.0) {
      result.termination = TERM_HORIZON;
      result.minRadius = R_HORIZON;
    } else {
      result.termination = TERM_ESCAPE;
      result.skyValue = skyRadiance(direction, uStarDensity, uGalaxyBrightness, uSkyOctaves);
      result.radiance = result.skyValue;
    }
    return result;
  }

  float A = dot(plane.e1, DISK_NORMAL);
  float B = dot(plane.e2, DISK_NORMAL);
  bool inPlaneGrazing = (abs(A) + abs(B)) < GRAZING_EPSILON;

  // u'(0) = -dot(direction, e1) / b
  GeodesicState state;
  state.u = 1.0 / r0;
  state.du = -dot(direction, plane.e1) / max(plane.b, 1e-9);

  float phi = 0.0;
  float r = r0;
  float transmittance = 1.0;

  for (int step = 0; step < MAX_STEPS; step++) {
    if (step >= uMaxSteps) {
      result.termination = TERM_STEPS;
      break;
    }
    result.steps = float(step + 1);

    float h = geodesicStepSize(r, state.u, state.du, uStepScale);
    GeodesicState next = rk4Step(state, h);
    float phiNext = phi + h;

    if (next.u >= 1.0 - 1e-6) {
      result.termination = TERM_HORIZON;
      result.minRadius = R_HORIZON;
      result.sweptPhi = phiNext;
      break;
    }

    float rNext = 1.0 / max(next.u, 1e-12);

    if (inPlaneGrazing) {
      // The ray's orbital plane coincides with the disk plane, so y is identically zero and no
      // crossing can be detected. Integrate the slab's emission-absorption volumetrically.
      float rMid = 0.5 * (r + rNext);
      if (rMid >= uDiskInner && rMid <= uDiskOuter) {
        vec3 midPosition = planePosition(plane.e1, plane.e2, phi + 0.5 * h, rMid);
        float tau = DISK_KAPPA * h * 0.5 * (r + rNext);
        DiskSample diskSample = evaluateDisk(midPosition, direction, rMid, tau);
        result.radiance += transmittance * diskSample.source * diskSample.alpha;
        result.diskRadiance += transmittance * diskSample.source * diskSample.alpha;
        transmittance *= (1.0 - clamp(diskSample.alpha, 0.0, 1.0));
        result.crossingCount += 1.0;
      }
    } else {
      float roots[2];
      int crossingCount = findPlaneCrossings(
        phi, state.u, state.du, phiNext, next.u, next.du, A, B, roots);

      for (int crossingIndex = 0; crossingIndex < crossingCount; crossingIndex++) {
        if (result.crossingCount >= float(uMaxCrossings)) break;
        float t = roots[crossingIndex];
        StepState crossing = hermiteState(phi, state.u, state.du, phiNext, next.u, next.du, t);
        float rCross = 1.0 / max(crossing.u, 1e-12);
        vec3 position = planePosition(plane.e1, plane.e2, crossing.phi, rCross);
        float rPrime = -crossing.du / max(crossing.u * crossing.u, 1e-12);
        vec3 tangent = planeTangent(plane.e1, plane.e2, crossing.phi, rCross, rPrime);
        vec3 propagation = normalize(tangent);

        if (rCross >= uDiskInner && rCross <= uDiskOuter) {
          float tau = diskCrossingTau(uDiskThickness, abs(dot(DISK_NORMAL, propagation)));
          DiskSample diskSample = evaluateDisk(position, propagation, rCross, tau);
          vec3 contribution = diskSample.source * diskSample.weight;

          result.radiance += transmittance * contribution;
          result.diskRadiance += transmittance * contribution;
          transmittance *= (1.0 - clamp(diskSample.alpha, 0.0, 1.0));

          int order = int(result.crossingCount);
          result.crossingTint += orderColour(order) * clamp(diskSample.weight, 0.0, 3.0);
          if (order == 0) result.primaryShift = diskSample.shift;
          result.maxAbsLogShift = max(result.maxAbsLogShift, abs(log(max(diskSample.shift, 1e-4))));
          result.crossingCount += 1.0;
        }
      }
    }

    state = next;
    phi = phiNext;
    r = rNext;
    result.minRadius = min(result.minRadius, r);
    result.sweptPhi = phi;

    if (r >= R_ESCAPE && radiusPrimeOf(state) > 0.0) {
      result.termination = TERM_ESCAPE;
      break;
    }
  }

  if (result.termination == TERM_HORIZON) {
    // Nothing escapes the horizon: the shadow is genuinely empty, not merely dark.
    result.radiance = vec3(0.0);
    result.diskRadiance = vec3(0.0);
    return result;
  }

  result.escapedDirection = normalize(planeTangent(plane.e1, plane.e2, phi, r, radiusPrimeOf(state)));
  result.skyValue = skyRadiance(result.escapedDirection, uStarDensity, uGalaxyBrightness, uSkyOctaves);
  if (result.termination == TERM_ESCAPE) {
    result.radiance += transmittance * result.skyValue;
  }
  return result;
}

// ---------------------------------------------------------------------------------------------
// Diagnostic views
// ---------------------------------------------------------------------------------------------

/** Triangular red/green/blue ramp used by the scalar diagnostics. */
vec3 heatRamp(float t) {
  t = clamp(t, 0.0, 1.0);
  return clamp(vec3(
    1.6 - abs(4.0 * t - 3.0),
    1.6 - abs(4.0 * t - 2.0),
    1.6 - abs(4.0 * t - 1.0)), 0.0, 1.0);
}

float graticule(float mid, float period, float width) {
  float f = abs(fract(mid / period + 0.5) - 0.5) * period;
  return smoothstep(width, 0.0, f);
}

vec3 debugRadiance(TraceResult result, int mode) {
  if (mode == 1) {
    // Integration effort and termination class.
    vec3 tint = result.termination == TERM_HORIZON ? vec3(0.25, 0.40, 1.00)
              : result.termination == TERM_ESCAPE  ? vec3(0.15, 1.00, 0.40)
                                                   : vec3(1.00, 0.20, 0.15);
    float ratio = result.steps / max(float(uMaxSteps), 1.0);
    return tint * (0.10 + 0.90 * ratio);
  }

  if (mode == 2) {
    // Event-horizon mask, with the critical curve marked.
    float critical = result.impactParameter / B_CRIT;
    float ring = exp(-pow((critical - 1.0) / 0.035, 2.0));
    float inside = result.termination == TERM_HORIZON ? 1.0 : 0.0;
    return vec3(0.05) + vec3(inside) * vec3(0.85, 0.92, 1.00) + vec3(1.0, 0.42, 0.0) * ring;
  }

  if (mode == 3) {
    // Disk crossings: hue = image order, brightness = number of crossings.
    float count = max(result.crossingCount, 1.0);
    vec3 tint = result.crossingTint / count;
    float presence = step(0.5, result.crossingCount);
    return vec3(0.02, 0.02, 0.05) + tint * presence * (0.30 + 0.70 * min(count / 4.0, 1.0));
  }

  if (mode == 4) {
    // Gravitational redshift and Doppler beaming of the first crossing.
    float octaves = clamp(log(max(result.primaryShift, 1e-4)) / log(2.0), -1.5, 1.5);
    vec3 neutral = vec3(0.80);
    vec3 tint = octaves > 0.0
      ? mix(neutral, vec3(0.15, 0.45, 1.00), clamp(octaves / 1.5, 0.0, 1.0))
      : mix(neutral, vec3(1.00, 0.20, 0.08), clamp(-octaves / 1.5, 0.0, 1.0));
    float energy = clamp(result.maxAbsLogShift / 1.2, 0.0, 1.0);
    return tint * (0.20 + 0.80 * energy);
  }

  if (mode == 5) {
    // Background lens coordinates: the direction the ray actually left through.
    if (result.termination == TERM_HORIZON) return vec3(0.0);
    vec3 d = result.escapedDirection;
    vec3 tint = d * 0.5 + 0.5;
    float theta = acos(clamp(d.y, -1.0, 1.0)) / 3.14159265;
    float phi = atan(d.z, d.x) / 6.28318531 + 0.5;
    float grid = max(graticule(theta, 0.1, 0.006), graticule(phi, 0.1, 0.006));
    return mix(tint * 0.85, vec3(1.0), grid * 0.7);
  }

  if (mode == 6) {
    // Stars and galaxy only, still lensed by the integration.
    vec3 c = result.skyValue;
    return c / (1.0 + c);
  }

  if (mode == 7) {
    // Pre-post HDR: the raw scene radiance with an over-exposure marker.
    vec3 c = result.radiance;
    float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
    vec3 base = c / (1.0 + c);
    float over = smoothstep(1.0, 12.0, luma);
    return mix(base, vec3(1.0, 0.0, 0.75), over * 0.75);
  }

  if (mode == 8) {
    // Total deflection: how far the ray wound around the hole.
    return heatRamp(result.sweptPhi / 12.5663706) * (0.25 + 0.75 * min(result.sweptPhi / 9.0, 1.0));
  }

  if (mode == 9) {
    // Impact parameter relative to the critical curve.
    float critical = result.impactParameter / B_CRIT;
    vec3 tint = heatRamp(critical / 3.0);
    float marker = exp(-pow((critical - 1.0) / 0.02, 2.0));
    return mix(tint, vec3(1.0), marker * 0.85);
  }

  return result.radiance;
}

void main() {
  vec3 origin;
  vec3 direction;
  cameraRay(origin, direction);

  TraceResult result = traceGeodesic(origin, direction);
  fragColor = vec4(debugRadiance(result, uDebugMode), 1.0);
}
`
