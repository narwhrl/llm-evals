import {
  Box, Barrel, Crate, Barrier, Tire, CardboardStack, ConcreteBlock, GraffitiDecal, Ladder,
} from '../props/Primitives'
import { COLORS } from '../materials/toon'

/** Left flanking alley: west path T → A exterior → CT */
export function LeftAlley() {
  return (
    <group>
      {/* alley corridor walls */}
      <Box args={[0.25, 2.0, 8.5]} position={[-7.8, 1.0, 0.5]} color={COLORS.concreteDark} />
      <Box args={[0.25, 1.6, 3.5]} position={[-6.2, 0.8, -1.5]} color={COLORS.warehouse} />

      {/* narrow choke props */}
      <Dumpster position={[-7.0, 0, 4.5]} />
      <Crate position={[-6.8, 0.23, 2.5]} />
      <Barrel position={[-7.1, 0.28, 1.8]} />
      <Barrel position={[-6.6, 0.28, 1.5]} color={COLORS.blueBarrelDark} />
      <Tire position={[-6.9, 0.12, 0.2]} rotation={[Math.PI / 2, 0.2, 0]} />
      <Tire position={[-6.9, 0.35, 0.2]} rotation={[Math.PI / 2, -0.1, 0]} />
      <CardboardStack position={[-7.0, 0, -0.8]} />
      <Barrier position={[-6.9, 0, -2.5]} rotation={[0, Math.PI / 2, 0]} />
      <ConcreteBlock position={[-6.6, 0.23, -3.8]} />
      <GraffitiDecal position={[-7.66, 1.2, 2.0]} rotation={[0, Math.PI / 2, 0]} color={COLORS.graffitiRed} />
      <GraffitiDecal position={[-7.66, 0.9, -1.0]} rotation={[0, Math.PI / 2, 0]} color={COLORS.graffitiYellow} size={[0.8, 0.5]} />

      {/* AC unit / drain pipe along alley */}
      <Box args={[0.4, 0.5, 0.35]} position={[-6.35, 1.6, 3.0]} color="#4a5550" />
      <Box args={[0.08, 1.8, 0.08]} position={[-6.3, 0.9, 3.4]} color={COLORS.metalRust} outline={false} />
    </group>
  )
}

function Dumpster({ position }) {
  return (
    <group position={position}>
      <Box args={[1.2, 0.85, 0.7]} position={[0, 0.42, 0]} color="#3d5a3d" />
      <Box args={[1.25, 0.08, 0.75]} position={[0, 0.88, 0]} color="#2d4a2d" />
    </group>
  )
}

/** Right elevated flank: east high ground T containers → B balcony → CT platform */
export function RightHighGround() {
  return (
    <group>
      {/* elevated walkway segments */}
      <Box args={[1.8, 0.15, 3.0]} position={[6.5, 1.5, 5.0]} color={COLORS.concreteDark} />
      <Box args={[0.3, 1.5, 0.3]} position={[5.8, 0.75, 5.8]} color={COLORS.concrete} />
      <Box args={[0.3, 1.5, 0.3]} position={[7.2, 0.75, 5.8]} color={COLORS.concrete} />
      <Box args={[0.3, 1.5, 0.3]} position={[5.8, 0.75, 4.2]} color={COLORS.concrete} />
      <Ladder position={[5.4, 0, 5.5]} height={1.6} />

      {/* bridge toward B */}
      <Box args={[1.4, 0.12, 2.2]} position={[6.3, 1.55, 3.2]} color={COLORS.metal} />
      <Box args={[0.08, 0.4, 2.2]} position={[5.65, 1.8, 3.2]} color={COLORS.metalRust} outline={false} />
      <Box args={[0.08, 0.4, 2.2]} position={[6.95, 1.8, 3.2]} color={COLORS.metalRust} outline={false} />

      {/* crates on high ground */}
      <Crate position={[6.3, 1.73, 5.2]} size={[0.4, 0.35, 0.4]} />
      <Barrel position={[6.8, 1.78, 4.6]} />

      {/* eastern outer wall */}
      <Box args={[0.3, 2.4, 10]} position={[8.2, 1.2, 0.5]} color={COLORS.concrete} />
      <GraffitiDecal position={[8.03, 1.4, 2.5]} rotation={[0, -Math.PI / 2, 0]} color={COLORS.graffitiBlue} size={[1.0, 0.6]} />

      {/* mid-height cover toward CT */}
      <Box args={[1.6, 0.9, 0.3]} position={[6.0, 0.45, -1.5]} color={COLORS.concreteDark} />
      <Crate position={[5.5, 0.23, -2.0]} />
      <Tire position={[6.5, 0.12, -2.4]} rotation={[0.2, 0, Math.PI / 2]} />
    </group>
  )
}

/** Scattered cover linking zones */
export function SharedCover() {
  return (
    <group>
      <Crate position={[-3.2, 0.23, 0.5]} />
      <Crate position={[-2.8, 0.23, 1.0]} size={[0.4, 0.4, 0.4]} />
      <Barrel position={[3.2, 0.28, -0.5]} />
      <Barrel position={[3.5, 0.28, -1.0]} />
      <CardboardStack position={[3.8, 0, 1.2]} />
      <Barrier position={[-3.5, 0, -2.0]} rotation={[0, 0.4, 0]} />
      <ConcreteBlock position={[4.2, 0.23, -3.5]} />
      {/* power poles + wires markers */}
      <Box args={[0.12, 4.0, 0.12]} position={[-4.5, 2.0, 5.5]} color={COLORS.metal} outline={false} />
      <Box args={[0.12, 4.0, 0.12]} position={[4.0, 2.0, 5.8]} color={COLORS.metal} outline={false} />
      <Box args={[0.12, 3.6, 0.12]} position={[-5.0, 1.8, -4.5]} color={COLORS.metal} outline={false} />
      <Box args={[0.12, 3.6, 0.12]} position={[5.5, 1.8, -4.0]} color={COLORS.metal} outline={false} />
    </group>
  )
}
