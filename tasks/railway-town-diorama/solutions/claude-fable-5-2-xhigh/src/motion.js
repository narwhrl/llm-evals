// Train motion along the loop: pure state, no rendering. s is the locomotive's arc length in [0, LENGTH).
import { LENGTH, pointAt } from './track.js'

export const CRUISE = 5
export const DWELL = 2
export const START_S = 56
// Arc-length distance of each vehicle's centre behind the locomotive's centre.
export const OFFSETS = [0, 3.3, 6.4]

const ACCEL = 2.2
const CREEP = 0.25
const BOGIE = 0.9

export function resetTrain(train = {}) {
  train.s = START_S
  train.v = CRUISE
  train.dwell = 0
  train.running = true
  train.factor = 1
  return train
}

export function stepTrain(train, dt) {
  if (!train.running) return
  if (train.dwell > 0) {
    train.dwell = Math.max(0, train.dwell - dt)
    return
  }
  const target = CRUISE * train.factor
  const toStop = LENGTH - train.s
  const v = train.v < target ? Math.min(target, train.v + ACCEL * dt) : Math.max(target, train.v - ACCEL * dt)
  train.v = Math.min(v, Math.sqrt(2 * ACCEL * toStop) + CREEP)
  if (train.v * dt >= toStop) {
    train.s = 0
    train.v = 0
    train.dwell = DWELL
  } else {
    train.s += train.v * dt
  }
}

const front = {}
const rear = {}

// A vehicle rides on two bogies that each sit on the track; its body spans the chord between them.
export function vehiclePose(s, out = {}) {
  pointAt(s + BOGIE, front)
  pointAt(s - BOGIE, rear)
  out.x = (front.x + rear.x) / 2
  out.z = (front.z + rear.z) / 2
  out.yaw = Math.atan2(rear.z - front.z, front.x - rear.x)
  return out
}
