import assert from 'node:assert/strict';
import test from 'node:test';

import { deriveLoomState } from './device-state.js';

test('maps a focused high-tension gesture to a precise working stance', () => {
  const state = deriveLoomState({
    focus: 0.78,
    tension: 0.8,
    journey: 0.42,
  });

  assert.equal(state.stance, 'make');
  assert.match(state.message, /可执行/);
  assert.equal(state.chapter, 'development');
});

test('describes the chosen focus and tension as a carry-forward trace', () => {
  const state = deriveLoomState({
    focus: 0.78,
    tension: 0.8,
    journey: 0.92,
  });

  assert.equal(state.focusWord, '近处');
  assert.equal(state.tensionWord, '收紧');
});
