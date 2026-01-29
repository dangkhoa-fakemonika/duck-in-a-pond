import { useRef, useMemo } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { RippleManager } from './RippleManager'

const vertexShader = `
  uniform sampler2D uDisplacement;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Read the white circle from the texture
    float displacement = texture2D(uDisplacement, uv).r;
    
    // MOVEMENT FIX:
    // Reduced multiplier from 2.0 -> 0.8
    // This makes the physical wave much shorter, preventing the "cliff" effect.
    pos.z += displacement * 0.8; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uDisplacement; // Read texture here too!
  varying vec2 vUv;

  void main() {
    // Read the High-Res texture directly
    float textureStrength = texture2D(uDisplacement, vUv).r;

    // COLORS
    vec3 waterColor = vec3(0.68, 0.88, 0.88); // Pale Blue
    vec3 highlight = vec3(1.0, 1.0, 1.0);     // Pure White

    // MIXING
    // Since we use the textureStrength (which is a smooth gradient),
    // the color transition will be silky smooth regardless of the mesh.
    float mixStrength = smoothstep(0.05, 0.3, textureStrength);
    
    vec3 color = mix(waterColor, highlight, mixStrength);

    gl_FragColor = vec4(color, 1.0);
  }
`

export function Water({ onImpulse }: { onImpulse?: (point: THREE.Vector3) => void }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const rippleManager = useMemo(() => new RippleManager(2048, 2048), [])

  useFrame(() => {
    rippleManager.update()

    if (materialRef.current) {
      materialRef.current.uniforms.uDisplacement.value = rippleManager.texture
    }
  })

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    const uvX = (e.point.x + 25) / 50
    const uvY = (e.point.z + 25) / 50

    rippleManager.addRipple(uvX, uvY)

    if (onImpulse) {
      onImpulse(e.point)
    }
  }

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.2, 0]}
      onPointerDown={handlePointerDown}
      frustumCulled={false}
    >
      <planeGeometry args={[50, 50, 512, 512]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uDisplacement: { value: rippleManager.texture }
        }}
      />
    </mesh>
  )
}