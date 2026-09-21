import {
  Box, Crate, Barrel, Barrier, BulletHoles, GraffitiDecal, ConcreteBlock,
} from '../props/Primitives'
import { COLORS } from '../materials/toon'

function IronDoor() {
  return (
    <group position={[0, 0, 0]}>
      {/* double door, half-open gap */}
      <Box args={[1.15, 2.3, 0.12]} position={[-0.95, 1.15, 0]} rotation={[0, 0.35, 0]} color={COLORS.metalRust} />
      <Box args={[1.15, 2.3, 0.12]} position={[0.95, 1.15, 0]} rotation={[0, -0.15, 0]} color={COLORS.metal} />
      <Box args={[0.15, 0.15, 0.08]} position={[-0.4, 1.1, 0.2]} color="#c9a040" outline={false} />
      <BulletHoles position={[-0.4, 1.3, 0.08]} rotation={[0, 0.35, 0]} />
      <GraffitiDecal position={[0.95, 1.5, 0.08]} rotation={[0, -0.15, 0]} color={COLORS.graffitiRed} size={[0.5, 0.35]} />
    </group>
  )
}

function DrainGrate({ position }) {
  return (
    <group position={position}>
      <Box args={[1.6, 0.08, 0.55]} color={COLORS.metalRust} outline={false} />
      {[-0.5, -0.25, 0, 0.25, 0.5].map((x) => (
        <Box key={x} args={[0.06, 0.02, 0.5]} position={[x, 0.05, 0]} color={COLORS.metal} outline={false} />
      ))}
      {/* water under grate */}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.4]} />
        <meshStandardMaterial color="#1a3040" metalness={0.85} roughness={0.15} />
      </mesh>
    </group>
  )
}

function SewerTunnel() {
  // underpass from T-side ramp under mid toward CT flank
  return (
    <group position={[0, -0.55, 0]}>
      <Box args={[1.4, 0.9, 6.5]} position={[1.8, 0, -0.5]} color="#2a3038" outline={false} />
      {/* entrance T side */}
      <Box args={[1.2, 0.7, 0.15]} position={[1.8, 0.05, 2.6]} color={COLORS.concreteDark} />
      {/* exit CT flank */}
      <Box args={[1.2, 0.7, 0.15]} position={[1.8, 0.05, -3.5]} color={COLORS.concreteDark} />
      <pointLight position={[1.8, 0.1, 0]} intensity={0.4} distance={4} color="#406080" />
    </group>
  )
}

function HighPeek({ side }) {
  const x = side * 2.6
  return (
    <group position={[x, 0, 0]}>
      <Box args={[1.4, 2.6, 0.35]} position={[0, 1.3, 0]} color={COLORS.concrete} />
      {/* shooting port */}
      <Box args={[0.7, 0.35, 0.4]} position={[0, 1.7, 0]} color="#1a1e24" outline={false} />
      {/* elevated walk */}
      <Box args={[1.6, 0.15, 2.2]} position={[side * 0.3, 1.4, 0]} color={COLORS.concreteDark} />
      <Box args={[0.35, 1.4, 0.35]} position={[side * 0.6, 0.7, 0.9]} color={COLORS.concrete} />
      <Box args={[0.35, 1.4, 0.35]} position={[side * 0.6, 0.7, -0.9]} color={COLORS.concrete} />
    </group>
  )
}

export function MidLane() {
  return (
    <group position={[0, 0, 0]}>
      {/* corridor walls */}
      <Box args={[0.35, 2.4, 5.5]} position={[-2.0, 1.2, 0]} color={COLORS.concrete} />
      <Box args={[0.35, 2.4, 5.5]} position={[2.0, 1.2, 0]} color={COLORS.concrete} />

      <IronDoor />
      <HighPeek side={-1} />
      <HighPeek side={1} />

      <DrainGrate position={[0, 0.06, 1.4]} />
      <DrainGrate position={[0, 0.06, -1.2]} />
      <SewerTunnel />

      {/* CT-side low wall cover */}
      <Box args={[1.8, 0.7, 0.25]} position={[0, 0.35, -2.6]} color={COLORS.concreteDark} />
      <Crate position={[-0.6, 0.23, -2.3]} />
      <Crate position={[0.5, 0.23, -2.4]} size={[0.4, 0.4, 0.4]} />
      <Box args={[0.7, 0.9, 0.08]} position={[0.9, 0.55, -2.5]} rotation={[0, -0.4, 0]} color={COLORS.metal} />

      <Barrel position={[-1.4, 0.28, 2.0]} />
      <Barrel position={[-1.4, 0.28, 2.5]} color={COLORS.blueBarrelDark} />
      <ConcreteBlock position={[1.3, 0.23, 2.2]} />
      <Barrier position={[0, 0, 2.8]} />
      <GraffitiDecal position={[-1.82, 1.5, 1.5]} rotation={[0, Math.PI / 2, 0]} color={COLORS.graffitiYellow} />

      {/* booths either side */}
      <group position={[-2.6, 0, 1.5]}>
        <Box args={[1.0, 1.4, 1.2]} position={[0, 0.7, 0]} color={COLORS.warehouse} />
        <Box args={[0.7, 0.5, 0.05]} position={[0.52, 0.9, 0]} color={COLORS.glass} transparent opacity={0.35} />
        <Box args={[0.5, 0.35, 0.4]} position={[0, 0.5, 0]} color="#2a3038" />
      </group>
      <group position={[2.6, 0, -1.5]}>
        <Box args={[1.0, 1.4, 1.2]} position={[0, 0.7, 0]} color={COLORS.warehouse} />
        <Box args={[0.7, 0.5, 0.05]} position={[-0.52, 0.9, 0]} color={COLORS.glass} transparent opacity={0.35} />
      </group>
    </group>
  )
}
