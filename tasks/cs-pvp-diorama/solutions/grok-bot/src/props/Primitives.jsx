import { useMemo } from 'react'
import { Outlines } from '@react-three/drei'
import { COLORS, toon } from '../materials/toon'

export function Box({
  args = [1, 1, 1],
  color = COLORS.concrete,
  position,
  rotation,
  scale,
  castShadow = true,
  receiveShadow = true,
  outline = true,
  opacity,
  transparent,
}) {
  const mat = useMemo(() => {
    const m = toon(color)
    if (transparent) {
      m.transparent = true
      m.opacity = opacity ?? 0.6
    }
    return m
  }, [color, transparent, opacity])
  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      material={mat}
    >
      <boxGeometry args={args} />
      {outline && <Outlines thickness={0.02} color="#0c0e12" />}
    </mesh>
  )
}

export function Cyl({
  args = [0.3, 0.3, 0.8, 12],
  color = COLORS.blueBarrel,
  position,
  rotation,
  scale,
  castShadow = true,
  outline = true,
}) {
  const mat = useMemo(() => toon(color), [color])
  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow={castShadow}
      receiveShadow
      material={mat}
    >
      <cylinderGeometry args={args} />
      {outline && <Outlines thickness={0.018} color="#0c0e12" />}
    </mesh>
  )
}

export function Crate({ position, rotation, size = [0.55, 0.45, 0.55], color = COLORS.wood }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={size} color={color} />
      <Box
        args={[size[0] + 0.02, 0.04, size[2] + 0.02]}
        position={[0, size[1] / 2 + 0.01, 0]}
        color={COLORS.woodDark}
        outline={false}
      />
      <Box
        args={[0.04, size[1], size[2] + 0.01]}
        position={[-size[0] / 2, 0, 0]}
        color={COLORS.woodDark}
        outline={false}
      />
      <Box
        args={[0.04, size[1], size[2] + 0.01]}
        position={[size[0] / 2, 0, 0]}
        color={COLORS.woodDark}
        outline={false}
      />
    </group>
  )
}

export function Barrel({ position, rotation, color = COLORS.blueBarrel }) {
  return (
    <group position={position} rotation={rotation}>
      <Cyl args={[0.22, 0.22, 0.55, 14]} color={color} />
      <Cyl
        args={[0.23, 0.23, 0.04, 14]}
        position={[0, 0.18, 0]}
        color={COLORS.blueBarrelDark}
        outline={false}
      />
      <Cyl
        args={[0.23, 0.23, 0.04, 14]}
        position={[0, -0.18, 0]}
        color={COLORS.blueBarrelDark}
        outline={false}
      />
    </group>
  )
}

export function Tire({ position, rotation }) {
  const mat = useMemo(() => toon(COLORS.tire), [])
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow material={mat}>
      <torusGeometry args={[0.22, 0.08, 8, 16]} />
      <Outlines thickness={0.015} color="#0c0e12" />
    </mesh>
  )
}

export function CardboardStack({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[0.5, 0.2, 0.4]} position={[0, 0.1, 0]} color={COLORS.cardboard} />
      <Box args={[0.42, 0.18, 0.35]} position={[0.05, 0.28, 0.02]} color="#a88858" />
      <Box args={[0.35, 0.15, 0.3]} position={[-0.04, 0.42, -0.02]} color="#9a7a4a" />
    </group>
  )
}

export function Barrier({ position, rotation, color = COLORS.barrier }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[1.1, 0.12, 0.18]} position={[0, 0.35, 0]} color={color} />
      <Box args={[0.1, 0.35, 0.1]} position={[-0.4, 0.175, 0]} color={COLORS.concreteDark} />
      <Box args={[0.1, 0.35, 0.1]} position={[0.4, 0.175, 0]} color={COLORS.concreteDark} />
    </group>
  )
}

export function ConcreteBlock({ position, rotation, args = [0.7, 0.45, 0.35] }) {
  return <Box args={args} position={position} rotation={rotation} color={COLORS.concreteDark} />
}

export function GraffitiDecal({ position, rotation, color = COLORS.graffitiRed, size = [0.6, 0.4] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial color={color} transparent opacity={0.55} depthWrite={false} />
    </mesh>
  )
}

export function BulletHoles({ position, rotation }) {
  const holes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        x: ((i * 37) % 50) / 100 - 0.25,
        y: ((i * 53) % 40) / 100 - 0.15,
        s: 0.04 + (i % 3) * 0.015,
      })),
    [],
  )
  return (
    <group position={position} rotation={rotation}>
      {holes.map((h, i) => (
        <mesh key={i} position={[h.x, h.y, 0.01]}>
          <circleGeometry args={[h.s, 8]} />
          <meshBasicMaterial color="#1a1a1c" />
        </mesh>
      ))}
    </group>
  )
}

export function TrashBin({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[0.4, 0.55, 0.4]} position={[0, 0.28, 0]} color="#3a4540" />
      <Box args={[0.42, 0.05, 0.42]} position={[0, 0.58, 0]} color="#2a322e" />
    </group>
  )
}

export function Ladder({ position, rotation, height = 2.2 }) {
  const rungs = Math.floor(height / 0.28)
  return (
    <group position={position} rotation={rotation}>
      <Box args={[0.05, height, 0.05]} position={[-0.18, height / 2, 0]} color={COLORS.metalRust} outline={false} />
      <Box args={[0.05, height, 0.05]} position={[0.18, height / 2, 0]} color={COLORS.metalRust} outline={false} />
      {Array.from({ length: rungs }, (_, i) => (
        <Box
          key={i}
          args={[0.4, 0.04, 0.04]}
          position={[0, 0.2 + i * 0.28, 0]}
          color={COLORS.metal}
          outline={false}
        />
      ))}
    </group>
  )
}

export function Pole({ position, height = 3.2, color = COLORS.metal }) {
  return <Cyl args={[0.06, 0.06, height, 8]} position={[position[0], height / 2, position[2]]} color={color} outline={false} />
}
