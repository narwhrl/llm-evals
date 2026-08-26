import assert from 'node:assert/strict';
import test from 'node:test';

import {
  GRID_SIZE,
  countProminentPeaks,
  generateHeightMap,
  generateWaterfallPaths,
} from './terrain.js';

test('generates a deterministic 128 by 128 mountain range', () => {
  const first = generateHeightMap();
  const second = generateHeightMap();

  assert.equal(GRID_SIZE, 128);
  assert.equal(first.heights.length, 128 * 128);
  assert.deepEqual(first.heights, second.heights);
  assert.ok(first.maxHeight >= 44, `expected a tall main peak, got ${first.maxHeight}`);
  assert.ok(first.maxHeight <= 58, `expected a bounded mountain, got ${first.maxHeight}`);
  assert.ok(countProminentPeaks(first, 25, 7) >= 4, 'expected a main peak and several subpeaks');
});

test('tapers the mountain into low foothills along every map edge', () => {
  const map = generateHeightMap();
  const edgeHeights = [];

  for (let i = 0; i < GRID_SIZE; i += 1) {
    edgeHeights.push(
      map.heights[i],
      map.heights[(GRID_SIZE - 1) * GRID_SIZE + i],
      map.heights[i * GRID_SIZE],
      map.heights[i * GRID_SIZE + GRID_SIZE - 1],
    );
  }

  assert.ok(Math.max(...edgeHeights) <= 5, 'edge voxels should remain foothills');
});

test('routes two waterfalls from high sources to the mountain foot', () => {
  const map = generateHeightMap();
  const paths = generateWaterfallPaths(map);

  assert.equal(paths.length, 2);
  for (const path of paths) {
    assert.ok(path.length >= 28, `waterfall path is too short: ${path.length}`);
    assert.ok(path[0].height >= 32, `waterfall starts too low: ${path[0].height}`);
    assert.ok(path.at(-1).height <= 10, `waterfall does not reach the foot: ${path.at(-1).height}`);
    assert.ok(
      path.some((point, index) => index > 0 && path[index - 1].height - point.height >= 2),
      'waterfall needs at least one visible drop',
    );
    assert.ok(
      path.every((point, index) => index === 0 || point.height <= path[index - 1].height),
      'water should never route uphill',
    );
  }
});
