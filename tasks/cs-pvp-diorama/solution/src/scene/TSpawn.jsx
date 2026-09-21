import {
  Box, Barrel, Crate, Ladder, Barrier, GraffitiDecal, BulletHoles, CardboardStack, Tire,
} from '../props/Primitives'
import { COLORS } from '../materials/toon'

function Container({ position, color, stacked = 1 }) {
  return (
    <group position={position}>
      {Array.from({ length: stacked }, (_, i) => (
        <group key={i} position={[0, 0.55 + i * 1.05, 0]}>
          <Box args={[2.4, 1.0, 1.1]} color={color} />
          <Box args={[2.35, 0.08, 1.05]} position={[0, 0.46, 0]} color={COLORS.metal} outline={false} />
          <GraffitiDecal
            position={[1.21, 0.1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            color={COLORS.graffitiYellow}
            size={[0.7, 0.35]}
          />
        </group>
      ))}
    </group>
  )
}

function Truck({ position }) {
  return (
    <group position={position}>
      <Box args={[1.4, 1.0, 2.6]} position={[0, 0.7, 0]} color="#4a5560" />
      <Box args={[1.35, 0.7, 1.0]} position={[0, 0.85, 1.55]} color="#556070" />
      <Box args={[1.2, 0.45, 0.08]} position={[0, 0.95, 2.06]} color={COLORS.glass} transparent opacity={0.45} />
      <Box args={[0.35, 0.35, 0.2]} position={[-0.55, 0.25, 1.2]} color={COLORS.tire} outline={false} />
      <Box args={[0.35, 0.35, 0.2]} position={[0.55, 0.25, 1.2]} color={COLORS.tire} outline={false} />
      <Box args={[0.35, 0.35, 0.2]} position={[-0.55, 0.25, -0.9]} color={COLORS.tire} outline={false} />
      <Box args={[0.35, 0.35, 0.2]} position={[0.55, 0.25, -0.9]} color={COLORS.tire} outline={false} />
      <Ladder position={[0.85, 0, 0.2]} rotation={[0, 0, -0.35]} height={1.6} />
      <BulletHoles position={[0.71, 0.9, 0]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  )
}

export function TSpawn() {
  // North side of map (+Z)
  return (
    <group position={[0, 0, 6.2]}>
      {/* barbed fence enclosure */}
      <Box args={[7.5, 1.4, 0.12]} position={[0, 0.7, 2.4]} color={COLORS.greenFence} />
      <Box args={[0.12, 1.4, 3.2]} position={[-3.7, 0.7, 0.8]} color={COLORS.greenFence} />
      <Box args={[0.12, 1.4, 3.2]} position={[3.7, 0.7, 0.8]} color={COLORS.greenFence} />
      {/* wire tops */}
      {[-3, -1.5, 0, 1.5, 3].map((x) => (
        <Box key={x} args={[0.04, 0.35, 0.04]} position={[x, 1.55, 2.4]} color={COLORS.metal} outline={false} />
      ))}

      <Truck position={[-2.4, 0, 0.6]} />
      <Container position={[2.2, 0, 0.8]} color={COLORS.container} stacked={3} />
      <Container position={[2.2, 0, -0.5]} color={COLORS.containerOrange} stacked={2} />
      {/* gap between containers for peek */}
      <Box args={[0.35, 0.05, 0.9]} position={[2.2, 1.1, 0.15]} color={COLORS.metalRust} outline={false} />

      {/* ramp toward mid / A */}
      <Box args={[2.2, 0.35, 2.4]} position={[-0.3, 0.1, -2.2]} rotation={[0.12, 0, 0]} color={COLORS.concreteDark} />
      <Box args={[0.8, 0.9, 0.15]} position={[1.0, 0.45, -2.0]} color={COLORS.concrete} />
      {/* broken wall peek hole */}
      <Box args={[0.55, 0.45, 0.12]} position={[1.0, 0.9, -2.0]} color={COLORS.concreteDark} outline={false} />

      {[0, 1, 2, 3].map((i) => (
        <Barrel key={i} position={[-1.4 + (i % 2) * 0.5, 0.28, -1.4 - Math.floor(i / 2) * 0.5]} />
      ))}
      <Crate position={[0.6, 0.23, -1.1]} />
      <Crate position={[1.1, 0.23, -1.3]} size={[0.45, 0.4, 0.45]} />
      <CardboardStack position={[-3.2, 0, 1.5]} />
      <Tire position={[3.5, 0.12, -0.8]} rotation={[Math.PI / 2, 0, 0.3]} />
      <Barrier position={[0, 0, 1.8]} rotation={[0, 0.2, 0]} />
      <GraffitiDecal position={[-3.64, 0.9, 0.5]} rotation={[0, Math.PI / 2, 0]} color={COLORS.graffitiRed} />
    </group>
  )
}
