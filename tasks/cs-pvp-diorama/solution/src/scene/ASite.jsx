import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Box, Barrel, Crate, Ladder, CardboardStack, TrashBin, GraffitiDecal, BulletHoles, ConcreteBlock,
} from '../props/Primitives'
import { COLORS } from '../materials/toon'

function Shelving({ position }) {
  return (
    <group position={position}>
      {[0, 0.55, 1.1, 1.65, 2.2].map((y, i) => (
        <Box key={i} args={[1.8, 0.06, 0.55]} position={[0, y, 0]} color={COLORS.metal} outline={false} />
      ))}
      <Box args={[0.06, 2.3, 0.06]} position={[-0.85, 1.15, -0.22]} color={COLORS.metalRust} outline={false} />
      <Box args={[0.06, 2.3, 0.06]} position={[0.85, 1.15, -0.22]} color={COLORS.metalRust} outline={false} />
      <Box args={[0.06, 2.3, 0.06]} position={[-0.85, 1.15, 0.22]} color={COLORS.metalRust} outline={false} />
      <Box args={[0.06, 2.3, 0.06]} position={[0.85, 1.15, 0.22]} color={COLORS.metalRust} outline={false} />
      <Crate position={[-0.4, 0.28, 0]} size={[0.4, 0.35, 0.4]} />
      <Crate position={[0.35, 0.85, 0]} size={[0.35, 0.3, 0.35]} color={COLORS.woodDark} />
      <Box args={[0.45, 0.35, 0.3]} position={[0.4, 0.28, 0]} color="#8a7a5a" />
    </group>
  )
}

function Shutter({ position }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    // occasional subtle vibration
    const buzz = Math.sin(t * 40) * 0.002 * (Math.sin(t * 0.35) > 0.92 ? 1 : 0)
    ref.current.position.y = position[1] + buzz
    ref.current.rotation.z = buzz * 2
  })
  return (
    <group ref={ref} position={position}>
      <Box args={[2.8, 1.6, 0.08]} color={COLORS.metalRust} />
      {Array.from({ length: 8 }, (_, i) => (
        <Box
          key={i}
          args={[2.75, 0.04, 0.02]}
          position={[0, -0.7 + i * 0.2, 0.05]}
          color={COLORS.metal}
          outline={false}
        />
      ))}
    </group>
  )
}

export function ASite() {
  // Northwest warehouse
  return (
    <group position={[-5.2, 0, 3.2]}>
      {/* warehouse shell — open front */}
      <Box args={[5.2, 3.2, 0.2]} position={[0, 1.6, -2.2]} color={COLORS.warehouse} />
      <Box args={[0.2, 3.2, 4.4]} position={[-2.5, 1.6, 0]} color={COLORS.warehouse} />
      <Box args={[0.2, 3.2, 4.4]} position={[2.5, 1.6, 0]} color={COLORS.warehouse} />
      <Box args={[5.2, 0.15, 4.6]} position={[0, 3.25, 0]} color={COLORS.tin} />
      {/* half-open shutter */}
      <Shutter position={[0, 2.4, 2.15]} />
      {/* side boarded windows */}
      <Box args={[0.08, 0.7, 0.9]} position={[-2.55, 1.6, 0.6]} color={COLORS.woodDark} />
      <Box args={[0.08, 0.7, 0.9]} position={[-2.55, 1.6, -0.8]} color={COLORS.woodDark} />
      <Box args={[0.12, 1.4, 0.7]} position={[2.55, 0.9, 0.3]} color={COLORS.wood} />

      {/* bomb plant mark */}
      <mesh position={[0, 0.03, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.7, 24]} />
        <meshBasicMaterial color={COLORS.bombMark} transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0.032, 0.2]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[0.9, 0.12]} />
        <meshBasicMaterial color={COLORS.bombMark} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.033, 0.2]} rotation={[-Math.PI / 2, 0, -Math.PI / 4]}>
        <planeGeometry args={[0.9, 0.12]} />
        <meshBasicMaterial color={COLORS.bombMark} transparent opacity={0.7} />
      </mesh>

      {/* center pillar peek */}
      <Box args={[0.45, 3.0, 0.45]} position={[0.2, 1.5, -0.4]} color={COLORS.concreteDark} />

      <Shelving position={[-1.4, 0, -1.2]} />
      <Crate position={[1.3, 0.23, 0.8]} />
      <Crate position={[1.6, 0.23, 0.3]} size={[0.4, 0.4, 0.4]} />
      <Crate position={[1.4, 0.65, 0.55]} size={[0.35, 0.3, 0.35]} />
      <Box args={[0.5, 0.4, 0.4]} position={[-1.5, 0.2, 1.0]} color="#7a6a4a" />
      <Box args={[0.5, 0.4, 0.4]} position={[-1.5, 0.6, 1.0]} color="#6a5a3a" />

      {/* loft + iron ladder */}
      <Box args={[1.6, 0.12, 1.4]} position={[1.5, 2.2, -1.4]} color={COLORS.metal} />
      <Box args={[1.6, 0.8, 0.08]} position={[1.5, 2.65, -2.05]} color={COLORS.tin} />
      <Box args={[0.5, 0.4, 0.05]} position={[1.5, 2.55, -2.08]} color={COLORS.glass} transparent opacity={0.4} />
      <Ladder position={[0.55, 0, -1.4]} height={2.3} />

      {/* forklift silhouette */}
      <group position={[-0.8, 0, 1.4]}>
        <Box args={[0.7, 0.45, 1.1]} position={[0, 0.35, 0]} color="#c9a020" />
        <Box args={[0.15, 1.2, 0.15]} position={[0.2, 0.9, 0.55]} color={COLORS.metal} />
        <Box args={[0.15, 1.2, 0.15]} position={[-0.2, 0.9, 0.55]} color={COLORS.metal} />
        <Box args={[0.5, 0.08, 0.6]} position={[0, 0.55, 0.9]} color={COLORS.metalRust} />
      </group>

      {/* exterior props */}
      <Box args={[0.45, 0.7, 0.35]} position={[-2.9, 0.35, 1.8]} color="#4a5550" />
      <TrashBin position={[2.9, 0, 1.6]} />
      <Box args={[0.8, 1.0, 0.08]} position={[-2.9, 0.9, 0.5]} rotation={[0, 0.4, 0]} color={COLORS.metal} />
      <GraffitiDecal position={[2.55, 1.4, 1.2]} rotation={[0, -Math.PI / 2, 0]} color={COLORS.graffitiBlue} />
      <BulletHoles position={[-2.48, 1.2, 1.4]} rotation={[0, Math.PI / 2, 0]} />
      <CardboardStack position={[2.0, 0, 1.9]} />
      <Barrel position={[2.3, 0.28, -1.8]} />
      <ConcreteBlock position={[-2.0, 0.23, 2.0]} />

      {/* cold warehouse light */}
      <pointLight position={[0, 2.9, 0]} intensity={2.2} distance={7} color="#c8d8f0" castShadow />
      {/* back room red glow */}
      <pointLight position={[1.8, 1.2, -1.9]} intensity={0.8} distance={3} color="#ff3040" />
      <Box args={[0.5, 1.2, 0.08]} position={[2.2, 0.9, -2.05]} color="#2a2020" />
    </group>
  )
}
