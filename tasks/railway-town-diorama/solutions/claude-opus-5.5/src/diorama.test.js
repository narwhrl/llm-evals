import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTrainMotion, carPose, DWELL_TIME } from './motion.js';
import { TRACK, TRAIN, STATION, planTown, distToTrack, distToRiver, RIVER, BRIDGES } from './layout.js';

test('track is closed and continuous', () => {
  const n = 4000;
  const ds = TRACK.length / n;
  let prev = TRACK.sample(0);
  for (let i = 1; i <= n; i++) {
    const p = TRACK.sample(i * ds);
    assert.ok(Math.abs(Math.hypot(p.x - prev.x, p.z - prev.z) - ds) < 1e-3, `position jump at s=${i * ds}`);
    assert.ok(p.dx * prev.dx + p.dz * prev.dz > 0.999, `heading jump at s=${i * ds}`);
    prev = p;
  }
  const end = TRACK.sample(TRACK.length);
  const start = TRACK.sample(0);
  assert.ok(Math.hypot(end.x - start.x, end.z - start.z) < 1e-9);
});

function simulate(multiplier, seconds, dt = 1 / 60) {
  const motion = createTrainMotion({ length: TRACK.length, ...TRAIN });
  const stops = [];
  let dwellStart = null;
  for (let t = 0; t < seconds; t += dt) {
    const wasDwell = motion.state.phase === 'dwell';
    motion.update(dt, multiplier);
    const isDwell = motion.state.phase === 'dwell';
    if (!wasDwell && isDwell) dwellStart = { t, s: motion.state.s };
    if (wasDwell && !isDwell) stops.push({ ...dwellStart, duration: t - dwellStart.t });
  }
  return { motion, stops };
}

for (const multiplier of [0.25, 1, 2.5]) {
  test(`train stops at the platform for ~2 s on every lap (speed x${multiplier})`, () => {
    const lap = TRACK.length / (TRAIN.baseSpeed * multiplier);
    const { stops } = simulate(multiplier, lap * 3.2 + 30);
    assert.ok(stops.length >= 3, `only ${stops.length} stops`);
    for (const stop of stops) {
      const s = ((stop.s % TRACK.length) + TRACK.length) % TRACK.length;
      assert.ok(Math.abs(s - TRAIN.stopS) < 1e-3, `stopped at s=${s}`);
      assert.ok(Math.abs(stop.duration - DWELL_TIME) < 0.05, `dwell ${stop.duration}`);
    }
  });
}

test('the whole train fits the platform when stopped', () => {
  const loco = TRAIN.cars[0];
  const last = TRAIN.cars.at(-1);
  const front = TRACK.sample(TRAIN.stopS + loco.half).x;
  const rear = TRACK.sample(TRAIN.stopS - last.offset - last.half).x;
  assert.ok(front < STATION.platform.x1 && rear > STATION.platform.x0, `train spans ${rear}..${front}`);
});

test('reset restores the same state', () => {
  const motion = createTrainMotion({ length: TRACK.length, ...TRAIN });
  const initial = structuredClone(motion.state);
  for (let i = 0; i < 2000; i++) motion.update(1 / 60, 1.7);
  assert.notDeepEqual(motion.state, initial);
  motion.reset();
  assert.deepEqual(motion.state, initial);
});

test('cars keep a steady gap and never overlap around the loop', () => {
  for (let s = 0; s < TRACK.length; s += 0.05) {
    for (let i = 1; i < TRAIN.cars.length; i++) {
      const a = TRAIN.cars[i - 1];
      const b = TRAIN.cars[i];
      const pa = carPose(TRACK, s - a.offset, a.bogie);
      const pb = carPose(TRACK, s - b.offset, b.bogie);
      const rearA = [pa.x - pa.dx * a.half, pa.z - pa.dz * a.half];
      const frontB = [pb.x + pb.dx * b.half, pb.z + pb.dz * b.half];
      const gap = Math.hypot(rearA[0] - frontB[0], rearA[1] - frontB[1]);
      assert.ok(gap > 0.15 && gap < 0.3, `gap ${gap} at s=${s}`);
    }
  }
});

test('town plan keeps buildings and trees off the line, river and each other', () => {
  const { buildings, landmarks, trees } = planTown();
  assert.ok(buildings.length > 25, `only ${buildings.length} buildings`);
  const rects = [...buildings, ...landmarks.filter((l) => l.kind !== 'platform')];
  for (const r of rects) {
    const c = Math.cos(r.rot);
    const s = Math.sin(r.rot);
    for (let u = -0.5; u <= 0.5; u += 0.125) {
      for (let v = -0.5; v <= 0.5; v += 0.125) {
        const x = r.x + u * r.w * c + v * r.d * s;
        const z = r.z - u * r.w * s + v * r.d * c;
        assert.ok(distToTrack(x, z) > 1.2, `${r.kind ?? r.style} too close to track at ${x},${z}`);
        assert.ok(distToRiver(x, z) > RIVER.bank, `${r.kind ?? r.style} in river at ${x},${z}`);
      }
    }
  }
  for (const t of trees) assert.ok(distToTrack(t.x, t.z) > 1.3, `tree on track at ${t.x},${t.z}`);
  assert.ok(trees.length > 150, `only ${trees.length} trees`);
});

test('rail bridges sit on straight track over the river', () => {
  for (const b of Object.values(BRIDGES)) {
    assert.ok(b.x0 > -10 && b.x1 < 10, 'bridge must be on a straight');
    assert.ok(distToRiver(b.x0, b.z) > 1.2 && distToRiver(b.x1, b.z) > 1.2, 'abutments must stand on the banks');
    assert.ok(distToRiver(b.x, b.z) < 0.2, 'bridge must be centred on the river');
  }
});
