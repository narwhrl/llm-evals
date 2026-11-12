// Closed rail loop as exact lines and arcs in the x/z plane, parameterised by arc length.
// s = 0 is the point where the locomotive stops at the station; travel is clockwise seen from above.

export const STATION_X = -5.4
export const TRACK_Z = 9

const HALF_X = 15
const WEST_R = 7
const EAST_R = 5

// [length, radius] — radius 0 is a straight; every arc is a quarter turn in the same direction.
const PLAN = [
  [STATION_X + HALF_X - WEST_R, 0],
  [(Math.PI / 2) * WEST_R, WEST_R],
  [2 * (TRACK_Z - WEST_R), 0],
  [(Math.PI / 2) * WEST_R, WEST_R],
  [2 * HALF_X - WEST_R - EAST_R, 0],
  [(Math.PI / 2) * EAST_R, EAST_R],
  [2 * (TRACK_Z - EAST_R), 0],
  [(Math.PI / 2) * EAST_R, EAST_R],
  [HALF_X - EAST_R - STATION_X, 0],
]

const segments = []
let total = 0
{
  let x = STATION_X
  let z = TRACK_Z
  let heading = Math.PI
  for (const [length, radius] of PLAN) {
    segments.push({ start: total, length, radius, x, z, heading })
    if (radius) {
      const cx = x - Math.sin(heading) * radius
      const cz = z + Math.cos(heading) * radius
      heading += length / radius
      x = cx + Math.sin(heading) * radius
      z = cz - Math.cos(heading) * radius
    } else {
      x += Math.cos(heading) * length
      z += Math.sin(heading) * length
    }
    total += length
  }
}

export const LENGTH = total

// Writes position (x, z) and unit tangent (tx, tz) at arc length s into out.
export function pointAt(s, out = {}) {
  s = ((s % LENGTH) + LENGTH) % LENGTH
  let seg = segments[0]
  for (const candidate of segments) {
    if (s >= candidate.start) seg = candidate
  }
  const d = s - seg.start
  if (seg.radius) {
    const cx = seg.x - Math.sin(seg.heading) * seg.radius
    const cz = seg.z + Math.cos(seg.heading) * seg.radius
    const heading = seg.heading + d / seg.radius
    out.x = cx + Math.sin(heading) * seg.radius
    out.z = cz - Math.cos(heading) * seg.radius
    out.tx = Math.cos(heading)
    out.tz = Math.sin(heading)
  } else {
    out.tx = Math.cos(seg.heading)
    out.tz = Math.sin(seg.heading)
    out.x = seg.x + out.tx * d
    out.z = seg.z + out.tz * d
  }
  return out
}
