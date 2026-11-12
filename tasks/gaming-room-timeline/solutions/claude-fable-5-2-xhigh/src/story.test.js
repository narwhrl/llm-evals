// Self-check of the story table and the Minesweeper rules. Run with `npm test`.
import test from 'node:test';
import assert from 'node:assert/strict';
import { ITEMS, YEAR0, YEAR1, END, active, mainMonitor, noteAt, poseAt } from './story.js';
import { Mines } from './mines.js';

const years = Array.from({ length: (YEAR1 - YEAR0) * 20 + 1 }, (_, i) => YEAR0 + i / 20);
const count = (year, re) => ITEMS.filter((it) => re.test(it.id) && active(it, year)).length;

test('item ranges and keyframes are consistent', () => {
  const ids = new Set();
  for (const it of ITEMS) {
    assert.ok(!ids.has(it.id), `duplicate id ${it.id}`);
    ids.add(it.id);
    assert.ok(it.from >= YEAR0 && it.from <= YEAR1 && (it.to ?? END) > it.from, `range of ${it.id}`);
    assert.ok(it.p || it.path, `${it.id} has no pose`);
    for (const list of [it.path, Array.isArray(it.note) ? it.note : null]) {
      if (!list) continue;
      assert.ok(list[0][0] <= it.from, `${it.id}: first keyframe must cover the start`);
      list.forEach((k, i) => i && assert.ok(k[0] > list[i - 1][0], `${it.id}: keyframes out of order`));
    }
    if (it.note) assert.ok(it.name, `${it.id} has a note but no name`);
  }
});

test('every year has exactly one desk, keyboard and interactive monitor', () => {
  for (const y of years) {
    assert.equal(count(y, /^desk/), 1, `desks in ${y}`);
    assert.equal(count(y, /^input/), 1, `keyboards in ${y}`);
    const mon = mainMonitor(y);
    assert.ok(mon && active(mon, y), `main monitor in ${y}`);
    assert.equal(ITEMS.filter((it) => it.main && y >= it.main[0] && y < it.main[1]).length, 1, `one main monitor in ${y}`);
    assert.ok(count(y, /^chair/) >= 1 && count(y, /^pc/) >= 1, `chair and computer in ${y}`);
  }
});

test('keepsakes are present, placed and remembered in every year', () => {
  const keeps = new Set(ITEMS.filter((it) => it.keep).map((it) => it.keep));
  assert.ok(keeps.size >= 3);
  for (const y of years)
    for (const keep of keeps) {
      const it = ITEMS.find((i) => i.keep === keep && active(i, y));
      assert.ok(it, `${keep} missing in ${y}`);
      assert.equal(poseAt(it, y).length >= 3, true);
      assert.equal(typeof noteAt(it, y), 'string');
    }
});

test('minesweeper: first click is safe, flood fill opens, win and loss are detected', () => {
  const picks = () => {
    const seq = [0.3, 0.999]; // on a 4 x 4 board with cell 0 clicked first: mines at 5 and 15
    return () => seq.shift();
  };
  const open = (m) => m.cells.flatMap((c, i) => (c.open ? [i] : []));
  const m = new Mines(4, 2);
  m.reveal(0, picks());
  assert.deepEqual(m.cells.flatMap((c, i) => (c.mine ? [i] : [])), [5, 15]);
  assert.deepEqual(open(m), [0]);
  assert.equal(m.status, 'play');
  assert.equal(m.cells[10].near, 2);
  m.reveal(3); // an empty cell: opens its whole neighbourhood up to the numbers
  assert.deepEqual(open(m), [0, 2, 3, 6, 7, 10, 11]);
  for (let i = 0; i < 15; i++) if (i !== 5) m.reveal(i);
  assert.equal(m.status, 'won');
  m.reset();
  m.reveal(0, picks());
  m.reveal(5);
  assert.equal(m.status, 'lost');
});
