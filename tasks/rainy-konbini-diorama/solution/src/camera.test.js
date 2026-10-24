import test from 'node:test';
import assert from 'node:assert/strict';
import { cameraFov } from './camera.js';

function horizontalFov(aspect) {
  return 2 * Math.atan(Math.tan(cameraFov(aspect) * Math.PI / 360) * aspect);
}

test('narrow viewports preserve the full horizontal scene framing', () => {
  assert.ok(Math.abs(cameraFov(1.6) - 35) < 1e-10);
  assert.ok(Math.abs(cameraFov(1.45) - 35) < 1e-10);
  const expected = horizontalFov(1.45);
  for (const aspect of [1, 0.6]) assert.ok(Math.abs(horizontalFov(aspect) - expected) < 1e-10);
});
