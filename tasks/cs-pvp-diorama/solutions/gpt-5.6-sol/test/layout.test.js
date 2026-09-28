import test from 'node:test';
import assert from 'node:assert/strict';

import {
  BASE,
  CORE_REGIONS,
  REGION_FOOTPRINTS,
  ROUTES,
} from '../src/scene/layout.js';

const REQUIRED_REGIONS = ['tSpawn', 'ctSpawn', 'aSite', 'bSite'];
const REQUIRED_ROUTES = ['mid', 'leftFlank', 'rightFlank'];

function insideBuildLimit([x, z]) {
  return Math.abs(x) <= BASE.buildLimit && Math.abs(z) <= BASE.buildLimit;
}

test('declares one bounded square base and all four core regions', () => {
  assert.equal(BASE.width, BASE.depth);
  assert.equal(BASE.width, 40);
  assert.ok(BASE.buildLimit < BASE.width / 2);
  assert.deepEqual(Object.keys(CORE_REGIONS).sort(), REQUIRED_REGIONS.sort());

  for (const region of Object.values(CORE_REGIONS)) {
    assert.ok(insideBuildLimit(region.position), `${region.id} is outside the base`);
  }
});

test('keeps every declared region footprint inside the square base', () => {
  for (const footprint of Object.values(REGION_FOOTPRINTS)) {
    const [x, z] = footprint.center;
    const [width, depth] = footprint.size;
    assert.ok(
      Math.abs(x) + width / 2 <= BASE.buildLimit,
      `${footprint.id} exceeds the base on x`,
    );
    assert.ok(
      Math.abs(z) + depth / 2 <= BASE.buildLimit,
      `${footprint.id} exceeds the base on z`,
    );
  }
});

test('defines the central duel lane, left flank, and elevated right flank', () => {
  assert.deepEqual(Object.keys(ROUTES).sort(), REQUIRED_ROUTES.sort());
  assert.deepEqual(ROUTES.mid.connects, ['tSpawn', 'ctSpawn']);
  assert.deepEqual(ROUTES.leftFlank.connects, ['tSpawn', 'aSite', 'ctSpawn']);
  assert.deepEqual(ROUTES.rightFlank.connects, ['tSpawn', 'bSite', 'ctSpawn']);
  assert.ok(ROUTES.rightFlank.maxElevation > ROUTES.mid.maxElevation);

  for (const route of Object.values(ROUTES)) {
    assert.ok(route.points.length >= 4, `${route.id} needs readable turns`);
    for (const point of route.points) {
      assert.ok(insideBuildLimit(point), `${route.id} leaves the base at ${point}`);
    }
  }
});
