// Track geometry and train kinematics. Pure math, no three.js, so it runs under `node --test`.

// Plan-view coordinates are (x, z) with +x right and +z toward the viewer.
// A left turn rotates the heading from +x toward -z.
function rotate(x, z, a) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c + z * s, -x * s + z * c];
}

// Builds a closed path from straight and circular segments.
// ops: ['line', length] | ['arc', radius, sweep] (sweep > 0 turns left).
export function createTrackPath(start, heading, ops) {
  const segments = [];
  let [x, z] = start;
  let [dx, dz] = [Math.cos(heading), -Math.sin(heading)];
  let s0 = 0;
  for (const op of ops) {
    if (op[0] === 'line') {
      const len = op[1];
      segments.push({ type: 'line', s0, len, x, z, dx, dz });
      x += dx * len;
      z += dz * len;
      s0 += len;
    } else {
      const [, r, sweep] = op;
      const sign = Math.sign(sweep);
      const cx = x + sign * r * dz;
      const cz = z - sign * r * dx;
      const len = r * Math.abs(sweep);
      segments.push({ type: 'arc', s0, len, x, z, dx, dz, cx, cz, r, sign });
      const [vx, vz] = rotate(x - cx, z - cz, sweep);
      x = cx + vx;
      z = cz + vz;
      [dx, dz] = rotate(dx, dz, sweep);
      s0 += len;
    }
  }
  const length = s0;
  const gap = Math.hypot(x - start[0], z - start[1]);
  if (gap > 1e-6) throw new Error(`track does not close (gap ${gap})`);

  function sample(s, out = {}) {
    s = ((s % length) + length) % length;
    let lo = 0;
    let hi = segments.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (segments[mid].s0 <= s) lo = mid;
      else hi = mid - 1;
    }
    const seg = segments[lo];
    const t = s - seg.s0;
    if (seg.type === 'line') {
      out.x = seg.x + seg.dx * t;
      out.z = seg.z + seg.dz * t;
      out.dx = seg.dx;
      out.dz = seg.dz;
    } else {
      const a = (seg.sign * t) / seg.r;
      const [vx, vz] = rotate(seg.x - seg.cx, seg.z - seg.cz, a);
      out.x = seg.cx + vx;
      out.z = seg.cz + vz;
      [out.dx, out.dz] = rotate(seg.dx, seg.dz, a);
    }
    return out;
  }

  return { length, segments, sample };
}

export const DWELL_TIME = 2;

// A car rides on two bogies `bogie` ahead of and behind its centre arc position;
// the body sits on the chord between them and faces along it.
const _front = {};
const _rear = {};
export function carPose(path, s, bogie, out = {}) {
  const f = path.sample(s + bogie, _front);
  const r = path.sample(s - bogie, _rear);
  const dx = f.x - r.x;
  const dz = f.z - r.z;
  const len = Math.hypot(dx, dz);
  out.x = (f.x + r.x) / 2;
  out.z = (f.z + r.z) / 2;
  out.dx = dx / len;
  out.dz = dz / len;
  return out;
}

// Speed is in board units per second; braking and acceleration scale with cruise speed
// so stopping distance stays inside one platform approach at the highest setting.
export function createTrainMotion({ length, startS, stopS, baseSpeed }) {
  const state = {};

  function firstStopAfter(s) {
    let stop = stopS;
    while (stop <= s + 1e-6) stop += length;
    return stop;
  }

  function reset() {
    state.s = startS;
    state.v = baseSpeed;
    state.phase = 'run';
    state.dwellLeft = 0;
    state.nextStop = firstStopAfter(startS);
    state.arrivals = 0;
  }

  function update(dt, multiplier) {
    if (state.phase === 'dwell') {
      state.dwellLeft -= dt;
      if (state.dwellLeft <= 0) {
        state.phase = 'run';
        state.dwellLeft = 0;
        state.nextStop += length;
      }
      return;
    }
    const cruise = baseSpeed * multiplier;
    const accel = Math.max(1.2, (cruise * cruise) / 18);
    const brake = Math.max(1.0, (cruise * cruise) / 14);
    const toStop = state.nextStop - state.s;
    let v = state.v < cruise ? Math.min(cruise, state.v + accel * dt) : Math.max(cruise, state.v - 2.5 * dt);
    v = Math.min(v, Math.sqrt(2 * brake * Math.max(toStop, 0)));
    if (toStop - v * dt <= 1e-4) {
      state.s = state.nextStop;
      state.v = 0;
      state.phase = 'dwell';
      state.dwellLeft = DWELL_TIME;
      state.arrivals += 1;
      return;
    }
    state.v = v;
    state.s += v * dt;
  }

  reset();
  return { state, reset, update };
}
