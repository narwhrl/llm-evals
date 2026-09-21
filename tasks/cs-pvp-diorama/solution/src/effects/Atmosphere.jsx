import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
export function Lightning() {
  const light = useRef()
  useFrame(({ clock }) => {
    if (!light.current) return
    const t = clock.elapsedTime
    // rare flash
    const flash = Math.sin(t * 0.17) > 0.992 || Math.sin(t * 0.31 + 1.7) > 0.995
    light.current.intensity = flash ? 4 + Math.random() * 3 : 0
  })
  return <pointLight ref={light} position={[0, 12, -4]} intensity={0} distance={40} color="#c8d8ff" />
}

export function SteamVents() {
  const refs = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    refs.current.forEach((m, i) => {
      if (!m) return
      m.position.y = 1.2 + Math.sin(t * 0.8 + i) * 0.15 + ((t * 0.3 + i) % 1) * 0.8
      m.material.opacity = 0.12 + Math.sin(t + i) * 0.04
      m.scale.setScalar(0.4 + ((t * 0.3 + i) % 1) * 0.6)
    })
  })
  const vents = [
    [-5.5, 1.2, 1.5],
    [2.6, 1.2, -1.5],
    [5.5, 1.0, 2.0],
    [-2.0, 1.0, -2.0],
  ]
  return (
    <group>
      {vents.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          position={p}
        >
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshBasicMaterial color="#d8e4f0" transparent opacity={0.12} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

export function Wires() {
  // simple hanging wire curves as thin boxes / tubes
  const spans = [
    { from: [-4.5, 3.8, 5.5], to: [4.0, 3.8, 5.8] },
    { from: [-5.0, 3.4, -4.5], to: [5.5, 3.4, -4.0] },
    { from: [-4.5, 3.6, 5.5], to: [-5.0, 3.4, -4.5] },
  ]
  return (
    <group>
      {spans.map((s, i) => {
        const mid = [
          (s.from[0] + s.to[0]) / 2,
          (s.from[1] + s.to[1]) / 2 - 0.45,
          (s.from[2] + s.to[2]) / 2,
        ]
        const dx = s.to[0] - s.from[0]
        const dy = s.to[1] - s.from[1]
        const dz = s.to[2] - s.from[2]
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const yaw = Math.atan2(dx, dz)
        return (
          <group key={i}>
            <mesh position={mid} rotation={[0.15, yaw, 0]}>
              <cylinderGeometry args={[0.015, 0.015, len, 4]} />
              <meshBasicMaterial color="#12141a" />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
