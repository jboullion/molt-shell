import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export function Avatar(props: any) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group {...props}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.5, 0]} ref={meshRef}>
        <capsuleGeometry args={[0.3, 1, 4, 8]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Eyes (Simple indicators) */}
      <mesh position={[0.2, 1.6, 0.4]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.2, 1.6, 0.4]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}
