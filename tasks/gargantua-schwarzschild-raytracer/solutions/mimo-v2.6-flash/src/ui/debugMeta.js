// Descriptions for the ten debug views. The same table drives the HUD badge and
// the keyboard handler, so the numbered view and its label can never drift apart.

export const DEBUG_VIEWS = [
  {
    index: 0,
    name: 'Final image',
    description: 'Composed HDR radiance through bloom, ACES tone mapping and the lens effects.',
  },
  {
    index: 1,
    name: 'Geodesic steps',
    description: 'Step-count heatmap coloured by termination class: blue captured, red budget exhausted.',
  },
  {
    index: 2,
    name: 'Horizon mask',
    description: 'White where the ray ends inside r_s, orange rim for grazing rays, cyan on the photon sphere.',
  },
  {
    index: 3,
    name: 'Disk crossings / order',
    description: 'Piercing points by image order: green primary, cyan secondary, magenta higher-order.',
  },
  {
    index: 4,
    name: 'Doppler / redshift g',
    description: 'Combined beaming and gravitational redshift at the last disk crossing (0.4 – 2.0).',
  },
  {
    index: 5,
    name: 'Lensed sky direction',
    description: 'Final ray direction encoded as RGB: the gravitational lens map of the background.',
  },
  {
    index: 6,
    name: 'Stars / galaxy only',
    description: 'Procedural background alone, lensed and Reinhard-mapped, with the disk removed.',
  },
  {
    index: 7,
    name: 'Raw HDR radiance',
    description: 'Pre-bloom linear radiance shown through a fixed-white-point log curve instead of ACES.',
  },
  {
    index: 8,
    name: 'Disk temperature',
    description: 'Novikov-Thorne temperature at the last crossing, 1000 K – 15000 K heat ramp.',
  },
  {
    index: 9,
    name: 'Impact parameter',
    description: 'Impact parameter over the critical b = 3√3 M, with the critical curve drawn in white.',
  },
]

export function debugMeta(index) {
  return DEBUG_VIEWS[index] || DEBUG_VIEWS[0]
}
