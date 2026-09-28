export const PALETTE = {
  linen: '#ece7dd',
  linenDeep: '#e2dccd',
  ink: '#2b2723',
  inkSoft: '#57503f',
  warp: '#948b76',
  warpLight: '#a89f89',
  warpShadow: '#7c7361',
  indigo: '#2f4858',
  indigoLight: '#41617a',
  madder: '#a4432f',
  madderLight: '#bc5a41',
  gold: '#b98a2f',
  beam: '#6b5138',
  beamEdge: '#503b27',
  brokenTint: '#b37a5e',
} as const

export type WeftColor = 'indigo' | 'madder' | 'gold'

export const WEFT_HEX: Record<WeftColor, string> = {
  indigo: PALETTE.indigo,
  madder: PALETTE.madder,
  gold: PALETTE.gold,
}

/** 在 #rrggbb 上做明度抖动，让织纹有手工感 */
export function shade(hex: string, delta: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.max(0, ((n >> 16) & 255) + delta))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 255) + delta))
  const b = Math.min(255, Math.max(0, (n & 255) + delta))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
