// Orbital clock: phase in [0,1) = one orbit (one day/night cycle).
//
// Phase semantics (see docs/DESIGN.md §6):
//   0.000        sunrise (sun clears Earth's limb) — glare spike peaks at ~0.012
//   0.000–0.030  sunFactor ramps 0 -> 1
//   0.030–0.520  full day, sun sweeps across the big porthole
//   0.520–0.560  sunset, sunFactor 1 -> 0
//   0.560–0.985  night (Earth shadow); city lights visible
//   0.985–1.000  pre-dawn: atmosphere limb brightens (dawnFactor), sunFactor still 0
//
// All derived values are recomputed in place each frame (no allocations).
import * as THREE from 'three';

export const SUNRISE_RAMP = 0.03;
export const SUNSET_START = 0.52;
export const SUNSET_END = 0.56;

const TAU = Math.PI * 2;

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export function createClock({ period = 90, fastPeriod = 15, phase = 0.12 } = {}) {
  const clock = {
    /** Current orbital phase in [0,1). */
    phase,
    /** Normal and fast-forward periods, seconds. */
    period,
    fastPeriod,
    /** Current effective period (blends smoothly between period and fastPeriod). */
    currentPeriod: period,
    /** true while fast-forward is requested. */
    fast: false,
    /** true while the user is scrubbing; auto-advance paused. */
    scrubbing: false,
    /** Seconds since start (wall time, unaffected by scrubbing/fast-forward). */
    elapsed: 0,

    // ---- derived, updated every frame ----
    /** 0 at night, 1 in full sun. */
    sunFactor: 0,
    /** 0..1 dazzling spike right after sunrise (drives bloom + exposure). */
    glare: 0,
    /** 0..1 pre-dawn / post-sunset limb glow. */
    dawnFactor: 0,
    /** 1 - sunFactor. */
    nightFactor: 1,
    /** Unit vector from the cabin TOWARD the sun (world space). Light travels along -sunDir. */
    sunDir: new THREE.Vector3(0, 0.4, -1).normalize(),
    /** Earth spin angle (radians) about the Earth's own axis; ground track scrolls through the window. */
    earthRotation: phase * TAU,

    setFastForward(on) {
      clock.fast = !!on;
    },
    /** Jump directly to a phase (wraps). Derived values refresh immediately. */
    setPhase(p) {
      const next = ((p % 1) + 1) % 1;
      clock.phase = next;
      clock.earthRotation = next * TAU;
      computeDerived(clock);
    },
    beginScrub() {
      clock.scrubbing = true;
    },
    /** Move the phase by delta (may be negative) during a scrub. */
    scrubBy(delta) {
      clock.phase = ((clock.phase + delta) % 1 + 1) % 1;
      clock.earthRotation += delta * TAU;
      computeDerived(clock);
    },
    endScrub() {
      clock.scrubbing = false;
    },
    /** Advance by real dt seconds. Called once per frame by main.js before updatables. */
    tick(dt) {
      clock.elapsed += dt;
      const target = clock.fast ? clock.fastPeriod : clock.period;
      // Blend the angular rate (not the period) so the change feels linear; ~0.5 s time constant.
      const rate = 1 / clock.currentPeriod;
      const targetRate = 1 / target;
      const k = 1 - Math.exp(-dt / 0.5);
      const newRate = rate + (targetRate - rate) * k;
      clock.currentPeriod = Math.abs(newRate - targetRate) < 1e-6 ? target : 1 / newRate;
      if (!clock.scrubbing) {
        const delta = dt * newRate;
        clock.phase = (clock.phase + delta) % 1;
        clock.earthRotation += delta * TAU;
      }
      computeDerived(clock);
    },
  };
  computeDerived(clock);
  return clock;
}

function computeDerived(c) {
  const p = c.phase;
  // sunFactor: ramp up at 0, down at sunset. Treat p near 1 as negative so the ramp is continuous.
  const up = smoothstep(0, SUNRISE_RAMP, p);
  const down = 1 - smoothstep(SUNSET_START, SUNSET_END, p);
  c.sunFactor = p < SUNSET_END ? up * down : 0;
  c.nightFactor = 1 - c.sunFactor;

  // Glare: sharp attack at sunrise, ~2.5 s decay at the 90 s period (0.028 phase).
  const g = p < 0.012 ? p / 0.012 : Math.exp(-(p - 0.012) / 0.02);
  c.glare = p < 0.12 ? Math.min(1, g) : 0;

  // Dawn/dusk limb glow.
  const pre = smoothstep(0.955, 1.0, p);
  const post = p > SUNSET_START ? 1 - smoothstep(SUNSET_END, SUNSET_END + 0.04, p) : 0;
  c.dawnFactor = Math.max(pre, post);

  // Sun direction: sweeps right->left across the rear window while staying above the floor plane.
  // u in [0,1] over the day; outside the day the sun keeps moving "below the horizon" (behind Earth).
  const u = (p < SUNSET_END ? p : p - 1) / SUNSET_END; // night maps to negative u
  const sweep = THREE.MathUtils.clamp(u, -0.1, 1.1);
  // Sun sits behind the rear wall (-Z). Light enters through the portholes heading +Z and down.
  // az: +0.12 rad at sunrise (sun toward +X) to -0.02 at sunset; el 0.45..0.50 rad.
  // The big-porthole beam (center y=1.35) lands as one oval on the open floor right of the desk,
  // sliding from x≈0.3..1.75 (sunrise) to x≈0.7..2.1 (sunset), z≈-0.6..+1.9. It stays left of
  // and in front of the viewing chair (x≈2.1..2.95), which would otherwise hide it from the
  // default camera. Raycast-checked, DESIGN.md §5.
  const az = 0.12 - sweep * 0.14;
  const el = 0.45 + 0.05 * Math.sin(Math.PI * THREE.MathUtils.clamp(sweep, 0, 1));
  const ce = Math.cos(el);
  c.sunDir.set(Math.sin(az) * ce, Math.sin(el), -Math.cos(az) * ce).normalize();

}
