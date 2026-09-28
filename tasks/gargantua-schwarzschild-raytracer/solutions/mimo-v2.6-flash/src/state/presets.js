// Four visually distinct camera poses. Applying one writes the four camera
// parameters, marks the preset active, and hands camera control to the user.

import { setAppField, setParams, setPreset } from './store.js'

export const PRESETS = [
  {
    name: 'Equatorial Vista',
    blurb: 'Textbook view: front and back disk with a strongly lensed sky.',
    fov: 55,
    camDistance: 24,
    camAzimuth: 0.65,
    camElevation: 0.28,
  },
  {
    name: 'Photon Ring Edge',
    blurb: 'Near edge-on: the disk collapses to a blade, secondary arcs stack up.',
    fov: 45,
    camDistance: 12,
    camAzimuth: 1.9,
    camElevation: 0.045,
  },
  {
    name: 'Deep Field',
    blurb: 'Distant wide shot: the whole system floating in lensed starfields.',
    fov: 62,
    camDistance: 55,
    camAzimuth: 4.2,
    camElevation: 0.45,
  },
  {
    name: 'Polar Crown',
    blurb: 'High inclination: the disk reads as a ring, its underside lensed over the top.',
    fov: 50,
    camDistance: 20,
    camAzimuth: 5.4,
    camElevation: 1.15,
  },
]

export function applyPreset(index) {
  const preset = PRESETS[index]
  if (!preset) return false
  setParams({
    fov: preset.fov,
    camDistance: preset.camDistance,
    camAzimuth: preset.camAzimuth,
    camElevation: preset.camElevation,
  })
  setPreset(index)
  // Choosing a preset is a deliberate camera command: the cinematic loop yields.
  setAppField('cinemaPlaying', false)
  setAppField('userHasTakenControl', true)
  return true
}
