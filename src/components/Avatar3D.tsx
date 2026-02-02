import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Avatar } from '../lib/supabase';

interface Avatar3DProps {
  avatar: Avatar | null;
}

function AvatarMesh({ avatar }: { avatar: Avatar }) {
  const head = avatar?.head || { shape: 'sphere', color: '#FF6B6B' };
  const body = avatar?.body || { shape: 'cylinder', color: '#4ECDC4' };
  const hands = avatar?.hands || { shape: 'sphere', color: '#45B7D1' };

  return (
    <group>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        {head.shape === 'sphere' ? (
          <sphereGeometry args={[0.3, 32, 32]} />
        ) : head.shape === 'cube' ? (
          <boxGeometry args={[0.5, 0.5, 0.5]} />
        ) : (
          <sphereGeometry args={[0.3, 32, 32]} />
        )}
        <meshStandardMaterial color={head.color} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.6, 0]}>
        {body.shape === 'cylinder' ? (
          <cylinderGeometry args={[0.25, 0.3, 1.2, 32]} />
        ) : body.shape === 'cube' ? (
          <boxGeometry args={[0.6, 1.2, 0.4]} />
        ) : (
          <cylinderGeometry args={[0.25, 0.3, 1.2, 32]} />
        )}
        <meshStandardMaterial color={body.color} />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-0.5, 0.8, 0]}>
        {hands.shape === 'sphere' ? (
          <sphereGeometry args={[0.12, 16, 16]} />
        ) : hands.shape === 'cube' ? (
          <boxGeometry args={[0.2, 0.2, 0.2]} />
        ) : (
          <sphereGeometry args={[0.12, 16, 16]} />
        )}
        <meshStandardMaterial color={hands.color} />
      </mesh>

      {/* Right Hand */}
      <mesh position={[0.5, 0.8, 0]}>
        {hands.shape === 'sphere' ? (
          <sphereGeometry args={[0.12, 16, 16]} />
        ) : hands.shape === 'cube' ? (
          <boxGeometry args={[0.2, 0.2, 0.2]} />
        ) : (
          <sphereGeometry args={[0.12, 16, 16]} />
        )}
        <meshStandardMaterial color={hands.color} />
      </mesh>
    </group>
  );
}

export function Avatar3D({ avatar }: Avatar3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1.5, 3]} />
        <OrbitControls 
          enablePan={false} 
          minDistance={2} 
          maxDistance={6}
          target={[0, 1, 0]}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        
        {/* Avatar */}
        {avatar && <AvatarMesh avatar={avatar} />}
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
        </mesh>
      </Canvas>
    </div>
  );
}
