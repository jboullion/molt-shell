import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Avatar } from '../lib/supabase';
import * as THREE from 'three';

interface AvatarMeshProps {
  avatar: Avatar;
}

export default function AvatarMesh({ avatar }: AvatarMeshProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle idle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getGeometry = (shape: string) => {
    switch (shape) {
      case 'sphere': return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'cube': return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      case 'cylinder': return <cylinderGeometry args={[0.4, 0.4, 1, 32]} />;
      default: return <sphereGeometry args={[0.5, 32, 32]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        {getGeometry(avatar.head.shape)}
        <meshStandardMaterial color={avatar.head.color} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0, 0]}>
        {getGeometry(avatar.body.shape)}
        <meshStandardMaterial color={avatar.body.color} />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-0.8, 0, 0]}>
        {getGeometry(avatar.hands.shape)}
        <meshStandardMaterial color={avatar.hands.color} />
      </mesh>

      {/* Right Hand */}
      <mesh position={[0.8, 0, 0]}>
        {getGeometry(avatar.hands.shape)}
        <meshStandardMaterial color={avatar.hands.color} />
      </mesh>
    </group>
  );
}
