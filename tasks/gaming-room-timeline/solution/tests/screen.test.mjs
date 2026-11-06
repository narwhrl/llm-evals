import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { getEra } from '../src/eras.js';
import { createScreen } from '../src/screen.js';

function screenForTest(t) {
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const context = {
    beginPath() {}, roundRect() {}, fill() {}, fillText() {},
    moveTo() {}, lineTo() {}, closePath() {}, ellipse() {},
    save() {}, rect() {}, clip() {}, restore() {}, arc() {},
    stroke() {}, clearRect() {},
    createLinearGradient() { return { addColorStop() {} }; },
  };
  globalThis.document = {
    createElement() {
      return { width: 0, height: 0, getContext: () => context };
    },
  };
  const screen = createScreen(THREE);
  t.after(() => {
    screen.texture.dispose();
    if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument);
    else delete globalThis.document;
  });
  return screen;
}

function clickPixel(screen, x, y) {
  return screen.click(x / screen.canvas.width, 1 - y / screen.canvas.height);
}

test('every year selects the most recent representative setup', () => {
  for (let year = 2005; year <= 2025; year += 1) {
    const expected = 2005 + Math.floor((year - 2005) / 5) * 5;
    assert.equal(getEra(year).year, expected, String(year));
  }
});

const launches = [
  [2005, 278, 232],
  [2010, 182, 239],
  [2015, 236, 224],
  [2020, 137, 243],
  [2025, 173, 242],
];

for (const [year, buttonX, buttonY] of launches) {
  test(`${year}: launch, score, expire, replay, and return to the desktop`, (t) => {
    const screen = screenForTest(t);
    screen.setYear(year);
    assert.equal(screen.getState().mode, 'desktop');
    assert.equal(clickPixel(screen, 500, 280), false);
    assert.equal(screen.getState().mode, 'desktop', 'empty desktop space is not a launch button');

    assert.equal(clickPixel(screen, buttonX, buttonY), true);
    assert.equal(screen.getState().mode, 'game');
    assert.equal(screen.getState().score, 0);
    const target = screen.getState().target;
    assert.equal(screen.click(target.u, target.v), true);
    assert.equal(screen.getState().score, 1);
    assert.equal(clickPixel(screen, 500, 280), false);
    assert.equal(screen.getState().score, 1, 'missing a star must not award a point');

    screen.update(21);
    assert.equal(screen.getState().remaining, 0);
    const expiredTarget = screen.getState().target;
    screen.click(expiredTarget.u, expiredTarget.v);
    assert.equal(screen.getState().score, 1, 'time expiration stops scoring');

    assert.equal(clickPixel(screen, 256, 229), true);
    assert.equal(screen.getState().score, 0);
    assert.equal(screen.getState().remaining, 20);
    assert.equal(clickPixel(screen, 40, 21), true);
    assert.equal(screen.getState().mode, 'desktop');
    assert.equal(screen.getState().eraYear, year);
  });
}

test('moving within an era preserves play; replacing the computer resets its desktop', (t) => {
  const screen = screenForTest(t);
  clickPixel(screen, 278, 232);
  const target = screen.getState().target;
  screen.click(target.u, target.v);
  screen.setYear(2009);
  assert.equal(screen.getState().mode, 'game');
  assert.equal(screen.getState().score, 1);
  screen.setYear(2010);
  assert.equal(screen.getState().mode, 'desktop');
  assert.equal(screen.getState().score, 0);
  assert.equal(screen.getState().eraYear, 2010);
});
