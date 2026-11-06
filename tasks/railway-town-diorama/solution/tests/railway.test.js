import assert from 'node:assert/strict';
import test from 'node:test';
import {
  TRACK_LENGTH,
  STATION_DISTANCE,
  INITIAL_DISTANCE,
  sampleTrack,
  createTrainState,
  advanceTrain,
} from '../src/railway.js';

const BASE_SPEED = 1.55;
const arrivalFromStart = (TRACK_LENGTH - INITIAL_DISTANCE + STATION_DISTANCE) / BASE_SPEED;

function close(actual, expected, tolerance = 1e-8) {
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} should be near ${expected}`);
}

test('the oval is continuous with unit tangents through every join and the seam', () => {
  close(TRACK_LENGTH, 20 + 8 * Math.PI);
  const epsilon = 1e-6;
  for (const join of [0, 10, 10 + 4 * Math.PI, 20 + 4 * Math.PI, TRACK_LENGTH]) {
    const before = sampleTrack(join - epsilon);
    const after = sampleTrack(join + epsilon);
    close(before.x, after.x, epsilon * 3);
    close(before.z, after.z, epsilon * 3);
    close(before.tx, after.tx, epsilon);
    close(before.tz, after.tz, epsilon);
  }
  for (let distance = 0; distance < TRACK_LENGTH; distance += 0.17) {
    const point = sampleTrack(distance);
    const next = sampleTrack(distance + epsilon);
    close(Math.hypot(point.tx, point.tz), 1);
    close((next.x - point.x) / epsilon, point.tx, epsilon);
    close((next.z - point.z) / epsilon, point.tz, epsilon);
  }
});

test('negative and multiple-lap distances sample the same continuous track', () => {
  for (const distance of [-4.8, 0, 7.2, 19, TRACK_LENGTH - 0.1]) {
    const point = sampleTrack(distance);
    const wrapped = sampleTrack(distance + TRACK_LENGTH * 3);
    for (const key of ['x', 'z', 'tx', 'tz']) close(point[key], wrapped[key]);
  }
});

test('three independently sampled cars retain spacing and turn separately', () => {
  const spacing = 1.42;
  let distinctOrientations = false;
  for (let lead = 0; lead < TRACK_LENGTH; lead += 0.13) {
    const cars = [0, 1, 2].map((index) => sampleTrack(lead - index * spacing));
    for (let index = 0; index < 2; index += 1) {
      const a = cars[index];
      const b = cars[index + 1];
      const chord = Math.hypot(a.x - b.x, a.z - b.z);
      assert.ok(chord > 1.4 && chord <= spacing + 1e-8);
      if (Math.abs(a.tx - b.tx) + Math.abs(a.tz - b.tz) > 0.1) {
        distinctOrientations = true;
      }
    }
  }
  assert.ok(distinctOrientations);
});

test('the train reaches the station exactly and remains there for two seconds', () => {
  const train = createTrainState();
  advanceTrain(train, arrivalFromStart);
  close(train.distance, STATION_DISTANCE);
  close(train.dwellRemaining, 2);
  assert.equal(train.stops, 1);
  advanceTrain(train, 1.9);
  close(train.distance, STATION_DISTANCE);
  close(train.dwellRemaining, 0.1);
  advanceTrain(train, 0.2);
  close(train.distance, STATION_DISTANCE + 0.1 * BASE_SPEED);
  assert.equal(train.dwellRemaining, 0);
});

test('pausing freezes both the moving train and an in-progress station dwell', () => {
  const train = createTrainState();
  train.running = false;
  const pausedMoving = { ...train };
  advanceTrain(train, 300);
  assert.deepEqual(train, pausedMoving);
  train.running = true;
  advanceTrain(train, arrivalFromStart + 0.75);
  train.running = false;
  const pausedAtStation = { ...train };
  advanceTrain(train, 300);
  assert.deepEqual(train, pausedAtStation);
  train.running = true;
  advanceTrain(train, 1.25);
  close(train.dwellRemaining, 0);
  close(train.distance, STATION_DISTANCE);
});

test('each lap stops once, including when one update spans several laps', () => {
  const train = createTrainState();
  const lapTime = TRACK_LENGTH / BASE_SPEED + 2;
  advanceTrain(train, arrivalFromStart + lapTime * 4 + 0.5);
  assert.equal(train.stops, 5);
  close(train.distance, STATION_DISTANCE);
  close(train.dwellRemaining, 1.5);
});

test('large and fine-grained updates produce equivalent motion and dwell state', () => {
  const largeStep = createTrainState();
  const fineStep = createTrainState();
  largeStep.speed = fineStep.speed = 1.75;
  advanceTrain(largeStep, 180);
  for (let i = 0; i < 10800; i += 1) advanceTrain(fineStep, 1 / 60);
  close(largeStep.distance, fineStep.distance, 1e-7);
  close(largeStep.dwellRemaining, fineStep.dwellRemaining, 1e-7);
  assert.equal(largeStep.stops, fineStep.stops);
});

test('speed affects travel while the station dwell stays two real seconds', () => {
  for (const speed of [0.25, 0.5, 1, 2]) {
    const train = createTrainState();
    train.speed = speed;
    advanceTrain(train, 1);
    close(train.distance, INITIAL_DISTANCE + BASE_SPEED * speed);
    const arrival = createTrainState();
    arrival.speed = speed;
    advanceTrain(arrival, arrivalFromStart / speed + 0.75);
    close(arrival.distance, STATION_DISTANCE);
    close(arrival.dwellRemaining, 1.25);
  }
});

test('creating a fresh state resets all train settings deterministically', () => {
  const train = createTrainState();
  train.speed = 2;
  advanceTrain(train, 100);
  train.running = false;
  Object.assign(train, createTrainState());
  assert.deepEqual(train, {
    distance: INITIAL_DISTANCE,
    speed: 1,
    running: true,
    dwellRemaining: 0,
    stops: 0,
  });
});

test('invalid timing and speed inputs are reported instead of corrupting the state', () => {
  for (const delta of [-1, Infinity, NaN]) {
    assert.throws(() => advanceTrain(createTrainState(), delta), RangeError);
  }
  for (const speed of [0, 3, Infinity]) {
    const train = createTrainState();
    train.speed = speed;
    assert.throws(() => advanceTrain(train, 1), RangeError);
  }
});
