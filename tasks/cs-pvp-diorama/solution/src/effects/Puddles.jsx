import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PUDDLE_SPOTS = [
  [0, 0.025, 1.4],
  [0, 0.025, -1.2],
  [-2.5, 0.025, 4.5],
  [1.5, 0.025, 5.0],
  [-4.5, 0.025, 2.0],
  [4.0, 0.025, 2.5],
  [-1.0, 0.025, -4.5],
  [2.5, 0.025, -5.0],
  [-6.5, 0.025, 1.0],
  [3.5, 0.025, -2.0],
  [-0.5, 0.025, 3.2],
  [5.0, 0.025, 4.2],
]

function Puddle({ position, scale = 1 }) {
  const mat = useRef()
  useFrame(({ clock }) => {
    if (!mat.current) return
    mat.current.opacity = 0.55 + Math.sin(clock.elapsedTime * 2.5 + position[0]) * 0.05
  })
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, scale * 1.7]} scale={scale}>
      <circleGeometry args={[0.55, 20]} />
      <meshStandardMaterial
        ref={mat}
        color="#152030"
        metalness={0.95}
        roughness={0.08}
        transparent
        opacity={0.6}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}

export function Puddles() {
  const spots = useMemo(
    () =>
      PUDDLE_SPOTS.map((p, i) => ({
        position: p,
        scale: 0.7 + (i % 4) * 0.25,
      })),
    [],
  )
  return (
    <group>
      {spots.map((s, i) => (
        <Puddle key={i} position={s.position} scale={s.scale} />
      ))}
    </group>
  )
}
