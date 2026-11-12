import assert from 'node:assert/strict'
import test from 'node:test'
import { LENGTH, pointAt } from '../src/track.js'
import { DWELL, OFFSETS, START_S, resetTrain, stepTrain, vehiclePose } from '../src/motion.js'

const DT = 1 / 60

test('track is one closed, continuous loop', () => {
  assert.ok(Math.abs(LENGTH - (48 + 12 * Math.PI)) < 1e-9)
  const step = 0.01
  let prev = pointAt(-step)
  for (let s = 0; s < LENGTH; s += step) {
    const p = pointAt(s)
    assert.ok(Math.abs(Math.hypot(p.x - prev.x, p.z - prev.z) - step) < 1e-4, `gap at s=${s}`)
    assert.ok(p.tx * prev.tx + p.tz * prev.tz > 0.9999, `kink at s=${s}`)
    prev = p
  }
})

test('train dwells about two seconds on every arrival', () => {
  const train = resetTrain()
  const dwells = []
  let dwelling = 0
  for (let i = 0; i < 60 * 90 && dwells.length < 3; i++) {
    stepTrain(train, DT)
    if (train.dwell > 0) dwelling += DT
    else if (dwelling) {
      dwells.push(dwelling)
      dwelling = 0
    }
  }
  assert.equal(dwells.length, 3)
  for (const d of dwells) assert.ok(Math.abs(d - DWELL) < 0.05, `dwell ${d}`)
})

test('pause freezes both the train and the dwell timer', () => {
  const train = resetTrain()
  train.running = false
  for (let i = 0; i < 120; i++) stepTrain(train, DT)
  assert.equal(train.s, START_S)

  train.running = true
  while (train.dwell === 0) stepTrain(train, DT)
  for (let i = 0; i < 30; i++) stepTrain(train, DT)
  const { dwell } = train
  train.running = false
  for (let i = 0; i < 120; i++) stepTrain(train, DT)
  assert.equal(train.dwell, dwell)
  assert.equal(train.s, 0)
})

test('vehicles keep their spacing and face along the track through curves', () => {
  for (let s = 0; s < LENGTH; s += 0.05) {
    const poses = OFFSETS.map((offset) => vehiclePose(s - offset))
    for (let i = 1; i < poses.length; i++) {
      const gap = Math.hypot(poses[i].x - poses[i - 1].x, poses[i].z - poses[i - 1].z)
      const nominal = OFFSETS[i] - OFFSETS[i - 1]
      assert.ok(Math.abs(gap - nominal) < 0.12, `gap ${gap} at s=${s}`)
    }
    const t = pointAt(s)
    const along = Math.cos(poses[0].yaw) * t.tx - Math.sin(poses[0].yaw) * t.tz
    // The body follows the chord between its bogies, so it leans a few degrees off the tangent where a curve begins.
    assert.ok(along > 0.995, `heading off track at s=${s}`)
  }
})

test('reset restores the same state from any state', () => {
  const train = resetTrain()
  const initial = { ...train }
  train.factor = 2.5
  for (let i = 0; i < 700; i++) stepTrain(train, DT)
  assert.deepEqual({ ...resetTrain(train) }, initial)
})
