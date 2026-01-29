'use client'

import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Vector3 } from 'three'
import { Duck } from '@/app/components/Duck'
import { Water } from '@/app/components/Water'

export default function Home() {
  const [lastImpulse, setLastImpulse] = useState<{ point: Vector3, id: number } | null>(null)

  const handleWaterClick = useCallback((point: Vector3) => {
    setLastImpulse({ point, id: Math.random() })
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#1a1a1a' }}>

      {/* 1. THE 3D SCENE */}
      <Canvas
        camera={{ position: [0, 15, 0], fov: 45 }}
        gl={{ logarithmicDepthBuffer: true }}
      >
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Duck
          position={[0, 0.5, 0]}
          impulse={lastImpulse}
        />
        <Water onImpulse={handleWaterClick} />
      </Canvas>

      {/* 2. THE UI OVERLAY (Pointer events none is crucial!) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // <--- Clicks go through this div
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Pushes text to top/bottom
        padding: '40px',
        boxSizing: 'border-box',
        color: 'rgba(255, 255, 255, 0.6)', // Subtle text color
        fontFamily: 'sans-serif',
        userSelect: 'none' // Prevents highlighting text while tapping
      }}>

        {/* Top Instruction */}
        <div style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px' }}>
          TAP ANYWHERE TO RIPPLE
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
          <p style={{ margin: 0 }}>Created by <strong>FakeMonika</strong></p>
          <p style={{ margin: '5px 0 0 0', opacity: 0.7 }}>
            Duck Model by <a href="https://sketchfab.com/3d-models/rubber-duck-ccd424db8bae480bbdc1a4a2f812c0e8" style={{ color: 'inherit' }}>Darien</a>
          </p>
        </div>

      </div>

    </div>
  )
}