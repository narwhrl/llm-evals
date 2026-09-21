import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { SquareBase } from './Base'
import { TSpawn } from './TSpawn'
import { ASite } from './ASite'
import { MidLane } from './MidLane'
import { BSite } from './BSite'
import { CTSpawn } from './CTSpawn'
import { LeftAlley, RightHighGround, SharedCover } from './Routes'
import { Rain } from '../effects/Rain'
import { Puddles } from '../effects/Puddles'
import { Drips } from '../effects/Drips'
import { Lightning, SteamVents, Wires } from '../effects/Atmosphere'

export function Diorama() {
  return (
    <>
      <ambientLight intensity={0.28} color="#6a7a90" />
      <hemisphereLight args={['#4a5a70', '#1a1510', 0.45]} />
      <directionalLight
        position={[8, 14, 4]}
        intensity={0.55}
        color="#8aa0b8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={40}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
      {/* cool moonlight fill */}
      <directionalLight position={[-6, 8, -8]} intensity={0.25} color="#4060a0" />

      <SquareBase />
      <Puddles />

      <TSpawn />
      <ASite />
      <MidLane />
      <BSite />
      <CTSpawn />
      <LeftAlley />
      <RightHighGround />
      <SharedCover />

      <Wires />
      <Rain />
      <Drips />
      <SteamVents />
      <Lightning />

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.45}
        scale={20}
        blur={2.2}
        far={8}
        color="#05070a"
      />

      <Environment preset="night" environmentIntensity={0.35} />

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={8}
        maxDistance={32}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 2.15}
        target={[0, 1.2, 0]}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  )
}
