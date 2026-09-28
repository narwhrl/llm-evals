import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Box, Crate, Barrel, Ladder, TrashBin, Tire, CardboardStack, Barrier, GraffitiDecal, BulletHoles,
} from '../props/Primitives'
import { COLORS } from '../materials/toon'

function GuardHouse() {
  return (
    <group position={[0.8, 0, -0.4]}>
      <Box args={[2.4, 2.0, 2.2]} position={[0, 1.0, 0]} color={COLORS.tin} />
      <Box args={[2.5, 0.1, 2.3]} position={[0, 2.05, 0]} color={COLORS.metalRust} />
      {/* windows */}
      <Box args={[0.8, 0.55, 0.05]} position={[0, 1.2, 1.12]} color={COLORS.glass} transparent opacity={0.4} />
      <Box args={[0.05, 0.55, 0.7]} position={[1.22, 1.2, 0]} color={COLORS.glass} transparent opacity={0.35} />
      {/* doors front/back */}
      <Box args={[0.7, 1.3, 0.08]} position={[-0.4, 0.65, 1.12]} color={COLORS.woodDark} />
      <Box args={[0.7, 1.3, 0.08]} position={[0.3, 0.65, -1.12]} color={COLORS.wood} />
      {/* interior props */}
      <Box args={[0.9, 0.45, 0.5]} position={[0.2, 0.4, 0.1]} color="#4a3a2a" />
      <Box args={[0.3, 0.55, 0.3]} position={[-0.5, 0.35, -0.3]} rotation={[0.2, 0.4, 0.1]} color="#3a4550" />
      <Box args={[0.5, 1.1, 0.4]} position={[0.85, 0.55, -0.5]} color={COLORS.metal} />
      <Box args={[0.25, 0.12, 0.15]} position={[0.1, 0.68, 0.15]} color="#2a2a2a" />
      <Box args={[0.12, 0.18, 0.12]} position={[0.35, 0.72, 0.2]} color="#6a4a2a" />
      {/* duty roster */}
      <mesh position={[-1.15, 1.3, 0.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.5, 0.7]} />
        <meshBasicMaterial color="#d8d0b8" />
      </mesh>
      {/* warm broken fluorescent */}
      <pointLight position={[0, 1.75, 0]} intensity={1.4} distance={4} color="#ffc070" />
      <Box args={[0.9, 0.08, 0.12]} position={[0, 1.85, 0]} color="#e8e0c0" outline={false} />
    </group>
  )
}

function StreetLamp({ position }) {
  const light = useRef()
  useFrame(({ clock }) => {
    if (!light.current) return
    const t = clock.elapsedTime
    const flicker = 1.6 + Math.sin(t * 7.3) * 0.15 + (Math.random() > 0.97 ? -0.4 : 0)
    light.current.intensity = flicker
  })
  return (
    <group position={position}>
      <Box args={[0.1, 2.8, 0.1]} position={[0, 1.4, 0]} color={COLORS.metal} outline={false} />
      <Box args={[0.5, 0.12, 0.2]} position={[0.15, 2.75, 0]} color={COLORS.metalRust} outline={false} />
      <mesh position={[0.35, 2.65, 0]}>
        <sphereGeometry args={[0.12, 10, 10]} />
        <meshBasicMaterial color="#ffcc88" />
      </mesh>
      <pointLight ref={light} position={[0.35, 2.5, 0]} intensity={1.6} distance={6} color="#ffb060" castShadow />
    </group>
  )
}

export function BSite() {
  // Northeast alley
  return (
    <group position={[5.0, 0, 3.0]}>
      <GuardHouse />

      {/* bomb mark on pavement in front */}
      <mesh position={[-0.6, 0.03, 1.5]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <ringGeometry args={[0.5, 0.65, 20]} />
        <meshBasicMaterial color={COLORS.bombMark} transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.6, 0.032, 1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 4 + 0.2]}>
        <planeGeometry args={[0.8, 0.1]} />
        <meshBasicMaterial color={COLORS.bombMark} transparent opacity={0.65} />
      </mesh>

      {/* irregular cover */}
      <Box args={[0.9, 0.25, 0.7]} position={[-1.5, 0.13, 1.2]} color={COLORS.woodDark} />
      <TrashBin position={[-1.8, 0, 2.0]} />
      <TrashBin position={[-1.3, 0, 2.2]} />
      {/* bicycle silhouette */}
      <group position={[0.2, 0, 2.0]} rotation={[0, 0.6, 0]}>
        <Box args={[0.08, 0.08, 1.0]} position={[0, 0.35, 0]} color={COLORS.metal} outline={false} />
        <Tire position={[0, 0.28, 0.4]} rotation={[Math.PI / 2, 0, 0]} />
        <Tire position={[0, 0.28, -0.4]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      {/* overturned table/chairs */}
      <Box args={[0.8, 0.08, 0.5]} position={[-0.2, 0.35, 0.8]} rotation={[0.9, 0.2, 0.3]} color="#5a4a3a" />
      <Box args={[0.35, 0.45, 0.35]} position={[0.4, 0.25, 1.0]} rotation={[0.3, 0, 0.5]} color="#3a4550" />

      {/* fire escape to balcony */}
      <Ladder position={[2.1, 0, 0.4]} height={2.4} />
      <Box args={[1.5, 0.12, 1.0]} position={[1.5, 2.35, 0.6]} color={COLORS.metal} />
      <Box args={[1.5, 0.55, 0.08]} position={[1.5, 2.7, 1.05]} color={COLORS.metalRust} />
      <Box args={[0.08, 0.55, 1.0]} position={[0.75, 2.7, 0.6]} color={COLORS.metal} outline={false} />
      <Box args={[0.08, 0.55, 1.0]} position={[2.25, 2.7, 0.6]} color={COLORS.metal} outline={false} />

      <StreetLamp position={[-2.2, 0, 0.5]} />

      {/* corner short wall / CT shortcut */}
      <Box args={[1.5, 0.85, 0.25]} position={[-0.5, 0.42, -2.0]} color={COLORS.concreteDark} />
      <Crate position={[0.5, 0.23, -1.8]} />
      <Barrel position={[1.8, 0.28, 1.6]} />
      <CardboardStack position={[-2.0, 0, -0.5]} />
      <Barrier position={[-2.4, 0, 1.4]} rotation={[0, 0.5, 0]} />
      <GraffitiDecal position={[-0.4, 1.2, 1.12]} color={COLORS.graffitiBlue} size={[0.7, 0.4]} />
      <BulletHoles position={[1.22, 1.0, 0.5]} rotation={[0, -Math.PI / 2, 0]} />

      {/* alley walls */}
      <Box args={[0.25, 2.5, 5.0]} position={[3.0, 1.25, 0]} color={COLORS.concrete} />
      <Box args={[4.0, 2.2, 0.25]} position={[0.5, 1.1, -2.6]} color={COLORS.warehouse} />
    </group>
  )
}
