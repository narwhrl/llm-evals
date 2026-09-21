import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const DRIP_SOURCES = [
  [-5.2, 3.1, 5.3], // A shutter
  [-2.8, 2.8, 3.2],
  [2.0, 2.4, 0.2], // mid door area
  [5.8, 2.0, 3.0], // B roof
  [2.2, 3.0, 7.0], // containers
  [-4.0, 2.5, 6.5],
  [0.5, 2.5, -0.2],
]

export function Drips() {
  const refs = useRef([])
  const seeds = useMemo(() => DRIP_SOURCES.map(() => Math.random() * 3), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const phase = (t * 1.4 + seeds[i]) % 1.8
      mesh.position.y = DRIP_SOURCES[i][1] - phase * 2.4
      mesh.position.x = DRIP_SOURCES[i][0]
      mesh.position.z = DRIP_SOURCES[i][2]
      mesh.scale.y = 0.3 + phase * 0.8
      mesh.material.opacity = Math.max(0, 0.7 - phase * 0.35)
    })
  })

  return (
    <group>
      {DRIP_SOURCES.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          position={p}
        >
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshBasicMaterial color="#9ab4c8" transparent opacity={0.6} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
