// Full-screen Schwarzschild raytracer fragment shader.
//
// Every visible phenomenon (event horizon shadow, photon ring, lensed
// accretion disk with multiple crossings, Doppler beaming / gravitational
// redshift, lensed procedural starfield and galaxy) is produced per pixel by
// numerically integrating a null geodesic of the Schwarzschild metric.
import { COMMON_GLSL } from './common.glsl';

export const RAYTRACE_FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

// camera (world/BH frame, lengths in Schwarzschild radii r_s)
uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamFwd;
uniform float uTanHalfFov;   // tan(fov_v / 2)
uniform float uAspect;       // width / height
uniform float uTime;         // simulation time (s); frozen in capture mode
uniform int   uMaxSteps;     // quality budget: max RK4 steps per ray
uniform float uStepScale;    // quality budget: geodesic step length scale
uniform int   uDebug;        // 0 final image, 1..9 diagnostics

// accretion disk
uniform float uDiskInner;    // inner radius (r_s units; ISCO = 3, photon sphere = 1.5)
uniform float uDiskOuter;    // outer radius
uniform float uDiskThickness;// half-thickness: slab chord / opacity gain
uniform float uDiskTemp;     // temperature scale (color ramp shift)
uniform float uDiskIntensity;// emission gain
uniform float uOrbitSpeed;   // Keplerian orbital speed multiplier
uniform float uTurbAmp;      // turbulence amplitude
uniform float uTurbSpeed;    // turbulence advection/evolution speed

// background
uniform float uStarDensity;
uniform float uMilkyWay;

const float PI     = 3.141592653589793;
const float RS     = 1.0;   // Schwarzschild radius = 1 length unit, so M = 1/2
const float R_ESC  = 40.0;  // escape radius
const float B_CRIT = 2.598076211353316; // critical impact parameter 3*sqrt(3)/2 * r_s

${COMMON_GLSL}

// ---------------------------------------------------------------------------
// Schwarzschild null geodesics — Cartesian conservative form.
//
// Photon spatial orbits in the Schwarzschild metric obey the exact Binet-type
// equation (u = 1/r, equatorial plane, r_s = 2M = 1):
//
//     d2u/dphi2 + u = (3/2) * r_s * u^2          ... (Schwarzschild, null)
//
// Newtonian-style planar orbits under a central force F(r) with conserved
// angular momentum h = |x �� v| satisfy
//
//     d2u/dphi2 + u = -F(1/u) / (h^2 * u^2).
//
// Matching both gives the mathematically equivalent Cartesian ODE integrated
// here (r = |x|):
//
//     d2x/dl2 = -(3/2) * h^2 * x / r^5 ,   h = |x �� dx/dl| = const.
//
// This reproduces the exact Schwarzschild photon orbit shapes: deflection,
// the unstable photon sphere at r = 1.5 r_s, and capture for impact
// parameters b = |x �� d| < b_crit = 3*sqrt(3)/2 r_s, while staying well
// conditioned in Cartesian coordinates.
// ---------------------------------------------------------------------------

// acceleration d2x/dl2 of the geodesic ODE above
vec3 geodesicAccel(vec3 pos, float h2) {
    float r2 = dot(pos, pos);
    return -1.5 * h2 * pos / (r2 * r2 * sqrt(r2)); // -(3/2) h^2 x / r^5
}

// One classical RK4 step of the coupled state (pos, dir = dx/dl).
void geodesicStep(inout vec3 pos, inout vec3 dir, float h2, float dt) {
    vec3 k1p = dir;               vec3 k1v = geodesicAccel(pos, h2);
    vec3 k2p = dir + 0.5 * dt * k1v;
    vec3 k2v = geodesicAccel(pos + 0.5 * dt * k1p, h2);
    vec3 k3p = dir + 0.5 * dt * k2v;
    vec3 k3v = geodesicAccel(pos + 0.5 * dt * k2p, h2);
    vec3 k4p = dir + dt * k3v;
    vec3 k4v = geodesicAccel(pos + dt * k3p, h2);
    pos += (dt / 6.0) * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);
    dir += (dt / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

// ---------------------------------------------------------------------------
// Accretion disk emission where a ray crosses the equatorial plane (y = 0).
// Material follows prograde circular Keplerian geodesics (M = 1/2, r_s = 1):
//     Omega = sqrt(M / r^3),  local orbital speed beta = sqrt(M / (r - r_s))
// (beta -> c at the photon sphere r = 1.5 r_s, beta = 0.5c at the ISCO r = 3).
// Total shift factor g = gravitational sqrt(1 - r_s/r) times special-
// relativistic Doppler delta = sqrt(1 - beta^2) / (1 - beta cosA); observed
// intensity beams as g^3 and the hue shifts with g.
// ---------------------------------------------------------------------------
vec3 blackbodyRamp(float t) {
    // hand-tuned Planck-ish ramp, t ~ 0.3 (deep red) .. 2.3 (blue-white)
    vec3 c = vec3(1.00, 0.30, 0.06);
    c = mix(c, vec3(1.00, 0.58, 0.20), smoothstep(0.30, 0.80, t));
    c = mix(c, vec3(1.00, 0.85, 0.55), smoothstep(0.70, 1.15, t));
    c = mix(c, vec3(1.00, 0.97, 0.90), smoothstep(1.05, 1.60, t));
    c = mix(c, vec3(0.82, 0.90, 1.00), smoothstep(1.50, 2.20, t));
    return c;
}

void diskSample(vec3 q, vec3 rayDir, out vec3 emission, out float opacity,
                out float gOut, out float turbOut) {
    float rc = length(q.xz);

    // Keplerian rotation (geometric units) with the user speed multiplier
    float omega = uOrbitSpeed * sqrt(0.5 / (rc * rc * rc));
    float beta  = clamp(sqrt(0.5 / max(rc - 1.0, 0.51)), 0.0, 0.985);

    // relativistic Doppler: photon travels toward the observer along -rayDir
    vec3 tangent = normalize(vec3(-q.z, 0.0, q.x)); // prograde (phi increasing)
    float cosA = dot(tangent, -rayDir);
    float dopp = sqrt(1.0 - beta * beta) / (1.0 - beta * cosA);
    float grav = sqrt(max(1.0 - RS / rc, 0.0));
    float g = dopp * grav;
    gOut = g;

    // differential rotation shears the turbulence: advect the sample point
    // back along its Keplerian orbit, then add slow noise evolution
    vec2 pr = rot2(q.xz, -omega * uTime);
    float n1 = fbm2(pr * 0.85);
    float n2 = fbm2(pr * 2.6 - vec2(0.0, uTime * 0.05 * uTurbSpeed) + 13.7);
    float turb = mix(n1, n2, 0.4); // ~[0, 1]
    turbOut = turb;

    // radial profile: soft inner/outer edges, Shakura-Sunyaev T ~ r^-3/4
    float x    = clamp((rc - uDiskInner) / max(uDiskOuter - uDiskInner, 1e-3), 0.0, 1.0);
    float edge = smoothstep(0.0, 0.06, x) * (1.0 - smoothstep(0.70, 1.0, x));
    float tempN = pow(uDiskInner / rc, 0.75) * uDiskTemp;

    float lum = edge * (0.30 + 1.8 * pow(tempN, 1.6));
    lum *= 0.55 + uTurbAmp * (turb * 1.7 - 0.35);
    lum = max(lum, 0.0);

    // chromatic Doppler shift: g > 1 pushes toward blue-white, g < 1 to deep red
    float gt = clamp((g - 0.6) / 0.9, 0.0, 1.0);
    vec3 shift = vec3(0.72 + 0.42 * gt, 0.52 + 0.48 * gt, 0.30 + 0.72 * gt);

    emission = blackbodyRamp(tempN) * shift * lum * uDiskIntensity * pow(g, 2.3);

    // soft highlight knee: keeps the Doppler-boosted side detailed instead of
    // clipping into a flat white region
    float el = max(emission.r, max(emission.g, emission.b));
    emission *= 3.5 / (3.5 + el);

    // opacity: longer chord through the slab at grazing incidence
    float incidence = clamp(abs(normalize(rayDir).y), 0.05, 1.0);
    float chord = clamp(uDiskThickness / incidence, 0.5, 5.0);
    opacity = clamp(edge * (0.18 + 0.16 * chord) * (0.55 + 0.9 * turb), 0.0, 0.95);
}

// ---------------------------------------------------------------------------
// Procedural background: hashed point stars in 3D cells crossed by the unit
// sphere, plus an fbm galaxy band with dust lanes and a bulge. Sampled with
// the bent escape direction, so gravitational lensing applies for free.
// ---------------------------------------------------------------------------
vec3 starLayer(vec3 d, float scale, float gain) {
    vec3 p = d * scale;
    vec3 id = floor(p);
    vec3 rnd = hash33(id);
    // only a fraction of cells hosts a star, gated by the density control
    if (rnd.y > mix(0.25, 0.98, clamp(uStarDensity, 0.0, 1.0))) return vec3(0.0);
    vec3 f = fract(p) - (0.2 + 0.6 * rnd);
    float dist2 = dot(f, f);
    float b = exp(-dist2 * 550.0);
    float mag = pow(rnd.x, 5.0) * 3.5 + 0.22; // few bright, many faint
    vec3 tint = mix(vec3(1.00, 0.82, 0.62), vec3(0.72, 0.82, 1.00), rnd.z);
    return tint * b * mag * gain;
}

vec3 sampleSky(vec3 d) {
    vec3 col = vec3(0.0);
    col += starLayer(d, 90.0, 1.3);
    col += starLayer(d, 207.0, 0.75);

    // galaxy band on a tilted great circle
    const vec3 gN = normalize(vec3(0.34, 1.0, 0.14)); // galaxy north pole
    const vec3 gB = normalize(cross(gN, vec3(0.0, 0.0, 1.0))); // bulge direction
    float band = exp(-pow(dot(d, gN) * 2.6, 2.0));
    float clouds = fbm3(d * 5.0) * 0.6 + fbm3(d * 15.0) * 0.4;
    float dust = smoothstep(0.25, 0.75, fbm3(d * 9.0 + 7.3));
    vec3 bandCol = mix(vec3(0.16, 0.14, 0.13), vec3(0.42, 0.38, 0.34), clouds);
    vec3 mw = bandCol * band * (0.3 + 1.05 * clouds) * (0.45 + 0.55 * dust);
    mw += vec3(0.55, 0.42, 0.30) * pow(max(dot(d, gB), 0.0), 10.0) * band * 1.0; // bulge
    mw += vec3(0.10, 0.12, 0.18) * pow(max(dot(d, gB), 0.0), 3.0) * band * 0.12; // haze
    col += mw * uMilkyWay;
    return col;
}

// ---------------------------------------------------------------------------
// Ray march. Termination: 0 escaped past R_ESC (outward), 1 fell through the
// event horizon (r <= r_s), 2 exhausted the step budget (near-critical orbit),
// 3 fully absorbed by the disk. Emission from every equatorial crossing is
// accumulated in path order (front-to-back) so primary, secondary and
// higher-order images all compose.
// ---------------------------------------------------------------------------
struct MarchOut {
    vec3  color;     // HDR radiance (linear)
    int   term;
    float steps;     // fraction of the step budget used
    int   crossings; // equatorial crossings with rIn <= r <= rOut
    float gFirst;    // redshift factor of the first crossing (1 if none)
    float minR;      // smallest radius reached
    float b;         // impact parameter |x0 x d0|
    vec3  escDir;    // final direction when escaped
    float deflect;   // total deflection angle when escaped
    vec3  skyOnly;   // unattenuated background (escaped rays)
    float turb;      // turbulence value at the first crossing
};

MarchOut marchRay(vec3 pos, vec3 dir) {
    MarchOut R;
    R.color = vec3(0.0); R.term = 2; R.steps = 0.0; R.crossings = 0;
    R.gFirst = 1.0; R.minR = length(pos); R.b = length(cross(pos, dir));
    R.escDir = dir; R.deflect = 0.0; R.skyOnly = vec3(0.0); R.turb = 0.0;

    vec3 dir0 = dir;
    float h2 = dot(cross(pos, dir), cross(pos, dir)); // conserved h^2
    float transmittance = 1.0;
    int steps = 0;
    bool done = false;

    for (int i = 0; i < 1024; i++) {
        if (i >= uMaxSteps || done) break;

        // adaptive step: fine near the photon sphere / horizon, coarse far out
        float r = length(pos);
        float dt = uStepScale * 0.16 * clamp(r * 0.55, 0.9, 8.0);

        vec3 prev = pos;
        geodesicStep(pos, dir, h2, dt);
        steps++;

        float rNew = length(pos);
        R.minR = min(R.minR, rNew);

        // equatorial plane crossing -> accretion disk sample
        if (prev.y * pos.y < 0.0) {
            float s = prev.y / (prev.y - pos.y);
            vec3 q = mix(prev, pos, s);
            float rc = length(q.xz);
            if (rc >= uDiskInner && rc <= uDiskOuter) {
                R.crossings++;
                vec3 e; float a; float g; float trb;
                diskSample(q, dir, e, a, g, trb);
                R.color += e * transmittance;
                transmittance *= 1.0 - a;
                if (R.crossings == 1) { R.gFirst = g; R.turb = trb; }
                if (transmittance < 0.02) { R.term = 3; done = true; }
            }
        }

        // event horizon capture: no emission from inside r_s
        if (rNew <= RS) { R.term = 1; done = true; }

        // escaped: sample the lensed background with the bent direction
        if (!done && rNew > R_ESC && dot(pos, dir) > 0.0) {
            R.term = 0; done = true;
            R.escDir = normalize(dir);
            R.deflect = acos(clamp(dot(dir0, R.escDir), -1.0, 1.0));
            R.skyOnly = sampleSky(R.escDir);
            R.color += R.skyOnly * transmittance;
        }
    }

    R.steps = float(steps) / float(uMaxSteps);
    return R;
}

// diagnostic colormaps
vec3 gDiverging(float g) { // 0.3 (blue) .. 1.7 (red), 1 -> grey
    float t = clamp((g - 1.0) * 1.4 + 0.5, 0.0, 1.0);
    vec3 lo = vec3(0.10, 0.35, 0.95), mid = vec3(0.85), hi = vec3(1.00, 0.22, 0.10);
    return t < 0.5 ? mix(lo, mid, t * 2.0) : mix(mid, hi, t * 2.0 - 1.0);
}

vec3 heatRamp(float t) { // 0 -> dark, 1 -> white via blue/red
    t = clamp(t, 0.0, 1.0);
    vec3 c = mix(vec3(0.02, 0.0, 0.08), vec3(0.55, 0.05, 0.35), smoothstep(0.0, 0.35, t));
    c = mix(c, vec3(1.0, 0.35, 0.05), smoothstep(0.3, 0.7, t));
    c = mix(c, vec3(1.0, 0.95, 0.75), smoothstep(0.65, 1.0, t));
    return c;
}

void main() {
    // camera ray through the pixel (OrbitControls camera basis + FOV)
    vec2 uv = (vUv * 2.0 - 1.0) * vec2(uAspect, 1.0);
    vec3 dir = normalize(uCamFwd + uTanHalfFov * (uv.x * uCamRight + uv.y * uCamUp));

    MarchOut R = marchRay(uCamPos, dir);

    vec3 outc;
    if (uDebug == 0) {
        outc = R.color;
    } else if (uDebug == 1) {
        // steps used (blue->cyan ramp, gamma-stretched for legibility)
        // tinted by termination: grey = escaped, red = horizon,
        // yellow = step budget, green = absorbed
        float f = pow(clamp(R.steps, 0.0, 1.0), 0.3);
        vec3 base = mix(vec3(0.02, 0.05, 0.50), vec3(0.30, 1.00, 1.00), f) * (0.3 + 0.9 * f);
        if (R.term == 1) base = vec3(0.95, 0.10, 0.05) * (0.35 + 0.65 * f);
        else if (R.term == 2) base = vec3(0.95, 0.80, 0.10);
        else if (R.term == 3) base = vec3(0.10, 0.85, 0.35);
        outc = base;
    } else if (uDebug == 2) {
        // event horizon mask: inside = red, escaped = deep grey, absorbed = green
        outc = (R.term == 1) ? vec3(0.90, 0.05, 0.02)
             : (R.term == 3) ? vec3(0.05, 0.55, 0.15)
             : vec3(0.07, 0.07, 0.09) + 0.05 * R.skyOnly;
    } else if (uDebug == 3) {
        // disk crossings and order: 0 black, 1 blue, 2 green, 3 gold, 4+ magenta
        outc = vec3(0.02);
        if (R.crossings >= 1) outc = vec3(0.10, 0.40, 1.00);
        if (R.crossings >= 2) outc = vec3(0.15, 0.95, 0.30);
        if (R.crossings >= 3) outc = vec3(1.00, 0.80, 0.10);
        if (R.crossings >= 4) outc = vec3(1.00, 0.15, 0.85);
    } else if (uDebug == 4) {
        // redshift / Doppler factor g of the first crossing (blue < 1 < red)
        outc = (R.crossings > 0) ? gDiverging(R.gFirst) : vec3(0.03) + 0.06 * R.skyOnly;
    } else if (uDebug == 5) {
        // background lensing coordinates: escape-direction grid + deflection heat
        if (R.term == 0) {
            vec2 ll = vec2(atan(R.escDir.z, R.escDir.x), asin(clamp(R.escDir.y, -1.0, 1.0)));
            vec2 g = abs(fract(ll * (6.0 / PI)) - 0.5);
            float line = 1.0 - smoothstep(0.0, 0.045, min(g.x, g.y));
            outc = heatRamp(clamp(R.deflect / PI, 0.0, 1.0)) * 0.55
                 + line * vec3(0.20, 0.30, 0.45);
        } else {
            outc = vec3(0.85, 0.08, 0.05); // captured
        }
    } else if (uDebug == 6) {
        // starfield / galaxy only (escaped rays)
        outc = R.skyOnly;
    } else if (uDebug == 7) {
        // disk turbulence field at the first crossing (contrast-stretched)
        float t = smoothstep(0.12, 0.88, R.turb);
        outc = (R.crossings > 0)
            ? heatRamp(t)
            : vec3(0.02);
    } else if (uDebug == 9) {
        // critical impact parameter proximity (photon ring map)
        float d = abs(R.b - B_CRIT);
        outc = (R.term == 0)
            ? heatRamp(1.0 - d * 2.2)
            : heatRamp(clamp(1.4 - R.minR, 0.0, 1.0) * 0.8);
    } else {
        outc = R.color; // uDebug == 8 handled in the composite pass (raw HDR)
    }

    gl_FragColor = vec4(outc, 1.0);
}
`;
