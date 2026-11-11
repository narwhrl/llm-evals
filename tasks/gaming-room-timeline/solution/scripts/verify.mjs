import assert from 'node:assert/strict';
import { ERAS, OBJECTS, eraForYear } from '../src/data.js';
import { screenMarkup } from '../src/screens.js';

assert.equal(ERAS.length, 6);
assert.equal(ERAS[0].year, 2005);
assert.equal(ERAS.at(-1).year, 2025);
for (const year of [2005, 2009, 2013, 2017, 2021, 2025]) {
  assert.equal(eraForYear(year).year, year);
  assert.ok(ERAS.find(era => era.year === year).description.length > 20);
  assert.ok(screenMarkup(year).includes(year < 2013 ? 'pixel-jump' : year < 2021 ? 'launch-game' : 'ship-left'));
}
for (const id of ['lamp', 'mug', 'robot']) assert.ok(OBJECTS[id].memory);
console.log('Passed: six eras, timeline boundaries, object memories, and all three screen interaction types.');
