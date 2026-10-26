import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceOrbit, daylight, floatHomes, isDrag, scrubOrbit } from '../src/orbit.js';

test('both orbital periods wrap exactly and preserve the scrubbed phase', () => {
  assert.ok(Math.abs(advanceOrbit(0.13, 90) - 0.13) < 1e-10);
  assert.ok(Math.abs(advanceOrbit(0.13, 15, true) - 0.13) < 1e-10);
  const phase = scrubOrbit(0.2, -350, 1440);
  assert.ok(phase >= 0 && phase < 1);
  assert.ok(Math.abs(advanceOrbit(phase, 1) - (phase + 1 / 90)) < 1e-10);
  assert.equal(daylight(0), 1);
  assert.equal(daylight(0.5), 0);
});

test('a click is not an orbital drag; motion envelopes do not overlap', () => {
  assert.equal(isDrag({ x: 10, y: 10 }, { x: 13, y: 14 }), false);
  assert.equal(isDrag({ x: 10, y: 10 }, { x: 17, y: 10 }), true);
  for (const [index, a] of floatHomes.entries()) {
    for (const b of floatHomes.slice(index + 1)) {
      const distance = Math.hypot(...a.center.map((v, axis) => v - b.center[axis]));
      assert.ok(distance > a.radius + b.radius, `${a.id} overlaps ${b.id}`);
    }
  }
});
