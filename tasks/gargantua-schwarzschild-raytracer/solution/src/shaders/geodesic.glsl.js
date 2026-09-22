/**
 * Shared GLSL: Schwarzschild constants, the planar null-geodesic integrator, and the
 * plane/chart bookkeeping.
 *
 * ---------------------------------------------------------------------------------------------
 * CHART AND UNITS
 * ---------------------------------------------------------------------------------------------
 * Lengths are in units of the Schwarzschild radius r_s, so the mass is M = 1/2 and
 *
 *     event horizon         r_h    = 2M          = 1
 *     unstable photon orbit r_ph   = 3M          = 1.5
 *     ISCO                  r_isco = 6M          = 3
 *     critical impact param b_crit = 3*sqrt(3)*M = 2.59807621
 *
 * Null geodesics in Schwarzschild are planar, so each ray is reduced to its own orbital plane
 * and advanced in the Binet variable
 *
 *     u = 1 / r,      d^2u/dphi^2 = -u + 3*M*u^2 = -u + 1.5*u^2
 *
 * with state (u, u'). The plane basis (e1, e2) is built so that phi increases monotonically
 * along the ray (see buildOrbitalPlane), which is what makes "path order" well defined for the
 * accretion-disk crossings in disk.glsl.js. Position and tangent are reconstructed as
 *
 *     x(phi)    = r * (cos(phi)*e1 + sin(phi)*e2)
 *     dx/dphi   = r' * (cos(phi)*e1 + sin(phi)*e2) + r * (-sin(phi)*e1 + cos(phi)*e2)
 *     r = 1/u,  r' = -u'/u^2
 *
 * Integration is fixed-step RK4 in phi. The step contracts near the photon sphere, where the
 * radial potential is exponentially unstable (perturbations grow like e^phi, so h ~ 0.03 keeps
 * the amplified local error ~1e-5 even after a full winding), and relaxes far from the hole
 * where the trajectory is straight to better than 1e-4 rad.
 *
 * TERMINATION (exactly three exits, reported in GeodesicResult.termination):
 *   TERM_HORIZON (1) u >= 1 - eps           -> inside r_h. Contributes no light, which is what
 *                                              keeps the shadow genuinely black rather than dark grey.
 *   TERM_ESCAPE  (2) r >= R_ESCAPE and r'>0 -> leaves the domain. Residual bending beyond
 *                                              R_ESCAPE is O(2*M*b/R_ESCAPE^2) < 4e-5 rad, far below
 *                                              one pixel, so the sky is sampled along the current
 *                                              direction. R_ESCAPE is reachable in ~20 steps because
 *                                              phi (not r) is the integration variable.
 *   TERM_STEPS   (3) step budget exhausted  -> confined to an extremely thin band around
 *                                              b = b_crit; treated as captured. Reported separately
 *                                              by debug view 1 so it can never mask an error.
 */
export const GEODESIC_GLSL = /* glsl */ `
const float RS = 1.0;            // Schwarzschild radius (unit of length)
const float BH_MASS = 0.5;       // M = RS / 2
const float R_HORIZON = 1.0;     // 2M
const float R_PHOTON = 1.5;      // 3M
const float R_ISCO = 3.0;        // 6M
const float B_CRIT = 2.59807621; // 3*sqrt(3)*M
const float R_ESCAPE = 400.0;

const int TERM_HORIZON = 1;
const int TERM_ESCAPE = 2;
const int TERM_STEPS = 3;

struct GeodesicState {
  float u;    // 1 / r
  float du;   // du/dphi
};

// Orbital plane of one ray. e1 is radial at the camera, e2 is the in-plane tangential axis
// chosen so that d(phi) > 0 along the propagation direction.
struct OrbitalPlane {
  vec3 e1;
  vec3 e2;
  vec3 normal;
  float b;        // conserved impact parameter, |r x d| = b for a unit direction d
  bool degenerate; // true when the ray is exactly radial and the plane is undefined
};

struct GeodesicResult {
  vec3 position;
  vec3 direction;     // unit tangent at termination, i.e. the sky lookup direction when escaping
  float phi;          // swept phi, used by the deflection debug view
  float steps;        // RK4 steps actually taken
  float minRadius;
  int termination;
};

// d^2u/dphi^2 = -u + 3*M*u^2
float geodesicAccel(float u) {
  return -u + 3.0 * BH_MASS * u * u;
}

GeodesicState rk4Step(GeodesicState s, float dphi) {
  float k1u = s.du;
  float k1d = geodesicAccel(s.u);
  float k2u = s.du + 0.5 * dphi * k1d;
  float k2d = geodesicAccel(s.u + 0.5 * dphi * k1u);
  float k3u = s.du + 0.5 * dphi * k2d;
  float k3d = geodesicAccel(s.u + 0.5 * dphi * k2u);
  float k4u = s.du + dphi * k3d;
  float k4d = geodesicAccel(s.u + dphi * k3u);
  GeodesicState next;
  next.u = s.u + (dphi / 6.0) * (k1u + 2.0 * k2u + 2.0 * k3u + k4u);
  next.du = s.du + (dphi / 6.0) * (k1d + 2.0 * k2d + 2.0 * k3d + k4d);
  return next;
}

float radiusOf(GeodesicState s) {
  return 1.0 / max(s.u, 1e-12);
}

float radiusPrimeOf(GeodesicState s) {
  float u = max(s.u, 1e-12);
  return -s.du / (u * u);
}

vec3 planePosition(vec3 e1, vec3 e2, float phi, float r) {
  return r * (cos(phi) * e1 + sin(phi) * e2);
}

vec3 planeTangent(vec3 e1, vec3 e2, float phi, float r, float rPrime) {
  vec3 radial = cos(phi) * e1 + sin(phi) * e2;
  vec3 tangential = -sin(phi) * e1 + cos(phi) * e2;
  return rPrime * radial + r * tangential;
}

// Builds the per-ray orbital plane. 'perp' is the component of the ray direction orthogonal to
// the radial direction, so dot(direction, e2) = |perp| >= 0 automatically and phi always increases.
OrbitalPlane buildOrbitalPlane(vec3 origin, vec3 direction) {
  float r0 = length(origin);
  vec3 e1 = origin / max(r0, 1e-9);
  vec3 perp = direction - dot(direction, e1) * e1;
  float perpLen = length(perp);
  OrbitalPlane plane;
  plane.e1 = e1;
  plane.e2 = perpLen > 1e-6 ? perp / perpLen : vec3(0.0);
  plane.normal = normalize(cross(origin, direction));
  plane.b = r0 * perpLen;
  plane.degenerate = perpLen <= 1e-6;
  return plane;
}

/**
 * Step size in phi.
 *
 * Near the photon sphere the trajectory is unstable (growth rate ~1 per radian of phi), so RK4
 * needs h*lambda << 1; far away the path is a straight line and h can be large.
 *
 * The relative-change limiter is not cosmetic: with u = 1/r, a step that reduces u past zero means
 * the ray has already passed r = infinity. Continuing to integrate then follows the ODE's
 * unphysical continuation (negative u = negative radius), and the far-field sky direction is read
 * off that branch. In practice the continuation can swing back up through u >= 1 and be mistaken
 * for a horizon crossing, which painted thin black arcs across the sky wherever a ray left the
 * domain inside a single step. Bounding the per-step change of u keeps the state on the physical
 * branch instead.
 */
float geodesicStepSize(float r, float u, float du, float uStepScale) {
  float h = mix(0.022, 0.20, smoothstep(R_PHOTON, 7.0 * RS, r)) * uStepScale;
  h = min(h, 0.35 * max(u, 1e-6) / max(abs(du), 1e-6));
  return clamp(h, 0.0015, 0.45);
}
`
