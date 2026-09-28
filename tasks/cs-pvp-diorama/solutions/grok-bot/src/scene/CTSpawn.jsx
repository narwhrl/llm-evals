import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Box, Barrel, Crate, Barrier, Ladder, BulletHoles, GraffitiDecal, ConcreteBlock,
} from '../props/Primitives'
import { COLORS } from '../materials/toon'

function PoliceVan({ position }) {
  const siren = useRef()
  useFrame(({ clock }) => {
    if (!siren.current) return
    const t = clock.elapsedTime
    siren.current.intensity = 0.6 + Math.sin(t * 2.2) * 0.55
  })
  return (
    <group position={position}>
      <Box args={[1.5, 1.1, 2.8]} position={[0, 0.75, 0]} color={COLORS.police} />
      <Box args={[1.4, 0.55, 0.9]} position={[0, 1.0, 1.6]} color="#1a2838" />
      <Box args={[1.2, 0.4, 0.08]} position={[0, 1.05, 2.06]} color={COLORS.glass} transparent opacity={0.45} />
      <Box args={[0.5, 0.12, 0.25]} position={[0, 1.4, 0.2]} color="#c02030" outline={false} />
      <pointLight ref={siren} position={[0, 1.55, 0.2]} intensity={1} distance={5} color="#ff2040" />
      <Box args={[0.35, 0.35, 0.2]} position={[-0.55, 0.25, 1.0]} color="#111" outline={false} />
      <Box args={[0.35, 0.35, 0.2]} position={[0.55, 0.25, 1.0]} color="#111" outline={false} />
      <Box args={[0.35, 0.35, 0.2]} position={[-0.55, 0.25, -1.0]} color="#111" outline={false} />
      <Box args={[0.35, 0.35, 0.2]} position={[0.55, 0.25, -1.0]} color="#111" outline={false} />
    </group>
  )
}

function Searchlight({ position }) {
  const light = useRef()
  useFrame(({ clock }) => {
    if (!light.current) return
    const t = clock.elapsedTime
    light.current.intensity = 2.4 + Math.sin(t * 5.1) * 0.25 + (Math.sin(t * 17) > 0.95 ? -0.8 : 0)
    light.current.target.position.set(0, 0.5, 2)
    light.current.target.updateMatrixWorld()
  })
  return (
    <group position={position}>
      <Box args={[0.35, 0.35, 0.45]} position={[0, 0.2, 0]} color={COLORS.metal} />
      <mesh position={[0, 0.35, 0.15]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial color="#fff0c0" />
      </mesh>
      <spotLight
        ref={light}
        position={[0, 0.4, 0]}
        angle={0.45}
        penumbra={0.4}
        intensity={2.4}
        distance={14}
        color="#fff0c8"
        castShadow
      />
    </group>
  )
}

export function CTSpawn() {
  // South side (-Z)
  return (
    <group position={[0, 0, -6.0]}>
      {/* rear wall with badge */}
      <Box args={[8.0, 2.2, 0.25]} position={[0, 1.1, -2.2]} color={COLORS.concrete} />
      <mesh position={[0, 1.3, -2.06]}>
        <circleGeometry args={[0.35, 20]} />
        <meshBasicMaterial color="#3a5a9a" />
      </mesh>
      <mesh position={[0, 1.3, -2.05]}>
        <ringGeometry args={[0.28, 0.38, 20]} />
        <meshBasicMaterial color="#c9a040" />
      </mesh>
      <GraffitiDecal position={[-2.2, 1.2, -2.06]} color="#c9a040" size={[1.4, 0.35]} />

      {/* barricade line */}
      <Barrier position={[-1.8, 0, 1.6]} rotation={[0, 0.1, 0]} />
      <Barrier position={[0, 0, 1.8]} />
      <Barrier position={[1.8, 0, 1.6]} rotation={[0, -0.15, 0]} />
      {/* riot shields */}
      <Box args={[0.55, 0.9, 0.06]} position={[-0.9, 0.55, 1.5]} color="#3a6aaa" />
      <Box args={[0.55, 0.9, 0.06]} position={[0.9, 0.55, 1.5]} color="#3a6aaa" />

      <PoliceVan position={[-2.6, 0, 0.2]} />

      {/* right elevated platform */}
      <Box args={[2.4, 1.1, 2.0]} position={[2.8, 0.55, 0.2]} color={COLORS.concreteDark} />
      <Ladder position={[1.5, 0, 0.6]} height={1.2} />
      {/* stairs */}
      {[0, 1, 2, 3].map((i) => (
        <Box
          key={i}
          args={[0.7, 0.18, 0.45]}
          position={[1.7, 0.1 + i * 0.25, 0.9 - i * 0.15]}
          color={COLORS.concrete}
          outline={false}
        />
      ))}
      <Searchlight position={[2.8, 1.15, 0.5]} />
      <Crate position={[2.3, 1.33, -0.4]} />
      <Barrel position={[3.3, 1.38, -0.3]} />

      {/* gear crates */}
      <Box args={[0.7, 0.4, 0.5]} position={[-3.4, 0.2, -1.2]} color="#3a4540" />
      <Box args={[0.35, 0.25, 0.3]} position={[-3.4, 0.55, -1.2]} color="#2a3530" />
      <ConcreteBlock position={[0.5, 0.23, 0.8]} />
      <Crate position={[-1.2, 0.23, 0.5]} />
      <BulletHoles position={[0, 1.0, -2.06]} />

      {/* route splits: left to mid, right to B flank */}
      <Box args={[0.3, 0.9, 1.5]} position={[-1.5, 0.45, 2.4]} color={COLORS.concrete} />
      <Box args={[0.3, 0.9, 1.5]} position={[1.5, 0.45, 2.4]} color={COLORS.concrete} />
    </group>
  )
}
