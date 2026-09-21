import { useMemo } from 'react'
import { Outlines } from '@react-three/drei'
import { COLORS, toon } from '../materials/toon'

const BASE = 18

export function SquareBase() {
  const side = useMemo(() => toon(COLORS.concrete), [])
  const top = useMemo(() => toon(COLORS.asphalt), [])
  const lip = useMemo(() => toon(COLORS.concreteDark), [])

  return (
    <group>
      {/* pedestal body */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow material={side}>
        <boxGeometry args={[BASE, 0.7, BASE]} />
        <Outlines thickness={0.035} color="#0a0c10" />
      </mesh>
      {/* wet asphalt top */}
      <mesh position={[0, 0.01, 0]} receiveShadow material={top} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BASE - 0.35, BASE - 0.35]} />
      </mesh>
      {/* rim */}
      <mesh position={[0, 0.05, 0]} material={lip}>
        <boxGeometry args={[BASE - 0.05, 0.08, BASE - 0.05]} />
      </mesh>
      {/* corner bevels for miniature look */}
      {[
        [BASE / 2 - 0.15, 0.12, BASE / 2 - 0.15],
        [-BASE / 2 + 0.15, 0.12, BASE / 2 - 0.15],
        [BASE / 2 - 0.15, 0.12, -BASE / 2 + 0.15],
        [-BASE / 2 + 0.15, 0.12, -BASE / 2 + 0.15],
      ].map((p, i) => (
        <mesh key={i} position={p} material={lip}>
          <boxGeometry args={[0.25, 0.12, 0.25]} />
        </mesh>
      ))}
    </group>
  )
}

export const MAP_SIZE = BASE
