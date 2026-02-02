import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export function Avatar({ speaking, ...props }: any) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation (Base)
      const floatY = Math.sin(state.clock.elapsedTime) * 0.1
      
      // Talking animation (High frequency jitter/scale)
      let talkScale = 1
      if (speaking) {
         talkScale = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.05
      }

      meshRef.current.position.y = floatY
      meshRef.current.scale.setScalar(talkScale)
    }
  })

  return (
    <group {...props}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={speaking ? "#ff00ff" : "hotpink"} emissive={speaking ? "#440044" : "black"} />
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
