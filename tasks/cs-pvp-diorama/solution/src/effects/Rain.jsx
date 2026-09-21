import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 1400

export function Rain() {
  const ref = useRef()
  const velocities = useMemo(() => {
    const v = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) v[i] = 6 + Math.random() * 5
    return v
  }, [])

  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 17
      p[i * 3 + 1] = Math.random() * 10 + 0.5
      p[i * 3 + 2] = (Math.random() - 0.5) * 17
    }
    return p
  }, [])

  useFrame((_, dt) => {
    const attr = ref.current.geometry.attributes.position
    const arr = attr.array
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] -= velocities[i] * dt
      arr[i * 3] += dt * 0.4
      if (arr[i * 3 + 1] < 0.05) {
        arr[i * 3 + 1] = 8 + Math.random() * 3
        arr[i * 3] = (Math.random() - 0.5) * 17
        arr[i * 3 + 2] = (Math.random() - 0.5) * 17
      }
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a8c0d8"
        size={0.045}
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
