import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Diorama } from './scene/Diorama'

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [14, 12, 14], fov: 42, near: 0.1, far: 120 }}
      gl={{ antialias: true, toneMappingExposure: 1.05 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0a1018']} />
      <fog attach="fog" args={['#0a1018', 28, 55]} />
      <Suspense fallback={null}>
        <Diorama />
      </Suspense>
    </Canvas>
  )
}
