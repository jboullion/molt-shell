import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { Avatar } from '../lib/supabase';
import AvatarMesh from './AvatarMesh';

interface Avatar3DProps {
  avatar: Avatar | null;
}

export default function Avatar3D({ avatar }: Avatar3DProps) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#9333ea" />
      
      {/* Avatar */}
      {avatar && <AvatarMesh avatar={avatar} />}
    </Canvas>
  );
}
