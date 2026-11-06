const STRAIGHT_LENGTH = 10;
const RADIUS = 4;
const HALF_CIRCLE_LENGTH = Math.PI * RADIUS;
const BASE_SPEED = 1.55;
const STATION_DWELL = 2;

export const TRACK_LENGTH = STRAIGHT_LENGTH * 2 + HALF_CIRCLE_LENGTH * 2;
export const STATION_DISTANCE = 5;
export const INITIAL_DISTANCE = 8.2;

function wrapDistance(distance) {
  return ((distance % TRACK_LENGTH) + TRACK_LENGTH) % TRACK_LENGTH;
}

export function sampleTrack(distance) {
  const d = wrapDistance(distance);

  if (d < STRAIGHT_LENGTH) {
    return { x: -5 + d, z: RADIUS, tx: 1, tz: 0 };
  }

  if (d < STRAIGHT_LENGTH + HALF_CIRCLE_LENGTH) {
    const angle = (d - STRAIGHT_LENGTH) / RADIUS;
    return {
      x: 5 + RADIUS * Math.sin(angle),
      z: RADIUS * Math.cos(angle),
      tx: Math.cos(angle),
      tz: -Math.sin(angle),
    };
  }

  if (d < STRAIGHT_LENGTH * 2 + HALF_CIRCLE_LENGTH) {
    return {
      x: 5 - (d - STRAIGHT_LENGTH - HALF_CIRCLE_LENGTH),
      z: -RADIUS,
      tx: -1,
      tz: 0,
    };
  }

  const angle = (d - STRAIGHT_LENGTH * 2 - HALF_CIRCLE_LENGTH) / RADIUS;
  return {
    x: -5 - RADIUS * Math.sin(angle),
    z: -RADIUS * Math.cos(angle),
    tx: -Math.cos(angle),
    tz: Math.sin(angle),
  };
}

export function createTrainState() {
  return {
    distance: INITIAL_DISTANCE,
    speed: 1,
    running: true,
    dwellRemaining: 0,
    stops: 0,
  };
}

export function advanceTrain(state, deltaSeconds) {
  if (!Number.isFinite(deltaSeconds) || deltaSeconds < 0) {
    throw new RangeError('deltaSeconds must be a finite non-negative number');
  }
  if (!state.running || deltaSeconds === 0) return state;

  const velocity = BASE_SPEED * state.speed;
  if (!Number.isFinite(velocity) || state.speed < 0.25 || state.speed > 2) {
    throw new RangeError('speed must be between 0.25 and 2');
  }

  let remaining = deltaSeconds;
  while (remaining > 0) {
    if (state.dwellRemaining > 0) {
      const consumed = Math.min(remaining, state.dwellRemaining);
      state.dwellRemaining -= consumed;
      remaining -= consumed;
      continue;
    }

    // A train exactly at the station with no dwell left has already stopped here.
    const stationAhead = wrapDistance(STATION_DISTANCE - state.distance) || TRACK_LENGTH;
    const arrivalTime = stationAhead / velocity;
    if (remaining < arrivalTime) {
      state.distance = wrapDistance(state.distance + remaining * velocity);
      remaining = 0;
    } else {
      state.distance = STATION_DISTANCE;
      state.dwellRemaining = STATION_DWELL;
      state.stops += 1;
      remaining -= arrivalTime;
    }
  }

  return state;
}
